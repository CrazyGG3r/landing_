/**
 * Landing.jsx
 * ─────────────────────────────────────────────────────────────────
 * Drop-in cinematic scene for Create React App with Preloader and TargetCursor
 * ─────────────────────────────────────────────────────────────────
 */

import {
  useEffect,
  useRef,
  useCallback,
  useState,
  createContext,
  useContext,
  memo,
  forwardRef,
} from 'react';
import * as THREE from 'three';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';

// Import your models dynamically
const models = import.meta.glob('../assets/models/*.glb', { eager: false });

// Model configuration for specific models
const MODEL_CONFIGS = {
  'Suzanne.glb': {
    scale: 1.5,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }
  },
  'Eva.glb': {
    scale: 1.5,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }
  },
};

// Default config for models not in the list
const DEFAULT_MODEL_CONFIG = {
  scale: 1.5,
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 }
};

// Tweak this to scale your imported model
const MODEL_SCALE = 1;
const SMAA_ENABLED = true;
// Material tweaks
const MODEL_ROUGHNESS = 0.2;
const MODEL_FRESNEL = 2.5;
// Post FX tweaks
const BLOOM_STRENGTH = 0.25;
const BLOOM_RADIUS = 0.4;
const BLOOM_THRESHOLD = 0.1;
const CHROMA_SHIFT = 0.0012;
const LENS_BLUR = 0.25;
const DOF_FOCUS = 1.5;
const DOF_APERTURE = 0.00004;
const DOF_MAX_BLUR = 0.015;
const TEXT_LIGHT_FALLOFF = 0.8;
const TEXT_GLOW = 1.2;
// Ghost-like glare tweaks
const GHOST_GLARE_ENABLED = true;
const GHOST_GLARE_INTENSITY = 0.35;
const GHOST_GLARE_THRESHOLD = 0.2;
const GHOST_GLARE_SOFTNESS = 0.3;
const GHOST_GLARE_GHOSTS = 3;
const GHOST_GLARE_SPREAD = 0.58;
const GHOST_GLARE_CHROMA = 0.3;
const GHOST_GLARE_TINT = new THREE.Color(0.95, 0.9, 1.0);
// Final blur - will be animated during preloader
const FINAL_BLUR_DEFAULT = 0.3;
const FINAL_BLUR_MAX = 1.5;
// Dithered noise
const DITHER_NOISE_AMOUNT = 0.08;
// Rim lighting controls
const RIM_INTENSITY = 5.5;
const RIM_POWER = 6.0;
const RIM_START = 0.3;
// Font controls
const FONT_TITLE = '"TRTCENZODEMO-ExtraBold", "BL Melody Bold", serif';
const FONT_SUBTITLE = '"BL Melody ExtraLight", "Arial", sans-serif';
const FONT_LETTERBOX_TITLE = '"BL Melody Mono Bold", monospace';
const FONT_LETTERBOX_SUBTITLE = '"BL Melody Mono ExtraLight", monospace';
// Background blend exposure
const CB_EXPOSURE = 0.85;
// Shadow settings
const TITLE_SHADOW_INTENSITY = 0.8;
const TITLE_SHADOW_BLUR = 40;
const TITLE_SHADOW_DISTANCE = 12;
const SUBTITLE_SHADOW_INTENSITY = 0.6;
const SUBTITLE_SHADOW_BLUR = 30;
const SUBTITLE_SHADOW_DISTANCE = 8;

// Text emission settings
const TEXT_EMISSION_BASE = 0;
const TEXT_EMISSION_MAX = 4;

// ─────────────────────────────────────────────────────────────────
//  Custom hook for orientation/size change refresh
// ─────────────────────────────────────────────────────────────────
const useRefreshOnResize = () => {
  useEffect(() => {
    let resizeTimer;
    let orientationTimer;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        window.location.reload();
      }, 250);
    };

    const handleOrientation = () => {
      clearTimeout(orientationTimer);
      orientationTimer = setTimeout(() => {
        window.location.reload();
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientation);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientation);
      clearTimeout(resizeTimer);
      clearTimeout(orientationTimer);
    };
  }, []);
};

// ─────────────────────────────────────────────────────────────────
//  CountUp Component
// ─────────────────────────────────────────────────────────────────
const CountUp = memo(function CountUp({
  to,
  from = 0,
  duration = 2,
  onComplete,
  startCounting = true,
  onProgress
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(from);
  const [isComplete, setIsComplete] = useState(false);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness
  });

  const formatValue = useCallback((value) => {
    return Math.round(value).toString();
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(from);
    }
  }, [from, formatValue]);

  useEffect(() => {
    if (startCounting && !isComplete) {
      motionValue.set(to);
    }
  }, [startCounting, to, motionValue, isComplete]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', latest => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }

      // Call progress callback with current value
      if (onProgress) {
        onProgress(latest);
      }

      // Check if we've reached the target
      if (!isComplete && Math.abs(latest - to) < 0.5) {
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    });

    return () => unsubscribe();
  }, [springValue, formatValue, to, isComplete, onComplete, onProgress]);

  return <span ref={ref} className="count-up-text" />;
});

// ─────────────────────────────────────────────────────────────────
//  Preloader Component with scaling text effect
// ─────────────────────────────────────────────────────────────────
const Preloader = memo(function Preloader({
  onLoadComplete,
  duration = 3
}) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [blurAmount, setBlurAmount] = useState(FINAL_BLUR_MAX);
  const [scale, setScale] = useState(3.0); // Start very large

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      // Calculate blur: starts at max, decreases to default
      const blurProgress = newProgress / 100;
      const newBlur = FINAL_BLUR_MAX - (blurProgress * (FINAL_BLUR_MAX - FINAL_BLUR_DEFAULT));
      setBlurAmount(Math.max(FINAL_BLUR_DEFAULT, newBlur));

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          if (onLoadComplete) onLoadComplete();
        }, 500);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [duration, onLoadComplete]);

  // Handle scale animation with power3.out easing
  useEffect(() => {
    // Calculate scale: starts at 3.0, ends at 1.0 with power3.out easing
    const progressFactor = progress / 100;
    // Power3.out easing function: 1 - (1 - t)^3
    const easedProgress = 1 - Math.pow(1 - progressFactor, 3);
    const newScale = 3.0 - (easedProgress * 2.0); // 3.0 -> 1.0
    setScale(newScale);
  }, [progress]);

  // Update CSS variable for blur
  useEffect(() => {
    document.documentElement.style.setProperty('--final-blur', `${blurAmount}px`);
  }, [blurAmount]);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100000,
      backgroundColor: 'black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: FONT_TITLE,
      transition: 'opacity 0.5s ease',
      opacity: progress >= 100 ? 0 : 1,
      pointerEvents: progress >= 100 ? 'none' : 'auto',
    }}>
      <div style={{
        fontSize: 'clamp(48px, 15vw, 180px)',
        fontWeight: 800,
        letterSpacing: '0.1em',
        textShadow: '0 0 30px rgba(255,255,255,0.8)',
        transform: `scale(${scale})`,
        transition: 'transform 0.1s linear',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
      }}>
        <CountUp
          from={0}
          to={100}
          duration={duration}
          startCounting={true}
        />
        <span style={{ marginLeft: 10 }}>%</span>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────
