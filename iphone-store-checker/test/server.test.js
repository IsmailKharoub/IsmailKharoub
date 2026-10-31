import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";
import { createServer } from "../src/server.js";

function jsonResponse(body, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async text() {
      return JSON.stringify(body);
    },
  };
}

function listen(server) {
  server.listen(0, "127.0.0.1");
  return once(server, "listening").then(() => server.address().port);
}

test("availability rejects an empty location before calling Apple", async () => {
  let called = false;
  const server = createServer({
    fetchImpl: async () => {
      called = true;
      return jsonResponse({});
    },
  });
  const port = await listen(server);
  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/availability?location=&parts=MJQ34LL/A`);
    const body = await response.json();
    assert.equal(response.status, 400);
    assert.match(body.error, /ZIP code/);
    assert.equal(called, false);
  } finally {
    server.close();
  }
});

test("availability returns normalized stores from Apple", async () => {
  const server = createServer({
    fetchImpl: async (url) => {
      assert.match(String(url), /pickup-message/);
      assert.match(String(url), /location=90024/);
      assert.match(String(url), /parts\.0=MJQ34LL%2FA/);
      return jsonResponse({
        body: {
          location: "90024",
          stores: [
            {
              storeName: "Century City",
              city: "Los Angeles",
              state: "CA",
              storedistance: 1.1,
              storeDistanceWithUnit: "1.1 mi",
              phoneNumber: "3105551212",
              partsAvailability: {
                "MJQ34LL/A": { partNumber: "MJQ34LL/A", pickupDisplay: "available", pickupSearchQuote: "Available Today", messageTypes: { regular: {} } },
              },
              retailStore: { address: { street: "10250 Santa Monica Boulevard" }, storeHours: [] },
            },
          ],
        },
      });
    },
  });
  const port = await listen(server);
  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/availability?location=90024&parts=MJQ34LL/A`);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.stores[0].name, "Century City");
    assert.equal(body.stores[0].parts[0].available, true);
    assert.ok(body.checkedAt);
  } finally {
    server.close();
  }
});

test("catalog route normalizes the lineup", async () => {
  const server = createServer({
    fetchImpl: async () => jsonResponse({
      body: {
        productLocatorOverlayData: {
          productLocatorMeta: {
            prices: { unlocked: { fullPrice: "$799.00" } },
            dimensionsVariations: {
              dimensionColor: [{ key: "black", value: "Black" }],
              dimensionCapacity: [{ key: "128gb" }],
            },
            products: [
              {
                partNumber: "MYAP3LL/A",
                productTitle: "iPhone 16 128GB Black",
                price: "unlocked",
                dimensionColor: "black",
                dimensionCapacity: "128gb",
                image: "iphone-16",
                productLink: "/shop/buy-iphone/iphone-16",
              },
            ],
          },
        },
      },
    }),
  });
  const port = await listen(server);
  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/catalog`);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.families.length, 6);
    assert.equal(body.families[0].models[0].products[0].partNumber, "MYAP3LL/A");
  } finally {
    server.close();
  }
});

function pickupPayload(quote) {
  return {
    body: {
      location: "90024",
      stores: [
        {
          storeName: "Century City",
          storeNumber: "R092",
          city: "Los Angeles",
          state: "CA",
          storedistance: 1.1,
          storeDistanceWithUnit: "1.1 mi",
          partsAvailability: {
            "MJQ34LL/A": { partNumber: "MJQ34LL/A", pickupDisplay: "available", pickupSearchQuote: quote, messageTypes: { regular: {} } },
          },
          retailStore: { address: { street: "10250 Santa Monica Boulevard" }, storeHours: [] },
        },
      ],
    },
  };
}

test("repeated checks reuse one Apple response and keep its check time", async () => {
  let calls = 0;
  const server = createServer({
    availabilityTtlMs: 60_000,
    fetchImpl: async () => {
      calls += 1;
      return jsonResponse(pickupPayload("Available Today"));
    },
  });
  const port = await listen(server);
  const url = `http://127.0.0.1:${port}/api/availability?location=90024&parts=MJQ34LL/A`;
  try {
    const first = await (await fetch(url)).json();
    const second = await (await fetch(url)).json();
    assert.equal(calls, 1);
    assert.equal(second.cached, true);
    assert.equal(second.checkedAt, first.checkedAt);
    assert.equal(second.stores[0].parts[0].quote, "Available Today");

    const fresh = await (await fetch(`${url}&fresh=1`)).json();
    assert.equal(calls, 2);
    assert.equal(fresh.cached, false);
    assert.equal(fresh.stores[0].parts[0].quote, "Available Today");
  } finally {
    server.close();
  }
});

test("overlapping checks share a single Apple request", async () => {
  let calls = 0;
  let release;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  const server = createServer({
    fetchImpl: async () => {
      calls += 1;
      await gate;
      return jsonResponse(pickupPayload("Available Today"));
    },
  });
  const port = await listen(server);
  const url = `http://127.0.0.1:${port}/api/availability?location=90024&parts=MJQ34LL/A&fresh=1`;
  try {
    const first = fetch(url);
    const second = fetch(url);
    await new Promise((resolve) => setTimeout(resolve, 30));
    assert.equal(calls, 1);
    release();
    const [left, right] = await Promise.all([first, second]);
    assert.equal(left.status, 200);
    assert.equal(right.status, 200);
    assert.equal((await left.json()).cached, false);
    assert.equal((await right.json()).cached, false);
  } finally {
    server.close();
  }
});

test("static files stay inside the public directory", async () => {
  const server = createServer({ fetchImpl: async () => jsonResponse({}) });
  const port = await listen(server);
  try {
    const page = await fetch(`http://127.0.0.1:${port}/`);
    assert.equal(page.status, 200);
    assert.match(await page.text(), /Is that iPhone in a store near you/);
    const escaped = await fetch(`http://127.0.0.1:${port}/%2e%2e/%2e%2e/package.json`);
    assert.equal(escaped.status, 404);
  } finally {
    server.close();
  }
});
