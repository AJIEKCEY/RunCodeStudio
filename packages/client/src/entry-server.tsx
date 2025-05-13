import ReactDOM from 'react-dom/server'
import { Request as ExpressRequest } from 'express'
import { createStaticHandler } from 'react-router-dom/server'

import { createFetchRequest, createUrl } from './entry-server.utils'
import AppRouter, { routConfig } from './AppRoutes'
import './index.css'

import { matchRoutes } from 'react-router-dom'
import { createStore } from './store/utils/createStore'
import { preloadData } from './store/utils/preloadData'
import { AppProviders } from './components/AppProviders'
import { handleError } from './utils/errorHandler'

export const render = async (req: ExpressRequest) => {
  const store = createStore()

  const { query } = createStaticHandler(routConfig)

  const fetchRequest = createFetchRequest(req)

  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }
  const url = createUrl(req)
  const foundRoutes = matchRoutes(routConfig, url)
  if (!foundRoutes) {
    throw new Error(`Страница не найдена: ${url}`)
  }
  const [
    {
      route: { fetchData },
    },
  ] = foundRoutes

  await preloadData(store)

  if (fetchData) {
    await handleError(
      fetchData({
        dispatch: store.dispatch,
        state: store.getState(),
      }),
      'инициализация страницы'
    )
  }

  return {
    html: ReactDOM.renderToString(
      <AppProviders store={store} location={req.url}>
        <AppRouter />
      </AppProviders>
    ),
    initialState: store.getState(),
  }
}
