export const T = {
  // Colors
  bg: "#0c0d0d",
  surface: "#111213",
  border: "#202222",
  borderHi: "#2e3030",
  text: "#e8e8e8",
  muted: "#555a5a",
  mutedHi: "#888e8e",
  white: "#ffffff",
  // Typography
  fontSans: "'DM Sans', sans-serif",
  // Animation
  cardStaggerMs: 60,
  chartBarStaggerMs: 350,
  dotRevealMs: 300,
  dotRevealStepMs: 80,
  // Mobile breakpoints
  breakpoints: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
  },
  // Mobile-specific adjustments
  mobile: {
    dotSize: 4,
    dotGap: 12,
    physics: {
      damping: 500,
      returnDuration: 1.2,
      maxSpeed: 3000,
      speedTrigger: 80,
      shockRadius: 200,
      shockStrength: 4,
      proximity: 80,
    },
  },
  // Physics (desktop default)
  physics: {
    damping: 750,
    returnDuration: 1.5,
    maxSpeed: 5000,
    speedTrigger: 100,
    shockRadius: 250,
    shockStrength: 5,
    proximity: 120,
  },
  dotSize: 5,
  dotGap: 15,
  dotBase: "#1a1c1c",
  dotActive: "#ffffff",
};

export const cardBase = {
  background: "radial-gradient(circle 280px at 0% 0%, #2a2c2c, #0c0d0d)",
  border: `1px solid ${T.border}`,
  borderRadius: "10px",
  position: "relative",
  overflow: "hidden",
  boxShadow: "inset 60px 60px 120px rgba(255,255,255,0.03)",
};