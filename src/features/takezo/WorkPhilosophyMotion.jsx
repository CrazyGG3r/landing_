import { useEffect, useRef, useState } from "react";
import "./workPhilosophyMotion.css";

const SWEEP_DELAY = 980;
const SWEEP_STEP = 165;
const HOVER_STEP = 65;
const EMPTY_STEPS = [];

export default function WorkPhilosophyMotion({ model, expanded, reduced }) {
  const [active, setActive] = useState(null);
  const [sweeping, setSweeping] = useState(false);
  const timers = useRef([]);
  const hoverTimers = useRef([]);
  const activeRef = useRef(null);
  const steps = model?.steps || EMPTY_STEPS;

  useEffect(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    hoverTimers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    hoverTimers.current = [];
    if (!expanded) {
      activeRef.current = null;
      setActive(null);
      setSweeping(false);
      return undefined;
    }
    if (reduced) return undefined;

    setSweeping(true);
    steps.forEach((_, index) => {
      timers.current.push(window.setTimeout(() => {
        activeRef.current = index;
        setActive(index);
      }, SWEEP_DELAY + index * SWEEP_STEP));
    });
    timers.current.push(window.setTimeout(() => {
      activeRef.current = steps.length - 1;
      setActive(steps.length - 1);
      setSweeping(false);
    }, SWEEP_DELAY + steps.length * SWEEP_STEP + 260));

    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      hoverTimers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, [expanded, reduced, steps]);

  const moveTo = (target) => {
    if (sweeping) return;
    hoverTimers.current.forEach((timer) => window.clearTimeout(timer));
    hoverTimers.current = [];

    const current = activeRef.current;
    if (current === null || current === target || reduced) {
      activeRef.current = target;
      setActive(target);
      return;
    }

    const direction = target > current ? 1 : -1;
    for (let index = current + direction, delay = 0; ; index += direction, delay += HOVER_STEP) {
      const next = index;
      hoverTimers.current.push(window.setTimeout(() => {
        activeRef.current = next;
        setActive(next);
      }, delay));
      if (index === target) break;
    }
  };

  if (!steps.length) return null;
  const current = active === null ? null : steps[active];

  return (
    <section className="tz-work-method" data-open={expanded} data-sweeping={sweeping} aria-hidden={!expanded}>
      <ol className="tz-work-method-rail" aria-label={model.eyebrow}>
        <span className="tz-work-method-line" aria-hidden="true" />
        {steps.map((step, index) => (
          <li key={step.label}>
            <button
              type="button"
              className="tz-work-method-objective"
              data-active={index === active}
              onPointerEnter={() => moveTo(index)}
              onFocus={() => moveTo(index)}
              onClick={(event) => {
                event.stopPropagation();
                moveTo(index);
              }}
              aria-describedby={`work-philosophy-detail-${index}`}
            >
              <span className="tz-work-method-node" aria-hidden="true">
                <span>{index + 1}</span>
              </span>
              <span className="tz-work-method-label">{step.label}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="tz-work-method-detail" data-visible={!!current} aria-live="polite">
        {steps.map((step, index) => (
          <p id={`work-philosophy-detail-${index}`} key={step.label} data-visible={index === active}>
            <strong className="tz-sr-only">{step.label}</strong>
            <span>{step.text}</span>
          </p>
        ))}
      </div>
    </section>
  );
}
