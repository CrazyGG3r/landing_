export const anvil = `
float sdSubject(vec2 p, float sizeMult) {
    // Scale the coordinate space to match roundedRect
    p = (p - 0.5) * 4.2 + 0.5;
    
    // Center for anvil calculation
    p = p - 0.5;
    
    float d = 1e5;

    // Base (bottom)
    float base = sdBox(p - vec2(0.0, -0.6), vec2(0.8, 0.3));

    // Waist (middle)
    float waist = sdBox(p - vec2(0.0, -0.2), vec2(0.4, 0.3));

    // Top plate
    float top = sdBox(p - vec2(0.0, 0.3), vec2(1.0, 0.15));

    // Heel (flat right side)
    float heel = sdBox(p - vec2(0.8, 0.4), vec2(0.25, 0.15));

    // Horn (rounded left side)
    vec2 hornPos = p - vec2(-1.0, 0.5);
    float horn = length(hornPos * vec2(1.0, 1.5)) - 0.5;

    // Combine all parts
    d = min(base, waist);
    d = min(d, top);
    d = min(d, heel);
    d = min(d, horn);

    return d;
}
`;