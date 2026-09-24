import assert from "node:assert/strict";
import test from "node:test";
import { observePanelFit } from "./panelFit.js";

test("36 resizing panels share a frame, fit exactly, settle, and cancel cleanly", async () => {
  const originals = Object.fromEntries(["requestAnimationFrame", "cancelAnimationFrame", "ResizeObserver", "document"].map((key) => [key, globalThis[key]]));
  const frames = new Map();
  let sequence = 0, resize;
  globalThis.requestAnimationFrame = (callback) => { frames.set(++sequence, callback); return sequence; };
  globalThis.cancelAnimationFrame = (id) => frames.delete(id);
  globalThis.ResizeObserver = class {
    constructor(callback) { resize = callback; }
    observe() {}
    unobserve() {}
  };
  globalThis.document = { fonts: { ready: Promise.resolve() } };
  const drain = () => { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach((callback) => callback()); };
  const style = () => {
    const values = new Map();
    return { getPropertyValue: (key) => values.get(key), setProperty: (key, value) => values.set(key, value) };
  };
  let writes = 0;
  const jobs = Array.from({ length: 36 }, () => {
    let size = 1, hidden;
    const interior = { getAttribute: () => hidden, setAttribute: (_, value) => { hidden = value; }, inert: false };
    return {
      el: { clientWidth: 300, clientHeight: 300, isConnected: true, dataset: {}, style: style(), querySelector: () => interior },
      box: { clientWidth: 200, clientHeight: 40 },
      label: {
        style: { set fontSize(value) { size = parseFloat(value); writes++; }, get fontSize() { return `${size}px`; } },
        get scrollWidth() { return 190; },
        get scrollHeight() { return size <= 30 ? 34 : 70; },
      },
      expanded: false, compressed: false, logo: null, text: "A wrapping title",
    };
  });
  const cleanups = [];
  try {
    jobs.forEach((job) => cleanups.push(observePanelFit(job)));
    await Promise.resolve();
    assert.equal(frames.size, 1, "font readiness and all panels coalesce into one frame");
    drain();
    jobs.forEach((job) => assert.ok(parseFloat(job.label.style.fontSize) <= 30 && parseFloat(job.label.style.fontSize) > 29.98));
    assert.equal(frames.size, 0, "no perpetual idle frame loop");
    const settledWrites = writes;
    resize(jobs.map((job) => ({ target: job.el })));
    drain();
    assert.equal(writes, settledWrites, "unchanged geometry does not refit text");
    jobs.forEach((job) => { job.box.clientHeight = 80; });
    resize(jobs.map((job) => ({ target: job.box })));
    drain();
    jobs.forEach((job) => assert.equal(parseFloat(job.label.style.fontSize), 54, "larger boxes recover the design maximum"));
    resize(jobs.map((job) => ({ target: job.el })));
    cleanups.forEach((cleanup) => cleanup());
    assert.equal(frames.size, 0, "unmount cancels queued work");
  } finally {
    cleanups.forEach((cleanup) => cleanup());
    for (const [key, value] of Object.entries(originals)) {
      if (value === undefined) delete globalThis[key]; else globalThis[key] = value;
    }
  }
});
