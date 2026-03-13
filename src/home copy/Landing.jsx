/**
 * Landing.jsx
 * ─────────────────────────────────────────────────────────────────
 * Cinematic landing — no shaders, no WebGL.
 * PaperFish swims at z-index 3, text lives at z-index 10+.
 * ─────────────────────────────────────────────────────────────────
 */

import { useCallback, useEffect, useState } from 'react';
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
import Letterboxing from './components/Letterboxing';
import TargetCursor from './components/TargetCursor';
import PaperFish from './components/fish/Fish';
import ChalkStick from '../assets/fonts/Chalk Stick.otf';
import IKarm from './components/arm/IKarm';
import Background from './components/Background/Background';
export default function Landing({
  preloaderDuration = 3,

  // PaperFish config — adjust to match your actual files
  fishFrameCount = 5,
  fishFramePath  = '/anims/fish/',  // → public/anims/fish/fish_001.png etc.
  fishFrameExt   = 'png',
  fishFramePad   = 3,
  fishFps        = 0.75,
  fishCount      = 3,
}) {
  const [isMobile] = useState(() => {
    const ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
  });

  const [sceneLoaded, setSceneLoaded] = useState(false);
  const { width: viewportWidth, height: viewportHeight } = useViewport();
  const isCompact = viewportWidth < 900 || viewportHeight < 560;
  const isTight   = viewportWidth < 680;
  useRefreshOnResize();

  useEffect(() => {
    document.documentElement.style.setProperty('--final-blur', `${FINAL_BLUR_MAX}px`);
    document.documentElement.style.setProperty('--emission', '0');
  }, []);

  // Prevent scroll / zoom
  useEffect(() => {
    if (!isMobile) return;
    const prev = { overflow: document.body.style.overflow, touch: document.body.style.touchAction };
    document.body.style.overflow    = 'hidden';
    document.body.style.touchAction = 'none';
    const block = e => e.preventDefault();
    window.addEventListener('touchmove', block, { passive: false });
    return () => {
      document.body.style.overflow    = prev.overflow;
      document.body.style.touchAction = prev.touch;
      window.removeEventListener('touchmove', block);
    };
  }, [isMobile]);

  useEffect(() => {
    const onWheel   = e => { if (e.ctrlKey || e.metaKey) e.preventDefault(); };
    const onKey     = e => { if ((e.ctrlKey || e.metaKey) && '+-=0'.includes(e.key)) e.preventDefault(); };
    const onGesture = e => e.preventDefault();
    window.addEventListener('wheel',          onWheel,   { passive: false });
    window.addEventListener('keydown',        onKey,     { passive: false });
    window.addEventListener('gesturestart',   onGesture, { passive: false });
    window.addEventListener('gesturechange',  onGesture, { passive: false });
    window.addEventListener('gestureend',     onGesture, { passive: false });
    return () => {
      window.removeEventListener('wheel',         onWheel);
      window.removeEventListener('keydown',       onKey);
      window.removeEventListener('gesturestart',  onGesture);
      window.removeEventListener('gesturechange', onGesture);
      window.removeEventListener('gestureend',    onGesture);
    };
  }, []);

  const handleLoadComplete = useCallback(() => setSceneLoaded(true), []);

  const titleFontSize        = isTight ? 'clamp(30px,9.5vw,64px)' : 'clamp(38px,6vw,92px)';
  const subtitleFontSize     = isTight ? 'clamp(11px,3.6vw,18px)' : 'clamp(12px,1.6vw,16px)';
  const preTitleFontSize     = isTight ? 'clamp(8px,2.8vw,12px)'  : 'clamp(9px,1.2vw,12px)';
  const preTitleSpacing      = isTight ? '0.32em' : '0.55em';
  const titleSpacing         = isTight ? '0.14em' : '0.22em';
  const subtitleSpacing      = isTight ? '0.28em' : '0.45em';

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

        {/* ── Font-face + cursor styles (unchanged) ──────────────── */}
        <style>{`
          * {
            -webkit-user-select: none; -moz-user-select: none;
            -ms-user-select: none; user-select: none;
            -webkit-user-drag: none; user-drag: none;
            -webkit-touch-callout: none;
          }
          .title-target, .decrypt-revealed {
            -webkit-user-select: text; -moz-user-select: text;
            -ms-user-select: text; user-select: text;
          }
          @font-face {
            font-family: "BL Melody Bold";
            src: url("${BLMelodyBold}") format("opentype");
            font-weight: 700; font-display: swap;
          }
          @font-face {
          font-family: "Chalk Stick";
          src: url("${ChalkStick}") format("opentype");
          font-weight: 700; font-display: swap;
          }
          @font-face {
            font-family: "BL Melody ExtraLight";
            src: url("${BLMelodyExtraLight}") format("opentype");
            font-weight: 200; font-display: swap;
          }
          @font-face {
            font-family: "BL Melody Mono Bold";
            src: url("${BLMelodyMonoBold}") format("opentype");
            font-weight: 700; font-display: swap;
          }
          @font-face {
            font-family: "BL Melody Mono ExtraLight";
            src: url("${BLMelodyMonoExtraLight}") format("opentype");
            font-weight: 200; font-display: swap;
          }
          @font-face {
            font-family: "TRTCENZODEMO-ExtraBold";
            src: url("${TRTCENZOExtraBold}") format("truetype");
            font-weight: 800; font-display: swap;
          }
          :root {
            --final-blur: ${FINAL_BLUR_MAX}px;
            --emission: 0;
          }
          .target-cursor-wrapper {
            position: fixed; top: 0; left: 0; width: 0; height: 0;
            pointer-events: none; z-index: 10001;
            mix-blend-mode: difference;
            transform: translate(-50%, -50%);
          }
          .target-cursor-dot {
            position: absolute; left: 50%; top: 50%;
            width: 4px; height: 4px; background: #fff;
            border-radius: 50%; transform: translate(-50%,-50%);
            will-change: transform;
          }
          .target-cursor-corner {
            position: absolute; left: 50%; top: 50%;
            width: 12px; height: 12px; border: 3px solid #fff;
            will-change: transform;
          }
          .corner-tl { transform: translate(-150%,-150%); border-right: none; border-bottom: none; }
          .corner-tr { transform: translate(50%,-150%);   border-left:  none; border-bottom: none; }
          .corner-br { transform: translate(50%,50%);     border-left:  none; border-top:    none; }
          .corner-bl { transform: translate(-150%,50%);   border-right: none; border-top:    none; }
          .decrypt-revealed  { color: inherit; }
          .decrypt-encrypted { color: rgba(255,255,255,0.28); }
        `}</style>
      
        {/* ── Preloader ──────────────────────────────────── z: auto */}
        <Preloader duration={preloaderDuration} onLoadComplete={handleLoadComplete} />

    
        <Background texture="/assets/Backgounds/main_.jpg" zIndex={0} />
        {/* ── Fish ───────────────────────────────────────── z: 3 */}
        <PaperFish
          frameCount={fishFrameCount}
          framePath={fishFramePath}
          frameExt={fishFrameExt}
          framePad={fishFramePad}
          fps={fishFps}
          fishCount={isMobile ? Math.min(fishCount, 3) : fishCount}
          zIndex={3}
        />

        {/* ── Title text ─────────────────────────────────── z: 10 */}
        <BacklitText style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(1200px, 92vw)',
          zIndex: 10,
          display: 'flex', flexDirection: 'column',
          alignItems: isCompact ? 'center' : 'flex-start',
          justifyContent: 'center',
          gap: isCompact ? 12 : 24,
          color: 'rgba(255,255,255,1)',
          mixBlendMode: isMobile ? 'normal' : 'screen',
          padding: isCompact ? '0 12px' : '0 24px',
        }}>
          <div style={{ pointerEvents: 'auto', width: '100%' }}>

            <DynamicShadowText level="subtitle" style={{
              fontSize: preTitleFontSize,
              letterSpacing: preTitleSpacing,
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
                letterSpacing: titleSpacing,
                color: 'rgba(255,255,255,1)',
                textTransform: 'uppercase',
                margin: 0, lineHeight: 1.2,
                fontFamily: 'Chalk Stick',
                display: 'block',
                textAlign: isCompact ? 'center' : 'left',
              }}>
                BOLTFORGED
              </DynamicShadowText>
            </TitleTarget>

            <DynamicShadowText level="subtitle" style={{
              fontSize: subtitleFontSize,
              letterSpacing: subtitleSpacing,
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              marginTop: isMobile ? 4 : 8,
              fontWeight: 300,
              fontFamily: 'Chalk Stick',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(200,180,255,0.3) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block',
              textAlign: isCompact ? 'center' : 'left',
            }}>
              House of Creatives
            </DynamicShadowText>

          </div>
        </BacklitText>

        {/* ── Corner brackets ────────────────────────────── z: 12 */}
        {!isMobile && [['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v, h]) => (
          <div key={v+h} style={{
            position: 'absolute', [v]: 24, [h]: 24,
            width: 22, height: 22, zIndex: 12,
            borderColor: 'rgba(255,255,255,.15)',
            borderStyle: 'solid',
            borderWidth: `${v==='top'?1:0}px ${h==='right'?1:0}px ${v==='bottom'?1:0}px ${h==='left'?1:0}px`,
          }} />
        ))}

        <Letterboxing isMobile={isMobile} />
        
        {/* ── IK Arm ─────────────────────────────────────── z: 20 */}
        {!isMobile && (
          <IKarm
          corner="top-right"
          flip={-1}
          zIndex={20}
          upperArmColor="#c8a882"
          forearmColor="#a8805a"
          jointColor="#e2c090"
          handColor="#d4a870"
          shadowColor="#b9b9b9"
          />
        )}


        {/* ── Cursor ─────────────────────────────────────── z: 10001 */}
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