# `/takezo` — Experience, UI, and Art Direction

> A design and implementation reference for the Takezo portfolio experience.

## 1. Overview

`/takezo` is an authored, full-viewport portfolio rather than a conventional scrolling website. It presents Takezo as a multidisciplinary creative practice through a tactile field of colored panels, editorial typography, responsive mosaics, and cinematic media viewers.

The page is built around one central idea: **the interface should feel like a designed object**. Navigation does not replace that object with an unrelated screen. Panels stretch, contract, travel, divide, and reunite so the visitor can understand every destination as part of one connected visual system.

The experience combines:

- A four-panel portfolio index.
- Hash-addressable interior pages.
- Adaptive six-by-six mosaic layouts.
- Project and artwork galleries with continuous horizontal movement.
- Image and video inspection modes.
- Skill, process, material, and experimental studies.
- Contextual surface treatments and asset motion.
- A custom cursor and an explicit Full/Reduced motion control.

The React route is lazy-loaded at `/takezo`. Its internal destinations use URL fragments—for example `/takezo#skillset`, `/takezo#gallery`, and `/takezo#showcase-vagabond-arcane`—so browser history, direct links, and Back/Forward navigation remain useful.

---

## 2. Experience Goals

### Primary goals

1. **Present a recognizable creative identity.** The experience should be identifiable even when its imagery is removed. Color, typography, composition, texture, and motion form the identity together.
2. **Make breadth feel coherent.** 3D work, illustration, technical craft, design, and interactive work live in the same system without appearing interchangeable.
3. **Reward exploration.** Hover, focus, touch, dragging, and cursor position reveal additional layers without making the resting layout feel unfinished.
4. **Keep context during navigation.** Transitions preserve spatial continuity between the selected panel and its destination.
5. **Treat accessibility as part of the art direction.** Keyboard paths, visible focus, reduced motion, semantic controls, and legible reading layers are first-class behaviors.

### Intended impression

The visual voice is editorial, crafted, warm, and slightly industrial. It should feel closer to a printed artist monograph, material archive, or studio cabinet than to a software dashboard. The interface is expressive but not ornamental for its own sake: every major visual gesture should help establish hierarchy, state, or continuity.

---

## 3. Information Architecture

### Top-level index

The home composition contains four primary surfaces:

| Surface | Role | Resting visual behavior |
| --- | --- | --- |
| **Takezo / The Person** | Identity and personal practice | Tall red portrait panel with multilingual name treatment |
| **Showcase** | Projects and artworks | Wide ochre strip breakdown with spreading/falling image decks |
| **Skillset** | Tools and disciplines | Sage 3×3 breakdown that expands hovered rows and columns |
| **Good Chemistry** | Contact and social presence | Bone 3×3 connection grid whose hovered chunk contracts |

The home grid uses three columns and two rows. The identity panel spans the full left side, Showcase spans the upper-right width, and Skillset and Connection share the lower-right row. This asymmetric arrangement establishes the portrait as the anchor while leaving the portfolio’s work and capabilities visually expansive.

### Major destinations

| Fragment | Purpose |
| --- | --- |
| `#identity` | Profile, interests, education, languages, location, philosophy, and availability |
| `#gallery` | Continuously looping gallery of project groups |
| `#artworks` | Multi-row looping artwork mosaic |
| `#skillset` | Eight-panel discipline overview |
| `#work` | Selected-work studies and concept directions |
| `#experiments` | Motion, object, and type explorations |
| `#process` | Six-stage process rendered as horizontal ribbons |
| `#materials` | Surface and material studies |
| `#atlas` | Dense 36-cell panel atlas |
| `#asset-motion` | Spreading and falling image-motion studies |
| `#showcase-*` | Individual project image or video viewer |
| `#artwork-*` | Individual artwork viewer |

Breadcrumbs are generated from parent relationships in `takezoData.js`. The route therefore behaves like a small, navigable content tree while remaining inside a single React route.

