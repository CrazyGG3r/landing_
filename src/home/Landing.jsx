/**
 * Landing.jsx
 * ─────────────────────────────────────────────────────────────────
 * Drop-in cinematic scene for Create React App.
 *
 * Dependencies (already in CRA):  react, react-dom
 * Extra peer dep:                  three
 *   → npm install three
 *
 * Usage:
 *   import Landing from './Landing';
 *   <Landing />          // full-screen, self-contained
 *
 * The component automatically loads Suzanne.glb from src/assets/models/
 * ─────────────────────────────────────────────────────────────────
 */

import {
  useEffect,
  useRef,
  useCallback,
  useState,
  createContext,
  useContext,
  memo,
  forwardRef,
} from 'react';
import * as THREE from 'three';

// Import your model directly
// Use URL import syntax - this tells Vite it's an asset
import suzanneModel from '../assets/models/Suzanne.glb?url';

// Tweak this to scale your imported model
const MODEL_SCALE = 2.0;
const TEXT_MIN_OPACITY = 0.05;
const TEXT_SHADOW_INTENSITY = 0.35;
const FXAA_ENABLED = true;
const TEXT_BASE_OPACITY = 0.05;
const TEXT_SHADOW = '0 18px 38px rgba(0,0,0,.45)';
// Material tweaks
const MODEL_ROUGHNESS = 0;
const MODEL_FRESNEL = 3.0;
// Post FX tweaks
const BLOOM_STRENGTH = 0.3;
const BLOOM_RADIUS = 0.35;
const BLOOM_THRESHOLD = 0.12;
const CHROMA_SHIFT = 0.0015;
const LENS_BLUR = 0.15;
const DOF_FOCUS = 2;
const DOF_APERTURE = 0.00006;
const DOF_MAX_BLUR = 0.01;
const TEXT_LIGHT_FALLOFF = 1;
const TEXT_GLOW = 1;

// ─────────────────────────────────────────────────────────────────
//  Mouse Context  (single shared listener for both layers)
// ─────────────────────────────────────────────────────────────────
const MouseContext = createContext({ x: 0, y: 0 });

