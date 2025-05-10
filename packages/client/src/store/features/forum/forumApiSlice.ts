import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Thread, Category, ThreadResponce, Post, IComment } from './types'
import { API_URLS } from '../../../config/api'

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URLS.BASEAPI_URL }),
  tagTypes: ['Comments', 'Posts'],
  endpoints: builder => ({
    getThreads: builder.query<Thread[], void>({
      query: () => 'posts',
      transformResponse: (response: ThreadResponce) => response.items,
      providesTags: ['Posts'],
    }),
    getPost: builder.query<Post, number>({
      query: id => `posts/${id}`,
      transformResponse: (res: { item: Post }) => res.item,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => 'categories',
    }),
    getComments: builder.query<IComment[], number>({
      query: postId => `posts/${postId}/comments`,
      providesTags: (result, error, postId) => [{ type: 'Comments', id: postId }],
    }),
    addThread: builder.mutation<Thread, { title: string; description: string; category_id: number; user_id: number }>({
      query: newThread => ({
        url: 'posts',
        method: 'POST',
        body: newThread,
      }),
      invalidatesTags: ['Posts'],
    }),
    addComment: builder.mutation<IComment, { text: string; postId: number; rootCommentId?: number }>({
      query: commentData => ({
        url: 'comments',
        method: 'POST',
        body: commentData,
      }),
      invalidatesTags: (result, error, { postId }) => 
        error ? [] : [{ type: 'Comments', id: postId }],
    }),
  }),
})

export const {
  useGetThreadsQuery,
  useGetCategoriesQuery,
  useAddThreadMutation,
  useGetPostQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
} = forumApi
