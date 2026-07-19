// PicoDashboard.jsx
import { useEffect, useState } from 'react';

const BASE_URL = 'https://4c4c2ac7-ea34-451d-a007-7293e03383b5-00-3pj9h4tmdluqs.worf.replit.dev';
const GET_URL  = BASE_URL + '/api/tank/latest ';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap');

  .pico-root { --bg:#0a0c10; --surface:#111318; --border:rgba(255,255,255,0.06); --text:#e8eaf0;
    --accent:#00e5ff; --radius:16px; font-family:'Syne',sans-serif; background:var(--bg); color:var(--text);
    min-height:100vh; overflow-x:hidden; position:relative; }
  .pico-root.light { --bg:#f0f2f7; --surface:#fff; --border:rgba(0,0,0,0.07); --text:#111318; --accent:#0077cc; }

  .pico-shell { max-width:600px; margin:0 auto; padding:32px 24px; }

  .pico-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:40px; }
  .pico-logo-wrap { display:flex; align-items:center; gap:14px; }
  .pico-logo-icon { width:44px; height:44px; border-radius:12px; background:linear-gradient(135deg,var(--accent),#0077cc); display:grid; place-items:center; font-size:20px; }
  .pico-logo-text { font-size:1.35rem; font-weight:800; }
  .pico-logo-sub { font-family:'Space Mono',monospace; font-size:0.68rem; color:#5a6070; letter-spacing:1.5px; margin-top:2px; }

  .pico-status-pill { display:flex; align-items:center; gap:7px; padding:6px 14px; border-radius:999px; background:var(--surface); border:1px solid var(--border); font-family:'Space Mono',monospace; font-size:0.72rem; }
  .pico-status-dot { width:8px; height:8px; border-radius:50%; background:#00e676; }
  .pico-status-dot.offline { background:#ff4081; }
  .pico-status-dot.connecting { background:#ffd740; }

  .pico-theme-btn { width:42px; height:42px; border-radius:12px; background:var(--surface); border:1px solid var(--border); cursor:pointer; display:grid; place-items:center; font-size:18px; }
  .pico-theme-btn:hover { transform:scale(1.08); }

  .pico-error-banner { background:rgba(255,64,129,0.08); border:1px solid rgba(255,64,129,0.25); border-radius:10px; padding:10px 16px; font-family:'Space Mono',monospace; font-size:0.72rem; color:#ff4081; margin-bottom:18px; }

  /* Tank */
  .tank-container { width:140px; height:300px; border:4px solid var(--accent); border-radius:16px; position:relative; overflow:hidden; box-shadow:0 0 40px var(--accent); margin-bottom:12px; background:var(--surface); }
  .tank-fill { position:absolute; bottom:0; width:100%; height:0%; background:var(--accent); box-shadow:0 0 40px var(--accent); transition:height 0.5s ease; overflow:hidden; }
  .tank-label { font-size:18px; font-weight:700; color:var(--text); margin-top:8px; text-align:center; }

  /* Wave via SVG animation */
  .tank-wave-svg { position:absolute; bottom:0; left:0; width:100%; height:50px; overflow:visible; }
  .wave-path { animation: waveMove 4s linear infinite; fill:var(--accent); opacity:0.4; }
  @keyframes waveMove { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

  /* Bubbles */
  .bubble { position:absolute; bottom:0; width:8px; height:8px; background:rgba(255,255,255,0.6); border-radius:50%; animation:rise 4s linear infinite; }
  @keyframes rise { 0% { transform: translateY(0) scale(0.5); opacity:0.6; } 50% { opacity:1; } 100% { transform: translateY(-300px) scale(1); opacity:0; } }
`;

export default function PicoDashboard() {
  const [isDark, setIsDark]       = useState(true);
  const [status, setStatus]       = useState('connecting');
  const [errorMsg, setErrorMsg]   = useState('');
  const [stats, setStats]         = useState({ cur: null, lastUpdate: null });

  useEffect(() => {
    const id = 'pico-dash-styles';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id; el.textContent = STYLES;
      document.head.appendChild(el);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(GET_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = await res.json();
        const readings = Array.isArray(body) ? body : [body];
        if (!readings.length) return;

        setStatus('live');
        setErrorMsg('');

        readings.forEach(r => {
          const val = parseFloat(r.water_level_pct);
          if (isNaN(val)) return;
          const t = new Date(r.timestamp ?? Date.now()).toLocaleTimeString();
          setStats({ cur: val, lastUpdate: t });
        });

      } catch (e) {
        setStatus('offline');
        setErrorMsg(`Cannot reach device — ${e.message}`);
      }
    };

    fetchData();
    const id = setInterval(fetchData, 2000);
    return () => clearInterval(id);
  }, []);

  const bubbles = Array.from({ length: 6 }).map((_, i) => (
    <div key={i} className="bubble" style={{ left: `${Math.random()*100}%`, animationDelay: `${Math.random()*3}s`, width:`${4+Math.random()*8}px`, height:`${4+Math.random()*8}px` }} />
  ));

  const pctHeight = Math.min(Math.max(stats.cur ?? 0, 0), 100);

  return (
    <div className={`pico-root${isDark ? '' : ' light'}`}>
      <div className="pico-shell">

        {/* Header */}
        <header className="pico-header">
          <div className="pico-logo-wrap">
            <div className="pico-logo-icon">💧</div>
            <div>
              <div className="pico-logo-text">Tank Monitor</div>
              <div className="pico-logo-sub">Pico W · Ultrasonic · Live</div>
            </div>
          </div>
          <div className="pico-header-right">
            <div className="pico-status-pill">
              <div className={`pico-status-dot${status === 'offline' ? ' offline' : status === 'connecting' ? ' connecting' : ''}`} />
              <span>{status.toUpperCase()}</span>
            </div>
            <button className="pico-theme-btn" onClick={() => setIsDark(d => !d)}>
              {isDark ? '🌙' : '☀️'}
            </button>
          </div>
        </header>

        {/* Error */}
        {errorMsg && <div className="pico-error-banner">⚠ {errorMsg}</div>}

        {/* Tank */}
        <div className="tank-container">
          <div className="tank-fill" style={{ height: `${pctHeight}%` }}>
            <svg className="tank-wave-svg" viewBox="0 0 200 50" preserveAspectRatio="none">
              <path className="wave-path" d="M0 25 Q 25 0 50 25 T 100 25 T 150 25 T 200 25 V50 H0 Z" />
            </svg>
            {bubbles}
          </div>
        </div>
        <div className="tank-label">{stats.cur !== null ? `${stats.cur.toFixed(1)}% Full` : '—'}</div>
      </div>
    </div>
  );
}