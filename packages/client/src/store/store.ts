import { combineReducers, configureStore } from '@reduxjs/toolkit'
import forumReducer from './features/forum/forumSlice'
import { userApiSlice } from './features/user/userApiSlice'
import { leaderBoardApiSlice } from './features/leaderboard/leaderBoardApiSlice'
import { forumApi } from './features/forum/forumApiSlice'
declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}

export const rootReducer = combineReducers({
  forum: forumReducer,
  [forumApi.reducerPath]: forumApi.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [leaderBoardApiSlice.reducerPath]: leaderBoardApiSlice.reducer,
})

const apiMiddlewares = [
  userApiSlice.middleware,
  leaderBoardApiSlice.middleware,
  forumApi.middleware,
]

export const store = configureStore({
  reducer: rootReducer,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(...apiMiddlewares),
})
export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
}
export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
