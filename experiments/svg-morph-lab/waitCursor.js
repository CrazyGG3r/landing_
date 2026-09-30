import arrowSvg from "./arrow.svg?raw";
import triggerSvg from "./trigger.svg?raw";

// Clockwise stations from wait.svg, starting with the far/top ellipse.
const STATIONS = [
  [109.156, 13.343, 14.509, 13.343],
  [159.339, 30.722, 16.227, 14.737],
  [194.363, 69.122, 21.066, 19.532],
  [186.745, 127.251, 31.144, 29.784],
  [108.79, 171.378, 40.456, 39.45],
  [31.05, 127.592, 31.05, 29.75],
  [23.75, 69.457, 21.037, 19.428],
  [58.869, 31.008, 16.182, 14.694],
];
const COUNT = 96;
const CYCLE_MS = 2500;
const MORPH_MS = 360;
const ENTER_MS = 440;
const EXIT_MS = 340;
const WAIT_MS = 5000;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const ease = (value) => value * value * (3 - 2 * value);
const fixed = (value, places = 2) => value.toFixed(places);

function sourcePath(svg) {
  return new DOMParser().parseFromString(svg, "image/svg+xml").querySelector("path").getAttribute("d");
}

function sampleOutline(path, data) {
  path.setAttribute("d", data);
  const length = path.getTotalLength();
  const points = Array.from({ length: COUNT }, (_, index) => {
    const point = path.getPointAtLength(index / COUNT * length);
    return [point.x, point.y];
  });
  let tipIndex = 0;
  for (let index = 1; index < COUNT; index++) {
    if (points[index][0] < points[tipIndex][0]) tipIndex = index;
  }
  const tip = points[tipIndex];
  return Array.from({ length: COUNT }, (_, index) => {
    const point = points[(tipIndex + index) % COUNT];
    return [point[0] - tip[0], point[1] - tip[1]];
  });
}

function winding(points) {
  let area = 0;
  for (let index = 0; index < points.length; index++) {
    const next = points[(index + 1) % points.length];
    area += points[index][0] * next[1] - next[0] * points[index][1];
  }
  return Math.sign(area);
}

function pathData(points) {
  let data = `M${fixed(points[0][0])} ${fixed(points[0][1])}`;
  for (let index = 1; index < points.length; index++) {
    data += `L${fixed(points[index][0])} ${fixed(points[index][1])}`;
  }
  return `${data}Z`;
}

function catmull(a, b, c, d, fraction) {
  const t2 = fraction * fraction;
  const t3 = t2 * fraction;
  return .5 * ((2 * b) + (-a + c) * fraction
    + (2 * a - 5 * b + 4 * c - d) * t2
    + (-a + 3 * b - 3 * c + d) * t3);
}

function station(position, field) {
  const start = Math.floor(position);
  const fraction = position - start;
  const at = (index) => STATIONS[(index + STATIONS.length * 2) % STATIONS.length][field];
  return catmull(at(start - 1), at(start), at(start + 1), at(start + 2), fraction);
}

function isClickable(target) {
  const element = target.closest('a[href], button, input, select, textarea, [role="button"], [role="link"], [tabindex]');
  return !!element && !element.matches(':disabled, [aria-disabled="true"], [inert], [tabindex="-1"]')
    && !element.closest('[inert], [aria-disabled="true"]');
}

