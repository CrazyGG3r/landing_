// ═══════════════════════════════════════════════════════════════════════════════
// VHS EFFECTS — modular data model
// ═══════════════════════════════════════════════════════════════════════════════
//
// This file is the single source of truth for the VHS filter's *interface*: the
// full ordered list of effects and the full parameter set every effect exposes.
// It is deliberately decoupled from the GLSL (vhsShader.js): the config here is
// complete and permanent, while the shader consumes the physically-meaningful
// parameters progressively. Nothing here references three.js or React, so it can
// be imported by tooling, tests, or a future control panel unchanged.
//
// Design rules honored (per the brief):
//   • No magic constants — every behavior is param-driven.
//   • Defaults are subtle/plausible, never exaggerated.
//   • Ordering matters: it defines the effect index used by the shader's uniform
//     arrays, so DO NOT reorder without updating the #define block in vhsShader.js.
// ═══════════════════════════════════════════════════════════════════════════════

// The 18 parameters every effect exposes. Order here defines nothing on the GPU
// side (each maps to its own named uniform array), but keep it stable for UIs.
export const PARAM_KEYS = [
  'enable',
  'strength',
  'blend',
  'opacity',
  'scale',
  'frequency',
  'speed',
  'phase',
  'threshold',
  'seed',
  'probability',
  'softness',
  'sharpness',
  'bias',
  'gain',
  'responseCurve',
  'temporalInfluence',
  'spatialInfluence',
]

// Neutral defaults for any parameter left unspecified by an effect. A neutral
// parameter is a no-op (multiplicative params = 1, additive = 0, curves = 1),
// so an effect only "does" what it explicitly opts into.
export const DEFAULT_PARAMS = {
  enable: false,
  strength: 0.5,
  blend: 1.0,
  opacity: 1.0,
  scale: 1.0,
  frequency: 1.0,
  speed: 1.0,
  phase: 0.0,
  threshold: 0.5,
  seed: 0.0,
  probability: 0.5,
  softness: 0.5,
  sharpness: 0.5,
  bias: 0.0,
  gain: 1.0,
  responseCurve: 1.0,
  temporalInfluence: 0.5,
  spatialInfluence: 0.5,
}

// Ordered effect keys. THIS ORDER IS THE GPU INDEX. Mirror it in vhsShader.js.
export const VHS_EFFECT_KEYS = [
  'timeBaseError',  // 0
  'tracking',       // 1
  'jitter',         // 2
  'tapeWarp',       // 3
  'headSwitching',  // 4
  'dropouts',       // 5
  'rfNoise',        // 6
  'static',         // 7
  'chromaBleed',    // 8
  'chromaDelay',    // 9
  'dotCrawl',       // 10
  'crossColor',     // 11
  'crossLuma',      // 12
  'ghosting',       // 13
  'smearing',       // 14
  'ringing',        // 15
  'bloomLeakage',   // 16
  'signalLoss',     // 17
  'frameRolling',   // 18
  'interlacing',    // 19
  'generationLoss', // 20
  'colorDrift',     // 21
  'tapeAging',      // 22
  'dirt',           // 23
]

// Human labels + one-line notes, for a future control panel. Purely metadata.
export const VHS_EFFECT_META = {
  timeBaseError:  { label: 'Time-base Error', group: 'geometry' },
  tracking:       { label: 'Tracking',        group: 'geometry' },
  jitter:         { label: 'Jitter',          group: 'geometry' },
  tapeWarp:       { label: 'Tape Warp',       group: 'geometry' },
  headSwitching:  { label: 'Head Switching',  group: 'geometry' },
  dropouts:       { label: 'Dropouts',        group: 'signal' },
  rfNoise:        { label: 'RF Noise',        group: 'signal' },
  static:         { label: 'Static',          group: 'signal' },
  chromaBleed:    { label: 'Chroma Bleed',    group: 'chroma' },
  chromaDelay:    { label: 'Chroma Delay',    group: 'chroma' },
  dotCrawl:       { label: 'Dot Crawl',       group: 'chroma' },
  crossColor:     { label: 'Cross-color',     group: 'chroma' },
  crossLuma:      { label: 'Cross-luma',      group: 'chroma' },
  ghosting:       { label: 'Ghosting',        group: 'luma' },
  smearing:       { label: 'Smearing',        group: 'luma' },
  ringing:        { label: 'Ringing',         group: 'luma' },
  bloomLeakage:   { label: 'Bloom Leakage',   group: 'luma' },
  signalLoss:     { label: 'Signal Loss',     group: 'signal' },
  frameRolling:   { label: 'Frame Rolling',   group: 'geometry' },
  interlacing:    { label: 'Interlacing',     group: 'temporal' },
  generationLoss: { label: 'Generation Loss', group: 'temporal' },
  colorDrift:     { label: 'Color Drift',     group: 'temporal' },
  tapeAging:      { label: 'Tape Aging',      group: 'temporal' },
  dirt:           { label: 'Dirt',            group: 'signal' },
}

// Build a full effect entry: every param present, neutral unless overridden.
function effect(overrides = {}) {
  return { ...DEFAULT_PARAMS, ...overrides }
}

