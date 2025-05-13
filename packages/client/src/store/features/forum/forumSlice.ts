import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../types'
import { ForumState, Thread } from './types'
import { categories, threads, posts } from './mockData'

const initialState: ForumState = {
  threads,
  posts,
  categories,
}

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    addNewThread: (state, action: PayloadAction<{ thread: Thread }>) => {
      state.threads = [...state.threads, action.payload.thread]
    },
  },
})

export const { addNewThread } = forumSlice.actions

export const getForumData = (state: RootState) => state.forum

export default forumSlice.reducer
