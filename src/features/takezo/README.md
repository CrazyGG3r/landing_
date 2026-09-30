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
  logo: "/takezo/mark.svg",
  baseColor: "#B95745",
}
```

A card inherits the defaults and can override `logo` or `baseColor`. A card's explicit `tags` replaces the inherited list; `tags: []` opts out. Use `Halftone` for the baked vector dot pattern or `Prototype` for the distressed geometric textures. Overlay priority is Prototype, Dirty, then Halftone. Tags are case-sensitive.

- `logo`: supply a dedicated SVG URL in `logo`; the default is the sample Takezo mark. Compact 1×1 tiles show the mark in place of the visual title (the accessible title remains). Tall strips place it above the title, horizontal strips before it. Actual measured dimensions also activate these modes as neighboring panels shrink. Expansion restores the title and fades the mark away. The sample marks are placeholders and can be replaced independently for each panel.
- `expansion-max`: all tracks outside the selected panel shrink to a 44px minimum, or 28px on axes smaller than 600px, accounting for grid gaps. Small viewports use equal tracks if there is no spare room. Rectangular panels sharing the selected tracks retain those shared dimensions; this preserves the tiling without overlaps. Hover, keyboard focus, and touch expansion use the same sizing.
- `gradient`: derives two restrained warm/light and deep/muted endpoints from `baseColor` (six-digit hex), falling back to the card palette. The base remains available for navigation's traveling circle.
- `Dirty`: discovers `public/images/grunge/Dirty*.png` at build time. Randomly selects one transparent texture per mounted panel and keeps it stable during resizing. Adding files requires a dev-server restart or rebuild. Uses alpha masking to tint the artwork a dark version of the base, plus a faint bottom-right shade.
- `Halftone`: uses `/takezo/halftone.svg`, a baked code-generated field of dots with increasing radius toward the bottom right. No PNG or live canvas is required.
- `Prototype`: discovers `public/images/grunge/Prototype*.png` at build time, randomly assigning one set per mounted panel. It combines with the `gradient` tag, concentrates its darker base-color tint toward the bottom right, and fades through the reading area.

Textures are anchored bottom-right with a minimum physical size, clipped to the panel, and move slightly on interaction. A diagonal mask reduces detail near the reading area; low opacity keeps labels and body text legible. Reduced-motion settings disable surface movement. Home has no feature tags: its original presentation is preserved. If logo or maximum-expansion tags are explicitly assigned there, it opts into the adaptive renderer with the equivalent four-panel grid.

Examples: `/takezo#materials` (Dirty + tall logos + max expansion), `#process` (halftone + horizontal logos), `#atlas` (36 logo tiles), `#nine` (Dirty surfaces), and the leaking project-info panel in image/video views (gradient + randomly selected Prototype texture).

## Navigation focus pull

`focusTransition.js` and `focusTransition.css` own the optional screen-space lens. Set `focusTransitionConfig.enabled` to `false` to disable it independently. Blur radius (desktop/compact), aperture, feather, reveal duration, and the halfway reveal cue are centralized in that config.

The existing navigation timeline contracts the clear region from the viewport edges toward the selected panel, carries it with the traveler, and expands it outward halfway through destination formation. Media-to-gallery returns use the same module. The traveler, breadcrumbs, motion switch, and cursor remain sharp. No blur runs on initial load or hover.

Rendering uses one temporary masked backdrop layer, with a fixed 7px blur (4px below 768px). Its opacity fades as the clear aperture expands; the blur kernel does not change every frame. There are no cloned panels, extra render loops, per-frame layout reads, or React state updates. The layer is removed on completion, resize settlement, interruption, motion preference changes, and unmount. Reduced mode and browsers without both mask and backdrop-filter support skip it. Actual frame cost still depends on viewport resolution, browser, and device GPU.

## Motion and rendering

