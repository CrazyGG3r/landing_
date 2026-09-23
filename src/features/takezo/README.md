# Takezo

Personal portfolio at `/takezo`, lazy-loaded alongside `/portfolio` and `/entry`.

- `takezoData.js`: navigation tree, panel copy, palette, and sample project details. An `id` on a card links to another node; `null` creates a reading panel. Each child node has a `parent` for breadcrumbs and return navigation.
- `Takezo.jsx`: original SVG artwork, semantic panels, hash-based navigation, and GSAP transition choreography. Browser Back/Forward and direct links such as `/takezo#signal` work without leaving this route.
- `takezo.css`: scoped typography, responsive compositions, physical grid expansion, shine, and motion preferences. Uses existing local fonts; no new runtime packages or remote assets.

Projects and contact content are explicitly samples. Replace them with approved personal details and real case studies before publishing as a finished personal portfolio.

Animation carries the selected surface through contraction, travel, and expansion. Returning targets the originating panel. Input is locked during transitions; resizing settles the current transition. The system reduced-motion preference provides immediate navigation.

The directory and Back control sit above a panel grid sized to the viewport. The original home composition is preserved, including its single-column fallback on very narrow phones.

## Adaptive inner pages

`mosaicLayout.js` defines rectangular tilings of a six-column, six-row grid. Each rectangle is `[column, row, columnSpan, rowSpan]` with one-based positions. A tall 1 × 6 strip is `[1, 1, 1, 6]`; a horizontal 6 × 1 band is `[1, 1, 6, 1]`. Assign `node.layout` and provide one card per rectangle, up to 36 cards. Omit `layout` to generate a complete composition automatically for any count from 1 through 36. Sample layouts cover spires, bands, asymmetric cabinets, nine tiles, twelve specimens, and a full 36-cell atlas.

`AdaptivePanel.jsx` measures its title slot with ResizeObserver and fits type while the grid changes. Narrow tall panels use upright vertical lettering. Compact panels hide their interior and truncate the header/footer with ellipses. Hover or keyboard focus redistributes the six shared tracks, reveals the interior, and restores horizontal titles and complete labels. Escape restores the composition. On touch, tap to expand; tap a linked expanded panel again to navigate. Reading panels toggle expansion when tapped.

`mosaic.css` is scoped to inner pages. Track interpolation preserves shared edges, so neighboring panels resize without overlapping. The layout invariant checks run with `node --test src/features/takezo/mosaicLayout.test.mjs`.
