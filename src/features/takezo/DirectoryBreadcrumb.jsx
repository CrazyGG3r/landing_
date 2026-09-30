import { useLayoutEffect, useRef, useState } from "react";
import "./directoryBreadcrumb.css";

const labelFor = (id, nodes) => id === "home" ? "TAKEZO" : nodes[id].title.toUpperCase();

export default function DirectoryBreadcrumb({ trail, view, nodes, busy, reduced, onOpen }) {
  const previous = useRef({ view, trail });
  const [outgoing, setOutgoing] = useState(null);

  useLayoutEffect(() => {
    if (previous.current.view === view) {
      if (reduced) setOutgoing(null);
      return;
    }

    const oldTrail = previous.current.trail;
    previous.current = { view, trail };
    if (reduced) {
      setOutgoing(null);
      return;
    }
    let common = 0;
    while (common < oldTrail.length && oldTrail[common] === trail[common]) common++;
    setOutgoing({
      view: oldTrail.at(-1),
      trail: oldTrail.slice(common),
      common,
      direction: trail.length < oldTrail.length ? "back" : "forward",
    });
  }, [view, trail, reduced]);

  const crumb = (id, index) => (
    <span key={id}>
      {index > 0 && <span className="tz-separator">/</span>}
      <button
        disabled={busy || id === view}
        aria-current={id === view ? "page" : undefined}
        onClick={() => onOpen(id)}
      >
        {labelFor(id, nodes)}
      </button>
    </span>
  );

  return (
    <div className="tz-directory-stage">
      <nav aria-label="Portfolio breadcrumb">
        {outgoing ? (
          <>
            {trail.slice(0, outgoing.common).map(crumb)}
            <span className="tz-directory-swap" data-direction={outgoing.direction}>
              <span className="tz-directory-outgoing" aria-hidden="true"
                onAnimationEnd={(event) => {
                  if (event.target !== event.currentTarget) return;
                  setOutgoing((current) => current?.view === outgoing.view ? null : current);
                }}>
                {outgoing.trail.map((id, index) => (
                  <span key={id}>
                    {outgoing.common + index > 0 && <span className="tz-separator">/</span>}
                    <span className={id === outgoing.view ? "tz-directory-active" : undefined}>
                      {labelFor(id, nodes)}
                    </span>
                  </span>
                ))}
              </span>
              <span key={view} className="tz-directory-incoming">
                {trail.slice(outgoing.common).map((id, index) => crumb(id, outgoing.common + index))}
              </span>
            </span>
          </>
        ) : trail.map(crumb)}
      </nav>
    </div>
  );
}
