(() => {
  if (globalThis.__projectZamanUiInstalled) return;
  globalThis.__projectZamanUiInstalled = true;

  const mobileQuery = window.matchMedia("(max-width: 800px)");
  const graphIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <circle cx="6" cy="6" r="2.2"></circle>
      <circle cx="18" cy="6" r="2.2"></circle>
      <circle cx="12" cy="18" r="2.2"></circle>
      <path d="m7.8 7.3 2.9 8.4M16.2 7.3l-2.9 8.4M8.2 6h7.6"></path>
    </svg>`;
  const closeIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18"></path>
    </svg>`;
  const resetIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M4 4v6h6M20 20v-6h-6"></path>
      <path d="M5.5 15a7.5 7.5 0 0 0 12.2 2.7L20 15M4 9l2.3-2.7A7.5 7.5 0 0 1 18.5 9"></path>
    </svg>`;

  let imageViewer = null;

  function normalizedText(value) {
    return value.replace(/\s+/g, " ").trim().toLocaleLowerCase();
  }

  function markRedundantMetadata() {
    const articleTitle = document.querySelector(".article-title");
    const article = document.querySelector(".center article .markdown-preview-view");
    if (!article) return;

    const firstHeading = article.querySelector(":scope > h1");
    if (
      articleTitle &&
      firstHeading &&
      normalizedText(articleTitle.textContent ?? "") ===
        normalizedText(firstHeading.textContent ?? "")
    ) {
      firstHeading.classList.add("projectzaman-redundant-title");
      firstHeading.setAttribute("aria-hidden", "true");
    }

    if (!document.querySelector(".note-properties")) return;
    for (const paragraph of article.querySelectorAll(":scope > p")) {
      const label = paragraph.querySelector(":scope > strong:first-child");
      if (normalizedText(label?.textContent ?? "") === "tags:") {
        paragraph.classList.add("projectzaman-redundant-tags");
        paragraph.setAttribute("aria-hidden", "true");
        break;
      }
    }
  }

  function initializeProperties() {
    for (const details of document.querySelectorAll("details.note-properties")) {
      if (details.dataset.projectzamanMobileInitialized) continue;
      details.dataset.projectzamanMobileInitialized = "true";
      if (mobileQuery.matches) details.open = false;
    }
  }

  function isViewableImage(image) {
    return Boolean(
      image.closest(".center article .markdown-preview-view") &&
        !image.closest("pre, code, .mermaid, .mermaid-content") &&
        !image.classList.contains("projectzaman-no-viewer"),
    );
  }

  function initializeImages() {
    const images = document.querySelectorAll(
      ".center article .markdown-preview-view img",
    );
    for (const image of images) {
      if (!isViewableImage(image)) continue;
      image.classList.add("projectzaman-viewable-image");
      image.tabIndex = 0;
      image.setAttribute("aria-haspopup", "dialog");
      image.setAttribute(
        "aria-label",
        image.alt ? `Open image: ${image.alt}` : "Open image viewer",
      );
    }
  }

  function ensureImageViewer() {
    if (imageViewer?.overlay.isConnected) return imageViewer;

    const overlay = document.createElement("div");
    overlay.className = "projectzaman-image-viewer";
    overlay.hidden = true;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Image viewer");

    const viewport = document.createElement("div");
    viewport.className = "projectzaman-image-viewport";

    const media = document.createElement("img");
    media.className = "projectzaman-image-media";
    media.alt = "";
    media.draggable = false;
    media.decoding = "async";
    viewport.appendChild(media);

    const close = document.createElement("button");
    close.type = "button";
    close.className = "projectzaman-image-close";
    close.setAttribute("aria-label", "Close image viewer");
    close.innerHTML = closeIcon;

    const controls = document.createElement("div");
    controls.className = "projectzaman-image-controls";
    controls.setAttribute("aria-label", "Image zoom controls");

    const zoomOut = document.createElement("button");
    zoomOut.type = "button";
    zoomOut.setAttribute("aria-label", "Zoom image out");
    zoomOut.textContent = "−";

    const reset = document.createElement("button");
    reset.type = "button";
    reset.setAttribute("aria-label", "Reset image zoom");
    reset.innerHTML = resetIcon;

    const zoomIn = document.createElement("button");
    zoomIn.type = "button";
    zoomIn.setAttribute("aria-label", "Zoom image in");
    zoomIn.textContent = "+";

    controls.append(zoomOut, reset, zoomIn);

    const caption = document.createElement("div");
    caption.className = "projectzaman-image-caption";
    caption.id = "projectzaman-image-caption";
    overlay.setAttribute("aria-describedby", caption.id);
    overlay.append(viewport, close, caption, controls);
    document.body.appendChild(overlay);

    const pointers = new Map();
    const state = {
      origin: null,
      scale: 1,
      x: 0,
      y: 0,
      pinch: null,
    };

    function clampScale(value) {
      return Math.min(6, Math.max(1, value));
    }

    function applyTransform() {
      if (state.scale <= 1) {
        state.scale = 1;
        state.x = 0;
        state.y = 0;
      } else {
        const maxX = (viewport.clientWidth * (state.scale - 1)) / 2;
        const maxY = (viewport.clientHeight * (state.scale - 1)) / 2;
        state.x = Math.min(maxX, Math.max(-maxX, state.x));
        state.y = Math.min(maxY, Math.max(-maxY, state.y));
      }
      media.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.scale})`;
      overlay.classList.toggle("is-zoomed", state.scale > 1);
    }

    function zoomTo(nextScale, clientX, clientY) {
      const previous = state.scale;
      const next = clampScale(nextScale);
      const rect = viewport.getBoundingClientRect();
      const pointX = clientX - (rect.left + rect.width / 2);
      const pointY = clientY - (rect.top + rect.height / 2);
      const ratio = next / previous;
      state.x = pointX - (pointX - state.x) * ratio;
      state.y = pointY - (pointY - state.y) * ratio;
      state.scale = next;
      applyTransform();
    }

    function zoomFromCenter(factor) {
      const rect = viewport.getBoundingClientRect();
      zoomTo(
        state.scale * factor,
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      );
    }

    function resetTransform() {
      state.scale = 1;
      state.x = 0;
      state.y = 0;
      state.pinch = null;
      pointers.clear();
      applyTransform();
    }

    function pointDistance(points) {
      return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
    }

    function pointMidpoint(points) {
      return {
        x: (points[0].x + points[1].x) / 2,
        y: (points[0].y + points[1].y) / 2,
      };
    }

    viewport.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      pointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
        previousX: event.clientX,
        previousY: event.clientY,
      });
      viewport.setPointerCapture?.(event.pointerId);
      if (pointers.size === 2) {
        const points = [...pointers.values()];
        state.pinch = {
          distance: pointDistance(points),
          midpoint: pointMidpoint(points),
          scale: state.scale,
          x: state.x,
          y: state.y,
        };
      }
    });

    viewport.addEventListener("pointermove", (event) => {
      const point = pointers.get(event.pointerId);
      if (!point) return;
      event.preventDefault();
      point.x = event.clientX;
      point.y = event.clientY;

      if (pointers.size >= 2 && state.pinch) {
        const points = [...pointers.values()].slice(0, 2);
        const midpoint = pointMidpoint(points);
        state.scale = clampScale(
          state.pinch.scale * (pointDistance(points) / state.pinch.distance),
        );
        state.x = state.pinch.x + midpoint.x - state.pinch.midpoint.x;
        state.y = state.pinch.y + midpoint.y - state.pinch.midpoint.y;
      } else if (state.scale > 1) {
        state.x += point.x - point.previousX;
        state.y += point.y - point.previousY;
      }

      point.previousX = point.x;
      point.previousY = point.y;
      applyTransform();
    });

    function releasePointer(event) {
      pointers.delete(event.pointerId);
      if (pointers.size < 2) state.pinch = null;
      for (const point of pointers.values()) {
        point.previousX = point.x;
        point.previousY = point.y;
      }
    }

    viewport.addEventListener("pointerup", releasePointer);
    viewport.addEventListener("pointercancel", releasePointer);
    viewport.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        zoomTo(
          state.scale * Math.exp(-event.deltaY * 0.0015),
          event.clientX,
          event.clientY,
        );
      },
      { passive: false },
    );
    viewport.addEventListener("dblclick", (event) => {
      event.preventDefault();
      if (state.scale > 1) resetTransform();
      else zoomTo(2.5, event.clientX, event.clientY);
    });

    zoomOut.addEventListener("click", () => zoomFromCenter(1 / 1.35));
    reset.addEventListener("click", resetTransform);
    zoomIn.addEventListener("click", () => zoomFromCenter(1.35));
    close.addEventListener("click", () => closeImageViewer(true));
    media.addEventListener("load", resetTransform);

    imageViewer = {
      overlay,
      viewport,
      media,
      caption,
      close,
      state,
      resetTransform,
    };
    return imageViewer;
  }

  function openImageViewer(source) {
    const viewer = ensureImageViewer();
    viewer.state.origin = source;
    viewer.caption.textContent = source.alt || "";
    viewer.caption.hidden = !source.alt;
    viewer.media.src = source.currentSrc || source.src;
    viewer.media.alt = source.alt || "Expanded image";
    viewer.overlay.hidden = false;
    document.documentElement.classList.add("projectzaman-image-open");
    const quartzRoot = document.querySelector("#quartz-root");
    if (quartzRoot) quartzRoot.inert = true;
    viewer.resetTransform();
    requestAnimationFrame(() => viewer.close.focus({ preventScroll: true }));
  }

  function closeImageViewer(restoreFocus = false) {
    if (!imageViewer || imageViewer.overlay.hidden) return;
    const origin = imageViewer.state.origin;
    imageViewer.overlay.hidden = true;
    imageViewer.media.removeAttribute("src");
    imageViewer.caption.textContent = "";
    imageViewer.resetTransform();
    document.documentElement.classList.remove("projectzaman-image-open");
    const quartzRoot = document.querySelector("#quartz-root");
    if (quartzRoot) quartzRoot.inert = false;
    if (restoreFocus && origin?.isConnected) origin.focus({ preventScroll: true });
    imageViewer.state.origin = null;
  }

  function setGraphOpen(outer, launcher, open, restoreFocus = false) {
    outer.classList.toggle("active", open);
    outer.setAttribute("aria-hidden", String(!open));
    launcher?.setAttribute("aria-expanded", String(open));
    document.documentElement.classList.toggle("projectzaman-graph-open", open);
    if (!open && restoreFocus) launcher?.focus({ preventScroll: true });
  }

  function setGraphLauncherLoading(launcher, loading) {
    launcher.disabled = loading;
    launcher.classList.toggle("is-loading", loading);
    launcher.setAttribute("aria-busy", String(loading));
    launcher.setAttribute(
      "aria-label",
      loading ? "Loading graph view" : "Open graph view",
    );
  }

  function closeGraph(outer, launcher, nativeLauncher, restoreFocus = false) {
    if (outer.classList.contains("active")) nativeLauncher.click();
    requestAnimationFrame(() => {
      setGraphOpen(outer, launcher, false, restoreFocus);
    });
  }

  function graphPath(id) {
    const base = document.body?.dataset?.basepath ?? "";
    const slug = String(id ?? "")
      .split("/")
      .filter((segment) => segment && segment !== "." && segment !== "..")
      .map(encodeURIComponent)
      .join("/");
    return `${base}/${slug}`.replace(/\/{2,}/g, "/");
  }

  function setDefaultGraphStatus(status) {
    status.classList.remove("is-pressing", "has-selection");
    status.replaceChildren();
    const text = document.createElement("span");
    text.textContent = "Tap to inspect · hold to open · pinch to zoom";
    status.appendChild(text);
  }

  function installGraphChrome(container, outer, launcher, nativeLauncher) {
    if (!container.querySelector(".projectzaman-graph-close")) {
      const close = document.createElement("button");
      close.type = "button";
      close.className = "projectzaman-graph-close";
      close.setAttribute("aria-label", "Close graph view");
      close.innerHTML = closeIcon;
      close.addEventListener("click", (event) => {
        event.stopPropagation();
        closeGraph(outer, launcher, nativeLauncher, true);
      });
      container.appendChild(close);
      if (outer.classList.contains("active")) {
        requestAnimationFrame(() => close.focus({ preventScroll: true }));
      }
    }

    if (!container.querySelector(".projectzaman-graph-tools")) {
      const tools = document.createElement("div");
      tools.className = "projectzaman-graph-tools";
      tools.setAttribute("aria-label", "Graph zoom controls");
      const actions = [
        ["zoomIn", "Zoom graph in", "+"],
        ["reset", "Reset graph view", resetIcon],
        ["zoomOut", "Zoom graph out", "−"],
      ];
      for (const [action, label, content] of actions) {
        const button = document.createElement("button");
        button.type = "button";
        button.setAttribute("aria-label", label);
        button.dataset.action = action;
        button.innerHTML = content;
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          const graphControls =
            container.querySelector("canvas")?.projectZamanGraphControls;
          if (!graphControls?.[action]) return;
          graphControls[action]();
          container.dataset.projectzamanGraphControl = action;
          window.setTimeout(() => {
            const scale = graphControls.getState?.().k;
            if (Number.isFinite(scale)) {
              container.dataset.projectzamanGraphScale = scale.toFixed(3);
            }
          }, 220);
        });
        tools.appendChild(button);
      }
      container.appendChild(tools);
    }

    if (!container.querySelector(".projectzaman-graph-status")) {
      const status = document.createElement("div");
      status.className = "projectzaman-graph-status";
      status.setAttribute("aria-live", "polite");
      setDefaultGraphStatus(status);
      container.appendChild(status);
    }
  }

  function showGraphFailure(container, outer, launcher, nativeLauncher) {
    setGraphLauncherLoading(launcher, false);
    installGraphChrome(container, outer, launcher, nativeLauncher);
    const status = container.querySelector(".projectzaman-graph-status");
    if (status) {
      status.classList.remove("is-pressing", "has-selection");
      status.textContent =
        "Interactive graph is unavailable here. Search and navigation still work.";
    }
    setGraphOpen(outer, launcher, true);
  }

  function openAdaptiveGraph(container, outer, launcher, nativeLauncher) {
    const state = document.documentElement.dataset.projectzamanGraphRuntime;
    if (state === "ready" || !state) {
      nativeLauncher.click();
      requestAnimationFrame(() => setGraphOpen(outer, launcher, true));
      return;
    }
    if (state === "failed") {
      showGraphFailure(container, outer, launcher, nativeLauncher);
      return;
    }

    setGraphLauncherLoading(launcher, true);
    const status = container.querySelector(".projectzaman-graph-status");
    if (status) status.textContent = "Loading the interactive graph…";

    const onReady = () => {
      window.removeEventListener("projectzaman:graph-runtime-failed", onFailed);
      setGraphLauncherLoading(launcher, false);
      nativeLauncher.click();
      requestAnimationFrame(() => setGraphOpen(outer, launcher, true));
    };
    const onFailed = () => {
      window.removeEventListener("projectzaman:graph-runtime-ready", onReady);
      showGraphFailure(container, outer, launcher, nativeLauncher);
    };
    window.addEventListener("projectzaman:graph-runtime-ready", onReady, {
      once: true,
    });
    window.addEventListener("projectzaman:graph-runtime-failed", onFailed, {
      once: true,
    });
    globalThis.__projectZamanGraphLoad?.();
    window.dispatchEvent(new CustomEvent("projectzaman:graph-request"));
  }

  function activeGraphStatus() {
    return document.querySelector(
      ".global-graph-outer.active .projectzaman-graph-status",
    );
  }

  function initializeGraph() {
    document.documentElement.classList.remove("projectzaman-graph-open");
    document.querySelector(".projectzaman-mobile-graph-slot")?.remove();

    const graph = document.querySelector(".sidebar.right .graph");
    const outer = graph?.querySelector(".global-graph-outer");
    const container = outer?.querySelector(".global-graph-container");
    const nativeLauncher = graph?.querySelector(".global-graph-icon");
    const toolbar = document.querySelector(".sidebar.left > .flex-component");
    if (!graph || !outer || !container || !nativeLauncher || !toolbar) return;

    outer.id = "projectzaman-global-graph";
    outer.setAttribute("role", "dialog");
    outer.setAttribute("aria-label", "Project Zaman graph");
    outer.setAttribute("aria-modal", "true");
    outer.setAttribute("aria-hidden", "true");

    const slot = document.createElement("div");
    slot.className = "projectzaman-mobile-graph-slot";

    const launcher = document.createElement("button");
    launcher.type = "button";
    launcher.className = "projectzaman-mobile-graph-button";
    launcher.setAttribute("aria-label", "Open graph view");
    launcher.setAttribute("aria-controls", outer.id);
    launcher.setAttribute("aria-expanded", "false");
    launcher.innerHTML = graphIcon;
    launcher.addEventListener("click", (event) => {
      event.stopPropagation();
      openAdaptiveGraph(container, outer, launcher, nativeLauncher);
    });
    slot.appendChild(launcher);
    toolbar.appendChild(slot);

    installGraphChrome(container, outer, launcher, nativeLauncher);
    container.__projectZamanGraphObserver?.disconnect();
    const observer = new MutationObserver(() => {
      if (
        container.querySelector("canvas") &&
        (!container.querySelector(".projectzaman-graph-close") ||
          !container.querySelector(".projectzaman-graph-tools") ||
          !container.querySelector(".projectzaman-graph-status"))
      ) {
        installGraphChrome(container, outer, launcher, nativeLauncher);
      }
    });
    observer.observe(container, { childList: true });
    container.__projectZamanGraphObserver = observer;
    window.addCleanup?.(() => observer.disconnect());

    if (outer.__projectZamanBackdropHandler) {
      outer.removeEventListener("click", outer.__projectZamanBackdropHandler);
    }
    outer.__projectZamanBackdropHandler = (event) => {
      if (event.target === outer) {
        event.stopPropagation();
        closeGraph(outer, launcher, nativeLauncher, true);
      }
    };
    outer.addEventListener("click", outer.__projectZamanBackdropHandler);

    if (nativeLauncher.__projectZamanSyncHandler) {
      nativeLauncher.removeEventListener(
        "click",
        nativeLauncher.__projectZamanSyncHandler,
      );
    }
    nativeLauncher.__projectZamanSyncHandler = () => {
      requestAnimationFrame(() => {
        const open = outer.classList.contains("active");
        outer.setAttribute("aria-hidden", String(!open));
        launcher.setAttribute("aria-expanded", String(open));
        document.documentElement.classList.toggle(
          "projectzaman-graph-open",
          open,
        );
      });
    };
    nativeLauncher.addEventListener(
      "click",
      nativeLauncher.__projectZamanSyncHandler,
    );
  }

  function initialize() {
    closeImageViewer(false);
    markRedundantMetadata();
    initializeProperties();
    initializeImages();
    initializeGraph();
  }

  document.addEventListener("click", (event) => {
    const image = event.target.closest?.("img.projectzaman-viewable-image");
    if (!image || !isViewableImage(image)) return;
    event.preventDefault();
    event.stopPropagation();
    openImageViewer(image);
  });

  document.addEventListener("keydown", (event) => {
    const image = event.target.closest?.("img.projectzaman-viewable-image");
    if (image && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openImageViewer(image);
      return;
    }

    if (!imageViewer?.overlay.hidden && event.key === "Tab") {
      const focusable = [...imageViewer.overlay.querySelectorAll("button")];
      if (focusable.length === 0) return;
      const index = focusable.indexOf(document.activeElement);
      const next = event.shiftKey
        ? (index - 1 + focusable.length) % focusable.length
        : (index + 1) % focusable.length;
      event.preventDefault();
      focusable[next].focus();
      return;
    }

    if (event.key !== "Escape") return;
    if (imageViewer && !imageViewer.overlay.hidden) {
      event.preventDefault();
      closeImageViewer(true);
      return;
    }

    const outer = document.querySelector(".global-graph-outer.active");
    const launcher = document.querySelector(".projectzaman-mobile-graph-button");
    const nativeLauncher = document.querySelector(".global-graph-icon");
    if (!outer || !nativeLauncher) return;
    event.preventDefault();
    closeGraph(outer, launcher, nativeLauncher, true);
  });

  window.addEventListener("projectzaman:graph-press-start", (event) => {
    const status = activeGraphStatus();
    if (!status) return;
    status.classList.remove("has-selection");
    status.classList.add("is-pressing");
    status.replaceChildren();
    const text = document.createElement("span");
    text.textContent = `Keep holding to open ${event.detail?.title || "this node"}`;
    status.appendChild(text);
  });

  window.addEventListener("projectzaman:graph-press-cancel", () => {
    const status = activeGraphStatus();
    if (status?.classList.contains("is-pressing")) setDefaultGraphStatus(status);
  });

  window.addEventListener("projectzaman:graph-node-selected", (event) => {
    const status = activeGraphStatus();
    if (!status) return;
    status.classList.remove("is-pressing");
    status.classList.add("has-selection");
    status.replaceChildren();
    const title = document.createElement("strong");
    title.textContent = event.detail?.title || event.detail?.id || "Selected node";
    const link = document.createElement("a");
    link.href = graphPath(event.detail?.id);
    link.textContent = "Open page";
    link.addEventListener("click", (clickEvent) => clickEvent.stopPropagation());
    status.append(title, link);
  });

  window.addEventListener("projectzaman:graph-node-open", () => {
    const status = activeGraphStatus();
    if (!status) return;
    status.classList.remove("is-pressing");
    status.replaceChildren();
    const text = document.createElement("span");
    text.textContent = "Opening page…";
    status.appendChild(text);
  });

  window.addEventListener("projectzaman:graph-runtime-failed", () => {
    if (!mobileQuery.matches) return;
    const graph = document.querySelector(".sidebar.right .graph");
    const outer = graph?.querySelector(".global-graph-outer");
    const container = outer?.querySelector(".global-graph-container");
    const launcher = document.querySelector(".projectzaman-mobile-graph-button");
    const nativeLauncher = graph?.querySelector(".global-graph-icon");
    if (!outer || !container || !launcher || !nativeLauncher) return;
    showGraphFailure(container, outer, launcher, nativeLauncher);
  });

  document.addEventListener("nav", initialize);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
