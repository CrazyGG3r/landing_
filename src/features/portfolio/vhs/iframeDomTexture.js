import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════════════════════
// IFRAME DOM TEXTURE  (dependency-free live-page → CanvasTexture)
// ═══════════════════════════════════════════════════════════════════════════════
//
// Hosts an arbitrary same-origin page inside an off-screen <iframe> and rasterizes
// it to a THREE.CanvasTexture on a throttled loop, so the page can be shown on a
// 3D surface and fed through the VHS shader. The iframe is essential, not
// incidental: the embedded reader owns global page state, styles, and browser
// listeners. An iframe gives it its own
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
//
// CANVAS MATERIALIZATION: a raw XMLSerializer sees <canvas> as an empty element —
// its live pixels (the .amp-runtime-model-bitmap, GL/2D scratch surfaces, …) are
// NOT part of the markup, so they'd snapshot blank. Before serializing we clone
// the document, snapshot each visible live canvas to a PNG data-URL, and swap the
// cloned canvas for an <img> carrying the canvas's own attributes + rendered box
// size — so CSS position/size/transform/opacity/z-index all survive. The live
// reader DOM is never touched (only its throwaway clone), so the direct AMP route
// is unchanged; and because we re-snapshot every CRT refresh, canvas animation
// (auto-rotation @ the configured fps) stays live. Taint / not-yet-sized canvases
// reuse the last good frame instead of flashing blank.
// ═══════════════════════════════════════════════════════════════════════════════

const XHTML_NS = 'http://www.w3.org/1999/xhtml'

export class IframeDomTexture {
  constructor({
    src,
    width = 1024,
    height = 640,
    fps = 8,
    idleFps = 8,
    activityBurstMs = 240,
    flipY = true,
  } = {}) {
    this.width = width
    this.height = height
    this.captureIntervalMs = 1000 / Math.max(1, fps)
    this.idleCaptureIntervalMs = 1000 / Math.max(1, Math.min(idleFps, fps))
    this.activityBurstMs = Math.max(0, activityBurstMs)
    this.flipY = flipY

    this._lastCaptureAt = -Infinity
    this._highRateUntil = -Infinity
    this._activityPending = false
    this._activityWindow = null
    this.highRateActive = false
    this._viewportVersion = 0
    this._presentedScrollX = 0
    this._presentedScrollY = 0
    this._pendingScrollX = 0
    this._pendingScrollY = 0
    this._visualShiftRaf = null
    this._pendingWheelX = 0
    this._pendingWheelY = 0
    this._wheelRaf = null
    this._capturing = false
    this._disposed = false
    this.hasFrame = false
    this.hasCompleteFrame = false
    this.frameVersion = 0
    this._img = null
    this._captureResolve = null

    // Per-canvas last-good PNG data-URL, keyed by the LIVE canvas element. Lets a
    // canvas that transiently taints or reports zero size reuse its prior frame
    // instead of snapshotting blank. WeakMap → entries drop when the reader unmounts.
    this._lastCanvasFrame = new WeakMap()

    // Input-forwarding state: element currently hovered (for enter/leave crossing)
    // and the element that received the last pointer-down (for click synthesis).
    this._hoverTarget = null
    this._downTarget = null
    this._markActivity = () => {
      this._activityPending = true
    }
    this._handleScroll = () => {
      this._markActivity()
      this._queueVisualScrollToViewport()
    }
    this._handleResize = () => {
      this._viewportVersion += 1
      this._markActivity()
    }

    // Cached inlined-CSS text for the snapshot ({ count, text }); rebuilt when the
    // document's stylesheet count changes. See _cssTextFor.
    this._cssCache = null

    // Host iframe. It must stay laid out at real size AND geometrically inside the
    // viewport — NOT parked at left:-99999px. The embedded reader lazy-loads its
    // 3D model via IntersectionObserver ("loads near viewport"), and IO clips a
    // target through its iframe's rect in the parent viewport: an off-screen iframe
    // reports the model as never intersecting, so it never activates and its canvas
    // stays blank. Being off-screen also makes the browser throttle the iframe's
    // rAF, stalling auto-rotation. So we pin it on-screen at 0,0 and hide it purely
    // with opacity:0 (IO ignores opacity) + pointer-events:none + z-index:-1, which
    // is visually/interactively identical to parking it off-screen.
    const iframe = document.createElement('iframe')
    iframe.setAttribute('aria-hidden', 'true')
    iframe.setAttribute('tabindex', '-1')
    iframe.style.cssText = [
      'position:fixed',
      'left:0',
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
    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,
    })
    // Prime with near-black so the VHS chain always has valid content pre-load.
    ctx.fillStyle = '#050505'
    ctx.fillRect(0, 0, width, height)
    this.canvas = canvas
    this.ctx = ctx

