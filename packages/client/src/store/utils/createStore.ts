import { configureStore, combineReducers } from '@reduxjs/toolkit'
import forumSlice from '../features/forum/forumSlice'
import { leaderBoardApiSlice } from '../features/leaderboard/leaderBoardApiSlice'
import { userApiSlice } from '../features/user/userApiSlice'
import { forumApi } from '../features/forum/forumApiSlice'

const rootReducer = combineReducers({
  forum: forumSlice,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [leaderBoardApiSlice.reducerPath]: leaderBoardApiSlice.reducer,
  [forumApi.reducerPath]: forumApi.reducer,
})

/**
 * Создает Redux store с предустановленным состоянием
 * @param {Partial<ReturnType<typeof rootReducer>>} [preloadedState] - Начальное состояние store
 * @returns {ReturnType<typeof configureStore>} Сконфигурированный Redux store
 */
export const createStore = (preloadedState?: Partial<ReturnType<typeof rootReducer>>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(userApiSlice.middleware, leaderBoardApiSlice.middleware, forumApi.middleware),
  })
}

export type AppStore = ReturnType<typeof createStore>
