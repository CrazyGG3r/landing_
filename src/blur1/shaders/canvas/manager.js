export const canvasManager = `
// Subject type mapping:
// 0 = roundedRect, 1 = heart, 2 = star, 3 = circle
const int ANIM_TRANSLATE = 1;
const int ANIM_ROTATE = 2;
const int ANIM_SCALE = 4;
const int ANIM_DEFORM = 8;
const int ANIM_PATH = 16;

vec2 rotate2d(vec2 v, float a) {
    float c = cos(a);
    float s = sin(a);
    return vec2(v.x * c - v.y * s, v.x * s + v.y * c);
}

float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) * 4.2 - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}

float dot2(vec2 v) { return dot(v, v); }

float shapeRoundedRect(vec2 p, float size, float roundness) {
    return sdRoundRect(p, vec2(size), roundness);
}

float shapeHeart(vec2 p, float size) {
    vec2 hp = p * 2.0;
    hp.x = abs(hp.x);
    float heart;
    if (hp.y + hp.x > 1.0) {
        heart = sqrt(dot2(hp - vec2(0.25, 0.75))) - sqrt(2.0) / 4.0;
    } else {
        heart = sqrt(min(dot2(hp - vec2(0.0, 1.0)), dot2(hp - 0.5 * max(hp.x + hp.y, 0.0)))) * sign(hp.x - hp.y);
    }
    return heart * (size * 1.2);
}

float shapeStar(vec2 p, float size) {
    float radius = size * 0.5;
    float angle = atan(p.y, p.x);
    float spike = cos(angle * 5.0) * 0.2;
    return length(p) - (radius + spike);
}

float shapeCircle(vec2 p, float size) {
    float radius = size * 0.5;
    return length(p) - radius;
}

float getShapeDistance(vec2 p, int type, float size) {
    if (type == 0) return shapeRoundedRect(p, size, u_roundness);
    if (type == 1) return shapeHeart(p, size);
    if (type == 2) return shapeStar(p, size);
    if (type == 3) return shapeCircle(p, size);
    return 1e5;
}

float easeLinear(float t) { return t; }
float easeInQuad(float t) { return t * t; }
float easeOutQuad(float t) { return t * (2.0 - t); }
float easeInOutQuad(float t) { return t < 0.5 ? 2.0 * t * t : 1.0 - pow(-2.0 * t + 2.0, 2.0) * 0.5; }

float easeInBounce(float t) {
    float u = 1.0 - t;
    float n1 = 7.5625;
    float d1 = 2.75;
    if (u < 1.0 / d1) return 1.0 - (n1 * u * u);
    if (u < 2.0 / d1) { u -= 1.5 / d1; return 1.0 - (n1 * u * u + 0.75); }
    if (u < 2.5 / d1) { u -= 2.25 / d1; return 1.0 - (n1 * u * u + 0.9375); }
    u -= 2.625 / d1;
    return 1.0 - (n1 * u * u + 0.984375);
}

float easeOutElastic(float t) {
    float c4 = (2.0 * 3.14159265) / 3.0;
    if (t <= 0.0) return 0.0;
    if (t >= 1.0) return 1.0;
    return pow(2.0, -10.0 * t) * sin((t * 10.0 - 0.75) * c4) + 1.0;
}

float applyEasing(float t, int easingType) {
    if (easingType == 1) return easeInQuad(t);
    if (easingType == 2) return easeOutQuad(t);
    if (easingType == 3) return easeInOutQuad(t);
    if (easingType == 4) return easeInBounce(t);
    if (easingType == 5) return easeOutElastic(t);
    return easeLinear(t);
}

float applyLoop(float t, int loopType) {
    if (loopType == 1) return fract(t);
    if (loopType == 2) {
        float f = fract(t);
        return 1.0 - abs(f * 2.0 - 1.0);
    }
    return clamp(t, 0.0, 1.0);
}

bool hasAnimFlag(int animType, int flag) {
    float n = floor(float(animType) / float(flag));
    return mod(n, 2.0) >= 1.0;
}

vec2 orbit(float time, float radius, float speed, vec2 center) {
    float a = time * speed;
    return center + vec2(cos(a), sin(a)) * radius;
}

vec2 bezier(float t, vec2 p0, vec2 p1, vec2 p2, vec2 p3) {
    float u = 1.0 - t;
    float tt = t * t;
    float uu = u * u;
    float uuu = uu * u;
    float ttt = tt * t;
    return uuu * p0 + 3.0 * uu * t * p1 + 3.0 * u * tt * p2 + ttt * p3;
}

float pulse(float time, float speed, float minV, float maxV) {
    float s = 0.5 + 0.5 * sin(time * speed);
    return mix(minV, maxV, s);
}

float wave(float time, float speed, float amplitude, int type) {
    float x = time * speed;
    if (type == 1) return cos(x) * amplitude;
    if (type == 2) return sign(sin(x)) * amplitude;
    return sin(x) * amplitude;
}

vec2 getPathPoint(int subjectIndex, int pointIndex) {
    int idx = subjectIndex * MAX_ANIM_PATH_POINTS + pointIndex;
    return u_animPath[idx];
}

float subjectClock(int index, float time) {
    float speed = max(u_animSpeed[index], 0.0);
    return (u_animTime[index] + time) * speed + u_animPhase[index];
}

vec2 getTranslationAnimation(int index, float time) {
    int aType = u_animType[index];
    float amp = u_animAmplitude[index];
    float t = subjectClock(index, time);
    vec2 trans = vec2(0.0);

    if (hasAnimFlag(aType, ANIM_TRANSLATE)) {
        vec2 o = orbit(t, amp * 0.08, 1.0, vec2(0.0));
        trans += o;
    }

    if (hasAnimFlag(aType, ANIM_PATH)) {
        float lt = applyLoop(t * 0.25, u_animLoop[index]);
        float et = applyEasing(lt, u_animEasing[index]);
        trans += bezier(et, getPathPoint(index, 0), getPathPoint(index, 1), getPathPoint(index, 2), getPathPoint(index, 3)) * amp;
    }

    return trans;
}

float getRotationAnimation(int index, float time) {
    int aType = u_animType[index];
    if (!hasAnimFlag(aType, ANIM_ROTATE)) return 0.0;
    float t = subjectClock(index, time);
    return wave(t, 1.0, u_animAmplitude[index] * 0.8, 0);
}

float getScaleAnimation(int index, float time) {
    int aType = u_animType[index];
    if (!hasAnimFlag(aType, ANIM_SCALE)) return 1.0;
    float t = subjectClock(index, time);
    return pulse(t, 1.0, 1.0 - 0.12 * u_animAmplitude[index], 1.0 + 0.12 * u_animAmplitude[index]);
}

vec2 getDeformationAnimation(vec2 p, int index, float time) {
    int aType = u_animType[index];
    if (!hasAnimFlag(aType, ANIM_DEFORM)) return p;
    float t = subjectClock(index, time);
    float amp = u_animAmplitude[index] * 0.04;
    vec2 q = p;
    q.x += sin(q.y * 10.0 + t * 2.0 + u_animSeed[index]) * amp;
    q.y += cos(q.x * 10.0 + t * 2.0 + u_animSeed[index] * 1.3) * amp;
    return q;
}

vec2 applySubjectTransformations(vec2 localPos, int index, float time) {
    vec2 result = localPos;

    float scale = getScaleAnimation(index, time);
    result *= scale;

    float rot = getRotationAnimation(index, time);
    result = rotate2d(result, rot);

    vec2 trans = getTranslationAnimation(index, time);
    result += trans;

    result = getDeformationAnimation(result, index, time);
    return result;
}

vec2 getSubjectAnimatedCenter(int index, float time) {
    return u_subjectPositions[index] + getTranslationAnimation(index, time);
}

LayerResult renderSubject(
    vec2 worldPos,
    int index,
    float mInf,
    float baseEdge,
    float extra,
    float time,
    out float distToSurface
) {
    int type = u_subjectTypes[index];
    vec2 pos = getSubjectAnimatedCenter(index, time);
    float size = u_subjectSizes[index];

    vec3 colorA = u_subjectColorsA[index];
    vec3 colorB = u_subjectColorsB[index];
    vec3 colorC = u_subjectColorsC[index];

    float spreadA = u_subjectSpreadsA[index];
    float spreadB = u_subjectSpreadsB[index];
    float spreadC = u_subjectSpreadsC[index];

    float intensityA = u_subjectIntensitiesA[index];
    float intensityB = u_subjectIntensitiesB[index];
    float intensityC = u_subjectIntensitiesC[index];

    float baseRotation = u_subjectRotations[index];
    float animRotation = getRotationAnimation(index, time);
    float totalRotation = baseRotation + animRotation;

    vec2 localPos = worldPos - pos;
    localPos = rotate2d(localPos, baseRotation);
    localPos = applySubjectTransformations(localPos, index, time);

    float shift = mInf * 0.03;
    vec2 shiftRight = rotate2d(vec2(shift, 0.0), totalRotation);
    vec2 shiftLeft = rotate2d(vec2(-shift, 0.0), totalRotation);

    float rawDistA = getShapeDistance(localPos + shiftRight, type, size * 0.9);
    float rawDistB = getShapeDistance(localPos, type, size * 1.0);
    float rawDistC = getShapeDistance(localPos + shiftLeft, type, size * 1.1);
    distToSurface = abs(rawDistB);

    float eA = max(baseEdge + spreadA * mInf * 0.14 + extra, 0.001);
    float eB = max(baseEdge + spreadB * mInf * 0.14 + extra, 0.001);
    float eC = max(baseEdge + spreadC * mInf * 0.14 + extra, 0.001);

    float maskA = strokeEdge(rawDistA, 0.0, u_borderSize, eA) * 4.0 * intensityA;
    float maskB = strokeEdge(rawDistB, 0.0, u_borderSize, eB) * 4.0 * intensityB;
    float maskC = strokeEdge(rawDistC, 0.0, u_borderSize, eC) * 4.0 * intensityC;
    float white = strokeEdge(rawDistB, 0.0, u_borderSize, baseEdge) * 4.0;

    LayerResult result;
    result.color = colorA * maskA + colorB * maskB + colorC * maskC;
    result.rgbAlpha = max(maskA, max(maskB, maskC));
    result.white = white;
    result.whiteAlpha = white;
    return result;
}

void renderCanvas(
    vec2 worldPos,
    vec2 relMouse,
    float mInf,
    float baseEdge,
    float extra,
    float time,
    out vec3 finalColor,
    out float finalAlpha
) {
    finalColor = vec3(0.0);
    finalAlpha = 0.0;

    float bestSurface = 1e6;
    vec3 bestColor = vec3(0.0);
    float bestAlpha = 0.0;

    float blend = clamp(mInf * 2.0, 0.0, 1.0);

    for (int i = 0; i < MAX_SUBJECTS; i++) {
        if (i >= u_subjectCount) break;
        float distToSurface = 1e6;
        LayerResult layer = renderSubject(worldPos, i, mInf, baseEdge, extra, time, distToSurface);

        vec3 subjectColor = mix(vec3(1.0) * layer.white, layer.color, blend);
        float subjectAlpha = mix(layer.whiteAlpha, layer.rgbAlpha, blend);

        if (subjectAlpha > 0.0 && distToSurface < bestSurface) {
            bestSurface = distToSurface;
            bestColor = subjectColor;
            bestAlpha = subjectAlpha;
        }
    }

    finalColor = bestColor;
    finalAlpha = bestAlpha;

    if (u_debugMode > 0.5) {
        for (int i = 0; i < MAX_SUBJECTS; i++) {
            if (i >= u_subjectCount) break;
            vec2 c = getSubjectAnimatedCenter(i, time);
            float marker = fill(sdCircle(worldPos, c), 0.018, 0.002);
            finalColor = mix(finalColor, vec3(1.0), marker);
            finalAlpha = max(finalAlpha, marker);

            vec2 d = worldPos - c;
            float axis = 1.0 - smoothstep(0.0, 0.002, abs(d.y));
            axis *= (1.0 - smoothstep(0.0, 0.08, abs(d.x)));
            finalColor += vec3(0.2, 0.6, 1.0) * axis * 0.6;
            finalAlpha = max(finalAlpha, axis * 0.45);
        }
    }
}
`;
