import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { nodes, trailFor } from "./takezoData";
import "./takezo.css";
import AdaptivePanel from "./AdaptivePanel";
import { layoutFor, trackStyle } from "./mosaicLayout";
import "./mosaic.css";
import { panelFeatures, surfaceStyle } from "./panelFeatures";
import PanelSurface from "./PanelSurface";
import "./panelFeatures.css";
import ShowcaseGallery from "./ShowcaseGallery";
import { ImageDetail, VideoDetail } from "./ShowcaseDetail";
import "./showcase.css";

function Artwork({ kind }) {
  const artId = useId().replaceAll(":", "");
  if (kind === "gallery")
    return <span className="tz-art tz-gallery-symbol" aria-hidden="true" />;
  if (kind === "arrow")
    return (
      <svg className="tz-art tz-arrow" viewBox="0 0 200 200" aria-hidden="true">
        <path
          d="M31 28h144v144h-39V94L52 178l-30-30 84-81H31z"
          fill="currentColor"
        />
      </svg>
    );
  if (kind === "asterisk")
    return (
      <svg
        className="tz-art tz-asterisk"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        {Array.from({ length: 8 }, (_, i) => (
          <path
            key={i}
            d="M84 10h32l-6 67-10 20-10-20z"
            fill="currentColor"
            transform={`rotate(${i * 45} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="13" fill="currentColor" />
      </svg>
    );
  if (kind === "orbital")
    return (
      <svg
        className="tz-art tz-orbital"
        viewBox="0 0 240 240"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <circle cx="120" cy="120" r="100" />
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse
            key={i}
            cx="120"
            cy="120"
            rx="100"
            ry="32"
            transform={`rotate(${i * 15} 120 120)`}
          />
        ))}
        <circle cx="120" cy="120" r="12" fill="currentColor" />
      </svg>
    );
  if (kind === "signal")
    return (
      <svg
        className="tz-art tz-signal"
        viewBox="0 0 400 200"
        aria-hidden="true"
      >
        {Array.from({ length: 32 }, (_, i) => (
          <rect
            key={i}
            x={i * 12.5}
            y={100 - (20 + Math.sin(i * 0.36) ** 2 * 75)}
            width="5"
            height={40 + Math.sin(i * 0.36) ** 2 * 150}
            rx="2"
            fill="currentColor"
          />
        ))}
      </svg>
    );
  return (
    <svg
      className="tz-art tz-sculpture"
      viewBox="0 0 340 530"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${artId}-metal`} x1="0" y1="0" x2="1" y2=".7">
          <stop stopColor="#dad8bd" />
          <stop offset=".35" stopColor="#717e70" />
          <stop offset=".65" stopColor="#253a35" />
          <stop offset="1" stopColor="#111c1a" />
        </linearGradient>
        <linearGradient id={`${artId}-edge`}>
          <stop stopColor="#a4b09b" />
          <stop offset="1" stopColor="#35423b" />
        </linearGradient>
      </defs>
      <g className="tz-sculpture-core" transform="rotate(-19 170 265)">
        {Array.from({ length: 9 }, (_, i) => (
          <g
            key={i}
            transform={`translate(${Math.sin(i * 0.6) * 37} ${i * 44})`}
          >
            <path
              d="M69 39 184 10 277 65 160 96Z"
              fill={`url(#${artId}-edge)`}
              stroke="#192b25"
            />
            <path
              d="m69 39 91 57v57L69 94Z"
              fill="#1c302a"
              stroke="#768475"
              strokeWidth=".7"
            />
            <path
              d="m160 96 117-31v57l-117 31Z"
              fill={`url(#${artId}-metal)`}
              stroke="#92a18b"
              strokeWidth=".7"
            />
            <path d="m178 107 79-21v16l-79 21Z" fill="#102821" />
            <path d="m178 107 79-21v3l-79 21Z" fill="#c2c4a6" />
            <circle cx="171" cy="132" r="2.5" fill="#d5bc70" />
            <path d="m82 58 63 39v18L82 77Z" fill="#0b1915" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function Panel({ card, index, isHome, onOpen, features }) {
  const Tag = card.id ? "button" : "article";
  return (
    <Tag
      className={`tz-panel tz-panel-${index} tz-${card.color} ${card.art ? "" : "tz-reading"}`}
      data-panel={index}
      data-destination={card.id || undefined}
      style={surfaceStyle(features)}
      {...(card.id
        ? {
            onClick: (e) => onOpen(card.id, e.currentTarget),
            type: "button",
            "aria-label": `Explore ${card.title.replaceAll("\n", " ")}`,
          }
        : {})}
    >
      <PanelSurface features={features} />
      <div className="tz-panel-content">
        <div className="tz-panel-top">
          <span>{card.kicker}</span>
          <span>{card.id ? "↗" : "○"}</span>
        </div>
        <h2
          className={
            card.art && card.title.split("\n").some((line) => line.length > 9)
              ? "tz-long-title"
              : undefined
          }
        >
          {card.title}
        </h2>
        {card.art && <Artwork kind={card.art} />}
        {isHome && index === 0 && (
          <>
            <span className="tz-japanese" aria-hidden="true">
              独<br />創
            </span>
            <span className="tz-side-label">FORM / FEELING / FUNCTION</span>
          </>
        )}
        {isHome && index === 1 && (
          <div className="tz-project-stamp">
            <span>DISCIPLINE</span>
            <strong>
              DESIGN ×<br />
              ENGINEERING
            </strong>
            <span>VOL. 01 — ONGOING</span>
          </div>
        )}
        <div className="tz-panel-bottom">
          <p>{card.description}</p>
          <span className="tz-panel-action" aria-hidden="true">
            {card.id ? "↗" : "+"}
          </span>
        </div>
        {isHome && index === 0 && (
          <div className="tz-identity-caption">
            <span>PERSONAL PORTFOLIO</span>
            <strong>BOLTFORGED®</strong>
          </div>
        )}
      </div>
    </Tag>
  );
}

export default function Takezo() {
  const location = useLocation();
  const navigate = useNavigate();
  const requested = location.hash.slice(1);
  const target = nodes[requested] ? requested : "home";
  const [view, setView] = useState(target);
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [boardSize, setBoardSize] = useState({ width: 1, height: 1 });
  const node = nodes[view];
  const adaptiveHome = view === "home" && node.cards.some((card) => {
    const features = panelFeatures(card, node.panelDefaults);
    return features.logo || features.max;
  });
  const special = node.mode;
  const mosaic = !special && (view !== "home" || adaptiveHome);
  const rectangles = mosaic ? layoutFor(adaptiveHome ? {
    ...node, layout: node.layout || [[1, 1, 2, 6], [3, 1, 4, 3], [3, 4, 2, 3], [5, 4, 2, 3]],
  } : node) : null;
  const active = !busy && expanded?.view === view ? expanded.index : -1;
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const board = useRef(null);
  const traveler = useRef(null);
  const source = useRef(null);
  const timeline = useRef(null);
  const current = useRef(target);
  const heading = useRef(null);
  const initial = useRef(true);
  const hoverPoint = useRef(null);

  useLayoutEffect(() => {
    if (!mosaic) return;
    const element = board.current;
    const measure = () =>
      setBoardSize({
        width: element.clientWidth,
        height: element.clientHeight,
        gap: parseFloat(getComputedStyle(element).columnGap) || 0,
      });
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, [view, mosaic]);

  useEffect(() => {
    const oldTitle = document.title;
    document.title = "Takezo — A BoltForged Practice";
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => {
      document.title = oldTitle;
      media.removeEventListener("change", update);
    };
  }, []);

  useLayoutEffect(() => {
    if (!initial.current) return;
    initial.current = false;
    const ctx = gsap.context(() => {
      if (!reduced)
        gsap.from(".tz-panel", {
          y: 65,
          opacity: 0,
          scale: 0.88,
          duration: 0.85,
          stagger: Math.min(0.095, 0.3 / Math.max(1, node.cards.length - 1)),
          ease: "expo.out",
          clearProps: "opacity,transform",
        });
    }, board);
    return () => ctx.revert();
  }, [reduced, node.cards.length]);

  useEffect(() => {
    if (target === current.current) {
      setBusy(false);
      return;
    }
    timeline.current?.kill();
    const panels = [...board.current.querySelectorAll(".tz-panel")];
    let activePanels = panels;
    const previousView = current.current;
    const selected = source.current?.isConnected
      ? source.current
      : panels.find((panel) => panel.dataset.destination === target) ||
        panels[0];
    const destinationIndex = Math.max(
      0,
      nodes[target].cards.findIndex(
        (card) => card.id && trailFor(previousView).includes(card.id),
      ),
    );
    source.current = null;
    const start = selected.getBoundingClientRect();
    const color = getComputedStyle(selected).backgroundColor;
    const commit = () => {
      current.current = target;
      flushSync(() => { setExpanded(null); setView(target); });
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    const finish = () => {
      gsap.set(traveler.current, { display: "none" });
      gsap.set(board.current.querySelectorAll(".tz-panel"), {
        clearProps: "opacity,transform",
      });
      setBusy(false);
      heading.current?.focus({ preventScroll: true });
    };
    if (reduced) {
      current.current = target;
      setExpanded(null);
      setView(target);
      window.scrollTo({ top: 0, behavior: "instant" });
      finish();
      return;
    }
    setBusy(true);
    const dot = traveler.current;
    const size = 52;
    gsap.set(dot, {
      display: "block",
      left: start.left,
      top: start.top,
      width: start.width,
      height: start.height,
      borderRadius: 22,
      backgroundColor: color,
      opacity: 1,
    });
    gsap.set(selected, { opacity: 0 });
    const tl = gsap.timeline();
    timeline.current = tl;
    tl.to(
      panels.filter((p) => p !== selected),
      {
        opacity: 0,
        scale: 0.91,
        y: 18,
        duration: 0.24,
        stagger: Math.min(0.025, 0.12 / Math.max(1, panels.length - 1)),
        ease: "power2.in",
      },
      0,
    )
      .to(
        dot,
        {
          left: start.left + start.width / 2 - size / 2,
          top: start.top + start.height / 2 - size / 2,
          width: size,
          height: size,
          borderRadius: size,
          duration: 0.3,
          ease: "power3.inOut",
        },
        0,
      )
      .call(() => {
        commit();
        const next = [...board.current.querySelectorAll(target === "gallery"
          ? ".tz-gallery-cycle:nth-child(2) .tz-panel"
          : ".tz-panel")];
        activePanels = next;
        gsap.set(next, { opacity: 0 });
        const anchor = next[destinationIndex];
        const end = anchor.getBoundingClientRect();
        const endColor = getComputedStyle(anchor).backgroundColor;
        const destinationY = end.top + end.height / 2 - size / 2;
        tl.to(dot, {
          left: end.left + end.width / 2 - size / 2,
          top: Math.max(80, destinationY - 45),
          duration: 0.23,
          ease: "power2.inOut",
        })
          .to(dot, {
            left: end.left,
            top: end.top,
            width: end.width,
            height: end.height,
            backgroundColor: endColor,
            borderRadius: 22,
            duration: 0.34,
            ease: "expo.inOut",
          })
          .fromTo(
            next.filter((panel) => panel !== anchor),
            { opacity: 0, scale: 0.82, y: 28 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.48,
              stagger: Math.min(0.065, 0.24 / Math.max(1, next.length - 1)),
              ease: "expo.out",
            },
            "-=.18",
          )
          .to(anchor, { opacity: 1, duration: 0.18 }, "-=.27")
          .to(dot, { opacity: 0, duration: 0.14 }, "<")
          .call(finish);
      });
    const settleOnResize = () => {
      tl.kill();
      if (current.current !== target) commit();
      finish();
    };
    window.addEventListener("resize", settleOnResize, { once: true });
    return () => {
      window.removeEventListener("resize", settleOnResize);
      tl.kill();
      gsap.set(dot, { display: "none" });
      gsap.set(activePanels, { clearProps: "opacity,transform" });
    };
  }, [target, reduced]);

  const open = (id, element) => {
    if (busy || id === view) return;
    source.current = element || null;
    navigate({ pathname: "/takezo", hash: id === "home" ? "" : id });
  };
  const trail = trailFor(view);
  return (
    <main
      className={`takezo ${mosaic ? "tz-mosaic-page" : ""} ${reduced ? "tz-reduced" : ""}`}
    >
      <h1 className="tz-sr-only" ref={heading} tabIndex={-1}>
        {view === "home" ? "Takezo" : node.title}
      </h1>
      <div className="tz-navigation">
        <nav aria-label="Portfolio breadcrumb">
          {trail.map((id, i) => (
            <span key={id}>
              {i > 0 && <span className="tz-separator">/</span>}
              <button
                disabled={busy || id === view}
                aria-current={id === view ? "page" : undefined}
                onClick={() => open(id)}
              >
                {id === "home" ? "TAKEZO" : nodes[id].title.toUpperCase()}
              </button>
            </span>
          ))}
        </nav>
        <div className="tz-nav-right">
          {node.parent && (
            <button disabled={busy} onClick={() => open(node.parent)}>
              ↖ BACK
            </button>
          )}
        </div>
      </div>
      <div
        className={`tz-board ${special ? "tz-special" : mosaic ? "tz-mosaic" : "tz-home"} ${busy ? "tz-busy" : ""}`}
        style={
          mosaic
            ? trackStyle(rectangles, active, boardSize.width, boardSize.height,
                active >= 0 && panelFeatures(node.cards[active], node.panelDefaults).max, boardSize.gap)
            : undefined
        }
        onPointerLeave={
          mosaic
            ? (e) => {
                if (e.pointerType === "mouse") {
                  hoverPoint.current = null;
                  setExpanded(null);
                }
              }
            : undefined
        }
        onKeyDown={
          mosaic
            ? (e) => {
                if (e.key === "Escape") {
                  setExpanded(null);
                  heading.current?.focus({ preventScroll: true });
                }
              }
            : undefined
        }
        ref={board}
        aria-busy={busy}
        inert={busy ? true : undefined}
        key={view}
      >
        {special === "gallery" ? <ShowcaseGallery cards={node.cards} onOpen={open} reduced={reduced} />
          : special === "image" ? <ImageDetail project={node.project} />
          : special === "video" ? <VideoDetail project={node.project} ready={!busy} />
          : node.cards.map((card, index) =>
          mosaic ? (
            <AdaptivePanel
              key={`${view}-${index}`}
              card={card}
              index={index}
              rect={rectangles[index]}
              expanded={active === index}
              compressed={active >= 0 && active !== index}
              onExpand={(index, event) => {
                if (event) {
                  const previous = hoverPoint.current;
                  // Moving grid edges must not select panels beneath a still pointer.
                  if (previous && Math.hypot(event.clientX - previous.x, event.clientY - previous.y) < 2) return;
                  hoverPoint.current = { x: event.clientX, y: event.clientY };
                }
                setExpanded(index < 0 ? null : { view, index });
              }}
              onOpen={open}
              artwork={Artwork}
              features={panelFeatures(card, node.panelDefaults)}
            />
          ) : (
            <Panel
              key={`${view}-${index}`}
              card={card}
              index={index}
              isHome={view === "home"}
              onOpen={open}
              features={panelFeatures(card, node.panelDefaults)}
            />
          ),
        )}
      </div>
      <div className="tz-traveler" ref={traveler} aria-hidden="true" />
      <div className="tz-sr-only" role="status" aria-live="polite">
        {node.title}
      </div>
    </main>
  );
}
