import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./bioMotion.css";

const PFP = "/takezo/person/bio/TakezoPFP.jpg";
const PFP_EXPANSION = "/takezo/person/bio/TakezoPFPExpansion.jpg";

function circularArc(width, crown, radius, side) {
  const center = width / 2;
  const joinedCenter = center + (side === "left" ? 1 : -1);
  const overshoot = Math.min(34, width * 0.085);
  const edgeX = side === "left" ? -overshoot : width + overshoot;
  const dx = center + overshoot;
  const edgeY = crown + radius - Math.sqrt(Math.max(0, radius ** 2 - dx ** 2));
  const sweep = side === "left" ? 0 : 1;
  return `M ${joinedCenter} ${crown} A ${radius} ${radius} 0 0 ${sweep} ${edgeX} ${edgeY}`;
}

function circularTextArc(width, crown, radius) {
  const center = width / 2;
  const overshoot = Math.min(34, width * 0.085);
  const dx = center + overshoot;
  const edgeY = crown + radius - Math.sqrt(Math.max(0, radius ** 2 - dx ** 2));
  return `M ${-overshoot} ${edgeY} A ${radius} ${radius} 0 0 1 ${center} ${crown} A ${radius} ${radius} 0 0 1 ${width + overshoot} ${edgeY}`;
}

