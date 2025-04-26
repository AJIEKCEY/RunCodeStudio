import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'
import { store } from './store/store'
import { AuthProvider } from './components/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    try {
      navigator.serviceWorker.register('/sw.js')
    } catch (error) {
      console.info(error)
    }
  })
}

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ReduxProvider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </ReduxProvider>
  </React.StrictMode>
)
