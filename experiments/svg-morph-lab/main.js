import { initWaitCursor } from "./waitCursor.js";

const POINTS = 64;
const CENTER = 320;
const TAU = Math.PI * 2;
const desktop = matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

const forms = [
  {
    name: "BLOOM",
    description: "A soft radial cadence, opening in seven measured beats.",
    accent: "#c8f785",
    radius: (angle) => 151 + 32 * Math.cos(7 * angle) + 10 * Math.cos(14 * angle + .35),
  },
  {
    name: "FLUX",
    description: "Three broad currents bend the outline into a liquid pulse.",
    accent: "#87dfec",
    radius: (angle) => 153 + 35 * Math.sin(3 * angle + .6) + 16 * Math.cos(6 * angle - .45) + 6 * Math.sin(11 * angle),
  },
  {
    name: "ASTER",
    description: "A sharper nine-point rhythm, balanced around the core.",
    accent: "#ffc68d",
    radius: (angle) => 143 + 43 * Math.cos(9 * angle + .12) + 8 * Math.cos(18 * angle + .24),
  },
  {
    name: "ORBIT",
    description: "An asymmetric field with four slow, overlapping lobes.",
    accent: "#c9a7ff",
    radius: (angle) => 155 + 27 * Math.cos(4 * angle + .45) + 18 * Math.sin(7 * angle - 1.1) + 8 * Math.cos(2 * angle),
  },
];

for (const form of forms) {
  form.samples = Float32Array.from({ length: POINTS }, (_, index) =>
    form.radius(index * TAU / POINTS - Math.PI / 2));
}

const $ = (selector) => document.querySelector(selector);
const path = $("#morph-path");
const trace = $("#trace-dot");
const stage = $(".stage-shell");
const scrub = $("#scrub");
const durationControl = $("#duration");
const autoButton = $("#auto-cycle");
const choices = [...document.querySelectorAll(".form-choice")];
const x = new Float32Array(POINTS);
const y = new Float32Array(POINTS);

let activeIndex = 0;
let current = forms[0].samples.slice();
let lastFrom = forms.at(-1).samples.slice();
let animation = null;
let frameId = 0;
let timerId = 0;
let auto = false;
let stageVisible = true;
let lastFrame = 0;
let frameIntervals = 0;
let frameCount = 0;

const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));
const rounded = (value) => Math.round(value * 10) / 10;
const ease = (value) => value < .5
  ? 4 * value * value * value
  : 1 - Math.pow(-2 * value + 2, 3) / 2;

function pathFor(radii) {
  for (let i = 0; i < POINTS; i++) {
    const angle = i * TAU / POINTS - Math.PI / 2;
    x[i] = CENTER + Math.cos(angle) * radii[i];
    y[i] = CENTER + Math.sin(angle) * radii[i];
  }

  const commands = new Array(POINTS + 1);
  commands[0] = `M${rounded(x[0])} ${rounded(y[0])}`;
  for (let i = 0; i < POINTS; i++) {
    const before = (i + POINTS - 1) % POINTS;
    const next = (i + 1) % POINTS;
    const after = (i + 2) % POINTS;
    const c1x = x[i] + (x[next] - x[before]) / 6;
    const c1y = y[i] + (y[next] - y[before]) / 6;
    const c2x = x[next] - (x[after] - x[i]) / 6;
    const c2y = y[next] - (y[after] - y[i]) / 6;
    commands[i + 1] = `C${rounded(c1x)} ${rounded(c1y)} ${rounded(c2x)} ${rounded(c2y)} ${rounded(x[next])} ${rounded(y[next])}`;
  }
  return `${commands.join(" ")} Z`;
}

function draw(radii) {
  path.setAttribute("d", pathFor(radii));
  trace.setAttribute("cy", String(rounded(CENTER - radii[0])));
}

function blend(from, to, fraction) {
  for (let i = 0; i < POINTS; i++) current[i] = from[i] + (to[i] - from[i]) * fraction;
  draw(current);
}

function updateForm(index) {
  const form = forms[index];
  document.documentElement.style.setProperty("--accent", form.accent);
  $("#form-number").textContent = String(index + 1).padStart(2, "0");
  $("#form-title").textContent = form.name;
  $("#form-description").textContent = form.description;
  $("#figure-number").textContent = String(index + 1).padStart(2, "0");
  $("#figure-name").textContent = form.name;
  choices.forEach((choice, position) => {
    const selected = position === index;
    choice.classList.toggle("is-active", selected);
    choice.setAttribute("aria-pressed", String(selected));
  });
}

function updateProgress(fraction) {
  const percent = Math.round(fraction * 100);
  scrub.value = String(percent);
  $("#scrub-value").textContent = `${percent}%`;
}

function setStatus(label) {
  $("#status-word").textContent = label;
  $("#loop-value").textContent = frameId ? "ACTIVE" : "SLEEP";
}

function clearAutoTimer() {
  if (timerId) clearTimeout(timerId);
  timerId = 0;
}

function canAnimate() {
  return desktop.matches && stageVisible && !document.hidden && !reducedMotion.matches;
}

