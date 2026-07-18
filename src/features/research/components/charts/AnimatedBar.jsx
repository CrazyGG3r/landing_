import { useState, useEffect } from "react";
import { T } from "../../constants/designTokens.js";

export const AnimatedBar = ({ x, y, width, height, fill, ready, isActive }) => {
  const [displayed, setDisplayed] = useState(0);
  const [risen, setRisen] = useState(false);
  const filterId = `bar-glow-${Math.round(x)}`;
  useEffect(() => {
    if (!ready || risen) return;
    const delay = (x / 900) * T.chartBarStaggerMs;
    const id = setTimeout(() => { setDisplayed(height); setRisen(true); }, delay);
    return () => clearTimeout(id);
  }, [ready, height, risen, x]);
  return (
    <g>
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect
        x={x} y={y + height - displayed} width={width} height={displayed} rx={3}
        fill={isActive ? (fill === "#4a4a4a" ? "#888888" : "#bbbbbb") : fill}
        filter={isActive ? `url(#${filterId})` : undefined}
        style={{ transition: risen ? "fill 0.2s ease, filter 0.2s ease" : "height 0.65s cubic-bezier(0.34,1.1,0.64,1), y 0.65s cubic-bezier(0.34,1.1,0.64,1)" }}
      />
    </g>
  );
};