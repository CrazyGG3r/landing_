import { useEffect, useRef, useState } from "react";

const pickThumbnails = (sources) => {
  const pool = [...new Set(sources.filter(Boolean))];
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[swap]] = [pool[swap], pool[index]];
  }
  return pool.slice(0, 18);
};

export default function ArtThumbnailMotion({ host, sources, reduced }) {
  const stage = useRef(null);
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [thumbnails] = useState(() => pickThumbnails(sources));

  useEffect(() => {
    const panel = host.current;
    const art = stage.current;
    if (!panel || !art || reduced) return undefined;

    const paint = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      art.style.setProperty("--art-parallax-x", `${current.current.x * 11}px`);
      art.style.setProperty("--art-parallax-y", `${current.current.y * 9}px`);
      if (Math.abs(target.current.x - current.current.x) > 0.002 || Math.abs(target.current.y - current.current.y) > 0.002) {
        frame.current = requestAnimationFrame(paint);
      } else frame.current = 0;
    };
    const start = () => {
      if (!frame.current) frame.current = requestAnimationFrame(paint);
    };
    const move = (event) => {
      const rect = panel.getBoundingClientRect();
      target.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      start();
    };
    const leave = () => {
      target.current = { x: 0, y: 0 };
      start();
    };
    panel.addEventListener("pointermove", move, { passive: true });
    panel.addEventListener("pointerleave", leave, { passive: true });
    return () => {
      panel.removeEventListener("pointermove", move);
      panel.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame.current);
    };
  }, [host, reduced]);

  return (
    <span ref={stage} className="tz-art-thumbnails" aria-hidden="true">
      {thumbnails.map((src, index) => (
        <img
          src={src}
          alt=""
          key={src}
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
          style={{ "--art-order": index }}
        />
      ))}
    </span>
  );
}