// ─── DEFAULT LOOK ────────────────────────────────────────────────────────────
// A restrained, believable "decent VHS dub" — the signal-dependent chroma/luma
// impairments carry most of the character; the glitchy geometry effects are on
// but gentle so there's no "exaggerated glitch" or visible repetition. Every
// non-default number below is a deliberate, physically-plausible starting point,
// not a magic constant baked into the shader.
export function createDefaultVhsConfig() {
  return {
    timeBaseError:  effect({ enable: true,  strength: 0.35, frequency: 220.0, speed: 1.0,  spatialInfluence: 0.6,  seed: 11.0 }),
    tracking:       effect({ enable: true,  strength: 0.30, threshold: 0.92,  softness: 0.5, speed: 0.15, seed: 3.0 }),
    jitter:         effect({ enable: true,  strength: 0.22, frequency: 480.0, speed: 1.0,  seed: 27.0 }),
    tapeWarp:       effect({ enable: true,  strength: 0.28, frequency: 3.0,   speed: 0.35, scale: 1.0, seed: 5.0 }),
    headSwitching:  effect({ enable: true,  strength: 0.6,  threshold: 0.965, softness: 0.35, speed: 0.0, seed: 7.0 }),
    dropouts:       effect({ enable: true,  strength: 0.7,  probability: 0.006, frequency: 90.0, speed: 6.0, softness: 0.4, seed: 41.0 }),
    rfNoise:        effect({ enable: true,  strength: 0.10, scale: 2.4, speed: 18.0, gain: 1.0, seed: 13.0 }),
    static:         effect({ enable: true,  strength: 0.06, scale: 1.6, speed: 22.0, threshold: 0.5, seed: 19.0 }),
    chromaBleed:    effect({ enable: true,  strength: 0.55, spatialInfluence: 0.7, softness: 0.6, gain: 1.0, seed: 2.0 }),
    chromaDelay:    effect({ enable: true,  strength: 0.5,  spatialInfluence: 0.8, bias: 0.15, seed: 4.0 }),
    dotCrawl:       effect({ enable: true,  strength: 0.35, frequency: 0.5, speed: 2.0, sharpness: 0.6, seed: 8.0 }),
    crossColor:     effect({ enable: true,  strength: 0.28, frequency: 0.5, sharpness: 0.55, seed: 9.0 }),
    crossLuma:      effect({ enable: true,  strength: 0.18, sharpness: 0.5, seed: 10.0 }),
    ghosting:       effect({ enable: true,  strength: 0.4,  bias: 0.018, softness: 0.5, temporalInfluence: 0.0, seed: 6.0 }),
    smearing:       effect({ enable: true,  strength: 0.5,  spatialInfluence: 0.7, responseCurve: 1.3, seed: 12.0 }),
    ringing:        effect({ enable: true,  strength: 0.45, sharpness: 0.7, spatialInfluence: 0.5, seed: 14.0 }),
    bloomLeakage:   effect({ enable: true,  strength: 0.35, threshold: 0.72, softness: 0.5, gain: 1.2, seed: 15.0 }),
    signalLoss:     effect({ enable: false, strength: 0.5,  threshold: 0.5, probability: 0.02, speed: 0.5, seed: 16.0 }),
    frameRolling:   effect({ enable: false, strength: 0.4,  speed: 0.2, frequency: 1.0, seed: 17.0 }),
    interlacing:    effect({ enable: true,  strength: 0.35, temporalInfluence: 0.8, speed: 1.0, seed: 18.0 }),
    generationLoss: effect({ enable: true,  strength: 0.28, temporalInfluence: 0.55, softness: 0.5, gain: 1.0, seed: 20.0 }),
    colorDrift:     effect({ enable: true,  strength: 0.25, speed: 0.08, frequency: 0.6, phase: 0.0, seed: 21.0 }),
    tapeAging:      effect({ enable: true,  strength: 0.3,  scale: 3.0, softness: 0.5, gain: 1.0, seed: 22.0 }),
    dirt:           effect({ enable: true,  strength: 0.5,  probability: 0.0009, scale: 1.0, speed: 3.0, seed: 23.0 }),
  }
}

// Convenience frozen default so callers that don't tweak anything share one obj.
export const DEFAULT_VHS_CONFIG = createDefaultVhsConfig()

// param key → GPU uniform name (float[N] array uniforms).
export const PARAM_UNIFORM_NAME = {
  enable: 'uEnable',
  strength: 'uStrength',
  blend: 'uBlend',
  opacity: 'uOpacity',
  scale: 'uScale',
  frequency: 'uFrequency',
  speed: 'uSpeed',
  phase: 'uPhase',
  threshold: 'uThreshold',
  seed: 'uSeed',
  probability: 'uProbability',
  softness: 'uSoftness',
  sharpness: 'uSharpness',
  bias: 'uBias',
  gain: 'uGain',
  responseCurve: 'uResponseCurve',
  temporalInfluence: 'uTemporalInfluence',
  spatialInfluence: 'uSpatialInfluence',
}

// Build one Float32Array per parameter (length = effect count), indexed by the
// effect's position in VHS_EFFECT_KEYS. This is what the ShaderMaterial uploads.
export function buildVhsUniformArrays(config = DEFAULT_VHS_CONFIG) {
  const n = VHS_EFFECT_KEYS.length
  const arrays = {}
  PARAM_KEYS.forEach((pk) => {
    arrays[PARAM_UNIFORM_NAME[pk]] = new Float32Array(n)
  })

  VHS_EFFECT_KEYS.forEach((key, i) => {
    const eff = config[key] || {}
    PARAM_KEYS.forEach((pk) => {
      const uni = PARAM_UNIFORM_NAME[pk]
      if (pk === 'enable') {
        arrays[uni][i] = eff.enable ? 1.0 : 0.0
        return
      }
      const v = typeof eff[pk] === 'number' ? eff[pk] : DEFAULT_PARAMS[pk]
      arrays[uni][i] = v
    })
  })

  return arrays
}

export const VHS_EFFECT_COUNT = VHS_EFFECT_KEYS.length
