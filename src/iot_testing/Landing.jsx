// PicoDashboard.jsx
// Usage: import PicoDashboard from './PicoDashboard';
// Dependencies: npm install chart.js

import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const BASE_URL = 'https://4c4c2ac7-ea34-451d-a007-7293e03383b5-00-3pj9h4tmdluqs.worf.replit.dev';
const GET_URL  = BASE_URL + '/api/tank/latest';

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap');

  .pico-root {
    --bg:#0a0c10;--surface:#111318;--surface2:#181b22;
    --border:rgba(255,255,255,0.06);--text:#e8eaf0;--muted:#5a6070;
    --accent:#00e5ff;--accent2:#7c4dff;--accent3:#ff4081;
    --green:#00e676;--yellow:#ffd740;
    --card-shadow:0 8px 40px rgba(0,0,0,0.5);
    --glow:0 0 24px rgba(0,229,255,0.18);--radius:16px;
    --mono:'Space Mono',monospace;--sans:'Syne',sans-serif;
    --transition:0.35s cubic-bezier(0.4,0,0.2,1);
    font-family:var(--sans);background:var(--bg);color:var(--text);
    min-height:100vh;transition:background var(--transition),color var(--transition);
    overflow-x:hidden;position:relative;
  }
  .pico-root.light {
    --bg:#f0f2f7;--surface:#fff;--surface2:#e8ecf3;
    --border:rgba(0,0,0,0.07);--text:#111318;--muted:#8a92a8;
    --accent:#0077cc;--accent2:#5c00d6;--accent3:#e91e63;
    --green:#00c853;--yellow:#f9a825;
    --card-shadow:0 4px 24px rgba(0,0,0,0.10);
    --glow:0 0 24px rgba(0,119,204,0.10);
  }
  .pico-blobs{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0;}
  .pico-blob{position:absolute;border-radius:50%;filter:blur(90px);opacity:0.12;transition:opacity var(--transition);}
  .pico-blob-1{width:500px;height:500px;background:var(--accent2);top:-100px;left:-120px;animation:picoDrift 14s ease-in-out infinite alternate;}
  .pico-blob-2{width:400px;height:400px;background:var(--accent);bottom:-80px;right:-80px;animation:picoDrift 18s ease-in-out infinite alternate-reverse;}
  .pico-blob-3{width:300px;height:300px;background:var(--accent3);top:40%;left:60%;animation:picoDrift 22s ease-in-out infinite alternate;}
  .pico-root.light .pico-blob{opacity:0.07;}
  @keyframes picoDrift{from{transform:translate(0,0) scale(1)}to{transform:translate(40px,30px) scale(1.08)}}

  .pico-shell{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:32px 24px 60px;}

  .pico-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:40px;animation:picoSlideDown 0.6s ease both;}
  @keyframes picoSlideDown{from{opacity:0;transform:translateY(-18px)}to{opacity:1;transform:none}}
  .pico-logo-wrap{display:flex;align-items:center;gap:14px;}
  .pico-logo-icon{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,var(--accent2),var(--accent));display:grid;place-items:center;font-size:20px;box-shadow:var(--glow);}
  .pico-logo-text{font-size:1.35rem;font-weight:800;letter-spacing:-0.5px;}
  .pico-logo-sub{font-family:var(--mono);font-size:0.68rem;color:var(--muted);letter-spacing:1.5px;text-transform:uppercase;margin-top:2px;}
  .pico-header-right{display:flex;align-items:center;gap:14px;}
  .pico-status-pill{display:flex;align-items:center;gap:7px;padding:6px 14px;border-radius:999px;background:var(--surface);border:1px solid var(--border);font-family:var(--mono);font-size:0.72rem;color:var(--muted);box-shadow:var(--card-shadow);}
  .pico-status-dot{width:8px;height:8px;border-radius:50%;background:var(--green);animation:picoStatusPulse 2s ease-in-out infinite;}
  .pico-status-dot.offline{background:var(--accent3);animation:none;}
  .pico-status-dot.connecting{background:var(--yellow);animation:picoStatusPulse 1s ease-in-out infinite;}
  @keyframes picoStatusPulse{0%,100%{box-shadow:0 0 0 0 rgba(0,230,118,0.5)}50%{box-shadow:0 0 0 5px rgba(0,230,118,0)}}
  .pico-theme-btn{width:42px;height:42px;border-radius:12px;background:var(--surface);border:1px solid var(--border);cursor:pointer;display:grid;place-items:center;font-size:18px;transition:all var(--transition);box-shadow:var(--card-shadow);}
  .pico-theme-btn:hover{transform:scale(1.08);background:var(--surface2);}

  .pico-stats-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px;animation:picoFadeUp 0.7s 0.1s ease both;}
  @keyframes picoFadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
  .pico-stat-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:22px 24px;box-shadow:var(--card-shadow);position:relative;overflow:hidden;transition:transform var(--transition),box-shadow var(--transition);}
  .pico-stat-card:hover{transform:translateY(-3px);box-shadow:var(--glow),var(--card-shadow);}
  .pico-stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--accent2),var(--accent));}
  .pico-stat-card.green-top::before{background:linear-gradient(90deg,var(--green),var(--accent));}
  .pico-stat-card.pink-top::before{background:linear-gradient(90deg,var(--accent3),var(--yellow));}
  .pico-stat-card.yellow-top::before{background:linear-gradient(90deg,var(--yellow),var(--accent2));}
  .pico-stat-label{font-family:var(--mono);font-size:0.65rem;color:var(--muted);letter-spacing:1.8px;text-transform:uppercase;margin-bottom:10px;}
  .pico-stat-value{font-size:2rem;font-weight:800;letter-spacing:-1px;line-height:1;transition:color 0.3s;}
  .pico-stat-unit{font-family:var(--mono);font-size:0.85rem;color:var(--muted);font-weight:400;margin-left:4px;}
  .pico-stat-sub{margin-top:8px;font-size:0.8rem;color:var(--muted);}
  .pico-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:999px;font-family:var(--mono);font-size:0.62rem;background:rgba(0,230,118,0.12);color:var(--green);}
  .pico-badge.warn{background:rgba(255,64,129,0.12);color:var(--accent3);}

  .pico-chart-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:28px 28px 22px;box-shadow:var(--card-shadow);margin-bottom:24px;animation:picoFadeUp 0.7s 0.2s ease both;}
  .pico-chart-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px;}
  .pico-chart-title{font-size:1.05rem;font-weight:700;}
  .pico-chart-subtitle{font-family:var(--mono);font-size:0.68rem;color:var(--muted);margin-top:4px;}
  .pico-chart-actions{display:flex;gap:8px;}
  .pico-range-btn{padding:5px 12px;border-radius:8px;border:1px solid var(--border);background:transparent;color:var(--muted);font-family:var(--mono);font-size:0.68rem;cursor:pointer;transition:all 0.2s;}
  .pico-range-btn:hover,.pico-range-btn.active{background:var(--accent);color:#000;border-color:var(--accent);}
  .pico-canvas-wrap canvas{border-radius:8px;width:100%!important;}

  .pico-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:220px;gap:12px;color:var(--muted);font-family:var(--mono);font-size:0.78rem;}
  .pico-empty-icon{font-size:2.5rem;opacity:0.4;}
  .pico-empty-url{font-size:0.6rem;opacity:0.5;word-break:break-all;text-align:center;max-width:400px;}

  .pico-bottom-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;animation:picoFadeUp 0.7s 0.3s ease both;}
  @media(max-width:640px){.pico-bottom-row{grid-template-columns:1fr}}
  .pico-mini-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:22px 24px;box-shadow:var(--card-shadow);}
  .pico-mini-title{font-family:var(--mono);font-size:0.65rem;color:var(--muted);letter-spacing:1.8px;text-transform:uppercase;margin-bottom:14px;}

  .pico-gauge-wrap{display:flex;flex-direction:column;align-items:center;gap:16px;}
  .pico-gauge-svg-wrap{position:relative;width:160px;height:100px;}
  .pico-gauge-center{position:absolute;bottom:0;left:50%;transform:translateX(-50%);text-align:center;}
  .pico-gauge-num{font-size:1.8rem;font-weight:800;font-family:var(--mono);line-height:1;}
  .pico-gauge-unit{font-size:0.7rem;color:var(--muted);font-family:var(--mono);}
  .pico-gauge-labels{display:flex;justify-content:space-between;width:160px;font-family:var(--mono);font-size:0.6rem;color:var(--muted);}

  .pico-history-list{display:flex;flex-direction:column;gap:8px;}
  .pico-history-item{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border-radius:10px;background:var(--surface2);font-family:var(--mono);font-size:0.75rem;transition:background 0.2s;}
  .pico-history-item:hover{background:var(--border);}
  .pico-h-time{color:var(--muted);min-width:70px;}
  .pico-h-bar{height:4px;border-radius:2px;flex:1;margin:0 12px;background:var(--surface);overflow:hidden;}
  .pico-h-bar-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--accent2),var(--accent));}

  .pico-error-banner{background:rgba(255,64,129,0.08);border:1px solid rgba(255,64,129,0.25);border-radius:10px;padding:10px 16px;font-family:var(--mono);font-size:0.72rem;color:var(--accent3);margin-bottom:18px;display:flex;align-items:center;gap:8px;}

  @keyframes picoShimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
  .pico-shimmer{background:linear-gradient(90deg,var(--surface2) 25%,var(--border) 50%,var(--surface2) 75%);background-size:800px 100%;animation:picoShimmer 1.5s infinite;height:36px;border-radius:10px;}

  .pico-footer{margin-top:48px;text-align:center;font-family:var(--mono);font-size:0.65rem;color:var(--muted);letter-spacing:1px;animation:picoFadeUp 0.7s 0.4s ease both;}
