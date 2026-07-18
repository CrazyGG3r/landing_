export const canvasManagerFunctions = `
vec2 applyAnimations(vec2 p, int index) {
    float speed = u_animSpeed[index];
    if (speed <= 0.0) return p;

    float t = u_animTime[index] * speed;
    int animType = u_animType[index];
    if (animType == 1) {
        float k = 1.0 + sin(t) * 0.12;
        p = (p - 0.5) / max(k, 0.001) + 0.5;
    } else if (animType == 2) {
        float a = sin(t) * 0.6;
        p = rotate2d(p - 0.5, -a) + 0.5;
    } else if (animType == 3) {
        vec2 tr = vec2(cos(t), sin(t * 1.2)) * 0.05;
        p -= tr;
    }
    return p;
}

vec2 subjectLocalPos(vec2 worldPos, int index) {
    // Pipeline: world space -> per-subject translation -> rotation -> scale -> animation.
    vec2 p = worldPos - (u_subjectPos[index] - 0.5);
    p = rotate2d(p - 0.5, -u_subjectRotation[index]) + 0.5;
    vec2 scale = max(u_subjectScale[index], vec2(0.001));
    p = (p - 0.5) / scale + 0.5;
    return applyAnimations(p, index);
}

vec3 applyBlendMode(vec3 baseColor, vec3 layerColor, float alpha, int blendMode) {
    vec3 normal = mix(baseColor, layerColor, alpha);
    if (blendMode == BLEND_MODE_ADD) {
        return clamp(baseColor + layerColor * alpha, 0.0, 1.0);
    }
    if (blendMode == BLEND_MODE_MULTIPLY) {
        return mix(baseColor, baseColor * layerColor, alpha);
    }
    if (blendMode == BLEND_MODE_SCREEN) {
        vec3 screened = 1.0 - (1.0 - baseColor) * (1.0 - layerColor);
        return mix(baseColor, screened, alpha);
    }
    return normal;
}

void renderCanvas(
    vec2 worldPos,
    vec2 relMouse,
    float mInf,
    float baseEdge,
    float extra,
    float smokeVol,
    out vec3 finalColor,
    out float finalAlpha
) {
    finalColor = vec3(0.0);
    finalAlpha = 0.0;
    bool hasColor = false;
    float topZ = -1e9;
    int topBlendMode = BLEND_MODE_NORMAL;

    vec2 baseShift = vec2(MOUSE_SHIFT_FACTOR * mInf * 0.70710678);

    for (int i = 0; i < MAX_SUBJECTS; i++) {
        if (i >= u_subjectCount) break;
        if (u_subjectVisible[i] < 0.5) continue;
        if (u_subjectOpacity[i] <= 0.001) continue;

        vec2 p = subjectLocalPos(worldPos, i);
        vec2 shiftVec = rotate2d(baseShift, u_subjectRotation[i]);

        vec3 subjectColor;
        float subjectAlpha;
        renderSubjectLayers(
            p,
            u_subjectType[i],
            u_subjectSize[i],
            u_subjectRoundness[i],
            mInf,
            baseEdge,
            extra,
            shiftVec,
            u_borderSize,
            u_subjectColorA[i],
            u_subjectColorB[i],
            u_subjectColorC[i],
            u_subjectSpreadA[i],
            u_subjectSpreadB[i],
            u_subjectSpreadC[i],
            u_subjectIntensityA[i],
            u_subjectIntensityB[i],
            u_subjectIntensityC[i],
            subjectColor,
            subjectAlpha
        );

        if (u_smoke > 0.0) {
            vec3 smokeTint = mix(u_subjectColorB[i], vec3(1.0), 0.25);
            subjectColor += smokeTint * smokeVol * 0.55;
            subjectAlpha = max(subjectAlpha, smokeVol * 0.70);
        }

        subjectAlpha *= u_subjectOpacity[i];
        if (subjectAlpha <= 0.001) continue;

        float z = u_subjectZ[i];
        if (!hasColor || z > topZ + 0.0001) {
            finalColor = subjectColor;
            finalAlpha = subjectAlpha;
            topZ = z;
            topBlendMode = u_subjectBlendMode[i];
            hasColor = true;
        } else if (abs(z - topZ) <= 0.0001) {
            finalColor = applyBlendMode(finalColor, subjectColor, subjectAlpha, u_subjectBlendMode[i]);
            finalAlpha = max(finalAlpha, subjectAlpha);
        }
    }

    if (hasColor && topBlendMode == BLEND_MODE_NORMAL) {
        finalColor = clamp(finalColor, 0.0, 1.0);
        finalAlpha = clamp(finalAlpha, 0.0, 1.0);
    }

    if (u_debugSubjects > 0.0 && hasColor) {
        float zTint = fract(topZ * 0.173 + 0.11);
        vec3 debugTint = vec3(zTint, 1.0 - zTint, 0.35 + 0.65 * zTint);
        finalColor = mix(finalColor, debugTint, 0.22 * clamp(u_debugSubjects, 0.0, 1.0));
    }
}
`;