---

## 4. Art Direction

### 4.1 Visual thesis

Takezo’s art direction joins two sensibilities:

- **Editorial discipline:** strong grids, oversized headlines, captions, index numbers, restrained labels, and generous hierarchy.
- **Handmade imperfection:** grain, halftone fields, distressed textures, painterly imagery, irregular visual density, and physical-feeling movement.

The result should never become glossy corporate minimalism or indiscriminate grunge. Large, calm shapes provide the structure; texture and motion add evidence of the maker.

### 4.2 Color system

The page is staged on a nearly black green background with four warm, low-saturation panel colors.

| Token / class | Value | Character and use |
| --- | --- | --- |
| `--ink` | `#20231e` | Primary dark text and linework; a softened green-black |
| `--paper` | `#d5d1c2` | Global light text; aged paper rather than pure white |
| Page background | `#151713` | Deep green-black gallery wall |
| `.tz-red` | `#b95544` | Identity, emphasis, illustration, and expressive work |
| `.tz-ochre` | `#dba35b` | Showcase, process, warmth, and crafted utility |
| `.tz-sage` | `#849975` | Skill, experimentation, 3D, and quieter structure |
| `.tz-bone` | `#c7c7bb` | Connection, artwork, reading, and neutral breathing space |

These colors are semantic by association rather than rigid status colors. Repetition gives the visitor orientation, while alternating colors keeps dense mosaics visually legible.

When the `gradient` feature is enabled, a panel derives restrained light/warm and deep/muted endpoints from its base color. The gradient must preserve the panel’s identity and text contrast rather than introduce a new hue family.

### 4.3 Typography

The typography is deliberately mixed-scale:

- **Takezo / BL Melody Regular and Bold** carries titles and display copy. Large headings use tight leading (approximately `0.9`) and negative tracking (approximately `-0.06em`) to form dense graphic blocks.
- **Takezo Mono / BL Melody Mono** carries navigation, indices, kickers, metadata, control labels, and technical annotations.
- **Ko Banzeen** renders the Arabic Takezo name.
- **FOT Matisse Pro EB** renders the Japanese name.

Display type is treated as image as much as language. Newlines are intentional compositional tools. Headlines should remain short, active, and capable of holding a panel on their own.

The adaptive panels fit their titles to measured space. Tall, narrow surfaces may use upright vertical lettering; icon-sized cells replace visible titles with marks while preserving accessible naming. Expanded panels restore horizontal titles and complete labels.

### 4.4 Shape language

The main panels use generous rounded corners—`22px` on larger viewports and `18px` on compact layouts. The large radii make the interface feel like a set of physical cards or trays without turning it into a playful bubble UI.

Inside those panels, thin dark rules, square image crops, technical labels, tight pills, and grid-aligned edges restore precision. The contrast between soft containers and exact internal geometry is central to the visual language.

### 4.5 Texture and surface

A very faint fixed grain lies over the entire route. Individual panels may add one of three authored surface systems:

- **Dirty:** randomly selects a transparent distressed texture, tints it with a darkened version of the panel color, and anchors it to the lower-right.
- **Halftone:** uses a generated SVG dot field whose dots increase toward the lower-right.
- **Prototype:** layers distressed geometric material into a radial/diagonal fade, concentrating visual weight away from the reading area.

Surface detail should remain atmospheric. Masks reduce texture near copy, opacity remains low, and text must retain clean contrast. Overlay priority is Prototype, Dirty, then Halftone.

### 4.6 Image treatment

Portfolio images are allowed to remain vivid and heterogeneous; the surrounding UI supplies cohesion. Thumbnails favor strong edge-to-edge crops and reveal metadata on interaction. Project cards inherit the aspect ratio of their lead image rather than forcing every work into a uniform template.

Artwork is arranged by visual shape: landscape works group no more than two per column, while square and portrait works can group up to three. This produces a mosaic rhythm without carelessly cropping original compositions.

