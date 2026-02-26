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
uniform vec2  u_shapePos;

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
float sdCircle(in vec2 st, in vec2 center) { return length(st - center) * 2.0; }
float fill(float x, float size, float edge) { return 1.0 - smoothstep(size - edge, size + edge, x); }
float strokeEdge(float x, float size, float w, float edge) {
    float afwidth = length(vec2(dFdx(x), dFdy(x))) * 0.70710678;
    float d = smoothstep(size - edge - afwidth, size + edge + afwidth, x + w * 0.5)
            - smoothstep(size - edge - afwidth, size + edge + afwidth, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

void main() {
    vec2 st       = st0 + 0.5;

    // Shape center offset (normalized 0..1)
    vec2 shapeOffset = u_shapePos - 0.5;

    // Mouse influence relative to shape center
    vec2 relMouse = mx * vec2(1., -1.) + 0.5;
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.45, length(st - relMouse));
    float baseEdge = fill(sdCircle(st, relMouse), u_circleSize, u_circleEdge);
    float shift = mouseInfluence * 0.03;

    // Offset st for shape position
    vec2 stOff = st - shapeOffset;

    vec2  stA  = stOff + vec2(shift, 0.0);
    float sdfA = sdRoundRect(stA, vec2(u_shapeSize * 0.9), u_roundness);
    float maskA = strokeEdge(sdfA, 0.0, u_borderSize, max(baseEdge + u_spreadA * mouseInfluence * 0.14, 0.001)) * 4.0 * u_intensityA;

    float sdfB  = sdRoundRect(stOff, vec2(u_shapeSize), u_roundness);
    float maskB = strokeEdge(sdfB, 0.0, u_borderSize, max(baseEdge + u_spreadB * mouseInfluence * 0.14, 0.001)) * 4.0 * u_intensityB;

    vec2  stC  = stOff - vec2(shift, 0.0);
    float sdfC = sdRoundRect(stC, vec2(u_shapeSize * 1.1), u_roundness);
    float maskC = strokeEdge(sdfC, 0.0, u_borderSize, max(baseEdge + u_spreadC * mouseInfluence * 0.14, 0.001)) * 4.0 * u_intensityC;

    vec3 col = u_colorA * maskA + u_colorB * maskB + u_colorC * maskC;
    float white = strokeEdge(sdRoundRect(stOff, vec2(u_shapeSize), u_roundness), 0.0, u_borderSize, baseEdge) * 4.0;
    float blend = clamp(mouseInfluence * 2.0, 0.0, 1.0);
    col = mix(vec3(white), col, blend);
    float a = max(maskA, max(maskB, max(maskC, white * (1.0 - blend))));
    gl_FragColor = vec4(clamp(col, 0.0, 1.0), clamp(a, 0.0, 1.0));
}
`;

const STORAGE_KEY = 'shapeblur-settings';
const DEFAULT_SETTINGS = {
  version: 1,
  layers: [
    { color: '#ff2244', spread: -1.0, intensity: 1.0 },
    { color: '#ffffff', spread:  0.0, intensity: 1.0 },
    { color: '#2266ff', spread:  1.0, intensity: 1.0 },
  ]
};

async function loadSettings() {
  try {
    const res = await window.storage.get(STORAGE_KEY);
    if (res?.value) return JSON.parse(res.value);
  } catch (_) {}
  return DEFAULT_SETTINGS;
}
async function saveSettings(layers) {
  try { await window.storage.set(STORAGE_KEY, JSON.stringify({ version: 1, layers })); } catch (_) {}
}
async function resetSettings() {
  try { await window.storage.delete(STORAGE_KEY); } catch (_) {}
  return DEFAULT_SETTINGS;
}

function hexToRgb01(hex) {
  return [
    parseInt(hex.slice(1,3),16)/255,
    parseInt(hex.slice(3,5),16)/255,
    parseInt(hex.slice(5,7),16)/255,
  ];
}

// ── ShapeBlur ────────────────────────────────────────────────

const ShapeBlur = ({ layers, followMouse }) => {
  const mountRef   = useRef();
  const matRef     = useRef();
  const stateRef   = useRef({ followMouse });

  useEffect(() => { stateRef.current.followMouse = followMouse; }, [followMouse]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let animId, time = 0, lastTime = 0;

    const vMouse     = new THREE.Vector2();
    const vMouseDamp = new THREE.Vector2();
    const vResolution = new THREE.Vector2();

    // Shape position in screen px, damped
    const vShapeTarget = new THREE.Vector2(0.5, 0.5); // normalized
    const vShapeDamp   = new THREE.Vector2(0.5, 0.5);

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
        u_shapePos:   { value: new THREE.Vector2(0.5, 0.5) },
      },
      transparent: true
    });
    matRef.current = material;

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(1,1), material);
    scene.add(quad);

    const onMove = e => {
      const rect = mount.getBoundingClientRect();
      const src = e.touches ? e.touches[0] : e;
      const nx = src.clientX - rect.left;
      const ny = src.clientY - rect.top;
      vMouse.set(nx, ny);
      if (stateRef.current.followMouse) {
        vShapeTarget.set(nx / rect.width, ny / rect.height);
      }
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

      // Snap shape back to center when not following
      if (!stateRef.current.followMouse) {
        vShapeTarget.set(0.5, 0.5);
      }
      vShapeDamp.x = THREE.MathUtils.damp(vShapeDamp.x, vShapeTarget.x, 5, dt);
      vShapeDamp.y = THREE.MathUtils.damp(vShapeDamp.y, vShapeTarget.y, 5, dt);
      material.uniforms.u_shapePos.value.set(vShapeDamp.x, vShapeDamp.y);

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

  useEffect(() => {
    const m = matRef.current;
    if (!m) return;
    ['A','B','C'].forEach((k, i) => {
      const [r,g,b] = hexToRgb01(layers[i].color);
      m.uniforms[`u_color${k}`].value.set(r,g,b);
      m.uniforms[`u_spread${k}`].value    = layers[i].spread;
      m.uniforms[`u_intensity${k}`].value = layers[i].intensity;
    });
  }, [layers]);

  return <div ref={mountRef} style={{ width:'100%', height:'100%' }} />;
};

// ── UI helpers ───────────────────────────────────────────────

const LAYER_LABELS = ['Layer A', 'Layer B', 'Layer C'];
const LAYER_HINTS  = ['← left · smaller', '· center ·', '→ right · larger'];

function SliderRow({ label, value, min, max, step, color, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <span style={{ color:'#555', fontSize:11, letterSpacing:'0.06em', textTransform:'uppercase' }}>{label}</span>
        <span style={{ color:'#777', fontSize:11, fontVariantNumeric:'tabular-nums' }}>{value.toFixed(2)}</span>
      </div>
      <div style={{ position:'relative', height:3, borderRadius:2, background:'rgba(255,255,255,0.07)' }}>
        <div style={{ position:'absolute', left:0, top:0, height:'100%', width:`${pct}%`, background:`linear-gradient(90deg,${color}44,${color})`, borderRadius:2 }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0, cursor:'pointer', margin:0 }} />
      </div>
    </div>
  );
}

function LayerCard({ index, layer, onChange }) {
  return (
    <div style={{
      background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)',
      borderRadius:14, padding:'14px 16px', display:'flex', flexDirection:'column', gap:12, flex:1, minWidth:0,
    }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ color:'#ccc', fontWeight:600, fontSize:13 }}>{LAYER_LABELS[index]}</div>
          <div style={{ color:'#444', fontSize:11, marginTop:2 }}>{LAYER_HINTS[index]}</div>
        </div>
        <label style={{ cursor:'pointer', position:'relative' }}>
          <div style={{
            width:28, height:28, borderRadius:7, background:layer.color,
            border:'2px solid rgba(255,255,255,0.1)',
            boxShadow:`0 0 12px ${layer.color}88`,
          }} />
          <input type="color" value={layer.color}
            onChange={e => onChange({ ...layer, color: e.target.value })}
            style={{ position:'absolute', opacity:0, width:0, height:0, pointerEvents:'none' }} />
        </label>
      </div>
      <SliderRow label="Spread"    value={layer.spread}    min={-2} max={2} step={0.01} color={layer.color} onChange={v => onChange({ ...layer, spread: v })} />
      <SliderRow label="Intensity" value={layer.intensity} min={0}  max={2} step={0.01} color={layer.color} onChange={v => onChange({ ...layer, intensity: v })} />
    </div>
  );
}

function StatusDot({ status }) {
  const map = {
    saved:   { color:'#44ff88', label:'Saved' },
    saving:  { color:'#ffcc44', label:'Saving…' },
    loaded:  { color:'#4488ff', label:'Loaded' },
    default: { color:'#ff4444', label:'Defaults' },
  };
  const s = map[status] || map.saved;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
      <div style={{ width:6, height:6, borderRadius:'50%', background:s.color, boxShadow:`0 0 6px ${s.color}` }} />
      <span style={{ color:'#444', fontSize:11 }}>{s.label}</span>
    </div>
  );
}

// ── Toggle button ────────────────────────────────────────────

function ToggleBtn({ open, onClick }) {
  return (
    <button onClick={onClick} style={{
      position:'fixed', bottom:24, right:24, zIndex:100,
      width:44, height:44, borderRadius:12,
      background: open ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
      border:`1px solid ${open ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
      backdropFilter:'blur(12px)',
      display:'flex', alignItems:'center', justifyContent:'center',
      cursor:'pointer', transition:'all 0.2s',
      boxShadow: open ? '0 0 20px rgba(255,255,255,0.08)' : 'none',
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {open ? (
          // X icon
          <>
            <line x1="3" y1="3" x2="13" y2="13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="13" y1="3" x2="3"  y2="13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
          </>
        ) : (
          // Sliders icon
          <>
            <line x1="2" y1="4"  x2="14" y2="4"  stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="2" y1="8"  x2="14" y2="8"  stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="2" y1="12" x2="14" y2="12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="5"  cy="4"  r="1.5" fill="#0a0a0a" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
            <circle cx="10" cy="8"  r="1.5" fill="#0a0a0a" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
            <circle cx="6"  cy="12" r="1.5" fill="#0a0a0a" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
          </>
        )}
      </svg>
    </button>
  );
}

