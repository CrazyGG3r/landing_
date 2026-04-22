/**
 * MetaballCursorOverlay
 *
 * DOM layer that sits above the R3F canvas and shows a tooltip card
 * next to whichever 3D object the metaball cursor is hovering —
 * but ONLY once the metaball's dwell/anchor animation has fully triggered.
 *
 * Visibility is tied to cs.anchor (0 → 1), not merely cs.activeId.
 * The card fades in once anchor crosses ANCHOR_SHOW_THRESHOLD, and
 * fades out once anchor drops back below ANCHOR_HIDE_THRESHOLD.
 *
 * stateRef.current = { cs, pipeline }
 *   cs.activeId          — 1-indexed object id (0 = none)
 *   cs.anchor            — float 0→1: how "locked" the cursor is onto the object
 *   cs.alpha             — float: current metaball opacity
 *   pipeline.smoothProj  — array of { cx, cy, r } in canvas-pixel coords
 */

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'

// ─── TUNABLES ────────────────────────────────────────────────────────────────

const CARD_WIDTH      = 260   // fixed width; height is auto
const H_OFFSET        = 22    // horizontal gap: object edge → card edge  (px)
const V_CENTER_OFFSET = 0     // vertical nudge from object center          (px)
const EDGE_MARGIN     = 14    // min distance from any viewport edge        (px)

// Anchor thresholds — card appears/disappears based on cs.anchor value
// anchor rises 0→1 as the dwell timer fires and the blob "locks on"
const ANCHOR_SHOW_THRESHOLD = 0.55  // anchor must exceed this to show card
const ANCHOR_HIDE_THRESHOLD = 0.30  // anchor must drop below this to hide card

const SIDE_DEADZONE   = 0.07  // fraction of winW — side won't flip inside this band around center
const POS_LERP        = 0.14  // exponential lerp factor per rAF frame (0 = frozen, 1 = instant)

// CSS transition durations (ms)
const FADE_IN_MS      = 200
const FADE_OUT_MS     = 120

// ─── UTILS ───────────────────────────────────────────────────────────────────

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

// ─── HOOK: useWindowSize ─────────────────────────────────────────────────────

function useWindowSize() {
  const [size, setSize] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth  : 1200,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  }))

  useEffect(() => {
    let t = null
    const fn = () => {
      clearTimeout(t)
      t = setTimeout(() => setSize({ w: window.innerWidth, h: window.innerHeight }), 100)
    }
    window.addEventListener('resize', fn, { passive: true })
    return () => { window.removeEventListener('resize', fn); clearTimeout(t) }
  }, [])

  return size
}

// ─── HOOK: useMetaballTracker ─────────────────────────────────────────────────
// Polls stateRef every rAF frame.
//
// Returns:
//   activeIdx  — React state, triggers re-render only on object switch
//   visible    — React state, driven by cs.anchor crossing thresholds
//   getPos     — stable callback returning current smoothed canvas-px position
//   canvasToWindow — converts canvas-px coords → window CSS-px coords

