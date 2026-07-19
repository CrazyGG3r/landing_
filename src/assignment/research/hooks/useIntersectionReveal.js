import { useRef, useState, useEffect } from "react";

export const useIntersectionReveal = (threshold = 0.3) => {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setReady(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, ready];
};