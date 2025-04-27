import ReactDOM from 'react-dom/server'
import { Request as ExpressRequest } from 'express'
import { Provider } from 'react-redux'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { createCache, StyleProvider } from '@ant-design/cssinjs'
import { createFetchRequest, createUrl } from './entry-server.utils'
import AppRouter, { routConfig } from './AppRoutes'
import './index.css'

import { AuthProvider } from './components/AuthContext'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './store/store'
import { leaderBoardApiSlice } from './store/features/leaderboard/leaderBoardApiSlice'
import { userApiSlice } from './store/features/user/userApiSlice'
import { matchRoutes } from 'react-router-dom'
import React from 'react'
import Entity from '@ant-design/cssinjs/lib/Cache'
import { extractStyle } from '@ant-design/static-style-extract'
import { NotificationProvider } from './components/Notification/NotificationContext'
export const render = async (req: ExpressRequest) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(userApiSlice.middleware, leaderBoardApiSlice.middleware),
  })
  const { query, dataRoutes } = createStaticHandler(routConfig)

  const fetchRequest = createFetchRequest(req)

  const context = await query(fetchRequest)
  console.info('PPPPP', context)

  if (context instanceof Response) {
    console.info(CONTEXT)

    throw context
  }
  // await store.dispatch(
  //   leaderBoardApiSlice.endpoints.getLeaderBoard.initiate({
  //     cursor: 0,
  //     limit: 100,
  //   })
  // )
  const url = createUrl(req)

  // 2.
  const foundRoutes = matchRoutes(routConfig, url)
  // console.log('FOUNDROUTES', foundRoutes)

  if (!foundRoutes) {
    // console.log('Yt yfqlty')

    throw new Error('Страница не найдена!')
  }

  // 3.
  const [
    {
      route: { fetchData },
    },
  ] = foundRoutes
  if (fetchData)
    try {
      await fetchData({
        dispatch: store.dispatch,
        state: store.getState(),
      })
      // console.log('STATEff: ', store.getState().userApiSlice.mutations)
    } catch (e) {
      console.info('Инициализация страницы произошла с ошибкой', e)
    }
  const router = createStaticRouter(dataRoutes, context)
  const cache = createCache()
  const style = extractStyle()

  // console.log('STYLES:', style)

  return {
    html: ReactDOM.renderToString(
      <StyleProvider cache={cache}>
        <Provider store={store}>
          {/* <AuthProvider> */}
          {/* <StaticRouterProvider router={router} context={context}> */}
          <StaticRouter location={req.url}>
            {/* <NotificationProvider> */}
            <AppRouter />
            {/* </NotificationProvider> */}
            {/* </StaticRouterProvider> */}
          </StaticRouter>
          {/* </AuthProvider> */}
        </Provider>
      </StyleProvider>
    ),
    style: style,
    initialState: store.getState(),
  }
}
