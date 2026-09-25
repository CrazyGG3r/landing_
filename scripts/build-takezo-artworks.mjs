import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('public/takezo/showcase/artworks');
const imageDir = path.join(root, 'images');
const thumbDir = path.join(root, 'thumbnails');
const extensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const catalogPath = path.join(imageDir, 'artwork-catalog.md');

const titleKey = (title) => title.toLowerCase().replace(/\\/g, '').replace(/[^a-z0-9]+/g, '');
const catalog = new Map();
for (const line of (await readFile(catalogPath, 'utf8')).split(/\r?\n/)) {
  if (!line.startsWith('|') || /^\|\s*(?:Title|-)/i.test(line)) continue;
  const fields = line.slice(1, -1).split('|').map((field) => field.trim().replace(/\\([&|])/g, '$1'));
  if (fields.length !== 5) throw new Error(`Invalid artwork catalog row: ${line}`);
  const [title, category, year, short, description] = fields;
  const key = titleKey(title);
  if (catalog.has(key)) throw new Error(`Duplicate artwork catalog title: ${title}`);
  if (!category || !year || !short || !description) throw new Error(`Incomplete artwork catalog entry: ${title}`);
  catalog.set(key, { category, year, short, description });
}

function dimensions(buffer, extension) {
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

const images = (await readdir(imageDir)).filter((name) => extensions.has(path.extname(name).toLowerCase()));
const thumbs = await readdir(thumbDir);
const entries = await Promise.all(images.map(async (name) => {
  const stem = path.parse(name).name;
  const thumb = thumbs.find((candidate) => path.parse(candidate).name.toLowerCase() === stem.toLowerCase() && extensions.has(path.extname(candidate).toLowerCase()));
  if (!thumb) throw new Error(`Artwork ${name} needs a same-named image in artworks/thumbnails`);
  const source = path.join(imageDir, name);
  const [width, height] = dimensions(await readFile(source), path.extname(name).toLowerCase());
  const date = (await stat(source)).mtime.toISOString();
  return { name, stem, thumb, width, height, date };
}));
const names = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
for (const entry of entries)
  if (!catalog.has(titleKey(entry.stem))) throw new Error(`Missing artwork catalog entry: ${entry.stem}`);
const present = new Set(entries.map((entry) => titleKey(entry.stem)));
for (const key of catalog.keys())
  if (!present.has(key)) throw new Error(`Artwork catalog entry has no image: ${key}`);
entries.sort((a, b) => Number(catalog.get(titleKey(a.stem)).year) - Number(catalog.get(titleKey(b.stem)).year)
  || names.compare(a.stem, b.stem) || names.compare(a.name, b.name));
const manifest = entries.map((entry, index) => ({
  id: `artwork-${entry.stem.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${index + 1}`,
  title: entry.stem,
  ...catalog.get(titleKey(entry.stem)),
  kind: 'artwork',
  date: entry.date,
  software: [],
  images: [{ src: `/takezo/showcase/artworks/images/${encodeURI(entry.name)}`, thumb: `/takezo/showcase/artworks/thumbnails/${encodeURI(entry.thumb)}`, width: entry.width, height: entry.height }],
  video: null,
}));
await writeFile('src/features/takezo/artworkManifest.js', `export default ${JSON.stringify(manifest, null, 2)};\n`);
console.log(`${manifest.length} artworks indexed`);
