import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FONT_LETTERBOX_TITLE } from './core/constants'
import FaultyTerminal from './components/FaultyTerminal'
import WebGLErrorBoundary from './components/WebGLErrorBoundary'
import { useDeadZonesFromRefs } from './core/useDeadZonesFromRefs'
import { warmRoute } from '../../shared/performance/routePreloader'
import './Options.css'

const IMAGE_FOR_LABEL = Object.freeze({
  Portfolio: '/images/banners/options/portfolio.jpg',
  About: '/images/banners/options/about.jpg',
  News: '/images/banners/options/news.jpg',
  Contact: '/images/banners/options/contact.jpg',
})
const OPTION_IMAGE_URLS = Object.freeze(Object.values(IMAGE_FOR_LABEL))
const EMPTY_IMAGE_URLS = Object.freeze([])

const LINKS = Object.freeze([
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'About', path: '/about' },
  { label: 'News', path: '/news' },
  { label: 'Contact', path: '/contact' },
])

function warmLink(path) {
  if (path !== '/portfolio') return
  void warmRoute(path, { includeAssets: true, intent: true })
}

const Options = memo(function Options({
  logoSlotRef,
  rootRef,
  active,
  prepared = active,
  onTerminalReady,
  onHoverTarget,
  effectsIntensity = 1,
  emissionFlickerIntensity = 0.6,
  emissionFlickerFrequency = 1,
  cornerBloomIntensity = 0.65,
  cornerBloomEmission = 0.55,
  cornerBloomColor = '#d8eeff',
  lensBlurIntensity = 1,
  lensBlurRange = 0.24,
  lensChromaticIntensity = 1,
  lensChromaticRange = 0.24,
}) {
  const containerRef = useRef(null)
  const portfolioRef = useRef(null)
  const aboutRef = useRef(null)
  const newsRef = useRef(null)
  const contactRef = useRef(null)
  const linkRefs = useMemo(
    () => ({
      Portfolio: portfolioRef,
      About: aboutRef,
      News: newsRef,
      Contact: contactRef,
    }),
    [],
  )
  const deadZoneRefs = useMemo(() => Object.values(linkRefs), [linkRefs])

  const [activeImage, setActiveImage] = useState(null)
  const [imageOpacity, setImageOpacity] = useState(0)

  const deadZones = useDeadZonesFromRefs(
    containerRef,
    deadZoneRefs,
    prepared,
  )

  const setRootRef = useCallback(
    (node) => {
      containerRef.current = node
      if (rootRef) rootRef.current = node
    },
    [rootRef],
  )

  useEffect(() => {
    if (!active) {
      setImageOpacity(0)
      onHoverTarget?.('default')
    }
  }, [active, onHoverTarget])

  const showPreview = useCallback((label) => {
    const nextImage = IMAGE_FOR_LABEL[label]
    setActiveImage((previous) =>
      previous === nextImage ? previous : nextImage,
    )
    setImageOpacity(1)
    onHoverTarget?.(label)
  }, [onHoverTarget])

  const hidePreview = useCallback(() => {
    setImageOpacity(0)
    onHoverTarget?.('default')
  }, [onHoverTarget])

  const preloadUrls = prepared ? OPTION_IMAGE_URLS : EMPTY_IMAGE_URLS

  return (
    <div
      ref={setRootRef}
      className="options-root"
      aria-hidden={!active}
      inert={active ? undefined : ''}
      style={{
        background: active ? '#000' : 'transparent',
        pointerEvents: active ? 'auto' : 'none',
        opacity: active ? 1 : 0,
      }}
    >
      {prepared && (
        <WebGLErrorBoundary>
          <FaultyTerminal
            pause={!active}
            mouseReact={active}
            onReady={onTerminalReady}
            effectsIntensity={effectsIntensity}
            emissionFlickerIntensity={emissionFlickerIntensity}
            emissionFlickerFrequency={emissionFlickerFrequency}
            cornerBloomIntensity={cornerBloomIntensity}
            cornerBloomEmission={cornerBloomEmission}
            cornerBloomColor={cornerBloomColor}
            lensBlurIntensity={lensBlurIntensity}
            lensBlurRange={lensBlurRange}
            lensChromaticIntensity={lensChromaticIntensity}
            lensChromaticRange={lensChromaticRange}
            deadZones={deadZones}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
            }}
            imageUrl={activeImage}
            imageOpacity={imageOpacity}
            preloadUrls={preloadUrls}
          />
        </WebGLErrorBoundary>
      )}

      <div className="options-layout">
        <div ref={logoSlotRef} className="options-logo-slot" />

        <nav className="options-nav" aria-label="Main sections">
          {LINKS.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className="options-link"
              data-cursor-target="options"
              data-cursor-label={label}
              tabIndex={active ? 0 : -1}
              style={{ fontFamily: FONT_LETTERBOX_TITLE }}
              onPointerEnter={() => {
                showPreview(label)
                warmLink(path)
              }}
              onPointerLeave={hidePreview}
              onFocus={() => {
                showPreview(label)
                warmLink(path)
              }}
              onBlur={hidePreview}
              onPointerDown={() => warmLink(path)}
            >
              <span ref={linkRefs[label]}>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
})

export default Options
