import { useRef, useEffect, useMemo, forwardRef, useImperativeHandle, useState } from "react";
import * as THREE from "three";

// ====================== CONFIG & SHADERS ======================
const DEFAULT_CONFIG = {
  trailCount: 3,
  sizes: [16, 34, 20],
  fastDur: 110,
  slowDur: 750,
  smin_k: 0.22,
  edgeSoftness: 0.0006,
  dwellMs: 900,
  fadeInMs: 500,
  fadeOutMs: 140,
  reanchorMs: 110,
  idRes: 512,
  margin: 1.18,
  pulseScale: 1.28,
  pulseDuration: 380,
  baseAlpha: 0.28,
  baseNoiseStrength: 0.0,
  triggeredNoiseStrength: 90.0,
  lightness: 0.65,
  untriggeredSizeScale: 0.72,
  blobNoiseScale: 0.028,
  chromaticStrength: 2.2,
  ghostCount: 4,
  ghostRadius: 14.0,
  ghostAlphaFactor: 0.55,
  rippleCount: 3,
  breatheAmp: 0.06,
  breatheFreq: 0.9,
  curlStrength: 18.0,
  prismStrength: 0.7,
  hoverTintColor: 0x9fe8ff,
  hoverTintMix: 0.78,
  preWrapMs: 260,
  preWrapScale: 1.58,
  preWrapEasePower: 3,
};

