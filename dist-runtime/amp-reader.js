/**
 * AMP READER DEPLOYMENT COMMAND
 *
 * 1. Add this to the page <head>:
 *    <link rel="stylesheet" href="./dist-runtime/amp-reader.css">
 *
 * 2. Add a host and module script where the Reader should appear:
 *    <div id="amp-reader"></div>
 *    <script type="module">
 *      import { mountAMPReader } from "./dist-runtime/amp-reader.js";
 *      mountAMPReader("#amp-reader", {
 *        src: "./projects/MyProject/document.json"
 *      });
 *    </script>
 *
 * Change only the host selector and AMP document path as needed.
 * See AMP-READER-USAGE.html in this directory for a copy-ready example.
 */
import { i as e, n as t, o as n, r, t as i } from "./scheduler-CFRa_C8g.js";
import { _ as a, a as o, b as s, d as c, f as l, g as u, h as d, i as f, l as p, m, o as h, p as g, r as _, s as v, t as y, u as b, v as x, x as ee, y as te } from "./model-activity-DqUFxtuG.js";
import { t as ne } from "./react-dom-Bh3c3HEG.js";
//#region src/specification/version.ts
var re = "1.0.0", S = /* @__PURE__ */ n(r(), 1), ie = 1080, ae = 1e5, oe = x({
	x: a().finite(),
	y: a().finite()
}), C = x({
	width: ee([a().positive().finite(), u("auto")]),
	height: ee([a().positive().finite(), u("auto")])
}), se = x({
	top: a().finite(),
	right: a().finite(),
	bottom: a().finite(),
	left: a().finite()
}), ce = b([
	"flow",
	"float-left",
	"float-right",
	"inline",
	"center",
	"absolute"
]), le = b([
	"top-left",
	"top-center",
	"top-right",
	"center-left",
	"center",
	"center-right",
	"bottom-left",
	"bottom-center",
	"bottom-right"
]), ue = b([
	"visible",
	"hidden",
	"scroll"
]), de = x({
	mode: ce,
	position: oe.optional(),
	size: C,
	rotation: a().optional(),
	margin: se.partial().optional(),
	padding: se.partial().optional(),
	align: b([
		"left",
		"center",
		"right",
		"justify"
	]).optional(),
	zIndex: a().int().optional(),
	anchor: le.optional(),
	overflow: ue.optional()
}), w = ee([a().int(), b(["normal", "bold"])]), T = x({
	fontFamily: s(),
	fontSize: a().positive(),
	fontWeight: w.optional(),
	fontStyle: b(["normal", "italic"]).optional(),
	color: s().optional(),
	letterSpacing: a().optional(),
	lineHeight: a().optional(),
	paragraphSpacing: a().optional(),
	justify: b([
		"left",
		"right",
		"center",
		"justify"
	]).optional(),
	indent: a().optional()
}), fe = b([
	"bold",
	"italic",
	"underline",
	"strikethrough",
	"code"
]), pe = x({
	text: s(),
	marks: l(fe).optional(),
	color: s().optional(),
	href: s().optional()
}), me = b([
	"none",
	"ordered",
	"unordered"
]), he = l(x({
	kind: u("paragraph"),
	runs: l(pe),
	listType: me.optional(),
	indent: a().int().optional()
})), ge = s().refine((e) => e === "" ? !0 : e.includes("\\") || e.startsWith("/") || /^[a-z][a-z\d+.-]*:/i.test(e) ? !1 : e.split("/").every((e) => e.length > 0 && e !== "." && e !== ".."), "Asset reference must be a normalized relative project path"), _e = d(() => ee([
	s(),
	a().finite(),
	g(),
	c(),
	l(_e),
	te(s(), _e)
])), ve = x({
	opacity: a().min(0).max(1).optional(),
	backgroundColor: s().optional(),
	borderRadius: a().min(0).finite().optional(),
	border: x({
		width: a().min(0).finite(),
		color: s(),
		style: b([
			"solid",
			"dashed",
			"dotted"
		]).optional()
	}).optional()
}).catchall(_e), ye = x({
	id: s().min(1),
	type: s(),
	name: s().optional(),
	layout: de,
	style: ve.optional(),
	metadata: te(s(), _e).optional()
}), be = x({
	x: a().finite().min(0),
	y: a().finite().min(0)
}), xe = x({
	side: b(["left", "right"]),
	top: a().finite().min(0),
	width: a().finite().min(0),
	height: a().finite().min(0),
	clearance: a().finite().min(0).max(200).optional(),
	contour: l(be).min(3)
}), Se = m("state", [x({ state: u("pending") }), x({
	state: u("complete"),
	sceneSignature: s().min(1),
	sampleCount: a().int().min(1).max(96),
	collisionArea: a().finite().min(0)
})]), Ce = x({
	enabled: g(),
	strategy: b([
		"maximum-container",
		"maximum-rotation-envelope",
		"iterative-collision"
	]),
	spacers: l(xe).max(2),
	baked: Se.optional()
}), we = x({
	enabled: g(),
	targetNodeIds: l(s()),
	side: b([
		"auto",
		"left",
		"right"
	]),
	margin: a().min(0).max(200),
	mode: b(["container", "silhouette"]).optional(),
	alphaThreshold: a().min(0).max(1).optional(),
	updateFps: a().int().min(1).max(30).optional(),
	static: Ce.optional()
}), E = ye.extend({
	type: u("text"),
	content: he,
	typography: T,
	runtimeWrap: we.optional()
}), Te = b([
	"cover",
	"contain",
	"fill",
	"none"
]), Ee = x({
	x: a().min(0).max(1),
	y: a().min(0).max(1),
	width: a().positive().max(1),
	height: a().positive().max(1)
}).superRefine((e, t) => {
	e.x + e.width > 1 && t.addIssue({
		code: "custom",
		path: ["width"],
		message: "Crop must stay within source width"
	}), e.y + e.height > 1 && t.addIssue({
		code: "custom",
		path: ["height"],
		message: "Crop must stay within source height"
	});
}), De = x({
	items: l(x({
		src: ge,
		alt: s().optional()
	})).min(2),
	mode: b(["carousel", "gallery"]),
	autoplay: g(),
	interval: a().min(1).max(60),
	loop: g(),
	showArrows: g(),
	showIndicators: g(),
	transition: b([
		"none",
		"fade",
		"slide"
	]).default("fade"),
	transitionDuration: a().min(.1).max(5).default(.45),
	columns: a().int().min(1).max(12),
	gap: a().min(0).max(100),
	fullscreenView: g().default(!1),
	autoAdjust: g().default(!1)
}).optional(), Oe = ye.extend({
	type: u("image"),
	src: ge,
	alt: s().optional(),
	fit: Te,
	crop: Ee.optional(),
	gallery: De
}), ke = ye.extend({
	type: u("video"),
	src: ge,
	poster: ge.optional(),
	controls: g(),
	loop: g(),
	autoplay: g(),
	muted: g(),
	lightbox: x({
		enabled: g(),
		hoverLabel: s()
	}).optional()
}), Ae = b([
	"studio",
	"soft",
	"dramatic",
	"neutral",
	"outdoor"
]), je = b([
	"none",
	"studio",
	"sunset",
	"dawn",
	"night",
	"warehouse",
	"forest",
	"apartment",
	"city",
	"park",
	"lobby"
]), Me = b([
	"none",
	"soft",
	"hard"
]), Ne = x({
	autoRotate: g(),
	pauseOnHover: g(),
	resumeOnLeave: g(),
	rotationOffset: x({
		enabled: g(),
		x: a().min(-360).max(360),
		y: a().min(-360).max(360),
		z: a().min(-360).max(360)
	}).optional(),
	rotationSpeed: x({
		x: a().min(-360).max(360),
		y: a().min(-360).max(360),
		z: a().min(-360).max(360)
	}).optional()
}), Pe = x({ fov: a().min(10).max(120) }), Fe = x({
	enabled: g(),
	bands: a().int().min(2).max(8),
	strength: a().min(0).max(1),
	smoothness: a().min(0).max(.49),
	roughnessMultiplier: a().min(0).max(2),
	metalnessMultiplier: a().min(0).max(2),
	opacityMultiplier: a().min(0).max(1),
	normalScale: a().min(0).max(2),
	ao: x({
		enabled: g(),
		intensity: a().min(0).max(2)
	}).optional(),
	outline: x({
		enabled: g(),
		color: s(),
		thickness: a().min(0).max(.1),
		opacity: a().min(0).max(1)
	}).optional()
}), Ie = x({
	enabled: g(),
	baseColor: s(),
	roughness: a().min(0).max(1),
	metalness: a().min(0).max(1)
}), Le = x({
	enabled: g(),
	color: s(),
	thickness: a().min(.5).max(8)
}), Re = x({ enabled: g() }), ze = ye.extend({
	type: u("model3d"),
	src: ge,
	behaviors: Ne,
	camera: Pe.optional(),
	toon: Fe.optional(),
	materialOverride: Ie.optional(),
	wireframe: Le.optional(),
	textWrap: Re.default({ enabled: !0 }),
	lighting: Ae.optional(),
	lightingIntensity: a().min(0).max(5).optional(),
	environment: je.optional(),
	shadows: Me.optional(),
	backfaceCulling: g().optional(),
	transparentBackground: g().optional().transform(() => !0)
}), Be = x({
	in: a().min(0),
	out: a().min(0)
}), Ve = ye.extend({
	type: u("audio"),
	src: ge,
	loop: g(),
	volume: a().min(0).max(1),
	fade: Be.optional(),
	autoplay: g(),
	background: g().optional(),
	backgroundPlayback: x({
		startOnScroll: g(),
		stopAtDocumentEnd: g()
	}).optional()
}), He = ye.extend({
	type: u("spacer"),
	axis: b(["vertical", "horizontal"]).optional()
}), Ue = ye.extend({
	type: u("divider"),
	thickness: a().positive(),
	color: s(),
	lineStyle: b([
		"solid",
		"double",
		"dashed",
		"dotted",
		"zigzag"
	])
}), We = b([
	"none",
	"thin-all",
	"thick-all",
	"thick-outside-thin-inside"
]), Ge = ee([he, s().transform((e) => [{
	kind: "paragraph",
	runs: e ? [{ text: e }] : []
}])]), Ke = m("type", [
	E,
	Oe,
	ke,
	ze,
	Ve,
	He,
	Ue,
	ye.extend({
		type: u("table"),
		rows: l(l(Ge).min(1)).min(1),
		headerRow: g(),
		headerColumn: g(),
		borderTemplate: We,
		borderColor: s(),
		thinBorderWidth: a().min(.25).max(10),
		thickBorderWidth: a().min(1).max(20),
		cellPadding: a().min(0).max(100),
		cellGap: a().min(0).max(50),
		textColor: s(),
		backgroundColor: s(),
		headerBackgroundColor: s(),
		striped: g(),
		textAlign: b([
			"left",
			"center",
			"right"
		])
	}).superRefine((e, t) => {
		let n = e.rows[0]?.length ?? 0;
		e.rows.forEach((e, r) => {
			e.length !== n && t.addIssue({
				code: "custom",
				path: ["rows", r],
				message: "Every table row must have the same number of columns"
			});
		});
	}),
	ye.extend({
		type: u("container"),
		children: d(() => l(Ke))
	})
]), qe = x({
	family: s(),
	src: ge,
	weight: ee([a().int(), b(["normal", "bold"])]).optional(),
	style: b(["normal", "italic"]).optional()
}), Je = x({
	id: s().min(1),
	title: s().optional(),
	createdAt: s().optional(),
	updatedAt: s().optional(),
	author: s().optional()
}).catchall(_e), Ye = x({
	color: s().optional(),
	image: ge.optional()
}), Xe = b(["hidden", "visible"]), Ze = x({
	id: s().min(1),
	name: s().optional(),
	height: ee([a().positive(), u("auto")]).optional(),
	overflow: Xe.default("hidden"),
	background: Ye.optional(),
	nodes: l(Ke)
}), Qe = x({
	version: u(re),
	metadata: Je,
	presentation: v.default(h),
	fonts: l(qe).optional(),
	sections: l(Ze).min(1)
}).superRefine((e, t) => {
	let n = /* @__PURE__ */ new Set(), r = (e, r) => {
		n.has(e) && t.addIssue({
			code: "custom",
			path: r,
			message: `Duplicate id "${e}"`
		}), n.add(e);
	};
	r(e.metadata.id, ["metadata", "id"]), e.sections.forEach((e, t) => {
		r(e.id, [
			"sections",
			t,
			"id"
		]);
		let n = (e, t) => {
			e.forEach((e, i) => {
				let a = [...t, i];
				r(e.id, [...a, "id"]), e.type === "container" && n(e.children, [...a, "children"]);
			});
		};
		n(e.nodes, [
			"sections",
			t,
			"nodes"
		]);
	});
});
//#endregion
//#region src/specification/serialize.ts
function $e(e) {
	return Qe.parse(e);
}
//#endregion
//#region src/runtime/load.ts
async function et(e, t = {}) {
	if (e instanceof URL) return tt(e.toString(), t);
	if (typeof e == "string") {
		let n = e.trim();
		return n.startsWith("{") ? { document: $e(JSON.parse(n)) } : tt(e, t);
	}
	return { document: $e(e) };
}
async function tt(e, t) {
	let n = await (t.fetcher ?? fetch)(e, {
		signal: t.signal,
		credentials: "same-origin"
	});
	if (!n.ok) throw Error(`Unable to load AMP document (${n.status} ${n.statusText}).`);
	let r;
	try {
		r = await n.json();
	} catch {
		throw Error("The AMP document response is not valid JSON.");
	}
	let i = n.url || new URL(e, globalThis.location?.href ?? "http://amp.local/").toString();
	return {
		document: $e(r),
		inferredAssetBaseUrl: new URL(".", i).toString()
	};
}
function nt(e) {
	let t = new URL(e.toString(), globalThis.location?.href ?? "http://amp.local/");
	return (e) => e ? new URL(e, t).toString() : "";
}
//#endregion
//#region src/runtime/layout.ts
var rt = {
	"top-left": [0, 0],
	"top-center": [.5, 0],
	"top-right": [1, 0],
	"center-left": [0, .5],
	center: [.5, .5],
	"center-right": [1, .5],
	"bottom-left": [0, 1],
	"bottom-center": [.5, 1],
	"bottom-right": [1, 1]
};
function it(e, t) {
	let n = {
		boxSizing: "border-box",
		position: "relative"
	}, r = e.size.width, i = e.size.height;
	if (r !== "auto" && (n.width = r), i !== "auto" && (n.height = i), at(n, "margin", e.margin), at(n, "padding", e.padding), e.mode === "absolute") {
		n.position = "absolute";
		let [t, a] = rt[e.anchor ?? "top-left"];
		n.left = (e.position?.x ?? 0) - (r === "auto" ? 0 : r * t), n.top = (e.position?.y ?? 0) - (i === "auto" ? 0 : i * a);
	} else e.mode === "float-left" ? n.float = "left" : e.mode === "float-right" ? n.float = "right" : e.mode === "inline" ? n.display = "inline-block" : e.mode === "center" && (n.display = "block", n.marginLeft ??= "auto", n.marginRight ??= "auto");
	return e.align && (n.textAlign = e.align), e.rotation && (n.transform = `rotate(${e.rotation}deg)`, n.transformOrigin = "center center"), e.zIndex !== void 0 && (n.zIndex = e.zIndex), e.overflow && (n.overflow = e.overflow), t?.opacity !== void 0 && (n.opacity = t.opacity), t?.backgroundColor && (n.backgroundColor = t.backgroundColor), t?.borderRadius !== void 0 && (n.borderRadius = t.borderRadius), t?.border && (n.borderStyle = t.border.style ?? "solid", n.borderWidth = t.border.width, n.borderColor = t.border.color), n;
}
function at(e, t, n) {
	if (n) for (let r of [
		"top",
		"right",
		"bottom",
		"left"
	]) {
		let i = n[r];
		i !== void 0 && (e[`${t}${r[0].toUpperCase()}${r.slice(1)}`] = i);
	}
}
//#endregion
//#region src/runtime/nodes/RuntimeAudio.tsx
var D = t();
function ot({ node: e }) {
	let t = f(e.src), n = (0, S.useRef)(null), r = (0, S.useRef)(0), i = (0, S.useRef)(!1);
	if ((0, S.useEffect)(() => {
		n.current && (n.current.volume = e.volume);
	}, [e.volume]), (0, S.useEffect)(() => {
		if (!e.background) return;
		let t = r, a = e.backgroundPlayback ?? {
			startOnScroll: !0,
			stopAtDocumentEnd: !0
		}, o = (t) => {
			if (!a.startOnScroll || t.deltaY <= 0 || i.current) return;
			let o = n.current;
			!o || !o.paused || (o.volume = e.fade?.in ? 0 : e.volume, o.play().then(() => st(o, e.volume, e.fade?.in ?? 0, r)).catch(() => void 0));
		}, s = () => {
			if (!a.stopAtDocumentEnd || i.current) return;
			let t = n.current?.closest(".amp-runtime-root");
			if (!t || t.getBoundingClientRect().bottom > innerHeight + 2) return;
			let o = n.current;
			!o || o.paused || (i.current = !0, st(o, 0, e.fade?.out ?? 0, r, () => o.pause()));
		};
		return window.addEventListener("wheel", o, { passive: !0 }), window.addEventListener("scroll", s, { passive: !0 }), () => {
			window.removeEventListener("wheel", o), window.removeEventListener("scroll", s), cancelAnimationFrame(t.current);
		};
	}, [
		e.background,
		e.backgroundPlayback,
		e.fade,
		e.volume
	]), !t) return null;
	let a = () => {
		let t = n.current;
		if (!t || i.current) return;
		let r = e.fade?.in ?? 0, a = e.fade?.out ?? 0, o = r ? Math.min(1, t.currentTime / r) : 1, s = Number.isFinite(t.duration) ? t.duration - t.currentTime : Infinity, c = a ? Math.min(1, Math.max(0, s / a)) : 1;
		t.volume = e.volume * Math.min(o, c);
	};
	return /* @__PURE__ */ (0, D.jsx)("audio", {
		ref: n,
		src: t,
		controls: !e.background,
		loop: e.loop,
		autoPlay: !e.background && e.autoplay,
		preload: "metadata",
		onPlay: a,
		onTimeUpdate: a,
		style: {
			width: "100%",
			display: e.background ? "none" : "block"
		}
	});
}
function st(e, t, n, r, i) {
	if (cancelAnimationFrame(r.current), !n) {
		e.volume = t, i?.();
		return;
	}
	let a = e.volume, o = performance.now(), s = (c) => {
		let l = Math.min(1, (c - o) / (n * 1e3));
		e.volume = a + (t - a) * l, l < 1 ? r.current = requestAnimationFrame(s) : i?.();
	};
	r.current = requestAnimationFrame(s);
}
//#endregion
//#region src/runtime/nodes/RuntimeDivider.tsx
function ct({ node: e }) {
	if (e.lineStyle === "zigzag") {
		let t = Math.max(8, e.thickness * 4), n = t / 2 - e.thickness;
		return /* @__PURE__ */ (0, D.jsxs)("svg", {
			"aria-hidden": !0,
			width: "100%",
			height: t,
			preserveAspectRatio: "none",
			className: "amp-runtime-divider",
			children: [/* @__PURE__ */ (0, D.jsx)("defs", { children: /* @__PURE__ */ (0, D.jsx)("pattern", {
				id: `runtime-zigzag-${e.id}`,
				width: "20",
				height: t,
				patternUnits: "userSpaceOnUse",
				children: /* @__PURE__ */ (0, D.jsx)("path", {
					d: `M 0 ${t / 2} L 5 ${t / 2 - n} L 15 ${t / 2 + n} L 20 ${t / 2}`,
					fill: "none",
					stroke: e.color,
					strokeWidth: e.thickness,
					strokeLinejoin: "round"
				})
			}) }), /* @__PURE__ */ (0, D.jsx)("rect", {
				width: "100%",
				height: t,
				fill: `url(#runtime-zigzag-${e.id})`
			})]
		});
	}
	return /* @__PURE__ */ (0, D.jsx)("div", {
		className: "amp-runtime-divider",
		style: {
			width: "100%",
			height: 0,
			borderTop: `${e.thickness}px ${e.lineStyle} ${e.color}`
		}
	});
}
//#endregion
//#region src/runtime/nodes/RuntimeLightbox.tsx
var lt = ne();
function ut({ label: e, onClose: t }) {
	let { legacyMode: n } = o();
	return /* @__PURE__ */ (0, D.jsx)("button", {
		type: "button",
		className: `amp-runtime-close ${n.enabled ? "legacy" : ""}`,
		"aria-label": e,
		onClick: t,
		children: "×"
	});
}
//#endregion
//#region src/runtime/nodes/useRuntimeModalClose.ts
function dt(e) {
	(0, S.useEffect)(() => {
		let t = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		let n = (t) => {
			t.key === "Escape" && e();
		};
		return window.addEventListener("keydown", n), () => {
			document.body.style.overflow = t, window.removeEventListener("keydown", n);
		};
	}, [e]);
}
//#endregion
//#region src/runtime/nodes/RuntimeImage.tsx
function ft({ node: e }) {
	let t = f(e.src);
	if (e.gallery) return e.gallery.mode === "gallery" ? /* @__PURE__ */ (0, D.jsx)(pt, {
		node: e,
		gallery: e.gallery
	}) : /* @__PURE__ */ (0, D.jsx)(gt, {
		node: e,
		gallery: e.gallery
	});
	if (!t) return null;
	if (e.crop) {
		let { x: n, y: r, width: i, height: a } = e.crop;
		return /* @__PURE__ */ (0, D.jsx)("div", {
			role: "img",
			"aria-label": e.alt,
			className: "amp-runtime-image",
			style: {
				backgroundImage: `url(${JSON.stringify(t)})`,
				backgroundSize: `${100 / i}% ${100 / a}%`,
				backgroundPosition: `${i < 1 ? n / (1 - i) * 100 : 0}% ${a < 1 ? r / (1 - a) * 100 : 0}%`
			}
		});
	}
	return /* @__PURE__ */ (0, D.jsx)("img", {
		src: t,
		alt: e.alt ?? "",
		loading: "lazy",
		decoding: "async",
		draggable: !1,
		className: "amp-runtime-image",
		style: { objectFit: e.fit }
	});
}
function pt({ node: e, gallery: t }) {
	let [n, r] = (0, S.useState)(), i = t.autoAdjust ? {
		columnCount: t.columns,
		columnGap: t.gap
	} : {
		display: "grid",
		gridTemplateColumns: `repeat(${t.columns}, minmax(0, 1fr))`,
		gap: t.gap
	};
	return /* @__PURE__ */ (0, D.jsxs)(D.Fragment, { children: [/* @__PURE__ */ (0, D.jsx)("div", {
		className: t.autoAdjust ? "amp-runtime-gallery amp-runtime-gallery-masonry" : "amp-runtime-gallery",
		style: i,
		children: t.items.map((n, i) => /* @__PURE__ */ (0, D.jsx)(mt, {
			item: n,
			index: i,
			fit: e.fit,
			natural: t.autoAdjust,
			fullscreen: t.fullscreenView,
			gap: t.gap,
			onOpen: r
		}, `${n.src}-${i}`))
	}), n && (0, lt.createPortal)(/* @__PURE__ */ (0, D.jsx)(ht, {
		item: n,
		onClose: () => r(void 0)
	}), document.body)] });
}
function mt({ item: e, index: t, fit: n, natural: r, fullscreen: i, gap: a, onOpen: o }) {
	let s = f(e.src), c = s ? /* @__PURE__ */ (0, D.jsx)("img", {
		src: s,
		alt: e.alt ?? "",
		loading: "lazy",
		decoding: "async",
		draggable: !1,
		style: {
			width: "100%",
			height: r ? "auto" : "100%",
			objectFit: n,
			display: "block"
		}
	}) : null, l = {
		minWidth: 0,
		minHeight: 0,
		padding: 0,
		border: 0,
		display: "block",
		breakInside: "avoid",
		marginBottom: r ? a : void 0,
		background: "transparent",
		cursor: i ? "zoom-in" : void 0
	};
	return i ? /* @__PURE__ */ (0, D.jsx)("button", {
		type: "button",
		"aria-label": `View ${e.alt || `image ${t + 1}`} fullscreen`,
		onClick: () => o(e),
		style: l,
		children: c
	}) : /* @__PURE__ */ (0, D.jsx)("div", {
		style: l,
		children: c
	});
}
function ht({ item: e, onClose: t }) {
	let n = f(e.src);
	return dt(t), /* @__PURE__ */ (0, D.jsxs)("div", {
		className: "amp-runtime-lightbox",
		role: "dialog",
		"aria-label": "Gallery fullscreen viewer",
		"aria-modal": "true",
		onContextMenu: (e) => e.preventDefault(),
		onDragStart: (e) => e.preventDefault(),
		onPointerDown: (e) => {
			e.target === e.currentTarget && t();
		},
		children: [n && /* @__PURE__ */ (0, D.jsx)("img", {
			src: n,
			alt: e.alt ?? "",
			draggable: !1
		}), /* @__PURE__ */ (0, D.jsx)(ut, {
			label: "Close image",
			onClose: t
		})]
	});
}
function gt({ node: e, gallery: t }) {
	let [n, r] = (0, S.useState)(0), [i, a] = (0, S.useState)(), o = Math.min(n, t.items.length - 1), s = i?.to ?? o, c = (e, n) => {
		i || e === o || (t.transition === "none" ? r(e) : a({
			from: o,
			to: e,
			direction: n,
			running: !1
		}));
	};
	return (0, S.useLayoutEffect)(() => {
		if (!i || i.running) return;
		let e = 0, t = requestAnimationFrame(() => {
			e = requestAnimationFrame(() => a((e) => e === i ? {
				...e,
				running: !0
			} : e));
		});
		return () => {
			cancelAnimationFrame(t), cancelAnimationFrame(e);
		};
	}, [i]), (0, S.useEffect)(() => {
		if (!t.autoplay || i) return;
		let e = window.setTimeout(() => {
			let e = xt(o, 1, t.items.length, t.loop);
			e !== o && (t.transition === "none" ? r(e) : a({
				from: o,
				to: e,
				direction: 1,
				running: !1
			}));
		}, t.interval * 1e3);
		return () => clearTimeout(e);
	}, [
		o,
		t,
		i
	]), /* @__PURE__ */ (0, D.jsxs)("div", {
		className: "amp-runtime-carousel",
		children: [
			t.items.map((e, t) => /* @__PURE__ */ (0, D.jsx)(yt, { src: e.src }, `${e.src}-${t}`)),
			i ? /* @__PURE__ */ (0, D.jsxs)(D.Fragment, { children: [/* @__PURE__ */ (0, D.jsx)(_t, {
				item: t.items[i.from],
				fit: e.fit,
				gallery: t,
				direction: i.direction,
				incoming: !1,
				running: i.running
			}), /* @__PURE__ */ (0, D.jsx)(_t, {
				item: t.items[i.to],
				fit: e.fit,
				gallery: t,
				direction: i.direction,
				incoming: !0,
				running: i.running,
				onTransitionEnd: (e) => {
					e.target !== e.currentTarget || !i?.running || e.propertyName === (t.transition === "fade" ? "opacity" : "transform") && (r(i.to), a(void 0));
				}
			})] }) : /* @__PURE__ */ (0, D.jsx)(vt, {
				item: t.items[o],
				fit: e.fit
			}),
			t.showArrows && /* @__PURE__ */ (0, D.jsxs)(D.Fragment, { children: [/* @__PURE__ */ (0, D.jsx)(bt, {
				label: "Previous image",
				side: "left",
				disabled: !!i,
				onClick: () => c(xt(s, -1, t.items.length, t.loop), -1),
				children: "‹"
			}), /* @__PURE__ */ (0, D.jsx)(bt, {
				label: "Next image",
				side: "right",
				disabled: !!i,
				onClick: () => c(xt(s, 1, t.items.length, t.loop), 1),
				children: "›"
			})] }),
			t.showIndicators && /* @__PURE__ */ (0, D.jsx)("div", {
				className: "amp-runtime-carousel-indicators",
				children: t.items.map((e, t) => /* @__PURE__ */ (0, D.jsx)("button", {
					"aria-label": `Show image ${t + 1}`,
					onClick: () => c(t, t < s ? -1 : 1),
					className: t === s ? "active" : ""
				}, t))
			})
		]
	});
}
function _t({ item: e, fit: t, gallery: n, direction: r, incoming: i, running: a, onTransitionEnd: o }) {
	let s = n.transition === "fade", c = s ? 0 : a ? i ? 0 : -r * 100 : i ? r * 100 : 0;
	return /* @__PURE__ */ (0, D.jsx)("div", {
		className: "amp-runtime-carousel-layer",
		"aria-hidden": !i || void 0,
		onTransitionEnd: o,
		style: {
			opacity: s ? i ? +!!a : +!a : 1,
			transform: `translate3d(${c}%,0,0)`,
			transition: a ? `opacity ${n.transitionDuration}s cubic-bezier(.22,.61,.36,1),transform ${n.transitionDuration}s cubic-bezier(.22,.61,.36,1)` : "none"
		},
		children: /* @__PURE__ */ (0, D.jsx)(vt, {
			item: e,
			fit: t
		})
	});
}
function vt({ item: e, fit: t }) {
	let n = f(e.src);
	return n ? /* @__PURE__ */ (0, D.jsx)("img", {
		src: n,
		alt: e.alt ?? "",
		draggable: !1,
		decoding: "async",
		style: { objectFit: t }
	}) : null;
}
function yt({ src: e }) {
	let t = f(e);
	return t ? /* @__PURE__ */ (0, D.jsx)("link", {
		rel: "preload",
		as: "image",
		href: t
	}) : null;
}
function bt({ label: e, side: t, disabled: n, onClick: r, children: i }) {
	return /* @__PURE__ */ (0, D.jsx)("button", {
		type: "button",
		"aria-label": e,
		disabled: n,
		onClick: r,
		className: `amp-runtime-carousel-arrow ${t}`,
		children: i
	});
}
function xt(e, t, n, r) {
	return r ? (e + t + n) % n : Math.max(0, Math.min(n - 1, e + t));
}
//#endregion
//#region src/runtime/model3d/model-load-queue.ts
var St = 2, Ct = 0, wt = [];
function Tt(e, t) {
	let n = {
		key: e,
		start: t
	};
	return Ct < St ? Dt(n) : wt.push(n), () => {
		let e = wt.indexOf(n);
		e >= 0 && wt.splice(e, 1);
	};
}
function Et() {
	for (; Ct < St && wt.length;) {
		let e = wt.shift();
		e && Dt(e);
	}
}
function Dt(e) {
	Ct += 1;
	let t = !1, n = () => {
		t || (t = !0, Ct = Math.max(0, Ct - 1), Et());
	};
	try {
		e.start(n);
	} catch (e) {
		throw n(), e;
	}
}
//#endregion
//#region src/rendering/model-visibility.ts
function Ot(e) {
	return e !== "visible";
}
function kt(e, t, n) {
	let r = t.left, i = t.top, a = t.right, o = t.bottom;
	for (let e of n) r = Math.max(r, e.left), i = Math.max(i, e.top), a = Math.min(a, e.right), o = Math.min(o, e.bottom);
	return a > r && o > i && e.right > r && e.left < a && e.bottom > i && e.top < o;
}
//#endregion
//#region src/rendering/use-model-silhouette-hover.ts
var At = {
	author: ".amp-canvas-viewport",
	runtime: ".amp-runtime-root"
}, jt = /* @__PURE__ */ new WeakMap();
function Mt(e, t, n, r, i) {
	let [a, o] = (0, S.useState)(!1), s = (0, S.useRef)(!1);
	return (0, S.useEffect)(() => {
		let a = e.current?.closest(At[i]);
		if (!a || !n || !r) {
			s.current = !1;
			return;
		}
		let c = (e) => {
			s.current !== e && (s.current = e, o(e));
		}, l = (e) => {
			if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") {
				c(!1);
				return;
			}
			let n = t.current;
			if (!n?.width || !n.height) {
				c(!1);
				return;
			}
			let r = n.getBoundingClientRect();
			if (r.width <= 0 || r.height <= 0 || e.clientX < r.left || e.clientX >= r.right || e.clientY < r.top || e.clientY >= r.bottom) {
				c(!1);
				return;
			}
			let i = Math.min(n.width - 1, Math.max(0, Math.floor((e.clientX - r.left) / r.width * n.width))), a = Math.min(n.height - 1, Math.max(0, Math.floor((e.clientY - r.top) / r.height * n.height)));
			try {
				let e = jt.get(n);
				if (!e) {
					let t = n.getContext("2d", { willReadFrequently: !0 });
					if (!t) {
						c(!1);
						return;
					}
					e = t, jt.set(n, e);
				}
				c(e.getImageData(i, a, 1, 1).data[3] > 8);
			} catch {
				c(!1);
			}
		}, u = () => c(!1);
		return a.addEventListener("pointermove", l, { passive: !0 }), a.addEventListener("pointerleave", u, { passive: !0 }), () => {
			a.removeEventListener("pointermove", l), a.removeEventListener("pointerleave", u), s.current = !1, o(!1);
		};
	}, [
		t,
		n,
		i,
		e,
		r
	]), n && r && a;
}
//#endregion
//#region src/runtime/model3d/RuntimeModel3D.tsx
var Nt = (0, S.lazy)(() => import("./RuntimeModel3DView-VugnG_gs.js"));
function Pt({ node: e }) {
	let t = (0, S.useRef)(null), n = (0, S.useRef)(null), r = f(e.src), { visible: i, activated: a, resident: o } = It(t), s = Mt(t, n, e.behaviors.pauseOnHover, i, "runtime"), [c, l] = (0, S.useState)({
		key: r,
		ready: !1,
		error: ""
	}), u = c.key === r ? c : {
		key: r,
		ready: !1,
		error: ""
	}, d = (0, S.useCallback)(() => l({
		key: r,
		ready: !0,
		error: ""
	}), [r]), p = (0, S.useCallback)((e) => l({
		key: r,
		ready: !1,
		error: e
	}), [r]), m = i && e.behaviors.autoRotate && !(s && e.behaviors.pauseOnHover);
	return (0, S.useEffect)(() => (y(e.id, m), () => y(e.id, !1)), [e.id, m]), /* @__PURE__ */ (0, D.jsxs)("div", {
		ref: t,
		className: "amp-runtime-model",
		"data-amp-model-hovered": s || void 0,
		"data-amp-model-visible": String(i),
		"data-amp-model-resident": String(o),
		children: [
			/* @__PURE__ */ (0, D.jsx)("canvas", {
				ref: n,
				className: "amp-runtime-model-bitmap",
				"aria-label": e.name,
				role: "img",
				style: { visibility: i ? "visible" : "hidden" }
			}),
			!u.ready && /* @__PURE__ */ (0, D.jsx)("div", {
				className: "amp-runtime-asset-placeholder",
				children: u.error ? `3D model unavailable: ${u.error}` : a ? "Loading 3D model…" : "3D model loads near viewport"
			}),
			o && r && /* @__PURE__ */ (0, D.jsx)(Ft, {
				node: e,
				src: r,
				visible: i,
				hovered: s,
				presentationRef: n,
				onReady: d,
				onError: p
			}, r)
		]
	});
}
function Ft(e) {
	let { node: t, src: n, onReady: r, onError: i } = e, [a, o] = (0, S.useState)(!1), s = (0, S.useRef)(null);
	(0, S.useEffect)(() => {
		let e = Tt(`${t.id}:${n}`, (e) => {
			s.current = e, o(!0);
		});
		return () => {
			e(), s.current?.(), s.current = null;
		};
	}, [t.id, n]);
	let c = (0, S.useCallback)(() => {
		s.current?.(), s.current = null;
	}, []), l = (0, S.useCallback)(() => {
		r();
	}, [r]), u = (0, S.useCallback)((e) => {
		s.current?.(), s.current = null, i(e);
	}, [i]);
	return a ? /* @__PURE__ */ (0, D.jsx)(Lt, {
		resetKey: e.src,
		onError: u,
		children: /* @__PURE__ */ (0, D.jsx)(S.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, D.jsx)(Nt, {
				...e,
				onLoaded: c,
				onReady: l,
				onError: u
			})
		})
	}) : null;
}
function It(e) {
	let t = typeof IntersectionObserver > "u", [n, r] = (0, S.useState)(t), [i, a] = (0, S.useState)(t), [o, s] = (0, S.useState)(t);
	return (0, S.useEffect)(() => {
		let t = e.current;
		if (!t || typeof IntersectionObserver > "u") return;
		let n = t.closest(".amp-runtime-root"), i = t.closest(".amp-runtime-section"), o = 0, c = 0, l = 0, u = () => {
			let e = [n, Ot(i?.dataset.ampSectionOverflow) ? i : null].filter((e) => !!e).map((e) => e.getBoundingClientRect()), a = kt(t.getBoundingClientRect(), {
				left: 0,
				top: 0,
				right: window.innerWidth,
				bottom: window.innerHeight
			}, e);
			r(a);
		}, d = () => {
			c = 0, u(), --l, l > 0 && (c = requestAnimationFrame(d));
		}, f = () => {
			l = 3, c ||= requestAnimationFrame(d);
		}, p = new IntersectionObserver(([e]) => {
			e?.isIntersecting ? (o && clearTimeout(o), a(!0), s(!0)) : o = window.setTimeout(() => s(!1), 3e4), f();
		}, { rootMargin: "100% 0px" }), m = new IntersectionObserver(f);
		p.observe(t), m.observe(t);
		let h = typeof ResizeObserver > "u" ? null : new ResizeObserver(f);
		h?.observe(t), n && h?.observe(n), i && h?.observe(i);
		let g = typeof MutationObserver > "u" || !i ? null : new MutationObserver(f);
		return i && g?.observe(i, {
			attributes: !0,
			attributeFilter: ["data-amp-section-overflow"]
		}), window.addEventListener("resize", f), window.addEventListener("scroll", f, !0), window.addEventListener("wheel", f, { passive: !0 }), window.addEventListener("touchmove", f, { passive: !0 }), u(), () => {
			p.disconnect(), m.disconnect(), h?.disconnect(), g?.disconnect(), window.removeEventListener("resize", f), window.removeEventListener("scroll", f, !0), window.removeEventListener("wheel", f), window.removeEventListener("touchmove", f), c && cancelAnimationFrame(c), o && clearTimeout(o);
		};
	}, [e]), {
		visible: n,
		activated: i,
		resident: o
	};
}
var Lt = class extends S.Component {
	state = { failed: !1 };
	static getDerivedStateFromError() {
		return { failed: !0 };
	}
	componentDidCatch(e) {
		this.props.onError(e instanceof Error ? e.message : String(e));
	}
	componentDidUpdate(e) {
		e.resetKey !== this.props.resetKey && this.state.failed && this.setState({ failed: !1 });
	}
	render() {
		return this.state.failed ? null : this.props.children;
	}
};
//#endregion
//#region src/author/canvas/runtime-text-wrap.ts
function Rt(e, t, n) {
	let r = {
		left: [],
		right: []
	};
	for (let i of t) {
		let t = i.rect;
		t.right <= e.left || t.left >= e.right || t.bottom <= e.top || t.top >= e.bottom || r[n.side === "auto" ? (t.left + t.right) / 2 <= (e.left + e.right) / 2 ? "left" : "right" : n.side].push(i);
	}
	return ["left", "right"].flatMap((t) => {
		let i = r[t];
		if (!i.length) return [];
		let a = Math.max(e.top, Math.min(...i.map((e) => e.rect.top))), o = Math.min(e.bottom, Math.max(...i.map((e) => e.rect.bottom)));
		if (o <= a) return [];
		let s = Math.max(2, Math.min(128, Math.ceil((o - a) / Math.max(n.scale, .01)))), c = [];
		for (let r = 0; r <= s; r += 1) {
			let l = a + (o - a) * r / s, u = i.map((e) => Vt(e, l, n.alphaThreshold, t)).filter((e) => e !== null);
			c.push(u.length ? t === "left" ? Math.max(...u) : Math.min(...u) : t === "left" ? e.left : e.right);
		}
		let l = t === "left" ? Math.max(0, Math.min(e.right, Math.max(...c)) - e.left) : Math.max(0, e.right - Math.max(e.left, Math.min(...c)));
		if (l <= 0) return [];
		let u = Math.max(n.scale, .01), d = l / u, f = (o - a) / u, p = c.map((n, r) => {
			let i = f * r / s;
			return {
				x: Wt(t === "left" ? Math.max(0, Math.min(d, (n - e.left) / u)) : Math.max(0, Math.min(d, (n - (e.right - l)) / u))),
				y: Wt(i)
			};
		}), m = t === "left" ? [
			{
				x: 0,
				y: 0
			},
			...p,
			{
				x: 0,
				y: Wt(f)
			}
		] : [
			{
				x: Wt(d),
				y: 0
			},
			...p,
			{
				x: Wt(d),
				y: Wt(f)
			}
		];
		return [{
			id: `model-silhouette-${t}`,
			side: t,
			top: Math.max(0, a - e.top) / u,
			width: d,
			height: f,
			margin: n.margin,
			shapeOutside: Bt(m),
			contour: m
		}];
	});
}
function zt(e, t) {
	return e.map((e) => ({
		id: `model-static-${e.side}`,
		side: e.side,
		top: e.top,
		width: e.width,
		height: e.height,
		margin: e.clearance ?? t,
		contour: e.contour,
		shapeOutside: Bt(e.contour)
	}));
}
function Bt(e) {
	return `polygon(${e.map((e) => `${Wt(e.x)}px ${Wt(e.y)}px`).join(", ")})`;
}
function Vt(e, t, n, r) {
	let { rect: i } = e;
	if (t < i.top || t > i.bottom || i.width <= 0 || i.height <= 0) return null;
	if (!e.alpha || e.alphaWidth <= 0 || e.alphaHeight <= 0) return r === "left" ? i.right : i.left;
	if (e.projection && Math.abs(e.projection.rotation) > 1e-5) return Ht(e, t, n, r);
	let a = Math.max(0, Math.min(e.alphaHeight - 1, Math.floor((t - i.top) / i.height * e.alphaHeight))), o = Math.round(Math.max(0, Math.min(1, n)) * 255);
	if (r === "left") {
		for (let t = e.alphaWidth - 1; t >= 0; --t) if (e.alpha[a * e.alphaWidth + t] > o) return i.left + (t + 1) / e.alphaWidth * i.width;
	} else for (let t = 0; t < e.alphaWidth; t += 1) if (e.alpha[a * e.alphaWidth + t] > o) return i.left + t / e.alphaWidth * i.width;
	return null;
}
function Ht(e, t, n, r) {
	let i = e.projection, { rect: a } = e, o = Math.round(Math.max(0, Math.min(1, n)) * 255), s = Math.max(8, Math.min(192, Math.ceil(Math.max(e.alphaWidth, a.width)))), c = a.width / s;
	for (let n = 0; n < s; n += 1) {
		let s = r === "left" ? a.right - (n + .5) * c : a.left + (n + .5) * c;
		if (Ut(e, i, s, t) > o) return r === "left" ? Math.min(a.right, s + c / 2) : Math.max(a.left, s - c / 2);
	}
	return null;
}
function Ut(e, t, n, r) {
	let i = n - t.centerX, a = r - t.centerY, o = Math.cos(t.rotation), s = Math.sin(t.rotation), c = o * i + s * a, l = -s * i + o * a, u = c / t.width + .5, d = l / t.height + .5;
	if (u < 0 || u >= 1 || d < 0 || d >= 1) return 0;
	let f = Math.min(e.alphaWidth - 1, Math.floor(u * e.alphaWidth)), p = Math.min(e.alphaHeight - 1, Math.floor(d * e.alphaHeight));
	return e.alpha[p * e.alphaWidth + f] ?? 0;
}
function Wt(e) {
	return Math.round(e * 100) / 100;
}
//#endregion
//#region src/rendering/use-live-model-text-wrap.ts
var Gt = {
	author: {
		root: ".amp-canvas-viewport",
		section: ".amp-section",
		model: ".amp-node-model3d"
	},
	runtime: {
		root: ".amp-runtime-root",
		section: ".amp-runtime-section",
		model: ".amp-runtime-node-model3d"
	}
}, Kt = /* @__PURE__ */ new WeakMap(), qt = /* @__PURE__ */ new WeakMap(), Jt = /* @__PURE__ */ new WeakMap();
function Yt(e, t, n) {
	let [r, i] = (0, S.useState)([]), a = t.runtimeWrap, o = a?.static?.enabled ?? !1, s = n === "runtime" && o, c = n === "author" && o, l = a?.static?.baked?.state !== "pending", u = (0, S.useMemo)(() => zt(a?.static?.spacers ?? [], a?.margin ?? 0), [a?.margin, a?.static?.spacers]);
	return (0, S.useLayoutEffect)(() => {
		let t = e.current;
		if (!t || !a?.enabled || s || c) {
			i((e) => e.length ? [] : e);
			return;
		}
		let r = Gt[n], o = t.closest(r.root) ?? document, l = t.closest(r.section) ?? o, u = a.targetNodeIds ?? [], d = () => u.length ? u.map((e) => o.querySelector(`[data-node-id="${en(e)}"]`)).filter((e) => !!e && e?.dataset.ampTextWrap === "true") : Array.from(l.querySelectorAll(`${r.model}[data-amp-text-wrap="true"]`)), f = d(), p = 0, m = !1, h = /* @__PURE__ */ new WeakMap(), g = () => {
			p = 0;
			let e = t.getBoundingClientRect(), n = t.offsetWidth > 0 ? e.width / t.offsetWidth : 1;
			if (!Number.isFinite(n) || n <= 0) return;
			let r = (a.mode ?? "silhouette") === "silhouette", o = Rt(e, f.map((e, t) => {
				let i = e.querySelector("canvas"), a = e.getBoundingClientRect(), o = tn(e, a, n), s = r && i ? Xt(i) : null;
				return {
					id: e.dataset.nodeId ?? String(t),
					rect: a,
					alpha: s?.alpha ?? null,
					alphaWidth: s?.width ?? 0,
					alphaHeight: s?.height ?? 0,
					projection: s ? o : void 0
				};
			}), {
				side: a.side,
				margin: a.margin,
				alphaThreshold: a.alphaThreshold ?? .05,
				scale: n
			});
			i((e) => $t(e, o) ? e : o);
		}, _ = () => {
			m || (p ||= requestAnimationFrame(g));
		}, v = typeof ResizeObserver > "u" ? null : new ResizeObserver(_);
		v?.observe(t), f.forEach((e) => v?.observe(e));
		let y = () => {
			let e = d(), t = new Set(e);
			f.forEach((e) => {
				t.has(e) || v?.unobserve(e);
			}), e.forEach((e) => {
				f.includes(e) || v?.observe(e);
			}), f = e, _();
		}, b = (e) => {
			let t = e.target;
			if (!(t instanceof HTMLCanvasElement)) return;
			let n = t.closest(r.model);
			if (!n || !f.includes(n) || (a.mode ?? "silhouette") !== "silhouette") return;
			let i = performance.now(), o = 1e3 / Math.max(1, a.updateFps ?? 12);
			i - (Jt.get(t) ?? -Infinity) >= o && (Jt.set(t, i), Zt(t)), !(i - (h.get(t) ?? -Infinity) < o) && (h.set(t, i), _());
		}, x = typeof MutationObserver > "u" ? null : new MutationObserver(y);
		return o instanceof Node && x?.observe(o, {
			childList: !0,
			subtree: !0
		}), o.addEventListener("amp-model-frame", b), window.addEventListener("resize", _), window.addEventListener("scroll", _, !0), window.addEventListener("pageshow", _), document.addEventListener("visibilitychange", _), document.fonts?.ready.then(_), g(), () => {
			m = !0, v?.disconnect(), x?.disconnect(), o.removeEventListener("amp-model-frame", b), window.removeEventListener("resize", _), window.removeEventListener("scroll", _, !0), window.removeEventListener("pageshow", _), document.removeEventListener("visibilitychange", _), p && cancelAnimationFrame(p);
		};
	}, [
		e,
		a,
		c,
		s,
		n
	]), !a?.enabled || c ? [] : s ? l ? u : [] : r;
}
function Xt(e) {
	return qt.get(e) ?? Zt(e);
}
function Zt(e) {
	let t = Qt(e);
	return t?.alpha.some((e) => e > 0) ? (qt.set(e, t), t) : qt.get(e) ?? null;
}
function Qt(e) {
	if (!e.width || !e.height) return null;
	let t = Kt.get(e);
	t || (t = document.createElement("canvas"), Kt.set(e, t));
	let n = Math.min(1, 128 / Math.max(e.width, e.height)), r = Math.max(1, Math.round(e.width * n)), i = Math.max(1, Math.round(e.height * n));
	t.width !== r && (t.width = r), t.height !== i && (t.height = i);
	let a = t.getContext("2d", { willReadFrequently: !0 });
	if (!a) return null;
	try {
		a.clearRect(0, 0, r, i), a.drawImage(e, 0, 0, r, i);
		let t = a.getImageData(0, 0, r, i).data, n = new Uint8ClampedArray(r * i);
		for (let e = 0; e < n.length; e += 1) n[e] = t[e * 4 + 3];
		return {
			alpha: n,
			width: r,
			height: i
		};
	} catch {
		return null;
	}
}
function $t(e, t) {
	return e.length === t.length && e.every((e, n) => {
		let r = t[n];
		return !!r && e.id === r.id && e.side === r.side && e.top === r.top && e.width === r.width && e.height === r.height && e.margin === r.margin && e.shapeOutside === r.shapeOutside;
	});
}
function en(e) {
	return typeof CSS < "u" && CSS.escape ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function tn(e, t, n) {
	let r = e.style.transform.match(/rotate\(\s*(-?(?:\d+\.?\d*|\.\d+))deg\s*\)/i), i = r ? Number(r[1]) * Math.PI / 180 : 0;
	return {
		centerX: (t.left + t.right) / 2,
		centerY: (t.top + t.bottom) / 2,
		width: Math.max(1, e.offsetWidth * n),
		height: Math.max(1, e.offsetHeight * n),
		rotation: Number.isFinite(i) ? i : 0
	};
}
//#endregion
//#region src/runtime/nodes/RuntimeText.tsx
function nn({ node: e }) {
	let t = (0, S.useRef)(null), n = Yt(t, e, "runtime"), r = e.typography;
	return /* @__PURE__ */ (0, D.jsxs)("div", {
		ref: t,
		className: "amp-runtime-text",
		style: {
			fontFamily: r.fontFamily,
			fontSize: r.fontSize,
			fontWeight: r.fontWeight,
			fontStyle: r.fontStyle,
			color: r.color,
			letterSpacing: r.letterSpacing,
			lineHeight: r.lineHeight,
			textAlign: r.justify,
			textIndent: r.indent,
			display: "flow-root"
		},
		children: [n.map((e) => /* @__PURE__ */ (0, D.jsx)("span", {
			"aria-hidden": !0,
			style: {
				display: "block",
				float: e.side,
				width: e.width,
				height: e.height,
				marginTop: e.top,
				shapeOutside: e.shapeOutside,
				shapeMargin: `${e.margin}px`,
				pointerEvents: "none"
			}
		}, e.id)), /* @__PURE__ */ (0, D.jsx)(rn, {
			content: e.content,
			paragraphSpacing: r.paragraphSpacing
		})]
	});
}
function rn({ content: e, paragraphSpacing: t }) {
	let n = [];
	for (let r = 0; r < e.length;) {
		let i = e[r];
		if (!i.listType || i.listType === "none") {
			n.push(/* @__PURE__ */ (0, D.jsx)("p", {
				style: {
					margin: 0,
					marginBottom: t,
					marginLeft: i.indent ? i.indent * 24 : void 0
				},
				children: i.runs.map(an)
			}, r)), r += 1;
			continue;
		}
		let a = i.listType, o = r, s = [];
		for (; r < e.length && e[r].listType === a;) {
			let n = e[r];
			s.push(/* @__PURE__ */ (0, D.jsx)("li", {
				style: {
					marginBottom: t,
					marginLeft: n.indent ? n.indent * 24 : void 0
				},
				children: n.runs.map(an)
			}, r)), r += 1;
		}
		let c = {
			margin: 0,
			paddingLeft: 24
		};
		n.push(a === "ordered" ? /* @__PURE__ */ (0, D.jsx)("ol", {
			style: c,
			children: s
		}, o) : /* @__PURE__ */ (0, D.jsx)("ul", {
			style: c,
			children: s
		}, o));
	}
	return /* @__PURE__ */ (0, D.jsx)(D.Fragment, { children: n });
}
function an(e, t) {
	let n = e.marks ?? [], r = [n.includes("underline") ? "underline" : "", n.includes("strikethrough") ? "line-through" : ""].filter(Boolean).join(" "), i = {
		color: e.color,
		fontWeight: n.includes("bold") ? "bold" : void 0,
		fontStyle: n.includes("italic") ? "italic" : void 0,
		textDecoration: r || void 0
	}, a = n.includes("code") ? /* @__PURE__ */ (0, D.jsx)("span", {
		className: "amp-runtime-code",
		children: e.text
	}) : e.text, o = on(e.href);
	return o ? /* @__PURE__ */ (0, D.jsx)("a", {
		href: o,
		style: i,
		children: a
	}, t) : /* @__PURE__ */ (0, D.jsx)("span", {
		style: i,
		children: a
	}, t);
}
function on(e) {
	if (e) {
		if (e.startsWith("#") || e.startsWith("/") || e.startsWith("./") || e.startsWith("../")) return e;
		try {
			let t = new URL(e).protocol;
			return [
				"http:",
				"https:",
				"mailto:",
				"tel:"
			].includes(t) ? e : void 0;
		} catch {
			return;
		}
	}
}
//#endregion
//#region src/runtime/nodes/RuntimeTable.tsx
function sn({ node: e }) {
	let t = `${e.thinBorderWidth}px solid ${e.borderColor}`, n = `${e.thickBorderWidth}px solid ${e.borderColor}`, r = e.borderTemplate === "none" ? "none" : e.borderTemplate === "thin-all" ? t : n, i = e.borderTemplate === "none" ? "none" : e.borderTemplate === "thick-all" ? n : t;
	return /* @__PURE__ */ (0, D.jsx)("table", {
		className: "amp-runtime-table",
		style: {
			border: r,
			borderSpacing: e.cellGap,
			borderCollapse: e.cellGap ? "separate" : "collapse",
			background: e.backgroundColor,
			color: e.textColor
		},
		children: /* @__PURE__ */ (0, D.jsx)("tbody", { children: e.rows.map((t, n) => /* @__PURE__ */ (0, D.jsx)("tr", {
			style: e.striped && n % 2 == 1 ? { background: "color-mix(in srgb, currentColor 5%, transparent)" } : void 0,
			children: t.map((t, r) => {
				let a = e.headerRow && n === 0 || e.headerColumn && r === 0;
				return /* @__PURE__ */ (0, D.jsx)(a ? "th" : "td", {
					style: {
						border: i,
						padding: e.cellPadding,
						textAlign: e.textAlign,
						background: a ? e.headerBackgroundColor : void 0
					},
					children: /* @__PURE__ */ (0, D.jsx)(rn, { content: t })
				}, r);
			})
		}, n)) })
	});
}
//#endregion
//#region src/runtime/nodes/RuntimeVideo.tsx
function cn({ node: e }) {
	let t = f(e.src), n = f(e.poster), r = (0, S.useRef)(null), [i, a] = (0, S.useState)(!1), [o, s] = (0, S.useState)(!1), [c, l] = (0, S.useState)(0), [u, d] = (0, S.useState)(!1), p = e.lightbox ?? {
		enabled: !1,
		hoverLabel: "Open Fullscreen"
	};
	if ((0, S.useEffect)(() => {
		let n = r.current;
		if (!n || !t || !e.autoplay) return;
		let i = () => void n.play().catch(() => void 0);
		if (typeof IntersectionObserver > "u") {
			i();
			return;
		}
		let a = new IntersectionObserver(([e]) => {
			e?.isIntersecting && (i(), a.disconnect());
		}, {
			rootMargin: "120px",
			threshold: .15
		});
		return a.observe(n), () => a.disconnect();
	}, [e.autoplay, t]), !t) return null;
	let m = () => {
		p.enabled && (l(r.current?.currentTime ?? 0), r.current?.pause(), s(!0));
	}, h = (e, t) => {
		s(!1), r.current && (r.current.currentTime = e, t && !r.current.ended && r.current.play().catch(() => void 0));
	}, g = () => {
		r.current && (d(!1), r.current.currentTime = 0, r.current.play().catch(() => void 0));
	};
	return /* @__PURE__ */ (0, D.jsxs)(D.Fragment, { children: [/* @__PURE__ */ (0, D.jsxs)("div", {
		className: "amp-runtime-video",
		onMouseEnter: () => a(!0),
		onMouseLeave: () => a(!1),
		onClick: m,
		style: { cursor: p.enabled ? "zoom-in" : void 0 },
		children: [
			/* @__PURE__ */ (0, D.jsx)("video", {
				ref: r,
				src: t,
				poster: n,
				controls: !p.enabled && e.controls,
				controlsList: "nofullscreen",
				disablePictureInPicture: !0,
				loop: e.loop,
				muted: e.muted,
				playsInline: !0,
				preload: "metadata",
				onPlaying: () => d(!1),
				onEnded: () => {
					!e.loop && n && d(!0);
				}
			}),
			u && n && /* @__PURE__ */ (0, D.jsx)("button", {
				type: "button",
				className: "amp-runtime-video-poster",
				"aria-label": "Replay video",
				onClick: (e) => {
					e.stopPropagation(), g();
				},
				children: /* @__PURE__ */ (0, D.jsx)("img", {
					src: n,
					alt: ""
				})
			}),
			p.enabled && /* @__PURE__ */ (0, D.jsx)("div", {
				className: `amp-runtime-video-label ${i ? "visible" : ""}`,
				children: p.hoverLabel
			})
		]
	}), o && (0, lt.createPortal)(/* @__PURE__ */ (0, D.jsx)(ln, {
		node: e,
		src: t,
		poster: n,
		initialTime: c,
		onClose: h
	}), document.body)] });
}
function ln({ node: e, src: t, poster: n, initialTime: r, onClose: i }) {
	let a = (0, S.useRef)(null), [o, s] = (0, S.useState)(!0), c = (0, S.useCallback)(() => {
		let e = a.current;
		i(e?.currentTime ?? r, !!(e && !e.paused && !e.ended));
	}, [r, i]);
	return dt(c), /* @__PURE__ */ (0, D.jsxs)("div", {
		className: "amp-runtime-lightbox",
		role: "dialog",
		"aria-label": "Fullscreen video viewer",
		"aria-modal": "true",
		onContextMenu: (e) => e.preventDefault(),
		onDragStart: (e) => e.preventDefault(),
		onPointerDown: (e) => {
			e.target === e.currentTarget && c();
		},
		style: { background: o ? "#000" : "transparent" },
		children: [/* @__PURE__ */ (0, D.jsx)("video", {
			ref: a,
			src: t,
			poster: n,
			draggable: !1,
			controls: e.controls,
			controlsList: "nofullscreen",
			disablePictureInPicture: !0,
			loop: e.loop,
			muted: e.muted,
			playsInline: !0,
			preload: "auto",
			onLoadedMetadata: () => {
				let e = a.current;
				if (!e) return;
				e.currentTime = Math.min(r, Number.isFinite(e.duration) ? e.duration : r);
				let t = e.videoWidth / Math.max(1, e.videoHeight);
				s(Math.abs(t - innerWidth / Math.max(1, innerHeight)) > .01), e.play().catch(() => void 0);
			}
		}), /* @__PURE__ */ (0, D.jsx)(ut, {
			label: "Close video",
			onClose: c
		})]
	});
}
//#endregion
//#region src/runtime/RuntimeNode.tsx
var un = (0, S.memo)(function({ node: e, layerIndex: t }) {
	let n = it(e.layout, e.style);
	return n.zIndex = ae + (e.layout.zIndex ?? -t), (e.type === "video" || e.type === "model3d") && (n.background = "transparent"), /* @__PURE__ */ (0, D.jsx)("div", {
		className: `amp-runtime-node amp-runtime-node-${e.type}`,
		"data-node-id": e.id,
		"data-amp-text-wrap": e.type === "model3d" ? String(e.textWrap.enabled) : void 0,
		style: n,
		children: /* @__PURE__ */ (0, D.jsx)(dn, { node: e })
	});
});
function dn({ node: e }) {
	switch (e.type) {
		case "text": return /* @__PURE__ */ (0, D.jsx)(nn, { node: e });
		case "image": return /* @__PURE__ */ (0, D.jsx)(ft, { node: e });
		case "video": return /* @__PURE__ */ (0, D.jsx)(cn, { node: e });
		case "model3d": return /* @__PURE__ */ (0, D.jsx)(Pt, { node: e });
		case "audio": return /* @__PURE__ */ (0, D.jsx)(ot, { node: e });
		case "divider": return /* @__PURE__ */ (0, D.jsx)(ct, { node: e });
		case "spacer": return /* @__PURE__ */ (0, D.jsx)("div", {
			className: "amp-runtime-spacer",
			"aria-hidden": !0
		});
		case "table": return /* @__PURE__ */ (0, D.jsx)(sn, { node: e });
		case "container": return /* @__PURE__ */ (0, D.jsx)(D.Fragment, { children: e.children.map((e, t) => /* @__PURE__ */ (0, D.jsx)(un, {
			node: e,
			layerIndex: t
		}, e.id)) });
	}
}
//#endregion
//#region src/runtime/scrollbar-mode.ts
var fn = 0, pn = 0;
function mn(e) {
	fn += 1, e && (pn += 1), hn();
	let t = !1;
	return () => {
		t || (t = !0, fn = Math.max(0, fn - 1), e && (pn = Math.max(0, pn - 1)), hn());
	};
}
function hn() {
	if (typeof document > "u") return;
	let e = document.documentElement;
	e.classList.toggle("amp-runtime-scrollbars-hidden", fn > 0 && pn === 0), e.classList.toggle("amp-runtime-scrollbars-legacy", pn > 0);
}
//#endregion
//#region src/runtime/RuntimeDocument.tsx
var gn = (0, S.lazy)(() => import("./RuntimeModel3DStage-Db10-TFE.js"));
function _n({ document: e, className: t, style: n, ariaLabel: r }) {
	let i = (0, S.useRef)(null), a = (0, S.useRef)(null), o = (0, S.useMemo)(() => e.sections.reduce((e, t) => e + (typeof t.height == "number" ? t.height : ie), 0), [e.sections]), [s, c] = (0, S.useState)({
		scale: 1,
		height: o
	}), l = (0, S.useMemo)(() => Sn(e), [e]), u = e.presentation?.legacyMode.enabled ?? !1;
	return (0, S.useEffect)(() => mn(u), [u]), (0, S.useLayoutEffect)(() => {
		let e = i.current, t = a.current;
		if (!e || !t) return;
		let n = 0, r = () => {
			n = 0;
			let r = (e.clientWidth || 1080) / ie, i = Math.max(o, t.scrollHeight);
			c((e) => e.scale === r && e.height === i ? e : {
				scale: r,
				height: i
			});
		}, s = () => {
			n ||= requestAnimationFrame(r);
		}, l = typeof ResizeObserver > "u" ? null : new ResizeObserver(s);
		return l?.observe(e), l?.observe(t), window.addEventListener("resize", s), s(), () => {
			l?.disconnect(), window.removeEventListener("resize", s), n && cancelAnimationFrame(n);
		};
	}, [o]), /* @__PURE__ */ (0, D.jsxs)("div", {
		ref: i,
		className: `amp-runtime-root ${e.presentation?.legacyMode.enabled ? "amp-runtime-legacy" : ""} ${t ?? ""}`,
		style: {
			...n,
			height: s.height * s.scale
		},
		role: "region",
		"aria-label": r ?? e.metadata.title ?? "AMP document",
		"data-amp-version": e.version,
		onContextMenu: (e) => e.preventDefault(),
		onDragStart: (e) => e.preventDefault(),
		children: [
			/* @__PURE__ */ (0, D.jsx)(yn, { document: e }),
			/* @__PURE__ */ (0, D.jsx)("div", {
				ref: a,
				className: "amp-runtime-stage",
				style: {
					width: ie,
					transform: `scale(${s.scale})`
				},
				children: e.sections.map((e) => /* @__PURE__ */ (0, D.jsx)(vn, { section: e }, e.id))
			}),
			l && /* @__PURE__ */ (0, D.jsx)(S.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, D.jsx)(gn, {})
			}),
			/* @__PURE__ */ (0, D.jsx)(bn, { document: e })
		]
	});
}
function vn({ section: e }) {
	let t = f(e.background?.image), n = e.overflow ?? "hidden";
	return /* @__PURE__ */ (0, D.jsx)("section", {
		className: "amp-runtime-section",
		"data-section-id": e.id,
		"data-amp-section-overflow": n,
		"aria-label": e.name,
		style: {
			minHeight: typeof e.height == "number" ? e.height : ie,
			backgroundColor: e.background?.color,
			backgroundImage: t ? `url(${JSON.stringify(t)})` : void 0,
			overflow: n,
			isolation: n === "hidden" ? "isolate" : "auto"
		},
		children: e.nodes.map((e, t) => /* @__PURE__ */ (0, D.jsx)(un, {
			node: e,
			layerIndex: t
		}, e.id))
	});
}
function yn({ document: e }) {
	let { resolveAsset: t } = o(), n = (e.fonts ?? []).map((e) => {
		let n = t(e.src);
		return `@font-face{font-family:${JSON.stringify(e.family)};src:url(${JSON.stringify(n)});font-weight:${e.weight ?? "normal"};font-style:${e.style ?? "normal"};font-display:swap}`;
	});
	return n.length ? /* @__PURE__ */ (0, D.jsx)("style", { children: n.join("\n") }) : null;
}
function bn({ document: e }) {
	let t = e.presentation?.legacyMode;
	return !t?.enabled || !t.pixelation.enabled ? null : /* @__PURE__ */ (0, D.jsx)(xn, {
		settings: t.pixelation,
		maxFps: p(e.presentation?.performance.frameRateLimit)
	}, e.metadata.id);
}
function xn({ settings: e, maxFps: t }) {
	let n = (0, S.useRef)(null);
	return (0, S.useEffect)(() => {
		let r = n.current;
		if (!r) return;
		let i, a = requestAnimationFrame(() => {
			import("./mosaic-reveal-Crcj7ta5.js").then(({ runMosaicReveal: n }) => {
				i = n(r, {
					...e,
					maxFps: t
				});
			});
		});
		return () => {
			cancelAnimationFrame(a), i?.();
		};
	}, [t, e]), /* @__PURE__ */ (0, D.jsxs)("div", {
		ref: n,
		className: "amp-compositor",
		"aria-hidden": !0,
		children: [
			/* @__PURE__ */ (0, D.jsx)("div", {
				className: "amp-compositor-backdrop",
				"data-amp-backdrop": !0
			}),
			/* @__PURE__ */ (0, D.jsx)("canvas", { className: "amp-compositor-mosaic" }),
			/* @__PURE__ */ (0, D.jsx)("div", {
				className: "amp-compositor-scanlines",
				"data-amp-scanlines": !0
			}),
			/* @__PURE__ */ (0, D.jsx)("div", {
				className: "amp-compositor-vignette",
				"data-amp-vignette": !0
			})
		]
	});
}
function Sn(e) {
	let t = !1, n = (e) => e.forEach((e) => {
		e.type === "model3d" ? t = !0 : e.type === "container" && n(e.children);
	});
	return e.sections.forEach((e) => n(e.nodes)), t;
}
//#endregion
//#region src/runtime/AMPReader.tsx
function Cn({ document: e, src: t, assetBaseUrl: n, resolveAsset: r, className: i, style: a, loadingFallback: o, errorFallback: s, onLoad: c, onError: l, ariaLabel: u }) {
	let [d, f] = (0, S.useState)({}), p = e === void 0 && t === void 0 ? /* @__PURE__ */ Error("AMPReader requires either a document or src.") : void 0;
	(0, S.useEffect)(() => {
		if (e === void 0 && t === void 0) return;
		let n = new AbortController();
		return et(e ?? t, { signal: n.signal }).then((e) => {
			n.signal.aborted || (f({ loaded: e }), c?.(e.document));
		}).catch((e) => {
			if (n.signal.aborted) return;
			let t = e instanceof Error ? e : Error(String(e));
			f({ error: t }), l?.(t);
		}), () => n.abort();
	}, [
		e,
		l,
		c,
		t
	]);
	let m = (0, S.useMemo)(() => r || nt(n ?? d.loaded?.inferredAssetBaseUrl ?? globalThis.location?.href ?? "/"), [
		n,
		r,
		d.loaded?.inferredAssetBaseUrl
	]), g = p ?? d.error;
	if (g) return /* @__PURE__ */ (0, D.jsx)("div", {
		className: `amp-runtime-error ${i ?? ""}`,
		style: a,
		role: "alert",
		children: s?.(g) ?? /* @__PURE__ */ (0, D.jsxs)(D.Fragment, { children: [/* @__PURE__ */ (0, D.jsx)("strong", { children: "Unable to open AMP document" }), /* @__PURE__ */ (0, D.jsx)("span", { children: g.message })] })
	});
	if (!d.loaded) return /* @__PURE__ */ (0, D.jsx)(D.Fragment, { children: o ?? /* @__PURE__ */ (0, D.jsx)("div", {
		className: `amp-runtime-loading ${i ?? ""}`,
		style: a,
		children: "Loading AMP document…"
	}) });
	let v = d.loaded.document.presentation ?? h();
	return /* @__PURE__ */ (0, D.jsx)(_.Provider, {
		value: {
			resolveAsset: m,
			legacyMode: v.legacyMode,
			frameRateLimit: v.performance.frameRateLimit
		},
		children: /* @__PURE__ */ (0, D.jsx)(_n, {
			document: d.loaded.document,
			className: i,
			style: a,
			ariaLabel: u
		})
	});
}
//#endregion
//#region node_modules/react-dom/cjs/react-dom-client.production.js
var wn = /* @__PURE__ */ e(((e) => {
	var t = i(), n = r(), a = ne();
	function o(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function s(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function c(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function l(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function u(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function d(e) {
		if (c(e) !== e) throw Error(o(188));
	}
	function f(e) {
		var t = e.alternate;
		if (!t) {
			if (t = c(e), t === null) throw Error(o(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var i = n.return;
			if (i === null) break;
			var a = i.alternate;
			if (a === null) {
				if (r = i.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (i.child === a.child) {
				for (a = i.child; a;) {
					if (a === n) return d(i), e;
					if (a === r) return d(i), t;
					a = a.sibling;
				}
				throw Error(o(188));
			}
			if (n.return !== r.return) n = i, r = a;
			else {
				for (var s = !1, l = i.child; l;) {
					if (l === n) {
						s = !0, n = i, r = a;
						break;
					}
					if (l === r) {
						s = !0, r = i, n = a;
						break;
					}
					l = l.sibling;
				}
				if (!s) {
					for (l = a.child; l;) {
						if (l === n) {
							s = !0, n = a, r = i;
							break;
						}
						if (l === r) {
							s = !0, r = a, n = i;
							break;
						}
						l = l.sibling;
					}
					if (!s) throw Error(o(189));
				}
			}
			if (n.alternate !== r) throw Error(o(190));
		}
		if (n.tag !== 3) throw Error(o(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var m = Object.assign, h = Symbol.for("react.element"), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), ee = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), re = Symbol.for("react.suspense"), S = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), ae = Symbol.for("react.lazy"), oe = Symbol.for("react.activity"), C = Symbol.for("react.memo_cache_sentinel"), se = Symbol.iterator;
	function ce(e) {
		return typeof e != "object" || !e ? null : (e = se && e[se] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var le = Symbol.for("react.client.reference");
	function ue(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === le ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case v: return "Fragment";
			case b: return "Profiler";
			case y: return "StrictMode";
			case re: return "Suspense";
			case S: return "SuspenseList";
			case oe: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case _: return "Portal";
			case ee: return e.displayName || "Context";
			case x: return (e._context.displayName || "Context") + ".Consumer";
			case te:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case ie: return t = e.displayName || null, t === null ? ue(e.type) || "Memo" : t;
			case ae:
				t = e._payload, e = e._init;
				try {
					return ue(e(t));
				} catch {}
		}
		return null;
	}
	var de = Array.isArray, w = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, T = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, fe = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, pe = [], me = -1;
	function he(e) {
		return { current: e };
	}
	function ge(e) {
		0 > me || (e.current = pe[me], pe[me] = null, me--);
	}
	function _e(e, t) {
		me++, pe[me] = e.current, e.current = t;
	}
	var ve = he(null), ye = he(null), be = he(null), xe = he(null);
	function Se(e, t) {
		switch (_e(be, t), _e(ye, e), _e(ve, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? nf(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = nf(t), e = rf(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		ge(ve), _e(ve, e);
	}
	function Ce() {
		ge(ve), ge(ye), ge(be);
	}
	function we(e) {
		e.memoizedState !== null && _e(xe, e);
		var t = ve.current, n = rf(t, e.type);
		t !== n && (_e(ye, e), _e(ve, n));
	}
	function E(e) {
		ye.current === e && (ge(ve), ge(ye)), xe.current === e && (ge(xe), dp._currentValue = fe);
	}
	var Te, Ee;
	function De(e) {
		if (Te === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Te = t && t[1] || "", Ee = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Te + e + Ee;
	}
	var Oe = !1;
	function ke(e, t) {
		if (!e || Oe) return "";
		Oe = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Oe = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? De(n) : "";
	}
	function Ae(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return De(e.type);
			case 16: return De("Lazy");
			case 13: return e.child !== t && t !== null ? De("Suspense Fallback") : De("Suspense");
			case 19: return De("SuspenseList");
			case 0:
			case 15: return ke(e.type, !1);
			case 11: return ke(e.type.render, !1);
			case 1: return ke(e.type, !0);
			case 31: return De("Activity");
			default: return "";
		}
	}
	function je(e) {
		try {
			var t = "", n = null;
			do
				t += Ae(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Me = Object.prototype.hasOwnProperty, Ne = t.unstable_scheduleCallback, Pe = t.unstable_cancelCallback, Fe = t.unstable_shouldYield, Ie = t.unstable_requestPaint, Le = t.unstable_now, Re = t.unstable_getCurrentPriorityLevel, ze = t.unstable_ImmediatePriority, Be = t.unstable_UserBlockingPriority, Ve = t.unstable_NormalPriority, He = t.unstable_LowPriority, Ue = t.unstable_IdlePriority, We = t.log, Ge = t.unstable_setDisableYieldValue, Ke = null, qe = null;
	function Je(e) {
		if (typeof We == "function" && Ge(e), qe && typeof qe.setStrictMode == "function") try {
			qe.setStrictMode(Ke, e);
		} catch {}
	}
	var Ye = Math.clz32 ? Math.clz32 : Qe, Xe = Math.log, Ze = Math.LN2;
	function Qe(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Xe(e) / Ze | 0) | 0;
	}
	var $e = 256, et = 262144, tt = 4194304;
	function nt(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function rt(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = nt(n))) : i = nt(o) : i = nt(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = nt(n))) : i = nt(o)) : i = nt(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function it(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function at(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function D() {
		var e = tt;
		return tt <<= 1, !(tt & 62914560) && (tt = 4194304), e;
	}
	function ot(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function st(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function ct(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Ye(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && lt(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function lt(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Ye(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function ut(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Ye(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function dt(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : ft(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function ft(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function pt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function mt() {
		var e = T.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Dp(e.type)) : e;
	}
	function ht(e, t) {
		var n = T.p;
		try {
			return T.p = e, t();
		} finally {
			T.p = n;
		}
	}
	var gt = Math.random().toString(36).slice(2), _t = "__reactFiber$" + gt, vt = "__reactProps$" + gt, yt = "__reactContainer$" + gt, bt = "__reactEvents$" + gt, xt = "__reactListeners$" + gt, St = "__reactHandles$" + gt, Ct = "__reactResources$" + gt, wt = "__reactMarker$" + gt;
	function Tt(e) {
		delete e[_t], delete e[vt], delete e[bt], delete e[xt], delete e[St];
	}
	function Et(e) {
		var t = e[_t];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[yt] || n[_t]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Ef(e); e !== null;) {
					if (n = e[_t]) return n;
					e = Ef(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Dt(e) {
		if (e = e[_t] || e[yt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Ot(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(o(33));
	}
	function kt(e) {
		var t = e[Ct];
		return t ||= e[Ct] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function At(e) {
		e[wt] = !0;
	}
	var jt = /* @__PURE__ */ new Set(), Mt = {};
	function Nt(e, t) {
		Pt(e, t), Pt(e + "Capture", t);
	}
	function Pt(e, t) {
		for (Mt[e] = t, e = 0; e < t.length; e++) jt.add(t[e]);
	}
	var Ft = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), It = {}, Lt = {};
	function Rt(e) {
		return Me.call(Lt, e) ? !0 : Me.call(It, e) ? !1 : Ft.test(e) ? Lt[e] = !0 : (It[e] = !0, !1);
	}
	function zt(e, t, n) {
		if (Rt(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Bt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Vt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function Ht(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Ut(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Wt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Gt(e) {
		if (!e._valueTracker) {
			var t = Ut(e) ? "checked" : "value";
			e._valueTracker = Wt(e, t, "" + e[t]);
		}
	}
	function Kt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Ut(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function qt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Jt = /[\n"\\]/g;
	function Yt(e) {
		return e.replace(Jt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Xt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ht(t)) : e.value !== "" + Ht(t) && (e.value = "" + Ht(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Qt(e, o, Ht(n)) : Qt(e, o, Ht(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Ht(s) : e.removeAttribute("name");
	}
	function Zt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Gt(e);
				return;
			}
			n = n == null ? "" : "" + Ht(n), t = t == null ? n : "" + Ht(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Gt(e);
	}
	function Qt(e, t, n) {
		t === "number" && qt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function $t(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Ht(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function en(e, t, n) {
		if (t != null && (t = "" + Ht(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Ht(n);
	}
	function tn(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(o(92));
				if (de(r)) {
					if (1 < r.length) throw Error(o(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Ht(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Gt(e);
	}
	function nn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var rn = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function an(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || rn.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function on(e, t, n) {
		if (t != null && typeof t != "object") throw Error(o(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var i in t) r = t[i], t.hasOwnProperty(i) && n[i] !== r && an(e, i, r);
		} else for (var a in t) t.hasOwnProperty(a) && an(e, a, t[a]);
	}
	function sn(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var cn = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), ln = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function un(e) {
		return ln.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function dn() {}
	var fn = null;
	function pn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var mn = null, hn = null;
	function gn(e) {
		var t = Dt(e);
		if (t && (e = t.stateNode)) {
			var n = e[vt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Xt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Yt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var i = r[vt] || null;
								if (!i) throw Error(o(90));
								Xt(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Kt(r);
					}
					break a;
				case "textarea":
					en(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && $t(e, !!n.multiple, t, !1);
			}
		}
	}
	var _n = !1;
	function vn(e, t, n) {
		if (_n) return e(t, n);
		_n = !0;
		try {
			return e(t);
		} finally {
			if (_n = !1, (mn !== null || hn !== null) && (Nu(), mn && (t = mn, e = hn, hn = mn = null, gn(t), e))) for (t = 0; t < e.length; t++) gn(e[t]);
		}
	}
	function yn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[vt] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(o(231, t, typeof n));
		return n;
	}
	var bn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), xn = !1;
	if (bn) try {
		var Sn = {};
		Object.defineProperty(Sn, "passive", { get: function() {
			xn = !0;
		} }), window.addEventListener("test", Sn, Sn), window.removeEventListener("test", Sn, Sn);
	} catch {
		xn = !1;
	}
	var Cn = null, wn = null, Tn = null;
	function En() {
		if (Tn) return Tn;
		var e, t = wn, n = t.length, r, i = "value" in Cn ? Cn.value : Cn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return Tn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Dn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function On() {
		return !0;
	}
	function kn() {
		return !1;
	}
	function An(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? On : kn, this.isPropagationStopped = kn, this;
		}
		return m(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = On);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = On);
			},
			persist: function() {},
			isPersistent: On
		}), t;
	}
	var jn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Mn = An(jn), Nn = m({}, jn, {
		view: 0,
		detail: 0
	}), Pn = An(Nn), Fn, In, Ln, Rn = m({}, Nn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: Yn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Ln && (Ln && e.type === "mousemove" ? (Fn = e.screenX - Ln.screenX, In = e.screenY - Ln.screenY) : In = Fn = 0, Ln = e), Fn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : In;
		}
	}), zn = An(Rn), Bn = An(m({}, Rn, { dataTransfer: 0 })), Vn = An(m({}, Nn, { relatedTarget: 0 })), Hn = An(m({}, jn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Un = An(m({}, jn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Wn = An(m({}, jn, { data: 0 })), Gn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, Kn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, qn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Jn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = qn[e]) ? !!t[e] : !1;
	}
	function Yn() {
		return Jn;
	}
	var Xn = An(m({}, Nn, {
		key: function(e) {
			if (e.key) {
				var t = Gn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Dn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Kn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Yn,
		charCode: function(e) {
			return e.type === "keypress" ? Dn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Dn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Zn = An(m({}, Rn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Qn = An(m({}, Nn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Yn
	})), $n = An(m({}, jn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), er = An(m({}, Rn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), tr = An(m({}, jn, {
		newState: 0,
		oldState: 0
	})), nr = [
		9,
		13,
		27,
		32
	], rr = bn && "CompositionEvent" in window, ir = null;
	bn && "documentMode" in document && (ir = document.documentMode);
	var ar = bn && "TextEvent" in window && !ir, or = bn && (!rr || ir && 8 < ir && 11 >= ir), sr = " ", cr = !1;
	function lr(e, t) {
		switch (e) {
			case "keyup": return nr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function ur(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var dr = !1;
	function fr(e, t) {
		switch (e) {
			case "compositionend": return ur(t);
			case "keypress": return t.which === 32 ? (cr = !0, sr) : null;
			case "textInput": return e = t.data, e === sr && cr ? null : e;
			default: return null;
		}
	}
	function pr(e, t) {
		if (dr) return e === "compositionend" || !rr && lr(e, t) ? (e = En(), Tn = wn = Cn = null, dr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return or && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var mr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function hr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!mr[e.type] : t === "textarea";
	}
	function gr(e, t, n, r) {
		mn ? hn ? hn.push(r) : hn = [r] : mn = r, t = Bd(t, "onChange"), 0 < t.length && (n = new Mn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var _r = null, vr = null;
	function yr(e) {
		Nd(e, 0);
	}
	function br(e) {
		if (Kt(Ot(e))) return e;
	}
	function xr(e, t) {
		if (e === "change") return t;
	}
	var Sr = !1;
	if (bn) {
		var Cr;
		if (bn) {
			var wr = "oninput" in document;
			if (!wr) {
				var Tr = document.createElement("div");
				Tr.setAttribute("oninput", "return;"), wr = typeof Tr.oninput == "function";
			}
			Cr = wr;
		} else Cr = !1;
		Sr = Cr && (!document.documentMode || 9 < document.documentMode);
	}
	function Er() {
		_r && (_r.detachEvent("onpropertychange", Dr), vr = _r = null);
	}
	function Dr(e) {
		if (e.propertyName === "value" && br(vr)) {
			var t = [];
			gr(t, vr, e, pn(e)), vn(yr, t);
		}
	}
	function Or(e, t, n) {
		e === "focusin" ? (Er(), _r = t, vr = n, _r.attachEvent("onpropertychange", Dr)) : e === "focusout" && Er();
	}
	function kr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return br(vr);
	}
	function Ar(e, t) {
		if (e === "click") return br(t);
	}
	function jr(e, t) {
		if (e === "input" || e === "change") return br(t);
	}
	function Mr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Nr = typeof Object.is == "function" ? Object.is : Mr;
	function Pr(e, t) {
		if (Nr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Me.call(t, i) || !Nr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Fr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Ir(e, t) {
		var n = Fr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Fr(n);
		}
	}
	function Lr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Lr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Rr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = qt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = qt(e.document);
		}
		return t;
	}
	function zr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Br = bn && "documentMode" in document && 11 >= document.documentMode, Vr = null, Hr = null, Ur = null, Wr = !1;
	function Gr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Wr || Vr == null || Vr !== qt(r) || (r = Vr, "selectionStart" in r && zr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Ur && Pr(Ur, r) || (Ur = r, r = Bd(Hr, "onSelect"), 0 < r.length && (t = new Mn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Vr)));
	}
	function Kr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var qr = {
		animationend: Kr("Animation", "AnimationEnd"),
		animationiteration: Kr("Animation", "AnimationIteration"),
		animationstart: Kr("Animation", "AnimationStart"),
		transitionrun: Kr("Transition", "TransitionRun"),
		transitionstart: Kr("Transition", "TransitionStart"),
		transitioncancel: Kr("Transition", "TransitionCancel"),
		transitionend: Kr("Transition", "TransitionEnd")
	}, Jr = {}, Yr = {};
	bn && (Yr = document.createElement("div").style, "AnimationEvent" in window || (delete qr.animationend.animation, delete qr.animationiteration.animation, delete qr.animationstart.animation), "TransitionEvent" in window || delete qr.transitionend.transition);
	function Xr(e) {
		if (Jr[e]) return Jr[e];
		if (!qr[e]) return e;
		var t = qr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Yr) return Jr[e] = t[n];
		return e;
	}
	var Zr = Xr("animationend"), Qr = Xr("animationiteration"), $r = Xr("animationstart"), ei = Xr("transitionrun"), ti = Xr("transitionstart"), ni = Xr("transitioncancel"), ri = Xr("transitionend"), ii = /* @__PURE__ */ new Map(), ai = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	ai.push("scrollEnd");
	function oi(e, t) {
		ii.set(e, t), Nt(t, [e]);
	}
	var si = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, ci = [], li = 0, ui = 0;
	function di() {
		for (var e = li, t = ui = li = 0; t < e;) {
			var n = ci[t];
			ci[t++] = null;
			var r = ci[t];
			ci[t++] = null;
			var i = ci[t];
			ci[t++] = null;
			var a = ci[t];
			if (ci[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && hi(n, i, a);
		}
	}
	function fi(e, t, n, r) {
		ci[li++] = e, ci[li++] = t, ci[li++] = n, ci[li++] = r, ui |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function pi(e, t, n, r) {
		return fi(e, t, n, r), gi(e);
	}
	function mi(e, t) {
		return fi(e, null, null, t), gi(e);
	}
	function hi(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ye(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function gi(e) {
		if (50 < wu) throw wu = 0, Tu = null, Error(o(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var _i = {};
	function vi(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function yi(e, t, n, r) {
		return new vi(e, t, n, r);
	}
	function bi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function xi(e, t) {
		var n = e.alternate;
		return n === null ? (n = yi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function Si(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Ci(e, t, n, r, i, a) {
		var s = 0;
		if (r = e, typeof e == "function") bi(e) && (s = 1);
		else if (typeof e == "string") s = np(e, n, ve.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case oe: return e = yi(31, n, t, i), e.elementType = oe, e.lanes = a, e;
			case v: return wi(n.children, i, a, t);
			case y:
				s = 8, i |= 24;
				break;
			case b: return e = yi(12, n, t, i | 2), e.elementType = b, e.lanes = a, e;
			case re: return e = yi(13, n, t, i), e.elementType = re, e.lanes = a, e;
			case S: return e = yi(19, n, t, i), e.elementType = S, e.lanes = a, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case ee:
						s = 10;
						break a;
					case x:
						s = 9;
						break a;
					case te:
						s = 11;
						break a;
					case ie:
						s = 14;
						break a;
					case ae:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(o(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = yi(s, n, t, i), t.elementType = e, t.type = r, t.lanes = a, t;
	}
	function wi(e, t, n, r) {
		return e = yi(7, e, r, t), e.lanes = n, e;
	}
	function Ti(e, t, n) {
		return e = yi(6, e, null, t), e.lanes = n, e;
	}
	function Ei(e) {
		var t = yi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Di(e, t, n) {
		return t = yi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Oi = /* @__PURE__ */ new WeakMap();
	function ki(e, t) {
		if (typeof e == "object" && e) {
			var n = Oi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: je(t)
			}, Oi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: je(t)
		};
	}
	var Ai = [], ji = 0, Mi = null, Ni = 0, Pi = [], Fi = 0, Ii = null, Li = 1, Ri = "";
	function zi(e, t) {
		Ai[ji++] = Ni, Ai[ji++] = Mi, Mi = e, Ni = t;
	}
	function Bi(e, t, n) {
		Pi[Fi++] = Li, Pi[Fi++] = Ri, Pi[Fi++] = Ii, Ii = e;
		var r = Li;
		e = Ri;
		var i = 32 - Ye(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Ye(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Li = 1 << 32 - Ye(t) + i | n << i | r, Ri = a + e;
		} else Li = 1 << a | n << i | r, Ri = e;
	}
	function Vi(e) {
		e.return !== null && (zi(e, 1), Bi(e, 1, 0));
	}
	function Hi(e) {
		for (; e === Mi;) Mi = Ai[--ji], Ai[ji] = null, Ni = Ai[--ji], Ai[ji] = null;
		for (; e === Ii;) Ii = Pi[--Fi], Pi[Fi] = null, Ri = Pi[--Fi], Pi[Fi] = null, Li = Pi[--Fi], Pi[Fi] = null;
	}
	function Ui(e, t) {
		Pi[Fi++] = Li, Pi[Fi++] = Ri, Pi[Fi++] = Ii, Li = t.id, Ri = t.overflow, Ii = e;
	}
	var O = null, Wi = null, k = !1, Gi = null, Ki = !1, qi = Error(o(519));
	function Ji(e) {
		throw ea(ki(Error(o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), qi;
	}
	function Yi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[_t] = e, t[vt] = r, n) {
			case "dialog":
				R("cancel", t), R("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				R("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < jd.length; n++) R(jd[n], t);
				break;
			case "source":
				R("error", t);
				break;
			case "img":
			case "image":
			case "link":
				R("error", t), R("load", t);
				break;
			case "details":
				R("toggle", t);
				break;
			case "input":
				R("invalid", t), Zt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				R("invalid", t);
				break;
			case "textarea": R("invalid", t), tn(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Kd(t.textContent, n) ? (r.popover != null && (R("beforetoggle", t), R("toggle", t)), r.onScroll != null && R("scroll", t), r.onScrollEnd != null && R("scrollend", t), r.onClick != null && (t.onclick = dn), t = !0) : t = !1, t || Ji(e, !0);
	}
	function Xi(e) {
		for (O = e.return; O;) switch (O.tag) {
			case 5:
			case 31:
			case 13:
				Ki = !1;
				return;
			case 27:
			case 3:
				Ki = !0;
				return;
			default: O = O.return;
		}
	}
	function Zi(e) {
		if (e !== O) return !1;
		if (!k) return Xi(e), k = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || af(e.type, e.memoizedProps)), n = !n), n && Wi && Ji(e), Xi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(o(317));
			Wi = Tf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(o(317));
			Wi = Tf(e);
		} else t === 27 ? (t = Wi, pf(e.type) ? (e = wf, wf = null, Wi = e) : Wi = t) : Wi = O ? Cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Qi() {
		Wi = O = null, k = !1;
	}
	function $i() {
		var e = Gi;
		return e !== null && (uu === null ? uu = e : uu.push.apply(uu, e), Gi = null), e;
	}
	function ea(e) {
		Gi === null ? Gi = [e] : Gi.push(e);
	}
	var ta = he(null), na = null, ra = null;
	function ia(e, t, n) {
		_e(ta, t._currentValue), t._currentValue = n;
	}
	function aa(e) {
		e._currentValue = ta.current, ge(ta);
	}
	function oa(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function sa(e, t, n, r) {
		var i = e.child;
		for (i !== null && (i.return = e); i !== null;) {
			var a = i.dependencies;
			if (a !== null) {
				var s = i.child;
				a = a.firstContext;
				a: for (; a !== null;) {
					var c = a;
					a = i;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						a.lanes |= n, c = a.alternate, c !== null && (c.lanes |= n), oa(a.return, n, e), r || (s = null);
						break a;
					}
					a = c.next;
				}
			} else if (i.tag === 18) {
				if (s = i.return, s === null) throw Error(o(341));
				s.lanes |= n, a = s.alternate, a !== null && (a.lanes |= n), oa(s, n, e), s = null;
			} else s = i.child;
			if (s !== null) s.return = i;
			else for (s = i; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (i = s.sibling, i !== null) {
					i.return = s.return, s = i;
					break;
				}
				s = s.return;
			}
			i = s;
		}
	}
	function ca(e, t, n, r) {
		e = null;
		for (var i = t, a = !1; i !== null;) {
			if (!a) {
				if (i.flags & 524288) a = !0;
				else if (i.flags & 262144) break;
			}
			if (i.tag === 10) {
				var s = i.alternate;
				if (s === null) throw Error(o(387));
				if (s = s.memoizedProps, s !== null) {
					var c = i.type;
					Nr(i.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (i === xe.current) {
				if (s = i.alternate, s === null) throw Error(o(387));
				s.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [dp] : e.push(dp));
			}
			i = i.return;
		}
		e !== null && sa(t, e, n, r), t.flags |= 262144;
	}
	function la(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Nr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function ua(e) {
		na = e, ra = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function da(e) {
		return pa(na, e);
	}
	function fa(e, t) {
		return na === null && ua(e), pa(e, t);
	}
	function pa(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, ra === null) {
			if (e === null) throw Error(o(308));
			ra = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else ra = ra.next = t;
		return n;
	}
	var ma = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, ha = t.unstable_scheduleCallback, ga = t.unstable_NormalPriority, _a = {
		$$typeof: ee,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function va() {
		return {
			controller: new ma(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ya(e) {
		e.refCount--, e.refCount === 0 && ha(ga, function() {
			e.controller.abort();
		});
	}
	var ba = null, A = 0, j = 0, xa = null;
	function Sa(e, t) {
		if (ba === null) {
			var n = ba = [];
			A = 0, j = Td(), xa = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return A++, t.then(Ca, Ca), t;
	}
	function Ca() {
		if (--A === 0 && ba !== null) {
			xa !== null && (xa.status = "fulfilled");
			var e = ba;
			ba = null, j = 0, xa = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function wa(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var Ta = w.S;
	w.S = function(e, t) {
		pu = Le(), typeof t == "object" && t && typeof t.then == "function" && Sa(e, t), Ta !== null && Ta(e, t);
	};
	var Ea = he(null);
	function Da() {
		var e = Ea.current;
		return e === null ? P.pooledCache : e;
	}
	function Oa(e, t) {
		t === null ? _e(Ea, Ea.current) : _e(Ea, t.pool);
	}
	function ka() {
		var e = Da();
		return e === null ? null : {
			parent: _a._currentValue,
			pool: e
		};
	}
	var Aa = Error(o(460)), ja = Error(o(474)), Ma = Error(o(542)), Na = { then: function() {} };
	function Pa(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Fa(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(dn, dn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, za(e), e;
			default:
				if (typeof t.status == "string") t.then(dn, dn);
				else {
					if (e = P, e !== null && 100 < e.shellSuspendCounter) throw Error(o(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, za(e), e;
				}
				throw La = t, Aa;
		}
	}
	function Ia(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (La = e, Aa) : e;
		}
	}
	var La = null;
	function Ra() {
		if (La === null) throw Error(o(459));
		var e = La;
		return La = null, e;
	}
	function za(e) {
		if (e === Aa || e === Ma) throw Error(o(483));
	}
	var Ba = null, Va = 0;
	function Ha(e) {
		var t = Va;
		return Va += 1, Ba === null && (Ba = []), Fa(Ba, e, t);
	}
	function Ua(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Wa(e, t) {
		throw t.$$typeof === h ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(o(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Ga(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function i(e, t) {
			return e = xi(e, t), e.index = 0, e.sibling = null, e;
		}
		function a(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Ti(n, e.mode, r), t.return = e, t) : (t = i(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var a = n.type;
			return a === v ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === a || typeof a == "object" && a && a.$$typeof === ae && Ia(a) === t.type) ? (t = i(t, n.props), Ua(t, n), t.return = e, t) : (t = Ci(n.type, n.key, n.props, null, e.mode, r), Ua(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Di(n, e.mode, r), t.return = e, t) : (t = i(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, a) {
			return t === null || t.tag !== 7 ? (t = wi(n, e.mode, r, a), t.return = e, t) : (t = i(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Ti("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case g: return n = Ci(t.type, t.key, t.props, null, e.mode, n), Ua(n, t), n.return = e, n;
					case _: return t = Di(t, e.mode, n), t.return = e, t;
					case ae: return t = Ia(t), f(e, t, n);
				}
				if (de(t) || ce(t)) return t = wi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Ha(t), n);
				if (t.$$typeof === ee) return f(e, fa(e, t), n);
				Wa(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case g: return n.key === i ? l(e, t, n, r) : null;
					case _: return n.key === i ? u(e, t, n, r) : null;
					case ae: return n = Ia(n), p(e, t, n, r);
				}
				if (de(n) || ce(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Ha(n), r);
				if (n.$$typeof === ee) return p(e, t, fa(e, n), r);
				Wa(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case g: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case _: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case ae: return r = Ia(r), m(e, t, n, r, i);
				}
				if (de(r) || ce(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Ha(r), i);
				if (r.$$typeof === ee) return m(e, t, n, fa(t, r), i);
				Wa(t, r);
			}
			return null;
		}
		function h(i, o, s, c) {
			for (var l = null, u = null, d = o, h = o = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), o = a(_, o, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), k && zi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (o = a(d, o, h), u === null ? l = d : u.sibling = d, u = d);
				return k && zi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), o = a(g, o, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), k && zi(i, h), l;
		}
		function y(i, s, c, l) {
			if (c == null) throw Error(o(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(i, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(i, h), s = a(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(i, h), k && zi(i, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(i, v.value, l), v !== null && (s = a(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return k && zi(i, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, i, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = a(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(i, e);
			}), k && zi(i, g), u;
		}
		function b(e, r, a, c) {
			if (typeof a == "object" && a && a.type === v && a.key === null && (a = a.props.children), typeof a == "object" && a) {
				switch (a.$$typeof) {
					case g:
						a: {
							for (var l = a.key; r !== null;) {
								if (r.key === l) {
									if (l = a.type, l === v) {
										if (r.tag === 7) {
											n(e, r.sibling), c = i(r, a.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === ae && Ia(l) === r.type) {
										n(e, r.sibling), c = i(r, a.props), Ua(c, a), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							a.type === v ? (c = wi(a.props.children, e.mode, c, a.key), c.return = e, e = c) : (c = Ci(a.type, a.key, a.props, null, e.mode, c), Ua(c, a), c.return = e, e = c);
						}
						return s(e);
					case _:
						a: {
							for (l = a.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === a.containerInfo && r.stateNode.implementation === a.implementation) {
									n(e, r.sibling), c = i(r, a.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								else t(e, r);
								r = r.sibling;
							}
							c = Di(a, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case ae: return a = Ia(a), b(e, r, a, c);
				}
				if (de(a)) return h(e, r, a, c);
				if (ce(a)) {
					if (l = ce(a), typeof l != "function") throw Error(o(150));
					return a = l.call(a), y(e, r, a, c);
				}
				if (typeof a.then == "function") return b(e, r, Ha(a), c);
				if (a.$$typeof === ee) return b(e, r, fa(e, a), c);
				Wa(e, a);
			}
			return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (a = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), c = i(r, a), c.return = e, e = c) : (n(e, r), c = Ti(a, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Va = 0;
				var i = b(e, t, n, r);
				return Ba = null, i;
			} catch (t) {
				if (t === Aa || t === Ma) throw t;
				var a = yi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Ka = Ga(!0), qa = Ga(!1), Ja = !1;
	function Ya(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Xa(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Za(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Qa(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Zl & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = gi(e), hi(e, null, n), t;
		}
		return fi(e, r, t, n), gi(e);
	}
	function $a(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ut(e, n);
		}
	}
	function eo(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var to = !1;
	function no() {
		if (to) {
			var e = xa;
			if (e !== null) throw e;
		}
	}
	function ro(e, t, n, r) {
		to = !1;
		var i = e.updateQueue;
		Ja = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (I & f) === f : (r & f) === f) {
					f !== 0 && f === j && (to = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var h = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (h = g.payload, typeof h == "function") {
									d = h.call(_, d, f);
									break a;
								}
								d = h;
								break a;
							case 3: h.flags = h.flags & -65537 | 128;
							case 0:
								if (h = g.payload, f = typeof h == "function" ? h.call(_, d, f) : h, f == null) break a;
								d = m({}, d, f);
								break a;
							case 2: Ja = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), au |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function io(e, t) {
		if (typeof e != "function") throw Error(o(191, e));
		e.call(t);
	}
	function ao(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) io(n[e], t);
	}
	var oo = he(null), so = he(0);
	function co(e, t) {
		e = ru, _e(so, e), _e(oo, t), ru = e | t.baseLanes;
	}
	function lo() {
		_e(so, ru), _e(oo, oo.current);
	}
	function uo() {
		ru = so.current, ge(oo), ge(so);
	}
	var fo = he(null), po = null;
	function mo(e) {
		var t = e.alternate;
		_e(yo, yo.current & 1), _e(fo, e), po === null && (t === null || oo.current !== null || t.memoizedState !== null) && (po = e);
	}
	function ho(e) {
		_e(yo, yo.current), _e(fo, e), po === null && (po = e);
	}
	function go(e) {
		e.tag === 22 ? (_e(yo, yo.current), _e(fo, e), po === null && (po = e)) : _o(e);
	}
	function _o() {
		_e(yo, yo.current), _e(fo, fo.current);
	}
	function vo(e) {
		ge(fo), po === e && (po = null), ge(yo);
	}
	var yo = he(0);
	function bo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || bf(n) || xf(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var xo = 0, M = null, So = null, Co = null, wo = !1, To = !1, Eo = !1, Do = 0, Oo = 0, ko = null, Ao = 0;
	function jo() {
		throw Error(o(321));
	}
	function Mo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Nr(e[n], t[n])) return !1;
		return !0;
	}
	function No(e, t, n, r, i, a) {
		return xo = a, M = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, w.H = e === null || e.memoizedState === null ? Xs : Zs, Eo = !1, a = n(r, i), Eo = !1, To && (a = Fo(t, n, r, i)), Po(e), a;
	}
	function Po(e) {
		w.H = Ys;
		var t = So !== null && So.next !== null;
		if (xo = 0, Co = So = M = null, wo = !1, Oo = 0, ko = null, t) throw Error(o(300));
		e === null || mc || (e = e.dependencies, e !== null && la(e) && (mc = !0));
	}
	function Fo(e, t, n, r) {
		M = e;
		var i = 0;
		do {
			if (To && (ko = null), Oo = 0, To = !1, 25 <= i) throw Error(o(301));
			if (i += 1, Co = So = null, e.updateQueue != null) {
				var a = e.updateQueue;
				a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0);
			}
			w.H = Qs, a = t(n, r);
		} while (To);
		return a;
	}
	function Io() {
		var e = w.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Uo(t) : t, e = e.useState()[0], (So === null ? null : So.memoizedState) !== e && (M.flags |= 1024), t;
	}
	function Lo() {
		var e = Do !== 0;
		return Do = 0, e;
	}
	function Ro(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function zo(e) {
		if (wo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			wo = !1;
		}
		xo = 0, Co = So = M = null, To = !1, Oo = Do = 0, ko = null;
	}
	function Bo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return Co === null ? M.memoizedState = Co = e : Co = Co.next = e, Co;
	}
	function Vo() {
		if (So === null) {
			var e = M.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = So.next;
		var t = Co === null ? M.memoizedState : Co.next;
		if (t !== null) Co = t, So = e;
		else {
			if (e === null) throw M.alternate === null ? Error(o(467)) : Error(o(310));
			So = e, e = {
				memoizedState: So.memoizedState,
				baseState: So.baseState,
				baseQueue: So.baseQueue,
				queue: So.queue,
				next: null
			}, Co === null ? M.memoizedState = Co = e : Co = Co.next = e;
		}
		return Co;
	}
	function Ho() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Uo(e) {
		var t = Oo;
		return Oo += 1, ko === null && (ko = []), e = Fa(ko, e, t), t = M, (Co === null ? t.memoizedState : Co.next) === null && (t = t.alternate, w.H = t === null || t.memoizedState === null ? Xs : Zs), e;
	}
	function Wo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Uo(e);
			if (e.$$typeof === ee) return da(e);
		}
		throw Error(o(438, String(e)));
	}
	function Go(e) {
		var t = null, n = M.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = M.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = Ho(), M.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = C;
		return t.index++, n;
	}
	function Ko(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function qo(e) {
		return Jo(Vo(), So, e);
	}
	function Jo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(o(311));
		r.lastRenderedReducer = n;
		var i = e.baseQueue, a = r.pending;
		if (a !== null) {
			if (i !== null) {
				var s = i.next;
				i.next = a.next, a.next = s;
			}
			t.baseQueue = i = a, r.pending = null;
		}
		if (a = e.baseState, i === null) e.memoizedState = a;
		else {
			t = i.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (xo & f) === f : (I & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === j && (d = !0);
					else if ((xo & p) === p) {
						u = u.next, p === j && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = a) : l = l.next = f, M.lanes |= p, au |= p;
					f = u.action, Eo && n(a, f), a = u.hasEagerState ? u.eagerState : n(a, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = a) : l = l.next = p, M.lanes |= f, au |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = a : l.next = c, !Nr(a, e.memoizedState) && (mc = !0, d && (n = xa, n !== null))) throw n;
			e.memoizedState = a, e.baseState = s, e.baseQueue = l, r.lastRenderedState = a;
		}
		return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Yo(e) {
		var t = Vo(), n = t.queue;
		if (n === null) throw Error(o(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, i = n.pending, a = t.memoizedState;
		if (i !== null) {
			n.pending = null;
			var s = i = i.next;
			do
				a = e(a, s.action), s = s.next;
			while (s !== i);
			Nr(a, t.memoizedState) || (mc = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), n.lastRenderedState = a;
		}
		return [a, r];
	}
	function Xo(e, t, n) {
		var r = M, i = Vo(), a = k;
		if (a) {
			if (n === void 0) throw Error(o(407));
			n = n();
		} else n = t();
		var s = !Nr((So || i).memoizedState, n);
		if (s && (i.memoizedState = n, mc = !0), i = i.queue, xs($o.bind(null, r, i, e), [e]), i.getSnapshot !== t || s || Co !== null && Co.memoizedState.tag & 1) {
			if (r.flags |= 2048, gs(9, { destroy: void 0 }, Qo.bind(null, r, i, n, t), null), P === null) throw Error(o(349));
			a || xo & 127 || Zo(r, t, n);
		}
		return n;
	}
	function Zo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = M.updateQueue, t === null ? (t = Ho(), M.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Qo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, es(t) && ts(e);
	}
	function $o(e, t, n) {
		return n(function() {
			es(t) && ts(e);
		});
	}
	function es(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Nr(e, n);
		} catch {
			return !0;
		}
	}
	function ts(e) {
		var t = mi(e, 2);
		t !== null && Ou(t, e, 2);
	}
	function ns(e) {
		var t = Bo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), Eo) {
				Je(!0);
				try {
					n();
				} finally {
					Je(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ko,
			lastRenderedState: e
		}, t;
	}
	function rs(e, t, n, r) {
		return e.baseState = n, Jo(e, So, typeof r == "function" ? r : Ko);
	}
	function is(e, t, n, r, i) {
		if (Ks(e)) throw Error(o(485));
		if (e = t.action, e !== null) {
			var a = {
				payload: i,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					a.listeners.push(e);
				}
			};
			w.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, as(t, a)) : (a.next = n.next, t.pending = n.next = a);
		}
	}
	function as(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = w.T, o = {};
			w.T = o;
			try {
				var s = n(i, r), c = w.S;
				c !== null && c(o, s), os(e, t, s);
			} catch (n) {
				cs(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), w.T = a;
			}
		} else try {
			a = n(i, r), os(e, t, a);
		} catch (n) {
			cs(e, t, n);
		}
	}
	function os(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			ss(e, t, n);
		}, function(n) {
			return cs(e, t, n);
		}) : ss(e, t, n);
	}
	function ss(e, t, n) {
		t.status = "fulfilled", t.value = n, ls(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, as(e, n)));
	}
	function cs(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, ls(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function ls(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function us(e, t) {
		return t;
	}
	function ds(e, t) {
		if (k) {
			var n = P.formState;
			if (n !== null) {
				a: {
					var r = M;
					if (k) {
						if (Wi) {
							b: {
								for (var i = Wi, a = Ki; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = Cf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Wi = Cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Ji(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Bo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: us,
			lastRenderedState: t
		}, n.queue = r, n = Us.bind(null, M, r), r.dispatch = n, r = ns(!1), a = Gs.bind(null, M, !1, r.queue), r = Bo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = is.bind(null, M, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function fs(e) {
		return ps(Vo(), So, e);
	}
	function ps(e, t, n) {
		if (t = Jo(e, t, us)[0], e = qo(Ko)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Uo(t);
		} catch (e) {
			throw e === Aa ? Ma : e;
		}
		else r = t;
		t = Vo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (M.flags |= 2048, gs(9, { destroy: void 0 }, ms.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function ms(e, t) {
		e.action = t;
	}
	function hs(e) {
		var t = Vo(), n = So;
		if (n !== null) return ps(t, n, e);
		Vo(), t = t.memoizedState, n = Vo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function gs(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = M.updateQueue, t === null && (t = Ho(), M.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function _s() {
		return Vo().memoizedState;
	}
	function vs(e, t, n, r) {
		var i = Bo();
		M.flags |= e, i.memoizedState = gs(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function ys(e, t, n, r) {
		var i = Vo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		So !== null && r !== null && Mo(r, So.memoizedState.deps) ? i.memoizedState = gs(t, a, n, r) : (M.flags |= e, i.memoizedState = gs(1 | t, a, n, r));
	}
	function bs(e, t) {
		vs(8390656, 8, e, t);
	}
	function xs(e, t) {
		ys(2048, 8, e, t);
	}
	function Ss(e) {
		M.flags |= 4;
		var t = M.updateQueue;
		if (t === null) t = Ho(), M.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function Cs(e) {
		var t = Vo().memoizedState;
		return Ss({
			ref: t,
			nextImpl: e
		}), function() {
			if (Zl & 2) throw Error(o(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ws(e, t) {
		return ys(4, 2, e, t);
	}
	function Ts(e, t) {
		return ys(4, 4, e, t);
	}
	function Es(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function Ds(e, t, n) {
		n = n == null ? null : n.concat([e]), ys(4, 4, Es.bind(null, t, e), n);
	}
	function Os() {}
	function ks(e, t) {
		var n = Vo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Mo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function As(e, t) {
		var n = Vo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Mo(t, r[1])) return r[0];
		if (r = e(), Eo) {
			Je(!0);
			try {
				e();
			} finally {
				Je(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function js(e, t, n) {
		return n === void 0 || xo & 1073741824 && !(I & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Du(), M.lanes |= e, au |= e, n);
	}
	function Ms(e, t, n, r) {
		return Nr(n, t) ? n : oo.current === null ? !(xo & 42) || xo & 1073741824 && !(I & 261930) ? (mc = !0, e.memoizedState = n) : (e = Du(), M.lanes |= e, au |= e, t) : (e = js(e, n, r), Nr(e, t) || (mc = !0), e);
	}
	function Ns(e, t, n, r, i) {
		var a = T.p;
		T.p = a !== 0 && 8 > a ? a : 8;
		var o = w.T, s = {};
		w.T = s, Gs(e, !1, t, n);
		try {
			var c = i(), l = w.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ws(e, t, wa(c, r), Eu(e)) : Ws(e, t, r, Eu(e));
		} catch (n) {
			Ws(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, Eu());
		} finally {
			T.p = a, o !== null && s.types !== null && (o.types = s.types), w.T = o;
		}
	}
	function Ps() {}
	function Fs(e, t, n, r) {
		if (e.tag !== 5) throw Error(o(476));
		var i = Is(e).queue;
		Ns(e, i, t, fe, n === null ? Ps : function() {
			return Ls(e), n(r);
		});
	}
	function Is(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: fe,
			baseState: fe,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ko,
				lastRenderedState: fe
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ko,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Ls(e) {
		var t = Is(e);
		t.next === null && (t = e.alternate.memoizedState), Ws(e, t.next.queue, {}, Eu());
	}
	function Rs() {
		return da(dp);
	}
	function zs() {
		return Vo().memoizedState;
	}
	function Bs() {
		return Vo().memoizedState;
	}
	function Vs(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = Eu();
					e = Za(n);
					var r = Qa(t, e, n);
					r !== null && (Ou(r, t, n), $a(r, t, n)), t = { cache: va() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Hs(e, t, n) {
		var r = Eu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ks(e) ? qs(t, n) : (n = pi(e, t, n, r), n !== null && (Ou(n, e, r), Js(n, t, r)));
	}
	function Us(e, t, n) {
		Ws(e, t, n, Eu());
	}
	function Ws(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Ks(e)) qs(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Nr(s, o)) return fi(e, t, i, 0), P === null && di(), !1;
			} catch {}
			if (n = pi(e, t, i, r), n !== null) return Ou(n, e, r), Js(n, t, r), !0;
		}
		return !1;
	}
	function Gs(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Td(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ks(e)) {
			if (t) throw Error(o(479));
		} else t = pi(e, n, r, 2), t !== null && Ou(t, e, 2);
	}
	function Ks(e) {
		var t = e.alternate;
		return e === M || t !== null && t === M;
	}
	function qs(e, t) {
		To = wo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Js(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ut(e, n);
		}
	}
	var Ys = {
		readContext: da,
		use: Wo,
		useCallback: jo,
		useContext: jo,
		useEffect: jo,
		useImperativeHandle: jo,
		useLayoutEffect: jo,
		useInsertionEffect: jo,
		useMemo: jo,
		useReducer: jo,
		useRef: jo,
		useState: jo,
		useDebugValue: jo,
		useDeferredValue: jo,
		useTransition: jo,
		useSyncExternalStore: jo,
		useId: jo,
		useHostTransitionStatus: jo,
		useFormState: jo,
		useActionState: jo,
		useOptimistic: jo,
		useMemoCache: jo,
		useCacheRefresh: jo
	};
	Ys.useEffectEvent = jo;
	var Xs = {
		readContext: da,
		use: Wo,
		useCallback: function(e, t) {
			return Bo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: da,
		useEffect: bs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), vs(4194308, 4, Es.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return vs(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			vs(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Bo();
			t = t === void 0 ? null : t;
			var r = e();
			if (Eo) {
				Je(!0);
				try {
					e();
				} finally {
					Je(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Bo();
			if (n !== void 0) {
				var i = n(t);
				if (Eo) {
					Je(!0);
					try {
						n(t);
					} finally {
						Je(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Hs.bind(null, M, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Bo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = ns(e);
			var t = e.queue, n = Us.bind(null, M, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Os,
		useDeferredValue: function(e, t) {
			return js(Bo(), e, t);
		},
		useTransition: function() {
			var e = ns(!1);
			return e = Ns.bind(null, M, e.queue, !0, !1), Bo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = M, i = Bo();
			if (k) {
				if (n === void 0) throw Error(o(407));
				n = n();
			} else {
				if (n = t(), P === null) throw Error(o(349));
				I & 127 || Zo(r, t, n);
			}
			i.memoizedState = n;
			var a = {
				value: n,
				getSnapshot: t
			};
			return i.queue = a, bs($o.bind(null, r, a, e), [e]), r.flags |= 2048, gs(9, { destroy: void 0 }, Qo.bind(null, r, a, n, t), null), n;
		},
		useId: function() {
			var e = Bo(), t = P.identifierPrefix;
			if (k) {
				var n = Ri, r = Li;
				n = (r & ~(1 << 32 - Ye(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Do++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Ao++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Rs,
		useFormState: ds,
		useActionState: ds,
		useOptimistic: function(e) {
			var t = Bo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Gs.bind(null, M, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Go,
		useCacheRefresh: function() {
			return Bo().memoizedState = Vs.bind(null, M);
		},
		useEffectEvent: function(e) {
			var t = Bo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Zl & 2) throw Error(o(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Zs = {
		readContext: da,
		use: Wo,
		useCallback: ks,
		useContext: da,
		useEffect: xs,
		useImperativeHandle: Ds,
		useInsertionEffect: ws,
		useLayoutEffect: Ts,
		useMemo: As,
		useReducer: qo,
		useRef: _s,
		useState: function() {
			return qo(Ko);
		},
		useDebugValue: Os,
		useDeferredValue: function(e, t) {
			return Ms(Vo(), So.memoizedState, e, t);
		},
		useTransition: function() {
			var e = qo(Ko)[0], t = Vo().memoizedState;
			return [typeof e == "boolean" ? e : Uo(e), t];
		},
		useSyncExternalStore: Xo,
		useId: zs,
		useHostTransitionStatus: Rs,
		useFormState: fs,
		useActionState: fs,
		useOptimistic: function(e, t) {
			return rs(Vo(), So, e, t);
		},
		useMemoCache: Go,
		useCacheRefresh: Bs
	};
	Zs.useEffectEvent = Cs;
	var Qs = {
		readContext: da,
		use: Wo,
		useCallback: ks,
		useContext: da,
		useEffect: xs,
		useImperativeHandle: Ds,
		useInsertionEffect: ws,
		useLayoutEffect: Ts,
		useMemo: As,
		useReducer: Yo,
		useRef: _s,
		useState: function() {
			return Yo(Ko);
		},
		useDebugValue: Os,
		useDeferredValue: function(e, t) {
			var n = Vo();
			return So === null ? js(n, e, t) : Ms(n, So.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Yo(Ko)[0], t = Vo().memoizedState;
			return [typeof e == "boolean" ? e : Uo(e), t];
		},
		useSyncExternalStore: Xo,
		useId: zs,
		useHostTransitionStatus: Rs,
		useFormState: hs,
		useActionState: hs,
		useOptimistic: function(e, t) {
			var n = Vo();
			return So === null ? (n.baseState = e, [e, n.queue.dispatch]) : rs(n, So, e, t);
		},
		useMemoCache: Go,
		useCacheRefresh: Bs
	};
	Qs.useEffectEvent = Cs;
	function $s(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : m({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var ec = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = Eu(), i = Za(r);
			i.payload = t, n != null && (i.callback = n), t = Qa(e, i, r), t !== null && (Ou(t, e, r), $a(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = Eu(), i = Za(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Qa(e, i, r), t !== null && (Ou(t, e, r), $a(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = Eu(), r = Za(n);
			r.tag = 2, t != null && (r.callback = t), t = Qa(e, r, n), t !== null && (Ou(t, e, n), $a(t, e, n));
		}
	};
	function tc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Pr(n, r) || !Pr(i, a) : !0;
	}
	function nc(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && ec.enqueueReplaceState(t, t.state, null);
	}
	function rc(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = m({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function ic(e) {
		si(e);
	}
	function ac(e) {
		console.error(e);
	}
	function oc(e) {
		si(e);
	}
	function sc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function cc(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function lc(e, t, n) {
		return n = Za(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			sc(e, t);
		}, n;
	}
	function uc(e) {
		return e = Za(e), e.tag = 3, e;
	}
	function dc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				cc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			cc(t, n, r), typeof i != "function" && (gu === null ? gu = /* @__PURE__ */ new Set([this]) : gu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function fc(e, t, n, r, i) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ca(t, n, i, !0), n = fo.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return po === null ? Bu() : n.alternate === null && iu === 0 && (iu = 3), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Na ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), ad(e, r, i)), !1;
					case 22: return n.flags |= 65536, r === Na ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), ad(e, r, i)), !1;
				}
				throw Error(o(435, n.tag));
			}
			return ad(e, r, i), Bu(), !1;
		}
		if (k) return t = fo.current, t === null ? (r !== qi && (t = Error(o(423), { cause: r }), ea(ki(t, n))), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = ki(r, n), i = lc(e.stateNode, r, i), eo(e, i), iu !== 4 && (iu = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== qi && (e = Error(o(422), { cause: r }), ea(ki(e, n)))), !1;
		var a = Error(o(520), { cause: r });
		if (a = ki(a, n), L === null ? L = [a] : L.push(a), iu !== 4 && (iu = 2), t === null) return !0;
		r = ki(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = lc(n.stateNode, r, e), eo(n, e), !1;
				case 1: if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (gu === null || !gu.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = uc(i), dc(i, e, n, r), eo(n, i), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var pc = Error(o(461)), mc = !1;
	function hc(e, t, n, r) {
		t.child = e === null ? qa(t, null, n, r) : Ka(t, e.child, n, r);
	}
	function gc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return ua(t), r = No(e, t, n, o, a, i), s = Lo(), e !== null && !mc ? (Ro(e, t, i), Bc(e, t, i)) : (k && s && Vi(t), t.flags |= 1, hc(e, t, r, i), t.child);
	}
	function _c(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !bi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, vc(e, t, a, r, i)) : (e = Ci(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Vc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Pr : n, n(o, r) && e.ref === t.ref) return Bc(e, t, i);
		}
		return t.flags |= 1, e = xi(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function vc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Pr(a, r) && e.ref === t.ref) if (mc = !1, t.pendingProps = r = a, Vc(e, i)) e.flags & 131072 && (mc = !0);
			else return t.lanes = e.lanes, Bc(e, t, i);
		}
		return Ec(e, t, n, r, i);
	}
	function yc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return xc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Oa(t, a === null ? null : a.cachePool), a === null ? lo() : co(t, a), go(t);
			else return r = t.lanes = 536870912, xc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Oa(t, null), lo(), _o(t)) : (Oa(t, a.cachePool), co(t, a), _o(t), t.memoizedState = null);
		return hc(e, t, i, n), t.child;
	}
	function bc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function xc(e, t, n, r, i) {
		var a = Da();
		return a = a === null ? null : {
			parent: _a._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Oa(t, null), lo(), go(t), e !== null && ca(e, t, r, !0), t.childLanes = i, null;
	}
	function Sc(e, t) {
		return t = Fc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Cc(e, t, n) {
		return Ka(t, e.child, null, n), e = Sc(t, t.pendingProps), e.flags |= 2, vo(t), t.memoizedState = null, e;
	}
	function wc(e, t, n) {
		var r = t.pendingProps, i = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (k) {
				if (r.mode === "hidden") return e = Sc(t, r), t.lanes = 536870912, bc(null, e);
				if (ho(t), (e = Wi) ? (e = yf(e, Ki), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ii === null ? null : {
						id: Li,
						overflow: Ri
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ei(e), n.return = t, t.child = n, O = t, Wi = null)) : e = null, e === null) throw Ji(t);
				return t.lanes = 536870912, null;
			}
			return Sc(t, r);
		}
		var a = e.memoizedState;
		if (a !== null) {
			var s = a.dehydrated;
			if (ho(t), i) if (t.flags & 256) t.flags &= -257, t = Cc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(o(558));
			else if (mc || ca(e, t, n, !1), i = (n & e.childLanes) !== 0, mc || i) {
				if (r = P, r !== null && (s = dt(r, n), s !== 0 && s !== a.retryLane)) throw a.retryLane = s, mi(e, s), Ou(r, e, s), pc;
				Bu(), t = Cc(e, t, n);
			} else e = a.treeContext, Wi = Cf(s.nextSibling), O = t, k = !0, Gi = null, Ki = !1, e !== null && Ui(t, e), t = Sc(t, r), t.flags |= 4096;
			return t;
		}
		return e = xi(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function Tc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(o(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function Ec(e, t, n, r, i) {
		return ua(t), n = No(e, t, n, r, void 0, i), r = Lo(), e !== null && !mc ? (Ro(e, t, i), Bc(e, t, i)) : (k && r && Vi(t), t.flags |= 1, hc(e, t, n, i), t.child);
	}
	function Dc(e, t, n, r, i, a) {
		return ua(t), t.updateQueue = null, n = Fo(t, r, n, i), Po(e), r = Lo(), e !== null && !mc ? (Ro(e, t, a), Bc(e, t, a)) : (k && r && Vi(t), t.flags |= 1, hc(e, t, n, a), t.child);
	}
	function Oc(e, t, n, r, i) {
		if (ua(t), t.stateNode === null) {
			var a = _i, o = n.contextType;
			typeof o == "object" && o && (a = da(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = ec, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ya(t), o = n.contextType, a.context = typeof o == "object" && o ? da(o) : _i, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && ($s(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && ec.enqueueReplaceState(a, a.state, null), ro(t, r, a, i), no(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = rc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = _i, typeof u == "object" && u && (o = da(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && nc(t, a, r, o), Ja = !1;
			var f = t.memoizedState;
			a.state = f, ro(t, r, a, i), no(), l = t.memoizedState, s || f !== l || Ja ? (typeof d == "function" && ($s(t, n, d, r), l = t.memoizedState), (c = Ja || tc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Xa(e, t), o = t.memoizedProps, u = rc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = _i, typeof l == "object" && l && (c = da(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && nc(t, a, r, c), Ja = !1, f = t.memoizedState, a.state = f, ro(t, r, a, i), no();
			var p = t.memoizedState;
			o !== d || f !== p || Ja || e !== null && e.dependencies !== null && la(e.dependencies) ? (typeof s == "function" && ($s(t, n, s, r), p = t.memoizedState), (u = Ja || tc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && la(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, Tc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ka(t, e.child, null, i), t.child = Ka(t, null, n, i)) : hc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Bc(e, t, i), e;
	}
	function kc(e, t, n, r) {
		return Qi(), t.flags |= 256, hc(e, t, n, r), t.child;
	}
	var Ac = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function jc(e) {
		return {
			baseLanes: e,
			cachePool: ka()
		};
	}
	function Mc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= cu), e;
	}
	function Nc(e, t, n) {
		var r = t.pendingProps, i = !1, a = (t.flags & 128) != 0, s;
		if ((s = a) || (s = e !== null && e.memoizedState === null ? !1 : (yo.current & 2) != 0), s && (i = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (k) {
				if (i ? mo(t) : _o(t), (e = Wi) ? (e = yf(e, Ki), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ii === null ? null : {
						id: Li,
						overflow: Ri
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ei(e), n.return = t, t.child = n, O = t, Wi = null)) : e = null, e === null) throw Ji(t);
				return xf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, i ? (_o(t), i = t.mode, c = Fc({
				mode: "hidden",
				children: c
			}, i), r = wi(r, i, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = jc(n), r.childLanes = Mc(e, s, n), t.memoizedState = Ac, bc(null, r)) : (mo(t), Pc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (a) t.flags & 256 ? (mo(t), t.flags &= -257, t = Ic(e, t, n)) : t.memoizedState === null ? (_o(t), c = r.fallback, i = t.mode, r = Fc({
				mode: "visible",
				children: r.children
			}, i), c = wi(c, i, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ka(t, e.child, null, n), r = t.child, r.memoizedState = jc(n), r.childLanes = Mc(e, s, n), t.memoizedState = Ac, t = bc(null, r)) : (_o(t), t.child = e.child, t.flags |= 128, t = null);
			else if (mo(t), xf(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(o(419)), r.stack = "", r.digest = s, ea({
					value: r,
					source: null,
					stack: null
				}), t = Ic(e, t, n);
			} else if (mc || ca(e, t, n, !1), s = (n & e.childLanes) !== 0, mc || s) {
				if (s = P, s !== null && (r = dt(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, mi(e, r), Ou(s, e, r), pc;
				bf(c) || Bu(), t = Ic(e, t, n);
			} else bf(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Wi = Cf(c.nextSibling), O = t, k = !0, Gi = null, Ki = !1, e !== null && Ui(t, e), t = Pc(t, r.children), t.flags |= 4096);
			return t;
		}
		return i ? (_o(t), c = r.fallback, i = t.mode, l = e.child, u = l.sibling, r = xi(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = wi(c, i, n, null), c.flags |= 2) : c = xi(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, bc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = jc(n) : (i = c.cachePool, i === null ? i = ka() : (l = _a._currentValue, i = i.parent === l ? i : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: i
		}), r.memoizedState = c, r.childLanes = Mc(e, s, n), t.memoizedState = Ac, bc(e.child, r)) : (mo(t), n = e.child, e = n.sibling, n = xi(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Pc(e, t) {
		return t = Fc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Fc(e, t) {
		return e = yi(22, e, null, t), e.lanes = 0, e;
	}
	function Ic(e, t, n) {
		return Ka(t, e.child, null, n), e = Pc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Lc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), oa(e.return, t, n);
	}
	function Rc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function zc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = yo.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, _e(yo, o), hc(e, t, r, n), r = k ? Ni : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Lc(e, n, t);
			else if (e.tag === 19) Lc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && bo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Rc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && bo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Rc(t, !0, n, null, a, r);
				break;
			case "together":
				Rc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Bc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), au |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (ca(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(o(153));
		if (t.child !== null) {
			for (e = t.child, n = xi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = xi(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Vc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && la(e))) : !0;
	}
	function Hc(e, t, n) {
		switch (t.tag) {
			case 3:
				Se(t, t.stateNode.containerInfo), ia(t, _a, e.memoizedState.cache), Qi();
				break;
			case 27:
			case 5:
				we(t);
				break;
			case 4:
				Se(t, t.stateNode.containerInfo);
				break;
			case 10:
				ia(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, ho(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (mo(t), e = Bc(e, t, n), e === null ? null : e.sibling) : Nc(e, t, n) : (mo(t), t.flags |= 128, null);
				mo(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (ca(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return zc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), _e(yo, yo.current), r) break;
				return null;
			case 22: return t.lanes = 0, yc(e, t, n, t.pendingProps);
			case 24: ia(t, _a, e.memoizedState.cache);
		}
		return Bc(e, t, n);
	}
	function Uc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) mc = !0;
		else {
			if (!Vc(e, n) && !(t.flags & 128)) return mc = !1, Hc(e, t, n);
			mc = !!(e.flags & 131072);
		}
		else mc = !1, k && t.flags & 1048576 && Bi(t, Ni, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Ia(t.elementType), t.type = e, typeof e == "function") bi(e) ? (r = rc(e, r), t.tag = 1, t = Oc(null, t, e, r, n)) : (t.tag = 0, t = Ec(null, t, e, r, n));
					else {
						if (e != null) {
							var i = e.$$typeof;
							if (i === te) {
								t.tag = 11, t = gc(null, t, e, r, n);
								break a;
							} else if (i === ie) {
								t.tag = 14, t = _c(null, t, e, r, n);
								break a;
							}
						}
						throw t = ue(e) || e, Error(o(306, t, ""));
					}
				}
				return t;
			case 0: return Ec(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, i = rc(r, t.pendingProps), Oc(e, t, r, i, n);
			case 3:
				a: {
					if (Se(t, t.stateNode.containerInfo), e === null) throw Error(o(387));
					r = t.pendingProps;
					var a = t.memoizedState;
					i = a.element, Xa(e, t), ro(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, ia(t, _a, r), r !== a.cache && sa(t, [_a], n, !0), no(), r = s.element, a.isDehydrated) if (a = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
						t = kc(e, t, r, n);
						break a;
					} else if (r !== i) {
						i = ki(Error(o(424)), t), ea(i), t = kc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Wi = Cf(e.firstChild), O = t, k = !0, Gi = null, Ki = !0, n = qa(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Qi(), r === i) {
							t = Bc(e, t, n);
							break a;
						}
						hc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return Tc(e, t), e === null ? (n = Uf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : k || (n = t.type, e = t.pendingProps, r = tf(be.current).createElement(n), r[_t] = t, r[vt] = e, Yd(r, n, e), At(r), t.stateNode = r) : t.memoizedState = Uf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return we(t), e === null && k && (r = t.stateNode = Df(t.type, t.pendingProps, be.current), O = t, Ki = !0, i = Wi, pf(t.type) ? (wf = i, Wi = Cf(r.firstChild)) : Wi = i), hc(e, t, t.pendingProps.children, n), Tc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && k && ((i = r = Wi) && (r = _f(r, t.type, t.pendingProps, Ki), r === null ? i = !1 : (t.stateNode = r, O = t, Wi = Cf(r.firstChild), Ki = !1, i = !0)), i || Ji(t)), we(t), i = t.type, a = t.pendingProps, s = e === null ? null : e.memoizedProps, r = a.children, af(i, a) ? r = null : s !== null && af(i, s) && (t.flags |= 32), t.memoizedState !== null && (i = No(e, t, Io, null, null, n), dp._currentValue = i), Tc(e, t), hc(e, t, r, n), t.child;
			case 6: return e === null && k && ((e = n = Wi) && (n = vf(n, t.pendingProps, Ki), n === null ? e = !1 : (t.stateNode = n, O = t, Wi = null, e = !0)), e || Ji(t)), null;
			case 13: return Nc(e, t, n);
			case 4: return Se(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ka(t, null, r, n) : hc(e, t, r, n), t.child;
			case 11: return gc(e, t, t.type, t.pendingProps, n);
			case 7: return hc(e, t, t.pendingProps, n), t.child;
			case 8: return hc(e, t, t.pendingProps.children, n), t.child;
			case 12: return hc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, ia(t, t.type, r.value), hc(e, t, r.children, n), t.child;
			case 9: return i = t.type._context, r = t.pendingProps.children, ua(t), i = da(i), r = r(i), t.flags |= 1, hc(e, t, r, n), t.child;
			case 14: return _c(e, t, t.type, t.pendingProps, n);
			case 15: return vc(e, t, t.type, t.pendingProps, n);
			case 19: return zc(e, t, n);
			case 31: return wc(e, t, n);
			case 22: return yc(e, t, n, t.pendingProps);
			case 24: return ua(t), r = da(_a), e === null ? (i = Da(), i === null && (i = P, a = va(), i.pooledCache = a, a.refCount++, a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
				parent: r,
				cache: i
			}, Ya(t), ia(t, _a, i)) : ((e.lanes & n) !== 0 && (Xa(e, t), ro(t, null, null, n), no()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, ia(t, _a, r), r !== i.cache && sa(t, [_a], n, !0)) : (i = {
				parent: r,
				cache: r
			}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), ia(t, _a, r))), hc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(o(156, t.tag));
	}
	function Wc(e) {
		e.flags |= 4;
	}
	function Gc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Lu()) e.flags |= 8192;
			else throw La = Na, ja;
		} else e.flags &= -16777217;
	}
	function Kc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !rp(t)) if (Lu()) e.flags |= 8192;
		else throw La = Na, ja;
	}
	function qc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : D(), e.lanes |= t, lu |= t);
	}
	function Jc(e, t) {
		if (!k) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function Yc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Xc(e, t, n) {
		var r = t.pendingProps;
		switch (Hi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Yc(t), null;
			case 1: return Yc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), aa(_a), Ce(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Zi(t) ? Wc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, $i())), Yc(t), null;
			case 26:
				var i = t.type, a = t.memoizedState;
				return e === null ? (Wc(t), a === null ? (Yc(t), Gc(t, i, null, r, n)) : (Yc(t), Kc(t, a))) : a ? a === e.memoizedState ? (Yc(t), t.flags &= -16777217) : (Wc(t), Yc(t), Kc(t, a)) : (e = e.memoizedProps, e !== r && Wc(t), Yc(t), Gc(t, i, e, r, n)), null;
			case 27:
				if (E(t), n = be.current, i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Wc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(o(166));
						return Yc(t), null;
					}
					e = ve.current, Zi(t) ? Yi(t, e) : (e = Df(i, r, n), t.stateNode = e, Wc(t));
				}
				return Yc(t), null;
			case 5:
				if (E(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Wc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(o(166));
						return Yc(t), null;
					}
					if (a = ve.current, Zi(t)) Yi(t, a);
					else {
						var s = tf(be.current);
						switch (a) {
							case 1:
								a = s.createElementNS("http://www.w3.org/2000/svg", i);
								break;
							case 2:
								a = s.createElementNS("http://www.w3.org/1998/Math/MathML", i);
								break;
							default: switch (i) {
								case "svg":
									a = s.createElementNS("http://www.w3.org/2000/svg", i);
									break;
								case "math":
									a = s.createElementNS("http://www.w3.org/1998/Math/MathML", i);
									break;
								case "script":
									a = s.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild);
									break;
								case "select":
									a = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? a.multiple = !0 : r.size && (a.size = r.size);
									break;
								default: a = typeof r.is == "string" ? s.createElement(i, { is: r.is }) : s.createElement(i);
							}
						}
						a[_t] = t, a[vt] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) a.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = a;
						a: switch (Yd(a, i, r), i) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Wc(t);
					}
				}
				return Yc(t), Gc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Wc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(o(166));
					if (e = be.current, Zi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, i = O, i !== null) switch (i.tag) {
							case 27:
							case 5: r = i.memoizedProps;
						}
						e[_t] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Kd(e.nodeValue, n)), e || Ji(t, !0);
					} else e = tf(e).createTextNode(r), e[_t] = t, t.stateNode = e;
				}
				return Yc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Zi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(o(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(o(557));
							e[_t] = t;
						} else Qi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Yc(t), e = !1;
					} else n = $i(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (vo(t), t) : (vo(t), null);
					if (t.flags & 128) throw Error(o(558));
				}
				return Yc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (i = Zi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!i) throw Error(o(318));
							if (i = t.memoizedState, i = i === null ? null : i.dehydrated, !i) throw Error(o(317));
							i[_t] = t;
						} else Qi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Yc(t), i = !1;
					} else i = $i(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
					if (!i) return t.flags & 256 ? (vo(t), t) : (vo(t), null);
				}
				return vo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), qc(t, t.updateQueue), Yc(t), null);
			case 4: return Ce(), e === null && Id(t.stateNode.containerInfo), Yc(t), null;
			case 10: return aa(t.type), Yc(t), null;
			case 19:
				if (ge(yo), r = t.memoizedState, r === null) return Yc(t), null;
				if (i = (t.flags & 128) != 0, a = r.rendering, a === null) if (i) Jc(r, !1);
				else {
					if (iu !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (a = bo(e), a !== null) {
							for (t.flags |= 128, Jc(r, !1), e = a.updateQueue, t.updateQueue = e, qc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Si(n, e), n = n.sibling;
							return _e(yo, yo.current & 1 | 2), k && zi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && Le() > mu && (t.flags |= 128, i = !0, Jc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!i) if (e = bo(a), e !== null) {
						if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, qc(t, e), Jc(r, !0), r.tail === null && r.tailMode === "hidden" && !a.alternate && !k) return Yc(t), null;
					} else 2 * Le() - r.renderingStartTime > mu && n !== 536870912 && (t.flags |= 128, i = !0, Jc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (a.sibling = t.child, t.child = a) : (e = r.last, e === null ? t.child = a : e.sibling = a, r.last = a);
				}
				return r.tail === null ? (Yc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Le(), e.sibling = null, n = yo.current, _e(yo, i ? n & 1 | 2 : n & 1), k && zi(t, r.treeForkCount), e);
			case 22:
			case 23: return vo(t), uo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Yc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Yc(t), n = t.updateQueue, n !== null && qc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && ge(Ea), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), aa(_a), Yc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(o(156, t.tag));
	}
	function Zc(e, t) {
		switch (Hi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return aa(_a), Ce(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return E(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (vo(t), t.alternate === null) throw Error(o(340));
					Qi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (vo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(o(340));
					Qi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return ge(yo), null;
			case 4: return Ce(), null;
			case 10: return aa(t.type), null;
			case 22:
			case 23: return vo(t), uo(), e !== null && ge(Ea), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return aa(_a), null;
			case 25: return null;
			default: return null;
		}
	}
	function Qc(e, t) {
		switch (Hi(t), t.tag) {
			case 3:
				aa(_a), Ce();
				break;
			case 26:
			case 27:
			case 5:
				E(t);
				break;
			case 4:
				Ce();
				break;
			case 31:
				t.memoizedState !== null && vo(t);
				break;
			case 13:
				vo(t);
				break;
			case 19:
				ge(yo);
				break;
			case 10:
				aa(t.type);
				break;
			case 22:
			case 23:
				vo(t), uo(), e !== null && ge(Ea);
				break;
			case 24: aa(_a);
		}
	}
	function $c(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			id(t, t.return, e);
		}
	}
	function el(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								id(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			id(t, t.return, e);
		}
	}
	function tl(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				ao(t, n);
			} catch (t) {
				id(e, e.return, t);
			}
		}
	}
	function nl(e, t, n) {
		n.props = rc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			id(e, t, n);
		}
	}
	function rl(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			id(e, t, n);
		}
	}
	function il(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			id(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			id(e, t, n);
		}
		else n.current = null;
	}
	function al(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			id(e, e.return, t);
		}
	}
	function ol(e, t, n) {
		try {
			var r = e.stateNode;
			Xd(r, e.type, n, t), r[vt] = t;
		} catch (t) {
			id(e, e.return, t);
		}
	}
	function sl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && pf(e.type) || e.tag === 4;
	}
	function cl(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || sl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && pf(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function ll(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = dn));
		else if (r !== 4 && (r === 27 && pf(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (ll(e, t, n), e = e.sibling; e !== null;) ll(e, t, n), e = e.sibling;
	}
	function ul(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && pf(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (ul(e, t, n), e = e.sibling; e !== null;) ul(e, t, n), e = e.sibling;
	}
	function dl(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Yd(t, r, n), t[_t] = e, t[vt] = n;
		} catch (t) {
			id(e, e.return, t);
		}
	}
	var fl = !1, pl = !1, ml = !1, hl = typeof WeakSet == "function" ? WeakSet : Set, gl = null;
	function _l(e, t) {
		if (e = e.containerInfo, $d = bp, e = Rr(e), zr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var i = r.anchorOffset, a = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, a.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || i !== 0 && f.nodeType !== 3 || (c = s + i), f !== a || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === i && (c = s), p === a && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (ef = {
			focusedElem: e,
			selectionRange: n
		}, bp = !1, gl = t; gl !== null;) if (t = gl, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, gl = e;
		else for (; gl !== null;) {
			switch (t = gl, a = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) i = e[n], i.ref.impl = i.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && a !== null) {
						e = void 0, n = t, i = a.memoizedProps, a = a.memoizedState, r = n.stateNode;
						try {
							var h = rc(n.type, i);
							e = r.getSnapshotBeforeUpdate(h, a), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							id(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) gf(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								gf(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(o(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, gl = e;
				break;
			}
			gl = t.return;
		}
	}
	function vl(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				Nl(e, n), r & 4 && $c(5, n);
				break;
			case 1:
				if (Nl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					id(n, n.return, e);
				}
				else {
					var i = rc(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						id(n, n.return, e);
					}
				}
				r & 64 && tl(n), r & 512 && rl(n, n.return);
				break;
			case 3:
				if (Nl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						ao(e, t);
					} catch (e) {
						id(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && dl(n);
			case 26:
			case 5:
				Nl(e, n), t === null && r & 4 && al(n), r & 512 && rl(n, n.return);
				break;
			case 12:
				Nl(e, n);
				break;
			case 31:
				Nl(e, n), r & 4 && wl(e, n);
				break;
			case 13:
				Nl(e, n), r & 4 && Tl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = cd.bind(null, n), Sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || fl, !r) {
					t = t !== null && t.memoizedState !== null || pl, i = fl;
					var a = pl;
					fl = r, (pl = t) && !a ? Fl(e, n, (n.subtreeFlags & 8772) != 0) : Nl(e, n), fl = i, pl = a;
				}
				break;
			case 30: break;
			default: Nl(e, n);
		}
	}
	function yl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, yl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Tt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var bl = null, xl = !1;
	function Sl(e, t, n) {
		for (n = n.child; n !== null;) Cl(e, t, n), n = n.sibling;
	}
	function Cl(e, t, n) {
		if (qe && typeof qe.onCommitFiberUnmount == "function") try {
			qe.onCommitFiberUnmount(Ke, n);
		} catch {}
		switch (n.tag) {
			case 26:
				pl || il(n, t), Sl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				pl || il(n, t);
				var r = bl, i = xl;
				pf(n.type) && (bl = n.stateNode, xl = !1), Sl(e, t, n), Of(n.stateNode), bl = r, xl = i;
				break;
			case 5: pl || il(n, t);
			case 6:
				if (r = bl, i = xl, bl = null, Sl(e, t, n), bl = r, xl = i, bl !== null) if (xl) try {
					(bl.nodeType === 9 ? bl.body : bl.nodeName === "HTML" ? bl.ownerDocument.body : bl).removeChild(n.stateNode);
				} catch (e) {
					id(n, t, e);
				}
				else try {
					bl.removeChild(n.stateNode);
				} catch (e) {
					id(n, t, e);
				}
				break;
			case 18:
				bl !== null && (xl ? (e = bl, mf(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Kp(e)) : mf(bl, n.stateNode));
				break;
			case 4:
				r = bl, i = xl, bl = n.stateNode.containerInfo, xl = !0, Sl(e, t, n), bl = r, xl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				el(2, n, t), pl || el(4, n, t), Sl(e, t, n);
				break;
			case 1:
				pl || (il(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && nl(n, t, r)), Sl(e, t, n);
				break;
			case 21:
				Sl(e, t, n);
				break;
			case 22:
				pl = (r = pl) || n.memoizedState !== null, Sl(e, t, n), pl = r;
				break;
			default: Sl(e, t, n);
		}
	}
	function wl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Kp(e);
			} catch (e) {
				id(t, t.return, e);
			}
		}
	}
	function Tl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Kp(e);
		} catch (e) {
			id(t, t.return, e);
		}
	}
	function El(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new hl()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new hl()), t;
			default: throw Error(o(435, e.tag));
		}
	}
	function Dl(e, t) {
		var n = El(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = ld.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function Ol(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r], a = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (pf(c.type)) {
							bl = c.stateNode, xl = !1;
							break a;
						}
						break;
					case 5:
						bl = c.stateNode, xl = !1;
						break a;
					case 3:
					case 4:
						bl = c.stateNode.containerInfo, xl = !0;
						break a;
				}
				c = c.return;
			}
			if (bl === null) throw Error(o(160));
			Cl(a, s, i), bl = null, xl = !1, a = i.alternate, a !== null && (a.return = null), i.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Al(t, e), t = t.sibling;
	}
	var kl = null;
	function Al(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				Ol(t, e), jl(e), r & 4 && (el(3, e, e.return), $c(3, e), el(5, e, e.return));
				break;
			case 1:
				Ol(t, e), jl(e), r & 512 && (pl || n === null || il(n, n.return)), r & 64 && fl && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var i = kl;
				if (Ol(t, e), jl(e), r & 512 && (pl || n === null || il(n, n.return)), r & 4) {
					var a = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, i = i.ownerDocument || i;
							b: switch (r) {
								case "title":
									a = i.getElementsByTagName("title")[0], (!a || a[wt] || a[_t] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = i.createElement(r), i.head.insertBefore(a, i.querySelector("head > title"))), Yd(a, r, n), a[_t] = e, At(a), r = a;
									break a;
								case "link":
									var s = ep("link", "href", i).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (a = s[c], a.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && a.getAttribute("rel") === (n.rel == null ? null : n.rel) && a.getAttribute("title") === (n.title == null ? null : n.title) && a.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									a = i.createElement(r), Yd(a, r, n), i.head.appendChild(a);
									break;
								case "meta":
									if (s = ep("meta", "content", i).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (a = s[c], a.getAttribute("content") === (n.content == null ? null : "" + n.content) && a.getAttribute("name") === (n.name == null ? null : n.name) && a.getAttribute("property") === (n.property == null ? null : n.property) && a.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && a.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									a = i.createElement(r), Yd(a, r, n), i.head.appendChild(a);
									break;
								default: throw Error(o(468, r));
							}
							a[_t] = e, At(a), r = a;
						}
						e.stateNode = r;
					} else tp(i, e.type, e.stateNode);
					else e.stateNode = Yf(i, r, e.memoizedProps);
					else a === r ? r === null && e.stateNode !== null && ol(e, e.memoizedProps, n.memoizedProps) : (a === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : a.count--, r === null ? tp(i, e.type, e.stateNode) : Yf(i, r, e.memoizedProps));
				}
				break;
			case 27:
				Ol(t, e), jl(e), r & 512 && (pl || n === null || il(n, n.return)), n !== null && r & 4 && ol(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (Ol(t, e), jl(e), r & 512 && (pl || n === null || il(n, n.return)), e.flags & 32) {
					i = e.stateNode;
					try {
						nn(i, "");
					} catch (t) {
						id(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (i = e.memoizedProps, ol(e, i, n === null ? i : n.memoizedProps)), r & 1024 && (ml = !0);
				break;
			case 6:
				if (Ol(t, e), jl(e), r & 4) {
					if (e.stateNode === null) throw Error(o(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						id(e, e.return, t);
					}
				}
				break;
			case 3:
				if ($f = null, i = kl, kl = z(t.containerInfo), Ol(t, e), kl = i, jl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Kp(t.containerInfo);
				} catch (t) {
					id(e, e.return, t);
				}
				ml && (ml = !1, Ml(e));
				break;
			case 4:
				r = kl, kl = z(e.stateNode.containerInfo), Ol(t, e), jl(e), kl = r;
				break;
			case 12:
				Ol(t, e), jl(e);
				break;
			case 31:
				Ol(t, e), jl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Dl(e, r)));
				break;
			case 13:
				Ol(t, e), jl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (fu = Le()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Dl(e, r)));
				break;
			case 22:
				i = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = fl, d = pl;
				if (fl = u || i, pl = d || l, Ol(t, e), pl = d, fl = u, jl(e), r & 8192) a: for (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, i && (n === null || l || fl || pl || Pl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (a = l.stateNode, i) s = a.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								id(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = i ? "" : l.memoizedProps;
							} catch (e) {
								id(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								i ? hf(m, !0) : hf(l.stateNode, !1);
							} catch (e) {
								id(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, Dl(e, n))));
				break;
			case 19:
				Ol(t, e), jl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Dl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: Ol(t, e), jl(e);
		}
	}
	function jl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (sl(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(o(160));
				switch (n.tag) {
					case 27:
						var i = n.stateNode;
						ul(e, cl(e), i);
						break;
					case 5:
						var a = n.stateNode;
						n.flags & 32 && (nn(a, ""), n.flags &= -33), ul(e, cl(e), a);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						ll(e, cl(e), s);
						break;
					default: throw Error(o(161));
				}
			} catch (t) {
				id(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Ml(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Ml(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function Nl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) vl(e, t.alternate, t), t = t.sibling;
	}
	function Pl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					el(4, t, t.return), Pl(t);
					break;
				case 1:
					il(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && nl(t, t.return, n), Pl(t);
					break;
				case 27: Of(t.stateNode);
				case 26:
				case 5:
					il(t, t.return), Pl(t);
					break;
				case 22:
					t.memoizedState === null && Pl(t);
					break;
				case 30:
					Pl(t);
					break;
				default: Pl(t);
			}
			e = e.sibling;
		}
	}
	function Fl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Fl(i, a, n), $c(4, a);
					break;
				case 1:
					if (Fl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						id(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) io(c[i], s);
						} catch (e) {
							id(r, r.return, e);
						}
					}
					n && o & 64 && tl(a), rl(a, a.return);
					break;
				case 27: dl(a);
				case 26:
				case 5:
					Fl(i, a, n), n && r === null && o & 4 && al(a), rl(a, a.return);
					break;
				case 12:
					Fl(i, a, n);
					break;
				case 31:
					Fl(i, a, n), n && o & 4 && wl(i, a);
					break;
				case 13:
					Fl(i, a, n), n && o & 4 && Tl(i, a);
					break;
				case 22:
					a.memoizedState === null && Fl(i, a, n), rl(a, a.return);
					break;
				case 30: break;
				default: Fl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Il(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ya(n));
	}
	function Ll(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ya(e));
	}
	function Rl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) zl(e, t, n, r), t = t.sibling;
	}
	function zl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Rl(e, t, n, r), i & 2048 && $c(9, t);
				break;
			case 1:
				Rl(e, t, n, r);
				break;
			case 3:
				Rl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ya(e)));
				break;
			case 12:
				if (i & 2048) {
					Rl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						id(t, t.return, e);
					}
				} else Rl(e, t, n, r);
				break;
			case 31:
				Rl(e, t, n, r);
				break;
			case 13:
				Rl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? Rl(e, t, n, r) : (a._visibility |= 2, N(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? Rl(e, t, n, r) : Bl(e, t), i & 2048 && Il(o, t);
				break;
			case 24:
				Rl(e, t, n, r), i & 2048 && Ll(t.alternate, t);
				break;
			default: Rl(e, t, n, r);
		}
	}
	function N(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					N(a, o, s, c, i), $c(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, N(a, o, s, c, i)) : u._visibility & 2 ? N(a, o, s, c, i) : Bl(a, o), i && l & 2048 && Il(o.alternate, o);
					break;
				case 24:
					N(a, o, s, c, i), i && l & 2048 && Ll(o.alternate, o);
					break;
				default: N(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Bl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Bl(n, r), i & 2048 && Il(r.alternate, r);
					break;
				case 24:
					Bl(n, r), i & 2048 && Ll(r.alternate, r);
					break;
				default: Bl(n, r);
			}
			t = t.sibling;
		}
	}
	var Vl = 8192;
	function Hl(e, t, n) {
		if (e.subtreeFlags & Vl) for (e = e.child; e !== null;) Ul(e, t, n), e = e.sibling;
	}
	function Ul(e, t, n) {
		switch (e.tag) {
			case 26:
				Hl(e, t, n), e.flags & Vl && e.memoizedState !== null && ip(n, kl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Hl(e, t, n);
				break;
			case 3:
			case 4:
				var r = kl;
				kl = z(e.stateNode.containerInfo), Hl(e, t, n), kl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Vl, Vl = 16777216, Hl(e, t, n), Vl = r) : Hl(e, t, n));
				break;
			default: Hl(e, t, n);
		}
	}
	function Wl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Gl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				gl = r, Jl(r, e);
			}
			Wl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Kl(e), e = e.sibling;
	}
	function Kl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Gl(e), e.flags & 2048 && el(9, e, e.return);
				break;
			case 3:
				Gl(e);
				break;
			case 12:
				Gl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, ql(e)) : Gl(e);
				break;
			default: Gl(e);
		}
	}
	function ql(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				gl = r, Jl(r, e);
			}
			Wl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					el(8, t, t.return), ql(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, ql(t));
					break;
				default: ql(t);
			}
			e = e.sibling;
		}
	}
	function Jl(e, t) {
		for (; gl !== null;) {
			var n = gl;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					el(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: ya(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, gl = r;
			else a: for (n = e; gl !== null;) {
				r = gl;
				var i = r.sibling, a = r.return;
				if (yl(r), r === n) {
					gl = null;
					break a;
				}
				if (i !== null) {
					i.return = a, gl = i;
					break a;
				}
				gl = a;
			}
		}
	}
	var Yl = {
		getCacheForType: function(e) {
			var t = da(_a), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return da(_a).controller.signal;
		}
	}, Xl = typeof WeakMap == "function" ? WeakMap : Map, Zl = 0, P = null, F = null, I = 0, Ql = 0, $l = null, eu = !1, tu = !1, nu = !1, ru = 0, iu = 0, au = 0, ou = 0, su = 0, cu = 0, lu = 0, L = null, uu = null, du = !1, fu = 0, pu = 0, mu = Infinity, hu = null, gu = null, _u = 0, vu = null, yu = null, bu = 0, xu = 0, Su = null, Cu = null, wu = 0, Tu = null;
	function Eu() {
		return Zl & 2 && I !== 0 ? I & -I : w.T === null ? mt() : Td();
	}
	function Du() {
		if (cu === 0) if (!(I & 536870912) || k) {
			var e = et;
			et <<= 1, !(et & 3932160) && (et = 262144), cu = e;
		} else cu = 536870912;
		return e = fo.current, e !== null && (e.flags |= 32), cu;
	}
	function Ou(e, t, n) {
		(e === P && (Ql === 2 || Ql === 9) || e.cancelPendingCommit !== null) && (Fu(e, 0), Mu(e, I, cu, !1)), st(e, n), (!(Zl & 2) || e !== P) && (e === P && (!(Zl & 2) && (ou |= n), iu === 4 && Mu(e, I, cu, !1)), _d(e));
	}
	function ku(e, t, n) {
		if (Zl & 6) throw Error(o(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || it(e, t), i = r ? Uu(e, t) : Vu(e, t, !0), a = r;
		do {
			if (i === 0) {
				tu && !r && Mu(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, a && !ju(n)) {
					i = Vu(e, t, !1), a = !1;
					continue;
				}
				if (i === 2) {
					if (a = t, e.errorRecoveryDisabledLanes & a) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							i = L;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Fu(c, s).flags |= 256), s = Vu(c, s, !1), s !== 2) {
								if (nu && !l) {
									c.errorRecoveryDisabledLanes |= a, ou |= a, i = 4;
									break a;
								}
								a = uu, uu = i, a !== null && (uu === null ? uu = a : uu.push.apply(uu, a));
							}
							i = s;
						}
						if (a = !1, i !== 2) continue;
					}
				}
				if (i === 1) {
					Fu(e, 0), Mu(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, a = i, a) {
						case 0:
						case 1: throw Error(o(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							Mu(r, t, cu, !eu);
							break a;
						case 2:
							uu = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(o(329));
					}
					if ((t & 62914560) === t && (i = fu + 300 - Le(), 10 < i)) {
						if (Mu(r, t, cu, !eu), rt(r, 0, !0) !== 0) break a;
						bu = t, r.timeoutHandle = cf(Au.bind(null, r, n, uu, hu, du, t, cu, ou, lu, eu, a, "Throttled", -0, 0), i);
						break a;
					}
					Au(r, n, uu, hu, du, t, cu, ou, lu, eu, a, null, -0, 0);
				}
			}
			break;
		} while (1);
		_d(e);
	}
	function Au(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: dn
			}, Ul(t, a, d);
			var m = (a & 62914560) === a ? fu - Le() : (a & 4194048) === a ? pu - Le() : 0;
			if (m = op(d, m), m !== null) {
				bu = a, e.cancelPendingCommit = m(Xu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), Mu(e, a, o, !l);
				return;
			}
		}
		Xu(e, t, a, n, r, i, o, s, c);
	}
	function ju(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Nr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function Mu(e, t, n, r) {
		t &= ~su, t &= ~ou, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Ye(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && lt(e, n, t);
	}
	function Nu() {
		return Zl & 6 ? !0 : (vd(0, !1), !1);
	}
	function Pu() {
		if (F !== null) {
			if (Ql === 0) var e = F.return;
			else e = F, ra = na = null, zo(e), Ba = null, Va = 0, e = F;
			for (; e !== null;) Qc(e.alternate, e), e = e.return;
			F = null;
		}
	}
	function Fu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, lf(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), bu = 0, Pu(), P = e, F = n = xi(e.current, null), I = t, Ql = 0, $l = null, eu = !1, tu = it(e, t), nu = !1, lu = cu = su = ou = au = iu = 0, uu = L = null, du = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Ye(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return ru = t, di(), n;
	}
	function Iu(e, t) {
		M = null, w.H = Ys, t === Aa || t === Ma ? (t = Ra(), Ql = 3) : t === ja ? (t = Ra(), Ql = 4) : Ql = t === pc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, $l = t, F === null && (iu = 1, sc(e, ki(t, e.current)));
	}
	function Lu() {
		var e = fo.current;
		return e === null ? !0 : (I & 4194048) === I ? po === null : (I & 62914560) === I || I & 536870912 ? e === po : !1;
	}
	function Ru() {
		var e = w.H;
		return w.H = Ys, e === null ? Ys : e;
	}
	function zu() {
		var e = w.A;
		return w.A = Yl, e;
	}
	function Bu() {
		iu = 4, eu || (I & 4194048) !== I && fo.current !== null || (tu = !0), !(au & 134217727) && !(ou & 134217727) || P === null || Mu(P, I, cu, !1);
	}
	function Vu(e, t, n) {
		var r = Zl;
		Zl |= 2;
		var i = Ru(), a = zu();
		(P !== e || I !== t) && (hu = null, Fu(e, t)), t = !1;
		var o = iu;
		a: do
			try {
				if (Ql !== 0 && F !== null) {
					var s = F, c = $l;
					switch (Ql) {
						case 8:
							Pu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							fo.current === null && (t = !0);
							var l = Ql;
							if (Ql = 0, $l = null, qu(e, s, c, l), n && tu) {
								o = 0;
								break a;
							}
							break;
						default: l = Ql, Ql = 0, $l = null, qu(e, s, c, l);
					}
				}
				Hu(), o = iu;
				break;
			} catch (t) {
				Iu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, ra = na = null, Zl = r, w.H = i, w.A = a, F === null && (P = null, I = 0, di()), o;
	}
	function Hu() {
		for (; F !== null;) Gu(F);
	}
	function Uu(e, t) {
		var n = Zl;
		Zl |= 2;
		var r = Ru(), i = zu();
		P !== e || I !== t ? (hu = null, mu = Le() + 500, Fu(e, t)) : tu = it(e, t);
		a: do
			try {
				if (Ql !== 0 && F !== null) {
					t = F;
					var a = $l;
					b: switch (Ql) {
						case 1:
							Ql = 0, $l = null, qu(e, t, a, 1);
							break;
						case 2:
						case 9:
							if (Pa(a)) {
								Ql = 0, $l = null, Ku(t);
								break;
							}
							t = function() {
								Ql !== 2 && Ql !== 9 || P !== e || (Ql = 7), _d(e);
							}, a.then(t, t);
							break a;
						case 3:
							Ql = 7;
							break a;
						case 4:
							Ql = 5;
							break a;
						case 7:
							Pa(a) ? (Ql = 0, $l = null, Ku(t)) : (Ql = 0, $l = null, qu(e, t, a, 7));
							break;
						case 5:
							var s = null;
							switch (F.tag) {
								case 26: s = F.memoizedState;
								case 5:
								case 27:
									var c = F;
									if (s ? rp(s) : c.stateNode.complete) {
										Ql = 0, $l = null;
										var l = c.sibling;
										if (l !== null) F = l;
										else {
											var u = c.return;
											u === null ? F = null : (F = u, Ju(u));
										}
										break b;
									}
							}
							Ql = 0, $l = null, qu(e, t, a, 5);
							break;
						case 6:
							Ql = 0, $l = null, qu(e, t, a, 6);
							break;
						case 8:
							Pu(), iu = 6;
							break a;
						default: throw Error(o(462));
					}
				}
				Wu();
				break;
			} catch (t) {
				Iu(e, t);
			}
		while (1);
		return ra = na = null, w.H = r, w.A = i, Zl = n, F === null ? (P = null, I = 0, di(), iu) : 0;
	}
	function Wu() {
		for (; F !== null && !Fe();) Gu(F);
	}
	function Gu(e) {
		var t = Uc(e.alternate, e, ru);
		e.memoizedProps = e.pendingProps, t === null ? Ju(e) : F = t;
	}
	function Ku(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Dc(n, t, t.pendingProps, t.type, void 0, I);
				break;
			case 11:
				t = Dc(n, t, t.pendingProps, t.type.render, t.ref, I);
				break;
			case 5: zo(t);
			default: Qc(n, t), t = F = Si(t, ru), t = Uc(n, t, ru);
		}
		e.memoizedProps = e.pendingProps, t === null ? Ju(e) : F = t;
	}
	function qu(e, t, n, r) {
		ra = na = null, zo(t), Ba = null, Va = 0;
		var i = t.return;
		try {
			if (fc(e, i, t, n, I)) {
				iu = 1, sc(e, ki(n, e.current)), F = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw F = i, t;
			iu = 1, sc(e, ki(n, e.current)), F = null;
			return;
		}
		t.flags & 32768 ? (k || r === 1 ? e = !0 : tu || I & 536870912 ? e = !1 : (eu = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = fo.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Yu(t, e)) : Ju(t);
	}
	function Ju(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Yu(t, eu);
				return;
			}
			e = t.return;
			var n = Xc(t.alternate, t, ru);
			if (n !== null) {
				F = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				F = t;
				return;
			}
			F = t = e;
		} while (t !== null);
		iu === 0 && (iu = 5);
	}
	function Yu(e, t) {
		do {
			var n = Zc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, F = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				F = e;
				return;
			}
			F = e = n;
		} while (e !== null);
		iu = 6, F = null;
	}
	function Xu(e, t, n, r, i, a, s, c, l) {
		e.cancelPendingCommit = null;
		do
			td();
		while (_u !== 0);
		if (Zl & 6) throw Error(o(327));
		if (t !== null) {
			if (t === e.current) throw Error(o(177));
			if (a = t.lanes | t.childLanes, a |= ui, ct(e, n, a, s, c, l), e === P && (F = P = null, I = 0), yu = t, vu = e, bu = n, xu = a, Su = i, Cu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, ud(Ve, function() {
				return nd(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = w.T, w.T = null, i = T.p, T.p = 2, s = Zl, Zl |= 4;
				try {
					_l(e, t, n);
				} finally {
					Zl = s, T.p = i, w.T = r;
				}
			}
			_u = 1, Zu(), Qu(), $u();
		}
	}
	function Zu() {
		if (_u === 1) {
			_u = 0;
			var e = vu, t = yu, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = w.T, w.T = null;
				var r = T.p;
				T.p = 2;
				var i = Zl;
				Zl |= 4;
				try {
					Al(t, e);
					var a = ef, o = Rr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Lr(s.ownerDocument.documentElement, s)) {
						if (c !== null && zr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Ir(s, h), v = Ir(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					bp = !!$d, ef = $d = null;
				} finally {
					Zl = i, T.p = r, w.T = n;
				}
			}
			e.current = t, _u = 2;
		}
	}
	function Qu() {
		if (_u === 2) {
			_u = 0;
			var e = vu, t = yu, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = w.T, w.T = null;
				var r = T.p;
				T.p = 2;
				var i = Zl;
				Zl |= 4;
				try {
					vl(e, t.alternate, t);
				} finally {
					Zl = i, T.p = r, w.T = n;
				}
			}
			_u = 3;
		}
	}
	function $u() {
		if (_u === 4 || _u === 3) {
			_u = 0, Ie();
			var e = vu, t = yu, n = bu, r = Cu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? _u = 5 : (_u = 0, yu = vu = null, ed(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (gu = null), pt(n), t = t.stateNode, qe && typeof qe.onCommitFiberRoot == "function") try {
				qe.onCommitFiberRoot(Ke, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = w.T, i = T.p, T.p = 2, w.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					w.T = t, T.p = i;
				}
			}
			bu & 3 && td(), _d(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === Tu ? wu++ : (wu = 0, Tu = e) : wu = 0, vd(0, !1);
		}
	}
	function ed(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ya(t)));
	}
	function td() {
		return Zu(), Qu(), $u(), nd();
	}
	function nd() {
		if (_u !== 5) return !1;
		var e = vu, t = xu;
		xu = 0;
		var n = pt(bu), r = w.T, i = T.p;
		try {
			T.p = 32 > n ? 32 : n, w.T = null, n = Su, Su = null;
			var a = vu, s = bu;
			if (_u = 0, yu = vu = null, bu = 0, Zl & 6) throw Error(o(331));
			var c = Zl;
			if (Zl |= 4, Kl(a.current), zl(a, a.current, s, n), Zl = c, vd(0, !1), qe && typeof qe.onPostCommitFiberRoot == "function") try {
				qe.onPostCommitFiberRoot(Ke, a);
			} catch {}
			return !0;
		} finally {
			T.p = i, w.T = r, ed(e, t);
		}
	}
	function rd(e, t, n) {
		t = ki(n, t), t = lc(e.stateNode, t, 2), e = Qa(e, t, 2), e !== null && (st(e, 2), _d(e));
	}
	function id(e, t, n) {
		if (e.tag === 3) rd(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				rd(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (gu === null || !gu.has(r))) {
					e = ki(n, e), n = uc(2), r = Qa(t, n, 2), r !== null && (dc(n, r, t, e), st(r, 2), _d(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function ad(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Xl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (nu = !0, i.add(n), e = od.bind(null, e, t, n), t.then(e, e));
	}
	function od(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, P === e && (I & n) === n && (iu === 4 || iu === 3 && (I & 62914560) === I && 300 > Le() - fu ? !(Zl & 2) && Fu(e, 0) : su |= n, lu === I && (lu = 0)), _d(e);
	}
	function sd(e, t) {
		t === 0 && (t = D()), e = mi(e, t), e !== null && (st(e, t), _d(e));
	}
	function cd(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), sd(e, n);
	}
	function ld(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, i = e.memoizedState;
				i !== null && (n = i.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(o(314));
		}
		r !== null && r.delete(t), sd(e, n);
	}
	function ud(e, t) {
		return Ne(e, t);
	}
	var dd = null, fd = null, pd = !1, md = !1, hd = !1, gd = 0;
	function _d(e) {
		e !== fd && e.next === null && (fd === null ? dd = fd = e : fd = fd.next = e), md = !0, pd || (pd = !0, wd());
	}
	function vd(e, t) {
		if (!hd && md) {
			hd = !0;
			do
				for (var n = !1, r = dd; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Ye(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, Cd(r, a));
					} else a = I, a = rt(r, r === P ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || it(r, a) || (n = !0, Cd(r, a));
					r = r.next;
				}
			while (n);
			hd = !1;
		}
	}
	function yd() {
		bd();
	}
	function bd() {
		md = pd = !1;
		var e = 0;
		gd !== 0 && sf() && (e = gd);
		for (var t = Le(), n = null, r = dd; r !== null;) {
			var i = r.next, a = xd(r, t);
			a === 0 ? (r.next = null, n === null ? dd = i : n.next = i, i === null && (fd = n)) : (n = r, (e !== 0 || a & 3) && (md = !0)), r = i;
		}
		_u !== 0 && _u !== 5 || vd(e, !1), gd !== 0 && (gd = 0);
	}
	function xd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Ye(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = at(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = P, n = I, n = rt(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Ql === 2 || Ql === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Pe(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || it(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Pe(r), pt(n)) {
				case 2:
				case 8:
					n = Be;
					break;
				case 32:
					n = Ve;
					break;
				case 268435456:
					n = Ue;
					break;
				default: n = Ve;
			}
			return r = Sd.bind(null, e), n = Ne(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Pe(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function Sd(e, t) {
		if (_u !== 0 && _u !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (td() && e.callbackNode !== n) return null;
		var r = I;
		return r = rt(e, e === P ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (ku(e, r, t), xd(e, Le()), e.callbackNode != null && e.callbackNode === n ? Sd.bind(null, e) : null);
	}
	function Cd(e, t) {
		if (td()) return null;
		ku(e, t, !0);
	}
	function wd() {
		df(function() {
			Zl & 6 ? Ne(ze, yd) : bd();
		});
	}
	function Td() {
		if (gd === 0) {
			var e = j;
			e === 0 && (e = $e, $e <<= 1, !($e & 261888) && ($e = 256)), gd = e;
		}
		return gd;
	}
	function Ed(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : un("" + e);
	}
	function Dd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function Od(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Ed((i[vt] || null).action), o = r.submitter;
			o && (t = (t = o[vt] || null) ? Ed(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Mn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (gd !== 0) {
								var e = o ? Dd(i, o) : new FormData(i);
								Fs(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? Dd(i, o) : new FormData(i), Fs(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var kd = 0; kd < ai.length; kd++) {
		var Ad = ai[kd];
		oi(Ad.toLowerCase(), "on" + (Ad[0].toUpperCase() + Ad.slice(1)));
	}
	oi(Zr, "onAnimationEnd"), oi(Qr, "onAnimationIteration"), oi($r, "onAnimationStart"), oi("dblclick", "onDoubleClick"), oi("focusin", "onFocus"), oi("focusout", "onBlur"), oi(ei, "onTransitionRun"), oi(ti, "onTransitionStart"), oi(ni, "onTransitionCancel"), oi(ri, "onTransitionEnd"), Pt("onMouseEnter", ["mouseout", "mouseover"]), Pt("onMouseLeave", ["mouseout", "mouseover"]), Pt("onPointerEnter", ["pointerout", "pointerover"]), Pt("onPointerLeave", ["pointerout", "pointerover"]), Nt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Nt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Nt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Nt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Nt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Nt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var jd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Md = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(jd));
	function Nd(e, t) {
		t = (t & 4) != 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						si(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						si(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function R(e, t) {
		var n = t[bt];
		n === void 0 && (n = t[bt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Ld(t, e, 2, !1), n.add(r));
	}
	function Pd(e, t, n) {
		var r = 0;
		t && (r |= 4), Ld(n, e, r, t);
	}
	var Fd = "_reactListening" + Math.random().toString(36).slice(2);
	function Id(e) {
		if (!e[Fd]) {
			e[Fd] = !0, jt.forEach(function(t) {
				t !== "selectionchange" && (Md.has(t) || Pd(t, !1, e), Pd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Fd] || (t[Fd] = !0, Pd("selectionchange", !1, t));
		}
	}
	function Ld(e, t, n, r) {
		switch (Dp(t)) {
			case 2:
				var i = xp;
				break;
			case 8:
				i = Sp;
				break;
			default: i = Cp;
		}
		n = i.bind(null, t, n, e), i = void 0, !xn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Rd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var o = r.tag;
			if (o === 3 || o === 4) {
				var s = r.stateNode.containerInfo;
				if (s === i) break;
				if (o === 4) for (o = r.return; o !== null;) {
					var l = o.tag;
					if ((l === 3 || l === 4) && o.stateNode.containerInfo === i) return;
					o = o.return;
				}
				for (; s !== null;) {
					if (o = Et(s), o === null) return;
					if (l = o.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = o;
						continue a;
					}
					s = s.parentNode;
				}
			}
			r = r.return;
		}
		vn(function() {
			var r = a, i = pn(n), o = [];
			a: {
				var s = ii.get(e);
				if (s !== void 0) {
					var l = Mn, u = e;
					switch (e) {
						case "keypress": if (Dn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Xn;
							break;
						case "focusin":
							u = "focus", l = Vn;
							break;
						case "focusout":
							u = "blur", l = Vn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Vn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = zn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Bn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Qn;
							break;
						case Zr:
						case Qr:
						case $r:
							l = Hn;
							break;
						case ri:
							l = $n;
							break;
						case "scroll":
						case "scrollend":
							l = Pn;
							break;
						case "wheel":
							l = er;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Un;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Zn;
							break;
						case "toggle":
						case "beforetoggle": l = tr;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? s === null ? null : s + "Capture" : s;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = yn(m, p), g != null && d.push(zd(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (s = new l(s, u, null, n, i), o.push({
						event: s,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (s = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", s && n !== fn && (u = n.relatedTarget || n.fromElement) && (Et(u) || u[yt])) break a;
					if ((l || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? Et(u) : null, u !== null && (f = c(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = zn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Zn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? s : Ot(l), h = u == null ? s : Ot(u), s = new d(g, m + "leave", l, n, i), s.target = f, s.relatedTarget = h, g = null, Et(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Vd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && Hd(o, s, l, d, !1), u !== null && f !== null && Hd(o, f, u, d, !0);
					}
				}
				a: {
					if (s = r ? Ot(r) : window, l = s.nodeName && s.nodeName.toLowerCase(), l === "select" || l === "input" && s.type === "file") var v = xr;
					else if (hr(s)) if (Sr) v = jr;
					else {
						v = kr;
						var y = Or;
					}
					else l = s.nodeName, !l || l.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && sn(r.elementType) && (v = xr) : v = Ar;
					if (v &&= v(e, r)) {
						gr(o, v, n, i);
						break a;
					}
					y && y(e, s, r), e === "focusout" && r && s.type === "number" && r.memoizedProps.value != null && Qt(s, "number", s.value);
				}
				switch (y = r ? Ot(r) : window, e) {
					case "focusin":
						(hr(y) || y.contentEditable === "true") && (Vr = y, Hr = r, Ur = null);
						break;
					case "focusout":
						Ur = Hr = Vr = null;
						break;
					case "mousedown":
						Wr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Wr = !1, Gr(o, n, i);
						break;
					case "selectionchange": if (Br) break;
					case "keydown":
					case "keyup": Gr(o, n, i);
				}
				var b;
				if (rr) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else dr ? lr(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (or && n.locale !== "ko" && (dr || x !== "onCompositionStart" ? x === "onCompositionEnd" && dr && (b = En()) : (Cn = i, wn = "value" in Cn ? Cn.value : Cn.textContent, dr = !0)), y = Bd(r, x), 0 < y.length && (x = new Wn(x, e, null, n, i), o.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = ur(n), b !== null && (x.data = b)))), (b = ar ? fr(e, n) : pr(e, n)) && (x = Bd(r, "onBeforeInput"), 0 < x.length && (y = new Wn("onBeforeInput", "beforeinput", null, n, i), o.push({
					event: y,
					listeners: x
				}), y.data = b)), Od(o, e, r, n, i);
			}
			Nd(o, t);
		});
	}
	function zd(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Bd(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = yn(e, n), i != null && r.unshift(zd(e, i, a)), i = yn(e, t), i != null && r.push(zd(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Vd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Hd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = yn(n, a), l != null && o.unshift(zd(n, l, c))) : i || (l = yn(n, a), l != null && o.push(zd(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Ud = /\r\n?/g, Wd = /\u0000|\uFFFD/g;
	function Gd(e) {
		return (typeof e == "string" ? e : "" + e).replace(Ud, "\n").replace(Wd, "");
	}
	function Kd(e, t) {
		return t = Gd(t), Gd(e) === t;
	}
	function qd(e, t, n, r, i, a) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || nn(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && nn(e, "" + r);
				break;
			case "className":
				Bt(e, "class", r);
				break;
			case "tabIndex":
				Bt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Bt(e, n, r);
				break;
			case "style":
				on(e, r, a);
				break;
			case "data": if (t !== "object") {
				Bt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = un("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof a == "function" && (n === "formAction" ? (t !== "input" && qd(e, t, "name", i.name, i, null), qd(e, t, "formEncType", i.formEncType, i, null), qd(e, t, "formMethod", i.formMethod, i, null), qd(e, t, "formTarget", i.formTarget, i, null)) : (qd(e, t, "encType", i.encType, i, null), qd(e, t, "method", i.method, i, null), qd(e, t, "target", i.target, i, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = un("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = dn);
				break;
			case "onScroll":
				r != null && R("scroll", e);
				break;
			case "onScrollEnd":
				r != null && R("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(o(61));
					if (n = r.__html, n != null) {
						if (i.children != null) throw Error(o(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = un("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				R("beforetoggle", e), R("toggle", e), zt(e, "popover", r);
				break;
			case "xlinkActuate":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Vt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Vt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Vt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Vt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				zt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = cn.get(n) || n, zt(e, n, r));
		}
	}
	function Jd(e, t, n, r, i, a) {
		switch (n) {
			case "style":
				on(e, r, a);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(o(61));
					if (n = r.__html, n != null) {
						if (i.children != null) throw Error(o(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? nn(e, r) : (typeof r == "number" || typeof r == "bigint") && nn(e, "" + r);
				break;
			case "onScroll":
				r != null && R("scroll", e);
				break;
			case "onScrollEnd":
				r != null && R("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = dn);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!Mt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), t = n.slice(2, i ? n.length - 7 : void 0), a = e[vt] || null, a = a == null ? null : a[n], typeof a == "function" && e.removeEventListener(t, a, i), typeof r == "function")) {
					typeof a != "function" && a !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, i);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : zt(e, n, r);
			}
		}
	}
	function Yd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				R("error", e), R("load", e);
				var r = !1, i = !1, a;
				for (a in n) if (n.hasOwnProperty(a)) {
					var s = n[a];
					if (s != null) switch (a) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							i = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(o(137, t));
						default: qd(e, t, a, s, n, null);
					}
				}
				i && qd(e, t, "srcSet", n.srcSet, n, null), r && qd(e, t, "src", n.src, n, null);
				return;
			case "input":
				R("invalid", e);
				var c = a = s = i = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							i = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							a = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(o(137, t));
							break;
						default: qd(e, t, r, d, n, null);
					}
				}
				Zt(e, a, c, l, u, s, i, !1);
				return;
			case "select":
				for (i in R("invalid", e), r = s = a = null, n) if (n.hasOwnProperty(i) && (c = n[i], c != null)) switch (i) {
					case "value":
						a = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: qd(e, t, i, c, n, null);
				}
				t = a, n = s, e.multiple = !!r, t == null ? n != null && $t(e, !!r, n, !0) : $t(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in R("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						i = c;
						break;
					case "children":
						a = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(o(91));
						break;
					default: qd(e, t, s, c, n, null);
				}
				tn(e, r, i, a);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: qd(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				R("beforetoggle", e), R("toggle", e), R("cancel", e), R("close", e);
				break;
			case "iframe":
			case "object":
				R("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < jd.length; r++) R(jd[r], e);
				break;
			case "image":
				R("error", e), R("load", e);
				break;
			case "details":
				R("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": R("error", e), R("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(o(137, t));
					default: qd(e, t, u, r, n, null);
				}
				return;
			default: if (sn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Jd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && qd(e, t, c, r, n, null));
	}
	function Xd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var i = null, a = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || qd(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							a = m;
							break;
						case "name":
							i = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(o(137, t));
							break;
						default: m !== f && qd(e, t, p, m, r, f);
					}
				}
				Xt(e, s, c, l, u, d, a, i);
				return;
			case "select":
				for (a in m = s = c = p = null, n) if (l = n[a], n.hasOwnProperty(a) && l != null) switch (a) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(a) || qd(e, t, a, null, r, l);
				}
				for (i in r) if (a = r[i], l = n[i], r.hasOwnProperty(i) && (a != null || l != null)) switch (i) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						c = a;
						break;
					case "multiple": s = a;
					default: a !== l && qd(e, t, i, a, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? $t(e, !!n, n ? [] : "", !1) : $t(e, !!n, t, !0)) : $t(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (i = n[c], n.hasOwnProperty(c) && i != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: qd(e, t, c, null, r, i);
				}
				for (s in r) if (i = r[s], a = n[s], r.hasOwnProperty(s) && (i != null || a != null)) switch (s) {
					case "value":
						p = i;
						break;
					case "defaultValue":
						m = i;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (i != null) throw Error(o(91));
						break;
					default: i !== a && qd(e, t, s, i, r, a);
				}
				en(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: qd(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: qd(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && qd(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(o(137, t));
						break;
					default: qd(e, t, u, p, r, m);
				}
				return;
			default: if (sn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Jd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Jd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && qd(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || qd(e, t, f, p, r, m);
	}
	function Zd(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Qd() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Zd(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Zd(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var $d = null, ef = null;
	function tf(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function nf(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function rf(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function af(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var of = null;
	function sf() {
		var e = window.event;
		return e && e.type === "popstate" ? e === of ? !1 : (of = e, !0) : (of = null, !1);
	}
	var cf = typeof setTimeout == "function" ? setTimeout : void 0, lf = typeof clearTimeout == "function" ? clearTimeout : void 0, uf = typeof Promise == "function" ? Promise : void 0, df = typeof queueMicrotask == "function" ? queueMicrotask : uf === void 0 ? cf : function(e) {
		return uf.resolve(null).then(e).catch(ff);
	};
	function ff(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function pf(e) {
		return e === "head";
	}
	function mf(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Kp(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") Of(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, Of(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[wt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && Of(e.ownerDocument.body);
			n = i;
		} while (n);
		Kp(t);
	}
	function hf(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function gf(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					gf(n), Tt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function _f(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[wt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = Cf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function vf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function yf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function bf(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function xf(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function Sf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function Cf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var wf = null;
	function Tf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return Cf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function Ef(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function Df(e, t, n) {
		switch (t = tf(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(o(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(o(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(o(454));
				return e;
			default: throw Error(o(451));
		}
	}
	function Of(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		Tt(e);
	}
	var kf = /* @__PURE__ */ new Map(), Af = /* @__PURE__ */ new Set();
	function z(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var jf = T.d;
	T.d = {
		f: Mf,
		r: Nf,
		D: If,
		C: Lf,
		L: Rf,
		m: zf,
		X: Vf,
		S: Bf,
		M: Hf
	};
	function Mf() {
		var e = jf.f(), t = Nu();
		return e || t;
	}
	function Nf(e) {
		var t = Dt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Ls(t) : jf.r(e);
	}
	var Pf = typeof document > "u" ? null : document;
	function Ff(e, t, n) {
		var r = Pf;
		if (r && typeof t == "string" && t) {
			var i = Yt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), Af.has(i) || (Af.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Yd(t, "link", e), At(t), r.head.appendChild(t)));
		}
	}
	function If(e) {
		jf.D(e), Ff("dns-prefetch", e, null);
	}
	function Lf(e, t) {
		jf.C(e, t), Ff("preconnect", e, t);
	}
	function Rf(e, t, n) {
		jf.L(e, t, n);
		var r = Pf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Yt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Yt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Yt(n.imageSizes) + "\"]")) : i += "[href=\"" + Yt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Wf(e);
					break;
				case "script": a = Jf(e);
			}
			kf.has(a) || (e = m({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), kf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Gf(a)) || t === "script" && r.querySelector(B(a)) || (t = r.createElement("link"), Yd(t, "link", e), At(t), r.head.appendChild(t)));
		}
	}
	function zf(e, t) {
		jf.m(e, t);
		var n = Pf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Yt(r) + "\"][href=\"" + Yt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Jf(e);
			}
			if (!kf.has(a) && (e = m({
				rel: "modulepreload",
				href: e
			}, t), kf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(B(a))) return;
				}
				r = n.createElement("link"), Yd(r, "link", e), At(r), n.head.appendChild(r);
			}
		}
	}
	function Bf(e, t, n) {
		jf.S(e, t, n);
		var r = Pf;
		if (r && e) {
			var i = kt(r).hoistableStyles, a = Wf(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Gf(a))) s.loading = 5;
				else {
					e = m({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = kf.get(a)) && Zf(e, n);
					var c = o = r.createElement("link");
					At(c), Yd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Xf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Vf(e, t) {
		jf.X(e, t);
		var n = Pf;
		if (n && e) {
			var r = kt(n).hoistableScripts, i = Jf(e), a = r.get(i);
			a || (a = n.querySelector(B(i)), a || (e = m({
				src: e,
				async: !0
			}, t), (t = kf.get(i)) && Qf(e, t), a = n.createElement("script"), At(a), Yd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Hf(e, t) {
		jf.M(e, t);
		var n = Pf;
		if (n && e) {
			var r = kt(n).hoistableScripts, i = Jf(e), a = r.get(i);
			a || (a = n.querySelector(B(i)), a || (e = m({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = kf.get(i)) && Qf(e, t), a = n.createElement("script"), At(a), Yd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Uf(e, t, n, r) {
		var i = (i = be.current) ? z(i) : null;
		if (!i) throw Error(o(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Wf(n.href), n = kt(i).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Wf(n.href);
					var a = kt(i).hoistableStyles, s = a.get(e);
					if (s || (i = i.ownerDocument || i, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, a.set(e, s), (a = i.querySelector(Gf(e))) && !a._p && (s.instance = a, s.state.loading = 5), kf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, kf.set(e, n), a || qf(i, e, n, s.state))), t && r === null) throw Error(o(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(o(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Jf(n), n = kt(i).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(o(444, e));
		}
	}
	function Wf(e) {
		return "href=\"" + Yt(e) + "\"";
	}
	function Gf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Kf(e) {
		return m({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function qf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Yd(t, "link", n), At(t), e.head.appendChild(t));
	}
	function Jf(e) {
		return "[src=\"" + Yt(e) + "\"]";
	}
	function B(e) {
		return "script[async]" + e;
	}
	function Yf(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Yt(n.href) + "\"]");
				if (r) return t.instance = r, At(r), r;
				var i = m({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), At(r), Yd(r, "style", i), Xf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				i = Wf(n.href);
				var a = e.querySelector(Gf(i));
				if (a) return t.state.loading |= 4, t.instance = a, At(a), a;
				r = Kf(n), (i = kf.get(i)) && Zf(r, i), a = (e.ownerDocument || e).createElement("link"), At(a);
				var s = a;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Yd(a, "link", r), t.state.loading |= 4, Xf(a, n.precedence, e), t.instance = a;
			case "script": return a = Jf(n.src), (i = e.querySelector(B(a))) ? (t.instance = i, At(i), i) : (r = n, (i = kf.get(a)) && (r = m({}, n), Qf(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), At(i), Yd(i, "link", r), e.head.appendChild(i), t.instance = i);
			case "void": return null;
			default: throw Error(o(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Xf(r, n.precedence, e));
		return t.instance;
	}
	function Xf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Qf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var $f = null;
	function ep(e, t, n) {
		if ($f === null) {
			var r = /* @__PURE__ */ new Map(), i = $f = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = $f, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[wt] || a[_t] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function tp(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function np(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function rp(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function ip(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Wf(r.href), a = t.querySelector(Gf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = sp.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, At(a);
					return;
				}
				a = t.ownerDocument || t, r = Kf(r), (i = kf.get(i)) && Zf(r, i), a = a.createElement("link"), At(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Yd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = sp.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var ap = 0;
	function op(e, t) {
		return e.stylesheets && e.count === 0 && lp(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && lp(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && ap === 0 && (ap = 62500 * Qd());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && lp(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > ap ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function sp() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) lp(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var cp = null;
	function lp(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, cp = /* @__PURE__ */ new Map(), t.forEach(up, e), cp = null, sp.call(e));
	}
	function up(e, t) {
		if (!(t.state.loading & 4)) {
			var n = cp.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), cp.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = sp.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var dp = {
		$$typeof: ee,
		Provider: null,
		Consumer: null,
		_currentValue: fe,
		_currentValue2: fe,
		_threadCount: 0
	};
	function fp(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ot(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ot(0), this.hiddenUpdates = ot(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function pp(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new fp(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = yi(3, null, null, t), e.current = a, a.stateNode = e, t = va(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Ya(a), e;
	}
	function mp(e) {
		return e ? (e = _i, e) : _i;
	}
	function hp(e, t, n, r, i, a) {
		i = mp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Za(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Qa(e, r, t), n !== null && (Ou(n, e, t), $a(n, e, t));
	}
	function gp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function _p(e, t) {
		gp(e, t), (e = e.alternate) && gp(e, t);
	}
	function vp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = mi(e, 67108864);
			t !== null && Ou(t, e, 67108864), _p(e, 67108864);
		}
	}
	function yp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Eu();
			t = ft(t);
			var n = mi(e, t);
			n !== null && Ou(n, e, t), _p(e, t);
		}
	}
	var bp = !0;
	function xp(e, t, n, r) {
		var i = w.T;
		w.T = null;
		var a = T.p;
		try {
			T.p = 2, Cp(e, t, n, r);
		} finally {
			T.p = a, w.T = i;
		}
	}
	function Sp(e, t, n, r) {
		var i = w.T;
		w.T = null;
		var a = T.p;
		try {
			T.p = 8, Cp(e, t, n, r);
		} finally {
			T.p = a, w.T = i;
		}
	}
	function Cp(e, t, n, r) {
		if (bp) {
			var i = wp(r);
			if (i === null) Rd(e, t, r, Tp, n), Ip(e, r);
			else if (Rp(i, e, t, n, r)) r.stopPropagation();
			else if (Ip(e, r), t & 4 && -1 < Fp.indexOf(e)) {
				for (; i !== null;) {
					var a = Dt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = nt(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Ye(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									_d(a), !(Zl & 6) && (mu = Le() + 500, vd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = mi(a, 2), s !== null && Ou(s, a, 2), Nu(), _p(a, 2);
					}
					if (a = wp(r), a === null && Rd(e, t, r, Tp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Rd(e, t, r, null, n);
		}
	}
	function wp(e) {
		return e = pn(e), Ep(e);
	}
	var Tp = null;
	function Ep(e) {
		if (Tp = null, e = Et(e), e !== null) {
			var t = c(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = l(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = u(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return Tp = e, null;
	}
	function Dp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Re()) {
				case ze: return 2;
				case Be: return 8;
				case Ve:
				case He: return 32;
				case Ue: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var Op = !1, kp = null, Ap = null, jp = null, Mp = /* @__PURE__ */ new Map(), Np = /* @__PURE__ */ new Map(), Pp = [], Fp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Ip(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				kp = null;
				break;
			case "dragenter":
			case "dragleave":
				Ap = null;
				break;
			case "mouseover":
			case "mouseout":
				jp = null;
				break;
			case "pointerover":
			case "pointerout":
				Mp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": Np.delete(t.pointerId);
		}
	}
	function Lp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Dt(t), t !== null && vp(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Rp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return kp = Lp(kp, e, t, n, r, i), !0;
			case "dragenter": return Ap = Lp(Ap, e, t, n, r, i), !0;
			case "mouseover": return jp = Lp(jp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Mp.set(a, Lp(Mp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, Np.set(a, Lp(Np.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function zp(e) {
		var t = Et(e.target);
		if (t !== null) {
			var n = c(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = l(n), t !== null) {
						e.blockedOn = t, ht(e.priority, function() {
							yp(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = u(n), t !== null) {
						e.blockedOn = t, ht(e.priority, function() {
							yp(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Bp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = wp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				fn = r, n.target.dispatchEvent(r), fn = null;
			} else return t = Dt(n), t !== null && vp(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Vp(e, t, n) {
		Bp(e) && n.delete(t);
	}
	function Hp() {
		Op = !1, kp !== null && Bp(kp) && (kp = null), Ap !== null && Bp(Ap) && (Ap = null), jp !== null && Bp(jp) && (jp = null), Mp.forEach(Vp), Np.forEach(Vp);
	}
	function Up(e, n) {
		e.blockedOn === n && (e.blockedOn = null, Op || (Op = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Hp)));
	}
	var Wp = null;
	function Gp(e) {
		Wp !== e && (Wp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Wp === e && (Wp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Ep(r || n) === null) continue;
					break;
				}
				var a = Dt(n);
				a !== null && (e.splice(t, 3), t -= 3, Fs(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Kp(e) {
		function t(t) {
			return Up(t, e);
		}
		kp !== null && Up(kp, e), Ap !== null && Up(Ap, e), jp !== null && Up(jp, e), Mp.forEach(t), Np.forEach(t);
		for (var n = 0; n < Pp.length; n++) {
			var r = Pp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Pp.length && (n = Pp[0], n.blockedOn === null);) zp(n), n.blockedOn === null && Pp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[vt] || null;
			if (typeof a == "function") o || Gp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[vt] || null) s = o.formAction;
					else if (Ep(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Gp(n);
			}
		}
	}
	function qp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Jp(e) {
		this._internalRoot = e;
	}
	Yp.prototype.render = Jp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(o(409));
		var n = t.current;
		hp(n, Eu(), e, t, null, null);
	}, Yp.prototype.unmount = Jp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			hp(e.current, 2, null, e, null, null), Nu(), t[yt] = null;
		}
	};
	function Yp(e) {
		this._internalRoot = e;
	}
	Yp.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = mt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Pp.length && t !== 0 && t < Pp[n].priority; n++);
			Pp.splice(n, 0, e), n === 0 && zp(e);
		}
	};
	var Xp = n.version;
	if (Xp !== "19.2.7") throw Error(o(527, Xp, "19.2.7"));
	T.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
		return e = f(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Zp = {
		bundleType: 0,
		version: "19.2.7",
		rendererPackageName: "react-dom",
		currentDispatcherRef: w,
		reconcilerVersion: "19.2.7"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Qp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Qp.isDisabled && Qp.supportsFiber) try {
			Ke = Qp.inject(Zp), qe = Qp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!s(e)) throw Error(o(299));
		var n = !1, r = "", i = ic, a = ac, c = oc;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = pp(e, 1, !1, null, null, n, r, null, i, a, c, qp), e[yt] = t.current, Id(e), new Jp(t);
	}, e.hydrateRoot = function(e, t, n) {
		if (!s(e)) throw Error(o(299));
		var r = !1, i = "", a = ic, c = ac, l = oc, u = null;
		return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (a = n.onUncaughtError), n.onCaughtError !== void 0 && (c = n.onCaughtError), n.onRecoverableError !== void 0 && (l = n.onRecoverableError), n.formState !== void 0 && (u = n.formState)), t = pp(e, 1, !0, t, n ?? null, r, i, u, a, c, l, qp), t.context = mp(null), n = t.current, r = Eu(), r = ft(r), i = Za(r), i.callback = null, Qa(n, i, r), n = r, t.current.lanes = n, st(t, n), _d(t), e[yt] = t.current, Id(e), new Yp(t);
	}, e.version = "19.2.7";
})), Tn = /* @__PURE__ */ e(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e, t) {
			for (e = e.memoizedState; e !== null && 0 < t;) e = e.next, t--;
			return e;
		}
		function n(e, t, r, i) {
			if (r >= t.length) return i;
			var a = t[r], o = Jf(e) ? e.slice() : z({}, e);
			return o[a] = n(e[a], t, r + 1, i), o;
		}
		function a(e, t, n) {
			if (t.length !== n.length) console.warn("copyWithRename() expects paths of the same length");
			else {
				for (var r = 0; r < n.length - 1; r++) if (t[r] !== n[r]) {
					console.warn("copyWithRename() expects paths to be the same except for the deepest key");
					return;
				}
				return o(e, t, n, 0);
			}
		}
		function o(e, t, n, r) {
			var i = t[r], a = Jf(e) ? e.slice() : z({}, e);
			return r + 1 === t.length ? (a[n[r]] = a[i], Jf(a) ? a.splice(i, 1) : delete a[i]) : a[i] = o(e[i], t, n, r + 1), a;
		}
		function s(e, t, n) {
			var r = t[n], i = Jf(e) ? e.slice() : z({}, e);
			return n + 1 === t.length ? (Jf(i) ? i.splice(r, 1) : delete i[r], i) : (i[r] = s(e[r], t, n + 1), i);
		}
		function c() {
			return !1;
		}
		function l() {
			return null;
		}
		function u() {
			console.error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks");
		}
		function d() {
			console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
		}
		function f() {}
		function p() {}
		function m(e) {
			var t = [];
			return e.forEach(function(e) {
				t.push(e);
			}), t.sort().join(", ");
		}
		function h(e, t, n, r) {
			return new wr(e, t, n, r);
		}
		function g(e, t) {
			e.context === Fg && (tf(e.current, 2, t, e, null, null), dl());
		}
		function _(e, t) {
			if (Ig !== null) {
				var n = t.staleFamilies;
				t = t.updatedFamilies, Ll(), Cr(e.current, t, n), dl();
			}
		}
		function v(e) {
			Ig = e;
		}
		function y(e) {
			return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
		}
		function b(e) {
			var t = e, n = e;
			if (e.alternate) for (; t.return;) t = t.return;
			else {
				e = t;
				do
					t = e, t.flags & 4098 && (n = t.return), e = t.return;
				while (e);
			}
			return t.tag === 3 ? n : null;
		}
		function x(e) {
			if (e.tag === 13) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function ee(e) {
			if (e.tag === 31) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function te(e) {
			if (b(e) !== e) throw Error("Unable to find node on an unmounted component.");
		}
		function re(e) {
			var t = e.alternate;
			if (!t) {
				if (t = b(e), t === null) throw Error("Unable to find node on an unmounted component.");
				return t === e ? e : null;
			}
			for (var n = e, r = t;;) {
				var i = n.return;
				if (i === null) break;
				var a = i.alternate;
				if (a === null) {
					if (r = i.return, r !== null) {
						n = r;
						continue;
					}
					break;
				}
				if (i.child === a.child) {
					for (a = i.child; a;) {
						if (a === n) return te(i), e;
						if (a === r) return te(i), t;
						a = a.sibling;
					}
					throw Error("Unable to find node on an unmounted component.");
				}
				if (n.return !== r.return) n = i, r = a;
				else {
					for (var o = !1, s = i.child; s;) {
						if (s === n) {
							o = !0, n = i, r = a;
							break;
						}
						if (s === r) {
							o = !0, r = i, n = a;
							break;
						}
						s = s.sibling;
					}
					if (!o) {
						for (s = a.child; s;) {
							if (s === n) {
								o = !0, n = a, r = i;
								break;
							}
							if (s === r) {
								o = !0, r = a, n = i;
								break;
							}
							s = s.sibling;
						}
						if (!o) throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
					}
				}
				if (n.alternate !== r) throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
			}
			if (n.tag !== 3) throw Error("Unable to find node on an unmounted component.");
			return n.stateNode.current === n ? e : t;
		}
		function S(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e;
			for (e = e.child; e !== null;) {
				if (t = S(e), t !== null) return t;
				e = e.sibling;
			}
			return null;
		}
		function ie(e) {
			return typeof e != "object" || !e ? null : (e = Kf && e[Kf] || e["@@iterator"], typeof e == "function" ? e : null);
		}
		function ae(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === qf ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case Pf: return "Fragment";
				case If: return "Profiler";
				case Ff: return "StrictMode";
				case Bf: return "Suspense";
				case Vf: return "SuspenseList";
				case Wf: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case Nf: return "Portal";
				case Rf: return e.displayName || "Context";
				case Lf: return (e._context.displayName || "Context") + ".Consumer";
				case zf:
					var t = e.render;
					return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case Hf: return t = e.displayName || null, t === null ? ae(e.type) || "Memo" : t;
				case Uf:
					t = e._payload, e = e._init;
					try {
						return ae(e(t));
					} catch {}
			}
			return null;
		}
		function oe(e) {
			return typeof e.tag == "number" ? C(e) : typeof e.name == "string" ? e.name : null;
		}
		function C(e) {
			var t = e.type;
			switch (e.tag) {
				case 31: return "Activity";
				case 24: return "Cache";
				case 9: return (t._context.displayName || "Context") + ".Consumer";
				case 10: return t.displayName || "Context";
				case 18: return "DehydratedFragment";
				case 11: return e = t.render, e = e.displayName || e.name || "", t.displayName || (e === "" ? "ForwardRef" : "ForwardRef(" + e + ")");
				case 7: return "Fragment";
				case 26:
				case 27:
				case 5: return t;
				case 4: return "Portal";
				case 3: return "Root";
				case 6: return "Text";
				case 16: return ae(t);
				case 8: return t === Ff ? "StrictMode" : "Mode";
				case 22: return "Offscreen";
				case 12: return "Profiler";
				case 21: return "Scope";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 25: return "TracingMarker";
				case 1:
				case 0:
				case 14:
				case 15:
					if (typeof t == "function") return t.displayName || t.name || null;
					if (typeof t == "string") return t;
					break;
				case 29:
					if (t = e._debugInfo, t != null) {
						for (var n = t.length - 1; 0 <= n; n--) if (typeof t[n].name == "string") return t[n].name;
					}
					if (e.return !== null) return C(e.return);
			}
			return null;
		}
		function se(e) {
			return { current: e };
		}
		function ce(e, t) {
			0 > $f ? console.error("Unexpected pop.") : (t !== Qf[$f] && console.error("Unexpected Fiber popped."), e.current = Zf[$f], Zf[$f] = null, Qf[$f] = null, $f--);
		}
		function le(e, t, n) {
			$f++, Zf[$f] = e.current, Qf[$f] = n, e.current = t;
		}
		function ue(e) {
			return e === null && console.error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."), e;
		}
		function de(e, t) {
			le(np, t, e), le(tp, e, e), le(ep, null, e);
			var n = t.nodeType;
			switch (n) {
				case 9:
				case 11:
					n = n === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? Hu(t) : US;
					break;
				default: if (n = t.tagName, t = t.namespaceURI) t = Hu(t), t = Uu(t, n);
				else switch (n) {
					case "svg":
						t = WS;
						break;
					case "math":
						t = GS;
						break;
					default: t = US;
				}
			}
			n = n.toLowerCase(), n = Kt(null, n), n = {
				context: t,
				ancestorInfo: n
			}, ce(ep, e), le(ep, n, e);
		}
		function w(e) {
			ce(ep, e), ce(tp, e), ce(np, e);
		}
		function T() {
			return ue(ep.current);
		}
		function fe(e) {
			e.memoizedState !== null && le(rp, e, e);
			var t = ue(ep.current), n = e.type, r = Uu(t.context, n);
			n = Kt(t.ancestorInfo, n), r = {
				context: r,
				ancestorInfo: n
			}, t !== r && (le(tp, e, e), le(ep, r, e));
		}
		function pe(e) {
			tp.current === e && (ce(ep, e), ce(tp, e)), rp.current === e && (ce(rp, e), bC._currentValue = yC);
		}
		function me() {}
		function he() {
			if (ip === 0) {
				ap = console.log, op = console.info, sp = console.warn, cp = console.error, lp = console.group, up = console.groupCollapsed, dp = console.groupEnd;
				var e = {
					configurable: !0,
					enumerable: !0,
					value: me,
					writable: !0
				};
				Object.defineProperties(console, {
					info: e,
					log: e,
					warn: e,
					error: e,
					group: e,
					groupCollapsed: e,
					groupEnd: e
				});
			}
			ip++;
		}
		function ge() {
			if (ip--, ip === 0) {
				var e = {
					configurable: !0,
					enumerable: !0,
					writable: !0
				};
				Object.defineProperties(console, {
					log: z({}, e, { value: ap }),
					info: z({}, e, { value: op }),
					warn: z({}, e, { value: sp }),
					error: z({}, e, { value: cp }),
					group: z({}, e, { value: lp }),
					groupCollapsed: z({}, e, { value: up }),
					groupEnd: z({}, e, { value: dp })
				});
			}
			0 > ip && console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
		}
		function _e(e) {
			var t = Error.prepareStackTrace;
			if (Error.prepareStackTrace = void 0, e = e.stack, Error.prepareStackTrace = t, e.startsWith("Error: react-stack-top-frame\n") && (e = e.slice(29)), t = e.indexOf("\n"), t !== -1 && (e = e.slice(t + 1)), t = e.indexOf("react_stack_bottom_frame"), t !== -1 && (t = e.lastIndexOf("\n", t)), t !== -1) e = e.slice(0, t);
			else return "";
			return e;
		}
		function ve(e) {
			if (fp === void 0) try {
				throw Error();
			} catch (e) {
				var t = e.stack.trim().match(/\n( *(at )?)/);
				fp = t && t[1] || "", pp = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
			}
			return "\n" + fp + e + pp;
		}
		function ye(e, t) {
			if (!e || mp) return "";
			var n = hp.get(e);
			if (n !== void 0) return n;
			mp = !0, n = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
			var r = null;
			r = B.H, B.H = null, he();
			try {
				var i = { DetermineComponentFrameRoot: function() {
					try {
						if (t) {
							var n = function() {
								throw Error();
							};
							if (Object.defineProperty(n.prototype, "props", { set: function() {
								throw Error();
							} }), typeof Reflect == "object" && Reflect.construct) {
								try {
									Reflect.construct(n, []);
								} catch (e) {
									var r = e;
								}
								Reflect.construct(e, [], n);
							} else {
								try {
									n.call();
								} catch (e) {
									r = e;
								}
								e.call(n.prototype);
							}
						} else {
							try {
								throw Error();
							} catch (e) {
								r = e;
							}
							(n = e()) && typeof n.catch == "function" && n.catch(function() {});
						}
					} catch (e) {
						if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
					}
					return [null, null];
				} };
				i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
				var a = Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot, "name");
				a && a.configurable && Object.defineProperty(i.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
				var o = i.DetermineComponentFrameRoot(), s = o[0], c = o[1];
				if (s && c) {
					var l = s.split("\n"), u = c.split("\n");
					for (o = a = 0; a < l.length && !l[a].includes("DetermineComponentFrameRoot");) a++;
					for (; o < u.length && !u[o].includes("DetermineComponentFrameRoot");) o++;
					if (a === l.length || o === u.length) for (a = l.length - 1, o = u.length - 1; 1 <= a && 0 <= o && l[a] !== u[o];) o--;
					for (; 1 <= a && 0 <= o; a--, o--) if (l[a] !== u[o]) {
						if (a !== 1 || o !== 1) do
							if (a--, o--, 0 > o || l[a] !== u[o]) {
								var d = "\n" + l[a].replace(" at new ", " at ");
								return e.displayName && d.includes("<anonymous>") && (d = d.replace("<anonymous>", e.displayName)), typeof e == "function" && hp.set(e, d), d;
							}
						while (1 <= a && 0 <= o);
						break;
					}
				}
			} finally {
				mp = !1, B.H = r, ge(), Error.prepareStackTrace = n;
			}
			return l = (l = e ? e.displayName || e.name : "") ? ve(l) : "", typeof e == "function" && hp.set(e, l), l;
		}
		function be(e, t) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return ve(e.type);
				case 16: return ve("Lazy");
				case 13: return e.child !== t && t !== null ? ve("Suspense Fallback") : ve("Suspense");
				case 19: return ve("SuspenseList");
				case 0:
				case 15: return ye(e.type, !1);
				case 11: return ye(e.type.render, !1);
				case 1: return ye(e.type, !0);
				case 31: return ve("Activity");
				default: return "";
			}
		}
		function xe(e) {
			try {
				var t = "", n = null;
				do {
					t += be(e, n);
					var r = e._debugInfo;
					if (r) for (var i = r.length - 1; 0 <= i; i--) {
						var a = r[i];
						if (typeof a.name == "string") {
							var o = t;
							a: {
								var s = a.name, c = a.env, l = a.debugLocation;
								if (l != null) {
									var u = _e(l), d = u.lastIndexOf("\n"), f = d === -1 ? u : u.slice(d + 1);
									if (f.indexOf(s) !== -1) {
										var p = "\n" + f;
										break a;
									}
								}
								p = ve(s + (c ? " [" + c + "]" : ""));
							}
							t = o + p;
						}
					}
					n = e, e = e.return;
				} while (e);
				return t;
			} catch (e) {
				return "\nError generating stack: " + e.message + "\n" + e.stack;
			}
		}
		function Se(e) {
			return (e = e ? e.displayName || e.name : "") ? ve(e) : "";
		}
		function Ce() {
			if (gp === null) return null;
			var e = gp._debugOwner;
			return e == null ? null : oe(e);
		}
		function we() {
			if (gp === null) return "";
			var e = gp;
			try {
				var t = "";
				switch (e.tag === 6 && (e = e.return), e.tag) {
					case 26:
					case 27:
					case 5:
						t += ve(e.type);
						break;
					case 13:
						t += ve("Suspense");
						break;
					case 19:
						t += ve("SuspenseList");
						break;
					case 31:
						t += ve("Activity");
						break;
					case 30:
					case 0:
					case 15:
					case 1:
						e._debugOwner || t !== "" || (t += Se(e.type));
						break;
					case 11: e._debugOwner || t !== "" || (t += Se(e.type.render));
				}
				for (; e;) if (typeof e.tag == "number") {
					var n = e;
					e = n._debugOwner;
					var r = n._debugStack;
					if (e && r) {
						var i = _e(r);
						i !== "" && (t += "\n" + i);
					}
				} else if (e.debugStack != null) {
					var a = e.debugStack;
					(e = e.owner) && a && (t += "\n" + _e(a));
				} else break;
				var o = t;
			} catch (e) {
				o = "\nError generating stack: " + e.message + "\n" + e.stack;
			}
			return o;
		}
		function E(e, t, n, r, i, a, o) {
			var s = gp;
			Te(e);
			try {
				return e !== null && e._debugTask ? e._debugTask.run(t.bind(null, n, r, i, a, o)) : t(n, r, i, a, o);
			} finally {
				Te(s);
			}
			throw Error("runWithFiberInDEV should never be called in production. This is a bug in React.");
		}
		function Te(e) {
			B.getCurrentStack = e === null ? null : we, _p = !1, gp = e;
		}
		function Ee(e) {
			return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
		}
		function De(e) {
			try {
				return Oe(e), !1;
			} catch {
				return !0;
			}
		}
		function Oe(e) {
			return "" + e;
		}
		function ke(e, t) {
			if (De(e)) return console.error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.", t, Ee(e)), Oe(e);
		}
		function Ae(e, t) {
			if (De(e)) return console.error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.", t, Ee(e)), Oe(e);
		}
		function je(e) {
			if (De(e)) return console.error("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.", Ee(e)), Oe(e);
		}
		function Me(e) {
			if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
			var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (t.isDisabled) return !0;
			if (!t.supportsFiber) return console.error("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"), !0;
			try {
				Mp = t.inject(e), Np = t;
			} catch (e) {
				console.error("React instrumentation encountered an error: %o.", e);
			}
			return !!t.checkDCE;
		}
		function Ne(e) {
			if (typeof Ap == "function" && jp(e), Np && typeof Np.setStrictMode == "function") try {
				Np.setStrictMode(Mp, e);
			} catch (e) {
				Pp || (Pp = !0, console.error("React instrumentation encountered an error: %o", e));
			}
		}
		function Pe(e) {
			return e >>>= 0, e === 0 ? 32 : 31 - (Lp(e) / Rp | 0) | 0;
		}
		function Fe(e) {
			var t = e & 42;
			if (t !== 0) return t;
			switch (e & -e) {
				case 1: return 1;
				case 2: return 2;
				case 4: return 4;
				case 8: return 8;
				case 16: return 16;
				case 32: return 32;
				case 64: return 64;
				case 128: return 128;
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072: return e & 261888;
				case 262144:
				case 524288:
				case 1048576:
				case 2097152: return e & 3932160;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432: return e & 62914560;
				case 67108864: return 67108864;
				case 134217728: return 134217728;
				case 268435456: return 268435456;
				case 536870912: return 536870912;
				case 1073741824: return 0;
				default: return console.error("Should have found matching lanes. This is a bug in React."), e;
			}
		}
		function Ie(e, t, n) {
			var r = e.pendingLanes;
			if (r === 0) return 0;
			var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
			e = e.warmLanes;
			var s = r & 134217727;
			return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Fe(n))) : i = Fe(o) : i = Fe(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Fe(n))) : i = Fe(o)) : i = Fe(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
		}
		function Le(e, t) {
			return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
		}
		function Re(e, t) {
			switch (e) {
				case 1:
				case 2:
				case 4:
				case 8:
				case 64: return t + 250;
				case 16:
				case 32:
				case 128:
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152: return t + 5e3;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432: return -1;
				case 67108864:
				case 134217728:
				case 268435456:
				case 536870912:
				case 1073741824: return -1;
				default: return console.error("Should have found matching lanes. This is a bug in React."), -1;
			}
		}
		function ze() {
			var e = Vp;
			return Vp <<= 1, !(Vp & 62914560) && (Vp = 4194304), e;
		}
		function Be(e) {
			for (var t = [], n = 0; 31 > n; n++) t.push(e);
			return t;
		}
		function Ve(e, t) {
			e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
		}
		function He(e, t, n, r, i, a) {
			var o = e.pendingLanes;
			e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
			var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
			for (n = o & ~n; 0 < n;) {
				var u = 31 - Ip(n), d = 1 << u;
				s[u] = 0, c[u] = -1;
				var f = l[u];
				if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
					var p = f[u];
					p !== null && (p.lane &= -536870913);
				}
				n &= ~d;
			}
			r !== 0 && Ue(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
		}
		function Ue(e, t, n) {
			e.pendingLanes |= t, e.suspendedLanes &= ~t;
			var r = 31 - Ip(t);
			e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
		}
		function We(e, t) {
			var n = e.entangledLanes |= t;
			for (e = e.entanglements; n;) {
				var r = 31 - Ip(n), i = 1 << r;
				i & t | e[r] & t && (e[r] |= t), n &= ~i;
			}
		}
		function Ge(e, t) {
			var n = t & -t;
			return n = n & 42 ? 1 : Ke(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
		}
		function Ke(e) {
			switch (e) {
				case 2:
					e = 1;
					break;
				case 8:
					e = 4;
					break;
				case 32:
					e = 16;
					break;
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152:
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
					e = 128;
					break;
				case 268435456:
					e = 134217728;
					break;
				default: e = 0;
			}
			return e;
		}
		function qe(e, t, n) {
			if (Fp) for (e = e.pendingUpdatersLaneMap; 0 < n;) {
				var r = 31 - Ip(n), i = 1 << r;
				e[r].add(t), n &= ~i;
			}
		}
		function Je(e, t) {
			if (Fp) for (var n = e.pendingUpdatersLaneMap, r = e.memoizedUpdaters; 0 < t;) {
				var i = 31 - Ip(t);
				e = 1 << i, i = n[i], 0 < i.size && (i.forEach(function(e) {
					var t = e.alternate;
					t !== null && r.has(t) || r.add(e);
				}), i.clear()), t &= ~e;
			}
		}
		function Ye(e) {
			return e &= -e, Hp !== 0 && Hp < e ? Up !== 0 && Up < e ? e & 134217727 ? Wp : Gp : Up : Hp;
		}
		function Xe() {
			var e = Yf.p;
			return e === 0 ? (e = window.event, e === void 0 ? Wp : pf(e.type)) : e;
		}
		function Ze(e, t) {
			var n = Yf.p;
			try {
				return Yf.p = e, t();
			} finally {
				Yf.p = n;
			}
		}
		function Qe(e) {
			delete e[qp], delete e[Jp], delete e[Xp], delete e[Zp], delete e[Qp];
		}
		function $e(e) {
			var t = e[qp];
			if (t) return t;
			for (var n = e.parentNode; n;) {
				if (t = n[Yp] || n[qp]) {
					if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Cd(e); e !== null;) {
						if (n = e[qp]) return n;
						e = Cd(e);
					}
					return t;
				}
				e = n, n = e.parentNode;
			}
			return null;
		}
		function et(e) {
			if (e = e[qp] || e[Yp]) {
				var t = e.tag;
				if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
			}
			return null;
		}
		function tt(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
			throw Error("getNodeFromInstance: Invalid argument.");
		}
		function nt(e) {
			var t = e[$p];
			return t ||= e[$p] = {
				hoistableStyles: /* @__PURE__ */ new Map(),
				hoistableScripts: /* @__PURE__ */ new Map()
			}, t;
		}
		function rt(e) {
			e[em] = !0;
		}
		function it(e, t) {
			at(e, t), at(e + "Capture", t);
		}
		function at(e, t) {
			nm[e] && console.error("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), nm[e] = t;
			var n = e.toLowerCase();
			for (rm[n] = e, e === "onDoubleClick" && (rm.ondblclick = e), e = 0; e < t.length; e++) tm.add(t[e]);
		}
		function D(e, t) {
			im[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
		}
		function ot(e) {
			return vp.call(sm, e) ? !0 : vp.call(om, e) ? !1 : am.test(e) ? sm[e] = !0 : (om[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
		}
		function st(e, t, n) {
			if (ot(t)) {
				if (!e.hasAttribute(t)) {
					switch (typeof n) {
						case "symbol":
						case "object": return n;
						case "function": return n;
						case "boolean": if (!1 === n) return n;
					}
					return n === void 0 ? void 0 : null;
				}
				return e = e.getAttribute(t), e === "" && !0 === n ? !0 : (ke(n, t), e === "" + n ? n : e);
			}
		}
		function ct(e, t, n) {
			if (ot(t)) if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				ke(n, t), e.setAttribute(t, "" + n);
			}
		}
		function lt(e, t, n) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						e.removeAttribute(t);
						return;
				}
				ke(n, t), e.setAttribute(t, "" + n);
			}
		}
		function ut(e, t, n, r) {
			if (r === null) e.removeAttribute(n);
			else {
				switch (typeof r) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						e.removeAttribute(n);
						return;
				}
				ke(r, n), e.setAttributeNS(t, n, "" + r);
			}
		}
		function dt(e) {
			switch (typeof e) {
				case "bigint":
				case "boolean":
				case "number":
				case "string":
				case "undefined": return e;
				case "object": return je(e), e;
				default: return "";
			}
		}
		function ft(e) {
			var t = e.type;
			return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
		}
		function pt(e, t, n) {
			var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
			if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
				var i = r.get, a = r.set;
				return Object.defineProperty(e, t, {
					configurable: !0,
					get: function() {
						return i.call(this);
					},
					set: function(e) {
						je(e), n = "" + e, a.call(this, e);
					}
				}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
					getValue: function() {
						return n;
					},
					setValue: function(e) {
						je(e), n = "" + e;
					},
					stopTracking: function() {
						e._valueTracker = null, delete e[t];
					}
				};
			}
		}
		function mt(e) {
			if (!e._valueTracker) {
				var t = ft(e) ? "checked" : "value";
				e._valueTracker = pt(e, t, "" + e[t]);
			}
		}
		function ht(e) {
			if (!e) return !1;
			var t = e._valueTracker;
			if (!t) return !0;
			var n = t.getValue(), r = "";
			return e && (r = ft(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
		}
		function gt(e) {
			if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
			try {
				return e.activeElement || e.body;
			} catch {
				return e.body;
			}
		}
		function _t(e) {
			return e.replace(cm, function(e) {
				return "\\" + e.charCodeAt(0).toString(16) + " ";
			});
		}
		function vt(e, t) {
			t.checked === void 0 || t.defaultChecked === void 0 || um || (console.error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", Ce() || "A component", t.type), um = !0), t.value === void 0 || t.defaultValue === void 0 || lm || (console.error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", Ce() || "A component", t.type), lm = !0);
		}
		function yt(e, t, n, r, i, a, o, s) {
			e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? (ke(o, "type"), e.type = o) : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + dt(t)) : e.value !== "" + dt(t) && (e.value = "" + dt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : xt(e, o, dt(n)) : xt(e, o, dt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? (ke(s, "name"), e.name = "" + dt(s)) : e.removeAttribute("name");
		}
		function bt(e, t, n, r, i, a, o, s) {
			if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (ke(a, "type"), e.type = a), t != null || n != null) {
				if (!(a !== "submit" && a !== "reset" || t != null)) {
					mt(e);
					return;
				}
				n = n == null ? "" : "" + dt(n), t = t == null ? n : "" + dt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
			}
			r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (ke(o, "name"), e.name = o), mt(e);
		}
		function xt(e, t, n) {
			t === "number" && gt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
		}
		function St(e, t) {
			t.value ?? (typeof t.children == "object" && t.children !== null ? kf.Children.forEach(t.children, function(e) {
				e == null || typeof e == "string" || typeof e == "number" || typeof e == "bigint" || fm || (fm = !0, console.error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."));
			}) : t.dangerouslySetInnerHTML == null || pm || (pm = !0, console.error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), t.selected == null || dm || (console.error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), dm = !0);
		}
		function Ct() {
			var e = Ce();
			return e ? "\n\nCheck the render method of `" + e + "`." : "";
		}
		function wt(e, t, n, r) {
			if (e = e.options, t) {
				t = {};
				for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
				for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
			} else {
				for (n = "" + dt(n), t = null, i = 0; i < e.length; i++) {
					if (e[i].value === n) {
						e[i].selected = !0, r && (e[i].defaultSelected = !0);
						return;
					}
					t !== null || e[i].disabled || (t = e[i]);
				}
				t !== null && (t.selected = !0);
			}
		}
		function Tt(e, t) {
			for (e = 0; e < hm.length; e++) {
				var n = hm[e];
				if (t[n] != null) {
					var r = Jf(t[n]);
					t.multiple && !r ? console.error("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Ct()) : !t.multiple && r && console.error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Ct());
				}
			}
			t.value === void 0 || t.defaultValue === void 0 || mm || (console.error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"), mm = !0);
		}
		function Et(e, t) {
			t.value === void 0 || t.defaultValue === void 0 || gm || (console.error("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components", Ce() || "A component"), gm = !0), t.children != null && t.value == null && console.error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
		}
		function Dt(e, t, n) {
			if (t != null && (t = "" + dt(t), t !== e.value && (e.value = t), n == null)) {
				e.defaultValue !== t && (e.defaultValue = t);
				return;
			}
			e.defaultValue = n == null ? "" : "" + dt(n);
		}
		function Ot(e, t, n, r) {
			if (t == null) {
				if (r != null) {
					if (n != null) throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
					if (Jf(r)) {
						if (1 < r.length) throw Error("<textarea> can only have at most one child.");
						r = r[0];
					}
					n = r;
				}
				n ??= "", t = n;
			}
			n = dt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), mt(e);
		}
		function kt(e, t) {
			return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? kt(e.children[0], t) : e;
		}
		function At(e) {
			return "  " + "  ".repeat(e);
		}
		function jt(e) {
			return "+ " + "  ".repeat(e);
		}
		function Mt(e) {
			return "- " + "  ".repeat(e);
		}
		function Nt(e) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return e.type;
				case 16: return "Lazy";
				case 31: return "Activity";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 0:
				case 15: return e = e.type, e.displayName || e.name || null;
				case 11: return e = e.type.render, e.displayName || e.name || null;
				case 1: return e = e.type, e.displayName || e.name || null;
				default: return null;
			}
		}
		function Pt(e, t) {
			return _m.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? "{\"...\"}" : "{" + e.slice(0, t - 7) + "...\"}" : "{" + e + "}") : e.length > t ? 5 > t ? "{\"...\"}" : e.slice(0, t - 3) + "..." : e;
		}
		function Ft(e, t, n) {
			var r = 120 - 2 * n;
			if (t === null) return jt(n) + Pt(e, r) + "\n";
			if (typeof t == "string") {
				for (var i = 0; i < t.length && i < e.length && t.charCodeAt(i) === e.charCodeAt(i); i++);
				return i > r - 8 && 10 < i && (e = "..." + e.slice(i - 8), t = "..." + t.slice(i - 8)), jt(n) + Pt(e, r) + "\n" + Mt(n) + Pt(t, r) + "\n";
			}
			return At(n) + Pt(e, r) + "\n";
		}
		function It(e) {
			return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(e, t) {
				return t;
			});
		}
		function Lt(e, t) {
			switch (typeof e) {
				case "string": return e = JSON.stringify(e), e.length > t ? 5 > t ? "\"...\"" : e.slice(0, t - 4) + "...\"" : e;
				case "object":
					if (e === null) return "null";
					if (Jf(e)) return "[...]";
					if (e.$$typeof === Mf) return (t = ae(e.type)) ? "<" + t + ">" : "<...>";
					var n = It(e);
					if (n === "Object") {
						for (var r in n = "", t -= 2, e) if (e.hasOwnProperty(r)) {
							var i = JSON.stringify(r);
							if (i !== "\"" + r + "\"" && (r = i), t -= r.length - 2, i = Lt(e[r], 15 > t ? t : 15), t -= i.length, 0 > t) {
								n += n === "" ? "..." : ", ...";
								break;
							}
							n += (n === "" ? "" : ",") + r + ":" + i;
						}
						return "{" + n + "}";
					}
					return n;
				case "function": return (t = e.displayName || e.name) ? "function " + t : "function";
				default: return String(e);
			}
		}
		function Rt(e, t) {
			return typeof e != "string" || _m.test(e) ? "{" + Lt(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? "\"...\"" : "\"" + e.slice(0, t - 5) + "...\"" : "\"" + e + "\"";
		}
		function zt(e, t, n) {
			var r = 120 - n.length - e.length, i = [], a;
			for (a in t) if (t.hasOwnProperty(a) && a !== "children") {
				var o = Rt(t[a], 120 - n.length - a.length - 1);
				r -= a.length + o.length + 2, i.push(a + "=" + o);
			}
			return i.length === 0 ? n + "<" + e + ">\n" : 0 < r ? n + "<" + e + " " + i.join(" ") + ">\n" : n + "<" + e + "\n" + n + "  " + i.join("\n" + n + "  ") + "\n" + n + ">\n";
		}
		function Bt(e, t, n) {
			var r = "", i = z({}, t), a;
			for (a in e) if (e.hasOwnProperty(a)) {
				delete i[a];
				var o = 120 - 2 * n - a.length - 2, s = Lt(e[a], o);
				t.hasOwnProperty(a) ? (o = Lt(t[a], o), r += jt(n) + a + ": " + s + "\n", r += Mt(n) + a + ": " + o + "\n") : r += jt(n) + a + ": " + s + "\n";
			}
			for (var c in i) i.hasOwnProperty(c) && (e = Lt(i[c], 120 - 2 * n - c.length - 2), r += Mt(n) + c + ": " + e + "\n");
			return r;
		}
		function Vt(e, t, n, r) {
			var i = "", a = /* @__PURE__ */ new Map();
			for (l in n) n.hasOwnProperty(l) && a.set(l.toLowerCase(), l);
			if (a.size === 1 && a.has("children")) i += zt(e, t, At(r));
			else {
				for (var o in t) if (t.hasOwnProperty(o) && o !== "children") {
					var s = 120 - 2 * (r + 1) - o.length - 1, c = a.get(o.toLowerCase());
					if (c !== void 0) {
						a.delete(o.toLowerCase());
						var l = t[o];
						c = n[c];
						var u = Rt(l, s);
						s = Rt(c, s), typeof l == "object" && l && typeof c == "object" && c && It(l) === "Object" && It(c) === "Object" && (2 < Object.keys(l).length || 2 < Object.keys(c).length || -1 < u.indexOf("...") || -1 < s.indexOf("...")) ? i += At(r + 1) + o + "={{\n" + Bt(l, c, r + 2) + At(r + 1) + "}}\n" : (i += jt(r + 1) + o + "=" + u + "\n", i += Mt(r + 1) + o + "=" + s + "\n");
					} else i += At(r + 1) + o + "=" + Rt(t[o], s) + "\n";
				}
				a.forEach(function(e) {
					if (e !== "children") {
						var t = 120 - 2 * (r + 1) - e.length - 1;
						i += Mt(r + 1) + e + "=" + Rt(n[e], t) + "\n";
					}
				}), i = i === "" ? At(r) + "<" + e + ">\n" : At(r) + "<" + e + "\n" + i + At(r) + ">\n";
			}
			return e = n.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (a = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (a = "" + t), i += Ft(a, "" + e, r + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (i = e == null ? i + Ft("" + t, null, r + 1) : i + Ft("" + t, void 0, r + 1)), i;
		}
		function Ht(e, t) {
			var n = Nt(e);
			if (n === null) {
				for (n = "", e = e.child; e;) n += Ht(e, t), e = e.sibling;
				return n;
			}
			return At(t) + "<" + n + ">\n";
		}
		function Ut(e, t) {
			var n = kt(e, t);
			if (n !== e && (e.children.length !== 1 || e.children[0] !== n)) return At(t) + "...\n" + Ut(n, t + 1);
			n = "";
			var r = e.fiber._debugInfo;
			if (r) for (var i = 0; i < r.length; i++) {
				var a = r[i].name;
				typeof a == "string" && (n += At(t) + "<" + a + ">\n", t++);
			}
			if (r = "", i = e.fiber.pendingProps, e.fiber.tag === 6) r = Ft(i, e.serverProps, t), t++;
			else if (a = Nt(e.fiber), a !== null) if (e.serverProps === void 0) {
				r = t;
				var o = 120 - 2 * r - a.length - 2, s = "";
				for (l in i) if (i.hasOwnProperty(l) && l !== "children") {
					var c = Rt(i[l], 15);
					if (o -= l.length + c.length + 2, 0 > o) {
						s += " ...";
						break;
					}
					s += " " + l + "=" + c;
				}
				r = At(r) + "<" + a + s + ">\n", t++;
			} else e.serverProps === null ? (r = zt(a, i, jt(t)), t++) : typeof e.serverProps == "string" ? console.error("Should not have matched a non HostText fiber to a Text node. This is a bug in React.") : (r = Vt(a, i, e.serverProps, t), t++);
			var l = "";
			for (i = e.fiber.child, a = 0; i && a < e.children.length;) o = e.children[a], o.fiber === i ? (l += Ut(o, t), a++) : l += Ht(i, t), i = i.sibling;
			for (i && 0 < e.children.length && (l += At(t) + "...\n"), i = e.serverTail, e.serverProps === null && t--, e = 0; e < i.length; e++) a = i[e], l = typeof a == "string" ? l + (Mt(t) + Pt(a, 120 - 2 * t) + "\n") : l + zt(a.type, a.props, Mt(t));
			return n + r + l;
		}
		function Wt(e) {
			try {
				return "\n\n" + Ut(e, 0);
			} catch {
				return "";
			}
		}
		function Gt(e, t, n) {
			for (var r = t, i = null, a = 0; r;) r === e && (a = 0), i = {
				fiber: r,
				children: i === null ? [] : [i],
				serverProps: r === t ? n : r === e ? null : void 0,
				serverTail: [],
				distanceFromLeaf: a
			}, a++, r = r.return;
			return i === null ? "" : Wt(i).replaceAll(/^[+-]/gm, ">");
		}
		function Kt(e, t) {
			var n = z({}, e || Sm), r = { tag: t };
			return ym.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), bm.indexOf(t) !== -1 && (n.pTagInButtonScope = null), vm.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = r, t === "form" && (n.formTag = r), t === "a" && (n.aTagInScope = r), t === "button" && (n.buttonTagInScope = r), t === "nobr" && (n.nobrTagInScope = r), t === "p" && (n.pTagInButtonScope = r), t === "li" && (n.listItemTagAutoclosing = r), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = r), t === "#document" || t === "html" ? n.containerTagInScope = null : n.containerTagInScope ||= r, e !== null || t !== "#document" && t !== "html" && t !== "body" ? !0 === n.implicitRootScope && (n.implicitRootScope = !1) : n.implicitRootScope = !0, n;
		}
		function qt(e, t, n) {
			switch (t) {
				case "select": return e === "hr" || e === "option" || e === "optgroup" || e === "script" || e === "template" || e === "#text";
				case "optgroup": return e === "option" || e === "#text";
				case "option": return e === "#text";
				case "tr": return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
				case "tbody":
				case "thead":
				case "tfoot": return e === "tr" || e === "style" || e === "script" || e === "template";
				case "colgroup": return e === "col" || e === "template";
				case "table": return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
				case "head": return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
				case "html":
					if (n) break;
					return e === "head" || e === "body" || e === "frameset";
				case "frameset": return e === "frame";
				case "#document": if (!n) return e === "html";
			}
			switch (e) {
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6": return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
				case "rp":
				case "rt": return xm.indexOf(t) === -1;
				case "caption":
				case "col":
				case "colgroup":
				case "frameset":
				case "frame":
				case "tbody":
				case "td":
				case "tfoot":
				case "th":
				case "thead":
				case "tr": return t == null;
				case "head": return n || t === null;
				case "html": return n && t === "#document" || t === null;
				case "body": return n && (t === "#document" || t === "html") || t === null;
			}
			return !0;
		}
		function Jt(e, t) {
			switch (e) {
				case "address":
				case "article":
				case "aside":
				case "blockquote":
				case "center":
				case "details":
				case "dialog":
				case "dir":
				case "div":
				case "dl":
				case "fieldset":
				case "figcaption":
				case "figure":
				case "footer":
				case "header":
				case "hgroup":
				case "main":
				case "menu":
				case "nav":
				case "ol":
				case "p":
				case "section":
				case "summary":
				case "ul":
				case "pre":
				case "listing":
				case "table":
				case "hr":
				case "xmp":
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6": return t.pTagInButtonScope;
				case "form": return t.formTag || t.pTagInButtonScope;
				case "li": return t.listItemTagAutoclosing;
				case "dd":
				case "dt": return t.dlItemTagAutoclosing;
				case "button": return t.buttonTagInScope;
				case "a": return t.aTagInScope;
				case "nobr": return t.nobrTagInScope;
			}
			return null;
		}
		function Yt(e, t) {
			for (; e;) {
				switch (e.tag) {
					case 5:
					case 26:
					case 27: if (e.type === t) return e;
				}
				e = e.return;
			}
			return null;
		}
		function Xt(e, t) {
			t ||= Sm;
			var n = t.current;
			if (t = (n = qt(e, n && n.tag, t.implicitRootScope) ? null : n) ? null : Jt(e, t), t = n || t, !t) return !0;
			var r = t.tag;
			if (t = String(!!n) + "|" + e + "|" + r, Cm[t]) return !1;
			Cm[t] = !0;
			var i = (t = gp) ? Yt(t.return, r) : null, a = t !== null && i !== null ? Gt(i, t, null) : "", o = "<" + e + ">";
			return n ? (n = "", r === "table" && e === "tr" && (n += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error("In HTML, %s cannot be a child of <%s>.%s\nThis will cause a hydration error.%s", o, r, n, a)) : console.error("In HTML, %s cannot be a descendant of <%s>.\nThis will cause a hydration error.%s", o, r, a), t && (e = t.return, i === null || e === null || i === e && e._debugOwner === t._debugOwner || E(i, function() {
				console.error("<%s> cannot contain a nested %s.\nSee this log for the ancestor stack trace.", r, o);
			})), !1;
		}
		function Zt(e, t, n) {
			if (n || qt("#text", t, !1)) return !0;
			if (n = "#text|" + t, Cm[n]) return !1;
			Cm[n] = !0;
			var r = (n = gp) ? Yt(n, t) : null;
			return n = n !== null && r !== null ? Gt(r, n, n.tag === 6 ? null : { children: null }) : "", /\S/.test(e) ? console.error("In HTML, text nodes cannot be a child of <%s>.\nThis will cause a hydration error.%s", t, n) : console.error("In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.\nThis will cause a hydration error.%s", t, n), !1;
		}
		function Qt(e, t) {
			if (t) {
				var n = e.firstChild;
				if (n && n === e.lastChild && n.nodeType === 3) {
					n.nodeValue = t;
					return;
				}
			}
			e.textContent = t;
		}
		function $t(e) {
			return e.replace(km, function(e, t) {
				return t.toUpperCase();
			});
		}
		function en(e, t, n) {
			var r = t.indexOf("--") === 0;
			r || (-1 < t.indexOf("-") ? jm.hasOwnProperty(t) && jm[t] || (jm[t] = !0, console.error("Unsupported style property %s. Did you mean %s?", t, $t(t.replace(Om, "ms-")))) : Dm.test(t) ? jm.hasOwnProperty(t) && jm[t] || (jm[t] = !0, console.error("Unsupported vendor-prefixed style property %s. Did you mean %s?", t, t.charAt(0).toUpperCase() + t.slice(1))) : !Am.test(n) || Mm.hasOwnProperty(n) && Mm[n] || (Mm[n] = !0, console.error("Style property values shouldn't contain a semicolon. Try \"%s: %s\" instead.", t, n.replace(Am, ""))), typeof n == "number" && (isNaN(n) ? Nm || (Nm = !0, console.error("`NaN` is an invalid value for the `%s` css style property.", t)) : isFinite(n) || Pm || (Pm = !0, console.error("`Infinity` is an invalid value for the `%s` css style property.", t)))), n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Fm.has(t) ? t === "float" ? e.cssFloat = n : (Ae(n, t), e[t] = ("" + n).trim()) : e[t] = n + "px";
		}
		function tn(e, t, n) {
			if (t != null && typeof t != "object") throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			if (t && Object.freeze(t), e = e.style, n != null) {
				if (t) {
					var r = {};
					if (n) {
						for (var i in n) if (n.hasOwnProperty(i) && !t.hasOwnProperty(i)) for (var a = wm[i] || [i], o = 0; o < a.length; o++) r[a[o]] = i;
					}
					for (var s in t) if (t.hasOwnProperty(s) && (!n || n[s] !== t[s])) for (i = wm[s] || [s], a = 0; a < i.length; a++) r[i[a]] = s;
					for (var c in s = {}, t) for (i = wm[c] || [c], a = 0; a < i.length; a++) s[i[a]] = c;
					for (var l in c = {}, r) if (i = r[l], (a = s[l]) && i !== a && (o = i + "," + a, !c[o])) {
						c[o] = !0, o = console;
						var u = t[i];
						o.error.call(o, "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", u == null || typeof u == "boolean" || u === "" ? "Removing" : "Updating", i, a);
					}
				}
				for (var d in n) !n.hasOwnProperty(d) || t != null && t.hasOwnProperty(d) || (d.indexOf("--") === 0 ? e.setProperty(d, "") : d === "float" ? e.cssFloat = "" : e[d] = "");
				for (var f in t) l = t[f], t.hasOwnProperty(f) && n[f] !== l && en(e, f, l);
			} else for (r in t) t.hasOwnProperty(r) && en(e, r, t[r]);
		}
		function nn(e) {
			if (e.indexOf("-") === -1) return !1;
			switch (e) {
				case "annotation-xml":
				case "color-profile":
				case "font-face":
				case "font-face-src":
				case "font-face-uri":
				case "font-face-format":
				case "font-face-name":
				case "missing-glyph": return !1;
				default: return !0;
			}
		}
		function rn(e) {
			return Rm.get(e) || e;
		}
		function an(e, t) {
			if (vp.call(Vm, t) && Vm[t]) return !0;
			if (Um.test(t)) {
				if (e = "aria-" + t.slice(4).toLowerCase(), e = Bm.hasOwnProperty(e) ? e : null, e == null) return console.error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), Vm[t] = !0;
				if (t !== e) return console.error("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, e), Vm[t] = !0;
			}
			if (Hm.test(t)) {
				if (e = t.toLowerCase(), e = Bm.hasOwnProperty(e) ? e : null, e == null) return Vm[t] = !0, !1;
				t !== e && (console.error("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, e), Vm[t] = !0);
			}
			return !0;
		}
		function on(e, t) {
			var n = [], r;
			for (r in t) an(e, r) || n.push(r);
			t = n.map(function(e) {
				return "`" + e + "`";
			}).join(", "), n.length === 1 ? console.error("Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e) : 1 < n.length && console.error("Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e);
		}
		function sn(e, t, n, r) {
			if (vp.call(Gm, t) && Gm[t]) return !0;
			var i = t.toLowerCase();
			if (i === "onfocusin" || i === "onfocusout") return console.error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Gm[t] = !0;
			if (typeof n == "function" && (e === "form" && t === "action" || e === "input" && t === "formAction" || e === "button" && t === "formAction")) return !0;
			if (r != null) {
				if (e = r.possibleRegistrationNames, r.registrationNameDependencies.hasOwnProperty(t)) return !0;
				if (r = e.hasOwnProperty(i) ? e[i] : null, r != null) return console.error("Invalid event handler property `%s`. Did you mean `%s`?", t, r), Gm[t] = !0;
				if (Km.test(t)) return console.error("Unknown event handler property `%s`. It will be ignored.", t), Gm[t] = !0;
			} else if (Km.test(t)) return qm.test(t) && console.error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Gm[t] = !0;
			if (Jm.test(t) || Ym.test(t)) return !0;
			if (i === "innerhtml") return console.error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Gm[t] = !0;
			if (i === "aria") return console.error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Gm[t] = !0;
			if (i === "is" && n != null && typeof n != "string") return console.error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Gm[t] = !0;
			if (typeof n == "number" && isNaN(n)) return console.error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Gm[t] = !0;
			if (zm.hasOwnProperty(i)) {
				if (i = zm[i], i !== t) return console.error("Invalid DOM property `%s`. Did you mean `%s`?", t, i), Gm[t] = !0;
			} else if (t !== i) return console.error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, i), Gm[t] = !0;
			switch (t) {
				case "dangerouslySetInnerHTML":
				case "children":
				case "style":
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "defaultValue":
				case "defaultChecked":
				case "innerHTML":
				case "ref": return !0;
				case "innerText":
				case "textContent": return !0;
			}
			switch (typeof n) {
				case "boolean": switch (t) {
					case "autoFocus":
					case "checked":
					case "multiple":
					case "muted":
					case "selected":
					case "contentEditable":
					case "spellCheck":
					case "draggable":
					case "value":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
					case "allowFullScreen":
					case "async":
					case "autoPlay":
					case "controls":
					case "default":
					case "defer":
					case "disabled":
					case "disablePictureInPicture":
					case "disableRemotePlayback":
					case "formNoValidate":
					case "hidden":
					case "loop":
					case "noModule":
					case "noValidate":
					case "open":
					case "playsInline":
					case "readOnly":
					case "required":
					case "reversed":
					case "scoped":
					case "seamless":
					case "itemScope":
					case "capture":
					case "download":
					case "inert": return !0;
					default: return i = t.toLowerCase().slice(0, 5), i === "data-" || i === "aria-" ? !0 : (n ? console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.", n, t, t, n, t) : console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", n, t, t, n, t, t, t), Gm[t] = !0);
				}
				case "function":
				case "symbol": return Gm[t] = !0, !1;
				case "string": if (n === "false" || n === "true") {
					switch (t) {
						case "checked":
						case "selected":
						case "multiple":
						case "muted":
						case "allowFullScreen":
						case "async":
						case "autoPlay":
						case "controls":
						case "default":
						case "defer":
						case "disabled":
						case "disablePictureInPicture":
						case "disableRemotePlayback":
						case "formNoValidate":
						case "hidden":
						case "loop":
						case "noModule":
						case "noValidate":
						case "open":
						case "playsInline":
						case "readOnly":
						case "required":
						case "reversed":
						case "scoped":
						case "seamless":
						case "itemScope":
						case "inert": break;
						default: return !0;
					}
					console.error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : "Although this works, it will not work as expected if you pass the string \"false\".", t, n), Gm[t] = !0;
				}
			}
			return !0;
		}
		function cn(e, t, n) {
			var r = [], i;
			for (i in t) sn(e, i, t[i], n) || r.push(i);
			t = r.map(function(e) {
				return "`" + e + "`";
			}).join(", "), r.length === 1 ? console.error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e) : 1 < r.length && console.error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e);
		}
		function ln(e) {
			return Xm.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
		}
		function un() {}
		function dn(e) {
			return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
		}
		function fn(e) {
			var t = et(e);
			if (t && (e = t.stateNode)) {
				var n = e[Jp] || null;
				a: switch (e = t.stateNode, t.type) {
					case "input":
						if (yt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
							for (n = e; n.parentNode;) n = n.parentNode;
							for (ke(t, "name"), n = n.querySelectorAll("input[name=\"" + _t("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
								var r = n[t];
								if (r !== e && r.form === e.form) {
									var i = r[Jp] || null;
									if (!i) throw Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
									yt(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
								}
							}
							for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && ht(r);
						}
						break a;
					case "textarea":
						Dt(e, n.value, n.defaultValue);
						break a;
					case "select": t = n.value, t != null && wt(e, !!n.multiple, t, !1);
				}
			}
		}
		function pn(e, t, n) {
			if (eh) return e(t, n);
			eh = !0;
			try {
				return e(t);
			} finally {
				if (eh = !1, (Qm !== null || $m !== null) && (dl(), Qm && (t = Qm, e = $m, $m = Qm = null, fn(t), e))) for (t = 0; t < e.length; t++) fn(e[t]);
			}
		}
		function mn(e, t) {
			var n = e.stateNode;
			if (n === null) return null;
			var r = n[Jp] || null;
			if (r === null) return null;
			n = r[t];
			a: switch (t) {
				case "onClick":
				case "onClickCapture":
				case "onDoubleClick":
				case "onDoubleClickCapture":
				case "onMouseDown":
				case "onMouseDownCapture":
				case "onMouseMove":
				case "onMouseMoveCapture":
				case "onMouseUp":
				case "onMouseUpCapture":
				case "onMouseEnter":
					(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
					break a;
				default: e = !1;
			}
			if (e) return null;
			if (n && typeof n != "function") throw Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof n + "` type.");
			return n;
		}
		function hn() {
			if (oh) return oh;
			var e, t = ah, n = t.length, r, i = "value" in ih ? ih.value : ih.textContent, a = i.length;
			for (e = 0; e < n && t[e] === i[e]; e++);
			var o = n - e;
			for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
			return oh = i.slice(e, 1 < r ? 1 - r : void 0);
		}
		function gn(e) {
			var t = e.keyCode;
			return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
		}
		function _n() {
			return !0;
		}
		function vn() {
			return !1;
		}
		function yn(e) {
			function t(t, n, r, i, a) {
				for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
				return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? _n : vn, this.isPropagationStopped = vn, this;
			}
			return z(t.prototype, {
				preventDefault: function() {
					this.defaultPrevented = !0;
					var e = this.nativeEvent;
					e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = _n);
				},
				stopPropagation: function() {
					var e = this.nativeEvent;
					e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = _n);
				},
				persist: function() {},
				isPersistent: _n
			}), t;
		}
		function bn(e) {
			var t = this.nativeEvent;
			return t.getModifierState ? t.getModifierState(e) : (e = wh[e]) ? !!t[e] : !1;
		}
		function xn() {
			return bn;
		}
		function Sn(e, t) {
			switch (e) {
				case "keyup": return jh.indexOf(t.keyCode) !== -1;
				case "keydown": return t.keyCode !== Mh;
				case "keypress":
				case "mousedown":
				case "focusout": return !0;
				default: return !1;
			}
		}
		function Cn(e) {
			return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
		}
		function wn(e, t) {
			switch (e) {
				case "compositionend": return Cn(t);
				case "keypress": return t.which === Lh ? (zh = !0, Rh) : null;
				case "textInput": return e = t.data, e === Rh && zh ? null : e;
				default: return null;
			}
		}
		function Tn(e, t) {
			if (Bh) return e === "compositionend" || !Nh && Sn(e, t) ? (e = hn(), oh = ah = ih = null, Bh = !1, e) : null;
			switch (e) {
				case "paste": return null;
				case "keypress":
					if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
						if (t.char && 1 < t.char.length) return t.char;
						if (t.which) return String.fromCharCode(t.which);
					}
					return null;
				case "compositionend": return Ih && t.locale !== "ko" ? null : t.data;
				default: return null;
			}
		}
		function En(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t === "input" ? !!Vh[e.type] : t === "textarea";
		}
		function Dn(e) {
			if (!th) return !1;
			e = "on" + e;
			var t = e in document;
			return t ||= (t = document.createElement("div"), t.setAttribute(e, "return;"), typeof t[e] == "function"), t;
		}
		function On(e, t, n, r) {
			Qm ? $m ? $m.push(r) : $m = [r] : Qm = r, t = hu(t, "onChange"), 0 < t.length && (n = new ch("onChange", "change", null, n, r), e.push({
				event: n,
				listeners: t
			}));
		}
		function kn(e) {
			lu(e, 0);
		}
		function An(e) {
			if (ht(tt(e))) return e;
		}
		function jn(e, t) {
			if (e === "change") return t;
		}
		function Mn() {
			Hh && (Hh.detachEvent("onpropertychange", Nn), Uh = Hh = null);
		}
		function Nn(e) {
			if (e.propertyName === "value" && An(Uh)) {
				var t = [];
				On(t, Uh, e, dn(e)), pn(kn, t);
			}
		}
		function Pn(e, t, n) {
			e === "focusin" ? (Mn(), Hh = t, Uh = n, Hh.attachEvent("onpropertychange", Nn)) : e === "focusout" && Mn();
		}
		function Fn(e) {
			if (e === "selectionchange" || e === "keyup" || e === "keydown") return An(Uh);
		}
		function In(e, t) {
			if (e === "click") return An(t);
		}
		function Ln(e, t) {
			if (e === "input" || e === "change") return An(t);
		}
		function Rn(e, t) {
			return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
		}
		function zn(e, t) {
			if (Gh(e, t)) return !0;
			if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
			var n = Object.keys(e), r = Object.keys(t);
			if (n.length !== r.length) return !1;
			for (r = 0; r < n.length; r++) {
				var i = n[r];
				if (!vp.call(t, i) || !Gh(e[i], t[i])) return !1;
			}
			return !0;
		}
		function Bn(e) {
			for (; e && e.firstChild;) e = e.firstChild;
			return e;
		}
		function Vn(e, t) {
			var n = Bn(e);
			e = 0;
			for (var r; n;) {
				if (n.nodeType === 3) {
					if (r = e + n.textContent.length, e <= t && r >= t) return {
						node: n,
						offset: t - e
					};
					e = r;
				}
				a: {
					for (; n;) {
						if (n.nextSibling) {
							n = n.nextSibling;
							break a;
						}
						n = n.parentNode;
					}
					n = void 0;
				}
				n = Bn(n);
			}
		}
		function Hn(e, t) {
			return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Hn(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
		}
		function Un(e) {
			e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
			for (var t = gt(e.document); t instanceof e.HTMLIFrameElement;) {
				try {
					var n = typeof t.contentWindow.location.href == "string";
				} catch {
					n = !1;
				}
				if (n) e = t.contentWindow;
				else break;
				t = gt(e.document);
			}
			return t;
		}
		function Wn(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
		}
		function Gn(e, t, n) {
			var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
			Xh || qh == null || qh !== gt(r) || (r = qh, "selectionStart" in r && Wn(r) ? r = {
				start: r.selectionStart,
				end: r.selectionEnd
			} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
				anchorNode: r.anchorNode,
				anchorOffset: r.anchorOffset,
				focusNode: r.focusNode,
				focusOffset: r.focusOffset
			}), Yh && zn(Yh, r) || (Yh = r, r = hu(Jh, "onSelect"), 0 < r.length && (t = new ch("onSelect", "select", null, t, n), e.push({
				event: t,
				listeners: r
			}), t.target = qh)));
		}
		function Kn(e, t) {
			var n = {};
			return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
		}
		function qn(e) {
			if (Qh[e]) return Qh[e];
			if (!Zh[e]) return e;
			var t = Zh[e], n;
			for (n in t) if (t.hasOwnProperty(n) && n in $h) return Qh[e] = t[n];
			return e;
		}
		function Jn(e, t) {
			sg.set(e, t), it(t, [e]);
		}
		function Yn(e) {
			for (var t = hg, n = 0; n < e.length; n++) {
				var r = e[n];
				if (typeof r == "object" && r) if (Jf(r) && r.length === 2 && typeof r[0] == "string") {
					if (t !== hg && t !== vg) return gg;
					t = vg;
				} else return gg;
				else {
					if (typeof r == "function" || typeof r == "string" && 50 < r.length || t !== hg && t !== _g) return gg;
					t = _g;
				}
			}
			return t;
		}
		function Xn(e, t, n, r) {
			for (var i in e) vp.call(e, i) && i[0] !== "_" && Zn(i, e[i], t, n, r);
		}
		function Zn(e, t, n, r, i) {
			switch (typeof t) {
				case "object": if (t === null) {
					t = "null";
					break;
				} else {
					if (t.$$typeof === Mf) {
						var a = ae(t.type) || "…", o = t.key;
						t = t.props;
						var s = Object.keys(t), c = s.length;
						if (o == null && c === 0) {
							t = "<" + a + " />";
							break;
						}
						if (3 > r || c === 1 && s[0] === "children" && o == null) {
							t = "<" + a + " … />";
							break;
						}
						for (var l in n.push([i + "\xA0\xA0".repeat(r) + e, "<" + a]), o !== null && Zn("key", o, n, r + 1, i), e = !1, t) l === "children" ? t.children != null && (!Jf(t.children) || 0 < t.children.length) && (e = !0) : vp.call(t, l) && l[0] !== "_" && Zn(l, t[l], n, r + 1, i);
						n.push(["", e ? ">…</" + a + ">" : "/>"]);
						return;
					}
					if (a = Object.prototype.toString.call(t), a = a.slice(8, a.length - 1), a === "Array") {
						if (l = Yn(t), l === _g || l === hg) {
							t = JSON.stringify(t);
							break;
						} else if (l === vg) {
							for (n.push([i + "\xA0\xA0".repeat(r) + e, ""]), e = 0; e < t.length; e++) a = t[e], Zn(a[0], a[1], n, r + 1, i);
							return;
						}
					}
					if (a === "Promise") {
						if (t.status === "fulfilled") {
							if (a = n.length, Zn(e, t.value, n, r, i), n.length > a) {
								n = n[a], n[1] = "Promise<" + (n[1] || "Object") + ">";
								return;
							}
						} else if (t.status === "rejected" && (a = n.length, Zn(e, t.reason, n, r, i), n.length > a)) {
							n = n[a], n[1] = "Rejected Promise<" + n[1] + ">";
							return;
						}
						n.push(["\xA0\xA0".repeat(r) + e, "Promise"]);
						return;
					}
					a === "Object" && (l = Object.getPrototypeOf(t)) && typeof l.constructor == "function" && (a = l.constructor.name), n.push([i + "\xA0\xA0".repeat(r) + e, a === "Object" ? 3 > r ? "" : "…" : a]), 3 > r && Xn(t, n, r + 1, i);
					return;
				}
				case "function":
					t = t.name === "" ? "() => {}" : t.name + "() {}";
					break;
				case "string":
					t = t === mg ? "…" : JSON.stringify(t);
					break;
				case "undefined":
					t = "undefined";
					break;
				case "boolean":
					t = t ? "true" : "false";
					break;
				default: t = String(t);
			}
			n.push([i + "\xA0\xA0".repeat(r) + e, t]);
		}
		function Qn(e, t, n, r) {
			var i = !0;
			for (o in e) o in t || (n.push([yg + "\xA0\xA0".repeat(r) + o, "…"]), i = !1);
			for (var a in t) if (a in e) {
				var o = e[a], s = t[a];
				if (o !== s) {
					if (r === 0 && a === "children") i = "\xA0\xA0".repeat(r) + a, n.push([yg + i, "…"], [bg + i, "…"]);
					else {
						if (!(3 <= r)) {
							if (typeof o == "object" && typeof s == "object" && o !== null && s !== null && o.$$typeof === s.$$typeof) if (s.$$typeof === Mf) {
								if (o.type === s.type && o.key === s.key) {
									o = ae(s.type) || "…", i = "\xA0\xA0".repeat(r) + a, o = "<" + o + " … />", n.push([yg + i, o], [bg + i, o]), i = !1;
									continue;
								}
							} else {
								var c = Object.prototype.toString.call(o), l = Object.prototype.toString.call(s);
								if (c === l && (l === "[object Object]" || l === "[object Array]")) {
									c = [xg + "\xA0\xA0".repeat(r) + a, l === "[object Array]" ? "Array" : ""], n.push(c), l = n.length, Qn(o, s, n, r + 1) ? l === n.length && (c[1] = "Referentially unequal but deeply equal objects. Consider memoization.") : i = !1;
									continue;
								}
							}
							else if (typeof o == "function" && typeof s == "function" && o.name === s.name && o.length === s.length && (c = Function.prototype.toString.call(o), l = Function.prototype.toString.call(s), c === l)) {
								o = s.name === "" ? "() => {}" : s.name + "() {}", n.push([xg + "\xA0\xA0".repeat(r) + a, o + " Referentially unequal function closure. Consider memoization."]);
								continue;
							}
						}
						Zn(a, o, n, r, yg), Zn(a, s, n, r, bg);
					}
					i = !1;
				}
			} else n.push([bg + "\xA0\xA0".repeat(r) + a, "…"]), i = !1;
			return i;
		}
		function $n(e) {
			H = e & 63 ? "Blocking" : e & 64 ? "Gesture" : e & 4194176 ? "Transition" : e & 62914560 ? "Suspense" : e & 2080374784 ? "Idle" : "Other";
		}
		function er(e, t, n, r) {
			Sg && (Eg.start = t, Eg.end = n, Tg.color = "warning", Tg.tooltipText = r, Tg.properties = null, (e = e._debugTask) ? e.run(performance.measure.bind(performance, r, Eg)) : performance.measure(r, Eg));
		}
		function tr(e, t, n) {
			er(e, t, n, "Reconnect");
		}
		function nr(e, t, n, r, i) {
			var a = C(e);
			if (a !== null && Sg) {
				var o = e.alternate, s = e.actualDuration;
				if (o === null || o.child !== e.child) for (var c = e.child; c !== null; c = c.sibling) s -= c.actualDuration;
				r = .5 > s ? r ? "tertiary-light" : "primary-light" : 10 > s ? r ? "tertiary" : "primary" : 100 > s ? r ? "tertiary-dark" : "primary-dark" : "error";
				var l = e.memoizedProps;
				s = e._debugTask, l !== null && o !== null && o.memoizedProps !== l ? (c = [Dg], l = Qn(o.memoizedProps, l, c, 0), 1 < c.length && (l && !wg && (o.lanes & i) === 0 && 100 < e.actualDuration ? (wg = !0, c[0] = kg, Tg.color = "warning", Tg.tooltipText = Og) : (Tg.color = r, Tg.tooltipText = a), Tg.properties = c, Eg.start = t, Eg.end = n, s == null ? performance.measure("​" + a, Eg) : s.run(performance.measure.bind(performance, "​" + a, Eg)))) : s == null ? console.timeStamp(a, t, n, Cg, void 0, r) : s.run(console.timeStamp.bind(console, a, t, n, Cg, void 0, r));
			}
		}
		function rr(e, t, n, r) {
			if (Sg) {
				var i = C(e);
				if (i !== null) {
					for (var a = null, o = [], s = 0; s < r.length; s++) {
						var c = r[s];
						a == null && c.source !== null && (a = c.source._debugTask), c = c.value, o.push(["Error", typeof c == "object" && c && typeof c.message == "string" ? String(c.message) : String(c)]);
					}
					e.key !== null && Zn("key", e.key, o, 0, ""), e.memoizedProps !== null && Xn(e.memoizedProps, o, 0, ""), a ??= e._debugTask, e = {
						start: t,
						end: n,
						detail: { devtools: {
							color: "error",
							track: Cg,
							tooltipText: e.tag === 13 ? "Hydration failed" : "Error boundary caught an error",
							properties: o
						} }
					}, a ? a.run(performance.measure.bind(performance, "​" + i, e)) : performance.measure("​" + i, e);
				}
			}
		}
		function ir(e, t, n, r, i) {
			if (i !== null) {
				if (Sg) {
					var a = C(e);
					if (a !== null) {
						r = [];
						for (var o = 0; o < i.length; o++) {
							var s = i[o].value;
							r.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
						}
						e.key !== null && Zn("key", e.key, r, 0, ""), e.memoizedProps !== null && Xn(e.memoizedProps, r, 0, ""), t = {
							start: t,
							end: n,
							detail: { devtools: {
								color: "error",
								track: Cg,
								tooltipText: "A lifecycle or effect errored",
								properties: r
							} }
						}, (e = e._debugTask) ? e.run(performance.measure.bind(performance, "​" + a, t)) : performance.measure("​" + a, t);
					}
				}
			} else a = C(e), a !== null && Sg && (i = 1 > r ? "secondary-light" : 100 > r ? "secondary" : 500 > r ? "secondary-dark" : "error", (e = e._debugTask) ? e.run(console.timeStamp.bind(console, a, t, n, Cg, void 0, i)) : console.timeStamp(a, t, n, Cg, void 0, i));
		}
		function ar(e, t, n, r) {
			if (Sg && !(t <= e)) {
				var i = (n & 738197653) === n ? "tertiary-dark" : "primary-dark";
				n = (n & 536870912) === n ? "Prepared" : (n & 201326741) === n ? "Hydrated" : "Render", r ? r.run(console.timeStamp.bind(console, n, e, t, H, V, i)) : console.timeStamp(n, e, t, H, V, i);
			}
		}
		function or(e, t, n, r) {
			!Sg || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Prewarm", e, t, H, V, n)) : console.timeStamp("Prewarm", e, t, H, V, n));
		}
		function sr(e, t, n, r) {
			!Sg || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Suspended", e, t, H, V, n)) : console.timeStamp("Suspended", e, t, H, V, n));
		}
		function cr(e, t, n, r, i, a) {
			if (Sg && !(t <= e)) {
				n = [];
				for (var o = 0; o < r.length; o++) {
					var s = r[o].value;
					n.push(["Recoverable Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
				}
				e = {
					start: e,
					end: t,
					detail: { devtools: {
						color: "primary-dark",
						track: H,
						trackGroup: V,
						tooltipText: i ? "Hydration Failed" : "Recovered after Error",
						properties: n
					} }
				}, a ? a.run(performance.measure.bind(performance, "Recovered", e)) : performance.measure("Recovered", e);
			}
		}
		function lr(e, t, n, r) {
			!Sg || t <= e || (r ? r.run(console.timeStamp.bind(console, "Errored", e, t, H, V, "error")) : console.timeStamp("Errored", e, t, H, V, "error"));
		}
		function ur(e, t, n, r) {
			!Sg || t <= e || (r ? r.run(console.timeStamp.bind(console, n, e, t, H, V, "secondary-light")) : console.timeStamp(n, e, t, H, V, "secondary-light"));
		}
		function dr(e, t, n, r, i) {
			if (Sg && !(t <= e)) {
				for (var a = [], o = 0; o < n.length; o++) {
					var s = n[o].value;
					a.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
				}
				e = {
					start: e,
					end: t,
					detail: { devtools: {
						color: "error",
						track: H,
						trackGroup: V,
						tooltipText: r ? "Remaining Effects Errored" : "Commit Errored",
						properties: a
					} }
				}, i ? i.run(performance.measure.bind(performance, "Errored", e)) : performance.measure("Errored", e);
			}
		}
		function fr(e, t, n) {
			!Sg || t <= e || (n ? n.run(console.timeStamp.bind(console, "Animating", e, t, H, V, "secondary-dark")) : console.timeStamp("Animating", e, t, H, V, "secondary-dark"));
		}
		function pr() {
			for (var e = Ng, t = Pg = Ng = 0; t < e;) {
				var n = Mg[t];
				Mg[t++] = null;
				var r = Mg[t];
				Mg[t++] = null;
				var i = Mg[t];
				Mg[t++] = null;
				var a = Mg[t];
				if (Mg[t++] = null, r !== null && i !== null) {
					var o = r.pending;
					o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
				}
				a !== 0 && _r(n, i, a);
			}
		}
		function mr(e, t, n, r) {
			Mg[Ng++] = e, Mg[Ng++] = t, Mg[Ng++] = n, Mg[Ng++] = r, Pg |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
		}
		function hr(e, t, n, r) {
			return mr(e, t, n, r), vr(e);
		}
		function gr(e, t) {
			return mr(e, null, null, t), vr(e);
		}
		function _r(e, t, n) {
			e.lanes |= n;
			var r = e.alternate;
			r !== null && (r.lanes |= n);
			for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & Ag || (i = !0)), e = a, a = a.return;
			return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ip(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
		}
		function vr(e) {
			if (Kx > Gx) throw Zx = Kx = 0, Qx = qx = null, Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
			Zx > Xx && (Zx = 0, Qx = null, console.error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.")), e.alternate === null && e.flags & 4098 && Jl(e);
			for (var t = e, n = t.return; n !== null;) t.alternate === null && t.flags & 4098 && Jl(e), t = n, n = t.return;
			return t.tag === 3 ? t.stateNode : null;
		}
		function yr(e) {
			if (Ig === null) return e;
			var t = Ig(e);
			return t === void 0 ? e : t.current;
		}
		function br(e) {
			if (Ig === null) return e;
			var t = Ig(e);
			return t === void 0 ? e != null && typeof e.render == "function" && (t = yr(e.render), e.render !== t) ? (t = {
				$$typeof: zf,
				render: t
			}, e.displayName !== void 0 && (t.displayName = e.displayName), t) : e : t.current;
		}
		function xr(e, t) {
			if (Ig === null) return !1;
			var n = e.elementType;
			t = t.type;
			var r = !1, i = typeof t == "object" && t ? t.$$typeof : null;
			switch (e.tag) {
				case 1:
					typeof t == "function" && (r = !0);
					break;
				case 0:
					(typeof t == "function" || i === Uf) && (r = !0);
					break;
				case 11:
					(i === zf || i === Uf) && (r = !0);
					break;
				case 14:
				case 15:
					(i === Hf || i === Uf) && (r = !0);
					break;
				default: return !1;
			}
			return !!(r && (e = Ig(n), e !== void 0 && e === Ig(t)));
		}
		function Sr(e) {
			Ig !== null && typeof WeakSet == "function" && (Lg === null && (Lg = /* @__PURE__ */ new WeakSet()), Lg.add(e));
		}
		function Cr(e, t, n) {
			do {
				var r = e, i = r.alternate, a = r.child, o = r.sibling, s = r.tag;
				r = r.type;
				var c = null;
				switch (s) {
					case 0:
					case 15:
					case 1:
						c = r;
						break;
					case 11: c = r.render;
				}
				if (Ig === null) throw Error("Expected resolveFamily to be set during hot reload.");
				var l = !1;
				if (r = !1, c !== null && (c = Ig(c), c !== void 0 && (n.has(c) ? r = !0 : t.has(c) && (s === 1 ? r = !0 : l = !0))), Lg !== null && (Lg.has(e) || i !== null && Lg.has(i)) && (r = !0), r && (e._debugNeedsRemount = !0), (r || l) && (i = gr(e, 2), i !== null && ol(i, e, 2)), a === null || r || Cr(a, t, n), o === null) break;
				e = o;
			} while (1);
		}
		function wr(e, t, n, r) {
			this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, Hg || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
		}
		function Tr(e) {
			return e = e.prototype, !(!e || !e.isReactComponent);
		}
		function Er(e, t) {
			var n = e.alternate;
			switch (n === null ? (n = h(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugOwner = e._debugOwner, n._debugStack = e._debugStack, n._debugTask = e._debugTask, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null, n.actualDuration = -0, n.actualStartTime = -1.1), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugInfo = e._debugInfo, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
				case 0:
				case 15:
					n.type = yr(e.type);
					break;
				case 1:
					n.type = yr(e.type);
					break;
				case 11: n.type = br(e.type);
			}
			return n;
		}
		function Dr(e, t) {
			e.flags &= 65011714;
			var n = e.alternate;
			return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration), e;
		}
		function Or(e, t, n, r, i, a) {
			var o = 0, s = e;
			if (typeof e == "function") Tr(e) && (o = 1), s = yr(s);
			else if (typeof e == "string") o = T(), o = Gd(e, n, o) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
			else a: switch (e) {
				case Wf: return t = h(31, n, t, i), t.elementType = Wf, t.lanes = a, t;
				case Pf: return Ar(n.children, i, a, t);
				case Ff:
					o = 8, i |= zg, i |= Bg;
					break;
				case If: return e = n, r = i, typeof e.id != "string" && console.error("Profiler must specify an \"id\" of type `string` as a prop. Received the type `%s` instead.", typeof e.id), t = h(12, e, t, r | W), t.elementType = If, t.lanes = a, t.stateNode = {
					effectDuration: 0,
					passiveEffectDuration: 0
				}, t;
				case Bf: return t = h(13, n, t, i), t.elementType = Bf, t.lanes = a, t;
				case Vf: return t = h(19, n, t, i), t.elementType = Vf, t.lanes = a, t;
				default:
					if (typeof e == "object" && e) switch (e.$$typeof) {
						case Rf:
							o = 10;
							break a;
						case Lf:
							o = 9;
							break a;
						case zf:
							o = 11, s = br(s);
							break a;
						case Hf:
							o = 14;
							break a;
						case Uf:
							o = 16, s = null;
							break a;
					}
					s = "", (e === void 0 || typeof e == "object" && e && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? n = "null" : Jf(e) ? n = "array" : e !== void 0 && e.$$typeof === Mf ? (n = "<" + (ae(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : n = typeof e, (o = r ? oe(r) : null) && (s += "\n\nCheck the render method of `" + o + "`."), o = 29, n = Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (n + "." + s)), s = null;
			}
			return t = h(o, n, t, i), t.elementType = e, t.type = s, t.lanes = a, t._debugOwner = r, t;
		}
		function kr(e, t, n) {
			return t = Or(e.type, e.key, e.props, e._owner, t, n), t._debugOwner = e._owner, t._debugStack = e._debugStack, t._debugTask = e._debugTask, t;
		}
		function Ar(e, t, n, r) {
			return e = h(7, e, r, t), e.lanes = n, e;
		}
		function jr(e, t, n) {
			return e = h(6, e, null, t), e.lanes = n, e;
		}
		function Mr(e) {
			var t = h(18, null, null, U);
			return t.stateNode = e, t;
		}
		function Nr(e, t, n) {
			return t = h(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
				containerInfo: e.containerInfo,
				pendingChildren: null,
				implementation: e.implementation
			}, t;
		}
		function Pr(e, t) {
			if (typeof e == "object" && e) {
				var n = Ug.get(e);
				return n === void 0 ? (t = {
					value: e,
					source: t,
					stack: xe(t)
				}, Ug.set(e, t), t) : n;
			}
			return {
				value: e,
				source: t,
				stack: xe(t)
			};
		}
		function Fr(e, t) {
			Vr(), Wg[Gg++] = qg, Wg[Gg++] = Kg, Kg = e, qg = t;
		}
		function Ir(e, t, n) {
			Vr(), Jg[Yg++] = Zg, Jg[Yg++] = Qg, Jg[Yg++] = Xg, Xg = e;
			var r = Zg;
			e = Qg;
			var i = 32 - Ip(r) - 1;
			r &= ~(1 << i), n += 1;
			var a = 32 - Ip(t) + i;
			if (30 < a) {
				var o = i - i % 5;
				a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Zg = 1 << 32 - Ip(t) + i | n << i | r, Qg = a + e;
			} else Zg = 1 << a | n << i | r, Qg = e;
		}
		function Lr(e) {
			Vr(), e.return !== null && (Fr(e, 1), Ir(e, 1, 0));
		}
		function Rr(e) {
			for (; e === Kg;) Kg = Wg[--Gg], Wg[Gg] = null, qg = Wg[--Gg], Wg[Gg] = null;
			for (; e === Xg;) Xg = Jg[--Yg], Jg[Yg] = null, Qg = Jg[--Yg], Jg[Yg] = null, Zg = Jg[--Yg], Jg[Yg] = null;
		}
		function zr() {
			return Vr(), Xg === null ? null : {
				id: Zg,
				overflow: Qg
			};
		}
		function Br(e, t) {
			Vr(), Jg[Yg++] = Zg, Jg[Yg++] = Qg, Jg[Yg++] = Xg, Zg = t.id, Qg = t.overflow, Xg = e;
		}
		function Vr() {
			G || console.error("Expected to be hydrating. This is a bug in React. Please file an issue.");
		}
		function Hr(e, t) {
			if (e.return === null) {
				if (n_ === null) n_ = {
					fiber: e,
					children: [],
					serverProps: void 0,
					serverTail: [],
					distanceFromLeaf: t
				};
				else {
					if (n_.fiber !== e) throw Error("Saw multiple hydration diff roots in a pass. This is a bug in React.");
					n_.distanceFromLeaf > t && (n_.distanceFromLeaf = t);
				}
				return n_;
			}
			var n = Hr(e.return, t + 1).children;
			return 0 < n.length && n[n.length - 1].fiber === e ? (n = n[n.length - 1], n.distanceFromLeaf > t && (n.distanceFromLeaf = t), n) : (t = {
				fiber: e,
				children: [],
				serverProps: void 0,
				serverTail: [],
				distanceFromLeaf: t
			}, n.push(t), t);
		}
		function Ur() {
			G && console.error("We should not be hydrating here. This is a bug in React. Please file a bug.");
		}
		function Wr(e, t) {
			t_ || (e = Hr(e, 0), e.serverProps = null, t !== null && (t = bd(t), e.serverTail.push(t)));
		}
		function Gr(e) {
			var t = 1 < arguments.length && arguments[1] !== void 0 && arguments[1], n = "", r = n_;
			throw r !== null && (n_ = null, n = Wt(r)), Zr(Pr(Error("Hydration failed because the server rendered " + (t ? "text" : "HTML") + " didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\nhttps://react.dev/link/hydration-mismatch" + n), e)), a_;
		}
		function Kr(e) {
			var t = e.stateNode, n = e.type, r = e.memoizedProps;
			switch (t[qp] = e, t[Jp] = r, vu(n, r), n) {
				case "dialog":
					L("cancel", t), L("close", t);
					break;
				case "iframe":
				case "object":
				case "embed":
					L("load", t);
					break;
				case "video":
				case "audio":
					for (n = 0; n < fS.length; n++) L(fS[n], t);
					break;
				case "source":
					L("error", t);
					break;
				case "img":
				case "image":
				case "link":
					L("error", t), L("load", t);
					break;
				case "details":
					L("toggle", t);
					break;
				case "input":
					D("input", r), L("invalid", t), vt(t, r), bt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
					break;
				case "option":
					St(t, r);
					break;
				case "select":
					D("select", r), L("invalid", t), Tt(t, r);
					break;
				case "textarea": D("textarea", r), L("invalid", t), Et(t, r), Ot(t, r.value, r.defaultValue, r.children);
			}
			n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || wu(t.textContent, n) ? (r.popover != null && (L("beforetoggle", t), L("toggle", t)), r.onScroll != null && L("scroll", t), r.onScrollEnd != null && L("scrollend", t), r.onClick != null && (t.onclick = un), t = !0) : t = !1, t || Gr(e, !0);
		}
		function qr(e) {
			for ($g = e.return; $g;) switch ($g.tag) {
				case 5:
				case 31:
				case 13:
					i_ = !1;
					return;
				case 27:
				case 3:
					i_ = !0;
					return;
				default: $g = $g.return;
			}
		}
		function Jr(e) {
			if (e !== $g) return !1;
			if (!G) return qr(e), G = !0, !1;
			var t = e.tag, n;
			if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Wu(e.type, e.memoizedProps)), n = !n), n && e_) {
				for (n = e_; n;) {
					var r = Hr(e, 0), i = bd(n);
					r.serverTail.push(i), n = i.type === "Suspense" ? Sd(n) : yd(n.nextSibling);
				}
				Gr(e);
			}
			if (qr(e), t === 13) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				e_ = Sd(e);
			} else if (t === 31) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				e_ = Sd(e);
			} else t === 27 ? (t = e_, td(e.type) ? (e = nC, nC = null, e_ = e) : e_ = t) : e_ = $g ? yd(e.stateNode.nextSibling) : null;
			return !0;
		}
		function Yr() {
			e_ = $g = null, t_ = G = !1;
		}
		function Xr() {
			var e = r_;
			return e !== null && (mx === null ? mx = e : mx.push.apply(mx, e), r_ = null), e;
		}
		function Zr(e) {
			r_ === null ? r_ = [e] : r_.push(e);
		}
		function Qr() {
			var e = n_;
			if (e !== null) {
				n_ = null;
				for (var t = Wt(e); 0 < e.children.length;) e = e.children[0];
				E(e.fiber, function() {
					console.error("A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\n%s%s", "https://react.dev/link/hydration-mismatch", t);
				});
			}
		}
		function $r() {
			u_ = l_ = null, d_ = !1;
		}
		function ei(e, t, n) {
			le(o_, t._currentValue, e), t._currentValue = n, le(s_, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== c_ && console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = c_;
		}
		function ti(e, t) {
			e._currentValue = o_.current;
			var n = s_.current;
			ce(s_, t), e._currentRenderer = n, ce(o_, t);
		}
		function ni(e, t, n) {
			for (; e !== null;) {
				var r = e.alternate;
				if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
				e = e.return;
			}
			e !== n && console.error("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
		}
		function ri(e, t, n, r) {
			var i = e.child;
			for (i !== null && (i.return = e); i !== null;) {
				var a = i.dependencies;
				if (a !== null) {
					var o = i.child;
					a = a.firstContext;
					a: for (; a !== null;) {
						var s = a;
						a = i;
						for (var c = 0; c < t.length; c++) if (s.context === t[c]) {
							a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), ni(a.return, n, e), r || (o = null);
							break a;
						}
						a = s.next;
					}
				} else if (i.tag === 18) {
					if (o = i.return, o === null) throw Error("We just came from a parent so we must have had a parent. This is a bug in React.");
					o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), ni(o, n, e), o = null;
				} else o = i.child;
				if (o !== null) o.return = i;
				else for (o = i; o !== null;) {
					if (o === e) {
						o = null;
						break;
					}
					if (i = o.sibling, i !== null) {
						i.return = o.return, o = i;
						break;
					}
					o = o.return;
				}
				i = o;
			}
		}
		function ii(e, t, n, r) {
			e = null;
			for (var i = t, a = !1; i !== null;) {
				if (!a) {
					if (i.flags & 524288) a = !0;
					else if (i.flags & 262144) break;
				}
				if (i.tag === 10) {
					var o = i.alternate;
					if (o === null) throw Error("Should have a current fiber. This is a bug in React.");
					if (o = o.memoizedProps, o !== null) {
						var s = i.type;
						Gh(i.pendingProps.value, o.value) || (e === null ? e = [s] : e.push(s));
					}
				} else if (i === rp.current) {
					if (o = i.alternate, o === null) throw Error("Should have a current fiber. This is a bug in React.");
					o.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [bC] : e.push(bC));
				}
				i = i.return;
			}
			e !== null && ri(t, e, n, r), t.flags |= 262144;
		}
		function ai(e) {
			for (e = e.firstContext; e !== null;) {
				if (!Gh(e.context._currentValue, e.memoizedValue)) return !0;
				e = e.next;
			}
			return !1;
		}
		function oi(e) {
			l_ = e, u_ = null, e = e.dependencies, e !== null && (e.firstContext = null);
		}
		function si(e) {
			return d_ && console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), li(l_, e);
		}
		function ci(e, t) {
			return l_ === null && oi(e), li(e, t);
		}
		function li(e, t) {
			var n = t._currentValue;
			if (t = {
				context: t,
				memoizedValue: n,
				next: null
			}, u_ === null) {
				if (e === null) throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
				u_ = t, e.dependencies = {
					lanes: 0,
					firstContext: t,
					_debugThenableState: null
				}, e.flags |= 524288;
			} else u_ = u_.next = t;
			return n;
		}
		function ui() {
			return {
				controller: new f_(),
				data: /* @__PURE__ */ new Map(),
				refCount: 0
			};
		}
		function di(e) {
			e.controller.signal.aborted && console.warn("A cache instance was retained after it was already freed. This likely indicates a bug in React."), e.refCount++;
		}
		function fi(e) {
			e.refCount--, 0 > e.refCount && console.warn("A cache instance was released after it was already freed. This likely indicates a bug in React."), e.refCount === 0 && p_(m_, function() {
				e.controller.abort();
			});
		}
		function pi(e, t, n) {
			e & 127 ? 0 > A_ && (A_ = g_(), j_ = __(t), N_ = t, n != null && (P_ = C(n)), (Z & (Fb | Ib)) !== Pb && (O_ = !0, M_ = v_), e = qu(), t = Ku(), e !== L_ || t !== I_ ? L_ = -1.1 : t !== null && (M_ = v_), F_ = e, I_ = t) : e & 4194048 && 0 > V_ && (V_ = g_(), U_ = __(t), W_ = t, n != null && (G_ = C(n)), 0 > B_) && (e = qu(), t = Ku(), (e !== J_ || t !== q_) && (J_ = -1.1), K_ = e, q_ = t);
		}
		function mi(e) {
			if (0 > A_) {
				A_ = g_(), j_ = e._debugTask == null ? null : e._debugTask, (Z & (Fb | Ib)) !== Pb && (M_ = v_);
				var t = qu(), n = Ku();
				t !== L_ || n !== I_ ? L_ = -1.1 : n !== null && (M_ = v_), F_ = t, I_ = n;
			}
			0 > V_ && (V_ = g_(), U_ = e._debugTask == null ? null : e._debugTask, 0 > B_) && (e = qu(), t = Ku(), (e !== J_ || t !== q_) && (J_ = -1.1), K_ = e, q_ = t);
		}
		function hi() {
			var e = T_;
			return T_ = 0, e;
		}
		function gi(e) {
			var t = T_;
			return T_ = e, t;
		}
		function _i(e) {
			var t = T_;
			return T_ += e, t;
		}
		function vi() {
			q = K = -1.1;
		}
		function yi() {
			var e = K;
			return K = -1.1, e;
		}
		function bi(e) {
			0 <= e && (K = e);
		}
		function xi() {
			var e = E_;
			return E_ = -0, e;
		}
		function Si(e) {
			0 <= e && (E_ = e);
		}
		function Ci() {
			var e = D_;
			return D_ = null, e;
		}
		function wi() {
			var e = O_;
			return O_ = !1, e;
		}
		function Ti(e) {
			w_ = g_(), 0 > e.actualStartTime && (e.actualStartTime = w_);
		}
		function Ei(e) {
			if (0 <= w_) {
				var t = g_() - w_;
				e.actualDuration += t, e.selfBaseDuration = t, w_ = -1;
			}
		}
		function Di(e) {
			if (0 <= w_) {
				var t = g_() - w_;
				e.actualDuration += t, w_ = -1;
			}
		}
		function Oi() {
			if (0 <= w_) {
				var e = g_(), t = e - w_;
				w_ = -1, T_ += t, E_ += t, q = e;
			}
		}
		function ki(e) {
			D_ === null && (D_ = []), D_.push(e), C_ === null && (C_ = []), C_.push(e);
		}
		function Ai() {
			w_ = g_(), 0 > K && (K = w_);
		}
		function ji(e) {
			for (var t = e.child; t;) e.actualDuration += t.actualDuration, t = t.sibling;
		}
		function Mi(e, t) {
			if (iv === null) {
				var n = iv = [];
				av = 0, ov = iu(), sv = {
					status: "pending",
					value: void 0,
					then: function(e) {
						n.push(e);
					}
				};
			}
			return av++, t.then(Ni, Ni), t;
		}
		function Ni() {
			if (--av === 0 && (-1 < V_ || (B_ = -1.1), iv !== null)) {
				sv !== null && (sv.status = "fulfilled");
				var e = iv;
				iv = null, ov = 0, sv = null;
				for (var t = 0; t < e.length; t++) (0, e[t])();
			}
		}
		function Pi(e, t) {
			var n = [], r = {
				status: "pending",
				value: null,
				reason: null,
				then: function(e) {
					n.push(e);
				}
			};
			return e.then(function() {
				r.status = "fulfilled", r.value = t;
				for (var e = 0; e < n.length; e++) (0, n[e])(t);
			}, function(e) {
				for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
			}), r;
		}
		function Fi() {
			var e = lv.current;
			return e === null ? Wb.pooledCache : e;
		}
		function Ii(e, t) {
			t === null ? le(lv, lv.current, e) : le(lv, t.pool, e);
		}
		function Li() {
			var e = Fi();
			return e === null ? null : {
				parent: h_._currentValue,
				pool: e
			};
		}
		function Ri() {
			return {
				didWarnAboutUncachedPromise: !1,
				thenables: []
			};
		}
		function zi(e) {
			return e = e.status, e === "fulfilled" || e === "rejected";
		}
		function Bi(e, t, n) {
			B.actQueue !== null && (B.didUsePromise = !0);
			var r = e.thenables;
			if (n = r[n], n === void 0 ? r.push(t) : n !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error("A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.")), t.then(un, un), t = n), t._debugInfo === void 0) {
				e = performance.now(), r = t.displayName;
				var i = {
					name: typeof r == "string" ? r : "Promise",
					start: e,
					end: e,
					value: t
				};
				t._debugInfo = [{ awaited: i }], t.status !== "fulfilled" && t.status !== "rejected" && (e = function() {
					i.end = performance.now();
				}, t.then(e, e));
			}
			switch (t.status) {
				case "fulfilled": return t.value;
				case "rejected": throw e = t.reason, Ui(e), e;
				default:
					if (typeof t.status == "string") t.then(un, un);
					else {
						if (e = Wb, e !== null && 100 < e.shellSuspendCounter) throw Error("An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
						e = t, e.status = "pending", e.then(function(e) {
							if (t.status === "pending") {
								var n = t;
								n.status = "fulfilled", n.value = e;
							}
						}, function(e) {
							if (t.status === "pending") {
								var n = t;
								n.status = "rejected", n.reason = e;
							}
						});
					}
					switch (t.status) {
						case "fulfilled": return t.value;
						case "rejected": throw e = t.reason, Ui(e), e;
					}
					throw Hv = t, Uv = !0, Rv;
			}
		}
		function Vi(e) {
			try {
				return Lv(e);
			} catch (e) {
				throw typeof e == "object" && e && typeof e.then == "function" ? (Hv = e, Uv = !0, Rv) : e;
			}
		}
		function Hi() {
			if (Hv === null) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
			var e = Hv;
			return Hv = null, Uv = !1, e;
		}
		function Ui(e) {
			if (e === Rv || e === Bv) throw Error("Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
		}
		function O(e) {
			var t = J;
			return e != null && (J = t === null ? e : t.concat(e)), t;
		}
		function Wi() {
			var e = J;
			if (e != null) {
				for (var t = e.length - 1; 0 <= t; t--) if (e[t].name != null) {
					var n = e[t].debugTask;
					if (n != null) return n;
				}
			}
			return null;
		}
		function k(e, t, n) {
			for (var r = Object.keys(e.props), i = 0; i < r.length; i++) {
				var a = r[i];
				if (a !== "children" && a !== "key") {
					t === null && (t = kr(e, n.mode, 0), t._debugInfo = J, t.return = n), E(t, function(e) {
						console.error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", e);
					}, a);
					break;
				}
			}
		}
		function Gi(e) {
			var t = Gv;
			return Gv += 1, Wv === null && (Wv = Ri()), Bi(Wv, e, t);
		}
		function Ki(e, t) {
			t = t.props.ref, e.ref = t === void 0 ? null : t;
		}
		function qi(e, t) {
			throw t.$$typeof === jf ? Error("A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the \"react\" package is used.\n- A library pre-bundled an old copy of \"react\" or \"react/jsx-runtime\".\n- A compiler tries to \"inline\" JSX instead of using the runtime.") : (e = Object.prototype.toString.call(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."));
		}
		function Ji(e, t) {
			var n = Wi();
			n === null ? qi(e, t) : n.run(qi.bind(null, e, t));
		}
		function Yi(e, t) {
			var n = C(e) || "Component";
			Yv[n] || (Yv[n] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  root.render(%s)", t, t, t) : console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  <%s>{%s}</%s>", t, t, n, t, n));
		}
		function Xi(e, t) {
			var n = Wi();
			n === null ? Yi(e, t) : n.run(Yi.bind(null, e, t));
		}
		function Zi(e, t) {
			var n = C(e) || "Component";
			Xv[n] || (Xv[n] = !0, t = String(t), e.tag === 3 ? console.error("Symbols are not valid as a React child.\n  root.render(%s)", t) : console.error("Symbols are not valid as a React child.\n  <%s>%s</%s>", n, t, n));
		}
		function Qi(e, t) {
			var n = Wi();
			n === null ? Zi(e, t) : n.run(Zi.bind(null, e, t));
		}
		function $i(e) {
			function t(t, n) {
				if (e) {
					var r = t.deletions;
					r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
				}
			}
			function n(n, r) {
				if (!e) return null;
				for (; r !== null;) t(n, r), r = r.sibling;
				return null;
			}
			function r(e) {
				for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
				return t;
			}
			function i(e, t) {
				return e = Er(e, t), e.index = 0, e.sibling = null, e;
			}
			function a(t, n, r) {
				return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
			}
			function o(t) {
				return e && t.alternate === null && (t.flags |= 67108866), t;
			}
			function s(e, t, n, r) {
				return t === null || t.tag !== 6 ? (t = jr(n, e.mode, r), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = J, t) : (t = i(t, n), t.return = e, t._debugInfo = J, t);
			}
			function c(e, t, n, r) {
				var a = n.type;
				return a === Pf ? (t = u(e, t, n.props.children, r, n.key), k(n, t, e), t) : t !== null && (t.elementType === a || xr(t, n) || typeof a == "object" && a && a.$$typeof === Uf && Vi(a) === t.type) ? (t = i(t, n.props), Ki(t, n), t.return = e, t._debugOwner = n._owner, t._debugInfo = J, t) : (t = kr(n, e.mode, r), Ki(t, n), t.return = e, t._debugInfo = J, t);
			}
			function l(e, t, n, r) {
				return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Nr(n, e.mode, r), t.return = e, t._debugInfo = J, t) : (t = i(t, n.children || []), t.return = e, t._debugInfo = J, t);
			}
			function u(e, t, n, r, a) {
				return t === null || t.tag !== 7 ? (t = Ar(n, e.mode, r, a), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = J, t) : (t = i(t, n), t.return = e, t._debugInfo = J, t);
			}
			function d(e, t, n) {
				if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = jr("" + t, e.mode, n), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = J, t;
				if (typeof t == "object" && t) {
					switch (t.$$typeof) {
						case Mf: return n = kr(t, e.mode, n), Ki(n, t), n.return = e, e = O(t._debugInfo), n._debugInfo = J, J = e, n;
						case Nf: return t = Nr(t, e.mode, n), t.return = e, t._debugInfo = J, t;
						case Uf:
							var r = O(t._debugInfo);
							return t = Vi(t), e = d(e, t, n), J = r, e;
					}
					if (Jf(t) || ie(t)) return n = Ar(t, e.mode, n, null), n.return = e, n._debugOwner = e, n._debugTask = e._debugTask, e = O(t._debugInfo), n._debugInfo = J, J = e, n;
					if (typeof t.then == "function") return r = O(t._debugInfo), e = d(e, Gi(t), n), J = r, e;
					if (t.$$typeof === Rf) return d(e, ci(e, t), n);
					Ji(e, t);
				}
				return typeof t == "function" && Xi(e, t), typeof t == "symbol" && Qi(e, t), null;
			}
			function f(e, t, n, r) {
				var i = t === null ? null : t.key;
				if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? s(e, t, "" + n, r) : null;
				if (typeof n == "object" && n) {
					switch (n.$$typeof) {
						case Mf: return n.key === i ? (i = O(n._debugInfo), e = c(e, t, n, r), J = i, e) : null;
						case Nf: return n.key === i ? l(e, t, n, r) : null;
						case Uf: return i = O(n._debugInfo), n = Vi(n), e = f(e, t, n, r), J = i, e;
					}
					if (Jf(n) || ie(n)) return i === null ? (i = O(n._debugInfo), e = u(e, t, n, r, null), J = i, e) : null;
					if (typeof n.then == "function") return i = O(n._debugInfo), e = f(e, t, Gi(n), r), J = i, e;
					if (n.$$typeof === Rf) return f(e, t, ci(e, n), r);
					Ji(e, n);
				}
				return typeof n == "function" && Xi(e, n), typeof n == "symbol" && Qi(e, n), null;
			}
			function m(e, t, n, r, i) {
				if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, s(t, e, "" + r, i);
				if (typeof r == "object" && r) {
					switch (r.$$typeof) {
						case Mf: return n = e.get(r.key === null ? n : r.key) || null, e = O(r._debugInfo), t = c(t, n, r, i), J = e, t;
						case Nf: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
						case Uf:
							var a = O(r._debugInfo);
							return r = Vi(r), t = m(e, t, n, r, i), J = a, t;
					}
					if (Jf(r) || ie(r)) return n = e.get(n) || null, e = O(r._debugInfo), t = u(t, n, r, i, null), J = e, t;
					if (typeof r.then == "function") return a = O(r._debugInfo), t = m(e, t, n, Gi(r), i), J = a, t;
					if (r.$$typeof === Rf) return m(e, t, n, ci(t, r), i);
					Ji(t, r);
				}
				return typeof r == "function" && Xi(t, r), typeof r == "symbol" && Qi(t, r), null;
			}
			function g(e, t, n, r) {
				if (typeof n != "object" || !n) return r;
				switch (n.$$typeof) {
					case Mf:
					case Nf:
						p(e, t, n);
						var i = n.key;
						if (typeof i != "string") break;
						if (r === null) {
							r = /* @__PURE__ */ new Set(), r.add(i);
							break;
						}
						if (!r.has(i)) {
							r.add(i);
							break;
						}
						E(t, function() {
							console.error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", i);
						});
						break;
					case Uf: n = Vi(n), g(e, t, n, r);
				}
				return r;
			}
			function _(i, o, s, c) {
				for (var l = null, u = null, p = null, h = o, _ = o = 0, v = null; h !== null && _ < s.length; _++) {
					h.index > _ ? (v = h, h = null) : v = h.sibling;
					var y = f(i, h, s[_], c);
					if (y === null) {
						h === null && (h = v);
						break;
					}
					l = g(i, y, s[_], l), e && h && y.alternate === null && t(i, h), o = a(y, o, _), p === null ? u = y : p.sibling = y, p = y, h = v;
				}
				if (_ === s.length) return n(i, h), G && Fr(i, _), u;
				if (h === null) {
					for (; _ < s.length; _++) h = d(i, s[_], c), h !== null && (l = g(i, h, s[_], l), o = a(h, o, _), p === null ? u = h : p.sibling = h, p = h);
					return G && Fr(i, _), u;
				}
				for (h = r(h); _ < s.length; _++) v = m(h, i, _, s[_], c), v !== null && (l = g(i, v, s[_], l), e && v.alternate !== null && h.delete(v.key === null ? _ : v.key), o = a(v, o, _), p === null ? u = v : p.sibling = v, p = v);
				return e && h.forEach(function(e) {
					return t(i, e);
				}), G && Fr(i, _), u;
			}
			function v(i, o, s, c) {
				if (s == null) throw Error("An iterable object provided no iterator.");
				for (var l = null, u = null, p = o, h = o = 0, _ = null, v = null, y = s.next(); p !== null && !y.done; h++, y = s.next()) {
					p.index > h ? (_ = p, p = null) : _ = p.sibling;
					var b = f(i, p, y.value, c);
					if (b === null) {
						p === null && (p = _);
						break;
					}
					v = g(i, b, y.value, v), e && p && b.alternate === null && t(i, p), o = a(b, o, h), u === null ? l = b : u.sibling = b, u = b, p = _;
				}
				if (y.done) return n(i, p), G && Fr(i, h), l;
				if (p === null) {
					for (; !y.done; h++, y = s.next()) p = d(i, y.value, c), p !== null && (v = g(i, p, y.value, v), o = a(p, o, h), u === null ? l = p : u.sibling = p, u = p);
					return G && Fr(i, h), l;
				}
				for (p = r(p); !y.done; h++, y = s.next()) _ = m(p, i, h, y.value, c), _ !== null && (v = g(i, _, y.value, v), e && _.alternate !== null && p.delete(_.key === null ? h : _.key), o = a(_, o, h), u === null ? l = _ : u.sibling = _, u = _);
				return e && p.forEach(function(e) {
					return t(i, e);
				}), G && Fr(i, h), l;
			}
			function y(e, r, a, s) {
				if (typeof a == "object" && a && a.type === Pf && a.key === null && (k(a, null, e), a = a.props.children), typeof a == "object" && a) {
					switch (a.$$typeof) {
						case Mf:
							var c = O(a._debugInfo);
							a: {
								for (var l = a.key; r !== null;) {
									if (r.key === l) {
										if (l = a.type, l === Pf) {
											if (r.tag === 7) {
												n(e, r.sibling), s = i(r, a.props.children), s.return = e, s._debugOwner = a._owner, s._debugInfo = J, k(a, s, e), e = s;
												break a;
											}
										} else if (r.elementType === l || xr(r, a) || typeof l == "object" && l && l.$$typeof === Uf && Vi(l) === r.type) {
											n(e, r.sibling), s = i(r, a.props), Ki(s, a), s.return = e, s._debugOwner = a._owner, s._debugInfo = J, e = s;
											break a;
										}
										n(e, r);
										break;
									} else t(e, r);
									r = r.sibling;
								}
								a.type === Pf ? (s = Ar(a.props.children, e.mode, s, a.key), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = J, k(a, s, e), e = s) : (s = kr(a, e.mode, s), Ki(s, a), s.return = e, s._debugInfo = J, e = s);
							}
							return e = o(e), J = c, e;
						case Nf:
							a: {
								for (c = a, a = c.key; r !== null;) {
									if (r.key === a) if (r.tag === 4 && r.stateNode.containerInfo === c.containerInfo && r.stateNode.implementation === c.implementation) {
										n(e, r.sibling), s = i(r, c.children || []), s.return = e, e = s;
										break a;
									} else {
										n(e, r);
										break;
									}
									else t(e, r);
									r = r.sibling;
								}
								s = Nr(c, e.mode, s), s.return = e, e = s;
							}
							return o(e);
						case Uf: return c = O(a._debugInfo), a = Vi(a), e = y(e, r, a, s), J = c, e;
					}
					if (Jf(a)) return c = O(a._debugInfo), e = _(e, r, a, s), J = c, e;
					if (ie(a)) {
						if (c = O(a._debugInfo), l = ie(a), typeof l != "function") throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
						var u = l.call(a);
						return u === a ? (e.tag !== 0 || Object.prototype.toString.call(e.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(u) !== "[object Generator]") && (qv || console.error("Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."), qv = !0) : a.entries !== l || Kv || (console.error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Kv = !0), e = v(e, r, u, s), J = c, e;
					}
					if (typeof a.then == "function") return c = O(a._debugInfo), e = y(e, r, Gi(a), s), J = c, e;
					if (a.$$typeof === Rf) return y(e, r, ci(e, a), s);
					Ji(e, a);
				}
				return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (c = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), s = i(r, c), s.return = e, e = s) : (n(e, r), s = jr(c, e.mode, s), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = J, e = s), o(e)) : (typeof a == "function" && Xi(e, a), typeof a == "symbol" && Qi(e, a), n(e, r));
			}
			return function(e, t, n, r) {
				var i = J;
				J = null;
				try {
					Gv = 0;
					var a = y(e, t, n, r);
					return Wv = null, a;
				} catch (t) {
					if (t === Rv || t === Bv) throw t;
					var o = h(29, t, null, e.mode);
					o.lanes = r, o.return = e;
					var s = o._debugInfo = J;
					if (o._debugOwner = e._debugOwner, o._debugTask = e._debugTask, s != null) {
						for (var c = s.length - 1; 0 <= c; c--) if (typeof s[c].stack == "string") {
							o._debugOwner = s[c], o._debugTask = s[c].debugTask;
							break;
						}
					}
					return o;
				} finally {
					J = i;
				}
			};
		}
		function ea(e, t) {
			var n = Jf(e);
			return e = !n && typeof ie(e) == "function", n || e ? (n = n ? "array" : "iterable", console.error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", n, t, n), !1) : !0;
		}
		function ta(e) {
			e.updateQueue = {
				baseState: e.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: {
					pending: null,
					lanes: 0,
					hiddenCallbacks: null
				},
				callbacks: null
			};
		}
		function na(e, t) {
			e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
				baseState: e.baseState,
				firstBaseUpdate: e.firstBaseUpdate,
				lastBaseUpdate: e.lastBaseUpdate,
				shared: e.shared,
				callbacks: null
			});
		}
		function ra(e) {
			return {
				lane: e,
				tag: $v,
				payload: null,
				callback: null,
				next: null
			};
		}
		function ia(e, t, n) {
			var r = e.updateQueue;
			if (r === null) return null;
			if (r = r.shared, ay === r && !iy) {
				var i = C(e);
				console.error("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.\n\nPlease update the following component: %s", i), iy = !0;
			}
			return (Z & Fb) === Pb ? (mr(e, r, t, n), vr(e)) : (i = r.pending, i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = vr(e), _r(e, null, n), t);
		}
		function aa(e, t, n) {
			if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, We(e, n);
			}
		}
		function oa(e, t) {
			var n = e.updateQueue, r = e.alternate;
			if (r !== null && (r = r.updateQueue, n === r)) {
				var i = null, a = null;
				if (n = n.firstBaseUpdate, n !== null) {
					do {
						var o = {
							lane: n.lane,
							tag: n.tag,
							payload: n.payload,
							callback: null,
							next: null
						};
						a === null ? i = a = o : a = a.next = o, n = n.next;
					} while (n !== null);
					a === null ? i = a = t : a = a.next = t;
				} else i = a = t;
				n = {
					baseState: r.baseState,
					firstBaseUpdate: i,
					lastBaseUpdate: a,
					shared: r.shared,
					callbacks: r.callbacks
				}, e.updateQueue = n;
				return;
			}
			e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
		}
		function sa() {
			if (oy) {
				var e = sv;
				if (e !== null) throw e;
			}
		}
		function ca(e, t, n, r) {
			oy = !1;
			var i = e.updateQueue;
			ry = !1, ay = i.shared;
			var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
			if (s !== null) {
				i.shared.pending = null;
				var c = s, l = c.next;
				c.next = null, o === null ? a = l : o.next = l, o = c;
				var u = e.alternate;
				u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
			}
			if (a !== null) {
				var d = i.baseState;
				o = 0, u = l = c = null, s = a;
				do {
					var f = s.lane & -536870913, p = f !== s.lane;
					if (p ? ($ & f) === f : (r & f) === f) {
						f !== 0 && f === ov && (oy = !0), u !== null && (u = u.next = {
							lane: 0,
							tag: s.tag,
							payload: s.payload,
							callback: null,
							next: null
						});
						a: {
							f = e;
							var m = s, h = t, g = n;
							switch (m.tag) {
								case ey:
									if (m = m.payload, typeof m == "function") {
										d_ = !0;
										var _ = m.call(g, d, h);
										if (f.mode & zg) {
											Ne(!0);
											try {
												m.call(g, d, h);
											} finally {
												Ne(!1);
											}
										}
										d_ = !1, d = _;
										break a;
									}
									d = m;
									break a;
								case ny: f.flags = f.flags & -65537 | 128;
								case $v:
									if (_ = m.payload, typeof _ == "function") {
										if (d_ = !0, m = _.call(g, d, h), f.mode & zg) {
											Ne(!0);
											try {
												_.call(g, d, h);
											} finally {
												Ne(!1);
											}
										}
										d_ = !1;
									} else m = _;
									if (m == null) break a;
									d = z({}, d, m);
									break a;
								case ty: ry = !0;
							}
						}
						f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
					} else p = {
						lane: f,
						tag: s.tag,
						payload: s.payload,
						callback: s.callback,
						next: null
					}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
					if (s = s.next, s === null) {
						if (s = i.shared.pending, s === null) break;
						p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
					}
				} while (1);
				u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), cx |= o, e.lanes = o, e.memoizedState = d;
			}
			ay = null;
		}
		function la(e, t) {
			if (typeof e != "function") throw Error("Invalid argument passed as callback. Expected a function. Instead received: " + e);
			e.call(t);
		}
		function ua(e, t) {
			var n = e.shared.hiddenCallbacks;
			if (n !== null) for (e.shared.hiddenCallbacks = null, e = 0; e < n.length; e++) la(n[e], t);
		}
		function da(e, t) {
			var n = e.callbacks;
			if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) la(n[e], t);
		}
		function fa(e, t) {
			var n = ox;
			le(cy, n, e), le(sy, t, e), ox = n | t.baseLanes;
		}
		function pa(e) {
			le(cy, ox, e), le(sy, sy.current, e);
		}
		function ma(e) {
			ox = cy.current, ce(sy, e), ce(cy, e);
		}
		function ha(e) {
			var t = e.alternate;
			le(py, py.current & dy, e), le(ly, e, e), uy === null && (t === null || sy.current !== null || t.memoizedState !== null) && (uy = e);
		}
		function ga(e) {
			le(py, py.current, e), le(ly, e, e), uy === null && (uy = e);
		}
		function _a(e) {
			e.tag === 22 ? (le(py, py.current, e), le(ly, e, e), uy === null && (uy = e)) : va(e);
		}
		function va(e) {
			le(py, py.current, e), le(ly, ly.current, e);
		}
		function ya(e) {
			ce(ly, e), uy === e && (uy = null), ce(py, e);
		}
		function ba(e) {
			for (var t = e; t !== null;) {
				if (t.tag === 13) {
					var n = t.memoizedState;
					if (n !== null && (n = n.dehydrated, n === null || gd(n) || _d(n))) return t;
				} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
					if (t.flags & 128) return t;
				} else if (t.child !== null) {
					t.child.return = t, t = t.child;
					continue;
				}
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return null;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
			return null;
		}
		function A() {
			var e = X;
			Fy === null ? Fy = [e] : Fy.push(e);
		}
		function j() {
			var e = X;
			if (Fy !== null && (Iy++, Fy[Iy] !== e)) {
				var t = C(Y);
				if (!by.has(t) && (by.add(t), Fy !== null)) {
					for (var n = "", r = 0; r <= Iy; r++) {
						var i = Fy[r], a = r === Iy ? e : i;
						for (i = r + 1 + ". " + i; 30 > i.length;) i += " ";
						i += a + "\n", n += i;
					}
					console.error("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n", t, n);
				}
			}
		}
		function xa(e) {
			e == null || Jf(e) || console.error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", X, typeof e);
		}
		function Sa() {
			var e = C(Y);
			Cy.has(e) || (Cy.add(e), console.error("ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.", e));
		}
		function Ca() {
			throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
		}
		function wa(e, t) {
			if (Ly) return !1;
			if (t === null) return console.error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", X), !1;
			e.length !== t.length && console.error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", X, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
			for (var n = 0; n < t.length && n < e.length; n++) if (!Gh(e[n], t[n])) return !1;
			return !0;
		}
		function Ta(e, t, n, r, i, a) {
			wy = a, Y = t, Fy = e === null ? null : e._debugHookTypes, Iy = -1, Ly = e !== null && e.type !== t.type, (Object.prototype.toString.call(n) === "[object AsyncFunction]" || Object.prototype.toString.call(n) === "[object AsyncGeneratorFunction]") && (a = C(Y), Sy.has(a) || (Sy.add(a), console.error("%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.", a === null ? "An unknown Component" : "<" + a + ">"))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, B.H = e !== null && e.memoizedState !== null ? Vy : Fy === null ? zy : By, ky = a = (t.mode & zg) !== U;
			var o = xv(n, r, i);
			if (ky = !1, Oy && (o = Da(t, n, r, i)), a) {
				Ne(!0);
				try {
					o = Da(t, n, r, i);
				} finally {
					Ne(!1);
				}
			}
			return Ea(e, t), o;
		}
		function Ea(e, t) {
			t._debugHookTypes = Fy, t.dependencies === null ? My !== null && (t.dependencies = {
				lanes: 0,
				firstContext: null,
				_debugThenableState: My
			}) : t.dependencies._debugThenableState = My, B.H = Ry;
			var n = Ty !== null && Ty.next !== null;
			if (wy = 0, Fy = X = Ey = Ty = Y = null, Iy = -1, e !== null && (e.flags & 65011712) != (t.flags & 65011712) && console.error("Internal React error: Expected static flag was missing. Please notify the React team."), Dy = !1, jy = 0, My = null, n) throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
			e === null || sb || (e = e.dependencies, e !== null && ai(e) && (sb = !0)), Uv ? (Uv = !1, e = !0) : e = !1, e && (t = C(t) || "Unknown", xy.has(t) || Sy.has(t) || (xy.add(t), console.error("`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary.")));
		}
		function Da(e, t, n, r) {
			Y = e;
			var i = 0;
			do {
				if (Oy && (My = null), jy = 0, Oy = !1, i >= Py) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
				if (i += 1, Ly = !1, Ey = Ty = null, e.updateQueue != null) {
					var a = e.updateQueue;
					a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0);
				}
				Iy = -1, B.H = Hy, a = xv(t, n, r);
			} while (Oy);
			return a;
		}
		function Oa() {
			var e = B.H, t = e.useState()[0];
			return t = typeof t.then == "function" ? Fa(t) : t, e = e.useState()[0], (Ty === null ? null : Ty.memoizedState) !== e && (Y.flags |= 1024), t;
		}
		function ka() {
			var e = Ay !== 0;
			return Ay = 0, e;
		}
		function Aa(e, t, n) {
			t.updateQueue = e.updateQueue, t.flags = (t.mode & Bg) === U ? t.flags & -2053 : t.flags & -402655237, e.lanes &= ~n;
		}
		function ja(e) {
			if (Dy) {
				for (e = e.memoizedState; e !== null;) {
					var t = e.queue;
					t !== null && (t.pending = null), e = e.next;
				}
				Dy = !1;
			}
			wy = 0, Fy = Ey = Ty = Y = null, Iy = -1, X = null, Oy = !1, jy = Ay = 0, My = null;
		}
		function Ma() {
			var e = {
				memoizedState: null,
				baseState: null,
				baseQueue: null,
				queue: null,
				next: null
			};
			return Ey === null ? Y.memoizedState = Ey = e : Ey = Ey.next = e, Ey;
		}
		function Na() {
			if (Ty === null) {
				var e = Y.alternate;
				e = e === null ? null : e.memoizedState;
			} else e = Ty.next;
			var t = Ey === null ? Y.memoizedState : Ey.next;
			if (t !== null) Ey = t, Ty = e;
			else {
				if (e === null) throw Y.alternate === null ? Error("Update hook called on initial render. This is likely a bug in React. Please file an issue.") : Error("Rendered more hooks than during the previous render.");
				Ty = e, e = {
					memoizedState: Ty.memoizedState,
					baseState: Ty.baseState,
					baseQueue: Ty.baseQueue,
					queue: Ty.queue,
					next: null
				}, Ey === null ? Y.memoizedState = Ey = e : Ey = Ey.next = e;
			}
			return Ey;
		}
		function Pa() {
			return {
				lastEffect: null,
				events: null,
				stores: null,
				memoCache: null
			};
		}
		function Fa(e) {
			var t = jy;
			return jy += 1, My === null && (My = Ri()), e = Bi(My, e, t), t = Y, (Ey === null ? t.memoizedState : Ey.next) === null && (t = t.alternate, B.H = t !== null && t.memoizedState !== null ? Vy : zy), e;
		}
		function Ia(e) {
			if (typeof e == "object" && e) {
				if (typeof e.then == "function") return Fa(e);
				if (e.$$typeof === Rf) return si(e);
			}
			throw Error("An unsupported type was passed to use(): " + String(e));
		}
		function La(e) {
			var t = null, n = Y.updateQueue;
			if (n !== null && (t = n.memoCache), t == null) {
				var r = Y.alternate;
				r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
					data: r.data.map(function(e) {
						return e.slice();
					}),
					index: 0
				})));
			}
			if (t ??= {
				data: [],
				index: 0
			}, n === null && (n = Pa(), Y.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0 || Ly) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = Gf;
			else n.length !== e && console.error("Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.", n.length, e);
			return t.index++, n;
		}
		function Ra(e, t) {
			return typeof t == "function" ? t(e) : t;
		}
		function za(e, t, n) {
			var r = Ma();
			if (n !== void 0) {
				var i = n(t);
				if (ky) {
					Ne(!0);
					try {
						n(t);
					} finally {
						Ne(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = qo.bind(null, Y, e), [r.memoizedState, e];
		}
		function Ba(e) {
			return Va(Na(), Ty, e);
		}
		function Va(e, t, n) {
			var r = e.queue;
			if (r === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			r.lastRenderedReducer = n;
			var i = e.baseQueue, a = r.pending;
			if (a !== null) {
				if (i !== null) {
					var o = i.next;
					i.next = a.next, a.next = o;
				}
				t.baseQueue !== i && console.error("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), t.baseQueue = i = a, r.pending = null;
			}
			if (a = e.baseState, i === null) e.memoizedState = a;
			else {
				t = i.next;
				var s = o = null, c = null, l = t, u = !1;
				do {
					var d = l.lane & -536870913;
					if (d === l.lane ? (wy & d) === d : ($ & d) === d) {
						var f = l.revertLane;
						if (f === 0) c !== null && (c = c.next = {
							lane: 0,
							revertLane: 0,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}), d === ov && (u = !0);
						else if ((wy & f) === f) {
							l = l.next, f === ov && (u = !0);
							continue;
						} else d = {
							lane: 0,
							revertLane: l.revertLane,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}, c === null ? (s = c = d, o = a) : c = c.next = d, Y.lanes |= f, cx |= f;
						d = l.action, ky && n(a, d), a = l.hasEagerState ? l.eagerState : n(a, d);
					} else f = {
						lane: d,
						revertLane: l.revertLane,
						gesture: l.gesture,
						action: l.action,
						hasEagerState: l.hasEagerState,
						eagerState: l.eagerState,
						next: null
					}, c === null ? (s = c = f, o = a) : c = c.next = f, Y.lanes |= d, cx |= d;
					l = l.next;
				} while (l !== null && l !== t);
				if (c === null ? o = a : c.next = s, !Gh(a, e.memoizedState) && (sb = !0, u && (n = sv, n !== null))) throw n;
				e.memoizedState = a, e.baseState = o, e.baseQueue = c, r.lastRenderedState = a;
			}
			return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
		}
		function Ha(e) {
			var t = Na(), n = t.queue;
			if (n === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			n.lastRenderedReducer = e;
			var r = n.dispatch, i = n.pending, a = t.memoizedState;
			if (i !== null) {
				n.pending = null;
				var o = i = i.next;
				do
					a = e(a, o.action), o = o.next;
				while (o !== i);
				Gh(a, t.memoizedState) || (sb = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), n.lastRenderedState = a;
			}
			return [a, r];
		}
		function Ua(e, t, n) {
			var r = Y, i = Ma();
			if (G) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				var a = n();
				yy || a === n() || (console.error("The result of getServerSnapshot should be cached to avoid an infinite loop"), yy = !0);
			} else {
				if (a = t(), yy || (n = t(), Gh(a, n) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), yy = !0)), Wb === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				$ & 127 || Ga(r, t, a);
			}
			return i.memoizedState = a, n = {
				value: a,
				getSnapshot: t
			}, i.queue = n, yo(qa.bind(null, r, n, e), [e]), r.flags |= 2048, ho(hy | vy, { destroy: void 0 }, Ka.bind(null, r, n, a, t), null), a;
		}
		function Wa(e, t, n) {
			var r = Y, i = Na(), a = G;
			if (a) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				n = n();
			} else if (n = t(), !yy) {
				var o = t();
				Gh(n, o) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), yy = !0);
			}
			if ((o = !Gh((Ty || i).memoizedState, n)) && (i.memoizedState = n, sb = !0), i = i.queue, vo(2048, vy, qa.bind(null, r, i, e), [e]), i.getSnapshot !== t || o || Ey !== null && Ey.memoizedState.tag & hy) {
				if (r.flags |= 2048, ho(hy | vy, { destroy: void 0 }, Ka.bind(null, r, i, n, t), null), Wb === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				a || wy & 127 || Ga(r, t, n);
			}
			return n;
		}
		function Ga(e, t, n) {
			e.flags |= 16384, e = {
				getSnapshot: t,
				value: n
			}, t = Y.updateQueue, t === null ? (t = Pa(), Y.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
		}
		function Ka(e, t, n, r) {
			t.value = n, t.getSnapshot = r, Ja(t) && Ya(e);
		}
		function qa(e, t, n) {
			return n(function() {
				Ja(t) && (pi(2, "updateSyncExternalStore()", e), Ya(e));
			});
		}
		function Ja(e) {
			var t = e.getSnapshot;
			e = e.value;
			try {
				var n = t();
				return !Gh(e, n);
			} catch {
				return !0;
			}
		}
		function Ya(e) {
			var t = gr(e, 2);
			t !== null && ol(t, e, 2);
		}
		function Xa(e) {
			var t = Ma();
			if (typeof e == "function") {
				var n = e;
				if (e = n(), ky) {
					Ne(!0);
					try {
						n();
					} finally {
						Ne(!1);
					}
				}
			}
			return t.memoizedState = t.baseState = e, t.queue = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ra,
				lastRenderedState: e
			}, t;
		}
		function Za(e) {
			e = Xa(e);
			var t = e.queue, n = Jo.bind(null, Y, t);
			return t.dispatch = n, [e.memoizedState, n];
		}
		function Qa(e) {
			var t = Ma();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Xo.bind(null, Y, !0, n), n.dispatch = t, [e, t];
		}
		function $a(e, t) {
			return eo(Na(), Ty, e, t);
		}
		function eo(e, t, n, r) {
			return e.baseState = n, Va(e, Ty, typeof r == "function" ? r : Ra);
		}
		function to(e, t) {
			var n = Na();
			return Ty === null ? (n.baseState = e, [e, n.queue.dispatch]) : eo(n, Ty, e, t);
		}
		function no(e, t, n, r, i) {
			if (Zo(e)) throw Error("Cannot update form state while rendering.");
			if (e = t.action, e !== null) {
				var a = {
					payload: i,
					action: e,
					next: null,
					isTransition: !0,
					status: "pending",
					value: null,
					reason: null,
					listeners: [],
					then: function(e) {
						a.listeners.push(e);
					}
				};
				B.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, ro(t, a)) : (a.next = n.next, t.pending = n.next = a);
			}
		}
		function ro(e, t) {
			var n = t.action, r = t.payload, i = e.state;
			if (t.isTransition) {
				var a = B.T, o = {};
				o._updatedFibers = /* @__PURE__ */ new Set(), B.T = o;
				try {
					var s = n(i, r), c = B.S;
					c !== null && c(o, s), io(e, t, s);
				} catch (n) {
					oo(e, t, n);
				} finally {
					a !== null && o.types !== null && (a.types !== null && a.types !== o.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), a.types = o.types), B.T = a, a === null && o._updatedFibers && (e = o._updatedFibers.size, o._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
				}
			} else try {
				o = n(i, r), io(e, t, o);
			} catch (n) {
				oo(e, t, n);
			}
		}
		function io(e, t, n) {
			typeof n == "object" && n && typeof n.then == "function" ? (B.asyncTransitions++, n.then(Fo, Fo), n.then(function(n) {
				ao(e, t, n);
			}, function(n) {
				return oo(e, t, n);
			}), t.isTransition || console.error("An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop.")) : ao(e, t, n);
		}
		function ao(e, t, n) {
			t.status = "fulfilled", t.value = n, so(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, ro(e, n)));
		}
		function oo(e, t, n) {
			var r = e.pending;
			if (e.pending = null, r !== null) {
				r = r.next;
				do
					t.status = "rejected", t.reason = n, so(t), t = t.next;
				while (t !== r);
			}
			e.action = null;
		}
		function so(e) {
			e = e.listeners;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
		function co(e, t) {
			return t;
		}
		function lo(e, t) {
			if (G) {
				var n = Wb.formState;
				if (n !== null) {
					a: {
						var r = Y;
						if (G) {
							if (e_) {
								b: {
									for (var i = e_, a = i_; i.nodeType !== 8;) {
										if (!a) {
											i = null;
											break b;
										}
										if (i = yd(i.nextSibling), i === null) {
											i = null;
											break b;
										}
									}
									a = i.data, i = a === zS || a === BS ? i : null;
								}
								if (i) {
									e_ = yd(i.nextSibling), r = i.data === zS;
									break a;
								}
							}
							Gr(r);
						}
						r = !1;
					}
					r && (t = n[0]);
				}
			}
			return n = Ma(), n.memoizedState = n.baseState = t, r = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: co,
				lastRenderedState: t
			}, n.queue = r, n = Jo.bind(null, Y, r), r.dispatch = n, r = Xa(!1), a = Xo.bind(null, Y, !1, r.queue), r = Ma(), i = {
				state: t,
				dispatch: null,
				action: e,
				pending: null
			}, r.queue = i, n = no.bind(null, Y, i, a, n), i.dispatch = n, r.memoizedState = e, [
				t,
				n,
				!1
			];
		}
		function uo(e) {
			return fo(Na(), Ty, e);
		}
		function fo(e, t, n) {
			if (t = Va(e, t, co)[0], e = Ba(Ra)[0], typeof t == "object" && t && typeof t.then == "function") try {
				var r = Fa(t);
			} catch (e) {
				throw e === Rv ? Bv : e;
			}
			else r = t;
			t = Na();
			var i = t.queue, a = i.dispatch;
			return n !== t.memoizedState && (Y.flags |= 2048, ho(hy | vy, { destroy: void 0 }, po.bind(null, i, n), null)), [
				r,
				a,
				e
			];
		}
		function po(e, t) {
			e.action = t;
		}
		function mo(e) {
			var t = Na(), n = Ty;
			if (n !== null) return fo(t, n, e);
			Na(), t = t.memoizedState, n = Na();
			var r = n.queue.dispatch;
			return n.memoizedState = e, [
				t,
				r,
				!1
			];
		}
		function ho(e, t, n, r) {
			return e = {
				tag: e,
				create: n,
				deps: r,
				inst: t,
				next: null
			}, t = Y.updateQueue, t === null && (t = Pa(), Y.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
		}
		function go(e) {
			var t = Ma();
			return e = { current: e }, t.memoizedState = e;
		}
		function _o(e, t, n, r) {
			var i = Ma();
			Y.flags |= e, i.memoizedState = ho(hy | t, { destroy: void 0 }, n, r === void 0 ? null : r);
		}
		function vo(e, t, n, r) {
			var i = Na();
			r = r === void 0 ? null : r;
			var a = i.memoizedState.inst;
			Ty !== null && r !== null && wa(r, Ty.memoizedState.deps) ? i.memoizedState = ho(t, a, n, r) : (Y.flags |= e, i.memoizedState = ho(hy | t, a, n, r));
		}
		function yo(e, t) {
			(Y.mode & Bg) === U ? _o(8390656, vy, e, t) : _o(276826112, vy, e, t);
		}
		function bo(e) {
			Y.flags |= 4;
			var t = Y.updateQueue;
			if (t === null) t = Pa(), Y.updateQueue = t, t.events = [e];
			else {
				var n = t.events;
				n === null ? t.events = [e] : n.push(e);
			}
		}
		function xo(e) {
			var t = Ma(), n = { impl: e };
			return t.memoizedState = n, function() {
				if ((Z & Fb) !== Pb) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return n.impl.apply(void 0, arguments);
			};
		}
		function M(e) {
			var t = Na().memoizedState;
			return bo({
				ref: t,
				nextImpl: e
			}), function() {
				if ((Z & Fb) !== Pb) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return t.impl.apply(void 0, arguments);
			};
		}
		function So(e, t) {
			var n = 4194308;
			return (Y.mode & Bg) !== U && (n |= 134217728), _o(n, _y, e, t);
		}
		function Co(e, t) {
			if (typeof t == "function") {
				e = e();
				var n = t(e);
				return function() {
					typeof n == "function" ? n() : t(null);
				};
			}
			if (t != null) return t.hasOwnProperty("current") || console.error("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(t).join(", ") + "}"), e = e(), t.current = e, function() {
				t.current = null;
			};
		}
		function wo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]);
			var r = 4194308;
			(Y.mode & Bg) !== U && (r |= 134217728), _o(r, _y, Co.bind(null, t, e), n);
		}
		function To(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]), vo(4, _y, Co.bind(null, t, e), n);
		}
		function Eo(e, t) {
			return Ma().memoizedState = [e, t === void 0 ? null : t], e;
		}
		function Do(e, t) {
			var n = Na();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			return t !== null && wa(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
		}
		function Oo(e, t) {
			var n = Ma();
			t = t === void 0 ? null : t;
			var r = e();
			if (ky) {
				Ne(!0);
				try {
					e();
				} finally {
					Ne(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function ko(e, t) {
			var n = Na();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			if (t !== null && wa(t, r[1])) return r[0];
			if (r = e(), ky) {
				Ne(!0);
				try {
					e();
				} finally {
					Ne(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function Ao(e, t) {
			return No(Ma(), e, t);
		}
		function jo(e, t) {
			return Po(Na(), Ty.memoizedState, e, t);
		}
		function Mo(e, t) {
			var n = Na();
			return Ty === null ? No(n, e, t) : Po(n, Ty.memoizedState, e, t);
		}
		function No(e, t, n) {
			return n === void 0 || wy & 1073741824 && !($ & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = al(), Y.lanes |= e, cx |= e, n);
		}
		function Po(e, t, n, r) {
			return Gh(n, t) ? n : sy.current === null ? !(wy & 42) || wy & 1073741824 && !($ & 261930) ? (sb = !0, e.memoizedState = n) : (e = al(), Y.lanes |= e, cx |= e, t) : (e = No(e, n, r), Gh(e, t) || (sb = !0), e);
		}
		function Fo() {
			B.asyncTransitions--;
		}
		function Io(e, t, n, r, i) {
			var a = Yf.p;
			Yf.p = a !== 0 && a < Up ? a : Up;
			var o = B.T, s = {};
			s._updatedFibers = /* @__PURE__ */ new Set(), B.T = s, Xo(e, !1, t, n);
			try {
				var c = i(), l = B.S;
				if (l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function") {
					B.asyncTransitions++, c.then(Fo, Fo);
					var u = Pi(c, r);
					Yo(e, t, u, il(e));
				} else Yo(e, t, r, il(e));
			} catch (n) {
				Yo(e, t, {
					then: function() {},
					status: "rejected",
					reason: n
				}, il(e));
			} finally {
				Yf.p = a, o !== null && s.types !== null && (o.types !== null && o.types !== s.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), o.types = s.types), B.T = o, o === null && s._updatedFibers && (e = s._updatedFibers.size, s._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
			}
		}
		function Lo(e, t, n, r) {
			if (e.tag !== 5) throw Error("Expected the form instance to be a HostComponent. This is a bug in React.");
			var i = Ro(e).queue;
			mi(e), Io(e, i, t, yC, n === null ? f : function() {
				return zo(e), n(r);
			});
		}
		function Ro(e) {
			var t = e.memoizedState;
			if (t !== null) return t;
			t = {
				memoizedState: yC,
				baseState: yC,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: Ra,
					lastRenderedState: yC
				},
				next: null
			};
			var n = {};
			return t.next = {
				memoizedState: n,
				baseState: n,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: Ra,
					lastRenderedState: n
				},
				next: null
			}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
		}
		function zo(e) {
			B.T === null && console.error("requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition.");
			var t = Ro(e);
			t.next === null && (t = e.alternate.memoizedState), Yo(e, t.next.queue, {}, il(e));
		}
		function Bo() {
			var e = Xa(!1);
			return e = Io.bind(null, Y, e.queue, !0, !1), Ma().memoizedState = e, [!1, e];
		}
		function Vo() {
			var e = Ba(Ra)[0], t = Na().memoizedState;
			return [typeof e == "boolean" ? e : Fa(e), t];
		}
		function Ho() {
			var e = Ha(Ra)[0], t = Na().memoizedState;
			return [typeof e == "boolean" ? e : Fa(e), t];
		}
		function Uo() {
			return si(bC);
		}
		function Wo() {
			var e = Ma(), t = Wb.identifierPrefix;
			if (G) {
				var n = Qg, r = Zg;
				n = (r & ~(1 << 32 - Ip(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Ay++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Ny++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		}
		function Go() {
			return Ma().memoizedState = Ko.bind(null, Y);
		}
		function Ko(e, t) {
			for (var n = e.return; n !== null;) {
				switch (n.tag) {
					case 24:
					case 3:
						var r = il(n), i = ra(r), a = ia(n, i, r);
						a !== null && (pi(r, "refresh()", e), ol(a, n, r), aa(a, n, r)), e = ui(), t != null && a !== null && console.error("The seed argument is not enabled outside experimental channels."), i.payload = { cache: e };
						return;
				}
				n = n.return;
			}
		}
		function qo(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = il(e);
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			Zo(e) ? Qo(t, i) : (i = hr(e, t, i, r), i !== null && (pi(r, "dispatch()", e), ol(i, e, r), $o(i, t, r)));
		}
		function Jo(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = il(e), Yo(e, t, n, r) && pi(r, "setState()", e);
		}
		function Yo(e, t, n, r) {
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			if (Zo(e)) Qo(t, i);
			else {
				var a = e.alternate;
				if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) {
					var o = B.H;
					B.H = Wy;
					try {
						var s = t.lastRenderedState, c = a(s, n);
						if (i.hasEagerState = !0, i.eagerState = c, Gh(c, s)) return mr(e, t, i, 0), Wb === null && pr(), !1;
					} catch {} finally {
						B.H = o;
					}
				}
				if (n = hr(e, t, i, r), n !== null) return ol(n, e, r), $o(n, t, r), !0;
			}
			return !1;
		}
		function Xo(e, t, n, r) {
			if (B.T === null && ov === 0 && console.error("An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."), r = {
				lane: 2,
				revertLane: iu(),
				gesture: null,
				action: r,
				hasEagerState: !1,
				eagerState: null,
				next: null
			}, Zo(e)) {
				if (t) throw Error("Cannot update optimistic state while rendering.");
				console.error("Cannot call startTransition while rendering.");
			} else t = hr(e, n, r, 2), t !== null && (pi(2, "setOptimistic()", e), ol(t, e, 2));
		}
		function Zo(e) {
			var t = e.alternate;
			return e === Y || t !== null && t === Y;
		}
		function Qo(e, t) {
			Oy = Dy = !0;
			var n = e.pending;
			n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
		}
		function $o(e, t, n) {
			if (n & 4194048) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, We(e, n);
			}
		}
		function es(e) {
			if (e !== null && typeof e != "function") {
				var t = String(e);
				nb.has(t) || (nb.add(t), console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", e));
			}
		}
		function ts(e, t, n, r) {
			var i = e.memoizedState, a = n(r, i);
			if (e.mode & zg) {
				Ne(!0);
				try {
					a = n(r, i);
				} finally {
					Ne(!1);
				}
			}
			a === void 0 && (t = ae(t) || "Component", Qy.has(t) || (Qy.add(t), console.error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", t))), i = a == null ? i : z({}, i, a), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
		}
		function ns(e, t, n, r, i, a, o) {
			var s = e.stateNode;
			if (typeof s.shouldComponentUpdate == "function") {
				if (n = s.shouldComponentUpdate(r, a, o), e.mode & zg) {
					Ne(!0);
					try {
						n = s.shouldComponentUpdate(r, a, o);
					} finally {
						Ne(!1);
					}
				}
				return n === void 0 && console.error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", ae(t) || "Component"), n;
			}
			return t.prototype && t.prototype.isPureReactComponent ? !zn(n, r) || !zn(i, a) : !0;
		}
		function rs(e, t, n, r) {
			var i = t.state;
			typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== i && (e = C(e) || "Component", qy.has(e) || (qy.add(e), console.error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", e)), rb.enqueueReplaceState(t, t.state, null));
		}
		function is(e, t) {
			var n = t;
			if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
			if (e = e.defaultProps) for (var i in n === t && (n = z({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
			return n;
		}
		function as(e) {
			pg(e), console.warn("%s\n\n%s\n", ib ? "An error occurred in the <" + ib + "> component." : "An error occurred in one of your React components.", "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://react.dev/link/error-boundaries to learn more about error boundaries.");
		}
		function os(e) {
			var t = ib ? "The above error occurred in the <" + ib + "> component." : "The above error occurred in one of your React components.", n = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((ab || "Anonymous") + ".");
			if (typeof e == "object" && e && typeof e.environmentName == "string") {
				var r = e.environmentName;
				e = [
					"%o\n\n%s\n\n%s\n",
					e,
					t,
					n
				].slice(0), typeof e[0] == "string" ? e.splice(0, 1, xC + " " + e[0], SC, wC + r + wC, CC) : e.splice(0, 0, xC, SC, wC + r + wC, CC), e.unshift(console), r = TC.apply(console.error, e), r();
			} else console.error("%o\n\n%s\n\n%s\n", e, t, n);
		}
		function ss(e) {
			pg(e);
		}
		function cs(e, t) {
			try {
				ib = t.source ? C(t.source) : null, ab = null;
				var n = t.value;
				if (B.actQueue !== null) B.thrownErrors.push(n);
				else {
					var r = e.onUncaughtError;
					r(n, { componentStack: t.stack });
				}
			} catch (e) {
				setTimeout(function() {
					throw e;
				});
			}
		}
		function ls(e, t, n) {
			try {
				ib = n.source ? C(n.source) : null, ab = C(t);
				var r = e.onCaughtError;
				r(n.value, {
					componentStack: n.stack,
					errorBoundary: t.tag === 1 ? t.stateNode : null
				});
			} catch (e) {
				setTimeout(function() {
					throw e;
				});
			}
		}
		function us(e, t, n) {
			return n = ra(n), n.tag = ny, n.payload = { element: null }, n.callback = function() {
				E(t.source, cs, e, t);
			}, n;
		}
		function ds(e) {
			return e = ra(e), e.tag = ny, e;
		}
		function fs(e, t, n, r) {
			var i = n.type.getDerivedStateFromError;
			if (typeof i == "function") {
				var a = r.value;
				e.payload = function() {
					return i(a);
				}, e.callback = function() {
					Sr(n), E(r.source, ls, t, n, r);
				};
			}
			var o = n.stateNode;
			o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
				Sr(n), E(r.source, ls, t, n, r), typeof i != "function" && (Cx === null ? Cx = /* @__PURE__ */ new Set([this]) : Cx.add(this)), kv(this, r), typeof i == "function" || !(n.lanes & 2) && console.error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", C(n) || "Unknown");
			});
		}
		function ps(e, t, n, r, i) {
			if (n.flags |= 32768, Fp && Yl(e, i), typeof r == "object" && r && typeof r.then == "function") {
				if (t = n.alternate, t !== null && ii(t, n, i, !0), G && (t_ = !0), n = ly.current, n !== null) {
					switch (n.tag) {
						case 31:
						case 13: return uy === null ? bl() : n.alternate === null && sx === Lb && (sx = Bb), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Vv ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Bl(e, r, i)), !1;
						case 22: return n.flags |= 65536, r === Vv ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
							transitions: null,
							markerInstances: null,
							retryQueue: /* @__PURE__ */ new Set([r])
						}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Bl(e, r, i)), !1;
					}
					throw Error("Unexpected Suspense handler tag (" + n.tag + "). This is a bug in React.");
				}
				return Bl(e, r, i), bl(), !1;
			}
			if (G) return t_ = !0, t = ly.current, t === null ? (r !== a_ && Zr(Pr(Error("There was an error while hydrating but React was able to recover by instead client rendering the entire root.", { cause: r }), n)), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = Pr(r, n), i = us(e.stateNode, r, i), oa(e, i), sx !== Vb && (sx = zb)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== a_ && Zr(Pr(Error("There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.", { cause: r }), n))), !1;
			var a = Pr(Error("There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.", { cause: r }), n);
			if (px === null ? px = [a] : px.push(a), sx !== Vb && (sx = zb), t === null) return !0;
			r = Pr(r, n), n = t;
			do {
				switch (n.tag) {
					case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = us(n.stateNode, r, e), oa(n, e), !1;
					case 1: if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (Cx === null || !Cx.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = ds(i), fs(i, e, n, r), oa(n, i), !1;
				}
				n = n.return;
			} while (n !== null);
			return !1;
		}
		function ms(e, t, n, r) {
			t.child = e === null ? Qv(t, null, n, r) : Zv(t, e.child, n, r);
		}
		function hs(e, t, n, r, i) {
			n = n.render;
			var a = t.ref;
			if ("ref" in r) {
				var o = {};
				for (var s in r) s !== "ref" && (o[s] = r[s]);
			} else o = r;
			return oi(t), r = Ta(e, t, n, o, a, i), s = ka(), e !== null && !sb ? (Aa(e, t, i), zs(e, t, i)) : (G && s && Lr(t), t.flags |= 1, ms(e, t, r, i), t.child);
		}
		function gs(e, t, n, r, i) {
			if (e === null) {
				var a = n.type;
				return typeof a == "function" && !Tr(a) && a.defaultProps === void 0 && n.compare === null ? (n = yr(a), t.tag = 15, t.type = n, ks(t, a), _s(e, t, n, r, i)) : (e = Or(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
			}
			if (a = e.child, !Bs(e, i)) {
				var o = a.memoizedProps;
				if (n = n.compare, n = n === null ? zn : n, n(o, r) && e.ref === t.ref) return zs(e, t, i);
			}
			return t.flags |= 1, e = Er(a, r), e.ref = t.ref, e.return = t, t.child = e;
		}
		function _s(e, t, n, r, i) {
			if (e !== null) {
				var a = e.memoizedProps;
				if (zn(a, r) && e.ref === t.ref && t.type === e.type) if (sb = !1, t.pendingProps = r = a, Bs(e, i)) e.flags & 131072 && (sb = !0);
				else return t.lanes = e.lanes, zs(e, t, i);
			}
			return Ts(e, t, n, r, i);
		}
		function vs(e, t, n, r) {
			var i = r.children, a = e === null ? null : e.memoizedState;
			if (e === null && t.stateNode === null && (t.stateNode = {
				_visibility: Ag,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), r.mode === "hidden") {
				if (t.flags & 128) {
					if (a = a === null ? n : a.baseLanes | n, e !== null) {
						for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
						r = i & ~a;
					} else r = 0, t.child = null;
					return bs(e, t, a, n, r);
				}
				if (n & 536870912) t.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, e !== null && Ii(t, a === null ? null : a.cachePool), a === null ? pa(t) : fa(t, a), _a(t);
				else return r = t.lanes = 536870912, bs(e, t, a === null ? n : a.baseLanes | n, n, r);
			} else a === null ? (e !== null && Ii(t, null), pa(t), va(t)) : (Ii(t, a.cachePool), fa(t, a), va(t), t.memoizedState = null);
			return ms(e, t, i, n), t.child;
		}
		function ys(e, t) {
			return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
				_visibility: Ag,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), t.sibling;
		}
		function bs(e, t, n, r, i) {
			var a = Fi();
			return a = a === null ? null : {
				parent: h_._currentValue,
				pool: a
			}, t.memoizedState = {
				baseLanes: n,
				cachePool: a
			}, e !== null && Ii(t, null), pa(t), _a(t), e !== null && ii(e, t, r, !0), t.childLanes = i, null;
		}
		function xs(e, t) {
			var n = t.hidden;
			return n !== void 0 && console.error("<Activity> doesn't accept a hidden prop. Use mode=\"hidden\" instead.\n- <Activity %s>\n+ <Activity %s>", !0 === n ? "hidden" : !1 === n ? "hidden={false}" : "hidden={...}", n ? "mode=\"hidden\"" : "mode=\"visible\""), t = Ps({
				mode: t.mode,
				children: t.children
			}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
		}
		function Ss(e, t, n) {
			return Zv(t, e.child, null, n), e = xs(t, t.pendingProps), e.flags |= 2, ya(t), t.memoizedState = null, e;
		}
		function Cs(e, t, n) {
			var r = t.pendingProps, i = (t.flags & 128) != 0;
			if (t.flags &= -129, e === null) {
				if (G) {
					if (r.mode === "hidden") return e = xs(t, r), t.lanes = 536870912, ys(null, e);
					if (ga(t), (e = e_) ? (n = hd(e, i_), n = n !== null && n.data === kS ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: zr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Mr(n), r.return = t, t.child = r, $g = t, e_ = null)) : n = null, n === null) throw Wr(t, e), Gr(t);
					return t.lanes = 536870912, null;
				}
				return xs(t, r);
			}
			var a = e.memoizedState;
			if (a !== null) {
				var o = a.dehydrated;
				if (ga(t), i) if (t.flags & 256) t.flags &= -257, t = Ss(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
				else if (Ur(), n & 536870912 && yl(t), sb || ii(e, t, n, !1), i = (n & e.childLanes) !== 0, sb || i) {
					if (r = Wb, r !== null && (o = Ge(r, n), o !== 0 && o !== a.retryLane)) throw a.retryLane = o, gr(e, o), ol(r, e, o), ob;
					bl(), t = Ss(e, t, n);
				} else e = a.treeContext, e_ = yd(o.nextSibling), $g = t, G = !0, r_ = null, t_ = !1, n_ = null, i_ = !1, e !== null && Br(t, e), t = xs(t, r), t.flags |= 4096;
				return t;
			}
			return a = e.child, r = {
				mode: r.mode,
				children: r.children
			}, n & 536870912 && (n & e.lanes) !== 0 && yl(t), e = Er(a, r), e.ref = t.ref, t.child = e, e.return = t, e;
		}
		function ws(e, t) {
			var n = t.ref;
			if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
			else {
				if (typeof n != "function" && typeof n != "object") throw Error("Expected ref to be a function, an object returned by React.createRef(), or undefined/null.");
				(e === null || e.ref !== n) && (t.flags |= 4194816);
			}
		}
		function Ts(e, t, n, r, i) {
			if (n.prototype && typeof n.prototype.render == "function") {
				var a = ae(n) || "Unknown";
				cb[a] || (console.error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", a, a), cb[a] = !0);
			}
			return t.mode & zg && uv.recordLegacyContextWarning(t, null), e === null && (ks(t, t.type), n.contextTypes && (a = ae(n) || "Unknown", ub[a] || (ub[a] = !0, console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)", a)))), oi(t), n = Ta(e, t, n, r, void 0, i), r = ka(), e !== null && !sb ? (Aa(e, t, i), zs(e, t, i)) : (G && r && Lr(t), t.flags |= 1, ms(e, t, n, i), t.child);
		}
		function Es(e, t, n, r, i, a) {
			return oi(t), Iy = -1, Ly = e !== null && e.type !== t.type, t.updateQueue = null, n = Da(t, r, n, i), Ea(e, t), r = ka(), e !== null && !sb ? (Aa(e, t, a), zs(e, t, a)) : (G && r && Lr(t), t.flags |= 1, ms(e, t, n, a), t.child);
		}
		function Ds(e, t, n, r, i) {
			switch (l(t)) {
				case !1:
					var a = t.stateNode, o = new t.type(t.memoizedProps, a.context).state;
					a.updater.enqueueSetState(a, o, null);
					break;
				case !0:
					t.flags |= 128, t.flags |= 65536, a = Error("Simulated error coming from DevTools");
					var s = i & -i;
					if (t.lanes |= s, o = Wb, o === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
					s = ds(s), fs(s, o, t, Pr(a, t)), oa(t, s);
			}
			if (oi(t), t.stateNode === null) {
				if (o = Fg, a = n.contextType, "contextType" in n && a !== null && (a === void 0 || a.$$typeof !== Rf) && !tb.has(n) && (tb.add(n), s = a === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof a == "object" ? a.$$typeof === Lf ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(a).join(", ") + "}." : " However, it is set to a " + typeof a + ".", console.error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", ae(n) || "Component", s)), typeof a == "object" && a && (o = si(a)), a = new n(r, o), t.mode & zg) {
					Ne(!0);
					try {
						a = new n(r, o);
					} finally {
						Ne(!1);
					}
				}
				if (o = t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = rb, t.stateNode = a, a._reactInternals = t, a._reactInternalInstance = Ky, typeof n.getDerivedStateFromProps == "function" && o === null && (o = ae(n) || "Component", Jy.has(o) || (Jy.add(o), console.error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", o, a.state === null ? "null" : "undefined", o))), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function") {
					var c = s = o = null;
					if (typeof a.componentWillMount == "function" && !0 !== a.componentWillMount.__suppressDeprecationWarning ? o = "componentWillMount" : typeof a.UNSAFE_componentWillMount == "function" && (o = "UNSAFE_componentWillMount"), typeof a.componentWillReceiveProps == "function" && !0 !== a.componentWillReceiveProps.__suppressDeprecationWarning ? s = "componentWillReceiveProps" : typeof a.UNSAFE_componentWillReceiveProps == "function" && (s = "UNSAFE_componentWillReceiveProps"), typeof a.componentWillUpdate == "function" && !0 !== a.componentWillUpdate.__suppressDeprecationWarning ? c = "componentWillUpdate" : typeof a.UNSAFE_componentWillUpdate == "function" && (c = "UNSAFE_componentWillUpdate"), o !== null || s !== null || c !== null) {
						a = ae(n) || "Component";
						var u = typeof n.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
						Xy.has(a) || (Xy.add(a), console.error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://react.dev/link/unsafe-component-lifecycles", a, u, o === null ? "" : "\n  " + o, s === null ? "" : "\n  " + s, c === null ? "" : "\n  " + c));
					}
				}
				a = t.stateNode, o = ae(n) || "Component", a.render || (n.prototype && typeof n.prototype.render == "function" ? console.error("No `render` method found on the %s instance: did you accidentally return an object from the constructor?", o) : console.error("No `render` method found on the %s instance: you may have forgotten to define `render`.", o)), !a.getInitialState || a.getInitialState.isReactClassApproved || a.state || console.error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && console.error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), a.contextType && console.error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), n.childContextTypes && !eb.has(n) && (eb.add(n), console.error("%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)", o)), n.contextTypes && !$y.has(n) && ($y.add(n), console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)", o)), typeof a.componentShouldUpdate == "function" && console.error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), n.prototype && n.prototype.isPureReactComponent && a.shouldComponentUpdate !== void 0 && console.error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", ae(n) || "A pure component"), typeof a.componentDidUnmount == "function" && console.error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof a.componentDidReceiveProps == "function" && console.error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof a.componentWillRecieveProps == "function" && console.error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof a.UNSAFE_componentWillRecieveProps == "function" && console.error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o), s = a.props !== r, a.props !== void 0 && s && console.error("When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o), a.defaultProps && console.error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof a.getSnapshotBeforeUpdate != "function" || typeof a.componentDidUpdate == "function" || Yy.has(n) || (Yy.add(n), console.error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", ae(n))), typeof a.getDerivedStateFromProps == "function" && console.error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof a.getDerivedStateFromError == "function" && console.error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof n.getSnapshotBeforeUpdate == "function" && console.error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o), (s = a.state) && (typeof s != "object" || Jf(s)) && console.error("%s.state: must be set to an object or null", o), typeof a.getChildContext == "function" && typeof n.childContextTypes != "object" && console.error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o), a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, ta(t), o = n.contextType, a.context = typeof o == "object" && o ? si(o) : Fg, a.state === r && (o = ae(n) || "Component", Zy.has(o) || (Zy.add(o), console.error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o))), t.mode & zg && uv.recordLegacyContextWarning(t, a), uv.recordUnsafeLifecycleWarnings(t, a), a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (ts(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && (console.error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", C(t) || "Component"), rb.enqueueReplaceState(a, a.state, null)), ca(t, r, a, i), sa(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Bg) !== U && (t.flags |= 134217728), a = !0;
			} else if (e === null) {
				a = t.stateNode;
				var d = t.memoizedProps;
				s = is(n, d), a.props = s;
				var f = a.context;
				c = n.contextType, o = Fg, typeof c == "object" && c && (o = si(c)), u = n.getDerivedStateFromProps, c = typeof u == "function" || typeof a.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, c || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (d || f !== o) && rs(t, a, r, o), ry = !1;
				var p = t.memoizedState;
				a.state = p, ca(t, r, a, i), sa(), f = t.memoizedState, d || p !== f || ry ? (typeof u == "function" && (ts(t, n, u, r), f = t.memoizedState), (s = ry || ns(t, n, s, r, p, f, o)) ? (c || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Bg) !== U && (t.flags |= 134217728)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Bg) !== U && (t.flags |= 134217728), t.memoizedProps = r, t.memoizedState = f), a.props = r, a.state = f, a.context = o, a = s) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Bg) !== U && (t.flags |= 134217728), a = !1);
			} else {
				a = t.stateNode, na(e, t), o = t.memoizedProps, c = is(n, o), a.props = c, u = t.pendingProps, p = a.context, f = n.contextType, s = Fg, typeof f == "object" && f && (s = si(f)), d = n.getDerivedStateFromProps, (f = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== u || p !== s) && rs(t, a, r, s), ry = !1, p = t.memoizedState, a.state = p, ca(t, r, a, i), sa();
				var m = t.memoizedState;
				o !== u || p !== m || ry || e !== null && e.dependencies !== null && ai(e.dependencies) ? (typeof d == "function" && (ts(t, n, d, r), m = t.memoizedState), (c = ry || ns(t, n, c, r, p, m, s) || e !== null && e.dependencies !== null && ai(e.dependencies)) ? (f || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, m, s), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, m, s)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), a.props = r, a.state = m, a.context = s, a = c) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), a = !1);
			}
			if (s = a, ws(e, t), o = (t.flags & 128) != 0, s || o) {
				if (s = t.stateNode, Te(t), o && typeof n.getDerivedStateFromError != "function") n = null, w_ = -1;
				else if (n = Cv(s), t.mode & zg) {
					Ne(!0);
					try {
						Cv(s);
					} finally {
						Ne(!1);
					}
				}
				t.flags |= 1, e !== null && o ? (t.child = Zv(t, e.child, null, i), t.child = Zv(t, null, n, i)) : ms(e, t, n, i), t.memoizedState = s.state, e = t.child;
			} else e = zs(e, t, i);
			return i = t.stateNode, a && i.props !== r && (fb || console.error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", C(t) || "a component"), fb = !0), e;
		}
		function Os(e, t, n, r) {
			return Yr(), t.flags |= 256, ms(e, t, n, r), t.child;
		}
		function ks(e, t) {
			t && t.childContextTypes && console.error("childContextTypes cannot be defined on a function component.\n  %s.childContextTypes = ...", t.displayName || t.name || "Component"), typeof t.getDerivedStateFromProps == "function" && (e = ae(t) || "Unknown", db[e] || (console.error("%s: Function components do not support getDerivedStateFromProps.", e), db[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = ae(t) || "Unknown", lb[t] || (console.error("%s: Function components do not support contextType.", t), lb[t] = !0));
		}
		function As(e) {
			return {
				baseLanes: e,
				cachePool: Li()
			};
		}
		function js(e, t, n) {
			return e = e === null ? 0 : e.childLanes & ~n, t && (e |= dx), e;
		}
		function Ms(e, t, n) {
			var r, i = t.pendingProps;
			c(t) && (t.flags |= 128);
			var a = !1, o = (t.flags & 128) != 0;
			if ((r = o) || (r = e !== null && e.memoizedState === null ? !1 : (py.current & fy) !== 0), r && (a = !0, t.flags &= -129), r = (t.flags & 32) != 0, t.flags &= -33, e === null) {
				if (G) {
					if (a ? ha(t) : va(t), (e = e_) ? (n = hd(e, i_), n = n !== null && n.data !== kS ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: zr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Mr(n), r.return = t, t.child = r, $g = t, e_ = null)) : n = null, n === null) throw Wr(t, e), Gr(t);
					return _d(n) ? t.lanes = 32 : t.lanes = 536870912, null;
				}
				var s = i.children;
				if (i = i.fallback, a) {
					va(t);
					var l = t.mode;
					return s = Ps({
						mode: "hidden",
						children: s
					}, l), i = Ar(i, l, n, null), s.return = t, i.return = t, s.sibling = i, t.child = s, i = t.child, i.memoizedState = As(n), i.childLanes = js(e, r, n), t.memoizedState = hb, ys(null, i);
				}
				return ha(t), Ns(t, s);
			}
			var u = e.memoizedState;
			if (u !== null) {
				var d = u.dehydrated;
				if (d !== null) {
					if (o) t.flags & 256 ? (ha(t), t.flags &= -257, t = Fs(e, t, n)) : t.memoizedState === null ? (va(t), s = i.fallback, l = t.mode, i = Ps({
						mode: "visible",
						children: i.children
					}, l), s = Ar(s, l, n, null), s.flags |= 2, i.return = t, s.return = t, i.sibling = s, t.child = i, Zv(t, e.child, null, n), i = t.child, i.memoizedState = As(n), i.childLanes = js(e, r, n), t.memoizedState = hb, t = ys(null, i)) : (va(t), t.child = e.child, t.flags |= 128, t = null);
					else if (ha(t), Ur(), n & 536870912 && yl(t), _d(d)) {
						if (r = d.nextSibling && d.nextSibling.dataset, r) {
							s = r.dgst;
							var f = r.msg;
							l = r.stck;
							var p = r.cstck;
						}
						a = f, r = s, i = l, d = p, s = a, l = d, s = Error(s || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), s.stack = i || "", s.digest = r, r = l === void 0 ? null : l, i = {
							value: s,
							source: null,
							stack: r
						}, typeof r == "string" && Ug.set(s, i), Zr(i), t = Fs(e, t, n);
					} else if (sb || ii(e, t, n, !1), r = (n & e.childLanes) !== 0, sb || r) {
						if (r = Wb, r !== null && (i = Ge(r, n), i !== 0 && i !== u.retryLane)) throw u.retryLane = i, gr(e, i), ol(r, e, i), ob;
						gd(d) || bl(), t = Fs(e, t, n);
					} else gd(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = u.treeContext, e_ = yd(d.nextSibling), $g = t, G = !0, r_ = null, t_ = !1, n_ = null, i_ = !1, e !== null && Br(t, e), t = Ns(t, i.children), t.flags |= 4096);
					return t;
				}
			}
			return a ? (va(t), s = i.fallback, l = t.mode, p = e.child, d = p.sibling, i = Er(p, {
				mode: "hidden",
				children: i.children
			}), i.subtreeFlags = p.subtreeFlags & 65011712, d === null ? (s = Ar(s, l, n, null), s.flags |= 2) : s = Er(d, s), s.return = t, i.return = t, i.sibling = s, t.child = i, ys(null, i), i = t.child, s = e.child.memoizedState, s === null ? s = As(n) : (l = s.cachePool, l === null ? l = Li() : (p = h_._currentValue, l = l.parent === p ? l : {
				parent: p,
				pool: p
			}), s = {
				baseLanes: s.baseLanes | n,
				cachePool: l
			}), i.memoizedState = s, i.childLanes = js(e, r, n), t.memoizedState = hb, ys(e.child, i)) : (u !== null && (n & 62914560) === n && (n & e.lanes) !== 0 && yl(t), ha(t), n = e.child, e = n.sibling, n = Er(n, {
				mode: "visible",
				children: i.children
			}), n.return = t, n.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = n, t.memoizedState = null, n);
		}
		function Ns(e, t) {
			return t = Ps({
				mode: "visible",
				children: t
			}, e.mode), t.return = e, e.child = t;
		}
		function Ps(e, t) {
			return e = h(22, e, null, t), e.lanes = 0, e;
		}
		function Fs(e, t, n) {
			return Zv(t, e.child, null, n), e = Ns(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
		}
		function Is(e, t, n) {
			e.lanes |= t;
			var r = e.alternate;
			r !== null && (r.lanes |= t), ni(e.return, t, n);
		}
		function Ls(e, t, n, r, i, a) {
			var o = e.memoizedState;
			o === null ? e.memoizedState = {
				isBackwards: t,
				rendering: null,
				renderingStartTime: 0,
				last: r,
				tail: n,
				tailMode: i,
				treeForkCount: a
			} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
		}
		function Rs(e, t, n) {
			var r = t.pendingProps, i = r.revealOrder, a = r.tail, o = r.children, s = py.current;
			if ((r = (s & fy) !== 0) ? (s = s & dy | fy, t.flags |= 128) : s &= dy, le(py, s, t), s = i ?? "null", i !== "forwards" && i !== "unstable_legacy-backwards" && i !== "together" && i !== "independent" && !pb[s]) if (pb[s] = !0, i == null) console.error("The default for the <SuspenseList revealOrder=\"...\"> prop is changing. To be future compatible you must explictly specify either \"independent\" (the current default), \"together\", \"forwards\" or \"legacy_unstable-backwards\".");
			else if (i === "backwards") console.error("The rendering order of <SuspenseList revealOrder=\"backwards\"> is changing. To be future compatible you must specify revealOrder=\"legacy_unstable-backwards\" instead.");
			else if (typeof i == "string") switch (i.toLowerCase()) {
				case "together":
				case "forwards":
				case "backwards":
				case "independent":
					console.error("\"%s\" is not a valid value for revealOrder on <SuspenseList />. Use lowercase \"%s\" instead.", i, i.toLowerCase());
					break;
				case "forward":
				case "backward":
					console.error("\"%s\" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use \"%ss\" instead.", i, i.toLowerCase());
					break;
				default: console.error("\"%s\" is not a supported revealOrder on <SuspenseList />. Did you mean \"independent\", \"together\", \"forwards\" or \"backwards\"?", i);
			}
			else console.error("%s is not a supported value for revealOrder on <SuspenseList />. Did you mean \"independent\", \"together\", \"forwards\" or \"backwards\"?", i);
			s = a ?? "null", mb[s] || (a == null ? (i === "forwards" || i === "backwards" || i === "unstable_legacy-backwards") && (mb[s] = !0, console.error("The default for the <SuspenseList tail=\"...\"> prop is changing. To be future compatible you must explictly specify either \"visible\" (the current default), \"collapsed\" or \"hidden\".")) : a !== "visible" && a !== "collapsed" && a !== "hidden" ? (mb[s] = !0, console.error("\"%s\" is not a supported value for tail on <SuspenseList />. Did you mean \"visible\", \"collapsed\" or \"hidden\"?", a)) : i !== "forwards" && i !== "backwards" && i !== "unstable_legacy-backwards" && (mb[s] = !0, console.error("<SuspenseList tail=\"%s\" /> is only valid if revealOrder is \"forwards\" or \"backwards\". Did you mean to specify revealOrder=\"forwards\"?", a)));
			a: if ((i === "forwards" || i === "backwards" || i === "unstable_legacy-backwards") && o != null && !1 !== o) if (Jf(o)) {
				for (s = 0; s < o.length; s++) if (!ea(o[s], s)) break a;
			} else if (s = ie(o), typeof s == "function") {
				if (s = s.call(o)) for (var c = s.next(), l = 0; !c.done; c = s.next()) {
					if (!ea(c.value, l)) break a;
					l++;
				}
			} else console.error("A single row was passed to a <SuspenseList revealOrder=\"%s\" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?", i);
			if (ms(e, t, o, n), G ? (Vr(), o = qg) : o = 0, !r && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && Is(e, n, t);
				else if (e.tag === 19) Is(e, n, t);
				else if (e.child !== null) {
					e.child.return = e, e = e.child;
					continue;
				}
				if (e === t) break a;
				for (; e.sibling === null;) {
					if (e.return === null || e.return === t) break a;
					e = e.return;
				}
				e.sibling.return = e.return, e = e.sibling;
			}
			switch (i) {
				case "forwards":
					for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && ba(e) === null && (i = n), n = n.sibling;
					n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Ls(t, !1, i, n, a, o);
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (n = null, i = t.child, t.child = null; i !== null;) {
						if (e = i.alternate, e !== null && ba(e) === null) {
							t.child = i;
							break;
						}
						e = i.sibling, i.sibling = n, n = i, i = e;
					}
					Ls(t, !0, n, null, a, o);
					break;
				case "together":
					Ls(t, !1, null, null, void 0, o);
					break;
				default: t.memoizedState = null;
			}
			return t.child;
		}
		function zs(e, t, n) {
			if (e !== null && (t.dependencies = e.dependencies), w_ = -1, cx |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
				if (ii(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
			if (e !== null && t.child !== e.child) throw Error("Resuming work not yet implemented.");
			if (t.child !== null) {
				for (e = t.child, n = Er(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Er(e, e.pendingProps), n.return = t;
				n.sibling = null;
			}
			return t.child;
		}
		function Bs(e, t) {
			return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && ai(e))) : !0;
		}
		function Vs(e, t, n) {
			switch (t.tag) {
				case 3:
					de(t, t.stateNode.containerInfo), ei(t, h_, e.memoizedState.cache), Yr();
					break;
				case 27:
				case 5:
					fe(t);
					break;
				case 4:
					de(t, t.stateNode.containerInfo);
					break;
				case 10:
					ei(t, t.type, t.memoizedProps.value);
					break;
				case 12:
					(n & t.childLanes) !== 0 && (t.flags |= 4), t.flags |= 2048;
					var r = t.stateNode;
					r.effectDuration = -0, r.passiveEffectDuration = -0;
					break;
				case 31:
					if (t.memoizedState !== null) return t.flags |= 128, ga(t), null;
					break;
				case 13:
					if (r = t.memoizedState, r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (ha(t), e = zs(e, t, n), e === null ? null : e.sibling) : Ms(e, t, n) : (ha(t), t.flags |= 128, null);
					ha(t);
					break;
				case 19:
					var i = (e.flags & 128) != 0;
					if (r = (n & t.childLanes) !== 0, r ||= (ii(e, t, n, !1), (n & t.childLanes) !== 0), i) {
						if (r) return Rs(e, t, n);
						t.flags |= 128;
					}
					if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), le(py, py.current, t), r) break;
					return null;
				case 22: return t.lanes = 0, vs(e, t, n, t.pendingProps);
				case 24: ei(t, h_, e.memoizedState.cache);
			}
			return zs(e, t, n);
		}
		function Hs(e, t, n) {
			if (t._debugNeedsRemount && e !== null) {
				n = Or(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes), n._debugStack = t._debugStack, n._debugTask = t._debugTask;
				var r = t.return;
				if (r === null) throw Error("Cannot swap the root fiber.");
				if (e.alternate = null, t.alternate = null, n.index = t.index, n.sibling = t.sibling, n.return = t.return, n.ref = t.ref, n._debugInfo = t._debugInfo, t === r.child) r.child = n;
				else {
					var i = r.child;
					if (i === null) throw Error("Expected parent to have a child.");
					for (; i.sibling !== t;) if (i = i.sibling, i === null) throw Error("Expected to find the previous sibling.");
					i.sibling = n;
				}
				return t = r.deletions, t === null ? (r.deletions = [e], r.flags |= 16) : t.push(e), n.flags |= 2, n;
			}
			if (e !== null) if (e.memoizedProps !== t.pendingProps || t.type !== e.type) sb = !0;
			else {
				if (!Bs(e, n) && !(t.flags & 128)) return sb = !1, Vs(e, t, n);
				sb = !!(e.flags & 131072);
			}
			else sb = !1, (r = G) && (Vr(), r = (t.flags & 1048576) != 0), r && (r = t.index, Vr(), Ir(t, qg, r));
			switch (t.lanes = 0, t.tag) {
				case 16:
					a: if (r = t.pendingProps, e = Vi(t.elementType), t.type = e, typeof e == "function") Tr(e) ? (r = is(e, r), t.tag = 1, t.type = e = yr(e), t = Ds(null, t, e, r, n)) : (t.tag = 0, ks(t, e), t.type = e = yr(e), t = Ts(null, t, e, r, n));
					else {
						if (e != null) {
							if (i = e.$$typeof, i === zf) {
								t.tag = 11, t.type = e = br(e), t = hs(null, t, e, r, n);
								break a;
							} else if (i === Hf) {
								t.tag = 14, t = gs(null, t, e, r, n);
								break a;
							}
						}
						throw t = "", typeof e == "object" && e && e.$$typeof === Uf && (t = " Did you wrap a component in React.lazy() more than once?"), n = ae(e) || e, Error("Element type is invalid. Received a promise that resolves to: " + n + ". Lazy element type must resolve to a class or function." + t);
					}
					return t;
				case 0: return Ts(e, t, t.type, t.pendingProps, n);
				case 1: return r = t.type, i = is(r, t.pendingProps), Ds(e, t, r, i, n);
				case 3:
					a: {
						if (de(t, t.stateNode.containerInfo), e === null) throw Error("Should have a current fiber. This is a bug in React.");
						r = t.pendingProps;
						var a = t.memoizedState;
						i = a.element, na(e, t), ca(t, r, null, n);
						var o = t.memoizedState;
						if (r = o.cache, ei(t, h_, r), r !== a.cache && ri(t, [h_], n, !0), sa(), r = o.element, a.isDehydrated) if (a = {
							element: r,
							isDehydrated: !1,
							cache: o.cache
						}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
							t = Os(e, t, r, n);
							break a;
						} else if (r !== i) {
							i = Pr(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t), Zr(i), t = Os(e, t, r, n);
							break a;
						} else {
							switch (e = t.stateNode.containerInfo, e.nodeType) {
								case 9:
									e = e.body;
									break;
								default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
							}
							for (e_ = yd(e.firstChild), $g = t, G = !0, r_ = null, t_ = !1, n_ = null, i_ = !0, n = Qv(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
						}
						else {
							if (Yr(), r === i) {
								t = zs(e, t, n);
								break a;
							}
							ms(e, t, r, n);
						}
						t = t.child;
					}
					return t;
				case 26: return ws(e, t), e === null ? (n = Md(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : G || (n = t.type, e = t.pendingProps, r = ue(np.current), r = Vu(r).createElement(n), r[qp] = t, r[Jp] = e, Du(r, n, e), rt(r), t.stateNode = r) : t.memoizedState = Md(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
				case 27: return fe(t), e === null && G && (r = ue(np.current), i = T(), r = t.stateNode = Dd(t.type, t.pendingProps, r, i, !1), t_ || (i = Lu(r, t.type, t.pendingProps, i), i !== null && (Hr(t, 0).serverProps = i)), $g = t, i_ = !0, i = e_, td(t.type) ? (nC = i, e_ = yd(r.firstChild)) : e_ = i), ms(e, t, t.pendingProps.children, n), ws(e, t), e === null && (t.flags |= 4194304), t.child;
				case 5: return e === null && G && (a = T(), r = Xt(t.type, a.ancestorInfo), i = e_, (o = !i) || (o = pd(i, t.type, t.pendingProps, i_), o === null ? a = !1 : (t.stateNode = o, t_ || (a = Lu(o, t.type, t.pendingProps, a), a !== null && (Hr(t, 0).serverProps = a)), $g = t, e_ = yd(o.firstChild), i_ = !1, a = !0), o = !a), o && (r && Wr(t, i), Gr(t))), fe(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, r = a.children, Wu(i, a) ? r = null : o !== null && Wu(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = Ta(e, t, Oa, null, null, n), bC._currentValue = i), ws(e, t), ms(e, t, r, n), t.child;
				case 6: return e === null && G && (n = t.pendingProps, e = T(), r = e.ancestorInfo.current, n = r == null || Zt(n, r.tag, e.ancestorInfo.implicitRootScope), e = e_, (r = !e) || (r = md(e, t.pendingProps, i_), r === null ? r = !1 : (t.stateNode = r, $g = t, e_ = null, r = !0), r = !r), r && (n && Wr(t, e), Gr(t))), null;
				case 13: return Ms(e, t, n);
				case 4: return de(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Zv(t, null, r, n) : ms(e, t, r, n), t.child;
				case 11: return hs(e, t, t.type, t.pendingProps, n);
				case 7: return ms(e, t, t.pendingProps, n), t.child;
				case 8: return ms(e, t, t.pendingProps.children, n), t.child;
				case 12: return t.flags |= 4, t.flags |= 2048, r = t.stateNode, r.effectDuration = -0, r.passiveEffectDuration = -0, ms(e, t, t.pendingProps.children, n), t.child;
				case 10: return r = t.type, i = t.pendingProps, a = i.value, "value" in i || gb || (gb = !0, console.error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?")), ei(t, r, a), ms(e, t, i.children, n), t.child;
				case 9: return i = t.type._context, r = t.pendingProps.children, typeof r != "function" && console.error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), oi(t), i = si(i), r = xv(r, i, void 0), t.flags |= 1, ms(e, t, r, n), t.child;
				case 14: return gs(e, t, t.type, t.pendingProps, n);
				case 15: return _s(e, t, t.type, t.pendingProps, n);
				case 19: return Rs(e, t, n);
				case 31: return Cs(e, t, n);
				case 22: return vs(e, t, n, t.pendingProps);
				case 24: return oi(t), r = si(h_), e === null ? (i = Fi(), i === null && (i = Wb, a = ui(), i.pooledCache = a, di(a), a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
					parent: r,
					cache: i
				}, ta(t), ei(t, h_, i)) : ((e.lanes & n) !== 0 && (na(e, t), ca(t, null, null, n), sa()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, ei(t, h_, r), r !== i.cache && ri(t, [h_], n, !0)) : (i = {
					parent: r,
					cache: r
				}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), ei(t, h_, r))), ms(e, t, t.pendingProps.children, n), t.child;
				case 29: throw t.pendingProps;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function Us(e) {
			e.flags |= 4;
		}
		function Ws(e, t, n, r, i) {
			if ((t = (e.mode & Vg) !== U) && (t = !1), t) {
				if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
				else if (gl()) e.flags |= 8192;
				else throw Hv = Vv, zv;
			} else e.flags &= -16777217;
		}
		function Gs(e, t) {
			if (t.type !== "stylesheet" || (t.state.loading & sC) !== rC) e.flags &= -16777217;
			else if (e.flags |= 16777216, !Kd(t)) if (gl()) e.flags |= 8192;
			else throw Hv = Vv, zv;
		}
		function Ks(e, t) {
			t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : ze(), e.lanes |= t, fx |= t);
		}
		function qs(e, t) {
			if (!G) switch (e.tailMode) {
				case "hidden":
					t = e.tail;
					for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
					n === null ? e.tail = null : n.sibling = null;
					break;
				case "collapsed":
					n = e.tail;
					for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
					r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
			}
		}
		function Js(e) {
			var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
			if (t) if ((e.mode & W) !== U) {
				for (var i = e.selfBaseDuration, a = e.child; a !== null;) n |= a.lanes | a.childLanes, r |= a.subtreeFlags & 65011712, r |= a.flags & 65011712, i += a.treeBaseDuration, a = a.sibling;
				e.treeBaseDuration = i;
			} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
			else if ((e.mode & W) !== U) {
				i = e.actualDuration, a = e.selfBaseDuration;
				for (var o = e.child; o !== null;) n |= o.lanes | o.childLanes, r |= o.subtreeFlags, r |= o.flags, i += o.actualDuration, a += o.treeBaseDuration, o = o.sibling;
				e.actualDuration = i, e.treeBaseDuration = a;
			} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
			return e.subtreeFlags |= r, e.childLanes = n, t;
		}
		function Ys(e, t, n) {
			var r = t.pendingProps;
			switch (Rr(t), t.tag) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14: return Js(t), null;
				case 1: return Js(t), null;
				case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ti(h_, t), w(t), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Jr(t) ? (Qr(), Us(t)) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Xr())), Js(t), null;
				case 26:
					var i = t.type, a = t.memoizedState;
					return e === null ? (Us(t), a === null ? (Js(t), Ws(t, i, null, r, n)) : (Js(t), Gs(t, a))) : a ? a === e.memoizedState ? (Js(t), t.flags &= -16777217) : (Us(t), Js(t), Gs(t, a)) : (e = e.memoizedProps, e !== r && Us(t), Js(t), Ws(t, i, e, r, n)), null;
				case 27:
					if (pe(t), n = ue(np.current), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Us(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return Js(t), null;
						}
						e = T(), Jr(t) ? Kr(t, e) : (e = Dd(i, r, n, e, !0), t.stateNode = e, Us(t));
					}
					return Js(t), null;
				case 5:
					if (pe(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Us(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return Js(t), null;
						}
						var o = T();
						if (Jr(t)) Kr(t, o);
						else {
							switch (a = ue(np.current), Xt(i, o.ancestorInfo), o = o.context, a = Vu(a), o) {
								case WS:
									a = a.createElementNS(Lm, i);
									break;
								case GS:
									a = a.createElementNS(Im, i);
									break;
								default: switch (i) {
									case "svg":
										a = a.createElementNS(Lm, i);
										break;
									case "math":
										a = a.createElementNS(Im, i);
										break;
									case "script":
										a = a.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild);
										break;
									case "select":
										a = typeof r.is == "string" ? a.createElement("select", { is: r.is }) : a.createElement("select"), r.multiple ? a.multiple = !0 : r.size && (a.size = r.size);
										break;
									default: a = typeof r.is == "string" ? a.createElement(i, { is: r.is }) : a.createElement(i), i.indexOf("-") === -1 && (i !== i.toLowerCase() && console.error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", i), Object.prototype.toString.call(a) !== "[object HTMLUnknownElement]" || vp.call(JS, i) || (JS[i] = !0, console.error("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", i)));
								}
							}
							a[qp] = t, a[Jp] = r;
							a: for (o = t.child; o !== null;) {
								if (o.tag === 5 || o.tag === 6) a.appendChild(o.stateNode);
								else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
									o.child.return = o, o = o.child;
									continue;
								}
								if (o === t) break a;
								for (; o.sibling === null;) {
									if (o.return === null || o.return === t) break a;
									o = o.return;
								}
								o.sibling.return = o.return, o = o.sibling;
							}
							t.stateNode = a;
							a: switch (Du(a, i, r), i) {
								case "button":
								case "input":
								case "select":
								case "textarea":
									r = !!r.autoFocus;
									break a;
								case "img":
									r = !0;
									break a;
								default: r = !1;
							}
							r && Us(t);
						}
					}
					return Js(t), Ws(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
				case 6:
					if (e && t.stateNode != null) e.memoizedProps !== r && Us(t);
					else {
						if (typeof r != "string" && t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
						if (e = ue(np.current), n = T(), Jr(t)) {
							if (e = t.stateNode, n = t.memoizedProps, i = !t_, r = null, a = $g, a !== null) switch (a.tag) {
								case 3:
									i && (i = xd(e, n, r), i !== null && (Hr(t, 0).serverProps = i));
									break;
								case 27:
								case 5: r = a.memoizedProps, i && (i = xd(e, n, r), i !== null && (Hr(t, 0).serverProps = i));
							}
							e[qp] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || wu(e.nodeValue, n)), e || Gr(t, !0);
						} else i = n.ancestorInfo.current, i != null && Zt(r, i.tag, n.ancestorInfo.implicitRootScope), e = Vu(e).createTextNode(r), e[qp] = t, t.stateNode = e;
					}
					return Js(t), null;
				case 31:
					if (n = t.memoizedState, e === null || e.memoizedState !== null) {
						if (r = Jr(t), n !== null) {
							if (e === null) {
								if (!r) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue.");
								e[qp] = t, Js(t), (t.mode & W) !== U && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							} else Qr(), Yr(), !(t.flags & 128) && (n = t.memoizedState = null), t.flags |= 4, Js(t), (t.mode & W) !== U && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							e = !1;
						} else n = Xr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
						if (!e) return t.flags & 256 ? (ya(t), t) : (ya(t), null);
						if (t.flags & 128) throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
					}
					return Js(t), null;
				case 13:
					if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
						if (i = r, a = Jr(t), i !== null && i.dehydrated !== null) {
							if (e === null) {
								if (!a) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
								a[qp] = t, Js(t), (t.mode & W) !== U && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							} else Qr(), Yr(), !(t.flags & 128) && (i = t.memoizedState = null), t.flags |= 4, Js(t), (t.mode & W) !== U && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							i = !1;
						} else i = Xr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
						if (!i) return t.flags & 256 ? (ya(t), t) : (ya(t), null);
					}
					return ya(t), t.flags & 128 ? (t.lanes = n, (t.mode & W) !== U && ji(t), t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Ks(t, t.updateQueue), Js(t), (t.mode & W) !== U && n && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
				case 4: return w(t), e === null && du(t.stateNode.containerInfo), Js(t), null;
				case 10: return ti(t.type, t), Js(t), null;
				case 19:
					if (ce(py, t), r = t.memoizedState, r === null) return Js(t), null;
					if (i = (t.flags & 128) != 0, a = r.rendering, a === null) if (i) qs(r, !1);
					else {
						if (sx !== Lb || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (a = ba(e), a !== null) {
								for (t.flags |= 128, qs(r, !1), e = a.updateQueue, t.updateQueue = e, Ks(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Dr(n, e), n = n.sibling;
								return le(py, py.current & dy | fy, t), G && Fr(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Cp() > yx && (t.flags |= 128, i = !0, qs(r, !1), t.lanes = 4194304);
					}
					else {
						if (!i) if (e = ba(a), e !== null) {
							if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Ks(t, e), qs(r, !0), r.tail === null && r.tailMode === "hidden" && !a.alternate && !G) return Js(t), null;
						} else 2 * Cp() - r.renderingStartTime > yx && n !== 536870912 && (t.flags |= 128, i = !0, qs(r, !1), t.lanes = 4194304);
						r.isBackwards ? (a.sibling = t.child, t.child = a) : (e = r.last, e === null ? t.child = a : e.sibling = a, r.last = a);
					}
					return r.tail === null ? (Js(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Cp(), e.sibling = null, n = py.current, n = i ? n & dy | fy : n & dy, le(py, n, t), G && Fr(t, r.treeForkCount), e);
				case 22:
				case 23: return ya(t), ma(t), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Js(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Js(t), n = t.updateQueue, n !== null && Ks(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && ce(lv, t), null;
				case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ti(h_, t), Js(t), null;
				case 25: return null;
				case 30: return null;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function Xs(e, t) {
			switch (Rr(t), t.tag) {
				case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & W) !== U && ji(t), t) : null;
				case 3: return ti(h_, t), w(t), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
				case 26:
				case 27:
				case 5: return pe(t), null;
				case 31:
					if (t.memoizedState !== null) {
						if (ya(t), t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						Yr();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & W) !== U && ji(t), t) : null;
				case 13:
					if (ya(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
						if (t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						Yr();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & W) !== U && ji(t), t) : null;
				case 19: return ce(py, t), null;
				case 4: return w(t), null;
				case 10: return ti(t.type, t), null;
				case 22:
				case 23: return ya(t), ma(t), e !== null && ce(lv, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & W) !== U && ji(t), t) : null;
				case 24: return ti(h_, t), null;
				case 25: return null;
				default: return null;
			}
		}
		function Zs(e, t) {
			switch (Rr(t), t.tag) {
				case 3:
					ti(h_, t), w(t);
					break;
				case 26:
				case 27:
				case 5:
					pe(t);
					break;
				case 4:
					w(t);
					break;
				case 31:
					t.memoizedState !== null && ya(t);
					break;
				case 13:
					ya(t);
					break;
				case 19:
					ce(py, t);
					break;
				case 10:
					ti(t.type, t);
					break;
				case 22:
				case 23:
					ya(t), ma(t), e !== null && ce(lv, t);
					break;
				case 24: ti(h_, t);
			}
		}
		function Qs(e) {
			return (e.mode & W) !== U;
		}
		function $s(e, t) {
			Qs(e) ? (Ai(), tc(t, e), Oi()) : tc(t, e);
		}
		function ec(e, t, n) {
			Qs(e) ? (Ai(), nc(n, e, t), Oi()) : nc(n, e, t);
		}
		function tc(e, t) {
			try {
				var n = t.updateQueue, r = n === null ? null : n.lastEffect;
				if (r !== null) {
					var i = r.next;
					n = i;
					do {
						if ((n.tag & e) === e && (r = void 0, (e & gy) !== my && ($x = !0), r = E(t, Nv, n), (e & gy) !== my && ($x = !1), r !== void 0 && typeof r != "function")) {
							var a = void 0;
							a = (n.tag & _y) === 0 ? (n.tag & gy) === 0 ? "useEffect" : "useInsertionEffect" : "useLayoutEffect";
							var o = void 0;
							o = r === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof r.then == "function" ? "\n\nIt looks like you wrote " + a + "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n" + a + "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching" : " You returned: " + r, E(t, function(e, t) {
								console.error("%s must not return anything besides a function, which is used for clean-up.%s", e, t);
							}, a, o);
						}
						n = n.next;
					} while (n !== i);
				}
			} catch (e) {
				N(t, t.return, e);
			}
		}
		function nc(e, t, n) {
			try {
				var r = t.updateQueue, i = r === null ? null : r.lastEffect;
				if (i !== null) {
					var a = i.next;
					r = a;
					do {
						if ((r.tag & e) === e) {
							var o = r.inst, s = o.destroy;
							s !== void 0 && (o.destroy = void 0, (e & gy) !== my && ($x = !0), i = t, E(i, Fv, i, n, s), (e & gy) !== my && ($x = !1));
						}
						r = r.next;
					} while (r !== a);
				}
			} catch (e) {
				N(t, t.return, e);
			}
		}
		function rc(e, t) {
			Qs(e) ? (Ai(), tc(t, e), Oi()) : tc(t, e);
		}
		function ic(e, t, n) {
			Qs(e) ? (Ai(), nc(n, e, t), Oi()) : nc(n, e, t);
		}
		function ac(e) {
			var t = e.updateQueue;
			if (t !== null) {
				var n = e.stateNode;
				e.type.defaultProps || "ref" in e.memoizedProps || fb || (n.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", C(e) || "instance"), n.state !== e.memoizedState && console.error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", C(e) || "instance"));
				try {
					E(e, da, t, n);
				} catch (t) {
					N(e, e.return, t);
				}
			}
		}
		function oc(e, t, n) {
			return e.getSnapshotBeforeUpdate(t, n);
		}
		function sc(e, t) {
			var n = t.memoizedProps, r = t.memoizedState;
			t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || fb || (t.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", C(e) || "instance"), t.state !== e.memoizedState && console.error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", C(e) || "instance"));
			try {
				var i = is(e.type, n), a = E(e, oc, t, i, r);
				n = _b, a !== void 0 || n.has(e.type) || (n.add(e.type), E(e, function() {
					console.error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", C(e));
				})), t.__reactInternalSnapshotBeforeUpdate = a;
			} catch (t) {
				N(e, e.return, t);
			}
		}
		function cc(e, t, n) {
			n.props = is(e.type, e.memoizedProps), n.state = e.memoizedState, Qs(e) ? (Ai(), E(e, jv, e, t, n), Oi()) : E(e, jv, e, t, n);
		}
		function lc(e) {
			var t = e.ref;
			if (t !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var n = e.stateNode;
						break;
					case 30:
						n = e.stateNode;
						break;
					default: n = e.stateNode;
				}
				if (typeof t == "function") if (Qs(e)) try {
					Ai(), e.refCleanup = t(n);
				} finally {
					Oi();
				}
				else e.refCleanup = t(n);
				else typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", C(e)), t.current = n;
			}
		}
		function uc(e, t) {
			try {
				E(e, lc, e);
			} catch (n) {
				N(e, t, n);
			}
		}
		function dc(e, t) {
			var n = e.ref, r = e.refCleanup;
			if (n !== null) if (typeof r == "function") try {
				if (Qs(e)) try {
					Ai(), E(e, r);
				} finally {
					Oi(e);
				}
				else E(e, r);
			} catch (n) {
				N(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				if (Qs(e)) try {
					Ai(), E(e, n, null);
				} finally {
					Oi(e);
				}
				else E(e, n, null);
			} catch (n) {
				N(e, t, n);
			}
			else n.current = null;
		}
		function fc(e, t, n, r) {
			var i = e.memoizedProps, a = i.id, o = i.onCommit;
			i = i.onRender, t = t === null ? "mount" : "update", nv && (t = "nested-update"), typeof i == "function" && i(a, t, e.actualDuration, e.treeBaseDuration, e.actualStartTime, n), typeof o == "function" && o(a, t, r, n);
		}
		function pc(e, t, n, r) {
			var i = e.memoizedProps;
			e = i.id, i = i.onPostCommit, t = t === null ? "mount" : "update", nv && (t = "nested-update"), typeof i == "function" && i(e, t, r, n);
		}
		function mc(e) {
			var t = e.type, n = e.memoizedProps, r = e.stateNode;
			try {
				E(e, Yu, r, t, n, e);
			} catch (t) {
				N(e, e.return, t);
			}
		}
		function hc(e, t, n) {
			try {
				E(e, Zu, e.stateNode, e.type, n, t, e);
			} catch (t) {
				N(e, e.return, t);
			}
		}
		function gc(e) {
			return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && td(e.type) || e.tag === 4;
		}
		function _c(e) {
			a: for (;;) {
				for (; e.sibling === null;) {
					if (e.return === null || gc(e.return)) return null;
					e = e.return;
				}
				for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
					if (e.tag === 27 && td(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
					e.child.return = e, e = e.child;
				}
				if (!(e.flags & 2)) return e.stateNode;
			}
		}
		function vc(e, t, n) {
			var r = e.tag;
			if (r === 5 || r === 6) e = e.stateNode, t ? (ed(n), (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t)) : (ed(n), t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = un));
			else if (r !== 4 && (r === 27 && td(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (vc(e, t, n), e = e.sibling; e !== null;) vc(e, t, n), e = e.sibling;
		}
		function yc(e, t, n) {
			var r = e.tag;
			if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
			else if (r !== 4 && (r === 27 && td(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (yc(e, t, n), e = e.sibling; e !== null;) yc(e, t, n), e = e.sibling;
		}
		function bc(e) {
			for (var t, n = e.return; n !== null;) {
				if (gc(n)) {
					t = n;
					break;
				}
				n = n.return;
			}
			if (t == null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
			switch (t.tag) {
				case 27:
					t = t.stateNode, n = _c(e), yc(e, n, t);
					break;
				case 5:
					n = t.stateNode, t.flags & 32 && (Qu(n), t.flags &= -33), t = _c(e), yc(e, t, n);
					break;
				case 3:
				case 4:
					t = t.stateNode.containerInfo, n = _c(e), vc(e, n, t);
					break;
				default: throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
			}
		}
		function xc(e) {
			var t = e.stateNode, n = e.memoizedProps;
			try {
				E(e, Od, e.type, n, t, e);
			} catch (t) {
				N(e, e.return, t);
			}
		}
		function Sc(e, t) {
			return t.tag === 31 ? (t = t.memoizedState, e.memoizedState !== null && t === null) : t.tag === 13 ? (e = e.memoizedState, t = t.memoizedState, e !== null && e.dehydrated !== null && (t === null || t.dehydrated === null)) : t.tag === 3 && e.memoizedState.isDehydrated && (t.flags & 256) == 0;
		}
		function Cc(e, t) {
			if (e = e.containerInfo, KS = LC, e = Un(e), Wn(e)) {
				if ("selectionStart" in e) var n = {
					start: e.selectionStart,
					end: e.selectionEnd
				};
				else a: {
					n = (n = e.ownerDocument) && n.defaultView || window;
					var r = n.getSelection && n.getSelection();
					if (r && r.rangeCount !== 0) {
						n = r.anchorNode;
						var i = r.anchorOffset, a = r.focusNode;
						r = r.focusOffset;
						try {
							n.nodeType, a.nodeType;
						} catch {
							n = null;
							break a;
						}
						var o = 0, s = -1, c = -1, l = 0, u = 0, d = e, f = null;
						b: for (;;) {
							for (var p; d !== n || i !== 0 && d.nodeType !== 3 || (s = o + i), d !== a || r !== 0 && d.nodeType !== 3 || (c = o + r), d.nodeType === 3 && (o += d.nodeValue.length), (p = d.firstChild) !== null;) f = d, d = p;
							for (;;) {
								if (d === e) break b;
								if (f === n && ++l === i && (s = o), f === a && ++u === r && (c = o), (p = d.nextSibling) !== null) break;
								d = f, f = d.parentNode;
							}
							d = p;
						}
						n = s === -1 || c === -1 ? null : {
							start: s,
							end: c
						};
					} else n = null;
				}
				n ||= {
					start: 0,
					end: 0
				};
			} else n = null;
			for (qS = {
				focusedElem: e,
				selectionRange: n
			}, LC = !1, Sb = t; Sb !== null;) if (t = Sb, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, Sb = e;
			else for (; Sb !== null;) {
				switch (e = t = Sb, n = e.alternate, i = e.flags, e.tag) {
					case 0:
						if (i & 4 && (e = e.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) i = e[n], i.ref.impl = i.nextImpl;
						break;
					case 11:
					case 15: break;
					case 1:
						i & 1024 && n !== null && sc(e, n);
						break;
					case 3:
						if (i & 1024) {
							if (e = e.stateNode.containerInfo, n = e.nodeType, n === 9) fd(e);
							else if (n === 1) switch (e.nodeName) {
								case "HEAD":
								case "HTML":
								case "BODY":
									fd(e);
									break;
								default: e.textContent = "";
							}
						}
						break;
					case 5:
					case 26:
					case 27:
					case 6:
					case 4:
					case 17: break;
					default: if (i & 1024) throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
				}
				if (e = t.sibling, e !== null) {
					e.return = t.return, Sb = e;
					break;
				}
				Sb = t.return;
			}
		}
		function wc(e, t, n) {
			var r = yi(), i = xi(), a = Ci(), o = wi(), s = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Ic(e, n), s & 4 && $s(n, _y | hy);
					break;
				case 1:
					if (Ic(e, n), s & 4) if (e = n.stateNode, t === null) n.type.defaultProps || "ref" in n.memoizedProps || fb || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", C(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", C(n) || "instance")), Qs(n) ? (Ai(), E(n, Tv, n, e), Oi()) : E(n, Tv, n, e);
					else {
						var c = is(n.type, t.memoizedProps);
						t = t.memoizedState, n.type.defaultProps || "ref" in n.memoizedProps || fb || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", C(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", C(n) || "instance")), Qs(n) ? (Ai(), E(n, Dv, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate), Oi()) : E(n, Dv, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate);
					}
					s & 64 && ac(n), s & 512 && uc(n, n.return);
					break;
				case 3:
					if (t = hi(), Ic(e, n), s & 64 && (s = n.updateQueue, s !== null)) {
						if (c = null, n.child !== null) switch (n.child.tag) {
							case 27:
							case 5:
								c = n.child.stateNode;
								break;
							case 1: c = n.child.stateNode;
						}
						try {
							E(n, da, s, c);
						} catch (e) {
							N(n, n.return, e);
						}
					}
					e.effectDuration += gi(t);
					break;
				case 27: t === null && s & 4 && xc(n);
				case 26:
				case 5:
					if (Ic(e, n), t === null) {
						if (s & 4) mc(n);
						else if (s & 64) {
							e = n.type, t = n.memoizedProps, c = n.stateNode;
							try {
								E(n, Xu, c, e, t, n);
							} catch (e) {
								N(n, n.return, e);
							}
						}
					}
					s & 512 && uc(n, n.return);
					break;
				case 12:
					if (s & 4) {
						s = hi(), Ic(e, n), e = n.stateNode, e.effectDuration += _i(s);
						try {
							E(n, fc, n, t, x_, e.effectDuration);
						} catch (e) {
							N(n, n.return, e);
						}
					} else Ic(e, n);
					break;
				case 31:
					Ic(e, n), s & 4 && Oc(e, n);
					break;
				case 13:
					Ic(e, n), s & 4 && kc(e, n), s & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (s = Ul.bind(null, n), vd(e, s))));
					break;
				case 22:
					if (s = n.memoizedState !== null || vb, !s) {
						t = t !== null && t.memoizedState !== null || yb, c = vb;
						var l = yb;
						vb = s, (yb = t) && !l ? (Bc(e, n, (n.subtreeFlags & 8772) != 0), (n.mode & W) !== U && 0 <= K && 0 <= q && .05 < q - K && tr(n, K, q)) : Ic(e, n), vb = c, yb = l;
					}
					break;
				case 30: break;
				default: Ic(e, n);
			}
			(n.mode & W) !== U && 0 <= K && 0 <= q && ((O_ || .05 < E_) && ir(n, K, q, E_, D_), n.alternate === null && n.return !== null && n.return.alternate !== null && .05 < q - K && (Sc(n.return.alternate, n.return) || er(n, K, q, "Mount"))), bi(r), Si(i), D_ = a, O_ = o;
		}
		function Tc(e) {
			var t = e.alternate;
			t !== null && (e.alternate = null, Tc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Qe(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
		}
		function Ec(e, t, n) {
			for (n = n.child; n !== null;) Dc(e, t, n), n = n.sibling;
		}
		function Dc(e, t, n) {
			if (Np && typeof Np.onCommitFiberUnmount == "function") try {
				Np.onCommitFiberUnmount(Mp, n);
			} catch (e) {
				Pp || (Pp = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			var r = yi(), i = xi(), a = Ci(), o = wi();
			switch (n.tag) {
				case 26:
					yb || dc(n, t), Ec(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (e = n.stateNode, e.parentNode.removeChild(e));
					break;
				case 27:
					yb || dc(n, t);
					var s = Tb, c = Eb;
					td(n.type) && (Tb = n.stateNode, Eb = !1), Ec(e, t, n), E(n, kd, n.stateNode), Tb = s, Eb = c;
					break;
				case 5: yb || dc(n, t);
				case 6:
					if (s = Tb, c = Eb, Tb = null, Ec(e, t, n), Tb = s, Eb = c, Tb !== null) if (Eb) try {
						E(n, rd, Tb, n.stateNode);
					} catch (e) {
						N(n, t, e);
					}
					else try {
						E(n, nd, Tb, n.stateNode);
					} catch (e) {
						N(n, t, e);
					}
					break;
				case 18:
					Tb !== null && (Eb ? (e = Tb, id(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Cf(e)) : id(Tb, n.stateNode));
					break;
				case 4:
					s = Tb, c = Eb, Tb = n.stateNode.containerInfo, Eb = !0, Ec(e, t, n), Tb = s, Eb = c;
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					nc(gy, n, t), yb || ec(n, t, _y), Ec(e, t, n);
					break;
				case 1:
					yb || (dc(n, t), s = n.stateNode, typeof s.componentWillUnmount == "function" && cc(n, t, s)), Ec(e, t, n);
					break;
				case 21:
					Ec(e, t, n);
					break;
				case 22:
					yb = (s = yb) || n.memoizedState !== null, Ec(e, t, n), yb = s;
					break;
				default: Ec(e, t, n);
			}
			(n.mode & W) !== U && 0 <= K && 0 <= q && (O_ || .05 < E_) && ir(n, K, q, E_, D_), bi(r), Si(i), D_ = a, O_ = o;
		}
		function Oc(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
				e = e.dehydrated;
				try {
					E(t, Td, e);
				} catch (e) {
					N(t, t.return, e);
				}
			}
		}
		function kc(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
				E(t, Ed, e);
			} catch (e) {
				N(t, t.return, e);
			}
		}
		function Ac(e) {
			switch (e.tag) {
				case 31:
				case 13:
				case 19:
					var t = e.stateNode;
					return t === null && (t = e.stateNode = new xb()), t;
				case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new xb()), t;
				default: throw Error("Unexpected Suspense handler tag (" + e.tag + "). This is a bug in React.");
			}
		}
		function jc(e, t) {
			var n = Ac(e);
			t.forEach(function(t) {
				if (!n.has(t)) {
					if (n.add(t), Fp) if (Cb !== null && wb !== null) Yl(wb, Cb);
					else throw Error("Expected finished root and lanes to be set. This is a bug in React.");
					var r = Wl.bind(null, e, t);
					t.then(r, r);
				}
			});
		}
		function Mc(e, t) {
			var n = t.deletions;
			if (n !== null) for (var r = 0; r < n.length; r++) {
				var i = e, a = t, o = n[r], s = yi(), c = a;
				a: for (; c !== null;) {
					switch (c.tag) {
						case 27:
							if (td(c.type)) {
								Tb = c.stateNode, Eb = !1;
								break a;
							}
							break;
						case 5:
							Tb = c.stateNode, Eb = !1;
							break a;
						case 3:
						case 4:
							Tb = c.stateNode.containerInfo, Eb = !0;
							break a;
					}
					c = c.return;
				}
				if (Tb === null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
				Dc(i, a, o), Tb = null, Eb = !1, (o.mode & W) !== U && 0 <= K && 0 <= q && .05 < q - K && er(o, K, q, "Unmount"), bi(s), i = o, a = i.alternate, a !== null && (a.return = null), i.return = null;
			}
			if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Nc(t, e), t = t.sibling;
		}
		function Nc(e, t) {
			var n = yi(), r = xi(), i = Ci(), a = wi(), o = e.alternate, s = e.flags;
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Mc(t, e), Pc(e), s & 4 && (nc(gy | hy, e, e.return), tc(gy | hy, e), ec(e, e.return, _y | hy));
					break;
				case 1:
					if (Mc(t, e), Pc(e), s & 512 && (yb || o === null || dc(o, o.return)), s & 64 && vb && (s = e.updateQueue, s !== null && (o = s.callbacks, o !== null))) {
						var c = s.shared.hiddenCallbacks;
						s.shared.hiddenCallbacks = c === null ? o : c.concat(o);
					}
					break;
				case 26:
					if (c = Db, Mc(t, e), Pc(e), s & 512 && (yb || o === null || dc(o, o.return)), s & 4) {
						var l = o === null ? null : o.memoizedState;
						if (s = e.memoizedState, o === null) if (s === null) if (e.stateNode === null) {
							a: {
								s = e.type, o = e.memoizedProps, c = c.ownerDocument || c;
								b: switch (s) {
									case "title":
										l = c.getElementsByTagName("title")[0], (!l || l[em] || l[qp] || l.namespaceURI === Lm || l.hasAttribute("itemprop")) && (l = c.createElement(s), c.head.insertBefore(l, c.querySelector("head > title"))), Du(l, s, o), l[qp] = e, rt(l), s = l;
										break a;
									case "link":
										var u = Ud("link", "href", c).get(s + (o.href || ""));
										if (u) {
											for (var d = 0; d < u.length; d++) if (l = u[d], l.getAttribute("href") === (o.href == null || o.href === "" ? null : o.href) && l.getAttribute("rel") === (o.rel == null ? null : o.rel) && l.getAttribute("title") === (o.title == null ? null : o.title) && l.getAttribute("crossorigin") === (o.crossOrigin == null ? null : o.crossOrigin)) {
												u.splice(d, 1);
												break b;
											}
										}
										l = c.createElement(s), Du(l, s, o), c.head.appendChild(l);
										break;
									case "meta":
										if (u = Ud("meta", "content", c).get(s + (o.content || ""))) {
											for (d = 0; d < u.length; d++) if (l = u[d], ke(o.content, "content"), l.getAttribute("content") === (o.content == null ? null : "" + o.content) && l.getAttribute("name") === (o.name == null ? null : o.name) && l.getAttribute("property") === (o.property == null ? null : o.property) && l.getAttribute("http-equiv") === (o.httpEquiv == null ? null : o.httpEquiv) && l.getAttribute("charset") === (o.charSet == null ? null : o.charSet)) {
												u.splice(d, 1);
												break b;
											}
										}
										l = c.createElement(s), Du(l, s, o), c.head.appendChild(l);
										break;
									default: throw Error("getNodesForType encountered a type it did not expect: \"" + s + "\". This is a bug in React.");
								}
								l[qp] = e, rt(l), s = l;
							}
							e.stateNode = s;
						} else Wd(c, e.type, e.stateNode);
						else e.stateNode = zd(c, s, e.memoizedProps);
						else l === s ? s === null && e.stateNode !== null && hc(e, e.memoizedProps, o.memoizedProps) : (l === null ? o.stateNode !== null && (o = o.stateNode, o.parentNode.removeChild(o)) : l.count--, s === null ? Wd(c, e.type, e.stateNode) : zd(c, s, e.memoizedProps));
					}
					break;
				case 27:
					Mc(t, e), Pc(e), s & 512 && (yb || o === null || dc(o, o.return)), o !== null && s & 4 && hc(e, e.memoizedProps, o.memoizedProps);
					break;
				case 5:
					if (Mc(t, e), Pc(e), s & 512 && (yb || o === null || dc(o, o.return)), e.flags & 32) {
						c = e.stateNode;
						try {
							E(e, Qu, c);
						} catch (t) {
							N(e, e.return, t);
						}
					}
					s & 4 && e.stateNode != null && (c = e.memoizedProps, hc(e, c, o === null ? c : o.memoizedProps)), s & 1024 && (bb = !0, e.type !== "form" && console.error("Unexpected host component type. Expected a form. This is a bug in React."));
					break;
				case 6:
					if (Mc(t, e), Pc(e), s & 4) {
						if (e.stateNode === null) throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
						s = e.memoizedProps, o = o === null ? s : o.memoizedProps, c = e.stateNode;
						try {
							E(e, $u, c, o, s);
						} catch (t) {
							N(e, e.return, t);
						}
					}
					break;
				case 3:
					if (c = hi(), fC = null, l = Db, Db = Ad(t.containerInfo), Mc(t, e), Db = l, Pc(e), s & 4 && o !== null && o.memoizedState.isDehydrated) try {
						E(e, wd, t.containerInfo);
					} catch (t) {
						N(e, e.return, t);
					}
					bb && (bb = !1, Fc(e)), t.effectDuration += gi(c);
					break;
				case 4:
					s = Db, Db = Ad(e.stateNode.containerInfo), Mc(t, e), Pc(e), Db = s;
					break;
				case 12:
					s = hi(), Mc(t, e), Pc(e), e.stateNode.effectDuration += _i(s);
					break;
				case 31:
					Mc(t, e), Pc(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, jc(e, s)));
					break;
				case 13:
					Mc(t, e), Pc(e), e.child.flags & 8192 && e.memoizedState !== null != (o !== null && o.memoizedState !== null) && (gx = Cp()), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, jc(e, s)));
					break;
				case 22:
					c = e.memoizedState !== null;
					var f = o !== null && o.memoizedState !== null, p = vb, m = yb;
					if (vb = p || c, yb = m || f, Mc(t, e), yb = m, vb = p, f && !c && !p && !m && (e.mode & W) !== U && 0 <= K && 0 <= q && .05 < q - K && tr(e, K, q), Pc(e), s & 8192) a: for (t = e.stateNode, t._visibility = c ? t._visibility & ~Ag : t._visibility | Ag, !c || o === null || f || vb || yb || (Rc(e), (e.mode & W) !== U && 0 <= K && 0 <= q && .05 < q - K && er(e, K, q, "Disconnect")), o = null, t = e;;) {
						if (t.tag === 5 || t.tag === 26) {
							if (o === null) {
								f = o = t;
								try {
									l = f.stateNode, c ? E(f, sd, l) : E(f, ud, f.stateNode, f.memoizedProps);
								} catch (e) {
									N(f, f.return, e);
								}
							}
						} else if (t.tag === 6) {
							if (o === null) {
								f = t;
								try {
									u = f.stateNode, c ? E(f, cd, u) : E(f, dd, u, f.memoizedProps);
								} catch (e) {
									N(f, f.return, e);
								}
							}
						} else if (t.tag === 18) {
							if (o === null) {
								f = t;
								try {
									d = f.stateNode, c ? E(f, od, d) : E(f, ld, f.stateNode);
								} catch (e) {
									N(f, f.return, e);
								}
							}
						} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
							t.child.return = t, t = t.child;
							continue;
						}
						if (t === e) break a;
						for (; t.sibling === null;) {
							if (t.return === null || t.return === e) break a;
							o === t && (o = null), t = t.return;
						}
						o === t && (o = null), t.sibling.return = t.return, t = t.sibling;
					}
					s & 4 && (s = e.updateQueue, s !== null && (o = s.retryQueue, o !== null && (s.retryQueue = null, jc(e, o))));
					break;
				case 19:
					Mc(t, e), Pc(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, jc(e, s)));
					break;
				case 30: break;
				case 21: break;
				default: Mc(t, e), Pc(e);
			}
			(e.mode & W) !== U && 0 <= K && 0 <= q && ((O_ || .05 < E_) && ir(e, K, q, E_, D_), e.alternate === null && e.return !== null && e.return.alternate !== null && .05 < q - K && (Sc(e.return.alternate, e.return) || er(e, K, q, "Mount"))), bi(n), Si(r), D_ = i, O_ = a;
		}
		function Pc(e) {
			var t = e.flags;
			if (t & 2) {
				try {
					E(e, bc, e);
				} catch (t) {
					N(e, e.return, t);
				}
				e.flags &= -3;
			}
			t & 4096 && (e.flags &= -4097);
		}
		function Fc(e) {
			if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
				var t = e;
				Fc(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
			}
		}
		function Ic(e, t) {
			if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) wc(e, t.alternate, t), t = t.sibling;
		}
		function Lc(e) {
			var t = yi(), n = xi(), r = Ci(), i = wi();
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					ec(e, e.return, _y), Rc(e);
					break;
				case 1:
					dc(e, e.return);
					var a = e.stateNode;
					typeof a.componentWillUnmount == "function" && cc(e, e.return, a), Rc(e);
					break;
				case 27: E(e, kd, e.stateNode);
				case 26:
				case 5:
					dc(e, e.return), Rc(e);
					break;
				case 22:
					e.memoizedState === null && Rc(e);
					break;
				case 30:
					Rc(e);
					break;
				default: Rc(e);
			}
			(e.mode & W) !== U && 0 <= K && 0 <= q && (O_ || .05 < E_) && ir(e, K, q, E_, D_), bi(t), Si(n), D_ = r, O_ = i;
		}
		function Rc(e) {
			for (e = e.child; e !== null;) Lc(e), e = e.sibling;
		}
		function zc(e, t, n, r) {
			var i = yi(), a = xi(), o = Ci(), s = wi(), c = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Bc(e, n, r), $s(n, _y);
					break;
				case 1:
					if (Bc(e, n, r), t = n.stateNode, typeof t.componentDidMount == "function" && E(n, Tv, n, t), t = n.updateQueue, t !== null) {
						e = n.stateNode;
						try {
							E(n, ua, t, e);
						} catch (e) {
							N(n, n.return, e);
						}
					}
					r && c & 64 && ac(n), uc(n, n.return);
					break;
				case 27: xc(n);
				case 26:
				case 5:
					Bc(e, n, r), r && t === null && c & 4 && mc(n), uc(n, n.return);
					break;
				case 12:
					if (r && c & 4) {
						c = hi(), Bc(e, n, r), r = n.stateNode, r.effectDuration += _i(c);
						try {
							E(n, fc, n, t, x_, r.effectDuration);
						} catch (e) {
							N(n, n.return, e);
						}
					} else Bc(e, n, r);
					break;
				case 31:
					Bc(e, n, r), r && c & 4 && Oc(e, n);
					break;
				case 13:
					Bc(e, n, r), r && c & 4 && kc(e, n);
					break;
				case 22:
					n.memoizedState === null && Bc(e, n, r), uc(n, n.return);
					break;
				case 30: break;
				default: Bc(e, n, r);
			}
			(n.mode & W) !== U && 0 <= K && 0 <= q && (O_ || .05 < E_) && ir(n, K, q, E_, D_), bi(i), Si(a), D_ = o, O_ = s;
		}
		function Bc(e, t, n) {
			for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) zc(e, t.alternate, t, n), t = t.sibling;
		}
		function Vc(e, t) {
			var n = null;
			e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && di(e), n != null && fi(n));
		}
		function Hc(e, t) {
			e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (di(t), e != null && fi(e));
		}
		function Uc(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (t = t.child; t !== null;) {
				var a = t.sibling;
				Wc(e, t, n, r, a === null ? i : a.actualStartTime), t = a;
			}
		}
		function Wc(e, t, n, r, i) {
			var a = yi(), o = xi(), s = Ci(), c = wi(), l = wg, u = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(t.mode & W) !== U && 0 < t.actualStartTime && t.flags & 1 && nr(t, t.actualStartTime, i, Ob, n), Uc(e, t, n, r, i), u & 2048 && rc(t, vy | hy);
					break;
				case 1:
					(t.mode & W) !== U && 0 < t.actualStartTime && (t.flags & 128 ? rr(t, t.actualStartTime, i, []) : t.flags & 1 && nr(t, t.actualStartTime, i, Ob, n)), Uc(e, t, n, r, i);
					break;
				case 3:
					var d = hi(), f = Ob;
					Ob = t.alternate !== null && t.alternate.memoizedState.isDehydrated && (t.flags & 256) == 0, Uc(e, t, n, r, i), Ob = f, u & 2048 && (n = null, t.alternate !== null && (n = t.alternate.memoizedState.cache), r = t.memoizedState.cache, r !== n && (di(r), n != null && fi(n))), e.passiveEffectDuration += gi(d);
					break;
				case 12:
					if (u & 2048) {
						u = hi(), Uc(e, t, n, r, i), e = t.stateNode, e.passiveEffectDuration += _i(u);
						try {
							E(t, pc, t, t.alternate, x_, e.passiveEffectDuration);
						} catch (e) {
							N(t, t.return, e);
						}
					} else Uc(e, t, n, r, i);
					break;
				case 31:
					u = Ob, d = t.alternate === null ? null : t.alternate.memoizedState, f = t.memoizedState, d !== null && f === null ? (f = t.deletions, f !== null && 0 < f.length && f[0].tag === 18 ? (Ob = !1, d = d.hydrationErrors, d !== null && rr(t, t.actualStartTime, i, d)) : Ob = !0) : Ob = !1, Uc(e, t, n, r, i), Ob = u;
					break;
				case 13:
					u = Ob, d = t.alternate === null ? null : t.alternate.memoizedState, f = t.memoizedState, d === null || d.dehydrated === null || f !== null && f.dehydrated !== null ? Ob = !1 : (f = t.deletions, f !== null && 0 < f.length && f[0].tag === 18 ? (Ob = !1, d = d.hydrationErrors, d !== null && rr(t, t.actualStartTime, i, d)) : Ob = !0), Uc(e, t, n, r, i), Ob = u;
					break;
				case 23: break;
				case 22:
					f = t.stateNode, d = t.alternate, t.memoizedState === null ? f._visibility & jg ? Uc(e, t, n, r, i) : (f._visibility |= jg, Gc(e, t, n, r, (t.subtreeFlags & 10256) != 0 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), i), (t.mode & W) === U || Ob || (e = t.actualStartTime, 0 <= e && .05 < i - e && tr(t, e, i), 0 <= K && 0 <= q && .05 < q - K && tr(t, K, q))) : f._visibility & jg ? Uc(e, t, n, r, i) : qc(e, t, n, r, i), u & 2048 && Vc(d, t);
					break;
				case 24:
					Uc(e, t, n, r, i), u & 2048 && Hc(t.alternate, t);
					break;
				default: Uc(e, t, n, r, i);
			}
			(t.mode & W) !== U && ((e = !Ob && t.alternate === null && t.return !== null && t.return.alternate !== null) && (n = t.actualStartTime, 0 <= n && .05 < i - n && er(t, n, i, "Mount")), 0 <= K && 0 <= q && ((O_ || .05 < E_) && ir(t, K, q, E_, D_), e && .05 < q - K && er(t, K, q, "Mount"))), bi(a), Si(o), D_ = s, O_ = c, wg = l;
		}
		function Gc(e, t, n, r, i, a) {
			for (i &&= (t.subtreeFlags & 10256) != 0 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), t = t.child; t !== null;) {
				var o = t.sibling;
				Kc(e, t, n, r, i, o === null ? a : o.actualStartTime), t = o;
			}
		}
		function Kc(e, t, n, r, i, a) {
			var o = yi(), s = xi(), c = Ci(), l = wi(), u = wg;
			i && (t.mode & W) !== U && 0 < t.actualStartTime && t.flags & 1 && nr(t, t.actualStartTime, a, Ob, n);
			var d = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					Gc(e, t, n, r, i, a), rc(t, vy);
					break;
				case 23: break;
				case 22:
					var f = t.stateNode;
					t.memoizedState === null ? (f._visibility |= jg, Gc(e, t, n, r, i, a)) : f._visibility & jg ? Gc(e, t, n, r, i, a) : qc(e, t, n, r, a), i && d & 2048 && Vc(t.alternate, t);
					break;
				case 24:
					Gc(e, t, n, r, i, a), i && d & 2048 && Hc(t.alternate, t);
					break;
				default: Gc(e, t, n, r, i, a);
			}
			(t.mode & W) !== U && 0 <= K && 0 <= q && (O_ || .05 < E_) && ir(t, K, q, E_, D_), bi(o), Si(s), D_ = c, O_ = l, wg = u;
		}
		function qc(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (var a = t.child; a !== null;) {
				t = a.sibling;
				var o = e, s = n, c = r, l = t === null ? i : t.actualStartTime, u = wg;
				(a.mode & W) !== U && 0 < a.actualStartTime && a.flags & 1 && nr(a, a.actualStartTime, l, Ob, s);
				var d = a.flags;
				switch (a.tag) {
					case 22:
						qc(o, a, s, c, l), d & 2048 && Vc(a.alternate, a);
						break;
					case 24:
						qc(o, a, s, c, l), d & 2048 && Hc(a.alternate, a);
						break;
					default: qc(o, a, s, c, l);
				}
				wg = u, a = t;
			}
		}
		function Jc(e, t, n) {
			if (e.subtreeFlags & kb) for (e = e.child; e !== null;) Yc(e, t, n), e = e.sibling;
		}
		function Yc(e, t, n) {
			switch (e.tag) {
				case 26:
					Jc(e, t, n), e.flags & kb && e.memoizedState !== null && qd(n, Db, e.memoizedState, e.memoizedProps);
					break;
				case 5:
					Jc(e, t, n);
					break;
				case 3:
				case 4:
					var r = Db;
					Db = Ad(e.stateNode.containerInfo), Jc(e, t, n), Db = r;
					break;
				case 22:
					e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = kb, kb = 16777216, Jc(e, t, n), kb = r) : Jc(e, t, n));
					break;
				default: Jc(e, t, n);
			}
		}
		function Xc(e) {
			var t = e.alternate;
			if (t !== null && (e = t.child, e !== null)) {
				t.child = null;
				do
					t = e.sibling, e.sibling = null, e = t;
				while (e !== null);
			}
		}
		function Zc(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = yi();
					Sb = r, tl(r, e), (r.mode & W) !== U && 0 <= K && 0 <= q && .05 < q - K && er(r, K, q, "Unmount"), bi(i);
				}
				Xc(e);
			}
			if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Qc(e), e = e.sibling;
		}
		function Qc(e) {
			var t = yi(), n = xi(), r = Ci(), i = wi();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					Zc(e), e.flags & 2048 && ic(e, e.return, vy | hy);
					break;
				case 3:
					var a = hi();
					Zc(e), e.stateNode.passiveEffectDuration += gi(a);
					break;
				case 12:
					a = hi(), Zc(e), e.stateNode.passiveEffectDuration += _i(a);
					break;
				case 22:
					a = e.stateNode, e.memoizedState !== null && a._visibility & jg && (e.return === null || e.return.tag !== 13) ? (a._visibility &= ~jg, $c(e), (e.mode & W) !== U && 0 <= K && 0 <= q && .05 < q - K && er(e, K, q, "Disconnect")) : Zc(e);
					break;
				default: Zc(e);
			}
			(e.mode & W) !== U && 0 <= K && 0 <= q && (O_ || .05 < E_) && ir(e, K, q, E_, D_), bi(t), Si(n), O_ = i, D_ = r;
		}
		function $c(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = yi();
					Sb = r, tl(r, e), (r.mode & W) !== U && 0 <= K && 0 <= q && .05 < q - K && er(r, K, q, "Unmount"), bi(i);
				}
				Xc(e);
			}
			for (e = e.child; e !== null;) el(e), e = e.sibling;
		}
		function el(e) {
			var t = yi(), n = xi(), r = Ci(), i = wi();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					ic(e, e.return, vy), $c(e);
					break;
				case 22:
					var a = e.stateNode;
					a._visibility & jg && (a._visibility &= ~jg, $c(e));
					break;
				default: $c(e);
			}
			(e.mode & W) !== U && 0 <= K && 0 <= q && (O_ || .05 < E_) && ir(e, K, q, E_, D_), bi(t), Si(n), O_ = i, D_ = r;
		}
		function tl(e, t) {
			for (; Sb !== null;) {
				var n = Sb, r = n, i = t, a = yi(), o = xi(), s = Ci(), c = wi();
				switch (r.tag) {
					case 0:
					case 11:
					case 15:
						ic(r, i, vy);
						break;
					case 23:
					case 22:
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (i = r.memoizedState.cachePool.pool, i != null && di(i));
						break;
					case 24: fi(r.memoizedState.cache);
				}
				if ((r.mode & W) !== U && 0 <= K && 0 <= q && (O_ || .05 < E_) && ir(r, K, q, E_, D_), bi(a), Si(o), O_ = c, D_ = s, r = n.child, r !== null) r.return = n, Sb = r;
				else a: for (n = e; Sb !== null;) {
					if (r = Sb, a = r.sibling, o = r.return, Tc(r), r === n) {
						Sb = null;
						break a;
					}
					if (a !== null) {
						a.return = o, Sb = a;
						break a;
					}
					Sb = o;
				}
			}
		}
		function nl() {
			Mb.forEach(function(e) {
				return e();
			});
		}
		function rl() {
			var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
			return e || B.actQueue === null || console.error("The current testing environment is not configured to support act(...)"), e;
		}
		function il(e) {
			if ((Z & Fb) !== Pb && $ !== 0) return $ & -$;
			var t = B.T;
			return t === null ? Xe() : (t._updatedFibers ||= /* @__PURE__ */ new Set(), t._updatedFibers.add(e), iu());
		}
		function al() {
			if (dx === 0) if (!($ & 536870912) || G) {
				var e = Bp;
				Bp <<= 1, !(Bp & 3932160) && (Bp = 262144), dx = e;
			} else dx = 536870912;
			return e = ly.current, e !== null && (e.flags |= 32), dx;
		}
		function ol(e, t, n) {
			if ($x && console.error("useInsertionEffect must not schedule updates."), Jx && (Yx = !0), (e === Wb && (tx === qb || tx === ex) || e.cancelPendingCommit !== null) && (ml(e, 0), ul(e, $, dx, !1)), Ve(e, n), (Z & Fb) !== Pb && e === Wb) {
				if (_p) switch (t.tag) {
					case 0:
					case 11:
					case 15:
						e = Q && C(Q) || "Unknown", nS.has(e) || (nS.add(e), t = C(t) || "Unknown", console.error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render", t, e, e));
						break;
					case 1: tS ||= (console.error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), !0);
				}
			} else Fp && qe(e, t, n), Zl(t), e === Wb && ((Z & Fb) === Pb && (lx |= n), sx === Vb && ul(e, $, dx, !1)), P(e);
		}
		function sl(e, t, n) {
			if ((Z & (Fb | Ib)) !== Pb) throw Error("Should not already be working.");
			if ($ !== 0 && Q !== null) {
				var r = Q, i = Cp();
				switch (ev) {
					case Jb:
					case qb:
						var a = tv;
						Sg && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Suspended", a, i, Cg, void 0, "primary-light")) : console.timeStamp("Suspended", a, i, Cg, void 0, "primary-light"));
						break;
					case ex:
						a = tv, Sg && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Action", a, i, Cg, void 0, "primary-light")) : console.timeStamp("Action", a, i, Cg, void 0, "primary-light"));
						break;
					default: Sg && (r = i - tv, 3 > r || console.timeStamp("Blocked", tv, i, Cg, void 0, 5 > r ? "primary-light" : 10 > r ? "primary" : 100 > r ? "primary-dark" : "error"));
				}
			}
			a = (n = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Le(e, t)) ? Cl(e, t) : xl(e, t, !0);
			var o = n;
			do {
				if (a === Lb) {
					ix && !n && ul(e, t, 0, !1), t = tx, tv = g_(), ev = t;
					break;
				} else {
					if (r = Cp(), i = e.current.alternate, o && !ll(i)) {
						$n(t), i = b_, a = r, !Sg || a <= i || (Sx ? Sx.run(console.timeStamp.bind(console, "Teared Render", i, a, H, V, "error")) : console.timeStamp("Teared Render", i, a, H, V, "error")), pl(t, r), a = xl(e, t, !1), o = !1;
						continue;
					}
					if (a === zb) {
						if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
						else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
						if (s !== 0) {
							$n(t), lr(b_, r, t, Sx), pl(t, r), t = s;
							a: {
								r = e, a = o, o = px;
								var c = r.current.memoizedState.isDehydrated;
								if (c && (ml(r, s).flags |= 256), s = xl(r, s, !1), s !== zb) {
									if (ax && !c) {
										r.errorRecoveryDisabledLanes |= a, lx |= a, a = Vb;
										break a;
									}
									r = mx, mx = o, r !== null && (mx === null ? mx = r : mx.push.apply(mx, r));
								}
								a = s;
							}
							if (o = !1, a !== zb) continue;
							r = Cp();
						}
					}
					if (a === Rb) {
						$n(t), lr(b_, r, t, Sx), pl(t, r), ml(e, 0), ul(e, t, 0, !0);
						break;
					}
					a: {
						switch (n = e, a) {
							case Lb:
							case Rb: throw Error("Root did not complete. This is a bug in React.");
							case Vb: if ((t & 4194048) !== t) break;
							case Hb:
								$n(t), or(b_, r, t, Sx), pl(t, r), i = t, i & 127 ? R_ = r : i & 4194048 && (Y_ = r), ul(n, t, dx, !rx);
								break a;
							case zb:
								mx = null;
								break;
							case Bb:
							case Ub: break;
							default: throw Error("Unknown root exit status.");
						}
						if (B.actQueue !== null) jl(n, i, t, mx, xx, hx, dx, lx, fx, a, null, null, b_, r);
						else {
							if ((t & 62914560) === t && (o = gx + vx - Cp(), 10 < o)) {
								if (ul(n, t, dx, !rx), Ie(n, 0, !0) !== 0) break a;
								Lx = t, n.timeoutHandle = ZS(cl.bind(null, n, i, mx, xx, hx, t, dx, lx, fx, rx, a, "Throttled", b_, r), o);
								break a;
							}
							cl(n, i, mx, xx, hx, t, dx, lx, fx, rx, a, null, b_, r);
						}
					}
				}
				break;
			} while (1);
			P(e);
		}
		function cl(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
			e.timeoutHandle = $S;
			var m = t.subtreeFlags, h = null;
			if ((m & 8192 || (m & 16785408) == 16785408) && (h = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: un
			}, Yc(t, a, h), m = (a & 62914560) === a ? gx - Cp() : (a & 4194048) === a ? _x - Cp() : 0, m = Jd(h, m), m !== null)) {
				Lx = a, e.cancelPendingCommit = m(jl.bind(null, e, t, a, n, r, i, o, s, c, u, h, h.waitingForViewTransition ? "Waiting for the previous Animation" : 0 < h.count ? 0 < h.imgCount ? "Suspended on CSS and Images" : "Suspended on CSS" : h.imgCount === 1 ? "Suspended on an Image" : 0 < h.imgCount ? "Suspended on Images" : null, f, p)), ul(e, a, o, !l);
				return;
			}
			jl(e, t, a, n, r, i, o, s, c, u, h, d, f, p);
		}
		function ll(e) {
			for (var t = e;;) {
				var n = t.tag;
				if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
					var i = n[r], a = i.getSnapshot;
					i = i.value;
					try {
						if (!Gh(a(), i)) return !1;
					} catch {
						return !1;
					}
				}
				if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
				else {
					if (t === e) break;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) return !0;
						t = t.return;
					}
					t.sibling.return = t.return, t = t.sibling;
				}
			}
			return !0;
		}
		function ul(e, t, n, r) {
			t &= ~ux, t &= ~lx, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
			for (var i = t; 0 < i;) {
				var a = 31 - Ip(i), o = 1 << a;
				r[a] = -1, i &= ~o;
			}
			n !== 0 && Ue(e, n, t);
		}
		function dl() {
			return (Z & (Fb | Ib)) === Pb ? (F(0, !1), !1) : !0;
		}
		function fl() {
			if (Q !== null) {
				if (tx === Gb) var e = Q.return;
				else e = Q, $r(), ja(e), Wv = null, Gv = 0, e = Q;
				for (; e !== null;) Zs(e.alternate, e), e = e.return;
				Q = null;
			}
		}
		function pl(e, t) {
			e & 127 && (k_ = t), e & 4194048 && (z_ = t), e & 62914560 && (X_ = t), e & 2080374784 && (Z_ = t);
		}
		function ml(e, t) {
			Sg && (console.timeStamp("Blocking Track", .003, .003, "Blocking", V, "primary-light"), console.timeStamp("Transition Track", .003, .003, "Transition", V, "primary-light"), console.timeStamp("Suspense Track", .003, .003, "Suspense", V, "primary-light"), console.timeStamp("Idle Track", .003, .003, "Idle", V, "primary-light"));
			var n = b_;
			if (b_ = g_(), $ !== 0 && 0 < n) {
				if ($n($), sx === Bb || sx === Vb) or(n, b_, t, Sx);
				else {
					var r = b_, i = Sx;
					if (Sg && !(r <= n)) {
						var a = (t & 738197653) === t ? "tertiary-dark" : "primary-dark", o = (t & 536870912) === t ? "Prewarm" : (t & 201326741) === t ? "Interrupted Hydration" : "Interrupted Render";
						i ? i.run(console.timeStamp.bind(console, o, n, r, H, V, a)) : console.timeStamp(o, n, r, H, V, a);
					}
				}
				pl($, b_);
			}
			if (n = Sx, Sx = null, t & 127) {
				Sx = j_, i = 0 <= A_ && A_ < k_ ? k_ : A_, r = 0 <= F_ && F_ < k_ ? k_ : F_, a = 0 <= r ? r : 0 <= i ? i : b_, 0 <= R_ ? ($n(2), sr(R_, a, t, n)) : Q_ & 127 && ($n(2), fr(k_, a, $_)), n = i;
				var s = r, c = I_, l = 0 < L_, u = M_ === v_, d = M_ === y_;
				if (i = b_, r = j_, a = N_, o = P_, Sg) {
					if (H = "Blocking", 0 < n ? n > i && (n = i) : n = i, 0 < s ? s > n && (s = n) : s = n, c !== null && n > s) {
						var f = l ? "secondary-light" : "warning";
						r ? r.run(console.timeStamp.bind(console, l ? "Consecutive" : "Event: " + c, s, n, H, V, f)) : console.timeStamp(l ? "Consecutive" : "Event: " + c, s, n, H, V, f);
					}
					i > n && (s = u ? "error" : (t & 738197653) === t ? "tertiary-light" : "primary-light", u = d ? "Promise Resolved" : u ? "Cascading Update" : 5 < i - n ? "Update Blocked" : "Update", d = [], o != null && d.push(["Component name", o]), a != null && d.push(["Method name", a]), n = {
						start: n,
						end: i,
						detail: { devtools: {
							properties: d,
							track: H,
							trackGroup: V,
							color: s
						} }
					}, r ? r.run(performance.measure.bind(performance, u, n)) : performance.measure(u, n));
				}
				A_ = -1.1, M_ = 0, P_ = N_ = null, R_ = -1.1, L_ = F_, F_ = -1.1, k_ = g_();
			}
			if (t & 4194048 && (Sx = U_, i = 0 <= B_ && B_ < z_ ? z_ : B_, n = 0 <= V_ && V_ < z_ ? z_ : V_, r = 0 <= K_ && K_ < z_ ? z_ : K_, a = 0 <= r ? r : 0 <= n ? n : b_, 0 <= Y_ ? ($n(256), sr(Y_, a, t, Sx)) : Q_ & 4194048 && ($n(256), fr(z_, a, $_)), d = r, s = q_, c = 0 < J_, l = H_ === y_, a = b_, r = U_, o = W_, u = G_, Sg && (H = "Transition", 0 < n ? n > a && (n = a) : n = a, 0 < i ? i > n && (i = n) : i = n, 0 < d ? d > i && (d = i) : d = i, i > d && s !== null && (f = c ? "secondary-light" : "warning", r ? r.run(console.timeStamp.bind(console, c ? "Consecutive" : "Event: " + s, d, i, H, V, f)) : console.timeStamp(c ? "Consecutive" : "Event: " + s, d, i, H, V, f)), n > i && (r ? r.run(console.timeStamp.bind(console, "Action", i, n, H, V, "primary-dark")) : console.timeStamp("Action", i, n, H, V, "primary-dark")), a > n && (i = l ? "Promise Resolved" : 5 < a - n ? "Update Blocked" : "Update", d = [], u != null && d.push(["Component name", u]), o != null && d.push(["Method name", o]), n = {
				start: n,
				end: a,
				detail: { devtools: {
					properties: d,
					track: H,
					trackGroup: V,
					color: "primary-light"
				} }
			}, r ? r.run(performance.measure.bind(performance, i, n)) : performance.measure(i, n))), V_ = B_ = -1.1, H_ = 0, Y_ = -1.1, J_ = K_, K_ = -1.1, z_ = g_()), t & 62914560 && Q_ & 62914560 && ($n(4194304), fr(X_, b_, $_)), t & 2080374784 && Q_ & 2080374784 && ($n(268435456), fr(Z_, b_, $_)), n = e.timeoutHandle, n !== $S && (e.timeoutHandle = $S, QS(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Lx = 0, fl(), Wb = e, Q = n = Er(e.current, null), $ = t, tx = Gb, nx = null, rx = !1, ix = Le(e, t), ax = !1, sx = Lb, fx = dx = ux = lx = cx = 0, mx = px = null, hx = !1, t & 8 && (t |= t & 32), r = e.entangledLanes, r !== 0) for (e = e.entanglements, r &= t; 0 < r;) i = 31 - Ip(r), a = 1 << i, t |= e[i], r &= ~a;
			return ox = t, pr(), e = dg(), 1e3 < e - lg && (B.recentlyCreatedOwnerStacks = 0, lg = e), uv.discardPendingWarnings(), n;
		}
		function hl(e, t) {
			Y = null, B.H = Ry, B.getCurrentStack = null, _p = !1, gp = null, t === Rv || t === Bv ? (t = Hi(), tx = Jb) : t === zv ? (t = Hi(), tx = Yb) : tx = t === ob ? $b : typeof t == "object" && t && typeof t.then == "function" ? Zb : Kb, nx = t;
			var n = Q;
			n === null ? (sx = Rb, cs(e, Pr(t, e.current))) : n.mode & W && Ei(n);
		}
		function gl() {
			var e = ly.current;
			return e === null ? !0 : ($ & 4194048) === $ ? uy === null : ($ & 62914560) === $ || $ & 536870912 ? e === uy : !1;
		}
		function _l() {
			var e = B.H;
			return B.H = Ry, e === null ? Ry : e;
		}
		function vl() {
			var e = B.A;
			return B.A = Ab, e;
		}
		function yl(e) {
			Sx === null && (Sx = e._debugTask == null ? null : e._debugTask);
		}
		function bl() {
			sx = Vb, rx || ($ & 4194048) !== $ && ly.current !== null || (ix = !0), !(cx & 134217727) && !(lx & 134217727) || Wb === null || ul(Wb, $, dx, !1);
		}
		function xl(e, t, n) {
			var r = Z;
			Z |= Fb;
			var i = _l(), a = vl();
			if (Wb !== e || $ !== t) {
				if (Fp) {
					var o = e.memoizedUpdaters;
					0 < o.size && (Yl(e, $), o.clear()), Je(e, t);
				}
				xx = null, ml(e, t);
			}
			t = !1, o = sx;
			a: do
				try {
					if (tx !== Gb && Q !== null) {
						var s = Q, c = nx;
						switch (tx) {
							case $b:
								fl(), o = Hb;
								break a;
							case Jb:
							case qb:
							case ex:
							case Zb:
								ly.current === null && (t = !0);
								var l = tx;
								if (tx = Gb, nx = null, Ol(e, s, c, l), n && ix) {
									o = Lb;
									break a;
								}
								break;
							default: l = tx, tx = Gb, nx = null, Ol(e, s, c, l);
						}
					}
					Sl(), o = sx;
					break;
				} catch (t) {
					hl(e, t);
				}
			while (1);
			return t && e.shellSuspendCounter++, $r(), Z = r, B.H = i, B.A = a, Q === null && (Wb = null, $ = 0, pr()), o;
		}
		function Sl() {
			for (; Q !== null;) Tl(Q);
		}
		function Cl(e, t) {
			var n = Z;
			Z |= Fb;
			var r = _l(), i = vl();
			if (Wb !== e || $ !== t) {
				if (Fp) {
					var a = e.memoizedUpdaters;
					0 < a.size && (Yl(e, $), a.clear()), Je(e, t);
				}
				xx = null, yx = Cp() + bx, ml(e, t);
			} else ix = Le(e, t);
			a: do
				try {
					if (tx !== Gb && Q !== null) b: switch (t = Q, a = nx, tx) {
						case Kb:
							tx = Gb, nx = null, Ol(e, t, a, Kb);
							break;
						case qb:
						case ex:
							if (zi(a)) {
								tx = Gb, nx = null, El(t);
								break;
							}
							t = function() {
								tx !== qb && tx !== ex || Wb !== e || (tx = Qb), P(e);
							}, a.then(t, t);
							break a;
						case Jb:
							tx = Qb;
							break a;
						case Yb:
							tx = Xb;
							break a;
						case Qb:
							zi(a) ? (tx = Gb, nx = null, El(t)) : (tx = Gb, nx = null, Ol(e, t, a, Qb));
							break;
						case Xb:
							var o = null;
							switch (Q.tag) {
								case 26: o = Q.memoizedState;
								case 5:
								case 27:
									var s = Q;
									if (o ? Kd(o) : s.stateNode.complete) {
										tx = Gb, nx = null;
										var c = s.sibling;
										if (c !== null) Q = c;
										else {
											var l = s.return;
											l === null ? Q = null : (Q = l, kl(l));
										}
										break b;
									}
									break;
								default: console.error("Unexpected type of fiber triggered a suspensey commit. This is a bug in React.");
							}
							tx = Gb, nx = null, Ol(e, t, a, Xb);
							break;
						case Zb:
							tx = Gb, nx = null, Ol(e, t, a, Zb);
							break;
						case $b:
							fl(), sx = Hb;
							break a;
						default: throw Error("Unexpected SuspendedReason. This is a bug in React.");
					}
					B.actQueue === null ? wl() : Sl();
					break;
				} catch (t) {
					hl(e, t);
				}
			while (1);
			return $r(), B.H = r, B.A = i, Z = n, Q === null ? (Wb = null, $ = 0, pr(), sx) : Lb;
		}
		function wl() {
			for (; Q !== null && !xp();) Tl(Q);
		}
		function Tl(e) {
			var t = e.alternate;
			(e.mode & W) === U ? t = E(e, Hs, t, e, ox) : (Ti(e), t = E(e, Hs, t, e, ox), Ei(e)), e.memoizedProps = e.pendingProps, t === null ? kl(e) : Q = t;
		}
		function El(e) {
			var t = E(e, Dl, e);
			e.memoizedProps = e.pendingProps, t === null ? kl(e) : Q = t;
		}
		function Dl(e) {
			var t = e.alternate, n = (e.mode & W) !== U;
			switch (n && Ti(e), e.tag) {
				case 15:
				case 0:
					t = Es(t, e, e.pendingProps, e.type, void 0, $);
					break;
				case 11:
					t = Es(t, e, e.pendingProps, e.type.render, e.ref, $);
					break;
				case 5: ja(e);
				default: Zs(t, e), e = Q = Dr(e, ox), t = Hs(t, e, ox);
			}
			return n && Ei(e), t;
		}
		function Ol(e, t, n, r) {
			$r(), ja(t), Wv = null, Gv = 0;
			var i = t.return;
			try {
				if (ps(e, i, t, n, $)) {
					sx = Rb, cs(e, Pr(n, e.current)), Q = null;
					return;
				}
			} catch (t) {
				if (i !== null) throw Q = i, t;
				sx = Rb, cs(e, Pr(n, e.current)), Q = null;
				return;
			}
			t.flags & 32768 ? (G || r === Kb ? e = !0 : ix || $ & 536870912 ? e = !1 : (rx = e = !0, (r === qb || r === ex || r === Jb || r === Zb) && (r = ly.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Al(t, e)) : kl(t);
		}
		function kl(e) {
			var t = e;
			do {
				if (t.flags & 32768) {
					Al(t, rx);
					return;
				}
				var n = t.alternate;
				if (e = t.return, Ti(t), n = E(t, Ys, n, t, ox), (t.mode & W) !== U && Di(t), n !== null) {
					Q = n;
					return;
				}
				if (t = t.sibling, t !== null) {
					Q = t;
					return;
				}
				Q = t = e;
			} while (t !== null);
			sx === Lb && (sx = Ub);
		}
		function Al(e, t) {
			do {
				var n = Xs(e.alternate, e);
				if (n !== null) {
					n.flags &= 32767, Q = n;
					return;
				}
				if ((e.mode & W) !== U) {
					Di(e), n = e.actualDuration;
					for (var r = e.child; r !== null;) n += r.actualDuration, r = r.sibling;
					e.actualDuration = n;
				}
				if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
					Q = e;
					return;
				}
				Q = e = n;
			} while (e !== null);
			sx = Hb, Q = null;
		}
		function jl(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
			e.cancelPendingCommit = null;
			do
				Ll();
			while (Px !== Ox);
			if (uv.flushLegacyContextWarning(), uv.flushPendingUnsafeLifecycleWarnings(), (Z & (Fb | Ib)) !== Pb) throw Error("Should not already be working.");
			if ($n(n), l === zb ? lr(f, p, n, Sx) : r === null ? ar(f, p, n, Sx) : cr(f, p, n, r, t !== null && t.alternate !== null && t.alternate.memoizedState.isDehydrated && (t.flags & 256) != 0, Sx), t !== null) {
				if (n === 0 && console.error("finishedLanes should not be empty during a commit. This is a bug in React."), t === e.current) throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
				if (a = t.lanes | t.childLanes, a |= Pg, He(e, n, a, o, s, c), e === Wb && (Q = Wb = null, $ = 0), Ix = t, Fx = e, Lx = n, Rx = a, Bx = i, Vx = r, zx = p, Hx = d, Ux = wx, Wx = null, t.actualDuration !== 0 || t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Xl(Dp, function() {
					return XS = window.event, Ux === wx && (Ux = Ex), Rl(), null;
				})) : (e.callbackNode = null, e.callbackPriority = 0), C_ = null, x_ = g_(), d !== null && ur(p, x_, d, Sx), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
					r = B.T, B.T = null, i = Yf.p, Yf.p = Hp, o = Z, Z |= Ib;
					try {
						Cc(e, t, n);
					} finally {
						Z = o, Yf.p = i, B.T = r;
					}
				}
				Px = kx, Ml(), Nl(), Pl();
			}
		}
		function Ml() {
			if (Px === kx) {
				Px = Ox;
				var e = Fx, t = Ix, n = Lx, r = (t.flags & 13878) != 0;
				if (t.subtreeFlags & 13878 || r) {
					r = B.T, B.T = null;
					var i = Yf.p;
					Yf.p = Hp;
					var a = Z;
					Z |= Ib;
					try {
						Cb = n, wb = e, vi(), Nc(t, e), wb = Cb = null, n = qS;
						var o = Un(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
						if (o !== s && s && s.ownerDocument && Hn(s.ownerDocument.documentElement, s)) {
							if (c !== null && Wn(s)) {
								var l = c.start, u = c.end;
								if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
								else {
									var d = s.ownerDocument || document, f = d && d.defaultView || window;
									if (f.getSelection) {
										var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
										!p.extend && h > g && (o = g, g = h, h = o);
										var _ = Vn(s, h), v = Vn(s, g);
										if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
											var y = d.createRange();
											y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
										}
									}
								}
							}
							for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
								element: p,
								left: p.scrollLeft,
								top: p.scrollTop
							});
							for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
								var b = d[s];
								b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
							}
						}
						LC = !!KS, qS = KS = null;
					} finally {
						Z = a, Yf.p = i, B.T = r;
					}
				}
				e.current = t, Px = Ax;
			}
		}
		function Nl() {
			if (Px === Ax) {
				Px = Ox;
				var e = Wx;
				if (e !== null) {
					x_ = g_();
					var t = S_, n = x_;
					!Sg || n <= t || ($_ ? $_.run(console.timeStamp.bind(console, e, t, n, H, V, "secondary-light")) : console.timeStamp(e, t, n, H, V, "secondary-light"));
				}
				e = Fx, t = Ix, n = Lx;
				var r = (t.flags & 8772) != 0;
				if (t.subtreeFlags & 8772 || r) {
					r = B.T, B.T = null;
					var i = Yf.p;
					Yf.p = Hp;
					var a = Z;
					Z |= Ib;
					try {
						Cb = n, wb = e, vi(), wc(e, t.alternate, t), wb = Cb = null;
					} finally {
						Z = a, Yf.p = i, B.T = r;
					}
				}
				e = zx, t = Hx, S_ = g_(), e = t === null ? e : x_, t = S_, n = Ux === Tx, r = Sx, C_ === null ? !Sg || t <= e || (r ? r.run(console.timeStamp.bind(console, n ? "Commit Interrupted View Transition" : "Commit", e, t, H, V, n ? "error" : "secondary-dark")) : console.timeStamp(n ? "Commit Interrupted View Transition" : "Commit", e, t, H, V, n ? "error" : "secondary-dark")) : dr(e, t, C_, !1, r), Px = jx;
			}
		}
		function Pl() {
			if (Px === Mx || Px === jx) {
				if (Px === Mx) {
					var e = S_;
					S_ = g_();
					var t = S_, n = Ux === Tx;
					!Sg || t <= e || ($_ ? $_.run(console.timeStamp.bind(console, n ? "Interrupted View Transition" : "Starting Animation", e, t, H, V, n ? "error" : "secondary-light")) : console.timeStamp(n ? "Interrupted View Transition" : "Starting Animation", e, t, H, V, n ? " error" : "secondary-light")), Ux !== Tx && (Ux = Dx);
				}
				Px = Ox, Sp(), e = Fx;
				var r = Ix;
				t = Lx, n = Vx;
				var i = r.actualDuration !== 0 || (r.subtreeFlags & 10256) != 0 || (r.flags & 10256) != 0;
				i ? Px = Nx : (Px = Ox, Ix = Fx = null, Il(e, e.pendingLanes), Zx = 0, Qx = null);
				var a = e.pendingLanes;
				if (a === 0 && (Cx = null), i || ql(e), a = Ye(t), r = r.stateNode, Np && typeof Np.onCommitFiberRoot == "function") try {
					var o = (r.current.flags & 128) == 128;
					switch (a) {
						case Hp:
							var s = Tp;
							break;
						case Up:
							s = Ep;
							break;
						case Wp:
							s = Dp;
							break;
						case Gp:
							s = kp;
							break;
						default: s = Dp;
					}
					Np.onCommitFiberRoot(Mp, r, s, o);
				} catch (e) {
					Pp || (Pp = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				if (Fp && e.memoizedUpdaters.clear(), nl(), n !== null) {
					o = B.T, s = Yf.p, Yf.p = Hp, B.T = null;
					try {
						var c = e.onRecoverableError;
						for (r = 0; r < n.length; r++) {
							var l = n[r], u = Fl(l.stack);
							E(l.source, c, l.value, u);
						}
					} finally {
						B.T = o, Yf.p = s;
					}
				}
				Lx & 3 && Ll(), P(e), a = e.pendingLanes, t & 261930 && a & 42 ? (rv = !0, e === qx ? Kx++ : (Kx = 0, qx = e)) : Kx = 0, i || pl(t, S_), F(0, !1);
			}
		}
		function Fl(e) {
			return e = { componentStack: e }, Object.defineProperty(e, "digest", { get: function() {
				console.error("You are accessing \"digest\" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.");
			} }), e;
		}
		function Il(e, t) {
			(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, fi(t)));
		}
		function Ll() {
			return Ml(), Nl(), Pl(), Rl();
		}
		function Rl() {
			if (Px !== Nx) return !1;
			var e = Fx, t = Rx;
			Rx = 0;
			var n = Ye(Lx), r = Wp === 0 || Wp > n ? Wp : n;
			n = B.T;
			var i = Yf.p;
			try {
				Yf.p = r, B.T = null;
				var a = Bx;
				Bx = null, r = Fx;
				var o = Lx;
				if (Px = Ox, Ix = Fx = null, Lx = 0, (Z & (Fb | Ib)) !== Pb) throw Error("Cannot flush passive effects while already rendering.");
				$n(o), Jx = !0, Yx = !1;
				var s = 0;
				if (C_ = null, s = Cp(), Ux === Dx) fr(S_, s, $_);
				else {
					var c = S_, l = s, u = Ux === Ex;
					!Sg || l <= c || (Sx ? Sx.run(console.timeStamp.bind(console, u ? "Waiting for Paint" : "Waiting", c, l, H, V, "secondary-light")) : console.timeStamp(u ? "Waiting for Paint" : "Waiting", c, l, H, V, "secondary-light"));
				}
				c = Z, Z |= Ib;
				var d = r.current;
				vi(), Qc(d);
				var f = r.current;
				d = zx, vi(), Wc(r, f, o, a, d), ql(r), Z = c;
				var p = Cp();
				if (f = s, d = Sx, C_ === null ? !Sg || p <= f || (d ? d.run(console.timeStamp.bind(console, "Remaining Effects", f, p, H, V, "secondary-dark")) : console.timeStamp("Remaining Effects", f, p, H, V, "secondary-dark")) : dr(f, p, C_, !0, d), pl(o, p), F(0, !1), Yx ? r === Qx ? Zx++ : (Zx = 0, Qx = r) : Zx = 0, Yx = Jx = !1, Np && typeof Np.onPostCommitFiberRoot == "function") try {
					Np.onPostCommitFiberRoot(Mp, r);
				} catch (e) {
					Pp || (Pp = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				var m = r.current.stateNode;
				return m.effectDuration = 0, m.passiveEffectDuration = 0, !0;
			} finally {
				Yf.p = i, B.T = n, Il(e, t);
			}
		}
		function zl(e, t, n) {
			t = Pr(n, t), ki(t), t = us(e.stateNode, t, 2), e = ia(e, t, 2), e !== null && (Ve(e, 2), P(e));
		}
		function N(e, t, n) {
			if ($x = !1, e.tag === 3) zl(e, e, n);
			else {
				for (; t !== null;) {
					if (t.tag === 3) {
						zl(t, e, n);
						return;
					}
					if (t.tag === 1) {
						var r = t.stateNode;
						if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Cx === null || !Cx.has(r))) {
							e = Pr(n, e), ki(e), n = ds(2), r = ia(t, n, 2), r !== null && (fs(n, r, t, e), Ve(r, 2), P(r));
							return;
						}
					}
					t = t.return;
				}
				console.error("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s", n);
			}
		}
		function Bl(e, t, n) {
			var r = e.pingCache;
			if (r === null) {
				r = e.pingCache = new Nb();
				var i = /* @__PURE__ */ new Set();
				r.set(t, i);
			} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
			i.has(n) || (ax = !0, i.add(n), r = Vl.bind(null, e, t, n), Fp && Yl(e, n), t.then(r, r));
		}
		function Vl(e, t, n) {
			var r = e.pingCache;
			r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, n & 127 ? 0 > A_ && (k_ = A_ = g_(), j_ = __("Promise Resolved"), M_ = y_) : n & 4194048 && 0 > V_ && (z_ = V_ = g_(), U_ = __("Promise Resolved"), H_ = y_), rl() && B.actQueue === null && console.error("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act"), Wb === e && ($ & n) === n && (sx === Vb || sx === Bb && ($ & 62914560) === $ && Cp() - gx < vx ? (Z & Fb) === Pb && ml(e, 0) : ux |= n, fx === $ && (fx = 0)), P(e);
		}
		function Hl(e, t) {
			t === 0 && (t = ze()), e = gr(e, t), e !== null && (Ve(e, t), P(e));
		}
		function Ul(e) {
			var t = e.memoizedState, n = 0;
			t !== null && (n = t.retryLane), Hl(e, n);
		}
		function Wl(e, t) {
			var n = 0;
			switch (e.tag) {
				case 31:
				case 13:
					var r = e.stateNode, i = e.memoizedState;
					i !== null && (n = i.retryLane);
					break;
				case 19:
					r = e.stateNode;
					break;
				case 22:
					r = e.stateNode._retryCache;
					break;
				default: throw Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
			}
			r !== null && r.delete(t), Hl(e, n);
		}
		function Gl(e, t, n) {
			if (t.subtreeFlags & 67117056) for (t = t.child; t !== null;) {
				var r = e, i = t, a = i.type === Ff;
				a = n || a, i.tag === 22 ? i.memoizedState === null && (a && i.flags & 8192 ? E(i, Kl, r, i) : i.subtreeFlags & 67108864 && E(i, Gl, r, i, a)) : i.flags & 67108864 ? a && E(i, Kl, r, i) : Gl(r, i, a), t = t.sibling;
			}
		}
		function Kl(e, t) {
			Ne(!0);
			try {
				Lc(t), el(t), zc(e, t.alternate, t, !1), Kc(e, t, 0, null, !1, 0);
			} finally {
				Ne(!1);
			}
		}
		function ql(e) {
			var t = !0;
			e.current.mode & (zg | Bg) || (t = !1), Gl(e, e.current, t);
		}
		function Jl(e) {
			if ((Z & Fb) === Pb) {
				var t = e.tag;
				if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
					if (t = C(e) || "ReactComponent", eS !== null) {
						if (eS.has(t)) return;
						eS.add(t);
					} else eS = /* @__PURE__ */ new Set([t]);
					E(e, function() {
						console.error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead.");
					});
				}
			}
		}
		function Yl(e, t) {
			Fp && e.memoizedUpdaters.forEach(function(n) {
				qe(e, n, t);
			});
		}
		function Xl(e, t) {
			var n = B.actQueue;
			return n === null ? yp(e, t) : (n.push(t), rS);
		}
		function Zl(e) {
			rl() && B.actQueue === null && E(e, function() {
				console.error("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act", C(e));
			});
		}
		function P(e) {
			e !== aS && e.next === null && (aS === null ? iS = aS = e : aS = aS.next = e), cS = !0, B.actQueue === null ? oS || (oS = !0, ru()) : sS || (sS = !0, ru());
		}
		function F(e, t) {
			if (!lS && cS) {
				lS = !0;
				do
					for (var n = !1, r = iS; r !== null;) {
						if (!t) if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - Ip(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, tu(r, a));
						} else a = $, a = Ie(r, r === Wb ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== $S), !(a & 3) || Le(r, a) || (n = !0, tu(r, a));
						r = r.next;
					}
				while (n);
				lS = !1;
			}
		}
		function I() {
			XS = window.event, Ql();
		}
		function Ql() {
			cS = sS = oS = !1;
			var e = 0;
			uS !== 0 && Gu() && (e = uS);
			for (var t = Cp(), n = null, r = iS; r !== null;) {
				var i = r.next, a = $l(r, t);
				a === 0 ? (r.next = null, n === null ? iS = i : n.next = i, i === null && (aS = n)) : (n = r, (e !== 0 || a & 3) && (cS = !0)), r = i;
			}
			Px !== Ox && Px !== Nx || F(e, !1), uS !== 0 && (uS = 0);
		}
		function $l(e, t) {
			for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
				var o = 31 - Ip(a), s = 1 << o, c = i[o];
				c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Re(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
			}
			if (t = Wb, n = $, n = Ie(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== $S), r = e.callbackNode, n === 0 || e === t && (tx === qb || tx === ex) || e.cancelPendingCommit !== null) return r !== null && nu(r), e.callbackNode = null, e.callbackPriority = 0;
			if (!(n & 3) || Le(e, n)) {
				if (t = n & -n, t !== e.callbackPriority || B.actQueue !== null && r !== dS) nu(r);
				else return t;
				switch (Ye(n)) {
					case Hp:
					case Up:
						n = Ep;
						break;
					case Wp:
						n = Dp;
						break;
					case Gp:
						n = kp;
						break;
					default: n = Dp;
				}
				return r = eu.bind(null, e), B.actQueue === null ? n = yp(n, r) : (B.actQueue.push(r), n = dS), e.callbackPriority = t, e.callbackNode = n, t;
			}
			return r !== null && nu(r), e.callbackPriority = 2, e.callbackNode = null, 2;
		}
		function eu(e, t) {
			if (rv = nv = !1, XS = window.event, Px !== Ox && Px !== Nx) return e.callbackNode = null, e.callbackPriority = 0, null;
			var n = e.callbackNode;
			if (Ux === wx && (Ux = Ex), Ll() && e.callbackNode !== n) return null;
			var r = $;
			return r = Ie(e, e === Wb ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== $S), r === 0 ? null : (sl(e, r, t), $l(e, Cp()), e.callbackNode != null && e.callbackNode === n ? eu.bind(null, e) : null);
		}
		function tu(e, t) {
			if (Ll()) return null;
			nv = rv, rv = !1, sl(e, t, !0);
		}
		function nu(e) {
			e !== dS && e !== null && bp(e);
		}
		function ru() {
			B.actQueue !== null && B.actQueue.push(function() {
				return Ql(), null;
			}), tC(function() {
				(Z & (Fb | Ib)) === Pb ? Ql() : yp(Tp, I);
			});
		}
		function iu() {
			if (uS === 0) {
				var e = ov;
				e === 0 && (e = zp, zp <<= 1, !(zp & 261888) && (zp = 256)), uS = e;
			}
			return uS;
		}
		function au(e) {
			return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (ke(e, "action"), ln("" + e));
		}
		function ou(e, t) {
			var n = t.ownerDocument.createElement("input");
			return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
		}
		function su(e, t, n, r, i) {
			if (t === "submit" && n && n.stateNode === i) {
				var a = au((i[Jp] || null).action), o = r.submitter;
				o && (t = (t = o[Jp] || null) ? au(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
				var s = new ch("action", "action", null, r, i);
				e.push({
					event: s,
					listeners: [{
						instance: null,
						listener: function() {
							if (r.defaultPrevented) {
								if (uS !== 0) {
									var e = o ? ou(i, o) : new FormData(i), t = {
										pending: !0,
										data: e,
										method: i.method,
										action: a
									};
									Object.freeze(t), Lo(n, t, null, e);
								}
							} else typeof a == "function" && (s.preventDefault(), e = o ? ou(i, o) : new FormData(i), t = {
								pending: !0,
								data: e,
								method: i.method,
								action: a
							}, Object.freeze(t), Lo(n, t, a, e));
						},
						currentTarget: i
					}]
				});
			}
		}
		function cu(e, t, n) {
			e.currentTarget = n;
			try {
				t(e);
			} catch (e) {
				pg(e);
			}
			e.currentTarget = null;
		}
		function lu(e, t) {
			t = (t & 4) != 0;
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				a: {
					var i = void 0, a = r.event;
					if (r = r.listeners, t) for (var o = r.length - 1; 0 <= o; o--) {
						var s = r[o], c = s.instance, l = s.currentTarget;
						if (s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? cu(a, s, l) : E(c, cu, a, s, l), i = c;
					}
					else for (o = 0; o < r.length; o++) {
						if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? cu(a, s, l) : E(c, cu, a, s, l), i = c;
					}
				}
			}
		}
		function L(e, t) {
			pS.has(e) || console.error("Did not expect a listenToNonDelegatedEvent() call for \"%s\". This is a bug in React. Please file an issue.", e);
			var n = t[Xp];
			n === void 0 && (n = t[Xp] = /* @__PURE__ */ new Set());
			var r = e + "__bubble";
			n.has(r) || (fu(t, e, 2, !1), n.add(r));
		}
		function uu(e, t, n) {
			pS.has(e) && !t && console.error("Did not expect a listenToNativeEvent() call for \"%s\" in the bubble phase. This is a bug in React. Please file an issue.", e);
			var r = 0;
			t && (r |= 4), fu(n, e, r, t);
		}
		function du(e) {
			if (!e[mS]) {
				e[mS] = !0, tm.forEach(function(t) {
					t !== "selectionchange" && (pS.has(t) || uu(t, !1, e), uu(t, !0, e));
				});
				var t = e.nodeType === 9 ? e : e.ownerDocument;
				t === null || t[mS] || (t[mS] = !0, uu("selectionchange", !1, t));
			}
		}
		function fu(e, t, n, r) {
			switch (pf(t)) {
				case Hp:
					var i = cf;
					break;
				case Up:
					i = lf;
					break;
				default: i = uf;
			}
			n = i.bind(null, t, n, e), i = void 0, !nh || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
				capture: !0,
				passive: i
			}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
		}
		function pu(e, t, n, r, i) {
			var a = r;
			if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
				if (r === null) return;
				var o = r.tag;
				if (o === 3 || o === 4) {
					var s = r.stateNode.containerInfo;
					if (s === i) break;
					if (o === 4) for (o = r.return; o !== null;) {
						var c = o.tag;
						if ((c === 3 || c === 4) && o.stateNode.containerInfo === i) return;
						o = o.return;
					}
					for (; s !== null;) {
						if (o = $e(s), o === null) return;
						if (c = o.tag, c === 5 || c === 6 || c === 26 || c === 27) {
							r = a = o;
							continue a;
						}
						s = s.parentNode;
					}
				}
				r = r.return;
			}
			pn(function() {
				var r = a, i = dn(n), o = [];
				a: {
					var s = sg.get(e);
					if (s !== void 0) {
						var c = ch, l = e;
						switch (e) {
							case "keypress": if (gn(n) === 0) break a;
							case "keydown":
							case "keyup":
								c = Th;
								break;
							case "focusin":
								l = "focus", c = _h;
								break;
							case "focusout":
								l = "blur", c = _h;
								break;
							case "beforeblur":
							case "afterblur":
								c = _h;
								break;
							case "click": if (n.button === 2) break a;
							case "auxclick":
							case "dblclick":
							case "mousedown":
							case "mousemove":
							case "mouseup":
							case "mouseout":
							case "mouseover":
							case "contextmenu":
								c = hh;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								c = gh;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								c = Dh;
								break;
							case eg:
							case tg:
							case ng:
								c = vh;
								break;
							case og:
								c = Oh;
								break;
							case "scroll":
							case "scrollend":
								c = uh;
								break;
							case "wheel":
								c = kh;
								break;
							case "copy":
							case "cut":
							case "paste":
								c = yh;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								c = Eh;
								break;
							case "toggle":
							case "beforetoggle": c = Ah;
						}
						var u = (t & 4) != 0, d = !u && (e === "scroll" || e === "scrollend"), f = u ? s === null ? null : s + "Capture" : s;
						u = [];
						for (var p = r, m; p !== null;) {
							var h = p;
							if (m = h.stateNode, h = h.tag, h !== 5 && h !== 26 && h !== 27 || m === null || f === null || (h = mn(p, f), h != null && u.push(mu(p, h, m))), d) break;
							p = p.return;
						}
						0 < u.length && (s = new c(s, l, null, n, i), o.push({
							event: s,
							listeners: u
						}));
					}
				}
				if (!(t & 7)) {
					a: {
						if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== Zm && (l = n.relatedTarget || n.fromElement) && ($e(l) || l[Yp])) break a;
						if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? $e(l) : null, l !== null && (d = b(l), u = l.tag, l !== d || u !== 5 && u !== 27 && u !== 6) && (l = null)) : (c = null, l = r), c !== l)) {
							if (u = hh, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = Eh, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = c == null ? s : tt(c), m = l == null ? s : tt(l), s = new u(h, p + "leave", c, n, i), s.target = d, s.relatedTarget = m, h = null, $e(i) === r && (u = new u(f, p + "enter", l, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, c && l) b: {
								for (u = gu, f = c, p = l, m = 0, h = f; h; h = u(h)) m++;
								h = 0;
								for (var g = p; g; g = u(g)) h++;
								for (; 0 < m - h;) f = u(f), m--;
								for (; 0 < h - m;) p = u(p), h--;
								for (; m--;) {
									if (f === p || p !== null && f === p.alternate) {
										u = f;
										break b;
									}
									f = u(f), p = u(p);
								}
								u = null;
							}
							else u = null;
							c !== null && _u(o, s, c, u, !1), l !== null && d !== null && _u(o, d, l, u, !0);
						}
					}
					a: {
						if (s = r ? tt(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var _ = jn;
						else if (En(s)) if (Wh) _ = Ln;
						else {
							_ = Fn;
							var v = Pn;
						}
						else c = s.nodeName, !c || c.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && nn(r.elementType) && (_ = jn) : _ = In;
						if (_ &&= _(e, r)) {
							On(o, _, n, i);
							break a;
						}
						v && v(e, s, r), e === "focusout" && r && s.type === "number" && r.memoizedProps.value != null && xt(s, "number", s.value);
					}
					switch (v = r ? tt(r) : window, e) {
						case "focusin":
							(En(v) || v.contentEditable === "true") && (qh = v, Jh = r, Yh = null);
							break;
						case "focusout":
							Yh = Jh = qh = null;
							break;
						case "mousedown":
							Xh = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							Xh = !1, Gn(o, n, i);
							break;
						case "selectionchange": if (Kh) break;
						case "keydown":
						case "keyup": Gn(o, n, i);
					}
					var y;
					if (Nh) b: {
						switch (e) {
							case "compositionstart":
								var x = "onCompositionStart";
								break b;
							case "compositionend":
								x = "onCompositionEnd";
								break b;
							case "compositionupdate":
								x = "onCompositionUpdate";
								break b;
						}
						x = void 0;
					}
					else Bh ? Sn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === Mh && (x = "onCompositionStart");
					x && (Ih && n.locale !== "ko" && (Bh || x !== "onCompositionStart" ? x === "onCompositionEnd" && Bh && (y = hn()) : (ih = i, ah = "value" in ih ? ih.value : ih.textContent, Bh = !0)), v = hu(r, x), 0 < v.length && (x = new bh(x, e, null, n, i), o.push({
						event: x,
						listeners: v
					}), y ? x.data = y : (y = Cn(n), y !== null && (x.data = y)))), (y = Fh ? wn(e, n) : Tn(e, n)) && (x = hu(r, "onBeforeInput"), 0 < x.length && (v = new xh("onBeforeInput", "beforeinput", null, n, i), o.push({
						event: v,
						listeners: x
					}), v.data = y)), su(o, e, r, n, i);
				}
				lu(o, t);
			});
		}
		function mu(e, t, n) {
			return {
				instance: e,
				listener: t,
				currentTarget: n
			};
		}
		function hu(e, t) {
			for (var n = t + "Capture", r = []; e !== null;) {
				var i = e, a = i.stateNode;
				if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = mn(e, n), i != null && r.unshift(mu(e, i, a)), i = mn(e, t), i != null && r.push(mu(e, i, a))), e.tag === 3) return r;
				e = e.return;
			}
			return [];
		}
		function gu(e) {
			if (e === null) return null;
			do
				e = e.return;
			while (e && e.tag !== 5 && e.tag !== 27);
			return e || null;
		}
		function _u(e, t, n, r, i) {
			for (var a = t._reactName, o = []; n !== null && n !== r;) {
				var s = n, c = s.alternate, l = s.stateNode;
				if (s = s.tag, c !== null && c === r) break;
				s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = mn(n, a), l != null && o.unshift(mu(n, l, c))) : i || (l = mn(n, a), l != null && o.push(mu(n, l, c)))), n = n.return;
			}
			o.length !== 0 && e.push({
				event: t,
				listeners: o
			});
		}
		function vu(e, t) {
			on(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || Wm || (Wm = !0, e === "select" && t.multiple ? console.error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : console.error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
			var n = {
				registrationNameDependencies: nm,
				possibleRegistrationNames: rm
			};
			nn(e) || typeof t.is == "string" || cn(e, t, n), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
		}
		function yu(e, t, n, r) {
			t !== n && (n = Cu(n), Cu(t) !== n && (r[e] = t));
		}
		function bu(e, t, n) {
			t.forEach(function(t) {
				n[ku(t)] = t === "style" ? Au(e) : e.getAttribute(t);
			});
		}
		function xu(e, t) {
			!1 === t ? console.error("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : console.error("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
		}
		function Su(e, t) {
			return e = e.namespaceURI === Im || e.namespaceURI === Lm ? e.ownerDocument.createElementNS(e.namespaceURI, e.tagName) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
		}
		function Cu(e) {
			return De(e) && (console.error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.", Ee(e)), Oe(e)), (typeof e == "string" ? e : "" + e).replace(CS, "\n").replace(wS, "");
		}
		function wu(e, t) {
			return t = Cu(t), Cu(e) === t;
		}
		function Tu(e, t, n, r, i, a) {
			switch (n) {
				case "children":
					typeof r == "string" ? (Zt(r, t, !1), t === "body" || t === "textarea" && r === "" || Qt(e, r)) : (typeof r == "number" || typeof r == "bigint") && (Zt("" + r, t, !1), t !== "body" && Qt(e, "" + r));
					break;
				case "className":
					lt(e, "class", r);
					break;
				case "tabIndex":
					lt(e, "tabindex", r);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					lt(e, n, r);
					break;
				case "style":
					tn(e, r, a);
					break;
				case "data": if (t !== "object") {
					lt(e, "data", r);
					break;
				}
				case "src":
				case "href":
					if (r === "" && (t !== "a" || n !== "href")) {
						console.error(n === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", n, n), e.removeAttribute(n);
						break;
					}
					if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					ke(r, n), r = ln("" + r), e.setAttribute(n, r);
					break;
				case "action":
				case "formAction":
					if (r != null && (t === "form" ? n === "formAction" ? console.error("You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>.") : typeof r == "function" && (i.encType == null && i.method == null || bS || (bS = !0, console.error("Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden.")), i.target == null || yS || (yS = !0, console.error("Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."))) : t === "input" || t === "button" ? n === "action" ? console.error("You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>.") : t !== "input" || i.type === "submit" || i.type === "image" || _S ? t !== "button" || i.type == null || i.type === "submit" || _S ? typeof r == "function" && (i.name == null || vS || (vS = !0, console.error("Cannot specify a \"name\" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.")), i.formEncType == null && i.formMethod == null || bS || (bS = !0, console.error("Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden.")), i.formTarget == null || yS || (yS = !0, console.error("Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."))) : (_S = !0, console.error("A button can only specify a formAction along with type=\"submit\" or no type.")) : (_S = !0, console.error("An input can only specify a formAction along with type=\"submit\" or type=\"image\".")) : console.error(n === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>.")), typeof r == "function") {
						e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
						break;
					} else typeof a == "function" && (n === "formAction" ? (t !== "input" && Tu(e, t, "name", i.name, i, null), Tu(e, t, "formEncType", i.formEncType, i, null), Tu(e, t, "formMethod", i.formMethod, i, null), Tu(e, t, "formTarget", i.formTarget, i, null)) : (Tu(e, t, "encType", i.encType, i, null), Tu(e, t, "method", i.method, i, null), Tu(e, t, "target", i.target, i, null)));
					if (r == null || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					ke(r, n), r = ln("" + r), e.setAttribute(n, r);
					break;
				case "onClick":
					r != null && (typeof r != "function" && xu(n, r), e.onclick = un);
					break;
				case "onScroll":
					r != null && (typeof r != "function" && xu(n, r), L("scroll", e));
					break;
				case "onScrollEnd":
					r != null && (typeof r != "function" && xu(n, r), L("scrollend", e));
					break;
				case "dangerouslySetInnerHTML":
					if (r != null) {
						if (typeof r != "object" || !("__html" in r)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
						if (n = r.__html, n != null) {
							if (i.children != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
							e.innerHTML = n;
						}
					}
					break;
				case "multiple":
					e.multiple = r && typeof r != "function" && typeof r != "symbol";
					break;
				case "muted":
					e.muted = r && typeof r != "function" && typeof r != "symbol";
					break;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "defaultValue":
				case "defaultChecked":
				case "innerHTML":
				case "ref": break;
				case "autoFocus": break;
				case "xlinkHref":
					if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
						e.removeAttribute("xlink:href");
						break;
					}
					ke(r, n), n = ln("" + r), e.setAttributeNS(TS, "xlink:href", n);
					break;
				case "contentEditable":
				case "spellCheck":
				case "draggable":
				case "value":
				case "autoReverse":
				case "externalResourcesRequired":
				case "focusable":
				case "preserveAlpha":
					r != null && typeof r != "function" && typeof r != "symbol" ? (ke(r, n), e.setAttribute(n, "" + r)) : e.removeAttribute(n);
					break;
				case "inert": r !== "" || SS[n] || (SS[n] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", n));
				case "allowFullScreen":
				case "async":
				case "autoPlay":
				case "controls":
				case "default":
				case "defer":
				case "disabled":
				case "disablePictureInPicture":
				case "disableRemotePlayback":
				case "formNoValidate":
				case "hidden":
				case "loop":
				case "noModule":
				case "noValidate":
				case "open":
				case "playsInline":
				case "readOnly":
				case "required":
				case "reversed":
				case "scoped":
				case "seamless":
				case "itemScope":
					r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
					break;
				case "capture":
				case "download":
					!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? (ke(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? (ke(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "rowSpan":
				case "start":
					r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : (ke(r, n), e.setAttribute(n, r));
					break;
				case "popover":
					L("beforetoggle", e), L("toggle", e), ct(e, "popover", r);
					break;
				case "xlinkActuate":
					ut(e, TS, "xlink:actuate", r);
					break;
				case "xlinkArcrole":
					ut(e, TS, "xlink:arcrole", r);
					break;
				case "xlinkRole":
					ut(e, TS, "xlink:role", r);
					break;
				case "xlinkShow":
					ut(e, TS, "xlink:show", r);
					break;
				case "xlinkTitle":
					ut(e, TS, "xlink:title", r);
					break;
				case "xlinkType":
					ut(e, TS, "xlink:type", r);
					break;
				case "xmlBase":
					ut(e, ES, "xml:base", r);
					break;
				case "xmlLang":
					ut(e, ES, "xml:lang", r);
					break;
				case "xmlSpace":
					ut(e, ES, "xml:space", r);
					break;
				case "is":
					a != null && console.error("Cannot update the \"is\" prop after it has been initialized."), ct(e, "is", r);
					break;
				case "innerText":
				case "textContent": break;
				case "popoverTarget": xS || typeof r != "object" || !r || (xS = !0, console.error("The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.", r));
				default: !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N" ? (n = rn(n), ct(e, n, r)) : nm.hasOwnProperty(n) && r != null && typeof r != "function" && xu(n, r);
			}
		}
		function Eu(e, t, n, r, i, a) {
			switch (n) {
				case "style":
					tn(e, r, a);
					break;
				case "dangerouslySetInnerHTML":
					if (r != null) {
						if (typeof r != "object" || !("__html" in r)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
						if (n = r.__html, n != null) {
							if (i.children != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
							e.innerHTML = n;
						}
					}
					break;
				case "children":
					typeof r == "string" ? Qt(e, r) : (typeof r == "number" || typeof r == "bigint") && Qt(e, "" + r);
					break;
				case "onScroll":
					r != null && (typeof r != "function" && xu(n, r), L("scroll", e));
					break;
				case "onScrollEnd":
					r != null && (typeof r != "function" && xu(n, r), L("scrollend", e));
					break;
				case "onClick":
					r != null && (typeof r != "function" && xu(n, r), e.onclick = un);
					break;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "innerHTML":
				case "ref": break;
				case "innerText":
				case "textContent": break;
				default: if (nm.hasOwnProperty(n)) r != null && typeof r != "function" && xu(n, r);
				else a: {
					if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), t = n.slice(2, i ? n.length - 7 : void 0), a = e[Jp] || null, a = a == null ? null : a[n], typeof a == "function" && e.removeEventListener(t, a, i), typeof r == "function")) {
						typeof a != "function" && a !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, i);
						break a;
					}
					n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : ct(e, n, r);
				}
			}
		}
		function Du(e, t, n) {
			switch (vu(t, n), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "img":
					L("error", e), L("load", e);
					var r = !1, i = !1, a;
					for (a in n) if (n.hasOwnProperty(a)) {
						var o = n[a];
						if (o != null) switch (a) {
							case "src":
								r = !0;
								break;
							case "srcSet":
								i = !0;
								break;
							case "children":
							case "dangerouslySetInnerHTML": throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							default: Tu(e, t, a, o, n, null);
						}
					}
					i && Tu(e, t, "srcSet", n.srcSet, n, null), r && Tu(e, t, "src", n.src, n, null);
					return;
				case "input":
					D("input", n), L("invalid", e);
					var s = a = o = i = null, c = null, l = null;
					for (r in n) if (n.hasOwnProperty(r)) {
						var u = n[r];
						if (u != null) switch (r) {
							case "name":
								i = u;
								break;
							case "type":
								o = u;
								break;
							case "checked":
								c = u;
								break;
							case "defaultChecked":
								l = u;
								break;
							case "value":
								a = u;
								break;
							case "defaultValue":
								s = u;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (u != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
								break;
							default: Tu(e, t, r, u, n, null);
						}
					}
					vt(e, n), bt(e, a, s, c, l, o, i, !1);
					return;
				case "select":
					for (i in D("select", n), L("invalid", e), r = o = a = null, n) if (n.hasOwnProperty(i) && (s = n[i], s != null)) switch (i) {
						case "value":
							a = s;
							break;
						case "defaultValue":
							o = s;
							break;
						case "multiple": r = s;
						default: Tu(e, t, i, s, n, null);
					}
					Tt(e, n), t = a, n = o, e.multiple = !!r, t == null ? n != null && wt(e, !!r, n, !0) : wt(e, !!r, t, !1);
					return;
				case "textarea":
					for (o in D("textarea", n), L("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(o) && (s = n[o], s != null)) switch (o) {
						case "value":
							r = s;
							break;
						case "defaultValue":
							i = s;
							break;
						case "children":
							a = s;
							break;
						case "dangerouslySetInnerHTML":
							if (s != null) throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
							break;
						default: Tu(e, t, o, s, n, null);
					}
					Et(e, n), Ot(e, r, i, a);
					return;
				case "option":
					for (c in St(e, n), n) if (n.hasOwnProperty(c) && (r = n[c], r != null)) switch (c) {
						case "selected":
							e.selected = r && typeof r != "function" && typeof r != "symbol";
							break;
						default: Tu(e, t, c, r, n, null);
					}
					return;
				case "dialog":
					L("beforetoggle", e), L("toggle", e), L("cancel", e), L("close", e);
					break;
				case "iframe":
				case "object":
					L("load", e);
					break;
				case "video":
				case "audio":
					for (r = 0; r < fS.length; r++) L(fS[r], e);
					break;
				case "image":
					L("error", e), L("load", e);
					break;
				case "details":
					L("toggle", e);
					break;
				case "embed":
				case "source":
				case "link": L("error", e), L("load", e);
				case "area":
				case "base":
				case "br":
				case "col":
				case "hr":
				case "keygen":
				case "meta":
				case "param":
				case "track":
				case "wbr":
				case "menuitem":
					for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
						default: Tu(e, t, l, r, n, null);
					}
					return;
				default: if (nn(t)) {
					for (u in n) n.hasOwnProperty(u) && (r = n[u], r !== void 0 && Eu(e, t, u, r, n, void 0));
					return;
				}
			}
			for (s in n) n.hasOwnProperty(s) && (r = n[s], r != null && Tu(e, t, s, r, n, null));
		}
		function Ou(e, t, n, r) {
			switch (vu(t, r), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "input":
					var i = null, a = null, o = null, s = null, c = null, l = null, u = null;
					for (p in n) {
						var d = n[p];
						if (n.hasOwnProperty(p) && d != null) switch (p) {
							case "checked": break;
							case "value": break;
							case "defaultValue": c = d;
							default: r.hasOwnProperty(p) || Tu(e, t, p, null, r, d);
						}
					}
					for (var f in r) {
						var p = r[f];
						if (d = n[f], r.hasOwnProperty(f) && (p != null || d != null)) switch (f) {
							case "type":
								a = p;
								break;
							case "name":
								i = p;
								break;
							case "checked":
								l = p;
								break;
							case "defaultChecked":
								u = p;
								break;
							case "value":
								o = p;
								break;
							case "defaultValue":
								s = p;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (p != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
								break;
							default: p !== d && Tu(e, t, f, p, r, d);
						}
					}
					t = n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null, r = r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null, t || !r || gS || (console.error("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), gS = !0), !t || r || hS || (console.error("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), hS = !0), yt(e, o, s, c, l, u, a, i);
					return;
				case "select":
					for (a in p = o = s = f = null, n) if (c = n[a], n.hasOwnProperty(a) && c != null) switch (a) {
						case "value": break;
						case "multiple": p = c;
						default: r.hasOwnProperty(a) || Tu(e, t, a, null, r, c);
					}
					for (i in r) if (a = r[i], c = n[i], r.hasOwnProperty(i) && (a != null || c != null)) switch (i) {
						case "value":
							f = a;
							break;
						case "defaultValue":
							s = a;
							break;
						case "multiple": o = a;
						default: a !== c && Tu(e, t, i, a, r, c);
					}
					r = s, t = o, n = p, f == null ? !!n != !!t && (r == null ? wt(e, !!t, t ? [] : "", !1) : wt(e, !!t, r, !0)) : wt(e, !!t, f, !1);
					return;
				case "textarea":
					for (s in p = f = null, n) if (i = n[s], n.hasOwnProperty(s) && i != null && !r.hasOwnProperty(s)) switch (s) {
						case "value": break;
						case "children": break;
						default: Tu(e, t, s, null, r, i);
					}
					for (o in r) if (i = r[o], a = n[o], r.hasOwnProperty(o) && (i != null || a != null)) switch (o) {
						case "value":
							f = i;
							break;
						case "defaultValue":
							p = i;
							break;
						case "children": break;
						case "dangerouslySetInnerHTML":
							if (i != null) throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
							break;
						default: i !== a && Tu(e, t, o, i, r, a);
					}
					Dt(e, f, p);
					return;
				case "option":
					for (var m in n) if (f = n[m], n.hasOwnProperty(m) && f != null && !r.hasOwnProperty(m)) switch (m) {
						case "selected":
							e.selected = !1;
							break;
						default: Tu(e, t, m, null, r, f);
					}
					for (c in r) if (f = r[c], p = n[c], r.hasOwnProperty(c) && f !== p && (f != null || p != null)) switch (c) {
						case "selected":
							e.selected = f && typeof f != "function" && typeof f != "symbol";
							break;
						default: Tu(e, t, c, f, r, p);
					}
					return;
				case "img":
				case "link":
				case "area":
				case "base":
				case "br":
				case "col":
				case "embed":
				case "hr":
				case "keygen":
				case "meta":
				case "param":
				case "source":
				case "track":
				case "wbr":
				case "menuitem":
					for (var h in n) f = n[h], n.hasOwnProperty(h) && f != null && !r.hasOwnProperty(h) && Tu(e, t, h, null, r, f);
					for (l in r) if (f = r[l], p = n[l], r.hasOwnProperty(l) && f !== p && (f != null || p != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML":
							if (f != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							break;
						default: Tu(e, t, l, f, r, p);
					}
					return;
				default: if (nn(t)) {
					for (var g in n) f = n[g], n.hasOwnProperty(g) && f !== void 0 && !r.hasOwnProperty(g) && Eu(e, t, g, void 0, r, f);
					for (u in r) f = r[u], p = n[u], !r.hasOwnProperty(u) || f === p || f === void 0 && p === void 0 || Eu(e, t, u, f, r, p);
					return;
				}
			}
			for (var _ in n) f = n[_], n.hasOwnProperty(_) && f != null && !r.hasOwnProperty(_) && Tu(e, t, _, null, r, f);
			for (d in r) f = r[d], p = n[d], !r.hasOwnProperty(d) || f === p || f == null && p == null || Tu(e, t, d, f, r, p);
		}
		function ku(e) {
			switch (e) {
				case "class": return "className";
				case "for": return "htmlFor";
				default: return e;
			}
		}
		function Au(e) {
			var t = {};
			e = e.style;
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				t[r] = e.getPropertyValue(r);
			}
			return t;
		}
		function ju(e, t, n) {
			if (t != null && typeof t != "object") console.error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			else {
				var r, i = r = "", a;
				for (a in t) if (t.hasOwnProperty(a)) {
					var o = t[a];
					o != null && typeof o != "boolean" && o !== "" && (a.indexOf("--") === 0 ? (Ae(o, a), r += i + a + ":" + ("" + o).trim()) : typeof o != "number" || o === 0 || Fm.has(a) ? (Ae(o, a), r += i + a.replace(Tm, "-$1").toLowerCase().replace(Em, "-ms-") + ":" + ("" + o).trim()) : r += i + a.replace(Tm, "-$1").toLowerCase().replace(Em, "-ms-") + ":" + o + "px", i = ";");
				}
				r ||= null, t = e.getAttribute("style"), t !== r && (r = Cu(r), Cu(t) !== r && (n.style = Au(e)));
			}
		}
		function Mu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (ke(r, t), e === "" + r) return;
			}
			yu(t, e, r, a);
		}
		function Nu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) {
				switch (typeof r) {
					case "function":
					case "symbol": return;
				}
				if (!r) return;
			} else switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (r) return;
			}
			yu(t, e, r, a);
		}
		function Pu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (ke(r, n), e === "" + r) return;
			}
			yu(t, e, r, a);
		}
		function Fu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
				default: if (isNaN(r)) return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (!isNaN(r) && (ke(r, t), e === "" + r)) return;
			}
			yu(t, e, r, a);
		}
		function Iu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (ke(r, t), n = ln("" + r), e === n) return;
			}
			yu(t, e, r, a);
		}
		function Lu(e, t, n, r) {
			for (var i = {}, a = /* @__PURE__ */ new Set(), o = e.attributes, s = 0; s < o.length; s++) switch (o[s].name.toLowerCase()) {
				case "value": break;
				case "checked": break;
				case "selected": break;
				default: a.add(o[s].name);
			}
			if (nn(t)) {
				for (var c in n) if (n.hasOwnProperty(c)) {
					var l = n[c];
					if (l != null) {
						if (nm.hasOwnProperty(c)) typeof l != "function" && xu(c, l);
						else if (!0 !== n.suppressHydrationWarning) switch (c) {
							case "children":
								typeof l != "string" && typeof l != "number" || yu("children", e.textContent, l, i);
								continue;
							case "suppressContentEditableWarning":
							case "suppressHydrationWarning":
							case "defaultValue":
							case "defaultChecked":
							case "innerHTML":
							case "ref": continue;
							case "dangerouslySetInnerHTML":
								o = e.innerHTML, l = l ? l.__html : void 0, l != null && (l = Su(e, l), yu(c, o, l, i));
								continue;
							case "style":
								a.delete(c), ju(e, l, i);
								continue;
							case "offsetParent":
							case "offsetTop":
							case "offsetLeft":
							case "offsetWidth":
							case "offsetHeight":
							case "isContentEditable":
							case "outerText":
							case "outerHTML":
								a.delete(c.toLowerCase()), console.error("Assignment to read-only property will result in a no-op: `%s`", c);
								continue;
							case "className":
								a.delete("class"), o = st(e, "class", l), yu("className", o, l, i);
								continue;
							default: r.context === US && t !== "svg" && t !== "math" ? a.delete(c.toLowerCase()) : a.delete(c), o = st(e, c, l), yu(c, o, l, i);
						}
					}
				}
			} else for (l in n) if (n.hasOwnProperty(l) && (c = n[l], c != null)) {
				if (nm.hasOwnProperty(l)) typeof c != "function" && xu(l, c);
				else if (!0 !== n.suppressHydrationWarning) switch (l) {
					case "children":
						typeof c != "string" && typeof c != "number" || yu("children", e.textContent, c, i);
						continue;
					case "suppressContentEditableWarning":
					case "suppressHydrationWarning":
					case "value":
					case "checked":
					case "selected":
					case "defaultValue":
					case "defaultChecked":
					case "innerHTML":
					case "ref": continue;
					case "dangerouslySetInnerHTML":
						o = e.innerHTML, c = c ? c.__html : void 0, c != null && (c = Su(e, c), o !== c && (i[l] = { __html: o }));
						continue;
					case "className":
						Mu(e, l, "class", c, a, i);
						continue;
					case "tabIndex":
						Mu(e, l, "tabindex", c, a, i);
						continue;
					case "style":
						a.delete(l), ju(e, c, i);
						continue;
					case "multiple":
						a.delete(l), yu(l, e.multiple, c, i);
						continue;
					case "muted":
						a.delete(l), yu(l, e.muted, c, i);
						continue;
					case "autoFocus":
						a.delete("autofocus"), yu(l, e.autofocus, c, i);
						continue;
					case "data": if (t !== "object") {
						a.delete(l), o = e.getAttribute("data"), yu(l, o, c, i);
						continue;
					}
					case "src":
					case "href":
						if (!(c !== "" || t === "a" && l === "href" || t === "object" && l === "data")) {
							console.error(l === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", l, l);
							continue;
						}
						Iu(e, l, l, c, a, i);
						continue;
					case "action":
					case "formAction":
						if (o = e.getAttribute(l), typeof c == "function") {
							a.delete(l.toLowerCase()), l === "formAction" ? (a.delete("name"), a.delete("formenctype"), a.delete("formmethod"), a.delete("formtarget")) : (a.delete("enctype"), a.delete("method"), a.delete("target"));
							continue;
						} else if (o === DS) {
							a.delete(l.toLowerCase()), yu(l, "function", c, i);
							continue;
						}
						Iu(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "xlinkHref":
						Iu(e, l, "xlink:href", c, a, i);
						continue;
					case "contentEditable":
						Pu(e, l, "contenteditable", c, a, i);
						continue;
					case "spellCheck":
						Pu(e, l, "spellcheck", c, a, i);
						continue;
					case "draggable":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
						Pu(e, l, l, c, a, i);
						continue;
					case "allowFullScreen":
					case "async":
					case "autoPlay":
					case "controls":
					case "default":
					case "defer":
					case "disabled":
					case "disablePictureInPicture":
					case "disableRemotePlayback":
					case "formNoValidate":
					case "hidden":
					case "loop":
					case "noModule":
					case "noValidate":
					case "open":
					case "playsInline":
					case "readOnly":
					case "required":
					case "reversed":
					case "scoped":
					case "seamless":
					case "itemScope":
						Nu(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "capture":
					case "download":
						a: {
							s = e;
							var u = o = l, d = i;
							if (a.delete(u), s = s.getAttribute(u), s === null) switch (typeof c) {
								case "undefined":
								case "function":
								case "symbol": break a;
								default: if (!1 === c) break a;
							}
							else if (c != null) switch (typeof c) {
								case "function":
								case "symbol": break;
								case "boolean":
									if (!0 === c && s === "") break a;
									break;
								default: if (ke(c, o), s === "" + c) break a;
							}
							yu(o, s, c, d);
						}
						continue;
					case "cols":
					case "rows":
					case "size":
					case "span":
						a: {
							if (s = e, u = o = l, d = i, a.delete(u), s = s.getAttribute(u), s === null) switch (typeof c) {
								case "undefined":
								case "function":
								case "symbol":
								case "boolean": break a;
								default: if (isNaN(c) || 1 > c) break a;
							}
							else if (c != null) switch (typeof c) {
								case "function":
								case "symbol":
								case "boolean": break;
								default: if (!(isNaN(c) || 1 > c) && (ke(c, o), s === "" + c)) break a;
							}
							yu(o, s, c, d);
						}
						continue;
					case "rowSpan":
						Fu(e, l, "rowspan", c, a, i);
						continue;
					case "start":
						Fu(e, l, l, c, a, i);
						continue;
					case "xHeight":
						Mu(e, l, "x-height", c, a, i);
						continue;
					case "xlinkActuate":
						Mu(e, l, "xlink:actuate", c, a, i);
						continue;
					case "xlinkArcrole":
						Mu(e, l, "xlink:arcrole", c, a, i);
						continue;
					case "xlinkRole":
						Mu(e, l, "xlink:role", c, a, i);
						continue;
					case "xlinkShow":
						Mu(e, l, "xlink:show", c, a, i);
						continue;
					case "xlinkTitle":
						Mu(e, l, "xlink:title", c, a, i);
						continue;
					case "xlinkType":
						Mu(e, l, "xlink:type", c, a, i);
						continue;
					case "xmlBase":
						Mu(e, l, "xml:base", c, a, i);
						continue;
					case "xmlLang":
						Mu(e, l, "xml:lang", c, a, i);
						continue;
					case "xmlSpace":
						Mu(e, l, "xml:space", c, a, i);
						continue;
					case "inert":
						c !== "" || SS[l] || (SS[l] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", l)), Nu(e, l, l, c, a, i);
						continue;
					default: if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") {
						s = rn(l), o = !1, r.context === US && t !== "svg" && t !== "math" ? a.delete(s.toLowerCase()) : (u = l.toLowerCase(), u = zm.hasOwnProperty(u) && zm[u] || null, u !== null && u !== l && (o = !0, a.delete(u)), a.delete(s));
						a: if (u = e, d = s, s = c, ot(d)) if (u.hasAttribute(d)) u = u.getAttribute(d), ke(s, d), s = u === "" + s ? s : u;
						else {
							switch (typeof s) {
								case "function":
								case "symbol": break a;
								case "boolean": if (u = d.toLowerCase().slice(0, 5), u !== "data-" && u !== "aria-") break a;
							}
							s = s === void 0 ? void 0 : null;
						}
						else s = void 0;
						o || yu(l, s, c, i);
					}
				}
			}
			return 0 < a.size && !0 !== n.suppressHydrationWarning && bu(e, a, i), Object.keys(i).length === 0 ? null : i;
		}
		function Ru(e, t) {
			switch (e.length) {
				case 0: return "";
				case 1: return e[0];
				case 2: return e[0] + " " + t + " " + e[1];
				default: return e.slice(0, -1).join(", ") + ", " + t + " " + e[e.length - 1];
			}
		}
		function zu(e) {
			switch (e) {
				case "css":
				case "script":
				case "font":
				case "img":
				case "image":
				case "input":
				case "link": return !0;
				default: return !1;
			}
		}
		function Bu() {
			if (typeof performance.getEntriesByType == "function") {
				for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
					var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
					if (a && s && zu(o)) {
						for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
							var c = n[r], l = c.startTime;
							if (l > s) break;
							var u = c.transferSize, d = c.initiatorType;
							u && zu(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
						}
						if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
					}
				}
				if (0 < e) return t / e / 1e6;
			}
			return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
		}
		function Vu(e) {
			return e.nodeType === 9 ? e : e.ownerDocument;
		}
		function Hu(e) {
			switch (e) {
				case Lm: return WS;
				case Im: return GS;
				default: return US;
			}
		}
		function Uu(e, t) {
			if (e === US) switch (t) {
				case "svg": return WS;
				case "math": return GS;
				default: return US;
			}
			return e === WS && t === "foreignObject" ? US : e;
		}
		function Wu(e, t) {
			return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
		}
		function Gu() {
			var e = window.event;
			return e && e.type === "popstate" ? e === YS ? !1 : (YS = e, !0) : (YS = null, !1);
		}
		function Ku() {
			var e = window.event;
			return e && e !== XS ? e.type : null;
		}
		function qu() {
			var e = window.event;
			return e && e !== XS ? e.timeStamp : -1.1;
		}
		function Ju(e) {
			setTimeout(function() {
				throw e;
			});
		}
		function Yu(e, t, n) {
			switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && e.focus();
					break;
				case "img": n.src ? e.src = n.src : n.srcSet && (e.srcset = n.srcSet);
			}
		}
		function Xu() {}
		function Zu(e, t, n, r) {
			Ou(e, t, n, r), e[Jp] = r;
		}
		function Qu(e) {
			Qt(e, "");
		}
		function $u(e, t, n) {
			e.nodeValue = n;
		}
		function ed(e) {
			if (!e.__reactWarnedAboutChildrenConflict) {
				var t = e[Jp] || null;
				if (t !== null) {
					var n = et(e);
					n !== null && (typeof t.children == "string" || typeof t.children == "number" ? (e.__reactWarnedAboutChildrenConflict = !0, E(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"children\" text content using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})) : t.dangerouslySetInnerHTML != null && (e.__reactWarnedAboutChildrenConflict = !0, E(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"dangerouslySetInnerHTML\" using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})));
				}
			}
		}
		function td(e) {
			return e === "head";
		}
		function nd(e, t) {
			e.removeChild(t);
		}
		function rd(e, t) {
			(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).removeChild(t);
		}
		function id(e, t) {
			var n = t, r = 0;
			do {
				var i = n.nextSibling;
				if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === MS || n === AS) {
					if (r === 0) {
						e.removeChild(i), Cf(t);
						return;
					}
					r--;
				} else if (n === jS || n === NS || n === PS || n === FS || n === kS) r++;
				else if (n === IS) kd(e.ownerDocument.documentElement);
				else if (n === RS) {
					n = e.ownerDocument.head, kd(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[em] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === LS && kd(e.ownerDocument.body);
				n = i;
			} while (n);
			Cf(t);
		}
		function ad(e, t) {
			var n = e;
			e = 0;
			do {
				var r = n.nextSibling;
				if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === MS) {
					if (e === 0) break;
					e--;
				} else n !== jS && n !== NS && n !== PS && n !== FS || e++;
				n = r;
			} while (n);
		}
		function od(e) {
			ad(e, !0);
		}
		function sd(e) {
			e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
		}
		function cd(e) {
			e.nodeValue = "";
		}
		function ld(e) {
			ad(e, !1);
		}
		function ud(e, t) {
			t = t[HS], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
		}
		function dd(e, t) {
			e.nodeValue = t;
		}
		function fd(e) {
			var t = e.firstChild;
			for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
				var n = t;
				switch (t = t.nextSibling, n.nodeName) {
					case "HTML":
					case "HEAD":
					case "BODY":
						fd(n), Qe(n);
						continue;
					case "SCRIPT":
					case "STYLE": continue;
					case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
				}
				e.removeChild(n);
			}
		}
		function pd(e, t, n, r) {
			for (; e.nodeType === 1;) {
				var i = n;
				if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
					if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
				} else if (!r) if (t === "input" && e.type === "hidden") {
					ke(i.name, "name");
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
				else if (!e[em]) switch (t) {
					case "meta":
						if (!e.hasAttribute("itemprop")) break;
						return e;
					case "link":
						if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
						return e;
					case "style":
						if (e.hasAttribute("data-precedence")) break;
						return e;
					case "script":
						if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
						return e;
					default: return e;
				}
				if (e = yd(e.nextSibling), e === null) break;
			}
			return null;
		}
		function md(e, t, n) {
			if (t === "") return null;
			for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = yd(e.nextSibling), e === null)) return null;
			return e;
		}
		function hd(e, t) {
			for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = yd(e.nextSibling), e === null)) return null;
			return e;
		}
		function gd(e) {
			return e.data === NS || e.data === PS;
		}
		function _d(e) {
			return e.data === FS || e.data === NS && e.ownerDocument.readyState !== VS;
		}
		function vd(e, t) {
			var n = e.ownerDocument;
			if (e.data === PS) e._reactRetry = t;
			else if (e.data !== NS || n.readyState !== VS) t();
			else {
				var r = function() {
					t(), n.removeEventListener("DOMContentLoaded", r);
				};
				n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
			}
		}
		function yd(e) {
			for (; e != null; e = e.nextSibling) {
				var t = e.nodeType;
				if (t === 1 || t === 3) break;
				if (t === 8) {
					if (t = e.data, t === jS || t === FS || t === NS || t === PS || t === kS || t === zS || t === BS) break;
					if (t === MS || t === AS) return null;
				}
			}
			return e;
		}
		function bd(e) {
			if (e.nodeType === 1) {
				for (var t = e.nodeName.toLowerCase(), n = {}, r = e.attributes, i = 0; i < r.length; i++) {
					var a = r[i];
					n[ku(a.name)] = a.name.toLowerCase() === "style" ? Au(e) : a.value;
				}
				return {
					type: t,
					props: n
				};
			}
			return e.nodeType === 8 ? e.data === kS ? {
				type: "Activity",
				props: {}
			} : {
				type: "Suspense",
				props: {}
			} : e.nodeValue;
		}
		function xd(e, t, n) {
			return n === null || !0 !== n[OS] ? (e.nodeValue === t ? e = null : (t = Cu(t), e = Cu(e.nodeValue) === t ? null : e.nodeValue), e) : null;
		}
		function Sd(e) {
			e = e.nextSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === MS || n === AS) {
						if (t === 0) return yd(e.nextSibling);
						t--;
					} else n !== jS && n !== FS && n !== NS && n !== PS && n !== kS || t++;
				}
				e = e.nextSibling;
			}
			return null;
		}
		function Cd(e) {
			e = e.previousSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === jS || n === FS || n === NS || n === PS || n === kS) {
						if (t === 0) return e;
						t--;
					} else n !== MS && n !== AS || t++;
				}
				e = e.previousSibling;
			}
			return null;
		}
		function wd(e) {
			Cf(e);
		}
		function Td(e) {
			Cf(e);
		}
		function Ed(e) {
			Cf(e);
		}
		function Dd(e, t, n, r, i) {
			switch (i && Xt(e, r.ancestorInfo), t = Vu(n), e) {
				case "html":
					if (e = t.documentElement, !e) throw Error("React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				case "head":
					if (e = t.head, !e) throw Error("React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				case "body":
					if (e = t.body, !e) throw Error("React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				default: throw Error("resolveSingletonInstance was called with an element type that is not supported. This is a bug in React.");
			}
		}
		function Od(e, t, n, r) {
			if (!n[Yp] && et(n)) {
				var i = n.tagName.toLowerCase();
				console.error("You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.", i, i, i);
			}
			switch (e) {
				case "html":
				case "head":
				case "body": break;
				default: console.error("acquireSingletonInstance was called with an element type that is not supported. This is a bug in React.");
			}
			for (i = n.attributes; i.length;) n.removeAttributeNode(i[0]);
			Du(n, e, t), n[qp] = r, n[Jp] = t;
		}
		function kd(e) {
			for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
			Qe(e);
		}
		function Ad(e) {
			return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
		}
		function jd(e, t, n) {
			var r = dC;
			if (r && typeof t == "string" && t) {
				var i = _t(t);
				i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), lC.has(i) || (lC.add(i), e = {
					rel: e,
					crossOrigin: n,
					href: t
				}, r.querySelector(i) === null && (t = r.createElement("link"), Du(t, "link", e), rt(t), r.head.appendChild(t)));
			}
		}
		function Md(e, t, n, r) {
			var i = (i = np.current) ? Ad(i) : null;
			if (!i) throw Error("\"resourceRoot\" was expected to exist. This is a bug in React.");
			switch (e) {
				case "meta":
				case "title": return null;
				case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = R(n.href), t = nt(i).hoistableStyles, r = t.get(n), r || (r = {
					type: "style",
					instance: null,
					count: 0,
					state: null
				}, t.set(n, r)), r) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				case "link":
					if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
						e = R(n.href);
						var a = nt(i).hoistableStyles, o = a.get(e);
						if (!o && (i = i.ownerDocument || i, o = {
							type: "stylesheet",
							instance: null,
							count: 0,
							state: {
								loading: rC,
								preload: null
							}
						}, a.set(e, o), (a = i.querySelector(Pd(e))) && !a._p && (o.instance = a, o.state.loading = iC | sC), !cC.has(e))) {
							var s = {
								rel: "preload",
								as: "style",
								href: n.href,
								crossOrigin: n.crossOrigin,
								integrity: n.integrity,
								media: n.media,
								hrefLang: n.hrefLang,
								referrerPolicy: n.referrerPolicy
							};
							cC.set(e, s), a || Id(i, e, s, o.state);
						}
						if (t && r === null) throw n = "\n\n  - " + Nd(t) + "\n  + " + Nd(n), Error("Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
						return o;
					}
					if (t && r !== null) throw n = "\n\n  - " + Nd(t) + "\n  + " + Nd(n), Error("Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
					return null;
				case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Ld(n), t = nt(i).hoistableScripts, r = t.get(n), r || (r = {
					type: "script",
					instance: null,
					count: 0,
					state: null
				}, t.set(n, r)), r) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				default: throw Error("getResource encountered a type it did not expect: \"" + e + "\". this is a bug in React.");
			}
		}
		function Nd(e) {
			var t = 0, n = "<link";
			return typeof e.rel == "string" ? (t++, n += " rel=\"" + e.rel + "\"") : vp.call(e, "rel") && (t++, n += " rel=\"" + (e.rel === null ? "null" : "invalid type " + typeof e.rel) + "\""), typeof e.href == "string" ? (t++, n += " href=\"" + e.href + "\"") : vp.call(e, "href") && (t++, n += " href=\"" + (e.href === null ? "null" : "invalid type " + typeof e.href) + "\""), typeof e.precedence == "string" ? (t++, n += " precedence=\"" + e.precedence + "\"") : vp.call(e, "precedence") && (t++, n += " precedence={" + (e.precedence === null ? "null" : "invalid type " + typeof e.precedence) + "}"), Object.getOwnPropertyNames(e).length > t && (n += " ..."), n + " />";
		}
		function R(e) {
			return "href=\"" + _t(e) + "\"";
		}
		function Pd(e) {
			return "link[rel=\"stylesheet\"][" + e + "]";
		}
		function Fd(e) {
			return z({}, e, {
				"data-precedence": e.precedence,
				precedence: null
			});
		}
		function Id(e, t, n, r) {
			e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = iC : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
				return r.loading |= iC;
			}), t.addEventListener("error", function() {
				return r.loading |= aC;
			}), Du(t, "link", n), rt(t), e.head.appendChild(t));
		}
		function Ld(e) {
			return "[src=\"" + _t(e) + "\"]";
		}
		function Rd(e) {
			return "script[async]" + e;
		}
		function zd(e, t, n) {
			if (t.count++, t.instance === null) switch (t.type) {
				case "style":
					var r = e.querySelector("style[data-href~=\"" + _t(n.href) + "\"]");
					if (r) return t.instance = r, rt(r), r;
					var i = z({}, n, {
						"data-href": n.href,
						"data-precedence": n.precedence,
						href: null,
						precedence: null
					});
					return r = (e.ownerDocument || e).createElement("style"), rt(r), Du(r, "style", i), Bd(r, n.precedence, e), t.instance = r;
				case "stylesheet":
					i = R(n.href);
					var a = e.querySelector(Pd(i));
					if (a) return t.state.loading |= sC, t.instance = a, rt(a), a;
					r = Fd(n), (i = cC.get(i)) && Vd(r, i), a = (e.ownerDocument || e).createElement("link"), rt(a);
					var o = a;
					return o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Du(a, "link", r), t.state.loading |= sC, Bd(a, n.precedence, e), t.instance = a;
				case "script": return a = Ld(n.src), (i = e.querySelector(Rd(a))) ? (t.instance = i, rt(i), i) : (r = n, (i = cC.get(a)) && (r = z({}, n), Hd(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), rt(i), Du(i, "link", r), e.head.appendChild(i), t.instance = i);
				case "void": return null;
				default: throw Error("acquireResource encountered a resource type it did not expect: \"" + t.type + "\". this is a bug in React.");
			}
			else t.type === "stylesheet" && (t.state.loading & sC) === rC && (r = t.instance, t.state.loading |= sC, Bd(r, n.precedence, e));
			return t.instance;
		}
		function Bd(e, t, n) {
			for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
				var s = r[o];
				if (s.dataset.precedence === t) a = s;
				else if (a !== i) break;
			}
			a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
		}
		function Vd(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
		}
		function Hd(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
		}
		function Ud(e, t, n) {
			if (fC === null) {
				var r = /* @__PURE__ */ new Map(), i = fC = /* @__PURE__ */ new Map();
				i.set(n, r);
			} else i = fC, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
			if (r.has(e)) return r;
			for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
				var a = n[i];
				if (!(a[em] || a[qp] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== Lm) {
					var o = a.getAttribute(t) || "";
					o = e + o;
					var s = r.get(o);
					s ? s.push(a) : r.set(o, [a]);
				}
			}
			return r;
		}
		function Wd(e, t, n) {
			e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
		}
		function Gd(e, t, n) {
			var r = !n.ancestorInfo.containerTagInScope;
			if (n.context === WS || t.itemProp != null) return !r || t.itemProp == null || e !== "meta" && e !== "title" && e !== "style" && e !== "link" && e !== "script" || console.error("Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.", e, e), !1;
			switch (e) {
				case "meta":
				case "title": return !0;
				case "style":
					if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") {
						r && console.error("Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel=\"stylesheet\" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence=\"default\"` and `href=\"some unique resource identifier\"`.");
						break;
					}
					return !0;
				case "link":
					if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) {
						if (t.rel === "stylesheet" && typeof t.precedence == "string") {
							e = t.href;
							var i = t.onError, a = t.disabled;
							n = [], t.onLoad && n.push("`onLoad`"), i && n.push("`onError`"), a != null && n.push("`disabled`"), i = Ru(n, "and"), i += n.length === 1 ? " prop" : " props", a = n.length === 1 ? "an " + i : "the " + i, n.length && console.error("React encountered a <link rel=\"stylesheet\" href=\"%s\" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.", e, a, i);
						}
						r && (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" ? console.error("Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag") : (t.onError || t.onLoad) && console.error("Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."));
						break;
					}
					switch (t.rel) {
						case "stylesheet": return e = t.precedence, t = t.disabled, typeof e != "string" && r && console.error("Cannot render a <link rel=\"stylesheet\" /> outside the main document without knowing its precedence. Consider adding precedence=\"default\" or moving it into the root <head> tag."), typeof e == "string" && t == null;
						default: return !0;
					}
				case "script":
					if (e = t.async && typeof t.async != "function" && typeof t.async != "symbol", !e || t.onLoad || t.onError || !t.src || typeof t.src != "string") {
						r && (e ? t.onLoad || t.onError ? console.error("Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>.") : console.error("Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>.") : console.error("Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async=\"\" or moving it into the root <head> tag."));
						break;
					}
					return !0;
				case "noscript":
				case "template": r && console.error("Cannot render <%s> outside the main document. Try moving it into the root <head> tag.", e);
			}
			return !1;
		}
		function Kd(e) {
			return !(e.type === "stylesheet" && (e.state.loading & oC) === rC);
		}
		function qd(e, t, n, r) {
			if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && (n.state.loading & sC) === rC) {
				if (n.instance === null) {
					var i = R(r.href), a = t.querySelector(Pd(i));
					if (a) {
						t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Yd.bind(e), t.then(e, e)), n.state.loading |= sC, n.instance = a, rt(a);
						return;
					}
					a = t.ownerDocument || t, r = Fd(r), (i = cC.get(i)) && Vd(r, i), a = a.createElement("link"), rt(a);
					var o = a;
					o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Du(a, "link", r), n.instance = a;
				}
				e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & oC) === rC && (e.count++, n = Yd.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
			}
		}
		function Jd(e, t) {
			return e.stylesheets && e.count === 0 && Xd(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
				var r = setTimeout(function() {
					if (e.stylesheets && Xd(e, e.stylesheets), e.unsuspend) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, pC + t);
				0 < e.imgBytes && gC === 0 && (gC = 125 * Bu() * hC);
				var i = setTimeout(function() {
					if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xd(e, e.stylesheets), e.unsuspend)) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, (e.imgBytes > gC ? 50 : mC) + t);
				return e.unsuspend = n, function() {
					e.unsuspend = null, clearTimeout(r), clearTimeout(i);
				};
			} : null;
		}
		function Yd() {
			if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
				if (this.stylesheets) Xd(this, this.stylesheets);
				else if (this.unsuspend) {
					var e = this.unsuspend;
					this.unsuspend = null, e();
				}
			}
		}
		function Xd(e, t) {
			e.stylesheets = null, e.unsuspend !== null && (e.count++, vC = /* @__PURE__ */ new Map(), t.forEach(Zd, e), vC = null, Yd.call(e));
		}
		function Zd(e, t) {
			if (!(t.state.loading & sC)) {
				var n = vC.get(e);
				if (n) var r = n.get(_C);
				else {
					n = /* @__PURE__ */ new Map(), vC.set(e, n);
					for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
						var o = i[a];
						(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
					}
					r && n.set(_C, r);
				}
				i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(_C, i), n.set(o, i), this.count++, r = Yd.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= sC;
			}
		}
		function Qd(e, t, n, r, i, a, o, s, c) {
			for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = $S, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Be(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Be(0), this.hiddenUpdates = Be(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
			this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
		}
		function $d(e, t, n, r, i, a, o, s, c, l, u, d) {
			return e = new Qd(e, t, n, o, c, l, u, d, s), t = Rg, !0 === a && (t |= zg | Bg), t |= W, a = h(3, null, null, t), e.current = a, a.stateNode = e, t = ui(), di(t), e.pooledCache = t, di(t), a.memoizedState = {
				element: r,
				isDehydrated: n,
				cache: t
			}, ta(a), e;
		}
		function ef(e) {
			return e ? (e = Fg, e) : Fg;
		}
		function tf(e, t, n, r, i, a) {
			if (Np && typeof Np.onScheduleFiberRoot == "function") try {
				Np.onScheduleFiberRoot(Mp, r, n);
			} catch (e) {
				Pp || (Pp = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			i = ef(i), r.context === null ? r.context = i : r.pendingContext = i, _p && gp !== null && !EC && (EC = !0, console.error("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", C(gp) || "Unknown")), r = ra(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", a), r.callback = a), n = ia(e, r, t), n !== null && (pi(t, "root.render()", null), ol(n, e, t), aa(n, e, t));
		}
		function nf(e, t) {
			if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
				var n = e.retryLane;
				e.retryLane = n !== 0 && n < t ? n : t;
			}
		}
		function rf(e, t) {
			nf(e, t), (e = e.alternate) && nf(e, t);
		}
		function af(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = gr(e, 67108864);
				t !== null && ol(t, e, 67108864), rf(e, 67108864);
			}
		}
		function of(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = il(e);
				t = Ke(t);
				var n = gr(e, t);
				n !== null && ol(n, e, t), rf(e, t);
			}
		}
		function sf() {
			return gp;
		}
		function cf(e, t, n, r) {
			var i = B.T;
			B.T = null;
			var a = Yf.p;
			try {
				Yf.p = Hp, uf(e, t, n, r);
			} finally {
				Yf.p = a, B.T = i;
			}
		}
		function lf(e, t, n, r) {
			var i = B.T;
			B.T = null;
			var a = Yf.p;
			try {
				Yf.p = Up, uf(e, t, n, r);
			} finally {
				Yf.p = a, B.T = i;
			}
		}
		function uf(e, t, n, r) {
			if (LC) {
				var i = df(r);
				if (i === null) pu(e, t, r, RC, n), mf(e, r);
				else if (gf(i, e, t, n, r)) r.stopPropagation();
				else if (mf(e, r), t & 4 && -1 < KC.indexOf(e)) {
					for (; i !== null;) {
						var a = et(i);
						if (a !== null) switch (a.tag) {
							case 3:
								if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
									var o = Fe(a.pendingLanes);
									if (o !== 0) {
										var s = a;
										for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
											var c = 1 << 31 - Ip(o);
											s.entanglements[1] |= c, o &= ~c;
										}
										P(a), (Z & (Fb | Ib)) === Pb && (yx = Cp() + bx, F(0, !1));
									}
								}
								break;
							case 31:
							case 13: s = gr(a, 2), s !== null && ol(s, a, 2), dl(), rf(a, 2);
						}
						if (a = df(r), a === null && pu(e, t, r, RC, n), a === i) break;
						i = a;
					}
					i !== null && r.stopPropagation();
				} else pu(e, t, r, null, n);
			}
		}
		function df(e) {
			return e = dn(e), ff(e);
		}
		function ff(e) {
			if (RC = null, e = $e(e), e !== null) {
				var t = b(e);
				if (t === null) e = null;
				else {
					var n = t.tag;
					if (n === 13) {
						if (e = x(t), e !== null) return e;
						e = null;
					} else if (n === 31) {
						if (e = ee(t), e !== null) return e;
						e = null;
					} else if (n === 3) {
						if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
						e = null;
					} else t !== e && (e = null);
				}
			}
			return RC = e, null;
		}
		function pf(e) {
			switch (e) {
				case "beforetoggle":
				case "cancel":
				case "click":
				case "close":
				case "contextmenu":
				case "copy":
				case "cut":
				case "auxclick":
				case "dblclick":
				case "dragend":
				case "dragstart":
				case "drop":
				case "focusin":
				case "focusout":
				case "input":
				case "invalid":
				case "keydown":
				case "keypress":
				case "keyup":
				case "mousedown":
				case "mouseup":
				case "paste":
				case "pause":
				case "play":
				case "pointercancel":
				case "pointerdown":
				case "pointerup":
				case "ratechange":
				case "reset":
				case "resize":
				case "seeked":
				case "submit":
				case "toggle":
				case "touchcancel":
				case "touchend":
				case "touchstart":
				case "volumechange":
				case "change":
				case "selectionchange":
				case "textInput":
				case "compositionstart":
				case "compositionend":
				case "compositionupdate":
				case "beforeblur":
				case "afterblur":
				case "beforeinput":
				case "blur":
				case "fullscreenchange":
				case "focus":
				case "hashchange":
				case "popstate":
				case "select":
				case "selectstart": return Hp;
				case "drag":
				case "dragenter":
				case "dragexit":
				case "dragleave":
				case "dragover":
				case "mousemove":
				case "mouseout":
				case "mouseover":
				case "pointermove":
				case "pointerout":
				case "pointerover":
				case "scroll":
				case "touchmove":
				case "wheel":
				case "mouseenter":
				case "mouseleave":
				case "pointerenter":
				case "pointerleave": return Up;
				case "message": switch (wp()) {
					case Tp: return Hp;
					case Ep: return Up;
					case Dp:
					case Op: return Wp;
					case kp: return Gp;
					default: return Wp;
				}
				default: return Wp;
			}
		}
		function mf(e, t) {
			switch (e) {
				case "focusin":
				case "focusout":
					BC = null;
					break;
				case "dragenter":
				case "dragleave":
					VC = null;
					break;
				case "mouseover":
				case "mouseout":
					HC = null;
					break;
				case "pointerover":
				case "pointerout":
					UC.delete(t.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture": WC.delete(t.pointerId);
			}
		}
		function hf(e, t, n, r, i, a) {
			return e === null || e.nativeEvent !== a ? (e = {
				blockedOn: t,
				domEventName: n,
				eventSystemFlags: r,
				nativeEvent: a,
				targetContainers: [i]
			}, t !== null && (t = et(t), t !== null && af(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
		}
		function gf(e, t, n, r, i) {
			switch (t) {
				case "focusin": return BC = hf(BC, e, t, n, r, i), !0;
				case "dragenter": return VC = hf(VC, e, t, n, r, i), !0;
				case "mouseover": return HC = hf(HC, e, t, n, r, i), !0;
				case "pointerover":
					var a = i.pointerId;
					return UC.set(a, hf(UC.get(a) || null, e, t, n, r, i)), !0;
				case "gotpointercapture": return a = i.pointerId, WC.set(a, hf(WC.get(a) || null, e, t, n, r, i)), !0;
			}
			return !1;
		}
		function _f(e) {
			var t = $e(e.target);
			if (t !== null) {
				var n = b(t);
				if (n !== null) {
					if (t = n.tag, t === 13) {
						if (t = x(n), t !== null) {
							e.blockedOn = t, Ze(e.priority, function() {
								of(n);
							});
							return;
						}
					} else if (t === 31) {
						if (t = ee(n), t !== null) {
							e.blockedOn = t, Ze(e.priority, function() {
								of(n);
							});
							return;
						}
					} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
						e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
						return;
					}
				}
			}
			e.blockedOn = null;
		}
		function vf(e) {
			if (e.blockedOn !== null) return !1;
			for (var t = e.targetContainers; 0 < t.length;) {
				var n = df(e.nativeEvent);
				if (n === null) {
					n = e.nativeEvent;
					var r = new n.constructor(n.type, n), i = r;
					Zm !== null && console.error("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Zm = i, n.target.dispatchEvent(r), Zm === null && console.error("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Zm = null;
				} else return t = et(n), t !== null && af(t), e.blockedOn = n, !1;
				t.shift();
			}
			return !0;
		}
		function yf(e, t, n) {
			vf(e) && n.delete(t);
		}
		function bf() {
			zC = !1, BC !== null && vf(BC) && (BC = null), VC !== null && vf(VC) && (VC = null), HC !== null && vf(HC) && (HC = null), UC.forEach(yf), WC.forEach(yf);
		}
		function xf(e, t) {
			e.blockedOn === t && (e.blockedOn = null, zC || (zC = !0, Of.unstable_scheduleCallback(Of.unstable_NormalPriority, bf)));
		}
		function Sf(e) {
			qC !== e && (qC = e, Of.unstable_scheduleCallback(Of.unstable_NormalPriority, function() {
				qC === e && (qC = null);
				for (var t = 0; t < e.length; t += 3) {
					var n = e[t], r = e[t + 1], i = e[t + 2];
					if (typeof r != "function") {
						if (ff(r || n) === null) continue;
						break;
					}
					var a = et(n);
					a !== null && (e.splice(t, 3), t -= 3, n = {
						pending: !0,
						data: i,
						method: n.method,
						action: r
					}, Object.freeze(n), Lo(a, n, r, i));
				}
			}));
		}
		function Cf(e) {
			function t(t) {
				return xf(t, e);
			}
			BC !== null && xf(BC, e), VC !== null && xf(VC, e), HC !== null && xf(HC, e), UC.forEach(t), WC.forEach(t);
			for (var n = 0; n < GC.length; n++) {
				var r = GC[n];
				r.blockedOn === e && (r.blockedOn = null);
			}
			for (; 0 < GC.length && (n = GC[0], n.blockedOn === null);) _f(n), n.blockedOn === null && GC.shift();
			if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
				var i = n[r], a = n[r + 1], o = i[Jp] || null;
				if (typeof a == "function") o || Sf(n);
				else if (o) {
					var s = null;
					if (a && a.hasAttribute("formAction")) {
						if (i = a, o = a[Jp] || null) s = o.formAction;
						else if (ff(i) !== null) continue;
					} else s = o.action;
					typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Sf(n);
				}
			}
		}
		function wf() {
			function e(e) {
				e.canIntercept && e.info === "react-transition" && e.intercept({
					handler: function() {
						return new Promise(function(e) {
							return i = e;
						});
					},
					focusReset: "manual",
					scroll: "manual"
				});
			}
			function t() {
				i !== null && (i(), i = null), r || setTimeout(n, 20);
			}
			function n() {
				if (!r && !navigation.transition) {
					var e = navigation.currentEntry;
					e && e.url != null && navigation.navigate(e.url, {
						state: e.getState(),
						info: "react-transition",
						history: "replace"
					});
				}
			}
			if (typeof navigation == "object") {
				var r = !1, i = null;
				return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
					r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
				};
			}
		}
		function Tf(e) {
			this._internalRoot = e;
		}
		function Ef(e) {
			this._internalRoot = e;
		}
		function Df(e) {
			e[Yp] && (e._reactRootContainer ? console.error("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : console.error("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var Of = i(), kf = r(), Af = ne(), z = Object.assign, jf = Symbol.for("react.element"), Mf = Symbol.for("react.transitional.element"), Nf = Symbol.for("react.portal"), Pf = Symbol.for("react.fragment"), Ff = Symbol.for("react.strict_mode"), If = Symbol.for("react.profiler"), Lf = Symbol.for("react.consumer"), Rf = Symbol.for("react.context"), zf = Symbol.for("react.forward_ref"), Bf = Symbol.for("react.suspense"), Vf = Symbol.for("react.suspense_list"), Hf = Symbol.for("react.memo"), Uf = Symbol.for("react.lazy"), Wf = Symbol.for("react.activity"), Gf = Symbol.for("react.memo_cache_sentinel"), Kf = Symbol.iterator, qf = Symbol.for("react.client.reference"), Jf = Array.isArray, B = kf.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Yf = Af.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Xf = Object.freeze({
			pending: !1,
			data: null,
			method: null,
			action: null
		}), Zf = [], Qf = [], $f = -1, ep = se(null), tp = se(null), np = se(null), rp = se(null), ip = 0, ap, op, sp, cp, lp, up, dp;
		me.__reactDisabledLog = !0;
		var fp, pp, mp = !1, hp = new (typeof WeakMap == "function" ? WeakMap : Map)(), gp = null, _p = !1, vp = Object.prototype.hasOwnProperty, yp = Of.unstable_scheduleCallback, bp = Of.unstable_cancelCallback, xp = Of.unstable_shouldYield, Sp = Of.unstable_requestPaint, Cp = Of.unstable_now, wp = Of.unstable_getCurrentPriorityLevel, Tp = Of.unstable_ImmediatePriority, Ep = Of.unstable_UserBlockingPriority, Dp = Of.unstable_NormalPriority, Op = Of.unstable_LowPriority, kp = Of.unstable_IdlePriority, Ap = Of.log, jp = Of.unstable_setDisableYieldValue, Mp = null, Np = null, Pp = !1, Fp = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", Ip = Math.clz32 ? Math.clz32 : Pe, Lp = Math.log, Rp = Math.LN2, zp = 256, Bp = 262144, Vp = 4194304, Hp = 2, Up = 8, Wp = 32, Gp = 268435456, Kp = Math.random().toString(36).slice(2), qp = "__reactFiber$" + Kp, Jp = "__reactProps$" + Kp, Yp = "__reactContainer$" + Kp, Xp = "__reactEvents$" + Kp, Zp = "__reactListeners$" + Kp, Qp = "__reactHandles$" + Kp, $p = "__reactResources$" + Kp, em = "__reactMarker$" + Kp, tm = /* @__PURE__ */ new Set(), nm = {}, rm = {}, im = {
			button: !0,
			checkbox: !0,
			image: !0,
			hidden: !0,
			radio: !0,
			reset: !0,
			submit: !0
		}, am = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), om = {}, sm = {}, cm = /[\n"\\]/g, lm = !1, um = !1, dm = !1, fm = !1, pm = !1, mm = !1, hm = ["value", "defaultValue"], gm = !1, _m = /["'&<>\n\t]|^\s|\s$/, vm = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(" "), ym = "applet caption html table td th marquee object template foreignObject desc title".split(" "), bm = ym.concat(["button"]), xm = "dd dt li option optgroup p rp rt".split(" "), Sm = {
			current: null,
			formTag: null,
			aTagInScope: null,
			buttonTagInScope: null,
			nobrTagInScope: null,
			pTagInButtonScope: null,
			listItemTagAutoclosing: null,
			dlItemTagAutoclosing: null,
			containerTagInScope: null,
			implicitRootScope: !1
		}, Cm = {}, wm = {
			animation: "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(" "),
			background: "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(" "),
			backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
			border: "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(" "),
			borderBlockEnd: [
				"borderBlockEndColor",
				"borderBlockEndStyle",
				"borderBlockEndWidth"
			],
			borderBlockStart: [
				"borderBlockStartColor",
				"borderBlockStartStyle",
				"borderBlockStartWidth"
			],
			borderBottom: [
				"borderBottomColor",
				"borderBottomStyle",
				"borderBottomWidth"
			],
			borderColor: [
				"borderBottomColor",
				"borderLeftColor",
				"borderRightColor",
				"borderTopColor"
			],
			borderImage: [
				"borderImageOutset",
				"borderImageRepeat",
				"borderImageSlice",
				"borderImageSource",
				"borderImageWidth"
			],
			borderInlineEnd: [
				"borderInlineEndColor",
				"borderInlineEndStyle",
				"borderInlineEndWidth"
			],
			borderInlineStart: [
				"borderInlineStartColor",
				"borderInlineStartStyle",
				"borderInlineStartWidth"
			],
			borderLeft: [
				"borderLeftColor",
				"borderLeftStyle",
				"borderLeftWidth"
			],
			borderRadius: [
				"borderBottomLeftRadius",
				"borderBottomRightRadius",
				"borderTopLeftRadius",
				"borderTopRightRadius"
			],
			borderRight: [
				"borderRightColor",
				"borderRightStyle",
				"borderRightWidth"
			],
			borderStyle: [
				"borderBottomStyle",
				"borderLeftStyle",
				"borderRightStyle",
				"borderTopStyle"
			],
			borderTop: [
				"borderTopColor",
				"borderTopStyle",
				"borderTopWidth"
			],
			borderWidth: [
				"borderBottomWidth",
				"borderLeftWidth",
				"borderRightWidth",
				"borderTopWidth"
			],
			columnRule: [
				"columnRuleColor",
				"columnRuleStyle",
				"columnRuleWidth"
			],
			columns: ["columnCount", "columnWidth"],
			flex: [
				"flexBasis",
				"flexGrow",
				"flexShrink"
			],
			flexFlow: ["flexDirection", "flexWrap"],
			font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(" "),
			fontVariant: "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(" "),
			gap: ["columnGap", "rowGap"],
			grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(" "),
			gridArea: [
				"gridColumnEnd",
				"gridColumnStart",
				"gridRowEnd",
				"gridRowStart"
			],
			gridColumn: ["gridColumnEnd", "gridColumnStart"],
			gridColumnGap: ["columnGap"],
			gridGap: ["columnGap", "rowGap"],
			gridRow: ["gridRowEnd", "gridRowStart"],
			gridRowGap: ["rowGap"],
			gridTemplate: [
				"gridTemplateAreas",
				"gridTemplateColumns",
				"gridTemplateRows"
			],
			listStyle: [
				"listStyleImage",
				"listStylePosition",
				"listStyleType"
			],
			margin: [
				"marginBottom",
				"marginLeft",
				"marginRight",
				"marginTop"
			],
			marker: [
				"markerEnd",
				"markerMid",
				"markerStart"
			],
			mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(" "),
			maskPosition: ["maskPositionX", "maskPositionY"],
			outline: [
				"outlineColor",
				"outlineStyle",
				"outlineWidth"
			],
			overflow: ["overflowX", "overflowY"],
			padding: [
				"paddingBottom",
				"paddingLeft",
				"paddingRight",
				"paddingTop"
			],
			placeContent: ["alignContent", "justifyContent"],
			placeItems: ["alignItems", "justifyItems"],
			placeSelf: ["alignSelf", "justifySelf"],
			textDecoration: [
				"textDecorationColor",
				"textDecorationLine",
				"textDecorationStyle"
			],
			textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
			transition: [
				"transitionDelay",
				"transitionDuration",
				"transitionProperty",
				"transitionTimingFunction"
			],
			wordWrap: ["overflowWrap"]
		}, Tm = /([A-Z])/g, Em = /^ms-/, Dm = /^(?:webkit|moz|o)[A-Z]/, Om = /^-ms-/, km = /-(.)/g, Am = /;\s*$/, jm = {}, Mm = {}, Nm = !1, Pm = !1, Fm = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), Im = "http://www.w3.org/1998/Math/MathML", Lm = "http://www.w3.org/2000/svg", Rm = /* @__PURE__ */ new Map([
			["acceptCharset", "accept-charset"],
			["htmlFor", "for"],
			["httpEquiv", "http-equiv"],
			["crossOrigin", "crossorigin"],
			["accentHeight", "accent-height"],
			["alignmentBaseline", "alignment-baseline"],
			["arabicForm", "arabic-form"],
			["baselineShift", "baseline-shift"],
			["capHeight", "cap-height"],
			["clipPath", "clip-path"],
			["clipRule", "clip-rule"],
			["colorInterpolation", "color-interpolation"],
			["colorInterpolationFilters", "color-interpolation-filters"],
			["colorProfile", "color-profile"],
			["colorRendering", "color-rendering"],
			["dominantBaseline", "dominant-baseline"],
			["enableBackground", "enable-background"],
			["fillOpacity", "fill-opacity"],
			["fillRule", "fill-rule"],
			["floodColor", "flood-color"],
			["floodOpacity", "flood-opacity"],
			["fontFamily", "font-family"],
			["fontSize", "font-size"],
			["fontSizeAdjust", "font-size-adjust"],
			["fontStretch", "font-stretch"],
			["fontStyle", "font-style"],
			["fontVariant", "font-variant"],
			["fontWeight", "font-weight"],
			["glyphName", "glyph-name"],
			["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
			["glyphOrientationVertical", "glyph-orientation-vertical"],
			["horizAdvX", "horiz-adv-x"],
			["horizOriginX", "horiz-origin-x"],
			["imageRendering", "image-rendering"],
			["letterSpacing", "letter-spacing"],
			["lightingColor", "lighting-color"],
			["markerEnd", "marker-end"],
			["markerMid", "marker-mid"],
			["markerStart", "marker-start"],
			["overlinePosition", "overline-position"],
			["overlineThickness", "overline-thickness"],
			["paintOrder", "paint-order"],
			["panose-1", "panose-1"],
			["pointerEvents", "pointer-events"],
			["renderingIntent", "rendering-intent"],
			["shapeRendering", "shape-rendering"],
			["stopColor", "stop-color"],
			["stopOpacity", "stop-opacity"],
			["strikethroughPosition", "strikethrough-position"],
			["strikethroughThickness", "strikethrough-thickness"],
			["strokeDasharray", "stroke-dasharray"],
			["strokeDashoffset", "stroke-dashoffset"],
			["strokeLinecap", "stroke-linecap"],
			["strokeLinejoin", "stroke-linejoin"],
			["strokeMiterlimit", "stroke-miterlimit"],
			["strokeOpacity", "stroke-opacity"],
			["strokeWidth", "stroke-width"],
			["textAnchor", "text-anchor"],
			["textDecoration", "text-decoration"],
			["textRendering", "text-rendering"],
			["transformOrigin", "transform-origin"],
			["underlinePosition", "underline-position"],
			["underlineThickness", "underline-thickness"],
			["unicodeBidi", "unicode-bidi"],
			["unicodeRange", "unicode-range"],
			["unitsPerEm", "units-per-em"],
			["vAlphabetic", "v-alphabetic"],
			["vHanging", "v-hanging"],
			["vIdeographic", "v-ideographic"],
			["vMathematical", "v-mathematical"],
			["vectorEffect", "vector-effect"],
			["vertAdvY", "vert-adv-y"],
			["vertOriginX", "vert-origin-x"],
			["vertOriginY", "vert-origin-y"],
			["wordSpacing", "word-spacing"],
			["writingMode", "writing-mode"],
			["xmlnsXlink", "xmlns:xlink"],
			["xHeight", "x-height"]
		]), zm = {
			accept: "accept",
			acceptcharset: "acceptCharset",
			"accept-charset": "acceptCharset",
			accesskey: "accessKey",
			action: "action",
			allowfullscreen: "allowFullScreen",
			alt: "alt",
			as: "as",
			async: "async",
			autocapitalize: "autoCapitalize",
			autocomplete: "autoComplete",
			autocorrect: "autoCorrect",
			autofocus: "autoFocus",
			autoplay: "autoPlay",
			autosave: "autoSave",
			capture: "capture",
			cellpadding: "cellPadding",
			cellspacing: "cellSpacing",
			challenge: "challenge",
			charset: "charSet",
			checked: "checked",
			children: "children",
			cite: "cite",
			class: "className",
			classid: "classID",
			classname: "className",
			cols: "cols",
			colspan: "colSpan",
			content: "content",
			contenteditable: "contentEditable",
			contextmenu: "contextMenu",
			controls: "controls",
			controlslist: "controlsList",
			coords: "coords",
			crossorigin: "crossOrigin",
			dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
			data: "data",
			datetime: "dateTime",
			default: "default",
			defaultchecked: "defaultChecked",
			defaultvalue: "defaultValue",
			defer: "defer",
			dir: "dir",
			disabled: "disabled",
			disablepictureinpicture: "disablePictureInPicture",
			disableremoteplayback: "disableRemotePlayback",
			download: "download",
			draggable: "draggable",
			enctype: "encType",
			enterkeyhint: "enterKeyHint",
			fetchpriority: "fetchPriority",
			for: "htmlFor",
			form: "form",
			formmethod: "formMethod",
			formaction: "formAction",
			formenctype: "formEncType",
			formnovalidate: "formNoValidate",
			formtarget: "formTarget",
			frameborder: "frameBorder",
			headers: "headers",
			height: "height",
			hidden: "hidden",
			high: "high",
			href: "href",
			hreflang: "hrefLang",
			htmlfor: "htmlFor",
			httpequiv: "httpEquiv",
			"http-equiv": "httpEquiv",
			icon: "icon",
			id: "id",
			imagesizes: "imageSizes",
			imagesrcset: "imageSrcSet",
			inert: "inert",
			innerhtml: "innerHTML",
			inputmode: "inputMode",
			integrity: "integrity",
			is: "is",
			itemid: "itemID",
			itemprop: "itemProp",
			itemref: "itemRef",
			itemscope: "itemScope",
			itemtype: "itemType",
			keyparams: "keyParams",
			keytype: "keyType",
			kind: "kind",
			label: "label",
			lang: "lang",
			list: "list",
			loop: "loop",
			low: "low",
			manifest: "manifest",
			marginwidth: "marginWidth",
			marginheight: "marginHeight",
			max: "max",
			maxlength: "maxLength",
			media: "media",
			mediagroup: "mediaGroup",
			method: "method",
			min: "min",
			minlength: "minLength",
			multiple: "multiple",
			muted: "muted",
			name: "name",
			nomodule: "noModule",
			nonce: "nonce",
			novalidate: "noValidate",
			open: "open",
			optimum: "optimum",
			pattern: "pattern",
			placeholder: "placeholder",
			playsinline: "playsInline",
			poster: "poster",
			preload: "preload",
			profile: "profile",
			radiogroup: "radioGroup",
			readonly: "readOnly",
			referrerpolicy: "referrerPolicy",
			rel: "rel",
			required: "required",
			reversed: "reversed",
			role: "role",
			rows: "rows",
			rowspan: "rowSpan",
			sandbox: "sandbox",
			scope: "scope",
			scoped: "scoped",
			scrolling: "scrolling",
			seamless: "seamless",
			selected: "selected",
			shape: "shape",
			size: "size",
			sizes: "sizes",
			span: "span",
			spellcheck: "spellCheck",
			src: "src",
			srcdoc: "srcDoc",
			srclang: "srcLang",
			srcset: "srcSet",
			start: "start",
			step: "step",
			style: "style",
			summary: "summary",
			tabindex: "tabIndex",
			target: "target",
			title: "title",
			type: "type",
			usemap: "useMap",
			value: "value",
			width: "width",
			wmode: "wmode",
			wrap: "wrap",
			about: "about",
			accentheight: "accentHeight",
			"accent-height": "accentHeight",
			accumulate: "accumulate",
			additive: "additive",
			alignmentbaseline: "alignmentBaseline",
			"alignment-baseline": "alignmentBaseline",
			allowreorder: "allowReorder",
			alphabetic: "alphabetic",
			amplitude: "amplitude",
			arabicform: "arabicForm",
			"arabic-form": "arabicForm",
			ascent: "ascent",
			attributename: "attributeName",
			attributetype: "attributeType",
			autoreverse: "autoReverse",
			azimuth: "azimuth",
			basefrequency: "baseFrequency",
			baselineshift: "baselineShift",
			"baseline-shift": "baselineShift",
			baseprofile: "baseProfile",
			bbox: "bbox",
			begin: "begin",
			bias: "bias",
			by: "by",
			calcmode: "calcMode",
			capheight: "capHeight",
			"cap-height": "capHeight",
			clip: "clip",
			clippath: "clipPath",
			"clip-path": "clipPath",
			clippathunits: "clipPathUnits",
			cliprule: "clipRule",
			"clip-rule": "clipRule",
			color: "color",
			colorinterpolation: "colorInterpolation",
			"color-interpolation": "colorInterpolation",
			colorinterpolationfilters: "colorInterpolationFilters",
			"color-interpolation-filters": "colorInterpolationFilters",
			colorprofile: "colorProfile",
			"color-profile": "colorProfile",
			colorrendering: "colorRendering",
			"color-rendering": "colorRendering",
			contentscripttype: "contentScriptType",
			contentstyletype: "contentStyleType",
			cursor: "cursor",
			cx: "cx",
			cy: "cy",
			d: "d",
			datatype: "datatype",
			decelerate: "decelerate",
			descent: "descent",
			diffuseconstant: "diffuseConstant",
			direction: "direction",
			display: "display",
			divisor: "divisor",
			dominantbaseline: "dominantBaseline",
			"dominant-baseline": "dominantBaseline",
			dur: "dur",
			dx: "dx",
			dy: "dy",
			edgemode: "edgeMode",
			elevation: "elevation",
			enablebackground: "enableBackground",
			"enable-background": "enableBackground",
			end: "end",
			exponent: "exponent",
			externalresourcesrequired: "externalResourcesRequired",
			fill: "fill",
			fillopacity: "fillOpacity",
			"fill-opacity": "fillOpacity",
			fillrule: "fillRule",
			"fill-rule": "fillRule",
			filter: "filter",
			filterres: "filterRes",
			filterunits: "filterUnits",
			floodopacity: "floodOpacity",
			"flood-opacity": "floodOpacity",
			floodcolor: "floodColor",
			"flood-color": "floodColor",
			focusable: "focusable",
			fontfamily: "fontFamily",
			"font-family": "fontFamily",
			fontsize: "fontSize",
			"font-size": "fontSize",
			fontsizeadjust: "fontSizeAdjust",
			"font-size-adjust": "fontSizeAdjust",
			fontstretch: "fontStretch",
			"font-stretch": "fontStretch",
			fontstyle: "fontStyle",
			"font-style": "fontStyle",
			fontvariant: "fontVariant",
			"font-variant": "fontVariant",
			fontweight: "fontWeight",
			"font-weight": "fontWeight",
			format: "format",
			from: "from",
			fx: "fx",
			fy: "fy",
			g1: "g1",
			g2: "g2",
			glyphname: "glyphName",
			"glyph-name": "glyphName",
			glyphorientationhorizontal: "glyphOrientationHorizontal",
			"glyph-orientation-horizontal": "glyphOrientationHorizontal",
			glyphorientationvertical: "glyphOrientationVertical",
			"glyph-orientation-vertical": "glyphOrientationVertical",
			glyphref: "glyphRef",
			gradienttransform: "gradientTransform",
			gradientunits: "gradientUnits",
			hanging: "hanging",
			horizadvx: "horizAdvX",
			"horiz-adv-x": "horizAdvX",
			horizoriginx: "horizOriginX",
			"horiz-origin-x": "horizOriginX",
			ideographic: "ideographic",
			imagerendering: "imageRendering",
			"image-rendering": "imageRendering",
			in2: "in2",
			in: "in",
			inlist: "inlist",
			intercept: "intercept",
			k1: "k1",
			k2: "k2",
			k3: "k3",
			k4: "k4",
			k: "k",
			kernelmatrix: "kernelMatrix",
			kernelunitlength: "kernelUnitLength",
			kerning: "kerning",
			keypoints: "keyPoints",
			keysplines: "keySplines",
			keytimes: "keyTimes",
			lengthadjust: "lengthAdjust",
			letterspacing: "letterSpacing",
			"letter-spacing": "letterSpacing",
			lightingcolor: "lightingColor",
			"lighting-color": "lightingColor",
			limitingconeangle: "limitingConeAngle",
			local: "local",
			markerend: "markerEnd",
			"marker-end": "markerEnd",
			markerheight: "markerHeight",
			markermid: "markerMid",
			"marker-mid": "markerMid",
			markerstart: "markerStart",
			"marker-start": "markerStart",
			markerunits: "markerUnits",
			markerwidth: "markerWidth",
			mask: "mask",
			maskcontentunits: "maskContentUnits",
			maskunits: "maskUnits",
			mathematical: "mathematical",
			mode: "mode",
			numoctaves: "numOctaves",
			offset: "offset",
			opacity: "opacity",
			operator: "operator",
			order: "order",
			orient: "orient",
			orientation: "orientation",
			origin: "origin",
			overflow: "overflow",
			overlineposition: "overlinePosition",
			"overline-position": "overlinePosition",
			overlinethickness: "overlineThickness",
			"overline-thickness": "overlineThickness",
			paintorder: "paintOrder",
			"paint-order": "paintOrder",
			panose1: "panose1",
			"panose-1": "panose1",
			pathlength: "pathLength",
			patterncontentunits: "patternContentUnits",
			patterntransform: "patternTransform",
			patternunits: "patternUnits",
			pointerevents: "pointerEvents",
			"pointer-events": "pointerEvents",
			points: "points",
			pointsatx: "pointsAtX",
			pointsaty: "pointsAtY",
			pointsatz: "pointsAtZ",
			popover: "popover",
			popovertarget: "popoverTarget",
			popovertargetaction: "popoverTargetAction",
			prefix: "prefix",
			preservealpha: "preserveAlpha",
			preserveaspectratio: "preserveAspectRatio",
			primitiveunits: "primitiveUnits",
			property: "property",
			r: "r",
			radius: "radius",
			refx: "refX",
			refy: "refY",
			renderingintent: "renderingIntent",
			"rendering-intent": "renderingIntent",
			repeatcount: "repeatCount",
			repeatdur: "repeatDur",
			requiredextensions: "requiredExtensions",
			requiredfeatures: "requiredFeatures",
			resource: "resource",
			restart: "restart",
			result: "result",
			results: "results",
			rotate: "rotate",
			rx: "rx",
			ry: "ry",
			scale: "scale",
			security: "security",
			seed: "seed",
			shaperendering: "shapeRendering",
			"shape-rendering": "shapeRendering",
			slope: "slope",
			spacing: "spacing",
			specularconstant: "specularConstant",
			specularexponent: "specularExponent",
			speed: "speed",
			spreadmethod: "spreadMethod",
			startoffset: "startOffset",
			stddeviation: "stdDeviation",
			stemh: "stemh",
			stemv: "stemv",
			stitchtiles: "stitchTiles",
			stopcolor: "stopColor",
			"stop-color": "stopColor",
			stopopacity: "stopOpacity",
			"stop-opacity": "stopOpacity",
			strikethroughposition: "strikethroughPosition",
			"strikethrough-position": "strikethroughPosition",
			strikethroughthickness: "strikethroughThickness",
			"strikethrough-thickness": "strikethroughThickness",
			string: "string",
			stroke: "stroke",
			strokedasharray: "strokeDasharray",
			"stroke-dasharray": "strokeDasharray",
			strokedashoffset: "strokeDashoffset",
			"stroke-dashoffset": "strokeDashoffset",
			strokelinecap: "strokeLinecap",
			"stroke-linecap": "strokeLinecap",
			strokelinejoin: "strokeLinejoin",
			"stroke-linejoin": "strokeLinejoin",
			strokemiterlimit: "strokeMiterlimit",
			"stroke-miterlimit": "strokeMiterlimit",
			strokewidth: "strokeWidth",
			"stroke-width": "strokeWidth",
			strokeopacity: "strokeOpacity",
			"stroke-opacity": "strokeOpacity",
			suppresscontenteditablewarning: "suppressContentEditableWarning",
			suppresshydrationwarning: "suppressHydrationWarning",
			surfacescale: "surfaceScale",
			systemlanguage: "systemLanguage",
			tablevalues: "tableValues",
			targetx: "targetX",
			targety: "targetY",
			textanchor: "textAnchor",
			"text-anchor": "textAnchor",
			textdecoration: "textDecoration",
			"text-decoration": "textDecoration",
			textlength: "textLength",
			textrendering: "textRendering",
			"text-rendering": "textRendering",
			to: "to",
			transform: "transform",
			transformorigin: "transformOrigin",
			"transform-origin": "transformOrigin",
			typeof: "typeof",
			u1: "u1",
			u2: "u2",
			underlineposition: "underlinePosition",
			"underline-position": "underlinePosition",
			underlinethickness: "underlineThickness",
			"underline-thickness": "underlineThickness",
			unicode: "unicode",
			unicodebidi: "unicodeBidi",
			"unicode-bidi": "unicodeBidi",
			unicoderange: "unicodeRange",
			"unicode-range": "unicodeRange",
			unitsperem: "unitsPerEm",
			"units-per-em": "unitsPerEm",
			unselectable: "unselectable",
			valphabetic: "vAlphabetic",
			"v-alphabetic": "vAlphabetic",
			values: "values",
			vectoreffect: "vectorEffect",
			"vector-effect": "vectorEffect",
			version: "version",
			vertadvy: "vertAdvY",
			"vert-adv-y": "vertAdvY",
			vertoriginx: "vertOriginX",
			"vert-origin-x": "vertOriginX",
			vertoriginy: "vertOriginY",
			"vert-origin-y": "vertOriginY",
			vhanging: "vHanging",
			"v-hanging": "vHanging",
			videographic: "vIdeographic",
			"v-ideographic": "vIdeographic",
			viewbox: "viewBox",
			viewtarget: "viewTarget",
			visibility: "visibility",
			vmathematical: "vMathematical",
			"v-mathematical": "vMathematical",
			vocab: "vocab",
			widths: "widths",
			wordspacing: "wordSpacing",
			"word-spacing": "wordSpacing",
			writingmode: "writingMode",
			"writing-mode": "writingMode",
			x1: "x1",
			x2: "x2",
			x: "x",
			xchannelselector: "xChannelSelector",
			xheight: "xHeight",
			"x-height": "xHeight",
			xlinkactuate: "xlinkActuate",
			"xlink:actuate": "xlinkActuate",
			xlinkarcrole: "xlinkArcrole",
			"xlink:arcrole": "xlinkArcrole",
			xlinkhref: "xlinkHref",
			"xlink:href": "xlinkHref",
			xlinkrole: "xlinkRole",
			"xlink:role": "xlinkRole",
			xlinkshow: "xlinkShow",
			"xlink:show": "xlinkShow",
			xlinktitle: "xlinkTitle",
			"xlink:title": "xlinkTitle",
			xlinktype: "xlinkType",
			"xlink:type": "xlinkType",
			xmlbase: "xmlBase",
			"xml:base": "xmlBase",
			xmllang: "xmlLang",
			"xml:lang": "xmlLang",
			xmlns: "xmlns",
			"xml:space": "xmlSpace",
			xmlnsxlink: "xmlnsXlink",
			"xmlns:xlink": "xmlnsXlink",
			xmlspace: "xmlSpace",
			y1: "y1",
			y2: "y2",
			y: "y",
			ychannelselector: "yChannelSelector",
			z: "z",
			zoomandpan: "zoomAndPan"
		}, Bm = {
			"aria-current": 0,
			"aria-description": 0,
			"aria-details": 0,
			"aria-disabled": 0,
			"aria-hidden": 0,
			"aria-invalid": 0,
			"aria-keyshortcuts": 0,
			"aria-label": 0,
			"aria-roledescription": 0,
			"aria-autocomplete": 0,
			"aria-checked": 0,
			"aria-expanded": 0,
			"aria-haspopup": 0,
			"aria-level": 0,
			"aria-modal": 0,
			"aria-multiline": 0,
			"aria-multiselectable": 0,
			"aria-orientation": 0,
			"aria-placeholder": 0,
			"aria-pressed": 0,
			"aria-readonly": 0,
			"aria-required": 0,
			"aria-selected": 0,
			"aria-sort": 0,
			"aria-valuemax": 0,
			"aria-valuemin": 0,
			"aria-valuenow": 0,
			"aria-valuetext": 0,
			"aria-atomic": 0,
			"aria-busy": 0,
			"aria-live": 0,
			"aria-relevant": 0,
			"aria-dropeffect": 0,
			"aria-grabbed": 0,
			"aria-activedescendant": 0,
			"aria-colcount": 0,
			"aria-colindex": 0,
			"aria-colspan": 0,
			"aria-controls": 0,
			"aria-describedby": 0,
			"aria-errormessage": 0,
			"aria-flowto": 0,
			"aria-labelledby": 0,
			"aria-owns": 0,
			"aria-posinset": 0,
			"aria-rowcount": 0,
			"aria-rowindex": 0,
			"aria-rowspan": 0,
			"aria-setsize": 0,
			"aria-braillelabel": 0,
			"aria-brailleroledescription": 0,
			"aria-colindextext": 0,
			"aria-rowindextext": 0
		}, Vm = {}, Hm = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Um = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Wm = !1, Gm = {}, Km = /^on./, qm = /^on[^A-Z]/, Jm = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Ym = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Xm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, Zm = null, Qm = null, $m = null, eh = !1, th = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), nh = !1;
		if (th) try {
			var rh = {};
			Object.defineProperty(rh, "passive", { get: function() {
				nh = !0;
			} }), window.addEventListener("test", rh, rh), window.removeEventListener("test", rh, rh);
		} catch {
			nh = !1;
		}
		var ih = null, ah = null, oh = null, sh = {
			eventPhase: 0,
			bubbles: 0,
			cancelable: 0,
			timeStamp: function(e) {
				return e.timeStamp || Date.now();
			},
			defaultPrevented: 0,
			isTrusted: 0
		}, ch = yn(sh), lh = z({}, sh, {
			view: 0,
			detail: 0
		}), uh = yn(lh), dh, fh, ph, mh = z({}, lh, {
			screenX: 0,
			screenY: 0,
			clientX: 0,
			clientY: 0,
			pageX: 0,
			pageY: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			getModifierState: xn,
			button: 0,
			buttons: 0,
			relatedTarget: function(e) {
				return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
			},
			movementX: function(e) {
				return "movementX" in e ? e.movementX : (e !== ph && (ph && e.type === "mousemove" ? (dh = e.screenX - ph.screenX, fh = e.screenY - ph.screenY) : fh = dh = 0, ph = e), dh);
			},
			movementY: function(e) {
				return "movementY" in e ? e.movementY : fh;
			}
		}), hh = yn(mh), gh = yn(z({}, mh, { dataTransfer: 0 })), _h = yn(z({}, lh, { relatedTarget: 0 })), vh = yn(z({}, sh, {
			animationName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), yh = yn(z({}, sh, { clipboardData: function(e) {
			return "clipboardData" in e ? e.clipboardData : window.clipboardData;
		} })), bh = yn(z({}, sh, { data: 0 })), xh = bh, Sh = {
			Esc: "Escape",
			Spacebar: " ",
			Left: "ArrowLeft",
			Up: "ArrowUp",
			Right: "ArrowRight",
			Down: "ArrowDown",
			Del: "Delete",
			Win: "OS",
			Menu: "ContextMenu",
			Apps: "ContextMenu",
			Scroll: "ScrollLock",
			MozPrintableKey: "Unidentified"
		}, Ch = {
			8: "Backspace",
			9: "Tab",
			12: "Clear",
			13: "Enter",
			16: "Shift",
			17: "Control",
			18: "Alt",
			19: "Pause",
			20: "CapsLock",
			27: "Escape",
			32: " ",
			33: "PageUp",
			34: "PageDown",
			35: "End",
			36: "Home",
			37: "ArrowLeft",
			38: "ArrowUp",
			39: "ArrowRight",
			40: "ArrowDown",
			45: "Insert",
			46: "Delete",
			112: "F1",
			113: "F2",
			114: "F3",
			115: "F4",
			116: "F5",
			117: "F6",
			118: "F7",
			119: "F8",
			120: "F9",
			121: "F10",
			122: "F11",
			123: "F12",
			144: "NumLock",
			145: "ScrollLock",
			224: "Meta"
		}, wh = {
			Alt: "altKey",
			Control: "ctrlKey",
			Meta: "metaKey",
			Shift: "shiftKey"
		}, Th = yn(z({}, lh, {
			key: function(e) {
				if (e.key) {
					var t = Sh[e.key] || e.key;
					if (t !== "Unidentified") return t;
				}
				return e.type === "keypress" ? (e = gn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Ch[e.keyCode] || "Unidentified" : "";
			},
			code: 0,
			location: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			repeat: 0,
			locale: 0,
			getModifierState: xn,
			charCode: function(e) {
				return e.type === "keypress" ? gn(e) : 0;
			},
			keyCode: function(e) {
				return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			},
			which: function(e) {
				return e.type === "keypress" ? gn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			}
		})), Eh = yn(z({}, mh, {
			pointerId: 0,
			width: 0,
			height: 0,
			pressure: 0,
			tangentialPressure: 0,
			tiltX: 0,
			tiltY: 0,
			twist: 0,
			pointerType: 0,
			isPrimary: 0
		})), Dh = yn(z({}, lh, {
			touches: 0,
			targetTouches: 0,
			changedTouches: 0,
			altKey: 0,
			metaKey: 0,
			ctrlKey: 0,
			shiftKey: 0,
			getModifierState: xn
		})), Oh = yn(z({}, sh, {
			propertyName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), kh = yn(z({}, mh, {
			deltaX: function(e) {
				return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
			},
			deltaY: function(e) {
				return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
			},
			deltaZ: 0,
			deltaMode: 0
		})), Ah = yn(z({}, sh, {
			newState: 0,
			oldState: 0
		})), jh = [
			9,
			13,
			27,
			32
		], Mh = 229, Nh = th && "CompositionEvent" in window, Ph = null;
		th && "documentMode" in document && (Ph = document.documentMode);
		var Fh = th && "TextEvent" in window && !Ph, Ih = th && (!Nh || Ph && 8 < Ph && 11 >= Ph), Lh = 32, Rh = String.fromCharCode(Lh), zh = !1, Bh = !1, Vh = {
			color: !0,
			date: !0,
			datetime: !0,
			"datetime-local": !0,
			email: !0,
			month: !0,
			number: !0,
			password: !0,
			range: !0,
			search: !0,
			tel: !0,
			text: !0,
			time: !0,
			url: !0,
			week: !0
		}, Hh = null, Uh = null, Wh = !1;
		th && (Wh = Dn("input") && (!document.documentMode || 9 < document.documentMode));
		var Gh = typeof Object.is == "function" ? Object.is : Rn, Kh = th && "documentMode" in document && 11 >= document.documentMode, qh = null, Jh = null, Yh = null, Xh = !1, Zh = {
			animationend: Kn("Animation", "AnimationEnd"),
			animationiteration: Kn("Animation", "AnimationIteration"),
			animationstart: Kn("Animation", "AnimationStart"),
			transitionrun: Kn("Transition", "TransitionRun"),
			transitionstart: Kn("Transition", "TransitionStart"),
			transitioncancel: Kn("Transition", "TransitionCancel"),
			transitionend: Kn("Transition", "TransitionEnd")
		}, Qh = {}, $h = {};
		th && ($h = document.createElement("div").style, "AnimationEvent" in window || (delete Zh.animationend.animation, delete Zh.animationiteration.animation, delete Zh.animationstart.animation), "TransitionEvent" in window || delete Zh.transitionend.transition);
		var eg = qn("animationend"), tg = qn("animationiteration"), ng = qn("animationstart"), rg = qn("transitionrun"), ig = qn("transitionstart"), ag = qn("transitioncancel"), og = qn("transitionend"), sg = /* @__PURE__ */ new Map(), cg = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
		cg.push("scrollEnd");
		var lg = 0;
		if (typeof performance == "object" && typeof performance.now == "function") var ug = performance, dg = function() {
			return ug.now();
		};
		else {
			var fg = Date;
			dg = function() {
				return fg.now();
			};
		}
		var pg = typeof reportError == "function" ? reportError : function(e) {
			if (typeof window == "object" && typeof window.ErrorEvent == "function") {
				var t = new window.ErrorEvent("error", {
					bubbles: !0,
					cancelable: !0,
					message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
					error: e
				});
				if (!window.dispatchEvent(t)) return;
			} else if (typeof process == "object" && typeof process.emit == "function") {
				process.emit("uncaughtException", e);
				return;
			}
			console.error(e);
		}, mg = "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.", hg = 0, gg = 1, _g = 2, vg = 3, yg = "–\xA0", bg = "+\xA0", xg = " \xA0", Sg = typeof console < "u" && typeof console.timeStamp == "function" && typeof performance < "u" && typeof performance.measure == "function", Cg = "Components ⚛", V = "Scheduler ⚛", H = "Blocking", wg = !1, Tg = {
			color: "primary",
			properties: null,
			tooltipText: "",
			track: Cg
		}, Eg = {
			start: -0,
			end: -0,
			detail: { devtools: Tg }
		}, Dg = ["Changed Props", ""], Og = "This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner.", kg = ["Changed Props", Og], Ag = 1, jg = 2, Mg = [], Ng = 0, Pg = 0, Fg = {};
		Object.freeze(Fg);
		var Ig = null, Lg = null, U = 0, Rg = 1, W = 2, zg = 8, Bg = 16, Vg = 32, Hg = !1;
		try {
			Object.preventExtensions({});
		} catch {
			Hg = !0;
		}
		var Ug = /* @__PURE__ */ new WeakMap(), Wg = [], Gg = 0, Kg = null, qg = 0, Jg = [], Yg = 0, Xg = null, Zg = 1, Qg = "", $g = null, e_ = null, G = !1, t_ = !1, n_ = null, r_ = null, i_ = !1, a_ = Error("Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), o_ = se(null), s_ = se(null), c_ = {}, l_ = null, u_ = null, d_ = !1, f_ = typeof AbortController < "u" ? AbortController : function() {
			var e = [], t = this.signal = {
				aborted: !1,
				addEventListener: function(t, n) {
					e.push(n);
				}
			};
			this.abort = function() {
				t.aborted = !0, e.forEach(function(e) {
					return e();
				});
			};
		}, p_ = Of.unstable_scheduleCallback, m_ = Of.unstable_NormalPriority, h_ = {
			$$typeof: Rf,
			Consumer: null,
			Provider: null,
			_currentValue: null,
			_currentValue2: null,
			_threadCount: 0,
			_currentRenderer: null,
			_currentRenderer2: null
		}, g_ = Of.unstable_now, __ = console.createTask ? console.createTask : function() {
			return null;
		}, v_ = 1, y_ = 2, b_ = -0, x_ = -0, S_ = -0, C_ = null, w_ = -1.1, T_ = -0, E_ = -0, K = -1.1, q = -1.1, D_ = null, O_ = !1, k_ = -0, A_ = -1.1, j_ = null, M_ = 0, N_ = null, P_ = null, F_ = -1.1, I_ = null, L_ = -1.1, R_ = -1.1, z_ = -0, B_ = -1.1, V_ = -1.1, H_ = 0, U_ = null, W_ = null, G_ = null, K_ = -1.1, q_ = null, J_ = -1.1, Y_ = -1.1, X_ = -0, Z_ = -0, Q_ = 0, $_ = null, ev = 0, tv = -1.1, nv = !1, rv = !1, iv = null, av = 0, ov = 0, sv = null, cv = B.S;
		B.S = function(e, t) {
			if (_x = Cp(), typeof t == "object" && t && typeof t.then == "function") {
				if (0 > B_ && 0 > V_) {
					B_ = g_();
					var n = qu(), r = Ku();
					(n !== J_ || r !== q_) && (J_ = -1.1), K_ = n, q_ = r;
				}
				Mi(e, t);
			}
			cv !== null && cv(e, t);
		};
		var lv = se(null), uv = {
			recordUnsafeLifecycleWarnings: function() {},
			flushPendingUnsafeLifecycleWarnings: function() {},
			recordLegacyContextWarning: function() {},
			flushLegacyContextWarning: function() {},
			discardPendingWarnings: function() {}
		}, dv = [], fv = [], pv = [], mv = [], hv = [], gv = [], _v = /* @__PURE__ */ new Set();
		uv.recordUnsafeLifecycleWarnings = function(e, t) {
			_v.has(e.type) || (typeof t.componentWillMount == "function" && !0 !== t.componentWillMount.__suppressDeprecationWarning && dv.push(e), e.mode & zg && typeof t.UNSAFE_componentWillMount == "function" && fv.push(e), typeof t.componentWillReceiveProps == "function" && !0 !== t.componentWillReceiveProps.__suppressDeprecationWarning && pv.push(e), e.mode & zg && typeof t.UNSAFE_componentWillReceiveProps == "function" && mv.push(e), typeof t.componentWillUpdate == "function" && !0 !== t.componentWillUpdate.__suppressDeprecationWarning && hv.push(e), e.mode & zg && typeof t.UNSAFE_componentWillUpdate == "function" && gv.push(e));
		}, uv.flushPendingUnsafeLifecycleWarnings = function() {
			var e = /* @__PURE__ */ new Set();
			0 < dv.length && (dv.forEach(function(t) {
				e.add(C(t) || "Component"), _v.add(t.type);
			}), dv = []);
			var t = /* @__PURE__ */ new Set();
			0 < fv.length && (fv.forEach(function(e) {
				t.add(C(e) || "Component"), _v.add(e.type);
			}), fv = []);
			var n = /* @__PURE__ */ new Set();
			0 < pv.length && (pv.forEach(function(e) {
				n.add(C(e) || "Component"), _v.add(e.type);
			}), pv = []);
			var r = /* @__PURE__ */ new Set();
			0 < mv.length && (mv.forEach(function(e) {
				r.add(C(e) || "Component"), _v.add(e.type);
			}), mv = []);
			var i = /* @__PURE__ */ new Set();
			0 < hv.length && (hv.forEach(function(e) {
				i.add(C(e) || "Component"), _v.add(e.type);
			}), hv = []);
			var a = /* @__PURE__ */ new Set();
			if (0 < gv.length && (gv.forEach(function(e) {
				a.add(C(e) || "Component"), _v.add(e.type);
			}), gv = []), 0 < t.size) {
				var o = m(t);
				console.error("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s", o);
			}
			0 < r.size && (o = m(r), console.error("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n\nPlease update the following components: %s", o)), 0 < a.size && (o = m(a), console.error("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s", o)), 0 < e.size && (o = m(e), console.warn("componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < n.size && (o = m(n), console.warn("componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < i.size && (o = m(i), console.warn("componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o));
		};
		var vv = /* @__PURE__ */ new Map(), yv = /* @__PURE__ */ new Set();
		uv.recordLegacyContextWarning = function(e, t) {
			for (var n = null, r = e; r !== null;) r.mode & zg && (n = r), r = r.return;
			n === null ? console.error("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.") : !yv.has(e.type) && (r = vv.get(n), e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (r === void 0 && (r = [], vv.set(n, r)), r.push(e));
		}, uv.flushLegacyContextWarning = function() {
			vv.forEach(function(e) {
				if (e.length !== 0) {
					var t = e[0], n = /* @__PURE__ */ new Set();
					e.forEach(function(e) {
						n.add(C(e) || "Component"), yv.add(e.type);
					});
					var r = m(n);
					E(t, function() {
						console.error("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://react.dev/link/legacy-context", r);
					});
				}
			});
		}, uv.discardPendingWarnings = function() {
			dv = [], fv = [], pv = [], mv = [], hv = [], gv = [], vv = /* @__PURE__ */ new Map();
		};
		var bv = { react_stack_bottom_frame: function(e, t, n) {
			var r = _p;
			_p = !0;
			try {
				return e(t, n);
			} finally {
				_p = r;
			}
		} }, xv = bv.react_stack_bottom_frame.bind(bv), Sv = { react_stack_bottom_frame: function(e) {
			var t = _p;
			_p = !0;
			try {
				return e.render();
			} finally {
				_p = t;
			}
		} }, Cv = Sv.react_stack_bottom_frame.bind(Sv), wv = { react_stack_bottom_frame: function(e, t) {
			try {
				t.componentDidMount();
			} catch (t) {
				N(e, e.return, t);
			}
		} }, Tv = wv.react_stack_bottom_frame.bind(wv), Ev = { react_stack_bottom_frame: function(e, t, n, r, i) {
			try {
				t.componentDidUpdate(n, r, i);
			} catch (t) {
				N(e, e.return, t);
			}
		} }, Dv = Ev.react_stack_bottom_frame.bind(Ev), Ov = { react_stack_bottom_frame: function(e, t) {
			var n = t.stack;
			e.componentDidCatch(t.value, { componentStack: n === null ? "" : n });
		} }, kv = Ov.react_stack_bottom_frame.bind(Ov), Av = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n.componentWillUnmount();
			} catch (n) {
				N(e, t, n);
			}
		} }, jv = Av.react_stack_bottom_frame.bind(Av), Mv = { react_stack_bottom_frame: function(e) {
			var t = e.create;
			return e = e.inst, t = t(), e.destroy = t;
		} }, Nv = Mv.react_stack_bottom_frame.bind(Mv), Pv = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n();
			} catch (n) {
				N(e, t, n);
			}
		} }, Fv = Pv.react_stack_bottom_frame.bind(Pv), Iv = { react_stack_bottom_frame: function(e) {
			var t = e._init;
			return t(e._payload);
		} }, Lv = Iv.react_stack_bottom_frame.bind(Iv), Rv = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."), zv = Error("Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), Bv = Error("Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."), Vv = { then: function() {
			console.error("Internal React error: A listener was unexpectedly attached to a \"noop\" thenable. This is a bug in React. Please file an issue.");
		} }, Hv = null, Uv = !1, Wv = null, Gv = 0, J = null, Kv, qv = Kv = !1, Jv = {}, Yv = {}, Xv = {};
		p = function(e, t, n) {
			if (typeof n == "object" && n && n._store && (!n._store.validated && n.key == null || n._store.validated === 2)) {
				if (typeof n._store != "object") throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
				n._store.validated = 1;
				var r = C(e), i = r || "null";
				if (!Jv[i]) {
					Jv[i] = !0, n = n._owner, e = e._debugOwner;
					var a = "";
					e && typeof e.tag == "number" && (i = C(e)) && (a = "\n\nCheck the render method of `" + i + "`."), a || r && (a = "\n\nCheck the top-level render call using <" + r + ">.");
					var o = "";
					n != null && e !== n && (r = null, typeof n.tag == "number" ? r = C(n) : typeof n.name == "string" && (r = n.name), r && (o = " It was passed a child from " + r + ".")), E(t, function() {
						console.error("Each child in a list should have a unique \"key\" prop.%s%s See https://react.dev/link/warning-keys for more information.", a, o);
					});
				}
			}
		};
		var Zv = $i(!0), Qv = $i(!1), $v = 0, ey = 1, ty = 2, ny = 3, ry = !1, iy = !1, ay = null, oy = !1, sy = se(null), cy = se(0), ly = se(null), uy = null, dy = 1, fy = 2, py = se(0), my = 0, hy = 1, gy = 2, _y = 4, vy = 8, yy, by = /* @__PURE__ */ new Set(), xy = /* @__PURE__ */ new Set(), Sy = /* @__PURE__ */ new Set(), Cy = /* @__PURE__ */ new Set(), wy = 0, Y = null, Ty = null, Ey = null, Dy = !1, Oy = !1, ky = !1, Ay = 0, jy = 0, My = null, Ny = 0, Py = 25, X = null, Fy = null, Iy = -1, Ly = !1, Ry = {
			readContext: si,
			use: Ia,
			useCallback: Ca,
			useContext: Ca,
			useEffect: Ca,
			useImperativeHandle: Ca,
			useLayoutEffect: Ca,
			useInsertionEffect: Ca,
			useMemo: Ca,
			useReducer: Ca,
			useRef: Ca,
			useState: Ca,
			useDebugValue: Ca,
			useDeferredValue: Ca,
			useTransition: Ca,
			useSyncExternalStore: Ca,
			useId: Ca,
			useHostTransitionStatus: Ca,
			useFormState: Ca,
			useActionState: Ca,
			useOptimistic: Ca,
			useMemoCache: Ca,
			useCacheRefresh: Ca
		};
		Ry.useEffectEvent = Ca;
		var zy = null, By = null, Vy = null, Hy = null, Uy = null, Wy = null, Gy = null;
		zy = {
			readContext: function(e) {
				return si(e);
			},
			use: Ia,
			useCallback: function(e, t) {
				return X = "useCallback", A(), xa(t), Eo(e, t);
			},
			useContext: function(e) {
				return X = "useContext", A(), si(e);
			},
			useEffect: function(e, t) {
				return X = "useEffect", A(), xa(t), yo(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return X = "useImperativeHandle", A(), xa(n), wo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				X = "useInsertionEffect", A(), xa(t), _o(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return X = "useLayoutEffect", A(), xa(t), So(e, t);
			},
			useMemo: function(e, t) {
				X = "useMemo", A(), xa(t);
				var n = B.H;
				B.H = Uy;
				try {
					return Oo(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				X = "useReducer", A();
				var r = B.H;
				B.H = Uy;
				try {
					return za(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function(e) {
				return X = "useRef", A(), go(e);
			},
			useState: function(e) {
				X = "useState", A();
				var t = B.H;
				B.H = Uy;
				try {
					return Za(e);
				} finally {
					B.H = t;
				}
			},
			useDebugValue: function() {
				X = "useDebugValue", A();
			},
			useDeferredValue: function(e, t) {
				return X = "useDeferredValue", A(), Ao(e, t);
			},
			useTransition: function() {
				return X = "useTransition", A(), Bo();
			},
			useSyncExternalStore: function(e, t, n) {
				return X = "useSyncExternalStore", A(), Ua(e, t, n);
			},
			useId: function() {
				return X = "useId", A(), Wo();
			},
			useFormState: function(e, t) {
				return X = "useFormState", A(), Sa(), lo(e, t);
			},
			useActionState: function(e, t) {
				return X = "useActionState", A(), lo(e, t);
			},
			useOptimistic: function(e) {
				return X = "useOptimistic", A(), Qa(e);
			},
			useHostTransitionStatus: Uo,
			useMemoCache: La,
			useCacheRefresh: function() {
				return X = "useCacheRefresh", A(), Go();
			},
			useEffectEvent: function(e) {
				return X = "useEffectEvent", A(), xo(e);
			}
		}, By = {
			readContext: function(e) {
				return si(e);
			},
			use: Ia,
			useCallback: function(e, t) {
				return X = "useCallback", j(), Eo(e, t);
			},
			useContext: function(e) {
				return X = "useContext", j(), si(e);
			},
			useEffect: function(e, t) {
				return X = "useEffect", j(), yo(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return X = "useImperativeHandle", j(), wo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				X = "useInsertionEffect", j(), _o(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return X = "useLayoutEffect", j(), So(e, t);
			},
			useMemo: function(e, t) {
				X = "useMemo", j();
				var n = B.H;
				B.H = Uy;
				try {
					return Oo(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				X = "useReducer", j();
				var r = B.H;
				B.H = Uy;
				try {
					return za(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function(e) {
				return X = "useRef", j(), go(e);
			},
			useState: function(e) {
				X = "useState", j();
				var t = B.H;
				B.H = Uy;
				try {
					return Za(e);
				} finally {
					B.H = t;
				}
			},
			useDebugValue: function() {
				X = "useDebugValue", j();
			},
			useDeferredValue: function(e, t) {
				return X = "useDeferredValue", j(), Ao(e, t);
			},
			useTransition: function() {
				return X = "useTransition", j(), Bo();
			},
			useSyncExternalStore: function(e, t, n) {
				return X = "useSyncExternalStore", j(), Ua(e, t, n);
			},
			useId: function() {
				return X = "useId", j(), Wo();
			},
			useActionState: function(e, t) {
				return X = "useActionState", j(), lo(e, t);
			},
			useFormState: function(e, t) {
				return X = "useFormState", j(), Sa(), lo(e, t);
			},
			useOptimistic: function(e) {
				return X = "useOptimistic", j(), Qa(e);
			},
			useHostTransitionStatus: Uo,
			useMemoCache: La,
			useCacheRefresh: function() {
				return X = "useCacheRefresh", j(), Go();
			},
			useEffectEvent: function(e) {
				return X = "useEffectEvent", j(), xo(e);
			}
		}, Vy = {
			readContext: function(e) {
				return si(e);
			},
			use: Ia,
			useCallback: function(e, t) {
				return X = "useCallback", j(), Do(e, t);
			},
			useContext: function(e) {
				return X = "useContext", j(), si(e);
			},
			useEffect: function(e, t) {
				X = "useEffect", j(), vo(2048, vy, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return X = "useImperativeHandle", j(), To(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return X = "useInsertionEffect", j(), vo(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return X = "useLayoutEffect", j(), vo(4, _y, e, t);
			},
			useMemo: function(e, t) {
				X = "useMemo", j();
				var n = B.H;
				B.H = Wy;
				try {
					return ko(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				X = "useReducer", j();
				var r = B.H;
				B.H = Wy;
				try {
					return Ba(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function() {
				return X = "useRef", j(), Na().memoizedState;
			},
			useState: function() {
				X = "useState", j();
				var e = B.H;
				B.H = Wy;
				try {
					return Ba(Ra);
				} finally {
					B.H = e;
				}
			},
			useDebugValue: function() {
				X = "useDebugValue", j();
			},
			useDeferredValue: function(e, t) {
				return X = "useDeferredValue", j(), jo(e, t);
			},
			useTransition: function() {
				return X = "useTransition", j(), Vo();
			},
			useSyncExternalStore: function(e, t, n) {
				return X = "useSyncExternalStore", j(), Wa(e, t, n);
			},
			useId: function() {
				return X = "useId", j(), Na().memoizedState;
			},
			useFormState: function(e) {
				return X = "useFormState", j(), Sa(), uo(e);
			},
			useActionState: function(e) {
				return X = "useActionState", j(), uo(e);
			},
			useOptimistic: function(e, t) {
				return X = "useOptimistic", j(), $a(e, t);
			},
			useHostTransitionStatus: Uo,
			useMemoCache: La,
			useCacheRefresh: function() {
				return X = "useCacheRefresh", j(), Na().memoizedState;
			},
			useEffectEvent: function(e) {
				return X = "useEffectEvent", j(), M(e);
			}
		}, Hy = {
			readContext: function(e) {
				return si(e);
			},
			use: Ia,
			useCallback: function(e, t) {
				return X = "useCallback", j(), Do(e, t);
			},
			useContext: function(e) {
				return X = "useContext", j(), si(e);
			},
			useEffect: function(e, t) {
				X = "useEffect", j(), vo(2048, vy, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return X = "useImperativeHandle", j(), To(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return X = "useInsertionEffect", j(), vo(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return X = "useLayoutEffect", j(), vo(4, _y, e, t);
			},
			useMemo: function(e, t) {
				X = "useMemo", j();
				var n = B.H;
				B.H = Gy;
				try {
					return ko(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				X = "useReducer", j();
				var r = B.H;
				B.H = Gy;
				try {
					return Ha(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function() {
				return X = "useRef", j(), Na().memoizedState;
			},
			useState: function() {
				X = "useState", j();
				var e = B.H;
				B.H = Gy;
				try {
					return Ha(Ra);
				} finally {
					B.H = e;
				}
			},
			useDebugValue: function() {
				X = "useDebugValue", j();
			},
			useDeferredValue: function(e, t) {
				return X = "useDeferredValue", j(), Mo(e, t);
			},
			useTransition: function() {
				return X = "useTransition", j(), Ho();
			},
			useSyncExternalStore: function(e, t, n) {
				return X = "useSyncExternalStore", j(), Wa(e, t, n);
			},
			useId: function() {
				return X = "useId", j(), Na().memoizedState;
			},
			useFormState: function(e) {
				return X = "useFormState", j(), Sa(), mo(e);
			},
			useActionState: function(e) {
				return X = "useActionState", j(), mo(e);
			},
			useOptimistic: function(e, t) {
				return X = "useOptimistic", j(), to(e, t);
			},
			useHostTransitionStatus: Uo,
			useMemoCache: La,
			useCacheRefresh: function() {
				return X = "useCacheRefresh", j(), Na().memoizedState;
			},
			useEffectEvent: function(e) {
				return X = "useEffectEvent", j(), M(e);
			}
		}, Uy = {
			readContext: function(e) {
				return d(), si(e);
			},
			use: function(e) {
				return u(), Ia(e);
			},
			useCallback: function(e, t) {
				return X = "useCallback", u(), A(), Eo(e, t);
			},
			useContext: function(e) {
				return X = "useContext", u(), A(), si(e);
			},
			useEffect: function(e, t) {
				return X = "useEffect", u(), A(), yo(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return X = "useImperativeHandle", u(), A(), wo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				X = "useInsertionEffect", u(), A(), _o(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return X = "useLayoutEffect", u(), A(), So(e, t);
			},
			useMemo: function(e, t) {
				X = "useMemo", u(), A();
				var n = B.H;
				B.H = Uy;
				try {
					return Oo(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				X = "useReducer", u(), A();
				var r = B.H;
				B.H = Uy;
				try {
					return za(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function(e) {
				return X = "useRef", u(), A(), go(e);
			},
			useState: function(e) {
				X = "useState", u(), A();
				var t = B.H;
				B.H = Uy;
				try {
					return Za(e);
				} finally {
					B.H = t;
				}
			},
			useDebugValue: function() {
				X = "useDebugValue", u(), A();
			},
			useDeferredValue: function(e, t) {
				return X = "useDeferredValue", u(), A(), Ao(e, t);
			},
			useTransition: function() {
				return X = "useTransition", u(), A(), Bo();
			},
			useSyncExternalStore: function(e, t, n) {
				return X = "useSyncExternalStore", u(), A(), Ua(e, t, n);
			},
			useId: function() {
				return X = "useId", u(), A(), Wo();
			},
			useFormState: function(e, t) {
				return X = "useFormState", u(), A(), lo(e, t);
			},
			useActionState: function(e, t) {
				return X = "useActionState", u(), A(), lo(e, t);
			},
			useOptimistic: function(e) {
				return X = "useOptimistic", u(), A(), Qa(e);
			},
			useMemoCache: function(e) {
				return u(), La(e);
			},
			useHostTransitionStatus: Uo,
			useCacheRefresh: function() {
				return X = "useCacheRefresh", A(), Go();
			},
			useEffectEvent: function(e) {
				return X = "useEffectEvent", u(), A(), xo(e);
			}
		}, Wy = {
			readContext: function(e) {
				return d(), si(e);
			},
			use: function(e) {
				return u(), Ia(e);
			},
			useCallback: function(e, t) {
				return X = "useCallback", u(), j(), Do(e, t);
			},
			useContext: function(e) {
				return X = "useContext", u(), j(), si(e);
			},
			useEffect: function(e, t) {
				X = "useEffect", u(), j(), vo(2048, vy, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return X = "useImperativeHandle", u(), j(), To(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return X = "useInsertionEffect", u(), j(), vo(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return X = "useLayoutEffect", u(), j(), vo(4, _y, e, t);
			},
			useMemo: function(e, t) {
				X = "useMemo", u(), j();
				var n = B.H;
				B.H = Wy;
				try {
					return ko(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				X = "useReducer", u(), j();
				var r = B.H;
				B.H = Wy;
				try {
					return Ba(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function() {
				return X = "useRef", u(), j(), Na().memoizedState;
			},
			useState: function() {
				X = "useState", u(), j();
				var e = B.H;
				B.H = Wy;
				try {
					return Ba(Ra);
				} finally {
					B.H = e;
				}
			},
			useDebugValue: function() {
				X = "useDebugValue", u(), j();
			},
			useDeferredValue: function(e, t) {
				return X = "useDeferredValue", u(), j(), jo(e, t);
			},
			useTransition: function() {
				return X = "useTransition", u(), j(), Vo();
			},
			useSyncExternalStore: function(e, t, n) {
				return X = "useSyncExternalStore", u(), j(), Wa(e, t, n);
			},
			useId: function() {
				return X = "useId", u(), j(), Na().memoizedState;
			},
			useFormState: function(e) {
				return X = "useFormState", u(), j(), uo(e);
			},
			useActionState: function(e) {
				return X = "useActionState", u(), j(), uo(e);
			},
			useOptimistic: function(e, t) {
				return X = "useOptimistic", u(), j(), $a(e, t);
			},
			useMemoCache: function(e) {
				return u(), La(e);
			},
			useHostTransitionStatus: Uo,
			useCacheRefresh: function() {
				return X = "useCacheRefresh", j(), Na().memoizedState;
			},
			useEffectEvent: function(e) {
				return X = "useEffectEvent", u(), j(), M(e);
			}
		}, Gy = {
			readContext: function(e) {
				return d(), si(e);
			},
			use: function(e) {
				return u(), Ia(e);
			},
			useCallback: function(e, t) {
				return X = "useCallback", u(), j(), Do(e, t);
			},
			useContext: function(e) {
				return X = "useContext", u(), j(), si(e);
			},
			useEffect: function(e, t) {
				X = "useEffect", u(), j(), vo(2048, vy, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return X = "useImperativeHandle", u(), j(), To(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return X = "useInsertionEffect", u(), j(), vo(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return X = "useLayoutEffect", u(), j(), vo(4, _y, e, t);
			},
			useMemo: function(e, t) {
				X = "useMemo", u(), j();
				var n = B.H;
				B.H = Wy;
				try {
					return ko(e, t);
				} finally {
					B.H = n;
				}
			},
			useReducer: function(e, t, n) {
				X = "useReducer", u(), j();
				var r = B.H;
				B.H = Wy;
				try {
					return Ha(e, t, n);
				} finally {
					B.H = r;
				}
			},
			useRef: function() {
				return X = "useRef", u(), j(), Na().memoizedState;
			},
			useState: function() {
				X = "useState", u(), j();
				var e = B.H;
				B.H = Wy;
				try {
					return Ha(Ra);
				} finally {
					B.H = e;
				}
			},
			useDebugValue: function() {
				X = "useDebugValue", u(), j();
			},
			useDeferredValue: function(e, t) {
				return X = "useDeferredValue", u(), j(), Mo(e, t);
			},
			useTransition: function() {
				return X = "useTransition", u(), j(), Ho();
			},
			useSyncExternalStore: function(e, t, n) {
				return X = "useSyncExternalStore", u(), j(), Wa(e, t, n);
			},
			useId: function() {
				return X = "useId", u(), j(), Na().memoizedState;
			},
			useFormState: function(e) {
				return X = "useFormState", u(), j(), mo(e);
			},
			useActionState: function(e) {
				return X = "useActionState", u(), j(), mo(e);
			},
			useOptimistic: function(e, t) {
				return X = "useOptimistic", u(), j(), to(e, t);
			},
			useMemoCache: function(e) {
				return u(), La(e);
			},
			useHostTransitionStatus: Uo,
			useCacheRefresh: function() {
				return X = "useCacheRefresh", j(), Na().memoizedState;
			},
			useEffectEvent: function(e) {
				return X = "useEffectEvent", u(), j(), M(e);
			}
		};
		var Ky = {}, qy = /* @__PURE__ */ new Set(), Jy = /* @__PURE__ */ new Set(), Yy = /* @__PURE__ */ new Set(), Xy = /* @__PURE__ */ new Set(), Zy = /* @__PURE__ */ new Set(), Qy = /* @__PURE__ */ new Set(), $y = /* @__PURE__ */ new Set(), eb = /* @__PURE__ */ new Set(), tb = /* @__PURE__ */ new Set(), nb = /* @__PURE__ */ new Set();
		Object.freeze(Ky);
		var rb = {
			enqueueSetState: function(e, t, n) {
				e = e._reactInternals;
				var r = il(e), i = ra(r);
				i.payload = t, n != null && (es(n), i.callback = n), t = ia(e, i, r), t !== null && (pi(r, "this.setState()", e), ol(t, e, r), aa(t, e, r));
			},
			enqueueReplaceState: function(e, t, n) {
				e = e._reactInternals;
				var r = il(e), i = ra(r);
				i.tag = ey, i.payload = t, n != null && (es(n), i.callback = n), t = ia(e, i, r), t !== null && (pi(r, "this.replaceState()", e), ol(t, e, r), aa(t, e, r));
			},
			enqueueForceUpdate: function(e, t) {
				e = e._reactInternals;
				var n = il(e), r = ra(n);
				r.tag = ty, t != null && (es(t), r.callback = t), t = ia(e, r, n), t !== null && (pi(n, "this.forceUpdate()", e), ol(t, e, n), aa(t, e, n));
			}
		}, ib = null, ab = null, ob = Error("This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."), sb = !1, cb = {}, lb = {}, ub = {}, db = {}, fb = !1, pb = {}, mb = {}, hb = {
			dehydrated: null,
			treeContext: null,
			retryLane: 0,
			hydrationErrors: null
		}, gb = !1, _b = null;
		_b = /* @__PURE__ */ new Set();
		var vb = !1, yb = !1, bb = !1, xb = typeof WeakSet == "function" ? WeakSet : Set, Sb = null, Cb = null, wb = null, Tb = null, Eb = !1, Db = null, Ob = !1, kb = 8192, Ab = {
			getCacheForType: function(e) {
				var t = si(h_), n = t.data.get(e);
				return n === void 0 && (n = e(), t.data.set(e, n)), n;
			},
			cacheSignal: function() {
				return si(h_).controller.signal;
			},
			getOwner: function() {
				return gp;
			}
		};
		if (typeof Symbol == "function" && Symbol.for) {
			var jb = Symbol.for;
			jb("selector.component"), jb("selector.has_pseudo_class"), jb("selector.role"), jb("selector.test_id"), jb("selector.text");
		}
		var Mb = [], Nb = typeof WeakMap == "function" ? WeakMap : Map, Pb = 0, Fb = 2, Ib = 4, Lb = 0, Rb = 1, zb = 2, Bb = 3, Vb = 4, Hb = 6, Ub = 5, Z = Pb, Wb = null, Q = null, $ = 0, Gb = 0, Kb = 1, qb = 2, Jb = 3, Yb = 4, Xb = 5, Zb = 6, Qb = 7, $b = 8, ex = 9, tx = Gb, nx = null, rx = !1, ix = !1, ax = !1, ox = 0, sx = Lb, cx = 0, lx = 0, ux = 0, dx = 0, fx = 0, px = null, mx = null, hx = !1, gx = 0, _x = 0, vx = 300, yx = Infinity, bx = 500, xx = null, Sx = null, Cx = null, wx = 0, Tx = 1, Ex = 2, Dx = 3, Ox = 0, kx = 1, Ax = 2, jx = 3, Mx = 4, Nx = 5, Px = 0, Fx = null, Ix = null, Lx = 0, Rx = 0, zx = -0, Bx = null, Vx = null, Hx = null, Ux = wx, Wx = null, Gx = 50, Kx = 0, qx = null, Jx = !1, Yx = !1, Xx = 50, Zx = 0, Qx = null, $x = !1, eS = null, tS = !1, nS = /* @__PURE__ */ new Set(), rS = {}, iS = null, aS = null, oS = !1, sS = !1, cS = !1, lS = !1, uS = 0, dS = {};
		(function() {
			for (var e = 0; e < cg.length; e++) {
				var t = cg[e], n = t.toLowerCase();
				t = t[0].toUpperCase() + t.slice(1), Jn(n, "on" + t);
			}
			Jn(eg, "onAnimationEnd"), Jn(tg, "onAnimationIteration"), Jn(ng, "onAnimationStart"), Jn("dblclick", "onDoubleClick"), Jn("focusin", "onFocus"), Jn("focusout", "onBlur"), Jn(rg, "onTransitionRun"), Jn(ig, "onTransitionStart"), Jn(ag, "onTransitionCancel"), Jn(og, "onTransitionEnd");
		})(), at("onMouseEnter", ["mouseout", "mouseover"]), at("onMouseLeave", ["mouseout", "mouseover"]), at("onPointerEnter", ["pointerout", "pointerover"]), at("onPointerLeave", ["pointerout", "pointerover"]), it("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), it("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), it("onBeforeInput", [
			"compositionend",
			"keypress",
			"textInput",
			"paste"
		]), it("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), it("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), it("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
		var fS = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), pS = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(fS)), mS = "_reactListening" + Math.random().toString(36).slice(2), hS = !1, gS = !1, _S = !1, vS = !1, yS = !1, bS = !1, xS = !1, SS = {}, CS = /\r\n?/g, wS = /\u0000|\uFFFD/g, TS = "http://www.w3.org/1999/xlink", ES = "http://www.w3.org/XML/1998/namespace", DS = "javascript:throw new Error('React form unexpectedly submitted.')", OS = "suppressHydrationWarning", kS = "&", AS = "/&", jS = "$", MS = "/$", NS = "$?", PS = "$~", FS = "$!", IS = "html", LS = "body", RS = "head", zS = "F!", BS = "F", VS = "loading", HS = "style", US = 0, WS = 1, GS = 2, KS = null, qS = null, JS = {
			dialog: !0,
			webview: !0
		}, YS = null, XS = void 0, ZS = typeof setTimeout == "function" ? setTimeout : void 0, QS = typeof clearTimeout == "function" ? clearTimeout : void 0, $S = -1, eC = typeof Promise == "function" ? Promise : void 0, tC = typeof queueMicrotask == "function" ? queueMicrotask : eC === void 0 ? ZS : function(e) {
			return eC.resolve(null).then(e).catch(Ju);
		}, nC = null, rC = 0, iC = 1, aC = 2, oC = 3, sC = 4, cC = /* @__PURE__ */ new Map(), lC = /* @__PURE__ */ new Set(), uC = Yf.d;
		Yf.d = {
			f: function() {
				var e = uC.f(), t = dl();
				return e || t;
			},
			r: function(e) {
				var t = et(e);
				t !== null && t.tag === 5 && t.type === "form" ? zo(t) : uC.r(e);
			},
			D: function(e) {
				uC.D(e), jd("dns-prefetch", e, null);
			},
			C: function(e, t) {
				uC.C(e, t), jd("preconnect", e, t);
			},
			L: function(e, t, n) {
				uC.L(e, t, n);
				var r = dC;
				if (r && e && t) {
					var i = "link[rel=\"preload\"][as=\"" + _t(t) + "\"]";
					t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + _t(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + _t(n.imageSizes) + "\"]")) : i += "[href=\"" + _t(e) + "\"]";
					var a = i;
					switch (t) {
						case "style":
							a = R(e);
							break;
						case "script": a = Ld(e);
					}
					cC.has(a) || (e = z({
						rel: "preload",
						href: t === "image" && n && n.imageSrcSet ? void 0 : e,
						as: t
					}, n), cC.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Pd(a)) || t === "script" && r.querySelector(Rd(a)) || (t = r.createElement("link"), Du(t, "link", e), rt(t), r.head.appendChild(t)));
				}
			},
			m: function(e, t) {
				uC.m(e, t);
				var n = dC;
				if (n && e) {
					var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + _t(r) + "\"][href=\"" + _t(e) + "\"]", a = i;
					switch (r) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script": a = Ld(e);
					}
					if (!cC.has(a) && (e = z({
						rel: "modulepreload",
						href: e
					}, t), cC.set(a, e), n.querySelector(i) === null)) {
						switch (r) {
							case "audioworklet":
							case "paintworklet":
							case "serviceworker":
							case "sharedworker":
							case "worker":
							case "script": if (n.querySelector(Rd(a))) return;
						}
						r = n.createElement("link"), Du(r, "link", e), rt(r), n.head.appendChild(r);
					}
				}
			},
			X: function(e, t) {
				uC.X(e, t);
				var n = dC;
				if (n && e) {
					var r = nt(n).hoistableScripts, i = Ld(e), a = r.get(i);
					a || (a = n.querySelector(Rd(i)), a || (e = z({
						src: e,
						async: !0
					}, t), (t = cC.get(i)) && Hd(e, t), a = n.createElement("script"), rt(a), Du(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			},
			S: function(e, t, n) {
				uC.S(e, t, n);
				var r = dC;
				if (r && e) {
					var i = nt(r).hoistableStyles, a = R(e);
					t ||= "default";
					var o = i.get(a);
					if (!o) {
						var s = {
							loading: rC,
							preload: null
						};
						if (o = r.querySelector(Pd(a))) s.loading = iC | sC;
						else {
							e = z({
								rel: "stylesheet",
								href: e,
								"data-precedence": t
							}, n), (n = cC.get(a)) && Vd(e, n);
							var c = o = r.createElement("link");
							rt(c), Du(c, "link", e), c._p = new Promise(function(e, t) {
								c.onload = e, c.onerror = t;
							}), c.addEventListener("load", function() {
								s.loading |= iC;
							}), c.addEventListener("error", function() {
								s.loading |= aC;
							}), s.loading |= sC, Bd(o, t, r);
						}
						o = {
							type: "stylesheet",
							instance: o,
							count: 1,
							state: s
						}, i.set(a, o);
					}
				}
			},
			M: function(e, t) {
				uC.M(e, t);
				var n = dC;
				if (n && e) {
					var r = nt(n).hoistableScripts, i = Ld(e), a = r.get(i);
					a || (a = n.querySelector(Rd(i)), a || (e = z({
						src: e,
						async: !0,
						type: "module"
					}, t), (t = cC.get(i)) && Hd(e, t), a = n.createElement("script"), rt(a), Du(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			}
		};
		var dC = typeof document > "u" ? null : document, fC = null, pC = 6e4, mC = 800, hC = 500, gC = 0, _C = null, vC = null, yC = Xf, bC = {
			$$typeof: Rf,
			Provider: null,
			Consumer: null,
			_currentValue: yC,
			_currentValue2: yC,
			_threadCount: 0
		}, xC = "%c%s%c", SC = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", CC = "", wC = " ", TC = Function.prototype.bind, EC = !1, DC = null, OC = null, kC = null, AC = null, jC = null, MC = null, NC = null, PC = null, FC = null, IC = null;
		DC = function(e, r, i, a) {
			r = t(e, r), r !== null && (i = n(r.memoizedState, i, 0, a), r.memoizedState = i, r.baseState = i, e.memoizedProps = z({}, e.memoizedProps), i = gr(e, 2), i !== null && ol(i, e, 2));
		}, OC = function(e, n, r) {
			n = t(e, n), n !== null && (r = s(n.memoizedState, r, 0), n.memoizedState = r, n.baseState = r, e.memoizedProps = z({}, e.memoizedProps), r = gr(e, 2), r !== null && ol(r, e, 2));
		}, kC = function(e, n, r, i) {
			n = t(e, n), n !== null && (r = a(n.memoizedState, r, i), n.memoizedState = r, n.baseState = r, e.memoizedProps = z({}, e.memoizedProps), r = gr(e, 2), r !== null && ol(r, e, 2));
		}, AC = function(e, t, r) {
			e.pendingProps = n(e.memoizedProps, t, 0, r), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = gr(e, 2), t !== null && ol(t, e, 2);
		}, jC = function(e, t) {
			e.pendingProps = s(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = gr(e, 2), t !== null && ol(t, e, 2);
		}, MC = function(e, t, n) {
			e.pendingProps = a(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = gr(e, 2), t !== null && ol(t, e, 2);
		}, NC = function(e) {
			var t = gr(e, 2);
			t !== null && ol(t, e, 2);
		}, PC = function(e) {
			var t = ze(), n = gr(e, t);
			n !== null && ol(n, e, t);
		}, FC = function(e) {
			l = e;
		}, IC = function(e) {
			c = e;
		};
		var LC = !0, RC = null, zC = !1, BC = null, VC = null, HC = null, UC = /* @__PURE__ */ new Map(), WC = /* @__PURE__ */ new Map(), GC = [], KC = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" "), qC = null;
		if (Ef.prototype.render = Tf.prototype.render = function(e) {
			var t = this._internalRoot;
			if (t === null) throw Error("Cannot update an unmounted root.");
			var n = arguments;
			typeof n[1] == "function" ? console.error("does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : y(n[1]) ? console.error("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : n[1] !== void 0 && console.error("You passed a second argument to root.render(...) but it only accepts one argument."), n = e;
			var r = t.current;
			tf(r, il(r), n, t, null, null);
		}, Ef.prototype.unmount = Tf.prototype.unmount = function() {
			var e = arguments;
			if (typeof e[0] == "function" && console.error("does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."), e = this._internalRoot, e !== null) {
				this._internalRoot = null;
				var t = e.containerInfo;
				(Z & (Fb | Ib)) !== Pb && console.error("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), tf(e.current, 2, null, e, null, null), dl(), t[Yp] = null;
			}
		}, Ef.prototype.unstable_scheduleHydration = function(e) {
			if (e) {
				var t = Xe();
				e = {
					blockedOn: null,
					target: e,
					priority: t
				};
				for (var n = 0; n < GC.length && t !== 0 && t < GC[n].priority; n++);
				GC.splice(n, 0, e), n === 0 && _f(e);
			}
		}, (function() {
			var e = kf.version;
			if (e !== "19.2.7") throw Error("Incompatible React versions: The \"react\" and \"react-dom\" packages must have the exact same version. Instead got:\n  - react:      " + (e + "\n  - react-dom:  19.2.7\nLearn more: https://react.dev/warnings/version-mismatch"));
		})(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"), Yf.findDOMNode = function(e) {
			var t = e._reactInternals;
			if (t === void 0) throw typeof e.render == "function" ? Error("Unable to find node on an unmounted component.") : (e = Object.keys(e).join(","), Error("Argument appears to not be a ReactComponent. Keys: " + e));
			return e = re(t), e = e === null ? null : S(e), e = e === null ? null : e.stateNode, e;
		}, !(function() {
			var e = {
				bundleType: 1,
				version: "19.2.7",
				rendererPackageName: "react-dom",
				currentDispatcherRef: B,
				reconcilerVersion: "19.2.7"
			};
			return e.overrideHookState = DC, e.overrideHookStateDeletePath = OC, e.overrideHookStateRenamePath = kC, e.overrideProps = AC, e.overridePropsDeletePath = jC, e.overridePropsRenamePath = MC, e.scheduleUpdate = NC, e.scheduleRetry = PC, e.setErrorHandler = FC, e.setSuspenseHandler = IC, e.scheduleRefresh = _, e.scheduleRoot = g, e.setRefreshHandler = v, e.getCurrentFiber = sf, Me(e);
		})() && th && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
			var JC = window.location.protocol;
			/^(https?|file):$/.test(JC) && console.info("%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (JC === "file:" ? "\nYou might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq" : ""), "font-weight:bold");
		}
		e.createRoot = function(e, t) {
			if (!y(e)) throw Error("Target container is not a DOM element.");
			Df(e);
			var n = !1, r = "", i = as, a = os, o = ss;
			return t != null && (t.hydrate ? console.warn("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t && t.$$typeof === Mf && console.error("You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);"), !0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = $d(e, 1, !1, null, null, n, r, null, i, a, o, wf), e[Yp] = t.current, du(e), new Tf(t);
		}, e.hydrateRoot = function(e, t, n) {
			if (!y(e)) throw Error("Target container is not a DOM element.");
			Df(e), t === void 0 && console.error("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
			var r = !1, i = "", a = as, o = os, s = ss, c = null;
			return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (a = n.onUncaughtError), n.onCaughtError !== void 0 && (o = n.onCaughtError), n.onRecoverableError !== void 0 && (s = n.onRecoverableError), n.formState !== void 0 && (c = n.formState)), t = $d(e, 1, !0, t, n ?? null, r, i, c, a, o, s, wf), t.context = ef(null), n = t.current, r = il(n), r = Ke(r), i = ra(r), i.callback = null, ia(n, i, r), pi(r, "hydrateRoot()", null), n = r, t.current.lanes = n, Ve(t, n), P(t), e[Yp] = t.current, du(e), new Ef(t);
		}, e.version = "19.2.7", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), En = /* @__PURE__ */ n((/* @__PURE__ */ e(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
			if (process.env.NODE_ENV !== "production") throw Error("^_^");
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
			} catch (e) {
				console.error(e);
			}
		}
	}
	process.env.NODE_ENV === "production" ? (n(), t.exports = wn()) : t.exports = Tn();
})))(), 1);
function Dn(e, t) {
	let n = typeof e == "string" ? document.querySelector(e) : e;
	if (!n) throw Error(`AMP Reader host was not found: ${String(e)}`);
	let r = (0, En.createRoot)(n), i = (e) => r.render(/* @__PURE__ */ (0, D.jsx)(Cn, { ...e }));
	return i(t), {
		update: i,
		unmount: () => r.unmount()
	};
}
//#endregion
export { Cn as AMPReader, _n as RuntimeDocument, nt as createAMPAssetResolver, et as loadAMPDocument, Dn as mountAMPReader };

//# sourceMappingURL=amp-reader.js.map