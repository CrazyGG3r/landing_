import { useState, useEffect, useRef, useCallback, useMemo, useId } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 1 — DESIGN TOKENS
// Enhanced with mobile-specific breakpoints and touch optimizations
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
  cardStaggerMs: 60,
  chartBarStaggerMs: 350,
  dotRevealMs: 300,
  dotRevealStepMs: 80,
  // Mobile breakpoints
  breakpoints: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
  },
  // Mobile-specific adjustments
  mobile: {
    dotSize: 4,           // Smaller dots on mobile
    dotGap: 12,           // Reduced gap
    physics: {
      damping: 500,       // More responsive on touch
      returnDuration: 1.2,
      maxSpeed: 3000,
      speedTrigger: 80,
      shockRadius: 200,
      shockStrength: 4,
      proximity: 80,
    },
  },
  // Physics (desktop default)
  physics: {
    damping:        750,
    returnDuration: 1.5,
    maxSpeed:       5000,
    speedTrigger:   100,
    shockRadius:    250,
    shockStrength:  5,
    proximity:      120,
  },
  dotSize:    5,
  dotGap:     15,
  dotBase:    "#1a1c1c",
  dotActive:  "#ffffff",
};

// Composed card style
const cardBase = {
  background:   "radial-gradient(circle 280px at 0% 0%, #2a2c2c, #0c0d0d)",
  border:       `1px solid ${T.border}`,
  borderRadius: "10px",
  position:     "relative",
  overflow:     "hidden",
  boxShadow:    "inset 60px 60px 120px rgba(255,255,255,0.03)",
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 2 — DATA (unchanged)
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

const CURVED_LOOPS = [
  { marqueeText:"BOLTFORGED ✦ Game Optimization ✦ Research 2026 ✦",                             speed:3, curveAmount:80,   direction:"left",  opacity:0.12, top:"calc(40% - 5%)", zIndex:0  },
  { marqueeText:"Muhammad Uzair ✦ BSE-8A ✦ 22K-5176 ✦ Software ReEngineering ✦",               speed:3, curveAmount:-80,  direction:"right", opacity:0.12, top:"calc(50% + 5%)", zIndex:0  },
  { marqueeText:"Visit our main page ✦ BOLTFORGED ✦",                                                speed:5, curveAmount:400,  direction:"right", opacity:1,    bottom:"15%", zIndex:10 },
];

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 3 — UTILITIES & MOBILE DETECTION
// ─────────────────────────────────────────────────────────────────────────────
const hexToRgb = hex => {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return m ? { r:parseInt(m[1],16), g:parseInt(m[2],16), b:parseInt(m[3],16) } : { r:0, g:0, b:0 };
};

const hexToRgbArr = hex => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1],16)/255, parseInt(m[2],16)/255, parseInt(m[3],16)/255] : [1,1,1];
};

// Custom hook for mobile detection
const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(mobile);
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  return { isMobile, orientation };
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 4 — CUSTOM HOOKS (Enhanced with mobile support)
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

// Hook to prevent text selection and image dragging globally
const useDisableInteractions = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      img, svg, canvas {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
        pointer-events: none !important;
      }
      a, button, [role="button"] {
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        -ms-user-select: auto !important;
        user-select: auto !important;
      }
      .no-drag {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
};

// Hook to prevent horizontal scrolling
const usePreventHorizontalScroll = () => {
  useEffect(() => {
    const preventHorizontal = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventHorizontal, { passive: false });
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.maxWidth = '100vw';
    document.documentElement.style.maxWidth = '100vw';

    return () => {
      window.removeEventListener('wheel', preventHorizontal);
    };
  }, []);
};

