import { useRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';

// ╔══════════════════════════════════════════════════════════════╗
// ║  MODULE: shaders.js                                          ║
// ╚══════════════════════════════════════════════════════════════╝

const vertexShader = `
varying vec2 v_texcoord;
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_texcoord = uv;
}`;

const fragmentShader = `
varying vec2 v_texcoord;
uniform vec2  u_mouse; uniform vec2  u_resolution; uniform float u_pixelRatio;
uniform float u_shapeSize; uniform float u_roundness; uniform float u_borderSize;
uniform float u_circleSize; uniform float u_circleEdge;
uniform float u_impactSize; uniform float u_impactEdge;
uniform vec3  u_colorA; uniform vec3  u_colorB; uniform vec3  u_colorC;
uniform float u_spreadA; uniform float u_spreadB; uniform float u_spreadC;
uniform float u_intensityA; uniform float u_intensityB; uniform float u_intensityC;
uniform vec2  u_shapePos;
uniform float u_noise; uniform float u_smoke; uniform float u_dither; uniform float u_time;
uniform sampler2D u_texture; uniform int u_useTexture;

vec2 coord(in vec2 p) {
    p = p/u_resolution.xy;
    if(u_resolution.x>u_resolution.y){ p.x*=u_resolution.x/u_resolution.y; p.x+=(u_resolution.y-u_resolution.x)/u_resolution.y/2.0; }
    else{ p.y*=u_resolution.y/u_resolution.x; p.y+=(u_resolution.x-u_resolution.y)/u_resolution.x/2.0; }
    p-=0.5; p*=vec2(-1.0,1.0); return p;
}
#define st0 coord(gl_FragCoord.xy)
#define mx  coord(u_mouse*u_pixelRatio)

float sdRoundRect(vec2 p,vec2 b,float r){vec2 d=abs(p-0.5)*4.2-b+vec2(r);return min(max(d.x,d.y),0.0)+length(max(d,0.0))-r;}
float sdCircle(vec2 st,vec2 c){return length(st-c)*2.0;}
float fill(float x,float sz,float e){return 1.0-smoothstep(sz-e,sz+e,x);}
float strokeEdge(float x,float size,float w,float edge){
    float afw=length(vec2(dFdx(x),dFdy(x)))*0.70710678;
    float d=smoothstep(size-edge-afw,size+edge+afw,x+w*0.5)-smoothstep(size-edge-afw,size+edge+afw,x-w*0.5);
    return clamp(d,0.0,1.0);
}
float hash21(vec2 p){p=fract(p*vec2(127.1,311.7));p+=dot(p,p+19.19);return fract(p.x*p.y);}
float vnoise(vec2 p){
    vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
    return mix(mix(hash21(i),hash21(i+vec2(1,0)),f.x),mix(hash21(i+vec2(0,1)),hash21(i+vec2(1,1)),f.x),f.y);
}
float fbm(vec2 p){
    float v=0.0,a=0.5; mat2 rot=mat2(0.87758,0.47943,-0.47943,0.87758);
    for(int i=0;i<5;i++){v+=a*vnoise(p);p=rot*p*2.0;a*=0.5;} return v;
}
float smokeWarp(vec2 p){
    float t1=u_time*0.10,t2=u_time*0.15;
    vec2 q=vec2(fbm(p+t1),fbm(p+vec2(5.2,1.3)+t1));
    vec2 r=vec2(fbm(p+q*1.5+t2),fbm(p+q*1.5+vec2(8.3,2.8)+t2));
    return fbm(p+r*0.8);
}
float bayer4(vec2 p){
    int x=int(mod(p.x,4.0)),y=int(mod(p.y,4.0)); float m[16];
    m[0]=0.0;m[1]=8.0;m[2]=2.0;m[3]=10.0;m[4]=12.0;m[5]=4.0;m[6]=14.0;m[7]=6.0;
    m[8]=3.0;m[9]=11.0;m[10]=1.0;m[11]=9.0;m[12]=15.0;m[13]=7.0;m[14]=13.0;m[15]=5.0;
    return m[y*4+x]/16.0;
}
void main(){
    vec2 st=st0+0.5, relMouse=mx*vec2(1.,-1.)+0.5, shapeOff=u_shapePos-0.5;
    float mInf=1.0-smoothstep(0.0,0.45,length(st-relMouse));

    // Impact circle drives the edge distortion (was circleSize/circleEdge)
    float baseEdge=fill(sdCircle(st,relMouse),u_impactSize,u_impactEdge);

    float noiseEdge=0.0;
    if(u_noise>0.0){float n=vnoise(st*16.0+u_time*2.0)*2.0-1.0; noiseEdge=n*u_noise*0.36*mInf;}
    float smokeEdge=0.0,smokeVol=0.0;
    if(u_smoke>0.0){
        vec2 p=(st-shapeOff-0.5)*3.5; float sw=smokeWarp(p);
        float df=1.0-smoothstep(0.0,0.5*max(mInf,0.05),length(st-relMouse));
        smokeEdge=(sw-0.5)*u_smoke*0.6*mInf; smokeVol=pow(sw,2.5)*df*u_smoke;
    }
    float shift=mInf*0.03; vec2 stOff=st-shapeOff;
    float extra=noiseEdge+smokeEdge;
    float eA=max(baseEdge+u_spreadA*mInf*0.14+extra,0.001);
    float eB=max(baseEdge+u_spreadB*mInf*0.14+extra,0.001);
    float eC=max(baseEdge+u_spreadC*mInf*0.14+extra,0.001);
    float maskA=strokeEdge(sdRoundRect(stOff+vec2(shift,0),vec2(u_shapeSize*0.9),u_roundness),0.0,u_borderSize,eA)*4.0*u_intensityA;
    float maskB=strokeEdge(sdRoundRect(stOff,vec2(u_shapeSize),u_roundness),0.0,u_borderSize,eB)*4.0*u_intensityB;
    float maskC=strokeEdge(sdRoundRect(stOff-vec2(shift,0),vec2(u_shapeSize*1.1),u_roundness),0.0,u_borderSize,eC)*4.0*u_intensityC;

    // Subject colour: texture or layer colours
    vec3 subjectColor;
    if(u_useTexture==1){
        subjectColor=texture2D(u_texture,v_texcoord).rgb;
    } else {
        subjectColor=vec3(1.0);
    }

    vec3 col=u_colorA*maskA+u_colorB*maskB+u_colorC*maskC;
    float white=strokeEdge(sdRoundRect(stOff,vec2(u_shapeSize),u_roundness),0.0,u_borderSize,baseEdge)*4.0;
    float blend=clamp(mInf*2.0,0.0,1.0);
    
    // Keep the color mixing as is - RGB colors are always computed
    col=mix(subjectColor*white,col,blend);
    
    // MODIFIED: Alpha is now controlled by cursor proximity
    // Base alpha from RGB masks (these are the circles)
    float rgbAlpha = max(maskA, max(maskB, maskC));
    
    // White shape alpha (background)
    float whiteAlpha = white;
    
    // Blend between them based on cursor: 
    // - Far from cursor: show white shape (subject)
    // - Near cursor: show RGB circles
    float a = mix(whiteAlpha, rgbAlpha, blend);
    
    if(u_useTexture==1){ 
        a *= texture2D(u_texture,v_texcoord).a; 
    }
    if(u_smoke>0.0){
        vec3 st2=mix(u_colorB,vec3(1.0),0.25); 
        col+=st2*smokeVol*0.55; 
        a=max(a,smokeVol*0.70);
    }
    if(u_dither>0.0&&a>0.001){
        vec2 spx=gl_FragCoord.xy/u_pixelRatio;
        vec2 dpx=spx+vec2(floor(mod(u_time*7.0,4.0)),floor(mod(u_time*5.0,4.0)));
        float thr=mix(bayer4(dpx),hash21(spx*0.5+u_time*13.7),0.35);
        float q=step(thr,a*(1.0/max(u_dither,0.001))*u_dither);
        col=mix(col,col*q,u_dither); 
        a=mix(a,a*q,u_dither);
    }
    gl_FragColor=vec4(clamp(col,0.0,1.0),clamp(a,0.0,1.0));
}`;

// ╔══════════════════════════════════════════════════════════════╗
// ║  MODULE: storage.js                                          ║
// ╚══════════════════════════════════════════════════════════════╝

const STORAGE_KEY = 'shapeblur-settings';
const DEFAULT_SETTINGS = {
  version: 1,
  layers: [
    { color: '#ff2244', spread: -1.0, intensity: 1.0 },
    { color: '#ffffff', spread:  0.0, intensity: 1.0 },
    { color: '#2266ff', spread:  1.0, intensity: 1.0 },
  ],
  impact: { size: 0.25, edge: 1.0 },
  noise:  { enabled: false, intensity: 0.5 },
  smoke:  { enabled: false, intensity: 0.6 },
  dither: { enabled: false, intensity: 0.5 },
};

function getStorageAdapter() {
  const c = typeof window !== 'undefined' ? window.storage : null;
  if (c?.get && c?.set && c?.delete) return c;
  if (typeof window !== 'undefined' && window.localStorage)
    return { get: async k=>({value:window.localStorage.getItem(k)}), set: async(k,v)=>window.localStorage.setItem(k,v), delete: async k=>window.localStorage.removeItem(k) };
  return null;
}
function isValidSettings(v) {
  return v?.layers?.length===3 && v.layers.every(l=>typeof l.color==='string'&&typeof l.spread==='number'&&typeof l.intensity==='number');
}
async function loadSettings() {
  try {
    const s=getStorageAdapter(); if(!s) return DEFAULT_SETTINGS;
    const res=await s.get(STORAGE_KEY);
    if(res?.value){
      const p=JSON.parse(res.value);
      if(isValidSettings(p)) return {
        ...DEFAULT_SETTINGS,...p,
        impact:{...DEFAULT_SETTINGS.impact,...(p.impact??{})},
        noise:{...DEFAULT_SETTINGS.noise,...(p.noise??{})},
        smoke:{...DEFAULT_SETTINGS.smoke,...(p.smoke??{})},
        dither:{...DEFAULT_SETTINGS.dither,...(p.dither??{})},
      };
    }
  } catch(_){}
  return DEFAULT_SETTINGS;
}
async function saveSettings(data) { try{const s=getStorageAdapter();if(s)await s.set(STORAGE_KEY,JSON.stringify({version:1,...data}));}catch(_){} }
async function resetSettings() { try{const s=getStorageAdapter();if(s)await s.delete(STORAGE_KEY);}catch(_){} return DEFAULT_SETTINGS; }
function hexToRgb01(hex){return[parseInt(hex.slice(1,3),16)/255,parseInt(hex.slice(3,5),16)/255,parseInt(hex.slice(5,7),16)/255];}

// ╔══════════════════════════════════════════════════════════════╗
// ║  MODULE: ShapeBlur.jsx                                       ║
// ╚══════════════════════════════════════════════════════════════╝

const ShapeBlur = ({
  layers, followMouse,
  impactSize, impactEdge,
  noiseEnabled, noiseIntensity,
  smokeEnabled, smokeIntensity,
  ditherEnabled, ditherIntensity,
  textureSrc,
}) => {
  const mountRef = useRef();
  const matRef   = useRef();
  const stateRef = useRef({});

  useEffect(() => {
    stateRef.current = {
      followMouse,
      impactSize, impactEdge,
      noiseEnabled, noiseIntensity,
      smokeEnabled, smokeIntensity,
      ditherEnabled, ditherIntensity,
    };
  }, [followMouse, impactSize, impactEdge, noiseEnabled, noiseIntensity, smokeEnabled, smokeIntensity, ditherEnabled, ditherIntensity]);

  // Three.js init — runs once
  useEffect(() => {
    const mount = mountRef.current; if (!mount) return;
    let animId, time=0, lastTime=0;
    const vMouse=new THREE.Vector2(), vMouseDamp=new THREE.Vector2(), vResolution=new THREE.Vector2();
    const vShapeTarget=new THREE.Vector2(0.5,0.5), vShapeDamp=new THREE.Vector2(0.5,0.5);
    const scene=new THREE.Scene(), camera=new THREE.OrthographicCamera();
    camera.position.z=1;
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
    renderer.setClearColor(0x000000,0);
    mount.appendChild(renderer.domElement);

    const [rA,gA,bA]=hexToRgb01(layers[0].color);
    const [rB,gB,bB]=hexToRgb01(layers[1].color);
    const [rC,gC,bC]=hexToRgb01(layers[2].color);

    const material = new THREE.ShaderMaterial({vertexShader, fragmentShader, uniforms:{
      u_mouse:      {value:vMouseDamp},
      u_resolution: {value:vResolution},
      u_pixelRatio: {value:2},
      u_shapeSize:  {value:1.0},
      u_roundness:  {value:1.0},
      u_borderSize: {value:0.05},
      u_circleSize: {value:0.25},
      u_circleEdge: {value:1.0},
      u_impactSize: {value:stateRef.current.impactSize??0.25},
      u_impactEdge: {value:stateRef.current.impactEdge??1.0},
      u_colorA:     {value:new THREE.Vector3(rA,gA,bA)},
      u_colorB:     {value:new THREE.Vector3(rB,gB,bB)},
      u_colorC:     {value:new THREE.Vector3(rC,gC,bC)},
      u_spreadA:    {value:layers[0].spread},
      u_spreadB:    {value:layers[1].spread},
      u_spreadC:    {value:layers[2].spread},
      u_intensityA: {value:layers[0].intensity},
      u_intensityB: {value:layers[1].intensity},
      u_intensityC: {value:layers[2].intensity},
      u_shapePos:   {value:new THREE.Vector2(0.5,0.5)},
      u_noise:      {value:0},
      u_smoke:      {value:0},
      u_dither:     {value:0},
      u_time:       {value:0},
      u_texture:    {value:null},
      u_useTexture: {value:0},
    }, transparent:true});

    matRef.current = material;
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(1,1), material);
    scene.add(quad);

    const onMove = e => {
      const rect=mount.getBoundingClientRect(), src=e.touches?e.touches[0]:e;
      vMouse.set(src.clientX-rect.left, src.clientY-rect.top);
      if(stateRef.current.followMouse) vShapeTarget.set((src.clientX-rect.left)/rect.width,(src.clientY-rect.top)/rect.height);
    };
    window.addEventListener('mousemove', onMove,{passive:true});
    window.addEventListener('pointermove',onMove,{passive:true});
    window.addEventListener('touchmove', onMove,{passive:false});

    const resize = () => {
      const w=mount.clientWidth, h=mount.clientHeight, dpr=Math.min(window.devicePixelRatio,2);
      renderer.setSize(w,h); renderer.setPixelRatio(dpr);
      camera.left=-w/2; camera.right=w/2; camera.top=h/2; camera.bottom=-h/2;
      camera.updateProjectionMatrix();
      quad.scale.set(w,h,1);
      vResolution.set(w,h).multiplyScalar(dpr);
      material.uniforms.u_pixelRatio.value=dpr;
    };
    resize();
    window.addEventListener('resize',resize);
    const ro=new ResizeObserver(resize); ro.observe(mount);

    const update = () => {
      time=performance.now()*0.001;
      const dt=Math.min(time-lastTime,0.05); lastTime=time;
      ['x','y'].forEach(k=>{ vMouseDamp[k]=THREE.MathUtils.damp(vMouseDamp[k],vMouse[k],8,dt); });
      if(!stateRef.current.followMouse) vShapeTarget.set(0.5,0.5);
      vShapeDamp.x=THREE.MathUtils.damp(vShapeDamp.x,vShapeTarget.x,5,dt);
      vShapeDamp.y=THREE.MathUtils.damp(vShapeDamp.y,vShapeTarget.y,5,dt);
      material.uniforms.u_shapePos.value.set(vShapeDamp.x,vShapeDamp.y);
      const sr=stateRef.current;
      material.uniforms.u_impactSize.value = sr.impactSize??0.25;
      material.uniforms.u_impactEdge.value = sr.impactEdge??1.0;
      material.uniforms.u_noise.value  = sr.noiseEnabled  ? sr.noiseIntensity  : 0;
      material.uniforms.u_smoke.value  = sr.smokeEnabled  ? (sr.smokeIntensity??0.6) : 0;
      material.uniforms.u_dither.value = sr.ditherEnabled ? sr.ditherIntensity : 0;
      material.uniforms.u_time.value   = time;
      renderer.render(scene,camera);
      animId=requestAnimationFrame(update);
    };
    update();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize',resize);
      window.removeEventListener('mousemove',onMove);
      window.removeEventListener('pointermove',onMove);
      window.removeEventListener('touchmove',onMove);
      ro.disconnect();
      if(mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Hot-update layer uniforms
  useEffect(() => {
    const m=matRef.current; if(!m) return;
    ['A','B','C'].forEach((k,i)=>{
      const [r,g,b]=hexToRgb01(layers[i].color);
      m.uniforms[`u_color${k}`].value.set(r,g,b);
      m.uniforms[`u_spread${k}`].value   = layers[i].spread;
      m.uniforms[`u_intensity${k}`].value= layers[i].intensity;
    });
  }, [layers]);

  // Hot-update texture
  useEffect(() => {
    const m=matRef.current; if(!m) return;
    if (!textureSrc) {
      m.uniforms.u_useTexture.value=0;
      m.uniforms.u_texture.value=null;
      return;
    }
    const loader=new THREE.TextureLoader();
    loader.load(textureSrc, tex=>{
      tex.minFilter=THREE.LinearFilter;
      m.uniforms.u_texture.value=tex;
      m.uniforms.u_useTexture.value=1;
    });
  }, [textureSrc]);

  return <div ref={mountRef} style={{width:'100%',height:'100%'}}/>;
};

// ╔══════════════════════════════════════════════════════════════╗
// ║  MODULE: design-tokens                                       ║
// ╚══════════════════════════════════════════════════════════════╝

const T = {
  bg:       '#0c0c0e',
  surface:  'rgba(22,22,28,0.97)',
  border:   'rgba(255,255,255,0.07)',
  borderHi: 'rgba(255,255,255,0.13)',
  textPri:  '#e2e2e6',
  textSec:  '#6b6b78',
  textDim:  '#36363e',
  radius:   { sm:8, md:12, lg:16, xl:20 },
  font:     "'Inter',system-ui,sans-serif",
};

// ╔══════════════════════════════════════════════════════════════╗
// ║  MODULE: Portal.jsx                                          ║
// ╚══════════════════════════════════════════════════════════════╝

function Portal({ children }) {
  const el = useRef(null);
  if (!el.current) {
    el.current = document.createElement('div');
    Object.assign(el.current.style,{position:'fixed',inset:0,pointerEvents:'none',zIndex:9999});
  }
  useEffect(()=>{ const n=el.current; document.body.appendChild(n); return()=>document.body.removeChild(n); },[]);
  return createPortal(children, el.current);
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  MODULE: ArcSlider.jsx                                       ║
// ╚══════════════════════════════════════════════════════════════╝

function ArcSlider({ value, min=0, max=1, step=0.01, color, onChange, disabled=false }) {
  const pct = ((value-min)/(max-min))*100;
  return (
    <div style={{display:'flex',flexDirection:'column',gap:6,opacity:disabled?0.28:1,transition:'opacity 0.2s',pointerEvents:disabled?'none':'all'}}>
      <div style={{position:'relative',height:36,display:'flex',alignItems:'center'}}>
        <div style={{position:'absolute',left:0,right:0,height:4,borderRadius:4,background:'rgba(255,255,255,0.06)'}}>
          <div style={{height:'100%',width:`${pct}%`,borderRadius:4,background:`linear-gradient(90deg,${color}55,${color})`,boxShadow:disabled?'none':`0 0 6px ${color}66`}}/>
        </div>
        <div style={{
          position:'absolute',left:`calc(${pct}% - 8px)`,
          width:16,height:16,borderRadius:16,
          background:disabled?'#2a2a30':'#fff',
          border:`2.5px solid ${disabled?'#3a3a44':color}`,
          boxShadow:disabled?'none':`0 0 0 3px ${color}22, 0 2px 8px rgba(0,0,0,0.5)`,
          pointerEvents:'none',transition:'border-color 0.2s, box-shadow 0.2s',
        }}/>
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e=>onChange(parseFloat(e.target.value))}
          style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:0,cursor:'pointer',margin:0,WebkitAppearance:'none'}}/>
      </div>
    </div>
  );
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  MODULE: LayerCard.jsx                                       ║
// ╚══════════════════════════════════════════════════════════════╝

const LAYER_META = [
  { label:'Layer A', hint:'← left · −10%' },
  { label:'Layer B', hint:'· center ·' },
  { label:'Layer C', hint:'→ right · +10%' },
];

function LayerCard({ index, layer, onChange }) {
  const { label, hint } = LAYER_META[index];
  return (
    <div style={{
      background:'rgba(255,255,255,0.025)',border:`1px solid ${T.border}`,
      borderRadius:T.radius.lg,padding:'14px 14px 16px',
      display:'flex',flexDirection:'column',gap:14,
      flex:'1 1 160px',minWidth:140,
    }}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
        <div>
          <div style={{color:T.textPri,fontWeight:600,fontSize:12,letterSpacing:'0.01em'}}>{label}</div>
          <div style={{color:T.textSec,fontSize:10,marginTop:2}}>{hint}</div>
        </div>
        <label style={{cursor:'pointer',flexShrink:0,position:'relative'}}>
          <div style={{
            width:32,height:32,borderRadius:10,background:layer.color,
            border:'2px solid rgba(255,255,255,0.12)',
            boxShadow:`0 0 14px ${layer.color}66, inset 0 1px 0 rgba(255,255,255,0.2)`,
          }}/>
          <input type="color" value={layer.color} onChange={e=>onChange({...layer,color:e.target.value})}
            style={{position:'absolute',opacity:0,width:0,height:0,pointerEvents:'none'}}/>
        </label>
      </div>
      <div style={{height:1,background:T.border}}/>
      {[['Spread',layer.spread,-2,2,v=>onChange({...layer,spread:v})],
        ['Intensity',layer.intensity,0,2,v=>onChange({...layer,intensity:v})]
       ].map(([lbl,val,mn,mx,fn])=>(
        <div key={lbl} style={{display:'flex',flexDirection:'column',gap:4}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:2}}>
            <span style={{color:T.textSec,fontSize:10,letterSpacing:'0.07em',textTransform:'uppercase'}}>{lbl}</span>
            <span style={{color:layer.color,fontSize:11,fontVariantNumeric:'tabular-nums',fontWeight:600}}>{val.toFixed(2)}</span>
          </div>
          <ArcSlider value={val} min={mn} max={mx} step={0.01} color={layer.color} onChange={fn}/>
        </div>
      ))}
    </div>
  );
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  MODULE: ImpactCard.jsx  (Impact Size + Edge sliders)       ║
// ╚══════════════════════════════════════════════════════════════╝

const IMPACT_COLOR = '#a78bfa';

function ImpactCard({ impact, onChange }) {
  return (
    <div style={{
      background:'rgba(255,255,255,0.025)',border:`1px solid ${T.border}`,
      borderRadius:T.radius.lg,padding:'14px 14px 16px',
      display:'flex',flexDirection:'column',gap:14,
      flex:'1 1 160px',minWidth:140,
    }}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
        <div>
          <div style={{color:T.textPri,fontWeight:600,fontSize:12,letterSpacing:'0.01em'}}>Impact</div>
          <div style={{color:T.textSec,fontSize:10,marginTop:2}}>mouse influence</div>
        </div>
        <div style={{
          width:32,height:32,borderRadius:10,
          background:`radial-gradient(circle,${IMPACT_COLOR}55,${IMPACT_COLOR}11)`,
          border:`2px solid ${IMPACT_COLOR}44`,
          boxShadow:`0 0 14px ${IMPACT_COLOR}44`,
          display:'flex',alignItems:'center',justifyContent:'center',
          flexShrink:0,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="2.5" fill={IMPACT_COLOR}/>
            <circle cx="7" cy="7" r="5.5" stroke={IMPACT_COLOR} strokeWidth="1" strokeOpacity="0.5"/>
          </svg>
        </div>
      </div>
      <div style={{height:1,background:T.border}}/>
      {[['Size', impact.size, 0, 1, v=>onChange({...impact,size:v})],
        ['Edge', impact.edge, 0, 3, v=>onChange({...impact,edge:v})]
       ].map(([lbl,val,mn,mx,fn])=>(
        <div key={lbl} style={{display:'flex',flexDirection:'column',gap:4}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:2}}>
            <span style={{color:T.textSec,fontSize:10,letterSpacing:'0.07em',textTransform:'uppercase'}}>{lbl}</span>
            <span style={{color:IMPACT_COLOR,fontSize:11,fontVariantNumeric:'tabular-nums',fontWeight:600}}>{val.toFixed(2)}</span>
          </div>
          <ArcSlider value={val} min={mn} max={mx} step={0.01} color={IMPACT_COLOR} onChange={fn}/>
        </div>
      ))}
    </div>
  );
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  MODULE: ImportCard.jsx  (PNG / JPEG / SVG subject import)  ║
// ╚══════════════════════════════════════════════════════════════╝

const IMPORT_COLOR = '#34d399';

function ImportCard({ texName, onImport, onClear }) {
  const fileRef = useRef();
  const hasFile = !!texName;
  return (
    <div style={{
      background:'rgba(255,255,255,0.025)',border:`1px solid ${T.border}`,
      borderRadius:T.radius.lg,padding:'14px 14px 16px',
      display:'flex',flexDirection:'column',gap:14,
      flex:'1 1 160px',minWidth:140,
    }}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
        <div>
          <div style={{color:T.textPri,fontWeight:600,fontSize:12,letterSpacing:'0.01em'}}>Subject</div>
          <div style={{color:T.textSec,fontSize:10,marginTop:2}}>PNG · JPEG · SVG</div>
        </div>
        <div style={{
          width:32,height:32,borderRadius:10,
          background:`rgba(52,211,153,0.12)`,
          border:`2px solid ${IMPORT_COLOR}44`,
          boxShadow:hasFile?`0 0 14px ${IMPORT_COLOR}44`:'none',
          display:'flex',alignItems:'center',justifyContent:'center',
          flexShrink:0,transition:'box-shadow 0.2s',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="3" width="10" height="8" rx="1.5" stroke={IMPORT_COLOR} strokeWidth="1.2" strokeOpacity="0.7"/>
            <path d="M7 9V5M5 7l2-2 2 2" stroke={IMPORT_COLOR} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div style={{height:1,background:T.border}}/>

      <input ref={fileRef} type="file" accept=".png,.jpg,.jpeg,.svg"
        style={{display:'none'}} onChange={onImport}/>

      {hasFile ? (
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{
            flex:1,background:'rgba(52,211,153,0.08)',
            border:`1px solid ${IMPORT_COLOR}33`,
            borderRadius:T.radius.sm,padding:'5px 8px',
            fontSize:10,color:IMPORT_COLOR,
            overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',
          }}>{texName}</div>
          <button onClick={onClear} style={{
            background:'rgba(255,60,60,0.1)',border:'1px solid rgba(255,60,60,0.2)',
            color:'#ff6b6b',borderRadius:T.radius.sm,
            width:26,height:26,display:'flex',alignItems:'center',justifyContent:'center',
            cursor:'pointer',flexShrink:0,fontSize:13,padding:0,
          }}>✕</button>
        </div>
      ) : (
        <button onClick={()=>fileRef.current.click()} style={{
          background:`rgba(52,211,153,0.08)`,
          border:`1px solid ${IMPORT_COLOR}33`,
          borderRadius:T.radius.sm,padding:'7px 10px',
          fontSize:11,color:IMPORT_COLOR,cursor:'pointer',
          display:'flex',alignItems:'center',gap:6,justifyContent:'center',
          transition:'background 0.2s, border-color 0.2s',
        }}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 8V3M3 5.5l2.5-2.5 2.5 2.5" stroke={IMPORT_COLOR} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 9.5h9" stroke={IMPORT_COLOR} strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
          </svg>
          Import Image
        </button>
      )}
    </div>
  );
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  MODULE: PillToggle.jsx                                      ║
// ╚══════════════════════════════════════════════════════════════╝

function PillToggle({ enabled, onToggle, color }) {
  return (
    <button onClick={onToggle} style={{
      width:38,height:20,borderRadius:10,border:'none',flexShrink:0,
      background:enabled?color:'rgba(255,255,255,0.08)',
      cursor:'pointer',padding:0,position:'relative',
      transition:'background 0.22s',boxShadow:enabled?`0 0 10px ${color}55`:'none',
    }}>
      <div style={{
        position:'absolute',top:2,left:enabled?20:2,
        width:16,height:16,borderRadius:8,background:'#fff',
        boxShadow:'0 1px 4px rgba(0,0,0,0.35)',
        transition:'left 0.22s cubic-bezier(0.34,1.56,0.64,1)',
      }}/>
    </button>
  );
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  MODULE: FxCard.jsx                                          ║
// ╚══════════════════════════════════════════════════════════════╝

function FxCard({ label, accentColor, enabled, intensity, onToggle, onIntensity, anchorRef, onClose }) {
  const cardRef = useRef();
  const [sty, setSty] = useState({ opacity:0, transform:'translate(-50%,-100%) scale(0.95)' });

  useEffect(()=>{
    const place=()=>{
      if(!anchorRef.current||!cardRef.current) return;
      const r=anchorRef.current.getBoundingClientRect();
      cardRef.current.style.top =`${r.top-12}px`;
      cardRef.current.style.left=`${r.left+r.width/2}px`;
    };
    place();
    requestAnimationFrame(()=>setSty({opacity:1,transform:'translate(-50%,-100%) scale(1)'}));
    window.addEventListener('resize',place);
    window.addEventListener('scroll',place,true);
    return()=>{ window.removeEventListener('resize',place); window.removeEventListener('scroll',place,true); };
  },[anchorRef]);

  useEffect(()=>{
    const h=e=>{
      if(cardRef.current?.contains(e.target)) return;
      if(anchorRef.current?.contains(e.target)) return;
      onClose();
    };
    const t=setTimeout(()=>{
      document.addEventListener('mousedown',h);
      document.addEventListener('touchstart',h,{passive:true});
    },50);
    return()=>{ clearTimeout(t); document.removeEventListener('mousedown',h); document.removeEventListener('touchstart',h); };
  },[onClose,anchorRef]);

  return (
    <Portal>
      <div ref={cardRef} style={{
        position:'fixed',top:0,left:0,
        transform:sty.transform,opacity:sty.opacity,
        transition:'opacity 0.18s ease, transform 0.22s cubic-bezier(0.34,1.1,0.64,1)',
        width:260,pointerEvents:'all',
        background:T.surface,border:`1px solid ${T.borderHi}`,
        borderRadius:T.radius.xl,overflow:'hidden',
        boxShadow:`0 32px 64px rgba(0,0,0,0.8),0 0 0 1px rgba(255,255,255,0.04),0 1px 0 rgba(255,255,255,0.07) inset`,
        touchAction:'auto',
      }}>
        <div style={{height:2,background:`linear-gradient(90deg,transparent 0%,${accentColor} 40%,${accentColor}88 70%,transparent 100%)`}}/>
        <div style={{padding:'14px 16px 16px',display:'flex',flexDirection:'column',gap:14}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:10,height:10,borderRadius:'50%',background:accentColor,boxShadow:`0 0 10px ${accentColor}66`,flexShrink:0}}/>
              <div>
                <div style={{color:T.textPri,fontSize:13,fontWeight:600,letterSpacing:'0.01em'}}>{label}</div>
                <div style={{color:enabled?accentColor:T.textSec,fontSize:10,marginTop:1,fontWeight:500,transition:'color 0.2s'}}>{enabled?'Active':'Off'}</div>
              </div>
            </div>
            <PillToggle enabled={enabled} onToggle={onToggle} color={accentColor}/>
          </div>
          <div style={{height:1,background:T.border,margin:'0 -16px'}}/>
          <div style={{display:'flex',flexDirection:'column',gap:2}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
              <span style={{color:T.textSec,fontSize:10,letterSpacing:'0.08em',textTransform:'uppercase'}}>Intensity</span>
              <span style={{color:enabled?accentColor:T.textDim,fontSize:12,fontWeight:600,fontVariantNumeric:'tabular-nums',transition:'color 0.2s'}}>
                {Math.round(intensity*100)}<span style={{fontSize:9,opacity:0.5}}>%</span>
              </span>
            </div>
            <ArcSlider value={intensity} color={accentColor} onChange={onIntensity} disabled={!enabled}/>
          </div>
        </div>
        <div style={{
          position:'absolute',bottom:-5,left:'50%',
          transform:'translateX(-50%) rotate(45deg)',
          width:9,height:9,background:T.surface,
          border:`1px solid ${T.borderHi}`,borderTop:'none',borderLeft:'none',
        }}/>
      </div>
    </Portal>
  );
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  MODULE: FxControlFinal.jsx                                  ║
// ╚══════════════════════════════════════════════════════════════╝

function FxControlFinal({ label, accentColor, glowColor, enabled, intensity, onToggle, onIntensity }) {
  const [open,setOpen]=useState(false);
  const chipRef=useRef();
  return (
    <>
      <button ref={chipRef} onClick={()=>setOpen(v=>!v)} style={{
        display:'flex',alignItems:'center',gap:6,
        background:enabled?`linear-gradient(150deg,${accentColor}20,${accentColor}0c)`:'rgba(255,255,255,0.03)',
        border:`1px solid ${enabled?accentColor+'44':T.border}`,
        borderRadius:T.radius.sm,padding:'5px 10px',
        cursor:'pointer',transition:'all 0.2s',
        boxShadow:enabled?`0 0 18px ${glowColor}28`:'none',
        outline:open?`2px solid ${accentColor}44`:'none',outlineOffset:2,
      }}>
        <span style={{color:enabled?T.textPri:T.textSec,fontSize:11,fontWeight:500,letterSpacing:'0.02em',transition:'color 0.2s'}}>{label}</span>
        <div style={{width:4,height:4,borderRadius:2,flexShrink:0,background:enabled?accentColor:'rgba(255,255,255,0.1)',boxShadow:enabled?`0 0 5px ${glowColor}`:'none',transition:'all 0.2s'}}/>
        <svg width="9" height="9" viewBox="0 0 9 9" style={{opacity:0.25,transform:open?'rotate(180deg)':'none',transition:'transform 0.2s',flexShrink:0}}>
          <polyline points="1.5,3 4.5,6.5 7.5,3" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open&&<FxCard label={label} accentColor={accentColor} enabled={enabled} intensity={intensity}
        onToggle={onToggle} onIntensity={onIntensity} anchorRef={chipRef} onClose={()=>setOpen(false)}/>}
    </>
  );
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  MODULE: StatusDot, ToggleBtn, SpaceBadge                   ║
// ╚══════════════════════════════════════════════════════════════╝

function StatusDot({ status }) {
  const map={saved:{c:'#3ddc84',l:'Saved'},saving:{c:'#f5a623',l:'Saving'},loaded:{c:'#4e9bff',l:'Loaded'},default:{c:'#ff4d4d',l:'Reset'}};
  const s=map[status]||map.saved;
  return (
    <div style={{display:'flex',alignItems:'center',gap:6,flexShrink:0}}>
      <div style={{width:6,height:6,borderRadius:3,background:s.c,boxShadow:`0 0 6px ${s.c}88`}}/>
      <span style={{color:T.textSec,fontSize:11}}>{s.l}</span>
    </div>
  );
}

function ToggleBtn({ open, onClick }) {
  return (
    <button onClick={onClick} style={{
      position:'fixed',bottom:24,right:20,zIndex:100,
      width:42,height:42,borderRadius:12,
      background:open?'rgba(255,255,255,0.09)':'rgba(255,255,255,0.04)',
      border:`1px solid ${open?T.borderHi:T.border}`,
      backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',
      display:'flex',alignItems:'center',justifyContent:'center',
      cursor:'pointer',transition:'all 0.2s',
      boxShadow:open?'0 0 24px rgba(255,255,255,0.07)':'none',
    }}>
      {open?(
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="2" y1="2" x2="12" y2="12" stroke="rgba(255,255,255,0.65)" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="12" y1="2" x2="2" y2="12" stroke="rgba(255,255,255,0.65)" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ):(
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="2" y1="4.5" x2="14" y2="4.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="2" y1="8"   x2="14" y2="8"   stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="2" y1="11.5" x2="14" y2="11.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="5.5" cy="4.5" r="1.8" fill={T.bg} stroke="rgba(255,255,255,0.45)" strokeWidth="1.2"/>
          <circle cx="10.5" cy="8"  r="1.8" fill={T.bg} stroke="rgba(255,255,255,0.45)" strokeWidth="1.2"/>
          <circle cx="6.5" cy="11.5" r="1.8" fill={T.bg} stroke="rgba(255,255,255,0.45)" strokeWidth="1.2"/>
        </svg>
      )}
    </button>
  );
}

function SpaceBadge({ active }) {
  return (
    <div style={{
      position:'fixed',bottom:24,left:20,zIndex:100,
      display:'flex',alignItems:'center',gap:8,
      background:'rgba(255,255,255,0.03)',
      border:`1px solid ${active?'rgba(255,255,255,0.12)':T.border}`,
      borderRadius:10,padding:'6px 12px',
      backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',
      transition:'border-color 0.2s',pointerEvents:'none',
    }}>
      <div style={{
        background:active?'rgba(255,255,255,0.12)':'rgba(255,255,255,0.05)',
        border:`1px solid ${active?'rgba(255,255,255,0.25)':'rgba(255,255,255,0.08)'}`,
        borderRadius:5,padding:'1px 8px',fontSize:10,letterSpacing:'0.05em',
        color:active?'#e2e2e6':'#36363e',fontFamily:'monospace',
        boxShadow:active?'0 0 8px rgba(255,255,255,0.1)':'none',
        transition:'all 0.2s',
      }}>SPACE</div>
      <span style={{color:active?T.textSec:T.textDim,fontSize:11,transition:'color 0.2s'}}>
        {active?'following':'hold to follow'}
      </span>
    </div>
  );
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  MODULE: useSettings.js                                      ║
// ╚══════════════════════════════════════════════════════════════╝

function useSettings() {
  const [layers, setLayers] = useState(DEFAULT_SETTINGS.layers);
  const [impact, setImpact] = useState(DEFAULT_SETTINGS.impact);
  const [noise,  setNoise]  = useState(DEFAULT_SETTINGS.noise);
  const [smoke,  setSmoke]  = useState(DEFAULT_SETTINGS.smoke);
  const [dither, setDither] = useState(DEFAULT_SETTINGS.dither);
  const [status, setStatus] = useState('loading');
  const saveTimer = useRef(null);

  useEffect(()=>{
    loadSettings().then(s=>{
      setLayers(s.layers);
      setImpact(s.impact??DEFAULT_SETTINGS.impact);
      setNoise(s.noise??DEFAULT_SETTINGS.noise);
      setSmoke(s.smoke??DEFAULT_SETTINGS.smoke);
      setDither(s.dither??DEFAULT_SETTINGS.dither);
      setStatus('loaded');
      setTimeout(()=>setStatus('saved'),1500);
    });
  },[]);

  const persist = useCallback((l,im,n,sm,d)=>{
    setStatus('saving');
    clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(()=>saveSettings({layers:l,impact:im,noise:n,smoke:sm,dither:d}).then(()=>setStatus('saved')),600);
  },[]);

  const updateLayer  = useCallback((i,v,im,n,sm,d)=>{ setLayers(p=>{const nx=p.map((l,j)=>j===i?v:l);persist(nx,im,n,sm,d);return nx;}); },[persist]);
  const updateImpact = useCallback((v,l,n,sm,d)=>{ setImpact(v); persist(l,v,n,sm,d); },[persist]);
  const updateNoise  = useCallback((p,l,im,sm,d)=>{ setNoise(pr=>{const n={...pr,...p};persist(l,im,n,sm,d);return n;}); },[persist]);
  const updateSmoke  = useCallback((p,l,im,n,d)=>{  setSmoke(pr=>{const sm={...pr,...p};persist(l,im,n,sm,d);return sm;}); },[persist]);
  const updateDither = useCallback((p,l,im,n,sm)=>{ setDither(pr=>{const d={...pr,...p};persist(l,im,n,sm,d);return d;}); },[persist]);
  const reset = useCallback(async()=>{
    const s=await resetSettings();
    setLayers(s.layers); setImpact(s.impact??DEFAULT_SETTINGS.impact);
    setNoise(s.noise); setSmoke(s.smoke); setDither(s.dither);
    setStatus('default'); setTimeout(()=>setStatus('saved'),1500);
  },[]);

  return { layers,impact,noise,smoke,dither,status,updateLayer,updateImpact,updateNoise,updateSmoke,updateDither,reset };
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  MODULE: App.jsx                                             ║
// ╚══════════════════════════════════════════════════════════════╝

export default function App() {
  const { layers,impact,noise,smoke,dither,status,updateLayer,updateImpact,updateNoise,updateSmoke,updateDither,reset } = useSettings();
  const [panelOpen,   setPanelOpen]   = useState(false);
  const [jsonView,    setJsonView]    = useState(false);
  const [followMouse, setFollowMouse] = useState(false);
  const [textureSrc,  setTextureSrc]  = useState(null);
  const [texName,     setTexName]     = useState('');

  // Scroll lock
  useEffect(()=>{
    const orig=document.body.style.overflow;
    document.body.style.overflow='hidden'; document.body.style.touchAction='none';
    const block=e=>{ if(e.target.closest?.('[data-scroll]')) return; e.preventDefault(); };
    document.addEventListener('touchmove',block,{passive:false});
    document.addEventListener('wheel',block,{passive:false});
    return()=>{ document.body.style.overflow=orig; document.body.style.touchAction=''; document.removeEventListener('touchmove',block); document.removeEventListener('wheel',block); };
  },[]);

  // Spacebar follow
  useEffect(()=>{
    const dn=e=>{if(e.code==='Space'){e.preventDefault();setFollowMouse(true);}};
    const up=e=>{if(e.code==='Space')setFollowMouse(false);};
    window.addEventListener('keydown',dn); window.addEventListener('keyup',up);
    return()=>{ window.removeEventListener('keydown',dn); window.removeEventListener('keyup',up); };
  },[]);
  useEffect(()=>{
    const s=()=>setFollowMouse(true),e=()=>setFollowMouse(false);
    window.addEventListener('touchstart',s,{passive:true}); window.addEventListener('touchend',e,{passive:true}); window.addEventListener('touchcancel',e,{passive:true});
    return()=>{ window.removeEventListener('touchstart',s); window.removeEventListener('touchend',e); window.removeEventListener('touchcancel',e); };
  },[]);

  const handleImport = useCallback(e=>{
    const file=e.target.files?.[0]; if(!file) return;
    const url=URL.createObjectURL(file);
    setTextureSrc(url);
    setTexName(file.name);
    e.target.value=''; // allow re-import of same file
  },[]);

  const handleClearTexture = useCallback(()=>{
    setTextureSrc(null); setTexName('');
  },[]);

  const jsonString = JSON.stringify({version:1,layers,impact,noise,smoke,dither,texture:texName||null},null,2);

  return (
    <div style={{
      background:T.bg,width:'100vw',height:'100vh',
      minHeight:'-webkit-fill-available',
      position:'fixed',inset:0,
      fontFamily:T.font,overflow:'hidden',touchAction:'none',
      userSelect:'none',WebkitUserSelect:'none',
    }}>
      {/* Canvas */}
      <div style={{position:'absolute',inset:0}}>
        <ShapeBlur
          layers={layers}
          followMouse={followMouse}
          impactSize={impact.size}
          impactEdge={impact.edge}
          noiseEnabled={noise.enabled}   noiseIntensity={noise.intensity}
          smokeEnabled={smoke.enabled}   smokeIntensity={smoke.intensity}
          ditherEnabled={dither.enabled} ditherIntensity={dither.intensity}
          textureSrc={textureSrc}
        />
      </div>

      {/* ── Panel ───────────────────────────────────────────────── */}
      <div style={{
        position:'fixed',bottom:0,left:0,right:0,zIndex:50,
        transform:panelOpen?'translateY(0)':'translateY(100%)',
        transition:'transform 0.36s cubic-bezier(0.32,0.72,0,1)',
        padding:'0 12px 76px',
      }}>
        <div style={{
          maxWidth:720,margin:'0 auto',
          background:T.surface,
          border:`1px solid ${T.borderHi}`,
          borderRadius:`${T.radius.xl}px ${T.radius.xl}px 0 0`,
          boxShadow:'0 -32px 80px rgba(0,0,0,0.75)',
        }}>
          <div data-scroll="true" style={{
            padding:'12px 16px 20px',
            display:'flex',flexDirection:'column',gap:14,
            overflowY:'auto',maxHeight:'78vh',
            WebkitOverflowScrolling:'touch',
          }}>
            {/* Drag handle */}
            <div style={{display:'flex',justifyContent:'center'}}>
              <div style={{width:36,height:3,borderRadius:2,background:'rgba(255,255,255,0.1)'}}/>
            </div>

            {/* ── Toolbar ─────────────────────────────────────── */}
            <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap',justifyContent:'space-between'}}>
              <StatusDot status={status}/>
              <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap',flex:1,justifyContent:'center'}}>
                <FxControlFinal label="Noise" accentColor="#c87eff" glowColor="#c87eff"
                  enabled={noise.enabled} intensity={noise.intensity}
                  onToggle={()=>updateNoise({enabled:!noise.enabled},layers,impact,smoke,dither)}
                  onIntensity={v=>updateNoise({intensity:v},layers,impact,smoke,dither)}/>
                <FxControlFinal label="Smoke" accentColor="#7ec8e3" glowColor="#7ec8e3"
                  enabled={smoke.enabled} intensity={smoke.intensity}
                  onToggle={()=>updateSmoke({enabled:!smoke.enabled},layers,impact,noise,dither)}
                  onIntensity={v=>updateSmoke({intensity:v},layers,impact,noise,dither)}/>
                <FxControlFinal label="Dither" accentColor="#f0c040" glowColor="#f0c040"
                  enabled={dither.enabled} intensity={dither.intensity}
                  onToggle={()=>updateDither({enabled:!dither.enabled},layers,impact,noise,smoke)}
                  onIntensity={v=>updateDither({intensity:v},layers,impact,noise,smoke)}/>
              </div>
              <div style={{display:'flex',gap:6,alignItems:'center',flexShrink:0}}>
                <button onClick={()=>setJsonView(v=>!v)} style={{
                  background:'rgba(255,255,255,0.04)',border:`1px solid ${T.border}`,
                  color:jsonView?T.textPri:T.textSec,borderRadius:T.radius.sm,
                  padding:'5px 10px',fontSize:11,cursor:'pointer',letterSpacing:'0.03em',transition:'color 0.2s',
                }}>{jsonView?'Hide JSON':'JSON'}</button>
                <button onClick={reset} style={{
                  background:'rgba(255,50,50,0.07)',border:'1px solid rgba(255,60,60,0.18)',
                  color:'#ff5555',borderRadius:T.radius.sm,
                  padding:'5px 10px',fontSize:11,cursor:'pointer',
                }}>Reset</button>
              </div>
            </div>

            {/* Divider */}
            <div style={{height:1,background:T.border}}/>

            {/* JSON view */}
            {jsonView&&(
              <pre style={{
                background:'rgba(0,0,0,0.4)',border:`1px solid ${T.border}`,
                borderRadius:T.radius.md,padding:'12px 14px',margin:0,
                color:'#58a6ff',fontSize:11,lineHeight:1.65,
                overflowX:'auto',maxHeight:160,overflowY:'auto',
                fontFamily:"'Fira Code','Courier New',monospace",
                userSelect:'text',WebkitUserSelect:'text',
              }}>{jsonString}</pre>
            )}

            {/* Cards row: Layer A/B/C + Impact + Import */}
            <div style={{display:'flex',gap:10,overflowX:'auto',paddingBottom:2,WebkitOverflowScrolling:'touch'}}>
              {layers.map((l,i)=>(
                <LayerCard key={i} index={i} layer={l}
                  onChange={v=>updateLayer(i,v,impact,noise,smoke,dither)}/>
              ))}
              <ImpactCard impact={impact}
                onChange={v=>updateImpact(v,layers,noise,smoke,dither)}/>
              <ImportCard texName={texName} onImport={handleImport} onClear={handleClearTexture}/>
            </div>
          </div>
        </div>
      </div>

      <SpaceBadge active={followMouse}/>
      <ToggleBtn open={panelOpen} onClick={()=>setPanelOpen(v=>!v)}/>
    </div>
  );
}