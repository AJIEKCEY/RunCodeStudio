import { createContext, useContext } from 'react'
import useNotification, {
  NotificationContextType,
} from '../../hooks/useNotification'

const NotificationContext = createContext<NotificationContextType | null>(null)

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const notification = useNotification()

  return (
    <NotificationContext.Provider value={notification}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = () => {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error(
      'useNotificationContext must be used within a NotificationProvider'
    )
  }

  return context
}
