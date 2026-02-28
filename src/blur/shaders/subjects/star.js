export const star = `
float sdStar(vec2 p, float sizeMult, float shapeSize) {
    float radius = shapeSize * sizeMult * 0.5;
    p = applySubjectScale(p);
    p = p - 0.5;
    float angle = atan(p.y, p.x);
    float spike = cos(angle * 5.0) * 0.2;
    return length(p) - (radius + spike);
}
`;
