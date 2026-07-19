export const GLOBAL_CSS = `
  * {
    box-sizing:border-box;
    margin:0;
    padding:0;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  /* Disable zoom on iOS */
  @viewport {
    zoom: 1.0;
    width: extend-to-zoom;
  }
  
  @-ms-viewport {
    width: extend-to-zoom;
    zoom: 1.0;
  }
  
  /* Disable pinch zoom on all browsers */
  html, body {
    max-width: 100vw;
    overflow-x: hidden;
    position: relative;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    /* Disable zoom */
    touch-action: pan-x pan-y; /* Allows only panning, no pinch zoom */
    -ms-touch-action: pan-x pan-y;
    -webkit-text-size-adjust: none; /* Prevent font scaling on orientation change */
    text-size-adjust: none;
  }
  
  /* Additional zoom prevention for mobile browsers */
  @media (max-width: 768px) {
    html, body {
      touch-action: pan-x pan-y !important; /* Override any default touch actions */
      -webkit-text-size-adjust: 100%; /* Keep text readable but prevent zoom */
    }
    
    /* Prevent double-tap zoom */
    a, button, [role="button"], .filter-btn, .nav-item, .tl-dot, 
    input, select, textarea, [contenteditable="true"] {
      touch-action: manipulation;
      -ms-touch-action: manipulation;
    }
  }
  
  img, svg, canvas, [draggable="true"] {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    pointer-events: none;
  }
  
  a, button, [role="button"], .filter-btn, .nav-item, .tl-dot {
    -webkit-user-select: auto;
    -moz-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
    -webkit-touch-callout: default;
    /* Prevent zoom on these elements */
    touch-action: manipulation;
    -ms-touch-action: manipulation;
  }
  
  button:focus, button:focus-visible, .nav-item:focus, .nav-item:focus-visible {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }
  
  :root {
    --title-grad-offset:50%;
    --vh: 1vh;
  }
  
  html, body {
    max-width: 100vw;
    overflow-x: hidden;
    position: relative;
    height: 100%;
    -webkit-overflow-scrolling: touch;
  }
  
  body {
    background:#0c0d0d;
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
  }
  
  #root {
    overflow-x: hidden;
    position: relative;
    width: 100%;
  }
  
  .fade-in {
    opacity:0;
    transform:translateY(20px);
    transition:opacity 0.7s ease,transform 0.7s ease;
  }
  
  .fade-in.visible {
    opacity:1;
    transform:translateY(0);
  }
  
  .nav-item {
    position:relative;
    cursor:pointer;
    transition:color 0.3s ease, transform 0.3s ease;
  }
  
  .nav-item:hover {
    color:#ffffff !important;
    transform:translateY(-1px);
  }
  
  .nav-item:active {
    transform:translateY(0px);
  }
  
  .page-transition-overlay {
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:radial-gradient(circle at 50% 50%,#0c0d0d,#000);
    z-index:9999;
    pointer-events:none;
    opacity:0;
    transition:opacity 0.4s ease;
  }
  
  .page-transition-overlay.active {
    opacity:0.3;
  }
  
  .heading-text {
    font-family:'DM Sans',sans-serif;
    font-weight:800;
    background:linear-gradient(90deg,#333 0%,#fff 40%,#fff 60%,#333 100%);
    background-size:200% 100%;
    background-position:var(--title-grad-offset) 0;
    background-clip:text;
    color:transparent;
    -webkit-background-clip:text;
    filter:brightness(1.8) contrast(2.2);
    transition:background-position 90ms linear;
  }
  
  .outer {
    --line-gap:18px;
    width:210px;
    height:190px;
    border-radius:10px;
    padding:1px;
    background:radial-gradient(circle 230px at 0% 0%,#ffffff,#0c0d0d);
    position:relative;
  }
  
  @media (max-width: 768px) {
    .outer {
      width: 160px;
      height: 145px;
    }
  }
  
  .dot {
    width:5px;
    aspect-ratio:1;
    position:absolute;
    background-color:#fff;
    box-shadow:0 0 10px #ffffff;
    border-radius:100px;
    z-index:2;
    right:calc(var(--line-gap) - 2.5px);
    top:calc(var(--line-gap) - 2.5px);
    animation:moveDot 6s linear infinite;
    animation-play-state:paused;
    opacity:0;
    transition:opacity 0.3s ease;
  }
  
  .outer:hover .dot {
    opacity:1;
    animation-play-state:running;
  }
  
  @media (max-width: 768px) {
    .outer:hover .dot {
      opacity: 0;
    }
  }
  
  @keyframes moveDot {
    0%,100% {
      top:calc(var(--line-gap) - 2.5px);
      right:calc(var(--line-gap) - 2.5px);
    }
    25% {
      top:calc(var(--line-gap) - 2.5px);
      right:calc(100% - var(--line-gap) - 2.5px);
    }
    50% {
      top:calc(100% - var(--line-gap) - 2.5px);
      right:calc(100% - var(--line-gap) - 2.5px);
    }
    75% {
      top:calc(100% - var(--line-gap) - 2.5px);
      right:calc(var(--line-gap) - 2.5px);
    }
  }
  
  .card {
    z-index:1;
    width:100%;
    height:100%;
    border-radius:9px;
    border:solid 1px #202222;
    background:radial-gradient(circle 280px at 0% 0%,#444444,#0c0d0d);
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
    flex-direction:column;
    color:#fff;
    overflow:hidden;
  }
  
  .ray {
    width:220px;
    height:45px;
    border-radius:100px;
    position:absolute;
    background-color:#c7c7c7;
    opacity:0.28;
    box-shadow:0 0 50px #fff;
    filter:blur(10px);
    transform-origin:10%;
    top:0;
    left:0;
    transform:translate3d(0,0,0) rotate(40deg);
  }
  
  @media (max-width: 768px) {
    .ray {
      width: 150px;
      height: 30px;
      filter: blur(8px);
    }
  }
  
  .card .text {
    font-weight:bolder;
    font-family:'DM Sans',sans-serif;
    background:linear-gradient(90deg,#333 0%,#fff 40%,#fff 60%,#333 100%);
    background-size:200% 100%;
    background-position:var(--title-grad-offset) 0;
    background-clip:text;
    color:transparent;
    -webkit-background-clip:text;
    filter:brightness(1.8) contrast(2.2);
  }
  
  .line {
    width:100%;
    height:1px;
    position:absolute;
    background-color:#2c2c2c;
  }
  
  .topl {
    top:var(--line-gap);
    background:linear-gradient(90deg,#888888 30%,#1d1f1f 70%);
  }
  
  .bottoml {
    bottom:var(--line-gap);
  }
  
  .leftl {
    left:var(--line-gap);
    width:1px;
    height:100%;
    background:linear-gradient(180deg,#747474 30%,#222424 70%);
  }
  
  .rightl {
    right:var(--line-gap);
    width:1px;
    height:100%;
  }
  
  .tl-dot {
    transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    cursor:pointer;
  }
  
  .timeline-content {
    animation:contentReveal 0.4s cubic-bezier(0.4,0,0.2,1) forwards;
  }
  
  @keyframes contentReveal {
    from {
      opacity:0;
      transform:translateY(12px);
    }
    to {
      opacity:1;
      transform:translateY(0);
    }
  }
  
  .rq-card {
    transition:transform 0.2s ease,border-color 0.2s ease,opacity 0.25s ease;
  }
  
  .rq-card:hover {
    transform:translateY(-3px);
    border-color:#383b3b !important;
  }
  
  @media (max-width: 768px) {
    .rq-card:hover {
      transform: none;
    }
  }
  
  .rq-card.entering {
    animation:cardEnter 0.35s cubic-bezier(0.34,1.2,0.64,1) both;
  }
  
  @keyframes cardEnter {
    from {
      opacity:0;
      transform:translateY(16px) scale(0.97);
    }
    to {
      opacity:1;
      transform:translateY(0) scale(1);
    }
  }
  
  .filter-btn {
    transition:all 0.2s ease;
    position:relative;
  }
  
  .filter-btn:hover {
    border-color:#383b3b !important;
    color:#e8e8e8 !important;
  }
  
  @media (max-width: 768px) {
    .filter-btn:hover {
      border-color: #202222 !important;
      color: #555a5a !important;
    }
    
    .filter-btn.active:hover {
      border-color: #2e3030 !important;
      color: #e8e8e8 !important;
    }
  }
  
  @keyframes drawLine {
    from {
      stroke-dashoffset:1000;
    }
    to {
      stroke-dashoffset:0;
    }
  }
  
  .line-animated {
    stroke-dasharray:1000;
    stroke-dashoffset:1000;
  }
  
  .line-animated.ready {
    animation:drawLine 1.2s cubic-bezier(0.4,0,0.2,1) forwards;
  }
  
  .line-animated.ready.delay {
    animation-delay:0.2s;
  }
  
  .chart-grid {
    display:grid;
    gap:20px;
    grid-template-columns:1fr;
  }
  
  @media(min-width:768px) {
    .chart-grid {
      grid-template-columns:1fr 1fr;
    }
  }
  
  .card-spotlight {
    position:relative;
    overflow:hidden;
    --mouse-x:50%;
    --mouse-y:50%;
    --spotlight-color:rgba(255,255,255,0.05);
  }
  
  .card-spotlight::before {
    content:'';
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:radial-gradient(circle at var(--mouse-x) var(--mouse-y),var(--spotlight-color),transparent 80%);
    opacity:0;
    transition:opacity 0.5s ease;
    pointer-events:none;
    z-index:1;
  }
  
  .card-spotlight:hover::before,
  .card-spotlight:focus-within::before {
    opacity:0.6;
  }
  
  @media (max-width: 768px) {
    .card-spotlight::before {
      display: none;
    }
  }
  
  .card-spotlight>* {
    position:relative;
    z-index:2;
  }
  
  .outer,.card,.dot,.ray {
    backface-visibility:hidden;
    transform:translateZ(0);
  }

  /* Mobile StatCard fixes - Always show details without background */
  @media (max-width: 768px) {
    .outer .card .text {
      transform: none !important;
      transition: none !important;
      margin-bottom: 24px;
    }
    
    .outer .card > div:last-child {
      opacity: 1 !important;
      transform: translateY(0px) !important;
      transition: none !important;
      background: transparent !important;
      backdrop-filter: none !important;
      border-radius: 0 !important;
      margin: 0 !important;
      bottom: 12px;
      padding: 0 !important;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }
    
    .outer .card > div:last-child div {
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }
    
    .outer {
      transform: none !important;
      transition: none !important;
    }
    
    .outer .dot {
      opacity: 0 !important;
    }
  }
  
  ::-webkit-scrollbar {
    width:5px;
  }
  
  ::-webkit-scrollbar-track {
    background:#0c0d0d;
  }
  
  ::-webkit-scrollbar-thumb {
    background:#222424;
    border-radius:3px;
  }
`;