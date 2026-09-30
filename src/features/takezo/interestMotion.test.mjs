import assert from "node:assert/strict";
import test from "node:test";
import { interestDrive, interestMode, interestRailMetrics } from "./interestMotion.js";
import { nodes } from "./takezoData.js";

test("interest field uses six interactive items followed by six decorative items", () => {
  const items = nodes.identity.cards.find((card) => card.title === "INTERESTS").interests.items;
  assert.equal(items.length, 12);
  assert.equal(items.filter((item) => item.image).length, 6);
  assert.ok(items.slice(0, 6).every((item) => item.image));
  assert.ok(items.slice(6).every((item) => !item.image));
});

test("narrow navigation has a centered neutral zone and gentle directional drive", () => {
  assert.equal(interestDrive(.5), 0);
  assert.equal(interestDrive(.325), 0);
  assert.equal(interestDrive(.675), 0);
  assert.ok(interestDrive(.1) > 0);
  assert.ok(interestDrive(.9) < 0);
  assert.ok(Math.abs(interestDrive(.31)) < Math.abs(interestDrive(.1)));
});

test("responsive mode and bounded rail preserve the ordered sequence", () => {
  assert.equal(interestMode(920, 420), "wide");
  assert.equal(interestMode(560, 420), "narrow");
  const rail = interestRailMetrics(420, 12);
  assert.ok(rail.spacing >= 54 && rail.spacing <= 96);
  assert.equal(rail.maximum, 0);
  assert.ok(rail.minimum < 0);
});
