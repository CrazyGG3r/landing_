import { T } from "../../constants/designTokens.js";
import { useMobileDetect } from "../../hooks/useMobileDetect.js";

export const SectionSub = ({ children }) => {
  const { isMobile } = useMobileDetect();
  return <p style={{ fontSize: isMobile ? "13px" : "14px", color: T.muted, fontFamily: T.fontSans, lineHeight: 1.7, maxWidth: "520px", margin: "0 auto", padding: isMobile ? "0 10px" : "0" }}>{children}</p>;
};