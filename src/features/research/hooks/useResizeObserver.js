import { useEffect } from "react";

export const useResizeObserver = (ref, callback) => {
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => callback(entry.contentRect));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref, callback]);
};