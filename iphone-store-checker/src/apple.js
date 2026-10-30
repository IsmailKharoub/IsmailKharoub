import { FAMILIES, normalizeCatalog, normalizeFamily } from "./catalog.js";
import { normalizePickup } from "./availability.js";

const ORIGIN = "https://www.apple.com";
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

export async function getJson(fetchImpl, url) {
  const response = await fetchImpl(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": USER_AGENT,
      Referer: `${ORIGIN}/shop/buy-iphone`,
    },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) {
    throw new Error(`Apple returned ${response.status} while checking availability.`);
  }
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Apple didn't return inventory data. Try again in a moment.");
  }
}

export async function loadCatalog(fetchImpl) {
  const families = await Promise.all(
    FAMILIES.map(async (family) => {
      const payload = await getJson(
        fetchImpl,
        `${ORIGIN}/shop/product-locator-meta?fae=true&family=${family.id}`,
      );
      return normalizeFamily(family, payload);
    }),
  );
  return normalizeCatalog(families);
}

export async function loadPickup(fetchImpl, location, parts) {
  const params = new URLSearchParams();
  params.set("pl", "true");
  params.set("location", location);
  parts.forEach((part, index) => params.set(`parts.${index}`, part));
  const payload = await getJson(fetchImpl, `${ORIGIN}/shop/retail/pickup-message?${params}`);
  return normalizePickup(payload.body);
}