function useMetaballTracker(objects, stateRef, canvasRef) {
  const [activeIdx, setActiveIdx] = useState(-1)
  const [visible,   setVisible]   = useState(false)

  // Live refs — updated every rAF, never trigger React re-renders
  const posRef      = useRef({ x: 0, y: 0 })
  const targetRef   = useRef({ x: 0, y: 0 })
  // Smoothed projected radius in canvas-px, converted to CSS-px for positioning.
  // Tracks the ID-mask silhouette radius so the card never overlaps the mesh.
  const projRRef    = useRef(0)
  const rafRef      = useRef(null)
  const lastIdxRef  = useRef(-1)
  const visRef      = useRef(false)   // shadow of `visible` to skip redundant setState

  useEffect(() => {
    const tick = () => {
      const { cs, pipeline } = stateRef?.current ?? {}

      if (cs && pipeline) {
        const idx = cs.activeId - 1   // -1 means nothing hovered

        // ── Position + radius tracking ────────────────────────────────────
        if (idx >= 0 && pipeline.smoothProj[idx]) {
          const p = pipeline.smoothProj[idx]
          targetRef.current.x = p.cx
          targetRef.current.y = p.cy
          // p.r is in canvas device-pixels; convert to CSS pixels for DOM use
          const dpr = window.devicePixelRatio || 1
          projRRef.current += (p.r / dpr - projRRef.current) * POS_LERP
        }
        posRef.current.x += (targetRef.current.x - posRef.current.x) * POS_LERP
        posRef.current.y += (targetRef.current.y - posRef.current.y) * POS_LERP

        // ── Active index — only re-render on switch ────────────────────────
        if (idx !== lastIdxRef.current) {
          lastIdxRef.current = idx
          setActiveIdx(idx)
        }

        // ── Visibility — driven by cs.anchor crossing hysteresis band ──────
        const anchor = cs.anchor   // 0 (idle) → 1 (fully triggered)

        if (!visRef.current && anchor >= ANCHOR_SHOW_THRESHOLD) {
          visRef.current = true
          setVisible(true)
        } else if (visRef.current && (anchor < ANCHOR_HIDE_THRESHOLD || idx < 0)) {
          visRef.current = false
          setVisible(false)
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [objects, stateRef])

  const getPos    = useCallback(() => ({ ...posRef.current }), [])
  // Returns the live smoothed CSS-px radius of the active object's projected silhouette
  const getProjR  = useCallback(() => projRRef.current, [])

  const canvasToWindow = useCallback((cx, cy) => {
    if (!canvasRef?.current) return { x: cx, y: cy }
    const rect = canvasRef.current.getBoundingClientRect()
    const dpr  = window.devicePixelRatio || 1
    return {
      x: rect.left + cx / dpr,
      y: rect.top  + cy / dpr,
    }
  }, [canvasRef])

  return { activeIdx, visible, getPos, getProjR, canvasToWindow }
}

// ─── POSITIONING: resolvePosition ────────────────────────────────────────────
// projR — CSS-px radius of the object's projected ID-mask silhouette.
// The card's nearest edge is placed at  objCenter ± (projR + H_OFFSET),
// guaranteeing it never overlaps the mesh silhouette regardless of object size.

function resolvePosition({ ox, oy, side, projR, cardW, cardH, winW, winH }) {
  const reach = projR + H_OFFSET   // distance from center to card near-edge

  let left = side === 'right'
    ? ox + reach
    : ox - reach - cardW

  let top = oy + V_CENTER_OFFSET - cardH / 2

  const spills = (l) => l < EDGE_MARGIN || l + cardW > winW - EDGE_MARGIN
  if (spills(left)) {
    const alt = side === 'right' ? ox - reach - cardW : ox + reach
    left = spills(alt)
      ? clamp(left, EDGE_MARGIN, winW - cardW - EDGE_MARGIN)
      : alt
  }

  top = clamp(top, EDGE_MARGIN, winH - cardH - EDGE_MARGIN)

  return { left, top }
}

// ─── HOOK: useSideMemory ──────────────────────────────────────────────────────

function useSideMemory() {
  const sideRef = useRef('right')

  const updateSide = useCallback((ox, winW) => {
    const lo = winW * (0.5 - SIDE_DEADZONE)
    const hi = winW * (0.5 + SIDE_DEADZONE)
    if (ox < lo) sideRef.current = 'right'
    if (ox > hi) sideRef.current = 'left'
    return sideRef.current
  }, [])

  return updateSide
}

// ─── HOOK: useMeasuredHeight ──────────────────────────────────────────────────

function useMeasuredHeight(ref) {
  const [height, setHeight] = useState(72)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => {
      const h = e.contentRect.height
      if (h > 0) setHeight(Math.ceil(h))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])

  return height
}

// ─── CARD ─────────────────────────────────────────────────────────────────────

function Card({ object, side, visible }) {
  const align = side === 'right' ? 'left' : 'right'

  return (
    <div
      style={{
        width: '100%',
        padding: '8px 12px',
        boxSizing: 'border-box',
        textAlign: align,
        fontFamily: '"DM Mono", "Fira Mono", ui-monospace, monospace',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(4px)',
        transition: visible
          ? `opacity ${FADE_IN_MS}ms ease, transform ${FADE_IN_MS}ms ease`
          : `opacity ${FADE_OUT_MS}ms ease, transform ${FADE_OUT_MS}ms ease`,
        pointerEvents: 'none',
        userSelect: 'none',
        willChange: 'opacity, transform',
      }}
    >
      {object?.title && (
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.03em',
            color: '#fff',
            lineHeight: 1.4,
            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          }}
        >
          {object.title}
        </div>
      )}
      {object?.desc && (
        <div
          style={{
            marginTop: 6,
            fontSize: 11,
            letterSpacing: '0.02em',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.5,
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
          }}
        >
          {object.desc}
        </div>
      )}
      <img
        src="/test/test.png"
        alt="test"
        style={{
          display: 'block',
          marginTop: 10,
          maxWidth: '100%',
          height: 'auto',
          borderRadius: 4,
        }}
      />
    </div>
  )
}

// ─── HINT ─────────────────────────────────────────────────────────────────────

function Hint({ show }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 16,
      left: '50%',
      transform: 'translateX(-50%)',
      fontFamily: '"DM Mono", "Fira Mono", ui-monospace, monospace',
      fontSize: 9,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.18)',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      userSelect: 'none',
      opacity: show ? 1 : 0,
      transition: 'opacity 0.4s ease',
    }}>
      hover any object
    </div>
  )
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────

