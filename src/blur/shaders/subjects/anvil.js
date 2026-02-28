export const anvil = `
float sdAnvil(vec2 p, float sizeMult, float shapeSize) {
    p = applySubjectScale(p);
    p = p - 0.5;

    float d = 1e5;
    float scale = max(shapeSize * sizeMult, 0.001);

    float base = sdBox((p - vec2(0.00, -0.18)) / scale, vec2(0.30, 0.10));
    float waist = sdBox((p - vec2(0.00, -0.02)) / scale, vec2(0.16, 0.10));
    float top = sdBox((p - vec2(0.00, 0.14)) / scale, vec2(0.38, 0.06));
    float heel = sdBox((p - vec2(0.30, 0.14)) / scale, vec2(0.09, 0.06));
    vec2 hornPos = (p - vec2(-0.38, 0.20)) / scale;
    float horn = length(hornPos * vec2(1.0, 1.4)) - 0.18;

    d = min(base, waist);
    d = min(d, top);
    d = min(d, heel);
    d = min(d, horn);

    return d * scale;
}
`;
