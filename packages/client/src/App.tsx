import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRoutes'
import { NotificationProvider } from './components/Notification/NotificationContext'

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <NotificationProvider>
        <AppRouter />
      </NotificationProvider>
    </BrowserRouter>
  )
}

export default App
