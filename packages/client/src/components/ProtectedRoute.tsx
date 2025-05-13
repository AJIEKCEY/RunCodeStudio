import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

/**
 * Компонент для защиты маршрутов, требующих авторизации
 * @param {Props} props - Пропсы компонента
 * @param {ReactNode} props.children - Дочерние компоненты
 * @returns {JSX.Element} Защищенный маршрут или редирект на страницу входа
 */
export const ProtectedRoute = ({ children }: Props): JSX.Element => {
  const { user } = useAuth()
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}
