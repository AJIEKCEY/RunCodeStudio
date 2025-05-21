import { userApiSlice } from './features/user/userApiSlice'
import { leaderBoardApiSlice } from './features/leaderboard/leaderBoardApiSlice'
import { forumApi } from './features/forum/forumApiSlice'

export const apiMiddlewares = [
  userApiSlice.middleware,
  leaderBoardApiSlice.middleware,
  forumApi.middleware,
]