// Hook to handle orientation changes gracefully
const useOrientationHandler = () => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleOrientation = () => {
      // Fix for mobile viewport height issues
      setViewportHeight(window.innerHeight);
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
      
      // Prevent automatic zoom on input focus
      const metaViewport = document.querySelector('meta[name=viewport]');
      if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
      }
    };

    handleOrientation();
    window.addEventListener('resize', handleOrientation);
    window.addEventListener('orientationchange', handleOrientation);

    return () => {
      window.removeEventListener('resize', handleOrientation);
      window.removeEventListener('orientationchange', handleOrientation);
    };
  }, []);

  return viewportHeight;
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 5 — CURVED LOOP MARQUEE (Enhanced with touch support)
// ─────────────────────────────────────────────────────────────────────────────
const CurvedLoop = ({ marqueeText='', speed=2, curveAmount=400, direction='left', interactive=true, opacity=0.12 }) => {
  const uid    = useId();
  const pathId = `curve-${uid.replace(/:/g,'')}`;
  const { isMobile } = useMobileDetect();

  const text = useMemo(() => marqueeText.replace(/\s+$/, '') + '\u00A0', [marqueeText]);

  const svgRef      = useRef(null);
  const measureRef  = useRef(null);
  const textPathRef = useRef(null);
  const spacingRef  = useRef(0);
  const offsetRef   = useRef(0);
  const dragRef     = useRef(false);
  const lastXRef    = useRef(0);
  const dirRef      = useRef(direction);
  const velRef      = useRef(0);
  const lastTimeRef = useRef(0);
  const [ready, setReady] = useState(false);

  const pathD = isMobile 
    ? `M-100,40 Q500,${40 + curveAmount * 0.6} 1540,40` // Less curve on mobile
    : `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const totalTextRef = useRef('');

  const measureAndPrime = useCallback(() => {
    const m = measureRef.current;
    const svg = svgRef.current;
    if (!m || !svg) return false;

    const spacing = m.getComputedTextLength();
    const rect = svg.getBoundingClientRect();
    if (!spacing || !rect.width) return false;

    spacingRef.current = spacing;
    offsetRef.current = -spacing;
    totalTextRef.current = Array(Math.ceil((rect.width + 600) / spacing) + 4).fill(text).join('');
    setReady(true);
    return true;
  }, [text]);

  useEffect(() => {
    let frame;
    const started = measureAndPrime();
    if (!started) return undefined;

    const step = now => {
      if (!dragRef.current && textPathRef.current && spacingRef.current) {
        const dt = lastTimeRef.current ? Math.min(2.5, (now - lastTimeRef.current) / 16.6667) : 1;
        const delta = (dirRef.current === "right" ? speed : -speed) * dt;
        let o = offsetRef.current + delta;
        if (o <= -spacingRef.current) o += spacingRef.current;
        if (o > 0) o -= spacingRef.current;
        offsetRef.current = o;
        textPathRef.current.setAttribute("startOffset", `${o}px`);
      }
      lastTimeRef.current = now;
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [measureAndPrime, speed]);

  useResizeObserver(svgRef, () => {
    measureAndPrime();
  });

  // Touch event handlers for mobile
  const onPointerDown = e => {
    if (!interactive) return;
    dragRef.current  = true;
    lastXRef.current = e.clientX;
    velRef.current   = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
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
    if (!interactive || !dragRef.current) return;
    dragRef.current = false;
    dirRef.current  = velRef.current > 0 ? 'right' : 'left';
  };

  return (
    <div
      style={{ 
        width:'100%', 
        cursor: interactive ? (isMobile ? 'pointer' : 'grab') : 'auto', 
        visibility: ready ? 'visible' : 'hidden',
        touchAction: 'pan-y pinch-zoom', // Allow vertical scroll while dragging horizontally
      }}
      onPointerDown={onPointerDown} 
      onPointerMove={onPointerMove} 
      onPointerUp={endDrag} 
      onPointerLeave={endDrag}
      onTouchStart={isMobile ? onPointerDown : undefined}
      onTouchMove={isMobile ? onPointerMove : undefined}
      onTouchEnd={isMobile ? endDrag : undefined}
    >
      <svg 
        ref={svgRef} 
        style={{ 
          userSelect:'none', 
          width:'100%', 
          aspectRatio:'100/12', 
          overflow:'visible', 
          display:'block', 
          fontSize: isMobile ? '2rem' : '3.5rem', // Smaller text on mobile
          fill:'#ffffff', 
          fontWeight:700, 
          textTransform:'uppercase', 
          lineHeight:1, 
          opacity 
        }} 
        viewBox="0 0 1440 120"
      >
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
// MODULE 6 — LIGHT RAYS (Optimized for mobile performance)
// ─────────────────────────────────────────────────────────────────────────────
const LightRays = ({ 
  raysOrigin="bottom-center", 
  raysColor="#ffffff", 
  raysSpeed=1, 
  lightSpread=1, 
  rayLength=3, 
  fadeDistance=1, 
  saturation=0, 
  mouseInfluence=0.1, 
  noiseAmount=0, 
  distortion=0, 
  pulsating=false 
}) => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const glRef     = useRef(null);
  const locsRef   = useRef(null);
  const mouseRef  = useRef({ x:0.5, y:0.5 });
  const smoothRef = useRef({ x:0.5, y:0.5 });
  const { isMobile } = useMobileDetect();

  // Disable mouse influence on mobile for performance
  const effectiveMouseInfluence = isMobile ? 0 : mouseInfluence;
  const effectiveNoiseAmount = isMobile ? 0 : noiseAmount; // Reduce noise on mobile
  const effectiveDistortion = isMobile ? 0 : distortion;

  const propsRef = useRef({});
  useEffect(() => { 
    propsRef.current = { 
      raysOrigin, 
      raysColor, 
      raysSpeed, 
      lightSpread, 
      rayLength, 
      fadeDistance, 
      saturation, 
      mouseInfluence: effectiveMouseInfluence, 
      noiseAmount: effectiveNoiseAmount, 
      distortion: effectiveDistortion, 
      pulsating 
    }; 
  }, [raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, fadeDistance, saturation, effectiveMouseInfluence, effectiveNoiseAmount, effectiveDistortion, pulsating]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initGL = () => {
      const gl = canvas.getContext("webgl", { 
        powerPreference: isMobile ? "low-power" : "high-performance",
        antialias: !isMobile // Disable antialiasing on mobile
      });
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
      const map = { 
        'top-left':[0,-o*h,[0,1]], 
        'top-right':[w,-o*h,[0,1]], 
        'left':[-o*w,.5*h,[1,0]], 
        'right':[(1+o)*w,.5*h,[-1,0]], 
        'bottom-left':[0,(1+o)*h,[0,-1]], 
        'bottom-right':[w,(1+o)*h,[0,-1]], 
        'bottom-center':[.5*w,(1+o)*h,[0,-1]] 
      };
      const v = map[origin] || [.5*w,-o*h,[0,1]];
      return { anchor:[v[0],v[1]], dir:v[2] };
    };

    let gl = initGL();
    if (!gl) return;

    const resize = () => {
      const p = canvas.parentElement; if (!p) return;
      // Limit pixel ratio on mobile for performance
      const dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = p.clientWidth * dpr; 
      canvas.height = p.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = e => {
      if (isMobile) return; // Disable mouse tracking on mobile
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x:(e.clientX - r.left)/r.width, y:(e.clientY - r.top)/r.height };
    };
    
    if (!isMobile) {
      window.addEventListener("mousemove", onMove);
    }

    const onContextLost = e => { e.preventDefault(); cancelAnimationFrame(rafRef.current); };
    const onContextRestored = () => { gl = initGL(); resize(); startLoop(); };
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    const startLoop = () => {
      const loop = t => {
        const p = propsRef.current;
        const w = canvas.width, h = canvas.height;
        const { anchor, dir } = getAnchorAndDir(p.raysOrigin, w, h);
        
        if (!isMobile) {
          const sm = smoothRef.current, m = mouseRef.current;
          sm.x = sm.x*0.92 + m.x*0.08; 
          sm.y = sm.y*0.92 + m.y*0.08;
        }
        
        const locs = locsRef.current; 
        const rgb = hexToRgbArr(p.raysColor);
        
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
        gl.uniform2f(locs.mousePos, smoothRef.current.x, smoothRef.current.y);
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
      if (!isMobile) window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
    };
  }, [isMobile]);

  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:0, borderRadius:"inherit" }} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 7 — DOT GRID (Enhanced with mobile optimizations)
// ─────────────────────────────────────────────────────────────────────────────
const RIPPLE_SPEED  = 4;
const TRAIL_FLOOR   = 0.0025;
const TRAIL_DECAY   = Math.pow(TRAIL_FLOOR, 1/130);
const TRAIL_GAMMA   = 1 / 2.2;
const TRAIL_SOFTEN  = 1.45;

const TRAIL_LUT = new Float32Array(256);
for (let i = 0; i < 256; i++) TRAIL_LUT[i] = Math.pow(i / 255, TRAIL_GAMMA);

const DotGrid = ({ 
  dotSize = T.dotSize, 
  gap = T.dotGap, 
  baseColor = T.dotBase, 
  activeColor = T.dotActive, 
  proximity = T.physics.proximity, 
  speedTrigger = T.physics.speedTrigger, 
  shockRadius = T.physics.shockRadius, 
  shockStrength = T.physics.shockStrength, 
  maxSpeed = T.physics.maxSpeed, 
  resistance = T.physics.damping, 
  returnDuration = T.physics.returnDuration 
}) => {
  const { isMobile } = useMobileDetect();
  
  // Use mobile-optimized values if on mobile
  const effectiveDotSize = isMobile ? T.mobile.dotSize : dotSize;
  const effectiveGap = isMobile ? T.mobile.dotGap : gap;
  const effectiveProximity = isMobile ? T.mobile.physics.proximity : proximity;
  const effectiveSpeedTrigger = isMobile ? T.mobile.physics.speedTrigger : speedTrigger;
  const effectiveShockRadius = isMobile ? T.mobile.physics.shockRadius : shockRadius;
  const effectiveShockStrength = isMobile ? T.mobile.physics.shockStrength : shockStrength;
  const effectiveMaxSpeed = isMobile ? T.mobile.physics.maxSpeed : maxSpeed;
  const effectiveResistance = isMobile ? T.mobile.physics.damping : resistance;
  const effectiveReturnDuration = isMobile ? T.mobile.physics.returnDuration : returnDuration;

  const wrapperRef = useRef(null);
  const canvasRef  = useRef(null);
  const dotsRef    = useRef([]);
  const ripplesRef = useRef([]);
  const pointerRef = useRef({ x:-9999, y:-9999, vx:0, vy:0, speed:0, lastTime:0, lastX:0, lastY:0 });
  const baseRgb    = useMemo(() => hexToRgb(baseColor),   [baseColor]);
  const activeRgb  = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    const p = new Path2D(); p.arc(0, 0, effectiveDotSize/2, 0, Math.PI*2); return p;
  }, [effectiveDotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current, canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const { width, height } = wrap.getBoundingClientRect();
    const dpr = isMobile ? 1 : (window.devicePixelRatio || 1); // Lower DPR on mobile for performance
    canvas.width  = width  * dpr; canvas.height = height * dpr;
    canvas.style.width  = `${width}px`; canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    const cell   = effectiveDotSize + effectiveGap;
    const cols   = Math.floor((width  + effectiveGap) / cell);
    const rows   = Math.floor((height + effectiveGap) / cell);
    const startX = (width  - (cols*cell - effectiveGap)) / 2 + effectiveDotSize/2;
    const startY = (height - (rows*cell - effectiveGap)) / 2 + effectiveDotSize/2;
    const dots   = [];
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++)
      dots.push({ cx:startX+x*cell, cy:startY+y*cell, xOffset:0, yOffset:0, vx:0, vy:0, active:false, trail:0 });
    dotsRef.current  = dots;
    ripplesRef.current = [];
  }, [effectiveDotSize, effectiveGap, isMobile]);

  useEffect(() => {
    const DAMPING = 1 - (1/effectiveResistance)*16;
    const RETURN  = 1 / (effectiveReturnDuration * 60);
    const proxSq  = effectiveProximity * effectiveProximity;
    let rafId;
    let lastFrameTime = 0;

    const loop = (timestamp) => {
      const canvas = canvasRef.current; if (!canvas) { rafId = requestAnimationFrame(loop); return; }
      const ctx    = canvas.getContext("2d"); if (!ctx) { rafId = requestAnimationFrame(loop); return; }

      // Throttle physics updates on mobile for performance
      const shouldUpdatePhysics = !isMobile || (timestamp - lastFrameTime > 16); // ~60fps on mobile

      if (shouldUpdatePhysics) {
        lastFrameTime = timestamp;

        // Ripple propagation
        const ripples = ripplesRef.current;
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.radius += RIPPLE_SPEED;
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
          if (r.radius > r.maxRadius) ripples.splice(i, 1);
        }

        // Physics tick + trail decay
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
          if (dot.trail > 0) {
            dot.trail *= TRAIL_DECAY;
            if (dot.trail < TRAIL_FLOOR) dot.trail = 0;
          }
        }
      }

      // Draw pass (always run)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x:px, y:py } = pointerRef.current;
      
      for (const dot of dotsRef.current) {
        const ox  = dot.cx + dot.xOffset, oy = dot.cy + dot.yOffset;
        const dx  = dot.cx - px, dy = dot.cy - py;
        const dsq = dx*dx + dy*dy;

        let t = dot.trail > 0 ? TRAIL_LUT[Math.round(dot.trail * 255)] : 0;

        if (dsq <= proxSq) {
          const linear = 1 - Math.sqrt(dsq) / effectiveProximity;
          const eased  = 1 - Math.pow(1 - linear, 2.4);
          if (eased > t) t = eased;
          dot.trail = Math.max(dot.trail, eased * 0.75);
        }

        if (t <= 0) { 
          ctx.save(); 
          ctx.translate(dot.cx, dot.cy); 
          ctx.fillStyle = baseColor; 
          ctx.fill(circlePath); 
          ctx.restore(); 
          continue; 
        }

        const softT = Math.pow(t * t * (3 - 2 * t), TRAIL_SOFTEN);
        const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * softT);
        const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * softT);
        const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * softT);

        ctx.save(); 
        ctx.translate(ox, oy); 
        ctx.fillStyle = `rgb(${r},${g},${b})`; 
        ctx.fill(circlePath); 
        ctx.restore();
      }
      
      rafId = requestAnimationFrame(loop);
    };
    
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [effectiveResistance, effectiveReturnDuration, effectiveProximity, baseColor, baseRgb, activeRgb, circlePath, isMobile]);

  useResizeObserver(wrapperRef, buildGrid);
  useEffect(() => { buildGrid(); }, [buildGrid]);

  useEffect(() => {
    const el = wrapperRef.current; if (!el) return;
    
    const onMove = e => {
      const now = performance.now(), pr = pointerRef.current;
      const dt  = pr.lastTime ? now - pr.lastTime : 16;
      let vx = (e.clientX - pr.lastX) / dt * 1000, vy = (e.clientY - pr.lastY) / dt * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > effectiveMaxSpeed) { const s = effectiveMaxSpeed/speed; vx *= s; vy *= s; speed = effectiveMaxSpeed; }
      pr.lastTime = now; pr.lastX = e.clientX; pr.lastY = e.clientY; pr.vx = vx; pr.vy = vy; pr.speed = speed;
      const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return;
      pr.x = e.clientX - rect.left; pr.y = e.clientY - rect.top;
      
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (dist >= effectiveProximity) continue;

        const proximityGain = Math.max(0, 1 - dist / effectiveProximity);
        dot.trail = Math.min(1, dot.trail + proximityGain * 0.1);

        if (speed > effectiveSpeedTrigger && !dot.active) {
          dot.active = true;
          dot.trail  = Math.min(1, dot.trail + 0.45 * proximityGain);
          dot.vx = (dot.cx - pr.x)*0.3 + vx*0.08;
          dot.vy = (dot.cy - pr.y)*0.3 + vy*0.08;
        }
      }
    };

    const onClick = e => {
      const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return;
      ripplesRef.current.push({
        cx:        e.clientX - rect.left,
        cy:        e.clientY - rect.top,
        radius:    0,
        maxRadius: effectiveShockRadius,
        strength:  effectiveShockStrength * 18,
      });
    };

    const onTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (touch) {
        onMove({
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
      }
    };

    const onTouchStart = (e) => {
      const touch = e.touches[0];
      if (touch) {
        onClick({
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
      }
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("click", onClick);
    
    if (isMobile) {
      el.addEventListener("touchmove", onTouchMove, { passive: false });
      el.addEventListener("touchstart", onTouchStart, { passive: true });
    }

    return () => { 
      el.removeEventListener("mousemove", onMove); 
      el.removeEventListener("click", onClick);
      if (isMobile) {
        el.removeEventListener("touchmove", onTouchMove);
        el.removeEventListener("touchstart", onTouchStart);
      }
    };
  }, [effectiveMaxSpeed, effectiveSpeedTrigger, effectiveProximity, effectiveShockRadius, effectiveShockStrength, isMobile]);

  return (
    <div ref={wrapperRef} style={{ width:"100%", height:"100%", position:"absolute", inset:0, touchAction:"none" }}>
      <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 8 — SPOTLIGHT CARD (with touch support)
// ─────────────────────────────────────────────────────────────────────────────
const SpotlightCard = ({ children, spotlightColor="rgba(0,229,255,0.15)", style, className="" }) => {
  const divRef = useRef(null);
  const { isMobile } = useMobileDetect();
  
  const onMouseMove = useCallback(e => {
    if (isMobile) return; // Disable spotlight on mobile for performance
    const rect = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    divRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  }, [spotlightColor, isMobile]);

  return <div ref={divRef} onMouseMove={onMouseMove} className={`card-spotlight ${className}`} style={style}>{children}</div>;
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 9 — CHART PRIMITIVES (unchanged)
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
  const { isMobile } = useMobileDetect();
  const uid = useId();
  const id  = `dot-glow-${uid.replace(/:/g,'')}`;
  
  useEffect(() => {
    if (!ready) { setVisible(false); return; }
    const id = setTimeout(() => setVisible(true), T.dotRevealMs + index * T.dotRevealStepMs);
    return () => clearTimeout(id);
  }, [ready, index]);
  
  // Disable hover effects on mobile
  const handleMouseEnter = isMobile ? undefined : () => setHovered(true);
  const handleMouseLeave = isMobile ? undefined : () => setHovered(false);
  
  return (
    <g onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <defs><filter id={id} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <circle cx={cx} cy={cy} r={10} fill="transparent"/>
      <circle cx={cx} cy={cy} r={isMobile ? (visible ? 3 : 0) : (hovered ? 5 : (visible ? 3 : 0))} fill={hovered ? "#ffffff" : fill} filter={hovered ? `url(#${id})` : undefined} style={{ transition:"r 0.3s cubic-bezier(0.34,1.56,0.64,1), fill 0.2s ease" }}/>
    </g>
  );
};

