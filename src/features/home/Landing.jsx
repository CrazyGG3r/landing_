/**
 * Landing.jsx
 * ─────────────────────────────────────────────────────────────────
 * Drop-in cinematic scene for Create React App with Preloader and TargetCursor
 * ─────────────────────────────────────────────────────────────────
 */

import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import BLMelodyBold from '/fonts/BLMelody-Bold.otf';
import BLMelodyExtraLight from '/fonts/BLMelody-ExtraLight.otf';
import BLMelodyMonoBold from '/fonts/BLMelodyMono-Bold.otf';
import BLMelodyMonoExtraLight from '/fonts/BLMelodyMono-ExtraLight.otf';
import TRTCENZOExtraBold from '/fonts/TRTCENZODEMO-ExtraBold.ttf';
import { FINAL_BLUR_DEFAULT, FONT_SUBTITLE, FONT_TITLE } from './core/constants';
import { useCoarsePointer, useResizeObserver, useViewport } from './core/hooks';
import { MouseProvider } from './core/MouseContext';
import { BacklitText, DynamicShadowText } from './components/TextEffects';
import TitleTarget from './components/TitleTarget';
import Preloader from './components/Preloader';
import ColorBendsGL from './three/ColorBendsGL';
import WebGLErrorBoundary from './components/WebGLErrorBoundary';
import Letterboxing from './components/Letterboxing';
import Options from './Options';
import { getCachedJson, preloadJson } from './core/assetCache';
import { scheduleRouteWarmup } from '../../shared/performance/routePreloader';

const DEFAULT_CB_COLORS = ['#ff2929', '#00ff00', '#0000ff'];
const LOGO_PLACEHOLDER = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%230b0d12'/><rect x='26' y='26' width='348' height='348' fill='none' stroke='%23d9e6ff' stroke-width='10'/><circle cx='200' cy='200' r='84' fill='none' stroke='%23d9e6ff' stroke-width='8'/></svg>";
const FluidGlass = lazy(() => import('./three/FluidGlass'));
const TargetCursor = lazy(() => import('./components/TargetCursor'));

