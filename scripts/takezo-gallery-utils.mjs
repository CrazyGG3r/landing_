import path from 'node:path';

export const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

export const titleKey = (title) => title
  .toLowerCase()
  .replace(/\\/g, '')
  .replace(/\band\b/g, '+')
  .replace(/[^a-z0-9]+/g, '');

export const slugify = (title) => title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

export const assetUrl = (folder, name) =>
  `/takezo/showcase/${folder}/${encodeURIComponent(name)}`;

function numberedCandidate(stem) {
  let match = stem.match(/^(.*?)\s+\((\d+)\)$/);
  if (match) return { base: match[1].trim(), order: Number(match[2]), definite: true };

  match = stem.match(/^(.*?)\s+(\d+)\s+of\s+(\d+)$/i);
  if (match) return { base: match[1].trim(), order: Number(match[2]), definite: true };

  match = stem.match(/^(.*?)[\s_-]+(\d+)$/);
  return match ? { base: match[1].trim(), order: Number(match[2]), definite: false } : null;
}

/** Group `Title`, `Title (1)`, `Title (2)` and repeated plain-number suffixes. */
export function groupNumberedImages(entries) {
  const candidates = entries.map((entry) => ({ entry, numbered: numberedCandidate(entry.stem) }));
  const plainCounts = new Map();
  for (const { numbered } of candidates) {
    if (!numbered || numbered.definite) continue;
    const key = titleKey(numbered.base);
    plainCounts.set(key, (plainCounts.get(key) || 0) + 1);
  }

  const groups = new Map();
  for (const { entry, numbered } of candidates) {
    const useNumber = numbered && (numbered.definite || plainCounts.get(titleKey(numbered.base)) > 1);
    const title = useNumber ? numbered.base : entry.stem;
    const key = titleKey(title);
    if (!groups.has(key)) groups.set(key, { key, title, entries: [] });
    groups.get(key).entries.push({ ...entry, order: useNumber ? numbered.order : 0 });
  }

  const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
  return [...groups.values()].map((group) => ({
    ...group,
    entries: group.entries.sort((a, b) => a.order - b.order || collator.compare(a.name, b.name)),
  }));
}

export function imageDimensions(buffer, extension) {
  if (extension === '.png' && buffer.toString('ascii', 1, 4) === 'PNG')
    return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
  if (extension === '.webp' && buffer.toString('ascii', 0, 4) === 'RIFF') {
    const format = buffer.toString('ascii', 12, 16);
    if (format === 'VP8X') return [1 + buffer.readUIntLE(24, 3), 1 + buffer.readUIntLE(27, 3)];
    if (format === 'VP8L') return [1 + (((buffer[22] & 0x3f) << 8) | buffer[21]), 1 + (((buffer[24] & 15) << 10) | (buffer[23] << 2) | ((buffer[22] & 0xc0) >> 6))];
    if (format === 'VP8 ') return [buffer.readUInt16LE(26) & 0x3fff, buffer.readUInt16LE(28) & 0x3fff];
  }
  if (['.jpg', '.jpeg'].includes(extension)) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker))
        return [buffer.readUInt16BE(offset + 7), buffer.readUInt16BE(offset + 5)];
      const length = buffer.readUInt16BE(offset + 2);
      if (length < 2) break;
      offset += length + 2;
    }
  }
  throw new Error(`Unsupported or invalid image: ${extension}`);
}

export function stemOf(name) {
  return path.parse(name).name;
}
