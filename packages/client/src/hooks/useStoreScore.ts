import { useEffect, useState } from 'react'
import { useUpdateUserScoreMutation } from '../store/features/leaderboard/leaderBoardApiSlice'
import { useGetUserQuery } from '../store/features/user/userApiSlice'
import { formatDate } from '../utils/getFormattedCurrentDate'
import { useGeolocation } from './useGeoLoc'

export const useStoreScore = () => {
  const [score, setScore] = useState<number | null>(null)
  const { coordinates, isFetching, country } = useGeolocation()
  const [updateUserScore] = useUpdateUserScoreMutation()
  const { data: user } = useGetUserQuery('')

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    if (!isFetching && score) {
      const data = {
        nickname: user?.display_name || 'Player',
        date: formatDate(new Date()),
        rundCodeStudionGameScore: score,
        country: country || 'Neverland',
      }
      updateUserScore({
        data,
        signal,
      }).catch(error => console.info(error))
      return () => {
        abortController.abort()
      }
    }
  }, [isFetching, user, coordinates, country, score])
  return [setScore]
}
