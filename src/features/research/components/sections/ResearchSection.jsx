import { useState, useCallback, useMemo } from "react";
import { T, cardBase } from "../../constants/designTokens.js";
import { RESEARCH_QUESTIONS, RQ_CATEGORIES, IMPACT_META } from "../../constants/data.js";
import { useMobileDetect } from "../../hooks/useMobileDetect.js";
import { SpotlightCard } from "../SpotlightCard.jsx";
import { SectionEyebrow } from "../ui/SectionEyebrow.jsx";
import { SectionTitle } from "../ui/SectionTitle.jsx";
import { SectionSub } from "../ui/SectionSub.jsx";

export const ResearchSection = ({ sectionRef }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cardKey, setCardKey] = useState(0);
  const { isMobile } = useMobileDetect();

  const handleFilter = useCallback(cat => { setActiveCategory(cat); setCardKey(k => k + 1); }, []);
  const filtered = useMemo(
    () => activeCategory === "All" ? RESEARCH_QUESTIONS : RESEARCH_QUESTIONS.filter(q => q.category === activeCategory),
    [activeCategory]
  );

  return (
    <div ref={sectionRef} id="research-section">
      <div style={{ padding: isMobile ? "40px 16px" : "80px 24px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? "28px" : "44px" }}>
            <SectionEyebrow>Open Inquiry</SectionEyebrow>
            <SectionTitle>Research Question Explorer</SectionTitle>
            <SectionSub>The following questions represent active areas of academic and industry investigation in game performance research.</SectionSub>
          </div>
          <div style={{
            display: "flex",
            gap: isMobile ? "4px" : "8px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: isMobile ? "24px" : "40px",
            padding: isMobile ? "0 4px" : "0",
          }}>
            {RQ_CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-btn${activeCategory === cat ? " active" : ""}`}
                onClick={() => handleFilter(cat)}
                style={{
                  background: activeCategory === cat ? "#1a1c1c" : "transparent",
                  border: `1px solid ${activeCategory === cat ? T.borderHi : T.border}`,
                  borderRadius: "6px",
                  padding: isMobile ? "6px 12px" : "8px 18px",
                  cursor: "pointer",
                  fontSize: isMobile ? "10px" : "11px",
                  fontWeight: "600",
                  fontFamily: T.fontSans,
                  color: activeCategory === cat ? T.white : T.muted,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  touchAction: "manipulation",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(280px,1fr))",
            gap: isMobile ? "12px" : "16px"
          }}>
            {filtered.map((q, i) => (
              <SpotlightCard
                key={`${cardKey}-${q.id}`}
                spotlightColor={IMPACT_META[q.impact].spotlight}
                className="rq-card entering"
                style={{
                  ...cardBase,
                  padding: isMobile ? "20px 16px" : "28px 24px",
                  border: `1px solid ${T.border}`,
                  animationDelay: `${i * T.cardStaggerMs}ms`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
                  <span style={{ fontSize: isMobile ? "9px" : "10px", fontWeight: "700", color: T.mutedHi, textTransform: "uppercase", letterSpacing: "0.12em", background: "rgba(255,255,255,0.04)", padding: isMobile ? "2px 8px" : "3px 10px", borderRadius: "4px", border: `1px solid ${T.border}` }}>{q.category}</span>
                  <span style={{ fontSize: isMobile ? "9px" : "10px", fontWeight: "700", color: IMPACT_META[q.impact].color }}>● {q.impact}</span>
                </div>
                <div className="heading-text" style={{ fontSize: isMobile ? "15px" : "16px", marginBottom: "12px", lineHeight: 1.35 }}>{q.title}</div>
                <p style={{ fontSize: isMobile ? "11px" : "12px", color: T.muted, lineHeight: 1.75 }}>{q.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};