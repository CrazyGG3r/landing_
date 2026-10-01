import { useEffect, useState } from "react";
import "./languagesMotion.css";

export default function LanguagesMotion({ model, expanded, reduced, onActive }) {
  const [active, setActive] = useState("english");
  const [inspecting, setInspecting] = useState(null);

  const choose = (id, inspect = true) => {
    setActive(id);
    setInspecting(inspect ? id : null);
    onActive?.(id);
  };

  useEffect(() => {
    if (expanded) return;
    setActive("english");
    setInspecting(null);
    onActive?.("english");
  }, [expanded, onActive]);

  return (
    <section className="tz-languages-motion" data-open={expanded} data-active={active} data-reduced={reduced} aria-hidden={!expanded}>
      <div className="tz-languages-table" role="list" aria-label="Languages">
        {model.items.map((item) => (
          <div className="tz-language-cell" key={item.id} role="listitem" data-language={item.id} data-active={active === item.id}>
            <button
              type="button"
              className="tz-language-choice"
              onPointerEnter={() => choose(item.id)}
              onPointerLeave={(event) => {
                if (event.pointerType !== "mouse") return;
                if (item.id === "urdu") choose("english", false);
                else setInspecting(null);
              }}
              onFocus={() => choose(item.id)}
              onBlur={() => {
                if (item.id === "urdu") choose("english", false);
                else setInspecting(null);
              }}
              onClick={(event) => {
                event.stopPropagation();
                choose(item.id);
              }}
              lang={item.lang}
              dir={item.id === "urdu" ? "rtl" : undefined}
              aria-describedby={`language-caption-${item.id}`}
            >
              <span className="tz-language-name">{item.label}</span>
            </button>
            <p id={`language-caption-${item.id}`} data-visible={inspecting === item.id}>{item.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
