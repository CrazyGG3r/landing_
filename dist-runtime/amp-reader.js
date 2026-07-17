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
import { t as a } from "./react-dom-Bh3c3HEG.js";
import { t as o } from "./model-activity-Ba1Jlnbi.js";
//#region node_modules/zod/v4/core/core.js
var s;
function c(e, t, n) {
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
var l = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
}, u = class extends Error {
	constructor(e) {
		super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
	}
};
(s = globalThis).__zod_globalConfig ?? (s.__zod_globalConfig = {});
var d = globalThis.__zod_globalConfig;
function f(e) {
	return e && Object.assign(d, e), d;
}
//#endregion
//#region node_modules/zod/v4/core/util.js
function p(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function m(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function h(e) {
	return { get value() {
		{
			let t = e();
			return Object.defineProperty(this, "value", { value: t }), t;
		}
		throw Error("cached value already set");
	} };
}
function g(e) {
	return e == null;
}
function _(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function v(e, t) {
	let n = e / t, r = Math.round(n), i = 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
var y = /* @__PURE__*/ Symbol("evaluating");
function b(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== y) return r === void 0 && (r = y, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function ee(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function te(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function ne(e) {
	return JSON.stringify(e);
}
function re(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var ie = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function ae(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var oe = /* @__PURE__*/ h(() => {
	if (d.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
	try {
		return Function(""), !0;
	} catch {
		return !1;
	}
});
function se(e) {
	if (ae(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return !(ae(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function ce(e) {
	return se(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
var x = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function le(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ue(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function S(e) {
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
function de(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
var fe = {
	safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function C(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	return ue(e, te(e._zod.def, {
		get shape() {
			let e = {};
			for (let r in t) {
				if (!(r in n.shape)) throw Error(`Unrecognized key: "${r}"`);
				t[r] && (e[r] = n.shape[r]);
			}
			return ee(this, "shape", e), e;
		},
		checks: []
	}));
}
function w(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	return ue(e, te(e._zod.def, {
		get shape() {
			let r = { ...e._zod.def.shape };
			for (let e in t) {
				if (!(e in n.shape)) throw Error(`Unrecognized key: "${e}"`);
				t[e] && delete r[e];
			}
			return ee(this, "shape", r), r;
		},
		checks: []
	}));
}
function pe(e, t) {
	if (!se(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = e._zod.def.shape;
		for (let e in t) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return ue(e, te(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return ee(this, "shape", n), n;
	} }));
}
function me(e, t) {
	if (!se(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return ue(e, te(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return ee(this, "shape", n), n;
	} }));
}
function he(e, t) {
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return ue(e, te(e._zod.def, {
		get shape() {
			let n = {
				...e._zod.def.shape,
				...t._zod.def.shape
			};
			return ee(this, "shape", n), n;
		},
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function ge(e, t, n) {
	let r = t._zod.def.checks;
	if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
	return ue(t, te(t._zod.def, {
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
			return ee(this, "shape", i), i;
		},
		checks: []
	}));
}
function _e(e, t, n) {
	return ue(t, te(t._zod.def, { get shape() {
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
		return ee(this, "shape", i), i;
	} }));
}
function ve(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function ye(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function be(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function xe(e) {
	return typeof e == "string" ? e : e?.message;
}
function Se(e, t, n) {
	let r = e.message ? e.message : xe(e.inst?._zod.def?.error?.(e)) ?? xe(t?.error?.(e)) ?? xe(n.customError?.(e)) ?? xe(n.localeError?.(e)) ?? "Invalid input", { inst: i, continue: a, input: o, ...s } = e;
	return s.path ??= [], s.message = r, t?.reportInput && (s.input = o), s;
}
function Ce(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function we(...e) {
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
var Te = (e, t) => {
	e.name = "$ZodError", Object.defineProperty(e, "_zod", {
		value: e._zod,
		enumerable: !1
	}), Object.defineProperty(e, "issues", {
		value: t,
		enumerable: !1
	}), e.message = JSON.stringify(t, m, 2), Object.defineProperty(e, "toString", {
		value: () => e.message,
		enumerable: !1
	});
}, T = c("$ZodError", Te), Ee = c("$ZodError", Te, { Parent: Error });
function De(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? (n[i.path[0]] = n[i.path[0]] || [], n[i.path[0]].push(t(i))) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function Oe(e, t = (e) => e.message) {
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
var ke = (e) => (t, n, r, i) => {
	let a = r ? {
		...r,
		async: !1
	} : { async: !1 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise) throw new l();
	if (o.issues.length) {
		let t = new ((i?.Err) ?? e)(o.issues.map((e) => Se(e, a, f())));
		throw ie(t, i?.callee), t;
	}
	return o.value;
}, Ae = (e) => async (t, n, r, i) => {
	let a = r ? {
		...r,
		async: !0
	} : { async: !0 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise && (o = await o), o.issues.length) {
		let t = new ((i?.Err) ?? e)(o.issues.map((e) => Se(e, a, f())));
		throw ie(t, i?.callee), t;
	}
	return o.value;
}, je = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new l();
	return a.issues.length ? {
		success: !1,
		error: new (e ?? T)(a.issues.map((e) => Se(e, i, f())))
	} : {
		success: !0,
		data: a.value
	};
}, Me = /* @__PURE__*/ je(Ee), Ne = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? {
		success: !1,
		error: new e(a.issues.map((e) => Se(e, i, f())))
	} : {
		success: !0,
		data: a.value
	};
}, Pe = /* @__PURE__*/ Ne(Ee), Fe = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return ke(e)(t, n, i);
}, Ie = (e) => (t, n, r) => ke(e)(t, n, r), Le = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return Ae(e)(t, n, i);
}, Re = (e) => async (t, n, r) => Ae(e)(t, n, r), ze = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return je(e)(t, n, i);
}, Be = (e) => (t, n, r) => je(e)(t, n, r), Ve = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: "backward"
	} : { direction: "backward" };
	return Ne(e)(t, n, i);
}, He = (e) => async (t, n, r) => Ne(e)(t, n, r), Ue = /^[cC][0-9a-z]{6,}$/, We = /^[0-9a-z]+$/, Ge = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Ke = /^[0-9a-vA-V]{20}$/, qe = /^[A-Za-z0-9]{27}$/, Je = /^[a-zA-Z0-9_-]{21}$/, Ye = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Xe = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Ze = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Qe = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, $e = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function et() {
	return new RegExp($e, "u");
}
var tt = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, nt = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, rt = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, it = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, at = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, ot = /^[A-Za-z0-9_-]*$/, st = /^https?$/, ct = /^\+[1-9]\d{6,14}$/, lt = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", ut = /*@__PURE__*/ RegExp(`^${lt}$`);
function dt(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function ft(e) {
	return RegExp(`^${dt(e)}$`);
}
function pt(e) {
	let t = dt({ precision: e.precision }), n = ["Z"];
	e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let r = `${t}(?:${n.join("|")})`;
	return RegExp(`^${lt}T(?:${r})$`);
}
var mt = (e) => {
	let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
	return RegExp(`^${t}$`);
}, ht = /^-?\d+$/, gt = /^-?\d+(?:\.\d+)?$/, _t = /^(?:true|false)$/i, vt = /^null$/i, yt = /^[^A-Z]*$/, bt = /^[^a-z]*$/, xt = /*@__PURE__*/ c("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), St = {
	number: "number",
	bigint: "bigint",
	object: "date"
}, Ct = /*@__PURE__*/ c("$ZodCheckLessThan", (e, t) => {
	xt.init(e, t);
	let n = St[typeof t.value];
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
}), wt = /*@__PURE__*/ c("$ZodCheckGreaterThan", (e, t) => {
	xt.init(e, t);
	let n = St[typeof t.value];
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
}), Tt = /*@__PURE__*/ c("$ZodCheckMultipleOf", (e, t) => {
	xt.init(e, t), e._zod.onattach.push((e) => {
		var n;
		(n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
	}), e._zod.check = (n) => {
		if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
		(typeof n.value == "bigint" ? n.value % t.value === BigInt(0) : v(n.value, t.value) === 0) || n.issues.push({
			origin: typeof n.value,
			code: "not_multiple_of",
			divisor: t.value,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Et = /*@__PURE__*/ c("$ZodCheckNumberFormat", (e, t) => {
	xt.init(e, t), t.format = t.format || "float64";
	let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = fe[t.format];
	e._zod.onattach.push((e) => {
		let r = e._zod.bag;
		r.format = t.format, r.minimum = i, r.maximum = a, n && (r.pattern = ht);
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
}), Dt = /*@__PURE__*/ c("$ZodCheckMaxLength", (e, t) => {
	var n;
	xt.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !g(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.maximum ?? Infinity;
		t.maximum < n && (e._zod.bag.maximum = t.maximum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length <= t.maximum) return;
		let i = Ce(r);
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
}), Ot = /*@__PURE__*/ c("$ZodCheckMinLength", (e, t) => {
	var n;
	xt.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !g(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.minimum ?? -Infinity;
		t.minimum > n && (e._zod.bag.minimum = t.minimum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length >= t.minimum) return;
		let i = Ce(r);
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
}), kt = /*@__PURE__*/ c("$ZodCheckLengthEquals", (e, t) => {
	var n;
	xt.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !g(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.minimum = t.length, n.maximum = t.length, n.length = t.length;
	}), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if (i === t.length) return;
		let a = Ce(r), o = i > t.length;
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
}), At = /*@__PURE__*/ c("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	xt.init(e, t), e._zod.onattach.push((e) => {
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
}), jt = /*@__PURE__*/ c("$ZodCheckRegex", (e, t) => {
	At.init(e, t), e._zod.check = (n) => {
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
}), Mt = /*@__PURE__*/ c("$ZodCheckLowerCase", (e, t) => {
	t.pattern ??= yt, At.init(e, t);
}), Nt = /*@__PURE__*/ c("$ZodCheckUpperCase", (e, t) => {
	t.pattern ??= bt, At.init(e, t);
}), Pt = /*@__PURE__*/ c("$ZodCheckIncludes", (e, t) => {
	xt.init(e, t);
	let n = le(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
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
}), Ft = /*@__PURE__*/ c("$ZodCheckStartsWith", (e, t) => {
	xt.init(e, t);
	let n = RegExp(`^${le(t.prefix)}.*`);
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
}), It = /*@__PURE__*/ c("$ZodCheckEndsWith", (e, t) => {
	xt.init(e, t);
	let n = RegExp(`.*${le(t.suffix)}$`);
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
}), Lt = /*@__PURE__*/ c("$ZodCheckOverwrite", (e, t) => {
	xt.init(e, t), e._zod.check = (e) => {
		e.value = t.tx(e.value);
	};
}), Rt = class {
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
}, zt = {
	major: 4,
	minor: 4,
	patch: 3
}, Bt = /*@__PURE__*/ c("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = zt;
	let r = [...e._zod.def.checks ?? []];
	e._zod.traits.has("$ZodCheck") && r.unshift(e);
	for (let t of r) for (let n of t._zod.onattach) n(e);
	if (r.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (e, t, n) => {
			let r = ve(e), i;
			for (let a of t) {
				if (a._zod.def.when) {
					if (ye(e) || !a._zod.def.when(e)) continue;
				} else if (r) continue;
				let t = e.issues.length, o = a._zod.check(e);
				if (o instanceof Promise && n?.async === !1) throw new l();
				if (i || o instanceof Promise) i = (i ?? Promise.resolve()).then(async () => {
					await o, e.issues.length !== t && (r ||= ve(e, t));
				});
				else {
					if (e.issues.length === t) continue;
					r ||= ve(e, t);
				}
			}
			return i ? i.then(() => e) : e;
		}, n = (n, i, a) => {
			if (ve(n)) return n.aborted = !0, n;
			let o = t(i, r, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new l();
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
				if (a.async === !1) throw new l();
				return o.then((e) => t(e, r, a));
			}
			return t(o, r, a);
		};
	}
	b(e, "~standard", () => ({
		validate: (t) => {
			try {
				let n = Me(e, t);
				return n.success ? { value: n.data } : { issues: n.error?.issues };
			} catch {
				return Pe(e, t).then((e) => e.success ? { value: e.data } : { issues: e.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	}));
}), Vt = /*@__PURE__*/ c("$ZodString", (e, t) => {
	Bt.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? mt(e._zod.bag), e._zod.parse = (n, r) => {
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
}), Ht = /*@__PURE__*/ c("$ZodStringFormat", (e, t) => {
	At.init(e, t), Vt.init(e, t);
}), Ut = /*@__PURE__*/ c("$ZodGUID", (e, t) => {
	t.pattern ??= Xe, Ht.init(e, t);
}), Wt = /*@__PURE__*/ c("$ZodUUID", (e, t) => {
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
		t.pattern ??= Ze(e);
	} else t.pattern ??= Ze();
	Ht.init(e, t);
}), Gt = /*@__PURE__*/ c("$ZodEmail", (e, t) => {
	t.pattern ??= Qe, Ht.init(e, t);
}), Kt = /*@__PURE__*/ c("$ZodURL", (e, t) => {
	Ht.init(e, t), e._zod.check = (n) => {
		try {
			let r = n.value.trim();
			if (!t.normalize && t.protocol?.source === st.source && !/^https?:\/\//i.test(r)) {
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
}), qt = /*@__PURE__*/ c("$ZodEmoji", (e, t) => {
	t.pattern ??= et(), Ht.init(e, t);
}), Jt = /*@__PURE__*/ c("$ZodNanoID", (e, t) => {
	t.pattern ??= Je, Ht.init(e, t);
}), Yt = /*@__PURE__*/ c("$ZodCUID", (e, t) => {
	t.pattern ??= Ue, Ht.init(e, t);
}), Xt = /*@__PURE__*/ c("$ZodCUID2", (e, t) => {
	t.pattern ??= We, Ht.init(e, t);
}), Zt = /*@__PURE__*/ c("$ZodULID", (e, t) => {
	t.pattern ??= Ge, Ht.init(e, t);
}), Qt = /*@__PURE__*/ c("$ZodXID", (e, t) => {
	t.pattern ??= Ke, Ht.init(e, t);
}), $t = /*@__PURE__*/ c("$ZodKSUID", (e, t) => {
	t.pattern ??= qe, Ht.init(e, t);
}), en = /*@__PURE__*/ c("$ZodISODateTime", (e, t) => {
	t.pattern ??= pt(t), Ht.init(e, t);
}), tn = /*@__PURE__*/ c("$ZodISODate", (e, t) => {
	t.pattern ??= ut, Ht.init(e, t);
}), nn = /*@__PURE__*/ c("$ZodISOTime", (e, t) => {
	t.pattern ??= ft(t), Ht.init(e, t);
}), rn = /*@__PURE__*/ c("$ZodISODuration", (e, t) => {
	t.pattern ??= Ye, Ht.init(e, t);
}), an = /*@__PURE__*/ c("$ZodIPv4", (e, t) => {
	t.pattern ??= tt, Ht.init(e, t), e._zod.bag.format = "ipv4";
}), on = /*@__PURE__*/ c("$ZodIPv6", (e, t) => {
	t.pattern ??= nt, Ht.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
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
}), sn = /*@__PURE__*/ c("$ZodCIDRv4", (e, t) => {
	t.pattern ??= rt, Ht.init(e, t);
}), cn = /*@__PURE__*/ c("$ZodCIDRv6", (e, t) => {
	t.pattern ??= it, Ht.init(e, t), e._zod.check = (n) => {
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
function ln(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
var un = /*@__PURE__*/ c("$ZodBase64", (e, t) => {
	t.pattern ??= at, Ht.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
		ln(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function dn(e) {
	if (!ot.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return ln(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var fn = /*@__PURE__*/ c("$ZodBase64URL", (e, t) => {
	t.pattern ??= ot, Ht.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
		dn(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), pn = /*@__PURE__*/ c("$ZodE164", (e, t) => {
	t.pattern ??= ct, Ht.init(e, t);
});
function mn(e, t = null) {
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
var hn = /*@__PURE__*/ c("$ZodJWT", (e, t) => {
	Ht.init(e, t), e._zod.check = (n) => {
		mn(n.value, t.alg) || n.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), gn = /*@__PURE__*/ c("$ZodNumber", (e, t) => {
	Bt.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? gt, e._zod.parse = (n, r) => {
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
}), _n = /*@__PURE__*/ c("$ZodNumberFormat", (e, t) => {
	Et.init(e, t), gn.init(e, t);
}), vn = /*@__PURE__*/ c("$ZodBoolean", (e, t) => {
	Bt.init(e, t), e._zod.pattern = _t, e._zod.parse = (n, r) => {
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
}), yn = /*@__PURE__*/ c("$ZodNull", (e, t) => {
	Bt.init(e, t), e._zod.pattern = vt, e._zod.values = /* @__PURE__ */ new Set([null]), e._zod.parse = (t, n) => {
		let r = t.value;
		return r === null || t.issues.push({
			expected: "null",
			code: "invalid_type",
			input: r,
			inst: e
		}), t;
	};
}), bn = /*@__PURE__*/ c("$ZodUnknown", (e, t) => {
	Bt.init(e, t), e._zod.parse = (e) => e;
}), xn = /*@__PURE__*/ c("$ZodNever", (e, t) => {
	Bt.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function Sn(e, t, n) {
	e.issues.length && t.issues.push(...be(n, e.issues)), t.value[n] = e.value;
}
var Cn = /*@__PURE__*/ c("$ZodArray", (e, t) => {
	Bt.init(e, t), e._zod.parse = (n, r) => {
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
			s instanceof Promise ? a.push(s.then((t) => Sn(t, n, e))) : Sn(s, n, e);
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
});
function wn(e, t, n, r, i, a) {
	let o = n in r;
	if (e.issues.length) {
		if (i && a && !o) return;
		t.issues.push(...be(n, e.issues));
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
function Tn(e) {
	let t = Object.keys(e.shape);
	for (let n of t) if (!e.shape?.[n]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${n}": expected a Zod schema`);
	let n = de(e.shape);
	return {
		...e,
		keys: t,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(n)
	};
}
function En(e, t, n, r, i, a) {
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
		a instanceof Promise ? e.push(a.then((e) => wn(e, n, i, t, u, d))) : wn(a, n, i, t, u, d);
	}
	return o.length && n.issues.push({
		code: "unrecognized_keys",
		keys: o,
		input: t,
		inst: a
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var Dn = /*@__PURE__*/ c("$ZodObject", (e, t) => {
	if (Bt.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
		let e = t.shape;
		Object.defineProperty(t, "shape", { get: () => {
			let n = { ...e };
			return Object.defineProperty(t, "shape", { value: n }), n;
		} });
	}
	let n = h(() => Tn(t));
	b(e._zod, "propValues", () => {
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
	let r = ae, i = t.catchall, a;
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
			a instanceof Promise ? c.push(a.then((n) => wn(n, t, e, s, r, i))) : wn(a, t, e, s, r, i);
		}
		return i ? En(c, s, t, o, n.value, e) : c.length ? Promise.all(c).then(() => t) : t;
	};
}), On = /*@__PURE__*/ c("$ZodObjectJIT", (e, t) => {
	Dn.init(e, t);
	let n = e._zod.parse, r = h(() => Tn(t)), i = (e) => {
		let t = new Rt([
			"shape",
			"payload",
			"ctx"
		]), n = r.value, i = (e) => {
			let t = ne(e);
			return `shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`;
		};
		t.write("const input = payload.value;");
		let a = Object.create(null), o = 0;
		for (let e of n.keys) a[e] = `key_${o++}`;
		t.write("const newResult = {};");
		for (let r of n.keys) {
			let n = a[r], o = ne(r), s = e[r], c = s?._zod?.optin === "optional", l = s?._zod?.optout === "optional";
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
	}, a, o = ae, s = !d.jitless, c = s && oe.value, l = t.catchall, u;
	e._zod.parse = (d, f) => {
		u ??= r.value;
		let p = d.value;
		return o(p) ? s && c && f?.async === !1 && f.jitless !== !0 ? (a ||= i(t.shape), d = a(d, f), l ? En([], p, d, f, u, e) : d) : n(d, f) : (d.issues.push({
			expected: "object",
			code: "invalid_type",
			input: p,
			inst: e
		}), d);
	};
});
function kn(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !ve(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => Se(e, r, f())))
	}), t);
}
var An = /*@__PURE__*/ c("$ZodUnion", (e, t) => {
	Bt.init(e, t), b(e._zod, "optin", () => t.options.some((e) => e._zod.optin === "optional") ? "optional" : void 0), b(e._zod, "optout", () => t.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), b(e._zod, "values", () => {
		if (t.options.every((e) => e._zod.values)) return new Set(t.options.flatMap((e) => Array.from(e._zod.values)));
	}), b(e._zod, "pattern", () => {
		if (t.options.every((e) => e._zod.pattern)) {
			let e = t.options.map((e) => e._zod.pattern);
			return RegExp(`^(${e.map((e) => _(e.source)).join("|")})$`);
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
		return a ? Promise.all(o).then((t) => kn(t, r, e, i)) : kn(o, r, e, i);
	};
}), jn = /*@__PURE__*/ c("$ZodDiscriminatedUnion", (e, t) => {
	t.inclusive = !1, An.init(e, t);
	let n = e._zod.parse;
	b(e._zod, "propValues", () => {
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
	let r = h(() => {
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
		if (!ae(o)) return i.issues.push({
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
}), Mn = /*@__PURE__*/ c("$ZodIntersection", (e, t) => {
	Bt.init(e, t), e._zod.parse = (e, n) => {
		let r = e.value, i = t.left._zod.run({
			value: r,
			issues: []
		}, n), a = t.right._zod.run({
			value: r,
			issues: []
		}, n);
		return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => Pn(e, t, n)) : Pn(e, i, a);
	};
});
function Nn(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (se(e) && se(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		for (let n of r) {
			let r = Nn(e[n], t[n]);
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
			let i = e[r], a = t[r], o = Nn(i, a);
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
function Pn(e, t, n) {
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
	}), ve(e)) return e;
	let o = Nn(t.value, n.value);
	if (!o.valid) throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
	return e.value = o.data, e;
}
var Fn = /*@__PURE__*/ c("$ZodRecord", (e, t) => {
	Bt.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!se(i)) return n.issues.push({
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
						issues: o.issues.map((e) => Se(e, r, f())),
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
					e.issues.length && n.issues.push(...be(c, e.issues)), n.value[l] = e.value;
				})) : (u.issues.length && n.issues.push(...be(c, u.issues)), n.value[l] = u.value);
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
				if (typeof o == "string" && gt.test(o) && s.issues.length) {
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
						issues: s.issues.map((e) => Se(e, r, f())),
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
					e.issues.length && n.issues.push(...be(o, e.issues)), n.value[s.value] = e.value;
				})) : (c.issues.length && n.issues.push(...be(o, c.issues)), n.value[s.value] = c.value);
			}
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
}), In = /*@__PURE__*/ c("$ZodEnum", (e, t) => {
	Bt.init(e, t);
	let n = p(t.entries), r = new Set(n);
	e._zod.values = r, e._zod.pattern = RegExp(`^(${n.filter((e) => x.has(typeof e)).map((e) => typeof e == "string" ? le(e) : e.toString()).join("|")})$`), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), Ln = /*@__PURE__*/ c("$ZodLiteral", (e, t) => {
	if (Bt.init(e, t), t.values.length === 0) throw Error("Cannot create literal schema with no valid values");
	let n = new Set(t.values);
	e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e) => typeof e == "string" ? le(e) : e ? le(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i) => {
		let a = r.value;
		return n.has(a) || r.issues.push({
			code: "invalid_value",
			values: t.values,
			input: a,
			inst: e
		}), r;
	};
}), Rn = /*@__PURE__*/ c("$ZodTransform", (e, t) => {
	Bt.init(e, t), e._zod.optin = "optional", e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new u(e.constructor.name);
		let i = t.transform(n.value, n);
		if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n.fallback = !0, n));
		if (i instanceof Promise) throw new l();
		return n.value = i, n.fallback = !0, n;
	};
});
function zn(e, t) {
	return t === void 0 && (e.issues.length || e.fallback) ? {
		issues: [],
		value: void 0
	} : e;
}
var Bn = /*@__PURE__*/ c("$ZodOptional", (e, t) => {
	Bt.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", b(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), b(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${_(e.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (t.innerType._zod.optin === "optional") {
			let r = e.value, i = t.innerType._zod.run(e, n);
			return i instanceof Promise ? i.then((e) => zn(e, r)) : zn(i, r);
		}
		return e.value === void 0 ? e : t.innerType._zod.run(e, n);
	};
}), Vn = /*@__PURE__*/ c("$ZodExactOptional", (e, t) => {
	Bn.init(e, t), b(e._zod, "values", () => t.innerType._zod.values), b(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
}), Hn = /*@__PURE__*/ c("$ZodNullable", (e, t) => {
	Bt.init(e, t), b(e._zod, "optin", () => t.innerType._zod.optin), b(e._zod, "optout", () => t.innerType._zod.optout), b(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${_(e.source)}|null)$`) : void 0;
	}), b(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
}), Un = /*@__PURE__*/ c("$ZodDefault", (e, t) => {
	Bt.init(e, t), e._zod.optin = "optional", b(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		if (e.value === void 0) return e.value = t.defaultValue, e;
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Wn(e, t)) : Wn(r, t);
	};
});
function Wn(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
var Gn = /*@__PURE__*/ c("$ZodPrefault", (e, t) => {
	Bt.init(e, t), e._zod.optin = "optional", b(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
}), Kn = /*@__PURE__*/ c("$ZodNonOptional", (e, t) => {
	Bt.init(e, t), b(e._zod, "values", () => {
		let e = t.innerType._zod.values;
		return e ? new Set([...e].filter((e) => e !== void 0)) : void 0;
	}), e._zod.parse = (n, r) => {
		let i = t.innerType._zod.run(n, r);
		return i instanceof Promise ? i.then((t) => qn(t, e)) : qn(i, e);
	};
});
function qn(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
var Jn = /*@__PURE__*/ c("$ZodCatch", (e, t) => {
	Bt.init(e, t), e._zod.optin = "optional", b(e._zod, "optout", () => t.innerType._zod.optout), b(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((r) => (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => Se(e, n, f())) },
			input: e.value
		}), e.issues = [], e.fallback = !0), e)) : (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => Se(e, n, f())) },
			input: e.value
		}), e.issues = [], e.fallback = !0), e);
	};
}), Yn = /*@__PURE__*/ c("$ZodPipe", (e, t) => {
	Bt.init(e, t), b(e._zod, "values", () => t.in._zod.values), b(e._zod, "optin", () => t.in._zod.optin), b(e._zod, "optout", () => t.out._zod.optout), b(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (e, n) => {
		if (n.direction === "backward") {
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => Xn(e, t.in, n)) : Xn(r, t.in, n);
		}
		let r = t.in._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Xn(e, t.out, n)) : Xn(r, t.out, n);
	};
});
function Xn(e, t, n) {
	return e.issues.length ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues,
		fallback: e.fallback
	}, n);
}
var Zn = /*@__PURE__*/ c("$ZodReadonly", (e, t) => {
	Bt.init(e, t), b(e._zod, "propValues", () => t.innerType._zod.propValues), b(e._zod, "values", () => t.innerType._zod.values), b(e._zod, "optin", () => t.innerType?._zod?.optin), b(e._zod, "optout", () => t.innerType?._zod?.optout), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(Qn) : Qn(r);
	};
});
function Qn(e) {
	return e.value = Object.freeze(e.value), e;
}
var $n = /*@__PURE__*/ c("$ZodLazy", (e, t) => {
	Bt.init(e, t), b(e._zod, "innerType", () => {
		let e = t;
		return e._cachedInner ||= t.getter(), e._cachedInner;
	}), b(e._zod, "pattern", () => e._zod.innerType?._zod?.pattern), b(e._zod, "propValues", () => e._zod.innerType?._zod?.propValues), b(e._zod, "optin", () => e._zod.innerType?._zod?.optin ?? void 0), b(e._zod, "optout", () => e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n) => e._zod.innerType._zod.run(t, n);
}), er = /*@__PURE__*/ c("$ZodCustom", (e, t) => {
	xt.init(e, t), Bt.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
		let r = n.value, i = t.fn(r);
		if (i instanceof Promise) return i.then((t) => tr(t, n, r, e));
		tr(i, n, r, e);
	};
});
function tr(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(we(e));
	}
}
//#endregion
//#region node_modules/zod/v4/core/registries.js
var nr, rr = class {
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
function ir() {
	return new rr();
}
(nr = globalThis).__zod_globalRegistry ?? (nr.__zod_globalRegistry = ir());
var ar = globalThis.__zod_globalRegistry;
//#endregion
//#region node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function or(e, t) {
	return new e({
		type: "string",
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function sr(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function cr(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function lr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ur(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function dr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function fr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function pr(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function mr(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function hr(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function gr(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function _r(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function vr(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function yr(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function br(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function xr(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Sr(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Cr(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function wr(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Tr(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Er(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Dr(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Or(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function kr(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ar(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function jr(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Mr(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Nr(e, t) {
	return new e({
		type: "number",
		checks: [],
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Pr(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Fr(e, t) {
	return new e({
		type: "boolean",
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ir(e, t) {
	return new e({
		type: "null",
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Lr(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function Rr(e, t) {
	return new e({
		type: "never",
		...S(t)
	});
}
// @__NO_SIDE_EFFECTS__
function zr(e, t) {
	return new Ct({
		check: "less_than",
		...S(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function Br(e, t) {
	return new Ct({
		check: "less_than",
		...S(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function Vr(e, t) {
	return new wt({
		check: "greater_than",
		...S(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function Hr(e, t) {
	return new wt({
		check: "greater_than",
		...S(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function Ur(e, t) {
	return new Tt({
		check: "multiple_of",
		...S(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function Wr(e, t) {
	return new Dt({
		check: "max_length",
		...S(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Gr(e, t) {
	return new Ot({
		check: "min_length",
		...S(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Kr(e, t) {
	return new kt({
		check: "length_equals",
		...S(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function qr(e, t) {
	return new jt({
		check: "string_format",
		format: "regex",
		...S(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function Jr(e) {
	return new Mt({
		check: "string_format",
		format: "lowercase",
		...S(e)
	});
}
// @__NO_SIDE_EFFECTS__
function Yr(e) {
	return new Nt({
		check: "string_format",
		format: "uppercase",
		...S(e)
	});
}
// @__NO_SIDE_EFFECTS__
function Xr(e, t) {
	return new Pt({
		check: "string_format",
		format: "includes",
		...S(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function Zr(e, t) {
	return new Ft({
		check: "string_format",
		format: "starts_with",
		...S(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function Qr(e, t) {
	return new It({
		check: "string_format",
		format: "ends_with",
		...S(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function $r(e) {
	return new Lt({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function ei(e) {
	return /* @__PURE__ */ $r((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function ti() {
	return /* @__PURE__ */ $r((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function ni() {
	return /* @__PURE__ */ $r((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function ri() {
	return /* @__PURE__ */ $r((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function ii() {
	return /* @__PURE__ */ $r((e) => re(e));
}
// @__NO_SIDE_EFFECTS__
function ai(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...S(n)
	});
}
// @__NO_SIDE_EFFECTS__
function oi(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...S(n)
	});
}
// @__NO_SIDE_EFFECTS__
function si(e, t) {
	let n = /* @__PURE__ */ ci((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(we(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", r.input ??= t.value, r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(we(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function ci(e, t) {
	let n = new xt({
		check: "custom",
		...S(t)
	});
	return n._zod.check = e, n;
}
//#endregion
//#region node_modules/zod/v4/core/to-json-schema.js
function li(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? ar,
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
function ui(e, t, n = {
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
		a && (o.ref ||= a, ui(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Object.assign(o.schema, c), t.io === "input" && pi(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function di(e, t) {
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
function fi(e, t) {
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
					input: hi(t, "input", e.processors),
					output: hi(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function pi(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return pi(r.element, n);
	if (r.type === "set") return pi(r.valueType, n);
	if (r.type === "lazy") return pi(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault") return pi(r.innerType, n);
	if (r.type === "intersection") return pi(r.left, n) || pi(r.right, n);
	if (r.type === "record" || r.type === "map") return pi(r.keyType, n) || pi(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : pi(r.in, n) || pi(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (pi(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (pi(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (pi(e, n)) return !0;
		return !!(r.rest && pi(r.rest, n));
	}
	return !1;
}
var mi = (e, t = {}) => (n) => {
	let r = li({
		...n,
		processors: t
	});
	return ui(e, r), di(r, e), fi(r, e);
}, hi = (e, t, n = {}) => (r) => {
	let { libraryOptions: i, target: a } = r ?? {}, o = li({
		...i ?? {},
		target: a,
		io: t,
		processors: n
	});
	return ui(e, o), di(o, e), fi(o, e);
}, gi = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
}, _i = (e, t, n, r) => {
	let i = n;
	i.type = "string";
	let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l } = e._zod.bag;
	if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = gi[s] ?? s, i.format === "" && delete i.format, s === "time" && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
		let e = [...c];
		e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
			...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: e.source
		}))]);
	}
}, vi = (e, t, n, r) => {
	let i = n, { minimum: a, maximum: o, format: s, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: u } = e._zod.bag;
	typeof s == "string" && s.includes("int") ? i.type = "integer" : i.type = "number";
	let d = typeof u == "number" && u >= (a ?? -Infinity), f = typeof l == "number" && l <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
	d ? p ? (i.minimum = u, i.exclusiveMinimum = !0) : i.exclusiveMinimum = u : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = l, i.exclusiveMaximum = !0) : i.exclusiveMaximum = l : typeof o == "number" && (i.maximum = o), typeof c == "number" && (i.multipleOf = c);
}, yi = (e, t, n, r) => {
	n.type = "boolean";
}, bi = (e, t, n, r) => {
	t.target === "openapi-3.0" ? (n.type = "string", n.nullable = !0, n.enum = [null]) : n.type = "null";
}, xi = (e, t, n, r) => {
	n.not = {};
}, Si = (e, t, n, r) => {
	let i = e._zod.def, a = p(i.entries);
	a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
}, Ci = (e, t, n, r) => {
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
}, wi = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Custom types cannot be represented in JSON Schema");
}, Ti = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Transforms cannot be represented in JSON Schema");
}, Ei = (e, t, n, r) => {
	let i = n, a = e._zod.def, { minimum: o, maximum: s } = e._zod.bag;
	typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = ui(a.element, t, {
		...r,
		path: [...r.path, "items"]
	});
}, Di = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object", i.properties = {};
	let o = a.shape;
	for (let e in o) i.properties[e] = ui(o[e], t, {
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
	c.size > 0 && (i.required = Array.from(c)), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = ui(a.catchall, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	})) : t.io === "output" && (i.additionalProperties = !1);
}, Oi = (e, t, n, r) => {
	let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => ui(e, t, {
		...r,
		path: [
			...r.path,
			a ? "oneOf" : "anyOf",
			n
		]
	}));
	a ? n.oneOf = o : n.anyOf = o;
}, ki = (e, t, n, r) => {
	let i = e._zod.def, a = ui(i.left, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			0
		]
	}), o = ui(i.right, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			1
		]
	}), s = (e) => "allOf" in e && Object.keys(e).length === 1;
	n.allOf = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
}, Ai = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object";
	let o = a.keyType, s = o._zod.bag?.patterns;
	if (a.mode === "loose" && s && s.size > 0) {
		let e = ui(a.valueType, t, {
			...r,
			path: [
				...r.path,
				"patternProperties",
				"*"
			]
		});
		i.patternProperties = {};
		for (let t of s) i.patternProperties[t.source] = e;
	} else (t.target === "draft-07" || t.target === "draft-2020-12") && (i.propertyNames = ui(a.keyType, t, {
		...r,
		path: [...r.path, "propertyNames"]
	})), i.additionalProperties = ui(a.valueType, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	});
	let c = o._zod.values;
	if (c) {
		let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
		e.length > 0 && (i.required = e);
	}
}, ji = (e, t, n, r) => {
	let i = e._zod.def, a = ui(i.innerType, t, r), o = t.seen.get(e);
	t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
}, Mi = (e, t, n, r) => {
	let i = e._zod.def;
	ui(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Ni = (e, t, n, r) => {
	let i = e._zod.def;
	ui(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.default = JSON.parse(JSON.stringify(i.defaultValue));
}, Pi = (e, t, n, r) => {
	let i = e._zod.def;
	ui(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, t.io === "input" && (n._prefault = JSON.parse(JSON.stringify(i.defaultValue)));
}, Fi = (e, t, n, r) => {
	let i = e._zod.def;
	ui(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o;
	try {
		o = i.catchValue(void 0);
	} catch {
		throw Error("Dynamic catch values are not supported in JSON Schema");
	}
	n.default = o;
}, Ii = (e, t, n, r) => {
	let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
	ui(o, t, r);
	let s = t.seen.get(e);
	s.ref = o;
}, Li = (e, t, n, r) => {
	let i = e._zod.def;
	ui(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.readOnly = !0;
}, Ri = (e, t, n, r) => {
	let i = e._zod.def;
	ui(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, zi = (e, t, n, r) => {
	let i = e._zod.innerType;
	ui(i, t, r);
	let a = t.seen.get(e);
	a.ref = i;
}, Bi = /*@__PURE__*/ c("ZodISODateTime", (e, t) => {
	en.init(e, t), ua.init(e, t);
});
function Vi(e) {
	return /* @__PURE__ */ kr(Bi, e);
}
var Hi = /*@__PURE__*/ c("ZodISODate", (e, t) => {
	tn.init(e, t), ua.init(e, t);
});
function Ui(e) {
	return /* @__PURE__ */ Ar(Hi, e);
}
var Wi = /*@__PURE__*/ c("ZodISOTime", (e, t) => {
	nn.init(e, t), ua.init(e, t);
});
function Gi(e) {
	return /* @__PURE__ */ jr(Wi, e);
}
var Ki = /*@__PURE__*/ c("ZodISODuration", (e, t) => {
	rn.init(e, t), ua.init(e, t);
});
function qi(e) {
	return /* @__PURE__ */ Mr(Ki, e);
}
var E = /*@__PURE__*/ c("ZodError", (e, t) => {
	T.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
		format: { value: (t) => Oe(e, t) },
		flatten: { value: (t) => De(e, t) },
		addIssue: { value: (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, m, 2);
		} },
		addIssues: { value: (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, m, 2);
		} },
		isEmpty: { get() {
			return e.issues.length === 0;
		} }
	});
}, { Parent: Error }), Ji = /* @__PURE__ */ ke(E), Yi = /* @__PURE__ */ Ae(E), Xi = /* @__PURE__ */ je(E), Zi = /* @__PURE__ */ Ne(E), Qi = /* @__PURE__ */ Fe(E), $i = /* @__PURE__ */ Ie(E), ea = /* @__PURE__ */ Le(E), ta = /* @__PURE__ */ Re(E), na = /* @__PURE__ */ ze(E), ra = /* @__PURE__ */ Be(E), ia = /* @__PURE__ */ Ve(E), aa = /* @__PURE__ */ He(E), oa = /* @__PURE__ */ new WeakMap();
function sa(e, t, n) {
	let r = Object.getPrototypeOf(e), i = oa.get(r);
	if (i || (i = /* @__PURE__ */ new Set(), oa.set(r, i)), !i.has(t)) {
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
var D = /*@__PURE__*/ c("ZodType", (e, t) => (Bt.init(e, t), Object.assign(e["~standard"], { jsonSchema: {
	input: hi(e, "input"),
	output: hi(e, "output")
} }), e.toJSONSchema = mi(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.parse = (t, n) => Ji(e, t, n, { callee: e.parse }), e.safeParse = (t, n) => Xi(e, t, n), e.parseAsync = async (t, n) => Yi(e, t, n, { callee: e.parseAsync }), e.safeParseAsync = async (t, n) => Zi(e, t, n), e.spa = e.safeParseAsync, e.encode = (t, n) => Qi(e, t, n), e.decode = (t, n) => $i(e, t, n), e.encodeAsync = async (t, n) => ea(e, t, n), e.decodeAsync = async (t, n) => ta(e, t, n), e.safeEncode = (t, n) => na(e, t, n), e.safeDecode = (t, n) => ra(e, t, n), e.safeEncodeAsync = async (t, n) => ia(e, t, n), e.safeDecodeAsync = async (t, n) => aa(e, t, n), sa(e, "ZodType", {
	check(...e) {
		let t = this.def;
		return this.clone(te(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
			check: e,
			def: { check: "custom" },
			onattach: []
		} } : e)] }), { parent: !0 });
	},
	with(...e) {
		return this.check(...e);
	},
	clone(e, t) {
		return ue(this, e, t);
	},
	brand() {
		return this;
	},
	register(e, t) {
		return e.add(this, t), this;
	},
	refine(e, t) {
		return this.check(xo(e, t));
	},
	superRefine(e, t) {
		return this.check(So(e, t));
	},
	overwrite(e) {
		return this.check(/* @__PURE__ */ $r(e));
	},
	optional() {
		return to(this);
	},
	exactOptional() {
		return ro(this);
	},
	nullable() {
		return ao(this);
	},
	nullish() {
		return to(ao(this));
	},
	nonoptional(e) {
		return fo(this, e);
	},
	array() {
		return za(this);
	},
	or(e) {
		return Ha([this, e]);
	},
	and(e) {
		return Ka(this, e);
	},
	transform(e) {
		return go(this, $a(e));
	},
	default(e) {
		return so(this, e);
	},
	prefault(e) {
		return lo(this, e);
	},
	catch(e) {
		return mo(this, e);
	},
	pipe(e) {
		return go(this, e);
	},
	readonly() {
		return vo(this);
	},
	describe(e) {
		let t = this.clone();
		return ar.add(t, { description: e }), t;
	},
	meta(...e) {
		if (e.length === 0) return ar.get(this);
		let t = this.clone();
		return ar.add(t, e[0]), t;
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
		return ar.get(e)?.description;
	},
	configurable: !0
}), e)), ca = /*@__PURE__*/ c("_ZodString", (e, t) => {
	Vt.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => _i(e, t, n, r);
	let n = e._zod.bag;
	e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, sa(e, "_ZodString", {
		regex(...e) {
			return this.check(/* @__PURE__ */ qr(...e));
		},
		includes(...e) {
			return this.check(/* @__PURE__ */ Xr(...e));
		},
		startsWith(...e) {
			return this.check(/* @__PURE__ */ Zr(...e));
		},
		endsWith(...e) {
			return this.check(/* @__PURE__ */ Qr(...e));
		},
		min(...e) {
			return this.check(/* @__PURE__ */ Gr(...e));
		},
		max(...e) {
			return this.check(/* @__PURE__ */ Wr(...e));
		},
		length(...e) {
			return this.check(/* @__PURE__ */ Kr(...e));
		},
		nonempty(...e) {
			return this.check(/* @__PURE__ */ Gr(1, ...e));
		},
		lowercase(e) {
			return this.check(/* @__PURE__ */ Jr(e));
		},
		uppercase(e) {
			return this.check(/* @__PURE__ */ Yr(e));
		},
		trim() {
			return this.check(/* @__PURE__ */ ti());
		},
		normalize(...e) {
			return this.check(/* @__PURE__ */ ei(...e));
		},
		toLowerCase() {
			return this.check(/* @__PURE__ */ ni());
		},
		toUpperCase() {
			return this.check(/* @__PURE__ */ ri());
		},
		slugify() {
			return this.check(/* @__PURE__ */ ii());
		}
	});
}), la = /*@__PURE__*/ c("ZodString", (e, t) => {
	Vt.init(e, t), ca.init(e, t), e.email = (t) => e.check(/* @__PURE__ */ sr(da, t)), e.url = (t) => e.check(/* @__PURE__ */ pr(ma, t)), e.jwt = (t) => e.check(/* @__PURE__ */ Or(Da, t)), e.emoji = (t) => e.check(/* @__PURE__ */ mr(ha, t)), e.guid = (t) => e.check(/* @__PURE__ */ cr(fa, t)), e.uuid = (t) => e.check(/* @__PURE__ */ lr(pa, t)), e.uuidv4 = (t) => e.check(/* @__PURE__ */ ur(pa, t)), e.uuidv6 = (t) => e.check(/* @__PURE__ */ dr(pa, t)), e.uuidv7 = (t) => e.check(/* @__PURE__ */ fr(pa, t)), e.nanoid = (t) => e.check(/* @__PURE__ */ hr(ga, t)), e.guid = (t) => e.check(/* @__PURE__ */ cr(fa, t)), e.cuid = (t) => e.check(/* @__PURE__ */ gr(_a, t)), e.cuid2 = (t) => e.check(/* @__PURE__ */ _r(va, t)), e.ulid = (t) => e.check(/* @__PURE__ */ vr(ya, t)), e.base64 = (t) => e.check(/* @__PURE__ */ Tr(wa, t)), e.base64url = (t) => e.check(/* @__PURE__ */ Er(Ta, t)), e.xid = (t) => e.check(/* @__PURE__ */ yr(ba, t)), e.ksuid = (t) => e.check(/* @__PURE__ */ br(xa, t)), e.ipv4 = (t) => e.check(/* @__PURE__ */ xr(k, t)), e.ipv6 = (t) => e.check(/* @__PURE__ */ Sr(A, t)), e.cidrv4 = (t) => e.check(/* @__PURE__ */ Cr(Sa, t)), e.cidrv6 = (t) => e.check(/* @__PURE__ */ wr(Ca, t)), e.e164 = (t) => e.check(/* @__PURE__ */ Dr(Ea, t)), e.datetime = (t) => e.check(Vi(t)), e.date = (t) => e.check(Ui(t)), e.time = (t) => e.check(Gi(t)), e.duration = (t) => e.check(qi(t));
});
function O(e) {
	return /* @__PURE__ */ or(la, e);
}
var ua = /*@__PURE__*/ c("ZodStringFormat", (e, t) => {
	Ht.init(e, t), ca.init(e, t);
}), da = /*@__PURE__*/ c("ZodEmail", (e, t) => {
	Gt.init(e, t), ua.init(e, t);
}), fa = /*@__PURE__*/ c("ZodGUID", (e, t) => {
	Ut.init(e, t), ua.init(e, t);
}), pa = /*@__PURE__*/ c("ZodUUID", (e, t) => {
	Wt.init(e, t), ua.init(e, t);
}), ma = /*@__PURE__*/ c("ZodURL", (e, t) => {
	Kt.init(e, t), ua.init(e, t);
}), ha = /*@__PURE__*/ c("ZodEmoji", (e, t) => {
	qt.init(e, t), ua.init(e, t);
}), ga = /*@__PURE__*/ c("ZodNanoID", (e, t) => {
	Jt.init(e, t), ua.init(e, t);
}), _a = /*@__PURE__*/ c("ZodCUID", (e, t) => {
	Yt.init(e, t), ua.init(e, t);
}), va = /*@__PURE__*/ c("ZodCUID2", (e, t) => {
	Xt.init(e, t), ua.init(e, t);
}), ya = /*@__PURE__*/ c("ZodULID", (e, t) => {
	Zt.init(e, t), ua.init(e, t);
}), ba = /*@__PURE__*/ c("ZodXID", (e, t) => {
	Qt.init(e, t), ua.init(e, t);
}), xa = /*@__PURE__*/ c("ZodKSUID", (e, t) => {
	$t.init(e, t), ua.init(e, t);
}), k = /*@__PURE__*/ c("ZodIPv4", (e, t) => {
	an.init(e, t), ua.init(e, t);
}), A = /*@__PURE__*/ c("ZodIPv6", (e, t) => {
	on.init(e, t), ua.init(e, t);
}), Sa = /*@__PURE__*/ c("ZodCIDRv4", (e, t) => {
	sn.init(e, t), ua.init(e, t);
}), Ca = /*@__PURE__*/ c("ZodCIDRv6", (e, t) => {
	cn.init(e, t), ua.init(e, t);
}), wa = /*@__PURE__*/ c("ZodBase64", (e, t) => {
	un.init(e, t), ua.init(e, t);
}), Ta = /*@__PURE__*/ c("ZodBase64URL", (e, t) => {
	fn.init(e, t), ua.init(e, t);
}), Ea = /*@__PURE__*/ c("ZodE164", (e, t) => {
	pn.init(e, t), ua.init(e, t);
}), Da = /*@__PURE__*/ c("ZodJWT", (e, t) => {
	hn.init(e, t), ua.init(e, t);
}), Oa = /*@__PURE__*/ c("ZodNumber", (e, t) => {
	gn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => vi(e, t, n, r), sa(e, "ZodNumber", {
		gt(e, t) {
			return this.check(/* @__PURE__ */ Vr(e, t));
		},
		gte(e, t) {
			return this.check(/* @__PURE__ */ Hr(e, t));
		},
		min(e, t) {
			return this.check(/* @__PURE__ */ Hr(e, t));
		},
		lt(e, t) {
			return this.check(/* @__PURE__ */ zr(e, t));
		},
		lte(e, t) {
			return this.check(/* @__PURE__ */ Br(e, t));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ Br(e, t));
		},
		int(e) {
			return this.check(Aa(e));
		},
		safe(e) {
			return this.check(Aa(e));
		},
		positive(e) {
			return this.check(/* @__PURE__ */ Vr(0, e));
		},
		nonnegative(e) {
			return this.check(/* @__PURE__ */ Hr(0, e));
		},
		negative(e) {
			return this.check(/* @__PURE__ */ zr(0, e));
		},
		nonpositive(e) {
			return this.check(/* @__PURE__ */ Br(0, e));
		},
		multipleOf(e, t) {
			return this.check(/* @__PURE__ */ Ur(e, t));
		},
		step(e, t) {
			return this.check(/* @__PURE__ */ Ur(e, t));
		},
		finite() {
			return this;
		}
	});
	let n = e._zod.bag;
	e.minValue = Math.max(n.minimum ?? -Infinity, n.exclusiveMinimum ?? -Infinity) ?? null, e.maxValue = Math.min(n.maximum ?? Infinity, n.exclusiveMaximum ?? Infinity) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? .5), e.isFinite = !0, e.format = n.format ?? null;
});
function j(e) {
	return /* @__PURE__ */ Nr(Oa, e);
}
var ka = /*@__PURE__*/ c("ZodNumberFormat", (e, t) => {
	_n.init(e, t), Oa.init(e, t);
});
function Aa(e) {
	return /* @__PURE__ */ Pr(ka, e);
}
var ja = /*@__PURE__*/ c("ZodBoolean", (e, t) => {
	vn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => yi(e, t, n, r);
});
function M(e) {
	return /* @__PURE__ */ Fr(ja, e);
}
var Ma = /*@__PURE__*/ c("ZodNull", (e, t) => {
	yn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => bi(e, t, n, r);
});
function Na(e) {
	return /* @__PURE__ */ Ir(Ma, e);
}
var Pa = /*@__PURE__*/ c("ZodUnknown", (e, t) => {
	bn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function Fa() {
	return /* @__PURE__ */ Lr(Pa);
}
var Ia = /*@__PURE__*/ c("ZodNever", (e, t) => {
	xn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => xi(e, t, n, r);
});
function La(e) {
	return /* @__PURE__ */ Rr(Ia, e);
}
var Ra = /*@__PURE__*/ c("ZodArray", (e, t) => {
	Cn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ei(e, t, n, r), e.element = t.element, sa(e, "ZodArray", {
		min(e, t) {
			return this.check(/* @__PURE__ */ Gr(e, t));
		},
		nonempty(e) {
			return this.check(/* @__PURE__ */ Gr(1, e));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ Wr(e, t));
		},
		length(e, t) {
			return this.check(/* @__PURE__ */ Kr(e, t));
		},
		unwrap() {
			return this.element;
		}
	});
});
function za(e, t) {
	return /* @__PURE__ */ ai(Ra, e, t);
}
var Ba = /*@__PURE__*/ c("ZodObject", (e, t) => {
	On.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Di(e, t, n, r), b(e, "shape", () => t.shape), sa(e, "ZodObject", {
		keyof() {
			return P(Object.keys(this._zod.def.shape));
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
				catchall: Fa()
			});
		},
		loose() {
			return this.clone({
				...this._zod.def,
				catchall: Fa()
			});
		},
		strict() {
			return this.clone({
				...this._zod.def,
				catchall: La()
			});
		},
		strip() {
			return this.clone({
				...this._zod.def,
				catchall: void 0
			});
		},
		extend(e) {
			return pe(this, e);
		},
		safeExtend(e) {
			return me(this, e);
		},
		merge(e) {
			return he(this, e);
		},
		pick(e) {
			return C(this, e);
		},
		omit(e) {
			return w(this, e);
		},
		partial(...e) {
			return ge(eo, this, e[0]);
		},
		required(...e) {
			return _e(uo, this, e[0]);
		}
	});
});
function N(e, t) {
	return new Ba({
		type: "object",
		shape: e ?? {},
		...S(t)
	});
}
var Va = /*@__PURE__*/ c("ZodUnion", (e, t) => {
	An.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Oi(e, t, n, r), e.options = t.options;
});
function Ha(e, t) {
	return new Va({
		type: "union",
		options: e,
		...S(t)
	});
}
var Ua = /*@__PURE__*/ c("ZodDiscriminatedUnion", (e, t) => {
	Va.init(e, t), jn.init(e, t);
});
function Wa(e, t, n) {
	return new Ua({
		type: "union",
		options: t,
		discriminator: e,
		...S(n)
	});
}
var Ga = /*@__PURE__*/ c("ZodIntersection", (e, t) => {
	Mn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => ki(e, t, n, r);
});
function Ka(e, t) {
	return new Ga({
		type: "intersection",
		left: e,
		right: t
	});
}
var qa = /*@__PURE__*/ c("ZodRecord", (e, t) => {
	Fn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ai(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
});
function Ja(e, t, n) {
	return !t || !t._zod ? new qa({
		type: "record",
		keyType: O(),
		valueType: e,
		...S(t)
	}) : new qa({
		type: "record",
		keyType: e,
		valueType: t,
		...S(n)
	});
}
var Ya = /*@__PURE__*/ c("ZodEnum", (e, t) => {
	In.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Si(e, t, n, r), e.enum = t.entries, e.options = Object.values(t.entries);
	let n = new Set(Object.keys(t.entries));
	e.extract = (e, r) => {
		let i = {};
		for (let r of e) if (n.has(r)) i[r] = t.entries[r];
		else throw Error(`Key ${r} not found in enum`);
		return new Ya({
			...t,
			checks: [],
			...S(r),
			entries: i
		});
	}, e.exclude = (e, r) => {
		let i = { ...t.entries };
		for (let t of e) if (n.has(t)) delete i[t];
		else throw Error(`Key ${t} not found in enum`);
		return new Ya({
			...t,
			checks: [],
			...S(r),
			entries: i
		});
	};
});
function P(e, t) {
	return new Ya({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...S(t)
	});
}
var Xa = /*@__PURE__*/ c("ZodLiteral", (e, t) => {
	Ln.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ci(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
		if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return t.values[0];
	} });
});
function Za(e, t) {
	return new Xa({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...S(t)
	});
}
var Qa = /*@__PURE__*/ c("ZodTransform", (e, t) => {
	Rn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ti(e, t, n, r), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new u(e.constructor.name);
		n.addIssue = (r) => {
			if (typeof r == "string") n.issues.push(we(r, n.value, t));
			else {
				let t = r;
				t.fatal && (t.continue = !1), t.code ??= "custom", t.input ??= n.value, t.inst ??= e, n.issues.push(we(t));
			}
		};
		let i = t.transform(n.value, n);
		return i instanceof Promise ? i.then((e) => (n.value = e, n.fallback = !0, n)) : (n.value = i, n.fallback = !0, n);
	};
});
function $a(e) {
	return new Qa({
		type: "transform",
		transform: e
	});
}
var eo = /*@__PURE__*/ c("ZodOptional", (e, t) => {
	Bn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ri(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function to(e) {
	return new eo({
		type: "optional",
		innerType: e
	});
}
var no = /*@__PURE__*/ c("ZodExactOptional", (e, t) => {
	Vn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ri(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function ro(e) {
	return new no({
		type: "optional",
		innerType: e
	});
}
var io = /*@__PURE__*/ c("ZodNullable", (e, t) => {
	Hn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => ji(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function ao(e) {
	return new io({
		type: "nullable",
		innerType: e
	});
}
var oo = /*@__PURE__*/ c("ZodDefault", (e, t) => {
	Un.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ni(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function so(e, t) {
	return new oo({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ce(t);
		}
	});
}
var co = /*@__PURE__*/ c("ZodPrefault", (e, t) => {
	Gn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Pi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function lo(e, t) {
	return new co({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : ce(t);
		}
	});
}
var uo = /*@__PURE__*/ c("ZodNonOptional", (e, t) => {
	Kn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Mi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function fo(e, t) {
	return new uo({
		type: "nonoptional",
		innerType: e,
		...S(t)
	});
}
var po = /*@__PURE__*/ c("ZodCatch", (e, t) => {
	Jn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Fi(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function mo(e, t) {
	return new po({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : () => t
	});
}
var ho = /*@__PURE__*/ c("ZodPipe", (e, t) => {
	Yn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ii(e, t, n, r), e.in = t.in, e.out = t.out;
});
function go(e, t) {
	return new ho({
		type: "pipe",
		in: e,
		out: t
	});
}
var _o = /*@__PURE__*/ c("ZodReadonly", (e, t) => {
	Zn.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => Li(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function vo(e) {
	return new _o({
		type: "readonly",
		innerType: e
	});
}
var F = /*@__PURE__*/ c("ZodLazy", (e, t) => {
	$n.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => zi(e, t, n, r), e.unwrap = () => e._zod.def.getter();
});
function yo(e) {
	return new F({
		type: "lazy",
		getter: e
	});
}
var bo = /*@__PURE__*/ c("ZodCustom", (e, t) => {
	er.init(e, t), D.init(e, t), e._zod.processJSONSchema = (t, n, r) => wi(e, t, n, r);
});
function xo(e, t = {}) {
	return /* @__PURE__ */ oi(bo, e, t);
}
function So(e, t) {
	return /* @__PURE__ */ si(e, t);
}
//#endregion
//#region src/specification/presentation.ts
var I = /* @__PURE__ */ n(r(), 1), Co = N({
	enabled: M(),
	trigger: Za("document-load"),
	duration: j().min(100).max(1e4),
	disruption: j().min(0).max(1),
	blur: j().min(0).max(64)
}), wo = N({ legacyMode: N({
	enabled: M(),
	pixelation: Co
}) }), To = { legacyMode: {
	enabled: !1,
	pixelation: {
		enabled: !0,
		trigger: "document-load",
		duration: 2e3,
		disruption: .75,
		blur: 22
	}
} };
function Eo() {
	return { legacyMode: {
		...To.legacyMode,
		pixelation: { ...To.legacyMode.pixelation }
	} };
}
//#endregion
//#region src/runtime/runtime-context.tsx
var Do = (0, I.createContext)(null);
function Oo(e) {
	let t = ko();
	return e ? t.resolveAsset(e) : void 0;
}
function ko() {
	let e = (0, I.useContext)(Do);
	if (!e) throw Error("AMP Runtime component must be rendered inside AMPReader.");
	return e;
}
//#endregion
//#region src/specification/version.ts
var Ao = "1.0.0", jo = 1080, Mo = 1e5, No = N({
	x: j().finite(),
	y: j().finite()
}), Po = N({
	width: Ha([j().positive().finite(), Za("auto")]),
	height: Ha([j().positive().finite(), Za("auto")])
}), Fo = N({
	top: j().finite(),
	right: j().finite(),
	bottom: j().finite(),
	left: j().finite()
}), Io = P([
	"flow",
	"float-left",
	"float-right",
	"inline",
	"center",
	"absolute"
]), Lo = P([
	"top-left",
	"top-center",
	"top-right",
	"center-left",
	"center",
	"center-right",
	"bottom-left",
	"bottom-center",
	"bottom-right"
]), Ro = P([
	"visible",
	"hidden",
	"scroll"
]), zo = N({
	mode: Io,
	position: No.optional(),
	size: Po,
	rotation: j().optional(),
	margin: Fo.partial().optional(),
	padding: Fo.partial().optional(),
	align: P([
		"left",
		"center",
		"right",
		"justify"
	]).optional(),
	zIndex: j().int().optional(),
	anchor: Lo.optional(),
	overflow: Ro.optional()
}), Bo = Ha([j().int(), P(["normal", "bold"])]), Vo = N({
	fontFamily: O(),
	fontSize: j().positive(),
	fontWeight: Bo.optional(),
	fontStyle: P(["normal", "italic"]).optional(),
	color: O().optional(),
	letterSpacing: j().optional(),
	lineHeight: j().optional(),
	paragraphSpacing: j().optional(),
	justify: P([
		"left",
		"right",
		"center",
		"justify"
	]).optional(),
	indent: j().optional()
}), Ho = P([
	"bold",
	"italic",
	"underline",
	"strikethrough",
	"code"
]), Uo = N({
	text: O(),
	marks: za(Ho).optional(),
	color: O().optional(),
	href: O().optional()
}), Wo = P([
	"none",
	"ordered",
	"unordered"
]), Go = za(N({
	kind: Za("paragraph"),
	runs: za(Uo),
	listType: Wo.optional(),
	indent: j().int().optional()
})), Ko = O().refine((e) => e === "" ? !0 : e.includes("\\") || e.startsWith("/") || /^[a-z][a-z\d+.-]*:/i.test(e) ? !1 : e.split("/").every((e) => e.length > 0 && e !== "." && e !== ".."), "Asset reference must be a normalized relative project path"), qo = yo(() => Ha([
	O(),
	j().finite(),
	M(),
	Na(),
	za(qo),
	Ja(O(), qo)
])), Jo = N({
	opacity: j().min(0).max(1).optional(),
	backgroundColor: O().optional(),
	borderRadius: j().min(0).finite().optional(),
	border: N({
		width: j().min(0).finite(),
		color: O(),
		style: P([
			"solid",
			"dashed",
			"dotted"
		]).optional()
	}).optional()
}).catchall(qo), Yo = N({
	id: O().min(1),
	type: O(),
	name: O().optional(),
	layout: zo,
	style: Jo.optional(),
	metadata: Ja(O(), qo).optional()
}), Xo = N({
	x: j().finite().min(0),
	y: j().finite().min(0)
}), Zo = N({
	side: P(["left", "right"]),
	top: j().finite().min(0),
	width: j().finite().min(0),
	height: j().finite().min(0),
	clearance: j().finite().min(0).max(200).optional(),
	contour: za(Xo).min(3)
}), Qo = Wa("state", [N({ state: Za("pending") }), N({
	state: Za("complete"),
	sceneSignature: O().min(1),
	sampleCount: j().int().min(1).max(96),
	collisionArea: j().finite().min(0)
})]), $o = N({
	enabled: M(),
	strategy: P([
		"maximum-container",
		"maximum-rotation-envelope",
		"iterative-collision"
	]),
	spacers: za(Zo).max(2),
	baked: Qo.optional()
}), es = N({
	enabled: M(),
	targetNodeIds: za(O()),
	side: P([
		"auto",
		"left",
		"right"
	]),
	margin: j().min(0).max(200),
	mode: P(["container", "silhouette"]).optional(),
	alphaThreshold: j().min(0).max(1).optional(),
	updateFps: j().int().min(1).max(30).optional(),
	static: $o.optional()
}), ts = Yo.extend({
	type: Za("text"),
	content: Go,
	typography: Vo,
	runtimeWrap: es.optional()
}), ns = P([
	"cover",
	"contain",
	"fill",
	"none"
]), rs = N({
	x: j().min(0).max(1),
	y: j().min(0).max(1),
	width: j().positive().max(1),
	height: j().positive().max(1)
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
}), is = N({
	items: za(N({
		src: Ko,
		alt: O().optional()
	})).min(2),
	mode: P(["carousel", "gallery"]),
	autoplay: M(),
	interval: j().min(1).max(60),
	loop: M(),
	showArrows: M(),
	showIndicators: M(),
	transition: P([
		"none",
		"fade",
		"slide"
	]).default("fade"),
	transitionDuration: j().min(.1).max(5).default(.45),
	columns: j().int().min(1).max(12),
	gap: j().min(0).max(100),
	fullscreenView: M().default(!1),
	autoAdjust: M().default(!1)
}).optional(), as = Yo.extend({
	type: Za("image"),
	src: Ko,
	alt: O().optional(),
	fit: ns,
	crop: rs.optional(),
	gallery: is
}), os = Yo.extend({
	type: Za("video"),
	src: Ko,
	poster: Ko.optional(),
	controls: M(),
	loop: M(),
	autoplay: M(),
	muted: M(),
	lightbox: N({
		enabled: M(),
		hoverLabel: O()
	}).optional()
}), ss = P([
	"studio",
	"soft",
	"dramatic",
	"neutral",
	"outdoor"
]), cs = P([
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
]), ls = P([
	"none",
	"soft",
	"hard"
]), us = N({
	autoRotate: M(),
	pauseOnHover: M(),
	resumeOnLeave: M(),
	rotationOffset: N({
		enabled: M(),
		x: j().min(-360).max(360),
		y: j().min(-360).max(360),
		z: j().min(-360).max(360)
	}).optional(),
	rotationSpeed: N({
		x: j().min(-360).max(360),
		y: j().min(-360).max(360),
		z: j().min(-360).max(360)
	}).optional()
}), ds = N({ fov: j().min(10).max(120) }), fs = N({
	enabled: M(),
	bands: j().int().min(2).max(8),
	strength: j().min(0).max(1),
	smoothness: j().min(0).max(.49),
	roughnessMultiplier: j().min(0).max(2),
	metalnessMultiplier: j().min(0).max(2),
	opacityMultiplier: j().min(0).max(1),
	normalScale: j().min(0).max(2),
	ao: N({
		enabled: M(),
		intensity: j().min(0).max(2)
	}).optional(),
	outline: N({
		enabled: M(),
		color: O(),
		thickness: j().min(0).max(.1),
		opacity: j().min(0).max(1)
	}).optional()
}), ps = N({
	enabled: M(),
	baseColor: O(),
	roughness: j().min(0).max(1),
	metalness: j().min(0).max(1)
}), ms = N({
	enabled: M(),
	color: O(),
	thickness: j().min(.5).max(8)
}), hs = N({ enabled: M() }), gs = Yo.extend({
	type: Za("model3d"),
	src: Ko,
	behaviors: us,
	camera: ds.optional(),
	toon: fs.optional(),
	materialOverride: ps.optional(),
	wireframe: ms.optional(),
	textWrap: hs.default({ enabled: !0 }),
	lighting: ss.optional(),
	lightingIntensity: j().min(0).max(5).optional(),
	environment: cs.optional(),
	shadows: ls.optional(),
	backfaceCulling: M().optional(),
	transparentBackground: M().optional().transform(() => !0)
}), _s = N({
	in: j().min(0),
	out: j().min(0)
}), vs = Yo.extend({
	type: Za("audio"),
	src: Ko,
	loop: M(),
	volume: j().min(0).max(1),
	fade: _s.optional(),
	autoplay: M(),
	background: M().optional(),
	backgroundPlayback: N({
		startOnScroll: M(),
		stopAtDocumentEnd: M()
	}).optional()
}), ys = Yo.extend({
	type: Za("spacer"),
	axis: P(["vertical", "horizontal"]).optional()
}), bs = Yo.extend({
	type: Za("divider"),
	thickness: j().positive(),
	color: O(),
	lineStyle: P([
		"solid",
		"double",
		"dashed",
		"dotted",
		"zigzag"
	])
}), xs = P([
	"none",
	"thin-all",
	"thick-all",
	"thick-outside-thin-inside"
]), Ss = Ha([Go, O().transform((e) => [{
	kind: "paragraph",
	runs: e ? [{ text: e }] : []
}])]), Cs = Wa("type", [
	ts,
	as,
	os,
	gs,
	vs,
	ys,
	bs,
	Yo.extend({
		type: Za("table"),
		rows: za(za(Ss).min(1)).min(1),
		headerRow: M(),
		headerColumn: M(),
		borderTemplate: xs,
		borderColor: O(),
		thinBorderWidth: j().min(.25).max(10),
		thickBorderWidth: j().min(1).max(20),
		cellPadding: j().min(0).max(100),
		cellGap: j().min(0).max(50),
		textColor: O(),
		backgroundColor: O(),
		headerBackgroundColor: O(),
		striped: M(),
		textAlign: P([
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
	Yo.extend({
		type: Za("container"),
		children: yo(() => za(Cs))
	})
]), ws = N({
	family: O(),
	src: Ko,
	weight: Ha([j().int(), P(["normal", "bold"])]).optional(),
	style: P(["normal", "italic"]).optional()
}), Ts = N({
	id: O().min(1),
	title: O().optional(),
	createdAt: O().optional(),
	updatedAt: O().optional(),
	author: O().optional()
}).catchall(qo), Es = N({
	color: O().optional(),
	image: Ko.optional()
}), Ds = P(["hidden", "visible"]), Os = N({
	id: O().min(1),
	name: O().optional(),
	height: Ha([j().positive(), Za("auto")]).optional(),
	overflow: Ds.default("hidden"),
	background: Es.optional(),
	nodes: za(Cs)
}), ks = N({
	version: Za(Ao),
	metadata: Ts,
	presentation: wo.default(Eo),
	fonts: za(ws).optional(),
	sections: za(Os).min(1)
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
function As(e) {
	return ks.parse(e);
}
//#endregion
//#region src/runtime/load.ts
async function js(e, t = {}) {
	if (e instanceof URL) return Ms(e.toString(), t);
	if (typeof e == "string") {
		let n = e.trim();
		return n.startsWith("{") ? { document: As(JSON.parse(n)) } : Ms(e, t);
	}
	return { document: As(e) };
}
async function Ms(e, t) {
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
		document: As(r),
		inferredAssetBaseUrl: new URL(".", i).toString()
	};
}
function Ns(e) {
	let t = new URL(e.toString(), globalThis.location?.href ?? "http://amp.local/");
	return (e) => e ? new URL(e, t).toString() : "";
}
//#endregion
//#region src/runtime/layout.ts
var Ps = {
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
function Fs(e, t) {
	let n = {
		boxSizing: "border-box",
		position: "relative"
	}, r = e.size.width, i = e.size.height;
	if (r !== "auto" && (n.width = r), i !== "auto" && (n.height = i), Is(n, "margin", e.margin), Is(n, "padding", e.padding), e.mode === "absolute") {
		n.position = "absolute";
		let [t, a] = Ps[e.anchor ?? "top-left"];
		n.left = (e.position?.x ?? 0) - (r === "auto" ? 0 : r * t), n.top = (e.position?.y ?? 0) - (i === "auto" ? 0 : i * a);
	} else e.mode === "float-left" ? n.float = "left" : e.mode === "float-right" ? n.float = "right" : e.mode === "inline" ? n.display = "inline-block" : e.mode === "center" && (n.display = "block", n.marginLeft ??= "auto", n.marginRight ??= "auto");
	return e.align && (n.textAlign = e.align), e.rotation && (n.transform = `rotate(${e.rotation}deg)`, n.transformOrigin = "center center"), e.zIndex !== void 0 && (n.zIndex = e.zIndex), e.overflow && (n.overflow = e.overflow), t?.opacity !== void 0 && (n.opacity = t.opacity), t?.backgroundColor && (n.backgroundColor = t.backgroundColor), t?.borderRadius !== void 0 && (n.borderRadius = t.borderRadius), t?.border && (n.borderStyle = t.border.style ?? "solid", n.borderWidth = t.border.width, n.borderColor = t.border.color), n;
}
function Is(e, t, n) {
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
function Ls({ node: e }) {
	let t = Oo(e.src), n = (0, I.useRef)(null), r = (0, I.useRef)(0), i = (0, I.useRef)(!1);
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
			!o || !o.paused || (o.volume = e.fade?.in ? 0 : e.volume, o.play().then(() => Rs(o, e.volume, e.fade?.in ?? 0, r)).catch(() => void 0));
		}, s = () => {
			if (!a.stopAtDocumentEnd || i.current) return;
			let t = n.current?.closest(".amp-runtime-root");
			if (!t || t.getBoundingClientRect().bottom > innerHeight + 2) return;
			let o = n.current;
			!o || o.paused || (i.current = !0, Rs(o, 0, e.fade?.out ?? 0, r, () => o.pause()));
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
function Rs(e, t, n, r, i) {
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
function zs({ node: e }) {
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
//#region src/runtime/nodes/RuntimeLightbox.tsx
var Bs = a();
function Vs({ label: e, onClose: t }) {
	let { legacyMode: n } = ko();
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
function Hs(e) {
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
function Us({ node: e }) {
	let t = Oo(e.src);
	if (e.gallery) return e.gallery.mode === "gallery" ? /* @__PURE__ */ (0, L.jsx)(Ws, {
		node: e,
		gallery: e.gallery
	}) : /* @__PURE__ */ (0, L.jsx)(qs, {
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
function Ws({ node: e, gallery: t }) {
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
		children: t.items.map((n, i) => /* @__PURE__ */ (0, L.jsx)(Gs, {
			item: n,
			index: i,
			fit: e.fit,
			natural: t.autoAdjust,
			fullscreen: t.fullscreenView,
			gap: t.gap,
			onOpen: r
		}, `${n.src}-${i}`))
	}), n && (0, Bs.createPortal)(/* @__PURE__ */ (0, L.jsx)(Ks, {
		item: n,
		onClose: () => r(void 0)
	}), document.body)] });
}
function Gs({ item: e, index: t, fit: n, natural: r, fullscreen: i, gap: a, onOpen: o }) {
	let s = Oo(e.src), c = s ? /* @__PURE__ */ (0, L.jsx)("img", {
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
function Ks({ item: e, onClose: t }) {
	let n = Oo(e.src);
	return Hs(t), /* @__PURE__ */ (0, L.jsxs)("div", {
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
		}), /* @__PURE__ */ (0, L.jsx)(Vs, {
			label: "Close image",
			onClose: t
		})]
	});
}
function qs({ node: e, gallery: t }) {
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
			let e = Qs(o, 1, t.items.length, t.loop);
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
			t.items.map((e, t) => /* @__PURE__ */ (0, L.jsx)(Xs, { src: e.src }, `${e.src}-${t}`)),
			i ? /* @__PURE__ */ (0, L.jsxs)(L.Fragment, { children: [/* @__PURE__ */ (0, L.jsx)(Js, {
				item: t.items[i.from],
				fit: e.fit,
				gallery: t,
				direction: i.direction,
				incoming: !1,
				running: i.running
			}), /* @__PURE__ */ (0, L.jsx)(Js, {
				item: t.items[i.to],
				fit: e.fit,
				gallery: t,
				direction: i.direction,
				incoming: !0,
				running: i.running,
				onTransitionEnd: (e) => {
					e.target !== e.currentTarget || !i?.running || e.propertyName === (t.transition === "fade" ? "opacity" : "transform") && (r(i.to), a(void 0));
				}
			})] }) : /* @__PURE__ */ (0, L.jsx)(Ys, {
				item: t.items[o],
				fit: e.fit
			}),
			t.showArrows && /* @__PURE__ */ (0, L.jsxs)(L.Fragment, { children: [/* @__PURE__ */ (0, L.jsx)(Zs, {
				label: "Previous image",
				side: "left",
				disabled: !!i,
				onClick: () => c(Qs(s, -1, t.items.length, t.loop), -1),
				children: "‹"
			}), /* @__PURE__ */ (0, L.jsx)(Zs, {
				label: "Next image",
				side: "right",
				disabled: !!i,
				onClick: () => c(Qs(s, 1, t.items.length, t.loop), 1),
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
function Js({ item: e, fit: t, gallery: n, direction: r, incoming: i, running: a, onTransitionEnd: o }) {
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
		children: /* @__PURE__ */ (0, L.jsx)(Ys, {
			item: e,
			fit: t
		})
	});
}
function Ys({ item: e, fit: t }) {
	let n = Oo(e.src);
	return n ? /* @__PURE__ */ (0, L.jsx)("img", {
		src: n,
		alt: e.alt ?? "",
		draggable: !1,
		decoding: "async",
		style: { objectFit: t }
	}) : null;
}
function Xs({ src: e }) {
	let t = Oo(e);
	return t ? /* @__PURE__ */ (0, L.jsx)("link", {
		rel: "preload",
		as: "image",
		href: t
	}) : null;
}
function Zs({ label: e, side: t, disabled: n, onClick: r, children: i }) {
	return /* @__PURE__ */ (0, L.jsx)("button", {
		type: "button",
		"aria-label": e,
		disabled: n,
		onClick: r,
		className: `amp-runtime-carousel-arrow ${t}`,
		children: i
	});
}
function Qs(e, t, n, r) {
	return r ? (e + t + n) % n : Math.max(0, Math.min(n - 1, e + t));
}
//#endregion
//#region src/runtime/model3d/model-load-queue.ts
var $s = 2, ec = 0, tc = [];
function nc(e, t) {
	let n = {
		key: e,
		start: t
	};
	return ec < $s ? ic(n) : tc.push(n), () => {
		let e = tc.indexOf(n);
		e >= 0 && tc.splice(e, 1);
	};
}
function rc() {
	for (; ec < $s && tc.length;) {
		let e = tc.shift();
		e && ic(e);
	}
}
function ic(e) {
	ec += 1;
	let t = !1, n = () => {
		t || (t = !0, ec = Math.max(0, ec - 1), rc());
	};
	try {
		e.start(n);
	} catch (e) {
		throw n(), e;
	}
}
//#endregion
//#region src/rendering/model-visibility.ts
function ac(e) {
	return e !== "visible";
}
function oc(e, t, n) {
	let r = t.left, i = t.top, a = t.right, o = t.bottom;
	for (let e of n) r = Math.max(r, e.left), i = Math.max(i, e.top), a = Math.min(a, e.right), o = Math.min(o, e.bottom);
	return a > r && o > i && e.right > r && e.left < a && e.bottom > i && e.top < o;
}
//#endregion
//#region src/rendering/use-model-silhouette-hover.ts
var sc = {
	author: ".amp-canvas-viewport",
	runtime: ".amp-runtime-root"
}, cc = /* @__PURE__ */ new WeakMap();
function lc(e, t, n, r, i) {
	let [a, o] = (0, I.useState)(!1), s = (0, I.useRef)(!1);
	return (0, I.useEffect)(() => {
		let a = e.current?.closest(sc[i]);
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
				let e = cc.get(n);
				if (!e) {
					let t = n.getContext("2d", { willReadFrequently: !0 });
					if (!t) {
						c(!1);
						return;
					}
					e = t, cc.set(n, e);
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
var uc = (0, I.lazy)(() => import("./RuntimeModel3DView-VugnG_gs.js"));
function dc({ node: e }) {
	let t = (0, I.useRef)(null), n = (0, I.useRef)(null), r = Oo(e.src), { visible: i, activated: a, resident: s } = pc(t), c = lc(t, n, e.behaviors.pauseOnHover, i, "runtime"), [l, u] = (0, I.useState)({
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
	return (0, I.useEffect)(() => (o(e.id, m), () => o(e.id, !1)), [e.id, m]), /* @__PURE__ */ (0, L.jsxs)("div", {
		ref: t,
		className: "amp-runtime-model",
		"data-amp-model-hovered": c || void 0,
		"data-amp-model-visible": String(i),
		"data-amp-model-resident": String(s),
		children: [
			/* @__PURE__ */ (0, L.jsx)("canvas", {
				ref: n,
				className: "amp-runtime-model-bitmap",
				"aria-label": e.name,
				role: "img",
				style: { visibility: i ? "visible" : "hidden" }
			}),
			!d.ready && /* @__PURE__ */ (0, L.jsx)("div", {
				className: "amp-runtime-asset-placeholder",
				children: d.error ? `3D model unavailable: ${d.error}` : a ? "Loading 3D model…" : "3D model loads near viewport"
			}),
			s && r && /* @__PURE__ */ (0, L.jsx)(fc, {
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
function fc(e) {
	let { node: t, src: n, onReady: r, onError: i } = e, [a, o] = (0, I.useState)(!1), s = (0, I.useRef)(null);
	(0, I.useEffect)(() => {
		let e = nc(`${t.id}:${n}`, (e) => {
			s.current = e, o(!0);
		});
		return () => {
			e(), s.current?.(), s.current = null;
		};
	}, [t.id, n]);
	let c = (0, I.useCallback)(() => {
		s.current?.(), s.current = null;
	}, []), l = (0, I.useCallback)(() => {
		r();
	}, [r]), u = (0, I.useCallback)((e) => {
		s.current?.(), s.current = null, i(e);
	}, [i]);
	return a ? /* @__PURE__ */ (0, L.jsx)(mc, {
		resetKey: e.src,
		onError: u,
		children: /* @__PURE__ */ (0, L.jsx)(I.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, L.jsx)(uc, {
				...e,
				onLoaded: c,
				onReady: l,
				onError: u
			})
		})
	}) : null;
}
function pc(e) {
	let t = typeof IntersectionObserver > "u", [n, r] = (0, I.useState)(t), [i, a] = (0, I.useState)(t), [o, s] = (0, I.useState)(t);
	return (0, I.useEffect)(() => {
		let t = e.current;
		if (!t || typeof IntersectionObserver > "u") return;
		let n = t.closest(".amp-runtime-root"), i = t.closest(".amp-runtime-section"), o = 0, c = 0, l = 0, u = () => {
			let e = [n, ac(i?.dataset.ampSectionOverflow) ? i : null].filter((e) => !!e).map((e) => e.getBoundingClientRect()), a = oc(t.getBoundingClientRect(), {
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
var mc = class extends I.Component {
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
function hc(e, t, n) {
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
			let l = a + (o - a) * r / s, u = i.map((e) => vc(e, l, n.alphaThreshold, t)).filter((e) => e !== null);
			c.push(u.length ? t === "left" ? Math.max(...u) : Math.min(...u) : t === "left" ? e.left : e.right);
		}
		let l = t === "left" ? Math.max(0, Math.min(e.right, Math.max(...c)) - e.left) : Math.max(0, e.right - Math.max(e.left, Math.min(...c)));
		if (l <= 0) return [];
		let u = Math.max(n.scale, .01), d = l / u, f = (o - a) / u, p = c.map((n, r) => {
			let i = f * r / s;
			return {
				x: xc(t === "left" ? Math.max(0, Math.min(d, (n - e.left) / u)) : Math.max(0, Math.min(d, (n - (e.right - l)) / u))),
				y: xc(i)
			};
		}), m = t === "left" ? [
			{
				x: 0,
				y: 0
			},
			...p,
			{
				x: 0,
				y: xc(f)
			}
		] : [
			{
				x: xc(d),
				y: 0
			},
			...p,
			{
				x: xc(d),
				y: xc(f)
			}
		];
		return [{
			id: `model-silhouette-${t}`,
			side: t,
			top: Math.max(0, a - e.top) / u,
			width: d,
			height: f,
			margin: n.margin,
			shapeOutside: _c(m),
			contour: m
		}];
	});
}
function gc(e, t) {
	return e.map((e) => ({
		id: `model-static-${e.side}`,
		side: e.side,
		top: e.top,
		width: e.width,
		height: e.height,
		margin: e.clearance ?? t,
		contour: e.contour,
		shapeOutside: _c(e.contour)
	}));
}
function _c(e) {
	return `polygon(${e.map((e) => `${xc(e.x)}px ${xc(e.y)}px`).join(", ")})`;
}
function vc(e, t, n, r) {
	let { rect: i } = e;
	if (t < i.top || t > i.bottom || i.width <= 0 || i.height <= 0) return null;
	if (!e.alpha || e.alphaWidth <= 0 || e.alphaHeight <= 0) return r === "left" ? i.right : i.left;
	if (e.projection && Math.abs(e.projection.rotation) > 1e-5) return yc(e, t, n, r);
	let a = Math.max(0, Math.min(e.alphaHeight - 1, Math.floor((t - i.top) / i.height * e.alphaHeight))), o = Math.round(Math.max(0, Math.min(1, n)) * 255);
	if (r === "left") {
		for (let t = e.alphaWidth - 1; t >= 0; --t) if (e.alpha[a * e.alphaWidth + t] > o) return i.left + (t + 1) / e.alphaWidth * i.width;
	} else for (let t = 0; t < e.alphaWidth; t += 1) if (e.alpha[a * e.alphaWidth + t] > o) return i.left + t / e.alphaWidth * i.width;
	return null;
}
function yc(e, t, n, r) {
	let i = e.projection, { rect: a } = e, o = Math.round(Math.max(0, Math.min(1, n)) * 255), s = Math.max(8, Math.min(192, Math.ceil(Math.max(e.alphaWidth, a.width)))), c = a.width / s;
	for (let n = 0; n < s; n += 1) {
		let s = r === "left" ? a.right - (n + .5) * c : a.left + (n + .5) * c;
		if (bc(e, i, s, t) > o) return r === "left" ? Math.min(a.right, s + c / 2) : Math.max(a.left, s - c / 2);
	}
	return null;
}
function bc(e, t, n, r) {
	let i = n - t.centerX, a = r - t.centerY, o = Math.cos(t.rotation), s = Math.sin(t.rotation), c = o * i + s * a, l = -s * i + o * a, u = c / t.width + .5, d = l / t.height + .5;
	if (u < 0 || u >= 1 || d < 0 || d >= 1) return 0;
	let f = Math.min(e.alphaWidth - 1, Math.floor(u * e.alphaWidth)), p = Math.min(e.alphaHeight - 1, Math.floor(d * e.alphaHeight));
	return e.alpha[p * e.alphaWidth + f] ?? 0;
}
function xc(e) {
	return Math.round(e * 100) / 100;
}
//#endregion
//#region src/rendering/use-live-model-text-wrap.ts
var Sc = {
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
}, Cc = /* @__PURE__ */ new WeakMap(), wc = /* @__PURE__ */ new WeakMap(), Tc = /* @__PURE__ */ new WeakMap();
function Ec(e, t, n) {
	let [r, i] = (0, I.useState)([]), a = t.runtimeWrap, o = a?.static?.enabled ?? !1, s = n === "runtime" && o, c = n === "author" && o, l = a?.static?.baked?.state !== "pending", u = (0, I.useMemo)(() => gc(a?.static?.spacers ?? [], a?.margin ?? 0), [a?.margin, a?.static?.spacers]);
	return (0, I.useLayoutEffect)(() => {
		let t = e.current;
		if (!t || !a?.enabled || s || c) {
			i((e) => e.length ? [] : e);
			return;
		}
		let r = Sc[n], o = t.closest(r.root) ?? document, l = t.closest(r.section) ?? o, u = a.targetNodeIds ?? [], d = () => u.length ? u.map((e) => o.querySelector(`[data-node-id="${jc(e)}"]`)).filter((e) => !!e && e?.dataset.ampTextWrap === "true") : Array.from(l.querySelectorAll(`${r.model}[data-amp-text-wrap="true"]`)), f = d(), p = 0, m = !1, h = /* @__PURE__ */ new WeakMap(), g = () => {
			p = 0;
			let e = t.getBoundingClientRect(), n = t.offsetWidth > 0 ? e.width / t.offsetWidth : 1;
			if (!Number.isFinite(n) || n <= 0) return;
			let r = (a.mode ?? "silhouette") === "silhouette", o = hc(e, f.map((e, t) => {
				let i = e.querySelector("canvas"), a = e.getBoundingClientRect(), o = Mc(e, a, n), s = r && i ? Dc(i) : null;
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
			i((e) => Ac(e, o) ? e : o);
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
			i - (Tc.get(t) ?? -Infinity) >= o && (Tc.set(t, i), Oc(t)), !(i - (h.get(t) ?? -Infinity) < o) && (h.set(t, i), _());
		}, ee = typeof MutationObserver > "u" ? null : new MutationObserver(y);
		return o instanceof Node && ee?.observe(o, {
			childList: !0,
			subtree: !0
		}), o.addEventListener("amp-model-frame", b), window.addEventListener("resize", _), window.addEventListener("scroll", _, !0), window.addEventListener("pageshow", _), document.addEventListener("visibilitychange", _), document.fonts?.ready.then(_), g(), () => {
			m = !0, v?.disconnect(), ee?.disconnect(), o.removeEventListener("amp-model-frame", b), window.removeEventListener("resize", _), window.removeEventListener("scroll", _, !0), window.removeEventListener("pageshow", _), document.removeEventListener("visibilitychange", _), p && cancelAnimationFrame(p);
		};
	}, [
		e,
		a,
		c,
		s,
		n
	]), !a?.enabled || c ? [] : s ? l ? u : [] : r;
}
function Dc(e) {
	return wc.get(e) ?? Oc(e);
}
function Oc(e) {
	let t = kc(e);
	return t?.alpha.some((e) => e > 0) ? (wc.set(e, t), t) : wc.get(e) ?? null;
}
function kc(e) {
	if (!e.width || !e.height) return null;
	let t = Cc.get(e);
	t || (t = document.createElement("canvas"), Cc.set(e, t));
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
function Ac(e, t) {
	return e.length === t.length && e.every((e, n) => {
		let r = t[n];
		return !!r && e.id === r.id && e.side === r.side && e.top === r.top && e.width === r.width && e.height === r.height && e.margin === r.margin && e.shapeOutside === r.shapeOutside;
	});
}
function jc(e) {
	return typeof CSS < "u" && CSS.escape ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function Mc(e, t, n) {
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
function Nc({ node: e }) {
	let t = (0, I.useRef)(null), n = Ec(t, e, "runtime"), r = e.typography;
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
			textIndent: r.indent,
			display: "flow-root"
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
		}, e.id)), /* @__PURE__ */ (0, L.jsx)(Pc, {
			content: e.content,
			paragraphSpacing: r.paragraphSpacing
		})]
	});
}
function Pc({ content: e, paragraphSpacing: t }) {
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
				children: i.runs.map(Fc)
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
				children: n.runs.map(Fc)
			}, r)), r += 1;
		}
		let c = {
			margin: 0,
			paddingLeft: 24
		};
		n.push(a === "ordered" ? /* @__PURE__ */ (0, L.jsx)("ol", {
			style: c,
			children: s
		}, o) : /* @__PURE__ */ (0, L.jsx)("ul", {
			style: c,
			children: s
		}, o));
	}
	return /* @__PURE__ */ (0, L.jsx)(L.Fragment, { children: n });
}
function Fc(e, t) {
	let n = e.marks ?? [], r = [n.includes("underline") ? "underline" : "", n.includes("strikethrough") ? "line-through" : ""].filter(Boolean).join(" "), i = {
		color: e.color,
		fontWeight: n.includes("bold") ? "bold" : void 0,
		fontStyle: n.includes("italic") ? "italic" : void 0,
		textDecoration: r || void 0
	}, a = n.includes("code") ? /* @__PURE__ */ (0, L.jsx)("span", {
		className: "amp-runtime-code",
		children: e.text
	}) : e.text, o = Ic(e.href);
	return o ? /* @__PURE__ */ (0, L.jsx)("a", {
		href: o,
		style: i,
		children: a
	}, t) : /* @__PURE__ */ (0, L.jsx)("span", {
		style: i,
		children: a
	}, t);
}
function Ic(e) {
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
function Lc({ node: e }) {
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
					children: /* @__PURE__ */ (0, L.jsx)(Pc, { content: t })
				}, r);
			})
		}, n)) })
	});
}
//#endregion
//#region src/runtime/nodes/RuntimeVideo.tsx
function Rc({ node: e }) {
	let t = Oo(e.src), n = Oo(e.poster), r = (0, I.useRef)(null), [i, a] = (0, I.useState)(!1), [o, s] = (0, I.useState)(!1), [c, l] = (0, I.useState)(0), [u, d] = (0, I.useState)(!1), f = e.lightbox ?? {
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
	}), o && (0, Bs.createPortal)(/* @__PURE__ */ (0, L.jsx)(zc, {
		node: e,
		src: t,
		poster: n,
		initialTime: c,
		onClose: m
	}), document.body)] });
}
function zc({ node: e, src: t, poster: n, initialTime: r, onClose: i }) {
	let a = (0, I.useRef)(null), [o, s] = (0, I.useState)(!0), c = (0, I.useCallback)(() => {
		let e = a.current;
		i(e?.currentTime ?? r, !!(e && !e.paused && !e.ended));
	}, [r, i]);
	return Hs(c), /* @__PURE__ */ (0, L.jsxs)("div", {
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
		}), /* @__PURE__ */ (0, L.jsx)(Vs, {
			label: "Close video",
			onClose: c
		})]
	});
}
//#endregion
//#region src/runtime/RuntimeNode.tsx
var Bc = (0, I.memo)(function({ node: e, layerIndex: t }) {
	let n = Fs(e.layout, e.style);
	return n.zIndex = Mo + (e.layout.zIndex ?? -t), (e.type === "video" || e.type === "model3d") && (n.background = "transparent"), /* @__PURE__ */ (0, L.jsx)("div", {
		className: `amp-runtime-node amp-runtime-node-${e.type}`,
		"data-node-id": e.id,
		"data-amp-text-wrap": e.type === "model3d" ? String(e.textWrap.enabled) : void 0,
		style: n,
		children: /* @__PURE__ */ (0, L.jsx)(Vc, { node: e })
	});
});
function Vc({ node: e }) {
	switch (e.type) {
		case "text": return /* @__PURE__ */ (0, L.jsx)(Nc, { node: e });
		case "image": return /* @__PURE__ */ (0, L.jsx)(Us, { node: e });
		case "video": return /* @__PURE__ */ (0, L.jsx)(Rc, { node: e });
		case "model3d": return /* @__PURE__ */ (0, L.jsx)(dc, { node: e });
		case "audio": return /* @__PURE__ */ (0, L.jsx)(Ls, { node: e });
		case "divider": return /* @__PURE__ */ (0, L.jsx)(zs, { node: e });
		case "spacer": return /* @__PURE__ */ (0, L.jsx)("div", {
			className: "amp-runtime-spacer",
			"aria-hidden": !0
		});
		case "table": return /* @__PURE__ */ (0, L.jsx)(Lc, { node: e });
		case "container": return /* @__PURE__ */ (0, L.jsx)(L.Fragment, { children: e.children.map((e, t) => /* @__PURE__ */ (0, L.jsx)(Bc, {
			node: e,
			layerIndex: t
		}, e.id)) });
	}
}
//#endregion
//#region src/runtime/scrollbar-mode.ts
var Hc = 0, Uc = 0;
function Wc(e) {
	Hc += 1, e && (Uc += 1), Gc();
	let t = !1;
	return () => {
		t || (t = !0, Hc = Math.max(0, Hc - 1), e && (Uc = Math.max(0, Uc - 1)), Gc());
	};
}
function Gc() {
	if (typeof document > "u") return;
	let e = document.documentElement;
	e.classList.toggle("amp-runtime-scrollbars-hidden", Hc > 0 && Uc === 0), e.classList.toggle("amp-runtime-scrollbars-legacy", Uc > 0);
}
//#endregion
//#region src/runtime/RuntimeDocument.tsx
var Kc = (0, I.lazy)(() => import("./RuntimeModel3DStage-Bb0e_Ul5.js"));
function qc({ document: e, className: t, style: n, ariaLabel: r }) {
	let i = (0, I.useRef)(null), a = (0, I.useRef)(null), o = (0, I.useMemo)(() => e.sections.reduce((e, t) => e + (typeof t.height == "number" ? t.height : jo), 0), [e.sections]), [s, c] = (0, I.useState)({
		scale: 1,
		height: o
	}), l = (0, I.useMemo)(() => Qc(e), [e]), u = e.presentation?.legacyMode.enabled ?? !1;
	return (0, I.useEffect)(() => Wc(u), [u]), (0, I.useLayoutEffect)(() => {
		let e = i.current, t = a.current;
		if (!e || !t) return;
		let n = 0, r = () => {
			n = 0;
			let r = (e.clientWidth || 1080) / jo, i = Math.max(o, t.scrollHeight);
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
			/* @__PURE__ */ (0, L.jsx)(Yc, { document: e }),
			/* @__PURE__ */ (0, L.jsx)("div", {
				ref: a,
				className: "amp-runtime-stage",
				style: {
					width: jo,
					transform: `scale(${s.scale})`
				},
				children: e.sections.map((e) => /* @__PURE__ */ (0, L.jsx)(Jc, { section: e }, e.id))
			}),
			l && /* @__PURE__ */ (0, L.jsx)(I.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, L.jsx)(Kc, {})
			}),
			/* @__PURE__ */ (0, L.jsx)(Xc, { document: e })
		]
	});
}
function Jc({ section: e }) {
	let t = Oo(e.background?.image), n = e.overflow ?? "hidden";
	return /* @__PURE__ */ (0, L.jsx)("section", {
		className: "amp-runtime-section",
		"data-section-id": e.id,
		"data-amp-section-overflow": n,
		"aria-label": e.name,
		style: {
			minHeight: typeof e.height == "number" ? e.height : jo,
			backgroundColor: e.background?.color,
			backgroundImage: t ? `url(${JSON.stringify(t)})` : void 0,
			overflow: n,
			isolation: n === "hidden" ? "isolate" : "auto"
		},
		children: e.nodes.map((e, t) => /* @__PURE__ */ (0, L.jsx)(Bc, {
			node: e,
			layerIndex: t
		}, e.id))
	});
}
function Yc({ document: e }) {
	let { resolveAsset: t } = ko(), n = (e.fonts ?? []).map((e) => {
		let n = t(e.src);
		return `@font-face{font-family:${JSON.stringify(e.family)};src:url(${JSON.stringify(n)});font-weight:${e.weight ?? "normal"};font-style:${e.style ?? "normal"};font-display:swap}`;
	});
	return n.length ? /* @__PURE__ */ (0, L.jsx)("style", { children: n.join("\n") }) : null;
}
function Xc({ document: e }) {
	let t = e.presentation?.legacyMode;
	return !t?.enabled || !t.pixelation.enabled ? null : /* @__PURE__ */ (0, L.jsx)(Zc, { settings: t.pixelation }, e.metadata.id);
}
function Zc({ settings: e }) {
	let t = (0, I.useRef)(null);
	return (0, I.useEffect)(() => {
		let n = t.current;
		if (!n) return;
		let r, i = requestAnimationFrame(() => {
			import("./mosaic-reveal-DK-G2CBn.js").then(({ runMosaicReveal: t }) => {
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
function Qc(e) {
	let t = !1, n = (e) => e.forEach((e) => {
		e.type === "model3d" ? t = !0 : e.type === "container" && n(e.children);
	});
	return e.sections.forEach((e) => n(e.nodes)), t;
}
//#endregion
//#region src/runtime/AMPReader.tsx
function $c({ document: e, src: t, assetBaseUrl: n, resolveAsset: r, className: i, style: a, loadingFallback: o, errorFallback: s, onLoad: c, onError: l, ariaLabel: u }) {
	let [d, f] = (0, I.useState)({}), p = e === void 0 && t === void 0 ? /* @__PURE__ */ Error("AMPReader requires either a document or src.") : void 0;
	(0, I.useEffect)(() => {
		if (e === void 0 && t === void 0) return;
		let n = new AbortController();
		return js(e ?? t, { signal: n.signal }).then((e) => {
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
	let m = (0, I.useMemo)(() => r || Ns(n ?? d.loaded?.inferredAssetBaseUrl ?? globalThis.location?.href ?? "/"), [
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
	let g = d.loaded.document.presentation ?? Eo();
	return /* @__PURE__ */ (0, L.jsx)(Do.Provider, {
		value: {
			resolveAsset: m,
			legacyMode: g.legacyMode
		},
		children: /* @__PURE__ */ (0, L.jsx)(qc, {
			document: d.loaded.document,
			className: i,
			style: a,
			ariaLabel: u
		})
	});
}
//#endregion
//#region node_modules/react-dom/cjs/react-dom-client.production.js
var el = /* @__PURE__ */ e(((e) => {
	var t = i(), n = r(), o = a();
	function s(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function c(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function l(e) {
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
	function u(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function d(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function f(e) {
		if (l(e) !== e) throw Error(s(188));
	}
	function p(e) {
		var t = e.alternate;
		if (!t) {
			if (t = l(e), t === null) throw Error(s(188));
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
					if (a === n) return f(i), e;
					if (a === r) return f(i), t;
					a = a.sibling;
				}
				throw Error(s(188));
			}
			if (n.return !== r.return) n = i, r = a;
			else {
				for (var o = !1, c = i.child; c;) {
					if (c === n) {
						o = !0, n = i, r = a;
						break;
					}
					if (c === r) {
						o = !0, r = i, n = a;
						break;
					}
					c = c.sibling;
				}
				if (!o) {
					for (c = a.child; c;) {
						if (c === n) {
							o = !0, n = a, r = i;
							break;
						}
						if (c === r) {
							o = !0, r = a, n = i;
							break;
						}
						c = c.sibling;
					}
					if (!o) throw Error(s(189));
				}
			}
			if (n.alternate !== r) throw Error(s(190));
		}
		if (n.tag !== 3) throw Error(s(188));
		return n.stateNode.current === n ? e : t;
	}
	function m(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = m(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), ee = Symbol.for("react.profiler"), te = Symbol.for("react.consumer"), ne = Symbol.for("react.context"), re = Symbol.for("react.forward_ref"), ie = Symbol.for("react.suspense"), ae = Symbol.for("react.suspense_list"), oe = Symbol.for("react.memo"), se = Symbol.for("react.lazy"), ce = Symbol.for("react.activity"), x = Symbol.for("react.memo_cache_sentinel"), le = Symbol.iterator;
	function ue(e) {
		return typeof e != "object" || !e ? null : (e = le && e[le] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var S = Symbol.for("react.client.reference");
	function de(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === S ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case ee: return "Profiler";
			case b: return "StrictMode";
			case ie: return "Suspense";
			case ae: return "SuspenseList";
			case ce: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case ne: return e.displayName || "Context";
			case te: return (e._context.displayName || "Context") + ".Consumer";
			case re:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case oe: return t = e.displayName || null, t === null ? de(e.type) || "Memo" : t;
			case se:
				t = e._payload, e = e._init;
				try {
					return de(e(t));
				} catch {}
		}
		return null;
	}
	var fe = Array.isArray, C = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, w = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, pe = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, me = [], he = -1;
	function ge(e) {
		return { current: e };
	}
	function _e(e) {
		0 > he || (e.current = me[he], me[he] = null, he--);
	}
	function ve(e, t) {
		he++, me[he] = e.current, e.current = t;
	}
	var ye = ge(null), be = ge(null), xe = ge(null), Se = ge(null);
	function Ce(e, t) {
		switch (ve(xe, t), ve(be, e), ve(ye, null), t.nodeType) {
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
		_e(ye), ve(ye, e);
	}
	function we() {
		_e(ye), _e(be), _e(xe);
	}
	function Te(e) {
		e.memoizedState !== null && ve(Se, e);
		var t = ye.current, n = tf(t, e.type);
		t !== n && (ve(be, e), ve(ye, n));
	}
	function T(e) {
		be.current === e && (_e(ye), _e(be)), Se.current === e && (_e(Se), lp._currentValue = pe);
	}
	var Ee, De;
	function Oe(e) {
		if (Ee === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Ee = t && t[1] || "", De = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Ee + e + De;
	}
	var ke = !1;
	function Ae(e, t) {
		if (!e || ke) return "";
		ke = !0;
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
			ke = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Oe(n) : "";
	}
	function je(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Oe(e.type);
			case 16: return Oe("Lazy");
			case 13: return e.child !== t && t !== null ? Oe("Suspense Fallback") : Oe("Suspense");
			case 19: return Oe("SuspenseList");
			case 0:
			case 15: return Ae(e.type, !1);
			case 11: return Ae(e.type.render, !1);
			case 1: return Ae(e.type, !0);
			case 31: return Oe("Activity");
			default: return "";
		}
	}
	function Me(e) {
		try {
			var t = "", n = null;
			do
				t += je(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Ne = Object.prototype.hasOwnProperty, Pe = t.unstable_scheduleCallback, Fe = t.unstable_cancelCallback, Ie = t.unstable_shouldYield, Le = t.unstable_requestPaint, Re = t.unstable_now, ze = t.unstable_getCurrentPriorityLevel, Be = t.unstable_ImmediatePriority, Ve = t.unstable_UserBlockingPriority, He = t.unstable_NormalPriority, Ue = t.unstable_LowPriority, We = t.unstable_IdlePriority, Ge = t.log, Ke = t.unstable_setDisableYieldValue, qe = null, Je = null;
	function Ye(e) {
		if (typeof Ge == "function" && Ke(e), Je && typeof Je.setStrictMode == "function") try {
			Je.setStrictMode(qe, e);
		} catch {}
	}
	var Xe = Math.clz32 ? Math.clz32 : $e, Ze = Math.log, Qe = Math.LN2;
	function $e(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ze(e) / Qe | 0) | 0;
	}
	var et = 256, tt = 262144, nt = 4194304;
	function rt(e) {
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
	function it(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = rt(n))) : i = rt(o) : i = rt(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = rt(n))) : i = rt(o)) : i = rt(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function at(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function ot(e, t) {
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
	function st() {
		var e = nt;
		return nt <<= 1, !(nt & 62914560) && (nt = 4194304), e;
	}
	function ct(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function lt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function ut(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Xe(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && dt(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function dt(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Xe(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function ft(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Xe(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function pt(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : mt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function mt(e) {
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
	function ht(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function gt() {
		var e = w.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Tp(e.type)) : e;
	}
	function _t(e, t) {
		var n = w.p;
		try {
			return w.p = e, t();
		} finally {
			w.p = n;
		}
	}
	var vt = Math.random().toString(36).slice(2), yt = "__reactFiber$" + vt, bt = "__reactProps$" + vt, xt = "__reactContainer$" + vt, St = "__reactEvents$" + vt, Ct = "__reactListeners$" + vt, wt = "__reactHandles$" + vt, Tt = "__reactResources$" + vt, Et = "__reactMarker$" + vt;
	function Dt(e) {
		delete e[yt], delete e[bt], delete e[St], delete e[Ct], delete e[wt];
	}
	function Ot(e) {
		var t = e[yt];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[xt] || n[yt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = wf(e); e !== null;) {
					if (n = e[yt]) return n;
					e = wf(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function kt(e) {
		if (e = e[yt] || e[xt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function At(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(s(33));
	}
	function jt(e) {
		var t = e[Tt];
		return t ||= e[Tt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Mt(e) {
		e[Et] = !0;
	}
	var Nt = /* @__PURE__ */ new Set(), Pt = {};
	function Ft(e, t) {
		It(e, t), It(e + "Capture", t);
	}
	function It(e, t) {
		for (Pt[e] = t, e = 0; e < t.length; e++) Nt.add(t[e]);
	}
	var Lt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Rt = {}, zt = {};
	function Bt(e) {
		return Ne.call(zt, e) ? !0 : Ne.call(Rt, e) ? !1 : Lt.test(e) ? zt[e] = !0 : (Rt[e] = !0, !1);
	}
	function Vt(e, t, n) {
		if (Bt(t)) if (n === null) e.removeAttribute(t);
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
	function Ht(e, t, n) {
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
	function Ut(e, t, n, r) {
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
	function Wt(e) {
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
	function Gt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Kt(e, t, n) {
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
	function qt(e) {
		if (!e._valueTracker) {
			var t = Gt(e) ? "checked" : "value";
			e._valueTracker = Kt(e, t, "" + e[t]);
		}
	}
	function Jt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Gt(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Yt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Xt = /[\n"\\]/g;
	function Zt(e) {
		return e.replace(Xt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Qt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Wt(t)) : e.value !== "" + Wt(t) && (e.value = "" + Wt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : en(e, o, Wt(n)) : en(e, o, Wt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Wt(s) : e.removeAttribute("name");
	}
	function $t(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				qt(e);
				return;
			}
			n = n == null ? "" : "" + Wt(n), t = t == null ? n : "" + Wt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), qt(e);
	}
	function en(e, t, n) {
		t === "number" && Yt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function tn(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Wt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function nn(e, t, n) {
		if (t != null && (t = "" + Wt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Wt(n);
	}
	function rn(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(s(92));
				if (fe(r)) {
					if (1 < r.length) throw Error(s(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Wt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), qt(e);
	}
	function an(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var on = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function sn(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || on.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function cn(e, t, n) {
		if (t != null && typeof t != "object") throw Error(s(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var i in t) r = t[i], t.hasOwnProperty(i) && n[i] !== r && sn(e, i, r);
		} else for (var a in t) t.hasOwnProperty(a) && sn(e, a, t[a]);
	}
	function ln(e) {
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
	var un = /* @__PURE__ */ new Map([
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
	]), dn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function fn(e) {
		return dn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function pn() {}
	var mn = null;
	function hn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var gn = null, _n = null;
	function vn(e) {
		var t = kt(e);
		if (t && (e = t.stateNode)) {
			var n = e[bt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Qt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Zt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var i = r[bt] || null;
								if (!i) throw Error(s(90));
								Qt(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Jt(r);
					}
					break a;
				case "textarea":
					nn(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && tn(e, !!n.multiple, t, !1);
			}
		}
	}
	var yn = !1;
	function bn(e, t, n) {
		if (yn) return e(t, n);
		yn = !0;
		try {
			return e(t);
		} finally {
			if (yn = !1, (gn !== null || _n !== null) && (ju(), gn && (t = gn, e = _n, _n = gn = null, vn(t), e))) for (t = 0; t < e.length; t++) vn(e[t]);
		}
	}
	function xn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[bt] || null;
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
		if (n && typeof n != "function") throw Error(s(231, t, typeof n));
		return n;
	}
	var Sn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), Cn = !1;
	if (Sn) try {
		var wn = {};
		Object.defineProperty(wn, "passive", { get: function() {
			Cn = !0;
		} }), window.addEventListener("test", wn, wn), window.removeEventListener("test", wn, wn);
	} catch {
		Cn = !1;
	}
	var Tn = null, En = null, Dn = null;
	function On() {
		if (Dn) return Dn;
		var e, t = En, n = t.length, r, i = "value" in Tn ? Tn.value : Tn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return Dn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function kn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function An() {
		return !0;
	}
	function jn() {
		return !1;
	}
	function Mn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? An : jn, this.isPropagationStopped = jn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = An);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = An);
			},
			persist: function() {},
			isPersistent: An
		}), t;
	}
	var Nn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Pn = Mn(Nn), Fn = h({}, Nn, {
		view: 0,
		detail: 0
	}), In = Mn(Fn), Ln, Rn, zn, Bn = h({}, Fn, {
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
		getModifierState: Zn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== zn && (zn && e.type === "mousemove" ? (Ln = e.screenX - zn.screenX, Rn = e.screenY - zn.screenY) : Rn = Ln = 0, zn = e), Ln);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Rn;
		}
	}), Vn = Mn(Bn), Hn = Mn(h({}, Bn, { dataTransfer: 0 })), Un = Mn(h({}, Fn, { relatedTarget: 0 })), Wn = Mn(h({}, Nn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Gn = Mn(h({}, Nn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Kn = Mn(h({}, Nn, { data: 0 })), qn = {
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
	}, Jn = {
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
	}, Yn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Xn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Yn[e]) ? !!t[e] : !1;
	}
	function Zn() {
		return Xn;
	}
	var Qn = Mn(h({}, Fn, {
		key: function(e) {
			if (e.key) {
				var t = qn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = kn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Jn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Zn,
		charCode: function(e) {
			return e.type === "keypress" ? kn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? kn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), $n = Mn(h({}, Bn, {
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
	})), er = Mn(h({}, Fn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Zn
	})), tr = Mn(h({}, Nn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), nr = Mn(h({}, Bn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), rr = Mn(h({}, Nn, {
		newState: 0,
		oldState: 0
	})), ir = [
		9,
		13,
		27,
		32
	], ar = Sn && "CompositionEvent" in window, or = null;
	Sn && "documentMode" in document && (or = document.documentMode);
	var sr = Sn && "TextEvent" in window && !or, cr = Sn && (!ar || or && 8 < or && 11 >= or), lr = " ", ur = !1;
	function dr(e, t) {
		switch (e) {
			case "keyup": return ir.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function fr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var pr = !1;
	function mr(e, t) {
		switch (e) {
			case "compositionend": return fr(t);
			case "keypress": return t.which === 32 ? (ur = !0, lr) : null;
			case "textInput": return e = t.data, e === lr && ur ? null : e;
			default: return null;
		}
	}
	function hr(e, t) {
		if (pr) return e === "compositionend" || !ar && dr(e, t) ? (e = On(), Dn = En = Tn = null, pr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return cr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var gr = {
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
	function _r(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!gr[e.type] : t === "textarea";
	}
	function vr(e, t, n, r) {
		gn ? _n ? _n.push(r) : _n = [r] : gn = r, t = Rd(t, "onChange"), 0 < t.length && (n = new Pn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var yr = null, br = null;
	function xr(e) {
		jd(e, 0);
	}
	function Sr(e) {
		if (Jt(At(e))) return e;
	}
	function Cr(e, t) {
		if (e === "change") return t;
	}
	var wr = !1;
	if (Sn) {
		var Tr;
		if (Sn) {
			var Er = "oninput" in document;
			if (!Er) {
				var Dr = document.createElement("div");
				Dr.setAttribute("oninput", "return;"), Er = typeof Dr.oninput == "function";
			}
			Tr = Er;
		} else Tr = !1;
		wr = Tr && (!document.documentMode || 9 < document.documentMode);
	}
	function Or() {
		yr && (yr.detachEvent("onpropertychange", kr), br = yr = null);
	}
	function kr(e) {
		if (e.propertyName === "value" && Sr(br)) {
			var t = [];
			vr(t, br, e, hn(e)), bn(xr, t);
		}
	}
	function Ar(e, t, n) {
		e === "focusin" ? (Or(), yr = t, br = n, yr.attachEvent("onpropertychange", kr)) : e === "focusout" && Or();
	}
	function jr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Sr(br);
	}
	function Mr(e, t) {
		if (e === "click") return Sr(t);
	}
	function Nr(e, t) {
		if (e === "input" || e === "change") return Sr(t);
	}
	function Pr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Fr = typeof Object.is == "function" ? Object.is : Pr;
	function Ir(e, t) {
		if (Fr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Ne.call(t, i) || !Fr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Lr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Rr(e, t) {
		var n = Lr(e);
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
			n = Lr(n);
		}
	}
	function zr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? zr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Br(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Yt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Yt(e.document);
		}
		return t;
	}
	function Vr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Hr = Sn && "documentMode" in document && 11 >= document.documentMode, Ur = null, Wr = null, Gr = null, Kr = !1;
	function qr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Kr || Ur == null || Ur !== Yt(r) || (r = Ur, "selectionStart" in r && Vr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Gr && Ir(Gr, r) || (Gr = r, r = Rd(Wr, "onSelect"), 0 < r.length && (t = new Pn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Ur)));
	}
	function Jr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Yr = {
		animationend: Jr("Animation", "AnimationEnd"),
		animationiteration: Jr("Animation", "AnimationIteration"),
		animationstart: Jr("Animation", "AnimationStart"),
		transitionrun: Jr("Transition", "TransitionRun"),
		transitionstart: Jr("Transition", "TransitionStart"),
		transitioncancel: Jr("Transition", "TransitionCancel"),
		transitionend: Jr("Transition", "TransitionEnd")
	}, Xr = {}, Zr = {};
	Sn && (Zr = document.createElement("div").style, "AnimationEvent" in window || (delete Yr.animationend.animation, delete Yr.animationiteration.animation, delete Yr.animationstart.animation), "TransitionEvent" in window || delete Yr.transitionend.transition);
	function Qr(e) {
		if (Xr[e]) return Xr[e];
		if (!Yr[e]) return e;
		var t = Yr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Zr) return Xr[e] = t[n];
		return e;
	}
	var $r = Qr("animationend"), ei = Qr("animationiteration"), ti = Qr("animationstart"), ni = Qr("transitionrun"), ri = Qr("transitionstart"), ii = Qr("transitioncancel"), ai = Qr("transitionend"), oi = /* @__PURE__ */ new Map(), si = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	si.push("scrollEnd");
	function ci(e, t) {
		oi.set(e, t), Ft(t, [e]);
	}
	var li = typeof reportError == "function" ? reportError : function(e) {
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
	}, ui = [], di = 0, fi = 0;
	function pi() {
		for (var e = di, t = fi = di = 0; t < e;) {
			var n = ui[t];
			ui[t++] = null;
			var r = ui[t];
			ui[t++] = null;
			var i = ui[t];
			ui[t++] = null;
			var a = ui[t];
			if (ui[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && _i(n, i, a);
		}
	}
	function mi(e, t, n, r) {
		ui[di++] = e, ui[di++] = t, ui[di++] = n, ui[di++] = r, fi |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function hi(e, t, n, r) {
		return mi(e, t, n, r), vi(e);
	}
	function gi(e, t) {
		return mi(e, null, null, t), vi(e);
	}
	function _i(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Xe(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function vi(e) {
		if (50 < Su) throw Su = 0, Cu = null, Error(s(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var yi = {};
	function bi(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function xi(e, t, n, r) {
		return new bi(e, t, n, r);
	}
	function Si(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Ci(e, t) {
		var n = e.alternate;
		return n === null ? (n = xi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function wi(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Ti(e, t, n, r, i, a) {
		var o = 0;
		if (r = e, typeof e == "function") Si(e) && (o = 1);
		else if (typeof e == "string") o = ep(e, n, ye.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case ce: return e = xi(31, n, t, i), e.elementType = ce, e.lanes = a, e;
			case y: return Ei(n.children, i, a, t);
			case b:
				o = 8, i |= 24;
				break;
			case ee: return e = xi(12, n, t, i | 2), e.elementType = ee, e.lanes = a, e;
			case ie: return e = xi(13, n, t, i), e.elementType = ie, e.lanes = a, e;
			case ae: return e = xi(19, n, t, i), e.elementType = ae, e.lanes = a, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case ne:
						o = 10;
						break a;
					case te:
						o = 9;
						break a;
					case re:
						o = 11;
						break a;
					case oe:
						o = 14;
						break a;
					case se:
						o = 16, r = null;
						break a;
				}
				o = 29, n = Error(s(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = xi(o, n, t, i), t.elementType = e, t.type = r, t.lanes = a, t;
	}
	function Ei(e, t, n, r) {
		return e = xi(7, e, r, t), e.lanes = n, e;
	}
	function Di(e, t, n) {
		return e = xi(6, e, null, t), e.lanes = n, e;
	}
	function Oi(e) {
		var t = xi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function ki(e, t, n) {
		return t = xi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Ai = /* @__PURE__ */ new WeakMap();
	function ji(e, t) {
		if (typeof e == "object" && e) {
			var n = Ai.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Me(t)
			}, Ai.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Me(t)
		};
	}
	var Mi = [], Ni = 0, Pi = null, Fi = 0, Ii = [], Li = 0, Ri = null, zi = 1, Bi = "";
	function Vi(e, t) {
		Mi[Ni++] = Fi, Mi[Ni++] = Pi, Pi = e, Fi = t;
	}
	function Hi(e, t, n) {
		Ii[Li++] = zi, Ii[Li++] = Bi, Ii[Li++] = Ri, Ri = e;
		var r = zi;
		e = Bi;
		var i = 32 - Xe(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Xe(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, zi = 1 << 32 - Xe(t) + i | n << i | r, Bi = a + e;
		} else zi = 1 << a | n << i | r, Bi = e;
	}
	function Ui(e) {
		e.return !== null && (Vi(e, 1), Hi(e, 1, 0));
	}
	function Wi(e) {
		for (; e === Pi;) Pi = Mi[--Ni], Mi[Ni] = null, Fi = Mi[--Ni], Mi[Ni] = null;
		for (; e === Ri;) Ri = Ii[--Li], Ii[Li] = null, Bi = Ii[--Li], Ii[Li] = null, zi = Ii[--Li], Ii[Li] = null;
	}
	function Gi(e, t) {
		Ii[Li++] = zi, Ii[Li++] = Bi, Ii[Li++] = Ri, zi = t.id, Bi = t.overflow, Ri = e;
	}
	var Ki = null, qi = null, E = !1, Ji = null, Yi = !1, Xi = Error(s(519));
	function Zi(e) {
		throw ra(ji(Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Xi;
	}
	function Qi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[yt] = e, t[bt] = r, n) {
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
				B("invalid", t), $t(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				B("invalid", t);
				break;
			case "textarea": B("invalid", t), rn(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Wd(t.textContent, n) ? (r.popover != null && (B("beforetoggle", t), B("toggle", t)), r.onScroll != null && B("scroll", t), r.onScrollEnd != null && B("scrollend", t), r.onClick != null && (t.onclick = pn), t = !0) : t = !1, t || Zi(e, !0);
	}
	function $i(e) {
		for (Ki = e.return; Ki;) switch (Ki.tag) {
			case 5:
			case 31:
			case 13:
				Yi = !1;
				return;
			case 27:
			case 3:
				Yi = !0;
				return;
			default: Ki = Ki.return;
		}
	}
	function ea(e) {
		if (e !== Ki) return !1;
		if (!E) return $i(e), E = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || nf(e.type, e.memoizedProps)), n = !n), n && qi && Zi(e), $i(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(s(317));
			qi = Cf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(s(317));
			qi = Cf(e);
		} else t === 27 ? (t = qi, df(e.type) ? (e = Sf, Sf = null, qi = e) : qi = t) : qi = Ki ? xf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function ta() {
		qi = Ki = null, E = !1;
	}
	function na() {
		var e = Ji;
		return e !== null && (cu === null ? cu = e : cu.push.apply(cu, e), Ji = null), e;
	}
	function ra(e) {
		Ji === null ? Ji = [e] : Ji.push(e);
	}
	var ia = ge(null), aa = null, oa = null;
	function sa(e, t, n) {
		ve(ia, t._currentValue), t._currentValue = n;
	}
	function D(e) {
		e._currentValue = ia.current, _e(ia);
	}
	function ca(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function la(e, t, n, r) {
		var i = e.child;
		for (i !== null && (i.return = e); i !== null;) {
			var a = i.dependencies;
			if (a !== null) {
				var o = i.child;
				a = a.firstContext;
				a: for (; a !== null;) {
					var c = a;
					a = i;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						a.lanes |= n, c = a.alternate, c !== null && (c.lanes |= n), ca(a.return, n, e), r || (o = null);
						break a;
					}
					a = c.next;
				}
			} else if (i.tag === 18) {
				if (o = i.return, o === null) throw Error(s(341));
				o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), ca(o, n, e), o = null;
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
	function O(e, t, n, r) {
		e = null;
		for (var i = t, a = !1; i !== null;) {
			if (!a) {
				if (i.flags & 524288) a = !0;
				else if (i.flags & 262144) break;
			}
			if (i.tag === 10) {
				var o = i.alternate;
				if (o === null) throw Error(s(387));
				if (o = o.memoizedProps, o !== null) {
					var c = i.type;
					Fr(i.pendingProps.value, o.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (i === Se.current) {
				if (o = i.alternate, o === null) throw Error(s(387));
				o.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [lp] : e.push(lp));
			}
			i = i.return;
		}
		e !== null && la(t, e, n, r), t.flags |= 262144;
	}
	function ua(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Fr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function da(e) {
		aa = e, oa = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function fa(e) {
		return ma(aa, e);
	}
	function pa(e, t) {
		return aa === null && da(e), ma(e, t);
	}
	function ma(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, oa === null) {
			if (e === null) throw Error(s(308));
			oa = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else oa = oa.next = t;
		return n;
	}
	var ha = typeof AbortController < "u" ? AbortController : function() {
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
	}, ga = t.unstable_scheduleCallback, _a = t.unstable_NormalPriority, va = {
		$$typeof: ne,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function ya() {
		return {
			controller: new ha(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ba(e) {
		e.refCount--, e.refCount === 0 && ga(_a, function() {
			e.controller.abort();
		});
	}
	var xa = null, k = 0, A = 0, Sa = null;
	function Ca(e, t) {
		if (xa === null) {
			var n = xa = [];
			k = 0, A = Cd(), Sa = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return k++, t.then(wa, wa), t;
	}
	function wa() {
		if (--k === 0 && xa !== null) {
			Sa !== null && (Sa.status = "fulfilled");
			var e = xa;
			xa = null, A = 0, Sa = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function Ta(e, t) {
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
	var Ea = C.S;
	C.S = function(e, t) {
		du = Re(), typeof t == "object" && t && typeof t.then == "function" && Ca(e, t), Ea !== null && Ea(e, t);
	};
	var Da = ge(null);
	function Oa() {
		var e = Da.current;
		return e === null ? Jl.pooledCache : e;
	}
	function j(e, t) {
		t === null ? ve(Da, Da.current) : ve(Da, t.pool);
	}
	function ka() {
		var e = Oa();
		return e === null ? null : {
			parent: va._currentValue,
			pool: e
		};
	}
	var Aa = Error(s(460)), ja = Error(s(474)), M = Error(s(542)), Ma = { then: function() {} };
	function Na(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Pa(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(pn, pn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Ra(e), e;
			default:
				if (typeof t.status == "string") t.then(pn, pn);
				else {
					if (e = Jl, e !== null && 100 < e.shellSuspendCounter) throw Error(s(482));
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
					case "rejected": throw e = t.reason, Ra(e), e;
				}
				throw Ia = t, Aa;
		}
	}
	function Fa(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Ia = e, Aa) : e;
		}
	}
	var Ia = null;
	function La() {
		if (Ia === null) throw Error(s(459));
		var e = Ia;
		return Ia = null, e;
	}
	function Ra(e) {
		if (e === Aa || e === M) throw Error(s(483));
	}
	var za = null, Ba = 0;
	function N(e) {
		var t = Ba;
		return Ba += 1, za === null && (za = []), Pa(za, e, t);
	}
	function Va(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Ha(e, t) {
		throw t.$$typeof === g ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(s(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Ua(e) {
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
			return e = Ci(e, t), e.index = 0, e.sibling = null, e;
		}
		function a(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function o(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Di(n, e.mode, r), t.return = e, t) : (t = i(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var a = n.type;
			return a === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === a || typeof a == "object" && a && a.$$typeof === se && Fa(a) === t.type) ? (t = i(t, n.props), Va(t, n), t.return = e, t) : (t = Ti(n.type, n.key, n.props, null, e.mode, r), Va(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = ki(n, e.mode, r), t.return = e, t) : (t = i(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, a) {
			return t === null || t.tag !== 7 ? (t = Ei(n, e.mode, r, a), t.return = e, t) : (t = i(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Di("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = Ti(t.type, t.key, t.props, null, e.mode, n), Va(n, t), n.return = e, n;
					case v: return t = ki(t, e.mode, n), t.return = e, t;
					case se: return t = Fa(t), f(e, t, n);
				}
				if (fe(t) || ue(t)) return t = Ei(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, N(t), n);
				if (t.$$typeof === ne) return f(e, pa(e, t), n);
				Ha(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case se: return n = Fa(n), p(e, t, n, r);
				}
				if (fe(n) || ue(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, N(n), r);
				if (n.$$typeof === ne) return p(e, t, pa(e, n), r);
				Ha(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case se: return r = Fa(r), m(e, t, n, r, i);
				}
				if (fe(r) || ue(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, N(r), i);
				if (r.$$typeof === ne) return m(e, t, n, pa(t, r), i);
				Ha(t, r);
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
			if (h === s.length) return n(i, d), E && Vi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (o = a(d, o, h), u === null ? l = d : u.sibling = d, u = d);
				return E && Vi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), o = a(g, o, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), E && Vi(i, h), l;
		}
		function g(i, o, c, l) {
			if (c == null) throw Error(s(151));
			for (var u = null, d = null, h = o, g = o = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(i, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(i, h), o = a(y, o, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(i, h), E && Vi(i, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(i, v.value, l), v !== null && (o = a(v, o, g), d === null ? u = v : d.sibling = v, d = v);
				return E && Vi(i, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, i, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), o = a(v, o, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(i, e);
			}), E && Vi(i, g), u;
		}
		function b(e, r, a, c) {
			if (typeof a == "object" && a && a.type === y && a.key === null && (a = a.props.children), typeof a == "object" && a) {
				switch (a.$$typeof) {
					case _:
						a: {
							for (var l = a.key; r !== null;) {
								if (r.key === l) {
									if (l = a.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = i(r, a.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === se && Fa(l) === r.type) {
										n(e, r.sibling), c = i(r, a.props), Va(c, a), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							a.type === y ? (c = Ei(a.props.children, e.mode, c, a.key), c.return = e, e = c) : (c = Ti(a.type, a.key, a.props, null, e.mode, c), Va(c, a), c.return = e, e = c);
						}
						return o(e);
					case v:
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
							c = ki(a, e.mode, c), c.return = e, e = c;
						}
						return o(e);
					case se: return a = Fa(a), b(e, r, a, c);
				}
				if (fe(a)) return h(e, r, a, c);
				if (ue(a)) {
					if (l = ue(a), typeof l != "function") throw Error(s(150));
					return a = l.call(a), g(e, r, a, c);
				}
				if (typeof a.then == "function") return b(e, r, N(a), c);
				if (a.$$typeof === ne) return b(e, r, pa(e, a), c);
				Ha(e, a);
			}
			return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (a = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), c = i(r, a), c.return = e, e = c) : (n(e, r), c = Di(a, e.mode, c), c.return = e, e = c), o(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Ba = 0;
				var i = b(e, t, n, r);
				return za = null, i;
			} catch (t) {
				if (t === Aa || t === M) throw t;
				var a = xi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Wa = Ua(!0), Ga = Ua(!1), Ka = !1;
	function qa(e) {
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
	function Ja(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ya(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function P(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, ql & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = vi(e), _i(e, null, n), t;
		}
		return mi(e, r, t, n), vi(e);
	}
	function Xa(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ft(e, n);
		}
	}
	function Za(e, t) {
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
	var Qa = !1;
	function $a() {
		if (Qa) {
			var e = Sa;
			if (e !== null) throw e;
		}
	}
	function eo(e, t, n, r) {
		Qa = !1;
		var i = e.updateQueue;
		Ka = !1;
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
					f !== 0 && f === A && (Qa = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: Ka = !0;
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
	function to(e, t) {
		if (typeof e != "function") throw Error(s(191, e));
		e.call(t);
	}
	function no(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) to(n[e], t);
	}
	var ro = ge(null), io = ge(0);
	function ao(e, t) {
		e = tu, ve(io, e), ve(ro, t), tu = e | t.baseLanes;
	}
	function oo() {
		ve(io, tu), ve(ro, ro.current);
	}
	function so() {
		tu = io.current, _e(ro), _e(io);
	}
	var co = ge(null), lo = null;
	function uo(e) {
		var t = e.alternate;
		ve(go, go.current & 1), ve(co, e), lo === null && (t === null || ro.current !== null || t.memoizedState !== null) && (lo = e);
	}
	function fo(e) {
		ve(go, go.current), ve(co, e), lo === null && (lo = e);
	}
	function po(e) {
		e.tag === 22 ? (ve(go, go.current), ve(co, e), lo === null && (lo = e)) : mo(e);
	}
	function mo() {
		ve(go, go.current), ve(co, co.current);
	}
	function ho(e) {
		_e(co), lo === e && (lo = null), _e(go);
	}
	var go = ge(0);
	function _o(e) {
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
	var vo = 0, F = null, yo = null, bo = null, xo = !1, So = !1, I = !1, Co = 0, wo = 0, To = null, Eo = 0;
	function Do() {
		throw Error(s(321));
	}
	function Oo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Fr(e[n], t[n])) return !1;
		return !0;
	}
	function ko(e, t, n, r, i, a) {
		return vo = a, F = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, C.H = e === null || e.memoizedState === null ? Gs : Ks, I = !1, a = n(r, i), I = !1, So && (a = jo(t, n, r, i)), Ao(e), a;
	}
	function Ao(e) {
		C.H = Ws;
		var t = yo !== null && yo.next !== null;
		if (vo = 0, bo = yo = F = null, xo = !1, wo = 0, To = null, t) throw Error(s(300));
		e === null || lc || (e = e.dependencies, e !== null && ua(e) && (lc = !0));
	}
	function jo(e, t, n, r) {
		F = e;
		var i = 0;
		do {
			if (So && (To = null), wo = 0, So = !1, 25 <= i) throw Error(s(301));
			if (i += 1, bo = yo = null, e.updateQueue != null) {
				var a = e.updateQueue;
				a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0);
			}
			C.H = qs, a = t(n, r);
		} while (So);
		return a;
	}
	function Mo() {
		var e = C.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? zo(t) : t, e = e.useState()[0], (yo === null ? null : yo.memoizedState) !== e && (F.flags |= 1024), t;
	}
	function No() {
		var e = Co !== 0;
		return Co = 0, e;
	}
	function Po(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Fo(e) {
		if (xo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			xo = !1;
		}
		vo = 0, bo = yo = F = null, So = !1, wo = Co = 0, To = null;
	}
	function Io() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return bo === null ? F.memoizedState = bo = e : bo = bo.next = e, bo;
	}
	function Lo() {
		if (yo === null) {
			var e = F.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = yo.next;
		var t = bo === null ? F.memoizedState : bo.next;
		if (t !== null) bo = t, yo = e;
		else {
			if (e === null) throw F.alternate === null ? Error(s(467)) : Error(s(310));
			yo = e, e = {
				memoizedState: yo.memoizedState,
				baseState: yo.baseState,
				baseQueue: yo.baseQueue,
				queue: yo.queue,
				next: null
			}, bo === null ? F.memoizedState = bo = e : bo = bo.next = e;
		}
		return bo;
	}
	function Ro() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function zo(e) {
		var t = wo;
		return wo += 1, To === null && (To = []), e = Pa(To, e, t), t = F, (bo === null ? t.memoizedState : bo.next) === null && (t = t.alternate, C.H = t === null || t.memoizedState === null ? Gs : Ks), e;
	}
	function Bo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return zo(e);
			if (e.$$typeof === ne) return fa(e);
		}
		throw Error(s(438, String(e)));
	}
	function Vo(e) {
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
		}, n === null && (n = Ro(), F.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = x;
		return t.index++, n;
	}
	function Ho(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Uo(e) {
		return Wo(Lo(), yo, e);
	}
	function Wo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(s(311));
		r.lastRenderedReducer = n;
		var i = e.baseQueue, a = r.pending;
		if (a !== null) {
			if (i !== null) {
				var o = i.next;
				i.next = a.next, a.next = o;
			}
			t.baseQueue = i = a, r.pending = null;
		}
		if (a = e.baseState, i === null) e.memoizedState = a;
		else {
			t = i.next;
			var c = o = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (vo & f) === f : (Yl & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === A && (d = !0);
					else if ((vo & p) === p) {
						u = u.next, p === A && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, o = a) : l = l.next = f, F.lanes |= p, ru |= p;
					f = u.action, I && n(a, f), a = u.hasEagerState ? u.eagerState : n(a, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, o = a) : l = l.next = p, F.lanes |= f, ru |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? o = a : l.next = c, !Fr(a, e.memoizedState) && (lc = !0, d && (n = Sa, n !== null))) throw n;
			e.memoizedState = a, e.baseState = o, e.baseQueue = l, r.lastRenderedState = a;
		}
		return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Go(e) {
		var t = Lo(), n = t.queue;
		if (n === null) throw Error(s(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, i = n.pending, a = t.memoizedState;
		if (i !== null) {
			n.pending = null;
			var o = i = i.next;
			do
				a = e(a, o.action), o = o.next;
			while (o !== i);
			Fr(a, t.memoizedState) || (lc = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), n.lastRenderedState = a;
		}
		return [a, r];
	}
	function Ko(e, t, n) {
		var r = F, i = Lo(), a = E;
		if (a) {
			if (n === void 0) throw Error(s(407));
			n = n();
		} else n = t();
		var o = !Fr((yo || i).memoizedState, n);
		if (o && (i.memoizedState = n, lc = !0), i = i.queue, _s(Yo.bind(null, r, i, e), [e]), i.getSnapshot !== t || o || bo !== null && bo.memoizedState.tag & 1) {
			if (r.flags |= 2048, fs(9, { destroy: void 0 }, Jo.bind(null, r, i, n, t), null), Jl === null) throw Error(s(349));
			a || vo & 127 || qo(r, t, n);
		}
		return n;
	}
	function qo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = F.updateQueue, t === null ? (t = Ro(), F.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Jo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Xo(t) && Zo(e);
	}
	function Yo(e, t, n) {
		return n(function() {
			Xo(t) && Zo(e);
		});
	}
	function Xo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Fr(e, n);
		} catch {
			return !0;
		}
	}
	function Zo(e) {
		var t = gi(e, 2);
		t !== null && Eu(t, e, 2);
	}
	function Qo(e) {
		var t = Io();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), I) {
				Ye(!0);
				try {
					n();
				} finally {
					Ye(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ho,
			lastRenderedState: e
		}, t;
	}
	function $o(e, t, n, r) {
		return e.baseState = n, Wo(e, yo, typeof r == "function" ? r : Ho);
	}
	function es(e, t, n, r, i) {
		if (Vs(e)) throw Error(s(485));
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
			C.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, ts(t, a)) : (a.next = n.next, t.pending = n.next = a);
		}
	}
	function ts(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = C.T, o = {};
			C.T = o;
			try {
				var s = n(i, r), c = C.S;
				c !== null && c(o, s), ns(e, t, s);
			} catch (n) {
				is(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), C.T = a;
			}
		} else try {
			a = n(i, r), ns(e, t, a);
		} catch (n) {
			is(e, t, n);
		}
	}
	function ns(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			rs(e, t, n);
		}, function(n) {
			return is(e, t, n);
		}) : rs(e, t, n);
	}
	function rs(e, t, n) {
		t.status = "fulfilled", t.value = n, as(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, ts(e, n)));
	}
	function is(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, as(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function as(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function os(e, t) {
		return t;
	}
	function ss(e, t) {
		if (E) {
			var n = Jl.formState;
			if (n !== null) {
				a: {
					var r = F;
					if (E) {
						if (qi) {
							b: {
								for (var i = qi, a = Yi; i.nodeType !== 8;) {
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
								qi = xf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Zi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Io(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: os,
			lastRenderedState: t
		}, n.queue = r, n = Rs.bind(null, F, r), r.dispatch = n, r = Qo(!1), a = Bs.bind(null, F, !1, r.queue), r = Io(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = es.bind(null, F, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function cs(e) {
		return ls(Lo(), yo, e);
	}
	function ls(e, t, n) {
		if (t = Wo(e, t, os)[0], e = Uo(Ho)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = zo(t);
		} catch (e) {
			throw e === Aa ? M : e;
		}
		else r = t;
		t = Lo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (F.flags |= 2048, fs(9, { destroy: void 0 }, us.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function us(e, t) {
		e.action = t;
	}
	function ds(e) {
		var t = Lo(), n = yo;
		if (n !== null) return ls(t, n, e);
		Lo(), t = t.memoizedState, n = Lo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function fs(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = F.updateQueue, t === null && (t = Ro(), F.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function ps() {
		return Lo().memoizedState;
	}
	function ms(e, t, n, r) {
		var i = Io();
		F.flags |= e, i.memoizedState = fs(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function hs(e, t, n, r) {
		var i = Lo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		yo !== null && r !== null && Oo(r, yo.memoizedState.deps) ? i.memoizedState = fs(t, a, n, r) : (F.flags |= e, i.memoizedState = fs(1 | t, a, n, r));
	}
	function gs(e, t) {
		ms(8390656, 8, e, t);
	}
	function _s(e, t) {
		hs(2048, 8, e, t);
	}
	function vs(e) {
		F.flags |= 4;
		var t = F.updateQueue;
		if (t === null) t = Ro(), F.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function ys(e) {
		var t = Lo().memoizedState;
		return vs({
			ref: t,
			nextImpl: e
		}), function() {
			if (ql & 2) throw Error(s(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function bs(e, t) {
		return hs(4, 2, e, t);
	}
	function xs(e, t) {
		return hs(4, 4, e, t);
	}
	function Ss(e, t) {
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
	function Cs(e, t, n) {
		n = n == null ? null : n.concat([e]), hs(4, 4, Ss.bind(null, t, e), n);
	}
	function ws() {}
	function Ts(e, t) {
		var n = Lo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Oo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Es(e, t) {
		var n = Lo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Oo(t, r[1])) return r[0];
		if (r = e(), I) {
			Ye(!0);
			try {
				e();
			} finally {
				Ye(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Ds(e, t, n) {
		return n === void 0 || vo & 1073741824 && !(Yl & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Tu(), F.lanes |= e, ru |= e, n);
	}
	function Os(e, t, n, r) {
		return Fr(n, t) ? n : ro.current === null ? !(vo & 42) || vo & 1073741824 && !(Yl & 261930) ? (lc = !0, e.memoizedState = n) : (e = Tu(), F.lanes |= e, ru |= e, t) : (e = Ds(e, n, r), Fr(e, t) || (lc = !0), e);
	}
	function ks(e, t, n, r, i) {
		var a = w.p;
		w.p = a !== 0 && 8 > a ? a : 8;
		var o = C.T, s = {};
		C.T = s, Bs(e, !1, t, n);
		try {
			var c = i(), l = C.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? zs(e, t, Ta(c, r), wu(e)) : zs(e, t, r, wu(e));
		} catch (n) {
			zs(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, wu());
		} finally {
			w.p = a, o !== null && s.types !== null && (o.types = s.types), C.T = o;
		}
	}
	function As() {}
	function js(e, t, n, r) {
		if (e.tag !== 5) throw Error(s(476));
		var i = Ms(e).queue;
		ks(e, i, t, pe, n === null ? As : function() {
			return Ns(e), n(r);
		});
	}
	function Ms(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: pe,
			baseState: pe,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ho,
				lastRenderedState: pe
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
				lastRenderedReducer: Ho,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Ns(e) {
		var t = Ms(e);
		t.next === null && (t = e.alternate.memoizedState), zs(e, t.next.queue, {}, wu());
	}
	function Ps() {
		return fa(lp);
	}
	function Fs() {
		return Lo().memoizedState;
	}
	function Is() {
		return Lo().memoizedState;
	}
	function L(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = wu();
					e = Ya(n);
					var r = P(t, e, n);
					r !== null && (Eu(r, t, n), Xa(r, t, n)), t = { cache: ya() }, e.payload = t;
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
		}, Vs(e) ? Hs(t, n) : (n = hi(e, t, n, r), n !== null && (Eu(n, e, r), Us(n, t, r)));
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
				if (i.hasEagerState = !0, i.eagerState = s, Fr(s, o)) return mi(e, t, i, 0), Jl === null && pi(), !1;
			} catch {}
			if (n = hi(e, t, i, r), n !== null) return Eu(n, e, r), Us(n, t, r), !0;
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
			if (t) throw Error(s(479));
		} else t = hi(e, n, r, 2), t !== null && Eu(t, e, 2);
	}
	function Vs(e) {
		var t = e.alternate;
		return e === F || t !== null && t === F;
	}
	function Hs(e, t) {
		So = xo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Us(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ft(e, n);
		}
	}
	var Ws = {
		readContext: fa,
		use: Bo,
		useCallback: Do,
		useContext: Do,
		useEffect: Do,
		useImperativeHandle: Do,
		useLayoutEffect: Do,
		useInsertionEffect: Do,
		useMemo: Do,
		useReducer: Do,
		useRef: Do,
		useState: Do,
		useDebugValue: Do,
		useDeferredValue: Do,
		useTransition: Do,
		useSyncExternalStore: Do,
		useId: Do,
		useHostTransitionStatus: Do,
		useFormState: Do,
		useActionState: Do,
		useOptimistic: Do,
		useMemoCache: Do,
		useCacheRefresh: Do
	};
	Ws.useEffectEvent = Do;
	var Gs = {
		readContext: fa,
		use: Bo,
		useCallback: function(e, t) {
			return Io().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: fa,
		useEffect: gs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), ms(4194308, 4, Ss.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return ms(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			ms(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Io();
			t = t === void 0 ? null : t;
			var r = e();
			if (I) {
				Ye(!0);
				try {
					e();
				} finally {
					Ye(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Io();
			if (n !== void 0) {
				var i = n(t);
				if (I) {
					Ye(!0);
					try {
						n(t);
					} finally {
						Ye(!1);
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
			var t = Io();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Qo(e);
			var t = e.queue, n = Rs.bind(null, F, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: ws,
		useDeferredValue: function(e, t) {
			return Ds(Io(), e, t);
		},
		useTransition: function() {
			var e = Qo(!1);
			return e = ks.bind(null, F, e.queue, !0, !1), Io().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = F, i = Io();
			if (E) {
				if (n === void 0) throw Error(s(407));
				n = n();
			} else {
				if (n = t(), Jl === null) throw Error(s(349));
				Yl & 127 || qo(r, t, n);
			}
			i.memoizedState = n;
			var a = {
				value: n,
				getSnapshot: t
			};
			return i.queue = a, gs(Yo.bind(null, r, a, e), [e]), r.flags |= 2048, fs(9, { destroy: void 0 }, Jo.bind(null, r, a, n, t), null), n;
		},
		useId: function() {
			var e = Io(), t = Jl.identifierPrefix;
			if (E) {
				var n = Bi, r = zi;
				n = (r & ~(1 << 32 - Xe(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Co++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Eo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ps,
		useFormState: ss,
		useActionState: ss,
		useOptimistic: function(e) {
			var t = Io();
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
		useMemoCache: Vo,
		useCacheRefresh: function() {
			return Io().memoizedState = L.bind(null, F);
		},
		useEffectEvent: function(e) {
			var t = Io(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (ql & 2) throw Error(s(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Ks = {
		readContext: fa,
		use: Bo,
		useCallback: Ts,
		useContext: fa,
		useEffect: _s,
		useImperativeHandle: Cs,
		useInsertionEffect: bs,
		useLayoutEffect: xs,
		useMemo: Es,
		useReducer: Uo,
		useRef: ps,
		useState: function() {
			return Uo(Ho);
		},
		useDebugValue: ws,
		useDeferredValue: function(e, t) {
			return Os(Lo(), yo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Uo(Ho)[0], t = Lo().memoizedState;
			return [typeof e == "boolean" ? e : zo(e), t];
		},
		useSyncExternalStore: Ko,
		useId: Fs,
		useHostTransitionStatus: Ps,
		useFormState: cs,
		useActionState: cs,
		useOptimistic: function(e, t) {
			return $o(Lo(), yo, e, t);
		},
		useMemoCache: Vo,
		useCacheRefresh: Is
	};
	Ks.useEffectEvent = ys;
	var qs = {
		readContext: fa,
		use: Bo,
		useCallback: Ts,
		useContext: fa,
		useEffect: _s,
		useImperativeHandle: Cs,
		useInsertionEffect: bs,
		useLayoutEffect: xs,
		useMemo: Es,
		useReducer: Go,
		useRef: ps,
		useState: function() {
			return Go(Ho);
		},
		useDebugValue: ws,
		useDeferredValue: function(e, t) {
			var n = Lo();
			return yo === null ? Ds(n, e, t) : Os(n, yo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Go(Ho)[0], t = Lo().memoizedState;
			return [typeof e == "boolean" ? e : zo(e), t];
		},
		useSyncExternalStore: Ko,
		useId: Fs,
		useHostTransitionStatus: Ps,
		useFormState: ds,
		useActionState: ds,
		useOptimistic: function(e, t) {
			var n = Lo();
			return yo === null ? (n.baseState = e, [e, n.queue.dispatch]) : $o(n, yo, e, t);
		},
		useMemoCache: Vo,
		useCacheRefresh: Is
	};
	qs.useEffectEvent = ys;
	function Js(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Ys = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = wu(), i = Ya(r);
			i.payload = t, n != null && (i.callback = n), t = P(e, i, r), t !== null && (Eu(t, e, r), Xa(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = wu(), i = Ya(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = P(e, i, r), t !== null && (Eu(t, e, r), Xa(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = wu(), r = Ya(n);
			r.tag = 2, t != null && (r.callback = t), t = P(e, r, n), t !== null && (Eu(t, e, n), Xa(t, e, n));
		}
	};
	function Xs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Ir(n, r) || !Ir(i, a) : !0;
	}
	function Zs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ys.enqueueReplaceState(t, t.state, null);
	}
	function Qs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function $s(e) {
		li(e);
	}
	function ec(e) {
		console.error(e);
	}
	function tc(e) {
		li(e);
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
		return n = Ya(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			nc(e, t);
		}, n;
	}
	function ac(e) {
		return e = Ya(e), e.tag = 3, e;
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
			if (t = n.alternate, t !== null && O(t, n, i, !0), n = co.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return lo === null ? Ru() : n.alternate === null && nu === 0 && (nu = 3), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Ma ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), rd(e, r, i)), !1;
					case 22: return n.flags |= 65536, r === Ma ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), rd(e, r, i)), !1;
				}
				throw Error(s(435, n.tag));
			}
			return rd(e, r, i), Ru(), !1;
		}
		if (E) return t = co.current, t === null ? (r !== Xi && (t = Error(s(423), { cause: r }), ra(ji(t, n))), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = ji(r, n), i = ic(e.stateNode, r, i), Za(e, i), nu !== 4 && (nu = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== Xi && (e = Error(s(422), { cause: r }), ra(ji(e, n)))), !1;
		var a = Error(s(520), { cause: r });
		if (a = ji(a, n), z === null ? z = [a] : z.push(a), nu !== 4 && (nu = 2), t === null) return !0;
		r = ji(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = ic(n.stateNode, r, e), Za(n, e), !1;
				case 1: if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (mu === null || !mu.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = ac(i), oc(i, e, n, r), Za(n, i), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var cc = Error(s(461)), lc = !1;
	function uc(e, t, n, r) {
		t.child = e === null ? Ga(t, null, n, r) : Wa(t, e.child, n, r);
	}
	function dc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return da(t), r = ko(e, t, n, o, a, i), s = No(), e !== null && !lc ? (Po(e, t, i), Fc(e, t, i)) : (E && s && Ui(t), t.flags |= 1, uc(e, t, r, i), t.child);
	}
	function fc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Si(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, pc(e, t, a, r, i)) : (e = Ti(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Ic(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Ir : n, n(o, r) && e.ref === t.ref) return Fc(e, t, i);
		}
		return t.flags |= 1, e = Ci(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function pc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Ir(a, r) && e.ref === t.ref) if (lc = !1, t.pendingProps = r = a, Ic(e, i)) e.flags & 131072 && (lc = !0);
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
			}, e !== null && j(t, a === null ? null : a.cachePool), a === null ? oo() : ao(t, a), po(t);
			else return r = t.lanes = 536870912, gc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && j(t, null), oo(), mo(t)) : (j(t, a.cachePool), ao(t, a), mo(t), t.memoizedState = null);
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
		var a = Oa();
		return a = a === null ? null : {
			parent: va._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && j(t, null), oo(), po(t), e !== null && O(e, t, r, !0), t.childLanes = i, null;
	}
	function _c(e, t) {
		return t = Ac({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function vc(e, t, n) {
		return Wa(t, e.child, null, n), e = _c(t, t.pendingProps), e.flags |= 2, ho(t), t.memoizedState = null, e;
	}
	function yc(e, t, n) {
		var r = t.pendingProps, i = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (E) {
				if (r.mode === "hidden") return e = _c(t, r), t.lanes = 536870912, hc(null, e);
				if (fo(t), (e = qi) ? (e = _f(e, Yi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ri === null ? null : {
						id: zi,
						overflow: Bi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Oi(e), n.return = t, t.child = n, Ki = t, qi = null)) : e = null, e === null) throw Zi(t);
				return t.lanes = 536870912, null;
			}
			return _c(t, r);
		}
		var a = e.memoizedState;
		if (a !== null) {
			var o = a.dehydrated;
			if (fo(t), i) if (t.flags & 256) t.flags &= -257, t = vc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(s(558));
			else if (lc || O(e, t, n, !1), i = (n & e.childLanes) !== 0, lc || i) {
				if (r = Jl, r !== null && (o = pt(r, n), o !== 0 && o !== a.retryLane)) throw a.retryLane = o, gi(e, o), Eu(r, e, o), cc;
				Ru(), t = vc(e, t, n);
			} else e = a.treeContext, qi = xf(o.nextSibling), Ki = t, E = !0, Ji = null, Yi = !1, e !== null && Gi(t, e), t = _c(t, r), t.flags |= 4096;
			return t;
		}
		return e = Ci(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function bc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(s(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function xc(e, t, n, r, i) {
		return da(t), n = ko(e, t, n, r, void 0, i), r = No(), e !== null && !lc ? (Po(e, t, i), Fc(e, t, i)) : (E && r && Ui(t), t.flags |= 1, uc(e, t, n, i), t.child);
	}
	function Sc(e, t, n, r, i, a) {
		return da(t), t.updateQueue = null, n = jo(t, r, n, i), Ao(e), r = No(), e !== null && !lc ? (Po(e, t, a), Fc(e, t, a)) : (E && r && Ui(t), t.flags |= 1, uc(e, t, n, a), t.child);
	}
	function Cc(e, t, n, r, i) {
		if (da(t), t.stateNode === null) {
			var a = yi, o = n.contextType;
			typeof o == "object" && o && (a = fa(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Ys, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, qa(t), o = n.contextType, a.context = typeof o == "object" && o ? fa(o) : yi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Js(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Ys.enqueueReplaceState(a, a.state, null), eo(t, r, a, i), $a(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Qs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = yi, typeof u == "object" && u && (o = fa(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Zs(t, a, r, o), Ka = !1;
			var f = t.memoizedState;
			a.state = f, eo(t, r, a, i), $a(), l = t.memoizedState, s || f !== l || Ka ? (typeof d == "function" && (Js(t, n, d, r), l = t.memoizedState), (c = Ka || Xs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ja(e, t), o = t.memoizedProps, u = Qs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = yi, typeof l == "object" && l && (c = fa(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Zs(t, a, r, c), Ka = !1, f = t.memoizedState, a.state = f, eo(t, r, a, i), $a();
			var p = t.memoizedState;
			o !== d || f !== p || Ka || e !== null && e.dependencies !== null && ua(e.dependencies) ? (typeof s == "function" && (Js(t, n, s, r), p = t.memoizedState), (u = Ka || Xs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && ua(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, bc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Wa(t, e.child, null, i), t.child = Wa(t, null, n, i)) : uc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Fc(e, t, i), e;
	}
	function wc(e, t, n, r) {
		return ta(), t.flags |= 256, uc(e, t, n, r), t.child;
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
			cachePool: ka()
		};
	}
	function Dc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= ou), e;
	}
	function Oc(e, t, n) {
		var r = t.pendingProps, i = !1, a = (t.flags & 128) != 0, o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : (go.current & 2) != 0), o && (i = !0, t.flags &= -129), o = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (E) {
				if (i ? uo(t) : mo(t), (e = qi) ? (e = _f(e, Yi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ri === null ? null : {
						id: zi,
						overflow: Bi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Oi(e), n.return = t, t.child = n, Ki = t, qi = null)) : e = null, e === null) throw Zi(t);
				return yf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, i ? (mo(t), i = t.mode, c = Ac({
				mode: "hidden",
				children: c
			}, i), r = Ei(r, i, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = Ec(n), r.childLanes = Dc(e, o, n), t.memoizedState = Tc, hc(null, r)) : (uo(t), kc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (a) t.flags & 256 ? (uo(t), t.flags &= -257, t = jc(e, t, n)) : t.memoizedState === null ? (mo(t), c = r.fallback, i = t.mode, r = Ac({
				mode: "visible",
				children: r.children
			}, i), c = Ei(c, i, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Wa(t, e.child, null, n), r = t.child, r.memoizedState = Ec(n), r.childLanes = Dc(e, o, n), t.memoizedState = Tc, t = hc(null, r)) : (mo(t), t.child = e.child, t.flags |= 128, t = null);
			else if (uo(t), yf(c)) {
				if (o = c.nextSibling && c.nextSibling.dataset, o) var u = o.dgst;
				o = u, r = Error(s(419)), r.stack = "", r.digest = o, ra({
					value: r,
					source: null,
					stack: null
				}), t = jc(e, t, n);
			} else if (lc || O(e, t, n, !1), o = (n & e.childLanes) !== 0, lc || o) {
				if (o = Jl, o !== null && (r = pt(o, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, gi(e, r), Eu(o, e, r), cc;
				vf(c) || Ru(), t = jc(e, t, n);
			} else vf(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, qi = xf(c.nextSibling), Ki = t, E = !0, Ji = null, Yi = !1, e !== null && Gi(t, e), t = kc(t, r.children), t.flags |= 4096);
			return t;
		}
		return i ? (mo(t), c = r.fallback, i = t.mode, l = e.child, u = l.sibling, r = Ci(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = Ei(c, i, n, null), c.flags |= 2) : c = Ci(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, hc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = Ec(n) : (i = c.cachePool, i === null ? i = ka() : (l = va._currentValue, i = i.parent === l ? i : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: i
		}), r.memoizedState = c, r.childLanes = Dc(e, o, n), t.memoizedState = Tc, hc(e.child, r)) : (uo(t), n = e.child, e = n.sibling, n = Ci(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function kc(e, t) {
		return t = Ac({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Ac(e, t) {
		return e = xi(22, e, null, t), e.lanes = 0, e;
	}
	function jc(e, t, n) {
		return Wa(t, e.child, null, n), e = kc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Mc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), ca(e.return, t, n);
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
		var o = go.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, ve(go, o), uc(e, t, r, n), r = E ? Fi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
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
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && _o(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Nc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && _o(e) === null) {
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
			if (O(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(s(153));
		if (t.child !== null) {
			for (e = t.child, n = Ci(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Ci(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Ic(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && ua(e))) : !0;
	}
	function Lc(e, t, n) {
		switch (t.tag) {
			case 3:
				Ce(t, t.stateNode.containerInfo), sa(t, va, e.memoizedState.cache), ta();
				break;
			case 27:
			case 5:
				Te(t);
				break;
			case 4:
				Ce(t, t.stateNode.containerInfo);
				break;
			case 10:
				sa(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, fo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (uo(t), e = Fc(e, t, n), e === null ? null : e.sibling) : Oc(e, t, n) : (uo(t), t.flags |= 128, null);
				uo(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (O(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Pc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), ve(go, go.current), r) break;
				return null;
			case 22: return t.lanes = 0, mc(e, t, n, t.pendingProps);
			case 24: sa(t, va, e.memoizedState.cache);
		}
		return Fc(e, t, n);
	}
	function Rc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) lc = !0;
		else {
			if (!Ic(e, n) && !(t.flags & 128)) return lc = !1, Lc(e, t, n);
			lc = !!(e.flags & 131072);
		}
		else lc = !1, E && t.flags & 1048576 && Hi(t, Fi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Fa(t.elementType), t.type = e, typeof e == "function") Si(e) ? (r = Qs(e, r), t.tag = 1, t = Cc(null, t, e, r, n)) : (t.tag = 0, t = xc(null, t, e, r, n));
					else {
						if (e != null) {
							var i = e.$$typeof;
							if (i === re) {
								t.tag = 11, t = dc(null, t, e, r, n);
								break a;
							} else if (i === oe) {
								t.tag = 14, t = fc(null, t, e, r, n);
								break a;
							}
						}
						throw t = de(e) || e, Error(s(306, t, ""));
					}
				}
				return t;
			case 0: return xc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, i = Qs(r, t.pendingProps), Cc(e, t, r, i, n);
			case 3:
				a: {
					if (Ce(t, t.stateNode.containerInfo), e === null) throw Error(s(387));
					r = t.pendingProps;
					var a = t.memoizedState;
					i = a.element, Ja(e, t), eo(t, r, null, n);
					var o = t.memoizedState;
					if (r = o.cache, sa(t, va, r), r !== a.cache && la(t, [va], n, !0), $a(), r = o.element, a.isDehydrated) if (a = {
						element: r,
						isDehydrated: !1,
						cache: o.cache
					}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
						t = wc(e, t, r, n);
						break a;
					} else if (r !== i) {
						i = ji(Error(s(424)), t), ra(i), t = wc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (qi = xf(e.firstChild), Ki = t, E = !0, Ji = null, Yi = !0, n = Ga(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (ta(), r === i) {
							t = Fc(e, t, n);
							break a;
						}
						uc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return bc(e, t), e === null ? (n = Vf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : E || (n = t.type, e = t.pendingProps, r = $d(xe.current).createElement(n), r[yt] = t, r[bt] = e, qd(r, n, e), Mt(r), t.stateNode = r) : t.memoizedState = Vf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return Te(t), e === null && E && (r = t.stateNode = Tf(t.type, t.pendingProps, xe.current), Ki = t, Yi = !0, i = qi, df(t.type) ? (Sf = i, qi = xf(r.firstChild)) : qi = i), uc(e, t, t.pendingProps.children, n), bc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && E && ((i = r = qi) && (r = hf(r, t.type, t.pendingProps, Yi), r === null ? i = !1 : (t.stateNode = r, Ki = t, qi = xf(r.firstChild), Yi = !1, i = !0)), i || Zi(t)), Te(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, r = a.children, nf(i, a) ? r = null : o !== null && nf(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = ko(e, t, Mo, null, null, n), lp._currentValue = i), bc(e, t), uc(e, t, r, n), t.child;
			case 6: return e === null && E && ((e = n = qi) && (n = gf(n, t.pendingProps, Yi), n === null ? e = !1 : (t.stateNode = n, Ki = t, qi = null, e = !0)), e || Zi(t)), null;
			case 13: return Oc(e, t, n);
			case 4: return Ce(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Wa(t, null, r, n) : uc(e, t, r, n), t.child;
			case 11: return dc(e, t, t.type, t.pendingProps, n);
			case 7: return uc(e, t, t.pendingProps, n), t.child;
			case 8: return uc(e, t, t.pendingProps.children, n), t.child;
			case 12: return uc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, sa(t, t.type, r.value), uc(e, t, r.children, n), t.child;
			case 9: return i = t.type._context, r = t.pendingProps.children, da(t), i = fa(i), r = r(i), t.flags |= 1, uc(e, t, r, n), t.child;
			case 14: return fc(e, t, t.type, t.pendingProps, n);
			case 15: return pc(e, t, t.type, t.pendingProps, n);
			case 19: return Pc(e, t, n);
			case 31: return yc(e, t, n);
			case 22: return mc(e, t, n, t.pendingProps);
			case 24: return da(t), r = fa(va), e === null ? (i = Oa(), i === null && (i = Jl, a = ya(), i.pooledCache = a, a.refCount++, a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
				parent: r,
				cache: i
			}, qa(t), sa(t, va, i)) : ((e.lanes & n) !== 0 && (Ja(e, t), eo(t, null, null, n), $a()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, sa(t, va, r), r !== i.cache && la(t, [va], n, !0)) : (i = {
				parent: r,
				cache: r
			}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), sa(t, va, r))), uc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(s(156, t.tag));
	}
	function zc(e) {
		e.flags |= 4;
	}
	function Bc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Fu()) e.flags |= 8192;
			else throw Ia = Ma, ja;
		} else e.flags &= -16777217;
	}
	function Vc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !tp(t)) if (Fu()) e.flags |= 8192;
		else throw Ia = Ma, ja;
	}
	function Hc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : st(), e.lanes |= t, su |= t);
	}
	function Uc(e, t) {
		if (!E) switch (e.tailMode) {
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
		switch (Wi(t), t.tag) {
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
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), D(va), we(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ea(t) ? zc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, na())), Wc(t), null;
			case 26:
				var i = t.type, a = t.memoizedState;
				return e === null ? (zc(t), a === null ? (Wc(t), Bc(t, i, null, r, n)) : (Wc(t), Vc(t, a))) : a ? a === e.memoizedState ? (Wc(t), t.flags &= -16777217) : (zc(t), Wc(t), Vc(t, a)) : (e = e.memoizedProps, e !== r && zc(t), Wc(t), Bc(t, i, e, r, n)), null;
			case 27:
				if (T(t), n = xe.current, i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && zc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(s(166));
						return Wc(t), null;
					}
					e = ye.current, ea(t) ? Qi(t, e) : (e = Tf(i, r, n), t.stateNode = e, zc(t));
				}
				return Wc(t), null;
			case 5:
				if (T(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && zc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(s(166));
						return Wc(t), null;
					}
					if (a = ye.current, ea(t)) Qi(t, a);
					else {
						var o = $d(xe.current);
						switch (a) {
							case 1:
								a = o.createElementNS("http://www.w3.org/2000/svg", i);
								break;
							case 2:
								a = o.createElementNS("http://www.w3.org/1998/Math/MathML", i);
								break;
							default: switch (i) {
								case "svg":
									a = o.createElementNS("http://www.w3.org/2000/svg", i);
									break;
								case "math":
									a = o.createElementNS("http://www.w3.org/1998/Math/MathML", i);
									break;
								case "script":
									a = o.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild);
									break;
								case "select":
									a = typeof r.is == "string" ? o.createElement("select", { is: r.is }) : o.createElement("select"), r.multiple ? a.multiple = !0 : r.size && (a.size = r.size);
									break;
								default: a = typeof r.is == "string" ? o.createElement(i, { is: r.is }) : o.createElement(i);
							}
						}
						a[yt] = t, a[bt] = r;
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
					if (typeof r != "string" && t.stateNode === null) throw Error(s(166));
					if (e = xe.current, ea(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, i = Ki, i !== null) switch (i.tag) {
							case 27:
							case 5: r = i.memoizedProps;
						}
						e[yt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Wd(e.nodeValue, n)), e || Zi(t, !0);
					} else e = $d(e).createTextNode(r), e[yt] = t, t.stateNode = e;
				}
				return Wc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ea(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(s(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(s(557));
							e[yt] = t;
						} else ta(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Wc(t), e = !1;
					} else n = na(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (ho(t), t) : (ho(t), null);
					if (t.flags & 128) throw Error(s(558));
				}
				return Wc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (i = ea(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!i) throw Error(s(318));
							if (i = t.memoizedState, i = i === null ? null : i.dehydrated, !i) throw Error(s(317));
							i[yt] = t;
						} else ta(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Wc(t), i = !1;
					} else i = na(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
					if (!i) return t.flags & 256 ? (ho(t), t) : (ho(t), null);
				}
				return ho(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Hc(t, t.updateQueue), Wc(t), null);
			case 4: return we(), e === null && Pd(t.stateNode.containerInfo), Wc(t), null;
			case 10: return D(t.type), Wc(t), null;
			case 19:
				if (_e(go), r = t.memoizedState, r === null) return Wc(t), null;
				if (i = (t.flags & 128) != 0, a = r.rendering, a === null) if (i) Uc(r, !1);
				else {
					if (nu !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (a = _o(e), a !== null) {
							for (t.flags |= 128, Uc(r, !1), e = a.updateQueue, t.updateQueue = e, Hc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) wi(n, e), n = n.sibling;
							return ve(go, go.current & 1 | 2), E && Vi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && Re() > fu && (t.flags |= 128, i = !0, Uc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!i) if (e = _o(a), e !== null) {
						if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Hc(t, e), Uc(r, !0), r.tail === null && r.tailMode === "hidden" && !a.alternate && !E) return Wc(t), null;
					} else 2 * Re() - r.renderingStartTime > fu && n !== 536870912 && (t.flags |= 128, i = !0, Uc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (a.sibling = t.child, t.child = a) : (e = r.last, e === null ? t.child = a : e.sibling = a, r.last = a);
				}
				return r.tail === null ? (Wc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Re(), e.sibling = null, n = go.current, ve(go, i ? n & 1 | 2 : n & 1), E && Vi(t, r.treeForkCount), e);
			case 22:
			case 23: return ho(t), so(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Wc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Wc(t), n = t.updateQueue, n !== null && Hc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && _e(Da), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), D(va), Wc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(s(156, t.tag));
	}
	function Kc(e, t) {
		switch (Wi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return D(va), we(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return T(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (ho(t), t.alternate === null) throw Error(s(340));
					ta();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (ho(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(s(340));
					ta();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return _e(go), null;
			case 4: return we(), null;
			case 10: return D(t.type), null;
			case 22:
			case 23: return ho(t), so(), e !== null && _e(Da), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return D(va), null;
			case 25: return null;
			default: return null;
		}
	}
	function qc(e, t) {
		switch (Wi(t), t.tag) {
			case 3:
				D(va), we();
				break;
			case 26:
			case 27:
			case 5:
				T(t);
				break;
			case 4:
				we();
				break;
			case 31:
				t.memoizedState !== null && ho(t);
				break;
			case 13:
				ho(t);
				break;
			case 19:
				_e(go);
				break;
			case 10:
				D(t.type);
				break;
			case 22:
			case 23:
				ho(t), so(), e !== null && _e(Da);
				break;
			case 24: D(va);
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
				no(t, n);
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
			Jd(r, e.type, n, t), r[bt] = t;
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
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = pn));
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
			qd(t, r, n), t[yt] = e, t[bt] = n;
		} catch (t) {
			nd(e, e.return, t);
		}
	}
	var sl = !1, cl = !1, ll = !1, ul = typeof WeakSet == "function" ? WeakSet : Set, dl = null;
	function fl(e, t) {
		if (e = e.containerInfo, Zd = vp, e = Br(e), Vr(e)) {
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
					var o = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || i !== 0 && f.nodeType !== 3 || (c = o + i), f !== a || r !== 0 && f.nodeType !== 3 || (l = o + r), f.nodeType === 3 && (o += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === i && (c = o), p === a && ++d === r && (l = o), (m = f.nextSibling) !== null) break;
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
				default: if (e & 1024) throw Error(s(163));
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
						no(e, t);
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
		t !== null && (e.alternate = null, ml(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Dt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var hl = null, gl = !1;
	function _l(e, t, n) {
		for (n = n.child; n !== null;) vl(e, t, n), n = n.sibling;
	}
	function vl(e, t, n) {
		if (Je && typeof Je.onCommitFiberUnmount == "function") try {
			Je.onCommitFiberUnmount(qe, n);
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
			default: throw Error(s(435, e.tag));
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
			var i = n[r], a = e, o = t, c = o;
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
			if (hl === null) throw Error(s(160));
			vl(a, o, i), hl = null, gl = !1, a = i.alternate, a !== null && (a.return = null), i.return = null;
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
									a = i.getElementsByTagName("title")[0], (!a || a[Et] || a[yt] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = i.createElement(r), i.head.insertBefore(a, i.querySelector("head > title"))), qd(a, r, n), a[yt] = e, Mt(a), r = a;
									break a;
								case "link":
									var o = Qf("link", "href", i).get(r + (n.href || ""));
									if (o) {
										for (var c = 0; c < o.length; c++) if (a = o[c], a.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && a.getAttribute("rel") === (n.rel == null ? null : n.rel) && a.getAttribute("title") === (n.title == null ? null : n.title) && a.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											o.splice(c, 1);
											break b;
										}
									}
									a = i.createElement(r), qd(a, r, n), i.head.appendChild(a);
									break;
								case "meta":
									if (o = Qf("meta", "content", i).get(r + (n.content || ""))) {
										for (c = 0; c < o.length; c++) if (a = o[c], a.getAttribute("content") === (n.content == null ? null : "" + n.content) && a.getAttribute("name") === (n.name == null ? null : n.name) && a.getAttribute("property") === (n.property == null ? null : n.property) && a.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && a.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											o.splice(c, 1);
											break b;
										}
									}
									a = i.createElement(r), qd(a, r, n), i.head.appendChild(a);
									break;
								default: throw Error(s(468, r));
							}
							a[yt] = e, Mt(a), r = a;
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
						an(i, "");
					} catch (t) {
						nd(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (i = e.memoizedProps, tl(e, i, n === null ? i : n.memoizedProps)), r & 1024 && (ll = !0);
				break;
			case 6:
				if (Cl(t, e), El(e), r & 4) {
					if (e.stateNode === null) throw Error(s(162));
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
				Cl(t, e), El(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (uu = Re()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Sl(e, r)));
				break;
			case 22:
				i = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = sl, d = cl;
				if (sl = u || i, cl = d || l, Cl(t, e), cl = d, sl = u, El(e), r & 8192) a: for (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, i && (n === null || l || sl || cl || kl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (a = l.stateNode, i) o = a.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none";
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
				if (n == null) throw Error(s(160));
				switch (n.tag) {
					case 27:
						var i = n.stateNode;
						al(e, rl(e), i);
						break;
					case 5:
						var a = n.stateNode;
						n.flags & 32 && (an(a, ""), n.flags &= -33), al(e, rl(e), a);
						break;
					case 3:
					case 4:
						var o = n.stateNode.containerInfo;
						il(e, rl(e), o);
						break;
					default: throw Error(s(161));
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
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) to(c[i], s);
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
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ba(n));
	}
	function Ml(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ba(e));
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
				Nl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ba(e)));
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
				case 24: ba(n.memoizedState.cache);
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
			var t = fa(va), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return fa(va).controller.signal;
		}
	}, Kl = typeof WeakMap == "function" ? WeakMap : Map, ql = 0, Jl = null, R = null, Yl = 0, Xl = 0, Zl = null, Ql = !1, $l = !1, eu = !1, tu = 0, nu = 0, ru = 0, iu = 0, au = 0, ou = 0, su = 0, z = null, cu = null, lu = !1, uu = 0, du = 0, fu = Infinity, pu = null, mu = null, hu = 0, gu = null, _u = null, vu = 0, yu = 0, bu = null, xu = null, Su = 0, Cu = null;
	function wu() {
		return ql & 2 && Yl !== 0 ? Yl & -Yl : C.T === null ? gt() : Cd();
	}
	function Tu() {
		if (ou === 0) if (!(Yl & 536870912) || E) {
			var e = tt;
			tt <<= 1, !(tt & 3932160) && (tt = 262144), ou = e;
		} else ou = 536870912;
		return e = co.current, e !== null && (e.flags |= 32), ou;
	}
	function Eu(e, t, n) {
		(e === Jl && (Xl === 2 || Xl === 9) || e.cancelPendingCommit !== null) && (Nu(e, 0), Au(e, Yl, ou, !1)), lt(e, n), (!(ql & 2) || e !== Jl) && (e === Jl && (!(ql & 2) && (iu |= n), nu === 4 && Au(e, Yl, ou, !1)), hd(e));
	}
	function Du(e, t, n) {
		if (ql & 6) throw Error(s(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || at(e, t), i = r ? Vu(e, t) : zu(e, t, !0), a = r;
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
					if (a = t, e.errorRecoveryDisabledLanes & a) var o = 0;
					else o = e.pendingLanes & -536870913, o = o === 0 ? o & 536870912 ? 536870912 : 0 : o;
					if (o !== 0) {
						t = o;
						a: {
							var c = e;
							i = z;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Nu(c, o).flags |= 256), o = zu(c, o, !1), o !== 2) {
								if (eu && !l) {
									c.errorRecoveryDisabledLanes |= a, iu |= a, i = 4;
									break a;
								}
								a = cu, cu = i, a !== null && (cu === null ? cu = a : cu.push.apply(cu, a));
							}
							i = o;
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
						case 1: throw Error(s(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							Au(r, t, ou, !Ql);
							break a;
						case 2:
							cu = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(s(329));
					}
					if ((t & 62914560) === t && (i = uu + 300 - Re(), 10 < i)) {
						if (Au(r, t, ou, !Ql), it(r, 0, !0) !== 0) break a;
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
				unsuspend: pn
			}, zl(t, a, d);
			var m = (a & 62914560) === a ? uu - Re() : (a & 4194048) === a ? du - Re() : 0;
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
					if (!Fr(a(), i)) return !1;
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
			var a = 31 - Xe(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && dt(e, n, t);
	}
	function ju() {
		return ql & 6 ? !0 : (gd(0, !1), !1);
	}
	function Mu() {
		if (R !== null) {
			if (Xl === 0) var e = R.return;
			else e = R, oa = aa = null, Fo(e), za = null, Ba = 0, e = R;
			for (; e !== null;) qc(e.alternate, e), e = e.return;
			R = null;
		}
	}
	function Nu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, sf(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), vu = 0, Mu(), Jl = e, R = n = Ci(e.current, null), Yl = t, Xl = 0, Zl = null, Ql = !1, $l = at(e, t), eu = !1, su = ou = au = iu = ru = nu = 0, cu = z = null, lu = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Xe(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return tu = t, pi(), n;
	}
	function Pu(e, t) {
		F = null, C.H = Ws, t === Aa || t === M ? (t = La(), Xl = 3) : t === ja ? (t = La(), Xl = 4) : Xl = t === cc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Zl = t, R === null && (nu = 1, nc(e, ji(t, e.current)));
	}
	function Fu() {
		var e = co.current;
		return e === null ? !0 : (Yl & 4194048) === Yl ? lo === null : (Yl & 62914560) === Yl || Yl & 536870912 ? e === lo : !1;
	}
	function Iu() {
		var e = C.H;
		return C.H = Ws, e === null ? Ws : e;
	}
	function Lu() {
		var e = C.A;
		return C.A = Gl, e;
	}
	function Ru() {
		nu = 4, Ql || (Yl & 4194048) !== Yl && co.current !== null || ($l = !0), !(ru & 134217727) && !(iu & 134217727) || Jl === null || Au(Jl, Yl, ou, !1);
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
							co.current === null && (t = !0);
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
		return t && e.shellSuspendCounter++, oa = aa = null, ql = r, C.H = i, C.A = a, R === null && (Jl = null, Yl = 0, pi()), o;
	}
	function Bu() {
		for (; R !== null;) Uu(R);
	}
	function Vu(e, t) {
		var n = ql;
		ql |= 2;
		var r = Iu(), i = Lu();
		Jl !== e || Yl !== t ? (pu = null, fu = Re() + 500, Nu(e, t)) : $l = at(e, t);
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
							if (Na(a)) {
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
							Na(a) ? (Xl = 0, Zl = null, Wu(t)) : (Xl = 0, Zl = null, Gu(e, t, a, 7));
							break;
						case 5:
							var o = null;
							switch (R.tag) {
								case 26: o = R.memoizedState;
								case 5:
								case 27:
									var c = R;
									if (o ? tp(o) : c.stateNode.complete) {
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
						default: throw Error(s(462));
					}
				}
				Hu();
				break;
			} catch (t) {
				Pu(e, t);
			}
		while (1);
		return oa = aa = null, C.H = r, C.A = i, ql = n, R === null ? (Jl = null, Yl = 0, pi(), nu) : 0;
	}
	function Hu() {
		for (; R !== null && !Ie();) Uu(R);
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
			case 5: Fo(t);
			default: qc(n, t), t = R = wi(t, tu), t = Rc(n, t, tu);
		}
		e.memoizedProps = e.pendingProps, t === null ? Ku(e) : R = t;
	}
	function Gu(e, t, n, r) {
		oa = aa = null, Fo(t), za = null, Ba = 0;
		var i = t.return;
		try {
			if (sc(e, i, t, n, Yl)) {
				nu = 1, nc(e, ji(n, e.current)), R = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw R = i, t;
			nu = 1, nc(e, ji(n, e.current)), R = null;
			return;
		}
		t.flags & 32768 ? (E || r === 1 ? e = !0 : $l || Yl & 536870912 ? e = !1 : (Ql = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = co.current, r !== null && r.tag === 13 && (r.flags |= 16384))), qu(t, e)) : Ku(t);
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
	function Ju(e, t, n, r, i, a, o, c, l) {
		e.cancelPendingCommit = null;
		do
			$u();
		while (hu !== 0);
		if (ql & 6) throw Error(s(327));
		if (t !== null) {
			if (t === e.current) throw Error(s(177));
			if (a = t.lanes | t.childLanes, a |= fi, ut(e, n, a, o, c, l), e === Jl && (R = Jl = null, Yl = 0), _u = t, gu = e, vu = n, yu = a, bu = i, xu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, cd(He, function() {
				return ed(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = C.T, C.T = null, i = w.p, w.p = 2, o = ql, ql |= 4;
				try {
					fl(e, t, n);
				} finally {
					ql = o, w.p = i, C.T = r;
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
				n = C.T, C.T = null;
				var r = w.p;
				w.p = 2;
				var i = ql;
				ql |= 4;
				try {
					Tl(t, e);
					var a = Qd, o = Br(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && zr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Vr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Rr(s, h), v = Rr(s, g);
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
					ql = i, w.p = r, C.T = n;
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
				n = C.T, C.T = null;
				var r = w.p;
				w.p = 2;
				var i = ql;
				ql |= 4;
				try {
					pl(e, t.alternate, t);
				} finally {
					ql = i, w.p = r, C.T = n;
				}
			}
			hu = 3;
		}
	}
	function Zu() {
		if (hu === 4 || hu === 3) {
			hu = 0, Le();
			var e = gu, t = _u, n = vu, r = xu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? hu = 5 : (hu = 0, _u = gu = null, Qu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (mu = null), ht(n), t = t.stateNode, Je && typeof Je.onCommitFiberRoot == "function") try {
				Je.onCommitFiberRoot(qe, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = C.T, i = w.p, w.p = 2, C.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					C.T = t, w.p = i;
				}
			}
			vu & 3 && $u(), hd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === Cu ? Su++ : (Su = 0, Cu = e) : Su = 0, gd(0, !1);
		}
	}
	function Qu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ba(t)));
	}
	function $u() {
		return Yu(), Xu(), Zu(), ed();
	}
	function ed() {
		if (hu !== 5) return !1;
		var e = gu, t = yu;
		yu = 0;
		var n = ht(vu), r = C.T, i = w.p;
		try {
			w.p = 32 > n ? 32 : n, C.T = null, n = bu, bu = null;
			var a = gu, o = vu;
			if (hu = 0, _u = gu = null, vu = 0, ql & 6) throw Error(s(331));
			var c = ql;
			if (ql |= 4, Hl(a.current), Pl(a, a.current, o, n), ql = c, gd(0, !1), Je && typeof Je.onPostCommitFiberRoot == "function") try {
				Je.onPostCommitFiberRoot(qe, a);
			} catch {}
			return !0;
		} finally {
			w.p = i, C.T = r, Qu(e, t);
		}
	}
	function td(e, t, n) {
		t = ji(n, t), t = ic(e.stateNode, t, 2), e = P(e, t, 2), e !== null && (lt(e, 2), hd(e));
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
					e = ji(n, e), n = ac(2), r = P(t, n, 2), r !== null && (oc(n, r, t, e), lt(r, 2), hd(r));
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
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Jl === e && (Yl & n) === n && (nu === 4 || nu === 3 && (Yl & 62914560) === Yl && 300 > Re() - uu ? !(ql & 2) && Nu(e, 0) : au |= n, su === Yl && (su = 0)), hd(e);
	}
	function ad(e, t) {
		t === 0 && (t = st()), e = gi(e, t), e !== null && (lt(e, t), hd(e));
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
			default: throw Error(s(314));
		}
		r !== null && r.delete(t), ad(e, n);
	}
	function cd(e, t) {
		return Pe(e, t);
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
							a = (1 << 31 - Xe(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, xd(r, a));
					} else a = Yl, a = it(r, r === Jl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || at(r, a) || (n = !0, xd(r, a));
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
		for (var t = Re(), n = null, r = ld; r !== null;) {
			var i = r.next, a = yd(r, t);
			a === 0 ? (r.next = null, n === null ? ld = i : n.next = i, i === null && (ud = n)) : (n = r, (e !== 0 || a & 3) && (fd = !0)), r = i;
		}
		hu !== 0 && hu !== 5 || gd(e, !1), md !== 0 && (md = 0);
	}
	function yd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Xe(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = ot(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Jl, n = Yl, n = it(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Xl === 2 || Xl === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Fe(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || at(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Fe(r), ht(n)) {
				case 2:
				case 8:
					n = Ve;
					break;
				case 32:
					n = He;
					break;
				case 268435456:
					n = We;
					break;
				default: n = He;
			}
			return r = bd.bind(null, e), n = Pe(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Fe(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function bd(e, t) {
		if (hu !== 0 && hu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if ($u() && e.callbackNode !== n) return null;
		var r = Yl;
		return r = it(e, e === Jl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Du(e, r, t), yd(e, Re()), e.callbackNode != null && e.callbackNode === n ? bd.bind(null, e) : null);
	}
	function xd(e, t) {
		if ($u()) return null;
		Du(e, t, !0);
	}
	function Sd() {
		lf(function() {
			ql & 6 ? Pe(Be, _d) : vd();
		});
	}
	function Cd() {
		if (md === 0) {
			var e = A;
			e === 0 && (e = et, et <<= 1, !(et & 261888) && (et = 256)), md = e;
		}
		return md;
	}
	function wd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : fn("" + e);
	}
	function Td(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function Ed(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = wd((i[bt] || null).action), o = r.submitter;
			o && (t = (t = o[bt] || null) ? wd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Pn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (md !== 0) {
								var e = o ? Td(i, o) : new FormData(i);
								js(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? Td(i, o) : new FormData(i), js(n, {
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
	for (var Dd = 0; Dd < si.length; Dd++) {
		var Od = si[Dd];
		ci(Od.toLowerCase(), "on" + (Od[0].toUpperCase() + Od.slice(1)));
	}
	ci($r, "onAnimationEnd"), ci(ei, "onAnimationIteration"), ci(ti, "onAnimationStart"), ci("dblclick", "onDoubleClick"), ci("focusin", "onFocus"), ci("focusout", "onBlur"), ci(ni, "onTransitionRun"), ci(ri, "onTransitionStart"), ci(ii, "onTransitionCancel"), ci(ai, "onTransitionEnd"), It("onMouseEnter", ["mouseout", "mouseover"]), It("onMouseLeave", ["mouseout", "mouseover"]), It("onPointerEnter", ["pointerout", "pointerover"]), It("onPointerLeave", ["pointerout", "pointerover"]), Ft("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ft("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ft("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Ft("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ft("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ft("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
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
						li(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						li(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function B(e, t) {
		var n = t[St];
		n === void 0 && (n = t[St] = /* @__PURE__ */ new Set());
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
			e[Nd] = !0, Nt.forEach(function(t) {
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
		n = i.bind(null, t, n, e), i = void 0, !Cn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
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
					var c = o.tag;
					if ((c === 3 || c === 4) && o.stateNode.containerInfo === i) return;
					o = o.return;
				}
				for (; s !== null;) {
					if (o = Ot(s), o === null) return;
					if (c = o.tag, c === 5 || c === 6 || c === 26 || c === 27) {
						r = a = o;
						continue a;
					}
					s = s.parentNode;
				}
			}
			r = r.return;
		}
		bn(function() {
			var r = a, i = hn(n), o = [];
			a: {
				var s = oi.get(e);
				if (s !== void 0) {
					var c = Pn, u = e;
					switch (e) {
						case "keypress": if (kn(n) === 0) break a;
						case "keydown":
						case "keyup":
							c = Qn;
							break;
						case "focusin":
							u = "focus", c = Un;
							break;
						case "focusout":
							u = "blur", c = Un;
							break;
						case "beforeblur":
						case "afterblur":
							c = Un;
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
							c = Vn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							c = Hn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							c = er;
							break;
						case $r:
						case ei:
						case ti:
							c = Wn;
							break;
						case ai:
							c = tr;
							break;
						case "scroll":
						case "scrollend":
							c = In;
							break;
						case "wheel":
							c = nr;
							break;
						case "copy":
						case "cut":
						case "paste":
							c = Gn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							c = $n;
							break;
						case "toggle":
						case "beforetoggle": c = rr;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? s === null ? null : s + "Capture" : s;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = xn(m, p), g != null && d.push(Ld(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (s = new c(s, u, null, n, i), o.push({
						event: s,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== mn && (u = n.relatedTarget || n.fromElement) && (Ot(u) || u[xt])) break a;
					if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (u = n.relatedTarget || n.toElement, c = r, u = u ? Ot(u) : null, u !== null && (f = l(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (c = null, u = r), c !== u)) {
						if (d = Vn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = $n, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? s : At(c), h = u == null ? s : At(u), s = new d(g, m + "leave", c, n, i), s.target = f, s.relatedTarget = h, g = null, Ot(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, c && u) b: {
							for (d = zd, p = c, m = u, h = 0, g = p; g; g = d(g)) h++;
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
						c !== null && Bd(o, s, c, d, !1), u !== null && f !== null && Bd(o, f, u, d, !0);
					}
				}
				a: {
					if (s = r ? At(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var v = Cr;
					else if (_r(s)) if (wr) v = Nr;
					else {
						v = jr;
						var y = Ar;
					}
					else c = s.nodeName, !c || c.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && ln(r.elementType) && (v = Cr) : v = Mr;
					if (v &&= v(e, r)) {
						vr(o, v, n, i);
						break a;
					}
					y && y(e, s, r), e === "focusout" && r && s.type === "number" && r.memoizedProps.value != null && en(s, "number", s.value);
				}
				switch (y = r ? At(r) : window, e) {
					case "focusin":
						(_r(y) || y.contentEditable === "true") && (Ur = y, Wr = r, Gr = null);
						break;
					case "focusout":
						Gr = Wr = Ur = null;
						break;
					case "mousedown":
						Kr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Kr = !1, qr(o, n, i);
						break;
					case "selectionchange": if (Hr) break;
					case "keydown":
					case "keyup": qr(o, n, i);
				}
				var b;
				if (ar) b: {
					switch (e) {
						case "compositionstart":
							var ee = "onCompositionStart";
							break b;
						case "compositionend":
							ee = "onCompositionEnd";
							break b;
						case "compositionupdate":
							ee = "onCompositionUpdate";
							break b;
					}
					ee = void 0;
				}
				else pr ? dr(e, n) && (ee = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (ee = "onCompositionStart");
				ee && (cr && n.locale !== "ko" && (pr || ee !== "onCompositionStart" ? ee === "onCompositionEnd" && pr && (b = On()) : (Tn = i, En = "value" in Tn ? Tn.value : Tn.textContent, pr = !0)), y = Rd(r, ee), 0 < y.length && (ee = new Kn(ee, e, null, n, i), o.push({
					event: ee,
					listeners: y
				}), b ? ee.data = b : (b = fr(n), b !== null && (ee.data = b)))), (b = sr ? mr(e, n) : hr(e, n)) && (ee = Rd(r, "onBeforeInput"), 0 < ee.length && (y = new Kn("onBeforeInput", "beforeinput", null, n, i), o.push({
					event: y,
					listeners: ee
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
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = xn(e, n), i != null && r.unshift(Ld(e, i, a)), i = xn(e, t), i != null && r.push(Ld(e, i, a))), e.tag === 3) return r;
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
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = xn(n, a), l != null && o.unshift(Ld(n, l, c))) : i || (l = xn(n, a), l != null && o.push(Ld(n, l, c)))), n = n.return;
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
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || an(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && an(e, "" + r);
				break;
			case "className":
				Ht(e, "class", r);
				break;
			case "tabIndex":
				Ht(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Ht(e, n, r);
				break;
			case "style":
				cn(e, r, a);
				break;
			case "data": if (t !== "object") {
				Ht(e, "data", r);
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
				r = fn("" + r), e.setAttribute(n, r);
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
				r = fn("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = pn);
				break;
			case "onScroll":
				r != null && B("scroll", e);
				break;
			case "onScrollEnd":
				r != null && B("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(s(61));
					if (n = r.__html, n != null) {
						if (i.children != null) throw Error(s(60));
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
				n = fn("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				B("beforetoggle", e), B("toggle", e), Vt(e, "popover", r);
				break;
			case "xlinkActuate":
				Ut(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Ut(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Ut(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Ut(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Ut(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Ut(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Ut(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Ut(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Ut(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Vt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = un.get(n) || n, Vt(e, n, r));
		}
	}
	function Kd(e, t, n, r, i, a) {
		switch (n) {
			case "style":
				cn(e, r, a);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(s(61));
					if (n = r.__html, n != null) {
						if (i.children != null) throw Error(s(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? an(e, r) : (typeof r == "number" || typeof r == "bigint") && an(e, "" + r);
				break;
			case "onScroll":
				r != null && B("scroll", e);
				break;
			case "onScrollEnd":
				r != null && B("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = pn);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!Pt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), t = n.slice(2, i ? n.length - 7 : void 0), a = e[bt] || null, a = a == null ? null : a[n], typeof a == "function" && e.removeEventListener(t, a, i), typeof r == "function")) {
					typeof a != "function" && a !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, i);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Vt(e, n, r);
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
					var o = n[a];
					if (o != null) switch (a) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							i = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(s(137, t));
						default: Gd(e, t, a, o, n, null);
					}
				}
				i && Gd(e, t, "srcSet", n.srcSet, n, null), r && Gd(e, t, "src", n.src, n, null);
				return;
			case "input":
				B("invalid", e);
				var c = a = o = i = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							i = d;
							break;
						case "type":
							o = d;
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
							if (d != null) throw Error(s(137, t));
							break;
						default: Gd(e, t, r, d, n, null);
					}
				}
				$t(e, a, c, l, u, o, i, !1);
				return;
			case "select":
				for (i in B("invalid", e), r = o = a = null, n) if (n.hasOwnProperty(i) && (c = n[i], c != null)) switch (i) {
					case "value":
						a = c;
						break;
					case "defaultValue":
						o = c;
						break;
					case "multiple": r = c;
					default: Gd(e, t, i, c, n, null);
				}
				t = a, n = o, e.multiple = !!r, t == null ? n != null && tn(e, !!r, n, !0) : tn(e, !!r, t, !1);
				return;
			case "textarea":
				for (o in B("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(o) && (c = n[o], c != null)) switch (o) {
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
						if (c != null) throw Error(s(91));
						break;
					default: Gd(e, t, o, c, n, null);
				}
				rn(e, r, i, a);
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
					case "dangerouslySetInnerHTML": throw Error(s(137, t));
					default: Gd(e, t, u, r, n, null);
				}
				return;
			default: if (ln(t)) {
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
				var i = null, a = null, o = null, c = null, l = null, u = null, d = null;
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
							o = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(s(137, t));
							break;
						default: m !== f && Gd(e, t, p, m, r, f);
					}
				}
				Qt(e, o, c, l, u, d, a, i);
				return;
			case "select":
				for (a in m = o = c = p = null, n) if (l = n[a], n.hasOwnProperty(a) && l != null) switch (a) {
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
					case "multiple": o = a;
					default: a !== l && Gd(e, t, i, a, r, l);
				}
				t = c, n = o, r = m, p == null ? !!r != !!n && (t == null ? tn(e, !!n, n ? [] : "", !1) : tn(e, !!n, t, !0)) : tn(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (i = n[c], n.hasOwnProperty(c) && i != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Gd(e, t, c, null, r, i);
				}
				for (o in r) if (i = r[o], a = n[o], r.hasOwnProperty(o) && (i != null || a != null)) switch (o) {
					case "value":
						p = i;
						break;
					case "defaultValue":
						m = i;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (i != null) throw Error(s(91));
						break;
					default: i !== a && Gd(e, t, o, i, r, a);
				}
				nn(e, p, m);
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
						if (p != null) throw Error(s(137, t));
						break;
					default: Gd(e, t, u, p, r, m);
				}
				return;
			default: if (ln(t)) {
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
					a[Et] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
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
					mf(n), Dt(n);
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
			else if (!e[Et]) switch (t) {
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
				if (e = t.documentElement, !e) throw Error(s(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(s(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(s(454));
				return e;
			default: throw Error(s(451));
		}
	}
	function Ef(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		Dt(e);
	}
	var Df = /* @__PURE__ */ new Map(), Of = /* @__PURE__ */ new Set();
	function V(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var kf = w.d;
	w.d = {
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
		var t = kt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Ns(t) : kf.r(e);
	}
	var Mf = typeof document > "u" ? null : document;
	function Nf(e, t, n) {
		var r = Mf;
		if (r && typeof t == "string" && t) {
			var i = Zt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), Of.has(i) || (Of.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), qd(t, "link", e), Mt(t), r.head.appendChild(t)));
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
			var i = "link[rel=\"preload\"][as=\"" + Zt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Zt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Zt(n.imageSizes) + "\"]")) : i += "[href=\"" + Zt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Hf(e);
					break;
				case "script": a = Kf(e);
			}
			Df.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), Df.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Uf(a)) || t === "script" && r.querySelector(H(a)) || (t = r.createElement("link"), qd(t, "link", e), Mt(t), r.head.appendChild(t)));
		}
	}
	function Lf(e, t) {
		kf.m(e, t);
		var n = Mf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Zt(r) + "\"][href=\"" + Zt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Kf(e);
			}
			if (!Df.has(a) && (e = h({
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
				r = n.createElement("link"), qd(r, "link", e), Mt(r), n.head.appendChild(r);
			}
		}
	}
	function Rf(e, t, n) {
		kf.S(e, t, n);
		var r = Mf;
		if (r && e) {
			var i = jt(r).hoistableStyles, a = Hf(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Uf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = Df.get(a)) && Yf(e, n);
					var c = o = r.createElement("link");
					Mt(c), qd(c, "link", e), c._p = new Promise(function(e, t) {
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
			var r = jt(n).hoistableScripts, i = Kf(e), a = r.get(i);
			a || (a = n.querySelector(H(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = Df.get(i)) && Xf(e, t), a = n.createElement("script"), Mt(a), qd(a, "link", e), n.head.appendChild(a)), a = {
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
			var r = jt(n).hoistableScripts, i = Kf(e), a = r.get(i);
			a || (a = n.querySelector(H(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = Df.get(i)) && Xf(e, t), a = n.createElement("script"), Mt(a), qd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Vf(e, t, n, r) {
		var i = (i = xe.current) ? V(i) : null;
		if (!i) throw Error(s(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Hf(n.href), n = jt(i).hoistableStyles, r = n.get(t), r || (r = {
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
					var a = jt(i).hoistableStyles, o = a.get(e);
					if (o || (i = i.ownerDocument || i, o = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, a.set(e, o), (a = i.querySelector(Uf(e))) && !a._p && (o.instance = a, o.state.loading = 5), Df.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, Df.set(e, n), a || Gf(i, e, n, o.state))), t && r === null) throw Error(s(528, ""));
					return o;
				}
				if (t && r !== null) throw Error(s(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Kf(n), n = jt(i).hoistableScripts, r = n.get(t), r || (r = {
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
			default: throw Error(s(444, e));
		}
	}
	function Hf(e) {
		return "href=\"" + Zt(e) + "\"";
	}
	function Uf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Wf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Gf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), qd(t, "link", n), Mt(t), e.head.appendChild(t));
	}
	function Kf(e) {
		return "[src=\"" + Zt(e) + "\"]";
	}
	function H(e) {
		return "script[async]" + e;
	}
	function qf(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Zt(n.href) + "\"]");
				if (r) return t.instance = r, Mt(r), r;
				var i = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Mt(r), qd(r, "style", i), Jf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				i = Hf(n.href);
				var a = e.querySelector(Uf(i));
				if (a) return t.state.loading |= 4, t.instance = a, Mt(a), a;
				r = Wf(n), (i = Df.get(i)) && Yf(r, i), a = (e.ownerDocument || e).createElement("link"), Mt(a);
				var o = a;
				return o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), qd(a, "link", r), t.state.loading |= 4, Jf(a, n.precedence, e), t.instance = a;
			case "script": return a = Kf(n.src), (i = e.querySelector(H(a))) ? (t.instance = i, Mt(i), i) : (r = n, (i = Df.get(a)) && (r = h({}, n), Xf(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), Mt(i), qd(i, "link", r), e.head.appendChild(i), t.instance = i);
			case "void": return null;
			default: throw Error(s(443, t.type));
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
			if (!(a[Et] || a[yt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
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
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = ap.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Mt(a);
					return;
				}
				a = t.ownerDocument || t, r = Wf(r), (i = Df.get(i)) && Yf(r, i), a = a.createElement("link"), Mt(a);
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
		$$typeof: ne,
		Provider: null,
		Consumer: null,
		_currentValue: pe,
		_currentValue2: pe,
		_threadCount: 0
	};
	function up(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ct(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ct(0), this.hiddenUpdates = ct(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function dp(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new up(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = xi(3, null, null, t), e.current = a, a.stateNode = e, t = ya(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, qa(a), e;
	}
	function fp(e) {
		return e ? (e = yi, e) : yi;
	}
	function pp(e, t, n, r, i, a) {
		i = fp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ya(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = P(e, r, t), n !== null && (Eu(n, e, t), Xa(n, e, t));
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
			var t = gi(e, 67108864);
			t !== null && Eu(t, e, 67108864), hp(e, 67108864);
		}
	}
	function _p(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = wu();
			t = mt(t);
			var n = gi(e, t);
			n !== null && Eu(n, e, t), hp(e, t);
		}
	}
	var vp = !0;
	function yp(e, t, n, r) {
		var i = C.T;
		C.T = null;
		var a = w.p;
		try {
			w.p = 2, xp(e, t, n, r);
		} finally {
			w.p = a, C.T = i;
		}
	}
	function bp(e, t, n, r) {
		var i = C.T;
		C.T = null;
		var a = w.p;
		try {
			w.p = 8, xp(e, t, n, r);
		} finally {
			w.p = a, C.T = i;
		}
	}
	function xp(e, t, n, r) {
		if (vp) {
			var i = Sp(r);
			if (i === null) Id(e, t, r, Cp, n), Pp(e, r);
			else if (Ip(i, e, t, n, r)) r.stopPropagation();
			else if (Pp(e, r), t & 4 && -1 < Np.indexOf(e)) {
				for (; i !== null;) {
					var a = kt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = rt(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Xe(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									hd(a), !(ql & 6) && (fu = Re() + 500, gd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = gi(a, 2), s !== null && Eu(s, a, 2), ju(), hp(a, 2);
					}
					if (a = Sp(r), a === null && Id(e, t, r, Cp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Id(e, t, r, null, n);
		}
	}
	function Sp(e) {
		return e = hn(e), wp(e);
	}
	var Cp = null;
	function wp(e) {
		if (Cp = null, e = Ot(e), e !== null) {
			var t = l(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = u(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = d(t), e !== null) return e;
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
			case "message": switch (ze()) {
				case Be: return 2;
				case Ve: return 8;
				case He:
				case Ue: return 32;
				case We: return 268435456;
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
		}, t !== null && (t = kt(t), t !== null && gp(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
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
		var t = Ot(e.target);
		if (t !== null) {
			var n = l(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = u(n), t !== null) {
						e.blockedOn = t, _t(e.priority, function() {
							_p(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = d(n), t !== null) {
						e.blockedOn = t, _t(e.priority, function() {
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
				mn = r, n.target.dispatchEvent(r), mn = null;
			} else return t = kt(n), t !== null && gp(t), e.blockedOn = n, !1;
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
				var a = kt(n);
				a !== null && (e.splice(t, 3), t -= 3, js(a, {
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
			var i = n[r], a = n[r + 1], o = i[bt] || null;
			if (typeof a == "function") o || Up(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[bt] || null) s = o.formAction;
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
		if (t === null) throw Error(s(409));
		var n = t.current;
		pp(n, wu(), e, t, null, null);
	}, qp.prototype.unmount = Kp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			pp(e.current, 2, null, e, null, null), ju(), t[xt] = null;
		}
	};
	function qp(e) {
		this._internalRoot = e;
	}
	qp.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = gt();
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
	if (Jp !== "19.2.7") throw Error(s(527, Jp, "19.2.7"));
	w.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
		return e = p(t), e = e === null ? null : m(e), e = e === null ? null : e.stateNode, e;
	};
	var Yp = {
		bundleType: 0,
		version: "19.2.7",
		rendererPackageName: "react-dom",
		currentDispatcherRef: C,
		reconcilerVersion: "19.2.7"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Xp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Xp.isDisabled && Xp.supportsFiber) try {
			qe = Xp.inject(Yp), Je = Xp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!c(e)) throw Error(s(299));
		var n = !1, r = "", i = $s, a = ec, o = tc;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = dp(e, 1, !1, null, null, n, r, null, i, a, o, Gp), e[xt] = t.current, Pd(e), new Kp(t);
	}, e.hydrateRoot = function(e, t, n) {
		if (!c(e)) throw Error(s(299));
		var r = !1, i = "", a = $s, o = ec, l = tc, u = null;
		return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (a = n.onUncaughtError), n.onCaughtError !== void 0 && (o = n.onCaughtError), n.onRecoverableError !== void 0 && (l = n.onRecoverableError), n.formState !== void 0 && (u = n.formState)), t = dp(e, 1, !0, t, n ?? null, r, i, u, a, o, l, Gp), t.context = fp(null), n = t.current, r = wu(), r = mt(r), i = Ya(r), i.callback = null, P(n, i, r), n = r, t.current.lanes = n, lt(t, n), hd(t), e[xt] = t.current, Pd(e), new qp(t);
	}, e.version = "19.2.7";
})), tl = /* @__PURE__ */ e(((e) => {
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
		function o(e, t, n) {
			if (t.length !== n.length) console.warn("copyWithRename() expects paths of the same length");
			else {
				for (var r = 0; r < n.length - 1; r++) if (t[r] !== n[r]) {
					console.warn("copyWithRename() expects paths to be the same except for the deepest key");
					return;
				}
				return s(e, t, n, 0);
			}
		}
		function s(e, t, n, r) {
			var i = t[r], a = Kf(e) ? e.slice() : V({}, e);
			return r + 1 === t.length ? (a[n[r]] = a[i], Kf(a) ? a.splice(i, 1) : delete a[i]) : a[i] = s(e[i], t, n, r + 1), a;
		}
		function c(e, t, n) {
			var r = t[n], i = Kf(e) ? e.slice() : V({}, e);
			return n + 1 === t.length ? (Kf(i) ? i.splice(r, 1) : delete i[r], i) : (i[r] = c(e[r], t, n + 1), i);
		}
		function l() {
			return !1;
		}
		function u() {
			return null;
		}
		function d() {
			console.error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks");
		}
		function f() {
			console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
		}
		function p() {}
		function m() {}
		function h(e) {
			var t = [];
			return e.forEach(function(e) {
				t.push(e);
			}), t.sort().join(", ");
		}
		function g(e, t, n, r) {
			return new Er(e, t, n, r);
		}
		function _(e, t) {
			e.context === Ng && ($d(e.current, 2, t, e, null, null), ol());
		}
		function v(e, t) {
			if (Pg !== null) {
				var n = t.staleFamilies;
				t = t.updatedFamilies, Ml(), Tr(e.current, t, n), ol();
			}
		}
		function y(e) {
			Pg = e;
		}
		function b(e) {
			return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
		}
		function ee(e) {
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
		function te(e) {
			if (e.tag === 13) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function ne(e) {
			if (e.tag === 31) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function re(e) {
			if (ee(e) !== e) throw Error("Unable to find node on an unmounted component.");
		}
		function ie(e) {
			var t = e.alternate;
			if (!t) {
				if (t = ee(e), t === null) throw Error("Unable to find node on an unmounted component.");
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
						if (a === n) return re(i), e;
						if (a === r) return re(i), t;
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
		function ae(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e;
			for (e = e.child; e !== null;) {
				if (t = ae(e), t !== null) return t;
				e = e.sibling;
			}
			return null;
		}
		function oe(e) {
			return typeof e != "object" || !e ? null : (e = Wf && e[Wf] || e["@@iterator"], typeof e == "function" ? e : null);
		}
		function se(e) {
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
				case Bf: return t = e.displayName || null, t === null ? se(e.type) || "Memo" : t;
				case Vf:
					t = e._payload, e = e._init;
					try {
						return se(e(t));
					} catch {}
			}
			return null;
		}
		function ce(e) {
			return typeof e.tag == "number" ? x(e) : typeof e.name == "string" ? e.name : null;
		}
		function x(e) {
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
				case 16: return se(t);
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
					if (e.return !== null) return x(e.return);
			}
			return null;
		}
		function le(e) {
			return { current: e };
		}
		function ue(e, t) {
			0 > Zf ? console.error("Unexpected pop.") : (t !== Xf[Zf] && console.error("Unexpected Fiber popped."), e.current = Yf[Zf], Yf[Zf] = null, Xf[Zf] = null, Zf--);
		}
		function S(e, t, n) {
			Zf++, Yf[Zf] = e.current, Xf[Zf] = n, e.current = t;
		}
		function de(e) {
			return e === null && console.error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."), e;
		}
		function fe(e, t) {
			S(ep, t, e), S($f, e, e), S(Qf, null, e);
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
			n = n.toLowerCase(), n = Jt(null, n), n = {
				context: t,
				ancestorInfo: n
			}, ue(Qf, e), S(Qf, n, e);
		}
		function C(e) {
			ue(Qf, e), ue($f, e), ue(ep, e);
		}
		function w() {
			return de(Qf.current);
		}
		function pe(e) {
			e.memoizedState !== null && S(tp, e, e);
			var t = de(Qf.current), n = e.type, r = Vu(t.context, n);
			n = Jt(t.ancestorInfo, n), r = {
				context: r,
				ancestorInfo: n
			}, t !== r && (S($f, e, e), S(Qf, r, e));
		}
		function me(e) {
			$f.current === e && (ue(Qf, e), ue($f, e)), tp.current === e && (ue(tp, e), bC._currentValue = yC);
		}
		function he() {}
		function ge() {
			if (np === 0) {
				rp = console.log, ip = console.info, ap = console.warn, op = console.error, sp = console.group, cp = console.groupCollapsed, lp = console.groupEnd;
				var e = {
					configurable: !0,
					enumerable: !0,
					value: he,
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
		function _e() {
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
		function ve(e) {
			var t = Error.prepareStackTrace;
			if (Error.prepareStackTrace = void 0, e = e.stack, Error.prepareStackTrace = t, e.startsWith("Error: react-stack-top-frame\n") && (e = e.slice(29)), t = e.indexOf("\n"), t !== -1 && (e = e.slice(t + 1)), t = e.indexOf("react_stack_bottom_frame"), t !== -1 && (t = e.lastIndexOf("\n", t)), t !== -1) e = e.slice(0, t);
			else return "";
			return e;
		}
		function ye(e) {
			if (up === void 0) try {
				throw Error();
			} catch (e) {
				var t = e.stack.trim().match(/\n( *(at )?)/);
				up = t && t[1] || "", dp = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
			}
			return "\n" + up + e + dp;
		}
		function be(e, t) {
			if (!e || fp) return "";
			var n = pp.get(e);
			if (n !== void 0) return n;
			fp = !0, n = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
			var r = null;
			r = H.H, H.H = null, ge();
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
				fp = !1, H.H = r, _e(), Error.prepareStackTrace = n;
			}
			return l = (l = e ? e.displayName || e.name : "") ? ye(l) : "", typeof e == "function" && pp.set(e, l), l;
		}
		function xe(e, t) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return ye(e.type);
				case 16: return ye("Lazy");
				case 13: return e.child !== t && t !== null ? ye("Suspense Fallback") : ye("Suspense");
				case 19: return ye("SuspenseList");
				case 0:
				case 15: return be(e.type, !1);
				case 11: return be(e.type.render, !1);
				case 1: return be(e.type, !0);
				case 31: return ye("Activity");
				default: return "";
			}
		}
		function Se(e) {
			try {
				var t = "", n = null;
				do {
					t += xe(e, n);
					var r = e._debugInfo;
					if (r) for (var i = r.length - 1; 0 <= i; i--) {
						var a = r[i];
						if (typeof a.name == "string") {
							var o = t;
							a: {
								var s = a.name, c = a.env, l = a.debugLocation;
								if (l != null) {
									var u = ve(l), d = u.lastIndexOf("\n"), f = d === -1 ? u : u.slice(d + 1);
									if (f.indexOf(s) !== -1) {
										var p = "\n" + f;
										break a;
									}
								}
								p = ye(s + (c ? " [" + c + "]" : ""));
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
		function Ce(e) {
			return (e = e ? e.displayName || e.name : "") ? ye(e) : "";
		}
		function we() {
			if (mp === null) return null;
			var e = mp._debugOwner;
			return e == null ? null : ce(e);
		}
		function Te() {
			if (mp === null) return "";
			var e = mp;
			try {
				var t = "";
				switch (e.tag === 6 && (e = e.return), e.tag) {
					case 26:
					case 27:
					case 5:
						t += ye(e.type);
						break;
					case 13:
						t += ye("Suspense");
						break;
					case 19:
						t += ye("SuspenseList");
						break;
					case 31:
						t += ye("Activity");
						break;
					case 30:
					case 0:
					case 15:
					case 1:
						e._debugOwner || t !== "" || (t += Ce(e.type));
						break;
					case 11: e._debugOwner || t !== "" || (t += Ce(e.type.render));
				}
				for (; e;) if (typeof e.tag == "number") {
					var n = e;
					e = n._debugOwner;
					var r = n._debugStack;
					if (e && r) {
						var i = ve(r);
						i !== "" && (t += "\n" + i);
					}
				} else if (e.debugStack != null) {
					var a = e.debugStack;
					(e = e.owner) && a && (t += "\n" + ve(a));
				} else break;
				var o = t;
			} catch (e) {
				o = "\nError generating stack: " + e.message + "\n" + e.stack;
			}
			return o;
		}
		function T(e, t, n, r, i, a, o) {
			var s = mp;
			Ee(e);
			try {
				return e !== null && e._debugTask ? e._debugTask.run(t.bind(null, n, r, i, a, o)) : t(n, r, i, a, o);
			} finally {
				Ee(s);
			}
			throw Error("runWithFiberInDEV should never be called in production. This is a bug in React.");
		}
		function Ee(e) {
			H.getCurrentStack = e === null ? null : Te, hp = !1, mp = e;
		}
		function De(e) {
			return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
		}
		function Oe(e) {
			try {
				return ke(e), !1;
			} catch {
				return !0;
			}
		}
		function ke(e) {
			return "" + e;
		}
		function Ae(e, t) {
			if (Oe(e)) return console.error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.", t, De(e)), ke(e);
		}
		function je(e, t) {
			if (Oe(e)) return console.error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.", t, De(e)), ke(e);
		}
		function Me(e) {
			if (Oe(e)) return console.error("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.", De(e)), ke(e);
		}
		function Ne(e) {
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
		function Pe(e) {
			if (typeof Op == "function" && kp(e), jp && typeof jp.setStrictMode == "function") try {
				jp.setStrictMode(Ap, e);
			} catch (e) {
				Mp || (Mp = !0, console.error("React instrumentation encountered an error: %o", e));
			}
		}
		function Fe(e) {
			return e >>>= 0, e === 0 ? 32 : 31 - (Fp(e) / Ip | 0) | 0;
		}
		function Ie(e) {
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
		function Le(e, t, n) {
			var r = e.pendingLanes;
			if (r === 0) return 0;
			var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
			e = e.warmLanes;
			var s = r & 134217727;
			return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ie(n))) : i = Ie(o) : i = Ie(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ie(n))) : i = Ie(o)) : i = Ie(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
		}
		function Re(e, t) {
			return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
		}
		function ze(e, t) {
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
		function Be() {
			var e = zp;
			return zp <<= 1, !(zp & 62914560) && (zp = 4194304), e;
		}
		function Ve(e) {
			for (var t = [], n = 0; 31 > n; n++) t.push(e);
			return t;
		}
		function He(e, t) {
			e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
		}
		function Ue(e, t, n, r, i, a) {
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
			r !== 0 && We(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
		}
		function We(e, t, n) {
			e.pendingLanes |= t, e.suspendedLanes &= ~t;
			var r = 31 - Pp(t);
			e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
		}
		function Ge(e, t) {
			var n = e.entangledLanes |= t;
			for (e = e.entanglements; n;) {
				var r = 31 - Pp(n), i = 1 << r;
				i & t | e[r] & t && (e[r] |= t), n &= ~i;
			}
		}
		function Ke(e, t) {
			var n = t & -t;
			return n = n & 42 ? 1 : qe(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
		}
		function qe(e) {
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
		function Je(e, t, n) {
			if (Np) for (e = e.pendingUpdatersLaneMap; 0 < n;) {
				var r = 31 - Pp(n), i = 1 << r;
				e[r].add(t), n &= ~i;
			}
		}
		function Ye(e, t) {
			if (Np) for (var n = e.pendingUpdatersLaneMap, r = e.memoizedUpdaters; 0 < t;) {
				var i = 31 - Pp(t);
				e = 1 << i, i = n[i], 0 < i.size && (i.forEach(function(e) {
					var t = e.alternate;
					t !== null && r.has(t) || r.add(e);
				}), i.clear()), t &= ~e;
			}
		}
		function Xe(e) {
			return e &= -e, Bp !== 0 && Bp < e ? Vp !== 0 && Vp < e ? e & 134217727 ? Hp : Up : Vp : Bp;
		}
		function Ze() {
			var e = qf.p;
			return e === 0 ? (e = window.event, e === void 0 ? Hp : df(e.type)) : e;
		}
		function Qe(e, t) {
			var n = qf.p;
			try {
				return qf.p = e, t();
			} finally {
				qf.p = n;
			}
		}
		function $e(e) {
			delete e[Gp], delete e[Kp], delete e[Jp], delete e[Yp], delete e[Xp];
		}
		function et(e) {
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
		function tt(e) {
			if (e = e[Gp] || e[qp]) {
				var t = e.tag;
				if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
			}
			return null;
		}
		function nt(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
			throw Error("getNodeFromInstance: Invalid argument.");
		}
		function rt(e) {
			var t = e[Zp];
			return t ||= e[Zp] = {
				hoistableStyles: /* @__PURE__ */ new Map(),
				hoistableScripts: /* @__PURE__ */ new Map()
			}, t;
		}
		function it(e) {
			e[Qp] = !0;
		}
		function at(e, t) {
			ot(e, t), ot(e + "Capture", t);
		}
		function ot(e, t) {
			em[e] && console.error("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), em[e] = t;
			var n = e.toLowerCase();
			for (tm[n] = e, e === "onDoubleClick" && (tm.ondblclick = e), e = 0; e < t.length; e++) $p.add(t[e]);
		}
		function st(e, t) {
			nm[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
		}
		function ct(e) {
			return gp.call(am, e) ? !0 : gp.call(im, e) ? !1 : rm.test(e) ? am[e] = !0 : (im[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
		}
		function lt(e, t, n) {
			if (ct(t)) {
				if (!e.hasAttribute(t)) {
					switch (typeof n) {
						case "symbol":
						case "object": return n;
						case "function": return n;
						case "boolean": if (!1 === n) return n;
					}
					return n === void 0 ? void 0 : null;
				}
				return e = e.getAttribute(t), e === "" && !0 === n ? !0 : (Ae(n, t), e === "" + n ? n : e);
			}
		}
		function ut(e, t, n) {
			if (ct(t)) if (n === null) e.removeAttribute(t);
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
				Ae(n, t), e.setAttribute(t, "" + n);
			}
		}
		function dt(e, t, n) {
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
				Ae(n, t), e.setAttribute(t, "" + n);
			}
		}
		function ft(e, t, n, r) {
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
				Ae(r, n), e.setAttributeNS(t, n, "" + r);
			}
		}
		function pt(e) {
			switch (typeof e) {
				case "bigint":
				case "boolean":
				case "number":
				case "string":
				case "undefined": return e;
				case "object": return Me(e), e;
				default: return "";
			}
		}
		function mt(e) {
			var t = e.type;
			return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
		}
		function ht(e, t, n) {
			var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
			if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
				var i = r.get, a = r.set;
				return Object.defineProperty(e, t, {
					configurable: !0,
					get: function() {
						return i.call(this);
					},
					set: function(e) {
						Me(e), n = "" + e, a.call(this, e);
					}
				}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
					getValue: function() {
						return n;
					},
					setValue: function(e) {
						Me(e), n = "" + e;
					},
					stopTracking: function() {
						e._valueTracker = null, delete e[t];
					}
				};
			}
		}
		function gt(e) {
			if (!e._valueTracker) {
				var t = mt(e) ? "checked" : "value";
				e._valueTracker = ht(e, t, "" + e[t]);
			}
		}
		function _t(e) {
			if (!e) return !1;
			var t = e._valueTracker;
			if (!t) return !0;
			var n = t.getValue(), r = "";
			return e && (r = mt(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
		}
		function vt(e) {
			if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
			try {
				return e.activeElement || e.body;
			} catch {
				return e.body;
			}
		}
		function yt(e) {
			return e.replace(om, function(e) {
				return "\\" + e.charCodeAt(0).toString(16) + " ";
			});
		}
		function bt(e, t) {
			t.checked === void 0 || t.defaultChecked === void 0 || cm || (console.error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", we() || "A component", t.type), cm = !0), t.value === void 0 || t.defaultValue === void 0 || sm || (console.error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", we() || "A component", t.type), sm = !0);
		}
		function xt(e, t, n, r, i, a, o, s) {
			e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? (Ae(o, "type"), e.type = o) : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + pt(t)) : e.value !== "" + pt(t) && (e.value = "" + pt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Ct(e, o, pt(n)) : Ct(e, o, pt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? (Ae(s, "name"), e.name = "" + pt(s)) : e.removeAttribute("name");
		}
		function St(e, t, n, r, i, a, o, s) {
			if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (Ae(a, "type"), e.type = a), t != null || n != null) {
				if (!(a !== "submit" && a !== "reset" || t != null)) {
					gt(e);
					return;
				}
				n = n == null ? "" : "" + pt(n), t = t == null ? n : "" + pt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
			}
			r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (Ae(o, "name"), e.name = o), gt(e);
		}
		function Ct(e, t, n) {
			t === "number" && vt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
		}
		function wt(e, t) {
			t.value ?? (typeof t.children == "object" && t.children !== null ? Df.Children.forEach(t.children, function(e) {
				e == null || typeof e == "string" || typeof e == "number" || typeof e == "bigint" || um || (um = !0, console.error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."));
			}) : t.dangerouslySetInnerHTML == null || dm || (dm = !0, console.error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), t.selected == null || lm || (console.error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), lm = !0);
		}
		function Tt() {
			var e = we();
			return e ? "\n\nCheck the render method of `" + e + "`." : "";
		}
		function Et(e, t, n, r) {
			if (e = e.options, t) {
				t = {};
				for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
				for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
			} else {
				for (n = "" + pt(n), t = null, i = 0; i < e.length; i++) {
					if (e[i].value === n) {
						e[i].selected = !0, r && (e[i].defaultSelected = !0);
						return;
					}
					t !== null || e[i].disabled || (t = e[i]);
				}
				t !== null && (t.selected = !0);
			}
		}
		function Dt(e, t) {
			for (e = 0; e < pm.length; e++) {
				var n = pm[e];
				if (t[n] != null) {
					var r = Kf(t[n]);
					t.multiple && !r ? console.error("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Tt()) : !t.multiple && r && console.error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Tt());
				}
			}
			t.value === void 0 || t.defaultValue === void 0 || fm || (console.error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"), fm = !0);
		}
		function Ot(e, t) {
			t.value === void 0 || t.defaultValue === void 0 || mm || (console.error("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components", we() || "A component"), mm = !0), t.children != null && t.value == null && console.error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
		}
		function kt(e, t, n) {
			if (t != null && (t = "" + pt(t), t !== e.value && (e.value = t), n == null)) {
				e.defaultValue !== t && (e.defaultValue = t);
				return;
			}
			e.defaultValue = n == null ? "" : "" + pt(n);
		}
		function At(e, t, n, r) {
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
			n = pt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), gt(e);
		}
		function jt(e, t) {
			return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? jt(e.children[0], t) : e;
		}
		function Mt(e) {
			return "  " + "  ".repeat(e);
		}
		function Nt(e) {
			return "+ " + "  ".repeat(e);
		}
		function Pt(e) {
			return "- " + "  ".repeat(e);
		}
		function Ft(e) {
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
		function It(e, t) {
			return hm.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? "{\"...\"}" : "{" + e.slice(0, t - 7) + "...\"}" : "{" + e + "}") : e.length > t ? 5 > t ? "{\"...\"}" : e.slice(0, t - 3) + "..." : e;
		}
		function Lt(e, t, n) {
			var r = 120 - 2 * n;
			if (t === null) return Nt(n) + It(e, r) + "\n";
			if (typeof t == "string") {
				for (var i = 0; i < t.length && i < e.length && t.charCodeAt(i) === e.charCodeAt(i); i++);
				return i > r - 8 && 10 < i && (e = "..." + e.slice(i - 8), t = "..." + t.slice(i - 8)), Nt(n) + It(e, r) + "\n" + Pt(n) + It(t, r) + "\n";
			}
			return Mt(n) + It(e, r) + "\n";
		}
		function Rt(e) {
			return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(e, t) {
				return t;
			});
		}
		function zt(e, t) {
			switch (typeof e) {
				case "string": return e = JSON.stringify(e), e.length > t ? 5 > t ? "\"...\"" : e.slice(0, t - 4) + "...\"" : e;
				case "object":
					if (e === null) return "null";
					if (Kf(e)) return "[...]";
					if (e.$$typeof === Af) return (t = se(e.type)) ? "<" + t + ">" : "<...>";
					var n = Rt(e);
					if (n === "Object") {
						for (var r in n = "", t -= 2, e) if (e.hasOwnProperty(r)) {
							var i = JSON.stringify(r);
							if (i !== "\"" + r + "\"" && (r = i), t -= r.length - 2, i = zt(e[r], 15 > t ? t : 15), t -= i.length, 0 > t) {
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
		function Bt(e, t) {
			return typeof e != "string" || hm.test(e) ? "{" + zt(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? "\"...\"" : "\"" + e.slice(0, t - 5) + "...\"" : "\"" + e + "\"";
		}
		function Vt(e, t, n) {
			var r = 120 - n.length - e.length, i = [], a;
			for (a in t) if (t.hasOwnProperty(a) && a !== "children") {
				var o = Bt(t[a], 120 - n.length - a.length - 1);
				r -= a.length + o.length + 2, i.push(a + "=" + o);
			}
			return i.length === 0 ? n + "<" + e + ">\n" : 0 < r ? n + "<" + e + " " + i.join(" ") + ">\n" : n + "<" + e + "\n" + n + "  " + i.join("\n" + n + "  ") + "\n" + n + ">\n";
		}
		function Ht(e, t, n) {
			var r = "", i = V({}, t), a;
			for (a in e) if (e.hasOwnProperty(a)) {
				delete i[a];
				var o = 120 - 2 * n - a.length - 2, s = zt(e[a], o);
				t.hasOwnProperty(a) ? (o = zt(t[a], o), r += Nt(n) + a + ": " + s + "\n", r += Pt(n) + a + ": " + o + "\n") : r += Nt(n) + a + ": " + s + "\n";
			}
			for (var c in i) i.hasOwnProperty(c) && (e = zt(i[c], 120 - 2 * n - c.length - 2), r += Pt(n) + c + ": " + e + "\n");
			return r;
		}
		function Ut(e, t, n, r) {
			var i = "", a = /* @__PURE__ */ new Map();
			for (l in n) n.hasOwnProperty(l) && a.set(l.toLowerCase(), l);
			if (a.size === 1 && a.has("children")) i += Vt(e, t, Mt(r));
			else {
				for (var o in t) if (t.hasOwnProperty(o) && o !== "children") {
					var s = 120 - 2 * (r + 1) - o.length - 1, c = a.get(o.toLowerCase());
					if (c !== void 0) {
						a.delete(o.toLowerCase());
						var l = t[o];
						c = n[c];
						var u = Bt(l, s);
						s = Bt(c, s), typeof l == "object" && l && typeof c == "object" && c && Rt(l) === "Object" && Rt(c) === "Object" && (2 < Object.keys(l).length || 2 < Object.keys(c).length || -1 < u.indexOf("...") || -1 < s.indexOf("...")) ? i += Mt(r + 1) + o + "={{\n" + Ht(l, c, r + 2) + Mt(r + 1) + "}}\n" : (i += Nt(r + 1) + o + "=" + u + "\n", i += Pt(r + 1) + o + "=" + s + "\n");
					} else i += Mt(r + 1) + o + "=" + Bt(t[o], s) + "\n";
				}
				a.forEach(function(e) {
					if (e !== "children") {
						var t = 120 - 2 * (r + 1) - e.length - 1;
						i += Pt(r + 1) + e + "=" + Bt(n[e], t) + "\n";
					}
				}), i = i === "" ? Mt(r) + "<" + e + ">\n" : Mt(r) + "<" + e + "\n" + i + Mt(r) + ">\n";
			}
			return e = n.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (a = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (a = "" + t), i += Lt(a, "" + e, r + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (i = e == null ? i + Lt("" + t, null, r + 1) : i + Lt("" + t, void 0, r + 1)), i;
		}
		function Wt(e, t) {
			var n = Ft(e);
			if (n === null) {
				for (n = "", e = e.child; e;) n += Wt(e, t), e = e.sibling;
				return n;
			}
			return Mt(t) + "<" + n + ">\n";
		}
		function Gt(e, t) {
			var n = jt(e, t);
			if (n !== e && (e.children.length !== 1 || e.children[0] !== n)) return Mt(t) + "...\n" + Gt(n, t + 1);
			n = "";
			var r = e.fiber._debugInfo;
			if (r) for (var i = 0; i < r.length; i++) {
				var a = r[i].name;
				typeof a == "string" && (n += Mt(t) + "<" + a + ">\n", t++);
			}
			if (r = "", i = e.fiber.pendingProps, e.fiber.tag === 6) r = Lt(i, e.serverProps, t), t++;
			else if (a = Ft(e.fiber), a !== null) if (e.serverProps === void 0) {
				r = t;
				var o = 120 - 2 * r - a.length - 2, s = "";
				for (l in i) if (i.hasOwnProperty(l) && l !== "children") {
					var c = Bt(i[l], 15);
					if (o -= l.length + c.length + 2, 0 > o) {
						s += " ...";
						break;
					}
					s += " " + l + "=" + c;
				}
				r = Mt(r) + "<" + a + s + ">\n", t++;
			} else e.serverProps === null ? (r = Vt(a, i, Nt(t)), t++) : typeof e.serverProps == "string" ? console.error("Should not have matched a non HostText fiber to a Text node. This is a bug in React.") : (r = Ut(a, i, e.serverProps, t), t++);
			var l = "";
			for (i = e.fiber.child, a = 0; i && a < e.children.length;) o = e.children[a], o.fiber === i ? (l += Gt(o, t), a++) : l += Wt(i, t), i = i.sibling;
			for (i && 0 < e.children.length && (l += Mt(t) + "...\n"), i = e.serverTail, e.serverProps === null && t--, e = 0; e < i.length; e++) a = i[e], l = typeof a == "string" ? l + (Pt(t) + It(a, 120 - 2 * t) + "\n") : l + Vt(a.type, a.props, Pt(t));
			return n + r + l;
		}
		function Kt(e) {
			try {
				return "\n\n" + Gt(e, 0);
			} catch {
				return "";
			}
		}
		function qt(e, t, n) {
			for (var r = t, i = null, a = 0; r;) r === e && (a = 0), i = {
				fiber: r,
				children: i === null ? [] : [i],
				serverProps: r === t ? n : r === e ? null : void 0,
				serverTail: [],
				distanceFromLeaf: a
			}, a++, r = r.return;
			return i === null ? "" : Kt(i).replaceAll(/^[+-]/gm, ">");
		}
		function Jt(e, t) {
			var n = V({}, e || bm), r = { tag: t };
			return _m.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), vm.indexOf(t) !== -1 && (n.pTagInButtonScope = null), gm.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = r, t === "form" && (n.formTag = r), t === "a" && (n.aTagInScope = r), t === "button" && (n.buttonTagInScope = r), t === "nobr" && (n.nobrTagInScope = r), t === "p" && (n.pTagInButtonScope = r), t === "li" && (n.listItemTagAutoclosing = r), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = r), t === "#document" || t === "html" ? n.containerTagInScope = null : n.containerTagInScope ||= r, e !== null || t !== "#document" && t !== "html" && t !== "body" ? !0 === n.implicitRootScope && (n.implicitRootScope = !1) : n.implicitRootScope = !0, n;
		}
		function Yt(e, t, n) {
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
		function Xt(e, t) {
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
		function Zt(e, t) {
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
		function Qt(e, t) {
			t ||= bm;
			var n = t.current;
			if (t = (n = Yt(e, n && n.tag, t.implicitRootScope) ? null : n) ? null : Xt(e, t), t = n || t, !t) return !0;
			var r = t.tag;
			if (t = String(!!n) + "|" + e + "|" + r, xm[t]) return !1;
			xm[t] = !0;
			var i = (t = mp) ? Zt(t.return, r) : null, a = t !== null && i !== null ? qt(i, t, null) : "", o = "<" + e + ">";
			return n ? (n = "", r === "table" && e === "tr" && (n += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error("In HTML, %s cannot be a child of <%s>.%s\nThis will cause a hydration error.%s", o, r, n, a)) : console.error("In HTML, %s cannot be a descendant of <%s>.\nThis will cause a hydration error.%s", o, r, a), t && (e = t.return, i === null || e === null || i === e && e._debugOwner === t._debugOwner || T(i, function() {
				console.error("<%s> cannot contain a nested %s.\nSee this log for the ancestor stack trace.", r, o);
			})), !1;
		}
		function $t(e, t, n) {
			if (n || Yt("#text", t, !1)) return !0;
			if (n = "#text|" + t, xm[n]) return !1;
			xm[n] = !0;
			var r = (n = mp) ? Zt(n, t) : null;
			return n = n !== null && r !== null ? qt(r, n, n.tag === 6 ? null : { children: null }) : "", /\S/.test(e) ? console.error("In HTML, text nodes cannot be a child of <%s>.\nThis will cause a hydration error.%s", t, n) : console.error("In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.\nThis will cause a hydration error.%s", t, n), !1;
		}
		function en(e, t) {
			if (t) {
				var n = e.firstChild;
				if (n && n === e.lastChild && n.nodeType === 3) {
					n.nodeValue = t;
					return;
				}
			}
			e.textContent = t;
		}
		function tn(e) {
			return e.replace(Dm, function(e, t) {
				return t.toUpperCase();
			});
		}
		function nn(e, t, n) {
			var r = t.indexOf("--") === 0;
			r || (-1 < t.indexOf("-") ? km.hasOwnProperty(t) && km[t] || (km[t] = !0, console.error("Unsupported style property %s. Did you mean %s?", t, tn(t.replace(Em, "ms-")))) : Tm.test(t) ? km.hasOwnProperty(t) && km[t] || (km[t] = !0, console.error("Unsupported vendor-prefixed style property %s. Did you mean %s?", t, t.charAt(0).toUpperCase() + t.slice(1))) : !Om.test(n) || Am.hasOwnProperty(n) && Am[n] || (Am[n] = !0, console.error("Style property values shouldn't contain a semicolon. Try \"%s: %s\" instead.", t, n.replace(Om, ""))), typeof n == "number" && (isNaN(n) ? jm || (jm = !0, console.error("`NaN` is an invalid value for the `%s` css style property.", t)) : isFinite(n) || Mm || (Mm = !0, console.error("`Infinity` is an invalid value for the `%s` css style property.", t)))), n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Nm.has(t) ? t === "float" ? e.cssFloat = n : (je(n, t), e[t] = ("" + n).trim()) : e[t] = n + "px";
		}
		function rn(e, t, n) {
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
				for (var f in t) l = t[f], t.hasOwnProperty(f) && n[f] !== l && nn(e, f, l);
			} else for (r in t) t.hasOwnProperty(r) && nn(e, r, t[r]);
		}
		function an(e) {
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
		function on(e) {
			return Im.get(e) || e;
		}
		function sn(e, t) {
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
		function cn(e, t) {
			var n = [], r;
			for (r in t) sn(e, r) || n.push(r);
			t = n.map(function(e) {
				return "`" + e + "`";
			}).join(", "), n.length === 1 ? console.error("Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e) : 1 < n.length && console.error("Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e);
		}
		function ln(e, t, n, r) {
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
		function un(e, t, n) {
			var r = [], i;
			for (i in t) ln(e, i, t[i], n) || r.push(i);
			t = r.map(function(e) {
				return "`" + e + "`";
			}).join(", "), r.length === 1 ? console.error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e) : 1 < r.length && console.error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e);
		}
		function dn(e) {
			return Jm.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
		}
		function fn() {}
		function pn(e) {
			return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
		}
		function mn(e) {
			var t = tt(e);
			if (t && (e = t.stateNode)) {
				var n = e[Kp] || null;
				a: switch (e = t.stateNode, t.type) {
					case "input":
						if (xt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
							for (n = e; n.parentNode;) n = n.parentNode;
							for (Ae(t, "name"), n = n.querySelectorAll("input[name=\"" + yt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
								var r = n[t];
								if (r !== e && r.form === e.form) {
									var i = r[Kp] || null;
									if (!i) throw Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
									xt(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
								}
							}
							for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && _t(r);
						}
						break a;
					case "textarea":
						kt(e, n.value, n.defaultValue);
						break a;
					case "select": t = n.value, t != null && Et(e, !!n.multiple, t, !1);
				}
			}
		}
		function hn(e, t, n) {
			if (Qm) return e(t, n);
			Qm = !0;
			try {
				return e(t);
			} finally {
				if (Qm = !1, (Xm !== null || Zm !== null) && (ol(), Xm && (t = Xm, e = Zm, Zm = Xm = null, mn(t), e))) for (t = 0; t < e.length; t++) mn(e[t]);
			}
		}
		function gn(e, t) {
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
		function _n() {
			if (ih) return ih;
			var e, t = rh, n = t.length, r, i = "value" in nh ? nh.value : nh.textContent, a = i.length;
			for (e = 0; e < n && t[e] === i[e]; e++);
			var o = n - e;
			for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
			return ih = i.slice(e, 1 < r ? 1 - r : void 0);
		}
		function vn(e) {
			var t = e.keyCode;
			return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
		}
		function yn() {
			return !0;
		}
		function bn() {
			return !1;
		}
		function xn(e) {
			function t(t, n, r, i, a) {
				for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
				return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? yn : bn, this.isPropagationStopped = bn, this;
			}
			return V(t.prototype, {
				preventDefault: function() {
					this.defaultPrevented = !0;
					var e = this.nativeEvent;
					e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = yn);
				},
				stopPropagation: function() {
					var e = this.nativeEvent;
					e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = yn);
				},
				persist: function() {},
				isPersistent: yn
			}), t;
		}
		function Sn(e) {
			var t = this.nativeEvent;
			return t.getModifierState ? t.getModifierState(e) : (e = Sh[e]) ? !!t[e] : !1;
		}
		function Cn() {
			return Sn;
		}
		function wn(e, t) {
			switch (e) {
				case "keyup": return kh.indexOf(t.keyCode) !== -1;
				case "keydown": return t.keyCode !== Ah;
				case "keypress":
				case "mousedown":
				case "focusout": return !0;
				default: return !1;
			}
		}
		function Tn(e) {
			return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
		}
		function En(e, t) {
			switch (e) {
				case "compositionend": return Tn(t);
				case "keypress": return t.which === Fh ? (Lh = !0, Ih) : null;
				case "textInput": return e = t.data, e === Ih && Lh ? null : e;
				default: return null;
			}
		}
		function Dn(e, t) {
			if (Rh) return e === "compositionend" || !jh && wn(e, t) ? (e = _n(), ih = rh = nh = null, Rh = !1, e) : null;
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
		function On(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t === "input" ? !!zh[e.type] : t === "textarea";
		}
		function kn(e) {
			if (!$m) return !1;
			e = "on" + e;
			var t = e in document;
			return t ||= (t = document.createElement("div"), t.setAttribute(e, "return;"), typeof t[e] == "function"), t;
		}
		function An(e, t, n, r) {
			Xm ? Zm ? Zm.push(r) : Zm = [r] : Xm = r, t = pu(t, "onChange"), 0 < t.length && (n = new oh("onChange", "change", null, n, r), e.push({
				event: n,
				listeners: t
			}));
		}
		function jn(e) {
			su(e, 0);
		}
		function Mn(e) {
			if (_t(nt(e))) return e;
		}
		function Nn(e, t) {
			if (e === "change") return t;
		}
		function Pn() {
			Bh && (Bh.detachEvent("onpropertychange", Fn), Vh = Bh = null);
		}
		function Fn(e) {
			if (e.propertyName === "value" && Mn(Vh)) {
				var t = [];
				An(t, Vh, e, pn(e)), hn(jn, t);
			}
		}
		function In(e, t, n) {
			e === "focusin" ? (Pn(), Bh = t, Vh = n, Bh.attachEvent("onpropertychange", Fn)) : e === "focusout" && Pn();
		}
		function Ln(e) {
			if (e === "selectionchange" || e === "keyup" || e === "keydown") return Mn(Vh);
		}
		function Rn(e, t) {
			if (e === "click") return Mn(t);
		}
		function zn(e, t) {
			if (e === "input" || e === "change") return Mn(t);
		}
		function Bn(e, t) {
			return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
		}
		function Vn(e, t) {
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
		function Hn(e) {
			for (; e && e.firstChild;) e = e.firstChild;
			return e;
		}
		function Un(e, t) {
			var n = Hn(e);
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
				n = Hn(n);
			}
		}
		function Wn(e, t) {
			return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Wn(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
		}
		function Gn(e) {
			e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
			for (var t = vt(e.document); t instanceof e.HTMLIFrameElement;) {
				try {
					var n = typeof t.contentWindow.location.href == "string";
				} catch {
					n = !1;
				}
				if (n) e = t.contentWindow;
				else break;
				t = vt(e.document);
			}
			return t;
		}
		function Kn(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
		}
		function qn(e, t, n) {
			var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
			Jh || Gh == null || Gh !== vt(r) || (r = Gh, "selectionStart" in r && Kn(r) ? r = {
				start: r.selectionStart,
				end: r.selectionEnd
			} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
				anchorNode: r.anchorNode,
				anchorOffset: r.anchorOffset,
				focusNode: r.focusNode,
				focusOffset: r.focusOffset
			}), qh && Vn(qh, r) || (qh = r, r = pu(Kh, "onSelect"), 0 < r.length && (t = new oh("onSelect", "select", null, t, n), e.push({
				event: t,
				listeners: r
			}), t.target = Gh)));
		}
		function Jn(e, t) {
			var n = {};
			return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
		}
		function Yn(e) {
			if (Xh[e]) return Xh[e];
			if (!Yh[e]) return e;
			var t = Yh[e], n;
			for (n in t) if (t.hasOwnProperty(n) && n in Zh) return Xh[e] = t[n];
			return e;
		}
		function Xn(e, t) {
			ag.set(e, t), at(t, [e]);
		}
		function Zn(e) {
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
		function Qn(e, t, n, r) {
			for (var i in e) gp.call(e, i) && i[0] !== "_" && $n(i, e[i], t, n, r);
		}
		function $n(e, t, n, r, i) {
			switch (typeof t) {
				case "object": if (t === null) {
					t = "null";
					break;
				} else {
					if (t.$$typeof === Af) {
						var a = se(t.type) || "…", o = t.key;
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
						for (var l in n.push([i + "\xA0\xA0".repeat(r) + e, "<" + a]), o !== null && $n("key", o, n, r + 1, i), e = !1, t) l === "children" ? t.children != null && (!Kf(t.children) || 0 < t.children.length) && (e = !0) : gp.call(t, l) && l[0] !== "_" && $n(l, t[l], n, r + 1, i);
						n.push(["", e ? ">…</" + a + ">" : "/>"]);
						return;
					}
					if (a = Object.prototype.toString.call(t), a = a.slice(8, a.length - 1), a === "Array") {
						if (l = Zn(t), l === hg || l === pg) {
							t = JSON.stringify(t);
							break;
						} else if (l === gg) {
							for (n.push([i + "\xA0\xA0".repeat(r) + e, ""]), e = 0; e < t.length; e++) a = t[e], $n(a[0], a[1], n, r + 1, i);
							return;
						}
					}
					if (a === "Promise") {
						if (t.status === "fulfilled") {
							if (a = n.length, $n(e, t.value, n, r, i), n.length > a) {
								n = n[a], n[1] = "Promise<" + (n[1] || "Object") + ">";
								return;
							}
						} else if (t.status === "rejected" && (a = n.length, $n(e, t.reason, n, r, i), n.length > a)) {
							n = n[a], n[1] = "Rejected Promise<" + n[1] + ">";
							return;
						}
						n.push(["\xA0\xA0".repeat(r) + e, "Promise"]);
						return;
					}
					a === "Object" && (l = Object.getPrototypeOf(t)) && typeof l.constructor == "function" && (a = l.constructor.name), n.push([i + "\xA0\xA0".repeat(r) + e, a === "Object" ? 3 > r ? "" : "…" : a]), 3 > r && Qn(t, n, r + 1, i);
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
		function er(e, t, n, r) {
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
									o = se(s.type) || "…", i = "\xA0\xA0".repeat(r) + a, o = "<" + o + " … />", n.push([_g + i, o], [vg + i, o]), i = !1;
									continue;
								}
							} else {
								var c = Object.prototype.toString.call(o), l = Object.prototype.toString.call(s);
								if (c === l && (l === "[object Object]" || l === "[object Array]")) {
									c = [yg + "\xA0\xA0".repeat(r) + a, l === "[object Array]" ? "Array" : ""], n.push(c), l = n.length, er(o, s, n, r + 1) ? l === n.length && (c[1] = "Referentially unequal but deeply equal objects. Consider memoization.") : i = !1;
									continue;
								}
							}
							else if (typeof o == "function" && typeof s == "function" && o.name === s.name && o.length === s.length && (c = Function.prototype.toString.call(o), l = Function.prototype.toString.call(s), c === l)) {
								o = s.name === "" ? "() => {}" : s.name + "() {}", n.push([yg + "\xA0\xA0".repeat(r) + a, o + " Referentially unequal function closure. Consider memoization."]);
								continue;
							}
						}
						$n(a, o, n, r, _g), $n(a, s, n, r, vg);
					}
					i = !1;
				}
			} else n.push([vg + "\xA0\xA0".repeat(r) + a, "…"]), i = !1;
			return i;
		}
		function tr(e) {
			W = e & 63 ? "Blocking" : e & 64 ? "Gesture" : e & 4194176 ? "Transition" : e & 62914560 ? "Suspense" : e & 2080374784 ? "Idle" : "Other";
		}
		function nr(e, t, n, r) {
			bg && (wg.start = t, wg.end = n, Cg.color = "warning", Cg.tooltipText = r, Cg.properties = null, (e = e._debugTask) ? e.run(performance.measure.bind(performance, r, wg)) : performance.measure(r, wg));
		}
		function rr(e, t, n) {
			nr(e, t, n, "Reconnect");
		}
		function ir(e, t, n, r, i) {
			var a = x(e);
			if (a !== null && bg) {
				var o = e.alternate, s = e.actualDuration;
				if (o === null || o.child !== e.child) for (var c = e.child; c !== null; c = c.sibling) s -= c.actualDuration;
				r = .5 > s ? r ? "tertiary-light" : "primary-light" : 10 > s ? r ? "tertiary" : "primary" : 100 > s ? r ? "tertiary-dark" : "primary-dark" : "error";
				var l = e.memoizedProps;
				s = e._debugTask, l !== null && o !== null && o.memoizedProps !== l ? (c = [Tg], l = er(o.memoizedProps, l, c, 0), 1 < c.length && (l && !Sg && (o.lanes & i) === 0 && 100 < e.actualDuration ? (Sg = !0, c[0] = Dg, Cg.color = "warning", Cg.tooltipText = Eg) : (Cg.color = r, Cg.tooltipText = a), Cg.properties = c, wg.start = t, wg.end = n, s == null ? performance.measure("​" + a, wg) : s.run(performance.measure.bind(performance, "​" + a, wg)))) : s == null ? console.timeStamp(a, t, n, xg, void 0, r) : s.run(console.timeStamp.bind(console, a, t, n, xg, void 0, r));
			}
		}
		function ar(e, t, n, r) {
			if (bg) {
				var i = x(e);
				if (i !== null) {
					for (var a = null, o = [], s = 0; s < r.length; s++) {
						var c = r[s];
						a == null && c.source !== null && (a = c.source._debugTask), c = c.value, o.push(["Error", typeof c == "object" && c && typeof c.message == "string" ? String(c.message) : String(c)]);
					}
					e.key !== null && $n("key", e.key, o, 0, ""), e.memoizedProps !== null && Qn(e.memoizedProps, o, 0, ""), a ??= e._debugTask, e = {
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
		function or(e, t, n, r, i) {
			if (i !== null) {
				if (bg) {
					var a = x(e);
					if (a !== null) {
						r = [];
						for (var o = 0; o < i.length; o++) {
							var s = i[o].value;
							r.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
						}
						e.key !== null && $n("key", e.key, r, 0, ""), e.memoizedProps !== null && Qn(e.memoizedProps, r, 0, ""), t = {
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
			} else a = x(e), a !== null && bg && (i = 1 > r ? "secondary-light" : 100 > r ? "secondary" : 500 > r ? "secondary-dark" : "error", (e = e._debugTask) ? e.run(console.timeStamp.bind(console, a, t, n, xg, void 0, i)) : console.timeStamp(a, t, n, xg, void 0, i));
		}
		function sr(e, t, n, r) {
			if (bg && !(t <= e)) {
				var i = (n & 738197653) === n ? "tertiary-dark" : "primary-dark";
				n = (n & 536870912) === n ? "Prepared" : (n & 201326741) === n ? "Hydrated" : "Render", r ? r.run(console.timeStamp.bind(console, n, e, t, W, U, i)) : console.timeStamp(n, e, t, W, U, i);
			}
		}
		function cr(e, t, n, r) {
			!bg || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Prewarm", e, t, W, U, n)) : console.timeStamp("Prewarm", e, t, W, U, n));
		}
		function lr(e, t, n, r) {
			!bg || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Suspended", e, t, W, U, n)) : console.timeStamp("Suspended", e, t, W, U, n));
		}
		function ur(e, t, n, r, i, a) {
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
		function dr(e, t, n, r) {
			!bg || t <= e || (r ? r.run(console.timeStamp.bind(console, "Errored", e, t, W, U, "error")) : console.timeStamp("Errored", e, t, W, U, "error"));
		}
		function fr(e, t, n, r) {
			!bg || t <= e || (r ? r.run(console.timeStamp.bind(console, n, e, t, W, U, "secondary-light")) : console.timeStamp(n, e, t, W, U, "secondary-light"));
		}
		function pr(e, t, n, r, i) {
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
		function mr(e, t, n) {
			!bg || t <= e || (n ? n.run(console.timeStamp.bind(console, "Animating", e, t, W, U, "secondary-dark")) : console.timeStamp("Animating", e, t, W, U, "secondary-dark"));
		}
		function hr() {
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
				a !== 0 && yr(n, i, a);
			}
		}
		function gr(e, t, n, r) {
			Ag[jg++] = e, Ag[jg++] = t, Ag[jg++] = n, Ag[jg++] = r, Mg |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
		}
		function _r(e, t, n, r) {
			return gr(e, t, n, r), br(e);
		}
		function vr(e, t) {
			return gr(e, null, null, t), br(e);
		}
		function yr(e, t, n) {
			e.lanes |= n;
			var r = e.alternate;
			r !== null && (r.lanes |= n);
			for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & Og || (i = !0)), e = a, a = a.return;
			return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Pp(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
		}
		function br(e) {
			if (Kx > Gx) throw Zx = Kx = 0, Qx = qx = null, Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
			Zx > Xx && (Zx = 0, Qx = null, console.error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.")), e.alternate === null && e.flags & 4098 && Wl(e);
			for (var t = e, n = t.return; n !== null;) t.alternate === null && t.flags & 4098 && Wl(e), t = n, n = t.return;
			return t.tag === 3 ? t.stateNode : null;
		}
		function xr(e) {
			if (Pg === null) return e;
			var t = Pg(e);
			return t === void 0 ? e : t.current;
		}
		function Sr(e) {
			if (Pg === null) return e;
			var t = Pg(e);
			return t === void 0 ? e != null && typeof e.render == "function" && (t = xr(e.render), e.render !== t) ? (t = {
				$$typeof: Lf,
				render: t
			}, e.displayName !== void 0 && (t.displayName = e.displayName), t) : e : t.current;
		}
		function Cr(e, t) {
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
		function wr(e) {
			Pg !== null && typeof WeakSet == "function" && (Fg === null && (Fg = /* @__PURE__ */ new WeakSet()), Fg.add(e));
		}
		function Tr(e, t, n) {
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
				if (r = !1, c !== null && (c = Pg(c), c !== void 0 && (n.has(c) ? r = !0 : t.has(c) && (s === 1 ? r = !0 : l = !0))), Fg !== null && (Fg.has(e) || i !== null && Fg.has(i)) && (r = !0), r && (e._debugNeedsRemount = !0), (r || l) && (i = vr(e, 2), i !== null && tl(i, e, 2)), a === null || r || Tr(a, t, n), o === null) break;
				e = o;
			} while (1);
		}
		function Er(e, t, n, r) {
			this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, Bg || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
		}
		function Dr(e) {
			return e = e.prototype, !(!e || !e.isReactComponent);
		}
		function Or(e, t) {
			var n = e.alternate;
			switch (n === null ? (n = g(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugOwner = e._debugOwner, n._debugStack = e._debugStack, n._debugTask = e._debugTask, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null, n.actualDuration = -0, n.actualStartTime = -1.1), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugInfo = e._debugInfo, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
				case 0:
				case 15:
					n.type = xr(e.type);
					break;
				case 1:
					n.type = xr(e.type);
					break;
				case 11: n.type = Sr(e.type);
			}
			return n;
		}
		function kr(e, t) {
			e.flags &= 65011714;
			var n = e.alternate;
			return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration), e;
		}
		function Ar(e, t, n, r, i, a) {
			var o = 0, s = e;
			if (typeof e == "function") Dr(e) && (o = 1), s = xr(s);
			else if (typeof e == "string") o = w(), o = Ud(e, n, o) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
			else a: switch (e) {
				case Hf: return t = g(31, n, t, i), t.elementType = Hf, t.lanes = a, t;
				case Mf: return Mr(n.children, i, a, t);
				case Nf:
					o = 8, i |= Lg, i |= Rg;
					break;
				case Pf: return e = n, r = i, typeof e.id != "string" && console.error("Profiler must specify an \"id\" of type `string` as a prop. Received the type `%s` instead.", typeof e.id), t = g(12, e, t, r | K), t.elementType = Pf, t.lanes = a, t.stateNode = {
					effectDuration: 0,
					passiveEffectDuration: 0
				}, t;
				case Rf: return t = g(13, n, t, i), t.elementType = Rf, t.lanes = a, t;
				case zf: return t = g(19, n, t, i), t.elementType = zf, t.lanes = a, t;
				default:
					if (typeof e == "object" && e) switch (e.$$typeof) {
						case If:
							o = 10;
							break a;
						case Ff:
							o = 9;
							break a;
						case Lf:
							o = 11, s = Sr(s);
							break a;
						case Bf:
							o = 14;
							break a;
						case Vf:
							o = 16, s = null;
							break a;
					}
					s = "", (e === void 0 || typeof e == "object" && e && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? n = "null" : Kf(e) ? n = "array" : e !== void 0 && e.$$typeof === Af ? (n = "<" + (se(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : n = typeof e, (o = r ? ce(r) : null) && (s += "\n\nCheck the render method of `" + o + "`."), o = 29, n = Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (n + "." + s)), s = null;
			}
			return t = g(o, n, t, i), t.elementType = e, t.type = s, t.lanes = a, t._debugOwner = r, t;
		}
		function jr(e, t, n) {
			return t = Ar(e.type, e.key, e.props, e._owner, t, n), t._debugOwner = e._owner, t._debugStack = e._debugStack, t._debugTask = e._debugTask, t;
		}
		function Mr(e, t, n, r) {
			return e = g(7, e, r, t), e.lanes = n, e;
		}
		function Nr(e, t, n) {
			return e = g(6, e, null, t), e.lanes = n, e;
		}
		function Pr(e) {
			var t = g(18, null, null, G);
			return t.stateNode = e, t;
		}
		function Fr(e, t, n) {
			return t = g(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
				containerInfo: e.containerInfo,
				pendingChildren: null,
				implementation: e.implementation
			}, t;
		}
		function Ir(e, t) {
			if (typeof e == "object" && e) {
				var n = Vg.get(e);
				return n === void 0 ? (t = {
					value: e,
					source: t,
					stack: Se(t)
				}, Vg.set(e, t), t) : n;
			}
			return {
				value: e,
				source: t,
				stack: Se(t)
			};
		}
		function Lr(e, t) {
			Ur(), Hg[Ug++] = Gg, Hg[Ug++] = Wg, Wg = e, Gg = t;
		}
		function Rr(e, t, n) {
			Ur(), Kg[qg++] = Yg, Kg[qg++] = Xg, Kg[qg++] = Jg, Jg = e;
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
		function zr(e) {
			Ur(), e.return !== null && (Lr(e, 1), Rr(e, 1, 0));
		}
		function Br(e) {
			for (; e === Wg;) Wg = Hg[--Ug], Hg[Ug] = null, Gg = Hg[--Ug], Hg[Ug] = null;
			for (; e === Jg;) Jg = Kg[--qg], Kg[qg] = null, Xg = Kg[--qg], Kg[qg] = null, Yg = Kg[--qg], Kg[qg] = null;
		}
		function Vr() {
			return Ur(), Jg === null ? null : {
				id: Yg,
				overflow: Xg
			};
		}
		function Hr(e, t) {
			Ur(), Kg[qg++] = Yg, Kg[qg++] = Xg, Kg[qg++] = Jg, Yg = t.id, Xg = t.overflow, Jg = e;
		}
		function Ur() {
			$g || console.error("Expected to be hydrating. This is a bug in React. Please file an issue.");
		}
		function Wr(e, t) {
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
			var n = Wr(e.return, t + 1).children;
			return 0 < n.length && n[n.length - 1].fiber === e ? (n = n[n.length - 1], n.distanceFromLeaf > t && (n.distanceFromLeaf = t), n) : (t = {
				fiber: e,
				children: [],
				serverProps: void 0,
				serverTail: [],
				distanceFromLeaf: t
			}, n.push(t), t);
		}
		function Gr() {
			$g && console.error("We should not be hydrating here. This is a bug in React. Please file a bug.");
		}
		function Kr(e, t) {
			e_ || (e = Wr(e, 0), e.serverProps = null, t !== null && (t = vd(t), e.serverTail.push(t)));
		}
		function qr(e) {
			var t = 1 < arguments.length && arguments[1] !== void 0 && arguments[1], n = "", r = t_;
			throw r !== null && (t_ = null, n = Kt(r)), $r(Ir(Error("Hydration failed because the server rendered " + (t ? "text" : "HTML") + " didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\nhttps://react.dev/link/hydration-mismatch" + n), e)), i_;
		}
		function Jr(e) {
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
					st("input", r), z("invalid", t), bt(t, r), St(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
					break;
				case "option":
					wt(t, r);
					break;
				case "select":
					st("select", r), z("invalid", t), Dt(t, r);
					break;
				case "textarea": st("textarea", r), z("invalid", t), Ot(t, r), At(t, r.value, r.defaultValue, r.children);
			}
			n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Su(t.textContent, n) ? (r.popover != null && (z("beforetoggle", t), z("toggle", t)), r.onScroll != null && z("scroll", t), r.onScrollEnd != null && z("scrollend", t), r.onClick != null && (t.onclick = fn), t = !0) : t = !1, t || qr(e, !0);
		}
		function Yr(e) {
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
		function Xr(e) {
			if (e !== Zg) return !1;
			if (!$g) return Yr(e), $g = !0, !1;
			var t = e.tag, n;
			if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Hu(e.type, e.memoizedProps)), n = !n), n && Qg) {
				for (n = Qg; n;) {
					var r = Wr(e, 0), i = vd(n);
					r.serverTail.push(i), n = i.type === "Suspense" ? bd(n) : _d(n.nextSibling);
				}
				qr(e);
			}
			if (Yr(e), t === 13) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				Qg = bd(e);
			} else if (t === 31) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				Qg = bd(e);
			} else t === 27 ? (t = Qg, $u(e.type) ? (e = nC, nC = null, Qg = e) : Qg = t) : Qg = Zg ? _d(e.stateNode.nextSibling) : null;
			return !0;
		}
		function Zr() {
			Qg = Zg = null, e_ = $g = !1;
		}
		function Qr() {
			var e = n_;
			return e !== null && (mx === null ? mx = e : mx.push.apply(mx, e), n_ = null), e;
		}
		function $r(e) {
			n_ === null ? n_ = [e] : n_.push(e);
		}
		function ei() {
			var e = t_;
			if (e !== null) {
				t_ = null;
				for (var t = Kt(e); 0 < e.children.length;) e = e.children[0];
				T(e.fiber, function() {
					console.error("A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\n%s%s", "https://react.dev/link/hydration-mismatch", t);
				});
			}
		}
		function ti() {
			l_ = c_ = null, u_ = !1;
		}
		function ni(e, t, n) {
			S(a_, t._currentValue, e), t._currentValue = n, S(o_, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== s_ && console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = s_;
		}
		function ri(e, t) {
			e._currentValue = a_.current;
			var n = o_.current;
			ue(o_, t), e._currentRenderer = n, ue(a_, t);
		}
		function ii(e, t, n) {
			for (; e !== null;) {
				var r = e.alternate;
				if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
				e = e.return;
			}
			e !== n && console.error("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
		}
		function ai(e, t, n, r) {
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
							a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), ii(a.return, n, e), r || (o = null);
							break a;
						}
						a = s.next;
					}
				} else if (i.tag === 18) {
					if (o = i.return, o === null) throw Error("We just came from a parent so we must have had a parent. This is a bug in React.");
					o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), ii(o, n, e), o = null;
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
		function oi(e, t, n, r) {
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
			e !== null && ai(t, e, n, r), t.flags |= 262144;
		}
		function si(e) {
			for (e = e.firstContext; e !== null;) {
				if (!Uh(e.context._currentValue, e.memoizedValue)) return !0;
				e = e.next;
			}
			return !1;
		}
		function ci(e) {
			c_ = e, l_ = null, e = e.dependencies, e !== null && (e.firstContext = null);
		}
		function li(e) {
			return u_ && console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), di(c_, e);
		}
		function ui(e, t) {
			return c_ === null && ci(e), di(e, t);
		}
		function di(e, t) {
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
		function fi() {
			return {
				controller: new d_(),
				data: /* @__PURE__ */ new Map(),
				refCount: 0
			};
		}
		function pi(e) {
			e.controller.signal.aborted && console.warn("A cache instance was retained after it was already freed. This likely indicates a bug in React."), e.refCount++;
		}
		function mi(e) {
			e.refCount--, 0 > e.refCount && console.warn("A cache instance was released after it was already freed. This likely indicates a bug in React."), e.refCount === 0 && f_(p_, function() {
				e.controller.abort();
			});
		}
		function hi(e, t, n) {
			e & 127 ? 0 > k_ && (k_ = h_(), A_ = g_(t), M_ = t, n != null && (N_ = x(n)), (Ub & (Pb | Fb)) !== Nb && (D_ = !0, j_ = __), e = Gu(), t = Wu(), e !== I_ || t !== F_ ? I_ = -1.1 : t !== null && (j_ = __), P_ = e, F_ = t) : e & 4194048 && 0 > B_ && (B_ = h_(), H_ = g_(t), U_ = t, n != null && (W_ = x(n)), 0 > z_) && (e = Gu(), t = Wu(), (e !== q_ || t !== K_) && (q_ = -1.1), G_ = e, K_ = t);
		}
		function gi(e) {
			if (0 > k_) {
				k_ = h_(), A_ = e._debugTask == null ? null : e._debugTask, (Ub & (Pb | Fb)) !== Nb && (j_ = __);
				var t = Gu(), n = Wu();
				t !== I_ || n !== F_ ? I_ = -1.1 : n !== null && (j_ = __), P_ = t, F_ = n;
			}
			0 > B_ && (B_ = h_(), H_ = e._debugTask == null ? null : e._debugTask, 0 > z_) && (e = Gu(), t = Wu(), (e !== q_ || t !== K_) && (q_ = -1.1), G_ = e, K_ = t);
		}
		function _i() {
			var e = w_;
			return w_ = 0, e;
		}
		function vi(e) {
			var t = w_;
			return w_ = e, t;
		}
		function yi(e) {
			var t = w_;
			return w_ += e, t;
		}
		function bi() {
			J = q = -1.1;
		}
		function xi() {
			var e = q;
			return q = -1.1, e;
		}
		function Si(e) {
			0 <= e && (q = e);
		}
		function Ci() {
			var e = T_;
			return T_ = -0, e;
		}
		function wi(e) {
			0 <= e && (T_ = e);
		}
		function Ti() {
			var e = E_;
			return E_ = null, e;
		}
		function Ei() {
			var e = D_;
			return D_ = !1, e;
		}
		function Di(e) {
			C_ = h_(), 0 > e.actualStartTime && (e.actualStartTime = C_);
		}
		function Oi(e) {
			if (0 <= C_) {
				var t = h_() - C_;
				e.actualDuration += t, e.selfBaseDuration = t, C_ = -1;
			}
		}
		function ki(e) {
			if (0 <= C_) {
				var t = h_() - C_;
				e.actualDuration += t, C_ = -1;
			}
		}
		function Ai() {
			if (0 <= C_) {
				var e = h_(), t = e - C_;
				C_ = -1, w_ += t, T_ += t, J = e;
			}
		}
		function ji(e) {
			E_ === null && (E_ = []), E_.push(e), S_ === null && (S_ = []), S_.push(e);
		}
		function Mi() {
			C_ = h_(), 0 > q && (q = C_);
		}
		function Ni(e) {
			for (var t = e.child; t;) e.actualDuration += t.actualDuration, t = t.sibling;
		}
		function Pi(e, t) {
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
			return iv++, t.then(Fi, Fi), t;
		}
		function Fi() {
			if (--iv === 0 && (-1 < B_ || (z_ = -1.1), rv !== null)) {
				ov !== null && (ov.status = "fulfilled");
				var e = rv;
				rv = null, av = 0, ov = null;
				for (var t = 0; t < e.length; t++) (0, e[t])();
			}
		}
		function Ii(e, t) {
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
		function Li() {
			var e = cv.current;
			return e === null ? Wb.pooledCache : e;
		}
		function Ri(e, t) {
			t === null ? S(cv, cv.current, e) : S(cv, t.pool, e);
		}
		function zi() {
			var e = Li();
			return e === null ? null : {
				parent: m_._currentValue,
				pool: e
			};
		}
		function Bi() {
			return {
				didWarnAboutUncachedPromise: !1,
				thenables: []
			};
		}
		function Vi(e) {
			return e = e.status, e === "fulfilled" || e === "rejected";
		}
		function Hi(e, t, n) {
			H.actQueue !== null && (H.didUsePromise = !0);
			var r = e.thenables;
			if (n = r[n], n === void 0 ? r.push(t) : n !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error("A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.")), t.then(fn, fn), t = n), t._debugInfo === void 0) {
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
				case "rejected": throw e = t.reason, Gi(e), e;
				default:
					if (typeof t.status == "string") t.then(fn, fn);
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
						case "rejected": throw e = t.reason, Gi(e), e;
					}
					throw Vv = t, Hv = !0, Lv;
			}
		}
		function Ui(e) {
			try {
				return Iv(e);
			} catch (e) {
				throw typeof e == "object" && e && typeof e.then == "function" ? (Vv = e, Hv = !0, Lv) : e;
			}
		}
		function Wi() {
			if (Vv === null) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
			var e = Vv;
			return Vv = null, Hv = !1, e;
		}
		function Gi(e) {
			if (e === Lv || e === zv) throw Error("Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
		}
		function Ki(e) {
			var t = Y;
			return e != null && (Y = t === null ? e : t.concat(e)), t;
		}
		function qi() {
			var e = Y;
			if (e != null) {
				for (var t = e.length - 1; 0 <= t; t--) if (e[t].name != null) {
					var n = e[t].debugTask;
					if (n != null) return n;
				}
			}
			return null;
		}
		function E(e, t, n) {
			for (var r = Object.keys(e.props), i = 0; i < r.length; i++) {
				var a = r[i];
				if (a !== "children" && a !== "key") {
					t === null && (t = jr(e, n.mode, 0), t._debugInfo = Y, t.return = n), T(t, function(e) {
						console.error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", e);
					}, a);
					break;
				}
			}
		}
		function Ji(e) {
			var t = Wv;
			return Wv += 1, Uv === null && (Uv = Bi()), Hi(Uv, e, t);
		}
		function Yi(e, t) {
			t = t.props.ref, e.ref = t === void 0 ? null : t;
		}
		function Xi(e, t) {
			throw t.$$typeof === kf ? Error("A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the \"react\" package is used.\n- A library pre-bundled an old copy of \"react\" or \"react/jsx-runtime\".\n- A compiler tries to \"inline\" JSX instead of using the runtime.") : (e = Object.prototype.toString.call(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."));
		}
		function Zi(e, t) {
			var n = qi();
			n === null ? Xi(e, t) : n.run(Xi.bind(null, e, t));
		}
		function Qi(e, t) {
			var n = x(e) || "Component";
			Jv[n] || (Jv[n] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  root.render(%s)", t, t, t) : console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  <%s>{%s}</%s>", t, t, n, t, n));
		}
		function $i(e, t) {
			var n = qi();
			n === null ? Qi(e, t) : n.run(Qi.bind(null, e, t));
		}
		function ea(e, t) {
			var n = x(e) || "Component";
			Yv[n] || (Yv[n] = !0, t = String(t), e.tag === 3 ? console.error("Symbols are not valid as a React child.\n  root.render(%s)", t) : console.error("Symbols are not valid as a React child.\n  <%s>%s</%s>", n, t, n));
		}
		function ta(e, t) {
			var n = qi();
			n === null ? ea(e, t) : n.run(ea.bind(null, e, t));
		}
		function na(e) {
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
				return e = Or(e, t), e.index = 0, e.sibling = null, e;
			}
			function a(t, n, r) {
				return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
			}
			function o(t) {
				return e && t.alternate === null && (t.flags |= 67108866), t;
			}
			function s(e, t, n, r) {
				return t === null || t.tag !== 6 ? (t = Nr(n, e.mode, r), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t) : (t = i(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function c(e, t, n, r) {
				var a = n.type;
				return a === Mf ? (t = u(e, t, n.props.children, r, n.key), E(n, t, e), t) : t !== null && (t.elementType === a || Cr(t, n) || typeof a == "object" && a && a.$$typeof === Vf && Ui(a) === t.type) ? (t = i(t, n.props), Yi(t, n), t.return = e, t._debugOwner = n._owner, t._debugInfo = Y, t) : (t = jr(n, e.mode, r), Yi(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function l(e, t, n, r) {
				return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Fr(n, e.mode, r), t.return = e, t._debugInfo = Y, t) : (t = i(t, n.children || []), t.return = e, t._debugInfo = Y, t);
			}
			function u(e, t, n, r, a) {
				return t === null || t.tag !== 7 ? (t = Mr(n, e.mode, r, a), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t) : (t = i(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function d(e, t, n) {
				if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Nr("" + t, e.mode, n), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t;
				if (typeof t == "object" && t) {
					switch (t.$$typeof) {
						case Af: return n = jr(t, e.mode, n), Yi(n, t), n.return = e, e = Ki(t._debugInfo), n._debugInfo = Y, Y = e, n;
						case jf: return t = Fr(t, e.mode, n), t.return = e, t._debugInfo = Y, t;
						case Vf:
							var r = Ki(t._debugInfo);
							return t = Ui(t), e = d(e, t, n), Y = r, e;
					}
					if (Kf(t) || oe(t)) return n = Mr(t, e.mode, n, null), n.return = e, n._debugOwner = e, n._debugTask = e._debugTask, e = Ki(t._debugInfo), n._debugInfo = Y, Y = e, n;
					if (typeof t.then == "function") return r = Ki(t._debugInfo), e = d(e, Ji(t), n), Y = r, e;
					if (t.$$typeof === If) return d(e, ui(e, t), n);
					Zi(e, t);
				}
				return typeof t == "function" && $i(e, t), typeof t == "symbol" && ta(e, t), null;
			}
			function f(e, t, n, r) {
				var i = t === null ? null : t.key;
				if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? s(e, t, "" + n, r) : null;
				if (typeof n == "object" && n) {
					switch (n.$$typeof) {
						case Af: return n.key === i ? (i = Ki(n._debugInfo), e = c(e, t, n, r), Y = i, e) : null;
						case jf: return n.key === i ? l(e, t, n, r) : null;
						case Vf: return i = Ki(n._debugInfo), n = Ui(n), e = f(e, t, n, r), Y = i, e;
					}
					if (Kf(n) || oe(n)) return i === null ? (i = Ki(n._debugInfo), e = u(e, t, n, r, null), Y = i, e) : null;
					if (typeof n.then == "function") return i = Ki(n._debugInfo), e = f(e, t, Ji(n), r), Y = i, e;
					if (n.$$typeof === If) return f(e, t, ui(e, n), r);
					Zi(e, n);
				}
				return typeof n == "function" && $i(e, n), typeof n == "symbol" && ta(e, n), null;
			}
			function p(e, t, n, r, i) {
				if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, s(t, e, "" + r, i);
				if (typeof r == "object" && r) {
					switch (r.$$typeof) {
						case Af: return n = e.get(r.key === null ? n : r.key) || null, e = Ki(r._debugInfo), t = c(t, n, r, i), Y = e, t;
						case jf: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
						case Vf:
							var a = Ki(r._debugInfo);
							return r = Ui(r), t = p(e, t, n, r, i), Y = a, t;
					}
					if (Kf(r) || oe(r)) return n = e.get(n) || null, e = Ki(r._debugInfo), t = u(t, n, r, i, null), Y = e, t;
					if (typeof r.then == "function") return a = Ki(r._debugInfo), t = p(e, t, n, Ji(r), i), Y = a, t;
					if (r.$$typeof === If) return p(e, t, n, ui(t, r), i);
					Zi(t, r);
				}
				return typeof r == "function" && $i(t, r), typeof r == "symbol" && ta(t, r), null;
			}
			function h(e, t, n, r) {
				if (typeof n != "object" || !n) return r;
				switch (n.$$typeof) {
					case Af:
					case jf:
						m(e, t, n);
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
						T(t, function() {
							console.error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", i);
						});
						break;
					case Vf: n = Ui(n), h(e, t, n, r);
				}
				return r;
			}
			function _(i, o, s, c) {
				for (var l = null, u = null, m = null, g = o, _ = o = 0, v = null; g !== null && _ < s.length; _++) {
					g.index > _ ? (v = g, g = null) : v = g.sibling;
					var y = f(i, g, s[_], c);
					if (y === null) {
						g === null && (g = v);
						break;
					}
					l = h(i, y, s[_], l), e && g && y.alternate === null && t(i, g), o = a(y, o, _), m === null ? u = y : m.sibling = y, m = y, g = v;
				}
				if (_ === s.length) return n(i, g), $g && Lr(i, _), u;
				if (g === null) {
					for (; _ < s.length; _++) g = d(i, s[_], c), g !== null && (l = h(i, g, s[_], l), o = a(g, o, _), m === null ? u = g : m.sibling = g, m = g);
					return $g && Lr(i, _), u;
				}
				for (g = r(g); _ < s.length; _++) v = p(g, i, _, s[_], c), v !== null && (l = h(i, v, s[_], l), e && v.alternate !== null && g.delete(v.key === null ? _ : v.key), o = a(v, o, _), m === null ? u = v : m.sibling = v, m = v);
				return e && g.forEach(function(e) {
					return t(i, e);
				}), $g && Lr(i, _), u;
			}
			function v(i, o, s, c) {
				if (s == null) throw Error("An iterable object provided no iterator.");
				for (var l = null, u = null, m = o, g = o = 0, _ = null, v = null, y = s.next(); m !== null && !y.done; g++, y = s.next()) {
					m.index > g ? (_ = m, m = null) : _ = m.sibling;
					var b = f(i, m, y.value, c);
					if (b === null) {
						m === null && (m = _);
						break;
					}
					v = h(i, b, y.value, v), e && m && b.alternate === null && t(i, m), o = a(b, o, g), u === null ? l = b : u.sibling = b, u = b, m = _;
				}
				if (y.done) return n(i, m), $g && Lr(i, g), l;
				if (m === null) {
					for (; !y.done; g++, y = s.next()) m = d(i, y.value, c), m !== null && (v = h(i, m, y.value, v), o = a(m, o, g), u === null ? l = m : u.sibling = m, u = m);
					return $g && Lr(i, g), l;
				}
				for (m = r(m); !y.done; g++, y = s.next()) _ = p(m, i, g, y.value, c), _ !== null && (v = h(i, _, y.value, v), e && _.alternate !== null && m.delete(_.key === null ? g : _.key), o = a(_, o, g), u === null ? l = _ : u.sibling = _, u = _);
				return e && m.forEach(function(e) {
					return t(i, e);
				}), $g && Lr(i, g), l;
			}
			function y(e, r, a, s) {
				if (typeof a == "object" && a && a.type === Mf && a.key === null && (E(a, null, e), a = a.props.children), typeof a == "object" && a) {
					switch (a.$$typeof) {
						case Af:
							var c = Ki(a._debugInfo);
							a: {
								for (var l = a.key; r !== null;) {
									if (r.key === l) {
										if (l = a.type, l === Mf) {
											if (r.tag === 7) {
												n(e, r.sibling), s = i(r, a.props.children), s.return = e, s._debugOwner = a._owner, s._debugInfo = Y, E(a, s, e), e = s;
												break a;
											}
										} else if (r.elementType === l || Cr(r, a) || typeof l == "object" && l && l.$$typeof === Vf && Ui(l) === r.type) {
											n(e, r.sibling), s = i(r, a.props), Yi(s, a), s.return = e, s._debugOwner = a._owner, s._debugInfo = Y, e = s;
											break a;
										}
										n(e, r);
										break;
									} else t(e, r);
									r = r.sibling;
								}
								a.type === Mf ? (s = Mr(a.props.children, e.mode, s, a.key), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Y, E(a, s, e), e = s) : (s = jr(a, e.mode, s), Yi(s, a), s.return = e, s._debugInfo = Y, e = s);
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
								s = Fr(c, e.mode, s), s.return = e, e = s;
							}
							return o(e);
						case Vf: return c = Ki(a._debugInfo), a = Ui(a), e = y(e, r, a, s), Y = c, e;
					}
					if (Kf(a)) return c = Ki(a._debugInfo), e = _(e, r, a, s), Y = c, e;
					if (oe(a)) {
						if (c = Ki(a._debugInfo), l = oe(a), typeof l != "function") throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
						var u = l.call(a);
						return u === a ? (e.tag !== 0 || Object.prototype.toString.call(e.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(u) !== "[object Generator]") && (Kv || console.error("Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."), Kv = !0) : a.entries !== l || Gv || (console.error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Gv = !0), e = v(e, r, u, s), Y = c, e;
					}
					if (typeof a.then == "function") return c = Ki(a._debugInfo), e = y(e, r, Ji(a), s), Y = c, e;
					if (a.$$typeof === If) return y(e, r, ui(e, a), s);
					Zi(e, a);
				}
				return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (c = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), s = i(r, c), s.return = e, e = s) : (n(e, r), s = Nr(c, e.mode, s), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Y, e = s), o(e)) : (typeof a == "function" && $i(e, a), typeof a == "symbol" && ta(e, a), n(e, r));
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
					var o = g(29, t, null, e.mode);
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
		function ra(e, t) {
			var n = Kf(e);
			return e = !n && typeof oe(e) == "function", n || e ? (n = n ? "array" : "iterable", console.error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", n, t, n), !1) : !0;
		}
		function ia(e) {
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
		function aa(e, t) {
			e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
				baseState: e.baseState,
				firstBaseUpdate: e.firstBaseUpdate,
				lastBaseUpdate: e.lastBaseUpdate,
				shared: e.shared,
				callbacks: null
			});
		}
		function oa(e) {
			return {
				lane: e,
				tag: Qv,
				payload: null,
				callback: null,
				next: null
			};
		}
		function sa(e, t, n) {
			var r = e.updateQueue;
			if (r === null) return null;
			if (r = r.shared, iy === r && !ry) {
				var i = x(e);
				console.error("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.\n\nPlease update the following component: %s", i), ry = !0;
			}
			return (Ub & Pb) === Nb ? (gr(e, r, t, n), br(e)) : (i = r.pending, i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = br(e), yr(e, null, n), t);
		}
		function D(e, t, n) {
			if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, Ge(e, n);
			}
		}
		function ca(e, t) {
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
		function la() {
			if (ay) {
				var e = ov;
				if (e !== null) throw e;
			}
		}
		function O(e, t, n, r) {
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
											Pe(!0);
											try {
												m.call(g, d, h);
											} finally {
												Pe(!1);
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
											Pe(!0);
											try {
												_.call(g, d, h);
											} finally {
												Pe(!1);
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
		function ua(e, t) {
			if (typeof e != "function") throw Error("Invalid argument passed as callback. Expected a function. Instead received: " + e);
			e.call(t);
		}
		function da(e, t) {
			var n = e.shared.hiddenCallbacks;
			if (n !== null) for (e.shared.hiddenCallbacks = null, e = 0; e < n.length; e++) ua(n[e], t);
		}
		function fa(e, t) {
			var n = e.callbacks;
			if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) ua(n[e], t);
		}
		function pa(e, t) {
			var n = ox;
			S(sy, n, e), S(oy, t, e), ox = n | t.baseLanes;
		}
		function ma(e) {
			S(sy, ox, e), S(oy, oy.current, e);
		}
		function ha(e) {
			ox = sy.current, ue(oy, e), ue(sy, e);
		}
		function ga(e) {
			var t = e.alternate;
			S(fy, fy.current & uy, e), S(cy, e, e), ly === null && (t === null || oy.current !== null || t.memoizedState !== null) && (ly = e);
		}
		function _a(e) {
			S(fy, fy.current, e), S(cy, e, e), ly === null && (ly = e);
		}
		function va(e) {
			e.tag === 22 ? (S(fy, fy.current, e), S(cy, e, e), ly === null && (ly = e)) : ya(e);
		}
		function ya(e) {
			S(fy, fy.current, e), S(cy, cy.current, e);
		}
		function ba(e) {
			ue(cy, e), ly === e && (ly = null), ue(fy, e);
		}
		function xa(e) {
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
		function k() {
			var e = Z;
			Py === null ? Py = [e] : Py.push(e);
		}
		function A() {
			var e = Z;
			if (Py !== null && (Fy++, Py[Fy] !== e)) {
				var t = x(X);
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
		function Sa(e) {
			e == null || Kf(e) || console.error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", Z, typeof e);
		}
		function Ca() {
			var e = x(X);
			Sy.has(e) || (Sy.add(e), console.error("ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.", e));
		}
		function wa() {
			throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
		}
		function Ta(e, t) {
			if (Iy) return !1;
			if (t === null) return console.error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Z), !1;
			e.length !== t.length && console.error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", Z, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
			for (var n = 0; n < t.length && n < e.length; n++) if (!Uh(e[n], t[n])) return !1;
			return !0;
		}
		function Ea(e, t, n, r, i, a) {
			Cy = a, X = t, Py = e === null ? null : e._debugHookTypes, Fy = -1, Iy = e !== null && e.type !== t.type, (Object.prototype.toString.call(n) === "[object AsyncFunction]" || Object.prototype.toString.call(n) === "[object AsyncGeneratorFunction]") && (a = x(X), xy.has(a) || (xy.add(a), console.error("%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.", a === null ? "An unknown Component" : "<" + a + ">"))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, H.H = e !== null && e.memoizedState !== null ? By : Py === null ? Ry : zy, Oy = a = (t.mode & Lg) !== G;
			var o = bv(n, r, i);
			if (Oy = !1, Dy && (o = Oa(t, n, r, i)), a) {
				Pe(!0);
				try {
					o = Oa(t, n, r, i);
				} finally {
					Pe(!1);
				}
			}
			return Da(e, t), o;
		}
		function Da(e, t) {
			t._debugHookTypes = Py, t.dependencies === null ? jy !== null && (t.dependencies = {
				lanes: 0,
				firstContext: null,
				_debugThenableState: jy
			}) : t.dependencies._debugThenableState = jy, H.H = Ly;
			var n = wy !== null && wy.next !== null;
			if (Cy = 0, Py = Z = Ty = wy = X = null, Fy = -1, e !== null && (e.flags & 65011712) != (t.flags & 65011712) && console.error("Internal React error: Expected static flag was missing. Please notify the React team."), Ey = !1, Ay = 0, jy = null, n) throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
			e === null || ob || (e = e.dependencies, e !== null && si(e) && (ob = !0)), Hv ? (Hv = !1, e = !0) : e = !1, e && (t = x(t) || "Unknown", by.has(t) || xy.has(t) || (by.add(t), console.error("`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary.")));
		}
		function Oa(e, t, n, r) {
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
		function j() {
			var e = H.H, t = e.useState()[0];
			return t = typeof t.then == "function" ? Pa(t) : t, e = e.useState()[0], (wy === null ? null : wy.memoizedState) !== e && (X.flags |= 1024), t;
		}
		function ka() {
			var e = ky !== 0;
			return ky = 0, e;
		}
		function Aa(e, t, n) {
			t.updateQueue = e.updateQueue, t.flags = (t.mode & Rg) === G ? t.flags & -2053 : t.flags & -402655237, e.lanes &= ~n;
		}
		function ja(e) {
			if (Ey) {
				for (e = e.memoizedState; e !== null;) {
					var t = e.queue;
					t !== null && (t.pending = null), e = e.next;
				}
				Ey = !1;
			}
			Cy = 0, Py = Ty = wy = X = null, Fy = -1, Z = null, Dy = !1, Ay = ky = 0, jy = null;
		}
		function M() {
			var e = {
				memoizedState: null,
				baseState: null,
				baseQueue: null,
				queue: null,
				next: null
			};
			return Ty === null ? X.memoizedState = Ty = e : Ty = Ty.next = e, Ty;
		}
		function Ma() {
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
		function Na() {
			return {
				lastEffect: null,
				events: null,
				stores: null,
				memoCache: null
			};
		}
		function Pa(e) {
			var t = Ay;
			return Ay += 1, jy === null && (jy = Bi()), e = Hi(jy, e, t), t = X, (Ty === null ? t.memoizedState : Ty.next) === null && (t = t.alternate, H.H = t !== null && t.memoizedState !== null ? By : Ry), e;
		}
		function Fa(e) {
			if (typeof e == "object" && e) {
				if (typeof e.then == "function") return Pa(e);
				if (e.$$typeof === If) return li(e);
			}
			throw Error("An unsupported type was passed to use(): " + String(e));
		}
		function Ia(e) {
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
			}, n === null && (n = Na(), X.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0 || Iy) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = Uf;
			else n.length !== e && console.error("Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.", n.length, e);
			return t.index++, n;
		}
		function La(e, t) {
			return typeof t == "function" ? t(e) : t;
		}
		function Ra(e, t, n) {
			var r = M();
			if (n !== void 0) {
				var i = n(t);
				if (Oy) {
					Pe(!0);
					try {
						n(t);
					} finally {
						Pe(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Uo.bind(null, X, e), [r.memoizedState, e];
		}
		function za(e) {
			return Ba(Ma(), wy, e);
		}
		function Ba(e, t, n) {
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
		function N(e) {
			var t = Ma(), n = t.queue;
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
		function Va(e, t, n) {
			var r = X, i = M();
			if ($g) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				var a = n();
				vy || a === n() || (console.error("The result of getServerSnapshot should be cached to avoid an infinite loop"), vy = !0);
			} else {
				if (a = t(), vy || (n = t(), Uh(a, n) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), vy = !0)), Wb === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				$ & 127 || Ua(r, t, a);
			}
			return i.memoizedState = a, n = {
				value: a,
				getSnapshot: t
			}, i.queue = n, go(Ga.bind(null, r, n, e), [e]), r.flags |= 2048, fo(my | _y, { destroy: void 0 }, Wa.bind(null, r, n, a, t), null), a;
		}
		function Ha(e, t, n) {
			var r = X, i = Ma(), a = $g;
			if (a) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				n = n();
			} else if (n = t(), !vy) {
				var o = t();
				Uh(n, o) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), vy = !0);
			}
			if ((o = !Uh((wy || i).memoizedState, n)) && (i.memoizedState = n, ob = !0), i = i.queue, ho(2048, _y, Ga.bind(null, r, i, e), [e]), i.getSnapshot !== t || o || Ty !== null && Ty.memoizedState.tag & my) {
				if (r.flags |= 2048, fo(my | _y, { destroy: void 0 }, Wa.bind(null, r, i, n, t), null), Wb === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				a || Cy & 127 || Ua(r, t, n);
			}
			return n;
		}
		function Ua(e, t, n) {
			e.flags |= 16384, e = {
				getSnapshot: t,
				value: n
			}, t = X.updateQueue, t === null ? (t = Na(), X.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
		}
		function Wa(e, t, n, r) {
			t.value = n, t.getSnapshot = r, Ka(t) && qa(e);
		}
		function Ga(e, t, n) {
			return n(function() {
				Ka(t) && (hi(2, "updateSyncExternalStore()", e), qa(e));
			});
		}
		function Ka(e) {
			var t = e.getSnapshot;
			e = e.value;
			try {
				var n = t();
				return !Uh(e, n);
			} catch {
				return !0;
			}
		}
		function qa(e) {
			var t = vr(e, 2);
			t !== null && tl(t, e, 2);
		}
		function Ja(e) {
			var t = M();
			if (typeof e == "function") {
				var n = e;
				if (e = n(), Oy) {
					Pe(!0);
					try {
						n();
					} finally {
						Pe(!1);
					}
				}
			}
			return t.memoizedState = t.baseState = e, t.queue = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: La,
				lastRenderedState: e
			}, t;
		}
		function Ya(e) {
			e = Ja(e);
			var t = e.queue, n = Wo.bind(null, X, t);
			return t.dispatch = n, [e.memoizedState, n];
		}
		function P(e) {
			var t = M();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ko.bind(null, X, !0, n), n.dispatch = t, [e, t];
		}
		function Xa(e, t) {
			return Za(Ma(), wy, e, t);
		}
		function Za(e, t, n, r) {
			return e.baseState = n, Ba(e, wy, typeof r == "function" ? r : La);
		}
		function Qa(e, t) {
			var n = Ma();
			return wy === null ? (n.baseState = e, [e, n.queue.dispatch]) : Za(n, wy, e, t);
		}
		function $a(e, t, n, r, i) {
			if (qo(e)) throw Error("Cannot update form state while rendering.");
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
				H.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, eo(t, a)) : (a.next = n.next, t.pending = n.next = a);
			}
		}
		function eo(e, t) {
			var n = t.action, r = t.payload, i = e.state;
			if (t.isTransition) {
				var a = H.T, o = {};
				o._updatedFibers = /* @__PURE__ */ new Set(), H.T = o;
				try {
					var s = n(i, r), c = H.S;
					c !== null && c(o, s), to(e, t, s);
				} catch (n) {
					ro(e, t, n);
				} finally {
					a !== null && o.types !== null && (a.types !== null && a.types !== o.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), a.types = o.types), H.T = a, a === null && o._updatedFibers && (e = o._updatedFibers.size, o._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
				}
			} else try {
				o = n(i, r), to(e, t, o);
			} catch (n) {
				ro(e, t, n);
			}
		}
		function to(e, t, n) {
			typeof n == "object" && n && typeof n.then == "function" ? (H.asyncTransitions++, n.then(jo, jo), n.then(function(n) {
				no(e, t, n);
			}, function(n) {
				return ro(e, t, n);
			}), t.isTransition || console.error("An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop.")) : no(e, t, n);
		}
		function no(e, t, n) {
			t.status = "fulfilled", t.value = n, io(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, eo(e, n)));
		}
		function ro(e, t, n) {
			var r = e.pending;
			if (e.pending = null, r !== null) {
				r = r.next;
				do
					t.status = "rejected", t.reason = n, io(t), t = t.next;
				while (t !== r);
			}
			e.action = null;
		}
		function io(e) {
			e = e.listeners;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
		function ao(e, t) {
			return t;
		}
		function oo(e, t) {
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
							qr(r);
						}
						r = !1;
					}
					r && (t = n[0]);
				}
			}
			return n = M(), n.memoizedState = n.baseState = t, r = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ao,
				lastRenderedState: t
			}, n.queue = r, n = Wo.bind(null, X, r), r.dispatch = n, r = Ja(!1), a = Ko.bind(null, X, !1, r.queue), r = M(), i = {
				state: t,
				dispatch: null,
				action: e,
				pending: null
			}, r.queue = i, n = $a.bind(null, X, i, a, n), i.dispatch = n, r.memoizedState = e, [
				t,
				n,
				!1
			];
		}
		function so(e) {
			return co(Ma(), wy, e);
		}
		function co(e, t, n) {
			if (t = Ba(e, t, ao)[0], e = za(La)[0], typeof t == "object" && t && typeof t.then == "function") try {
				var r = Pa(t);
			} catch (e) {
				throw e === Lv ? zv : e;
			}
			else r = t;
			t = Ma();
			var i = t.queue, a = i.dispatch;
			return n !== t.memoizedState && (X.flags |= 2048, fo(my | _y, { destroy: void 0 }, lo.bind(null, i, n), null)), [
				r,
				a,
				e
			];
		}
		function lo(e, t) {
			e.action = t;
		}
		function uo(e) {
			var t = Ma(), n = wy;
			if (n !== null) return co(t, n, e);
			Ma(), t = t.memoizedState, n = Ma();
			var r = n.queue.dispatch;
			return n.memoizedState = e, [
				t,
				r,
				!1
			];
		}
		function fo(e, t, n, r) {
			return e = {
				tag: e,
				create: n,
				deps: r,
				inst: t,
				next: null
			}, t = X.updateQueue, t === null && (t = Na(), X.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
		}
		function po(e) {
			var t = M();
			return e = { current: e }, t.memoizedState = e;
		}
		function mo(e, t, n, r) {
			var i = M();
			X.flags |= e, i.memoizedState = fo(my | t, { destroy: void 0 }, n, r === void 0 ? null : r);
		}
		function ho(e, t, n, r) {
			var i = Ma();
			r = r === void 0 ? null : r;
			var a = i.memoizedState.inst;
			wy !== null && r !== null && Ta(r, wy.memoizedState.deps) ? i.memoizedState = fo(t, a, n, r) : (X.flags |= e, i.memoizedState = fo(my | t, a, n, r));
		}
		function go(e, t) {
			(X.mode & Rg) === G ? mo(8390656, _y, e, t) : mo(276826112, _y, e, t);
		}
		function _o(e) {
			X.flags |= 4;
			var t = X.updateQueue;
			if (t === null) t = Na(), X.updateQueue = t, t.events = [e];
			else {
				var n = t.events;
				n === null ? t.events = [e] : n.push(e);
			}
		}
		function vo(e) {
			var t = M(), n = { impl: e };
			return t.memoizedState = n, function() {
				if ((Ub & Pb) !== Nb) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return n.impl.apply(void 0, arguments);
			};
		}
		function F(e) {
			var t = Ma().memoizedState;
			return _o({
				ref: t,
				nextImpl: e
			}), function() {
				if ((Ub & Pb) !== Nb) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return t.impl.apply(void 0, arguments);
			};
		}
		function yo(e, t) {
			var n = 4194308;
			return (X.mode & Rg) !== G && (n |= 134217728), mo(n, gy, e, t);
		}
		function bo(e, t) {
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
		function xo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]);
			var r = 4194308;
			(X.mode & Rg) !== G && (r |= 134217728), mo(r, gy, bo.bind(null, t, e), n);
		}
		function So(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]), ho(4, gy, bo.bind(null, t, e), n);
		}
		function I(e, t) {
			return M().memoizedState = [e, t === void 0 ? null : t], e;
		}
		function Co(e, t) {
			var n = Ma();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			return t !== null && Ta(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
		}
		function wo(e, t) {
			var n = M();
			t = t === void 0 ? null : t;
			var r = e();
			if (Oy) {
				Pe(!0);
				try {
					e();
				} finally {
					Pe(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function To(e, t) {
			var n = Ma();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			if (t !== null && Ta(t, r[1])) return r[0];
			if (r = e(), Oy) {
				Pe(!0);
				try {
					e();
				} finally {
					Pe(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function Eo(e, t) {
			return ko(M(), e, t);
		}
		function Do(e, t) {
			return Ao(Ma(), wy.memoizedState, e, t);
		}
		function Oo(e, t) {
			var n = Ma();
			return wy === null ? ko(n, e, t) : Ao(n, wy.memoizedState, e, t);
		}
		function ko(e, t, n) {
			return n === void 0 || Cy & 1073741824 && !($ & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = el(), X.lanes |= e, cx |= e, n);
		}
		function Ao(e, t, n, r) {
			return Uh(n, t) ? n : oy.current === null ? !(Cy & 42) || Cy & 1073741824 && !($ & 261930) ? (ob = !0, e.memoizedState = n) : (e = el(), X.lanes |= e, cx |= e, t) : (e = ko(e, n, r), Uh(e, t) || (ob = !0), e);
		}
		function jo() {
			H.asyncTransitions--;
		}
		function Mo(e, t, n, r, i) {
			var a = qf.p;
			qf.p = a !== 0 && a < Vp ? a : Vp;
			var o = H.T, s = {};
			s._updatedFibers = /* @__PURE__ */ new Set(), H.T = s, Ko(e, !1, t, n);
			try {
				var c = i(), l = H.S;
				if (l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function") {
					H.asyncTransitions++, c.then(jo, jo);
					var u = Ii(c, r);
					Go(e, t, u, $c(e));
				} else Go(e, t, r, $c(e));
			} catch (n) {
				Go(e, t, {
					then: function() {},
					status: "rejected",
					reason: n
				}, $c(e));
			} finally {
				qf.p = a, o !== null && s.types !== null && (o.types !== null && o.types !== s.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), o.types = s.types), H.T = o, o === null && s._updatedFibers && (e = s._updatedFibers.size, s._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
			}
		}
		function No(e, t, n, r) {
			if (e.tag !== 5) throw Error("Expected the form instance to be a HostComponent. This is a bug in React.");
			var i = Po(e).queue;
			gi(e), Mo(e, i, t, yC, n === null ? p : function() {
				return Fo(e), n(r);
			});
		}
		function Po(e) {
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
					lastRenderedReducer: La,
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
					lastRenderedReducer: La,
					lastRenderedState: n
				},
				next: null
			}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
		}
		function Fo(e) {
			H.T === null && console.error("requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition.");
			var t = Po(e);
			t.next === null && (t = e.alternate.memoizedState), Go(e, t.next.queue, {}, $c(e));
		}
		function Io() {
			var e = Ja(!1);
			return e = Mo.bind(null, X, e.queue, !0, !1), M().memoizedState = e, [!1, e];
		}
		function Lo() {
			var e = za(La)[0], t = Ma().memoizedState;
			return [typeof e == "boolean" ? e : Pa(e), t];
		}
		function Ro() {
			var e = N(La)[0], t = Ma().memoizedState;
			return [typeof e == "boolean" ? e : Pa(e), t];
		}
		function zo() {
			return li(bC);
		}
		function Bo() {
			var e = M(), t = Wb.identifierPrefix;
			if ($g) {
				var n = Xg, r = Yg;
				n = (r & ~(1 << 32 - Pp(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = ky++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = My++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		}
		function Vo() {
			return M().memoizedState = Ho.bind(null, X);
		}
		function Ho(e, t) {
			for (var n = e.return; n !== null;) {
				switch (n.tag) {
					case 24:
					case 3:
						var r = $c(n), i = oa(r), a = sa(n, i, r);
						a !== null && (hi(r, "refresh()", e), tl(a, n, r), D(a, n, r)), e = fi(), t != null && a !== null && console.error("The seed argument is not enabled outside experimental channels."), i.payload = { cache: e };
						return;
				}
				n = n.return;
			}
		}
		function Uo(e, t, n) {
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
			qo(e) ? Jo(t, i) : (i = _r(e, t, i, r), i !== null && (hi(r, "dispatch()", e), tl(i, e, r), Yo(i, t, r)));
		}
		function Wo(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = $c(e), Go(e, t, n, r) && hi(r, "setState()", e);
		}
		function Go(e, t, n, r) {
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			if (qo(e)) Jo(t, i);
			else {
				var a = e.alternate;
				if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) {
					var o = H.H;
					H.H = Uy;
					try {
						var s = t.lastRenderedState, c = a(s, n);
						if (i.hasEagerState = !0, i.eagerState = c, Uh(c, s)) return gr(e, t, i, 0), Wb === null && hr(), !1;
					} catch {} finally {
						H.H = o;
					}
				}
				if (n = _r(e, t, i, r), n !== null) return tl(n, e, r), Yo(n, t, r), !0;
			}
			return !1;
		}
		function Ko(e, t, n, r) {
			if (H.T === null && av === 0 && console.error("An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."), r = {
				lane: 2,
				revertLane: nu(),
				gesture: null,
				action: r,
				hasEagerState: !1,
				eagerState: null,
				next: null
			}, qo(e)) {
				if (t) throw Error("Cannot update optimistic state while rendering.");
				console.error("Cannot call startTransition while rendering.");
			} else t = _r(e, n, r, 2), t !== null && (hi(2, "setOptimistic()", e), tl(t, e, 2));
		}
		function qo(e) {
			var t = e.alternate;
			return e === X || t !== null && t === X;
		}
		function Jo(e, t) {
			Dy = Ey = !0;
			var n = e.pending;
			n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
		}
		function Yo(e, t, n) {
			if (n & 4194048) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, Ge(e, n);
			}
		}
		function Xo(e) {
			if (e !== null && typeof e != "function") {
				var t = String(e);
				tb.has(t) || (tb.add(t), console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", e));
			}
		}
		function Zo(e, t, n, r) {
			var i = e.memoizedState, a = n(r, i);
			if (e.mode & Lg) {
				Pe(!0);
				try {
					a = n(r, i);
				} finally {
					Pe(!1);
				}
			}
			a === void 0 && (t = se(t) || "Component", Zy.has(t) || (Zy.add(t), console.error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", t))), i = a == null ? i : V({}, i, a), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
		}
		function Qo(e, t, n, r, i, a, o) {
			var s = e.stateNode;
			if (typeof s.shouldComponentUpdate == "function") {
				if (n = s.shouldComponentUpdate(r, a, o), e.mode & Lg) {
					Pe(!0);
					try {
						n = s.shouldComponentUpdate(r, a, o);
					} finally {
						Pe(!1);
					}
				}
				return n === void 0 && console.error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", se(t) || "Component"), n;
			}
			return t.prototype && t.prototype.isPureReactComponent ? !Vn(n, r) || !Vn(i, a) : !0;
		}
		function $o(e, t, n, r) {
			var i = t.state;
			typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== i && (e = x(e) || "Component", Ky.has(e) || (Ky.add(e), console.error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", e)), nb.enqueueReplaceState(t, t.state, null));
		}
		function es(e, t) {
			var n = t;
			if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
			if (e = e.defaultProps) for (var i in n === t && (n = V({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
			return n;
		}
		function ts(e) {
			dg(e), console.warn("%s\n\n%s\n", rb ? "An error occurred in the <" + rb + "> component." : "An error occurred in one of your React components.", "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://react.dev/link/error-boundaries to learn more about error boundaries.");
		}
		function ns(e) {
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
		function rs(e) {
			dg(e);
		}
		function is(e, t) {
			try {
				rb = t.source ? x(t.source) : null, ib = null;
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
		function as(e, t, n) {
			try {
				rb = n.source ? x(n.source) : null, ib = x(t);
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
		function os(e, t, n) {
			return n = oa(n), n.tag = ty, n.payload = { element: null }, n.callback = function() {
				T(t.source, is, e, t);
			}, n;
		}
		function ss(e) {
			return e = oa(e), e.tag = ty, e;
		}
		function cs(e, t, n, r) {
			var i = n.type.getDerivedStateFromError;
			if (typeof i == "function") {
				var a = r.value;
				e.payload = function() {
					return i(a);
				}, e.callback = function() {
					wr(n), T(r.source, as, t, n, r);
				};
			}
			var o = n.stateNode;
			o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
				wr(n), T(r.source, as, t, n, r), typeof i != "function" && (Cx === null ? Cx = /* @__PURE__ */ new Set([this]) : Cx.add(this)), Ov(this, r), typeof i == "function" || !(n.lanes & 2) && console.error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", x(n) || "Unknown");
			});
		}
		function ls(e, t, n, r, i) {
			if (n.flags |= 32768, Np && Gl(e, i), typeof r == "object" && r && typeof r.then == "function") {
				if (t = n.alternate, t !== null && oi(t, n, i, !0), $g && (e_ = !0), n = cy.current, n !== null) {
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
			if ($g) return e_ = !0, t = cy.current, t === null ? (r !== i_ && $r(Ir(Error("There was an error while hydrating but React was able to recover by instead client rendering the entire root.", { cause: r }), n)), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = Ir(r, n), i = os(e.stateNode, r, i), ca(e, i), sx !== Bb && (sx = Rb)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== i_ && $r(Ir(Error("There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.", { cause: r }), n))), !1;
			var a = Ir(Error("There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.", { cause: r }), n);
			if (px === null ? px = [a] : px.push(a), sx !== Bb && (sx = Rb), t === null) return !0;
			r = Ir(r, n), n = t;
			do {
				switch (n.tag) {
					case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = os(n.stateNode, r, e), ca(n, e), !1;
					case 1: if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (Cx === null || !Cx.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = ss(i), cs(i, e, n, r), ca(n, i), !1;
				}
				n = n.return;
			} while (n !== null);
			return !1;
		}
		function us(e, t, n, r) {
			t.child = e === null ? Zv(t, null, n, r) : Xv(t, e.child, n, r);
		}
		function ds(e, t, n, r, i) {
			n = n.render;
			var a = t.ref;
			if ("ref" in r) {
				var o = {};
				for (var s in r) s !== "ref" && (o[s] = r[s]);
			} else o = r;
			return ci(t), r = Ea(e, t, n, o, a, i), s = ka(), e !== null && !ob ? (Aa(e, t, i), Fs(e, t, i)) : ($g && s && zr(t), t.flags |= 1, us(e, t, r, i), t.child);
		}
		function fs(e, t, n, r, i) {
			if (e === null) {
				var a = n.type;
				return typeof a == "function" && !Dr(a) && a.defaultProps === void 0 && n.compare === null ? (n = xr(a), t.tag = 15, t.type = n, Ts(t, a), ps(e, t, n, r, i)) : (e = Ar(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
			}
			if (a = e.child, !Is(e, i)) {
				var o = a.memoizedProps;
				if (n = n.compare, n = n === null ? Vn : n, n(o, r) && e.ref === t.ref) return Fs(e, t, i);
			}
			return t.flags |= 1, e = Or(a, r), e.ref = t.ref, e.return = t, t.child = e;
		}
		function ps(e, t, n, r, i) {
			if (e !== null) {
				var a = e.memoizedProps;
				if (Vn(a, r) && e.ref === t.ref && t.type === e.type) if (ob = !1, t.pendingProps = r = a, Is(e, i)) e.flags & 131072 && (ob = !0);
				else return t.lanes = e.lanes, Fs(e, t, i);
			}
			return xs(e, t, n, r, i);
		}
		function ms(e, t, n, r) {
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
					return gs(e, t, a, n, r);
				}
				if (n & 536870912) t.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, e !== null && Ri(t, a === null ? null : a.cachePool), a === null ? ma(t) : pa(t, a), va(t);
				else return r = t.lanes = 536870912, gs(e, t, a === null ? n : a.baseLanes | n, n, r);
			} else a === null ? (e !== null && Ri(t, null), ma(t), ya(t)) : (Ri(t, a.cachePool), pa(t, a), ya(t), t.memoizedState = null);
			return us(e, t, i, n), t.child;
		}
		function hs(e, t) {
			return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
				_visibility: Og,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), t.sibling;
		}
		function gs(e, t, n, r, i) {
			var a = Li();
			return a = a === null ? null : {
				parent: m_._currentValue,
				pool: a
			}, t.memoizedState = {
				baseLanes: n,
				cachePool: a
			}, e !== null && Ri(t, null), ma(t), va(t), e !== null && oi(e, t, r, !0), t.childLanes = i, null;
		}
		function _s(e, t) {
			var n = t.hidden;
			return n !== void 0 && console.error("<Activity> doesn't accept a hidden prop. Use mode=\"hidden\" instead.\n- <Activity %s>\n+ <Activity %s>", !0 === n ? "hidden" : !1 === n ? "hidden={false}" : "hidden={...}", n ? "mode=\"hidden\"" : "mode=\"visible\""), t = As({
				mode: t.mode,
				children: t.children
			}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
		}
		function vs(e, t, n) {
			return Xv(t, e.child, null, n), e = _s(t, t.pendingProps), e.flags |= 2, ba(t), t.memoizedState = null, e;
		}
		function ys(e, t, n) {
			var r = t.pendingProps, i = (t.flags & 128) != 0;
			if (t.flags &= -129, e === null) {
				if ($g) {
					if (r.mode === "hidden") return e = _s(t, r), t.lanes = 536870912, hs(null, e);
					if (_a(t), (e = Qg) ? (n = pd(e, r_), n = n !== null && n.data === kS ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: Vr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Pr(n), r.return = t, t.child = r, Zg = t, Qg = null)) : n = null, n === null) throw Kr(t, e), qr(t);
					return t.lanes = 536870912, null;
				}
				return _s(t, r);
			}
			var a = e.memoizedState;
			if (a !== null) {
				var o = a.dehydrated;
				if (_a(t), i) if (t.flags & 256) t.flags &= -257, t = vs(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
				else if (Gr(), n & 536870912 && ml(t), ob || oi(e, t, n, !1), i = (n & e.childLanes) !== 0, ob || i) {
					if (r = Wb, r !== null && (o = Ke(r, n), o !== 0 && o !== a.retryLane)) throw a.retryLane = o, vr(e, o), tl(r, e, o), ab;
					hl(), t = vs(e, t, n);
				} else e = a.treeContext, Qg = _d(o.nextSibling), Zg = t, $g = !0, n_ = null, e_ = !1, t_ = null, r_ = !1, e !== null && Hr(t, e), t = _s(t, r), t.flags |= 4096;
				return t;
			}
			return a = e.child, r = {
				mode: r.mode,
				children: r.children
			}, n & 536870912 && (n & e.lanes) !== 0 && ml(t), e = Or(a, r), e.ref = t.ref, t.child = e, e.return = t, e;
		}
		function bs(e, t) {
			var n = t.ref;
			if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
			else {
				if (typeof n != "function" && typeof n != "object") throw Error("Expected ref to be a function, an object returned by React.createRef(), or undefined/null.");
				(e === null || e.ref !== n) && (t.flags |= 4194816);
			}
		}
		function xs(e, t, n, r, i) {
			if (n.prototype && typeof n.prototype.render == "function") {
				var a = se(n) || "Unknown";
				sb[a] || (console.error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", a, a), sb[a] = !0);
			}
			return t.mode & Lg && lv.recordLegacyContextWarning(t, null), e === null && (Ts(t, t.type), n.contextTypes && (a = se(n) || "Unknown", lb[a] || (lb[a] = !0, console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)", a)))), ci(t), n = Ea(e, t, n, r, void 0, i), r = ka(), e !== null && !ob ? (Aa(e, t, i), Fs(e, t, i)) : ($g && r && zr(t), t.flags |= 1, us(e, t, n, i), t.child);
		}
		function Ss(e, t, n, r, i, a) {
			return ci(t), Fy = -1, Iy = e !== null && e.type !== t.type, t.updateQueue = null, n = Oa(t, r, n, i), Da(e, t), r = ka(), e !== null && !ob ? (Aa(e, t, a), Fs(e, t, a)) : ($g && r && zr(t), t.flags |= 1, us(e, t, n, a), t.child);
		}
		function Cs(e, t, n, r, i) {
			switch (u(t)) {
				case !1:
					var a = t.stateNode, o = new t.type(t.memoizedProps, a.context).state;
					a.updater.enqueueSetState(a, o, null);
					break;
				case !0:
					t.flags |= 128, t.flags |= 65536, a = Error("Simulated error coming from DevTools");
					var s = i & -i;
					if (t.lanes |= s, o = Wb, o === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
					s = ss(s), cs(s, o, t, Ir(a, t)), ca(t, s);
			}
			if (ci(t), t.stateNode === null) {
				if (o = Ng, a = n.contextType, "contextType" in n && a !== null && (a === void 0 || a.$$typeof !== If) && !eb.has(n) && (eb.add(n), s = a === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof a == "object" ? a.$$typeof === Ff ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(a).join(", ") + "}." : " However, it is set to a " + typeof a + ".", console.error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", se(n) || "Component", s)), typeof a == "object" && a && (o = li(a)), a = new n(r, o), t.mode & Lg) {
					Pe(!0);
					try {
						a = new n(r, o);
					} finally {
						Pe(!1);
					}
				}
				if (o = t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = nb, t.stateNode = a, a._reactInternals = t, a._reactInternalInstance = Gy, typeof n.getDerivedStateFromProps == "function" && o === null && (o = se(n) || "Component", qy.has(o) || (qy.add(o), console.error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", o, a.state === null ? "null" : "undefined", o))), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function") {
					var c = s = o = null;
					if (typeof a.componentWillMount == "function" && !0 !== a.componentWillMount.__suppressDeprecationWarning ? o = "componentWillMount" : typeof a.UNSAFE_componentWillMount == "function" && (o = "UNSAFE_componentWillMount"), typeof a.componentWillReceiveProps == "function" && !0 !== a.componentWillReceiveProps.__suppressDeprecationWarning ? s = "componentWillReceiveProps" : typeof a.UNSAFE_componentWillReceiveProps == "function" && (s = "UNSAFE_componentWillReceiveProps"), typeof a.componentWillUpdate == "function" && !0 !== a.componentWillUpdate.__suppressDeprecationWarning ? c = "componentWillUpdate" : typeof a.UNSAFE_componentWillUpdate == "function" && (c = "UNSAFE_componentWillUpdate"), o !== null || s !== null || c !== null) {
						a = se(n) || "Component";
						var l = typeof n.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
						Yy.has(a) || (Yy.add(a), console.error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://react.dev/link/unsafe-component-lifecycles", a, l, o === null ? "" : "\n  " + o, s === null ? "" : "\n  " + s, c === null ? "" : "\n  " + c));
					}
				}
				a = t.stateNode, o = se(n) || "Component", a.render || (n.prototype && typeof n.prototype.render == "function" ? console.error("No `render` method found on the %s instance: did you accidentally return an object from the constructor?", o) : console.error("No `render` method found on the %s instance: you may have forgotten to define `render`.", o)), !a.getInitialState || a.getInitialState.isReactClassApproved || a.state || console.error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && console.error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), a.contextType && console.error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), n.childContextTypes && !$y.has(n) && ($y.add(n), console.error("%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)", o)), n.contextTypes && !Qy.has(n) && (Qy.add(n), console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)", o)), typeof a.componentShouldUpdate == "function" && console.error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), n.prototype && n.prototype.isPureReactComponent && a.shouldComponentUpdate !== void 0 && console.error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", se(n) || "A pure component"), typeof a.componentDidUnmount == "function" && console.error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof a.componentDidReceiveProps == "function" && console.error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof a.componentWillRecieveProps == "function" && console.error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof a.UNSAFE_componentWillRecieveProps == "function" && console.error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o), s = a.props !== r, a.props !== void 0 && s && console.error("When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o), a.defaultProps && console.error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof a.getSnapshotBeforeUpdate != "function" || typeof a.componentDidUpdate == "function" || Jy.has(n) || (Jy.add(n), console.error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", se(n))), typeof a.getDerivedStateFromProps == "function" && console.error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof a.getDerivedStateFromError == "function" && console.error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof n.getSnapshotBeforeUpdate == "function" && console.error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o), (s = a.state) && (typeof s != "object" || Kf(s)) && console.error("%s.state: must be set to an object or null", o), typeof a.getChildContext == "function" && typeof n.childContextTypes != "object" && console.error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o), a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, ia(t), o = n.contextType, a.context = typeof o == "object" && o ? li(o) : Ng, a.state === r && (o = se(n) || "Component", Xy.has(o) || (Xy.add(o), console.error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o))), t.mode & Lg && lv.recordLegacyContextWarning(t, a), lv.recordUnsafeLifecycleWarnings(t, a), a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Zo(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && (console.error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", x(t) || "Component"), nb.enqueueReplaceState(a, a.state, null)), O(t, r, a, i), la(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728), a = !0;
			} else if (e === null) {
				a = t.stateNode;
				var d = t.memoizedProps;
				s = es(n, d), a.props = s;
				var f = a.context;
				c = n.contextType, o = Ng, typeof c == "object" && c && (o = li(c)), l = n.getDerivedStateFromProps, c = typeof l == "function" || typeof a.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, c || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (d || f !== o) && $o(t, a, r, o), ny = !1;
				var p = t.memoizedState;
				a.state = p, O(t, r, a, i), la(), f = t.memoizedState, d || p !== f || ny ? (typeof l == "function" && (Zo(t, n, l, r), f = t.memoizedState), (s = ny || Qo(t, n, s, r, p, f, o)) ? (c || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728), t.memoizedProps = r, t.memoizedState = f), a.props = r, a.state = f, a.context = o, a = s) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728), a = !1);
			} else {
				a = t.stateNode, aa(e, t), o = t.memoizedProps, c = es(n, o), a.props = c, l = t.pendingProps, p = a.context, f = n.contextType, s = Ng, typeof f == "object" && f && (s = li(f)), d = n.getDerivedStateFromProps, (f = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== l || p !== s) && $o(t, a, r, s), ny = !1, p = t.memoizedState, a.state = p, O(t, r, a, i), la();
				var m = t.memoizedState;
				o !== l || p !== m || ny || e !== null && e.dependencies !== null && si(e.dependencies) ? (typeof d == "function" && (Zo(t, n, d, r), m = t.memoizedState), (c = ny || Qo(t, n, c, r, p, m, s) || e !== null && e.dependencies !== null && si(e.dependencies)) ? (f || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, m, s), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, m, s)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), a.props = r, a.state = m, a.context = s, a = c) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), a = !1);
			}
			if (s = a, bs(e, t), o = (t.flags & 128) != 0, s || o) {
				if (s = t.stateNode, Ee(t), o && typeof n.getDerivedStateFromError != "function") n = null, C_ = -1;
				else if (n = Sv(s), t.mode & Lg) {
					Pe(!0);
					try {
						Sv(s);
					} finally {
						Pe(!1);
					}
				}
				t.flags |= 1, e !== null && o ? (t.child = Xv(t, e.child, null, i), t.child = Xv(t, null, n, i)) : us(e, t, n, i), t.memoizedState = s.state, e = t.child;
			} else e = Fs(e, t, i);
			return i = t.stateNode, a && i.props !== r && (db || console.error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", x(t) || "a component"), db = !0), e;
		}
		function ws(e, t, n, r) {
			return Zr(), t.flags |= 256, us(e, t, n, r), t.child;
		}
		function Ts(e, t) {
			t && t.childContextTypes && console.error("childContextTypes cannot be defined on a function component.\n  %s.childContextTypes = ...", t.displayName || t.name || "Component"), typeof t.getDerivedStateFromProps == "function" && (e = se(t) || "Unknown", ub[e] || (console.error("%s: Function components do not support getDerivedStateFromProps.", e), ub[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = se(t) || "Unknown", cb[t] || (console.error("%s: Function components do not support contextType.", t), cb[t] = !0));
		}
		function Es(e) {
			return {
				baseLanes: e,
				cachePool: zi()
			};
		}
		function Ds(e, t, n) {
			return e = e === null ? 0 : e.childLanes & ~n, t && (e |= dx), e;
		}
		function Os(e, t, n) {
			var r, i = t.pendingProps;
			l(t) && (t.flags |= 128);
			var a = !1, o = (t.flags & 128) != 0;
			if ((r = o) || (r = e !== null && e.memoizedState === null ? !1 : (fy.current & dy) !== 0), r && (a = !0, t.flags &= -129), r = (t.flags & 32) != 0, t.flags &= -33, e === null) {
				if ($g) {
					if (a ? ga(t) : ya(t), (e = Qg) ? (n = pd(e, r_), n = n !== null && n.data !== kS ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: Vr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Pr(n), r.return = t, t.child = r, Zg = t, Qg = null)) : n = null, n === null) throw Kr(t, e), qr(t);
					return hd(n) ? t.lanes = 32 : t.lanes = 536870912, null;
				}
				var s = i.children;
				if (i = i.fallback, a) {
					ya(t);
					var c = t.mode;
					return s = As({
						mode: "hidden",
						children: s
					}, c), i = Mr(i, c, n, null), s.return = t, i.return = t, s.sibling = i, t.child = s, i = t.child, i.memoizedState = Es(n), i.childLanes = Ds(e, r, n), t.memoizedState = mb, hs(null, i);
				}
				return ga(t), ks(t, s);
			}
			var u = e.memoizedState;
			if (u !== null) {
				var d = u.dehydrated;
				if (d !== null) {
					if (o) t.flags & 256 ? (ga(t), t.flags &= -257, t = js(e, t, n)) : t.memoizedState === null ? (ya(t), s = i.fallback, c = t.mode, i = As({
						mode: "visible",
						children: i.children
					}, c), s = Mr(s, c, n, null), s.flags |= 2, i.return = t, s.return = t, i.sibling = s, t.child = i, Xv(t, e.child, null, n), i = t.child, i.memoizedState = Es(n), i.childLanes = Ds(e, r, n), t.memoizedState = mb, t = hs(null, i)) : (ya(t), t.child = e.child, t.flags |= 128, t = null);
					else if (ga(t), Gr(), n & 536870912 && ml(t), hd(d)) {
						if (r = d.nextSibling && d.nextSibling.dataset, r) {
							s = r.dgst;
							var f = r.msg;
							c = r.stck;
							var p = r.cstck;
						}
						a = f, r = s, i = c, d = p, s = a, c = d, s = Error(s || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), s.stack = i || "", s.digest = r, r = c === void 0 ? null : c, i = {
							value: s,
							source: null,
							stack: r
						}, typeof r == "string" && Vg.set(s, i), $r(i), t = js(e, t, n);
					} else if (ob || oi(e, t, n, !1), r = (n & e.childLanes) !== 0, ob || r) {
						if (r = Wb, r !== null && (i = Ke(r, n), i !== 0 && i !== u.retryLane)) throw u.retryLane = i, vr(e, i), tl(r, e, i), ab;
						md(d) || hl(), t = js(e, t, n);
					} else md(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = u.treeContext, Qg = _d(d.nextSibling), Zg = t, $g = !0, n_ = null, e_ = !1, t_ = null, r_ = !1, e !== null && Hr(t, e), t = ks(t, i.children), t.flags |= 4096);
					return t;
				}
			}
			return a ? (ya(t), s = i.fallback, c = t.mode, p = e.child, d = p.sibling, i = Or(p, {
				mode: "hidden",
				children: i.children
			}), i.subtreeFlags = p.subtreeFlags & 65011712, d === null ? (s = Mr(s, c, n, null), s.flags |= 2) : s = Or(d, s), s.return = t, i.return = t, i.sibling = s, t.child = i, hs(null, i), i = t.child, s = e.child.memoizedState, s === null ? s = Es(n) : (c = s.cachePool, c === null ? c = zi() : (p = m_._currentValue, c = c.parent === p ? c : {
				parent: p,
				pool: p
			}), s = {
				baseLanes: s.baseLanes | n,
				cachePool: c
			}), i.memoizedState = s, i.childLanes = Ds(e, r, n), t.memoizedState = mb, hs(e.child, i)) : (u !== null && (n & 62914560) === n && (n & e.lanes) !== 0 && ml(t), ga(t), n = e.child, e = n.sibling, n = Or(n, {
				mode: "visible",
				children: i.children
			}), n.return = t, n.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = n, t.memoizedState = null, n);
		}
		function ks(e, t) {
			return t = As({
				mode: "visible",
				children: t
			}, e.mode), t.return = e, e.child = t;
		}
		function As(e, t) {
			return e = g(22, e, null, t), e.lanes = 0, e;
		}
		function js(e, t, n) {
			return Xv(t, e.child, null, n), e = ks(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
		}
		function Ms(e, t, n) {
			e.lanes |= t;
			var r = e.alternate;
			r !== null && (r.lanes |= t), ii(e.return, t, n);
		}
		function Ns(e, t, n, r, i, a) {
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
		function Ps(e, t, n) {
			var r = t.pendingProps, i = r.revealOrder, a = r.tail, o = r.children, s = fy.current;
			if ((r = (s & dy) !== 0) ? (s = s & uy | dy, t.flags |= 128) : s &= uy, S(fy, s, t), s = i ?? "null", i !== "forwards" && i !== "unstable_legacy-backwards" && i !== "together" && i !== "independent" && !fb[s]) if (fb[s] = !0, i == null) console.error("The default for the <SuspenseList revealOrder=\"...\"> prop is changing. To be future compatible you must explictly specify either \"independent\" (the current default), \"together\", \"forwards\" or \"legacy_unstable-backwards\".");
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
				for (s = 0; s < o.length; s++) if (!ra(o[s], s)) break a;
			} else if (s = oe(o), typeof s == "function") {
				if (s = s.call(o)) for (var c = s.next(), l = 0; !c.done; c = s.next()) {
					if (!ra(c.value, l)) break a;
					l++;
				}
			} else console.error("A single row was passed to a <SuspenseList revealOrder=\"%s\" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?", i);
			if (us(e, t, o, n), $g ? (Ur(), o = Gg) : o = 0, !r && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && Ms(e, n, t);
				else if (e.tag === 19) Ms(e, n, t);
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
					for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && xa(e) === null && (i = n), n = n.sibling;
					n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Ns(t, !1, i, n, a, o);
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (n = null, i = t.child, t.child = null; i !== null;) {
						if (e = i.alternate, e !== null && xa(e) === null) {
							t.child = i;
							break;
						}
						e = i.sibling, i.sibling = n, n = i, i = e;
					}
					Ns(t, !0, n, null, a, o);
					break;
				case "together":
					Ns(t, !1, null, null, void 0, o);
					break;
				default: t.memoizedState = null;
			}
			return t.child;
		}
		function Fs(e, t, n) {
			if (e !== null && (t.dependencies = e.dependencies), C_ = -1, cx |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
				if (oi(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
			if (e !== null && t.child !== e.child) throw Error("Resuming work not yet implemented.");
			if (t.child !== null) {
				for (e = t.child, n = Or(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Or(e, e.pendingProps), n.return = t;
				n.sibling = null;
			}
			return t.child;
		}
		function Is(e, t) {
			return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && si(e))) : !0;
		}
		function L(e, t, n) {
			switch (t.tag) {
				case 3:
					fe(t, t.stateNode.containerInfo), ni(t, m_, e.memoizedState.cache), Zr();
					break;
				case 27:
				case 5:
					pe(t);
					break;
				case 4:
					fe(t, t.stateNode.containerInfo);
					break;
				case 10:
					ni(t, t.type, t.memoizedProps.value);
					break;
				case 12:
					(n & t.childLanes) !== 0 && (t.flags |= 4), t.flags |= 2048;
					var r = t.stateNode;
					r.effectDuration = -0, r.passiveEffectDuration = -0;
					break;
				case 31:
					if (t.memoizedState !== null) return t.flags |= 128, _a(t), null;
					break;
				case 13:
					if (r = t.memoizedState, r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (ga(t), e = Fs(e, t, n), e === null ? null : e.sibling) : Os(e, t, n) : (ga(t), t.flags |= 128, null);
					ga(t);
					break;
				case 19:
					var i = (e.flags & 128) != 0;
					if (r = (n & t.childLanes) !== 0, r ||= (oi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
						if (r) return Ps(e, t, n);
						t.flags |= 128;
					}
					if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), S(fy, fy.current, t), r) break;
					return null;
				case 22: return t.lanes = 0, ms(e, t, n, t.pendingProps);
				case 24: ni(t, m_, e.memoizedState.cache);
			}
			return Fs(e, t, n);
		}
		function Ls(e, t, n) {
			if (t._debugNeedsRemount && e !== null) {
				n = Ar(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes), n._debugStack = t._debugStack, n._debugTask = t._debugTask;
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
				if (!Is(e, n) && !(t.flags & 128)) return ob = !1, L(e, t, n);
				ob = !!(e.flags & 131072);
			}
			else ob = !1, (r = $g) && (Ur(), r = (t.flags & 1048576) != 0), r && (r = t.index, Ur(), Rr(t, Gg, r));
			switch (t.lanes = 0, t.tag) {
				case 16:
					a: if (r = t.pendingProps, e = Ui(t.elementType), t.type = e, typeof e == "function") Dr(e) ? (r = es(e, r), t.tag = 1, t.type = e = xr(e), t = Cs(null, t, e, r, n)) : (t.tag = 0, Ts(t, e), t.type = e = xr(e), t = xs(null, t, e, r, n));
					else {
						if (e != null) {
							if (i = e.$$typeof, i === Lf) {
								t.tag = 11, t.type = e = Sr(e), t = ds(null, t, e, r, n);
								break a;
							} else if (i === Bf) {
								t.tag = 14, t = fs(null, t, e, r, n);
								break a;
							}
						}
						throw t = "", typeof e == "object" && e && e.$$typeof === Vf && (t = " Did you wrap a component in React.lazy() more than once?"), n = se(e) || e, Error("Element type is invalid. Received a promise that resolves to: " + n + ". Lazy element type must resolve to a class or function." + t);
					}
					return t;
				case 0: return xs(e, t, t.type, t.pendingProps, n);
				case 1: return r = t.type, i = es(r, t.pendingProps), Cs(e, t, r, i, n);
				case 3:
					a: {
						if (fe(t, t.stateNode.containerInfo), e === null) throw Error("Should have a current fiber. This is a bug in React.");
						r = t.pendingProps;
						var a = t.memoizedState;
						i = a.element, aa(e, t), O(t, r, null, n);
						var o = t.memoizedState;
						if (r = o.cache, ni(t, m_, r), r !== a.cache && ai(t, [m_], n, !0), la(), r = o.element, a.isDehydrated) if (a = {
							element: r,
							isDehydrated: !1,
							cache: o.cache
						}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
							t = ws(e, t, r, n);
							break a;
						} else if (r !== i) {
							i = Ir(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t), $r(i), t = ws(e, t, r, n);
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
							if (Zr(), r === i) {
								t = Fs(e, t, n);
								break a;
							}
							us(e, t, r, n);
						}
						t = t.child;
					}
					return t;
				case 26: return bs(e, t), e === null ? (n = Ad(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : $g || (n = t.type, e = t.pendingProps, r = de(ep.current), r = zu(r).createElement(n), r[Gp] = t, r[Kp] = e, Tu(r, n, e), it(r), t.stateNode = r) : t.memoizedState = Ad(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
				case 27: return pe(t), e === null && $g && (r = de(ep.current), i = w(), r = t.stateNode = Td(t.type, t.pendingProps, r, i, !1), e_ || (i = Fu(r, t.type, t.pendingProps, i), i !== null && (Wr(t, 0).serverProps = i)), Zg = t, r_ = !0, i = Qg, $u(t.type) ? (nC = i, Qg = _d(r.firstChild)) : Qg = i), us(e, t, t.pendingProps.children, n), bs(e, t), e === null && (t.flags |= 4194304), t.child;
				case 5: return e === null && $g && (a = w(), r = Qt(t.type, a.ancestorInfo), i = Qg, (o = !i) || (o = dd(i, t.type, t.pendingProps, r_), o === null ? a = !1 : (t.stateNode = o, e_ || (a = Fu(o, t.type, t.pendingProps, a), a !== null && (Wr(t, 0).serverProps = a)), Zg = t, Qg = _d(o.firstChild), r_ = !1, a = !0), o = !a), o && (r && Kr(t, i), qr(t))), pe(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, r = a.children, Hu(i, a) ? r = null : o !== null && Hu(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = Ea(e, t, j, null, null, n), bC._currentValue = i), bs(e, t), us(e, t, r, n), t.child;
				case 6: return e === null && $g && (n = t.pendingProps, e = w(), r = e.ancestorInfo.current, n = r == null || $t(n, r.tag, e.ancestorInfo.implicitRootScope), e = Qg, (r = !e) || (r = fd(e, t.pendingProps, r_), r === null ? r = !1 : (t.stateNode = r, Zg = t, Qg = null, r = !0), r = !r), r && (n && Kr(t, e), qr(t))), null;
				case 13: return Os(e, t, n);
				case 4: return fe(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Xv(t, null, r, n) : us(e, t, r, n), t.child;
				case 11: return ds(e, t, t.type, t.pendingProps, n);
				case 7: return us(e, t, t.pendingProps, n), t.child;
				case 8: return us(e, t, t.pendingProps.children, n), t.child;
				case 12: return t.flags |= 4, t.flags |= 2048, r = t.stateNode, r.effectDuration = -0, r.passiveEffectDuration = -0, us(e, t, t.pendingProps.children, n), t.child;
				case 10: return r = t.type, i = t.pendingProps, a = i.value, "value" in i || hb || (hb = !0, console.error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?")), ni(t, r, a), us(e, t, i.children, n), t.child;
				case 9: return i = t.type._context, r = t.pendingProps.children, typeof r != "function" && console.error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), ci(t), i = li(i), r = bv(r, i, void 0), t.flags |= 1, us(e, t, r, n), t.child;
				case 14: return fs(e, t, t.type, t.pendingProps, n);
				case 15: return ps(e, t, t.type, t.pendingProps, n);
				case 19: return Ps(e, t, n);
				case 31: return ys(e, t, n);
				case 22: return ms(e, t, n, t.pendingProps);
				case 24: return ci(t), r = li(m_), e === null ? (i = Li(), i === null && (i = Wb, a = fi(), i.pooledCache = a, pi(a), a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
					parent: r,
					cache: i
				}, ia(t), ni(t, m_, i)) : ((e.lanes & n) !== 0 && (aa(e, t), O(t, null, null, n), la()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, ni(t, m_, r), r !== i.cache && ai(t, [m_], n, !0)) : (i = {
					parent: r,
					cache: r
				}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), ni(t, m_, r))), us(e, t, t.pendingProps.children, n), t.child;
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
			t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Be(), e.lanes |= t, fx |= t);
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
			switch (Br(t), t.tag) {
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
				case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ri(m_, t), C(t), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Xr(t) ? (ei(), Rs(t)) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Qr())), Us(t), null;
				case 26:
					var i = t.type, a = t.memoizedState;
					return e === null ? (Rs(t), a === null ? (Us(t), zs(t, i, null, r, n)) : (Us(t), Bs(t, a))) : a ? a === e.memoizedState ? (Us(t), t.flags &= -16777217) : (Rs(t), Us(t), Bs(t, a)) : (e = e.memoizedProps, e !== r && Rs(t), Us(t), zs(t, i, e, r, n)), null;
				case 27:
					if (me(t), n = de(ep.current), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Rs(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return Us(t), null;
						}
						e = w(), Xr(t) ? Jr(t, e) : (e = Td(i, r, n, e, !0), t.stateNode = e, Rs(t));
					}
					return Us(t), null;
				case 5:
					if (me(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Rs(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return Us(t), null;
						}
						var o = w();
						if (Xr(t)) Jr(t, o);
						else {
							switch (a = de(ep.current), Qt(i, o.ancestorInfo), o = o.context, a = zu(a), o) {
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
						if (e = de(ep.current), n = w(), Xr(t)) {
							if (e = t.stateNode, n = t.memoizedProps, i = !e_, r = null, a = Zg, a !== null) switch (a.tag) {
								case 3:
									i && (i = yd(e, n, r), i !== null && (Wr(t, 0).serverProps = i));
									break;
								case 27:
								case 5: r = a.memoizedProps, i && (i = yd(e, n, r), i !== null && (Wr(t, 0).serverProps = i));
							}
							e[Gp] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Su(e.nodeValue, n)), e || qr(t, !0);
						} else i = n.ancestorInfo.current, i != null && $t(r, i.tag, n.ancestorInfo.implicitRootScope), e = zu(e).createTextNode(r), e[Gp] = t, t.stateNode = e;
					}
					return Us(t), null;
				case 31:
					if (n = t.memoizedState, e === null || e.memoizedState !== null) {
						if (r = Xr(t), n !== null) {
							if (e === null) {
								if (!r) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue.");
								e[Gp] = t, Us(t), (t.mode & K) !== G && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							} else ei(), Zr(), !(t.flags & 128) && (n = t.memoizedState = null), t.flags |= 4, Us(t), (t.mode & K) !== G && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							e = !1;
						} else n = Qr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
						if (!e) return t.flags & 256 ? (ba(t), t) : (ba(t), null);
						if (t.flags & 128) throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
					}
					return Us(t), null;
				case 13:
					if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
						if (i = r, a = Xr(t), i !== null && i.dehydrated !== null) {
							if (e === null) {
								if (!a) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
								a[Gp] = t, Us(t), (t.mode & K) !== G && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							} else ei(), Zr(), !(t.flags & 128) && (i = t.memoizedState = null), t.flags |= 4, Us(t), (t.mode & K) !== G && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							i = !1;
						} else i = Qr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
						if (!i) return t.flags & 256 ? (ba(t), t) : (ba(t), null);
					}
					return ba(t), t.flags & 128 ? (t.lanes = n, (t.mode & K) !== G && Ni(t), t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Vs(t, t.updateQueue), Us(t), (t.mode & K) !== G && n && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
				case 4: return C(t), e === null && lu(t.stateNode.containerInfo), Us(t), null;
				case 10: return ri(t.type, t), Us(t), null;
				case 19:
					if (ue(fy, t), r = t.memoizedState, r === null) return Us(t), null;
					if (i = (t.flags & 128) != 0, a = r.rendering, a === null) if (i) Hs(r, !1);
					else {
						if (sx !== Ib || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (a = xa(e), a !== null) {
								for (t.flags |= 128, Hs(r, !1), e = a.updateQueue, t.updateQueue = e, Vs(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) kr(n, e), n = n.sibling;
								return S(fy, fy.current & uy | dy, t), $g && Lr(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && xp() > yx && (t.flags |= 128, i = !0, Hs(r, !1), t.lanes = 4194304);
					}
					else {
						if (!i) if (e = xa(a), e !== null) {
							if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Vs(t, e), Hs(r, !0), r.tail === null && r.tailMode === "hidden" && !a.alternate && !$g) return Us(t), null;
						} else 2 * xp() - r.renderingStartTime > yx && n !== 536870912 && (t.flags |= 128, i = !0, Hs(r, !1), t.lanes = 4194304);
						r.isBackwards ? (a.sibling = t.child, t.child = a) : (e = r.last, e === null ? t.child = a : e.sibling = a, r.last = a);
					}
					return r.tail === null ? (Us(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = xp(), e.sibling = null, n = fy.current, n = i ? n & uy | dy : n & uy, S(fy, n, t), $g && Lr(t, r.treeForkCount), e);
				case 22:
				case 23: return ba(t), ha(t), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Us(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Us(t), n = t.updateQueue, n !== null && Vs(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && ue(cv, t), null;
				case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ri(m_, t), Us(t), null;
				case 25: return null;
				case 30: return null;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function Gs(e, t) {
			switch (Br(t), t.tag) {
				case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && Ni(t), t) : null;
				case 3: return ri(m_, t), C(t), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
				case 26:
				case 27:
				case 5: return me(t), null;
				case 31:
					if (t.memoizedState !== null) {
						if (ba(t), t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						Zr();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && Ni(t), t) : null;
				case 13:
					if (ba(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
						if (t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						Zr();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && Ni(t), t) : null;
				case 19: return ue(fy, t), null;
				case 4: return C(t), null;
				case 10: return ri(t.type, t), null;
				case 22:
				case 23: return ba(t), ha(t), e !== null && ue(cv, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && Ni(t), t) : null;
				case 24: return ri(m_, t), null;
				case 25: return null;
				default: return null;
			}
		}
		function Ks(e, t) {
			switch (Br(t), t.tag) {
				case 3:
					ri(m_, t), C(t);
					break;
				case 26:
				case 27:
				case 5:
					me(t);
					break;
				case 4:
					C(t);
					break;
				case 31:
					t.memoizedState !== null && ba(t);
					break;
				case 13:
					ba(t);
					break;
				case 19:
					ue(fy, t);
					break;
				case 10:
					ri(t.type, t);
					break;
				case 22:
				case 23:
					ba(t), ha(t), e !== null && ue(cv, t);
					break;
				case 24: ri(m_, t);
			}
		}
		function qs(e) {
			return (e.mode & K) !== G;
		}
		function Js(e, t) {
			qs(e) ? (Mi(), Xs(t, e), Ai()) : Xs(t, e);
		}
		function Ys(e, t, n) {
			qs(e) ? (Mi(), Zs(n, e, t), Ai()) : Zs(n, e, t);
		}
		function Xs(e, t) {
			try {
				var n = t.updateQueue, r = n === null ? null : n.lastEffect;
				if (r !== null) {
					var i = r.next;
					n = i;
					do {
						if ((n.tag & e) === e && (r = void 0, (e & hy) !== py && ($x = !0), r = T(t, Mv, n), (e & hy) !== py && ($x = !1), r !== void 0 && typeof r != "function")) {
							var a = void 0;
							a = (n.tag & gy) === 0 ? (n.tag & hy) === 0 ? "useEffect" : "useInsertionEffect" : "useLayoutEffect";
							var o = void 0;
							o = r === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof r.then == "function" ? "\n\nIt looks like you wrote " + a + "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n" + a + "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching" : " You returned: " + r, T(t, function(e, t) {
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
							s !== void 0 && (o.destroy = void 0, (e & hy) !== py && ($x = !0), i = t, T(i, Pv, i, n, s), (e & hy) !== py && ($x = !1));
						}
						r = r.next;
					} while (r !== a);
				}
			} catch (e) {
				Fl(t, t.return, e);
			}
		}
		function Qs(e, t) {
			qs(e) ? (Mi(), Xs(t, e), Ai()) : Xs(t, e);
		}
		function $s(e, t, n) {
			qs(e) ? (Mi(), Zs(n, e, t), Ai()) : Zs(n, e, t);
		}
		function ec(e) {
			var t = e.updateQueue;
			if (t !== null) {
				var n = e.stateNode;
				e.type.defaultProps || "ref" in e.memoizedProps || db || (n.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", x(e) || "instance"), n.state !== e.memoizedState && console.error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", x(e) || "instance"));
				try {
					T(e, fa, t, n);
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
			t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || db || (t.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", x(e) || "instance"), t.state !== e.memoizedState && console.error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", x(e) || "instance"));
			try {
				var i = es(e.type, n), a = T(e, tc, t, i, r);
				n = gb, a !== void 0 || n.has(e.type) || (n.add(e.type), T(e, function() {
					console.error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", x(e));
				})), t.__reactInternalSnapshotBeforeUpdate = a;
			} catch (t) {
				Fl(e, e.return, t);
			}
		}
		function rc(e, t, n) {
			n.props = es(e.type, e.memoizedProps), n.state = e.memoizedState, qs(e) ? (Mi(), T(e, Av, e, t, n), Ai()) : T(e, Av, e, t, n);
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
					Mi(), e.refCleanup = t(n);
				} finally {
					Ai();
				}
				else e.refCleanup = t(n);
				else typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", x(e)), t.current = n;
			}
		}
		function ac(e, t) {
			try {
				T(e, ic, e);
			} catch (n) {
				Fl(e, t, n);
			}
		}
		function oc(e, t) {
			var n = e.ref, r = e.refCleanup;
			if (n !== null) if (typeof r == "function") try {
				if (qs(e)) try {
					Mi(), T(e, r);
				} finally {
					Ai(e);
				}
				else T(e, r);
			} catch (n) {
				Fl(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				if (qs(e)) try {
					Mi(), T(e, n, null);
				} finally {
					Ai(e);
				}
				else T(e, n, null);
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
				T(e, qu, r, t, n, e);
			} catch (t) {
				Fl(e, e.return, t);
			}
		}
		function uc(e, t, n) {
			try {
				T(e, Yu, e.stateNode, e.type, n, t, e);
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
			if (r === 5 || r === 6) e = e.stateNode, t ? (Qu(n), (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t)) : (Qu(n), t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = fn));
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
				T(e, Ed, e.type, n, t, e);
			} catch (t) {
				Fl(e, e.return, t);
			}
		}
		function _c(e, t) {
			return t.tag === 31 ? (t = t.memoizedState, e.memoizedState !== null && t === null) : t.tag === 13 ? (e = e.memoizedState, t = t.memoizedState, e !== null && e.dehydrated !== null && (t === null || t.dehydrated === null)) : t.tag === 3 && e.memoizedState.isDehydrated && (t.flags & 256) == 0;
		}
		function vc(e, t) {
			if (e = e.containerInfo, KS = LC, e = Gn(e), Kn(e)) {
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
			var r = xi(), i = Ci(), a = Ti(), o = Ei(), s = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					jc(e, n), s & 4 && Js(n, gy | my);
					break;
				case 1:
					if (jc(e, n), s & 4) if (e = n.stateNode, t === null) n.type.defaultProps || "ref" in n.memoizedProps || db || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", x(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", x(n) || "instance")), qs(n) ? (Mi(), T(n, wv, n, e), Ai()) : T(n, wv, n, e);
					else {
						var c = es(n.type, t.memoizedProps);
						t = t.memoizedState, n.type.defaultProps || "ref" in n.memoizedProps || db || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", x(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", x(n) || "instance")), qs(n) ? (Mi(), T(n, Ev, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate), Ai()) : T(n, Ev, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate);
					}
					s & 64 && ec(n), s & 512 && ac(n, n.return);
					break;
				case 3:
					if (t = _i(), jc(e, n), s & 64 && (s = n.updateQueue, s !== null)) {
						if (c = null, n.child !== null) switch (n.child.tag) {
							case 27:
							case 5:
								c = n.child.stateNode;
								break;
							case 1: c = n.child.stateNode;
						}
						try {
							T(n, fa, s, c);
						} catch (e) {
							Fl(n, n.return, e);
						}
					}
					e.effectDuration += vi(t);
					break;
				case 27: t === null && s & 4 && gc(n);
				case 26:
				case 5:
					if (jc(e, n), t === null) {
						if (s & 4) lc(n);
						else if (s & 64) {
							e = n.type, t = n.memoizedProps, c = n.stateNode;
							try {
								T(n, Ju, c, e, t, n);
							} catch (e) {
								Fl(n, n.return, e);
							}
						}
					}
					s & 512 && ac(n, n.return);
					break;
				case 12:
					if (s & 4) {
						s = _i(), jc(e, n), e = n.stateNode, e.effectDuration += yi(s);
						try {
							T(n, sc, n, t, b_, e.effectDuration);
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
						_b = s, (vb = t) && !l ? (Fc(e, n, (n.subtreeFlags & 8772) != 0), (n.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && rr(n, q, J)) : jc(e, n), _b = c, vb = l;
					}
					break;
				case 30: break;
				default: jc(e, n);
			}
			(n.mode & K) !== G && 0 <= q && 0 <= J && ((D_ || .05 < T_) && or(n, q, J, T_, E_), n.alternate === null && n.return !== null && n.return.alternate !== null && .05 < J - q && (_c(n.return.alternate, n.return) || nr(n, q, J, "Mount"))), Si(r), wi(i), E_ = a, D_ = o;
		}
		function bc(e) {
			var t = e.alternate;
			t !== null && (e.alternate = null, bc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && $e(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
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
			var r = xi(), i = Ci(), a = Ti(), o = Ei();
			switch (n.tag) {
				case 26:
					vb || oc(n, t), xc(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (e = n.stateNode, e.parentNode.removeChild(e));
					break;
				case 27:
					vb || oc(n, t);
					var s = wb, c = Tb;
					$u(n.type) && (wb = n.stateNode, Tb = !1), xc(e, t, n), T(n, Dd, n.stateNode), wb = s, Tb = c;
					break;
				case 5: vb || oc(n, t);
				case 6:
					if (s = wb, c = Tb, wb = null, xc(e, t, n), wb = s, Tb = c, wb !== null) if (Tb) try {
						T(n, td, wb, n.stateNode);
					} catch (e) {
						Fl(n, t, e);
					}
					else try {
						T(n, ed, wb, n.stateNode);
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
			(n.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && or(n, q, J, T_, E_), Si(r), wi(i), E_ = a, D_ = o;
		}
		function Cc(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
				e = e.dehydrated;
				try {
					T(t, Cd, e);
				} catch (e) {
					Fl(t, t.return, e);
				}
			}
		}
		function wc(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
				T(t, wd, e);
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
				var i = e, a = t, o = n[r], s = xi(), c = a;
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
				Sc(i, a, o), wb = null, Tb = !1, (o.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && nr(o, q, J, "Unmount"), Si(s), i = o, a = i.alternate, a !== null && (a.return = null), i.return = null;
			}
			if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Oc(t, e), t = t.sibling;
		}
		function Oc(e, t) {
			var n = xi(), r = Ci(), i = Ti(), a = Ei(), o = e.alternate, s = e.flags;
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
										l = c.getElementsByTagName("title")[0], (!l || l[Qp] || l[Gp] || l.namespaceURI === Fm || l.hasAttribute("itemprop")) && (l = c.createElement(s), c.head.insertBefore(l, c.querySelector("head > title"))), Tu(l, s, o), l[Gp] = e, it(l), s = l;
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
											for (d = 0; d < u.length; d++) if (l = u[d], Ae(o.content, "content"), l.getAttribute("content") === (o.content == null ? null : "" + o.content) && l.getAttribute("name") === (o.name == null ? null : o.name) && l.getAttribute("property") === (o.property == null ? null : o.property) && l.getAttribute("http-equiv") === (o.httpEquiv == null ? null : o.httpEquiv) && l.getAttribute("charset") === (o.charSet == null ? null : o.charSet)) {
												u.splice(d, 1);
												break b;
											}
										}
										l = c.createElement(s), Tu(l, s, o), c.head.appendChild(l);
										break;
									default: throw Error("getNodesForType encountered a type it did not expect: \"" + s + "\". This is a bug in React.");
								}
								l[Gp] = e, it(l), s = l;
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
							T(e, Xu, c);
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
							T(e, Zu, c, o, s);
						} catch (t) {
							Fl(e, e.return, t);
						}
					}
					break;
				case 3:
					if (c = _i(), fC = null, l = Eb, Eb = Od(t.containerInfo), Dc(t, e), Eb = l, kc(e), s & 4 && o !== null && o.memoizedState.isDehydrated) try {
						T(e, Sd, t.containerInfo);
					} catch (t) {
						Fl(e, e.return, t);
					}
					yb && (yb = !1, Ac(e)), t.effectDuration += vi(c);
					break;
				case 4:
					s = Eb, Eb = Od(e.stateNode.containerInfo), Dc(t, e), kc(e), Eb = s;
					break;
				case 12:
					s = _i(), Dc(t, e), kc(e), e.stateNode.effectDuration += yi(s);
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
					if (_b = p || c, vb = m || f, Dc(t, e), vb = m, _b = p, f && !c && !p && !m && (e.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && rr(e, q, J), kc(e), s & 8192) a: for (t = e.stateNode, t._visibility = c ? t._visibility & ~Og : t._visibility | Og, !c || o === null || f || _b || vb || (Nc(e), (e.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && nr(e, q, J, "Disconnect")), o = null, t = e;;) {
						if (t.tag === 5 || t.tag === 26) {
							if (o === null) {
								f = o = t;
								try {
									l = f.stateNode, c ? T(f, ad, l) : T(f, cd, f.stateNode, f.memoizedProps);
								} catch (e) {
									Fl(f, f.return, e);
								}
							}
						} else if (t.tag === 6) {
							if (o === null) {
								f = t;
								try {
									u = f.stateNode, c ? T(f, od, u) : T(f, ld, u, f.memoizedProps);
								} catch (e) {
									Fl(f, f.return, e);
								}
							}
						} else if (t.tag === 18) {
							if (o === null) {
								f = t;
								try {
									d = f.stateNode, c ? T(f, id, d) : T(f, sd, f.stateNode);
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
			(e.mode & K) !== G && 0 <= q && 0 <= J && ((D_ || .05 < T_) && or(e, q, J, T_, E_), e.alternate === null && e.return !== null && e.return.alternate !== null && .05 < J - q && (_c(e.return.alternate, e.return) || nr(e, q, J, "Mount"))), Si(n), wi(r), E_ = i, D_ = a;
		}
		function kc(e) {
			var t = e.flags;
			if (t & 2) {
				try {
					T(e, hc, e);
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
			var t = xi(), n = Ci(), r = Ti(), i = Ei();
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
				case 27: T(e, Dd, e.stateNode);
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
			(e.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && or(e, q, J, T_, E_), Si(t), wi(n), E_ = r, D_ = i;
		}
		function Nc(e) {
			for (e = e.child; e !== null;) Mc(e), e = e.sibling;
		}
		function Pc(e, t, n, r) {
			var i = xi(), a = Ci(), o = Ti(), s = Ei(), c = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Fc(e, n, r), Js(n, gy);
					break;
				case 1:
					if (Fc(e, n, r), t = n.stateNode, typeof t.componentDidMount == "function" && T(n, wv, n, t), t = n.updateQueue, t !== null) {
						e = n.stateNode;
						try {
							T(n, da, t, e);
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
						c = _i(), Fc(e, n, r), r = n.stateNode, r.effectDuration += yi(c);
						try {
							T(n, sc, n, t, b_, r.effectDuration);
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
			(n.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && or(n, q, J, T_, E_), Si(i), wi(a), E_ = o, D_ = s;
		}
		function Fc(e, t, n) {
			for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) Pc(e, t.alternate, t, n), t = t.sibling;
		}
		function Ic(e, t) {
			var n = null;
			e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && pi(e), n != null && mi(n));
		}
		function Lc(e, t) {
			e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (pi(t), e != null && mi(e));
		}
		function Rc(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (t = t.child; t !== null;) {
				var a = t.sibling;
				zc(e, t, n, r, a === null ? i : a.actualStartTime), t = a;
			}
		}
		function zc(e, t, n, r, i) {
			var a = xi(), o = Ci(), s = Ti(), c = Ei(), l = Sg, u = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(t.mode & K) !== G && 0 < t.actualStartTime && t.flags & 1 && ir(t, t.actualStartTime, i, Db, n), Rc(e, t, n, r, i), u & 2048 && Qs(t, _y | my);
					break;
				case 1:
					(t.mode & K) !== G && 0 < t.actualStartTime && (t.flags & 128 ? ar(t, t.actualStartTime, i, []) : t.flags & 1 && ir(t, t.actualStartTime, i, Db, n)), Rc(e, t, n, r, i);
					break;
				case 3:
					var d = _i(), f = Db;
					Db = t.alternate !== null && t.alternate.memoizedState.isDehydrated && (t.flags & 256) == 0, Rc(e, t, n, r, i), Db = f, u & 2048 && (n = null, t.alternate !== null && (n = t.alternate.memoizedState.cache), r = t.memoizedState.cache, r !== n && (pi(r), n != null && mi(n))), e.passiveEffectDuration += vi(d);
					break;
				case 12:
					if (u & 2048) {
						u = _i(), Rc(e, t, n, r, i), e = t.stateNode, e.passiveEffectDuration += yi(u);
						try {
							T(t, cc, t, t.alternate, b_, e.passiveEffectDuration);
						} catch (e) {
							Fl(t, t.return, e);
						}
					} else Rc(e, t, n, r, i);
					break;
				case 31:
					u = Db, d = t.alternate === null ? null : t.alternate.memoizedState, f = t.memoizedState, d !== null && f === null ? (f = t.deletions, f !== null && 0 < f.length && f[0].tag === 18 ? (Db = !1, d = d.hydrationErrors, d !== null && ar(t, t.actualStartTime, i, d)) : Db = !0) : Db = !1, Rc(e, t, n, r, i), Db = u;
					break;
				case 13:
					u = Db, d = t.alternate === null ? null : t.alternate.memoizedState, f = t.memoizedState, d === null || d.dehydrated === null || f !== null && f.dehydrated !== null ? Db = !1 : (f = t.deletions, f !== null && 0 < f.length && f[0].tag === 18 ? (Db = !1, d = d.hydrationErrors, d !== null && ar(t, t.actualStartTime, i, d)) : Db = !0), Rc(e, t, n, r, i), Db = u;
					break;
				case 23: break;
				case 22:
					f = t.stateNode, d = t.alternate, t.memoizedState === null ? f._visibility & kg ? Rc(e, t, n, r, i) : (f._visibility |= kg, Bc(e, t, n, r, (t.subtreeFlags & 10256) != 0 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), i), (t.mode & K) === G || Db || (e = t.actualStartTime, 0 <= e && .05 < i - e && rr(t, e, i), 0 <= q && 0 <= J && .05 < J - q && rr(t, q, J))) : f._visibility & kg ? Rc(e, t, n, r, i) : Hc(e, t, n, r, i), u & 2048 && Ic(d, t);
					break;
				case 24:
					Rc(e, t, n, r, i), u & 2048 && Lc(t.alternate, t);
					break;
				default: Rc(e, t, n, r, i);
			}
			(t.mode & K) !== G && ((e = !Db && t.alternate === null && t.return !== null && t.return.alternate !== null) && (n = t.actualStartTime, 0 <= n && .05 < i - n && nr(t, n, i, "Mount")), 0 <= q && 0 <= J && ((D_ || .05 < T_) && or(t, q, J, T_, E_), e && .05 < J - q && nr(t, q, J, "Mount"))), Si(a), wi(o), E_ = s, D_ = c, Sg = l;
		}
		function Bc(e, t, n, r, i, a) {
			for (i &&= (t.subtreeFlags & 10256) != 0 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), t = t.child; t !== null;) {
				var o = t.sibling;
				Vc(e, t, n, r, i, o === null ? a : o.actualStartTime), t = o;
			}
		}
		function Vc(e, t, n, r, i, a) {
			var o = xi(), s = Ci(), c = Ti(), l = Ei(), u = Sg;
			i && (t.mode & K) !== G && 0 < t.actualStartTime && t.flags & 1 && ir(t, t.actualStartTime, a, Db, n);
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
			(t.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && or(t, q, J, T_, E_), Si(o), wi(s), E_ = c, D_ = l, Sg = u;
		}
		function Hc(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (var a = t.child; a !== null;) {
				t = a.sibling;
				var o = e, s = n, c = r, l = t === null ? i : t.actualStartTime, u = Sg;
				(a.mode & K) !== G && 0 < a.actualStartTime && a.flags & 1 && ir(a, a.actualStartTime, l, Db, s);
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
					var r = t[n], i = xi();
					xb = r, Xc(r, e), (r.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && nr(r, q, J, "Unmount"), Si(i);
				}
				Gc(e);
			}
			if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) qc(e), e = e.sibling;
		}
		function qc(e) {
			var t = xi(), n = Ci(), r = Ti(), i = Ei();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					Kc(e), e.flags & 2048 && $s(e, e.return, _y | my);
					break;
				case 3:
					var a = _i();
					Kc(e), e.stateNode.passiveEffectDuration += vi(a);
					break;
				case 12:
					a = _i(), Kc(e), e.stateNode.passiveEffectDuration += yi(a);
					break;
				case 22:
					a = e.stateNode, e.memoizedState !== null && a._visibility & kg && (e.return === null || e.return.tag !== 13) ? (a._visibility &= ~kg, Jc(e), (e.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && nr(e, q, J, "Disconnect")) : Kc(e);
					break;
				default: Kc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && or(e, q, J, T_, E_), Si(t), wi(n), D_ = i, E_ = r;
		}
		function Jc(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = xi();
					xb = r, Xc(r, e), (r.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && nr(r, q, J, "Unmount"), Si(i);
				}
				Gc(e);
			}
			for (e = e.child; e !== null;) Yc(e), e = e.sibling;
		}
		function Yc(e) {
			var t = xi(), n = Ci(), r = Ti(), i = Ei();
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
			(e.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && or(e, q, J, T_, E_), Si(t), wi(n), D_ = i, E_ = r;
		}
		function Xc(e, t) {
			for (; xb !== null;) {
				var n = xb, r = n, i = t, a = xi(), o = Ci(), s = Ti(), c = Ei();
				switch (r.tag) {
					case 0:
					case 11:
					case 15:
						$s(r, i, _y);
						break;
					case 23:
					case 22:
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (i = r.memoizedState.cachePool.pool, i != null && pi(i));
						break;
					case 24: mi(r.memoizedState.cache);
				}
				if ((r.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && or(r, q, J, T_, E_), Si(a), wi(o), D_ = c, E_ = s, r = n.child, r !== null) r.return = n, xb = r;
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
			return t === null ? Ze() : (t._updatedFibers ||= /* @__PURE__ */ new Set(), t._updatedFibers.add(e), nu());
		}
		function el() {
			if (dx === 0) if (!($ & 536870912) || $g) {
				var e = Rp;
				Rp <<= 1, !(Rp & 3932160) && (Rp = 262144), dx = e;
			} else dx = 536870912;
			return e = cy.current, e !== null && (e.flags |= 32), dx;
		}
		function tl(e, t, n) {
			if ($x && console.error("useInsertionEffect must not schedule updates."), Jx && (Yx = !0), (e === Wb && (tx === qb || tx === ex) || e.cancelPendingCommit !== null) && (ll(e, 0), al(e, $, dx, !1)), He(e, n), (Ub & Pb) !== Nb && e === Wb) {
				if (hp) switch (t.tag) {
					case 0:
					case 11:
					case 15:
						e = Q && x(Q) || "Unknown", nS.has(e) || (nS.add(e), t = x(t) || "Unknown", console.error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render", t, e, e));
						break;
					case 1: tS ||= (console.error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), !0);
				}
			} else Np && Je(e, t, n), ql(t), e === Wb && ((Ub & Pb) === Nb && (lx |= n), sx === Bb && al(e, $, dx, !1)), Jl(e);
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
			a = (n = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Re(e, t)) ? vl(e, t) : gl(e, t, !0);
			var o = n;
			do {
				if (a === Ib) {
					ix && !n && al(e, t, 0, !1), t = tx, ev = h_(), $_ = t;
					break;
				} else {
					if (r = xp(), i = e.current.alternate, o && !il(i)) {
						tr(t), i = y_, a = r, !bg || a <= i || (Sx ? Sx.run(console.timeStamp.bind(console, "Teared Render", i, a, W, U, "error")) : console.timeStamp("Teared Render", i, a, W, U, "error")), cl(t, r), a = gl(e, t, !1), o = !1;
						continue;
					}
					if (a === Rb) {
						if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
						else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
						if (s !== 0) {
							tr(t), dr(y_, r, t, Sx), cl(t, r), t = s;
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
						tr(t), dr(y_, r, t, Sx), cl(t, r), ll(e, 0), al(e, t, 0, !0);
						break;
					}
					a: {
						switch (n = e, a) {
							case Ib:
							case Lb: throw Error("Root did not complete. This is a bug in React.");
							case Bb: if ((t & 4194048) !== t) break;
							case Vb:
								tr(t), cr(y_, r, t, Sx), cl(t, r), i = t, i & 127 ? L_ = r : i & 4194048 && (J_ = r), al(n, t, dx, !rx);
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
								if (al(n, t, dx, !rx), Le(n, 0, !0) !== 0) break a;
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
				unsuspend: fn
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
			n !== 0 && We(e, n, t);
		}
		function ol() {
			return (Ub & (Pb | Fb)) === Nb ? (R(0, !1), !1) : !0;
		}
		function sl() {
			if (Q !== null) {
				if (tx === Gb) var e = Q.return;
				else e = Q, ti(), ja(e), Uv = null, Wv = 0, e = Q;
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
				if (tr($), sx === zb || sx === Bb) cr(n, y_, t, Sx);
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
				Sx = A_, i = 0 <= k_ && k_ < O_ ? O_ : k_, r = 0 <= P_ && P_ < O_ ? O_ : P_, a = 0 <= r ? r : 0 <= i ? i : y_, 0 <= L_ ? (tr(2), lr(L_, a, t, n)) : Z_ & 127 && (tr(2), mr(O_, a, Q_)), n = i;
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
			if (t & 4194048 && (Sx = H_, i = 0 <= z_ && z_ < R_ ? R_ : z_, n = 0 <= B_ && B_ < R_ ? R_ : B_, r = 0 <= G_ && G_ < R_ ? R_ : G_, a = 0 <= r ? r : 0 <= n ? n : y_, 0 <= J_ ? (tr(256), lr(J_, a, t, Sx)) : Z_ & 4194048 && (tr(256), mr(R_, a, Q_)), d = r, s = K_, c = 0 < q_, l = V_ === v_, a = y_, r = H_, o = U_, u = W_, bg && (W = "Transition", 0 < n ? n > a && (n = a) : n = a, 0 < i ? i > n && (i = n) : i = n, 0 < d ? d > i && (d = i) : d = i, i > d && s !== null && (f = c ? "secondary-light" : "warning", r ? r.run(console.timeStamp.bind(console, c ? "Consecutive" : "Event: " + s, d, i, W, U, f)) : console.timeStamp(c ? "Consecutive" : "Event: " + s, d, i, W, U, f)), n > i && (r ? r.run(console.timeStamp.bind(console, "Action", i, n, W, U, "primary-dark")) : console.timeStamp("Action", i, n, W, U, "primary-dark")), a > n && (i = l ? "Promise Resolved" : 5 < a - n ? "Update Blocked" : "Update", d = [], u != null && d.push(["Component name", u]), o != null && d.push(["Method name", o]), n = {
				start: n,
				end: a,
				detail: { devtools: {
					properties: d,
					track: W,
					trackGroup: U,
					color: "primary-light"
				} }
			}, r ? r.run(performance.measure.bind(performance, i, n)) : performance.measure(i, n))), B_ = z_ = -1.1, V_ = 0, J_ = -1.1, q_ = G_, G_ = -1.1, R_ = h_()), t & 62914560 && Z_ & 62914560 && (tr(4194304), mr(Y_, y_, Q_)), t & 2080374784 && Z_ & 2080374784 && (tr(268435456), mr(X_, y_, Q_)), n = e.timeoutHandle, n !== $S && (e.timeoutHandle = $S, QS(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Lx = 0, sl(), Wb = e, Q = n = Or(e.current, null), $ = t, tx = Gb, nx = null, rx = !1, ix = Re(e, t), ax = !1, sx = Ib, fx = dx = ux = lx = cx = 0, mx = px = null, hx = !1, t & 8 && (t |= t & 32), r = e.entangledLanes, r !== 0) for (e = e.entanglements, r &= t; 0 < r;) i = 31 - Pp(r), a = 1 << i, t |= e[i], r &= ~a;
			return ox = t, hr(), e = lg(), 1e3 < e - sg && (H.recentlyCreatedOwnerStacks = 0, sg = e), lv.discardPendingWarnings(), n;
		}
		function ul(e, t) {
			X = null, H.H = Ly, H.getCurrentStack = null, hp = !1, mp = null, t === Lv || t === zv ? (t = Wi(), tx = Jb) : t === Rv ? (t = Wi(), tx = Yb) : tx = t === ab ? $b : typeof t == "object" && t && typeof t.then == "function" ? Zb : Kb, nx = t;
			var n = Q;
			n === null ? (sx = Lb, is(e, Ir(t, e.current))) : n.mode & K && Oi(n);
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
					0 < o.size && (Gl(e, $), o.clear()), Ye(e, t);
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
			return t && e.shellSuspendCounter++, ti(), Ub = r, H.H = i, H.A = a, Q === null && (Wb = null, $ = 0, hr()), o;
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
					0 < a.size && (Gl(e, $), a.clear()), Ye(e, t);
				}
				xx = null, yx = xp() + bx, ll(e, t);
			} else ix = Re(e, t);
			a: do
				try {
					if (tx !== Gb && Q !== null) b: switch (t = Q, a = nx, tx) {
						case Kb:
							tx = Gb, nx = null, Cl(e, t, a, Kb);
							break;
						case qb:
						case ex:
							if (Vi(a)) {
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
							Vi(a) ? (tx = Gb, nx = null, xl(t)) : (tx = Gb, nx = null, Cl(e, t, a, Qb));
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
			return ti(), H.H = r, H.A = i, Ub = n, Q === null ? (Wb = null, $ = 0, hr(), sx) : Ib;
		}
		function yl() {
			for (; Q !== null && !yp();) bl(Q);
		}
		function bl(e) {
			var t = e.alternate;
			(e.mode & K) === G ? t = T(e, Ls, t, e, ox) : (Di(e), t = T(e, Ls, t, e, ox), Oi(e)), e.memoizedProps = e.pendingProps, t === null ? wl(e) : Q = t;
		}
		function xl(e) {
			var t = T(e, Sl, e);
			e.memoizedProps = e.pendingProps, t === null ? wl(e) : Q = t;
		}
		function Sl(e) {
			var t = e.alternate, n = (e.mode & K) !== G;
			switch (n && Di(e), e.tag) {
				case 15:
				case 0:
					t = Ss(t, e, e.pendingProps, e.type, void 0, $);
					break;
				case 11:
					t = Ss(t, e, e.pendingProps, e.type.render, e.ref, $);
					break;
				case 5: ja(e);
				default: Ks(t, e), e = Q = kr(e, ox), t = Ls(t, e, ox);
			}
			return n && Oi(e), t;
		}
		function Cl(e, t, n, r) {
			ti(), ja(t), Uv = null, Wv = 0;
			var i = t.return;
			try {
				if (ls(e, i, t, n, $)) {
					sx = Lb, is(e, Ir(n, e.current)), Q = null;
					return;
				}
			} catch (t) {
				if (i !== null) throw Q = i, t;
				sx = Lb, is(e, Ir(n, e.current)), Q = null;
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
				if (e = t.return, Di(t), n = T(t, Ws, n, t, ox), (t.mode & K) !== G && ki(t), n !== null) {
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
					ki(e), n = e.actualDuration;
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
			if (tr(n), l === Rb ? dr(f, p, n, Sx) : r === null ? sr(f, p, n, Sx) : ur(f, p, n, r, t !== null && t.alternate !== null && t.alternate.memoizedState.isDehydrated && (t.flags & 256) != 0, Sx), t !== null) {
				if (n === 0 && console.error("finishedLanes should not be empty during a commit. This is a bug in React."), t === e.current) throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
				if (a = t.lanes | t.childLanes, a |= Mg, Ue(e, n, a, o, s, c), e === Wb && (Q = Wb = null, $ = 0), Ix = t, Fx = e, Lx = n, Rx = a, Bx = i, Vx = r, zx = p, Hx = d, Ux = wx, Wx = null, t.actualDuration !== 0 || t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Kl(Tp, function() {
					return XS = window.event, Ux === wx && (Ux = Ex), Nl(), null;
				})) : (e.callbackNode = null, e.callbackPriority = 0), S_ = null, b_ = h_(), d !== null && fr(p, b_, d, Sx), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
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
						Sb = n, Cb = e, bi(), Oc(t, e), Cb = Sb = null, n = qS;
						var o = Gn(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
						if (o !== s && s && s.ownerDocument && Wn(s.ownerDocument.documentElement, s)) {
							if (c !== null && Kn(s)) {
								var l = c.start, u = c.end;
								if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
								else {
									var d = s.ownerDocument || document, f = d && d.defaultView || window;
									if (f.getSelection) {
										var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
										!p.extend && h > g && (o = g, g = h, h = o);
										var _ = Un(s, h), v = Un(s, g);
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
						Sb = n, Cb = e, bi(), yc(e, t.alternate, t), Cb = Sb = null;
					} finally {
						Ub = a, qf.p = i, H.T = r;
					}
				}
				e = zx, t = Hx, x_ = h_(), e = t === null ? e : b_, t = x_, n = Ux === Tx, r = Sx, S_ === null ? !bg || t <= e || (r ? r.run(console.timeStamp.bind(console, n ? "Commit Interrupted View Transition" : "Commit", e, t, W, U, n ? "error" : "secondary-dark")) : console.timeStamp(n ? "Commit Interrupted View Transition" : "Commit", e, t, W, U, n ? "error" : "secondary-dark")) : pr(e, t, S_, !1, r), Px = jx;
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
				if (a === 0 && (Cx = null), i || Ul(e), a = Xe(t), r = r.stateNode, jp && typeof jp.onCommitFiberRoot == "function") try {
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
							T(l.source, c, l.value, u);
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
			(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, mi(t)));
		}
		function Ml() {
			return Dl(), Ol(), kl(), Nl();
		}
		function Nl() {
			if (Px !== Nx) return !1;
			var e = Fx, t = Rx;
			Rx = 0;
			var n = Xe(Lx), r = Hp === 0 || Hp > n ? Hp : n;
			n = H.T;
			var i = qf.p;
			try {
				qf.p = r, H.T = null;
				var a = Bx;
				Bx = null, r = Fx;
				var o = Lx;
				if (Px = Ox, Ix = Fx = null, Lx = 0, (Ub & (Pb | Fb)) !== Nb) throw Error("Cannot flush passive effects while already rendering.");
				tr(o), Jx = !0, Yx = !1;
				var s = 0;
				if (S_ = null, s = xp(), Ux === Dx) mr(x_, s, Q_);
				else {
					var c = x_, l = s, u = Ux === Ex;
					!bg || l <= c || (Sx ? Sx.run(console.timeStamp.bind(console, u ? "Waiting for Paint" : "Waiting", c, l, W, U, "secondary-light")) : console.timeStamp(u ? "Waiting for Paint" : "Waiting", c, l, W, U, "secondary-light"));
				}
				c = Ub, Ub |= Fb;
				var d = r.current;
				bi(), qc(d);
				var f = r.current;
				d = zx, bi(), zc(r, f, o, a, d), Ul(r), Ub = c;
				var p = xp();
				if (f = s, d = Sx, S_ === null ? !bg || p <= f || (d ? d.run(console.timeStamp.bind(console, "Remaining Effects", f, p, W, U, "secondary-dark")) : console.timeStamp("Remaining Effects", f, p, W, U, "secondary-dark")) : pr(f, p, S_, !0, d), cl(o, p), R(0, !1), Yx ? r === Qx ? Zx++ : (Zx = 0, Qx = r) : Zx = 0, Yx = Jx = !1, jp && typeof jp.onPostCommitFiberRoot == "function") try {
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
			t = Ir(n, t), ji(t), t = os(e.stateNode, t, 2), e = sa(e, t, 2), e !== null && (He(e, 2), Jl(e));
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
							e = Ir(n, e), ji(e), n = ss(2), r = sa(t, n, 2), r !== null && (cs(n, r, t, e), He(r, 2), Jl(r));
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
			t === 0 && (t = Be()), e = vr(e, t), e !== null && (He(e, t), Jl(e));
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
				a = n || a, i.tag === 22 ? i.memoizedState === null && (a && i.flags & 8192 ? T(i, Hl, r, i) : i.subtreeFlags & 67108864 && T(i, Vl, r, i, a)) : i.flags & 67108864 ? a && T(i, Hl, r, i) : Vl(r, i, a), t = t.sibling;
			}
		}
		function Hl(e, t) {
			Pe(!0);
			try {
				Mc(t), Yc(t), Pc(e, t.alternate, t, !1), Vc(e, t, 0, null, !1, 0);
			} finally {
				Pe(!1);
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
					if (t = x(e) || "ReactComponent", eS !== null) {
						if (eS.has(t)) return;
						eS.add(t);
					} else eS = /* @__PURE__ */ new Set([t]);
					T(e, function() {
						console.error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead.");
					});
				}
			}
		}
		function Gl(e, t) {
			Np && e.memoizedUpdaters.forEach(function(n) {
				Je(e, n, t);
			});
		}
		function Kl(e, t) {
			var n = H.actQueue;
			return n === null ? _p(e, t) : (n.push(t), rS);
		}
		function ql(e) {
			Qc() && H.actQueue === null && T(e, function() {
				console.error("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act", x(e));
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
						} else a = $, a = Le(r, r === Wb ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== $S), !(a & 3) || Re(r, a) || (n = !0, $l(r, a));
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
				c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = ze(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
			}
			if (t = Wb, n = $, n = Le(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== $S), r = e.callbackNode, n === 0 || e === t && (tx === qb || tx === ex) || e.cancelPendingCommit !== null) return r !== null && eu(r), e.callbackNode = null, e.callbackPriority = 0;
			if (!(n & 3) || Re(e, n)) {
				if (t = n & -n, t !== e.callbackPriority || H.actQueue !== null && r !== dS) eu(r);
				else return t;
				switch (Xe(n)) {
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
			return r = Le(e, e === Wb ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== $S), r === 0 ? null : (nl(e, r, t), Zl(e, xp()), e.callbackNode != null && e.callbackNode === n ? Ql.bind(null, e) : null);
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
			return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (Ae(e, "action"), dn("" + e));
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
									Object.freeze(t), No(n, t, null, e);
								}
							} else typeof a == "function" && (s.preventDefault(), e = o ? iu(i, o) : new FormData(i), t = {
								pending: !0,
								data: e,
								method: i.method,
								action: a
							}, Object.freeze(t), No(n, t, a, e));
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
						c === null ? ou(a, s, l) : T(c, ou, a, s, l), i = c;
					}
					else for (o = 0; o < r.length; o++) {
						if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? ou(a, s, l) : T(c, ou, a, s, l), i = c;
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
						if (o = et(s), o === null) return;
						if (c = o.tag, c === 5 || c === 6 || c === 26 || c === 27) {
							r = a = o;
							continue a;
						}
						s = s.parentNode;
					}
				}
				r = r.return;
			}
			hn(function() {
				var r = a, i = pn(n), o = [];
				a: {
					var s = ag.get(e);
					if (s !== void 0) {
						var c = oh, l = e;
						switch (e) {
							case "keypress": if (vn(n) === 0) break a;
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
							if (m = h.stateNode, h = h.tag, h !== 5 && h !== 26 && h !== 27 || m === null || f === null || (h = gn(p, f), h != null && u.push(fu(p, h, m))), d) break;
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
						if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== Ym && (l = n.relatedTarget || n.fromElement) && (et(l) || l[qp])) break a;
						if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? et(l) : null, l !== null && (d = ee(l), u = l.tag, l !== d || u !== 5 && u !== 27 && u !== 6) && (l = null)) : (c = null, l = r), c !== l)) {
							if (u = ph, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = wh, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = c == null ? s : nt(c), m = l == null ? s : nt(l), s = new u(h, p + "leave", c, n, i), s.target = d, s.relatedTarget = m, h = null, et(i) === r && (u = new u(f, p + "enter", l, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, c && l) b: {
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
						if (s = r ? nt(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var _ = Nn;
						else if (On(s)) if (Hh) _ = zn;
						else {
							_ = Ln;
							var v = In;
						}
						else c = s.nodeName, !c || c.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && an(r.elementType) && (_ = Nn) : _ = Rn;
						if (_ &&= _(e, r)) {
							An(o, _, n, i);
							break a;
						}
						v && v(e, s, r), e === "focusout" && r && s.type === "number" && r.memoizedProps.value != null && Ct(s, "number", s.value);
					}
					switch (v = r ? nt(r) : window, e) {
						case "focusin":
							(On(v) || v.contentEditable === "true") && (Gh = v, Kh = r, qh = null);
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
							Jh = !1, qn(o, n, i);
							break;
						case "selectionchange": if (Wh) break;
						case "keydown":
						case "keyup": qn(o, n, i);
					}
					var y;
					if (jh) b: {
						switch (e) {
							case "compositionstart":
								var b = "onCompositionStart";
								break b;
							case "compositionend":
								b = "onCompositionEnd";
								break b;
							case "compositionupdate":
								b = "onCompositionUpdate";
								break b;
						}
						b = void 0;
					}
					else Rh ? wn(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === Ah && (b = "onCompositionStart");
					b && (Ph && n.locale !== "ko" && (Rh || b !== "onCompositionStart" ? b === "onCompositionEnd" && Rh && (y = _n()) : (nh = i, rh = "value" in nh ? nh.value : nh.textContent, Rh = !0)), v = pu(r, b), 0 < v.length && (b = new vh(b, e, null, n, i), o.push({
						event: b,
						listeners: v
					}), y ? b.data = y : (y = Tn(n), y !== null && (b.data = y)))), (y = Nh ? En(e, n) : Dn(e, n)) && (b = pu(r, "onBeforeInput"), 0 < b.length && (v = new yh("onBeforeInput", "beforeinput", null, n, i), o.push({
						event: v,
						listeners: b
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
				if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = gn(e, n), i != null && r.unshift(fu(e, i, a)), i = gn(e, t), i != null && r.push(fu(e, i, a))), e.tag === 3) return r;
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
				s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = gn(n, a), l != null && o.unshift(fu(n, l, c))) : i || (l = gn(n, a), l != null && o.push(fu(n, l, c)))), n = n.return;
			}
			o.length !== 0 && e.push({
				event: t,
				listeners: o
			});
		}
		function gu(e, t) {
			cn(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || Hm || (Hm = !0, e === "select" && t.multiple ? console.error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : console.error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
			var n = {
				registrationNameDependencies: em,
				possibleRegistrationNames: tm
			};
			an(e) || typeof t.is == "string" || un(e, t, n), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
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
			return Oe(e) && (console.error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.", De(e)), ke(e)), (typeof e == "string" ? e : "" + e).replace(CS, "\n").replace(wS, "");
		}
		function Su(e, t) {
			return t = xu(t), xu(e) === t;
		}
		function Cu(e, t, n, r, i, a) {
			switch (n) {
				case "children":
					typeof r == "string" ? ($t(r, t, !1), t === "body" || t === "textarea" && r === "" || en(e, r)) : (typeof r == "number" || typeof r == "bigint") && ($t("" + r, t, !1), t !== "body" && en(e, "" + r));
					break;
				case "className":
					dt(e, "class", r);
					break;
				case "tabIndex":
					dt(e, "tabindex", r);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					dt(e, n, r);
					break;
				case "style":
					rn(e, r, a);
					break;
				case "data": if (t !== "object") {
					dt(e, "data", r);
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
					Ae(r, n), r = dn("" + r), e.setAttribute(n, r);
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
					Ae(r, n), r = dn("" + r), e.setAttribute(n, r);
					break;
				case "onClick":
					r != null && (typeof r != "function" && yu(n, r), e.onclick = fn);
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
					Ae(r, n), n = dn("" + r), e.setAttributeNS(TS, "xlink:href", n);
					break;
				case "contentEditable":
				case "spellCheck":
				case "draggable":
				case "value":
				case "autoReverse":
				case "externalResourcesRequired":
				case "focusable":
				case "preserveAlpha":
					r != null && typeof r != "function" && typeof r != "symbol" ? (Ae(r, n), e.setAttribute(n, "" + r)) : e.removeAttribute(n);
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
					!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? (Ae(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? (Ae(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "rowSpan":
				case "start":
					r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : (Ae(r, n), e.setAttribute(n, r));
					break;
				case "popover":
					z("beforetoggle", e), z("toggle", e), ut(e, "popover", r);
					break;
				case "xlinkActuate":
					ft(e, TS, "xlink:actuate", r);
					break;
				case "xlinkArcrole":
					ft(e, TS, "xlink:arcrole", r);
					break;
				case "xlinkRole":
					ft(e, TS, "xlink:role", r);
					break;
				case "xlinkShow":
					ft(e, TS, "xlink:show", r);
					break;
				case "xlinkTitle":
					ft(e, TS, "xlink:title", r);
					break;
				case "xlinkType":
					ft(e, TS, "xlink:type", r);
					break;
				case "xmlBase":
					ft(e, ES, "xml:base", r);
					break;
				case "xmlLang":
					ft(e, ES, "xml:lang", r);
					break;
				case "xmlSpace":
					ft(e, ES, "xml:space", r);
					break;
				case "is":
					a != null && console.error("Cannot update the \"is\" prop after it has been initialized."), ut(e, "is", r);
					break;
				case "innerText":
				case "textContent": break;
				case "popoverTarget": xS || typeof r != "object" || !r || (xS = !0, console.error("The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.", r));
				default: !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N" ? (n = on(n), ut(e, n, r)) : em.hasOwnProperty(n) && r != null && typeof r != "function" && yu(n, r);
			}
		}
		function wu(e, t, n, r, i, a) {
			switch (n) {
				case "style":
					rn(e, r, a);
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
					typeof r == "string" ? en(e, r) : (typeof r == "number" || typeof r == "bigint") && en(e, "" + r);
					break;
				case "onScroll":
					r != null && (typeof r != "function" && yu(n, r), z("scroll", e));
					break;
				case "onScrollEnd":
					r != null && (typeof r != "function" && yu(n, r), z("scrollend", e));
					break;
				case "onClick":
					r != null && (typeof r != "function" && yu(n, r), e.onclick = fn);
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
					n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : ut(e, n, r);
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
					st("input", n), z("invalid", e);
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
					bt(e, n), St(e, a, s, c, l, o, i, !1);
					return;
				case "select":
					for (i in st("select", n), z("invalid", e), r = o = a = null, n) if (n.hasOwnProperty(i) && (s = n[i], s != null)) switch (i) {
						case "value":
							a = s;
							break;
						case "defaultValue":
							o = s;
							break;
						case "multiple": r = s;
						default: Cu(e, t, i, s, n, null);
					}
					Dt(e, n), t = a, n = o, e.multiple = !!r, t == null ? n != null && Et(e, !!r, n, !0) : Et(e, !!r, t, !1);
					return;
				case "textarea":
					for (o in st("textarea", n), z("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(o) && (s = n[o], s != null)) switch (o) {
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
					Ot(e, n), At(e, r, i, a);
					return;
				case "option":
					for (c in wt(e, n), n) if (n.hasOwnProperty(c) && (r = n[c], r != null)) switch (c) {
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
				default: if (an(t)) {
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
					t = n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null, r = r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null, t || !r || gS || (console.error("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), gS = !0), !t || r || hS || (console.error("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), hS = !0), xt(e, o, s, c, l, u, a, i);
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
					r = s, t = o, n = p, f == null ? !!n != !!t && (r == null ? Et(e, !!t, t ? [] : "", !1) : Et(e, !!t, r, !0)) : Et(e, !!t, f, !1);
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
					kt(e, f, p);
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
				default: if (an(t)) {
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
					o != null && typeof o != "boolean" && o !== "" && (a.indexOf("--") === 0 ? (je(o, a), r += i + a + ":" + ("" + o).trim()) : typeof o != "number" || o === 0 || Nm.has(a) ? (je(o, a), r += i + a.replace(Cm, "-$1").toLowerCase().replace(wm, "-ms-") + ":" + ("" + o).trim()) : r += i + a.replace(Cm, "-$1").toLowerCase().replace(wm, "-ms-") + ":" + o + "px", i = ";");
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
				default: if (Ae(r, t), e === "" + r) return;
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
				default: if (Ae(r, n), e === "" + r) return;
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
				default: if (!isNaN(r) && (Ae(r, t), e === "" + r)) return;
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
				default: if (Ae(r, t), n = dn("" + r), e === n) return;
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
			if (an(t)) {
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
								a.delete("class"), o = lt(e, "class", l), _u("className", o, l, i);
								continue;
							default: r.context === US && t !== "svg" && t !== "math" ? a.delete(c.toLowerCase()) : a.delete(c), o = lt(e, c, l), _u(c, o, l, i);
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
								default: if (Ae(c, o), s === "" + c) break a;
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
								default: if (!(isNaN(c) || 1 > c) && (Ae(c, o), s === "" + c)) break a;
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
						s = on(l), o = !1, r.context === US && t !== "svg" && t !== "math" ? a.delete(s.toLowerCase()) : (u = l.toLowerCase(), u = Lm.hasOwnProperty(u) && Lm[u] || null, u !== null && u !== l && (o = !0, a.delete(u)), a.delete(s));
						a: if (u = e, d = s, s = c, ct(d)) if (u.hasAttribute(d)) u = u.getAttribute(d), Ae(s, d), s = u === "" + s ? s : u;
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
			en(e, "");
		}
		function Zu(e, t, n) {
			e.nodeValue = n;
		}
		function Qu(e) {
			if (!e.__reactWarnedAboutChildrenConflict) {
				var t = e[Kp] || null;
				if (t !== null) {
					var n = tt(e);
					n !== null && (typeof t.children == "string" || typeof t.children == "number" ? (e.__reactWarnedAboutChildrenConflict = !0, T(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"children\" text content using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})) : t.dangerouslySetInnerHTML != null && (e.__reactWarnedAboutChildrenConflict = !0, T(n, function() {
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
						ud(n), $e(n);
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
					Ae(i.name, "name");
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
			switch (i && Qt(e, r.ancestorInfo), t = zu(n), e) {
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
			if (!n[qp] && tt(n)) {
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
			$e(e);
		}
		function Od(e) {
			return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
		}
		function kd(e, t, n) {
			var r = dC;
			if (r && typeof t == "string" && t) {
				var i = yt(t);
				i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), lC.has(i) || (lC.add(i), e = {
					rel: e,
					crossOrigin: n,
					href: t
				}, r.querySelector(i) === null && (t = r.createElement("link"), Tu(t, "link", e), it(t), r.head.appendChild(t)));
			}
		}
		function Ad(e, t, n, r) {
			var i = (i = ep.current) ? Od(i) : null;
			if (!i) throw Error("\"resourceRoot\" was expected to exist. This is a bug in React.");
			switch (e) {
				case "meta":
				case "title": return null;
				case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = B(n.href), t = rt(i).hoistableStyles, r = t.get(n), r || (r = {
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
						var a = rt(i).hoistableStyles, o = a.get(e);
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
				case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Fd(n), t = rt(i).hoistableScripts, r = t.get(n), r || (r = {
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
			return "href=\"" + yt(e) + "\"";
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
			}), Tu(t, "link", n), it(t), e.head.appendChild(t));
		}
		function Fd(e) {
			return "[src=\"" + yt(e) + "\"]";
		}
		function Id(e) {
			return "script[async]" + e;
		}
		function Ld(e, t, n) {
			if (t.count++, t.instance === null) switch (t.type) {
				case "style":
					var r = e.querySelector("style[data-href~=\"" + yt(n.href) + "\"]");
					if (r) return t.instance = r, it(r), r;
					var i = V({}, n, {
						"data-href": n.href,
						"data-precedence": n.precedence,
						href: null,
						precedence: null
					});
					return r = (e.ownerDocument || e).createElement("style"), it(r), Tu(r, "style", i), Rd(r, n.precedence, e), t.instance = r;
				case "stylesheet":
					i = B(n.href);
					var a = e.querySelector(Md(i));
					if (a) return t.state.loading |= sC, t.instance = a, it(a), a;
					r = Nd(n), (i = cC.get(i)) && zd(r, i), a = (e.ownerDocument || e).createElement("link"), it(a);
					var o = a;
					return o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Tu(a, "link", r), t.state.loading |= sC, Rd(a, n.precedence, e), t.instance = a;
				case "script": return a = Fd(n.src), (i = e.querySelector(Id(a))) ? (t.instance = i, it(i), i) : (r = n, (i = cC.get(a)) && (r = V({}, n), Bd(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), it(i), Tu(i, "link", r), e.head.appendChild(i), t.instance = i);
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
						t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = qd.bind(e), t.then(e, e)), n.state.loading |= sC, n.instance = a, it(a);
						return;
					}
					a = t.ownerDocument || t, r = Nd(r), (i = cC.get(i)) && zd(r, i), a = a.createElement("link"), it(a);
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
			for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = $S, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ve(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ve(0), this.hiddenUpdates = Ve(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
			this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
		}
		function Zd(e, t, n, r, i, a, o, s, c, l, u, d) {
			return e = new Xd(e, t, n, o, c, l, u, d, s), t = Ig, !0 === a && (t |= Lg | Rg), t |= K, a = g(3, null, null, t), e.current = a, a.stateNode = e, t = fi(), pi(t), e.pooledCache = t, pi(t), a.memoizedState = {
				element: r,
				isDehydrated: n,
				cache: t
			}, ia(a), e;
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
			i = Qd(i), r.context === null ? r.context = i : r.pendingContext = i, hp && mp !== null && !EC && (EC = !0, console.error("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", x(mp) || "Unknown")), r = oa(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", a), r.callback = a), n = sa(e, r, t), n !== null && (hi(t, "root.render()", null), tl(n, e, t), D(n, e, t));
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
				var t = vr(e, 67108864);
				t !== null && tl(t, e, 67108864), tf(e, 67108864);
			}
		}
		function rf(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = $c(e);
				t = qe(t);
				var n = vr(e, t);
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
						var a = tt(i);
						if (a !== null) switch (a.tag) {
							case 3:
								if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
									var o = Ie(a.pendingLanes);
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
							case 13: s = vr(a, 2), s !== null && tl(s, a, 2), ol(), tf(a, 2);
						}
						if (a = lf(r), a === null && du(e, t, r, RC, n), a === i) break;
						i = a;
					}
					i !== null && r.stopPropagation();
				} else du(e, t, r, null, n);
			}
		}
		function lf(e) {
			return e = pn(e), uf(e);
		}
		function uf(e) {
			if (RC = null, e = et(e), e !== null) {
				var t = ee(e);
				if (t === null) e = null;
				else {
					var n = t.tag;
					if (n === 13) {
						if (e = te(t), e !== null) return e;
						e = null;
					} else if (n === 31) {
						if (e = ne(t), e !== null) return e;
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
			}, t !== null && (t = tt(t), t !== null && nf(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
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
			var t = et(e.target);
			if (t !== null) {
				var n = ee(t);
				if (n !== null) {
					if (t = n.tag, t === 13) {
						if (t = te(n), t !== null) {
							e.blockedOn = t, Qe(e.priority, function() {
								rf(n);
							});
							return;
						}
					} else if (t === 31) {
						if (t = ne(n), t !== null) {
							e.blockedOn = t, Qe(e.priority, function() {
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
				} else return t = tt(n), t !== null && nf(t), e.blockedOn = n, !1;
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
					var a = tt(n);
					a !== null && (e.splice(t, 3), t -= 3, n = {
						pending: !0,
						data: i,
						method: n.method,
						action: r
					}, Object.freeze(n), No(a, n, r, i));
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
		var Ef = i(), Df = r(), Of = a(), V = Object.assign, kf = Symbol.for("react.element"), Af = Symbol.for("react.transitional.element"), jf = Symbol.for("react.portal"), Mf = Symbol.for("react.fragment"), Nf = Symbol.for("react.strict_mode"), Pf = Symbol.for("react.profiler"), Ff = Symbol.for("react.consumer"), If = Symbol.for("react.context"), Lf = Symbol.for("react.forward_ref"), Rf = Symbol.for("react.suspense"), zf = Symbol.for("react.suspense_list"), Bf = Symbol.for("react.memo"), Vf = Symbol.for("react.lazy"), Hf = Symbol.for("react.activity"), Uf = Symbol.for("react.memo_cache_sentinel"), Wf = Symbol.iterator, Gf = Symbol.for("react.client.reference"), Kf = Array.isArray, H = Df.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, qf = Of.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Jf = Object.freeze({
			pending: !1,
			data: null,
			method: null,
			action: null
		}), Yf = [], Xf = [], Zf = -1, Qf = le(null), $f = le(null), ep = le(null), tp = le(null), np = 0, rp, ip, ap, op, sp, cp, lp;
		he.__reactDisabledLog = !0;
		var up, dp, fp = !1, pp = new (typeof WeakMap == "function" ? WeakMap : Map)(), mp = null, hp = !1, gp = Object.prototype.hasOwnProperty, _p = Ef.unstable_scheduleCallback, vp = Ef.unstable_cancelCallback, yp = Ef.unstable_shouldYield, bp = Ef.unstable_requestPaint, xp = Ef.unstable_now, Sp = Ef.unstable_getCurrentPriorityLevel, Cp = Ef.unstable_ImmediatePriority, wp = Ef.unstable_UserBlockingPriority, Tp = Ef.unstable_NormalPriority, Ep = Ef.unstable_LowPriority, Dp = Ef.unstable_IdlePriority, Op = Ef.log, kp = Ef.unstable_setDisableYieldValue, Ap = null, jp = null, Mp = !1, Np = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", Pp = Math.clz32 ? Math.clz32 : Fe, Fp = Math.log, Ip = Math.LN2, Lp = 256, Rp = 262144, zp = 4194304, Bp = 2, Vp = 8, Hp = 32, Up = 268435456, Wp = Math.random().toString(36).slice(2), Gp = "__reactFiber$" + Wp, Kp = "__reactProps$" + Wp, qp = "__reactContainer$" + Wp, Jp = "__reactEvents$" + Wp, Yp = "__reactListeners$" + Wp, Xp = "__reactHandles$" + Wp, Zp = "__reactResources$" + Wp, Qp = "__reactMarker$" + Wp, $p = /* @__PURE__ */ new Set(), em = {}, tm = {}, nm = {
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
		}, oh = xn(ah), sh = V({}, ah, {
			view: 0,
			detail: 0
		}), ch = xn(sh), lh, uh, dh, fh = V({}, sh, {
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
			getModifierState: Cn,
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
		}), ph = xn(fh), mh = xn(V({}, fh, { dataTransfer: 0 })), hh = xn(V({}, sh, { relatedTarget: 0 })), gh = xn(V({}, ah, {
			animationName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), _h = xn(V({}, ah, { clipboardData: function(e) {
			return "clipboardData" in e ? e.clipboardData : window.clipboardData;
		} })), vh = xn(V({}, ah, { data: 0 })), yh = vh, bh = {
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
		}, Ch = xn(V({}, sh, {
			key: function(e) {
				if (e.key) {
					var t = bh[e.key] || e.key;
					if (t !== "Unidentified") return t;
				}
				return e.type === "keypress" ? (e = vn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? xh[e.keyCode] || "Unidentified" : "";
			},
			code: 0,
			location: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			repeat: 0,
			locale: 0,
			getModifierState: Cn,
			charCode: function(e) {
				return e.type === "keypress" ? vn(e) : 0;
			},
			keyCode: function(e) {
				return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			},
			which: function(e) {
				return e.type === "keypress" ? vn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			}
		})), wh = xn(V({}, fh, {
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
		})), Th = xn(V({}, sh, {
			touches: 0,
			targetTouches: 0,
			changedTouches: 0,
			altKey: 0,
			metaKey: 0,
			ctrlKey: 0,
			shiftKey: 0,
			getModifierState: Cn
		})), Eh = xn(V({}, ah, {
			propertyName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), Dh = xn(V({}, fh, {
			deltaX: function(e) {
				return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
			},
			deltaY: function(e) {
				return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
			},
			deltaZ: 0,
			deltaMode: 0
		})), Oh = xn(V({}, ah, {
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
		$m && (Hh = kn("input") && (!document.documentMode || 9 < document.documentMode));
		var Uh = typeof Object.is == "function" ? Object.is : Bn, Wh = $m && "documentMode" in document && 11 >= document.documentMode, Gh = null, Kh = null, qh = null, Jh = !1, Yh = {
			animationend: Jn("Animation", "AnimationEnd"),
			animationiteration: Jn("Animation", "AnimationIteration"),
			animationstart: Jn("Animation", "AnimationStart"),
			transitionrun: Jn("Transition", "TransitionRun"),
			transitionstart: Jn("Transition", "TransitionStart"),
			transitioncancel: Jn("Transition", "TransitionCancel"),
			transitionend: Jn("Transition", "TransitionEnd")
		}, Xh = {}, Zh = {};
		$m && (Zh = document.createElement("div").style, "AnimationEvent" in window || (delete Yh.animationend.animation, delete Yh.animationiteration.animation, delete Yh.animationstart.animation), "TransitionEvent" in window || delete Yh.transitionend.transition);
		var Qh = Yn("animationend"), $h = Yn("animationiteration"), eg = Yn("animationstart"), tg = Yn("transitionrun"), ng = Yn("transitionstart"), rg = Yn("transitioncancel"), ig = Yn("transitionend"), ag = /* @__PURE__ */ new Map(), og = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
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
		var Vg = /* @__PURE__ */ new WeakMap(), Hg = [], Ug = 0, Wg = null, Gg = 0, Kg = [], qg = 0, Jg = null, Yg = 1, Xg = "", Zg = null, Qg = null, $g = !1, e_ = !1, t_ = null, n_ = null, r_ = !1, i_ = Error("Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), a_ = le(null), o_ = le(null), s_ = {}, c_ = null, l_ = null, u_ = !1, d_ = typeof AbortController < "u" ? AbortController : function() {
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
				Pi(e, t);
			}
			sv !== null && sv(e, t);
		};
		var cv = le(null), lv = {
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
				e.add(x(t) || "Component"), gv.add(t.type);
			}), uv = []);
			var t = /* @__PURE__ */ new Set();
			0 < dv.length && (dv.forEach(function(e) {
				t.add(x(e) || "Component"), gv.add(e.type);
			}), dv = []);
			var n = /* @__PURE__ */ new Set();
			0 < fv.length && (fv.forEach(function(e) {
				n.add(x(e) || "Component"), gv.add(e.type);
			}), fv = []);
			var r = /* @__PURE__ */ new Set();
			0 < pv.length && (pv.forEach(function(e) {
				r.add(x(e) || "Component"), gv.add(e.type);
			}), pv = []);
			var i = /* @__PURE__ */ new Set();
			0 < mv.length && (mv.forEach(function(e) {
				i.add(x(e) || "Component"), gv.add(e.type);
			}), mv = []);
			var a = /* @__PURE__ */ new Set();
			if (0 < hv.length && (hv.forEach(function(e) {
				a.add(x(e) || "Component"), gv.add(e.type);
			}), hv = []), 0 < t.size) {
				var o = h(t);
				console.error("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s", o);
			}
			0 < r.size && (o = h(r), console.error("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n\nPlease update the following components: %s", o)), 0 < a.size && (o = h(a), console.error("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s", o)), 0 < e.size && (o = h(e), console.warn("componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < n.size && (o = h(n), console.warn("componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < i.size && (o = h(i), console.warn("componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o));
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
						n.add(x(e) || "Component"), vv.add(e.type);
					});
					var r = h(n);
					T(t, function() {
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
		m = function(e, t, n) {
			if (typeof n == "object" && n && n._store && (!n._store.validated && n.key == null || n._store.validated === 2)) {
				if (typeof n._store != "object") throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
				n._store.validated = 1;
				var r = x(e), i = r || "null";
				if (!qv[i]) {
					qv[i] = !0, n = n._owner, e = e._debugOwner;
					var a = "";
					e && typeof e.tag == "number" && (i = x(e)) && (a = "\n\nCheck the render method of `" + i + "`."), a || r && (a = "\n\nCheck the top-level render call using <" + r + ">.");
					var o = "";
					n != null && e !== n && (r = null, typeof n.tag == "number" ? r = x(n) : typeof n.name == "string" && (r = n.name), r && (o = " It was passed a child from " + r + ".")), T(t, function() {
						console.error("Each child in a list should have a unique \"key\" prop.%s%s See https://react.dev/link/warning-keys for more information.", a, o);
					});
				}
			}
		};
		var Xv = na(!0), Zv = na(!1), Qv = 0, $v = 1, ey = 2, ty = 3, ny = !1, ry = !1, iy = null, ay = !1, oy = le(null), sy = le(0), cy = le(null), ly = null, uy = 1, dy = 2, fy = le(0), py = 0, my = 1, hy = 2, gy = 4, _y = 8, vy, yy = /* @__PURE__ */ new Set(), by = /* @__PURE__ */ new Set(), xy = /* @__PURE__ */ new Set(), Sy = /* @__PURE__ */ new Set(), Cy = 0, X = null, wy = null, Ty = null, Ey = !1, Dy = !1, Oy = !1, ky = 0, Ay = 0, jy = null, My = 0, Ny = 25, Z = null, Py = null, Fy = -1, Iy = !1, Ly = {
			readContext: li,
			use: Fa,
			useCallback: wa,
			useContext: wa,
			useEffect: wa,
			useImperativeHandle: wa,
			useLayoutEffect: wa,
			useInsertionEffect: wa,
			useMemo: wa,
			useReducer: wa,
			useRef: wa,
			useState: wa,
			useDebugValue: wa,
			useDeferredValue: wa,
			useTransition: wa,
			useSyncExternalStore: wa,
			useId: wa,
			useHostTransitionStatus: wa,
			useFormState: wa,
			useActionState: wa,
			useOptimistic: wa,
			useMemoCache: wa,
			useCacheRefresh: wa
		};
		Ly.useEffectEvent = wa;
		var Ry = null, zy = null, By = null, Vy = null, Hy = null, Uy = null, Wy = null;
		Ry = {
			readContext: function(e) {
				return li(e);
			},
			use: Fa,
			useCallback: function(e, t) {
				return Z = "useCallback", k(), Sa(t), I(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", k(), li(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", k(), Sa(t), go(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", k(), Sa(n), xo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", k(), Sa(t), mo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", k(), Sa(t), yo(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", k(), Sa(t);
				var n = H.H;
				H.H = Hy;
				try {
					return wo(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", k();
				var r = H.H;
				H.H = Hy;
				try {
					return Ra(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", k(), po(e);
			},
			useState: function(e) {
				Z = "useState", k();
				var t = H.H;
				H.H = Hy;
				try {
					return Ya(e);
				} finally {
					H.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", k();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", k(), Eo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", k(), Io();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", k(), Va(e, t, n);
			},
			useId: function() {
				return Z = "useId", k(), Bo();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", k(), Ca(), oo(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", k(), oo(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", k(), P(e);
			},
			useHostTransitionStatus: zo,
			useMemoCache: Ia,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", k(), Vo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", k(), vo(e);
			}
		}, zy = {
			readContext: function(e) {
				return li(e);
			},
			use: Fa,
			useCallback: function(e, t) {
				return Z = "useCallback", A(), I(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", A(), li(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", A(), go(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", A(), xo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", A(), mo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", A(), yo(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", A();
				var n = H.H;
				H.H = Hy;
				try {
					return wo(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", A();
				var r = H.H;
				H.H = Hy;
				try {
					return Ra(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", A(), po(e);
			},
			useState: function(e) {
				Z = "useState", A();
				var t = H.H;
				H.H = Hy;
				try {
					return Ya(e);
				} finally {
					H.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", A();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", A(), Eo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", A(), Io();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", A(), Va(e, t, n);
			},
			useId: function() {
				return Z = "useId", A(), Bo();
			},
			useActionState: function(e, t) {
				return Z = "useActionState", A(), oo(e, t);
			},
			useFormState: function(e, t) {
				return Z = "useFormState", A(), Ca(), oo(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", A(), P(e);
			},
			useHostTransitionStatus: zo,
			useMemoCache: Ia,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", A(), Vo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", A(), vo(e);
			}
		}, By = {
			readContext: function(e) {
				return li(e);
			},
			use: Fa,
			useCallback: function(e, t) {
				return Z = "useCallback", A(), Co(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", A(), li(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", A(), ho(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", A(), So(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", A(), ho(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", A(), ho(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", A();
				var n = H.H;
				H.H = Uy;
				try {
					return To(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", A();
				var r = H.H;
				H.H = Uy;
				try {
					return za(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", A(), Ma().memoizedState;
			},
			useState: function() {
				Z = "useState", A();
				var e = H.H;
				H.H = Uy;
				try {
					return za(La);
				} finally {
					H.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", A();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", A(), Do(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", A(), Lo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", A(), Ha(e, t, n);
			},
			useId: function() {
				return Z = "useId", A(), Ma().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", A(), Ca(), so(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", A(), so(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", A(), Xa(e, t);
			},
			useHostTransitionStatus: zo,
			useMemoCache: Ia,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", A(), Ma().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", A(), F(e);
			}
		}, Vy = {
			readContext: function(e) {
				return li(e);
			},
			use: Fa,
			useCallback: function(e, t) {
				return Z = "useCallback", A(), Co(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", A(), li(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", A(), ho(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", A(), So(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", A(), ho(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", A(), ho(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", A();
				var n = H.H;
				H.H = Wy;
				try {
					return To(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", A();
				var r = H.H;
				H.H = Wy;
				try {
					return N(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", A(), Ma().memoizedState;
			},
			useState: function() {
				Z = "useState", A();
				var e = H.H;
				H.H = Wy;
				try {
					return N(La);
				} finally {
					H.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", A();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", A(), Oo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", A(), Ro();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", A(), Ha(e, t, n);
			},
			useId: function() {
				return Z = "useId", A(), Ma().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", A(), Ca(), uo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", A(), uo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", A(), Qa(e, t);
			},
			useHostTransitionStatus: zo,
			useMemoCache: Ia,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", A(), Ma().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", A(), F(e);
			}
		}, Hy = {
			readContext: function(e) {
				return f(), li(e);
			},
			use: function(e) {
				return d(), Fa(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", d(), k(), I(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", d(), k(), li(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", d(), k(), go(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", d(), k(), xo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", d(), k(), mo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", d(), k(), yo(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", d(), k();
				var n = H.H;
				H.H = Hy;
				try {
					return wo(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", d(), k();
				var r = H.H;
				H.H = Hy;
				try {
					return Ra(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", d(), k(), po(e);
			},
			useState: function(e) {
				Z = "useState", d(), k();
				var t = H.H;
				H.H = Hy;
				try {
					return Ya(e);
				} finally {
					H.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", d(), k();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", d(), k(), Eo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", d(), k(), Io();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", d(), k(), Va(e, t, n);
			},
			useId: function() {
				return Z = "useId", d(), k(), Bo();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", d(), k(), oo(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", d(), k(), oo(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", d(), k(), P(e);
			},
			useMemoCache: function(e) {
				return d(), Ia(e);
			},
			useHostTransitionStatus: zo,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", k(), Vo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", d(), k(), vo(e);
			}
		}, Uy = {
			readContext: function(e) {
				return f(), li(e);
			},
			use: function(e) {
				return d(), Fa(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", d(), A(), Co(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", d(), A(), li(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", d(), A(), ho(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", d(), A(), So(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", d(), A(), ho(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", d(), A(), ho(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", d(), A();
				var n = H.H;
				H.H = Uy;
				try {
					return To(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", d(), A();
				var r = H.H;
				H.H = Uy;
				try {
					return za(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", d(), A(), Ma().memoizedState;
			},
			useState: function() {
				Z = "useState", d(), A();
				var e = H.H;
				H.H = Uy;
				try {
					return za(La);
				} finally {
					H.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", d(), A();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", d(), A(), Do(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", d(), A(), Lo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", d(), A(), Ha(e, t, n);
			},
			useId: function() {
				return Z = "useId", d(), A(), Ma().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", d(), A(), so(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", d(), A(), so(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", d(), A(), Xa(e, t);
			},
			useMemoCache: function(e) {
				return d(), Ia(e);
			},
			useHostTransitionStatus: zo,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", A(), Ma().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", d(), A(), F(e);
			}
		}, Wy = {
			readContext: function(e) {
				return f(), li(e);
			},
			use: function(e) {
				return d(), Fa(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", d(), A(), Co(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", d(), A(), li(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", d(), A(), ho(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", d(), A(), So(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", d(), A(), ho(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", d(), A(), ho(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", d(), A();
				var n = H.H;
				H.H = Uy;
				try {
					return To(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", d(), A();
				var r = H.H;
				H.H = Uy;
				try {
					return N(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", d(), A(), Ma().memoizedState;
			},
			useState: function() {
				Z = "useState", d(), A();
				var e = H.H;
				H.H = Uy;
				try {
					return N(La);
				} finally {
					H.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", d(), A();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", d(), A(), Oo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", d(), A(), Ro();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", d(), A(), Ha(e, t, n);
			},
			useId: function() {
				return Z = "useId", d(), A(), Ma().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", d(), A(), uo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", d(), A(), uo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", d(), A(), Qa(e, t);
			},
			useMemoCache: function(e) {
				return d(), Ia(e);
			},
			useHostTransitionStatus: zo,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", A(), Ma().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", d(), A(), F(e);
			}
		};
		var Gy = {}, Ky = /* @__PURE__ */ new Set(), qy = /* @__PURE__ */ new Set(), Jy = /* @__PURE__ */ new Set(), Yy = /* @__PURE__ */ new Set(), Xy = /* @__PURE__ */ new Set(), Zy = /* @__PURE__ */ new Set(), Qy = /* @__PURE__ */ new Set(), $y = /* @__PURE__ */ new Set(), eb = /* @__PURE__ */ new Set(), tb = /* @__PURE__ */ new Set();
		Object.freeze(Gy);
		var nb = {
			enqueueSetState: function(e, t, n) {
				e = e._reactInternals;
				var r = $c(e), i = oa(r);
				i.payload = t, n != null && (Xo(n), i.callback = n), t = sa(e, i, r), t !== null && (hi(r, "this.setState()", e), tl(t, e, r), D(t, e, r));
			},
			enqueueReplaceState: function(e, t, n) {
				e = e._reactInternals;
				var r = $c(e), i = oa(r);
				i.tag = $v, i.payload = t, n != null && (Xo(n), i.callback = n), t = sa(e, i, r), t !== null && (hi(r, "this.replaceState()", e), tl(t, e, r), D(t, e, r));
			},
			enqueueForceUpdate: function(e, t) {
				e = e._reactInternals;
				var n = $c(e), r = oa(n);
				r.tag = ey, t != null && (Xo(t), r.callback = t), t = sa(e, r, n), t !== null && (hi(n, "this.forceUpdate()", e), tl(t, e, n), D(t, e, n));
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
				var t = li(m_), n = t.data.get(e);
				return n === void 0 && (n = e(), t.data.set(e, n)), n;
			},
			cacheSignal: function() {
				return li(m_).controller.signal;
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
				t = t[0].toUpperCase() + t.slice(1), Xn(n, "on" + t);
			}
			Xn(Qh, "onAnimationEnd"), Xn($h, "onAnimationIteration"), Xn(eg, "onAnimationStart"), Xn("dblclick", "onDoubleClick"), Xn("focusin", "onFocus"), Xn("focusout", "onBlur"), Xn(tg, "onTransitionRun"), Xn(ng, "onTransitionStart"), Xn(rg, "onTransitionCancel"), Xn(ig, "onTransitionEnd");
		})(), ot("onMouseEnter", ["mouseout", "mouseover"]), ot("onMouseLeave", ["mouseout", "mouseover"]), ot("onPointerEnter", ["pointerout", "pointerover"]), ot("onPointerLeave", ["pointerout", "pointerover"]), at("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), at("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), at("onBeforeInput", [
			"compositionend",
			"keypress",
			"textInput",
			"paste"
		]), at("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), at("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), at("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
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
				var t = tt(e);
				t !== null && t.tag === 5 && t.type === "form" ? Fo(t) : uC.r(e);
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
					var i = "link[rel=\"preload\"][as=\"" + yt(t) + "\"]";
					t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + yt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + yt(n.imageSizes) + "\"]")) : i += "[href=\"" + yt(e) + "\"]";
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
					}, n), cC.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Md(a)) || t === "script" && r.querySelector(Id(a)) || (t = r.createElement("link"), Tu(t, "link", e), it(t), r.head.appendChild(t)));
				}
			},
			m: function(e, t) {
				uC.m(e, t);
				var n = dC;
				if (n && e) {
					var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + yt(r) + "\"][href=\"" + yt(e) + "\"]", a = i;
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
						r = n.createElement("link"), Tu(r, "link", e), it(r), n.head.appendChild(r);
					}
				}
			},
			X: function(e, t) {
				uC.X(e, t);
				var n = dC;
				if (n && e) {
					var r = rt(n).hoistableScripts, i = Fd(e), a = r.get(i);
					a || (a = n.querySelector(Id(i)), a || (e = V({
						src: e,
						async: !0
					}, t), (t = cC.get(i)) && Bd(e, t), a = n.createElement("script"), it(a), Tu(a, "link", e), n.head.appendChild(a)), a = {
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
					var i = rt(r).hoistableStyles, a = B(e);
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
							it(c), Tu(c, "link", e), c._p = new Promise(function(e, t) {
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
					var r = rt(n).hoistableScripts, i = Fd(e), a = r.get(i);
					a || (a = n.querySelector(Id(i)), a || (e = V({
						src: e,
						async: !0,
						type: "module"
					}, t), (t = cC.get(i)) && Bd(e, t), a = n.createElement("script"), it(a), Tu(a, "link", e), n.head.appendChild(a)), a = {
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
			r = t(e, r), r !== null && (i = n(r.memoizedState, i, 0, a), r.memoizedState = i, r.baseState = i, e.memoizedProps = V({}, e.memoizedProps), i = vr(e, 2), i !== null && tl(i, e, 2));
		}, OC = function(e, n, r) {
			n = t(e, n), n !== null && (r = c(n.memoizedState, r, 0), n.memoizedState = r, n.baseState = r, e.memoizedProps = V({}, e.memoizedProps), r = vr(e, 2), r !== null && tl(r, e, 2));
		}, kC = function(e, n, r, i) {
			n = t(e, n), n !== null && (r = o(n.memoizedState, r, i), n.memoizedState = r, n.baseState = r, e.memoizedProps = V({}, e.memoizedProps), r = vr(e, 2), r !== null && tl(r, e, 2));
		}, AC = function(e, t, r) {
			e.pendingProps = n(e.memoizedProps, t, 0, r), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = vr(e, 2), t !== null && tl(t, e, 2);
		}, jC = function(e, t) {
			e.pendingProps = c(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = vr(e, 2), t !== null && tl(t, e, 2);
		}, MC = function(e, t, n) {
			e.pendingProps = o(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = vr(e, 2), t !== null && tl(t, e, 2);
		}, NC = function(e) {
			var t = vr(e, 2);
			t !== null && tl(t, e, 2);
		}, PC = function(e) {
			var t = Be(), n = vr(e, t);
			n !== null && tl(n, e, t);
		}, FC = function(e) {
			u = e;
		}, IC = function(e) {
			l = e;
		};
		var LC = !0, RC = null, zC = !1, BC = null, VC = null, HC = null, UC = /* @__PURE__ */ new Map(), WC = /* @__PURE__ */ new Map(), GC = [], KC = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" "), qC = null;
		if (wf.prototype.render = Cf.prototype.render = function(e) {
			var t = this._internalRoot;
			if (t === null) throw Error("Cannot update an unmounted root.");
			var n = arguments;
			typeof n[1] == "function" ? console.error("does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : b(n[1]) ? console.error("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : n[1] !== void 0 && console.error("You passed a second argument to root.render(...) but it only accepts one argument."), n = e;
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
				var t = Ze();
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
			return e = ie(t), e = e === null ? null : ae(e), e = e === null ? null : e.stateNode, e;
		}, !(function() {
			var e = {
				bundleType: 1,
				version: "19.2.7",
				rendererPackageName: "react-dom",
				currentDispatcherRef: H,
				reconcilerVersion: "19.2.7"
			};
			return e.overrideHookState = DC, e.overrideHookStateDeletePath = OC, e.overrideHookStateRenamePath = kC, e.overrideProps = AC, e.overridePropsDeletePath = jC, e.overridePropsRenamePath = MC, e.scheduleUpdate = NC, e.scheduleRetry = PC, e.setErrorHandler = FC, e.setSuspenseHandler = IC, e.scheduleRefresh = v, e.scheduleRoot = _, e.setRefreshHandler = y, e.getCurrentFiber = af, Ne(e);
		})() && $m && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
			var JC = window.location.protocol;
			/^(https?|file):$/.test(JC) && console.info("%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (JC === "file:" ? "\nYou might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq" : ""), "font-weight:bold");
		}
		e.createRoot = function(e, t) {
			if (!b(e)) throw Error("Target container is not a DOM element.");
			Tf(e);
			var n = !1, r = "", i = ts, a = ns, o = rs;
			return t != null && (t.hydrate ? console.warn("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t && t.$$typeof === Af && console.error("You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);"), !0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = Zd(e, 1, !1, null, null, n, r, null, i, a, o, Sf), e[qp] = t.current, lu(e), new Cf(t);
		}, e.hydrateRoot = function(e, t, n) {
			if (!b(e)) throw Error("Target container is not a DOM element.");
			Tf(e), t === void 0 && console.error("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
			var r = !1, i = "", a = ts, o = ns, s = rs, c = null;
			return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (a = n.onUncaughtError), n.onCaughtError !== void 0 && (o = n.onCaughtError), n.onRecoverableError !== void 0 && (s = n.onRecoverableError), n.formState !== void 0 && (c = n.formState)), t = Zd(e, 1, !0, t, n ?? null, r, i, c, a, o, s, Sf), t.context = Qd(null), n = t.current, r = $c(n), r = qe(r), i = oa(r), i.callback = null, sa(n, i, r), hi(r, "hydrateRoot()", null), n = r, t.current.lanes = n, He(t, n), Jl(t), e[qp] = t.current, lu(e), new wf(t);
		}, e.version = "19.2.7", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), nl = /* @__PURE__ */ n((/* @__PURE__ */ e(((e, t) => {
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
	process.env.NODE_ENV === "production" ? (n(), t.exports = el()) : t.exports = tl();
})))(), 1);
function rl(e, t) {
	let n = typeof e == "string" ? document.querySelector(e) : e;
	if (!n) throw Error(`AMP Reader host was not found: ${String(e)}`);
	let r = (0, nl.createRoot)(n), i = (e) => r.render(/* @__PURE__ */ (0, L.jsx)($c, { ...e }));
	return i(t), {
		update: i,
		unmount: () => r.unmount()
	};
}
//#endregion
export { $c as AMPReader, qc as RuntimeDocument, Ns as createAMPAssetResolver, js as loadAMPDocument, rl as mountAMPReader };

//# sourceMappingURL=amp-reader.js.map