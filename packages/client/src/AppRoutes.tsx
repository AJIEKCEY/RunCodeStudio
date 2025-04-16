import React from 'react'
import Container from './components/Layout'

import { Route, Routes } from 'react-router-dom'
import Threads from './pages/forum/Threads'
import Posts from './pages/forum/Posts'
import Landing from './pages/Landing/Landing'
import NotFound from './pages/ErrorPages/NotFound'
import ServerError from './pages/ErrorPages/ServerError'
import Registration from './pages/Registration/Registration'
import GameMain from './pages/Game/GameMain'
import Auth from './pages/Auth/Auth'
import ErrorBoundary from './components/ErrorBoundary'

import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './components/AuthContext'
import Profile from './pages/Profile/Profile'
import LeaderBoard from './pages/leaderboard/LeaderBoard'

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
  { path: string; element: React.JSX.Element; isProtected?: boolean }
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
    isProtected: true,
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
        <GameMain />
      </ErrorBoundary>
    ),
    isProtected: true,
  },
  [AppRoutes.FORUM]: {
    path: AppRoutes.FORUM,
    element: (
      <ErrorBoundary>
        <Threads />
      </ErrorBoundary>
    ),
    isProtected: true,
  },
  [AppRoutes.FORUM_TOPIC]: {
    path: `${AppRoutes.FORUM}/:id`,
    element: (
      <ErrorBoundary>
        <Posts />
      </ErrorBoundary>
    ),
    isProtected: true,
  },
  [AppRoutes.LEADER_BOARD]: {
    path: AppRoutes.LEADER_BOARD,
    element: (
      <ErrorBoundary>
        <LeaderBoard />
      </ErrorBoundary>
    ),
    isProtected: true,
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
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Container />}>
            <Route index element={<Landing />} />
            {Object.values(routConfig).map(
              ({ path, element, isProtected = false }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    isProtected ? (
                      <ProtectedRoute>{element}</ProtectedRoute>
                    ) : (
                      element
                    )
                  }
                />
              )
            )}
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}
export default AppRouter
