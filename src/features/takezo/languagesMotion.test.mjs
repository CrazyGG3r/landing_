import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { nodes } from "./takezoData.js";

test("Languages defines English and Urdu interaction copy", () => {
  const card = nodes.identity.cards.find((item) => item.title === "LANGUAGES");
  assert.equal(card.languages.titleUrdu, "زبانیں");
  assert.deepEqual(card.languages.items.map(({ id, caption }) => [id, caption]), [
    ["english", "Good Writing skills in terms of communication"],
    ["urdu", "Native Language"],
  ]);
});

test("every Person panel provides an Urdu title", () => {
  assert.deepEqual(nodes.identity.cards.map((card) => card.titleUrdu), [
    "تاکیزو", "دلچسپیاں", "تعلیم", "زبانیں", "مقام", "کام کا فلسفہ", "دستیابی",
  ]);
});

test("Languages uses the local Tahoma font and raised active state", () => {
  const css = readFileSync(new URL("./languagesMotion.css", import.meta.url), "utf8");
  assert.ok(existsSync(new URL("../../../public/fonts/Tahoma.ttf", import.meta.url)));
  assert.match(css, /url\("\/fonts\/Tahoma\.ttf"\)/);
  assert.match(css, /data-active="true"[^}]+translateY\(clamp\(-16px,/s);
  assert.match(css, /data-page-language="urdu"/);
  assert.match(css, /@keyframes tz-language-title-in/);
});
