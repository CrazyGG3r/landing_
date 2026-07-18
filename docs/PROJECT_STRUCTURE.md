# Project structure

The source tree uses four shallow buckets:

```text
src/
  app/       Application bootstrap, routes, error pages, and global styles
  features/  Self-contained page and route features
  shared/    Code deliberately reused by more than one feature
  archive/   Inactive prototypes kept for reference and excluded from linting
```

Static files keep their stable public URLs under `public/`. The generated AMP
reader remains under `dist-runtime/`; treat it as a build artifact and do not
hand-edit or relocate it.

## Feature ownership

Each feature owns its local components, hooks, styles, and Three.js helpers.
Keep code inside its feature until a second feature genuinely needs it. Shared
code belongs in `src/shared`, grouped by purpose rather than by file type.

The route URLs have not changed. Their source locations are registered in
`src/app/App.jsx`, while portfolio and entry preloading is coordinated by
`src/shared/performance/routePreloader.js`.

## Safe change process

1. Add or change code within the owning feature.
2. If a feature moves, move the whole folder so its internal relative imports
   remain stable.
3. Update the route or shared import at the boundary; avoid reaching through
   one feature into another feature's internal component folders.
4. Run `npm run build` before delivery. Run `npm run lint` when cleaning or
   adding JavaScript.
5. Never commit `dist/`. Only regenerate `dist-runtime/` through its dedicated
   AMP reader build process.

## Naming

Use lowercase kebab-case for directories and descriptive component filenames.
Avoid spaces, numbered duplicates, and vague buckets such as `misc` or `utils`.
Keep the structure shallow unless a feature has enough files to justify one
more local grouping.
