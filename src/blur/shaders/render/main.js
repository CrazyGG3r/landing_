import { uniforms } from '../uniforms.js';
import { coordFunctions } from '../core/coord.js';
import { helperFunctions } from '../core/helpers.js';
import { noiseFunctions } from '../lens/noise.js';
import { smokeFunctions } from '../lens/smoke.js';
import { ditherFunctions } from '../lens/dither.js';
import { impactFunctions } from '../lens/impact.js';
import { subjectFunctions } from '../subjects/index.js';
import { layerFunctions } from '../canvas/layers.js';
import { canvasManagerFunctions } from '../canvas/manager.js';

export const fragmentShader = `
${uniforms}

${coordFunctions}
${helperFunctions}
${noiseFunctions}
${smokeFunctions}
${ditherFunctions}
${impactFunctions}
${subjectFunctions}
${layerFunctions}
${canvasManagerFunctions}

void main() {
    vec2 st = st0 + 0.5;
    vec2 relMouse = mx * vec2(1.0, -1.0) + 0.5;
    vec2 worldPos = st - (u_shapePos - 0.5);

    float mInf = 1.0 - smoothstep(0.0, 0.45, length(st - relMouse));
    float baseEdge = fill(sdCircle(st, relMouse), u_impactSize, u_impactEdge);

    float noiseEdge = 0.0;
    if (u_noise > 0.0) {
        float n = vnoise(st * 16.0 + u_time * 2.0) * 2.0 - 1.0;
        noiseEdge = n * u_noise * 0.36 * mInf;
    }

    float smokeEdge = 0.0;
    float smokeVol = 0.0;
    if (u_smoke > 0.0) {
        vec2 p = (st - (u_shapePos - 0.5) - 0.5) * 3.5;
        float sw = smokeWarp(p);
        float df = 1.0 - smoothstep(0.0, 0.5 * max(mInf, 0.05), length(st - relMouse));
        smokeEdge = (sw - 0.5) * u_smoke * 0.6 * mInf;
        smokeVol = pow(sw, 2.5) * df * u_smoke;
    }

    vec3 col;
    float a;
    float extra = noiseEdge + smokeEdge;
    renderCanvas(worldPos, relMouse, mInf, baseEdge, extra, smokeVol, col, a);

    if (u_dither > 0.0 && a > 0.001) {
        vec2 spx = gl_FragCoord.xy / u_pixelRatio;
        vec2 dpx = spx + vec2(
            floor(mod(u_time * 7.0, 4.0)),
            floor(mod(u_time * 5.0, 4.0))
        );
        float thr = mix(bayer4(dpx), hash21(spx * 0.5 + u_time * 13.7), 0.35);
        float q = step(thr, a * (1.0 / max(u_dither, 0.001)) * u_dither);
        col = mix(col, col * q, u_dither);
        a = mix(a, a * q, u_dither);
    }

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), clamp(a, 0.0, 1.0));
}
`;
