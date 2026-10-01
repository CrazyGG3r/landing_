import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { interestDrive, interestMode, interestRailMetrics } from "./interestMotion.js";
import { nodes } from "./takezoData.js";

test("interest field uses six interactive items followed by six decorative items", () => {
  const items = nodes.identity.cards.find((card) => card.title === "INTERESTS").interests.items;
  assert.equal(items.length, 12);
  assert.equal(items.filter((item) => item.interactive).length, 6);
  assert.ok(items.slice(0, 6).every((item) => item.interactive && item.image));
  assert.ok(items.slice(6).every((item) => !item.interactive && !item.image));
  assert.deepEqual(items.map((item) => item.id), [
    "world-building", "asset-preparation", "creative-experimentation",
    "lies-of-p", "minecraft", "vagabond", "jojo", "attack-on-titan",
    "blender", "zbrush", "substance-painter", "unreal-engine",
  ]);
  for (const item of items) {
    assert.ok(existsSync(resolve(`public${item.icon}`)), item.icon);
    if (item.image) assert.ok(existsSync(resolve(`public${item.image}`)), item.image);
  }
  assert.deepEqual([...new Set(items.map((item) => item.x))], [69, 78, 87, 96]);
  assert.deepEqual([...new Set(items.map((item) => item.y))], [28, 53, 78]);
  assert.ok(items.every((item) => item.scale === .84 && item.depth === 0 && item.rotation === 0));
});

test("the Interests title cannot block the upper interactive icons", () => {
  const css = readFileSync(new URL("./interestsMotion.css", import.meta.url), "utf8");
  assert.match(css, /\.tz-interest-panel \.tz-title-composition\s*\{\s*pointer-events:\s*none;/);
  assert.doesNotMatch(css, /selection-lift/);
  assert.match(css, /data-selected="true"\][^{]+img\s*\{[^}]+transform:\s*scale\(1\.095\)/s);
});

test("active interests hide default copy and protect difficult caption contrast", () => {
  const css = readFileSync(new URL("./interestsMotion.css", import.meta.url), "utf8");
  assert.match(css, /data-interest-active="true"[^}]+tz-title-composition[^}]+opacity:\s*0/s);
  assert.match(css, /data-interest="creative-experimentation"/);
  assert.match(css, /data-interest="vagabond"/);
  assert.match(css, /text-shadow:[^}]+#0d110e/s);
  assert.match(css, /\.tz-interest-panel \.tz-copy-detail[^}]+column-count:\s*1/s);
  assert.match(css, /@keyframes tz-interest-caption-in/);
  assert.doesNotMatch(css, /data-interest-active="true"[^}]+\.tz-copy-layers\s*\{[^}]*opacity:\s*\.08/s);
  assert.match(css, /tz-title-composition[^}]+opacity \.58s[^;]+\.44s/s);
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
