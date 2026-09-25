import { useEffect, useRef } from "react";
import "./takezoCursor.css";

export default function TakezoCursor({ host }) {
  const cursor = useRef(null);

  useEffect(() => {
    const root = host.current;
    const dot = cursor.current;
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    let frame = 0;
    let until = 0;
    let x = -100;
    let y = -100;
    const paint = (now) => {
      frame = 0;
      const underPointer = document.elementFromPoint(x, y);
      const panel = underPointer?.closest('.tz-breakdown[data-hover-mode="contract"][data-open="true"]');
      const hit = panel && underPointer.closest(".tz-breakdown-hit");
      const chunk = hit && panel.querySelector(`.tz-breakdown-grid > :nth-child(${Number(hit.dataset.chunkIndex) + 1})`);
      const skillChunk = underPointer?.closest('.tz-breakdown[data-hover-mode="expand"][data-open="true"] .tz-breakdown-chunk');
      const magnetic = !!chunk;
      const rect = magnetic ? chunk.getBoundingClientRect() : null;
      const targetX = rect ? rect.left + rect.width / 2 : x;
      const targetY = rect ? rect.top + rect.height / 2 : y;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      dot.dataset.magnetic = String(magnetic);
      dot.dataset.chunkHover = String(!!hit || !!skillChunk);
      dot.dataset.action = String(!!underPointer?.closest("button:not(:disabled), a, [role='button']"));
      if (magnetic && now < until) frame = requestAnimationFrame(paint);
    };
    const wake = () => {
      until = performance.now() + 520;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const move = (event) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      root.dataset.customCursor = "true";
      wake();
    };
    const enter = (event) => {
      if (event.pointerType !== "mouse") return;
      dot.style.transition = "none";
      move(event);
      requestAnimationFrame(() => { if (cursor.current) cursor.current.style.transition = ""; });
    };
    const leave = () => {
      root.dataset.customCursor = "false";
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const observer = new MutationObserver((changes) => {
      if (root.dataset.customCursor === "true" && changes.some(({ target }) => target.matches?.('.tz-breakdown[data-hover-mode="contract"]'))) wake();
    });
    observer.observe(root, { subtree: true, attributes: true, attributeFilter: ["data-open", "data-active"] });
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointermove", move, { passive: true, capture: true });
    root.addEventListener("pointerleave", leave);
    return () => {
      leave();
      observer.disconnect();
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointermove", move, true);
      root.removeEventListener("pointerleave", leave);
    };
  }, [host]);

  return <span ref={cursor} className="tz-cursor" aria-hidden="true" />;
}
