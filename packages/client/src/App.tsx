import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRoutes'
import { NotificationProvider } from './components/Notification/NotificationContext'
import { useTheme, ThemeProvider } from './context/ThemeContext'
import { ConfigProvider, theme as antdTheme, Spin } from 'antd/lib'

function App() {
  const { themeName, loading } = useTheme()
  const algorithm = themeName === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <NotificationProvider>
        <ConfigProvider
          theme={{
            algorithm,
            token: {
              colorPrimary: themeName === 'light' ? '#e5d1f2' : '#5f00b5',
            },
          }}
        >
          <AppRouter />
        </ConfigProvider>
      </NotificationProvider>
    </BrowserRouter>
  )
}

export default App