### 4.7 Iconography and marks

The route uses a small family of graphic motifs:

- A portrait formation for identity.
- Arrow, asterisk, orbit, signal, sculpture, gallery, fold, and Takezo marks.
- Software marks for tools such as Blender, ZBrush, Photoshop, Substance 3D, Unity, After Effects, and Marvelous Designer.

Marks may replace titles in compact cells and align beside titles in strips. SVG view boxes should be tightly cropped because visual fitting uses the actual asset bounds.

---

## 5. Core UI Composition

### 5.1 Global frame

The route fills `100svh` (`100dvh` on mobile), locks page overflow, and divides the viewport into:

1. A compact directory/breadcrumb row.
2. A flexible board that consumes the remaining height.

Horizontal padding scales from `20px` to `100px`; on very large screens the composition is centered within an approximately 1550px visual field. This keeps the interface immersive without allowing the panels to become unreadably wide.

### 5.2 Home panels

Every home panel contains some combination of:

- A kicker/index at the upper edge.
- A destination or passive-state symbol.
- An oversized title.
- A primary visual or interactive breakdown.
- A short descriptive line and directional affordance.

The title, visual, and description are not three unrelated modules. They overlap and counterbalance each other to make each panel a poster-like composition.

Hovering a standard home panel subtly redistributes the grid tracks, giving the active panel more room while compressing its neighbors. Artwork may rotate or translate, the action arrow nudges diagonally, and a restrained diagonal shine crosses linked panels.

### 5.3 Adaptive mosaic pages

Interior pages use a six-column by six-row conceptual grid. Every panel occupies a rectangle described as:

```js
[column, row, columnSpan, rowSpan]
```

Panels share interpolated tracks, so expanding one panel also adjusts every neighbor that shares its rows or columns. This maintains a complete cabinet-like composition without overlap or disconnected animation.

Important states include:

- **Resting:** all panels form the authored mosaic.
- **Focused/hovered:** the active panel receives more shared space.
- **Maximum expansion:** tracks outside the selected surface shrink toward a safe minimum.
- **Compact:** interior copy and decorative layers are hidden; the accessible title remains.
- **Touch-expanded:** the first tap expands; a second tap follows a destination when present.

This two-step touch contract also applies to linked index panels: the first tap
locks their hover-equivalent preview, and a second tap on the same panel
navigates. Mouse clicks and keyboard activation remain immediate.

Pressing Escape restores the composition.

### 5.4 Breakdown panels

Breakdown panels divide a surface into interactive chunks while keeping the parent card’s identity.

The home route uses three distinct modes:

- **Showcase strips:** Gallery, Projects, and Artworks appear as horizontal bands. Project imagery spreads like a hand of cards; artwork imagery falls and settles into place.
- **Skillset grid:** eight tool marks surround a central “Adept at” cell. The hovered row and column expand.
- **Connection grid:** eight social destinations surround a central caption. Hovered chunks contract, creating a deliberate inversion of the usual expansion behavior.

Chunks close their gaps and corners during route transitions so the divided surface can reunite into a single moving object.

---

## 6. Motion Language

### Principles

Motion communicates ownership and continuity. It should answer three questions:

1. What did the visitor select?
2. Where did that surface go?
3. How is the destination related to the previous composition?

### Route transitions

Standard navigation follows a contraction–travel–expansion sequence:

1. The selected panel is identified as the transition source.
2. Input locks to prevent competing navigation.
3. The source contracts into a traveling surface.
4. The surface moves into the destination’s geometry.
5. The next composition expands from it.

Returning reverses the conceptual relationship and targets the originating panel. Resizing during a transition settles the current state rather than leaving partially transformed geometry.

### Ambient and responsive movement

