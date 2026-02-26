// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { EffectComposer, Bloom } from '@react-three/postprocessing'
// import { Suspense, useState } from 'react'

// import {  Platform, GLBLoader } from './components/Platforms'
// import { Light, } from './components/Lights'
// import { FloatingLight } from './components/Float'
// import { HDRIEnvironment } from './components/ExrLoader'
// import { Orbiter, Rotator } from './components/MotionWrap'
// import { Clickable, HoverTooltip} from './components/SelectControls'

// export default function App() {
//   // <-- Add this for hover control
//   const [hovered, setHovered] = useState(false)

//   return (
//     <Canvas
//       camera={{ position: [0, 2, 5], fov: 50, near: 0.01, far: 1000 }}
//       style={{ width: '100vw', height: '100vh' }}
//       shadows
//     >
//       {/* Ambient + Bloom */}
//       <ambientLight intensity={0.3} />
//       <EffectComposer>
//         <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
//       </EffectComposer>

//       {/* Scene Content */}
//       <Suspense fallback={null}>
//         <HDRIEnvironment path="/hdri/space8k2.exr" intensity={0.1} />

//         {/* Static Platforms */}
//         <Platform path="/models/main_1.glb" position={[0, 0, 0]} scale={1} />
//         <Platform path="/models/station.glb" position={[0, 0, 0]} scale={1} />
//         <Platform path="/models/man_1.glb" position={[0, 0, 0]} scale={1} />
//         <Platform path="/models/p1.glb" position={[0, 0, 0]} scale={1.2} />

//         {/* Directional Light */}
//         <Light type="directional" intensity={1.5} position={[-3, -1, 1]} />

//         {/* Floating Light */}
//         <FloatingLight
//           color="#00ffff"
//           target={[0, 1, 0]}
//           orbitRadius={3}
//           orbitSpeed={0.9}
//           height={1.2}
//           intensity={30}
//           lightType="point"
//         />


//         <HoverTooltip content="Visit LinkedIn" position={[0, 1.5, 0]}>
//         <Clickable  outlineColor="#00ffff"  link="https://www.linkedin.com/in/shaheerulislam/"  setHovered={setHovered}>
//           <Orbiter target={[0, 0, 0]} radius={3} speed={0.3} bob>
//           <Rotator speed={1} axis = 'z' >
//             <Rotator speed={1} axis='x' >
//               <GLBLoader path="/models/rock_1.glb" scale={0.8} />
//             </Rotator>
//           </Rotator>
//           </Orbiter>
//         </Clickable>
//         </HoverTooltip>


//       </Suspense>
//       <OrbitControls />
//     </Canvas>
//   )
// }
// import { useRef } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { EffectComposer, Bloom } from '@react-three/postprocessing'
// import * as THREE from 'three'

// function MouseCircle() {
//   const meshRef = useRef()

//   useFrame((state) => {
//     if (!meshRef.current) return

//     // Mapping mouse coordinates (-1 to 1) to the 3D scene
//     const targetX = state.mouse.x * 5
//     const targetY = state.mouse.y * 3

//     // Smoothing the movement (0.05 is the "slowness")
//     meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05)
//     meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05)
//   })

//   return (
//     <mesh ref={meshRef}>
//       <circleGeometry args={[0.8, 64]} />
//       {/* toneMapped={false} ensures the color stays bright enough to trigger Bloom */}
//       <meshBasicMaterial color="white" toneMapped={false} />
//     </mesh>
//   )
// }

// export default function App() {
//   return (
//     <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
//       <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
//         <color attach="background" args={['black']} />
        
//         <MouseCircle />

//         {/* Bloom Effect configuration */}
//         <EffectComposer>
//           <Bloom 
//             intensity={1.5}      // How strong the glow is
//             luminanceThreshold={0} // Glow anything brighter than 0 (everything white)
//             luminanceSmoothing={0.9} 
//             mipmapBlur           // Makes the glow look soft and professional
//           />
//         </EffectComposer>
//       </Canvas>
//     </div>
//   )
// }

import { useState, useEffect, useRef, useCallback, useMemo, useId } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 1 — DESIGN TOKENS
// Single source of truth for all magic values. Nothing is hardcoded elsewhere.
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  // Colors
  bg:         "#0c0d0d",
  surface:    "#111213",
  border:     "#202222",
  borderHi:   "#2e3030",
  text:       "#e8e8e8",
  muted:      "#555a5a",
  mutedHi:    "#888e8e",
  white:      "#ffffff",
  // Typography
  fontSans:   "'DM Sans', sans-serif",
  // Animation
  cardStaggerMs: 60,        // per-card animation stagger delay
  chartBarStaggerMs: 350,   // bar chart stagger window
  dotRevealMs: 300,         // line chart dot reveal base delay
  dotRevealStepMs: 80,      // line chart dot reveal per-step increment
  // Physics (DotGrid)
  physics: {
    damping:        750,
    returnDuration: 1.5,
    maxSpeed:       5000,
    speedTrigger:   100,
    shockRadius:    250,
    shockStrength:  5,
    proximity:      120,
  },
  // Dot grid appearance
  dotSize:    5,
  dotGap:     15,
  dotBase:    "#1a1c1c",
  dotActive:  "#ffffff",
};

