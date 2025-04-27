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
import Profile from './pages/profile/Profile'
import LeaderBoard from './pages/leaderboard/LeaderBoard'
import Profile from './pages/Profile/Profile'

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
    element: <Auth />,
  },
  {
    path: AppRoutes.PROFILE,
    element: <Profile />,
    isProtected: true,
  },
  {
    path: AppRoutes.REGISTRATION,
    element: <Registration />,
  },
  {
    path: AppRoutes.PLAY,
    element: <GameMain />,
    isProtected: true,
  },
  {
    path: AppRoutes.FORUM,
    element: <Threads />,
    isProtected: true,
  },
  {
    path: `${AppRoutes.FORUM}/:id`,
    element: <Posts />,
    isProtected: true,
  },
  {
    path: AppRoutes.LEADER_BOARD,
    element: <LeaderBoard />,
    isProtected: true,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    element: <ServerError />,
    path: 'server-error',
  },
]

const AppRouter = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index element={<Landing />} />
          {routConfig.map(({ path, element, isProtected = false }) => (
            <Route
              key={path}
              path={path}
              element={
                isProtected ? (
                  <ProtectedRoute>
                    <>{element}</>
                  </ProtectedRoute>
                ) : (
                  <>{element}</>
                )
              }
            />
          ))}
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}
export default AppRouter
