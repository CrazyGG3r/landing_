import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FONT_LETTERBOX_TITLE } from './core/constants';
import FaultyTerminal, { useDeadZonesFromRefs } from './components/FaultyTerminal';

const Options = memo(function Options({ logoSlotRef, rootRef, active }) {
  const containerRef = useRef(null);
  const portfolioRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
  const [imageOpacity, setImageOpacity] = useState(0);

  const deadZones = useDeadZonesFromRefs(containerRef, [portfolioRef, aboutRef, contactRef]);

  const setRootRef = useCallback(node => {
    containerRef.current = node;
    if (rootRef) rootRef.current = node;
  }, [rootRef]);

  useEffect(() => {
    if (!active) setImageOpacity(0);
  }, [active]);

  const imageForLabel = useMemo(() => ({
    Portfolio: '/assets/images/banners/NGE.jpg',
    About: '/assets/images/banners/NGE.jpg',
    Contact: '/assets/images/banners/NGE.jpg',
  }), []);
  const preloadUrls = useMemo(() => Object.values(imageForLabel), [imageForLabel]);

  return (
    <div
      ref={setRootRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 6,
        background: active ? '#000' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: active ? 'auto' : 'none',
        opacity: active ? 1 : 0,
        overflow: 'hidden',
      }}>
      <FaultyTerminal
        pause={!active}
        mouseReact={active}
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
      <div style={{
        width: 'min(1200px, 92vw)',
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(24px, 6vw, 90px)',
        position: 'relative',
        zIndex: 3,
      }}>
        <div
          ref={logoSlotRef}
          style={{
            width: 'clamp(90px, 18vh, 220px)',
            height: 'clamp(90px, 18vh, 220px)',
            flex: '0 0 auto',
          }}
        />
        <nav style={{
          display: 'flex',
          gap: 'clamp(18px, 4vw, 64px)',
          alignItems: 'center',
          pointerEvents: 'auto',
        }}>
          {[
            { label: 'Portfolio', ref: portfolioRef },
            { label: 'About', ref: aboutRef },
            { label: 'Contact', ref: contactRef },
          ].map(({ label, ref }) => (
            <a
              key={label}
              href="#"
              className="options-link"
              data-cursor-target="options"
              data-cursor-label={label}
              style={{
                fontFamily: FONT_LETTERBOX_TITLE,
                fontSize: 'clamp(12px, 1.6vw, 16px)',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(230, 235, 245, 0.8)',
                textDecoration: 'none',
                transition: 'color 0.25s ease, text-shadow 0.25s ease',
                cursor: 'pointer',
                display: 'inline-flex',
                position: 'relative',
                zIndex: 20,
                pointerEvents: 'auto',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,1)';
                e.currentTarget.style.textShadow = '0 0 10px rgba(180,220,255,0.45)';
                const nextImage = imageForLabel[label];
                setActiveImage((prev) => (prev === nextImage ? prev : nextImage));
                setImageOpacity(1);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(230, 235, 245, 0.8)';
                e.currentTarget.style.textShadow = 'none';
                setImageOpacity(0);
              }}
            >
              <span ref={ref}>{label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
});

export default Options;
