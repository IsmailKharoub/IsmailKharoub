export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function parseLocation(raw) {
  const location = String(raw || "")
    .trim()
    .replace(/\s+/g, " ");
  if (!location) {
    throw new HttpError(400, "Enter a ZIP code or a city and state.");
  }
  if (location.length > 40 || !/^[A-Za-z0-9][A-Za-z0-9 .,'-]*$/.test(location)) {
    throw new HttpError(400, "Use a ZIP code or a city and state, like 90024 or Los Angeles, CA.");
  }
  return location;
}

const PART_NUMBER = /^[A-Z0-9]{4,6}LL\/A$/;

export function parseParts(raw) {
  const values = (Array.isArray(raw) ? raw : [raw])
    .flatMap((value) => String(value || "").split(","))
    .map((value) => value.trim().toUpperCase())
    .filter(Boolean);
  const parts = [...new Set(values)];
  if (!parts.length) throw new HttpError(400, "Choose an iPhone configuration.");
  if (parts.length > 12) throw new HttpError(400, "Check up to 12 configurations at once.");
  if (parts.some((part) => !PART_NUMBER.test(part))) {
    throw new HttpError(400, "That iPhone configuration is not recognized.");
  }
  return parts;
}

export function formatPhone(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (national.length !== 10) return String(raw || "").trim();
  return `(${national.slice(0, 3)}) ${national.slice(3, 6)}-${national.slice(6)}`;
}

export function toHttps(url) {
  const value = String(url || "").trim();
  if (!value) return "";
  return value.replace(/^http:\/\//, "https://");
}

export function normalizePickup(body) {
  const stores = Array.isArray(body?.stores) ? body.stores : [];
  if (!stores.length) {
    throw new HttpError(
      400,
      body?.errorMessage || "No Apple Stores were found for that location.",
    );
  }

  const normalized = stores.map((store) => {
      const retail = store.retailStore || {};
      const address = retail.address || {};
      const hourSource = retail.storeHours || store.storeHours?.hours || [];
      const parts = Object.values(store.partsAvailability || {}).map((info) => {
        const regular = info.messageTypes?.regular || {};
        const pickupDisplay = info.pickupDisplay || "unknown";
        return {
          partNumber: info.partNumber || "",
          available: pickupDisplay === "available",
          pickupDisplay,
          quote: info.pickupSearchQuote || regular.storePickupQuote || "",
          detail: regular.storePickupQuote || "",
          title: String(regular.storePickupProductTitle || "").replace(/\u00a0/g, " "),
        };
      });
      return {
        name: store.storeName || retail.name || "Apple Store",
        storeNumber: store.storeNumber || retail.storeNumber || "",
        city: store.city || address.city || "",
        state: store.state || address.state || "",
        distanceMiles: typeof store.storedistance === "number" ? store.storedistance : retail.distance ?? null,
        distanceLabel: store.storeDistanceWithUnit || retail.distanceWithUnit || "",
        street: address.street || store.address?.address2 || "",
        postalCode: address.postalCode || store.address?.postalCode || "",
        phone: formatPhone(store.phoneNumber || retail.phoneNumber || ""),
        url: toHttps(store.reservationUrl || store.hoursUrl || retail.hoursAndInfoUrl || ""),
        hours: hourSource
          .filter((hour) => hour?.storeTimings)
          .map((hour) => ({
            days: String(hour.storeDays || "").replace(/:$/, ""),
            hours: hour.storeTimings,
          })),
        parts,
        availableCount: parts.filter((part) => part.available).length,
      };
    });
  normalized.sort(
    (a, b) => (a.distanceMiles ?? Number.POSITIVE_INFINITY) - (b.distanceMiles ?? Number.POSITIVE_INFINITY),
  );
  return { location: body.location || "", stores: normalized };
}
