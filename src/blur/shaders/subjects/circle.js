export const circle = `
float sdCircleSubject(vec2 p, float sizeMult, float shapeSize) {
    float radius = shapeSize * sizeMult * 0.5;
    p = applySubjectScale(p);
    return length(p - 0.5) - radius;
}
`;
