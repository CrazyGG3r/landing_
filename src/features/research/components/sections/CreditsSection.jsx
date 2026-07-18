import { T, cardBase } from "../../constants/designTokens.js";
import { CURVED_LOOPS } from "../../constants/data.js";
import { useMobileDetect } from "../../hooks/useMobileDetect.js";
import { CurvedLoop } from "../CurvedLoop.jsx";
import { LightRays } from "../LightRays.jsx";
import { SpotlightCard } from "../SpotlightCard.jsx";
import { SectionEyebrow } from "../ui/SectionEyebrow.jsx";
import { SectionTitle } from "../ui/SectionTitle.jsx";
import { SectionSub } from "../ui/SectionSub.jsx";

export const CreditsSection = () => {
  const { isMobile } = useMobileDetect();

  return (
    <div style={{ padding: isMobile ? "40px 16px" : "80px 24px", position: "relative", overflow: "hidden" }}>
      {CURVED_LOOPS.map((cfg, i) => (
        <div key={i} style={{ position: "absolute", top: cfg.top ?? undefined, bottom: cfg.bottom ?? undefined, left: 0, right: 0, pointerEvents: "none", zIndex: cfg.zIndex }}>
          <CurvedLoop
            marqueeText={cfg.marqueeText}
            speed={cfg.speed}
            curveAmount={isMobile ? cfg.curveAmount * 0.5 : cfg.curveAmount}
            direction={cfg.direction}
            opacity={isMobile ? cfg.opacity * 0.7 : cfg.opacity}
            interactive={cfg.zIndex > 0}
          />
        </div>
      ))}
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <SectionEyebrow>Project Credits</SectionEyebrow>
          <SectionTitle>Author & Contributor</SectionTitle>
          <SectionSub>This research compilation and interactive visualization was developed by:</SectionSub>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 5 }}>
          <SpotlightCard
            spotlightColor="rgba(21,255,0,0.18)"
            className="rq-card entering"
            style={{
              ...cardBase,
              padding: isMobile ? "32px 24px" : "48px 56px",
              border: `1px solid ${T.border}`,
              maxWidth: "600px",
              width: "100%",
              textAlign: "center",
              background: "radial-gradient(circle 380px at 50% 30%,#2a2c2c,#0c0d0d)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <LightRays
              raysOrigin="bottom-center"
              raysColor="#ffffff"
              raysSpeed={1}
              lightSpread={1}
              rayLength={3}
              fadeDistance={1}
              saturation={0}
              mouseInfluence={isMobile ? 0 : 0.1}
              noiseAmount={0}
              distortion={0}
              pulsating={false}
            />
            <div style={{ marginBottom: "24px" }}>
              <span style={{ fontSize: isMobile ? "12px" : "14px", fontWeight: "500", color: "#b0b5b5", textTransform: "uppercase", letterSpacing: "0.2em", background: "rgba(255,255,255,0.03)", padding: isMobile ? "4px 12px" : "4px 16px", borderRadius: "30px", border: `1px solid ${T.borderHi}`, display: "inline-block" }}>CO-FOUNDER · GRAPHICS GENERALIST</span>
            </div>
            <div className="heading-text" style={{ fontSize: isMobile ? "clamp(32px,8vw,42px)" : "clamp(42px,6vw,58px)", marginBottom: "16px", lineHeight: 1.1 }}>Muhammad Uzair</div>
            <div style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: "400", color: "#b0b5b5", marginBottom: "24px", fontFamily: `'DM Sans', monospace`, letterSpacing: "0.02em" }}>22K-5176 | BSE-8A</div>
            <div style={{ height: "1px", width: "120px", margin: "24px auto", background: `linear-gradient(90deg,transparent,${T.mutedHi},transparent)` }} />
            <div style={{ fontSize: isMobile ? "13px" : "14px", color: "#c8cccc", lineHeight: 1.8, maxWidth: "400px", margin: "0 auto", padding: isMobile ? "0 12px" : "0" }}>
              <p>Research compilation, interactive visualization design, and implementation of performance optimization case studies.</p>
              <p style={{ marginTop: "16px", fontSize: isMobile ? "11px" : "12px", color: "#a0a5a5" }}>Data aggregated from industry post-mortems, academic publications, and performance analysis reports (2024–2026).</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: isMobile ? "12px" : "24px", marginTop: "32px", fontSize: isMobile ? "9px" : "11px", color: "#a0a5a5", textTransform: "uppercase", letterSpacing: "0.1em", flexWrap: "wrap" }}>
              <span style={{ padding: isMobile ? "4px 8px" : "4px 12px", background: "rgba(255,255,255,0.02)", borderRadius: "4px" }}>Game Optimization</span>
              <span style={{ padding: isMobile ? "4px 8px" : "4px 12px", background: "rgba(255,255,255,0.02)", borderRadius: "4px" }}>Performance Research</span>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
};