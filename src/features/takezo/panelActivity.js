// Shared visibility gate for decorative panel work. A small root margin keeps
// media warm just before it enters the viewport while hidden tabs and distant
// panels remain fully paused.
const records = new Map();
let observer;
let listening = false;

const pageVisible = () => typeof document === "undefined" || !document.hidden;

function notify(record) {
  const active = record.intersecting && pageVisible();
  if (record.active === active) return;
  record.active = active;
  for (const callback of record.callbacks) callback(active);
}

function visibilityChanged() {
  for (const record of records.values()) notify(record);
}

function ensureObserver() {
  if (observer || typeof IntersectionObserver === "undefined") return observer;
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const record = records.get(entry.target);
      if (!record) continue;
      record.intersecting = entry.isIntersecting;
      notify(record);
    }
  }, { rootMargin: "180px 0px", threshold: 0 });
  return observer;
}

export function observePanelActivity(element, callback) {
  if (!element || typeof callback !== "function") return () => {};
  let record = records.get(element);
  if (!record) {
    record = { active: undefined, callbacks: new Set(), intersecting: true };
    records.set(element, record);
    ensureObserver()?.observe(element);
  }
  record.callbacks.add(callback);
  if (!listening && typeof document !== "undefined" && typeof document.addEventListener === "function") {
    document.addEventListener("visibilitychange", visibilityChanged);
    listening = true;
  }
  record.active = undefined;
  notify(record);

  return () => {
    const current = records.get(element);
    if (!current) return;
    current.callbacks.delete(callback);
    if (current.callbacks.size) return;
    observer?.unobserve(element);
    records.delete(element);
    if (!records.size && listening) {
      document.removeEventListener("visibilitychange", visibilityChanged);
      listening = false;
    }
  };
}
