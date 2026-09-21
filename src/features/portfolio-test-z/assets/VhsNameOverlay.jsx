import { useEffect, useRef, useState } from 'react'
import { InverseImpactOverlayLayer } from './InverseImpactCursor'

const DOT_COLUMNS = 22
const DOT_ROWS = 13
const HALFTONE_DOTS = Array.from({ length: DOT_COLUMNS * DOT_ROWS }, (_, index) => {
  const column = index % DOT_COLUMNS
  const row = Math.floor(index / DOT_COLUMNS)
  const gain = column / (DOT_COLUMNS - 1)
  return {
    cx: 2.5 + column * 4.75,
    cy: 3.5 + row * 7.8,
    radius: 0.28 + gain * gain * 1.08,
  }
})

const DETAIL_DOT_COLUMNS = 34
const DETAIL_DOT_ROWS = 22
const DETAIL_HALFTONE_DOTS = Array.from({ length: DETAIL_DOT_COLUMNS * DETAIL_DOT_ROWS }, (_, index) => {
  const column = index % DETAIL_DOT_COLUMNS
  const row = Math.floor(index / DETAIL_DOT_COLUMNS)
  const diagonalGain = Math.max(0, Math.min(1, (column / (DETAIL_DOT_COLUMNS - 1)) * 0.78 + (row / (DETAIL_DOT_ROWS - 1)) * 0.22))
  return {
    cx: 1.4 + column * 2.95,
    cy: 1.8 + row * 4.55,
    radius: 0.12 + diagonalGain * diagonalGain * 0.66,
  }
})

const dotsToPath = (dots) => dots.map(({ cx, cy, radius }) => (
  `M${(cx - radius).toFixed(3)} ${cy.toFixed(3)}a${radius.toFixed(3)} ${radius.toFixed(3)} 0 1 0 ${(radius * 2).toFixed(3)} 0a${radius.toFixed(3)} ${radius.toFixed(3)} 0 1 0 -${(radius * 2).toFixed(3)} 0`
)).join('')

const HALFTONE_PATH = dotsToPath(HALFTONE_DOTS)
const DETAIL_HALFTONE_PATH = dotsToPath(DETAIL_HALFTONE_DOTS)

