import { configureStore } from '@reduxjs/toolkit'
import { useStore as useStoreBase, useDispatch as useDispatchBase } from 'react-redux'
import { rootReducer } from './reducers'
import { apiMiddlewares } from './middleware'
import type { RootState, AppDispatch } from './types'
import { userApiSlice } from './features/user/userApiSlice'
import { leaderBoardApiSlice } from './features/leaderboard/leaderBoardApiSlice'
import { forumApi } from './features/forum/forumApiSlice'

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApiSlice.middleware, leaderBoardApiSlice.middleware, forumApi.middleware),
})

export const useStore: () => typeof store = useStoreBase
export const useDispatch: () => typeof store.dispatch = useDispatchBase

export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
}
