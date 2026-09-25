import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { artworkColumns, artworkPositions, singleRowArtworkHeight } from "./artworkColumns";

function Marks({ software }) {
  return <span className="tz-showcase-marks">{software.map((name) =>
    <img key={name} src={`/takezo/${name}.svg`} alt={name} />)}</span>;
}

function Preview({ project }) {
  if (project.video) {
    return <video className="tz-gallery-media" src={project.video.thumb} muted loop playsInline preload="metadata" />;
  }
  const duration = Math.max(1, project.images.length) * 2.8;
  return project.images.map((image, index) => <img key={image.src} className="tz-gallery-media"
    src={image.thumb} alt="" loading="lazy"
    style={{ animationDuration: `${duration}s`, animationDelay: `${1.2 - index * 2.8}s` }} />);
}

export default function ShowcaseGallery({ cards, onOpen, reduced, paused = false, focusId = null, artwork = false }) {
  const viewport = useRef(null);
  const rail = useRef(null);
  const position = useRef(0);
  const speed = useRef(0);
  const desired = useRef(0);
  const cycle = useRef(1);
  const touch = useRef(null);
  const pendingTouch = useRef(0);
  const boundsRef = useRef(null);
  const dragged = useRef(false);
  const wake = useRef(() => {});
  const curve = useRef(() => {});
  const measured = useRef(null);
  const visibleTiles = useRef([]);
  const rowChange = useRef(null);
  const rowTween = useRef(null);
  const wheelAccum = useRef(0);
  const lastRowChange = useRef(0);
  const refreshMedia = useRef(() => {});
  const [height, setHeight] = useState(600);
  const [viewportWidth, setViewportWidth] = useState(920);
  const [rowCount, setRowCount] = useState(() => {
    const saved = artwork ? Number(sessionStorage.getItem("takezo-artwork-rows")) : 2;
    return Number.isInteger(saved) && saved >= 1 && saved <= 5 ? saved : 2;
  });
  const motionState = useRef({ paused, reduced });
  motionState.current = { paused, reduced };
  const railHeight = height * .9;
  const tileHeight = artwork && rowCount === 1
    ? singleRowArtworkHeight(cards, viewportWidth, railHeight) : railHeight;
  const groups = useMemo(() => artwork ? artworkColumns(cards, tileHeight, 18, rowCount) : [], [artwork, cards, tileHeight, rowCount]);
  const layout = useMemo(() => {
    if (!artwork) return null;
    const positions = artworkPositions(groups);
    if (rowCount !== 1) return positions;
    const top = (railHeight - tileHeight) / 2;
    return { ...positions, items: positions.items.map((item) => ({ ...item, y: item.y + top })) };
  }, [artwork, groups, rowCount, railHeight, tileHeight]);

  useLayoutEffect(() => {
    const root = viewport.current;
    const measure = () => {
      boundsRef.current = root.getBoundingClientRect();
      if (root.clientHeight !== height) setHeight(root.clientHeight);
      if (root.clientWidth !== viewportWidth) setViewportWidth(root.clientWidth);
      cycle.current = artwork && cards.length ? layout.width + 18 : rail.current.firstElementChild.offsetWidth + 18;
      const middleCards = artwork ? null : [...rail.current.children[1].children];
      const focusIndex = Math.max(0, artwork
        ? layout.items.findIndex(({ card }) => card.id === focusId)
        : middleCards.findIndex((card) => card.dataset.destination === focusId));
      const focusWidth = artwork ? layout.items[focusIndex]?.width || 0 : middleCards[focusIndex]?.offsetWidth || 0;
      const offset = artwork ? layout.items[focusIndex]?.x || 0 : middleCards[focusIndex]?.offsetLeft || 0;
      const previous = measured.current;
      if (!previous || previous.cards !== cards || previous.focusId !== focusId || previous.width !== root.clientWidth || previous.height !== root.clientHeight || previous.renderHeight !== height) {
        position.current = -cycle.current - offset + (root.clientWidth - focusWidth) / 2;
      }
      if (rowChange.current?.anchor) {
        const { clone, id, x } = rowChange.current.anchor;
        const item = layout?.items.find(({ card }) => card.id === id);
        if (item) position.current = x - Number(clone) * cycle.current - item.x - item.width / 2;
      }
      if (cycle.current > 1) {
        while (position.current < -2 * cycle.current) position.current += cycle.current;
        while (position.current > 0) position.current -= cycle.current;
      }
      measured.current = { cards, focusId, width: root.clientWidth, height: root.clientHeight, renderHeight: height };
      rail.current.style.transform = `translate3d(${position.current}px,0,0)`;
      const width = root.clientWidth;
      const tiles = [...rail.current.querySelectorAll('.tz-gallery-card')].map((element, index) => {
        let left, cardWidth;
        if (artwork && cards.length) {
          const item = layout.items[index % cards.length];
          left = Math.floor(index / cards.length) * cycle.current + item.x;
          cardWidth = item.width;
        } else {
          left = 0;
          for (let parent = element; parent && parent !== rail.current; parent = parent.offsetParent) left += parent.offsetLeft;
          cardWidth = element.offsetWidth;
        }
        return { element, left, right: left + cardWidth, center: left + cardWidth / 2, angle: null };
      });
      curve.current = () => {
        const start = -position.current - 150;
        const end = start + width + 300;
        let low = 0, high = tiles.length;
        while (low < high) {
          const middle = (low + high) >>> 1;
          if (tiles[middle].right < start) low = middle + 1;
          else high = middle;
        }
        const inView = [];
        for (let index = low; index < tiles.length && tiles[index].left <= end; index++) {
          const tile = tiles[index];
          inView.push(tile.element);
          const x = tile.center + position.current;
          const n = Math.max(-1, Math.min(1, (x - width / 2) / (width / 2)));
          const angle = motionState.current.reduced || motionState.current.paused ? 0 : -n * Math.abs(n) * 27;
          if (tile.angle === null || Math.abs(angle - tile.angle) > .1) {
            tile.element.style.setProperty('--gallery-turn', `${angle}deg`);
            tile.angle = angle;
          }
        }
        visibleTiles.current = inView;
      };
      curve.current();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    measure();
    return () => observer.disconnect();
  }, [cards, height, viewportWidth, focusId, artwork, layout]);

  useLayoutEffect(() => {
    const previous = rowChange.current;
    if (!previous) return;
    rowChange.current = null;
    if (reduced) return;
    const bounds = boundsRef.current;
    const moving = [], entering = [];
    for (const element of visibleTiles.current) {
      const rect = element.getBoundingClientRect();
      if (rect.right < bounds.left || rect.left > bounds.right) continue;
      const old = previous.rects.get(`${element.dataset.clone}:${element.dataset.destination}`);
      if (old) {
        const dx = old.left - rect.left, dy = old.top - rect.top;
        const scaleX = old.width / rect.width, scaleY = old.height / rect.height;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1 || Math.abs(scaleX - 1) > .01 || Math.abs(scaleY - 1) > .01)
          moving.push({ element, dx, dy, scaleX, scaleY });
      } else entering.push(element);
    }
    const timeline = gsap.timeline({ onComplete: () => { rowTween.current = null; } });
    for (const { element, dx, dy, scaleX, scaleY } of moving) {
      timeline.fromTo(element,
        { x: dx, y: dy, scaleX, scaleY, transformOrigin: "top left" },
        { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: .44, ease: "power2.inOut", clearProps: "transform,transformOrigin" }, 0);
    }
    if (entering.length) timeline.fromTo(entering,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: .3, ease: "power2.out", clearProps: "opacity,transform" }, .1);
    rowTween.current = timeline;
    return () => {
      timeline.kill();
      gsap.set([...moving.map(({ element }) => element), ...entering], { clearProps: "transform,transformOrigin,opacity" });
    };
  }, [rowCount, layout, reduced]);

  useEffect(() => { curve.current(); }, [paused, reduced]);

  const paintPosition = () => {
    const width = cycle.current;
    // Wheel and touch can cross multiple copies in one event.
    if (width > 1) {
      while (position.current < -2 * width) position.current += width;
      while (position.current > 0) position.current -= width;
    }
    rail.current.style.transform = `translate3d(${position.current}px,0,0)`;
    curve.current();
  };

  useEffect(() => {
    if (paused) return;
    const element = rail.current;
    let frame = 0, previous = 0;
      const tick = (now) => {
      const dt = Math.min(40, now - previous || 16);
      previous = now;
      speed.current += (desired.current - speed.current) * (reduced ? 1 : Math.min(1, dt / 170));
      position.current += speed.current * dt / 16 + pendingTouch.current;
      pendingTouch.current = 0;
      paintPosition();
      if (Math.abs(speed.current) > .01 || Math.abs(desired.current) > .01) frame = requestAnimationFrame(tick);
      else { frame = 0; speed.current = 0; element.style.willChange = "auto"; element.dataset.moving = "false"; }
    };
    wake.current = () => {
      if (!frame && !document.hidden) {
        previous = performance.now();
        element.style.willChange = "transform";
        element.dataset.moving = "true";
        frame = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      cancelAnimationFrame(frame); frame = 0;
      desired.current = 0; speed.current = 0; pendingTouch.current = 0;
      element.style.willChange = "auto";
      element.dataset.moving = "false";
    };
    const visibility = () => { if (document.hidden) stop(); };
    document.addEventListener("visibilitychange", visibility);
    return () => { stop(); wake.current = () => {}; document.removeEventListener("visibilitychange", visibility); };
  }, [reduced, paused]);

  useEffect(() => {
    if (paused) return;
    let active = false;
    const follow = (event) => {
      if (event.pointerType !== "mouse" || !active) return;
      const bounds = boundsRef.current;
      if (!bounds) return;
      const nearHeight = event.clientY >= bounds.top && event.clientY <= bounds.bottom;
      const nearWidth = event.clientX >= bounds.left - 96 && event.clientX <= bounds.right + 96;
      if (!nearHeight || !nearWidth) {
        active = false;
        desired.current = 0;
      } else {
        const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
        const n = x - .5;
        desired.current = -Math.sign(n) * Math.pow(Math.max(0, Math.abs(n) - .12) / .38, 1.45) * 15;
      }
      if (Math.abs(desired.current) > .01 || Math.abs(speed.current) > .01) wake.current();
    };
    const enter = (event) => {
      if (event.pointerType === "mouse") {
        boundsRef.current = viewport.current.getBoundingClientRect();
        active = true; follow(event);
      }
    };
    const leave = (event) => {
      if (event.pointerType !== "mouse") return;
      const bounds = boundsRef.current;
      // A cursor parked on the browser's left/right edge should keep the rail moving.
      if (event.clientY < bounds.top || event.clientY > bounds.bottom) {
        active = false; desired.current = 0; wake.current();
      }
    };
    const root = viewport.current;
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointerleave", leave);
    window.addEventListener("pointermove", follow, { passive: true });
    return () => {
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointermove", follow);
      desired.current = 0;
    };
  }, [paused]);

  useEffect(() => {
    const elements = [...viewport.current.querySelectorAll(".tz-gallery-media-wrap")];
    const visible = new Set();
    const update = (element) => {
      const active = visible.has(element) && !motionState.current.paused && !motionState.current.reduced && !document.hidden;
      if (element.dataset.active === String(active)) return;
      element.dataset.active = String(active);
      const video = element.querySelector("video");
      if (video) {
        if (active) video.play().catch(() => {});
        else video.pause();
      }
    };
    refreshMedia.current = () => visible.forEach(update);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target);
        update(entry.target);
      }
    }, { root: viewport.current, rootMargin: "80px" });
    elements.forEach((element) => observer.observe(element));
    const visibility = () => visible.forEach(update);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect(); document.removeEventListener("visibilitychange", visibility);
      refreshMedia.current = () => {};
      elements.forEach((element) => { element.dataset.active = "false"; element.querySelector("video")?.pause(); });
    };
  }, [cards, groups]);

  useEffect(() => { refreshMedia.current(); }, [paused, reduced]);

  const adjustRows = (step) => {
    const next = Math.max(1, Math.min(5, rowCount + step));
    if (next === rowCount || !cards.length) return;
    const bounds = boundsRef.current;
    const rects = new Map();
    let anchor = null, nearest = Infinity;
    for (const element of visibleTiles.current) {
      const rect = element.getBoundingClientRect();
      if (rect.right < bounds.left - 80 || rect.left > bounds.right + 80) continue;
      const clone = element.dataset.clone, id = element.dataset.destination;
      rects.set(`${clone}:${id}`, rect);
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.abs(centerX - bounds.left - bounds.width / 2)
        + .18 * Math.abs(centerY - bounds.top - bounds.height / 2);
      if (distance < nearest) { nearest = distance; anchor = { clone, id, x: centerX }; }
    }
    rowChange.current = { rects, anchor };
    desired.current = 0;
    speed.current = 0;
    sessionStorage.setItem("takezo-artwork-rows", String(next));
    setRowCount(next);
  };

  const makeCard = (card, index, clone, geometry) => {
    const project = card.project;
    const ratio = project.video ? 16 / 9 : project.images[0].width / project.images[0].height;
    const width = artwork ? Math.max(160, Math.min(480, height * .27 * ratio)) : Math.max(210, Math.min(750, height * .72 * ratio));
    return <button key={`${clone}-${card.id}`} type="button" className="tz-panel tz-gallery-card"
      data-panel={index} data-clone={clone} data-destination={card.id} tabIndex={clone === 1 ? 0 : -1}
      style={artwork ? { left: geometry.x, top: geometry.y, width: geometry.width, height: geometry.height } : { width: `${width}px` }}
      onClick={(e) => { if (!dragged.current) onOpen(card.id, e.currentTarget); }}
      aria-label={`View ${project.title}`}>
      <span className="tz-gallery-media-wrap" data-count={project.images.length}><Preview project={project} /></span>
      <span className="tz-gallery-caption">
        <span className="tz-gallery-number">{String(index + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}</span>
        <strong>{project.title}</strong>
        <span>{project.short}</span>
        <Marks software={project.software} />
      </span>
      <span className="tz-gallery-year">{project.year}</span>
      {project.category && <span className="tz-gallery-category">{project.category}</span>}
    </button>;
  };
  const instances = (clone) => artwork
    ? (cards.length ? layout.items.map(({ card, ...geometry }, index) => makeCard(card, index, clone, geometry))
      : <div className="tz-artwork-column tz-artwork-empty-column" key={`${clone}-empty`}>
        <div className="tz-panel tz-artwork-empty"><span>ARTWORKS / 00</span><strong>A SPACE<br />FOR WHAT’S NEXT.</strong><small>New work will appear here.</small></div>
      </div>)
    : cards.map((card, index) => makeCard(card, index, clone));

  return <section className={`tz-showcase-gallery ${artwork ? "tz-artwork-gallery" : ""}`} data-rows={artwork ? rowCount : undefined} ref={viewport} aria-label={artwork ? "Artwork gallery" : "Project gallery"}
    onPointerDown={(e) => {
      dragged.current = false;
      if (e.pointerType === "mouse") return;
      touch.current = { x: e.clientX, last: e.clientX };
      dragged.current = false;
    }}
    onPointerMove={(e) => {
      if (paused) return;
      if (touch.current && e.pointerType !== "mouse") {
        if (Math.abs(e.clientX - touch.current.x) > 7) dragged.current = true;
        pendingTouch.current += e.clientX - touch.current.last;
        touch.current.last = e.clientX;
        wake.current();
        return;
      }
    }}
    onPointerUp={() => { touch.current = null; }}
    onPointerCancel={() => { touch.current = null; }}
    onWheel={(e) => {
      if (paused) return;
      if (artwork && Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
        const delta = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? height : 1);
        if (Math.sign(delta) !== Math.sign(wheelAccum.current)) wheelAccum.current = 0;
        if ((rowCount === 1 && delta < 0) || (rowCount === 5 && delta > 0)) {
          wheelAccum.current = 0;
          return;
        }
        wheelAccum.current += delta;
        const now = performance.now();
        if (Math.abs(wheelAccum.current) >= 70 && now - lastRowChange.current > 470) {
          const step = Math.sign(wheelAccum.current);
          wheelAccum.current = 0;
          lastRowChange.current = now;
          adjustRows(step);
        }
        return;
      }
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      speed.current = Math.max(-28, Math.min(28, speed.current - delta * .15));
      wake.current();
    }}
    onKeyDown={(e) => {
      if (paused) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        speed.current = Math.max(-28, Math.min(28, speed.current + (e.key === "ArrowRight" ? -22 : 22)));
        wake.current();
      }
    }}>
    <div className="tz-gallery-window">
      <div className="tz-gallery-rail" ref={rail}>
        {[0, 1, 2].map((clone) => <div key={clone} className="tz-gallery-cycle" style={artwork ? { width: cards.length ? layout.width : undefined } : undefined}
          aria-hidden={clone !== 1 || undefined}>{instances(clone)}</div>)}
      </div>
    </div>
    <div className="tz-gallery-guide" aria-hidden="true"><span>← EXPLORE</span><span>{artwork ? `ARTWORKS / ${cards.length} PIECES · ${String(rowCount).padStart(2, "0")} ROWS ↕` : `SHOWCASE / ${cards.length} PROJECTS`}</span><span>EXPLORE →</span></div>
  </section>;
}
