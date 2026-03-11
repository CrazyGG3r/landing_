import { DITHER_NOISE_AMOUNT, GHOST_GLARE_CHROMA, GHOST_GLARE_GHOSTS, GHOST_GLARE_INTENSITY, GHOST_GLARE_SOFTNESS, GHOST_GLARE_SPREAD, GHOST_GLARE_THRESHOLD, GHOST_GLARE_TINT } from '../core/constants';

export const GhostGlareShader = {
  uniforms: {
    tDiffuse: { value: null },
    uIntensity: { value: GHOST_GLARE_INTENSITY },
    uThreshold: { value: GHOST_GLARE_THRESHOLD },
    uSoftness: { value: GHOST_GLARE_SOFTNESS },
    uGhosts: { value: GHOST_GLARE_GHOSTS },
    uSpread: { value: GHOST_GLARE_SPREAD },
    uChroma: { value: GHOST_GLARE_CHROMA },
    uTint: { value: GHOST_GLARE_TINT },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uIntensity;
    uniform float uThreshold;
    uniform float uSoftness;
    uniform float uGhosts;
    uniform float uSpread;
    uniform float uChroma;
    uniform vec3  uTint;
    varying vec2 vUv;

    vec3 sampleTex(vec2 uv, float chroma) {
      vec2 dir = normalize(uv - 0.5);
      vec2 off = dir * chroma;
      float r = texture2D(tDiffuse, uv + off).r;
      float g = texture2D(tDiffuse, uv).g;
      float b = texture2D(tDiffuse, uv - off).b;
      return vec3(r, g, b);
    }

    void main() {
      vec3 base = texture2D(tDiffuse, vUv).rgb;
      float luma = dot(base, vec3(0.2126, 0.7152, 0.0722));
      float gate = smoothstep(uThreshold, uThreshold + uSoftness, luma);

      vec2 center = vec2(0.5);
      vec2 dir = vUv - center;
      vec3 glare = vec3(0.0);

      for (int i = 1; i <= 8; i++) {
        if (float(i) > uGhosts) break;
        float t = float(i) / max(uGhosts, 1.0);
        vec2 gUv = center + dir * (1.0 + t * uSpread);
        vec3 col = sampleTex(gUv, uChroma * t);
        float w = (1.0 - t) * 0.85 + 0.15;
        glare += col * w;
      }

      glare *= gate * uIntensity;
      glare *= uTint;

      gl_FragColor = vec4(base + glare, 1.0);
    }
  `,
};

export const DitherNoiseShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uAmount: { value: DITHER_NOISE_AMOUNT },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uAmount;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898,78.233)) + uTime) * 43758.5453); }
    void main() {
      vec4 col = texture2D(tDiffuse, vUv);
      float n = hash(gl_FragCoord.xy);
      col.rgb += (n - 0.5) * uAmount;
      gl_FragColor = col;
    }
  `,
};
