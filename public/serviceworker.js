var version = 'v1::'
var apiCache = 'api'
var assetCache = 'assets'

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) {
              return !key.startsWith(version)
            })
            .map(function (key) {
              return caches.delete(key)
            })
        )
      })
  )
})

self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return
  }
  event.respondWith(
    caches
      .match(event.request)
      .then((cached) => {
        var networked = fetch(event.request)
          .then(fetchedFromNetwork, unableToResolve)
          .catch(unableToResolve)
        return cached || networked

        function fetchedFromNetwork(response) {
          var cacheCopy = response.clone()
          caches
          .open(version + (event.request.url.match(/api\/chester-devs-meetups/g) ? apiCache : assetCache))
          .then(function add(cache) {
            cache.put(event.request, cacheCopy)
          })
          return response
        }

        function unableToResolve () {
          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          })
        }
      })
  )
})

self.addEventListener('push', (event) => {
  const title = 'Chester Devs';
  const options = {
    body: 'Push notification received.',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

