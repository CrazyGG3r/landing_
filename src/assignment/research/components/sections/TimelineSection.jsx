import { useState, useCallback, useEffect, useRef } from "react";
import { T, cardBase } from "../../constants/designTokens.js";
import { TIMELINE_DATA } from "../../constants/data.js";
import { useMobileDetect } from "../../hooks/useMobileDetect.js";
import { SpotlightCard } from "../SpotlightCard.jsx";
import { SectionEyebrow } from "../ui/SectionEyebrow.jsx";
import { SectionSub } from "../ui/SectionSub.jsx";

export const TimelineSection = ({ sectionRef }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const fadeTimer = useRef(null);
  const { isMobile } = useMobileDetect();

  const handleSelect = useCallback(i => {
    if (i === activeIdx) return;
    setFading(true);
    clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => {
      setDisplayIdx(i);
      setFading(false);
    }, 180);
    setActiveIdx(i);
  }, [activeIdx]);

  useEffect(() => () => clearTimeout(fadeTimer.current), []);

  const current = TIMELINE_DATA[displayIdx];

  return (
    <div ref={sectionRef} id="timeline-section">
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: isMobile ? "40px 16px" : "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "56px" }}>
          <SectionEyebrow>Historical Context</SectionEyebrow>
          <h2 className="heading-text" style={{ fontSize: "clamp(22px,3vw,30px)", marginBottom: "10px", lineHeight: 1.2 }}>Five Decades of Optimization</h2>
          <SectionSub>Select an era to explore how the field evolved.</SectionSub>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          marginBottom: isMobile ? "24px" : "36px",
          padding: "0 10px",
          overflowX: isMobile ? "auto" : "visible",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
          <style>{`
            div[style*="overflowX: auto"]::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div style={{ position: "absolute", left: "10px", right: "10px", top: "50%", height: "1px", background: "#1e2020", zIndex: 0 }} />
          <div style={{ position: "absolute", left: "10px", top: "50%", height: "1px", background: "linear-gradient(90deg,rgba(255,255,255,0.3),rgba(255,255,255,0.08))", zIndex: 0, width: `${(activeIdx / (TIMELINE_DATA.length - 1)) * 100}%`, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)", maxWidth: "calc(100% - 20px)" }} />
          {TIMELINE_DATA.map((t, i) => (
            <div
              key={i}
              onClick={() => handleSelect(i)}
              className={`tl-dot${activeIdx === i ? " active" : ""}`}
              style={{
                zIndex: 1,
                position: "relative",
                width: isMobile ? "40px" : "56px",
                height: isMobile ? "40px" : "56px",
                borderRadius: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: activeIdx === i ? "scale(1)" : "scale(0.78)",
                transformOrigin: "center center",
                background: activeIdx === i ? "radial-gradient(circle at 30% 30%,#3a3c3c,#0c0d0d)" : "radial-gradient(circle at 30% 30%,#1a1c1c,#0c0d0d)",
                border: `1px solid ${activeIdx === i ? "rgba(255,255,255,0.18)" : T.border}`,
                boxShadow: activeIdx === i ? "0 0 24px rgba(255,255,255,0.07)" : "none",
                color: activeIdx === i ? T.white : T.muted,
                cursor: "pointer",
                transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease",
                flexShrink: 0,
                margin: isMobile ? "0 2px" : "0",
              }}
            >
              <span style={{ fontSize: isMobile ? "8px" : "10px", fontWeight: "700", fontFamily: T.fontSans, letterSpacing: "0.03em" }}>{t.era}</span>
            </div>
          ))}
        </div>
        <SpotlightCard spotlightColor="rgba(0,229,255,0.12)" style={{ ...cardBase, padding: isMobile ? "24px 20px" : "40px 44px", transition: "none" }}>
          <div style={{ opacity: fading ? 0 : 1, transition: "opacity 0.18s ease" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
              <span className="heading-text" style={{ fontSize: isMobile ? "24px" : "32px" }}>{current.era}</span>
              <span style={{ fontSize: isMobile ? "13px" : "15px", fontWeight: "600", color: T.mutedHi }}>{current.label}</span>
            </div>
            <p style={{ fontSize: isMobile ? "13px" : "14px", color: T.muted, lineHeight: 1.85, maxWidth: "680px" }}>{current.desc}</p>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};