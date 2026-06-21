import { useRef, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════════════════════
// METABALL CURSOR
// ═══════════════════════════════════════════════════════════════════════════════
//
// NAMING CONVENTION FOR BLENDER OBJECTS
// ──────────────────────────────────────
// Blender sanitizes mesh names on GLB export, converting spaces → underscores.
// To keep the title/desc delimiter unambiguous, use DOUBLE underscore (__).
// Single underscore (_) within a segment becomes a space.
//
//   Blender name  →  I_MyVHSTitle_001__MyVHSDesc_001
//   Parsed title  →  "MyVHSTitle 001"
//   Parsed desc   →  "MyVHSDesc 001"
//
// Objects must carry the "I_" prefix to be registered as interactive.
// ═══════════════════════════════════════════════════════════════════════════════

// ─── CENTRAL CONFIGURATION ───────────────────────────────────────────────────

// Behavior & animation
const CFG_TRAIL_COUNT         = 3
const CFG_TRAIL_SIZES         = [18, 38, 22]
const CFG_FAST_DURATION_MS    = 110
const CFG_SLOW_DURATION_MS    = 750
const CFG_DWELL_MS            = 900
const CFG_FADE_IN_MS          = 500
const CFG_FADE_OUT_MS         = 140
const CFG_REANCHOR_MS         = 110
const CFG_PRE_WRAP_MS         = 260
const CFG_PRE_WRAP_SCALE      = 1.58
const CFG_PRE_WRAP_EASE_POWER = 3

// Visual style
const CFG_SMIN_K                 = 0.22
const CFG_EDGE_SOFTNESS          = 0.0006
const CFG_PULSE_SCALE            = 1.28
const CFG_PULSE_DURATION_MS      = 380
const CFG_BASE_ALPHA             = 0.28
const CFG_LIGHTNESS              = 0.65
const CFG_UNTRIGGERED_SIZE_SCALE = 0.72
const CFG_BREATHE_AMP            = 0.06
const CFG_BREATHE_FREQ           = 0.9

// Noise & distortion
const CFG_TRIGGERED_NOISE_STR = 300
const CFG_BLOB_NOISE_SCALE    = 0.008
const CFG_CHROMATIC_STRENGTH  = 3.2
const CFG_CURL_STRENGTH       = 18
const CFG_PRISM_STRENGTH      = 0.7

// Ghost blobs
const CFG_GHOST_COUNT        = 4
const CFG_GHOST_RADIUS       = 14
const CFG_GHOST_ALPHA_FACTOR = 0.55
const CFG_GHOST_SIZE_SCALE   = [0.7, 0.8, 0.9, 1.0]
const CFG_GHOST_SEEDS        = [0.0, 1.5, 3.0, 4.5]

// Hovered-state randomness
const CFG_HOVERED_ANGLE_VARIATION    = Math.PI * 2
const CFG_HOVERED_NOISE_OFFSET_RANGE = 50.0
const CFG_HOVERED_ORBIT_SPEED_MIN    = 0.7
const CFG_HOVERED_ORBIT_SPEED_MAX    = 1.5
const CFG_HOVERED_GHOST_JITTER       = 0.25

// Colors
const CFG_HOVER_TINT_COLOR = 0x9fe8ff
const CFG_HOVER_TINT_MIX   = 0.78
const CFG_TRAIL_COLOR      = '#ffffff'
const CFG_CURSOR_COLOR     = 0xffffff

// Masking & ID resolution
const CFG_ID_RESOLUTION     = 1024
const CFG_PROJECTION_MARGIN = 1.1

// Ripples
const CFG_RIPPLE_COUNT = 3

// Feature flags
const CFG_ENABLE_MATERIAL_HIGHLIGHT = false

// ─── PUBLIC DEFAULT CONFIG EXPORT ────────────────────────────────────────────

export const DEFAULT_CFG = {
  trailCount:              CFG_TRAIL_COUNT,
  sizes:                   CFG_TRAIL_SIZES,
  fastDur:                 CFG_FAST_DURATION_MS,
  slowDur:                 CFG_SLOW_DURATION_MS,
  smin_k:                  CFG_SMIN_K,
  edgeSoftness:            CFG_EDGE_SOFTNESS,
  dwellMs:                 CFG_DWELL_MS,
  fadeInMs:                CFG_FADE_IN_MS,
  fadeOutMs:               CFG_FADE_OUT_MS,
  reanchorMs:              CFG_REANCHOR_MS,
  idRes:                   CFG_ID_RESOLUTION,
  margin:                  CFG_PROJECTION_MARGIN,
  pulseScale:              CFG_PULSE_SCALE,
  pulseDuration:           CFG_PULSE_DURATION_MS,
  baseAlpha:               CFG_BASE_ALPHA,
  triggeredNoiseStrength:  CFG_TRIGGERED_NOISE_STR,
  lightness:               CFG_LIGHTNESS,
  untriggeredSizeScale:    CFG_UNTRIGGERED_SIZE_SCALE,
  blobNoiseScale:          CFG_BLOB_NOISE_SCALE,
  chromaticStrength:       CFG_CHROMATIC_STRENGTH,
  ghostCount:              CFG_GHOST_COUNT,
  ghostRadius:             CFG_GHOST_RADIUS,
  ghostAlphaFactor:        CFG_GHOST_ALPHA_FACTOR,
  rippleCount:             CFG_RIPPLE_COUNT,
  breatheAmp:              CFG_BREATHE_AMP,
  breatheFreq:             CFG_BREATHE_FREQ,
  curlStrength:            CFG_CURL_STRENGTH,
  prismStrength:           CFG_PRISM_STRENGTH,
  hoverTintColor:          CFG_HOVER_TINT_COLOR,
  hoverTintMix:            CFG_HOVER_TINT_MIX,
  preWrapMs:               CFG_PRE_WRAP_MS,
  preWrapScale:            CFG_PRE_WRAP_SCALE,
  preWrapEasePower:        CFG_PRE_WRAP_EASE_POWER,
  trailColor:              CFG_TRAIL_COLOR,
  ghostSizeScale:          CFG_GHOST_SIZE_SCALE,
  ghostSeeds:              CFG_GHOST_SEEDS,
  enableMaterialHighlight: CFG_ENABLE_MATERIAL_HIGHLIGHT,
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAME PARSING
// ═══════════════════════════════════════════════════════════════════════════════
//
// Blender converts spaces to underscores on GLB export, making a single
// underscore useless as a title/desc delimiter. Use __ (double underscore)
// as the delimiter; single underscores within each segment become spaces.
//
//   Raw GLB name                    →  title              desc
//   ─────────────────────────────────────────────────────────────────
//   I_MyVHSTitle_001__MyVHSDesc_001  →  "MyVHSTitle 001"  "MyVHSDesc 001"
//   I_ProjectName__A_cool_project    →  "ProjectName"      "A cool project"
//   I_TitleOnly                      →  "TitleOnly"        null
//   I_Title_With_Spaces              →  "Title With Spaces" null  (no __ present)

function parseMeshName(rawName) {
  if (!rawName.startsWith('I_')) {
    return { label: rawName, title: rawName, desc: null }
  }

  const payload  = rawName.slice(2)         // drop "I_"
  const delimIdx = payload.indexOf('__')    // first double-underscore = delimiter

  if (delimIdx === -1) {
    // No description segment
    const title = payload.replaceAll('_', ' ').trim()
    return { label: title || rawName, title: title || rawName, desc: null }
  }

  const title = payload.slice(0, delimIdx).replaceAll('_', ' ').trim()
  const desc  = payload.slice(delimIdx + 2).replaceAll('_', ' ').trim() || null

  return { label: title || rawName, title: title || rawName, desc }
}

// ═══════════════════════════════════════════════════════════════════════════════
// SEEDED PRNG & HOVERED SEEDS
// ═══════════════════════════════════════════════════════════════════════════════

function seededRng(seed) {
  let s = (seed * 2654435769) | 0
  return () => {
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b) | 0
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b) | 0
    return (s >>> 0) / 0xffffffff
  }
}

