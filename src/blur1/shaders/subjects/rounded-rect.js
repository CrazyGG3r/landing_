export const roundedRect = `
float sdSubject(vec2 p, float sizeMult) {
    vec2 b = vec2(u_shapeSize * sizeMult);
    float r = u_roundness;
    vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}
`;