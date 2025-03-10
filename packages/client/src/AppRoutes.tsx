import React from 'react'
import Container from './components/Layout'

import { Route, Routes } from 'react-router-dom'
import Threads from './pages/forum/Threads'
import Posts from './pages/forum/Posts'
import LeaderBoard from './pages/leaderboard/LeaderBoard'
import Landing from './pages/Landing/Landing'
import NotFound from './pages/ErrorPages/NotFound'
import ServerError from './pages/ErrorPages/ServerError'
import Registration from './pages/Registration/Registration'
import Auth from './pages/Auth/Auth'
// Добавлен только для демонстрации
// TODO: удалить, как будет сверстан экран самой игры
import GameOver from './pages/Game/GameOver/GameOver'
// только для демонстрации
// TODO: удалить
import GameStart from './pages/Game/GameStart/GameStart'

export const AppRoutes = {
  LOGIN: 'login',
  PROFILE: 'profile',
  REGISTRATION: 'registration',
  PLAY: 'play',
  FORUM: 'forum',
  FORUM_TOPIC: 'forum-topic/:id',
  LEADER_BOARD: 'leader-board',
  // Добавлен только для демонстрации
  // TODO: удалить, как будет сверстан экран самой игры
  GAME_OVER: 'game-over',
  // только для демонстрации
  // TODO: удалить
  GAME_START: 'game-start',
}

export const routConfig: Record<
  string,
  { path: string; element: React.JSX.Element }
> = {
  [AppRoutes.LOGIN]: {
    path: AppRoutes.LOGIN,
    element: <Auth />,
  },
  [AppRoutes.PROFILE]: {
    path: AppRoutes.PROFILE,
    element: <></>,
  },
  [AppRoutes.REGISTRATION]: {
    path: AppRoutes.REGISTRATION,
    element: <Registration />,
  },
  [AppRoutes.PLAY]: {
    path: AppRoutes.PLAY,
    element: <></>,
  },
  [AppRoutes.FORUM]: {
    path: AppRoutes.FORUM,
    element: <Threads />,
  },
  [AppRoutes.FORUM_TOPIC]: {
    path: `${AppRoutes.FORUM}/:id`,
    element: <Posts />,
  },
  [AppRoutes.LEADER_BOARD]: {
    path: AppRoutes.LEADER_BOARD,
    element: <LeaderBoard />,
  },
  // Добавлен только для демонстрации
  // TODO: удалить, как будет сверстан экран самой игры
  [AppRoutes.GAME_OVER]: {
    path: AppRoutes.GAME_OVER,
    element: (
      <GameOver
        onRepeat={() => {
          /* to-be-deleted */
        }}
      />
    ),
  },
  // Добавлен только для демонстрации
  // TODO: удалить, как будет сверстан экран самой игры
  [AppRoutes.GAME_START]: {
    path: 'game-start',
    element: <GameStart />,
  },
  NOT_FOUND: {
    path: '*',
    element: <NotFound />,
  },
  SERVER_ERROR: {
    path: 'server-error',
    element: <ServerError />,
  },
}

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index element={<Landing />} />
          {Object.values(routConfig).map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </div>
  )
}
export default AppRouter