function generateObjectHoveredSeeds(objectIndex, label = '') {
  let seedVal = objectIndex * 73856093
  for (let i = 0; i < label.length; i++) {
    seedVal ^= label.charCodeAt(i) * (i + 1) * 1234567
  }
  const rng = seededRng(seedVal)

  return {
    angleSeed:       rng() * CFG_HOVERED_ANGLE_VARIATION,
    noiseOffsetX:    (rng() - 0.5) * 2 * CFG_HOVERED_NOISE_OFFSET_RANGE,
    noiseOffsetY:    (rng() - 0.5) * 2 * CFG_HOVERED_NOISE_OFFSET_RANGE,
    orbitSpeed:      CFG_HOVERED_ORBIT_SPEED_MIN + rng() * (CFG_HOVERED_ORBIT_SPEED_MAX - CFG_HOVERED_ORBIT_SPEED_MIN),
    ghostSizeJitter: [
      1 + (rng() - 0.5) * 2 * CFG_HOVERED_GHOST_JITTER,
      1 + (rng() - 0.5) * 2 * CFG_HOVERED_GHOST_JITTER,
      1 + (rng() - 0.5) * 2 * CFG_HOVERED_GHOST_JITTER,
      1 + (rng() - 0.5) * 2 * CFG_HOVERED_GHOST_JITTER,
    ],
    ghostPhaseOffset: [
      rng() * Math.PI * 2,
      rng() * Math.PI * 2,
      rng() * Math.PI * 2,
      rng() * Math.PI * 2,
    ],
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// COLOR PALETTE
// ═══════════════════════════════════════════════════════════════════════════════

export const METABALL_PALETTE = [
  { blob: new THREE.Color(0.25, 0.50, 0.95), a: new THREE.Color(0.35, 0.60, 1.00), b: new THREE.Color(0.60, 0.85, 1.00) },
  { blob: new THREE.Color(0.75, 0.20, 0.85), a: new THREE.Color(0.85, 0.35, 0.90), b: new THREE.Color(1.00, 0.60, 1.00) },
  { blob: new THREE.Color(0.15, 0.75, 0.50), a: new THREE.Color(0.30, 0.88, 0.60), b: new THREE.Color(0.55, 1.00, 0.80) },
  { blob: new THREE.Color(0.90, 0.50, 0.10), a: new THREE.Color(1.00, 0.65, 0.25), b: new THREE.Color(1.00, 0.85, 0.50) },
  { blob: new THREE.Color(0.85, 0.15, 0.30), a: new THREE.Color(0.95, 0.30, 0.40), b: new THREE.Color(1.00, 0.55, 0.60) },
  { blob: new THREE.Color(0.80, 0.65, 0.05), a: new THREE.Color(0.90, 0.80, 0.20), b: new THREE.Color(1.00, 0.95, 0.55) },
  { blob: new THREE.Color(0.10, 0.70, 0.90), a: new THREE.Color(0.20, 0.80, 1.00), b: new THREE.Color(0.50, 0.95, 1.00) },
  { blob: new THREE.Color(0.90, 0.30, 0.60), a: new THREE.Color(1.00, 0.45, 0.75), b: new THREE.Color(1.00, 0.70, 0.90) },
]

// ═══════════════════════════════════════════════════════════════════════════════
// buildMetaballObjects
// ═══════════════════════════════════════════════════════════════════════════════

export function buildMetaballObjects(meshes) {
  return meshes.map((mesh, i) => {
    const pal      = METABALL_PALETTE[i % METABALL_PALETTE.length]
    const matColor = mesh.material?.color
    const colorA   = matColor ? matColor.clone() : pal.a.clone()
    const colorB   = pal.b.clone()
    const blobColor = pal.blob.clone()

    const vertCount = mesh.geometry.attributes.position.count
    const stride    = Math.max(1, Math.floor(vertCount / 600))

    const { label, title, desc } = parseMeshName(mesh.name ?? `Object ${i + 1}`)

    return {
      mesh,
      geometry:     mesh.geometry,
      blobColor,
      colorA,
      colorB,
      material:     mesh.material ?? null,
      wireframe:    null,
      stride,
      label,
      title,
      desc,
      hoveredSeeds: generateObjectHoveredSeeds(i, label),
    }
  })
}

// ═══════════════════════════════════════════════════════════════════════════════
// GLSL SHADERS  —  verbatim originals, no structural changes
// ═══════════════════════════════════════════════════════════════════════════════

const _idVert = `
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  attribute vec3 position;
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const _idFrag = `
  precision mediump float;
  uniform float u_id;
  void main() {
    gl_FragColor = vec4(u_id, 0.0, 0.0, 1.0);
  }
`

const _blobVert = `void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }`

const _blobFrag = `
precision highp float;

uniform vec2  u_res;
uniform vec3  u_blobs[8];
uniform int   u_count;
uniform float u_k;
uniform float u_edge;
uniform float u_alpha;
uniform float u_time;
uniform float u_pulseScale;
uniform vec3  u_blobColors[8];
uniform vec3  u_cursorColor;
uniform vec3  u_hoverColor;
uniform float u_hoverMix;
uniform int   u_activeIdx;
uniform sampler2D tScene;
uniform sampler2D tID;
uniform float u_trigNoise;
uniform float u_noiseScale;
uniform float u_chromStr;
uniform int   u_ghostCount;
uniform float u_ghostRadius;
uniform float u_ghostAlpha;
uniform float u_lightness;
uniform float u_breathe;
uniform float u_curl;
uniform float u_prism;
uniform vec3  u_ripples[6];
uniform vec3  u_trailColor;
uniform float u_ghostSizeScale[4];
uniform float u_ghostSeed[4];
uniform float u_hovAngleSeed[8];
uniform vec2  u_hovNoiseOffset[8];
uniform float u_hovOrbitSpeed[8];
uniform float u_hovGhostSizeJitter[32];
uniform float u_hovGhostPhaseOff[32];

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i),             f),               dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
    mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),   dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x),
    u.y);
}
float fbm(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { s += noise(p) * a; p *= 2.1; a *= 0.5; }
  return s;
}
vec2 curl(vec2 p) {
  float e = 0.01;
  return vec2(
     (fbm(p + vec2(e, 0.0)) - fbm(p - vec2(e, 0.0))) / (2.0 * e),
    -(fbm(p + vec2(0.0, e)) - fbm(p - vec2(0.0, e))) / (2.0 * e)
  );
}
float sdf(vec2 uv, float na) {
  float f = 1e9;
  for (int i = 0; i < 8; i++) {
    if (i >= u_count) break;
    float d = length(uv - u_blobs[i].xy) - u_blobs[i].z * u_breathe;
    f = smin(f, d, u_k * u_blobs[0].z);
  }
  return f + na;
}