// Spacebar hint badge
function SpaceBadge({ active }) {
  return (
    <div style={{
      position:'fixed', bottom:24, left: 24, zIndex:100,
      display:'flex', alignItems:'center', gap:8,
      background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:10, padding:'6px 12px', backdropFilter:'blur(10px)',
      transition:'opacity 0.3s',
    }}>
      <div style={{
        background: active ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
        border:`1px solid ${active ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
        borderRadius:5, padding:'1px 7px', fontSize:11,
        color: active ? '#fff' : '#555',
        fontFamily:'monospace',
        boxShadow: active ? '0 0 10px rgba(255,255,255,0.15)' : 'none',
        transition:'all 0.2s',
      }}>SPACE</div>
      <span style={{ color: active ? '#888' : '#333', fontSize:11, transition:'color 0.2s' }}>
        {active ? 'following cursor' : 'hold to follow'}
      </span>
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────

export default function App() {
  const [layers, setLayers]     = useState(DEFAULT_SETTINGS.layers);
  const [status, setStatus]     = useState('loading');
  const [panelOpen, setPanelOpen] = useState(false);
  const [jsonView, setJsonView] = useState(false);
  const [followMouse, setFollowMouse] = useState(false);
  const saveTimer = useRef(null);

  // Load on mount
  useEffect(() => {
    loadSettings().then(s => {
      setLayers(s.layers);
      setStatus('loaded');
      setTimeout(() => setStatus('saved'), 1500);
    });
  }, []);

  // Spacebar listener
  useEffect(() => {
    const onDown = e => { if (e.code === 'Space') { e.preventDefault(); setFollowMouse(true); } };
    const onUp   = e => { if (e.code === 'Space') setFollowMouse(false); };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup',   onUp);
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); };
  }, []);

  const handleChange = useCallback((i, val) => {
    setLayers(prev => {
      const next = prev.map((l, idx) => idx === i ? val : l);
      setStatus('saving');
      clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        saveSettings(next).then(() => setStatus('saved'));
      }, 600);
      return next;
    });
  }, []);

  const handleReset = useCallback(async () => {
    const s = await resetSettings();
    setLayers(s.layers);
    setStatus('default');
    setTimeout(() => setStatus('saved'), 1500);
  }, []);

  const jsonString = JSON.stringify({ version: 1, layers }, null, 2);

  return (
    <div style={{
      background:'#0a0a0a', width:'100vw', height:'100vh',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily:"'Inter',sans-serif", overflow:'hidden', position:'relative',
    }}>
      {/* Full-screen canvas */}
      <div style={{ position:'absolute', inset:0 }}>
        <ShapeBlur layers={layers} followMouse={followMouse} />
      </div>

      {/* Sliding panel */}
      <div style={{
        position:'fixed', bottom:0, left:0, right:0, zIndex:50,
        transform: panelOpen ? 'translateY(0)' : 'translateY(100%)',
        transition:'transform 0.35s cubic-bezier(0.32,0.72,0,1)',
        padding:'0 16px 80px',
      }}>
        <div style={{
          maxWidth:680, margin:'0 auto',
          background:'rgba(10,10,10,0.92)', border:'1px solid rgba(255,255,255,0.07)',
          borderRadius:'18px 18px 0 0', padding:'16px',
          backdropFilter:'blur(20px)',
          display:'flex', flexDirection:'column', gap:12,
          boxShadow:'0 -20px 60px rgba(0,0,0,0.6)',
        }}>
          {/* drag handle */}
          <div style={{ display:'flex', justifyContent:'center', marginBottom:-4 }}>
            <div style={{ width:32, height:3, borderRadius:2, background:'rgba(255,255,255,0.1)' }} />
          </div>

          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <StatusDot status={status} />
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={() => setJsonView(v => !v)} style={{
                background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)',
                color: jsonView ? '#fff' : '#555', borderRadius:8, padding:'4px 12px',
                fontSize:11, cursor:'pointer', letterSpacing:'0.05em',
              }}>{jsonView ? 'Hide JSON' : 'View JSON'}</button>
              <button onClick={handleReset} style={{
                background:'rgba(255,60,60,0.08)', border:'1px solid rgba(255,60,60,0.15)',
                color:'#ff4444', borderRadius:8, padding:'4px 12px',
                fontSize:11, cursor:'pointer',
              }}>Reset</button>
            </div>
          </div>

          {jsonView && (
            <pre style={{
              background:'rgba(0,0,0,0.5)', border:'1px solid rgba(255,255,255,0.06)',
              borderRadius:10, padding:'12px 14px', margin:0,
              color:'#4af', fontSize:11, lineHeight:1.6,
              overflowX:'auto', maxHeight:160, overflowY:'auto',
              fontFamily:"'Fira Code','Courier New',monospace",
            }}>{jsonString}</pre>
          )}

          <div style={{ display:'flex', gap:10 }}>
            {layers.map((l, i) => (
              <LayerCard key={i} index={i} layer={l} onChange={v => handleChange(i, v)} />
            ))}
          </div>
        </div>
      </div>

      <SpaceBadge active={followMouse} />
      <ToggleBtn open={panelOpen} onClick={() => setPanelOpen(v => !v)} />
    </div>
  );
}