import { useState } from "react";
import PanelAssets from "./PanelAssets";

const dirtyAssets = Object.keys(import.meta.glob("/public/images/grunge/Dirty*.png"))
  .map((path) => path.replace("/public", ""));
const prototypeAssets = Object.keys(import.meta.glob("/public/images/grunge/Prototype*.png"))
  .map((path) => path.replace("/public", ""));

export default function PanelSurface({ features, reduced = false }) {
  // Keep the chosen texture stable across hover, resize, and React renders.
  const [variants] = useState(() => ({
    Dirty: Math.floor(Math.random() * Math.max(1, dirtyAssets.length)),
    Prototype: Math.floor(Math.random() * Math.max(1, prototypeAssets.length)),
  }));
  if (!features.overlay && !features.assetEffect) return null;
  const texture = features.overlay === "Dirty"
    ? dirtyAssets[variants.Dirty]
    : features.overlay === "Prototype" ? prototypeAssets[variants.Prototype] : "/takezo/halftone.svg";
  return (
    <>{features.overlay && <div className="tz-surface" data-overlay={features.overlay} aria-hidden="true">
      <div className="tz-surface-shade" />
      {texture && <div className="tz-surface-texture" style={{ "--texture": `url("${texture}")` }} />}
    </div>}
    {features.assetEffect && features.assetImages.length > 0 && <PanelAssets effect={features.assetEffect} images={features.assetImages} options={features.assetMotion} reduced={reduced} />}
    </>
  );
}
