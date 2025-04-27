import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    getPosts: builder.query<any[], any>({
      query: () => 'posts',
    }),
  }),
})

export const { useGetPostsQuery } = forumApi
