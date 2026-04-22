/**
 * MetaballCursorOverlay
 *
 * DOM layer that sits above the R3F canvas and shows a tooltip card
 * next to whichever 3D object the metaball cursor is hovering.
 *
 * stateRef.current = { cs, pipeline }
 *   cs.activeId          — 1-indexed object id (0 = none)
 *   cs.anchor            — float 0→1: how "locked" the cursor is onto the object
 *   cs.alpha             — float: current metaball opacity
 *   pipeline.smoothProj  — array of { cx, cy, r } in canvas-pixel coords
 */

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { DEFAULT_CFG } from './MetaballCursor'

// ─── TUNABLES ────────────────────────────────────────────────────────────────

const CARD_WIDTH      = 260   // fixed width; height is auto
const H_OFFSET        = 22    // horizontal gap: object edge → card edge  (px)
const V_CENTER_OFFSET = 0     // vertical nudge from object center          (px)
const EDGE_MARGIN     = 14    // min distance from any viewport edge        (px)
const APPEAR_DELAY    = 100   // ms of continuous hover before card shows
const DISAPPEAR_GRACE = 100   // ms grace after hover ends before hiding
const SIDE_DEADZONE   = 0.07  // fraction of winW — side won't flip inside this band around center
const POS_LERP        = 0.14  // exponential lerp factor per rAF frame (0 = frozen, 1 = instant)

// ─── UTILS ───────────────────────────────────────────────────────────────────

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

// ─── HOOK: useWindowSize ─────────────────────────────────────────────────────
// Re-renders only on resize (debounced). Used for positioning math only.

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

// ─── HOOK: useTrackedObject ──────────────────────────────────────────────────
// Reads stateRef every rAF frame.
// Returns stable React state for: which object is active + whether anchor is strong.
// Position is kept in a ref and updated imperatively (no React re-render per frame).

