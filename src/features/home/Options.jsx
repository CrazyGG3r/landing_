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
    if (!active) setImageOpacity(0)
  }, [active])

  const showPreview = useCallback((label) => {
    const nextImage = IMAGE_FOR_LABEL[label]
    setActiveImage((previous) =>
      previous === nextImage ? previous : nextImage,
    )
    setImageOpacity(1)
  }, [])

  const hidePreview = useCallback(() => {
    setImageOpacity(0)
  }, [])

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
              onPointerEnter={() => showPreview(label)}
              onPointerLeave={hidePreview}
              onFocus={() => showPreview(label)}
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