export default function BioMotion({ expanded, reduced }) {
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [liquidSize, setLiquidSize] = useState({ width: 420, height: 520 });
  const rootRef = useRef(null);
  const liquidTimeline = useRef(null);
  const hoverDelay = useRef(null);

  useEffect(() => {
    if (!expanded) {
      setReady(false);
      return undefined;
    }
    if (reduced) {
      setReady(true);
      return undefined;
    }
    const timer = window.setTimeout(() => setReady(true), 560);
    return () => window.clearTimeout(timer);
  }, [expanded, reduced]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const measure = () => {
      const rect = root.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      setLiquidSize((current) =>
        current.width === width && current.height === height ? current : { width, height },
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const context = gsap.context(() => {
      const statusText = root.querySelector(".tz-bio-pfp-status text");
      const statusBand = root.querySelector(".tz-bio-pfp-status-band");
      const statusArc = root.querySelector("#takezo-availability-arc");
      const neck = root.querySelector(".tz-bio-liquid-neck");
      const drops = gsap.utils.toArray(".tz-bio-liquid-drop", root);
      const labels = gsap.utils.toArray(".tz-bio-liquid-label", root);
      const arcGroups = gsap.utils.toArray(".tz-bio-liquid-arc", root);
      const arcPairs = arcGroups.map((arc) =>
        gsap.utils.toArray(".tz-bio-liquid-stroke", arc),
      );

      const bandLength = statusArc.getTotalLength();
      const bandCore = bandLength * 0.055;
      gsap.set(statusText, { opacity: 1, filter: "blur(0px)" });
      gsap.set(statusBand, {
        opacity: 1,
        strokeDasharray: `${bandLength} ${bandLength}`,
        strokeDashoffset: 0,
        y: 0,
      });
      gsap.set(neck, { opacity: 0, scaleX: 0.62, scaleY: 0.05, transformOrigin: "50% 0%" });
      gsap.set(drops, { opacity: 0, x: 0, scaleX: 0.82, scaleY: 1.18, transformOrigin: "center" });
      gsap.set(labels, { opacity: 0, y: 4 });
      arcPairs.flat().forEach((path) => {
        const length = path.getTotalLength();
        path.dataset.arcLength = String(length);
        gsap.set(path, {
          strokeDasharray: `${length} ${length}`,
          strokeDashoffset: length,
          opacity: 1,
          strokeWidth: 10,
        });
      });

      const timeline = gsap.timeline({ paused: true, defaults: { ease: "circ.inOut" } });

      timeline
        .to(statusText, { opacity: 0, filter: "blur(6px)", duration: 0.18 }, 0)
        .to(
          statusBand,
          {
            strokeDasharray: `${bandCore} ${bandLength}`,
            strokeDashoffset: -(bandLength - bandCore) / 2,
            y: 9,
            duration: 0.29,
          },
          0.02,
        )
        .to(neck, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.22 }, 0.15)
        .set(statusBand, { opacity: 0 }, 0.34)
        .to(neck, { scaleX: 0.72, scaleY: 1.18, duration: 0.14 }, 0.3)
        .set(neck, { opacity: 0 }, 0.43);

      drops.forEach((drop, index) => {
        const targetY = Number(drop.dataset.travel || 0);
        const start = 0.34 + index * 0.075;
        timeline
          .set(drop, { opacity: 1, x: 0, y: -targetY, scaleX: 0.86, scaleY: 1.16 }, start)
          .to(drop, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.3 }, start);
      });

      arcPairs.forEach((paths, index) => {
        const start = 0.9 + index * 0.065;
        timeline
          .to(arcGroups[index], { opacity: 1, duration: 0.01 }, start)
          .to(drops[index], { scaleX: 2.15, scaleY: 0.68, duration: 0.16 }, start)
          .to(drops[index], { opacity: 0, scaleX: 2.8, scaleY: 0.42, duration: 0.18 }, start + 0.12)
          .to(paths, { strokeDashoffset: 0, strokeWidth: 17, duration: 0.46 }, start)
          .to(paths, { strokeWidth: 14, duration: 0.16, ease: "circ.out" }, start + 0.34);
      });

      timeline
        .to(arcPairs.flat(), { strokeWidth: 21, duration: 0.55, ease: "expo.out" }, 1.52)
        .to(labels, { opacity: 1, y: 0, duration: 0.38, stagger: 0.07, ease: "power2.out" }, 1.68);

      liquidTimeline.current = timeline;
    }, root);

    return () => {
      liquidTimeline.current = null;
      context.revert();
    };
  }, [liquidSize.height, liquidSize.width]);

  useEffect(() => {
    if (!expanded || !ready || !liquidTimeline.current) {
      if (!expanded) liquidTimeline.current?.pause(0);
      return;
    }
    if (reduced) {
      liquidTimeline.current.tweenTo(hovered ? liquidTimeline.current.duration() : 0, {
        duration: 0.14,
        ease: "power1.inOut",
      });
      return;
    }
    liquidTimeline.current.timeScale(1)[hovered ? "play" : "reverse"]();
  }, [expanded, hovered, ready, reduced]);

  useEffect(() => () => window.clearTimeout(hoverDelay.current), []);

  const scheduleHover = (next) => {
    window.clearTimeout(hoverDelay.current);
    if (!next && !hovered) return;
    if (next && (!expanded || !ready)) return;
    hoverDelay.current = window.setTimeout(() => setHovered(next), 500);
  };

  const liquidWidth = liquidSize.width;
  const liquidHeight = liquidSize.height;
  const dropCrowns = [0.67, 0.745, 0.82, 0.895].map((ratio) => liquidHeight * ratio);
  const neckTop = liquidHeight * 0.63;
  const neckBottom = liquidHeight * 0.675;
  const neckHalfWidth = Math.max(9, Math.min(15, liquidWidth * 0.032));
  const dropRadius = Math.max(7, Math.min(11, liquidWidth * 0.025));
  const arcRadius = Math.max(liquidWidth * 0.6, liquidWidth / 2 + 36);

  return (
    <section ref={rootRef} className="tz-bio" data-open={expanded} data-ready={ready} data-hovered={hovered} aria-hidden={!expanded}>
      <figure
        className="tz-bio-pfp"
        aria-label="Takezo portrait — available now"
        onPointerEnter={() => scheduleHover(true)}
        onPointerLeave={() => scheduleHover(false)}
        onPointerDown={(event) => event.pointerType !== "mouse" && scheduleHover(true)}
        onPointerUp={(event) => event.pointerType !== "mouse" && scheduleHover(false)}
        onPointerCancel={() => scheduleHover(false)}
      >
        <div className="tz-bio-pfp-media">
          <img className="tz-bio-pfp-idle" src={PFP} alt="Takezo" draggable="false" />
          <img className="tz-bio-pfp-expanded" src={PFP_EXPANSION} alt="" draggable="false" />
          <span className="tz-bio-pfp-feather" aria-hidden="true" />
        </div>

        <svg className="tz-bio-pfp-status" viewBox="0 0 220 220" aria-hidden="true">
          <defs>
            <path id="takezo-availability-arc" d="M 43,170 Q 110,220 177,170" />
          </defs>
          <use className="tz-bio-pfp-status-band" href="#takezo-availability-arc" />
          <text>
            <textPath href="#takezo-availability-arc" startOffset="50%" textAnchor="middle">
              AVAILABLE NOW
            </textPath>
          </text>
        </svg>
      </figure>

      <svg
        className="tz-bio-liquid"
        viewBox={`0 0 ${liquidWidth} ${liquidHeight}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="takezo-liquid-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" />
            <stop offset="0.95" stopColor="white" />
            <stop offset="1" stopColor="black" />
          </linearGradient>
          <mask id="takezo-liquid-mask">
            <rect width={liquidWidth} height={liquidHeight} fill="url(#takezo-liquid-fade)" />
          </mask>
        </defs>

        <path
          className="tz-bio-liquid-neck"
          d={`M ${liquidWidth / 2 - neckHalfWidth} ${neckTop}
            C ${liquidWidth / 2 - neckHalfWidth} ${neckTop + (neckBottom - neckTop) * 0.55},
              ${liquidWidth / 2 - neckHalfWidth * 0.55} ${neckBottom - 5}, ${liquidWidth / 2} ${neckBottom}
            C ${liquidWidth / 2 + neckHalfWidth * 0.55} ${neckBottom - 5},
              ${liquidWidth / 2 + neckHalfWidth} ${neckTop + (neckBottom - neckTop) * 0.55},
              ${liquidWidth / 2 + neckHalfWidth} ${neckTop}
            C ${liquidWidth / 2 + neckHalfWidth * 0.65} ${neckTop - 7},
              ${liquidWidth / 2 - neckHalfWidth * 0.65} ${neckTop - 7},
              ${liquidWidth / 2 - neckHalfWidth} ${neckTop} Z`}
        />

        <g className="tz-bio-liquid-drops">
          {dropCrowns.map((crown, index) => (
            <circle
              className="tz-bio-liquid-drop"
              data-travel={crown - neckBottom}
              cx={liquidWidth / 2}
              cy={crown}
              r={dropRadius}
              key={index}
            />
          ))}
        </g>

        <g className="tz-bio-liquid-arcs" mask="url(#takezo-liquid-mask)">
          {dropCrowns.map((crown, index) => (
            <g className="tz-bio-liquid-arc" key={index}>
              <path
                className="tz-bio-liquid-stroke"
                d={circularArc(liquidWidth, crown, arcRadius, "left")}
              />
              <path
                className="tz-bio-liquid-stroke"
                d={circularArc(liquidWidth, crown, arcRadius, "right")}
              />
              <path
                id={`takezo-liquid-type-arc-${index}`}
                className="tz-bio-liquid-type-guide"
                d={circularTextArc(liquidWidth, crown, arcRadius)}
              />
              <text className="tz-bio-liquid-label" textAnchor="middle" dy="3.5">
                <textPath href={`#takezo-liquid-type-arc-${index}`} startOffset="68%">
                  {[
                    "Artist + Software Architect",
                    "Interdisciplinary Artist",
                    "Specialized in 3D and 2D",
                    "16 Years Of Progressing",
                  ][index]}
                </textPath>
              </text>
            </g>
          ))}
        </g>
      </svg>

      <span className="tz-bio-pfp-alias" aria-hidden="true">
        <span>AKA</span>
        <strong>Muhammad Uzair</strong>
        <em>Just another day of achieving something...</em>
      </span>
    </section>
  );
}
