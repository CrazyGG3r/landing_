import { T } from "../../constants/designTokens.js";

export const Divider = () => <div style={{ width: "100%", height: "1px", background: `linear-gradient(90deg,transparent,${T.border} 30%,${T.border} 70%,transparent)` }} />;