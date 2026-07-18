# BoltForged landing experience

Vite and React power the landing page, portfolio, AMP reader screen, and the
project's supporting experiments.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## Source layout

- `src/app` — application entry point, routes, global styles, and fallback UI
- `src/features` — self-contained routed experiences
- `src/shared` — cross-feature components, hooks, and performance helpers
- `src/archive` — inactive prototypes retained for reference
- `public` — stable URL-addressed fonts, models, scenes, images, and documents
- `dist-runtime` — generated AMP reader runtime; do not hand-edit or relocate

See [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for the ownership
rules and safe change process.