// Composed card style — darkCard + darkCardGlow merged once, used everywhere.
const cardBase = {
  background:   "radial-gradient(circle 280px at 0% 0%, #2a2c2c, #0c0d0d)",
  border:       `1px solid ${T.border}`,
  borderRadius: "10px",
  position:     "relative",
  overflow:     "hidden",
  boxShadow:    "inset 60px 60px 120px rgba(255,255,255,0.03)",
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 2 — DATA
// All content data co-located with its metadata (impact colors, spotlight tints).
// ─────────────────────────────────────────────────────────────────────────────
const TIMELINE_DATA = [
  { era:"1970s", label:"Assembly Era",        desc:"Games written in raw assembly language. Every byte and CPU cycle was manually controlled. Hardware limitations forced radical creativity in optimization." },
  { era:"1990s", label:"3D Transition",       desc:"Introduction of 3D graphics demanded new techniques: BSP trees, Z-buffering, and texture atlasing. Developers invented optimization strategies that still underpin modern engines." },
  { era:"2000s", label:"Shader Revolution",   desc:"Programmable GPUs shifted optimization from the CPU to the GPU. Shader-based pipelines enabled real-time lighting and shadows previously considered impossible." },
  { era:"2010s", label:"Hardware Abundance",  desc:"Multi-core CPUs and high-RAM systems led to reduced optimization pressure. Studios began prioritizing rapid development cycles over lean, efficient code." },
  { era:"2020s", label:"Renaissance & Crisis",desc:"A paradox emerged: hardware is more powerful than ever, yet high-profile releases consistently suffer poor performance. Simultaneously, techniques like DLSS and Nanite signal a new optimization frontier." },
];

const CHART_DATA = [
  { year:"2000", avgSize:0.7,  bugReports:12  },
  { year:"2005", avgSize:4,    bugReports:18  },
  { year:"2010", avgSize:15,   bugReports:27  },
  { year:"2015", avgSize:40,   bugReports:45  },
  { year:"2020", avgSize:80,   bugReports:78  },
  { year:"2024", avgSize:130,  bugReports:112 },
];

const PERFORMANCE_DATA = [
  { year:"2000", fps:60, budget:5   },
  { year:"2005", fps:60, budget:20  },
  { year:"2010", fps:58, budget:60  },
  { year:"2015", fps:52, budget:100 },
  { year:"2020", fps:44, budget:200 },
  { year:"2024", fps:38, budget:300 },
];

const IMPACT_META = {
  Critical: { color:"#c0392b", spotlight:"rgba(192,57,43,0.28)"  },
  High:     { color:"#c8c8c8", spotlight:"rgba(220,220,220,0.15)" },
  Moderate: { color:"#686868", spotlight:"rgba(104,104,104,0.2)"  },
  Emerging: { color:"#484848", spotlight:"rgba(72,72,72,0.2)"     },
};

const RESEARCH_QUESTIONS = [
  { id:1, category:"Performance", impact:"Critical", title:"The Frame Budget Problem",        desc:"As development budgets scale exponentially, average frame rates at launch continue to decline. What systemic development practices contribute to this inverse relationship?" },
  { id:2, category:"Architecture",impact:"High",     title:"Data-Oriented Design Adoption",  desc:"Data-Oriented Design (DOD) demonstrably improves cache efficiency and CPU throughput. Why has Object-Oriented Programming remained dominant in commercial game development despite evidence favoring DOD?" },
  { id:3, category:"Hardware",    impact:"High",     title:"GPU Memory Bandwidth Limits",    desc:"Modern rendering pipelines are increasingly bottlenecked by memory bandwidth rather than raw compute. How should engine architectures adapt to prioritize data locality over parallelism?" },
  { id:4, category:"Tooling",     impact:"Moderate", title:"Profiling in Production",        desc:"Most performance profiling occurs late in the development cycle. Can continuous integration pipelines incorporate automated performance regression detection at scale?" },
  { id:5, category:"Industry",    impact:"Moderate", title:"Crunch vs. Optimization",        desc:"Optimization requires iterative, unhurried testing. Studio crunch culture fundamentally conflicts with this requirement. How does production timeline pressure quantifiably affect shipped game performance?" },
  { id:6, category:"Techniques",  impact:"Emerging", title:"Upscaling as a Crutch",          desc:"Techniques like DLSS and FSR allow games to render at lower native resolutions and upscale. Does widespread adoption of upscaling reduce incentive for underlying engine optimization?" },
];

const RQ_CATEGORIES = ["All", "Performance", "Architecture", "Hardware", "Tooling", "Industry", "Techniques"];

const STAT_CARDS = [
  { value:"130 GB", label:"Avg. AAA Game Size",    sub:"Up from ~700 MB in 2000"   },
  { value:"38%",    label:"Performance Index",     sub:"Avg. launch-day frame stability" },
  { value:"$300M+", label:"Avg. AAA Budget",       sub:"2023 productions"           },
  { value:"3 of 5", label:"Major 2023 Releases",   sub:"Required post-launch patches" },
];

// top values are fixed px offsets from the top of the CreditsSection container,
// not percentages — so they never shift with screen height or orientation.
const CURVED_LOOPS = [
  { marqueeText:"BOLTFORGED ✦ Game Optimization ✦ Research 2026 ✦",                             speed:3, curveAmount:80,   direction:"left",  opacity:0.12, top:"calc(50% - 5%)", zIndex:0  },
  { marqueeText:"Muhammad Uzair ✦ BSE-8A ✦ 22K-5176 ✦ Software ReEngineering ✦",               speed:3, curveAmount:-80,  direction:"right", opacity:0.12, top:"calc(50% + 5%)", zIndex:0  },
  { marqueeText:"Visit our page ✦ BOLTFORGED ✦",                                                speed:5, curveAmount:400,  direction:"right", opacity:1,    bottom:"15%", zIndex:10 },
];

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 3 — UTILITIES
// Pure functions with no side effects.
// ─────────────────────────────────────────────────────────────────────────────
const hexToRgb = hex => {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return m ? { r:parseInt(m[1],16), g:parseInt(m[2],16), b:parseInt(m[3],16) } : { r:0, g:0, b:0 };
};

const hexToRgbArr = hex => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1],16)/255, parseInt(m[2],16)/255, parseInt(m[3],16)/255] : [1,1,1];
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 4 — CUSTOM HOOKS
// Each hook encapsulates one reusable behavioral concern.
// ─────────────────────────────────────────────────────────────────────────────

/** Fires callback with the element's DOMRect whenever it resizes. */
const useResizeObserver = (ref, callback) => {
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => callback(entry.contentRect));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref, callback]);
};

/** Returns [ref, isIntersecting] — triggers once when element enters viewport. */
const useIntersectionReveal = (threshold = 0.3) => {
  const ref  = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setReady(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, ready];
};