- The portrait responds subtly to pointer position with translation and perspective rotation.
- Gallery cards curve around the horizontal center using a Y-axis turn.
- Asset decks use cursor parallax after their entrance settles.
- Technical and 3D skill imagery shifts in layered depth.
- Surface overlays move only slightly, preserving the impression of material rather than a floating background.
- Gallery rails sleep when stationary, and hidden/offscreen previews pause.

### Full and Reduced modes

A bottom-right `Motion Full / Reduced` switch stores the visitor’s choice locally. Without a saved choice, the operating system preference supplies the default.

Reduced mode removes decorative and transitional movement while preserving essential behavior:

- Navigation remains immediate and understandable.
- Galleries remain operable.
- Image pan/zoom and video controls remain functional.
- Cursor-based reading remains available but follows input directly.
- Main video playback is not treated as decorative motion.

Changing the preference settles active transitions without remounting viewers or losing gallery position, image zoom, or video time.

---

## 7. Gallery and Media Experiences

### 7.1 Project gallery

The project gallery is a horizontal, infinitely repeating rail. Its interaction model includes:

- Cursor proximity to the left or right edge for directional acceleration.
- A central rest zone.
- Pointer/touch dragging.
- Mouse-wheel input.
- Left and right arrow keys.

Project groups crossfade between preview images. Video work uses a lightweight WebM preview. Hover or focus reveals the title, short introduction, year, and software marks over a dark lower gradient.

### 7.2 Artwork gallery

The artwork gallery uses the same edge-navigation model but arranges work in a three-row mosaic. The number of visible rows can be remembered in session storage. Repeated copies exist on both sides before entrance animation begins, preventing an empty edge during continuous motion.

### 7.3 Image viewer

Selecting an image opens a dedicated inspection panel with:

- Zoom.
- Reset.
- Bounded drag-to-pan.
- A numbered filmstrip for grouped projects.
- A vertical magnetic selector before entering inspect mode.
- A right-edge information panel.

Returning animates the image back toward its corresponding gallery card, maintaining spatial continuity.

### 7.4 Video viewer

Video projects open in a dark cinematic panel with a warm amber control language. The viewer supplies custom play/pause and seeking controls, elapsed and total time, a modular progress rail, and the same project-information panel used by images.

The progress display updates its own DOM state while visible so the entire viewer does not rerender every frame.

### 7.5 Project information panel

The information panel sits at the right edge and opens on hover, keyboard focus, or tap. It combines:

- Project index and year.
- Title and long description.
- Software/tool marks.
- A softly masked reading area.
- A gradient/Prototype surface that adds weight near the lower-right while leaving copy legible.

---

## 8. Reading and Content Layers

Panels may provide two independent text layers:

```js
content: [
  { tag: "unhovered", text: "A short introduction." },
  { tag: "hovered", text: "A longer narrative revealed on expansion." },
]
```

The resting layer supplies a concise invitation. The expanded layer provides the deeper narrative. Their crossfade allows dense content to live inside an expressive mosaic without turning every resting card into a text box.

Panels tagged `cursor-read` map pointer position to scroll progress:

- Tall or square panels read vertically.
- Panels wider than roughly 1.6× their height read through horizontal columns.
- The central portion of the panel maps to the full reading range, leaving soft approach zones at the edges.
- Edge masks communicate whether additional content exists in either direction.

Native touch scrolling and the Arrow, Page Up/Down, Home, and End keys remain available. Decorative and hidden reading layers are removed from the accessibility tree when the panel is too compact to present them meaningfully.

---

## 9. Responsive Behavior

### Large and desktop viewports

- The authored asymmetric home composition is fully visible.
- Hover can redistribute tracks and activate custom cursor behavior.
- Panel type scales with both viewport and container dimensions.
- At widths above 1700px, horizontal padding centers the composition and limits excessive spread.

### Tablet and compact desktop (`≤ 1050px`)

- Internal padding contracts.
- Secondary project-stamp copy is removed.
- Reading type increases selectively where narrow columns would otherwise feel too technical or small.

