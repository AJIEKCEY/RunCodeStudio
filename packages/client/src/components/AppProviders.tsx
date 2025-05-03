import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import type { Store } from '@reduxjs/toolkit'

import { AuthProvider } from './AuthContext'
import { ThemeProvider } from '../context/ThemeContext'
import { NotificationProvider } from './Notification/NotificationContext'

type AppProvidersProps = {
  children: React.ReactNode
  store: Store
  location?: string
}

/**
 * Компонент-обертка для всех провайдеров приложения
 * @param {AppProvidersProps} props - Пропсы компонента
 * @param {React.ReactNode} props.children - Дочерние компоненты
 * @param {Store} props.store - Redux store
 * @param {string} [props.location] - URL для SSR
 * @returns {JSX.Element} Компонент с провайдерами
 */
export const AppProviders = ({ children, store, location }: AppProvidersProps) => {
  const providers = (
    <Provider store={store}>
      <AuthProvider>
        <NotificationProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </NotificationProvider>
      </AuthProvider>
    </Provider>
  )

  return location ? (
    <StaticRouter location={location}>
      {providers}
    </StaticRouter>
  ) : (
    providers
  )
} 
