import React, { useEffect, useRef } from 'react';

// ============================================
// UTILITY FUNCTIONS
// ============================================
const spring = (cur, vel, target, k, fric) => {
  const acc = (target - cur) * k;
  const newVel = (vel + acc) * (1 - fric);
  return { val: cur + newVel, vel: newVel };
};

const getTargetDist = (d, maxD, minVal, maxVal) => {
  const t = Math.min(1, d / maxD);
  return maxVal - t * (maxVal - minVal);
};

// ============================================
// TEXTPRESSURE COMPONENT
// ============================================
export default function TextPressure({ 
  text = '404 ERROR',
  colors = {
    text: '#ffffff',
    background: '#0a0a0a',
  },
  axes = {
    weight: true,
    width: true,
    italic: true,
  },
  physics = {
    enabled: true,
    repelRadius: 180,
    repelForce: 340,
    inertia: 0.82,
    springK: 0.058,
    baseMaxDisplace: 140,
    edgeFreedom: 0.35,
    collisionGap: 5,
    microStopThreshold: 0.02,
  },
  fontSpring = {
    stiffness: 18,
    friction: 0.22,
    weightRange: [700, 150],
    widthRange: [180, 40],
    italicRange: [0.9, 0.0],
  },
  animation = {
    introDuration: 0.7,
    introStagger: 0.03,
    introEase: 'elastic.out(1, 0.3)',
    mouseLerpDuration: 0.5,
  },
  features = {
    preventOverlap: true,
    dynamicSpringBack: true,
    preserveSpaces: true,
  },
  layout = {
    textScale: 0.1,
    centerAlign: true,
  },
  className = '',
  style = {},
}) {
  const stageRef = useRef(null);
  const titleRef = useRef(null);
  const touchActiveRef = useRef(false);
  const lastTouchPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // ============================================
    // MOBILE OPTIMIZATIONS
    // ============================================
    
    // Disable zoom, swipe, drag, select
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Prevent pinch zoom
    const preventPinchZoom = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Prevent double-tap zoom
    const preventDoubleTapZoom = (e) => {
      const now = Date.now();
      const DOUBLE_TAP_DELAY = 300;
      if (now - (window.lastTap || 0) < DOUBLE_TAP_DELAY) {
        e.preventDefault();
      }
      window.lastTap = now;
    };

    // Disable context menu (long press)
    const preventContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Add all event listeners for mobile
    document.addEventListener('touchstart', preventPinchZoom, { passive: false });
    document.addEventListener('touchmove', preventPinchZoom, { passive: false });
    document.addEventListener('touchend', preventPinchZoom, { passive: false });
    document.addEventListener('gesturestart', preventDefaults, { passive: false });
    document.addEventListener('gesturechange', preventDefaults, { passive: false });
    document.addEventListener('gestureend', preventDefaults, { passive: false });
    document.addEventListener('contextmenu', preventContextMenu);
    
    // Double-tap prevention
    document.addEventListener('touchstart', preventDoubleTapZoom, { passive: false });

    // Add CSS to prevent selection and dragging globally with proper centering
    const style = document.createElement('style');
    style.setAttribute('data-textpressure', 'true');
    style.textContent = `
      * {
        -webkit-touch-callout: none !important;
        -webkit-user-select: none !important;
        -webkit-tap-highlight-color: transparent !important;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      html, body {
        overscroll-behavior: none !important;
        position: fixed !important;
        width: 100% !important;
        height: 100% !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      body {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      #root {
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      /* Ensure all content stays centered */
      .textpressure-container {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 100vw !important;
        height: 100vh !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      /* Safe area insets for modern mobile devices */
      @supports (padding: max(0px)) {
        .textpressure-container {
          padding-left: max(0px, env(safe-area-inset-left));
          padding-right: max(0px, env(safe-area-inset-right));
          padding-top: max(0px, env(safe-area-inset-top));
          padding-bottom: max(0px, env(safe-area-inset-bottom));
        }
      }
    `;
    document.head.appendChild(style);

    // Handle orientation changes with perfect centering
    const handleOrientationChange = () => {
      // Small delay to let the browser finish orientation change
      setTimeout(() => {
        if (stageRef.current && titleRef.current) {
          const setFontSize = () => {
            const { width: sw, height: sh } = stageRef.current.getBoundingClientRect();
            // Adjust base calculation based on orientation
            const isLandscape = window.innerWidth > window.innerHeight;
            let baseMultiplier = text.length * (isLandscape ? 0.1 : 0.12);
            let ideal = Math.max(60, sw / baseMultiplier); // Reduced minimum for mobile
            
            // Apply scale factor
            ideal = ideal * layout.textScale;
            
            // Ensure text fits within viewport with padding
            const maxWidth = sw * 0.9; // 90% of screen width
            const maxHeight = sh * 0.4; // 40% of screen height for portrait, adjusted for landscape
            
            if (ideal > maxHeight) {
              ideal = maxHeight;
            }
            
            // Ensure text doesn't overflow width
            const tempSpan = document.createElement('span');
            tempSpan.style.fontSize = `${ideal}px`;
            tempSpan.style.fontFamily = "'Compressa VF', sans-serif";
            tempSpan.style.visibility = 'hidden';
            tempSpan.style.position = 'absolute';
            tempSpan.textContent = text;
            document.body.appendChild(tempSpan);
            const textWidth = tempSpan.getBoundingClientRect().width;
            document.body.removeChild(tempSpan);
            
            if (textWidth > maxWidth) {
              ideal = ideal * (maxWidth / textWidth);
            }
            
            // Use GSAP if available, otherwise direct style
            if (window.gsap) {
              window.gsap.set(titleRef.current, { fontSize: ideal, lineHeight: 0.8 });
            } else {
              titleRef.current.style.fontSize = `${ideal}px`;
              titleRef.current.style.lineHeight = '0.8';
            }
          };
          setFontSize();
        }
      }, 100);
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    // ============================================
    // Load GSAP from CDN
    // ============================================
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    script.async = true;
    
    script.onload = () => initializeAnimation();
    document.head.appendChild(script);

    function initializeAnimation() {
      const gsap = window.gsap;
      
      // Load the Compressa font
      const font = new FontFace(
        'Compressa VF',
        'url(https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2)'
      );

      font.load().then(() => {
        document.fonts.add(font);
        setupAnimation(gsap);
      }).catch(err => {
        console.warn('Font loading failed, using fallback', err);
        setupAnimation(gsap);
      });
    }

    function setupAnimation(gsap) {
      // ============================================
      // MOUSE/TOUCH TRACKING WITH PERSISTENCE
      // ============================================
      const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      
      // Use shorter lerp duration for mobile for more responsiveness
      const mobileLerpDuration = window.innerWidth < 768 ? 0.2 : animation.mouseLerpDuration;
      
      const mouseLerpX = gsap.quickTo(mouse, 'x', { 
        duration: mobileLerpDuration, 
        ease: 'power2.out' 
      });
      const mouseLerpY = gsap.quickTo(mouse, 'y', { 
        duration: mobileLerpDuration, 
        ease: 'power2.out' 
      });

      const handleMouseMove = (e) => {
        mouseLerpX(e.clientX);
        mouseLerpY(e.clientY);
      };

      const handleTouchStart = (e) => {
        touchActiveRef.current = true;
        const touch = e.touches[0];
        if (touch) {
          lastTouchPositionRef.current = { x: touch.clientX, y: touch.clientY };
          mouseLerpX(touch.clientX);
          mouseLerpY(touch.clientY);
        }
      };

      const handleTouchMove = (e) => {
        e.preventDefault(); // Prevent scrolling while touching
        const touch = e.touches[0];
        if (touch) {
          lastTouchPositionRef.current = { x: touch.clientX, y: touch.clientY };
          mouseLerpX(touch.clientX);
          mouseLerpY(touch.clientY);
        }
      };

      const handleTouchEnd = (e) => {
        touchActiveRef.current = false;
        // Gradually return to center when touch ends
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        gsap.to(mouse, {
          x: centerX,
          y: centerY,
          duration: 0.8,
          ease: 'power2.out',
          onUpdate: () => {
            mouseLerpX(mouse.x);
            mouseLerpY(mouse.y);
          }
        });
      };

      const handleTouchCancel = (e) => {
        touchActiveRef.current = false;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        gsap.to(mouse, {
          x: centerX,
          y: centerY,
          duration: 0.5,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchstart', handleTouchStart, { passive: false });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd, { passive: false });
      window.addEventListener('touchcancel', handleTouchCancel, { passive: false });

      // ============================================
      // CREATE CHARACTER SPANS - WITH SPACE PRESERVATION
      // ============================================
      const titleEl = titleRef.current;
      if (!titleEl) return;

      titleEl.innerHTML = '';
      
      const chars = [];
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const span = document.createElement('span');
        span.className = 'char';
        span.setAttribute('data-char', ch);
        
        // Handle space character specially
        if (ch === ' ' && features.preserveSpaces) {
          span.textContent = ' ';  // Keep the space
          span.style.minWidth = '0.3em';  // Give it some width
          span.style.opacity = '1';  // Make it visible as a space
        } else {
          span.textContent = ch;
        }
        
        span.style.display = 'inline-block';
        span.style.position = 'relative';
        span.style.willChange = 'transform, font-variation-settings';
        span.style.fontVariationSettings = "'wght' 400, 'wdth' 100, 'ital' 0";
        titleEl.appendChild(span);
        
        chars.push({
          span,
          index: i,
          isSpace: ch === ' ',  // Flag to identify spaces
          phys: { 
            x: 0, vx: 0, 
            wght: 400, vWght: 0, 
            wdth: 100, vWdth: 0, 
            ital: 0, vItal: 0 
          },
          setX: gsap.quickSetter(span, 'x', 'px'),
          setFVS: gsap.quickSetter(span, 'fontVariationSettings'),
        });
      }

      // ============================================
      // CALCULATE FREEDOM FACTORS (edge vs center)
      // ============================================
      const totalChars = chars.length;
      const centerIndex = (totalChars - 1) / 2;
      
      chars.forEach(c => {
        const distFromCenter = Math.abs(c.index - centerIndex);
        const maxDist = Math.max(centerIndex, totalChars - 1 - centerIndex);
        
        // Freedom factor: 1.0 at center, edgeFreedom at edges
        c.freedomFactor = Math.max(
          physics.edgeFreedom, 
          1.0 - (distFromCenter / maxDist) * (1.0 - physics.edgeFreedom)
        );
        
        c.maxDisp = physics.baseMaxDisplace * c.freedomFactor;
      });

      // ============================================
      // APPLY STYLES
      // ============================================
      const stage = stageRef.current;
      stage.style.backgroundColor = colors.background;

      // ============================================
      // RESPONSIVE FONT SIZE - WITH SCALE FACTOR AND ORIENTATION
      // ============================================
      const setFontSize = () => {
        const { width: sw, height: sh } = stage.getBoundingClientRect();
        const isLandscape = window.innerWidth > window.innerHeight;
        const isMobile = window.innerWidth < 768;
        
        // Adjust base calculation for different orientations and devices
        let baseMultiplier = text.length * (isLandscape ? 0.1 : 0.12);
        if (isMobile) {
          baseMultiplier = text.length * (isLandscape ? 0.15 : 0.18); // Smaller text on mobile
        }
        
        let ideal = Math.max(isMobile ? 40 : 80, sw / baseMultiplier);
        
        // Apply scale factor
        ideal = ideal * layout.textScale;
        
        // Ensure text fits within viewport with padding
        const maxWidth = sw * (isMobile ? 0.85 : 0.9);
        const maxHeight = sh * (isMobile ? 0.3 : 0.4);
        
        if (ideal > maxHeight) {
          ideal = maxHeight;
        }
        
        // Check width overflow
        const tempSpan = document.createElement('span');
        tempSpan.style.fontSize = `${ideal}px`;
        tempSpan.style.fontFamily = "'Compressa VF', sans-serif";
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.whiteSpace = 'nowrap';
        tempSpan.textContent = text;
        document.body.appendChild(tempSpan);
        const textWidth = tempSpan.getBoundingClientRect().width;
        document.body.removeChild(tempSpan);
        
        if (textWidth > maxWidth) {
          ideal = ideal * (maxWidth / textWidth);
        }
        
        gsap.set(titleEl, { fontSize: ideal, lineHeight: 0.8 });
      };
      setFontSize();

      // ============================================
      // ANIMATION LOOP CONSTANTS
      // ============================================
      const DT = 1 / 60;

      // ============================================
      // MAIN ANIMATION TICKER
      // ============================================
      const updateAnimation = () => {
        if (!chars.length) return;
        
        const m = mouse;
        const maxDist = Math.min(stage.offsetWidth * 0.45, 350);

        chars.forEach(c => {
          const rect = c.span.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = cx - m.x;
          const dy = cy - m.y;
          const dist = Math.hypot(dx, dy);

          // ============================================
          // FONT VARIATION - SKIP FOR SPACES
          // ============================================
          if (!c.isSpace) {
            let tWght = 400, tWdth = 100, tItal = 0;
            if (axes.weight) {
              tWght = getTargetDist(dist, maxDist, fontSpring.weightRange[0], fontSpring.weightRange[1]);
            }
            if (axes.width) {
              tWdth = getTargetDist(dist, maxDist, fontSpring.widthRange[0], fontSpring.widthRange[1]);
            }
            if (axes.italic) {
              tItal = getTargetDist(dist, maxDist, fontSpring.italicRange[0], fontSpring.italicRange[1]);
            }

            // Spring simulation for font axes
            const p = c.phys;
            const rW = spring(p.wght, p.vWght, tWght, fontSpring.stiffness * DT, fontSpring.friction);
            const rD = spring(p.wdth, p.vWdth, tWdth, fontSpring.stiffness * DT, fontSpring.friction);
            const rI = spring(p.ital, p.vItal, tItal, fontSpring.stiffness * DT, fontSpring.friction);

            p.wght = rW.val; p.vWght = rW.vel;
            p.wdth = rD.val; p.vWdth = rD.vel;
            p.ital = rI.val; p.vItal = rI.vel;

            c.setFVS(`'wght' ${Math.round(p.wght)}, 'wdth' ${Math.round(p.wdth)}, 'ital' ${p.ital.toFixed(2)}`);
          }

          // ============================================
          // PHYSICS: HORIZONTAL MOVEMENT
          // ============================================
          if (physics.enabled) {
            const rad = physics.repelRadius;
            const force = physics.repelForce * DT;

            if (dist < rad && dist > 2) {
              const str = (1 - dist / rad) * force;
              const dirX = dx / dist;
              c.phys.vx += dirX * str;
            }

            // Spring pull-back
            let springStrength = physics.springK;
            if (features.dynamicSpringBack && !c.isSpace) {
              springStrength *= (1 + (1 - c.freedomFactor) * 0.5);
            }
            c.phys.vx += -c.phys.x * springStrength;
            
            // Inertia damping
            c.phys.vx *= physics.inertia;
            
            // Micro-oscillation stop
            if (Math.abs(c.phys.vx) < physics.microStopThreshold && Math.abs(c.phys.x) < 0.5) {
              c.phys.vx = 0;
              c.phys.x = 0;
            }
            
            c.phys.x += c.phys.vx;
            
            // Apply position-based bounds
            c.phys.x = Math.min(c.maxDisp, Math.max(-c.maxDisp, c.phys.x));

            c.setX(c.phys.x);
          }
        });
        
        // ============================================
        // COLLISION PREVENTION
        // ============================================
        if (features.preventOverlap) {
          for (let i = 0; i < chars.length - 1; i++) {
            const c1 = chars[i];
            const c2 = chars[i + 1];
            
            if (c1.isSpace || c2.isSpace) continue;
            
            const rect1 = c1.span.getBoundingClientRect();
            const rect2 = c2.span.getBoundingClientRect();
            
            const gap = rect2.left - rect1.right;
            
            if (gap < physics.collisionGap) {
              const overlap = physics.collisionGap - gap;
              const push1 = overlap * 0.3;
              const push2 = overlap * 0.3;
              
              c1.phys.x -= push1;
              c2.phys.x += push2;
              
              c1.phys.x = Math.min(c1.maxDisp, Math.max(-c1.maxDisp, c1.phys.x));
              c2.phys.x = Math.min(c2.maxDisp, Math.max(-c2.maxDisp, c2.phys.x));
              
              c1.setX(c1.phys.x);
              c2.setX(c2.phys.x);
            }
          }
        }
      };

      // ============================================
      // START ANIMATION
      // ============================================
      gsap.ticker.add(updateAnimation);

      // Intro animation
      gsap.set(chars.map(c => c.span), { opacity: 0, y: 8 });
      gsap.to(chars.map(c => c.span), {
        opacity: 1,
        y: 0,
        duration: animation.introDuration,
        stagger: { each: animation.introStagger, from: 'center' },
        ease: animation.introEase,
      });

      // ============================================
      // RESIZE HANDLER
      // ============================================
      const handleResize = () => {
        setFontSize();
      };
      window.addEventListener('resize', handleResize);

      // ============================================
      // CLEANUP
      // ============================================
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('touchcancel', handleTouchCancel);
        window.removeEventListener('resize', handleResize);
        gsap.ticker.remove(updateAnimation);
        gsap.killTweensOf('*');
      };
    }

    // ============================================
    // CLEANUP FUNCTION
    // ============================================
    return () => {
      // Remove script
      const script = document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"]');
      if (script) document.head.removeChild(script);
      
      // Remove style
      const style = document.querySelector('style[data-textpressure]');
      if (style) document.head.removeChild(style);
      
      // Remove event listeners
      document.removeEventListener('touchstart', preventPinchZoom);
      document.removeEventListener('touchmove', preventPinchZoom);
      document.removeEventListener('touchend', preventPinchZoom);
      document.removeEventListener('gesturestart', preventDefaults);
      document.removeEventListener('gesturechange', preventDefaults);
      document.removeEventListener('gestureend', preventDefaults);
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('touchstart', preventDoubleTapZoom);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, [text, colors, axes, physics, fontSpring, animation, features, layout]);

  // ============================================
  // RENDER
  // ============================================
  return (
    <div
      ref={stageRef}
      className={`textpressure-container ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: colors.background,
        color: "white",
        fontFamily: "system-ui",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        ...style,
      }}
    >
      <h1
        ref={titleRef}
        style={{
          fontFamily: "'Compressa VF', sans-serif",
          fontWeight: 100,
          textTransform: "uppercase",
          lineHeight: 0.8,
          margin: 0,
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          width: "100%",
          textAlign: layout.centerAlign ? "center" : "left",
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: layout.centerAlign ? "center" : "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
          color: colors.text,
          gap: '0.1em',
          pointerEvents: 'none',
          transform: 'translateZ(0)', // Force hardware acceleration
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        {text}
      </h1>
    </div>
  );
}