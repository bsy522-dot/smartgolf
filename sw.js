const CACHE_NAME = 'smartgolf-v44';
const ASSETS = [
  './',
  './index.html',
  './icons.css',
  './features.js',
  './v6_patch.js',
  './v7_patch.js',
  './v8_patch.js',
  './v9_patch.js',
  './v10_patch.js',
  './v11_patch.js',
  './v12_patch.js',
  './v13_patch.js',
  './v14_patch.js',
  './v15_patch.js',
  './v16_patch.js',
  './v17_patch.js',
  './v18_patch.js',
  './v19_patch.js',
  './v20_patch.js',
  './v21_patch.js',
  './v22_patch.js',
  './v23_patch.js',
  './v24_patch.js',
  './v25_patch.js',
  './v26_patch.js',
  './v27_patch.js',
  './v28_patch.js',
  './v29_patch.js',
  './v30_patch.js',
  './v31_patch.js',
  './v32_patch.js',
  './v33_patch.js',
  './v34_patch.js',
  './v35_patch.js',
  './v36_patch.js',
  './v37_patch.js',
  './v38_patch.js',
  './v39_patch.js',
  './v40_patch.js',
  './courses_enriched.json',
  './manifest.json'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // HTML pages: inject features.js + patches, network-first
  if (e.request.mode === 'navigate' || url.endsWith('.html') || url.endsWith('/')) {
    e.respondWith(
      fetch(e.request).then(r => {
        return r.text().then(html => {
          const scripts = ['features.js', 'v6_patch.js', 'v7_patch.js', 'v8_patch.js', 'v9_patch.js', 'v10_patch.js', 'v11_patch.js', 'v12_patch.js', 'v13_patch.js', 'v14_patch.js', 'v15_patch.js', 'v16_patch.js', 'v17_patch.js', 'v18_patch.js', 'v19_patch.js', 'v20_patch.js', 'v21_patch.js', 'v22_patch.js', 'v23_patch.js', 'v24_patch.js', 'v25_patch.js', 'v26_patch.js', 'v27_patch.js', 'v28_patch.js', 'v29_patch.js', 'v30_patch.js', 'v31_patch.js', 'v32_patch.js', 'v33_patch.js', 'v34_patch.js', 'v35_patch.js', 'v36_patch.js', 'v37_patch.js', 'v38_patch.js', 'v39_patch.js', 'v40_patch.js'];
          scripts.forEach(s => {
            if (html.includes('</body>') && !html.includes(s)) {
              html = html.replace('</body>', '<script src="' + s + '" defer><\/script>\n</body>');
            }
          });
          const resp = new Response(html, {
            status: r.status,
            statusText: r.statusText,
            headers: {'Content-Type': 'text/html; charset=UTF-8'}
          });
          caches.open(CACHE_NAME).then(c => c.put(e.request, resp.clone()));
          return resp;
        });
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // JSON data: network-first
  if (url.includes('courses_enriched.json')) {
    e.respondWith(
      fetch(e.request).then(r => {
        const clone = r.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return r;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // Map tiles and Leaflet: cache-first
  if (url.includes('tile.openstreetmap.org') || url.includes('unpkg.com/leaflet')) {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
        if (resp.status === 200) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return resp;
      }))
    );
    return;
  }

  // Dynamic APIs (weather/geocode): network-only, never cache
  if (/open-meteo\.com|nominatim\.openstreetmap|photon\.komoot|router\.project-osrm/.test(url)) { return; }

  // Everything else: cache-first, GET only
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      if (resp.status === 200 && e.request.method === 'GET') {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      }
      return resp;
    }))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});
