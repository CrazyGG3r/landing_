import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════════════════════
// IFRAME DOM TEXTURE  (dependency-free live-page → CanvasTexture)
// ═══════════════════════════════════════════════════════════════════════════════
//
// Hosts an arbitrary same-origin page inside an off-screen <iframe> and rasterizes
// it to a THREE.CanvasTexture on a throttled loop, so the page can be shown on a
// 3D surface and fed through the VHS shader. The iframe is essential, not
// incidental: the page we display (NotFound → TextPressure) injects GLOBAL CSS,
// hijacks document.title, and binds window listeners. An iframe gives it its own
// document/window so none of that leaks into the host app, and a clean 0,0-origin
// viewport so forwarded pointer coordinates map 1:1.
//
// Rasterization is the standard SVG <foreignObject> snapshot (no external deps):
// serialize the iframe document, wrap it in an SVG, decode it through an <img>,
// and draw that to a 2D canvas. It captures live inline styles (so GSAP-driven
// transforms/font-variation are seen), runs fully async (the decode never blocks
// the 3D frame), and degrades gracefully — if a capture throws (taint) the last
// good frame is kept. Web-fonts loaded via FontFace/CDN won't resolve inside the
// snapshot, so text falls back a face; acceptable for a placeholder surface.
// ═══════════════════════════════════════════════════════════════════════════════

const XHTML_NS = 'http://www.w3.org/1999/xhtml'

export class IframeDomTexture {
  constructor({ src, width = 1024, height = 640, fps = 12, flipY = true } = {}) {
    this.width = width
    this.height = height
    this.captureIntervalMs = 1000 / Math.max(1, fps)
    this.flipY = flipY

    this._lastCaptureAt = -Infinity
    this._capturing = false
    this._disposed = false

    // Off-screen host iframe. Kept laid-out (real size) but visually parked far
    // off-screen; pointer-events off so it never intercepts host interaction.
    const iframe = document.createElement('iframe')
    iframe.setAttribute('aria-hidden', 'true')
    iframe.setAttribute('tabindex', '-1')
    iframe.style.cssText = [
      'position:fixed',
      'left:-99999px',
      'top:0',
      `width:${width}px`,
      `height:${height}px`,
      'border:0',
      'margin:0',
      'padding:0',
      'opacity:0',
      'pointer-events:none',
      'z-index:-1',
    ].join(';')
    iframe.src = src
    document.body.appendChild(iframe)
    this.iframe = iframe

    // Rasterization target + texture.
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    // Prime with near-black so the VHS chain always has valid content pre-load.
    ctx.fillStyle = '#050505'
    ctx.fillRect(0, 0, width, height)
    this.canvas = canvas
    this.ctx = ctx

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = false
    this.texture = texture
  }

  // Throttled tick — call every frame; it self-limits to the configured fps.
  // Gated on document readiness (not the iframe 'load' event): the hosted page
  // pulls external subresources — a CDN font/script — that can keep 'load' from
  // ever firing in some environments, but its DOM is snapshot-able well before.
  update(nowMs) {
    if (this._disposed) return
    const now = typeof nowMs === 'number' ? nowMs : performance.now()
    if (now - this._lastCaptureAt < this.captureIntervalMs) return
    if (this._capturing) return
    const doc = this._safeDoc()
    if (!doc || !doc.body || doc.readyState === 'loading') return
    this._lastCaptureAt = now
    this._capture()
  }

  _capture() {
    const doc = this._safeDoc()
    if (!doc || !doc.documentElement) return

    let markup
    try {
      markup = new XMLSerializer().serializeToString(doc.documentElement)
    } catch {
      return
    }
    // Ensure the root carries the XHTML namespace so it parses inside <svg>.
    if (markup.indexOf('xmlns=') === -1) {
      markup = markup.replace(/^<html/i, `<html xmlns="${XHTML_NS}"`)
    }

    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}">` +
      `<foreignObject x="0" y="0" width="100%" height="100%">${markup}</foreignObject>` +
      `</svg>`

    const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
    // A FRESH Image per capture — reusing one <img> across rapid data-URL
    // reassignments proved unreliable (onload could be dropped, wedging the
    // in-flight guard). One image per snapshot is cheap and robust.
    const img = new Image()

    this._capturing = true
    img.onload = () => {
      if (this._disposed) return
      try {
        this.ctx.fillStyle = '#050505'
        this.ctx.fillRect(0, 0, this.width, this.height)
        this.ctx.drawImage(img, 0, 0, this.width, this.height)
        this.texture.needsUpdate = true
      } catch {
        // Tainted / decode issue — keep the previous good frame silently.
      }
      this._capturing = false
    }
    img.onerror = () => {
      this._capturing = false
    }
    img.src = url
  }

  _safeDoc() {
    try {
      return this.iframe?.contentDocument || this.iframe?.contentWindow?.document || null
    } catch {
      return null // cross-origin (shouldn't happen — same-origin route)
    }
  }

  // Forward a pointer to the hosted page. (u, v) are three.js UV coords on the
  // display surface (origin bottom-left); we map them to the iframe's top-left
  // pixel space and dispatch a realm-native event so in-frame listeners fire.
  forwardPointer(type, u, v, { buttons = 0 } = {}) {
    if (this._disposed) return
    const win = this._safeWin()
    const doc = this._safeDoc()
    if (!win || !doc) return

    const x = THREE.MathUtils.clamp(u, 0, 1) * this.width
    const y = (this.flipY ? 1 - THREE.MathUtils.clamp(v, 0, 1) : THREE.MathUtils.clamp(v, 0, 1)) * this.height

    const MouseEventCtor = win.MouseEvent || window.MouseEvent
    const ev = new MouseEventCtor(type, {
      clientX: x,
      clientY: y,
      bubbles: true,
      cancelable: true,
      view: win,
      buttons,
    })

    // NotFound/TextPressure listens on the iframe window; dispatch there. Also
    // route through the element under the point so element-level handlers on
    // future placeholder pages work too.
    try {
      const el = doc.elementFromPoint(x, y)
      if (el) el.dispatchEvent(ev)
      else win.dispatchEvent(ev)
    } catch {
      try { win.dispatchEvent(ev) } catch { /* noop */ }
    }
  }

  _safeWin() {
    try {
      return this.iframe?.contentWindow || null
    } catch {
      return null
    }
  }

  dispose() {
    this._disposed = true
    if (this._img) {
      this._img.onload = null
      this._img.onerror = null
      this._img.src = ''
    }
    this.texture?.dispose()
    if (this.iframe && this.iframe.parentNode) {
      this.iframe.parentNode.removeChild(this.iframe)
    }
    this.iframe = null
  }
}
