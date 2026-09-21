import { useEffect } from 'react'

const VHS_MOTION_DELAY = 600
const WHITE_MASK_DELAY = 1200
const COMPLETE_DELAY = 2800

export default function ClickTransition({ active, origin, color, onVhsMotionStart, onWhiteMaskStart, onComplete }) {
  useEffect(() => {
    if (!active) return undefined
    const motionTimer = window.setTimeout(() => onVhsMotionStart?.(), VHS_MOTION_DELAY)
    const whiteTimer = window.setTimeout(() => onWhiteMaskStart?.(), WHITE_MASK_DELAY)
    const completeTimer = window.setTimeout(() => onComplete?.(), COMPLETE_DELAY)
    return () => {
      window.clearTimeout(motionTimer)
      window.clearTimeout(whiteTimer)
      window.clearTimeout(completeTimer)
    }
  }, [active, onComplete, onVhsMotionStart, onWhiteMaskStart])

  if (!active) return null

  const style = {
    '--click-x': `${origin.x}px`,
    '--click-y': `${origin.y}px`,
    '--click-color': color,
  }

  return (
    <div className="vhs-click-transition" style={style} aria-hidden="true">
      <div className="vhs-click-transition__field" />
      <svg className="vhs-click-transition__aperture" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <g className="vhs-click-transition__cross">
          <line className="vhs-click-transition__guide" x1="500" y1="500" x2="500" y2="500">
            <animate attributeName="x2" begin=".46s" dur=".42s" from="500" to="1000" fill="freeze" />
          </line>
          <line className="vhs-click-transition__guide" x1="500" y1="500" x2="500" y2="500">
            <animate attributeName="x2" begin=".46s" dur=".42s" from="500" to="0" fill="freeze" />
          </line>
          <line className="vhs-click-transition__guide" x1="500" y1="500" x2="500" y2="500">
            <animate attributeName="y2" begin=".46s" dur=".42s" from="500" to="1000" fill="freeze" />
          </line>
          <line className="vhs-click-transition__guide" x1="500" y1="500" x2="500" y2="500">
            <animate attributeName="y2" begin=".46s" dur=".42s" from="500" to="0" fill="freeze" />
          </line>
          <path className="vhs-click-transition__bloom" d="M500 0 C500 350 520 458 1000 500 C520 542 500 650 500 1000 C500 650 480 542 0 500 C480 458 500 350 500 0Z">
            <animate
              attributeName="d"
              begin="1.72s"
              dur="0.72s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.22 0.76 0.18 1"
              values="M500 0 C500 350 520 458 1000 500 C520 542 500 650 500 1000 C500 650 480 542 0 500 C480 458 500 350 500 0Z;M0 0 C333 0 667 0 1000 0 C1000 333 1000 667 1000 1000 C667 1000 333 1000 0 1000 C0 667 0 333 0 0Z"
            />
          </path>
        </g>
      </svg>
      <div className="vhs-click-transition__flare" />
      <div className="vhs-click-transition__flare-core" />
    </div>
  )
}