void main() {
  vec2 uv    = gl_FragCoord.xy;
  vec3 scene = texture2D(tScene, uv / u_res).rgb;

  float mask = 1.0;
  if (u_activeIdx >= 0) {
    vec2 idUV = uv / u_res;
    float idVal = texture2D(tID, idUV).r * 255.0;
    float activeIdFloat = float(u_activeIdx + 1);
    float isActive = step(abs(idVal - activeIdFloat), 0.5);
    float isBackground = step(idVal, 0.5);
    mask = max(isActive, isBackground);
  }

  float baseF   = sdf(uv, 0.0);
  float baseIns = 1.0 - smoothstep(-u_edge * u_res.y, u_edge * u_res.y, baseF);

  vec2 activeNoiseOff = vec2(0.0);
  float activeOrbitSpeed = 1.0;
  float activeAngleSeed  = 0.0;
  if (u_activeIdx >= 0) {
    activeNoiseOff   = u_hovNoiseOffset[u_activeIdx];
    activeOrbitSpeed = u_hovOrbitSpeed[u_activeIdx];
    activeAngleSeed  = u_hovAngleSeed[u_activeIdx];
  }

  vec2 noiseUV  = (uv + activeNoiseOff) * u_noiseScale;
  vec2  co      = curl(noiseUV * 0.5 + u_time * 0.1) * u_curl * u_alpha;
  float nAmt    = fbm(noiseUV + co * u_noiseScale + u_time * 0.2) * u_trigNoise * u_alpha;
  float trigIns = 1.0 - smoothstep(-u_edge * u_res.y, u_edge * u_res.y, sdf(uv + co, nAmt));

  float ghostIns = 0.0;
  if (u_alpha > 0.0) {
    for (int g = 0; g < 4; g++) {
      if (g >= u_ghostCount) break;
      float baseAng = float(g) * 6.28318 / float(u_ghostCount);
      float phaseOff = 0.0;
      float sizeJitter = 1.0;
      float noiseSeed = u_ghostSeed[g];
      if (u_activeIdx >= 0) {
        phaseOff    = u_hovGhostPhaseOff[u_activeIdx  * 4 + g];
        sizeJitter  = u_hovGhostSizeJitter[u_activeIdx * 4 + g];
        noiseSeed   = u_hovAngleSeed[u_activeIdx] + float(g) * 1.7;
      }
      float orbSpeed = u_activeIdx >= 0 ? activeOrbitSpeed : 1.0;
      float ang = baseAng + activeAngleSeed + phaseOff + u_time * 1.8 * orbSpeed;
      float baseGhostSize = u_ghostSizeScale[g] * sizeJitter;
      float gr  = u_ghostRadius * baseGhostSize * (0.6 + 0.4 * sin(float(g) * 1.7 + u_time * 2.5));
      vec2  off = vec2(cos(ang), sin(ang)) * gr;
      vec2 noiseCoord = (uv - off) + noiseSeed + activeNoiseOff;
      float gf = sdf(uv - off, fbm(noiseCoord * u_noiseScale + u_time * 0.2) * u_trigNoise * u_alpha);
      ghostIns = min(1.0, ghostIns + (1.0 - smoothstep(-u_edge * u_res.y, u_edge * u_res.y, gf)) * u_ghostAlpha * u_alpha);
    }
  }

  float mainIns = min(1.0, baseIns + (trigIns - baseIns) * u_alpha);
  float totalIns = min(1.0, mainIns + ghostIns);

  float ripGlow = 0.0;
  for (int r = 0; r < 6; r++) {
    if (u_ripples[r].x < 0.0) continue;
    ripGlow += smoothstep(3.0, 0.0, abs(baseF - u_ripples[r].x)) * u_ripples[r].y;
  }

  mainIns  *= mask;
  ghostIns *= mask;
  totalIns *= mask;
  ripGlow  *= mask;

  vec3 trailBase = mix(mix(u_trailColor, vec3(1.0), u_lightness), u_trailColor, u_alpha) * u_pulseScale;
  vec3 tgt = u_activeIdx >= 0 ? u_blobColors[u_activeIdx] : u_cursorColor;
  tgt = mix(tgt, u_hoverColor, clamp(u_hoverMix, 0.0, 1.0));
  vec3 ghostCol = mix(mix(tgt, vec3(1.0), u_lightness), tgt, u_alpha) * u_pulseScale;

  float et   = smoothstep(0.0, 0.3, totalIns) * (1.0 - smoothstep(0.7, 1.0, totalIns));
  vec3  prism = (vec3(0.9, 0.2, 0.1) + vec3(0.1, 0.9, 0.2) * 0.8 + vec3(0.1, 0.2, 0.9) * 0.6)
                * et * u_prism * u_alpha * mask;

  vec3 fs = scene;
  if (u_alpha > 0.0 && u_chromStr > 0.0) {
    vec2 rd  = length(uv - u_blobs[0].xy) > 0.001 ? normalize(uv - u_blobs[0].xy) : vec2(1.0, 0.0);
    float cs = u_chromStr * totalIns * u_alpha;
    fs = vec3(
      texture2D(tScene, (uv + rd * cs)        / u_res).r,
      scene.g,
      texture2D(tScene, (uv - rd * cs * 0.7)  / u_res).b
    );
  }

  vec3 res = mix(fs, mix(fs, trailBase, mainIns), 1.0 - u_alpha);
  res = mix(res, ghostCol, ghostIns * (1.0 - u_alpha));
  res = mix(res, 1.0 - fs, totalIns * u_alpha);
  res += prism * (1.0 - res);
  res = mix(res, vec3(0.95, 0.85, 1.0), ripGlow * 0.4 * u_alpha);

  gl_FragColor = vec4(res, 1.0);
}
`

const _maskFrag = `
precision highp float;

