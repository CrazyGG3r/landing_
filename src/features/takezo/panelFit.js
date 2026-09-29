// Every panel shares one ResizeObserver and one animation frame. Geometry is
// read first, state is written second, and title fitting is measured in a
// bounded batch so even the 36-tile atlas avoids resize/layout thrashing.
const pending = new Set();
const owners = new WeakMap();
let observer;
let frame = 0;
let metricsContext;
const activeJobs = new Set();
const fitRounds = 10;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const round = (value, precision = 1000) => Math.round(value * precision) / precision;
const pixels = (value) => Number.parseFloat(value) || 0;
const setData = (el, name, value) => {
  const next = String(value);
  if (el.dataset[name] !== next) el.dataset[name] = next;
};
const setStyle = (el, name, value) => {
  if (el.style.getPropertyValue(name) !== value) el.style.setProperty(name, value);
};

export function panelMetrics(width, height) {
  const safeWidth = Math.max(0, width);
  const safeHeight = Math.max(0, height);
  const shortest = Math.min(safeWidth, safeHeight);
  const area = safeWidth * safeHeight;
  const aspect = safeHeight ? safeWidth / safeHeight : 1;
  const fluid = clamp((Math.sqrt(area) - 76) / 360, 0, 1);
  const density = shortest < 70 || area < 6500
    ? "micro"
    : shortest < 112 || area < 13000
      ? "tiny"
      : shortest < 172 || area < 30000
        ? "compact"
        : shortest < 245 || area < 62000
          ? "standard"
          : "roomy";
  const orientation = aspect > 1.55 ? "landscape" : aspect < .67 ? "portrait" : "balanced";
  return { width: safeWidth, height: safeHeight, shortest, area, aspect, fluid, density, orientation };
}

function ink(job) {
  metricsContext ||= document.createElement("canvas").getContext("2d");
  const style = getComputedStyle(job.label);
  metricsContext.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const metrics = metricsContext.measureText(job.text);
  const ascent = metrics.fontBoundingBoxAscent ?? metrics.actualBoundingBoxAscent;
  const descent = metrics.fontBoundingBoxDescent ?? metrics.actualBoundingBoxDescent;
  return {
    top: (parseFloat(style.lineHeight) - ascent - descent) / 2 + ascent - metrics.actualBoundingBoxAscent,
    height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
  };
}

function writeGeometry(job) {
  const { el, metrics, expanded = false, compressed = false, logo = null } = job;
  const { width, height, shortest, aspect, fluid, density, orientation } = metrics;
  const narrow = width < 190;
  const short = height < 180;
  job.mode = !expanded && logo ? narrow && short ? "icon" : narrow ? "above" : short ? "left" : "none" : "none";
  job.vertical = !expanded && width < 180 && height > width * 1.7;
  const full = !compressed && width > 200 && height > 200 && (expanded || (width > 275 && height > 300));

  setData(el, "density", density);
  setData(el, "orientation", orientation);
  setData(el, "logoMode", job.mode);
  setData(el, "vertical", job.vertical);
  setData(el, "full", full);
  setData(el, "tiny", density === "micro" || density === "tiny");
  setData(el, "micro", density === "micro");
  setData(el, "shallow", height < 240);
  setData(el, "roomy", density === "roomy");

  if (job.interior) {
    if (job.interior.getAttribute("aria-hidden") !== String(!full)) job.interior.setAttribute("aria-hidden", String(!full));
    if (job.interior.inert !== !full) job.interior.inert = !full;
  }

  const pad = clamp(Math.min(width * .075, height * .12), density === "micro" ? 7 : 10, 23);
  const meta = clamp(7 + fluid * 2.5, 7, 9.5);
  const copy = clamp(11 + fluid * 5, 11, 16);
  const gap = clamp(3 + fluid * 7, 3, 10);
  const motionX = clamp((aspect - 1) * 3.5, -4, 5);
  const motionY = clamp((1 - fluid) * 3 - (expanded ? 2 : 0), -2, 3);
  const artScale = .94 + fluid * .06;

  setStyle(el, "--panel-pad", `${round(pad)}px`);
  setStyle(el, "--panel-meta-size", `${round(meta)}px`);
  setStyle(el, "--panel-copy-size", `${round(copy)}px`);
  setStyle(el, "--panel-fluid-gap", `${round(gap)}px`);
  setStyle(el, "--panel-fluid", String(round(fluid)));
  setStyle(el, "--panel-short", `${round(shortest)}px`);
  setStyle(el, "--panel-motion-x", `${round(motionX)}px`);
  setStyle(el, "--panel-motion-y", `${round(motionY)}px`);
  setStyle(el, "--panel-art-scale", String(round(artScale)));
}

