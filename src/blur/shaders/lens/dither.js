export const ditherFunctions = `
float bayer4(vec2 p) {
    int x = int(mod(p.x, 4.0));
    int y = int(mod(p.y, 4.0));
    float m[16];
    m[0] = 0.0;   m[1] = 8.0;   m[2] = 2.0;   m[3] = 10.0;
    m[4] = 12.0;  m[5] = 4.0;   m[6] = 14.0;  m[7] = 6.0;
    m[8] = 3.0;   m[9] = 11.0;  m[10] = 1.0;  m[11] = 9.0;
    m[12] = 15.0; m[13] = 7.0;  m[14] = 13.0; m[15] = 5.0;
    return m[y * 4 + x] / 16.0;
}
`;