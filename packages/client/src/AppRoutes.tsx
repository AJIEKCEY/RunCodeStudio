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
import CanvasGame from './pages/Game/CanvasGame/CanvasGame'
import Auth from './pages/Auth/Auth'

import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

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
  { path: string; element: React.JSX.Element, isProtected?: boolean }
> = {
  [AppRoutes.LOGIN]: {
    path: AppRoutes.LOGIN,
    element: <Auth />,
  },
  [AppRoutes.PROFILE]: {
    path: AppRoutes.PROFILE,
    element: <></>,
    isProtected: true,
  },
  [AppRoutes.REGISTRATION]: {
    path: AppRoutes.REGISTRATION,
    element: <Registration />,
  },
  [AppRoutes.PLAY]: {
    path: AppRoutes.PLAY,
    element: <CanvasGame />,
    isProtected: true,
  },
  [AppRoutes.FORUM]: {
    path: AppRoutes.FORUM,
    element: <Threads />,
    isProtected: true,
  },
  [AppRoutes.FORUM_TOPIC]: {
    path: `${AppRoutes.FORUM}/:id`,
    element: <Posts />,
    isProtected: true,
  },
  [AppRoutes.LEADER_BOARD]: {
    path: AppRoutes.LEADER_BOARD,
    element: <LeaderBoard />,
    isProtected: true,
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
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Container />}>
            <Route index element={<Landing />} />
            {Object.values(routConfig).map(({ path, element, isProtected = false }) => (
              <Route
                key={path}
                path={path}
                element={ isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element } />
            ))}
          </Route>
        </Routes>
      </AuthProvider>

    </div>
  )
}
export default AppRouter
