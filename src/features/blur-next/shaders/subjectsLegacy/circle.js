export const circle = `
float sdSubject(vec2 p, float sizeMult) {
    float radius = u_shapeSize * sizeMult * 0.5;
    // Scale the coordinate space to match roundedRect
    p = (p - 0.5) * 4.2 + 0.5;  // ← Add this line
    return length(p - 0.5) - radius;
}
`;