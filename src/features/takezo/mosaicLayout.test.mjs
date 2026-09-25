import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { nodes, trailFor } from "./takezoData.js";
import { layoutFor, expandedTracks, generateLayout, maximumTracks } from "./mosaicLayout.js";
import { panelFeatures } from "./panelFeatures.js";
import { artworkColumns, artworkPositions, singleRowArtworkHeight } from "./artworkColumns.js";

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

test("home breakdown modes and Showcase motion assets resolve", () => {
  const [showcase, skillset, connection] = nodes.home.cards.slice(1);
  assert.equal(skillset.breakdown.hoverMode, "expand");
  assert.equal(connection.breakdown.hoverMode, "contract");
  assert.equal(connection.breakdown.showLinkArrows, false);
  const [, projects, artworks] = showcase.breakdown.strips;
  assert.ok(projects.tags.includes("spreading"));
  assert.ok(artworks.tags.includes("falling"));
  for (const path of [...projects.assetImages, ...artworks.assetImages])
    assert.ok(existsSync(resolve(`public${path}`)), path);
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

test("artwork gallery media resolves and remains in ascending year and title order", () => {
  assert.equal(nodes.artworks.mode, "artworks-gallery");
  const names = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
  const projects = nodes.artworks.cards.map(({ project }) => project);
  assert.deepEqual(projects, [...projects].sort((a, b) => Number(a.year) - Number(b.year)
    || names.compare(a.title, b.title)));
  for (const { id, project } of nodes.artworks.cards) {
    assert.equal(nodes[id].parent, "artworks");
    assert.match(project.year, /^\d{4}$/);
    assert.ok(["concept", "digital", "traditional"].includes(project.category));
    assert.ok(project.short && project.description);
    for (const image of project.images) {
      assert.ok(existsSync(resolve(`public${decodeURIComponent(image.src)}`)));
      assert.ok(existsSync(resolve(`public${decodeURIComponent(image.thumb)}`)));
    }
  }
  assert.ok(existsSync(resolve("public/takezo/showcase/artworks/images")));
  assert.ok(existsSync(resolve("public/takezo/showcase/artworks/thumbnails")));
});

test("artwork mosaic preserves full image proportions in one row and sizes other rows", () => {
  const cards = nodes.artworks.cards;
  for (const railHeight of [420, 640, 850]) {
    for (let rows = 1; rows <= 5; rows++) {
      const tileHeight = rows === 1 ? singleRowArtworkHeight(cards, 920, railHeight) : railHeight;
      const columns = artworkColumns(cards, tileHeight, 18, rows);
      const positions = artworkPositions(columns);
      assert.deepEqual(columns.flatMap((column) => column.cards), cards);
      assert.deepEqual(positions.items.map(({ card }) => card), cards);
      assert.ok(positions.width > 0);
      for (const column of columns) {
        assert.ok(column.cards.length <= rows);
        assert.ok(column.cards.length >= Math.floor(cards.length / columns.length));
        assert.ok(Math.abs(column.heights.reduce((sum, value) => sum + value, 0)
          + (column.heights.length - 1) * 18 - tileHeight) < .001);
        assert.ok(column.heights.every((value) => value > 0));
        if (rows === 1) {
          const { width, height } = column.cards[0].project.images[0];
          assert.equal(column.heights[0], tileHeight);
          assert.ok(Math.abs(column.width / tileHeight - width / height) < .001);
          assert.ok(column.width <= 920 * .82 + .001);
        } else assert.ok(column.width <= 520, `oversized column: ${column.width}`);
      }
    }
  }
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
