import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 v_texcoord;
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_texcoord = uv;
}
`;

const fragmentShader = `
varying vec2 v_texcoord;

uniform vec2  u_mouse;
uniform vec2  u_resolution;
uniform float u_pixelRatio;

uniform float u_shapeSize;
uniform float u_roundness;
uniform float u_borderSize;
uniform float u_circleSize;
uniform float u_circleEdge;

uniform vec3  u_colorA;
uniform vec3  u_colorB;
uniform vec3  u_colorC;
uniform float u_spreadA;
uniform float u_spreadB;
uniform float u_spreadC;
uniform float u_intensityA;
uniform float u_intensityB;
uniform float u_intensityC;

vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    if (u_resolution.x > u_resolution.y) {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    } else {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    p -= 0.5;
    p *= vec2(-1.0, 1.0);
    return p;
}

#define st0 coord(gl_FragCoord.xy)
#define mx  coord(u_mouse * u_pixelRatio)

float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}
float sdCircle(in vec2 st, in vec2 center) {
    return length(st - center) * 2.0;
}
float fill(float x, float size, float edge) {
    return 1.0 - smoothstep(size - edge, size + edge, x);
}
float strokeEdge(float x, float size, float w, float edge) {
    float afwidth = length(vec2(dFdx(x), dFdy(x))) * 0.70710678;
    float d = smoothstep(size - edge - afwidth, size + edge + afwidth, x + w * 0.5)
            - smoothstep(size - edge - afwidth, size + edge + afwidth, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

void main() {
    vec2 st       = st0 + 0.5;
    vec2 posMouse = mx * vec2(1., -1.) + 0.5;

    float mouseDist      = length(st - posMouse);
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.45, mouseDist);

    float baseEdge = fill(sdCircle(st, posMouse), u_circleSize, u_circleEdge);
    float shift    = mouseInfluence * 0.03;

    // Layer A: left, smaller
    vec2  stA  = st + vec2(shift, 0.0);
    float sdfA = sdRoundRect(stA, vec2(u_shapeSize * 0.9), u_roundness);
    float edgeA = max(baseEdge + u_spreadA * mouseInfluence * 0.14, 0.001);
    float maskA = strokeEdge(sdfA, 0.0, u_borderSize, edgeA) * 4.0 * u_intensityA;

    // Layer B: center, neutral
    float sdfB  = sdRoundRect(st, vec2(u_shapeSize), u_roundness);
    float edgeB2 = max(baseEdge + u_spreadB * mouseInfluence * 0.14, 0.001);
    float maskB = strokeEdge(sdfB, 0.0, u_borderSize, edgeB2) * 4.0 * u_intensityB;

    // Layer C: right, bigger
    vec2  stC  = st - vec2(shift, 0.0);
    float sdfC = sdRoundRect(stC, vec2(u_shapeSize * 1.1), u_roundness);
    float edgeC = max(baseEdge + u_spreadC * mouseInfluence * 0.14, 0.001);
    float maskC = strokeEdge(sdfC, 0.0, u_borderSize, edgeC) * 4.0 * u_intensityC;

    // Composite layers additively with their colors
    vec3 col = u_colorA * maskA + u_colorB * maskB + u_colorC * maskC;

    // White base when no mouse influence
    float white = strokeEdge(sdRoundRect(st, vec2(u_shapeSize), u_roundness), 0.0, u_borderSize, baseEdge) * 4.0;
    float blend = clamp(mouseInfluence * 2.0, 0.0, 1.0);
    col = mix(vec3(white), col, blend);

    float a = max(maskA, max(maskB, max(maskC, white * (1.0 - blend))));
    gl_FragColor = vec4(clamp(col, 0.0, 1.0), clamp(a, 0.0, 1.0));
}
`;

function hexToRgb01(hex) {
  const r = parseInt(hex.slice(1,3),16)/255;
  const g = parseInt(hex.slice(3,5),16)/255;
  const b = parseInt(hex.slice(5,7),16)/255;
  return [r,g,b];
}

const ShapeBlur = ({ layers }) => {
  const mountRef = useRef();
  const matRef   = useRef();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let animId, time = 0, lastTime = 0;

    const vMouse = new THREE.Vector2();
    const vMouseDamp = new THREE.Vector2();
    const vResolution = new THREE.Vector2();

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera();
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const [rA,gA,bA] = hexToRgb01(layers[0].color);
    const [rB,gB,bB] = hexToRgb01(layers[1].color);
    const [rC,gC,bC] = hexToRgb01(layers[2].color);

    const material = new THREE.ShaderMaterial({
      vertexShader, fragmentShader,
      uniforms: {
        u_mouse:      { value: vMouseDamp },
        u_resolution: { value: vResolution },
        u_pixelRatio: { value: 2 },
        u_shapeSize:  { value: 1.0 },
        u_roundness:  { value: 1.0 },
        u_borderSize: { value: 0.05 },
        u_circleSize: { value: 0.25 },
        u_circleEdge: { value: 1.0 },
        u_colorA:     { value: new THREE.Vector3(rA,gA,bA) },
        u_colorB:     { value: new THREE.Vector3(rB,gB,bB) },
        u_colorC:     { value: new THREE.Vector3(rC,gC,bC) },
        u_spreadA:    { value: layers[0].spread },
        u_spreadB:    { value: layers[1].spread },
        u_spreadC:    { value: layers[2].spread },
        u_intensityA: { value: layers[0].intensity },
        u_intensityB: { value: layers[1].intensity },
        u_intensityC: { value: layers[2].intensity },
      },
      transparent: true
    });
    matRef.current = material;

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(1,1), material);
    scene.add(quad);

    const onMove = e => {
      const rect = mount.getBoundingClientRect();
      const src = e.touches ? e.touches[0] : e;
      vMouse.set(src.clientX - rect.left, src.clientY - rect.top);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('pointermove', onMove);

    const resize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setSize(w, h);
      renderer.setPixelRatio(dpr);
      camera.left=-w/2; camera.right=w/2; camera.top=h/2; camera.bottom=-h/2;
      camera.updateProjectionMatrix();
      quad.scale.set(w,h,1);
      vResolution.set(w,h).multiplyScalar(dpr);
      material.uniforms.u_pixelRatio.value = dpr;
    };
    resize();
    window.addEventListener('resize', resize);
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const update = () => {
      time = performance.now() * 0.001;
      const dt = Math.min(time - lastTime, 0.05);
      lastTime = time;
      ['x','y'].forEach(k => {
        vMouseDamp[k] = THREE.MathUtils.damp(vMouseDamp[k], vMouse[k], 8, dt);
      });
      renderer.render(scene, camera);
      animId = requestAnimationFrame(update);
    };
    update();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('pointermove', onMove);
      ro.disconnect();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Live-update uniforms without remounting
  useEffect(() => {
    const m = matRef.current;
    if (!m) return;
    const keys = ['A','B','C'];
    layers.forEach((l, i) => {
      const k = keys[i];
      const [r,g,b] = hexToRgb01(l.color);
      m.uniforms[`u_color${k}`].value.set(r,g,b);
      m.uniforms[`u_spread${k}`].value    = l.spread;
      m.uniforms[`u_intensity${k}`].value = l.intensity;
    });
  }, [layers]);

  return <div ref={mountRef} style={{ width:'100%', height:'100%' }} />;
};

// ── UI Components ──────────────────────────────────────────────

const LAYER_LABELS = ['Layer A', 'Layer B', 'Layer C'];
const LAYER_HINTS  = ['← left · smaller', '· center ·', '→ right · larger'];

function LayerCard({ index, layer, onChange }) {
  const label = LAYER_LABELS[index];
  const hint  = LAYER_HINTS[index];

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 14,
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      flex: 1,
      minWidth: 0,
    }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ color:'#fff', fontWeight:600, fontSize:13 }}>{label}</div>
          <div style={{ color:'#555', fontSize:11, marginTop:2 }}>{hint}</div>
        </div>
        {/* Color swatch / picker */}
        <label style={{ cursor:'pointer', position:'relative' }}>
          <div style={{
            width: 32, height: 32,
            borderRadius: 8,
            background: layer.color,
            border: '2px solid rgba(255,255,255,0.15)',
            boxShadow: `0 0 12px ${layer.color}88`,
            transition: 'box-shadow 0.2s',
          }} />
          <input
            type="color"
            value={layer.color}
            onChange={e => onChange({ ...layer, color: e.target.value })}
            style={{ position:'absolute', opacity:0, width:0, height:0, pointerEvents:'none' }}
          />
        </label>
      </div>

      {/* Spread */}
      <SliderRow
        label="Spread"
        value={layer.spread}
        min={-2} max={2} step={0.01}
        color={layer.color}
        onChange={v => onChange({ ...layer, spread: v })}
      />

      {/* Intensity */}
      <SliderRow
        label="Intensity"
        value={layer.intensity}
        min={0} max={2} step={0.01}
        color={layer.color}
        onChange={v => onChange({ ...layer, intensity: v })}
      />
    </div>
  );
}

function SliderRow({ label, value, min, max, step, color, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ color:'#666', fontSize:11, letterSpacing:'0.05em', textTransform:'uppercase' }}>{label}</span>
        <span style={{ color:'#aaa', fontSize:12, fontVariantNumeric:'tabular-nums' }}>{value.toFixed(2)}</span>
      </div>
      <div style={{ position:'relative', height:4, borderRadius:2, background:'rgba(255,255,255,0.08)' }}>
        <div style={{
          position:'absolute', left:0, top:0, height:'100%',
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}66, ${color})`,
          borderRadius:2,
          transition:'width 0s',
        }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
          style={{
            position:'absolute', inset:0, width:'100%', height:'100%',
            opacity:0, cursor:'pointer', margin:0,
          }}
        />
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────