The home Connection card uses `tags: ["breakdown"]` and a `breakdown` object with `caption` and eight `links` (`name`, `icon`, `href`, optional `iconScale` for optical sizing). `hoverMode: "contract"` contracts the hovered chunk while giving all nine chunks stable, equal-sized pointer targets; `showLinkArrows: false` removes their corner arrows. The Skillset card uses `hoverMode: "expand"` so the hovered row and column enlarge along with its logo or title. The middle caption uses `data-text-layer="hovered"`; original content is the `unhovered` layer. External links open in new tabs. The custom cursor is scoped to `/takezo` and snaps toward a Connection chunk while its pointer target remains stationary. All breakdown motion follows the global Full / Reduced switch.

The bottom-right **Motion Full / Reduced** switch is saved locally. With no saved choice, the system's reduced-motion preference supplies the default. Switching settles any navigation in progress without remounting the current viewer or resetting video time, image zoom, or gallery position. Reduced mode removes decorative motion while preserving gallery movement, cursor reading, media controls, and image inspection.

Adaptive titles share a resize observer and one queued fitting frame. Geometry reads and font writes are batched across panels, unchanged sizes are skipped, icon-only tiles skip invisible typography, and text keeps DOM-based wrapping and subpixel fitting. Layout and paint containment isolates adaptive panels; hidden reading layers do not subscribe to resize events. The gallery rail sleeps when stationary; offscreen/hidden previews pause. Video progress updates its own DOM while visible, without rerendering the viewer or information panel every frame. Main video playback is independent of the motion preference.

Verification: `node --test src/features/takezo/*.test.mjs` covers track layouts, feature tags, asset resolution, and the fitting scheduler's batching, precision, idle behavior, and cleanup.

## Responsive reading layers

Panels can provide independently tagged text layers:

```js
{
  tags: ["gradient", "cursor-read"],
  content: [
    { tag: "unhovered", text: "A short introduction." },
    { tag: "hovered", text: "The extended narrative, with paragraphs..." },
  ],
}
```

Without a layer, `description` is the fallback. Resting panels with adequate space show only the unhovered layer. Expanded panels crossfade to the hovered layer. Compressed neighbors and compact panels hide both layers and graphics, including from the accessibility tree. The `cursor-read` tag enables overflow navigation: square/tall panels read vertically, panels wider than 1.6 times their height read horizontally through columns. The middle 64% of the panel maps the cursor to the complete scroll range, with an 80ms smoothing response and soft edge masks. Native touch scrolling and keyboard arrows, Page Up/Down, Home, and End also work. Reduced motion follows the cursor directly.

Title fitting now runs on every geometry frame without delayed growth or settling timers. Dedicated logo layers keep fixed positioning during their opacity fades, avoiding the former relative/absolute positioning switch. Compact padding is protected before font size is calculated. `Work Index`, `Signal`, the first Materials panel, and the first Process panel demonstrate tagged reading layers.

Reading edge fades span up to 18% of the viewport (56px vertically, 72px horizontally). The starting edge is fully opaque at 0%; the ending edge is fully opaque at 100%. Native scrolling and cursor movement update those endpoints alike. Inline logos use the fitted title's actual glyph metrics to match its visible height and vertical center; use tightly cropped SVG viewBoxes for replacement marks.

## Showcase gallery and media

Breakdown chunks remain opaque while their gaps and corners close; the original content returns after their reunion. Both galleries curve tiles toward the centre using their horizontal position. The shared rail updates only while moving, and reduced motion disables this tilt. Entrances include visible repeated copies on both sides. Artwork landscapes group at most two per column, while portrait/square images group up to three; caption sizing follows each tile's width and height.

The route-scoped cursor now uses `cursor/arrow.svg` for its standard state, morphs into `cursor/trigger.svg` over enabled clickable targets, and enters the eight-ellipse `cursor/wait.svg` orbit while navigation is busy. The arrow has a damped rotational response to mouse movement. The Connection hit grid retains its magnetic cursor placement and resolves clickability from the actual underlying chunk, so decorative targets do not show the trigger. Outlines are sampled once on mount; RAF sleeps outside morphs, inertia settling, short magnetic movement, and the active wait orbit. The site Full / Reduced switch also controls cursor motion, and touch/coarse pointers retain the native cursor.

