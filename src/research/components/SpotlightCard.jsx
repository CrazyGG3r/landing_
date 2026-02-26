import { useRef, useCallback } from "react";
import { useMobileDetect } from "../hooks/useMobileDetect.js";

export const SpotlightCard = ({ children, spotlightColor = "rgba(0,229,255,0.15)", style, className = "" }) => {
  const divRef = useRef(null);
  const { isMobile } = useMobileDetect();

  const onMouseMove = useCallback(e => {
    if (isMobile) return;
    const rect = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    divRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  }, [spotlightColor, isMobile]);

  return <div ref={divRef} onMouseMove={onMouseMove} className={`card-spotlight ${className}`} style={style}>{children}</div>;
};