function scheduleAuto() {
  clearAutoTimer();
  if (!auto || animation || !canAnimate()) return;
  timerId = setTimeout(() => {
    timerId = 0;
    morphTo((activeIndex + 1) % forms.length);
  }, 1450);
}

function finishAnimation() {
  if (!animation) return;
  current.set(forms[activeIndex].samples);
  draw(current);
  animation = null;
  frameId = 0;
  updateProgress(1);
  setStatus("IDLE");
  scheduleAuto();
}

function tick(now) {
  frameId = 0;
  if (!animation || !canAnimate()) {
    setStatus("PAUSED");
    return;
  }

  if (lastFrame && now - lastFrame < 120) {
    frameIntervals += now - lastFrame;
    frameCount++;
    if (frameCount >= 12) {
      const interval = frameIntervals / frameCount;
      $("#fps-value").textContent = `${Math.round(1000 / interval)} FPS`;
      $("#frame-value").textContent = `${interval.toFixed(1)} MS`;
      frameIntervals = 0;
      frameCount = 0;
    }
  }
  lastFrame = now;

  if (!animation.started) animation.started = now;
  const progress = clamp((now - animation.started) / animation.duration, 0, 1);
  const eased = ease(progress);
  blend(animation.from, forms[activeIndex].samples, eased);
  updateProgress(eased);
  if (progress >= 1) {
    finishAnimation();
    return;
  }
  frameId = requestAnimationFrame(tick);
  $("#loop-value").textContent = "ACTIVE";
}

function suspendAnimation() {
  clearAutoTimer();
  if (!animation) return;
  if (frameId) cancelAnimationFrame(frameId);
  frameId = 0;
  if (animation.started) {
    const progress = clamp((performance.now() - animation.started) / animation.duration, 0, 1);
    blend(animation.from, forms[activeIndex].samples, ease(progress));
    animation.from = current.slice();
    animation.duration = Math.max(120, animation.duration * (1 - progress));
    animation.started = 0;
  }
  lastFrame = 0;
  setStatus("PAUSED");
}

function syncEnvironment() {
  if (reducedMotion.matches) {
    setAuto(false);
    if (animation) finishAnimation();
    setStatus("REDUCED");
    return;
  }
  if (!canAnimate()) {
    suspendAnimation();
    return;
  }
  if (animation && !frameId) {
    animation.started = 0;
    frameId = requestAnimationFrame(tick);
    setStatus("MORPHING");
  } else if (!animation) {
    setStatus("IDLE");
    scheduleAuto();
  }
}

function morphTo(index) {
  clearAutoTimer();
  if (frameId) cancelAnimationFrame(frameId);
  frameId = 0;
  activeIndex = index;
  lastFrom = current.slice();
  updateForm(index);
  $("#fps-value").textContent = "—";
  $("#frame-value").textContent = "—";
  frameIntervals = 0;
  frameCount = 0;
  lastFrame = 0;

  if (reducedMotion.matches || !desktop.matches) {
    animation = { from: lastFrom };
    finishAnimation();
    return;
  }
  animation = {
    from: lastFrom,
    duration: Number(durationControl.value),
    started: 0,
  };
  updateProgress(0);
  if (canAnimate()) {
    frameId = requestAnimationFrame(tick);
    setStatus("MORPHING");
  } else {
    setStatus("PAUSED");
  }
}

function setAuto(enabled) {
  auto = enabled && !reducedMotion.matches && desktop.matches;
  autoButton.setAttribute("aria-pressed", String(auto));
  $("#auto-state").textContent = auto ? "ON" : "OFF";
  if (auto) scheduleAuto();
  else clearAutoTimer();
}

choices.forEach((choice, index) => choice.addEventListener("click", () => morphTo(index)));
$("#next-form").addEventListener("click", () => morphTo((activeIndex + 1) % forms.length));
autoButton.addEventListener("click", () => setAuto(!auto));
durationControl.addEventListener("input", () => {
  $("#duration-value").textContent = `${(Number(durationControl.value) / 1000).toFixed(1)} S`;
});
scrub.addEventListener("input", () => {
  setAuto(false);
  if (frameId) cancelAnimationFrame(frameId);
  frameId = 0;
  animation = null;
  lastFrame = 0;
  const fraction = Number(scrub.value) / 100;
  blend(lastFrom, forms[activeIndex].samples, fraction);
  updateProgress(fraction);
  setStatus("SCRUB");
});
window.addEventListener("keydown", (event) => {
  if (event.target instanceof HTMLElement && event.target.closest("button, input, a")) return;
  if (event.key === "ArrowRight") morphTo((activeIndex + 1) % forms.length);
  else if (event.key === "ArrowLeft") morphTo((activeIndex + forms.length - 1) % forms.length);
  else if (event.code === "Space") setAuto(!auto);
  else return;
  event.preventDefault();
});
document.addEventListener("visibilitychange", syncEnvironment);
desktop.addEventListener("change", syncEnvironment);
reducedMotion.addEventListener("change", syncEnvironment);
new IntersectionObserver(([entry]) => {
  stageVisible = entry.isIntersecting;
  syncEnvironment();
}, { threshold: .05 }).observe(stage);

draw(current);
updateForm(activeIndex);
updateProgress(1);
syncEnvironment();
initWaitCursor({ desktop, reducedMotion });
