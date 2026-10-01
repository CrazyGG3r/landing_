import "./availabilityMotion.css";

export default function AvailabilityMotion({ model, expanded }) {
  return (
    <section className="tz-availability-motion" data-open={expanded} aria-hidden={!expanded}>
      <div className="tz-availability-intro">
        <span className="tz-availability-overline">OPEN FOR WORK / NOW</span>
        <p className="tz-availability-lead">Ready when<br />the work is.</p>
      </div>
      <div className="tz-availability-offer">
        <span className="tz-availability-overline">OPPORTUNITIES</span>
        <div className="tz-availability-roles">
          {model.roles.map((role, index) => <span key={role} style={{ "--order": index }}>{role}</span>)}
        </div>
      </div>
      <div className="tz-availability-capacity">
        <span className="tz-availability-hours">{model.hours}</span>
        <span className="tz-availability-weekly">PER WEEK <i aria-hidden="true" /> URGENCY FLEXIBLE</span>
      </div>
      <div className="tz-availability-bottom">
        <span className="tz-availability-overline">HOW WE CAN WORK</span>
        <div className="tz-availability-tags">
          {model.tags.map((tag, index) => <span key={tag} style={{ "--order": index }}>{tag}</span>)}
        </div>
      </div>
    </section>
  );
}
