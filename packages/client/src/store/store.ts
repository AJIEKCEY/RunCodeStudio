import { combineReducers, configureStore } from '@reduxjs/toolkit'
import forumSlice from './features/forum/forumSlice'
import { userApiSlice } from './features/user/userApiSlice'
import { leaderBoardApiSlice } from './features/leaderboard/leaderBoardApiSlice'
import {
  useStore as useStoreBase,
  useDispatch as useDispatchBase,
} from 'react-redux'
declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}

export const rootReducer = combineReducers({
  forum: forumSlice,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [leaderBoardApiSlice.reducerPath]: leaderBoardApiSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApiSlice.middleware, leaderBoardApiSlice.middleware),
})
export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
}
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useStore: () => typeof store = useStoreBase
export const useDispatch: () => AppDispatch = useDispatchBase
