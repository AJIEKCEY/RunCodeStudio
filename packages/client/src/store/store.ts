import { combineReducers, configureStore } from '@reduxjs/toolkit'
import forumSlice from './features/forum/forumSlice'
import leaderBoardSlice from './features/leaderboard/leaderboardSlice'
const rootReducer = combineReducers({
  forum: forumSlice,
  leaderboard: leaderBoardSlice,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
