import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { leaderBoard, userStats } from './type'
import { mockStats } from './mockData'

const initialState: leaderBoard = mockStats

export const leaderBoardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    addNewRec: (state, action: PayloadAction<{ data: userStats }>) => {
      state = [...state, action.payload.data]
    },
  },
})

export const { addNewRec } = leaderBoardSlice.actions

export const getLeaderBoardData = (state: RootState) => state.leaderboard

export default leaderBoardSlice.reducer
