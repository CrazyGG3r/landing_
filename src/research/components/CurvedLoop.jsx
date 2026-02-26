import { useState, useRef, useCallback, useEffect, useMemo, useId } from "react";  // Already has useId
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
  const spacingRef = useRef(0);
  const offsetRef = useRef(0);
  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);
  const lastTimeRef = useRef(0);
  const [ready, setReady] = useState(false);

  const pathD = isMobile
    ? `M-100,40 Q500,${40 + curveAmount * 0.6} 1540,40`
    : `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const totalTextRef = useRef('');

  const measureAndPrime = useCallback(() => {
    const m = measureRef.current;
    const svg = svgRef.current;
    if (!m || !svg) return false;

    const spacing = m.getComputedTextLength();
    const rect = svg.getBoundingClientRect();
    if (!spacing || !rect.width) return false;

    spacingRef.current = spacing;
    offsetRef.current = -spacing;
    totalTextRef.current = Array(Math.ceil((rect.width + 600) / spacing) + 4).fill(text).join('');
    setReady(true);
    return true;
  }, [text]);

  useEffect(() => {
    let frame;
    const started = measureAndPrime();
    if (!started) return undefined;

    const step = now => {
      if (!dragRef.current && textPathRef.current && spacingRef.current) {
        const dt = lastTimeRef.current ? Math.min(2.5, (now - lastTimeRef.current) / 16.6667) : 1;
        const delta = (dirRef.current === "right" ? speed : -speed) * dt;
        let o = offsetRef.current + delta;
        if (o <= -spacingRef.current) o += spacingRef.current;
        if (o > 0) o -= spacingRef.current;
        offsetRef.current = o;
        textPathRef.current.setAttribute("startOffset", `${o}px`);
      }
      lastTimeRef.current = now;
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [measureAndPrime, speed]);

  useResizeObserver(svgRef, () => {
    measureAndPrime();
  });

  const onPointerDown = e => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = e => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    let o = offsetRef.current + dx;
    if (o <= -spacingRef.current) o += spacingRef.current;
    if (o > 0) o -= spacingRef.current;
    offsetRef.current = o;
    textPathRef.current.setAttribute('startOffset', o + 'px');
  };

  const endDrag = () => {
    if (!interactive || !dragRef.current) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  return (
    <div
      style={{
        width: '100%',
        cursor: interactive ? (isMobile ? 'pointer' : 'grab') : 'auto',
        visibility: ready ? 'visible' : 'hidden',
        touchAction: 'pan-y pinch-zoom',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onTouchStart={isMobile ? onPointerDown : undefined}
      onTouchMove={isMobile ? onPointerMove : undefined}
      onTouchEnd={isMobile ? endDrag : undefined}
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
          opacity
        }}
        viewBox="0 0 1440 120"
      >
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>{text}</text>
        <defs>
          <path id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text fontWeight="bold" xmlSpace="preserve">
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offsetRef.current + 'px'} xmlSpace="preserve">
              {totalTextRef.current}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};