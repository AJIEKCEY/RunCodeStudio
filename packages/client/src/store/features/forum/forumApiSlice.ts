import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Thread, Category, ThreadResponce, Post, IComment } from './types'

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/api/v1' }),
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
    addThread: builder.mutation<Thread, Omit<Thread, 'id'>>({
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
