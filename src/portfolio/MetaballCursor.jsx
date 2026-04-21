import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════════════════════
// METABALL CURSOR
//
// Architecture (R3F-integrated):
//   - Runs entirely INSIDE the R3F Canvas via useFrame — no separate RAF loop,
//     no render-loop conflict, no fighting with ScrollControls.
//   - Mouse events are attached to the SCROLL CONTAINER (passed as `eventTarget`)
//     not the raw canvas, so ScrollControls doesn't swallow them.
//   - ID pass uses the R3F camera at correct resolution so each mesh is
//     individually detectable.
//   - <MetaballCursorOverlay> is the React part (tooltip, hint) that sits
//     as a DOM sibling above the canvas.
//
// Usage in Portfolio:
//   // Inside <Canvas> (child of ScrollControls or direct):
//   <MetaballCursorR3F objects={metaballObjects} eventTarget={scrollContainerRef} />
//
//   // In the DOM, sibling of <Canvas>:
//   <MetaballCursorOverlay objects={metaballObjects} stateRef={metaballStateRef} />
//
// Or use the convenience wrapper <MetaballCursor> which wires both together.
// ═══════════════════════════════════════════════════════════════════════════════

// ─── COLOR PALETTE ────────────────────────────────────────────────────────────
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

/**
 * buildMetaballObjects(meshes)
 * Converts THREE.Mesh[] (from SceneLoader.interactiveMeshes) into MetaballObject[].
 * Adaptive stride: large meshes sample fewer vertices for fast projection.
 */
export function buildMetaballObjects(meshes) {
  return meshes.map((mesh, i) => {
    const pal      = METABALL_PALETTE[i % METABALL_PALETTE.length]
    const matColor = mesh.material?.color
    const colorA   = matColor ? matColor.clone() : pal.a.clone()
    const colorB   = pal.b.clone()
    const blobColor = pal.blob.clone()

    // Adaptive stride: aim for ~600 sampled vertices max per mesh
    const vertCount = mesh.geometry.attributes.position.count
    const stride    = Math.max(1, Math.floor(vertCount / 600))

    return {
      mesh,
      geometry:   mesh.geometry,
      blobColor,
      colorA,
      colorB,
      material:   mesh.material ?? null,
      wireframe:  null,
      stride,
      label:      mesh.name || `Object ${i + 1}`,
      title:      mesh.name || null,
      desc:       null,
    }
  })
}

// ─── SHADERS ──────────────────────────────────────────────────────────────────

// ID pass — renders each mesh as a flat color encoding its index
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

