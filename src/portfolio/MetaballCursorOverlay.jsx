import { useEffect, useState, useRef } from 'react'
import * as THREE from 'three'
import { DEFAULT_CFG } from './MetaballCursor'

// ─── TOOLTIP COMPONENT ───────────────────────────────────────────────────────
function ObjectTooltip({ title, desc, x, y, color, visible, alpha }) {
  const r = Math.round(color.r * 255)
  const g = Math.round(color.g * 255)
  const b = Math.round(color.b * 255)
  return (
    <div style={{
      position: 'absolute', left: x + 28, top: y + 28,
      pointerEvents: 'none', maxWidth: 200,
      opacity: visible ? alpha : 0,
      transform: `translateY(${visible ? 0 : 8}px)`,
      transition: 'opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)',
    }}>
      <div style={{
        display: 'inline-block', width: 18, height: 2, borderRadius: 1,
        background: `rgb(${r},${g},${b})`, marginBottom: 7,
        boxShadow: `0 0 8px rgb(${r},${g},${b})`,
      }} />
      {title && (
        <div style={{ fontSize: 15, fontWeight: 500, color: '#fff', letterSpacing: '0.02em', lineHeight: 1.2, marginBottom: 5 }}>
          {title}
        </div>
      )}
      {desc && (
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55, letterSpacing: '0.01em' }}>
          {desc}
        </div>
      )}
    </div>
  )
}

// ─── DOM OVERLAY ──────────────────────────────────────────────────────────────
export function MetaballCursorOverlay({ objects, stateRef, showHint = true }) {
  const [labelState, setLabelState] = useState({ idx: -1, x: 0, y: 0, visible: false, alpha: 0 })
  const rafRef = useRef(null)
  const lastHovRef = useRef(-1)
  const lastAlphaRef = useRef(0)

  useEffect(() => {
    let running = true

    const tick = () => {
      if (!running) return
      rafRef.current = requestAnimationFrame(tick)

      const { cs, pipeline } = stateRef?.current ?? {}
      if (!cs || !pipeline) return

      const newHov = cs.activeId - 1
      const curAlpha = cs.anchor > 0.01
        ? Math.min(1, (cs.alpha - DEFAULT_CFG.baseAlpha) / (1 - DEFAULT_CFG.baseAlpha))
        : 0

      if (newHov !== lastHovRef.current) {
        lastHovRef.current = newHov
        if (newHov >= 0 && objects?.[newHov]) {
          const s = pipeline.smoothProj[newHov]
          setLabelState({ idx: newHov, x: s.cx, y: s.cy, visible: true, alpha: 0 })
        } else {
          setLabelState(prev => ({ ...prev, visible: false }))
        }
      }

      if (newHov >= 0 && Math.abs(curAlpha - lastAlphaRef.current) > 0.015) {
        lastAlphaRef.current = curAlpha
        setLabelState(prev => prev.visible ? { ...prev, alpha: curAlpha } : prev)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { running = false; cancelAnimationFrame(rafRef.current) }
  }, [objects, stateRef])

  const obj = labelState.idx >= 0 ? objects?.[labelState.idx] : null

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {obj && (
        <ObjectTooltip
          title={obj.title}
          desc={obj.desc}
          x={labelState.x}
          y={labelState.y}
          color={obj.blobColor}
          visible={labelState.visible}
          alpha={labelState.alpha}
        />
      )}
      {showHint && (
        <div style={{
          position: 'absolute', bottom: 14, left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em',
        }}>
          hover any object
        </div>
      )}
    </div>
  )
}

export default MetaballCursorOverlay