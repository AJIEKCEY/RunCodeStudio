import ReactDOM from 'react-dom/server'
import { Request as ExpressRequest } from 'express'
import { Provider } from 'react-redux'
import { createStaticHandler, StaticRouter } from 'react-router-dom/server'

import { createFetchRequest, createUrl } from './entry-server.utils'
import AppRouter, { routConfig } from './AppRoutes'
import './index.css'

import { ThemeProvider } from './context/ThemeContext'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './store/store'
import { leaderBoardApiSlice } from './store/features/leaderboard/leaderBoardApiSlice'
import { userApiSlice } from './store/features/user/userApiSlice'
import { matchRoutes } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext'
import { NotificationProvider } from './components/Notification/NotificationContext'

export const render = async (req: ExpressRequest) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(userApiSlice.middleware, leaderBoardApiSlice.middleware),
  })
  const { query } = createStaticHandler(routConfig)

  const fetchRequest = createFetchRequest(req)

  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }
  const url = createUrl(req)
  const foundRoutes = matchRoutes(routConfig, url)
  if (!foundRoutes) {
    throw new Error('Страница не найдена!')
  }
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
    } catch (e) {
      console.info('Инициализация страницы произошла с ошибкой', e)
    }

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <AuthProvider>
          <NotificationProvider>
            <ThemeProvider>
              <StaticRouter location={req.url}>
                <AppRouter />
              </StaticRouter>
            </ThemeProvider>
          </NotificationProvider>
        </AuthProvider>
      </Provider>
    ),
    initialState: store.getState(),
  }
}
