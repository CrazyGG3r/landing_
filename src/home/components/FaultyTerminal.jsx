import { useEffect, useRef, useMemo, useCallback, useState } from 'react';

// useDeadZonesFromRefs (exported)
export function useDeadZonesFromRefs(containerRef, elementRefs = []) {
  const [deadZones, setDeadZones] = useState([]);
  const timerRef = useRef(null);

  const compute = useCallback(() => {
    const ctn = containerRef.current;
    if (!ctn) return;
    const cr = ctn.getBoundingClientRect();
    const zones = [];
    elementRefs.forEach(ref => {
      const el = ref?.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      zones.push({
        x1: (r.left - cr.left) / cr.width,
        x2: (r.right - cr.left) / cr.width,
        y1: 1 - (r.bottom - cr.top) / cr.height,
        y2: 1 - (r.top - cr.top) / cr.height,
      });
    });
    setDeadZones(zones);
  }, [containerRef, ...elementRefs]);

  const scheduleCompute = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(compute, 100);
  }, [compute]);

  useEffect(() => {
    compute();

    const ro = new ResizeObserver(scheduleCompute);
    const mo = new MutationObserver(scheduleCompute);
    const ctn = containerRef.current;
    if (ctn) ro.observe(ctn);

    elementRefs.forEach(ref => {
      const el = ref?.current;
      if (!el) return;
      ro.observe(el);
      mo.observe(el, { characterData: true, childList: true, subtree: true });
    });

    window.addEventListener('resize', scheduleCompute);
    window.addEventListener('orientationchange', scheduleCompute);
    return () => {
      clearTimeout(timerRef.current);
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener('resize', scheduleCompute);
      window.removeEventListener('orientationchange', scheduleCompute);
    };
  }, [compute, scheduleCompute]);

  return deadZones;
}

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

