import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from "react";

const clamp = (n) => Math.max(0, Math.min(1, n));
const setData = (element, key, value) => {
  const next = String(value);
  if (element.dataset[key] !== next) element.dataset[key] = next;
};

export default forwardRef(function PanelCopy({ card, expanded, enabled, panel, reduced }, ref) {
  const viewport = useRef(null);
  const frame = useRef(0);
  const target = useRef(0);
  const axis = useRef("y");
  const updateEdges = () => {
    const el = viewport.current;
    if (!el) return;
    const horizontal = el.dataset.axis === "x";
    const position = horizontal ? el.scrollLeft : el.scrollTop;
    const max = horizontal ? el.scrollWidth - el.clientWidth : el.scrollHeight - el.clientHeight;
    setData(el, "start", position <= 1);
    setData(el, "end", position >= max - 1);
  };
  const summary = card.content?.find((layer) => layer.tag === "unhovered")?.text ?? card.description;
  const detail = card.content?.find((layer) => layer.tag === "hovered")?.text ?? card.description;
  const stop = () => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
  };

  useLayoutEffect(() => {
    const el = viewport.current;
    // Closed reading layers do not need three resize subscriptions each.
    if (!enabled || !expanded) {
      setData(el, "overflow", false);
      return;
    }
    const panelElement = el.closest(".tz-adaptive");
    let measureFrame = 0;
    const measure = () => {
      // Interests always read as one continuous vertical passage. Letting a
      // short, wide interest tile switch to columns can strand partial words
      // behind the icon rail while the panel is resizing.
      axis.current = !panelElement.classList.contains("tz-interest-panel")
        && panelElement.clientWidth > panelElement.clientHeight * 1.6 ? "x" : "y";
      setData(el, "axis", enabled ? axis.current : "y");
      const overflow = enabled && expanded && (axis.current === "x"
        ? el.scrollWidth > el.clientWidth + 1 : el.scrollHeight > el.clientHeight + 1);
      setData(el, "overflow", overflow);
      updateEdges();
    };
    const observer = new ResizeObserver(() => {
      if (!measureFrame) measureFrame = requestAnimationFrame(() => { measureFrame = 0; measure(); });
    });
    observer.observe(panelElement);
    observer.observe(el);
    observer.observe(el.firstElementChild);
    el.scrollTop = 0;
    el.scrollLeft = 0;
    target.current = 0;
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(measureFrame);
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, [expanded, enabled, detail, panel]);

  useImperativeHandle(ref, () => ({
    stop,
    move(event) {
      const el = viewport.current;
      if (!enabled || !expanded || el.dataset.overflow !== "true") return;
      const bounds = panel.current.getBoundingClientRect();
      const horizontal = axis.current === "x";
      const fraction = horizontal ? (event.clientX - bounds.left) / bounds.width : (event.clientY - bounds.top) / bounds.height;
      const max = horizontal ? el.scrollWidth - el.clientWidth : el.scrollHeight - el.clientHeight;
      target.current = clamp((fraction - .18) / .64) * max;
      if (frame.current) return;
      let previous = performance.now();
      const prop = horizontal ? "scrollLeft" : "scrollTop";
      let position = el[prop];
      const tick = (now) => {
        const blend = reduced ? 1 : 1 - Math.exp(-(now - previous) / 80);
        previous = now;
        const delta = target.current - position;
        position += delta * blend;
        el[prop] = position;
        if (Math.abs(delta) > .5) frame.current = requestAnimationFrame(tick);
        else { el[prop] = target.current; frame.current = 0; }
        updateEdges();
      };
      frame.current = requestAnimationFrame(tick);
    },
    key(event) {
      if (!expanded || !["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End", "PageDown", "PageUp"].includes(event.key)) return;
      const el = viewport.current;
      if (el.scrollHeight <= el.clientHeight && el.scrollWidth <= el.clientWidth) return;
      event.preventDefault();
      event.stopPropagation();
      stop();
      const horizontal = enabled && axis.current === "x";
      const prop = horizontal ? "scrollLeft" : "scrollTop";
      const step = horizontal ? el.clientWidth * .75 : el.clientHeight * .75;
      if (event.key === "Home") el[prop] = 0;
      else if (event.key === "End") el[prop] = horizontal ? el.scrollWidth : el.scrollHeight;
      else el[prop] += ["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key) ? -step : step;
    },
  }));

  return (
    <div className="tz-copy-layers" data-reading={expanded ? "hovered" : "unhovered"}>
      <div className="tz-copy-layer tz-copy-summary" data-text-layer="unhovered" aria-hidden={expanded}>
        <p>{summary}</p>
      </div>
      <div ref={viewport} className="tz-copy-layer tz-copy-detail" data-text-layer="hovered" aria-hidden={!expanded} onScroll={updateEdges} onWheel={stop} onTouchStart={stop}>
        <div className="tz-copy-flow"><p>{detail}</p></div>
      </div>
    </div>
  );
});
