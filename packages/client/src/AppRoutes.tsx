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
import Profile from './pages/profile/Profile'
import CanvasGame from './pages/Game/CanvasGame/CanvasGame'
import Auth from './pages/Auth/Auth'
import ErrorBoundary from './components/ErrorBoundary'

export const AppRoutes = {
  LOGIN: 'login',
  PROFILE: 'profile',
  REGISTRATION: 'registration',
  PLAY: 'play',
  FORUM: 'forum',
  FORUM_TOPIC: 'forum-topic/:id',
  LEADER_BOARD: 'leader-board',
}

export const routConfig: Record<
  string,
  { path: string; element: React.JSX.Element }
> = {
  [AppRoutes.LOGIN]: {
    path: AppRoutes.LOGIN,
    element: (
      <ErrorBoundary>
        <Auth />
      </ErrorBoundary>
    ),
  },
  [AppRoutes.PROFILE]: {
    path: AppRoutes.PROFILE,
    element: <Profile />,
  },
  [AppRoutes.REGISTRATION]: {
    path: AppRoutes.REGISTRATION,
    element: (
      <ErrorBoundary>
        <Registration />
      </ErrorBoundary>
    ),
  },
  [AppRoutes.PLAY]: {
    path: AppRoutes.PLAY,
    element: (
      <ErrorBoundary>
        <CanvasGame />
      </ErrorBoundary>
    ),
  },
  [AppRoutes.FORUM]: {
    path: AppRoutes.FORUM,
    element: (
      <ErrorBoundary>
        <Threads />
      </ErrorBoundary>
    ),
  },
  [AppRoutes.FORUM_TOPIC]: {
    path: `${AppRoutes.FORUM}/:id`,
    element: (
      <ErrorBoundary>
        <Posts />
      </ErrorBoundary>
    ),
  },
  [AppRoutes.LEADER_BOARD]: {
    path: AppRoutes.LEADER_BOARD,
    element: (
      <ErrorBoundary>
        <LeaderBoard />
      </ErrorBoundary>
    ),
  },
  NOT_FOUND: {
    path: '*',
    element: (
      <ErrorBoundary>
        <NotFound />
      </ErrorBoundary>
    ),
  },
  SERVER_ERROR: {
    path: 'server-error',
    element: (
      <ErrorBoundary>
        <ServerError />
      </ErrorBoundary>
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
