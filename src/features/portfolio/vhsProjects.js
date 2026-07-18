// ═══════════════════════════════════════════════════════════════════════════════
// VHS TAPE → AMP PROJECT MAPPING  (single source of truth)
// ═══════════════════════════════════════════════════════════════════════════════
//
// Each portfolio VHS tape maps to one AMP project whose document.json the Reader
// Engine loads onto the CRT screen. A tape is identified by its 0-based `vhsIndex`
// (the same value Portfolio.jsx carries into /entry via router state, and that the
// label texture uses as `${vhsIndex + 1}.png`).
//
// Default convention — tape N → "AMProj{N+1}":
//   vhsIndex 0 → AMProj1, vhsIndex 1 → AMProj2, … vhsIndex 10 → AMProj11
//
// Each project lives in two places (matching the repo's existing AMProj1 layout):
//   • src/AMP/projects/<id>/      — authoring source (document + assets + author meta)
//   • public/projects/<id>/       — served copy the reader actually fetches
//
// To point a tape at a differently-named folder, add an entry to OVERRIDES.
// ═══════════════════════════════════════════════════════════════════════════════

// vhsIndex → projectId. Anything not listed uses the `AMProj{index+1}` default.
const OVERRIDES = {
  // 0: 'MyProject',
}

// Resolve the AMP project id for a given 0-based tape index.
export function resolveVhsProjectId(vhsIndex) {
  const i = Number.isInteger(vhsIndex) && vhsIndex >= 0 ? vhsIndex : 0
  return OVERRIDES[i] ?? `AMProj${i + 1}`
}

// Absolute URL of a project's served document.json (under public/projects).
export function projectDocumentUrl(projectId) {
  return `/projects/${projectId}/document.json`
}
