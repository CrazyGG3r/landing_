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
 *
 * ---------------------------------------------------------------
 * USAGE:
 *   <MetaballCursorOverlay
 *     objects={metaballObjects}
 *     stateRef={metaballStateRef}
 *     render={({ object, visible, side }) => (
 *       <div>
 *         <h3>{object.title}</h3>
 *         <p>{object.desc}</p>
 *         <img src={object.image} alt="" />
 *         <button>Learn more</button>
 *       </div>
 *     )}
 *   />
 *
 *   // Or use children:
 *   <MetaballCursorOverlay ...>
 *     {({ object }) => <CustomCard data={object} />}
 *   </MetaballCursorOverlay>
 *
 *   // If neither render nor children given, a minimal default shows title & desc.
 * ---------------------------------------------------------------
 */

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'

// ─── TUNABLES ────────────────────────────────────────────────────────────────

const CARD_WIDTH = 260   // fixed width; height is auto
const CARD_WIDTH_DEFAULT = 260
const H_OFFSET = 22    // horizontal gap: object edge → card edge  (px)
const V_CENTER_OFFSET = 0     // vertical nudge from object center          (px)
const EDGE_MARGIN = 14    // min distance from any viewport edge        (px)

// Anchor thresholds — card appears/disappears based on cs.anchor value
const ANCHOR_SHOW_THRESHOLD = 0.55
const ANCHOR_HIDE_THRESHOLD = 0.30

const SIDE_DEADZONE = 0.07  // fraction of winW — side won't flip inside this band
const POS_LERP = 0.14  // exponential smoothing factor per rAF frame

// CSS transitions (ms)
const FADE_IN_MS = 200
const FADE_OUT_MS = 120

// ─── UTILS ───────────────────────────────────────────────────────────────────

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

// ─── HOOK: useWindowSize ─────────────────────────────────────────────────────