/**
 * @param {object[]}  objects    — metaball object array (from buildMetaballObjects)
 * @param {React.MutableRefObject} stateRef — ref holding { cs, pipeline }
 * @param {React.MutableRefObject} [canvasRef] — ref to the <canvas> DOM element
 * @param {boolean}   [showHint=true]
 * @param {string}    [className='']
 * @param {Function}  [render]   — custom render prop: ({ object, visible, side }) => ReactNode
 * @param {ReactNode} [children]
 */
export function MetaballCursorOverlay({
  objects,
  stateRef,
  canvasRef,
  showHint = true,
  className = '',
  render,
  children,
}) {
  const win          = useWindowSize()
  const getSide      = useSideMemory()
  const wrapperRef   = useRef(null)
  const cardInnerRef = useRef(null)
  const cardH        = useMeasuredHeight(cardInnerRef)
  const posLockRef   = useRef(false)
  const sideStateRef = useRef('right')

  const { activeIdx, visible, getPos, getProjR, canvasToWindow } =
    useMetaballTracker(objects, stateRef, canvasRef)

  const isActive = activeIdx >= 0

  // Current object data — only changes on index switch
  const object = useMemo(
    () => (activeIdx >= 0 ? objects?.[activeIdx] ?? null : null),
    [activeIdx, objects]
  )

  const [side, setSide] = useState('right')

  // ── Positioning loop — writes DOM directly, zero React re-renders ─────────
  useEffect(() => {
    let raf = null

    const loop = () => {
      const el = wrapperRef.current
      if (el && isActive) {
        const { x: cx, y: cy } = getPos()
        const { x: ox, y: oy } = canvasToWindow(cx, cy)

        const newSide = getSide(ox, win.w)
        if (newSide !== sideStateRef.current) {
          sideStateRef.current = newSide
          setSide(newSide)
        }

        const { left, top } = resolvePosition({
          ox, oy,
          side:  sideStateRef.current,
          projR: getProjR(),
          cardW: CARD_WIDTH,
          cardH,
          winW:  win.w,
          winH:  win.h,
        })

        if (!posLockRef.current) {
          el.style.transition = 'none'
          el.style.left = `${left}px`
          el.style.top  = `${top}px`
          posLockRef.current = true
        } else {
          el.style.transition = 'left 0.1s cubic-bezier(0.25,0.46,0.45,0.94), top 0.1s cubic-bezier(0.25,0.46,0.45,0.94)'
          el.style.left = `${left}px`
          el.style.top  = `${top}px`
        }
      }

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [isActive, getPos, canvasToWindow, getSide, cardH, win])

  // Reset posLock when card fully hides so next appearance snaps
  useEffect(() => {
    if (!visible) posLockRef.current = false
  }, [visible])

  const content = render
    ? render({ object, visible, side })
    : children || <Card object={object} side={side} visible={visible} />

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        ref={wrapperRef}
        className={className}
        style={{
          position: 'absolute',
          width: CARD_WIDTH,
          top: 0,
          left: 0,
          pointerEvents: 'none',
          // Only render in the DOM when an object is being tracked;
          // the Card itself handles opacity/transform for the triggered fade
          visibility: isActive ? 'visible' : 'hidden',
        }}
      >
        <div ref={cardInnerRef}>
          {content}
        </div>
      </div>

      {showHint && <Hint show={!visible && !isActive} />}
    </div>
  )
}

export default MetaballCursorOverlay