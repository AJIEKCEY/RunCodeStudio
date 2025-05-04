import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Thread, Category, ThreadResponce, Post, IComment } from './types'
import { API_URLS } from '../../../config/api'

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URLS.BASEAPI_URL }),
  endpoints: builder => ({
    getThreads: builder.query<Thread[], void>({
      query: () => 'posts',
      transformResponse: (response: ThreadResponce) => response.items,
    }),
    getPost: builder.query<Post, number>({
      query: id => `posts/${id}`,
      transformResponse: (res: { item: Post }) => res.item,
    }),
    getCategories: builder.query<Category[], void>({
      query: () => 'categories',
    }),
    getComments: builder.query<IComment[], number>({
      query: postId => `posts/${postId}/comments`,
    }),
    addThread: builder.mutation<Thread, { title: string; description: string; category_id: number; user_id: number }>({
      query: newThread => ({
        url: 'posts',
        method: 'POST',
        body: newThread,
      }),
    }),
  }),
})

export const {
  useGetThreadsQuery,
  useGetCategoriesQuery,
  useAddThreadMutation,
  useGetPostQuery,
  useGetCommentsQuery,
} = forumApi
