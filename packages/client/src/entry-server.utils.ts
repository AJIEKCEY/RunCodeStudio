import { Request as ExpressRequest } from 'express'
import fetch, { Response, Headers, Request } from 'cross-fetch'

export const createUrl = (req: ExpressRequest) => {
  const origin = `${req.protocol}://${req.get('host')}`

  return new URL(req.originalUrl || req.url, origin)
}

export const createFetchRequest = (req: ExpressRequest) => {
  const url = createUrl(req)

  const controller = new AbortController()
  req.on('close', () => controller.abort())

  const headers = new Headers()

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value)
        }
      } else {
        headers.set(key, values)
      }
    }
  }

  const init = {
    method: req.method,
    headers,
    signal: controller.signal,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
  }

  return new Request(url.href, init)
}

// Добавляем глобальные полифиллы
global.fetch = fetch as any
global.Response = Response as any
global.Headers = Headers as any
global.Request = Request as any
