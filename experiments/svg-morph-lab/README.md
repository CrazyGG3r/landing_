# Forma — SVG Morph Lab

A standalone, dependency-free desktop test site. It does not import or modify the portfolio application.

From the repository root, run:

```sh
npx vite experiments/svg-morph-lab --host 127.0.0.1
```

Open the local URL printed by Vite. You can also serve this folder with any static file server.

The shape uses 64 matching radial samples and a closed cubic path. Only one SVG `d` attribute changes per animation frame; three `<use>` elements share it. The render loop runs only during a morph. Auto cycle uses a timer while idle, and animation pauses when the page is hidden, the preview leaves the viewport, or desktop input is unavailable. Reduced-motion preference switches to immediate transitions.

The desktop cursor uses the supplied `arrow.svg` by default. Movement gives the arrow a damped, inertial rotation; hovering an enabled link or control morphs its outline into `trigger.svg`. The **Test wait cursor** button morphs either outline into the supplied `wait.svg` for five seconds. Its eight ellipses follow a continuous, perspective-sized orbit using one SVG transform per ellipse. On return, the cursor adopts the shape appropriate to the current hover target. Shape sampling happens once, and animation frames run only during pointer movement, a morph, the short inertial settle, or the wait event. Reduced-motion mode switches shapes immediately and shows a static wait form for the same duration.
