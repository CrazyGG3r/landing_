/**
 * Landing.jsx
 * ─────────────────────────────────────────────────────────────────
 * Drop-in cinematic scene for Create React App with Preloader and TargetCursor
 * ─────────────────────────────────────────────────────────────────
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import BLMelodyBold from '/fonts/BLMelody-Bold.otf';
import BLMelodyExtraLight from '/fonts/BLMelody-ExtraLight.otf';
import BLMelodyMonoBold from '/fonts/BLMelodyMono-Bold.otf';
import BLMelodyMonoExtraLight from '/fonts/BLMelodyMono-ExtraLight.otf';
import TRTCENZOExtraBold from '/fonts/TRTCENZODEMO-ExtraBold.ttf';
import { FINAL_BLUR_MAX, FONT_SUBTITLE, FONT_TITLE } from './core/constants';
import { useResizeObserver, useViewport } from './core/hooks';
import { MouseProvider } from './core/MouseContext';
import { BacklitText, DynamicShadowText } from './components/TextEffects';
import TitleTarget from './components/TitleTarget';
import Preloader from './components/Preloader';
import ColorBendsGL from './three/ColorBendsGL';
import FluidGlass from './three/FluidGlass';
import WebGLErrorBoundary from './components/WebGLErrorBoundary';
import Letterboxing from './components/Letterboxing';
import TargetCursor from './components/TargetCursor';
import Options from './Options';
import { getCachedJson, preloadJson } from './core/assetCache';
import { scheduleRouteWarmup } from '../performance/routePreloader';

const DEFAULT_CB_COLORS = ['#ff2929', '#00ff00', '#0000ff'];
const BOLTFORGED_ANIMATION = '/animations/boltforged_alpha.webm';

export default function Landing({
  cbColors = DEFAULT_CB_COLORS,
  cbRotation = 45,
  cbAutoRotate = 1,
  cbSpeed = 0.2,
  cbScale = 1,
  cbFrequency = 1,
  cbWarpStrength = 0,
  cbMouseInfluence = 1,
  cbParallax = 1,
  cbNoise = 0.08,
  preloaderDuration = 3,
}) {
  const readableTextPreset = {
    mixBlendMode: 'normal',
    textShadow: '0 0 2px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.6), 0 0 16px rgba(0,0,0,0.4)',
    // Add a tiny dark stroke effect via -webkit-text-stroke (optional, use sparingly)
    WebkitTextStroke: '0.5px rgba(0,0,0,0.3)',
  };
  const readableGradientPreset = {
    ...readableTextPreset,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(220,200,255,0.8) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
  const bgCanvasRef = useRef(null);
  const logoRef = useRef(null);
  const landingLogoSlotRef = useRef(null);
  const optionsLogoSlotRef = useRef(null);
  const titleTextRef = useRef(null);
  const letterboxHeaderRef = useRef(null);
  const letterboxFooterRef = useRef(null);
  const lockedLogoSizeRef = useRef(null);
  const optionsRef = useRef(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [scene, setScene] = useState('landing');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showMobileShutter, setShowMobileShutter] = useState(false);
  const [logoSize, setLogoSize] = useState(140);
  const [isMobile] = useState(() => {
    const ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
  });

  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [modelUrl, setModelUrl] = useState(null);
  const { width: viewportWidth, height: viewportHeight } = useViewport();
  const isCompact = viewportWidth < 900 || viewportHeight < 560;
  const isTight = viewportWidth < 680;
  const cssText = useMemo(() => `
          * {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
            user-drag: none;
            -webkit-touch-callout: none;
          }

          .title-target, .decrypt-revealed {
            -webkit-user-select: text;
            -moz-user-select: text;
            -ms-user-select: text;
            user-select: text;
          }

          @font-face {
            font-family: "BL Melody Bold";
            src: url("${BLMelodyBold}") format("opentype");
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "BL Melody ExtraLight";
            src: url("${BLMelodyExtraLight}") format("opentype");
            font-weight: 200;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "BL Melody Mono Bold";
            src: url("${BLMelodyMonoBold}") format("opentype");
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "BL Melody Mono ExtraLight";
            src: url("${BLMelodyMonoExtraLight}") format("opentype");
            font-weight: 200;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "TRTCENZODEMO-ExtraBold";
            src: url("${TRTCENZOExtraBold}") format("truetype");
            font-weight: 800;
            font-style: normal;
            font-display: swap;
          }
          
          :root {
            --final-blur: ${FINAL_BLUR_MAX}px;
            --emission: 0;
          }
          
          .target-cursor-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            pointer-events: none;
            z-index: 10001;
            mix-blend-mode: difference;
            transform: translate(-50%, -50%);
          }

          .target-cursor-dot {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 4px;
            height: 4px;
            background: #fff;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            will-change: transform;
          }

          .target-cursor-corner {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 12px;
            height: 12px;
            border: 3px solid #fff;
            will-change: transform;
          }

          .corner-tl {
            transform: translate(-150%, -150%);
            border-right: none;
            border-bottom: none;
          }

          .corner-tr {
            transform: translate(50%, -150%);
            border-left: none;
            border-bottom: none;
          }

          .corner-br {
            transform: translate(50%, 50%);
            border-left: none;
            border-top: none;
          }

          .corner-bl {
            transform: translate(-150%, 50%);
            border-right: none;
            border-top: none;
          }

          .decrypt-revealed {
            color: inherit;
          }

          .decrypt-encrypted {
            color: rgba(255, 255, 255, 0.28);
          }

          .cursor-hide,
          .cursor-hide * {
            cursor: none !important;
          }
        `, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--final-blur', `${FINAL_BLUR_MAX}px`);
    document.documentElement.style.setProperty('--emission', '0');
  }, []);

  useEffect(() => {
    let cancelled = false;
    const manifestUrl = '/models/manifest.json';
    const pickModel = async () => {
      try {
        await preloadJson([manifestUrl]);
        const manifest = getCachedJson(manifestUrl) || [];
        const files = Array.isArray(manifest) ? manifest : (manifest.files || []);
        if (!files.length) {
          console.warn('Model manifest is empty:', manifestUrl);
          return;
        }
        const chosen = files[Math.floor(Math.random() * files.length)];
        if (!cancelled) setModelUrl(`/models/${chosen}`);
      } catch (err) {
        console.warn('Failed to load model manifest:', err);
      }
    };
    pickModel();
    return () => { cancelled = true; };
  }, []);

  const syncLogoToSlot = useCallback((slotRef) => {
    const logo = logoRef.current;
    const slot = slotRef.current;
    if (!logo || !slot) return;
    const rect = slot.getBoundingClientRect();
    const lockedSize = lockedLogoSizeRef.current;
    const size = lockedSize || Math.min(rect.width, rect.height) || logoSize;
    logo.style.width = `${size}px`;
    logo.style.height = `${size}px`;
    gsap.set(logo, { x: rect.left, y: rect.top });
  }, [logoSize]);

  useResizeObserver(landingLogoSlotRef, () => {
    if (!isTransitioning && scene === 'landing') syncLogoToSlot(landingLogoSlotRef);
  });
  useResizeObserver(optionsLogoSlotRef, () => {
    if (!isTransitioning && scene === 'options') syncLogoToSlot(optionsLogoSlotRef);
  });
  useResizeObserver(titleTextRef, () => {
    if (isTransitioning) return;
    if (!titleTextRef.current) return;
    const rect = titleTextRef.current.getBoundingClientRect();
    const size = Math.max(80, Math.floor(rect.height));
    if (size !== logoSize) setLogoSize(size);
  });

  useEffect(() => {
    if (!isTransitioning && scene === 'landing') syncLogoToSlot(landingLogoSlotRef);
    if (!isTransitioning && scene === 'options') syncLogoToSlot(optionsLogoSlotRef);
  }, [isTransitioning, scene, syncLogoToSlot]);

  useEffect(() => {
    let raf1;
    let raf2;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!isTransitioning && scene === 'landing') syncLogoToSlot(landingLogoSlotRef);
      });
    });
    return () => {
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [isTransitioning, scene, syncLogoToSlot]);

  const setCanvasRef = useCallback((node) => {
    bgCanvasRef.current = node;
    if (node) {
      setTimeout(() => setIsCanvasReady(true), 100);
    }
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const prevOverflow = document.body.style.overflow;
    const prevTouch = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    const preventScroll = e => e.preventDefault();
    window.addEventListener('touchmove', preventScroll, { passive: false });
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouch;
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [isMobile]);

  useEffect(() => {
    const preventZoom = e => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };
    const preventKeys = e => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
        e.preventDefault();
      }
    };
    const preventGesture = e => e.preventDefault();
    window.addEventListener('wheel', preventZoom, { passive: false });
    window.addEventListener('keydown', preventKeys, { passive: false });
    window.addEventListener('gesturestart', preventGesture, { passive: false });
    window.addEventListener('gesturechange', preventGesture, { passive: false });
    window.addEventListener('gestureend', preventGesture, { passive: false });
    return () => {
      window.removeEventListener('wheel', preventZoom);
      window.removeEventListener('keydown', preventKeys);
      window.removeEventListener('gesturestart', preventGesture);
      window.removeEventListener('gesturechange', preventGesture);
      window.removeEventListener('gestureend', preventGesture);
    };
  }, []);

  const handleLoadComplete = useCallback(() => {
    setSceneLoaded(true);
  }, []);

  useEffect(() => {
    if (!sceneLoaded) return undefined;

    // Once the landing page is stable, warm only the portfolio code. Its large
    // 3D assets wait for the options view or explicit navigation intent.
    return scheduleRouteWarmup('/portfolio', {
      includeAssets: false,
      timeoutMs: 1400,
    });
  }, [sceneLoaded]);

  const titleFontSize = isTight
    ? 'clamp(30px, 9.5vw, 64px)'
    : 'clamp(38px, 6vw, 92px)';
  const subtitleFontSize = isTight
    ? 'clamp(11px, 3.6vw, 18px)'
    : 'clamp(12px, 1.6vw, 16px)';
  const preTitleFontSize = isTight
    ? 'clamp(8px, 2.8vw, 12px)'
    : 'clamp(9px, 1.2vw, 12px)';
  const preTitleLetterSpacing = isTight ? '0.32em' : '0.55em';
  const titleLetterSpacing = isTight ? '0.14em' : '0.22em';
  const subtitleLetterSpacing = isTight ? '0.28em' : '0.45em';
  const showLandingText = scene === 'landing' || isTransitioning;
  const preloaderAssets = useMemo(() => ({
    images: ['/images/banners/NGE.jpg'],
    json: ['/models/manifest.json'],
    binary: modelUrl ? [modelUrl] : [],
    preloaders: [],
  }), [modelUrl]);

  const handleTitleClick = useCallback(() => {
    if (isTransitioning || scene !== 'landing') return;
    setIsTransitioning(true);
    if (isMobile) setShowMobileShutter(true);

    const logo = logoRef.current;
    const header = letterboxHeaderRef.current;
    const footer = letterboxFooterRef.current;
    const text = titleTextRef.current;
    if (!logo || !header || !footer || !text) {
      setIsTransitioning(false);
      return;
    }

    const headerRect = header.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const closeHeight = Math.floor(window.innerHeight / 2);
    const headerBaseHeight = Math.max(1, headerRect.height);
    const footerBaseHeight = Math.max(1, footerRect.height);
    const mobileHidden = '12vh';

    if (isMobile) {
      gsap.set(header, { y: `-${mobileHidden}`, height: headerBaseHeight });
      gsap.set(footer, { y: `${mobileHidden}`, height: footerBaseHeight });
    } else {
      gsap.set(header, { y: 0, height: headerBaseHeight });
      gsap.set(footer, { y: 0, height: footerBaseHeight });
    }

    const startRect = landingLogoSlotRef.current.getBoundingClientRect();
    const endRect = optionsLogoSlotRef.current.getBoundingClientRect();
    const size = Math.min(startRect.width, startRect.height) || logoSize;
    lockedLogoSizeRef.current = size;
    const startPos = { x: startRect.left, y: startRect.top };
    const centerPos = {
      x: Math.round(window.innerWidth / 2 - size / 2),
      y: Math.round(window.innerHeight / 2 - size / 2),
    };
    const endPos = { x: endRect.left, y: endRect.top };

    gsap.set(logo, { width: size, height: size, x: startPos.x, y: startPos.y });

    const finishTransition = () => {
      setScene('options');
      gsap.to(logo, { filter: 'drop-shadow(0 0 10px rgba(210,240,255,0.35))', duration: 0.3 });

      const exitTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          lockedLogoSizeRef.current = null;
          setIsTransitioning(false);
          if (isMobile) setShowMobileShutter(false);
        },
      });

      exitTimeline.to(logo, {
        x: endPos.x,
        y: endPos.y,
        duration: 0.7,
      }, 0);
      exitTimeline.to(header, {
        y: isMobile ? `-${mobileHidden}` : 0,
        height: headerBaseHeight,
        duration: 0.7,
      }, 0);
      exitTimeline.to(footer, {
        y: isMobile ? `${mobileHidden}` : 0,
        height: footerBaseHeight,
        duration: 0.7,
      }, 0);
      exitTimeline.add(() => {
        if (optionsRef.current) {
          gsap.to(optionsRef.current, { opacity: 1, duration: 0.6, ease: 'power3.out' });
        }
      }, 0.12);
    };

    const playCenteredAnimation = () => {
      logo.currentTime = 0;
      logo.addEventListener('ended', finishTransition, { once: true });
      const playback = logo.play();
      if (playback) {
        playback.catch(() => {
          logo.removeEventListener('ended', finishTransition);
          finishTransition();
        });
      }
    };

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(header, {
      y: 0,
      height: closeHeight,
      duration: 0.7,
    }, 0);
    tl.to(footer, {
      y: 0,
      height: closeHeight,
      duration: 0.7,
    }, 0);
    tl.to(text, { opacity: 0, duration: 0.6 }, 0);

    tl.to(logo, {
      x: centerPos.x,
      y: centerPos.y,
      duration: 0.7,
    }, 0);

    tl.add(playCenteredAnimation, '+=0.05');
  }, [isTransitioning, isMobile, logoSize, scene]);

  return (
    <MouseProvider>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
        touchAction: 'none',
      }}>
        <style>{cssText}</style>

        <Preloader
          duration={preloaderDuration}
          onLoadComplete={handleLoadComplete}
          assets={preloaderAssets}
        />

        <WebGLErrorBoundary>
          <ColorBendsGL
            ref={setCanvasRef}
            colors={cbColors}
            rotation={cbRotation}
            autoRotate={cbAutoRotate}
            speed={cbSpeed}
            scale={cbScale}
            frequency={cbFrequency}
            warpStrength={cbWarpStrength}
            mouseInfluence={cbMouseInfluence}
            parallax={cbParallax}
            noise={cbNoise}
            transparent
          />
        </WebGLErrorBoundary>

        <video
          ref={logoRef}
          src={BOLTFORGED_ANIMATION}
          aria-label="Boltforged animated logo"
          preload="auto"
          muted
          playsInline
          onLoadedData={(event) => {
            event.currentTarget.pause();
            event.currentTarget.currentTime = 0;
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 10005,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 6px rgba(160,200,255,0.35))',
            willChange: 'transform, filter',
            opacity: 1,
            display: 'block',
          }}
        />

        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,.68) 100%)',
        }} />

        {isCanvasReady && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
            <WebGLErrorBoundary>
              <FluidGlass bgCanvasRef={bgCanvasRef} modelUrl={modelUrl} />
            </WebGLErrorBoundary>
          </div>
        )}

        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: showLandingText ? 'auto' : 'none',
          visibility: showLandingText ? 'visible' : 'hidden',
          opacity: showLandingText ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}>
          <BacklitText style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(1200px, 92vw)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: isCompact ? 'center' : 'flex-start',
            justifyContent: 'center',
            gap: isCompact ? 12 : 24,
            color: 'rgba(255,255,255,1)',
            mixBlendMode: isMobile ? 'normal' : 'screen',
            filter: 'none',
            padding: isCompact ? '0 12px' : '0 24px',
          }}>
            <div style={{
              pointerEvents: 'auto',
              width: '100%',
              display: 'flex',
              flexDirection: isCompact ? 'column' : 'row',
              alignItems: isCompact ? 'center' : 'stretch',
              gap: isCompact ? 16 : 28,
            }}>
              <div
                ref={landingLogoSlotRef}
                style={{
                  width: `${logoSize}px`,
                  height: `${logoSize}px`,
                  aspectRatio: '1 / 1',
                  flex: '0 0 auto',
                }}
              />
              <div
                ref={titleTextRef}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isCompact ? 'center' : 'flex-start',
                  justifyContent: 'center',
                }}
              >
                <DynamicShadowText
                  level="subtitle"
                  style={{
                    fontSize: preTitleFontSize,
                    letterSpacing: preTitleLetterSpacing,
                    color: 'rgba(255,255,255,0.9)',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                    fontWeight: 300,
                    fontFamily: FONT_SUBTITLE,
                    display: 'block',
                    textAlign: isCompact ? 'center' : 'left',
                    ...readableTextPreset,               // <-- modular injection
                  }}
                >
                  We present to you
                </DynamicShadowText>

                <TitleTarget onClick={handleTitleClick}>
                  <DynamicShadowText level="title" style={{
                    fontWeight: 800,
                    fontSize: titleFontSize,
                    letterSpacing: titleLetterSpacing,
                    color: 'rgba(255,255,255,1)',
                    textTransform: 'uppercase',
                    margin: 0,
                    lineHeight: 1.2,
                    fontFamily: FONT_TITLE,
                    display: 'block',
                    textAlign: isCompact ? 'center' : 'left',
                    cursor: 'pointer',
                  }}>
                    BOLTFORGED
                  </DynamicShadowText>
                </TitleTarget>

                <DynamicShadowText
                  level="subtitle"
                  style={{
                    fontSize: subtitleFontSize,
                    letterSpacing: subtitleLetterSpacing,
                    textTransform: 'uppercase',
                    marginTop: isMobile ? 4 : 8,
                    fontWeight: 300,
                    fontFamily: FONT_SUBTITLE,
                    display: 'block',
                    textAlign: isCompact ? 'center' : 'left',
                    ...readableGradientPreset,           // <-- all readability + gradient
                  }}
                >
                  House of Creatives
                </DynamicShadowText>
              </div>
            </div>
          </BacklitText>
        </div>

        {!isMobile && [['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, h]) => (
          <div
            key={v + h}
            style={{
              position: 'absolute', [v]: 24, [h]: 24, width: 22, height: 22, zIndex: 12,
              borderColor: 'rgba(255,255,255,.15)',
              borderStyle: 'solid',
              borderWidth: `${v === 'top' ? 1 : 0}px ${h === 'right' ? 1 : 0}px ${v === 'bottom' ? 1 : 0}px ${h === 'left' ? 1 : 0}px`,
            }}
          />
        ))}

        <Letterboxing
          isMobile={isMobile}
          showOnMobile={showMobileShutter}
          headerRef={letterboxHeaderRef}
          footerRef={letterboxFooterRef}
        />

        <Options
          rootRef={optionsRef}
          logoSlotRef={optionsLogoSlotRef}
          active={scene === 'options'}
        />

        {sceneLoaded && !isMobile && scene === 'landing' && (
          <TargetCursor
            targetSelector=".title-target"
            spinDuration={5}
            hoverDuration={0.2}
            parallaxOn={true}
            labelText="Click to Proceed"
          />
        )}

        {sceneLoaded && !isMobile && scene === 'options' && (
          <TargetCursor
            targetSelector=".options-link"
            spinDuration={5}
            hoverDuration={0.2}
            parallaxOn={true}
            labelText=""
            showCallout={false}
          />
        )}
      </div>
    </MouseProvider>
  );
}
