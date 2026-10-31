import assert from "node:assert/strict";
import test from "node:test";
import { DUO_256, UNION_SQUARE, handleMessage, parseRequest } from "../src/bot.js";

function appWith(store) {
  const calls = [];
  return {
    calls,
    availability: async (location, parts) => {
      calls.push({ location, parts });
      return {
        checkedAt: "2026-10-31T16:40:00.000Z",
        stores: [store],
      };
    },
  };
}

const unionSquare = {
  name: "Union Square",
  street: "300 Post Street",
  city: "San Francisco",
  state: "CA",
  distanceLabel: "0.18 mi",
  availableCount: 0,
  parts: [
    { partNumber: DUO_256.night.partNumber, available: false, quote: "Currently unavailable" },
    { partNumber: DUO_256.white.partNumber, available: false, quote: "Currently unavailable" },
  ],
};

test("Union Square checks use the US Duo 256GB models", async () => {
  const app = appWith(unionSquare);
  const session = {};
  const reply = await handleMessage(app, session, "Check Union Square", 1_000);
  assert.deepEqual(app.calls, [{
    location: UNION_SQUARE.location,
    parts: [DUO_256.night.partNumber, DUO_256.white.partNumber],
  }]);
  assert.match(reply.text, /Union Square/);
  assert.match(reply.text, /Night Sky: Currently unavailable/);
  assert.match(reply.text, /Star White: Currently unavailable/);
  assert.match(reply.text, /9:40 AM PDT/);
  assert.doesNotMatch(reply.text, /ZD\/A|Nachthimmel|Sternenweiß/);
});

test("a finish button checks only that US model, and repeats stay on the last answer", async () => {
  const app = appWith(unionSquare);
  const session = {};
  await handleMessage(app, session, "Night Sky", 1_000);
  await handleMessage(app, session, "/night", 2_000);
  assert.equal(app.calls.length, 1);
  assert.deepEqual(app.calls[0].parts, [DUO_256.night.partNumber]);
});

test("a typed place is still a US lookup", () => {
  assert.equal(parseRequest("San Francisco, CA").location, "San Francisco, CA");
  assert.equal(parseRequest("/check@StoreBot").location, "94108");
});
