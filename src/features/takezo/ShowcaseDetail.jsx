import { useEffect, useRef, useState } from "react";
import PanelSurface from "./PanelSurface";
import { panelFeatures, surfaceStyle } from "./panelFeatures";
import VideoTimeline from "./VideoTimeline";

const infoSurface = panelFeatures({ color: "bone", baseColor: "#D2D0BB", tags: ["gradient", "Prototype"] });

const softwareNames = {
  SP3D: "Adobe Substance 3D Painter",
  PS: "Adobe Photoshop",
  JS: "JavaScript",
  MD3D: "Marvelous Designer 3D",
  Unity3D: "Unity 3D",
};

export function ProjectInfo({ project, reduced }) {
  const [pinned, setPinned] = useState(false);
  const body = useRef(null);
  const motion = useRef(0);
  const destination = useRef(0);
  const updateEdges = () => {
    const el = body.current;
    if (!el) return;
    el.dataset.overflow = String(el.scrollHeight > el.clientHeight + 1);
    el.dataset.start = String(el.scrollTop <= 1);
    el.dataset.end = String(el.scrollTop >= el.scrollHeight - el.clientHeight - 1);
  };
  useEffect(() => {
    const el = body.current;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    observer.observe(el.firstElementChild);
    updateEdges();
    return () => { observer.disconnect(); cancelAnimationFrame(motion.current); };
  }, [project]);
  const navigate = (event) => {
    const el = body.current;
    const max = el.scrollHeight - el.clientHeight;
    if (max <= 1) return;
    const bounds = el.getBoundingClientRect();
    const fraction = (event.clientY - bounds.top) / bounds.height;
    destination.current = Math.max(0, Math.min(1, (fraction - .18) / .64)) * max;
    if (motion.current) return;
    let previous = performance.now();
    let position = el.scrollTop;
    const tick = (now) => {
      const blend = reduced ? 1 : 1 - Math.exp(-(now - previous) / 80);
      previous = now;
      const delta = destination.current - position;
      position += delta * blend;
      el.scrollTop = position;
      if (Math.abs(delta) > .5) motion.current = requestAnimationFrame(tick);
      else { el.scrollTop = destination.current; motion.current = 0; }
      updateEdges();
    };
    motion.current = requestAnimationFrame(tick);
  };
  const stopNavigation = () => { cancelAnimationFrame(motion.current); motion.current = 0; };
  return <aside className={`tz-project-info ${pinned ? "tz-info-open" : ""}`} style={surfaceStyle(infoSurface)} onMouseMove={navigate}>
    <PanelSurface features={infoSurface} />
    <button type="button" className="tz-info-tab" aria-expanded={pinned}
      onClick={() => setPinned((value) => !value)}>
      <span>{project.kind === "artwork" ? "ARTWORK / INFO" : "PROJECT / INFO"}</span><span aria-hidden="true">{pinned ? "→" : "←"}</span>
    </button>
    <div ref={body} className="tz-info-body" onScroll={updateEdges} onWheel={stopNavigation} onTouchStart={stopNavigation}>
      <div className="tz-info-content">
      <p className="tz-info-index">TAKEZO / SHOWCASE / {project.year}</p>
      <h2>{project.title}</h2>
      <p className="tz-info-short">{project.short}</p>
      <div className="tz-info-marks">{project.software.map((name) => <span key={name}>
        <img src={`/takezo/${name}.svg`} alt="" />{softwareNames[name] || name}
      </span>)}</div>
      <div className="tz-info-story">{project.description.split(/\n\s*\n/).map((paragraph, i) =>
        <p key={i}>{paragraph}</p>)}</div>
      </div>
    </div>
  </aside>;
}

