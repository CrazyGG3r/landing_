import { useState, useCallback, useRef } from "react";
import { T } from "../../constants/designTokens.js";
import { useResizeObserver } from "../../hooks/useResizeObserver.js";
import { useMobileDetect } from "../../hooks/useMobileDetect.js";

const LINE_GAP = 18, PADDING = 14;

export const StatCard = ({ value, label, sub }) => {
  const [hovered, setHovered] = useState(false);
  const [idleSize, setIdleSize] = useState("3rem");
  const outerRef = useRef(null);
  const { isMobile } = useMobileDetect();

  const onResize = useCallback(({ width, height }) => {
    const innerW = width - (LINE_GAP + PADDING) * 2;
    const innerH = height - (LINE_GAP + PADDING) * 2;
    const size = Math.floor(Math.min(innerW / (value.length * 0.62), innerH * 0.72));
    setIdleSize(`${Math.min(size, isMobile ? 32 : 48)}px`);
  }, [value, isMobile]);

  useResizeObserver(outerRef, onResize);

  const shouldShowDetails = isMobile ? true : hovered;
  const textTransform = isMobile ? "none" : (hovered ? "translateY(-10px) scale(0.94)" : "translateY(0px) scale(1)");
  const detailsTransform = isMobile ? "translateY(0px)" : (hovered ? "translateY(0px)" : "translateY(10px)");
  const detailsOpacity = isMobile ? 1 : (hovered ? 1 : 0);
  const cardTransform = isMobile ? "none" : (hovered ? "translateY(-3px)" : "translateY(0)");

  return (
    <div
      ref={outerRef}
      className="outer"
      style={{
        flex: 1,
        minWidth: isMobile ? "140px" : "180px",
        width: isMobile ? "calc(50% - 10px)" : "auto",
        transform: cardTransform,
        transition: isMobile ? "none" : "transform 0.28s cubic-bezier(0.2,0.7,0.2,1)",
        willChange: "transform"
      }}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
    >
      <div className="dot" style={{ opacity: isMobile ? 0 : undefined }} />
      <div className="card">
        <div className="ray" />
        <div className="line topl" />
        <div className="line bottoml" />
        <div className="line leftl" />
        <div className="line rightl" />
        <div
          className="text"
          style={{
            fontSize: idleSize,
            transform: textTransform,
            transformOrigin: "center center",
            transition: isMobile ? "none" : "transform 0.35s cubic-bezier(0.34,1.2,0.64,1)",
            willChange: "transform"
          }}
        >
          {value}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "18px" : "28px",
            left: 0,
            right: 0,
            textAlign: "center",
            padding: "0 10px",
            opacity: detailsOpacity,
            transform: detailsTransform,
            transition: isMobile ? "none" : "opacity 0.3s ease 0.02s, transform 0.3s cubic-bezier(0.34,1.2,0.64,1)",
            willChange: "opacity, transform",
            ...(isMobile && {
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(4px)",
              borderRadius: "6px",
              margin: "0 8px",
              bottom: "12px",
              padding: "6px 4px",
            })
          }}
        >
          <div
            style={{
              fontSize: isMobile ? "9px" : "11px",
              fontWeight: "700",
              color: "#aaa",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: T.fontSans
            }}
          >
            {label}
          </div>
          {sub && (
            <div
              style={{
                fontSize: isMobile ? "8px" : "10px",
                color: T.white,
                marginTop: "3px",
                fontFamily: T.fontSans
              }}
            >
              {sub}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};