function MouseProvider({ children }) {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = e => {
      mouseRef.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseRef.current.y = -((e.clientY / window.innerHeight - 0.5) * 2);
    };
    const touchHandler = e => {
      if (!e.touches || !e.touches[0]) return;
      const t = e.touches[0];
      mouseRef.current.x =  (t.clientX / window.innerWidth  - 0.5) * 2;
      mouseRef.current.y = -((t.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    window.addEventListener('touchmove', touchHandler, { passive: true });
    window.addEventListener('touchstart', touchHandler, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handler);
      window.removeEventListener('touchmove', touchHandler);
      window.removeEventListener('touchstart', touchHandler);
    };
  }, []);

  return (
    <MouseContext.Provider value={mouseRef}>
      {children}
    </MouseContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────
//  BacklitText — reveal text only where "light" passes behind it
// ─────────────────────────────────────────────────────────────────
const BacklitText = memo(function BacklitText({ children, containerStyle, layerStyle }) {
  const ref = useRef(null);
  const mouseRef = useContext(MouseContext);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const loop = () => {
      const t = (performance.now() - start) / 1000;
      const mx = mouseRef.current?.x ?? 0;
      const my = mouseRef.current?.y ?? 0;

      const ox = Math.cos(t * 0.35) * 0.6;
      const oy = Math.sin(t * 0.27) * 0.45;
      const blend = 0.65;
      const lx = ((ox * (1 - blend) + mx * blend) * 0.5 + 0.5) * 100;
      const ly = ((oy * (1 - blend) + my * blend) * 0.5 + 0.5) * 100;

      if (ref.current) {
        ref.current.style.setProperty('--lx', `${lx}%`);
        ref.current.style.setProperty('--ly', `${ly}%`);
        ref.current.style.setProperty('--lg', `${TEXT_GLOW}`);
        ref.current.style.setProperty('--lf', `${TEXT_LIGHT_FALLOFF}`);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mouseRef]);

  const layoutStyle = {
    position:'absolute', inset:0,
    display:'flex', flexDirection:'column',
    alignItems:'center', justifyContent:'center', gap:16,
    pointerEvents:'none',
  };
  const baseShadow = Math.max(0, Math.min(1, TEXT_SHADOW_INTENSITY));
  const baseStyle = {
    ...layoutStyle,
    color:`rgba(255,255,255,${TEXT_MIN_OPACITY})`,
    textShadow:`0 14px 34px rgba(0,0,0,${0.55 * baseShadow})`,
  };
  const glowStyle = {
    ...layoutStyle,
    color:'rgba(255,255,255,.95)',
    mixBlendMode:'screen',
    filter:'drop-shadow(0 0 28px rgba(255,255,255,.35))',
    WebkitMaskImage:'radial-gradient(40vmax 40vmax at var(--lx) var(--ly), rgba(255,255,255,1) 0%, rgba(255,255,255,.6) calc(28% + var(--lg) * 12%), rgba(255,255,255,0) calc(55% + var(--lf) * 20%))',
    maskImage:'radial-gradient(40vmax 40vmax at var(--lx) var(--ly), rgba(255,255,255,1) 0%, rgba(255,255,255,.6) calc(28% + var(--lg) * 12%), rgba(255,255,255,0) calc(55% + var(--lf) * 20%))',
  };

  return (
    <div ref={ref} style={{ ...style, position:'absolute', inset:0 }}>
      <div style={baseStyle}>{children}</div>
      <div style={glowStyle}>{children}</div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────
//  SHADER SOURCES  (defined once at module scope — no re-creation)
// ─────────────────────────────────────────────────────────────────
const BacklitTextLayered = memo(function BacklitTextLayered({ children, style, containerStyle, layerStyle }) {
  const rawStyle = style || {};
  const resolvedLayer = layerStyle || rawStyle;
  const resolvedContainer = containerStyle || (() => {
    const c = { ...rawStyle };
    delete c.WebkitMaskImage;
    delete c.maskImage;
    delete c.filter;
    delete c.mixBlendMode;
    return c;
  })();
  const baseLayer = { ...resolvedLayer };
  delete baseLayer.WebkitMaskImage;
  delete baseLayer.maskImage;
  delete baseLayer.filter;
  delete baseLayer.mixBlendMode;
  return (
    <div style={resolvedContainer}>
      <div style={{
        ...baseLayer,
        opacity: TEXT_BASE_OPACITY,
        mixBlendMode: 'normal',
        textShadow: TEXT_SHADOW,
      }}>
        {children}
      </div>
      <div style={{
        ...resolvedLayer,
        mixBlendMode:'screen',
        filter:'drop-shadow(0 0 28px rgba(255,255,255,.35))',
        WebkitMaskImage:'radial-gradient(40vmax 40vmax at var(--lx) var(--ly), rgba(255,255,255,1) 0%, rgba(255,255,255,.6) calc(28% + var(--lg) * 12%), rgba(255,255,255,0) calc(55% + var(--lf) * 20%))',
        maskImage:'radial-gradient(40vmax 40vmax at var(--lx) var(--ly), rgba(255,255,255,1) 0%, rgba(255,255,255,.6) calc(28% + var(--lg) * 12%), rgba(255,255,255,0) calc(55% + var(--lf) * 20%))',
      }}>
        {children}
      </div>
    </div>
  );
});


/** ColorBends — exact ReactBits port */
// ─────────────────────────────────────────────────────────────────
//  SHADER SOURCES  (defined once at module scope — no re-creation)
// ─────────────────────────────────────────────────────────────────
const CB_VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){ vUv = aPos * .5 + .5; gl_Position = vec4(aPos, 0., 1.); }
`;

const CB_FRAG = `
precision highp float;
#define MC 8
uniform vec2  uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2  uRot;
uniform int   uColorCount;
uniform vec3  uColors[MC];
uniform int   uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2  uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
varying vec2 vUv;

void main(){
  float t = uTime * uSpeed;
  vec2 p  = vUv * 2.0 - 1.0;
  p      += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x*uRot.x - p.y*uRot.y, p.x*uRot.y + p.y*uRot.x);
  vec2 q  = vec2(rp.x*(uCanvas.x/uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2*dot(q,q);
  q += 0.2*cos(t) - 7.56;
  q += (uPointer - rp) * uMouseInfluence * 0.2;

  vec3 col = vec3(0.0); float a = 1.0;
  vec2 s = q; vec3 sumCol = vec3(0.0); float cover = 0.0;

  for(int i = 0; i < MC; ++i){
    if(i >= uColorCount) break;
    s -= 0.01;
    vec2 r  = sin(1.5*(s.yx*uFrequency) + 2.0*cos(s*uFrequency));
    float m0 = length(r + sin(5.0*r.y*uFrequency - 3.0*t + float(i))/4.0);
    float kB = clamp(uWarpStrength, 0.0, 1.0);
    float gain = 1.0 + max(uWarpStrength-1.0, 0.0);
    vec2 warped = s + (r-s)*kB*gain;
    float m1 = length(warped + sin(5.0*warped.y*uFrequency - 3.0*t + float(i))/4.0);
    float m  = mix(m0, m1, pow(kB, 0.3));
    float w  = 1.0 - exp(-6.0/exp(6.0*m));
    sumCol  += uColors[i] * w;
    cover    = max(cover, w);
  }
  col = clamp(sumCol, 0.0, 1.0);
  a   = (uTransparent > 0) ? cover : 1.0;

  if(uNoise > 0.0001){
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898,78.233)))*43758.5453);
    col = clamp(col + (n-.5)*uNoise, 0.0, 1.0);
  }
  gl_FragColor = vec4((uTransparent>0) ? col*a : col, a);
}
`;

/** Glass mesh vertex */
const GL_VERT = `
varying vec3 vNormal;
varying vec3 vViewPos;
varying vec3 vWorldPos;
varying vec2 vUv;
void main(){
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vec4 mv = viewMatrix * wp;
  vViewPos = -mv.xyz;
  vNormal  = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}
`;

/** Glass mesh fragment — frosted blur + caustics + silhouette rim */
const GL_FRAG = `
precision highp float;
uniform sampler2D uBuffer;
uniform vec2  uRes;
uniform float uTime;
uniform float uIOR;
uniform float uChroma;
uniform float uFrost;
uniform float uSmoke;
uniform float uRoughness;
uniform float uFresnel;
varying vec3 vNormal;
varying vec3 vViewPos;
varying vec3 vWorldPos;
varying vec2 vUv;

float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<6;i++){v+=a*noise(p);p*=2.1;a*=.48;}
  return v;
}
float caustic(vec2 uv, float t){
  vec2 p=uv*4.5; float c=0.;
  for(int i=0;i<4;i++){
    float fi=float(i);
    vec2 q=p+vec2(cos(t*.35+fi*1.9),sin(t*.28+fi*2.4))*.7;
    c+=.8/(abs(sin(q.x+sin(q.y+t*.25)))+.12);
  }
  return clamp(c*.09,0.,1.);
}

