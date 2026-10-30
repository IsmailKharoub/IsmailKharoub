const CAPACITY_RANK = {
  "128gb": 128,
  "256gb": 256,
  "512gb": 512,
  "1tb": 1024,
  "2tb": 2048,
};

export const FAMILIES = [
  { id: "iphoneduo", name: "iPhone Duo" },
  { id: "iphone18pro", name: "iPhone 18 Pro" },
  { id: "iphoneair", name: "iPhone Air" },
  { id: "iphone17", name: "iPhone 17" },
  { id: "iphone17e", name: "iPhone 17e" },
  { id: "iphone16", name: "iPhone 16" },
];

export function cleanTitle(title) {
  return String(title || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+(AT&T|T-Mobile|Verizon)$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function capacityKeyFromTitle(title) {
  const match = cleanTitle(title).match(/\b(\d+)\s?(GB|TB)\b/i);
  if (!match) return "standard";
  return `${match[1]}${match[2]}`.toLowerCase();
}

export function capacityLabel(key) {
  const match = String(key || "").match(/^(\d+)(gb|tb)$/i);
  if (!match) return "Standard";
  return `${match[1]}${match[2].toUpperCase()}`;
}

export function parsePriceLabel(label) {
  const amount = Number(String(label || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

export function absoluteUrl(link, origin = "https://www.apple.com") {
  const value = String(link || "");
  if (value.startsWith("https://") || value.startsWith("http://")) {
    return value.replace(/^http:\/\//, "https://");
  }
  if (value.startsWith("/")) return origin + value;
  if (!value) return `${origin}/shop/buy-iphone`;
  return `${origin}/${value.replace(/^\/+/, "")}`;
}

function preferUnlocked(variants) {
  return (
    variants.find((product) => String(product.price || "").includes("unlocked")) ||
    variants.find((product) => !/\b(AT&T|T-Mobile|Verizon)\b/i.test(product.productTitle || "")) ||
    variants[0]
  );
}

function imageName(product) {
  const name = product?.image;
  return typeof name === "string" && /^[A-Za-z0-9_-]+$/.test(name) ? name : "";
}

function swatchName(color) {
  const name = color?.swatchImage?.imageName || color?.swatchImage?.originalImageName;
  return typeof name === "string" && /^[A-Za-z0-9_-]+$/.test(name) ? name : "";
}

export function normalizeFamily(family, payload) {
  const meta = payload?.body?.productLocatorOverlayData?.productLocatorMeta;
  if (!meta || !Array.isArray(meta.products)) {
    throw new Error(`Apple did not return a lineup for ${family.name}.`);
  }

  const prices = meta.prices || {};
  const screenOptions = meta.dimensionsVariations?.dimensionScreensize || [];
  const colorOptions = meta.dimensionsVariations?.dimensionColor || [];
  const screensByKey = new Map(screenOptions.map((item) => [item.key, item.value || family.name]));
  const colors = colorOptions.map((color) => ({
    key: color.key,
    name: color.value || color.key,
    swatch: swatchName(color),
  }));
  const colorOrder = new Map(colors.map((color, index) => [color.key, index]));

  const grouped = new Map();
  for (const product of meta.products) {
    if (!product?.partNumber) continue;
    const list = grouped.get(product.partNumber) || [];
    list.push(product);
    grouped.set(product.partNumber, list);
  }

  const products = [...grouped.values()].map((variants) => {
    const chosen = preferUnlocked(variants);
    const title = cleanTitle(chosen.productTitle);
    const capacityKey = chosen.dimensionCapacity || capacityKeyFromTitle(title);
    const priceLabel = prices[chosen.price]?.fullPrice || "";
    const screenKey = chosen.dimensionScreensize || "default";
    return {
      partNumber: chosen.partNumber,
      title,
      modelId: screenKey,
      colorKey: chosen.dimensionColor || "",
      color: colors.find((color) => color.key === chosen.dimensionColor)?.name || chosen.dimensionColor || "",
      capacityKey,
      capacity: capacityLabel(capacityKey),
      price: parsePriceLabel(priceLabel),
      priceLabel: priceLabel || "",
      image: imageName(chosen),
      buyUrl: absoluteUrl(chosen.productLink),
    };
  });

  const modelIds = [...new Set(products.map((product) => product.modelId))];
  modelIds.sort((a, b) => a.localeCompare(b));

  const models = modelIds.map((modelId) => {
    const modelProducts = products
      .filter((product) => product.modelId === modelId)
      .sort((a, b) => {
        const capacityDelta = (CAPACITY_RANK[a.capacityKey] || 9999) - (CAPACITY_RANK[b.capacityKey] || 9999);
        if (capacityDelta !== 0) return capacityDelta;
        return (colorOrder.get(a.colorKey) ?? 99) - (colorOrder.get(b.colorKey) ?? 99);
      });
    const capacityKeys = [...new Set(modelProducts.map((product) => product.capacityKey))];
    capacityKeys.sort((a, b) => (CAPACITY_RANK[a] || 9999) - (CAPACITY_RANK[b] || 9999));
    const usedColors = new Set(modelProducts.map((product) => product.colorKey));
    return {
      id: modelId,
      name: screensByKey.get(modelId) || family.name,
      colors: colors.filter((color) => usedColors.has(color.key)),
      capacities: capacityKeys.map((key) => ({ key, label: capacityLabel(key) })),
      products: modelProducts,
    };
  });

  return { id: family.id, name: family.name, models };
}

export function normalizeCatalog(families, updatedAt = new Date().toISOString()) {
  return { updatedAt, families };
}
