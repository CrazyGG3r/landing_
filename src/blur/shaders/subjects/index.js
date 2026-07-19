import { roundedRect } from './rounded-rect.js';
import { circle } from './circle.js';
import { heart } from './heart.js';
import { star } from './star.js';
import { anvil } from './anvil.js';

export const SHAPE_TYPES = Object.freeze({
  ROUNDED_RECT: 0,
  HEART: 1,
  STAR: 2,
  CIRCLE: 3,
  ANVIL: 4,
});

export const BLEND_MODES = Object.freeze({
  NORMAL: 0,
  ADD: 1,
  MULTIPLY: 2,
  SCREEN: 3,
});

export const shapeRegistry = Object.freeze([
  { id: SHAPE_TYPES.ROUNDED_RECT, name: 'roundedRect', fn: 'sdRoundedRect', params: ['roundness'] },
  { id: SHAPE_TYPES.HEART, name: 'heart', fn: 'sdHeart', params: [] },
  { id: SHAPE_TYPES.STAR, name: 'star', fn: 'sdStar', params: [] },
  { id: SHAPE_TYPES.CIRCLE, name: 'circle', fn: 'sdCircleSubject', params: [] },
  { id: SHAPE_TYPES.ANVIL, name: 'anvil', fn: 'sdAnvil', params: [] },
]);

export function getShapeById(id) {
  return shapeRegistry.find(shape => shape.id === id) ?? shapeRegistry[0];
}

export function getShapeIdByName(name) {
  return shapeRegistry.find(shape => shape.name === name)?.id ?? SHAPE_TYPES.ROUNDED_RECT;
}

export function isValidShapeType(type) {
  return shapeRegistry.some(shape => shape.id === type);
}

export function normalizeSubjectConfig(subject, fallback) {
  const base = fallback ?? {};
  const type = Number.isInteger(subject?.type) && isValidShapeType(subject.type)
    ? subject.type
    : (Number.isInteger(base.type) ? base.type : SHAPE_TYPES.ROUNDED_RECT);

  return {
    ...base,
    ...subject,
    type,
  };
}

export const subjectFunctions = `
${roundedRect}
${heart}
${star}
${circle}
${anvil}

float sdSubjectByType(
    int shapeType,
    vec2 p,
    float sizeMult,
    float shapeSize,
    float roundness
) {
    if (shapeType == ${SHAPE_TYPES.ROUNDED_RECT}) return sdRoundedRect(p, sizeMult, shapeSize, roundness);
    if (shapeType == ${SHAPE_TYPES.HEART}) return sdHeart(p, sizeMult, shapeSize);
    if (shapeType == ${SHAPE_TYPES.STAR}) return sdStar(p, sizeMult, shapeSize);
    if (shapeType == ${SHAPE_TYPES.CIRCLE}) return sdCircleSubject(p, sizeMult, shapeSize);
    if (shapeType == ${SHAPE_TYPES.ANVIL}) return sdAnvil(p, sizeMult, shapeSize);
    return sdRoundedRect(p, sizeMult, shapeSize, roundness);
}
`;