function titleCeiling(job) {
  if (job.vertical) {
    const glyphUnits = [...job.text].reduce((total, character) => total + (/\s/.test(character) ? .45 : 1), 0);
    const heightCeiling = job.boxHeight / Math.max(1, glyphUnits) * .92;
    return Math.max(6, Math.min(64, job.metrics.width * .65, heightCeiling));
  }
  const base = Math.min(job.expanded ? 72 : 60, Math.max(18, job.metrics.width * (job.expanded ? .2 : .18)));
  return Math.max(8, base);
}

function legacyTitleBox(job) {
  const content = job.label.parentElement;
  const contentStyle = getComputedStyle(content);
  const labelStyle = getComputedStyle(job.label);
  const horizontalPadding = pixels(contentStyle.paddingLeft) + pixels(contentStyle.paddingRight);
  const verticalPadding = pixels(contentStyle.paddingTop) + pixels(contentStyle.paddingBottom);
  const labelMargins = pixels(labelStyle.marginTop) + pixels(labelStyle.marginBottom);
  const occupied = [...content.children].reduce((total, child) => {
    if (child === job.label || getComputedStyle(child).position === "absolute") return total;
    return total + child.offsetHeight;
  }, 0);
  return {
    width: Math.max(1, content.clientWidth - horizontalPadding),
    // The identity card intentionally layers its portrait, locales, and title.
    // Only its horizontal edge is a hard constraint; the other cards retain a
    // vertical budget so their title and supporting copy cannot collide.
    height: job.el.dataset.panel === "0"
      ? Number.POSITIVE_INFINITY
      : Math.max(1, content.clientHeight - verticalPadding - occupied - labelMargins - 4),
  };
}

function authoredTitleSize(job) {
  if (typeof job.label.cloneNode !== "function") return pixels(getComputedStyle(job.label).fontSize) || 16;
  const probe = job.label.cloneNode(true);
  probe.removeAttribute("style");
  probe.setAttribute("aria-hidden", "true");
  probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;inset:0 auto auto 0;";
  job.label.parentElement.appendChild(probe);
  const size = pixels(getComputedStyle(probe).fontSize) || 16;
  probe.remove();
  return size;
}

function fitLegacyTitle(job) {
  // A hidden probe resolves the authored responsive clamp independently of a
  // previous inline fit, so the title can grow back when its panel gains room.
  const ceiling = authoredTitleSize(job);
  const box = legacyTitleBox(job);
  let low = 8;
  let high = ceiling;
  job.label.style.fontSize = `${high}px`;
  if (job.label.scrollWidth <= box.width + 1 && job.label.scrollHeight <= box.height + 1) low = high;
  else {
    for (let roundIndex = 0; roundIndex < fitRounds; roundIndex++) {
      const size = (low + high) / 2;
      job.label.style.fontSize = `${size}px`;
      if (job.label.scrollWidth <= box.width + 1 && job.label.scrollHeight <= box.height + 1) low = size;
      else high = size;
    }
  }
  const size = Math.floor(low * 100) / 100;
  job.label.style.fontSize = `${size}px`;
  setStyle(job.el, "--panel-title-size", `${size}px`);
  setData(job.el, "titleOverflow", job.label.scrollWidth > box.width + 1 || job.label.scrollHeight > box.height + 1);
}

