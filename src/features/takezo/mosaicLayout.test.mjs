import test from "node:test";
import assert from "node:assert/strict";
import { nodes, trailFor } from "./takezoData.js";
import { layoutFor, expandedTracks, generateLayout } from "./mosaicLayout.js";

test("every inner page tiles all 36 cells exactly once", () => {
  for (const [id, node] of Object.entries(nodes)) {
    if (id === "home") continue;
    const occupied = new Set();
    for (const [x, y, w, h] of layoutFor(node)) {
      assert.ok(
        x >= 1 && y >= 1 && w >= 1 && h >= 1 && x + w <= 7 && y + h <= 7,
        id,
      );
      for (let row = y; row < y + h; row++)
        for (let col = x; col < x + w; col++) {
          const key = `${col},${row}`;
          assert.ok(!occupied.has(key), `${id} overlaps at ${key}`);
          occupied.add(key);
        }
    }
    assert.equal(occupied.size, 36, `${id} leaves gaps`);
    assert.equal(trailFor(id)[0], "home");
    node.cards.forEach((card) => {
      if (card.id) assert.ok(nodes[card.id], `${id} has a broken destination`);
    });
  }
  assert.equal(nodes.atlas.cards.length, 36);
});

test("expansion preserves the track budget and gives every neighbor space", () => {
  for (const pixels of [300, 760, 1440])
    for (let span = 1; span <= 6; span++)
      for (let start = 1; start + span <= 7; start++) {
        const tracks = expandedTracks(
          start,
          span,
          pixels,
          Math.min(440, pixels * 0.8),
        );
        assert.ok(tracks.every((value) => value > 0));
        assert.ok(
          Math.abs(tracks.reduce((sum, value) => sum + value, 0) - 6) < 0.00001,
        );
        const selected = tracks
          .slice(start - 1, start - 1 + span)
          .reduce((sum, value) => sum + value, 0);
        assert.ok(selected >= span - 0.00001);
      }
});

test("automatic compositions support every panel count from 1 through 36", () => {
  for (let count = 1; count <= 36; count++) {
    const rects = generateLayout(count),
      cells = new Set();
    assert.equal(rects.length, count);
    for (const [x, y, w, h] of rects)
      for (let row = y; row < y + h; row++)
        for (let col = x; col < x + w; col++) {
          const key = `${col},${row}`;
          assert.ok(!cells.has(key));
          assert.ok(col >= 1 && col <= 6 && row >= 1 && row <= 6);
          cells.add(key);
        }
    assert.equal(cells.size, 36);
  }
  assert.throws(() => generateLayout(37));
});