//  CalloutWithLeader Component - Redesigned with top-right corner origin
// ─────────────────────────────────────────────────────────────────
const CalloutWithLeader = memo(function CalloutWithLeader({
  text,
  targetRect,
}) {
  const calloutRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!calloutRef.current || !lineRef.current || !targetRect) return;

    // Position callout at top-right corner of target (fixed position)
    const calloutX = targetRect.right + 20;
    const calloutY = targetRect.top - 50;

    // Set callout position
    gsap.set(calloutRef.current, {
      x: calloutX,
      y: calloutY,
      opacity: 1,
    });

    // Stretch effect on entry
    gsap.fromTo(calloutRef.current,
      { scaleX: 0.2, scaleY: 0.8, opacity: 0 },
      { scaleX: 1, scaleY: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );

    // Create leader line from top-right corner of target to callout
    // Start at target's top-right corner
    const startX = targetRect.right;
    const startY = targetRect.top;
    
    // End at callout's bottom-left corner (for a clean connection)
    const endX = calloutX;
    const endY = calloutY + 40; // Connect to bottom of callout

    // Create a slight curve for elegance
    const midX = (startX + endX) / 2;
    const midY = Math.min(startY, endY) - 20; // Curve upward

    const path = `M ${startX},${startY} Q ${midX},${midY} ${endX},${endY}`;

    // Style the line with bright outline
    gsap.set(lineRef.current, {
      attr: { d: path },
      opacity: 1,
      stroke: 'rgba(180, 180, 200, 0.9)', // Brighter stroke
      strokeWidth: 2.5,
      fill: 'none',
      filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.5))', // Glow effect
    });

    // Animate line drawing
    const length = lineRef.current.getTotalLength();
    gsap.set(lineRef.current, {
      strokeDashoffset: length,
      strokeDasharray: length
    });
    gsap.to(lineRef.current, {
      strokeDashoffset: 0,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.1
    });

  }, [targetRect]);

  return (
    <>
      <svg
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10002,
        }}
      >
        <path ref={lineRef} />
      </svg>
      <div
        ref={calloutRef}
        style={{
          position: 'fixed',
          padding: '14px 28px',
          background: '#2a2a35', // Dark gray base
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '2px solid rgba(220, 220, 240, 0.9)', // Bright outline
          borderRadius: '6px',
          color: '#ffffff',
          fontSize: '14px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontFamily: FONT_LETTERBOX_TITLE,
          fontWeight: 500,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 10003,
          boxShadow: `
            0 8px 24px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.2) inset,
            0 0 15px rgba(200, 200, 255, 0.3)
          `,
          transform: 'translate(0, -50%)',
          opacity: 0,
          transformOrigin: 'left center',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        {text}
        <div style={{
          position: 'absolute',
          bottom: -8,
          right: 24,
          width: 12,
          height: 12,
          background: '#2a2a35',
          borderRight: '2px solid rgba(220, 220, 240, 0.9)',
          borderBottom: '2px solid rgba(220, 220, 240, 0.9)',
          transform: 'rotate(45deg)',
          backdropFilter: 'blur(12px)',
          boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)',
        }} />
      </div>
    </>
  );
});

// ─────────────────────────────────────────────────────────────────
//  TargetCursor with Label Component
// ─────────────────────────────────────────────────────────────────
const TargetCursor = memo(function TargetCursor({
  targetSelector = '.cursor-target',
  spinDuration = 5,
  hoverDuration = 0.2,
  parallaxOn = true,
  labelText = 'TriggerCaption'
}) {
  const cursorRef = useRef(null);
  const cornersRef = useRef(null);
  const spinTl = useRef(null);
  const dotRef = useRef(null);
  const [calloutInfo, setCalloutInfo] = useState(null);

  const isActiveRef = useRef(false);
  const targetCornerPositionsRef = useRef(null);
  const tickerFnRef = useRef(null);
  const activeStrengthRef = useRef(0);

  // More comprehensive mobile detection
  const [isMobile] = useState(() => {
    const ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
  });

  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12
    }),
    []
  );

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.1,
      ease: 'power3.out'
    });
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    document.body.style.cursor = 'none';

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');

    let activeTarget = null;
    let currentLeaveHandler = null;
    let resumeTimeout = null;

    const cleanupTarget = target => {
      if (currentLeaveHandler) {
        target.removeEventListener('mouseleave', currentLeaveHandler);
      }
      currentLeaveHandler = null;
    };

    const hideCallout = () => {
      setCalloutInfo(null);
    };

    const showCallout = (text, targetElement) => {
      if (!targetElement) return;

      const rect = targetElement.getBoundingClientRect();
      setCalloutInfo({
        text,
        targetRect: rect,
      });
    };

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });

    const createSpinTimeline = () => {
      if (spinTl.current) {
        spinTl.current.kill();
      }
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, {
          rotation: '+=360',
          duration: spinDuration,
          ease: 'none'
        });
    };

    createSpinTimeline();

    const tickerFn = () => {
      if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) {
        return;
      }

      const strength = activeStrengthRef.current;
      if (strength === 0) return;

      const cursorX = gsap.getProperty(cursorRef.current, 'x');
      const cursorY = gsap.getProperty(cursorRef.current, 'y');

      const corners = Array.from(cornersRef.current);
      corners.forEach((corner, i) => {
        const currentX = gsap.getProperty(corner, 'x');
        const currentY = gsap.getProperty(corner, 'y');

        const targetX = targetCornerPositionsRef.current[i].x - cursorX;
        const targetY = targetCornerPositionsRef.current[i].y - cursorY;

        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;

        const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;

        gsap.to(corner, {
          x: finalX,
          y: finalY,
          duration: duration,
          ease: duration === 0 ? 'none' : 'power1.out',
          overwrite: 'auto'
        });
      });
    };

    tickerFnRef.current = tickerFn;

    const moveHandler = e => moveCursor(e.clientX, e.clientY);
    window.addEventListener('mousemove', moveHandler);

    const mouseDownHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
    };

    const mouseUpHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    const enterHandler = e => {
      const target = e.target.closest(targetSelector);
      if (!target || !cursorRef.current || !cornersRef.current) return;

      if (activeTarget === target) return;
      if (activeTarget) {
        cleanupTarget(activeTarget);
      }
      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      activeTarget = target;
      const corners = Array.from(cornersRef.current);
      corners.forEach(corner => gsap.killTweensOf(corner));

      gsap.killTweensOf(cursorRef.current, 'rotation');
      spinTl.current?.pause();
      gsap.set(cursorRef.current, { rotation: 0 });

      const rect = target.getBoundingClientRect();
      const { borderWidth, cornerSize } = constants;
      const cursorX = gsap.getProperty(cursorRef.current, 'x');
      const cursorY = gsap.getProperty(cursorRef.current, 'y');

      targetCornerPositionsRef.current = [
        { x: rect.left - borderWidth, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
        { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
      ];

      isActiveRef.current = true;
      gsap.ticker.add(tickerFnRef.current);

      gsap.to(activeStrengthRef, {
        current: 1,
        duration: hoverDuration,
        ease: 'power2.out'
      });

      corners.forEach((corner, i) => {
        gsap.to(corner, {
          x: targetCornerPositionsRef.current[i].x - cursorX,
          y: targetCornerPositionsRef.current[i].y - cursorY,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      // Show callout with leader line (always from top-right corner)
      showCallout(labelText, target);

      const leaveHandler = () => {
        gsap.ticker.remove(tickerFnRef.current);

        isActiveRef.current = false;
        targetCornerPositionsRef.current = null;
        gsap.set(activeStrengthRef, { current: 0, overwrite: true });
        activeTarget = null;

        hideCallout();

        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current);
          gsap.killTweensOf(corners);
          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
          ];
          const tl = gsap.timeline();
          corners.forEach((corner, index) => {
            tl.to(
              corner,
              {
                x: positions[index].x,
                y: positions[index].y,
                duration: 0.3,
                ease: 'power3.out'
              },
              0
            );
          });
        }

        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTl.current) {
            const currentRotation = gsap.getProperty(cursorRef.current, 'rotation');
            const normalizedRotation = currentRotation % 360;
            spinTl.current.kill();
            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
            gsap.to(cursorRef.current, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: 'none',
              onComplete: () => {
                spinTl.current?.restart();
              }
            });
          }
          resumeTimeout = null;
        }, 50);

        cleanupTarget(target);
      };

      currentLeaveHandler = leaveHandler;
      target.addEventListener('mouseleave', leaveHandler);
    };

    window.addEventListener('mouseover', enterHandler, { passive: true });

    return () => {
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current);
      }

      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseover', enterHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;

      isActiveRef.current = false;
      targetCornerPositionsRef.current = null;
      activeStrengthRef.current = 0;
    };
  }, [targetSelector, spinDuration, moveCursor, constants, hoverDuration, parallaxOn, labelText, isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <div ref={cursorRef} className="target-cursor-wrapper">
        <div ref={dotRef} className="target-cursor-dot" />
        <div className="target-cursor-corner corner-tl" />
        <div className="target-cursor-corner corner-tr" />
        <div className="target-cursor-corner corner-br" />
        <div className="target-cursor-corner corner-bl" />
      </div>
      {calloutInfo && (
        <CalloutWithLeader
          text={calloutInfo.text}
          targetRect={calloutInfo.targetRect}
        />
      )}
    </>
  );
});

