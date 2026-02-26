import { useRef, useEffect } from "react";
import { useMobileDetect } from "../hooks/useMobileDetect.js";
import { hexToRgbArr } from "../utils/colorUtils.js";

export const LightRays = ({
  raysOrigin = "bottom-center",
  raysColor = "#ffffff",
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 3,
  fadeDistance = 1,
  saturation = 0,
  mouseInfluence = 0.1,
  noiseAmount = 0,
  distortion = 0,
  pulsating = false
}) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const glRef = useRef(null);
  const locsRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothRef = useRef({ x: 0.5, y: 0.5 });
  const { isMobile } = useMobileDetect();

  const effectiveMouseInfluence = isMobile ? 0 : mouseInfluence;
  const effectiveNoiseAmount = isMobile ? 0 : noiseAmount;
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
        antialias: !isMobile
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
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const pos = gl.getAttribLocation(prog, "position");
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
      const uLoc = n => gl.getUniformLocation(prog, n);
      locsRef.current = { iTime: uLoc("iTime"), iRes: uLoc("iResolution"), rayPos: uLoc("rayPos"), rayDir: uLoc("rayDir"), raysColor: uLoc("raysColor"), raysSpeed: uLoc("raysSpeed"), lightSpread: uLoc("lightSpread"), rayLength: uLoc("rayLength"), pulsating: uLoc("pulsating"), fadeDistance: uLoc("fadeDistance"), saturation: uLoc("saturation"), mousePos: uLoc("mousePos"), mouseInfluence: uLoc("mouseInfluence"), noiseAmount: uLoc("noiseAmount"), distortion: uLoc("distortion") };
      return gl;
    };

    const getAnchorAndDir = (origin, w, h) => {
      const o = 0.2;
      const map = {
        'top-left': [0, -o * h, [0, 1]],
        'top-right': [w, -o * h, [0, 1]],
        'left': [-o * w, .5 * h, [1, 0]],
        'right': [(1 + o) * w, .5 * h, [-1, 0]],
        'bottom-left': [0, (1 + o) * h, [0, -1]],
        'bottom-right': [w, (1 + o) * h, [0, -1]],
        'bottom-center': [.5 * w, (1 + o) * h, [0, -1]]
      };
      const v = map[origin] || [.5 * w, -o * h, [0, 1]];
      return { anchor: [v[0], v[1]], dir: v[2] };
    };

    let gl = initGL();
    if (!gl) return;

    const resize = () => {
      const p = canvas.parentElement; if (!p) return;
      const dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = p.clientWidth * dpr;
      canvas.height = p.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = e => {
      if (isMobile) return;
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
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
          sm.x = sm.x * 0.92 + m.x * 0.08;
          sm.y = sm.y * 0.92 + m.y * 0.08;
        }

        const locs = locsRef.current;
        const rgb = hexToRgbArr(p.raysColor);

        gl.uniform1f(locs.iTime, t * 0.001);
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

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, borderRadius: "inherit" }} />;
};