### Mobile (`≤ 760px`)

- The home board becomes a two-column, three-row composition.
- Identity still spans vertically; Connection spans the final row.
- Gaps and radii tighten.
- Art and type are repositioned rather than merely scaled down.
- The route locks overscroll and uses touch-oriented expansion behavior.

### Small mobile (`≤ 420px`)

- Outer and panel padding contract again.
- Display type is individually tuned for each home surface.
- Metadata sizes step down to protect artwork and primary labels.

### Very narrow screens (`≤ 360px`)

- The board becomes a single-column document.
- Panels receive explicit practical heights.
- Vertical scrolling replaces the fixed mosaic composition.
- The route keeps the same hierarchy and destinations rather than removing content.

Responsive work should preserve the **composition**, not just avoid overflow. Each breakpoint is an art-direction pass: type, imagery, negative space, and information density must be rebalanced together.

---

## 10. Interaction and Accessibility Contract

The UI should satisfy the following behaviors:

- Destination panels are semantic buttons; passive reading surfaces are articles.
- Every interactive panel has an accessible name independent of visual line breaks.
- Keyboard focus is clearly visible with a light outline and adequate offset.
- Breadcrumbs expose the current destination with `aria-current`.
- Gallery rails accept keyboard navigation.
- Escape closes or restores expanded compositions.
- Touch interaction does not depend on hover.
- Decorative SVGs and images use empty alternative text and are hidden from assistive technology.
- Content images retain useful project-derived labels in viewers.
- Compact or visually hidden content does not remain misleadingly focusable/readable.
- External social destinations open separately and retain stable pointer targets during animated chunk movement.
- The visitor’s reduced-motion preference is respected on first visit and can be explicitly overridden.

The custom cursor is scoped to `/takezo`, enabled only where an accurate fine pointer exists, and must never be the sole indication of focus or clickability.

---

## 11. Component Map

| File | Responsibility |
| --- | --- |
| `Takezo.jsx` | Route shell, navigation state, transition choreography, and view selection |
| `takezoData.js` | Navigation tree, copy, palette assignments, layouts, links, and panel configuration |
| `AdaptivePanel.jsx` | Responsive inner-panel rendering and expansion behavior |
| `PanelCopy.jsx` | Layered copy, overflow reading, and edge-state handling |
| `PanelSurface.jsx` | Gradient, texture, logo, and surface composition |
| `PanelAssets.jsx` | Spreading/falling image layers and cursor parallax |
| `BreakdownPanel.jsx` | Grid and strip sub-panels used by Showcase, Skillset, and Connection |
| `AdaptiveBreakdown.jsx` | Rich skillset breakdowns and discipline-specific media |
| `ShowcaseGallery.jsx` | Infinite project/artwork rails and gallery input |
| `ShowcaseDetail.jsx` | Image, group, video, and project-information viewers |
| `TakezoPortrait.jsx` | Portrait formation, fallback, and pointer response |
| `TakezoCursor.jsx` | Route-scoped custom cursor and chunk attraction |
| `useMotionPreference.js` | Saved Full/Reduced motion state and system preference |
| `mosaicLayout.js` | Six-by-six layout definitions, generation, and track calculations |
| `panelFeatures.js` | Feature inheritance, texture discovery, and derived surface values |
| `takezo.css` | Route frame, home composition, typography, core art, and responsive rules |
| `mosaic.css` | Adaptive layouts, rich discipline visuals, and reading modes |
| `showcase.css` | Gallery, image viewer, video viewer, and information panel |
| `breakdown.css` | Breakdown grids, strips, chunk states, and shine |
| `panelFeatures.css` | Texture, gradient, halftone, and logo presentation |
| `panelAssets.css` | Image entrance effects and parallax states |
| `motion.css` | Motion preference control |
| `takezoCursor.css` | Custom cursor appearance and pointer scoping |

