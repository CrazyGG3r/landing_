import { useEffect, useRef, useMemo, useCallback } from 'react';
import { getCachedImage, preloadImages } from '../core/assetCache';
import { subscribeFrame } from '../core/frameScheduler';
import { getRenderProfile } from '../core/renderProfile';

// Shaders
const vert = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const frag = `
precision mediump float;
varying vec2 vUv;

uniform float iTime;
uniform vec2  iResolution;
uniform float uScale;
uniform float uAspect;
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
uniform vec2      uImageSize;
uniform vec2  uClickPos;
uniform float uClickTime;
uniform float uHasClick;
uniform sampler2D uDeadMask;
uniform vec2      uDeadMaskSize;

float time;

float hash21(vec2 p){ p=fract(p*234.56); p+=dot(p,p+34.56); return fract(p.x*p.y); }

float noise(vec2 p){
  return sin(p.x*10.0)*sin(p.y*(3.0+sin(time*0.090909)))+0.2;
}
mat2 rot(float a){ float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }

float fbm(vec2 p){
  p *= 1.1;
  float f = 0.0, amp = 0.5*uNoiseAmp;
  f += amp*noise(p); p = rot(time*0.02)*p*2.0; amp *= 0.454545;
  f += amp*noise(p);
  return f;
}

float pattern(vec2 p, out vec2 q, out vec2 r){
  q = vec2(fbm(p+1.0), fbm(rot(0.1*time)*p+1.0));
  r = vec2(fbm(rot(0.1)*q), fbm(q));
  return fbm(p+r);
}

vec2 worldPos(vec2 uv){ return vec2(uv.x*uScale*uAspect, uv.y*uScale); }

float bgGrid(vec2 wp){
  vec2 grid = uGridMul*15.0;
  vec2 p = fract(wp*grid)*uDigitSize;
  float px5=p.x*5.0, py5=(1.0-p.y)*5.0;
  float x=fract(px5), y=fract(py5);
  float i=floor(py5)-2.0, j=floor(px5)-2.0;
  float nS=max(abs(i),abs(j)); nS*=nS;
  float b=step(0.1,0.6-nS*0.0625)*(0.2+y*0.8)*(0.75+x*0.25);
  return step(0.0,p.x)*step(p.x,1.0)*step(0.0,p.y)*step(p.y,1.0)*b*0.2;
}

bool isDeadCell(vec2 s){
  vec2 grid = uGridMul*15.0;
  vec2 uv = (floor(s*grid)+0.5) / uDeadMaskSize;
  return texture2D(uDeadMask, uv).r > 0.5;
}

float cellBrightness(vec2 p, float intensity){
  p = fract(p)*uDigitSize;
  float px5=p.x*5.0, py5=(1.0-p.y)*5.0;
  float x=fract(px5), y=fract(py5);
  float i=floor(py5)-2.0, j=floor(px5)-2.0;

  float nC=i*i+j*j;
  float nD=(abs(i)+abs(j)); nD*=nD;
  float nS=max(abs(i),abs(j)); nS*=nS;
  float n;
  float sc = mod(iTime*0.3, 3.0);
  float t01 = fract(sc);
  if(sc < 1.0)      n = t01 < 0.15 || t01 > 0.85 ? (t01<0.5?nC:nD) : mix(nC,nD,smoothstep(0.0,1.0,t01));
  else if(sc < 2.0) n = t01 < 0.15 || t01 > 0.85 ? (t01<0.5?nD:nS) : mix(nD,nS,smoothstep(0.0,1.0,t01));
  else              n = t01 < 0.15 || t01 > 0.85 ? (t01<0.5?nS:nC) : mix(nS,nC,smoothstep(0.0,1.0,t01));

  float b = step(0.1, intensity-n*0.0625)*(0.2+y*0.8)*(0.75+x*0.25);
  return step(0.0,p.x)*step(p.x,1.0)*step(0.0,p.y)*step(p.y,1.0)*b;
}

float rippleMask(vec2 s){
  if(uHasClick<0.5) return 0.0;
  float t=uClickTime, dist=distance(s,uClickPos), fade=exp(-t*1.2), rw=0.08, m=0.0;
  float r0=t*0.8; m+=smoothstep(rw,0.0,abs(dist-r0))*fade*step(dist,r0+rw);
  float r1=t*1.4; m+=smoothstep(rw,0.0,abs(dist-r1))*fade*step(dist,r1+rw);
  float r2=t*2.1; m+=smoothstep(rw,0.0,abs(dist-r2))*fade*step(dist,r2+rw);
  return clamp(m,0.0,1.0);
}

float onOff(float a,float b,float c){ return step(c,sin(iTime+a*cos(iTime*b)))*uFlickerAmount; }
float displace(vec2 l){
  float y=l.y-mod(iTime*0.25,1.0);
  return sin(l.y*20.0+iTime)*0.0125*onOff(4.0,2.0,0.8)*(1.0+cos(iTime*60.0))/(1.0+50.0*y*y);
}

vec3 getColor(vec2 wp, out float emission){
  float bar=(step(mod(wp.y/uAspect+time*20.0,1.0),0.2)*0.4+1.0)*uScanlineIntensity;
  float d=displace(wp);
  wp.x += d + (uGlitchAmount!=1.0 ? d*(uGlitchAmount-1.0) : 0.0);

  vec2 grid = uGridMul*15.0;
  vec2 s = floor(wp*grid)/grid;
  vec2 p = wp*grid;

  float intensity;
  float dead = isDeadCell(s) ? 1.0 : 0.0;
  if(dead > 0.5){
    intensity = -9999.0;
  } else {
    vec2 q,r;
    intensity = pattern(s*0.1,q,r)*1.3-0.03;

    if(uUseMouse>0.5){
      float dist = distance(s, uMouse);
      intensity -= exp(-dist*8.0)*uMouseStrength*10.0;
    }
    float rpl = rippleMask(s);
    intensity -= rpl*(1.0-smoothstep(0.1,0.35,intensity))*0.8;

    if(uUsePageLoadAnimation>0.5){
      float cr = fract(sin(dot(s,vec2(12.9898,78.233)))*43758.5453);
      intensity *= smoothstep(0.0,1.0,clamp((uPageLoadProgress-cr*0.8)/0.2,0.0,1.0));
    }
  }

  float mid = cellBrightness(p, intensity);
  const float off = 0.002;
  float sum =
    cellBrightness(p+vec2(-off,-off)*grid, intensity)+
    cellBrightness(p+vec2( 0.0,-off)*grid, intensity)+
    cellBrightness(p+vec2( off,-off)*grid, intensity)+
    cellBrightness(p+vec2(-off, 0.0)*grid, intensity)+
    cellBrightness(p+vec2( 0.0, 0.0)*grid, intensity)+
    cellBrightness(p+vec2( off, 0.0)*grid, intensity)+
    cellBrightness(p+vec2(-off,  off)*grid, intensity)+
    cellBrightness(p+vec2( 0.0,  off)*grid, intensity)+
    cellBrightness(p+vec2( off,  off)*grid, intensity);

  float active = step(0.15, mid);
  float emit = mix(0.3, 1.0, active);
  emission = mix(emit, 0.05, dead);
  return vec3(bgGrid(wp)) + vec3(0.9)*mid + sum*0.1*bar;
}

vec2 barrel(vec2 uv){ vec2 c=uv*2.0-1.0; c*=1.0+uCurvature*dot(c,c); return c*0.5+0.5; }

vec2 fitUv(vec2 uv, out float mask){
  if (uImageSize.x <= 0.0 || uImageSize.y <= 0.0) {
    mask = 0.0;
    return uv;
  }

  float canvasAspect = iResolution.x / iResolution.y;
  float imgAspect = uImageSize.x / uImageSize.y;

  // Scale factors for cover: we want the image to be at least as wide AND tall as canvas
  float scaleX, scaleY;
  if (imgAspect > canvasAspect) {
    // Image is wider → fit by height (crop left/right)
    scaleX = imgAspect / canvasAspect;
    scaleY = 1.0;
  } else {
    // Image is taller → fit by width (crop top/bottom)
    scaleX = 1.0;
    scaleY = canvasAspect / imgAspect;
  }

  // Center the scaled image
  vec2 offset = vec2((1.0 - scaleX) * 0.5, (1.0 - scaleY) * 0.5);

  // Map canvas UV to image UV (values will exceed 0..1 where cropping occurs)
  vec2 imgUv = (uv - offset) / vec2(scaleX, scaleY);

  // Mask is always 1.0 inside canvas because we cover entirely (no empty areas)
  mask = 1.0;

  // Clamp to texture edges to avoid sampling outside image bounds
  vec2 clamped = clamp(imgUv, 0.0, 1.0);

  // Flip Y to correct WebGL origin
  clamped.y = 1.0 - clamped.y;

  return clamped;
}

void main(){
  time = iTime*0.333333;
  vec2 uv = vUv;
  if(uCurvature!=0.0) uv=barrel(uv);
  vec2 wp = worldPos(uv);

  float emission;
  vec3 col = getColor(wp, emission);

  if(uChromaticAberration!=0.0){
    float caX = uChromaticAberration/iResolution.x*uScale*uAspect;
    float e0;
    vec3 colR = getColor(wp+vec2(caX, 0.0), e0);
    vec3 colB = getColor(wp-vec2(caX, 0.0), e0);
    col += (colR*vec3(1,0,0) + col*vec3(0,1,0) + colB*vec3(0,0,1))*0.35;
  }

  if(uUseImage>0.5){
    float imgMask;
    vec2 imgUv = fitUv(uv, imgMask);
    vec3 imgCol = texture2D(uImage, imgUv).rgb * imgMask;
    vec3 factor = max(col, vec3(emission));
    vec3 mult = imgCol * factor;
    col = mix(col, mult, uImageOpacity);
  }
  col *= uTint*uBrightness;
  if(uDither>0.0) col+=(hash21(gl_FragCoord.xy)-0.5)*(uDither*0.003922);
  gl_FragColor=vec4(col,1.0);
}`;

