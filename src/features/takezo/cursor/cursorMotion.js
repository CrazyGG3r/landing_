import arrowSvg from "./arrow.svg?raw";
import triggerSvg from "./trigger.svg?raw";
import waitSvg from "./wait.svg?raw";

const COUNT = 96;
const MORPH_MS = 360;
const ENTER_MS = 440;
const EXIT_MS = 340;
const CYCLE_MS = 2500;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const ease = (value) => value * value * (3 - 2 * value);
const fixed = (value, places = 2) => value.toFixed(places);

function source(svg) {
  return new DOMParser().parseFromString(svg, "image/svg+xml");
}

function outline(path, data, tipAxis) {
  path.setAttribute("d", data);
  const length = path.getTotalLength();
  // The hand's leftmost edge is its thumb, while its actual pointing tip is
  // the raised finger. Keep each semantic tip at (0, 0) for the whole morph.
  const probes = COUNT * 4;
  const step = length / probes;
  let best = 0;
  let minimum = Infinity;
  for (let index = 0; index < probes; index++) {
    const value = path.getPointAtLength(index * step)[tipAxis];
    if (value < minimum) {
      minimum = value;
      best = index * step;
    }
  }
  let low = best - step;
  let high = best + step;
  for (let index = 0; index < 12; index++) {
    const first = low + (high - low) / 3;
    const second = high - (high - low) / 3;
    if (path.getPointAtLength(first)[tipAxis] < path.getPointAtLength(second)[tipAxis]) high = second;
    else low = first;
  }
  const tipLength = (low + high) / 2;
  const tip = path.getPointAtLength(tipLength);
  return Array.from({ length: COUNT }, (_, index) => {
    const point = path.getPointAtLength((tipLength + index / COUNT * length) % length);
    return [point.x - tip.x, point.y - tip.y];
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

function catmull(a, b, c, d, t) {
  return .5 * ((2 * b) + (-a + c) * t
    + (2 * a - 5 * b + 4 * c - d) * t * t
    + (-a + 3 * b - 3 * c + d) * t * t * t);
}

function waitStations() {
  const svg = source(waitSvg).documentElement;
  const box = svg.viewBox.baseVal;
  const centerX = box.x + box.width / 2;
  const centerY = box.y + box.height / 2;
  const stations = [...svg.querySelectorAll("ellipse")].map((ellipse) => ["cx", "cy", "rx", "ry"]
    .map((attribute) => Number(ellipse.getAttribute(attribute))));
  stations.sort((a, b) => {
    const phase = ([x, y]) => (Math.atan2(x - centerX, centerY - y) + Math.PI * 2) % (Math.PI * 2);
    return phase(a) - phase(b);
  });
  return { stations, centerX, centerY };
}

function clickable(target, chunk) {
  if (chunk) return chunk.matches('a[href], button:not(:disabled)');
  const element = target?.closest?.('a[href], button, input, select, textarea, [role="button"], [role="link"], [tabindex]');
  return !!element && !element.matches(':disabled, [aria-disabled="true"], [inert], [tabindex="-1"]')
    && !element.closest('[inert], [aria-disabled="true"]');
}

function svgElement(name, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
  return element;
}

export function createCursorMotion({ root }) {
  const shell = document.createElement("span");
  shell.className = "tz-cursor";
  shell.dataset.state = "arrow";
  shell.setAttribute("aria-hidden", "true");
  const glyph = svgElement("svg", { class: "tz-cursor-glyph", viewBox: "-20 -130 245 355", "aria-hidden": "true", focusable: "false" });
  const rotor = svgElement("g");
  const path = svgElement("path");
  rotor.append(path);
  glyph.append(rotor);
  const orbit = svgElement("svg", { class: "tz-cursor-orbit", viewBox: "0 0 217.88852 210.82834", "aria-hidden": "true", focusable: "false" });
  const ellipses = Array.from({ length: 8 }, () => svgElement("ellipse", { cx: "0", cy: "0", rx: "14.509", ry: "13.343" }));
  orbit.append(...ellipses);
  shell.append(glyph, orbit);
  root.prepend(shell);
  const pointerMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
  const arrow = outline(path, source(arrowSvg).querySelector("path").getAttribute("d"), "x");
  const trigger = outline(path, source(triggerSvg).querySelector("path").getAttribute("d"), "y");
  if (winding(arrow) !== winding(trigger)) trigger.splice(1, COUNT - 1, ...trigger.slice(1).reverse());
  const circle = Array.from({ length: COUNT }, (_, index) => {
    const angle = Math.PI + winding(arrow) * index * Math.PI * 2 / COUNT;
    return [Math.cos(angle) * 10, Math.sin(angle) * 10];
  });
  const shapes = { arrow, trigger, wait: circle };
  const { stations, centerX, centerY } = waitStations();
  path.setAttribute("d", pathData(arrow));

  let reduced = false;
  let x = -100;
  let y = -100;
  let previousX = -100;
  let previousY = -100;
  let targetX = x;
  let targetY = y;
  let layerPanel = null;
  let magneticChunk = null;
  let magneticUntil = 0;
  let interactive = false;
  let frame = 0;
  let lastFrame = 0;
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
  let rotation = 0;
  let rotationVelocity = 0;
  let rotationTarget = 0;

  const positionShell = () => {
    if (layerPanel && !layerPanel.isConnected) {
      layerPanel = null;
      shell.dataset.local = "false";
      root.append(shell);
    }
    if (layerPanel) {
      const rect = layerPanel.getBoundingClientRect();
      const localX = (targetX - rect.left) * layerPanel.offsetWidth / Math.max(1, rect.width);
      const localY = (targetY - rect.top) * layerPanel.offsetHeight / Math.max(1, rect.height);
      shell.style.transform = `translate3d(${fixed(localX)}px, ${fixed(localY)}px, 0)`;
    } else shell.style.transform = `translate3d(${fixed(targetX)}px, ${fixed(targetY)}px, 0)`;
  };
  const syncLayer = (panel) => {
    const next = waitMode === "idle" ? panel : null;
    const changed = next !== layerPanel || shell.parentNode !== (next || root);
    if (changed) {
      if (layerPanel?.isConnected) delete layerPanel.dataset.cursorLayered;
      layerPanel = next;
      (next || root).append(shell);
      if (next) next.dataset.cursorLayered = "true";
      shell.dataset.local = next ? "true" : "false";
    }
    shell.dataset.diminished = next?.dataset.cursorDiminish === "true" ? "true" : "false";
    if (changed) positionShell();
  };

  const requestFrame = () => {
    if (!frame && pointerMedia.matches && !document.hidden) frame = requestAnimationFrame(paint);
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
    shapeTo = shapes[name];
    shapeName = name;
    shapeStart = now;
    morphing = !reduced;
    if (!morphing) path.setAttribute("d", pathData(shapeTo));
    requestFrame();
  };
  const station = (position, field) => {
    const start = Math.floor(position);
    const t = position - start;
    const at = (index) => stations[(index + stations.length * 2) % stations.length][field];
    return catmull(at(start - 1), at(start), at(start + 1), at(start + 2), t);
  };
  const renderOrbit = (now) => {
    if (waitProgress === 0) {
      for (const ellipse of ellipses) ellipse.style.opacity = "0";
      glyph.style.opacity = "1";
      return;
    }
    const phase = reduced ? 0 : ((now - phaseStart) / CYCLE_MS * stations.length) % stations.length;
    for (let index = 0; index < ellipses.length; index++) {
      const position = index + phase;
      const radiusX = station(position, 2);
      const radiusY = station(position, 3);
      const px = centerX + (station(position, 0) - centerX) * waitProgress;
      const py = centerY + (station(position, 1) - centerY) * waitProgress;
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
    if (x >= 0) inspect(document.elementFromPoint(x, y));
    morphTo(interactive ? "trigger" : "arrow", now);
    shell.dataset.state = interactive ? "trigger" : "arrow";
  };

  const inspect = (target) => {
    const hoveredPanel = target?.closest?.(".tz-panel");
    const panel = target?.closest?.('.tz-breakdown[data-hover-mode="contract"][data-open="true"]');
    const hit = panel && target.closest(".tz-breakdown-hit");
    const chunk = hit && panel.querySelector(`.tz-breakdown-grid > :nth-child(${Number(hit.dataset.chunkIndex) + 1})`);
    const nextInteractive = clickable(target, chunk);
    if (nextInteractive !== interactive) {
      interactive = nextInteractive;
      if (waitMode === "idle") {
        morphTo(interactive ? "trigger" : "arrow", performance.now());
        shell.dataset.state = interactive ? "trigger" : "arrow";
      }
    }
    magneticChunk = chunk || null;
    magneticUntil = magneticChunk ? performance.now() + 520 : 0;
    if (magneticChunk) {
      const rect = magneticChunk.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
    } else {
      targetX = x;
      targetY = y;
    }
    syncLayer(hoveredPanel);
  };

  function paint(now) {
    frame = 0;
    const step = clamp((now - (lastFrame || now)) / 16.67, 0, 2);
    lastFrame = now;
    if (magneticChunk?.isConnected) {
      const rect = magneticChunk.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
    } else {
      magneticChunk = null;
      targetX = x;
      targetY = y;
    }
    positionShell();
    if (morphing) {
      path.setAttribute("d", pathData(currentPoints(now)));
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
    if (waitMode !== "idle") renderOrbit(now);
    if (!reduced) {
      rotationTarget *= Math.pow(.83, step);
      rotationVelocity = (rotationVelocity + (rotationTarget - rotation) * .13 * step) * Math.pow(.72, step);
      rotation += rotationVelocity * step;
      if (Math.abs(rotation) + Math.abs(rotationVelocity) + Math.abs(rotationTarget) < .08) {
        rotation = rotationVelocity = rotationTarget = 0;
      }
      rotor.setAttribute("transform", `rotate(${fixed(rotation, 2)})`);
    }
    if (morphing || (waitMode !== "idle" && waitMode !== "static") || rotation !== 0 || (magneticChunk && now < magneticUntil)) requestFrame();
  }

  const move = (event) => {
    if (event.pointerType !== "mouse" || !pointerMedia.matches) return;
    previousX = x;
    previousY = y;
    x = event.clientX;
    y = event.clientY;
    root.dataset.customCursor = "true";
    inspect(event.target);
    if (!reduced && !interactive && waitMode === "idle" && previousX >= 0) {
      rotationTarget = clamp((x - previousX) * .75 + (y - previousY) * .22, -26, 26);
    } else rotationTarget = 0;
    requestFrame();
  };
  const enter = (event) => {
    if (event.pointerType === "mouse") move(event);
  };
  const leave = () => {
    root.dataset.customCursor = "false";
    magneticChunk = null;
    syncLayer(null);
  };
  const onVisibility = () => {
    if (document.hidden) {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    } else requestFrame();
  };
  const onPointerMedia = () => {
    if (pointerMedia.matches) return;
    leave();
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };
  const observer = new MutationObserver((changes) => {
    if (root.dataset.customCursor !== "true" || !changes.some(({ target }) => target.matches?.('.tz-breakdown[data-hover-mode="contract"]'))) return;
    inspect(document.elementFromPoint(x, y));
    requestFrame();
  });
  observer.observe(root, { subtree: true, attributes: true, attributeFilter: ["data-open", "data-active"] });
  root.addEventListener("pointerenter", enter);
  root.addEventListener("pointermove", move, { passive: true, capture: true });
  root.addEventListener("pointerleave", leave);
  document.addEventListener("visibilitychange", onVisibility);
  pointerMedia.addEventListener("change", onPointerMedia);

  return {
    setWaiting(waiting) {
      const now = performance.now();
      if (waiting) {
        if (waitMode === "active" || waitMode === "static") return;
        if (waitMode === "idle") phaseStart = now;
        syncLayer(null);
        morphTo("wait", now);
        shell.dataset.state = "wait";
        if (reduced) {
          waitMode = "static";
          waitProgress = 1;
          renderOrbit(now);
          return;
        }
        waitMode = "enter";
        waitFrom = waitProgress;
        waitStart = now;
        waitLength = Math.max(90, ENTER_MS * (1 - waitProgress));
        requestFrame();
      } else if (waitMode !== "idle" && waitMode !== "exit") {
        if (x >= 0) inspect(document.elementFromPoint(x, y));
        morphTo(interactive ? "trigger" : "arrow", now);
        if (reduced) {
          finishWait(now);
          return;
        }
        waitMode = "exit";
        waitFrom = waitProgress;
        waitStart = now;
        waitLength = Math.max(90, EXIT_MS * waitProgress);
        requestFrame();
      }
    },
    setReduced(value) {
      if (reduced === value) return;
      reduced = value;
      if (reduced) {
        morphing = false;
        path.setAttribute("d", pathData(shapeTo));
        rotation = rotationVelocity = rotationTarget = 0;
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
    },
    dispose() {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointermove", move, true);
      root.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", onVisibility);
      pointerMedia.removeEventListener("change", onPointerMedia);
      root.dataset.customCursor = "false";
      if (layerPanel?.isConnected) delete layerPanel.dataset.cursorLayered;
      shell.remove();
    },
  };
}
