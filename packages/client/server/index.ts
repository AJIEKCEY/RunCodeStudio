import dotenv from 'dotenv'
dotenv.config()

import express, { Request as ExpressRequest } from 'express'
import path from 'path'
import fs from 'fs/promises'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { createServer as createViteServer, ViteDevServer } from 'vite'

const port = process.env.CLIENT_SERVER_PORT || 3002
const clientPath = path.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'

export const authMiddleware = createProxyMiddleware({
  changeOrigin: true,
  cookieDomainRewrite: { '*': '' },
  pathRewrite: { '^/auth': '' },
  target: 'https://ya-praktikum.tech/api/v2',
})

async function createServer() {
  const app = express()

  let vite: ViteDevServer | undefined
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app.use(express.static(path.join(clientPath, 'dist/client'), { index: false }))
  }

  app.use('/auth', authMiddleware)

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      // Получаем файл client/index.html который мы правили ранее
      let render: (req: ExpressRequest) => Promise<{ html: string; initialState: unknown }>
      let template: string
      if (vite) {
        template = await fs.readFile(path.resolve(clientPath, 'index.html'), 'utf-8')

        // Применяем встроенные HTML-преобразования vite и плагинов
        template = await vite.transformIndexHtml(url, template)

        // Загружаем модуль клиента, который писали выше,
        // он будет рендерить HTML-код
        render = (await vite.ssrLoadModule(path.join(clientPath, 'src/entry-server.tsx'))).render
      } else {
        template = await fs.readFile(path.join(clientPath, 'dist/client/index.html'), 'utf-8')

        // Получаем путь до модуля клиента, чтобы не тащить средства сборки клиента на сервер
        const pathToServer = path.join(clientPath, 'dist/server/entry-server.js')

        // Импортируем этот модуль и вызываем с начальным состоянием
        render = (await import(pathToServer)).render
      }
      // Получаем HTML-строку из JSX
      const { html: appHtml, initialState } = await render(req)

      // Заменяем комментарий на сгенерированную HTML-строку
      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${JSON.stringify(initialState)}</script>`
        )

      // Завершаем запрос и отдаём HTML-страницу
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite?.ssrFixStacktrace(e as Error)
      next(e)
    }
  })

  app.listen(port, () => {
    console.info(`Client is listening on port: ${port}`)
  })
}

createServer()