// GL helpers
function hexToRgb(hex){
  let h=hex.replace('#','').trim();
  if(h.length===3) h=h.split('').map(c=>c+c).join('');
  const n=parseInt(h,16);
  return [((n>>16)&255)/255,((n>>8)&255)/255,(n&255)/255];
}
function mkShader(gl,t,src){ const s=gl.createShader(t); gl.shaderSource(s,src); gl.compileShader(s); return s; }
function mkProg(gl,v,f){ const p=gl.createProgram(); gl.attachShader(p,mkShader(gl,gl.VERTEX_SHADER,v)); gl.attachShader(p,mkShader(gl,gl.FRAGMENT_SHADER,f)); gl.linkProgram(p); return p; }

function loadImgTex(gl,url, isRemote, cachedImg, onReady){
  const tex=gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,255]));
  const applyToTex = (imgEl) => {
    gl.bindTexture(gl.TEXTURE_2D,tex);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,imgEl);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    if (onReady) onReady(imgEl);
  };

  if (cachedImg) {
    if (cachedImg.complete && cachedImg.naturalWidth > 0) {
      applyToTex(cachedImg);
    } else {
      cachedImg.addEventListener('load', () => applyToTex(cachedImg), { once: true });
    }
    return tex;
  }

  const img=new Image();
  if (isRemote) img.crossOrigin='anonymous';
  img.onload=()=>applyToTex(img);
  img.onerror=()=>console.warn('FaultyTerminal image failed to load:', url);
  img.src=url;
  return tex;
}

