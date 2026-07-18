// RetroTitle.jsx
import { useEffect, useRef } from "react";

// const COLORS = [
//   "#1C0006", // noir-red (almost black)
//   "#3A0010", // very dark red
//   "#5E001F", // deep dark red
//   "#8C002E", // rich dark red
//   "#B8003C", // medium red
//   "#E22A4A", // bright red (Ferrari inspired)
//   "#FF5C76"  // light, vivid red-pink (bright end)
// ];

// const COLORS = [
//   "#020A1A", // noir-blue (almost black)
//   "#041433", // very dark navy
//   "#072155", // deep dark blue
//   "#0C3382", // rich dark blue
//   "#144BB5", // medium blue
//   "#2069E8", // bright blue
//   "#5B9EFF"  // light, vivid blue (bright end)
// ];

const COLORS = [
  "#031A0A", // noir-green (almost black)
  "#063316", // very dark forest
  "#0A5524", // deep dark green
  "#0F8035", // rich dark green
  "#16B04A", // medium vibrant green
  "#20E063", // bright green
  "#5CFF92"  // light, vivid green (bright end)
];

const STEP   = 13;
const N      = COLORS.length;
const SPREAD = N * STEP;
const SHIFT  = -(SPREAD / 2);

const FONT = {
  fontFamily: "'Anton','Impact',sans-serif",
  fontSize: "clamp(36px, 6vw, 72px)",
  fontWeight: 900,
  letterSpacing: "0.04em",
  lineHeight: 1,
  whiteSpace: "nowrap",
  userSelect: "none",
};

const CAP_FONT = {
  fontFamily: "'Raleway','Helvetica Neue',sans-serif",
  fontSize: "clamp(11px,1.5vw,26px)",
  fontWeight: 200,
  letterSpacing: "0.18em",
  whiteSpace: "nowrap",
  userSelect: "none",
};

export default function RetroTitle({ title, description }) {
  const wrapRef    = useRef(null);
  const layerRefs  = useRef([]);   // plain array, no generic
  const topRef     = useRef(null);
  const capRef     = useRef(null);

  useEffect(() => {
    // load fonts & GSAP once per mount
    const font = document.createElement("link");
    font.rel  = "stylesheet";
    font.href = "https://fonts.googleapis.com/css2?family=Anton&family=Raleway:wght@200&display=swap";
    document.head.appendChild(font);

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script.onload = () => {
      const g = window.gsap;

      // initial state – everything hidden
      g.set(topRef.current, { opacity: 0, scale: 0.95 });
      g.set(capRef.current, { opacity: 0, y: 6 });

      // ========== THE RETRO ENTRANCE ==========
      g.to(wrapRef.current, {
        x: SHIFT,
        y: SHIFT,
        duration: 0.5,
        ease: "power4.out",
      });

      g.to(topRef.current, {
        opacity: 1,
        scale: 1.04,
        duration: 0.4,
        ease: "power3.out",
        transformOrigin: "left top",
        delay: 0.05,
      });

      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        const targetOpacity = 0.95 - i * 0.05;
        g.fromTo(
          el,
          { x: 0, y: 0, opacity: 0, scale: 0.96 },
          {
            x: (i + 1) * STEP,
            y: (i + 1) * STEP,
            opacity: targetOpacity,
            scale: 1,
            duration: 0.6 + i * 0.02,
            delay: i * 0.04,
            ease: "elastic.out(1,0.5)",
          }
        );
      });

      g.to(capRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.22,
        ease: "power3.out",
      });
    };

    document.head.appendChild(script);

    return () => {
      // cleanup if component unmounts
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "1.2rem",
      }}
    >
      {/* word block */}
      <div style={{ position: "relative", alignSelf: "flex-start" }}>
        <span style={{ ...FONT, visibility: "hidden", display: "block" }}>
          {title}
        </span>
        <div
          ref={wrapRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            padding: `0 ${SPREAD + 20}px ${SPREAD + 20}px 0`,
            transformStyle: "preserve-3d",
          }}
        >
          {COLORS.map((color, i) => (
            <span
              key={i}
              ref={(el) => (layerRefs.current[i] = el)}
              style={{
                ...FONT,
                position: "absolute",
                top: 0,
                left: 0,
                color,
                opacity: 0,
                zIndex: N - i,
                WebkitTextStroke: `2px ${color}`,
                filter: `drop-shadow(0 0 4px ${color}bb) drop-shadow(0 2px 10px ${color}66)`,
                pointerEvents: "none",
              }}
            >
              {title}
            </span>
          ))}
          <span
            ref={topRef}
            style={{
              ...FONT,
              position: "absolute",
              top: 0,
              left: 0,
              color: "#fff",
              zIndex: N + 1,
              WebkitTextStroke: "2px rgba(255,255,255,0.5)",
              filter:
                "drop-shadow(0 0 6px rgba(255,255,255,0.8)) drop-shadow(0 2px 14px rgba(255,255,255,0.4))",
              pointerEvents: "none",
              opacity: 0,
            }}
          >
            {title}
          </span>
        </div>
      </div>

      {/* caption */}
      <span
        ref={capRef}
        style={{
          ...CAP_FONT,
          color: "rgba(255,255,255,0.55)",
          display: "block",
        }}
      >
        {description}
      </span>
    </div>
  );
}