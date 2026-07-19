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
function c(e, t) {
	let n = Math.max(1, window.innerWidth), r = Math.max(1, window.innerHeight), i = Math.min(1, 512 / n), a = document.createElement("canvas");
	a.width = Math.max(1, Math.round(n * i)), a.height = Math.max(1, Math.round(r * i));
	let o = a.getContext("2d");
	if (!o) return null;
	o.fillStyle = `rgb(${t[0]}, ${t[1]}, ${t[2]})`, o.fillRect(0, 0, a.width, a.height);
	let s = document.body.getElementsByTagName("*"), c = Math.min(s.length, 4e3);
	for (let t = 0; t < c; t++) {
		let a = s[t];
		if (!a || e.contains(a)) continue;
		let c = a.tagName;
		if (c === "SCRIPT" || c === "STYLE" || c === "LINK") continue;
		let l = a.getBoundingClientRect();
		if (l.width < 2 || l.height < 2 || l.bottom < 0 || l.right < 0 || l.top > r || l.left > n) continue;
		let u = getComputedStyle(a);
		if (u.visibility !== "visible") continue;
		let d = parseFloat(u.opacity);
		if (d < .05) continue;
		let f = l.left * i, p = l.top * i, m = l.width * i, h = l.height * i;
		if (a instanceof HTMLImageElement || a instanceof HTMLVideoElement || a instanceof HTMLCanvasElement) {
			try {
				o.globalAlpha = d, o.drawImage(a, f, p, m, h), o.globalAlpha = 1;
			} catch {}
			continue;
		}
		let g = u.backgroundColor;
		g && g !== "transparent" && !g.startsWith("rgba(0, 0, 0, 0") && (o.globalAlpha = d, o.fillStyle = g, o.fillRect(f, p, m, h), o.globalAlpha = 1);
		let _ = a.firstChild;
		1 / i * h < 60 && _?.nodeType === Node.TEXT_NODE && _.textContent && _.textContent.trim() && (o.globalAlpha = .3 * d, o.fillStyle = u.color, o.fillRect(f, p + h * .32, m, h * .36), o.globalAlpha = 1);
	}
	return a;
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
	let _ = Math.max(1, window.innerWidth), v = Math.max(1, window.innerHeight);
	m.width = _, m.height = v, h.fillStyle = "#000", h.fillRect(0, 0, _, v);
	let y = s("--amp-bg", [
		244,
		244,
		246
	]), b = s("--amp-accent", [
		109,
		59,
		255
	]), x = Math.random() * 1e3, S = c(o, y), C = Math.max(1, Math.ceil(_ / (S?.width ?? 512))), w = r(Math.round(Math.min(_, v) / 6), 48, 320), T = Math.log(w), E = Math.log(C), D = (e) => Math.max(C, Math.round(Math.exp(T + (E - T) * e))), O = Math.min(_, v) * .32 * f, k = (e) => e >= n ? 0 : e <= t ? 1 : 1 - i((e - t) / (n - t)), A = document.createElement("canvas"), j = A.getContext("2d");
	if (!j) return g();
	let M = -1, N = (e) => {
		if (e !== M) if (M = e, A.width = Math.ceil(_ / e) + 1, A.height = Math.ceil(v / e) + 1, j.imageSmoothingEnabled = !0, S) j.drawImage(S, 0, 0, A.width, A.height);
		else for (let e = 0; e < A.height; e++) for (let t = 0; t < A.width; t++) {
			let n = a(t * 31 + e * 57, x);
			j.fillStyle = n > .86 ? `rgb(${b[0]}, ${b[1]}, ${b[2]})` : `rgb(${y[0] * (.7 + .3 * n) | 0}, ${y[1] * (.7 + .3 * n) | 0}, ${y[2] * (.7 + .3 * n) | 0})`, j.fillRect(t, e, 1, 1);
		}
	}, P = performance.now(), F = 0, I = !1, L = -1, R = (n) => {
		if (I) return;
		let i = n - P;
		if (i >= d + 600) {
			h.clearRect(0, 0, _, v), p?.();
			return;
		}
		if (i < d) {
			let n = Math.floor(i * 12 / 1e3);
			if (n === L) {
				F = requestAnimationFrame(R);
				return;
			}
			L = n;
			let o = i / d;
			if (o >= e) {
				let n = o < t ? 0 : (o - t) / (1 - t), i = D(n), s = k(o), c = r((o - e) / (t - e), 0, 1);
				if (N(i), h.imageSmoothingEnabled = !1, h.fillStyle = "#000", h.fillRect(0, 0, _, v), s > .01) for (let e = 0; e < A.height; e++) for (let t = 0; t < A.width; t++) {
					let n = a(t * 31 + e * 57 + 7, x) * .82;
					if (c < n) continue;
					let r = Math.floor((t + .5) * i * 14 / _), o = Math.floor((e + .5) * i * 9 / v), l = a(r * 13.3 + o * 7.7 + 31, x) - .5, u = a(r * 3.1 + o * 17.9 + 57, x) - .5, d = (a(t * 31 + e * 57 + 101, x) - .5) * i * .8, f = (a(t * 57 + e * 31 + 137, x) - .5) * i * .8, p = Math.round(t * i + (l * 2 * O + d) * s), m = Math.round(e * i + (u * 2 * O + f) * s);
					h.drawImage(A, t, e, 1, 1, p, m, i, i);
					let g = c - n;
					g >= 0 && g < .12 && (h.fillStyle = `rgba(${b[0]}, ${b[1]}, ${b[2]}, ${(.55 * (1 - g / .12)).toFixed(3)})`, h.fillRect(p, m, i, i));
				}
				else h.drawImage(A, 0, 0, A.width, A.height, 0, 0, A.width * i, A.height * i);
			}
		} else {
			N(C);
			let e = 1 - (i - d) / 600;
			h.imageSmoothingEnabled = !1, h.clearRect(0, 0, _, v), h.globalAlpha = r(e, 0, 1), h.drawImage(A, 0, 0, A.width, A.height, 0, 0, A.width * C, A.height * C), h.globalAlpha = 1;
		}
		F = requestAnimationFrame(R);
	};
	return F = requestAnimationFrame(R), () => {
		I = !0, cancelAnimationFrame(F), h.clearRect(0, 0, m.width, m.height);
	};
}
//#endregion
export { u as runMosaicReveal };

//# sourceMappingURL=mosaic-reveal-DNxrgOiC.js.map