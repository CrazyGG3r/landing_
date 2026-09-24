import { useEffect, useLayoutEffect, useRef, useState } from "react";

function Marks({ software }) {
  return <span className="tz-showcase-marks">{software.map((name) =>
    <img key={name} src={`/takezo/${name}.svg`} alt={name} title={name} />)}</span>;
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
  const dragged = useRef(false);
  const wake = useRef(() => {});
  const curve = useRef(() => {});
  const measured = useRef(null);
  const [height, setHeight] = useState(600);

  useLayoutEffect(() => {
    const root = viewport.current;
    const measure = () => {
      setHeight(root.clientHeight);
      cycle.current = rail.current.firstElementChild.offsetWidth + 18;
      const middleCards = [...rail.current.children[1].children];
      const focusIndex = Math.max(0, middleCards.findIndex((card) => artwork
        ? card.querySelector(`[data-destination="${focusId}"]`)
        : card.dataset.destination === focusId));
      const focusWidth = middleCards[focusIndex]?.offsetWidth || 0;
      const offset = middleCards.slice(0, focusIndex).reduce((sum, card) => sum + card.offsetWidth + 18, 0);
      const previous = measured.current;
      if (!previous || previous.cards !== cards || previous.focusId !== focusId || previous.width !== root.clientWidth || previous.height !== root.clientHeight || previous.renderHeight !== height) {
        position.current = -cycle.current - offset + (root.clientWidth - focusWidth) / 2;
      }
      measured.current = { cards, focusId, width: root.clientWidth, height: root.clientHeight, renderHeight: height };
      rail.current.style.transform = `translate3d(${position.current}px,0,0)`;
      const width = root.clientWidth;
      const tiles = [...rail.current.querySelectorAll('.tz-gallery-card')].map((element) => {
        let left = 0;
        for (let parent = element; parent && parent !== rail.current; parent = parent.offsetParent) left += parent.offsetLeft;
        return { element, center: left + element.offsetWidth / 2, half: element.offsetWidth / 2 };
      });
      curve.current = () => {
        rail.current.style.setProperty('--gallery-origin', `${width / 2 - position.current}px`);
        for (const tile of tiles) {
          const x = tile.center + position.current;
          if (x + tile.half < -150 || x - tile.half > width + 150) continue;
          const n = Math.max(-1, Math.min(1, (x - width / 2) / (width / 2)));
          tile.element.style.setProperty('--gallery-turn', `${reduced || paused ? 0 : -n * Math.abs(n) * 27}deg`);
        }
      };
      curve.current();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    measure();
    return () => observer.disconnect();
  }, [cards, height, focusId, artwork, reduced, paused]);

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
      position.current += speed.current * dt / 16;
      paintPosition();
      if (Math.abs(speed.current) > .01 || Math.abs(desired.current) > .01) frame = requestAnimationFrame(tick);
      else { frame = 0; speed.current = 0; element.style.willChange = "auto"; }
    };
    wake.current = () => {
      if (!frame && !document.hidden) {
        previous = performance.now();
        element.style.willChange = "transform";
        frame = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      cancelAnimationFrame(frame); frame = 0;
      desired.current = 0; speed.current = 0;
      element.style.willChange = "auto";
    };
    const visibility = () => { if (document.hidden) stop(); };
    document.addEventListener("visibilitychange", visibility);
    return () => { stop(); wake.current = () => {}; document.removeEventListener("visibilitychange", visibility); };
  }, [reduced, paused]);

  useEffect(() => {
    const elements = [...viewport.current.querySelectorAll(".tz-gallery-media-wrap")];
    const visible = new Set();
    const update = (element) => {
      const active = visible.has(element) && !paused && !reduced && !document.hidden;
      element.dataset.active = String(active);
      const video = element.querySelector("video");
      if (video) {
        if (active) video.play().catch(() => {});
        else video.pause();
      }
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target);
        update(entry.target);
      }
    }, { root: viewport.current, rootMargin: "80px" });
    elements.forEach((element) => observer.observe(element));
    const visibility = () => elements.forEach(update);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect(); document.removeEventListener("visibilitychange", visibility);
      elements.forEach((element) => { element.dataset.active = "false"; element.querySelector("video")?.pause(); });
    };
  }, [cards, paused, reduced]);

  const makeCard = (card, index, clone, artworkHeight) => {
    const project = card.project;
    const ratio = project.video ? 16 / 9 : project.images[0].width / project.images[0].height;
    const width = artwork ? Math.max(160, Math.min(480, height * .27 * ratio)) : Math.max(210, Math.min(750, height * .72 * ratio));
    return <button key={`${clone}-${card.id}`} type="button" className="tz-panel tz-gallery-card"
      data-panel={index} data-destination={card.id} tabIndex={clone === 1 ? 0 : -1}
      style={{ width: artwork ? undefined : `${width}px`, height: artwork ? `${artworkHeight}px` : undefined }} onClick={(e) => { if (!dragged.current) onOpen(card.id, e.currentTarget); }}
      aria-label={`View ${project.title}`}>
      <span className="tz-gallery-media-wrap" data-count={project.images.length}><Preview project={project} /></span>
      <span className="tz-gallery-caption">
        <span className="tz-gallery-number">{String(index + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}</span>
        <strong>{project.title}</strong>
        <span>{project.short}</span>
        <Marks software={project.software} />
      </span>
      <span className="tz-gallery-year">{project.year}</span>
      <span className="tz-gallery-arrow" aria-hidden="true">↗</span>
    </button>;
  };
  const groups = [];
  if (artwork) {
    const landscape = (card) => card.project.images[0].width / card.project.images[0].height >= 1.3;
    for (let index = 0; index < cards.length;) {
      const start = index;
      const wide = landscape(cards[index]);
      const limit = wide ? 2 : 3;
      while (index < cards.length && index - start < limit && landscape(cards[index]) === wide) index++;
      groups.push({ start, cards: cards.slice(start, index) });
    }
  }
  const instances = (clone) => artwork
    ? (cards.length ? groups.map(({ cards: group, start }, column) => {
        const ratios = group.map((card) => card.project.images[0].width / card.project.images[0].height);
        const available = height * .9 - 18 * (group.length - 1);
        const width = Math.min(950, available / ratios.reduce((sum, ratio) => sum + 1 / ratio, 0));
        return <div className="tz-artwork-column" key={`${clone}-column-${column}`} style={{ width }}>
          {group.map((card, row) => makeCard(card, start + row, clone, width / ratios[row]))}
        </div>;
      }) : <div className="tz-artwork-column tz-artwork-empty-column" key={`${clone}-empty`}>
        <div className="tz-panel tz-artwork-empty"><span>ARTWORKS / 00</span><strong>A SPACE<br />FOR WHAT’S NEXT.</strong><small>New work will appear here.</small></div>
      </div>)
    : cards.map((card, index) => makeCard(card, index, clone));

  return <section className={`tz-showcase-gallery ${artwork ? "tz-artwork-gallery" : ""}`} ref={viewport} aria-label={artwork ? "Artwork gallery" : "Project gallery"}
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
        position.current += e.clientX - touch.current.last;
        touch.current.last = e.clientX;
        paintPosition();
        return;
      }
      if (e.pointerType !== "mouse") return;
      const b = viewport.current.getBoundingClientRect();
      const n = (e.clientX - b.left) / b.width - .5;
      desired.current = Math.sign(n) * Math.pow(Math.max(0, Math.abs(n) - .12) / .38, 1.45) * -15;
      if (Math.abs(desired.current) > .01 || Math.abs(speed.current) > .01) wake.current();
    }}
    onPointerLeave={() => { desired.current = 0; if (Math.abs(speed.current) > .01) wake.current(); }}
    onPointerUp={() => { touch.current = null; }}
    onPointerCancel={() => { touch.current = null; }}
    onWheel={(e) => {
      if (paused) return;
      position.current -= e.deltaY * .65;
      paintPosition();
    }}
    onKeyDown={(e) => {
      if (paused) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        position.current += e.key === "ArrowRight" ? -250 : 250;
        paintPosition();
      }
    }}>
    <div className="tz-gallery-window">
      <div className="tz-gallery-rail" ref={rail}>
        {[0, 1, 2].map((clone) => <div key={clone} className="tz-gallery-cycle"
          aria-hidden={clone !== 1 || undefined}>{instances(clone)}</div>)}
      </div>
    </div>
    <div className="tz-gallery-guide" aria-hidden="true"><span>← EXPLORE</span><span>{artwork ? "ARTWORKS" : "SHOWCASE"} / {cards.length} {artwork ? "PIECES" : "PROJECTS"}</span><span>EXPLORE →</span></div>
  </section>;
}
