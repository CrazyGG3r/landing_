export const star = `
float sdSubject(vec2 p, float sizeMult) {
    float radius = u_shapeSize * sizeMult * 0.5;
    // Scale the coordinate space to match roundedRect
    p = (p - 0.5) * 4.2 + 0.5;  // ← Add this line
    p = p - 0.5;
    float angle = atan(p.y, p.x);
    float spike = cos(angle * 5.0) * 0.2;
    return length(p) - (radius + spike);
}
`;