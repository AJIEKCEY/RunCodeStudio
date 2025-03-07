import React from 'react'
import Container from './components/Layout'

import { Route, Routes } from 'react-router-dom'
import Threads from './pages/forum/Threads'
import Posts from './pages/forum/Posts'
import LeaderBoard from './pages/leaderboard/LeaderBoard'
import Landing from './pages/Landing/Landing'
import NotFound from './pages/ErrorPages/NotFound'
import ServerError from './pages/ErrorPages/ServerError'
// Добавлен только для демонстрации
// TODO: удалить, как будет сверстан экран самой игры
import GameOver from './pages/Game/GameOver/GameOver'

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
}

export const routConfig: Record<
  string,
  { path: string; element: React.JSX.Element }
> = {
  [AppRoutes.LOGIN]: {
    path: AppRoutes.LOGIN,
    element: <></>,
  },
  [AppRoutes.PROFILE]: {
    path: AppRoutes.PROFILE,
    element: <></>,
  },
  [AppRoutes.REGISTRATION]: {
    path: AppRoutes.REGISTRATION,
    element: <></>,
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
  NOT_FOUND: {
    path: '*',
    element: <NotFound />,
  },
  SERVER_ERROR: {
    path: 'server-error',
    element: <ServerError />,
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
