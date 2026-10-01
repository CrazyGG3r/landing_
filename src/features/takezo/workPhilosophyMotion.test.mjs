import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { nodes } from "./takezoData.js";

test("Work Philosophy exposes a dedicated six-stage operating method", () => {
  const card = nodes.identity.cards.find((item) => item.title === "WORK\nPHILOSOPHY");
  assert.equal(card.workPhilosophy.steps.length, 6);
  assert.deepEqual(card.workPhilosophy.steps.map((step) => step.label), [
    "Define", "Clarify", "Create", "Balance", "Align", "Refine",
  ]);
});

test("Work Philosophy draws its line before the stopper cascade without an overlay panel", () => {
  const css = readFileSync(new URL("./workPhilosophyMotion.css", import.meta.url), "utf8");
  assert.match(css, /\.tz-work-method-line\s*\{[^}]+scaleX\(0\)/s);
  assert.match(css, /\.tz-work-method\[data-open="true"\] \.tz-work-method-line\s*\{[^}]+scaleX\(1\)/s);
  assert.match(css, /nth-of-type\(6\)[^{]*\{[^}]*animation-delay:\s*1\.18s/);
  assert.doesNotMatch(css, /\.tz-work-method\s*\{[^}]+background:/s);
  assert.match(css, /rotate\(-45deg\)/);
});
