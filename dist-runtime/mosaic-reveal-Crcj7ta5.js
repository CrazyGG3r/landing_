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
	let { duration: d = 2e3, disruption: f = .75, onDone: p } = u, m = r(u.maxFps ?? 60, 1, 120), h = Math.min(12, m), g = o.querySelector("canvas"), _ = g?.getContext("2d") ?? null;
	l(o);
	let v = () => (g && _ && _.clearRect(0, 0, g.width, g.height), p?.(), () => {});
	if (!g || !_ || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return v();
	let y = Math.max(1, window.innerWidth), b = Math.max(1, window.innerHeight), x = r(window.devicePixelRatio || 1, 1, 2);
	g.width = Math.round(y * x), g.height = Math.round(b * x), _.setTransform(x, 0, 0, x, 0, 0), _.fillStyle = "#000", _.fillRect(0, 0, y, b);
	let S = s("--amp-bg", [
		244,
		244,
		246
	]), C = s("--amp-accent", [
		109,
		59,
		255
	]), w = Math.random() * 1e3, T = null, E = document.createElement("canvas"), D = Math.max(1, Math.ceil(y / 512)), O = r(Math.round(Math.min(y, b) / 6), 48, 320), k = Math.log(O), A = Math.log(D), j = (e) => Math.max(D, Math.round(Math.exp(k + (A - k) * e))), M = !1, N = () => {
		M || (M = !0, T = c(o, S, E), D = Math.max(1, Math.ceil(y / (T?.width ?? 512))), A = Math.log(D));
	}, P = Math.min(y, b) * .32 * f, F = (e) => e >= n ? 0 : e <= t ? 1 : 1 - i((e - t) / (n - t)), I = document.createElement("canvas"), L = I.getContext("2d");
	if (!L) return v();
	let R = -1, z = (e) => {
		if (e !== R) if (R = e, I.width = Math.ceil(y / e) + 1, I.height = Math.ceil(b / e) + 1, L.imageSmoothingEnabled = !0, T) L.drawImage(T, 0, 0, I.width, I.height);
		else for (let e = 0; e < I.height; e++) for (let t = 0; t < I.width; t++) {
			let n = a(t * 31 + e * 57, w);
			L.fillStyle = n > .86 ? `rgb(${C[0]}, ${C[1]}, ${C[2]})` : `rgb(${S[0] * (.7 + .3 * n) | 0}, ${S[1] * (.7 + .3 * n) | 0}, ${S[2] * (.7 + .3 * n) | 0})`, L.fillRect(t, e, 1, 1);
		}
	}, B = performance.now(), V = 0, H = !1, U = -1, W = -1, G = -Infinity, K = (n) => {
		if (H) return;
		let i = n - B;
		if (i >= d + 600) {
			_.clearRect(0, 0, y, b), p?.();
			return;
		}
		if (i < d) {
			let n = Math.floor(i * h / 1e3);
			if (n === U) {
				V = requestAnimationFrame(K);
				return;
			}
			U = n;
			let o = i / d;
			if (o >= e) {
				N();
				let n = o < t ? 0 : (o - t) / (1 - t), i = j(n), s = F(o);
				if (s <= .01 && i === W) {
					V = requestAnimationFrame(K);
					return;
				}
				W = s <= .01 ? i : -1;
				let c = r((o - e) / (t - e), 0, 1);
				if (z(i), _.imageSmoothingEnabled = !1, _.fillStyle = "#000", _.fillRect(0, 0, y, b), s > .01) for (let e = 0; e < I.height; e++) for (let t = 0; t < I.width; t++) {
					let n = a(t * 31 + e * 57 + 7, w) * .82;
					if (c < n) continue;
					let r = Math.floor((t + .5) * i * 14 / y), o = Math.floor((e + .5) * i * 9 / b), l = a(r * 13.3 + o * 7.7 + 31, w) - .5, u = a(r * 3.1 + o * 17.9 + 57, w) - .5, d = (a(t * 31 + e * 57 + 101, w) - .5) * i * .8, f = (a(t * 57 + e * 31 + 137, w) - .5) * i * .8, p = Math.round(t * i + (l * 2 * P + d) * s), m = Math.round(e * i + (u * 2 * P + f) * s);
					_.drawImage(I, t, e, 1, 1, p, m, i, i);
					let h = c - n;
					h >= 0 && h < .12 && (_.fillStyle = `rgba(${C[0]}, ${C[1]}, ${C[2]}, ${(.55 * (1 - h / .12)).toFixed(3)})`, _.fillRect(p, m, i, i));
				}
				else _.drawImage(I, 0, 0, I.width, I.height, 0, 0, I.width * i, I.height * i);
			}
		} else {
			if (n - G < 1e3 / m) {
				V = requestAnimationFrame(K);
				return;
			}
			G = n, N(), z(D);
			let e = 1 - (i - d) / 600;
			_.imageSmoothingEnabled = !1, _.clearRect(0, 0, y, b), _.globalAlpha = r(e, 0, 1), _.drawImage(I, 0, 0, I.width, I.height, 0, 0, I.width * D, I.height * D), _.globalAlpha = 1;
		}
		V = requestAnimationFrame(K);
	};
	return V = requestAnimationFrame(K), () => {
		H = !0, cancelAnimationFrame(V), _.clearRect(0, 0, g.width, g.height);
	};
}
//#endregion
export { u as runMosaicReveal };

//# sourceMappingURL=mosaic-reveal-Crcj7ta5.js.map