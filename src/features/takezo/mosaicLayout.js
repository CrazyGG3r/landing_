// Rectangles use [column, row, columnSpan, rowSpan], on a one-based 6 × 6 grid.
export const layouts = {
  spire: [
    [1, 1, 1, 6],
    [2, 1, 3, 6],
    [5, 1, 2, 3],
    [5, 4, 2, 3],
  ],
  canopy: [
    [1, 1, 6, 2],
    [1, 3, 2, 4],
    [3, 3, 2, 4],
    [5, 3, 2, 4],
  ],
  folio: [
    [1, 1, 3, 6],
    [4, 1, 3, 2],
    [4, 3, 3, 2],
    [4, 5, 3, 2],
  ],
  caption: [
    [1, 1, 6, 1],
    [1, 2, 2, 5],
    [3, 2, 2, 5],
    [5, 2, 2, 5],
  ],
  work: [
    [1, 1, 6, 1],
    [1, 2, 4, 3],
    [5, 2, 2, 3],
    [1, 5, 2, 2],
    [3, 5, 2, 2],
    [5, 5, 2, 2],
  ],
  cabinet: [
    [1, 1, 2, 4],
    [3, 1, 3, 2],
    [6, 1, 1, 6],
    [3, 3, 3, 2],
    [1, 5, 2, 2],
    [3, 5, 1, 2],
    [4, 5, 1, 2],
    [5, 5, 1, 2],
  ],
  slats: Array.from({ length: 6 }, (_, i) => [i + 1, 1, 1, 6]),
  ribbons: Array.from({ length: 6 }, (_, i) => [1, i + 1, 6, 1]),
  contactSheet: Array.from({ length: 12 }, (_, i) => [
    (i % 6) + 1,
    Math.floor(i / 6) * 3 + 1,
    1,
    3,
  ]),
  nine: Array.from({ length: 9 }, (_, i) => [
    (i % 3) * 2 + 1,
    Math.floor(i / 3) * 2 + 1,
    2,
    2,
  ]),
  atlas: Array.from({ length: 36 }, (_, i) => [
    (i % 6) + 1,
    Math.floor(i / 6) + 1,
    1,
    1,
  ]),
};

export function generateLayout(count) {
  if (!Number.isInteger(count) || count < 1 || count > 36)
    throw new Error("Takezo supports 1–36 panels.");
  const result = [[1, 1, 6, 6]];
  while (result.length < count) {
    let largest = 0;
    result.forEach((rect, i) => {
      if (rect[2] * rect[3] > result[largest][2] * result[largest][3])
        largest = i;
    });
    const [x, y, w, h] = result[largest];
    const vertical = w >= h && w > 1;
    const half = Math.floor((vertical ? w : h) / 2);
    result.splice(
      largest,
      1,
      ...(vertical
        ? [
            [x, y, half, h],
            [x + half, y, w - half, h],
          ]
        : [
            [x, y, w, half],
            [x, y + half, w, h - half],
          ]),
    );
  }
  return result;
}

export function layoutFor(node) {
  const result = node.layout || generateLayout(node.cards.length);
  if (
    node.cards.length < 1 ||
    node.cards.length > 36 ||
    result.length !== node.cards.length
  )
    throw new Error(
      "Takezo layouts require one rectangle per panel, up to 36 panels.",
    );
  return result;
}

export function expandedTracks(start, span, pixels, desired) {
  if (span === 6 || pixels <= 0) return Array(6).fill(1);
  const baseShare = span / 6;
  const share = Math.max(baseShare, Math.min(0.78, desired / pixels));
  return Array.from({ length: 6 }, (_, i) =>
    i >= start - 1 && i < start - 1 + span
      ? (share * 6) / span
      : ((1 - share) * 6) / (6 - span),
  );
}

export function maximumTracks(start, span, pixels, gap = 0) {
  if (span === 6 || pixels <= 0) return Array(6).fill(1);
  const available = Math.max(1, pixels - gap * 5);
  const minimum = Math.min(available / 6, pixels < 600 ? 28 : 44);
  const small = minimum / available * 6;
  const large = (6 - small * (6 - span)) / span;
  return Array.from({ length: 6 }, (_, i) => i >= start - 1 && i < start - 1 + span ? large : small);
}

export function trackStyle(layout, active, width, height, maximum = false, gap = 0) {
  const rect = layout[active];
  const tracks = maximum
    ? (start, span, pixels) => maximumTracks(start, span, pixels, gap)
    : expandedTracks;
  const cols = rect
    ? tracks(rect[0], rect[2], width, Math.min(440, width * 0.8))
    : Array(6).fill(1);
  const rows = rect
    ? tracks(rect[1], rect[3], height, Math.min(440, height * 0.72))
    : Array(6).fill(1);
  return {
    gridTemplateColumns: cols.map((n) => `minmax(0, ${n}fr)`).join(" "),
    gridTemplateRows: rows.map((n) => `minmax(0, ${n}fr)`).join(" "),
  };
}
