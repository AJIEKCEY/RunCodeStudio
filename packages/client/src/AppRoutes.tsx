import Container from './components/Layout'
import { Route, type RouteObject, Routes } from 'react-router-dom'
import Threads, { initThreadsPage } from './pages/forum/Threads'
import Posts, { initPostsPage } from './pages/forum/Posts'
import Landing, { initLoginPage } from './pages/Landing/Landing'
import NotFound, { initNotFoundPage } from './pages/ErrorPages/NotFound'
import ServerError, { initServerErrorPage } from './pages/ErrorPages/ServerError'
import Registration, { initRegistrationPage } from './pages/Registration/Registration'
import GameMain, { initGamePage } from './pages/Game/GameMain'
import Auth from './pages/Auth/Auth'
import ErrorBoundary from './components/ErrorBoundary'
import { ProtectedRoute } from './components/ProtectedRoute'
import LeaderBoard, { initLeaderBoardPage } from './pages/leaderboard/LeaderBoard'
import Profile, { initProfilePage } from './pages/Profile/Profile'
import { PageInitArgs } from './store/store'

export const AppRoutes = {
  LOGIN: 'login',
  PROFILE: 'profile',
  REGISTRATION: 'registration',
  PLAY: 'play',
  FORUM: 'forum',
  FORUM_TOPIC: 'forum-topic/:id',
  LEADER_BOARD: 'leader-board',
  LANDING: '/',
}

type Route = RouteObject & {
  isProtected?: boolean
  fetchData?: (initFc: PageInitArgs) => Promise<unknown>
}

export const routConfig: Route[] = [
  {
    path: AppRoutes.LOGIN,
    element: <Auth />,
    fetchData: initLoginPage,
  },
  {
    path: AppRoutes.PROFILE,
    element: <Profile />,
    isProtected: true,
    fetchData: initProfilePage,
  },
  {
    path: AppRoutes.REGISTRATION,
    element: <Registration />,
    fetchData: initRegistrationPage,
  },
  {
    path: AppRoutes.PLAY,
    element: <GameMain />,
    isProtected: true,
    fetchData: initGamePage,
  },
  {
    path: AppRoutes.FORUM,
    element: <Threads />,
    isProtected: true,
    fetchData: initThreadsPage,
  },
  {
    path: `${AppRoutes.FORUM}/:id`,
    element: <Posts />,
    isProtected: true,
    fetchData: initPostsPage,
  },
  {
    path: AppRoutes.LEADER_BOARD,
    element: <LeaderBoard />,
    isProtected: true,
    fetchData: initLeaderBoardPage,
  },
  {
    path: '*',
    element: <NotFound />,
    fetchData: initNotFoundPage,
  },
  {
    element: <ServerError />,
    path: 'server-error',
    fetchData: initServerErrorPage,
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