function resolveImageUrl(imageUrl){
  if (!imageUrl) return { url: null, isRemote: false };
  const isRemote = /^https?:\/\//i.test(imageUrl);
  if (isRemote) {
    return { url: `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`, isRemote: true };
  }
  return { url: imageUrl, isRemote: false };
}

function buildDeadMask(gl, deadZones, gridMul, scale, aspect){
  const gx=Math.ceil(gridMul[0]*15*scale*aspect);
  const gy=Math.ceil(gridMul[1]*15*scale);
  const data=new Uint8Array(gx*gy);
  deadZones.forEach(({x1,y1,x2,y2})=>{
    const cx0=Math.floor(x1*gx), cx1=Math.ceil(x2*gx);
    const cy0=Math.floor(y1*gy), cy1=Math.ceil(y2*gy);
    for(let cy=cy0;cy<cy1;cy++) for(let cx=cx0;cx<cx1;cx++){
      if(cx>=0&&cx<gx&&cy>=0&&cy<gy) data[cy*gx+cx]=255;
    }
  });
  const tex=gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.LUMINANCE,gx,gy,0,gl.LUMINANCE,gl.UNSIGNED_BYTE,data);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  return {tex,gx,gy};
}

export default function FaultyTerminal({
  scale=2, gridMul=[2,1], digitSize=1.1, timeScale=0.5, pause=false,
  scanlineIntensity=0.5, glitchAmount=1, flickerAmount=1, noiseAmp=1,
  chromaticAberration=1.5, dither=0, curvature=0.1, tint='#eef0f2',
  mouseReact=true, mouseStrength=0.5,
  dpr=Math.min(typeof window!=='undefined'?window.devicePixelRatio||1:1,2),
  pageLoadAnimation=true, brightness=0.6,
  imageUrl=null, imageOpacity=1,
  preloadUrls=[],
  deadZones=[],
  onReady,
  style,
}){
  const ctnRef=useRef(null);
  const glRef=useRef(null);
  const progRef=useRef(null);
  const uniRef=useRef({});
  const deadRef=useRef(null);
  const deadDirtyRef=useRef(true);
  const deadZonesRef=useRef(deadZones);
  const imgTexRef=useRef(null);
  const texCacheRef=useRef(new Map());
  const imageUrlRef=useRef(imageUrl);
  const mouseRef=useRef({x:0.5,y:0.5});
  const smoothRef=useRef({x:0.5,y:0.5});
  const mouseDirtyRef=useRef(false);
  const frozenRef=useRef(0);
  const loadStartRef=useRef(0);
  const timeOffRef=useRef(Math.random()*100);
  const clickRef=useRef({x:0,y:0,startT:0,active:false});
  const aspectRef=useRef(1);
  const opacityRef=useRef(imageOpacity);
  const opacityTargetRef=useRef(imageOpacity);
  const onReadyRef=useRef(onReady);
  const readyStateRef=useRef({
    shader: false,
    assets: preloadUrls.length === 0,
    notified: false,
  });
  const renderProfile=useMemo(getRenderProfile,[]);
  const renderDpr=Math.min(dpr,renderProfile.maxDpr);

  const pauseRef = useRef(pause);
  const mouseReactRef = useRef(mouseReact);
  const pageLoadAnimationRef = useRef(pageLoadAnimation);
  const brightnessRef = useRef(brightness);
  const mouseStrengthRef = useRef(mouseStrength);
  const scanlineIntensityRef = useRef(scanlineIntensity);
  const glitchAmountRef = useRef(glitchAmount);
  const flickerAmountRef = useRef(flickerAmount);
  const noiseAmpRef = useRef(noiseAmp);
  const chromaticAberrationRef = useRef(chromaticAberration);
  const ditherValRef = useRef(0);
  const curvatureRef = useRef(curvature);
  const tintVecRef = useRef(hexToRgb(tint));
  const scaleRef = useRef(scale);
  const gridMulRef = useRef(gridMul);
  const digitSizeRef = useRef(digitSize);
  const timeScaleRef = useRef(timeScale);

  const tintVec=useMemo(()=>hexToRgb(tint),[tint]);
  const ditherVal=useMemo(()=>typeof dither==='boolean'?(dither?1:0):dither,[dither]);
  const notifyReady=useCallback(()=>{
    const ready=readyStateRef.current;
    if(ready.notified||!ready.shader||!ready.assets) return;
    ready.notified=true;
    onReadyRef.current?.();
  },[]);

  useEffect(()=>{
    deadZonesRef.current = deadZones;
    deadDirtyRef.current = true;
  },[deadZones]);
  useEffect(()=>{ opacityTargetRef.current = imageOpacity; },[imageOpacity]);
  useEffect(()=>{ onReadyRef.current = onReady; },[onReady]);
  useEffect(()=>{ pauseRef.current = pause; },[pause]);
  useEffect(()=>{ mouseReactRef.current = mouseReact; },[mouseReact]);
  useEffect(()=>{ pageLoadAnimationRef.current = pageLoadAnimation; },[pageLoadAnimation]);
  useEffect(()=>{ brightnessRef.current = brightness; },[brightness]);
  useEffect(()=>{ mouseStrengthRef.current = mouseStrength; },[mouseStrength]);
  useEffect(()=>{ scanlineIntensityRef.current = scanlineIntensity; },[scanlineIntensity]);
  useEffect(()=>{ glitchAmountRef.current = glitchAmount; },[glitchAmount]);
  useEffect(()=>{ flickerAmountRef.current = flickerAmount; },[flickerAmount]);
  useEffect(()=>{ noiseAmpRef.current = noiseAmp; },[noiseAmp]);
  useEffect(()=>{ chromaticAberrationRef.current = chromaticAberration; },[chromaticAberration]);
  useEffect(()=>{ ditherValRef.current = ditherVal; },[ditherVal]);
  useEffect(()=>{ curvatureRef.current = curvature; },[curvature]);
  useEffect(()=>{ tintVecRef.current = tintVec; },[tintVec]);
  useEffect(()=>{ scaleRef.current = scale; },[scale]);
  useEffect(()=>{ gridMulRef.current = gridMul; },[gridMul]);
  useEffect(()=>{ digitSizeRef.current = digitSize; },[digitSize]);
  useEffect(()=>{ timeScaleRef.current = timeScale; },[timeScale]);

  const loadImageTexture = useCallback((url) => {
    const gl = glRef.current;
    if (!gl) return;
    const resolved = resolveImageUrl(url);
    if (!resolved.url) {
      imgTexRef.current = null;
      return;
    }
    const cached = texCacheRef.current.get(resolved.url);
    if (cached) {
      imgTexRef.current = cached;
      return;
    }
    const cachedImg = getCachedImage(resolved.url);
    const entry = { tex: null, ready: false, size: null };
    const tex = loadImgTex(gl, resolved.url, resolved.isRemote, cachedImg, (imgEl) => {
      entry.ready = true;
      entry.size = { w: imgEl.naturalWidth || imgEl.width, h: imgEl.naturalHeight || imgEl.height };
    });
    entry.tex = tex;
    if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
      entry.ready = true;
      entry.size = { w: cachedImg.naturalWidth, h: cachedImg.naturalHeight };
    }
    texCacheRef.current.set(resolved.url, entry);
    imgTexRef.current = entry;
  }, []);

  useEffect(() => {
    imageUrlRef.current = imageUrl;
    loadImageTexture(imageUrl);
  }, [imageUrl, loadImageTexture]);

  useEffect(() => {
    const urls = Array.from(new Set((preloadUrls || []).filter(Boolean)));
    if (urls.length === 0) {
      readyStateRef.current.assets = true;
      notifyReady();
      return undefined;
    }
    readyStateRef.current.assets = false;
    const resolvedUrls = urls.map((url) => resolveImageUrl(url)).filter((r) => r.url);
    const preloadList = resolvedUrls.map((r) => r.url);
    let cancelled = false;
    let frameId = 0;
    let attempts = 0;

    const prepareTextures = () => {
      const gl = glRef.current;
      if (!gl) {
        attempts += 1;
        if (attempts >= 4) return;
        frameId = requestAnimationFrame(prepareTextures);
        return;
      }

      preloadImages(preloadList).finally(() => {
        if (cancelled || glRef.current !== gl) return;
        resolvedUrls.forEach((r) => {
          if (texCacheRef.current.has(r.url)) return;
          const cachedImg = getCachedImage(r.url);
          const entry = { tex: null, ready: false, size: null };
          const tex = loadImgTex(gl, r.url, r.isRemote, cachedImg, (imgEl) => {
            entry.ready = true;
            entry.size = { w: imgEl.naturalWidth || imgEl.width, h: imgEl.naturalHeight || imgEl.height };
          });
          entry.tex = tex;
          if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
            entry.ready = true;
            entry.size = { w: cachedImg.naturalWidth, h: cachedImg.naturalHeight };
          }
          texCacheRef.current.set(r.url, entry);
        });
        try {
          gl.finish();
        } catch {
          // The transition safety timeout handles a lost WebGL context.
        }
        readyStateRef.current.assets = true;
        notifyReady();
      });
    };

    prepareTextures();
    return () => {
      cancelled = true;
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [notifyReady, preloadUrls]);

  const onMouseMove=useCallback(e=>{
    if (!mouseReactRef.current) return;
    const ctn=ctnRef.current; if(!ctn) return;
    const r=ctn.getBoundingClientRect();
    mouseRef.current={x:(e.clientX-r.left)/r.width, y:1-(e.clientY-r.top)/r.height};
    mouseDirtyRef.current=true;
  },[]);

  const onClick=useCallback(e=>{
    const ctn=ctnRef.current; if(!ctn) return;
    const r=ctn.getBoundingClientRect();
    clickRef.current={
      x:(e.clientX-r.left)/r.width*scale*aspectRef.current,
      y:(1-(e.clientY-r.top)/r.height)*scale,
      startT:performance.now(), active:true,
    };
  },[scale]);

  useEffect(()=>{
    const ctn=ctnRef.current; if(!ctn) return undefined;
    const textureCache=texCacheRef.current;
    const canvas=document.createElement('canvas');
    canvas.style.cssText='width:100%;height:100%;display:block;cursor:crosshair;';
    ctn.appendChild(canvas);
    const gl=canvas.getContext('webgl',{
      antialias:renderProfile.antialias,
    }); if(!gl) return undefined;
    glRef.current=gl;
    gl.clearColor(0,0,0,1);

    const prog=mkProg(gl,vert,frag);
    progRef.current=prog;
    gl.useProgram(prog);

    const posBuf=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,posBuf);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
    const pL=gl.getAttribLocation(prog,'position');
    gl.enableVertexAttribArray(pL); gl.vertexAttribPointer(pL,2,gl.FLOAT,false,0,0);
    const uvBuf=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([0,0,2,0,0,2]),gl.STATIC_DRAW);
    const uL=gl.getAttribLocation(prog,'uv');
    gl.enableVertexAttribArray(uL); gl.vertexAttribPointer(uL,2,gl.FLOAT,false,0,0);

    const uni={};
    [
      'iTime','iResolution','uScale','uAspect','uGridMul','uDigitSize',
      'uScanlineIntensity','uGlitchAmount','uFlickerAmount','uNoiseAmp',
      'uChromaticAberration','uDither','uCurvature','uTint','uMouse',
      'uMouseStrength','uUseMouse','uPageLoadProgress','uUsePageLoadAnimation',
      'uBrightness','uImage','uUseImage','uImageOpacity','uImageSize',
      'uClickPos','uClickTime','uHasClick','uDeadMask','uDeadMaskSize',
    ].forEach(n=>{ uni[n]=gl.getUniformLocation(prog,n); });
    uniRef.current=uni;

    function uploadStatics(){
      gl.uniform1f(uni.uScale,scaleRef.current);
      gl.uniform2fv(uni.uGridMul,gridMulRef.current);
      gl.uniform1f(uni.uDigitSize,digitSizeRef.current);
      gl.uniform1f(uni.uScanlineIntensity,scanlineIntensityRef.current);
      gl.uniform1f(uni.uGlitchAmount,glitchAmountRef.current);
      gl.uniform1f(uni.uFlickerAmount,flickerAmountRef.current);
      gl.uniform1f(uni.uNoiseAmp,noiseAmpRef.current);
      gl.uniform1f(uni.uChromaticAberration,chromaticAberrationRef.current);
      gl.uniform1f(uni.uDither,ditherValRef.current);
      gl.uniform1f(uni.uCurvature,curvatureRef.current);
      gl.uniform3f(uni.uTint,tintVecRef.current[0],tintVecRef.current[1],tintVecRef.current[2]);
      gl.uniform1f(uni.uMouseStrength,mouseStrengthRef.current);
      gl.uniform1f(uni.uUseMouse,mouseReactRef.current?1:0);
      gl.uniform1f(uni.uUsePageLoadAnimation,pageLoadAnimationRef.current?1:0);
      gl.uniform1f(uni.uBrightness,brightnessRef.current);
      gl.uniform1i(uni.uImage,0);
      gl.uniform1i(uni.uDeadMask,1);
    }
    uploadStatics();
    loadImageTexture(imageUrlRef.current);

    function resize(){
      const w=ctn.offsetWidth, h=ctn.offsetHeight;
      canvas.width=Math.max(1,Math.floor(w*renderDpr));
      canvas.height=Math.max(1,Math.floor(h*renderDpr));
      gl.viewport(0,0,canvas.width,canvas.height);
      aspectRef.current=w/h;
      gl.useProgram(prog);
      gl.uniform2f(uni.iResolution,canvas.width,canvas.height);
      gl.uniform1f(uni.uAspect,aspectRef.current);
      deadDirtyRef.current=true;
    }
    const ro=new ResizeObserver(()=>resize()); ro.observe(ctn); resize();

    let contextLost=false;
    let readyNotified=false;
    const onContextLost=e=>{ e.preventDefault(); contextLost=true; };
    const onContextRestored=()=>{ contextLost=false; deadDirtyRef.current=true; };
    canvas.addEventListener('webglcontextlost',onContextLost);
    canvas.addEventListener('webglcontextrestored',onContextRestored);

    const update=t=>{
      if(contextLost||(pauseRef.current&&readyNotified)) return;
      if(pageLoadAnimationRef.current&&loadStartRef.current===0) loadStartRef.current=t;
      gl.useProgram(prog);

      const e=(t*0.001+timeOffRef.current)*timeScaleRef.current;
      gl.uniform1f(uni.iTime,e); frozenRef.current=e;

      if(pageLoadAnimationRef.current&&loadStartRef.current>0)
        gl.uniform1f(uni.uPageLoadProgress,Math.min((t-loadStartRef.current)/2000,1));

      if(mouseReactRef.current&&mouseDirtyRef.current){
        const sm=smoothRef.current, m=mouseRef.current;
        sm.x+=(m.x-sm.x)*0.08; sm.y+=(m.y-sm.y)*0.08;
        gl.uniform2f(uni.uMouse, sm.x*scaleRef.current*aspectRef.current, sm.y*scaleRef.current);
        if(Math.abs(m.x-sm.x)<0.0001&&Math.abs(m.y-sm.y)<0.0001) mouseDirtyRef.current=false;
      }

      const ck=clickRef.current;
      if(ck.active){
        const el=(t-ck.startT)/1000;
        if(el>2.5) ck.active=false;
        gl.uniform2f(uni.uClickPos,ck.x,ck.y);
        gl.uniform1f(uni.uClickTime,el);
        gl.uniform1f(uni.uHasClick,1.0);
      } else gl.uniform1f(uni.uHasClick,0.0);

      if(deadDirtyRef.current){
        if(deadRef.current) gl.deleteTexture(deadRef.current.tex);
        deadRef.current=buildDeadMask(gl,deadZonesRef.current,gridMulRef.current,scaleRef.current,aspectRef.current);
        gl.uniform2f(uni.uDeadMaskSize,deadRef.current.gx,deadRef.current.gy);
        deadDirtyRef.current=false;
      }

      uploadStatics();

      const imgEntry=imgTexRef.current;
      if(imgEntry?.tex){ gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D,imgEntry.tex); }
      const targetOpacity = opacityTargetRef.current;
      const currentOpacity = opacityRef.current;
      const nextOpacity = currentOpacity + (targetOpacity - currentOpacity) * 0.08;
      opacityRef.current = nextOpacity;
      const useImage = imgEntry && imgEntry.ready && nextOpacity > 0.001;
      gl.uniform1f(uni.uUseImage, useImage ? 1 : 0);
      gl.uniform1f(uni.uImageOpacity,nextOpacity);
      if (imgEntry?.size) {
        gl.uniform2f(uni.uImageSize, imgEntry.size.w, imgEntry.size.h);
      } else {
        gl.uniform2f(uni.uImageSize, 1, 1);
      }
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D,deadRef.current.tex);

      gl.drawArrays(gl.TRIANGLES,0,3);
      if(!readyNotified){
        // Force the driver's deferred shader work to complete while the
        // transition shutter is closed, never during the visible reveal.
        try {
          gl.finish();
        } catch {
          // A lost context is handled by the bounded transition fallback.
        }
        readyNotified=true;
        readyStateRef.current.shader=true;
        notifyReady();
      }
    };
    const unsubscribeFrame=subscribeFrame(update,{
      fps:renderProfile.animationFps,
    });

    ctn.addEventListener('mousemove',onMouseMove);
    ctn.addEventListener('click',onClick);

    return()=>{
      unsubscribeFrame(); ro.disconnect();
      ctn.removeEventListener('mousemove',onMouseMove);
      ctn.removeEventListener('click',onClick);
      canvas.removeEventListener('webglcontextlost',onContextLost);
      canvas.removeEventListener('webglcontextrestored',onContextRestored);
      if(canvas.parentElement===ctn) ctn.removeChild(canvas);
      if(deadRef.current?.tex) gl.deleteTexture(deadRef.current.tex);
      textureCache.forEach((entry) => gl.deleteTexture(entry.tex));
      textureCache.clear();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      loadStartRef.current=0; timeOffRef.current=Math.random()*100;
    };
  },[
    renderDpr,renderProfile,loadImageTexture,
    onMouseMove,onClick,notifyReady,
  ]);

  return (
    <div
      ref={ctnRef}
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
