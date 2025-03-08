import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BadRequest, PractikumEndpoints, UserProfile } from './types'

export const userApiSlice = createApi({
  reducerPath: 'userApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: PractikumEndpoints.BASE,
    credentials: 'include',
  }),
  tagTypes: ['user'],
  endpoints: builder => ({
    getUser: builder.query<UserProfile, unknown>({
      query: () => ({
        url: `${PractikumEndpoints.AUTH}/user`,
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      }),
      transformErrorResponse: response => console.log(response.status),

      providesTags: ['user'],
    }),
    updateUserAvatar: builder.mutation<UserProfile | BadRequest, FormData>({
      query: avatar => ({
        url: `${PractikumEndpoints.USER}/profile/avatar`,
        method: 'PUT',
        body: avatar,
      }),
      transformErrorResponse: response => console.log(response.status),
      invalidatesTags: ['user'],
    }),
  }),
})

export const { useGetUserQuery, useUpdateUserAvatarMutation } = userApiSlice
