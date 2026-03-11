import * as THREE from 'three';

// Tweak this to scale your imported model
export const MODEL_SCALE = 1;
export const SMAA_ENABLED = true;
// Material tweaks
export const MODEL_ROUGHNESS = 0.2;
export const MODEL_FRESNEL = 2.5;
// Post FX tweaks
export const BLOOM_STRENGTH = 0.25;
export const BLOOM_RADIUS = 0.4;
export const BLOOM_THRESHOLD = 0.1;
export const CHROMA_SHIFT = 0.0012;
export const LENS_BLUR = 0.25;
export const DOF_FOCUS = 1.5;
export const DOF_APERTURE = 0.00004;
export const DOF_MAX_BLUR = 0.015;
export const TEXT_LIGHT_FALLOFF = 0.8;
export const TEXT_GLOW = 1.2;
// Ghost-like glare tweaks
export const GHOST_GLARE_ENABLED = true;
export const GHOST_GLARE_INTENSITY = 0.35;
export const GHOST_GLARE_THRESHOLD = 0.2;
export const GHOST_GLARE_SOFTNESS = 0.3;
export const GHOST_GLARE_GHOSTS = 3;
export const GHOST_GLARE_SPREAD = 0.58;
export const GHOST_GLARE_CHROMA = 0.3;
export const GHOST_GLARE_TINT = new THREE.Color(0.95, 0.9, 1.0);
// Final blur - will be animated during preloader
export const FINAL_BLUR_DEFAULT = 0.3;
export const FINAL_BLUR_MAX = 1.5;
// Dithered noise
export const DITHER_NOISE_AMOUNT = 0.08;
// Rim lighting controls
export const RIM_INTENSITY = 5.5;
export const RIM_POWER = 6.0;
export const RIM_START = 0.3;
// Font controls
export const FONT_TITLE = '"TRTCENZODEMO-ExtraBold", "BL Melody Bold", serif';
export const FONT_SUBTITLE = '"BL Melody ExtraLight", "Arial", sans-serif';
export const FONT_LETTERBOX_TITLE = '"BL Melody Mono Bold", monospace';
export const FONT_LETTERBOX_SUBTITLE = '"BL Melody Mono ExtraLight", monospace';
// Background blend exposure
export const CB_EXPOSURE = 0.85;
// Shadow settings
export const TITLE_SHADOW_INTENSITY = 0.45;
export const TITLE_SHADOW_BLUR = 28;
export const TITLE_SHADOW_DISTANCE = 8;
export const SUBTITLE_SHADOW_INTENSITY = 0.35;
export const SUBTITLE_SHADOW_BLUR = 20;
export const SUBTITLE_SHADOW_DISTANCE = 6;

// Text emission settings
export const TEXT_EMISSION_BASE = 0;
export const TEXT_EMISSION_MAX = 4;
