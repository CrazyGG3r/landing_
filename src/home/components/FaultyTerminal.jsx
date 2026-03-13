import { useCallback, useEffect, useMemo, useRef } from 'react';

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision mediump float;

varying vec2 vUv;

uniform float iTime;
uniform vec3  iResolution;
uniform float uScale;

uniform vec2  uGridMul;
uniform float uDigitSize;
uniform float uScanlineIntensity;
uniform float uGlitchAmount;
uniform float uFlickerAmount;
uniform float uNoiseAmp;
uniform float uChromaticAberration;
uniform float uDither;
uniform float uCurvature;
uniform vec3  uTint;
uniform vec2  uMouse;
uniform float uMouseStrength;
uniform float uUseMouse;
uniform float uPageLoadProgress;
uniform float uUsePageLoadAnimation;
uniform float uBrightness;

uniform sampler2D uImage;
uniform float     uUseImage;
uniform float     uImageOpacity;

float time;

float hash21(vec2 p){
  p = fract(p * 234.56);
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(vec2 p){
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2;
}

mat2 rotate(float angle){
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float fbm(vec2 p){
  p *= 1.1;
  float f = 0.0;
  float amp = 0.5 * uNoiseAmp;

  mat2 modify0 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify0 * p * 2.0;
  amp *= 0.454545;

  mat2 modify1 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify1 * p * 2.0;
  amp *= 0.454545;

  mat2 modify2 = rotate(time * 0.08);
  f += amp * noise(p);

  return f;
}

float pattern(vec2 p, out vec2 q, out vec2 r){
  vec2 offset1 = vec2(1.0);
  vec2 offset0 = vec2(0.0);
  mat2 rot01 = rotate(0.1 * time);
  mat2 rot1 = rotate(0.1);

  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));
  return fbm(p + r);
}

float bgGrid(vec2 p){
    vec2 grid = uGridMul * 15.0;
    p = p * grid;
    p = fract(p);
    p *= uDigitSize;

    float px5 = p.x * 5.0;
    float py5 = (1.0 - p.y) * 5.0;
    float x = fract(px5);
    float y = fract(py5);

    float i = floor(py5) - 2.0;
    float j = floor(px5) - 2.0;
    float nSquare = max(abs(i), abs(j));
    nSquare = nSquare * nSquare;
    float f = nSquare * 0.0625;

    float isOn = step(0.1, 0.6 - f);
    float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);

    return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness * 0.2;
}

float digit(vec2 p){
    vec2 grid = uGridMul * 15.0;
    vec2 s = floor(p * grid) / grid;
    p = p * grid;
    vec2 q, r;
    float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;

    if(uUseMouse > 0.5){
        vec2 mouseWorld = uMouse * uScale;
        float distToMouse = distance(s, mouseWorld);
        float mouseInfluence = exp(-distToMouse * 8.0) * uMouseStrength * 10.0;
        intensity += mouseInfluence;
        float ripple = sin(distToMouse * 20.0 - iTime * 5.0) * 0.1 * mouseInfluence;
        intensity += ripple;
    }

    if(uUsePageLoadAnimation > 0.5){
        float cellRandom = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);
        float cellDelay = cellRandom * 0.8;
        float cellProgress = clamp((uPageLoadProgress - cellDelay) / 0.2, 0.0, 1.0);
        float fadeAlpha = smoothstep(0.0, 1.0, cellProgress);
        intensity *= fadeAlpha;
    }

    p = fract(p);
    p *= uDigitSize;

    float px5 = p.x * 5.0;
    float py5 = (1.0 - p.y) * 5.0;
    float x = fract(px5);
    float y = fract(py5);

    float i = floor(py5) - 2.0;
    float j = floor(px5) - 2.0;

    float nCircle  = i * i + j * j;
    float nDiamond = (abs(i) + abs(j)) * (abs(i) + abs(j));
    float nSquare  = max(abs(i), abs(j));
    nSquare        = nSquare * nSquare;

    float cellPhase  = fract(sin(dot(s, vec2(127.1, 311.7))) * 43758.5453) * 3.0;
    float shapeCycle = mod(iTime * 0.3 + cellPhase, 3.0);
    float n;
    if(shapeCycle < 1.0){
      n = mix(nCircle,  nDiamond, smoothstep(0.0, 1.0, shapeCycle));
    } else if(shapeCycle < 2.0){
      n = mix(nDiamond, nSquare,  smoothstep(0.0, 1.0, shapeCycle - 1.0));
    } else {
      n = mix(nSquare,  nCircle,  smoothstep(0.0, 1.0, shapeCycle - 2.0));
    }

    float f = n * 0.0625;

    float isOn = step(0.1, intensity - f);
    float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);

    return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;
}

