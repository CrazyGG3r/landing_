export const uniforms = `
#define MAX_SUBJECTS 8
#define BLEND_MODE_NORMAL 0
#define BLEND_MODE_ADD 1
#define BLEND_MODE_MULTIPLY 2
#define BLEND_MODE_SCREEN 3

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
uniform float u_debugSubjects;

uniform int   u_subjectCount;
uniform int   u_subjectType[MAX_SUBJECTS];
uniform vec2  u_subjectPos[MAX_SUBJECTS];
uniform vec2  u_subjectScale[MAX_SUBJECTS];
uniform float u_subjectRotation[MAX_SUBJECTS];
uniform float u_subjectSize[MAX_SUBJECTS];
uniform float u_subjectRoundness[MAX_SUBJECTS];
uniform float u_subjectOpacity[MAX_SUBJECTS];
uniform int   u_subjectBlendMode[MAX_SUBJECTS];
uniform float u_subjectZ[MAX_SUBJECTS];
uniform float u_subjectVisible[MAX_SUBJECTS];
uniform vec3  u_subjectColorA[MAX_SUBJECTS];
uniform vec3  u_subjectColorB[MAX_SUBJECTS];
uniform vec3  u_subjectColorC[MAX_SUBJECTS];
uniform float u_subjectSpreadA[MAX_SUBJECTS];
uniform float u_subjectSpreadB[MAX_SUBJECTS];
uniform float u_subjectSpreadC[MAX_SUBJECTS];
uniform float u_subjectIntensityA[MAX_SUBJECTS];
uniform float u_subjectIntensityB[MAX_SUBJECTS];
uniform float u_subjectIntensityC[MAX_SUBJECTS];

uniform float u_animTime[MAX_SUBJECTS];
uniform int   u_animType[MAX_SUBJECTS];
uniform float u_animSpeed[MAX_SUBJECTS];
`;
