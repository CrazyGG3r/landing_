import { useEffect, useRef, useState } from "react";

const softwareNames = {
  SP3D: "Adobe Substance 3D Painter",
  PS: "Adobe Photoshop",
  JS: "JavaScript",
  MD3D: "Marvelous Designer 3D",
  Unity3D: "Unity 3D",
};

export function ProjectInfo({ project }) {
  const [pinned, setPinned] = useState(false);
  return <aside className={`tz-project-info ${pinned ? "tz-info-open" : ""}`}>
    <button type="button" className="tz-info-tab" aria-expanded={pinned}
      onClick={() => setPinned((value) => !value)}>
      <span>PROJECT / INFO</span><span aria-hidden="true">{pinned ? "→" : "←"}</span>
    </button>
    <div className="tz-info-body">
      <p className="tz-info-index">TAKEZO / SHOWCASE / {project.year}</p>
      <h2>{project.title}</h2>
      <p className="tz-info-short">{project.short}</p>
      <div className="tz-info-marks">{project.software.map((name) => <span key={name}>
        <img src={`/takezo/${name}.svg`} alt="" />{softwareNames[name] || name}
      </span>)}</div>
      <div className="tz-info-story">{project.description.split(/\n\s*\n/).map((paragraph, i) =>
        <p key={i}>{paragraph}</p>)}</div>
    </div>
  </aside>;
}

export function ImageDetail({ project }) {
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
    <ProjectInfo project={project} />
  </section>;
}

const time = (value) => `${Math.floor(value / 60).toString().padStart(2, "0")}:${Math.floor(value % 60).toString().padStart(2, "0")}`;

export function VideoDetail({ project, ready = true }) {
  const player = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const toggle = () => {
    const video = player.current;
    if (video.paused) video.play().catch(() => setPlaying(false));
    else video.pause();
  };
  return <section className={`tz-showcase-detail tz-video-detail ${ready ? "tz-video-ready" : ""}`}>
    <div className="tz-video-panel">
      <video className="tz-video-ambient" src={project.video.thumb} muted loop autoPlay playsInline aria-hidden="true" />
      <video ref={player} className={`tz-video-main ${playing || position > 0 ? "active" : ""}`}
        src={project.video.src} playsInline preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onTimeUpdate={(e) => setPosition(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)} />
      <div className="tz-video-title"><span>FILM / 01</span><h2>{project.title}</h2><p>{project.short}</p></div>
      <div className="tz-video-controls">
        <button className="tz-panel tz-video-play" data-panel="0" type="button" onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}>{playing ? "Ⅱ" : "▶"}</button>
        <div className="tz-video-seek">
          <span>{time(position)}</span>
          <input aria-label="Seek video" type="range" min="0" max={duration || 1} step="0.1" value={position}
            onChange={(e) => { player.current.currentTime = Number(e.target.value); setPosition(Number(e.target.value)); }} />
          <span>{time(duration)}</span>
        </div>
      </div>
    </div>
    <ProjectInfo project={project} />
  </section>;
}
