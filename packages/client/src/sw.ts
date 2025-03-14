import { urlsToCache } from './sw-config'

self.addEventListener('install', event => {
  console.log('SW установлен!')
})

self.addEventListener('activate', event => {
  console.log('SW активирован')
})