export function initWaitCursor({ desktop, reducedMotion }) {
  const site = document.querySelector(".site");
  const shell = document.querySelector("#cursor-shell");
  const glyph = document.querySelector("#cursor-glyph");
  const rotor = document.querySelector("#cursor-rotor");
  const shape = document.querySelector("#cursor-shape");
  const ellipses = [...document.querySelectorAll("#wait-cursor ellipse")];
  const trigger = document.querySelector("#trigger-wait");
  const status = document.querySelector("#cursor-mode");

  const arrow = sampleOutline(shape, sourcePath(arrowSvg));
  const hand = sampleOutline(shape, sourcePath(triggerSvg));
  if (winding(arrow) !== winding(hand)) hand.splice(1, COUNT - 1, ...hand.slice(1).reverse());
  const circle = Array.from({ length: COUNT }, (_, index) => {
    const angle = Math.PI + winding(arrow) * index * Math.PI * 2 / COUNT;
    return [Math.cos(angle) * 10, Math.sin(angle) * 10];
  });
  const outlines = { arrow, trigger: hand, wait: circle };
  shape.setAttribute("d", pathData(arrow));

  let x = -100;
  let y = -100;
  let previousX = -100;
  let previousY = -100;
  let interactive = false;
  let frame = 0;
  let lastFrame = 0;
  let expiry = 0;
  let activeUntil = 0;
  let phaseStart = 0;
  let waitMode = "idle";
  let waitProgress = 0;
  let waitFrom = 0;
  let waitStart = 0;
  let waitLength = ENTER_MS;
  let shapeName = "arrow";
  let shapeFrom = arrow;
  let shapeTo = arrow;
  let shapeStart = 0;
  let morphing = false;
  let angle = 0;
  let angularVelocity = 0;
  let angleTarget = 0;

  const requestFrame = () => {
    if (!frame && desktop.matches && !document.hidden) frame = requestAnimationFrame(paint);
  };
  const currentPoints = (now) => {
    if (!morphing) return shapeTo;
    const t = ease(clamp((now - shapeStart) / MORPH_MS, 0, 1));
    return shapeFrom.map((point, index) => [
      point[0] + (shapeTo[index][0] - point[0]) * t,
      point[1] + (shapeTo[index][1] - point[1]) * t,
    ]);
  };
  const morphTo = (name, now) => {
    if (shapeName === name) return;
    shapeFrom = currentPoints(now);
    shapeTo = outlines[name];
    shapeName = name;
    shapeStart = now;
    morphing = !reducedMotion.matches;
    if (!morphing) shape.setAttribute("d", pathData(shapeTo));
    requestFrame();
  };
  const renderOrbit = (now) => {
    if (waitProgress === 0) {
      for (const ellipse of ellipses) ellipse.style.opacity = "0";
      glyph.style.opacity = "1";
      return;
    }
    const phase = reducedMotion.matches ? 0 : ((now - phaseStart) / CYCLE_MS * STATIONS.length) % STATIONS.length;
    for (let index = 0; index < ellipses.length; index++) {
      const position = index + phase;
      const radiusX = station(position, 2);
      const radiusY = station(position, 3);
      const px = 217.88852 / 2 + (station(position, 0) - 217.88852 / 2) * waitProgress;
      const py = 210.82834 / 2 + (station(position, 1) - 210.82834 / 2) * waitProgress;
      const size = .06 + .94 * waitProgress;
      const depth = clamp((radiusX - 14) / 27, 0, 1);
      ellipses[index].setAttribute("transform", `translate(${fixed(px)} ${fixed(py)}) scale(${fixed(radiusX / 14.509 * size, 3)} ${fixed(radiusY / 13.343 * size, 3)})`);
      ellipses[index].style.opacity = String(waitProgress * (.48 + depth * .52));
    }
    glyph.style.opacity = String(1 - waitProgress);
  };
  const finishWait = (now) => {
    waitMode = "idle";
    waitProgress = 0;
    renderOrbit(now);
    morphTo(interactive ? "trigger" : "arrow", now);
    trigger.classList.remove("is-active");
    status.textContent = interactive ? "CURSOR / TRIGGER" : "CURSOR / ARROW";
  };
  const beginExit = (now) => {
    if (waitMode === "idle" || waitMode === "exit") return;
    morphTo(interactive ? "trigger" : "arrow", now);
    if (reducedMotion.matches || !desktop.matches) {
      finishWait(now);
      return;
    }
    waitMode = "exit";
    waitFrom = waitProgress;
    waitStart = now;
    waitLength = Math.max(90, EXIT_MS * waitProgress);
    status.textContent = "CURSOR / RETURNING";
    requestFrame();
  };

  function paint(now) {
    frame = 0;
    const step = clamp((now - (lastFrame || now)) / 16.67, 0, 2);
    lastFrame = now;
    shell.style.transform = `translate3d(${fixed(x)}px, ${fixed(y)}px, 0)`;
    if (morphing) {
      shape.setAttribute("d", pathData(currentPoints(now)));
      if (now - shapeStart >= MORPH_MS) morphing = false;
    }
    if (waitMode === "enter" || waitMode === "exit") {
      const t = clamp((now - waitStart) / waitLength, 0, 1);
      waitProgress = waitFrom + ((waitMode === "enter" ? 1 : 0) - waitFrom) * ease(t);
      if (t === 1) {
        if (waitMode === "exit") finishWait(now);
        else {
          waitMode = "active";
          waitProgress = 1;
        }
      }
    }
    if (waitMode === "active" && now >= activeUntil) beginExit(now);
    if (waitMode !== "idle") renderOrbit(now);
    if (!reducedMotion.matches) {
      angleTarget *= Math.pow(.83, step);
      angularVelocity = (angularVelocity + (angleTarget - angle) * .13 * step) * Math.pow(.72, step);
      angle += angularVelocity * step;
      if (Math.abs(angle) + Math.abs(angularVelocity) + Math.abs(angleTarget) < .08) {
        angle = angularVelocity = angleTarget = 0;
      }
      rotor.setAttribute("transform", `rotate(${fixed(angle, 2)})`);
    }
    if (morphing || (waitMode !== "idle" && waitMode !== "static") || angle !== 0) requestFrame();
  }

  const activate = () => {
    if (!desktop.matches) return;
    const now = performance.now();
    if (expiry) clearTimeout(expiry);
    activeUntil = now + WAIT_MS;
    expiry = setTimeout(() => {
      expiry = 0;
      beginExit(performance.now());
    }, WAIT_MS);
    trigger.classList.add("is-active");
    status.textContent = "CURSOR / WAITING";
    if (waitMode === "idle") phaseStart = now;
    morphTo("wait", now);
    if (reducedMotion.matches) {
      waitMode = "static";
      waitProgress = 1;
      renderOrbit(now);
      return;
    }
    if (waitMode !== "active") {
      waitMode = "enter";
      waitFrom = waitProgress;
      waitStart = now;
      waitLength = Math.max(90, ENTER_MS * (1 - waitProgress));
    }
    requestFrame();
  };

  site.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || !desktop.matches) return;
    previousX = x;
    previousY = y;
    x = event.clientX;
    y = event.clientY;
    shell.classList.add("is-visible");
    const nextInteractive = isClickable(event.target);
    if (nextInteractive !== interactive) {
      interactive = nextInteractive;
      if (waitMode === "idle") {
        morphTo(interactive ? "trigger" : "arrow", performance.now());
        status.textContent = interactive ? "CURSOR / TRIGGER" : "CURSOR / ARROW";
      }
    }
    if (!reducedMotion.matches && !interactive && waitMode === "idle" && previousX >= 0) {
      angleTarget = clamp((x - previousX) * .75 + (y - previousY) * .22, -26, 26);
    } else angleTarget = 0;
    requestFrame();
  }, { passive: true });
  site.addEventListener("pointerleave", () => shell.classList.remove("is-visible"));
  trigger.addEventListener("click", activate);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    } else {
      if (waitMode !== "idle" && performance.now() >= activeUntil) beginExit(performance.now());
      requestFrame();
    }
  });
  desktop.addEventListener("change", () => {
    if (desktop.matches) return;
    if (expiry) clearTimeout(expiry);
    expiry = 0;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    shell.classList.remove("is-visible");
    morphTo("arrow", performance.now());
    finishWait(performance.now());
  });
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      morphing = false;
      shape.setAttribute("d", pathData(shapeTo));
      angle = angularVelocity = angleTarget = 0;
      rotor.setAttribute("transform", "rotate(0)");
      if (waitMode !== "idle") {
        waitMode = "static";
        waitProgress = 1;
        renderOrbit(performance.now());
      }
    } else if (waitMode === "static") {
      waitMode = "active";
      phaseStart = performance.now();
      requestFrame();
    }
  });
}
