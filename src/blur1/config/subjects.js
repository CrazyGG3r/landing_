// Subject type map used by the shader.
// Change `type` in a subject using one of these constants.
export const SUBJECT_TYPE = {
  ROUNDED_RECT: 0,
  HEART: 1,
  STAR: 2,
  CIRCLE: 3,
};

// Animation bit flags used by `animType`.
const ANIM = {
  TRANSLATE: 1,
  ROTATE: 2,
  SCALE: 4,
  DEFORM: 8,
  PATH: 16,
};

// PRESET LIBRARY
// Add new presets here, then assign `preset: 'yourPresetName'` on any subject below.
// You can override any preset field per subject.
export const EFFECT_PRESETS = {
  staticClean: {
    animType: 0,
    animSpeed: 0.0,
    animPhase: 0.0,
    animAmplitude: 0.0,
    animEasing: 0,
    animLoop: 0,
    animSeed: 0.0,
    animPath: [[0, 0], [0, 0], [0, 0], [0, 0]],
  },
  orbitFloat: {
    animType: ANIM.TRANSLATE | ANIM.SCALE,
    animSpeed: 0.75,
    animPhase: 0.0,
    animAmplitude: 0.42,
    animEasing: 0,
    animLoop: 1,
    animSeed: 0.2,
    animPath: [[0, 0], [0, 0], [0, 0], [0, 0]],
  },
  spinPulse: {
    animType: ANIM.ROTATE | ANIM.SCALE,
    animSpeed: 0.9,
    animPhase: 1.1,
    animAmplitude: 0.38,
    animEasing: 0,
    animLoop: 1,
    animSeed: 1.4,
    animPath: [[0, 0], [0, 0], [0, 0], [0, 0]],
  },
  wanderWobble: {
    animType: ANIM.TRANSLATE | ANIM.DEFORM,
    animSpeed: 0.85,
    animPhase: 2.2,
    animAmplitude: 0.65,
    animEasing: 0,
    animLoop: 1,
    animSeed: 2.8,
    animPath: [[0, 0], [0, 0], [0, 0], [0, 0]],
  },
  pathPingPong: {
    animType: ANIM.PATH | ANIM.ROTATE,
    animSpeed: 0.7,
    animPhase: 0.4,
    animAmplitude: 0.45,
    animEasing: 3,
    animLoop: 2,
    animSeed: 4.1,
    // Four control points (Bezier path).
    animPath: [[-0.10, 0.00], [-0.04, 0.08], [0.04, -0.08], [0.10, 0.00]],
  },
};

// SUBJECT SETUP
// This is the main section you will edit most often.
// For each subject you can freely change:
// - position: [x, y] in normalized screen space (0..1)
// - size: base scale of the subject
// - rotation: base rotation in radians
// - preset: any key from EFFECT_PRESETS
// Optional: override any preset values directly on the subject.
export const SUBJECTS = [
  {
    name: 'Left Star',
    type: SUBJECT_TYPE.STAR,
    position: [0.01, 0.5],
    size: .06,
    rotation: 0.0,
    preset: 'orbitFloat',
  },
  {
    name: 'Center Star',
    type: SUBJECT_TYPE.STAR,
    position: [0.5, 0.5],
    size: .06,
    rotation: 0.0,
    preset: 'spinPulse',
  },
  {
    name: 'Right Star',
    type: SUBJECT_TYPE.STAR,
    position: [0.99, 0.5],
    size: 0.06,
    rotation: 0.0,
    preset: 'wanderWobble',
  },
];

export const SHADER_DEBUG_MODE = false;

// Resolves `preset` into concrete animation fields for the shader.
// Call this before passing subjects into <ShapeBlur />.
export function resolveSubjects(subjects = SUBJECTS, presets = EFFECT_PRESETS) {
  return (subjects ?? []).map((subject, index) => {
    const presetKey = subject?.preset ?? 'staticClean';
    const preset = presets[presetKey] ?? presets.staticClean;
    return {
      ...preset,
      ...subject,
      animSeed: subject?.animSeed ?? preset.animSeed ?? (index * 1.123 + 0.33),
    };
  });
}
