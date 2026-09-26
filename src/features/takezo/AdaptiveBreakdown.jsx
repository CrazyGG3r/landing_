import { useEffect, useRef } from "react";

const ease = 0.28;

export default function AdaptiveBreakdown({ breakdown, open, entryX }) {
  const items = breakdown.items || [];
  const root = useRef(null);
  const motion = useRef({ frame: 0, positions: [], targets: [], widths: [], researchPositions: [], scatter: null, scatterTarget: null, initialized: false });

  useEffect(() => {
    if (open) return;
    cancelAnimationFrame(motion.current.frame);
    motion.current.frame = 0;
    motion.current.positions = [];
    motion.current.targets = [];
    motion.current.widths = [];
    motion.current.researchPositions = [];
    motion.current.scatter = null;
    motion.current.scatterTarget = null;
    motion.current.initialized = false;
    root.current?.removeAttribute("data-interacted");
  }, [open]);

  useEffect(() => () => cancelAnimationFrame(motion.current.frame), []);

  const animate = () => {
    const state = motion.current;
    if (state.frame) return;
    const paint = () => {
      let unsettled = false;
      const cards = root.current?.querySelectorAll(".tz-adaptive-breakdown-item");
      if (!cards) {
        state.frame = 0;
        return;
      }
      for (let index = 0; index < cards.length; index += 1) {
        const target = state.targets[index];
        if (target === undefined) continue;
        if (index === 0) {
          const rates = [.17, .115, .078];
          for (let layer = 0; layer < rates.length; layer += 1) {
            const current = state.researchPositions[layer] ?? target;
            const next = current + (target - current) * rates[layer];
            state.researchPositions[layer] = Math.abs(target - next) < .35 ? target : next;
            cards[index].style.setProperty(`--research-shift-${layer + 1}`, `${state.researchPositions[layer]}px`);
            if (state.researchPositions[layer] !== target) unsettled = true;
          }
          state.positions[index] = state.researchPositions[0];
          if (state.widths[index]) {
            const influence = Math.max(-1, Math.min(1, state.positions[index] / (state.widths[index] / 2)));
            cards[index].style.setProperty("--research-turn", `${influence * 4}deg`);
            cards[index].style.setProperty("--research-drift-y", `${influence * 8}px`);
          }
          continue;
        }
        const current = state.positions[index] ?? target;
        const strength = index >= cards.length - 2 ? 0.18 : ease;
        const next = current + (target - current) * strength;
        state.positions[index] = Math.abs(target - next) < 0.35 ? target : next;
        cards[index].style.setProperty("--image-shift-x", `${state.positions[index]}px`);
        if (state.positions[index] !== target) unsettled = true;
      }
      if (state.scatterTarget !== null && cards[0]) {
        const current = state.scatter ?? state.scatterTarget;
        const next = current + (state.scatterTarget - current) * ease;
        state.scatter = Math.abs(state.scatterTarget - next) < .005 ? state.scatterTarget : next;
        cards[0].style.setProperty("--research-scatter-x", `${state.scatter * 48}px`);
        cards[0].style.setProperty("--research-scatter-y", `${state.scatter * 28}px`);
        cards[0].style.setProperty("--research-speed-2", `${1 - state.scatter * .16}`);
        cards[0].style.setProperty("--research-speed-3", `${1 - state.scatter * .28}`);
        if (state.scatter !== state.scatterTarget) unsettled = true;
      }
      state.frame = unsettled ? requestAnimationFrame(paint) : 0;
    };
    state.frame = requestAnimationFrame(paint);
  };

  const move = (event) => {
    if (!open || event.pointerType !== "mouse") return;
    const cards = root.current?.querySelectorAll(".tz-adaptive-breakdown-item");
    if (!cards) return;
    const state = motion.current;
    const rects = Array.from(cards, (card) => card.getBoundingClientRect());
    const pointerX = !state.initialized && Number.isFinite(entryX) ? entryX : event.clientX;
    const centers = rects.map((rect) => rect.left + rect.width / 2);
    const texturingCenter = rects.at(-2)?.left + rects.at(-2)?.width / 2;
    const renderingCenter = rects.at(-1)?.left + rects.at(-1)?.width / 2;
    const researchStartsNearby = pointerX <= (rects[1]?.right ?? rects[0]?.right);
    for (let index = 0; index < cards.length; index += 1) {
      const card = cards[index];
      const rect = rects[index];
      const center = centers[index];
      const neighborSpan = Math.min(
        index > 0 ? center - centers[index - 1] : Infinity,
        index < centers.length - 1 ? centers[index + 1] - center : Infinity,
      );
      const logoProgress = Math.max(0, Math.min(1, Math.abs(pointerX - center) / neighborSpan));
      const logoPresence = logoProgress * logoProgress * (3 - 2 * logoProgress);
      card.style.setProperty("--breakdown-logo-presence", `${logoPresence}`);
      card.style.setProperty("--breakdown-logo-retreat", `${(1 - logoPresence) * 9}px`);
      card.style.setProperty("--breakdown-logo-scale", `${.84 + logoPresence * .16}`);
      const rendering = card.hasAttribute("data-rendering");
      const isTexturing = index === cards.length - 2;
      const maximum = isTexturing && renderingCenter
        ? renderingCenter - texturingCenter
        : rect.width * 1.5;
      const cursorTarget = rendering
        ? Math.max(-rect.width * 1.5, Math.min(0, pointerX - center))
        : Math.max(-rect.width * 1.5, Math.min(maximum, pointerX - center));
      const researchStart = -rect.width * .32;
      const target = cursorTarget;
      state.targets[index] = target;
      state.widths[index] = rect.width;
      if (state.positions[index] === undefined) {
        if (index === 0) {
          state.researchPositions = researchStartsNearby
            ? [researchStart, -rect.width * .44, -rect.width * .22]
            : [target, target, target];
          state.positions[index] = state.researchPositions[0];
          state.researchPositions.forEach((position, layer) => {
            card.style.setProperty(`--research-shift-${layer + 1}`, `${position}px`);
          });
        } else {
          state.positions[index] = target;
          card.style.setProperty("--image-shift-x", `${target}px`);
        }
      }
      if (rendering) {
        const distance = Math.max(center - pointerX, 0);
        card.style.setProperty("--rendering-proximity", `${Math.max(0, 1 - distance / (rect.width * 1.5))}`);
      }
    }
    if (rects[0]) {
      const distance = (rects[1]?.left ?? rects[0].right) - rects[0].left;
      const progress = Math.max(0, Math.min(1, (pointerX - rects[0].left) / distance));
      state.scatterTarget = 1 - progress;
      if (state.scatter === null) {
        state.scatter = researchStartsNearby ? 1 : state.scatterTarget;
        cards[0].style.setProperty("--research-scatter-x", `${state.scatter * 48}px`);
        cards[0].style.setProperty("--research-scatter-y", `${state.scatter * 28}px`);
      }
    }
    root.current.dataset.interacted = "true";
    state.initialized = true;
    animate();
  };

  const leave = (event) => {
    const cards = root.current?.querySelectorAll(".tz-adaptive-breakdown-item");
    if (!cards) return;
    const rootRect = root.current.getBoundingClientRect();
    const direction = event.clientX < rootRect.left + rootRect.width / 2 ? -1 : 1;
    motion.current.scatterTarget = direction < 0 ? 1 : 0;
    for (let index = 0; index < cards.length; index += 1) {
      const card = cards[index];
      card.style.setProperty("--breakdown-logo-presence", "1");
      card.style.setProperty("--breakdown-logo-retreat", "0px");
      card.style.setProperty("--breakdown-logo-scale", "1");
      const rendering = card.hasAttribute("data-rendering");
      const center = card.getBoundingClientRect().left + card.clientWidth / 2;
      motion.current.targets[index] = rendering
        ? (event.clientX >= center ? 0 : -card.clientWidth * 1.5)
        : direction * card.clientWidth * 1.5;
      if (rendering) card.style.setProperty("--rendering-proximity", "0");
    }
    animate();
  };

  return (
    <div
      ref={root}
      className="tz-adaptive-breakdown"
      data-layout={breakdown.layout || "square-row"}
      aria-hidden={!open}
      style={{ "--breakdown-columns": items.length }}
      onPointerEnter={move}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {breakdown.idleImages?.length > 0 && (
        <span className="tz-adaptive-breakdown-idle" aria-hidden="true">
          {breakdown.idleImages.map((src, index) => (
            <img
              key={src}
              src={`/takezo/skillset/3D/${src}`}
              alt=""
              decoding="async"
              style={{ "--idle-index": index, "--idle-offset": `${(breakdown.idleImages.length - index - 1) * 7}%` }}
            />
          ))}
        </span>
      )}
      {items.map((item, index) => {
        const label = typeof item === "string" ? item : item.label;
        const number = typeof item === "string" ? index + 1 : item.number ?? index + 1;
        return (
          <div
            className="tz-adaptive-breakdown-item"
            key={`${label}-${index}`}
            style={{ "--breakdown-delay": `${index * 34}ms` }}
            data-rendering={item.background ? "true" : undefined}
          >
            {open && item.background && (
              <img className="tz-adaptive-breakdown-bg" src={`/takezo/skillset/3D/${item.background}`} alt="" aria-hidden="true" decoding="async" />
            )}
            {open && item.images?.length > 0 && (
              <span className="tz-adaptive-breakdown-media" aria-hidden="true">
                {item.images.map((src, imageIndex) => (
                  <img className={`tz-adaptive-breakdown-image tz-adaptive-breakdown-image-${imageIndex + 1}`} key={src}
                    src={`/takezo/skillset/3D/${src}`} alt="" decoding="async" />
                ))}
              </span>
            )}
            {open && item.logos?.length > 0 && (
              <span className="tz-adaptive-breakdown-logos" aria-hidden="true">
                {item.logos.map((src) => (
                  <img key={src} src={`/takezo/${src}`} alt="" decoding="async" />
                ))}
              </span>
            )}
            <span className="tz-adaptive-breakdown-number">{String(number).padStart(2, "0")}</span>
            <span className="tz-adaptive-breakdown-label">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