// ─────────────────────────────────────────────────────────────────
//  Mouse Context (single shared listener for both layers)
// ─────────────────────────────────────────────────────────────────
const MouseContext = createContext({ x: 0, y: 0 });

function MouseProvider({ children }) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const usingGyroRef = useRef(false);

  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    let usingGyro = false;
    let gyroReady = false;

    const handler = e => {
      if (usingGyro) return;
      // Normal mouse/touch
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      usingGyroRef.current = false;
    };

    const touchHandler = e => {
      if (usingGyro || !e.touches?.[0]) return;
      const t = e.touches[0];
      mouseRef.current.x = (t.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (t.clientY / window.innerHeight - 0.5) * 2;
      usingGyroRef.current = false;
    };

    const orientationHandler = e => {
      if (!gyroReady) return;
      // Inverse for gyro - tilt left = model looks right
      const gamma = Math.max(-45, Math.min(45, e.gamma || 0));
      const beta = Math.max(-45, Math.min(45, e.beta || 0));
      
      // Invert for natural inverse behavior
      mouseRef.current.x = -gamma / 45;
      mouseRef.current.y = beta / 45;
      
      usingGyroRef.current = true;
    };

    const tryEnableGyro = () => {
      if (!isMobile || gyroReady) return;
      if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(state => {
            if (state === 'granted') {
              gyroReady = true;
              usingGyro = true;
              window.addEventListener('deviceorientation', orientationHandler, true);
            }
          })
          .catch(() => { });
      } else if (typeof DeviceOrientationEvent !== 'undefined') {
        gyroReady = true;
        usingGyro = true;
        window.addEventListener('deviceorientation', orientationHandler, true);
      }
    };

    window.addEventListener('mousemove', handler, { passive: true });
    window.addEventListener('touchmove', touchHandler, { passive: true });
    window.addEventListener('touchstart', touchHandler, { passive: true });
    window.addEventListener('touchend', tryEnableGyro, { passive: true });
    window.addEventListener('click', tryEnableGyro, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handler);
      window.removeEventListener('touchmove', touchHandler);
      window.removeEventListener('touchstart', touchHandler);
      window.removeEventListener('touchend', tryEnableGyro);
      window.removeEventListener('click', tryEnableGyro);
      window.removeEventListener('deviceorientation', orientationHandler, true);
    };
  }, []);

  return (
    <MouseContext.Provider value={mouseRef}>
      {children}
    </MouseContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────
//  BacklitText with emission based on cursor distance
// ─────────────────────────────────────────────────────────────────
const BacklitText = memo(function BacklitText({ children, style }) {
  const ref = useRef(null);
  const mouseRef = useContext(MouseContext);
  const emissionRef = useRef(0);

  useEffect(() => {
    let raf;
    const start = performance.now();

    const loop = () => {
      const t = (performance.now() - start) / 1000;
      const mx = mouseRef.current?.x ?? 0;
      const my = mouseRef.current?.y ?? 0;

      const ox = Math.cos(t * 0.35) * 0.6;
      const oy = Math.sin(t * 0.27) * 0.45;
      const blend = 0.65;
      const lx = ((ox * (1 - blend) + mx * blend) * 0.5 + 0.5) * 100;
      const ly = ((oy * (1 - blend) + my * blend) * 0.5 + 0.5) * 100;

      // Calculate cursor distance for emission (normalized coordinates)
      const distance = Math.sqrt(mx * mx + my * my);
      const emissionFactor = Math.min(1, distance * 1.5);
      const emissionValue = TEXT_EMISSION_BASE + (emissionFactor * TEXT_EMISSION_MAX);

      // Smooth the emission value
      emissionRef.current += (emissionValue - emissionRef.current) * 0.15;

      if (ref.current) {
        ref.current.style.setProperty('--lx', `${lx}%`);
        ref.current.style.setProperty('--ly', `${ly}%`);
        ref.current.style.setProperty('--lg', `${TEXT_GLOW}`);
        ref.current.style.setProperty('--lf', `${TEXT_LIGHT_FALLOFF}`);
        ref.current.style.setProperty('--emission', emissionRef.current.toString());
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mouseRef]);

  return (
    <div ref={ref} style={{ ...style, pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'auto' }}>
        {children}
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────
//  SHADER SOURCES (complete shader code)
// ─────────────────────────────────────────────────────────────────

/** ColorBends — exact ReactBits port */
const CB_VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){ vUv = aPos * .5 + .5; gl_Position = vec4(aPos, 0., 1.); }
`;

const CB_FRAG = `
precision highp float;
#define MC 8
uniform vec2  uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2  uRot;
uniform int   uColorCount;
uniform vec3  uColors[MC];
uniform int   uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2  uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform float uExposure;
varying vec2 vUv;

void main(){
  float t = uTime * uSpeed;
  vec2 p  = vUv * 2.0 - 1.0;
  p      += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x*uRot.x - p.y*uRot.y, p.x*uRot.y + p.y*uRot.x);
  vec2 q  = vec2(rp.x*(uCanvas.x/uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2*dot(q,q);
  q += 0.2*cos(t) - 7.56;
  q += (uPointer - rp) * uMouseInfluence * 0.2;

  vec3 col = vec3(0.0); float a = 1.0;
  vec2 s = q; vec3 sumCol = vec3(0.0); float cover = 0.0;

  for(int i = 0; i < MC; ++i){
    if(i >= uColorCount) break;
    s -= 0.01;
    vec2 r  = sin(1.5*(s.yx*uFrequency) + 2.0*cos(s*uFrequency));
    float m0 = length(r + sin(5.0*r.y*uFrequency - 3.0*t + float(i))/4.0);
    float kB = clamp(uWarpStrength, 0.0, 1.0);
    float gain = 1.0 + max(uWarpStrength-1.0, 0.0);
    vec2 warped = s + (r-s)*kB*gain;
    float m1 = length(warped + sin(5.0*warped.y*uFrequency - 3.0*t + float(i))/4.0);
    float m  = mix(m0, m1, pow(kB, 0.3));
    float w  = 1.0 - exp(-6.0/exp(6.0*m));
    sumCol  += uColors[i] * w;
    cover    = max(cover, w);
  }
  col = clamp(sumCol, 0.0, 1.0);
  a   = (uTransparent > 0) ? cover : 1.0;

  if(uNoise > 0.0001){
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898,78.233)))*43758.5453);
    col = clamp(col + (n-.5)*uNoise, 0.0, 1.0);
  }
  col *= max(uExposure, 0.0);
  gl_FragColor = vec4((uTransparent>0) ? col*a : col, a);
}
`;

/** Glass mesh vertex */
const GL_VERT = `
varying vec3 vNormal;
varying vec3 vViewPos;
varying vec3 vWorldPos;
varying vec2 vUv;
void main(){
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vec4 mv = viewMatrix * wp;
  vViewPos = -mv.xyz;
  vNormal  = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}
`;

/** Glass mesh fragment — frosted blur + caustics + silhouette rim */
const GL_FRAG = `
precision highp float;
uniform sampler2D uBuffer;
uniform vec2  uRes;
uniform float uTime;
uniform float uIOR;
uniform float uChroma;
uniform float uFrost;
uniform float uSmoke;
uniform float uRoughness;
uniform float uFresnel;
uniform float uRimIntensity;
uniform float uRimPower;
uniform float uRimStart;
varying vec3 vNormal;
varying vec3 vViewPos;
varying vec3 vWorldPos;
varying vec2 vUv;

float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<6;i++){v+=a*noise(p);p*=2.1;a*=.48;}
  return v;
}
float caustic(vec2 uv, float t){
  vec2 p=uv*4.5; float c=0.;
  for(int i=0;i<4;i++){
    float fi=float(i);
    vec2 q=p+vec2(cos(t*.35+fi*1.9),sin(t*.28+fi*2.4))*.7;
    c+=.8/(abs(sin(q.x+sin(q.y+t*.25)))+.12);
  }
  return clamp(c*.09,0.,1.);
}

