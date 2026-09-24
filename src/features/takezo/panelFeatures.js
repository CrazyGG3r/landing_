const palette = { red: "#B95745", ochre: "#dba35b", sage: "#849975", bone: "#c7c8b6" };

// Page defaults are inherited; an explicit card.tags replaces the tag list.
export function panelFeatures(card, defaults = {}) {
  const options = { ...defaults, ...card };
  const tags = new Set(options.tags || []);
  return {
    logo: tags.has("logo") ? options.logo || "/takezo/mark.svg" : null,
    max: tags.has("expansion-max"),
    cursorRead: tags.has("cursor-read"),
    gradient: tags.has("gradient"),
    overlay: tags.has("Prototype") ? "Prototype" : tags.has("Dirty") ? "Dirty" : tags.has("Halftone") ? "Halftone" : null,
    base: /^#[0-9a-f]{6}$/i.test(options.baseColor || "") ? options.baseColor : palette[card.color] || palette.red,
  };
}

export function surfaceStyle(features) {
  return {
    "--panel-base": features.base,
    "--panel-dark": `color-mix(in srgb, ${features.base} 25%, #121510)`,
    ...(features.gradient ? {
      backgroundColor: features.base,
      backgroundImage: `linear-gradient(135deg, color-mix(in oklab, ${features.base} 82%, #fff1cf), color-mix(in oklab, ${features.base} 90%, #4c2638))`,
    } : {}),
  };
}
