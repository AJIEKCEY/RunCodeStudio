export type leaderBoard = userStats[]

export type userStats = {
  id: number
  userId: number
  score: number
}

export type leaderboardData = {
  nickname: string
  rundCodeStudionGameScore: number
  date: string
}

export type leaderBoardRequest = {
  data: leaderboardData
  ratingFieldName: 'rundCodeStudionGameScore'
  teamName: string
}

export type leaderBoardResultrequest = {
  ratingFieldName: string
} & paginationOptions

export type paginationOptions = {
  cursor: number
  limit: number
}

export type leaderBoardResponse = {
  data: leaderboardData
}