let gsapPromise;
function loadGsap() {
  if (!gsapPromise) {
    gsapPromise = import('gsap').then((module) => module.gsap || module.default);
  }
  return gsapPromise;
}

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
  // Shared control for phosphor emission, halo, highlight knee, and crossfade.
  // Supported range: 0 (restrained baseline) to 2 (maximum enhancement).
  terminalEffectsIntensity = 1,
  // Active-phosphor shimmer controls. Intensity: 0..2, frequency: 0..4.
  terminalEmissionFlickerIntensity = 0.6,
  terminalEmissionFlickerFrequency = 1,
  // Active-pixel corner bloom controls. Intensity/emission: 0..2.
  terminalCornerBloomIntensity = 0.65,
  terminalCornerBloomEmission = 0.55,
  terminalCornerBloomColor = '#d8eeff',
  // Lens controls. Intensities: 0..2, ranges: 0.04..0.5.
  terminalLensBlurIntensity = 1,
  terminalLensBlurRange = 0.24,
  terminalLensChromaticIntensity = 1,
  terminalLensChromaticRange = 0.24,
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
  const shimmerRef = useRef(null);
  const transitionTimelineRef = useRef(null);
  const transitionLockRef = useRef(false);
  const terminalReadySignalRef = useRef(null);
  const centerHoldMinTimerRef = useRef(0);
  const centerHoldMaxTimerRef = useRef(0);
  const canvasReadyFrameRef = useRef(0);
  const mountedRef = useRef(true);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [scene, setScene] = useState('landing');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [optionsPrepared, setOptionsPrepared] = useState(false);
  const [showMobileShutter, setShowMobileShutter] = useState(false);
  const [logoSize, setLogoSize] = useState(140);
  const isMobile = useCoarsePointer();

  const [assetsPrepared, setAssetsPrepared] = useState(false);
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

          .landing-root {
            height: 100vh;
          }

          @supports (height: 100dvh) {
            .landing-root {
              height: 100dvh;
            }
          }

          @keyframes boltforged-title-ignite {
            0% {
              opacity: 0;
              transform: translateY(8px) scale(0.965);
              filter: blur(7px) brightness(4);
            }
            45% {
              opacity: 1;
              transform: translateY(0) scale(1.012);
              filter:
                blur(0)
                brightness(3.25)
                drop-shadow(0 0 38px rgba(215, 238, 255, 0.98));
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter:
                blur(0)
                brightness(1)
                drop-shadow(0 0 10px rgba(190, 225, 255, 0.35));
            }
          }

          .landing-title-ignite {
            opacity: 0;
            animation: boltforged-title-ignite 1350ms cubic-bezier(.16, 1, .3, 1) forwards;
            transform-origin: center;
          }

          .landing-scene-stage,
          .landing-logo-stage,
          .landing-support-stage,
          .landing-chrome-stage {
            opacity: 0;
          }

          .landing-scene-stage {
            position: absolute;
            inset: 0;
            transition: opacity 1100ms cubic-bezier(.22, 1, .36, 1);
          }

          .landing-logo-stage {
            transition: opacity 900ms ease, filter 900ms ease;
          }

          .landing-support-stage {
            transform: translateY(5px);
            transition:
              opacity 700ms ease 140ms,
              transform 850ms cubic-bezier(.22, 1, .36, 1) 140ms;
          }

          .landing-support-stage--subtitle {
            transition-delay: 230ms;
          }

          .landing-chrome-stage {
            transition: opacity 850ms ease 280ms;
          }

          .landing-scene-stage.is-visible,
          .landing-logo-stage.is-visible,
          .landing-support-stage.is-visible,
          .landing-chrome-stage.is-visible {
            opacity: 1;
          }

          .landing-support-stage.is-visible {
            transform: translateY(0);
          }

          @media (prefers-reduced-motion: reduce) {
            .landing-title-ignite {
              animation-duration: 240ms;
              animation-timing-function: ease-out;
            }

            .landing-scene-stage,
            .landing-logo-stage,
            .landing-support-stage,
            .landing-chrome-stage {
              transition-duration: 240ms;
              transition-delay: 0ms;
            }

            .landing-support-stage {
              transform: none;
            }
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
            --final-blur: ${FINAL_BLUR_DEFAULT}px;
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
    document.documentElement.style.setProperty('--final-blur', `${FINAL_BLUR_DEFAULT}px`);
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
        const connection =
          navigator.connection ||
          navigator.mozConnection ||
          navigator.webkitConnection;
        const lowPower =
          connection?.saveData ||
          (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
          window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        let storedModel = null;
        try {
          storedModel = sessionStorage.getItem('boltforged:landing-model');
        } catch {
          // Storage can be unavailable in privacy-restricted contexts.
        }
        const preferredLowPowerModel = files.includes('Suzanne.glb')
          ? 'Suzanne.glb'
          : files[0];
        const chosen = files.includes(storedModel)
          ? storedModel
          : lowPower
            ? preferredLowPowerModel
            : files[Math.floor(Math.random() * files.length)];
        try {
          sessionStorage.setItem('boltforged:landing-model', chosen);
        } catch {
          // A stable in-memory choice is still sufficient for this mount.
        }
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
    logo.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
  }, [logoSize]);

  const syncLandingLogo = useCallback(() => {
    if (!isTransitioning && scene === 'landing') syncLogoToSlot(landingLogoSlotRef);
  }, [isTransitioning, scene, syncLogoToSlot]);

  const syncOptionsLogo = useCallback(() => {
    if (!isTransitioning && scene === 'options') syncLogoToSlot(optionsLogoSlotRef);
  }, [isTransitioning, scene, syncLogoToSlot]);

  const syncTitleSize = useCallback(() => {
    if (isTransitioning) return;
    if (!titleTextRef.current) return;
    const rect = titleTextRef.current.getBoundingClientRect();
    const size = Math.max(80, Math.floor(rect.height));
    if (size !== logoSize) setLogoSize(size);
  }, [isTransitioning, logoSize]);

  useResizeObserver(landingLogoSlotRef, syncLandingLogo);
  useResizeObserver(optionsLogoSlotRef, syncOptionsLogo);
  useResizeObserver(titleTextRef, syncTitleSize);

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
    if (canvasReadyFrameRef.current) {
      cancelAnimationFrame(canvasReadyFrameRef.current);
      canvasReadyFrameRef.current = 0;
    }
    if (node) {
      canvasReadyFrameRef.current = requestAnimationFrame(() => {
        canvasReadyFrameRef.current = 0;
        if (mountedRef.current) setIsCanvasReady(true);
      });
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (canvasReadyFrameRef.current) {
        cancelAnimationFrame(canvasReadyFrameRef.current);
        canvasReadyFrameRef.current = 0;
      }
      transitionTimelineRef.current?.kill();
      transitionTimelineRef.current = null;
      transitionLockRef.current = false;
      terminalReadySignalRef.current = null;
      window.clearTimeout(centerHoldMinTimerRef.current);
      window.clearTimeout(centerHoldMaxTimerRef.current);
      shimmerRef.current?.kill();
      shimmerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const prevOverflow = document.body.style.overflow;
    const prevTouch = document.body.style.touchAction;
    const prevOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    document.body.style.overscrollBehavior = 'none';
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouch;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }, [isMobile]);

  const handleLoadComplete = useCallback(() => {
    setAssetsPrepared(true);
  }, []);

  const handleVisualSceneReady = useCallback(() => {
    if (mountedRef.current) setSceneLoaded(true);
  }, []);

  useEffect(() => {
    if (!assetsPrepared || sceneLoaded) return undefined;

    // Never let a blocked model, post-processing import, or lost WebGL context
    // leave the landing chrome hidden indefinitely.
    const fallbackDelay = isCanvasReady && modelUrl ? 4500 : 2200;
    const timer = window.setTimeout(() => {
      if (mountedRef.current) setSceneLoaded(true);
    }, fallbackDelay);

    return () => window.clearTimeout(timer);
  }, [assetsPrepared, isCanvasReady, modelUrl, sceneLoaded]);

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
  const revealLandingScene = sceneLoaded || isTransitioning;
  const preloaderAssets = useMemo(() => ({
    images: [],
    json: ['/models/manifest.json'],
    binary: [],
    preloaders: [],
  }), []);

  const handleTerminalReady = useCallback(() => {
    terminalReadySignalRef.current?.();
  }, []);

  const handleTitleClick = useCallback(async () => {
    if (transitionLockRef.current || isTransitioning || scene !== 'landing') return;
    transitionLockRef.current = true;
    // Direct intent takes priority over the passive reveal gate so an early
    // click can never leave the logo, shutter, or options cursor concealed.
    setSceneLoaded(true);
    setIsTransitioning(true);
    setOptionsPrepared(false);
    terminalReadySignalRef.current = null;
    window.clearTimeout(centerHoldMinTimerRef.current);
    window.clearTimeout(centerHoldMaxTimerRef.current);
    if (isMobile) setShowMobileShutter(true);

    let gsap;
    try {
      gsap = await loadGsap();
    } catch (error) {
      console.warn('Landing transition could not initialize.', error);
      transitionLockRef.current = false;
      if (mountedRef.current) {
        setIsTransitioning(false);
        setShowMobileShutter(false);
      }
      return;
    }
    if (!mountedRef.current) return;

    const logo = logoRef.current;
    const header = letterboxHeaderRef.current;
    const footer = letterboxFooterRef.current;
    const text = titleTextRef.current;
    const landingSlot = landingLogoSlotRef.current;
    const optionsSlot = optionsLogoSlotRef.current;
    if (!logo || !header || !footer || !text || !landingSlot || !optionsSlot) {
      transitionLockRef.current = false;
      setIsTransitioning(false);
      setShowMobileShutter(false);
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

    const startRect = landingSlot.getBoundingClientRect();
    const endRect = optionsSlot.getBoundingClientRect();
    const size = Math.min(startRect.width, startRect.height) || logoSize;
    lockedLogoSizeRef.current = size;
    const startPos = { x: startRect.left, y: startRect.top };
    const centerPos = {
      x: Math.round(window.innerWidth / 2 - size / 2),
      y: Math.round(window.innerHeight / 2 - size / 2),
    };
    const endPos = { x: endRect.left, y: endRect.top };

    gsap.set(logo, { width: size, height: size, x: startPos.x, y: startPos.y });

    transitionTimelineRef.current?.kill();
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        transitionTimelineRef.current = null;
        transitionLockRef.current = false;
        terminalReadySignalRef.current = null;
        window.clearTimeout(centerHoldMinTimerRef.current);
        window.clearTimeout(centerHoldMaxTimerRef.current);
        if (!mountedRef.current) return;
        lockedLogoSizeRef.current = null;
        setIsTransitioning(false);
        if (isMobile) setShowMobileShutter(false);
      },
    });

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

    tl.add(() => {
      if (shimmerRef.current) shimmerRef.current.kill();
      shimmerRef.current = gsap.to(logo, {
        filter: 'drop-shadow(0 0 26px rgba(210,240,255,0.85))',
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      let minimumHoldElapsed = false;
      let terminalReady = false;
      let resumed = false;
      const resumeFromCenter = (force = false) => {
        if (
          resumed ||
          (!force && (
            !minimumHoldElapsed ||
            !terminalReady
          ))
        ) {
          return;
        }
        resumed = true;
        terminalReadySignalRef.current = null;
        window.clearTimeout(centerHoldMinTimerRef.current);
        window.clearTimeout(centerHoldMaxTimerRef.current);
        tl.resume();
      };

      terminalReadySignalRef.current = () => {
        terminalReady = true;
        resumeFromCenter();
      };
      centerHoldMinTimerRef.current = window.setTimeout(() => {
        minimumHoldElapsed = true;
        resumeFromCenter();
      }, 900);
      centerHoldMaxTimerRef.current = window.setTimeout(() => {
        resumeFromCenter(true);
      }, 2800);

      // Commit the expensive operations behind the fully closed shutter:
      // tear down landing WebGL and compile/draw the terminal once.
      setOptionsPrepared(true);
      setScene('options');
    }, '+=0.05');

    tl.addPause();

    tl.add(() => {
      if (shimmerRef.current) {
        shimmerRef.current.kill();
        shimmerRef.current = null;
      }
      gsap.to(logo, { filter: 'drop-shadow(0 0 10px rgba(210,240,255,0.35))', duration: 0.3 });
    });
    tl.to({}, { duration: 0.08 });

    tl.to(logo, {
      x: endPos.x,
      y: endPos.y,
      duration: 0.7,
    }, '<');

    tl.to(header, {
      y: isMobile ? `-${mobileHidden}` : 0,
      height: headerBaseHeight,
      duration: 0.7,
    }, '<');
    tl.to(footer, {
      y: isMobile ? `${mobileHidden}` : 0,
      height: footerBaseHeight,
      duration: 0.7,
    }, '<');

    tl.add(() => {
      if (optionsRef.current) {
        gsap.to(optionsRef.current, { opacity: 1, duration: 0.6, ease: 'power3.out' });
      }
    }, '<+=0.12');
    transitionTimelineRef.current = tl;
  }, [isTransitioning, isMobile, logoSize, scene]);

  return (
    <MouseProvider>
      <div className="landing-root" style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        background: '#000',
        touchAction: 'none',
      }}>
        <style>{cssText}</style>

        <Preloader
          onLoadComplete={handleLoadComplete}
          assets={preloaderAssets}
          maxWaitMs={Math.max(1000, preloaderDuration * 1000)}
        />

        {scene !== 'options' && (
          <div
            className={`landing-scene-stage ${revealLandingScene ? 'is-visible' : ''}`}
            aria-hidden={!revealLandingScene}
          >
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

            <div style={{
              position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
              background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,.68) 100%)',
            }} />

            {isCanvasReady && modelUrl && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
                <WebGLErrorBoundary>
                  <Suspense fallback={null}>
                    <FluidGlass
                      bgCanvasRef={bgCanvasRef}
                      modelUrl={modelUrl}
                      onReady={handleVisualSceneReady}
                    />
                  </Suspense>
                </WebGLErrorBoundary>
              </div>
            )}
          </div>
        )}

        <img
          ref={logoRef}
          className={`landing-logo-stage ${revealLandingScene ? 'is-visible' : ''}`}
          src={LOGO_PLACEHOLDER}
          alt="Boltforged logo placeholder"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 10005,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 6px rgba(160,200,255,0.35))',
            willChange: 'transform, filter',
            display: 'block',
          }}
        />

        {showLandingText && <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'auto',
          visibility: 'visible',
          opacity: 1,
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
                <div className={`landing-support-stage ${revealLandingScene ? 'is-visible' : ''}`}>
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
                      ...readableTextPreset,
                    }}
                  >
                    We present to you
                  </DynamicShadowText>
                </div>

                <TitleTarget
                  className="landing-title-ignite"
                  onClick={handleTitleClick}
                  onPointerEnter={() => void loadGsap()}
                  aria-label="Open site navigation"
                >
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

                <div className={`landing-support-stage landing-support-stage--subtitle ${revealLandingScene ? 'is-visible' : ''}`}>
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
                      ...readableGradientPreset,
                    }}
                  >
                    House of Creatives
                  </DynamicShadowText>
                </div>
              </div>
            </div>
          </BacklitText>
        </div>}

        {!isMobile && [['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, h]) => (
          <div
            key={v + h}
            className={`landing-chrome-stage ${revealLandingScene ? 'is-visible' : ''}`}
            style={{
              position: 'absolute', [v]: 24, [h]: 24, width: 22, height: 22, zIndex: 12,
              borderColor: 'rgba(255,255,255,.15)',
              borderStyle: 'solid',
              borderWidth: `${v === 'top' ? 1 : 0}px ${h === 'right' ? 1 : 0}px ${v === 'bottom' ? 1 : 0}px ${h === 'left' ? 1 : 0}px`,
            }}
          />
        ))}

        <Letterboxing
          className={`landing-chrome-stage ${revealLandingScene ? 'is-visible' : ''}`}
          aria-hidden={!revealLandingScene}
          isMobile={isMobile}
          showOnMobile={showMobileShutter}
          headerRef={letterboxHeaderRef}
          footerRef={letterboxFooterRef}
        />

        <Options
          rootRef={optionsRef}
          logoSlotRef={optionsLogoSlotRef}
          active={scene === 'options'}
          prepared={optionsPrepared || scene === 'options'}
          onTerminalReady={handleTerminalReady}
          effectsIntensity={terminalEffectsIntensity}
          emissionFlickerIntensity={terminalEmissionFlickerIntensity}
          emissionFlickerFrequency={terminalEmissionFlickerFrequency}
          cornerBloomIntensity={terminalCornerBloomIntensity}
          cornerBloomEmission={terminalCornerBloomEmission}
          cornerBloomColor={terminalCornerBloomColor}
          lensBlurIntensity={terminalLensBlurIntensity}
          lensBlurRange={terminalLensBlurRange}
          lensChromaticIntensity={terminalLensChromaticIntensity}
          lensChromaticRange={terminalLensChromaticRange}
        />

        <Suspense fallback={null}>
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
        </Suspense>
      </div>
    </MouseProvider>
  );
}
