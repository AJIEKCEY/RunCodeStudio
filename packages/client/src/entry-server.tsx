import React from 'react'
import ReactDOM from 'react-dom/server'
import { Request as ExpressRequest } from 'express'
import { Provider } from 'react-redux'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'

import { createFetchRequest } from './entry-server.utils'
import { routConfig } from './AppRoutes'
import './index.css'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routConfig)

  const fetchRequest = createFetchRequest(req)

  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)

  return {
    html: ReactDOM.renderToString(
      // @ts-ignore
      <Provider store={}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    ),
  }
}
