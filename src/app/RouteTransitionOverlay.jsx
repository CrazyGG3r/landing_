import { useEffect, useId, useRef, useState } from 'react'
import { ROUTE_TRANSITION_READY, ROUTE_TRANSITION_START } from './routeTransition'

const REVEAL_MS = 1250
const ROUTE_SETTLE_MS = 450
const MAX_HOLD_MS = 12000
const CRT_TIMES = '0;0.16;0.55;1'
const CRT_SPLINES = '.2,.8,.2,1;.12,.86,.2,1;.28,0,.1,1'

function GeometryAnimation({ attributeName, values }) {
  return (
    <animate
      attributeName={attributeName}
      dur={`${REVEAL_MS}ms`}
      values={values}
      keyTimes={CRT_TIMES}
      calcMode="spline"
      keySplines={CRT_SPLINES}
      fill="freeze"
    />
  )
}

function RasterRect({ className = '', children }) {
  return (
    <rect x="500" y="499" width="0" height="2" className={className}>
      <GeometryAnimation attributeName="x" values="500;500;-50;-50" />
      <GeometryAnimation attributeName="y" values="499;497;497;-50" />
      <GeometryAnimation attributeName="width" values="0;0;1100;1100" />
      <GeometryAnimation attributeName="height" values="2;6;6;1100" />
      {children}
    </rect>
  )
}

