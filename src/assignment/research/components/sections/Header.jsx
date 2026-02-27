import { T } from "../../constants/designTokens.js";
import { NAV_ITEMS } from "../../constants/navigation.js";
import { useMobileDetect } from "../../hooks/useMobileDetect.js";

export const Header = ({ activeSection, onNavigate, headerHeight }) => {
  const { isMobile } = useMobileDetect();

  return (
    <div style={{
      background: "rgba(12,13,13,0.94)",
      backdropFilter: "blur(12px)",
      padding: isMobile ? "12px 20px" : "18px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: `1px solid ${T.border}`,
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      width: "100%",
      minHeight: `${headerHeight}px`,
      zIndex: 100,
      flexWrap: isMobile ? "wrap" : "nowrap",
      gap: isMobile ? "8px" : "0",
    }}>
      <div style={{ width: isMobile ? "100%" : "auto", textAlign: isMobile ? "center" : "left" }}>
        <div className="heading-text" style={{ fontSize: isMobile ? "16px" : "18px" }}>OPTIMIZATION RESEARCH</div>
        <div style={{ fontSize: isMobile ? "9px" : "10px", color: T.muted, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "2px" }}>Software ReEngineering Assignment · 2026</div>
      </div>
      <div style={{
        display: "flex",
        gap: isMobile ? "20px" : "28px",
        fontSize: isMobile ? "11px" : "12px",
        fontWeight: "500",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        margin: isMobile ? "0 auto" : "0",
      }}>
        {NAV_ITEMS.map(n => (
          <button
            type="button"
            key={n.key}
            onClick={() => onNavigate(n.key)}
            className="nav-item"
            style={{
              color: activeSection === n.key ? T.white : T.muted,
              cursor: "pointer",
              touchAction: "manipulation",
              padding: isMobile ? "4px 0" : "0",
              background: "transparent",
              border: "none",
              font: "inherit",
              letterSpacing: "inherit",
              textTransform: "inherit",
              outline: "none",
            }}
          >
            {n.label}
          </button>
        ))}
      </div>
    </div>
  );
};