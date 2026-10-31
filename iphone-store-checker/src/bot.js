import { HttpError, parseLocation } from "./availability.js";

export const UNION_SQUARE = {
  location: "94108",
  storeName: "Union Square",
};

export const DUO_256 = {
  night: { partNumber: "MK1F4LL/A", label: "Night Sky" },
  white: { partNumber: "MK1E4LL/A", label: "Star White" },
};

export const CHECK_UNION_SQUARE = "Check Union Square";
export const WATCH_MS = 20 * 60 * 1000;
const COOLDOWN_MS = 15_000;

export const replyKeyboard = {
  keyboard: [[CHECK_UNION_SQUARE], [DUO_256.night.label, DUO_256.white.label]],
  resize_keyboard: true,
};

function commandOf(text) {
  const word = String(text || "").trim().split(/\s+/)[0] || "";
  return word.replace(/@\w+$/, "").toLowerCase();
}

export function parseRequest(text) {
  const raw = String(text || "").trim();
  const command = commandOf(raw);
  if (!raw || command === "/start" || command === "/help") return { type: "help" };
  if (command === "/stop") return { type: "stop" };
  if (command === "/check" || raw === CHECK_UNION_SQUARE) {
    return { type: "check", parts: "both", location: UNION_SQUARE.location };
  }
  if (command === "/night" || raw === DUO_256.night.label) {
    return { type: "check", parts: "night", location: UNION_SQUARE.location };
  }
  if (command === "/white" || raw === DUO_256.white.label) {
    return { type: "check", parts: "white", location: UNION_SQUARE.location };
  }
  return { type: "check", parts: "both", location: raw };
}

export function partList(which) {
  if (which === "night") return [DUO_256.night];
  if (which === "white") return [DUO_256.white];
  return [DUO_256.night, DUO_256.white];
}

export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char]));
}

export function formatCheckedAt(iso) {
  const when = new Date(iso);
  if (Number.isNaN(when.getTime())) return "";
  return when.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export function helpText() {
  return [
    "<b>Apple Union Square</b>",
    "iPhone Duo 256GB, Night Sky and Star White.",
    "Checks US Apple Store pickup only.",
    "",
    "Tap Check Union Square. A US ZIP code, or a city and state, checks that place instead.",
    "",
    "Union Square is checked every 20 minutes. A message is sent only when a Duo 256GB finish is in stock.",
    "Send /stop to turn those alerts off.",
  ].join("\n");
}

export function stockAlert(pickup, products) {
  const stores = Array.isArray(pickup?.stores) ? pickup.stores : [];
  const store = stores.find((item) => item.name === UNION_SQUARE.storeName);
  if (!store) return null;
  const byPart = new Map((store.parts || []).map((part) => [part.partNumber, part]));
  const inStock = products.filter((product) => byPart.get(product.partNumber)?.available);
  if (!inStock.length) return null;
  const lines = ["<b>In stock at Apple Union Square</b>"];
  const place = [store.street, [store.city, store.state].filter(Boolean).join(", ")].filter(Boolean).join(", ");
  if (place) lines.push(escapeHtml(place));
  for (const product of inStock) {
    const part = byPart.get(product.partNumber);
    lines.push(`${escapeHtml(product.label)}: ${escapeHtml(part.quote || "Available")}`);
  }
  const when = formatCheckedAt(pickup.checkedAt);
  if (when) lines.push("", `Checked ${escapeHtml(when)}`);
  return lines.join("\n");
}

export async function watchUnionSquare(app) {
  const products = partList("both");
  const pickup = await app.availability(
    UNION_SQUARE.location,
    products.map((product) => product.partNumber),
    { fresh: true },
  );
  return stockAlert(pickup, products);
}

export function formatPickup(pickup, products) {
  const stores = Array.isArray(pickup?.stores) ? pickup.stores : [];
  const focus = stores.find((store) => store.name === UNION_SQUARE.storeName) || stores[0];
  if (!focus) return "No Apple Store came back for that search.";
  const lines = [`<b>${escapeHtml(focus.name)}</b>`];
  const place = [focus.street, [focus.city, focus.state].filter(Boolean).join(", ")].filter(Boolean).join(", ");
  if (place) lines.push(escapeHtml(place));
  if (focus.distanceLabel) lines.push(escapeHtml(focus.distanceLabel));
  const byPart = new Map((focus.parts || []).map((part) => [part.partNumber, part]));
  for (const product of products) {
    const part = byPart.get(product.partNumber);
    const quote = part?.quote || (part?.available ? "Available" : "Not available for pickup");
    lines.push(`${escapeHtml(product.label)}: ${escapeHtml(quote)}`);
  }
  const others = stores.filter((store) => store !== focus && store.availableCount > 0).slice(0, 3);
  if (others.length) {
    lines.push("", "Also available nearby:");
    for (const store of others) {
      lines.push(`${escapeHtml(store.name)} · ${escapeHtml(store.distanceLabel || "")}`);
    }
  }
  const when = formatCheckedAt(pickup.checkedAt);
  if (when) lines.push("", `Checked ${escapeHtml(when)}`);
  return lines.join("\n");
}

export async function handleMessage(app, session, text, now = Date.now()) {
  const request = parseRequest(text);
  if (request.type === "stop") {
    return {
      text: "Union Square alerts are off. Send any message to turn them back on.",
      keyboard: true,
      alerts: false,
    };
  }
  if (request.type === "help") return { text: helpText(), keyboard: true, alerts: true };
  let location = request.location;
  if (location !== UNION_SQUARE.location) {
    try {
      location = parseLocation(location);
    } catch (error) {
      const message = error instanceof HttpError ? error.message : "Use a ZIP code or a city and state.";
      return { text: message, keyboard: true, alerts: true };
    }
  }
  const products = partList(request.parts);
  const key = `${location}|${products.map((product) => product.partNumber).join(",")}`;
  if (session.lastKey === key && session.lastText && now - session.lastAt < COOLDOWN_MS) {
    return { text: session.lastText, keyboard: true };
  }
  const pickup = await app.availability(
    location,
    products.map((product) => product.partNumber),
    { fresh: true },
  );
  const reply = formatPickup(pickup, products);
  session.lastKey = key;
  session.lastAt = now;
  session.lastText = reply;
  return { text: reply, keyboard: true, alerts: true };
}
