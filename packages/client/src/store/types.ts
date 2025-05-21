import { createStore } from './utils/createStore'
import { userApiSlice } from './features/user/userApiSlice'
import { leaderBoardApiSlice } from './features/leaderboard/leaderBoardApiSlice'
import { ForumState } from './features/forum/types'

// Определяем тип состояния напрямую из редьюсеров
export type RootState = {
  forum: ForumState
  [userApiSlice.reducerPath]: ReturnType<typeof userApiSlice.reducer>
  [leaderBoardApiSlice.reducerPath]: ReturnType<typeof leaderBoardApiSlice.reducer>
}

export type AppDispatch = ReturnType<typeof createStore>['dispatch']
export type AppStore = ReturnType<typeof createStore>

export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
}
