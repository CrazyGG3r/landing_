import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  DEFAULT_BLOB_CURSOR,
  DEFAULT_EDGE_SHARDS,
  DEFAULT_HALFTONE,
  DEFAULT_INK_SPLASH,
  DEFAULT_INVERSE_IMPACT,
  DEFAULT_PRINT_GRAIN,
  DEFAULT_SPEED_LINES,
  DEFAULT_STARBURST,
  DEFAULT_VHS_NAME_OVERLAY,
} from '../portfolio-test-z/assets/assetDefaults'
import BlobCursor from '../portfolio-test-z/assets/BlobCursor'
import ClickTransition from '../portfolio-test-z/assets/ClickTransition'
import EdgeShards from '../portfolio-test-z/assets/EdgeShards'
import HalftoneField from '../portfolio-test-z/assets/HalftoneField'
import InkSplash from '../portfolio-test-z/assets/InkSplash'
import PrintGrain from '../portfolio-test-z/assets/PrintGrain'
import SpeedLines from '../portfolio-test-z/assets/SpeedLines'
import Starburst from '../portfolio-test-z/assets/Starburst'
import VhsNameOverlay from '../portfolio-test-z/assets/VhsNameOverlay'
import { seededRandom } from '../portfolio-test-z/assets/assetUtils'
import '../portfolio-test-z/portfolio-test.css'
import '../portfolio-test-z/assets/procedural-assets.css'
import './portfolioVhsExperience.css'

const randomInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min
const pointInPolygon = (x, y, polygon) => {
  if (!polygon?.length) return false
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const a = polygon[i]
    const b = polygon[j]
    if (((a.y > y) !== (b.y > y)) && x < ((b.x - a.x) * (y - a.y)) / ((b.y - a.y) || 1e-6) + a.x) inside = !inside
  }
  return inside
}

function VhsImpactCursor({ active, textActive, subscribePointer, config = DEFAULT_INVERSE_IMPACT }) {
  const rootRef = useRef(null)
  const blobRef = useRef(null)
  const activeRef = useRef(active)
  const configRef = useRef(config)
  const wakeRef = useRef(() => {})
  const [textVisible, setTextVisible] = useState(false)
  activeRef.current = active
  configRef.current = config

  useEffect(() => {
    wakeRef.current()
  }, [active])

  useEffect(() => {
    const pointer = { x: -1000, y: -1000 }
    const state = { x: -1000, y: -1000, vx: 0, vy: 0, strength: 0 }
    let frame = 0
    let running = false
    let previous = performance.now()

    const move = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      if (activeRef.current || state.strength > 0.001) schedule()
    }

    const render = (time) => {
      const current = configRef.current
      const delta = Math.min(34, Math.max(6, time - previous))
      previous = time
      const frameScale = delta / 16.667
      const spring = Math.min(0.54, current.response * 0.0125 * frameScale)
      state.vx = (state.vx + (pointer.x - state.x) * spring) * Math.pow(0.64, frameScale)
      state.vy = (state.vy + (pointer.y - state.y) * spring) * Math.pow(0.64, frameScale)
      state.x += state.vx * frameScale
      state.y += state.vy * frameScale
      const target = activeRef.current ? current.opacity : 0
      state.strength += (target - state.strength) * (1 - Math.exp(-delta / 105))

      const normalized = current.opacity > 0.001
        ? Math.max(0, Math.min(1, state.strength / current.opacity))
        : 0
      const back = normalized - 1
      const revealScale = normalized <= 0.001
        ? 0
        : 1 + 2.70158 * back ** 3 + 1.70158 * back ** 2
      const phase = current.paused ? 0 : time * 0.001
      const radius = current.size * revealScale * (1 + Math.sin(phase * 2.15) * current.breath)
      const spread = radius * (0.72 - current.attraction * 0.38)
      const positions = [
        [state.x, state.y, radius * 1.04, radius * 0.86],
        [state.x + Math.cos(phase * 1.17) * spread, state.y + Math.sin(phase * 1.43) * spread, radius * 0.51, radius * 0.4],
        [state.x + Math.cos(phase * 1.31 + 2.3) * spread, state.y + Math.sin(phase * 1.09 + 2.3) * spread, radius * 0.41, radius * 0.48],
      ]
      if (blobRef.current) {
        positions.forEach(([cx, cy, rx, ry], index) => {
          blobRef.current.style.setProperty(`--impact-${index}-x`, `${cx}px`)
          blobRef.current.style.setProperty(`--impact-${index}-y`, `${cy}px`)
          blobRef.current.style.setProperty(`--impact-${index}-rx`, `${Math.max(0, rx)}px`)
          blobRef.current.style.setProperty(`--impact-${index}-ry`, `${Math.max(0, ry)}px`)
        })
        blobRef.current.style.opacity = state.strength.toFixed(3)
      }
      rootRef.current?.style.setProperty('--impact-x', `${state.x}px`)
      rootRef.current?.style.setProperty('--impact-y', `${state.y}px`)

      if (!activeRef.current && state.strength < 0.001) {
        if (blobRef.current) blobRef.current.style.opacity = '0'
        running = false
        return
      }
      frame = window.requestAnimationFrame(render)
    }
    function schedule() {
      if (running) return
      running = true
      previous = performance.now()
      frame = window.requestAnimationFrame(render)
    }

    wakeRef.current = schedule
    const unsubscribe = subscribePointer(move)
    schedule()
    return () => {
      wakeRef.current = () => {}
      unsubscribe?.()
      window.cancelAnimationFrame(frame)
    }
  }, [subscribePointer])

  useEffect(() => {
    if (!textActive) {
      setTextVisible(false)
      return undefined
    }
    let interval = 0
    const entrance = window.setTimeout(() => {
      setTextVisible(true)
      interval = window.setInterval(() => setTextVisible((visible) => !visible), 2000)
    }, 2000)
    return () => {
      window.clearTimeout(entrance)
      window.clearInterval(interval)
    }
  }, [textActive])

  return (
    <div ref={rootRef} className="portfolio-vhs-impact" data-active={active ? 'true' : 'false'} aria-hidden="true">
      <div ref={blobRef} className="portfolio-vhs-impact__blob" />
      <div className="portfolio-vhs-impact__prompt-layer">
        <span className="portfolio-vhs-impact__prompt" data-visible={textVisible && textActive ? 'true' : 'false'}>
          <span>Click</span><span>To</span><span>View</span>
        </span>
      </div>
    </div>
  )
}