export default function VhsNameOverlay({ project, state = 'idle', replayKey = 0, config, impactConfig, impactActive = false, vhsHovered = false, isPointerOverVhs, subscribePointer, onHoverChange }) {
  const closeTimerRef = useRef(0)
  const impactRegionTimerRef = useRef(0)
  const entranceTimerRef = useRef(0)
  const pointerInsideRef = useRef(false)
  const vhsHoveredRef = useRef(vhsHovered)
  const [detailPhase, setDetailPhase] = useState('closed')
  const [impactRegionsReady, setImpactRegionsReady] = useState(false)
  const [entranceReady, setEntranceReady] = useState(false)
  const frames = Math.max(4, Math.round((config.duration / 1000) * config.fps))
  const tags = (project.tags ?? []).slice(0, 3)

  useEffect(() => {
    vhsHoveredRef.current = vhsHovered
  }, [vhsHovered])

  useEffect(() => () => {
    window.clearTimeout(closeTimerRef.current)
    window.clearTimeout(impactRegionTimerRef.current)
    window.clearTimeout(entranceTimerRef.current)
    onHoverChange?.(false)
  }, [onHoverChange])
  useEffect(() => {
    window.clearTimeout(entranceTimerRef.current)
    setEntranceReady(false)
    if (state !== 'active') return undefined
    entranceTimerRef.current = window.setTimeout(() => {
      setEntranceReady(true)
      if (pointerInsideRef.current) setDetailPhase('open')
    }, config.duration)
    return () => window.clearTimeout(entranceTimerRef.current)
  }, [config.duration, replayKey, state])
  useEffect(() => {
    window.clearTimeout(impactRegionTimerRef.current)
    if (detailPhase !== 'open') {
      setImpactRegionsReady(false)
      return undefined
    }
    impactRegionTimerRef.current = window.setTimeout(() => setImpactRegionsReady(true), 620)
    return () => window.clearTimeout(impactRegionTimerRef.current)
  }, [detailPhase])
  useEffect(() => {
    if (state !== 'idle') return
    window.clearTimeout(closeTimerRef.current)
    setDetailPhase('closed')
    onHoverChange?.(false)
  }, [onHoverChange, state])
  useEffect(() => {
    if (state === 'active' && detailPhase === 'dismissed') setDetailPhase('closed')
  }, [detailPhase, state])

  const openDetails = () => {
    if (state === 'idle') return
    pointerInsideRef.current = true
    window.clearTimeout(closeTimerRef.current)
    onHoverChange?.(true)
    if (!entranceReady) return
    setDetailPhase('open')
  }
  const closeDetails = (event) => {
    pointerInsideRef.current = false
    if (detailPhase === 'closed' || detailPhase === 'settled') {
      onHoverChange?.(false)
      return
    }
    window.clearTimeout(closeTimerRef.current)
    const exitX = event?.clientX ?? -1
    const exitY = event?.clientY ?? -1
    closeTimerRef.current = window.setTimeout(() => {
      const returnedToVhs = vhsHoveredRef.current && isPointerOverVhs?.(exitX, exitY)
      if (returnedToVhs) {
        setDetailPhase('closing')
        closeTimerRef.current = window.setTimeout(() => {
          setDetailPhase('settled')
          onHoverChange?.(false)
        }, 660)
        return
      }

      setDetailPhase('dismissing')
      closeTimerRef.current = window.setTimeout(() => {
        setDetailPhase('dismissed')
        onHoverChange?.(false)
      }, 460)
    }, 90)
  }

  return (
    <div
      key={`${project.id}-${replayKey}`}
      className="vhs-name-overlay"
      data-state={state}
      data-detail={detailPhase}
      style={{
        '--name-duration': `${config.duration}ms`,
        '--name-ease': `steps(${frames}, end)`,
        '--name-scale': Number(config.scale ?? 1) * 0.825,
        '--name-spread': `${config.spread}px`,
      }}
      onPointerEnter={openDetails}
      onPointerLeave={closeDetails}
      aria-hidden="true"
    >
      <div className="vhs-name-overlay__parallax">
        <div className="vhs-name-overlay__shadow" />
        <div className="vhs-name-overlay__rear">
          <svg className="vhs-name-overlay__dots" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <path d={HALFTONE_PATH} />
          </svg>
        </div>
        <span className="vhs-name-overlay__number">{project.id}</span>
        <div className="vhs-name-overlay__detail-field">
          {project.detailImage && <img src={project.detailImage} alt="" draggable="false" />}
          <div className="vhs-name-overlay__detail-color" />
          <svg className="vhs-name-overlay__detail-dots" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <path d={DETAIL_HALFTONE_PATH} />
          </svg>
        </div>
        <div className="vhs-name-overlay__plate">
          <div className="vhs-name-overlay__title-mask">
            <strong>
              <svg className="vhs-name-overlay__title-svg" viewBox="0 0 1000 140" preserveAspectRatio="none" aria-hidden="true">
                <text x="0" y="112" textLength="940" lengthAdjust="spacingAndGlyphs">{project.title}</text>
              </svg>
            </strong>
          </div>
        </div>
        <div className="vhs-name-overlay__detail-copy">
          <small>{project.type}</small>
          <p>{project.detail}</p>
        </div>
        {tags.length > 0 && (
          <div className="vhs-name-overlay__tags" style={{ '--tag-count': tags.length }}>
            {tags.map((tag, index) => (
              <span key={`${tag}-${index}`} style={{ '--tag-index': index, '--tag-out-index': tags.length - 1 - index }}>{tag}</span>
            ))}
          </div>
        )}
        <InverseImpactOverlayLayer config={impactConfig} active={impactActive && impactRegionsReady} subscribePointer={subscribePointer} />
      </div>
    </div>
  )
}