function useTrackedObject(objects, stateRef, canvasRef) {
  // These drive React re-renders (cheap — only change on object switch)
  const [activeIdx, setActiveIdx] = useState(-1)

  // Live position lives in a ref — updated every rAF, read by positioning loop
  const posRef     = useRef({ x: 0, y: 0 })    // smoothed canvas-pixel position
  const targetRef  = useRef({ x: 0, y: 0 })    // raw target from smoothProj
  const rafRef     = useRef(null)
  const lastIdxRef = useRef(-1)

  useEffect(() => {
    const tick = () => {
      const { cs, pipeline } = stateRef?.current ?? {}

      if (cs && pipeline) {
        const idx = cs.activeId - 1   // -1 = none

        // Update target position from smoothProj (canvas pixels)
        if (idx >= 0 && pipeline.smoothProj[idx]) {
          const p = pipeline.smoothProj[idx]
          targetRef.current.x = p.cx
          targetRef.current.y = p.cy
        }

        // Always lerp toward target (keeps card glued even mid-transition)
        posRef.current.x += (targetRef.current.x - posRef.current.x) * POS_LERP
        posRef.current.y += (targetRef.current.y - posRef.current.y) * POS_LERP

        // Only trigger React re-render on index switch
        if (idx !== lastIdxRef.current) {
          lastIdxRef.current = idx
          setActiveIdx(idx)
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [objects, stateRef])

  // Stable getter consumed by the positioning loop — never stale
  const getPos = useCallback(() => ({ ...posRef.current }), [])

  // Convert canvas-pixel coords → window coords using canvas bounding rect
  const canvasToWindow = useCallback((cx, cy) => {
    if (!canvasRef?.current) return { x: cx, y: cy }
    const rect = canvasRef.current.getBoundingClientRect()
    // smoothProj coords are in canvas pixel space (devicePixelRatio-scaled).
    // We need CSS pixels: divide by dpr then add rect offset.
    const dpr = window.devicePixelRatio || 1
    return {
      x: rect.left + cx / dpr,
      y: rect.top  + cy / dpr,
    }
  }, [canvasRef])

  return { activeIdx, getPos, canvasToWindow }
}

// ─── HOOK: useVisibility ─────────────────────────────────────────────────────
// State machine:
//   HIDDEN  → (hover dwell APPEAR_DELAY ms)  → VISIBLE
//   VISIBLE → (leave + grace DISAPPEAR_GRACE ms) → HIDDEN
//
// Both timers cancel each other, no races.

function useVisibility(isActive) {
  const [visible, setVisible] = useState(false)
  const showT  = useRef(null)
  const hideT  = useRef(null)
  const visRef = useRef(false)   // shadow of `visible` to avoid stale closure in timers

  useEffect(() => {
    if (isActive) {
      // Cancel pending hide
      if (hideT.current) { clearTimeout(hideT.current); hideT.current = null }
      // Schedule show if not already visible or pending
      if (!visRef.current && !showT.current) {
        showT.current = setTimeout(() => {
          showT.current = null
          visRef.current = true
          setVisible(true)
        }, APPEAR_DELAY)
      }
    } else {
      // Cancel pending show
      if (showT.current) { clearTimeout(showT.current); showT.current = null }
      // Schedule hide after grace period
      if (!hideT.current) {
        hideT.current = setTimeout(() => {
          hideT.current = null
          visRef.current = false
          setVisible(false)
        }, DISAPPEAR_GRACE)
      }
    }
  }, [isActive])

  // Cleanup on unmount
  useEffect(() => () => {
    clearTimeout(showT.current)
    clearTimeout(hideT.current)
  }, [])

  return visible
}

// ─── POSITIONING: resolvePosition ────────────────────────────────────────────
// Pure function. Takes window coords of the object center + card/window dims.
// Returns { left, top, side } in CSS px.
//
// Side selection uses a dead-zone band so card doesn't flutter near center.
// The chosen side is passed in (managed by hook below with hysteresis).

function resolvePosition({ ox, oy, side, cardW, cardH, winW, winH }) {
  // Candidate left based on side
  let left = side === 'right'
    ? ox + H_OFFSET
    : ox - cardW - H_OFFSET

  // Vertical: center card on object, apply nudge
  let top = oy + V_CENTER_OFFSET - cardH / 2

  // Overflow → flip to opposite side
  const spills = (l) => l < EDGE_MARGIN || l + cardW > winW - EDGE_MARGIN
  if (spills(left)) {
    const alt = side === 'right' ? ox - cardW - H_OFFSET : ox + H_OFFSET
    left = spills(alt)
      ? clamp(left, EDGE_MARGIN, winW - cardW - EDGE_MARGIN)   // hard clamp
      : alt
  }

  // Vertical clamp
  top = clamp(top, EDGE_MARGIN, winH - cardH - EDGE_MARGIN)

  return { left, top }
}

// ─── HOOK: useSideMemory ──────────────────────────────────────────────────────
// Tracks preferred side with hysteresis so it only flips when the object
// clearly crosses a dead-zone boundary, not on every pixel wobble.

function useSideMemory() {
  const sideRef = useRef('right')

  const updateSide = useCallback((ox, winW) => {
    const lo = winW * (0.5 - SIDE_DEADZONE)
    const hi = winW * (0.5 + SIDE_DEADZONE)
    if (ox < lo) sideRef.current = 'right'   // object left of center → card right
    if (ox > hi) sideRef.current = 'left'    // object right of center → card left
    return sideRef.current
  }, [])

  return updateSide
}

// ─── HOOK: useMeasuredHeight ──────────────────────────────────────────────────
// Tracks real rendered card height via ResizeObserver.

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
// Now completely invisible container, only text + test image.

function Card({ object, side, visible }) {
  // text-align mirrors the side the card is on:
  //   card is to the RIGHT of object → left-aligned text
  //   card is to the LEFT  of object → right-aligned text
  const align = side === 'right' ? 'left' : 'right'

  return (
    <div
      style={{
        width: '100%',
        padding: '8px 12px',
        boxSizing: 'border-box',
        // No background, no border, no shadow — completely invisible container
        textAlign: align,
        fontFamily: '"DM Mono", "Fira Mono", ui-monospace, monospace',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(4px)',
        transition: visible
          ? 'opacity 0.18s ease, transform 0.18s ease'
          : 'opacity 0.10s ease, transform 0.10s ease',
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
      {/* Test image */}
      <img
        src="/test/test.png"
        alt="test"
        style={{
          display: 'block',
          marginTop: 10,
          maxWidth: '100%',
          height: 'auto',
          borderRadius: 4,
          // boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
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
 * @param {React.MutableRefObject} [canvasRef] — ref to the <canvas> DOM element;
 *   used to convert canvas-pixel coords → window coords. If omitted, the overlay
 *   assumes the canvas fills the entire viewport (safe fallback).
 * @param {boolean}   [showHint=true]  — show "hover any object" hint when idle
 * @param {string}    [className='']   — extra class on the card wrapper
 * @param {Function}  [render]         — custom render prop: ({ object, visible, side }) => ReactNode
 * @param {ReactNode} [children]       — alternative to render prop
 */
export function MetaballCursorOverlay({
  objects,
  stateRef,
  canvasRef,       // <-- NEW: pass the canvas DOM ref for accurate coord mapping
  showHint = true,
  className = '',
  render,
  children,
}) {
  const win          = useWindowSize()
  const getSide      = useSideMemory()
  const wrapperRef   = useRef(null)        // the absolutely-positioned card wrapper
  const cardInnerRef = useRef(null)        // the inner card (for ResizeObserver)
  const cardH        = useMeasuredHeight(cardInnerRef)
  const posLockRef   = useRef(false)       // true once card has been placed once (no slide-in)
  const sideStateRef = useRef('right')     // current side (ref so positioning rAF stays consistent)

  const { activeIdx, getPos, canvasToWindow } = useTrackedObject(objects, stateRef, canvasRef)
  const isActive = activeIdx >= 0
  const visible  = useVisibility(isActive)

  // Current object data — stable reference, only changes on index switch
  const object = useMemo(
    () => (activeIdx >= 0 ? objects?.[activeIdx] ?? null : null),
    [activeIdx, objects]
  )

  // Side (React state) — used for text-align; updated from positioning loop
  const [side, setSide] = useState('right')

  // ── Positioning loop ──────────────────────────────────────────────────────
  // Runs its own rAF, writes left/top directly to the wrapper DOM node.
  // Completely bypasses React state → zero re-renders for position updates.
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
          cardW: CARD_WIDTH,
          cardH,
          winW:  win.w,
          winH:  win.h,
        })

        if (!posLockRef.current) {
          // First placement: snap instantly, no CSS transition
          el.style.transition = 'none'
          el.style.left = `${left}px`
          el.style.top  = `${top}px`
          posLockRef.current = true
        } else {
          // Subsequent updates: smooth CSS transition
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

  // Reset posLock when card hides so next appearance snaps again
  useEffect(() => {
    if (!visible) posLockRef.current = false
  }, [visible])

  // ── Card content ──────────────────────────────────────────────────────────
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
      {/* Wrapper: positioned via direct DOM writes in the rAF loop */}
      <div
        ref={wrapperRef}
        className={className}
        style={{
          position: 'absolute',
          width: CARD_WIDTH,
          // Height is auto — driven by content
          top: 0,
          left: 0,
          pointerEvents: 'none',
          // Hidden until first placement to prevent flash at (0,0)
          visibility: (visible || isActive) ? 'visible' : 'hidden',
        }}
      >
        {/* Inner ref used only for ResizeObserver height measurement */}
        <div ref={cardInnerRef}>
          {content}
        </div>
      </div>

      {showHint && <Hint show={!visible && !isActive} />}
    </div>
  )
}

export default MetaballCursorOverlay