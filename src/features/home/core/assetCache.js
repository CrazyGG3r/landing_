const imageCache = new Map();
const jsonCache = new Map();
const binaryCache = new Map();

function uniq(list) {
  return Array.from(new Set((list || []).filter(Boolean)));
}

function isRemoteUrl(url) {
  return /^https?:\/\//i.test(url);
}

export function preloadImages(urls = []) {
  const unique = uniq(urls);
  if (unique.length === 0) return Promise.resolve([]);

  const tasks = unique.map((url) => {
    const cached = imageCache.get(url);
    if (cached?.status === 'loaded') return Promise.resolve(url);
    if (cached?.promise) return cached.promise;

    const img = new Image();
    if (isRemoteUrl(url)) img.crossOrigin = 'anonymous';

    const promise = new Promise((resolve) => {
      img.onload = () => {
        imageCache.set(url, { status: 'loaded', image: img });
        resolve(url);
      };
      img.onerror = () => {
        imageCache.set(url, { status: 'error', image: img });
        resolve(url);
      };
    });

    imageCache.set(url, { status: 'loading', image: img, promise });
    img.src = url;
    return promise;
  });

  return Promise.allSettled(tasks);
}

export function preloadJson(urls = []) {
  const unique = uniq(urls);
  if (unique.length === 0) return Promise.resolve([]);

  const tasks = unique.map((url) => {
    const cached = jsonCache.get(url);
    if (cached?.status === 'loaded') return Promise.resolve(url);
    if (cached?.promise) return cached.promise;

    const promise = fetch(url, { credentials: 'same-origin' })
      .then((res) => {
        if (!res.ok) throw new Error(`Unable to preload ${url}: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        jsonCache.set(url, { status: 'loaded', data });
        return url;
      })
      .catch(() => {
        jsonCache.set(url, { status: 'error', data: null });
        return url;
      });

    jsonCache.set(url, { status: 'loading', promise });
    return promise;
  });

  return Promise.allSettled(tasks);
}

export function preloadBinary(urls = []) {
  const unique = uniq(urls);
  if (unique.length === 0) return Promise.resolve([]);

  const tasks = unique.map((url) => {
    const cached = binaryCache.get(url);
    if (cached?.status === 'loaded') return Promise.resolve(url);
    if (cached?.promise) return cached.promise;

    const promise = fetch(url, { credentials: 'same-origin' })
      .then((res) => {
        if (!res.ok) throw new Error(`Unable to preload ${url}: ${res.status}`);
        return res.arrayBuffer();
      })
      .then((data) => {
        binaryCache.set(url, { status: 'loaded', data });
        return url;
      })
      .catch(() => {
        binaryCache.set(url, { status: 'error', data: null });
        return url;
      });

    binaryCache.set(url, { status: 'loading', promise });
    return promise;
  });

  return Promise.allSettled(tasks);
}

export function getCachedImage(url) {
  const cached = imageCache.get(url);
  if (!cached || cached.status !== 'loaded') return null;
  return cached.image;
}

export function getCachedJson(url) {
  const cached = jsonCache.get(url);
  if (!cached || cached.status !== 'loaded') return null;
  return cached.data;
}

export function getCachedBinary(url) {
  const cached = binaryCache.get(url);
  if (!cached || cached.status !== 'loaded') return null;
  return cached.data;
}
