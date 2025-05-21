import { combineReducers } from '@reduxjs/toolkit'
import forumReducer from './features/forum/forumSlice'
import { userApiSlice } from './features/user/userApiSlice'
import { leaderBoardApiSlice } from './features/leaderboard/leaderBoardApiSlice'
import { forumApi } from './features/forum/forumApiSlice'
import authReducer from './features/auth/authSlice'

export const rootReducer = combineReducers({
  forum: forumReducer,
  [forumApi.reducerPath]: forumApi.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [leaderBoardApiSlice.reducerPath]: leaderBoardApiSlice.reducer,
  auth: authReducer,
})
