import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd/lib'

import App from './App'
import './index.css'
import { store } from './store/store'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#8076a3',
            fontSize: 18,
          },
        }}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)
