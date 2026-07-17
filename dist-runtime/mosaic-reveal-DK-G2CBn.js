//#region src/author/legacy/mosaic-reveal.ts
var e = .1, t = .3, n = .6, r = (e, t, n) => Math.min(n, Math.max(t, e)), i = (e) => e * e * (3 - 2 * e);
function a(e, t) {
	let n = Math.sin(e * 127.1 + t * 311.7) * 43758.5453;
	return n - Math.floor(n);
}
function o(e) {
	let t = e.trim();
	if (t.startsWith("#")) {
		let e = t.slice(1);
		if (e.length === 3 && (e = e.split("").map((e) => e + e).join("")), e.length < 6) return null;
		let n = parseInt(e.slice(0, 6), 16);
		return Number.isNaN(n) ? null : [
			n >> 16 & 255,
			n >> 8 & 255,
			n & 255
		];
	}
	let n = t.match(/rgba?\(([^)]+)\)/);
	if (n?.[1]) {
		let [e, t, r] = n[1].split(",").map((e) => parseFloat(e));
		if (e !== void 0 && t !== void 0 && r !== void 0 && Number.isFinite(e) && Number.isFinite(t) && Number.isFinite(r)) return [
			e,
			t,
			r
		];
	}
	return null;
}
function s(e, t) {
	return o(getComputedStyle(document.documentElement).getPropertyValue(e)) ?? t;
}
function c(e, t, n) {
	let r = Math.max(1, window.innerWidth), i = Math.max(1, window.innerHeight), a = Math.min(1, 512 / r), o = n, s = Math.max(1, Math.round(r * a)), c = Math.max(1, Math.round(i * a));
	o.width !== s && (o.width = s), o.height !== c && (o.height = c);
	let l = o.getContext("2d");
	if (!l) return null;
	l.fillStyle = `rgb(${t[0]}, ${t[1]}, ${t[2]})`, l.fillRect(0, 0, o.width, o.height);
	let u = document.body.getElementsByTagName("*"), d = Math.min(u.length, 4e3);
	for (let t = 0; t < d; t++) {
		let n = u[t];
		if (!n || e.contains(n)) continue;
		let o = n.tagName;
		if (o === "SCRIPT" || o === "STYLE" || o === "LINK") continue;
		let s = n.getBoundingClientRect();
		if (s.width < 2 || s.height < 2 || s.bottom < 0 || s.right < 0 || s.top > i || s.left > r) continue;
		let c = getComputedStyle(n);
		if (c.visibility !== "visible") continue;
		let d = parseFloat(c.opacity);
		if (d < .05) continue;
		let f = s.left * a, p = s.top * a, m = s.width * a, h = s.height * a;
		if (n instanceof HTMLImageElement || n instanceof HTMLVideoElement || n instanceof HTMLCanvasElement) {
			try {
				l.globalAlpha = d, l.drawImage(n, f, p, m, h), l.globalAlpha = 1;
			} catch {}
			continue;
		}
		let g = c.backgroundColor;
		g && g !== "transparent" && !g.startsWith("rgba(0, 0, 0, 0") && (l.globalAlpha = d, l.fillStyle = g, l.fillRect(f, p, m, h), l.globalAlpha = 1);
		let _ = n.firstChild;
		1 / a * h < 60 && _?.nodeType === Node.TEXT_NODE && _.textContent && _.textContent.trim() && (l.globalAlpha = .3 * d, l.fillStyle = c.color, l.fillRect(f, p + h * .32, m, h * .36), l.globalAlpha = 1);
	}
	return o;
}
function l(e) {
	let t = e.querySelector("[data-amp-backdrop]");
	t && (t.style.transition = "", t.style.backdropFilter = "", t.style.removeProperty("-webkit-backdrop-filter"));
	for (let t of ["[data-amp-scanlines]", "[data-amp-vignette]"]) {
		let n = e.querySelector(t);
		n && (n.style.transition = "", n.style.opacity = "");
	}
}
function u(o, u = {}) {
	let { duration: d = 2e3, disruption: f = .75, onDone: p } = u, m = o.querySelector("canvas"), h = m?.getContext("2d") ?? null;
	l(o);
	let g = () => (m && h && h.clearRect(0, 0, m.width, m.height), p?.(), () => {});
	if (!m || !h || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return g();
	let _ = Math.max(1, window.innerWidth), v = Math.max(1, window.innerHeight), y = r(window.devicePixelRatio || 1, 1, 2);
	m.width = Math.round(_ * y), m.height = Math.round(v * y), h.setTransform(y, 0, 0, y, 0, 0), h.fillStyle = "#000", h.fillRect(0, 0, _, v);
	let b = s("--amp-bg", [
		244,
		244,
		246
	]), x = s("--amp-accent", [
		109,
		59,
		255
	]), S = Math.random() * 1e3, C = null, w = document.createElement("canvas"), T = Math.max(1, Math.ceil(_ / 512)), E = r(Math.round(Math.min(_, v) / 6), 48, 320), D = Math.log(E), O = Math.log(T), k = (e) => Math.max(T, Math.round(Math.exp(D + (O - D) * e))), A = !1, j = () => {
		A || (A = !0, C = c(o, b, w), T = Math.max(1, Math.ceil(_ / (C?.width ?? 512))), O = Math.log(T));
	}, M = Math.min(_, v) * .32 * f, N = (e) => e >= n ? 0 : e <= t ? 1 : 1 - i((e - t) / (n - t)), P = document.createElement("canvas"), F = P.getContext("2d");
	if (!F) return g();
	let I = -1, L = (e) => {
		if (e !== I) if (I = e, P.width = Math.ceil(_ / e) + 1, P.height = Math.ceil(v / e) + 1, F.imageSmoothingEnabled = !0, C) F.drawImage(C, 0, 0, P.width, P.height);
		else for (let e = 0; e < P.height; e++) for (let t = 0; t < P.width; t++) {
			let n = a(t * 31 + e * 57, S);
			F.fillStyle = n > .86 ? `rgb(${x[0]}, ${x[1]}, ${x[2]})` : `rgb(${b[0] * (.7 + .3 * n) | 0}, ${b[1] * (.7 + .3 * n) | 0}, ${b[2] * (.7 + .3 * n) | 0})`, F.fillRect(t, e, 1, 1);
		}
	}, R = performance.now(), z = 0, B = !1, V = -1, H = -1, U = (n) => {
		if (B) return;
		let i = n - R;
		if (i >= d + 600) {
			h.clearRect(0, 0, _, v), p?.();
			return;
		}
		if (i < d) {
			let n = Math.floor(i * 12 / 1e3);
			if (n === V) {
				z = requestAnimationFrame(U);
				return;
			}
			V = n;
			let o = i / d;
			if (o >= e) {
				j();
				let n = o < t ? 0 : (o - t) / (1 - t), i = k(n), s = N(o);
				if (s <= .01 && i === H) {
					z = requestAnimationFrame(U);
					return;
				}
				H = s <= .01 ? i : -1;
				let c = r((o - e) / (t - e), 0, 1);
				if (L(i), h.imageSmoothingEnabled = !1, h.fillStyle = "#000", h.fillRect(0, 0, _, v), s > .01) for (let e = 0; e < P.height; e++) for (let t = 0; t < P.width; t++) {
					let n = a(t * 31 + e * 57 + 7, S) * .82;
					if (c < n) continue;
					let r = Math.floor((t + .5) * i * 14 / _), o = Math.floor((e + .5) * i * 9 / v), l = a(r * 13.3 + o * 7.7 + 31, S) - .5, u = a(r * 3.1 + o * 17.9 + 57, S) - .5, d = (a(t * 31 + e * 57 + 101, S) - .5) * i * .8, f = (a(t * 57 + e * 31 + 137, S) - .5) * i * .8, p = Math.round(t * i + (l * 2 * M + d) * s), m = Math.round(e * i + (u * 2 * M + f) * s);
					h.drawImage(P, t, e, 1, 1, p, m, i, i);
					let g = c - n;
					g >= 0 && g < .12 && (h.fillStyle = `rgba(${x[0]}, ${x[1]}, ${x[2]}, ${(.55 * (1 - g / .12)).toFixed(3)})`, h.fillRect(p, m, i, i));
				}
				else h.drawImage(P, 0, 0, P.width, P.height, 0, 0, P.width * i, P.height * i);
			}
		} else {
			j(), L(T);
			let e = 1 - (i - d) / 600;
			h.imageSmoothingEnabled = !1, h.clearRect(0, 0, _, v), h.globalAlpha = r(e, 0, 1), h.drawImage(P, 0, 0, P.width, P.height, 0, 0, P.width * T, P.height * T), h.globalAlpha = 1;
		}
		z = requestAnimationFrame(U);
	};
	return z = requestAnimationFrame(U), () => {
		B = !0, cancelAnimationFrame(z), h.clearRect(0, 0, m.width, m.height);
	};
}
//#endregion
export { u as runMosaicReveal };

//# sourceMappingURL=mosaic-reveal-DK-G2CBn.js.map