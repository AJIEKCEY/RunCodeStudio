import { combineReducers, configureStore } from '@reduxjs/toolkit'
import forumSlice from './features/forum/forumSlice'
import leaderBoardSlice from './features/leaderboard/leaderboardSlice'
import { userApiSlice } from './features/user/userApiSlice'
const rootReducer = combineReducers({
  forum: forumSlice,
  leaderboard: leaderBoardSlice,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(userApiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
