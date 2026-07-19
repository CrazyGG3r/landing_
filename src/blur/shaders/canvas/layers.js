export const layerFunctions = `
void renderSubjectLayers(
    vec2 p,
    int shapeType,
    float shapeSize,
    float roundness,
    float mInf,
    float baseEdge,
    float extra,
    vec2 shiftVec,
    float borderSize,
    vec3 colorA,
    vec3 colorB,
    vec3 colorC,
    float spreadA,
    float spreadB,
    float spreadC,
    float intensityA,
    float intensityB,
    float intensityC,
    out vec3 subjectColor,
    out float subjectAlpha
) {
    float eA = max(baseEdge + spreadA * mInf * SPREAD_FACTOR + extra, 0.001);
    float eB = max(baseEdge + spreadB * mInf * SPREAD_FACTOR + extra, 0.001);
    float eC = max(baseEdge + spreadC * mInf * SPREAD_FACTOR + extra, 0.001);

    float maskA = strokeEdge(
        sdSubjectByType(shapeType, p + shiftVec, 0.9, shapeSize, roundness),
        0.0, borderSize, eA
    ) * 4.0 * intensityA;

    float maskB = strokeEdge(
        sdSubjectByType(shapeType, p, 1.0, shapeSize, roundness),
        0.0, borderSize, eB
    ) * 4.0 * intensityB;

    float maskC = strokeEdge(
        sdSubjectByType(shapeType, p - shiftVec, 1.1, shapeSize, roundness),
        0.0, borderSize, eC
    ) * 4.0 * intensityC;

    float white = strokeEdge(
        sdSubjectByType(shapeType, p, 1.0, shapeSize, roundness),
        0.0, borderSize, baseEdge
    ) * 4.0;

    vec3 col = colorA * maskA + colorB * maskB + colorC * maskC;
    float blend = clamp(mInf * 2.0, 0.0, 1.0);
    col = mix(vec3(1.0) * white, col, blend);

    float rgbAlpha = max(maskA, max(maskB, maskC));
    float whiteAlpha = white;
    float alpha = mix(whiteAlpha, rgbAlpha, blend);

    subjectColor = col;
    subjectAlpha = alpha;
}
`;
