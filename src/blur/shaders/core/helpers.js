export const helperFunctions = `
float fill(float x, float sz, float e) {
    return 1.0 - smoothstep(sz - e, sz + e, x);
}

float strokeEdge(float x, float size, float w, float edge) {
    float afw = length(vec2(dFdx(x), dFdy(x))) * 0.70710678;
    float d = smoothstep(size - edge - afw, size + edge + afw, x + w * 0.5) 
            - smoothstep(size - edge - afw, size + edge + afw, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}
`;