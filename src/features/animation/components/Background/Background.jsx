/**
 * Background.jsx
 * ─────────────────────────────────────────────
 * Paper texture cinematic background
 * z-index: configurable (default 0)
 */

import { memo } from "react";

const Background = memo(function Background({
  texture = "/assets/Backgrounds/main_.jpg",
  zIndex = 0
}) {
  return (
    <>
      {/* Base paper */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex,
          backgroundImage: `url(${texture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.35) contrast(1.2)",
        }}
      />

      {/* Lighting vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: zIndex + 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(40,60,100,0.25) 0%, rgba(0,0,0,0.85) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Film grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: zIndex + 2,
          pointerEvents: "none",
          backgroundImage: "url(/textures/grain.png)",
          backgroundSize: "256px 256px",
          opacity: 0.12,
          mixBlendMode: "overlay",
        }}
      />
    </>
  );
});

export default Background;