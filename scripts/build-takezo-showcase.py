"""Build Takezo gallery metadata and compact WebP previews from the source notes."""
import json
import re
from pathlib import Path
from PIL import Image, ImageOps

root = Path('public/takezo/showcase')
source = (root / 'showcase info.md').read_text(encoding='utf-8')
thumb_dir = root / 'thumbnails'
thumb_dir.mkdir(exist_ok=True)
logos = {'Blender': 'Blender', 'Adobe Substance 3D Painter': 'SP3D',
         'Adobe Photoshop': 'PS', 'JavaScript': 'JS', 'Unity': 'Unity3D',
         'ZBrush': 'ZBrush', 'Marvelous Designer': 'MD3D'}
items = []
for section in re.split(r'(?=^## \d+\. )', source, flags=re.M):
    heading = re.search(r'^## \d+\. (.+)', section)
    if not heading:
        continue
    title = heading.group(1).strip()
    def field(name):
        found = re.search(r'^\*\*' + re.escape(name) + r':\*\*\s*(.+)', section, flags=re.M)
        return found.group(1).strip() if found else ''
    images = []
    for match in re.finditer(r'!\[[^]]*\]\((?:<([^>]+)>|([^()]+(?:\([^()]+\)[^()]*)?))\)', section):
        filename = match.group(1) or match.group(2)
        path = root / 'images' / filename
        if not path.exists():
            raise FileNotFoundError(path)
        with Image.open(path) as original:
            w, h = original.size
            preview = ImageOps.exif_transpose(original).convert('RGB')
            preview.thumbnail((1080, 1080), Image.Resampling.LANCZOS)
            target = thumb_dir / (path.stem + '.webp')
            preview.save(target, 'WEBP', quality=78, method=6)
        images.append({'src': '/takezo/showcase/images/' + filename,
                       'thumb': '/takezo/showcase/thumbnails/' + target.name,
                       'width': w, 'height': h})
    software = [logos[name.strip()] for name in field('Software Used').split(',') if name.strip() in logos]
    main = section.split('**Main Info:**', 1)[-1].split('**Images:**', 1)[0].split('**Video:**', 1)[0].strip()
    main = re.sub(r'^\*\*Live Demo:.*$', '', main, flags=re.M).strip()
    main = re.sub(r'\[([^]]+)\]\([^)]*\)', r'\1', main).replace('*','').strip()
    slug = re.sub('[^a-z0-9]+', '-', title.lower()).strip('-')
    video = {'src':'/takezo/showcase/videos/Polycrate.mp4',
             'thumb':'/takezo/showcase/videos/thumbnails/Polycrate.webm'} if title.lower() == 'polycrate' else None
    if not images and not video:
        raise ValueError('No media for ' + title)
    items.append({'id':slug, 'title':title, 'short':field('Short Info'),
                  'year':field('Year'), 'software':software, 'description':main,
                  'images':images, 'video':video})
Path('src/features/takezo/showcaseManifest.js').write_text('export default ' + json.dumps(items, indent=2, ensure_ascii=False) + ';\n', encoding='utf-8')
print(f'{len(items)} projects; {sum(len(p["images"]) for p in items)} optimized previews')
