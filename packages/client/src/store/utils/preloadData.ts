import { AppStore } from './createStore'
import { leaderBoardApiSlice } from '../features/leaderboard/leaderBoardApiSlice'
import { userApiSlice } from '../features/user/userApiSlice'

export const preloadData = async (store: AppStore) => {
  try {
    // Запускаем все необходимые запросы параллельно
    const preloadPromises = [
      // Запрос лидерборда
      store
        .dispatch(
          leaderBoardApiSlice.endpoints.getLeaderBoard.initiate({
            cursor: 0,
            limit: 100,
          })
        )
        .unwrap()
        .catch((error) => {
          console.error('Ошибка загрузки лидерборда:', error)
          return null
        }),

      // Запрос данных пользователя
      store
        .dispatch(userApiSlice.endpoints.getUser.initiate(undefined))
        .unwrap()
        .catch((error) => {
          console.error('Ошибка загрузки данных пользователя:', error)
          return null
        }),
    ]

    // Ждем завершения всех запросов
    await Promise.all(preloadPromises)

    return store.getState()
  } catch (error) {
    console.error('Ошибка при предварительной загрузке данных:', error)
    return store.getState()
  }
}
