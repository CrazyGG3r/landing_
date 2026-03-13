import { memo } from 'react';
import { FONT_LETTERBOX_TITLE } from './core/constants';
import FaultyTerminal from './components/FaultyTerminal';

const Options = memo(function Options({ logoSlotRef, rootRef, active }) {
  return (
    <div
      ref={rootRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 6,
        background: active ? '#000' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: active ? 'auto' : 'none',
        opacity: active ? 1 : 0,
        overflow: 'hidden',
      }}>
      <FaultyTerminal
        pause={!active}
        mouseReact={active}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
        imageUrl="assets/images/banners"
        imageOpacity={0.35}
      />
      <div style={{
        width: 'min(1200px, 92vw)',
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(24px, 6vw, 90px)',
        position: 'relative',
        zIndex: 3,
      }}>
        <div
          ref={logoSlotRef}
          style={{
            width: 'clamp(90px, 18vh, 220px)',
            height: 'clamp(90px, 18vh, 220px)',
            flex: '0 0 auto',
          }}
        />
        <nav style={{
          display: 'flex',
          gap: 'clamp(18px, 4vw, 64px)',
          alignItems: 'center',
          pointerEvents: 'auto',
        }}>
          {['Portfolio', 'About', 'Contact'].map(label => (
            <a
              key={label}
              href="#"
              className="options-link"
              data-cursor-target="options"
              data-cursor-label={label}
              style={{
                fontFamily: FONT_LETTERBOX_TITLE,
                fontSize: 'clamp(12px, 1.6vw, 16px)',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(230, 235, 245, 0.8)',
                textDecoration: 'none',
                transition: 'color 0.25s ease, text-shadow 0.25s ease',
                cursor: 'pointer',
                display: 'inline-flex',
                position: 'relative',
                zIndex: 20,
                pointerEvents: 'auto',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,1)';
                e.currentTarget.style.textShadow = '0 0 10px rgba(180,220,255,0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(230, 235, 245, 0.8)';
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
});

export default Options;
