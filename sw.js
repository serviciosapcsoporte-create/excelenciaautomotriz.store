/* Excelencia Automotriz - Service Worker v3
   GitHub Pages fija Cache-Control max-age=600 y no permite headers custom.
   Este SW extiende a 1 año (31536000s) para visitas repetidas y offline. */
var CACHE = 'excelencia-v3';
var CORE = [
  '/',
  '/index.html',
  '/404.html',
  '/img/favicon.png',
  '/img/logo-142.webp',
  '/img/logo-284.webp',
  '/img/bateria-3d-660.webp',
  '/img/bateria-3d-378.webp',
  '/img/hero-battery.mp4',
  '/js/script.js',
  '/css/style.css'
];
var LONG_CACHE = 'public, max-age=31536000, immutable';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) {
      return c.addAll(CORE);
    }).then(function() { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  var request = e.request;
  if (request.method !== 'GET') { return; }
  var url = new URL(request.url);
  if (url.origin !== location.origin) { return; }

  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request).then(function(resp) {
        if (resp && resp.status === 200) {
          var copy = resp.clone();
          caches.open(CACHE).then(function(c) { c.put('/index.html', copy); });
        }
        return resp;
      }).catch(function() {
        return caches.match('/404.html').then(function(r) { return r || caches.match('/index.html'); });
      })
    );
    return;
  }

  var isStatic = /\.(webp|png|jpg|jpeg|avif|css|js|woff2?|ico|svg|mp4)$/.test(url.pathname);
  if (isStatic) {
    e.respondWith(
      caches.match(request).then(function(cached) {
        var network = fetch(request).then(function(resp) {
          if (resp && resp.status === 200) {
            var copy = resp.clone();
            caches.open(CACHE).then(function(c) { c.put(request, copy); });
          }
          return resp;
        }).catch(function() { return cached; });
        return cached || network;
      })
    );
  }
});