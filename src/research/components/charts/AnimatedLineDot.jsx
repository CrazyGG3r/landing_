import { useState, useEffect, useId } from "react";  // Added useId here
import { useMobileDetect } from "../../hooks/useMobileDetect.js";
import { T } from "../../constants/designTokens.js";

export const AnimatedLineDot = ({ cx, cy, fill, ready, index = 0 }) => {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const { isMobile } = useMobileDetect();
  const uid = useId();  // Now this will work
  const id = `dot-glow-${uid.replace(/:/g, '')}`;

  useEffect(() => {
    if (!ready) { setVisible(false); return; }
    const id = setTimeout(() => setVisible(true), T.dotRevealMs + index * T.dotRevealStepMs);
    return () => clearTimeout(id);
  }, [ready, index]);

  const handleMouseEnter = isMobile ? undefined : () => setHovered(true);
  const handleMouseLeave = isMobile ? undefined : () => setHovered(false);

  return (
    <g onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <defs>
        <filter id={id} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx={cx} cy={cy} r={10} fill="transparent" />
      <circle 
        cx={cx} 
        cy={cy} 
        r={isMobile ? (visible ? 3 : 0) : (hovered ? 5 : (visible ? 3 : 0))} 
        fill={hovered ? "#ffffff" : fill} 
        filter={hovered ? `url(#${id})` : undefined} 
        style={{ transition: "r 0.3s cubic-bezier(0.34,1.56,0.64,1), fill 0.2s ease" }} 
      />
    </g>
  );
};