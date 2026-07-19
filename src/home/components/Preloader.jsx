import { useCallback, useEffect, useRef, useState } from 'react';
import { FONT_TITLE, FINAL_BLUR_MAX, FINAL_BLUR_DEFAULT } from '../core/constants';
import { preloadBinary, preloadImages, preloadJson } from '../core/assetCache';

export default function Preloader({
  onLoadComplete,
  duration = 3,
  assets = { images: [], json: [], binary: [], preloaders: [] },
  maxWaitMs = 5000,
}) {
  const [isVisible, setIsVisible] = useState(true);
  const countRef = useRef(null);
  const scaleRef = useRef(null);
  const assetsReadyRef = useRef(true);
  const progressRef = useRef(0);
  const rafRef = useRef(0);

  /* ── Asset loading ── */
  useEffect(() => {
    const images = Array.from(new Set((assets?.images || []).filter(Boolean)));
    const json = Array.from(new Set((assets?.json || []).filter(Boolean)));
    const binary = Array.from(new Set((assets?.binary || []).filter(Boolean)));
    const preloaders = Array.isArray(assets?.preloaders) ? assets.preloaders : [];

    if (images.length === 0 && json.length === 0 && binary.length === 0 && preloaders.length === 0) {
      assetsReadyRef.current = true;
      return;
    }

    assetsReadyRef.current = false;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      assetsReadyRef.current = true;
    };
    const timer = setTimeout(finish, maxWaitMs);

    const tasks = [];
    if (images.length) tasks.push(preloadImages(images));
    if (json.length) tasks.push(preloadJson(json));
    if (binary.length) tasks.push(preloadBinary(binary));
    preloaders.forEach((fn) => {
      try {
        const result = fn?.();
        if (result && typeof result.then === 'function') tasks.push(result);
      } catch (err) {
        console.warn('Preloader: a custom preloader threw synchronously and was skipped.', err);
      }
    });

    Promise.allSettled(tasks).then(finish);
    return () => {
      clearTimeout(timer);
      done = true;
    };
  }, [assets, maxWaitMs]);

  /* ── Progress animation (pure DOM) ── */
  useEffect(() => {
    const startTime = performance.now();
    let completed = false;

    const tick = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      const next = Math.min((elapsed / duration) * 100, 100);
      progressRef.current = next;

      // DOM updates – no React state
      if (countRef.current) {
        countRef.current.textContent = Math.round(next).toString();
      }

      const eased = 1 - Math.pow(1 - next / 100, 3);
      const newScale = 3.0 - eased * 2.0; // 3 → 1
      if (scaleRef.current) {
        scaleRef.current.style.transform = `scale(${newScale})`;
      }

      // Correct blur interpolation: FINAL_BLUR_MAX → FINAL_BLUR_DEFAULT
      const blur = FINAL_BLUR_MAX - (next / 100) * (FINAL_BLUR_MAX - FINAL_BLUR_DEFAULT);
      document.documentElement.style.setProperty('--final-blur', `${blur.toFixed(3)}px`);

      if (next >= 100 && assetsReadyRef.current && !completed) {
        completed = true;
        // Leave --final-blur at its final value
        document.documentElement.style.setProperty('--final-blur', `${FINAL_BLUR_DEFAULT}px`);
        setTimeout(() => {
          setIsVisible(false);
          if (onLoadComplete) onLoadComplete();
        }, 500);
        return;
      }

      if (!completed) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: FONT_TITLE,
        transition: 'opacity 0.5s ease',
        opacity: progressRef.current >= 100 ? 0 : 1,
        pointerEvents: progressRef.current >= 100 ? 'none' : 'auto',
      }}
    >
      <div
        ref={scaleRef}
        style={{
          fontSize: 'clamp(48px, 15vw, 180px)',
          fontWeight: 800,
          letterSpacing: '0.1em',
          textShadow: '0 0 30px rgba(255,255,255,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
          transform: 'scale(3)', // initial
        }}
      >
        <span ref={countRef}>0</span>
        <span style={{ marginLeft: 10 }}>%</span>
      </div>
    </div>
  );
}