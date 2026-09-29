import assert from "node:assert/strict";
import test from "node:test";

test("decorative panel activity pauses offscreen and in hidden tabs", async () => {
  const originalDocument = globalThis.document;
  const originalObserver = globalThis.IntersectionObserver;
  const listeners = new Map();
  let intersectionCallback;
  let observed;
  let unobserved;
  globalThis.document = {
    hidden: false,
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: (name) => listeners.delete(name),
  };
  globalThis.IntersectionObserver = class {
    constructor(callback) { intersectionCallback = callback; }
    observe(element) { observed = element; }
    unobserve(element) { unobserved = element; }
  };

  try {
    const { observePanelActivity } = await import(`./panelActivity.js?test=${Date.now()}`);
    const element = {};
    const states = [];
    const cleanup = observePanelActivity(element, (active) => states.push(active));
    assert.equal(observed, element);
    assert.deepEqual(states, [true]);

    intersectionCallback([{ target: element, isIntersecting: false }]);
    assert.deepEqual(states, [true, false]);
    globalThis.document.hidden = true;
    listeners.get("visibilitychange")();
    intersectionCallback([{ target: element, isIntersecting: true }]);
    assert.deepEqual(states, [true, false], "hidden documents stay paused even when intersecting");

    globalThis.document.hidden = false;
    listeners.get("visibilitychange")();
    assert.deepEqual(states, [true, false, true]);
    cleanup();
    assert.equal(unobserved, element);
    assert.equal(listeners.has("visibilitychange"), false);
  } finally {
    if (originalDocument === undefined) delete globalThis.document; else globalThis.document = originalDocument;
    if (originalObserver === undefined) delete globalThis.IntersectionObserver; else globalThis.IntersectionObserver = originalObserver;
  }
});
