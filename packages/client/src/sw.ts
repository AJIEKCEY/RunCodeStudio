// @ts-ignore --isolatedModules
const cacheName = 'cache-v-1.0'
const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis
const filesToCache = [
  '/',
  'index.html',
  './assets/index.js',
  './assets/index.css',
  './sprite/coin.png',
  'vite.svg',
  './sprite/themes/theme_1/layer-1.png',
  './sprite/themes/theme_1/layer-2.png',
  './sprite/themes/theme_1/layer-3.png',
  './sprite/themes/theme_1/layer-4.png',
  './sprite/themes/theme_1/layer-5.png',
  './sprite/players/player_1.png',
  './sprite/players/player_2.png',
  './sprite/obstacle/box.png',
]
sw.addEventListener('install', (event: ExtendableEvent) => {
  console.info('service worker установлен!')
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(filesToCache).then(() => {
        console.info('файлы добавлены в кэш')
      })
    })
  )
})
sw.addEventListener('activate', (event: ExtendableEvent) => {
  console.info('service worker активирован!')
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(name => {
            if (name !== cacheName) {
              return caches.delete(name)
            }
          })
        )
      })
      .catch(() => {
        console.error(`Ошибка очистки старого кэша `)
      })
  )
})
sw.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url)
  if (!requestUrl.protocol.startsWith('http')) {
    return
  }
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => {
        console.warn('Сервер не отвечает')
        return Promise.reject('сервер не отвечает')
      })
  )
  event.waitUntil(update(event.request))
})

function update(request: Request) {
  console.log('REQUEST', request)

  return caches.open(cacheName).then(cache => {
    const requestUrl = new URL(request.url)
    if (!requestUrl.protocol.startsWith('http')) {
      return
    } else
      return fetch(request).then(response => {
        if (response.ok) {
          return cache.put(request, response)
        }
      })
  })
}
