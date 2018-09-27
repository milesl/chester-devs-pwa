var version = 'v2::'
var apiCache = 'api'
var assetCache = 'assets'

var precache = [ 'https://milesl-functions.azurewebsites.net/api/chester-devs-meetups' ]

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener("activate", function(event) {
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

    precache.forEach((url) => {
      fetch(url, {
        method: 'GET'
      })
    })

    sendMessageToAllClients('Service worker activated and precache built.')
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
  const title = 'Chester Devs'
  const options = {
    body: 'Push notification received.',
    icon: `${event.target.location.origin}/android-icon-192x192.png`,
    badge: `${event.target.location.origin}/android-icon-36x36.png`,
    image: `${event.target.location.origin}/android-icon-192x192.png`,
    renotify: false,
    tag: null,
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: 'View'
      }
    ]
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  switch (event.action) {
    default:
      event.waitUntil(
        self.clients.openWindow(`${event.target.location.origin}`)
      )
  }
})

self.addEventListener("sync", (event) => {
  if (event.tag == "sync-push") {
    event.waitUntil(
      new Promise((resolve, reject) => {
        fetch('https://milesl-functions.azurewebsites.net/api/chester-devs-push-message', {
          method: 'POST',
          mode: 'cors'
        }).then((response) => {
          if (response.status === 200) { 
            sendMessageToAllClients('Push message sent using sync')
            resolve()
          } else {
            reject('Unable to send')
          }
        }).catch((err) => {
          reject(err)
        })
      })
    )
  }
})

function sendMessageToClient (client, msg) {
  return new Promise(function(resolve, reject){
    var messageChannel = new MessageChannel()
    messageChannel.port1.onmessage = (event) => {
      if (event.data.error) {
        reject(event.data.error)
      } else {
        resolve(event.data)
      }
    }
    client.postMessage(msg, [messageChannel.port2])
  })
}

function sendMessageToAllClients (msg) {
  if ('BroadcastChannel' in self) {
    const br = new BroadcastChannel('chester-devs')
    br.postMessage(msg)
  } else {
    clients.matchAll().then(clients => {
      clients.forEach(client => {
        sendMessageToClient(client, msg)
      })
    })
  }
}

