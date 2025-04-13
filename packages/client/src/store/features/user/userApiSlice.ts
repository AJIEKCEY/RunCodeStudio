import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  BadRequest,
  ErrorResponse,
  PractikumEndpoints,
  UserLoginType,
  UserProfile,
} from './types'
import { isBadRequest } from '../../../utils/typeguard/isBadRequest'

export const userApiSlice = createApi({
  reducerPath: 'userApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PractikumEndpoints.BASE}`,
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
      transformErrorResponse: response => console.info(response.status),

      providesTags: ['user'],
    }),
    signInUser: builder.mutation<UserLoginType | BadRequest, UserLoginType>({
      query: data => ({
        url: `${PractikumEndpoints.AUTH}/signin`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: data,
        responseHandler: response =>
          response.status === 200 ? response.text() : response.json(),
      }),
      invalidatesTags: ['user'],
    }),
    yandexAuth: builder.mutation<
      UserProfile,
      { code: string; redirect_uri: string }
    >({
      query: ({ code, redirect_uri }) => ({
        url: `${PractikumEndpoints.BASE}/oauth/yandex`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: { code, redirect_uri },
        responseHandler: response =>
          response.status === 200 ? response.text() : response.json(),
      }),
      invalidatesTags: ['user'],
    }),
    logoutUser: builder.mutation<UserProfile, unknown>({
      query: () => ({
        url: `${PractikumEndpoints.AUTH}/logout`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      }),
      invalidatesTags: ['user'],
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
  useSignInUserMutation,
  useYandexAuthMutation,
  useLogoutUserMutation,
  useUpdateUserAvatarMutation,
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
} = userApiSlice
