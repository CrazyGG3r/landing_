import "./focusTransition.css";

// All aesthetic tuning lives here. No additional ticker, renderer, or React state.
export const focusTransitionConfig = Object.freeze({
  enabled: true,
  blur: 7,
  compactBlur: 4,
  feather: 140,
  aperture: 48,
  revealDuration: 0.48,
  revealAt: 0.5,
});

export function focusCoverage(x, y, width, height) {
  return Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
}

/** A disposable screen-space lens driven exclusively by the navigation timeline. */
export function createFocusTransition(host, source, options = {}) {
  const config = { ...focusTransitionConfig, ...options };
  const noop = { contract() {}, move() {}, reveal() {}, dispose() {} };
  if (!config.enabled || !host ||
    !(CSS.supports("backdrop-filter", "blur(1px)") || CSS.supports("-webkit-backdrop-filter", "blur(1px)")) ||
    !(CSS.supports("mask-image", "radial-gradient(transparent, black)") || CSS.supports("-webkit-mask-image", "radial-gradient(transparent, black)"))) return noop;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const compact = width < 768;
  const feather = Math.min(config.feather, Math.min(width, height) * 0.24);
  const layer = document.createElement("div");
  layer.className = "tz-focus-transition";
  layer.setAttribute("aria-hidden", "true");
  layer.style.setProperty("--focus-blur", `${compact ? config.compactBlur : config.blur}px`);
  const state = {
    x: source.left + source.width / 2,
    y: source.top + source.height / 2,
    radius: 0,
    opacity: 0,
  };
  state.radius = focusCoverage(state.x, state.y, width, height);
  let disposed = false;
  const paint = () => {
    if (disposed) return;
    const mask = `radial-gradient(circle at ${state.x.toFixed(2)}px ${state.y.toFixed(2)}px, transparent ${Math.max(0, state.radius).toFixed(2)}px, #000 ${(state.radius + feather).toFixed(2)}px)`;
    layer.style.maskImage = mask;
    layer.style.webkitMaskImage = mask;
    layer.style.opacity = state.opacity;
  };
  paint();
  host.appendChild(layer);

  return {
    contract(timeline, duration = 0.3, position = 0) {
      timeline.to(state, { radius: config.aperture, opacity: 1, duration,
        ease: "power2.inOut", onUpdate: paint }, position);
    },
    move(timeline, rect, duration, position, ease = "power2.inOut") {
      timeline.to(state, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2,
        duration, ease, onUpdate: paint }, position);
    },
    reveal(timeline, rect, position, duration = config.revealDuration) {
      // Cover every corner even when the destination lies near a screen edge.
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      timeline.to(state, { radius: focusCoverage(x, y, width, height) + feather,
        opacity: 0, duration, ease: "power2.inOut", onUpdate: paint }, position);
    },
    dispose() {
      disposed = true;
      layer.remove();
    },
  };
}
