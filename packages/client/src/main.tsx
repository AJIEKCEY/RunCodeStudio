import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'

import App from './App'
import './index.css'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#8076a3',
          },
        }}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)
