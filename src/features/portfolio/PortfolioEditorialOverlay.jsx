import { memo, useEffect, useMemo, useRef, useState } from 'react'
import './portfolio-editorial-overlay.css'

const CHAPTERS = [
  { code: 'Phase 01', title: 'THE ARCHIVE', note: 'OBJECTS / SIGNALS / MEMORY' },
  { code: 'Phase 02', title: 'RECORDED MATTER', note: 'SELECTED WORK / 2024—2026' },
  { code: 'Phase 03', title: 'MAGNETIC FIELD', note: 'IDENTITY / MOTION / SYSTEMS' },
  { code: 'Phase 04', title: 'LOST SIGNAL', note: 'PROCESS / EXPERIMENT / FORM' },
  { code: 'Phase 05', title: 'END OF TAPE', note: 'ENTER A PROJECT TO CONTINUE' },
]

function PortfolioEditorialOverlayInner({ progress = 0, visible = true, stateRef }) {
  const rootRef = useRef(null)
  const [meterHovered, setMeterHovered] = useState(false)
  const clampedProgress = Math.min(1, Math.max(0, progress))
  const chapterIndex = Math.min(
    CHAPTERS.length - 1,
    Math.floor(clampedProgress * CHAPTERS.length),
  )
  const chapter = CHAPTERS[chapterIndex]
  const localProgress = clampedProgress >= 1
    ? 1
    : (clampedProgress * CHAPTERS.length) % 1
  const style = useMemo(() => ({
    '--portfolio-progress': clampedProgress,
    '--chapter-progress': localProgress,
  }), [clampedProgress, localProgress])

  useEffect(() => {
    let frame = 0
    const update = () => {
      const root = rootRef.current
      const focusAmount = stateRef?.current?.cs?.anchor ?? 0
      root?.classList.toggle('is-focusing', focusAmount > 0.025)
      frame = requestAnimationFrame(update)
    }
    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [stateRef])

  return (
    <aside
      ref={rootRef}
      className={`portfolio-editorial ${visible ? 'is-visible' : ''} ${meterHovered ? 'is-meter-hovered' : ''}`}
      style={style}
      aria-hidden="true"
    >
      <div className="portfolio-editorial__bleed portfolio-editorial__bleed--red" />
      <div className="portfolio-editorial__bleed portfolio-editorial__bleed--paper" />

      <div className="portfolio-editorial__rail portfolio-editorial__rail--top">
        <span>BOLTFORGED® / VISUAL ARCHIVE</span>
        <span>PLAYBACK MODE</span>
        <span>{String(chapterIndex + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}</span>
      </div>

      <div className="portfolio-editorial__cross portfolio-editorial__cross--left" />
      <div className="portfolio-editorial__cross portfolio-editorial__cross--right" />

      <div className="portfolio-editorial__chapter" key={chapter.code}>
        <span className="portfolio-editorial__code">{chapter.code}</span>
        <strong>{chapter.title}</strong>
        <span className="portfolio-editorial__note">{chapter.note}</span>
      </div>

      <div
        className="portfolio-editorial__meter"
        onPointerEnter={() => setMeterHovered(true)}
        onPointerLeave={() => setMeterHovered(false)}
        onPointerCancel={() => setMeterHovered(false)}
      >
        <span>TRK</span>
        <div className="portfolio-editorial__meter-track">
          <i style={{ transform: `scaleX(${clampedProgress})` }} />
        </div>
        <span>{Math.round(clampedProgress * 100).toString().padStart(3, '0')}</span>
      </div>

      <div className="portfolio-editorial__rail portfolio-editorial__rail--bottom">
        <span>SCROLL TO SCRUB</span>
        <span className="portfolio-editorial__status"><i /> SIGNAL LOCKED</span>
        <span>16:9 / STEREO</span>
      </div>
    </aside>
  )
}

export default memo(PortfolioEditorialOverlayInner)
