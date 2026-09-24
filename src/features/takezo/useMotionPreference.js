import { useEffect, useState } from "react";

const key = "takezo-motion";
export default function useMotionPreference() {
  const [preference, setPreference] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      return value === "full" || value === "reduced" ? value : null;
    } catch { return null; }
  });
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const reduced = preference ? preference === "reduced" : systemReduced;
  const toggle = () => {
    const next = reduced ? "full" : "reduced";
    setPreference(next);
    try { localStorage.setItem(key, next); } catch { /* Session preference still works without storage. */ }
  };
  return [reduced, toggle];
}
