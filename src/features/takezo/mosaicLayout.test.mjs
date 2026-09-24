import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { nodes, trailFor } from "./takezoData.js";
import { layoutFor, expandedTracks, generateLayout, maximumTracks } from "./mosaicLayout.js";
import { panelFeatures } from "./panelFeatures.js";

test("maximum expansion leaves the minimum track size without overflow", () => {
  for (const pixels of [180, 390, 1200]) {
    for (let span = 1; span < 6; span++) {
      const tracks = maximumTracks(1, span, pixels, 8);
      const available = pixels - 40;
      assert.ok(tracks.every((n) => n > 0));
      assert.ok(Math.abs(tracks.reduce((a, b) => a + b) - 6) < 1e-9);
      assert.ok(Math.abs(tracks[5] * available / 6 - Math.min(available / 6, pixels < 600 ? 28 : 44)) < 1e-9);
    }
  }
});

test("panel tags inherit page defaults and allow explicit opt-out", () => {
  const defaults = { tags: ["logo", "gradient", "Dirty", "expansion-max"] };
  assert.equal(panelFeatures({ color: "red" }, defaults).max, true);
  assert.equal(panelFeatures({ color: "red", tags: [] }, defaults).logo, null);
  assert.equal(panelFeatures({ color: "red", tags: ["Halftone"] }, defaults).overlay, "Halftone");
  assert.equal(panelFeatures({ color: "red", tags: ["gradient", "Prototype"] }, defaults).overlay, "Prototype");
  for (let i = 1; i <= 5; i++)
    assert.ok(existsSync(resolve(`public/images/grunge/Prototype${i}.png`)));
});

test("showcase project media and software marks resolve locally", () => {
  assert.equal(nodes.gallery.cards.length, 13);
  const years = nodes.gallery.cards.map(({ project }) =>
    Math.max(0, ...[...project.year.matchAll(/\b(?:19|20)\d{2}\b/g)].map(([year]) => Number(year))));
  assert.equal(nodes.gallery.cards[0].project.id, "polycrate");
  assert.deepEqual(years, [...years].sort((a, b) => b - a));
  for (const card of nodes.gallery.cards) {
    const project = card.project;
    assert.ok(nodes[card.id]);
    for (const image of project.images) {
      assert.ok(existsSync(resolve(`public${image.src}`)), image.src);
      assert.ok(existsSync(resolve(`public${image.thumb}`)), image.thumb);
      assert.ok(image.width > 0 && image.height > 0);
    }
    if (project.video)
      for (const path of Object.values(project.video))
        assert.ok(existsSync(resolve(`public${path}`)), path);
    for (const mark of project.software)
      assert.ok(existsSync(resolve(`public/takezo/${mark}.svg`)), mark);
  }
});

test("every inner page tiles all 36 cells exactly once", () => {
  for (const [id, node] of Object.entries(nodes)) {
    if (id === "home" || node.mode) continue;
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

test("artwork gallery starts empty and its media folders exist", () => {
  assert.equal(nodes.artworks.mode, "artworks-gallery");
  assert.deepEqual(nodes.artworks.cards, []);
  assert.ok(existsSync(resolve("public/takezo/showcase/artworks/images")));
  assert.ok(existsSync(resolve("public/takezo/showcase/artworks/thumbnails")));
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
