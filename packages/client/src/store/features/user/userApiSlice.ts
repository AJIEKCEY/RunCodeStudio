import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  BadRequest,
  ErrorResponse,
  PractikumEndpoints,
  UserProfile,
} from './types'
import { isBadRequest } from '../../../utils/typeguard/isBadRequest'

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
      transformErrorResponse: (response): ErrorResponse => {
        if (isBadRequest(response)) {
          return { status: response.status, msg: response.data.reason }
        }
        return { status: response.status, msg: ' Ошибка, попробуйте еще раз' }
      },
      invalidatesTags: ['user'],
    }),
    updateUserInfo: builder.mutation<UserProfile | BadRequest, FormData>({
      query: data => ({
        url: `${PractikumEndpoints.USER}/profile`,
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        method: 'PUT',
        body: data,
      }),
      transformErrorResponse: (response): ErrorResponse => {
        if (isBadRequest(response)) {
          return { status: response.status, msg: response.data.reason }
        }
        return { status: response.status, msg: ' Ошибка, попробуйте еще раз' }
      },
      invalidatesTags: ['user'],
    }),
    updateUserPassword: builder.mutation<UserProfile | BadRequest, FormData>({
      query: data => ({
        url: `${PractikumEndpoints.USER}/password`,
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        method: 'PUT',
        body: data,
      }),
      transformErrorResponse: (response): ErrorResponse => {
        if (isBadRequest(response)) {
          return { status: response.status, msg: response.data.reason }
        }
        return { status: response.status, msg: ' Ошибка, попробуйте еще раз' }
      },
      invalidatesTags: ['user'],
    }),
  }),
})

export const {
  useGetUserQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
} = userApiSlice