void main(){
  /* Poisson disk — 12 taps */
  vec2 disk[12];
  disk[0]=vec2(.000,.800); disk[1]=vec2(.469,.643);
  disk[2]=vec2(.800,.000); disk[3]=vec2(.643,-.469);
  disk[4]=vec2(.000,-.800);disk[5]=vec2(-.469,-.643);
  disk[6]=vec2(-.800,.000);disk[7]=vec2(-.643,.469);
  disk[8]=vec2(.300,.400); disk[9]=vec2(-.300,.400);
  disk[10]=vec2(.300,-.400);disk[11]=vec2(-.300,-.400);

  vec2 sc = gl_FragCoord.xy / uRes;
  vec3 N  = normalize(vNormal);
  vec3 V  = normalize(vViewPos);
  float eta = 1.0 / uIOR;
  float k   = max(1.0 - eta*eta*(1.0 - dot(N,V)*dot(N,V)), 0.0);
  vec3 refDir  = eta*(-V) - (eta*dot(N,V) + sqrt(k))*N;
  vec2 refShift = refDir.xy * 0.022;

  /* Frost noise */
  vec2 nuv = vUv*5.5 + uTime*.035;
  float frostA = fbm(nuv)*.7 + fbm(nuv*2.3+vec2(4.1,2.7))*.3;
  float jitter = frostA * uFrost;
  float rad    = 0.048 * jitter;

  /* 12-tap chromatic blur */
  vec3 sumR=vec3(0.),sumG=vec3(0.),sumB=vec3(0.);
  for(int i=0;i<12;i++){
    vec2 off = disk[i]*rad;
    float ca = uChroma*(float(i)*.055+.55);
    sumR += texture2D(uBuffer, sc+refShift+off*(1.+ca)).rgb;
    sumG += texture2D(uBuffer, sc+refShift+off        ).rgb;
    sumB += texture2D(uBuffer, sc+refShift+off*(1.-ca)).rgb;
  }
  vec3 frosted = vec3(
    (sumR.r+sumG.r+sumB.r)/36.,
    (sumR.g+sumG.g+sumB.g)/36.,
    (sumR.b+sumG.b+sumB.b)/36.);

  /* Smoke */
  vec2 suv = vWorldPos.xy*.75 + vec2(uTime*.055, uTime*.032);
  float sm = fbm(suv)*fbm(suv*1.6+vec2(2.1,3.7));
  vec3 smokeCol = mix(vec3(.38,.12,.72), vec3(.05,.02,.22), sm);
  frosted = mix(frosted, smokeCol, uSmoke*(.28+sm*.28));

  /* Caustics */
  float caust = caustic(vWorldPos.xy*.45+uTime*.04, uTime);
  float ct    = sin(uTime*.3)*.5+.5;
  vec3 causticTint = mix(vec3(1.,.15,.15), mix(vec3(.1,1.,.1),vec3(.1,.1,1.),ct), ct);
  frosted += causticTint * caust * .30;

  /* Fresnel + specular */
  float NdV     = max(dot(N,V), 0.0);
  float fresnel = pow(1.0-NdV, 4.2) * uFresnel;
  vec3 L1 = normalize(vec3(2.,4.,5.));
  vec3 L2 = normalize(vec3(-3.,-1.,3.));
  float spec1 = pow(max(dot(reflect(-L1,N),V),0.),120.)*.95;
  float spec2 = pow(max(dot(reflect(-L2,N),V),0.),18.)*.25;
  vec3 specCol = (vec3(.95,.9,1.)*spec1 + vec3(.7,.5,1.)*spec2) * (1.0 - clamp(uRoughness, 0.0, 1.0));

  /* Iridescent rim */
  float iri   = pow(1.0-NdV, 2.5);
  vec3 iriCol = mix(vec3(.2,.6,1.), vec3(1.,.2,.4), sin(iri*6.+uTime*.4)*.5+.5)*iri*.45;

  /* Base colour */
  vec3 col = mix(frosted, vec3(.88,.85,1.), .08) + specCol + iriCol;
  col += vec3(.55,.35,.9)*fresnel*.18;
  col += vec3(.5,.2,.9)*pow(max(1.-length(vUv-.5)*2.,0.),2.5)*.12;
  col = mix(col, frosted, clamp(uRoughness, 0.0, 1.0));

  /* Silhouette rim — tight band only at outermost edge */
  float rim    = smoothstep(uRimStart, 1.0, pow(1.0-NdV, uRimPower));
  float rs     = sin(uTime*.5)*.5+.5;
  vec3 rimCol  = mix(vec3(.4,.7,1.), vec3(1.,.25,.6), rs);
  col         += rimCol * rim * uRimIntensity;

  float alpha  = clamp(mix(.78,.98,fresnel) + rim*.85, 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;

// ─────────────────────────────────────────────────────────────────
//  Ghost-like glare shader pass
// ─────────────────────────────────────────────────────────────────
const GhostGlareShader = {
  uniforms: {
    tDiffuse: { value: null },
    uIntensity: { value: GHOST_GLARE_INTENSITY },
    uThreshold: { value: GHOST_GLARE_THRESHOLD },
    uSoftness: { value: GHOST_GLARE_SOFTNESS },
    uGhosts: { value: GHOST_GLARE_GHOSTS },
    uSpread: { value: GHOST_GLARE_SPREAD },
    uChroma: { value: GHOST_GLARE_CHROMA },
    uTint: { value: GHOST_GLARE_TINT },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uIntensity;
    uniform float uThreshold;
    uniform float uSoftness;
    uniform float uGhosts;
    uniform float uSpread;
    uniform float uChroma;
    uniform vec3  uTint;
    varying vec2 vUv;

    vec3 sampleTex(vec2 uv, float chroma) {
      vec2 dir = normalize(uv - 0.5);
      vec2 off = dir * chroma;
      float r = texture2D(tDiffuse, uv + off).r;
      float g = texture2D(tDiffuse, uv).g;
      float b = texture2D(tDiffuse, uv - off).b;
      return vec3(r, g, b);
    }

    void main() {
      vec3 base = texture2D(tDiffuse, vUv).rgb;
      float luma = dot(base, vec3(0.2126, 0.7152, 0.0722));
      float gate = smoothstep(uThreshold, uThreshold + uSoftness, luma);

      vec2 center = vec2(0.5);
      vec2 dir = vUv - center;
      vec3 glare = vec3(0.0);

      for (int i = 1; i <= 8; i++) {
        if (float(i) > uGhosts) break;
        float t = float(i) / max(uGhosts, 1.0);
        vec2 gUv = center + dir * (1.0 + t * uSpread);
        vec3 col = sampleTex(gUv, uChroma * t);
        float w = (1.0 - t) * 0.85 + 0.15;
        glare += col * w;
      }

      glare *= gate * uIntensity;
      glare *= uTint;

      gl_FragColor = vec4(base + glare, 1.0);
    }
  `,
};

// ─────────────────────────────────────────────────────────────────
//  Dithered noise shader pass (after final blur)
// ─────────────────────────────────────────────────────────────────
const DitherNoiseShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uAmount: { value: DITHER_NOISE_AMOUNT },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uAmount;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898,78.233)) + uTime) * 43758.5453); }
    void main() {
      vec4 col = texture2D(tDiffuse, vUv);
      float n = hash(gl_FragCoord.xy);
      col.rgb += (n - 0.5) * uAmount;
      gl_FragColor = col;
    }
  `,
};

// ─────────────────────────────────────────────────────────────────
//  useResizeObserver  — fires callback on element resize
// ─────────────────────────────────────────────────────────────────
function useResizeObserver(ref, cb) {
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(cb);
    ro.observe(ref.current);
    cb();
    return () => ro.disconnect();
  }, [cb]);
}

// ─────────────────────────────────────────────────────────────────
//  ColorBends  (raw WebGL — no Three.js overhead for the bg layer)
// ─────────────────────────────────────────────────────────────────
const ColorBendsGL = memo(forwardRef(function ColorBendsGL({
  colors = ['#ff2929', '#00ff00', '#0000ff'],
  rotation = 45,
  autoRotate = 1,
  speed = 0.2,
  scale = 1,
  frequency = 1,
  warpStrength = 0,
  mouseInfluence = 1,
  parallax = 1,
  noise = 0.08,
  transparent = true,
}, forwardedRef) {
  const canvasRef = useRef(null);
  const mouseRef = useContext(MouseContext);
  const stateRef = useRef(null);
  const setCanvasNode = useCallback((node) => {
    canvasRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef && typeof forwardedRef === 'object') forwardedRef.current = node;
  }, [forwardedRef]);

  const parseColors = useCallback(cols => {
    const out = [];
    for (let i = 0; i < 8; i++) {
      const h = (cols[i] || '#000000').replace('#', '');
      out.push(
        parseInt(h.slice(0, 2), 16) / 255,
        parseInt(h.slice(2, 4), 16) / 255,
        parseInt(h.slice(4, 6), 16) / 255,
      );
    }
    return new Float32Array(out);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { antialias: true, alpha: false });

    const mkShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, CB_VERT));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, CB_FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = n => gl.getUniformLocation(prog, n);
    const uniforms = {
      uCanvas: U('uCanvas'), uTime: U('uTime'), uRot: U('uRot'),
      uPointer: U('uPointer'), uColors: U('uColors'),
      uColorCount: U('uColorCount'), uTransparent: U('uTransparent'),
      uSpeed: U('uSpeed'), uScale: U('uScale'),
      uFrequency: U('uFrequency'), uWarpStrength: U('uWarpStrength'),
      uMouseInfluence: U('uMouseInfluence'),
      uParallax: U('uParallax'), uNoise: U('uNoise'),
      uExposure: U('uExposure'),
    };

    stateRef.current = { gl, prog, buf, uniforms };

    gl.uniform1i(uniforms.uTransparent, transparent ? 1 : 0);
    gl.uniform1f(uniforms.uSpeed, speed);
    gl.uniform1f(uniforms.uScale, scale);
    gl.uniform1f(uniforms.uFrequency, frequency);
    gl.uniform1f(uniforms.uWarpStrength, warpStrength);
    gl.uniform1f(uniforms.uMouseInfluence, mouseInfluence);
    gl.uniform1f(uniforms.uParallax, parallax);
    gl.uniform1f(uniforms.uNoise, noise);
    gl.uniform1f(uniforms.uExposure, CB_EXPOSURE);
    gl.uniform3fv(uniforms.uColors, parseColors(colors));
    gl.uniform1i(uniforms.uColorCount, Math.min(colors.length, 8));

    const start = performance.now();
    let raf;
    const ptrS = { x: 0, y: 0 };

    const loop = () => {
      const elapsed = (performance.now() - start) / 1000;
      const deg = (rotation % 360) + autoRotate * elapsed;
      const rad = deg * Math.PI / 180;
      ptrS.x += (mouseRef.current.x - ptrS.x) * 0.08;
      ptrS.y += (mouseRef.current.y - ptrS.y) * 0.08;
      gl.uniform1f(uniforms.uTime, elapsed);
      gl.uniform2f(uniforms.uRot, Math.cos(rad), Math.sin(rad));
      gl.uniform2f(uniforms.uPointer, ptrS.x, ptrS.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      const loseExt = gl.getExtension('WEBGL_lose_context');
      if (loseExt && loseExt.loseContext) loseExt.loseContext();
    };
  }, [colors, rotation, autoRotate, speed, scale, frequency, warpStrength, mouseInfluence, parallax, noise, transparent, mouseRef, parseColors]);

  useResizeObserver(canvasRef, () => {
    const canvas = canvasRef.current;
    if (!canvas || !stateRef.current) return;
    const { gl, uniforms } = stateRef.current;
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    canvas.width = w; canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uniforms.uCanvas, w, h);
  });

  return (
    <canvas
      ref={setCanvasNode}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}));

