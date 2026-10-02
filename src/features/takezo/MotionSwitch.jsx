import { useEffect, useRef, useState } from "react";
import "./motion.css";

const EXIT_MS = 440;

function colorChannels(value) {
  if (!value) return null;
  const color = value.trim();
  const hex = color.match(/^#([\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i)?.[1];
  if (hex) {
    const expanded = hex.length === 3 ? [...hex].map((digit) => digit + digit).join("") : hex;
    if (expanded.length === 8 && parseInt(expanded.slice(6, 8), 16) < 21) return null;
    return [0, 2, 4].map((index) => parseInt(expanded.slice(index, index + 2), 16));
  }
  const channels = color.match(/[\d.]+/g)?.map(Number);
  return channels?.length >= 3 && (channels[3] ?? 1) > .08 ? channels.slice(0, 3) : null;
}

function reflectedEdge(element) {
  if (!element) return "rgba(255,255,255,.72)";
  // Read from the island's resting position, not its temporarily translated entry position.
  const x = Math.max(0, Math.min(window.innerWidth - 1, window.innerWidth / 2));
  const y = Math.max(0, Math.min(window.innerHeight - 1, element.offsetTop + element.offsetHeight - 2));
  const visited = new Set();

  for (const hit of document.elementsFromPoint(x, y)) {
    for (let surface = hit; surface && surface !== document.documentElement; surface = surface.parentElement) {
      if (visited.has(surface) || surface === element || element.contains(surface)) continue;
      visited.add(surface);
      const style = getComputedStyle(surface);
      const channels = colorChannels(style.getPropertyValue("--panel-base"))
        || colorChannels(style.backgroundColor);
      if (channels) {
        const mixed = channels.map((channel) => Math.round(channel + (255 - channel) * .28));
        return `rgba(${mixed.join(",")},.94)`;
      }
    }
  }
  return "rgba(255,255,255,.72)";
}

export default function MotionSwitch({
  checked,
  onChange,
  label = "Motion",
  checkedLabel = "FULL",
  uncheckedLabel = "REDUCED",
  icon = "/takezo/motion.svg",
  holdMs = 1900,
  edgeColor,
  className = "",
}) {
  const [notice, setNotice] = useState(null);
  const noticeRef = useRef(null);
  const island = useRef(null);
  const sequence = useRef(0);
  const showFrame = useRef(0);
  const edgeFrame = useRef(0);
  const hideTimer = useRef(0);
  const removeTimer = useRef(0);

  const commit = (value) => {
    noticeRef.current = value;
    setNotice(value);
  };

  const clearSchedule = () => {
    cancelAnimationFrame(showFrame.current);
    cancelAnimationFrame(edgeFrame.current);
    clearTimeout(hideTimer.current);
    clearTimeout(removeTimer.current);
  };

  useEffect(() => () => clearSchedule(), []);

  const showNotice = (nextChecked) => {
    clearSchedule();
    const id = ++sequence.current;
    const existing = noticeRef.current;
    commit({ id, checked: nextChecked, visible: existing?.visible ?? false });

    showFrame.current = requestAnimationFrame(() => {
      const current = noticeRef.current;
      if (!current || current.id !== id) return;
      if (!current.visible) commit({ ...current, visible: true });
      edgeFrame.current = requestAnimationFrame(() => {
        island.current?.style.setProperty("--tz-island-edge", edgeColor || reflectedEdge(island.current));
      });
    });

    hideTimer.current = setTimeout(() => {
      const current = noticeRef.current;
      if (!current || current.id !== id) return;
      commit({ ...current, visible: false });
      removeTimer.current = setTimeout(() => {
        if (noticeRef.current?.id === id) commit(null);
      }, EXIT_MS);
    }, holdMs);
  };

  const stateLabel = checked ? checkedLabel : uncheckedLabel;
  const iconStyle = { "--tz-motion-icon": `url("${icon}")` };

  return <>
    <button className={`tz-motion-toggle ${className}`.trim()} type="button" role="switch" aria-checked={checked}
      aria-label={`${label} ${stateLabel.toLowerCase()}`} style={iconStyle}
      onClick={() => {
        const next = !checked;
        showNotice(next);
        onChange?.(next);
      }}>
      <span className="tz-motion-icon" aria-hidden="true" />
      <span className="tz-motion-track" aria-hidden="true"><span /></span>
    </button>
    {notice && <div ref={island} className="tz-motion-island" data-full={notice.checked ? "true" : "false"}
      data-visible={notice.visible ? "true" : "false"} role="status" aria-live="polite" style={iconStyle}>
      <span className="tz-motion-island-icon" aria-hidden="true" />
      <span className="tz-motion-island-copy"><strong>{label}</strong></span>
      <span className="tz-motion-island-state">{notice.checked ? checkedLabel : uncheckedLabel}</span>
    </div>}
  </>;
}