export default function RouteTransitionOverlay() {
  const [state, setState] = useState({ phase: 'idle', label: '' })
  const maskId = `route-crt-${useId().replace(/:/g, '')}`
  const timersRef = useRef({ ready: 0, reveal: 0, safety: 0 })
  const expectedPathRef = useRef('')

  useEffect(() => {
    const clearTimers = () => Object.values(timersRef.current).forEach(window.clearTimeout)
    const reveal = () => {
      setState(previous => previous.phase === 'idle' ? previous : { ...previous, phase: 'revealing' })
      window.clearTimeout(timersRef.current.reveal)
      timersRef.current.reveal = window.setTimeout(() => setState({ phase: 'idle', label: '' }), REVEAL_MS)
    }
    const requestReveal = event => {
      if (event.detail?.pathname !== expectedPathRef.current) return
      window.clearTimeout(timersRef.current.ready)
      window.clearTimeout(timersRef.current.safety)
      timersRef.current.ready = window.setTimeout(reveal, ROUTE_SETTLE_MS)
    }
    const handleStart = event => {
      clearTimers()
      expectedPathRef.current = event.detail?.pathname || ''
      setState({ phase: 'holding', label: event.detail?.label || 'ROUTE' })
      // A failed optional asset must never strand the visitor behind black.
      timersRef.current.safety = window.setTimeout(reveal, MAX_HOLD_MS)
    }

    window.addEventListener(ROUTE_TRANSITION_START, handleStart)
    window.addEventListener(ROUTE_TRANSITION_READY, requestReveal)
    return () => {
      window.removeEventListener(ROUTE_TRANSITION_START, handleStart)
      window.removeEventListener(ROUTE_TRANSITION_READY, requestReveal)
      clearTimers()
    }
  }, [])

  if (state.phase === 'idle') return null
  const revealing = state.phase === 'revealing'

  return (
    <div className={`route-transition-overlay route-transition-overlay--${state.phase}`} aria-label={`Loading ${state.label}`} aria-live="polite">
      <svg className="route-transition-stage" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
            <rect width="1000" height="1000" fill="white" />
            {revealing && (
              <>
                <circle cx="500" cy="500" r="0" fill="black">
                  <animate attributeName="r" values="0;6;3;0" keyTimes="0;.07;.14;1" dur={`${REVEAL_MS}ms`} fill="freeze" />
                </circle>
                <RasterRect className="route-transition-aperture" />
              </>
            )}
          </mask>
        </defs>

        <rect className="route-transition-blackout" width="1000" height="1000" mask={`url(#${maskId})`} />

        {revealing && (
          <g className="route-transition-ignition">
            <circle className="route-transition-dot route-transition-dot--cyan" cx="496" cy="502" r="0">
              <animate attributeName="r" values="0;8;4;0" keyTimes="0;.07;.16;1" dur={`${REVEAL_MS}ms`} fill="freeze" />
            </circle>
            <circle className="route-transition-dot route-transition-dot--magenta" cx="504" cy="498" r="0">
              <animate attributeName="r" values="0;7;3;0" keyTimes="0;.08;.16;1" dur={`${REVEAL_MS}ms`} fill="freeze" />
            </circle>
            <circle className="route-transition-dot route-transition-dot--core" cx="500" cy="500" r="0">
              <animate attributeName="r" values="0;6;3;0" keyTimes="0;.06;.16;1" dur={`${REVEAL_MS}ms`} fill="freeze" />
            </circle>

            <g className="route-transition-raster route-transition-raster--cyan"><RasterRect /></g>
            <g className="route-transition-raster route-transition-raster--magenta"><RasterRect /></g>
            <g className="route-transition-raster route-transition-raster--core"><RasterRect /></g>
          </g>
        )}
      </svg>
      {revealing && <div className="route-transition-scanlines" aria-hidden="true" />}

      <style>{`
        .route-transition-overlay { position:fixed; inset:0; z-index:2147483000; overflow:hidden; pointer-events:auto; background:#000; isolation:isolate; }
        .route-transition-overlay--revealing { background:transparent; }
        .route-transition-stage { position:absolute; inset:0; width:100%; height:100%; }
        .route-transition-blackout { fill:#000; }
        .route-transition-aperture { fill:#000; }
        .route-transition-ignition { animation:route-crt-jitter ${REVEAL_MS}ms steps(2,end) both; }
        .route-transition-dot { vector-effect:non-scaling-stroke; }
        .route-transition-dot--cyan { fill:#42dfff; }
        .route-transition-dot--magenta { fill:#ff3d91; }
        .route-transition-dot--core { fill:#fff; }
        .route-transition-raster rect { fill:none; stroke-width:2; vector-effect:non-scaling-stroke; }
        .route-transition-raster--cyan { color:#48dfff; transform:translate(-4px,2px); animation:route-crt-cyan ${REVEAL_MS}ms ease-out both; }
        .route-transition-raster--cyan rect { stroke:currentColor; }
        .route-transition-raster--magenta { color:#ff438f; transform:translate(4px,-2px); animation:route-crt-magenta ${REVEAL_MS}ms ease-out both; }
        .route-transition-raster--magenta rect { stroke:currentColor; }
        .route-transition-raster--core { color:#fff; animation:route-crt-core ${REVEAL_MS}ms ease-out both; }
        .route-transition-raster--core rect { stroke:currentColor; }
        .route-transition-scanlines { position:absolute; inset:0; pointer-events:none; opacity:0; background:repeating-linear-gradient(0deg,rgba(0,0,0,.2) 0 1px,transparent 1px 4px); animation:route-crt-scanlines ${REVEAL_MS}ms linear both; }
        @keyframes route-crt-jitter { 0%,10% { transform:translate(0); } 14% { transform:translate(-2px,1px); } 21% { transform:translate(3px,-1px); } 31% { transform:translate(-1px,1px); } 45%,100% { transform:translate(0); } }
        @keyframes route-crt-core { 0% { opacity:0; } 4% { opacity:1; } 36% { opacity:.92; } 70% { opacity:.38; } 94%,100% { opacity:0; } }
        @keyframes route-crt-cyan { 0% { opacity:0; } 8% { opacity:.78; } 48% { opacity:.45; } 86%,100% { opacity:0; } }
        @keyframes route-crt-magenta { 0% { opacity:0; } 10% { opacity:.64; } 48% { opacity:.34; } 86%,100% { opacity:0; } }
        @keyframes route-crt-scanlines { 0%,38% { opacity:0; } 48% { opacity:.58; } 82% { opacity:.18; } 100% { opacity:0; } }
        @media (prefers-reduced-motion:reduce) { .route-transition-ignition,.route-transition-scanlines { display:none; } }
      `}</style>
    </div>
  )
}
