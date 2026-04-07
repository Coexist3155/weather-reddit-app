/* Weather+Reddit PWA — Combined Service Worker */
const CACHE = 'wr-pwa-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './weather/index.html',
  './weather/app.js',
  './weather/style.css',
  './weather/icons/icon-192.png',
  './weather/icons/icon-512.png',
  './reddit/index.html',
  './reddit/icon-192.png',
  './reddit/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const { hostname } = url;

  const FONT_HOSTS = new Set(['fonts.googleapis.com', 'fonts.gstatic.com']);
  const API_HOSTS  = new Set(['api.met.no', 'nominatim.openstreetmap.org', 'reddit.com', 'www.reddit.com']);

  if (API_HOSTS.has(hostname)) {
    e.respondWith(
      fetch(e.request).catch(() =>
        new Response(JSON.stringify({ error: 'offline' }), {
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  if (FONT_HOSTS.has(hostname)) {
    e.respondWith(fetch(e.request).catch(() => new Response('', { status: 503 })));
    return;
  }

  // Cache-first for app shell
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      });
    })
  );
});