const DEFAULT_LAYERS = [
  { color: '#ff2244', spread: -1.0, intensity: 1.0 },
  { color: '#ffffff', spread:  0.0, intensity: 1.0 },
  { color: '#2266ff', spread:  1.0, intensity: 1.0 },
];

export default function App() {
  const [layers, setLayers] = useState(DEFAULT_LAYERS);

  const updateLayer = useCallback((i, val) => {
    setLayers(prev => prev.map((l, idx) => idx === i ? val : l));
  }, []);

  return (
    <div style={{
      background: '#0a0a0a',
      width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 20, fontFamily: "'Inter', sans-serif",
      boxSizing: 'border-box', padding: '0 16px',
    }}>
      <p style={{ color:'#333', fontSize:12, margin:0, letterSpacing:'0.08em', textTransform:'uppercase' }}>
        Hover the border to activate
      </p>

      <div style={{ position:'relative', width:'100%', maxWidth:680, height:400, overflow:'hidden', borderRadius:4 }}>
        <ShapeBlur layers={layers} />
      </div>

      {/* Controls panel */}
      <div style={{
        width: '100%', maxWidth: 680,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 18,
        padding: '16px',
        display: 'flex',
        gap: 12,
      }}>
        {layers.map((l, i) => (
          <LayerCard key={i} index={i} layer={l} onChange={v => updateLayer(i, v)} />
        ))}
      </div>
    </div>
  );
}