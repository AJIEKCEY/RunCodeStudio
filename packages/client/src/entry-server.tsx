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

import { AuthProvider } from './components/AuthContext'
import { createStore } from './store/utils/createStore'
import { leaderBoardApiSlice } from './store/features/leaderboard/leaderBoardApiSlice'
import { userApiSlice } from './store/features/user/userApiSlice'

export const render = async (req: ExpressRequest) => {
  const store = createStore()
  const { query, dataRoutes } = createStaticHandler(routConfig)

  const fetchRequest = createFetchRequest(req)

  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }
  await store.dispatch(
    leaderBoardApiSlice.endpoints.getLeaderBoard.initiate({
      cursor: 0,
      limit: 100,
    })
  )
  const router = createStaticRouter(dataRoutes, context)

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <AuthProvider>
          <StaticRouterProvider router={router} context={context} />
        </AuthProvider>
      </Provider>
    ),
    initialState: store.getState(),
  }
}