    const scrollScratch = document.createElement('canvas')
    scrollScratch.width = width
    scrollScratch.height = height
    this.scrollScratch = scrollScratch
    this.scrollScratchCtx = scrollScratch.getContext('2d', {
      alpha: false,
      desynchronized: true,
    })

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
    if (this._activityPending) {
      this._activityPending = false
      this._highRateUntil = now + this.activityBurstMs
    }
    this.highRateActive = now < this._highRateUntil
    const intervalMs = this.highRateActive
      ? this.captureIntervalMs
      : this.idleCaptureIntervalMs
    if (now - this._lastCaptureAt < intervalMs) return
    if (this._capturing) return
    const doc = this._safeDoc()
    if (!doc || !doc.body || doc.readyState === 'loading') return
    this._bindActivityListeners()
    this._lastCaptureAt = now
    this._capturing = true
    this._capture()
      .catch(() => {
        // Keep the previous good frame on transient serialization/decode errors.
      })
      .finally(() => {
        this._capturing = false
      })
  }

  async _capture() {
    const doc = this._safeDoc()
    if (!doc || !doc.documentElement) return
    const captureVersion = this._viewportVersion
    const includeCanvases = this.hasFrame

    const snapshot = await this._serializeDocument(doc, { includeCanvases })
    if (!snapshot?.markup || this._disposed) return
    const { markup, scrollX, scrollY } = snapshot

    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}">` +
      `<foreignObject x="0" y="0" width="100%" height="100%">${markup}</foreignObject>` +
      `</svg>`

    // SVG foreignObject decoding is most reliable from a data URL. Blob URLs
    // render blank in some browser/GPU combinations even when img.onload fires.
    const url = await this._blobDataUrl(
      new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }),
    )
    if (!url || this._disposed) return
    const img = new Image()
    this._img = img

    return new Promise((resolve) => {
      let finished = false
      const finish = () => {
        if (finished) return
        finished = true
        if (this._img === img) this._img = null
        this._captureResolve = null
        resolve()
      }
      this._captureResolve = finish
      img.onload = () => {
        if (this._disposed || captureVersion !== this._viewportVersion) {
          finish()
          return
        }
        try {
          const currentScroll = this._readViewportScroll(doc)
          const drawX = scrollX - currentScroll.x
          const drawY = scrollY - currentScroll.y
          this.ctx.fillStyle = '#050505'
          this.ctx.fillRect(0, 0, this.width, this.height)
          this.ctx.drawImage(img, drawX, drawY, this.width, this.height)
          this.texture.needsUpdate = true
          this.frameVersion = (this.frameVersion || 0) + 1
          this.hasFrame = true
          this._presentedScrollX = currentScroll.x
          this._presentedScrollY = currentScroll.y
          if (includeCanvases) {
            this.hasCompleteFrame = true
          } else {
            // Let the lightweight layout frame appear immediately, then start
            // the lossless live-canvas capture on the very next animation frame.
            this._lastCaptureAt = -Infinity
          }
          this._pendingScrollX = currentScroll.x
          this._pendingScrollY = currentScroll.y
        } catch {
          // Tainted / decode issue — keep the previous good frame silently.
        }
        finish()
      }
      img.onerror = finish
      img.src = url
    })
  }

  _blobDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : null)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  // Clone the live document, materialize its visible canvases into <img> snapshots
  // on the clone, and serialize that. The live DOM is never mutated. Returns an
  // XHTML-namespaced string ready to drop inside <foreignObject>, or '' on failure.
  async _serializeDocument(doc, { includeCanvases = true } = {}) {
    const liveRoot = doc.documentElement
    const clone = liveRoot.cloneNode(true)

    // Inline the page's stylesheets. A rasterized SVG <foreignObject> runs in a
    // restricted mode that can't load external resources, so <link rel=stylesheet>
    // rules are simply absent from the snapshot. In dev Vite injects CSS as inline
    // <style> (captured fine), but a production build serves it via <link> — the
    // reader's class CSS then vanishes and, e.g., `.amp-runtime-stage`'s
    // `transform-origin:0 0` reverts to the 50% 50% default, so its inline
    // `transform: scale()` drifts the whole picture down-right. Consolidating all
    // accessible rules into one inline <style> makes the snapshot faithful in both.
    try {
      this._inlineStylesheets(clone, doc)
    } catch {
      /* non-fatal — snapshot may be unstyled but is better than dropped */
    }

    // Best-effort — if materialization throws we still serialize the raw clone
    // (canvases blank) rather than dropping the whole frame.
    if (includeCanvases) {
      try {
        await this._materializeCanvases(liveRoot, clone)
      } catch {
        /* fall through with un-materialized clone */
      }
    }

    // cloneNode/XMLSerializer preserve markup, not the iframe's live viewport
    // scroll position. Without mirroring that offset, the CRT snapshot keeps
    // painting the top of the document even though the hosted reader has
    // scrolled; viewport-aware model canvases then move independently and look
    // clipped. Relatively offsetting the cloned body reproduces window scrolling
    // while leaving position:fixed descendants anchored to the viewport.
    const { x: scrollX, y: scrollY } = this._readViewportScroll(doc)
    try {
      this._applyViewportScroll(clone, scrollX, scrollY)
    } catch {
      /* non-fatal — an unscrolled snapshot is better than a dropped frame */
    }

    let markup = new XMLSerializer().serializeToString(clone)
    // Ensure the root carries the XHTML namespace so it parses inside <svg>.
    if (markup.indexOf('xmlns=') === -1) {
      markup = markup.replace(/^<html/i, `<html xmlns="${XHTML_NS}"`)
    }
    return { markup, scrollX, scrollY }
  }

  _readViewportScroll(doc = this._safeDoc()) {
    const scrollingElement = doc?.scrollingElement || doc?.documentElement
    return {
      x: scrollingElement?.scrollLeft || 0,
      y: scrollingElement?.scrollTop || 0,
    }
  }

  // Public, same-origin scroll metrics for synchronizing an external animation
  // with the complete embedded document. Live measurements keep the percentage
  // correct after viewport resizes and late layout changes in the AMP project.
  getScrollMetrics() {
    const doc = this._safeDoc()
    const scrollingElement = doc?.scrollingElement || doc?.documentElement
    if (!scrollingElement) {
      return { scrollTop: 0, scrollHeight: 0, clientHeight: 0, progress: 0 }
    }

    const scrollTop = Math.max(0, scrollingElement.scrollTop || 0)
    const scrollHeight = Math.max(0, scrollingElement.scrollHeight || 0)
    const clientHeight = Math.max(
      0,
      scrollingElement.clientHeight || this._safeWin()?.innerHeight || 0,
    )
    const maxScroll = Math.max(0, scrollHeight - clientHeight)
    const progress = maxScroll > 0
      ? THREE.MathUtils.clamp(scrollTop / maxScroll, 0, 1)
      : 0

    return { scrollTop, scrollHeight, clientHeight, progress }
  }

  _applyViewportScroll(clone, scrollX, scrollY) {
    if (!scrollX && !scrollY) return

    const body = clone.querySelector('body')
    if (!body) return

    const existingStyle = body.getAttribute('style') || ''
    const separator = existingStyle && !existingStyle.trim().endsWith(';') ? ';' : ''
    body.setAttribute(
      'style',
      `${existingStyle}${separator}position:relative;left:${-scrollX}px;top:${-scrollY}px;`,
    )
  }

  // Replace the clone's external <link>/<style> with ONE inline <style> holding
  // every accessible rule, in document order, so the snapshot cascade matches the
  // live page regardless of how CSS was delivered.
  _inlineStylesheets(clone, doc) {
    const cssText = this._cssTextFor(doc)
    if (!cssText) return
    // Drop link stylesheets (never load in the snapshot) and the original <style>
    // tags (their rules are re-emitted below) for a clean, deterministic cascade.
    clone.querySelectorAll('link[rel="stylesheet"], style').forEach((el) => el.remove())
    const head = clone.querySelector('head') || clone
    const style = (clone.ownerDocument || document).createElementNS(XHTML_NS, 'style')
    style.textContent = cssText
    head.appendChild(style)
  }

  // Concatenated cssText of every readable stylesheet, cached and rebuilt only when
  // the sheet count changes (CSS is static per-frame; async chunks may add sheets).
  _cssTextFor(doc) {
    const sheets = doc.styleSheets
    const adopted = doc.adoptedStyleSheets
    const count = (sheets ? sheets.length : 0) + (adopted ? adopted.length : 0)
    if (this._cssCache && this._cssCache.count === count) return this._cssCache.text

    const parts = []
    const read = (sheet) => {
      let rules = null
      try { rules = sheet.cssRules } catch { return } // cross-origin — unreadable
      if (!rules) return
      for (let i = 0; i < rules.length; i++) parts.push(rules[i].cssText)
    }
    if (sheets) for (let i = 0; i < sheets.length; i++) read(sheets[i])
    if (adopted) for (let i = 0; i < adopted.length; i++) read(adopted[i])

    const text = parts.join('\n')
    this._cssCache = { count, text }
    return text
  }

  // Walk the live and cloned canvas lists in lock-step (cloneNode preserves order
  // exactly, so index i is the same element in both trees) and replace each
  // capturable cloned canvas with an <img> of the live canvas's current pixels.
  async _materializeCanvases(liveRoot, cloneRoot) {
    const liveCanvases = liveRoot.querySelectorAll('canvas')
    if (!liveCanvases.length) return
    const cloneCanvases = cloneRoot.querySelectorAll('canvas')
    const win = this._safeWin() || window
    const ownerDoc = cloneRoot.ownerDocument || document

    for (let i = 0; i < liveCanvases.length; i++) {
      const live = liveCanvases[i]
      const cloned = cloneCanvases[i]
      if (!cloned || !cloned.parentNode) continue
      if (!this._isCanvasCapturable(live, win)) continue

      const dataUrl = await this._canvasDataUrl(live)
      if (!dataUrl) continue
      this._lastCanvasFrame.set(live, dataUrl)

      const img = ownerDoc.createElementNS(XHTML_NS, 'img')
      // Carry over the canvas's own attributes so page CSS that targets it (e.g.
      // .amp-runtime-model-bitmap) keeps matching, and its inline
      // position/transform/opacity/z-index survive verbatim — EXCEPT width/height.
      // On a <canvas> those are drawing-buffer dimensions (here already scaled to
      // device px by the reader); as <img> layout attributes they'd fight the
      // element's real CSS box and mis-size the picture.
      for (const attr of cloned.attributes) {
        const name = attr.name
        if (name === 'src' || name === 'width' || name === 'height') continue
        img.setAttribute(name, attr.value)
      }
      // Size the replacement in the canvas's LOCAL (pre-transform) layout box via
      // offsetWidth/Height. These ignore ancestor CSS transforms, so when the img
      // is reinserted under the same (often scaled — the reader wraps everything in
      // a `transform: scale()` stage) ancestor it scales exactly once, matching the
      // canvas. getBoundingClientRect would bake in that scale and then get scaled
      // AGAIN by the ancestor → the model renders too small.
      const w = live.offsetWidth || live.width
      const h = live.offsetHeight || live.height
      const baseStyle = cloned.getAttribute('style') || ''
      const sep = baseStyle && !baseStyle.trim().endsWith(';') ? ';' : ''
      img.setAttribute('style', `${baseStyle}${sep}width:${w}px;height:${h}px;box-sizing:border-box;`)
      img.setAttribute('src', dataUrl)
      cloned.parentNode.replaceChild(img, cloned)
    }
  }

  _canvasDataUrl(canvas) {
    const fallback = this._lastCanvasFrame.get(canvas) || null
    if (typeof canvas.toBlob !== 'function') {
      try {
        return Promise.resolve(canvas.toDataURL('image/png'))
      } catch {
        return Promise.resolve(fallback)
      }
    }

    return new Promise((resolve) => {
      try {
        const handleBlob = (blob) => {
          if (!blob || this._disposed) {
            resolve(fallback)
            return
          }

          const reader = new FileReader()
          reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : fallback)
          reader.onerror = () => resolve(fallback)
          reader.readAsDataURL(blob)
        }

        canvas.toBlob(handleBlob, 'image/png')
      } catch {
        // Tainted (cross-origin drawImage / GL): reuse the last good frame.
        resolve(fallback)
      }
    })
  }

  // A canvas is worth snapshotting only if it has a real drawing buffer AND is
  // actually laid out & visible — this skips the hidden compositor/staging
  // canvases readers keep around, and canvases not yet sized on first frames.
  _isCanvasCapturable(canvas, win) {
    if (!canvas.width || !canvas.height) return false
    let style = null
    try {
      style = win.getComputedStyle(canvas)
    } catch {
      /* getComputedStyle can throw in odd realms — fall back to geometry only */
    }
    if (style) {
      if (style.display === 'none' || style.visibility === 'hidden') return false
      if (parseFloat(style.opacity) === 0) return false
    }
    const rect = canvas.getBoundingClientRect()
    return rect.width >= 1 && rect.height >= 1
  }

  _safeDoc() {
    try {
      return this.iframe?.contentDocument || this.iframe?.contentWindow?.document || null
    } catch {
      return null // cross-origin (shouldn't happen — same-origin route)
    }
  }

  // ── input forwarding ──────────────────────────────────────────────────────
  // The hosted reader is driven by PointerEvents (hover, press) and real `click`s,
  // and scrolls its own window. A bare MouseEvent satisfies none of that: pointer
  // listeners never fire (and some check e.pointerType, which a MouseEvent lacks),
  // and the browser only synthesizes `click` from genuine input — never from a
  // dispatched down/up. So we send the full pointer+mouse pair, track hover
  // enter/leave, synthesize `click` on release, and scroll the frame directly.

  // Map (u, v) three.js surface UV (origin bottom-left) → iframe top-left px.
  _toFramePoint(u, v) {
    const x = THREE.MathUtils.clamp(u, 0, 1) * this.width
    const y = (this.flipY ? 1 - THREE.MathUtils.clamp(v, 0, 1) : THREE.MathUtils.clamp(v, 0, 1)) * this.height
    return { x, y }
  }

  _dispatch(el, Ctor, type, opts) {
    if (!Ctor || !el) return
    try { el.dispatchEvent(new Ctor(type, opts)) } catch { /* noop */ }
  }

  // kind: 'move' | 'down' | 'up'. Dispatches the matching PointerEvent AND
  // MouseEvent (readers listen for either), maintains hover enter/leave as the
  // hit target changes, and synthesizes `click` when an 'up' lands on the element
  // that received the 'down' — mirroring the browser so links/buttons activate.
  forwardPointer(kind, u, v, { buttons = 0 } = {}) {
    if (this._disposed) return
    const win = this._safeWin()
    const doc = this._safeDoc()
    if (!win || !doc) return

    const { x, y } = this._toFramePoint(u, v)
    let target = null
    try { target = doc.elementFromPoint(x, y) } catch { /* noop */ }
    if (!target) target = doc.body || doc.documentElement
    if (!target) return
    this._markActivity()

    const PointerCtor = win.PointerEvent || window.PointerEvent || null
    const MouseCtor = win.MouseEvent || window.MouseEvent
    const mouse = { clientX: x, clientY: y, bubbles: true, cancelable: true, view: win, buttons }
    const pointer = { ...mouse, pointerId: 1, pointerType: 'mouse', isPrimary: true }

    if (kind === 'move') {
      if (this._hoverTarget !== target) {
        this._emitCrossing(this._hoverTarget, target, mouse, pointer, PointerCtor, MouseCtor)
        this._hoverTarget = target
      }
      this._dispatch(target, PointerCtor, 'pointermove', pointer)
      this._dispatch(target, MouseCtor, 'mousemove', mouse)
    } else if (kind === 'down') {
      this._dispatch(target, PointerCtor, 'pointerdown', pointer)
      this._dispatch(target, MouseCtor, 'mousedown', mouse)
      this._downTarget = target
    } else if (kind === 'up') {
      this._dispatch(target, PointerCtor, 'pointerup', pointer)
      this._dispatch(target, MouseCtor, 'mouseup', mouse)
      // A click is a down+up on the SAME element; synthesize it (the browser won't).
      if (target === this._downTarget) {
        this._dispatch(target, MouseCtor, 'click', { ...mouse, detail: 1 })
      }
      this._downTarget = null
    }
  }

  // Fire out/leave on the element being left and over/enter on the newly entered
  // one. out/over bubble; enter/leave don't — so dispatch the latter up the
  // ancestor chain (stopping at the common ancestor) so a hover handler bound to
  // the reader ROOT (not the deep hit target) still sees the transition.
  _emitCrossing(from, to, mouse, pointer, PointerCtor, MouseCtor) {
    if (from) {
      this._dispatch(from, PointerCtor, 'pointerout', pointer)
      this._dispatch(from, MouseCtor, 'mouseout', mouse)
      for (let el = from; el && el.nodeType === 1 && !(to && el.contains(to)); el = el.parentElement) {
        this._dispatch(el, PointerCtor, 'pointerleave', { ...pointer, bubbles: false })
        this._dispatch(el, MouseCtor, 'mouseleave', { ...mouse, bubbles: false })
      }
    }
    if (to) {
      this._dispatch(to, PointerCtor, 'pointerover', pointer)
      this._dispatch(to, MouseCtor, 'mouseover', mouse)
      for (let el = to; el && el.nodeType === 1 && !(from && el.contains(from)); el = el.parentElement) {
        this._dispatch(el, PointerCtor, 'pointerenter', { ...pointer, bubbles: false })
        this._dispatch(el, MouseCtor, 'mouseenter', { ...mouse, bubbles: false })
      }
    }
  }

  // Pointer left the display entirely — clear hover so JS hover states reset
  // (e.g. the reader's model resumes auto-rotate).
  forwardPointerLeave() {
    if (this._disposed || !this._hoverTarget) return
    const win = this._safeWin()
    if (win) {
      const PointerCtor = win.PointerEvent || window.PointerEvent || null
      const MouseCtor = win.MouseEvent || window.MouseEvent
      const mouse = { clientX: 0, clientY: 0, bubbles: true, cancelable: true, view: win, buttons: 0 }
      const pointer = { ...mouse, pointerId: 1, pointerType: 'mouse', isPrimary: true }
      this._emitCrossing(this._hoverTarget, null, mouse, pointer, PointerCtor, MouseCtor)
    }
    this._hoverTarget = null
    this._downTarget = null
    this._markActivity()
  }

  // Scroll the hosted document. Synthetic `wheel` events don't actually scroll
  // (only genuine input does), so drive the frame's own scroll position directly.
  forwardWheel(deltaX, deltaY) {
    if (this._disposed) return
    this._markActivity()
    this._pendingWheelX += Number.isFinite(deltaX) ? deltaX : 0
    this._pendingWheelY += Number.isFinite(deltaY) ? deltaY : 0
    if (this._wheelRaf !== null) return

    this._wheelRaf = requestAnimationFrame(() => {
      this._wheelRaf = null
      if (this._disposed) return
      const win = this._safeWin()
      if (!win) return

      const x = this._pendingWheelX
      const y = this._pendingWheelY
      this._pendingWheelX = 0
      this._pendingWheelY = 0
      try { win.scrollBy(x, y) } catch { /* noop */ }
      this._queueVisualScrollToViewport()
    })
  }

  _queueVisualScrollToViewport() {
    if (!this.hasFrame) return
    const { x, y } = this._readViewportScroll()
    this._pendingScrollX = x
    this._pendingScrollY = y
    if (this._visualShiftRaf !== null) return
    this._visualShiftRaf = requestAnimationFrame(() => this._applyVisualScroll())
  }

  _applyVisualScroll() {
    this._visualShiftRaf = null
    if (this._disposed || !this.hasFrame) return

    const targetX = this._pendingScrollX
    const targetY = this._pendingScrollY
    const shiftX = Math.trunc(targetX - this._presentedScrollX)
    const shiftY = Math.trunc(targetY - this._presentedScrollY)
    if (!shiftX && !shiftY) return

    const scratch = this.scrollScratch
    const scratchCtx = this.scrollScratchCtx
    scratchCtx.fillStyle = '#fff'
    scratchCtx.fillRect(0, 0, this.width, this.height)
    if (Math.abs(shiftX) < this.width && Math.abs(shiftY) < this.height) {
      scratchCtx.drawImage(this.canvas, -shiftX, -shiftY)
    }
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.drawImage(scratch, 0, 0)
    this.texture.needsUpdate = true
    this.frameVersion = (this.frameVersion || 0) + 1
    this._presentedScrollX += shiftX
    this._presentedScrollY += shiftY
  }

  _bindActivityListeners() {
    const win = this._safeWin()
    if (!win || win === this._activityWindow) return
    if (this._activityWindow) {
      this._activityWindow.removeEventListener('scroll', this._handleScroll)
      this._activityWindow.removeEventListener('resize', this._handleResize)
    }
    win.addEventListener('scroll', this._handleScroll, { passive: true })
    win.addEventListener('resize', this._handleResize, { passive: true })
    this._activityWindow = win
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
    if (this._visualShiftRaf !== null) {
      cancelAnimationFrame(this._visualShiftRaf)
      this._visualShiftRaf = null
    }
    if (this._wheelRaf !== null) {
      cancelAnimationFrame(this._wheelRaf)
      this._wheelRaf = null
    }
    if (this._activityWindow) {
      this._activityWindow.removeEventListener('scroll', this._handleScroll)
      this._activityWindow.removeEventListener('resize', this._handleResize)
      this._activityWindow = null
    }
    if (this._img) {
      this._img.onload = null
      this._img.onerror = null
      this._img.src = ''
    }
    this._captureResolve?.()
    this._captureResolve = null
    this._img = null
    this.scrollScratch = null
    this.scrollScratchCtx = null
    this.texture?.dispose()
    if (this.iframe && this.iframe.parentNode) {
      this.iframe.parentNode.removeChild(this.iframe)
    }
    this.iframe = null
  }
}
