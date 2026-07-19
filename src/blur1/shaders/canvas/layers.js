export const layerProcessor = `
struct LayerResult {
    vec3 color;      // RGB combined color
    float rgbAlpha;  // Alpha from RGB layers
    float white;     // White layer mask
    float whiteAlpha;// Alpha from white layer
};

// Version for single subject (used by canvas manager)
LayerResult processLayers(
    vec2 basePos,                    // Center position (stOff)
    float rawDistA, float rawDistB, float rawDistC,  // Pre-calculated distances
    float shift,                      // Shift amount for edge distortion
    vec3 colorA, vec3 colorB, vec3 colorC,
    float spreadA, float spreadB, float spreadC,
    float intensityA, float intensityB, float intensityC,
    float mInf, float baseEdge, float extra
) {
    // Calculate per-layer edge values (YOUR ORIGINAL FORMULA)
    float eA = max(baseEdge + spreadA * mInf * 0.14 + extra, 0.001);
    float eB = max(baseEdge + spreadB * mInf * 0.14 + extra, 0.001);
    float eC = max(baseEdge + spreadC * mInf * 0.14 + extra, 0.001);
    
    // Calculate masks using strokeEdge
    float maskA = strokeEdge(rawDistA, 0.0, u_borderSize, eA) * 4.0 * intensityA;
    float maskB = strokeEdge(rawDistB, 0.0, u_borderSize, eB) * 4.0 * intensityB;
    float maskC = strokeEdge(rawDistC, 0.0, u_borderSize, eC) * 4.0 * intensityC;
    
    // White layer (center position, normal size)
    float white = strokeEdge(rawDistB, 0.0, u_borderSize, baseEdge) * 4.0;
    
    // Combine RGB layers
    LayerResult result;
    result.color = colorA * maskA + colorB * maskB + colorC * maskC;
    result.rgbAlpha = max(maskA, max(maskB, maskC));
    result.white = white;
    result.whiteAlpha = white;
    
    return result;
}
`;