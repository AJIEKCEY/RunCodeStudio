import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Thread, Category, ThreadResponce, Post, IComment } from './types'
import { API_URLS } from '@config/api'

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URLS.BASEAPI_URL }),
  tagTypes: ['Comments', 'Posts'],
  endpoints: (builder) => ({
    getThreads: builder.query<Post[], void>({
      query: () => API_URLS.forum.posts,
      transformResponse: (response: ThreadResponce) =>
        response.items.map((item) => ({
          ...item,
          user: { firstname: 'User' }, // Временное решение, пока нет данных о пользователе
          category: { name: 'Category' }, // Временное решение, пока нет данных о категории
        })),
      providesTags: ['Posts'],
    }),
    getPost: builder.query<Post, number>({
      query: (id) => API_URLS.forum.post(id),
      transformResponse: (res: { item: Post }) => res.item,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => API_URLS.forum.categories,
    }),
    getComments: builder.query<IComment[], number>({
      query: (postId) => API_URLS.forum.comments(postId),
      providesTags: (result, error, postId) => [{ type: 'Comments', id: postId }],
    }),
    addThread: builder.mutation<
      Thread,
      {
        title: string
        description: string
        category_id: number
        user_id: number
      }
    >({
      query: (newThread) => ({
        url: API_URLS.forum.posts,
        method: 'POST',
        body: newThread,
      }),
      invalidatesTags: ['Posts'],
    }),
    addComment: builder.mutation<
      IComment,
      { text: string; postId: number; rootCommentId?: number }
    >({
      query: (commentData) => ({
        url: API_URLS.forum.comments(commentData.postId),
        method: 'POST',
        body: commentData,
      }),
      invalidatesTags: (result, error, { postId }) =>
        error ? [] : [{ type: 'Comments', id: postId }],
    }),
    addReaction: builder.mutation<IComment, { commentId: number; type: 'like' | 'dislike' }>({
      query: ({ commentId, type }) => ({
        url: API_URLS.forum.reactions(commentId),
        method: 'POST',
        body: { type },
      }),
      invalidatesTags: (result, error, { commentId }) =>
        error ? [] : [{ type: 'Comments', id: commentId }],
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
  useAddReactionMutation,
} = forumApi
