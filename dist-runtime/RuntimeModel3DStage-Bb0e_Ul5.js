import { n as e, o as t, r as n, t as r } from "./scheduler-CFRa_C8g.js";
import { n as i } from "./model-activity-Ba1Jlnbi.js";
import { E as a, _ as o, b as s, d as c, f as l, g as u, h as d, i as f, l as p, m, n as h, o as g, p as _, s as v, x as y, y as b } from "./model-render-resolution-QFnfxRkL.js";
//#region node_modules/react-use-measure/dist/index.js
var x = /* @__PURE__ */ t(n(), 1);
function S(e, t) {
	let n;
	return (...r) => {
		window.clearTimeout(n), n = window.setTimeout(() => e(...r), t);
	};
}
function C({ debounce: e, scroll: t, polyfill: n, offsetSize: r } = {
	debounce: 0,
	scroll: !1,
	offsetSize: !1
}) {
	let i = n || (typeof window > "u" ? class {} : window.ResizeObserver);
	if (!i) throw Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");
	let [a, o] = (0, x.useState)({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		bottom: 0,
		right: 0,
		x: 0,
		y: 0
	}), s = (0, x.useRef)({
		element: null,
		scrollContainers: null,
		resizeObserver: null,
		lastBounds: a,
		orientationHandler: null
	}), c = e ? typeof e == "number" ? e : e.scroll : null, l = e ? typeof e == "number" ? e : e.resize : null, u = (0, x.useRef)(!1);
	(0, x.useEffect)(() => (u.current = !0, () => void (u.current = !1)));
	let [d, f, p] = (0, x.useMemo)(() => {
		let e = () => {
			if (!s.current.element) return;
			let { left: e, top: t, width: n, height: i, bottom: a, right: c, x: l, y: d } = s.current.element.getBoundingClientRect(), f = {
				left: e,
				top: t,
				width: n,
				height: i,
				bottom: a,
				right: c,
				x: l,
				y: d
			};
			s.current.element instanceof HTMLElement && r && (f.height = s.current.element.offsetHeight, f.width = s.current.element.offsetWidth), Object.freeze(f), u.current && !O(s.current.lastBounds, f) && o(s.current.lastBounds = f);
		};
		return [
			e,
			l ? S(e, l) : e,
			c ? S(e, c) : e
		];
	}, [
		o,
		r,
		c,
		l
	]);
	function m() {
		s.current.scrollContainers && (s.current.scrollContainers.forEach((e) => e.removeEventListener("scroll", p, !0)), s.current.scrollContainers = null), s.current.resizeObserver && (s.current.resizeObserver.disconnect(), s.current.resizeObserver = null), s.current.orientationHandler && ("orientation" in screen && "removeEventListener" in screen.orientation ? screen.orientation.removeEventListener("change", s.current.orientationHandler) : "onorientationchange" in window && window.removeEventListener("orientationchange", s.current.orientationHandler));
	}
	function h() {
		s.current.element && (s.current.resizeObserver = new i(p), s.current.resizeObserver.observe(s.current.element), t && s.current.scrollContainers && s.current.scrollContainers.forEach((e) => e.addEventListener("scroll", p, {
			capture: !0,
			passive: !0
		})), s.current.orientationHandler = () => {
			p();
		}, "orientation" in screen && "addEventListener" in screen.orientation ? screen.orientation.addEventListener("change", s.current.orientationHandler) : "onorientationchange" in window && window.addEventListener("orientationchange", s.current.orientationHandler));
	}
	return T(p, !!t), w(f), (0, x.useEffect)(() => {
		m(), h();
	}, [
		t,
		p,
		f
	]), (0, x.useEffect)(() => m, []), [
		(e) => {
			!e || e === s.current.element || (m(), s.current.element = e, s.current.scrollContainers = E(e), h());
		},
		a,
		d
	];
}
function w(e) {
	(0, x.useEffect)(() => {
		let t = e;
		return window.addEventListener("resize", t), () => void window.removeEventListener("resize", t);
	}, [e]);
}
function T(e, t) {
	(0, x.useEffect)(() => {
		if (t) {
			let t = e;
			return window.addEventListener("scroll", t, {
				capture: !0,
				passive: !0
			}), () => void window.removeEventListener("scroll", t, !0);
		}
	}, [e, t]);
}
function E(e) {
	let t = [];
	if (!e || e === document.body) return t;
	let { overflow: n, overflowX: r, overflowY: i } = window.getComputedStyle(e);
	return [
		n,
		r,
		i
	].some((e) => e === "auto" || e === "scroll") && t.push(e), [...t, ...E(e.parentElement)];
}
var D = [
	"x",
	"y",
	"top",
	"bottom",
	"left",
	"right",
	"width",
	"height"
], O = (e, t) => D.every((n) => e[n] === t[n]), k = e();
r();
function A({ ref: e, children: t, fallback: n, resize: r, style: i, gl: s, events: u = p, eventSource: f, eventPrefix: h, shadows: y, linear: S, flat: w, legacy: T, orthographic: E, frameloop: D, dpr: O, performance: A, raycaster: j, camera: M, scene: N, onPointerMissed: P, onCreated: F, ...I }) {
	x.useMemo(() => l(a), []);
	let L = d(), [R, z] = C({
		scroll: !0,
		debounce: {
			scroll: 50,
			resize: 0
		},
		...r
	}), B = x.useRef(null), V = x.useRef(null);
	x.useImperativeHandle(e, () => B.current);
	let H = b(P), [U, W] = x.useState(!1), [G, K] = x.useState(!1);
	if (U) throw U;
	if (G) throw G;
	let q = x.useRef(null);
	return o(() => {
		let e = B.current;
		if (z.width > 0 && z.height > 0 && e) {
			q.current ||= c(e);
			async function n() {
				await q.current.configure({
					gl: s,
					scene: N,
					events: u,
					shadows: y,
					linear: S,
					flat: w,
					legacy: T,
					orthographic: E,
					frameloop: D,
					dpr: O,
					performance: A,
					raycaster: j,
					camera: M,
					size: z,
					onPointerMissed: (...e) => H.current == null ? void 0 : H.current(...e),
					onCreated: (e) => {
						e.events.connect == null || e.events.connect(f ? _(f) ? f.current : f : V.current), h && e.setEvents({ compute: (e, t) => {
							let n = e[h + "X"], r = e[h + "Y"];
							t.pointer.set(n / t.size.width * 2 - 1, -(r / t.size.height) * 2 + 1), t.raycaster.setFromCamera(t.pointer, t.camera);
						} }), F?.(e);
					}
				}), q.current.render(/*#__PURE__*/ (0, k.jsx)(L, { children: /*#__PURE__*/ (0, k.jsx)(v, {
					set: K,
					children: /*#__PURE__*/ (0, k.jsx)(x.Suspense, {
						fallback: /*#__PURE__*/ (0, k.jsx)(g, { set: W }),
						children: t ?? null
					})
				}) }));
			}
			n();
		}
	}), x.useEffect(() => {
		let e = B.current;
		if (e) return () => m(e);
	}, []), /*#__PURE__*/ (0, k.jsx)("div", {
		ref: V,
		style: {
			position: "relative",
			width: "100%",
			height: "100%",
			overflow: "hidden",
			pointerEvents: f ? "none" : "auto",
			...i
		},
		...I,
		children: /*#__PURE__*/ (0, k.jsx)("div", {
			ref: R,
			style: {
				width: "100%",
				height: "100%"
			},
			children: /*#__PURE__*/ (0, k.jsx)("canvas", {
				ref: B,
				style: { display: "block" },
				children: n
			})
		})
	});
}
function j(e) {
	return /*#__PURE__*/ (0, k.jsx)(y, { children: /*#__PURE__*/ (0, k.jsx)(A, { ...e }) });
}
//#endregion
//#region src/runtime/model3d/RuntimeModel3DStage.tsx
var M = 30;
function N() {
	let e = i(), t = h();
	return /* @__PURE__ */ (0, k.jsx)("div", {
		className: "amp-runtime-model-stage",
		"data-amp-model-pixel-ratio": t,
		"data-amp-model-stage-animate": String(e),
		"aria-hidden": !0,
		children: /* @__PURE__ */ (0, k.jsxs)(j, {
			frameloop: "demand",
			dpr: t,
			gl: {
				alpha: !0,
				antialias: !1,
				powerPreference: "high-performance",
				preserveDrawingBuffer: !1,
				stencil: !1
			},
			fallback: null,
			onCreated: ({ gl: e }) => e.setClearColor(0, 0),
			children: [
				/* @__PURE__ */ (0, k.jsx)(F, {}),
				/* @__PURE__ */ (0, k.jsx)(P, {}),
				/* @__PURE__ */ (0, k.jsx)(I, { animate: e }),
				/* @__PURE__ */ (0, k.jsx)(f.Port, {})
			]
		})
	});
}
function P() {
	return u(({ gl: e }) => {
		e.setScissorTest(!1), e.setClearColor(0, 0), e.clear(!0, !0, !0);
	}, -1e5), null;
}
function F() {
	let e = s((e) => e.gl), t = s((e) => e.invalidate);
	return (0, x.useEffect)(() => {
		let n = e.domElement, r = (e) => e.preventDefault(), i = () => t();
		return n.addEventListener("webglcontextlost", r), n.addEventListener("webglcontextrestored", i), () => {
			n.removeEventListener("webglcontextlost", r), n.removeEventListener("webglcontextrestored", i);
		};
	}, [e, t]), null;
}
function I({ animate: e }) {
	let t = s((e) => e.invalidate);
	return (0, x.useEffect)(() => {
		if (t(), !e) return;
		let n = 0, r = 0, i = 1e3 / M, a = (e) => {
			e - r >= i && (r = e, t()), n = requestAnimationFrame(a);
		};
		return n = requestAnimationFrame(a), () => cancelAnimationFrame(n);
	}, [e, t]), null;
}
//#endregion
export { N as default };

//# sourceMappingURL=RuntimeModel3DStage-Bb0e_Ul5.js.map