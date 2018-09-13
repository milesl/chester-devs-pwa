var version = '1';

var apiUrl = 'https://milesl-functions.azurewebsites.net/api/chester-devs-meetups'

self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Installed version', version);
  event.waitUntil(
    fetch(apiUrl).then(function(response) {
      return caches.open(version).then(function(cache) {
        console.log('[ServiceWorker] Cached api call for', version);
        return cache.put(apiUrl, response);
      });
    }).then(function() {
      console.log('[ServiceWorker] Skip waiting on install');
      return self.skipWaiting();
    })
  );
});
self.addEventListener('activate', function(event) {
  self.clients.matchAll({
    includeUncontrolled: true
  }).then(function(clientList) {
    var urls = clientList.map(function(client) {
      return client.url;
    });
    console.log('[ServiceWorker] Matching clients:', urls.join(', '));
  });
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== version) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      console.log('[ServiceWorker] Claiming clients for version', version);
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.url === apiUrl) {
    console.log('[ServiceWorker] Serving api cache for', event.request.url);
    event.respondWith(
      caches.open(version).then(function(cache) {
        return cache.match(apiUrl).then(function(response) {
          if (!response) {
            console.error('[ServiceWorker] Missing cache!');
          }
          return response;
        });
      })
    );
  }
});