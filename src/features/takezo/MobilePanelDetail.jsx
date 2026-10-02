function Copy({ card }) {
  const text = card.content?.find((item) => item.tag === "hovered")?.text
    || card.description || "";
  return text ? <p className="tz-mobile-detail-copy">{text}</p> : null;
}

export default function MobilePanelDetail({ card, onClose, expanded, reduced }) {
  const video = card.locationMotion?.pakistan || card.designMedia?.video
    || card.cursorVideos?.[0] || (card.art === "portrait" ? "/takezo/TakezoPortraitFormation.webm" : null);
  const poster = card.designMedia?.logo || (card.art === "portrait" ? "/takezo/TakezoPortraitFormed.svg" : null);
  return (
    <div className="tz-mobile-detail" onClick={(event) => event.stopPropagation()}>
      <div className="tz-mobile-detail-heading">
        <span>{card.kicker}</span>
        <button type="button" aria-label={`Close ${card.title.replace(/\s+/g, " ")}`} onClick={onClose}>×</button>
      </div>
      <div className="tz-mobile-detail-body">
        <h2>{card.title.replace(/\s+/g, " ")}</h2>
        {video && <MobileVideo path={video} poster={poster} active={expanded} reduced={reduced} />}
        {card.interests?.items?.length ? (
          <>
            <Copy card={card} />
            <ul className="tz-mobile-detail-interests">
              {card.interests.items.filter((item) => item.title).map((item) => (
                <li key={item.id}>
                  {item.icon && <img src={item.icon} alt="" loading="lazy" />}
                  <div><strong>{item.title}</strong><p>{item.caption}</p></div>
                </li>
              ))}
            </ul>
          </>
        ) : card.workPhilosophy?.steps?.length ? (
          <>
            <Copy card={card} />
            <ol className="tz-mobile-detail-steps">
              {card.workPhilosophy.steps.map((step) => <li key={step.label}><strong>{step.label}</strong><p>{step.text}</p></li>)}
            </ol>
          </>
        ) : card.languages?.items?.length ? (
          <ul className="tz-mobile-detail-list">
            {card.languages.items.map((item) => <li key={item.id}><strong lang={item.lang}>{item.label}</strong><span>{item.caption}</span></li>)}
          </ul>
        ) : card.availabilityMotion ? (
          <>
            <p className="tz-mobile-detail-lead">Open for work now.</p>
            <p>{card.availabilityMotion.hours} weekly</p>
            <ul className="tz-mobile-detail-chips">
              {[...card.availabilityMotion.roles, ...card.availabilityMotion.tags].map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p>{card.availabilityMotion.note}</p>
          </>
        ) : card.educationMotion ? (
          <>
            <p className="tz-mobile-detail-lead">{card.educationMotion.degree}</p>
            <p>{card.educationMotion.school} · {card.educationMotion.years}</p>
            <Copy card={card} />
            {card.educationMotion.project?.url && <a href={card.educationMotion.project.url} target="_blank" rel="noreferrer">View {card.educationMotion.project.label} ↗</a>}
          </>
        ) : <Copy card={card} />}
      </div>
      <div className="tz-mobile-detail-footer">{card.footer || `${card.kicker} / TAKEZO — BOLTFORGED`}</div>
    </div>
  );
}
import { useEffect, useRef } from "react";
import { useVideoSource } from "../../shared/performance/videoSources";

function MobileVideo({ path, poster, active, reduced }) {
  const video = useRef(null);
  const source = useVideoSource(path);
  useEffect(() => {
    const element = video.current;
    if (!element || !active || reduced || !source.src) return undefined;
    element.play().catch(source.onPlaybackError);
    return () => element.pause();
  }, [active, reduced, source]);
  if (reduced || source.failed) return poster ? <img className="tz-mobile-detail-media" src={poster} alt="" /> : null;
  return <video ref={video} className="tz-mobile-detail-media" src={active ? source.src : undefined}
    poster={poster} muted loop playsInline preload="metadata" onError={source.onError} aria-hidden="true" />;
}
