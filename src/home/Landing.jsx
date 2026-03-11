/**
 * Landing.jsx
 * ─────────────────────────────────────────────────────────────────
 * Drop-in cinematic scene for Create React App with Preloader and TargetCursor
 * ─────────────────────────────────────────────────────────────────
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import BLMelodyBold from '../assets/fonts/BLMelody-Bold.otf';
import BLMelodyExtraLight from '../assets/fonts/BLMelody-ExtraLight.otf';
import BLMelodyMonoBold from '../assets/fonts/BLMelodyMono-Bold.otf';
import BLMelodyMonoExtraLight from '../assets/fonts/BLMelodyMono-ExtraLight.otf';
import TRTCENZOExtraBold from '../assets/fonts/TRTCENZODEMO-ExtraBold.ttf';
import { FINAL_BLUR_MAX, FONT_SUBTITLE, FONT_TITLE } from './core/constants';
import { useRefreshOnResize, useViewport } from './core/hooks';
import { MouseProvider } from './core/MouseContext';
import { BacklitText, DynamicShadowText } from './components/TextEffects';
import TitleTarget from './components/TitleTarget';
import Preloader from './components/Preloader';
import ColorBendsGL from './three/ColorBendsGL';
import FluidGlass from './three/FluidGlass';
import Letterboxing from './components/Letterboxing';
import TargetCursor from './components/TargetCursor';

export default function Landing({
  cbColors = ['#ff2929', '#00ff00', '#0000ff'],
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
  const bgCanvasRef = useRef(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [isMobile] = useState(() => {
    const ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
  });
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const { width: viewportWidth, height: viewportHeight } = useViewport();
  const isCompact = viewportWidth < 900 || viewportHeight < 560;
  const isTight = viewportWidth < 680;
  useRefreshOnResize();

  useEffect(() => {
    document.documentElement.style.setProperty('--final-blur', `${FINAL_BLUR_MAX}px`);
    document.documentElement.style.setProperty('--emission', '0');
  }, []);

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
        <style>{`
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
        `}</style>

        <Preloader
          duration={preloaderDuration}
          onLoadComplete={handleLoadComplete}
        />

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

        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,.68) 100%)',
        }} />

        {isCanvasReady && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
            <FluidGlass bgCanvasRef={bgCanvasRef} />
          </div>
        )}

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
          <div style={{ pointerEvents: 'auto', width: '100%' }}>
            <DynamicShadowText level="subtitle" style={{
              fontSize: preTitleFontSize,
              letterSpacing: preTitleLetterSpacing,
              color: 'rgba(255,255,255,0.25)',
              textTransform: 'uppercase',
              marginBottom: 8,
              fontWeight: 300,
              fontFamily: FONT_SUBTITLE,
              display: 'block',
              textAlign: isCompact ? 'center' : 'left',
            }}>
              We present to you
            </DynamicShadowText>

            <TitleTarget>
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
              }}>
                BOLTFORGED
              </DynamicShadowText>
            </TitleTarget>

            <DynamicShadowText level="subtitle" style={{
              fontSize: subtitleFontSize,
              letterSpacing: subtitleLetterSpacing,
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              marginTop: isMobile ? 4 : 8,
              fontWeight: 300,
              fontFamily: FONT_SUBTITLE,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(200,180,255,0.3) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              padding: '0',
              display: 'block',
              textAlign: isCompact ? 'center' : 'left',
            }}>
              House of Creatives
            </DynamicShadowText>
          </div>
        </BacklitText>

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

        <Letterboxing isMobile={isMobile} />

        {sceneLoaded && !isMobile && (
          <TargetCursor
            targetSelector=".title-target"
            spinDuration={5}
            hoverDuration={0.2}
            parallaxOn={true}
            labelText="Click to Proceed"
          />
        )}
      </div>
    </MouseProvider>
  );
}