function flush() {
  frame = 0;
  const jobs = [...pending].filter((job) => job.el?.isConnected);
  pending.clear();

  const changed = jobs.filter((job) => {
    const width = job.el.clientWidth;
    const height = job.el.clientHeight;
    const boxWidth = job.box?.clientWidth ?? 0;
    const boxHeight = job.box?.clientHeight ?? 0;
    const key = `${width}:${height}:${boxWidth}:${boxHeight}:${job.expanded}:${job.compressed}`;
    if (key === job.last) return false;
    job.key = key;
    job.metrics = panelMetrics(width, height);
    return true;
  });
  if (!changed.length) return;

  for (const job of changed) writeGeometry(job);
  for (const job of changed.filter((job) => job.legacyTitle)) fitLegacyTitle(job);
  const fitting = changed.filter((job) => job.label && job.box && job.mode !== "icon");
  const left = fitting.filter((job) => job.mode === "left");

  for (let pass = 0; pass < (left.length ? 3 : 1); pass++) {
    const fitted = pass ? left : fitting;
    for (const job of fitted) {
      job.boxWidth = Math.max(1, job.box.clientWidth - 4);
      job.boxHeight = Math.max(1, job.box.clientHeight - 4);
      job.low = job.metrics.density === "micro" ? 6 : 8;
      job.high = titleCeiling(job);
      job.label.style.fontSize = `${job.high}px`;
    }

    const searching = fitted.filter((job) => {
      if (job.label.scrollWidth <= job.boxWidth && job.label.scrollHeight <= job.boxHeight) {
        job.low = job.high;
        return false;
      }
      return true;
    });

    for (let roundIndex = 0; roundIndex < fitRounds && searching.length; roundIndex++) {
      for (const job of searching) {
        job.size = (job.low + job.high) / 2;
        job.label.style.fontSize = `${job.size}px`;
      }
      for (const job of searching) {
        if (job.label.scrollWidth <= job.boxWidth && job.label.scrollHeight <= job.boxHeight) job.low = job.size;
        else job.high = job.size;
      }
    }

    for (const job of fitted) {
      const size = Math.floor(job.low * 100) / 100;
      job.label.style.fontSize = `${size}px`;
      setStyle(job.el, "--panel-title-size", `${size}px`);
      setData(job.el, "titleOverflow", job.label.scrollWidth > job.boxWidth + 1 || job.label.scrollHeight > job.boxHeight + 1);
    }

    for (const job of left) {
      const measurement = ink(job);
      setStyle(job.el, "--logo-reserve", `${round(measurement.height + 12)}px`);
    }
  }

  for (const job of left) {
    const measurement = ink(job);
    setStyle(job.el, "--inline-logo-size", `${round(measurement.height)}px`);
    setStyle(job.el, "--inline-logo-y", `${round(job.box.offsetTop + 2 + measurement.top + measurement.height / 2)}px`);
  }
  for (const job of changed) job.last = job.key;
}

function queue(job) {
  pending.add(job);
  if (typeof document !== "undefined" && document.hidden) return;
  if (!frame) frame = requestAnimationFrame(flush);
}

function visibilityChanged() {
  if (document.hidden) {
    cancelAnimationFrame(frame);
    frame = 0;
    return;
  }
  for (const job of activeJobs) pending.add(job);
  if (pending.size && !frame) frame = requestAnimationFrame(flush);
}

function sharedObserver() {
  observer ||= new ResizeObserver((entries) => {
    for (const entry of entries) {
      const job = owners.get(entry.target);
      if (job) queue(job);
    }
  });
  return observer;
}

function observe(job, targets) {
  const resize = sharedObserver();
  if (!activeJobs.size && typeof document !== "undefined" && typeof document.addEventListener === "function") {
    document.addEventListener("visibilitychange", visibilityChanged);
  }
  activeJobs.add(job);
  for (const target of targets) {
    owners.set(target, job);
    resize.observe(target);
  }
  queue(job);
  let disposed = false;
  document.fonts?.ready?.then(() => {
    if (!disposed) { job.last = null; queue(job); }
  });
  return () => {
    disposed = true;
    activeJobs.delete(job);
    for (const target of targets) {
      resize.unobserve(target);
      owners.delete(target);
    }
    pending.delete(job);
    if (!pending.size && frame) { cancelAnimationFrame(frame); frame = 0; }
    if (!activeJobs.size && typeof document !== "undefined" && typeof document.removeEventListener === "function") {
      document.removeEventListener("visibilitychange", visibilityChanged);
    }
  };
}

export function observePanelFit(job) {
  if (!job.el || !job.label || !job.box) return () => {};
  job.interior = job.el.querySelector(".tz-adaptive-interior");
  return observe(job, [job.el, job.box]);
}

// Home and legacy panels use the same continuous geometry variables without
// forcing their intentionally art-directed titles through the mosaic fitter.
export function observePanelFrame(el) {
  if (!el) return () => {};
  return observe({ el, geometryOnly: true }, [el]);
}

export function observePanelTitleFit(el, label) {
  if (!el || !label) return () => {};
  return observe({ el, label, legacyTitle: true }, [el, label.parentElement]);
}
