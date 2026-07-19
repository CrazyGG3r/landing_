import { n as e, o as t, r as n } from "./scheduler-CFRa_C8g.js";
import { $ as r, $t as i, A as a, At as o, B as s, Bt as c, Ct as l, D as u, Dt as d, E as f, Et as p, F as m, Ft as h, G as g, Gt as _, H as v, Ht as y, I as b, It as x, J as S, Jt as C, K as w, Kt as T, L as E, Lt as D, M as O, Mt as k, N as A, Nt as ee, O as j, Ot as te, P as ne, Pt as re, Q as M, Qt as ie, R as N, Rt as ae, S as oe, St as se, T as ce, Tt as le, U as ue, Ut as de, V as fe, Vt as pe, W as me, Wt as he, X as ge, Xt as _e, Y as ve, Yt as ye, Z as be, Zt as xe, _ as P, _t as F, a as Se, at as Ce, b as I, bt as L, ct as we, dt as R, en as z, et as Te, ft as Ee, gt as De, h as Oe, ht as ke, in as Ae, it as je, j as B, jt as Me, k as Ne, kt as Pe, l as Fe, lt as Ie, mt as Le, n as Re, nn as V, nt as ze, ot as H, p as Be, pt as Ve, q as He, qt as Ue, rn as We, rt as Ge, s as Ke, st as qe, t as Je, tn as Ye, tt as Xe, ut as Ze, vt as Qe, w as $e, wt as et, x as tt, xt as nt, y as rt, yt as it, z as at, zt as ot } from "./View-00cs8gnA.js";
//#region node_modules/three-stdlib/_polyfill/constants.js
var st = /* @__PURE__ */ parseInt("185".replace(/\D+/g, ""));
//#endregion
//#region node_modules/three-stdlib/utils/BufferGeometryUtils.js
function ct(e, t) {
	if (t === 0) return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), e;
	if (t === 2 || t === 1) {
		let n = e.getIndex();
		if (n === null) {
			let t = [], r = e.getAttribute("position");
			if (r !== void 0) {
				for (let e = 0; e < r.count; e++) t.push(e);
				e.setIndex(t), n = e.getIndex();
			} else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), e;
		}
		let r = n.count - 2, i = [];
		if (n) if (t === 2) for (let e = 1; e <= r; e++) i.push(n.getX(0)), i.push(n.getX(e)), i.push(n.getX(e + 1));
		else for (let e = 0; e < r; e++) e % 2 == 0 ? (i.push(n.getX(e)), i.push(n.getX(e + 1)), i.push(n.getX(e + 2))) : (i.push(n.getX(e + 2)), i.push(n.getX(e + 1)), i.push(n.getX(e)));
		i.length / 3 !== r && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
		let a = e.clone();
		return a.setIndex(i), a.clearGroups(), a;
	} else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", t), e;
}
//#endregion
//#region node_modules/three-stdlib/node_modules/fflate/esm/browser.js
var U = Uint8Array, lt = Uint16Array, ut = Uint32Array, dt = new U([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0,
	0,
	0,
	0
]), ft = new U([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13,
	0,
	0
]), pt = new U([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]), mt = function(e, t) {
	for (var n = new lt(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
	for (var i = new ut(n[30]), r = 1; r < 30; ++r) for (var a = n[r]; a < n[r + 1]; ++a) i[a] = a - n[r] << 5 | r;
	return [n, i];
}, ht = mt(dt, 2), gt = ht[0], _t = ht[1];
gt[28] = 258, _t[258] = 28;
var vt = mt(ft, 0), yt = vt[0];
vt[1];
for (var bt = new lt(32768), W = 0; W < 32768; ++W) {
	var xt = (W & 43690) >>> 1 | (W & 21845) << 1;
	xt = (xt & 52428) >>> 2 | (xt & 13107) << 2, xt = (xt & 61680) >>> 4 | (xt & 3855) << 4, bt[W] = ((xt & 65280) >>> 8 | (xt & 255) << 8) >>> 1;
}
for (var St = (function(e, t, n) {
	for (var r = e.length, i = 0, a = new lt(t); i < r; ++i) ++a[e[i] - 1];
	var o = new lt(t);
	for (i = 0; i < t; ++i) o[i] = o[i - 1] + a[i - 1] << 1;
	var s;
	if (n) {
		s = new lt(1 << t);
		var c = 15 - t;
		for (i = 0; i < r; ++i) if (e[i]) for (var l = i << 4 | e[i], u = t - e[i], d = o[e[i] - 1]++ << u, f = d | (1 << u) - 1; d <= f; ++d) s[bt[d] >>> c] = l;
	} else for (s = new lt(r), i = 0; i < r; ++i) e[i] && (s[i] = bt[o[e[i] - 1]++] >>> 15 - e[i]);
	return s;
}), Ct = new U(288), W = 0; W < 144; ++W) Ct[W] = 8;
for (var W = 144; W < 256; ++W) Ct[W] = 9;
for (var W = 256; W < 280; ++W) Ct[W] = 7;
for (var W = 280; W < 288; ++W) Ct[W] = 8;
for (var wt = new U(32), W = 0; W < 32; ++W) wt[W] = 5;
var Tt = /*#__PURE__*/ St(Ct, 9, 1), Et = /*#__PURE__*/ St(wt, 5, 1), Dt = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, G = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, Ot = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, kt = function(e) {
	return (e / 8 | 0) + (e & 7 && 1);
}, At = function(e, t, n) {
	(t == null || t < 0) && (t = 0), (n == null || n > e.length) && (n = e.length);
	var r = new (e instanceof lt ? lt : e instanceof ut ? ut : U)(n - t);
	return r.set(e.subarray(t, n)), r;
}, jt = function(e, t, n) {
	var r = e.length;
	if (!r || n && !n.l && r < 5) return t || new U(0);
	var i = !t || n, a = !n || n.i;
	n ||= {}, t ||= new U(r * 3);
	var o = function(e) {
		var n = t.length;
		if (e > n) {
			var r = new U(Math.max(n * 2, e));
			r.set(t), t = r;
		}
	}, s = n.f || 0, c = n.p || 0, l = n.b || 0, u = n.l, d = n.d, f = n.m, p = n.n, m = r * 8;
	do {
		if (!u) {
			n.f = s = G(e, c, 1);
			var h = G(e, c + 1, 3);
			if (c += 3, !h) {
				var g = kt(c) + 4, _ = e[g - 4] | e[g - 3] << 8, v = g + _;
				if (v > r) {
					if (a) throw "unexpected EOF";
					break;
				}
				i && o(l + _), t.set(e.subarray(g, v), l), n.b = l += _, n.p = c = v * 8;
				continue;
			} else if (h == 1) u = Tt, d = Et, f = 9, p = 5;
			else if (h == 2) {
				var y = G(e, c, 31) + 257, b = G(e, c + 10, 15) + 4, x = y + G(e, c + 5, 31) + 1;
				c += 14;
				for (var S = new U(x), C = new U(19), w = 0; w < b; ++w) C[pt[w]] = G(e, c + w * 3, 7);
				c += b * 3;
				for (var T = Dt(C), E = (1 << T) - 1, D = St(C, T, 1), w = 0; w < x;) {
					var O = D[G(e, c, E)];
					c += O & 15;
					var g = O >>> 4;
					if (g < 16) S[w++] = g;
					else {
						var k = 0, A = 0;
						for (g == 16 ? (A = 3 + G(e, c, 3), c += 2, k = S[w - 1]) : g == 17 ? (A = 3 + G(e, c, 7), c += 3) : g == 18 && (A = 11 + G(e, c, 127), c += 7); A--;) S[w++] = k;
					}
				}
				var ee = S.subarray(0, y), j = S.subarray(y);
				f = Dt(ee), p = Dt(j), u = St(ee, f, 1), d = St(j, p, 1);
			} else throw "invalid block type";
			if (c > m) {
				if (a) throw "unexpected EOF";
				break;
			}
		}
		i && o(l + 131072);
		for (var te = (1 << f) - 1, ne = (1 << p) - 1, re = c;; re = c) {
			var k = u[Ot(e, c) & te], M = k >>> 4;
			if (c += k & 15, c > m) {
				if (a) throw "unexpected EOF";
				break;
			}
			if (!k) throw "invalid length/literal";
			if (M < 256) t[l++] = M;
			else if (M == 256) {
				re = c, u = null;
				break;
			} else {
				var ie = M - 254;
				if (M > 264) {
					var w = M - 257, N = dt[w];
					ie = G(e, c, (1 << N) - 1) + gt[w], c += N;
				}
				var ae = d[Ot(e, c) & ne], oe = ae >>> 4;
				if (!ae) throw "invalid distance";
				c += ae & 15;
				var j = yt[oe];
				if (oe > 3) {
					var N = ft[oe];
					j += Ot(e, c) & (1 << N) - 1, c += N;
				}
				if (c > m) {
					if (a) throw "unexpected EOF";
					break;
				}
				i && o(l + 131072);
				for (var se = l + ie; l < se; l += 4) t[l] = t[l - j], t[l + 1] = t[l + 1 - j], t[l + 2] = t[l + 2 - j], t[l + 3] = t[l + 3 - j];
				l = se;
			}
		}
		n.l = u, n.p = re, n.b = l, u && (s = 1, n.m = f, n.d = d, n.n = p);
	} while (!s);
	return l == t.length ? t : At(t, 0, l);
}, Mt = /*#__PURE__*/ new U(0), Nt = function(e) {
	if ((e[0] & 15) != 8 || e[0] >>> 4 > 7 || (e[0] << 8 | e[1]) % 31) throw "invalid zlib data";
	if (e[1] & 32) throw "invalid zlib data: preset dictionaries not supported";
};
function Pt(e, t) {
	return jt((Nt(e), e.subarray(2, -4)), t);
}
var Ft = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	Ft.decode(Mt, { stream: !0 });
} catch {}
//#endregion
//#region node_modules/three-stdlib/objects/GroundProjectedEnv.js
var It = (e) => e && e.isCubeTexture, Lt = class extends F {
	constructor(e, t) {
		let n = It(e), r = ((n ? e.image[0]?.width : e.image.width) ?? 1024) / 4, i = Math.floor(Math.log2(r)), a = 2 ** i, o = 3 * Math.max(a, 112), s = 4 * a, c = [
			n ? "#define ENVMAP_TYPE_CUBE" : "",
			`#define CUBEUV_TEXEL_WIDTH ${1 / o}`,
			`#define CUBEUV_TEXEL_HEIGHT ${1 / s}`,
			`#define CUBEUV_MAX_MIP ${i}.0`
		].join("\n") + `
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <${st >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
        }
        `, l = {
			map: { value: e },
			height: { value: t?.height || 15 },
			radius: { value: t?.radius || 100 }
		}, u = new ue(1, 16), d = new y({
			uniforms: l,
			fragmentShader: c,
			vertexShader: "\n        varying vec3 vWorldPosition;\n        void main() \n        {\n            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );\n            vWorldPosition = worldPosition.xyz;\n            \n            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n        }\n        ",
			side: 2
		});
		super(u, d);
	}
	set radius(e) {
		this.material.uniforms.radius.value = e;
	}
	get radius() {
		return this.material.uniforms.radius.value;
	}
	set height(e) {
		this.material.uniforms.height.value = e;
	}
	get height() {
		return this.material.uniforms.height.value;
	}
};
//#endregion
//#region node_modules/three-stdlib/_polyfill/LoaderUtils.js
function Rt(e) {
	if (typeof TextDecoder < "u") return new TextDecoder().decode(e);
	let t = "";
	for (let n = 0, r = e.length; n < r; n++) t += String.fromCharCode(e[n]);
	try {
		return decodeURIComponent(escape(t));
	} catch {
		return t;
	}
}
//#endregion
//#region node_modules/three-stdlib/loaders/GLTFLoader.js
var zt = "srgb", Bt = "srgb-linear", Vt = 3001, Ht = 3e3, Ut = class extends R {
	constructor(e) {
		super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(e) {
			return new Jt(e);
		}), this.register(function(e) {
			return new Yt(e);
		}), this.register(function(e) {
			return new an(e);
		}), this.register(function(e) {
			return new on(e);
		}), this.register(function(e) {
			return new sn(e);
		}), this.register(function(e) {
			return new Zt(e);
		}), this.register(function(e) {
			return new Qt(e);
		}), this.register(function(e) {
			return new $t(e);
		}), this.register(function(e) {
			return new en(e);
		}), this.register(function(e) {
			return new qt(e);
		}), this.register(function(e) {
			return new tn(e);
		}), this.register(function(e) {
			return new Xt(e);
		}), this.register(function(e) {
			return new rn(e);
		}), this.register(function(e) {
			return new nn(e);
		}), this.register(function(e) {
			return new Gt(e);
		}), this.register(function(e) {
			return new cn(e);
		}), this.register(function(e) {
			return new ln(e);
		});
	}
	load(e, t, n, r) {
		let i = this, a;
		if (this.resourcePath !== "") a = this.resourcePath;
		else if (this.path !== "") {
			let t = Ee.extractUrlBase(e);
			a = Ee.resolveURL(t, this.path);
		} else a = Ee.extractUrlBase(e);
		this.manager.itemStart(e);
		let o = function(t) {
			r ? r(t) : console.error(t), i.manager.itemError(e), i.manager.itemEnd(e);
		}, s = new N(this.manager);
		s.setPath(this.path), s.setResponseType("arraybuffer"), s.setRequestHeader(this.requestHeader), s.setWithCredentials(this.withCredentials), s.load(e, function(n) {
			try {
				i.parse(n, a, function(n) {
					t(n), i.manager.itemEnd(e);
				}, o);
			} catch (e) {
				o(e);
			}
		}, n, o);
	}
	setDRACOLoader(e) {
		return this.dracoLoader = e, this;
	}
	setDDSLoader() {
		throw Error("THREE.GLTFLoader: \"MSFT_texture_dds\" no longer supported. Please update to \"KHR_texture_basisu\".");
	}
	setKTX2Loader(e) {
		return this.ktx2Loader = e, this;
	}
	setMeshoptDecoder(e) {
		return this.meshoptDecoder = e, this;
	}
	register(e) {
		return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
	}
	unregister(e) {
		return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
	}
	parse(e, t, n, r) {
		let i, a = {}, o = {};
		if (typeof e == "string") i = JSON.parse(e);
		else if (e instanceof ArrayBuffer) if (Rt(new Uint8Array(e.slice(0, 4))) === un) {
			try {
				a[K.KHR_BINARY_GLTF] = new pn(e);
			} catch (e) {
				r && r(e);
				return;
			}
			i = JSON.parse(a[K.KHR_BINARY_GLTF].content);
		} else i = JSON.parse(Rt(new Uint8Array(e)));
		else i = e;
		if (i.asset === void 0 || i.asset.version[0] < 2) {
			r && r(/* @__PURE__ */ Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
			return;
		}
		let s = new Rn(i, {
			path: t || this.resourcePath || "",
			crossOrigin: this.crossOrigin,
			requestHeader: this.requestHeader,
			manager: this.manager,
			ktx2Loader: this.ktx2Loader,
			meshoptDecoder: this.meshoptDecoder
		});
		s.fileLoader.setRequestHeader(this.requestHeader);
		for (let e = 0; e < this.pluginCallbacks.length; e++) {
			let t = this.pluginCallbacks[e](s);
			t.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), o[t.name] = t, a[t.name] = !0;
		}
		if (i.extensionsUsed) for (let e = 0; e < i.extensionsUsed.length; ++e) {
			let t = i.extensionsUsed[e], n = i.extensionsRequired || [];
			switch (t) {
				case K.KHR_MATERIALS_UNLIT:
					a[t] = new Kt();
					break;
				case K.KHR_DRACO_MESH_COMPRESSION:
					a[t] = new mn(i, this.dracoLoader);
					break;
				case K.KHR_TEXTURE_TRANSFORM:
					a[t] = new hn();
					break;
				case K.KHR_MESH_QUANTIZATION:
					a[t] = new gn();
					break;
				default: n.indexOf(t) >= 0 && o[t] === void 0 && console.warn("THREE.GLTFLoader: Unknown extension \"" + t + "\".");
			}
		}
		s.setExtensions(a), s.setPlugins(o), s.parse(n, r);
	}
	parseAsync(e, t) {
		let n = this;
		return new Promise(function(r, i) {
			n.parse(e, t, r, i);
		});
	}
};
function Wt() {
	let e = {};
	return {
		get: function(t) {
			return e[t];
		},
		add: function(t, n) {
			e[t] = n;
		},
		remove: function(t) {
			delete e[t];
		},
		removeAll: function() {
			e = {};
		}
	};
}
var K = {
	KHR_BINARY_GLTF: "KHR_binary_glTF",
	KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
	KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
	KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
	KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
	KHR_MATERIALS_IOR: "KHR_materials_ior",
	KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
	KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
	KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
	KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
	KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
	KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
	KHR_MATERIALS_VOLUME: "KHR_materials_volume",
	KHR_TEXTURE_BASISU: "KHR_texture_basisu",
	KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
	KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
	KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
	EXT_MATERIALS_BUMP: "EXT_materials_bump",
	EXT_TEXTURE_WEBP: "EXT_texture_webp",
	EXT_TEXTURE_AVIF: "EXT_texture_avif",
	EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
	EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
}, Gt = class {
	constructor(e) {
		this.parser = e, this.name = K.KHR_LIGHTS_PUNCTUAL, this.cache = {
			refs: {},
			uses: {}
		};
	}
	_markDefs() {
		let e = this.parser, t = this.parser.json.nodes || [];
		for (let n = 0, r = t.length; n < r; n++) {
			let r = t[n];
			r.extensions && r.extensions[this.name] && r.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, r.extensions[this.name].light);
		}
	}
	_loadLight(e) {
		let t = this.parser, n = "light:" + e, r = t.cache.get(n);
		if (r) return r;
		let i = t.json, a = ((i.extensions && i.extensions[this.name] || {}).lights || [])[e], o, s = new B(16777215);
		a.color !== void 0 && s.setRGB(a.color[0], a.color[1], a.color[2], Bt);
		let c = a.range === void 0 ? 0 : a.range;
		switch (a.type) {
			case "directional":
				o = new E(s), o.target.position.set(0, 0, -1), o.add(o.target);
				break;
			case "point":
				o = new Me(s), o.distance = c;
				break;
			case "spot":
				o = new Ue(s), o.distance = c, a.spot = a.spot || {}, a.spot.innerConeAngle = a.spot.innerConeAngle === void 0 ? 0 : a.spot.innerConeAngle, a.spot.outerConeAngle = a.spot.outerConeAngle === void 0 ? Math.PI / 4 : a.spot.outerConeAngle, o.angle = a.spot.outerConeAngle, o.penumbra = 1 - a.spot.innerConeAngle / a.spot.outerConeAngle, o.target.position.set(0, 0, -1), o.add(o.target);
				break;
			default: throw Error("THREE.GLTFLoader: Unexpected light type: " + a.type);
		}
		return o.position.set(0, 0, 0), o.decay = 2, An(o, a), a.intensity !== void 0 && (o.intensity = a.intensity), o.name = t.createUniqueName(a.name || "light_" + e), r = Promise.resolve(o), t.cache.add(n, r), r;
	}
	getDependency(e, t) {
		if (e === "light") return this._loadLight(t);
	}
	createNodeAttachment(e) {
		let t = this, n = this.parser, r = n.json.nodes[e], i = (r.extensions && r.extensions[this.name] || {}).light;
		return i === void 0 ? null : this._loadLight(i).then(function(e) {
			return n._getNodeRef(t.cache, i, e);
		});
	}
}, Kt = class {
	constructor() {
		this.name = K.KHR_MATERIALS_UNLIT;
	}
	getMaterialType() {
		return Qe;
	}
	extendParams(e, t, n) {
		let r = [];
		e.color = new B(1, 1, 1), e.opacity = 1;
		let i = t.pbrMetallicRoughness;
		if (i) {
			if (Array.isArray(i.baseColorFactor)) {
				let t = i.baseColorFactor;
				e.color.setRGB(t[0], t[1], t[2], Bt), e.opacity = t[3];
			}
			i.baseColorTexture !== void 0 && r.push(n.assignTexture(e, "map", i.baseColorTexture, zt));
		}
		return Promise.all(r);
	}
}, qt = class {
	constructor(e) {
		this.parser = e, this.name = K.KHR_MATERIALS_EMISSIVE_STRENGTH;
	}
	extendMaterialParams(e, t) {
		let n = this.parser.json.materials[e];
		if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
		let r = n.extensions[this.name].emissiveStrength;
		return r !== void 0 && (t.emissiveIntensity = r), Promise.resolve();
	}
}, Jt = class {
	constructor(e) {
		this.parser = e, this.name = K.KHR_MATERIALS_CLEARCOAT;
	}
	getMaterialType(e) {
		let t = this.parser.json.materials[e];
		return !t.extensions || !t.extensions[this.name] ? null : L;
	}
	extendMaterialParams(e, t) {
		let n = this.parser, r = n.json.materials[e];
		if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
		let a = [], o = r.extensions[this.name];
		if (o.clearcoatFactor !== void 0 && (t.clearcoat = o.clearcoatFactor), o.clearcoatTexture !== void 0 && a.push(n.assignTexture(t, "clearcoatMap", o.clearcoatTexture)), o.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = o.clearcoatRoughnessFactor), o.clearcoatRoughnessTexture !== void 0 && a.push(n.assignTexture(t, "clearcoatRoughnessMap", o.clearcoatRoughnessTexture)), o.clearcoatNormalTexture !== void 0 && (a.push(n.assignTexture(t, "clearcoatNormalMap", o.clearcoatNormalTexture)), o.clearcoatNormalTexture.scale !== void 0)) {
			let e = o.clearcoatNormalTexture.scale;
			t.clearcoatNormalScale = new i(e, e);
		}
		return Promise.all(a);
	}
}, Yt = class {
	constructor(e) {
		this.parser = e, this.name = K.KHR_MATERIALS_DISPERSION;
	}
	getMaterialType(e) {
		let t = this.parser.json.materials[e];
		return !t.extensions || !t.extensions[this.name] ? null : L;
	}
	extendMaterialParams(e, t) {
		let n = this.parser.json.materials[e];
		if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
		let r = n.extensions[this.name];
		return t.dispersion = r.dispersion === void 0 ? 0 : r.dispersion, Promise.resolve();
	}
}, Xt = class {
	constructor(e) {
		this.parser = e, this.name = K.KHR_MATERIALS_IRIDESCENCE;
	}
	getMaterialType(e) {
		let t = this.parser.json.materials[e];
		return !t.extensions || !t.extensions[this.name] ? null : L;
	}
	extendMaterialParams(e, t) {
		let n = this.parser, r = n.json.materials[e];
		if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
		let i = [], a = r.extensions[this.name];
		return a.iridescenceFactor !== void 0 && (t.iridescence = a.iridescenceFactor), a.iridescenceTexture !== void 0 && i.push(n.assignTexture(t, "iridescenceMap", a.iridescenceTexture)), a.iridescenceIor !== void 0 && (t.iridescenceIOR = a.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), a.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = a.iridescenceThicknessMinimum), a.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = a.iridescenceThicknessMaximum), a.iridescenceThicknessTexture !== void 0 && i.push(n.assignTexture(t, "iridescenceThicknessMap", a.iridescenceThicknessTexture)), Promise.all(i);
	}
}, Zt = class {
	constructor(e) {
		this.parser = e, this.name = K.KHR_MATERIALS_SHEEN;
	}
	getMaterialType(e) {
		let t = this.parser.json.materials[e];
		return !t.extensions || !t.extensions[this.name] ? null : L;
	}
	extendMaterialParams(e, t) {
		let n = this.parser, r = n.json.materials[e];
		if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
		let i = [];
		t.sheenColor = new B(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
		let a = r.extensions[this.name];
		if (a.sheenColorFactor !== void 0) {
			let e = a.sheenColorFactor;
			t.sheenColor.setRGB(e[0], e[1], e[2], Bt);
		}
		return a.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = a.sheenRoughnessFactor), a.sheenColorTexture !== void 0 && i.push(n.assignTexture(t, "sheenColorMap", a.sheenColorTexture, zt)), a.sheenRoughnessTexture !== void 0 && i.push(n.assignTexture(t, "sheenRoughnessMap", a.sheenRoughnessTexture)), Promise.all(i);
	}
}, Qt = class {
	constructor(e) {
		this.parser = e, this.name = K.KHR_MATERIALS_TRANSMISSION;
	}
	getMaterialType(e) {
		let t = this.parser.json.materials[e];
		return !t.extensions || !t.extensions[this.name] ? null : L;
	}
	extendMaterialParams(e, t) {
		let n = this.parser, r = n.json.materials[e];
		if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
		let i = [], a = r.extensions[this.name];
		return a.transmissionFactor !== void 0 && (t.transmission = a.transmissionFactor), a.transmissionTexture !== void 0 && i.push(n.assignTexture(t, "transmissionMap", a.transmissionTexture)), Promise.all(i);
	}
}, $t = class {
	constructor(e) {
		this.parser = e, this.name = K.KHR_MATERIALS_VOLUME;
	}
	getMaterialType(e) {
		let t = this.parser.json.materials[e];
		return !t.extensions || !t.extensions[this.name] ? null : L;
	}
	extendMaterialParams(e, t) {
		let n = this.parser, r = n.json.materials[e];
		if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
		let i = [], a = r.extensions[this.name];
		t.thickness = a.thicknessFactor === void 0 ? 0 : a.thicknessFactor, a.thicknessTexture !== void 0 && i.push(n.assignTexture(t, "thicknessMap", a.thicknessTexture)), t.attenuationDistance = a.attenuationDistance || Infinity;
		let o = a.attenuationColor || [
			1,
			1,
			1
		];
		return t.attenuationColor = new B().setRGB(o[0], o[1], o[2], Bt), Promise.all(i);
	}
}, en = class {
	constructor(e) {
		this.parser = e, this.name = K.KHR_MATERIALS_IOR;
	}
	getMaterialType(e) {
		let t = this.parser.json.materials[e];
		return !t.extensions || !t.extensions[this.name] ? null : L;
	}
	extendMaterialParams(e, t) {
		let n = this.parser.json.materials[e];
		if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
		let r = n.extensions[this.name];
		return t.ior = r.ior === void 0 ? 1.5 : r.ior, Promise.resolve();
	}
}, tn = class {
	constructor(e) {
		this.parser = e, this.name = K.KHR_MATERIALS_SPECULAR;
	}
	getMaterialType(e) {
		let t = this.parser.json.materials[e];
		return !t.extensions || !t.extensions[this.name] ? null : L;
	}
	extendMaterialParams(e, t) {
		let n = this.parser, r = n.json.materials[e];
		if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
		let i = [], a = r.extensions[this.name];
		t.specularIntensity = a.specularFactor === void 0 ? 1 : a.specularFactor, a.specularTexture !== void 0 && i.push(n.assignTexture(t, "specularIntensityMap", a.specularTexture));
		let o = a.specularColorFactor || [
			1,
			1,
			1
		];
		return t.specularColor = new B().setRGB(o[0], o[1], o[2], Bt), a.specularColorTexture !== void 0 && i.push(n.assignTexture(t, "specularColorMap", a.specularColorTexture, zt)), Promise.all(i);
	}
}, nn = class {
	constructor(e) {
		this.parser = e, this.name = K.EXT_MATERIALS_BUMP;
	}
	getMaterialType(e) {
		let t = this.parser.json.materials[e];
		return !t.extensions || !t.extensions[this.name] ? null : L;
	}
	extendMaterialParams(e, t) {
		let n = this.parser, r = n.json.materials[e];
		if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
		let i = [], a = r.extensions[this.name];
		return t.bumpScale = a.bumpFactor === void 0 ? 1 : a.bumpFactor, a.bumpTexture !== void 0 && i.push(n.assignTexture(t, "bumpMap", a.bumpTexture)), Promise.all(i);
	}
}, rn = class {
	constructor(e) {
		this.parser = e, this.name = K.KHR_MATERIALS_ANISOTROPY;
	}
	getMaterialType(e) {
		let t = this.parser.json.materials[e];
		return !t.extensions || !t.extensions[this.name] ? null : L;
	}
	extendMaterialParams(e, t) {
		let n = this.parser, r = n.json.materials[e];
		if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
		let i = [], a = r.extensions[this.name];
		return a.anisotropyStrength !== void 0 && (t.anisotropy = a.anisotropyStrength), a.anisotropyRotation !== void 0 && (t.anisotropyRotation = a.anisotropyRotation), a.anisotropyTexture !== void 0 && i.push(n.assignTexture(t, "anisotropyMap", a.anisotropyTexture)), Promise.all(i);
	}
}, an = class {
	constructor(e) {
		this.parser = e, this.name = K.KHR_TEXTURE_BASISU;
	}
	loadTexture(e) {
		let t = this.parser, n = t.json, r = n.textures[e];
		if (!r.extensions || !r.extensions[this.name]) return null;
		let i = r.extensions[this.name], a = t.options.ktx2Loader;
		if (!a) {
			if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0) throw Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
			return null;
		}
		return t.loadTextureImage(e, i.source, a);
	}
}, on = class {
	constructor(e) {
		this.parser = e, this.name = K.EXT_TEXTURE_WEBP, this.isSupported = null;
	}
	loadTexture(e) {
		let t = this.name, n = this.parser, r = n.json, i = r.textures[e];
		if (!i.extensions || !i.extensions[t]) return null;
		let a = i.extensions[t], o = r.images[a.source], s = n.textureLoader;
		if (o.uri) {
			let e = n.options.manager.getHandler(o.uri);
			e !== null && (s = e);
		}
		return this.detectSupport().then(function(i) {
			if (i) return n.loadTextureImage(e, a.source, s);
			if (r.extensionsRequired && r.extensionsRequired.indexOf(t) >= 0) throw Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
			return n.loadTexture(e);
		});
	}
	detectSupport() {
		return this.isSupported ||= new Promise(function(e) {
			let t = new Image();
			t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", t.onload = t.onerror = function() {
				e(t.height === 1);
			};
		}), this.isSupported;
	}
}, sn = class {
	constructor(e) {
		this.parser = e, this.name = K.EXT_TEXTURE_AVIF, this.isSupported = null;
	}
	loadTexture(e) {
		let t = this.name, n = this.parser, r = n.json, i = r.textures[e];
		if (!i.extensions || !i.extensions[t]) return null;
		let a = i.extensions[t], o = r.images[a.source], s = n.textureLoader;
		if (o.uri) {
			let e = n.options.manager.getHandler(o.uri);
			e !== null && (s = e);
		}
		return this.detectSupport().then(function(i) {
			if (i) return n.loadTextureImage(e, a.source, s);
			if (r.extensionsRequired && r.extensionsRequired.indexOf(t) >= 0) throw Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
			return n.loadTexture(e);
		});
	}
	detectSupport() {
		return this.isSupported ||= new Promise(function(e) {
			let t = new Image();
			t.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", t.onload = t.onerror = function() {
				e(t.height === 1);
			};
		}), this.isSupported;
	}
}, cn = class {
	constructor(e) {
		this.name = K.EXT_MESHOPT_COMPRESSION, this.parser = e;
	}
	loadBufferView(e) {
		let t = this.parser.json, n = t.bufferViews[e];
		if (n.extensions && n.extensions[this.name]) {
			let e = n.extensions[this.name], r = this.parser.getDependency("buffer", e.buffer), i = this.parser.options.meshoptDecoder;
			if (!i || !i.supported) {
				if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0) throw Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
				return null;
			}
			return r.then(function(t) {
				let n = e.byteOffset || 0, r = e.byteLength || 0, a = e.count, o = e.byteStride, s = new Uint8Array(t, n, r);
				return i.decodeGltfBufferAsync ? i.decodeGltfBufferAsync(a, o, s, e.mode, e.filter).then(function(e) {
					return e.buffer;
				}) : i.ready.then(function() {
					let t = new ArrayBuffer(a * o);
					return i.decodeGltfBuffer(new Uint8Array(t), a, o, s, e.mode, e.filter), t;
				});
			});
		} else return null;
	}
}, ln = class {
	constructor(e) {
		this.name = K.EXT_MESH_GPU_INSTANCING, this.parser = e;
	}
	createNodeMesh(e) {
		let t = this.parser.json, n = t.nodes[e];
		if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0) return null;
		let r = t.meshes[n.mesh];
		for (let e of r.primitives) if (e.mode !== q.TRIANGLES && e.mode !== q.TRIANGLE_STRIP && e.mode !== q.TRIANGLE_FAN && e.mode !== void 0) return null;
		let i = n.extensions[this.name].attributes, a = [], o = {};
		for (let e in i) a.push(this.parser.getDependency("accessor", i[e]).then((t) => (o[e] = t, o[e])));
		return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then((e) => {
			let t = e.pop(), n = t.isGroup ? t.children : [t], r = e[0].count, i = [];
			for (let e of n) {
				let t = new De(), n = new z(), a = new h(), s = new z(1, 1, 1), c = new S(e.geometry, e.material, r);
				for (let e = 0; e < r; e++) o.TRANSLATION && n.fromBufferAttribute(o.TRANSLATION, e), o.ROTATION && a.fromBufferAttribute(o.ROTATION, e), o.SCALE && s.fromBufferAttribute(o.SCALE, e), c.setMatrixAt(e, t.compose(n, a, s));
				for (let t in o) if (t === "_COLOR_0") {
					let e = o[t];
					c.instanceColor = new g(e.array, e.itemSize, e.normalized);
				} else t !== "TRANSLATION" && t !== "ROTATION" && t !== "SCALE" && e.geometry.setAttribute(t, o[t]);
				d.prototype.copy.call(c, e), this.parser.assignFinalMaterial(c), i.push(c);
			}
			return t.isGroup ? (t.clear(), t.add(...i), t) : i[0];
		}));
	}
}, un = "glTF", dn = 12, fn = {
	JSON: 1313821514,
	BIN: 5130562
}, pn = class {
	constructor(e) {
		this.name = K.KHR_BINARY_GLTF, this.content = null, this.body = null;
		let t = new DataView(e, 0, dn);
		if (this.header = {
			magic: Rt(new Uint8Array(e.slice(0, 4))),
			version: t.getUint32(4, !0),
			length: t.getUint32(8, !0)
		}, this.header.magic !== un) throw Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
		if (this.header.version < 2) throw Error("THREE.GLTFLoader: Legacy binary file detected.");
		let n = this.header.length - dn, r = new DataView(e, dn), i = 0;
		for (; i < n;) {
			let t = r.getUint32(i, !0);
			i += 4;
			let n = r.getUint32(i, !0);
			if (i += 4, n === fn.JSON) {
				let n = new Uint8Array(e, dn + i, t);
				this.content = Rt(n);
			} else if (n === fn.BIN) {
				let n = dn + i;
				this.body = e.slice(n, n + t);
			}
			i += t;
		}
		if (this.content === null) throw Error("THREE.GLTFLoader: JSON content not found.");
	}
}, mn = class {
	constructor(e, t) {
		if (!t) throw Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
		this.name = K.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
	}
	decodePrimitive(e, t) {
		let n = this.json, r = this.dracoLoader, i = e.extensions[this.name].bufferView, a = e.extensions[this.name].attributes, o = {}, s = {}, c = {};
		for (let e in a) {
			let t = wn[e] || e.toLowerCase();
			o[t] = a[e];
		}
		for (let t in e.attributes) {
			let r = wn[t] || t.toLowerCase();
			if (a[t] !== void 0) {
				let i = n.accessors[e.attributes[t]];
				c[r] = bn[i.componentType].name, s[r] = i.normalized === !0;
			}
		}
		return t.getDependency("bufferView", i).then(function(e) {
			return new Promise(function(t, n) {
				r.decodeDracoFile(e, function(e) {
					for (let t in e.attributes) {
						let n = e.attributes[t], r = s[t];
						r !== void 0 && (n.normalized = r);
					}
					t(e);
				}, o, c, Bt, n);
			});
		});
	}
}, hn = class {
	constructor() {
		this.name = K.KHR_TEXTURE_TRANSFORM;
	}
	extendTexture(e, t) {
		return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 ? e : (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0, e);
	}
}, gn = class {
	constructor() {
		this.name = K.KHR_MESH_QUANTIZATION;
	}
}, _n = class extends M {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	copySampleValue_(e) {
		let t = this.resultBuffer, n = this.sampleValues, r = this.valueSize, i = e * r * 3 + r;
		for (let e = 0; e !== r; e++) t[e] = n[i + e];
		return t;
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = o * 2, c = o * 3, l = r - t, u = (n - t) / l, d = u * u, f = d * u, p = e * c, m = p - c, h = -2 * f + 3 * d, g = f - d, _ = 1 - h, v = g - d + u;
		for (let e = 0; e !== o; e++) {
			let t = a[m + e + o], n = a[m + e + s] * l, r = a[p + e + o], c = a[p + e] * l;
			i[e] = _ * t + v * n + h * r + g * c;
		}
		return i;
	}
}, vn = /* @__PURE__ */ new h(), yn = class extends _n {
	interpolate_(e, t, n, r) {
		let i = super.interpolate_(e, t, n, r);
		return vn.fromArray(i).normalize().toArray(i), i;
	}
}, q = {
	FLOAT: 5126,
	FLOAT_MAT3: 35675,
	FLOAT_MAT4: 35676,
	FLOAT_VEC2: 35664,
	FLOAT_VEC3: 35665,
	FLOAT_VEC4: 35666,
	LINEAR: 9729,
	REPEAT: 10497,
	SAMPLER_2D: 35678,
	POINTS: 0,
	LINES: 1,
	LINE_LOOP: 2,
	LINE_STRIP: 3,
	TRIANGLES: 4,
	TRIANGLE_STRIP: 5,
	TRIANGLE_FAN: 6,
	UNSIGNED_BYTE: 5121,
	UNSIGNED_SHORT: 5123
}, bn = {
	5120: Int8Array,
	5121: Uint8Array,
	5122: Int16Array,
	5123: Uint16Array,
	5125: Uint32Array,
	5126: Float32Array
}, xn = {
	9728: l,
	9729: H,
	9984: le,
	9985: Ie,
	9986: et,
	9987: we
}, Sn = {
	33071: a,
	33648: se,
	10497: ot
}, Cn = {
	SCALAR: 1,
	VEC2: 2,
	VEC3: 3,
	VEC4: 4,
	MAT2: 4,
	MAT3: 9,
	MAT4: 16
}, wn = {
	POSITION: "position",
	NORMAL: "normal",
	TANGENT: "tangent",
	...st >= 152 ? {
		TEXCOORD_0: "uv",
		TEXCOORD_1: "uv1",
		TEXCOORD_2: "uv2",
		TEXCOORD_3: "uv3"
	} : {
		TEXCOORD_0: "uv",
		TEXCOORD_1: "uv2"
	},
	COLOR_0: "color",
	WEIGHTS_0: "skinWeight",
	JOINTS_0: "skinIndex"
}, Tn = {
	scale: "scale",
	translation: "position",
	rotation: "quaternion",
	weights: "morphTargetInfluences"
}, En = {
	CUBICSPLINE: void 0,
	LINEAR: Te,
	STEP: r
}, Dn = {
	OPAQUE: "OPAQUE",
	MASK: "MASK",
	BLEND: "BLEND"
};
function On(e) {
	return e.DefaultMaterial === void 0 && (e.DefaultMaterial = new nt({
		color: 16777215,
		emissive: 0,
		metalness: 1,
		roughness: 1,
		transparent: !1,
		depthTest: !0,
		side: 0
	})), e.DefaultMaterial;
}
function kn(e, t, n) {
	for (let r in n.extensions) e[r] === void 0 && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[r] = n.extensions[r]);
}
function An(e, t) {
	t.extras !== void 0 && (typeof t.extras == "object" ? Object.assign(e.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras));
}
function jn(e, t, n) {
	let r = !1, i = !1, a = !1;
	for (let e = 0, n = t.length; e < n; e++) {
		let n = t[e];
		if (n.POSITION !== void 0 && (r = !0), n.NORMAL !== void 0 && (i = !0), n.COLOR_0 !== void 0 && (a = !0), r && i && a) break;
	}
	if (!r && !i && !a) return Promise.resolve(e);
	let o = [], s = [], c = [];
	for (let l = 0, u = t.length; l < u; l++) {
		let u = t[l];
		if (r) {
			let t = u.POSITION === void 0 ? e.attributes.position : n.getDependency("accessor", u.POSITION);
			o.push(t);
		}
		if (i) {
			let t = u.NORMAL === void 0 ? e.attributes.normal : n.getDependency("accessor", u.NORMAL);
			s.push(t);
		}
		if (a) {
			let t = u.COLOR_0 === void 0 ? e.attributes.color : n.getDependency("accessor", u.COLOR_0);
			c.push(t);
		}
	}
	return Promise.all([
		Promise.all(o),
		Promise.all(s),
		Promise.all(c)
	]).then(function(t) {
		let n = t[0], o = t[1], s = t[2];
		return r && (e.morphAttributes.position = n), i && (e.morphAttributes.normal = o), a && (e.morphAttributes.color = s), e.morphTargetsRelative = !0, e;
	});
}
function Mn(e, t) {
	if (e.updateMorphTargets(), t.weights !== void 0) for (let n = 0, r = t.weights.length; n < r; n++) e.morphTargetInfluences[n] = t.weights[n];
	if (t.extras && Array.isArray(t.extras.targetNames)) {
		let n = t.extras.targetNames;
		if (e.morphTargetInfluences.length === n.length) {
			e.morphTargetDictionary = {};
			for (let t = 0, r = n.length; t < r; t++) e.morphTargetDictionary[n[t]] = t;
		} else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
	}
}
function Nn(e) {
	let t, n = e.extensions && e.extensions[K.KHR_DRACO_MESH_COMPRESSION];
	if (t = n ? "draco:" + n.bufferView + ":" + n.indices + ":" + Pn(n.attributes) : e.indices + ":" + Pn(e.attributes) + ":" + e.mode, e.targets !== void 0) for (let n = 0, r = e.targets.length; n < r; n++) t += ":" + Pn(e.targets[n]);
	return t;
}
function Pn(e) {
	let t = "", n = Object.keys(e).sort();
	for (let r = 0, i = n.length; r < i; r++) t += n[r] + ":" + e[n[r]] + ";";
	return t;
}
function Fn(e) {
	switch (e) {
		case Int8Array: return 1 / 127;
		case Uint8Array: return 1 / 255;
		case Int16Array: return 1 / 32767;
		case Uint16Array: return 1 / 65535;
		default: throw Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
	}
}
function In(e) {
	return e.search(/\.jpe?g($|\?)/i) > 0 || e.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : e.search(/\.webp($|\?)/i) > 0 || e.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
var Ln = /* @__PURE__ */ new De(), Rn = class {
	constructor(e = {}, t = {}) {
		this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new Wt(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = {
			refs: {},
			uses: {}
		}, this.cameraCache = {
			refs: {},
			uses: {}
		}, this.lightCache = {
			refs: {},
			uses: {}
		}, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
		let n = !1, r = !1, i = -1;
		typeof navigator < "u" && navigator.userAgent !== void 0 && (n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, r = navigator.userAgent.indexOf("Firefox") > -1, i = r ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap > "u" || n || r && i < 98 ? this.textureLoader = new ye(this.options.manager) : this.textureLoader = new me(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new N(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
	}
	setExtensions(e) {
		this.extensions = e;
	}
	setPlugins(e) {
		this.plugins = e;
	}
	parse(e, t) {
		let n = this, r = this.json, i = this.extensions;
		this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(e) {
			return e._markDefs && e._markDefs();
		}), Promise.all(this._invokeAll(function(e) {
			return e.beforeRoot && e.beforeRoot();
		})).then(function() {
			return Promise.all([
				n.getDependencies("scene"),
				n.getDependencies("animation"),
				n.getDependencies("camera")
			]);
		}).then(function(t) {
			let a = {
				scene: t[0][r.scene || 0],
				scenes: t[0],
				animations: t[1],
				cameras: t[2],
				asset: r.asset,
				parser: n,
				userData: {}
			};
			return kn(i, a, r), An(a, r), Promise.all(n._invokeAll(function(e) {
				return e.afterRoot && e.afterRoot(a);
			})).then(function() {
				for (let e of a.scenes) e.updateMatrixWorld();
				e(a);
			});
		}).catch(t);
	}
	_markDefs() {
		let e = this.json.nodes || [], t = this.json.skins || [], n = this.json.meshes || [];
		for (let n = 0, r = t.length; n < r; n++) {
			let r = t[n].joints;
			for (let t = 0, n = r.length; t < n; t++) e[r[t]].isBone = !0;
		}
		for (let t = 0, r = e.length; t < r; t++) {
			let r = e[t];
			r.mesh !== void 0 && (this._addNodeRef(this.meshCache, r.mesh), r.skin !== void 0 && (n[r.mesh].isSkinnedMesh = !0)), r.camera !== void 0 && this._addNodeRef(this.cameraCache, r.camera);
		}
	}
	_addNodeRef(e, t) {
		t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
	}
	_getNodeRef(e, t, n) {
		if (e.refs[t] <= 1) return n;
		let r = n.clone(), i = (e, t) => {
			let n = this.associations.get(e);
			n != null && this.associations.set(t, n);
			for (let [n, r] of e.children.entries()) i(r, t.children[n]);
		};
		return i(n, r), r.name += "_instance_" + e.uses[t]++, r;
	}
	_invokeOne(e) {
		let t = Object.values(this.plugins);
		t.push(this);
		for (let n = 0; n < t.length; n++) {
			let r = e(t[n]);
			if (r) return r;
		}
		return null;
	}
	_invokeAll(e) {
		let t = Object.values(this.plugins);
		t.unshift(this);
		let n = [];
		for (let r = 0; r < t.length; r++) {
			let i = e(t[r]);
			i && n.push(i);
		}
		return n;
	}
	getDependency(e, t) {
		let n = e + ":" + t, r = this.cache.get(n);
		if (!r) {
			switch (e) {
				case "scene":
					r = this.loadScene(t);
					break;
				case "node":
					r = this._invokeOne(function(e) {
						return e.loadNode && e.loadNode(t);
					});
					break;
				case "mesh":
					r = this._invokeOne(function(e) {
						return e.loadMesh && e.loadMesh(t);
					});
					break;
				case "accessor":
					r = this.loadAccessor(t);
					break;
				case "bufferView":
					r = this._invokeOne(function(e) {
						return e.loadBufferView && e.loadBufferView(t);
					});
					break;
				case "buffer":
					r = this.loadBuffer(t);
					break;
				case "material":
					r = this._invokeOne(function(e) {
						return e.loadMaterial && e.loadMaterial(t);
					});
					break;
				case "texture":
					r = this._invokeOne(function(e) {
						return e.loadTexture && e.loadTexture(t);
					});
					break;
				case "skin":
					r = this.loadSkin(t);
					break;
				case "animation":
					r = this._invokeOne(function(e) {
						return e.loadAnimation && e.loadAnimation(t);
					});
					break;
				case "camera":
					r = this.loadCamera(t);
					break;
				default:
					if (r = this._invokeOne(function(n) {
						return n != this && n.getDependency && n.getDependency(e, t);
					}), !r) throw Error("Unknown type: " + e);
					break;
			}
			this.cache.add(n, r);
		}
		return r;
	}
	getDependencies(e) {
		let t = this.cache.get(e);
		if (!t) {
			let n = this, r = this.json[e + (e === "mesh" ? "es" : "s")] || [];
			t = Promise.all(r.map(function(t, r) {
				return n.getDependency(e, r);
			})), this.cache.add(e, t);
		}
		return t;
	}
	loadBuffer(e) {
		let t = this.json.buffers[e], n = this.fileLoader;
		if (t.type && t.type !== "arraybuffer") throw Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
		if (t.uri === void 0 && e === 0) return Promise.resolve(this.extensions[K.KHR_BINARY_GLTF].body);
		let r = this.options;
		return new Promise(function(e, i) {
			n.load(Ee.resolveURL(t.uri, r.path), e, void 0, function() {
				i(/* @__PURE__ */ Error("THREE.GLTFLoader: Failed to load buffer \"" + t.uri + "\"."));
			});
		});
	}
	loadBufferView(e) {
		let t = this.json.bufferViews[e];
		return this.getDependency("buffer", t.buffer).then(function(e) {
			let n = t.byteLength || 0, r = t.byteOffset || 0;
			return e.slice(r, r + n);
		});
	}
	loadAccessor(e) {
		let t = this, n = this.json, r = this.json.accessors[e];
		if (r.bufferView === void 0 && r.sparse === void 0) {
			let e = Cn[r.type], t = bn[r.componentType], n = r.normalized === !0, i = new t(r.count * e);
			return Promise.resolve(new u(i, e, n));
		}
		let i = [];
		return r.bufferView === void 0 ? i.push(null) : i.push(this.getDependency("bufferView", r.bufferView)), r.sparse !== void 0 && (i.push(this.getDependency("bufferView", r.sparse.indices.bufferView)), i.push(this.getDependency("bufferView", r.sparse.values.bufferView))), Promise.all(i).then(function(e) {
			let i = e[0], a = Cn[r.type], o = bn[r.componentType], s = o.BYTES_PER_ELEMENT, c = s * a, l = r.byteOffset || 0, d = r.bufferView === void 0 ? void 0 : n.bufferViews[r.bufferView].byteStride, f = r.normalized === !0, p, m;
			if (d && d !== c) {
				let e = Math.floor(l / d), n = "InterleavedBuffer:" + r.bufferView + ":" + r.componentType + ":" + e + ":" + r.count, c = t.cache.get(n);
				c || (p = new o(i, e * d, r.count * d / s), c = new ge(p, d / s), t.cache.add(n, c)), m = new be(c, a, l % d / s, f);
			} else p = i === null ? new o(r.count * a) : new o(i, l, r.count * a), m = new u(p, a, f);
			if (r.sparse !== void 0) {
				let t = Cn.SCALAR, n = bn[r.sparse.indices.componentType], s = r.sparse.indices.byteOffset || 0, c = r.sparse.values.byteOffset || 0, l = new n(e[1], s, r.sparse.count * t), d = new o(e[2], c, r.sparse.count * a);
				i !== null && (m = new u(m.array.slice(), m.itemSize, m.normalized));
				for (let e = 0, t = l.length; e < t; e++) {
					let t = l[e];
					if (m.setX(t, d[e * a]), a >= 2 && m.setY(t, d[e * a + 1]), a >= 3 && m.setZ(t, d[e * a + 2]), a >= 4 && m.setW(t, d[e * a + 3]), a >= 5) throw Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
				}
			}
			return m;
		});
	}
	loadTexture(e) {
		let t = this.json, n = this.options, r = t.textures[e].source, i = t.images[r], a = this.textureLoader;
		if (i.uri) {
			let e = n.manager.getHandler(i.uri);
			e !== null && (a = e);
		}
		return this.loadTextureImage(e, r, a);
	}
	loadTextureImage(e, t, n) {
		let r = this, i = this.json, a = i.textures[e], o = i.images[t], s = (o.uri || o.bufferView) + ":" + a.sampler;
		if (this.textureCache[s]) return this.textureCache[s];
		let c = this.loadImageSource(t, n).then(function(t) {
			t.flipY = !1, t.name = a.name || o.name || "", t.name === "" && typeof o.uri == "string" && o.uri.startsWith("data:image/") === !1 && (t.name = o.uri);
			let n = (i.samplers || {})[a.sampler] || {};
			return t.magFilter = xn[n.magFilter] || 1006, t.minFilter = xn[n.minFilter] || 1008, t.wrapS = Sn[n.wrapS] || 1e3, t.wrapT = Sn[n.wrapT] || 1e3, r.associations.set(t, { textures: e }), t;
		}).catch(function() {
			return null;
		});
		return this.textureCache[s] = c, c;
	}
	loadImageSource(e, t) {
		let n = this, r = this.json, i = this.options;
		if (this.sourceCache[e] !== void 0) return this.sourceCache[e].then((e) => e.clone());
		let a = r.images[e], o = self.URL || self.webkitURL, s = a.uri || "", c = !1;
		if (a.bufferView !== void 0) s = n.getDependency("bufferView", a.bufferView).then(function(e) {
			c = !0;
			let t = new Blob([e], { type: a.mimeType });
			return s = o.createObjectURL(t), s;
		});
		else if (a.uri === void 0) throw Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
		let l = Promise.resolve(s).then(function(e) {
			return new Promise(function(n, r) {
				let a = n;
				t.isImageBitmapLoader === !0 && (a = function(e) {
					let t = new C(e);
					t.needsUpdate = !0, n(t);
				}), t.load(Ee.resolveURL(e, i.path), a, void 0, r);
			});
		}).then(function(e) {
			return c === !0 && o.revokeObjectURL(s), An(e, a), e.userData.mimeType = a.mimeType || In(a.uri), e;
		}).catch(function(e) {
			throw console.error("THREE.GLTFLoader: Couldn't load texture", s), e;
		});
		return this.sourceCache[e] = l, l;
	}
	assignTexture(e, t, n, r) {
		let i = this;
		return this.getDependency("texture", n.index).then(function(a) {
			if (!a) return null;
			if (n.texCoord !== void 0 && n.texCoord > 0 && (a = a.clone(), a.channel = n.texCoord), i.extensions[K.KHR_TEXTURE_TRANSFORM]) {
				let e = n.extensions === void 0 ? void 0 : n.extensions[K.KHR_TEXTURE_TRANSFORM];
				if (e) {
					let t = i.associations.get(a);
					a = i.extensions[K.KHR_TEXTURE_TRANSFORM].extendTexture(a, e), i.associations.set(a, t);
				}
			}
			return r !== void 0 && (typeof r == "number" && (r = r === Vt ? zt : Bt), "colorSpace" in a ? a.colorSpace = r : a.encoding = r === zt ? Vt : Ht), e[t] = a, a;
		});
	}
	assignFinalMaterial(e) {
		let t = e.geometry, n = e.material, r = t.attributes.tangent === void 0, i = t.attributes.color !== void 0, a = t.attributes.normal === void 0;
		if (e.isPoints) {
			let e = "PointsMaterial:" + n.uuid, t = this.cache.get(e);
			t || (t = new ee(), Le.prototype.copy.call(t, n), t.color.copy(n.color), t.map = n.map, t.sizeAttenuation = !1, this.cache.add(e, t)), n = t;
		} else if (e.isLine) {
			let e = "LineBasicMaterial:" + n.uuid, t = this.cache.get(e);
			t || (t = new Ge(), Le.prototype.copy.call(t, n), t.color.copy(n.color), t.map = n.map, this.cache.add(e, t)), n = t;
		}
		if (r || i || a) {
			let e = "ClonedMaterial:" + n.uuid + ":";
			r && (e += "derivative-tangents:"), i && (e += "vertex-colors:"), a && (e += "flat-shading:");
			let t = this.cache.get(e);
			t || (t = n.clone(), i && (t.vertexColors = !0), a && (t.flatShading = !0), r && (t.normalScale && (t.normalScale.y *= -1), t.clearcoatNormalScale && (t.clearcoatNormalScale.y *= -1)), this.cache.add(e, t), this.associations.set(t, this.associations.get(n))), n = t;
		}
		e.material = n;
	}
	getMaterialType() {
		return nt;
	}
	loadMaterial(e) {
		let t = this, n = this.json, r = this.extensions, a = n.materials[e], o, s = {}, c = a.extensions || {}, l = [];
		if (c[K.KHR_MATERIALS_UNLIT]) {
			let e = r[K.KHR_MATERIALS_UNLIT];
			o = e.getMaterialType(), l.push(e.extendParams(s, a, t));
		} else {
			let n = a.pbrMetallicRoughness || {};
			if (s.color = new B(1, 1, 1), s.opacity = 1, Array.isArray(n.baseColorFactor)) {
				let e = n.baseColorFactor;
				s.color.setRGB(e[0], e[1], e[2], Bt), s.opacity = e[3];
			}
			n.baseColorTexture !== void 0 && l.push(t.assignTexture(s, "map", n.baseColorTexture, zt)), s.metalness = n.metallicFactor === void 0 ? 1 : n.metallicFactor, s.roughness = n.roughnessFactor === void 0 ? 1 : n.roughnessFactor, n.metallicRoughnessTexture !== void 0 && (l.push(t.assignTexture(s, "metalnessMap", n.metallicRoughnessTexture)), l.push(t.assignTexture(s, "roughnessMap", n.metallicRoughnessTexture))), o = this._invokeOne(function(t) {
				return t.getMaterialType && t.getMaterialType(e);
			}), l.push(Promise.all(this._invokeAll(function(t) {
				return t.extendMaterialParams && t.extendMaterialParams(e, s);
			})));
		}
		a.doubleSided === !0 && (s.side = 2);
		let u = a.alphaMode || Dn.OPAQUE;
		if (u === Dn.BLEND ? (s.transparent = !0, s.depthWrite = !1) : (s.transparent = !1, u === Dn.MASK && (s.alphaTest = a.alphaCutoff === void 0 ? .5 : a.alphaCutoff)), a.normalTexture !== void 0 && o !== Qe && (l.push(t.assignTexture(s, "normalMap", a.normalTexture)), s.normalScale = new i(1, 1), a.normalTexture.scale !== void 0)) {
			let e = a.normalTexture.scale;
			s.normalScale.set(e, e);
		}
		if (a.occlusionTexture !== void 0 && o !== Qe && (l.push(t.assignTexture(s, "aoMap", a.occlusionTexture)), a.occlusionTexture.strength !== void 0 && (s.aoMapIntensity = a.occlusionTexture.strength)), a.emissiveFactor !== void 0 && o !== Qe) {
			let e = a.emissiveFactor;
			s.emissive = new B().setRGB(e[0], e[1], e[2], Bt);
		}
		return a.emissiveTexture !== void 0 && o !== Qe && l.push(t.assignTexture(s, "emissiveMap", a.emissiveTexture, zt)), Promise.all(l).then(function() {
			let n = new o(s);
			return a.name && (n.name = a.name), An(n, a), t.associations.set(n, { materials: e }), a.extensions && kn(r, n, a), n;
		});
	}
	createUniqueName(e) {
		let t = re.sanitizeNodeName(e || "");
		return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t);
	}
	loadGeometries(e) {
		let t = this, n = this.extensions, r = this.primitiveCache;
		function i(e) {
			return n[K.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e, t).then(function(n) {
				return Bn(n, e, t);
			});
		}
		let a = [];
		for (let n = 0, o = e.length; n < o; n++) {
			let o = e[n], s = Nn(o), c = r[s];
			if (c) a.push(c.promise);
			else {
				let e;
				e = o.extensions && o.extensions[K.KHR_DRACO_MESH_COMPRESSION] ? i(o) : Bn(new j(), o, t), r[s] = {
					primitive: o,
					promise: e
				}, a.push(e);
			}
		}
		return Promise.all(a);
	}
	loadMesh(e) {
		let t = this, n = this.json, r = this.extensions, i = n.meshes[e], a = i.primitives, o = [];
		for (let e = 0, t = a.length; e < t; e++) {
			let t = a[e].material === void 0 ? On(this.cache) : this.getDependency("material", a[e].material);
			o.push(t);
		}
		return o.push(t.loadGeometries(a)), Promise.all(o).then(function(n) {
			let o = n.slice(0, n.length - 1), s = n[n.length - 1], c = [];
			for (let n = 0, l = s.length; n < l; n++) {
				let l = s[n], u = a[n], d, f = o[n];
				if (u.mode === q.TRIANGLES || u.mode === q.TRIANGLE_STRIP || u.mode === q.TRIANGLE_FAN || u.mode === void 0) d = i.isSkinnedMesh === !0 ? new _(l, f) : new F(l, f), d.isSkinnedMesh === !0 && d.normalizeSkinWeights(), u.mode === q.TRIANGLE_STRIP ? d.geometry = ct(d.geometry, 1) : u.mode === q.TRIANGLE_FAN && (d.geometry = ct(d.geometry, 2));
				else if (u.mode === q.LINES) d = new Ce(l, f);
				else if (u.mode === q.LINE_STRIP) d = new Xe(l, f);
				else if (u.mode === q.LINE_LOOP) d = new je(l, f);
				else if (u.mode === q.POINTS) d = new k(l, f);
				else throw Error("THREE.GLTFLoader: Primitive mode unsupported: " + u.mode);
				Object.keys(d.geometry.morphAttributes).length > 0 && Mn(d, i), d.name = t.createUniqueName(i.name || "mesh_" + e), An(d, i), u.extensions && kn(r, d, u), t.assignFinalMaterial(d), c.push(d);
			}
			for (let n = 0, r = c.length; n < r; n++) t.associations.set(c[n], {
				meshes: e,
				primitives: n
			});
			if (c.length === 1) return i.extensions && kn(r, c[0], i), c[0];
			let l = new fe();
			i.extensions && kn(r, l, i), t.associations.set(l, { meshes: e });
			for (let e = 0, t = c.length; e < t; e++) l.add(c[e]);
			return l;
		});
	}
	loadCamera(e) {
		let t, n = this.json.cameras[e], r = n[n.type];
		if (!r) {
			console.warn("THREE.GLTFLoader: Missing camera parameters.");
			return;
		}
		return n.type === "perspective" ? t = new Pe(ke.radToDeg(r.yfov), r.aspectRatio || 1, r.znear || 1, r.zfar || 2e6) : n.type === "orthographic" && (t = new te(-r.xmag, r.xmag, r.ymag, -r.ymag, r.znear, r.zfar)), n.name && (t.name = this.createUniqueName(n.name)), An(t, n), Promise.resolve(t);
	}
	loadSkin(e) {
		let t = this.json.skins[e], n = [];
		for (let e = 0, r = t.joints.length; e < r; e++) n.push(this._loadNodeShallow(t.joints[e]));
		return t.inverseBindMatrices === void 0 ? n.push(null) : n.push(this.getDependency("accessor", t.inverseBindMatrices)), Promise.all(n).then(function(e) {
			let n = e.pop(), r = e, i = [], a = [];
			for (let e = 0, o = r.length; e < o; e++) {
				let o = r[e];
				if (o) {
					i.push(o);
					let t = new De();
					n !== null && t.fromArray(n.array, e * 16), a.push(t);
				} else console.warn("THREE.GLTFLoader: Joint \"%s\" could not be found.", t.joints[e]);
			}
			return new he(i, a);
		});
	}
	loadAnimation(e) {
		let t = this.json, n = this, r = t.animations[e], i = r.name ? r.name : "animation_" + e, a = [], o = [], s = [], c = [], l = [];
		for (let e = 0, t = r.channels.length; e < t; e++) {
			let t = r.channels[e], n = r.samplers[t.sampler], i = t.target, u = i.node, d = r.parameters === void 0 ? n.input : r.parameters[n.input], f = r.parameters === void 0 ? n.output : r.parameters[n.output];
			i.node !== void 0 && (a.push(this.getDependency("node", u)), o.push(this.getDependency("accessor", d)), s.push(this.getDependency("accessor", f)), c.push(n), l.push(i));
		}
		return Promise.all([
			Promise.all(a),
			Promise.all(o),
			Promise.all(s),
			Promise.all(c),
			Promise.all(l)
		]).then(function(e) {
			let t = e[0], r = e[1], a = e[2], o = e[3], s = e[4], c = [];
			for (let e = 0, i = t.length; e < i; e++) {
				let i = t[e], l = r[e], u = a[e], d = o[e], f = s[e];
				if (i === void 0) continue;
				i.updateMatrix && i.updateMatrix();
				let p = n._createAnimationTracks(i, l, u, d, f);
				if (p) for (let e = 0; e < p.length; e++) c.push(p[e]);
			}
			return new $e(i, void 0, c);
		});
	}
	createNodeMesh(e) {
		let t = this.json, n = this, r = t.nodes[e];
		return r.mesh === void 0 ? null : n.getDependency("mesh", r.mesh).then(function(e) {
			let t = n._getNodeRef(n.meshCache, r.mesh, e);
			return r.weights !== void 0 && t.traverse(function(e) {
				if (e.isMesh) for (let t = 0, n = r.weights.length; t < n; t++) e.morphTargetInfluences[t] = r.weights[t];
			}), t;
		});
	}
	loadNode(e) {
		let t = this.json, n = this, r = t.nodes[e], i = n._loadNodeShallow(e), a = [], o = r.children || [];
		for (let e = 0, t = o.length; e < t; e++) a.push(n.getDependency("node", o[e]));
		let s = r.skin === void 0 ? Promise.resolve(null) : n.getDependency("skin", r.skin);
		return Promise.all([
			i,
			Promise.all(a),
			s
		]).then(function(e) {
			let t = e[0], n = e[1], r = e[2];
			r !== null && t.traverse(function(e) {
				e.isSkinnedMesh && e.bind(r, Ln);
			});
			for (let e = 0, r = n.length; e < r; e++) t.add(n[e]);
			return t;
		});
	}
	_loadNodeShallow(e) {
		let t = this.json, n = this.extensions, r = this;
		if (this.nodeCache[e] !== void 0) return this.nodeCache[e];
		let i = t.nodes[e], a = i.name ? r.createUniqueName(i.name) : "", o = [], s = r._invokeOne(function(t) {
			return t.createNodeMesh && t.createNodeMesh(e);
		});
		return s && o.push(s), i.camera !== void 0 && o.push(r.getDependency("camera", i.camera).then(function(e) {
			return r._getNodeRef(r.cameraCache, i.camera, e);
		})), r._invokeAll(function(t) {
			return t.createNodeAttachment && t.createNodeAttachment(e);
		}).forEach(function(e) {
			o.push(e);
		}), this.nodeCache[e] = Promise.all(o).then(function(t) {
			let o;
			if (o = i.isBone === !0 ? new ce() : t.length > 1 ? new fe() : t.length === 1 ? t[0] : new d(), o !== t[0]) for (let e = 0, n = t.length; e < n; e++) o.add(t[e]);
			if (i.name && (o.userData.name = i.name, o.name = a), An(o, i), i.extensions && kn(n, o, i), i.matrix !== void 0) {
				let e = new De();
				e.fromArray(i.matrix), o.applyMatrix4(e);
			} else i.translation !== void 0 && o.position.fromArray(i.translation), i.rotation !== void 0 && o.quaternion.fromArray(i.rotation), i.scale !== void 0 && o.scale.fromArray(i.scale);
			return r.associations.has(o) || r.associations.set(o, {}), r.associations.get(o).nodes = e, o;
		}), this.nodeCache[e];
	}
	loadScene(e) {
		let t = this.extensions, n = this.json.scenes[e], r = this, i = new fe();
		n.name && (i.name = r.createUniqueName(n.name)), An(i, n), n.extensions && kn(t, i, n);
		let a = n.nodes || [], o = [];
		for (let e = 0, t = a.length; e < t; e++) o.push(r.getDependency("node", a[e]));
		return Promise.all(o).then(function(e) {
			for (let t = 0, n = e.length; t < n; t++) i.add(e[t]);
			return r.associations = ((e) => {
				let t = /* @__PURE__ */ new Map();
				for (let [e, n] of r.associations) (e instanceof Le || e instanceof C) && t.set(e, n);
				return e.traverse((e) => {
					let n = r.associations.get(e);
					n != null && t.set(e, n);
				}), t;
			})(i), i;
		});
	}
	_createAnimationTracks(e, t, n, r, i) {
		let a = [], o = e.name ? e.name : e.uuid, s = [];
		Tn[i.path] === Tn.weights ? e.traverse(function(e) {
			e.morphTargetInfluences && s.push(e.name ? e.name : e.uuid);
		}) : s.push(o);
		let c;
		switch (Tn[i.path]) {
			case Tn.weights:
				c = p;
				break;
			case Tn.rotation:
				c = x;
				break;
			case Tn.position:
			case Tn.scale:
				c = V;
				break;
			default:
				switch (n.itemSize) {
					case 1:
						c = p;
						break;
					default:
						c = V;
						break;
				}
				break;
		}
		let l = r.interpolation === void 0 ? Te : En[r.interpolation], u = this._getArrayFromAccessor(n);
		for (let e = 0, n = s.length; e < n; e++) {
			let n = new c(s[e] + "." + Tn[i.path], t.array, u, l);
			r.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(n), a.push(n);
		}
		return a;
	}
	_getArrayFromAccessor(e) {
		let t = e.array;
		if (e.normalized) {
			let e = Fn(t.constructor), n = new Float32Array(t.length);
			for (let r = 0, i = t.length; r < i; r++) n[r] = t[r] * e;
			t = n;
		}
		return t;
	}
	_createCubicSplineTrackInterpolant(e) {
		e.createInterpolant = function(e) {
			return new (this instanceof x ? yn : _n)(this.times, this.values, this.getValueSize() / 3, e);
		}, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
	}
};
function zn(e, t, n) {
	let r = t.attributes, i = new f();
	if (r.POSITION !== void 0) {
		let e = n.json.accessors[r.POSITION], t = e.min, a = e.max;
		if (t !== void 0 && a !== void 0) {
			if (i.set(new z(t[0], t[1], t[2]), new z(a[0], a[1], a[2])), e.normalized) {
				let t = Fn(bn[e.componentType]);
				i.min.multiplyScalar(t), i.max.multiplyScalar(t);
			}
		} else {
			console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
			return;
		}
	} else return;
	let a = t.targets;
	if (a !== void 0) {
		let e = new z(), t = new z();
		for (let r = 0, i = a.length; r < i; r++) {
			let i = a[r];
			if (i.POSITION !== void 0) {
				let r = n.json.accessors[i.POSITION], a = r.min, o = r.max;
				if (a !== void 0 && o !== void 0) {
					if (t.setX(Math.max(Math.abs(a[0]), Math.abs(o[0]))), t.setY(Math.max(Math.abs(a[1]), Math.abs(o[1]))), t.setZ(Math.max(Math.abs(a[2]), Math.abs(o[2]))), r.normalized) {
						let e = Fn(bn[r.componentType]);
						t.multiplyScalar(e);
					}
					e.max(t);
				} else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
			}
		}
		i.expandByVector(e);
	}
	e.boundingBox = i;
	let o = new T();
	i.getCenter(o.center), o.radius = i.min.distanceTo(i.max) / 2, e.boundingSphere = o;
}
function Bn(e, t, n) {
	let r = t.attributes, i = [];
	function a(t, r) {
		return n.getDependency("accessor", t).then(function(t) {
			e.setAttribute(r, t);
		});
	}
	for (let t in r) {
		let n = wn[t] || t.toLowerCase();
		n in e.attributes || i.push(a(r[t], n));
	}
	if (t.indices !== void 0 && !e.index) {
		let r = n.getDependency("accessor", t.indices).then(function(t) {
			e.setIndex(t);
		});
		i.push(r);
	}
	return An(e, t), zn(e, t, n), Promise.all(i).then(function() {
		return t.targets === void 0 ? e : jn(e, t.targets, n);
	});
}
//#endregion
//#region node_modules/three-stdlib/shaders/HorizontalBlurShader.js
var Vn = {
	uniforms: {
		tDiffuse: { value: null },
		h: { value: 1 / 512 }
	},
	vertexShader: "\n      varying vec2 vUv;\n\n      void main() {\n\n        vUv = uv;\n        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n      }\n  ",
	fragmentShader: "\n    uniform sampler2D tDiffuse;\n    uniform float h;\n\n    varying vec2 vUv;\n\n    void main() {\n\n    	vec4 sum = vec4( 0.0 );\n\n    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;\n    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;\n    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;\n    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;\n    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;\n    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;\n    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;\n    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;\n    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;\n\n    	gl_FragColor = sum;\n\n    }\n  "
}, Hn = {
	uniforms: {
		tDiffuse: { value: null },
		v: { value: 1 / 512 }
	},
	vertexShader: "\n    varying vec2 vUv;\n\n    void main() {\n\n      vUv = uv;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n    }\n  ",
	fragmentShader: "\n\n  uniform sampler2D tDiffuse;\n  uniform float v;\n\n  varying vec2 vUv;\n\n  void main() {\n\n    vec4 sum = vec4( 0.0 );\n\n    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;\n    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;\n    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;\n    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;\n    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;\n    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;\n    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;\n    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;\n    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;\n\n    gl_FragColor = sum;\n\n  }\n  "
}, Un = class extends ne {
	constructor(e) {
		super(e), this.type = v;
	}
	parse(e) {
		let t = function(e, t) {
			switch (e) {
				case 1: throw Error("THREE.RGBELoader: Read Error: " + (t || ""));
				case 2: throw Error("THREE.RGBELoader: Write Error: " + (t || ""));
				case 3: throw Error("THREE.RGBELoader: Bad File Format: " + (t || ""));
				default:
				case 4: throw Error("THREE.RGBELoader: Memory Error: " + (t || ""));
			}
		}, n = function(e, t, n) {
			t ||= 1024;
			let r = e.pos, i = -1, a = 0, o = "", s = String.fromCharCode.apply(null, new Uint16Array(e.subarray(r, r + 128)));
			for (; 0 > (i = s.indexOf("\n")) && a < t && r < e.byteLength;) o += s, a += s.length, r += 128, s += String.fromCharCode.apply(null, new Uint16Array(e.subarray(r, r + 128)));
			return -1 < i ? (!1 !== n && (e.pos += a + i + 1), o + s.slice(0, i)) : !1;
		}, r = function(e) {
			let r = /^#\?(\S+)/, i = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, a = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, o = /^\s*FORMAT=(\S+)\s*$/, s = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, c = {
				valid: 0,
				string: "",
				comments: "",
				programtype: "RGBE",
				format: "",
				gamma: 1,
				exposure: 1,
				width: 0,
				height: 0
			}, l, u;
			for ((e.pos >= e.byteLength || !(l = n(e))) && t(1, "no header found"), (u = l.match(r)) || t(3, "bad initial token"), c.valid |= 1, c.programtype = u[1], c.string += l + "\n"; l = n(e), !1 !== l;) {
				if (c.string += l + "\n", l.charAt(0) === "#") {
					c.comments += l + "\n";
					continue;
				}
				if ((u = l.match(i)) && (c.gamma = parseFloat(u[1])), (u = l.match(a)) && (c.exposure = parseFloat(u[1])), (u = l.match(o)) && (c.valid |= 2, c.format = u[1]), (u = l.match(s)) && (c.valid |= 4, c.height = parseInt(u[1], 10), c.width = parseInt(u[2], 10)), c.valid & 2 && c.valid & 4) break;
			}
			return c.valid & 2 || t(3, "missing format specifier"), c.valid & 4 || t(3, "missing image size specifier"), c;
		}, i = function(e, n, r) {
			let i = n;
			if (i < 8 || i > 32767 || e[0] !== 2 || e[1] !== 2 || e[2] & 128) return new Uint8Array(e);
			i !== (e[2] << 8 | e[3]) && t(3, "wrong scanline width");
			let a = new Uint8Array(4 * n * r);
			a.length || t(4, "unable to allocate buffer space");
			let o = 0, s = 0, c = 4 * i, l = /* @__PURE__ */ new Uint8Array(4), u = new Uint8Array(c), d = r;
			for (; d > 0 && s < e.byteLength;) {
				s + 4 > e.byteLength && t(1), l[0] = e[s++], l[1] = e[s++], l[2] = e[s++], l[3] = e[s++], (l[0] != 2 || l[1] != 2 || (l[2] << 8 | l[3]) != i) && t(3, "bad rgbe scanline format");
				let n = 0, r;
				for (; n < c && s < e.byteLength;) {
					r = e[s++];
					let i = r > 128;
					if (i && (r -= 128), (r === 0 || n + r > c) && t(3, "bad scanline data"), i) {
						let t = e[s++];
						for (let e = 0; e < r; e++) u[n++] = t;
					} else u.set(e.subarray(s, s + r), n), n += r, s += r;
				}
				let f = i;
				for (let e = 0; e < f; e++) {
					let t = 0;
					a[o] = u[e + t], t += i, a[o + 1] = u[e + t], t += i, a[o + 2] = u[e + t], t += i, a[o + 3] = u[e + t], o += 4;
				}
				d--;
			}
			return a;
		}, a = function(e, t, n, r) {
			let i = 2 ** (e[t + 3] - 128) / 255;
			n[r + 0] = e[t + 0] * i, n[r + 1] = e[t + 1] * i, n[r + 2] = e[t + 2] * i, n[r + 3] = 1;
		}, o = function(e, t, n, r) {
			let i = 2 ** (e[t + 3] - 128) / 255;
			n[r + 0] = m.toHalfFloat(Math.min(e[t + 0] * i, 65504)), n[r + 1] = m.toHalfFloat(Math.min(e[t + 1] * i, 65504)), n[r + 2] = m.toHalfFloat(Math.min(e[t + 2] * i, 65504)), n[r + 3] = m.toHalfFloat(1);
		}, c = new Uint8Array(e);
		c.pos = 0;
		let l = r(c), u = l.width, d = l.height, f = i(c.subarray(c.pos), u, d), p, h, g;
		switch (this.type) {
			case s:
				g = f.length / 4;
				let e = new Float32Array(g * 4);
				for (let t = 0; t < g; t++) a(f, t * 4, e, t * 4);
				p = e, h = s;
				break;
			case v:
				g = f.length / 4;
				let t = new Uint16Array(g * 4);
				for (let e = 0; e < g; e++) o(f, e * 4, t, e * 4);
				p = t, h = v;
				break;
			default: throw Error("THREE.RGBELoader: Unsupported type: " + this.type);
		}
		return {
			width: u,
			height: d,
			data: p,
			header: l.string,
			gamma: l.gamma,
			exposure: l.exposure,
			type: h
		};
	}
	setDataType(e) {
		return this.type = e, this;
	}
	load(e, t, n, r) {
		function i(e, n) {
			switch (e.type) {
				case s:
				case v:
					"colorSpace" in e ? e.colorSpace = "srgb-linear" : e.encoding = 3e3, e.minFilter = H, e.magFilter = H, e.generateMipmaps = !1, e.flipY = !0;
					break;
			}
			t && t(e, n);
		}
		return super.load(e, i, n, r);
	}
}, Wn = st >= 152, Gn = class extends ne {
	constructor(e) {
		super(e), this.type = v;
	}
	parse(e) {
		let t = 65536, n = 8192, r = 65537, i = 16384, a = i - 1, o = 65535, c = 2.7182818 ** 2.2;
		function l(e, n) {
			for (var r = 0, i = 0; i < t; ++i) (i == 0 || e[i >> 3] & 1 << (i & 7)) && (n[r++] = i);
			for (var a = r - 1; r < t;) n[r++] = 0;
			return a;
		}
		function u(e) {
			for (var t = 0; t < i; t++) e[t] = {}, e[t].len = 0, e[t].lit = 0, e[t].p = null;
		}
		let d = {
			l: 0,
			c: 0,
			lc: 0
		};
		function f(e, t, n, r, i) {
			for (; n < e;) t = t << 8 | Se(r, i), n += 8;
			n -= e, d.l = t >> n & (1 << e) - 1, d.c = t, d.lc = n;
		}
		let p = Array(59);
		function h(e) {
			for (var t = 0; t <= 58; ++t) p[t] = 0;
			for (var t = 0; t < r; ++t) p[e[t]] += 1;
			for (var n = 0, t = 58; t > 0; --t) {
				var i = n + p[t] >> 1;
				p[t] = n, n = i;
			}
			for (var t = 0; t < r; ++t) {
				var a = e[t];
				a > 0 && (e[t] = a | p[a]++ << 6);
			}
		}
		function g(e, t, n, r, i, a, o) {
			for (var s = n, c = 0, l = 0; i <= a; i++) {
				if (s.value - n.value > r) return !1;
				f(6, c, l, e, s);
				var u = d.l;
				if (c = d.c, l = d.lc, o[i] = u, u == 63) {
					if (s.value - n.value > r) throw "Something wrong with hufUnpackEncTable";
					f(8, c, l, e, s);
					var p = d.l + 6;
					if (c = d.c, l = d.lc, i + p > a + 1) throw "Something wrong with hufUnpackEncTable";
					for (; p--;) o[i++] = 0;
					i--;
				} else if (u >= 59) {
					var p = u - 59 + 2;
					if (i + p > a + 1) throw "Something wrong with hufUnpackEncTable";
					for (; p--;) o[i++] = 0;
					i--;
				}
			}
			h(o);
		}
		function _(e) {
			return e & 63;
		}
		function y(e) {
			return e >> 6;
		}
		function b(e, t, n, r) {
			for (; t <= n; t++) {
				var i = y(e[t]), a = _(e[t]);
				if (i >> a) throw "Invalid table entry";
				if (a > 14) {
					var o = r[i >> a - 14];
					if (o.len) throw "Invalid table entry";
					if (o.lit++, o.p) {
						var s = o.p;
						o.p = Array(o.lit);
						for (var c = 0; c < o.lit - 1; ++c) o.p[c] = s[c];
					} else o.p = [,];
					o.p[o.lit - 1] = t;
				} else if (a) for (var l = 0, c = 1 << 14 - a; c > 0; c--) {
					var o = r[(i << 14 - a) + l];
					if (o.len || o.p) throw "Invalid table entry";
					o.len = a, o.lit = t, l++;
				}
			}
			return !0;
		}
		let x = {
			c: 0,
			lc: 0
		};
		function S(e, t, n, r) {
			e = e << 8 | Se(n, r), t += 8, x.c = e, x.lc = t;
		}
		let C = {
			c: 0,
			lc: 0
		};
		function w(e, t, n, r, i, a, o, s, c, l) {
			if (e == t) {
				r < 8 && (S(n, r, i, o), n = x.c, r = x.lc), r -= 8;
				var u = n >> r, u = new Uint8Array([u])[0];
				if (c.value + u > l) return !1;
				for (var d = s[c.value - 1]; u-- > 0;) s[c.value++] = d;
			} else if (c.value < l) s[c.value++] = e;
			else return !1;
			C.c = n, C.lc = r;
		}
		function T(e) {
			return e & 65535;
		}
		function E(e) {
			var t = T(e);
			return t > 32767 ? t - 65536 : t;
		}
		let O = {
			a: 0,
			b: 0
		};
		function k(e, t) {
			var n = E(e), r = E(t), i = n + (r & 1) + (r >> 1), a = i, o = i - r;
			O.a = a, O.b = o;
		}
		function A(e, t) {
			var n = T(e), r = T(t), i = n - (r >> 1) & o, a = r + i - 32768 & o;
			O.a = a, O.b = i;
		}
		function ee(e, t, n, r, i, a, o) {
			for (var s = o < 16384, c = n > i ? i : n, l = 1, u; l <= c;) l <<= 1;
			for (l >>= 1, u = l, l >>= 1; l >= 1;) {
				for (var d = 0, f = d + a * (i - u), p = a * l, m = a * u, h = r * l, g = r * u, _, v, y, b; d <= f; d += m) {
					for (var x = d, S = d + r * (n - u); x <= S; x += g) {
						var C = x + h, w = x + p, T = w + h;
						s ? (k(e[x + t], e[w + t]), _ = O.a, y = O.b, k(e[C + t], e[T + t]), v = O.a, b = O.b, k(_, v), e[x + t] = O.a, e[C + t] = O.b, k(y, b), e[w + t] = O.a, e[T + t] = O.b) : (A(e[x + t], e[w + t]), _ = O.a, y = O.b, A(e[C + t], e[T + t]), v = O.a, b = O.b, A(_, v), e[x + t] = O.a, e[C + t] = O.b, A(y, b), e[w + t] = O.a, e[T + t] = O.b);
					}
					if (n & l) {
						var w = x + p;
						s ? k(e[x + t], e[w + t]) : A(e[x + t], e[w + t]), _ = O.a, e[w + t] = O.b, e[x + t] = _;
					}
				}
				if (i & l) for (var x = d, S = d + r * (n - u); x <= S; x += g) {
					var C = x + h;
					s ? k(e[x + t], e[C + t]) : A(e[x + t], e[C + t]), _ = O.a, e[C + t] = O.b, e[x + t] = _;
				}
				u = l, l >>= 1;
			}
			return d;
		}
		function j(e, t, n, r, i, o, s, c, l, u) {
			for (var d = 0, f = 0, p = c, m = Math.trunc(i.value + (o + 7) / 8); i.value < m;) for (S(d, f, n, i), d = x.c, f = x.lc; f >= 14;) {
				var h = t[d >> f - 14 & a];
				if (h.len) f -= h.len, w(h.lit, s, d, f, n, r, i, l, u, p), d = C.c, f = C.lc;
				else {
					if (!h.p) throw "hufDecode issues";
					var g;
					for (g = 0; g < h.lit; g++) {
						for (var v = _(e[h.p[g]]); f < v && i.value < m;) S(d, f, n, i), d = x.c, f = x.lc;
						if (f >= v && y(e[h.p[g]]) == (d >> f - v & (1 << v) - 1)) {
							f -= v, w(h.p[g], s, d, f, n, r, i, l, u, p), d = C.c, f = C.lc;
							break;
						}
					}
					if (g == h.lit) throw "hufDecode issues";
				}
			}
			var b = 8 - o & 7;
			for (d >>= b, f -= b; f > 0;) {
				var h = t[d << 14 - f & a];
				if (h.len) f -= h.len, w(h.lit, s, d, f, n, r, i, l, u, p), d = C.c, f = C.lc;
				else throw "hufDecode issues";
			}
			return !0;
		}
		function te(e, t, n, a, o, s) {
			var c = { value: 0 }, l = n.value, d = F(t, n), f = F(t, n);
			n.value += 4;
			var p = F(t, n);
			if (n.value += 4, d < 0 || d >= r || f < 0 || f >= r) throw "Something wrong with HUF_ENCSIZE";
			var m = Array(r), h = Array(i);
			if (u(h), g(e, t, n, a - (n.value - l), d, f, m), p > 8 * (a - (n.value - l))) throw "Something wrong with hufUncompress";
			b(m, d, f, h), j(m, h, e, t, n, p, f, s, o, c);
		}
		function ne(e, t, n) {
			for (var r = 0; r < n; ++r) t[r] = e[t[r]];
		}
		function re(e) {
			for (var t = 1; t < e.length; t++) e[t] = e[t - 1] + e[t] - 128;
		}
		function M(e, t) {
			for (var n = 0, r = Math.floor((e.length + 1) / 2), i = 0, a = e.length - 1; !(i > a || (t[i++] = e[n++], i > a));) t[i++] = e[r++];
		}
		function ie(e) {
			for (var t = e.byteLength, n = [], r = 0, i = new DataView(e); t > 0;) {
				var a = i.getInt8(r++);
				if (a < 0) {
					var o = -a;
					t -= o + 1;
					for (var s = 0; s < o; s++) n.push(i.getUint8(r++));
				} else {
					var o = a;
					t -= 2;
					for (var c = i.getUint8(r++), s = 0; s < o + 1; s++) n.push(c);
				}
			}
			return n;
		}
		function N(e, t, n, r, i, a) {
			var o = new DataView(a.buffer), s = n[e.idx[0]].width, c = n[e.idx[0]].height, l = 3, u = Math.floor(s / 8), d = Math.ceil(s / 8), f = Math.ceil(c / 8), p = s - (d - 1) * 8, m = c - (f - 1) * 8, h = { value: 0 }, g = Array(l), _ = Array(l), v = Array(l), y = Array(l), b = Array(l);
			for (let n = 0; n < l; ++n) b[n] = t[e.idx[n]], g[n] = n < 1 ? 0 : g[n - 1] + d * f, _[n] = /* @__PURE__ */ new Float32Array(64), v[n] = /* @__PURE__ */ new Uint16Array(64), y[n] = new Uint16Array(d * 64);
			for (let t = 0; t < f; ++t) {
				var x = 8;
				t == f - 1 && (x = m);
				var S = 8;
				for (let e = 0; e < d; ++e) {
					e == d - 1 && (S = p);
					for (let e = 0; e < l; ++e) v[e].fill(0), v[e][0] = i[g[e]++], oe(h, r, v[e]), se(v[e], _[e]), ce(_[e]);
					le(_);
					for (let t = 0; t < l; ++t) ue(_[t], y[t], e * 64);
				}
				let a = 0;
				for (let r = 0; r < l; ++r) {
					let i = n[e.idx[r]].type;
					for (let e = 8 * t; e < 8 * t + x; ++e) {
						a = b[r][e];
						for (let t = 0; t < u; ++t) {
							let n = t * 64 + (e & 7) * 8;
							o.setUint16(a + 0 * i, y[r][n + 0], !0), o.setUint16(a + 2 * i, y[r][n + 1], !0), o.setUint16(a + 4 * i, y[r][n + 2], !0), o.setUint16(a + 6 * i, y[r][n + 3], !0), o.setUint16(a + 8 * i, y[r][n + 4], !0), o.setUint16(a + 10 * i, y[r][n + 5], !0), o.setUint16(a + 12 * i, y[r][n + 6], !0), o.setUint16(a + 14 * i, y[r][n + 7], !0), a += 16 * i;
						}
					}
					if (u != d) for (let e = 8 * t; e < 8 * t + x; ++e) {
						let t = b[r][e] + 8 * u * 2 * i, n = u * 64 + (e & 7) * 8;
						for (let e = 0; e < S; ++e) o.setUint16(t + e * 2 * i, y[r][n + e], !0);
					}
				}
			}
			for (var C = new Uint16Array(s), o = new DataView(a.buffer), w = 0; w < l; ++w) {
				n[e.idx[w]].decoded = !0;
				var T = n[e.idx[w]].type;
				if (n[w].type == 2) for (var E = 0; E < c; ++E) {
					let e = b[w][E];
					for (var D = 0; D < s; ++D) C[D] = o.getUint16(e + D * 2 * T, !0);
					for (var D = 0; D < s; ++D) o.setFloat32(e + D * 2 * T, R(C[D]), !0);
				}
			}
		}
		function oe(e, t, n) {
			for (var r, i = 1; i < 64;) r = t[e.value], r == 65280 ? i = 64 : r >> 8 == 255 ? i += r & 255 : (n[i] = r, i++), e.value++;
		}
		function se(e, t) {
			t[0] = R(e[0]), t[1] = R(e[1]), t[2] = R(e[5]), t[3] = R(e[6]), t[4] = R(e[14]), t[5] = R(e[15]), t[6] = R(e[27]), t[7] = R(e[28]), t[8] = R(e[2]), t[9] = R(e[4]), t[10] = R(e[7]), t[11] = R(e[13]), t[12] = R(e[16]), t[13] = R(e[26]), t[14] = R(e[29]), t[15] = R(e[42]), t[16] = R(e[3]), t[17] = R(e[8]), t[18] = R(e[12]), t[19] = R(e[17]), t[20] = R(e[25]), t[21] = R(e[30]), t[22] = R(e[41]), t[23] = R(e[43]), t[24] = R(e[9]), t[25] = R(e[11]), t[26] = R(e[18]), t[27] = R(e[24]), t[28] = R(e[31]), t[29] = R(e[40]), t[30] = R(e[44]), t[31] = R(e[53]), t[32] = R(e[10]), t[33] = R(e[19]), t[34] = R(e[23]), t[35] = R(e[32]), t[36] = R(e[39]), t[37] = R(e[45]), t[38] = R(e[52]), t[39] = R(e[54]), t[40] = R(e[20]), t[41] = R(e[22]), t[42] = R(e[33]), t[43] = R(e[38]), t[44] = R(e[46]), t[45] = R(e[51]), t[46] = R(e[55]), t[47] = R(e[60]), t[48] = R(e[21]), t[49] = R(e[34]), t[50] = R(e[37]), t[51] = R(e[47]), t[52] = R(e[50]), t[53] = R(e[56]), t[54] = R(e[59]), t[55] = R(e[61]), t[56] = R(e[35]), t[57] = R(e[36]), t[58] = R(e[48]), t[59] = R(e[49]), t[60] = R(e[57]), t[61] = R(e[58]), t[62] = R(e[62]), t[63] = R(e[63]);
		}
		function ce(e) {
			let t = .5 * Math.cos(3.14159 / 4), n = .5 * Math.cos(3.14159 / 16), r = .5 * Math.cos(3.14159 / 8), i = .5 * Math.cos(3 * 3.14159 / 16), a = .5 * Math.cos(5 * 3.14159 / 16), o = .5 * Math.cos(3 * 3.14159 / 8), s = .5 * Math.cos(7 * 3.14159 / 16);
			for (var c = [
				,
				,
				,
				,
			], l = [
				,
				,
				,
				,
			], u = [
				,
				,
				,
				,
			], d = [
				,
				,
				,
				,
			], f = 0; f < 8; ++f) {
				var p = f * 8;
				c[0] = r * e[p + 2], c[1] = o * e[p + 2], c[2] = r * e[p + 6], c[3] = o * e[p + 6], l[0] = n * e[p + 1] + i * e[p + 3] + a * e[p + 5] + s * e[p + 7], l[1] = i * e[p + 1] - s * e[p + 3] - n * e[p + 5] - a * e[p + 7], l[2] = a * e[p + 1] - n * e[p + 3] + s * e[p + 5] + i * e[p + 7], l[3] = s * e[p + 1] - a * e[p + 3] + i * e[p + 5] - n * e[p + 7], u[0] = t * (e[p + 0] + e[p + 4]), u[3] = t * (e[p + 0] - e[p + 4]), u[1] = c[0] + c[3], u[2] = c[1] - c[2], d[0] = u[0] + u[1], d[1] = u[3] + u[2], d[2] = u[3] - u[2], d[3] = u[0] - u[1], e[p + 0] = d[0] + l[0], e[p + 1] = d[1] + l[1], e[p + 2] = d[2] + l[2], e[p + 3] = d[3] + l[3], e[p + 4] = d[3] - l[3], e[p + 5] = d[2] - l[2], e[p + 6] = d[1] - l[1], e[p + 7] = d[0] - l[0];
			}
			for (var m = 0; m < 8; ++m) c[0] = r * e[16 + m], c[1] = o * e[16 + m], c[2] = r * e[48 + m], c[3] = o * e[48 + m], l[0] = n * e[8 + m] + i * e[24 + m] + a * e[40 + m] + s * e[56 + m], l[1] = i * e[8 + m] - s * e[24 + m] - n * e[40 + m] - a * e[56 + m], l[2] = a * e[8 + m] - n * e[24 + m] + s * e[40 + m] + i * e[56 + m], l[3] = s * e[8 + m] - a * e[24 + m] + i * e[40 + m] - n * e[56 + m], u[0] = t * (e[m] + e[32 + m]), u[3] = t * (e[m] - e[32 + m]), u[1] = c[0] + c[3], u[2] = c[1] - c[2], d[0] = u[0] + u[1], d[1] = u[3] + u[2], d[2] = u[3] - u[2], d[3] = u[0] - u[1], e[0 + m] = d[0] + l[0], e[8 + m] = d[1] + l[1], e[16 + m] = d[2] + l[2], e[24 + m] = d[3] + l[3], e[32 + m] = d[3] - l[3], e[40 + m] = d[2] - l[2], e[48 + m] = d[1] - l[1], e[56 + m] = d[0] - l[0];
		}
		function le(e) {
			for (var t = 0; t < 64; ++t) {
				var n = e[0][t], r = e[1][t], i = e[2][t];
				e[0][t] = n + 1.5747 * i, e[1][t] = n - .1873 * r - .4682 * i, e[2][t] = n + 1.8556 * r;
			}
		}
		function ue(e, t, n) {
			for (var r = 0; r < 64; ++r) t[n + r] = m.toHalfFloat(de(e[r]));
		}
		function de(e) {
			return e <= 1 ? Math.sign(e) * Math.abs(e) ** 2.2 : Math.sign(e) * c ** (Math.abs(e) - 1);
		}
		function fe(e) {
			return new DataView(e.array.buffer, e.offset.value, e.size);
		}
		function pe(e) {
			var t = e.viewer.buffer.slice(e.offset.value, e.offset.value + e.size), n = new Uint8Array(ie(t)), r = new Uint8Array(n.length);
			return re(n), M(n, r), new DataView(r.buffer);
		}
		function me(e) {
			var t = Pt(e.array.slice(e.offset.value, e.offset.value + e.size)), n = new Uint8Array(t.length);
			return re(t), M(t, n), new DataView(n.buffer);
		}
		function he(e) {
			for (var r = e.viewer, i = { value: e.offset.value }, a = new Uint16Array(e.width * e.scanlineBlockSize * (e.channels * e.type)), o = new Uint8Array(n), s = 0, c = Array(e.channels), u = 0; u < e.channels; u++) c[u] = {}, c[u].start = s, c[u].end = c[u].start, c[u].nx = e.width, c[u].ny = e.lines, c[u].size = e.type, s += c[u].nx * c[u].ny * c[u].size;
			var d = z(r, i), f = z(r, i);
			if (f >= n) throw "Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";
			if (d <= f) for (var u = 0; u < f - d + 1; u++) o[u + d] = Ce(r, i);
			var p = new Uint16Array(t), m = l(o, p), h = F(r, i);
			te(e.array, r, i, h, a, s);
			for (var u = 0; u < e.channels; ++u) for (var g = c[u], _ = 0; _ < c[u].size; ++_) ee(a, g.start + _, g.nx, g.size, g.ny, g.nx * g.size, m);
			ne(p, a, s);
			for (var v = 0, y = new Uint8Array(a.buffer.byteLength), b = 0; b < e.lines; b++) for (var x = 0; x < e.channels; x++) {
				var g = c[x], S = g.nx * g.size, C = new Uint8Array(a.buffer, g.end * 2, S * 2);
				y.set(C, v), v += S * 2, g.end += S;
			}
			return new DataView(y.buffer);
		}
		function ge(e) {
			var t = Pt(e.array.slice(e.offset.value, e.offset.value + e.size));
			let n = e.lines * e.channels * e.width, r = e.type == 1 ? new Uint16Array(n) : new Uint32Array(n), i = 0, a = 0, o = [
				,
				,
				,
				,
			];
			for (let n = 0; n < e.lines; n++) for (let n = 0; n < e.channels; n++) {
				let n = 0;
				switch (e.type) {
					case 1:
						o[0] = i, o[1] = o[0] + e.width, i = o[1] + e.width;
						for (let i = 0; i < e.width; ++i) {
							let e = t[o[0]++] << 8 | t[o[1]++];
							n += e, r[a] = n, a++;
						}
						break;
					case 2:
						o[0] = i, o[1] = o[0] + e.width, o[2] = o[1] + e.width, i = o[2] + e.width;
						for (let i = 0; i < e.width; ++i) {
							let e = t[o[0]++] << 24 | t[o[1]++] << 16 | t[o[2]++] << 8;
							n += e, r[a] = n, a++;
						}
						break;
				}
			}
			return new DataView(r.buffer);
		}
		function _e(e) {
			var t = e.viewer, n = { value: e.offset.value }, r = new Uint8Array(e.width * e.lines * (e.channels * e.type * 2)), i = {
				version: I(t, n),
				unknownUncompressedSize: I(t, n),
				unknownCompressedSize: I(t, n),
				acCompressedSize: I(t, n),
				dcCompressedSize: I(t, n),
				rleCompressedSize: I(t, n),
				rleUncompressedSize: I(t, n),
				rleRawSize: I(t, n),
				totalAcUncompressedCount: I(t, n),
				totalDcUncompressedCount: I(t, n),
				acCompression: I(t, n)
			};
			if (i.version < 2) throw "EXRLoader.parse: " + Re.compression + " version " + i.version + " is unsupported";
			for (var a = [], o = z(t, n) - 2; o > 0;) {
				var s = ve(t.buffer, n), c = Ce(t, n), l = c >> 2 & 3, u = (c >> 4) - 1, d = new Int8Array([u])[0], f = Ce(t, n);
				a.push({
					name: s,
					index: d,
					type: f,
					compression: l
				}), o -= s.length + 3;
			}
			for (var p = Re.channels, m = Array(e.channels), h = 0; h < e.channels; ++h) {
				var g = m[h] = {}, _ = p[h];
				g.name = _.name, g.compression = 0, g.decoded = !1, g.type = _.pixelType, g.pLinear = _.pLinear, g.width = e.width, g.height = e.lines;
			}
			for (var v = { idx: [
				,
				,
				,
			] }, y = 0; y < e.channels; ++y) for (var g = m[y], h = 0; h < a.length; ++h) {
				var b = a[h];
				g.name == b.name && (g.compression = b.compression, b.index >= 0 && (v.idx[b.index] = y), g.offset = y);
			}
			if (i.acCompressedSize > 0) switch (i.acCompression) {
				case 0:
					var x = new Uint16Array(i.totalAcUncompressedCount);
					te(e.array, t, n, i.acCompressedSize, x, i.totalAcUncompressedCount);
					break;
				case 1:
					var S = e.array.slice(n.value, n.value + i.totalAcUncompressedCount), C = Pt(S), x = new Uint16Array(C.buffer);
					n.value += i.totalAcUncompressedCount;
					break;
			}
			if (i.dcCompressedSize > 0) {
				var w = {
					array: e.array,
					offset: n,
					size: i.dcCompressedSize
				}, T = new Uint16Array(me(w).buffer);
				n.value += i.dcCompressedSize;
			}
			if (i.rleRawSize > 0) {
				var S = e.array.slice(n.value, n.value + i.rleCompressedSize), C = Pt(S), E = ie(C.buffer);
				n.value += i.rleCompressedSize;
			}
			for (var D = 0, O = Array(m.length), h = 0; h < O.length; ++h) O[h] = [];
			for (var k = 0; k < e.lines; ++k) for (var A = 0; A < m.length; ++A) O[A].push(D), D += m[A].width * e.type * 2;
			N(v, O, m, x, T, r);
			for (var h = 0; h < m.length; ++h) {
				var g = m[h];
				if (!g.decoded) switch (g.compression) {
					case 2:
						for (var ee = 0, j = 0, k = 0; k < e.lines; ++k) {
							for (var ne = O[h][ee], re = 0; re < g.width; ++re) {
								for (var M = 0; M < 2 * g.type; ++M) r[ne++] = E[j + M * g.width * g.height];
								j++;
							}
							ee++;
						}
						break;
					default: throw "EXRLoader.parse: unsupported channel compression";
				}
			}
			return new DataView(r.buffer);
		}
		function ve(e, t) {
			for (var n = new Uint8Array(e), r = 0; n[t.value + r] != 0;) r += 1;
			var i = new TextDecoder().decode(n.slice(t.value, t.value + r));
			return t.value = t.value + r + 1, i;
		}
		function ye(e, t, n) {
			var r = new TextDecoder().decode(new Uint8Array(e).slice(t.value, t.value + n));
			return t.value += n, r;
		}
		function be(e, t) {
			return [P(e, t), F(e, t)];
		}
		function xe(e, t) {
			return [F(e, t), F(e, t)];
		}
		function P(e, t) {
			var n = e.getInt32(t.value, !0);
			return t.value += 4, n;
		}
		function F(e, t) {
			var n = e.getUint32(t.value, !0);
			return t.value += 4, n;
		}
		function Se(e, t) {
			var n = e[t.value];
			return t.value += 1, n;
		}
		function Ce(e, t) {
			var n = e.getUint8(t.value);
			return t.value += 1, n;
		}
		let I = function(e, t) {
			let n;
			return n = "getBigInt64" in DataView.prototype ? Number(e.getBigInt64(t.value, !0)) : e.getUint32(t.value + 4, !0) + Number(e.getUint32(t.value, !0) << 32), t.value += 8, n;
		};
		function L(e, t) {
			var n = e.getFloat32(t.value, !0);
			return t.value += 4, n;
		}
		function we(e, t) {
			return m.toHalfFloat(L(e, t));
		}
		function R(e) {
			var t = (e & 31744) >> 10, n = e & 1023;
			return (e >> 15 ? -1 : 1) * (t ? t === 31 ? n ? NaN : Infinity : 2 ** (t - 15) * (1 + n / 1024) : n / 1024 * 6103515625e-14);
		}
		function z(e, t) {
			var n = e.getUint16(t.value, !0);
			return t.value += 2, n;
		}
		function Te(e, t) {
			return R(z(e, t));
		}
		function Ee(e, t, n, r) {
			for (var i = n.value, a = []; n.value < i + r - 1;) {
				var o = ve(t, n), s = P(e, n), c = Ce(e, n);
				n.value += 3;
				var l = P(e, n), u = P(e, n);
				a.push({
					name: o,
					pixelType: s,
					pLinear: c,
					xSampling: l,
					ySampling: u
				});
			}
			return n.value += 1, a;
		}
		function De(e, t) {
			return {
				redX: L(e, t),
				redY: L(e, t),
				greenX: L(e, t),
				greenY: L(e, t),
				blueX: L(e, t),
				blueY: L(e, t),
				whiteX: L(e, t),
				whiteY: L(e, t)
			};
		}
		function Oe(e, t) {
			return [
				"NO_COMPRESSION",
				"RLE_COMPRESSION",
				"ZIPS_COMPRESSION",
				"ZIP_COMPRESSION",
				"PIZ_COMPRESSION",
				"PXR24_COMPRESSION",
				"B44_COMPRESSION",
				"B44A_COMPRESSION",
				"DWAA_COMPRESSION",
				"DWAB_COMPRESSION"
			][Ce(e, t)];
		}
		function ke(e, t) {
			return {
				xMin: F(e, t),
				yMin: F(e, t),
				xMax: F(e, t),
				yMax: F(e, t)
			};
		}
		function Ae(e, t) {
			return ["INCREASING_Y"][Ce(e, t)];
		}
		function je(e, t) {
			return [L(e, t), L(e, t)];
		}
		function B(e, t) {
			return [
				L(e, t),
				L(e, t),
				L(e, t)
			];
		}
		function Me(e, t, n, r, i) {
			if (r === "string" || r === "stringvector" || r === "iccProfile") return ye(t, n, i);
			if (r === "chlist") return Ee(e, t, n, i);
			if (r === "chromaticities") return De(e, n);
			if (r === "compression") return Oe(e, n);
			if (r === "box2i") return ke(e, n);
			if (r === "lineOrder") return Ae(e, n);
			if (r === "float") return L(e, n);
			if (r === "v2f") return je(e, n);
			if (r === "v3f") return B(e, n);
			if (r === "int") return P(e, n);
			if (r === "rational") return be(e, n);
			if (r === "timecode") return xe(e, n);
			if (r === "preview") return n.value += i, "skipped";
			n.value += i;
		}
		function Ne(e, t, n) {
			let r = {};
			if (e.getUint32(0, !0) != 20000630) throw "THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.";
			r.version = e.getUint8(4);
			let i = e.getUint8(5);
			r.spec = {
				singleTile: !!(i & 2),
				longName: !!(i & 4),
				deepFormat: !!(i & 8),
				multiPart: !!(i & 16)
			}, n.value = 8;
			for (var a = !0; a;) {
				var o = ve(t, n);
				if (o == 0) a = !1;
				else {
					var s = ve(t, n), c = Me(e, t, n, s, F(e, n));
					c === void 0 ? console.warn(`EXRLoader.parse: skipped unknown header attribute type '${s}'.`) : r[o] = c;
				}
			}
			if (i & -5) throw console.error("EXRHeader:", r), "THREE.EXRLoader: provided file is currently unsupported.";
			return r;
		}
		function Pe(e, t, n, r, i) {
			let a = {
				size: 0,
				viewer: t,
				array: n,
				offset: r,
				width: e.dataWindow.xMax - e.dataWindow.xMin + 1,
				height: e.dataWindow.yMax - e.dataWindow.yMin + 1,
				channels: e.channels.length,
				bytesPerLine: null,
				lines: null,
				inputSize: null,
				type: e.channels[0].pixelType,
				uncompress: null,
				getter: null,
				format: null,
				[Wn ? "colorSpace" : "encoding"]: null
			};
			switch (e.compression) {
				case "NO_COMPRESSION":
					a.lines = 1, a.uncompress = fe;
					break;
				case "RLE_COMPRESSION":
					a.lines = 1, a.uncompress = pe;
					break;
				case "ZIPS_COMPRESSION":
					a.lines = 1, a.uncompress = me;
					break;
				case "ZIP_COMPRESSION":
					a.lines = 16, a.uncompress = me;
					break;
				case "PIZ_COMPRESSION":
					a.lines = 32, a.uncompress = he;
					break;
				case "PXR24_COMPRESSION":
					a.lines = 16, a.uncompress = ge;
					break;
				case "DWAA_COMPRESSION":
					a.lines = 32, a.uncompress = _e;
					break;
				case "DWAB_COMPRESSION":
					a.lines = 256, a.uncompress = _e;
					break;
				default: throw "EXRLoader.parse: " + e.compression + " is unsupported";
			}
			if (a.scanlineBlockSize = a.lines, a.type == 1) switch (i) {
				case s:
					a.getter = Te, a.inputSize = 2;
					break;
				case v:
					a.getter = z, a.inputSize = 2;
					break;
			}
			else if (a.type == 2) switch (i) {
				case s:
					a.getter = L, a.inputSize = 4;
					break;
				case v: a.getter = we, a.inputSize = 4;
			}
			else throw "EXRLoader.parse: unsupported pixelType " + a.type + " for " + e.compression + ".";
			a.blockCount = (e.dataWindow.yMax + 1) / a.scanlineBlockSize;
			for (var o = 0; o < a.blockCount; o++) I(t, r);
			a.outputChannels = a.channels == 3 ? 4 : a.channels;
			let c = a.width * a.height * a.outputChannels;
			switch (i) {
				case s:
					a.byteArray = new Float32Array(c), a.channels < a.outputChannels && a.byteArray.fill(1, 0, c);
					break;
				case v:
					a.byteArray = new Uint16Array(c), a.channels < a.outputChannels && a.byteArray.fill(15360, 0, c);
					break;
				default:
					console.error("THREE.EXRLoader: unsupported type: ", i);
					break;
			}
			return a.bytesPerLine = a.width * a.inputSize * a.channels, a.outputChannels == 4 ? a.format = D : a.format = ae, Wn ? a.colorSpace = "srgb-linear" : a.encoding = 3e3, a;
		}
		let Fe = new DataView(e), Ie = new Uint8Array(e), Le = { value: 0 }, Re = Ne(Fe, e, Le), V = Pe(Re, Fe, Ie, Le, this.type), ze = { value: 0 }, H = {
			R: 0,
			G: 1,
			B: 2,
			A: 3,
			Y: 0
		};
		for (let e = 0; e < V.height / V.scanlineBlockSize; e++) {
			let t = F(Fe, Le);
			V.size = F(Fe, Le), V.lines = t + V.scanlineBlockSize > V.height ? V.height - t : V.scanlineBlockSize;
			let n = V.size < V.lines * V.bytesPerLine ? V.uncompress(V) : fe(V);
			Le.value += V.size;
			for (let t = 0; t < V.scanlineBlockSize; t++) {
				let r = t + e * V.scanlineBlockSize;
				if (r >= V.height) break;
				for (let e = 0; e < V.channels; e++) {
					let i = H[Re.channels[e].name];
					for (let a = 0; a < V.width; a++) {
						ze.value = (t * (V.channels * V.width) + e * V.width + a) * V.inputSize;
						let o = (V.height - 1 - r) * (V.width * V.outputChannels) + a * V.outputChannels + i;
						V.byteArray[o] = V.getter(n, ze);
					}
				}
			}
		}
		return {
			header: Re,
			width: V.width,
			height: V.height,
			data: V.byteArray,
			format: V.format,
			[Wn ? "colorSpace" : "encoding"]: V[Wn ? "colorSpace" : "encoding"],
			type: this.type
		};
	}
	setDataType(e) {
		return this.type = e, this;
	}
	load(e, t, n, r) {
		function i(e, n) {
			Wn ? e.colorSpace = n.colorSpace : e.encoding = n.encoding, e.minFilter = H, e.magFilter = H, e.generateMipmaps = !1, e.flipY = !1, t && t(e, n);
		}
		return super.load(e, i, n, r);
	}
}, Kn = /* @__PURE__ */ new WeakMap(), qn = class extends R {
	constructor(e) {
		super(e), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
			position: "POSITION",
			normal: "NORMAL",
			color: "COLOR",
			uv: "TEX_COORD"
		}, this.defaultAttributeTypes = {
			position: "Float32Array",
			normal: "Float32Array",
			color: "Float32Array",
			uv: "Float32Array"
		};
	}
	setDecoderPath(e) {
		return this.decoderPath = e, this;
	}
	setDecoderConfig(e) {
		return this.decoderConfig = e, this;
	}
	setWorkerLimit(e) {
		return this.workerLimit = e, this;
	}
	load(e, t, n, r) {
		let i = new N(this.manager);
		i.setPath(this.path), i.setResponseType("arraybuffer"), i.setRequestHeader(this.requestHeader), i.setWithCredentials(this.withCredentials), i.load(e, (e) => {
			let n = {
				attributeIDs: this.defaultAttributeIDs,
				attributeTypes: this.defaultAttributeTypes,
				useUniqueIDs: !1
			};
			this.decodeGeometry(e, n).then(t).catch(r);
		}, n, r);
	}
	decodeDracoFile(e, t, n, r) {
		let i = {
			attributeIDs: n || this.defaultAttributeIDs,
			attributeTypes: r || this.defaultAttributeTypes,
			useUniqueIDs: !!n
		};
		this.decodeGeometry(e, i).then(t);
	}
	decodeGeometry(e, t) {
		for (let e in t.attributeTypes) {
			let n = t.attributeTypes[e];
			n.BYTES_PER_ELEMENT !== void 0 && (t.attributeTypes[e] = n.name);
		}
		let n = JSON.stringify(t);
		if (Kn.has(e)) {
			let t = Kn.get(e);
			if (t.key === n) return t.promise;
			if (e.byteLength === 0) throw Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.");
		}
		let r, i = this.workerNextTaskID++, a = e.byteLength, o = this._getWorker(i, a).then((n) => (r = n, new Promise((n, a) => {
			r._callbacks[i] = {
				resolve: n,
				reject: a
			}, r.postMessage({
				type: "decode",
				id: i,
				taskConfig: t,
				buffer: e
			}, [e]);
		}))).then((e) => this._createGeometry(e.geometry));
		return o.catch(() => !0).then(() => {
			r && i && this._releaseTask(r, i);
		}), Kn.set(e, {
			key: n,
			promise: o
		}), o;
	}
	_createGeometry(e) {
		let t = new j();
		e.index && t.setIndex(new u(e.index.array, 1));
		for (let n = 0; n < e.attributes.length; n++) {
			let r = e.attributes[n], i = r.name, a = r.array, o = r.itemSize;
			t.setAttribute(i, new u(a, o));
		}
		return t;
	}
	_loadLibrary(e, t) {
		let n = new N(this.manager);
		return n.setPath(this.decoderPath), n.setResponseType(t), n.setWithCredentials(this.withCredentials), new Promise((t, r) => {
			n.load(e, t, void 0, r);
		});
	}
	preload() {
		return this._initDecoder(), this;
	}
	_initDecoder() {
		if (this.decoderPending) return this.decoderPending;
		let e = typeof WebAssembly != "object" || this.decoderConfig.type === "js", t = [];
		return e ? t.push(this._loadLibrary("draco_decoder.js", "text")) : (t.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), t.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(t).then((t) => {
			let n = t[0];
			e || (this.decoderConfig.wasmBinary = t[1]);
			let r = Jn.toString(), i = [
				"/* draco decoder */",
				n,
				"",
				"/* worker */",
				r.substring(r.indexOf("{") + 1, r.lastIndexOf("}"))
			].join("\n");
			this.workerSourceURL = URL.createObjectURL(new Blob([i]));
		}), this.decoderPending;
	}
	_getWorker(e, t) {
		return this._initDecoder().then(() => {
			if (this.workerPool.length < this.workerLimit) {
				let e = new Worker(this.workerSourceURL);
				e._callbacks = {}, e._taskCosts = {}, e._taskLoad = 0, e.postMessage({
					type: "init",
					decoderConfig: this.decoderConfig
				}), e.onmessage = function(t) {
					let n = t.data;
					switch (n.type) {
						case "decode":
							e._callbacks[n.id].resolve(n);
							break;
						case "error":
							e._callbacks[n.id].reject(n);
							break;
						default: console.error("THREE.DRACOLoader: Unexpected message, \"" + n.type + "\"");
					}
				}, this.workerPool.push(e);
			} else this.workerPool.sort(function(e, t) {
				return e._taskLoad > t._taskLoad ? -1 : 1;
			});
			let n = this.workerPool[this.workerPool.length - 1];
			return n._taskCosts[e] = t, n._taskLoad += t, n;
		});
	}
	_releaseTask(e, t) {
		e._taskLoad -= e._taskCosts[t], delete e._callbacks[t], delete e._taskCosts[t];
	}
	debug() {
		console.log("Task load: ", this.workerPool.map((e) => e._taskLoad));
	}
	dispose() {
		for (let e = 0; e < this.workerPool.length; ++e) this.workerPool[e].terminate();
		return this.workerPool.length = 0, this;
	}
};
function Jn() {
	let e, t;
	onmessage = function(r) {
		let i = r.data;
		switch (i.type) {
			case "init":
				e = i.decoderConfig, t = new Promise(function(t) {
					e.onModuleLoaded = function(e) {
						t({ draco: e });
					}, DracoDecoderModule(e);
				});
				break;
			case "decode":
				let r = i.buffer, a = i.taskConfig;
				t.then((e) => {
					let t = e.draco, o = new t.Decoder(), s = new t.DecoderBuffer();
					s.Init(new Int8Array(r), r.byteLength);
					try {
						let e = n(t, o, s, a), r = e.attributes.map((e) => e.array.buffer);
						e.index && r.push(e.index.array.buffer), self.postMessage({
							type: "decode",
							id: i.id,
							geometry: e
						}, r);
					} catch (e) {
						console.error(e), self.postMessage({
							type: "error",
							id: i.id,
							error: e.message
						});
					} finally {
						t.destroy(s), t.destroy(o);
					}
				});
				break;
		}
	};
	function n(e, t, n, a) {
		let o = a.attributeIDs, s = a.attributeTypes, c, l, u = t.GetEncodedGeometryType(n);
		if (u === e.TRIANGULAR_MESH) c = new e.Mesh(), l = t.DecodeBufferToMesh(n, c);
		else if (u === e.POINT_CLOUD) c = new e.PointCloud(), l = t.DecodeBufferToPointCloud(n, c);
		else throw Error("THREE.DRACOLoader: Unexpected geometry type.");
		if (!l.ok() || c.ptr === 0) throw Error("THREE.DRACOLoader: Decoding failed: " + l.error_msg());
		let d = {
			index: null,
			attributes: []
		};
		for (let n in o) {
			let r = self[s[n]], l, u;
			if (a.useUniqueIDs) u = o[n], l = t.GetAttributeByUniqueId(c, u);
			else {
				if (u = t.GetAttributeId(c, e[o[n]]), u === -1) continue;
				l = t.GetAttribute(c, u);
			}
			d.attributes.push(i(e, t, c, n, r, l));
		}
		return u === e.TRIANGULAR_MESH && (d.index = r(e, t, c)), e.destroy(c), d;
	}
	function r(e, t, n) {
		let r = n.num_faces() * 3, i = r * 4, a = e._malloc(i);
		t.GetTrianglesUInt32Array(n, i, a);
		let o = new Uint32Array(e.HEAPF32.buffer, a, r).slice();
		return e._free(a), {
			array: o,
			itemSize: 1
		};
	}
	function i(e, t, n, r, i, o) {
		let s = o.num_components(), c = n.num_points() * s, l = c * i.BYTES_PER_ELEMENT, u = a(e, i), d = e._malloc(l);
		t.GetAttributeDataArrayForAllPoints(n, o, u, l, d);
		let f = new i(e.HEAPF32.buffer, d, c).slice();
		return e._free(d), {
			name: r,
			array: f,
			itemSize: s
		};
	}
	function a(e, t) {
		switch (t) {
			case Float32Array: return e.DT_FLOAT32;
			case Int8Array: return e.DT_INT8;
			case Int16Array: return e.DT_INT16;
			case Int32Array: return e.DT_INT32;
			case Uint8Array: return e.DT_UINT8;
			case Uint16Array: return e.DT_UINT16;
			case Uint32Array: return e.DT_UINT32;
		}
	}
}
//#endregion
//#region node_modules/three-stdlib/libs/MeshoptDecoder.js
var Yn, Xn = () => {
	if (Yn) return Yn;
	let e = new Uint8Array([
		0,
		97,
		115,
		109,
		1,
		0,
		0,
		0,
		1,
		4,
		1,
		96,
		0,
		0,
		3,
		3,
		2,
		0,
		0,
		5,
		3,
		1,
		0,
		1,
		12,
		1,
		0,
		10,
		22,
		2,
		12,
		0,
		65,
		0,
		65,
		0,
		65,
		0,
		252,
		10,
		0,
		0,
		11,
		7,
		0,
		65,
		0,
		253,
		15,
		26,
		11
	]), t = new Uint8Array([
		32,
		0,
		65,
		253,
		3,
		1,
		2,
		34,
		4,
		106,
		6,
		5,
		11,
		8,
		7,
		20,
		13,
		33,
		12,
		16,
		128,
		9,
		116,
		64,
		19,
		113,
		127,
		15,
		10,
		21,
		22,
		14,
		255,
		66,
		24,
		54,
		136,
		107,
		18,
		23,
		192,
		26,
		114,
		118,
		132,
		17,
		77,
		101,
		130,
		144,
		27,
		87,
		131,
		44,
		45,
		74,
		156,
		154,
		70,
		167
	]);
	if (typeof WebAssembly != "object") return { supported: !1 };
	let n = "B9h9z9tFBBBF8fL9gBB9gLaaaaaFa9gEaaaB9gFaFa9gEaaaFaEMcBFFFGGGEIIILF9wFFFLEFBFKNFaFCx/IFMO/LFVK9tv9t9vq95GBt9f9f939h9z9t9f9j9h9s9s9f9jW9vq9zBBp9tv9z9o9v9wW9f9kv9j9v9kv9WvqWv94h919m9mvqBF8Z9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv94h919m9mvqBGy9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv949TvZ91v9u9jvBEn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9P9jWBIi9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9R919hWBLn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9F949wBKI9z9iqlBOc+x8ycGBM/qQFTa8jUUUUBCU/EBlHL8kUUUUBC9+RKGXAGCFJAI9LQBCaRKAE2BBC+gF9HQBALAEAIJHOAGlAGTkUUUBRNCUoBAG9uC/wgBZHKCUGAKCUG9JyRVAECFJRICBRcGXEXAcAF9PQFAVAFAclAcAVJAF9JyRMGXGXAG9FQBAMCbJHKC9wZRSAKCIrCEJCGrRQANCUGJRfCBRbAIRTEXGXAOATlAQ9PQBCBRISEMATAQJRIGXAS9FQBCBRtCBREEXGXAOAIlCi9PQBCBRISLMANCU/CBJAEJRKGXGXGXGXGXATAECKrJ2BBAtCKZrCEZfIBFGEBMAKhB83EBAKCNJhB83EBSEMAKAI2BIAI2BBHmCKrHYAYCE6HYy86BBAKCFJAICIJAYJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCGJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCEJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCIJAYAmJHY2BBAI2BFHmCKrHPAPCE6HPy86BBAKCLJAYAPJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCKJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCOJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCNJAYAmJHY2BBAI2BGHmCKrHPAPCE6HPy86BBAKCVJAYAPJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCcJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCMJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCSJAYAmJHm2BBAI2BEHICKrHYAYCE6HYy86BBAKCQJAmAYJHm2BBAICIrCEZHYAYCE6HYy86BBAKCfJAmAYJHm2BBAICGrCEZHYAYCE6HYy86BBAKCbJAmAYJHK2BBAICEZHIAICE6HIy86BBAKAIJRISGMAKAI2BNAI2BBHmCIrHYAYCb6HYy86BBAKCFJAICNJAYJHY2BBAmCbZHmAmCb6Hmy86BBAKCGJAYAmJHm2BBAI2BFHYCIrHPAPCb6HPy86BBAKCEJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCIJAmAYJHm2BBAI2BGHYCIrHPAPCb6HPy86BBAKCLJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCKJAmAYJHm2BBAI2BEHYCIrHPAPCb6HPy86BBAKCOJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCNJAmAYJHm2BBAI2BIHYCIrHPAPCb6HPy86BBAKCVJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCcJAmAYJHm2BBAI2BLHYCIrHPAPCb6HPy86BBAKCMJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCSJAmAYJHm2BBAI2BKHYCIrHPAPCb6HPy86BBAKCQJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCfJAmAYJHm2BBAI2BOHICIrHYAYCb6HYy86BBAKCbJAmAYJHK2BBAICbZHIAICb6HIy86BBAKAIJRISFMAKAI8pBB83BBAKCNJAICNJ8pBB83BBAICTJRIMAtCGJRtAECTJHEAS9JQBMMGXAIQBCBRISEMGXAM9FQBANAbJ2BBRtCBRKAfREEXAEANCU/CBJAKJ2BBHTCFrCBATCFZl9zAtJHt86BBAEAGJREAKCFJHKAM9HQBMMAfCFJRfAIRTAbCFJHbAG9HQBMMABAcAG9sJANCUGJAMAG9sTkUUUBpANANCUGJAMCaJAG9sJAGTkUUUBpMAMCBAIyAcJRcAIQBMC9+RKSFMCBC99AOAIlAGCAAGCA9Ly6yRKMALCU/EBJ8kUUUUBAKM+OmFTa8jUUUUBCoFlHL8kUUUUBC9+RKGXAFCE9uHOCtJAI9LQBCaRKAE2BBHNC/wFZC/gF9HQBANCbZHVCF9LQBALCoBJCgFCUFT+JUUUBpALC84Jha83EBALC8wJha83EBALC8oJha83EBALCAJha83EBALCiJha83EBALCTJha83EBALha83ENALha83EBAEAIJC9wJRcAECFJHNAOJRMGXAF9FQBCQCbAVCF6yRSABRECBRVCBRQCBRfCBRICBRKEXGXAMAcuQBC9+RKSEMGXGXAN2BBHOC/vF9LQBALCoBJAOCIrCa9zAKJCbZCEWJHb8oGIRTAb8oGBRtGXAOCbZHbAS9PQBALAOCa9zAIJCbZCGWJ8oGBAVAbyROAb9FRbGXGXAGCG9HQBABAt87FBABCIJAO87FBABCGJAT87FBSFMAEAtjGBAECNJAOjGBAECIJATjGBMAVAbJRVALCoBJAKCEWJHmAOjGBAmATjGIALAICGWJAOjGBALCoBJAKCFJCbZHKCEWJHTAtjGBATAOjGIAIAbJRIAKCFJRKSGMGXGXAbCb6QBAQAbJAbC989zJCFJRQSFMAM1BBHbCgFZROGXGXAbCa9MQBAMCFJRMSFMAM1BFHbCgBZCOWAOCgBZqROGXAbCa9MQBAMCGJRMSFMAM1BGHbCgBZCfWAOqROGXAbCa9MQBAMCEJRMSFMAM1BEHbCgBZCdWAOqROGXAbCa9MQBAMCIJRMSFMAM2BIC8cWAOqROAMCLJRMMAOCFrCBAOCFZl9zAQJRQMGXGXAGCG9HQBABAt87FBABCIJAQ87FBABCGJAT87FBSFMAEAtjGBAECNJAQjGBAECIJATjGBMALCoBJAKCEWJHOAQjGBAOATjGIALAICGWJAQjGBALCoBJAKCFJCbZHKCEWJHOAtjGBAOAQjGIAICFJRIAKCFJRKSFMGXAOCDF9LQBALAIAcAOCbZJ2BBHbCIrHTlCbZCGWJ8oGBAVCFJHtATyROALAIAblCbZCGWJ8oGBAtAT9FHmJHtAbCbZHTyRbAT9FRTGXGXAGCG9HQBABAV87FBABCIJAb87FBABCGJAO87FBSFMAEAVjGBAECNJAbjGBAECIJAOjGBMALAICGWJAVjGBALCoBJAKCEWJHYAOjGBAYAVjGIALAICFJHICbZCGWJAOjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAIAmJCbZHICGWJAbjGBALCoBJAKCGJCbZHKCEWJHOAVjGBAOAbjGIAKCFJRKAIATJRIAtATJRVSFMAVCBAM2BBHYyHTAOC/+F6HPJROAYCbZRtGXGXAYCIrHmQBAOCFJRbSFMAORbALAIAmlCbZCGWJ8oGBROMGXGXAtQBAbCFJRVSFMAbRVALAIAYlCbZCGWJ8oGBRbMGXGXAP9FQBAMCFJRYSFMAM1BFHYCgFZRTGXGXAYCa9MQBAMCGJRYSFMAM1BGHYCgBZCOWATCgBZqRTGXAYCa9MQBAMCEJRYSFMAM1BEHYCgBZCfWATqRTGXAYCa9MQBAMCIJRYSFMAM1BIHYCgBZCdWATqRTGXAYCa9MQBAMCLJRYSFMAMCKJRYAM2BLC8cWATqRTMATCFrCBATCFZl9zAQJHQRTMGXGXAmCb6QBAYRPSFMAY1BBHMCgFZROGXGXAMCa9MQBAYCFJRPSFMAY1BFHMCgBZCOWAOCgBZqROGXAMCa9MQBAYCGJRPSFMAY1BGHMCgBZCfWAOqROGXAMCa9MQBAYCEJRPSFMAY1BEHMCgBZCdWAOqROGXAMCa9MQBAYCIJRPSFMAYCLJRPAY2BIC8cWAOqROMAOCFrCBAOCFZl9zAQJHQROMGXGXAtCb6QBAPRMSFMAP1BBHMCgFZRbGXGXAMCa9MQBAPCFJRMSFMAP1BFHMCgBZCOWAbCgBZqRbGXAMCa9MQBAPCGJRMSFMAP1BGHMCgBZCfWAbqRbGXAMCa9MQBAPCEJRMSFMAP1BEHMCgBZCdWAbqRbGXAMCa9MQBAPCIJRMSFMAPCLJRMAP2BIC8cWAbqRbMAbCFrCBAbCFZl9zAQJHQRbMGXGXAGCG9HQBABAT87FBABCIJAb87FBABCGJAO87FBSFMAEATjGBAECNJAbjGBAECIJAOjGBMALCoBJAKCEWJHYAOjGBAYATjGIALAICGWJATjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAICFJHICbZCGWJAOjGBALCoBJAKCGJCbZCEWJHOATjGBAOAbjGIALAIAm9FAmCb6qJHICbZCGWJAbjGBAIAt9FAtCb6qJRIAKCEJRKMANCFJRNABCKJRBAECSJREAKCbZRKAICbZRIAfCEJHfAF9JQBMMCBC99AMAc6yRKMALCoFJ8kUUUUBAKM/tIFGa8jUUUUBCTlRLC9+RKGXAFCLJAI9LQBCaRKAE2BBC/+FZC/QF9HQBALhB83ENAECFJRKAEAIJC98JREGXAF9FQBGXAGCG6QBEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMALCNJAICFZCGWqHGAICGrCBAICFrCFZl9zAG8oGBJHIjGBABAIjGBABCIJRBAFCaJHFQBSGMMEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMABAICGrCBAICFrCFZl9zALCNJAICFZCGWqHI8oGBJHG87FBAIAGjGBABCGJRBAFCaJHFQBMMCBC99AKAE6yRKMAKM+lLKFaF99GaG99FaG99GXGXAGCI9HQBAF9FQFEXGXGX9DBBB8/9DBBB+/ABCGJHG1BB+yAB1BBHE+yHI+L+TABCFJHL1BBHK+yHO+L+THN9DBBBB9gHVyAN9DBB/+hANAN+U9DBBBBANAVyHcAc+MHMAECa3yAI+SHIAI+UAcAMAKCa3yAO+SHcAc+U+S+S+R+VHO+U+SHN+L9DBBB9P9d9FQBAN+oRESFMCUUUU94REMAGAE86BBGXGX9DBBB8/9DBBB+/Ac9DBBBB9gyAcAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMALAG86BBGXGX9DBBB8/9DBBB+/AI9DBBBB9gyAIAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMABAG86BBABCIJRBAFCaJHFQBSGMMAF9FQBEXGXGX9DBBB8/9DBBB+/ABCIJHG8uFB+yAB8uFBHE+yHI+L+TABCGJHL8uFBHK+yHO+L+THN9DBBBB9gHVyAN9DB/+g6ANAN+U9DBBBBANAVyHcAc+MHMAECa3yAI+SHIAI+UAcAMAKCa3yAO+SHcAc+U+S+S+R+VHO+U+SHN+L9DBBB9P9d9FQBAN+oRESFMCUUUU94REMAGAE87FBGXGX9DBBB8/9DBBB+/Ac9DBBBB9gyAcAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMALAG87FBGXGX9DBBB8/9DBBB+/AI9DBBBB9gyAIAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMABAG87FBABCNJRBAFCaJHFQBMMM/SEIEaE99EaF99GXAF9FQBCBREABRIEXGXGX9D/zI818/AICKJ8uFBHLCEq+y+VHKAI8uFB+y+UHO9DB/+g6+U9DBBB8/9DBBB+/AO9DBBBB9gy+SHN+L9DBBB9P9d9FQBAN+oRVSFMCUUUU94RVMAICIJ8uFBRcAICGJ8uFBRMABALCFJCEZAEqCFWJAV87FBGXGXAKAM+y+UHN9DB/+g6+U9DBBB8/9DBBB+/AN9DBBBB9gy+SHS+L9DBBB9P9d9FQBAS+oRMSFMCUUUU94RMMABALCGJCEZAEqCFWJAM87FBGXGXAKAc+y+UHK9DB/+g6+U9DBBB8/9DBBB+/AK9DBBBB9gy+SHS+L9DBBB9P9d9FQBAS+oRcSFMCUUUU94RcMABALCaJCEZAEqCFWJAc87FBGXGX9DBBU8/AOAO+U+TANAN+U+TAKAK+U+THO9DBBBBAO9DBBBB9gy+R9DB/+g6+U9DBBB8/+SHO+L9DBBB9P9d9FQBAO+oRcSFMCUUUU94RcMABALCEZAEqCFWJAc87FBAICNJRIAECIJREAFCaJHFQBMMM9JBGXAGCGrAF9sHF9FQBEXABAB8oGBHGCNWCN91+yAGCi91CnWCUUU/8EJ+++U84GBABCIJRBAFCaJHFQBMMM9TFEaCBCB8oGUkUUBHFABCEJC98ZJHBjGUkUUBGXGXAB8/BCTWHGuQBCaREABAGlCggEJCTrXBCa6QFMAFREMAEM/lFFFaGXGXAFABqCEZ9FQBABRESFMGXGXAGCT9PQBABRESFMABREEXAEAF8oGBjGBAECIJAFCIJ8oGBjGBAECNJAFCNJ8oGBjGBAECSJAFCSJ8oGBjGBAECTJREAFCTJRFAGC9wJHGCb9LQBMMAGCI9JQBEXAEAF8oGBjGBAFCIJRFAECIJREAGC98JHGCE9LQBMMGXAG9FQBEXAEAF2BB86BBAECFJREAFCFJRFAGCaJHGQBMMABMoFFGaGXGXABCEZ9FQBABRESFMAFCgFZC+BwsN9sRIGXGXAGCT9PQBABRESFMABREEXAEAIjGBAECSJAIjGBAECNJAIjGBAECIJAIjGBAECTJREAGC9wJHGCb9LQBMMAGCI9JQBEXAEAIjGBAECIJREAGC98JHGCE9LQBMMGXAG9FQBEXAEAF86BBAECFJREAGCaJHGQBMMABMMMFBCUNMIT9kBB";
	WebAssembly.validate(e) && (n = "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");
	let r, i = WebAssembly.instantiate(a(n), {}).then((e) => {
		r = e.instance, r.exports.__wasm_call_ctors();
	});
	function a(e) {
		let n = new Uint8Array(e.length);
		for (let t = 0; t < e.length; ++t) {
			let r = e.charCodeAt(t);
			n[t] = r > 96 ? r - 71 : r > 64 ? r - 65 : r > 47 ? r + 4 : r > 46 ? 63 : 62;
		}
		let r = 0;
		for (let i = 0; i < e.length; ++i) n[r++] = n[i] < 60 ? t[n[i]] : (n[i] - 60) * 64 + n[++i];
		return n.buffer.slice(0, r);
	}
	function o(e, t, n, i, a, o) {
		let s = r.exports.sbrk, c = n + 3 & -4, l = s(c * i), u = s(a.length), d = new Uint8Array(r.exports.memory.buffer);
		d.set(a, u);
		let f = e(l, n, i, u, a.length);
		if (f === 0 && o && o(l, c, i), t.set(d.subarray(l, l + n * i)), s(l - s(0)), f !== 0) throw Error(`Malformed buffer data: ${f}`);
	}
	let s = {
		0: "",
		1: "meshopt_decodeFilterOct",
		2: "meshopt_decodeFilterQuat",
		3: "meshopt_decodeFilterExp",
		NONE: "",
		OCTAHEDRAL: "meshopt_decodeFilterOct",
		QUATERNION: "meshopt_decodeFilterQuat",
		EXPONENTIAL: "meshopt_decodeFilterExp"
	}, c = {
		0: "meshopt_decodeVertexBuffer",
		1: "meshopt_decodeIndexBuffer",
		2: "meshopt_decodeIndexSequence",
		ATTRIBUTES: "meshopt_decodeVertexBuffer",
		TRIANGLES: "meshopt_decodeIndexBuffer",
		INDICES: "meshopt_decodeIndexSequence"
	};
	return Yn = {
		ready: i,
		supported: !0,
		decodeVertexBuffer(e, t, n, i, a) {
			o(r.exports.meshopt_decodeVertexBuffer, e, t, n, i, r.exports[s[a]]);
		},
		decodeIndexBuffer(e, t, n, i) {
			o(r.exports.meshopt_decodeIndexBuffer, e, t, n, i);
		},
		decodeIndexSequence(e, t, n, i) {
			o(r.exports.meshopt_decodeIndexSequence, e, t, n, i);
		},
		decodeGltfBuffer(e, t, n, i, a, l) {
			o(r.exports[c[a]], e, t, n, i, r.exports[s[l]]);
		}
	}, Yn;
}, J = /* @__PURE__ */ t(n()), Zn = null, Qn = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";
function $n(e = !0, t = !0, n) {
	return (r) => {
		n && n(r), e && (Zn ||= new qn(), Zn.setDecoderPath(typeof e == "string" ? e : Qn), r.setDRACOLoader(Zn)), t && r.setMeshoptDecoder(typeof Xn == "function" ? Xn() : Xn);
	};
}
var er = (e, t, n, r) => Oe(Ut, e, $n(t, n, r));
er.preload = (e, t, n, r) => Oe.preload(Ut, e, $n(t, n, r)), er.clear = (e) => Oe.clear(Ut, e), er.setDecoderPath = (e) => {
	Qn = e;
};
//#endregion
//#region node_modules/@react-three/drei/core/Fbo.js
function tr(e, t, n) {
	let r = P((e) => e.size), i = P((e) => e.viewport), a = typeof e == "number" ? e : r.width * i.dpr, o = typeof t == "number" ? t : r.height * i.dpr, c = (typeof e == "number" ? n : e) || {}, { samples: l = 0, depth: u, ...d } = c, f = u ?? c.depthBuffer, p = J.useMemo(() => {
		let e = new We(a, o, {
			minFilter: H,
			magFilter: H,
			type: v,
			...d
		});
		return f && (e.depthTexture = new b(a, o, s)), e.samples = l, e;
	}, []);
	return J.useLayoutEffect(() => {
		p.setSize(a, o), l && (p.samples = l);
	}, [
		l,
		p,
		a,
		o
	]), J.useEffect(() => () => p.dispose(), []), p;
}
//#endregion
//#region node_modules/@react-three/drei/core/PerspectiveCamera.js
var nr = (e) => typeof e == "function", rr = /* @__PURE__ */ J.forwardRef(({ envMap: e, resolution: t = 256, frames: n = Infinity, makeDefault: r, children: i, ...a }, o) => {
	let s = P(({ set: e }) => e), c = P(({ camera: e }) => e), l = P(({ size: e }) => e), u = J.useRef(null);
	J.useImperativeHandle(o, () => u.current, []);
	let d = J.useRef(null), f = tr(t);
	J.useLayoutEffect(() => {
		a.manual || (u.current.aspect = l.width / l.height);
	}, [l, a]), J.useLayoutEffect(() => {
		u.current.updateProjectionMatrix();
	});
	let p = 0, m = null, h = nr(i);
	return Be((t) => {
		h && (n === Infinity || p < n) && (d.current.visible = !1, t.gl.setRenderTarget(f), m = t.scene.background, e && (t.scene.background = e), t.gl.render(t.scene, u.current), t.scene.background = m, t.gl.setRenderTarget(null), d.current.visible = !0, p++);
	}), J.useLayoutEffect(() => {
		if (r) {
			let e = c;
			return s(() => ({ camera: u.current })), () => s(() => ({ camera: e }));
		}
	}, [
		u,
		r,
		s
	]), /*#__PURE__*/ J.createElement(J.Fragment, null, /*#__PURE__*/ J.createElement("perspectiveCamera", Re({ ref: u }, a), !h && i), /*#__PURE__*/ J.createElement("group", { ref: d }, h && i(f.texture)));
}), ir = (e, t, n) => {
	let r;
	switch (e) {
		case xe:
			r = new Uint8ClampedArray(t * n * 4);
			break;
		case v:
			r = new Uint16Array(t * n * 4);
			break;
		case ie:
			r = new Uint32Array(t * n * 4);
			break;
		case Ne:
			r = new Int8Array(t * n * 4);
			break;
		case de:
			r = new Int16Array(t * n * 4);
			break;
		case ve:
			r = new Int32Array(t * n * 4);
			break;
		case s:
			r = new Float32Array(t * n * 4);
			break;
		default: throw Error("Unsupported data type");
	}
	return r;
}, ar, or = (e, t, n, r) => {
	if (ar !== void 0) return ar;
	let i = new We(1, 1, r);
	t.setRenderTarget(i);
	let a = new F(new o(), new Qe({ color: 16777215 }));
	t.render(a, n), t.setRenderTarget(null);
	let s = ir(e, i.width, i.height);
	return t.readRenderTargetPixels(i, 0, 0, i.width, i.height, s), i.dispose(), a.geometry.dispose(), a.material.dispose(), ar = s[0] !== 0, ar;
}, sr = class e {
	_renderer;
	_rendererIsDisposable = !1;
	_material;
	_scene;
	_camera;
	_quad;
	_renderTarget;
	_width;
	_height;
	_type;
	_colorSpace;
	_supportsReadPixels = !0;
	constructor(t) {
		this._width = t.width, this._height = t.height, this._type = t.type, this._colorSpace = t.colorSpace;
		let n = {
			format: D,
			depthBuffer: !1,
			stencilBuffer: !1,
			type: this._type,
			colorSpace: this._colorSpace,
			anisotropy: t.renderTargetOptions?.anisotropy === void 0 ? 1 : t.renderTargetOptions?.anisotropy,
			generateMipmaps: t.renderTargetOptions?.generateMipmaps !== void 0 && t.renderTargetOptions?.generateMipmaps,
			magFilter: t.renderTargetOptions?.magFilter === void 0 ? H : t.renderTargetOptions?.magFilter,
			minFilter: t.renderTargetOptions?.minFilter === void 0 ? H : t.renderTargetOptions?.minFilter,
			samples: t.renderTargetOptions?.samples === void 0 ? void 0 : t.renderTargetOptions?.samples,
			wrapS: t.renderTargetOptions?.wrapS === void 0 ? a : t.renderTargetOptions?.wrapS,
			wrapT: t.renderTargetOptions?.wrapT === void 0 ? a : t.renderTargetOptions?.wrapT
		};
		if (this._material = t.material, t.renderer ? this._renderer = t.renderer : (this._renderer = e.instantiateRenderer(), this._rendererIsDisposable = !0), this._scene = new pe(), this._camera = new te(), this._camera.position.set(0, 0, 10), this._camera.left = -.5, this._camera.right = .5, this._camera.top = .5, this._camera.bottom = -.5, this._camera.updateProjectionMatrix(), !or(this._type, this._renderer, this._camera, n)) {
			let e;
			switch (this._type) {
				case v:
					e = this._renderer.extensions.has("EXT_color_buffer_float") ? s : void 0;
					break;
			}
			e === void 0 ? (this._supportsReadPixels = !1, console.warn("This browser dos not support toArray or toDataTexture, calls to those methods will result in an error thrown")) : (console.warn(`This browser does not support reading pixels from ${this._type} RenderTargets, switching to ${s}`), this._type = e);
		}
		this._quad = new F(new o(), this._material), this._quad.geometry.computeBoundingBox(), this._scene.add(this._quad), this._renderTarget = new We(this.width, this.height, n), this._renderTarget.texture.mapping = t.renderTargetOptions?.mapping === void 0 ? 300 : t.renderTargetOptions?.mapping;
	}
	static instantiateRenderer() {
		let e = new oe();
		return e.setSize(128, 128), e;
	}
	render = () => {
		this._renderer.setRenderTarget(this._renderTarget);
		try {
			this._renderer.render(this._scene, this._camera);
		} catch (e) {
			throw this._renderer.setRenderTarget(null), e;
		}
		this._renderer.setRenderTarget(null);
	};
	toArray() {
		if (!this._supportsReadPixels) throw Error("Can't read pixels in this browser");
		let e = ir(this._type, this._width, this._height);
		return this._renderer.readRenderTargetPixels(this._renderTarget, 0, 0, this._width, this._height, e), e;
	}
	toDataTexture(e) {
		let t = new A(this.toArray(), this.width, this.height, D, this._type, e?.mapping || 300, e?.wrapS || 1001, e?.wrapT || 1001, e?.magFilter || 1006, e?.minFilter || 1006, e?.anisotropy || 1, Ze);
		return t.generateMipmaps = e?.generateMipmaps !== void 0 && e?.generateMipmaps, t;
	}
	disposeOnDemandRenderer() {
		this._renderer.setRenderTarget(null), this._rendererIsDisposable && (this._renderer.dispose(), this._renderer.forceContextLoss());
	}
	dispose(e) {
		this.disposeOnDemandRenderer(), e && this.renderTarget.dispose(), this.material instanceof y && Object.values(this.material.uniforms).forEach((e) => {
			e.value instanceof C && e.value.dispose();
		}), Object.values(this.material).forEach((e) => {
			e instanceof C && e.dispose();
		}), this.material.dispose(), this._quad.geometry.dispose();
	}
	get width() {
		return this._width;
	}
	set width(e) {
		this._width = e, this._renderTarget.setSize(this._width, this._height);
	}
	get height() {
		return this._height;
	}
	set height(e) {
		this._height = e, this._renderTarget.setSize(this._width, this._height);
	}
	get renderer() {
		return this._renderer;
	}
	get renderTarget() {
		return this._renderTarget;
	}
	set renderTarget(e) {
		this._renderTarget = e, this._width = e.width, this._height = e.height;
	}
	get material() {
		return this._material;
	}
	get type() {
		return this._type;
	}
	get colorSpace() {
		return this._colorSpace;
	}
}, cr = class extends Error {}, lr = class extends Error {}, ur = (e, t, n) => {
	let r = RegExp(`${t}="([^"]*)"`, "i").exec(e);
	if (r) return r[1];
	let i = RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`, "i").exec(e);
	if (i) {
		let e = i[1].match(/<rdf:li>([^<]*)<\/rdf:li>/g);
		return e && e.length === 3 ? e.map((e) => e.replace(/<\/?rdf:li>/g, "")) : i[1].trim();
	}
	if (n !== void 0) return n;
	throw Error(`Can't find ${t} in gainmap metadata`);
}, dr = (e) => {
	let t;
	t = typeof TextDecoder < "u" ? new TextDecoder().decode(e) : e.toString();
	let n = t.indexOf("<x:xmpmeta");
	for (; n !== -1;) {
		let e = t.indexOf("x:xmpmeta>", n), r = t.slice(n, e + 10);
		try {
			let e = ur(r, "hdrgm:GainMapMin", "0"), t = ur(r, "hdrgm:GainMapMax"), n = ur(r, "hdrgm:Gamma", "1"), i = ur(r, "hdrgm:OffsetSDR", "0.015625"), a = ur(r, "hdrgm:OffsetHDR", "0.015625"), o = /hdrgm:HDRCapacityMin="([^"]*)"/.exec(r), s = o ? o[1] : "0", c = /hdrgm:HDRCapacityMax="([^"]*)"/.exec(r);
			if (!c) throw Error("Incomplete gainmap metadata");
			let l = c[1];
			return {
				gainMapMin: Array.isArray(e) ? e.map((e) => parseFloat(e)) : [
					parseFloat(e),
					parseFloat(e),
					parseFloat(e)
				],
				gainMapMax: Array.isArray(t) ? t.map((e) => parseFloat(e)) : [
					parseFloat(t),
					parseFloat(t),
					parseFloat(t)
				],
				gamma: Array.isArray(n) ? n.map((e) => parseFloat(e)) : [
					parseFloat(n),
					parseFloat(n),
					parseFloat(n)
				],
				offsetSdr: Array.isArray(i) ? i.map((e) => parseFloat(e)) : [
					parseFloat(i),
					parseFloat(i),
					parseFloat(i)
				],
				offsetHdr: Array.isArray(a) ? a.map((e) => parseFloat(e)) : [
					parseFloat(a),
					parseFloat(a),
					parseFloat(a)
				],
				hdrCapacityMin: parseFloat(s),
				hdrCapacityMax: parseFloat(l)
			};
		} catch {}
		n = t.indexOf("<x:xmpmeta", e);
	}
}, fr = class {
	options;
	constructor(e) {
		this.options = {
			debug: e && e.debug !== void 0 ? e.debug : !1,
			extractFII: e && e.extractFII !== void 0 ? e.extractFII : !0,
			extractNonFII: e && e.extractNonFII !== void 0 ? e.extractNonFII : !0
		};
	}
	extract(e) {
		return new Promise((t, n) => {
			let r = this.options.debug, i = new DataView(e.buffer);
			if (i.getUint16(0) !== 65496) {
				n(/* @__PURE__ */ Error("Not a valid jpeg"));
				return;
			}
			let a = i.byteLength, o = 2, s = 0, c;
			for (; o < a;) {
				if (++s > 250) {
					n(/* @__PURE__ */ Error(`Found no marker after ${s} loops 😵`));
					return;
				}
				if (i.getUint8(o) !== 255) {
					n(/* @__PURE__ */ Error(`Not a valid marker at offset 0x${o.toString(16)}, found: 0x${i.getUint8(o).toString(16)}`));
					return;
				}
				if (c = i.getUint8(o + 1), r && console.log(`Marker: ${c.toString(16)}`), c === 226) {
					r && console.log("Found APP2 marker (0xffe2)");
					let e = o + 4;
					if (i.getUint32(e) === 1297106432) {
						let r = e + 4, a;
						if (i.getUint16(r) === 18761) a = !1;
						else if (i.getUint16(r) === 19789) a = !0;
						else {
							n(/* @__PURE__ */ Error("No valid endianness marker found in TIFF header"));
							return;
						}
						if (i.getUint16(r + 2, !a) !== 42) {
							n(/* @__PURE__ */ Error("Not valid TIFF data! (no 0x002A marker)"));
							return;
						}
						let o = i.getUint32(r + 4, !a);
						if (o < 8) {
							n(/* @__PURE__ */ Error("Not valid TIFF data! (First offset less than 8)"));
							return;
						}
						let s = r + o, c = i.getUint16(s, !a), l = s + 2, u = 0;
						for (let e = l; e < l + 12 * c; e += 12) i.getUint16(e, !a) === 45057 && (u = i.getUint32(e + 8, !a));
						let d = s + 2 + c * 12 + 4, f = [];
						for (let e = d; e < d + u * 16; e += 16) {
							let t = {
								MPType: i.getUint32(e, !a),
								size: i.getUint32(e + 4, !a),
								dataOffset: i.getUint32(e + 8, !a),
								dependantImages: i.getUint32(e + 12, !a),
								start: -1,
								end: -1,
								isFII: !1
							};
							t.dataOffset ? (t.start = r + t.dataOffset, t.isFII = !1) : (t.start = 0, t.isFII = !0), t.end = t.start + t.size, f.push(t);
						}
						if (this.options.extractNonFII && f.length) {
							let e = new Blob([i]), n = [];
							for (let t of f) {
								if (t.isFII && !this.options.extractFII) continue;
								let r = e.slice(t.start, t.end + 1, "image/jpeg");
								n.push(r);
							}
							t(n);
						}
					}
				}
				o += 2 + i.getUint16(o + 2);
			}
		});
	}
}, pr = async (e) => {
	let t = dr(e);
	if (!t) throw new lr("Gain map XMP metadata not found");
	let n = await new fr({
		extractFII: !0,
		extractNonFII: !0
	}).extract(e);
	if (n.length !== 2) throw new cr("Gain map recovery image not found");
	return {
		sdr: new Uint8Array(await n[0].arrayBuffer()),
		gainMap: new Uint8Array(await n[1].arrayBuffer()),
		metadata: t
	};
}, mr = (e) => new Promise((t, n) => {
	let r = document.createElement("img");
	r.onload = () => {
		t(r);
	}, r.onerror = (e) => {
		n(e);
	}, r.src = URL.createObjectURL(e);
}), hr = class extends R {
	_renderer;
	_renderTargetOptions;
	_internalLoadingManager;
	_config;
	constructor(e, t) {
		super(t), this._config = e, e.renderer && (this._renderer = e.renderer), this._internalLoadingManager = new Ve();
	}
	setRenderer(e) {
		return this._renderer = e, this;
	}
	setRenderTargetOptions(e) {
		return this._renderTargetOptions = e, this;
	}
	prepareQuadRenderer() {
		this._renderer || console.warn("WARNING: A Renderer was not passed to this Loader constructor or in setRenderer, the result of this Loader will need to be converted to a Data Texture with toDataTexture() before you can use it in your renderer.");
		let e = this._config.createMaterial({
			gainMapMax: [
				1,
				1,
				1
			],
			gainMapMin: [
				0,
				0,
				0
			],
			gamma: [
				1,
				1,
				1
			],
			offsetHdr: [
				1,
				1,
				1
			],
			offsetSdr: [
				1,
				1,
				1
			],
			hdrCapacityMax: 1,
			hdrCapacityMin: 0,
			maxDisplayBoost: 1,
			gainMap: new C(),
			sdr: new C()
		});
		return this._config.createQuadRenderer({
			width: 16,
			height: 16,
			type: v,
			colorSpace: Ze,
			material: e,
			renderer: this._renderer,
			renderTargetOptions: this._renderTargetOptions
		});
	}
	async processImages(e, t, n) {
		let r = t ? new Blob([t], { type: "image/jpeg" }) : void 0, i = new Blob([e], { type: "image/jpeg" }), a, o, s = !1;
		if (typeof createImageBitmap > "u") {
			let e = await Promise.all([r ? mr(r) : Promise.resolve(void 0), mr(i)]);
			o = e[0], a = e[1], s = n === "flipY";
		} else {
			let e = await Promise.all([r ? createImageBitmap(r, { imageOrientation: n || "flipY" }) : Promise.resolve(void 0), createImageBitmap(i, { imageOrientation: n || "flipY" })]);
			o = e[0], a = e[1];
		}
		return {
			sdrImage: a,
			gainMapImage: o,
			needsFlip: s
		};
	}
	createTextures(e, t, n) {
		let r = new C(t || new ImageData(2, 2), 300, a, a, H, qe, D, xe, 1, Ze);
		r.flipY = n, r.needsUpdate = !0;
		let i = new C(e, 300, a, a, H, qe, D, xe, 1, c);
		return i.flipY = n, i.needsUpdate = !0, {
			gainMap: r,
			sdr: i
		};
	}
	updateQuadRenderer(e, t, n, r, i) {
		e.width = t.width, e.height = t.height, e.material.gainMap = n, e.material.sdr = r, e.material.gainMapMin = i.gainMapMin, e.material.gainMapMax = i.gainMapMax, e.material.offsetHdr = i.offsetHdr, e.material.offsetSdr = i.offsetSdr, e.material.gamma = i.gamma, e.material.hdrCapacityMin = i.hdrCapacityMin, e.material.hdrCapacityMax = i.hdrCapacityMax, e.material.maxDisplayBoost = 2 ** i.hdrCapacityMax, e.material.needsUpdate = !0;
	}
}, gr = "\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n", _r = "\n// min half float value\n#define HALF_FLOAT_MIN vec3( -65504, -65504, -65504 )\n// max half float value\n#define HALF_FLOAT_MAX vec3( 65504, 65504, 65504 )\n\nuniform sampler2D sdr;\nuniform sampler2D gainMap;\nuniform vec3 gamma;\nuniform vec3 offsetHdr;\nuniform vec3 offsetSdr;\nuniform vec3 gainMapMin;\nuniform vec3 gainMapMax;\nuniform float weightFactor;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec3 rgb = texture2D( sdr, vUv ).rgb;\n  vec3 recovery = texture2D( gainMap, vUv ).rgb;\n  vec3 logRecovery = pow( recovery, gamma );\n  vec3 logBoost = gainMapMin * ( 1.0 - logRecovery ) + gainMapMax * logRecovery;\n  vec3 hdrColor = (rgb + offsetSdr) * exp2( logBoost * weightFactor ) - offsetHdr;\n  vec3 clampedHdrColor = max( HALF_FLOAT_MIN, min( HALF_FLOAT_MAX, hdrColor ));\n  gl_FragColor = vec4( clampedHdrColor , 1.0 );\n}\n", vr = class extends y {
	_maxDisplayBoost;
	_hdrCapacityMin;
	_hdrCapacityMax;
	constructor({ gamma: e, offsetHdr: t, offsetSdr: n, gainMapMin: r, gainMapMax: i, maxDisplayBoost: a, hdrCapacityMin: o, hdrCapacityMax: s, sdr: c, gainMap: l }) {
		super({
			name: "GainMapDecoderMaterial",
			vertexShader: gr,
			fragmentShader: _r,
			uniforms: {
				sdr: { value: c },
				gainMap: { value: l },
				gamma: { value: new z(1 / e[0], 1 / e[1], 1 / e[2]) },
				offsetHdr: { value: new z().fromArray(t) },
				offsetSdr: { value: new z().fromArray(n) },
				gainMapMin: { value: new z().fromArray(r) },
				gainMapMax: { value: new z().fromArray(i) },
				weightFactor: { value: (Math.log2(a) - o) / (s - o) }
			},
			blending: 0,
			depthTest: !1,
			depthWrite: !1
		}), this._maxDisplayBoost = a, this._hdrCapacityMin = o, this._hdrCapacityMax = s, this.needsUpdate = !0, this.uniformsNeedUpdate = !0;
	}
	get sdr() {
		return this.uniforms.sdr.value;
	}
	set sdr(e) {
		this.uniforms.sdr.value = e;
	}
	get gainMap() {
		return this.uniforms.gainMap.value;
	}
	set gainMap(e) {
		this.uniforms.gainMap.value = e;
	}
	get offsetHdr() {
		return this.uniforms.offsetHdr.value.toArray();
	}
	set offsetHdr(e) {
		this.uniforms.offsetHdr.value.fromArray(e);
	}
	get offsetSdr() {
		return this.uniforms.offsetSdr.value.toArray();
	}
	set offsetSdr(e) {
		this.uniforms.offsetSdr.value.fromArray(e);
	}
	get gainMapMin() {
		return this.uniforms.gainMapMin.value.toArray();
	}
	set gainMapMin(e) {
		this.uniforms.gainMapMin.value.fromArray(e);
	}
	get gainMapMax() {
		return this.uniforms.gainMapMax.value.toArray();
	}
	set gainMapMax(e) {
		this.uniforms.gainMapMax.value.fromArray(e);
	}
	get gamma() {
		let e = this.uniforms.gamma.value;
		return [
			1 / e.x,
			1 / e.y,
			1 / e.z
		];
	}
	set gamma(e) {
		let t = this.uniforms.gamma.value;
		t.x = 1 / e[0], t.y = 1 / e[1], t.z = 1 / e[2];
	}
	get hdrCapacityMin() {
		return this._hdrCapacityMin;
	}
	set hdrCapacityMin(e) {
		this._hdrCapacityMin = e, this.calculateWeight();
	}
	get hdrCapacityMax() {
		return this._hdrCapacityMax;
	}
	set hdrCapacityMax(e) {
		this._hdrCapacityMax = e, this.calculateWeight();
	}
	get maxDisplayBoost() {
		return this._maxDisplayBoost;
	}
	set maxDisplayBoost(e) {
		this._maxDisplayBoost = Math.max(1, Math.min(65504, e)), this.calculateWeight();
	}
	calculateWeight() {
		let e = (Math.log2(this._maxDisplayBoost) - this._hdrCapacityMin) / (this._hdrCapacityMax - this._hdrCapacityMin);
		this.uniforms.weightFactor.value = Math.max(0, Math.min(1, e));
	}
}, yr = class extends hr {
	constructor(e, t) {
		super({
			renderer: e,
			createMaterial: (e) => new vr(e),
			createQuadRenderer: (e) => new sr(e)
		}, t);
	}
	async render(e, t, n, r) {
		let { sdrImage: i, gainMapImage: a, needsFlip: o } = await this.processImages(n, r, "flipY"), { gainMap: s, sdr: c } = this.createTextures(i, a, o);
		this.updateQuadRenderer(e, i, s, c, t), e.render();
	}
}, br = class extends yr {
	load([e, t, n], r, i, a) {
		let o = this.prepareQuadRenderer(), s, c, l, u = async () => {
			if (s && c && l) {
				try {
					await this.render(o, l, s, c);
				} catch (r) {
					this.manager.itemError(e), this.manager.itemError(t), this.manager.itemError(n), typeof a == "function" && a(r), o.disposeOnDemandRenderer();
					return;
				}
				typeof r == "function" && r(o), this.manager.itemEnd(e), this.manager.itemEnd(t), this.manager.itemEnd(n), o.disposeOnDemandRenderer();
			}
		}, d = !0, f = 0, p = 0, m = !0, h = 0, g = 0, _ = !0, v = 0, y = 0, b = () => {
			if (typeof i == "function") {
				let e = f + h + v, t = p + g + y;
				i(new ProgressEvent("progress", {
					lengthComputable: d && m && _,
					loaded: t,
					total: e
				}));
			}
		};
		this.manager.itemStart(e), this.manager.itemStart(t), this.manager.itemStart(n);
		let x = new N(this._internalLoadingManager);
		x.setResponseType("arraybuffer"), x.setRequestHeader(this.requestHeader), x.setPath(this.path), x.setWithCredentials(this.withCredentials), x.load(e, async (e) => {
			/* istanbul ignore if
			this condition exists only because of three.js types + strict mode
			*/
			if (typeof e == "string") throw Error("Invalid sdr buffer");
			s = e, await u();
		}, (e) => {
			d = e.lengthComputable, p = e.loaded, f = e.total, b();
		}, (t) => {
			this.manager.itemError(e), typeof a == "function" && a(t);
		});
		let S = new N(this._internalLoadingManager);
		S.setResponseType("arraybuffer"), S.setRequestHeader(this.requestHeader), S.setPath(this.path), S.setWithCredentials(this.withCredentials), S.load(t, async (e) => {
			/* istanbul ignore if
			this condition exists only because of three.js types + strict mode
			*/
			if (typeof e == "string") throw Error("Invalid gainmap buffer");
			c = e, await u();
		}, (e) => {
			m = e.lengthComputable, g = e.loaded, h = e.total, b();
		}, (e) => {
			this.manager.itemError(t), typeof a == "function" && a(e);
		});
		let C = new N(this._internalLoadingManager);
		return C.setRequestHeader(this.requestHeader), C.setPath(this.path), C.setWithCredentials(this.withCredentials), C.load(n, async (e) => {
			/* istanbul ignore if
			this condition exists only because of three.js types + strict mode
			*/
			if (typeof e != "string") throw Error("Invalid metadata string");
			l = JSON.parse(e), await u();
		}, (e) => {
			_ = e.lengthComputable, y = e.loaded, v = e.total, b();
		}, (e) => {
			this.manager.itemError(n), typeof a == "function" && a(e);
		}), o;
	}
}, xr = class extends yr {
	load(e, t, n, r) {
		let i = this.prepareQuadRenderer(), a = new N(this._internalLoadingManager);
		return a.setResponseType("arraybuffer"), a.setRequestHeader(this.requestHeader), a.setPath(this.path), a.setWithCredentials(this.withCredentials), this.manager.itemStart(e), a.load(e, async (n) => {
			/* istanbul ignore if
			this condition exists only because of three.js types + strict mode
			*/
			if (typeof n == "string") throw Error("Invalid buffer, received [string], was expecting [ArrayBuffer]");
			let a = new Uint8Array(n), o, s, c;
			try {
				let e = await pr(a);
				o = e.sdr, s = e.gainMap, c = e.metadata;
			} catch (t) {
				if (t instanceof lr || t instanceof cr) console.warn(`Failure to reconstruct an HDR image from ${e}: Gain map metadata not found in the file, HDRJPGLoader will render the SDR jpeg`), c = {
					gainMapMin: [
						0,
						0,
						0
					],
					gainMapMax: [
						1,
						1,
						1
					],
					gamma: [
						1,
						1,
						1
					],
					hdrCapacityMin: 0,
					hdrCapacityMax: 1,
					offsetHdr: [
						0,
						0,
						0
					],
					offsetSdr: [
						0,
						0,
						0
					]
				}, o = a;
				else throw t;
			}
			try {
				await this.render(i, c, o.buffer, s?.buffer);
			} catch (t) {
				this.manager.itemError(e), typeof r == "function" && r(t), i.disposeOnDemandRenderer();
				return;
			}
			typeof t == "function" && t(i), this.manager.itemEnd(e), i.disposeOnDemandRenderer();
		}, n, (t) => {
			this.manager.itemError(e), typeof r == "function" && r(t);
		}), i;
	}
}, Sr = {
	apartment: "lebombo_1k.hdr",
	city: "potsdamer_platz_1k.hdr",
	dawn: "kiara_1_dawn_1k.hdr",
	forest: "forest_slope_1k.hdr",
	lobby: "st_fagans_interior_1k.hdr",
	night: "dikhololo_night_1k.hdr",
	park: "rooitou_park_1k.hdr",
	studio: "studio_small_03_1k.hdr",
	sunset: "venice_sunset_1k.hdr",
	warehouse: "empty_warehouse_01_1k.hdr"
}, Cr = "https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/", wr = (e) => Array.isArray(e), Tr = [
	"/px.png",
	"/nx.png",
	"/py.png",
	"/ny.png",
	"/pz.png",
	"/nz.png"
];
function Er({ files: e = Tr, path: t = "", preset: n = void 0, colorSpace: r = void 0, extensions: i } = {}) {
	n && (kr(n), e = Sr[n], t = Cr);
	let a = wr(e), { extension: o, isCubemap: s } = Ar(e), c = jr(o);
	if (!c) throw Error("useEnvironment: Unrecognized file extension: " + e);
	let l = P((e) => e.gl);
	(0, J.useLayoutEffect)(() => {
		if (o !== "webp" && o !== "jpg" && o !== "jpeg") return;
		function t() {
			Oe.clear(c, a ? [e] : e);
		}
		l.domElement.addEventListener("webglcontextlost", t, { once: !0 });
	}, [e, l.domElement]);
	let u = Oe(c, a ? [e] : e, (e) => {
		(o === "webp" || o === "jpg" || o === "jpeg") && e.setRenderer(l), e.setPath == null || e.setPath(t), i && i(e);
	}), d = a ? u[0] : u;
	return (o === "jpg" || o === "jpeg" || o === "webp") && (d = d.renderTarget?.texture), d.mapping = s ? 301 : 303, d.colorSpace = r ?? (s ? "srgb" : "srgb-linear"), d;
}
var Dr = {
	files: Tr,
	path: "",
	preset: void 0,
	extensions: void 0
};
Er.preload = (e) => {
	let t = {
		...Dr,
		...e
	}, { files: n, path: r = "" } = t, { preset: i, extensions: a } = t;
	i && (kr(i), n = Sr[i], r = Cr);
	let { extension: o } = Ar(n);
	if (o === "webp" || o === "jpg" || o === "jpeg") throw Error("useEnvironment: Preloading gainmaps is not supported");
	let s = jr(o);
	if (!s) throw Error("useEnvironment: Unrecognized file extension: " + n);
	Oe.preload(s, wr(n) ? [n] : n, (e) => {
		e.setPath == null || e.setPath(r), a && a(e);
	});
};
var Or = {
	files: Tr,
	preset: void 0
};
Er.clear = (e) => {
	let t = {
		...Or,
		...e
	}, { files: n } = t, { preset: r } = t;
	r && (kr(r), n = Sr[r]);
	let { extension: i } = Ar(n), a = jr(i);
	if (!a) throw Error("useEnvironment: Unrecognized file extension: " + n);
	Oe.clear(a, wr(n) ? [n] : n);
};
function kr(e) {
	if (!(e in Sr)) throw Error("Preset must be one of: " + Object.keys(Sr).join(", "));
}
function Ar(e) {
	var t;
	let n = wr(e) && e.length === 6, r = wr(e) && e.length === 3 && e.some((e) => e.endsWith("json")), i = wr(e) ? e[0] : e;
	return {
		extension: n ? "cube" : r ? "webp" : i.startsWith("data:application/exr") ? "exr" : i.startsWith("data:application/hdr") ? "hdr" : i.startsWith("data:image/jpeg") ? "jpg" : (t = i.split(".").pop()) == null || (t = t.split("?")) == null || (t = t.shift()) == null ? void 0 : t.toLowerCase(),
		isCubemap: n,
		isGainmap: r
	};
}
function jr(e) {
	return e === "cube" ? O : e === "hdr" ? Un : e === "exr" ? Gn : e === "jpg" || e === "jpeg" ? xr : e === "webp" ? br : null;
}
//#endregion
//#region node_modules/@react-three/drei/core/Environment.js
var Mr = (e) => e.current && e.current.isScene, Nr = (e) => Mr(e) ? e.current : e;
function Pr(e, t, n, r, i = {}) {
	var a, o;
	i = {
		backgroundBlurriness: 0,
		backgroundIntensity: 1,
		backgroundRotation: [
			0,
			0,
			0
		],
		environmentIntensity: 1,
		environmentRotation: [
			0,
			0,
			0
		],
		...i
	};
	let s = Nr(t || n), c = s.background, l = s.environment, u = {
		backgroundBlurriness: s.backgroundBlurriness,
		backgroundIntensity: s.backgroundIntensity,
		backgroundRotation: ((a = s.backgroundRotation) == null || a.clone == null ? void 0 : a.clone()) ?? [
			0,
			0,
			0
		],
		environmentIntensity: s.environmentIntensity,
		environmentRotation: ((o = s.environmentRotation) == null || o.clone == null ? void 0 : o.clone()) ?? [
			0,
			0,
			0
		]
	};
	return e !== "only" && (s.environment = r), e && (s.background = r), Se(s, i), () => {
		e !== "only" && (s.environment = l), e && (s.background = c), Se(s, u);
	};
}
function Fr({ scene: e, background: t = !1, map: n, ...r }) {
	let i = P((e) => e.scene);
	return J.useLayoutEffect(() => {
		if (n) return Pr(t, e, i, n, r);
	}), null;
}
function Ir({ background: e = !1, scene: t, blur: n, backgroundBlurriness: r, backgroundIntensity: i, backgroundRotation: a, environmentIntensity: o, environmentRotation: s, ...c }) {
	let l = Er(c), u = P((e) => e.scene);
	return J.useLayoutEffect(() => Pr(e, t, u, l, {
		backgroundBlurriness: n ?? r,
		backgroundIntensity: i,
		backgroundRotation: a,
		environmentIntensity: o,
		environmentRotation: s
	})), J.useEffect(() => () => {
		l.dispose();
	}, [l]), null;
}
function Lr({ children: e, near: t = .1, far: n = 1e3, resolution: r = 256, frames: i = 1, map: a, background: o = !1, blur: s, backgroundBlurriness: c, backgroundIntensity: l, backgroundRotation: u, environmentIntensity: d, environmentRotation: f, scene: p, files: m, path: h, preset: g = void 0, extensions: _ }) {
	let y = P((e) => e.gl), b = P((e) => e.scene), x = J.useRef(null), [S] = J.useState(() => new pe()), C = J.useMemo(() => {
		let e = new tt(r);
		return e.texture.type = v, e;
	}, [r]);
	J.useEffect(() => () => {
		C.dispose();
	}, [C]), J.useLayoutEffect(() => {
		if (i === 1) {
			let e = y.autoClear;
			y.autoClear = !0, x.current.update(y, S), y.autoClear = e;
		}
		return Pr(o, p, b, C.texture, {
			backgroundBlurriness: s ?? c,
			backgroundIntensity: l,
			backgroundRotation: u,
			environmentIntensity: d,
			environmentRotation: f
		});
	}, [
		e,
		S,
		C.texture,
		p,
		b,
		o,
		i,
		y
	]);
	let w = 1;
	return Be(() => {
		if (i === Infinity || w < i) {
			let e = y.autoClear;
			y.autoClear = !0, x.current.update(y, S), y.autoClear = e, w++;
		}
	}), /*#__PURE__*/ J.createElement(J.Fragment, null, Ke(/*#__PURE__*/ J.createElement(J.Fragment, null, e, /*#__PURE__*/ J.createElement("cubeCamera", {
		ref: x,
		args: [
			t,
			n,
			C
		]
	}), m || g ? /*#__PURE__*/ J.createElement(Ir, {
		background: !0,
		files: m,
		preset: g,
		path: h,
		extensions: _
	}) : a ? /*#__PURE__*/ J.createElement(Fr, {
		background: !0,
		map: a,
		extensions: _
	}) : null), S));
}
function Rr(e) {
	let t = Er(e), n = e.map || t;
	J.useMemo(() => Fe({ GroundProjectedEnvImpl: Lt }), []), J.useEffect(() => () => {
		t.dispose();
	}, [t]);
	let r = J.useMemo(() => [n], [n]), i = e.ground?.height, a = e.ground?.radius, o = e.ground?.scale ?? 1e3;
	return /*#__PURE__*/ J.createElement(J.Fragment, null, /*#__PURE__*/ J.createElement(Fr, Re({}, e, { map: n })), /*#__PURE__*/ J.createElement("groundProjectedEnvImpl", {
		args: r,
		scale: o,
		height: i,
		radius: a
	}));
}
function zr(e) {
	return e.ground ? /*#__PURE__*/ J.createElement(Rr, e) : e.map ? /*#__PURE__*/ J.createElement(Fr, e) : e.children ? /*#__PURE__*/ J.createElement(Lr, e) : /*#__PURE__*/ J.createElement(Ir, e);
}
//#endregion
//#region node_modules/@react-three/drei/core/ContactShadows.js
var Br = /* @__PURE__ */ J.forwardRef(({ scale: e = 10, frames: t = Infinity, opacity: n = 1, width: r = 1, height: i = 1, blur: a = 1, near: s = 0, far: c = 10, resolution: l = 512, smooth: u = !0, color: d = "#000000", depthWrite: f = !1, renderOrder: p, ...m }, h) => {
	let g = J.useRef(null), _ = P((e) => e.scene), v = P((e) => e.gl), b = J.useRef(null);
	r *= Array.isArray(e) ? e[0] : e || 1, i *= Array.isArray(e) ? e[1] : e || 1;
	let [x, S, C, w, T, E, D] = J.useMemo(() => {
		let e = new We(l, l), t = new We(l, l);
		t.texture.generateMipmaps = e.texture.generateMipmaps = !1;
		let n = new o(r, i).rotateX(Math.PI / 2), a = new F(n), s = new it();
		s.depthTest = s.depthWrite = !1, s.onBeforeCompile = (e) => {
			e.uniforms = {
				...e.uniforms,
				ucolor: { value: new B(d) }
			}, e.fragmentShader = e.fragmentShader.replace("void main() {", "uniform vec3 ucolor;\n           void main() {\n          "), e.fragmentShader = e.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );", "vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );");
		};
		let c = new y(Vn), u = new y(Hn);
		return u.depthTest = c.depthTest = !1, [
			e,
			n,
			s,
			a,
			c,
			u,
			t
		];
	}, [
		l,
		r,
		i,
		e,
		d
	]), O = (e) => {
		w.visible = !0, w.material = T, T.uniforms.tDiffuse.value = x.texture, T.uniforms.h.value = e * 1 / 256, v.setRenderTarget(D), v.render(w, b.current), w.material = E, E.uniforms.tDiffuse.value = D.texture, E.uniforms.v.value = e * 1 / 256, v.setRenderTarget(x), v.render(w, b.current), w.visible = !1;
	}, k = 0, A, ee;
	return Be(() => {
		b.current && (t === Infinity || k < t) && (k++, A = _.background, ee = _.overrideMaterial, g.current.visible = !1, _.background = null, _.overrideMaterial = C, v.setRenderTarget(x), v.render(_, b.current), O(a), u && O(a * .4), v.setRenderTarget(null), g.current.visible = !0, _.overrideMaterial = ee, _.background = A);
	}), J.useImperativeHandle(h, () => g.current, []), /*#__PURE__*/ J.createElement("group", Re({ "rotation-x": Math.PI / 2 }, m, { ref: g }), /*#__PURE__*/ J.createElement("mesh", {
		renderOrder: p,
		geometry: S,
		scale: [
			1,
			-1,
			1
		],
		rotation: [
			-Math.PI / 2,
			0,
			0
		]
	}, /*#__PURE__*/ J.createElement("meshBasicMaterial", {
		transparent: !0,
		map: x.texture,
		opacity: n,
		depthWrite: f
	})), /*#__PURE__*/ J.createElement("orthographicCamera", {
		ref: b,
		args: [
			-r / 2,
			r / 2,
			i / 2,
			-i / 2,
			s,
			c
		]
	}));
});
//#endregion
//#region node_modules/three/examples/jsm/utils/SkeletonUtils.js
function Vr(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = e.clone();
	return Hr(e, r, function(e, r) {
		t.set(r, e), n.set(e, r);
	}), r.traverse(function(e) {
		if (!e.isSkinnedMesh) return;
		let r = e, i = t.get(e), a = i.skeleton.bones;
		r.skeleton = i.skeleton.clone(), r.bindMatrix.copy(i.bindMatrix), r.skeleton.bones = a.map(function(e) {
			return n.get(e);
		}), r.bind(r.skeleton, r.bindMatrix);
	}), r;
}
function Hr(e, t, n) {
	n(e, t);
	for (let r = 0; r < e.children.length; r++) Hr(e.children[r], t.children[r], n);
}
//#endregion
//#region src/author/model/model3d-fit.ts
function Ur(e, t, n = 45, r = 1.15) {
	let i = Wr(e.x), a = Wr(e.y), o = Wr(e.z), s = Wr(t.width) / Wr(t.height), c = n * Math.PI / 180, l = 2 * Math.atan(Math.tan(c / 2) * s), u = i / (2 * Math.tan(l / 2)), d = a / (2 * Math.tan(c / 2)), f = Math.max(u, d) * Math.max(1, r), p = f + o / 2;
	return {
		distance: p,
		near: Math.max(.001, f * .01),
		far: Math.max(p + o * 2, p * 10)
	};
}
function Wr(e) {
	return Number.isFinite(e) && e > 0 ? e : .001;
}
//#endregion
//#region src/author/canvas/model3d-toon-material.ts
var Gr = /* @__PURE__ */ new WeakSet();
function Kr(e, t, n, r = !0) {
	let i = /* @__PURE__ */ new Map(), a = [];
	return e.traverse((e) => {
		let o = e;
		if (!o.isMesh || !o.material) return;
		!o.geometry.attributes.normal && !Gr.has(o.geometry) && (o.geometry.computeVertexNormals(), Gr.add(o.geometry));
		let s = (e) => {
			let o = i.get(e);
			if (o) return o;
			let s = qr(e, t, n, r);
			return i.set(e, s), a.push(s), s;
		};
		o.material = Array.isArray(o.material) ? o.material.map(s) : s(o.material);
	}), a;
}
function qr(e, t, n, r = !0) {
	let a = "isMeshStandardMaterial" in e && e.isMeshStandardMaterial === !0 ? e.clone() : new nt({
		color: e.color?.clone() ?? new B(16777215),
		map: e.map ?? null,
		normalMap: e.normalMap ?? null,
		normalScale: e.normalScale?.clone() ?? new i(1, 1),
		roughness: e.roughness ?? .8,
		roughnessMap: e.roughnessMap ?? null,
		metalness: e.metalness ?? 0,
		metalnessMap: e.metalnessMap ?? null,
		alphaMap: e.alphaMap ?? null,
		aoMap: e.aoMap ?? null,
		emissive: e.emissive?.clone() ?? new B(0),
		emissiveMap: e.emissiveMap ?? null,
		emissiveIntensity: e.emissiveIntensity ?? 1,
		opacity: e.opacity,
		transparent: e.transparent,
		side: e.side,
		depthTest: e.depthTest,
		depthWrite: e.depthWrite,
		alphaTest: e.alphaTest
	}), o = n?.enabled ? n.roughness : e.roughness ?? a.roughness, s = n?.enabled ? n.metalness : e.metalness ?? a.metalness;
	n?.enabled && a.color.set(n.baseColor), a.roughness = Jr(o * t.roughnessMultiplier, 0, 1), a.metalness = Jr(s * t.metalnessMultiplier, 0, 1), a.opacity = Jr(e.opacity * t.opacityMultiplier, 0, 1), a.transparent = e.transparent || a.opacity < 1 || !!a.alphaMap, a.normalScale.multiplyScalar(t.normalScale), a.side = r ? 0 : 2;
	let c = t.ao ?? {
		enabled: !0,
		intensity: 1
	};
	if (a.aoMapIntensity = c.enabled ? c.intensity : 0, !t.enabled) return a.needsUpdate = !0, a;
	let l = a.onBeforeCompile.bind(a), u = a.customProgramCacheKey.bind(a);
	return a.onBeforeCompile = (e, n) => {
		l(e, n);
		let r = "vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;";
		e.uniforms.ampToonBands = { value: t.bands }, e.uniforms.ampToonStrength = { value: t.strength }, e.uniforms.ampToonSoftness = { value: t.smoothness }, e.uniforms.ampAoIntensity = { value: c.intensity }, e.fragmentShader = e.fragmentShader.replace("#include <common>", [
			"#include <common>",
			"uniform float ampToonBands;",
			"uniform float ampToonStrength;",
			"uniform float ampToonSoftness;",
			"uniform float ampAoIntensity;"
		].join("\n"));
		let i = [
			r,
			...c.enabled && !a.aoMap ? [
				"float ampNormalVariation = clamp(length(fwidth(normal)) * 0.4, 0.0, 1.0);",
				"float ampHemisphere = 0.72 + 0.28 * smoothstep(-0.4, 0.8, normal.y);",
				"float ampAmbientOcclusion = clamp((1.0 - ampNormalVariation * 0.45 * ampAoIntensity) * mix(1.0, ampHemisphere, min(ampAoIntensity, 1.0)), 0.35, 1.0);",
				"outgoingLight *= ampAmbientOcclusion;"
			] : [],
			"float ampToonLuma = max(dot(outgoingLight, vec3(0.2126, 0.7152, 0.0722)), 0.00001);",
			"float ampToonDisplay = pow(clamp(ampToonLuma / (1.0 + ampToonLuma), 0.0, 0.9999), 0.454545);",
			"float ampToonIntervals = max(ampToonBands - 1.0, 1.0);",
			"float ampToonScaled = ampToonDisplay * ampToonIntervals;",
			"float ampToonLow = floor(ampToonScaled);",
			"float ampToonEdge = fract(ampToonScaled);",
			"float ampToonTransition = min(0.499, max(ampToonSoftness, fwidth(ampToonScaled) * 0.75));",
			"float ampToonBlend = smoothstep(0.5 - ampToonTransition, 0.5 + ampToonTransition, ampToonEdge);",
			"float ampToonQuantized = clamp((ampToonLow + ampToonBlend) / ampToonIntervals, 0.0001, 0.9999);",
			"float ampToonLinear = pow(ampToonQuantized, 2.2);",
			"float ampToonTarget = ampToonLinear / max(1.0 - ampToonLinear, 0.0001);",
			"float ampToonGain = clamp(ampToonTarget / ampToonLuma, 0.18, 4.0);",
			"vec3 ampToonColor = outgoingLight * ampToonGain;",
			"outgoingLight = mix(outgoingLight, ampToonColor, ampToonStrength);"
		].join("\n");
		e.fragmentShader = e.fragmentShader.replace(r, i);
	}, a.customProgramCacheKey = () => [
		u(),
		"amp-toon-v2",
		c.enabled && !a.aoMap ? "approx-ao" : "native-ao"
	].join(":"), a.needsUpdate = !0, a;
}
function Jr(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
//#endregion
//#region src/author/canvas/model3d-outline.ts
function Yr(e, t) {
	if (!t.enabled || t.thickness <= 0 || t.opacity <= 0) return null;
	let n = Vr(e), r = /* @__PURE__ */ new Map(), i = [];
	n.traverse((e) => {
		let n = e;
		if (!n.isMesh || !n.material) return;
		let a = (e) => {
			let n = r.get(e);
			if (n) return n;
			let a = new Qe({
				color: new B(t.color),
				side: 1,
				transparent: t.opacity < 1,
				opacity: t.opacity,
				depthWrite: !1,
				depthTest: !0,
				toneMapped: !1
			});
			return r.set(e, a), i.push(a), a;
		};
		n.material = Array.isArray(n.material) ? n.material.map(a) : a(n.material), n.renderOrder = -1;
	});
	let a = 1 + t.thickness;
	return n.scale.setScalar(a), n.position.multiplyScalar(a), {
		instance: n,
		ownedMaterials: i
	};
}
I.line = {
	worldUnits: { value: 1 },
	linewidth: { value: 1 },
	resolution: { value: new i() },
	dashOffset: { value: 0 },
	dashScale: { value: 1 },
	dashSize: { value: 1 },
	gapSize: { value: 1 }
}, rt.line = {
	uniforms: _e.merge([
		I.common,
		I.fog,
		I.line
	]),
	vertexShader: "\n		#include <common>\n		#include <color_pars_vertex>\n		#include <fog_pars_vertex>\n		#include <logdepthbuf_pars_vertex>\n		#include <clipping_planes_pars_vertex>\n\n		uniform float linewidth;\n		uniform vec2 resolution;\n\n		attribute vec3 instanceStart;\n		attribute vec3 instanceEnd;\n\n		attribute vec3 instanceColorStart;\n		attribute vec3 instanceColorEnd;\n\n		#ifdef WORLD_UNITS\n\n			varying vec4 worldPos;\n			varying vec3 worldStart;\n			varying vec3 worldEnd;\n\n			#ifdef USE_DASH\n\n				varying vec2 vUv;\n\n			#endif\n\n		#else\n\n			varying vec2 vUv;\n\n		#endif\n\n		#ifdef USE_DASH\n\n			uniform float dashScale;\n			attribute float instanceDistanceStart;\n			attribute float instanceDistanceEnd;\n			varying float vLineDistance;\n\n		#endif\n\n		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {\n\n			// compute the interpolation factor needed to trim the segment so it terminates\n			// between the camera plane and the near plane\n\n			// conservative estimate of the near plane\n			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column\n			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column\n\n			// we need different nearEstimate formula for reversed and default depth buffer\n			// a is positive with a reversed depth buffer so it can be used for controlling the code flow\n			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );\n\n			return ( nearEstimate - start.z ) / ( end.z - start.z );\n\n		}\n\n		void main() {\n\n			#ifdef USE_COLOR\n\n				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;\n\n			#endif\n\n			float aspect = resolution.x / resolution.y;\n\n			// camera space\n			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );\n			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );\n\n			#ifdef USE_DASH\n\n				float lineDistanceStart = dashScale * instanceDistanceStart;\n				float lineDistanceEnd = dashScale * instanceDistanceEnd;\n\n			#endif\n\n			#ifdef WORLD_UNITS\n\n				worldStart = start.xyz;\n				worldEnd = end.xyz;\n\n			#else\n\n				vUv = uv;\n\n			#endif\n\n			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane\n			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space\n			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly\n			// perhaps there is a more elegant solution -- WestLangley\n\n			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column\n\n			if ( perspective ) {\n\n				if ( start.z < 0.0 && end.z >= 0.0 ) {\n\n					float alpha = trimSegmentAlpha( start, end );\n					end.xyz = mix( start.xyz, end.xyz, alpha );\n\n					#ifdef USE_DASH\n\n						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );\n\n					#endif\n\n				} else if ( end.z < 0.0 && start.z >= 0.0 ) {\n\n					float alpha = trimSegmentAlpha( end, start );\n					start.xyz = mix( end.xyz, start.xyz, alpha );\n\n					#ifdef USE_DASH\n\n						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );\n\n					#endif\n\n				}\n\n			}\n\n			#ifdef USE_DASH\n\n				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;\n				vUv = uv;\n\n			#endif\n\n			// clip space\n			vec4 clipStart = projectionMatrix * start;\n			vec4 clipEnd = projectionMatrix * end;\n\n			// ndc space\n			vec3 ndcStart = clipStart.xyz / clipStart.w;\n			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;\n\n			// direction\n			vec2 dir = ndcEnd.xy - ndcStart.xy;\n\n			// account for clip-space aspect ratio\n			dir.x *= aspect;\n			dir = normalize( dir );\n\n			#ifdef WORLD_UNITS\n\n				vec3 worldDir = normalize( end.xyz - start.xyz );\n				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );\n				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );\n				vec3 worldFwd = cross( worldDir, worldUp );\n				worldPos = position.y < 0.5 ? start: end;\n\n				// height offset\n				float hw = linewidth * 0.5;\n				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;\n\n				// don't extend the line if we're rendering dashes because we\n				// won't be rendering the endcaps\n				#ifndef USE_DASH\n\n					// cap extension\n					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;\n\n					// add width to the box\n					worldPos.xyz += worldFwd * hw;\n\n					// endcaps\n					if ( position.y > 1.0 || position.y < 0.0 ) {\n\n						worldPos.xyz -= worldFwd * 2.0 * hw;\n\n					}\n\n				#endif\n\n				// project the worldpos\n				vec4 clip = projectionMatrix * worldPos;\n\n				// shift the depth of the projected points so the line\n				// segments overlap neatly\n				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;\n				clip.z = clipPose.z * clip.w;\n\n			#else\n\n				vec2 offset = vec2( dir.y, - dir.x );\n				// undo aspect ratio adjustment\n				dir.x /= aspect;\n				offset.x /= aspect;\n\n				// sign flip\n				if ( position.x < 0.0 ) offset *= - 1.0;\n\n				// endcaps\n				if ( position.y < 0.0 ) {\n\n					offset += - dir;\n\n				} else if ( position.y > 1.0 ) {\n\n					offset += dir;\n\n				}\n\n				// adjust for linewidth\n				offset *= linewidth;\n\n				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...\n				offset /= resolution.y;\n\n				// select end\n				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;\n\n				// back to clip space\n				offset *= clip.w;\n\n				clip.xy += offset;\n\n			#endif\n\n			gl_Position = clip;\n\n			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation\n\n			#include <logdepthbuf_vertex>\n			#include <clipping_planes_vertex>\n			#include <fog_vertex>\n\n		}\n		",
	fragmentShader: "\n		uniform vec3 diffuse;\n		uniform float opacity;\n		uniform float linewidth;\n\n		#ifdef USE_DASH\n\n			uniform float dashOffset;\n			uniform float dashSize;\n			uniform float gapSize;\n\n		#endif\n\n		varying float vLineDistance;\n\n		#ifdef WORLD_UNITS\n\n			varying vec4 worldPos;\n			varying vec3 worldStart;\n			varying vec3 worldEnd;\n\n			#ifdef USE_DASH\n\n				varying vec2 vUv;\n\n			#endif\n\n		#else\n\n			varying vec2 vUv;\n\n		#endif\n\n		#include <common>\n		#include <color_pars_fragment>\n		#include <fog_pars_fragment>\n		#include <logdepthbuf_pars_fragment>\n		#include <clipping_planes_pars_fragment>\n\n		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {\n\n			float mua;\n			float mub;\n\n			vec3 p13 = p1 - p3;\n			vec3 p43 = p4 - p3;\n\n			vec3 p21 = p2 - p1;\n\n			float d1343 = dot( p13, p43 );\n			float d4321 = dot( p43, p21 );\n			float d1321 = dot( p13, p21 );\n			float d4343 = dot( p43, p43 );\n			float d2121 = dot( p21, p21 );\n\n			float denom = d2121 * d4343 - d4321 * d4321;\n\n			float numer = d1343 * d4321 - d1321 * d4343;\n\n			mua = numer / denom;\n			mua = clamp( mua, 0.0, 1.0 );\n			mub = ( d1343 + d4321 * ( mua ) ) / d4343;\n			mub = clamp( mub, 0.0, 1.0 );\n\n			return vec2( mua, mub );\n\n		}\n\n		void main() {\n\n			float alpha = opacity;\n			vec4 diffuseColor = vec4( diffuse, alpha );\n\n			#include <clipping_planes_fragment>\n\n			#ifdef USE_DASH\n\n				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps\n\n				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX\n\n			#endif\n\n			#ifdef WORLD_UNITS\n\n				// Find the closest points on the view ray and the line segment\n				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;\n				vec3 lineDir = worldEnd - worldStart;\n				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );\n\n				vec3 p1 = worldStart + lineDir * params.x;\n				vec3 p2 = rayEnd * params.y;\n				vec3 delta = p1 - p2;\n				float len = length( delta );\n				float norm = len / linewidth;\n\n				#ifndef USE_DASH\n\n					#ifdef USE_ALPHA_TO_COVERAGE\n\n						float dnorm = fwidth( norm );\n						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );\n\n					#else\n\n						if ( norm > 0.5 ) {\n\n							discard;\n\n						}\n\n					#endif\n\n				#endif\n\n			#else\n\n				#ifdef USE_ALPHA_TO_COVERAGE\n\n					// artifacts appear on some hardware if a derivative is taken within a conditional\n					float a = vUv.x;\n					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;\n					float len2 = a * a + b * b;\n					float dlen = fwidth( len2 );\n\n					if ( abs( vUv.y ) > 1.0 ) {\n\n						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );\n\n					}\n\n				#else\n\n					if ( abs( vUv.y ) > 1.0 ) {\n\n						float a = vUv.x;\n						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;\n						float len2 = a * a + b * b;\n\n						if ( len2 > 1.0 ) discard;\n\n					}\n\n				#endif\n\n			#endif\n\n			#include <logdepthbuf_fragment>\n			#include <color_fragment>\n\n			gl_FragColor = vec4( diffuseColor.rgb, alpha );\n\n			#include <tonemapping_fragment>\n			#include <colorspace_fragment>\n			#include <fog_fragment>\n			#include <premultiplied_alpha_fragment>\n\n		}\n		"
};
var Xr = class extends y {
	constructor(e) {
		super({
			type: "LineMaterial",
			uniforms: _e.clone(rt.line.uniforms),
			vertexShader: rt.line.vertexShader,
			fragmentShader: rt.line.fragmentShader,
			clipping: !0
		}), this.isLineMaterial = !0, this.setValues(e);
	}
	get color() {
		return this.uniforms.diffuse.value;
	}
	set color(e) {
		this.uniforms.diffuse.value = e;
	}
	get worldUnits() {
		return "WORLD_UNITS" in this.defines;
	}
	set worldUnits(e) {
		e === !0 !== this.worldUnits && (this.needsUpdate = !0), e === !0 ? this.defines.WORLD_UNITS = "" : delete this.defines.WORLD_UNITS;
	}
	get linewidth() {
		return this.uniforms.linewidth.value;
	}
	set linewidth(e) {
		this.uniforms.linewidth && (this.uniforms.linewidth.value = e);
	}
	get dashed() {
		return "USE_DASH" in this.defines;
	}
	set dashed(e) {
		e === !0 !== this.dashed && (this.needsUpdate = !0), e === !0 ? this.defines.USE_DASH = "" : delete this.defines.USE_DASH;
	}
	get dashScale() {
		return this.uniforms.dashScale.value;
	}
	set dashScale(e) {
		this.uniforms.dashScale.value = e;
	}
	get dashSize() {
		return this.uniforms.dashSize.value;
	}
	set dashSize(e) {
		this.uniforms.dashSize.value = e;
	}
	get dashOffset() {
		return this.uniforms.dashOffset.value;
	}
	set dashOffset(e) {
		this.uniforms.dashOffset.value = e;
	}
	get gapSize() {
		return this.uniforms.gapSize.value;
	}
	set gapSize(e) {
		this.uniforms.gapSize.value = e;
	}
	get opacity() {
		return this.uniforms.opacity.value;
	}
	set opacity(e) {
		this.uniforms && (this.uniforms.opacity.value = e);
	}
	get resolution() {
		return this.uniforms.resolution.value;
	}
	set resolution(e) {
		this.uniforms.resolution.value.copy(e);
	}
	get alphaToCoverage() {
		return "USE_ALPHA_TO_COVERAGE" in this.defines;
	}
	set alphaToCoverage(e) {
		this.defines && (e === !0 !== this.alphaToCoverage && (this.needsUpdate = !0), e === !0 ? this.defines.USE_ALPHA_TO_COVERAGE = "" : delete this.defines.USE_ALPHA_TO_COVERAGE);
	}
}, Zr = new f(), Qr = new z(), $r = class extends w {
	constructor() {
		super(), this.isLineSegmentsGeometry = !0, this.type = "LineSegmentsGeometry", this.setIndex([
			0,
			2,
			1,
			2,
			3,
			1,
			2,
			4,
			3,
			4,
			5,
			3,
			4,
			6,
			5,
			6,
			7,
			5
		]), this.setAttribute("position", new at([
			-1,
			2,
			0,
			1,
			2,
			0,
			-1,
			1,
			0,
			1,
			1,
			0,
			-1,
			0,
			0,
			1,
			0,
			0,
			-1,
			-1,
			0,
			1,
			-1,
			0
		], 3)), this.setAttribute("uv", new at([
			-1,
			2,
			1,
			2,
			-1,
			1,
			1,
			1,
			-1,
			-1,
			1,
			-1,
			-1,
			-2,
			1,
			-2
		], 2));
	}
	applyMatrix4(e) {
		let t = this.attributes.instanceStart, n = this.attributes.instanceEnd;
		return t !== void 0 && (t.applyMatrix4(e), n.applyMatrix4(e), t.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
	}
	setPositions(e) {
		let t;
		e instanceof Float32Array ? t = e : Array.isArray(e) && (t = new Float32Array(e));
		let n = new He(t, 6, 1);
		return this.setAttribute("instanceStart", new be(n, 3, 0)), this.setAttribute("instanceEnd", new be(n, 3, 3)), this.instanceCount = this.attributes.instanceStart.count, this.computeBoundingBox(), this.computeBoundingSphere(), this;
	}
	setColors(e) {
		let t;
		e instanceof Float32Array ? t = e : Array.isArray(e) && (t = new Float32Array(e));
		let n = new He(t, 6, 1);
		return this.setAttribute("instanceColorStart", new be(n, 3, 0)), this.setAttribute("instanceColorEnd", new be(n, 3, 3)), this;
	}
	fromWireframeGeometry(e) {
		return this.setPositions(e.attributes.position.array), this;
	}
	fromEdgesGeometry(e) {
		return this.setPositions(e.attributes.position.array), this;
	}
	fromMesh(e) {
		return this.fromWireframeGeometry(new Ae(e.geometry)), this;
	}
	fromLineSegments(e) {
		let t = e.geometry;
		return this.setPositions(t.attributes.position.array), this;
	}
	computeBoundingBox() {
		this.boundingBox === null && (this.boundingBox = new f());
		let e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
		e !== void 0 && t !== void 0 && (this.boundingBox.setFromBufferAttribute(e), Zr.setFromBufferAttribute(t), this.boundingBox.union(Zr));
	}
	computeBoundingSphere() {
		this.boundingSphere === null && (this.boundingSphere = new T()), this.boundingBox === null && this.computeBoundingBox();
		let e = this.attributes.instanceStart, t = this.attributes.instanceEnd;
		if (e !== void 0 && t !== void 0) {
			let n = this.boundingSphere.center;
			this.boundingBox.getCenter(n);
			let r = 0;
			for (let i = 0, a = e.count; i < a; i++) Qr.fromBufferAttribute(e, i), r = Math.max(r, n.distanceToSquared(Qr)), Qr.fromBufferAttribute(t, i), r = Math.max(r, n.distanceToSquared(Qr));
			this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this);
		}
	}
	toJSON() {}
}, ei = new Ye(), ti = new z(), ni = new z(), Y = new Ye(), X = new Ye(), ri = new Ye(), ii = new z(), ai = new De(), Z = new ze(), oi = new z(), si = new f(), ci = new T(), li = new Ye(), Q, ui;
function di(e, t, n) {
	return li.set(0, 0, -t, 1).applyMatrix4(e.projectionMatrix), li.multiplyScalar(1 / li.w), li.x = ui / n.width, li.y = ui / n.height, li.applyMatrix4(e.projectionMatrixInverse), li.multiplyScalar(1 / li.w), Math.abs(Math.max(li.x, li.y));
}
function fi(e, t) {
	let n = e.matrixWorld, r = e.geometry, i = r.attributes.instanceStart, a = r.attributes.instanceEnd, o = Math.min(r.instanceCount, i.count);
	for (let r = 0, s = o; r < s; r++) {
		Z.start.fromBufferAttribute(i, r), Z.end.fromBufferAttribute(a, r), Z.applyMatrix4(n);
		let o = new z(), s = new z();
		Q.distanceSqToSegment(Z.start, Z.end, s, o), s.distanceTo(o) < ui * .5 && t.push({
			point: s,
			pointOnLine: o,
			distance: Q.origin.distanceTo(s),
			object: e,
			face: null,
			faceIndex: r,
			uv: null,
			uv1: null
		});
	}
}
function pi(e, t, n) {
	let r = t.projectionMatrix, i = e.material.resolution, a = e.matrixWorld, o = e.geometry, s = o.attributes.instanceStart, c = o.attributes.instanceEnd, l = Math.min(o.instanceCount, s.count), u = -t.near;
	Q.at(1, ri), ri.w = 1, ri.applyMatrix4(t.matrixWorldInverse), ri.applyMatrix4(r), ri.multiplyScalar(1 / ri.w), ri.x *= i.x / 2, ri.y *= i.y / 2, ri.z = 0, ii.copy(ri), ai.multiplyMatrices(t.matrixWorldInverse, a);
	for (let t = 0, o = l; t < o; t++) {
		if (Y.fromBufferAttribute(s, t), X.fromBufferAttribute(c, t), Y.w = 1, X.w = 1, Y.applyMatrix4(ai), X.applyMatrix4(ai), Y.z > u && X.z > u) continue;
		if (Y.z > u) {
			let e = Y.z - X.z, t = (Y.z - u) / e;
			Y.lerp(X, t);
		} else if (X.z > u) {
			let e = X.z - Y.z, t = (X.z - u) / e;
			X.lerp(Y, t);
		}
		Y.applyMatrix4(r), X.applyMatrix4(r), Y.multiplyScalar(1 / Y.w), X.multiplyScalar(1 / X.w), Y.x *= i.x / 2, Y.y *= i.y / 2, X.x *= i.x / 2, X.y *= i.y / 2, Z.start.copy(Y), Z.start.z = 0, Z.end.copy(X), Z.end.z = 0;
		let o = Z.closestPointToPointParameter(ii, !0);
		Z.at(o, oi);
		let l = ke.lerp(Y.z, X.z, o), d = l >= -1 && l <= 1, f = ii.distanceTo(oi) < ui * .5;
		if (d && f) {
			Z.start.fromBufferAttribute(s, t), Z.end.fromBufferAttribute(c, t), Z.start.applyMatrix4(a), Z.end.applyMatrix4(a);
			let r = new z(), i = new z();
			Q.distanceSqToSegment(Z.start, Z.end, i, r), n.push({
				point: i,
				pointOnLine: r,
				distance: Q.origin.distanceTo(i),
				object: e,
				face: null,
				faceIndex: t,
				uv: null,
				uv1: null
			});
		}
	}
}
var mi = class extends F {
	constructor(e = new $r(), t = new Xr({ color: Math.random() * 16777215 })) {
		super(e, t), this.isLineSegments2 = !0, this.type = "LineSegments2";
	}
	computeLineDistances() {
		let e = this.geometry, t = e.attributes.instanceStart, n = e.attributes.instanceEnd, r = new Float32Array(2 * t.count);
		for (let e = 0, i = 0, a = t.count; e < a; e++, i += 2) ti.fromBufferAttribute(t, e), ni.fromBufferAttribute(n, e), r[i] = i === 0 ? 0 : r[i - 1], r[i + 1] = r[i] + ti.distanceTo(ni);
		let i = new He(r, 2, 1);
		return e.setAttribute("instanceDistanceStart", new be(i, 1, 0)), e.setAttribute("instanceDistanceEnd", new be(i, 1, 1)), this;
	}
	raycast(e, t) {
		let n = this.material.worldUnits, r = e.camera;
		if (r === null && !n && console.error("LineSegments2: \"Raycaster.camera\" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false."), n === !1 && (this.material.resolution.x === 0 || this.material.resolution.y === 0)) return;
		let i = e.params.Line2 === void 0 ? 0 : e.params.Line2.threshold || 0;
		Q = e.ray;
		let a = this.matrixWorld, o = this.geometry, s = this.material;
		ui = s.linewidth + i, o.boundingSphere === null && o.computeBoundingSphere(), ci.copy(o.boundingSphere).applyMatrix4(a);
		let c;
		if (c = n ? ui * .5 : di(r, Math.max(r.near, ci.distanceToPoint(Q.origin)), s.resolution), ci.radius += c, Q.intersectsSphere(ci) === !1) return;
		o.boundingBox === null && o.computeBoundingBox(), si.copy(o.boundingBox).applyMatrix4(a);
		let l;
		l = n ? ui * .5 : di(r, Math.max(r.near, si.distanceToPoint(Q.origin)), s.resolution), si.expandByScalar(l), Q.intersectsBox(si) !== !1 && (n ? fi(this, t) : pi(this, r, t));
	}
	onBeforeRender(e) {
		let t = this.material.uniforms;
		t && t.resolution && (e.getViewport(ei), this.material.uniforms.resolution.value.set(ei.z, ei.w));
	}
};
//#endregion
//#region src/author/canvas/model3d-wireframe.ts
function hi(e, t, n) {
	let r = [], i = [], a = /* @__PURE__ */ new Map(), o = [];
	e.traverse((e) => {
		let t = e;
		t.isMesh && t.geometry?.attributes.position && o.push(t);
	});
	for (let e of o) {
		let o = a.get(e.geometry);
		if (!o) {
			let t = new Ae(e.geometry);
			o = new $r().fromWireframeGeometry(t), t.dispose(), a.set(e.geometry, o), i.push(o);
		}
		let s = new Qe({
			colorWrite: !1,
			depthWrite: n,
			depthTest: n,
			side: 0,
			polygonOffset: n,
			polygonOffsetFactor: 1,
			polygonOffsetUnits: 1
		});
		e.material = s, e.castShadow = !1, e.receiveShadow = !1, r.push(s);
		let c = new Xr({
			color: t.color,
			linewidth: t.thickness,
			worldUnits: !1,
			depthTest: n,
			depthWrite: !1,
			transparent: !1,
			alphaToCoverage: !0
		});
		r.push(c);
		let l = new mi(o, c);
		l.name = "AMP Wireframe", l.frustumCulled = !1, l.renderOrder = e.renderOrder + 1, e.add(l);
	}
	return {
		materials: r,
		geometries: i
	};
}
//#endregion
//#region src/author/canvas/model3d-resource-cache.ts
var gi = /* @__PURE__ */ new Map();
function _i(e, t) {
	let n = gi.get(e);
	n || (n = {
		references: 0,
		scene: t,
		disposeTimer: null
	}, gi.set(e, n)), n.references += 1, n.disposeTimer && (clearTimeout(n.disposeTimer), n.disposeTimer = null);
	let r = !1;
	return () => {
		if (r) return;
		r = !0;
		let t = gi.get(e);
		t && (t.references = Math.max(0, t.references - 1), !(t.references > 0) && (t.disposeTimer = setTimeout(() => {
			let t = gi.get(e);
			!t || t.references > 0 || (er.clear(e), vi(t.scene), gi.delete(e));
		}, 0)));
	};
}
function vi(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
	e.traverse((e) => {
		let i = e;
		if (!i.isMesh) return;
		i.geometry && t.add(i.geometry);
		let a = Array.isArray(i.material) ? i.material : [i.material];
		for (let e of a) if (e) {
			n.add(e);
			for (let t of Object.values(e)) t && typeof t == "object" && "isTexture" in t && t.isTexture === !0 && r.add(t);
		}
	}), t.forEach((e) => e.dispose()), n.forEach((e) => e.dispose()), r.forEach((e) => e.dispose());
}
//#endregion
//#region src/runtime/model3d/RuntimeModel3DView.tsx
var $ = e(), yi = {
	enabled: !0,
	bands: 4,
	strength: .7,
	smoothness: .08,
	roughnessMultiplier: 1,
	metalnessMultiplier: 1,
	opacityMultiplier: 1,
	normalScale: 1,
	ao: {
		enabled: !0,
		intensity: 1
	},
	outline: {
		enabled: !1,
		color: "#15171a",
		thickness: .018,
		opacity: 1
	}
}, bi = {
	x: 0,
	y: 28.65,
	z: 0
}, xi = {
	enabled: !1,
	color: "#22d3ee",
	thickness: 1.5
}, Si = Math.PI / 180, Ci = /* @__PURE__ */ new Map(), wi = /* @__PURE__ */ new WeakMap(), Ti = 1;
function Ei(e) {
	let t = Ci.get(e);
	if (t !== void 0) return t;
	let n = Ti++;
	return Ci.set(e, n), n;
}
function Di({ node: e, src: t, visible: n, hovered: r, presentationRef: i, onReady: a, onError: o }) {
	let s = (0, J.useRef)(null), [c, l] = (0, J.useState)(!1), u = Ei(e.id), d = Mi(e.lighting ?? "studio"), f = e.lightingIntensity ?? 1, p = e.wireframe?.enabled ?? !1, m = (0, J.useCallback)(() => {
		l(!0), a();
	}, [a]);
	return /* @__PURE__ */ (0, $.jsxs)(Je, {
		ref: s,
		index: u,
		visible: n,
		frames: Infinity,
		className: "amp-runtime-model-view",
		children: [
			/* @__PURE__ */ (0, $.jsx)(ki, {
				track: s,
				index: u
			}),
			!p && /* @__PURE__ */ (0, $.jsx)("ambientLight", { intensity: d.ambient * f }),
			!p && /* @__PURE__ */ (0, $.jsx)("directionalLight", {
				position: d.position,
				intensity: d.directional * f
			}),
			!p && e.environment && e.environment !== "none" && /* @__PURE__ */ (0, $.jsx)(zr, {
				preset: e.environment,
				background: !1,
				environmentIntensity: f
			}),
			/* @__PURE__ */ (0, $.jsx)(ji, {
				resetKey: t,
				onError: o,
				children: /* @__PURE__ */ (0, $.jsx)(J.Suspense, {
					fallback: null,
					children: /* @__PURE__ */ (0, $.jsx)(Oi, {
						node: e,
						src: t,
						visible: n,
						hovered: r,
						onReady: m
					})
				})
			}),
			/* @__PURE__ */ (0, $.jsx)(Ai, {
				track: s,
				target: i,
				index: u,
				visible: n,
				ready: c,
				dynamic: e.behaviors.autoRotate,
				revision: e
			})
		]
	});
}
function Oi({ node: e, src: t, visible: n, hovered: r, onReady: i }) {
	let { scene: a } = er(t), o = P((e) => e.size), s = e.toon ?? yi, c = e.wireframe ?? xi, l = (0, J.useMemo)(() => {
		let t = Vr(a), n = new f().setFromObject(t), r = n.isEmpty() ? new z(1, 1, 1) : n.getSize(new z()), i = n.isEmpty() ? new z() : n.getCenter(new z());
		if (t.position.sub(i), c.enabled) {
			let n = hi(t, c, e.backfaceCulling ?? !0);
			return {
				instance: t,
				dimensions: r,
				materials: n.materials,
				geometries: n.geometries,
				outline: null
			};
		}
		return {
			instance: t,
			dimensions: r,
			materials: Kr(t, s, e.materialOverride, e.backfaceCulling ?? !0),
			geometries: [],
			outline: Yr(t, s.outline ?? yi.outline)
		};
	}, [
		e.backfaceCulling,
		e.materialOverride,
		a,
		s,
		c
	]), u = Math.min(120, Math.max(10, e.camera?.fov ?? 45)), d = (0, J.useMemo)(() => Ur(l.dimensions, o, u), [
		u,
		l.dimensions,
		o
	]), p = n && e.behaviors.autoRotate && !(r && e.behaviors.pauseOnHover), m = e.behaviors.rotationSpeed ?? bi, h = e.behaviors.rotationOffset?.enabled ? e.behaviors.rotationOffset : null, g = (0, J.useRef)(null);
	return (0, J.useEffect)(() => {
		i();
	}, [i, a]), (0, J.useEffect)(() => _i(t, a), [a, t]), (0, J.useEffect)(() => () => {
		l.materials.forEach((e) => e.dispose()), l.geometries.forEach((e) => e.dispose()), l.outline?.ownedMaterials.forEach((e) => e.dispose());
	}, [l]), Be((e, t) => {
		!g.current || !p || (g.current.rotation.x += t * m.x * Si, g.current.rotation.y += t * m.y * Si, g.current.rotation.z += t * m.z * Si);
	}), /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)(rr, {
			makeDefault: !0,
			fov: u,
			near: d.near,
			far: d.far,
			position: [
				0,
				0,
				d.distance
			]
		}),
		/* @__PURE__ */ (0, $.jsx)("group", {
			rotation: h ? [
				h.x * Si,
				h.y * Si,
				h.z * Si
			] : [
				0,
				0,
				0
			],
			children: /* @__PURE__ */ (0, $.jsxs)("group", {
				ref: g,
				children: [l.outline && /* @__PURE__ */ (0, $.jsx)("primitive", {
					object: l.outline.instance,
					dispose: null
				}), /* @__PURE__ */ (0, $.jsx)("primitive", {
					object: l.instance,
					dispose: null
				})]
			})
		}),
		!c.enabled && e.shadows && e.shadows !== "none" && /* @__PURE__ */ (0, $.jsx)(Br, {
			frames: 1,
			resolution: 128,
			position: [
				0,
				-l.dimensions.y / 2,
				0
			],
			far: Math.max(.1, l.dimensions.y * 2),
			opacity: .5,
			blur: e.shadows === "soft" ? 2.25 : .35,
			scale: Math.max(l.dimensions.x, l.dimensions.z, .1) * 1.5
		})
	] });
}
function ki({ track: e, index: t }) {
	let n = P((e) => e.gl);
	return Be(() => {
		let t = e.current;
		if (!t) return;
		let r = t.getBoundingClientRect(), i = n.domElement.getBoundingClientRect(), a = Math.max(0, r.left - i.left), o = Math.max(0, i.bottom - r.bottom), s = Math.max(0, Math.min(r.right, i.right) - Math.max(r.left, i.left)), c = Math.max(0, Math.min(r.bottom, i.bottom) - Math.max(r.top, i.top));
		!s || !c || (n.setScissor(a, o, s, c), n.setScissorTest(!0), n.clear(!0, !0, !1), n.setScissorTest(!1));
	}, t - .25), null;
}
function Ai({ track: e, target: t, index: n, visible: r, ready: i, dynamic: a, revision: o }) {
	let s = P((e) => e.gl), c = (0, J.useRef)(null);
	return Be(() => {
		if (!r || !i) return;
		let n = e.current, l = t.current;
		if (!n || !l) return;
		let u = n.getBoundingClientRect(), d = s.domElement.getBoundingClientRect(), f = Math.max(1, Math.round(u.width)), p = Math.max(1, Math.round(u.height)), m = c.current;
		if (!a && m?.revision === o && m?.width === f && m?.height === p) return;
		l.width !== f && l.setAttribute("width", String(f)), l.height !== p && l.setAttribute("height", String(p));
		let h = wi.get(l);
		if (!h) {
			let e = l.getContext("2d", { willReadFrequently: !0 });
			if (!e) return;
			h = e, wi.set(l, h);
		}
		h.clearRect(0, 0, f, p);
		let g = Math.max(u.left, d.left), _ = Math.max(u.top, d.top), v = Math.min(u.right, d.right), y = Math.min(u.bottom, d.bottom);
		if (v <= g || y <= _) return;
		let b = s.domElement.width / Math.max(1, d.width), x = s.domElement.height / Math.max(1, d.height), S = f / Math.max(1, u.width), C = p / Math.max(1, u.height);
		h.drawImage(s.domElement, (g - d.left) * b, (_ - d.top) * x, (v - g) * b, (y - _) * x, (g - u.left) * S, (_ - u.top) * C, (v - g) * S, (y - _) * C), c.current = {
			revision: o,
			width: f,
			height: p
		}, l.dispatchEvent(new CustomEvent("amp-model-frame", { bubbles: !0 }));
	}, n + .25), null;
}
var ji = class extends J.Component {
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
function Mi(e) {
	switch (e) {
		case "soft": return {
			ambient: 1,
			directional: .65,
			position: [
				4,
				6,
				4
			]
		};
		case "dramatic": return {
			ambient: .2,
			directional: 2,
			position: [
				-4,
				6,
				2
			]
		};
		case "neutral": return {
			ambient: .75,
			directional: .8,
			position: [
				2,
				4,
				3
			]
		};
		case "outdoor": return {
			ambient: .9,
			directional: 1.4,
			position: [
				6,
				8,
				3
			]
		};
		case "studio": return {
			ambient: .55,
			directional: 1.25,
			position: [
				3,
				5,
				2
			]
		};
	}
}
//#endregion
export { Di as default };

//# sourceMappingURL=RuntimeModel3DView-DmVQDjBa.js.map