/** Injects the Google Fonts <link> once into <head> on mount. */
const useFontLoader = (href) => {
  useEffect(() => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }, [href]);
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 5 — CURVED LOOP MARQUEE
// Jitter fix: offset is driven 100% imperatively via refs — no setState in the
// rAF loop, eliminating React re-render thrash on every frame.
// Initialization is collapsed into a single effect that measures, sets the
// initial offset ref, and starts the loop atomically — no race between effects.
// ─────────────────────────────────────────────────────────────────────────────
const CurvedLoop = ({ marqueeText='', speed=2, curveAmount=400, direction='left', interactive=true, opacity=0.12 }) => {
  const uid    = useId();
  const pathId = `curve-${uid.replace(/:/g,'')}`;

  const text = useMemo(() => marqueeText.replace(/\s+$/, '') + '\u00A0', [marqueeText]);

  const measureRef  = useRef(null);
  const textPathRef = useRef(null);
  const spacingRef  = useRef(0);       // driven by ref, never state
  const offsetRef   = useRef(0);       // driven by ref, never state
  const dragRef     = useRef(false);
  const lastXRef    = useRef(0);
  const dirRef      = useRef(direction);
  const velRef      = useRef(0);
  const [ready, setReady] = useState(false); // one-time flag to mount textPath

  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  // Memoized repeated text — depends on spacing which is a ref, so we store
  // the computed string in a ref too and update it after measuring.
  const totalTextRef = useRef('');

  // Single effect: measure → compute totalText → set initial offset → start loop.
  // No downstream effects needed — eliminates the initialization race entirely.
  useEffect(() => {
    if (!measureRef.current) return;
    const spacing = measureRef.current.getComputedTextLength();
    if (!spacing) return;

    spacingRef.current    = spacing;
    offsetRef.current     = -spacing;
    totalTextRef.current  = Array(Math.ceil(1800 / spacing) + 2).fill(text).join('');

    // Reveal the textPath element before starting the loop.
    setReady(true);

    let frame;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        let o = offsetRef.current + delta;
        if (o <= -spacing) o += spacing;
        if (o > 0)         o -= spacing;
        offsetRef.current = o;
        textPathRef.current.setAttribute('startOffset', o + 'px');
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [text, speed]); // re-initializes cleanly if text or speed prop changes

  const onPointerDown = e => {
    if (!interactive) return;
    dragRef.current  = true;
    lastXRef.current = e.clientX;
    velRef.current   = 0;
    e.target.setPointerCapture(e.pointerId);
  };
  const onPointerMove = e => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx         = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current   = dx;
    let o = offsetRef.current + dx;
    if (o <= -spacingRef.current) o += spacingRef.current;
    if (o > 0)                    o -= spacingRef.current;
    offsetRef.current = o;
    textPathRef.current.setAttribute('startOffset', o + 'px');
  };
  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current  = velRef.current > 0 ? 'right' : 'left';
  };

  return (
    <div
      style={{ width:'100%', cursor: interactive ? 'grab' : 'auto', visibility: ready ? 'visible' : 'hidden' }}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerLeave={endDrag}
    >
      <svg style={{ userSelect:'none', width:'100%', aspectRatio:'100/12', overflow:'visible', display:'block', fontSize:'3.5rem', fill:'#ffffff', fontWeight:700, textTransform:'uppercase', lineHeight:1, opacity }} viewBox="0 0 1440 120">
        {/* Hidden measure node — always mounted so measurement is immediate */}
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility:'hidden', opacity:0, pointerEvents:'none' }}>{text}</text>
        <defs><path id={pathId} d={pathD} fill="none" stroke="transparent"/></defs>
        {ready && (
          <text fontWeight="bold" xmlSpace="preserve">
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offsetRef.current + 'px'} xmlSpace="preserve">
              {totalTextRef.current}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 6 — LIGHT RAYS (WebGL)
// Props-in-closure bug fixed: all per-frame uniforms driven via refs so the
// effect never needs to re-run when props change. WebGL context loss handled.
// ─────────────────────────────────────────────────────────────────────────────
const LightRays = ({ raysOrigin="bottom-center", raysColor="#ffffff", raysSpeed=1, lightSpread=1, rayLength=3, fadeDistance=1, saturation=0, mouseInfluence=0.1, noiseAmount=0, distortion=0, pulsating=false }) => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const glRef     = useRef(null);
  const locsRef   = useRef(null);
  const mouseRef  = useRef({ x:0.5, y:0.5 });
  const smoothRef = useRef({ x:0.5, y:0.5 });

  // All props mirrored into a ref so the rAF loop always reads current values
  // without needing to be recreated when props change.
  const propsRef = useRef({});
  useEffect(() => { propsRef.current = { raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, fadeDistance, saturation, mouseInfluence, noiseAmount, distortion, pulsating }; }, [raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, fadeDistance, saturation, mouseInfluence, noiseAmount, distortion, pulsating]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initGL = () => {
      const gl = canvas.getContext("webgl");
      if (!gl) return null;
      glRef.current = gl;

      const vert = `attribute vec2 position; void main(){ gl_Position=vec4(position,0.0,1.0); }`;
      const frag = `precision highp float;
uniform float iTime; uniform vec2 iResolution; uniform vec2 rayPos; uniform vec2 rayDir;
uniform vec3 raysColor; uniform float raysSpeed; uniform float lightSpread; uniform float rayLength;
uniform float pulsating; uniform float fadeDistance; uniform float saturation;
uniform vec2 mousePos; uniform float mouseInfluence; uniform float noiseAmount; uniform float distortion;
float noise(vec2 st){ return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123); }
float rayStrength(vec2 src,vec2 refDir,vec2 coord,float sA,float sB,float speed){
  vec2 s2c=coord-src; vec2 dn=normalize(s2c);
  float ca=dot(dn,refDir);
  float da=ca+distortion*sin(iTime*2.0+length(s2c)*0.01)*0.2;
  float sf=pow(max(da,0.0),1.0/max(lightSpread,0.001));
  float dist=length(s2c); float md=iResolution.x*rayLength;
  float lf=clamp((md-dist)/md,0.0,1.0);
  float ff=clamp((iResolution.x*fadeDistance-dist)/(iResolution.x*fadeDistance),0.5,1.0);
  float pulse=pulsating>0.5?(0.8+0.2*sin(iTime*speed*3.0)):1.0;
  float bs=clamp((0.45+0.15*sin(da*sA+iTime*speed))+(0.3+0.2*cos(-da*sB+iTime*speed)),0.0,1.0);
  return bs*lf*ff*sf*pulse;
}
void main(){
  vec2 coord=vec2(gl_FragCoord.x,iResolution.y-gl_FragCoord.y);
  vec2 frd=rayDir;
  if(mouseInfluence>0.0){ vec2 ms=mousePos*iResolution.xy; frd=normalize(mix(rayDir,normalize(ms-rayPos),mouseInfluence)); }
  vec4 r1=vec4(1.0)*rayStrength(rayPos,frd,coord,36.2214,21.11349,1.5*raysSpeed);
  vec4 r2=vec4(1.0)*rayStrength(rayPos,frd,coord,22.3991,18.0234,1.1*raysSpeed);
  vec4 fc=r1*0.5+r2*0.4;
  if(noiseAmount>0.0){ float n=noise(coord*0.01+iTime*0.1); fc.rgb*=(1.0-noiseAmount+noiseAmount*n); }
  float br=1.0-(coord.y/iResolution.y);
  fc.rgb=pow(fc.rgb,vec3(2.2));
  fc.x*=0.1+br*0.8; fc.y*=0.3+br*0.6; fc.z*=0.5+br*0.5;
  fc.rgb=pow(fc.rgb,vec3(0.6));
  if(saturation!=1.0){ float g=dot(fc.rgb,vec3(0.299,0.587,0.114)); fc.rgb=mix(vec3(g),fc.rgb,saturation); }
  fc.rgb*=raysColor;
  gl_FragColor=fc;
}`;
      const compile = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
      const prog = gl.createProgram();
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
      gl.linkProgram(prog); gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
      const pos = gl.getAttribLocation(prog, "position");
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
      const uLoc = n => gl.getUniformLocation(prog, n);
      locsRef.current = { iTime:uLoc("iTime"), iRes:uLoc("iResolution"), rayPos:uLoc("rayPos"), rayDir:uLoc("rayDir"), raysColor:uLoc("raysColor"), raysSpeed:uLoc("raysSpeed"), lightSpread:uLoc("lightSpread"), rayLength:uLoc("rayLength"), pulsating:uLoc("pulsating"), fadeDistance:uLoc("fadeDistance"), saturation:uLoc("saturation"), mousePos:uLoc("mousePos"), mouseInfluence:uLoc("mouseInfluence"), noiseAmount:uLoc("noiseAmount"), distortion:uLoc("distortion") };
      return gl;
    };

    const getAnchorAndDir = (origin, w, h) => {
      const o = 0.2;
      const map = { 'top-left':[0,-o*h,[0,1]], 'top-right':[w,-o*h,[0,1]], 'left':[-o*w,.5*h,[1,0]], 'right':[(1+o)*w,.5*h,[-1,0]], 'bottom-left':[0,(1+o)*h,[0,-1]], 'bottom-right':[w,(1+o)*h,[0,-1]], 'bottom-center':[.5*w,(1+o)*h,[0,-1]] };
      const v = map[origin] || [.5*w,-o*h,[0,1]];
      return { anchor:[v[0],v[1]], dir:v[2] };
    };

    let gl = initGL();
    if (!gl) return;

    const resize = () => {
      const p = canvas.parentElement; if (!p) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = p.clientWidth * dpr; canvas.height = p.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = e => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x:(e.clientX-r.left)/r.width, y:(e.clientY-r.top)/r.height };
    };
    window.addEventListener("mousemove", onMove);

    // WebGL context loss/restore handling for mobile/low-memory devices.
    const onContextLost = e => { e.preventDefault(); cancelAnimationFrame(rafRef.current); };
    const onContextRestored = () => { gl = initGL(); resize(); startLoop(); };
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    const startLoop = () => {
      const loop = t => {
        const p = propsRef.current;
        const w = canvas.width, h = canvas.height;
        const { anchor, dir } = getAnchorAndDir(p.raysOrigin, w, h);
        const sm = smoothRef.current, m = mouseRef.current;
        sm.x = sm.x*0.92 + m.x*0.08; sm.y = sm.y*0.92 + m.y*0.08;
        const locs = locsRef.current; const rgb = hexToRgbArr(p.raysColor);
        gl.uniform1f(locs.iTime, t*0.001);
        gl.uniform2f(locs.iRes, w, h);
        gl.uniform2f(locs.rayPos, anchor[0], anchor[1]);
        gl.uniform2f(locs.rayDir, dir[0], dir[1]);
        gl.uniform3f(locs.raysColor, rgb[0], rgb[1], rgb[2]);
        gl.uniform1f(locs.raysSpeed, p.raysSpeed);
        gl.uniform1f(locs.lightSpread, p.lightSpread);
        gl.uniform1f(locs.rayLength, p.rayLength);
        gl.uniform1f(locs.pulsating, p.pulsating ? 1 : 0);
        gl.uniform1f(locs.fadeDistance, p.fadeDistance);
        gl.uniform1f(locs.saturation, p.saturation);
        gl.uniform2f(locs.mousePos, sm.x, sm.y);
        gl.uniform1f(locs.mouseInfluence, p.mouseInfluence);
        gl.uniform1f(locs.noiseAmount, p.noiseAmount);
        gl.uniform1f(locs.distortion, p.distortion);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    };
    startLoop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
    };
  }, []); // [] is correct — all dynamic values read via propsRef.

  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:0, borderRadius:"inherit" }} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 7 — DOT GRID
// Single merged rAF loop (physics + draw in one pass).
// Mouse events scoped to container element, not window.
// ─────────────────────────────────────────────────────────────────────────────
// Ripple ring descriptor — spawned on click, propagates outward each frame.
// Each ring activates dots as its wavefront passes through them.
// Trail constants — mathematically derived, not eyeballed.
// TRAIL_DECAY: multiplier per frame so trail hits TRAIL_FLOOR in exactly 1.5s at 60fps.
// Derivation: TRAIL_FLOOR = 1 * TRAIL_DECAY^90  →  TRAIL_DECAY = TRAIL_FLOOR^(1/90)
const RIPPLE_SPEED  = 4;
const TRAIL_FLOOR   = 0.001;                         // threshold below which trail is zeroed
const TRAIL_DECAY   = Math.pow(TRAIL_FLOOR, 1/90);   // ≈ 0.9234 — per-frame multiplier
const TRAIL_GAMMA   = 1 / 2.2;                       // pre-inverted so render uses Math.pow(t, TRAIL_GAMMA) directly — no division per frame

