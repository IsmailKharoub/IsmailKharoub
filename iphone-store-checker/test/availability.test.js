import assert from "node:assert/strict";
import test from "node:test";
import { formatPhone, normalizePickup, parseLocation, parseParts } from "../src/availability.js";

test("location accepts a ZIP code or city and state", () => {
  assert.equal(parseLocation(" 90024 "), "90024");
  assert.equal(parseLocation("Los Angeles, CA"), "Los Angeles, CA");
  assert.throws(() => parseLocation(""), /ZIP code/);
  assert.throws(() => parseLocation("https://evil.example"), /ZIP code or a city/);
});

test("parts are deduped and limited to iPhone part numbers", () => {
  assert.deepEqual(parseParts(["mjq34ll/a", "MJQ34LL/A,MJQ44LL/A"]), ["MJQ34LL/A", "MJQ44LL/A"]);
  assert.throws(() => parseParts(["not-a-part"]), /not recognized/);
});

test("pickup stores keep distance, hours, and availability", () => {
  const pickup = normalizePickup({
    location: "90024",
    stores: [
      {
        storeName: "Century City",
        storeNumber: "R092",
        city: "Los Angeles",
        state: "CA",
        storedistance: 1.13,
        storeDistanceWithUnit: "1.13 mi",
        phoneNumber: "310-5551212",
        reservationUrl: "http://www.apple.com/retail/centurycity",
        address: { address2: "10250 Santa Monica Boulevard", postalCode: "90067" },
        partsAvailability: {
          "MJQ34LL/A": {
            partNumber: "MJQ34LL/A",
            pickupDisplay: "available",
            pickupSearchQuote: "Available Today",
            messageTypes: { regular: { storePickupQuote: "Today at Apple Century City", storePickupProductTitle: "iPhone 18 Pro" } },
          },
          "MJQ44LL/A": {
            partNumber: "MJQ44LL/A",
            pickupDisplay: "unavailable",
            pickupSearchQuote: "Currently unavailable",
            messageTypes: { regular: {} },
          },
        },
        retailStore: {
          address: { street: "10250 Santa Monica Boulevard", city: "Los Angeles", state: "CA", postalCode: "90067" },
          storeHours: [{ storeDays: "Sun", storeTimings: "11:00 AM-7:00 PM" }],
        },
      },
    ],
  });

  assert.equal(pickup.stores[0].phone, "(310) 555-1212");
  assert.equal(pickup.stores[0].url, "https://www.apple.com/retail/centurycity");
  assert.equal(pickup.stores[0].street, "10250 Santa Monica Boulevard");
  assert.equal(pickup.stores[0].availableCount, 1);
  assert.equal(pickup.stores[0].parts[0].quote, "Available Today");
  assert.equal(pickup.stores[0].hours[0].days, "Sun");
  assert.equal(formatPhone("415-4864800"), "(415) 486-4800");
});

test("an unrecognized place surfaces Apple's message", () => {
  assert.throws(
    () => normalizePickup({ errorMessage: "Please enter a valid city, state or zip code.", stores: [] }),
    /valid city/,
  );
});
