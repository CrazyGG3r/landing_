export const uniforms = `
#define MAX_SUBJECTS 8
#define MAX_ANIM_PATH_POINTS 8

uniform vec2  u_mouse;
uniform vec2  u_resolution;
uniform float u_pixelRatio;
uniform float u_shapeSize;
uniform float u_roundness;
uniform float u_borderSize;
uniform float u_circleSize;
uniform float u_circleEdge;
uniform float u_impactSize;
uniform float u_impactEdge;
uniform vec3  u_colorA;
uniform vec3  u_colorB;
uniform vec3  u_colorC;
uniform float u_spreadA;
uniform float u_spreadB;
uniform float u_spreadC;
uniform float u_intensityA;
uniform float u_intensityB;
uniform float u_intensityC;
uniform vec2  u_shapePos;
uniform float u_noise;
uniform float u_smoke;
uniform float u_dither;
uniform float u_time;
uniform float u_debugMode;

uniform int   u_subjectCount;
uniform int   u_subjectTypes[MAX_SUBJECTS];
uniform vec2  u_subjectPositions[MAX_SUBJECTS];
uniform float u_subjectSizes[MAX_SUBJECTS];
uniform float u_subjectRotations[MAX_SUBJECTS];

uniform vec3  u_subjectColorsA[MAX_SUBJECTS];
uniform vec3  u_subjectColorsB[MAX_SUBJECTS];
uniform vec3  u_subjectColorsC[MAX_SUBJECTS];
uniform float u_subjectSpreadsA[MAX_SUBJECTS];
uniform float u_subjectSpreadsB[MAX_SUBJECTS];
uniform float u_subjectSpreadsC[MAX_SUBJECTS];
uniform float u_subjectIntensitiesA[MAX_SUBJECTS];
uniform float u_subjectIntensitiesB[MAX_SUBJECTS];
uniform float u_subjectIntensitiesC[MAX_SUBJECTS];

uniform float u_animTime[MAX_SUBJECTS];
uniform int   u_animType[MAX_SUBJECTS];
uniform float u_animSpeed[MAX_SUBJECTS];
uniform float u_animPhase[MAX_SUBJECTS];
uniform float u_animAmplitude[MAX_SUBJECTS];
uniform vec2  u_animPath[MAX_SUBJECTS * MAX_ANIM_PATH_POINTS];
uniform int   u_animEasing[MAX_SUBJECTS];
uniform int   u_animLoop[MAX_SUBJECTS];
uniform float u_animSeed[MAX_SUBJECTS];
`;