// ─────────────────────────────────────────────────────────────────
//  FluidGlass  (Three.js — FBO refraction + cinematic shader)
//  FIXED: Cursor down = model looks down
// ─────────────────────────────────────────────────────────────────
const FluidGlass = memo(function FluidGlass({ bgCanvasRef, modelUrl }) {
  const mountRef = useRef(null);
  const mouseRef = useContext(MouseContext);
  const [modelConfig, setModelConfig] = useState(DEFAULT_MODEL_CONFIG);
  const [modelPath, setModelPath] = useState(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  // Randomly select a model on mount
  useEffect(() => {
    const loadModelList = async () => {
      try {
        const modelFiles = Object.keys(models);
        if (modelFiles.length === 0) {
          console.warn('No models found in ../assets/models/');
          return;
        }

        // Pick random model
        const randomIndex = Math.floor(Math.random() * modelFiles.length);
        const selectedPath = modelFiles[randomIndex];

        // Extract filename from path
        const filename = selectedPath.split('/').pop();

        // Get config for this model or use default
        const config = MODEL_CONFIGS[filename] || DEFAULT_MODEL_CONFIG;
        setModelConfig(config);

        // Load the model - this returns a module with the URL
        const module = await models[selectedPath]();
        setModelPath(module.default);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModelList();
  }, []);

  useEffect(() => {
    if (!modelPath) return;

    const mount = mountRef.current;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    let composer = null;
    let renderPass = null;
    let bloomPass = null;
    let chromaPass = null;
    let ghostGlarePass = null;
    let hBlurPass = null;
    let vBlurPass = null;
    let bokehPass = null;
    let smaaPass = null;
    let finalHBlurPass = null;
    let finalVBlurPass = null;
    let ditherPass = null;
    let disposed = false;

    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 200);
    camera.position.set(0, 0, 6.5);
    const glScene = new THREE.Scene();
    const mirrorScene = new THREE.Scene();
    const ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const mkFBO = () => new THREE.WebGLRenderTarget(
      mount.clientWidth, mount.clientHeight,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        samples: 4
      }
    );
    let fbo = mkFBO();

    const bgTex = new THREE.CanvasTexture(bgCanvasRef.current);
    bgTex.minFilter = THREE.LinearFilter;
    bgTex.magFilter = THREE.LinearFilter;
    glScene.background = bgTex;
    mirrorScene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshBasicMaterial({ map: bgTex }),
    ));

    const glassMat = new THREE.ShaderMaterial({
      uniforms: {
        uBuffer: { value: fbo.texture },
        uRes: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
        uTime: { value: 0 },
        uIOR: { value: 1.2 },
        uChroma: { value: 1.0 },
        uFrost: { value: 1.8 },
        uSmoke: { value: 0.6 },
        uRoughness: { value: MODEL_ROUGHNESS },
        uFresnel: { value: MODEL_FRESNEL },
        uRimIntensity: { value: RIM_INTENSITY },
        uRimPower: { value: RIM_POWER },
        uRimStart: { value: RIM_START },
      },
      vertexShader: GL_VERT,
      fragmentShader: GL_FRAG,
      transparent: true,
      side: THREE.FrontSide,
    });

    const glassMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.55, 1.55, 1.55),
      glassMat,
    );
    glScene.add(glassMesh);
    let targetObject = glassMesh;

    // Load the selected model
    import('three/examples/jsm/loaders/GLTFLoader').then(({ GLTFLoader }) => {
      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        gltf => {
          console.log('GLB loaded successfully:', modelPath);
          const box = new THREE.Box3().setFromObject(gltf.scene);
          const size = box.getSize(new THREE.Vector3()).length();
          const cnt = box.getCenter(new THREE.Vector3());

          // Apply position from config
          gltf.scene.position.set(
            modelConfig.position.x - cnt.x,
            modelConfig.position.y - cnt.y,
            modelConfig.position.z - cnt.z
          );

          // Apply scale from config
          gltf.scene.scale.setScalar(modelConfig.scale);

          // Apply rotation from config
          gltf.scene.rotation.set(
            modelConfig.rotation.x,
            modelConfig.rotation.y,
            modelConfig.rotation.z
          );

          gltf.scene.traverse(child => {
            if (child.isMesh) {
              child.material = glassMat;
            }
          });
          glScene.remove(glassMesh);
          glScene.add(gltf.scene);
          targetObject = gltf.scene;
        },
        undefined,
        error => {
          console.error('Failed to load GLB:', error);
        }
      );
    });

    const envLight = new THREE.PointLight(0xffffff, 3.0, 12);
    glScene.add(envLight);

    let postReady = false;
    const initPost = async () => {
      const [
        { EffectComposer },
        { RenderPass },
        { UnrealBloomPass },
        { ShaderPass },
        { HorizontalBlurShader },
        { VerticalBlurShader },
        { BokehPass },
        { SMAAPass },
      ] = await Promise.all([
        import('three/examples/jsm/postprocessing/EffectComposer'),
        import('three/examples/jsm/postprocessing/RenderPass'),
        import('three/examples/jsm/postprocessing/UnrealBloomPass'),
        import('three/examples/jsm/postprocessing/ShaderPass'),
        import('three/examples/jsm/shaders/HorizontalBlurShader'),
        import('three/examples/jsm/shaders/VerticalBlurShader'),
        import('three/examples/jsm/postprocessing/BokehPass'),
        import('three/examples/jsm/postprocessing/SMAAPass'),
      ]);

      if (disposed) return;

      composer = new EffectComposer(renderer);
      renderPass = new RenderPass(glScene, camera);
      composer.addPass(renderPass);

      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(mount.clientWidth, mount.clientHeight),
        BLOOM_STRENGTH,
        BLOOM_RADIUS,
        BLOOM_THRESHOLD
      );
      composer.addPass(bloomPass);

      if (GHOST_GLARE_ENABLED) {
        ghostGlarePass = new ShaderPass(GhostGlareShader);
        composer.addPass(ghostGlarePass);
      }

      const chromaShader = {
        uniforms: {
          tDiffuse: { value: null },
          uAmount: { value: CHROMA_SHIFT },
          uAngle: { value: 0.6 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D tDiffuse;
          uniform float uAmount;
          uniform float uAngle;
          varying vec2 vUv;
          void main(){
            vec2 dir = vec2(cos(uAngle), sin(uAngle));
            vec2 off = dir * uAmount;
            float r = texture2D(tDiffuse, vUv + off).r;
            float g = texture2D(tDiffuse, vUv).g;
            float b = texture2D(tDiffuse, vUv - off).b;
            gl_FragColor = vec4(r,g,b,1.0);
          }
        `,
      };
      chromaPass = new ShaderPass(chromaShader);
      composer.addPass(chromaPass);

      hBlurPass = new ShaderPass(HorizontalBlurShader);
      vBlurPass = new ShaderPass(VerticalBlurShader);
      hBlurPass.uniforms.h.value = (LENS_BLUR / mount.clientWidth);
      vBlurPass.uniforms.v.value = (LENS_BLUR / mount.clientHeight);
      composer.addPass(hBlurPass);
      composer.addPass(vBlurPass);

      bokehPass = new BokehPass(glScene, camera, {
        focus: DOF_FOCUS,
        aperture: DOF_APERTURE,
        maxblur: DOF_MAX_BLUR,
        width: mount.clientWidth,
        height: mount.clientHeight,
      });
      composer.addPass(bokehPass);

      if (SMAA_ENABLED) {
        smaaPass = new SMAAPass(mount.clientWidth, mount.clientHeight);
        composer.addPass(smaaPass);
      }

      // Final blur with animated value
      finalHBlurPass = new ShaderPass(HorizontalBlurShader);
      finalVBlurPass = new ShaderPass(VerticalBlurShader);

      // Watch for CSS variable changes
      const updateBlur = () => {
        const blurValue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--final-blur')) || FINAL_BLUR_DEFAULT;
        if (finalHBlurPass && mount.clientWidth) {
          finalHBlurPass.uniforms.h.value = blurValue / mount.clientWidth;
        }
        if (finalVBlurPass && mount.clientHeight) {
          finalVBlurPass.uniforms.v.value = blurValue / mount.clientHeight;
        }
      };

      const observer = new MutationObserver(updateBlur);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

      composer.addPass(finalHBlurPass);
      composer.addPass(finalVBlurPass);

      ditherPass = new ShaderPass(DitherNoiseShader);
      composer.addPass(ditherPass);

      postReady = true;
      updateBlur();
    };
    initPost();

    const clock = new THREE.Clock();
    const SMOOTH_FACTOR = 0.08;
    let raf;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const t = clock.getElapsedTime();

      // Get mouse/gyro values
      const mx = mouseRef.current?.x ?? 0;
      const my = mouseRef.current?.y ?? 0;

      // Set target rotation:
      // mx moves model left/right (y-axis rotation)
      // my moves model up/down (x-axis rotation) - FIXED: now positive my = model looks down
      targetRotation.current = {
        x: my * 0.8, // Positive my = model rotates down (correct!)
        y: mx * 0.8
      };

      // Smooth interpolation for natural movement
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * SMOOTH_FACTOR;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * SMOOTH_FACTOR;

      if (targetObject) {
        targetObject.rotation.x = currentRotation.current.x;
        targetObject.rotation.y = currentRotation.current.y;
      }

      glassMesh.position.y = Math.sin(t * 0.5) * 0.06;

      envLight.position.set(Math.sin(t * 0.3) * 4, 2.5, Math.cos(t * 0.3) * 3);

      glassMat.uniforms.uTime.value = t;
      if (ditherPass) ditherPass.uniforms.uTime.value = t;

      bgTex.needsUpdate = true;
      renderer.setRenderTarget(fbo);
      renderer.render(mirrorScene, ortho);

      renderer.setRenderTarget(null);
      if (postReady && composer) composer.render();
      else renderer.render(glScene, camera);
    };
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(w, h);
      if (composer) composer.setSize(w, h);
      fbo.dispose(); fbo = mkFBO();
      glassMat.uniforms.uBuffer.value = fbo.texture;
      glassMat.uniforms.uRes.value.set(w, h);
      if (hBlurPass) hBlurPass.uniforms.h.value = (LENS_BLUR / w);
      if (vBlurPass) vBlurPass.uniforms.v.value = (LENS_BLUR / h);
      const blurValue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--final-blur')) || FINAL_BLUR_DEFAULT;
      if (finalHBlurPass) finalHBlurPass.uniforms.h.value = blurValue / w;
      if (finalVBlurPass) finalVBlurPass.uniforms.v.value = blurValue / h;
      if (bokehPass) {
        bokehPass.materialBokeh.uniforms.focus.value = DOF_FOCUS;
        bokehPass.materialBokeh.uniforms.aperture.value = DOF_APERTURE;
        bokehPass.materialBokeh.uniforms.maxblur.value = DOF_MAX_BLUR;
      }
      if (bloomPass) bloomPass.setSize(w, h);
      if (smaaPass) smaaPass.setSize(w, h);
    });
    ro.observe(mount);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      glassMat.dispose();
      fbo.dispose();
      bgTex.dispose();
      if (bloomPass && bloomPass.dispose) bloomPass.dispose();
      if (composer && composer.renderTarget1) {
        composer.renderTarget1.dispose();
        composer.renderTarget2.dispose();
      }
      if (smaaPass && smaaPass.dispose) smaaPass.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  }, [bgCanvasRef, modelPath, modelConfig]);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  );
});

// ─────────────────────────────────────────────────────────────────
//  Letterboxing component with glass effect on hover
//  HIDDEN on mobile devices
// ─────────────────────────────────────────────────────────────────
const Letterboxing = memo(function Letterboxing({ isMobile }) {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isFooterHovered, setIsFooterHovered] = useState(false);

  // Don't render on mobile
  if (isMobile) return null;

  const glassStyle = (isHovered) => ({
    height: '10vh',
    minHeight: '60px',
    background: isHovered
      ? 'rgba(20, 25, 35, 0.25)'
      : 'rgba(0, 0, 0, 0.95)',
    backdropFilter: isHovered
      ? 'blur(12px) saturate(180%)'
      : 'blur(2px)',
    WebkitBackdropFilter: isHovered
      ? 'blur(12px) saturate(180%)'
      : 'blur(2px)',
    border: isHovered
      ? '1px solid rgba(255, 255, 255, 0.25)'
      : '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: isHovered
      ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)'
      : 'none',
    color: isHovered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.45)',
    fontSize: 10,
    letterSpacing: '0.22em',
    padding: '10px 18px',
    textTransform: 'uppercase',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    opacity: 1,
    visibility: 'visible',
    transition: 'all 0.4s cubic-bezier(0.2, 0.9, 0.3, 1)',
    cursor: 'default',
    pointerEvents: 'auto',
  });

  const textStyle = (isHovered) => ({
    fontFamily: FONT_LETTERBOX_TITLE,
    opacity: 1,
    visibility: 'visible',
    textShadow: isHovered
      ? '0 2px 8px rgba(0, 0, 0, 0.5)'
      : 'none',
    transition: 'text-shadow 0.3s ease',
  });

  const subTextStyle = (isHovered) => ({
    fontFamily: FONT_LETTERBOX_SUBTITLE,
    opacity: isHovered ? 0.95 : 0.7,
    visibility: 'visible',
    textShadow: isHovered
      ? '0 2px 6px rgba(0, 0, 0, 0.4)'
      : 'none',
    transition: 'opacity 0.3s ease, text-shadow 0.3s ease',
  });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'transparent',
    }}>
      <div
        style={glassStyle(isHeaderHovered)}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
      >
        <span style={textStyle(isHeaderHovered)}>
          SYSTEM LOG — PLACEHOLDER CONTEXT / TRANSMISSION CHANNEL
        </span>
        <span style={subTextStyle(isHeaderHovered)}>
          STATUS: STABLE / ROUTE: BOLTFORGED / SEQ: 0049-A
        </span>
      </div>

      <div
        style={glassStyle(isFooterHovered)}
        onMouseEnter={() => setIsFooterHovered(true)}
        onMouseLeave={() => setIsFooterHovered(false)}
      >
        <span style={textStyle(isFooterHovered)}>
          ARCHIVE FEED — LONG FORM PLACEHOLDER TEXT
        </span>
        <span style={subTextStyle(isFooterHovered)}>
          SIGNAL QUALITY: STABLE / MODE: PASSIVE / LOCK: ENABLED
        </span>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────
//  DynamicShadowText with emission - FIXED for contrast drop shadows
// ─────────────────────────────────────────────────────────────────
const DynamicShadowText = memo(function DynamicShadowText({ children, style, level = 'title' }) {
  const ref = useRef(null);
  const mouseRef = useContext(MouseContext);

  const shadowIntensity = level === 'title' ? TITLE_SHADOW_INTENSITY : SUBTITLE_SHADOW_INTENSITY;
  const shadowBlur = level === 'title' ? TITLE_SHADOW_BLUR : SUBTITLE_SHADOW_BLUR;
  const shadowDistance = level === 'title' ? TITLE_SHADOW_DISTANCE : SUBTITLE_SHADOW_DISTANCE;

  useEffect(() => {
    let raf;
    const loop = () => {
      if (ref.current && mouseRef.current) {
        const mx = mouseRef.current.x || 0;
        const my = mouseRef.current.y || 0;

        // Base shadow that follows cursor for contrast
        const shadowX = mx * shadowDistance;
        const shadowY = my * shadowDistance;

        // Get emission value for glow
        const emission = parseFloat(getComputedStyle(ref.current).getPropertyValue('--emission')) || 0;

        // Enhanced text shadow with contrast and emission
        ref.current.style.textShadow = `
          ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowIntensity}),
          ${shadowX * 0.3}px ${shadowY * 0.3}px ${shadowBlur * 0.5}px rgba(0,0,0,${shadowIntensity * 0.5}),
          0 0 ${15 + emission * 8}px rgba(140,80,255,${0.4 + emission * 0.15}),
          0 0 ${30 + emission * 15}px rgba(140,80,255,${0.25 + emission * 0.1})
        `;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mouseRef, shadowIntensity, shadowBlur, shadowDistance]);

  return (
    <span ref={ref} style={style}>
      {children}
    </span>
  );
});

// ─────────────────────────────────────────────────────────────────
//  TitleTarget - Component that makes the title hoverable
// ─────────────────────────────────────────────────────────────────
const TitleTarget = memo(function TitleTarget({ children }) {
  return (
    <div
      className="title-target"
      style={{
        display: 'inline-block',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 30,
        pointerEvents: 'auto',
      }}
    >
      {children}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────
//  Landing — public component with Preloader and TargetCursor
// ─────────────────────────────────────────────────────────────────
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

  // Add refresh on resize/orientation change
  useRefreshOnResize();

  // Set initial CSS variable for blur
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

  // Responsive font sizes based on screen width
  const titleFontSize = isMobile ? 'clamp(32px, 8vw, 60px)' : 'clamp(36px, 6vw, 80px)';
  const subtitleFontSize = isMobile ? 'clamp(12px, 4vw, 20px)' : '15px';
  const preTitleFontSize = isMobile ? 'clamp(8px, 3vw, 14px)' : '11px';

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
          @font-face {
            font-family: "BL Melody Bold";
            src: url("/src/assets/fonts/BLMelody-Bold.otf") format("opentype");
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "BL Melody ExtraLight";
            src: url("/src/assets/fonts/BLMelody-ExtraLight.otf") format("opentype");
            font-weight: 200;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "BL Melody Mono Bold";
            src: url("/src/assets/fonts/BLMelodyMono-Bold.otf") format("opentype");
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "BL Melody Mono ExtraLight";
            src: url("/src/assets/fonts/BLMelodyMono-ExtraLight.otf") format("opentype");
            font-weight: 200;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "TRTCENZODEMO-ExtraBold";
            src: url("/src/assets/fonts/TRTCENZODEMO-ExtraBold.ttf") format("truetype");
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

          .title-target {
            display: inline-block;
            cursor: pointer;
            position: relative;
            zIndex: 30;
            pointerEvents: auto;
          }
        `}</style>

        {/* Preloader */}
        <Preloader
          duration={preloaderDuration}
          onLoadComplete={handleLoadComplete}
        />

        {/* Layer 0 — ColorBends */}
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

        {/* Layer 1 — vignette */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,.68) 100%)',
        }} />

        {/* Layer 2 — Glass mesh - only render when canvas is ready */}
        {isCanvasReady && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
            <FluidGlass bgCanvasRef={bgCanvasRef} />
          </div>
        )}

        {/* Layer 3 — UI with left-aligned text */}
        <BacklitText style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '1200px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: isMobile ? 16 : 24,
          color: 'rgba(255,255,255,1)',
          mixBlendMode: isMobile ? 'normal' : 'screen',
          filter: 'none',
          padding: '0 20px',
        }}>
          <div style={{ pointerEvents: 'auto', width: '100%' }}>
            <span style={{
              fontSize: preTitleFontSize,
              letterSpacing: '0.55em',
              color: 'rgba(255,255,255,0.25)',
              textTransform: 'uppercase',
              textShadow: '0 0 30px rgba(140,80,255,0.4), 0 4px 8px rgba(0,0,0,0.8)',
              marginBottom: 8,
              fontWeight: 300,
              fontFamily: FONT_SUBTITLE,
              display: 'block',
              textAlign: 'left',
            }}>
              We present to you
            </span>

            {/* Title with cursor target */}
            <TitleTarget>
              <DynamicShadowText level="title" style={{
                fontWeight: 800,
                fontSize: titleFontSize,
                letterSpacing: '0.22em',
                color: 'rgba(255,255,255,1)',
                textTransform: 'uppercase',
                margin: 0,
                lineHeight: 1.2,
                fontFamily: FONT_TITLE,
                display: 'block',
                textAlign: 'left',
              }}>
                BOLTFORGED
              </DynamicShadowText>
            </TitleTarget>

            <DynamicShadowText level="subtitle" style={{
              fontSize: subtitleFontSize,
              letterSpacing: '0.45em',
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
              textAlign: 'left',
            }}>
              House of Creatives
            </DynamicShadowText>
          </div>
        </BacklitText>

        {/* Corner brackets - hidden on mobile */}
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

        {/* Layer 4 — Letterboxing with glass effect (hidden on mobile) */}
        <Letterboxing isMobile={isMobile} />

        {/* TargetCursor - only on desktop */}
        {sceneLoaded && !isMobile && (
          <TargetCursor
            targetSelector=".title-target"
            spinDuration={5}
            hoverDuration={0.2}
            parallaxOn={true}
            labelText="BOLTFORGED"
          />
        )}
      </div>
    </MouseProvider>
  );
}