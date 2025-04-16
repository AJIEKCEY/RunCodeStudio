import Container from './components/Layout'
import { Route, type RouteObject, Routes } from 'react-router-dom'
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
import LeaderBoard from './pages/Leaderboard/LeaderBoard'

export const AppRoutes = {
  LOGIN: 'login',
  PROFILE: 'profile',
  REGISTRATION: 'registration',
  PLAY: 'play',
  FORUM: 'forum',
  FORUM_TOPIC: 'forum-topic/:id',
  LEADER_BOARD: 'leader-board',
}

type Route = RouteObject & {
  isProtected?: boolean
}

export const routConfig: Route[] = [
  {
    path: AppRoutes.LOGIN,
    Component: Auth,
  },
  {
    path: AppRoutes.PROFILE,
    Component: Profile,
    isProtected: true,
  },
  {
    path: AppRoutes.REGISTRATION,
    Component: Registration,
  },
  {
    path: AppRoutes.PLAY,
    Component: GameMain,
    isProtected: true,
  },
  {
    path: AppRoutes.FORUM,
    Component: Threads,
    isProtected: true,
  },
  {
    path: `${AppRoutes.FORUM}/:id`,
    Component: Posts,
    isProtected: true,
  },
  {
    path: AppRoutes.LEADER_BOARD,
    Component: LeaderBoard,
    isProtected: true,
  },
  {
    path: '*',
    Component: NotFound,
  },
  {
    path: 'server-error',
    Component: ServerError,
  },
]

const AppRouter = () => {
  return (
    <ErrorBoundary>
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Container />}>
              <Route index element={<Landing />} />
              {routConfig.map(({ path, Component, isProtected = false }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    isProtected ? (
                      <ProtectedRoute>
                        <>{Component}</>
                      </ProtectedRoute>
                    ) : (
                      <>{Component}</>
                    )
                  }
                />
              ))}
            </Route>
          </Routes>
        </AuthProvider>
      </div>
    </ErrorBoundary>
  )
}
export default AppRouter
