import { cardBase, T } from "../../constants/designTokens.js";
import { useMobileDetect } from "../../hooks/useMobileDetect.js";

export const CustomTooltip = ({ active, payload, label }) => {
  const { isMobile } = useMobileDetect();

  if (!active || !payload?.length) return null;

  const padding = isMobile ? "8px 12px" : "12px 16px";
  const fontSize = isMobile ? "11px" : "13px";

  return (
    <div style={{ ...cardBase, padding, fontSize, color: T.text, fontFamily: T.fontSans, minWidth: isMobile ? "120px" : "140px" }}>
      <div style={{ fontWeight: "700", marginBottom: isMobile ? "4px" : "6px", color: T.white }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: T.mutedHi, marginBottom: "2px", fontSize: isMobile ? "10px" : "13px" }}>{p.name}: <span style={{ color: T.white }}>{p.value}{p.name === "Avg Game Size" ? " GB" : ""}</span></div>
      ))}
    </div>
  );
};