uniform vec2  u_res;
uniform vec3  u_blobs[8];
uniform int   u_count;
uniform float u_k;
uniform float u_edge;
uniform float u_alpha;
uniform float u_time;
uniform float u_pulseScale;
uniform vec3  u_blobColors[8];
uniform vec3  u_cursorColor;
uniform vec3  u_hoverColor;
uniform float u_hoverMix;
uniform int   u_activeIdx;
uniform sampler2D tScene;
uniform sampler2D tID;
uniform float u_trigNoise;
uniform float u_noiseScale;
uniform float u_chromStr;
uniform int   u_ghostCount;
uniform float u_ghostRadius;
uniform float u_ghostAlpha;
uniform float u_lightness;
uniform float u_breathe;
uniform float u_curl;
uniform float u_prism;
uniform vec3  u_ripples[6];
uniform vec3  u_trailColor;
uniform float u_ghostSizeScale[4];
uniform float u_ghostSeed[4];
uniform float u_hovAngleSeed[8];
uniform vec2  u_hovNoiseOffset[8];
uniform float u_hovOrbitSpeed[8];
uniform float u_hovGhostSizeJitter[32];
uniform float u_hovGhostPhaseOff[32];

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i),             f),               dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
    mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),   dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x),
    u.y);
}
float fbm(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { s += noise(p) * a; p *= 2.1; a *= 0.5; }
  return s;
}
vec2 curl(vec2 p) {
  float e = 0.01;
  return vec2(
     (fbm(p + vec2(e, 0.0)) - fbm(p - vec2(e, 0.0))) / (2.0 * e),
    -(fbm(p + vec2(0.0, e)) - fbm(p - vec2(0.0, e))) / (2.0 * e)
  );
}
float sdf(vec2 uv, float na) {
  float f = 1e9;
  for (int i = 0; i < 8; i++) {
    if (i >= u_count) break;
    float d = length(uv - u_blobs[i].xy) - u_blobs[i].z * u_breathe;
    f = smin(f, d, u_k * u_blobs[0].z);
  }
  return f + na;
}

