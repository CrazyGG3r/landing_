import { useState } from "react";

const dirtyAssets = Object.keys(import.meta.glob("/public/images/grunge/Dirty*.png"))
  .map((path) => path.replace("/public", ""));
const prototypeAssets = Object.keys(import.meta.glob("/public/images/grunge/Prototype*.png"))
  .map((path) => path.replace("/public", ""));

export default function PanelSurface({ features }) {
  // Keep the chosen texture stable across hover, resize, and React renders.
  const [variants] = useState(() => ({
    Dirty: Math.floor(Math.random() * Math.max(1, dirtyAssets.length)),
    Prototype: Math.floor(Math.random() * Math.max(1, prototypeAssets.length)),
  }));
  if (!features.overlay) return null;
  const texture = features.overlay === "Dirty"
    ? dirtyAssets[variants.Dirty]
    : features.overlay === "Prototype" ? prototypeAssets[variants.Prototype] : "/takezo/halftone.svg";
  return (
    <div className="tz-surface" data-overlay={features.overlay} aria-hidden="true">
      <div className="tz-surface-shade" />
      {texture && <div className="tz-surface-texture" style={{ "--texture": `url("${texture}")` }} />}
    </div>
  );
}
