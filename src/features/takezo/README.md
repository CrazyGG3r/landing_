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

## Opt-in panel features

Set `tags` on a card, or `panelDefaults` on a node to apply features to every card on that page:

```js
panelDefaults: {
  tags: ["logo", "expansion-max", "gradient", "Dirty"],
  logo: "/images/takezo/mark.svg",
  baseColor: "#B95745",
}
```

A card inherits the defaults and can override `logo` or `baseColor`. A card's explicit `tags` replaces the inherited list; `tags: []` opts out. Use `Halftone` instead of `Dirty` to choose the baked vector dot pattern. If both are present, Dirty takes precedence. Tags are case-sensitive.

- `logo`: supply a dedicated SVG URL in `logo`; the default is the sample Takezo mark. Compact 1×1 tiles show the mark in place of the visual title (the accessible title remains). Tall strips place it above the title, horizontal strips before it. Actual measured dimensions also activate these modes as neighboring panels shrink. Expansion restores the title and fades the mark away. The sample marks are placeholders and can be replaced independently for each panel.
- `expansion-max`: all tracks outside the selected panel shrink to a 44px minimum, or 28px on axes smaller than 600px, accounting for grid gaps. Small viewports use equal tracks if there is no spare room. Rectangular panels sharing the selected tracks retain those shared dimensions; this preserves the tiling without overlaps. Hover, keyboard focus, and touch expansion use the same sizing.
- `gradient`: derives two restrained warm/light and deep/muted endpoints from `baseColor` (six-digit hex), falling back to the card palette. The base remains available for navigation's traveling circle.
- `Dirty`: discovers `public/images/grunge/Dirty*.png` at build time. Randomly selects one transparent texture per mounted panel and keeps it stable during resizing. Adding files requires a dev-server restart or rebuild. Uses alpha masking to tint the artwork a dark version of the base, plus a faint bottom-right shade.
- `Halftone`: uses `/images/takezo/halftone.svg`, a baked code-generated field of dots with increasing radius toward the bottom right. No PNG or live canvas is required.

Textures are anchored bottom-right with a minimum physical size, clipped to the panel, and move slightly on interaction. A diagonal mask reduces detail near the reading area; low opacity keeps labels and body text legible. Reduced-motion settings disable surface movement. Home has no feature tags: its original presentation is preserved. If logo or maximum-expansion tags are explicitly assigned there, it opts into the adaptive renderer with the equivalent four-panel grid.

Examples: `/takezo#materials` (Dirty + tall logos + max expansion), `#process` (halftone + horizontal logos), `#atlas` (36 logo tiles), `#nine` (Dirty surfaces), and two selectively tagged panels on `#work`.