const ID_VERT = `
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;
void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }
`;
const ID_FRAG = `
precision mediump float;
uniform float u_id;
void main(){ gl_FragColor = vec4(u_id,0.,0.,1.); }
`;
const BLOB_VERT = `void main(){ gl_Position = vec4(position.xy,0.,1.); }`;
const BLOB_FRAG = `
precision highp float;
uniform vec2  u_res;
uniform vec3  u_blobs[8];
uniform int   u_count;
uniform float u_k;
uniform float u_edge;
uniform float u_alpha;
uniform float u_phase;
uniform float u_quality;
uniform float u_time;
uniform float u_pulseScale;
uniform vec3  u_blobColors[8];
uniform vec3  u_cursorColor;
uniform vec3  u_hoverColor;
uniform float u_hoverMix;
uniform int   u_activeColorIdx;
uniform sampler2D tScene;
uniform float u_baseNoise;
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

float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
vec2 hash2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return -1.0+2.0*fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.0-2.0*f);return mix(mix(dot(hash2(i),f),dot(hash2(i+vec2(1,0)),f-vec2(1,0)),u.x),mix(dot(hash2(i+vec2(0,1)),f-vec2(0,1)),dot(hash2(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float s=0.,a=0.5;for(int i=0;i<4;i++){s+=noise(p)*a;p*=2.1;a*=0.5;}return s;}
vec2 curlNoise(vec2 p){float eps=0.01;float dx=(fbm(p+vec2(eps,0.))-fbm(p-vec2(eps,0.)))/(2.*eps);float dy=(fbm(p+vec2(0.,eps))-fbm(p-vec2(0.,eps)))/(2.*eps);return vec2(dy,-dx);}

void main(){
  vec2 uv=gl_FragCoord.xy;
  vec3 scene=texture2D(tScene,uv/u_res).rgb;

  float field=1e9;
  for(int i=0;i<8;i++){
    if(i>=u_count)break;
    float d=length(uv-u_blobs[i].xy)-u_blobs[i].z*u_breathe;
    field=smin(field,d,u_k*u_blobs[0].z);
  }
  float baseIns=1.0-smoothstep(-u_edge*u_res.y,u_edge*u_res.y,field);

  vec2 curlOff=curlNoise(uv*u_noiseScale*0.5+u_time*0.1)*u_curl*u_alpha;
  float totalNoise=u_baseNoise+u_trigNoise*u_alpha;
  vec2 dispUV=uv+curlOff;
  float dispField=1e9;
  for(int i=0;i<8;i++){
    if(i>=u_count)break;
    float d=length(dispUV-u_blobs[i].xy)-u_blobs[i].z*u_breathe;
    dispField=smin(dispField,d,u_k*u_blobs[0].z);
  }
  float triggeredIns=1.0-smoothstep(-u_edge*u_res.y,u_edge*u_res.y,dispField+fbm(dispUV*u_noiseScale+u_time*0.2)*totalNoise);

  float ghostIns=0.0;
  if(u_alpha>0.0){
    for(int g=0;g<u_ghostCount;g++){
      float angle=float(g)*6.28318/float(u_ghostCount)+u_time*1.8;
      float r=u_ghostRadius*(0.6+0.4*sin(float(g)*1.7+u_time*2.5));
      vec2 off=vec2(cos(angle),sin(angle))*r;
      float gf=1e9;
      for(int i=0;i<u_count;i++){
        float d=length(uv-(u_blobs[i].xy+off))-u_blobs[i].z*u_breathe;
        gf=smin(gf,d,u_k*u_blobs[0].z);
      }
      float gDisp=gf+fbm((uv+off)*u_noiseScale+u_time*0.2)*totalNoise;
      ghostIns=min(1.0,ghostIns+(1.0-smoothstep(-u_edge*u_res.y,u_edge*u_res.y,gDisp))*u_ghostAlpha*u_alpha);
    }
  }
  float finalIns=min(1.0,baseIns+(triggeredIns-baseIns)*u_alpha+ghostIns);

  float rippleGlow=0.0;
  for(int r=0;r<6;r++){
    float radius=u_ripples[r].x;
    float strength=u_ripples[r].y;
    if(radius<0.0)continue;
    float dist=abs(field-radius);
    rippleGlow+=smoothstep(3.0,0.0,dist)*strength;
  }

  vec3 targetColor=u_activeColorIdx>=0?u_blobColors[u_activeColorIdx]:u_cursorColor;
  targetColor=mix(targetColor,u_hoverColor,clamp(u_hoverMix,0.,1.));
  vec3 lightColor=mix(targetColor,vec3(1.0),u_lightness);
  vec3 blobColor=mix(lightColor,targetColor,u_alpha)*u_pulseScale;

  float edgeT=smoothstep(0.0,0.3,finalIns)*(1.0-smoothstep(0.7,1.0,finalIns));
  vec3 prismR=vec3(0.9,0.2,0.1)*edgeT*u_prism*u_alpha;
  vec3 prismG=vec3(0.1,0.9,0.2)*edgeT*u_prism*u_alpha*0.8;
  vec3 prismB=vec3(0.1,0.2,0.9)*edgeT*u_prism*u_alpha*0.6;
  vec3 prism=prismR+prismG+prismB;

  vec3 finalScene=scene;
  if(u_alpha>0.0&&u_chromStr>0.0){
    vec2 blobCenter=u_blobs[0].xy;
    vec2 fromCenter=uv-blobCenter;
    float d=length(fromCenter);
    vec2 radDir=d>0.001?normalize(fromCenter):vec2(1,0);
    float chromScale=u_chromStr*finalIns*u_alpha;
    vec3 rScene=texture2D(tScene,(uv+radDir*chromScale)/u_res).rgb;
    vec3 gScene=texture2D(tScene,uv/u_res).rgb;
    vec3 bScene=texture2D(tScene,(uv-radDir*chromScale*0.7)/u_res).rgb;
    finalScene=vec3(rScene.r,gScene.g,bScene.b);
  }

  vec3 inv=1.0-finalScene;
  vec3 res=mix(finalScene,inv,finalIns*u_alpha);
  res=mix(res,mix(finalScene,blobColor,finalIns),1.0-u_alpha);
  res+=prism*(1.0-res);
  res=mix(res,vec3(0.95,0.85,1.0),rippleGlow*0.4*u_alpha);
  gl_FragColor=vec4(res,1.0);
}
`;

// ====================== UTILITIES ======================
function easeBackIn(t) {
  const c1 = 1.70158, c2 = c1 * 1.525;
  return t < 0.5
    ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
    : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (2 * t - 2) + c2) + 2) / 2;
}
function easeOutPow(t, power = 3) {
  return 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), power);
}

