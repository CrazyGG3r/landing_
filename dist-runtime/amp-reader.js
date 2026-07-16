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
 *        src: "../projects/AMProj1/document.json"
 *      });
 *    </script>
 *
 * Change only the host selector and AMP document path as needed.
 * See AMP-READER-USAGE.html in this directory for a copy-ready example.
 */
import { i as e, n as t, o as n, r, t as i } from "./scheduler-CFRa_C8g.js";
import { t as a } from "./model-activity-Ba1Jlnbi.js";
//#region node_modules/zod/v4/core/core.js
var o;
function s(e, t, n) {
	function r(n, r) {
		if (n._zod || Object.defineProperty(n, "_zod", {
			value: {
				def: r,
				constr: o,
				traits: /* @__PURE__ */ new Set()
			},
			enumerable: !1
		}), n._zod.traits.has(e)) return;
		n._zod.traits.add(e), t(n, r);
		let i = o.prototype, a = Object.keys(i);
		for (let e = 0; e < a.length; e++) {
			let t = a[e];
			t in n || (n[t] = i[t].bind(n));
		}
	}
	let i = n?.Parent ?? Object;
	class a extends i {}
	Object.defineProperty(a, "name", { value: e });
	function o(e) {
		var t;
		let i = n?.Parent ? new a() : this;
		r(i, e), (t = i._zod).deferred ?? (t.deferred = []);
		for (let e of i._zod.deferred) e();
		return i;
	}
	return Object.defineProperty(o, "init", { value: r }), Object.defineProperty(o, Symbol.hasInstance, { value: (t) => n?.Parent && t instanceof n.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(o, "name", { value: e }), o;
}
var c = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
}, l = class extends Error {
	constructor(e) {
		super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
	}
};
(o = globalThis).__zod_globalConfig ?? (o.__zod_globalConfig = {});
var u = globalThis.__zod_globalConfig;
function d(e) {
	return e && Object.assign(u, e), u;
}
//#endregion
//#region node_modules/zod/v4/core/util.js
function f(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function p(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function m(e) {
	return { get value() {
		{
			let t = e();
			return Object.defineProperty(this, "value", { value: t }), t;
		}
		throw Error("cached value already set");
	} };
}
function h(e) {
	return e == null;
}
function g(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function _(e, t) {
	let n = e / t, r = Math.round(n), i = 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
var v = /* @__PURE__*/ Symbol("evaluating");
function y(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== v) return r === void 0 && (r = v, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function b(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function x(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function ee(e) {
	return JSON.stringify(e);
}
function te(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var ne = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function re(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var ie = /* @__PURE__*/ m(() => {
	if (u.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
	try {
		return Function(""), !0;
	} catch {
		return !1;
	}
});
function ae(e) {
	if (re(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return !(re(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function oe(e) {
	return ae(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
var S = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function se(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ce(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function C(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function le(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
var ue = {
	safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function w(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	return ce(e, x(e._zod.def, {
		get shape() {
			let e = {};
			for (let r in t) {
				if (!(r in n.shape)) throw Error(`Unrecognized key: "${r}"`);
				t[r] && (e[r] = n.shape[r]);
			}
			return b(this, "shape", e), e;
		},
		checks: []
	}));
}
function T(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	return ce(e, x(e._zod.def, {
		get shape() {
			let r = { ...e._zod.def.shape };
			for (let e in t) {
				if (!(e in n.shape)) throw Error(`Unrecognized key: "${e}"`);
				t[e] && delete r[e];
			}
			return b(this, "shape", r), r;
		},
		checks: []
	}));
}
function de(e, t) {
	if (!ae(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = e._zod.def.shape;
		for (let e in t) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return ce(e, x(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return b(this, "shape", n), n;
	} }));
}
function fe(e, t) {
	if (!ae(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return ce(e, x(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return b(this, "shape", n), n;
	} }));
}
function pe(e, t) {
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return ce(e, x(e._zod.def, {
		get shape() {
			let n = {
				...e._zod.def.shape,
				...t._zod.def.shape
			};
			return b(this, "shape", n), n;
		},
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function me(e, t, n) {
	let r = t._zod.def.checks;
	if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
	return ce(t, x(t._zod.def, {
		get shape() {
			let r = t._zod.def.shape, i = { ...r };
			if (n) for (let t in n) {
				if (!(t in r)) throw Error(`Unrecognized key: "${t}"`);
				n[t] && (i[t] = e ? new e({
					type: "optional",
					innerType: r[t]
				}) : r[t]);
			}
			else for (let t in r) i[t] = e ? new e({
				type: "optional",
				innerType: r[t]
			}) : r[t];
			return b(this, "shape", i), i;
		},
		checks: []
	}));
}
function he(e, t, n) {
	return ce(t, x(t._zod.def, { get shape() {
		let r = t._zod.def.shape, i = { ...r };
		if (n) for (let t in n) {
			if (!(t in i)) throw Error(`Unrecognized key: "${t}"`);
			n[t] && (i[t] = new e({
				type: "nonoptional",
				innerType: r[t]
			}));
		}
		else for (let t in r) i[t] = new e({
			type: "nonoptional",
			innerType: r[t]
		});
		return b(this, "shape", i), i;
	} }));
}
function ge(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function _e(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function ve(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function ye(e) {
	return typeof e == "string" ? e : e?.message;
}
function be(e, t, n) {
	let r = e.message ? e.message : ye(e.inst?._zod.def?.error?.(e)) ?? ye(t?.error?.(e)) ?? ye(n.customError?.(e)) ?? ye(n.localeError?.(e)) ?? "Invalid input", { inst: i, continue: a, input: o, ...s } = e;
	return s.path ??= [], s.message = r, t?.reportInput && (s.input = o), s;
}
function xe(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Se(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
//#endregion
//#region node_modules/zod/v4/core/errors.js
var Ce = (e, t) => {
	e.name = "$ZodError", Object.defineProperty(e, "_zod", {
		value: e._zod,
		enumerable: !1
	}), Object.defineProperty(e, "issues", {
		value: t,
		enumerable: !1
	}), e.message = JSON.stringify(t, p, 2), Object.defineProperty(e, "toString", {
		value: () => e.message,
		enumerable: !1
	});
}, E = s("$ZodError", Ce), we = s("$ZodError", Ce, { Parent: Error });
function Te(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? (n[i.path[0]] = n[i.path[0]] || [], n[i.path[0]].push(t(i))) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function Ee(e, t = (e) => e.message) {
	let n = { _errors: [] }, r = (e, i = []) => {
		for (let a of e.issues) if (a.code === "invalid_union" && a.errors.length) a.errors.map((e) => r({ issues: e }, [...i, ...a.path]));
		else if (a.code === "invalid_key") r({ issues: a.issues }, [...i, ...a.path]);
		else if (a.code === "invalid_element") r({ issues: a.issues }, [...i, ...a.path]);
		else {
			let e = [...i, ...a.path];
			if (e.length === 0) n._errors.push(t(a));
			else {
				let r = n, i = 0;
				for (; i < e.length;) {
					let n = e[i];
					i === e.length - 1 ? (r[n] = r[n] || { _errors: [] }, r[n]._errors.push(t(a))) : r[n] = r[n] || { _errors: [] }, r = r[n], i++;
				}
			}
		}
	};
	return r(e), n;
}
//#endregion
//#region node_modules/zod/v4/core/parse.js
var De = (e) => (t, n, r, i) => {
	let a = r ? {
		...r,
		async: !1
	} : { async: !1 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise) throw new c();
	if (o.issues.length) {
		let t = new ((i?.Err) ?? e)(o.issues.map((e) => be(e, a, d())));
		throw ne(t, i?.callee), t;
	}
	return o.value;
}, Oe = (e) => async (t, n, r, i) => {
	let a = r ? {
		...r,
		async: !0
	} : { async: !0 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise && (o = await o), o.issues.length) {
		let t = new ((i?.Err) ?? e)(o.issues.map((e) => be(e, a, d())));
		throw ne(t, i?.callee), t;
	}
	return o.value;
}, ke = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new c();
	return a.issues.length ? {
		success: !1,
		error: new (e ?? E)(a.issues.map((e) => be(e, i, d())))
	} : {
		success: !0,
		data: a.value
	};
}, Ae = /* @__PURE__*/ ke(we), je = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? {
		success: !1,
		error: new e(a.issues.map((e) => be(e, i, d())))
	} : {
		success: !0,
		data: a.value
	};
}, Me = /* @__PURE__*/ je(we), Ne = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return De(e)(t, n, i);
}, Pe = (e) => (t, n, r) => De(e)(t, n, r), Fe = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return Oe(e)(t, n, i);
}, Ie = (e) => async (t, n, r) => Oe(e)(t, n, r), Le = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return ke(e)(t, n, i);
}, Re = (e) => (t, n, r) => ke(e)(t, n, r), ze = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return je(e)(t, n, i);
}, Be = (e) => async (t, n, r) => je(e)(t, n, r), Ve = /^[cC][0-9a-z]{6,}$/, He = /^[0-9a-z]+$/, Ue = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, We = /^[0-9a-vA-V]{20}$/, Ge = /^[A-Za-z0-9]{27}$/, Ke = /^[a-zA-Z0-9_-]{21}$/, qe = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Je = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Ye = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Xe = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Ze = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function Qe() {
	return new RegExp(Ze, "u");
}
var $e = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, et = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, tt = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, nt = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, rt = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, it = /^[A-Za-z0-9_-]*$/, at = /^https?$/, ot = /^\+[1-9]\d{6,14}$/, st = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", ct = /*@__PURE__*/ RegExp(`^${st}$`);
function lt(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function ut(e) {
	return RegExp(`^${lt(e)}$`);
}
function dt(e) {
	let t = lt({ precision: e.precision }), n = ["Z"];
	e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let r = `${t}(?:${n.join("|")})`;
	return RegExp(`^${st}T(?:${r})$`);
}
var ft = (e) => {
	let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
	return RegExp(`^${t}$`);
}, pt = /^-?\d+$/, mt = /^-?\d+(?:\.\d+)?$/, ht = /^(?:true|false)$/i, gt = /^null$/i, _t = /^[^A-Z]*$/, vt = /^[^a-z]*$/, yt = /*@__PURE__*/ s("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), bt = {
	number: "number",
	bigint: "bigint",
	object: "date"
}, xt = /*@__PURE__*/ s("$ZodCheckLessThan", (e, t) => {
	yt.init(e, t);
	let n = bt[typeof t.value];
	e._zod.onattach.push((e) => {
		let n = e._zod.bag, r = (t.inclusive ? n.maximum : n.exclusiveMaximum) ?? Infinity;
		t.value < r && (t.inclusive ? n.maximum = t.value : n.exclusiveMaximum = t.value);
	}), e._zod.check = (r) => {
		(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
			origin: n,
			code: "too_big",
			maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), St = /*@__PURE__*/ s("$ZodCheckGreaterThan", (e, t) => {
	yt.init(e, t);
	let n = bt[typeof t.value];
	e._zod.onattach.push((e) => {
		let n = e._zod.bag, r = (t.inclusive ? n.minimum : n.exclusiveMinimum) ?? -Infinity;
		t.value > r && (t.inclusive ? n.minimum = t.value : n.exclusiveMinimum = t.value);
	}), e._zod.check = (r) => {
		(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
			origin: n,
			code: "too_small",
			minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), Ct = /*@__PURE__*/ s("$ZodCheckMultipleOf", (e, t) => {
	yt.init(e, t), e._zod.onattach.push((e) => {
		var n;
		(n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
	}), e._zod.check = (n) => {
		if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
		(typeof n.value == "bigint" ? n.value % t.value === BigInt(0) : _(n.value, t.value) === 0) || n.issues.push({
			origin: typeof n.value,
			code: "not_multiple_of",
			divisor: t.value,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), wt = /*@__PURE__*/ s("$ZodCheckNumberFormat", (e, t) => {
	yt.init(e, t), t.format = t.format || "float64";
	let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = ue[t.format];
	e._zod.onattach.push((e) => {
		let r = e._zod.bag;
		r.format = t.format, r.minimum = i, r.maximum = a, n && (r.pattern = pt);
	}), e._zod.check = (o) => {
		let s = o.value;
		if (n) {
			if (!Number.isInteger(s)) {
				o.issues.push({
					expected: r,
					format: t.format,
					code: "invalid_type",
					continue: !1,
					input: s,
					inst: e
				});
				return;
			}
			if (!Number.isSafeInteger(s)) {
				s > 0 ? o.issues.push({
					input: s,
					code: "too_big",
					maximum: 2 ** 53 - 1,
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				}) : o.issues.push({
					input: s,
					code: "too_small",
					minimum: -(2 ** 53 - 1),
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				});
				return;
			}
		}
		s < i && o.issues.push({
			origin: "number",
			input: s,
			code: "too_small",
			minimum: i,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		}), s > a && o.issues.push({
			origin: "number",
			input: s,
			code: "too_big",
			maximum: a,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		});
	};
}), Tt = /*@__PURE__*/ s("$ZodCheckMaxLength", (e, t) => {
	var n;
	yt.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !h(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.maximum ?? Infinity;
		t.maximum < n && (e._zod.bag.maximum = t.maximum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length <= t.maximum) return;
		let i = xe(r);
		n.issues.push({
			origin: i,
			code: "too_big",
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), Et = /*@__PURE__*/ s("$ZodCheckMinLength", (e, t) => {
	var n;
	yt.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !h(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.minimum ?? -Infinity;
		t.minimum > n && (e._zod.bag.minimum = t.minimum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length >= t.minimum) return;
		let i = xe(r);
		n.issues.push({
			origin: i,
			code: "too_small",
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), Dt = /*@__PURE__*/ s("$ZodCheckLengthEquals", (e, t) => {
	var n;
	yt.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !h(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.minimum = t.length, n.maximum = t.length, n.length = t.length;
	}), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if (i === t.length) return;
		let a = xe(r), o = i > t.length;
		n.issues.push({
			origin: a,
			...o ? {
				code: "too_big",
				maximum: t.length
			} : {
				code: "too_small",
				minimum: t.length
			},
			inclusive: !0,
			exact: !0,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Ot = /*@__PURE__*/ s("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	yt.init(e, t), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.format = t.format, t.pattern && (n.patterns ??= /* @__PURE__ */ new Set(), n.patterns.add(t.pattern));
	}), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: t.format,
			input: n.value,
			...t.pattern ? { pattern: t.pattern.toString() } : {},
			inst: e,
			continue: !t.abort
		});
	}) : (r = e._zod).check ?? (r.check = () => {});
}), kt = /*@__PURE__*/ s("$ZodCheckRegex", (e, t) => {
	Ot.init(e, t), e._zod.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: n.value,
			pattern: t.pattern.toString(),
			inst: e,
			continue: !t.abort
		});
	};
}), At = /*@__PURE__*/ s("$ZodCheckLowerCase", (e, t) => {
	t.pattern ??= _t, Ot.init(e, t);
}), jt = /*@__PURE__*/ s("$ZodCheckUpperCase", (e, t) => {
	t.pattern ??= vt, Ot.init(e, t);
}), Mt = /*@__PURE__*/ s("$ZodCheckIncludes", (e, t) => {
	yt.init(e, t);
	let n = se(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
	t.pattern = r, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(r);
	}), e._zod.check = (n) => {
		n.value.includes(t.includes, t.position) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: t.includes,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Nt = /*@__PURE__*/ s("$ZodCheckStartsWith", (e, t) => {
	yt.init(e, t);
	let n = RegExp(`^${se(t.prefix)}.*`);
	t.pattern ??= n, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
	}), e._zod.check = (n) => {
		n.value.startsWith(t.prefix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: t.prefix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Pt = /*@__PURE__*/ s("$ZodCheckEndsWith", (e, t) => {
	yt.init(e, t);
	let n = RegExp(`.*${se(t.suffix)}$`);
	t.pattern ??= n, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
	}), e._zod.check = (n) => {
		n.value.endsWith(t.suffix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: t.suffix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Ft = /*@__PURE__*/ s("$ZodCheckOverwrite", (e, t) => {
	yt.init(e, t), e._zod.check = (e) => {
		e.value = t.tx(e.value);
	};
}), It = class {
	constructor(e = []) {
		this.content = [], this.indent = 0, this && (this.args = e);
	}
	indented(e) {
		this.indent += 1, e(this), --this.indent;
	}
	write(e) {
		if (typeof e == "function") {
			e(this, { execution: "sync" }), e(this, { execution: "async" });
			return;
		}
		let t = e.split("\n").filter((e) => e), n = Math.min(...t.map((e) => e.length - e.trimStart().length)), r = t.map((e) => e.slice(n)).map((e) => " ".repeat(this.indent * 2) + e);
		for (let e of r) this.content.push(e);
	}
	compile() {
		let e = Function, t = this?.args, n = [...(this?.content ?? [""]).map((e) => `  ${e}`)];
		return new e(...t, n.join("\n"));
	}
}, Lt = {
	major: 4,
	minor: 4,
	patch: 3
}, Rt = /*@__PURE__*/ s("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Lt;
	let r = [...e._zod.def.checks ?? []];
	e._zod.traits.has("$ZodCheck") && r.unshift(e);
	for (let t of r) for (let n of t._zod.onattach) n(e);
	if (r.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (e, t, n) => {
			let r = ge(e), i;
			for (let a of t) {
				if (a._zod.def.when) {
					if (_e(e) || !a._zod.def.when(e)) continue;
				} else if (r) continue;
				let t = e.issues.length, o = a._zod.check(e);
				if (o instanceof Promise && n?.async === !1) throw new c();
				if (i || o instanceof Promise) i = (i ?? Promise.resolve()).then(async () => {
					await o, e.issues.length !== t && (r ||= ge(e, t));
				});
				else {
					if (e.issues.length === t) continue;
					r ||= ge(e, t);
				}
			}
			return i ? i.then(() => e) : e;
		}, n = (n, i, a) => {
			if (ge(n)) return n.aborted = !0, n;
			let o = t(i, r, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new c();
				return o.then((t) => e._zod.parse(t, a));
			}
			return e._zod.parse(o, a);
		};
		e._zod.run = (i, a) => {
			if (a.skipChecks) return e._zod.parse(i, a);
			if (a.direction === "backward") {
				let t = e._zod.parse({
					value: i.value,
					issues: []
				}, {
					...a,
					skipChecks: !0
				});
				return t instanceof Promise ? t.then((e) => n(e, i, a)) : n(t, i, a);
			}
			let o = e._zod.parse(i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new c();
				return o.then((e) => t(e, r, a));
			}
			return t(o, r, a);
		};
	}
	y(e, "~standard", () => ({
		validate: (t) => {
			try {
				let n = Ae(e, t);
				return n.success ? { value: n.data } : { issues: n.error?.issues };
			} catch {
				return Me(e, t).then((e) => e.success ? { value: e.data } : { issues: e.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	}));
}), zt = /*@__PURE__*/ s("$ZodString", (e, t) => {
	Rt.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? ft(e._zod.bag), e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = String(n.value);
		} catch {}
		return typeof n.value == "string" || n.issues.push({
			expected: "string",
			code: "invalid_type",
			input: n.value,
			inst: e
		}), n;
	};
}), Bt = /*@__PURE__*/ s("$ZodStringFormat", (e, t) => {
	Ot.init(e, t), zt.init(e, t);
}), Vt = /*@__PURE__*/ s("$ZodGUID", (e, t) => {
	t.pattern ??= Je, Bt.init(e, t);
}), Ht = /*@__PURE__*/ s("$ZodUUID", (e, t) => {
	if (t.version) {
		let e = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[t.version];
		if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
		t.pattern ??= Ye(e);
	} else t.pattern ??= Ye();
	Bt.init(e, t);
}), Ut = /*@__PURE__*/ s("$ZodEmail", (e, t) => {
	t.pattern ??= Xe, Bt.init(e, t);
}), Wt = /*@__PURE__*/ s("$ZodURL", (e, t) => {
	Bt.init(e, t), e._zod.check = (n) => {
		try {
			let r = n.value.trim();
			if (!t.normalize && t.protocol?.source === at.source && !/^https?:\/\//i.test(r)) {
				n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid URL format",
					input: n.value,
					inst: e,
					continue: !t.abort
				});
				return;
			}
			let i = new URL(r);
			t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(i.hostname) || n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid hostname",
				pattern: t.hostname.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(i.protocol.endsWith(":") ? i.protocol.slice(0, -1) : i.protocol) || n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid protocol",
				pattern: t.protocol.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), t.normalize ? n.value = i.href : n.value = r;
			return;
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), Gt = /*@__PURE__*/ s("$ZodEmoji", (e, t) => {
	t.pattern ??= Qe(), Bt.init(e, t);
}), Kt = /*@__PURE__*/ s("$ZodNanoID", (e, t) => {
	t.pattern ??= Ke, Bt.init(e, t);
}), qt = /*@__PURE__*/ s("$ZodCUID", (e, t) => {
	t.pattern ??= Ve, Bt.init(e, t);
}), Jt = /*@__PURE__*/ s("$ZodCUID2", (e, t) => {
	t.pattern ??= He, Bt.init(e, t);
}), Yt = /*@__PURE__*/ s("$ZodULID", (e, t) => {
	t.pattern ??= Ue, Bt.init(e, t);
}), Xt = /*@__PURE__*/ s("$ZodXID", (e, t) => {
	t.pattern ??= We, Bt.init(e, t);
}), Zt = /*@__PURE__*/ s("$ZodKSUID", (e, t) => {
	t.pattern ??= Ge, Bt.init(e, t);
}), Qt = /*@__PURE__*/ s("$ZodISODateTime", (e, t) => {
	t.pattern ??= dt(t), Bt.init(e, t);
}), $t = /*@__PURE__*/ s("$ZodISODate", (e, t) => {
	t.pattern ??= ct, Bt.init(e, t);
}), en = /*@__PURE__*/ s("$ZodISOTime", (e, t) => {
	t.pattern ??= ut(t), Bt.init(e, t);
}), tn = /*@__PURE__*/ s("$ZodISODuration", (e, t) => {
	t.pattern ??= qe, Bt.init(e, t);
}), nn = /*@__PURE__*/ s("$ZodIPv4", (e, t) => {
	t.pattern ??= $e, Bt.init(e, t), e._zod.bag.format = "ipv4";
}), rn = /*@__PURE__*/ s("$ZodIPv6", (e, t) => {
	t.pattern ??= et, Bt.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
		try {
			new URL(`http://[${n.value}]`);
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), an = /*@__PURE__*/ s("$ZodCIDRv4", (e, t) => {
	t.pattern ??= tt, Bt.init(e, t);
}), on = /*@__PURE__*/ s("$ZodCIDRv6", (e, t) => {
	t.pattern ??= nt, Bt.init(e, t), e._zod.check = (n) => {
		let r = n.value.split("/");
		try {
			if (r.length !== 2) throw Error();
			let [e, t] = r;
			if (!t) throw Error();
			let n = Number(t);
			if (`${n}` !== t || n < 0 || n > 128) throw Error();
			new URL(`http://[${e}]`);
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
});
function sn(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
var cn = /*@__PURE__*/ s("$ZodBase64", (e, t) => {
	t.pattern ??= rt, Bt.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
		sn(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function ln(e) {
	if (!it.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return sn(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var un = /*@__PURE__*/ s("$ZodBase64URL", (e, t) => {
	t.pattern ??= it, Bt.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
		ln(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), dn = /*@__PURE__*/ s("$ZodE164", (e, t) => {
	t.pattern ??= ot, Bt.init(e, t);
});
function fn(e, t = null) {
	try {
		let n = e.split(".");
		if (n.length !== 3) return !1;
		let [r] = n;
		if (!r) return !1;
		let i = JSON.parse(atob(r));
		return !("typ" in i && i?.typ !== "JWT" || !i.alg || t && (!("alg" in i) || i.alg !== t));
	} catch {
		return !1;
	}
}
var pn = /*@__PURE__*/ s("$ZodJWT", (e, t) => {
	Bt.init(e, t), e._zod.check = (n) => {
		fn(n.value, t.alg) || n.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), mn = /*@__PURE__*/ s("$ZodNumber", (e, t) => {
	Rt.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? mt, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = Number(n.value);
		} catch {}
		let i = n.value;
		if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i)) return n;
		let a = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : "Infinity" : void 0;
		return n.issues.push({
			expected: "number",
			code: "invalid_type",
			input: i,
			inst: e,
			...a ? { received: a } : {}
		}), n;
	};
}), hn = /*@__PURE__*/ s("$ZodNumberFormat", (e, t) => {
	wt.init(e, t), mn.init(e, t);
}), gn = /*@__PURE__*/ s("$ZodBoolean", (e, t) => {
	Rt.init(e, t), e._zod.pattern = ht, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = !!n.value;
		} catch {}
		let i = n.value;
		return typeof i == "boolean" || n.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
	};
}), _n = /*@__PURE__*/ s("$ZodNull", (e, t) => {
	Rt.init(e, t), e._zod.pattern = gt, e._zod.values = /* @__PURE__ */ new Set([null]), e._zod.parse = (t, n) => {
		let r = t.value;
		return r === null || t.issues.push({
			expected: "null",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
	};
}), vn = /*@__PURE__*/ s("$ZodUnknown", (e, t) => {
	Rt.init(e, t), e._zod.parse = (e) => e;
}), yn = /*@__PURE__*/ s("$ZodNever", (e, t) => {
	Rt.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function bn(e, t, n) {
	e.issues.length && t.issues.push(...ve(n, e.issues)), t.value[n] = e.value;
}
var xn = /*@__PURE__*/ s("$ZodArray", (e, t) => {
	Rt.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!Array.isArray(i)) return n.issues.push({
			expected: "array",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
		n.value = Array(i.length);
		let a = [];
		for (let e = 0; e < i.length; e++) {
			let o = i[e], s = t.element._zod.run({
				value: o,
				issues: []
			}, r);
			s instanceof Promise ? a.push(s.then((t) => bn(t, n, e))) : bn(s, n, e);
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
});
function Sn(e, t, n, r, i, a) {
	let o = n in r;
	if (e.issues.length) {
		if (i && a && !o) return;
		t.issues.push(...ve(n, e.issues));
	}
	if (!o && !i) {
		e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		});
		return;
	}
	e.value === void 0 ? o && (t.value[n] = void 0) : t.value[n] = e.value;
}
function Cn(e) {
	let t = Object.keys(e.shape);
	for (let n of t) if (!e.shape?.[n]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${n}": expected a Zod schema`);
	let n = le(e.shape);
	return {
		...e,
		keys: t,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(n)
	};
}
function wn(e, t, n, r, i, a) {
	let o = [], s = i.keySet, c = i.catchall._zod, l = c.def.type, u = c.optin === "optional", d = c.optout === "optional";
	for (let i in t) {
		if (i === "__proto__" || s.has(i)) continue;
		if (l === "never") {
			o.push(i);
			continue;
		}
		let a = c.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => Sn(e, n, i, t, u, d))) : Sn(a, n, i, t, u, d);
	}
	return o.length && n.issues.push({
		code: "unrecognized_keys",
		keys: o,
		input: t,
		inst: a
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var Tn = /*@__PURE__*/ s("$ZodObject", (e, t) => {
	if (Rt.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
		let e = t.shape;
		Object.defineProperty(t, "shape", { get: () => {
			let n = { ...e };
			return Object.defineProperty(t, "shape", { value: n }), n;
		} });
	}
	let n = m(() => Cn(t));
	y(e._zod, "propValues", () => {
		let e = t.shape, n = {};
		for (let t in e) {
			let r = e[t]._zod;
			if (r.values) {
				n[t] ?? (n[t] = /* @__PURE__ */ new Set());
				for (let e of r.values) n[t].add(e);
			}
		}
		return n;
	});
	let r = re, i = t.catchall, a;
	e._zod.parse = (t, o) => {
		a ??= n.value;
		let s = t.value;
		if (!r(s)) return t.issues.push({
			expected: "object",
			code: "invalid_type",
			input: s,
			inst: e
		}), t;
		t.value = {};
		let c = [], l = a.shape;
		for (let e of a.keys) {
			let n = l[e], r = n._zod.optin === "optional", i = n._zod.optout === "optional", a = n._zod.run({
				value: s[e],
				issues: []
			}, o);
			a instanceof Promise ? c.push(a.then((n) => Sn(n, t, e, s, r, i))) : Sn(a, t, e, s, r, i);
		}
		return i ? wn(c, s, t, o, n.value, e) : c.length ? Promise.all(c).then(() => t) : t;
	};
}), En = /*@__PURE__*/ s("$ZodObjectJIT", (e, t) => {
	Tn.init(e, t);
	let n = e._zod.parse, r = m(() => Cn(t)), i = (e) => {
		let t = new It([
			"shape",
			"payload",
			"ctx"
		]), n = r.value, i = (e) => {
			let t = ee(e);
			return `shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`;
		};
		t.write("const input = payload.value;");
		let a = Object.create(null), o = 0;
		for (let e of n.keys) a[e] = `key_${o++}`;
		t.write("const newResult = {};");
		for (let r of n.keys) {
			let n = a[r], o = ee(r), s = e[r], c = s?._zod?.optin === "optional", l = s?._zod?.optout === "optional";
			t.write(`const ${n} = ${i(r)};`), c && l ? t.write(`
        if (${n}.issues.length) {
          if (${o} in input) {
            payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${o}, ...iss.path] : [${o}]
            })));
          }
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `) : c ? t.write(`
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `) : t.write(`
        const ${n}_present = ${o} in input;
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${o}]
          });
        }

        if (${n}_present) {
          if (${n}.value === undefined) {
            newResult[${o}] = undefined;
          } else {
            newResult[${o}] = ${n}.value;
          }
        }

      `);
		}
		t.write("payload.value = newResult;"), t.write("return payload;");
		let s = t.compile();
		return (t, n) => s(e, t, n);
	}, a, o = re, s = !u.jitless, c = s && ie.value, l = t.catchall, d;
	e._zod.parse = (u, f) => {
		d ??= r.value;
		let p = u.value;
		return o(p) ? s && c && f?.async === !1 && f.jitless !== !0 ? (a ||= i(t.shape), u = a(u, f), l ? wn([], p, u, f, d, e) : u) : n(u, f) : (u.issues.push({
			expected: "object",
			code: "invalid_type",
			input: p,
			inst: e
		}), u);
	};
});
function Dn(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !ge(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => be(e, r, d())))
	}), t);
}
var On = /*@__PURE__*/ s("$ZodUnion", (e, t) => {
	Rt.init(e, t), y(e._zod, "optin", () => t.options.some((e) => e._zod.optin === "optional") ? "optional" : void 0), y(e._zod, "optout", () => t.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), y(e._zod, "values", () => {
		if (t.options.every((e) => e._zod.values)) return new Set(t.options.flatMap((e) => Array.from(e._zod.values)));
	}), y(e._zod, "pattern", () => {
		if (t.options.every((e) => e._zod.pattern)) {
			let e = t.options.map((e) => e._zod.pattern);
			return RegExp(`^(${e.map((e) => g(e.source)).join("|")})$`);
		}
	});
	let n = t.options.length === 1 ? t.options[0]._zod.run : null;
	e._zod.parse = (r, i) => {
		if (n) return n(r, i);
		let a = !1, o = [];
		for (let e of t.options) {
			let t = e._zod.run({
				value: r.value,
				issues: []
			}, i);
			if (t instanceof Promise) o.push(t), a = !0;
			else {
				if (t.issues.length === 0) return t;
				o.push(t);
			}
		}
		return a ? Promise.all(o).then((t) => Dn(t, r, e, i)) : Dn(o, r, e, i);
	};
}), kn = /*@__PURE__*/ s("$ZodDiscriminatedUnion", (e, t) => {
	t.inclusive = !1, On.init(e, t);
	let n = e._zod.parse;
	y(e._zod, "propValues", () => {
		let e = {};
		for (let n of t.options) {
			let r = n._zod.propValues;
			if (!r || Object.keys(r).length === 0) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
			for (let [t, n] of Object.entries(r)) {
				e[t] || (e[t] = /* @__PURE__ */ new Set());
				for (let r of n) e[t].add(r);
			}
		}
		return e;
	});
	let r = m(() => {
		let e = t.options, n = /* @__PURE__ */ new Map();
		for (let r of e) {
			let e = r._zod.propValues?.[t.discriminator];
			if (!e || e.size === 0) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
			for (let t of e) {
				if (n.has(t)) throw Error(`Duplicate discriminator value "${String(t)}"`);
				n.set(t, r);
			}
		}
		return n;
	});
	e._zod.parse = (i, a) => {
		let o = i.value;
		if (!re(o)) return i.issues.push({
			code: "invalid_type",
			expected: "object",
			input: o,
			inst: e
		}), i;
		let s = r.value.get(o?.[t.discriminator]);
		return s ? s._zod.run(i, a) : t.unionFallback || a.direction === "backward" ? n(i, a) : (i.issues.push({
			code: "invalid_union",
			errors: [],
			note: "No matching discriminator",
			discriminator: t.discriminator,
			options: Array.from(r.value.keys()),
			input: o,
			path: [t.discriminator],
			inst: e
		}), i);
	};
}), An = /*@__PURE__*/ s("$ZodIntersection", (e, t) => {
	Rt.init(e, t), e._zod.parse = (e, n) => {
		let r = e.value, i = t.left._zod.run({
			value: r,
			issues: []
		}, n), a = t.right._zod.run({
			value: r,
			issues: []
		}, n);
		return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => Mn(e, t, n)) : Mn(e, i, a);
	};
});
function jn(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (ae(e) && ae(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		for (let n of r) {
			let r = jn(e[n], t[n]);
			if (!r.valid) return {
				valid: !1,
				mergeErrorPath: [n, ...r.mergeErrorPath]
			};
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return {
			valid: !1,
			mergeErrorPath: []
		};
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = jn(i, a);
			if (!o.valid) return {
				valid: !1,
				mergeErrorPath: [r, ...o.mergeErrorPath]
			};
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return {
		valid: !1,
		mergeErrorPath: []
	};
}
function Mn(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i;
	for (let n of t.issues) if (n.code === "unrecognized_keys") {
		i ??= n;
		for (let e of n.keys) r.has(e) || r.set(e, {}), r.get(e).l = !0;
	} else e.issues.push(n);
	for (let t of n.issues) if (t.code === "unrecognized_keys") for (let e of t.keys) r.has(e) || r.set(e, {}), r.get(e).r = !0;
	else e.issues.push(t);
	let a = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
	if (a.length && i && e.issues.push({
		...i,
		keys: a
	}), ge(e)) return e;
	let o = jn(t.value, n.value);
	if (!o.valid) throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
	return e.value = o.data, e;
}
var Nn = /*@__PURE__*/ s("$ZodRecord", (e, t) => {
	Rt.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!ae(i)) return n.issues.push({
			expected: "record",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
		let a = [], o = t.keyType._zod.values;
		if (o) {
			n.value = {};
			let s = /* @__PURE__ */ new Set();
			for (let c of o) if (typeof c == "string" || typeof c == "number" || typeof c == "symbol") {
				s.add(typeof c == "number" ? c.toString() : c);
				let o = t.keyType._zod.run({
					value: c,
					issues: []
				}, r);
				if (o instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (o.issues.length) {
					n.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: o.issues.map((e) => be(e, r, d())),
						input: c,
						path: [c],
						inst: e
					});
					continue;
				}
				let l = o.value, u = t.valueType._zod.run({
					value: i[c],
					issues: []
				}, r);
				u instanceof Promise ? a.push(u.then((e) => {
					e.issues.length && n.issues.push(...ve(c, e.issues)), n.value[l] = e.value;
				})) : (u.issues.length && n.issues.push(...ve(c, u.issues)), n.value[l] = u.value);
			}
			let c;
			for (let e in i) s.has(e) || (c ??= [], c.push(e));
			c && c.length > 0 && n.issues.push({
				code: "unrecognized_keys",
				input: i,
				inst: e,
				keys: c
			});
		} else {
			n.value = {};
			for (let o of Reflect.ownKeys(i)) {
				if (o === "__proto__" || !Object.prototype.propertyIsEnumerable.call(i, o)) continue;
				let s = t.keyType._zod.run({
					value: o,
					issues: []
				}, r);
				if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (typeof o == "string" && mt.test(o) && s.issues.length) {
					let e = t.keyType._zod.run({
						value: Number(o),
						issues: []
					}, r);
					if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
					e.issues.length === 0 && (s = e);
				}
				if (s.issues.length) {
					t.mode === "loose" ? n.value[o] = i[o] : n.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: s.issues.map((e) => be(e, r, d())),
						input: o,
						path: [o],
						inst: e
					});
					continue;
				}
				let c = t.valueType._zod.run({
					value: i[o],
					issues: []
				}, r);
				c instanceof Promise ? a.push(c.then((e) => {
					e.issues.length && n.issues.push(...ve(o, e.issues)), n.value[s.value] = e.value;
				})) : (c.issues.length && n.issues.push(...ve(o, c.issues)), n.value[s.value] = c.value);
			}
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
}), Pn = /*@__PURE__*/ s("$ZodEnum", (e, t) => {
	Rt.init(e, t);
	let n = f(t.entries), r = new Set(n);
	e._zod.values = r, e._zod.pattern = RegExp(`^(${n.filter((e) => S.has(typeof e)).map((e) => typeof e == "string" ? se(e) : e.toString()).join("|")})$`), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), Fn = /*@__PURE__*/ s("$ZodLiteral", (e, t) => {
	if (Rt.init(e, t), t.values.length === 0) throw Error("Cannot create literal schema with no valid values");
	let n = new Set(t.values);
	e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e) => typeof e == "string" ? se(e) : e ? se(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i) => {
		let a = r.value;
		return n.has(a) || r.issues.push({
			code: "invalid_value",
			values: t.values,
			input: a,
			inst: e
		}), r;
	};
}), In = /*@__PURE__*/ s("$ZodTransform", (e, t) => {
	Rt.init(e, t), e._zod.optin = "optional", e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new l(e.constructor.name);
		let i = t.transform(n.value, n);
		if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n.fallback = !0, n));
		if (i instanceof Promise) throw new c();
		return n.value = i, n.fallback = !0, n;
	};
});
function Ln(e, t) {
	return t === void 0 && (e.issues.length || e.fallback) ? {
		issues: [],
		value: void 0
	} : e;
}
var Rn = /*@__PURE__*/ s("$ZodOptional", (e, t) => {
	Rt.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", y(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), y(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${g(e.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (t.innerType._zod.optin === "optional") {
			let r = e.value, i = t.innerType._zod.run(e, n);
			return i instanceof Promise ? i.then((e) => Ln(e, r)) : Ln(i, r);
		}
		return e.value === void 0 ? e : t.innerType._zod.run(e, n);
	};
}), zn = /*@__PURE__*/ s("$ZodExactOptional", (e, t) => {
	Rn.init(e, t), y(e._zod, "values", () => t.innerType._zod.values), y(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
}), Bn = /*@__PURE__*/ s("$ZodNullable", (e, t) => {
	Rt.init(e, t), y(e._zod, "optin", () => t.innerType._zod.optin), y(e._zod, "optout", () => t.innerType._zod.optout), y(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${g(e.source)}|null)$`) : void 0;
	}), y(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
}), Vn = /*@__PURE__*/ s("$ZodDefault", (e, t) => {
	Rt.init(e, t), e._zod.optin = "optional", y(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		if (e.value === void 0) return e.value = t.defaultValue, e;
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Hn(e, t)) : Hn(r, t);
	};
});
function Hn(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
var Un = /*@__PURE__*/ s("$ZodPrefault", (e, t) => {
	Rt.init(e, t), e._zod.optin = "optional", y(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
}), Wn = /*@__PURE__*/ s("$ZodNonOptional", (e, t) => {
	Rt.init(e, t), y(e._zod, "values", () => {
		let e = t.innerType._zod.values;
		return e ? new Set([...e].filter((e) => e !== void 0)) : void 0;
	}), e._zod.parse = (n, r) => {
		let i = t.innerType._zod.run(n, r);
		return i instanceof Promise ? i.then((t) => Gn(t, e)) : Gn(i, e);
	};
});
function Gn(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
var Kn = /*@__PURE__*/ s("$ZodCatch", (e, t) => {
	Rt.init(e, t), e._zod.optin = "optional", y(e._zod, "optout", () => t.innerType._zod.optout), y(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((r) => (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => be(e, n, d())) },
			input: e.value
		}), e.issues = [], e.fallback = !0), e)) : (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => be(e, n, d())) },
			input: e.value
		}), e.issues = [], e.fallback = !0), e);
	};
}), qn = /*@__PURE__*/ s("$ZodPipe", (e, t) => {
	Rt.init(e, t), y(e._zod, "values", () => t.in._zod.values), y(e._zod, "optin", () => t.in._zod.optin), y(e._zod, "optout", () => t.out._zod.optout), y(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (e, n) => {
		if (n.direction === "backward") {
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => Jn(e, t.in, n)) : Jn(r, t.in, n);
		}
		let r = t.in._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Jn(e, t.out, n)) : Jn(r, t.out, n);
	};
});
function Jn(e, t, n) {
	return e.issues.length ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues,
		fallback: e.fallback
	}, n);
}
var Yn = /*@__PURE__*/ s("$ZodReadonly", (e, t) => {
	Rt.init(e, t), y(e._zod, "propValues", () => t.innerType._zod.propValues), y(e._zod, "values", () => t.innerType._zod.values), y(e._zod, "optin", () => t.innerType?._zod?.optin), y(e._zod, "optout", () => t.innerType?._zod?.optout), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(Xn) : Xn(r);
	};
});
function Xn(e) {
	return e.value = Object.freeze(e.value), e;
}
var Zn = /*@__PURE__*/ s("$ZodLazy", (e, t) => {
	Rt.init(e, t), y(e._zod, "innerType", () => {
		let e = t;
		return e._cachedInner ||= t.getter(), e._cachedInner;
	}), y(e._zod, "pattern", () => e._zod.innerType?._zod?.pattern), y(e._zod, "propValues", () => e._zod.innerType?._zod?.propValues), y(e._zod, "optin", () => e._zod.innerType?._zod?.optin ?? void 0), y(e._zod, "optout", () => e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n) => e._zod.innerType._zod.run(t, n);
}), Qn = /*@__PURE__*/ s("$ZodCustom", (e, t) => {
	yt.init(e, t), Rt.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
		let r = n.value, i = t.fn(r);
		if (i instanceof Promise) return i.then((t) => $n(t, n, r, e));
		$n(i, n, r, e);
	};
});
function $n(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(Se(e));
	}
}
//#endregion
//#region node_modules/zod/v4/core/registries.js
var er, tr = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
	}
	add(e, ...t) {
		let n = t[0];
		return this._map.set(e, n), n && typeof n == "object" && "id" in n && this._idmap.set(n.id, e), this;
	}
	clear() {
		return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
	}
	remove(e) {
		let t = this._map.get(e);
		return t && typeof t == "object" && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this;
	}
	get(e) {
		let t = e._zod.parent;
		if (t) {
			let n = { ...this.get(t) ?? {} };
			delete n.id;
			let r = {
				...n,
				...this._map.get(e)
			};
			return Object.keys(r).length ? r : void 0;
		}
		return this._map.get(e);
	}
	has(e) {
		return this._map.has(e);
	}
};
function nr() {
	return new tr();
}
(er = globalThis).__zod_globalRegistry ?? (er.__zod_globalRegistry = nr());
var rr = globalThis.__zod_globalRegistry;
//#endregion
//#region node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function ir(e, t) {
	return new e({
		type: "string",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ar(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function or(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function sr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function cr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function lr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ur(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function dr(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function fr(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function pr(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function mr(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function hr(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function gr(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function _r(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function vr(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function yr(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function br(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function xr(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Sr(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Cr(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function wr(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Tr(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Er(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Dr(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Or(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function kr(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ar(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function jr(e, t) {
	return new e({
		type: "number",
		checks: [],
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Mr(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Nr(e, t) {
	return new e({
		type: "boolean",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Pr(e, t) {
	return new e({
		type: "null",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Fr(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function Ir(e, t) {
	return new e({
		type: "never",
		...C(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Lr(e, t) {
	return new xt({
		check: "less_than",
		...C(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function Rr(e, t) {
	return new xt({
		check: "less_than",
		...C(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function zr(e, t) {
	return new St({
		check: "greater_than",
		...C(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function Br(e, t) {
	return new St({
		check: "greater_than",
		...C(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function Vr(e, t) {
	return new Ct({
		check: "multiple_of",
		...C(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function Hr(e, t) {
	return new Tt({
		check: "max_length",
		...C(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Ur(e, t) {
	return new Et({
		check: "min_length",
		...C(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Wr(e, t) {
	return new Dt({
		check: "length_equals",
		...C(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function Gr(e, t) {
	return new kt({
		check: "string_format",
		format: "regex",
		...C(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function Kr(e) {
	return new At({
		check: "string_format",
		format: "lowercase",
		...C(e)
	});
}
// @__NO_SIDE_EFFECTS__
function qr(e) {
	return new jt({
		check: "string_format",
		format: "uppercase",
		...C(e)
	});
}
// @__NO_SIDE_EFFECTS__
function Jr(e, t) {
	return new Mt({
		check: "string_format",
		format: "includes",
		...C(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function Yr(e, t) {
	return new Nt({
		check: "string_format",
		format: "starts_with",
		...C(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function Xr(e, t) {
	return new Pt({
		check: "string_format",
		format: "ends_with",
		...C(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function Zr(e) {
	return new Ft({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function Qr(e) {
	return /* @__PURE__ */ Zr((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function $r() {
	return /* @__PURE__ */ Zr((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function ei() {
	return /* @__PURE__ */ Zr((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function ti() {
	return /* @__PURE__ */ Zr((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function ni() {
	return /* @__PURE__ */ Zr((e) => te(e));
}
// @__NO_SIDE_EFFECTS__
function ri(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...C(n)
	});
}
// @__NO_SIDE_EFFECTS__
function ii(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...C(n)
	});
}
// @__NO_SIDE_EFFECTS__
function ai(e, t) {
	let n = /* @__PURE__ */ oi((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(Se(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", r.input ??= t.value, r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(Se(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function oi(e, t) {
	let n = new yt({
		check: "custom",
		...C(t)
	});
	return n._zod.check = e, n;
}
//#endregion
//#region node_modules/zod/v4/core/to-json-schema.js
function si(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? rr,
		target: t,
		unrepresentable: e?.unrepresentable ?? "throw",
		override: e?.override ?? (() => {}),
		io: e?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		cycles: e?.cycles ?? "ref",
		reused: e?.reused ?? "inline",
		external: e?.external ?? void 0
	};
}
function ci(e, t, n = {
	path: [],
	schemaPath: []
}) {
	var r;
	let i = e._zod.def, a = t.seen.get(e);
	if (a) return a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema;
	let o = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: n.path
	};
	t.seen.set(e, o);
	let s = e._zod.toJSONSchema?.();
	if (s) o.schema = s;
	else {
		let r = {
			...n,
			schemaPath: [...n.schemaPath, e],
			path: n.path
		};
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
		else {
			let n = o.schema, a = t.processors[i.type];
			if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
			a(e, t, n, r);
		}
		let a = e._zod.parent;
		a && (o.ref ||= a, ci(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Object.assign(o.schema, c), t.io === "input" && di(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function li(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = /* @__PURE__ */ new Map();
	for (let t of e.seen.entries()) {
		let n = e.metadataRegistry.get(t[0])?.id;
		if (n) {
			let e = r.get(n);
			if (e && e !== t[0]) throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			r.set(n, t[0]);
		}
	}
	let i = (t) => {
		let r = e.target === "draft-2020-12" ? "$defs" : "definitions";
		if (e.external) {
			let n = e.external.registry.get(t[0])?.id, i = e.external.uri ?? ((e) => e);
			if (n) return { ref: i(n) };
			let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
			return t[1].defId = a, {
				defId: a,
				ref: `${i("__shared")}#/${r}/${a}`
			};
		}
		if (t[1] === n) return { ref: "#" };
		let i = `#/${r}/`, a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + a
		};
	}, a = (e) => {
		if (e[1].schema.$ref) return;
		let t = e[1], { ref: n, defId: r } = i(e);
		t.def = { ...t.schema }, r && (t.defId = r);
		let a = t.schema;
		for (let e in a) delete a[e];
		a.$ref = n;
	};
	if (e.cycles === "throw") for (let t of e.seen.entries()) {
		let e = t[1];
		if (e.cycle) throw Error(`Cycle detected: #/${e.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (let n of e.seen.entries()) {
		let r = n[1];
		if (t === n[0]) {
			a(n);
			continue;
		}
		if (e.external) {
			let r = e.external.registry.get(n[0])?.id;
			if (t !== n[0] && r) {
				a(n);
				continue;
			}
		}
		if (e.metadataRegistry.get(n[0])?.id) {
			a(n);
			continue;
		}
		if (r.cycle) {
			a(n);
			continue;
		}
		if (r.count > 1 && e.reused === "ref") {
			a(n);
			continue;
		}
	}
}
function ui(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : Object.assign(i, s), Object.assign(i, a), t._zod.parent === o) for (let e in i) e === "$ref" || e === "allOf" || e in a || delete i[e];
			if (s.$ref && n.def) for (let e in i) e === "$ref" || e === "allOf" || e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e];
		}
		let s = t._zod.parent;
		if (s && s !== o) {
			r(s);
			let t = e.seen.get(s);
			if (t?.schema.$ref && (i.$ref = t.schema.$ref, t.def)) for (let e in i) e === "$ref" || e === "allOf" || e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e];
		}
		e.override({
			zodSchema: t,
			jsonSchema: i,
			path: n.path ?? []
		});
	};
	for (let t of [...e.seen.entries()].reverse()) r(t[0]);
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	Object.assign(i, n.def ?? n.schema);
	let a = e.metadataRegistry.get(t)?.id;
	a !== void 0 && i.id === a && delete i.id;
	let o = e.external?.defs ?? {};
	for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (e.def.id === e.defId && delete e.def.id, o[e.defId] = e.def);
	}
	e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? i.$defs = o : i.definitions = o);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: pi(t, "input", e.processors),
					output: pi(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function di(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return di(r.element, n);
	if (r.type === "set") return di(r.valueType, n);
	if (r.type === "lazy") return di(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault") return di(r.innerType, n);
	if (r.type === "intersection") return di(r.left, n) || di(r.right, n);
	if (r.type === "record" || r.type === "map") return di(r.keyType, n) || di(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : di(r.in, n) || di(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (di(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (di(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (di(e, n)) return !0;
		return !!(r.rest && di(r.rest, n));
	}
	return !1;
}
var fi = (e, t = {}) => (n) => {
	let r = si({
		...n,
		processors: t
	});
	return ci(e, r), li(r, e), ui(r, e);
}, pi = (e, t, n = {}) => (r) => {
	let { libraryOptions: i, target: a } = r ?? {}, o = si({
		...i ?? {},
		target: a,
		io: t,
		processors: n
	});
	return ci(e, o), li(o, e), ui(o, e);
}, mi = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
}, hi = (e, t, n, r) => {
	let i = n;
	i.type = "string";
	let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l } = e._zod.bag;
	if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = mi[s] ?? s, i.format === "" && delete i.format, s === "time" && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
		let e = [...c];
		e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
			...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: e.source
		}))]);
	}
}, gi = (e, t, n, r) => {
	let i = n, { minimum: a, maximum: o, format: s, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: u } = e._zod.bag;
	typeof s == "string" && s.includes("int") ? i.type = "integer" : i.type = "number";
	let d = typeof u == "number" && u >= (a ?? -Infinity), f = typeof l == "number" && l <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
	d ? p ? (i.minimum = u, i.exclusiveMinimum = !0) : i.exclusiveMinimum = u : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = l, i.exclusiveMaximum = !0) : i.exclusiveMaximum = l : typeof o == "number" && (i.maximum = o), typeof c == "number" && (i.multipleOf = c);
}, _i = (e, t, n, r) => {
	n.type = "boolean";
}, vi = (e, t, n, r) => {
	t.target === "openapi-3.0" ? (n.type = "string", n.nullable = !0, n.enum = [null]) : n.type = "null";
}, yi = (e, t, n, r) => {
	n.not = {};
}, bi = (e, t, n, r) => {
	let i = e._zod.def, a = f(i.entries);
	a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
}, xi = (e, t, n, r) => {
	let i = e._zod.def, a = [];
	for (let e of i.values) if (e === void 0) {
		if (t.unrepresentable === "throw") throw Error("Literal `undefined` cannot be represented in JSON Schema");
	} else if (typeof e == "bigint") {
		if (t.unrepresentable === "throw") throw Error("BigInt literals cannot be represented in JSON Schema");
		a.push(Number(e));
	} else a.push(e);
	if (a.length !== 0) if (a.length === 1) {
		let e = a[0];
		n.type = e === null ? "null" : typeof e, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [e] : n.const = e;
	} else a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), a.every((e) => typeof e == "boolean") && (n.type = "boolean"), a.every((e) => e === null) && (n.type = "null"), n.enum = a;
}, Si = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Custom types cannot be represented in JSON Schema");
}, Ci = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Transforms cannot be represented in JSON Schema");
}, wi = (e, t, n, r) => {
	let i = n, a = e._zod.def, { minimum: o, maximum: s } = e._zod.bag;
	typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = ci(a.element, t, {
		...r,
		path: [...r.path, "items"]
	});
}, Ti = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object", i.properties = {};
	let o = a.shape;
	for (let e in o) i.properties[e] = ci(o[e], t, {
		...r,
		path: [
			...r.path,
			"properties",
			e
		]
	});
	let s = new Set(Object.keys(o)), c = new Set([...s].filter((e) => {
		let n = a.shape[e]._zod;
		return t.io === "input" ? n.optin === void 0 : n.optout === void 0;
	}));
	c.size > 0 && (i.required = Array.from(c)), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = ci(a.catchall, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	})) : t.io === "output" && (i.additionalProperties = !1);
}, Ei = (e, t, n, r) => {
	let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => ci(e, t, {
		...r,
		path: [
			...r.path,
			a ? "oneOf" : "anyOf",
			n
		]
	}));
	a ? n.oneOf = o : n.anyOf = o;
}, Di = (e, t, n, r) => {
	let i = e._zod.def, a = ci(i.left, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			0
		]
	}), o = ci(i.right, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			1
		]
	}), s = (e) => "allOf" in e && Object.keys(e).length === 1;
	n.allOf = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
}, Oi = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object";
	let o = a.keyType, s = o._zod.bag?.patterns;
	if (a.mode === "loose" && s && s.size > 0) {
		let e = ci(a.valueType, t, {
			...r,
			path: [
				...r.path,
				"patternProperties",
				"*"
			]
		});
		i.patternProperties = {};
		for (let t of s) i.patternProperties[t.source] = e;
	} else (t.target === "draft-07" || t.target === "draft-2020-12") && (i.propertyNames = ci(a.keyType, t, {
		...r,
		path: [...r.path, "propertyNames"]
	})), i.additionalProperties = ci(a.valueType, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	});
	let c = o._zod.values;
	if (c) {
		let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
		e.length > 0 && (i.required = e);
	}
}, ki = (e, t, n, r) => {
	let i = e._zod.def, a = ci(i.innerType, t, r), o = t.seen.get(e);
	t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
}, Ai = (e, t, n, r) => {
	let i = e._zod.def;
	ci(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, ji = (e, t, n, r) => {
	let i = e._zod.def;
	ci(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.default = JSON.parse(JSON.stringify(i.defaultValue));
}, Mi = (e, t, n, r) => {
	let i = e._zod.def;
	ci(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, t.io === "input" && (n._prefault = JSON.parse(JSON.stringify(i.defaultValue)));
}, Ni = (e, t, n, r) => {
	let i = e._zod.def;
	ci(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o;
	try {
		o = i.catchValue(void 0);
	} catch {
		throw Error("Dynamic catch values are not supported in JSON Schema");
	}
	n.default = o;
}, Pi = (e, t, n, r) => {
	let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
	ci(o, t, r);
	let s = t.seen.get(e);
	s.ref = o;
}, Fi = (e, t, n, r) => {
	let i = e._zod.def;
	ci(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.readOnly = !0;
}, Ii = (e, t, n, r) => {
	let i = e._zod.def;
	ci(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Li = (e, t, n, r) => {
	let i = e._zod.innerType;
	ci(i, t, r);
	let a = t.seen.get(e);
	a.ref = i;
}, Ri = /*@__PURE__*/ s("ZodISODateTime", (e, t) => {
	Qt.init(e, t), ca.init(e, t);
});
function zi(e) {
	return /* @__PURE__ */ Dr(Ri, e);
}
var Bi = /*@__PURE__*/ s("ZodISODate", (e, t) => {
	$t.init(e, t), ca.init(e, t);
});
function Vi(e) {
	return /* @__PURE__ */ Or(Bi, e);
}
var Hi = /*@__PURE__*/ s("ZodISOTime", (e, t) => {
	en.init(e, t), ca.init(e, t);
});
function Ui(e) {
	return /* @__PURE__ */ kr(Hi, e);
}
var Wi = /*@__PURE__*/ s("ZodISODuration", (e, t) => {
	tn.init(e, t), ca.init(e, t);
});
function Gi(e) {
	return /* @__PURE__ */ Ar(Wi, e);
}
var D = /*@__PURE__*/ s("ZodError", (e, t) => {
	E.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
		format: { value: (t) => Ee(e, t) },
		flatten: { value: (t) => Te(e, t) },
		addIssue: { value: (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, p, 2);
		} },
		addIssues: { value: (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, p, 2);
		} },
		isEmpty: { get() {
			return e.issues.length === 0;
		} }
	});
}, { Parent: Error }), Ki = /* @__PURE__ */ De(D), qi = /* @__PURE__ */ Oe(D), Ji = /* @__PURE__ */ ke(D), Yi = /* @__PURE__ */ je(D), Xi = /* @__PURE__ */ Ne(D), Zi = /* @__PURE__ */ Pe(D), Qi = /* @__PURE__ */ Fe(D), $i = /* @__PURE__ */ Ie(D), ea = /* @__PURE__ */ Le(D), ta = /* @__PURE__ */ Re(D), na = /* @__PURE__ */ ze(D), ra = /* @__PURE__ */ Be(D), ia = /* @__PURE__ */ new WeakMap();
function aa(e, t, n) {
	let r = Object.getPrototypeOf(e), i = ia.get(r);
	if (i || (i = /* @__PURE__ */ new Set(), ia.set(r, i)), !i.has(t)) {
		i.add(t);
		for (let e in n) {
			let t = n[e];
			Object.defineProperty(r, e, {
				configurable: !0,
				enumerable: !1,
				get() {
					let n = t.bind(this);
					return Object.defineProperty(this, e, {
						configurable: !0,
						writable: !0,
						enumerable: !0,
						value: n
					}), n;
				},
				set(t) {
					Object.defineProperty(this, e, {
						configurable: !0,
						writable: !0,
						enumerable: !0,
						value: t
					});
				}
			});
		}
	}
}
var O = /*@__PURE__*/ s("ZodType", (e, t) => (Rt.init(e, t), Object.assign(e["~standard"], { jsonSchema: {
	input: pi(e, "input"),
	output: pi(e, "output")
} }), e.toJSONSchema = fi(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.parse = (t, n) => Ki(e, t, n, { callee: e.parse }), e.safeParse = (t, n) => Ji(e, t, n), e.parseAsync = async (t, n) => qi(e, t, n, { callee: e.parseAsync }), e.safeParseAsync = async (t, n) => Yi(e, t, n), e.spa = e.safeParseAsync, e.encode = (t, n) => Xi(e, t, n), e.decode = (t, n) => Zi(e, t, n), e.encodeAsync = async (t, n) => Qi(e, t, n), e.decodeAsync = async (t, n) => $i(e, t, n), e.safeEncode = (t, n) => ea(e, t, n), e.safeDecode = (t, n) => ta(e, t, n), e.safeEncodeAsync = async (t, n) => na(e, t, n), e.safeDecodeAsync = async (t, n) => ra(e, t, n), aa(e, "ZodType", {
	check(...e) {
		let t = this.def;
		return this.clone(x(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
			check: e,
			def: { check: "custom" },
			onattach: []
		} } : e)] }), { parent: !0 });
	},
	with(...e) {
		return this.check(...e);
	},
	clone(e, t) {
		return ce(this, e, t);
	},
	brand() {
		return this;
	},
	register(e, t) {
		return e.add(this, t), this;
	},
	refine(e, t) {
		return this.check(bo(e, t));
	},
	superRefine(e, t) {
		return this.check(xo(e, t));
	},
	overwrite(e) {
		return this.check(/* @__PURE__ */ Zr(e));
	},
	optional() {
		return eo(this);
	},
	exactOptional() {
		return no(this);
	},
	nullable() {
		return io(this);
	},
	nullish() {
		return eo(io(this));
	},
	nonoptional(e) {
		return uo(this, e);
	},
	array() {
		return La(this);
	},
	or(e) {
		return Ba([this, e]);
	},
	and(e) {
		return Wa(this, e);
	},
	transform(e) {
		return ho(this, Qa(e));
	},
	default(e) {
		return oo(this, e);
	},
	prefault(e) {
		return co(this, e);
	},
	catch(e) {
		return po(this, e);
	},
	pipe(e) {
		return ho(this, e);
	},
	readonly() {
		return _o(this);
	},
	describe(e) {
		let t = this.clone();
		return rr.add(t, { description: e }), t;
	},
	meta(...e) {
		if (e.length === 0) return rr.get(this);
		let t = this.clone();
		return rr.add(t, e[0]), t;
	},
	isOptional() {
		return this.safeParse(void 0).success;
	},
	isNullable() {
		return this.safeParse(null).success;
	},
	apply(e) {
		return e(this);
	}
}), Object.defineProperty(e, "description", {
	get() {
		return rr.get(e)?.description;
	},
	configurable: !0
}), e)), oa = /*@__PURE__*/ s("_ZodString", (e, t) => {
	zt.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => hi(e, t, n, r);
	let n = e._zod.bag;
	e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, aa(e, "_ZodString", {
		regex(...e) {
			return this.check(/* @__PURE__ */ Gr(...e));
		},
		includes(...e) {
			return this.check(/* @__PURE__ */ Jr(...e));
		},
		startsWith(...e) {
			return this.check(/* @__PURE__ */ Yr(...e));
		},
		endsWith(...e) {
			return this.check(/* @__PURE__ */ Xr(...e));
		},
		min(...e) {
			return this.check(/* @__PURE__ */ Ur(...e));
		},
		max(...e) {
			return this.check(/* @__PURE__ */ Hr(...e));
		},
		length(...e) {
			return this.check(/* @__PURE__ */ Wr(...e));
		},
		nonempty(...e) {
			return this.check(/* @__PURE__ */ Ur(1, ...e));
		},
		lowercase(e) {
			return this.check(/* @__PURE__ */ Kr(e));
		},
		uppercase(e) {
			return this.check(/* @__PURE__ */ qr(e));
		},
		trim() {
			return this.check(/* @__PURE__ */ $r());
		},
		normalize(...e) {
			return this.check(/* @__PURE__ */ Qr(...e));
		},
		toLowerCase() {
			return this.check(/* @__PURE__ */ ei());
		},
		toUpperCase() {
			return this.check(/* @__PURE__ */ ti());
		},
		slugify() {
			return this.check(/* @__PURE__ */ ni());
		}
	});
}), sa = /*@__PURE__*/ s("ZodString", (e, t) => {
	zt.init(e, t), oa.init(e, t), e.email = (t) => e.check(/* @__PURE__ */ ar(la, t)), e.url = (t) => e.check(/* @__PURE__ */ dr(fa, t)), e.jwt = (t) => e.check(/* @__PURE__ */ Er(Ta, t)), e.emoji = (t) => e.check(/* @__PURE__ */ fr(pa, t)), e.guid = (t) => e.check(/* @__PURE__ */ or(ua, t)), e.uuid = (t) => e.check(/* @__PURE__ */ sr(da, t)), e.uuidv4 = (t) => e.check(/* @__PURE__ */ cr(da, t)), e.uuidv6 = (t) => e.check(/* @__PURE__ */ lr(da, t)), e.uuidv7 = (t) => e.check(/* @__PURE__ */ ur(da, t)), e.nanoid = (t) => e.check(/* @__PURE__ */ pr(ma, t)), e.guid = (t) => e.check(/* @__PURE__ */ or(ua, t)), e.cuid = (t) => e.check(/* @__PURE__ */ mr(ha, t)), e.cuid2 = (t) => e.check(/* @__PURE__ */ hr(ga, t)), e.ulid = (t) => e.check(/* @__PURE__ */ gr(_a, t)), e.base64 = (t) => e.check(/* @__PURE__ */ Cr(Sa, t)), e.base64url = (t) => e.check(/* @__PURE__ */ wr(Ca, t)), e.xid = (t) => e.check(/* @__PURE__ */ _r(va, t)), e.ksuid = (t) => e.check(/* @__PURE__ */ vr(ya, t)), e.ipv4 = (t) => e.check(/* @__PURE__ */ yr(A, t)), e.ipv6 = (t) => e.check(/* @__PURE__ */ br(j, t)), e.cidrv4 = (t) => e.check(/* @__PURE__ */ xr(ba, t)), e.cidrv6 = (t) => e.check(/* @__PURE__ */ Sr(xa, t)), e.e164 = (t) => e.check(/* @__PURE__ */ Tr(wa, t)), e.datetime = (t) => e.check(zi(t)), e.date = (t) => e.check(Vi(t)), e.time = (t) => e.check(Ui(t)), e.duration = (t) => e.check(Gi(t));
});
function k(e) {
	return /* @__PURE__ */ ir(sa, e);
}
var ca = /*@__PURE__*/ s("ZodStringFormat", (e, t) => {
	Bt.init(e, t), oa.init(e, t);
}), la = /*@__PURE__*/ s("ZodEmail", (e, t) => {
	Ut.init(e, t), ca.init(e, t);
}), ua = /*@__PURE__*/ s("ZodGUID", (e, t) => {
	Vt.init(e, t), ca.init(e, t);
}), da = /*@__PURE__*/ s("ZodUUID", (e, t) => {
	Ht.init(e, t), ca.init(e, t);
}), fa = /*@__PURE__*/ s("ZodURL", (e, t) => {
	Wt.init(e, t), ca.init(e, t);
}), pa = /*@__PURE__*/ s("ZodEmoji", (e, t) => {
	Gt.init(e, t), ca.init(e, t);
}), ma = /*@__PURE__*/ s("ZodNanoID", (e, t) => {
	Kt.init(e, t), ca.init(e, t);
}), ha = /*@__PURE__*/ s("ZodCUID", (e, t) => {
	qt.init(e, t), ca.init(e, t);
}), ga = /*@__PURE__*/ s("ZodCUID2", (e, t) => {
	Jt.init(e, t), ca.init(e, t);
}), _a = /*@__PURE__*/ s("ZodULID", (e, t) => {
	Yt.init(e, t), ca.init(e, t);
}), va = /*@__PURE__*/ s("ZodXID", (e, t) => {
	Xt.init(e, t), ca.init(e, t);
}), ya = /*@__PURE__*/ s("ZodKSUID", (e, t) => {
	Zt.init(e, t), ca.init(e, t);
}), A = /*@__PURE__*/ s("ZodIPv4", (e, t) => {
	nn.init(e, t), ca.init(e, t);
}), j = /*@__PURE__*/ s("ZodIPv6", (e, t) => {
	rn.init(e, t), ca.init(e, t);
}), ba = /*@__PURE__*/ s("ZodCIDRv4", (e, t) => {
	an.init(e, t), ca.init(e, t);
}), xa = /*@__PURE__*/ s("ZodCIDRv6", (e, t) => {
	on.init(e, t), ca.init(e, t);
}), Sa = /*@__PURE__*/ s("ZodBase64", (e, t) => {
	cn.init(e, t), ca.init(e, t);
}), Ca = /*@__PURE__*/ s("ZodBase64URL", (e, t) => {
	un.init(e, t), ca.init(e, t);
}), wa = /*@__PURE__*/ s("ZodE164", (e, t) => {
	dn.init(e, t), ca.init(e, t);
}), Ta = /*@__PURE__*/ s("ZodJWT", (e, t) => {
	pn.init(e, t), ca.init(e, t);
}), Ea = /*@__PURE__*/ s("ZodNumber", (e, t) => {
	mn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => gi(e, t, n, r), aa(e, "ZodNumber", {
		gt(e, t) {
			return this.check(/* @__PURE__ */ zr(e, t));
		},
		gte(e, t) {
			return this.check(/* @__PURE__ */ Br(e, t));
		},
		min(e, t) {
			return this.check(/* @__PURE__ */ Br(e, t));
		},
		lt(e, t) {
			return this.check(/* @__PURE__ */ Lr(e, t));
		},
		lte(e, t) {
			return this.check(/* @__PURE__ */ Rr(e, t));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ Rr(e, t));
		},
		int(e) {
			return this.check(Oa(e));
		},
		safe(e) {
			return this.check(Oa(e));
		},
		positive(e) {
			return this.check(/* @__PURE__ */ zr(0, e));
		},
		nonnegative(e) {
			return this.check(/* @__PURE__ */ Br(0, e));
		},
		negative(e) {
			return this.check(/* @__PURE__ */ Lr(0, e));
		},
		nonpositive(e) {
			return this.check(/* @__PURE__ */ Rr(0, e));
		},
		multipleOf(e, t) {
			return this.check(/* @__PURE__ */ Vr(e, t));
		},
		step(e, t) {
			return this.check(/* @__PURE__ */ Vr(e, t));
		},
		finite() {
			return this;
		}
	});
	let n = e._zod.bag;
	e.minValue = Math.max(n.minimum ?? -Infinity, n.exclusiveMinimum ?? -Infinity) ?? null, e.maxValue = Math.min(n.maximum ?? Infinity, n.exclusiveMaximum ?? Infinity) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? .5), e.isFinite = !0, e.format = n.format ?? null;
});
function M(e) {
	return /* @__PURE__ */ jr(Ea, e);
}
var Da = /*@__PURE__*/ s("ZodNumberFormat", (e, t) => {
	hn.init(e, t), Ea.init(e, t);
});
function Oa(e) {
	return /* @__PURE__ */ Mr(Da, e);
}
var ka = /*@__PURE__*/ s("ZodBoolean", (e, t) => {
	gn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => _i(e, t, n, r);
});
function N(e) {
	return /* @__PURE__ */ Nr(ka, e);
}
var Aa = /*@__PURE__*/ s("ZodNull", (e, t) => {
	_n.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => vi(e, t, n, r);
});
function ja(e) {
	return /* @__PURE__ */ Pr(Aa, e);
}
var Ma = /*@__PURE__*/ s("ZodUnknown", (e, t) => {
	vn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function Na() {
	return /* @__PURE__ */ Fr(Ma);
}
var Pa = /*@__PURE__*/ s("ZodNever", (e, t) => {
	yn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => yi(e, t, n, r);
});
function Fa(e) {
	return /* @__PURE__ */ Ir(Pa, e);
}
var Ia = /*@__PURE__*/ s("ZodArray", (e, t) => {
	xn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => wi(e, t, n, r), e.element = t.element, aa(e, "ZodArray", {
		min(e, t) {
			return this.check(/* @__PURE__ */ Ur(e, t));
		},
		nonempty(e) {
			return this.check(/* @__PURE__ */ Ur(1, e));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ Hr(e, t));
		},
		length(e, t) {
			return this.check(/* @__PURE__ */ Wr(e, t));
		},
		unwrap() {
			return this.element;
		}
	});
});
function La(e, t) {
	return /* @__PURE__ */ ri(Ia, e, t);
}
var Ra = /*@__PURE__*/ s("ZodObject", (e, t) => {
	En.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ti(e, t, n, r), y(e, "shape", () => t.shape), aa(e, "ZodObject", {
		keyof() {
			return Ja(Object.keys(this._zod.def.shape));
		},
		catchall(e) {
			return this.clone({
				...this._zod.def,
				catchall: e
			});
		},
		passthrough() {
			return this.clone({
				...this._zod.def,
				catchall: Na()
			});
		},
		loose() {
			return this.clone({
				...this._zod.def,
				catchall: Na()
			});
		},
		strict() {
			return this.clone({
				...this._zod.def,
				catchall: Fa()
			});
		},
		strip() {
			return this.clone({
				...this._zod.def,
				catchall: void 0
			});
		},
		extend(e) {
			return de(this, e);
		},
		safeExtend(e) {
			return fe(this, e);
		},
		merge(e) {
			return pe(this, e);
		},
		pick(e) {
			return w(this, e);
		},
		omit(e) {
			return T(this, e);
		},
		partial(...e) {
			return me($a, this, e[0]);
		},
		required(...e) {
			return he(lo, this, e[0]);
		}
	});
});
function P(e, t) {
	return new Ra({
		type: "object",
		shape: e ?? {},
		...C(t)
	});
}
var za = /*@__PURE__*/ s("ZodUnion", (e, t) => {
	On.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ei(e, t, n, r), e.options = t.options;
});
function Ba(e, t) {
	return new za({
		type: "union",
		options: e,
		...C(t)
	});
}
var Va = /*@__PURE__*/ s("ZodDiscriminatedUnion", (e, t) => {
	za.init(e, t), kn.init(e, t);
});
function Ha(e, t, n) {
	return new Va({
		type: "union",
		options: t,
		discriminator: e,
		...C(n)
	});
}
var Ua = /*@__PURE__*/ s("ZodIntersection", (e, t) => {
	An.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => Di(e, t, n, r);
});
function Wa(e, t) {
	return new Ua({
		type: "intersection",
		left: e,
		right: t
	});
}
var Ga = /*@__PURE__*/ s("ZodRecord", (e, t) => {
	Nn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => Oi(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
});
function Ka(e, t, n) {
	return !t || !t._zod ? new Ga({
		type: "record",
		keyType: k(),
		valueType: e,
		...C(t)
	}) : new Ga({
		type: "record",
		keyType: e,
		valueType: t,
		...C(n)
	});
}
var qa = /*@__PURE__*/ s("ZodEnum", (e, t) => {
	Pn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => bi(e, t, n, r), e.enum = t.entries, e.options = Object.values(t.entries);
	let n = new Set(Object.keys(t.entries));
	e.extract = (e, r) => {
		let i = {};
		for (let r of e) if (n.has(r)) i[r] = t.entries[r];
		else throw Error(`Key ${r} not found in enum`);
		return new qa({
			...t,
			checks: [],
			...C(r),
			entries: i
		});
	}, e.exclude = (e, r) => {
		let i = { ...t.entries };
		for (let t of e) if (n.has(t)) delete i[t];
		else throw Error(`Key ${t} not found in enum`);
		return new qa({
			...t,
			checks: [],
			...C(r),
			entries: i
		});
	};
});
function Ja(e, t) {
	return new qa({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...C(t)
	});
}
var Ya = /*@__PURE__*/ s("ZodLiteral", (e, t) => {
	Fn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => xi(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
		if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return t.values[0];
	} });
});
function Xa(e, t) {
	return new Ya({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...C(t)
	});
}
var Za = /*@__PURE__*/ s("ZodTransform", (e, t) => {
	In.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ci(e, t, n, r), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new l(e.constructor.name);
		n.addIssue = (r) => {
			if (typeof r == "string") n.issues.push(Se(r, n.value, t));
			else {
				let t = r;
				t.fatal && (t.continue = !1), t.code ??= "custom", t.input ??= n.value, t.inst ??= e, n.issues.push(Se(t));
			}
		};
		let i = t.transform(n.value, n);
		return i instanceof Promise ? i.then((e) => (n.value = e, n.fallback = !0, n)) : (n.value = i, n.fallback = !0, n);
	};
});
function Qa(e) {
	return new Za({
		type: "transform",
		transform: e
	});
}
var $a = /*@__PURE__*/ s("ZodOptional", (e, t) => {
	Rn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ii(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function eo(e) {
	return new $a({
		type: "optional",
		innerType: e
	});
}
var to = /*@__PURE__*/ s("ZodExactOptional", (e, t) => {
	zn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ii(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function no(e) {
	return new to({
		type: "optional",
		innerType: e
	});
}
var ro = /*@__PURE__*/ s("ZodNullable", (e, t) => {
	Bn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => ki(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function io(e) {
	return new ro({
		type: "nullable",
		innerType: e
	});
}
var ao = /*@__PURE__*/ s("ZodDefault", (e, t) => {
	Vn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => ji(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function oo(e, t) {
	return new ao({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : oe(t);
		}
	});
}
var so = /*@__PURE__*/ s("ZodPrefault", (e, t) => {
	Un.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => Mi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function co(e, t) {
	return new so({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : oe(t);
		}
	});
}
var lo = /*@__PURE__*/ s("ZodNonOptional", (e, t) => {
	Wn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ai(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function uo(e, t) {
	return new lo({
		type: "nonoptional",
		innerType: e,
		...C(t)
	});
}
var fo = /*@__PURE__*/ s("ZodCatch", (e, t) => {
	Kn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ni(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function po(e, t) {
	return new fo({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : () => t
	});
}
var mo = /*@__PURE__*/ s("ZodPipe", (e, t) => {
	qn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => Pi(e, t, n, r), e.in = t.in, e.out = t.out;
});
function ho(e, t) {
	return new mo({
		type: "pipe",
		in: e,
		out: t
	});
}
var go = /*@__PURE__*/ s("ZodReadonly", (e, t) => {
	Yn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => Fi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function _o(e) {
	return new go({
		type: "readonly",
		innerType: e
	});
}
var F = /*@__PURE__*/ s("ZodLazy", (e, t) => {
	Zn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => Li(e, t, n, r), e.unwrap = () => e._zod.def.getter();
});
function vo(e) {
	return new F({
		type: "lazy",
		getter: e
	});
}
var yo = /*@__PURE__*/ s("ZodCustom", (e, t) => {
	Qn.init(e, t), O.init(e, t), e._zod.processJSONSchema = (t, n, r) => Si(e, t, n, r);
});
function bo(e, t = {}) {
	return /* @__PURE__ */ ii(yo, e, t);
}
function xo(e, t) {
	return /* @__PURE__ */ ai(e, t);
}
//#endregion
//#region src/specification/presentation.ts
var I = /* @__PURE__ */ n(r(), 1), So = P({
	enabled: N(),
	trigger: Xa("document-load"),
	duration: M().min(100).max(1e4),
	disruption: M().min(0).max(1),
	blur: M().min(0).max(64)
}), Co = P({ legacyMode: P({
	enabled: N(),
	pixelation: So
}) }), wo = { legacyMode: {
	enabled: !1,
	pixelation: {
		enabled: !0,
		trigger: "document-load",
		duration: 2e3,
		disruption: .75,
		blur: 22
	}
} };
function To() {
	return { legacyMode: {
		...wo.legacyMode,
		pixelation: { ...wo.legacyMode.pixelation }
	} };
}
//#endregion
//#region src/runtime/runtime-context.tsx
var Eo = (0, I.createContext)(null);
function Do(e) {
	let t = Oo();
	return e ? t.resolveAsset(e) : void 0;
}
function Oo() {
	let e = (0, I.useContext)(Eo);
	if (!e) throw Error("AMP Runtime component must be rendered inside AMPReader.");
	return e;
}
//#endregion
//#region src/specification/version.ts
var ko = "1.0.0", Ao = 1080, jo = P({
	x: M().finite(),
	y: M().finite()
}), Mo = P({
	width: Ba([M().positive().finite(), Xa("auto")]),
	height: Ba([M().positive().finite(), Xa("auto")])
}), No = P({
	top: M().finite(),
	right: M().finite(),
	bottom: M().finite(),
	left: M().finite()
}), Po = Ja([
	"flow",
	"float-left",
	"float-right",
	"inline",
	"center",
	"absolute"
]), Fo = Ja([
	"top-left",
	"top-center",
	"top-right",
	"center-left",
	"center",
	"center-right",
	"bottom-left",
	"bottom-center",
	"bottom-right"
]), Io = Ja([
	"visible",
	"hidden",
	"scroll"
]), Lo = P({
	mode: Po,
	position: jo.optional(),
	size: Mo,
	rotation: M().optional(),
	margin: No.partial().optional(),
	padding: No.partial().optional(),
	align: Ja([
		"left",
		"center",
		"right",
		"justify"
	]).optional(),
	zIndex: M().int().optional(),
	anchor: Fo.optional(),
	overflow: Io.optional()
}), Ro = Ba([M().int(), Ja(["normal", "bold"])]), zo = P({
	fontFamily: k(),
	fontSize: M().positive(),
	fontWeight: Ro.optional(),
	fontStyle: Ja(["normal", "italic"]).optional(),
	color: k().optional(),
	letterSpacing: M().optional(),
	lineHeight: M().optional(),
	paragraphSpacing: M().optional(),
	justify: Ja([
		"left",
		"right",
		"center",
		"justify"
	]).optional(),
	indent: M().optional()
}), Bo = Ja([
	"bold",
	"italic",
	"underline",
	"strikethrough",
	"code"
]), Vo = P({
	text: k(),
	marks: La(Bo).optional(),
	color: k().optional(),
	href: k().optional()
}), Ho = Ja([
	"none",
	"ordered",
	"unordered"
]), Uo = La(P({
	kind: Xa("paragraph"),
	runs: La(Vo),
	listType: Ho.optional(),
	indent: M().int().optional()
})), Wo = k().refine((e) => e === "" ? !0 : e.includes("\\") || e.startsWith("/") || /^[a-z][a-z\d+.-]*:/i.test(e) ? !1 : e.split("/").every((e) => e.length > 0 && e !== "." && e !== ".."), "Asset reference must be a normalized relative project path"), Go = vo(() => Ba([
	k(),
	M().finite(),
	N(),
	ja(),
	La(Go),
	Ka(k(), Go)
])), Ko = P({
	opacity: M().min(0).max(1).optional(),
	backgroundColor: k().optional(),
	borderRadius: M().min(0).finite().optional(),
	border: P({
		width: M().min(0).finite(),
		color: k(),
		style: Ja([
			"solid",
			"dashed",
			"dotted"
		]).optional()
	}).optional()
}).catchall(Go), qo = P({
	id: k().min(1),
	type: k(),
	name: k().optional(),
	layout: Lo,
	style: Ko.optional(),
	metadata: Ka(k(), Go).optional()
}), Jo = P({
	enabled: N(),
	targetNodeIds: La(k()),
	side: Ja([
		"auto",
		"left",
		"right"
	]),
	margin: M().min(0).max(200),
	mode: Ja(["container", "silhouette"]).optional(),
	alphaThreshold: M().min(0).max(1).optional(),
	updateFps: M().int().min(1).max(30).optional()
}), Yo = qo.extend({
	type: Xa("text"),
	content: Uo,
	typography: zo,
	runtimeWrap: Jo.optional()
}), Xo = Ja([
	"cover",
	"contain",
	"fill",
	"none"
]), Zo = P({
	x: M().min(0).max(1),
	y: M().min(0).max(1),
	width: M().positive().max(1),
	height: M().positive().max(1)
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
}), Qo = P({
	items: La(P({
		src: Wo,
		alt: k().optional()
	})).min(2),
	mode: Ja(["carousel", "gallery"]),
	autoplay: N(),
	interval: M().min(1).max(60),
	loop: N(),
	showArrows: N(),
	showIndicators: N(),
	transition: Ja([
		"none",
		"fade",
		"slide"
	]).default("fade"),
	transitionDuration: M().min(.1).max(5).default(.45),
	columns: M().int().min(1).max(12),
	gap: M().min(0).max(100),
	fullscreenView: N().default(!1),
	autoAdjust: N().default(!1)
}).optional(), $o = qo.extend({
	type: Xa("image"),
	src: Wo,
	alt: k().optional(),
	fit: Xo,
	crop: Zo.optional(),
	gallery: Qo
}), es = qo.extend({
	type: Xa("video"),
	src: Wo,
	poster: Wo.optional(),
	controls: N(),
	loop: N(),
	autoplay: N(),
	muted: N(),
	lightbox: P({
		enabled: N(),
		hoverLabel: k()
	}).optional()
}), ts = Ja([
	"studio",
	"soft",
	"dramatic",
	"neutral",
	"outdoor"
]), ns = Ja([
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
]), rs = Ja([
	"none",
	"soft",
	"hard"
]), is = P({
	autoRotate: N(),
	pauseOnHover: N(),
	resumeOnLeave: N(),
	rotationOffset: P({
		enabled: N(),
		x: M().min(-360).max(360),
		y: M().min(-360).max(360),
		z: M().min(-360).max(360)
	}).optional(),
	rotationSpeed: P({
		x: M().min(-360).max(360),
		y: M().min(-360).max(360),
		z: M().min(-360).max(360)
	}).optional()
}), as = P({ fov: M().min(10).max(120) }), os = P({
	enabled: N(),
	bands: M().int().min(2).max(8),
	strength: M().min(0).max(1),
	smoothness: M().min(0).max(.49),
	roughnessMultiplier: M().min(0).max(2),
	metalnessMultiplier: M().min(0).max(2),
	opacityMultiplier: M().min(0).max(1),
	normalScale: M().min(0).max(2),
	ao: P({
		enabled: N(),
		intensity: M().min(0).max(2)
	}).optional(),
	outline: P({
		enabled: N(),
		color: k(),
		thickness: M().min(0).max(.1),
		opacity: M().min(0).max(1)
	}).optional()
}), ss = P({
	enabled: N(),
	baseColor: k(),
	roughness: M().min(0).max(1),
	metalness: M().min(0).max(1)
}), cs = P({
	enabled: N(),
	color: k(),
	thickness: M().min(.5).max(8)
}), ls = qo.extend({
	type: Xa("model3d"),
	src: Wo,
	behaviors: is,
	camera: as.optional(),
	toon: os.optional(),
	materialOverride: ss.optional(),
	wireframe: cs.optional(),
	lighting: ts.optional(),
	lightingIntensity: M().min(0).max(5).optional(),
	environment: ns.optional(),
	shadows: rs.optional(),
	backfaceCulling: N().optional(),
	transparentBackground: N().optional().transform(() => !0)
}), us = P({
	in: M().min(0),
	out: M().min(0)
}), ds = qo.extend({
	type: Xa("audio"),
	src: Wo,
	loop: N(),
	volume: M().min(0).max(1),
	fade: us.optional(),
	autoplay: N(),
	background: N().optional(),
	backgroundPlayback: P({
		startOnScroll: N(),
		stopAtDocumentEnd: N()
	}).optional()
}), fs = qo.extend({
	type: Xa("spacer"),
	axis: Ja(["vertical", "horizontal"]).optional()
}), ps = qo.extend({
	type: Xa("divider"),
	thickness: M().positive(),
	color: k(),
	lineStyle: Ja([
		"solid",
		"double",
		"dashed",
		"dotted",
		"zigzag"
	])
}), ms = Ja([
	"none",
	"thin-all",
	"thick-all",
	"thick-outside-thin-inside"
]), hs = Ba([Uo, k().transform((e) => [{
	kind: "paragraph",
	runs: e ? [{ text: e }] : []
}])]), gs = Ha("type", [
	Yo,
	$o,
	es,
	ls,
	ds,
	fs,
	ps,
	qo.extend({
		type: Xa("table"),
		rows: La(La(hs).min(1)).min(1),
		headerRow: N(),
		headerColumn: N(),
		borderTemplate: ms,
		borderColor: k(),
		thinBorderWidth: M().min(.25).max(10),
		thickBorderWidth: M().min(1).max(20),
		cellPadding: M().min(0).max(100),
		cellGap: M().min(0).max(50),
		textColor: k(),
		backgroundColor: k(),
		headerBackgroundColor: k(),
		striped: N(),
		textAlign: Ja([
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
	qo.extend({
		type: Xa("container"),
		children: vo(() => La(gs))
	})
]), _s = P({
	family: k(),
	src: Wo,
	weight: Ba([M().int(), Ja(["normal", "bold"])]).optional(),
	style: Ja(["normal", "italic"]).optional()
}), vs = P({
	id: k().min(1),
	title: k().optional(),
	createdAt: k().optional(),
	updatedAt: k().optional(),
	author: k().optional()
}).catchall(Go), ys = P({
	color: k().optional(),
	image: Wo.optional()
}), bs = P({
	id: k().min(1),
	name: k().optional(),
	height: Ba([M().positive(), Xa("auto")]).optional(),
	background: ys.optional(),
	nodes: La(gs)
}), xs = P({
	version: Xa(ko),
	metadata: vs,
	presentation: Co.default(To),
	fonts: La(_s).optional(),
	sections: La(bs).min(1)
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
function Ss(e) {
	return xs.parse(e);
}
//#endregion
//#region src/runtime/load.ts
async function Cs(e, t = {}) {
	if (e instanceof URL) return ws(e.toString(), t);
	if (typeof e == "string") {
		let n = e.trim();
		return n.startsWith("{") ? { document: Ss(JSON.parse(n)) } : ws(e, t);
	}
	return { document: Ss(e) };
}
async function ws(e, t) {
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
		document: Ss(r),
		inferredAssetBaseUrl: new URL(".", i).toString()
	};
}
function Ts(e) {
	let t = new URL(e.toString(), globalThis.location?.href ?? "http://amp.local/");
	return (e) => e ? new URL(e, t).toString() : "";
}
//#endregion
//#region src/runtime/layout.ts
var Es = {
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
function Ds(e, t) {
	let n = {
		boxSizing: "border-box",
		position: "relative"
	}, r = e.size.width, i = e.size.height;
	if (r !== "auto" && (n.width = r), i !== "auto" && (n.height = i), Os(n, "margin", e.margin), Os(n, "padding", e.padding), e.mode === "absolute") {
		n.position = "absolute";
		let [t, a] = Es[e.anchor ?? "top-left"];
		n.left = (e.position?.x ?? 0) - (r === "auto" ? 0 : r * t), n.top = (e.position?.y ?? 0) - (i === "auto" ? 0 : i * a);
	} else e.mode === "float-left" ? n.float = "left" : e.mode === "float-right" ? n.float = "right" : e.mode === "inline" ? n.display = "inline-block" : e.mode === "center" && (n.display = "block", n.marginLeft ??= "auto", n.marginRight ??= "auto");
	return e.align && (n.textAlign = e.align), e.rotation && (n.transform = `rotate(${e.rotation}deg)`, n.transformOrigin = "center center"), e.zIndex !== void 0 && (n.zIndex = e.zIndex), e.overflow && (n.overflow = e.overflow), t?.opacity !== void 0 && (n.opacity = t.opacity), t?.backgroundColor && (n.backgroundColor = t.backgroundColor), t?.borderRadius !== void 0 && (n.borderRadius = t.borderRadius), t?.border && (n.borderStyle = t.border.style ?? "solid", n.borderWidth = t.border.width, n.borderColor = t.border.color), n;
}
function Os(e, t, n) {
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
var L = t();
function ks({ node: e }) {
	let t = Do(e.src), n = (0, I.useRef)(null), r = (0, I.useRef)(0), i = (0, I.useRef)(!1);
	if ((0, I.useEffect)(() => {
		n.current && (n.current.volume = e.volume);
	}, [e.volume]), (0, I.useEffect)(() => {
		if (!e.background) return;
		let t = r, a = e.backgroundPlayback ?? {
			startOnScroll: !0,
			stopAtDocumentEnd: !0
		}, o = (t) => {
			if (!a.startOnScroll || t.deltaY <= 0 || i.current) return;
			let o = n.current;
			!o || !o.paused || (o.volume = e.fade?.in ? 0 : e.volume, o.play().then(() => As(o, e.volume, e.fade?.in ?? 0, r)).catch(() => void 0));
		}, s = () => {
			if (!a.stopAtDocumentEnd || i.current) return;
			let t = n.current?.closest(".amp-runtime-root");
			if (!t || t.getBoundingClientRect().bottom > innerHeight + 2) return;
			let o = n.current;
			!o || o.paused || (i.current = !0, As(o, 0, e.fade?.out ?? 0, r, () => o.pause()));
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
	return /* @__PURE__ */ (0, L.jsx)("audio", {
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
function As(e, t, n, r, i) {
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
function js({ node: e }) {
	if (e.lineStyle === "zigzag") {
		let t = Math.max(8, e.thickness * 4), n = t / 2 - e.thickness;
		return /* @__PURE__ */ (0, L.jsxs)("svg", {
			"aria-hidden": !0,
			width: "100%",
			height: t,
			preserveAspectRatio: "none",
			className: "amp-runtime-divider",
			children: [/* @__PURE__ */ (0, L.jsx)("defs", { children: /* @__PURE__ */ (0, L.jsx)("pattern", {
				id: `runtime-zigzag-${e.id}`,
				width: "20",
				height: t,
				patternUnits: "userSpaceOnUse",
				children: /* @__PURE__ */ (0, L.jsx)("path", {
					d: `M 0 ${t / 2} L 5 ${t / 2 - n} L 15 ${t / 2 + n} L 20 ${t / 2}`,
					fill: "none",
					stroke: e.color,
					strokeWidth: e.thickness,
					strokeLinejoin: "round"
				})
			}) }), /* @__PURE__ */ (0, L.jsx)("rect", {
				width: "100%",
				height: t,
				fill: `url(#runtime-zigzag-${e.id})`
			})]
		});
	}
	return /* @__PURE__ */ (0, L.jsx)("div", {
		className: "amp-runtime-divider",
		style: {
			width: "100%",
			height: 0,
			borderTop: `${e.thickness}px ${e.lineStyle} ${e.color}`
		}
	});
}
//#endregion
//#region node_modules/react-dom/cjs/react-dom.production.js
var Ms = /* @__PURE__ */ e(((e) => {
	var t = r();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function i() {}
	var a = {
		d: {
			f: i,
			r: function() {
				throw Error(n(522));
			},
			D: i,
			C: i,
			L: i,
			m: i,
			X: i,
			S: i,
			M: i
		},
		p: 0,
		findDOMNode: null
	}, o = Symbol.for("react.portal");
	function s(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: o,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function l(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return s(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = c.T, n = a.p;
		try {
			if (c.T = null, a.p = 2, e) return e();
		} finally {
			c.T = t, a.p = n, a.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, a.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && a.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = l(n, t.crossOrigin), i = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? a.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: i,
				fetchPriority: o
			}) : n === "script" && a.d.X(e, {
				crossOrigin: r,
				integrity: i,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = l(t.as, t.crossOrigin);
				a.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? a.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = l(n, t.crossOrigin);
			a.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = l(t.as, t.crossOrigin);
			a.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else a.d.m(e);
	}, e.requestFormReset = function(e) {
		a.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return c.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return c.H.useHostTransitionStatus();
	}, e.version = "19.2.7";
})), Ns = /* @__PURE__ */ e(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t() {}
		function n(e) {
			return "" + e;
		}
		function i(e, t, r) {
			var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			try {
				n(i);
				var a = !1;
			} catch {
				a = !0;
			}
			return a && (console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", typeof Symbol == "function" && Symbol.toStringTag && i[Symbol.toStringTag] || i.constructor.name || "Object"), n(i)), {
				$$typeof: d,
				key: i == null ? null : "" + i,
				children: e,
				containerInfo: t,
				implementation: r
			};
		}
		function a(e, t) {
			if (e === "font") return "";
			if (typeof t == "string") return t === "use-credentials" ? t : "";
		}
		function o(e) {
			return e === null ? "`null`" : e === void 0 ? "`undefined`" : e === "" ? "an empty string" : "something with type \"" + typeof e + "\"";
		}
		function s(e) {
			return e === null ? "`null`" : e === void 0 ? "`undefined`" : e === "" ? "an empty string" : typeof e == "string" ? JSON.stringify(e) : typeof e == "number" ? "`" + e + "`" : "something with type \"" + typeof e + "\"";
		}
		function c() {
			var e = f.H;
			return e === null && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."), e;
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var l = r(), u = {
			d: {
				f: t,
				r: function() {
					throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
				},
				D: t,
				C: t,
				L: t,
				m: t,
				X: t,
				S: t,
				M: t
			},
			p: 0,
			findDOMNode: null
		}, d = Symbol.for("react.portal"), f = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, e.createPortal = function(e, t) {
			var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
			if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error("Target container is not a DOM element.");
			return i(e, t, null, n);
		}, e.flushSync = function(e) {
			var t = f.T, n = u.p;
			try {
				if (f.T = null, u.p = 2, e) return e();
			} finally {
				f.T = t, u.p = n, u.d.f() && console.error("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.");
			}
		}, e.preconnect = function(e, t) {
			typeof e == "string" && e ? t != null && typeof t != "object" ? console.error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.", s(t)) : t != null && typeof t.crossOrigin != "string" && console.error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.", o(t.crossOrigin)) : console.error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", o(e)), typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, u.d.C(e, t));
		}, e.prefetchDNS = function(e) {
			if (typeof e != "string" || !e) console.error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", o(e));
			else if (1 < arguments.length) {
				var t = arguments[1];
				typeof t == "object" && t.hasOwnProperty("crossOrigin") ? console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", s(t)) : console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", s(t));
			}
			typeof e == "string" && u.d.D(e);
		}, e.preinit = function(e, t) {
			if (typeof e == "string" && e ? typeof t != "object" || !t ? console.error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.", s(t)) : t.as !== "style" && t.as !== "script" && console.error("ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are \"style\" and \"script\".", s(t.as)) : console.error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", o(e)), typeof e == "string" && t && typeof t.as == "string") {
				var n = t.as, r = a(n, t.crossOrigin), i = typeof t.integrity == "string" ? t.integrity : void 0, c = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
				n === "style" ? u.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
					crossOrigin: r,
					integrity: i,
					fetchPriority: c
				}) : n === "script" && u.d.X(e, {
					crossOrigin: r,
					integrity: i,
					fetchPriority: c,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		}, e.preinitModule = function(e, t) {
			var n = "";
			if (typeof e == "string" && e || (n += " The `href` argument encountered was " + o(e) + "."), t !== void 0 && typeof t != "object" ? n += " The `options` argument encountered was " + o(t) + "." : t && "as" in t && t.as !== "script" && (n += " The `as` option encountered was " + s(t.as) + "."), n) console.error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s", n);
			else switch (n = t && typeof t.as == "string" ? t.as : "script", n) {
				case "script": break;
				default: n = s(n), console.error("ReactDOM.preinitModule(): Currently the only supported \"as\" type for this function is \"script\" but received \"%s\" instead. This warning was generated for `href` \"%s\". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)", n, e);
			}
			typeof e == "string" && (typeof t == "object" && t ? (t.as == null || t.as === "script") && (n = a(t.as, t.crossOrigin), u.d.M(e, {
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			})) : t ?? u.d.M(e));
		}, e.preload = function(e, t) {
			var n = "";
			if (typeof e == "string" && e || (n += " The `href` argument encountered was " + o(e) + "."), typeof t != "object" || !t ? n += " The `options` argument encountered was " + o(t) + "." : typeof t.as == "string" && t.as || (n += " The `as` option encountered was " + o(t.as) + "."), n && console.error("ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel=\"preload\" as=\"...\" />` tag.%s", n), typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
				n = t.as;
				var r = a(n, t.crossOrigin);
				u.d.L(e, n, {
					crossOrigin: r,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0,
					type: typeof t.type == "string" ? t.type : void 0,
					fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
					referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
					imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
					imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
					media: typeof t.media == "string" ? t.media : void 0
				});
			}
		}, e.preloadModule = function(e, t) {
			var n = "";
			typeof e == "string" && e || (n += " The `href` argument encountered was " + o(e) + "."), t !== void 0 && typeof t != "object" ? n += " The `options` argument encountered was " + o(t) + "." : t && "as" in t && typeof t.as != "string" && (n += " The `as` option encountered was " + o(t.as) + "."), n && console.error("ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel=\"modulepreload\" as=\"...\" />` tag.%s", n), typeof e == "string" && (t ? (n = a(t.as, t.crossOrigin), u.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			})) : u.d.m(e));
		}, e.requestFormReset = function(e) {
			u.d.r(e);
		}, e.unstable_batchedUpdates = function(e, t) {
			return e(t);
		}, e.useFormState = function(e, t, n) {
			return c().useFormState(e, t, n);
		}, e.useFormStatus = function() {
			return c().useHostTransitionStatus();
		}, e.version = "19.2.7", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), Ps = /* @__PURE__ */ e(((e, t) => {
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
	process.env.NODE_ENV === "production" ? (n(), t.exports = Ms()) : t.exports = Ns();
})), Fs = Ps();
function Is({ label: e, onClose: t }) {
	let { legacyMode: n } = Oo();
	return /* @__PURE__ */ (0, L.jsx)("button", {
		type: "button",
		className: `amp-runtime-close ${n.enabled ? "legacy" : ""}`,
		"aria-label": e,
		onClick: t,
		children: "×"
	});
}
//#endregion
//#region src/runtime/nodes/useRuntimeModalClose.ts
function Ls(e) {
	(0, I.useEffect)(() => {
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
function Rs({ node: e }) {
	let t = Do(e.src);
	if (e.gallery) return e.gallery.mode === "gallery" ? /* @__PURE__ */ (0, L.jsx)(zs, {
		node: e,
		gallery: e.gallery
	}) : /* @__PURE__ */ (0, L.jsx)(Hs, {
		node: e,
		gallery: e.gallery
	});
	if (!t) return null;
	if (e.crop) {
		let { x: n, y: r, width: i, height: a } = e.crop;
		return /* @__PURE__ */ (0, L.jsx)("div", {
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
	return /* @__PURE__ */ (0, L.jsx)("img", {
		src: t,
		alt: e.alt ?? "",
		loading: "lazy",
		decoding: "async",
		draggable: !1,
		className: "amp-runtime-image",
		style: { objectFit: e.fit }
	});
}
function zs({ node: e, gallery: t }) {
	let [n, r] = (0, I.useState)(), i = t.autoAdjust ? {
		columnCount: t.columns,
		columnGap: t.gap
	} : {
		display: "grid",
		gridTemplateColumns: `repeat(${t.columns}, minmax(0, 1fr))`,
		gap: t.gap
	};
	return /* @__PURE__ */ (0, L.jsxs)(L.Fragment, { children: [/* @__PURE__ */ (0, L.jsx)("div", {
		className: t.autoAdjust ? "amp-runtime-gallery amp-runtime-gallery-masonry" : "amp-runtime-gallery",
		style: i,
		children: t.items.map((n, i) => /* @__PURE__ */ (0, L.jsx)(Bs, {
			item: n,
			index: i,
			fit: e.fit,
			natural: t.autoAdjust,
			fullscreen: t.fullscreenView,
			gap: t.gap,
			onOpen: r
		}, `${n.src}-${i}`))
	}), n && (0, Fs.createPortal)(/* @__PURE__ */ (0, L.jsx)(Vs, {
		item: n,
		onClose: () => r(void 0)
	}), document.body)] });
}
function Bs({ item: e, index: t, fit: n, natural: r, fullscreen: i, gap: a, onOpen: o }) {
	let s = Do(e.src), c = s ? /* @__PURE__ */ (0, L.jsx)("img", {
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
	return i ? /* @__PURE__ */ (0, L.jsx)("button", {
		type: "button",
		"aria-label": `View ${e.alt || `image ${t + 1}`} fullscreen`,
		onClick: () => o(e),
		style: l,
		children: c
	}) : /* @__PURE__ */ (0, L.jsx)("div", {
		style: l,
		children: c
	});
}
function Vs({ item: e, onClose: t }) {
	let n = Do(e.src);
	return Ls(t), /* @__PURE__ */ (0, L.jsxs)("div", {
		className: "amp-runtime-lightbox",
		role: "dialog",
		"aria-label": "Gallery fullscreen viewer",
		"aria-modal": "true",
		onContextMenu: (e) => e.preventDefault(),
		onDragStart: (e) => e.preventDefault(),
		onPointerDown: (e) => {
			e.target === e.currentTarget && t();
		},
		children: [n && /* @__PURE__ */ (0, L.jsx)("img", {
			src: n,
			alt: e.alt ?? "",
			draggable: !1
		}), /* @__PURE__ */ (0, L.jsx)(Is, {
			label: "Close image",
			onClose: t
		})]
	});
}
function Hs({ node: e, gallery: t }) {
	let [n, r] = (0, I.useState)(0), [i, a] = (0, I.useState)(), o = Math.min(n, t.items.length - 1), s = i?.to ?? o, c = (e, n) => {
		i || e === o || (t.transition === "none" ? r(e) : a({
			from: o,
			to: e,
			direction: n,
			running: !1
		}));
	};
	return (0, I.useLayoutEffect)(() => {
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
	}, [i]), (0, I.useEffect)(() => {
		if (!t.autoplay || i) return;
		let e = window.setTimeout(() => {
			let e = qs(o, 1, t.items.length, t.loop);
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
	]), /* @__PURE__ */ (0, L.jsxs)("div", {
		className: "amp-runtime-carousel",
		children: [
			t.items.map((e, t) => /* @__PURE__ */ (0, L.jsx)(Gs, { src: e.src }, `${e.src}-${t}`)),
			i ? /* @__PURE__ */ (0, L.jsxs)(L.Fragment, { children: [/* @__PURE__ */ (0, L.jsx)(Us, {
				item: t.items[i.from],
				fit: e.fit,
				gallery: t,
				direction: i.direction,
				incoming: !1,
				running: i.running
			}), /* @__PURE__ */ (0, L.jsx)(Us, {
				item: t.items[i.to],
				fit: e.fit,
				gallery: t,
				direction: i.direction,
				incoming: !0,
				running: i.running,
				onTransitionEnd: (e) => {
					e.target !== e.currentTarget || !i?.running || e.propertyName === (t.transition === "fade" ? "opacity" : "transform") && (r(i.to), a(void 0));
				}
			})] }) : /* @__PURE__ */ (0, L.jsx)(Ws, {
				item: t.items[o],
				fit: e.fit
			}),
			t.showArrows && /* @__PURE__ */ (0, L.jsxs)(L.Fragment, { children: [/* @__PURE__ */ (0, L.jsx)(Ks, {
				label: "Previous image",
				side: "left",
				disabled: !!i,
				onClick: () => c(qs(s, -1, t.items.length, t.loop), -1),
				children: "‹"
			}), /* @__PURE__ */ (0, L.jsx)(Ks, {
				label: "Next image",
				side: "right",
				disabled: !!i,
				onClick: () => c(qs(s, 1, t.items.length, t.loop), 1),
				children: "›"
			})] }),
			t.showIndicators && /* @__PURE__ */ (0, L.jsx)("div", {
				className: "amp-runtime-carousel-indicators",
				children: t.items.map((e, t) => /* @__PURE__ */ (0, L.jsx)("button", {
					"aria-label": `Show image ${t + 1}`,
					onClick: () => c(t, t < s ? -1 : 1),
					className: t === s ? "active" : ""
				}, t))
			})
		]
	});
}
function Us({ item: e, fit: t, gallery: n, direction: r, incoming: i, running: a, onTransitionEnd: o }) {
	let s = n.transition === "fade", c = s ? 0 : a ? i ? 0 : -r * 100 : i ? r * 100 : 0;
	return /* @__PURE__ */ (0, L.jsx)("div", {
		className: "amp-runtime-carousel-layer",
		"aria-hidden": !i || void 0,
		onTransitionEnd: o,
		style: {
			opacity: s ? i ? +!!a : +!a : 1,
			transform: `translate3d(${c}%,0,0)`,
			transition: a ? `opacity ${n.transitionDuration}s cubic-bezier(.22,.61,.36,1),transform ${n.transitionDuration}s cubic-bezier(.22,.61,.36,1)` : "none"
		},
		children: /* @__PURE__ */ (0, L.jsx)(Ws, {
			item: e,
			fit: t
		})
	});
}
function Ws({ item: e, fit: t }) {
	let n = Do(e.src);
	return n ? /* @__PURE__ */ (0, L.jsx)("img", {
		src: n,
		alt: e.alt ?? "",
		draggable: !1,
		decoding: "async",
		style: { objectFit: t }
	}) : null;
}
function Gs({ src: e }) {
	let t = Do(e);
	return t ? /* @__PURE__ */ (0, L.jsx)("link", {
		rel: "preload",
		as: "image",
		href: t
	}) : null;
}
function Ks({ label: e, side: t, disabled: n, onClick: r, children: i }) {
	return /* @__PURE__ */ (0, L.jsx)("button", {
		type: "button",
		"aria-label": e,
		disabled: n,
		onClick: r,
		className: `amp-runtime-carousel-arrow ${t}`,
		children: i
	});
}
function qs(e, t, n, r) {
	return r ? (e + t + n) % n : Math.max(0, Math.min(n - 1, e + t));
}
//#endregion
//#region src/runtime/model3d/model-load-queue.ts
var Js = 2, Ys = 0, Xs = [];
function Zs(e, t) {
	let n = {
		key: e,
		start: t
	};
	return Ys < Js ? $s(n) : Xs.push(n), () => {
		let e = Xs.indexOf(n);
		e >= 0 && Xs.splice(e, 1);
	};
}
function Qs() {
	for (; Ys < Js && Xs.length;) {
		let e = Xs.shift();
		e && $s(e);
	}
}
function $s(e) {
	Ys += 1;
	let t = !1, n = () => {
		t || (t = !0, Ys = Math.max(0, Ys - 1), Qs());
	};
	try {
		e.start(n);
	} catch (e) {
		throw n(), e;
	}
}
//#endregion
//#region src/runtime/model3d/RuntimeModel3D.tsx
var ec = (0, I.lazy)(() => import("./RuntimeModel3DView-DmVQDjBa.js"));
function tc({ node: e }) {
	let t = (0, I.useRef)(null), n = (0, I.useRef)(null), r = Do(e.src), { visible: i, activated: o, resident: s } = ic(t), c = nc(t, n, e.behaviors.pauseOnHover, i), [l, u] = (0, I.useState)({
		key: r,
		ready: !1,
		error: ""
	}), d = l.key === r ? l : {
		key: r,
		ready: !1,
		error: ""
	}, f = (0, I.useCallback)(() => u({
		key: r,
		ready: !0,
		error: ""
	}), [r]), p = (0, I.useCallback)((e) => u({
		key: r,
		ready: !1,
		error: e
	}), [r]), m = i && e.behaviors.autoRotate && !(c && e.behaviors.pauseOnHover);
	return (0, I.useEffect)(() => (a(e.id, m), () => a(e.id, !1)), [e.id, m]), /* @__PURE__ */ (0, L.jsxs)("div", {
		ref: t,
		className: "amp-runtime-model",
		"data-amp-model-hovered": c || void 0,
		children: [
			/* @__PURE__ */ (0, L.jsx)("canvas", {
				ref: n,
				className: "amp-runtime-model-bitmap",
				"aria-label": e.name,
				role: "img"
			}),
			!d.ready && /* @__PURE__ */ (0, L.jsx)("div", {
				className: "amp-runtime-asset-placeholder",
				children: d.error ? `3D model unavailable: ${d.error}` : o ? "Loading 3D model…" : "3D model loads near viewport"
			}),
			s && r && /* @__PURE__ */ (0, L.jsx)(rc, {
				node: e,
				src: r,
				visible: i,
				hovered: c,
				presentationRef: n,
				onReady: f,
				onError: p
			}, r)
		]
	});
}
function nc(e, t, n, r) {
	let [i, a] = (0, I.useState)(!1), o = (0, I.useRef)(!1), s = (0, I.useRef)(null);
	return (0, I.useEffect)(() => {
		let i = e.current?.closest(".amp-runtime-root");
		if (!i || !n || !r) return;
		let c = (e) => {
			o.current !== e && (o.current = e, a(e));
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
			if (e.clientX < r.left || e.clientX >= r.right || e.clientY < r.top || e.clientY >= r.bottom || r.width <= 0 || r.height <= 0) {
				c(!1);
				return;
			}
			let i = Math.min(n.width - 1, Math.max(0, Math.floor((e.clientX - r.left) / r.width * n.width))), a = Math.min(n.height - 1, Math.max(0, Math.floor((e.clientY - r.top) / r.height * n.height)));
			try {
				s.current ??= n.getContext("2d", { willReadFrequently: !0 }), c((s.current?.getImageData(i, a, 1, 1).data[3] ?? 0) > 8);
			} catch {
				c(!1);
			}
		}, u = () => c(!1);
		return i.addEventListener("pointermove", l, { passive: !0 }), i.addEventListener("pointerleave", u, { passive: !0 }), () => {
			i.removeEventListener("pointermove", l), i.removeEventListener("pointerleave", u), o.current = !1;
		};
	}, [
		t,
		n,
		e,
		r
	]), n && r && i;
}
function rc(e) {
	let { node: t, src: n, onReady: r, onError: i } = e, [a, o] = (0, I.useState)(!1), s = (0, I.useRef)(null);
	(0, I.useEffect)(() => {
		let e = Zs(`${t.id}:${n}`, (e) => {
			s.current = e, o(!0);
		});
		return () => {
			e(), s.current?.(), s.current = null;
		};
	}, [t.id, n]);
	let c = (0, I.useCallback)(() => {
		s.current?.(), s.current = null, r();
	}, [r]), l = (0, I.useCallback)((e) => {
		s.current?.(), s.current = null, i(e);
	}, [i]);
	return a ? /* @__PURE__ */ (0, L.jsx)(ac, {
		resetKey: e.src,
		onError: l,
		children: /* @__PURE__ */ (0, L.jsx)(I.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, L.jsx)(ec, {
				...e,
				onReady: c,
				onError: l
			})
		})
	}) : null;
}
function ic(e) {
	let t = typeof IntersectionObserver > "u", [n, r] = (0, I.useState)(t), [i, a] = (0, I.useState)(t), [o, s] = (0, I.useState)(t);
	return (0, I.useEffect)(() => {
		let t = e.current;
		if (!t || typeof IntersectionObserver > "u") return;
		let n = 0, i = new IntersectionObserver(([e]) => {
			let t = !!e?.isIntersecting;
			r(t), t ? (n && clearTimeout(n), a(!0), s(!0)) : n = window.setTimeout(() => s(!1), 3e4);
		}, { rootMargin: "400px" });
		return i.observe(t), () => {
			i.disconnect(), n && clearTimeout(n);
		};
	}, [e]), {
		visible: n,
		activated: i,
		resident: o
	};
}
var ac = class extends I.Component {
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
function oc(e, t, n) {
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
			let l = a + (o - a) * r / s, u = i.map((e) => sc(e, l, n.alphaThreshold, t)).filter((e) => e !== null);
			c.push(u.length ? t === "left" ? Math.max(...u) : Math.min(...u) : t === "left" ? e.left : e.right);
		}
		let l = t === "left" ? Math.max(0, Math.min(e.right, Math.max(...c)) - e.left) : Math.max(0, e.right - Math.max(e.left, Math.min(...c)));
		if (l <= 0) return [];
		let u = Math.max(n.scale, .01), d = l / u, f = (o - a) / u, p = c.map((n, r) => {
			let i = f * r / s;
			return `${cc(t === "left" ? Math.max(0, Math.min(d, (n - e.left) / u)) : Math.max(0, Math.min(d, (n - (e.right - l)) / u)))}px ${cc(i)}px`;
		}), m = t === "left" ? `polygon(0 0, ${p.join(", ")}, 0 ${cc(f)}px)` : `polygon(${cc(d)}px 0, ${p.join(", ")}, ${cc(d)}px ${cc(f)}px)`;
		return [{
			id: `model-silhouette-${t}`,
			side: t,
			top: Math.max(0, a - e.top) / u,
			width: d,
			height: f,
			margin: n.margin,
			shapeOutside: m
		}];
	});
}
function sc(e, t, n, r) {
	let { rect: i } = e;
	if (t < i.top || t > i.bottom || i.width <= 0 || i.height <= 0) return null;
	if (!e.alpha || e.alphaWidth <= 0 || e.alphaHeight <= 0) return r === "left" ? i.right : i.left;
	let a = Math.max(0, Math.min(e.alphaHeight - 1, Math.floor((t - i.top) / i.height * e.alphaHeight))), o = Math.round(Math.max(0, Math.min(1, n)) * 255);
	if (r === "left") {
		for (let t = e.alphaWidth - 1; t >= 0; --t) if (e.alpha[a * e.alphaWidth + t] > o) return i.left + (t + 1) / e.alphaWidth * i.width;
	} else for (let t = 0; t < e.alphaWidth; t += 1) if (e.alpha[a * e.alphaWidth + t] > o) return i.left + t / e.alphaWidth * i.width;
	return null;
}
function cc(e) {
	return Math.round(e * 100) / 100;
}
//#endregion
//#region src/runtime/nodes/RuntimeText.tsx
function lc({ node: e }) {
	let t = (0, I.useRef)(null), n = hc(t, e), r = e.typography;
	return /* @__PURE__ */ (0, L.jsxs)("div", {
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
			textIndent: r.indent
		},
		children: [n.map((e) => /* @__PURE__ */ (0, L.jsx)("span", {
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
		}, e.id)), /* @__PURE__ */ (0, L.jsx)(uc, {
			content: e.content,
			paragraphSpacing: r.paragraphSpacing
		})]
	});
}
function uc({ content: e, paragraphSpacing: t }) {
	let n = [];
	for (let r = 0; r < e.length;) {
		let i = e[r];
		if (!i.listType || i.listType === "none") {
			n.push(/* @__PURE__ */ (0, L.jsx)("p", {
				style: {
					margin: 0,
					marginBottom: t,
					marginLeft: i.indent ? i.indent * 24 : void 0
				},
				children: i.runs.map(dc)
			}, r)), r += 1;
			continue;
		}
		let a = i.listType, o = r, s = [];
		for (; r < e.length && e[r].listType === a;) {
			let n = e[r];
			s.push(/* @__PURE__ */ (0, L.jsx)("li", {
				style: {
					marginBottom: t,
					marginLeft: n.indent ? n.indent * 24 : void 0
				},
				children: n.runs.map(dc)
			}, r)), r += 1;
		}
		n.push(a === "ordered" ? /* @__PURE__ */ (0, L.jsx)("ol", { children: s }, o) : /* @__PURE__ */ (0, L.jsx)("ul", { children: s }, o));
	}
	return /* @__PURE__ */ (0, L.jsx)(L.Fragment, { children: n });
}
function dc(e, t) {
	let n = e.marks ?? [], r = [n.includes("underline") ? "underline" : "", n.includes("strikethrough") ? "line-through" : ""].filter(Boolean).join(" "), i = {
		color: e.color,
		fontWeight: n.includes("bold") ? "bold" : void 0,
		fontStyle: n.includes("italic") ? "italic" : void 0,
		textDecoration: r || void 0
	}, a = n.includes("code") ? /* @__PURE__ */ (0, L.jsx)("code", { children: e.text }) : e.text, o = fc(e.href);
	return o ? /* @__PURE__ */ (0, L.jsx)("a", {
		href: o,
		style: i,
		children: a
	}, t) : /* @__PURE__ */ (0, L.jsx)("span", {
		style: i,
		children: a
	}, t);
}
function fc(e) {
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
var pc = /* @__PURE__ */ new WeakMap(), mc = /* @__PURE__ */ new WeakMap();
function hc(e, t) {
	let [n, r] = (0, I.useState)([]), i = t.runtimeWrap;
	return (0, I.useEffect)(() => {
		let t = e.current;
		if (!t || !i?.enabled) return;
		let n = t.closest(".amp-runtime-root");
		if (!n) return;
		let a = () => i.targetNodeIds.length ? i.targetNodeIds.map((e) => n.querySelector(`[data-node-id="${_c(e)}"]`)).filter((e) => !!e) : Array.from(n.querySelectorAll(".amp-runtime-node-model3d")), o = a(), s = 0, c = () => {
			s = 0;
			let e = t.getBoundingClientRect(), n = t.offsetWidth ? e.width / t.offsetWidth : 1;
			if (!Number.isFinite(n) || n <= 0) return;
			let a = (i.mode ?? "silhouette") === "silhouette", c = oc(e, o.map((e, t) => {
				let n = e.getBoundingClientRect(), r = e.querySelector("canvas"), i = a && r ? pc.get(r) ?? gc(r) : null;
				return r && i && pc.set(r, i), {
					id: e.dataset.nodeId ?? String(t),
					rect: n,
					alpha: i?.alpha ?? null,
					alphaWidth: i?.width ?? 0,
					alphaHeight: i?.height ?? 0
				};
			}), {
				side: i.side,
				margin: i.margin,
				alphaThreshold: i.alphaThreshold ?? .05,
				scale: n
			});
			r((e) => JSON.stringify(e) === JSON.stringify(c) ? e : c);
		}, l = () => {
			s ||= requestAnimationFrame(c);
		}, u = typeof ResizeObserver > "u" ? null : new ResizeObserver(l);
		u?.observe(t), o.forEach((e) => u?.observe(e));
		let d = (e) => {
			let t = e.target;
			if (!(t instanceof HTMLCanvasElement)) return;
			let n = t.closest(".amp-runtime-node-model3d");
			if (!n || !o.includes(n)) return;
			let r = performance.now(), a = 1e3 / (i.updateFps ?? 12);
			if (r - (mc.get(t) ?? -Infinity) < a) return;
			mc.set(t, r);
			let s = gc(t);
			s && pc.set(t, s), l();
		}, f = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
			o = a(), l();
		});
		return f?.observe(n, {
			childList: !0,
			subtree: !0
		}), n.addEventListener("amp-model-frame", d), window.addEventListener("resize", l), l(), () => {
			u?.disconnect(), f?.disconnect(), n.removeEventListener("amp-model-frame", d), window.removeEventListener("resize", l), s && cancelAnimationFrame(s);
		};
	}, [e, i]), i?.enabled ? n : [];
}
function gc(e) {
	if (!e.width || !e.height) return null;
	let t = Math.min(1, 128 / Math.max(e.width, e.height)), n = Math.max(1, Math.round(e.width * t)), r = Math.max(1, Math.round(e.height * t)), i = document.createElement("canvas");
	i.width = n, i.height = r;
	let a = i.getContext("2d", { willReadFrequently: !0 });
	if (!a) return null;
	try {
		a.drawImage(e, 0, 0, n, r);
		let t = a.getImageData(0, 0, n, r).data, i = new Uint8ClampedArray(n * r);
		for (let e = 0; e < i.length; e += 1) i[e] = t[e * 4 + 3];
		return {
			alpha: i,
			width: n,
			height: r
		};
	} catch {
		return null;
	}
}
function _c(e) {
	return typeof CSS < "u" && CSS.escape ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
//#endregion
//#region src/runtime/nodes/RuntimeTable.tsx
function vc({ node: e }) {
	let t = `${e.thinBorderWidth}px solid ${e.borderColor}`, n = `${e.thickBorderWidth}px solid ${e.borderColor}`, r = e.borderTemplate === "none" ? "none" : e.borderTemplate === "thin-all" ? t : n, i = e.borderTemplate === "none" ? "none" : e.borderTemplate === "thick-all" ? n : t;
	return /* @__PURE__ */ (0, L.jsx)("table", {
		className: "amp-runtime-table",
		style: {
			border: r,
			borderSpacing: e.cellGap,
			borderCollapse: e.cellGap ? "separate" : "collapse",
			background: e.backgroundColor,
			color: e.textColor
		},
		children: /* @__PURE__ */ (0, L.jsx)("tbody", { children: e.rows.map((t, n) => /* @__PURE__ */ (0, L.jsx)("tr", {
			style: e.striped && n % 2 == 1 ? { background: "color-mix(in srgb, currentColor 5%, transparent)" } : void 0,
			children: t.map((t, r) => {
				let a = e.headerRow && n === 0 || e.headerColumn && r === 0;
				return /* @__PURE__ */ (0, L.jsx)(a ? "th" : "td", {
					style: {
						border: i,
						padding: e.cellPadding,
						textAlign: e.textAlign,
						background: a ? e.headerBackgroundColor : void 0
					},
					children: /* @__PURE__ */ (0, L.jsx)(uc, { content: t })
				}, r);
			})
		}, n)) })
	});
}
//#endregion
//#region src/runtime/nodes/RuntimeVideo.tsx
function yc({ node: e }) {
	let t = Do(e.src), n = Do(e.poster), r = (0, I.useRef)(null), [i, a] = (0, I.useState)(!1), [o, s] = (0, I.useState)(!1), [c, l] = (0, I.useState)(0), [u, d] = (0, I.useState)(!1), f = e.lightbox ?? {
		enabled: !1,
		hoverLabel: "Open Fullscreen"
	};
	if ((0, I.useEffect)(() => {
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
	let p = () => {
		f.enabled && (l(r.current?.currentTime ?? 0), r.current?.pause(), s(!0));
	}, m = (e, t) => {
		s(!1), r.current && (r.current.currentTime = e, t && !r.current.ended && r.current.play().catch(() => void 0));
	}, h = () => {
		r.current && (d(!1), r.current.currentTime = 0, r.current.play().catch(() => void 0));
	};
	return /* @__PURE__ */ (0, L.jsxs)(L.Fragment, { children: [/* @__PURE__ */ (0, L.jsxs)("div", {
		className: "amp-runtime-video",
		onMouseEnter: () => a(!0),
		onMouseLeave: () => a(!1),
		onClick: p,
		style: { cursor: f.enabled ? "zoom-in" : void 0 },
		children: [
			/* @__PURE__ */ (0, L.jsx)("video", {
				ref: r,
				src: t,
				poster: n,
				controls: !f.enabled && e.controls,
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
			u && n && /* @__PURE__ */ (0, L.jsx)("button", {
				type: "button",
				className: "amp-runtime-video-poster",
				"aria-label": "Replay video",
				onClick: (e) => {
					e.stopPropagation(), h();
				},
				children: /* @__PURE__ */ (0, L.jsx)("img", {
					src: n,
					alt: ""
				})
			}),
			f.enabled && /* @__PURE__ */ (0, L.jsx)("div", {
				className: `amp-runtime-video-label ${i ? "visible" : ""}`,
				children: f.hoverLabel
			})
		]
	}), o && (0, Fs.createPortal)(/* @__PURE__ */ (0, L.jsx)(bc, {
		node: e,
		src: t,
		poster: n,
		initialTime: c,
		onClose: m
	}), document.body)] });
}
function bc({ node: e, src: t, poster: n, initialTime: r, onClose: i }) {
	let a = (0, I.useRef)(null), [o, s] = (0, I.useState)(!0), c = (0, I.useCallback)(() => {
		let e = a.current;
		i(e?.currentTime ?? r, !!(e && !e.paused && !e.ended));
	}, [r, i]);
	return Ls(c), /* @__PURE__ */ (0, L.jsxs)("div", {
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
		children: [/* @__PURE__ */ (0, L.jsx)("video", {
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
		}), /* @__PURE__ */ (0, L.jsx)(Is, {
			label: "Close video",
			onClose: c
		})]
	});
}
//#endregion
//#region src/runtime/RuntimeNode.tsx
var xc = (0, I.memo)(function({ node: e, layerIndex: t }) {
	let n = Ds(e.layout, e.style);
	return n.zIndex = 1e5 + (e.layout.zIndex ?? -t), (e.type === "video" || e.type === "model3d") && (n.background = "transparent"), /* @__PURE__ */ (0, L.jsx)("div", {
		className: `amp-runtime-node amp-runtime-node-${e.type}`,
		"data-node-id": e.id,
		style: n,
		children: /* @__PURE__ */ (0, L.jsx)(Sc, { node: e })
	});
});
function Sc({ node: e }) {
	switch (e.type) {
		case "text": return /* @__PURE__ */ (0, L.jsx)(lc, { node: e });
		case "image": return /* @__PURE__ */ (0, L.jsx)(Rs, { node: e });
		case "video": return /* @__PURE__ */ (0, L.jsx)(yc, { node: e });
		case "model3d": return /* @__PURE__ */ (0, L.jsx)(tc, { node: e });
		case "audio": return /* @__PURE__ */ (0, L.jsx)(ks, { node: e });
		case "divider": return /* @__PURE__ */ (0, L.jsx)(js, { node: e });
		case "spacer": return /* @__PURE__ */ (0, L.jsx)("div", {
			className: "amp-runtime-spacer",
			"aria-hidden": !0
		});
		case "table": return /* @__PURE__ */ (0, L.jsx)(vc, { node: e });
		case "container": return /* @__PURE__ */ (0, L.jsx)(L.Fragment, { children: e.children.map((e, t) => /* @__PURE__ */ (0, L.jsx)(xc, {
			node: e,
			layerIndex: t
		}, e.id)) });
	}
}
//#endregion
//#region src/runtime/scrollbar-mode.ts
var Cc = 0, wc = 0;
function Tc(e) {
	Cc += 1, e && (wc += 1), Ec();
	let t = !1;
	return () => {
		t || (t = !0, Cc = Math.max(0, Cc - 1), e && (wc = Math.max(0, wc - 1)), Ec());
	};
}
function Ec() {
	if (typeof document > "u") return;
	let e = document.documentElement;
	e.classList.toggle("amp-runtime-scrollbars-hidden", Cc > 0 && wc === 0), e.classList.toggle("amp-runtime-scrollbars-legacy", wc > 0);
}
//#endregion
//#region src/runtime/RuntimeDocument.tsx
var Dc = (0, I.lazy)(() => import("./RuntimeModel3DStage-ClJr1Pfz.js"));
function Oc({ document: e, className: t, style: n, ariaLabel: r }) {
	let i = (0, I.useRef)(null), a = (0, I.useRef)(null), o = (0, I.useMemo)(() => e.sections.reduce((e, t) => e + (typeof t.height == "number" ? t.height : Ao), 0), [e.sections]), [s, c] = (0, I.useState)({
		scale: 1,
		height: o
	}), l = (0, I.useMemo)(() => Nc(e), [e]), u = e.presentation?.legacyMode.enabled ?? !1;
	return (0, I.useEffect)(() => Tc(u), [u]), (0, I.useEffect)(() => {
		let e = i.current, t = a.current;
		if (!e || !t) return;
		let n = 0, r = () => {
			n = 0;
			let r = (e.clientWidth || 1080) / Ao, i = Math.max(o, t.scrollHeight);
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
	}, [o]), /* @__PURE__ */ (0, L.jsxs)("div", {
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
			/* @__PURE__ */ (0, L.jsx)(Ac, { document: e }),
			/* @__PURE__ */ (0, L.jsx)("div", {
				ref: a,
				className: "amp-runtime-stage",
				style: {
					width: Ao,
					transform: `scale(${s.scale})`
				},
				children: e.sections.map((e) => /* @__PURE__ */ (0, L.jsx)(kc, { section: e }, e.id))
			}),
			l && /* @__PURE__ */ (0, L.jsx)(I.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, L.jsx)(Dc, {})
			}),
			/* @__PURE__ */ (0, L.jsx)(jc, { document: e })
		]
	});
}
function kc({ section: e }) {
	let t = Do(e.background?.image);
	return /* @__PURE__ */ (0, L.jsx)("section", {
		className: "amp-runtime-section",
		"data-section-id": e.id,
		"aria-label": e.name,
		style: {
			minHeight: typeof e.height == "number" ? e.height : Ao,
			backgroundColor: e.background?.color,
			backgroundImage: t ? `url(${JSON.stringify(t)})` : void 0
		},
		children: e.nodes.map((e, t) => /* @__PURE__ */ (0, L.jsx)(xc, {
			node: e,
			layerIndex: t
		}, e.id))
	});
}
function Ac({ document: e }) {
	let { resolveAsset: t } = Oo(), n = (e.fonts ?? []).map((e) => {
		let n = t(e.src);
		return `@font-face{font-family:${JSON.stringify(e.family)};src:url(${JSON.stringify(n)});font-weight:${e.weight ?? "normal"};font-style:${e.style ?? "normal"};font-display:swap}`;
	});
	return n.length ? /* @__PURE__ */ (0, L.jsx)("style", { children: n.join("\n") }) : null;
}
function jc({ document: e }) {
	let t = e.presentation?.legacyMode;
	return !t?.enabled || !t.pixelation.enabled ? null : /* @__PURE__ */ (0, L.jsx)(Mc, { settings: t.pixelation }, e.metadata.id);
}
function Mc({ settings: e }) {
	let t = (0, I.useRef)(null);
	return (0, I.useEffect)(() => {
		let n = t.current;
		if (!n) return;
		let r, i = requestAnimationFrame(() => {
			import("./mosaic-reveal-DNxrgOiC.js").then(({ runMosaicReveal: t }) => {
				r = t(n, e);
			});
		});
		return () => {
			cancelAnimationFrame(i), r?.();
		};
	}, [e]), /* @__PURE__ */ (0, L.jsxs)("div", {
		ref: t,
		className: "amp-compositor",
		"aria-hidden": !0,
		children: [
			/* @__PURE__ */ (0, L.jsx)("div", {
				className: "amp-compositor-backdrop",
				"data-amp-backdrop": !0
			}),
			/* @__PURE__ */ (0, L.jsx)("canvas", { className: "amp-compositor-mosaic" }),
			/* @__PURE__ */ (0, L.jsx)("div", {
				className: "amp-compositor-scanlines",
				"data-amp-scanlines": !0
			}),
			/* @__PURE__ */ (0, L.jsx)("div", {
				className: "amp-compositor-vignette",
				"data-amp-vignette": !0
			})
		]
	});
}
function Nc(e) {
	let t = !1, n = (e) => e.forEach((e) => {
		e.type === "model3d" ? t = !0 : e.type === "container" && n(e.children);
	});
	return e.sections.forEach((e) => n(e.nodes)), t;
}
//#endregion
//#region src/runtime/AMPReader.tsx
function Pc({ document: e, src: t, assetBaseUrl: n, resolveAsset: r, className: i, style: a, loadingFallback: o, errorFallback: s, onLoad: c, onError: l, ariaLabel: u }) {
	let [d, f] = (0, I.useState)({}), p = e === void 0 && t === void 0 ? /* @__PURE__ */ Error("AMPReader requires either a document or src.") : void 0;
	(0, I.useEffect)(() => {
		if (e === void 0 && t === void 0) return;
		let n = new AbortController();
		return Cs(e ?? t, { signal: n.signal }).then((e) => {
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
	let m = (0, I.useMemo)(() => r || Ts(n ?? d.loaded?.inferredAssetBaseUrl ?? globalThis.location?.href ?? "/"), [
		n,
		r,
		d.loaded?.inferredAssetBaseUrl
	]), h = p ?? d.error;
	if (h) return /* @__PURE__ */ (0, L.jsx)("div", {
		className: `amp-runtime-error ${i ?? ""}`,
		style: a,
		role: "alert",
		children: s?.(h) ?? /* @__PURE__ */ (0, L.jsxs)(L.Fragment, { children: [/* @__PURE__ */ (0, L.jsx)("strong", { children: "Unable to open AMP document" }), /* @__PURE__ */ (0, L.jsx)("span", { children: h.message })] })
	});
	if (!d.loaded) return /* @__PURE__ */ (0, L.jsx)(L.Fragment, { children: o ?? /* @__PURE__ */ (0, L.jsx)("div", {
		className: `amp-runtime-loading ${i ?? ""}`,
		style: a,
		children: "Loading AMP document…"
	}) });
	let g = d.loaded.document.presentation ?? To();
	return /* @__PURE__ */ (0, L.jsx)(Eo.Provider, {
		value: {
			resolveAsset: m,
			legacyMode: g.legacyMode
		},
		children: /* @__PURE__ */ (0, L.jsx)(Oc, {
			document: d.loaded.document,
			className: i,
			style: a,
			ariaLabel: u
		})
	});
}
//#endregion
//#region node_modules/react-dom/cjs/react-dom-client.production.js
var Fc = /* @__PURE__ */ e(((e) => {
	var t = i(), n = r(), a = Ps();
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
	var m = Object.assign, h = Symbol.for("react.element"), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), ee = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), ne = Symbol.for("react.suspense"), re = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), ae = Symbol.for("react.lazy"), oe = Symbol.for("react.activity"), S = Symbol.for("react.memo_cache_sentinel"), se = Symbol.iterator;
	function ce(e) {
		return typeof e != "object" || !e ? null : (e = se && e[se] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var C = Symbol.for("react.client.reference");
	function le(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === C ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case v: return "Fragment";
			case b: return "Profiler";
			case y: return "StrictMode";
			case ne: return "Suspense";
			case re: return "SuspenseList";
			case oe: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case _: return "Portal";
			case ee: return e.displayName || "Context";
			case x: return (e._context.displayName || "Context") + ".Consumer";
			case te:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case ie: return t = e.displayName || null, t === null ? le(e.type) || "Memo" : t;
			case ae:
				t = e._payload, e = e._init;
				try {
					return le(e(t));
				} catch {}
		}
		return null;
	}
	var ue = Array.isArray, w = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, T = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, de = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, fe = [], pe = -1;
	function me(e) {
		return { current: e };
	}
	function he(e) {
		0 > pe || (e.current = fe[pe], fe[pe] = null, pe--);
	}
	function ge(e, t) {
		pe++, fe[pe] = e.current, e.current = t;
	}
	var _e = me(null), ve = me(null), ye = me(null), be = me(null);
	function xe(e, t) {
		switch (ge(ye, t), ge(ve, e), ge(_e, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? ef(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = ef(t), e = tf(t, e);
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
		he(_e), ge(_e, e);
	}
	function Se() {
		he(_e), he(ve), he(ye);
	}
	function Ce(e) {
		e.memoizedState !== null && ge(be, e);
		var t = _e.current, n = tf(t, e.type);
		t !== n && (ge(ve, e), ge(_e, n));
	}
	function E(e) {
		ve.current === e && (he(_e), he(ve)), be.current === e && (he(be), lp._currentValue = de);
	}
	var we, Te;
	function Ee(e) {
		if (we === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			we = t && t[1] || "", Te = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + we + e + Te;
	}
	var De = !1;
	function Oe(e, t) {
		if (!e || De) return "";
		De = !0;
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
			De = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Ee(n) : "";
	}
	function ke(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Ee(e.type);
			case 16: return Ee("Lazy");
			case 13: return e.child !== t && t !== null ? Ee("Suspense Fallback") : Ee("Suspense");
			case 19: return Ee("SuspenseList");
			case 0:
			case 15: return Oe(e.type, !1);
			case 11: return Oe(e.type.render, !1);
			case 1: return Oe(e.type, !0);
			case 31: return Ee("Activity");
			default: return "";
		}
	}
	function Ae(e) {
		try {
			var t = "", n = null;
			do
				t += ke(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var je = Object.prototype.hasOwnProperty, Me = t.unstable_scheduleCallback, Ne = t.unstable_cancelCallback, Pe = t.unstable_shouldYield, Fe = t.unstable_requestPaint, Ie = t.unstable_now, Le = t.unstable_getCurrentPriorityLevel, Re = t.unstable_ImmediatePriority, ze = t.unstable_UserBlockingPriority, Be = t.unstable_NormalPriority, Ve = t.unstable_LowPriority, He = t.unstable_IdlePriority, Ue = t.log, We = t.unstable_setDisableYieldValue, Ge = null, Ke = null;
	function qe(e) {
		if (typeof Ue == "function" && We(e), Ke && typeof Ke.setStrictMode == "function") try {
			Ke.setStrictMode(Ge, e);
		} catch {}
	}
	var Je = Math.clz32 ? Math.clz32 : Ze, Ye = Math.log, Xe = Math.LN2;
	function Ze(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ye(e) / Xe | 0) | 0;
	}
	var Qe = 256, $e = 262144, et = 4194304;
	function tt(e) {
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
	function nt(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = tt(n))) : i = tt(o) : i = tt(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = tt(n))) : i = tt(o)) : i = tt(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function rt(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function it(e, t) {
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
	function at() {
		var e = et;
		return et <<= 1, !(et & 62914560) && (et = 4194304), e;
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
			var u = 31 - Je(n), d = 1 << u;
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
		var r = 31 - Je(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function ut(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Je(n), i = 1 << r;
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
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Tp(e.type)) : e;
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
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = wf(e); e !== null;) {
					if (n = e[_t]) return n;
					e = wf(e);
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
		return je.call(Lt, e) ? !0 : je.call(It, e) ? !1 : Ft.test(e) ? Lt[e] = !0 : (It[e] = !0, !1);
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
				if (ue(r)) {
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
			if (_n = !1, (mn !== null || hn !== null) && (ju(), mn && (t = mn, e = hn, hn = mn = null, gn(t), e))) for (t = 0; t < e.length; t++) gn(e[t]);
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
		mn ? hn ? hn.push(r) : hn = [r] : mn = r, t = Rd(t, "onChange"), 0 < t.length && (n = new Mn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var _r = null, vr = null;
	function yr(e) {
		jd(e, 0);
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
			if (!je.call(t, i) || !Nr(e[i], t[i])) return !1;
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
		}), Ur && Pr(Ur, r) || (Ur = r, r = Rd(Hr, "onSelect"), 0 < r.length && (t = new Mn("onSelect", "select", null, t, n), e.push({
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
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Je(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function gi(e) {
		if (50 < Su) throw Su = 0, Cu = null, Error(o(185));
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
		else if (typeof e == "string") s = ep(e, n, _e.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case oe: return e = yi(31, n, t, i), e.elementType = oe, e.lanes = a, e;
			case v: return wi(n.children, i, a, t);
			case y:
				s = 8, i |= 24;
				break;
			case b: return e = yi(12, n, t, i | 2), e.elementType = b, e.lanes = a, e;
			case ne: return e = yi(13, n, t, i), e.elementType = ne, e.lanes = a, e;
			case re: return e = yi(19, n, t, i), e.elementType = re, e.lanes = a, e;
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
				stack: Ae(t)
			}, Oi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Ae(t)
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
		var i = 32 - Je(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Je(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Li = 1 << 32 - Je(t) + i | n << i | r, Ri = a + e;
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
	var Wi = null, Gi = null, D = !1, Ki = null, qi = !1, Ji = Error(o(519));
	function Yi(e) {
		throw ta(ki(Error(o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Ji;
	}
	function Xi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[_t] = e, t[vt] = r, n) {
			case "dialog":
				B("cancel", t), B("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				B("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < kd.length; n++) B(kd[n], t);
				break;
			case "source":
				B("error", t);
				break;
			case "img":
			case "image":
			case "link":
				B("error", t), B("load", t);
				break;
			case "details":
				B("toggle", t);
				break;
			case "input":
				B("invalid", t), Zt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				B("invalid", t);
				break;
			case "textarea": B("invalid", t), tn(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Wd(t.textContent, n) ? (r.popover != null && (B("beforetoggle", t), B("toggle", t)), r.onScroll != null && B("scroll", t), r.onScrollEnd != null && B("scrollend", t), r.onClick != null && (t.onclick = dn), t = !0) : t = !1, t || Yi(e, !0);
	}
	function Zi(e) {
		for (Wi = e.return; Wi;) switch (Wi.tag) {
			case 5:
			case 31:
			case 13:
				qi = !1;
				return;
			case 27:
			case 3:
				qi = !0;
				return;
			default: Wi = Wi.return;
		}
	}
	function Qi(e) {
		if (e !== Wi) return !1;
		if (!D) return Zi(e), D = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || nf(e.type, e.memoizedProps)), n = !n), n && Gi && Yi(e), Zi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(o(317));
			Gi = Cf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(o(317));
			Gi = Cf(e);
		} else t === 27 ? (t = Gi, df(e.type) ? (e = Sf, Sf = null, Gi = e) : Gi = t) : Gi = Wi ? xf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function $i() {
		Gi = Wi = null, D = !1;
	}
	function ea() {
		var e = Ki;
		return e !== null && (cu === null ? cu = e : cu.push.apply(cu, e), Ki = null), e;
	}
	function ta(e) {
		Ki === null ? Ki = [e] : Ki.push(e);
	}
	var na = me(null), ra = null, ia = null;
	function aa(e, t, n) {
		ge(na, t._currentValue), t._currentValue = n;
	}
	function O(e) {
		e._currentValue = na.current, he(na);
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
	function k(e, t, n, r) {
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
			} else if (i === be.current) {
				if (s = i.alternate, s === null) throw Error(o(387));
				s.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [lp] : e.push(lp));
			}
			i = i.return;
		}
		e !== null && sa(t, e, n, r), t.flags |= 262144;
	}
	function ca(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Nr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function la(e) {
		ra = e, ia = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function ua(e) {
		return fa(ra, e);
	}
	function da(e, t) {
		return ra === null && la(e), fa(e, t);
	}
	function fa(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, ia === null) {
			if (e === null) throw Error(o(308));
			ia = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else ia = ia.next = t;
		return n;
	}
	var pa = typeof AbortController < "u" ? AbortController : function() {
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
	}, ma = t.unstable_scheduleCallback, ha = t.unstable_NormalPriority, ga = {
		$$typeof: ee,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function _a() {
		return {
			controller: new pa(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function va(e) {
		e.refCount--, e.refCount === 0 && ma(ha, function() {
			e.controller.abort();
		});
	}
	var ya = null, A = 0, j = 0, ba = null;
	function xa(e, t) {
		if (ya === null) {
			var n = ya = [];
			A = 0, j = Cd(), ba = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return A++, t.then(Sa, Sa), t;
	}
	function Sa() {
		if (--A === 0 && ya !== null) {
			ba !== null && (ba.status = "fulfilled");
			var e = ya;
			ya = null, j = 0, ba = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function Ca(e, t) {
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
	var wa = w.S;
	w.S = function(e, t) {
		du = Ie(), typeof t == "object" && t && typeof t.then == "function" && xa(e, t), wa !== null && wa(e, t);
	};
	var Ta = me(null);
	function Ea() {
		var e = Ta.current;
		return e === null ? Jl.pooledCache : e;
	}
	function M(e, t) {
		t === null ? ge(Ta, Ta.current) : ge(Ta, t.pool);
	}
	function Da() {
		var e = Ea();
		return e === null ? null : {
			parent: ga._currentValue,
			pool: e
		};
	}
	var Oa = Error(o(460)), ka = Error(o(474)), N = Error(o(542)), Aa = { then: function() {} };
	function ja(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ma(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(dn, dn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Ia(e), e;
			default:
				if (typeof t.status == "string") t.then(dn, dn);
				else {
					if (e = Jl, e !== null && 100 < e.shellSuspendCounter) throw Error(o(482));
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
					case "rejected": throw e = t.reason, Ia(e), e;
				}
				throw Pa = t, Oa;
		}
	}
	function Na(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Pa = e, Oa) : e;
		}
	}
	var Pa = null;
	function Fa() {
		if (Pa === null) throw Error(o(459));
		var e = Pa;
		return Pa = null, e;
	}
	function Ia(e) {
		if (e === Oa || e === N) throw Error(o(483));
	}
	var La = null, Ra = 0;
	function P(e) {
		var t = Ra;
		return Ra += 1, La === null && (La = []), Ma(La, e, t);
	}
	function za(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Ba(e, t) {
		throw t.$$typeof === h ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(o(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Va(e) {
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
			return a === v ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === a || typeof a == "object" && a && a.$$typeof === ae && Na(a) === t.type) ? (t = i(t, n.props), za(t, n), t.return = e, t) : (t = Ci(n.type, n.key, n.props, null, e.mode, r), za(t, n), t.return = e, t);
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
					case g: return n = Ci(t.type, t.key, t.props, null, e.mode, n), za(n, t), n.return = e, n;
					case _: return t = Di(t, e.mode, n), t.return = e, t;
					case ae: return t = Na(t), f(e, t, n);
				}
				if (ue(t) || ce(t)) return t = wi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, P(t), n);
				if (t.$$typeof === ee) return f(e, da(e, t), n);
				Ba(e, t);
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
					case ae: return n = Na(n), p(e, t, n, r);
				}
				if (ue(n) || ce(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, P(n), r);
				if (n.$$typeof === ee) return p(e, t, da(e, n), r);
				Ba(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case g: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case _: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case ae: return r = Na(r), m(e, t, n, r, i);
				}
				if (ue(r) || ce(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, P(r), i);
				if (r.$$typeof === ee) return m(e, t, n, da(t, r), i);
				Ba(t, r);
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
			if (h === s.length) return n(i, d), D && zi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (o = a(d, o, h), u === null ? l = d : u.sibling = d, u = d);
				return D && zi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), o = a(g, o, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), D && zi(i, h), l;
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
			if (v.done) return n(i, h), D && zi(i, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(i, v.value, l), v !== null && (s = a(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return D && zi(i, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, i, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = a(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(i, e);
			}), D && zi(i, g), u;
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
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === ae && Na(l) === r.type) {
										n(e, r.sibling), c = i(r, a.props), za(c, a), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							a.type === v ? (c = wi(a.props.children, e.mode, c, a.key), c.return = e, e = c) : (c = Ci(a.type, a.key, a.props, null, e.mode, c), za(c, a), c.return = e, e = c);
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
					case ae: return a = Na(a), b(e, r, a, c);
				}
				if (ue(a)) return h(e, r, a, c);
				if (ce(a)) {
					if (l = ce(a), typeof l != "function") throw Error(o(150));
					return a = l.call(a), y(e, r, a, c);
				}
				if (typeof a.then == "function") return b(e, r, P(a), c);
				if (a.$$typeof === ee) return b(e, r, da(e, a), c);
				Ba(e, a);
			}
			return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (a = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), c = i(r, a), c.return = e, e = c) : (n(e, r), c = Ti(a, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Ra = 0;
				var i = b(e, t, n, r);
				return La = null, i;
			} catch (t) {
				if (t === Oa || t === N) throw t;
				var a = yi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Ha = Va(!0), Ua = Va(!1), Wa = !1;
	function Ga(e) {
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
	function Ka(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function qa(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Ja(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, ql & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = gi(e), hi(e, null, n), t;
		}
		return fi(e, r, t, n), gi(e);
	}
	function Ya(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ut(e, n);
		}
	}
	function Xa(e, t) {
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
	var Za = !1;
	function Qa() {
		if (Za) {
			var e = ba;
			if (e !== null) throw e;
		}
	}
	function $a(e, t, n, r) {
		Za = !1;
		var i = e.updateQueue;
		Wa = !1;
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
				if (p ? (Yl & f) === f : (r & f) === f) {
					f !== 0 && f === j && (Za = !0), u !== null && (u = u.next = {
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
							case 2: Wa = !0;
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
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), ru |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function eo(e, t) {
		if (typeof e != "function") throw Error(o(191, e));
		e.call(t);
	}
	function to(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) eo(n[e], t);
	}
	var no = me(null), ro = me(0);
	function io(e, t) {
		e = tu, ge(ro, e), ge(no, t), tu = e | t.baseLanes;
	}
	function ao() {
		ge(ro, tu), ge(no, no.current);
	}
	function oo() {
		tu = ro.current, he(no), he(ro);
	}
	var so = me(null), co = null;
	function lo(e) {
		var t = e.alternate;
		ge(ho, ho.current & 1), ge(so, e), co === null && (t === null || no.current !== null || t.memoizedState !== null) && (co = e);
	}
	function uo(e) {
		ge(ho, ho.current), ge(so, e), co === null && (co = e);
	}
	function fo(e) {
		e.tag === 22 ? (ge(ho, ho.current), ge(so, e), co === null && (co = e)) : po(e);
	}
	function po() {
		ge(ho, ho.current), ge(so, so.current);
	}
	function mo(e) {
		he(so), co === e && (co = null), he(ho);
	}
	var ho = me(0);
	function go(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || vf(n) || yf(n))) return t;
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
	var _o = 0, F = null, vo = null, yo = null, bo = !1, xo = !1, I = !1, So = 0, Co = 0, wo = null, To = 0;
	function Eo() {
		throw Error(o(321));
	}
	function Do(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Nr(e[n], t[n])) return !1;
		return !0;
	}
	function Oo(e, t, n, r, i, a) {
		return _o = a, F = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, w.H = e === null || e.memoizedState === null ? Gs : Ks, I = !1, a = n(r, i), I = !1, xo && (a = Ao(t, n, r, i)), ko(e), a;
	}
	function ko(e) {
		w.H = Ws;
		var t = vo !== null && vo.next !== null;
		if (_o = 0, yo = vo = F = null, bo = !1, Co = 0, wo = null, t) throw Error(o(300));
		e === null || lc || (e = e.dependencies, e !== null && ca(e) && (lc = !0));
	}
	function Ao(e, t, n, r) {
		F = e;
		var i = 0;
		do {
			if (xo && (wo = null), Co = 0, xo = !1, 25 <= i) throw Error(o(301));
			if (i += 1, yo = vo = null, e.updateQueue != null) {
				var a = e.updateQueue;
				a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0);
			}
			w.H = qs, a = t(n, r);
		} while (xo);
		return a;
	}
	function jo() {
		var e = w.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Ro(t) : t, e = e.useState()[0], (vo === null ? null : vo.memoizedState) !== e && (F.flags |= 1024), t;
	}
	function Mo() {
		var e = So !== 0;
		return So = 0, e;
	}
	function No(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Po(e) {
		if (bo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			bo = !1;
		}
		_o = 0, yo = vo = F = null, xo = !1, Co = So = 0, wo = null;
	}
	function Fo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return yo === null ? F.memoizedState = yo = e : yo = yo.next = e, yo;
	}
	function Io() {
		if (vo === null) {
			var e = F.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = vo.next;
		var t = yo === null ? F.memoizedState : yo.next;
		if (t !== null) yo = t, vo = e;
		else {
			if (e === null) throw F.alternate === null ? Error(o(467)) : Error(o(310));
			vo = e, e = {
				memoizedState: vo.memoizedState,
				baseState: vo.baseState,
				baseQueue: vo.baseQueue,
				queue: vo.queue,
				next: null
			}, yo === null ? F.memoizedState = yo = e : yo = yo.next = e;
		}
		return yo;
	}
	function Lo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Ro(e) {
		var t = Co;
		return Co += 1, wo === null && (wo = []), e = Ma(wo, e, t), t = F, (yo === null ? t.memoizedState : yo.next) === null && (t = t.alternate, w.H = t === null || t.memoizedState === null ? Gs : Ks), e;
	}
	function zo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Ro(e);
			if (e.$$typeof === ee) return ua(e);
		}
		throw Error(o(438, String(e)));
	}
	function Bo(e) {
		var t = null, n = F.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = F.alternate;
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
		}, n === null && (n = Lo(), F.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = S;
		return t.index++, n;
	}
	function Vo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Ho(e) {
		return Uo(Io(), vo, e);
	}
	function Uo(e, t, n) {
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
				if (f === u.lane ? (_o & f) === f : (Yl & f) === f) {
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
					else if ((_o & p) === p) {
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
					}, l === null ? (c = l = f, s = a) : l = l.next = f, F.lanes |= p, ru |= p;
					f = u.action, I && n(a, f), a = u.hasEagerState ? u.eagerState : n(a, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = a) : l = l.next = p, F.lanes |= f, ru |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = a : l.next = c, !Nr(a, e.memoizedState) && (lc = !0, d && (n = ba, n !== null))) throw n;
			e.memoizedState = a, e.baseState = s, e.baseQueue = l, r.lastRenderedState = a;
		}
		return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Wo(e) {
		var t = Io(), n = t.queue;
		if (n === null) throw Error(o(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, i = n.pending, a = t.memoizedState;
		if (i !== null) {
			n.pending = null;
			var s = i = i.next;
			do
				a = e(a, s.action), s = s.next;
			while (s !== i);
			Nr(a, t.memoizedState) || (lc = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), n.lastRenderedState = a;
		}
		return [a, r];
	}
	function Go(e, t, n) {
		var r = F, i = Io(), a = D;
		if (a) {
			if (n === void 0) throw Error(o(407));
			n = n();
		} else n = t();
		var s = !Nr((vo || i).memoizedState, n);
		if (s && (i.memoizedState = n, lc = !0), i = i.queue, gs(Jo.bind(null, r, i, e), [e]), i.getSnapshot !== t || s || yo !== null && yo.memoizedState.tag & 1) {
			if (r.flags |= 2048, ds(9, { destroy: void 0 }, qo.bind(null, r, i, n, t), null), Jl === null) throw Error(o(349));
			a || _o & 127 || Ko(r, t, n);
		}
		return n;
	}
	function Ko(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = F.updateQueue, t === null ? (t = Lo(), F.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function qo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Yo(t) && Xo(e);
	}
	function Jo(e, t, n) {
		return n(function() {
			Yo(t) && Xo(e);
		});
	}
	function Yo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Nr(e, n);
		} catch {
			return !0;
		}
	}
	function Xo(e) {
		var t = mi(e, 2);
		t !== null && Eu(t, e, 2);
	}
	function Zo(e) {
		var t = Fo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), I) {
				qe(!0);
				try {
					n();
				} finally {
					qe(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Vo,
			lastRenderedState: e
		}, t;
	}
	function Qo(e, t, n, r) {
		return e.baseState = n, Uo(e, vo, typeof r == "function" ? r : Vo);
	}
	function $o(e, t, n, r, i) {
		if (Vs(e)) throw Error(o(485));
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
			w.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, es(t, a)) : (a.next = n.next, t.pending = n.next = a);
		}
	}
	function es(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = w.T, o = {};
			w.T = o;
			try {
				var s = n(i, r), c = w.S;
				c !== null && c(o, s), ts(e, t, s);
			} catch (n) {
				rs(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), w.T = a;
			}
		} else try {
			a = n(i, r), ts(e, t, a);
		} catch (n) {
			rs(e, t, n);
		}
	}
	function ts(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			ns(e, t, n);
		}, function(n) {
			return rs(e, t, n);
		}) : ns(e, t, n);
	}
	function ns(e, t, n) {
		t.status = "fulfilled", t.value = n, is(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, es(e, n)));
	}
	function rs(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, is(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function is(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function as(e, t) {
		return t;
	}
	function os(e, t) {
		if (D) {
			var n = Jl.formState;
			if (n !== null) {
				a: {
					var r = F;
					if (D) {
						if (Gi) {
							b: {
								for (var i = Gi, a = qi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = xf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Gi = xf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Yi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Fo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: as,
			lastRenderedState: t
		}, n.queue = r, n = Rs.bind(null, F, r), r.dispatch = n, r = Zo(!1), a = Bs.bind(null, F, !1, r.queue), r = Fo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = $o.bind(null, F, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function ss(e) {
		return cs(Io(), vo, e);
	}
	function cs(e, t, n) {
		if (t = Uo(e, t, as)[0], e = Ho(Vo)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Ro(t);
		} catch (e) {
			throw e === Oa ? N : e;
		}
		else r = t;
		t = Io();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (F.flags |= 2048, ds(9, { destroy: void 0 }, ls.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function ls(e, t) {
		e.action = t;
	}
	function us(e) {
		var t = Io(), n = vo;
		if (n !== null) return cs(t, n, e);
		Io(), t = t.memoizedState, n = Io();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function ds(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = F.updateQueue, t === null && (t = Lo(), F.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function fs() {
		return Io().memoizedState;
	}
	function ps(e, t, n, r) {
		var i = Fo();
		F.flags |= e, i.memoizedState = ds(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function ms(e, t, n, r) {
		var i = Io();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		vo !== null && r !== null && Do(r, vo.memoizedState.deps) ? i.memoizedState = ds(t, a, n, r) : (F.flags |= e, i.memoizedState = ds(1 | t, a, n, r));
	}
	function hs(e, t) {
		ps(8390656, 8, e, t);
	}
	function gs(e, t) {
		ms(2048, 8, e, t);
	}
	function _s(e) {
		F.flags |= 4;
		var t = F.updateQueue;
		if (t === null) t = Lo(), F.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function vs(e) {
		var t = Io().memoizedState;
		return _s({
			ref: t,
			nextImpl: e
		}), function() {
			if (ql & 2) throw Error(o(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ys(e, t) {
		return ms(4, 2, e, t);
	}
	function bs(e, t) {
		return ms(4, 4, e, t);
	}
	function xs(e, t) {
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
	function Ss(e, t, n) {
		n = n == null ? null : n.concat([e]), ms(4, 4, xs.bind(null, t, e), n);
	}
	function Cs() {}
	function ws(e, t) {
		var n = Io();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Do(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Ts(e, t) {
		var n = Io();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Do(t, r[1])) return r[0];
		if (r = e(), I) {
			qe(!0);
			try {
				e();
			} finally {
				qe(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Es(e, t, n) {
		return n === void 0 || _o & 1073741824 && !(Yl & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Tu(), F.lanes |= e, ru |= e, n);
	}
	function Ds(e, t, n, r) {
		return Nr(n, t) ? n : no.current === null ? !(_o & 42) || _o & 1073741824 && !(Yl & 261930) ? (lc = !0, e.memoizedState = n) : (e = Tu(), F.lanes |= e, ru |= e, t) : (e = Es(e, n, r), Nr(e, t) || (lc = !0), e);
	}
	function Os(e, t, n, r, i) {
		var a = T.p;
		T.p = a !== 0 && 8 > a ? a : 8;
		var o = w.T, s = {};
		w.T = s, Bs(e, !1, t, n);
		try {
			var c = i(), l = w.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? zs(e, t, Ca(c, r), wu(e)) : zs(e, t, r, wu(e));
		} catch (n) {
			zs(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, wu());
		} finally {
			T.p = a, o !== null && s.types !== null && (o.types = s.types), w.T = o;
		}
	}
	function L() {}
	function ks(e, t, n, r) {
		if (e.tag !== 5) throw Error(o(476));
		var i = As(e).queue;
		Os(e, i, t, de, n === null ? L : function() {
			return js(e), n(r);
		});
	}
	function As(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: de,
			baseState: de,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Vo,
				lastRenderedState: de
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
				lastRenderedReducer: Vo,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function js(e) {
		var t = As(e);
		t.next === null && (t = e.alternate.memoizedState), zs(e, t.next.queue, {}, wu());
	}
	function Ms() {
		return ua(lp);
	}
	function Ns() {
		return Io().memoizedState;
	}
	function Fs() {
		return Io().memoizedState;
	}
	function Is(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = wu();
					e = qa(n);
					var r = Ja(t, e, n);
					r !== null && (Eu(r, t, n), Ya(r, t, n)), t = { cache: _a() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Ls(e, t, n) {
		var r = wu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Vs(e) ? Hs(t, n) : (n = pi(e, t, n, r), n !== null && (Eu(n, e, r), Us(n, t, r)));
	}
	function Rs(e, t, n) {
		zs(e, t, n, wu());
	}
	function zs(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Vs(e)) Hs(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Nr(s, o)) return fi(e, t, i, 0), Jl === null && di(), !1;
			} catch {}
			if (n = pi(e, t, i, r), n !== null) return Eu(n, e, r), Us(n, t, r), !0;
		}
		return !1;
	}
	function Bs(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Cd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Vs(e)) {
			if (t) throw Error(o(479));
		} else t = pi(e, n, r, 2), t !== null && Eu(t, e, 2);
	}
	function Vs(e) {
		var t = e.alternate;
		return e === F || t !== null && t === F;
	}
	function Hs(e, t) {
		xo = bo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Us(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ut(e, n);
		}
	}
	var Ws = {
		readContext: ua,
		use: zo,
		useCallback: Eo,
		useContext: Eo,
		useEffect: Eo,
		useImperativeHandle: Eo,
		useLayoutEffect: Eo,
		useInsertionEffect: Eo,
		useMemo: Eo,
		useReducer: Eo,
		useRef: Eo,
		useState: Eo,
		useDebugValue: Eo,
		useDeferredValue: Eo,
		useTransition: Eo,
		useSyncExternalStore: Eo,
		useId: Eo,
		useHostTransitionStatus: Eo,
		useFormState: Eo,
		useActionState: Eo,
		useOptimistic: Eo,
		useMemoCache: Eo,
		useCacheRefresh: Eo
	};
	Ws.useEffectEvent = Eo;
	var Gs = {
		readContext: ua,
		use: zo,
		useCallback: function(e, t) {
			return Fo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: ua,
		useEffect: hs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), ps(4194308, 4, xs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return ps(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			ps(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Fo();
			t = t === void 0 ? null : t;
			var r = e();
			if (I) {
				qe(!0);
				try {
					e();
				} finally {
					qe(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Fo();
			if (n !== void 0) {
				var i = n(t);
				if (I) {
					qe(!0);
					try {
						n(t);
					} finally {
						qe(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Ls.bind(null, F, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Fo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Zo(e);
			var t = e.queue, n = Rs.bind(null, F, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Cs,
		useDeferredValue: function(e, t) {
			return Es(Fo(), e, t);
		},
		useTransition: function() {
			var e = Zo(!1);
			return e = Os.bind(null, F, e.queue, !0, !1), Fo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = F, i = Fo();
			if (D) {
				if (n === void 0) throw Error(o(407));
				n = n();
			} else {
				if (n = t(), Jl === null) throw Error(o(349));
				Yl & 127 || Ko(r, t, n);
			}
			i.memoizedState = n;
			var a = {
				value: n,
				getSnapshot: t
			};
			return i.queue = a, hs(Jo.bind(null, r, a, e), [e]), r.flags |= 2048, ds(9, { destroy: void 0 }, qo.bind(null, r, a, n, t), null), n;
		},
		useId: function() {
			var e = Fo(), t = Jl.identifierPrefix;
			if (D) {
				var n = Ri, r = Li;
				n = (r & ~(1 << 32 - Je(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = So++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = To++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ms,
		useFormState: os,
		useActionState: os,
		useOptimistic: function(e) {
			var t = Fo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Bs.bind(null, F, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Bo,
		useCacheRefresh: function() {
			return Fo().memoizedState = Is.bind(null, F);
		},
		useEffectEvent: function(e) {
			var t = Fo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (ql & 2) throw Error(o(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Ks = {
		readContext: ua,
		use: zo,
		useCallback: ws,
		useContext: ua,
		useEffect: gs,
		useImperativeHandle: Ss,
		useInsertionEffect: ys,
		useLayoutEffect: bs,
		useMemo: Ts,
		useReducer: Ho,
		useRef: fs,
		useState: function() {
			return Ho(Vo);
		},
		useDebugValue: Cs,
		useDeferredValue: function(e, t) {
			return Ds(Io(), vo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ho(Vo)[0], t = Io().memoizedState;
			return [typeof e == "boolean" ? e : Ro(e), t];
		},
		useSyncExternalStore: Go,
		useId: Ns,
		useHostTransitionStatus: Ms,
		useFormState: ss,
		useActionState: ss,
		useOptimistic: function(e, t) {
			return Qo(Io(), vo, e, t);
		},
		useMemoCache: Bo,
		useCacheRefresh: Fs
	};
	Ks.useEffectEvent = vs;
	var qs = {
		readContext: ua,
		use: zo,
		useCallback: ws,
		useContext: ua,
		useEffect: gs,
		useImperativeHandle: Ss,
		useInsertionEffect: ys,
		useLayoutEffect: bs,
		useMemo: Ts,
		useReducer: Wo,
		useRef: fs,
		useState: function() {
			return Wo(Vo);
		},
		useDebugValue: Cs,
		useDeferredValue: function(e, t) {
			var n = Io();
			return vo === null ? Es(n, e, t) : Ds(n, vo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Wo(Vo)[0], t = Io().memoizedState;
			return [typeof e == "boolean" ? e : Ro(e), t];
		},
		useSyncExternalStore: Go,
		useId: Ns,
		useHostTransitionStatus: Ms,
		useFormState: us,
		useActionState: us,
		useOptimistic: function(e, t) {
			var n = Io();
			return vo === null ? (n.baseState = e, [e, n.queue.dispatch]) : Qo(n, vo, e, t);
		},
		useMemoCache: Bo,
		useCacheRefresh: Fs
	};
	qs.useEffectEvent = vs;
	function Js(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : m({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Ys = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = wu(), i = qa(r);
			i.payload = t, n != null && (i.callback = n), t = Ja(e, i, r), t !== null && (Eu(t, e, r), Ya(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = wu(), i = qa(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ja(e, i, r), t !== null && (Eu(t, e, r), Ya(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = wu(), r = qa(n);
			r.tag = 2, t != null && (r.callback = t), t = Ja(e, r, n), t !== null && (Eu(t, e, n), Ya(t, e, n));
		}
	};
	function Xs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Pr(n, r) || !Pr(i, a) : !0;
	}
	function Zs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ys.enqueueReplaceState(t, t.state, null);
	}
	function Qs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = m({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function $s(e) {
		si(e);
	}
	function ec(e) {
		console.error(e);
	}
	function tc(e) {
		si(e);
	}
	function nc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function rc(e, t, n) {
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
	function ic(e, t, n) {
		return n = qa(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			nc(e, t);
		}, n;
	}
	function ac(e) {
		return e = qa(e), e.tag = 3, e;
	}
	function oc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				rc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			rc(t, n, r), typeof i != "function" && (mu === null ? mu = /* @__PURE__ */ new Set([this]) : mu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function sc(e, t, n, r, i) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && k(t, n, i, !0), n = so.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return co === null ? Ru() : n.alternate === null && nu === 0 && (nu = 3), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Aa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), rd(e, r, i)), !1;
					case 22: return n.flags |= 65536, r === Aa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), rd(e, r, i)), !1;
				}
				throw Error(o(435, n.tag));
			}
			return rd(e, r, i), Ru(), !1;
		}
		if (D) return t = so.current, t === null ? (r !== Ji && (t = Error(o(423), { cause: r }), ta(ki(t, n))), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = ki(r, n), i = ic(e.stateNode, r, i), Xa(e, i), nu !== 4 && (nu = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== Ji && (e = Error(o(422), { cause: r }), ta(ki(e, n)))), !1;
		var a = Error(o(520), { cause: r });
		if (a = ki(a, n), z === null ? z = [a] : z.push(a), nu !== 4 && (nu = 2), t === null) return !0;
		r = ki(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = ic(n.stateNode, r, e), Xa(n, e), !1;
				case 1: if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (mu === null || !mu.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = ac(i), oc(i, e, n, r), Xa(n, i), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var cc = Error(o(461)), lc = !1;
	function uc(e, t, n, r) {
		t.child = e === null ? Ua(t, null, n, r) : Ha(t, e.child, n, r);
	}
	function dc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return la(t), r = Oo(e, t, n, o, a, i), s = Mo(), e !== null && !lc ? (No(e, t, i), Fc(e, t, i)) : (D && s && Vi(t), t.flags |= 1, uc(e, t, r, i), t.child);
	}
	function fc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !bi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, pc(e, t, a, r, i)) : (e = Ci(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Ic(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Pr : n, n(o, r) && e.ref === t.ref) return Fc(e, t, i);
		}
		return t.flags |= 1, e = xi(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function pc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Pr(a, r) && e.ref === t.ref) if (lc = !1, t.pendingProps = r = a, Ic(e, i)) e.flags & 131072 && (lc = !0);
			else return t.lanes = e.lanes, Fc(e, t, i);
		}
		return xc(e, t, n, r, i);
	}
	function mc(e, t, n, r) {
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
				return gc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && M(t, a === null ? null : a.cachePool), a === null ? ao() : io(t, a), fo(t);
			else return r = t.lanes = 536870912, gc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && M(t, null), ao(), po(t)) : (M(t, a.cachePool), io(t, a), po(t), t.memoizedState = null);
		return uc(e, t, i, n), t.child;
	}
	function hc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function gc(e, t, n, r, i) {
		var a = Ea();
		return a = a === null ? null : {
			parent: ga._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && M(t, null), ao(), fo(t), e !== null && k(e, t, r, !0), t.childLanes = i, null;
	}
	function _c(e, t) {
		return t = Ac({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function vc(e, t, n) {
		return Ha(t, e.child, null, n), e = _c(t, t.pendingProps), e.flags |= 2, mo(t), t.memoizedState = null, e;
	}
	function yc(e, t, n) {
		var r = t.pendingProps, i = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (D) {
				if (r.mode === "hidden") return e = _c(t, r), t.lanes = 536870912, hc(null, e);
				if (uo(t), (e = Gi) ? (e = _f(e, qi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ii === null ? null : {
						id: Li,
						overflow: Ri
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ei(e), n.return = t, t.child = n, Wi = t, Gi = null)) : e = null, e === null) throw Yi(t);
				return t.lanes = 536870912, null;
			}
			return _c(t, r);
		}
		var a = e.memoizedState;
		if (a !== null) {
			var s = a.dehydrated;
			if (uo(t), i) if (t.flags & 256) t.flags &= -257, t = vc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(o(558));
			else if (lc || k(e, t, n, !1), i = (n & e.childLanes) !== 0, lc || i) {
				if (r = Jl, r !== null && (s = dt(r, n), s !== 0 && s !== a.retryLane)) throw a.retryLane = s, mi(e, s), Eu(r, e, s), cc;
				Ru(), t = vc(e, t, n);
			} else e = a.treeContext, Gi = xf(s.nextSibling), Wi = t, D = !0, Ki = null, qi = !1, e !== null && Ui(t, e), t = _c(t, r), t.flags |= 4096;
			return t;
		}
		return e = xi(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function bc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(o(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function xc(e, t, n, r, i) {
		return la(t), n = Oo(e, t, n, r, void 0, i), r = Mo(), e !== null && !lc ? (No(e, t, i), Fc(e, t, i)) : (D && r && Vi(t), t.flags |= 1, uc(e, t, n, i), t.child);
	}
	function Sc(e, t, n, r, i, a) {
		return la(t), t.updateQueue = null, n = Ao(t, r, n, i), ko(e), r = Mo(), e !== null && !lc ? (No(e, t, a), Fc(e, t, a)) : (D && r && Vi(t), t.flags |= 1, uc(e, t, n, a), t.child);
	}
	function Cc(e, t, n, r, i) {
		if (la(t), t.stateNode === null) {
			var a = _i, o = n.contextType;
			typeof o == "object" && o && (a = ua(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Ys, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ga(t), o = n.contextType, a.context = typeof o == "object" && o ? ua(o) : _i, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Js(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Ys.enqueueReplaceState(a, a.state, null), $a(t, r, a, i), Qa(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Qs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = _i, typeof u == "object" && u && (o = ua(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Zs(t, a, r, o), Wa = !1;
			var f = t.memoizedState;
			a.state = f, $a(t, r, a, i), Qa(), l = t.memoizedState, s || f !== l || Wa ? (typeof d == "function" && (Js(t, n, d, r), l = t.memoizedState), (c = Wa || Xs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ka(e, t), o = t.memoizedProps, u = Qs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = _i, typeof l == "object" && l && (c = ua(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Zs(t, a, r, c), Wa = !1, f = t.memoizedState, a.state = f, $a(t, r, a, i), Qa();
			var p = t.memoizedState;
			o !== d || f !== p || Wa || e !== null && e.dependencies !== null && ca(e.dependencies) ? (typeof s == "function" && (Js(t, n, s, r), p = t.memoizedState), (u = Wa || Xs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && ca(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, bc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ha(t, e.child, null, i), t.child = Ha(t, null, n, i)) : uc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Fc(e, t, i), e;
	}
	function wc(e, t, n, r) {
		return $i(), t.flags |= 256, uc(e, t, n, r), t.child;
	}
	var Tc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Ec(e) {
		return {
			baseLanes: e,
			cachePool: Da()
		};
	}
	function Dc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= ou), e;
	}
	function Oc(e, t, n) {
		var r = t.pendingProps, i = !1, a = (t.flags & 128) != 0, s;
		if ((s = a) || (s = e !== null && e.memoizedState === null ? !1 : (ho.current & 2) != 0), s && (i = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (D) {
				if (i ? lo(t) : po(t), (e = Gi) ? (e = _f(e, qi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ii === null ? null : {
						id: Li,
						overflow: Ri
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ei(e), n.return = t, t.child = n, Wi = t, Gi = null)) : e = null, e === null) throw Yi(t);
				return yf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, i ? (po(t), i = t.mode, c = Ac({
				mode: "hidden",
				children: c
			}, i), r = wi(r, i, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = Ec(n), r.childLanes = Dc(e, s, n), t.memoizedState = Tc, hc(null, r)) : (lo(t), kc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (a) t.flags & 256 ? (lo(t), t.flags &= -257, t = jc(e, t, n)) : t.memoizedState === null ? (po(t), c = r.fallback, i = t.mode, r = Ac({
				mode: "visible",
				children: r.children
			}, i), c = wi(c, i, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ha(t, e.child, null, n), r = t.child, r.memoizedState = Ec(n), r.childLanes = Dc(e, s, n), t.memoizedState = Tc, t = hc(null, r)) : (po(t), t.child = e.child, t.flags |= 128, t = null);
			else if (lo(t), yf(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(o(419)), r.stack = "", r.digest = s, ta({
					value: r,
					source: null,
					stack: null
				}), t = jc(e, t, n);
			} else if (lc || k(e, t, n, !1), s = (n & e.childLanes) !== 0, lc || s) {
				if (s = Jl, s !== null && (r = dt(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, mi(e, r), Eu(s, e, r), cc;
				vf(c) || Ru(), t = jc(e, t, n);
			} else vf(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Gi = xf(c.nextSibling), Wi = t, D = !0, Ki = null, qi = !1, e !== null && Ui(t, e), t = kc(t, r.children), t.flags |= 4096);
			return t;
		}
		return i ? (po(t), c = r.fallback, i = t.mode, l = e.child, u = l.sibling, r = xi(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = wi(c, i, n, null), c.flags |= 2) : c = xi(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, hc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = Ec(n) : (i = c.cachePool, i === null ? i = Da() : (l = ga._currentValue, i = i.parent === l ? i : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: i
		}), r.memoizedState = c, r.childLanes = Dc(e, s, n), t.memoizedState = Tc, hc(e.child, r)) : (lo(t), n = e.child, e = n.sibling, n = xi(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function kc(e, t) {
		return t = Ac({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Ac(e, t) {
		return e = yi(22, e, null, t), e.lanes = 0, e;
	}
	function jc(e, t, n) {
		return Ha(t, e.child, null, n), e = kc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Mc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), oa(e.return, t, n);
	}
	function Nc(e, t, n, r, i, a) {
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
	function Pc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = ho.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, ge(ho, o), uc(e, t, r, n), r = D ? Ni : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Mc(e, n, t);
			else if (e.tag === 19) Mc(e, n, t);
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
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && go(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Nc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && go(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Nc(t, !0, n, null, a, r);
				break;
			case "together":
				Nc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Fc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), ru |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (k(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(o(153));
		if (t.child !== null) {
			for (e = t.child, n = xi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = xi(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Ic(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && ca(e))) : !0;
	}
	function Lc(e, t, n) {
		switch (t.tag) {
			case 3:
				xe(t, t.stateNode.containerInfo), aa(t, ga, e.memoizedState.cache), $i();
				break;
			case 27:
			case 5:
				Ce(t);
				break;
			case 4:
				xe(t, t.stateNode.containerInfo);
				break;
			case 10:
				aa(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, uo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (lo(t), e = Fc(e, t, n), e === null ? null : e.sibling) : Oc(e, t, n) : (lo(t), t.flags |= 128, null);
				lo(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (k(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Pc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), ge(ho, ho.current), r) break;
				return null;
			case 22: return t.lanes = 0, mc(e, t, n, t.pendingProps);
			case 24: aa(t, ga, e.memoizedState.cache);
		}
		return Fc(e, t, n);
	}
	function Rc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) lc = !0;
		else {
			if (!Ic(e, n) && !(t.flags & 128)) return lc = !1, Lc(e, t, n);
			lc = !!(e.flags & 131072);
		}
		else lc = !1, D && t.flags & 1048576 && Bi(t, Ni, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Na(t.elementType), t.type = e, typeof e == "function") bi(e) ? (r = Qs(e, r), t.tag = 1, t = Cc(null, t, e, r, n)) : (t.tag = 0, t = xc(null, t, e, r, n));
					else {
						if (e != null) {
							var i = e.$$typeof;
							if (i === te) {
								t.tag = 11, t = dc(null, t, e, r, n);
								break a;
							} else if (i === ie) {
								t.tag = 14, t = fc(null, t, e, r, n);
								break a;
							}
						}
						throw t = le(e) || e, Error(o(306, t, ""));
					}
				}
				return t;
			case 0: return xc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, i = Qs(r, t.pendingProps), Cc(e, t, r, i, n);
			case 3:
				a: {
					if (xe(t, t.stateNode.containerInfo), e === null) throw Error(o(387));
					r = t.pendingProps;
					var a = t.memoizedState;
					i = a.element, Ka(e, t), $a(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, aa(t, ga, r), r !== a.cache && sa(t, [ga], n, !0), Qa(), r = s.element, a.isDehydrated) if (a = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
						t = wc(e, t, r, n);
						break a;
					} else if (r !== i) {
						i = ki(Error(o(424)), t), ta(i), t = wc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Gi = xf(e.firstChild), Wi = t, D = !0, Ki = null, qi = !0, n = Ua(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if ($i(), r === i) {
							t = Fc(e, t, n);
							break a;
						}
						uc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return bc(e, t), e === null ? (n = Vf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : D || (n = t.type, e = t.pendingProps, r = $d(ye.current).createElement(n), r[_t] = t, r[vt] = e, qd(r, n, e), At(r), t.stateNode = r) : t.memoizedState = Vf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return Ce(t), e === null && D && (r = t.stateNode = Tf(t.type, t.pendingProps, ye.current), Wi = t, qi = !0, i = Gi, df(t.type) ? (Sf = i, Gi = xf(r.firstChild)) : Gi = i), uc(e, t, t.pendingProps.children, n), bc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && D && ((i = r = Gi) && (r = hf(r, t.type, t.pendingProps, qi), r === null ? i = !1 : (t.stateNode = r, Wi = t, Gi = xf(r.firstChild), qi = !1, i = !0)), i || Yi(t)), Ce(t), i = t.type, a = t.pendingProps, s = e === null ? null : e.memoizedProps, r = a.children, nf(i, a) ? r = null : s !== null && nf(i, s) && (t.flags |= 32), t.memoizedState !== null && (i = Oo(e, t, jo, null, null, n), lp._currentValue = i), bc(e, t), uc(e, t, r, n), t.child;
			case 6: return e === null && D && ((e = n = Gi) && (n = gf(n, t.pendingProps, qi), n === null ? e = !1 : (t.stateNode = n, Wi = t, Gi = null, e = !0)), e || Yi(t)), null;
			case 13: return Oc(e, t, n);
			case 4: return xe(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ha(t, null, r, n) : uc(e, t, r, n), t.child;
			case 11: return dc(e, t, t.type, t.pendingProps, n);
			case 7: return uc(e, t, t.pendingProps, n), t.child;
			case 8: return uc(e, t, t.pendingProps.children, n), t.child;
			case 12: return uc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, aa(t, t.type, r.value), uc(e, t, r.children, n), t.child;
			case 9: return i = t.type._context, r = t.pendingProps.children, la(t), i = ua(i), r = r(i), t.flags |= 1, uc(e, t, r, n), t.child;
			case 14: return fc(e, t, t.type, t.pendingProps, n);
			case 15: return pc(e, t, t.type, t.pendingProps, n);
			case 19: return Pc(e, t, n);
			case 31: return yc(e, t, n);
			case 22: return mc(e, t, n, t.pendingProps);
			case 24: return la(t), r = ua(ga), e === null ? (i = Ea(), i === null && (i = Jl, a = _a(), i.pooledCache = a, a.refCount++, a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
				parent: r,
				cache: i
			}, Ga(t), aa(t, ga, i)) : ((e.lanes & n) !== 0 && (Ka(e, t), $a(t, null, null, n), Qa()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, aa(t, ga, r), r !== i.cache && sa(t, [ga], n, !0)) : (i = {
				parent: r,
				cache: r
			}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), aa(t, ga, r))), uc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(o(156, t.tag));
	}
	function zc(e) {
		e.flags |= 4;
	}
	function Bc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Fu()) e.flags |= 8192;
			else throw Pa = Aa, ka;
		} else e.flags &= -16777217;
	}
	function Vc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !tp(t)) if (Fu()) e.flags |= 8192;
		else throw Pa = Aa, ka;
	}
	function Hc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : at(), e.lanes |= t, su |= t);
	}
	function Uc(e, t) {
		if (!D) switch (e.tailMode) {
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
	function Wc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Gc(e, t, n) {
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
			case 14: return Wc(t), null;
			case 1: return Wc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), O(ga), Se(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Qi(t) ? zc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ea())), Wc(t), null;
			case 26:
				var i = t.type, a = t.memoizedState;
				return e === null ? (zc(t), a === null ? (Wc(t), Bc(t, i, null, r, n)) : (Wc(t), Vc(t, a))) : a ? a === e.memoizedState ? (Wc(t), t.flags &= -16777217) : (zc(t), Wc(t), Vc(t, a)) : (e = e.memoizedProps, e !== r && zc(t), Wc(t), Bc(t, i, e, r, n)), null;
			case 27:
				if (E(t), n = ye.current, i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && zc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(o(166));
						return Wc(t), null;
					}
					e = _e.current, Qi(t) ? Xi(t, e) : (e = Tf(i, r, n), t.stateNode = e, zc(t));
				}
				return Wc(t), null;
			case 5:
				if (E(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && zc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(o(166));
						return Wc(t), null;
					}
					if (a = _e.current, Qi(t)) Xi(t, a);
					else {
						var s = $d(ye.current);
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
						a: switch (qd(a, i, r), i) {
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
						r && zc(t);
					}
				}
				return Wc(t), Bc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && zc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(o(166));
					if (e = ye.current, Qi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, i = Wi, i !== null) switch (i.tag) {
							case 27:
							case 5: r = i.memoizedProps;
						}
						e[_t] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Wd(e.nodeValue, n)), e || Yi(t, !0);
					} else e = $d(e).createTextNode(r), e[_t] = t, t.stateNode = e;
				}
				return Wc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Qi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(o(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(o(557));
							e[_t] = t;
						} else $i(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Wc(t), e = !1;
					} else n = ea(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (mo(t), t) : (mo(t), null);
					if (t.flags & 128) throw Error(o(558));
				}
				return Wc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (i = Qi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!i) throw Error(o(318));
							if (i = t.memoizedState, i = i === null ? null : i.dehydrated, !i) throw Error(o(317));
							i[_t] = t;
						} else $i(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Wc(t), i = !1;
					} else i = ea(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
					if (!i) return t.flags & 256 ? (mo(t), t) : (mo(t), null);
				}
				return mo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Hc(t, t.updateQueue), Wc(t), null);
			case 4: return Se(), e === null && Pd(t.stateNode.containerInfo), Wc(t), null;
			case 10: return O(t.type), Wc(t), null;
			case 19:
				if (he(ho), r = t.memoizedState, r === null) return Wc(t), null;
				if (i = (t.flags & 128) != 0, a = r.rendering, a === null) if (i) Uc(r, !1);
				else {
					if (nu !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (a = go(e), a !== null) {
							for (t.flags |= 128, Uc(r, !1), e = a.updateQueue, t.updateQueue = e, Hc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Si(n, e), n = n.sibling;
							return ge(ho, ho.current & 1 | 2), D && zi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && Ie() > fu && (t.flags |= 128, i = !0, Uc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!i) if (e = go(a), e !== null) {
						if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Hc(t, e), Uc(r, !0), r.tail === null && r.tailMode === "hidden" && !a.alternate && !D) return Wc(t), null;
					} else 2 * Ie() - r.renderingStartTime > fu && n !== 536870912 && (t.flags |= 128, i = !0, Uc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (a.sibling = t.child, t.child = a) : (e = r.last, e === null ? t.child = a : e.sibling = a, r.last = a);
				}
				return r.tail === null ? (Wc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Ie(), e.sibling = null, n = ho.current, ge(ho, i ? n & 1 | 2 : n & 1), D && zi(t, r.treeForkCount), e);
			case 22:
			case 23: return mo(t), oo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Wc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Wc(t), n = t.updateQueue, n !== null && Hc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && he(Ta), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), O(ga), Wc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(o(156, t.tag));
	}
	function Kc(e, t) {
		switch (Hi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return O(ga), Se(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return E(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (mo(t), t.alternate === null) throw Error(o(340));
					$i();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (mo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(o(340));
					$i();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return he(ho), null;
			case 4: return Se(), null;
			case 10: return O(t.type), null;
			case 22:
			case 23: return mo(t), oo(), e !== null && he(Ta), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return O(ga), null;
			case 25: return null;
			default: return null;
		}
	}
	function qc(e, t) {
		switch (Hi(t), t.tag) {
			case 3:
				O(ga), Se();
				break;
			case 26:
			case 27:
			case 5:
				E(t);
				break;
			case 4:
				Se();
				break;
			case 31:
				t.memoizedState !== null && mo(t);
				break;
			case 13:
				mo(t);
				break;
			case 19:
				he(ho);
				break;
			case 10:
				O(t.type);
				break;
			case 22:
			case 23:
				mo(t), oo(), e !== null && he(Ta);
				break;
			case 24: O(ga);
		}
	}
	function Jc(e, t) {
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
			nd(t, t.return, e);
		}
	}
	function Yc(e, t, n) {
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
								nd(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			nd(t, t.return, e);
		}
	}
	function Xc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				to(t, n);
			} catch (t) {
				nd(e, e.return, t);
			}
		}
	}
	function Zc(e, t, n) {
		n.props = Qs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			nd(e, t, n);
		}
	}
	function Qc(e, t) {
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
			nd(e, t, n);
		}
	}
	function $c(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			nd(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			nd(e, t, n);
		}
		else n.current = null;
	}
	function el(e) {
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
			nd(e, e.return, t);
		}
	}
	function tl(e, t, n) {
		try {
			var r = e.stateNode;
			Jd(r, e.type, n, t), r[vt] = t;
		} catch (t) {
			nd(e, e.return, t);
		}
	}
	function nl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && df(e.type) || e.tag === 4;
	}
	function rl(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || nl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && df(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function il(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = dn));
		else if (r !== 4 && (r === 27 && df(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (il(e, t, n), e = e.sibling; e !== null;) il(e, t, n), e = e.sibling;
	}
	function al(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && df(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (al(e, t, n), e = e.sibling; e !== null;) al(e, t, n), e = e.sibling;
	}
	function ol(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			qd(t, r, n), t[_t] = e, t[vt] = n;
		} catch (t) {
			nd(e, e.return, t);
		}
	}
	var sl = !1, cl = !1, ll = !1, ul = typeof WeakSet == "function" ? WeakSet : Set, dl = null;
	function fl(e, t) {
		if (e = e.containerInfo, Zd = vp, e = Rr(e), zr(e)) {
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
		for (Qd = {
			focusedElem: e,
			selectionRange: n
		}, vp = !1, dl = t; dl !== null;) if (t = dl, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, dl = e;
		else for (; dl !== null;) {
			switch (t = dl, a = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) i = e[n], i.ref.impl = i.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && a !== null) {
						e = void 0, n = t, i = a.memoizedProps, a = a.memoizedState, r = n.stateNode;
						try {
							var h = Qs(n.type, i);
							e = r.getSnapshotBeforeUpdate(h, a), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							nd(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) mf(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								mf(e);
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
				e.return = t.return, dl = e;
				break;
			}
			dl = t.return;
		}
	}
	function pl(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				Ol(e, n), r & 4 && Jc(5, n);
				break;
			case 1:
				if (Ol(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					nd(n, n.return, e);
				}
				else {
					var i = Qs(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						nd(n, n.return, e);
					}
				}
				r & 64 && Xc(n), r & 512 && Qc(n, n.return);
				break;
			case 3:
				if (Ol(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						to(e, t);
					} catch (e) {
						nd(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && ol(n);
			case 26:
			case 5:
				Ol(e, n), t === null && r & 4 && el(n), r & 512 && Qc(n, n.return);
				break;
			case 12:
				Ol(e, n);
				break;
			case 31:
				Ol(e, n), r & 4 && yl(e, n);
				break;
			case 13:
				Ol(e, n), r & 4 && bl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = od.bind(null, n), bf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || sl, !r) {
					t = t !== null && t.memoizedState !== null || cl, i = sl;
					var a = cl;
					sl = r, (cl = t) && !a ? Al(e, n, (n.subtreeFlags & 8772) != 0) : Ol(e, n), sl = i, cl = a;
				}
				break;
			case 30: break;
			default: Ol(e, n);
		}
	}
	function ml(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, ml(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Tt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var hl = null, gl = !1;
	function _l(e, t, n) {
		for (n = n.child; n !== null;) vl(e, t, n), n = n.sibling;
	}
	function vl(e, t, n) {
		if (Ke && typeof Ke.onCommitFiberUnmount == "function") try {
			Ke.onCommitFiberUnmount(Ge, n);
		} catch {}
		switch (n.tag) {
			case 26:
				cl || $c(n, t), _l(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				cl || $c(n, t);
				var r = hl, i = gl;
				df(n.type) && (hl = n.stateNode, gl = !1), _l(e, t, n), Ef(n.stateNode), hl = r, gl = i;
				break;
			case 5: cl || $c(n, t);
			case 6:
				if (r = hl, i = gl, hl = null, _l(e, t, n), hl = r, gl = i, hl !== null) if (gl) try {
					(hl.nodeType === 9 ? hl.body : hl.nodeName === "HTML" ? hl.ownerDocument.body : hl).removeChild(n.stateNode);
				} catch (e) {
					nd(n, t, e);
				}
				else try {
					hl.removeChild(n.stateNode);
				} catch (e) {
					nd(n, t, e);
				}
				break;
			case 18:
				hl !== null && (gl ? (e = hl, ff(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Wp(e)) : ff(hl, n.stateNode));
				break;
			case 4:
				r = hl, i = gl, hl = n.stateNode.containerInfo, gl = !0, _l(e, t, n), hl = r, gl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Yc(2, n, t), cl || Yc(4, n, t), _l(e, t, n);
				break;
			case 1:
				cl || ($c(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Zc(n, t, r)), _l(e, t, n);
				break;
			case 21:
				_l(e, t, n);
				break;
			case 22:
				cl = (r = cl) || n.memoizedState !== null, _l(e, t, n), cl = r;
				break;
			default: _l(e, t, n);
		}
	}
	function yl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Wp(e);
			} catch (e) {
				nd(t, t.return, e);
			}
		}
	}
	function bl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Wp(e);
		} catch (e) {
			nd(t, t.return, e);
		}
	}
	function xl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new ul()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new ul()), t;
			default: throw Error(o(435, e.tag));
		}
	}
	function Sl(e, t) {
		var n = xl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = sd.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function Cl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r], a = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (df(c.type)) {
							hl = c.stateNode, gl = !1;
							break a;
						}
						break;
					case 5:
						hl = c.stateNode, gl = !1;
						break a;
					case 3:
					case 4:
						hl = c.stateNode.containerInfo, gl = !0;
						break a;
				}
				c = c.return;
			}
			if (hl === null) throw Error(o(160));
			vl(a, s, i), hl = null, gl = !1, a = i.alternate, a !== null && (a.return = null), i.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Tl(t, e), t = t.sibling;
	}
	var wl = null;
	function Tl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				Cl(t, e), El(e), r & 4 && (Yc(3, e, e.return), Jc(3, e), Yc(5, e, e.return));
				break;
			case 1:
				Cl(t, e), El(e), r & 512 && (cl || n === null || $c(n, n.return)), r & 64 && sl && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var i = wl;
				if (Cl(t, e), El(e), r & 512 && (cl || n === null || $c(n, n.return)), r & 4) {
					var a = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, i = i.ownerDocument || i;
							b: switch (r) {
								case "title":
									a = i.getElementsByTagName("title")[0], (!a || a[wt] || a[_t] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = i.createElement(r), i.head.insertBefore(a, i.querySelector("head > title"))), qd(a, r, n), a[_t] = e, At(a), r = a;
									break a;
								case "link":
									var s = Qf("link", "href", i).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (a = s[c], a.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && a.getAttribute("rel") === (n.rel == null ? null : n.rel) && a.getAttribute("title") === (n.title == null ? null : n.title) && a.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									a = i.createElement(r), qd(a, r, n), i.head.appendChild(a);
									break;
								case "meta":
									if (s = Qf("meta", "content", i).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (a = s[c], a.getAttribute("content") === (n.content == null ? null : "" + n.content) && a.getAttribute("name") === (n.name == null ? null : n.name) && a.getAttribute("property") === (n.property == null ? null : n.property) && a.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && a.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									a = i.createElement(r), qd(a, r, n), i.head.appendChild(a);
									break;
								default: throw Error(o(468, r));
							}
							a[_t] = e, At(a), r = a;
						}
						e.stateNode = r;
					} else $f(i, e.type, e.stateNode);
					else e.stateNode = qf(i, r, e.memoizedProps);
					else a === r ? r === null && e.stateNode !== null && tl(e, e.memoizedProps, n.memoizedProps) : (a === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : a.count--, r === null ? $f(i, e.type, e.stateNode) : qf(i, r, e.memoizedProps));
				}
				break;
			case 27:
				Cl(t, e), El(e), r & 512 && (cl || n === null || $c(n, n.return)), n !== null && r & 4 && tl(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (Cl(t, e), El(e), r & 512 && (cl || n === null || $c(n, n.return)), e.flags & 32) {
					i = e.stateNode;
					try {
						nn(i, "");
					} catch (t) {
						nd(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (i = e.memoizedProps, tl(e, i, n === null ? i : n.memoizedProps)), r & 1024 && (ll = !0);
				break;
			case 6:
				if (Cl(t, e), El(e), r & 4) {
					if (e.stateNode === null) throw Error(o(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						nd(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Zf = null, i = wl, wl = V(t.containerInfo), Cl(t, e), wl = i, El(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Wp(t.containerInfo);
				} catch (t) {
					nd(e, e.return, t);
				}
				ll && (ll = !1, Dl(e));
				break;
			case 4:
				r = wl, wl = V(e.stateNode.containerInfo), Cl(t, e), El(e), wl = r;
				break;
			case 12:
				Cl(t, e), El(e);
				break;
			case 31:
				Cl(t, e), El(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Sl(e, r)));
				break;
			case 13:
				Cl(t, e), El(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (uu = Ie()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Sl(e, r)));
				break;
			case 22:
				i = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = sl, d = cl;
				if (sl = u || i, cl = d || l, Cl(t, e), cl = d, sl = u, El(e), r & 8192) a: for (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, i && (n === null || l || sl || cl || kl(e)), n = null, t = e;;) {
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
								nd(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = i ? "" : l.memoizedProps;
							} catch (e) {
								nd(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								i ? pf(m, !0) : pf(l.stateNode, !1);
							} catch (e) {
								nd(l, l.return, e);
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
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, Sl(e, n))));
				break;
			case 19:
				Cl(t, e), El(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Sl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: Cl(t, e), El(e);
		}
	}
	function El(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (nl(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(o(160));
				switch (n.tag) {
					case 27:
						var i = n.stateNode;
						al(e, rl(e), i);
						break;
					case 5:
						var a = n.stateNode;
						n.flags & 32 && (nn(a, ""), n.flags &= -33), al(e, rl(e), a);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						il(e, rl(e), s);
						break;
					default: throw Error(o(161));
				}
			} catch (t) {
				nd(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Dl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Dl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function Ol(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) pl(e, t.alternate, t), t = t.sibling;
	}
	function kl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Yc(4, t, t.return), kl(t);
					break;
				case 1:
					$c(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Zc(t, t.return, n), kl(t);
					break;
				case 27: Ef(t.stateNode);
				case 26:
				case 5:
					$c(t, t.return), kl(t);
					break;
				case 22:
					t.memoizedState === null && kl(t);
					break;
				case 30:
					kl(t);
					break;
				default: kl(t);
			}
			e = e.sibling;
		}
	}
	function Al(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Al(i, a, n), Jc(4, a);
					break;
				case 1:
					if (Al(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						nd(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) eo(c[i], s);
						} catch (e) {
							nd(r, r.return, e);
						}
					}
					n && o & 64 && Xc(a), Qc(a, a.return);
					break;
				case 27: ol(a);
				case 26:
				case 5:
					Al(i, a, n), n && r === null && o & 4 && el(a), Qc(a, a.return);
					break;
				case 12:
					Al(i, a, n);
					break;
				case 31:
					Al(i, a, n), n && o & 4 && yl(i, a);
					break;
				case 13:
					Al(i, a, n), n && o & 4 && bl(i, a);
					break;
				case 22:
					a.memoizedState === null && Al(i, a, n), Qc(a, a.return);
					break;
				case 30: break;
				default: Al(i, a, n);
			}
			t = t.sibling;
		}
	}
	function jl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && va(n));
	}
	function Ml(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && va(e));
	}
	function Nl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Pl(e, t, n, r), t = t.sibling;
	}
	function Pl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Nl(e, t, n, r), i & 2048 && Jc(9, t);
				break;
			case 1:
				Nl(e, t, n, r);
				break;
			case 3:
				Nl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && va(e)));
				break;
			case 12:
				if (i & 2048) {
					Nl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						nd(t, t.return, e);
					}
				} else Nl(e, t, n, r);
				break;
			case 31:
				Nl(e, t, n, r);
				break;
			case 13:
				Nl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? Nl(e, t, n, r) : (a._visibility |= 2, Fl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? Nl(e, t, n, r) : Il(e, t), i & 2048 && jl(o, t);
				break;
			case 24:
				Nl(e, t, n, r), i & 2048 && Ml(t.alternate, t);
				break;
			default: Nl(e, t, n, r);
		}
	}
	function Fl(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Fl(a, o, s, c, i), Jc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Fl(a, o, s, c, i)) : u._visibility & 2 ? Fl(a, o, s, c, i) : Il(a, o), i && l & 2048 && jl(o.alternate, o);
					break;
				case 24:
					Fl(a, o, s, c, i), i && l & 2048 && Ml(o.alternate, o);
					break;
				default: Fl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Il(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Il(n, r), i & 2048 && jl(r.alternate, r);
					break;
				case 24:
					Il(n, r), i & 2048 && Ml(r.alternate, r);
					break;
				default: Il(n, r);
			}
			t = t.sibling;
		}
	}
	var Ll = 8192;
	function Rl(e, t, n) {
		if (e.subtreeFlags & Ll) for (e = e.child; e !== null;) zl(e, t, n), e = e.sibling;
	}
	function zl(e, t, n) {
		switch (e.tag) {
			case 26:
				Rl(e, t, n), e.flags & Ll && e.memoizedState !== null && np(n, wl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Rl(e, t, n);
				break;
			case 3:
			case 4:
				var r = wl;
				wl = V(e.stateNode.containerInfo), Rl(e, t, n), wl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Ll, Ll = 16777216, Rl(e, t, n), Ll = r) : Rl(e, t, n));
				break;
			default: Rl(e, t, n);
		}
	}
	function Bl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Vl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				dl = r, Wl(r, e);
			}
			Bl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Hl(e), e = e.sibling;
	}
	function Hl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Vl(e), e.flags & 2048 && Yc(9, e, e.return);
				break;
			case 3:
				Vl(e);
				break;
			case 12:
				Vl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Ul(e)) : Vl(e);
				break;
			default: Vl(e);
		}
	}
	function Ul(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				dl = r, Wl(r, e);
			}
			Bl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Yc(8, t, t.return), Ul(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Ul(t));
					break;
				default: Ul(t);
			}
			e = e.sibling;
		}
	}
	function Wl(e, t) {
		for (; dl !== null;) {
			var n = dl;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Yc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: va(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, dl = r;
			else a: for (n = e; dl !== null;) {
				r = dl;
				var i = r.sibling, a = r.return;
				if (ml(r), r === n) {
					dl = null;
					break a;
				}
				if (i !== null) {
					i.return = a, dl = i;
					break a;
				}
				dl = a;
			}
		}
	}
	var Gl = {
		getCacheForType: function(e) {
			var t = ua(ga), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return ua(ga).controller.signal;
		}
	}, Kl = typeof WeakMap == "function" ? WeakMap : Map, ql = 0, Jl = null, R = null, Yl = 0, Xl = 0, Zl = null, Ql = !1, $l = !1, eu = !1, tu = 0, nu = 0, ru = 0, iu = 0, au = 0, ou = 0, su = 0, z = null, cu = null, lu = !1, uu = 0, du = 0, fu = Infinity, pu = null, mu = null, hu = 0, gu = null, _u = null, vu = 0, yu = 0, bu = null, xu = null, Su = 0, Cu = null;
	function wu() {
		return ql & 2 && Yl !== 0 ? Yl & -Yl : w.T === null ? mt() : Cd();
	}
	function Tu() {
		if (ou === 0) if (!(Yl & 536870912) || D) {
			var e = $e;
			$e <<= 1, !($e & 3932160) && ($e = 262144), ou = e;
		} else ou = 536870912;
		return e = so.current, e !== null && (e.flags |= 32), ou;
	}
	function Eu(e, t, n) {
		(e === Jl && (Xl === 2 || Xl === 9) || e.cancelPendingCommit !== null) && (Nu(e, 0), Au(e, Yl, ou, !1)), st(e, n), (!(ql & 2) || e !== Jl) && (e === Jl && (!(ql & 2) && (iu |= n), nu === 4 && Au(e, Yl, ou, !1)), hd(e));
	}
	function Du(e, t, n) {
		if (ql & 6) throw Error(o(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || rt(e, t), i = r ? Vu(e, t) : zu(e, t, !0), a = r;
		do {
			if (i === 0) {
				$l && !r && Au(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, a && !ku(n)) {
					i = zu(e, t, !1), a = !1;
					continue;
				}
				if (i === 2) {
					if (a = t, e.errorRecoveryDisabledLanes & a) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							i = z;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Nu(c, s).flags |= 256), s = zu(c, s, !1), s !== 2) {
								if (eu && !l) {
									c.errorRecoveryDisabledLanes |= a, iu |= a, i = 4;
									break a;
								}
								a = cu, cu = i, a !== null && (cu === null ? cu = a : cu.push.apply(cu, a));
							}
							i = s;
						}
						if (a = !1, i !== 2) continue;
					}
				}
				if (i === 1) {
					Nu(e, 0), Au(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, a = i, a) {
						case 0:
						case 1: throw Error(o(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							Au(r, t, ou, !Ql);
							break a;
						case 2:
							cu = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(o(329));
					}
					if ((t & 62914560) === t && (i = uu + 300 - Ie(), 10 < i)) {
						if (Au(r, t, ou, !Ql), nt(r, 0, !0) !== 0) break a;
						vu = t, r.timeoutHandle = of(Ou.bind(null, r, n, cu, pu, lu, t, ou, iu, su, Ql, a, "Throttled", -0, 0), i);
						break a;
					}
					Ou(r, n, cu, pu, lu, t, ou, iu, su, Ql, a, null, -0, 0);
				}
			}
			break;
		} while (1);
		hd(e);
	}
	function Ou(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
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
			}, zl(t, a, d);
			var m = (a & 62914560) === a ? uu - Ie() : (a & 4194048) === a ? du - Ie() : 0;
			if (m = ip(d, m), m !== null) {
				vu = a, e.cancelPendingCommit = m(Ju.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), Au(e, a, o, !l);
				return;
			}
		}
		Ju(e, t, a, n, r, i, o, s, c);
	}
	function ku(e) {
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
	function Au(e, t, n, r) {
		t &= ~au, t &= ~iu, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Je(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && lt(e, n, t);
	}
	function ju() {
		return ql & 6 ? !0 : (gd(0, !1), !1);
	}
	function Mu() {
		if (R !== null) {
			if (Xl === 0) var e = R.return;
			else e = R, ia = ra = null, Po(e), La = null, Ra = 0, e = R;
			for (; e !== null;) qc(e.alternate, e), e = e.return;
			R = null;
		}
	}
	function Nu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, sf(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), vu = 0, Mu(), Jl = e, R = n = xi(e.current, null), Yl = t, Xl = 0, Zl = null, Ql = !1, $l = rt(e, t), eu = !1, su = ou = au = iu = ru = nu = 0, cu = z = null, lu = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Je(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return tu = t, di(), n;
	}
	function Pu(e, t) {
		F = null, w.H = Ws, t === Oa || t === N ? (t = Fa(), Xl = 3) : t === ka ? (t = Fa(), Xl = 4) : Xl = t === cc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Zl = t, R === null && (nu = 1, nc(e, ki(t, e.current)));
	}
	function Fu() {
		var e = so.current;
		return e === null ? !0 : (Yl & 4194048) === Yl ? co === null : (Yl & 62914560) === Yl || Yl & 536870912 ? e === co : !1;
	}
	function Iu() {
		var e = w.H;
		return w.H = Ws, e === null ? Ws : e;
	}
	function Lu() {
		var e = w.A;
		return w.A = Gl, e;
	}
	function Ru() {
		nu = 4, Ql || (Yl & 4194048) !== Yl && so.current !== null || ($l = !0), !(ru & 134217727) && !(iu & 134217727) || Jl === null || Au(Jl, Yl, ou, !1);
	}
	function zu(e, t, n) {
		var r = ql;
		ql |= 2;
		var i = Iu(), a = Lu();
		(Jl !== e || Yl !== t) && (pu = null, Nu(e, t)), t = !1;
		var o = nu;
		a: do
			try {
				if (Xl !== 0 && R !== null) {
					var s = R, c = Zl;
					switch (Xl) {
						case 8:
							Mu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							so.current === null && (t = !0);
							var l = Xl;
							if (Xl = 0, Zl = null, Gu(e, s, c, l), n && $l) {
								o = 0;
								break a;
							}
							break;
						default: l = Xl, Xl = 0, Zl = null, Gu(e, s, c, l);
					}
				}
				Bu(), o = nu;
				break;
			} catch (t) {
				Pu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, ia = ra = null, ql = r, w.H = i, w.A = a, R === null && (Jl = null, Yl = 0, di()), o;
	}
	function Bu() {
		for (; R !== null;) Uu(R);
	}
	function Vu(e, t) {
		var n = ql;
		ql |= 2;
		var r = Iu(), i = Lu();
		Jl !== e || Yl !== t ? (pu = null, fu = Ie() + 500, Nu(e, t)) : $l = rt(e, t);
		a: do
			try {
				if (Xl !== 0 && R !== null) {
					t = R;
					var a = Zl;
					b: switch (Xl) {
						case 1:
							Xl = 0, Zl = null, Gu(e, t, a, 1);
							break;
						case 2:
						case 9:
							if (ja(a)) {
								Xl = 0, Zl = null, Wu(t);
								break;
							}
							t = function() {
								Xl !== 2 && Xl !== 9 || Jl !== e || (Xl = 7), hd(e);
							}, a.then(t, t);
							break a;
						case 3:
							Xl = 7;
							break a;
						case 4:
							Xl = 5;
							break a;
						case 7:
							ja(a) ? (Xl = 0, Zl = null, Wu(t)) : (Xl = 0, Zl = null, Gu(e, t, a, 7));
							break;
						case 5:
							var s = null;
							switch (R.tag) {
								case 26: s = R.memoizedState;
								case 5:
								case 27:
									var c = R;
									if (s ? tp(s) : c.stateNode.complete) {
										Xl = 0, Zl = null;
										var l = c.sibling;
										if (l !== null) R = l;
										else {
											var u = c.return;
											u === null ? R = null : (R = u, Ku(u));
										}
										break b;
									}
							}
							Xl = 0, Zl = null, Gu(e, t, a, 5);
							break;
						case 6:
							Xl = 0, Zl = null, Gu(e, t, a, 6);
							break;
						case 8:
							Mu(), nu = 6;
							break a;
						default: throw Error(o(462));
					}
				}
				Hu();
				break;
			} catch (t) {
				Pu(e, t);
			}
		while (1);
		return ia = ra = null, w.H = r, w.A = i, ql = n, R === null ? (Jl = null, Yl = 0, di(), nu) : 0;
	}
	function Hu() {
		for (; R !== null && !Pe();) Uu(R);
	}
	function Uu(e) {
		var t = Rc(e.alternate, e, tu);
		e.memoizedProps = e.pendingProps, t === null ? Ku(e) : R = t;
	}
	function Wu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Sc(n, t, t.pendingProps, t.type, void 0, Yl);
				break;
			case 11:
				t = Sc(n, t, t.pendingProps, t.type.render, t.ref, Yl);
				break;
			case 5: Po(t);
			default: qc(n, t), t = R = Si(t, tu), t = Rc(n, t, tu);
		}
		e.memoizedProps = e.pendingProps, t === null ? Ku(e) : R = t;
	}
	function Gu(e, t, n, r) {
		ia = ra = null, Po(t), La = null, Ra = 0;
		var i = t.return;
		try {
			if (sc(e, i, t, n, Yl)) {
				nu = 1, nc(e, ki(n, e.current)), R = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw R = i, t;
			nu = 1, nc(e, ki(n, e.current)), R = null;
			return;
		}
		t.flags & 32768 ? (D || r === 1 ? e = !0 : $l || Yl & 536870912 ? e = !1 : (Ql = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = so.current, r !== null && r.tag === 13 && (r.flags |= 16384))), qu(t, e)) : Ku(t);
	}
	function Ku(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				qu(t, Ql);
				return;
			}
			e = t.return;
			var n = Gc(t.alternate, t, tu);
			if (n !== null) {
				R = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				R = t;
				return;
			}
			R = t = e;
		} while (t !== null);
		nu === 0 && (nu = 5);
	}
	function qu(e, t) {
		do {
			var n = Kc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, R = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				R = e;
				return;
			}
			R = e = n;
		} while (e !== null);
		nu = 6, R = null;
	}
	function Ju(e, t, n, r, i, a, s, c, l) {
		e.cancelPendingCommit = null;
		do
			$u();
		while (hu !== 0);
		if (ql & 6) throw Error(o(327));
		if (t !== null) {
			if (t === e.current) throw Error(o(177));
			if (a = t.lanes | t.childLanes, a |= ui, ct(e, n, a, s, c, l), e === Jl && (R = Jl = null, Yl = 0), _u = t, gu = e, vu = n, yu = a, bu = i, xu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, cd(Be, function() {
				return ed(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = w.T, w.T = null, i = T.p, T.p = 2, s = ql, ql |= 4;
				try {
					fl(e, t, n);
				} finally {
					ql = s, T.p = i, w.T = r;
				}
			}
			hu = 1, Yu(), Xu(), Zu();
		}
	}
	function Yu() {
		if (hu === 1) {
			hu = 0;
			var e = gu, t = _u, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = w.T, w.T = null;
				var r = T.p;
				T.p = 2;
				var i = ql;
				ql |= 4;
				try {
					Tl(t, e);
					var a = Qd, o = Rr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
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
					vp = !!Zd, Qd = Zd = null;
				} finally {
					ql = i, T.p = r, w.T = n;
				}
			}
			e.current = t, hu = 2;
		}
	}
	function Xu() {
		if (hu === 2) {
			hu = 0;
			var e = gu, t = _u, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = w.T, w.T = null;
				var r = T.p;
				T.p = 2;
				var i = ql;
				ql |= 4;
				try {
					pl(e, t.alternate, t);
				} finally {
					ql = i, T.p = r, w.T = n;
				}
			}
			hu = 3;
		}
	}
	function Zu() {
		if (hu === 4 || hu === 3) {
			hu = 0, Fe();
			var e = gu, t = _u, n = vu, r = xu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? hu = 5 : (hu = 0, _u = gu = null, Qu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (mu = null), pt(n), t = t.stateNode, Ke && typeof Ke.onCommitFiberRoot == "function") try {
				Ke.onCommitFiberRoot(Ge, t, void 0, (t.current.flags & 128) == 128);
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
			vu & 3 && $u(), hd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === Cu ? Su++ : (Su = 0, Cu = e) : Su = 0, gd(0, !1);
		}
	}
	function Qu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, va(t)));
	}
	function $u() {
		return Yu(), Xu(), Zu(), ed();
	}
	function ed() {
		if (hu !== 5) return !1;
		var e = gu, t = yu;
		yu = 0;
		var n = pt(vu), r = w.T, i = T.p;
		try {
			T.p = 32 > n ? 32 : n, w.T = null, n = bu, bu = null;
			var a = gu, s = vu;
			if (hu = 0, _u = gu = null, vu = 0, ql & 6) throw Error(o(331));
			var c = ql;
			if (ql |= 4, Hl(a.current), Pl(a, a.current, s, n), ql = c, gd(0, !1), Ke && typeof Ke.onPostCommitFiberRoot == "function") try {
				Ke.onPostCommitFiberRoot(Ge, a);
			} catch {}
			return !0;
		} finally {
			T.p = i, w.T = r, Qu(e, t);
		}
	}
	function td(e, t, n) {
		t = ki(n, t), t = ic(e.stateNode, t, 2), e = Ja(e, t, 2), e !== null && (st(e, 2), hd(e));
	}
	function nd(e, t, n) {
		if (e.tag === 3) td(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				td(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (mu === null || !mu.has(r))) {
					e = ki(n, e), n = ac(2), r = Ja(t, n, 2), r !== null && (oc(n, r, t, e), st(r, 2), hd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function rd(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Kl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (eu = !0, i.add(n), e = id.bind(null, e, t, n), t.then(e, e));
	}
	function id(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Jl === e && (Yl & n) === n && (nu === 4 || nu === 3 && (Yl & 62914560) === Yl && 300 > Ie() - uu ? !(ql & 2) && Nu(e, 0) : au |= n, su === Yl && (su = 0)), hd(e);
	}
	function ad(e, t) {
		t === 0 && (t = at()), e = mi(e, t), e !== null && (st(e, t), hd(e));
	}
	function od(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), ad(e, n);
	}
	function sd(e, t) {
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
		r !== null && r.delete(t), ad(e, n);
	}
	function cd(e, t) {
		return Me(e, t);
	}
	var ld = null, ud = null, dd = !1, fd = !1, pd = !1, md = 0;
	function hd(e) {
		e !== ud && e.next === null && (ud === null ? ld = ud = e : ud = ud.next = e), fd = !0, dd || (dd = !0, Sd());
	}
	function gd(e, t) {
		if (!pd && fd) {
			pd = !0;
			do
				for (var n = !1, r = ld; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Je(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, xd(r, a));
					} else a = Yl, a = nt(r, r === Jl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || rt(r, a) || (n = !0, xd(r, a));
					r = r.next;
				}
			while (n);
			pd = !1;
		}
	}
	function _d() {
		vd();
	}
	function vd() {
		fd = dd = !1;
		var e = 0;
		md !== 0 && af() && (e = md);
		for (var t = Ie(), n = null, r = ld; r !== null;) {
			var i = r.next, a = yd(r, t);
			a === 0 ? (r.next = null, n === null ? ld = i : n.next = i, i === null && (ud = n)) : (n = r, (e !== 0 || a & 3) && (fd = !0)), r = i;
		}
		hu !== 0 && hu !== 5 || gd(e, !1), md !== 0 && (md = 0);
	}
	function yd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Je(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = it(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Jl, n = Yl, n = nt(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Xl === 2 || Xl === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Ne(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || rt(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Ne(r), pt(n)) {
				case 2:
				case 8:
					n = ze;
					break;
				case 32:
					n = Be;
					break;
				case 268435456:
					n = He;
					break;
				default: n = Be;
			}
			return r = bd.bind(null, e), n = Me(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Ne(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function bd(e, t) {
		if (hu !== 0 && hu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if ($u() && e.callbackNode !== n) return null;
		var r = Yl;
		return r = nt(e, e === Jl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Du(e, r, t), yd(e, Ie()), e.callbackNode != null && e.callbackNode === n ? bd.bind(null, e) : null);
	}
	function xd(e, t) {
		if ($u()) return null;
		Du(e, t, !0);
	}
	function Sd() {
		lf(function() {
			ql & 6 ? Me(Re, _d) : vd();
		});
	}
	function Cd() {
		if (md === 0) {
			var e = j;
			e === 0 && (e = Qe, Qe <<= 1, !(Qe & 261888) && (Qe = 256)), md = e;
		}
		return md;
	}
	function wd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : un("" + e);
	}
	function Td(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function Ed(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = wd((i[vt] || null).action), o = r.submitter;
			o && (t = (t = o[vt] || null) ? wd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Mn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (md !== 0) {
								var e = o ? Td(i, o) : new FormData(i);
								ks(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? Td(i, o) : new FormData(i), ks(n, {
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
	for (var Dd = 0; Dd < ai.length; Dd++) {
		var Od = ai[Dd];
		oi(Od.toLowerCase(), "on" + (Od[0].toUpperCase() + Od.slice(1)));
	}
	oi(Zr, "onAnimationEnd"), oi(Qr, "onAnimationIteration"), oi($r, "onAnimationStart"), oi("dblclick", "onDoubleClick"), oi("focusin", "onFocus"), oi("focusout", "onBlur"), oi(ei, "onTransitionRun"), oi(ti, "onTransitionStart"), oi(ni, "onTransitionCancel"), oi(ri, "onTransitionEnd"), Pt("onMouseEnter", ["mouseout", "mouseover"]), Pt("onMouseLeave", ["mouseout", "mouseover"]), Pt("onPointerEnter", ["pointerout", "pointerover"]), Pt("onPointerLeave", ["pointerout", "pointerover"]), Nt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Nt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Nt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Nt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Nt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Nt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var kd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Ad = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(kd));
	function jd(e, t) {
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
	function B(e, t) {
		var n = t[bt];
		n === void 0 && (n = t[bt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Fd(t, e, 2, !1), n.add(r));
	}
	function Md(e, t, n) {
		var r = 0;
		t && (r |= 4), Fd(n, e, r, t);
	}
	var Nd = "_reactListening" + Math.random().toString(36).slice(2);
	function Pd(e) {
		if (!e[Nd]) {
			e[Nd] = !0, jt.forEach(function(t) {
				t !== "selectionchange" && (Ad.has(t) || Md(t, !1, e), Md(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Nd] || (t[Nd] = !0, Md("selectionchange", !1, t));
		}
	}
	function Fd(e, t, n, r) {
		switch (Tp(t)) {
			case 2:
				var i = yp;
				break;
			case 8:
				i = bp;
				break;
			default: i = xp;
		}
		n = i.bind(null, t, n, e), i = void 0, !xn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Id(e, t, n, r, i) {
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
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = yn(m, p), g != null && d.push(Ld(m, g, h))), f) break;
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
							for (d = zd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
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
						l !== null && Bd(o, s, l, d, !1), u !== null && f !== null && Bd(o, f, u, d, !0);
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
				x && (or && n.locale !== "ko" && (dr || x !== "onCompositionStart" ? x === "onCompositionEnd" && dr && (b = En()) : (Cn = i, wn = "value" in Cn ? Cn.value : Cn.textContent, dr = !0)), y = Rd(r, x), 0 < y.length && (x = new Wn(x, e, null, n, i), o.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = ur(n), b !== null && (x.data = b)))), (b = ar ? fr(e, n) : pr(e, n)) && (x = Rd(r, "onBeforeInput"), 0 < x.length && (y = new Wn("onBeforeInput", "beforeinput", null, n, i), o.push({
					event: y,
					listeners: x
				}), y.data = b)), Ed(o, e, r, n, i);
			}
			jd(o, t);
		});
	}
	function Ld(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Rd(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = yn(e, n), i != null && r.unshift(Ld(e, i, a)), i = yn(e, t), i != null && r.push(Ld(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function zd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Bd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = yn(n, a), l != null && o.unshift(Ld(n, l, c))) : i || (l = yn(n, a), l != null && o.push(Ld(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Vd = /\r\n?/g, Hd = /\u0000|\uFFFD/g;
	function Ud(e) {
		return (typeof e == "string" ? e : "" + e).replace(Vd, "\n").replace(Hd, "");
	}
	function Wd(e, t) {
		return t = Ud(t), Ud(e) === t;
	}
	function Gd(e, t, n, r, i, a) {
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
				} else typeof a == "function" && (n === "formAction" ? (t !== "input" && Gd(e, t, "name", i.name, i, null), Gd(e, t, "formEncType", i.formEncType, i, null), Gd(e, t, "formMethod", i.formMethod, i, null), Gd(e, t, "formTarget", i.formTarget, i, null)) : (Gd(e, t, "encType", i.encType, i, null), Gd(e, t, "method", i.method, i, null), Gd(e, t, "target", i.target, i, null)));
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
				r != null && B("scroll", e);
				break;
			case "onScrollEnd":
				r != null && B("scrollend", e);
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
				B("beforetoggle", e), B("toggle", e), zt(e, "popover", r);
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
	function Kd(e, t, n, r, i, a) {
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
				r != null && B("scroll", e);
				break;
			case "onScrollEnd":
				r != null && B("scrollend", e);
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
	function qd(e, t, n) {
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
				B("error", e), B("load", e);
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
						default: Gd(e, t, a, s, n, null);
					}
				}
				i && Gd(e, t, "srcSet", n.srcSet, n, null), r && Gd(e, t, "src", n.src, n, null);
				return;
			case "input":
				B("invalid", e);
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
						default: Gd(e, t, r, d, n, null);
					}
				}
				Zt(e, a, c, l, u, s, i, !1);
				return;
			case "select":
				for (i in B("invalid", e), r = s = a = null, n) if (n.hasOwnProperty(i) && (c = n[i], c != null)) switch (i) {
					case "value":
						a = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Gd(e, t, i, c, n, null);
				}
				t = a, n = s, e.multiple = !!r, t == null ? n != null && $t(e, !!r, n, !0) : $t(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in B("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
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
					default: Gd(e, t, s, c, n, null);
				}
				tn(e, r, i, a);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Gd(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				B("beforetoggle", e), B("toggle", e), B("cancel", e), B("close", e);
				break;
			case "iframe":
			case "object":
				B("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < kd.length; r++) B(kd[r], e);
				break;
			case "image":
				B("error", e), B("load", e);
				break;
			case "details":
				B("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": B("error", e), B("load", e);
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
					default: Gd(e, t, u, r, n, null);
				}
				return;
			default: if (sn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Kd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Gd(e, t, c, r, n, null));
	}
	function Jd(e, t, n, r) {
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
						default: r.hasOwnProperty(m) || Gd(e, t, m, null, r, f);
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
						default: m !== f && Gd(e, t, p, m, r, f);
					}
				}
				Xt(e, s, c, l, u, d, a, i);
				return;
			case "select":
				for (a in m = s = c = p = null, n) if (l = n[a], n.hasOwnProperty(a) && l != null) switch (a) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(a) || Gd(e, t, a, null, r, l);
				}
				for (i in r) if (a = r[i], l = n[i], r.hasOwnProperty(i) && (a != null || l != null)) switch (i) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						c = a;
						break;
					case "multiple": s = a;
					default: a !== l && Gd(e, t, i, a, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? $t(e, !!n, n ? [] : "", !1) : $t(e, !!n, t, !0)) : $t(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (i = n[c], n.hasOwnProperty(c) && i != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Gd(e, t, c, null, r, i);
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
					default: i !== a && Gd(e, t, s, i, r, a);
				}
				en(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Gd(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Gd(e, t, l, p, r, m);
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
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Gd(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(o(137, t));
						break;
					default: Gd(e, t, u, p, r, m);
				}
				return;
			default: if (sn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Kd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Kd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Gd(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Gd(e, t, f, p, r, m);
	}
	function Yd(e) {
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
	function Xd() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Yd(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Yd(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Zd = null, Qd = null;
	function $d(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function ef(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function tf(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function nf(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var rf = null;
	function af() {
		var e = window.event;
		return e && e.type === "popstate" ? e === rf ? !1 : (rf = e, !0) : (rf = null, !1);
	}
	var of = typeof setTimeout == "function" ? setTimeout : void 0, sf = typeof clearTimeout == "function" ? clearTimeout : void 0, cf = typeof Promise == "function" ? Promise : void 0, lf = typeof queueMicrotask == "function" ? queueMicrotask : cf === void 0 ? of : function(e) {
		return cf.resolve(null).then(e).catch(uf);
	};
	function uf(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function df(e) {
		return e === "head";
	}
	function ff(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Wp(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") Ef(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, Ef(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[wt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && Ef(e.ownerDocument.body);
			n = i;
		} while (n);
		Wp(t);
	}
	function pf(e, t) {
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
	function mf(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					mf(n), Tt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function hf(e, t, n, r) {
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
			if (e = xf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function gf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = xf(e.nextSibling), e === null)) return null;
		return e;
	}
	function _f(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = xf(e.nextSibling), e === null)) return null;
		return e;
	}
	function vf(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function yf(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function bf(e, t) {
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
	function xf(e) {
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
	var Sf = null;
	function Cf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return xf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function wf(e) {
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
	function Tf(e, t, n) {
		switch (t = $d(n), e) {
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
	function Ef(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		Tt(e);
	}
	var Df = /* @__PURE__ */ new Map(), Of = /* @__PURE__ */ new Set();
	function V(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var kf = T.d;
	T.d = {
		f: Af,
		r: jf,
		D: Pf,
		C: Ff,
		L: If,
		m: Lf,
		X: zf,
		S: Rf,
		M: Bf
	};
	function Af() {
		var e = kf.f(), t = ju();
		return e || t;
	}
	function jf(e) {
		var t = Dt(e);
		t !== null && t.tag === 5 && t.type === "form" ? js(t) : kf.r(e);
	}
	var Mf = typeof document > "u" ? null : document;
	function Nf(e, t, n) {
		var r = Mf;
		if (r && typeof t == "string" && t) {
			var i = Yt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), Of.has(i) || (Of.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), qd(t, "link", e), At(t), r.head.appendChild(t)));
		}
	}
	function Pf(e) {
		kf.D(e), Nf("dns-prefetch", e, null);
	}
	function Ff(e, t) {
		kf.C(e, t), Nf("preconnect", e, t);
	}
	function If(e, t, n) {
		kf.L(e, t, n);
		var r = Mf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Yt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Yt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Yt(n.imageSizes) + "\"]")) : i += "[href=\"" + Yt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Hf(e);
					break;
				case "script": a = Kf(e);
			}
			Df.has(a) || (e = m({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), Df.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Uf(a)) || t === "script" && r.querySelector(H(a)) || (t = r.createElement("link"), qd(t, "link", e), At(t), r.head.appendChild(t)));
		}
	}
	function Lf(e, t) {
		kf.m(e, t);
		var n = Mf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Yt(r) + "\"][href=\"" + Yt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Kf(e);
			}
			if (!Df.has(a) && (e = m({
				rel: "modulepreload",
				href: e
			}, t), Df.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(H(a))) return;
				}
				r = n.createElement("link"), qd(r, "link", e), At(r), n.head.appendChild(r);
			}
		}
	}
	function Rf(e, t, n) {
		kf.S(e, t, n);
		var r = Mf;
		if (r && e) {
			var i = kt(r).hoistableStyles, a = Hf(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Uf(a))) s.loading = 5;
				else {
					e = m({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = Df.get(a)) && Yf(e, n);
					var c = o = r.createElement("link");
					At(c), qd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Jf(o, t, r);
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
	function zf(e, t) {
		kf.X(e, t);
		var n = Mf;
		if (n && e) {
			var r = kt(n).hoistableScripts, i = Kf(e), a = r.get(i);
			a || (a = n.querySelector(H(i)), a || (e = m({
				src: e,
				async: !0
			}, t), (t = Df.get(i)) && Xf(e, t), a = n.createElement("script"), At(a), qd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Bf(e, t) {
		kf.M(e, t);
		var n = Mf;
		if (n && e) {
			var r = kt(n).hoistableScripts, i = Kf(e), a = r.get(i);
			a || (a = n.querySelector(H(i)), a || (e = m({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = Df.get(i)) && Xf(e, t), a = n.createElement("script"), At(a), qd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Vf(e, t, n, r) {
		var i = (i = ye.current) ? V(i) : null;
		if (!i) throw Error(o(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Hf(n.href), n = kt(i).hoistableStyles, r = n.get(t), r || (r = {
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
					e = Hf(n.href);
					var a = kt(i).hoistableStyles, s = a.get(e);
					if (s || (i = i.ownerDocument || i, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, a.set(e, s), (a = i.querySelector(Uf(e))) && !a._p && (s.instance = a, s.state.loading = 5), Df.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, Df.set(e, n), a || Gf(i, e, n, s.state))), t && r === null) throw Error(o(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(o(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Kf(n), n = kt(i).hoistableScripts, r = n.get(t), r || (r = {
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
	function Hf(e) {
		return "href=\"" + Yt(e) + "\"";
	}
	function Uf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Wf(e) {
		return m({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Gf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), qd(t, "link", n), At(t), e.head.appendChild(t));
	}
	function Kf(e) {
		return "[src=\"" + Yt(e) + "\"]";
	}
	function H(e) {
		return "script[async]" + e;
	}
	function qf(e, t, n) {
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
				return r = (e.ownerDocument || e).createElement("style"), At(r), qd(r, "style", i), Jf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				i = Hf(n.href);
				var a = e.querySelector(Uf(i));
				if (a) return t.state.loading |= 4, t.instance = a, At(a), a;
				r = Wf(n), (i = Df.get(i)) && Yf(r, i), a = (e.ownerDocument || e).createElement("link"), At(a);
				var s = a;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), qd(a, "link", r), t.state.loading |= 4, Jf(a, n.precedence, e), t.instance = a;
			case "script": return a = Kf(n.src), (i = e.querySelector(H(a))) ? (t.instance = i, At(i), i) : (r = n, (i = Df.get(a)) && (r = m({}, n), Xf(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), At(i), qd(i, "link", r), e.head.appendChild(i), t.instance = i);
			case "void": return null;
			default: throw Error(o(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Jf(r, n.precedence, e));
		return t.instance;
	}
	function Jf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Yf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Xf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Zf = null;
	function Qf(e, t, n) {
		if (Zf === null) {
			var r = /* @__PURE__ */ new Map(), i = Zf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Zf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
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
	function $f(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function ep(e, t, n) {
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
	function tp(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function np(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Hf(r.href), a = t.querySelector(Uf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = ap.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, At(a);
					return;
				}
				a = t.ownerDocument || t, r = Wf(r), (i = Df.get(i)) && Yf(r, i), a = a.createElement("link"), At(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), qd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = ap.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var rp = 0;
	function ip(e, t) {
		return e.stylesheets && e.count === 0 && sp(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && sp(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && rp === 0 && (rp = 62500 * Xd());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && sp(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > rp ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function ap() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) sp(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var op = null;
	function sp(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, op = /* @__PURE__ */ new Map(), t.forEach(cp, e), op = null, ap.call(e));
	}
	function cp(e, t) {
		if (!(t.state.loading & 4)) {
			var n = op.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), op.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = ap.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var lp = {
		$$typeof: ee,
		Provider: null,
		Consumer: null,
		_currentValue: de,
		_currentValue2: de,
		_threadCount: 0
	};
	function up(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ot(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ot(0), this.hiddenUpdates = ot(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function dp(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new up(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = yi(3, null, null, t), e.current = a, a.stateNode = e, t = _a(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Ga(a), e;
	}
	function fp(e) {
		return e ? (e = _i, e) : _i;
	}
	function pp(e, t, n, r, i, a) {
		i = fp(i), r.context === null ? r.context = i : r.pendingContext = i, r = qa(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ja(e, r, t), n !== null && (Eu(n, e, t), Ya(n, e, t));
	}
	function mp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function hp(e, t) {
		mp(e, t), (e = e.alternate) && mp(e, t);
	}
	function gp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = mi(e, 67108864);
			t !== null && Eu(t, e, 67108864), hp(e, 67108864);
		}
	}
	function _p(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = wu();
			t = ft(t);
			var n = mi(e, t);
			n !== null && Eu(n, e, t), hp(e, t);
		}
	}
	var vp = !0;
	function yp(e, t, n, r) {
		var i = w.T;
		w.T = null;
		var a = T.p;
		try {
			T.p = 2, xp(e, t, n, r);
		} finally {
			T.p = a, w.T = i;
		}
	}
	function bp(e, t, n, r) {
		var i = w.T;
		w.T = null;
		var a = T.p;
		try {
			T.p = 8, xp(e, t, n, r);
		} finally {
			T.p = a, w.T = i;
		}
	}
	function xp(e, t, n, r) {
		if (vp) {
			var i = Sp(r);
			if (i === null) Id(e, t, r, Cp, n), Pp(e, r);
			else if (Ip(i, e, t, n, r)) r.stopPropagation();
			else if (Pp(e, r), t & 4 && -1 < Np.indexOf(e)) {
				for (; i !== null;) {
					var a = Dt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = tt(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Je(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									hd(a), !(ql & 6) && (fu = Ie() + 500, gd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = mi(a, 2), s !== null && Eu(s, a, 2), ju(), hp(a, 2);
					}
					if (a = Sp(r), a === null && Id(e, t, r, Cp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Id(e, t, r, null, n);
		}
	}
	function Sp(e) {
		return e = pn(e), wp(e);
	}
	var Cp = null;
	function wp(e) {
		if (Cp = null, e = Et(e), e !== null) {
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
		return Cp = e, null;
	}
	function Tp(e) {
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
			case "message": switch (Le()) {
				case Re: return 2;
				case ze: return 8;
				case Be:
				case Ve: return 32;
				case He: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var Ep = !1, Dp = null, Op = null, kp = null, Ap = /* @__PURE__ */ new Map(), jp = /* @__PURE__ */ new Map(), Mp = [], Np = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Pp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Dp = null;
				break;
			case "dragenter":
			case "dragleave":
				Op = null;
				break;
			case "mouseover":
			case "mouseout":
				kp = null;
				break;
			case "pointerover":
			case "pointerout":
				Ap.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": jp.delete(t.pointerId);
		}
	}
	function Fp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Dt(t), t !== null && gp(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Ip(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Dp = Fp(Dp, e, t, n, r, i), !0;
			case "dragenter": return Op = Fp(Op, e, t, n, r, i), !0;
			case "mouseover": return kp = Fp(kp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Ap.set(a, Fp(Ap.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, jp.set(a, Fp(jp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Lp(e) {
		var t = Et(e.target);
		if (t !== null) {
			var n = c(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = l(n), t !== null) {
						e.blockedOn = t, ht(e.priority, function() {
							_p(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = u(n), t !== null) {
						e.blockedOn = t, ht(e.priority, function() {
							_p(n);
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
	function Rp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = Sp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				fn = r, n.target.dispatchEvent(r), fn = null;
			} else return t = Dt(n), t !== null && gp(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function zp(e, t, n) {
		Rp(e) && n.delete(t);
	}
	function Bp() {
		Ep = !1, Dp !== null && Rp(Dp) && (Dp = null), Op !== null && Rp(Op) && (Op = null), kp !== null && Rp(kp) && (kp = null), Ap.forEach(zp), jp.forEach(zp);
	}
	function Vp(e, n) {
		e.blockedOn === n && (e.blockedOn = null, Ep || (Ep = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Bp)));
	}
	var Hp = null;
	function Up(e) {
		Hp !== e && (Hp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Hp === e && (Hp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (wp(r || n) === null) continue;
					break;
				}
				var a = Dt(n);
				a !== null && (e.splice(t, 3), t -= 3, ks(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Wp(e) {
		function t(t) {
			return Vp(t, e);
		}
		Dp !== null && Vp(Dp, e), Op !== null && Vp(Op, e), kp !== null && Vp(kp, e), Ap.forEach(t), jp.forEach(t);
		for (var n = 0; n < Mp.length; n++) {
			var r = Mp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Mp.length && (n = Mp[0], n.blockedOn === null);) Lp(n), n.blockedOn === null && Mp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[vt] || null;
			if (typeof a == "function") o || Up(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[vt] || null) s = o.formAction;
					else if (wp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Up(n);
			}
		}
	}
	function Gp() {
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
	function Kp(e) {
		this._internalRoot = e;
	}
	qp.prototype.render = Kp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(o(409));
		var n = t.current;
		pp(n, wu(), e, t, null, null);
	}, qp.prototype.unmount = Kp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			pp(e.current, 2, null, e, null, null), ju(), t[yt] = null;
		}
	};
	function qp(e) {
		this._internalRoot = e;
	}
	qp.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = mt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Mp.length && t !== 0 && t < Mp[n].priority; n++);
			Mp.splice(n, 0, e), n === 0 && Lp(e);
		}
	};
	var Jp = n.version;
	if (Jp !== "19.2.7") throw Error(o(527, Jp, "19.2.7"));
	T.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
		return e = f(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Yp = {
		bundleType: 0,
		version: "19.2.7",
		rendererPackageName: "react-dom",
		currentDispatcherRef: w,
		reconcilerVersion: "19.2.7"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Xp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Xp.isDisabled && Xp.supportsFiber) try {
			Ge = Xp.inject(Yp), Ke = Xp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!s(e)) throw Error(o(299));
		var n = !1, r = "", i = $s, a = ec, c = tc;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = dp(e, 1, !1, null, null, n, r, null, i, a, c, Gp), e[yt] = t.current, Pd(e), new Kp(t);
	}, e.hydrateRoot = function(e, t, n) {
		if (!s(e)) throw Error(o(299));
		var r = !1, i = "", a = $s, c = ec, l = tc, u = null;
		return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (a = n.onUncaughtError), n.onCaughtError !== void 0 && (c = n.onCaughtError), n.onRecoverableError !== void 0 && (l = n.onRecoverableError), n.formState !== void 0 && (u = n.formState)), t = dp(e, 1, !0, t, n ?? null, r, i, u, a, c, l, Gp), t.context = fp(null), n = t.current, r = wu(), r = ft(r), i = qa(r), i.callback = null, Ja(n, i, r), n = r, t.current.lanes = n, st(t, n), hd(t), e[yt] = t.current, Pd(e), new qp(t);
	}, e.version = "19.2.7";
})), Ic = /* @__PURE__ */ e(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e, t) {
			for (e = e.memoizedState; e !== null && 0 < t;) e = e.next, t--;
			return e;
		}
		function n(e, t, r, i) {
			if (r >= t.length) return i;
			var a = t[r], o = Kf(e) ? e.slice() : V({}, e);
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
			var i = t[r], a = Kf(e) ? e.slice() : V({}, e);
			return r + 1 === t.length ? (a[n[r]] = a[i], Kf(a) ? a.splice(i, 1) : delete a[i]) : a[i] = o(e[i], t, n, r + 1), a;
		}
		function s(e, t, n) {
			var r = t[n], i = Kf(e) ? e.slice() : V({}, e);
			return n + 1 === t.length ? (Kf(i) ? i.splice(r, 1) : delete i[r], i) : (i[r] = s(e[r], t, n + 1), i);
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
			e.context === Ng && ($d(e.current, 2, t, e, null, null), ol());
		}
		function _(e, t) {
			if (Pg !== null) {
				var n = t.staleFamilies;
				t = t.updatedFamilies, Ml(), Cr(e.current, t, n), ol();
			}
		}
		function v(e) {
			Pg = e;
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
		function ne(e) {
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
		function re(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e;
			for (e = e.child; e !== null;) {
				if (t = re(e), t !== null) return t;
				e = e.sibling;
			}
			return null;
		}
		function ie(e) {
			return typeof e != "object" || !e ? null : (e = Wf && e[Wf] || e["@@iterator"], typeof e == "function" ? e : null);
		}
		function ae(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === Gf ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case Mf: return "Fragment";
				case Pf: return "Profiler";
				case Nf: return "StrictMode";
				case Rf: return "Suspense";
				case zf: return "SuspenseList";
				case Hf: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case jf: return "Portal";
				case If: return e.displayName || "Context";
				case Ff: return (e._context.displayName || "Context") + ".Consumer";
				case Lf:
					var t = e.render;
					return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case Bf: return t = e.displayName || null, t === null ? ae(e.type) || "Memo" : t;
				case Vf:
					t = e._payload, e = e._init;
					try {
						return ae(e(t));
					} catch {}
			}
			return null;
		}
		function oe(e) {
			return typeof e.tag == "number" ? S(e) : typeof e.name == "string" ? e.name : null;
		}
		function S(e) {
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
				case 8: return t === Nf ? "StrictMode" : "Mode";
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
					if (e.return !== null) return S(e.return);
			}
			return null;
		}
		function se(e) {
			return { current: e };
		}
		function ce(e, t) {
			0 > Zf ? console.error("Unexpected pop.") : (t !== Xf[Zf] && console.error("Unexpected Fiber popped."), e.current = Yf[Zf], Yf[Zf] = null, Xf[Zf] = null, Zf--);
		}
		function C(e, t, n) {
			Zf++, Yf[Zf] = e.current, Xf[Zf] = n, e.current = t;
		}
		function le(e) {
			return e === null && console.error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."), e;
		}
		function ue(e, t) {
			C(ep, t, e), C($f, e, e), C(Qf, null, e);
			var n = t.nodeType;
			switch (n) {
				case 9:
				case 11:
					n = n === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? Bu(t) : US;
					break;
				default: if (n = t.tagName, t = t.namespaceURI) t = Bu(t), t = Vu(t, n);
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
			}, ce(Qf, e), C(Qf, n, e);
		}
		function w(e) {
			ce(Qf, e), ce($f, e), ce(ep, e);
		}
		function T() {
			return le(Qf.current);
		}
		function de(e) {
			e.memoizedState !== null && C(tp, e, e);
			var t = le(Qf.current), n = e.type, r = Vu(t.context, n);
			n = Kt(t.ancestorInfo, n), r = {
				context: r,
				ancestorInfo: n
			}, t !== r && (C($f, e, e), C(Qf, r, e));
		}
		function fe(e) {
			$f.current === e && (ce(Qf, e), ce($f, e)), tp.current === e && (ce(tp, e), bC._currentValue = yC);
		}
		function pe() {}
		function me() {
			if (np === 0) {
				rp = console.log, ip = console.info, ap = console.warn, op = console.error, sp = console.group, cp = console.groupCollapsed, lp = console.groupEnd;
				var e = {
					configurable: !0,
					enumerable: !0,
					value: pe,
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
			np++;
		}
		function he() {
			if (np--, np === 0) {
				var e = {
					configurable: !0,
					enumerable: !0,
					writable: !0
				};
				Object.defineProperties(console, {
					log: V({}, e, { value: rp }),
					info: V({}, e, { value: ip }),
					warn: V({}, e, { value: ap }),
					error: V({}, e, { value: op }),
					group: V({}, e, { value: sp }),
					groupCollapsed: V({}, e, { value: cp }),
					groupEnd: V({}, e, { value: lp })
				});
			}
			0 > np && console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
		}
		function ge(e) {
			var t = Error.prepareStackTrace;
			if (Error.prepareStackTrace = void 0, e = e.stack, Error.prepareStackTrace = t, e.startsWith("Error: react-stack-top-frame\n") && (e = e.slice(29)), t = e.indexOf("\n"), t !== -1 && (e = e.slice(t + 1)), t = e.indexOf("react_stack_bottom_frame"), t !== -1 && (t = e.lastIndexOf("\n", t)), t !== -1) e = e.slice(0, t);
			else return "";
			return e;
		}
		function _e(e) {
			if (up === void 0) try {
				throw Error();
			} catch (e) {
				var t = e.stack.trim().match(/\n( *(at )?)/);
				up = t && t[1] || "", dp = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
			}
			return "\n" + up + e + dp;
		}
		function ve(e, t) {
			if (!e || fp) return "";
			var n = pp.get(e);
			if (n !== void 0) return n;
			fp = !0, n = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
			var r = null;
			r = H.H, H.H = null, me();
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
								return e.displayName && d.includes("<anonymous>") && (d = d.replace("<anonymous>", e.displayName)), typeof e == "function" && pp.set(e, d), d;
							}
						while (1 <= a && 0 <= o);
						break;
					}
				}
			} finally {
				fp = !1, H.H = r, he(), Error.prepareStackTrace = n;
			}
			return l = (l = e ? e.displayName || e.name : "") ? _e(l) : "", typeof e == "function" && pp.set(e, l), l;
		}
		function ye(e, t) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return _e(e.type);
				case 16: return _e("Lazy");
				case 13: return e.child !== t && t !== null ? _e("Suspense Fallback") : _e("Suspense");
				case 19: return _e("SuspenseList");
				case 0:
				case 15: return ve(e.type, !1);
				case 11: return ve(e.type.render, !1);
				case 1: return ve(e.type, !0);
				case 31: return _e("Activity");
				default: return "";
			}
		}
		function be(e) {
			try {
				var t = "", n = null;
				do {
					t += ye(e, n);
					var r = e._debugInfo;
					if (r) for (var i = r.length - 1; 0 <= i; i--) {
						var a = r[i];
						if (typeof a.name == "string") {
							var o = t;
							a: {
								var s = a.name, c = a.env, l = a.debugLocation;
								if (l != null) {
									var u = ge(l), d = u.lastIndexOf("\n"), f = d === -1 ? u : u.slice(d + 1);
									if (f.indexOf(s) !== -1) {
										var p = "\n" + f;
										break a;
									}
								}
								p = _e(s + (c ? " [" + c + "]" : ""));
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
		function xe(e) {
			return (e = e ? e.displayName || e.name : "") ? _e(e) : "";
		}
		function Se() {
			if (mp === null) return null;
			var e = mp._debugOwner;
			return e == null ? null : oe(e);
		}
		function Ce() {
			if (mp === null) return "";
			var e = mp;
			try {
				var t = "";
				switch (e.tag === 6 && (e = e.return), e.tag) {
					case 26:
					case 27:
					case 5:
						t += _e(e.type);
						break;
					case 13:
						t += _e("Suspense");
						break;
					case 19:
						t += _e("SuspenseList");
						break;
					case 31:
						t += _e("Activity");
						break;
					case 30:
					case 0:
					case 15:
					case 1:
						e._debugOwner || t !== "" || (t += xe(e.type));
						break;
					case 11: e._debugOwner || t !== "" || (t += xe(e.type.render));
				}
				for (; e;) if (typeof e.tag == "number") {
					var n = e;
					e = n._debugOwner;
					var r = n._debugStack;
					if (e && r) {
						var i = ge(r);
						i !== "" && (t += "\n" + i);
					}
				} else if (e.debugStack != null) {
					var a = e.debugStack;
					(e = e.owner) && a && (t += "\n" + ge(a));
				} else break;
				var o = t;
			} catch (e) {
				o = "\nError generating stack: " + e.message + "\n" + e.stack;
			}
			return o;
		}
		function E(e, t, n, r, i, a, o) {
			var s = mp;
			we(e);
			try {
				return e !== null && e._debugTask ? e._debugTask.run(t.bind(null, n, r, i, a, o)) : t(n, r, i, a, o);
			} finally {
				we(s);
			}
			throw Error("runWithFiberInDEV should never be called in production. This is a bug in React.");
		}
		function we(e) {
			H.getCurrentStack = e === null ? null : Ce, hp = !1, mp = e;
		}
		function Te(e) {
			return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
		}
		function Ee(e) {
			try {
				return De(e), !1;
			} catch {
				return !0;
			}
		}
		function De(e) {
			return "" + e;
		}
		function Oe(e, t) {
			if (Ee(e)) return console.error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.", t, Te(e)), De(e);
		}
		function ke(e, t) {
			if (Ee(e)) return console.error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.", t, Te(e)), De(e);
		}
		function Ae(e) {
			if (Ee(e)) return console.error("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.", Te(e)), De(e);
		}
		function je(e) {
			if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
			var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (t.isDisabled) return !0;
			if (!t.supportsFiber) return console.error("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"), !0;
			try {
				Ap = t.inject(e), jp = t;
			} catch (e) {
				console.error("React instrumentation encountered an error: %o.", e);
			}
			return !!t.checkDCE;
		}
		function Me(e) {
			if (typeof Op == "function" && kp(e), jp && typeof jp.setStrictMode == "function") try {
				jp.setStrictMode(Ap, e);
			} catch (e) {
				Mp || (Mp = !0, console.error("React instrumentation encountered an error: %o", e));
			}
		}
		function Ne(e) {
			return e >>>= 0, e === 0 ? 32 : 31 - (Fp(e) / Ip | 0) | 0;
		}
		function Pe(e) {
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
		function Fe(e, t, n) {
			var r = e.pendingLanes;
			if (r === 0) return 0;
			var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
			e = e.warmLanes;
			var s = r & 134217727;
			return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Pe(n))) : i = Pe(o) : i = Pe(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Pe(n))) : i = Pe(o)) : i = Pe(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
		}
		function Ie(e, t) {
			return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
		}
		function Le(e, t) {
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
		function Re() {
			var e = zp;
			return zp <<= 1, !(zp & 62914560) && (zp = 4194304), e;
		}
		function ze(e) {
			for (var t = [], n = 0; 31 > n; n++) t.push(e);
			return t;
		}
		function Be(e, t) {
			e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
		}
		function Ve(e, t, n, r, i, a) {
			var o = e.pendingLanes;
			e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
			var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
			for (n = o & ~n; 0 < n;) {
				var u = 31 - Pp(n), d = 1 << u;
				s[u] = 0, c[u] = -1;
				var f = l[u];
				if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
					var p = f[u];
					p !== null && (p.lane &= -536870913);
				}
				n &= ~d;
			}
			r !== 0 && He(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
		}
		function He(e, t, n) {
			e.pendingLanes |= t, e.suspendedLanes &= ~t;
			var r = 31 - Pp(t);
			e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
		}
		function Ue(e, t) {
			var n = e.entangledLanes |= t;
			for (e = e.entanglements; n;) {
				var r = 31 - Pp(n), i = 1 << r;
				i & t | e[r] & t && (e[r] |= t), n &= ~i;
			}
		}
		function We(e, t) {
			var n = t & -t;
			return n = n & 42 ? 1 : Ge(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
		}
		function Ge(e) {
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
		function Ke(e, t, n) {
			if (Np) for (e = e.pendingUpdatersLaneMap; 0 < n;) {
				var r = 31 - Pp(n), i = 1 << r;
				e[r].add(t), n &= ~i;
			}
		}
		function qe(e, t) {
			if (Np) for (var n = e.pendingUpdatersLaneMap, r = e.memoizedUpdaters; 0 < t;) {
				var i = 31 - Pp(t);
				e = 1 << i, i = n[i], 0 < i.size && (i.forEach(function(e) {
					var t = e.alternate;
					t !== null && r.has(t) || r.add(e);
				}), i.clear()), t &= ~e;
			}
		}
		function Je(e) {
			return e &= -e, Bp !== 0 && Bp < e ? Vp !== 0 && Vp < e ? e & 134217727 ? Hp : Up : Vp : Bp;
		}
		function Ye() {
			var e = qf.p;
			return e === 0 ? (e = window.event, e === void 0 ? Hp : df(e.type)) : e;
		}
		function Xe(e, t) {
			var n = qf.p;
			try {
				return qf.p = e, t();
			} finally {
				qf.p = n;
			}
		}
		function Ze(e) {
			delete e[Gp], delete e[Kp], delete e[Jp], delete e[Yp], delete e[Xp];
		}
		function Qe(e) {
			var t = e[Gp];
			if (t) return t;
			for (var n = e.parentNode; n;) {
				if (t = n[qp] || n[Gp]) {
					if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = xd(e); e !== null;) {
						if (n = e[Gp]) return n;
						e = xd(e);
					}
					return t;
				}
				e = n, n = e.parentNode;
			}
			return null;
		}
		function $e(e) {
			if (e = e[Gp] || e[qp]) {
				var t = e.tag;
				if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
			}
			return null;
		}
		function et(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
			throw Error("getNodeFromInstance: Invalid argument.");
		}
		function tt(e) {
			var t = e[Zp];
			return t ||= e[Zp] = {
				hoistableStyles: /* @__PURE__ */ new Map(),
				hoistableScripts: /* @__PURE__ */ new Map()
			}, t;
		}
		function nt(e) {
			e[Qp] = !0;
		}
		function rt(e, t) {
			it(e, t), it(e + "Capture", t);
		}
		function it(e, t) {
			em[e] && console.error("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), em[e] = t;
			var n = e.toLowerCase();
			for (tm[n] = e, e === "onDoubleClick" && (tm.ondblclick = e), e = 0; e < t.length; e++) $p.add(t[e]);
		}
		function at(e, t) {
			nm[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
		}
		function ot(e) {
			return gp.call(am, e) ? !0 : gp.call(im, e) ? !1 : rm.test(e) ? am[e] = !0 : (im[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
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
				return e = e.getAttribute(t), e === "" && !0 === n ? !0 : (Oe(n, t), e === "" + n ? n : e);
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
				Oe(n, t), e.setAttribute(t, "" + n);
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
				Oe(n, t), e.setAttribute(t, "" + n);
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
				Oe(r, n), e.setAttributeNS(t, n, "" + r);
			}
		}
		function dt(e) {
			switch (typeof e) {
				case "bigint":
				case "boolean":
				case "number":
				case "string":
				case "undefined": return e;
				case "object": return Ae(e), e;
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
						Ae(e), n = "" + e, a.call(this, e);
					}
				}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
					getValue: function() {
						return n;
					},
					setValue: function(e) {
						Ae(e), n = "" + e;
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
			return e.replace(om, function(e) {
				return "\\" + e.charCodeAt(0).toString(16) + " ";
			});
		}
		function vt(e, t) {
			t.checked === void 0 || t.defaultChecked === void 0 || cm || (console.error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", Se() || "A component", t.type), cm = !0), t.value === void 0 || t.defaultValue === void 0 || sm || (console.error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", Se() || "A component", t.type), sm = !0);
		}
		function yt(e, t, n, r, i, a, o, s) {
			e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? (Oe(o, "type"), e.type = o) : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + dt(t)) : e.value !== "" + dt(t) && (e.value = "" + dt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : xt(e, o, dt(n)) : xt(e, o, dt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? (Oe(s, "name"), e.name = "" + dt(s)) : e.removeAttribute("name");
		}
		function bt(e, t, n, r, i, a, o, s) {
			if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (Oe(a, "type"), e.type = a), t != null || n != null) {
				if (!(a !== "submit" && a !== "reset" || t != null)) {
					mt(e);
					return;
				}
				n = n == null ? "" : "" + dt(n), t = t == null ? n : "" + dt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
			}
			r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (Oe(o, "name"), e.name = o), mt(e);
		}
		function xt(e, t, n) {
			t === "number" && gt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
		}
		function St(e, t) {
			t.value ?? (typeof t.children == "object" && t.children !== null ? Df.Children.forEach(t.children, function(e) {
				e == null || typeof e == "string" || typeof e == "number" || typeof e == "bigint" || um || (um = !0, console.error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."));
			}) : t.dangerouslySetInnerHTML == null || dm || (dm = !0, console.error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), t.selected == null || lm || (console.error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), lm = !0);
		}
		function Ct() {
			var e = Se();
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
			for (e = 0; e < pm.length; e++) {
				var n = pm[e];
				if (t[n] != null) {
					var r = Kf(t[n]);
					t.multiple && !r ? console.error("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Ct()) : !t.multiple && r && console.error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Ct());
				}
			}
			t.value === void 0 || t.defaultValue === void 0 || fm || (console.error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"), fm = !0);
		}
		function Et(e, t) {
			t.value === void 0 || t.defaultValue === void 0 || mm || (console.error("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components", Se() || "A component"), mm = !0), t.children != null && t.value == null && console.error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
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
					if (Kf(r)) {
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
			return hm.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? "{\"...\"}" : "{" + e.slice(0, t - 7) + "...\"}" : "{" + e + "}") : e.length > t ? 5 > t ? "{\"...\"}" : e.slice(0, t - 3) + "..." : e;
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
					if (Kf(e)) return "[...]";
					if (e.$$typeof === Af) return (t = ae(e.type)) ? "<" + t + ">" : "<...>";
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
			return typeof e != "string" || hm.test(e) ? "{" + Lt(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? "\"...\"" : "\"" + e.slice(0, t - 5) + "...\"" : "\"" + e + "\"";
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
			var r = "", i = V({}, t), a;
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
			var n = V({}, e || bm), r = { tag: t };
			return _m.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), vm.indexOf(t) !== -1 && (n.pTagInButtonScope = null), gm.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = r, t === "form" && (n.formTag = r), t === "a" && (n.aTagInScope = r), t === "button" && (n.buttonTagInScope = r), t === "nobr" && (n.nobrTagInScope = r), t === "p" && (n.pTagInButtonScope = r), t === "li" && (n.listItemTagAutoclosing = r), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = r), t === "#document" || t === "html" ? n.containerTagInScope = null : n.containerTagInScope ||= r, e !== null || t !== "#document" && t !== "html" && t !== "body" ? !0 === n.implicitRootScope && (n.implicitRootScope = !1) : n.implicitRootScope = !0, n;
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
				case "rt": return ym.indexOf(t) === -1;
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
			t ||= bm;
			var n = t.current;
			if (t = (n = qt(e, n && n.tag, t.implicitRootScope) ? null : n) ? null : Jt(e, t), t = n || t, !t) return !0;
			var r = t.tag;
			if (t = String(!!n) + "|" + e + "|" + r, xm[t]) return !1;
			xm[t] = !0;
			var i = (t = mp) ? Yt(t.return, r) : null, a = t !== null && i !== null ? Gt(i, t, null) : "", o = "<" + e + ">";
			return n ? (n = "", r === "table" && e === "tr" && (n += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error("In HTML, %s cannot be a child of <%s>.%s\nThis will cause a hydration error.%s", o, r, n, a)) : console.error("In HTML, %s cannot be a descendant of <%s>.\nThis will cause a hydration error.%s", o, r, a), t && (e = t.return, i === null || e === null || i === e && e._debugOwner === t._debugOwner || E(i, function() {
				console.error("<%s> cannot contain a nested %s.\nSee this log for the ancestor stack trace.", r, o);
			})), !1;
		}
		function Zt(e, t, n) {
			if (n || qt("#text", t, !1)) return !0;
			if (n = "#text|" + t, xm[n]) return !1;
			xm[n] = !0;
			var r = (n = mp) ? Yt(n, t) : null;
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
			return e.replace(Dm, function(e, t) {
				return t.toUpperCase();
			});
		}
		function en(e, t, n) {
			var r = t.indexOf("--") === 0;
			r || (-1 < t.indexOf("-") ? km.hasOwnProperty(t) && km[t] || (km[t] = !0, console.error("Unsupported style property %s. Did you mean %s?", t, $t(t.replace(Em, "ms-")))) : Tm.test(t) ? km.hasOwnProperty(t) && km[t] || (km[t] = !0, console.error("Unsupported vendor-prefixed style property %s. Did you mean %s?", t, t.charAt(0).toUpperCase() + t.slice(1))) : !Om.test(n) || Am.hasOwnProperty(n) && Am[n] || (Am[n] = !0, console.error("Style property values shouldn't contain a semicolon. Try \"%s: %s\" instead.", t, n.replace(Om, ""))), typeof n == "number" && (isNaN(n) ? jm || (jm = !0, console.error("`NaN` is an invalid value for the `%s` css style property.", t)) : isFinite(n) || Mm || (Mm = !0, console.error("`Infinity` is an invalid value for the `%s` css style property.", t)))), n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Nm.has(t) ? t === "float" ? e.cssFloat = n : (ke(n, t), e[t] = ("" + n).trim()) : e[t] = n + "px";
		}
		function tn(e, t, n) {
			if (t != null && typeof t != "object") throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			if (t && Object.freeze(t), e = e.style, n != null) {
				if (t) {
					var r = {};
					if (n) {
						for (var i in n) if (n.hasOwnProperty(i) && !t.hasOwnProperty(i)) for (var a = Sm[i] || [i], o = 0; o < a.length; o++) r[a[o]] = i;
					}
					for (var s in t) if (t.hasOwnProperty(s) && (!n || n[s] !== t[s])) for (i = Sm[s] || [s], a = 0; a < i.length; a++) r[i[a]] = s;
					for (var c in s = {}, t) for (i = Sm[c] || [c], a = 0; a < i.length; a++) s[i[a]] = c;
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
			return Im.get(e) || e;
		}
		function an(e, t) {
			if (gp.call(zm, t) && zm[t]) return !0;
			if (Vm.test(t)) {
				if (e = "aria-" + t.slice(4).toLowerCase(), e = Rm.hasOwnProperty(e) ? e : null, e == null) return console.error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), zm[t] = !0;
				if (t !== e) return console.error("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, e), zm[t] = !0;
			}
			if (Bm.test(t)) {
				if (e = t.toLowerCase(), e = Rm.hasOwnProperty(e) ? e : null, e == null) return zm[t] = !0, !1;
				t !== e && (console.error("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, e), zm[t] = !0);
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
			if (gp.call(Um, t) && Um[t]) return !0;
			var i = t.toLowerCase();
			if (i === "onfocusin" || i === "onfocusout") return console.error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Um[t] = !0;
			if (typeof n == "function" && (e === "form" && t === "action" || e === "input" && t === "formAction" || e === "button" && t === "formAction")) return !0;
			if (r != null) {
				if (e = r.possibleRegistrationNames, r.registrationNameDependencies.hasOwnProperty(t)) return !0;
				if (r = e.hasOwnProperty(i) ? e[i] : null, r != null) return console.error("Invalid event handler property `%s`. Did you mean `%s`?", t, r), Um[t] = !0;
				if (Wm.test(t)) return console.error("Unknown event handler property `%s`. It will be ignored.", t), Um[t] = !0;
			} else if (Wm.test(t)) return Gm.test(t) && console.error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Um[t] = !0;
			if (Km.test(t) || qm.test(t)) return !0;
			if (i === "innerhtml") return console.error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Um[t] = !0;
			if (i === "aria") return console.error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Um[t] = !0;
			if (i === "is" && n != null && typeof n != "string") return console.error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Um[t] = !0;
			if (typeof n == "number" && isNaN(n)) return console.error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Um[t] = !0;
			if (Lm.hasOwnProperty(i)) {
				if (i = Lm[i], i !== t) return console.error("Invalid DOM property `%s`. Did you mean `%s`?", t, i), Um[t] = !0;
			} else if (t !== i) return console.error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, i), Um[t] = !0;
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
					default: return i = t.toLowerCase().slice(0, 5), i === "data-" || i === "aria-" ? !0 : (n ? console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.", n, t, t, n, t) : console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", n, t, t, n, t, t, t), Um[t] = !0);
				}
				case "function":
				case "symbol": return Um[t] = !0, !1;
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
					console.error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : "Although this works, it will not work as expected if you pass the string \"false\".", t, n), Um[t] = !0;
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
			return Jm.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
		}
		function un() {}
		function dn(e) {
			return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
		}
		function fn(e) {
			var t = $e(e);
			if (t && (e = t.stateNode)) {
				var n = e[Kp] || null;
				a: switch (e = t.stateNode, t.type) {
					case "input":
						if (yt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
							for (n = e; n.parentNode;) n = n.parentNode;
							for (Oe(t, "name"), n = n.querySelectorAll("input[name=\"" + _t("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
								var r = n[t];
								if (r !== e && r.form === e.form) {
									var i = r[Kp] || null;
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
			if (Qm) return e(t, n);
			Qm = !0;
			try {
				return e(t);
			} finally {
				if (Qm = !1, (Xm !== null || Zm !== null) && (ol(), Xm && (t = Xm, e = Zm, Zm = Xm = null, fn(t), e))) for (t = 0; t < e.length; t++) fn(e[t]);
			}
		}
		function mn(e, t) {
			var n = e.stateNode;
			if (n === null) return null;
			var r = n[Kp] || null;
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
			if (ih) return ih;
			var e, t = rh, n = t.length, r, i = "value" in nh ? nh.value : nh.textContent, a = i.length;
			for (e = 0; e < n && t[e] === i[e]; e++);
			var o = n - e;
			for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
			return ih = i.slice(e, 1 < r ? 1 - r : void 0);
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
			return V(t.prototype, {
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
			return t.getModifierState ? t.getModifierState(e) : (e = Sh[e]) ? !!t[e] : !1;
		}
		function xn() {
			return bn;
		}
		function Sn(e, t) {
			switch (e) {
				case "keyup": return kh.indexOf(t.keyCode) !== -1;
				case "keydown": return t.keyCode !== Ah;
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
				case "keypress": return t.which === Fh ? (Lh = !0, Ih) : null;
				case "textInput": return e = t.data, e === Ih && Lh ? null : e;
				default: return null;
			}
		}
		function Tn(e, t) {
			if (Rh) return e === "compositionend" || !jh && Sn(e, t) ? (e = hn(), ih = rh = nh = null, Rh = !1, e) : null;
			switch (e) {
				case "paste": return null;
				case "keypress":
					if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
						if (t.char && 1 < t.char.length) return t.char;
						if (t.which) return String.fromCharCode(t.which);
					}
					return null;
				case "compositionend": return Ph && t.locale !== "ko" ? null : t.data;
				default: return null;
			}
		}
		function En(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t === "input" ? !!zh[e.type] : t === "textarea";
		}
		function Dn(e) {
			if (!$m) return !1;
			e = "on" + e;
			var t = e in document;
			return t ||= (t = document.createElement("div"), t.setAttribute(e, "return;"), typeof t[e] == "function"), t;
		}
		function On(e, t, n, r) {
			Xm ? Zm ? Zm.push(r) : Zm = [r] : Xm = r, t = pu(t, "onChange"), 0 < t.length && (n = new oh("onChange", "change", null, n, r), e.push({
				event: n,
				listeners: t
			}));
		}
		function kn(e) {
			su(e, 0);
		}
		function An(e) {
			if (ht(et(e))) return e;
		}
		function jn(e, t) {
			if (e === "change") return t;
		}
		function Mn() {
			Bh && (Bh.detachEvent("onpropertychange", Nn), Vh = Bh = null);
		}
		function Nn(e) {
			if (e.propertyName === "value" && An(Vh)) {
				var t = [];
				On(t, Vh, e, dn(e)), pn(kn, t);
			}
		}
		function Pn(e, t, n) {
			e === "focusin" ? (Mn(), Bh = t, Vh = n, Bh.attachEvent("onpropertychange", Nn)) : e === "focusout" && Mn();
		}
		function Fn(e) {
			if (e === "selectionchange" || e === "keyup" || e === "keydown") return An(Vh);
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
			if (Uh(e, t)) return !0;
			if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
			var n = Object.keys(e), r = Object.keys(t);
			if (n.length !== r.length) return !1;
			for (r = 0; r < n.length; r++) {
				var i = n[r];
				if (!gp.call(t, i) || !Uh(e[i], t[i])) return !1;
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
			Jh || Gh == null || Gh !== gt(r) || (r = Gh, "selectionStart" in r && Wn(r) ? r = {
				start: r.selectionStart,
				end: r.selectionEnd
			} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
				anchorNode: r.anchorNode,
				anchorOffset: r.anchorOffset,
				focusNode: r.focusNode,
				focusOffset: r.focusOffset
			}), qh && zn(qh, r) || (qh = r, r = pu(Kh, "onSelect"), 0 < r.length && (t = new oh("onSelect", "select", null, t, n), e.push({
				event: t,
				listeners: r
			}), t.target = Gh)));
		}
		function Kn(e, t) {
			var n = {};
			return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
		}
		function qn(e) {
			if (Xh[e]) return Xh[e];
			if (!Yh[e]) return e;
			var t = Yh[e], n;
			for (n in t) if (t.hasOwnProperty(n) && n in Zh) return Xh[e] = t[n];
			return e;
		}
		function Jn(e, t) {
			ag.set(e, t), rt(t, [e]);
		}
		function Yn(e) {
			for (var t = pg, n = 0; n < e.length; n++) {
				var r = e[n];
				if (typeof r == "object" && r) if (Kf(r) && r.length === 2 && typeof r[0] == "string") {
					if (t !== pg && t !== gg) return mg;
					t = gg;
				} else return mg;
				else {
					if (typeof r == "function" || typeof r == "string" && 50 < r.length || t !== pg && t !== hg) return mg;
					t = hg;
				}
			}
			return t;
		}
		function Xn(e, t, n, r) {
			for (var i in e) gp.call(e, i) && i[0] !== "_" && Zn(i, e[i], t, n, r);
		}
		function Zn(e, t, n, r, i) {
			switch (typeof t) {
				case "object": if (t === null) {
					t = "null";
					break;
				} else {
					if (t.$$typeof === Af) {
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
						for (var l in n.push([i + "\xA0\xA0".repeat(r) + e, "<" + a]), o !== null && Zn("key", o, n, r + 1, i), e = !1, t) l === "children" ? t.children != null && (!Kf(t.children) || 0 < t.children.length) && (e = !0) : gp.call(t, l) && l[0] !== "_" && Zn(l, t[l], n, r + 1, i);
						n.push(["", e ? ">…</" + a + ">" : "/>"]);
						return;
					}
					if (a = Object.prototype.toString.call(t), a = a.slice(8, a.length - 1), a === "Array") {
						if (l = Yn(t), l === hg || l === pg) {
							t = JSON.stringify(t);
							break;
						} else if (l === gg) {
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
					t = t === fg ? "…" : JSON.stringify(t);
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
			for (o in e) o in t || (n.push([_g + "\xA0\xA0".repeat(r) + o, "…"]), i = !1);
			for (var a in t) if (a in e) {
				var o = e[a], s = t[a];
				if (o !== s) {
					if (r === 0 && a === "children") i = "\xA0\xA0".repeat(r) + a, n.push([_g + i, "…"], [vg + i, "…"]);
					else {
						if (!(3 <= r)) {
							if (typeof o == "object" && typeof s == "object" && o !== null && s !== null && o.$$typeof === s.$$typeof) if (s.$$typeof === Af) {
								if (o.type === s.type && o.key === s.key) {
									o = ae(s.type) || "…", i = "\xA0\xA0".repeat(r) + a, o = "<" + o + " … />", n.push([_g + i, o], [vg + i, o]), i = !1;
									continue;
								}
							} else {
								var c = Object.prototype.toString.call(o), l = Object.prototype.toString.call(s);
								if (c === l && (l === "[object Object]" || l === "[object Array]")) {
									c = [yg + "\xA0\xA0".repeat(r) + a, l === "[object Array]" ? "Array" : ""], n.push(c), l = n.length, Qn(o, s, n, r + 1) ? l === n.length && (c[1] = "Referentially unequal but deeply equal objects. Consider memoization.") : i = !1;
									continue;
								}
							}
							else if (typeof o == "function" && typeof s == "function" && o.name === s.name && o.length === s.length && (c = Function.prototype.toString.call(o), l = Function.prototype.toString.call(s), c === l)) {
								o = s.name === "" ? "() => {}" : s.name + "() {}", n.push([yg + "\xA0\xA0".repeat(r) + a, o + " Referentially unequal function closure. Consider memoization."]);
								continue;
							}
						}
						Zn(a, o, n, r, _g), Zn(a, s, n, r, vg);
					}
					i = !1;
				}
			} else n.push([vg + "\xA0\xA0".repeat(r) + a, "…"]), i = !1;
			return i;
		}
		function $n(e) {
			W = e & 63 ? "Blocking" : e & 64 ? "Gesture" : e & 4194176 ? "Transition" : e & 62914560 ? "Suspense" : e & 2080374784 ? "Idle" : "Other";
		}
		function er(e, t, n, r) {
			bg && (wg.start = t, wg.end = n, Cg.color = "warning", Cg.tooltipText = r, Cg.properties = null, (e = e._debugTask) ? e.run(performance.measure.bind(performance, r, wg)) : performance.measure(r, wg));
		}
		function tr(e, t, n) {
			er(e, t, n, "Reconnect");
		}
		function nr(e, t, n, r, i) {
			var a = S(e);
			if (a !== null && bg) {
				var o = e.alternate, s = e.actualDuration;
				if (o === null || o.child !== e.child) for (var c = e.child; c !== null; c = c.sibling) s -= c.actualDuration;
				r = .5 > s ? r ? "tertiary-light" : "primary-light" : 10 > s ? r ? "tertiary" : "primary" : 100 > s ? r ? "tertiary-dark" : "primary-dark" : "error";
				var l = e.memoizedProps;
				s = e._debugTask, l !== null && o !== null && o.memoizedProps !== l ? (c = [Tg], l = Qn(o.memoizedProps, l, c, 0), 1 < c.length && (l && !Sg && (o.lanes & i) === 0 && 100 < e.actualDuration ? (Sg = !0, c[0] = Dg, Cg.color = "warning", Cg.tooltipText = Eg) : (Cg.color = r, Cg.tooltipText = a), Cg.properties = c, wg.start = t, wg.end = n, s == null ? performance.measure("​" + a, wg) : s.run(performance.measure.bind(performance, "​" + a, wg)))) : s == null ? console.timeStamp(a, t, n, xg, void 0, r) : s.run(console.timeStamp.bind(console, a, t, n, xg, void 0, r));
			}
		}
		function rr(e, t, n, r) {
			if (bg) {
				var i = S(e);
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
							track: xg,
							tooltipText: e.tag === 13 ? "Hydration failed" : "Error boundary caught an error",
							properties: o
						} }
					}, a ? a.run(performance.measure.bind(performance, "​" + i, e)) : performance.measure("​" + i, e);
				}
			}
		}
		function ir(e, t, n, r, i) {
			if (i !== null) {
				if (bg) {
					var a = S(e);
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
								track: xg,
								tooltipText: "A lifecycle or effect errored",
								properties: r
							} }
						}, (e = e._debugTask) ? e.run(performance.measure.bind(performance, "​" + a, t)) : performance.measure("​" + a, t);
					}
				}
			} else a = S(e), a !== null && bg && (i = 1 > r ? "secondary-light" : 100 > r ? "secondary" : 500 > r ? "secondary-dark" : "error", (e = e._debugTask) ? e.run(console.timeStamp.bind(console, a, t, n, xg, void 0, i)) : console.timeStamp(a, t, n, xg, void 0, i));
		}
		function ar(e, t, n, r) {
			if (bg && !(t <= e)) {
				var i = (n & 738197653) === n ? "tertiary-dark" : "primary-dark";
				n = (n & 536870912) === n ? "Prepared" : (n & 201326741) === n ? "Hydrated" : "Render", r ? r.run(console.timeStamp.bind(console, n, e, t, W, U, i)) : console.timeStamp(n, e, t, W, U, i);
			}
		}
		function or(e, t, n, r) {
			!bg || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Prewarm", e, t, W, U, n)) : console.timeStamp("Prewarm", e, t, W, U, n));
		}
		function sr(e, t, n, r) {
			!bg || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Suspended", e, t, W, U, n)) : console.timeStamp("Suspended", e, t, W, U, n));
		}
		function cr(e, t, n, r, i, a) {
			if (bg && !(t <= e)) {
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
						track: W,
						trackGroup: U,
						tooltipText: i ? "Hydration Failed" : "Recovered after Error",
						properties: n
					} }
				}, a ? a.run(performance.measure.bind(performance, "Recovered", e)) : performance.measure("Recovered", e);
			}
		}
		function lr(e, t, n, r) {
			!bg || t <= e || (r ? r.run(console.timeStamp.bind(console, "Errored", e, t, W, U, "error")) : console.timeStamp("Errored", e, t, W, U, "error"));
		}
		function ur(e, t, n, r) {
			!bg || t <= e || (r ? r.run(console.timeStamp.bind(console, n, e, t, W, U, "secondary-light")) : console.timeStamp(n, e, t, W, U, "secondary-light"));
		}
		function dr(e, t, n, r, i) {
			if (bg && !(t <= e)) {
				for (var a = [], o = 0; o < n.length; o++) {
					var s = n[o].value;
					a.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
				}
				e = {
					start: e,
					end: t,
					detail: { devtools: {
						color: "error",
						track: W,
						trackGroup: U,
						tooltipText: r ? "Remaining Effects Errored" : "Commit Errored",
						properties: a
					} }
				}, i ? i.run(performance.measure.bind(performance, "Errored", e)) : performance.measure("Errored", e);
			}
		}
		function fr(e, t, n) {
			!bg || t <= e || (n ? n.run(console.timeStamp.bind(console, "Animating", e, t, W, U, "secondary-dark")) : console.timeStamp("Animating", e, t, W, U, "secondary-dark"));
		}
		function pr() {
			for (var e = jg, t = Mg = jg = 0; t < e;) {
				var n = Ag[t];
				Ag[t++] = null;
				var r = Ag[t];
				Ag[t++] = null;
				var i = Ag[t];
				Ag[t++] = null;
				var a = Ag[t];
				if (Ag[t++] = null, r !== null && i !== null) {
					var o = r.pending;
					o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
				}
				a !== 0 && _r(n, i, a);
			}
		}
		function mr(e, t, n, r) {
			Ag[jg++] = e, Ag[jg++] = t, Ag[jg++] = n, Ag[jg++] = r, Mg |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
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
			for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & Og || (i = !0)), e = a, a = a.return;
			return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Pp(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
		}
		function vr(e) {
			if (Kx > Gx) throw Zx = Kx = 0, Qx = qx = null, Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
			Zx > Xx && (Zx = 0, Qx = null, console.error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.")), e.alternate === null && e.flags & 4098 && Wl(e);
			for (var t = e, n = t.return; n !== null;) t.alternate === null && t.flags & 4098 && Wl(e), t = n, n = t.return;
			return t.tag === 3 ? t.stateNode : null;
		}
		function yr(e) {
			if (Pg === null) return e;
			var t = Pg(e);
			return t === void 0 ? e : t.current;
		}
		function br(e) {
			if (Pg === null) return e;
			var t = Pg(e);
			return t === void 0 ? e != null && typeof e.render == "function" && (t = yr(e.render), e.render !== t) ? (t = {
				$$typeof: Lf,
				render: t
			}, e.displayName !== void 0 && (t.displayName = e.displayName), t) : e : t.current;
		}
		function xr(e, t) {
			if (Pg === null) return !1;
			var n = e.elementType;
			t = t.type;
			var r = !1, i = typeof t == "object" && t ? t.$$typeof : null;
			switch (e.tag) {
				case 1:
					typeof t == "function" && (r = !0);
					break;
				case 0:
					(typeof t == "function" || i === Vf) && (r = !0);
					break;
				case 11:
					(i === Lf || i === Vf) && (r = !0);
					break;
				case 14:
				case 15:
					(i === Bf || i === Vf) && (r = !0);
					break;
				default: return !1;
			}
			return !!(r && (e = Pg(n), e !== void 0 && e === Pg(t)));
		}
		function Sr(e) {
			Pg !== null && typeof WeakSet == "function" && (Fg === null && (Fg = /* @__PURE__ */ new WeakSet()), Fg.add(e));
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
				if (Pg === null) throw Error("Expected resolveFamily to be set during hot reload.");
				var l = !1;
				if (r = !1, c !== null && (c = Pg(c), c !== void 0 && (n.has(c) ? r = !0 : t.has(c) && (s === 1 ? r = !0 : l = !0))), Fg !== null && (Fg.has(e) || i !== null && Fg.has(i)) && (r = !0), r && (e._debugNeedsRemount = !0), (r || l) && (i = gr(e, 2), i !== null && tl(i, e, 2)), a === null || r || Cr(a, t, n), o === null) break;
				e = o;
			} while (1);
		}
		function wr(e, t, n, r) {
			this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, Bg || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
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
			else if (typeof e == "string") o = T(), o = Ud(e, n, o) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
			else a: switch (e) {
				case Hf: return t = h(31, n, t, i), t.elementType = Hf, t.lanes = a, t;
				case Mf: return Ar(n.children, i, a, t);
				case Nf:
					o = 8, i |= Lg, i |= Rg;
					break;
				case Pf: return e = n, r = i, typeof e.id != "string" && console.error("Profiler must specify an \"id\" of type `string` as a prop. Received the type `%s` instead.", typeof e.id), t = h(12, e, t, r | K), t.elementType = Pf, t.lanes = a, t.stateNode = {
					effectDuration: 0,
					passiveEffectDuration: 0
				}, t;
				case Rf: return t = h(13, n, t, i), t.elementType = Rf, t.lanes = a, t;
				case zf: return t = h(19, n, t, i), t.elementType = zf, t.lanes = a, t;
				default:
					if (typeof e == "object" && e) switch (e.$$typeof) {
						case If:
							o = 10;
							break a;
						case Ff:
							o = 9;
							break a;
						case Lf:
							o = 11, s = br(s);
							break a;
						case Bf:
							o = 14;
							break a;
						case Vf:
							o = 16, s = null;
							break a;
					}
					s = "", (e === void 0 || typeof e == "object" && e && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? n = "null" : Kf(e) ? n = "array" : e !== void 0 && e.$$typeof === Af ? (n = "<" + (ae(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : n = typeof e, (o = r ? oe(r) : null) && (s += "\n\nCheck the render method of `" + o + "`."), o = 29, n = Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (n + "." + s)), s = null;
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
			var t = h(18, null, null, G);
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
				var n = Vg.get(e);
				return n === void 0 ? (t = {
					value: e,
					source: t,
					stack: be(t)
				}, Vg.set(e, t), t) : n;
			}
			return {
				value: e,
				source: t,
				stack: be(t)
			};
		}
		function Fr(e, t) {
			Vr(), Hg[Ug++] = Gg, Hg[Ug++] = Wg, Wg = e, Gg = t;
		}
		function Ir(e, t, n) {
			Vr(), Kg[qg++] = Yg, Kg[qg++] = Xg, Kg[qg++] = Jg, Jg = e;
			var r = Yg;
			e = Xg;
			var i = 32 - Pp(r) - 1;
			r &= ~(1 << i), n += 1;
			var a = 32 - Pp(t) + i;
			if (30 < a) {
				var o = i - i % 5;
				a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Yg = 1 << 32 - Pp(t) + i | n << i | r, Xg = a + e;
			} else Yg = 1 << a | n << i | r, Xg = e;
		}
		function Lr(e) {
			Vr(), e.return !== null && (Fr(e, 1), Ir(e, 1, 0));
		}
		function Rr(e) {
			for (; e === Wg;) Wg = Hg[--Ug], Hg[Ug] = null, Gg = Hg[--Ug], Hg[Ug] = null;
			for (; e === Jg;) Jg = Kg[--qg], Kg[qg] = null, Xg = Kg[--qg], Kg[qg] = null, Yg = Kg[--qg], Kg[qg] = null;
		}
		function zr() {
			return Vr(), Jg === null ? null : {
				id: Yg,
				overflow: Xg
			};
		}
		function Br(e, t) {
			Vr(), Kg[qg++] = Yg, Kg[qg++] = Xg, Kg[qg++] = Jg, Yg = t.id, Xg = t.overflow, Jg = e;
		}
		function Vr() {
			$g || console.error("Expected to be hydrating. This is a bug in React. Please file an issue.");
		}
		function Hr(e, t) {
			if (e.return === null) {
				if (t_ === null) t_ = {
					fiber: e,
					children: [],
					serverProps: void 0,
					serverTail: [],
					distanceFromLeaf: t
				};
				else {
					if (t_.fiber !== e) throw Error("Saw multiple hydration diff roots in a pass. This is a bug in React.");
					t_.distanceFromLeaf > t && (t_.distanceFromLeaf = t);
				}
				return t_;
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
			$g && console.error("We should not be hydrating here. This is a bug in React. Please file a bug.");
		}
		function Wr(e, t) {
			e_ || (e = Hr(e, 0), e.serverProps = null, t !== null && (t = vd(t), e.serverTail.push(t)));
		}
		function Gr(e) {
			var t = 1 < arguments.length && arguments[1] !== void 0 && arguments[1], n = "", r = t_;
			throw r !== null && (t_ = null, n = Wt(r)), Zr(Pr(Error("Hydration failed because the server rendered " + (t ? "text" : "HTML") + " didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\nhttps://react.dev/link/hydration-mismatch" + n), e)), i_;
		}
		function Kr(e) {
			var t = e.stateNode, n = e.type, r = e.memoizedProps;
			switch (t[Gp] = e, t[Kp] = r, gu(n, r), n) {
				case "dialog":
					z("cancel", t), z("close", t);
					break;
				case "iframe":
				case "object":
				case "embed":
					z("load", t);
					break;
				case "video":
				case "audio":
					for (n = 0; n < fS.length; n++) z(fS[n], t);
					break;
				case "source":
					z("error", t);
					break;
				case "img":
				case "image":
				case "link":
					z("error", t), z("load", t);
					break;
				case "details":
					z("toggle", t);
					break;
				case "input":
					at("input", r), z("invalid", t), vt(t, r), bt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
					break;
				case "option":
					St(t, r);
					break;
				case "select":
					at("select", r), z("invalid", t), Tt(t, r);
					break;
				case "textarea": at("textarea", r), z("invalid", t), Et(t, r), Ot(t, r.value, r.defaultValue, r.children);
			}
			n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Su(t.textContent, n) ? (r.popover != null && (z("beforetoggle", t), z("toggle", t)), r.onScroll != null && z("scroll", t), r.onScrollEnd != null && z("scrollend", t), r.onClick != null && (t.onclick = un), t = !0) : t = !1, t || Gr(e, !0);
		}
		function qr(e) {
			for (Zg = e.return; Zg;) switch (Zg.tag) {
				case 5:
				case 31:
				case 13:
					r_ = !1;
					return;
				case 27:
				case 3:
					r_ = !0;
					return;
				default: Zg = Zg.return;
			}
		}
		function Jr(e) {
			if (e !== Zg) return !1;
			if (!$g) return qr(e), $g = !0, !1;
			var t = e.tag, n;
			if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Hu(e.type, e.memoizedProps)), n = !n), n && Qg) {
				for (n = Qg; n;) {
					var r = Hr(e, 0), i = vd(n);
					r.serverTail.push(i), n = i.type === "Suspense" ? bd(n) : _d(n.nextSibling);
				}
				Gr(e);
			}
			if (qr(e), t === 13) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				Qg = bd(e);
			} else if (t === 31) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				Qg = bd(e);
			} else t === 27 ? (t = Qg, $u(e.type) ? (e = nC, nC = null, Qg = e) : Qg = t) : Qg = Zg ? _d(e.stateNode.nextSibling) : null;
			return !0;
		}
		function Yr() {
			Qg = Zg = null, e_ = $g = !1;
		}
		function Xr() {
			var e = n_;
			return e !== null && (mx === null ? mx = e : mx.push.apply(mx, e), n_ = null), e;
		}
		function Zr(e) {
			n_ === null ? n_ = [e] : n_.push(e);
		}
		function Qr() {
			var e = t_;
			if (e !== null) {
				t_ = null;
				for (var t = Wt(e); 0 < e.children.length;) e = e.children[0];
				E(e.fiber, function() {
					console.error("A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\n%s%s", "https://react.dev/link/hydration-mismatch", t);
				});
			}
		}
		function $r() {
			l_ = c_ = null, u_ = !1;
		}
		function ei(e, t, n) {
			C(a_, t._currentValue, e), t._currentValue = n, C(o_, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== s_ && console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = s_;
		}
		function ti(e, t) {
			e._currentValue = a_.current;
			var n = o_.current;
			ce(o_, t), e._currentRenderer = n, ce(a_, t);
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
						Uh(i.pendingProps.value, o.value) || (e === null ? e = [s] : e.push(s));
					}
				} else if (i === tp.current) {
					if (o = i.alternate, o === null) throw Error("Should have a current fiber. This is a bug in React.");
					o.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [bC] : e.push(bC));
				}
				i = i.return;
			}
			e !== null && ri(t, e, n, r), t.flags |= 262144;
		}
		function ai(e) {
			for (e = e.firstContext; e !== null;) {
				if (!Uh(e.context._currentValue, e.memoizedValue)) return !0;
				e = e.next;
			}
			return !1;
		}
		function oi(e) {
			c_ = e, l_ = null, e = e.dependencies, e !== null && (e.firstContext = null);
		}
		function si(e) {
			return u_ && console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), li(c_, e);
		}
		function ci(e, t) {
			return c_ === null && oi(e), li(e, t);
		}
		function li(e, t) {
			var n = t._currentValue;
			if (t = {
				context: t,
				memoizedValue: n,
				next: null
			}, l_ === null) {
				if (e === null) throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
				l_ = t, e.dependencies = {
					lanes: 0,
					firstContext: t,
					_debugThenableState: null
				}, e.flags |= 524288;
			} else l_ = l_.next = t;
			return n;
		}
		function ui() {
			return {
				controller: new d_(),
				data: /* @__PURE__ */ new Map(),
				refCount: 0
			};
		}
		function di(e) {
			e.controller.signal.aborted && console.warn("A cache instance was retained after it was already freed. This likely indicates a bug in React."), e.refCount++;
		}
		function fi(e) {
			e.refCount--, 0 > e.refCount && console.warn("A cache instance was released after it was already freed. This likely indicates a bug in React."), e.refCount === 0 && f_(p_, function() {
				e.controller.abort();
			});
		}
		function pi(e, t, n) {
			e & 127 ? 0 > k_ && (k_ = h_(), A_ = g_(t), M_ = t, n != null && (N_ = S(n)), (Ub & (Pb | Fb)) !== Nb && (D_ = !0, j_ = __), e = Gu(), t = Wu(), e !== I_ || t !== F_ ? I_ = -1.1 : t !== null && (j_ = __), P_ = e, F_ = t) : e & 4194048 && 0 > B_ && (B_ = h_(), H_ = g_(t), U_ = t, n != null && (W_ = S(n)), 0 > z_) && (e = Gu(), t = Wu(), (e !== q_ || t !== K_) && (q_ = -1.1), G_ = e, K_ = t);
		}
		function mi(e) {
			if (0 > k_) {
				k_ = h_(), A_ = e._debugTask == null ? null : e._debugTask, (Ub & (Pb | Fb)) !== Nb && (j_ = __);
				var t = Gu(), n = Wu();
				t !== I_ || n !== F_ ? I_ = -1.1 : n !== null && (j_ = __), P_ = t, F_ = n;
			}
			0 > B_ && (B_ = h_(), H_ = e._debugTask == null ? null : e._debugTask, 0 > z_) && (e = Gu(), t = Wu(), (e !== q_ || t !== K_) && (q_ = -1.1), G_ = e, K_ = t);
		}
		function hi() {
			var e = w_;
			return w_ = 0, e;
		}
		function gi(e) {
			var t = w_;
			return w_ = e, t;
		}
		function _i(e) {
			var t = w_;
			return w_ += e, t;
		}
		function vi() {
			J = q = -1.1;
		}
		function yi() {
			var e = q;
			return q = -1.1, e;
		}
		function bi(e) {
			0 <= e && (q = e);
		}
		function xi() {
			var e = T_;
			return T_ = -0, e;
		}
		function Si(e) {
			0 <= e && (T_ = e);
		}
		function Ci() {
			var e = E_;
			return E_ = null, e;
		}
		function wi() {
			var e = D_;
			return D_ = !1, e;
		}
		function Ti(e) {
			C_ = h_(), 0 > e.actualStartTime && (e.actualStartTime = C_);
		}
		function Ei(e) {
			if (0 <= C_) {
				var t = h_() - C_;
				e.actualDuration += t, e.selfBaseDuration = t, C_ = -1;
			}
		}
		function Di(e) {
			if (0 <= C_) {
				var t = h_() - C_;
				e.actualDuration += t, C_ = -1;
			}
		}
		function Oi() {
			if (0 <= C_) {
				var e = h_(), t = e - C_;
				C_ = -1, w_ += t, T_ += t, J = e;
			}
		}
		function ki(e) {
			E_ === null && (E_ = []), E_.push(e), S_ === null && (S_ = []), S_.push(e);
		}
		function Ai() {
			C_ = h_(), 0 > q && (q = C_);
		}
		function ji(e) {
			for (var t = e.child; t;) e.actualDuration += t.actualDuration, t = t.sibling;
		}
		function Mi(e, t) {
			if (rv === null) {
				var n = rv = [];
				iv = 0, av = nu(), ov = {
					status: "pending",
					value: void 0,
					then: function(e) {
						n.push(e);
					}
				};
			}
			return iv++, t.then(Ni, Ni), t;
		}
		function Ni() {
			if (--iv === 0 && (-1 < B_ || (z_ = -1.1), rv !== null)) {
				ov !== null && (ov.status = "fulfilled");
				var e = rv;
				rv = null, av = 0, ov = null;
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
			var e = cv.current;
			return e === null ? Wb.pooledCache : e;
		}
		function Ii(e, t) {
			t === null ? C(cv, cv.current, e) : C(cv, t.pool, e);
		}
		function Li() {
			var e = Fi();
			return e === null ? null : {
				parent: m_._currentValue,
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
			H.actQueue !== null && (H.didUsePromise = !0);
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
					throw Vv = t, Hv = !0, Lv;
			}
		}
		function Vi(e) {
			try {
				return Iv(e);
			} catch (e) {
				throw typeof e == "object" && e && typeof e.then == "function" ? (Vv = e, Hv = !0, Lv) : e;
			}
		}
		function Hi() {
			if (Vv === null) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
			var e = Vv;
			return Vv = null, Hv = !1, e;
		}
		function Ui(e) {
			if (e === Lv || e === zv) throw Error("Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
		}
		function Wi(e) {
			var t = Y;
			return e != null && (Y = t === null ? e : t.concat(e)), t;
		}
		function Gi() {
			var e = Y;
			if (e != null) {
				for (var t = e.length - 1; 0 <= t; t--) if (e[t].name != null) {
					var n = e[t].debugTask;
					if (n != null) return n;
				}
			}
			return null;
		}
		function D(e, t, n) {
			for (var r = Object.keys(e.props), i = 0; i < r.length; i++) {
				var a = r[i];
				if (a !== "children" && a !== "key") {
					t === null && (t = kr(e, n.mode, 0), t._debugInfo = Y, t.return = n), E(t, function(e) {
						console.error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", e);
					}, a);
					break;
				}
			}
		}
		function Ki(e) {
			var t = Wv;
			return Wv += 1, Uv === null && (Uv = Ri()), Bi(Uv, e, t);
		}
		function qi(e, t) {
			t = t.props.ref, e.ref = t === void 0 ? null : t;
		}
		function Ji(e, t) {
			throw t.$$typeof === kf ? Error("A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the \"react\" package is used.\n- A library pre-bundled an old copy of \"react\" or \"react/jsx-runtime\".\n- A compiler tries to \"inline\" JSX instead of using the runtime.") : (e = Object.prototype.toString.call(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."));
		}
		function Yi(e, t) {
			var n = Gi();
			n === null ? Ji(e, t) : n.run(Ji.bind(null, e, t));
		}
		function Xi(e, t) {
			var n = S(e) || "Component";
			Jv[n] || (Jv[n] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  root.render(%s)", t, t, t) : console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  <%s>{%s}</%s>", t, t, n, t, n));
		}
		function Zi(e, t) {
			var n = Gi();
			n === null ? Xi(e, t) : n.run(Xi.bind(null, e, t));
		}
		function Qi(e, t) {
			var n = S(e) || "Component";
			Yv[n] || (Yv[n] = !0, t = String(t), e.tag === 3 ? console.error("Symbols are not valid as a React child.\n  root.render(%s)", t) : console.error("Symbols are not valid as a React child.\n  <%s>%s</%s>", n, t, n));
		}
		function $i(e, t) {
			var n = Gi();
			n === null ? Qi(e, t) : n.run(Qi.bind(null, e, t));
		}
		function ea(e) {
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
				return t === null || t.tag !== 6 ? (t = jr(n, e.mode, r), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t) : (t = i(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function c(e, t, n, r) {
				var a = n.type;
				return a === Mf ? (t = u(e, t, n.props.children, r, n.key), D(n, t, e), t) : t !== null && (t.elementType === a || xr(t, n) || typeof a == "object" && a && a.$$typeof === Vf && Vi(a) === t.type) ? (t = i(t, n.props), qi(t, n), t.return = e, t._debugOwner = n._owner, t._debugInfo = Y, t) : (t = kr(n, e.mode, r), qi(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function l(e, t, n, r) {
				return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Nr(n, e.mode, r), t.return = e, t._debugInfo = Y, t) : (t = i(t, n.children || []), t.return = e, t._debugInfo = Y, t);
			}
			function u(e, t, n, r, a) {
				return t === null || t.tag !== 7 ? (t = Ar(n, e.mode, r, a), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t) : (t = i(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function d(e, t, n) {
				if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = jr("" + t, e.mode, n), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t;
				if (typeof t == "object" && t) {
					switch (t.$$typeof) {
						case Af: return n = kr(t, e.mode, n), qi(n, t), n.return = e, e = Wi(t._debugInfo), n._debugInfo = Y, Y = e, n;
						case jf: return t = Nr(t, e.mode, n), t.return = e, t._debugInfo = Y, t;
						case Vf:
							var r = Wi(t._debugInfo);
							return t = Vi(t), e = d(e, t, n), Y = r, e;
					}
					if (Kf(t) || ie(t)) return n = Ar(t, e.mode, n, null), n.return = e, n._debugOwner = e, n._debugTask = e._debugTask, e = Wi(t._debugInfo), n._debugInfo = Y, Y = e, n;
					if (typeof t.then == "function") return r = Wi(t._debugInfo), e = d(e, Ki(t), n), Y = r, e;
					if (t.$$typeof === If) return d(e, ci(e, t), n);
					Yi(e, t);
				}
				return typeof t == "function" && Zi(e, t), typeof t == "symbol" && $i(e, t), null;
			}
			function f(e, t, n, r) {
				var i = t === null ? null : t.key;
				if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? s(e, t, "" + n, r) : null;
				if (typeof n == "object" && n) {
					switch (n.$$typeof) {
						case Af: return n.key === i ? (i = Wi(n._debugInfo), e = c(e, t, n, r), Y = i, e) : null;
						case jf: return n.key === i ? l(e, t, n, r) : null;
						case Vf: return i = Wi(n._debugInfo), n = Vi(n), e = f(e, t, n, r), Y = i, e;
					}
					if (Kf(n) || ie(n)) return i === null ? (i = Wi(n._debugInfo), e = u(e, t, n, r, null), Y = i, e) : null;
					if (typeof n.then == "function") return i = Wi(n._debugInfo), e = f(e, t, Ki(n), r), Y = i, e;
					if (n.$$typeof === If) return f(e, t, ci(e, n), r);
					Yi(e, n);
				}
				return typeof n == "function" && Zi(e, n), typeof n == "symbol" && $i(e, n), null;
			}
			function m(e, t, n, r, i) {
				if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, s(t, e, "" + r, i);
				if (typeof r == "object" && r) {
					switch (r.$$typeof) {
						case Af: return n = e.get(r.key === null ? n : r.key) || null, e = Wi(r._debugInfo), t = c(t, n, r, i), Y = e, t;
						case jf: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
						case Vf:
							var a = Wi(r._debugInfo);
							return r = Vi(r), t = m(e, t, n, r, i), Y = a, t;
					}
					if (Kf(r) || ie(r)) return n = e.get(n) || null, e = Wi(r._debugInfo), t = u(t, n, r, i, null), Y = e, t;
					if (typeof r.then == "function") return a = Wi(r._debugInfo), t = m(e, t, n, Ki(r), i), Y = a, t;
					if (r.$$typeof === If) return m(e, t, n, ci(t, r), i);
					Yi(t, r);
				}
				return typeof r == "function" && Zi(t, r), typeof r == "symbol" && $i(t, r), null;
			}
			function g(e, t, n, r) {
				if (typeof n != "object" || !n) return r;
				switch (n.$$typeof) {
					case Af:
					case jf:
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
					case Vf: n = Vi(n), g(e, t, n, r);
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
				if (_ === s.length) return n(i, h), $g && Fr(i, _), u;
				if (h === null) {
					for (; _ < s.length; _++) h = d(i, s[_], c), h !== null && (l = g(i, h, s[_], l), o = a(h, o, _), p === null ? u = h : p.sibling = h, p = h);
					return $g && Fr(i, _), u;
				}
				for (h = r(h); _ < s.length; _++) v = m(h, i, _, s[_], c), v !== null && (l = g(i, v, s[_], l), e && v.alternate !== null && h.delete(v.key === null ? _ : v.key), o = a(v, o, _), p === null ? u = v : p.sibling = v, p = v);
				return e && h.forEach(function(e) {
					return t(i, e);
				}), $g && Fr(i, _), u;
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
				if (y.done) return n(i, p), $g && Fr(i, h), l;
				if (p === null) {
					for (; !y.done; h++, y = s.next()) p = d(i, y.value, c), p !== null && (v = g(i, p, y.value, v), o = a(p, o, h), u === null ? l = p : u.sibling = p, u = p);
					return $g && Fr(i, h), l;
				}
				for (p = r(p); !y.done; h++, y = s.next()) _ = m(p, i, h, y.value, c), _ !== null && (v = g(i, _, y.value, v), e && _.alternate !== null && p.delete(_.key === null ? h : _.key), o = a(_, o, h), u === null ? l = _ : u.sibling = _, u = _);
				return e && p.forEach(function(e) {
					return t(i, e);
				}), $g && Fr(i, h), l;
			}
			function y(e, r, a, s) {
				if (typeof a == "object" && a && a.type === Mf && a.key === null && (D(a, null, e), a = a.props.children), typeof a == "object" && a) {
					switch (a.$$typeof) {
						case Af:
							var c = Wi(a._debugInfo);
							a: {
								for (var l = a.key; r !== null;) {
									if (r.key === l) {
										if (l = a.type, l === Mf) {
											if (r.tag === 7) {
												n(e, r.sibling), s = i(r, a.props.children), s.return = e, s._debugOwner = a._owner, s._debugInfo = Y, D(a, s, e), e = s;
												break a;
											}
										} else if (r.elementType === l || xr(r, a) || typeof l == "object" && l && l.$$typeof === Vf && Vi(l) === r.type) {
											n(e, r.sibling), s = i(r, a.props), qi(s, a), s.return = e, s._debugOwner = a._owner, s._debugInfo = Y, e = s;
											break a;
										}
										n(e, r);
										break;
									} else t(e, r);
									r = r.sibling;
								}
								a.type === Mf ? (s = Ar(a.props.children, e.mode, s, a.key), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Y, D(a, s, e), e = s) : (s = kr(a, e.mode, s), qi(s, a), s.return = e, s._debugInfo = Y, e = s);
							}
							return e = o(e), Y = c, e;
						case jf:
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
						case Vf: return c = Wi(a._debugInfo), a = Vi(a), e = y(e, r, a, s), Y = c, e;
					}
					if (Kf(a)) return c = Wi(a._debugInfo), e = _(e, r, a, s), Y = c, e;
					if (ie(a)) {
						if (c = Wi(a._debugInfo), l = ie(a), typeof l != "function") throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
						var u = l.call(a);
						return u === a ? (e.tag !== 0 || Object.prototype.toString.call(e.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(u) !== "[object Generator]") && (Kv || console.error("Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."), Kv = !0) : a.entries !== l || Gv || (console.error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Gv = !0), e = v(e, r, u, s), Y = c, e;
					}
					if (typeof a.then == "function") return c = Wi(a._debugInfo), e = y(e, r, Ki(a), s), Y = c, e;
					if (a.$$typeof === If) return y(e, r, ci(e, a), s);
					Yi(e, a);
				}
				return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (c = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), s = i(r, c), s.return = e, e = s) : (n(e, r), s = jr(c, e.mode, s), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Y, e = s), o(e)) : (typeof a == "function" && Zi(e, a), typeof a == "symbol" && $i(e, a), n(e, r));
			}
			return function(e, t, n, r) {
				var i = Y;
				Y = null;
				try {
					Wv = 0;
					var a = y(e, t, n, r);
					return Uv = null, a;
				} catch (t) {
					if (t === Lv || t === zv) throw t;
					var o = h(29, t, null, e.mode);
					o.lanes = r, o.return = e;
					var s = o._debugInfo = Y;
					if (o._debugOwner = e._debugOwner, o._debugTask = e._debugTask, s != null) {
						for (var c = s.length - 1; 0 <= c; c--) if (typeof s[c].stack == "string") {
							o._debugOwner = s[c], o._debugTask = s[c].debugTask;
							break;
						}
					}
					return o;
				} finally {
					Y = i;
				}
			};
		}
		function ta(e, t) {
			var n = Kf(e);
			return e = !n && typeof ie(e) == "function", n || e ? (n = n ? "array" : "iterable", console.error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", n, t, n), !1) : !0;
		}
		function na(e) {
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
		function ra(e, t) {
			e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
				baseState: e.baseState,
				firstBaseUpdate: e.firstBaseUpdate,
				lastBaseUpdate: e.lastBaseUpdate,
				shared: e.shared,
				callbacks: null
			});
		}
		function ia(e) {
			return {
				lane: e,
				tag: Qv,
				payload: null,
				callback: null,
				next: null
			};
		}
		function aa(e, t, n) {
			var r = e.updateQueue;
			if (r === null) return null;
			if (r = r.shared, iy === r && !ry) {
				var i = S(e);
				console.error("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.\n\nPlease update the following component: %s", i), ry = !0;
			}
			return (Ub & Pb) === Nb ? (mr(e, r, t, n), vr(e)) : (i = r.pending, i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = vr(e), _r(e, null, n), t);
		}
		function O(e, t, n) {
			if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, Ue(e, n);
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
			if (ay) {
				var e = ov;
				if (e !== null) throw e;
			}
		}
		function k(e, t, n, r) {
			ay = !1;
			var i = e.updateQueue;
			ny = !1, iy = i.shared;
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
						f !== 0 && f === av && (ay = !0), u !== null && (u = u.next = {
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
								case $v:
									if (m = m.payload, typeof m == "function") {
										u_ = !0;
										var _ = m.call(g, d, h);
										if (f.mode & Lg) {
											Me(!0);
											try {
												m.call(g, d, h);
											} finally {
												Me(!1);
											}
										}
										u_ = !1, d = _;
										break a;
									}
									d = m;
									break a;
								case ty: f.flags = f.flags & -65537 | 128;
								case Qv:
									if (_ = m.payload, typeof _ == "function") {
										if (u_ = !0, m = _.call(g, d, h), f.mode & Lg) {
											Me(!0);
											try {
												_.call(g, d, h);
											} finally {
												Me(!1);
											}
										}
										u_ = !1;
									} else m = _;
									if (m == null) break a;
									d = V({}, d, m);
									break a;
								case ey: ny = !0;
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
			iy = null;
		}
		function ca(e, t) {
			if (typeof e != "function") throw Error("Invalid argument passed as callback. Expected a function. Instead received: " + e);
			e.call(t);
		}
		function la(e, t) {
			var n = e.shared.hiddenCallbacks;
			if (n !== null) for (e.shared.hiddenCallbacks = null, e = 0; e < n.length; e++) ca(n[e], t);
		}
		function ua(e, t) {
			var n = e.callbacks;
			if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) ca(n[e], t);
		}
		function da(e, t) {
			var n = ox;
			C(sy, n, e), C(oy, t, e), ox = n | t.baseLanes;
		}
		function fa(e) {
			C(sy, ox, e), C(oy, oy.current, e);
		}
		function pa(e) {
			ox = sy.current, ce(oy, e), ce(sy, e);
		}
		function ma(e) {
			var t = e.alternate;
			C(fy, fy.current & uy, e), C(cy, e, e), ly === null && (t === null || oy.current !== null || t.memoizedState !== null) && (ly = e);
		}
		function ha(e) {
			C(fy, fy.current, e), C(cy, e, e), ly === null && (ly = e);
		}
		function ga(e) {
			e.tag === 22 ? (C(fy, fy.current, e), C(cy, e, e), ly === null && (ly = e)) : _a(e);
		}
		function _a(e) {
			C(fy, fy.current, e), C(cy, cy.current, e);
		}
		function va(e) {
			ce(cy, e), ly === e && (ly = null), ce(fy, e);
		}
		function ya(e) {
			for (var t = e; t !== null;) {
				if (t.tag === 13) {
					var n = t.memoizedState;
					if (n !== null && (n = n.dehydrated, n === null || md(n) || hd(n))) return t;
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
			var e = Z;
			Py === null ? Py = [e] : Py.push(e);
		}
		function j() {
			var e = Z;
			if (Py !== null && (Fy++, Py[Fy] !== e)) {
				var t = S(X);
				if (!yy.has(t) && (yy.add(t), Py !== null)) {
					for (var n = "", r = 0; r <= Fy; r++) {
						var i = Py[r], a = r === Fy ? e : i;
						for (i = r + 1 + ". " + i; 30 > i.length;) i += " ";
						i += a + "\n", n += i;
					}
					console.error("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n", t, n);
				}
			}
		}
		function ba(e) {
			e == null || Kf(e) || console.error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", Z, typeof e);
		}
		function xa() {
			var e = S(X);
			Sy.has(e) || (Sy.add(e), console.error("ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.", e));
		}
		function Sa() {
			throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
		}
		function Ca(e, t) {
			if (Iy) return !1;
			if (t === null) return console.error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Z), !1;
			e.length !== t.length && console.error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", Z, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
			for (var n = 0; n < t.length && n < e.length; n++) if (!Uh(e[n], t[n])) return !1;
			return !0;
		}
		function wa(e, t, n, r, i, a) {
			Cy = a, X = t, Py = e === null ? null : e._debugHookTypes, Fy = -1, Iy = e !== null && e.type !== t.type, (Object.prototype.toString.call(n) === "[object AsyncFunction]" || Object.prototype.toString.call(n) === "[object AsyncGeneratorFunction]") && (a = S(X), xy.has(a) || (xy.add(a), console.error("%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.", a === null ? "An unknown Component" : "<" + a + ">"))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, H.H = e !== null && e.memoizedState !== null ? By : Py === null ? Ry : zy, Oy = a = (t.mode & Lg) !== G;
			var o = bv(n, r, i);
			if (Oy = !1, Dy && (o = Ea(t, n, r, i)), a) {
				Me(!0);
				try {
					o = Ea(t, n, r, i);
				} finally {
					Me(!1);
				}
			}
			return Ta(e, t), o;
		}
		function Ta(e, t) {
			t._debugHookTypes = Py, t.dependencies === null ? jy !== null && (t.dependencies = {
				lanes: 0,
				firstContext: null,
				_debugThenableState: jy
			}) : t.dependencies._debugThenableState = jy, H.H = Ly;
			var n = wy !== null && wy.next !== null;
			if (Cy = 0, Py = Z = Ty = wy = X = null, Fy = -1, e !== null && (e.flags & 65011712) != (t.flags & 65011712) && console.error("Internal React error: Expected static flag was missing. Please notify the React team."), Ey = !1, Ay = 0, jy = null, n) throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
			e === null || ob || (e = e.dependencies, e !== null && ai(e) && (ob = !0)), Hv ? (Hv = !1, e = !0) : e = !1, e && (t = S(t) || "Unknown", by.has(t) || xy.has(t) || (by.add(t), console.error("`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary.")));
		}
		function Ea(e, t, n, r) {
			X = e;
			var i = 0;
			do {
				if (Dy && (jy = null), Ay = 0, Dy = !1, i >= Ny) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
				if (i += 1, Iy = !1, Ty = wy = null, e.updateQueue != null) {
					var a = e.updateQueue;
					a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0);
				}
				Fy = -1, H.H = Vy, a = bv(t, n, r);
			} while (Dy);
			return a;
		}
		function M() {
			var e = H.H, t = e.useState()[0];
			return t = typeof t.then == "function" ? Ma(t) : t, e = e.useState()[0], (wy === null ? null : wy.memoizedState) !== e && (X.flags |= 1024), t;
		}
		function Da() {
			var e = ky !== 0;
			return ky = 0, e;
		}
		function Oa(e, t, n) {
			t.updateQueue = e.updateQueue, t.flags = (t.mode & Rg) === G ? t.flags & -2053 : t.flags & -402655237, e.lanes &= ~n;
		}
		function ka(e) {
			if (Ey) {
				for (e = e.memoizedState; e !== null;) {
					var t = e.queue;
					t !== null && (t.pending = null), e = e.next;
				}
				Ey = !1;
			}
			Cy = 0, Py = Ty = wy = X = null, Fy = -1, Z = null, Dy = !1, Ay = ky = 0, jy = null;
		}
		function N() {
			var e = {
				memoizedState: null,
				baseState: null,
				baseQueue: null,
				queue: null,
				next: null
			};
			return Ty === null ? X.memoizedState = Ty = e : Ty = Ty.next = e, Ty;
		}
		function Aa() {
			if (wy === null) {
				var e = X.alternate;
				e = e === null ? null : e.memoizedState;
			} else e = wy.next;
			var t = Ty === null ? X.memoizedState : Ty.next;
			if (t !== null) Ty = t, wy = e;
			else {
				if (e === null) throw X.alternate === null ? Error("Update hook called on initial render. This is likely a bug in React. Please file an issue.") : Error("Rendered more hooks than during the previous render.");
				wy = e, e = {
					memoizedState: wy.memoizedState,
					baseState: wy.baseState,
					baseQueue: wy.baseQueue,
					queue: wy.queue,
					next: null
				}, Ty === null ? X.memoizedState = Ty = e : Ty = Ty.next = e;
			}
			return Ty;
		}
		function ja() {
			return {
				lastEffect: null,
				events: null,
				stores: null,
				memoCache: null
			};
		}
		function Ma(e) {
			var t = Ay;
			return Ay += 1, jy === null && (jy = Ri()), e = Bi(jy, e, t), t = X, (Ty === null ? t.memoizedState : Ty.next) === null && (t = t.alternate, H.H = t !== null && t.memoizedState !== null ? By : Ry), e;
		}
		function Na(e) {
			if (typeof e == "object" && e) {
				if (typeof e.then == "function") return Ma(e);
				if (e.$$typeof === If) return si(e);
			}
			throw Error("An unsupported type was passed to use(): " + String(e));
		}
		function Pa(e) {
			var t = null, n = X.updateQueue;
			if (n !== null && (t = n.memoCache), t == null) {
				var r = X.alternate;
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
			}, n === null && (n = ja(), X.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0 || Iy) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = Uf;
			else n.length !== e && console.error("Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.", n.length, e);
			return t.index++, n;
		}
		function Fa(e, t) {
			return typeof t == "function" ? t(e) : t;
		}
		function Ia(e, t, n) {
			var r = N();
			if (n !== void 0) {
				var i = n(t);
				if (Oy) {
					Me(!0);
					try {
						n(t);
					} finally {
						Me(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Ho.bind(null, X, e), [r.memoizedState, e];
		}
		function La(e) {
			return Ra(Aa(), wy, e);
		}
		function Ra(e, t, n) {
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
					if (d === l.lane ? (Cy & d) === d : ($ & d) === d) {
						var f = l.revertLane;
						if (f === 0) c !== null && (c = c.next = {
							lane: 0,
							revertLane: 0,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}), d === av && (u = !0);
						else if ((Cy & f) === f) {
							l = l.next, f === av && (u = !0);
							continue;
						} else d = {
							lane: 0,
							revertLane: l.revertLane,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}, c === null ? (s = c = d, o = a) : c = c.next = d, X.lanes |= f, cx |= f;
						d = l.action, Oy && n(a, d), a = l.hasEagerState ? l.eagerState : n(a, d);
					} else f = {
						lane: d,
						revertLane: l.revertLane,
						gesture: l.gesture,
						action: l.action,
						hasEagerState: l.hasEagerState,
						eagerState: l.eagerState,
						next: null
					}, c === null ? (s = c = f, o = a) : c = c.next = f, X.lanes |= d, cx |= d;
					l = l.next;
				} while (l !== null && l !== t);
				if (c === null ? o = a : c.next = s, !Uh(a, e.memoizedState) && (ob = !0, u && (n = ov, n !== null))) throw n;
				e.memoizedState = a, e.baseState = o, e.baseQueue = c, r.lastRenderedState = a;
			}
			return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
		}
		function P(e) {
			var t = Aa(), n = t.queue;
			if (n === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			n.lastRenderedReducer = e;
			var r = n.dispatch, i = n.pending, a = t.memoizedState;
			if (i !== null) {
				n.pending = null;
				var o = i = i.next;
				do
					a = e(a, o.action), o = o.next;
				while (o !== i);
				Uh(a, t.memoizedState) || (ob = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), n.lastRenderedState = a;
			}
			return [a, r];
		}
		function za(e, t, n) {
			var r = X, i = N();
			if ($g) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				var a = n();
				vy || a === n() || (console.error("The result of getServerSnapshot should be cached to avoid an infinite loop"), vy = !0);
			} else {
				if (a = t(), vy || (n = t(), Uh(a, n) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), vy = !0)), Wb === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				$ & 127 || Va(r, t, a);
			}
			return i.memoizedState = a, n = {
				value: a,
				getSnapshot: t
			}, i.queue = n, ho(Ua.bind(null, r, n, e), [e]), r.flags |= 2048, uo(my | _y, { destroy: void 0 }, Ha.bind(null, r, n, a, t), null), a;
		}
		function Ba(e, t, n) {
			var r = X, i = Aa(), a = $g;
			if (a) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				n = n();
			} else if (n = t(), !vy) {
				var o = t();
				Uh(n, o) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), vy = !0);
			}
			if ((o = !Uh((wy || i).memoizedState, n)) && (i.memoizedState = n, ob = !0), i = i.queue, mo(2048, _y, Ua.bind(null, r, i, e), [e]), i.getSnapshot !== t || o || Ty !== null && Ty.memoizedState.tag & my) {
				if (r.flags |= 2048, uo(my | _y, { destroy: void 0 }, Ha.bind(null, r, i, n, t), null), Wb === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				a || Cy & 127 || Va(r, t, n);
			}
			return n;
		}
		function Va(e, t, n) {
			e.flags |= 16384, e = {
				getSnapshot: t,
				value: n
			}, t = X.updateQueue, t === null ? (t = ja(), X.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
		}
		function Ha(e, t, n, r) {
			t.value = n, t.getSnapshot = r, Wa(t) && Ga(e);
		}
		function Ua(e, t, n) {
			return n(function() {
				Wa(t) && (pi(2, "updateSyncExternalStore()", e), Ga(e));
			});
		}
		function Wa(e) {
			var t = e.getSnapshot;
			e = e.value;
			try {
				var n = t();
				return !Uh(e, n);
			} catch {
				return !0;
			}
		}
		function Ga(e) {
			var t = gr(e, 2);
			t !== null && tl(t, e, 2);
		}
		function Ka(e) {
			var t = N();
			if (typeof e == "function") {
				var n = e;
				if (e = n(), Oy) {
					Me(!0);
					try {
						n();
					} finally {
						Me(!1);
					}
				}
			}
			return t.memoizedState = t.baseState = e, t.queue = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Fa,
				lastRenderedState: e
			}, t;
		}
		function qa(e) {
			e = Ka(e);
			var t = e.queue, n = Uo.bind(null, X, t);
			return t.dispatch = n, [e.memoizedState, n];
		}
		function Ja(e) {
			var t = N();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Go.bind(null, X, !0, n), n.dispatch = t, [e, t];
		}
		function Ya(e, t) {
			return Xa(Aa(), wy, e, t);
		}
		function Xa(e, t, n, r) {
			return e.baseState = n, Ra(e, wy, typeof r == "function" ? r : Fa);
		}
		function Za(e, t) {
			var n = Aa();
			return wy === null ? (n.baseState = e, [e, n.queue.dispatch]) : Xa(n, wy, e, t);
		}
		function Qa(e, t, n, r, i) {
			if (Ko(e)) throw Error("Cannot update form state while rendering.");
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
				H.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, $a(t, a)) : (a.next = n.next, t.pending = n.next = a);
			}
		}
		function $a(e, t) {
			var n = t.action, r = t.payload, i = e.state;
			if (t.isTransition) {
				var a = H.T, o = {};
				o._updatedFibers = /* @__PURE__ */ new Set(), H.T = o;
				try {
					var s = n(i, r), c = H.S;
					c !== null && c(o, s), eo(e, t, s);
				} catch (n) {
					no(e, t, n);
				} finally {
					a !== null && o.types !== null && (a.types !== null && a.types !== o.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), a.types = o.types), H.T = a, a === null && o._updatedFibers && (e = o._updatedFibers.size, o._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
				}
			} else try {
				o = n(i, r), eo(e, t, o);
			} catch (n) {
				no(e, t, n);
			}
		}
		function eo(e, t, n) {
			typeof n == "object" && n && typeof n.then == "function" ? (H.asyncTransitions++, n.then(Ao, Ao), n.then(function(n) {
				to(e, t, n);
			}, function(n) {
				return no(e, t, n);
			}), t.isTransition || console.error("An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop.")) : to(e, t, n);
		}
		function to(e, t, n) {
			t.status = "fulfilled", t.value = n, ro(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, $a(e, n)));
		}
		function no(e, t, n) {
			var r = e.pending;
			if (e.pending = null, r !== null) {
				r = r.next;
				do
					t.status = "rejected", t.reason = n, ro(t), t = t.next;
				while (t !== r);
			}
			e.action = null;
		}
		function ro(e) {
			e = e.listeners;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
		function io(e, t) {
			return t;
		}
		function ao(e, t) {
			if ($g) {
				var n = Wb.formState;
				if (n !== null) {
					a: {
						var r = X;
						if ($g) {
							if (Qg) {
								b: {
									for (var i = Qg, a = r_; i.nodeType !== 8;) {
										if (!a) {
											i = null;
											break b;
										}
										if (i = _d(i.nextSibling), i === null) {
											i = null;
											break b;
										}
									}
									a = i.data, i = a === zS || a === BS ? i : null;
								}
								if (i) {
									Qg = _d(i.nextSibling), r = i.data === zS;
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
			return n = N(), n.memoizedState = n.baseState = t, r = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: io,
				lastRenderedState: t
			}, n.queue = r, n = Uo.bind(null, X, r), r.dispatch = n, r = Ka(!1), a = Go.bind(null, X, !1, r.queue), r = N(), i = {
				state: t,
				dispatch: null,
				action: e,
				pending: null
			}, r.queue = i, n = Qa.bind(null, X, i, a, n), i.dispatch = n, r.memoizedState = e, [
				t,
				n,
				!1
			];
		}
		function oo(e) {
			return so(Aa(), wy, e);
		}
		function so(e, t, n) {
			if (t = Ra(e, t, io)[0], e = La(Fa)[0], typeof t == "object" && t && typeof t.then == "function") try {
				var r = Ma(t);
			} catch (e) {
				throw e === Lv ? zv : e;
			}
			else r = t;
			t = Aa();
			var i = t.queue, a = i.dispatch;
			return n !== t.memoizedState && (X.flags |= 2048, uo(my | _y, { destroy: void 0 }, co.bind(null, i, n), null)), [
				r,
				a,
				e
			];
		}
		function co(e, t) {
			e.action = t;
		}
		function lo(e) {
			var t = Aa(), n = wy;
			if (n !== null) return so(t, n, e);
			Aa(), t = t.memoizedState, n = Aa();
			var r = n.queue.dispatch;
			return n.memoizedState = e, [
				t,
				r,
				!1
			];
		}
		function uo(e, t, n, r) {
			return e = {
				tag: e,
				create: n,
				deps: r,
				inst: t,
				next: null
			}, t = X.updateQueue, t === null && (t = ja(), X.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
		}
		function fo(e) {
			var t = N();
			return e = { current: e }, t.memoizedState = e;
		}
		function po(e, t, n, r) {
			var i = N();
			X.flags |= e, i.memoizedState = uo(my | t, { destroy: void 0 }, n, r === void 0 ? null : r);
		}
		function mo(e, t, n, r) {
			var i = Aa();
			r = r === void 0 ? null : r;
			var a = i.memoizedState.inst;
			wy !== null && r !== null && Ca(r, wy.memoizedState.deps) ? i.memoizedState = uo(t, a, n, r) : (X.flags |= e, i.memoizedState = uo(my | t, a, n, r));
		}
		function ho(e, t) {
			(X.mode & Rg) === G ? po(8390656, _y, e, t) : po(276826112, _y, e, t);
		}
		function go(e) {
			X.flags |= 4;
			var t = X.updateQueue;
			if (t === null) t = ja(), X.updateQueue = t, t.events = [e];
			else {
				var n = t.events;
				n === null ? t.events = [e] : n.push(e);
			}
		}
		function _o(e) {
			var t = N(), n = { impl: e };
			return t.memoizedState = n, function() {
				if ((Ub & Pb) !== Nb) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return n.impl.apply(void 0, arguments);
			};
		}
		function F(e) {
			var t = Aa().memoizedState;
			return go({
				ref: t,
				nextImpl: e
			}), function() {
				if ((Ub & Pb) !== Nb) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return t.impl.apply(void 0, arguments);
			};
		}
		function vo(e, t) {
			var n = 4194308;
			return (X.mode & Rg) !== G && (n |= 134217728), po(n, gy, e, t);
		}
		function yo(e, t) {
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
		function bo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]);
			var r = 4194308;
			(X.mode & Rg) !== G && (r |= 134217728), po(r, gy, yo.bind(null, t, e), n);
		}
		function xo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]), mo(4, gy, yo.bind(null, t, e), n);
		}
		function I(e, t) {
			return N().memoizedState = [e, t === void 0 ? null : t], e;
		}
		function So(e, t) {
			var n = Aa();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			return t !== null && Ca(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
		}
		function Co(e, t) {
			var n = N();
			t = t === void 0 ? null : t;
			var r = e();
			if (Oy) {
				Me(!0);
				try {
					e();
				} finally {
					Me(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function wo(e, t) {
			var n = Aa();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			if (t !== null && Ca(t, r[1])) return r[0];
			if (r = e(), Oy) {
				Me(!0);
				try {
					e();
				} finally {
					Me(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function To(e, t) {
			return Oo(N(), e, t);
		}
		function Eo(e, t) {
			return ko(Aa(), wy.memoizedState, e, t);
		}
		function Do(e, t) {
			var n = Aa();
			return wy === null ? Oo(n, e, t) : ko(n, wy.memoizedState, e, t);
		}
		function Oo(e, t, n) {
			return n === void 0 || Cy & 1073741824 && !($ & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = el(), X.lanes |= e, cx |= e, n);
		}
		function ko(e, t, n, r) {
			return Uh(n, t) ? n : oy.current === null ? !(Cy & 42) || Cy & 1073741824 && !($ & 261930) ? (ob = !0, e.memoizedState = n) : (e = el(), X.lanes |= e, cx |= e, t) : (e = Oo(e, n, r), Uh(e, t) || (ob = !0), e);
		}
		function Ao() {
			H.asyncTransitions--;
		}
		function jo(e, t, n, r, i) {
			var a = qf.p;
			qf.p = a !== 0 && a < Vp ? a : Vp;
			var o = H.T, s = {};
			s._updatedFibers = /* @__PURE__ */ new Set(), H.T = s, Go(e, !1, t, n);
			try {
				var c = i(), l = H.S;
				if (l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function") {
					H.asyncTransitions++, c.then(Ao, Ao);
					var u = Pi(c, r);
					Wo(e, t, u, $c(e));
				} else Wo(e, t, r, $c(e));
			} catch (n) {
				Wo(e, t, {
					then: function() {},
					status: "rejected",
					reason: n
				}, $c(e));
			} finally {
				qf.p = a, o !== null && s.types !== null && (o.types !== null && o.types !== s.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), o.types = s.types), H.T = o, o === null && s._updatedFibers && (e = s._updatedFibers.size, s._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
			}
		}
		function Mo(e, t, n, r) {
			if (e.tag !== 5) throw Error("Expected the form instance to be a HostComponent. This is a bug in React.");
			var i = No(e).queue;
			mi(e), jo(e, i, t, yC, n === null ? f : function() {
				return Po(e), n(r);
			});
		}
		function No(e) {
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
					lastRenderedReducer: Fa,
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
					lastRenderedReducer: Fa,
					lastRenderedState: n
				},
				next: null
			}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
		}
		function Po(e) {
			H.T === null && console.error("requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition.");
			var t = No(e);
			t.next === null && (t = e.alternate.memoizedState), Wo(e, t.next.queue, {}, $c(e));
		}
		function Fo() {
			var e = Ka(!1);
			return e = jo.bind(null, X, e.queue, !0, !1), N().memoizedState = e, [!1, e];
		}
		function Io() {
			var e = La(Fa)[0], t = Aa().memoizedState;
			return [typeof e == "boolean" ? e : Ma(e), t];
		}
		function Lo() {
			var e = P(Fa)[0], t = Aa().memoizedState;
			return [typeof e == "boolean" ? e : Ma(e), t];
		}
		function Ro() {
			return si(bC);
		}
		function zo() {
			var e = N(), t = Wb.identifierPrefix;
			if ($g) {
				var n = Xg, r = Yg;
				n = (r & ~(1 << 32 - Pp(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = ky++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = My++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		}
		function Bo() {
			return N().memoizedState = Vo.bind(null, X);
		}
		function Vo(e, t) {
			for (var n = e.return; n !== null;) {
				switch (n.tag) {
					case 24:
					case 3:
						var r = $c(n), i = ia(r), a = aa(n, i, r);
						a !== null && (pi(r, "refresh()", e), tl(a, n, r), O(a, n, r)), e = ui(), t != null && a !== null && console.error("The seed argument is not enabled outside experimental channels."), i.payload = { cache: e };
						return;
				}
				n = n.return;
			}
		}
		function Ho(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = $c(e);
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			Ko(e) ? qo(t, i) : (i = hr(e, t, i, r), i !== null && (pi(r, "dispatch()", e), tl(i, e, r), Jo(i, t, r)));
		}
		function Uo(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = $c(e), Wo(e, t, n, r) && pi(r, "setState()", e);
		}
		function Wo(e, t, n, r) {
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			if (Ko(e)) qo(t, i);
			else {
				var a = e.alternate;
				if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) {
					var o = H.H;
					H.H = Uy;
					try {
						var s = t.lastRenderedState, c = a(s, n);
						if (i.hasEagerState = !0, i.eagerState = c, Uh(c, s)) return mr(e, t, i, 0), Wb === null && pr(), !1;
					} catch {} finally {
						H.H = o;
					}
				}
				if (n = hr(e, t, i, r), n !== null) return tl(n, e, r), Jo(n, t, r), !0;
			}
			return !1;
		}
		function Go(e, t, n, r) {
			if (H.T === null && av === 0 && console.error("An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."), r = {
				lane: 2,
				revertLane: nu(),
				gesture: null,
				action: r,
				hasEagerState: !1,
				eagerState: null,
				next: null
			}, Ko(e)) {
				if (t) throw Error("Cannot update optimistic state while rendering.");
				console.error("Cannot call startTransition while rendering.");
			} else t = hr(e, n, r, 2), t !== null && (pi(2, "setOptimistic()", e), tl(t, e, 2));
		}
		function Ko(e) {
			var t = e.alternate;
			return e === X || t !== null && t === X;
		}
		function qo(e, t) {
			Dy = Ey = !0;
			var n = e.pending;
			n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
		}
		function Jo(e, t, n) {
			if (n & 4194048) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, Ue(e, n);
			}
		}
		function Yo(e) {
			if (e !== null && typeof e != "function") {
				var t = String(e);
				tb.has(t) || (tb.add(t), console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", e));
			}
		}
		function Xo(e, t, n, r) {
			var i = e.memoizedState, a = n(r, i);
			if (e.mode & Lg) {
				Me(!0);
				try {
					a = n(r, i);
				} finally {
					Me(!1);
				}
			}
			a === void 0 && (t = ae(t) || "Component", Zy.has(t) || (Zy.add(t), console.error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", t))), i = a == null ? i : V({}, i, a), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
		}
		function Zo(e, t, n, r, i, a, o) {
			var s = e.stateNode;
			if (typeof s.shouldComponentUpdate == "function") {
				if (n = s.shouldComponentUpdate(r, a, o), e.mode & Lg) {
					Me(!0);
					try {
						n = s.shouldComponentUpdate(r, a, o);
					} finally {
						Me(!1);
					}
				}
				return n === void 0 && console.error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", ae(t) || "Component"), n;
			}
			return t.prototype && t.prototype.isPureReactComponent ? !zn(n, r) || !zn(i, a) : !0;
		}
		function Qo(e, t, n, r) {
			var i = t.state;
			typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== i && (e = S(e) || "Component", Ky.has(e) || (Ky.add(e), console.error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", e)), nb.enqueueReplaceState(t, t.state, null));
		}
		function $o(e, t) {
			var n = t;
			if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
			if (e = e.defaultProps) for (var i in n === t && (n = V({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
			return n;
		}
		function es(e) {
			dg(e), console.warn("%s\n\n%s\n", rb ? "An error occurred in the <" + rb + "> component." : "An error occurred in one of your React components.", "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://react.dev/link/error-boundaries to learn more about error boundaries.");
		}
		function ts(e) {
			var t = rb ? "The above error occurred in the <" + rb + "> component." : "The above error occurred in one of your React components.", n = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((ib || "Anonymous") + ".");
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
		function ns(e) {
			dg(e);
		}
		function rs(e, t) {
			try {
				rb = t.source ? S(t.source) : null, ib = null;
				var n = t.value;
				if (H.actQueue !== null) H.thrownErrors.push(n);
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
		function is(e, t, n) {
			try {
				rb = n.source ? S(n.source) : null, ib = S(t);
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
		function as(e, t, n) {
			return n = ia(n), n.tag = ty, n.payload = { element: null }, n.callback = function() {
				E(t.source, rs, e, t);
			}, n;
		}
		function os(e) {
			return e = ia(e), e.tag = ty, e;
		}
		function ss(e, t, n, r) {
			var i = n.type.getDerivedStateFromError;
			if (typeof i == "function") {
				var a = r.value;
				e.payload = function() {
					return i(a);
				}, e.callback = function() {
					Sr(n), E(r.source, is, t, n, r);
				};
			}
			var o = n.stateNode;
			o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
				Sr(n), E(r.source, is, t, n, r), typeof i != "function" && (Cx === null ? Cx = /* @__PURE__ */ new Set([this]) : Cx.add(this)), Ov(this, r), typeof i == "function" || !(n.lanes & 2) && console.error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", S(n) || "Unknown");
			});
		}
		function cs(e, t, n, r, i) {
			if (n.flags |= 32768, Np && Gl(e, i), typeof r == "object" && r && typeof r.then == "function") {
				if (t = n.alternate, t !== null && ii(t, n, i, !0), $g && (e_ = !0), n = cy.current, n !== null) {
					switch (n.tag) {
						case 31:
						case 13: return ly === null ? hl() : n.alternate === null && sx === Ib && (sx = zb), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Bv ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Il(e, r, i)), !1;
						case 22: return n.flags |= 65536, r === Bv ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
							transitions: null,
							markerInstances: null,
							retryQueue: /* @__PURE__ */ new Set([r])
						}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Il(e, r, i)), !1;
					}
					throw Error("Unexpected Suspense handler tag (" + n.tag + "). This is a bug in React.");
				}
				return Il(e, r, i), hl(), !1;
			}
			if ($g) return e_ = !0, t = cy.current, t === null ? (r !== i_ && Zr(Pr(Error("There was an error while hydrating but React was able to recover by instead client rendering the entire root.", { cause: r }), n)), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = Pr(r, n), i = as(e.stateNode, r, i), oa(e, i), sx !== Bb && (sx = Rb)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== i_ && Zr(Pr(Error("There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.", { cause: r }), n))), !1;
			var a = Pr(Error("There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.", { cause: r }), n);
			if (px === null ? px = [a] : px.push(a), sx !== Bb && (sx = Rb), t === null) return !0;
			r = Pr(r, n), n = t;
			do {
				switch (n.tag) {
					case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = as(n.stateNode, r, e), oa(n, e), !1;
					case 1: if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (Cx === null || !Cx.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = os(i), ss(i, e, n, r), oa(n, i), !1;
				}
				n = n.return;
			} while (n !== null);
			return !1;
		}
		function ls(e, t, n, r) {
			t.child = e === null ? Zv(t, null, n, r) : Xv(t, e.child, n, r);
		}
		function us(e, t, n, r, i) {
			n = n.render;
			var a = t.ref;
			if ("ref" in r) {
				var o = {};
				for (var s in r) s !== "ref" && (o[s] = r[s]);
			} else o = r;
			return oi(t), r = wa(e, t, n, o, a, i), s = Da(), e !== null && !ob ? (Oa(e, t, i), Ns(e, t, i)) : ($g && s && Lr(t), t.flags |= 1, ls(e, t, r, i), t.child);
		}
		function ds(e, t, n, r, i) {
			if (e === null) {
				var a = n.type;
				return typeof a == "function" && !Tr(a) && a.defaultProps === void 0 && n.compare === null ? (n = yr(a), t.tag = 15, t.type = n, ws(t, a), fs(e, t, n, r, i)) : (e = Or(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
			}
			if (a = e.child, !Fs(e, i)) {
				var o = a.memoizedProps;
				if (n = n.compare, n = n === null ? zn : n, n(o, r) && e.ref === t.ref) return Ns(e, t, i);
			}
			return t.flags |= 1, e = Er(a, r), e.ref = t.ref, e.return = t, t.child = e;
		}
		function fs(e, t, n, r, i) {
			if (e !== null) {
				var a = e.memoizedProps;
				if (zn(a, r) && e.ref === t.ref && t.type === e.type) if (ob = !1, t.pendingProps = r = a, Fs(e, i)) e.flags & 131072 && (ob = !0);
				else return t.lanes = e.lanes, Ns(e, t, i);
			}
			return bs(e, t, n, r, i);
		}
		function ps(e, t, n, r) {
			var i = r.children, a = e === null ? null : e.memoizedState;
			if (e === null && t.stateNode === null && (t.stateNode = {
				_visibility: Og,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), r.mode === "hidden") {
				if (t.flags & 128) {
					if (a = a === null ? n : a.baseLanes | n, e !== null) {
						for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
						r = i & ~a;
					} else r = 0, t.child = null;
					return hs(e, t, a, n, r);
				}
				if (n & 536870912) t.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, e !== null && Ii(t, a === null ? null : a.cachePool), a === null ? fa(t) : da(t, a), ga(t);
				else return r = t.lanes = 536870912, hs(e, t, a === null ? n : a.baseLanes | n, n, r);
			} else a === null ? (e !== null && Ii(t, null), fa(t), _a(t)) : (Ii(t, a.cachePool), da(t, a), _a(t), t.memoizedState = null);
			return ls(e, t, i, n), t.child;
		}
		function ms(e, t) {
			return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
				_visibility: Og,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), t.sibling;
		}
		function hs(e, t, n, r, i) {
			var a = Fi();
			return a = a === null ? null : {
				parent: m_._currentValue,
				pool: a
			}, t.memoizedState = {
				baseLanes: n,
				cachePool: a
			}, e !== null && Ii(t, null), fa(t), ga(t), e !== null && ii(e, t, r, !0), t.childLanes = i, null;
		}
		function gs(e, t) {
			var n = t.hidden;
			return n !== void 0 && console.error("<Activity> doesn't accept a hidden prop. Use mode=\"hidden\" instead.\n- <Activity %s>\n+ <Activity %s>", !0 === n ? "hidden" : !1 === n ? "hidden={false}" : "hidden={...}", n ? "mode=\"hidden\"" : "mode=\"visible\""), t = L({
				mode: t.mode,
				children: t.children
			}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
		}
		function _s(e, t, n) {
			return Xv(t, e.child, null, n), e = gs(t, t.pendingProps), e.flags |= 2, va(t), t.memoizedState = null, e;
		}
		function vs(e, t, n) {
			var r = t.pendingProps, i = (t.flags & 128) != 0;
			if (t.flags &= -129, e === null) {
				if ($g) {
					if (r.mode === "hidden") return e = gs(t, r), t.lanes = 536870912, ms(null, e);
					if (ha(t), (e = Qg) ? (n = pd(e, r_), n = n !== null && n.data === kS ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: zr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Mr(n), r.return = t, t.child = r, Zg = t, Qg = null)) : n = null, n === null) throw Wr(t, e), Gr(t);
					return t.lanes = 536870912, null;
				}
				return gs(t, r);
			}
			var a = e.memoizedState;
			if (a !== null) {
				var o = a.dehydrated;
				if (ha(t), i) if (t.flags & 256) t.flags &= -257, t = _s(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
				else if (Ur(), n & 536870912 && ml(t), ob || ii(e, t, n, !1), i = (n & e.childLanes) !== 0, ob || i) {
					if (r = Wb, r !== null && (o = We(r, n), o !== 0 && o !== a.retryLane)) throw a.retryLane = o, gr(e, o), tl(r, e, o), ab;
					hl(), t = _s(e, t, n);
				} else e = a.treeContext, Qg = _d(o.nextSibling), Zg = t, $g = !0, n_ = null, e_ = !1, t_ = null, r_ = !1, e !== null && Br(t, e), t = gs(t, r), t.flags |= 4096;
				return t;
			}
			return a = e.child, r = {
				mode: r.mode,
				children: r.children
			}, n & 536870912 && (n & e.lanes) !== 0 && ml(t), e = Er(a, r), e.ref = t.ref, t.child = e, e.return = t, e;
		}
		function ys(e, t) {
			var n = t.ref;
			if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
			else {
				if (typeof n != "function" && typeof n != "object") throw Error("Expected ref to be a function, an object returned by React.createRef(), or undefined/null.");
				(e === null || e.ref !== n) && (t.flags |= 4194816);
			}
		}
		function bs(e, t, n, r, i) {
			if (n.prototype && typeof n.prototype.render == "function") {
				var a = ae(n) || "Unknown";
				sb[a] || (console.error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", a, a), sb[a] = !0);
			}
			return t.mode & Lg && lv.recordLegacyContextWarning(t, null), e === null && (ws(t, t.type), n.contextTypes && (a = ae(n) || "Unknown", lb[a] || (lb[a] = !0, console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)", a)))), oi(t), n = wa(e, t, n, r, void 0, i), r = Da(), e !== null && !ob ? (Oa(e, t, i), Ns(e, t, i)) : ($g && r && Lr(t), t.flags |= 1, ls(e, t, n, i), t.child);
		}
		function xs(e, t, n, r, i, a) {
			return oi(t), Fy = -1, Iy = e !== null && e.type !== t.type, t.updateQueue = null, n = Ea(t, r, n, i), Ta(e, t), r = Da(), e !== null && !ob ? (Oa(e, t, a), Ns(e, t, a)) : ($g && r && Lr(t), t.flags |= 1, ls(e, t, n, a), t.child);
		}
		function Ss(e, t, n, r, i) {
			switch (l(t)) {
				case !1:
					var a = t.stateNode, o = new t.type(t.memoizedProps, a.context).state;
					a.updater.enqueueSetState(a, o, null);
					break;
				case !0:
					t.flags |= 128, t.flags |= 65536, a = Error("Simulated error coming from DevTools");
					var s = i & -i;
					if (t.lanes |= s, o = Wb, o === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
					s = os(s), ss(s, o, t, Pr(a, t)), oa(t, s);
			}
			if (oi(t), t.stateNode === null) {
				if (o = Ng, a = n.contextType, "contextType" in n && a !== null && (a === void 0 || a.$$typeof !== If) && !eb.has(n) && (eb.add(n), s = a === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof a == "object" ? a.$$typeof === Ff ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(a).join(", ") + "}." : " However, it is set to a " + typeof a + ".", console.error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", ae(n) || "Component", s)), typeof a == "object" && a && (o = si(a)), a = new n(r, o), t.mode & Lg) {
					Me(!0);
					try {
						a = new n(r, o);
					} finally {
						Me(!1);
					}
				}
				if (o = t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = nb, t.stateNode = a, a._reactInternals = t, a._reactInternalInstance = Gy, typeof n.getDerivedStateFromProps == "function" && o === null && (o = ae(n) || "Component", qy.has(o) || (qy.add(o), console.error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", o, a.state === null ? "null" : "undefined", o))), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function") {
					var c = s = o = null;
					if (typeof a.componentWillMount == "function" && !0 !== a.componentWillMount.__suppressDeprecationWarning ? o = "componentWillMount" : typeof a.UNSAFE_componentWillMount == "function" && (o = "UNSAFE_componentWillMount"), typeof a.componentWillReceiveProps == "function" && !0 !== a.componentWillReceiveProps.__suppressDeprecationWarning ? s = "componentWillReceiveProps" : typeof a.UNSAFE_componentWillReceiveProps == "function" && (s = "UNSAFE_componentWillReceiveProps"), typeof a.componentWillUpdate == "function" && !0 !== a.componentWillUpdate.__suppressDeprecationWarning ? c = "componentWillUpdate" : typeof a.UNSAFE_componentWillUpdate == "function" && (c = "UNSAFE_componentWillUpdate"), o !== null || s !== null || c !== null) {
						a = ae(n) || "Component";
						var u = typeof n.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
						Yy.has(a) || (Yy.add(a), console.error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://react.dev/link/unsafe-component-lifecycles", a, u, o === null ? "" : "\n  " + o, s === null ? "" : "\n  " + s, c === null ? "" : "\n  " + c));
					}
				}
				a = t.stateNode, o = ae(n) || "Component", a.render || (n.prototype && typeof n.prototype.render == "function" ? console.error("No `render` method found on the %s instance: did you accidentally return an object from the constructor?", o) : console.error("No `render` method found on the %s instance: you may have forgotten to define `render`.", o)), !a.getInitialState || a.getInitialState.isReactClassApproved || a.state || console.error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && console.error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), a.contextType && console.error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), n.childContextTypes && !$y.has(n) && ($y.add(n), console.error("%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)", o)), n.contextTypes && !Qy.has(n) && (Qy.add(n), console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)", o)), typeof a.componentShouldUpdate == "function" && console.error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), n.prototype && n.prototype.isPureReactComponent && a.shouldComponentUpdate !== void 0 && console.error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", ae(n) || "A pure component"), typeof a.componentDidUnmount == "function" && console.error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof a.componentDidReceiveProps == "function" && console.error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof a.componentWillRecieveProps == "function" && console.error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof a.UNSAFE_componentWillRecieveProps == "function" && console.error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o), s = a.props !== r, a.props !== void 0 && s && console.error("When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o), a.defaultProps && console.error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof a.getSnapshotBeforeUpdate != "function" || typeof a.componentDidUpdate == "function" || Jy.has(n) || (Jy.add(n), console.error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", ae(n))), typeof a.getDerivedStateFromProps == "function" && console.error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof a.getDerivedStateFromError == "function" && console.error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof n.getSnapshotBeforeUpdate == "function" && console.error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o), (s = a.state) && (typeof s != "object" || Kf(s)) && console.error("%s.state: must be set to an object or null", o), typeof a.getChildContext == "function" && typeof n.childContextTypes != "object" && console.error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o), a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, na(t), o = n.contextType, a.context = typeof o == "object" && o ? si(o) : Ng, a.state === r && (o = ae(n) || "Component", Xy.has(o) || (Xy.add(o), console.error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o))), t.mode & Lg && lv.recordLegacyContextWarning(t, a), lv.recordUnsafeLifecycleWarnings(t, a), a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Xo(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && (console.error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", S(t) || "Component"), nb.enqueueReplaceState(a, a.state, null)), k(t, r, a, i), sa(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728), a = !0;
			} else if (e === null) {
				a = t.stateNode;
				var d = t.memoizedProps;
				s = $o(n, d), a.props = s;
				var f = a.context;
				c = n.contextType, o = Ng, typeof c == "object" && c && (o = si(c)), u = n.getDerivedStateFromProps, c = typeof u == "function" || typeof a.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, c || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (d || f !== o) && Qo(t, a, r, o), ny = !1;
				var p = t.memoizedState;
				a.state = p, k(t, r, a, i), sa(), f = t.memoizedState, d || p !== f || ny ? (typeof u == "function" && (Xo(t, n, u, r), f = t.memoizedState), (s = ny || Zo(t, n, s, r, p, f, o)) ? (c || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728), t.memoizedProps = r, t.memoizedState = f), a.props = r, a.state = f, a.context = o, a = s) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728), a = !1);
			} else {
				a = t.stateNode, ra(e, t), o = t.memoizedProps, c = $o(n, o), a.props = c, u = t.pendingProps, p = a.context, f = n.contextType, s = Ng, typeof f == "object" && f && (s = si(f)), d = n.getDerivedStateFromProps, (f = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== u || p !== s) && Qo(t, a, r, s), ny = !1, p = t.memoizedState, a.state = p, k(t, r, a, i), sa();
				var m = t.memoizedState;
				o !== u || p !== m || ny || e !== null && e.dependencies !== null && ai(e.dependencies) ? (typeof d == "function" && (Xo(t, n, d, r), m = t.memoizedState), (c = ny || Zo(t, n, c, r, p, m, s) || e !== null && e.dependencies !== null && ai(e.dependencies)) ? (f || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, m, s), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, m, s)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), a.props = r, a.state = m, a.context = s, a = c) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), a = !1);
			}
			if (s = a, ys(e, t), o = (t.flags & 128) != 0, s || o) {
				if (s = t.stateNode, we(t), o && typeof n.getDerivedStateFromError != "function") n = null, C_ = -1;
				else if (n = Sv(s), t.mode & Lg) {
					Me(!0);
					try {
						Sv(s);
					} finally {
						Me(!1);
					}
				}
				t.flags |= 1, e !== null && o ? (t.child = Xv(t, e.child, null, i), t.child = Xv(t, null, n, i)) : ls(e, t, n, i), t.memoizedState = s.state, e = t.child;
			} else e = Ns(e, t, i);
			return i = t.stateNode, a && i.props !== r && (db || console.error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", S(t) || "a component"), db = !0), e;
		}
		function Cs(e, t, n, r) {
			return Yr(), t.flags |= 256, ls(e, t, n, r), t.child;
		}
		function ws(e, t) {
			t && t.childContextTypes && console.error("childContextTypes cannot be defined on a function component.\n  %s.childContextTypes = ...", t.displayName || t.name || "Component"), typeof t.getDerivedStateFromProps == "function" && (e = ae(t) || "Unknown", ub[e] || (console.error("%s: Function components do not support getDerivedStateFromProps.", e), ub[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = ae(t) || "Unknown", cb[t] || (console.error("%s: Function components do not support contextType.", t), cb[t] = !0));
		}
		function Ts(e) {
			return {
				baseLanes: e,
				cachePool: Li()
			};
		}
		function Es(e, t, n) {
			return e = e === null ? 0 : e.childLanes & ~n, t && (e |= dx), e;
		}
		function Ds(e, t, n) {
			var r, i = t.pendingProps;
			c(t) && (t.flags |= 128);
			var a = !1, o = (t.flags & 128) != 0;
			if ((r = o) || (r = e !== null && e.memoizedState === null ? !1 : (fy.current & dy) !== 0), r && (a = !0, t.flags &= -129), r = (t.flags & 32) != 0, t.flags &= -33, e === null) {
				if ($g) {
					if (a ? ma(t) : _a(t), (e = Qg) ? (n = pd(e, r_), n = n !== null && n.data !== kS ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: zr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Mr(n), r.return = t, t.child = r, Zg = t, Qg = null)) : n = null, n === null) throw Wr(t, e), Gr(t);
					return hd(n) ? t.lanes = 32 : t.lanes = 536870912, null;
				}
				var s = i.children;
				if (i = i.fallback, a) {
					_a(t);
					var l = t.mode;
					return s = L({
						mode: "hidden",
						children: s
					}, l), i = Ar(i, l, n, null), s.return = t, i.return = t, s.sibling = i, t.child = s, i = t.child, i.memoizedState = Ts(n), i.childLanes = Es(e, r, n), t.memoizedState = mb, ms(null, i);
				}
				return ma(t), Os(t, s);
			}
			var u = e.memoizedState;
			if (u !== null) {
				var d = u.dehydrated;
				if (d !== null) {
					if (o) t.flags & 256 ? (ma(t), t.flags &= -257, t = ks(e, t, n)) : t.memoizedState === null ? (_a(t), s = i.fallback, l = t.mode, i = L({
						mode: "visible",
						children: i.children
					}, l), s = Ar(s, l, n, null), s.flags |= 2, i.return = t, s.return = t, i.sibling = s, t.child = i, Xv(t, e.child, null, n), i = t.child, i.memoizedState = Ts(n), i.childLanes = Es(e, r, n), t.memoizedState = mb, t = ms(null, i)) : (_a(t), t.child = e.child, t.flags |= 128, t = null);
					else if (ma(t), Ur(), n & 536870912 && ml(t), hd(d)) {
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
						}, typeof r == "string" && Vg.set(s, i), Zr(i), t = ks(e, t, n);
					} else if (ob || ii(e, t, n, !1), r = (n & e.childLanes) !== 0, ob || r) {
						if (r = Wb, r !== null && (i = We(r, n), i !== 0 && i !== u.retryLane)) throw u.retryLane = i, gr(e, i), tl(r, e, i), ab;
						md(d) || hl(), t = ks(e, t, n);
					} else md(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = u.treeContext, Qg = _d(d.nextSibling), Zg = t, $g = !0, n_ = null, e_ = !1, t_ = null, r_ = !1, e !== null && Br(t, e), t = Os(t, i.children), t.flags |= 4096);
					return t;
				}
			}
			return a ? (_a(t), s = i.fallback, l = t.mode, p = e.child, d = p.sibling, i = Er(p, {
				mode: "hidden",
				children: i.children
			}), i.subtreeFlags = p.subtreeFlags & 65011712, d === null ? (s = Ar(s, l, n, null), s.flags |= 2) : s = Er(d, s), s.return = t, i.return = t, i.sibling = s, t.child = i, ms(null, i), i = t.child, s = e.child.memoizedState, s === null ? s = Ts(n) : (l = s.cachePool, l === null ? l = Li() : (p = m_._currentValue, l = l.parent === p ? l : {
				parent: p,
				pool: p
			}), s = {
				baseLanes: s.baseLanes | n,
				cachePool: l
			}), i.memoizedState = s, i.childLanes = Es(e, r, n), t.memoizedState = mb, ms(e.child, i)) : (u !== null && (n & 62914560) === n && (n & e.lanes) !== 0 && ml(t), ma(t), n = e.child, e = n.sibling, n = Er(n, {
				mode: "visible",
				children: i.children
			}), n.return = t, n.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = n, t.memoizedState = null, n);
		}
		function Os(e, t) {
			return t = L({
				mode: "visible",
				children: t
			}, e.mode), t.return = e, e.child = t;
		}
		function L(e, t) {
			return e = h(22, e, null, t), e.lanes = 0, e;
		}
		function ks(e, t, n) {
			return Xv(t, e.child, null, n), e = Os(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
		}
		function As(e, t, n) {
			e.lanes |= t;
			var r = e.alternate;
			r !== null && (r.lanes |= t), ni(e.return, t, n);
		}
		function js(e, t, n, r, i, a) {
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
		function Ms(e, t, n) {
			var r = t.pendingProps, i = r.revealOrder, a = r.tail, o = r.children, s = fy.current;
			if ((r = (s & dy) !== 0) ? (s = s & uy | dy, t.flags |= 128) : s &= uy, C(fy, s, t), s = i ?? "null", i !== "forwards" && i !== "unstable_legacy-backwards" && i !== "together" && i !== "independent" && !fb[s]) if (fb[s] = !0, i == null) console.error("The default for the <SuspenseList revealOrder=\"...\"> prop is changing. To be future compatible you must explictly specify either \"independent\" (the current default), \"together\", \"forwards\" or \"legacy_unstable-backwards\".");
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
			s = a ?? "null", pb[s] || (a == null ? (i === "forwards" || i === "backwards" || i === "unstable_legacy-backwards") && (pb[s] = !0, console.error("The default for the <SuspenseList tail=\"...\"> prop is changing. To be future compatible you must explictly specify either \"visible\" (the current default), \"collapsed\" or \"hidden\".")) : a !== "visible" && a !== "collapsed" && a !== "hidden" ? (pb[s] = !0, console.error("\"%s\" is not a supported value for tail on <SuspenseList />. Did you mean \"visible\", \"collapsed\" or \"hidden\"?", a)) : i !== "forwards" && i !== "backwards" && i !== "unstable_legacy-backwards" && (pb[s] = !0, console.error("<SuspenseList tail=\"%s\" /> is only valid if revealOrder is \"forwards\" or \"backwards\". Did you mean to specify revealOrder=\"forwards\"?", a)));
			a: if ((i === "forwards" || i === "backwards" || i === "unstable_legacy-backwards") && o != null && !1 !== o) if (Kf(o)) {
				for (s = 0; s < o.length; s++) if (!ta(o[s], s)) break a;
			} else if (s = ie(o), typeof s == "function") {
				if (s = s.call(o)) for (var c = s.next(), l = 0; !c.done; c = s.next()) {
					if (!ta(c.value, l)) break a;
					l++;
				}
			} else console.error("A single row was passed to a <SuspenseList revealOrder=\"%s\" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?", i);
			if (ls(e, t, o, n), $g ? (Vr(), o = Gg) : o = 0, !r && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && As(e, n, t);
				else if (e.tag === 19) As(e, n, t);
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
					for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && ya(e) === null && (i = n), n = n.sibling;
					n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), js(t, !1, i, n, a, o);
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (n = null, i = t.child, t.child = null; i !== null;) {
						if (e = i.alternate, e !== null && ya(e) === null) {
							t.child = i;
							break;
						}
						e = i.sibling, i.sibling = n, n = i, i = e;
					}
					js(t, !0, n, null, a, o);
					break;
				case "together":
					js(t, !1, null, null, void 0, o);
					break;
				default: t.memoizedState = null;
			}
			return t.child;
		}
		function Ns(e, t, n) {
			if (e !== null && (t.dependencies = e.dependencies), C_ = -1, cx |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
				if (ii(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
			if (e !== null && t.child !== e.child) throw Error("Resuming work not yet implemented.");
			if (t.child !== null) {
				for (e = t.child, n = Er(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Er(e, e.pendingProps), n.return = t;
				n.sibling = null;
			}
			return t.child;
		}
		function Fs(e, t) {
			return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && ai(e))) : !0;
		}
		function Is(e, t, n) {
			switch (t.tag) {
				case 3:
					ue(t, t.stateNode.containerInfo), ei(t, m_, e.memoizedState.cache), Yr();
					break;
				case 27:
				case 5:
					de(t);
					break;
				case 4:
					ue(t, t.stateNode.containerInfo);
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
					if (t.memoizedState !== null) return t.flags |= 128, ha(t), null;
					break;
				case 13:
					if (r = t.memoizedState, r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (ma(t), e = Ns(e, t, n), e === null ? null : e.sibling) : Ds(e, t, n) : (ma(t), t.flags |= 128, null);
					ma(t);
					break;
				case 19:
					var i = (e.flags & 128) != 0;
					if (r = (n & t.childLanes) !== 0, r ||= (ii(e, t, n, !1), (n & t.childLanes) !== 0), i) {
						if (r) return Ms(e, t, n);
						t.flags |= 128;
					}
					if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), C(fy, fy.current, t), r) break;
					return null;
				case 22: return t.lanes = 0, ps(e, t, n, t.pendingProps);
				case 24: ei(t, m_, e.memoizedState.cache);
			}
			return Ns(e, t, n);
		}
		function Ls(e, t, n) {
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
			if (e !== null) if (e.memoizedProps !== t.pendingProps || t.type !== e.type) ob = !0;
			else {
				if (!Fs(e, n) && !(t.flags & 128)) return ob = !1, Is(e, t, n);
				ob = !!(e.flags & 131072);
			}
			else ob = !1, (r = $g) && (Vr(), r = (t.flags & 1048576) != 0), r && (r = t.index, Vr(), Ir(t, Gg, r));
			switch (t.lanes = 0, t.tag) {
				case 16:
					a: if (r = t.pendingProps, e = Vi(t.elementType), t.type = e, typeof e == "function") Tr(e) ? (r = $o(e, r), t.tag = 1, t.type = e = yr(e), t = Ss(null, t, e, r, n)) : (t.tag = 0, ws(t, e), t.type = e = yr(e), t = bs(null, t, e, r, n));
					else {
						if (e != null) {
							if (i = e.$$typeof, i === Lf) {
								t.tag = 11, t.type = e = br(e), t = us(null, t, e, r, n);
								break a;
							} else if (i === Bf) {
								t.tag = 14, t = ds(null, t, e, r, n);
								break a;
							}
						}
						throw t = "", typeof e == "object" && e && e.$$typeof === Vf && (t = " Did you wrap a component in React.lazy() more than once?"), n = ae(e) || e, Error("Element type is invalid. Received a promise that resolves to: " + n + ". Lazy element type must resolve to a class or function." + t);
					}
					return t;
				case 0: return bs(e, t, t.type, t.pendingProps, n);
				case 1: return r = t.type, i = $o(r, t.pendingProps), Ss(e, t, r, i, n);
				case 3:
					a: {
						if (ue(t, t.stateNode.containerInfo), e === null) throw Error("Should have a current fiber. This is a bug in React.");
						r = t.pendingProps;
						var a = t.memoizedState;
						i = a.element, ra(e, t), k(t, r, null, n);
						var o = t.memoizedState;
						if (r = o.cache, ei(t, m_, r), r !== a.cache && ri(t, [m_], n, !0), sa(), r = o.element, a.isDehydrated) if (a = {
							element: r,
							isDehydrated: !1,
							cache: o.cache
						}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
							t = Cs(e, t, r, n);
							break a;
						} else if (r !== i) {
							i = Pr(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t), Zr(i), t = Cs(e, t, r, n);
							break a;
						} else {
							switch (e = t.stateNode.containerInfo, e.nodeType) {
								case 9:
									e = e.body;
									break;
								default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
							}
							for (Qg = _d(e.firstChild), Zg = t, $g = !0, n_ = null, e_ = !1, t_ = null, r_ = !0, n = Zv(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
						}
						else {
							if (Yr(), r === i) {
								t = Ns(e, t, n);
								break a;
							}
							ls(e, t, r, n);
						}
						t = t.child;
					}
					return t;
				case 26: return ys(e, t), e === null ? (n = Ad(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : $g || (n = t.type, e = t.pendingProps, r = le(ep.current), r = zu(r).createElement(n), r[Gp] = t, r[Kp] = e, Tu(r, n, e), nt(r), t.stateNode = r) : t.memoizedState = Ad(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
				case 27: return de(t), e === null && $g && (r = le(ep.current), i = T(), r = t.stateNode = Td(t.type, t.pendingProps, r, i, !1), e_ || (i = Fu(r, t.type, t.pendingProps, i), i !== null && (Hr(t, 0).serverProps = i)), Zg = t, r_ = !0, i = Qg, $u(t.type) ? (nC = i, Qg = _d(r.firstChild)) : Qg = i), ls(e, t, t.pendingProps.children, n), ys(e, t), e === null && (t.flags |= 4194304), t.child;
				case 5: return e === null && $g && (a = T(), r = Xt(t.type, a.ancestorInfo), i = Qg, (o = !i) || (o = dd(i, t.type, t.pendingProps, r_), o === null ? a = !1 : (t.stateNode = o, e_ || (a = Fu(o, t.type, t.pendingProps, a), a !== null && (Hr(t, 0).serverProps = a)), Zg = t, Qg = _d(o.firstChild), r_ = !1, a = !0), o = !a), o && (r && Wr(t, i), Gr(t))), de(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, r = a.children, Hu(i, a) ? r = null : o !== null && Hu(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = wa(e, t, M, null, null, n), bC._currentValue = i), ys(e, t), ls(e, t, r, n), t.child;
				case 6: return e === null && $g && (n = t.pendingProps, e = T(), r = e.ancestorInfo.current, n = r == null || Zt(n, r.tag, e.ancestorInfo.implicitRootScope), e = Qg, (r = !e) || (r = fd(e, t.pendingProps, r_), r === null ? r = !1 : (t.stateNode = r, Zg = t, Qg = null, r = !0), r = !r), r && (n && Wr(t, e), Gr(t))), null;
				case 13: return Ds(e, t, n);
				case 4: return ue(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Xv(t, null, r, n) : ls(e, t, r, n), t.child;
				case 11: return us(e, t, t.type, t.pendingProps, n);
				case 7: return ls(e, t, t.pendingProps, n), t.child;
				case 8: return ls(e, t, t.pendingProps.children, n), t.child;
				case 12: return t.flags |= 4, t.flags |= 2048, r = t.stateNode, r.effectDuration = -0, r.passiveEffectDuration = -0, ls(e, t, t.pendingProps.children, n), t.child;
				case 10: return r = t.type, i = t.pendingProps, a = i.value, "value" in i || hb || (hb = !0, console.error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?")), ei(t, r, a), ls(e, t, i.children, n), t.child;
				case 9: return i = t.type._context, r = t.pendingProps.children, typeof r != "function" && console.error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), oi(t), i = si(i), r = bv(r, i, void 0), t.flags |= 1, ls(e, t, r, n), t.child;
				case 14: return ds(e, t, t.type, t.pendingProps, n);
				case 15: return fs(e, t, t.type, t.pendingProps, n);
				case 19: return Ms(e, t, n);
				case 31: return vs(e, t, n);
				case 22: return ps(e, t, n, t.pendingProps);
				case 24: return oi(t), r = si(m_), e === null ? (i = Fi(), i === null && (i = Wb, a = ui(), i.pooledCache = a, di(a), a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
					parent: r,
					cache: i
				}, na(t), ei(t, m_, i)) : ((e.lanes & n) !== 0 && (ra(e, t), k(t, null, null, n), sa()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, ei(t, m_, r), r !== i.cache && ri(t, [m_], n, !0)) : (i = {
					parent: r,
					cache: r
				}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), ei(t, m_, r))), ls(e, t, t.pendingProps.children, n), t.child;
				case 29: throw t.pendingProps;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function Rs(e) {
			e.flags |= 4;
		}
		function zs(e, t, n, r, i) {
			if ((t = (e.mode & zg) !== G) && (t = !1), t) {
				if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
				else if (dl()) e.flags |= 8192;
				else throw Vv = Bv, Rv;
			} else e.flags &= -16777217;
		}
		function Bs(e, t) {
			if (t.type !== "stylesheet" || (t.state.loading & sC) !== rC) e.flags &= -16777217;
			else if (e.flags |= 16777216, !Wd(t)) if (dl()) e.flags |= 8192;
			else throw Vv = Bv, Rv;
		}
		function Vs(e, t) {
			t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Re(), e.lanes |= t, fx |= t);
		}
		function Hs(e, t) {
			if (!$g) switch (e.tailMode) {
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
		function Us(e) {
			var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
			if (t) if ((e.mode & K) !== G) {
				for (var i = e.selfBaseDuration, a = e.child; a !== null;) n |= a.lanes | a.childLanes, r |= a.subtreeFlags & 65011712, r |= a.flags & 65011712, i += a.treeBaseDuration, a = a.sibling;
				e.treeBaseDuration = i;
			} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
			else if ((e.mode & K) !== G) {
				i = e.actualDuration, a = e.selfBaseDuration;
				for (var o = e.child; o !== null;) n |= o.lanes | o.childLanes, r |= o.subtreeFlags, r |= o.flags, i += o.actualDuration, a += o.treeBaseDuration, o = o.sibling;
				e.actualDuration = i, e.treeBaseDuration = a;
			} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
			return e.subtreeFlags |= r, e.childLanes = n, t;
		}
		function Ws(e, t, n) {
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
				case 14: return Us(t), null;
				case 1: return Us(t), null;
				case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ti(m_, t), w(t), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Jr(t) ? (Qr(), Rs(t)) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Xr())), Us(t), null;
				case 26:
					var i = t.type, a = t.memoizedState;
					return e === null ? (Rs(t), a === null ? (Us(t), zs(t, i, null, r, n)) : (Us(t), Bs(t, a))) : a ? a === e.memoizedState ? (Us(t), t.flags &= -16777217) : (Rs(t), Us(t), Bs(t, a)) : (e = e.memoizedProps, e !== r && Rs(t), Us(t), zs(t, i, e, r, n)), null;
				case 27:
					if (fe(t), n = le(ep.current), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Rs(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return Us(t), null;
						}
						e = T(), Jr(t) ? Kr(t, e) : (e = Td(i, r, n, e, !0), t.stateNode = e, Rs(t));
					}
					return Us(t), null;
				case 5:
					if (fe(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Rs(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return Us(t), null;
						}
						var o = T();
						if (Jr(t)) Kr(t, o);
						else {
							switch (a = le(ep.current), Xt(i, o.ancestorInfo), o = o.context, a = zu(a), o) {
								case WS:
									a = a.createElementNS(Fm, i);
									break;
								case GS:
									a = a.createElementNS(Pm, i);
									break;
								default: switch (i) {
									case "svg":
										a = a.createElementNS(Fm, i);
										break;
									case "math":
										a = a.createElementNS(Pm, i);
										break;
									case "script":
										a = a.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild);
										break;
									case "select":
										a = typeof r.is == "string" ? a.createElement("select", { is: r.is }) : a.createElement("select"), r.multiple ? a.multiple = !0 : r.size && (a.size = r.size);
										break;
									default: a = typeof r.is == "string" ? a.createElement(i, { is: r.is }) : a.createElement(i), i.indexOf("-") === -1 && (i !== i.toLowerCase() && console.error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", i), Object.prototype.toString.call(a) !== "[object HTMLUnknownElement]" || gp.call(JS, i) || (JS[i] = !0, console.error("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", i)));
								}
							}
							a[Gp] = t, a[Kp] = r;
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
							a: switch (Tu(a, i, r), i) {
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
							r && Rs(t);
						}
					}
					return Us(t), zs(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
				case 6:
					if (e && t.stateNode != null) e.memoizedProps !== r && Rs(t);
					else {
						if (typeof r != "string" && t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
						if (e = le(ep.current), n = T(), Jr(t)) {
							if (e = t.stateNode, n = t.memoizedProps, i = !e_, r = null, a = Zg, a !== null) switch (a.tag) {
								case 3:
									i && (i = yd(e, n, r), i !== null && (Hr(t, 0).serverProps = i));
									break;
								case 27:
								case 5: r = a.memoizedProps, i && (i = yd(e, n, r), i !== null && (Hr(t, 0).serverProps = i));
							}
							e[Gp] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Su(e.nodeValue, n)), e || Gr(t, !0);
						} else i = n.ancestorInfo.current, i != null && Zt(r, i.tag, n.ancestorInfo.implicitRootScope), e = zu(e).createTextNode(r), e[Gp] = t, t.stateNode = e;
					}
					return Us(t), null;
				case 31:
					if (n = t.memoizedState, e === null || e.memoizedState !== null) {
						if (r = Jr(t), n !== null) {
							if (e === null) {
								if (!r) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue.");
								e[Gp] = t, Us(t), (t.mode & K) !== G && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							} else Qr(), Yr(), !(t.flags & 128) && (n = t.memoizedState = null), t.flags |= 4, Us(t), (t.mode & K) !== G && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							e = !1;
						} else n = Xr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
						if (!e) return t.flags & 256 ? (va(t), t) : (va(t), null);
						if (t.flags & 128) throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
					}
					return Us(t), null;
				case 13:
					if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
						if (i = r, a = Jr(t), i !== null && i.dehydrated !== null) {
							if (e === null) {
								if (!a) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
								a[Gp] = t, Us(t), (t.mode & K) !== G && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							} else Qr(), Yr(), !(t.flags & 128) && (i = t.memoizedState = null), t.flags |= 4, Us(t), (t.mode & K) !== G && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							i = !1;
						} else i = Xr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
						if (!i) return t.flags & 256 ? (va(t), t) : (va(t), null);
					}
					return va(t), t.flags & 128 ? (t.lanes = n, (t.mode & K) !== G && ji(t), t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Vs(t, t.updateQueue), Us(t), (t.mode & K) !== G && n && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
				case 4: return w(t), e === null && lu(t.stateNode.containerInfo), Us(t), null;
				case 10: return ti(t.type, t), Us(t), null;
				case 19:
					if (ce(fy, t), r = t.memoizedState, r === null) return Us(t), null;
					if (i = (t.flags & 128) != 0, a = r.rendering, a === null) if (i) Hs(r, !1);
					else {
						if (sx !== Ib || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (a = ya(e), a !== null) {
								for (t.flags |= 128, Hs(r, !1), e = a.updateQueue, t.updateQueue = e, Vs(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Dr(n, e), n = n.sibling;
								return C(fy, fy.current & uy | dy, t), $g && Fr(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && xp() > yx && (t.flags |= 128, i = !0, Hs(r, !1), t.lanes = 4194304);
					}
					else {
						if (!i) if (e = ya(a), e !== null) {
							if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Vs(t, e), Hs(r, !0), r.tail === null && r.tailMode === "hidden" && !a.alternate && !$g) return Us(t), null;
						} else 2 * xp() - r.renderingStartTime > yx && n !== 536870912 && (t.flags |= 128, i = !0, Hs(r, !1), t.lanes = 4194304);
						r.isBackwards ? (a.sibling = t.child, t.child = a) : (e = r.last, e === null ? t.child = a : e.sibling = a, r.last = a);
					}
					return r.tail === null ? (Us(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = xp(), e.sibling = null, n = fy.current, n = i ? n & uy | dy : n & uy, C(fy, n, t), $g && Fr(t, r.treeForkCount), e);
				case 22:
				case 23: return va(t), pa(t), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Us(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Us(t), n = t.updateQueue, n !== null && Vs(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && ce(cv, t), null;
				case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ti(m_, t), Us(t), null;
				case 25: return null;
				case 30: return null;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function Gs(e, t) {
			switch (Rr(t), t.tag) {
				case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && ji(t), t) : null;
				case 3: return ti(m_, t), w(t), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
				case 26:
				case 27:
				case 5: return fe(t), null;
				case 31:
					if (t.memoizedState !== null) {
						if (va(t), t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						Yr();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && ji(t), t) : null;
				case 13:
					if (va(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
						if (t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						Yr();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && ji(t), t) : null;
				case 19: return ce(fy, t), null;
				case 4: return w(t), null;
				case 10: return ti(t.type, t), null;
				case 22:
				case 23: return va(t), pa(t), e !== null && ce(cv, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && ji(t), t) : null;
				case 24: return ti(m_, t), null;
				case 25: return null;
				default: return null;
			}
		}
		function Ks(e, t) {
			switch (Rr(t), t.tag) {
				case 3:
					ti(m_, t), w(t);
					break;
				case 26:
				case 27:
				case 5:
					fe(t);
					break;
				case 4:
					w(t);
					break;
				case 31:
					t.memoizedState !== null && va(t);
					break;
				case 13:
					va(t);
					break;
				case 19:
					ce(fy, t);
					break;
				case 10:
					ti(t.type, t);
					break;
				case 22:
				case 23:
					va(t), pa(t), e !== null && ce(cv, t);
					break;
				case 24: ti(m_, t);
			}
		}
		function qs(e) {
			return (e.mode & K) !== G;
		}
		function Js(e, t) {
			qs(e) ? (Ai(), Xs(t, e), Oi()) : Xs(t, e);
		}
		function Ys(e, t, n) {
			qs(e) ? (Ai(), Zs(n, e, t), Oi()) : Zs(n, e, t);
		}
		function Xs(e, t) {
			try {
				var n = t.updateQueue, r = n === null ? null : n.lastEffect;
				if (r !== null) {
					var i = r.next;
					n = i;
					do {
						if ((n.tag & e) === e && (r = void 0, (e & hy) !== py && ($x = !0), r = E(t, Mv, n), (e & hy) !== py && ($x = !1), r !== void 0 && typeof r != "function")) {
							var a = void 0;
							a = (n.tag & gy) === 0 ? (n.tag & hy) === 0 ? "useEffect" : "useInsertionEffect" : "useLayoutEffect";
							var o = void 0;
							o = r === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof r.then == "function" ? "\n\nIt looks like you wrote " + a + "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n" + a + "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching" : " You returned: " + r, E(t, function(e, t) {
								console.error("%s must not return anything besides a function, which is used for clean-up.%s", e, t);
							}, a, o);
						}
						n = n.next;
					} while (n !== i);
				}
			} catch (e) {
				Fl(t, t.return, e);
			}
		}
		function Zs(e, t, n) {
			try {
				var r = t.updateQueue, i = r === null ? null : r.lastEffect;
				if (i !== null) {
					var a = i.next;
					r = a;
					do {
						if ((r.tag & e) === e) {
							var o = r.inst, s = o.destroy;
							s !== void 0 && (o.destroy = void 0, (e & hy) !== py && ($x = !0), i = t, E(i, Pv, i, n, s), (e & hy) !== py && ($x = !1));
						}
						r = r.next;
					} while (r !== a);
				}
			} catch (e) {
				Fl(t, t.return, e);
			}
		}
		function Qs(e, t) {
			qs(e) ? (Ai(), Xs(t, e), Oi()) : Xs(t, e);
		}
		function $s(e, t, n) {
			qs(e) ? (Ai(), Zs(n, e, t), Oi()) : Zs(n, e, t);
		}
		function ec(e) {
			var t = e.updateQueue;
			if (t !== null) {
				var n = e.stateNode;
				e.type.defaultProps || "ref" in e.memoizedProps || db || (n.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", S(e) || "instance"), n.state !== e.memoizedState && console.error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", S(e) || "instance"));
				try {
					E(e, ua, t, n);
				} catch (t) {
					Fl(e, e.return, t);
				}
			}
		}
		function tc(e, t, n) {
			return e.getSnapshotBeforeUpdate(t, n);
		}
		function nc(e, t) {
			var n = t.memoizedProps, r = t.memoizedState;
			t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || db || (t.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", S(e) || "instance"), t.state !== e.memoizedState && console.error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", S(e) || "instance"));
			try {
				var i = $o(e.type, n), a = E(e, tc, t, i, r);
				n = gb, a !== void 0 || n.has(e.type) || (n.add(e.type), E(e, function() {
					console.error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", S(e));
				})), t.__reactInternalSnapshotBeforeUpdate = a;
			} catch (t) {
				Fl(e, e.return, t);
			}
		}
		function rc(e, t, n) {
			n.props = $o(e.type, e.memoizedProps), n.state = e.memoizedState, qs(e) ? (Ai(), E(e, Av, e, t, n), Oi()) : E(e, Av, e, t, n);
		}
		function ic(e) {
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
				if (typeof t == "function") if (qs(e)) try {
					Ai(), e.refCleanup = t(n);
				} finally {
					Oi();
				}
				else e.refCleanup = t(n);
				else typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", S(e)), t.current = n;
			}
		}
		function ac(e, t) {
			try {
				E(e, ic, e);
			} catch (n) {
				Fl(e, t, n);
			}
		}
		function oc(e, t) {
			var n = e.ref, r = e.refCleanup;
			if (n !== null) if (typeof r == "function") try {
				if (qs(e)) try {
					Ai(), E(e, r);
				} finally {
					Oi(e);
				}
				else E(e, r);
			} catch (n) {
				Fl(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				if (qs(e)) try {
					Ai(), E(e, n, null);
				} finally {
					Oi(e);
				}
				else E(e, n, null);
			} catch (n) {
				Fl(e, t, n);
			}
			else n.current = null;
		}
		function sc(e, t, n, r) {
			var i = e.memoizedProps, a = i.id, o = i.onCommit;
			i = i.onRender, t = t === null ? "mount" : "update", tv && (t = "nested-update"), typeof i == "function" && i(a, t, e.actualDuration, e.treeBaseDuration, e.actualStartTime, n), typeof o == "function" && o(a, t, r, n);
		}
		function cc(e, t, n, r) {
			var i = e.memoizedProps;
			e = i.id, i = i.onPostCommit, t = t === null ? "mount" : "update", tv && (t = "nested-update"), typeof i == "function" && i(e, t, r, n);
		}
		function lc(e) {
			var t = e.type, n = e.memoizedProps, r = e.stateNode;
			try {
				E(e, qu, r, t, n, e);
			} catch (t) {
				Fl(e, e.return, t);
			}
		}
		function uc(e, t, n) {
			try {
				E(e, Yu, e.stateNode, e.type, n, t, e);
			} catch (t) {
				Fl(e, e.return, t);
			}
		}
		function dc(e) {
			return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && $u(e.type) || e.tag === 4;
		}
		function fc(e) {
			a: for (;;) {
				for (; e.sibling === null;) {
					if (e.return === null || dc(e.return)) return null;
					e = e.return;
				}
				for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
					if (e.tag === 27 && $u(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
					e.child.return = e, e = e.child;
				}
				if (!(e.flags & 2)) return e.stateNode;
			}
		}
		function pc(e, t, n) {
			var r = e.tag;
			if (r === 5 || r === 6) e = e.stateNode, t ? (Qu(n), (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t)) : (Qu(n), t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = un));
			else if (r !== 4 && (r === 27 && $u(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (pc(e, t, n), e = e.sibling; e !== null;) pc(e, t, n), e = e.sibling;
		}
		function mc(e, t, n) {
			var r = e.tag;
			if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
			else if (r !== 4 && (r === 27 && $u(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (mc(e, t, n), e = e.sibling; e !== null;) mc(e, t, n), e = e.sibling;
		}
		function hc(e) {
			for (var t, n = e.return; n !== null;) {
				if (dc(n)) {
					t = n;
					break;
				}
				n = n.return;
			}
			if (t == null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
			switch (t.tag) {
				case 27:
					t = t.stateNode, n = fc(e), mc(e, n, t);
					break;
				case 5:
					n = t.stateNode, t.flags & 32 && (Xu(n), t.flags &= -33), t = fc(e), mc(e, t, n);
					break;
				case 3:
				case 4:
					t = t.stateNode.containerInfo, n = fc(e), pc(e, n, t);
					break;
				default: throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
			}
		}
		function gc(e) {
			var t = e.stateNode, n = e.memoizedProps;
			try {
				E(e, Ed, e.type, n, t, e);
			} catch (t) {
				Fl(e, e.return, t);
			}
		}
		function _c(e, t) {
			return t.tag === 31 ? (t = t.memoizedState, e.memoizedState !== null && t === null) : t.tag === 13 ? (e = e.memoizedState, t = t.memoizedState, e !== null && e.dehydrated !== null && (t === null || t.dehydrated === null)) : t.tag === 3 && e.memoizedState.isDehydrated && (t.flags & 256) == 0;
		}
		function vc(e, t) {
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
			}, LC = !1, xb = t; xb !== null;) if (t = xb, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, xb = e;
			else for (; xb !== null;) {
				switch (e = t = xb, n = e.alternate, i = e.flags, e.tag) {
					case 0:
						if (i & 4 && (e = e.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) i = e[n], i.ref.impl = i.nextImpl;
						break;
					case 11:
					case 15: break;
					case 1:
						i & 1024 && n !== null && nc(e, n);
						break;
					case 3:
						if (i & 1024) {
							if (e = e.stateNode.containerInfo, n = e.nodeType, n === 9) ud(e);
							else if (n === 1) switch (e.nodeName) {
								case "HEAD":
								case "HTML":
								case "BODY":
									ud(e);
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
					e.return = t.return, xb = e;
					break;
				}
				xb = t.return;
			}
		}
		function yc(e, t, n) {
			var r = yi(), i = xi(), a = Ci(), o = wi(), s = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					jc(e, n), s & 4 && Js(n, gy | my);
					break;
				case 1:
					if (jc(e, n), s & 4) if (e = n.stateNode, t === null) n.type.defaultProps || "ref" in n.memoizedProps || db || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", S(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", S(n) || "instance")), qs(n) ? (Ai(), E(n, wv, n, e), Oi()) : E(n, wv, n, e);
					else {
						var c = $o(n.type, t.memoizedProps);
						t = t.memoizedState, n.type.defaultProps || "ref" in n.memoizedProps || db || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", S(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", S(n) || "instance")), qs(n) ? (Ai(), E(n, Ev, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate), Oi()) : E(n, Ev, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate);
					}
					s & 64 && ec(n), s & 512 && ac(n, n.return);
					break;
				case 3:
					if (t = hi(), jc(e, n), s & 64 && (s = n.updateQueue, s !== null)) {
						if (c = null, n.child !== null) switch (n.child.tag) {
							case 27:
							case 5:
								c = n.child.stateNode;
								break;
							case 1: c = n.child.stateNode;
						}
						try {
							E(n, ua, s, c);
						} catch (e) {
							Fl(n, n.return, e);
						}
					}
					e.effectDuration += gi(t);
					break;
				case 27: t === null && s & 4 && gc(n);
				case 26:
				case 5:
					if (jc(e, n), t === null) {
						if (s & 4) lc(n);
						else if (s & 64) {
							e = n.type, t = n.memoizedProps, c = n.stateNode;
							try {
								E(n, Ju, c, e, t, n);
							} catch (e) {
								Fl(n, n.return, e);
							}
						}
					}
					s & 512 && ac(n, n.return);
					break;
				case 12:
					if (s & 4) {
						s = hi(), jc(e, n), e = n.stateNode, e.effectDuration += _i(s);
						try {
							E(n, sc, n, t, b_, e.effectDuration);
						} catch (e) {
							Fl(n, n.return, e);
						}
					} else jc(e, n);
					break;
				case 31:
					jc(e, n), s & 4 && Cc(e, n);
					break;
				case 13:
					jc(e, n), s & 4 && wc(e, n), s & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (s = zl.bind(null, n), gd(e, s))));
					break;
				case 22:
					if (s = n.memoizedState !== null || _b, !s) {
						t = t !== null && t.memoizedState !== null || vb, c = _b;
						var l = vb;
						_b = s, (vb = t) && !l ? (Fc(e, n, (n.subtreeFlags & 8772) != 0), (n.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && tr(n, q, J)) : jc(e, n), _b = c, vb = l;
					}
					break;
				case 30: break;
				default: jc(e, n);
			}
			(n.mode & K) !== G && 0 <= q && 0 <= J && ((D_ || .05 < T_) && ir(n, q, J, T_, E_), n.alternate === null && n.return !== null && n.return.alternate !== null && .05 < J - q && (_c(n.return.alternate, n.return) || er(n, q, J, "Mount"))), bi(r), Si(i), E_ = a, D_ = o;
		}
		function bc(e) {
			var t = e.alternate;
			t !== null && (e.alternate = null, bc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ze(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
		}
		function xc(e, t, n) {
			for (n = n.child; n !== null;) Sc(e, t, n), n = n.sibling;
		}
		function Sc(e, t, n) {
			if (jp && typeof jp.onCommitFiberUnmount == "function") try {
				jp.onCommitFiberUnmount(Ap, n);
			} catch (e) {
				Mp || (Mp = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			var r = yi(), i = xi(), a = Ci(), o = wi();
			switch (n.tag) {
				case 26:
					vb || oc(n, t), xc(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (e = n.stateNode, e.parentNode.removeChild(e));
					break;
				case 27:
					vb || oc(n, t);
					var s = wb, c = Tb;
					$u(n.type) && (wb = n.stateNode, Tb = !1), xc(e, t, n), E(n, Dd, n.stateNode), wb = s, Tb = c;
					break;
				case 5: vb || oc(n, t);
				case 6:
					if (s = wb, c = Tb, wb = null, xc(e, t, n), wb = s, Tb = c, wb !== null) if (Tb) try {
						E(n, td, wb, n.stateNode);
					} catch (e) {
						Fl(n, t, e);
					}
					else try {
						E(n, ed, wb, n.stateNode);
					} catch (e) {
						Fl(n, t, e);
					}
					break;
				case 18:
					wb !== null && (Tb ? (e = wb, nd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), xf(e)) : nd(wb, n.stateNode));
					break;
				case 4:
					s = wb, c = Tb, wb = n.stateNode.containerInfo, Tb = !0, xc(e, t, n), wb = s, Tb = c;
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					Zs(hy, n, t), vb || Ys(n, t, gy), xc(e, t, n);
					break;
				case 1:
					vb || (oc(n, t), s = n.stateNode, typeof s.componentWillUnmount == "function" && rc(n, t, s)), xc(e, t, n);
					break;
				case 21:
					xc(e, t, n);
					break;
				case 22:
					vb = (s = vb) || n.memoizedState !== null, xc(e, t, n), vb = s;
					break;
				default: xc(e, t, n);
			}
			(n.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && ir(n, q, J, T_, E_), bi(r), Si(i), E_ = a, D_ = o;
		}
		function Cc(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
				e = e.dehydrated;
				try {
					E(t, Cd, e);
				} catch (e) {
					Fl(t, t.return, e);
				}
			}
		}
		function wc(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
				E(t, wd, e);
			} catch (e) {
				Fl(t, t.return, e);
			}
		}
		function Tc(e) {
			switch (e.tag) {
				case 31:
				case 13:
				case 19:
					var t = e.stateNode;
					return t === null && (t = e.stateNode = new bb()), t;
				case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new bb()), t;
				default: throw Error("Unexpected Suspense handler tag (" + e.tag + "). This is a bug in React.");
			}
		}
		function Ec(e, t) {
			var n = Tc(e);
			t.forEach(function(t) {
				if (!n.has(t)) {
					if (n.add(t), Np) if (Sb !== null && Cb !== null) Gl(Cb, Sb);
					else throw Error("Expected finished root and lanes to be set. This is a bug in React.");
					var r = Bl.bind(null, e, t);
					t.then(r, r);
				}
			});
		}
		function Dc(e, t) {
			var n = t.deletions;
			if (n !== null) for (var r = 0; r < n.length; r++) {
				var i = e, a = t, o = n[r], s = yi(), c = a;
				a: for (; c !== null;) {
					switch (c.tag) {
						case 27:
							if ($u(c.type)) {
								wb = c.stateNode, Tb = !1;
								break a;
							}
							break;
						case 5:
							wb = c.stateNode, Tb = !1;
							break a;
						case 3:
						case 4:
							wb = c.stateNode.containerInfo, Tb = !0;
							break a;
					}
					c = c.return;
				}
				if (wb === null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
				Sc(i, a, o), wb = null, Tb = !1, (o.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && er(o, q, J, "Unmount"), bi(s), i = o, a = i.alternate, a !== null && (a.return = null), i.return = null;
			}
			if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Oc(t, e), t = t.sibling;
		}
		function Oc(e, t) {
			var n = yi(), r = xi(), i = Ci(), a = wi(), o = e.alternate, s = e.flags;
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Dc(t, e), kc(e), s & 4 && (Zs(hy | my, e, e.return), Xs(hy | my, e), Ys(e, e.return, gy | my));
					break;
				case 1:
					if (Dc(t, e), kc(e), s & 512 && (vb || o === null || oc(o, o.return)), s & 64 && _b && (s = e.updateQueue, s !== null && (o = s.callbacks, o !== null))) {
						var c = s.shared.hiddenCallbacks;
						s.shared.hiddenCallbacks = c === null ? o : c.concat(o);
					}
					break;
				case 26:
					if (c = Eb, Dc(t, e), kc(e), s & 512 && (vb || o === null || oc(o, o.return)), s & 4) {
						var l = o === null ? null : o.memoizedState;
						if (s = e.memoizedState, o === null) if (s === null) if (e.stateNode === null) {
							a: {
								s = e.type, o = e.memoizedProps, c = c.ownerDocument || c;
								b: switch (s) {
									case "title":
										l = c.getElementsByTagName("title")[0], (!l || l[Qp] || l[Gp] || l.namespaceURI === Fm || l.hasAttribute("itemprop")) && (l = c.createElement(s), c.head.insertBefore(l, c.querySelector("head > title"))), Tu(l, s, o), l[Gp] = e, nt(l), s = l;
										break a;
									case "link":
										var u = Vd("link", "href", c).get(s + (o.href || ""));
										if (u) {
											for (var d = 0; d < u.length; d++) if (l = u[d], l.getAttribute("href") === (o.href == null || o.href === "" ? null : o.href) && l.getAttribute("rel") === (o.rel == null ? null : o.rel) && l.getAttribute("title") === (o.title == null ? null : o.title) && l.getAttribute("crossorigin") === (o.crossOrigin == null ? null : o.crossOrigin)) {
												u.splice(d, 1);
												break b;
											}
										}
										l = c.createElement(s), Tu(l, s, o), c.head.appendChild(l);
										break;
									case "meta":
										if (u = Vd("meta", "content", c).get(s + (o.content || ""))) {
											for (d = 0; d < u.length; d++) if (l = u[d], Oe(o.content, "content"), l.getAttribute("content") === (o.content == null ? null : "" + o.content) && l.getAttribute("name") === (o.name == null ? null : o.name) && l.getAttribute("property") === (o.property == null ? null : o.property) && l.getAttribute("http-equiv") === (o.httpEquiv == null ? null : o.httpEquiv) && l.getAttribute("charset") === (o.charSet == null ? null : o.charSet)) {
												u.splice(d, 1);
												break b;
											}
										}
										l = c.createElement(s), Tu(l, s, o), c.head.appendChild(l);
										break;
									default: throw Error("getNodesForType encountered a type it did not expect: \"" + s + "\". This is a bug in React.");
								}
								l[Gp] = e, nt(l), s = l;
							}
							e.stateNode = s;
						} else Hd(c, e.type, e.stateNode);
						else e.stateNode = Ld(c, s, e.memoizedProps);
						else l === s ? s === null && e.stateNode !== null && uc(e, e.memoizedProps, o.memoizedProps) : (l === null ? o.stateNode !== null && (o = o.stateNode, o.parentNode.removeChild(o)) : l.count--, s === null ? Hd(c, e.type, e.stateNode) : Ld(c, s, e.memoizedProps));
					}
					break;
				case 27:
					Dc(t, e), kc(e), s & 512 && (vb || o === null || oc(o, o.return)), o !== null && s & 4 && uc(e, e.memoizedProps, o.memoizedProps);
					break;
				case 5:
					if (Dc(t, e), kc(e), s & 512 && (vb || o === null || oc(o, o.return)), e.flags & 32) {
						c = e.stateNode;
						try {
							E(e, Xu, c);
						} catch (t) {
							Fl(e, e.return, t);
						}
					}
					s & 4 && e.stateNode != null && (c = e.memoizedProps, uc(e, c, o === null ? c : o.memoizedProps)), s & 1024 && (yb = !0, e.type !== "form" && console.error("Unexpected host component type. Expected a form. This is a bug in React."));
					break;
				case 6:
					if (Dc(t, e), kc(e), s & 4) {
						if (e.stateNode === null) throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
						s = e.memoizedProps, o = o === null ? s : o.memoizedProps, c = e.stateNode;
						try {
							E(e, Zu, c, o, s);
						} catch (t) {
							Fl(e, e.return, t);
						}
					}
					break;
				case 3:
					if (c = hi(), fC = null, l = Eb, Eb = Od(t.containerInfo), Dc(t, e), Eb = l, kc(e), s & 4 && o !== null && o.memoizedState.isDehydrated) try {
						E(e, Sd, t.containerInfo);
					} catch (t) {
						Fl(e, e.return, t);
					}
					yb && (yb = !1, Ac(e)), t.effectDuration += gi(c);
					break;
				case 4:
					s = Eb, Eb = Od(e.stateNode.containerInfo), Dc(t, e), kc(e), Eb = s;
					break;
				case 12:
					s = hi(), Dc(t, e), kc(e), e.stateNode.effectDuration += _i(s);
					break;
				case 31:
					Dc(t, e), kc(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Ec(e, s)));
					break;
				case 13:
					Dc(t, e), kc(e), e.child.flags & 8192 && e.memoizedState !== null != (o !== null && o.memoizedState !== null) && (gx = xp()), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Ec(e, s)));
					break;
				case 22:
					c = e.memoizedState !== null;
					var f = o !== null && o.memoizedState !== null, p = _b, m = vb;
					if (_b = p || c, vb = m || f, Dc(t, e), vb = m, _b = p, f && !c && !p && !m && (e.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && tr(e, q, J), kc(e), s & 8192) a: for (t = e.stateNode, t._visibility = c ? t._visibility & ~Og : t._visibility | Og, !c || o === null || f || _b || vb || (Nc(e), (e.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && er(e, q, J, "Disconnect")), o = null, t = e;;) {
						if (t.tag === 5 || t.tag === 26) {
							if (o === null) {
								f = o = t;
								try {
									l = f.stateNode, c ? E(f, ad, l) : E(f, cd, f.stateNode, f.memoizedProps);
								} catch (e) {
									Fl(f, f.return, e);
								}
							}
						} else if (t.tag === 6) {
							if (o === null) {
								f = t;
								try {
									u = f.stateNode, c ? E(f, od, u) : E(f, ld, u, f.memoizedProps);
								} catch (e) {
									Fl(f, f.return, e);
								}
							}
						} else if (t.tag === 18) {
							if (o === null) {
								f = t;
								try {
									d = f.stateNode, c ? E(f, id, d) : E(f, sd, f.stateNode);
								} catch (e) {
									Fl(f, f.return, e);
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
					s & 4 && (s = e.updateQueue, s !== null && (o = s.retryQueue, o !== null && (s.retryQueue = null, Ec(e, o))));
					break;
				case 19:
					Dc(t, e), kc(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Ec(e, s)));
					break;
				case 30: break;
				case 21: break;
				default: Dc(t, e), kc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && ((D_ || .05 < T_) && ir(e, q, J, T_, E_), e.alternate === null && e.return !== null && e.return.alternate !== null && .05 < J - q && (_c(e.return.alternate, e.return) || er(e, q, J, "Mount"))), bi(n), Si(r), E_ = i, D_ = a;
		}
		function kc(e) {
			var t = e.flags;
			if (t & 2) {
				try {
					E(e, hc, e);
				} catch (t) {
					Fl(e, e.return, t);
				}
				e.flags &= -3;
			}
			t & 4096 && (e.flags &= -4097);
		}
		function Ac(e) {
			if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
				var t = e;
				Ac(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
			}
		}
		function jc(e, t) {
			if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) yc(e, t.alternate, t), t = t.sibling;
		}
		function Mc(e) {
			var t = yi(), n = xi(), r = Ci(), i = wi();
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Ys(e, e.return, gy), Nc(e);
					break;
				case 1:
					oc(e, e.return);
					var a = e.stateNode;
					typeof a.componentWillUnmount == "function" && rc(e, e.return, a), Nc(e);
					break;
				case 27: E(e, Dd, e.stateNode);
				case 26:
				case 5:
					oc(e, e.return), Nc(e);
					break;
				case 22:
					e.memoizedState === null && Nc(e);
					break;
				case 30:
					Nc(e);
					break;
				default: Nc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && ir(e, q, J, T_, E_), bi(t), Si(n), E_ = r, D_ = i;
		}
		function Nc(e) {
			for (e = e.child; e !== null;) Mc(e), e = e.sibling;
		}
		function Pc(e, t, n, r) {
			var i = yi(), a = xi(), o = Ci(), s = wi(), c = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Fc(e, n, r), Js(n, gy);
					break;
				case 1:
					if (Fc(e, n, r), t = n.stateNode, typeof t.componentDidMount == "function" && E(n, wv, n, t), t = n.updateQueue, t !== null) {
						e = n.stateNode;
						try {
							E(n, la, t, e);
						} catch (e) {
							Fl(n, n.return, e);
						}
					}
					r && c & 64 && ec(n), ac(n, n.return);
					break;
				case 27: gc(n);
				case 26:
				case 5:
					Fc(e, n, r), r && t === null && c & 4 && lc(n), ac(n, n.return);
					break;
				case 12:
					if (r && c & 4) {
						c = hi(), Fc(e, n, r), r = n.stateNode, r.effectDuration += _i(c);
						try {
							E(n, sc, n, t, b_, r.effectDuration);
						} catch (e) {
							Fl(n, n.return, e);
						}
					} else Fc(e, n, r);
					break;
				case 31:
					Fc(e, n, r), r && c & 4 && Cc(e, n);
					break;
				case 13:
					Fc(e, n, r), r && c & 4 && wc(e, n);
					break;
				case 22:
					n.memoizedState === null && Fc(e, n, r), ac(n, n.return);
					break;
				case 30: break;
				default: Fc(e, n, r);
			}
			(n.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && ir(n, q, J, T_, E_), bi(i), Si(a), E_ = o, D_ = s;
		}
		function Fc(e, t, n) {
			for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) Pc(e, t.alternate, t, n), t = t.sibling;
		}
		function Ic(e, t) {
			var n = null;
			e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && di(e), n != null && fi(n));
		}
		function Lc(e, t) {
			e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (di(t), e != null && fi(e));
		}
		function Rc(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (t = t.child; t !== null;) {
				var a = t.sibling;
				zc(e, t, n, r, a === null ? i : a.actualStartTime), t = a;
			}
		}
		function zc(e, t, n, r, i) {
			var a = yi(), o = xi(), s = Ci(), c = wi(), l = Sg, u = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(t.mode & K) !== G && 0 < t.actualStartTime && t.flags & 1 && nr(t, t.actualStartTime, i, Db, n), Rc(e, t, n, r, i), u & 2048 && Qs(t, _y | my);
					break;
				case 1:
					(t.mode & K) !== G && 0 < t.actualStartTime && (t.flags & 128 ? rr(t, t.actualStartTime, i, []) : t.flags & 1 && nr(t, t.actualStartTime, i, Db, n)), Rc(e, t, n, r, i);
					break;
				case 3:
					var d = hi(), f = Db;
					Db = t.alternate !== null && t.alternate.memoizedState.isDehydrated && (t.flags & 256) == 0, Rc(e, t, n, r, i), Db = f, u & 2048 && (n = null, t.alternate !== null && (n = t.alternate.memoizedState.cache), r = t.memoizedState.cache, r !== n && (di(r), n != null && fi(n))), e.passiveEffectDuration += gi(d);
					break;
				case 12:
					if (u & 2048) {
						u = hi(), Rc(e, t, n, r, i), e = t.stateNode, e.passiveEffectDuration += _i(u);
						try {
							E(t, cc, t, t.alternate, b_, e.passiveEffectDuration);
						} catch (e) {
							Fl(t, t.return, e);
						}
					} else Rc(e, t, n, r, i);
					break;
				case 31:
					u = Db, d = t.alternate === null ? null : t.alternate.memoizedState, f = t.memoizedState, d !== null && f === null ? (f = t.deletions, f !== null && 0 < f.length && f[0].tag === 18 ? (Db = !1, d = d.hydrationErrors, d !== null && rr(t, t.actualStartTime, i, d)) : Db = !0) : Db = !1, Rc(e, t, n, r, i), Db = u;
					break;
				case 13:
					u = Db, d = t.alternate === null ? null : t.alternate.memoizedState, f = t.memoizedState, d === null || d.dehydrated === null || f !== null && f.dehydrated !== null ? Db = !1 : (f = t.deletions, f !== null && 0 < f.length && f[0].tag === 18 ? (Db = !1, d = d.hydrationErrors, d !== null && rr(t, t.actualStartTime, i, d)) : Db = !0), Rc(e, t, n, r, i), Db = u;
					break;
				case 23: break;
				case 22:
					f = t.stateNode, d = t.alternate, t.memoizedState === null ? f._visibility & kg ? Rc(e, t, n, r, i) : (f._visibility |= kg, Bc(e, t, n, r, (t.subtreeFlags & 10256) != 0 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), i), (t.mode & K) === G || Db || (e = t.actualStartTime, 0 <= e && .05 < i - e && tr(t, e, i), 0 <= q && 0 <= J && .05 < J - q && tr(t, q, J))) : f._visibility & kg ? Rc(e, t, n, r, i) : Hc(e, t, n, r, i), u & 2048 && Ic(d, t);
					break;
				case 24:
					Rc(e, t, n, r, i), u & 2048 && Lc(t.alternate, t);
					break;
				default: Rc(e, t, n, r, i);
			}
			(t.mode & K) !== G && ((e = !Db && t.alternate === null && t.return !== null && t.return.alternate !== null) && (n = t.actualStartTime, 0 <= n && .05 < i - n && er(t, n, i, "Mount")), 0 <= q && 0 <= J && ((D_ || .05 < T_) && ir(t, q, J, T_, E_), e && .05 < J - q && er(t, q, J, "Mount"))), bi(a), Si(o), E_ = s, D_ = c, Sg = l;
		}
		function Bc(e, t, n, r, i, a) {
			for (i &&= (t.subtreeFlags & 10256) != 0 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), t = t.child; t !== null;) {
				var o = t.sibling;
				Vc(e, t, n, r, i, o === null ? a : o.actualStartTime), t = o;
			}
		}
		function Vc(e, t, n, r, i, a) {
			var o = yi(), s = xi(), c = Ci(), l = wi(), u = Sg;
			i && (t.mode & K) !== G && 0 < t.actualStartTime && t.flags & 1 && nr(t, t.actualStartTime, a, Db, n);
			var d = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					Bc(e, t, n, r, i, a), Qs(t, _y);
					break;
				case 23: break;
				case 22:
					var f = t.stateNode;
					t.memoizedState === null ? (f._visibility |= kg, Bc(e, t, n, r, i, a)) : f._visibility & kg ? Bc(e, t, n, r, i, a) : Hc(e, t, n, r, a), i && d & 2048 && Ic(t.alternate, t);
					break;
				case 24:
					Bc(e, t, n, r, i, a), i && d & 2048 && Lc(t.alternate, t);
					break;
				default: Bc(e, t, n, r, i, a);
			}
			(t.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && ir(t, q, J, T_, E_), bi(o), Si(s), E_ = c, D_ = l, Sg = u;
		}
		function Hc(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (var a = t.child; a !== null;) {
				t = a.sibling;
				var o = e, s = n, c = r, l = t === null ? i : t.actualStartTime, u = Sg;
				(a.mode & K) !== G && 0 < a.actualStartTime && a.flags & 1 && nr(a, a.actualStartTime, l, Db, s);
				var d = a.flags;
				switch (a.tag) {
					case 22:
						Hc(o, a, s, c, l), d & 2048 && Ic(a.alternate, a);
						break;
					case 24:
						Hc(o, a, s, c, l), d & 2048 && Lc(a.alternate, a);
						break;
					default: Hc(o, a, s, c, l);
				}
				Sg = u, a = t;
			}
		}
		function Uc(e, t, n) {
			if (e.subtreeFlags & Ob) for (e = e.child; e !== null;) Wc(e, t, n), e = e.sibling;
		}
		function Wc(e, t, n) {
			switch (e.tag) {
				case 26:
					Uc(e, t, n), e.flags & Ob && e.memoizedState !== null && Gd(n, Eb, e.memoizedState, e.memoizedProps);
					break;
				case 5:
					Uc(e, t, n);
					break;
				case 3:
				case 4:
					var r = Eb;
					Eb = Od(e.stateNode.containerInfo), Uc(e, t, n), Eb = r;
					break;
				case 22:
					e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Ob, Ob = 16777216, Uc(e, t, n), Ob = r) : Uc(e, t, n));
					break;
				default: Uc(e, t, n);
			}
		}
		function Gc(e) {
			var t = e.alternate;
			if (t !== null && (e = t.child, e !== null)) {
				t.child = null;
				do
					t = e.sibling, e.sibling = null, e = t;
				while (e !== null);
			}
		}
		function Kc(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = yi();
					xb = r, Xc(r, e), (r.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && er(r, q, J, "Unmount"), bi(i);
				}
				Gc(e);
			}
			if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) qc(e), e = e.sibling;
		}
		function qc(e) {
			var t = yi(), n = xi(), r = Ci(), i = wi();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					Kc(e), e.flags & 2048 && $s(e, e.return, _y | my);
					break;
				case 3:
					var a = hi();
					Kc(e), e.stateNode.passiveEffectDuration += gi(a);
					break;
				case 12:
					a = hi(), Kc(e), e.stateNode.passiveEffectDuration += _i(a);
					break;
				case 22:
					a = e.stateNode, e.memoizedState !== null && a._visibility & kg && (e.return === null || e.return.tag !== 13) ? (a._visibility &= ~kg, Jc(e), (e.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && er(e, q, J, "Disconnect")) : Kc(e);
					break;
				default: Kc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && ir(e, q, J, T_, E_), bi(t), Si(n), D_ = i, E_ = r;
		}
		function Jc(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = yi();
					xb = r, Xc(r, e), (r.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && er(r, q, J, "Unmount"), bi(i);
				}
				Gc(e);
			}
			for (e = e.child; e !== null;) Yc(e), e = e.sibling;
		}
		function Yc(e) {
			var t = yi(), n = xi(), r = Ci(), i = wi();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					$s(e, e.return, _y), Jc(e);
					break;
				case 22:
					var a = e.stateNode;
					a._visibility & kg && (a._visibility &= ~kg, Jc(e));
					break;
				default: Jc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && ir(e, q, J, T_, E_), bi(t), Si(n), D_ = i, E_ = r;
		}
		function Xc(e, t) {
			for (; xb !== null;) {
				var n = xb, r = n, i = t, a = yi(), o = xi(), s = Ci(), c = wi();
				switch (r.tag) {
					case 0:
					case 11:
					case 15:
						$s(r, i, _y);
						break;
					case 23:
					case 22:
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (i = r.memoizedState.cachePool.pool, i != null && di(i));
						break;
					case 24: fi(r.memoizedState.cache);
				}
				if ((r.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && ir(r, q, J, T_, E_), bi(a), Si(o), D_ = c, E_ = s, r = n.child, r !== null) r.return = n, xb = r;
				else a: for (n = e; xb !== null;) {
					if (r = xb, a = r.sibling, o = r.return, bc(r), r === n) {
						xb = null;
						break a;
					}
					if (a !== null) {
						a.return = o, xb = a;
						break a;
					}
					xb = o;
				}
			}
		}
		function Zc() {
			jb.forEach(function(e) {
				return e();
			});
		}
		function Qc() {
			var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
			return e || H.actQueue === null || console.error("The current testing environment is not configured to support act(...)"), e;
		}
		function $c(e) {
			if ((Ub & Pb) !== Nb && $ !== 0) return $ & -$;
			var t = H.T;
			return t === null ? Ye() : (t._updatedFibers ||= /* @__PURE__ */ new Set(), t._updatedFibers.add(e), nu());
		}
		function el() {
			if (dx === 0) if (!($ & 536870912) || $g) {
				var e = Rp;
				Rp <<= 1, !(Rp & 3932160) && (Rp = 262144), dx = e;
			} else dx = 536870912;
			return e = cy.current, e !== null && (e.flags |= 32), dx;
		}
		function tl(e, t, n) {
			if ($x && console.error("useInsertionEffect must not schedule updates."), Jx && (Yx = !0), (e === Wb && (tx === qb || tx === ex) || e.cancelPendingCommit !== null) && (ll(e, 0), al(e, $, dx, !1)), Be(e, n), (Ub & Pb) !== Nb && e === Wb) {
				if (hp) switch (t.tag) {
					case 0:
					case 11:
					case 15:
						e = Q && S(Q) || "Unknown", nS.has(e) || (nS.add(e), t = S(t) || "Unknown", console.error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render", t, e, e));
						break;
					case 1: tS ||= (console.error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), !0);
				}
			} else Np && Ke(e, t, n), ql(t), e === Wb && ((Ub & Pb) === Nb && (lx |= n), sx === Bb && al(e, $, dx, !1)), Jl(e);
		}
		function nl(e, t, n) {
			if ((Ub & (Pb | Fb)) !== Nb) throw Error("Should not already be working.");
			if ($ !== 0 && Q !== null) {
				var r = Q, i = xp();
				switch ($_) {
					case Jb:
					case qb:
						var a = ev;
						bg && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Suspended", a, i, xg, void 0, "primary-light")) : console.timeStamp("Suspended", a, i, xg, void 0, "primary-light"));
						break;
					case ex:
						a = ev, bg && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Action", a, i, xg, void 0, "primary-light")) : console.timeStamp("Action", a, i, xg, void 0, "primary-light"));
						break;
					default: bg && (r = i - ev, 3 > r || console.timeStamp("Blocked", ev, i, xg, void 0, 5 > r ? "primary-light" : 10 > r ? "primary" : 100 > r ? "primary-dark" : "error"));
				}
			}
			a = (n = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Ie(e, t)) ? vl(e, t) : gl(e, t, !0);
			var o = n;
			do {
				if (a === Ib) {
					ix && !n && al(e, t, 0, !1), t = tx, ev = h_(), $_ = t;
					break;
				} else {
					if (r = xp(), i = e.current.alternate, o && !il(i)) {
						$n(t), i = y_, a = r, !bg || a <= i || (Sx ? Sx.run(console.timeStamp.bind(console, "Teared Render", i, a, W, U, "error")) : console.timeStamp("Teared Render", i, a, W, U, "error")), cl(t, r), a = gl(e, t, !1), o = !1;
						continue;
					}
					if (a === Rb) {
						if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
						else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
						if (s !== 0) {
							$n(t), lr(y_, r, t, Sx), cl(t, r), t = s;
							a: {
								r = e, a = o, o = px;
								var c = r.current.memoizedState.isDehydrated;
								if (c && (ll(r, s).flags |= 256), s = gl(r, s, !1), s !== Rb) {
									if (ax && !c) {
										r.errorRecoveryDisabledLanes |= a, lx |= a, a = Bb;
										break a;
									}
									r = mx, mx = o, r !== null && (mx === null ? mx = r : mx.push.apply(mx, r));
								}
								a = s;
							}
							if (o = !1, a !== Rb) continue;
							r = xp();
						}
					}
					if (a === Lb) {
						$n(t), lr(y_, r, t, Sx), cl(t, r), ll(e, 0), al(e, t, 0, !0);
						break;
					}
					a: {
						switch (n = e, a) {
							case Ib:
							case Lb: throw Error("Root did not complete. This is a bug in React.");
							case Bb: if ((t & 4194048) !== t) break;
							case Vb:
								$n(t), or(y_, r, t, Sx), cl(t, r), i = t, i & 127 ? L_ = r : i & 4194048 && (J_ = r), al(n, t, dx, !rx);
								break a;
							case Rb:
								mx = null;
								break;
							case zb:
							case Hb: break;
							default: throw Error("Unknown root exit status.");
						}
						if (H.actQueue !== null) El(n, i, t, mx, xx, hx, dx, lx, fx, a, null, null, y_, r);
						else {
							if ((t & 62914560) === t && (o = gx + vx - xp(), 10 < o)) {
								if (al(n, t, dx, !rx), Fe(n, 0, !0) !== 0) break a;
								Lx = t, n.timeoutHandle = ZS(rl.bind(null, n, i, mx, xx, hx, t, dx, lx, fx, rx, a, "Throttled", y_, r), o);
								break a;
							}
							rl(n, i, mx, xx, hx, t, dx, lx, fx, rx, a, null, y_, r);
						}
					}
				}
				break;
			} while (1);
			Jl(e);
		}
		function rl(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
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
			}, Wc(t, a, h), m = (a & 62914560) === a ? gx - xp() : (a & 4194048) === a ? _x - xp() : 0, m = Kd(h, m), m !== null)) {
				Lx = a, e.cancelPendingCommit = m(El.bind(null, e, t, a, n, r, i, o, s, c, u, h, h.waitingForViewTransition ? "Waiting for the previous Animation" : 0 < h.count ? 0 < h.imgCount ? "Suspended on CSS and Images" : "Suspended on CSS" : h.imgCount === 1 ? "Suspended on an Image" : 0 < h.imgCount ? "Suspended on Images" : null, f, p)), al(e, a, o, !l);
				return;
			}
			El(e, t, a, n, r, i, o, s, c, u, h, d, f, p);
		}
		function il(e) {
			for (var t = e;;) {
				var n = t.tag;
				if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
					var i = n[r], a = i.getSnapshot;
					i = i.value;
					try {
						if (!Uh(a(), i)) return !1;
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
		function al(e, t, n, r) {
			t &= ~ux, t &= ~lx, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
			for (var i = t; 0 < i;) {
				var a = 31 - Pp(i), o = 1 << a;
				r[a] = -1, i &= ~o;
			}
			n !== 0 && He(e, n, t);
		}
		function ol() {
			return (Ub & (Pb | Fb)) === Nb ? (R(0, !1), !1) : !0;
		}
		function sl() {
			if (Q !== null) {
				if (tx === Gb) var e = Q.return;
				else e = Q, $r(), ka(e), Uv = null, Wv = 0, e = Q;
				for (; e !== null;) Ks(e.alternate, e), e = e.return;
				Q = null;
			}
		}
		function cl(e, t) {
			e & 127 && (O_ = t), e & 4194048 && (R_ = t), e & 62914560 && (Y_ = t), e & 2080374784 && (X_ = t);
		}
		function ll(e, t) {
			bg && (console.timeStamp("Blocking Track", .003, .003, "Blocking", U, "primary-light"), console.timeStamp("Transition Track", .003, .003, "Transition", U, "primary-light"), console.timeStamp("Suspense Track", .003, .003, "Suspense", U, "primary-light"), console.timeStamp("Idle Track", .003, .003, "Idle", U, "primary-light"));
			var n = y_;
			if (y_ = h_(), $ !== 0 && 0 < n) {
				if ($n($), sx === zb || sx === Bb) or(n, y_, t, Sx);
				else {
					var r = y_, i = Sx;
					if (bg && !(r <= n)) {
						var a = (t & 738197653) === t ? "tertiary-dark" : "primary-dark", o = (t & 536870912) === t ? "Prewarm" : (t & 201326741) === t ? "Interrupted Hydration" : "Interrupted Render";
						i ? i.run(console.timeStamp.bind(console, o, n, r, W, U, a)) : console.timeStamp(o, n, r, W, U, a);
					}
				}
				cl($, y_);
			}
			if (n = Sx, Sx = null, t & 127) {
				Sx = A_, i = 0 <= k_ && k_ < O_ ? O_ : k_, r = 0 <= P_ && P_ < O_ ? O_ : P_, a = 0 <= r ? r : 0 <= i ? i : y_, 0 <= L_ ? ($n(2), sr(L_, a, t, n)) : Z_ & 127 && ($n(2), fr(O_, a, Q_)), n = i;
				var s = r, c = F_, l = 0 < I_, u = j_ === __, d = j_ === v_;
				if (i = y_, r = A_, a = M_, o = N_, bg) {
					if (W = "Blocking", 0 < n ? n > i && (n = i) : n = i, 0 < s ? s > n && (s = n) : s = n, c !== null && n > s) {
						var f = l ? "secondary-light" : "warning";
						r ? r.run(console.timeStamp.bind(console, l ? "Consecutive" : "Event: " + c, s, n, W, U, f)) : console.timeStamp(l ? "Consecutive" : "Event: " + c, s, n, W, U, f);
					}
					i > n && (s = u ? "error" : (t & 738197653) === t ? "tertiary-light" : "primary-light", u = d ? "Promise Resolved" : u ? "Cascading Update" : 5 < i - n ? "Update Blocked" : "Update", d = [], o != null && d.push(["Component name", o]), a != null && d.push(["Method name", a]), n = {
						start: n,
						end: i,
						detail: { devtools: {
							properties: d,
							track: W,
							trackGroup: U,
							color: s
						} }
					}, r ? r.run(performance.measure.bind(performance, u, n)) : performance.measure(u, n));
				}
				k_ = -1.1, j_ = 0, N_ = M_ = null, L_ = -1.1, I_ = P_, P_ = -1.1, O_ = h_();
			}
			if (t & 4194048 && (Sx = H_, i = 0 <= z_ && z_ < R_ ? R_ : z_, n = 0 <= B_ && B_ < R_ ? R_ : B_, r = 0 <= G_ && G_ < R_ ? R_ : G_, a = 0 <= r ? r : 0 <= n ? n : y_, 0 <= J_ ? ($n(256), sr(J_, a, t, Sx)) : Z_ & 4194048 && ($n(256), fr(R_, a, Q_)), d = r, s = K_, c = 0 < q_, l = V_ === v_, a = y_, r = H_, o = U_, u = W_, bg && (W = "Transition", 0 < n ? n > a && (n = a) : n = a, 0 < i ? i > n && (i = n) : i = n, 0 < d ? d > i && (d = i) : d = i, i > d && s !== null && (f = c ? "secondary-light" : "warning", r ? r.run(console.timeStamp.bind(console, c ? "Consecutive" : "Event: " + s, d, i, W, U, f)) : console.timeStamp(c ? "Consecutive" : "Event: " + s, d, i, W, U, f)), n > i && (r ? r.run(console.timeStamp.bind(console, "Action", i, n, W, U, "primary-dark")) : console.timeStamp("Action", i, n, W, U, "primary-dark")), a > n && (i = l ? "Promise Resolved" : 5 < a - n ? "Update Blocked" : "Update", d = [], u != null && d.push(["Component name", u]), o != null && d.push(["Method name", o]), n = {
				start: n,
				end: a,
				detail: { devtools: {
					properties: d,
					track: W,
					trackGroup: U,
					color: "primary-light"
				} }
			}, r ? r.run(performance.measure.bind(performance, i, n)) : performance.measure(i, n))), B_ = z_ = -1.1, V_ = 0, J_ = -1.1, q_ = G_, G_ = -1.1, R_ = h_()), t & 62914560 && Z_ & 62914560 && ($n(4194304), fr(Y_, y_, Q_)), t & 2080374784 && Z_ & 2080374784 && ($n(268435456), fr(X_, y_, Q_)), n = e.timeoutHandle, n !== $S && (e.timeoutHandle = $S, QS(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Lx = 0, sl(), Wb = e, Q = n = Er(e.current, null), $ = t, tx = Gb, nx = null, rx = !1, ix = Ie(e, t), ax = !1, sx = Ib, fx = dx = ux = lx = cx = 0, mx = px = null, hx = !1, t & 8 && (t |= t & 32), r = e.entangledLanes, r !== 0) for (e = e.entanglements, r &= t; 0 < r;) i = 31 - Pp(r), a = 1 << i, t |= e[i], r &= ~a;
			return ox = t, pr(), e = lg(), 1e3 < e - sg && (H.recentlyCreatedOwnerStacks = 0, sg = e), lv.discardPendingWarnings(), n;
		}
		function ul(e, t) {
			X = null, H.H = Ly, H.getCurrentStack = null, hp = !1, mp = null, t === Lv || t === zv ? (t = Hi(), tx = Jb) : t === Rv ? (t = Hi(), tx = Yb) : tx = t === ab ? $b : typeof t == "object" && t && typeof t.then == "function" ? Zb : Kb, nx = t;
			var n = Q;
			n === null ? (sx = Lb, rs(e, Pr(t, e.current))) : n.mode & K && Ei(n);
		}
		function dl() {
			var e = cy.current;
			return e === null ? !0 : ($ & 4194048) === $ ? ly === null : ($ & 62914560) === $ || $ & 536870912 ? e === ly : !1;
		}
		function fl() {
			var e = H.H;
			return H.H = Ly, e === null ? Ly : e;
		}
		function pl() {
			var e = H.A;
			return H.A = kb, e;
		}
		function ml(e) {
			Sx === null && (Sx = e._debugTask == null ? null : e._debugTask);
		}
		function hl() {
			sx = Bb, rx || ($ & 4194048) !== $ && cy.current !== null || (ix = !0), !(cx & 134217727) && !(lx & 134217727) || Wb === null || al(Wb, $, dx, !1);
		}
		function gl(e, t, n) {
			var r = Ub;
			Ub |= Pb;
			var i = fl(), a = pl();
			if (Wb !== e || $ !== t) {
				if (Np) {
					var o = e.memoizedUpdaters;
					0 < o.size && (Gl(e, $), o.clear()), qe(e, t);
				}
				xx = null, ll(e, t);
			}
			t = !1, o = sx;
			a: do
				try {
					if (tx !== Gb && Q !== null) {
						var s = Q, c = nx;
						switch (tx) {
							case $b:
								sl(), o = Vb;
								break a;
							case Jb:
							case qb:
							case ex:
							case Zb:
								cy.current === null && (t = !0);
								var l = tx;
								if (tx = Gb, nx = null, Cl(e, s, c, l), n && ix) {
									o = Ib;
									break a;
								}
								break;
							default: l = tx, tx = Gb, nx = null, Cl(e, s, c, l);
						}
					}
					_l(), o = sx;
					break;
				} catch (t) {
					ul(e, t);
				}
			while (1);
			return t && e.shellSuspendCounter++, $r(), Ub = r, H.H = i, H.A = a, Q === null && (Wb = null, $ = 0, pr()), o;
		}
		function _l() {
			for (; Q !== null;) bl(Q);
		}
		function vl(e, t) {
			var n = Ub;
			Ub |= Pb;
			var r = fl(), i = pl();
			if (Wb !== e || $ !== t) {
				if (Np) {
					var a = e.memoizedUpdaters;
					0 < a.size && (Gl(e, $), a.clear()), qe(e, t);
				}
				xx = null, yx = xp() + bx, ll(e, t);
			} else ix = Ie(e, t);
			a: do
				try {
					if (tx !== Gb && Q !== null) b: switch (t = Q, a = nx, tx) {
						case Kb:
							tx = Gb, nx = null, Cl(e, t, a, Kb);
							break;
						case qb:
						case ex:
							if (zi(a)) {
								tx = Gb, nx = null, xl(t);
								break;
							}
							t = function() {
								tx !== qb && tx !== ex || Wb !== e || (tx = Qb), Jl(e);
							}, a.then(t, t);
							break a;
						case Jb:
							tx = Qb;
							break a;
						case Yb:
							tx = Xb;
							break a;
						case Qb:
							zi(a) ? (tx = Gb, nx = null, xl(t)) : (tx = Gb, nx = null, Cl(e, t, a, Qb));
							break;
						case Xb:
							var o = null;
							switch (Q.tag) {
								case 26: o = Q.memoizedState;
								case 5:
								case 27:
									var s = Q;
									if (o ? Wd(o) : s.stateNode.complete) {
										tx = Gb, nx = null;
										var c = s.sibling;
										if (c !== null) Q = c;
										else {
											var l = s.return;
											l === null ? Q = null : (Q = l, wl(l));
										}
										break b;
									}
									break;
								default: console.error("Unexpected type of fiber triggered a suspensey commit. This is a bug in React.");
							}
							tx = Gb, nx = null, Cl(e, t, a, Xb);
							break;
						case Zb:
							tx = Gb, nx = null, Cl(e, t, a, Zb);
							break;
						case $b:
							sl(), sx = Vb;
							break a;
						default: throw Error("Unexpected SuspendedReason. This is a bug in React.");
					}
					H.actQueue === null ? yl() : _l();
					break;
				} catch (t) {
					ul(e, t);
				}
			while (1);
			return $r(), H.H = r, H.A = i, Ub = n, Q === null ? (Wb = null, $ = 0, pr(), sx) : Ib;
		}
		function yl() {
			for (; Q !== null && !yp();) bl(Q);
		}
		function bl(e) {
			var t = e.alternate;
			(e.mode & K) === G ? t = E(e, Ls, t, e, ox) : (Ti(e), t = E(e, Ls, t, e, ox), Ei(e)), e.memoizedProps = e.pendingProps, t === null ? wl(e) : Q = t;
		}
		function xl(e) {
			var t = E(e, Sl, e);
			e.memoizedProps = e.pendingProps, t === null ? wl(e) : Q = t;
		}
		function Sl(e) {
			var t = e.alternate, n = (e.mode & K) !== G;
			switch (n && Ti(e), e.tag) {
				case 15:
				case 0:
					t = xs(t, e, e.pendingProps, e.type, void 0, $);
					break;
				case 11:
					t = xs(t, e, e.pendingProps, e.type.render, e.ref, $);
					break;
				case 5: ka(e);
				default: Ks(t, e), e = Q = Dr(e, ox), t = Ls(t, e, ox);
			}
			return n && Ei(e), t;
		}
		function Cl(e, t, n, r) {
			$r(), ka(t), Uv = null, Wv = 0;
			var i = t.return;
			try {
				if (cs(e, i, t, n, $)) {
					sx = Lb, rs(e, Pr(n, e.current)), Q = null;
					return;
				}
			} catch (t) {
				if (i !== null) throw Q = i, t;
				sx = Lb, rs(e, Pr(n, e.current)), Q = null;
				return;
			}
			t.flags & 32768 ? ($g || r === Kb ? e = !0 : ix || $ & 536870912 ? e = !1 : (rx = e = !0, (r === qb || r === ex || r === Jb || r === Zb) && (r = cy.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Tl(t, e)) : wl(t);
		}
		function wl(e) {
			var t = e;
			do {
				if (t.flags & 32768) {
					Tl(t, rx);
					return;
				}
				var n = t.alternate;
				if (e = t.return, Ti(t), n = E(t, Ws, n, t, ox), (t.mode & K) !== G && Di(t), n !== null) {
					Q = n;
					return;
				}
				if (t = t.sibling, t !== null) {
					Q = t;
					return;
				}
				Q = t = e;
			} while (t !== null);
			sx === Ib && (sx = Hb);
		}
		function Tl(e, t) {
			do {
				var n = Gs(e.alternate, e);
				if (n !== null) {
					n.flags &= 32767, Q = n;
					return;
				}
				if ((e.mode & K) !== G) {
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
			sx = Vb, Q = null;
		}
		function El(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
			e.cancelPendingCommit = null;
			do
				Ml();
			while (Px !== Ox);
			if (lv.flushLegacyContextWarning(), lv.flushPendingUnsafeLifecycleWarnings(), (Ub & (Pb | Fb)) !== Nb) throw Error("Should not already be working.");
			if ($n(n), l === Rb ? lr(f, p, n, Sx) : r === null ? ar(f, p, n, Sx) : cr(f, p, n, r, t !== null && t.alternate !== null && t.alternate.memoizedState.isDehydrated && (t.flags & 256) != 0, Sx), t !== null) {
				if (n === 0 && console.error("finishedLanes should not be empty during a commit. This is a bug in React."), t === e.current) throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
				if (a = t.lanes | t.childLanes, a |= Mg, Ve(e, n, a, o, s, c), e === Wb && (Q = Wb = null, $ = 0), Ix = t, Fx = e, Lx = n, Rx = a, Bx = i, Vx = r, zx = p, Hx = d, Ux = wx, Wx = null, t.actualDuration !== 0 || t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Kl(Tp, function() {
					return XS = window.event, Ux === wx && (Ux = Ex), Nl(), null;
				})) : (e.callbackNode = null, e.callbackPriority = 0), S_ = null, b_ = h_(), d !== null && ur(p, b_, d, Sx), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
					r = H.T, H.T = null, i = qf.p, qf.p = Bp, o = Ub, Ub |= Fb;
					try {
						vc(e, t, n);
					} finally {
						Ub = o, qf.p = i, H.T = r;
					}
				}
				Px = kx, Dl(), Ol(), kl();
			}
		}
		function Dl() {
			if (Px === kx) {
				Px = Ox;
				var e = Fx, t = Ix, n = Lx, r = (t.flags & 13878) != 0;
				if (t.subtreeFlags & 13878 || r) {
					r = H.T, H.T = null;
					var i = qf.p;
					qf.p = Bp;
					var a = Ub;
					Ub |= Fb;
					try {
						Sb = n, Cb = e, vi(), Oc(t, e), Cb = Sb = null, n = qS;
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
						Ub = a, qf.p = i, H.T = r;
					}
				}
				e.current = t, Px = Ax;
			}
		}
		function Ol() {
			if (Px === Ax) {
				Px = Ox;
				var e = Wx;
				if (e !== null) {
					b_ = h_();
					var t = x_, n = b_;
					!bg || n <= t || (Q_ ? Q_.run(console.timeStamp.bind(console, e, t, n, W, U, "secondary-light")) : console.timeStamp(e, t, n, W, U, "secondary-light"));
				}
				e = Fx, t = Ix, n = Lx;
				var r = (t.flags & 8772) != 0;
				if (t.subtreeFlags & 8772 || r) {
					r = H.T, H.T = null;
					var i = qf.p;
					qf.p = Bp;
					var a = Ub;
					Ub |= Fb;
					try {
						Sb = n, Cb = e, vi(), yc(e, t.alternate, t), Cb = Sb = null;
					} finally {
						Ub = a, qf.p = i, H.T = r;
					}
				}
				e = zx, t = Hx, x_ = h_(), e = t === null ? e : b_, t = x_, n = Ux === Tx, r = Sx, S_ === null ? !bg || t <= e || (r ? r.run(console.timeStamp.bind(console, n ? "Commit Interrupted View Transition" : "Commit", e, t, W, U, n ? "error" : "secondary-dark")) : console.timeStamp(n ? "Commit Interrupted View Transition" : "Commit", e, t, W, U, n ? "error" : "secondary-dark")) : dr(e, t, S_, !1, r), Px = jx;
			}
		}
		function kl() {
			if (Px === Mx || Px === jx) {
				if (Px === Mx) {
					var e = x_;
					x_ = h_();
					var t = x_, n = Ux === Tx;
					!bg || t <= e || (Q_ ? Q_.run(console.timeStamp.bind(console, n ? "Interrupted View Transition" : "Starting Animation", e, t, W, U, n ? "error" : "secondary-light")) : console.timeStamp(n ? "Interrupted View Transition" : "Starting Animation", e, t, W, U, n ? " error" : "secondary-light")), Ux !== Tx && (Ux = Dx);
				}
				Px = Ox, bp(), e = Fx;
				var r = Ix;
				t = Lx, n = Vx;
				var i = r.actualDuration !== 0 || (r.subtreeFlags & 10256) != 0 || (r.flags & 10256) != 0;
				i ? Px = Nx : (Px = Ox, Ix = Fx = null, jl(e, e.pendingLanes), Zx = 0, Qx = null);
				var a = e.pendingLanes;
				if (a === 0 && (Cx = null), i || Ul(e), a = Je(t), r = r.stateNode, jp && typeof jp.onCommitFiberRoot == "function") try {
					var o = (r.current.flags & 128) == 128;
					switch (a) {
						case Bp:
							var s = Cp;
							break;
						case Vp:
							s = wp;
							break;
						case Hp:
							s = Tp;
							break;
						case Up:
							s = Dp;
							break;
						default: s = Tp;
					}
					jp.onCommitFiberRoot(Ap, r, s, o);
				} catch (e) {
					Mp || (Mp = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				if (Np && e.memoizedUpdaters.clear(), Zc(), n !== null) {
					o = H.T, s = qf.p, qf.p = Bp, H.T = null;
					try {
						var c = e.onRecoverableError;
						for (r = 0; r < n.length; r++) {
							var l = n[r], u = Al(l.stack);
							E(l.source, c, l.value, u);
						}
					} finally {
						H.T = o, qf.p = s;
					}
				}
				Lx & 3 && Ml(), Jl(e), a = e.pendingLanes, t & 261930 && a & 42 ? (nv = !0, e === qx ? Kx++ : (Kx = 0, qx = e)) : Kx = 0, i || cl(t, x_), R(0, !1);
			}
		}
		function Al(e) {
			return e = { componentStack: e }, Object.defineProperty(e, "digest", { get: function() {
				console.error("You are accessing \"digest\" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.");
			} }), e;
		}
		function jl(e, t) {
			(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, fi(t)));
		}
		function Ml() {
			return Dl(), Ol(), kl(), Nl();
		}
		function Nl() {
			if (Px !== Nx) return !1;
			var e = Fx, t = Rx;
			Rx = 0;
			var n = Je(Lx), r = Hp === 0 || Hp > n ? Hp : n;
			n = H.T;
			var i = qf.p;
			try {
				qf.p = r, H.T = null;
				var a = Bx;
				Bx = null, r = Fx;
				var o = Lx;
				if (Px = Ox, Ix = Fx = null, Lx = 0, (Ub & (Pb | Fb)) !== Nb) throw Error("Cannot flush passive effects while already rendering.");
				$n(o), Jx = !0, Yx = !1;
				var s = 0;
				if (S_ = null, s = xp(), Ux === Dx) fr(x_, s, Q_);
				else {
					var c = x_, l = s, u = Ux === Ex;
					!bg || l <= c || (Sx ? Sx.run(console.timeStamp.bind(console, u ? "Waiting for Paint" : "Waiting", c, l, W, U, "secondary-light")) : console.timeStamp(u ? "Waiting for Paint" : "Waiting", c, l, W, U, "secondary-light"));
				}
				c = Ub, Ub |= Fb;
				var d = r.current;
				vi(), qc(d);
				var f = r.current;
				d = zx, vi(), zc(r, f, o, a, d), Ul(r), Ub = c;
				var p = xp();
				if (f = s, d = Sx, S_ === null ? !bg || p <= f || (d ? d.run(console.timeStamp.bind(console, "Remaining Effects", f, p, W, U, "secondary-dark")) : console.timeStamp("Remaining Effects", f, p, W, U, "secondary-dark")) : dr(f, p, S_, !0, d), cl(o, p), R(0, !1), Yx ? r === Qx ? Zx++ : (Zx = 0, Qx = r) : Zx = 0, Yx = Jx = !1, jp && typeof jp.onPostCommitFiberRoot == "function") try {
					jp.onPostCommitFiberRoot(Ap, r);
				} catch (e) {
					Mp || (Mp = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				var m = r.current.stateNode;
				return m.effectDuration = 0, m.passiveEffectDuration = 0, !0;
			} finally {
				qf.p = i, H.T = n, jl(e, t);
			}
		}
		function Pl(e, t, n) {
			t = Pr(n, t), ki(t), t = as(e.stateNode, t, 2), e = aa(e, t, 2), e !== null && (Be(e, 2), Jl(e));
		}
		function Fl(e, t, n) {
			if ($x = !1, e.tag === 3) Pl(e, e, n);
			else {
				for (; t !== null;) {
					if (t.tag === 3) {
						Pl(t, e, n);
						return;
					}
					if (t.tag === 1) {
						var r = t.stateNode;
						if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Cx === null || !Cx.has(r))) {
							e = Pr(n, e), ki(e), n = os(2), r = aa(t, n, 2), r !== null && (ss(n, r, t, e), Be(r, 2), Jl(r));
							return;
						}
					}
					t = t.return;
				}
				console.error("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s", n);
			}
		}
		function Il(e, t, n) {
			var r = e.pingCache;
			if (r === null) {
				r = e.pingCache = new Mb();
				var i = /* @__PURE__ */ new Set();
				r.set(t, i);
			} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
			i.has(n) || (ax = !0, i.add(n), r = Ll.bind(null, e, t, n), Np && Gl(e, n), t.then(r, r));
		}
		function Ll(e, t, n) {
			var r = e.pingCache;
			r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, n & 127 ? 0 > k_ && (O_ = k_ = h_(), A_ = g_("Promise Resolved"), j_ = v_) : n & 4194048 && 0 > B_ && (R_ = B_ = h_(), H_ = g_("Promise Resolved"), V_ = v_), Qc() && H.actQueue === null && console.error("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act"), Wb === e && ($ & n) === n && (sx === Bb || sx === zb && ($ & 62914560) === $ && xp() - gx < vx ? (Ub & Pb) === Nb && ll(e, 0) : ux |= n, fx === $ && (fx = 0)), Jl(e);
		}
		function Rl(e, t) {
			t === 0 && (t = Re()), e = gr(e, t), e !== null && (Be(e, t), Jl(e));
		}
		function zl(e) {
			var t = e.memoizedState, n = 0;
			t !== null && (n = t.retryLane), Rl(e, n);
		}
		function Bl(e, t) {
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
			r !== null && r.delete(t), Rl(e, n);
		}
		function Vl(e, t, n) {
			if (t.subtreeFlags & 67117056) for (t = t.child; t !== null;) {
				var r = e, i = t, a = i.type === Nf;
				a = n || a, i.tag === 22 ? i.memoizedState === null && (a && i.flags & 8192 ? E(i, Hl, r, i) : i.subtreeFlags & 67108864 && E(i, Vl, r, i, a)) : i.flags & 67108864 ? a && E(i, Hl, r, i) : Vl(r, i, a), t = t.sibling;
			}
		}
		function Hl(e, t) {
			Me(!0);
			try {
				Mc(t), Yc(t), Pc(e, t.alternate, t, !1), Vc(e, t, 0, null, !1, 0);
			} finally {
				Me(!1);
			}
		}
		function Ul(e) {
			var t = !0;
			e.current.mode & (Lg | Rg) || (t = !1), Vl(e, e.current, t);
		}
		function Wl(e) {
			if ((Ub & Pb) === Nb) {
				var t = e.tag;
				if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
					if (t = S(e) || "ReactComponent", eS !== null) {
						if (eS.has(t)) return;
						eS.add(t);
					} else eS = /* @__PURE__ */ new Set([t]);
					E(e, function() {
						console.error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead.");
					});
				}
			}
		}
		function Gl(e, t) {
			Np && e.memoizedUpdaters.forEach(function(n) {
				Ke(e, n, t);
			});
		}
		function Kl(e, t) {
			var n = H.actQueue;
			return n === null ? _p(e, t) : (n.push(t), rS);
		}
		function ql(e) {
			Qc() && H.actQueue === null && E(e, function() {
				console.error("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act", S(e));
			});
		}
		function Jl(e) {
			e !== aS && e.next === null && (aS === null ? iS = aS = e : aS = aS.next = e), cS = !0, H.actQueue === null ? oS || (oS = !0, tu()) : sS || (sS = !0, tu());
		}
		function R(e, t) {
			if (!lS && cS) {
				lS = !0;
				do
					for (var n = !1, r = iS; r !== null;) {
						if (!t) if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - Pp(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, $l(r, a));
						} else a = $, a = Fe(r, r === Wb ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== $S), !(a & 3) || Ie(r, a) || (n = !0, $l(r, a));
						r = r.next;
					}
				while (n);
				lS = !1;
			}
		}
		function Yl() {
			XS = window.event, Xl();
		}
		function Xl() {
			cS = sS = oS = !1;
			var e = 0;
			uS !== 0 && Uu() && (e = uS);
			for (var t = xp(), n = null, r = iS; r !== null;) {
				var i = r.next, a = Zl(r, t);
				a === 0 ? (r.next = null, n === null ? iS = i : n.next = i, i === null && (aS = n)) : (n = r, (e !== 0 || a & 3) && (cS = !0)), r = i;
			}
			Px !== Ox && Px !== Nx || R(e, !1), uS !== 0 && (uS = 0);
		}
		function Zl(e, t) {
			for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
				var o = 31 - Pp(a), s = 1 << o, c = i[o];
				c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Le(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
			}
			if (t = Wb, n = $, n = Fe(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== $S), r = e.callbackNode, n === 0 || e === t && (tx === qb || tx === ex) || e.cancelPendingCommit !== null) return r !== null && eu(r), e.callbackNode = null, e.callbackPriority = 0;
			if (!(n & 3) || Ie(e, n)) {
				if (t = n & -n, t !== e.callbackPriority || H.actQueue !== null && r !== dS) eu(r);
				else return t;
				switch (Je(n)) {
					case Bp:
					case Vp:
						n = wp;
						break;
					case Hp:
						n = Tp;
						break;
					case Up:
						n = Dp;
						break;
					default: n = Tp;
				}
				return r = Ql.bind(null, e), H.actQueue === null ? n = _p(n, r) : (H.actQueue.push(r), n = dS), e.callbackPriority = t, e.callbackNode = n, t;
			}
			return r !== null && eu(r), e.callbackPriority = 2, e.callbackNode = null, 2;
		}
		function Ql(e, t) {
			if (nv = tv = !1, XS = window.event, Px !== Ox && Px !== Nx) return e.callbackNode = null, e.callbackPriority = 0, null;
			var n = e.callbackNode;
			if (Ux === wx && (Ux = Ex), Ml() && e.callbackNode !== n) return null;
			var r = $;
			return r = Fe(e, e === Wb ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== $S), r === 0 ? null : (nl(e, r, t), Zl(e, xp()), e.callbackNode != null && e.callbackNode === n ? Ql.bind(null, e) : null);
		}
		function $l(e, t) {
			if (Ml()) return null;
			tv = nv, nv = !1, nl(e, t, !0);
		}
		function eu(e) {
			e !== dS && e !== null && vp(e);
		}
		function tu() {
			H.actQueue !== null && H.actQueue.push(function() {
				return Xl(), null;
			}), tC(function() {
				(Ub & (Pb | Fb)) === Nb ? Xl() : _p(Cp, Yl);
			});
		}
		function nu() {
			if (uS === 0) {
				var e = av;
				e === 0 && (e = Lp, Lp <<= 1, !(Lp & 261888) && (Lp = 256)), uS = e;
			}
			return uS;
		}
		function ru(e) {
			return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (Oe(e, "action"), ln("" + e));
		}
		function iu(e, t) {
			var n = t.ownerDocument.createElement("input");
			return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
		}
		function au(e, t, n, r, i) {
			if (t === "submit" && n && n.stateNode === i) {
				var a = ru((i[Kp] || null).action), o = r.submitter;
				o && (t = (t = o[Kp] || null) ? ru(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
				var s = new oh("action", "action", null, r, i);
				e.push({
					event: s,
					listeners: [{
						instance: null,
						listener: function() {
							if (r.defaultPrevented) {
								if (uS !== 0) {
									var e = o ? iu(i, o) : new FormData(i), t = {
										pending: !0,
										data: e,
										method: i.method,
										action: a
									};
									Object.freeze(t), Mo(n, t, null, e);
								}
							} else typeof a == "function" && (s.preventDefault(), e = o ? iu(i, o) : new FormData(i), t = {
								pending: !0,
								data: e,
								method: i.method,
								action: a
							}, Object.freeze(t), Mo(n, t, a, e));
						},
						currentTarget: i
					}]
				});
			}
		}
		function ou(e, t, n) {
			e.currentTarget = n;
			try {
				t(e);
			} catch (e) {
				dg(e);
			}
			e.currentTarget = null;
		}
		function su(e, t) {
			t = (t & 4) != 0;
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				a: {
					var i = void 0, a = r.event;
					if (r = r.listeners, t) for (var o = r.length - 1; 0 <= o; o--) {
						var s = r[o], c = s.instance, l = s.currentTarget;
						if (s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? ou(a, s, l) : E(c, ou, a, s, l), i = c;
					}
					else for (o = 0; o < r.length; o++) {
						if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? ou(a, s, l) : E(c, ou, a, s, l), i = c;
					}
				}
			}
		}
		function z(e, t) {
			pS.has(e) || console.error("Did not expect a listenToNonDelegatedEvent() call for \"%s\". This is a bug in React. Please file an issue.", e);
			var n = t[Jp];
			n === void 0 && (n = t[Jp] = /* @__PURE__ */ new Set());
			var r = e + "__bubble";
			n.has(r) || (uu(t, e, 2, !1), n.add(r));
		}
		function cu(e, t, n) {
			pS.has(e) && !t && console.error("Did not expect a listenToNativeEvent() call for \"%s\" in the bubble phase. This is a bug in React. Please file an issue.", e);
			var r = 0;
			t && (r |= 4), uu(n, e, r, t);
		}
		function lu(e) {
			if (!e[mS]) {
				e[mS] = !0, $p.forEach(function(t) {
					t !== "selectionchange" && (pS.has(t) || cu(t, !1, e), cu(t, !0, e));
				});
				var t = e.nodeType === 9 ? e : e.ownerDocument;
				t === null || t[mS] || (t[mS] = !0, cu("selectionchange", !1, t));
			}
		}
		function uu(e, t, n, r) {
			switch (df(t)) {
				case Bp:
					var i = of;
					break;
				case Vp:
					i = sf;
					break;
				default: i = cf;
			}
			n = i.bind(null, t, n, e), i = void 0, !eh || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
				capture: !0,
				passive: i
			}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
		}
		function du(e, t, n, r, i) {
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
						if (o = Qe(s), o === null) return;
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
					var s = ag.get(e);
					if (s !== void 0) {
						var c = oh, l = e;
						switch (e) {
							case "keypress": if (gn(n) === 0) break a;
							case "keydown":
							case "keyup":
								c = Ch;
								break;
							case "focusin":
								l = "focus", c = hh;
								break;
							case "focusout":
								l = "blur", c = hh;
								break;
							case "beforeblur":
							case "afterblur":
								c = hh;
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
								c = ph;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								c = mh;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								c = Th;
								break;
							case Qh:
							case $h:
							case eg:
								c = gh;
								break;
							case ig:
								c = Eh;
								break;
							case "scroll":
							case "scrollend":
								c = ch;
								break;
							case "wheel":
								c = Dh;
								break;
							case "copy":
							case "cut":
							case "paste":
								c = _h;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								c = wh;
								break;
							case "toggle":
							case "beforetoggle": c = Oh;
						}
						var u = (t & 4) != 0, d = !u && (e === "scroll" || e === "scrollend"), f = u ? s === null ? null : s + "Capture" : s;
						u = [];
						for (var p = r, m; p !== null;) {
							var h = p;
							if (m = h.stateNode, h = h.tag, h !== 5 && h !== 26 && h !== 27 || m === null || f === null || (h = mn(p, f), h != null && u.push(fu(p, h, m))), d) break;
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
						if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== Ym && (l = n.relatedTarget || n.fromElement) && (Qe(l) || l[qp])) break a;
						if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Qe(l) : null, l !== null && (d = b(l), u = l.tag, l !== d || u !== 5 && u !== 27 && u !== 6) && (l = null)) : (c = null, l = r), c !== l)) {
							if (u = ph, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = wh, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = c == null ? s : et(c), m = l == null ? s : et(l), s = new u(h, p + "leave", c, n, i), s.target = d, s.relatedTarget = m, h = null, Qe(i) === r && (u = new u(f, p + "enter", l, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, c && l) b: {
								for (u = mu, f = c, p = l, m = 0, h = f; h; h = u(h)) m++;
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
							c !== null && hu(o, s, c, u, !1), l !== null && d !== null && hu(o, d, l, u, !0);
						}
					}
					a: {
						if (s = r ? et(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var _ = jn;
						else if (En(s)) if (Hh) _ = Ln;
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
					switch (v = r ? et(r) : window, e) {
						case "focusin":
							(En(v) || v.contentEditable === "true") && (Gh = v, Kh = r, qh = null);
							break;
						case "focusout":
							qh = Kh = Gh = null;
							break;
						case "mousedown":
							Jh = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							Jh = !1, Gn(o, n, i);
							break;
						case "selectionchange": if (Wh) break;
						case "keydown":
						case "keyup": Gn(o, n, i);
					}
					var y;
					if (jh) b: {
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
					else Rh ? Sn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === Ah && (x = "onCompositionStart");
					x && (Ph && n.locale !== "ko" && (Rh || x !== "onCompositionStart" ? x === "onCompositionEnd" && Rh && (y = hn()) : (nh = i, rh = "value" in nh ? nh.value : nh.textContent, Rh = !0)), v = pu(r, x), 0 < v.length && (x = new vh(x, e, null, n, i), o.push({
						event: x,
						listeners: v
					}), y ? x.data = y : (y = Cn(n), y !== null && (x.data = y)))), (y = Nh ? wn(e, n) : Tn(e, n)) && (x = pu(r, "onBeforeInput"), 0 < x.length && (v = new yh("onBeforeInput", "beforeinput", null, n, i), o.push({
						event: v,
						listeners: x
					}), v.data = y)), au(o, e, r, n, i);
				}
				su(o, t);
			});
		}
		function fu(e, t, n) {
			return {
				instance: e,
				listener: t,
				currentTarget: n
			};
		}
		function pu(e, t) {
			for (var n = t + "Capture", r = []; e !== null;) {
				var i = e, a = i.stateNode;
				if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = mn(e, n), i != null && r.unshift(fu(e, i, a)), i = mn(e, t), i != null && r.push(fu(e, i, a))), e.tag === 3) return r;
				e = e.return;
			}
			return [];
		}
		function mu(e) {
			if (e === null) return null;
			do
				e = e.return;
			while (e && e.tag !== 5 && e.tag !== 27);
			return e || null;
		}
		function hu(e, t, n, r, i) {
			for (var a = t._reactName, o = []; n !== null && n !== r;) {
				var s = n, c = s.alternate, l = s.stateNode;
				if (s = s.tag, c !== null && c === r) break;
				s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = mn(n, a), l != null && o.unshift(fu(n, l, c))) : i || (l = mn(n, a), l != null && o.push(fu(n, l, c)))), n = n.return;
			}
			o.length !== 0 && e.push({
				event: t,
				listeners: o
			});
		}
		function gu(e, t) {
			on(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || Hm || (Hm = !0, e === "select" && t.multiple ? console.error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : console.error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
			var n = {
				registrationNameDependencies: em,
				possibleRegistrationNames: tm
			};
			nn(e) || typeof t.is == "string" || cn(e, t, n), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
		}
		function _u(e, t, n, r) {
			t !== n && (n = xu(n), xu(t) !== n && (r[e] = t));
		}
		function vu(e, t, n) {
			t.forEach(function(t) {
				n[Du(t)] = t === "style" ? Ou(e) : e.getAttribute(t);
			});
		}
		function yu(e, t) {
			!1 === t ? console.error("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : console.error("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
		}
		function bu(e, t) {
			return e = e.namespaceURI === Pm || e.namespaceURI === Fm ? e.ownerDocument.createElementNS(e.namespaceURI, e.tagName) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
		}
		function xu(e) {
			return Ee(e) && (console.error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.", Te(e)), De(e)), (typeof e == "string" ? e : "" + e).replace(CS, "\n").replace(wS, "");
		}
		function Su(e, t) {
			return t = xu(t), xu(e) === t;
		}
		function Cu(e, t, n, r, i, a) {
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
					Oe(r, n), r = ln("" + r), e.setAttribute(n, r);
					break;
				case "action":
				case "formAction":
					if (r != null && (t === "form" ? n === "formAction" ? console.error("You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>.") : typeof r == "function" && (i.encType == null && i.method == null || bS || (bS = !0, console.error("Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden.")), i.target == null || yS || (yS = !0, console.error("Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."))) : t === "input" || t === "button" ? n === "action" ? console.error("You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>.") : t !== "input" || i.type === "submit" || i.type === "image" || _S ? t !== "button" || i.type == null || i.type === "submit" || _S ? typeof r == "function" && (i.name == null || vS || (vS = !0, console.error("Cannot specify a \"name\" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.")), i.formEncType == null && i.formMethod == null || bS || (bS = !0, console.error("Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden.")), i.formTarget == null || yS || (yS = !0, console.error("Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."))) : (_S = !0, console.error("A button can only specify a formAction along with type=\"submit\" or no type.")) : (_S = !0, console.error("An input can only specify a formAction along with type=\"submit\" or type=\"image\".")) : console.error(n === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>.")), typeof r == "function") {
						e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
						break;
					} else typeof a == "function" && (n === "formAction" ? (t !== "input" && Cu(e, t, "name", i.name, i, null), Cu(e, t, "formEncType", i.formEncType, i, null), Cu(e, t, "formMethod", i.formMethod, i, null), Cu(e, t, "formTarget", i.formTarget, i, null)) : (Cu(e, t, "encType", i.encType, i, null), Cu(e, t, "method", i.method, i, null), Cu(e, t, "target", i.target, i, null)));
					if (r == null || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					Oe(r, n), r = ln("" + r), e.setAttribute(n, r);
					break;
				case "onClick":
					r != null && (typeof r != "function" && yu(n, r), e.onclick = un);
					break;
				case "onScroll":
					r != null && (typeof r != "function" && yu(n, r), z("scroll", e));
					break;
				case "onScrollEnd":
					r != null && (typeof r != "function" && yu(n, r), z("scrollend", e));
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
					Oe(r, n), n = ln("" + r), e.setAttributeNS(TS, "xlink:href", n);
					break;
				case "contentEditable":
				case "spellCheck":
				case "draggable":
				case "value":
				case "autoReverse":
				case "externalResourcesRequired":
				case "focusable":
				case "preserveAlpha":
					r != null && typeof r != "function" && typeof r != "symbol" ? (Oe(r, n), e.setAttribute(n, "" + r)) : e.removeAttribute(n);
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
					!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? (Oe(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? (Oe(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "rowSpan":
				case "start":
					r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : (Oe(r, n), e.setAttribute(n, r));
					break;
				case "popover":
					z("beforetoggle", e), z("toggle", e), ct(e, "popover", r);
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
				default: !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N" ? (n = rn(n), ct(e, n, r)) : em.hasOwnProperty(n) && r != null && typeof r != "function" && yu(n, r);
			}
		}
		function wu(e, t, n, r, i, a) {
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
					r != null && (typeof r != "function" && yu(n, r), z("scroll", e));
					break;
				case "onScrollEnd":
					r != null && (typeof r != "function" && yu(n, r), z("scrollend", e));
					break;
				case "onClick":
					r != null && (typeof r != "function" && yu(n, r), e.onclick = un);
					break;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "innerHTML":
				case "ref": break;
				case "innerText":
				case "textContent": break;
				default: if (em.hasOwnProperty(n)) r != null && typeof r != "function" && yu(n, r);
				else a: {
					if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), t = n.slice(2, i ? n.length - 7 : void 0), a = e[Kp] || null, a = a == null ? null : a[n], typeof a == "function" && e.removeEventListener(t, a, i), typeof r == "function")) {
						typeof a != "function" && a !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, i);
						break a;
					}
					n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : ct(e, n, r);
				}
			}
		}
		function Tu(e, t, n) {
			switch (gu(t, n), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "img":
					z("error", e), z("load", e);
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
							default: Cu(e, t, a, o, n, null);
						}
					}
					i && Cu(e, t, "srcSet", n.srcSet, n, null), r && Cu(e, t, "src", n.src, n, null);
					return;
				case "input":
					at("input", n), z("invalid", e);
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
							default: Cu(e, t, r, u, n, null);
						}
					}
					vt(e, n), bt(e, a, s, c, l, o, i, !1);
					return;
				case "select":
					for (i in at("select", n), z("invalid", e), r = o = a = null, n) if (n.hasOwnProperty(i) && (s = n[i], s != null)) switch (i) {
						case "value":
							a = s;
							break;
						case "defaultValue":
							o = s;
							break;
						case "multiple": r = s;
						default: Cu(e, t, i, s, n, null);
					}
					Tt(e, n), t = a, n = o, e.multiple = !!r, t == null ? n != null && wt(e, !!r, n, !0) : wt(e, !!r, t, !1);
					return;
				case "textarea":
					for (o in at("textarea", n), z("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(o) && (s = n[o], s != null)) switch (o) {
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
						default: Cu(e, t, o, s, n, null);
					}
					Et(e, n), Ot(e, r, i, a);
					return;
				case "option":
					for (c in St(e, n), n) if (n.hasOwnProperty(c) && (r = n[c], r != null)) switch (c) {
						case "selected":
							e.selected = r && typeof r != "function" && typeof r != "symbol";
							break;
						default: Cu(e, t, c, r, n, null);
					}
					return;
				case "dialog":
					z("beforetoggle", e), z("toggle", e), z("cancel", e), z("close", e);
					break;
				case "iframe":
				case "object":
					z("load", e);
					break;
				case "video":
				case "audio":
					for (r = 0; r < fS.length; r++) z(fS[r], e);
					break;
				case "image":
					z("error", e), z("load", e);
					break;
				case "details":
					z("toggle", e);
					break;
				case "embed":
				case "source":
				case "link": z("error", e), z("load", e);
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
						default: Cu(e, t, l, r, n, null);
					}
					return;
				default: if (nn(t)) {
					for (u in n) n.hasOwnProperty(u) && (r = n[u], r !== void 0 && wu(e, t, u, r, n, void 0));
					return;
				}
			}
			for (s in n) n.hasOwnProperty(s) && (r = n[s], r != null && Cu(e, t, s, r, n, null));
		}
		function Eu(e, t, n, r) {
			switch (gu(t, r), t) {
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
							default: r.hasOwnProperty(p) || Cu(e, t, p, null, r, d);
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
							default: p !== d && Cu(e, t, f, p, r, d);
						}
					}
					t = n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null, r = r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null, t || !r || gS || (console.error("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), gS = !0), !t || r || hS || (console.error("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), hS = !0), yt(e, o, s, c, l, u, a, i);
					return;
				case "select":
					for (a in p = o = s = f = null, n) if (c = n[a], n.hasOwnProperty(a) && c != null) switch (a) {
						case "value": break;
						case "multiple": p = c;
						default: r.hasOwnProperty(a) || Cu(e, t, a, null, r, c);
					}
					for (i in r) if (a = r[i], c = n[i], r.hasOwnProperty(i) && (a != null || c != null)) switch (i) {
						case "value":
							f = a;
							break;
						case "defaultValue":
							s = a;
							break;
						case "multiple": o = a;
						default: a !== c && Cu(e, t, i, a, r, c);
					}
					r = s, t = o, n = p, f == null ? !!n != !!t && (r == null ? wt(e, !!t, t ? [] : "", !1) : wt(e, !!t, r, !0)) : wt(e, !!t, f, !1);
					return;
				case "textarea":
					for (s in p = f = null, n) if (i = n[s], n.hasOwnProperty(s) && i != null && !r.hasOwnProperty(s)) switch (s) {
						case "value": break;
						case "children": break;
						default: Cu(e, t, s, null, r, i);
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
						default: i !== a && Cu(e, t, o, i, r, a);
					}
					Dt(e, f, p);
					return;
				case "option":
					for (var m in n) if (f = n[m], n.hasOwnProperty(m) && f != null && !r.hasOwnProperty(m)) switch (m) {
						case "selected":
							e.selected = !1;
							break;
						default: Cu(e, t, m, null, r, f);
					}
					for (c in r) if (f = r[c], p = n[c], r.hasOwnProperty(c) && f !== p && (f != null || p != null)) switch (c) {
						case "selected":
							e.selected = f && typeof f != "function" && typeof f != "symbol";
							break;
						default: Cu(e, t, c, f, r, p);
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
					for (var h in n) f = n[h], n.hasOwnProperty(h) && f != null && !r.hasOwnProperty(h) && Cu(e, t, h, null, r, f);
					for (l in r) if (f = r[l], p = n[l], r.hasOwnProperty(l) && f !== p && (f != null || p != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML":
							if (f != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							break;
						default: Cu(e, t, l, f, r, p);
					}
					return;
				default: if (nn(t)) {
					for (var g in n) f = n[g], n.hasOwnProperty(g) && f !== void 0 && !r.hasOwnProperty(g) && wu(e, t, g, void 0, r, f);
					for (u in r) f = r[u], p = n[u], !r.hasOwnProperty(u) || f === p || f === void 0 && p === void 0 || wu(e, t, u, f, r, p);
					return;
				}
			}
			for (var _ in n) f = n[_], n.hasOwnProperty(_) && f != null && !r.hasOwnProperty(_) && Cu(e, t, _, null, r, f);
			for (d in r) f = r[d], p = n[d], !r.hasOwnProperty(d) || f === p || f == null && p == null || Cu(e, t, d, f, r, p);
		}
		function Du(e) {
			switch (e) {
				case "class": return "className";
				case "for": return "htmlFor";
				default: return e;
			}
		}
		function Ou(e) {
			var t = {};
			e = e.style;
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				t[r] = e.getPropertyValue(r);
			}
			return t;
		}
		function ku(e, t, n) {
			if (t != null && typeof t != "object") console.error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			else {
				var r, i = r = "", a;
				for (a in t) if (t.hasOwnProperty(a)) {
					var o = t[a];
					o != null && typeof o != "boolean" && o !== "" && (a.indexOf("--") === 0 ? (ke(o, a), r += i + a + ":" + ("" + o).trim()) : typeof o != "number" || o === 0 || Nm.has(a) ? (ke(o, a), r += i + a.replace(Cm, "-$1").toLowerCase().replace(wm, "-ms-") + ":" + ("" + o).trim()) : r += i + a.replace(Cm, "-$1").toLowerCase().replace(wm, "-ms-") + ":" + o + "px", i = ";");
				}
				r ||= null, t = e.getAttribute("style"), t !== r && (r = xu(r), xu(t) !== r && (n.style = Ou(e)));
			}
		}
		function Au(e, t, n, r, i, a) {
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
				default: if (Oe(r, t), e === "" + r) return;
			}
			_u(t, e, r, a);
		}
		function ju(e, t, n, r, i, a) {
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
			_u(t, e, r, a);
		}
		function Mu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (Oe(r, n), e === "" + r) return;
			}
			_u(t, e, r, a);
		}
		function Nu(e, t, n, r, i, a) {
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
				default: if (!isNaN(r) && (Oe(r, t), e === "" + r)) return;
			}
			_u(t, e, r, a);
		}
		function Pu(e, t, n, r, i, a) {
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
				default: if (Oe(r, t), n = ln("" + r), e === n) return;
			}
			_u(t, e, r, a);
		}
		function Fu(e, t, n, r) {
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
						if (em.hasOwnProperty(c)) typeof l != "function" && yu(c, l);
						else if (!0 !== n.suppressHydrationWarning) switch (c) {
							case "children":
								typeof l != "string" && typeof l != "number" || _u("children", e.textContent, l, i);
								continue;
							case "suppressContentEditableWarning":
							case "suppressHydrationWarning":
							case "defaultValue":
							case "defaultChecked":
							case "innerHTML":
							case "ref": continue;
							case "dangerouslySetInnerHTML":
								o = e.innerHTML, l = l ? l.__html : void 0, l != null && (l = bu(e, l), _u(c, o, l, i));
								continue;
							case "style":
								a.delete(c), ku(e, l, i);
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
								a.delete("class"), o = st(e, "class", l), _u("className", o, l, i);
								continue;
							default: r.context === US && t !== "svg" && t !== "math" ? a.delete(c.toLowerCase()) : a.delete(c), o = st(e, c, l), _u(c, o, l, i);
						}
					}
				}
			} else for (l in n) if (n.hasOwnProperty(l) && (c = n[l], c != null)) {
				if (em.hasOwnProperty(l)) typeof c != "function" && yu(l, c);
				else if (!0 !== n.suppressHydrationWarning) switch (l) {
					case "children":
						typeof c != "string" && typeof c != "number" || _u("children", e.textContent, c, i);
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
						o = e.innerHTML, c = c ? c.__html : void 0, c != null && (c = bu(e, c), o !== c && (i[l] = { __html: o }));
						continue;
					case "className":
						Au(e, l, "class", c, a, i);
						continue;
					case "tabIndex":
						Au(e, l, "tabindex", c, a, i);
						continue;
					case "style":
						a.delete(l), ku(e, c, i);
						continue;
					case "multiple":
						a.delete(l), _u(l, e.multiple, c, i);
						continue;
					case "muted":
						a.delete(l), _u(l, e.muted, c, i);
						continue;
					case "autoFocus":
						a.delete("autofocus"), _u(l, e.autofocus, c, i);
						continue;
					case "data": if (t !== "object") {
						a.delete(l), o = e.getAttribute("data"), _u(l, o, c, i);
						continue;
					}
					case "src":
					case "href":
						if (!(c !== "" || t === "a" && l === "href" || t === "object" && l === "data")) {
							console.error(l === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", l, l);
							continue;
						}
						Pu(e, l, l, c, a, i);
						continue;
					case "action":
					case "formAction":
						if (o = e.getAttribute(l), typeof c == "function") {
							a.delete(l.toLowerCase()), l === "formAction" ? (a.delete("name"), a.delete("formenctype"), a.delete("formmethod"), a.delete("formtarget")) : (a.delete("enctype"), a.delete("method"), a.delete("target"));
							continue;
						} else if (o === DS) {
							a.delete(l.toLowerCase()), _u(l, "function", c, i);
							continue;
						}
						Pu(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "xlinkHref":
						Pu(e, l, "xlink:href", c, a, i);
						continue;
					case "contentEditable":
						Mu(e, l, "contenteditable", c, a, i);
						continue;
					case "spellCheck":
						Mu(e, l, "spellcheck", c, a, i);
						continue;
					case "draggable":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
						Mu(e, l, l, c, a, i);
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
						ju(e, l, l.toLowerCase(), c, a, i);
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
								default: if (Oe(c, o), s === "" + c) break a;
							}
							_u(o, s, c, d);
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
								default: if (!(isNaN(c) || 1 > c) && (Oe(c, o), s === "" + c)) break a;
							}
							_u(o, s, c, d);
						}
						continue;
					case "rowSpan":
						Nu(e, l, "rowspan", c, a, i);
						continue;
					case "start":
						Nu(e, l, l, c, a, i);
						continue;
					case "xHeight":
						Au(e, l, "x-height", c, a, i);
						continue;
					case "xlinkActuate":
						Au(e, l, "xlink:actuate", c, a, i);
						continue;
					case "xlinkArcrole":
						Au(e, l, "xlink:arcrole", c, a, i);
						continue;
					case "xlinkRole":
						Au(e, l, "xlink:role", c, a, i);
						continue;
					case "xlinkShow":
						Au(e, l, "xlink:show", c, a, i);
						continue;
					case "xlinkTitle":
						Au(e, l, "xlink:title", c, a, i);
						continue;
					case "xlinkType":
						Au(e, l, "xlink:type", c, a, i);
						continue;
					case "xmlBase":
						Au(e, l, "xml:base", c, a, i);
						continue;
					case "xmlLang":
						Au(e, l, "xml:lang", c, a, i);
						continue;
					case "xmlSpace":
						Au(e, l, "xml:space", c, a, i);
						continue;
					case "inert":
						c !== "" || SS[l] || (SS[l] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", l)), ju(e, l, l, c, a, i);
						continue;
					default: if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") {
						s = rn(l), o = !1, r.context === US && t !== "svg" && t !== "math" ? a.delete(s.toLowerCase()) : (u = l.toLowerCase(), u = Lm.hasOwnProperty(u) && Lm[u] || null, u !== null && u !== l && (o = !0, a.delete(u)), a.delete(s));
						a: if (u = e, d = s, s = c, ot(d)) if (u.hasAttribute(d)) u = u.getAttribute(d), Oe(s, d), s = u === "" + s ? s : u;
						else {
							switch (typeof s) {
								case "function":
								case "symbol": break a;
								case "boolean": if (u = d.toLowerCase().slice(0, 5), u !== "data-" && u !== "aria-") break a;
							}
							s = s === void 0 ? void 0 : null;
						}
						else s = void 0;
						o || _u(l, s, c, i);
					}
				}
			}
			return 0 < a.size && !0 !== n.suppressHydrationWarning && vu(e, a, i), Object.keys(i).length === 0 ? null : i;
		}
		function Iu(e, t) {
			switch (e.length) {
				case 0: return "";
				case 1: return e[0];
				case 2: return e[0] + " " + t + " " + e[1];
				default: return e.slice(0, -1).join(", ") + ", " + t + " " + e[e.length - 1];
			}
		}
		function Lu(e) {
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
		function Ru() {
			if (typeof performance.getEntriesByType == "function") {
				for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
					var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
					if (a && s && Lu(o)) {
						for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
							var c = n[r], l = c.startTime;
							if (l > s) break;
							var u = c.transferSize, d = c.initiatorType;
							u && Lu(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
						}
						if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
					}
				}
				if (0 < e) return t / e / 1e6;
			}
			return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
		}
		function zu(e) {
			return e.nodeType === 9 ? e : e.ownerDocument;
		}
		function Bu(e) {
			switch (e) {
				case Fm: return WS;
				case Pm: return GS;
				default: return US;
			}
		}
		function Vu(e, t) {
			if (e === US) switch (t) {
				case "svg": return WS;
				case "math": return GS;
				default: return US;
			}
			return e === WS && t === "foreignObject" ? US : e;
		}
		function Hu(e, t) {
			return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
		}
		function Uu() {
			var e = window.event;
			return e && e.type === "popstate" ? e === YS ? !1 : (YS = e, !0) : (YS = null, !1);
		}
		function Wu() {
			var e = window.event;
			return e && e !== XS ? e.type : null;
		}
		function Gu() {
			var e = window.event;
			return e && e !== XS ? e.timeStamp : -1.1;
		}
		function Ku(e) {
			setTimeout(function() {
				throw e;
			});
		}
		function qu(e, t, n) {
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
		function Ju() {}
		function Yu(e, t, n, r) {
			Eu(e, t, n, r), e[Kp] = r;
		}
		function Xu(e) {
			Qt(e, "");
		}
		function Zu(e, t, n) {
			e.nodeValue = n;
		}
		function Qu(e) {
			if (!e.__reactWarnedAboutChildrenConflict) {
				var t = e[Kp] || null;
				if (t !== null) {
					var n = $e(e);
					n !== null && (typeof t.children == "string" || typeof t.children == "number" ? (e.__reactWarnedAboutChildrenConflict = !0, E(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"children\" text content using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})) : t.dangerouslySetInnerHTML != null && (e.__reactWarnedAboutChildrenConflict = !0, E(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"dangerouslySetInnerHTML\" using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})));
				}
			}
		}
		function $u(e) {
			return e === "head";
		}
		function ed(e, t) {
			e.removeChild(t);
		}
		function td(e, t) {
			(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).removeChild(t);
		}
		function nd(e, t) {
			var n = t, r = 0;
			do {
				var i = n.nextSibling;
				if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === MS || n === AS) {
					if (r === 0) {
						e.removeChild(i), xf(t);
						return;
					}
					r--;
				} else if (n === jS || n === NS || n === PS || n === FS || n === kS) r++;
				else if (n === IS) Dd(e.ownerDocument.documentElement);
				else if (n === RS) {
					n = e.ownerDocument.head, Dd(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[Qp] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === LS && Dd(e.ownerDocument.body);
				n = i;
			} while (n);
			xf(t);
		}
		function rd(e, t) {
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
		function id(e) {
			rd(e, !0);
		}
		function ad(e) {
			e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
		}
		function od(e) {
			e.nodeValue = "";
		}
		function sd(e) {
			rd(e, !1);
		}
		function cd(e, t) {
			t = t[HS], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
		}
		function ld(e, t) {
			e.nodeValue = t;
		}
		function ud(e) {
			var t = e.firstChild;
			for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
				var n = t;
				switch (t = t.nextSibling, n.nodeName) {
					case "HTML":
					case "HEAD":
					case "BODY":
						ud(n), Ze(n);
						continue;
					case "SCRIPT":
					case "STYLE": continue;
					case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
				}
				e.removeChild(n);
			}
		}
		function dd(e, t, n, r) {
			for (; e.nodeType === 1;) {
				var i = n;
				if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
					if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
				} else if (!r) if (t === "input" && e.type === "hidden") {
					Oe(i.name, "name");
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
				else if (!e[Qp]) switch (t) {
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
				if (e = _d(e.nextSibling), e === null) break;
			}
			return null;
		}
		function fd(e, t, n) {
			if (t === "") return null;
			for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = _d(e.nextSibling), e === null)) return null;
			return e;
		}
		function pd(e, t) {
			for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = _d(e.nextSibling), e === null)) return null;
			return e;
		}
		function md(e) {
			return e.data === NS || e.data === PS;
		}
		function hd(e) {
			return e.data === FS || e.data === NS && e.ownerDocument.readyState !== VS;
		}
		function gd(e, t) {
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
		function _d(e) {
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
		function vd(e) {
			if (e.nodeType === 1) {
				for (var t = e.nodeName.toLowerCase(), n = {}, r = e.attributes, i = 0; i < r.length; i++) {
					var a = r[i];
					n[Du(a.name)] = a.name.toLowerCase() === "style" ? Ou(e) : a.value;
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
		function yd(e, t, n) {
			return n === null || !0 !== n[OS] ? (e.nodeValue === t ? e = null : (t = xu(t), e = xu(e.nodeValue) === t ? null : e.nodeValue), e) : null;
		}
		function bd(e) {
			e = e.nextSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === MS || n === AS) {
						if (t === 0) return _d(e.nextSibling);
						t--;
					} else n !== jS && n !== FS && n !== NS && n !== PS && n !== kS || t++;
				}
				e = e.nextSibling;
			}
			return null;
		}
		function xd(e) {
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
		function Sd(e) {
			xf(e);
		}
		function Cd(e) {
			xf(e);
		}
		function wd(e) {
			xf(e);
		}
		function Td(e, t, n, r, i) {
			switch (i && Xt(e, r.ancestorInfo), t = zu(n), e) {
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
		function Ed(e, t, n, r) {
			if (!n[qp] && $e(n)) {
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
			Tu(n, e, t), n[Gp] = r, n[Kp] = t;
		}
		function Dd(e) {
			for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
			Ze(e);
		}
		function Od(e) {
			return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
		}
		function kd(e, t, n) {
			var r = dC;
			if (r && typeof t == "string" && t) {
				var i = _t(t);
				i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), lC.has(i) || (lC.add(i), e = {
					rel: e,
					crossOrigin: n,
					href: t
				}, r.querySelector(i) === null && (t = r.createElement("link"), Tu(t, "link", e), nt(t), r.head.appendChild(t)));
			}
		}
		function Ad(e, t, n, r) {
			var i = (i = ep.current) ? Od(i) : null;
			if (!i) throw Error("\"resourceRoot\" was expected to exist. This is a bug in React.");
			switch (e) {
				case "meta":
				case "title": return null;
				case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = B(n.href), t = tt(i).hoistableStyles, r = t.get(n), r || (r = {
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
						e = B(n.href);
						var a = tt(i).hoistableStyles, o = a.get(e);
						if (!o && (i = i.ownerDocument || i, o = {
							type: "stylesheet",
							instance: null,
							count: 0,
							state: {
								loading: rC,
								preload: null
							}
						}, a.set(e, o), (a = i.querySelector(Md(e))) && !a._p && (o.instance = a, o.state.loading = iC | sC), !cC.has(e))) {
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
							cC.set(e, s), a || Pd(i, e, s, o.state);
						}
						if (t && r === null) throw n = "\n\n  - " + jd(t) + "\n  + " + jd(n), Error("Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
						return o;
					}
					if (t && r !== null) throw n = "\n\n  - " + jd(t) + "\n  + " + jd(n), Error("Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
					return null;
				case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Fd(n), t = tt(i).hoistableScripts, r = t.get(n), r || (r = {
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
		function jd(e) {
			var t = 0, n = "<link";
			return typeof e.rel == "string" ? (t++, n += " rel=\"" + e.rel + "\"") : gp.call(e, "rel") && (t++, n += " rel=\"" + (e.rel === null ? "null" : "invalid type " + typeof e.rel) + "\""), typeof e.href == "string" ? (t++, n += " href=\"" + e.href + "\"") : gp.call(e, "href") && (t++, n += " href=\"" + (e.href === null ? "null" : "invalid type " + typeof e.href) + "\""), typeof e.precedence == "string" ? (t++, n += " precedence=\"" + e.precedence + "\"") : gp.call(e, "precedence") && (t++, n += " precedence={" + (e.precedence === null ? "null" : "invalid type " + typeof e.precedence) + "}"), Object.getOwnPropertyNames(e).length > t && (n += " ..."), n + " />";
		}
		function B(e) {
			return "href=\"" + _t(e) + "\"";
		}
		function Md(e) {
			return "link[rel=\"stylesheet\"][" + e + "]";
		}
		function Nd(e) {
			return V({}, e, {
				"data-precedence": e.precedence,
				precedence: null
			});
		}
		function Pd(e, t, n, r) {
			e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = iC : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
				return r.loading |= iC;
			}), t.addEventListener("error", function() {
				return r.loading |= aC;
			}), Tu(t, "link", n), nt(t), e.head.appendChild(t));
		}
		function Fd(e) {
			return "[src=\"" + _t(e) + "\"]";
		}
		function Id(e) {
			return "script[async]" + e;
		}
		function Ld(e, t, n) {
			if (t.count++, t.instance === null) switch (t.type) {
				case "style":
					var r = e.querySelector("style[data-href~=\"" + _t(n.href) + "\"]");
					if (r) return t.instance = r, nt(r), r;
					var i = V({}, n, {
						"data-href": n.href,
						"data-precedence": n.precedence,
						href: null,
						precedence: null
					});
					return r = (e.ownerDocument || e).createElement("style"), nt(r), Tu(r, "style", i), Rd(r, n.precedence, e), t.instance = r;
				case "stylesheet":
					i = B(n.href);
					var a = e.querySelector(Md(i));
					if (a) return t.state.loading |= sC, t.instance = a, nt(a), a;
					r = Nd(n), (i = cC.get(i)) && zd(r, i), a = (e.ownerDocument || e).createElement("link"), nt(a);
					var o = a;
					return o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Tu(a, "link", r), t.state.loading |= sC, Rd(a, n.precedence, e), t.instance = a;
				case "script": return a = Fd(n.src), (i = e.querySelector(Id(a))) ? (t.instance = i, nt(i), i) : (r = n, (i = cC.get(a)) && (r = V({}, n), Bd(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), nt(i), Tu(i, "link", r), e.head.appendChild(i), t.instance = i);
				case "void": return null;
				default: throw Error("acquireResource encountered a resource type it did not expect: \"" + t.type + "\". this is a bug in React.");
			}
			else t.type === "stylesheet" && (t.state.loading & sC) === rC && (r = t.instance, t.state.loading |= sC, Rd(r, n.precedence, e));
			return t.instance;
		}
		function Rd(e, t, n) {
			for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
				var s = r[o];
				if (s.dataset.precedence === t) a = s;
				else if (a !== i) break;
			}
			a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
		}
		function zd(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
		}
		function Bd(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
		}
		function Vd(e, t, n) {
			if (fC === null) {
				var r = /* @__PURE__ */ new Map(), i = fC = /* @__PURE__ */ new Map();
				i.set(n, r);
			} else i = fC, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
			if (r.has(e)) return r;
			for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
				var a = n[i];
				if (!(a[Qp] || a[Gp] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== Fm) {
					var o = a.getAttribute(t) || "";
					o = e + o;
					var s = r.get(o);
					s ? s.push(a) : r.set(o, [a]);
				}
			}
			return r;
		}
		function Hd(e, t, n) {
			e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
		}
		function Ud(e, t, n) {
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
							n = [], t.onLoad && n.push("`onLoad`"), i && n.push("`onError`"), a != null && n.push("`disabled`"), i = Iu(n, "and"), i += n.length === 1 ? " prop" : " props", a = n.length === 1 ? "an " + i : "the " + i, n.length && console.error("React encountered a <link rel=\"stylesheet\" href=\"%s\" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.", e, a, i);
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
		function Wd(e) {
			return !(e.type === "stylesheet" && (e.state.loading & oC) === rC);
		}
		function Gd(e, t, n, r) {
			if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && (n.state.loading & sC) === rC) {
				if (n.instance === null) {
					var i = B(r.href), a = t.querySelector(Md(i));
					if (a) {
						t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = qd.bind(e), t.then(e, e)), n.state.loading |= sC, n.instance = a, nt(a);
						return;
					}
					a = t.ownerDocument || t, r = Nd(r), (i = cC.get(i)) && zd(r, i), a = a.createElement("link"), nt(a);
					var o = a;
					o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Tu(a, "link", r), n.instance = a;
				}
				e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & oC) === rC && (e.count++, n = qd.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
			}
		}
		function Kd(e, t) {
			return e.stylesheets && e.count === 0 && Jd(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
				var r = setTimeout(function() {
					if (e.stylesheets && Jd(e, e.stylesheets), e.unsuspend) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, pC + t);
				0 < e.imgBytes && gC === 0 && (gC = 125 * Ru() * hC);
				var i = setTimeout(function() {
					if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Jd(e, e.stylesheets), e.unsuspend)) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, (e.imgBytes > gC ? 50 : mC) + t);
				return e.unsuspend = n, function() {
					e.unsuspend = null, clearTimeout(r), clearTimeout(i);
				};
			} : null;
		}
		function qd() {
			if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
				if (this.stylesheets) Jd(this, this.stylesheets);
				else if (this.unsuspend) {
					var e = this.unsuspend;
					this.unsuspend = null, e();
				}
			}
		}
		function Jd(e, t) {
			e.stylesheets = null, e.unsuspend !== null && (e.count++, vC = /* @__PURE__ */ new Map(), t.forEach(Yd, e), vC = null, qd.call(e));
		}
		function Yd(e, t) {
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
				i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(_C, i), n.set(o, i), this.count++, r = qd.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= sC;
			}
		}
		function Xd(e, t, n, r, i, a, o, s, c) {
			for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = $S, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ze(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ze(0), this.hiddenUpdates = ze(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
			this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
		}
		function Zd(e, t, n, r, i, a, o, s, c, l, u, d) {
			return e = new Xd(e, t, n, o, c, l, u, d, s), t = Ig, !0 === a && (t |= Lg | Rg), t |= K, a = h(3, null, null, t), e.current = a, a.stateNode = e, t = ui(), di(t), e.pooledCache = t, di(t), a.memoizedState = {
				element: r,
				isDehydrated: n,
				cache: t
			}, na(a), e;
		}
		function Qd(e) {
			return e ? (e = Ng, e) : Ng;
		}
		function $d(e, t, n, r, i, a) {
			if (jp && typeof jp.onScheduleFiberRoot == "function") try {
				jp.onScheduleFiberRoot(Ap, r, n);
			} catch (e) {
				Mp || (Mp = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			i = Qd(i), r.context === null ? r.context = i : r.pendingContext = i, hp && mp !== null && !EC && (EC = !0, console.error("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", S(mp) || "Unknown")), r = ia(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", a), r.callback = a), n = aa(e, r, t), n !== null && (pi(t, "root.render()", null), tl(n, e, t), O(n, e, t));
		}
		function ef(e, t) {
			if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
				var n = e.retryLane;
				e.retryLane = n !== 0 && n < t ? n : t;
			}
		}
		function tf(e, t) {
			ef(e, t), (e = e.alternate) && ef(e, t);
		}
		function nf(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = gr(e, 67108864);
				t !== null && tl(t, e, 67108864), tf(e, 67108864);
			}
		}
		function rf(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = $c(e);
				t = Ge(t);
				var n = gr(e, t);
				n !== null && tl(n, e, t), tf(e, t);
			}
		}
		function af() {
			return mp;
		}
		function of(e, t, n, r) {
			var i = H.T;
			H.T = null;
			var a = qf.p;
			try {
				qf.p = Bp, cf(e, t, n, r);
			} finally {
				qf.p = a, H.T = i;
			}
		}
		function sf(e, t, n, r) {
			var i = H.T;
			H.T = null;
			var a = qf.p;
			try {
				qf.p = Vp, cf(e, t, n, r);
			} finally {
				qf.p = a, H.T = i;
			}
		}
		function cf(e, t, n, r) {
			if (LC) {
				var i = lf(r);
				if (i === null) du(e, t, r, RC, n), ff(e, r);
				else if (mf(i, e, t, n, r)) r.stopPropagation();
				else if (ff(e, r), t & 4 && -1 < KC.indexOf(e)) {
					for (; i !== null;) {
						var a = $e(i);
						if (a !== null) switch (a.tag) {
							case 3:
								if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
									var o = Pe(a.pendingLanes);
									if (o !== 0) {
										var s = a;
										for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
											var c = 1 << 31 - Pp(o);
											s.entanglements[1] |= c, o &= ~c;
										}
										Jl(a), (Ub & (Pb | Fb)) === Nb && (yx = xp() + bx, R(0, !1));
									}
								}
								break;
							case 31:
							case 13: s = gr(a, 2), s !== null && tl(s, a, 2), ol(), tf(a, 2);
						}
						if (a = lf(r), a === null && du(e, t, r, RC, n), a === i) break;
						i = a;
					}
					i !== null && r.stopPropagation();
				} else du(e, t, r, null, n);
			}
		}
		function lf(e) {
			return e = dn(e), uf(e);
		}
		function uf(e) {
			if (RC = null, e = Qe(e), e !== null) {
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
		function df(e) {
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
				case "selectstart": return Bp;
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
				case "pointerleave": return Vp;
				case "message": switch (Sp()) {
					case Cp: return Bp;
					case wp: return Vp;
					case Tp:
					case Ep: return Hp;
					case Dp: return Up;
					default: return Hp;
				}
				default: return Hp;
			}
		}
		function ff(e, t) {
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
		function pf(e, t, n, r, i, a) {
			return e === null || e.nativeEvent !== a ? (e = {
				blockedOn: t,
				domEventName: n,
				eventSystemFlags: r,
				nativeEvent: a,
				targetContainers: [i]
			}, t !== null && (t = $e(t), t !== null && nf(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
		}
		function mf(e, t, n, r, i) {
			switch (t) {
				case "focusin": return BC = pf(BC, e, t, n, r, i), !0;
				case "dragenter": return VC = pf(VC, e, t, n, r, i), !0;
				case "mouseover": return HC = pf(HC, e, t, n, r, i), !0;
				case "pointerover":
					var a = i.pointerId;
					return UC.set(a, pf(UC.get(a) || null, e, t, n, r, i)), !0;
				case "gotpointercapture": return a = i.pointerId, WC.set(a, pf(WC.get(a) || null, e, t, n, r, i)), !0;
			}
			return !1;
		}
		function hf(e) {
			var t = Qe(e.target);
			if (t !== null) {
				var n = b(t);
				if (n !== null) {
					if (t = n.tag, t === 13) {
						if (t = x(n), t !== null) {
							e.blockedOn = t, Xe(e.priority, function() {
								rf(n);
							});
							return;
						}
					} else if (t === 31) {
						if (t = ee(n), t !== null) {
							e.blockedOn = t, Xe(e.priority, function() {
								rf(n);
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
		function gf(e) {
			if (e.blockedOn !== null) return !1;
			for (var t = e.targetContainers; 0 < t.length;) {
				var n = lf(e.nativeEvent);
				if (n === null) {
					n = e.nativeEvent;
					var r = new n.constructor(n.type, n), i = r;
					Ym !== null && console.error("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Ym = i, n.target.dispatchEvent(r), Ym === null && console.error("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Ym = null;
				} else return t = $e(n), t !== null && nf(t), e.blockedOn = n, !1;
				t.shift();
			}
			return !0;
		}
		function _f(e, t, n) {
			gf(e) && n.delete(t);
		}
		function vf() {
			zC = !1, BC !== null && gf(BC) && (BC = null), VC !== null && gf(VC) && (VC = null), HC !== null && gf(HC) && (HC = null), UC.forEach(_f), WC.forEach(_f);
		}
		function yf(e, t) {
			e.blockedOn === t && (e.blockedOn = null, zC || (zC = !0, Ef.unstable_scheduleCallback(Ef.unstable_NormalPriority, vf)));
		}
		function bf(e) {
			qC !== e && (qC = e, Ef.unstable_scheduleCallback(Ef.unstable_NormalPriority, function() {
				qC === e && (qC = null);
				for (var t = 0; t < e.length; t += 3) {
					var n = e[t], r = e[t + 1], i = e[t + 2];
					if (typeof r != "function") {
						if (uf(r || n) === null) continue;
						break;
					}
					var a = $e(n);
					a !== null && (e.splice(t, 3), t -= 3, n = {
						pending: !0,
						data: i,
						method: n.method,
						action: r
					}, Object.freeze(n), Mo(a, n, r, i));
				}
			}));
		}
		function xf(e) {
			function t(t) {
				return yf(t, e);
			}
			BC !== null && yf(BC, e), VC !== null && yf(VC, e), HC !== null && yf(HC, e), UC.forEach(t), WC.forEach(t);
			for (var n = 0; n < GC.length; n++) {
				var r = GC[n];
				r.blockedOn === e && (r.blockedOn = null);
			}
			for (; 0 < GC.length && (n = GC[0], n.blockedOn === null);) hf(n), n.blockedOn === null && GC.shift();
			if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
				var i = n[r], a = n[r + 1], o = i[Kp] || null;
				if (typeof a == "function") o || bf(n);
				else if (o) {
					var s = null;
					if (a && a.hasAttribute("formAction")) {
						if (i = a, o = a[Kp] || null) s = o.formAction;
						else if (uf(i) !== null) continue;
					} else s = o.action;
					typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), bf(n);
				}
			}
		}
		function Sf() {
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
		function Cf(e) {
			this._internalRoot = e;
		}
		function wf(e) {
			this._internalRoot = e;
		}
		function Tf(e) {
			e[qp] && (e._reactRootContainer ? console.error("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : console.error("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var Ef = i(), Df = r(), Of = Ps(), V = Object.assign, kf = Symbol.for("react.element"), Af = Symbol.for("react.transitional.element"), jf = Symbol.for("react.portal"), Mf = Symbol.for("react.fragment"), Nf = Symbol.for("react.strict_mode"), Pf = Symbol.for("react.profiler"), Ff = Symbol.for("react.consumer"), If = Symbol.for("react.context"), Lf = Symbol.for("react.forward_ref"), Rf = Symbol.for("react.suspense"), zf = Symbol.for("react.suspense_list"), Bf = Symbol.for("react.memo"), Vf = Symbol.for("react.lazy"), Hf = Symbol.for("react.activity"), Uf = Symbol.for("react.memo_cache_sentinel"), Wf = Symbol.iterator, Gf = Symbol.for("react.client.reference"), Kf = Array.isArray, H = Df.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, qf = Of.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Jf = Object.freeze({
			pending: !1,
			data: null,
			method: null,
			action: null
		}), Yf = [], Xf = [], Zf = -1, Qf = se(null), $f = se(null), ep = se(null), tp = se(null), np = 0, rp, ip, ap, op, sp, cp, lp;
		pe.__reactDisabledLog = !0;
		var up, dp, fp = !1, pp = new (typeof WeakMap == "function" ? WeakMap : Map)(), mp = null, hp = !1, gp = Object.prototype.hasOwnProperty, _p = Ef.unstable_scheduleCallback, vp = Ef.unstable_cancelCallback, yp = Ef.unstable_shouldYield, bp = Ef.unstable_requestPaint, xp = Ef.unstable_now, Sp = Ef.unstable_getCurrentPriorityLevel, Cp = Ef.unstable_ImmediatePriority, wp = Ef.unstable_UserBlockingPriority, Tp = Ef.unstable_NormalPriority, Ep = Ef.unstable_LowPriority, Dp = Ef.unstable_IdlePriority, Op = Ef.log, kp = Ef.unstable_setDisableYieldValue, Ap = null, jp = null, Mp = !1, Np = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", Pp = Math.clz32 ? Math.clz32 : Ne, Fp = Math.log, Ip = Math.LN2, Lp = 256, Rp = 262144, zp = 4194304, Bp = 2, Vp = 8, Hp = 32, Up = 268435456, Wp = Math.random().toString(36).slice(2), Gp = "__reactFiber$" + Wp, Kp = "__reactProps$" + Wp, qp = "__reactContainer$" + Wp, Jp = "__reactEvents$" + Wp, Yp = "__reactListeners$" + Wp, Xp = "__reactHandles$" + Wp, Zp = "__reactResources$" + Wp, Qp = "__reactMarker$" + Wp, $p = /* @__PURE__ */ new Set(), em = {}, tm = {}, nm = {
			button: !0,
			checkbox: !0,
			image: !0,
			hidden: !0,
			radio: !0,
			reset: !0,
			submit: !0
		}, rm = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), im = {}, am = {}, om = /[\n"\\]/g, sm = !1, cm = !1, lm = !1, um = !1, dm = !1, fm = !1, pm = ["value", "defaultValue"], mm = !1, hm = /["'&<>\n\t]|^\s|\s$/, gm = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(" "), _m = "applet caption html table td th marquee object template foreignObject desc title".split(" "), vm = _m.concat(["button"]), ym = "dd dt li option optgroup p rp rt".split(" "), bm = {
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
		}, xm = {}, Sm = {
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
		}, Cm = /([A-Z])/g, wm = /^ms-/, Tm = /^(?:webkit|moz|o)[A-Z]/, Em = /^-ms-/, Dm = /-(.)/g, Om = /;\s*$/, km = {}, Am = {}, jm = !1, Mm = !1, Nm = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), Pm = "http://www.w3.org/1998/Math/MathML", Fm = "http://www.w3.org/2000/svg", Im = /* @__PURE__ */ new Map([
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
		]), Lm = {
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
		}, Rm = {
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
		}, zm = {}, Bm = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Vm = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Hm = !1, Um = {}, Wm = /^on./, Gm = /^on[^A-Z]/, Km = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), qm = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Jm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, Ym = null, Xm = null, Zm = null, Qm = !1, $m = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), eh = !1;
		if ($m) try {
			var th = {};
			Object.defineProperty(th, "passive", { get: function() {
				eh = !0;
			} }), window.addEventListener("test", th, th), window.removeEventListener("test", th, th);
		} catch {
			eh = !1;
		}
		var nh = null, rh = null, ih = null, ah = {
			eventPhase: 0,
			bubbles: 0,
			cancelable: 0,
			timeStamp: function(e) {
				return e.timeStamp || Date.now();
			},
			defaultPrevented: 0,
			isTrusted: 0
		}, oh = yn(ah), sh = V({}, ah, {
			view: 0,
			detail: 0
		}), ch = yn(sh), lh, uh, dh, fh = V({}, sh, {
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
				return "movementX" in e ? e.movementX : (e !== dh && (dh && e.type === "mousemove" ? (lh = e.screenX - dh.screenX, uh = e.screenY - dh.screenY) : uh = lh = 0, dh = e), lh);
			},
			movementY: function(e) {
				return "movementY" in e ? e.movementY : uh;
			}
		}), ph = yn(fh), mh = yn(V({}, fh, { dataTransfer: 0 })), hh = yn(V({}, sh, { relatedTarget: 0 })), gh = yn(V({}, ah, {
			animationName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), _h = yn(V({}, ah, { clipboardData: function(e) {
			return "clipboardData" in e ? e.clipboardData : window.clipboardData;
		} })), vh = yn(V({}, ah, { data: 0 })), yh = vh, bh = {
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
		}, xh = {
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
		}, Sh = {
			Alt: "altKey",
			Control: "ctrlKey",
			Meta: "metaKey",
			Shift: "shiftKey"
		}, Ch = yn(V({}, sh, {
			key: function(e) {
				if (e.key) {
					var t = bh[e.key] || e.key;
					if (t !== "Unidentified") return t;
				}
				return e.type === "keypress" ? (e = gn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? xh[e.keyCode] || "Unidentified" : "";
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
		})), wh = yn(V({}, fh, {
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
		})), Th = yn(V({}, sh, {
			touches: 0,
			targetTouches: 0,
			changedTouches: 0,
			altKey: 0,
			metaKey: 0,
			ctrlKey: 0,
			shiftKey: 0,
			getModifierState: xn
		})), Eh = yn(V({}, ah, {
			propertyName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), Dh = yn(V({}, fh, {
			deltaX: function(e) {
				return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
			},
			deltaY: function(e) {
				return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
			},
			deltaZ: 0,
			deltaMode: 0
		})), Oh = yn(V({}, ah, {
			newState: 0,
			oldState: 0
		})), kh = [
			9,
			13,
			27,
			32
		], Ah = 229, jh = $m && "CompositionEvent" in window, Mh = null;
		$m && "documentMode" in document && (Mh = document.documentMode);
		var Nh = $m && "TextEvent" in window && !Mh, Ph = $m && (!jh || Mh && 8 < Mh && 11 >= Mh), Fh = 32, Ih = String.fromCharCode(Fh), Lh = !1, Rh = !1, zh = {
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
		}, Bh = null, Vh = null, Hh = !1;
		$m && (Hh = Dn("input") && (!document.documentMode || 9 < document.documentMode));
		var Uh = typeof Object.is == "function" ? Object.is : Rn, Wh = $m && "documentMode" in document && 11 >= document.documentMode, Gh = null, Kh = null, qh = null, Jh = !1, Yh = {
			animationend: Kn("Animation", "AnimationEnd"),
			animationiteration: Kn("Animation", "AnimationIteration"),
			animationstart: Kn("Animation", "AnimationStart"),
			transitionrun: Kn("Transition", "TransitionRun"),
			transitionstart: Kn("Transition", "TransitionStart"),
			transitioncancel: Kn("Transition", "TransitionCancel"),
			transitionend: Kn("Transition", "TransitionEnd")
		}, Xh = {}, Zh = {};
		$m && (Zh = document.createElement("div").style, "AnimationEvent" in window || (delete Yh.animationend.animation, delete Yh.animationiteration.animation, delete Yh.animationstart.animation), "TransitionEvent" in window || delete Yh.transitionend.transition);
		var Qh = qn("animationend"), $h = qn("animationiteration"), eg = qn("animationstart"), tg = qn("transitionrun"), ng = qn("transitionstart"), rg = qn("transitioncancel"), ig = qn("transitionend"), ag = /* @__PURE__ */ new Map(), og = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
		og.push("scrollEnd");
		var sg = 0;
		if (typeof performance == "object" && typeof performance.now == "function") var cg = performance, lg = function() {
			return cg.now();
		};
		else {
			var ug = Date;
			lg = function() {
				return ug.now();
			};
		}
		var dg = typeof reportError == "function" ? reportError : function(e) {
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
		}, fg = "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.", pg = 0, mg = 1, hg = 2, gg = 3, _g = "–\xA0", vg = "+\xA0", yg = " \xA0", bg = typeof console < "u" && typeof console.timeStamp == "function" && typeof performance < "u" && typeof performance.measure == "function", xg = "Components ⚛", U = "Scheduler ⚛", W = "Blocking", Sg = !1, Cg = {
			color: "primary",
			properties: null,
			tooltipText: "",
			track: xg
		}, wg = {
			start: -0,
			end: -0,
			detail: { devtools: Cg }
		}, Tg = ["Changed Props", ""], Eg = "This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner.", Dg = ["Changed Props", Eg], Og = 1, kg = 2, Ag = [], jg = 0, Mg = 0, Ng = {};
		Object.freeze(Ng);
		var Pg = null, Fg = null, G = 0, Ig = 1, K = 2, Lg = 8, Rg = 16, zg = 32, Bg = !1;
		try {
			Object.preventExtensions({});
		} catch {
			Bg = !0;
		}
		var Vg = /* @__PURE__ */ new WeakMap(), Hg = [], Ug = 0, Wg = null, Gg = 0, Kg = [], qg = 0, Jg = null, Yg = 1, Xg = "", Zg = null, Qg = null, $g = !1, e_ = !1, t_ = null, n_ = null, r_ = !1, i_ = Error("Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), a_ = se(null), o_ = se(null), s_ = {}, c_ = null, l_ = null, u_ = !1, d_ = typeof AbortController < "u" ? AbortController : function() {
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
		}, f_ = Ef.unstable_scheduleCallback, p_ = Ef.unstable_NormalPriority, m_ = {
			$$typeof: If,
			Consumer: null,
			Provider: null,
			_currentValue: null,
			_currentValue2: null,
			_threadCount: 0,
			_currentRenderer: null,
			_currentRenderer2: null
		}, h_ = Ef.unstable_now, g_ = console.createTask ? console.createTask : function() {
			return null;
		}, __ = 1, v_ = 2, y_ = -0, b_ = -0, x_ = -0, S_ = null, C_ = -1.1, w_ = -0, T_ = -0, q = -1.1, J = -1.1, E_ = null, D_ = !1, O_ = -0, k_ = -1.1, A_ = null, j_ = 0, M_ = null, N_ = null, P_ = -1.1, F_ = null, I_ = -1.1, L_ = -1.1, R_ = -0, z_ = -1.1, B_ = -1.1, V_ = 0, H_ = null, U_ = null, W_ = null, G_ = -1.1, K_ = null, q_ = -1.1, J_ = -1.1, Y_ = -0, X_ = -0, Z_ = 0, Q_ = null, $_ = 0, ev = -1.1, tv = !1, nv = !1, rv = null, iv = 0, av = 0, ov = null, sv = H.S;
		H.S = function(e, t) {
			if (_x = xp(), typeof t == "object" && t && typeof t.then == "function") {
				if (0 > z_ && 0 > B_) {
					z_ = h_();
					var n = Gu(), r = Wu();
					(n !== q_ || r !== K_) && (q_ = -1.1), G_ = n, K_ = r;
				}
				Mi(e, t);
			}
			sv !== null && sv(e, t);
		};
		var cv = se(null), lv = {
			recordUnsafeLifecycleWarnings: function() {},
			flushPendingUnsafeLifecycleWarnings: function() {},
			recordLegacyContextWarning: function() {},
			flushLegacyContextWarning: function() {},
			discardPendingWarnings: function() {}
		}, uv = [], dv = [], fv = [], pv = [], mv = [], hv = [], gv = /* @__PURE__ */ new Set();
		lv.recordUnsafeLifecycleWarnings = function(e, t) {
			gv.has(e.type) || (typeof t.componentWillMount == "function" && !0 !== t.componentWillMount.__suppressDeprecationWarning && uv.push(e), e.mode & Lg && typeof t.UNSAFE_componentWillMount == "function" && dv.push(e), typeof t.componentWillReceiveProps == "function" && !0 !== t.componentWillReceiveProps.__suppressDeprecationWarning && fv.push(e), e.mode & Lg && typeof t.UNSAFE_componentWillReceiveProps == "function" && pv.push(e), typeof t.componentWillUpdate == "function" && !0 !== t.componentWillUpdate.__suppressDeprecationWarning && mv.push(e), e.mode & Lg && typeof t.UNSAFE_componentWillUpdate == "function" && hv.push(e));
		}, lv.flushPendingUnsafeLifecycleWarnings = function() {
			var e = /* @__PURE__ */ new Set();
			0 < uv.length && (uv.forEach(function(t) {
				e.add(S(t) || "Component"), gv.add(t.type);
			}), uv = []);
			var t = /* @__PURE__ */ new Set();
			0 < dv.length && (dv.forEach(function(e) {
				t.add(S(e) || "Component"), gv.add(e.type);
			}), dv = []);
			var n = /* @__PURE__ */ new Set();
			0 < fv.length && (fv.forEach(function(e) {
				n.add(S(e) || "Component"), gv.add(e.type);
			}), fv = []);
			var r = /* @__PURE__ */ new Set();
			0 < pv.length && (pv.forEach(function(e) {
				r.add(S(e) || "Component"), gv.add(e.type);
			}), pv = []);
			var i = /* @__PURE__ */ new Set();
			0 < mv.length && (mv.forEach(function(e) {
				i.add(S(e) || "Component"), gv.add(e.type);
			}), mv = []);
			var a = /* @__PURE__ */ new Set();
			if (0 < hv.length && (hv.forEach(function(e) {
				a.add(S(e) || "Component"), gv.add(e.type);
			}), hv = []), 0 < t.size) {
				var o = m(t);
				console.error("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s", o);
			}
			0 < r.size && (o = m(r), console.error("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n\nPlease update the following components: %s", o)), 0 < a.size && (o = m(a), console.error("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s", o)), 0 < e.size && (o = m(e), console.warn("componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < n.size && (o = m(n), console.warn("componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < i.size && (o = m(i), console.warn("componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o));
		};
		var _v = /* @__PURE__ */ new Map(), vv = /* @__PURE__ */ new Set();
		lv.recordLegacyContextWarning = function(e, t) {
			for (var n = null, r = e; r !== null;) r.mode & Lg && (n = r), r = r.return;
			n === null ? console.error("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.") : !vv.has(e.type) && (r = _v.get(n), e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (r === void 0 && (r = [], _v.set(n, r)), r.push(e));
		}, lv.flushLegacyContextWarning = function() {
			_v.forEach(function(e) {
				if (e.length !== 0) {
					var t = e[0], n = /* @__PURE__ */ new Set();
					e.forEach(function(e) {
						n.add(S(e) || "Component"), vv.add(e.type);
					});
					var r = m(n);
					E(t, function() {
						console.error("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://react.dev/link/legacy-context", r);
					});
				}
			});
		}, lv.discardPendingWarnings = function() {
			uv = [], dv = [], fv = [], pv = [], mv = [], hv = [], _v = /* @__PURE__ */ new Map();
		};
		var yv = { react_stack_bottom_frame: function(e, t, n) {
			var r = hp;
			hp = !0;
			try {
				return e(t, n);
			} finally {
				hp = r;
			}
		} }, bv = yv.react_stack_bottom_frame.bind(yv), xv = { react_stack_bottom_frame: function(e) {
			var t = hp;
			hp = !0;
			try {
				return e.render();
			} finally {
				hp = t;
			}
		} }, Sv = xv.react_stack_bottom_frame.bind(xv), Cv = { react_stack_bottom_frame: function(e, t) {
			try {
				t.componentDidMount();
			} catch (t) {
				Fl(e, e.return, t);
			}
		} }, wv = Cv.react_stack_bottom_frame.bind(Cv), Tv = { react_stack_bottom_frame: function(e, t, n, r, i) {
			try {
				t.componentDidUpdate(n, r, i);
			} catch (t) {
				Fl(e, e.return, t);
			}
		} }, Ev = Tv.react_stack_bottom_frame.bind(Tv), Dv = { react_stack_bottom_frame: function(e, t) {
			var n = t.stack;
			e.componentDidCatch(t.value, { componentStack: n === null ? "" : n });
		} }, Ov = Dv.react_stack_bottom_frame.bind(Dv), kv = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n.componentWillUnmount();
			} catch (n) {
				Fl(e, t, n);
			}
		} }, Av = kv.react_stack_bottom_frame.bind(kv), jv = { react_stack_bottom_frame: function(e) {
			var t = e.create;
			return e = e.inst, t = t(), e.destroy = t;
		} }, Mv = jv.react_stack_bottom_frame.bind(jv), Nv = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n();
			} catch (n) {
				Fl(e, t, n);
			}
		} }, Pv = Nv.react_stack_bottom_frame.bind(Nv), Fv = { react_stack_bottom_frame: function(e) {
			var t = e._init;
			return t(e._payload);
		} }, Iv = Fv.react_stack_bottom_frame.bind(Fv), Lv = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."), Rv = Error("Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), zv = Error("Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."), Bv = { then: function() {
			console.error("Internal React error: A listener was unexpectedly attached to a \"noop\" thenable. This is a bug in React. Please file an issue.");
		} }, Vv = null, Hv = !1, Uv = null, Wv = 0, Y = null, Gv, Kv = Gv = !1, qv = {}, Jv = {}, Yv = {};
		p = function(e, t, n) {
			if (typeof n == "object" && n && n._store && (!n._store.validated && n.key == null || n._store.validated === 2)) {
				if (typeof n._store != "object") throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
				n._store.validated = 1;
				var r = S(e), i = r || "null";
				if (!qv[i]) {
					qv[i] = !0, n = n._owner, e = e._debugOwner;
					var a = "";
					e && typeof e.tag == "number" && (i = S(e)) && (a = "\n\nCheck the render method of `" + i + "`."), a || r && (a = "\n\nCheck the top-level render call using <" + r + ">.");
					var o = "";
					n != null && e !== n && (r = null, typeof n.tag == "number" ? r = S(n) : typeof n.name == "string" && (r = n.name), r && (o = " It was passed a child from " + r + ".")), E(t, function() {
						console.error("Each child in a list should have a unique \"key\" prop.%s%s See https://react.dev/link/warning-keys for more information.", a, o);
					});
				}
			}
		};
		var Xv = ea(!0), Zv = ea(!1), Qv = 0, $v = 1, ey = 2, ty = 3, ny = !1, ry = !1, iy = null, ay = !1, oy = se(null), sy = se(0), cy = se(null), ly = null, uy = 1, dy = 2, fy = se(0), py = 0, my = 1, hy = 2, gy = 4, _y = 8, vy, yy = /* @__PURE__ */ new Set(), by = /* @__PURE__ */ new Set(), xy = /* @__PURE__ */ new Set(), Sy = /* @__PURE__ */ new Set(), Cy = 0, X = null, wy = null, Ty = null, Ey = !1, Dy = !1, Oy = !1, ky = 0, Ay = 0, jy = null, My = 0, Ny = 25, Z = null, Py = null, Fy = -1, Iy = !1, Ly = {
			readContext: si,
			use: Na,
			useCallback: Sa,
			useContext: Sa,
			useEffect: Sa,
			useImperativeHandle: Sa,
			useLayoutEffect: Sa,
			useInsertionEffect: Sa,
			useMemo: Sa,
			useReducer: Sa,
			useRef: Sa,
			useState: Sa,
			useDebugValue: Sa,
			useDeferredValue: Sa,
			useTransition: Sa,
			useSyncExternalStore: Sa,
			useId: Sa,
			useHostTransitionStatus: Sa,
			useFormState: Sa,
			useActionState: Sa,
			useOptimistic: Sa,
			useMemoCache: Sa,
			useCacheRefresh: Sa
		};
		Ly.useEffectEvent = Sa;
		var Ry = null, zy = null, By = null, Vy = null, Hy = null, Uy = null, Wy = null;
		Ry = {
			readContext: function(e) {
				return si(e);
			},
			use: Na,
			useCallback: function(e, t) {
				return Z = "useCallback", A(), ba(t), I(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", A(), si(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", A(), ba(t), ho(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", A(), ba(n), bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", A(), ba(t), po(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", A(), ba(t), vo(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", A(), ba(t);
				var n = H.H;
				H.H = Hy;
				try {
					return Co(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", A();
				var r = H.H;
				H.H = Hy;
				try {
					return Ia(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", A(), fo(e);
			},
			useState: function(e) {
				Z = "useState", A();
				var t = H.H;
				H.H = Hy;
				try {
					return qa(e);
				} finally {
					H.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", A();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", A(), To(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", A(), Fo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", A(), za(e, t, n);
			},
			useId: function() {
				return Z = "useId", A(), zo();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", A(), xa(), ao(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", A(), ao(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", A(), Ja(e);
			},
			useHostTransitionStatus: Ro,
			useMemoCache: Pa,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", A(), Bo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", A(), _o(e);
			}
		}, zy = {
			readContext: function(e) {
				return si(e);
			},
			use: Na,
			useCallback: function(e, t) {
				return Z = "useCallback", j(), I(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", j(), si(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", j(), ho(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", j(), bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", j(), po(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", j(), vo(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", j();
				var n = H.H;
				H.H = Hy;
				try {
					return Co(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", j();
				var r = H.H;
				H.H = Hy;
				try {
					return Ia(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", j(), fo(e);
			},
			useState: function(e) {
				Z = "useState", j();
				var t = H.H;
				H.H = Hy;
				try {
					return qa(e);
				} finally {
					H.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", j();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", j(), To(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", j(), Fo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", j(), za(e, t, n);
			},
			useId: function() {
				return Z = "useId", j(), zo();
			},
			useActionState: function(e, t) {
				return Z = "useActionState", j(), ao(e, t);
			},
			useFormState: function(e, t) {
				return Z = "useFormState", j(), xa(), ao(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", j(), Ja(e);
			},
			useHostTransitionStatus: Ro,
			useMemoCache: Pa,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", j(), Bo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", j(), _o(e);
			}
		}, By = {
			readContext: function(e) {
				return si(e);
			},
			use: Na,
			useCallback: function(e, t) {
				return Z = "useCallback", j(), So(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", j(), si(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", j(), mo(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", j(), xo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", j(), mo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", j(), mo(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", j();
				var n = H.H;
				H.H = Uy;
				try {
					return wo(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", j();
				var r = H.H;
				H.H = Uy;
				try {
					return La(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", j(), Aa().memoizedState;
			},
			useState: function() {
				Z = "useState", j();
				var e = H.H;
				H.H = Uy;
				try {
					return La(Fa);
				} finally {
					H.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", j();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", j(), Eo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", j(), Io();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", j(), Ba(e, t, n);
			},
			useId: function() {
				return Z = "useId", j(), Aa().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", j(), xa(), oo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", j(), oo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", j(), Ya(e, t);
			},
			useHostTransitionStatus: Ro,
			useMemoCache: Pa,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", j(), Aa().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", j(), F(e);
			}
		}, Vy = {
			readContext: function(e) {
				return si(e);
			},
			use: Na,
			useCallback: function(e, t) {
				return Z = "useCallback", j(), So(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", j(), si(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", j(), mo(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", j(), xo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", j(), mo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", j(), mo(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", j();
				var n = H.H;
				H.H = Wy;
				try {
					return wo(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", j();
				var r = H.H;
				H.H = Wy;
				try {
					return P(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", j(), Aa().memoizedState;
			},
			useState: function() {
				Z = "useState", j();
				var e = H.H;
				H.H = Wy;
				try {
					return P(Fa);
				} finally {
					H.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", j();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", j(), Do(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", j(), Lo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", j(), Ba(e, t, n);
			},
			useId: function() {
				return Z = "useId", j(), Aa().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", j(), xa(), lo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", j(), lo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", j(), Za(e, t);
			},
			useHostTransitionStatus: Ro,
			useMemoCache: Pa,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", j(), Aa().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", j(), F(e);
			}
		}, Hy = {
			readContext: function(e) {
				return d(), si(e);
			},
			use: function(e) {
				return u(), Na(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", u(), A(), I(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", u(), A(), si(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", u(), A(), ho(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", u(), A(), bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", u(), A(), po(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", u(), A(), vo(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", u(), A();
				var n = H.H;
				H.H = Hy;
				try {
					return Co(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", u(), A();
				var r = H.H;
				H.H = Hy;
				try {
					return Ia(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", u(), A(), fo(e);
			},
			useState: function(e) {
				Z = "useState", u(), A();
				var t = H.H;
				H.H = Hy;
				try {
					return qa(e);
				} finally {
					H.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", u(), A();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", u(), A(), To(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", u(), A(), Fo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", u(), A(), za(e, t, n);
			},
			useId: function() {
				return Z = "useId", u(), A(), zo();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", u(), A(), ao(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", u(), A(), ao(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", u(), A(), Ja(e);
			},
			useMemoCache: function(e) {
				return u(), Pa(e);
			},
			useHostTransitionStatus: Ro,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", A(), Bo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", u(), A(), _o(e);
			}
		}, Uy = {
			readContext: function(e) {
				return d(), si(e);
			},
			use: function(e) {
				return u(), Na(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", u(), j(), So(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", u(), j(), si(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", u(), j(), mo(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", u(), j(), xo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", u(), j(), mo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", u(), j(), mo(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", u(), j();
				var n = H.H;
				H.H = Uy;
				try {
					return wo(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", u(), j();
				var r = H.H;
				H.H = Uy;
				try {
					return La(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", u(), j(), Aa().memoizedState;
			},
			useState: function() {
				Z = "useState", u(), j();
				var e = H.H;
				H.H = Uy;
				try {
					return La(Fa);
				} finally {
					H.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", u(), j();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", u(), j(), Eo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", u(), j(), Io();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", u(), j(), Ba(e, t, n);
			},
			useId: function() {
				return Z = "useId", u(), j(), Aa().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", u(), j(), oo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", u(), j(), oo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", u(), j(), Ya(e, t);
			},
			useMemoCache: function(e) {
				return u(), Pa(e);
			},
			useHostTransitionStatus: Ro,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", j(), Aa().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", u(), j(), F(e);
			}
		}, Wy = {
			readContext: function(e) {
				return d(), si(e);
			},
			use: function(e) {
				return u(), Na(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", u(), j(), So(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", u(), j(), si(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", u(), j(), mo(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", u(), j(), xo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", u(), j(), mo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", u(), j(), mo(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", u(), j();
				var n = H.H;
				H.H = Uy;
				try {
					return wo(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", u(), j();
				var r = H.H;
				H.H = Uy;
				try {
					return P(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", u(), j(), Aa().memoizedState;
			},
			useState: function() {
				Z = "useState", u(), j();
				var e = H.H;
				H.H = Uy;
				try {
					return P(Fa);
				} finally {
					H.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", u(), j();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", u(), j(), Do(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", u(), j(), Lo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", u(), j(), Ba(e, t, n);
			},
			useId: function() {
				return Z = "useId", u(), j(), Aa().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", u(), j(), lo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", u(), j(), lo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", u(), j(), Za(e, t);
			},
			useMemoCache: function(e) {
				return u(), Pa(e);
			},
			useHostTransitionStatus: Ro,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", j(), Aa().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", u(), j(), F(e);
			}
		};
		var Gy = {}, Ky = /* @__PURE__ */ new Set(), qy = /* @__PURE__ */ new Set(), Jy = /* @__PURE__ */ new Set(), Yy = /* @__PURE__ */ new Set(), Xy = /* @__PURE__ */ new Set(), Zy = /* @__PURE__ */ new Set(), Qy = /* @__PURE__ */ new Set(), $y = /* @__PURE__ */ new Set(), eb = /* @__PURE__ */ new Set(), tb = /* @__PURE__ */ new Set();
		Object.freeze(Gy);
		var nb = {
			enqueueSetState: function(e, t, n) {
				e = e._reactInternals;
				var r = $c(e), i = ia(r);
				i.payload = t, n != null && (Yo(n), i.callback = n), t = aa(e, i, r), t !== null && (pi(r, "this.setState()", e), tl(t, e, r), O(t, e, r));
			},
			enqueueReplaceState: function(e, t, n) {
				e = e._reactInternals;
				var r = $c(e), i = ia(r);
				i.tag = $v, i.payload = t, n != null && (Yo(n), i.callback = n), t = aa(e, i, r), t !== null && (pi(r, "this.replaceState()", e), tl(t, e, r), O(t, e, r));
			},
			enqueueForceUpdate: function(e, t) {
				e = e._reactInternals;
				var n = $c(e), r = ia(n);
				r.tag = ey, t != null && (Yo(t), r.callback = t), t = aa(e, r, n), t !== null && (pi(n, "this.forceUpdate()", e), tl(t, e, n), O(t, e, n));
			}
		}, rb = null, ib = null, ab = Error("This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."), ob = !1, sb = {}, cb = {}, lb = {}, ub = {}, db = !1, fb = {}, pb = {}, mb = {
			dehydrated: null,
			treeContext: null,
			retryLane: 0,
			hydrationErrors: null
		}, hb = !1, gb = null;
		gb = /* @__PURE__ */ new Set();
		var _b = !1, vb = !1, yb = !1, bb = typeof WeakSet == "function" ? WeakSet : Set, xb = null, Sb = null, Cb = null, wb = null, Tb = !1, Eb = null, Db = !1, Ob = 8192, kb = {
			getCacheForType: function(e) {
				var t = si(m_), n = t.data.get(e);
				return n === void 0 && (n = e(), t.data.set(e, n)), n;
			},
			cacheSignal: function() {
				return si(m_).controller.signal;
			},
			getOwner: function() {
				return mp;
			}
		};
		if (typeof Symbol == "function" && Symbol.for) {
			var Ab = Symbol.for;
			Ab("selector.component"), Ab("selector.has_pseudo_class"), Ab("selector.role"), Ab("selector.test_id"), Ab("selector.text");
		}
		var jb = [], Mb = typeof WeakMap == "function" ? WeakMap : Map, Nb = 0, Pb = 2, Fb = 4, Ib = 0, Lb = 1, Rb = 2, zb = 3, Bb = 4, Vb = 6, Hb = 5, Ub = Nb, Wb = null, Q = null, $ = 0, Gb = 0, Kb = 1, qb = 2, Jb = 3, Yb = 4, Xb = 5, Zb = 6, Qb = 7, $b = 8, ex = 9, tx = Gb, nx = null, rx = !1, ix = !1, ax = !1, ox = 0, sx = Ib, cx = 0, lx = 0, ux = 0, dx = 0, fx = 0, px = null, mx = null, hx = !1, gx = 0, _x = 0, vx = 300, yx = Infinity, bx = 500, xx = null, Sx = null, Cx = null, wx = 0, Tx = 1, Ex = 2, Dx = 3, Ox = 0, kx = 1, Ax = 2, jx = 3, Mx = 4, Nx = 5, Px = 0, Fx = null, Ix = null, Lx = 0, Rx = 0, zx = -0, Bx = null, Vx = null, Hx = null, Ux = wx, Wx = null, Gx = 50, Kx = 0, qx = null, Jx = !1, Yx = !1, Xx = 50, Zx = 0, Qx = null, $x = !1, eS = null, tS = !1, nS = /* @__PURE__ */ new Set(), rS = {}, iS = null, aS = null, oS = !1, sS = !1, cS = !1, lS = !1, uS = 0, dS = {};
		(function() {
			for (var e = 0; e < og.length; e++) {
				var t = og[e], n = t.toLowerCase();
				t = t[0].toUpperCase() + t.slice(1), Jn(n, "on" + t);
			}
			Jn(Qh, "onAnimationEnd"), Jn($h, "onAnimationIteration"), Jn(eg, "onAnimationStart"), Jn("dblclick", "onDoubleClick"), Jn("focusin", "onFocus"), Jn("focusout", "onBlur"), Jn(tg, "onTransitionRun"), Jn(ng, "onTransitionStart"), Jn(rg, "onTransitionCancel"), Jn(ig, "onTransitionEnd");
		})(), it("onMouseEnter", ["mouseout", "mouseover"]), it("onMouseLeave", ["mouseout", "mouseover"]), it("onPointerEnter", ["pointerout", "pointerover"]), it("onPointerLeave", ["pointerout", "pointerover"]), rt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), rt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), rt("onBeforeInput", [
			"compositionend",
			"keypress",
			"textInput",
			"paste"
		]), rt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), rt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), rt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
		var fS = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), pS = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(fS)), mS = "_reactListening" + Math.random().toString(36).slice(2), hS = !1, gS = !1, _S = !1, vS = !1, yS = !1, bS = !1, xS = !1, SS = {}, CS = /\r\n?/g, wS = /\u0000|\uFFFD/g, TS = "http://www.w3.org/1999/xlink", ES = "http://www.w3.org/XML/1998/namespace", DS = "javascript:throw new Error('React form unexpectedly submitted.')", OS = "suppressHydrationWarning", kS = "&", AS = "/&", jS = "$", MS = "/$", NS = "$?", PS = "$~", FS = "$!", IS = "html", LS = "body", RS = "head", zS = "F!", BS = "F", VS = "loading", HS = "style", US = 0, WS = 1, GS = 2, KS = null, qS = null, JS = {
			dialog: !0,
			webview: !0
		}, YS = null, XS = void 0, ZS = typeof setTimeout == "function" ? setTimeout : void 0, QS = typeof clearTimeout == "function" ? clearTimeout : void 0, $S = -1, eC = typeof Promise == "function" ? Promise : void 0, tC = typeof queueMicrotask == "function" ? queueMicrotask : eC === void 0 ? ZS : function(e) {
			return eC.resolve(null).then(e).catch(Ku);
		}, nC = null, rC = 0, iC = 1, aC = 2, oC = 3, sC = 4, cC = /* @__PURE__ */ new Map(), lC = /* @__PURE__ */ new Set(), uC = qf.d;
		qf.d = {
			f: function() {
				var e = uC.f(), t = ol();
				return e || t;
			},
			r: function(e) {
				var t = $e(e);
				t !== null && t.tag === 5 && t.type === "form" ? Po(t) : uC.r(e);
			},
			D: function(e) {
				uC.D(e), kd("dns-prefetch", e, null);
			},
			C: function(e, t) {
				uC.C(e, t), kd("preconnect", e, t);
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
							a = B(e);
							break;
						case "script": a = Fd(e);
					}
					cC.has(a) || (e = V({
						rel: "preload",
						href: t === "image" && n && n.imageSrcSet ? void 0 : e,
						as: t
					}, n), cC.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Md(a)) || t === "script" && r.querySelector(Id(a)) || (t = r.createElement("link"), Tu(t, "link", e), nt(t), r.head.appendChild(t)));
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
						case "script": a = Fd(e);
					}
					if (!cC.has(a) && (e = V({
						rel: "modulepreload",
						href: e
					}, t), cC.set(a, e), n.querySelector(i) === null)) {
						switch (r) {
							case "audioworklet":
							case "paintworklet":
							case "serviceworker":
							case "sharedworker":
							case "worker":
							case "script": if (n.querySelector(Id(a))) return;
						}
						r = n.createElement("link"), Tu(r, "link", e), nt(r), n.head.appendChild(r);
					}
				}
			},
			X: function(e, t) {
				uC.X(e, t);
				var n = dC;
				if (n && e) {
					var r = tt(n).hoistableScripts, i = Fd(e), a = r.get(i);
					a || (a = n.querySelector(Id(i)), a || (e = V({
						src: e,
						async: !0
					}, t), (t = cC.get(i)) && Bd(e, t), a = n.createElement("script"), nt(a), Tu(a, "link", e), n.head.appendChild(a)), a = {
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
					var i = tt(r).hoistableStyles, a = B(e);
					t ||= "default";
					var o = i.get(a);
					if (!o) {
						var s = {
							loading: rC,
							preload: null
						};
						if (o = r.querySelector(Md(a))) s.loading = iC | sC;
						else {
							e = V({
								rel: "stylesheet",
								href: e,
								"data-precedence": t
							}, n), (n = cC.get(a)) && zd(e, n);
							var c = o = r.createElement("link");
							nt(c), Tu(c, "link", e), c._p = new Promise(function(e, t) {
								c.onload = e, c.onerror = t;
							}), c.addEventListener("load", function() {
								s.loading |= iC;
							}), c.addEventListener("error", function() {
								s.loading |= aC;
							}), s.loading |= sC, Rd(o, t, r);
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
					var r = tt(n).hoistableScripts, i = Fd(e), a = r.get(i);
					a || (a = n.querySelector(Id(i)), a || (e = V({
						src: e,
						async: !0,
						type: "module"
					}, t), (t = cC.get(i)) && Bd(e, t), a = n.createElement("script"), nt(a), Tu(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			}
		};
		var dC = typeof document > "u" ? null : document, fC = null, pC = 6e4, mC = 800, hC = 500, gC = 0, _C = null, vC = null, yC = Jf, bC = {
			$$typeof: If,
			Provider: null,
			Consumer: null,
			_currentValue: yC,
			_currentValue2: yC,
			_threadCount: 0
		}, xC = "%c%s%c", SC = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", CC = "", wC = " ", TC = Function.prototype.bind, EC = !1, DC = null, OC = null, kC = null, AC = null, jC = null, MC = null, NC = null, PC = null, FC = null, IC = null;
		DC = function(e, r, i, a) {
			r = t(e, r), r !== null && (i = n(r.memoizedState, i, 0, a), r.memoizedState = i, r.baseState = i, e.memoizedProps = V({}, e.memoizedProps), i = gr(e, 2), i !== null && tl(i, e, 2));
		}, OC = function(e, n, r) {
			n = t(e, n), n !== null && (r = s(n.memoizedState, r, 0), n.memoizedState = r, n.baseState = r, e.memoizedProps = V({}, e.memoizedProps), r = gr(e, 2), r !== null && tl(r, e, 2));
		}, kC = function(e, n, r, i) {
			n = t(e, n), n !== null && (r = a(n.memoizedState, r, i), n.memoizedState = r, n.baseState = r, e.memoizedProps = V({}, e.memoizedProps), r = gr(e, 2), r !== null && tl(r, e, 2));
		}, AC = function(e, t, r) {
			e.pendingProps = n(e.memoizedProps, t, 0, r), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = gr(e, 2), t !== null && tl(t, e, 2);
		}, jC = function(e, t) {
			e.pendingProps = s(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = gr(e, 2), t !== null && tl(t, e, 2);
		}, MC = function(e, t, n) {
			e.pendingProps = a(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = gr(e, 2), t !== null && tl(t, e, 2);
		}, NC = function(e) {
			var t = gr(e, 2);
			t !== null && tl(t, e, 2);
		}, PC = function(e) {
			var t = Re(), n = gr(e, t);
			n !== null && tl(n, e, t);
		}, FC = function(e) {
			l = e;
		}, IC = function(e) {
			c = e;
		};
		var LC = !0, RC = null, zC = !1, BC = null, VC = null, HC = null, UC = /* @__PURE__ */ new Map(), WC = /* @__PURE__ */ new Map(), GC = [], KC = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" "), qC = null;
		if (wf.prototype.render = Cf.prototype.render = function(e) {
			var t = this._internalRoot;
			if (t === null) throw Error("Cannot update an unmounted root.");
			var n = arguments;
			typeof n[1] == "function" ? console.error("does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : y(n[1]) ? console.error("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : n[1] !== void 0 && console.error("You passed a second argument to root.render(...) but it only accepts one argument."), n = e;
			var r = t.current;
			$d(r, $c(r), n, t, null, null);
		}, wf.prototype.unmount = Cf.prototype.unmount = function() {
			var e = arguments;
			if (typeof e[0] == "function" && console.error("does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."), e = this._internalRoot, e !== null) {
				this._internalRoot = null;
				var t = e.containerInfo;
				(Ub & (Pb | Fb)) !== Nb && console.error("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), $d(e.current, 2, null, e, null, null), ol(), t[qp] = null;
			}
		}, wf.prototype.unstable_scheduleHydration = function(e) {
			if (e) {
				var t = Ye();
				e = {
					blockedOn: null,
					target: e,
					priority: t
				};
				for (var n = 0; n < GC.length && t !== 0 && t < GC[n].priority; n++);
				GC.splice(n, 0, e), n === 0 && hf(e);
			}
		}, (function() {
			var e = Df.version;
			if (e !== "19.2.7") throw Error("Incompatible React versions: The \"react\" and \"react-dom\" packages must have the exact same version. Instead got:\n  - react:      " + (e + "\n  - react-dom:  19.2.7\nLearn more: https://react.dev/warnings/version-mismatch"));
		})(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"), qf.findDOMNode = function(e) {
			var t = e._reactInternals;
			if (t === void 0) throw typeof e.render == "function" ? Error("Unable to find node on an unmounted component.") : (e = Object.keys(e).join(","), Error("Argument appears to not be a ReactComponent. Keys: " + e));
			return e = ne(t), e = e === null ? null : re(e), e = e === null ? null : e.stateNode, e;
		}, !(function() {
			var e = {
				bundleType: 1,
				version: "19.2.7",
				rendererPackageName: "react-dom",
				currentDispatcherRef: H,
				reconcilerVersion: "19.2.7"
			};
			return e.overrideHookState = DC, e.overrideHookStateDeletePath = OC, e.overrideHookStateRenamePath = kC, e.overrideProps = AC, e.overridePropsDeletePath = jC, e.overridePropsRenamePath = MC, e.scheduleUpdate = NC, e.scheduleRetry = PC, e.setErrorHandler = FC, e.setSuspenseHandler = IC, e.scheduleRefresh = _, e.scheduleRoot = g, e.setRefreshHandler = v, e.getCurrentFiber = af, je(e);
		})() && $m && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
			var JC = window.location.protocol;
			/^(https?|file):$/.test(JC) && console.info("%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (JC === "file:" ? "\nYou might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq" : ""), "font-weight:bold");
		}
		e.createRoot = function(e, t) {
			if (!y(e)) throw Error("Target container is not a DOM element.");
			Tf(e);
			var n = !1, r = "", i = es, a = ts, o = ns;
			return t != null && (t.hydrate ? console.warn("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t && t.$$typeof === Af && console.error("You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);"), !0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = Zd(e, 1, !1, null, null, n, r, null, i, a, o, Sf), e[qp] = t.current, lu(e), new Cf(t);
		}, e.hydrateRoot = function(e, t, n) {
			if (!y(e)) throw Error("Target container is not a DOM element.");
			Tf(e), t === void 0 && console.error("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
			var r = !1, i = "", a = es, o = ts, s = ns, c = null;
			return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (a = n.onUncaughtError), n.onCaughtError !== void 0 && (o = n.onCaughtError), n.onRecoverableError !== void 0 && (s = n.onRecoverableError), n.formState !== void 0 && (c = n.formState)), t = Zd(e, 1, !0, t, n ?? null, r, i, c, a, o, s, Sf), t.context = Qd(null), n = t.current, r = $c(n), r = Ge(r), i = ia(r), i.callback = null, aa(n, i, r), pi(r, "hydrateRoot()", null), n = r, t.current.lanes = n, Be(t, n), Jl(t), e[qp] = t.current, lu(e), new wf(t);
		}, e.version = "19.2.7", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), Lc = /* @__PURE__ */ n((/* @__PURE__ */ e(((e, t) => {
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
	process.env.NODE_ENV === "production" ? (n(), t.exports = Fc()) : t.exports = Ic();
})))(), 1);
function Rc(e, t) {
	let n = typeof e == "string" ? document.querySelector(e) : e;
	if (!n) throw Error(`AMP Reader host was not found: ${String(e)}`);
	let r = (0, Lc.createRoot)(n), i = (e) => r.render(/* @__PURE__ */ (0, L.jsx)(Pc, { ...e }));
	return i(t), {
		update: i,
		unmount: () => r.unmount()
	};
}
//#endregion
export { Pc as AMPReader, Oc as RuntimeDocument, Ts as createAMPAssetResolver, Cs as loadAMPDocument, Rc as mountAMPReader };

//# sourceMappingURL=amp-reader.js.map