void main() {
  vec2 uv = gl_FragCoord.xy;

  float mask = 1.0;
  if (u_activeIdx >= 0) {
    vec2 idUV = uv / u_res;
    float idVal = texture2D(tID, idUV).r * 255.0;
    float activeIdFloat = float(u_activeIdx + 1);
    float isActive = step(abs(idVal - activeIdFloat), 0.5);
    float isBackground = step(idVal, 0.5);
    mask = max(isActive, isBackground);
  }

  float baseF   = sdf(uv, 0.0);
  float baseIns = 1.0 - smoothstep(-u_edge * u_res.y, u_edge * u_res.y, baseF);

  vec2 activeNoiseOff = vec2(0.0);
  float activeOrbitSpeed = 1.0;
  float activeAngleSeed  = 0.0;
  if (u_activeIdx >= 0) {
    activeNoiseOff   = u_hovNoiseOffset[u_activeIdx];
    activeOrbitSpeed = u_hovOrbitSpeed[u_activeIdx];
    activeAngleSeed  = u_hovAngleSeed[u_activeIdx];
  }

  vec2 noiseUV  = (uv + activeNoiseOff) * u_noiseScale;
  vec2  co      = curl(noiseUV * 0.5 + u_time * 0.1) * u_curl * u_alpha;
  float nAmt    = fbm(noiseUV + co * u_noiseScale + u_time * 0.2) * u_trigNoise * u_alpha;
  float trigIns = 1.0 - smoothstep(-u_edge * u_res.y, u_edge * u_res.y, sdf(uv + co, nAmt));

  float ghostIns = 0.0;
  if (u_alpha > 0.0) {
    for (int g = 0; g < 4; g++) {
      if (g >= u_ghostCount) break;
      float baseAng = float(g) * 6.28318 / float(u_ghostCount);
      float phaseOff = 0.0;
      float sizeJitter = 1.0;
      float noiseSeed = u_ghostSeed[g];
      if (u_activeIdx >= 0) {
        phaseOff    = u_hovGhostPhaseOff[u_activeIdx * 4 + g];
        sizeJitter  = u_hovGhostSizeJitter[u_activeIdx * 4 + g];
        noiseSeed   = u_hovAngleSeed[u_activeIdx] + float(g) * 1.7;
      }
      float orbSpeed = u_activeIdx >= 0 ? activeOrbitSpeed : 1.0;
      float ang = baseAng + activeAngleSeed + phaseOff + u_time * 1.8 * orbSpeed;
      float baseGhostSize = u_ghostSizeScale[g] * sizeJitter;
      float gr  = u_ghostRadius * baseGhostSize * (0.6 + 0.4 * sin(float(g) * 1.7 + u_time * 2.5));
      vec2  off = vec2(cos(ang), sin(ang)) * gr;
      vec2 noiseCoord = (uv - off) + noiseSeed + activeNoiseOff;
      float gf = sdf(uv - off, fbm(noiseCoord * u_noiseScale + u_time * 0.2) * u_trigNoise * u_alpha);
      ghostIns = min(1.0, ghostIns + (1.0 - smoothstep(-u_edge * u_res.y, u_edge * u_res.y, gf)) * u_ghostAlpha * u_alpha);
    }
  }

  float mainIns  = min(1.0, baseIns + (trigIns - baseIns) * u_alpha);
  float totalIns = min(1.0, mainIns + ghostIns);
  totalIns *= mask;

  gl_FragColor = vec4(totalIns, 0.0, 0.0, 1.0);
}
`

// ═══════════════════════════════════════════════════════════════════════════════
// CURSOR STATE
// ═══════════════════════════════════════════════════════════════════════════════

function createCursorState(cfg) {
  const {
    trailCount, fastDur, slowDur,
    fadeInMs, fadeOutMs, reanchorMs, dwellMs, baseAlpha,
  } = cfg

  const trail   = Array.from({ length: trailCount }, () => ({ x: -999, y: -999 }))
  const goal    = { x: -999, y: -999 }
  const ripples = Array.from({ length: cfg.rippleCount * 2 }, () => ({ r: -1, str: 0 }))

  let alpha = baseAlpha, anchor = 0, progress = 0
  let fadeTgt = baseAlpha, anchorTgt = 0
  let activeId = 0, pulseScale = 1
  let preWrap = 0, preWrapFrom = 0, preWrapTo = 0, preWrapProg = 0
  let lerpRaf = null, fadeRaf = null, preWrapRaf = null
  let dwellTimer = null, pulseTimer = null
  let lerpLast = null, fadeLast = null, preWrapLast = null

  const easeBack = (t) => {
    const c2 = 1.70158 * 2.525
    return t < 0.5
      ? Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (2 * t - 2) + c2) + 2) / 2
  }

  const easeOut = (t, p = 3) =>
    1 - Math.pow(1 - Math.min(1, Math.max(0, t)), p)

  function lerpTick(now) {
    const dt = Math.min(lerpLast ? now - lerpLast : 16, 64)
    lerpLast = now
    let moving = false
    for (let i = 0; i < trailCount; i++) {
      const g = i === trailCount - 1 ? goal : trail[i + 1]
      const a = 1 - Math.exp(-dt / ((i === trailCount - 1 ? fastDur : slowDur) * 0.25))
      trail[i].x += (g.x - trail[i].x) * a
      trail[i].y += (g.y - trail[i].y) * a
      if (Math.abs(g.x - trail[i].x) > 0.05 || Math.abs(g.y - trail[i].y) > 0.05) moving = true
    }
    lerpRaf = moving ? requestAnimationFrame(lerpTick) : (lerpLast = null)
  }

  function fadeTick(now) {
    const dt       = Math.min(fadeLast ? now - fadeLast : 16, 64)
    fadeLast       = now
    const entering = fadeTgt > 0.5
    const dir      = entering ? 1 : -1
    progress = Math.min(1, Math.max(0, progress + dir * dt / (entering ? fadeInMs : fadeOutMs)))
    alpha    = entering
      ? Math.max(baseAlpha, easeBack(progress))
      : Math.min(1, baseAlpha + progress * (1 - baseAlpha))
    anchor   = Math.min(1, Math.max(0,
      anchor + Math.sign(anchorTgt - anchor) * dt / (entering ? fadeInMs : reanchorMs)
    ))
    if (progress > 0 && progress < 1) {
      fadeRaf = requestAnimationFrame(fadeTick)
    } else {
      alpha = fadeTgt; anchor = anchorTgt
      fadeRaf = null; fadeLast = null
    }
  }

  function preWrapTick(now) {
    const dt    = Math.min(preWrapLast ? now - preWrapLast : 16, 64)
    preWrapLast = now
    preWrapProg = Math.min(1, preWrapProg + dt / cfg.preWrapMs)
    preWrap     = preWrapFrom + (preWrapTo - preWrapFrom) * easeOut(preWrapProg, cfg.preWrapEasePower)
    if (preWrapProg < 1) {
      preWrapRaf = requestAnimationFrame(preWrapTick)
    } else {
      preWrap = preWrapTo; preWrapRaf = null; preWrapLast = null
    }
  }

  const startFade = (a, anc = a) => {
    fadeTgt = a; anchorTgt = anc
    if (!fadeRaf) fadeRaf = requestAnimationFrame(fadeTick)
  }

  const startPreWrap = (t) => {
    if (Math.abs(preWrap - t) < 0.001 && !preWrapRaf) return
    if (preWrapRaf) cancelAnimationFrame(preWrapRaf)
    preWrapFrom = preWrap; preWrapTo = t; preWrapProg = 0; preWrapLast = null
    preWrapRaf  = requestAnimationFrame(preWrapTick)
  }

  function spawnRipples() {
    for (let i = 0; i < cfg.rippleCount; i++) {
      ripples[i % ripples.length] = { r: 0, str: 1, speed: 120 + i * 60, t0: performance.now() }
    }
  }

  function spawnCommitRipples() {
    const now = performance.now()
    for (let i = 0; i < ripples.length; i++) {
      ripples[i] = {
        r:     i * 9,
        str:   1,
        speed: 220 + i * 34,
        t0:    now,
      }
    }
  }

  function triggerPulse() {
    if (pulseTimer) cancelAnimationFrame(pulseTimer)
    const t0   = performance.now()
    const tick = (now) => {
      const t    = Math.min(1, (now - t0) / cfg.pulseDuration)
      pulseScale = 1 + (cfg.pulseScale - 1) * (1 - t)
      if (t < 1) {
        pulseTimer = requestAnimationFrame(tick)
      } else {
        pulseScale = 1; pulseTimer = null
      }
    }
    pulseTimer = requestAnimationFrame(tick)
    spawnRipples()
  }

  return {
    get trail()      { return trail },
    get alpha()      { return alpha },
    get anchor()     { return anchor },
    get activeId()   { return activeId },
    get preWrap()    { return preWrap },
    get pulseScale() { return pulseScale },
    get ripples()    { return ripples },

    moveTo(x, y) {
      goal.x = x; goal.y = y
      if (!lerpRaf) lerpRaf = requestAnimationFrame(lerpTick)
    },

    setHoveredId(id) {
      if (id === activeId) return
      if (dwellTimer) clearTimeout(dwellTimer)
      activeId = id
      if (!id) {
        startPreWrap(0)
        startFade(baseAlpha, 0)
        return
      }
      startPreWrap(1)
      startFade(baseAlpha, 0)
      dwellTimer = setTimeout(() => {
        startFade(1, 1)
        triggerPulse()
        dwellTimer = null
      }, dwellMs)
    },

    forceLeave() {
      if (dwellTimer) clearTimeout(dwellTimer)
      if (pulseTimer) cancelAnimationFrame(pulseTimer)
      activeId = 0; pulseScale = 1
      startPreWrap(0)
      startFade(baseAlpha, 0)
    },

    fadeOut() {
      if (dwellTimer) clearTimeout(dwellTimer)
      if (pulseTimer) cancelAnimationFrame(pulseTimer)
      activeId = 0; pulseScale = 1
      startPreWrap(0)
      startFade(0, 0)
    },

    commitDismiss() {
      if (dwellTimer) {
        clearTimeout(dwellTimer)
        dwellTimer = null
      }
      if (pulseTimer) cancelAnimationFrame(pulseTimer)

      startPreWrap(1)
      startFade(1, 1)
      spawnCommitRipples()

      const t0 = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - t0) / 420)
        const collapse = 1 - t
        pulseScale = 0.18 + (cfg.pulseScale * 1.55 - 0.18) * collapse * collapse

        if (t < 1) {
          pulseTimer = requestAnimationFrame(tick)
        } else {
          pulseScale = 0.18
          pulseTimer = null
          startPreWrap(0)
          startFade(0, 1)
        }
      }

      pulseTimer = requestAnimationFrame(tick)
    },

    updateRipples(now) {
      for (const rp of ripples) {
        if (rp.r < 0) continue
        const e = (now - rp.t0) * 0.001
        rp.r   = e * rp.speed
        rp.str = Math.max(0, 1 - e * 1.2)
        if (rp.str <= 0) rp.r = -1
      }
    },

    dispose() {
      ;[lerpRaf, fadeRaf, preWrapRaf, pulseTimer].forEach((r) => r && cancelAnimationFrame(r))
      if (dwellTimer) clearTimeout(dwellTimer)
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// VERTEX PROJECTOR
// ═══════════════════════════════════════════════════════════════════════════════

const _v3tmp  = new THREE.Vector3()
const _ndcTmp = new THREE.Vector3()

function createProjector(stride = 3) {
  let cache       = null
  let lastMeshPos = new THREE.Vector3()
  let lastCamPos  = new THREE.Vector3()

  return {
    project(mesh, geo, camera, rW, rH) {
      mesh.updateWorldMatrix(true, false)
      const meshWP = mesh.getWorldPosition(new THREE.Vector3())
      const camPos = camera.position

      if (!cache || meshWP.distanceTo(lastMeshPos) > 0.001 || camPos.distanceTo(lastCamPos) > 0.05) {
        lastMeshPos.copy(meshWP)
        lastCamPos.copy(camPos)

        const mw  = mesh.matrixWorld
        const pos = geo.attributes.position
        let minX = Infinity, maxX = -Infinity
        let minY = Infinity, maxY = -Infinity
        let n    = 0

        for (let i = 0; i < pos.count; i += stride) {
          _v3tmp.fromBufferAttribute(pos, i).applyMatrix4(mw)
          _ndcTmp.copy(_v3tmp).project(camera)
          if (_ndcTmp.z > 1) continue
          const sx = (_ndcTmp.x * 0.5 + 0.5) * rW
          const sy = (_ndcTmp.y * -0.5 + 0.5) * rH
          if (sx < minX) minX = sx; if (sx > maxX) maxX = sx
          if (sy < minY) minY = sy; if (sy > maxY) maxY = sy
          n++
        }

        cache = n === 0
          ? { cx: rW / 2, cy: rH / 2, r: 40 }
          : {
              cx: (minX + maxX) * 0.5,
              cy: (minY + maxY) * 0.5,
              r:  Math.hypot(maxX - minX, maxY - minY) * 0.5,
            }
      }
      return cache
    },
    reset() { cache = null },
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// BLOB RENDER PIPELINE
// ═══════════════════════════════════════════════════════════════════════════════

function createBlobPipeline(renderer, camera, objects, cfg) {
  const el = renderer.domElement
  let rW = el.width, rH = el.height

  // ── Render targets ────────────────────────────────────────────────────────
  const rtID = new THREE.WebGLRenderTarget(cfg.idRes, cfg.idRes, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    type:      THREE.UnsignedByteType,
  })

  const rtScene = new THREE.WebGLRenderTarget(rW, rH, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
  })

  const rtMask = new THREE.WebGLRenderTarget(rW, rH, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format:    THREE.RedFormat,
  })

  // ── ID scene ──────────────────────────────────────────────────────────────
  const idScene = new THREE.Scene()
  idScene.background = new THREE.Color(0, 0, 0)

  const idMeshes = objects.map((obj, i) => {
    const m = new THREE.Mesh(obj.geometry, new THREE.RawShaderMaterial({
      vertexShader:   _idVert,
      fragmentShader: _idFrag,
      uniforms:       { u_id: { value: (i + 1) / 255 } },
      side:           THREE.DoubleSide,
      depthTest:      true,
      depthWrite:     true,
    }))
    m.frustumCulled = false
    idScene.add(m)
    return m
  })

  // ── Shared uniforms ───────────────────────────────────────────────────────
  const colors8    = Array.from({ length: 8 }, (_, i) =>
    i < objects.length ? objects[i].blobColor : new THREE.Color(0, 0, 0))
  const blobColors = new Float32Array(colors8.flatMap((c) => [c.r, c.g, c.b]))

  const hovAngleSeed       = new Float32Array(8)
  const hovNoiseOffsetArr  = new Float32Array(16)
  const hovOrbitSpeed      = new Float32Array(8)
  const hovGhostSizeJitter = new Float32Array(32)
  const hovGhostPhaseOff   = new Float32Array(32)

  for (let i = 0; i < 8; i++) {
    const seeds = i < objects.length ? objects[i].hoveredSeeds : null
    hovAngleSeed[i]              = seeds?.angleSeed    ?? 0
    hovNoiseOffsetArr[i * 2 + 0] = seeds?.noiseOffsetX ?? 0
    hovNoiseOffsetArr[i * 2 + 1] = seeds?.noiseOffsetY ?? 0
    hovOrbitSpeed[i]             = seeds?.orbitSpeed   ?? 1
    for (let g = 0; g < 4; g++) {
      hovGhostSizeJitter[i * 4 + g] = seeds?.ghostSizeJitter?.[g]  ?? 1
      hovGhostPhaseOff[i * 4 + g]   = seeds?.ghostPhaseOffset?.[g] ?? 0
    }
  }

  const hovNoiseOffsetVec2 = Array.from({ length: 8 }, (_, i) =>
    new THREE.Vector2(hovNoiseOffsetArr[i * 2], hovNoiseOffsetArr[i * 2 + 1]))

  const sharedUniforms = {
    u_res:                { value: new THREE.Vector2(rW, rH) },
    u_blobs:              { value: Array.from({ length: 8 }, () => new THREE.Vector3(-9999, -9999, 0)) },
    u_count:              { value: cfg.trailCount },
    u_k:                  { value: cfg.smin_k },
    u_edge:               { value: cfg.edgeSoftness },
    u_alpha:              { value: 0 },
    u_time:               { value: 0 },
    u_pulseScale:         { value: 1 },
    u_blobColors:         { value: blobColors },
    u_cursorColor:        { value: new THREE.Color(CFG_CURSOR_COLOR) },
    u_hoverColor:         { value: new THREE.Color(cfg.hoverTintColor) },
    u_hoverMix:           { value: 0 },
    u_activeIdx:          { value: -1 },
    u_trigNoise:          { value: cfg.triggeredNoiseStrength },
    u_noiseScale:         { value: cfg.blobNoiseScale },
    u_chromStr:           { value: cfg.chromaticStrength },
    u_ghostCount:         { value: cfg.ghostCount },
    u_ghostRadius:        { value: cfg.ghostRadius },
    u_ghostAlpha:         { value: cfg.ghostAlphaFactor },
    u_lightness:          { value: cfg.lightness },
    u_breathe:            { value: 1 },
    u_curl:               { value: cfg.curlStrength },
    u_prism:              { value: cfg.prismStrength },
    u_ripples:            { value: Array.from({ length: 6 }, () => new THREE.Vector3(-1, 0, 0)) },
    tScene:               { value: rtScene.texture },
    tID:                  { value: rtID.texture },
    u_trailColor:         { value: new THREE.Color(cfg.trailColor) },
    u_ghostSizeScale:     { value: cfg.ghostSizeScale ?? [1, 1, 1, 1] },
    u_ghostSeed:          { value: cfg.ghostSeeds     ?? [0, 1, 2, 3] },
    u_hovAngleSeed:       { value: hovAngleSeed },
    u_hovNoiseOffset:     { value: hovNoiseOffsetVec2 },
    u_hovOrbitSpeed:      { value: hovOrbitSpeed },
    u_hovGhostSizeJitter: { value: hovGhostSizeJitter },
    u_hovGhostPhaseOff:   { value: hovGhostPhaseOff },
  }

  // ── Blob & mask scenes ────────────────────────────────────────────────────
  const blobScene = new THREE.Scene()
  const blobCam   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const quad      = new THREE.PlaneGeometry(2, 2)

  const blobMat = new THREE.ShaderMaterial({
    vertexShader:   _blobVert,
    fragmentShader: _blobFrag,
    uniforms:       sharedUniforms,
    depthTest:      false,
    depthWrite:     false,
  })
  blobScene.add(new THREE.Mesh(quad, blobMat))

  const maskScene = new THREE.Scene()
  const maskMat   = new THREE.ShaderMaterial({
    vertexShader:   _blobVert,
    fragmentShader: _maskFrag,
    uniforms:       sharedUniforms,
    depthTest:      false,
    depthWrite:     false,
  })
  maskScene.add(new THREE.Mesh(quad, maskMat))

  // ── Per-object projection state ───────────────────────────────────────────
  const projectors = objects.map((o) => createProjector(o.stride ?? 3))
  const smoothProj = objects.map(() => ({ cx: 0, cy: 0, r: 0, init: false }))
  let   lastProj   = { cx: 0, cy: 0, r: 0, id: 0 }
  const pixBuf     = new Uint8Array(4)
  const tmpColor   = new THREE.Color()

  return {
    projectors,
    smoothProj,
    maskTexture: rtMask.texture,
    rtMask,
    get lastProj() { return lastProj },
    getCommitPoint() {
      const dpr = renderer.getPixelRatio()
      if (!lastProj.id || lastProj.r <= 0 || !dpr) return null

      return {
        x: lastProj.cx / dpr,
        y: lastProj.cy / dpr,
      }
    },

    render(cs, scene, curPx, camera) {
      const now  = performance.now()
      const time = now * 0.001

      cs.updateRipples(now)

      const cW  = el.clientWidth, cH = el.clientHeight
      const dpr = renderer.getPixelRatio()
      const rW2 = cW * dpr, rH2 = cH * dpr

      if (Math.abs(rtScene.width - rW2) > 1 || Math.abs(rtScene.height - rH2) > 1) {
        rtScene.setSize(rW2, rH2)
        rtMask.setSize(rW2, rH2)
        sharedUniforms.u_res.value.set(rW2, rH2)
      }

      // ID pass
      idMeshes.forEach((m, i) => {
        objects[i].mesh.updateWorldMatrix(true, false)
        m.matrixAutoUpdate = false
        m.matrix.copy(objects[i].mesh.matrixWorld)
        m.matrixWorld.copy(objects[i].mesh.matrixWorld)
      })

      renderer.setRenderTarget(rtID)
      renderer.clear()
      renderer.render(idScene, camera)

      const sx = Math.max(0, Math.min(cfg.idRes - 1, Math.round((curPx.x / cW) * cfg.idRes)))
      const sy = Math.max(0, Math.min(cfg.idRes - 1, Math.round((1 - curPx.y / cH) * cfg.idRes)))
      renderer.readRenderTargetPixels(rtID, sx, sy, 1, 1, pixBuf)
      cs.setHoveredId(pixBuf[0])

      // Optional material highlight
      if (cfg.enableMaterialHighlight) {
        const alpha = cs.alpha
        objects.forEach((obj, i) => {
          const active = i === cs.activeId - 1
          if (obj.colorA && obj.colorB && obj.material?.color) {
            tmpColor.lerpColors(obj.colorA, obj.colorB, active ? alpha : 0)
            obj.material.color.copy(tmpColor)
            if (obj.material.emissive) obj.material.emissive.setScalar(active ? alpha * 0.4 : 0)
          }
          if (obj.wireframe) obj.wireframe.material.opacity = active ? 0.15 + alpha * 0.7 : 0.18
        })
      }

      // Scene + mask passes
      renderer.setRenderTarget(rtScene)
      renderer.clear()
      renderer.render(scene, camera)

      renderer.setRenderTarget(rtMask)
      renderer.clear()
      renderer.render(maskScene, blobCam)

      renderer.setRenderTarget(null)
      renderer.clear()

      // Update shared uniforms
      const alpha  = cs.alpha
      const anchor = cs.anchor

      sharedUniforms.u_alpha.value      = alpha
      sharedUniforms.u_activeIdx.value  = cs.activeId > 0 ? cs.activeId - 1 : -1
      sharedUniforms.u_hoverMix.value   = (1 - anchor) * cs.preWrap * cfg.hoverTintMix
      sharedUniforms.u_time.value       = time
      sharedUniforms.u_pulseScale.value = cs.pulseScale
      sharedUniforms.u_breathe.value    = 1 + Math.sin(time * cfg.breatheFreq * Math.PI * 2) * cfg.breatheAmp
      sharedUniforms.u_res.value.set(rW2, rH2)
      sharedUniforms.u_trailColor.value.set(cfg.trailColor)
      sharedUniforms.u_ghostSizeScale.value = cfg.ghostSizeScale
      sharedUniforms.u_ghostSeed.value      = cfg.ghostSeeds

      const ru   = sharedUniforms.u_ripples.value
      const rips = cs.ripples
      for (let i = 0; i < 6; i++) {
        const rp = rips[i % rips.length]
        rp && rp.r >= 0 ? ru[i].set(rp.r, rp.str, 0) : ru[i].set(-1, 0, 0)
      }

      // Smooth projection
      const projIdx = cs.activeId > 0
        ? cs.activeId - 1
        : alpha > cfg.baseAlpha + 0.01 ? lastProj.id - 1 : -1

      if (projIdx >= 0 && projIdx < objects.length) {
        const obj  = objects[projIdx]
        const raw  = projectors[projIdx].project(obj.mesh, obj.geometry, camera, rW2, rH2)
        const tgtR = raw.r * cfg.margin
        const s    = smoothProj[projIdx]
        if (!s.init) { s.cx = raw.cx; s.cy = raw.cy; s.r = tgtR; s.init = true }
        const l = 0.25
        s.cx += (raw.cx - s.cx) * l
        s.cy += (raw.cy - s.cy) * l
        s.r  += (tgtR   - s.r)  * l
      }

      let projCx = 0, projCy = 0, projR = 0
      if (cs.activeId > 0) {
        const s = smoothProj[cs.activeId - 1]
        projCx = s.cx; projCy = s.cy; projR = s.r
        lastProj = { cx: projCx, cy: projCy, r: projR, id: cs.activeId }
      } else if (alpha > cfg.baseAlpha + 0.01) {
        projCx = lastProj.cx; projCy = lastProj.cy; projR = lastProj.r
      }

      // Blob positions
      const blobs = sharedUniforms.u_blobs.value
      const hb    = THREE.MathUtils.clamp((alpha - cfg.baseAlpha) / (1 - cfg.baseAlpha), 0, 1)

      for (let i = 0; i < cfg.trailCount; i++) {
        const p     = cs.trail[i]
        const cx    = p.x * dpr, cy = rH2 - p.y * dpr
        const bx    = projCx * anchor + cx * (1 - anchor)
        const by    = (rH2 - projCy) * anchor + cy * (1 - anchor)
        const baseR = (cfg.sizes[i] ?? cfg.sizes[0]) * dpr * 0.5
        const idleR = baseR * cfg.untriggeredSizeScale * (1 + (cfg.preWrapScale - 1) * cs.preWrap * (1 - anchor))
        blobs[i].set(bx, by, THREE.MathUtils.lerp(idleR, projR > 0 ? projR : idleR, hb))
      }
      for (let i = cfg.trailCount; i < 8; i++) blobs[i].set(-9999, -9999, 0)

      // Final composite
      renderer.render(blobScene, blobCam)
    },

    resize() {
      const w = el.clientWidth, h = el.clientHeight, d = renderer.getPixelRatio()
      renderer.setSize(w, h)
      rtScene.setSize(w * d, h * d)
      rtMask.setSize(w * d, h * d)
      sharedUniforms.u_res.value.set(w * d, h * d)
    },

    dispose() {
      rtID.dispose()
      rtScene.dispose()
      rtMask.dispose()
      blobMat.dispose()
      maskMat.dispose()
      quad.dispose()
      idMeshes.forEach((m) => m.material.dispose())
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// REACT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function MetaballCursorR3F({ objects, eventTarget, config = {}, disabled = false, onStateReady }) {
  const { gl, scene, camera } = useThree()
  const cfg         = useMemo(() => ({ ...DEFAULT_CFG, ...config }), [])
  const pipelineRef = useRef(null)
  const csRef       = useRef(null)
  const curPxRef    = useRef({ x: -999, y: -999 })
  const readyRef    = useRef(false)

  // Init / teardown pipeline
  useEffect(() => {
    if (!objects?.length || !gl) return
    const pipeline = createBlobPipeline(gl, camera, objects, cfg)
    const cs       = createCursorState(cfg)
    pipelineRef.current = pipeline
    csRef.current       = cs
    readyRef.current    = true
    onStateReady?.({ cs, pipeline })
    return () => {
      readyRef.current    = false
      pipeline.dispose()
      cs.dispose()
      pipelineRef.current = null
      csRef.current       = null
    }
  }, [objects, gl])

  // Mouse tracking
  useEffect(() => {
    if (disabled) {
      curPxRef.current.x = -999
      curPxRef.current.y = -999
      csRef.current?.fadeOut()
      return undefined
    }

    const el = eventTarget?.current ?? gl.domElement
    if (!el) return
    const onMove = (e) => {
      const rect = gl.domElement.getBoundingClientRect()
      curPxRef.current.x = e.clientX - rect.left
      curPxRef.current.y = e.clientY - rect.top
      csRef.current?.moveTo(curPxRef.current.x, curPxRef.current.y)
    }
    const onLeave = () => csRef.current?.forceLeave()
    el.addEventListener('mousemove', onMove,   { passive: true })
    el.addEventListener('mouseleave', onLeave, { passive: true })
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [disabled, eventTarget, gl])

  useEffect(() => {
    if (disabled) {
      curPxRef.current.x = -999
      curPxRef.current.y = -999
      csRef.current?.fadeOut()
    }
  }, [disabled])

  // Resize observer
  useEffect(() => {
    if (!gl) return
    const ro = new ResizeObserver(() => pipelineRef.current?.resize())
    ro.observe(gl.domElement)
    return () => ro.disconnect()
  }, [gl])

  // Per-frame render
  useFrame(() => {
    if (!readyRef.current || !pipelineRef.current || !csRef.current) return
    pipelineRef.current.render(csRef.current, scene, curPxRef.current, camera)
  }, 1)

  return null
}

export { MetaballCursorOverlay } from './MetaballCursorOverlay'
export default MetaballCursorR3F