function createCursorState(cfg) {
  const { trailCount, fastDur, slowDur, fadeInMs, fadeOutMs, reanchorMs, dwellMs, baseAlpha } = cfg;
  const trail = Array.from({ length: trailCount }, () => ({ x: -999, y: -999 }));
  const vel = Array.from({ length: trailCount }, () => ({ x: 0, y: 0 }));
  const goal = { x: -999, y: -999 };
  let alpha = baseAlpha, anchor = 0, progress = 0, fadeTgt = baseAlpha, anchorTgt = 0, activeId = 0;
  let dwellTimer = null, pulseTimer = null, pulseScale = 1;
  let lerpRaf = null, fadeRaf = null, lerpLast = null, fadeLast = null;
  let preWrapValue = 0, preWrapRaf = null, preWrapLast = null, preWrapFrom = 0, preWrapTo = 0, preWrapProgress = 0;
  const ripples = Array.from({ length: cfg.rippleCount * 2 }, () => ({ r: -1, str: 0, cx: 0, cy: 0 }));

  function lerpTick(now) {
    const dt = lerpLast == null ? 16 : Math.min(now - lerpLast, 64); lerpLast = now;
    let moving = false;
    for (let i = 0; i < trailCount; i++) {
      const g = i === trailCount - 1 ? goal : trail[i + 1];
      const dur = i === trailCount - 1 ? fastDur : slowDur;
      const a = 1 - Math.exp(-dt / (dur * 0.25));
      const px = trail[i].x, py = trail[i].y;
      trail[i].x += (g.x - trail[i].x) * a; trail[i].y += (g.y - trail[i].y) * a;
      vel[i].x = (trail[i].x - px) / dt; vel[i].y = (trail[i].y - py) / dt;
      if (Math.abs(g.x - trail[i].x) > 0.05 || Math.abs(g.y - trail[i].y) > 0.05) moving = true;
    }
    lerpRaf = moving ? requestAnimationFrame(lerpTick) : null;
    if (!moving) lerpLast = null;
  }

  function fadeTick(now) {
    const dt = fadeLast == null ? 16 : Math.min(now - fadeLast, 64); fadeLast = now;
    const entering = fadeTgt > 0.5, dir = entering ? 1 : -1;
    const ms = entering ? fadeInMs : fadeOutMs;
    progress = Math.min(1, Math.max(0, progress + dir * (dt / ms)));
    alpha = entering ? Math.max(baseAlpha, easeBackIn(progress)) : Math.min(1, baseAlpha + progress * (1 - baseAlpha));
    const aspd = entering ? dt / fadeInMs : dt / reanchorMs, adir = anchorTgt - anchor > 0 ? 1 : -1;
    anchor = Math.min(1, Math.max(0, anchor + adir * aspd));
    if (progress > 0 && progress < 1) fadeRaf = requestAnimationFrame(fadeTick);
    else { alpha = fadeTgt; anchor = anchorTgt; fadeRaf = null; fadeLast = null; }
  }

  function startFade(toA, toAnc = toA) { fadeTgt = toA; anchorTgt = toAnc; if (!fadeRaf) fadeRaf = requestAnimationFrame(fadeTick); }

  function preWrapTick(now) {
    const dt = preWrapLast == null ? 16 : Math.min(now - preWrapLast, 64); preWrapLast = now;
    preWrapProgress = Math.min(1, preWrapProgress + dt / cfg.preWrapMs);
    preWrapValue = preWrapFrom + (preWrapTo - preWrapFrom) * easeOutPow(preWrapProgress, cfg.preWrapEasePower);
    if (preWrapProgress < 1) preWrapRaf = requestAnimationFrame(preWrapTick);
    else { preWrapValue = preWrapTo; preWrapRaf = null; preWrapLast = null; }
  }

  function startPreWrap(target) {
    if (Math.abs(preWrapValue - target) < 0.001 && preWrapRaf == null) return;
    if (preWrapRaf) cancelAnimationFrame(preWrapRaf);
    preWrapFrom = preWrapValue; preWrapTo = target; preWrapProgress = 0; preWrapLast = null;
    preWrapRaf = requestAnimationFrame(preWrapTick);
  }

  function triggerPulse(cx, cy) {
    if (pulseTimer) cancelAnimationFrame(pulseTimer);
    const t0 = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - t0) / cfg.pulseDuration);
      pulseScale = 1 + (cfg.pulseScale - 1) * (1 - t);
      if (t < 1) pulseTimer = requestAnimationFrame(tick);
      else { pulseScale = 1; pulseTimer = null; }
    }
    pulseTimer = requestAnimationFrame(tick);
    spawnRipples(cx, cy);
  }

  function spawnRipples(cx, cy) {
    for (let i = 0; i < cfg.rippleCount; i++) {
      const slot = i % ripples.length;
      ripples[slot] = { r: 0, str: 1, cx, cy, speed: 120 + i * 60, t0: performance.now() };
    }
  }

  function updateRipples(now) {
    for (const rp of ripples) {
      if (rp.r < 0) continue;
      const elapsed = (now - rp.t0) * 0.001;
      rp.r = elapsed * rp.speed; rp.str = Math.max(0, 1 - elapsed * 1.2);
      if (rp.str <= 0) rp.r = -1;
    }
  }

  function moveTo(x, y) { goal.x = x; goal.y = y; if (!lerpRaf) lerpRaf = requestAnimationFrame(lerpTick); }

  function setHoveredId(id) {
    if (id === activeId) return;
    if (dwellTimer) clearTimeout(dwellTimer);
    activeId = id;
    if (id === 0) { startPreWrap(0); startFade(baseAlpha, 0); return; }
    startPreWrap(1);
    startFade(baseAlpha, 0);
    dwellTimer = setTimeout(() => {
      startFade(1, 1);
      triggerPulse(trail[0].x, trail[0].y);
      dwellTimer = null;
    }, dwellMs);
  }

  function forceLeave() {
    if (dwellTimer) clearTimeout(dwellTimer);
    if (pulseTimer) cancelAnimationFrame(pulseTimer);
    activeId = 0; startPreWrap(0); startFade(baseAlpha, 0); pulseScale = 1;
  }

  function dispose() {
    if (lerpRaf) cancelAnimationFrame(lerpRaf);
    if (fadeRaf) cancelAnimationFrame(fadeRaf);
    if (preWrapRaf) cancelAnimationFrame(preWrapRaf);
    if (dwellTimer) clearTimeout(dwellTimer);
    if (pulseTimer) cancelAnimationFrame(pulseTimer);
  }

  return {
    get trail() { return trail; }, get vel() { return vel; }, get alpha() { return alpha; },
    get anchor() { return anchor; }, get activeId() { return activeId; }, get preWrap() { return preWrapValue; },
    get pulseScale() { return pulseScale; }, get ripples() { return ripples; },
    moveTo, setHoveredId, forceLeave, dispose, updateRipples,
  };
}

