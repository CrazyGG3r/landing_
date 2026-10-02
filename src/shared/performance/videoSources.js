import { useCallback, useEffect, useMemo, useState } from "react";
import { isIOSDevice } from "./clientCapabilities";

// Only list files that are actually shipped. The last source is a real fallback,
// not a filename guessed from an extension.
const pairs = new Map([
  ["/animations/boltforged_alpha.webm", "/animations/boltforged_alpha.mov"],
  ["/takezo/TakezoPortraitFormation.webm", "/takezo/TakezoPortraitFormation.mov"],
  ["/takezo/skillset/design/BFLogoFormation.webm", "/takezo/skillset/design/BFLogoFormation.mov"],
  ["/takezo/skillset/technical/CrabRig.webm", "/takezo/skillset/technical/CrabRig.mov"],
  ["/takezo/skillset/technical/UniJointRig.webm", "/takezo/skillset/technical/UniJointRig.mov"],
  ["/takezo/showcase/projects/videos/thumbnails/Polycrate.webm", "/takezo/showcase/projects/videos/Polycrate.mp4"],
]);

export function videoSourceOrder(source, environment = typeof navigator === "undefined" ? null : navigator) {
  if (!source) return [];
  const alternate = pairs.get(source);
  return alternate && isIOSDevice(environment) ? [alternate, source] : alternate ? [source, alternate] : [source];
}

export function useVideoSource(source) {
  const [selection, setSelection] = useState({ source, index: 0 });
  const sources = videoSourceOrder(source);
  const index = selection.source === source ? selection.index : 0;
  const src = sources[index];
  const failed = Boolean(source) && !src;
  useEffect(() => { setSelection({ source, index: 0 }); }, [source]);
  const next = useCallback(() => setSelection((previous) => ({
    source,
    index: (previous.source === source ? previous.index : 0) + 1,
  })), [source]);
  const onPlaybackError = useCallback((error) => {
    if (error?.name === "NotSupportedError" || error?.name === "EncodingError") next();
  }, [next]);
  return useMemo(() => ({ src, failed, onError: next, onPlaybackError }), [src, failed, next, onPlaybackError]);
}