export function ImageDetail({ project, reduced }) {
  const frame = useRef(null);
  const drag = useRef(null);
  const [index, setIndex] = useState(0);
  const [inspect, setInspect] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [viewerSize, setViewerSize] = useState({ width: 1, height: 1 });
  const images = project.images;

  useEffect(() => {
    const el = frame.current;
    const observer = new ResizeObserver(() => setViewerSize({ width: el.clientWidth, height: el.clientHeight }));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const select = (next) => {
    if (next === index) return;
    setIndex(next);
    setPan({ x: 0, y: 0 });
    setZoom(1);
  };
  const setScale = (scale) => {
    setInspect(true);
    setZoom(Math.max(1, Math.min(4, scale)));
    if (scale <= 1) setPan({ x: 0, y: 0 });
  };
  const onMove = (e) => {
    if (drag.current) {
      const dx = e.clientX - drag.current.x;
      const dy = e.clientY - drag.current.y;
      const image = images[index];
      const ratio = image.width / image.height;
      const fittedWidth = Math.min(viewerSize.width, viewerSize.height * ratio);
      const fittedHeight = fittedWidth / ratio;
      const limitX = Math.max(0, (fittedWidth * zoom - viewerSize.width) / 2);
      const limitY = Math.max(0, (fittedHeight * zoom - viewerSize.height) / 2);
      setPan({
        x: Math.max(-limitX, Math.min(limitX, drag.current.pan.x + dx)),
        y: Math.max(-limitY, Math.min(limitY, drag.current.pan.y + dy)),
      });
      return;
    }
    if (inspect || images.length < 2 || (e.pointerType !== "mouse" && e.pointerType !== "touch")) return;
    const bounds = frame.current.getBoundingClientRect();
    const position = Math.max(0, Math.min(1, (e.clientY - bounds.top) / bounds.height));
    const nearest = Math.min(images.length - 1, Math.floor(position * images.length));
    const currentCenter = (index + .5) / images.length;
    if (nearest !== index && Math.abs(position - currentCenter) > Math.min(.12, .35 / images.length)) select(nearest);
  };

  return <section className="tz-showcase-detail">
    <div className="tz-image-panel tz-panel" ref={frame} data-panel="0"
      onPointerMove={onMove} onPointerUp={() => { drag.current = null; }}
      onPointerCancel={() => { drag.current = null; }}
      onWheel={(e) => { if (e.ctrlKey || inspect) { e.preventDefault(); setScale(zoom + (e.deltaY < 0 ? .15 : -.15)); } }}>
      {images.map((image, i) => <img key={image.src} className={`tz-detail-image ${i === index ? "tz-image-active" : ""}`}
        src={image.src} alt={`${project.title} — image ${i + 1} of ${images.length}`}
        draggable="false" style={i === index ? {
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        } : undefined} />)}
      <div className="tz-image-top"><span>{project.title.toUpperCase()}</span><span>{String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span></div>
      {images.length > 1 && <div className="tz-image-film" role="group" aria-label="Project images">
        {images.map((image, i) => <button key={image.src} type="button" className={i === index ? "active" : ""}
          onClick={() => { select(i); setScale(1.3); }} aria-label={`Show image ${i + 1}`}>
          <img src={image.thumb} alt="" /><span>{String(i + 1).padStart(2, "0")}</span>
        </button>)}
      </div>}
      <div className="tz-image-actions">
        <span>{inspect ? "DRAG TO PAN / WHEEL TO ZOOM" : images.length > 1 ? "MOVE VERTICALLY TO EXPLORE" : "SELECT TO INSPECT"}</span>
        <button type="button" onClick={() => setScale(zoom - .25)} aria-label="Zoom out">−</button>
        <button type="button" onClick={() => { setScale(1); setInspect(false); }} aria-label="Reset zoom">1:1</button>
        <button type="button" onClick={() => setScale(zoom + .25)} aria-label="Zoom in">+</button>
      </div>
      <div className="tz-image-hit" onClick={() => { if (!inspect) setScale(1.3); }}
        onPointerDown={(e) => {
          if (!inspect) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY, pan };
        }} />
    </div>
    <ProjectInfo project={project} reduced={reduced} />
  </section>;
}

export function VideoDetail({ project, ready = true, reduced }) {
  const player = useRef(null);
  const ambient = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [controlsFocused, setControlsFocused] = useState(false);
  const [started, setStarted] = useState(false);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    const video = ambient.current;
    const sync = () => {
      if (!reduced && ready && !playing && !started && !document.hidden) video.play().catch(() => {});
      else video.pause();
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => { video.pause(); document.removeEventListener("visibilitychange", sync); };
  }, [reduced, ready, playing, started]);
  const toggle = () => {
    const video = player.current;
    if (video.paused) {
      if (video.ended) video.currentTime = 0;
      video.play().catch(() => setPlaying(false));
    }
    else video.pause();
  };
  return <section className={`tz-showcase-detail tz-video-detail ${ready ? "tz-video-ready" : ""} ${playing ? "tz-video-playing" : ""} ${controlsVisible ? "tz-controls-visible" : ""}`}>
    <div className="tz-video-panel"
      onFocusCapture={() => setControlsFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setControlsFocused(false); }}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") setControlsVisible(true); }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") setControlsVisible(false); }}
      onPointerDown={(e) => { if (e.pointerType !== "mouse") setControlsVisible(true); }}>
      <video ref={ambient} className="tz-video-ambient" src={project.video.thumb} muted loop playsInline preload="metadata" aria-hidden="true" />
      <video ref={player} className={`tz-video-main ${playing || started ? "active" : ""}`}
        src={project.video.src} playsInline preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onTimeUpdate={(e) => setStarted(e.currentTarget.currentTime > 0)}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)} />
      <div className="tz-video-title"><span>TAKEZO / MOTION STUDY</span><h2>{project.title}</h2><p>{project.short}</p></div>
      <div className="tz-video-controls">
        <button className="tz-panel tz-video-play" data-panel="0" type="button" onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}>
          <svg viewBox="0 0 48 48" aria-hidden="true">
            {playing ? <><path d="M17 15v18M31 15v18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></>
              : <path d="m19 14 15 10-15 10z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />}
          </svg>
        </button>
        <VideoTimeline player={player} playing={playing} visible={controlsVisible || controlsFocused} duration={duration} />
      </div>
    </div>
    <ProjectInfo project={project} reduced={reduced} />
  </section>;
}
