// Cards retain their name order. Every column fills the supplied height; the
// images' aspect ratios determine individual row heights within that column.
export function singleRowArtworkHeight(cards, viewportWidth, railHeight) {
  const widest = Math.max(1, ...cards.map(({ project }) => {
    const { width, height } = project.images[0];
    return width / height;
  }));
  // Leave room for the gallery's edge fade even for the widest landscape.
  return Math.min(railHeight, viewportWidth * .82 / widest);
}

export function artworkColumns(cards, railHeight, gap = 18, rows = 2) {
  if (!cards.length) return [];
  const count = Math.max(1, Math.min(5, Math.round(rows)));
  const minWidth = Math.min(140, railHeight * .24);
  const maxWidth = Math.min(520, Math.max(320, railHeight * .7));
  const columns = [];
  const columnCount = Math.ceil(cards.length / count);
  for (let index = 0; index < columnCount; index++) {
    const start = Math.round(index * cards.length / columnCount);
    const end = Math.round((index + 1) * cards.length / columnCount);
    const group = cards.slice(start, end);
    const ratios = group.map(({ project }) => {
      const image = project.images[0];
      return Math.max(.01, image.width / image.height);
    });
    const available = railHeight - gap * (group.length - 1);
    const naturalWidth = available / ratios.reduce((sum, ratio) => sum + 1 / ratio, 0);
    const width = count === 1 ? naturalWidth : Math.max(minWidth, Math.min(maxWidth, naturalWidth));
    const heights = ratios.map((ratio) => naturalWidth / ratio);
    heights[heights.length - 1] = available
      - heights.slice(0, -1).reduce((sum, height) => sum + height, 0);
    columns.push({ start, cards: group, width, heights });
  }
  return columns;
}

export function artworkPositions(columns, gap = 18) {
  const items = [];
  let x = 0;
  for (const column of columns) {
    let y = 0;
    column.cards.forEach((card, row) => {
      const height = column.heights[row];
      items.push({ card, x, y, width: column.width, height });
      y += height + gap;
    });
    x += column.width + gap;
  }
  return { items, width: Math.max(0, x - gap) };
}
