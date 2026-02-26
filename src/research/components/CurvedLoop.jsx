import { useState, useRef, useCallback, useEffect, useMemo, useId } from "react";
import { useResizeObserver } from "../hooks/useResizeObserver.js";
import { useMobileDetect } from "../hooks/useMobileDetect.js";

export const CurvedLoop = ({ 
  marqueeText = '', 
  speed = 2, 
  curveAmount = 400, 
  direction = 'left', 
  interactive = true, 
  opacity = 0.12 
}) => {
  const uid = useId();
  const pathId = `curve-${uid.replace(/:/g, '')}`;
  const { isMobile } = useMobileDetect();

  const text = useMemo(() => marqueeText.replace(/\s+$/, '') + '\u00A0', [marqueeText]);

  const svgRef = useRef(null);
  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const containerRef = useRef(null);
  const spacingRef = useRef(0);
  const offsetRef = useRef(0);
  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef(null);
  const [ready, setReady] = useState(false);

  const pathD = isMobile
    ? `M-100,40 Q500,${40 + curveAmount * 0.6} 1540,40`
    : `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const totalTextRef = useRef('');

  const measureAndPrime = useCallback(() => {
    const m = measureRef.current;
    const svg = svgRef.current;
    if (!m || !svg) return false;

    // Force a reflow on iOS
    m.getBBox();
    
    const spacing = m.getComputedTextLength();
    const rect = svg.getBoundingClientRect();
    if (!spacing || !rect.width) return false;

    spacingRef.current = spacing;
    offsetRef.current = -spacing;
    
    // Calculate required text length more efficiently
    const requiredLength = Math.ceil((rect.width + 600) / spacing) + 4;
    totalTextRef.current = Array(requiredLength).fill(text).join('');
    
    setReady(true);
    return true;
  }, [text]);

  // Separate animation effect
  useEffect(() => {
    if (!ready) return undefined;

    const step = (now) => {
      if (!dragRef.current && textPathRef.current && spacingRef.current) {
        const dt = lastTimeRef.current ? Math.min(2.5, (now - lastTimeRef.current) / 16.6667) : 1;
        
        // Smoother delta calculation
        const baseDelta = (dirRef.current === "right" ? speed : -speed) * dt;
        let o = offsetRef.current + baseDelta;
        
        // Use while loop for better wrap-around
        while (o <= -spacingRef.current) {
          o += spacingRef.current;
        }
        while (o > 0) {
          o -= spacingRef.current;
        }
        
        offsetRef.current = o;
        
        // Use requestAnimationFrame to batch DOM updates
        if (textPathRef.current) {
          textPathRef.current.setAttribute("startOffset", `${o}px`);
        }
      }
      lastTimeRef.current = now;
      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [ready, speed]);

  // Resize observer with debounce for iOS
  useEffect(() => {
    let timeoutId;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        measureAndPrime();
      }, 100);
    };

    const observer = new ResizeObserver(handleResize);
    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [measureAndPrime]);

  // Touch event handlers with passive option for iOS
  const onPointerDown = useCallback((e) => {
    if (!interactive) return;
    e.preventDefault(); // Prevent default touch behavior
    dragRef.current = true;
    lastXRef.current = e.clientX || (e.touches && e.touches[0].clientX);
    velRef.current = 0;
    
    // Cancel animation frame during drag for smoother interaction
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    if (e.currentTarget.setPointerCapture) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  }, [interactive]);

  const onPointerMove = useCallback((e) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    e.preventDefault();
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (!clientX) return;
    
    const dx = clientX - lastXRef.current;
    lastXRef.current = clientX;
    velRef.current = dx * 0.5; // Smooth velocity
    
    let o = offsetRef.current + dx;
    
    // Efficient wrap-around
    while (o <= -spacingRef.current) {
      o += spacingRef.current;
    }
    while (o > 0) {
      o -= spacingRef.current;
    }
    
    offsetRef.current = o;
    textPathRef.current.setAttribute('startOffset', o + 'px');
  }, [interactive]);

  const endDrag = useCallback(() => {
    if (!interactive || !dragRef.current) return;
    dragRef.current = false;
    
    // Update direction based on velocity
    if (Math.abs(velRef.current) > 0.5) {
      dirRef.current = velRef.current > 0 ? 'right' : 'left';
    }
    
    // Restart animation
    lastTimeRef.current = 0;
    if (ready) {
      animationFrameRef.current = requestAnimationFrame(function step(now) {
        if (!dragRef.current && textPathRef.current && spacingRef.current) {
          const dt = lastTimeRef.current ? Math.min(2.5, (now - lastTimeRef.current) / 16.6667) : 1;
          const delta = (dirRef.current === "right" ? speed : -speed) * dt;
          let o = offsetRef.current + delta;
          
          while (o <= -spacingRef.current) {
            o += spacingRef.current;
          }
          while (o > 0) {
            o -= spacingRef.current;
          }
          
          offsetRef.current = o;
          textPathRef.current.setAttribute("startOffset", `${o}px`);
        }
        lastTimeRef.current = now;
        animationFrameRef.current = requestAnimationFrame(step);
      });
    }
  }, [interactive, ready, speed]);

  // iOS specific optimizations
  useEffect(() => {
    if (isMobile && containerRef.current) {
      // Add passive: false to allow preventDefault
      const options = { passive: false };
      
      containerRef.current.addEventListener('touchstart', onPointerDown, options);
      containerRef.current.addEventListener('touchmove', onPointerMove, options);
      containerRef.current.addEventListener('touchend', endDrag, options);
      containerRef.current.addEventListener('touchcancel', endDrag, options);
      
      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener('touchstart', onPointerDown);
          containerRef.current.removeEventListener('touchmove', onPointerMove);
          containerRef.current.removeEventListener('touchend', endDrag);
          containerRef.current.removeEventListener('touchcancel', endDrag);
        }
      };
    }
  }, [isMobile, onPointerDown, onPointerMove, endDrag]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        cursor: interactive ? (isMobile ? 'pointer' : 'grab') : 'auto',
        visibility: ready ? 'visible' : 'hidden',
        touchAction: 'pan-y pinch-zoom', // Keep vertical scroll
        WebkitTouchCallout: 'none', // Disable iOS callout
        WebkitUserSelect: 'none', // Disable selection on iOS
      }}
      onPointerDown={!isMobile ? onPointerDown : undefined}
      onPointerMove={!isMobile ? onPointerMove : undefined}
      onPointerUp={!isMobile ? endDrag : undefined}
      onPointerLeave={!isMobile ? endDrag : undefined}
    >
      <svg
        ref={svgRef}
        style={{
          userSelect: 'none',
          width: '100%',
          aspectRatio: '100/12',
          overflow: 'visible',
          display: 'block',
          fontSize: isMobile ? '2rem' : '3.5rem',
          fill: '#ffffff',
          fontWeight: 700,
          textTransform: 'uppercase',
          lineHeight: 1,
          opacity,
          transform: 'translateZ(0)', // Force GPU acceleration
          WebkitBackfaceVisibility: 'hidden', // iOS optimization
        }}
        viewBox="0 0 1440 120"
      >
        <text 
          ref={measureRef} 
          xmlSpace="preserve" 
          style={{ 
            visibility: 'hidden', 
            opacity: 0, 
            pointerEvents: 'none',
            fontSize: isMobile ? '2rem' : '3.5rem', // Match main text size
          }}
        >
          {text}
        </text>
        <defs>
          <path id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text 
            fontWeight="bold" 
            xmlSpace="preserve"
            style={{
              transform: 'translateZ(0)', // GPU acceleration
            }}
          >
            <textPath 
              ref={textPathRef} 
              href={`#${pathId}`} 
              startOffset={offsetRef.current + 'px'} 
              xmlSpace="preserve"
            >
              {totalTextRef.current}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};