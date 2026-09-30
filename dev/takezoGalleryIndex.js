import { execFile } from 'node:child_process';
import path from 'node:path';

const watched = [
  'public/takezo/showcase/projects/images',
  'public/takezo/showcase/projects/thumbnails',
  'public/takezo/showcase/projects/showcase info.md',
  'public/takezo/showcase/artworks/images',
  'public/takezo/showcase/artworks/thumbnails',
].map((entry) => path.resolve(entry).replaceAll('\\', '/'));

export function takezoGalleryIndex() {
  return {
    name: 'takezo-gallery-index',
    apply: 'serve',
    configureServer(server) {
      let timer = 0;
      let running = false;
      let pending = false;

      const rebuild = () => {
        if (running) {
          pending = true;
          return;
        }
        running = true;
        execFile(process.execPath, [path.resolve('scripts/build-takezo-galleries.mjs')], { cwd: process.cwd() }, (error, stdout, stderr) => {
          running = false;
          if (error) server.config.logger.error(`[takezo galleries] ${stderr || error.message}`);
          else {
            server.config.logger.info(`[takezo galleries] ${stdout.trim()}`);
            server.ws.send({ type: 'full-reload' });
          }
          if (pending) {
            pending = false;
            rebuild();
          }
        });
      };

      const schedule = (changedPath) => {
        const normalized = path.resolve(changedPath).replaceAll('\\', '/');
        if (!watched.some((target) => normalized === target || normalized.startsWith(`${target}/`))) return;
        clearTimeout(timer);
        timer = setTimeout(rebuild, 120);
      };

      server.watcher.on('add', schedule);
      server.watcher.on('change', schedule);
      server.watcher.on('unlink', schedule);
    },
  };
}
