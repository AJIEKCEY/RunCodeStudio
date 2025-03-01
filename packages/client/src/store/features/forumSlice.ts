import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export type Post = {
  id: number
  title: string
  authorId: number
  content: string
  createdAt: Date
  editedAt: Date
  threadId: number
  likes: number
  categoryId: string
}

export type Thread = {
  id: number
  title: string
  description: string
  posts: Post[]
  author: string
  createdAt: Date
}

interface ForumState {
  threads: Thread[]
  posts: Post[]
}

const initialState: ForumState = {
  threads: [],
  posts: [],
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
