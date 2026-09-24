import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('public/takezo/showcase/artworks');
const imageDir = path.join(root, 'images');
const thumbDir = path.join(root, 'thumbnails');
const extensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

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
entries.sort((a, b) => b.date.localeCompare(a.date) || a.name.localeCompare(b.name));
const manifest = entries.map((entry, index) => ({
  id: `artwork-${entry.stem.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${index + 1}`,
  title: entry.stem,
  short: `Its an Artwork ${index + 1}`,
  description: `To be added soon ${index + 1}`,
  year: '-',
  kind: 'artwork',
  date: entry.date,
  software: [],
  images: [{ src: `/takezo/showcase/artworks/images/${encodeURIComponent(entry.name)}`, thumb: `/takezo/showcase/artworks/thumbnails/${encodeURIComponent(entry.thumb)}`, width: entry.width, height: entry.height }],
  video: null,
}));
await writeFile('src/features/takezo/artworkManifest.js', `export default ${JSON.stringify(manifest, null, 2)};\n`);
console.log(`${manifest.length} artworks indexed`);
