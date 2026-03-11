import { memo, useState } from "react";
import DecryptedText from "./DecryptedText";
import {
  FONT_LETTERBOX_SUBTITLE,
  FONT_LETTERBOX_TITLE
} from "../core/constants";

const Letterboxing = memo(function Letterboxing({
  isMobile,
  texture = "/assets/Backgrounds/torn_.png"
}) {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isFooterHovered, setIsFooterHovered] = useState(false);

  if (isMobile) return null;

  const paperStyle = (isHovered) => ({
    height: "10vh",
    minHeight: "60px",

    backgroundImage: `url(${texture})`,
    backgroundSize: "cover",
    backgroundPosition: "center",

    filter: isHovered
      ? "brightness(1.1) contrast(1.1)"
      : "brightness(0.75)",

    borderTop: "1px solid rgba(255,255,255,0.05)",
    borderBottom: "1px solid rgba(0,0,0,0.6)",

    boxShadow: isHovered
      ? "inset 0 2px 6px rgba(0,0,0,0.6), inset 0 -2px 6px rgba(0,0,0,0.5)"
      : "inset 0 1px 3px rgba(0,0,0,0.8)",

    color: isHovered
      ? "rgba(255,255,255,0.9)"
      : "rgba(255,255,255,0.55)",

    fontSize: 10,
    letterSpacing: "0.22em",
    padding: "10px 18px",

    textTransform: "uppercase",

    display: "flex",
    flexDirection: "column",
    gap: 4,

    transition: "all 0.35s ease",

    cursor: "default",
    pointerEvents: "auto",
  });

  const textStyle = (isHovered) => ({
    fontFamily: FONT_LETTERBOX_TITLE,
    textShadow: isHovered
      ? "0 2px 6px rgba(0,0,0,0.7)"
      : "0 1px 2px rgba(0,0,0,0.7)",
  });

  const subTextStyle = (isHovered) => ({
    fontFamily: FONT_LETTERBOX_SUBTITLE,
    opacity: isHovered ? 0.95 : 0.7,
    textShadow: "0 1px 2px rgba(0,0,0,0.7)",
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Header */}
      <div
        style={paperStyle(isHeaderHovered)}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
      >
        <DecryptedText
          text="SYSTEM LOG — PLACEHOLDER CONTEXT / TRANSMISSION CHANNEL"
          animateOn="view"
          speed={34}
          maxIterations={6}
          sequential
          revealDirection="start"
          className="decrypt-revealed"
          encryptedClassName="decrypt-encrypted"
          style={textStyle(isHeaderHovered)}
        />

        <DecryptedText
          text="STATUS: STABLE / ROUTE: BOLTFORGED / SEQ: 0049-A"
          animateOn="view"
          speed={36}
          maxIterations={6}
          sequential
          revealDirection="end"
          className="decrypt-revealed"
          encryptedClassName="decrypt-encrypted"
          style={subTextStyle(isHeaderHovered)}
        />
      </div>

      {/* Footer */}
      <div
        style={paperStyle(isFooterHovered)}
        onMouseEnter={() => setIsFooterHovered(true)}
        onMouseLeave={() => setIsFooterHovered(false)}
      >
        <DecryptedText
          text="ARCHIVE FEED — LONG FORM PLACEHOLDER TEXT"
          animateOn="view"
          speed={34}
          maxIterations={6}
          sequential
          revealDirection="start"
          className="decrypt-revealed"
          encryptedClassName="decrypt-encrypted"
          style={textStyle(isFooterHovered)}
        />

        <DecryptedText
          text="SIGNAL QUALITY: STABLE / MODE: PASSIVE / LOCK: ENABLED"
          animateOn="view"
          speed={36}
          maxIterations={6}
          sequential
          revealDirection="end"
          className="decrypt-revealed"
          encryptedClassName="decrypt-encrypted"
          style={subTextStyle(isFooterHovered)}
        />
      </div>
    </div>
  );
});

export default Letterboxing;