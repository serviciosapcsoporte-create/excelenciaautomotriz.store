/* Excelencia Automotriz - Service Worker v1
   GitHub Pages fija Cache-Control max-age=600 y no permite headers custom.
   Este SW da cache de larga duracion a assets estaticos y fallback offline. */
var CACHE = 'excelencia-v1';
var CORE = [
  '/',
  '/index.html',
  '/img/favicon.png',
  '/js/script.js'
];

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

  var isStatic = /\.(webp|png|jpg|jpeg|avif|css|js|woff2?|ico|svg)$/.test(url.pathname);
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