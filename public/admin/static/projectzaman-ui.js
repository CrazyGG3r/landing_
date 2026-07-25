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

  function setGraphOpen(outer, launcher, open, restoreFocus = false) {
    outer.classList.toggle("active", open);
    outer.setAttribute("aria-hidden", String(!open));
    launcher?.setAttribute("aria-expanded", String(open));
    document.documentElement.classList.toggle("projectzaman-graph-open", open);

    if (open) {
      outer.querySelector(".projectzaman-graph-close")?.focus({
        preventScroll: true,
      });
    } else if (restoreFocus) {
      launcher?.focus({ preventScroll: true });
    }
  }

  function installGraphClose(container, outer, launcher) {
    container.querySelector(".projectzaman-graph-close")?.remove();
    const close = document.createElement("button");
    close.type = "button";
    close.className = "projectzaman-graph-close";
    close.setAttribute("aria-label", "Close graph view");
    close.innerHTML = closeIcon;
    close.addEventListener("click", (event) => {
      event.stopPropagation();
      setGraphOpen(outer, launcher, false, true);
    });
    container.appendChild(close);
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
      nativeLauncher.click();
      requestAnimationFrame(() => {
        setGraphOpen(outer, launcher, true);
      });
    });
    slot.appendChild(launcher);
    toolbar.appendChild(slot);
    installGraphClose(container, outer, launcher);

    outer.addEventListener("click", (event) => {
      if (event.target === outer) {
        setGraphOpen(outer, launcher, false, true);
      }
    });

    nativeLauncher.addEventListener("click", () => {
      requestAnimationFrame(() => {
        installGraphClose(container, outer, launcher);
        const open = outer.classList.contains("active");
        outer.setAttribute("aria-hidden", String(!open));
        launcher.setAttribute("aria-expanded", String(open));
        document.documentElement.classList.toggle(
          "projectzaman-graph-open",
          open,
        );
      });
    });
  }

  function initialize() {
    markRedundantMetadata();
    initializeProperties();
    initializeGraph();
  }

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const outer = document.querySelector(".global-graph-outer.active");
    if (!outer) return;
    const launcher = document.querySelector(
      ".projectzaman-mobile-graph-button",
    );
    setGraphOpen(outer, launcher, false, true);
  });
  document.addEventListener("nav", initialize);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
