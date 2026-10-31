export const WATCH_MS = 5 * 60 * 1000;

export function nextWatchDelay(lastCheckedAt, now, hidden) {
  if (hidden || !lastCheckedAt) return null;
  const elapsed = now - lastCheckedAt;
  if (elapsed >= WATCH_MS) return 0;
  return WATCH_MS - elapsed;
}

export function availabilitySignature(stores, partNumbers) {
  return stores
    .map((store) => {
      const byPart = new Map((store.parts || []).map((part) => [part.partNumber, part.available ? "1" : "0"]));
      const flags = partNumbers.map((part) => byPart.get(part) || "0").join("");
      return `${store.storeNumber}:${flags}`;
    })
    .join("|");
}