All route styles are scoped beneath `.takezo` wherever practical so the portfolio can coexist with the rest of the application.

---

## 12. Authoring Panels

### Basic panel

```js
{
  id: "destination",              // null for a reading-only surface
  title: "PANEL\nTITLE",
  kicker: "01 / CATEGORY",
  color: "ochre",                 // red | ochre | sage | bone
  art: "orbital",                 // or null / a supported artwork kind
  description: "Short supporting copy.",
}
```

### Surface features

Features may be assigned to a card or inherited through `node.panelDefaults`:

```js
panelDefaults: {
  tags: ["logo", "expansion-max", "gradient", "Dirty"],
  logo: "/takezo/mark.svg",
  baseColor: "#B95745",
}
```

Rules:

- A card’s explicit `tags` replaces inherited tags.
- `tags: []` opts out completely.
- Feature names are case-sensitive.
- `baseColor` should be a six-digit hex color when used for derived gradients.
- Texture assets are selected once per mounted panel and remain stable during resizing.

### Assigned image motion

```js
{
  tags: ["spreading"],
  assetImages: ["/takezo/example.webp", "/takezo/mark.svg"],
  assetMotion: {
    x: 73,
    y: 55,
    width: 48,
    spread: 34,
    rotation: 22,
    startScale: 1.8,
    endScale: 1,
    duration: 0.76,
    stagger: 0.055,
    parallax: 14,
    opacity: 0.9,
  },
}
```

Use `falling` instead of `spreading` for an overhead, gravity-like arrival. An image may also be an object with `src`, `x`, `y`, `rotation`, and `scale` overrides.

### Layouts

Provide a `layout` array with one rectangle per card. If omitted, a complete layout is generated for collections from one through 36 cards. Authored layouts should:

- Cover the intended six-by-six field without overlap.
- Preserve useful space for the supplied content.
- Mix horizontal, vertical, and compact cells deliberately.
- Be checked in resting, hovered, focus, touch-expanded, and maximum-expansion states.

---

## 13. Managing Projects and Artworks

### Projects

Project source content lives in:

```text
public/takezo/showcase/projects/showcase info.md
```

Referenced originals live under `public/takezo/showcase/projects/images` and project video under `public/takezo/showcase/projects/videos`.

After editing source content or assets, run:

```bash
npm run takezo:showcase
```

The Python builder validates references, creates WebP thumbnails, and regenerates `src/features/takezo/showcaseManifest.js`. It requires Pillow in the authoring environment but adds no production browser dependency.

### Artworks

Place originals in:

```text
public/takezo/showcase/artworks/images
```

Place matching-stem previews in:

```text
public/takezo/showcase/artworks/thumbnails
```

Then run:

```bash
npm run takezo:artworks
```

The artwork builder regenerates `src/features/takezo/artworkManifest.js`. `npm run dev` and `npm run build` execute this step automatically. Titles derive from filenames, so filenames should be presentation-ready and stable.

### General media guidance

- Keep source images large enough for full-screen inspection.
- Use WebP thumbnails to limit gallery decode cost.
- Preserve the original aspect ratio unless the art direction explicitly calls for a crop.
- Provide lightweight WebM previews separately from full MP4 video.
- Keep tool and identity marks as SVG when possible.
- Avoid embedding text into thumbnails when the UI already presents the title and metadata.

---

## 14. Performance Expectations

The route is visually dense, but decorative complexity should not imply continuous work.

- `/takezo` is lazy-loaded from the application router.
- Gallery movement runs only while velocity is present.
- Hidden and offscreen previews pause.
- Adaptive title fitting batches geometry reads and font-size writes into one queued frame.
- Unchanged measurements are skipped.
- Icon-only tiles do not measure invisible typography.
- Layout/paint containment isolates adaptive panels.
- Idle asset layers do not keep animation loops alive.
- Video progress avoids React rerenders on every frame.
- Reduced mode removes unnecessary transitions and parallax work.

