import { n as e, o as t, r as n, t as r } from "./scheduler-CFRa_C8g.js";
import { n as i } from "./model-activity-Ba1Jlnbi.js";
import { C as a, _ as o, c as s, d as c, f as l, g as u, i as d, l as f, m as p, o as m, p as h, r as g, t as _, u as v, v as y } from "./View-00cs8gnA.js";
//#region node_modules/react-use-measure/dist/index.js
var b = /* @__PURE__ */ t(n(), 1);
function x(e, t) {
	let n;
	return (...r) => {
		window.clearTimeout(n), n = window.setTimeout(() => e(...r), t);
	};
}
function S({ debounce: e, scroll: t, polyfill: n, offsetSize: r } = {
	debounce: 0,
	scroll: !1,
	offsetSize: !1
}) {
	let i = n || (typeof window > "u" ? class {} : window.ResizeObserver);
	if (!i) throw Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");
	let [a, o] = (0, b.useState)({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		bottom: 0,
		right: 0,
		x: 0,
		y: 0
	}), s = (0, b.useRef)({
		element: null,
		scrollContainers: null,
		resizeObserver: null,
		lastBounds: a,
		orientationHandler: null
	}), c = e ? typeof e == "number" ? e : e.scroll : null, l = e ? typeof e == "number" ? e : e.resize : null, u = (0, b.useRef)(!1);
	(0, b.useEffect)(() => (u.current = !0, () => void (u.current = !1)));
	let [d, f, p] = (0, b.useMemo)(() => {
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
			s.current.element instanceof HTMLElement && r && (f.height = s.current.element.offsetHeight, f.width = s.current.element.offsetWidth), Object.freeze(f), u.current && !D(s.current.lastBounds, f) && o(s.current.lastBounds = f);
		};
		return [
			e,
			l ? x(e, l) : e,
			c ? x(e, c) : e
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
	return w(p, !!t), C(f), (0, b.useEffect)(() => {
		m(), h();
	}, [
		t,
		p,
		f
	]), (0, b.useEffect)(() => m, []), [
		(e) => {
			!e || e === s.current.element || (m(), s.current.element = e, s.current.scrollContainers = T(e), h());
		},
		a,
		d
	];
}
function C(e) {
	(0, b.useEffect)(() => {
		let t = e;
		return window.addEventListener("resize", t), () => void window.removeEventListener("resize", t);
	}, [e]);
}
function w(e, t) {
	(0, b.useEffect)(() => {
		if (t) {
			let t = e;
			return window.addEventListener("scroll", t, {
				capture: !0,
				passive: !0
			}), () => void window.removeEventListener("scroll", t, !0);
		}
	}, [e, t]);
}
function T(e) {
	let t = [];
	if (!e || e === document.body) return t;
	let { overflow: n, overflowX: r, overflowY: i } = window.getComputedStyle(e);
	return [
		n,
		r,
		i
	].some((e) => e === "auto" || e === "scroll") && t.push(e), [...t, ...T(e.parentElement)];
}
var E = [
	"x",
	"y",
	"top",
	"bottom",
	"left",
	"right",
	"width",
	"height"
], D = (e, t) => E.every((n) => e[n] === t[n]), O = e();
r();
function k({ ref: e, children: t, fallback: n, resize: r, style: i, gl: o, events: h = m, eventSource: _, eventPrefix: y, shadows: x, linear: C, flat: w, legacy: T, orthographic: E, frameloop: D, dpr: k, performance: A, raycaster: j, camera: M, scene: N, onPointerMissed: P, onCreated: F, ...I }) {
	b.useMemo(() => f(a), []);
	let L = l(), [R, z] = S({
		scroll: !0,
		debounce: {
			scroll: 50,
			resize: 0
		},
		...r
	}), B = b.useRef(null), V = b.useRef(null);
	b.useImperativeHandle(e, () => B.current);
	let H = u(P), [U, W] = b.useState(!1), [G, K] = b.useState(!1);
	if (U) throw U;
	if (G) throw G;
	let q = b.useRef(null);
	return p(() => {
		let e = B.current;
		if (z.width > 0 && z.height > 0 && e) {
			q.current ||= s(e);
			async function n() {
				await q.current.configure({
					gl: o,
					scene: N,
					events: h,
					shadows: x,
					linear: C,
					flat: w,
					legacy: T,
					orthographic: E,
					frameloop: D,
					dpr: k,
					performance: A,
					raycaster: j,
					camera: M,
					size: z,
					onPointerMissed: (...e) => H.current == null ? void 0 : H.current(...e),
					onCreated: (e) => {
						e.events.connect == null || e.events.connect(_ ? v(_) ? _.current : _ : V.current), y && e.setEvents({ compute: (e, t) => {
							let n = e[y + "X"], r = e[y + "Y"];
							t.pointer.set(n / t.size.width * 2 - 1, -(r / t.size.height) * 2 + 1), t.raycaster.setFromCamera(t.pointer, t.camera);
						} }), F?.(e);
					}
				}), q.current.render(/*#__PURE__*/ (0, O.jsx)(L, { children: /*#__PURE__*/ (0, O.jsx)(d, {
					set: K,
					children: /*#__PURE__*/ (0, O.jsx)(b.Suspense, {
						fallback: /*#__PURE__*/ (0, O.jsx)(g, { set: W }),
						children: t ?? null
					})
				}) }));
			}
			n();
		}
	}), b.useEffect(() => {
		let e = B.current;
		if (e) return () => c(e);
	}, []), /*#__PURE__*/ (0, O.jsx)("div", {
		ref: V,
		style: {
			position: "relative",
			width: "100%",
			height: "100%",
			overflow: "hidden",
			pointerEvents: _ ? "none" : "auto",
			...i
		},
		...I,
		children: /*#__PURE__*/ (0, O.jsx)("div", {
			ref: R,
			style: {
				width: "100%",
				height: "100%"
			},
			children: /*#__PURE__*/ (0, O.jsx)("canvas", {
				ref: B,
				style: { display: "block" },
				children: n
			})
		})
	});
}
function A(e) {
	return /*#__PURE__*/ (0, O.jsx)(y, { children: /*#__PURE__*/ (0, O.jsx)(k, { ...e }) });
}
//#endregion
//#region src/runtime/model3d/RuntimeModel3DStage.tsx
var j = 30;
function M() {
	let e = i();
	return /* @__PURE__ */ (0, O.jsx)("div", {
		className: "amp-runtime-model-stage",
		"aria-hidden": !0,
		children: /* @__PURE__ */ (0, O.jsxs)(A, {
			frameloop: "demand",
			dpr: 1,
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
				/* @__PURE__ */ (0, O.jsx)(P, {}),
				/* @__PURE__ */ (0, O.jsx)(N, {}),
				/* @__PURE__ */ (0, O.jsx)(F, { animate: e }),
				/* @__PURE__ */ (0, O.jsx)(_.Port, {})
			]
		})
	});
}
function N() {
	return h(({ gl: e }) => {
		e.setScissorTest(!1), e.setClearColor(0, 0), e.clear(!0, !0, !0);
	}, -1e5), null;
}
function P() {
	let e = o((e) => e.gl), t = o((e) => e.invalidate);
	return (0, b.useEffect)(() => {
		let n = e.domElement, r = (e) => e.preventDefault(), i = () => t();
		return n.addEventListener("webglcontextlost", r), n.addEventListener("webglcontextrestored", i), () => {
			n.removeEventListener("webglcontextlost", r), n.removeEventListener("webglcontextrestored", i);
		};
	}, [e, t]), null;
}
function F({ animate: e }) {
	let t = o((e) => e.invalidate);
	return (0, b.useEffect)(() => {
		if (t(), !e) return;
		let n = 0, r = 0, i = 1e3 / j, a = (e) => {
			e - r >= i && (r = e, t()), n = requestAnimationFrame(a);
		};
		return n = requestAnimationFrame(a), () => cancelAnimationFrame(n);
	}, [e, t]), null;
}
//#endregion
export { M as default };

//# sourceMappingURL=RuntimeModel3DStage-ClJr1Pfz.js.map