// NO import needed - noiseFunctions will be included separately in main.js

export const smokeFunctions = `
float smokeWarp(vec2 p) {
    float t1 = u_time * 0.10;
    float t2 = u_time * 0.15;
    vec2 q = vec2(fbm(p + t1), fbm(p + vec2(5.2, 1.3) + t1));
    vec2 r = vec2(fbm(p + q * 1.5 + t2), fbm(p + q * 1.5 + vec2(8.3, 2.8) + t2));
    return fbm(p + r * 0.8);
}
`;