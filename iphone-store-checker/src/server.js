import { createReadStream } from "node:fs";
import { access } from "node:fs/promises";
import http from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { HttpError, parseLocation, parseParts } from "./availability.js";
import { loadCatalog, loadPickup } from "./apple.js";

const PUBLIC_DIR = fileURLToPath(new URL("../public", import.meta.url));
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
};

function memo(ttlMs) {
  let value = null;
  let storedAt = 0;
  let pending = null;
  return (load) => {
    if (value && Date.now() - storedAt < ttlMs) return Promise.resolve(value);
    if (!pending) {
      pending = load()
        .then((next) => {
          value = next;
          storedAt = Date.now();
          return next;
        })
        .finally(() => {
          pending = null;
        });
    }
    return pending;
  };
}

function remember(cache, key, entry, limit) {
  cache.delete(key);
  cache.set(key, entry);
  while (cache.size > limit) cache.delete(cache.keys().next().value);
}

export function createApp({
  fetchImpl = globalThis.fetch,
  catalogTtlMs = 6 * 60 * 60 * 1000,
  availabilityTtlMs = 2 * 60 * 1000,
} = {}) {
  const catalog = memo(catalogTtlMs);
  const availability = new Map();
  const inflight = new Map();

  return {
    catalog: () => catalog(() => loadCatalog(fetchImpl)),
    availability: (location, parts, { fresh = false } = {}) => {
      const key = `${location}|${parts.join(",")}`;
      const hit = availability.get(key);
      if (!fresh && hit && Date.now() - hit.at < availabilityTtlMs) {
        remember(availability, key, hit, 100);
        return Promise.resolve({ ...hit.value, checkedAt: hit.checkedAt, cached: true });
      }
      const pending = inflight.get(key);
      if (pending) return pending;
      const request = loadPickup(fetchImpl, location, parts)
        .then((value) => {
          const stored = { at: Date.now(), checkedAt: new Date().toISOString(), value };
          remember(availability, key, stored, 100);
          return { ...value, checkedAt: stored.checkedAt, cached: false };
        })
        .finally(() => {
          inflight.delete(key);
        });
      inflight.set(key, request);
      return request;
    },
  };
}

function sendJson(response, status, body, cacheControl) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": cacheControl,
  });
  response.end(JSON.stringify(body));
}

async function serveStatic(response, pathname) {
  const requested = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const path = normalize(join(PUBLIC_DIR, requested));
  if (path !== PUBLIC_DIR && !path.startsWith(PUBLIC_DIR + sep)) {
    sendJson(response, 404, { error: "Not found." }, "no-store");
    return;
  }
  try {
    await access(path);
  } catch {
    sendJson(response, 404, { error: "Not found." }, "no-store");
    return;
  }
  response.writeHead(200, {
    "Content-Type": MIME[extname(path)] || "application/octet-stream",
    "Cache-Control": "no-cache",
  });
  createReadStream(path).pipe(response);
}

export function createServer(options) {
  const app = createApp(options);
  return http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", "http://localhost");
      if (request.method !== "GET" && request.method !== "HEAD") {
        sendJson(response, 405, { error: "Method not allowed." }, "no-store");
        return;
      }
      if (url.pathname === "/api/catalog") {
        const body = await app.catalog();
        sendJson(response, 200, body, "public, max-age=300");
        return;
      }
      if (url.pathname === "/api/availability") {
        const location = parseLocation(url.searchParams.get("location"));
        const parts = parseParts(url.searchParams.getAll("parts"));
        const fresh = url.searchParams.get("fresh") === "1";
        const pickup = await app.availability(location, parts, { fresh });
        sendJson(response, 200, pickup, "no-store");
        return;
      }
      if (url.pathname.startsWith("/api/")) {
        sendJson(response, 404, { error: "Not found." }, "no-store");
        return;
      }
      await serveStatic(response, url.pathname);
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 502;
      const message = error instanceof HttpError ? error.message : error.message || "Something went wrong.";
      if (status >= 500) console.error(message);
      sendJson(response, status, { error: message }, "no-store");
    }
  });
}

const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const port = Number(process.env.PORT) || 8787;
  const server = createServer();
  server.listen(port, () => {
    console.log(`iPhone pickup checker at http://localhost:${port}`);
  });
}
