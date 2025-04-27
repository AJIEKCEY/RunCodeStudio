import { createContext, type ReactNode, useEffect, useMemo } from 'react'
// import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { User, AuthContextType } from '../types'
import {
  useLogoutUserMutation,
  useSignInUserMutation,
} from '../store/features/user/userApiSlice'

type UserOrNull = User | null

type Props = {
  children: ReactNode
}

// Создаем контекст
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Создаем провайдер
export const AuthProvider = ({ children }: Props) => {
  // const [user, setUser] = useLocalStorage<UserOrNull>('user', null)
  const [signIn, { data: userData }] = useSignInUserMutation()
  // TODO: [Настроить Redux и Router в SSR] разобраться как сделать красиво
  // const navigate = useNavigate()
  const [logoutUser] = useLogoutUserMutation()

  const login = async (data: User) => {
    // setUser(data)
    window.location.href = '/play'
    // navigate('/play')
  }
  useEffect(() => {
    // setUser(userData)
  }, [])

  const logout = () => {
    // setUser(null)
    window.location.href = '/'
    // navigate('/', { replace: true })
    logoutUser({})
  }

  const value = useMemo(
    () => ({
      // user,
      login,
      logout,
    }),
    []
  )

  return <AuthContext.Provider value={'value'}>{children}</AuthContext.Provider>
}
