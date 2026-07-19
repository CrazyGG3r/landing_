export const helperFunctions = `
#define MOUSE_SHIFT_FACTOR 0.03
#define SPREAD_FACTOR 0.14
#define SUBJECT_COORD_SCALE 4.2

float fill(float x, float sz, float e) {
    return 1.0 - smoothstep(sz - e, sz + e, x);
}

float strokeEdge(float x, float size, float w, float edge) {
    float afw = length(vec2(dFdx(x), dFdy(x))) * 0.70710678;
    float d = smoothstep(size - edge - afw, size + edge + afw, x + w * 0.5) 
            - smoothstep(size - edge - afw, size + edge + afw, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

float sdBox(vec2 p, vec2 b) {
    vec2 d = abs(p) - b;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

vec2 rotate2d(vec2 p, float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c) * p;
}

vec2 applySubjectScale(vec2 p) {
    return (p - 0.5) * SUBJECT_COORD_SCALE + 0.5;
}
`;
