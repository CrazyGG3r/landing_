import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  assetUrl,
  groupNumberedImages,
  imageDimensions,
  imageExtensions,
  slugify,
  stemOf,
  titleKey,
} from './takezo-gallery-utils.mjs';

const publicRoot = path.resolve('public/takezo/showcase');
const outputRoot = path.resolve('src/features/takezo');
const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

async function scanImages(section) {
  const root = path.join(publicRoot, section);
  const imageDir = path.join(root, 'images');
  const thumbDir = path.join(root, 'thumbnails');
  const imageNames = (await readdir(imageDir)).filter((name) => imageExtensions.has(path.extname(name).toLowerCase()));
  const thumbNames = await readdir(thumbDir).catch(() => []);
  const thumbs = new Map(thumbNames
    .filter((name) => imageExtensions.has(path.extname(name).toLowerCase()))
    .map((name) => [titleKey(stemOf(name)), name]));

  return Promise.all(imageNames.map(async (name) => {
    const source = path.join(imageDir, name);
    const extension = path.extname(name).toLowerCase();
    const [width, height] = imageDimensions(await readFile(source), extension);
    const thumb = thumbs.get(titleKey(stemOf(name)));
    return {
      name,
      stem: stemOf(name),
      width,
      height,
      date: (await stat(source)).mtime.toISOString(),
      src: assetUrl(`${section}/images`, name),
      // A new original is immediately usable. Add a same-stem optimized preview later if desired.
      thumb: thumb ? assetUrl(`${section}/thumbnails`, thumb) : assetUrl(`${section}/images`, name),
    };
  }));
}

function field(section, name) {
  return section.match(new RegExp(`^\\*\\*${name}:\\*\\*\\s*(.+)`, 'm'))?.[1]?.trim() || '';
}

function projectMetadata(markdown) {
  const softwareLogos = {
    Blender: 'Blender',
    'Adobe Substance 3D Painter': 'SP3D',
    'Adobe Photoshop': 'PS',
    JavaScript: 'JS',
    Unity: 'Unity3D',
    ZBrush: 'ZBrush',
    'Marvelous Designer': 'MD3D',
  };
  const records = [];
  for (const section of markdown.split(/(?=^##\s+\d+\.\s+)/m)) {
    const title = section.match(/^##\s+\d+\.\s+(.+)/m)?.[1]?.trim();
    if (!title) continue;
    let description = section.split('**Main Info:**', 2)[1]?.split(/\*\*(?:Images|Video):\*\*/, 1)[0]?.trim() || '';
    description = description
      .replace(/^\*\*Live Demo:.*$/gm, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/\*/g, '')
      .trim();
    records.push({
      key: titleKey(title),
      title,
      short: field(section, 'Short Info'),
      year: field(section, 'Year'),
      software: field(section, 'Software Used').split(',').map((name) => softwareLogos[name.trim()]).filter(Boolean),
      description,
      video: titleKey(title) === titleKey('PolyCrate') ? {
        src: '/takezo/showcase/projects/videos/Polycrate.mp4',
        thumb: '/takezo/showcase/projects/videos/thumbnails/Polycrate.webm',
      } : null,
    });
  }
  return records;
}

function artworkMetadata(markdown) {
  const catalog = new Map();
  for (const line of markdown.split(/\r?\n/)) {
    if (!line.startsWith('|') || /^\|\s*(?:Title|-)/i.test(line)) continue;
    const fields = line.slice(1, -1).split('|').map((value) => value.trim().replace(/\\([&|])/g, '$1'));
    if (fields.length !== 5) throw new Error(`Invalid artwork catalog row: ${line}`);
    const [title, category, year, short, description] = fields;
    catalog.set(titleKey(title), { title, category, year, short, description });
  }
  return catalog;
}

function mediaFor(group) {
  return group.entries.map(({ src, thumb, width, height }) => ({ src, thumb, width, height }));
}

async function buildProjects() {
  const markdown = await readFile(path.join(publicRoot, 'projects/showcase info.md'), 'utf8');
  const metadata = projectMetadata(markdown);
  const metadataByKey = new Map(metadata.map((record) => [record.key, record]));
  const groups = groupNumberedImages(await scanImages('projects'));
  const groupsByKey = new Map(groups.map((group) => [group.key, group]));
  const projects = [];

  for (const record of metadata) {
    const group = groupsByKey.get(record.key);
    if (!group && !record.video) continue;
    projects.push({
      id: slugify(record.title),
      title: record.title,
      short: record.short || 'Details coming soon.',
      year: record.year || '-',
      software: record.software,
      description: record.description || 'Additional project details will be added soon.',
      images: group ? mediaFor(group) : [],
      video: record.video,
    });
  }

  const unlisted = groups.filter((group) => !metadataByKey.has(group.key))
    .sort((a, b) => Date.parse(b.entries[0].date) - Date.parse(a.entries[0].date) || collator.compare(a.title, b.title));
  for (const group of unlisted) projects.push({
    id: slugify(group.title),
    title: group.title,
    short: 'Details coming soon.',
    year: '-',
    software: [],
    description: 'Additional project details will be added soon.',
    images: mediaFor(group),
    video: null,
  });

  await writeFile(path.join(outputRoot, 'showcaseManifest.js'), `export default ${JSON.stringify(projects, null, 2)};\n`);
  return { items: projects.length, images: projects.reduce((sum, item) => sum + item.images.length, 0) };
}

async function buildArtworks() {
  const catalog = artworkMetadata(await readFile(path.join(publicRoot, 'artworks/images/artwork-catalog.md'), 'utf8'));
  const groups = groupNumberedImages(await scanImages('artworks'));
  const artworks = groups.map((group) => {
    const metadata = catalog.get(group.key)
      || group.entries.map((entry) => catalog.get(titleKey(entry.stem))).find(Boolean)
      || {};
    return {
      id: slugify(group.title),
      title: group.title,
      category: metadata.category || 'uncategorized',
      year: metadata.year || '-',
      short: metadata.short || 'Details coming soon.',
      description: metadata.description || 'Additional artwork details will be added soon.',
      kind: 'artwork',
      date: group.entries.map((entry) => entry.date).sort().at(-1),
      software: [],
      images: mediaFor(group),
      video: null,
    };
  });
  artworks.sort((a, b) => {
    const aYear = Number(a.year) || Number.MAX_SAFE_INTEGER;
    const bYear = Number(b.year) || Number.MAX_SAFE_INTEGER;
    return aYear - bYear || collator.compare(a.title, b.title);
  });
  await writeFile(path.join(outputRoot, 'artworkManifest.js'), `export default ${JSON.stringify(artworks, null, 2)};\n`);
  return { items: artworks.length, images: artworks.reduce((sum, item) => sum + item.images.length, 0) };
}

const [projects, artworks] = await Promise.all([buildProjects(), buildArtworks()]);
console.log(`${projects.items} projects / ${projects.images} images; ${artworks.items} artworks / ${artworks.images} images indexed`);
