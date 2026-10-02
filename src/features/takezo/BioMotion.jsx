import { useEffect, useState } from "react";
import "./bioMotion.css";

const PFP = "/takezo/person/bio/TakezoPFP.jpg";
const PFP_EXPANSION = "/takezo/person/bio/TakezoPFPExpansion.jpg";

export default function BioMotion({ expanded, reduced }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!expanded) {
      setReady(false);
      return undefined;
    }
    if (reduced) {
      setReady(true);
      return undefined;
    }
    const timer = window.setTimeout(() => setReady(true), 560);
    return () => window.clearTimeout(timer);
  }, [expanded, reduced]);

  return (
    <section className="tz-bio" data-open={expanded} data-ready={ready} aria-hidden={!expanded}>
      <figure className="tz-bio-pfp" aria-label="Takezo portrait — available now">
        <div className="tz-bio-pfp-media">
          <img className="tz-bio-pfp-idle" src={PFP} alt="Takezo" draggable="false" />
          <img className="tz-bio-pfp-expanded" src={PFP_EXPANSION} alt="" draggable="false" />
          <span className="tz-bio-pfp-alias" aria-hidden="true">
            <span>AKA</span>
            <strong>Muhammad Uzair</strong>
            <em>Just another day of achieving something...</em>
          </span>
          <span className="tz-bio-pfp-feather" aria-hidden="true" />
        </div>

        <svg className="tz-bio-pfp-status" viewBox="0 0 220 220" aria-hidden="true">
          <defs>
            <path id="takezo-availability-arc" d="M 43,170 Q 110,220 177,170" />
          </defs>
          <use className="tz-bio-pfp-status-band" href="#takezo-availability-arc" />
          <text>
            <textPath href="#takezo-availability-arc" startOffset="50%" textAnchor="middle">
              AVAILABLE NOW
            </textPath>
          </text>
        </svg>
      </figure>
    </section>
  );
}
