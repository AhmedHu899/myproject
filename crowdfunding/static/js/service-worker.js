const CACHE_NAME = 'alfath-v1';
const urlsToCache = [
  '/',
  '/static/css/style.css',
  '/static/js/home.js',
  '/static/images/logo.png'
];

// التثبيت
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});