const PortfolioVhsExperience = forwardRef(function PortfolioVhsExperience({
  objects,
  stateRef,
  vhsControllerRef,
  holdActiveIdRef,
  rootRef,
}, ref) {
  const vhsCenterRef = useRef({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 })
  const vhsBoundsRef = useRef({ width: 1, height: 1 })
  const vhsPolygonRef = useRef([])
  const vhsRegionsRef = useRef([])
  const vhsParallaxRef = useRef({ x: 0, y: 0 })
  const pointerRef = useRef({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 })
  const pointerSubscribersRef = useRef(new Set())
  const scrollImpactLockedRef = useRef(false)
  const clickResolveRef = useRef(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [vhsHovered, setVhsHovered] = useState(false)
  const [hoverSettled, setHoverSettled] = useState(false)
  const [overlayHovered, setOverlayHovered] = useState(false)
  const [pointerOverVhs, setPointerOverVhs] = useState(false)
  const [scrollImpactLocked, setScrollImpactLocked] = useState(false)
  const [hasHovered, setHasHovered] = useState(false)
  const [replayKey, setReplayKey] = useState(0)
  const [seed, setSeed] = useState(() => (Date.now() ^ 0x6d2b79f5) >>> 0)
  const [clickActive, setClickActive] = useState(false)
  const [clickOrigin, setClickOrigin] = useState(() => ({ ...vhsCenterRef.current }))

  const project = objects[activeIndex]?.project ?? objects[0]?.project ?? {
    id: '01', title: 'Archive', type: 'Interaction', accent: '#f01924', support: '#ffe600', tags: [], detail: '', detailImage: null,
  }
  const procedural = useMemo(() => {
    const random = seededRandom(seed)
    return {
      edgeShards: { ...DEFAULT_EDGE_SHARDS, seed: randomInt(random, 1, 0x7fffffff) },
      starburst: { ...DEFAULT_STARBURST, seed: randomInt(random, 1, 0x7fffffff), spikes: randomInt(random, 16, 24), loop: false },
      speedLines: { ...DEFAULT_SPEED_LINES, seed: randomInt(random, 1, 0x7fffffff), count: randomInt(random, 48, 64), loop: false },
      inkSplash: { ...DEFAULT_INK_SPLASH, seed: randomInt(random, 1, 0x7fffffff), droplets: randomInt(random, 35, 50), loop: false },
      halftone: { ...DEFAULT_HALFTONE, loop: false },
    }
  }, [seed])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    root.style.setProperty('--accent', project.accent)
    root.style.setProperty('--support', project.support)
  }, [project.accent, project.support, rootRef])

  const subscribePointer = useCallback((listener) => {
    pointerSubscribersRef.current.add(listener)
    return () => pointerSubscribersRef.current.delete(listener)
  }, [])

  const isPointerOverVhs = useCallback((x, y) => {
    return pointInPolygon(x, y, vhsPolygonRef.current)
  }, [])

  useEffect(() => {
    const lockImpactOnScroll = () => {
      if (!hoverSettled || !pointerOverVhs || clickActive) return
      scrollImpactLockedRef.current = true
      setScrollImpactLocked(true)
      holdActiveIdRef.current = activeIndexRef.current + 1
    }
    window.addEventListener('wheel', lockImpactOnScroll, { passive: true, capture: true })
    return () => window.removeEventListener('wheel', lockImpactOnScroll, { capture: true })
  }, [clickActive, holdActiveIdRef, hoverSettled, pointerOverVhs])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const parallax = { x: 0, y: 0 }
    let frame = 0
    let lastId = 0
    let lastSettled = false
    let lastPointerInside = false

    const handlePointerMove = (event) => {
      const previousPointer = pointerRef.current
      if (
        scrollImpactLockedRef.current
        && Math.hypot(event.clientX - previousPointer.x, event.clientY - previousPointer.y) > 3
      ) {
        scrollImpactLockedRef.current = false
        setScrollImpactLocked(false)
        if (!overlayHovered) holdActiveIdRef.current = 0
      }
      pointerRef.current = { x: event.clientX, y: event.clientY }
      root.style.setProperty('--pointer-x', `${event.clientX}px`)
      root.style.setProperty('--pointer-y', `${event.clientY}px`)
      pointerSubscribersRef.current.forEach((listener) => listener(event))
    }

    const update = () => {
      const currentId = stateRef.current?.cs?.activeId ?? 0
      if (currentId > 0 && currentId !== lastId) {
        lastId = currentId
        activeIndexRef.current = currentId - 1
        setActiveIndex(currentId - 1)
        setVhsHovered(true)
        setHasHovered(true)
        setReplayKey((value) => value + 1)
        setSeed((value) => (Math.imul(value, 1664525) + 1013904223) >>> 0)
      } else if (currentId === 0 && lastId !== 0 && !overlayHovered && !clickActive) {
        lastId = 0
        setVhsHovered(false)
        setHoverSettled(false)
      }

      const displayIndex = currentId > 0 ? currentId - 1 : activeIndexRef.current
      const projection = stateRef.current?.pipeline?.smoothProj?.[displayIndex]
      const canvas = stateRef.current?.pipeline?.domElement
      if (projection?.init && canvas) {
        const rect = canvas.getBoundingClientRect()
        // The renderer may deliberately run below device pixel ratio. Convert
        // from its actual drawing buffer into CSS viewport coordinates rather
        // than assuming gl.pixelRatio still describes that relationship.
        const scaleX = rect.width / Math.max(1, canvas.width)
        const scaleY = rect.height / Math.max(1, canvas.height)
        const center = {
          x: rect.left + projection.cx * scaleX,
          y: rect.top + projection.cy * scaleY,
        }
        const width = projection.w * scaleX
        const height = projection.h * scaleY
        const polygon = (projection.polygon ?? []).map((point) => ({
          x: rect.left + point.x * scaleX,
          y: rect.top + point.y * scaleY,
        }))
        const regions = (projection.regions ?? []).map((region) => region.map((point) => ({
          x: rect.left + point.x * scaleX,
          y: rect.top + point.y * scaleY,
        })))
        vhsCenterRef.current = center
        vhsBoundsRef.current = { width, height }
        vhsPolygonRef.current = polygon
        vhsRegionsRef.current = regions
        root.style.setProperty('--vhs-center-x', `${center.x.toFixed(2)}px`)
        root.style.setProperty('--vhs-center-y', `${center.y.toFixed(2)}px`)
        root.style.setProperty('--vhs-bound-left', `${(center.x - width * 0.5).toFixed(2)}px`)
        root.style.setProperty('--vhs-bound-top', `${(center.y - height * 0.5).toFixed(2)}px`)
        root.style.setProperty('--vhs-anchor-right-x', `${(center.x + width * 0.5).toFixed(2)}px`)
        root.style.setProperty('--vhs-anchor-bottom-y', `${(center.y + height * 0.5).toFixed(2)}px`)
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const overlayWidth = Math.min(Math.max(1, viewportWidth - 40), 920)
        const overlayHeight = Math.min(245, Math.max(180, viewportWidth * 0.22))
        const overlap = Math.min(140, Math.max(76, width * 0.16))
        const overlayLeft = Math.max(
          20,
          Math.min(viewportWidth - overlayWidth - 20, center.x + width * 0.5 - overlap),
        )
        const overlayBottom = Math.max(
          28,
          Math.min(
            viewportHeight - overlayHeight - 20,
            viewportHeight - (center.y + height * 0.16 + overlayHeight * 0.5),
          ),
        )
        root.style.setProperty('--vhs-overlay-right', `${Math.max(20, viewportWidth - overlayWidth - overlayLeft).toFixed(2)}px`)
        root.style.setProperty('--vhs-overlay-bottom', `${overlayBottom.toFixed(2)}px`)
        if (regions.length > 0) {
          const path = regions
            .filter((region) => region.length >= 3)
            .map((region) => `M ${region.map(({ x, y }) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(' L ')} Z`)
            .join(' ')
          if (path) root.style.setProperty('--vhs-screen-clip', `path("${path}")`)
        } else if (polygon.length >= 3) {
          root.style.setProperty('--vhs-screen-clip', `polygon(${polygon.map(({ x, y }) => `${x.toFixed(2)}px ${y.toFixed(2)}px`).join(', ')})`)
        }
      }

      const settled = currentId > 0 && Boolean(vhsControllerRef.current?.isHoverSettled?.(currentId - 1))
      if (settled !== lastSettled) {
        lastSettled = settled
        setHoverSettled(settled)
      }
      // Use the stable outer VHS hull for interaction. The finer per-mesh regions
      // remain the visual clip, so the impact cannot paint beyond the VHS itself.
      const inside = currentId > 0 && pointInPolygon(
        pointerRef.current.x,
        pointerRef.current.y,
        vhsPolygonRef.current,
      )
      if (inside !== lastPointerInside) {
        lastPointerInside = inside
        setPointerOverVhs(inside)
      }

      const active = currentId > 0 || overlayHovered || clickActive
      const center = vhsCenterRef.current
      const bounds = vhsBoundsRef.current
      const normalizedX = active ? Math.max(-1, Math.min(1, (pointerRef.current.x - center.x) / Math.max(1, bounds.width * 0.26))) : 0
      const normalizedY = active ? Math.max(-1, Math.min(1, (pointerRef.current.y - center.y) / Math.max(1, bounds.height * 0.26))) : 0
      const targetX = normalizedX * 26
      const targetY = normalizedY * 18
      parallax.x += (targetX - parallax.x) * 0.13
      parallax.y += (targetY - parallax.y) * 0.13
      vhsParallaxRef.current = { ...parallax }
      root.style.setProperty('--vhs-parallax-near-x', `${parallax.x.toFixed(2)}px`)
      root.style.setProperty('--vhs-parallax-near-y', `${parallax.y.toFixed(2)}px`)
      root.style.setProperty('--vhs-parallax-mid-x', `${(-parallax.x * 0.56).toFixed(2)}px`)
      root.style.setProperty('--vhs-parallax-mid-y', `${(-parallax.y * 0.56).toFixed(2)}px`)
      root.style.setProperty('--vhs-parallax-far-x', `${(-parallax.x * 0.3).toFixed(2)}px`)
      root.style.setProperty('--vhs-parallax-far-y', `${(-parallax.y * 0.3).toFixed(2)}px`)
      frame = window.requestAnimationFrame(update)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    frame = window.requestAnimationFrame(update)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [clickActive, holdActiveIdRef, objects, overlayHovered, rootRef, stateRef, vhsControllerRef])

  const handleOverlayHover = useCallback((hovered) => {
    setOverlayHovered(hovered)
    holdActiveIdRef.current = hovered || scrollImpactLockedRef.current
      ? activeIndexRef.current + 1
      : 0
  }, [holdActiveIdRef])

  const startClick = useCallback((index = activeIndexRef.current) => {
    if (clickActive) return Promise.resolve()
    scrollImpactLockedRef.current = false
    setScrollImpactLocked(false)
    activeIndexRef.current = index
    setActiveIndex(index)
    setClickOrigin({ ...vhsCenterRef.current })
    setOverlayHovered(false)
    holdActiveIdRef.current = index + 1
    setClickActive(true)
    return new Promise((resolve) => { clickResolveRef.current = resolve })
  }, [clickActive, holdActiveIdRef])

  useImperativeHandle(ref, () => ({ beginClick: startClick }), [startClick])

  const finishClick = useCallback(() => {
    clickResolveRef.current?.()
    clickResolveRef.current = null
  }, [])
  const startVhsMotion = useCallback(() => {
    vhsControllerRef.current?.playClick?.(activeIndexRef.current)
  }, [vhsControllerRef])
  const startWhiteMask = useCallback(() => {
    vhsControllerRef.current?.startWhiteMask?.(activeIndexRef.current, vhsCenterRef.current)
  }, [vhsControllerRef])

  const interactionActive = vhsHovered || overlayHovered || clickActive
  const state = clickActive ? 'retreating' : interactionActive ? 'active' : hasHovered ? 'retreating' : 'idle'
  const impactActive = hoverSettled && interactionActive && !clickActive
  const impactPointerActive = pointerOverVhs || scrollImpactLocked
  const replay = `${activeIndex}-${replayKey}`

  return (
    <>
      <div className="portfolio-vhs-effects" data-clicking={clickActive ? 'true' : 'false'} aria-hidden="true">
        <div className="comic-background">
          <BlobCursor config={DEFAULT_BLOB_CURSOR} active={interactionActive} vhsCenterRef={vhsCenterRef} vhsParallaxRef={vhsParallaxRef} subscribePointer={subscribePointer} />
          <div className="vhs-effect-reveal vhs-effect-reveal--speed" data-state={state}>
            <SpeedLines key={`speed-${replay}`} config={procedural.speedLines} replayKey={replay} className="speed-field" />
          </div>
          <div className="vhs-effect-reveal vhs-effect-reveal--splash" data-state={state}>
            <InkSplash config={procedural.inkSplash} replayKey={replay} className="comic-background__splash" />
          </div>
        </div>
        <div className="vhs-effect-reveal vhs-effect-reveal--halftone" data-state={state}>
          <HalftoneField config={procedural.halftone} replayKey={replay} originRef={vhsCenterRef} state={state} className="comic-halftone" />
        </div>
        <div className="vhs-effect-reveal vhs-effect-reveal--starburst" data-state={state}>
          <div key={`burst-${replay}`} className="comic-starburst-layer">
            <Starburst config={procedural.starburst} accent={project.accent} support={project.support} replayKey={replay} className="comic-burst" />
          </div>
        </div>
        <ClickTransition active={clickActive} origin={clickOrigin} color={project.accent} onVhsMotionStart={startVhsMotion} onWhiteMaskStart={startWhiteMask} onComplete={finishClick} />
      </div>

      <VhsImpactCursor config={DEFAULT_INVERSE_IMPACT} active={impactActive && impactPointerActive} textActive={impactActive && impactPointerActive} subscribePointer={subscribePointer} />
      <VhsNameOverlay project={project} state={state} replayKey={replayKey} config={DEFAULT_VHS_NAME_OVERLAY} impactConfig={DEFAULT_INVERSE_IMPACT} impactActive={impactActive && overlayHovered} vhsHovered={vhsHovered} isPointerOverVhs={isPointerOverVhs} subscribePointer={subscribePointer} onHoverChange={handleOverlayHover} />
      <div className="viewport-edge viewport-edge--top"><EdgeShards config={procedural.edgeShards} active={interactionActive} replayKey={replay} edge="bottom" /></div>
      <div className="viewport-edge viewport-edge--bottom"><EdgeShards config={procedural.edgeShards} active={interactionActive} replayKey={replay} edge="top" /></div>
      <PrintGrain config={{ ...DEFAULT_PRINT_GRAIN, loop: true, paused: false }} replayKey={0} className="comic-lab__grain" />
    </>
  )
})

export default PortfolioVhsExperience
