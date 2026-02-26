import { T } from "../../constants/designTokens.js";

export const SectionEyebrow = ({ children, style }) => (
  <div style={{ fontSize: "11px", fontWeight: "700", color: T.mutedHi, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: "12px", fontFamily: T.fontSans, ...style }}>
    {children}
  </div>
);