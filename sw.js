/* SmartGolf 서비스워커 v47 (2026-08-23 재작성)
   구버전 문제 2가지를 고쳤다:
   1) HTML에 패치 스크립트를 강제 주입하던 코드 제거 — index.html에서 정리한
      유령 스크립트(v10~v21)를 다시 꽂아 404를 만들고 있었다. 주입 없이 원문 그대로 준다.
   2) 신규 sg_round.js(GPS 라운드)를 자산 목록에 추가. */
const CACHE_NAME = 'smartgolf-v48';
const ASSETS = [
  './',
  './index.html',
  './icons.css',
  './features.js',
  './v6_patch.js', './v7_patch.js', './v8_patch.js', './v9_patch.js',
  './v22_patch.js', './v23_patch.js', './v24_patch.js', './v25_patch.js',
  './v27_patch.js', './v29_patch.js', './v31_patch.js', './v32_patch.js',
  './v33_patch.js', './v34_patch.js', './v35_patch.js', './v36_patch.js',
  './v37_patch.js', './v38_patch.js', './v40_patch.js', './v41_patch.js',
  './v42_patch.js', './sg_round.js', './v44_ui.js',
  './courses_enriched.json',
  './manifest.json'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c =>
    Promise.all(ASSETS.map(u => c.add(u).catch(() => {})))
  ));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
     .then(() => self.clients.matchAll({ type: 'window' }))
     .then(cs => cs.forEach(c => {
       /* 새 워커 접수 즉시 열린 화면 자동 새로고침 (2026-08-23) */
       if (c.url.startsWith(self.location.origin) && 'navigate' in c) c.navigate(c.url).catch(() => {});
     }))
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = req.url;

  // 날씨·지오코딩 등 동적 API: 관여하지 않는다(캐시 금지)
  if (/open-meteo\.com|nominatim\.openstreetmap|photon\.komoot|router\.project-osrm/.test(url)) return;

  // 지도 타일·CDN Leaflet: 캐시 우선(대량 저장은 하지 않고 요청된 것만)
  if (url.includes('tile.openstreetmap.org') || url.includes('unpkg.com/leaflet')) {
    e.respondWith(
      caches.match(req).then(r => r || fetch(req).then(resp => {
        if (resp.status === 200) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, clone));
        }
        return resp;
      }))
    );
    return;
  }

  // 같은 출처 전부: 네트워크 우선(최신 화면·데이터), 끊겼을 때만 캐시
  const sameOrigin = new URL(url).origin === self.location.origin;
  if (!sameOrigin) return;
  e.respondWith(
    fetch(req).then(resp => {
      if (resp && resp.status === 200 && resp.type === 'basic') {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(c => c.put(req, clone));
      }
      return resp;
    }).catch(() =>
      caches.match(req).then(hit => hit || caches.match('./index.html'))
    )
  );
});