void main(){
  /* Poisson disk — 12 taps */
  vec2 disk[12];
  disk[0]=vec2(.000,.800); disk[1]=vec2(.469,.643);
  disk[2]=vec2(.800,.000); disk[3]=vec2(.643,-.469);
  disk[4]=vec2(.000,-.800);disk[5]=vec2(-.469,-.643);
  disk[6]=vec2(-.800,.000);disk[7]=vec2(-.643,.469);
  disk[8]=vec2(.300,.400); disk[9]=vec2(-.300,.400);
  disk[10]=vec2(.300,-.400);disk[11]=vec2(-.300,-.400);

  vec2 sc = gl_FragCoord.xy / uRes;
  vec3 N  = normalize(vNormal);
  vec3 V  = normalize(vViewPos);
  float eta = 1.0 / uIOR;
  float k   = max(1.0 - eta*eta*(1.0 - dot(N,V)*dot(N,V)), 0.0);
  vec3 refDir  = eta*(-V) - (eta*dot(N,V) + sqrt(k))*N;
  vec2 refShift = refDir.xy * 0.022;

  /* Frost noise */
  vec2 nuv = vUv*5.5 + uTime*.035;
  float frostA = fbm(nuv)*.7 + fbm(nuv*2.3+vec2(4.1,2.7))*.3;
  float jitter = frostA * uFrost;
  float rad    = 0.048 * jitter;

  /* 12-tap chromatic blur */
  vec3 sumR=vec3(0.),sumG=vec3(0.),sumB=vec3(0.);
  for(int i=0;i<12;i++){
    vec2 off = disk[i]*rad;
    float ca = uChroma*(float(i)*.055+.55);
    sumR += texture2D(uBuffer, sc+refShift+off*(1.+ca)).rgb;
    sumG += texture2D(uBuffer, sc+refShift+off        ).rgb;
    sumB += texture2D(uBuffer, sc+refShift+off*(1.-ca)).rgb;
  }
  vec3 frosted = vec3(
    (sumR.r+sumG.r+sumB.r)/36.,
    (sumR.g+sumG.g+sumB.g)/36.,
    (sumR.b+sumG.b+sumB.b)/36.);

  /* Smoke */
  vec2 suv = vWorldPos.xy*.75 + vec2(uTime*.055, uTime*.032);
  float sm = fbm(suv)*fbm(suv*1.6+vec2(2.1,3.7));
  vec3 smokeCol = mix(vec3(.38,.12,.72), vec3(.05,.02,.22), sm);
  frosted = mix(frosted, smokeCol, uSmoke*(.28+sm*.28));

  /* Caustics */
  float caust = caustic(vWorldPos.xy*.45+uTime*.04, uTime);
  float ct    = sin(uTime*.3)*.5+.5;
  vec3 causticTint = mix(vec3(1.,.15,.15), mix(vec3(.1,1.,.1),vec3(.1,.1,1.),ct), ct);
  frosted += causticTint * caust * .30;

  /* Fresnel + specular */
  float NdV     = max(dot(N,V), 0.0);
  float fresnel = pow(1.0-NdV, 4.2) * uFresnel;
  vec3 L1 = normalize(vec3(2.,4.,5.));
  vec3 L2 = normalize(vec3(-3.,-1.,3.));
  float spec1 = pow(max(dot(reflect(-L1,N),V),0.),120.)*.95;
  float spec2 = pow(max(dot(reflect(-L2,N),V),0.),18.)*.25;
  vec3 specCol = (vec3(.95,.9,1.)*spec1 + vec3(.7,.5,1.)*spec2) * (1.0 - clamp(uRoughness, 0.0, 1.0));

  /* Iridescent rim */
  float iri   = pow(1.0-NdV, 2.5);
  vec3 iriCol = mix(vec3(.2,.6,1.), vec3(1.,.2,.4), sin(iri*6.+uTime*.4)*.5+.5)*iri*.45;

  /* Base colour */
  vec3 col = mix(frosted, vec3(.88,.85,1.), .08) + specCol + iriCol;
  col += vec3(.55,.35,.9)*fresnel*.18;
  col += vec3(.5,.2,.9)*pow(max(1.-length(vUv-.5)*2.,0.),2.5)*.12;
  col = mix(col, frosted, clamp(uRoughness, 0.0, 1.0));

  /* Silhouette rim — tight band only at outermost edge */
  float rim    = smoothstep(.55, 1.0, pow(1.0-NdV, 9.0));
  float rs     = sin(uTime*.5)*.5+.5;
  vec3 rimCol  = mix(vec3(.4,.7,1.), vec3(1.,.25,.6), rs);
  col         += rimCol * rim * 1.8;

  float alpha  = clamp(mix(.78,.98,fresnel) + rim*.85, 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;

// ─────────────────────────────────────────────────────────────────
//  useResizeObserver  — fires callback on element resize
// ─────────────────────────────────────────────────────────────────
function useResizeObserver(ref, cb) {
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(cb);
    ro.observe(ref.current);
    cb();                           // initial call
    return () => ro.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ─────────────────────────────────────────────────────────────────
//  ColorBends  (raw WebGL — no Three.js overhead for the bg layer)
// ─────────────────────────────────────────────────────────────────
const ColorBendsGL = memo(forwardRef(function ColorBendsGL({
  colors     = ['#ff2929', '#00ff00', '#0000ff'],
  rotation   = 45,
  autoRotate = 1,
  speed      = 0.2,
  scale      = 1,
  frequency  = 1,
  warpStrength   = 0,
  mouseInfluence = 1,
  parallax   = 1,
  noise      = 1,
  transparent = true,
}, forwardedRef) {
  const canvasRef = useRef(null);
  const mouseRef  = useContext(MouseContext);
  const stateRef  = useRef(null);   // holds all WebGL handles
  const setCanvasNode = useCallback((node) => {
    canvasRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef && typeof forwardedRef === 'object') forwardedRef.current = node;
  }, [forwardedRef]);

  // Parse "#rrggbb" → [r,g,b] float
  const parseColors = useCallback(cols => {
    const out = [];
    for (let i = 0; i < 8; i++) {
      const h = (cols[i] || '#000000').replace('#', '');
      out.push(
        parseInt(h.slice(0,2),16)/255,
        parseInt(h.slice(2,4),16)/255,
        parseInt(h.slice(4,6),16)/255,
      );
    }
    return new Float32Array(out);
  }, []);

  // Init WebGL once
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });

    const mkShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER,   CB_VERT));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, CB_FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = n => gl.getUniformLocation(prog, n);
    const uniforms = {
      uCanvas: U('uCanvas'), uTime: U('uTime'), uRot: U('uRot'),
      uPointer: U('uPointer'), uColors: U('uColors'),
      uColorCount: U('uColorCount'), uTransparent: U('uTransparent'),
      uSpeed: U('uSpeed'), uScale: U('uScale'),
      uFrequency: U('uFrequency'), uWarpStrength: U('uWarpStrength'),
      uMouseInfluence: U('uMouseInfluence'),
      uParallax: U('uParallax'), uNoise: U('uNoise'),
    };

    stateRef.current = { gl, prog, buf, uniforms };

    // Set static uniforms
    gl.uniform1i(uniforms.uTransparent, transparent ? 1 : 0);
    gl.uniform1f(uniforms.uSpeed,        speed);
    gl.uniform1f(uniforms.uScale,        scale);
    gl.uniform1f(uniforms.uFrequency,    frequency);
    gl.uniform1f(uniforms.uWarpStrength, warpStrength);
    gl.uniform1f(uniforms.uMouseInfluence, mouseInfluence);
    gl.uniform1f(uniforms.uParallax,     parallax);
    gl.uniform1f(uniforms.uNoise,        noise);
    gl.uniform3fv(uniforms.uColors,      parseColors(colors));
    gl.uniform1i(uniforms.uColorCount,   Math.min(colors.length, 8));

    const start = performance.now();
    let raf;
    const ptrS = { x: 0, y: 0 };

    const loop = () => {
      const elapsed = (performance.now() - start) / 1000;
      const deg = (rotation % 360) + autoRotate * elapsed;
      const rad = deg * Math.PI / 180;
      ptrS.x += (mouseRef.current.x - ptrS.x) * 0.08;
      ptrS.y += (mouseRef.current.y - ptrS.y) * 0.08;
      gl.uniform1f(uniforms.uTime,   elapsed);
      gl.uniform2f(uniforms.uRot,    Math.cos(rad), Math.sin(rad));
      gl.uniform2f(uniforms.uPointer, ptrS.x, ptrS.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      const loseExt = gl.getExtension('WEBGL_lose_context');
      if (loseExt && loseExt.loseContext) loseExt.loseContext();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resize
  useResizeObserver(canvasRef, () => {
    const canvas = canvasRef.current;
    if (!canvas || !stateRef.current) return;
    const { gl, uniforms } = stateRef.current;
    const w = canvas.clientWidth  || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    canvas.width = w; canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uniforms.uCanvas, w, h);
  });

  return (
    <canvas
      ref={setCanvasNode}
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', display:'block' }}
    />
  );
}));