Any new visual effect should define when it starts, when it stops, and what happens offscreen.

---

## 15. Validation

Run the focused Takezo tests with:

```bash
node --test src/features/takezo/*.test.mjs
```

These tests cover mosaic invariants, feature tags, asset resolution, and the title-fitting scheduler’s batching, precision, idle behavior, and cleanup.

Before release, also run:

```bash
npm run lint
npm run assets:check
npm run build
```

### Visual QA checklist

- [ ] Home composition reads clearly at desktop, tablet, mobile, and ≤360px widths.
- [ ] Every panel has sufficient text contrast over its surface treatment.
- [ ] Long titles fit without clipping or unexplained abbreviation.
- [ ] Hovered mosaics preserve shared edges and never overlap.
- [ ] Touch expansion does not trigger accidental navigation.
- [ ] Keyboard users can reach, operate, and leave every interactive surface.
- [ ] Focus rings remain visible against every panel color.
- [ ] Full and Reduced modes both reach the same content.
- [ ] Gallery loops enter with no empty edges or visible seam.
- [ ] Image zoom and pan remain bounded.
- [ ] Video controls work without depending on decorative motion.
- [ ] Browser Back/Forward restores the expected fragment and view.
- [ ] Direct fragment URLs load the intended destination.
- [ ] Missing previews fail gracefully without breaking the composition.
- [ ] No animation continues indefinitely while hidden or stationary.

---

## 16. Content Voice

Takezo copy is concise, observant, and confident. It favors concrete action over promotional abstraction.

Good patterns:

- “Ideas made tangible.”
- “Form built in space.”
- “A toolkit in constant motion.”
- “Every good thing starts with a conversation.”

Avoid:

- Generic claims such as “world-class creative solutions.”
- Long headlines that cannot act as graphic forms.
- Technical detail in the resting layer that belongs in an expanded narrative.
- Over-explaining an artwork before the visitor has seen it.
- Inconsistent capitalization or punctuation in indexed labels.

A useful content hierarchy is:

1. **Kicker:** location in the system.
2. **Title:** memorable idea or project name.
3. **Resting description:** one clear invitation.
4. **Expanded copy:** context, process, decisions, and outcomes.
5. **Metadata:** year, medium, tools, and position in a set.

---

## 17. Design Guardrails

When extending `/takezo`, preserve these non-negotiable qualities:

1. **The panel is the primary unit.** New features should belong to a surface rather than float above the system without context.
2. **Transitions must preserve spatial meaning.** Do not introduce arbitrary page wipes or unrelated modal behavior.
3. **Texture must protect readability.** Surface detail belongs at the edges and in negative space.
4. **Motion must settle.** Every response should arrive at a stable, readable state.
5. **Compact states are designed states.** Do not simply hide overflow; decide what identity remains when space disappears.
6. **Mobile is recomposed, not miniaturized.** Rebalance the poster-like relationship between title, artwork, and copy.
7. **The gallery serves the work.** Effects may frame, sequence, or connect media, but should not compete with it.
8. **Reduced motion is complete.** It is an alternate choreography, not a lesser version of the site.
9. **Local assets define the world.** Fonts, marks, textures, and media should remain self-contained and dependable.
10. **Restraint creates impact.** Strong color blocks and decisive type do most of the work; use special effects selectively.

---

## 18. Source Locations

```text
src/features/takezo/                  React components, route data, and scoped styles
public/takezo/                        Takezo marks, portrait, skill, gallery, and media assets
public/images/grunge/                 Dirty and Prototype texture families
scripts/build-takezo-showcase.py      Project manifest and thumbnail builder
scripts/build-takezo-artworks.mjs     Artwork manifest builder
src/app/App.jsx                       `/takezo` route registration
```

This document describes the current `/takezo` system and should be updated whenever its visual grammar, interaction contract, authoring pipeline, or route structure changes.
