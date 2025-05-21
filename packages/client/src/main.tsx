import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createStore } from './store/utils/createStore'
import { AppProviders } from './components/AppProviders'
import { handlePromiseError } from './utils/errorHandler'
import { ConfigProvider } from 'antd/lib'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    handlePromiseError(navigator.serviceWorker.register('/sw.js'), 'регистрация service worker')
  })
}

const store = createStore(window.APP_INITIAL_STATE)

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ConfigProvider>
      <AppProviders store={store}>
        <App />
      </AppProviders>
    </ConfigProvider>
  </React.StrictMode>
)
