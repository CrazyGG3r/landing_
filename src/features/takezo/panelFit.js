// All resizing titles share one frame. Each phase writes every title before
// reading any of them, so 36 panels do not force 36 separate layout searches.
const pending = new Set();
const owners = new WeakMap();
let observer;
let frame = 0;
let metricsContext;
const setData = (el, name, value) => {
  const next = String(value);
  if (el.dataset[name] !== next) el.dataset[name] = next;
};
const setStyle = (el, name, value) => {
  if (el.style.getPropertyValue(name) !== value) el.style.setProperty(name, value);
};

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

function flush() {
  frame = 0;
  const jobs = [...pending].filter((job) => job.el.isConnected);
  pending.clear();
  const changed = jobs.filter((job) => {
    job.width = job.el.clientWidth;
    job.height = job.el.clientHeight;
    const key = `${job.width}:${job.height}:${job.box.clientWidth}:${job.box.clientHeight}`;
    return key !== job.last;
  });
  if (!changed.length) return;
  for (const job of changed) {
    const { el, width, height, expanded, compressed, logo } = job;
    const narrow = width < 190, short = height < 180;
    job.mode = !expanded && logo ? narrow && short ? "icon" : narrow ? "above" : short ? "left" : "none" : "none";
    job.vertical = !expanded && width < 180 && height > width * 1.7;
    const full = !compressed && width > 200 && height > 200 && (expanded || (width > 275 && height > 300));
    setData(el, "logoMode", job.mode);
    setData(el, "vertical", job.vertical);
    setData(el, "full", full);
    if (job.interior.getAttribute("aria-hidden") !== String(!full)) job.interior.setAttribute("aria-hidden", String(!full));
    if (job.interior.inert !== !full) job.interior.inert = !full;
    setData(el, "tiny", width < 105 || height < 150);
    setData(el, "micro", width < 60 || height < 85);
    setStyle(el, "--panel-pad", `${Math.max(10, Math.min(23, width * .075, height * .12))}px`);
  }
  const left = changed.filter((job) => job.mode === "left");
  for (const job of left) job.reserve = Math.min(64.8, Math.max(1, job.box.parentElement.clientHeight - 4)) + 12;
  for (const job of left) setStyle(job.el, "--logo-reserve", `${job.reserve}px`);

  // Icon-only tiles do not need invisible text fitting. Other titles retain
  // the original exact DOM-based wrapping and 12-step subpixel precision.
  for (let pass = 0; pass < (left.length ? 3 : 1); pass++) {
    const fitted = pass ? left : changed.filter((job) => job.mode !== "icon");
    for (const job of fitted) {
      job.boxWidth = job.box.clientWidth - 4;
      job.boxHeight = job.box.clientHeight - 4;
      job.low = 1;
      job.high = job.vertical ? Math.min(64, job.width * .65) : Math.min(60, Math.max(18, job.width * .18));
    }
    for (const job of fitted) job.label.style.fontSize = `${job.high}px`;
    // Most spacious titles already fit at the design ceiling; no search needed.
    const searching = fitted.filter((job) => {
      if (job.label.scrollWidth <= job.boxWidth && job.label.scrollHeight <= job.boxHeight) {
        job.low = job.high;
        return false;
      }
      return true;
    });
    for (let round = 0; round < 12 && searching.length; round++) {
      for (const job of searching) {
        job.size = (job.low + job.high) / 2;
        job.label.style.fontSize = `${job.size}px`;
      }
      for (const job of searching) {
        if (job.label.scrollWidth <= job.boxWidth && job.label.scrollHeight <= job.boxHeight) job.low = job.size;
        else job.high = job.size;
      }
    }
    for (const job of fitted) job.label.style.fontSize = `${job.low}px`;
    for (const job of left) job.ink = ink(job);
    for (const job of left) setStyle(job.el, "--logo-reserve", `${job.ink.height + 12}px`);
  }
  for (const job of left) job.logoY = job.box.offsetTop + 2 + job.ink.top + job.ink.height / 2;
  for (const job of left) {
    setStyle(job.el, "--inline-logo-size", `${job.ink.height}px`);
    setStyle(job.el, "--inline-logo-y", `${job.logoY}px`);
  }
  for (const job of changed) job.last = `${job.width}:${job.height}:${job.box.clientWidth}:${job.box.clientHeight}`;
}

function queue(job) {
  pending.add(job);
  if (!frame) frame = requestAnimationFrame(flush);
}

export function observePanelFit(job) {
  observer ||= new ResizeObserver((entries) => {
    for (const entry of entries) {
      const job = owners.get(entry.target);
      if (job) queue(job);
    }
  });
  job.interior = job.el.querySelector(".tz-adaptive-interior");
  for (const el of [job.el, job.box]) { owners.set(el, job); observer.observe(el); }
  queue(job);
  let disposed = false;
  document.fonts.ready.then(() => { if (!disposed) { job.last = null; queue(job); } });
  return () => {
    disposed = true;
    for (const el of [job.el, job.box]) { observer.unobserve(el); owners.delete(el); }
    pending.delete(job);
    if (!pending.size) { cancelAnimationFrame(frame); frame = 0; }
  };
}
