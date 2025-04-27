import React, { createContext, useContext, ReactNode } from 'react'
import { useThemeData, ThemeName } from '../hooks/useThemeData'

interface ThemeContextType {
  themeName: ThemeName
  settings: Record<string, any> | null
  toggleTheme: () => Promise<void>
  loading: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { themeName, settings, loading, toggleTheme } = useThemeData()

  return (
    <ThemeContext.Provider
      value={{ themeName, settings, loading, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme должно быть внутри ThemeProvider')
  return ctx
}
