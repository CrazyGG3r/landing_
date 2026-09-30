export const interestMode = (width, height) =>
  width < 700 || width / Math.max(1, height) < 1.45 ? "narrow" : "wide";

export function interestDrive(fraction) {
  if (fraction < .325) return Math.pow((.325 - Math.max(0, fraction)) / .325, 1.6);
  if (fraction > .675) return -Math.pow((Math.min(1, fraction) - .675) / .325, 1.6);
  return 0;
}

export function interestRailMetrics(height, count) {
  const spacing = Math.max(54, Math.min(96, height * .19));
  const start = height * .17;
  const end = start + Math.max(0, count - 1) * spacing;
  return {
    spacing,
    start,
    minimum: Math.min(0, height * .8 - end),
    maximum: 0,
  };
}