float onOff(float a, float b, float c){
  return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;
}

float displace(vec2 look){
    float y = look.y - mod(iTime * 0.25, 1.0);
    float window = 1.0 / (1.0 + 50.0 * y * y);
    return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;
}

vec3 getColor(vec2 p){
    float bar = step(mod(p.y + time * 20.0, 1.0), 0.2) * 0.4 + 1.0;
    bar *= uScanlineIntensity;

    float displacement = displace(p);
    p.x += displacement;

    if(uGlitchAmount != 1.0){
      float extra = displacement * (uGlitchAmount - 1.0);
      p.x += extra;
    }

    float middle = digit(p);

    const float off = 0.002;
    float sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +
                digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +
                digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));

    float bg = bgGrid(p);
    vec3 baseColor = vec3(bg) + vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;
    return baseColor;
}

vec2 barrel(vec2 uv){
  vec2 c = uv * 2.0 - 1.0;
  float r2 = dot(c, c);
  c *= 1.0 + uCurvature * r2;
  return c * 0.5 + 0.5;
}

void main(){
    time = iTime * 0.333333;
    vec2 uv = vUv;

    if(uCurvature != 0.0){
      uv = barrel(uv);
    }

    vec2 p = uv * uScale;
    vec3 col = getColor(p);

    if(uChromaticAberration != 0.0){
      vec2 ca = vec2(uChromaticAberration) / iResolution.xy;
      vec3 layer1 = getColor(p + ca) * vec3(1.0, 0.0, 0.0);
      vec3 layer2 = getColor(p)      * vec3(0.0, 1.0, 0.0);
      vec3 layer3 = getColor(p - ca) * vec3(0.0, 0.0, 1.0);
      col += (layer1 + layer2 + layer3) * 0.35;
    }

    if(uUseImage > 0.5){
      vec3 imgCol = texture2D(uImage, uv).rgb;
      col = col + imgCol * uImageOpacity;
    }

    col *= uTint;
    col *= uBrightness;

    if(uDither > 0.0){
      float rnd = hash21(gl_FragCoord.xy);
      col += (rnd - 0.5) * (uDither * 0.003922);
    }

    gl_FragColor = vec4(col, 1.0);
}
`;

function hexToRgb(hex) {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const num = parseInt(h, 16);
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
}

function createShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

function createProgram(gl, vert, frag) {
  const p = gl.createProgram();
  gl.attachShader(p, createShader(gl, gl.VERTEX_SHADER, vert));
  gl.attachShader(p, createShader(gl, gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(p);
  return p;
}

function loadTexture(gl, url) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 20, 147, 255]));

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  };
  img.onerror = () => console.warn('Image failed to load:', url);
  img.src = url;
  return tex;
}

export default function FaultyTerminal({
  scale = 2.3,
  gridMul = [2, 1],
  digitSize = 1.1,
  timeScale = 0.5,
  pause = false,
  scanlineIntensity = 0.5,
  glitchAmount = 1,
  flickerAmount = 1,
  noiseAmp = 1,
  chromaticAberration = 1.5,
  dither = 0,
  curvature = 0.1,
  tint = '#eef0f2',
  mouseReact = true,
  mouseStrength = 0.5,
  dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2),
  pageLoadAnimation = true,
  brightness = 0.6,
  imageUrl = null,
  imageOpacity = 0.35,
  style,
}) {
  const containerRef = useRef(null);
  const glRef = useRef(null);
  const progRef = useRef(null);
  const uniRef = useRef({});
  const texRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const frozenTimeRef = useRef(0);
  const rafRef = useRef(0);
  const loadStartRef = useRef(0);
  const timeOffsetRef = useRef(Math.random() * 100);

  const tintVec = useMemo(() => hexToRgb(tint), [tint]);
  const ditherVal = useMemo(() => (typeof dither === 'boolean' ? (dither ? 1 : 0) : dither), [dither]);

  const handleMouseMove = useCallback(e => {
    const ctn = containerRef.current;
    if (!ctn) return;
    const rect = ctn.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: 1 - (e.clientY - rect.top) / rect.height,
    };
  }, []);

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    ctn.appendChild(canvas);

    const gl = canvas.getContext('webgl');
    if (!gl) return undefined;
    glRef.current = gl;
    gl.clearColor(0, 0, 0, 1);

    const prog = createProgram(gl, vertexShader, fragmentShader);
    progRef.current = prog;
    gl.useProgram(prog);

    const positions = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    const uvLoc = gl.getAttribLocation(prog, 'uv');
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

    const uni = {};
    const names = [
      'iTime', 'iResolution', 'uScale', 'uGridMul', 'uDigitSize', 'uScanlineIntensity',
      'uGlitchAmount', 'uFlickerAmount', 'uNoiseAmp', 'uChromaticAberration', 'uDither',
      'uCurvature', 'uTint', 'uMouse', 'uMouseStrength', 'uUseMouse', 'uPageLoadProgress',
      'uUsePageLoadAnimation', 'uBrightness', 'uImage', 'uUseImage', 'uImageOpacity',
    ];
    names.forEach(n => { uni[n] = gl.getUniformLocation(prog, n); });
    uniRef.current = uni;

    const proxyUrl = imageUrl
      ? `https://corsproxy.io/?${encodeURIComponent(imageUrl)}`
      : null;
    const tex = proxyUrl ? loadTexture(gl, proxyUrl) : null;
    texRef.current = tex;

    function resize() {
      const w = ctn.offsetWidth;
      const h = ctn.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(prog);
      gl.uniform1f(uni.uScale, scale);
      gl.uniform2fv(uni.uGridMul, gridMul);
      gl.uniform1f(uni.uDigitSize, digitSize);
      gl.uniform1f(uni.uScanlineIntensity, scanlineIntensity);
      gl.uniform1f(uni.uGlitchAmount, glitchAmount);
      gl.uniform1f(uni.uFlickerAmount, flickerAmount);
      gl.uniform1f(uni.uNoiseAmp, noiseAmp);
      gl.uniform1f(uni.uChromaticAberration, chromaticAberration);
      gl.uniform1f(uni.uDither, ditherVal);
      gl.uniform1f(uni.uCurvature, curvature);
      gl.uniform3f(uni.uTint, tintVec[0], tintVec[1], tintVec[2]);
      gl.uniform1f(uni.uMouseStrength, mouseStrength);
      gl.uniform1f(uni.uUseMouse, mouseReact ? 1 : 0);
      gl.uniform1f(uni.uPageLoadProgress, pageLoadAnimation ? 0 : 1);
      gl.uniform1f(uni.uUsePageLoadAnimation, pageLoadAnimation ? 1 : 0);
      gl.uniform1f(uni.uBrightness, brightness);
      gl.uniform1f(uni.uUseImage, tex ? 1 : 0);
      gl.uniform1f(uni.uImageOpacity, imageOpacity);
      gl.uniform1i(uni.uImage, 0);
      gl.uniform3f(uni.iResolution, canvas.width, canvas.height, canvas.width / canvas.height);
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(ctn);
    resize();

    const update = t => {
      rafRef.current = requestAnimationFrame(update);
      if (pageLoadAnimation && loadStartRef.current === 0) loadStartRef.current = t;

      gl.useProgram(prog);

      if (!pause) {
        const elapsed = (t * 0.001 + timeOffsetRef.current) * timeScale;
        gl.uniform1f(uni.iTime, elapsed);
        frozenTimeRef.current = elapsed;
      } else {
        gl.uniform1f(uni.iTime, frozenTimeRef.current);
      }

      if (pageLoadAnimation && loadStartRef.current > 0) {
        const p_ = Math.min((t - loadStartRef.current) / 2000, 1);
        gl.uniform1f(uni.uPageLoadProgress, p_);
      }

      if (mouseReact) {
        const sm = smoothMouseRef.current;
        const m = mouseRef.current;
        sm.x += (m.x - sm.x) * 0.08;
        sm.y += (m.y - sm.y) * 0.08;
        gl.uniform2f(uni.uMouse, sm.x, sm.y);
      }

      if (tex) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    rafRef.current = requestAnimationFrame(update);

    if (mouseReact) ctn.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      if (mouseReact) ctn.removeEventListener('mousemove', handleMouseMove);
      if (canvas.parentElement === ctn) ctn.removeChild(canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      loadStartRef.current = 0;
      timeOffsetRef.current = Math.random() * 100;
    };
  }, [
    dpr, pause, timeScale, scale, gridMul, digitSize, scanlineIntensity,
    glitchAmount, flickerAmount, noiseAmp, chromaticAberration, ditherVal,
    curvature, tintVec, mouseReact, mouseStrength, pageLoadAnimation,
    brightness, imageUrl, imageOpacity, handleMouseMove,
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#000',
        ...style,
      }}
    />
  );
}