const _v3 = new THREE.Vector3();
const _ndc = new THREE.Vector3();
function projectGeometryTight(mesh, geo, camera, rW, rH, stride = 3) {
  mesh.updateWorldMatrix(true, false);
  const mw = mesh.matrixWorld;
  const pos = geo.attributes.position;
  const count = pos.count;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, n = 0;
  for (let i = 0; i < count; i += stride) {
    _v3.fromBufferAttribute(pos, i).applyMatrix4(mw);
    _ndc.copy(_v3).project(camera);
    if (_ndc.z > 1) continue;
    const sx = (_ndc.x * 0.5 + 0.5) * rW;
    const sy = (1 - (_ndc.y * 0.5 + 0.5)) * rH;
    if (sx < minX) minX = sx; if (sx > maxX) maxX = sx;
    if (sy < minY) minY = sy; if (sy > maxY) maxY = sy;
    n++;
  }
  if (n === 0) return { cx: rW / 2, cy: rH / 2, r: 40 };
  const cx = (minX + maxX) * 0.5;
  const cy = (minY + maxY) * 0.5;
  const r = Math.sqrt((maxX - minX) ** 2 + (maxY - minY) ** 2) * 0.5;
  return { cx, cy, r };
}

// ====================== COMPONENT ======================
const BlobCursor = forwardRef(({
  scene,
  camera,
  renderer,
  interactiveObjects,
  config = {},
  style = {},
  className = "",
}, ref) => {
  const containerRef = useRef(null);
  const cfg = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);
  const cursorStateRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const internalRefs = useRef({
    rtID: null, rtScene: null, blobMat: null, blobScene: null, blobCam: null,
    idMeshes: [], smoothProj: [], strides: [], lastProj: { cx: 0, cy: 0, r: 0, id: 0 },
    lastTime: 0, smoothFPS: 60, pixBuf: new Uint8Array(4), rippleUniforms: [],
    curPx: { x: -999, y: -999 }, isTouch: false, idScene: null, ro: null,
  }).current;

  // Expose render method
  useImperativeHandle(ref, () => ({
    render: () => {
      const refs = internalRefs;
      const cs = cursorStateRef.current;
      if (!cs || !renderer || !scene || !camera || !refs.blobMat) return;

      const now = performance.now();
      const time = now * 0.001;
      const alpha = cs.alpha, anchor = cs.anchor;
      const rW = renderer.domElement.width, rH = renderer.domElement.height;
      const cW = containerRef.current?.clientWidth || rW;
      const cH = containerRef.current?.clientHeight || rH;
      const dpr = renderer.getPixelRatio();

      // FPS quality
      const dt = Math.max(8, now - refs.lastTime);
      refs.lastTime = now;
      const fps = 1000 / dt;
      refs.smoothFPS = refs.smoothFPS * 0.92 + fps * 0.08;
      const quality = THREE.MathUtils.clamp((refs.smoothFPS - 28) / 30, 0.45, 1);

      cs.updateRipples(now);

      // Update object colors based on hover
      const activeIdx = cs.activeId - 1;
      interactiveObjects.forEach((obj, i) => {
        const isActive = i === activeIdx;
        if (obj.material) {
          const tmpColor = new THREE.Color();
          tmpColor.lerpColors(obj.colorA, obj.colorB, isActive ? alpha : 0);
          obj.material.color.copy(tmpColor);
          if (obj.material.emissive) obj.material.emissive.setScalar(isActive ? alpha * 0.4 : 0);
        }
        if (obj.wireframe) {
          obj.wireframe.material.opacity = isActive ? 0.15 + alpha * 0.7 : 0.18;
        }
      });

      refs.blobMat.uniforms.u_activeColorIdx.value = cs.activeId > 0 ? cs.activeId - 1 : -1;

      // ID pass
      refs.idMeshes.forEach((m, i) => {
        interactiveObjects[i].mesh.updateWorldMatrix(true, false);
        m.matrixAutoUpdate = false;
        m.matrix.copy(interactiveObjects[i].mesh.matrixWorld);
        m.matrixWorld.copy(interactiveObjects[i].mesh.matrixWorld);
      });
      renderer.setRenderTarget(refs.rtID);
      renderer.clear();
      renderer.render(refs.idScene, camera);

      const sx = Math.max(0, Math.min(cfg.idRes - 1, Math.round((refs.curPx.x / cW) * cfg.idRes)));
      const sy = Math.max(0, Math.min(cfg.idRes - 1, Math.round((1 - refs.curPx.y / cH) * cfg.idRes)));
      renderer.readRenderTargetPixels(refs.rtID, sx, sy, 1, 1, refs.pixBuf);
      cs.setHoveredId(refs.pixBuf[0]);

      // Render main scene to texture
      renderer.setRenderTarget(refs.rtScene);
      renderer.clear();
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      renderer.clear();

      // Blob uniforms
      refs.blobMat.uniforms.u_alpha.value = alpha;
      refs.blobMat.uniforms.u_phase.value = THREE.MathUtils.clamp((alpha - cfg.baseAlpha) / (1 - cfg.baseAlpha), 0, 1);
      refs.blobMat.uniforms.u_quality.value = quality;
      refs.blobMat.uniforms.u_hoverMix.value = (1 - anchor) * cs.preWrap * cfg.hoverTintMix;
      refs.blobMat.uniforms.u_time.value = time;
      refs.blobMat.uniforms.u_pulseScale.value = cs.pulseScale;
      refs.blobMat.uniforms.u_breathe.value = 1 + Math.sin(time * cfg.breatheFreq * Math.PI * 2) * cfg.breatheAmp;

      const rips = cs.ripples;
      for (let i = 0; i < 6; i++) {
        const rp = rips[i % rips.length];
        if (rp && rp.r >= 0) refs.rippleUniforms[i].set(rp.r, rp.str, 0);
        else refs.rippleUniforms[i].set(-1, 0, 0);
      }

      // Project active geometry
      const projIdx = cs.activeId > 0 ? cs.activeId - 1 : (alpha > cfg.baseAlpha + 0.01 ? refs.lastProj.id - 1 : -1);
      if (projIdx >= 0 && projIdx < interactiveObjects.length) {
        const obj = interactiveObjects[projIdx];
        const raw = projectGeometryTight(obj.mesh, obj.geometry, camera, rW, rH, refs.strides[projIdx]);
        const tgtR = raw.r * cfg.margin;
        const s = refs.smoothProj[projIdx];
        if (!s.init) {
          const fx = refs.lastProj.id > 0 ? refs.lastProj.cx : Math.max(0, cs.trail[0].x * dpr);
          const fy = refs.lastProj.id > 0 ? refs.lastProj.cy : Math.max(0, rH - cs.trail[0].y * dpr);
          const fr = refs.lastProj.id > 0 ? refs.lastProj.r : (cfg.sizes[0] * dpr * 0.5 * cfg.untriggeredSizeScale);
          s.cx = fx; s.cy = fy; s.r = fr; s.init = true;
        }
        const l = 0.14;
        s.cx += (raw.cx - s.cx) * l;
        s.cy += (raw.cy - s.cy) * l;
        s.r  += (tgtR - s.r) * l;
      }

      let projCx = 0, projCy = 0, projR = 0;
      if (cs.activeId > 0) {
        const s = refs.smoothProj[cs.activeId - 1];
        projCx = s.cx; projCy = s.cy; projR = s.r;
        refs.lastProj = { cx: projCx, cy: projCy, r: projR, id: cs.activeId };
      } else if (alpha > cfg.baseAlpha + 0.01) {
        projCx = refs.lastProj.cx; projCy = refs.lastProj.cy; projR = refs.lastProj.r;
      }

      // Update blob positions
      const blobs = refs.blobMat.uniforms.u_blobs.value;
      const hoverBlend = THREE.MathUtils.clamp((alpha - cfg.baseAlpha) / (1 - cfg.baseAlpha), 0, 1);
      for (let i = 0; i < cfg.trailCount; i++) {
        const p = cs.trail[i];
        const curX = p.x * dpr, curY = rH - p.y * dpr;
        const bx = projCx * anchor + curX * (1 - anchor);
        const by = (rH - projCy) * anchor + curY * (1 - anchor);
        const baseR = (cfg.sizes[i] ?? cfg.sizes[0]) * dpr * 0.5;
        const preScale = 1 + (cfg.preWrapScale - 1) * cs.preWrap * (1 - anchor);
        const idleR = baseR * cfg.untriggeredSizeScale * preScale;
        const targetR = projR > 0 ? projR : idleR;
        const r = THREE.MathUtils.lerp(idleR, targetR, hoverBlend);
        blobs[i].set(bx, by, r);
      }
      for (let i = cfg.trailCount; i < 8; i++) blobs[i].set(-9999, -9999, 0);

      renderer.render(refs.blobScene, refs.blobCam);
    },
    forceLeave: () => cursorStateRef.current?.forceLeave(),
  }));

  // Setup cursor state and event listeners
  useEffect(() => {
    const cs = createCursorState(cfg);
    cursorStateRef.current = cs;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
    internalRefs.isTouch = isTouchDevice;

    const handleMove = (e) => {
      const x = isTouchDevice && e.touches ? e.touches[0].clientX : e.clientX;
      const y = isTouchDevice && e.touches ? e.touches[0].clientY : e.clientY;
      cs.moveTo(x, y);
    };

    const handleCanvasMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const cx = isTouchDevice && e.touches ? e.touches[0].clientX : e.clientX;
        const cy = isTouchDevice && e.touches ? e.touches[0].clientY : e.clientY;
        internalRefs.curPx = { x: cx - rect.left, y: cy - rect.top };
      }
    };

    const handleLeave = () => cs.forceLeave();

    const moveEvt = isTouchDevice ? 'touchmove' : 'mousemove';
    window.addEventListener(moveEvt, handleMove);
    if (isTouchDevice) window.addEventListener('touchstart', handleMove);

    const container = containerRef.current;
    if (container) {
      container.addEventListener(moveEvt, handleCanvasMove);
      container.addEventListener('mouseleave', handleLeave);
      if (isTouchDevice) container.addEventListener('touchstart', handleCanvasMove);
    }

    return () => {
      cs.dispose();
      window.removeEventListener(moveEvt, handleMove);
      if (isTouchDevice) window.removeEventListener('touchstart', handleMove);
      if (container) {
        container.removeEventListener(moveEvt, handleCanvasMove);
        container.removeEventListener('mouseleave', handleLeave);
        if (isTouchDevice) container.removeEventListener('touchstart', handleCanvasMove);
      }
    };
  }, [cfg]);

  // Setup render targets and materials
  useEffect(() => {
    if (!renderer || !camera || !interactiveObjects.length) return;

    const width = renderer.domElement.width;
    const height = renderer.domElement.height;
    const dpr = renderer.getPixelRatio();

    // ID render target
    const idRes = cfg.idRes;
    const rtID = new THREE.WebGLRenderTarget(idRes, idRes, {
      minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, type: THREE.UnsignedByteType
    });
    internalRefs.rtID = rtID;

    // ID scene
    const idScene = new THREE.Scene();
    idScene.background = new THREE.Color(0, 0, 0);
    internalRefs.idScene = idScene;

    const idMeshes = interactiveObjects.map((obj, i) => {
      const mat = new THREE.RawShaderMaterial({
        vertexShader: ID_VERT, fragmentShader: ID_FRAG,
        uniforms: { u_id: { value: (i + 1) / 255 } }
      });
      const m = new THREE.Mesh(obj.geometry, mat);
      idScene.add(m);
      return m;
    });
    internalRefs.idMeshes = idMeshes;

    // Main scene render target
    const rtScene = new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter
    });
    internalRefs.rtScene = rtScene;

    // Blob scene
    const blobScene = new THREE.Scene();
    const blobCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    internalRefs.blobScene = blobScene;
    internalRefs.blobCam = blobCam;

    const rippleUniforms = Array.from({ length: 6 }, () => new THREE.Vector3(-1, 0, 0));
    internalRefs.rippleUniforms = rippleUniforms;

    const blobColors = new Float32Array(
      interactiveObjects.flatMap(o => [o.blobColor.r, o.blobColor.g, o.blobColor.b])
        .concat(Array(24 - interactiveObjects.length * 3).fill(0))
    );

    const blobMat = new THREE.ShaderMaterial({
      vertexShader: BLOB_VERT, fragmentShader: BLOB_FRAG,
      uniforms: {
        u_res: { value: new THREE.Vector2(width, height) },
        u_blobs: { value: Array.from({ length: 8 }, () => new THREE.Vector3(-9999, -9999, 0)) },
        u_count: { value: cfg.trailCount },
        u_k: { value: cfg.smin_k }, u_edge: { value: cfg.edgeSoftness },
        u_alpha: { value: 0 }, u_phase: { value: 0 }, u_quality: { value: 1 },
        u_time: { value: 0 }, u_pulseScale: { value: 1 },
        u_blobColors: { value: blobColors },
        u_cursorColor: { value: new THREE.Color(0xffffff) },
        u_hoverColor: { value: new THREE.Color(cfg.hoverTintColor) },
        u_hoverMix: { value: 0 }, u_activeColorIdx: { value: -1 },
        u_baseNoise: { value: cfg.baseNoiseStrength }, u_trigNoise: { value: cfg.triggeredNoiseStrength },
        u_noiseScale: { value: cfg.blobNoiseScale }, u_chromStr: { value: cfg.chromaticStrength },
        u_ghostCount: { value: cfg.ghostCount }, u_ghostRadius: { value: cfg.ghostRadius },
        u_ghostAlpha: { value: cfg.ghostAlphaFactor }, u_lightness: { value: cfg.lightness },
        u_breathe: { value: 1 }, u_curl: { value: cfg.curlStrength }, u_prism: { value: cfg.prismStrength },
        u_ripples: { value: rippleUniforms }, tScene: { value: rtScene.texture },
      },
      depthTest: false, depthWrite: false,
    });
    internalRefs.blobMat = blobMat;
    blobScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), blobMat));

    // Strides and projection state
    internalRefs.strides = interactiveObjects.map(obj => obj.stride ?? 3);
    internalRefs.smoothProj = interactiveObjects.map(() => ({ cx: 0, cy: 0, r: 0, init: false }));

    internalRefs.lastTime = performance.now();

    // Resize observer
    const container = containerRef.current;
    const ro = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth, h = container.clientHeight;
      renderer.setSize(w, h);
      rtScene.setSize(w * dpr, h * dpr);
      blobMat.uniforms.u_res.value.set(w * dpr, h * dpr);
    });
    ro.observe(container);
    internalRefs.ro = ro;

    return () => {
      ro.disconnect();
      rtID.dispose();
      rtScene.dispose();
      blobMat.dispose();
    };
  }, [renderer, camera, interactiveObjects, cfg]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        cursor: 'none',
        zIndex: 1000,
        ...style,
      }}
    />
  );
});

export default BlobCursor;