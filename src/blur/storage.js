export const STORAGE_KEY = 'shapeblur-settings';

export const DEFAULT_SETTINGS = {
  version: 1,
  layers: [
    { color: '#ff2244', spread: -1.0, intensity: 1.0 },
    { color: '#ffffff', spread:  0.0, intensity: 1.0 },
    { color: '#2266ff', spread:  1.0, intensity: 1.0 },
  ],
  impact: { size: 0.25, edge: 1.0 },
  noise:  { enabled: false, intensity: 0.5 },
  smoke:  { enabled: false, intensity: 0.6 },
  dither: { enabled: false, intensity: 0.5 },
};

function clamp01(v, fallback) {
  if (typeof v !== 'number' || Number.isNaN(v)) return fallback;
  return Math.min(1, Math.max(0, v));
}

function normalizeLayer(layer, fallback) {
  return {
    color: typeof layer?.color === 'string' ? layer.color : fallback.color,
    spread: typeof layer?.spread === 'number' ? layer.spread : fallback.spread,
    intensity: clamp01(layer?.intensity, fallback.intensity),
  };
}

export function normalizeSettings(input) {
  const src = input ?? {};
  const layersOk = Array.isArray(src.layers) && src.layers.length === 3;
  const layers = layersOk
    ? src.layers.map((l, i) => normalizeLayer(l, DEFAULT_SETTINGS.layers[i]))
    : DEFAULT_SETTINGS.layers.map(l => ({ ...l }));
  return {
    version: 1,
    layers,
    impact: { ...DEFAULT_SETTINGS.impact, ...(src.impact ?? {}) },
    noise: { ...DEFAULT_SETTINGS.noise, ...(src.noise ?? {}) },
    smoke: { ...DEFAULT_SETTINGS.smoke, ...(src.smoke ?? {}) },
    dither: { ...DEFAULT_SETTINGS.dither, ...(src.dither ?? {}) },
    subjects: Array.isArray(src.subjects) ? src.subjects : undefined,
  };
}

export function parseSettings(input) {
  if (typeof input === 'string') {
    try {
      const parsed = JSON.parse(input);
      return normalizeSettings(parsed);
    } catch (_) {
      return normalizeSettings(null);
    }
  }
  return normalizeSettings(input);
}

function getStorageAdapter() {
  const c = typeof window !== 'undefined' ? window.storage : null;
  if (c?.get && c?.set && c?.delete) return c;
  if (typeof window !== 'undefined' && window.localStorage)
    return { 
      get: async k => ({ value: window.localStorage.getItem(k) }), 
      set: async (k, v) => window.localStorage.setItem(k, v), 
      delete: async k => window.localStorage.removeItem(k) 
    };
  return null;
}

function isValidSettings(v) {
  return v?.layers?.length === 3 && 
         v.layers.every(l => typeof l.color === 'string' && 
                             typeof l.spread === 'number' && 
                             typeof l.intensity === 'number');
}

export async function loadSettings() {
  try {
    const s = getStorageAdapter(); 
    if (!s) return DEFAULT_SETTINGS;
    const res = await s.get(STORAGE_KEY);
    if (res?.value) {
      const p = JSON.parse(res.value);
      if (isValidSettings(p)) return normalizeSettings(p);
    }
  } catch (_) {}
  return DEFAULT_SETTINGS;
}

export async function saveSettings(data) { 
  try {
    const s = getStorageAdapter();
    if (s) await s.set(STORAGE_KEY, JSON.stringify({ version: 1, ...data }));
  } catch(_) {} 
}

export async function resetSettings() { 
  try {
    const s = getStorageAdapter();
    if (s) await s.delete(STORAGE_KEY);
  } catch(_) {} 
  return DEFAULT_SETTINGS; 
}

export function hexToRgb01(hex) {
  return [
    parseInt(hex.slice(1,3), 16) / 255,
    parseInt(hex.slice(3,5), 16) / 255,
    parseInt(hex.slice(5,7), 16) / 255
  ];
}