`;

// ─── Component ─────────────────────────────────────────────────────────────────
export default function PicoDashboard() {
  const [isDark, setIsDark]               = useState(true);
  const [status, setStatus]               = useState('connecting');
  const [errorMsg, setErrorMsg]           = useState('');
  const [visiblePoints, setVisiblePoints] = useState(30);
  const [stats, setStats]                 = useState({ cur: null, min: Infinity, max: -Infinity, avg: 0, count: 0, lastUpdate: null });
  const [distanceCm, setDistanceCm]       = useState(null);
  const [history, setHistory]             = useState([]);
  const [pointCount, setPointCount]       = useState(0);
  const [hasData, setHasData]             = useState(false);

  const canvasRef  = useRef(null);
  const chartRef   = useRef(null);
  const bufferRef  = useRef({ labels: [], data: [] });
  const sessionRef = useRef({ min: Infinity, max: -Infinity, sum: 0, count: 0 });
  const vpRef      = useRef(visiblePoints);
  vpRef.current    = visiblePoints;

  // ── Inject styles once ───────────────────────────────────────────────────────
  useEffect(() => {
    const id = 'pico-dash-styles';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id; el.textContent = STYLES;
      document.head.appendChild(el);
    }
  }, []);

  // ── Build / rebuild Chart.js on theme change ─────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current || !hasData) return;
    const ctx    = canvasRef.current.getContext('2d');
    const accent = isDark ? '#00e5ff' : '#0077cc';
    const muted  = isDark ? '#5a6070' : '#8a92a8';
    const border = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';
    const surf   = isDark ? '#111318' : '#ffffff';
    const text   = isDark ? '#e8eaf0' : '#111318';
    const grad   = ctx.createLinearGradient(0, 0, 0, 220);
    grad.addColorStop(0, isDark ? 'rgba(0,229,255,0.25)' : 'rgba(0,119,204,0.18)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    if (chartRef.current) chartRef.current.destroy();

    const vp = vpRef.current;
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: bufferRef.current.labels.slice(-vp),
        datasets: [{
          label: 'Water Level %',
          data: bufferRef.current.data.slice(-vp),
          borderColor: accent, backgroundColor: grad,
          fill: true, tension: 0.45,
          pointRadius: 3, pointHoverRadius: 6,
          pointBackgroundColor: accent, borderWidth: 2.5,
        }]
      },
      options: {
        animation: false, responsive: true, maintainAspectRatio: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: surf, borderColor: border, borderWidth: 1,
            titleColor: muted, bodyColor: text,
            titleFont: { family: 'Space Mono', size: 10 },
            bodyFont: { family: 'Space Mono', size: 13, weight: '700' },
            padding: 12, cornerRadius: 10,
            callbacks: { label: c => ` ${c.parsed.y.toFixed(1)}%` }
          }
        },
        scales: {
          x: { grid: { color: border, drawBorder: false }, ticks: { color: muted, font: { family: 'Space Mono', size: 9 }, maxTicksLimit: 8, maxRotation: 0 } },
          y: { min: 0, max: 100, grid: { color: border, drawBorder: false }, ticks: { color: muted, font: { family: 'Space Mono', size: 9 }, callback: v => v + '%' } }
        }
      }
    });
  }, [isDark, hasData]);

  // ── Push buffer slice to chart ───────────────────────────────────────────────
  const pushToChart = (labels, data) => {
    if (!chartRef.current) return;
    const slice = Math.min(vpRef.current, data.length);
    chartRef.current.data.labels           = labels.slice(-slice);
    chartRef.current.data.datasets[0].data = data.slice(-slice);
    chartRef.current.update('none');
  };

  // Re-slice when range button changes
  useEffect(() => {
    pushToChart(bufferRef.current.labels, bufferRef.current.data);
  }, [visiblePoints]);

  // ── Fetch loop ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(GET_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = await res.json();

        // Accept single object OR array
        const readings = Array.isArray(body) ? body : [body];
        if (!readings.length) return;

        setStatus('live');
        setErrorMsg('');

        readings.forEach(r => {
          const val  = parseFloat(r.water_level_pct);
          const dist = parseFloat(r.distance_cm);
          if (isNaN(val)) return;
          const t = new Date(r.timestamp ?? Date.now()).toLocaleTimeString();

          bufferRef.current.labels.push(t);
          bufferRef.current.data.push(val);
          if (bufferRef.current.labels.length > 500) {
            bufferRef.current.labels.shift();
            bufferRef.current.data.shift();
          }

          const s = sessionRef.current;
          s.min = Math.min(s.min, val);
          s.max = Math.max(s.max, val);
          s.sum += val; s.count += 1;

          setStats({ cur: val, min: s.min, max: s.max, avg: s.sum / s.count, count: s.count, lastUpdate: t });
          setDistanceCm(isNaN(dist) ? null : dist);
          setHistory(prev => [{ val, dist, time: t }, ...prev].slice(0, 5));
          setPointCount(bufferRef.current.data.length);
          setHasData(true);
        });

        pushToChart(bufferRef.current.labels, bufferRef.current.data);

      } catch (e) {
        setStatus('offline');
        setErrorMsg(`Cannot reach device — ${e.message}`);
      }
    };

    fetchData();
    const id = setInterval(fetchData, 2000);
    return () => clearInterval(id);
  }, []);

  // ── Gauge ────────────────────────────────────────────────────────────────────
  const curVal     = stats.cur ?? 0;
  const pct        = Math.min(Math.max(curVal, 0), 100) / 100;
  const trackLen   = 208;
  const dashOffset = trackLen * (1 - pct);
  const needleDeg  = -90 + pct * 180;
  const levelColor = curVal > 70 ? 'var(--green)' : curVal > 30 ? 'var(--yellow)' : 'var(--accent3)';
  const fmt        = v => (v === null || !isFinite(v)) ? '—' : v.toFixed(1);

  return (
    <div className={`pico-root${isDark ? '' : ' light'}`}>
      <div className="pico-blobs">
        <div className="pico-blob pico-blob-1" />
        <div className="pico-blob pico-blob-2" />
        <div className="pico-blob pico-blob-3" />
      </div>

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

        {/* Error banner */}
        {errorMsg && <div className="pico-error-banner">⚠ {errorMsg}</div>}

        {/* Stat cards */}
        <div className="pico-stats-row">
          <div className="pico-stat-card">
            <div className="pico-stat-label">Water Level</div>
            <div className="pico-stat-value" style={{ color: levelColor }}>
              {fmt(stats.cur)}<span className="pico-stat-unit">%</span>
            </div>
            <div className="pico-stat-sub">Updated <span style={{ color: 'var(--accent)' }}>{stats.lastUpdate ?? '—'}</span></div>
          </div>
          <div className="pico-stat-card green-top">
            <div className="pico-stat-label">Session Min</div>
            <div className="pico-stat-value" style={{ color: 'var(--green)' }}>
              {fmt(stats.min === Infinity ? null : stats.min)}<span className="pico-stat-unit">%</span>
            </div>
            <div className="pico-stat-sub"><span className="pico-badge">↓ Low</span></div>
          </div>
          <div className="pico-stat-card pink-top">
            <div className="pico-stat-label">Session Max</div>
            <div className="pico-stat-value" style={{ color: 'var(--accent3)' }}>
              {fmt(stats.max === -Infinity ? null : stats.max)}<span className="pico-stat-unit">%</span>
            </div>
            <div className="pico-stat-sub"><span className="pico-badge warn">↑ High</span></div>
          </div>
          <div className="pico-stat-card yellow-top">
            <div className="pico-stat-label">Distance</div>
            <div className="pico-stat-value" style={{ color: 'var(--yellow)' }}>
              {distanceCm !== null ? distanceCm.toFixed(1) : '—'}<span className="pico-stat-unit">cm</span>
            </div>
            <div className="pico-stat-sub" style={{ color: 'var(--muted)' }}>{stats.count} samples</div>
          </div>
        </div>

        {/* Chart */}
        <div className="pico-chart-card">
          <div className="pico-chart-header">
            <div>
              <div className="pico-chart-title">Water Level Feed</div>
              <div className="pico-chart-subtitle">Refreshing every 2s · {pointCount} data points</div>
            </div>
            <div className="pico-chart-actions">
              {[30, 60, 300].map(n => (
                <button key={n} className={`pico-range-btn${visiblePoints === n ? ' active' : ''}`} onClick={() => setVisiblePoints(n)}>
                  {n === 30 ? '30s' : n === 60 ? '1m' : '5m'}
                </button>
              ))}
            </div>
          </div>
          <div className="pico-canvas-wrap">
            {hasData
              ? <canvas ref={canvasRef} height={220} />
              : <div className="pico-empty">
                  <div className="pico-empty-icon">📡</div>
                  <span>Waiting for Pico W data…</span>
                  <span className="pico-empty-url">{GET_URL}</span>
                </div>
            }
          </div>
        </div>

        {/* Bottom row */}
        <div className="pico-bottom-row">

          {/* Gauge */}
          <div className="pico-mini-card">
            <div className="pico-mini-title">Live Gauge</div>
            <div className="pico-gauge-wrap">
              <div className="pico-gauge-svg-wrap">
                <svg viewBox="0 0 160 90" width="160" height="90">
                  <defs>
                    <linearGradient id="picoGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"   stopColor="var(--accent2)" />
                      <stop offset="50%"  stopColor="var(--accent)" />
                      <stop offset="100%" stopColor="var(--accent3)" />
                    </linearGradient>
                  </defs>
                  <path d="M14,84 A66,66 0 0,1 146,84" fill="none" stroke="var(--surface2)" strokeWidth="12" strokeLinecap="round" />
                  <path d="M14,84 A66,66 0 0,1 146,84" fill="none"
                    stroke="url(#picoGaugeGrad)" strokeWidth="12" strokeLinecap="round"
                    strokeDasharray={trackLen} strokeDashoffset={dashOffset}
                    style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)' }}
                  />
                  <circle cx="80" cy="84" r="5" fill="var(--accent)" />
                  <line x1="80" y1="84" x2="80" y2="28"
                    stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"
                    style={{ transformOrigin: '80px 84px', transform: `rotate(${needleDeg}deg)`, transition: 'transform 0.8s cubic-bezier(0.4,0,0.2,1)' }}
                  />
                </svg>
                <div className="pico-gauge-center">
                  <div className="pico-gauge-num" style={{ color: levelColor }}>
                    {stats.cur !== null ? Math.round(stats.cur) : '—'}
                  </div>
                  <div className="pico-gauge-unit">% full</div>
                </div>
              </div>
              <div className="pico-gauge-labels"><span>Empty</span><span>50%</span><span>Full</span></div>
            </div>
          </div>

          {/* Recent readings */}
          <div className="pico-mini-card">
            <div className="pico-mini-title">Recent Readings</div>
            <div className="pico-history-list">
              {history.length === 0
                ? [0,1,2].map(i => <div key={i} className="pico-shimmer" style={{ marginTop: i ? 8 : 0 }} />)
                : history.map((r, i) => (
                    <div key={i} className="pico-history-item">
                      <span className="pico-h-time">{r.time}</span>
                      <div className="pico-h-bar">
                        <div className="pico-h-bar-fill" style={{ width: `${Math.min(Math.max(r.val, 0), 100)}%` }} />
                      </div>
                      <span style={{ fontWeight: 700 }}>{r.val.toFixed(1)}%</span>
                    </div>
                  ))
              }
            </div>
          </div>

        </div>

        <footer className="pico-footer">
          PICO W · RP2040 · MICROPYTHON · {BASE_URL.replace('https://', '')}
        </footer>
      </div>
    </div>
  );
}