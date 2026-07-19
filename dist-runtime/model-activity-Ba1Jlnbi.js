import { o as e, r as t } from "./scheduler-CFRa_C8g.js";
//#region src/runtime/model3d/model-activity.ts
var n = /* @__PURE__ */ e(t(), 1), r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
function a(e, t) {
	(t ? !r.has(e) : r.has(e)) && (t ? r.add(e) : r.delete(e), i.forEach((e) => e()));
}
function o() {
	return (0, n.useSyncExternalStore)((e) => (i.add(e), () => i.delete(e)), () => r.size > 0, () => !1);
}
//#endregion
export { o as n, a as t };

//# sourceMappingURL=model-activity-Ba1Jlnbi.js.map