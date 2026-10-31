import assert from "node:assert/strict";
import test from "node:test";
import { availabilitySignature, nextWatchDelay, WATCH_MS } from "../public/watch.js";

test("the next check waits out the interval and skips hidden tabs", () => {
  const checkedAt = 1_000_000;
  assert.equal(nextWatchDelay(checkedAt, checkedAt + 60_000, false), WATCH_MS - 60_000);
  assert.equal(nextWatchDelay(checkedAt, checkedAt + WATCH_MS, false), 0);
  assert.equal(nextWatchDelay(checkedAt, checkedAt + WATCH_MS + 1, true), null);
  assert.equal(nextWatchDelay(0, checkedAt, false), null);
});

test("a pickup signature changes only when availability changes", () => {
  const stores = [
    { storeNumber: "R092", parts: [{ partNumber: "MJQ34LL/A", available: false }] },
    { storeNumber: "R095", parts: [{ partNumber: "MJQ34LL/A", available: true }] },
  ];
  const before = availabilitySignature(stores, ["MJQ34LL/A"]);
  assert.equal(before, availabilitySignature(stores, ["MJQ34LL/A"]));
  stores[0].parts[0].available = true;
  assert.notEqual(before, availabilitySignature(stores, ["MJQ34LL/A"]));
});
