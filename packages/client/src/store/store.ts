import { combineReducers, configureStore } from '@reduxjs/toolkit'
import forumSlice from './features/forum/forumSlice'
const rootReducer = combineReducers({
  forum: forumSlice,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
