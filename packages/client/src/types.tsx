import { ReactNode } from 'react'

export type User = {
  name: string
  isAuthenticated: boolean
}

export type AuthContextType = {
  user: User | null
  login: (data: User) => Promise<void>
  logout: () => void
}

export type AuthProviderProps = {
  children: ReactNode
}
