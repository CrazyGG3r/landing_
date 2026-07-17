import { n as e, o as t, r as n, t as r } from "./scheduler-CFRa_C8g.js";
import { a as i, c as a, n as o } from "./model-activity-DqUFxtuG.js";
import { E as s, _ as c, b as l, d as u, f as d, g as f, h as p, i as m, l as h, m as g, n as _, o as v, p as y, s as b, x, y as S } from "./model-render-resolution-QFnfxRkL.js";
//#region node_modules/react-use-measure/dist/index.js
var C = /* @__PURE__ */ t(n(), 1);
function w(e, t) {
	let n;
	return (...r) => {
		window.clearTimeout(n), n = window.setTimeout(() => e(...r), t);
	};
}
function T({ debounce: e, scroll: t, polyfill: n, offsetSize: r } = {
	debounce: 0,
	scroll: !1,
	offsetSize: !1
}) {
	let i = n || (typeof window > "u" ? class {} : window.ResizeObserver);
	if (!i) throw Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");
	let [a, o] = (0, C.useState)({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		bottom: 0,
		right: 0,
		x: 0,
		y: 0
	}), s = (0, C.useRef)({
		element: null,
		scrollContainers: null,
		resizeObserver: null,
		lastBounds: a,
		orientationHandler: null
	}), c = e ? typeof e == "number" ? e : e.scroll : null, l = e ? typeof e == "number" ? e : e.resize : null, u = (0, C.useRef)(!1);
	(0, C.useEffect)(() => (u.current = !0, () => void (u.current = !1)));
	let [d, f, p] = (0, C.useMemo)(() => {
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
			s.current.element instanceof HTMLElement && r && (f.height = s.current.element.offsetHeight, f.width = s.current.element.offsetWidth), Object.freeze(f), u.current && !A(s.current.lastBounds, f) && o(s.current.lastBounds = f);
		};
		return [
			e,
			l ? w(e, l) : e,
			c ? w(e, c) : e
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
	return D(p, !!t), E(f), (0, C.useEffect)(() => {
		m(), h();
	}, [
		t,
		p,
		f
	]), (0, C.useEffect)(() => m, []), [
		(e) => {
			!e || e === s.current.element || (m(), s.current.element = e, s.current.scrollContainers = O(e), h());
		},
		a,
		d
	];
}
function E(e) {
	(0, C.useEffect)(() => {
		let t = e;
		return window.addEventListener("resize", t), () => void window.removeEventListener("resize", t);
	}, [e]);
}
function D(e, t) {
	(0, C.useEffect)(() => {
		if (t) {
			let t = e;
			return window.addEventListener("scroll", t, {
				capture: !0,
				passive: !0
			}), () => void window.removeEventListener("scroll", t, !0);
		}
	}, [e, t]);
}
function O(e) {
	let t = [];
	if (!e || e === document.body) return t;
	let { overflow: n, overflowX: r, overflowY: i } = window.getComputedStyle(e);
	return [
		n,
		r,
		i
	].some((e) => e === "auto" || e === "scroll") && t.push(e), [...t, ...O(e.parentElement)];
}
var k = [
	"x",
	"y",
	"top",
	"bottom",
	"left",
	"right",
	"width",
	"height"
], A = (e, t) => k.every((n) => e[n] === t[n]), j = e();
r();
function M({ ref: e, children: t, fallback: n, resize: r, style: i, gl: a, events: o = h, eventSource: l, eventPrefix: f, shadows: m, linear: _, flat: x, legacy: w, orthographic: E, frameloop: D, dpr: O, performance: k, raycaster: A, camera: M, scene: N, onPointerMissed: P, onCreated: F, ...I }) {
	C.useMemo(() => d(s), []);
	let L = p(), [R, z] = T({
		scroll: !0,
		debounce: {
			scroll: 50,
			resize: 0
		},
		...r
	}), B = C.useRef(null), V = C.useRef(null);
	C.useImperativeHandle(e, () => B.current);
	let H = S(P), [U, W] = C.useState(!1), [G, K] = C.useState(!1);
	if (U) throw U;
	if (G) throw G;
	let q = C.useRef(null);
	return c(() => {
		let e = B.current;
		if (z.width > 0 && z.height > 0 && e) {
			q.current ||= u(e);
			async function n() {
				await q.current.configure({
					gl: a,
					scene: N,
					events: o,
					shadows: m,
					linear: _,
					flat: x,
					legacy: w,
					orthographic: E,
					frameloop: D,
					dpr: O,
					performance: k,
					raycaster: A,
					camera: M,
					size: z,
					onPointerMissed: (...e) => H.current == null ? void 0 : H.current(...e),
					onCreated: (e) => {
						e.events.connect == null || e.events.connect(l ? y(l) ? l.current : l : V.current), f && e.setEvents({ compute: (e, t) => {
							let n = e[f + "X"], r = e[f + "Y"];
							t.pointer.set(n / t.size.width * 2 - 1, -(r / t.size.height) * 2 + 1), t.raycaster.setFromCamera(t.pointer, t.camera);
						} }), F?.(e);
					}
				}), q.current.render(/*#__PURE__*/ (0, j.jsx)(L, { children: /*#__PURE__*/ (0, j.jsx)(b, {
					set: K,
					children: /*#__PURE__*/ (0, j.jsx)(C.Suspense, {
						fallback: /*#__PURE__*/ (0, j.jsx)(v, { set: W }),
						children: t ?? null
					})
				}) }));
			}
			n();
		}
	}), C.useEffect(() => {
		let e = B.current;
		if (e) return () => g(e);
	}, []), /*#__PURE__*/ (0, j.jsx)("div", {
		ref: V,
		style: {
			position: "relative",
			width: "100%",
			height: "100%",
			overflow: "hidden",
			pointerEvents: l ? "none" : "auto",
			...i
		},
		...I,
		children: /*#__PURE__*/ (0, j.jsx)("div", {
			ref: R,
			style: {
				width: "100%",
				height: "100%"
			},
			children: /*#__PURE__*/ (0, j.jsx)("canvas", {
				ref: B,
				style: { display: "block" },
				children: n
			})
		})
	});
}
function N(e) {
	return /*#__PURE__*/ (0, j.jsx)(x, { children: /*#__PURE__*/ (0, j.jsx)(M, { ...e }) });
}
//#endregion
//#region src/runtime/model3d/RuntimeModel3DStage.tsx
var P = 30;
function F() {
	let e = o(), t = _(), { frameRateLimit: n } = i(), r = a(P, n);
	return /* @__PURE__ */ (0, j.jsx)("div", {
		className: "amp-runtime-model-stage",
		"data-amp-model-pixel-ratio": t,
		"data-amp-model-stage-animate": String(e),
		"data-amp-render-fps": r,
		"aria-hidden": !0,
		children: /* @__PURE__ */ (0, j.jsxs)(N, {
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
				/* @__PURE__ */ (0, j.jsx)(L, {}),
				/* @__PURE__ */ (0, j.jsx)(I, {}),
				/* @__PURE__ */ (0, j.jsx)(R, {
					animate: e,
					renderFps: r
				}),
				/* @__PURE__ */ (0, j.jsx)(m.Port, {})
			]
		})
	});
}
function I() {
	return f(({ gl: e }) => {
		e.setScissorTest(!1), e.setClearColor(0, 0), e.clear(!0, !0, !0);
	}, -1e5), null;
}
function L() {
	let e = l((e) => e.gl), t = l((e) => e.invalidate);
	return (0, C.useEffect)(() => {
		let n = e.domElement, r = (e) => e.preventDefault(), i = () => t();
		return n.addEventListener("webglcontextlost", r), n.addEventListener("webglcontextrestored", i), () => {
			n.removeEventListener("webglcontextlost", r), n.removeEventListener("webglcontextrestored", i);
		};
	}, [e, t]), null;
}
function R({ animate: e, renderFps: t }) {
	let n = l((e) => e.invalidate);
	return (0, C.useEffect)(() => {
		if (n(), !e) return;
		let r = 0, i = 0, a = 1e3 / t, o = (e) => {
			e - i >= a && (i = e, n()), r = requestAnimationFrame(o);
		};
		return r = requestAnimationFrame(o), () => cancelAnimationFrame(r);
	}, [
		e,
		n,
		t
	]), null;
}
//#endregion
export { F as default };

//# sourceMappingURL=RuntimeModel3DStage-Db10-TFE.js.map