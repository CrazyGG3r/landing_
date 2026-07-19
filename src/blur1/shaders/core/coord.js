export const coordFunctions = `
vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    if(u_resolution.x > u_resolution.y) { 
        p.x *= u_resolution.x / u_resolution.y; 
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0; 
    } else { 
        p.y *= u_resolution.y / u_resolution.x; 
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0; 
    }
    p -= 0.5; 
    p *= vec2(-1.0, 1.0); 
    return p;
}
#define st0 coord(gl_FragCoord.xy)
#define mx  coord(u_mouse * u_pixelRatio)
`;