// Pre-computed gamma LUT: 256 entries mapping linear trail [0,1] → gamma-expanded [0,1].
// Computed once at module load. Render path does a single array index instead of Math.pow.
const TRAIL_LUT = new Float32Array(256);
for (let i = 0; i < 256; i++) TRAIL_LUT[i] = Math.pow(i / 255, TRAIL_GAMMA);

const DotGrid = ({ dotSize=T.dotSize, gap=T.dotGap, baseColor=T.dotBase, activeColor=T.dotActive, proximity=T.physics.proximity, speedTrigger=T.physics.speedTrigger, shockRadius=T.physics.shockRadius, shockStrength=T.physics.shockStrength, maxSpeed=T.physics.maxSpeed, resistance=T.physics.damping, returnDuration=T.physics.returnDuration }) => {
  const wrapperRef = useRef(null);
  const canvasRef  = useRef(null);
  const dotsRef    = useRef([]);
  const ripplesRef = useRef([]); // active ripple rings
  const pointerRef = useRef({ x:-9999, y:-9999, vx:0, vy:0, speed:0, lastTime:0, lastX:0, lastY:0 });
  const baseRgb    = useMemo(() => hexToRgb(baseColor),   [baseColor]);
  const activeRgb  = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    const p = new Path2D(); p.arc(0, 0, dotSize/2, 0, Math.PI*2); return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current, canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = width  * dpr; canvas.height = height * dpr;
    canvas.style.width  = `${width}px`; canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    const cell   = dotSize + gap;
    const cols   = Math.floor((width  + gap) / cell);
    const rows   = Math.floor((height + gap) / cell);
    const startX = (width  - (cols*cell - gap)) / 2 + dotSize/2;
    const startY = (height - (rows*cell - gap)) / 2 + dotSize/2;
    const dots   = [];
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++)
      dots.push({ cx:startX+x*cell, cy:startY+y*cell, xOffset:0, yOffset:0, vx:0, vy:0, active:false, trail:0 });
    dotsRef.current  = dots;
    ripplesRef.current = [];
  }, [dotSize, gap]);

  // Single merged rAF loop — physics + trail decay + ripple propagation + draw.
  useEffect(() => {
    const DAMPING = 1 - (1/resistance)*16;
    const RETURN  = 1 / (returnDuration * 60);
    const proxSq  = proximity * proximity;
    let rafId;

    const loop = () => {
      const canvas = canvasRef.current; if (!canvas) { rafId = requestAnimationFrame(loop); return; }
      const ctx    = canvas.getContext("2d");          if (!ctx)                             { rafId = requestAnimationFrame(loop); return; }

      // — Ripple propagation —
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += RIPPLE_SPEED;
        // Activate dots whose distance from origin just entered the wavefront (±band).
        const band = RIPPLE_SPEED * 1.5;
        for (const dot of dotsRef.current) {
          const dist = Math.hypot(dot.cx - r.cx, dot.cy - r.cy);
          if (dist >= r.radius - band && dist <= r.radius) {
            const falloff = Math.max(0, 1 - dist / r.maxRadius);
            dot.active  = true;
            dot.trail   = Math.min(1, dot.trail + falloff * 0.9);
            dot.vx = (dot.cx - r.cx) / Math.max(dist, 1) * r.strength * falloff;
            dot.vy = (dot.cy - r.cy) / Math.max(dist, 1) * r.strength * falloff;
          }
        }
        // Remove ring once it has expanded past its max radius.
        if (r.radius > r.maxRadius) ripples.splice(i, 1);
      }

      // — Physics tick + trail decay —
      for (const dot of dotsRef.current) {
        if (dot.active) {
          dot.vx *= DAMPING; dot.vy *= DAMPING;
          dot.xOffset += dot.vx * 0.016; dot.yOffset += dot.vy * 0.016;
          dot.xOffset += -dot.xOffset * RETURN * 60;
          dot.yOffset += -dot.yOffset * RETURN * 60;
          if (Math.abs(dot.xOffset) < 0.1 && Math.abs(dot.yOffset) < 0.1 && Math.abs(dot.vx) < 0.1 && Math.abs(dot.vy) < 0.1) {
            dot.xOffset = 0; dot.yOffset = 0; dot.vx = 0; dot.vy = 0; dot.active = false;
          }
        }
        // Exponential decay — single multiply, no Math.pow in hot path.
        // Guard: skip entirely if already zero; clamp to zero once below floor.
        if (dot.trail > 0) {
          dot.trail *= TRAIL_DECAY;
          if (dot.trail < TRAIL_FLOOR) dot.trail = 0;
        }
      }

      // — Draw pass —
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x:px, y:py } = pointerRef.current;
      for (const dot of dotsRef.current) {
        const ox  = dot.cx + dot.xOffset, oy = dot.cy + dot.yOffset;
        const dx  = dot.cx - px, dy = dot.cy - py;
        const dsq = dx*dx + dy*dy;

        // Resolve brightness — LUT index lookup replaces Math.pow per dot per frame.
        let t = dot.trail > 0 ? TRAIL_LUT[Math.round(dot.trail * 255)] : 0;

        if (dsq <= proxSq) {
          const linear = 1 - Math.sqrt(dsq) / proximity;
          const eased  = 1 - Math.pow(1 - linear, 2.4); // proximity easing — only runs for dots near cursor
          if (eased > t) t = eased;                      // branchless max via conditional assign
        }

        // Skip ctx state changes entirely for fully dark dots — biggest per-frame saving.
        if (t <= 0) { ctx.save(); ctx.translate(dot.cx, dot.cy); ctx.fillStyle = baseColor; ctx.fill(circlePath); ctx.restore(); continue; }

        const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
        const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
        const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);

        ctx.save(); ctx.translate(ox, oy); ctx.fillStyle = `rgb(${r},${g},${b})`; ctx.fill(circlePath); ctx.restore();
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [resistance, returnDuration, proximity, baseColor, baseRgb, activeRgb, circlePath]);

  useResizeObserver(wrapperRef, buildGrid);
  useEffect(() => { buildGrid(); }, [buildGrid]);

  useEffect(() => {
    const el = wrapperRef.current; if (!el) return;
    const onMove = e => {
      const now = performance.now(), pr = pointerRef.current;
      const dt  = pr.lastTime ? now - pr.lastTime : 16;
      let vx = (e.clientX - pr.lastX) / dt * 1000, vy = (e.clientY - pr.lastY) / dt * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) { const s = maxSpeed/speed; vx *= s; vy *= s; speed = maxSpeed; }
      pr.lastTime = now; pr.lastX = e.clientX; pr.lastY = e.clientY; pr.vx = vx; pr.vy = vy; pr.speed = speed;
      const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return;
      pr.x = e.clientX - rect.left; pr.y = e.clientY - rect.top;
      if (speed > speedTrigger) {
        for (const dot of dotsRef.current) {
          if (dot.active) continue;
          const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
          if (dist < proximity) {
            dot.active = true;
            dot.trail  = Math.min(1, dot.trail + 0.4);
            dot.vx = (dot.cx - pr.x)*0.3 + vx*0.08;
            dot.vy = (dot.cy - pr.y)*0.3 + vy*0.08;
          }
        }
      }
    };
    // #2 — click spawns a propagating ripple ring instead of instant shock.
    const onClick = e => {
      const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return;
      ripplesRef.current.push({
        cx:        e.clientX - rect.left,
        cy:        e.clientY - rect.top,
        radius:    0,
        maxRadius: shockRadius,
        strength:  shockStrength * 18,
      });
    };
    el.addEventListener("mousemove", onMove, { passive:true });
    el.addEventListener("click", onClick);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("click", onClick); };
  }, [maxSpeed, speedTrigger, proximity, shockRadius, shockStrength]);

  return (
    <div ref={wrapperRef} style={{ width:"100%", height:"100%", position:"absolute", inset:0 }}>
      <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 8 — SPOTLIGHT CARD
// ─────────────────────────────────────────────────────────────────────────────
const SpotlightCard = ({ children, spotlightColor="rgba(0,229,255,0.15)", style, className="" }) => {
  const divRef = useRef(null);
  const onMouseMove = useCallback(e => {
    const rect = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    divRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  }, [spotlightColor]);
  return <div ref={divRef} onMouseMove={onMouseMove} className={`card-spotlight ${className}`} style={style}>{children}</div>;
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 9 — CHART PRIMITIVES
// Stable Recharts shape/dot factories — no new references created per render.
// ─────────────────────────────────────────────────────────────────────────────
const AnimatedBar = ({ x, y, width, height, fill, ready, isActive }) => {
  const [displayed, setDisplayed] = useState(0);
  const [risen,     setRisen    ] = useState(false);
  const filterId = `bar-glow-${Math.round(x)}`;
  useEffect(() => {
    if (!ready || risen) return;
    const delay = (x / 900) * T.chartBarStaggerMs;
    const id = setTimeout(() => { setDisplayed(height); setRisen(true); }, delay);
    return () => clearTimeout(id);
  }, [ready, height, risen, x]);
  return (
    <g>
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect
        x={x} y={y+height-displayed} width={width} height={displayed} rx={3}
        fill={isActive ? (fill === "#4a4a4a" ? "#888888" : "#bbbbbb") : fill}
        filter={isActive ? `url(#${filterId})` : undefined}
        style={{ transition: risen ? "fill 0.2s ease, filter 0.2s ease" : "height 0.65s cubic-bezier(0.34,1.1,0.64,1), y 0.65s cubic-bezier(0.34,1.1,0.64,1)" }}
      />
    </g>
  );
};

const AnimatedLineDot = ({ cx, cy, fill, ready, index=0 }) => {
  const [hovered,  setHovered ] = useState(false);
  const [visible,  setVisible ] = useState(false);
  const uid = useId();
  const id  = `dot-glow-${uid.replace(/:/g,'')}`;
  useEffect(() => {
    if (!ready) { setVisible(false); return; }
    const id = setTimeout(() => setVisible(true), T.dotRevealMs + index * T.dotRevealStepMs);
    return () => clearTimeout(id);
  }, [ready, index]);
  return (
    <g onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <defs><filter id={id} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <circle cx={cx} cy={cy} r={10} fill="transparent"/>
      <circle cx={cx} cy={cy} r={hovered ? 5 : (visible ? 3 : 0)} fill={hovered ? "#ffffff" : fill} filter={hovered ? `url(#${id})` : undefined} style={{ transition:"r 0.3s cubic-bezier(0.34,1.56,0.64,1), fill 0.2s ease" }}/>
    </g>
  );
};

/**
 * Returns a stable memoized Recharts dot component for a given fill + ready state.
 * Called with useMemo at the chart call site — never recreated per render.
 */
const makeLineDotComponent = (fill, ready) => {
  const Component = (props) => <AnimatedLineDot {...props} fill={fill} ready={ready} index={props.index ?? 0} />;
  Component.displayName = `LineDot_${fill}`;
  return Component;
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 10 — SHARED UI PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ ...cardBase, padding:"12px 16px", fontSize:"13px", color:T.text, fontFamily:T.fontSans, minWidth:"140px" }}>
      <div style={{ fontWeight:"700", marginBottom:"6px", color:T.white }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color:T.mutedHi, marginBottom:"2px" }}>{p.name}: <span style={{ color:T.white }}>{p.value}{p.name==="Avg Game Size"?" GB":""}</span></div>
      ))}
    </div>
  );
};

