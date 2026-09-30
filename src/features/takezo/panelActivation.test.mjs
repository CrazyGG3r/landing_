import test from "node:test";
import assert from "node:assert/strict";
import { panelActivationIntent } from "./panelActivation.js";

test("touch panels preview once before activation", () => {
  assert.equal(panelActivationIntent("touch", false), "preview");
  assert.equal(panelActivationIntent("touch", true), "activate");
});

test("mouse and keyboard-style clicks activate immediately", () => {
  assert.equal(panelActivationIntent("mouse", false), "activate");
  assert.equal(panelActivationIntent("", false), "activate");
});
