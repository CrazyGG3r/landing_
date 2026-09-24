import { useState } from "react";

const dirtyAssets = Object.keys(import.meta.glob("/public/images/grunge/Dirty*.png"))
  .map((path) => path.replace("/public", ""));

export default function PanelSurface({ features }) {
  // Keep the chosen texture stable across hover, resize, and React renders.
  const [variant] = useState(() => Math.floor(Math.random() * Math.max(1, dirtyAssets.length)));
  if (!features.overlay) return null;
  const texture = features.overlay === "Dirty"
    ? dirtyAssets[variant]
    : "/takezo/halftone.svg";
  return (
    <div className="tz-surface" data-overlay={features.overlay} aria-hidden="true">
      <div className="tz-surface-shade" />
      {texture && <div className="tz-surface-texture" style={{ "--texture": `url("${texture}")` }} />}
    </div>
  );
}