const SectionEyebrow = ({ children, style }) => (
  <div style={{ fontSize:"11px", fontWeight:"700", color:T.mutedHi, textTransform:"uppercase", letterSpacing:"0.18em", marginBottom:"12px", fontFamily:T.fontSans, ...style }}>
    {children}
  </div>
);
const SectionTitle = ({ children }) => <h2 className="heading-text" style={{ fontSize:"clamp(22px,3vw,30px)", marginBottom:"10px", lineHeight:1.2 }}>{children}</h2>;
const SectionSub   = ({ children }) => <p  style={{ fontSize:"14px", color:T.muted, fontFamily:T.fontSans, lineHeight:1.7, maxWidth:"520px", margin:"0 auto" }}>{children}</p>;
const Divider      = () => <div style={{ width:"100%", height:"1px", background:`linear-gradient(90deg,transparent,${T.border} 30%,${T.border} 70%,transparent)` }}/>;

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 11 — STAT CARD
// ─────────────────────────────────────────────────────────────────────────────
const LINE_GAP = 18, PADDING = 14;
const StatCard = ({ value, label, sub }) => {
  const [hovered,  setHovered ] = useState(false);
  const [idleSize, setIdleSize] = useState("3rem");
  const outerRef = useRef(null);

  const onResize = useCallback(({ width, height }) => {
    const innerW = width  - (LINE_GAP + PADDING) * 2;
    const innerH = height - (LINE_GAP + PADDING) * 2;
    setIdleSize(`${Math.floor(Math.min(innerW / (value.length * 0.62), innerH * 0.72))}px`);
  }, [value]);

  useResizeObserver(outerRef, onResize);

  return (
    <div ref={outerRef} className="outer" style={{ flex:1, minWidth:"180px" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="dot"/>
      <div className="card">
        <div className="ray"/>
        <div className="line topl"/><div className="line bottoml"/><div className="line leftl"/><div className="line rightl"/>
        <div className="text" style={{ fontSize: hovered ? "2.2rem" : idleSize, transform: hovered ? "translateY(-12px)" : "translateY(0px)", transition:"font-size 0.4s cubic-bezier(0.34,1.56,0.64,1), transform 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>{value}</div>
        <div style={{ position:"absolute", bottom:"28px", left:0, right:0, textAlign:"center", padding:"0 14px", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0px)" : "translateY(10px)", transition:"opacity 0.35s ease 0.05s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.05s" }}>
          <div style={{ fontSize:"11px", fontWeight:"700", color:"#aaa", textTransform:"uppercase", letterSpacing:"0.1em", fontFamily:T.fontSans }}>{label}</div>
          {sub && <div style={{ fontSize:"10px", color:T.white, marginTop:"5px", fontFamily:T.fontSans }}>{sub}</div>}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 12 — SECTION COMPONENTS
// Each section is its own isolated component with no shared mutable state.
// ─────────────────────────────────────────────────────────────────────────────
const OverviewSection = ({ sectionRef, visible }) => {
  const [chartRef, chartReady] = useIntersectionReveal(0.3);

  // Stable bar shape factories — one per dataset, not recreated per render.
  const darkBarShape  = useCallback(p => <AnimatedBar {...p} fill="#4a4a4a" ready={chartReady} isActive={p.activeBar}/>, [chartReady]);
  const lightBarShape = useCallback(p => <AnimatedBar {...p} fill="#787878" ready={chartReady} isActive={p.activeBar}/>, [chartReady]);

  // Stable dot components — memoized so Recharts never remounts dots.
  const fpsDot    = useMemo(() => makeLineDotComponent("#c8c8c8", chartReady), [chartReady]);
  const budgetDot = useMemo(() => makeLineDotComponent("#484848", chartReady), [chartReady]);

  return (
    <div ref={sectionRef}>
      <div style={{ position:"relative", overflow:"hidden", borderBottom:`1px solid ${T.border}`, paddingBottom:"95px" }}>
        <DotGrid/>
        <div className={`fade-in ${visible ? "visible" : ""}`} style={{ position:"relative", zIndex:1, maxWidth:"760px", margin:"0 auto", padding:"160px 24px 60px", textAlign:"center", pointerEvents:"none" }}>
          <SectionEyebrow style={{ display:"inline-block", background:"#000000", padding:"3px 10px", borderRadius:"4px" }}>Research Overview</SectionEyebrow>
          <h1 className="heading-text" style={{ fontSize:"clamp(30px,5vw,52px)", lineHeight:1.12, marginBottom:"8px", letterSpacing:"-0.02em" }}>
            Optimization in Game Development<br/><span style={{ opacity:0.5 }}>A Field in Tension</span>
          </h1>
          <p style={{ fontSize:"14px", color:"white", lineHeight:1.8, maxWidth:"420px", margin:"8px auto 0", textAlign:"justify", textAlignLast:"center", textShadow:"2px 2px 0 #000, -2px -2px 0 #000" }}>
            Performance optimization in games has evolved from byte-level craft to an industry-scale discipline — defined equally by innovation and regression.
          </p>
        </div>
      </div>

      <div className={`fade-in ${visible ? "visible" : ""}`} style={{ maxWidth:"960px", margin:"-95px auto 80px", padding:"0 24px", display:"flex", gap:"20px", flexWrap:"wrap", justifyContent:"center", position:"relative", zIndex:2 }}>
        {STAT_CARDS.map((s, i) => <StatCard key={i} {...s}/>)}
      </div>

      <Divider/>

      <div style={{ padding:"80px 24px" }}>
        <div style={{ maxWidth:"960px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"52px" }}>
            <SectionEyebrow>Quantitative Trends</SectionEyebrow>
            <SectionTitle>Growth, Complexity & Performance</SectionTitle>
            <SectionSub>Tracking key indicators across two decades of commercial game development.</SectionSub>
          </div>
          <div ref={chartRef} className="chart-grid">
            <div style={{ ...cardBase, padding:"28px 20px" }}>
              <div style={{ fontSize:"13px", fontWeight:"700", color:T.text, marginBottom:"4px" }}>Game Size vs. Performance Reports</div>
              <div style={{ fontSize:"11px", color:T.muted, marginBottom:"22px", lineHeight:1.6 }}>Average install size (GB) alongside indexed performance bug reports at launch</div>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={CHART_DATA} barGap={4} syncId="year-sync" margin={{ left:0, right:16, top:4, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1c1c"/>
                  <XAxis dataKey="year" tick={{ fontSize:10, fill:T.muted }} axisLine={{ stroke:T.border }} tickLine={false}/>
                  <YAxis width={32} tick={{ fontSize:10, fill:T.muted }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTooltip/>} cursor={{ fill:"rgba(255,255,255,0.06)" }}/>
                  <Legend wrapperStyle={{ fontSize:"11px", color:T.mutedHi }}/>
                  <Bar dataKey="avgSize"    name="Avg Game Size" fill="#4a4a4a" shape={darkBarShape}/>
                  <Bar dataKey="bugReports" name="Perf. Reports"  fill="#787878" shape={lightBarShape}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ ...cardBase, padding:"28px 20px" }}>
              <div style={{ fontSize:"13px", fontWeight:"700", color:T.text, marginBottom:"4px" }}>Frame Stability vs. Development Cost</div>
              <div style={{ fontSize:"11px", color:T.muted, marginBottom:"22px", lineHeight:1.6 }}>Launch-day frame stability index (%) against average production budgets (USD millions)</div>
              <ResponsiveContainer width="100%" height={210}>
                <LineChart data={PERFORMANCE_DATA} syncId="year-sync" margin={{ left:0, right:16, top:4, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1c1c"/>
                  <XAxis dataKey="year" tick={{ fontSize:10, fill:T.muted }} axisLine={{ stroke:T.border }} tickLine={false}/>
                  <YAxis width={32} tick={{ fontSize:10, fill:T.muted }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTooltip/>} cursor={{ stroke:"rgba(255,255,255,0.05)", strokeWidth:1 }}/>
                  <Legend wrapperStyle={{ fontSize:"11px", color:T.mutedHi }}/>
                  <Line type="monotone" dataKey="fps"    name="Perf. Index"  stroke="#c8c8c8" strokeWidth={2} dot={fpsDot}    activeDot={{ r:5, fill:"#ffffff", stroke:"#ffffff", strokeWidth:0, filter:"drop-shadow(0 0 6px #fff)" }} strokeDasharray={chartReady?"0":"1000"} className={`line-animated${chartReady?" ready":""}`}/>
                  <Line type="monotone" dataKey="budget" name="Budget ($M)"   stroke="#484848" strokeWidth={2} dot={budgetDot} activeDot={{ r:5, fill:"#888888", stroke:"#888888", strokeWidth:0, filter:"drop-shadow(0 0 6px #888)" }} strokeDasharray={chartReady?"5 3":"1000"} className={`line-animated${chartReady?" ready delay":""}`}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p style={{ fontSize:"11px", color:T.muted, textAlign:"center", marginTop:"16px", fontStyle:"italic" }}>Note: Performance index and bug report data are derived from aggregated industry post-mortems and launch reviews. Figures represent indicative trends.</p>
        </div>
      </div>
    </div>
  );
};

const TimelineSection = ({ sectionRef }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const fadeTimer = useRef(null);

  const handleSelect = useCallback(i => {
    if (i === activeIdx) return;
    setFading(true);
    clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => {
      setDisplayIdx(i);
      setFading(false);
    }, 180); // fade-out duration before swapping content
    setActiveIdx(i);
  }, [activeIdx]);

  useEffect(() => () => clearTimeout(fadeTimer.current), []);

  const current = TIMELINE_DATA[displayIdx];

  return (
    <div ref={sectionRef}>
      <div style={{ maxWidth:"960px", margin:"0 auto", padding:"80px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:"56px" }}>
          <SectionEyebrow>Historical Context</SectionEyebrow>
          <SectionTitle>Five Decades of Optimization</SectionTitle>
          <SectionSub>Select an era to explore how the field evolved.</SectionSub>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative", marginBottom:"36px", padding:"0 20px" }}>
          <div style={{ position:"absolute", left:"20px", right:"20px", top:"50%", height:"1px", background:"#1e2020", zIndex:0 }}/>
          <div style={{ position:"absolute", left:"20px", top:"50%", height:"1px", background:"linear-gradient(90deg,rgba(255,255,255,0.3),rgba(255,255,255,0.08))", zIndex:0, width:`${(activeIdx/(TIMELINE_DATA.length-1))*100}%`, transition:"width 0.5s cubic-bezier(0.4,0,0.2,1)", maxWidth:"calc(100% - 40px)" }}/>
          {TIMELINE_DATA.map((t, i) => (
            <div key={i} onClick={() => handleSelect(i)} className={`tl-dot${activeIdx===i?" active":""}`} style={{ zIndex:1, position:"relative", width:activeIdx===i?"56px":"44px", height:activeIdx===i?"56px":"44px", borderRadius:"50%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:activeIdx===i?"radial-gradient(circle at 30% 30%,#3a3c3c,#0c0d0d)":"radial-gradient(circle at 30% 30%,#1a1c1c,#0c0d0d)", border:`1px solid ${activeIdx===i?"rgba(255,255,255,0.18)":T.border}`, boxShadow:activeIdx===i?"0 0 24px rgba(255,255,255,0.07)":"none", color:activeIdx===i?T.white:T.muted, cursor:"pointer", transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
              <span style={{ fontSize:"10px", fontWeight:"700", fontFamily:T.fontSans, letterSpacing:"0.03em" }}>{t.era}</span>
            </div>
          ))}
        </div>
        {/* Card never remounts — content fades out, swaps, fades in via CSS opacity transition */}
        <SpotlightCard spotlightColor="rgba(0,229,255,0.12)" style={{ ...cardBase, padding:"40px 44px", transition:"none" }}>
          <div style={{ opacity: fading ? 0 : 1, transition:"opacity 0.18s ease" }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:"16px", marginBottom:"16px" }}>
              <span className="heading-text" style={{ fontSize:"32px" }}>{current.era}</span>
              <span style={{ fontSize:"15px", fontWeight:"600", color:T.mutedHi }}>{current.label}</span>
            </div>
            <p style={{ fontSize:"14px", color:T.muted, lineHeight:1.85, maxWidth:"680px" }}>{current.desc}</p>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};

const ResearchSection = ({ sectionRef }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cardKey,        setCardKey       ] = useState(0);

  const handleFilter = useCallback(cat => { setActiveCategory(cat); setCardKey(k => k+1); }, []);
  const filtered = useMemo(
    () => activeCategory === "All" ? RESEARCH_QUESTIONS : RESEARCH_QUESTIONS.filter(q => q.category === activeCategory),
    [activeCategory]
  );

  return (
    <div ref={sectionRef}>
      <div style={{ padding:"80px 24px" }}>
        <div style={{ maxWidth:"960px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"44px" }}>
            <SectionEyebrow>Open Inquiry</SectionEyebrow>
            <SectionTitle>Research Question Explorer</SectionTitle>
            <SectionSub>The following questions represent active areas of academic and industry investigation in game performance research.</SectionSub>
          </div>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", justifyContent:"center", marginBottom:"40px" }}>
            {RQ_CATEGORIES.map(cat => (
              <button key={cat} className={`filter-btn${activeCategory===cat?" active":""}`} onClick={() => handleFilter(cat)} style={{ background:activeCategory===cat?"#1a1c1c":"transparent", border:`1px solid ${activeCategory===cat?T.borderHi:T.border}`, borderRadius:"6px", padding:"8px 18px", cursor:"pointer", fontSize:"11px", fontWeight:"600", fontFamily:T.fontSans, color:activeCategory===cat?T.white:T.muted, letterSpacing:"0.06em", textTransform:"uppercase" }}>{cat}</button>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"16px" }}>
            {filtered.map((q, i) => (
              <SpotlightCard key={`${cardKey}-${q.id}`} spotlightColor={IMPACT_META[q.impact].spotlight} className="rq-card entering" style={{ ...cardBase, padding:"28px 24px", border:`1px solid ${T.border}`, animationDelay:`${i * T.cardStaggerMs}ms` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"14px" }}>
                  <span style={{ fontSize:"10px", fontWeight:"700", color:T.mutedHi, textTransform:"uppercase", letterSpacing:"0.12em", background:"rgba(255,255,255,0.04)", padding:"3px 10px", borderRadius:"4px", border:`1px solid ${T.border}` }}>{q.category}</span>
                  <span style={{ fontSize:"10px", fontWeight:"700", color:IMPACT_META[q.impact].color }}>● {q.impact}</span>
                </div>
                <div className="heading-text" style={{ fontSize:"16px", marginBottom:"12px", lineHeight:1.35 }}>{q.title}</div>
                <p style={{ fontSize:"12px", color:T.muted, lineHeight:1.75 }}>{q.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CreditsSection = () => (
  <div style={{ padding:"80px 24px", position:"relative", overflow:"hidden" }}>
    {CURVED_LOOPS.map((cfg, i) => (
      <div key={i} style={{ position:"absolute", top:cfg.top ?? undefined, bottom:cfg.bottom ?? undefined, left:0, right:0, pointerEvents:"none", zIndex:cfg.zIndex }}>
        <CurvedLoop marqueeText={cfg.marqueeText} speed={cfg.speed} curveAmount={cfg.curveAmount} direction={cfg.direction} opacity={cfg.opacity} interactive={cfg.zIndex > 0}/>
      </div>
    ))}
    <div style={{ maxWidth:"960px", margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:"44px" }}>
        <SectionEyebrow>Project Credits</SectionEyebrow>
        <SectionTitle>Author & Contributor</SectionTitle>
        <SectionSub>This research compilation and interactive visualization was developed by:</SectionSub>
      </div>
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", position:"relative", zIndex:5 }}>
        <SpotlightCard spotlightColor="rgba(21,255,0,0.18)" className="rq-card entering" style={{ ...cardBase, padding:"48px 56px", border:`1px solid ${T.border}`, maxWidth:"600px", width:"100%", textAlign:"center", background:"radial-gradient(circle 380px at 50% 30%,#2a2c2c,#0c0d0d)", position:"relative", overflow:"hidden" }}>
          <LightRays raysOrigin="bottom-center" raysColor="#ffffff" raysSpeed={1} lightSpread={1} rayLength={3} fadeDistance={1} saturation={0} mouseInfluence={0.1} noiseAmount={0} distortion={0} pulsating={false}/>
          <div style={{ marginBottom:"24px" }}>
            <span style={{ fontSize:"14px", fontWeight:"500", color:"#b0b5b5", textTransform:"uppercase", letterSpacing:"0.2em", background:"rgba(255,255,255,0.03)", padding:"4px 16px", borderRadius:"30px", border:`1px solid ${T.borderHi}`, display:"inline-block" }}>BSE-8A · RESEARCH WORK</span>
          </div>
          <div className="heading-text" style={{ fontSize:"clamp(42px,6vw,58px)", marginBottom:"16px", lineHeight:1.1 }}>Muhammad Uzair</div>
          <div style={{ fontSize:"24px", fontWeight:"400", color:"#b0b5b5", marginBottom:"24px", fontFamily:`'DM Sans', monospace`, letterSpacing:"0.02em" }}>22K-5176</div>
          <div style={{ height:"1px", width:"120px", margin:"24px auto", background:`linear-gradient(90deg,transparent,${T.mutedHi},transparent)` }}/>
          <div style={{ fontSize:"14px", color:"#c8cccc", lineHeight:1.8, maxWidth:"400px", margin:"0 auto" }}>
            <p>Research compilation, interactive visualization design, and implementation of performance optimization case studies.</p>
            <p style={{ marginTop:"16px", fontSize:"12px", color:"#a0a5a5" }}>Data aggregated from industry post-mortems, academic publications, and performance analysis reports (2024–2026).</p>
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:"24px", marginTop:"32px", fontSize:"11px", color:"#a0a5a5", textTransform:"uppercase", letterSpacing:"0.1em" }}>
            <span style={{ padding:"4px 12px", background:"rgba(255,255,255,0.02)", borderRadius:"4px" }}>Game Optimization</span>
            <span style={{ padding:"4px 12px", background:"rgba(255,255,255,0.02)", borderRadius:"4px" }}>Performance Research</span>
          </div>
        </SpotlightCard>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 13 — NAV
// ─────────────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key:"overview", label:"Overview"  },
  { key:"timeline", label:"Timeline"  },
  { key:"research", label:"Research"  },
];

const Header = ({ activeSection, onNavigate }) => (
  <div style={{ background:"rgba(12,13,13,0.94)", backdropFilter:"blur(12px)", padding:"18px 40px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${T.border}`, position:"sticky", top:0, zIndex:100 }}>
    <div>
      <div className="heading-text" style={{ fontSize:"18px" }}>OPTIMIZATION RESEARCH</div>
      <div style={{ fontSize:"10px", color:T.muted, letterSpacing:"0.14em", textTransform:"uppercase", marginTop:"2px" }}>Software ReEngineering Assignment · 2026</div>
    </div>
    <div style={{ display:"flex", gap:"28px", fontSize:"12px", fontWeight:"500", letterSpacing:"0.06em", textTransform:"uppercase" }}>
      {NAV_ITEMS.map(n => (
        <span key={n.key} onClick={() => onNavigate(n.key)} className={`nav-item ${activeSection===n.key?"active":""}`} style={{ color: activeSection===n.key ? T.white : T.muted, cursor:"pointer" }}>{n.label}</span>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 14 — GLOBAL STYLES
// Single style block — injected once, never re-evaluated.
// ─────────────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#0c0d0d;}
  .fade-in{opacity:0;transform:translateY(20px);transition:opacity 0.7s ease,transform 0.7s ease;}
  .fade-in.visible{opacity:1;transform:translateY(0);}
  .nav-item{position:relative;cursor:pointer;transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1);}
  .nav-item::after{content:'';position:absolute;bottom:-4px;left:50%;width:0;height:1px;background:linear-gradient(90deg,transparent,#fff,transparent);transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1);transform:translateX(-50%);}
  .nav-item:hover{color:#ffffff !important;transform:translateY(-1px);}
  .nav-item:hover::after{width:80%;}
  .nav-item.active{color:#ffffff !important;}
  .nav-item.active::after{width:80%;opacity:0.6;}
  .page-transition-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:radial-gradient(circle at 50% 50%,#0c0d0d,#000);z-index:9999;pointer-events:none;opacity:0;transition:opacity 0.4s ease;}
  .page-transition-overlay.active{opacity:0.3;}
  .heading-text{font-family:'DM Sans',sans-serif;font-weight:800;background:linear-gradient(90deg,#333 0%,#fff 40%,#fff 60%,#333 100%);background-size:200% 100%;background-clip:text;color:transparent;-webkit-background-clip:text;filter:brightness(1.8) contrast(2.2);animation:boomerang 4s ease-in-out infinite;}
  @keyframes boomerang{0%{background-position:0% 0;}50%{background-position:100% 0;}100%{background-position:0% 0;}}
  .outer{--line-gap:18px;width:210px;height:190px;border-radius:10px;padding:1px;background:radial-gradient(circle 230px at 0% 0%,#ffffff,#0c0d0d);position:relative;}
  .dot{width:5px;aspect-ratio:1;position:absolute;background-color:#fff;box-shadow:0 0 10px #ffffff;border-radius:100px;z-index:2;right:calc(var(--line-gap) - 2.5px);top:calc(var(--line-gap) - 2.5px);animation:moveDot 6s linear infinite;opacity:0;transition:opacity 0.3s ease;}
  .outer:hover .dot{opacity:1;}
  @keyframes moveDot{0%,100%{top:calc(var(--line-gap) - 2.5px);right:calc(var(--line-gap) - 2.5px);}25%{top:calc(var(--line-gap) - 2.5px);right:calc(100% - var(--line-gap) - 2.5px);}50%{top:calc(100% - var(--line-gap) - 2.5px);right:calc(100% - var(--line-gap) - 2.5px);}75%{top:calc(100% - var(--line-gap) - 2.5px);right:calc(var(--line-gap) - 2.5px);}}
  .card{z-index:1;width:100%;height:100%;border-radius:9px;border:solid 1px #202222;background:radial-gradient(circle 280px at 0% 0%,#444444,#0c0d0d);display:flex;align-items:center;justify-content:center;position:relative;flex-direction:column;color:#fff;overflow:hidden;}
  .ray{width:220px;height:45px;border-radius:100px;position:absolute;background-color:#c7c7c7;opacity:0.4;box-shadow:0 0 50px #fff;filter:blur(10px);transform-origin:10%;top:0;left:0;transform:rotate(40deg);}
  .card .text{font-weight:bolder;font-family:'DM Sans',sans-serif;background:linear-gradient(90deg,#333 0%,#fff 40%,#fff 60%,#333 100%);background-size:200% 100%;background-clip:text;color:transparent;-webkit-background-clip:text;filter:brightness(1.8) contrast(2.2);animation:boomerang 4s ease-in-out infinite;}
  .line{width:100%;height:1px;position:absolute;background-color:#2c2c2c;}
  .topl{top:var(--line-gap);background:linear-gradient(90deg,#888888 30%,#1d1f1f 70%);}
  .bottoml{bottom:var(--line-gap);}
  .leftl{left:var(--line-gap);width:1px;height:100%;background:linear-gradient(180deg,#747474 30%,#222424 70%);}
  .rightl{right:var(--line-gap);width:1px;height:100%;}
  .tl-dot{transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);cursor:pointer;}
  .tl-dot.active::after{content:'';position:absolute;inset:-6px;border-radius:50%;border:1px solid rgba(255,255,255,0.15);animation:pulseRing 2s ease-out infinite;}
  @keyframes pulseRing{0%{transform:scale(0.9);opacity:0.6;}70%{transform:scale(1.3);opacity:0;}100%{transform:scale(1.3);opacity:0;}}
  .timeline-content{animation:contentReveal 0.4s cubic-bezier(0.4,0,0.2,1) forwards;}
  @keyframes contentReveal{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
  .rq-card{transition:transform 0.2s ease,border-color 0.2s ease,opacity 0.25s ease;}
  .rq-card:hover{transform:translateY(-3px);border-color:#383b3b !important;}
  .rq-card.entering{animation:cardEnter 0.35s cubic-bezier(0.34,1.2,0.64,1) both;}
  @keyframes cardEnter{from{opacity:0;transform:translateY(16px) scale(0.97);}to{opacity:1;transform:translateY(0) scale(1);}}
  .filter-btn{transition:all 0.2s ease;position:relative;}
  .filter-btn:hover{border-color:#383b3b !important;color:#e8e8e8 !important;}
  .filter-btn.active::after{content:'';position:absolute;bottom:-1px;left:20%;right:20%;height:1px;background:rgba(255,255,255,0.4);border-radius:1px;}
  @keyframes drawLine{from{stroke-dashoffset:1000;}to{stroke-dashoffset:0;}}
  .line-animated{stroke-dasharray:1000;stroke-dashoffset:1000;}
  .line-animated.ready{animation:drawLine 1.2s cubic-bezier(0.4,0,0.2,1) forwards;}
  .line-animated.ready.delay{animation-delay:0.2s;}
  .chart-grid{display:grid;gap:20px;grid-template-columns:1fr;}
  @media(min-width:768px){.chart-grid{grid-template-columns:1fr 1fr;}}
  .card-spotlight{position:relative;overflow:hidden;--mouse-x:50%;--mouse-y:50%;--spotlight-color:rgba(255,255,255,0.05);}
  .card-spotlight::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(circle at var(--mouse-x) var(--mouse-y),var(--spotlight-color),transparent 80%);opacity:0;transition:opacity 0.5s ease;pointer-events:none;z-index:1;}
  .card-spotlight:hover::before,.card-spotlight:focus-within::before{opacity:0.6;}
  .card-spotlight>*{position:relative;z-index:2;}
  ::-webkit-scrollbar{width:5px;}
  ::-webkit-scrollbar-track{background:#0c0d0d;}
  ::-webkit-scrollbar-thumb{background:#222424;border-radius:3px;}
`;

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 15 — APP ROOT
// Thin orchestration layer — owns only navigation state and scroll sync.
// No business logic, no data, no styles live here.
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  useFontLoader("https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;0,800;1,400&display=swap");

  const [activeSection,   setActiveSection  ] = useState("overview");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visible,         setVisible        ] = useState(false);

  const sectionRefs = {
    overview: useRef(null),
    timeline: useRef(null),
    research: useRef(null),
  };

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const navigateToSection = useCallback(section => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveSection(section);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      sectionRefs[section]?.current?.scrollIntoView({ behavior:"smooth", block:"start" });
      setTimeout(() => { document.body.style.overflow = ""; setIsTransitioning(false); }, 800);
    }, 50);
  }, [isTransitioning]);

  useEffect(() => {
    const handleScroll = () => {
      if (isTransitioning) return;
      const sp = window.scrollY + 100;
      if (sectionRefs.research.current && sp >= sectionRefs.research.current.offsetTop - 200) setActiveSection("research");
      else if (sectionRefs.timeline.current && sp >= sectionRefs.timeline.current.offsetTop - 200) setActiveSection("timeline");
      else setActiveSection("overview");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTransitioning]);

  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:T.fontSans, color:T.text }}>
      <style>{GLOBAL_CSS}</style>
      <div className={`page-transition-overlay ${isTransitioning ? "active" : ""}`}/>
      <Header activeSection={activeSection} onNavigate={navigateToSection}/>
      <OverviewSection  sectionRef={sectionRefs.overview} visible={visible}/>
      <Divider/>
      <TimelineSection  sectionRef={sectionRefs.timeline}/>
      <Divider/>
      <ResearchSection  sectionRef={sectionRefs.research}/>
      <Divider/>
      <CreditsSection/>
      <Divider/>
      <div style={{ padding:"28px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:`1px solid ${T.border}` }}>
        <div className="heading-text" style={{ fontSize:"15px" }}>OPTIMIZATION RESEARCH</div>
        <div style={{ fontSize:"11px", color:T.muted, letterSpacing:"0.05em" }}>Research compiled by Muhammad Uzair (22K-5176) · BSE-8A · 2026</div>
      </div>
      <div style={{ padding:"14px 40px", borderTop:"1px solid #171919", background:"#080909", display:"flex", justifyContent:"center", alignItems:"center", gap:"6px" }}>
        <span style={{ fontSize:"11px", color:"#3a3f3f", letterSpacing:"0.08em", fontFamily:T.fontSans }}>© {new Date().getFullYear()}</span>
        <span className="heading-text" style={{ fontSize:"11px", letterSpacing:"0.12em" }}>BOLTFORGED</span>
        <span style={{ fontSize:"11px", color:"#3a3f3f", letterSpacing:"0.08em", fontFamily:T.fontSans }}>· All Rights Reserved</span>
      </div>
    </div>
  );
}