const makeLineDotComponent = (fill, ready) => {
  const Component = (props) => <AnimatedLineDot {...props} fill={fill} ready={ready} index={props.index ?? 0} />;
  Component.displayName = `LineDot_${fill}`;
  return Component;
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 10 — SHARED UI PRIMITIVES (Enhanced with mobile)
// ─────────────────────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  const { isMobile } = useMobileDetect();
  
  if (!active || !payload?.length) return null;
  
  // Smaller tooltip on mobile
  const padding = isMobile ? "8px 12px" : "12px 16px";
  const fontSize = isMobile ? "11px" : "13px";
  
  return (
    <div style={{ ...cardBase, padding, fontSize, color:T.text, fontFamily:T.fontSans, minWidth: isMobile ? "120px" : "140px" }}>
      <div style={{ fontWeight:"700", marginBottom: isMobile ? "4px" : "6px", color:T.white }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color:T.mutedHi, marginBottom:"2px", fontSize: isMobile ? "10px" : "13px" }}>{p.name}: <span style={{ color:T.white }}>{p.value}{p.name==="Avg Game Size"?" GB":""}</span></div>
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

const SectionSub = ({ children }) => {
  const { isMobile } = useMobileDetect();
  return <p style={{ fontSize: isMobile ? "13px" : "14px", color:T.muted, fontFamily:T.fontSans, lineHeight:1.7, maxWidth:"520px", margin:"0 auto", padding: isMobile ? "0 10px" : "0" }}>{children}</p>;
};

const Divider = () => <div style={{ width:"100%", height:"1px", background:`linear-gradient(90deg,transparent,${T.border} 30%,${T.border} 70%,transparent)` }}/>;

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 11 — STAT CARD (Enhanced with mobile)
// ─────────────────────────────────────────────────────────────────────────────
const LINE_GAP = 18, PADDING = 14;

const StatCard = ({ value, label, sub }) => {
  const [hovered,  setHovered ] = useState(false);
  const [idleSize, setIdleSize] = useState("3rem");
  const outerRef = useRef(null);
  const { isMobile } = useMobileDetect();

  const onResize = useCallback(({ width, height }) => {
    const innerW = width  - (LINE_GAP + PADDING) * 2;
    const innerH = height - (LINE_GAP + PADDING) * 2;
    const size = Math.floor(Math.min(innerW / (value.length * 0.62), innerH * 0.72));
    setIdleSize(`${Math.min(size, isMobile ? 32 : 48)}px`);
  }, [value, isMobile]);

  useResizeObserver(outerRef, onResize);

  // Disable hover on mobile, use tap feedback instead
  const handleTouchStart = useCallback(() => {
    if (isMobile) setHovered(true);
  }, [isMobile]);

  const handleTouchEnd = useCallback(() => {
    if (isMobile) setHovered(false);
  }, [isMobile]);

  return (
    <div 
      ref={outerRef} 
      className="outer" 
      style={{ 
        flex:1, 
        minWidth: isMobile ? "140px" : "180px",
        width: isMobile ? "calc(50% - 10px)" : "auto",
        transform: hovered ? (isMobile ? "scale(0.98)" : "translateY(-3px)") : "translateY(0)", 
        transition: "transform 0.28s cubic-bezier(0.2,0.7,0.2,1)", 
        willChange:"transform" 
      }} 
      onMouseEnter={() => !isMobile && setHovered(true)} 
      onMouseLeave={() => !isMobile && setHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className="dot"/>
      <div className="card">
        <div className="ray"/>
        <div className="line topl"/><div className="line bottoml"/><div className="line leftl"/><div className="line rightl"/>
        <div className="text" style={{ fontSize: idleSize, transform: hovered ? (isMobile ? "scale(0.96)" : "translateY(-10px) scale(0.94)") : "translateY(0px) scale(1)", transformOrigin:"center center", transition:"transform 0.35s cubic-bezier(0.34,1.2,0.64,1)", willChange:"transform" }}>{value}</div>
        <div style={{ position:"absolute", bottom: isMobile ? "18px" : "28px", left:0, right:0, textAlign:"center", padding:"0 10px", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0px)" : "translateY(10px)", transition:"opacity 0.3s ease 0.02s, transform 0.3s cubic-bezier(0.34,1.2,0.64,1)", willChange:"opacity, transform" }}>
          <div style={{ fontSize: isMobile ? "9px" : "11px", fontWeight:"700", color:"#aaa", textTransform:"uppercase", letterSpacing:"0.1em", fontFamily:T.fontSans }}>{label}</div>
          {sub && <div style={{ fontSize: isMobile ? "8px" : "10px", color:T.white, marginTop:"3px", fontFamily:T.fontSans }}>{sub}</div>}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 12 — SECTION COMPONENTS (Enhanced with mobile)
// ─────────────────────────────────────────────────────────────────────────────
const OverviewSection = ({ sectionRef, visible }) => {
  const [chartRef, chartReady] = useIntersectionReveal(0.3);
  const { isMobile } = useMobileDetect();

  const darkBarShape  = useCallback(p => <AnimatedBar {...p} fill="#4a4a4a" ready={chartReady} isActive={p.activeBar}/>, [chartReady]);
  const lightBarShape = useCallback(p => <AnimatedBar {...p} fill="#787878" ready={chartReady} isActive={p.activeBar}/>, [chartReady]);

  const fpsDot    = useMemo(() => makeLineDotComponent("#c8c8c8", chartReady), [chartReady]);
  const budgetDot = useMemo(() => makeLineDotComponent("#484848", chartReady), [chartReady]);

  return (
    <div ref={sectionRef}>
      <div style={{ position:"relative", overflow:"hidden", borderBottom:`1px solid ${T.border}`, paddingBottom: isMobile ? "50px" : "95px" }}>
        <DotGrid/>
        <div className={`fade-in ${visible ? "visible" : ""}`} style={{ position:"relative", zIndex:1, maxWidth:"760px", margin:"0 auto", padding: isMobile ? "100px 16px 40px" : "160px 24px 60px", textAlign:"center", pointerEvents:"none" }}>
          <SectionEyebrow style={{ display:"inline-block", background:"#000000", padding: isMobile ? "2px 8px" : "3px 10px", borderRadius:"4px" }}>Research Overview</SectionEyebrow>
          <h1 className="heading-text" style={{ fontSize: isMobile ? "clamp(24px,8vw,30px)" : "clamp(30px,5vw,52px)", lineHeight:1.12, marginBottom:"8px", letterSpacing:"-0.02em" }}>
            Optimization in Game Development<br/><span style={{ opacity:0.5 }}>A Field in Tension</span>
          </h1>
          <p style={{ fontSize: isMobile ? "13px" : "14px", color:"white", lineHeight:1.8, maxWidth:"420px", margin:"8px auto 0", textAlign:"justify", textAlignLast:"center", textShadow:"2px 2px 0 #000, -2px -2px 0 #000", padding: isMobile ? "0 12px" : "0" }}>
            Performance optimization in games has evolved from byte-level craft to an industry-scale discipline — defined equally by innovation and regression.
          </p>
        </div>
      </div>

      <div className={`fade-in ${visible ? "visible" : ""}`} style={{ 
        maxWidth:"960px", 
        margin: isMobile ? "-50px auto 40px" : "-95px auto 80px", 
        padding:"0 16px", 
        display:"flex", 
        gap: isMobile ? "10px" : "20px", 
        flexWrap:"wrap", 
        justifyContent:"center", 
        position:"relative", 
        zIndex:2 
      }}>
        {STAT_CARDS.map((s, i) => <StatCard key={i} {...s}/>)}
      </div>

      <Divider/>

      <div style={{ padding: isMobile ? "40px 16px" : "80px 24px" }}>
        <div style={{ maxWidth:"960px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom: isMobile ? "32px" : "52px" }}>
            <SectionEyebrow>Quantitative Trends</SectionEyebrow>
            <SectionTitle>Growth, Complexity & Performance</SectionTitle>
            <SectionSub>Tracking key indicators across two decades of commercial game development.</SectionSub>
          </div>
          <div ref={chartRef} className="chart-grid">
            <div style={{ ...cardBase, padding: isMobile ? "16px 12px" : "28px 20px" }}>
              <div style={{ fontSize: isMobile ? "12px" : "13px", fontWeight:"700", color:T.text, marginBottom:"4px" }}>Game Size vs. Performance Reports</div>
              <div style={{ fontSize: isMobile ? "10px" : "11px", color:T.muted, marginBottom: isMobile ? "12px" : "22px", lineHeight:1.6 }}>Average install size (GB) alongside indexed performance bug reports at launch</div>
              <ResponsiveContainer width="100%" height={isMobile ? 180 : 210}>
                <BarChart data={CHART_DATA} barGap={4} syncId="year-sync" syncMethod="value" margin={{ left:0, right:16, top:4, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1c1c"/>
                  <XAxis dataKey="year" tick={{ fontSize: isMobile ? 8 : 10, fill:T.muted }} axisLine={{ stroke:T.border }} tickLine={false}/>
                  <YAxis width={isMobile ? 28 : 32} tick={{ fontSize: isMobile ? 8 : 10, fill:T.muted }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTooltip/>} cursor={{ fill:"rgba(255,255,255,0.06)" }}/>
                  <Legend wrapperStyle={{ fontSize: isMobile ? "9px" : "11px", color:T.mutedHi }}/>
                  <Bar dataKey="avgSize"    name="Avg Game Size" fill="#4a4a4a" shape={darkBarShape}/>
                  <Bar dataKey="bugReports" name="Perf. Reports"  fill="#787878" shape={lightBarShape}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ ...cardBase, padding: isMobile ? "16px 12px" : "28px 20px" }}>
              <div style={{ fontSize: isMobile ? "12px" : "13px", fontWeight:"700", color:T.text, marginBottom:"4px" }}>Frame Stability vs. Development Cost</div>
              <div style={{ fontSize: isMobile ? "10px" : "11px", color:T.muted, marginBottom: isMobile ? "12px" : "22px", lineHeight:1.6 }}>Launch-day frame stability index (%) against average production budgets (USD millions)</div>
              <ResponsiveContainer width="100%" height={isMobile ? 180 : 210}>
                <LineChart data={PERFORMANCE_DATA} syncId="year-sync" syncMethod="value" margin={{ left:0, right:16, top:4, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1c1c"/>
                  <XAxis dataKey="year" tick={{ fontSize: isMobile ? 8 : 10, fill:T.muted }} axisLine={{ stroke:T.border }} tickLine={false}/>
                  <YAxis width={isMobile ? 28 : 32} tick={{ fontSize: isMobile ? 8 : 10, fill:T.muted }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTooltip/>} cursor={{ stroke:"rgba(255,255,255,0.05)", strokeWidth:1 }}/>
                  <Legend wrapperStyle={{ fontSize: isMobile ? "9px" : "11px", color:T.mutedHi }}/>
                  <Line type="monotone" dataKey="fps"    name="Perf. Index"  stroke="#c8c8c8" strokeWidth={2} dot={fpsDot}    activeDot={{ r: isMobile ? 4 : 5, fill:"#ffffff", stroke:"#ffffff", strokeWidth:0, filter:"drop-shadow(0 0 6px #fff)" }} strokeDasharray={chartReady?"0":"1000"} className={`line-animated${chartReady?" ready":""}`}/>
                  <Line type="monotone" dataKey="budget" name="Budget ($M)"   stroke="#484848" strokeWidth={2} dot={budgetDot} activeDot={{ r: isMobile ? 4 : 5, fill:"#888888", stroke:"#888888", strokeWidth:0, filter:"drop-shadow(0 0 6px #888)" }} strokeDasharray={chartReady?"5 3":"1000"} className={`line-animated${chartReady?" ready delay":""}`}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p style={{ fontSize: isMobile ? "9px" : "11px", color:T.muted, textAlign:"center", marginTop:"16px", fontStyle:"italic", padding: isMobile ? "0 12px" : "0" }}>Note: Performance index and bug report data are derived from aggregated industry post-mortems and launch reviews. Figures represent indicative trends.</p>
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
  const { isMobile } = useMobileDetect();

  const handleSelect = useCallback(i => {
    if (i === activeIdx) return;
    setFading(true);
    clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => {
      setDisplayIdx(i);
      setFading(false);
    }, 180);
    setActiveIdx(i);
  }, [activeIdx]);

  useEffect(() => () => clearTimeout(fadeTimer.current), []);

  const current = TIMELINE_DATA[displayIdx];

  return (
    <div ref={sectionRef}>
      <div style={{ maxWidth:"960px", margin:"0 auto", padding: isMobile ? "40px 16px" : "80px 24px" }}>
        <div style={{ textAlign:"center", marginBottom: isMobile ? "32px" : "56px" }}>
          <SectionEyebrow>Historical Context</SectionEyebrow>
          <SectionTitle>Five Decades of Optimization</SectionTitle>
          <SectionSub>Select an era to explore how the field evolved.</SectionSub>
        </div>
        <div style={{ 
          display:"flex", 
          justifyContent:"space-between", 
          alignItems:"center", 
          position:"relative", 
          marginBottom: isMobile ? "24px" : "36px", 
          padding:"0 10px",
          overflowX: isMobile ? "auto" : "visible",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
          <style>{`
            div[style*="overflowX: auto"]::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div style={{ position:"absolute", left:"10px", right:"10px", top:"50%", height:"1px", background:"#1e2020", zIndex:0 }}/>
          <div style={{ position:"absolute", left:"10px", top:"50%", height:"1px", background:"linear-gradient(90deg,rgba(255,255,255,0.3),rgba(255,255,255,0.08))", zIndex:0, width:`${(activeIdx/(TIMELINE_DATA.length-1))*100}%`, transition:"width 0.5s cubic-bezier(0.4,0,0.2,1)", maxWidth:"calc(100% - 20px)" }}/>
          {TIMELINE_DATA.map((t, i) => (
            <div 
              key={i} 
              onClick={() => handleSelect(i)} 
              className={`tl-dot${activeIdx===i?" active":""}`} 
              style={{ 
                zIndex:1, 
                position:"relative", 
                width: isMobile ? "40px" : "56px", 
                height: isMobile ? "40px" : "56px", 
                borderRadius:"50%", 
                display:"flex", 
                flexDirection:"column", 
                alignItems:"center", 
                justifyContent:"center", 
                transform:activeIdx===i?"scale(1)":"scale(0.78)", 
                transformOrigin:"center center", 
                background:activeIdx===i?"radial-gradient(circle at 30% 30%,#3a3c3c,#0c0d0d)":"radial-gradient(circle at 30% 30%,#1a1c1c,#0c0d0d)", 
                border:`1px solid ${activeIdx===i?"rgba(255,255,255,0.18)":T.border}`, 
                boxShadow:activeIdx===i?"0 0 24px rgba(255,255,255,0.07)":"none", 
                color:activeIdx===i?T.white:T.muted, 
                cursor:"pointer", 
                transition:"transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease",
                flexShrink: 0,
                margin: isMobile ? "0 2px" : "0",
              }}
            >
              <span style={{ fontSize: isMobile ? "8px" : "10px", fontWeight:"700", fontFamily:T.fontSans, letterSpacing:"0.03em" }}>{t.era}</span>
            </div>
          ))}
        </div>
        <SpotlightCard spotlightColor="rgba(0,229,255,0.12)" style={{ ...cardBase, padding: isMobile ? "24px 20px" : "40px 44px", transition:"none" }}>
          <div style={{ opacity: fading ? 0 : 1, transition:"opacity 0.18s ease" }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:"16px", marginBottom:"16px", flexWrap:"wrap" }}>
              <span className="heading-text" style={{ fontSize: isMobile ? "24px" : "32px" }}>{current.era}</span>
              <span style={{ fontSize: isMobile ? "13px" : "15px", fontWeight:"600", color:T.mutedHi }}>{current.label}</span>
            </div>
            <p style={{ fontSize: isMobile ? "13px" : "14px", color:T.muted, lineHeight:1.85, maxWidth:"680px" }}>{current.desc}</p>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};

const ResearchSection = ({ sectionRef }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cardKey,        setCardKey       ] = useState(0);
  const { isMobile } = useMobileDetect();

  const handleFilter = useCallback(cat => { setActiveCategory(cat); setCardKey(k => k+1); }, []);
  const filtered = useMemo(
    () => activeCategory === "All" ? RESEARCH_QUESTIONS : RESEARCH_QUESTIONS.filter(q => q.category === activeCategory),
    [activeCategory]
  );

  return (
    <div ref={sectionRef}>
      <div style={{ padding: isMobile ? "40px 16px" : "80px 24px" }}>
        <div style={{ maxWidth:"960px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom: isMobile ? "28px" : "44px" }}>
            <SectionEyebrow>Open Inquiry</SectionEyebrow>
            <SectionTitle>Research Question Explorer</SectionTitle>
            <SectionSub>The following questions represent active areas of academic and industry investigation in game performance research.</SectionSub>
          </div>
          <div style={{ 
            display:"flex", 
            gap: isMobile ? "4px" : "8px", 
            flexWrap:"wrap", 
            justifyContent:"center", 
            marginBottom: isMobile ? "24px" : "40px",
            padding: isMobile ? "0 4px" : "0",
          }}>
            {RQ_CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn${activeCategory===cat?" active":""}`} 
                onClick={() => handleFilter(cat)} 
                style={{ 
                  background:activeCategory===cat?"#1a1c1c":"transparent", 
                  border:`1px solid ${activeCategory===cat?T.borderHi:T.border}`, 
                  borderRadius:"6px", 
                  padding: isMobile ? "6px 12px" : "8px 18px", 
                  cursor:"pointer", 
                  fontSize: isMobile ? "10px" : "11px", 
                  fontWeight:"600", 
                  fontFamily:T.fontSans, 
                  color:activeCategory===cat?T.white:T.muted, 
                  letterSpacing:"0.06em", 
                  textTransform:"uppercase",
                  touchAction: "manipulation",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div style={{ 
            display:"grid", 
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(280px,1fr))", 
            gap: isMobile ? "12px" : "16px" 
          }}>
            {filtered.map((q, i) => (
              <SpotlightCard 
                key={`${cardKey}-${q.id}`} 
                spotlightColor={IMPACT_META[q.impact].spotlight} 
                className="rq-card entering" 
                style={{ 
                  ...cardBase, 
                  padding: isMobile ? "20px 16px" : "28px 24px", 
                  border:`1px solid ${T.border}`, 
                  animationDelay:`${i * T.cardStaggerMs}ms`,
                }}
              >
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"14px", flexWrap:"wrap", gap:"8px" }}>
                  <span style={{ fontSize: isMobile ? "9px" : "10px", fontWeight:"700", color:T.mutedHi, textTransform:"uppercase", letterSpacing:"0.12em", background:"rgba(255,255,255,0.04)", padding: isMobile ? "2px 8px" : "3px 10px", borderRadius:"4px", border:`1px solid ${T.border}` }}>{q.category}</span>
                  <span style={{ fontSize: isMobile ? "9px" : "10px", fontWeight:"700", color:IMPACT_META[q.impact].color }}>● {q.impact}</span>
                </div>
                <div className="heading-text" style={{ fontSize: isMobile ? "15px" : "16px", marginBottom:"12px", lineHeight:1.35 }}>{q.title}</div>
                <p style={{ fontSize: isMobile ? "11px" : "12px", color:T.muted, lineHeight:1.75 }}>{q.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CreditsSection = () => {
  const { isMobile } = useMobileDetect();

  return (
    <div style={{ padding: isMobile ? "40px 16px" : "80px 24px", position:"relative", overflow:"hidden" }}>
      {CURVED_LOOPS.map((cfg, i) => (
        <div key={i} style={{ position:"absolute", top:cfg.top ?? undefined, bottom:cfg.bottom ?? undefined, left:0, right:0, pointerEvents:"none", zIndex:cfg.zIndex }}>
          <CurvedLoop 
            marqueeText={cfg.marqueeText} 
            speed={cfg.speed} 
            curveAmount={isMobile ? cfg.curveAmount * 0.5 : cfg.curveAmount} 
            direction={cfg.direction} 
            opacity={isMobile ? cfg.opacity * 0.7 : cfg.opacity} 
            interactive={cfg.zIndex > 0}
          />
        </div>
      ))}
      <div style={{ maxWidth:"960px", margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"44px" }}>
          <SectionEyebrow>Project Credits</SectionEyebrow>
          <SectionTitle>Author & Contributor</SectionTitle>
          <SectionSub>This research compilation and interactive visualization was developed by:</SectionSub>
        </div>
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", position:"relative", zIndex:5 }}>
          <SpotlightCard 
            spotlightColor="rgba(21,255,0,0.18)" 
            className="rq-card entering" 
            style={{ 
              ...cardBase, 
              padding: isMobile ? "32px 24px" : "48px 56px", 
              border:`1px solid ${T.border}`, 
              maxWidth:"600px", 
              width:"100%", 
              textAlign:"center", 
              background:"radial-gradient(circle 380px at 50% 30%,#2a2c2c,#0c0d0d)", 
              position:"relative", 
              overflow:"hidden" 
            }}
          >
            <LightRays 
              raysOrigin="bottom-center" 
              raysColor="#ffffff" 
              raysSpeed={1} 
              lightSpread={1} 
              rayLength={3} 
              fadeDistance={1} 
              saturation={0} 
              mouseInfluence={isMobile ? 0 : 0.1} 
              noiseAmount={0} 
              distortion={0} 
              pulsating={false}
            />
            <div style={{ marginBottom:"24px" }}>
              <span style={{ fontSize: isMobile ? "12px" : "14px", fontWeight:"500", color:"#b0b5b5", textTransform:"uppercase", letterSpacing:"0.2em", background:"rgba(255,255,255,0.03)", padding: isMobile ? "4px 12px" : "4px 16px", borderRadius:"30px", border:`1px solid ${T.borderHi}`, display:"inline-block" }}>BSE-8A · RESEARCH WORK</span>
            </div>
            <div className="heading-text" style={{ fontSize: isMobile ? "clamp(32px,8vw,42px)" : "clamp(42px,6vw,58px)", marginBottom:"16px", lineHeight:1.1 }}>Muhammad Uzair</div>
            <div style={{ fontSize: isMobile ? "20px" : "24px", fontWeight:"400", color:"#b0b5b5", marginBottom:"24px", fontFamily:`'DM Sans', monospace`, letterSpacing:"0.02em" }}>22K-5176</div>
            <div style={{ height:"1px", width:"120px", margin:"24px auto", background:`linear-gradient(90deg,transparent,${T.mutedHi},transparent)` }}/>
            <div style={{ fontSize: isMobile ? "13px" : "14px", color:"#c8cccc", lineHeight:1.8, maxWidth:"400px", margin:"0 auto", padding: isMobile ? "0 12px" : "0" }}>
              <p>Research compilation, interactive visualization design, and implementation of performance optimization case studies.</p>
              <p style={{ marginTop:"16px", fontSize: isMobile ? "11px" : "12px", color:"#a0a5a5" }}>Data aggregated from industry post-mortems, academic publications, and performance analysis reports (2024–2026).</p>
            </div>
            <div style={{ display:"flex", justifyContent:"center", gap: isMobile ? "12px" : "24px", marginTop:"32px", fontSize: isMobile ? "9px" : "11px", color:"#a0a5a5", textTransform:"uppercase", letterSpacing:"0.1em", flexWrap:"wrap" }}>
              <span style={{ padding: isMobile ? "4px 8px" : "4px 12px", background:"rgba(255,255,255,0.02)", borderRadius:"4px" }}>Game Optimization</span>
              <span style={{ padding: isMobile ? "4px 8px" : "4px 12px", background:"rgba(255,255,255,0.02)", borderRadius:"4px" }}>Performance Research</span>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 13 — NAV (Enhanced with mobile)
// ─────────────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key:"overview", label:"Overview"  },
  { key:"timeline", label:"Timeline"  },
  { key:"research", label:"Research"  },
];

const Header = ({ activeSection, onNavigate }) => {
  const { isMobile } = useMobileDetect();

  return (
    <div style={{ 
      background:"rgba(12,13,13,0.94)", 
      backdropFilter:"blur(12px)", 
      padding: isMobile ? "12px 20px" : "18px 40px", 
      display:"flex", 
      alignItems:"center", 
      justifyContent:"space-between", 
      borderBottom:`1px solid ${T.border}`, 
      position:"sticky", 
      top:0, 
      zIndex:100,
      flexWrap: isMobile ? "wrap" : "nowrap",
      gap: isMobile ? "8px" : "0",
    }}>
      <div style={{ width: isMobile ? "100%" : "auto", textAlign: isMobile ? "center" : "left" }}>
        <div className="heading-text" style={{ fontSize: isMobile ? "16px" : "18px" }}>OPTIMIZATION RESEARCH</div>
        <div style={{ fontSize: isMobile ? "9px" : "10px", color:T.muted, letterSpacing:"0.14em", textTransform:"uppercase", marginTop:"2px" }}>Software ReEngineering Assignment · 2026</div>
      </div>
      <div style={{ 
        display:"flex", 
        gap: isMobile ? "20px" : "28px", 
        fontSize: isMobile ? "11px" : "12px", 
        fontWeight:"500", 
        letterSpacing:"0.06em", 
        textTransform:"uppercase",
        margin: isMobile ? "0 auto" : "0",
      }}>
        {NAV_ITEMS.map(n => (
          <span 
            key={n.key} 
            onClick={() => onNavigate(n.key)} 
            className={`nav-item ${activeSection===n.key?"active":""}`} 
            style={{ 
              color: activeSection===n.key ? T.white : T.muted, 
              cursor:"pointer",
              touchAction: "manipulation",
              padding: isMobile ? "4px 0" : "0",
            }}
          >
            {n.label}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 14 — GLOBAL STYLES (Enhanced with mobile optimizations)
// ─────────────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  * {
    box-sizing:border-box;
    margin:0;
    padding:0;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  img, svg, canvas, [draggable="true"] {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    pointer-events: none;
  }
  
  a, button, [role="button"], .filter-btn, .nav-item, .tl-dot {
    -webkit-user-select: auto;
    -moz-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
    -webkit-touch-callout: default;
  }
  
  :root {
    --title-grad-offset:50%;
    --vh: 1vh;
  }
  
  html, body {
    max-width: 100vw;
    overflow-x: hidden;
    position: relative;
    height: 100%;
    -webkit-overflow-scrolling: touch;
  }
  
  body {
    background:#0c0d0d;
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
  }
  
  #root {
    overflow-x: hidden;
    position: relative;
    width: 100%;
  }
  
  .fade-in {
    opacity:0;
    transform:translateY(20px);
    transition:opacity 0.7s ease,transform 0.7s ease;
  }
  
  .fade-in.visible {
    opacity:1;
    transform:translateY(0);
  }
  
  .nav-item {
    position:relative;
    cursor:pointer;
    transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1);
  }
  
  .nav-item::after {
    content:'';
    position:absolute;
    bottom:-4px;
    left:50%;
    width:0;
    height:1px;
    background:linear-gradient(90deg,transparent,#fff,transparent);
    transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1);
    transform:translateX(-50%);
  }
  
  .nav-item:hover {
    color:#ffffff !important;
    transform:translateY(-1px);
  }
  
  .nav-item:hover::after {
    width:80%;
  }
  
  .nav-item.active {
    color:#ffffff !important;
  }
  
  .nav-item.active::after {
    width:80%;
    opacity:0.6;
  }
  
  .page-transition-overlay {
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:radial-gradient(circle at 50% 50%,#0c0d0d,#000);
    z-index:9999;
    pointer-events:none;
    opacity:0;
    transition:opacity 0.4s ease;
  }
  
  .page-transition-overlay.active {
    opacity:0.3;
  }
  
  .heading-text {
    font-family:'DM Sans',sans-serif;
    font-weight:800;
    background:linear-gradient(90deg,#333 0%,#fff 40%,#fff 60%,#333 100%);
    background-size:200% 100%;
    background-position:var(--title-grad-offset) 0;
    background-clip:text;
    color:transparent;
    -webkit-background-clip:text;
    filter:brightness(1.8) contrast(2.2);
    transition:background-position 90ms linear;
  }
  
  .outer {
    --line-gap:18px;
    width:210px;
    height:190px;
    border-radius:10px;
    padding:1px;
    background:radial-gradient(circle 230px at 0% 0%,#ffffff,#0c0d0d);
    position:relative;
  }
  
  @media (max-width: 768px) {
    .outer {
      width: 160px;
      height: 145px;
    }
  }
  
  .dot {
    width:5px;
    aspect-ratio:1;
    position:absolute;
    background-color:#fff;
    box-shadow:0 0 10px #ffffff;
    border-radius:100px;
    z-index:2;
    right:calc(var(--line-gap) - 2.5px);
    top:calc(var(--line-gap) - 2.5px);
    animation:moveDot 6s linear infinite;
    animation-play-state:paused;
    opacity:0;
    transition:opacity 0.3s ease;
  }
  
  .outer:hover .dot {
    opacity:1;
    animation-play-state:running;
  }
  
  @media (max-width: 768px) {
    .outer:hover .dot {
      opacity: 0; /* Disable hover effect on mobile */
    }
  }
  
  @keyframes moveDot {
    0%,100% {
      top:calc(var(--line-gap) - 2.5px);
      right:calc(var(--line-gap) - 2.5px);
    }
    25% {
      top:calc(var(--line-gap) - 2.5px);
      right:calc(100% - var(--line-gap) - 2.5px);
    }
    50% {
      top:calc(100% - var(--line-gap) - 2.5px);
      right:calc(100% - var(--line-gap) - 2.5px);
    }
    75% {
      top:calc(100% - var(--line-gap) - 2.5px);
      right:calc(var(--line-gap) - 2.5px);
    }
  }
  
  .card {
    z-index:1;
    width:100%;
    height:100%;
    border-radius:9px;
    border:solid 1px #202222;
    background:radial-gradient(circle 280px at 0% 0%,#444444,#0c0d0d);
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
    flex-direction:column;
    color:#fff;
    overflow:hidden;
  }
  
  .ray {
    width:220px;
    height:45px;
    border-radius:100px;
    position:absolute;
    background-color:#c7c7c7;
    opacity:0.28;
    box-shadow:0 0 50px #fff;
    filter:blur(10px);
    transform-origin:10%;
    top:0;
    left:0;
    transform:translate3d(0,0,0) rotate(40deg);
  }
  
  @media (max-width: 768px) {
    .ray {
      width: 150px;
      height: 30px;
      filter: blur(8px);
    }
  }
  
  .card .text {
    font-weight:bolder;
    font-family:'DM Sans',sans-serif;
    background:linear-gradient(90deg,#333 0%,#fff 40%,#fff 60%,#333 100%);
    background-size:200% 100%;
    background-position:var(--title-grad-offset) 0;
    background-clip:text;
    color:transparent;
    -webkit-background-clip:text;
    filter:brightness(1.8) contrast(2.2);
  }
  
  .line {
    width:100%;
    height:1px;
    position:absolute;
    background-color:#2c2c2c;
  }
  
  .topl {
    top:var(--line-gap);
    background:linear-gradient(90deg,#888888 30%,#1d1f1f 70%);
  }
  
  .bottoml {
    bottom:var(--line-gap);
  }
  
  .leftl {
    left:var(--line-gap);
    width:1px;
    height:100%;
    background:linear-gradient(180deg,#747474 30%,#222424 70%);
  }
  
  .rightl {
    right:var(--line-gap);
    width:1px;
    height:100%;
  }
  
  .tl-dot {
    transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    cursor:pointer;
  }
  
  .tl-dot.active::after {
    content:'';
    position:absolute;
    inset:-6px;
    border-radius:50%;
    border:1px solid rgba(255,255,255,0.15);
    animation:pulseRing 2s ease-out infinite;
  }
  
  @media (max-width: 768px) {
    .tl-dot.active::after {
      inset: -4px;
    }
  }
  
  @keyframes pulseRing {
    0% {
      transform:scale(0.9);
      opacity:0.6;
    }
    70% {
      transform:scale(1.3);
      opacity:0;
    }
    100% {
      transform:scale(1.3);
      opacity:0;
    }
  }
  
  .timeline-content {
    animation:contentReveal 0.4s cubic-bezier(0.4,0,0.2,1) forwards;
  }
  
  @keyframes contentReveal {
    from {
      opacity:0;
      transform:translateY(12px);
    }
    to {
      opacity:1;
      transform:translateY(0);
    }
  }
  
  .rq-card {
    transition:transform 0.2s ease,border-color 0.2s ease,opacity 0.25s ease;
  }
  
  .rq-card:hover {
    transform:translateY(-3px);
    border-color:#383b3b !important;
  }
  
  @media (max-width: 768px) {
    .rq-card:hover {
      transform: none;
    }
  }
  
  .rq-card.entering {
    animation:cardEnter 0.35s cubic-bezier(0.34,1.2,0.64,1) both;
  }
  
  @keyframes cardEnter {
    from {
      opacity:0;
      transform:translateY(16px) scale(0.97);
    }
    to {
      opacity:1;
      transform:translateY(0) scale(1);
    }
  }
  
  .filter-btn {
    transition:all 0.2s ease;
    position:relative;
  }
  
  .filter-btn:hover {
    border-color:#383b3b !important;
    color:#e8e8e8 !important;
  }
  
  @media (max-width: 768px) {
    .filter-btn:hover {
      border-color: ${T.border} !important;
      color: ${T.muted} !important;
    }
    
    .filter-btn.active:hover {
      border-color: ${T.borderHi} !important;
      color: ${T.white} !important;
    }
  }
  
  .filter-btn.active::after {
    content:'';
    position:absolute;
    bottom:-1px;
    left:20%;
    right:20%;
    height:1px;
    background:rgba(255,255,255,0.4);
    border-radius:1px;
  }
  
  @keyframes drawLine {
    from {
      stroke-dashoffset:1000;
    }
    to {
      stroke-dashoffset:0;
    }
  }
  
  .line-animated {
    stroke-dasharray:1000;
    stroke-dashoffset:1000;
  }
  
  .line-animated.ready {
    animation:drawLine 1.2s cubic-bezier(0.4,0,0.2,1) forwards;
  }
  
  .line-animated.ready.delay {
    animation-delay:0.2s;
  }
  
  .chart-grid {
    display:grid;
    gap:20px;
    grid-template-columns:1fr;
  }
  
  @media(min-width:768px) {
    .chart-grid {
      grid-template-columns:1fr 1fr;
    }
  }
  
  .card-spotlight {
    position:relative;
    overflow:hidden;
    --mouse-x:50%;
    --mouse-y:50%;
    --spotlight-color:rgba(255,255,255,0.05);
  }
  
  .card-spotlight::before {
    content:'';
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:radial-gradient(circle at var(--mouse-x) var(--mouse-y),var(--spotlight-color),transparent 80%);
    opacity:0;
    transition:opacity 0.5s ease;
    pointer-events:none;
    z-index:1;
  }
  
  .card-spotlight:hover::before,
  .card-spotlight:focus-within::before {
    opacity:0.6;
  }
  
  @media (max-width: 768px) {
    .card-spotlight::before {
      display: none;
    }
  }
  
  .card-spotlight>* {
    position:relative;
    z-index:2;
  }
  
  .outer,.card,.dot,.ray {
    backface-visibility:hidden;
    transform:translateZ(0);
  }
  
  ::-webkit-scrollbar {
    width:5px;
  }
  
  ::-webkit-scrollbar-track {
    background:#0c0d0d;
  }
  
  ::-webkit-scrollbar-thumb {
    background:#222424;
    border-radius:3px;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 15 — APP ROOT (Enhanced with all mobile optimizations)
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  useFontLoader("https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;0,800;1,400&display=swap");
  useDisableInteractions(); // Disable text selection and image dragging
  usePreventHorizontalScroll(); // Prevent horizontal scrolling
  const viewportHeight = useOrientationHandler(); // Handle orientation changes
  const { isMobile, orientation } = useMobileDetect();

  const [activeSection,   setActiveSection  ] = useState("overview");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visible,         setVisible        ] = useState(false);
  const activeSectionRef = useRef("overview");
  const scrollAnimRef    = useRef(0);
  const transitionRef    = useRef(false);

  const sectionRefs = {
    overview: useRef(null),
    timeline: useRef(null),
    research: useRef(null),
  };

  useEffect(() => { 
    setTimeout(() => setVisible(true), 100); 
  }, []);

  useEffect(() => { 
    activeSectionRef.current = activeSection; 
  }, [activeSection]);

  // Disable gradient movement on mobile
  useEffect(() => {
    if (isMobile) return;

    const root = document.documentElement;
    let raf = 0;
    let lastX = null;
    let targetOffset = 0;
    let offset = 0;

    const tick = () => {
      offset += (targetOffset - offset) * 0.16;
      targetOffset *= 0.9;
      root.style.setProperty("--title-grad-offset", `${50 + offset}%`);

      if (Math.abs(offset) > 0.08 || Math.abs(targetOffset) > 0.08) {
        raf = requestAnimationFrame(tick);
      } else {
        offset = 0;
        targetOffset = 0;
        root.style.setProperty("--title-grad-offset", "50%");
        raf = 0;
      }
    };

    const onMouseMove = e => {
      if (lastX !== null) {
        const dx = e.clientX - lastX;
        targetOffset = Math.max(-45, Math.min(45, targetOffset + dx * 0.45));
        if (!raf) raf = requestAnimationFrame(tick);
      }
      lastX = e.clientX;
    };

    const onMouseLeave = () => {
      lastX = null;
      targetOffset = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  const navigateToSection = useCallback(section => {
    const targetNode = sectionRefs[section]?.current;
    if (!targetNode) return;

    if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current);

    const startY = window.scrollY;
    const headerOffset = isMobile ? 82 : 92;
    const targetY = Math.max(0, targetNode.getBoundingClientRect().top + window.scrollY - headerOffset);
    const distance = targetY - startY;

    setActiveSection(section);
    activeSectionRef.current = section;

    if (Math.abs(distance) < 2) return;

    transitionRef.current = true;
    setIsTransitioning(true);
    const duration = isMobile ? Math.min(600, Math.abs(distance) * 0.5) : Math.min(900, Math.max(420, Math.abs(distance) * 0.6));
    const startTs = performance.now();
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    const step = now => {
      const p = Math.min(1, (now - startTs) / duration);
      const eased = easeOutCubic(p);
      window.scrollTo(0, startY + distance * eased);
      if (p < 1) {
        scrollAnimRef.current = requestAnimationFrame(step);
      } else {
        transitionRef.current = false;
        setIsTransitioning(false);
        scrollAnimRef.current = 0;
      }
    };

    scrollAnimRef.current = requestAnimationFrame(step);
  }, [isMobile]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      ticking = false;
      if (transitionRef.current) return;
      const sp = window.scrollY + (isMobile ? 60 : 100);
      let next = "overview";
      if (sectionRefs.research.current && sp >= sectionRefs.research.current.offsetTop - (isMobile ? 150 : 200)) next = "research";
      else if (sectionRefs.timeline.current && sp >= sectionRefs.timeline.current.offsetTop - (isMobile ? 150 : 200)) next = "timeline";

      if (next !== activeSectionRef.current) {
        activeSectionRef.current = next;
        setActiveSection(next);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  useEffect(() => () => {
    if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current);
  }, []);

  return (
    <div style={{ 
      minHeight:"100vh", 
      minHeight: `calc(${viewportHeight}px)`,
      background:T.bg, 
      fontFamily:T.fontSans, 
      color:T.text,
      overflowX: "hidden",
      width: "100%",
      position: "relative",
    }}>
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
      <div style={{ 
        padding: isMobile ? "20px 20px" : "28px 40px", 
        display:"flex", 
        justifyContent:"space-between", 
        alignItems:"center", 
        borderTop:`1px solid ${T.border}`,
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "12px" : "0",
      }}>
        <div className="heading-text" style={{ fontSize: isMobile ? "14px" : "15px" }}>OPTIMIZATION RESEARCH</div>
        <div style={{ fontSize: isMobile ? "10px" : "11px", color:T.muted, letterSpacing:"0.05em", textAlign: isMobile ? "center" : "right" }}>Research compiled by Muhammad Uzair (22K-5176) · BSE-8A · 2026</div>
      </div>
      <div style={{ 
        padding: isMobile ? "12px 20px" : "14px 40px", 
        borderTop:"1px solid #171919", 
        background:"#080909", 
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center", 
        gap:"6px",
        flexWrap:"wrap",
      }}>
        <span style={{ fontSize: isMobile ? "10px" : "11px", color:"#3a3f3f", letterSpacing:"0.08em", fontFamily:T.fontSans }}>© {new Date().getFullYear()}</span>
        <span className="heading-text" style={{ fontSize: isMobile ? "10px" : "11px", letterSpacing:"0.12em" }}>BOLTFORGED</span>
        <span style={{ fontSize: isMobile ? "10px" : "11px", color:"#3a3f3f", letterSpacing:"0.08em", fontFamily:T.fontSans }}>· All Rights Reserved</span>
      </div>
    </div>
  );
}