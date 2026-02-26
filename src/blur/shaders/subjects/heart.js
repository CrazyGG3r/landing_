export const heart = `
float dot2(vec2 v) { return dot(v, v); }

float sdSubject(vec2 p, float sizeMult) {
    // Apply roundedRect scaling first (this maintains your size)
    p = (p - 0.5) * 4.2 + 0.5;
    
    // Center for heart calculation
    p = (p - 0.5) * 2.0;
    
    // Original heart SDF formula
    p.x = abs(p.x);
    
    float heart;
    if (p.y + p.x > 1.0) {
        heart = sqrt(dot2(p - vec2(0.25, 0.75))) - sqrt(2.0) / 4.0;
    } else {
        heart = sqrt(min(dot2(p - vec2(0.00, 1.00)),
                        dot2(p - 0.5 * max(p.x + p.y, 0.0)))) * sign(p.x - p.y);
    }
    
    // Scale to match your roundedRect size
    heart = heart * (u_shapeSize * sizeMult * 1.2);
    
    return heart;
}
`;