// ─────────────────────────────────────────────────────────────────
//  FluidGlass  (Three.js — FBO refraction + cinematic shader)
// ─────────────────────────────────────────────────────────────────
const FluidGlass = memo(function FluidGlass({ bgCanvasRef, modelUrl }) {
  const mountRef  = useRef(null);
  const mouseRef  = useContext(MouseContext);

  useEffect(() => {
    const mount = mountRef.current;

    // ── Renderer ────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping       = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    mount.appendChild(renderer.domElement);

    let composer = null;
    let renderPass = null;
    let bloomPass = null;
    let chromaPass = null;
    let hBlurPass = null;
    let vBlurPass = null;
    let bokehPass = null;
    let fxaaPass = null;
    let disposed = false;

    // ── Camera / Scenes ─────────────────────────────────────────
    const camera  = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 200);
    camera.position.set(0, 0, 6.5);
    const glScene     = new THREE.Scene();
    const mirrorScene = new THREE.Scene();
    const ortho       = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // ── FBO ─────────────────────────────────────────────────────
    const mkFBO = () => new THREE.WebGLRenderTarget(
      mount.clientWidth, mount.clientHeight,
      { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat }
    );
    let fbo = mkFBO();

    // Snapshot ColorBends canvas → texture each frame
    const bgTex = new THREE.CanvasTexture(bgCanvasRef.current);
    bgTex.minFilter = THREE.LinearFilter;
    glScene.background = bgTex;
    mirrorScene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshBasicMaterial({ map: bgTex }),
    ));

    // ── Glass material ───────────────────────────────────────────
    const glassMat = new THREE.ShaderMaterial({
      uniforms: {
        uBuffer: { value: fbo.texture },
        uRes:    { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
        uTime:   { value: 0 },
        uIOR:    { value: 1.25 },
        uChroma: { value: 1.4  },
        uFrost:  { value: 2.2  },
        uSmoke:  { value: 0.72 },
        uRoughness: { value: MODEL_ROUGHNESS },
        uFresnel: { value: MODEL_FRESNEL },
      },
      vertexShader:   GL_VERT,
      fragmentShader: GL_FRAG,
      transparent: true,
      side: THREE.FrontSide,
    });

    // ── Mesh — placeholder cube; swap geometry here for GLB ─────
    const glassMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.55, 1.55, 1.55),
      glassMat,
    );
    glScene.add(glassMesh);

    // Load the imported GLB model
    if (modelUrl) {
      import('three/examples/jsm/loaders/GLTFLoader').then(({ GLTFLoader }) => {
        const loader = new GLTFLoader();
        loader.load(
          modelUrl,
          // Success callback
          gltf => {
            console.log('GLB loaded successfully:', modelUrl);
            const box  = new THREE.Box3().setFromObject(gltf.scene);
            const size = box.getSize(new THREE.Vector3()).length();
            const cnt  = box.getCenter(new THREE.Vector3());
            gltf.scene.position.sub(cnt);
            gltf.scene.scale.setScalar((2.4 / size) * MODEL_SCALE);
            gltf.scene.traverse(child => {
              if (child.isMesh) {
                child.material = glassMat;
              }
            });
            glScene.remove(glassMesh);
            glScene.add(gltf.scene);
          },
          // Progress callback
          undefined,
          // Error callback
          error => {
            console.error('Failed to load GLB:', error);
          }
        );
      });
    }

    // ── Env light ────────────────────────────────────────────────
    const envLight = new THREE.PointLight(0xffffff, 3.5, 12);
    glScene.add(envLight);

    // ── Post FX (EffectComposer) ─────────────────────────────────
    let postReady = false;
    const initPost = async () => {
      const [
        { EffectComposer },
        { RenderPass },
        { UnrealBloomPass },
        { ShaderPass },
        { HorizontalBlurShader },
        { VerticalBlurShader },
        { BokehPass },
        { FXAAShader },
      ] = await Promise.all([
        import('three/examples/jsm/postprocessing/EffectComposer'),
        import('three/examples/jsm/postprocessing/RenderPass'),
        import('three/examples/jsm/postprocessing/UnrealBloomPass'),
        import('three/examples/jsm/postprocessing/ShaderPass'),
        import('three/examples/jsm/shaders/HorizontalBlurShader'),
        import('three/examples/jsm/shaders/VerticalBlurShader'),
        import('three/examples/jsm/postprocessing/BokehPass'),
        import('three/examples/jsm/shaders/FXAAShader'),
      ]);

      if (disposed) return;

      composer = new EffectComposer(renderer);
      renderPass = new RenderPass(glScene, camera);
      composer.addPass(renderPass);

      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(mount.clientWidth, mount.clientHeight),
        BLOOM_STRENGTH,
        BLOOM_RADIUS,
        BLOOM_THRESHOLD
      );
      composer.addPass(bloomPass);

      const chromaShader = {
        uniforms: {
          tDiffuse: { value: null },
          uAmount: { value: CHROMA_SHIFT },
          uAngle: { value: 0.6 },
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
          uniform float uAmount;
          uniform float uAngle;
          varying vec2 vUv;
          void main(){
            vec2 dir = vec2(cos(uAngle), sin(uAngle));
            vec2 off = dir * uAmount;
            float r = texture2D(tDiffuse, vUv + off).r;
            float g = texture2D(tDiffuse, vUv).g;
            float b = texture2D(tDiffuse, vUv - off).b;
            gl_FragColor = vec4(r,g,b,1.0);
          }
        `,
      };
      chromaPass = new ShaderPass(chromaShader);
      composer.addPass(chromaPass);

      hBlurPass = new ShaderPass(HorizontalBlurShader);
      vBlurPass = new ShaderPass(VerticalBlurShader);
      hBlurPass.uniforms.h.value = (LENS_BLUR / mount.clientWidth);
      vBlurPass.uniforms.v.value = (LENS_BLUR / mount.clientHeight);
      composer.addPass(hBlurPass);
      composer.addPass(vBlurPass);

      bokehPass = new BokehPass(glScene, camera, {
        focus: DOF_FOCUS,
        aperture: DOF_APERTURE,
        maxblur: DOF_MAX_BLUR,
        width: mount.clientWidth,
        height: mount.clientHeight,
      });
      composer.addPass(bokehPass);

      if (FXAA_ENABLED) {
        fxaaPass = new ShaderPass(FXAAShader);
        fxaaPass.material.uniforms.resolution.value.set(
          1 / Math.max(1, mount.clientWidth),
          1 / Math.max(1, mount.clientHeight)
        );
        composer.addPass(fxaaPass);
      }

      postReady = true;
    };
    initPost();

    // ── Animation ────────────────────────────────────────────────
    const clock  = new THREE.Clock();
    const tgt    = { x: 0, y: 0 };
    const STR    = Math.PI * 0.36;
    const SM     = 0.048;
    let raf;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const t = clock.getElapsedTime();

      // Smooth mouse → rotation
      tgt.x += (mouseRef.current.y * STR - tgt.x) * SM;
      tgt.y += (mouseRef.current.x * STR - tgt.y) * SM;
      
      // Update rotation for either the cube or loaded model
      // The scene will have either glassMesh or the loaded model
      glScene.children.forEach(child => {
        if (child.isMesh || child.isGroup) {
          child.rotation.x = tgt.x;
          child.rotation.y = tgt.y;
        }
      });
      
      glassMesh.position.y = Math.sin(t * 0.65) * 0.09;

      // Orbit env light
      envLight.position.set(Math.sin(t * 0.4) * 4, 3, Math.cos(t * 0.4) * 3);

      glassMat.uniforms.uTime.value = t;

      // Snapshot bg → FBO
      bgTex.needsUpdate = true;
      renderer.setRenderTarget(fbo);
      renderer.render(mirrorScene, ortho);

      renderer.setRenderTarget(null);
      if (postReady && composer) composer.render();
      else renderer.render(glScene, camera);
    };
    raf = requestAnimationFrame(loop);

    // ── Resize ───────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      if (composer) composer.setSize(w, h);
      if (composer) composer.setSize(w, h);
      fbo.dispose(); fbo = mkFBO();
      glassMat.uniforms.uBuffer.value = fbo.texture;
      glassMat.uniforms.uRes.value.set(w, h);
      if (hBlurPass) hBlurPass.uniforms.h.value = (LENS_BLUR / w);
      if (vBlurPass) vBlurPass.uniforms.v.value = (LENS_BLUR / h);
      if (fxaaPass) {
        fxaaPass.material.uniforms.resolution.value.set(1 / Math.max(1, w), 1 / Math.max(1, h));
      }
      if (bokehPass) {
        bokehPass.materialBokeh.uniforms.focus.value = DOF_FOCUS;
        bokehPass.materialBokeh.uniforms.aperture.value = DOF_APERTURE;
        bokehPass.materialBokeh.uniforms.maxblur.value = DOF_MAX_BLUR;
      }
      if (bloomPass) bloomPass.setSize(w, h);
      if (hBlurPass) hBlurPass.uniforms.h.value = (LENS_BLUR / w);
      if (vBlurPass) vBlurPass.uniforms.v.value = (LENS_BLUR / h);
      if (bokehPass) {
        bokehPass.materialBokeh.uniforms.focus.value = DOF_FOCUS;
        bokehPass.materialBokeh.uniforms.aperture.value = DOF_APERTURE;
        bokehPass.materialBokeh.uniforms.maxblur.value = DOF_MAX_BLUR;
      }
    });
    ro.observe(mount);

    // ── Cleanup ──────────────────────────────────────────────────
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      glassMat.dispose();
      fbo.dispose();
      bgTex.dispose();
      if (bloomPass && bloomPass.dispose) bloomPass.dispose();
      if (composer && composer.renderTarget1) {
        composer.renderTarget1.dispose();
        composer.renderTarget2.dispose();
      }
      if (fxaaPass && fxaaPass.material) fxaaPass.material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgCanvasRef, modelUrl]);

  return (
    <div
      ref={mountRef}
      style={{ position:'absolute', inset:0, pointerEvents:'none' }}
    />
  );
});

// ─────────────────────────────────────────────────────────────────
//  Landing  — public component
// ─────────────────────────────────────────────────────────────────
export default function Landing({
  // ColorBends props (all optional — defaults match ReactBits example)
  cbColors       = ['#ff2929', '#00ff00', '#0000ff'],
  cbRotation     = 45,
  cbAutoRotate   = 1,
  cbSpeed        = 0.2,
  cbScale        = 1,
  cbFrequency    = 1,
  cbWarpStrength = 0,
  cbMouseInfluence = 1,
  cbParallax     = 1,
  cbNoise        = 0.05,
}) {
  // Shared ref so FluidGlass can read the ColorBends canvas
  const bgCanvasRef = useRef(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  // Callback ref to know when canvas is mounted
  const setCanvasRef = useCallback((node) => {
    bgCanvasRef.current = node;
    if (node) {
      // Small delay to ensure WebGL context is ready
      setTimeout(() => setIsCanvasReady(true), 100);
    }
  }, []);

  return (
    <MouseProvider>
      <div style={{
        position : 'relative',
        width    : '100%',
        height   : '100vh',
        overflow : 'hidden',
        background: '#000',
      }}>

        {/* Layer 0 — ColorBends */}
        <ColorBendsGL
          ref={setCanvasRef}
          colors        = {cbColors}
          rotation      = {cbRotation}
          autoRotate    = {cbAutoRotate}
          speed         = {cbSpeed}
          scale         = {cbScale}
          frequency     = {cbFrequency}
          warpStrength  = {cbWarpStrength}
          mouseInfluence= {cbMouseInfluence}
          parallax      = {cbParallax}
          noise         = {cbNoise}
          transparent
        />

        {/* Layer 1 — vignette */}
        <div style={{
          position  : 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,.68) 100%)',
        }} />

        {/* Layer 2 — Glass mesh - only render when canvas is ready */}
        {isCanvasReady && (
          <div style={{ position:'absolute', inset:0, zIndex:2 }}>
            <FluidGlass bgCanvasRef={bgCanvasRef} modelUrl={suzanneModel} />
          </div>
        )}

        {/* Layer 3 — UI */}
        <BacklitTextLayered style={{
          position:'absolute', inset:0, zIndex:10,
          display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center', gap:16,
          pointerEvents:'none',
        }}>
          <span style={{ fontSize:10, letterSpacing:'0.55em', color:'rgba(255,255,255,.22)', textTransform:'uppercase' }}>
            We present to you
          </span>
          <h1 style={{
            fontWeight:100, fontSize:'clamp(32px,5.5vw,72px)', letterSpacing:'0.22em',
            color:'rgba(255,255,255,.88)', textTransform:'uppercase', margin:0,
            textShadow:'0 0 60px rgba(140,80,255,.35)',
          }}>
            BOLTFORGED
          </h1>
          <span style={{ fontSize:11, letterSpacing:'0.45em', color:'rgba(255,255,255,.18)', textTransform:'uppercase' }}>
            House of Creatives
          </span>
        </BacklitTextLayered>

        {/* Corner brackets */}
        {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h]) => (
          <div key={v+h} style={{
            position:'absolute', [v]:24, [h]:24, width:22, height:22, zIndex:11,
            borderColor:'rgba(255,255,255,.12)', borderStyle:'solid',
            borderWidth: `${v==='top'?1:0}px ${h==='right'?1:0}px ${v==='bottom'?1:0}px ${h==='left'?1:0}px`,
          }} />
        ))}

      </div>
    </MouseProvider>
  );
}
