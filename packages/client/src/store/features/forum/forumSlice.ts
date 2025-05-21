import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../types'
import { ForumState, Thread, Category } from './types'
import { forumApi } from './forumApiSlice'

const initialState: ForumState = {
  threads: [], // Изначально пустые
  posts: [], // Оставляем моки или тоже загружаем с сервера
  categories: [],
  loading: false,
  error: null,
}

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    addNewThread: (state, action: PayloadAction<Thread>) => {
      state.threads.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(forumApi.endpoints.getThreads.matchFulfilled, (state, action) => {
        state.threads = action.payload
      })
      .addMatcher(forumApi.endpoints.getCategories.matchFulfilled, (state, action) => {
        state.categories = action.payload
      })
  },
})

export const { addNewThread } = forumSlice.actions

export const getForumData = (state: RootState) => state.forum

export default forumSlice.reducer