`cursorDiminish: true` on a card smoothly scales the cursor to zero while it remains active. The home Connection card and Skillset’s 3D card opt in. The cursor is layered inside the hovered panel: above media and other inner content, but below its title/header, so the portrait formation stays behind the cursor without covering the heading.

### Assigned image motion

Add `spreading` or `falling` to a card's `tags`, then set `assetImages` to a single URL or an array of PNG/WebP/SVG URLs. These optional, masked layers respond to hover/focus and cursor parallax. The sample page is `/takezo#asset-motion`.

```js
tags: ["spreading"],
assetImages: ["/takezo/example.webp", "/takezo/mark.svg"],
assetMotion: {
  x: 73, y: 55, width: 48, // percentages of panel
  spread: 34, rotation: 22, // fan offset (%) and degrees
  startScale: 1.8, endScale: 1,
  duration: .76, stagger: .055, // seconds
  parallax: 14, opacity: .9,
},
```

An individual image can be `{ src, x, y, rotation, scale }` to override its fan placement. `falling` uses `startScale` for its overhead arrival. The motion toggle retains the resting composition with a short visibility fade; parallax stops. No animation loop runs while a layer is idle.

The Showcase panel on `/takezo#work` opens `/takezo#gallery`. Cards loop horizontally; the cursor accelerates near either edge and comes to rest around the middle. Touch dragging, a wheel, and left/right arrow keys also move the rail. Project card width follows the aspect ratio of its main image. Groups crossfade their gallery preview images, while PolyCrate uses its WebM preview. Hover reveals the title, short introduction, and the supplied software SVG marks.

Project images are discovered automatically from `public/takezo/showcase/projects/images`. A base filename and numbered siblings such as `Crab.jpg`, `Crab (1).jpg`, and `Crab (2).jpg` become one project; repeated `Name 1`, `Name 2` and `Name 1 of 3`, `Name 2 of 3` patterns group too. The filename becomes the title. Optional same-stem files in `projects/thumbnails` are used as efficient previews; until one exists, the original is used so new work never disappears. Edit `projects/showcase info.md` to override year, short text, main details, and software. Projects without a matching notes section still appear with neutral placeholder details.

The home Showcase panel divides into Gallery, Projects, and Artworks. Projects opens the project gallery. Artworks opens a three-row, infinitely looping mosaic with the same edge navigation and image viewer. Artwork originals are discovered from `public/takezo/showcase/artworks/images` and use the same numbered-sibling grouping rules as projects. Optional same-stem previews live in `artworks/thumbnails`. Edit `images/artwork-catalog.md` to override category, year, short text, and main details; grouped work can use one row named after the shared base title. Uncatalogued files still appear with neutral placeholder details.

`npm run dev` and `npm run build` regenerate both manifests automatically. While the development server is running, adding, replacing, renaming, or removing a gallery image refreshes both indexes and reloads the page automatically. `npm run takezo:galleries` remains available for a manual refresh; the legacy `takezo:showcase` and `takezo:artworks` commands are aliases for the same unified indexer.

The home Skillset panel divides into a 3×3 logo grid. The centre opens a dedicated eight-panel skillset page. Breakdown content and destinations are configured on each home card in `takezoData.js`.

Individual images open in a panel viewer with zoom, reset, and bounded drag pan. Groups have a vertical, magnetic image selector and a numbered filmstrip; selecting an image enters inspect mode. PolyCrate opens the modular video panel with custom play/pause and seek controls. The selected gallery panel transitions to the video play button; returning from an image or video zooms the masked media back into its centered gallery card. Image and video pages share the right-edge project information panel; hover, keyboard focus, or a tap opens it. All destinations remain `/takezo#...` so browser Back and breadcrumbs continue to work.

Takezo's SVG assets now live under `public/takezo`. Dirty and Prototype PNGs remain under `public/images/grunge`.
