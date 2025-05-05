import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ForumState, Thread } from '../types'

const initialState: ForumState = {
  threads: [], 
  posts: [],
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
  // В моке убираем extraReducers, которые зависят от forumApi
})

export const { addNewThread } = forumSlice.actions

export const getForumData = (state: any) => state.forum

export default forumSlice.reducer 