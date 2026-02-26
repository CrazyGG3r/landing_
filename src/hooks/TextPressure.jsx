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

  useEffect(() => {
    // Load GSAP from CDN
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
      // MOUSE TRACKING
      // ============================================
      const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const mouseLerpX = gsap.quickTo(mouse, 'x', { 
        duration: animation.mouseLerpDuration, 
        ease: 'power2.out' 
      });
      const mouseLerpY = gsap.quickTo(mouse, 'y', { 
        duration: animation.mouseLerpDuration, 
        ease: 'power2.out' 
      });

      const handleMouseMove = (e) => {
        mouseLerpX(e.clientX);
        mouseLerpY(e.clientY);
      };

      const handleTouchMove = (e) => {
        const touch = e.touches[0];
        if (touch) {
          mouseLerpX(touch.clientX);
          mouseLerpY(touch.clientY);
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });

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
      document.body.style.backgroundColor = colors.background;

      // ============================================
      // RESPONSIVE FONT SIZE - WITH SCALE FACTOR
      // ============================================
      const setFontSize = () => {
        const { width: sw } = stage.getBoundingClientRect();
        // Base size calculation - adjusted for better spacing
        let ideal = Math.max(100, sw / (text.length * 0.08));
        // Apply scale factor
        ideal = ideal * layout.textScale;
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
          // PHYSICS: HORIZONTAL MOVEMENT (apply to all chars including spaces)
          // ============================================
          if (physics.enabled) {
            const rad = physics.repelRadius;
            const force = physics.repelForce * DT;

            if (dist < rad && dist > 2) {
              const str = (1 - dist / rad) * force;
              const dirX = dx / dist;
              c.phys.vx += dirX * str;
            }

            // Spring pull-back (with optional dynamic adjustment for edge letters)
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
        // COLLISION PREVENTION - SKIP SPACES
        // ============================================
        if (features.preventOverlap) {
          for (let i = 0; i < chars.length - 1; i++) {
            const c1 = chars[i];
            const c2 = chars[i + 1];
            
            // Skip collision prevention if either is a space
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
              
              // Re-apply bounds
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
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('resize', handleResize);
        gsap.ticker.remove(updateAnimation);
        gsap.killTweensOf('*');
      };
    }

    // Cleanup script tag
    return () => {
      const script = document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"]');
      if (script) document.head.removeChild(script);
    };
  }, [text, colors, axes, physics, fontSpring, animation, features, layout]);

  // ============================================
  // RENDER
  // ============================================
  return (
    <div
      ref={stageRef}
      className={className}
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: colors.background,
        color: "white",
        fontFamily: "system-ui",
        overflow: "hidden",
        position: "relative",
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
          width: "100%",
          textAlign: layout.centerAlign ? "center" : "left",
          display: "flex",
          justifyContent: layout.centerAlign ? "center" : "space-between",
          position: "relative",
          zIndex: 10,
          color: colors.text,
          gap: '0.1em',
        }}
      >
        {text}
      </h1>
    </div>
  );
}