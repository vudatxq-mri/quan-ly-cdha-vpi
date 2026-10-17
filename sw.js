// RADOPS - Service Worker cho Khoa CĐHA BV Vĩnh Phúc VPI
// Hỗ trợ hoạt động Offline trong phòng máy chì (CT / MRI / X-quang) khi sóng 4G yếu

const CACHE_NAME = 'radops-vpi-cache-v8-daily-logs-helium';
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './favicon.png'
];

// 1. Cài đặt Service Worker và lưu Cache tài nguyên cơ bản (An toàn, không crash)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[RADOPS SW] Caching offline assets for hospital rooms...');
      return Promise.allSettled(
        STATIC_ASSETS.map((url) =>
          cache.add(url).catch((err) => console.warn('[RADOPS SW] Cache skip:', url))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// 2. Kích hoạt và dọn dẹp cache cũ
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[RADOPS SW] Cleaning old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Xử lý yêu cầu Fetch (Chiến lược Network-first, fallback về Cache)
self.addEventListener('fetch', (event) => {
  // Bỏ qua các yêu cầu non-GET hoặc chrome-extension
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Nếu fetch thành công, clone và lưu vào cache
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Khi mất mạng / trong phòng chì, lấy từ cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Nếu yêu cầu trang web, fallback về index.html
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
