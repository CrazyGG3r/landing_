export const roundedRect = `
float sdRoundedRect(vec2 p, float sizeMult, float shapeSize, float roundness) {
    vec2 b = vec2(shapeSize * sizeMult);
    float r = roundness;
    p = applySubjectScale(p);
    vec2 d = abs(p - 0.5) - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}
`;