vec3 getColor(vec2 wp){
  float bar=(step(mod(wp.y/uAspect+time*20.0,1.0),0.2)*0.4+1.0)*uScanlineIntensity;
  float d=displace(wp);
  wp.x += d + (uGlitchAmount!=1.0 ? d*(uGlitchAmount-1.0) : 0.0);

  vec2 grid = uGridMul*15.0;
  vec2 s = floor(wp*grid)/grid;
  vec2 p = wp*grid;

  float intensity;
  if(isDeadCell(s)){
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

  return vec3(bgGrid(wp)) + vec3(0.9)*mid + sum*0.1*bar;
}

vec2 barrel(vec2 uv){ vec2 c=uv*2.0-1.0; c*=1.0+uCurvature*dot(c,c); return c*0.5+0.5; }

void main(){
  time = iTime*0.333333;
  vec2 uv = vUv;
  if(uCurvature!=0.0) uv=barrel(uv);
  vec2 wp = worldPos(uv);

  vec3 col = getColor(wp);

  if(uChromaticAberration!=0.0){
    float caX = uChromaticAberration/iResolution.x*uScale*uAspect;
    vec3 colR = getColor(wp+vec2(caX, 0.0));
    vec3 colB = getColor(wp-vec2(caX, 0.0));
    col += (colR*vec3(1,0,0) + col*vec3(0,1,0) + colB*vec3(0,0,1))*0.35;
  }

  if(uUseImage>0.5) col+=texture2D(uImage,uv).rgb*uImageOpacity;
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

function loadImgTex(gl,url){
  const tex=gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,255]));
  const img=new Image(); img.crossOrigin='anonymous';
  img.onload=()=>{
    gl.bindTexture(gl.TEXTURE_2D,tex);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  };
  img.src=url; return tex;
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
  scale=2.3, gridMul=[2,1], digitSize=1.1, timeScale=0.5, pause=false,
  scanlineIntensity=0.5, glitchAmount=1, flickerAmount=1, noiseAmp=1,
  chromaticAberration=1.5, dither=0, curvature=0.1, tint='#eef0f2',
  mouseReact=true, mouseStrength=0.5,
  dpr=Math.min(typeof window!=='undefined'?window.devicePixelRatio||1:1,2),
  pageLoadAnimation=true, brightness=0.6,
  imageUrl=null, imageOpacity=0.35,
  deadZones=[],
  style,
}){
  const ctnRef=useRef(null);
  const glRef=useRef(null);
  const progRef=useRef(null);
  const uniRef=useRef({});
  const deadRef=useRef(null);
  const deadDirtyRef=useRef(true);
  const imgTexRef=useRef(null);
  const mouseRef=useRef({x:0.5,y:0.5});
  const smoothRef=useRef({x:0.5,y:0.5});
  const mouseDirtyRef=useRef(false);
  const frozenRef=useRef(0);
  const rafRef=useRef(0);
  const loadStartRef=useRef(0);
  const timeOffRef=useRef(Math.random()*100);
  const clickRef=useRef({x:0,y:0,startT:0,active:false});
  const aspectRef=useRef(1);

  const tintVec=useMemo(()=>hexToRgb(tint),[tint]);
  const ditherVal=useMemo(()=>typeof dither==='boolean'?(dither?1:0):dither,[dither]);

  useEffect(()=>{ deadDirtyRef.current=true; },[deadZones]);

  const onMouseMove=useCallback(e=>{
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
    const canvas=document.createElement('canvas');
    canvas.style.cssText='width:100%;height:100%;display:block;cursor:crosshair;';
    ctn.appendChild(canvas);
    const gl=canvas.getContext('webgl'); if(!gl) return undefined;
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
      'uBrightness','uImage','uUseImage','uImageOpacity',
      'uClickPos','uClickTime','uHasClick','uDeadMask','uDeadMaskSize',
    ].forEach(n=>{ uni[n]=gl.getUniformLocation(prog,n); });
    uniRef.current=uni;

    const proxyUrl=imageUrl?`https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`:null;
    imgTexRef.current=proxyUrl?loadImgTex(gl,proxyUrl):null;

    function uploadStatics(){
      gl.uniform1f(uni.uScale,scale);
      gl.uniform2fv(uni.uGridMul,gridMul);
      gl.uniform1f(uni.uDigitSize,digitSize);
      gl.uniform1f(uni.uScanlineIntensity,scanlineIntensity);
      gl.uniform1f(uni.uGlitchAmount,glitchAmount);
      gl.uniform1f(uni.uFlickerAmount,flickerAmount);
      gl.uniform1f(uni.uNoiseAmp,noiseAmp);
      gl.uniform1f(uni.uChromaticAberration,chromaticAberration);
      gl.uniform1f(uni.uDither,ditherVal);
      gl.uniform1f(uni.uCurvature,curvature);
      gl.uniform3f(uni.uTint,tintVec[0],tintVec[1],tintVec[2]);
      gl.uniform1f(uni.uMouseStrength,mouseStrength);
      gl.uniform1f(uni.uUseMouse,mouseReact?1:0);
      gl.uniform1f(uni.uUsePageLoadAnimation,pageLoadAnimation?1:0);
      gl.uniform1f(uni.uBrightness,brightness);
      gl.uniform1f(uni.uUseImage,imgTexRef.current?1:0);
      gl.uniform1f(uni.uImageOpacity,imageOpacity);
      gl.uniform1i(uni.uImage,0);
      gl.uniform1i(uni.uDeadMask,1);
    }
    uploadStatics();

    function resize(){
      const w=ctn.offsetWidth, h=ctn.offsetHeight;
      canvas.width=w*dpr; canvas.height=h*dpr;
      gl.viewport(0,0,canvas.width,canvas.height);
      aspectRef.current=w/h;
      gl.useProgram(prog);
      gl.uniform2f(uni.iResolution,canvas.width,canvas.height);
      gl.uniform1f(uni.uAspect,aspectRef.current);
      deadDirtyRef.current=true;
    }
    const ro=new ResizeObserver(()=>resize()); ro.observe(ctn); resize();

    const update=t=>{
      rafRef.current=requestAnimationFrame(update);
      if(pageLoadAnimation&&loadStartRef.current===0) loadStartRef.current=t;
      gl.useProgram(prog);

      if(!pause){
        const e=(t*0.001+timeOffRef.current)*timeScale;
        gl.uniform1f(uni.iTime,e); frozenRef.current=e;
      } else gl.uniform1f(uni.iTime,frozenRef.current);

      if(pageLoadAnimation&&loadStartRef.current>0)
        gl.uniform1f(uni.uPageLoadProgress,Math.min((t-loadStartRef.current)/2000,1));

      if(mouseReact&&mouseDirtyRef.current){
        const sm=smoothRef.current, m=mouseRef.current;
        sm.x+=(m.x-sm.x)*0.08; sm.y+=(m.y-sm.y)*0.08;
        gl.uniform2f(uni.uMouse, sm.x*scale*aspectRef.current, sm.y*scale);
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
        deadRef.current=buildDeadMask(gl,deadZones,gridMul,scale,aspectRef.current);
        gl.uniform2f(uni.uDeadMaskSize,deadRef.current.gx,deadRef.current.gy);
        deadDirtyRef.current=false;
      }

      const imgTex=imgTexRef.current;
      if(imgTex){ gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D,imgTex); }
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D,deadRef.current.tex);

      gl.drawArrays(gl.TRIANGLES,0,3);
    };
    rafRef.current=requestAnimationFrame(update);

    if(mouseReact) ctn.addEventListener('mousemove',onMouseMove);
    ctn.addEventListener('click',onClick);

    return()=>{
      cancelAnimationFrame(rafRef.current); ro.disconnect();
      if(mouseReact) ctn.removeEventListener('mousemove',onMouseMove);
      ctn.removeEventListener('click',onClick);
      if(canvas.parentElement===ctn) ctn.removeChild(canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      loadStartRef.current=0; timeOffRef.current=Math.random()*100;
    };
  },[
    dpr,pause,timeScale,scale,gridMul,digitSize,scanlineIntensity,glitchAmount,
    flickerAmount,noiseAmp,chromaticAberration,ditherVal,curvature,tintVec,
    mouseReact,mouseStrength,pageLoadAnimation,brightness,imageUrl,imageOpacity,
    onMouseMove,onClick,
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
