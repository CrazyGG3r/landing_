import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import PanelSurface from "./PanelSurface";
import PanelCopy from "./PanelCopy";
import { surfaceStyle } from "./panelFeatures";
import { observePanelFit } from "./panelFit";
import AdaptiveBreakdown from "./AdaptiveBreakdown";
import TechnicalMotion from "./TechnicalMotion";
import ArtThumbnailMotion from "./ArtThumbnailMotion";
import DesignMotion from "./DesignMotion";
import { panelActivationIntent } from "./panelActivation";
import InterestsMotion from "./InterestsMotion";

export default function AdaptivePanel({
  card,
  index,
  rect,
  expanded,
  compressed,
  entryX,
  onExpand,
  onOpen,
  artwork,
  features,
  reduced,
}) {
  const Artwork = artwork;
  const panel = useRef(null);
  const titleBox = useRef(null);
  const title = useRef(null);
  const activationPointer = useRef("");
  const reader = useRef(null);
  const [activeInterest, setActiveInterest] = useState(null);
  const text = card.title.replace(/\s+/g, " ").trim();
  const hasBreakdown = !!card.breakdown?.items?.length;
  const hasInterests = !!card.interests?.items?.length;
  const interest = useMemo(() => card.interests?.items?.find((item) => item.id === activeInterest) || null, [activeInterest, card.interests]);
  const Tag = hasBreakdown || hasInterests ? "article" : "button";

  useLayoutEffect(() => observePanelFit({
    el: panel.current, label: title.current, box: titleBox.current,
    expanded, compressed, text, logo: features.logo,
  }), [expanded, compressed, text, features.logo]);

  useEffect(() => {
    if (!expanded && activeInterest !== null) setActiveInterest(null);
  }, [activeInterest, expanded]);

  return (
    <Tag
      ref={panel}
      {...(!hasBreakdown && !hasInterests ? { type: "button" } : { tabIndex: 0, role: "group" })}
      className={`tz-panel tz-adaptive tz-${card.color}${hasInterests ? " tz-interest-panel" : ""}`}
      data-panel={index}
      data-destination={card.id || undefined}
      data-cursor-diminish={card.cursorDiminish ? "true" : undefined}
      data-expanded={expanded}
      data-compressed={compressed}
      data-single-word={!text.includes(" ") ? "true" : undefined}
      data-cursor-videos={card.cursorVideos?.length ? "true" : undefined}
      data-art-thumbnails={card.artThumbnails?.length ? "true" : undefined}
      data-design-motion={card.designMedia ? "true" : undefined}
      data-responsive-motion={reduced ? "reduced" : "full"}
      data-interest-active={interest ? "true" : "false"}
      aria-expanded={expanded}
      aria-label={`${card.id ? "Explore" : "Expand"} ${text}`}
      style={{
        ...surfaceStyle(features),
        gridColumn: `${rect[0]} / span ${rect[2]}`,
        gridRow: `${rect[1]} / span ${rect[3]}`,
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") onExpand(index, e);
      }}
      onPointerMove={(e) => {
        if (e.pointerType === "mouse" && !expanded) onExpand(index, e);
        if (e.pointerType === "mouse" && expanded) reader.current?.move(e);
      }}
      onKeyDown={(e) => reader.current?.key(e)}
      onPointerLeave={() => { reader.current?.stop(); setActiveInterest(null); }}
      onPointerDown={(e) => {
        activationPointer.current = e.pointerType;
      }}
      onPointerCancel={() => { activationPointer.current = ""; }}
      onFocus={(e) => {
        if (e.currentTarget.matches(":focus-visible")) onExpand(index);
      }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) onExpand(-1); }}
      onClick={(e) => {
        if (e.target.closest(".tz-interest-item")) return;
        const pointerType = activationPointer.current;
        const intent = panelActivationIntent(pointerType, expanded);
        activationPointer.current = "";
        if (intent === "preview") {
          onExpand(index);
          return;
        }
        if (card.id) onOpen(card.id, e.currentTarget);
        else onExpand(pointerType === "touch" && expanded ? -1 : index);
      }}
    >
      <PanelSurface features={features} reduced={reduced} />
      {card.art === "portrait" && text === "TAKEZO" && (
        <span className="tz-identity-pill-title" aria-hidden="true">TAKEZO</span>
      )}
      {hasBreakdown && <AdaptiveBreakdown breakdown={card.breakdown} open={expanded} entryX={entryX} />}
      {card.cursorVideos?.length > 0 && <TechnicalMotion host={panel} sources={card.cursorVideos} reduced={reduced} />}
      {card.artThumbnails?.length > 0 && <ArtThumbnailMotion host={panel} sources={card.artThumbnails} reduced={reduced} />}
      {card.designMedia && <DesignMotion media={card.designMedia} expanded={expanded} reduced={reduced} />}
      {hasInterests && <InterestsMotion host={panel} items={card.interests.items} expanded={expanded} reduced={reduced} active={activeInterest} onActive={setActiveInterest} />}
      <div className="tz-adaptive-content">
        <div className="tz-adaptive-header">
          <span>{card.kicker}</span>
          <span aria-hidden="true">{card.id ? "↗" : expanded ? "−" : "+"}</span>
        </div>
        <div className="tz-title-composition">
          {features.logo && ["icon", "above", "left"].map((mode) => (
            <span key={mode} className={`tz-compact-logo tz-logo-${mode}`} aria-hidden="true"
              style={{ maskImage: `url("${features.logo}")` }} />
          ))}
          <div className="tz-adaptive-title" ref={titleBox}>
            <h2 ref={title}>{text}</h2>
          </div>
        </div>
        {hasInterests && interest && (
          <div key={interest.id} className="tz-interest-context" data-interest={interest.id} aria-live="polite">
            <strong>{interest.title}</strong>
            <span>{interest.caption}</span>
          </div>
        )}
        <div className="tz-adaptive-interior">
          {card.art && (
            <div className="tz-adaptive-art">
              <Artwork kind={card.art} reduced={reduced} />
            </div>
          )}
          <PanelCopy ref={reader} card={card} expanded={expanded} enabled={features.cursorRead} panel={panel} reduced={reduced} />
        </div>
        <div className="tz-adaptive-footer">
          <span>{card.footer || `${card.kicker} / TAKEZO — BOLTFORGED`}</span>
          <span className="tz-adaptive-size" aria-hidden="true">
            {rect[2]}×{rect[3]}
          </span>
        </div>
      </div>
    </Tag>
  );
}