// Blob composite — full-screen quad that composites metaballs over the scene
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

  float baseF   = sdf(uv, 0.0);
  float baseIns = 1.0 - smoothstep(-u_edge * u_res.y, u_edge * u_res.y, baseF);

  vec2  co      = curl(uv * u_noiseScale * 0.5 + u_time * 0.1) * u_curl * u_alpha;
  float nAmt    = fbm((uv + co) * u_noiseScale + u_time * 0.2) * u_trigNoise * u_alpha;
  float trigIns = 1.0 - smoothstep(-u_edge * u_res.y, u_edge * u_res.y, sdf(uv + co, nAmt));

  float ghostIns = 0.0;
  if (u_alpha > 0.0) {
    for (int g = 0; g < 4; g++) {
      if (g >= u_ghostCount) break;
      float ang = float(g) * 6.28318 / float(u_ghostCount) + u_time * 1.8;
      float gr  = u_ghostRadius * (0.6 + 0.4 * sin(float(g) * 1.7 + u_time * 2.5));
      vec2  off = vec2(cos(ang), sin(ang)) * gr;
      float gf  = sdf(uv - off, fbm((uv - off) * u_noiseScale + u_time * 0.2) * u_trigNoise * u_alpha);
      ghostIns  = min(1.0, ghostIns + (1.0 - smoothstep(-u_edge * u_res.y, u_edge * u_res.y, gf)) * u_ghostAlpha * u_alpha);
    }
  }

  float ins = min(1.0, baseIns + (trigIns - baseIns) * u_alpha + ghostIns);

  float ripGlow = 0.0;
  for (int r = 0; r < 6; r++) {
    if (u_ripples[r].x < 0.0) continue;
    ripGlow += smoothstep(3.0, 0.0, abs(baseF - u_ripples[r].x)) * u_ripples[r].y;
  }

  vec3 tgt = u_activeIdx >= 0 ? u_blobColors[u_activeIdx] : u_cursorColor;
  tgt = mix(tgt, u_hoverColor, clamp(u_hoverMix, 0.0, 1.0));
  vec3 blobCol = mix(mix(tgt, vec3(1.0), u_lightness), tgt, u_alpha) * u_pulseScale;

  float et   = smoothstep(0.0, 0.3, ins) * (1.0 - smoothstep(0.7, 1.0, ins));
  vec3  prism = (vec3(0.9, 0.2, 0.1) + vec3(0.1, 0.9, 0.2) * 0.8 + vec3(0.1, 0.2, 0.9) * 0.6)
                * et * u_prism * u_alpha;

  vec3 fs = scene;
  if (u_alpha > 0.0 && u_chromStr > 0.0) {
    vec2 rd  = length(uv - u_blobs[0].xy) > 0.001 ? normalize(uv - u_blobs[0].xy) : vec2(1.0, 0.0);
    float cs = u_chromStr * ins * u_alpha;
    fs = vec3(
      texture2D(tScene, (uv + rd * cs)        / u_res).r,
      scene.g,
      texture2D(tScene, (uv - rd * cs * 0.7)  / u_res).b
    );
  }

  vec3 res = mix(fs, mix(fs, blobCol, ins), 1.0 - u_alpha);
  res = mix(res, 1.0 - fs, ins * u_alpha);
  res += prism * (1.0 - res);
  res = mix(res, vec3(0.95, 0.85, 1.0), ripGlow * 0.4 * u_alpha);

  gl_FragColor = vec4(res, 1.0);
}
`

// ─── DEFAULT CONFIG ───────────────────────────────────────────────────────────
export const DEFAULT_CFG = {
  trailCount:              3,
  sizes:                   [18, 38, 22],
  fastDur:                 110,
  slowDur:                 750,
  smin_k:                  0.22,
  edgeSoftness:            0.0006,
  dwellMs:                 900,
  fadeInMs:                500,
  fadeOutMs:               140,
  reanchorMs:              110,
  idRes:                   512,
  margin:                  1.2,
  pulseScale:              1.28,
  pulseDuration:           380,
  baseAlpha:               0.28,
  triggeredNoiseStrength:  90,
  lightness:               0.65,
  untriggeredSizeScale:    0.72,
  blobNoiseScale:          0.028,
  chromaticStrength:       2.2,
  ghostCount:              4,
  ghostRadius:             14,
  ghostAlphaFactor:        0.55,
  rippleCount:             3,
  breatheAmp:              0.06,
  breatheFreq:             0.9,
  curlStrength:            18,
  prismStrength:           0.7,
  hoverTintColor:          0x9fe8ff,
  hoverTintMix:            0.78,
  preWrapMs:               260,
  preWrapScale:            1.58,
  preWrapEasePower:        3,
}

// ─── CURSOR STATE ─────────────────────────────────────────────────────────────
function createCursorState(cfg) {
  const { trailCount, fastDur, slowDur, fadeInMs, fadeOutMs,
          reanchorMs, dwellMs, baseAlpha } = cfg

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

  const easeBack = t => {
    const c2 = 1.70158 * 2.525
    return t < 0.5
      ? Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (2 * t - 2) + c2) + 2) / 2
  }
  const easeOut = (t, p = 3) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), p)

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
    const dt = Math.min(fadeLast ? now - fadeLast : 16, 64)
    fadeLast = now
    const entering = fadeTgt > 0.5, dir = entering ? 1 : -1
    progress = Math.min(1, Math.max(0, progress + dir * dt / (entering ? fadeInMs : fadeOutMs)))
    alpha  = entering
      ? Math.max(baseAlpha, easeBack(progress))
      : Math.min(1, baseAlpha + progress * (1 - baseAlpha))
    anchor = Math.min(1, Math.max(0,
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
    const dt = Math.min(preWrapLast ? now - preWrapLast : 16, 64)
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
  const startPreWrap = t => {
    if (Math.abs(preWrap - t) < 0.001 && !preWrapRaf) return
    if (preWrapRaf) cancelAnimationFrame(preWrapRaf)
    preWrapFrom = preWrap; preWrapTo = t; preWrapProg = 0; preWrapLast = null
    preWrapRaf = requestAnimationFrame(preWrapTick)
  }

  function spawnRipples() {
    for (let i = 0; i < cfg.rippleCount; i++) {
      ripples[i % ripples.length] = { r: 0, str: 1, speed: 120 + i * 60, t0: performance.now() }
    }
  }
  function triggerPulse() {
    if (pulseTimer) cancelAnimationFrame(pulseTimer)
    const t0 = performance.now()
    const tick = now => {
      const t = Math.min(1, (now - t0) / cfg.pulseDuration)
      pulseScale = 1 + (cfg.pulseScale - 1) * (1 - t)
      if (t < 1) pulseTimer = requestAnimationFrame(tick)
      else { pulseScale = 1; pulseTimer = null }
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
      if (!id) { startPreWrap(0); startFade(baseAlpha, 0); return }
      startPreWrap(1); startFade(baseAlpha, 0)
      dwellTimer = setTimeout(() => {
        startFade(1, 1); triggerPulse(); dwellTimer = null
      }, dwellMs)
    },

    forceLeave() {
      if (dwellTimer) clearTimeout(dwellTimer)
      if (pulseTimer) cancelAnimationFrame(pulseTimer)
      activeId = 0; pulseScale = 1
      startPreWrap(0); startFade(baseAlpha, 0)
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
      ;[lerpRaf, fadeRaf, preWrapRaf, pulseTimer].forEach(r => r && cancelAnimationFrame(r))
      if (dwellTimer) clearTimeout(dwellTimer)
    },
  }
}

// ─── PROJECTOR ────────────────────────────────────────────────────────────────
const _v3tmp  = new THREE.Vector3()
const _ndcTmp = new THREE.Vector3()

function createProjector(stride = 3) {
  let cache   = null
  let lastMeshPos = new THREE.Vector3()
  let lastCamPos  = new THREE.Vector3()

  return {
    project(mesh, geo, camera, rW, rH) {
      mesh.updateWorldMatrix(true, false)
      const meshWP = mesh.getWorldPosition(new THREE.Vector3())
      const camPos = camera.position

      // Invalidate if mesh moved OR camera moved more than a small threshold
      const meshMoved = meshWP.distanceTo(lastMeshPos) > 0.001
      const camMoved  = camPos.distanceTo(lastCamPos)  > 0.05

      if (!cache || meshMoved || camMoved) {
        lastMeshPos.copy(meshWP)
        lastCamPos.copy(camPos)

        const mw    = mesh.matrixWorld
        const pos   = geo.attributes.position
        const count = pos.count
        let minX = Infinity, maxX = -Infinity
        let minY = Infinity, maxY = -Infinity
        let n = 0

        for (let i = 0; i < count; i += stride) {
          _v3tmp.fromBufferAttribute(pos, i).applyMatrix4(mw)
          _ndcTmp.copy(_v3tmp).project(camera)
          if (_ndcTmp.z > 1) continue   // behind camera
          const sx = (_ndcTmp.x *  0.5 + 0.5) * rW
          const sy = (_ndcTmp.y * -0.5 + 0.5) * rH
          if (sx < minX) minX = sx;  if (sx > maxX) maxX = sx
          if (sy < minY) minY = sy;  if (sy > maxY) maxY = sy
          n++
        }

        cache = n === 0
          ? { cx: rW / 2, cy: rH / 2, r: 40 }
          : { cx: (minX + maxX) * 0.5, cy: (minY + maxY) * 0.5, r: Math.hypot(maxX - minX, maxY - minY) * 0.5 }
      }
      return cache
    },
    reset() { cache = null },
  }
}

// ─── BLOB PIPELINE (created once, lives inside useEffect) ────────────────────
function createBlobPipeline(renderer, camera, objects, cfg) {
  const el = renderer.domElement
  let rW = el.width, rH = el.height

  // ── ID render target ──────────────────────────────────────────────────────
  // Use a fixed 512×512 target. We map cursor position proportionally into it.
  const rtID = new THREE.WebGLRenderTarget(cfg.idRes, cfg.idRes, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    type: THREE.UnsignedByteType,
  })

  // Each interactive mesh gets its own clone in the ID scene
  // with a unique flat color: R = (index+1)/255
  const idScene = new THREE.Scene()
  idScene.background = new THREE.Color(0, 0, 0)

  const idMeshes = objects.map((obj, i) => {
    const m = new THREE.Mesh(
      obj.geometry,
      new THREE.RawShaderMaterial({
        vertexShader:   _idVert,
        fragmentShader: _idFrag,
        uniforms: { u_id: { value: (i + 1) / 255 } },
        // Disable all state that could cause z-fighting or culling issues
        side:           THREE.DoubleSide,
        depthTest:      true,
        depthWrite:     true,
      })
    )
    m.frustumCulled = false   // always render in ID pass regardless of camera
    idScene.add(m)
    return m
  })

  // ── Scene capture render target ───────────────────────────────────────────
  const rtScene = new THREE.WebGLRenderTarget(rW, rH, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
  })

  // ── Blob composite quad ───────────────────────────────────────────────────
  const blobScene = new THREE.Scene()
  const blobCam   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const ripUnis   = Array.from({ length: 6 }, () => new THREE.Vector3(-1, 0, 0))

  // Pad blob colors to exactly 8 slots
  const colors8 = Array.from({ length: 8 }, (_, i) =>
    i < objects.length ? objects[i].blobColor : new THREE.Color(0, 0, 0)
  )
  const blobColorArr = new Float32Array(colors8.flatMap(c => [c.r, c.g, c.b]))

  const mat = new THREE.ShaderMaterial({
    vertexShader:   _blobVert,
    fragmentShader: _blobFrag,
    uniforms: {
      u_res:        { value: new THREE.Vector2(rW, rH) },
      u_blobs:      { value: Array.from({ length: 8 }, () => new THREE.Vector3(-9999, -9999, 0)) },
      u_count:      { value: cfg.trailCount },
      u_k:          { value: cfg.smin_k },
      u_edge:       { value: cfg.edgeSoftness },
      u_alpha:      { value: 0 },
      u_time:       { value: 0 },
      u_pulseScale: { value: 1 },
      u_blobColors: { value: blobColorArr },
      u_cursorColor:{ value: new THREE.Color(0xffffff) },
      u_hoverColor: { value: new THREE.Color(cfg.hoverTintColor) },
      u_hoverMix:   { value: 0 },
      u_activeIdx:  { value: -1 },
      u_trigNoise:  { value: cfg.triggeredNoiseStrength },
      u_noiseScale: { value: cfg.blobNoiseScale },
      u_chromStr:   { value: cfg.chromaticStrength },
      u_ghostCount: { value: cfg.ghostCount },
      u_ghostRadius:{ value: cfg.ghostRadius },
      u_ghostAlpha: { value: cfg.ghostAlphaFactor },
      u_lightness:  { value: cfg.lightness },
      u_breathe:    { value: 1 },
      u_curl:       { value: cfg.curlStrength },
      u_prism:      { value: cfg.prismStrength },
      u_ripples:    { value: ripUnis },
      tScene:       { value: rtScene.texture },
    },
    depthTest: false,
    depthWrite: false,
  })
  blobScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat))

  const projectors  = objects.map(o => createProjector(o.stride ?? 3))
  const smoothProj  = objects.map(() => ({ cx: 0, cy: 0, r: 0, init: false }))
  let   lastProj    = { cx: 0, cy: 0, r: 0, id: 0 }
  const pixBuf      = new Uint8Array(4)
  const tmpColor    = new THREE.Color()
  let   lastTime    = performance.now()

  return {
    projectors,
    smoothProj,
    get lastProj() { return lastProj },

    /**
     * render() — called from useFrame every tick.
     * scene    : the R3F scene (THREE.Scene)
     * curPx    : { x, y } in CSS pixels relative to the canvas element
     * camera   : the R3F camera (already updated by MarkerPathCamera)
     */
    render(cs, scene, curPx, camera) {
      const now  = performance.now()
      const time = now * 0.001
      const dt   = Math.max(8, now - lastTime)
      lastTime   = now

      cs.updateRipples(now)

      const cW = el.clientWidth
      const cH = el.clientHeight
      const d  = renderer.getPixelRatio()
      const rW2 = cW * d
      const rH2 = cH * d

      // Resize render targets if canvas size changed
      if (Math.abs(rtScene.width - rW2) > 1 || Math.abs(rtScene.height - rH2) > 1) {
        rtScene.setSize(rW2, rH2)
        mat.uniforms.u_res.value.set(rW2, rH2)
      }

      // ── 1. ID PASS ──────────────────────────────────────────────────────
      // Sync id-mesh world matrices from live scene
      idMeshes.forEach((m, i) => {
        objects[i].mesh.updateWorldMatrix(true, false)
        m.matrixAutoUpdate = false
        m.matrix.copy(objects[i].mesh.matrixWorld)
        m.matrixWorld.copy(objects[i].mesh.matrixWorld)
      })

      renderer.setRenderTarget(rtID)
      renderer.clear()
      renderer.render(idScene, camera)

      // Map cursor CSS position → ID target pixel
      const sx = Math.max(0, Math.min(cfg.idRes - 1, Math.round((curPx.x / cW) * cfg.idRes)))
      const sy = Math.max(0, Math.min(cfg.idRes - 1, Math.round((1 - curPx.y / cH) * cfg.idRes)))
      renderer.readRenderTargetPixels(rtID, sx, sy, 1, 1, pixBuf)

      // pixBuf[0] encodes the object id: 0 = nothing, n = object index n-1
      cs.setHoveredId(pixBuf[0])

      const alpha  = cs.alpha
      const anchor = cs.anchor

      // ── 2. Mutate mesh colors on hover ──────────────────────────────────
      objects.forEach((obj, i) => {
        const active = i === cs.activeId - 1
        if (obj.colorA && obj.colorB && obj.material?.color) {
          tmpColor.lerpColors(obj.colorA, obj.colorB, active ? alpha : 0)
          obj.material.color.copy(tmpColor)
          if (obj.material.emissive) obj.material.emissive.setScalar(active ? alpha * 0.4 : 0)
        }
        if (obj.wireframe) obj.wireframe.material.opacity = active ? 0.15 + alpha * 0.7 : 0.18
      })

      // ── 3. SCENE PASS ───────────────────────────────────────────────────
      renderer.setRenderTarget(rtScene)
      renderer.clear()
      renderer.render(scene, camera)

      // ── 4. BLOB COMPOSITE PASS ──────────────────────────────────────────
      renderer.setRenderTarget(null)
      renderer.clear()

      mat.uniforms.u_alpha.value      = alpha
      mat.uniforms.u_activeIdx.value  = cs.activeId > 0 ? cs.activeId - 1 : -1
      mat.uniforms.u_hoverMix.value   = (1 - anchor) * cs.preWrap * cfg.hoverTintMix
      mat.uniforms.u_time.value       = time
      mat.uniforms.u_pulseScale.value = cs.pulseScale
      mat.uniforms.u_breathe.value    = 1 + Math.sin(time * cfg.breatheFreq * Math.PI * 2) * cfg.breatheAmp
      mat.uniforms.u_res.value.set(rW2, rH2)

      const ru   = mat.uniforms.u_ripples.value
      const rips = cs.ripples
      for (let i = 0; i < 6; i++) {
        const rp = rips[i % rips.length]
        rp && rp.r >= 0 ? ru[i].set(rp.r, rp.str, 0) : ru[i].set(-1, 0, 0)
      }

      // Project hovered object to screen space
      const projIdx = cs.activeId > 0
        ? cs.activeId - 1
        : alpha > cfg.baseAlpha + 0.01 ? lastProj.id - 1 : -1

      if (projIdx >= 0 && projIdx < objects.length) {
        const obj = objects[projIdx]
        const raw = projectors[projIdx].project(obj.mesh, obj.geometry, camera, rW2, rH2)
        const tgtR = raw.r * cfg.margin
        const s    = smoothProj[projIdx]
        if (!s.init) { s.cx = raw.cx; s.cy = raw.cy; s.r = tgtR; s.init = true }
        // Faster lerp when camera is moving so blob tracks the object screen position
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

      // Place trail blobs
      const blobs = mat.uniforms.u_blobs.value
      const hb    = THREE.MathUtils.clamp((alpha - cfg.baseAlpha) / (1 - cfg.baseAlpha), 0, 1)

      for (let i = 0; i < cfg.trailCount; i++) {
        const p   = cs.trail[i]
        const cx  = p.x * d
        const cy  = rH2 - p.y * d
        const bx  = projCx * anchor + cx * (1 - anchor)
        const by  = (rH2 - projCy) * anchor + cy * (1 - anchor)
        const baseR = (cfg.sizes[i] ?? cfg.sizes[0]) * d * 0.5
        const idleR = baseR * cfg.untriggeredSizeScale
                    * (1 + (cfg.preWrapScale - 1) * cs.preWrap * (1 - anchor))
        blobs[i].set(bx, by, THREE.MathUtils.lerp(idleR, projR > 0 ? projR : idleR, hb))
      }
      for (let i = cfg.trailCount; i < 8; i++) blobs[i].set(-9999, -9999, 0)

      renderer.render(blobScene, blobCam)
    },

    resize() {
      const w = el.clientWidth, h = el.clientHeight, d = renderer.getPixelRatio()
      renderer.setSize(w, h)
      rtScene.setSize(w * d, h * d)
      mat.uniforms.u_res.value.set(w * d, h * d)
    },

    dispose() {
      rtID.dispose()
      rtScene.dispose()
      mat.dispose()
      idMeshes.forEach(m => m.material.dispose())
    },
  }
}

// ─── TOOLTIP ─────────────────────────────────────────────────────────────────
function ObjectTooltip({ title, desc, x, y, color, visible, alpha }) {
  const r = Math.round(color.r * 255)
  const g = Math.round(color.g * 255)
  const b = Math.round(color.b * 255)
  return (
    <div style={{
      position: 'absolute', left: x + 28, top: y + 28,
      pointerEvents: 'none', maxWidth: 200,
      opacity: visible ? alpha : 0,
      transform: `translateY(${visible ? 0 : 8}px)`,
      transition: 'opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)',
    }}>
      <div style={{
        display: 'inline-block', width: 18, height: 2, borderRadius: 1,
        background: `rgb(${r},${g},${b})`, marginBottom: 7,
        boxShadow: `0 0 8px rgb(${r},${g},${b})`,
      }} />
      {title && (
        <div style={{ fontSize: 15, fontWeight: 500, color: '#fff', letterSpacing: '0.02em', lineHeight: 1.2, marginBottom: 5 }}>
          {title}
        </div>
      )}
      {desc && (
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55, letterSpacing: '0.01em' }}>
          {desc}
        </div>
      )}
    </div>
  )
}

// ─── R3F INNER COMPONENT (runs inside <Canvas>) ───────────────────────────────
/**
 * MetaballCursorR3F
 *
 * Place this INSIDE your <Canvas> tree (e.g. as a sibling of SceneLoader).
 * It wires the pipeline into R3F's useFrame so there is no separate RAF loop.
 *
 * Props:
 *   objects      {MetaballObject[]}   — from buildMetaballObjects()
 *   eventTarget  {React.RefObject}    — ref to the scroll container div
 *                                       (so mouse events aren't eaten by ScrollControls)
 *   config       {object}             — optional DEFAULT_CFG overrides
 *   onStateReady {fn}                 — called with { cs, pipeline } once ready
 *                                       (Portfolio uses this to drive the overlay)
 */
export function MetaballCursorR3F({ objects, eventTarget, config = {}, onStateReady }) {
  const { gl, scene, camera } = useThree()
  const cfg        = useMemo(() => ({ ...DEFAULT_CFG, ...config }), []) // eslint-disable-line
  const pipelineRef = useRef(null)
  const csRef       = useRef(null)
  const curPxRef    = useRef({ x: -999, y: -999 })
  const readyRef    = useRef(false)

  // Build pipeline + cursor state once objects/renderer are available
  useEffect(() => {
    if (!objects?.length || !gl) return

    const pipeline = createBlobPipeline(gl, camera, objects, cfg)
    const cs       = createCursorState(cfg)
    pipelineRef.current = pipeline
    csRef.current       = cs
    readyRef.current    = true
    onStateReady?.({ cs, pipeline })

    return () => {
      readyRef.current = false
      pipeline.dispose()
      cs.dispose()
      pipelineRef.current = null
      csRef.current       = null
    }
  }, [objects, gl]) // eslint-disable-line

  // Attach mouse listeners to the scroll container (not the canvas)
  useEffect(() => {
    const el = eventTarget?.current ?? gl.domElement
    if (!el) return

    const onMove = e => {
      const rect = gl.domElement.getBoundingClientRect()
      // Convert from page coords to canvas-relative coords
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      curPxRef.current.x = x
      curPxRef.current.y = y
      csRef.current?.moveTo(x, y)
    }
    const onLeave = () => csRef.current?.forceLeave()

    el.addEventListener('mousemove',  onMove,  { passive: true })
    el.addEventListener('mouseleave', onLeave, { passive: true })
    return () => {
      el.removeEventListener('mousemove',  onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [eventTarget, gl])

  // Handle resize
  useEffect(() => {
    if (!gl) return
    const ro = new ResizeObserver(() => pipelineRef.current?.resize())
    ro.observe(gl.domElement)
    return () => ro.disconnect()
  }, [gl])

  // Hook into R3F's render loop — runs AFTER all useFrame hooks with lower priority
  // priority=1 means it runs after priority=0 hooks (like MarkerPathCamera)
  useFrame((state) => {
    if (!readyRef.current || !pipelineRef.current || !csRef.current) return
    pipelineRef.current.render(csRef.current, scene, curPxRef.current, camera)
  }, 1)  // priority 1 = runs after default (0) frame hooks

  return null
}

// ─── DOM OVERLAY (tooltip + hint, sits outside Canvas) ───────────────────────
/**
 * MetaballCursorOverlay
 *
 * Renders the tooltip DOM layer. Place this as a DOM sibling of <Canvas>.
 * Reads hover state via stateRef (populated by MetaballCursorR3F.onStateReady).
 */
export function MetaballCursorOverlay({ objects, stateRef, showHint = true }) {
  const [labelState, setLabelState] = useState({ idx: -1, x: 0, y: 0, visible: false, alpha: 0 })
  const rafRef      = useRef(null)
  const lastHovRef  = useRef(-1)
  const lastAlphaRef = useRef(0)

  useEffect(() => {
    let running = true

    const tick = () => {
      if (!running) return
      rafRef.current = requestAnimationFrame(tick)

      const { cs, pipeline } = stateRef?.current ?? {}
      if (!cs || !pipeline) return

      const newHov   = cs.activeId - 1
      const curAlpha = cs.anchor > 0.01
        ? Math.min(1, (cs.alpha - DEFAULT_CFG.baseAlpha) / (1 - DEFAULT_CFG.baseAlpha))
        : 0

      if (newHov !== lastHovRef.current) {
        lastHovRef.current = newHov
        if (newHov >= 0 && objects?.[newHov]) {
          const s = pipeline.smoothProj[newHov]
          setLabelState({ idx: newHov, x: s.cx, y: s.cy, visible: true, alpha: 0 })
        } else {
          setLabelState(prev => ({ ...prev, visible: false }))
        }
      }

      if (newHov >= 0 && Math.abs(curAlpha - lastAlphaRef.current) > 0.015) {
        lastAlphaRef.current = curAlpha
        setLabelState(prev => prev.visible ? { ...prev, alpha: curAlpha } : prev)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { running = false; cancelAnimationFrame(rafRef.current) }
  }, [objects, stateRef])

  const obj = labelState.idx >= 0 ? objects?.[labelState.idx] : null

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {obj && (
        <ObjectTooltip
          title={obj.title}
          desc={obj.desc}
          x={labelState.x}
          y={labelState.y}
          color={obj.blobColor}
          visible={labelState.visible}
          alpha={labelState.alpha}
        />
      )}
      {showHint && (
        <div style={{
          position: 'absolute', bottom: 14, left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em',
        }}>
          hover any object
        </div>
      )}
    </div>
  )
}

export default MetaballCursorR3F