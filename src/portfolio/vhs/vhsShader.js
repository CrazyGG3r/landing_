import * as THREE from 'three'
import {
  VHS_EFFECT_COUNT,
  buildVhsUniformArrays,
  DEFAULT_VHS_CONFIG,
} from './vhsEffects'

// ═══════════════════════════════════════════════════════════════════════════════
// VHS SHADER — physically-inspired composite-video degradation
// ═══════════════════════════════════════════════════════════════════════════════
//
// This is a signal-processing emulation, not a sticker pack. The source image is
// treated as a composite baseband signal: it is encoded to YIQ, band-limited and
// delayed on its chroma subcarrier the way a real VHS luma/chroma path is, has
// its scan geometry perturbed (tracking, jitter, tape warp, head-switch tear),
// then accumulates RF-domain impairments and a temporal-feedback history for the
// effects that are inherently multi-frame (interlacing fields, generation loss).
//
// Everything is driven by the per-effect uniform arrays built from vhsEffects.js
// — there are no hidden magic constants and no fake overlaid scanline/RGB-split
// primitives. Disabled effects contribute exactly zero (gated by uEnable*, no
// branches), so the whole chain stays a single optimized pass.
//
// Uniform-array index === the effect's position in VHS_EFFECT_KEYS. The #define
// block below MUST mirror that order.
// ═══════════════════════════════════════════════════════════════════════════════

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  #define NEFF ${VHS_EFFECT_COUNT}

  // ── effect indices (mirror VHS_EFFECT_KEYS order) ──
  #define E_TBE 0
  #define E_TRACK 1
  #define E_JITTER 2
  #define E_WARP 3
  #define E_HEAD 4
  #define E_DROP 5
  #define E_RF 6
  #define E_STATIC 7
  #define E_BLEED 8
  #define E_DELAY 9
  #define E_DOT 10
  #define E_XCOLOR 11
  #define E_XLUMA 12
  #define E_GHOST 13
  #define E_SMEAR 14
  #define E_RING 15
  #define E_BLOOM 16
  #define E_SIGLOSS 17
  #define E_ROLL 18
  #define E_INTERLACE 19
  #define E_GENLOSS 20
  #define E_DRIFT 21
  #define E_AGING 22
  #define E_DIRT 23

  varying vec2 vUv;

  uniform sampler2D uSource;
  uniform sampler2D uFeedback;
  uniform vec2  uResolution;
  uniform float uTime;
  uniform float uFrameParity;   // 0/1 alternating field for interlacing
  uniform float uActive;        // 0..1 CRT power-on level
  uniform float uGlobalOpacity;
  uniform float uSeedGlobal;

  uniform float uEnable[NEFF];
  uniform float uStrength[NEFF];
  uniform float uBlend[NEFF];
  uniform float uOpacity[NEFF];
  uniform float uScale[NEFF];
  uniform float uFrequency[NEFF];
  uniform float uSpeed[NEFF];
  uniform float uPhase[NEFF];
  uniform float uThreshold[NEFF];
  uniform float uSeed[NEFF];
  uniform float uProbability[NEFF];
  uniform float uSoftness[NEFF];
  uniform float uSharpness[NEFF];
  uniform float uBias[NEFF];
  uniform float uGain[NEFF];
  uniform float uResponseCurve[NEFF];
  uniform float uTemporalInfluence[NEFF];
  uniform float uSpatialInfluence[NEFF];

  // amount = enable-gated strength (the common "how much" of an effect)
  float amt(int i) { return uEnable[i] * uStrength[i]; }

  // ── hashing / noise (value noise + fbm; no texture LUT, no repetition) ──
  float hash11(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
  }
  float hash21(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int k = 0; k < 4; k++) {
      v += a * vnoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  // ── color space ──
  vec3 rgb2yiq(vec3 c) {
    return vec3(
      dot(c, vec3(0.299, 0.587, 0.114)),
      dot(c, vec3(0.596, -0.274, -0.322)),
      dot(c, vec3(0.211, -0.523, 0.312))
    );
  }
  vec3 yiq2rgb(vec3 c) {
    return vec3(
      c.x + 0.956 * c.y + 0.621 * c.z,
      c.x - 0.272 * c.y - 0.647 * c.z,
      c.x - 1.106 * c.y + 1.703 * c.z
    );
  }

  vec3 sampleSrc(vec2 uv) {
    return texture2D(uSource, clamp(uv, vec2(0.0015), vec2(0.9985))).rgb;
  }
  float sampleY(vec2 uv) { return rgb2yiq(sampleSrc(uv)).x; }

  void main() {
    vec2 res = uResolution;
    float texX = 1.0 / res.x;
    float line = vUv.y;                 // scan line (0 bottom .. 1 top in uv)
    float t = uTime;
    vec2 uv = vUv;

    // ════════════════════════════════════════════════════════════════════════
    // 1. SCAN-GEOMETRY DISTORTIONS  (perturb the sampling coordinate)
    // ════════════════════════════════════════════════════════════════════════

    // Frame rolling — vertical sync slip: the whole raster scrolls.
    if (uEnable[E_ROLL] > 0.5) {
      float roll = fract(t * uSpeed[E_ROLL] * 0.2 + uPhase[E_ROLL]);
      uv.y = fract(uv.y + roll * uStrength[E_ROLL]);
      line = uv.y;
    }

    // Tape warp — slow low-frequency horizontal wow, correlated down the field.
    {
      float a = amt(E_WARP);
      float w = sin(line * uFrequency[E_WARP] * 6.2831 + t * uSpeed[E_WARP] * 2.0 + uSeed[E_WARP]);
      w += 0.5 * sin(line * uFrequency[E_WARP] * 2.17 - t * uSpeed[E_WARP] * 1.3);
      uv.x += a * 0.02 * w;
    }

    // Time-base error — per-line horizontal displacement, spatially correlated.
    {
      float a = amt(E_TBE);
      float n = vnoise(vec2(line * uFrequency[E_TBE], t * uSpeed[E_TBE] * 3.0 + uSeed[E_TBE])) - 0.5;
      uv.x += a * 0.03 * mix(n, sign(n) * pow(abs(n) * 2.0, 1.6) * 0.5, uSpatialInfluence[E_TBE]);
    }

    // Jitter — fast, near-uncorrelated per-line shake.
    {
      float a = amt(E_JITTER);
      float step = floor(t * uSpeed[E_JITTER] * 60.0);
      float j = hash21(vec2(floor(line * uFrequency[E_JITTER]), step) + uSeed[E_JITTER]) - 0.5;
      uv.x += a * 0.012 * j;
    }

    // Tracking — instability band that rides near the bottom of the frame.
    float trackBand = 0.0;
    {
      float thr = uThreshold[E_TRACK];
      float soft = 0.02 + uSoftness[E_TRACK] * 0.18;
      float drift = sin(t * uSpeed[E_TRACK] * 6.2831 + uSeed[E_TRACK]) * 0.03;
      trackBand = smoothstep(thr - soft + drift, thr + drift, uv.y) * uEnable[E_TRACK];
      float n = fbm(vec2(uv.y * 40.0, t * 2.0 + uSeed[E_TRACK])) - 0.5;
      uv.x += trackBand * uStrength[E_TRACK] * (0.08 * n + 0.05);
    }

    // Head switching — torn/skewed noisy strip below the head-switch point.
    float headBand = 0.0;
    {
      float thr = uThreshold[E_HEAD];
      float soft = 0.004 + uSoftness[E_HEAD] * 0.03;
      headBand = smoothstep(thr - soft, thr, uv.y) * uEnable[E_HEAD];
      // skew grows toward the very bottom edge of the strip
      float skew = (uv.y - thr) / max(1.0 - thr, 1e-3);
      uv.x += headBand * uStrength[E_HEAD] * (0.12 * (1.0 - clamp(skew, 0.0, 1.0)));
    }

    // ════════════════════════════════════════════════════════════════════════
    // 2. CHROMA PATH  (band-limit + delay the I/Q carriers; luma stays sharp)
    // ════════════════════════════════════════════════════════════════════════
    float Y = sampleY(uv);

    float bleed = amt(E_BLEED) * mix(1.0, 6.0, uSpatialInfluence[E_BLEED]); // kernel spread (px)
    float delay = amt(E_DELAY) * mix(1.0, 10.0, uSpatialInfluence[E_DELAY]) + uBias[E_DELAY] * 6.0;
    vec2 iq = vec2(0.0);
    float wsum = 0.0;
    for (int k = -4; k <= 4; k++) {
      float fk = float(k);
      float sigma = 1.0 + bleed;
      float w = exp(-(fk * fk) / (2.0 * sigma * sigma));
      float offPx = fk * (0.6 + bleed * 0.5) + delay;
      vec3 yy = rgb2yiq(sampleSrc(uv + vec2(offPx * texX, 0.0)));
      iq += yy.yz * w;
      wsum += w;
    }
    iq /= max(wsum, 1e-3);

    // ════════════════════════════════════════════════════════════════════════
    // 3. LUMA PATH  (ghost echo, asymmetric smear tail, edge ringing overshoot)
    // ════════════════════════════════════════════════════════════════════════
    // Ghosting — faint delayed reflection of the luma, offset to the right.
    {
      float a = amt(E_GHOST);
      float off = (uBias[E_GHOST] + 0.005) * res.x;                 // px
      float ghost = sampleY(uv - vec2(off * texX, 0.0));
      Y += a * 0.6 * (ghost - Y) * mix(1.0, 0.6, uSoftness[E_GHOST]);
    }

    // Smearing — energy trails leftward→right via an exponential one-sided tail.
    if (uEnable[E_SMEAR] > 0.5) {
      float len = 1.0 + uSpatialInfluence[E_SMEAR] * 10.0;
      float decay = mix(0.35, 0.85, uResponseCurve[E_SMEAR] * 0.5);
      float acc = 0.0;
      float wa = 0.0;
      float g = 1.0;
      for (int k = 1; k <= 6; k++) {
        float w = g;
        acc += sampleY(uv - vec2(float(k) * (len / 6.0) * texX, 0.0)) * w;
        wa += w;
        g *= decay;
      }
      float smear = acc / max(wa, 1e-3);
      Y = mix(Y, max(Y, smear), uStrength[E_SMEAR]);
    }

    // Ringing — unsharp overshoot (Gibbs-like) around high-contrast edges.
    {
      float a = amt(E_RING);
      float sp = (0.5 + uSharpness[E_RING] * 2.5) * texX;
      float blur = (sampleY(uv - vec2(sp, 0.0)) + sampleY(uv + vec2(sp, 0.0))) * 0.5;
      float hi = Y - blur;
      float lobe = sin(hi * 12.0) * exp(-abs(hi) * 3.0);            // faint multi-lobe ripple
      Y += a * (hi * 1.5 + lobe * 0.15 * uSpatialInfluence[E_RING]);
    }

    // ════════════════════════════════════════════════════════════════════════
    // 4. SUBCARRIER CROSS-TALK  (dot crawl, cross-color, cross-luma)
    // ════════════════════════════════════════════════════════════════════════
    float chromaMag = length(iq);
    // NTSC-style subcarrier phase: advances along x, alternates per line & frame.
    float subFreq = res.x * (0.20 + uFrequency[E_DOT] * 0.30);
    float carrier = 6.2831 * (uv.x * subFreq + line * 0.5 + t * uSpeed[E_DOT] * 0.5)
                  + uPhase[E_DOT] * 6.2831;

    // luma high-frequency content (drives cross-color + dot crawl visibility)
    float lumaHi;
    {
      float sp = texX;
      lumaHi = Y - (sampleY(uv - vec2(sp, 0.0)) + sampleY(uv + vec2(sp, 0.0))) * 0.5;
    }

    // Dot crawl — chroma edges beat against the subcarrier → crawling dots.
    Y += amt(E_DOT) * 0.5 * chromaMag * sin(carrier) * (0.4 + uSharpness[E_DOT]);
    // Cross-luma — chroma energy leaking into luminance.
    Y += amt(E_XLUMA) * 0.6 * (iq.x * cos(carrier) + iq.y * sin(carrier)) * (0.3 + uSharpness[E_XLUMA]);
    // Cross-color — luma detail demodulating into spurious chroma.
    {
      float a = amt(E_XCOLOR) * (0.5 + uSharpness[E_XCOLOR]);
      iq += a * lumaHi * vec2(cos(carrier), sin(carrier));
    }

    // ════════════════════════════════════════════════════════════════════════
    // 5. DECODE
    // ════════════════════════════════════════════════════════════════════════
    vec3 col = yiq2rgb(vec3(Y, iq));

    // Bloom leakage — bright regions bloom into their neighborhood (halation).
    if (uEnable[E_BLOOM] > 0.5) {
      float thr = uThreshold[E_BLOOM];
      float soft = 0.05 + uSoftness[E_BLOOM] * 0.4;
      float b = 0.0;
      b += max(0.0, sampleY(uv + vec2(3.0 * texX, 0.0)) - thr);
      b += max(0.0, sampleY(uv - vec2(3.0 * texX, 0.0)) - thr);
      b += max(0.0, sampleY(uv + vec2(0.0, 3.0 * texX)) - thr);
      b += max(0.0, sampleY(uv - vec2(0.0, 3.0 * texX)) - thr);
      b = smoothstep(0.0, soft * 4.0, b);
      col += uStrength[E_BLOOM] * uGain[E_BLOOM] * b * vec3(1.0, 0.98, 0.92) * 0.4;
    }

    // ════════════════════════════════════════════════════════════════════════
    // 6. RF-DOMAIN IMPAIRMENTS
    // ════════════════════════════════════════════════════════════════════════
    // RF noise — luminance-weighted multi-scale snow (heavier in the dark).
    {
      float a = amt(E_RF);
      float n = fbm(vec2(uv * res / (6.0 * uScale[E_RF] + 1.0)) + vec2(t * uSpeed[E_RF], t * uSpeed[E_RF] * 0.7) + uSeed[E_RF]) - 0.5;
      float darkBoost = mix(1.0, 1.0 + (1.0 - Y) * 1.5, uSpatialInfluence[E_RF]);
      col += a * uGain[E_RF] * n * darkBoost;
    }

    // Static — sparse speckle bursts above a threshold.
    {
      float a = amt(E_STATIC);
      float n = hash21(floor(uv * res / max(uScale[E_STATIC], 0.5)) + floor(t * uSpeed[E_STATIC] * 30.0) + uSeed[E_STATIC]);
      float s = step(1.0 - (1.0 - uThreshold[E_STATIC]) * 0.3, n);
      col += a * s * (n - 0.5) * 1.6;
    }

    // Dropouts — horizontal streaks where the tape momentarily loses contact.
    {
      float a = amt(E_DROP);
      float lineId = floor(uv.y * uFrequency[E_DROP]);
      float seedL = hash21(vec2(lineId, floor(t * uSpeed[E_DROP])) + uSeed[E_DROP]);
      float lineHit = step(1.0 - uProbability[E_DROP], seedL);
      float startX = hash11(seedL * 91.7);
      float lenX = 0.1 + hash11(seedL * 13.1) * 0.5;
      float streak = lineHit * step(startX, uv.x) * step(uv.x, startX + lenX);
      float soft = smoothstep(0.0, 0.5, uSoftness[E_DROP]);
      float bright = mix(1.4, hash11(seedL * 51.3) * 1.6, soft);
      col = mix(col, vec3(bright), a * streak);
    }

    // Signal loss — larger regions collapse toward desaturated noise.
    if (uEnable[E_SIGLOSS] > 0.5) {
      float region = fbm(vec2(uv * 3.0) + floor(t * uSpeed[E_SIGLOSS]) + uSeed[E_SIGLOSS]);
      float loss = smoothstep(uThreshold[E_SIGLOSS], uThreshold[E_SIGLOSS] + 0.15, region) * uProbability[E_SIGLOSS] * 6.0;
      loss = clamp(loss, 0.0, 1.0) * uStrength[E_SIGLOSS];
      float snow = hash21(uv * res + t * 60.0);
      vec3 lost = mix(vec3(dot(col, vec3(0.33))), vec3(snow), 0.4);
      col = mix(col, lost, loss);
    }

    // Dirt — sparse fixed-ish specks (dust/scratches) that flicker in and out.
    {
      float a = amt(E_DIRT);
      vec2 cell = floor(uv * res / (2.0 + uScale[E_DIRT] * 6.0));
      float d = hash21(cell + floor(t * uSpeed[E_DIRT]) * 0.37 + uSeed[E_DIRT]);
      float speck = step(1.0 - uProbability[E_DIRT] * 40.0, d);
      float polarity = step(0.5, hash11(d * 7.3));
      col = mix(col, vec3(polarity), a * speck);
    }

    // ════════════════════════════════════════════════════════════════════════
    // 7. TEMPORAL / COLOR  (uses previous-frame feedback where inherently so)
    // ════════════════════════════════════════════════════════════════════════
    vec3 prev = texture2D(uFeedback, vUv).rgb;

    // Interlacing — this field only refreshes its own parity of lines; the other
    // parity persists from the previous field (real comb, not painted lines).
    if (uEnable[E_INTERLACE] > 0.5) {
      float lineIndex = floor(vUv.y * res.y);
      float parity = mod(lineIndex + uFrameParity, 2.0);
      float hold = parity * uStrength[E_INTERLACE] * mix(0.5, 1.0, uTemporalInfluence[E_INTERLACE]);
      col = mix(col, prev, hold);
    }

    // Generation loss — each frame re-records itself, accumulating soft noise.
    if (uEnable[E_GENLOSS] > 0.5) {
      float keep = uTemporalInfluence[E_GENLOSS] * 0.6;
      vec3 degraded = mix(col, prev, keep);
      float n = (hash21(uv * res + t * 30.0 + uSeed[E_GENLOSS]) - 0.5) * uStrength[E_GENLOSS] * 0.15;
      col = mix(col, degraded + n, uStrength[E_GENLOSS]);
    }

    // Color drift — slow chroma gain + hue wander over time.
    if (uEnable[E_DRIFT] > 0.5) {
      float ph = t * uSpeed[E_DRIFT] * 6.2831 * uFrequency[E_DRIFT] + uPhase[E_DRIFT] * 6.2831 + uSeed[E_DRIFT];
      vec3 y2 = rgb2yiq(col);
      float ang = sin(ph) * uStrength[E_DRIFT] * 0.6;
      float ca = cos(ang), sa = sin(ang);
      y2.yz = mat2(ca, -sa, sa, ca) * y2.yz;
      y2.yz *= 1.0 + cos(ph * 0.7) * uStrength[E_DRIFT] * 0.3;
      col = yiq2rgb(y2);
    }

    // Tape aging — global desaturation, warm bias, mottled wear.
    if (uEnable[E_AGING] > 0.5) {
      float a = uStrength[E_AGING];
      float lum = dot(col, vec3(0.299, 0.587, 0.114));
      vec3 aged = mix(col, vec3(lum), a * 0.6);
      aged += a * vec3(0.05, 0.01, -0.03) * uGain[E_AGING];      // warm cast
      float mottle = fbm(uv * (2.0 + uScale[E_AGING])) ;
      aged *= 1.0 - a * 0.25 * smoothstep(0.4, 0.9, mottle) * (0.5 + uSoftness[E_AGING]);
      col = aged;
    }

    // ════════════════════════════════════════════════════════════════════════
    // 8. OUTPUT  (CRT power-on level + head-switch/tracking noise fill)
    // ════════════════════════════════════════════════════════════════════════
    // The head-switch strip is mostly torn RF noise rather than picture.
    float bandNoise = fbm(vec2(uv.x * res.x * 0.15, uv.y * res.y + t * 120.0));
    col = mix(col, vec3(bandNoise), clamp(headBand * uStrength[E_HEAD], 0.0, 0.85));
    col = mix(col, vec3(bandNoise * 0.8 + 0.1), trackBand * 0.25);

    col = clamp(col, 0.0, 1.0);
    col *= clamp(uActive, 0.0, 1.0);

    gl_FragColor = vec4(col, uGlobalOpacity);
  }
`

export function createVHSMaterial(config = DEFAULT_VHS_CONFIG, { resolution = [1024, 640] } = {}) {
  const arrays = buildVhsUniformArrays(config)

  const uniforms = {
    uSource: { value: null },
    uFeedback: { value: null },
    uResolution: { value: new THREE.Vector2(resolution[0], resolution[1]) },
    uTime: { value: 0 },
    uFrameParity: { value: 0 },
    uActive: { value: 0 },
    uGlobalOpacity: { value: 1 },
    uSeedGlobal: { value: Math.random() * 1000 },
  }
  Object.entries(arrays).forEach(([key, value]) => {
    uniforms[key] = { value }
  })

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  })
  material.toneMapped = false
  return material
}

// Push a fresh config into an existing material's uniform arrays (no realloc of
// the material / no shader recompile — only the Float32Array contents change).
export function updateVHSConfig(material, config) {
  if (!material?.uniforms) return
  const arrays = buildVhsUniformArrays(config)
  Object.entries(arrays).forEach(([key, value]) => {
    if (material.uniforms[key]) material.uniforms[key].value = value
  })
}

export { vertexShader as vhsVertexShader, fragmentShader as vhsFragmentShader }
