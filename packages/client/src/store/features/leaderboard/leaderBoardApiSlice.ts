import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { PractikumEndpoints } from '../user/types'
import {
  leaderboardData,
  leaderBoardRequest,
  leaderBoardResponse,
  leaderBoardResultrequest,
  paginationOptions,
} from './type'

const jsonHeader = {
  'Content-Type': 'application/json',
  accept: 'application/json',
}
export const leaderBoardApiSlice = createApi({
  reducerPath: 'leaderBoardApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PractikumEndpoints.LEADERBOARD}`,
    credentials: 'include',
  }),
  tagTypes: ['leaderboard'],
  endpoints: builder => ({
    getLeaderBoard: builder.mutation<leaderBoardResponse[], paginationOptions>({
      query: (data?: paginationOptions) => {
        const hydratedData: leaderBoardResultrequest = {
          cursor: data?.cursor || 0,
          limit: data?.limit || 100,
          ratingFieldName: 'rundCodeStudionGameScore',
        }
        return {
          url: `all`,
          headers: {
            ...jsonHeader,
          },
          method: 'POST',
          body: hydratedData,
        }
      },
    }),

    updateUserScore: builder.mutation<
      unknown,
      { data: leaderboardData; signal?: AbortSignal }
    >({
      query: ({ data, signal }) => {
        const hydratedData: leaderBoardRequest = {
          data,
          ratingFieldName: 'rundCodeStudionGameScore',
          teamName: data.nickname,
        }
        return {
          url: `${PractikumEndpoints.LEADERBOARD}`,
          headers: {
            ...jsonHeader,
          },
          method: 'POST',
          body: hydratedData,
          signal,
        }
      },

      invalidatesTags: ['leaderboard'],
    }),
  }),
})

export const { useGetLeaderBoardMutation, useUpdateUserScoreMutation } =
  leaderBoardApiSlice