function useWindowSize() {
  const [size, setSize] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1200,
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

function useMetaballTracker(objects, stateRef, canvasRef) {
  const [activeIdx, setActiveIdx] = useState(-1)
  const [visible, setVisible] = useState(false)

  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const projRRef = useRef(0)
  const rafRef = useRef(null)
  const lastIdxRef = useRef(-1)
  const visRef = useRef(false)

  useEffect(() => {
    const tick = () => {
      const { cs, pipeline } = stateRef?.current ?? {}

      if (cs && pipeline) {
        const idx = cs.activeId - 1

        // ── position + projected radius ────────────────────────────────
        if (idx >= 0 && pipeline.smoothProj[idx]) {
          const p = pipeline.smoothProj[idx]
          targetRef.current.x = p.cx
          targetRef.current.y = p.cy
          const dpr = window.devicePixelRatio || 1
          projRRef.current += (p.r / dpr - projRRef.current) * POS_LERP
        }
        posRef.current.x += (targetRef.current.x - posRef.current.x) * POS_LERP
        posRef.current.y += (targetRef.current.y - posRef.current.y) * POS_LERP

        // ── active index ──────────────────────────────────────────────
        if (idx !== lastIdxRef.current) {
          lastIdxRef.current = idx
          setActiveIdx(idx)
        }

        // ── visibility (anchor hysteresis) ────────────────────────────
        const anchor = cs.anchor
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

  const getPos = useCallback(() => ({ ...posRef.current }), [])
  const getProjR = useCallback(() => projRRef.current, [])

  const canvasToWindow = useCallback((cx, cy) => {
    if (!canvasRef?.current) return { x: cx, y: cy }
    const rect = canvasRef.current.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    return {
      x: rect.left + cx / dpr,
      y: rect.top + cy / dpr,
    }
  }, [canvasRef])

  return { activeIdx, visible, getPos, getProjR, canvasToWindow }
}

// ─── POSITIONING ─────────────────────────────────────────────────────────────

function resolvePosition({ ox, oy, side, projR, cardW, cardH, winW, winH }) {
  const reach = projR + H_OFFSET

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

// ─── CARD SHELL ───────────────────────────────────────────────────────────────
// A generic, animated container that you can fill with anything.
// Animations (opacity + scale) are applied automatically based on `visible`.

function CardShell({ side, visible, children }) {
  return (
    <div>
      {children}
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
 * MetaballCursorOverlay
 *
 * @param {object[]}  objects    — metaball object array (from buildMetaballObjects)
 * @param {React.MutableRefObject} stateRef — ref holding { cs, pipeline }
 * @param {React.MutableRefObject} [canvasRef] — ref to the <canvas> DOM element
 * @param {boolean}   [showHint=true] — show "hover any object" hint when idle
 * @param {string}    [className=''] — CSS class for the outer wrapper
 * @param {Function}  [render]   — custom render prop: ({ object, visible, side }) => ReactNode
 * @param {Function|ReactNode} [children] — children as render function or static element
 */
export function MetaballCursorOverlay({
  objects,
  stateRef,
  canvasRef,
  showHint = true,
  className = '',
  render,
  children,
  cardWidth = CARD_WIDTH_DEFAULT,   // <-- new prop
}) {
  const win = useWindowSize()
  const getSide = useSideMemory()
  const wrapperRef = useRef(null)
  const cardInnerRef = useRef(null)
  const cardW = cardWidth;
  const cardH = useMeasuredHeight(cardInnerRef)
  const posLockRef = useRef(false)
  const sideStateRef = useRef('right')

  const { activeIdx, visible, getPos, getProjR, canvasToWindow } =
    useMetaballTracker(objects, stateRef, canvasRef)

  const isActive = activeIdx >= 0

  // Current object data – only changes on index switch
  const object = useMemo(
    () => (activeIdx >= 0 ? objects?.[activeIdx] ?? null : null),
    [activeIdx, objects]
  )

  const [side, setSide] = useState('right')

  // ── smooth positioning loop ─────────────────────────────────────────────
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
          side: sideStateRef.current,
          projR: getProjR(),
          cardW,          // <-- use the prop
          cardH,
          winW: win.w,
          winH: win.h,
        })

        if (!posLockRef.current) {
          el.style.transition = 'none'
          el.style.left = `${left}px`
          el.style.top = `${top}px`
          posLockRef.current = true
        } else {
          el.style.transition = 'left 0.1s cubic-bezier(0.25,0.46,0.45,0.94), top 0.1s cubic-bezier(0.25,0.46,0.45,0.94)'
          el.style.left = `${left}px`
          el.style.top = `${top}px`
        }
      }

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [isActive, getPos, canvasToWindow, getSide, cardH, win])

  // reset position lock when hidden → next appearance snaps immediately
  useEffect(() => {
    if (!visible) posLockRef.current = false
  }, [visible])

  // ── content resolution ─────────────────────────────────────────────────
  // 1. render prop wins
  // 2. children (if a function, call it; otherwise render directly)
  // 3. fallback: minimal default using object.title / object.desc
  const resolveContent = () => {
    if (render) return render({ object, visible, side })
    if (typeof children === 'function') return children({ object, visible, side })
    if (children) return children

    // default tidy card if nothing provided – no hardcoded image
    if (object) {
      return (
        <>
          {object.title && (
            <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.03em', lineHeight: 1.4 }}>
              {object.title}
            </div>
          )}
          {object.desc && (
            <div style={{ marginTop: 6, fontSize: 11, opacity: 0.7, lineHeight: 1.5 }}>
              {object.desc}
            </div>
          )}
        </>
      )
    }
    return null
  }

  const content = resolveContent()

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
        style={{
          position: 'absolute',
          width: cardW,   // <-- use the prop width
          top: 0,
          left: 0,
          pointerEvents: 'none',
          visibility: isActive ? 'visible' : 'hidden',
        }}
      >
        {/* inner container measured for height */}
        <div ref={cardInnerRef}>
          <CardShell side={side} visible={visible}>
            {content}
          </CardShell>
        </div>
      </div>
      {showHint && <Hint show={!visible && !isActive} />}
    </div>
  )
}

export default MetaballCursorOverlay