import { memo } from 'react';

const TitleTarget = memo(function TitleTarget({ children, ...props }) {
  return (
    <div
      className="title-target"
      style={{
        display: 'inline-block',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 30,
        pointerEvents: 'auto',
      }}
      {...props}
    >
      {children}
    </div>
  );
});

export default TitleTarget;
