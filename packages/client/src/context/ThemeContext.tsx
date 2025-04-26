import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { useAuth } from '../hooks/useAuth'

export type ThemeName = 'light' | 'dark'
interface Theme {
  id: number
  name: ThemeName
  settings: Record<string, any>
}

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
  const { user } = useAuth()
  const isGuest = !user

  const [themes, setThemes] = useState<Theme[]>([])
  const [themeName, setThemeName] = useState<ThemeName>('light')
  const [settings, setSettings] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/themes')
      .then(res => res.json())
      .then((data: Theme[]) => setThemes(data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (themes.length === 0) return

    if (isGuest) {
      const stored = localStorage.getItem('guestThemeId')
      const id = stored
        ? Number(stored)
        : themes.find(t => t.name === 'light')!.id
      const t = themes.find(t => t.id === id)!
      setThemeName(t.name)
      setSettings(t.settings)
      setLoading(false)
    } else {
      // для авторизованного — запрашиваем у сервера
      // TODO: надо будет добавить юзеру id либо еще ходить на сервер и запрашивать id юзера, использую его login.
      // fetch(`http://localhost:3001/api/v1/users/${user!.id}/theme`)
      // TODO: пока будем использовать юзера с id=1
      fetch(`http://localhost:3001/api/v1/users/1/theme`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load user theme')
          return res.json()
        })
        .then(({ id, name }: { id: number; name: ThemeName }) => {
          const t = themes.find(t => t.id === id)!
          setThemeName(name)
          setSettings(t.settings)
        })
        .catch(err => {
          console.error(err)
          const t = themes.find(t => t.name === 'light')!
          setThemeName('light')
          setSettings(t.settings)
        })
        .finally(() => setLoading(false))
    }
  }, [themes, isGuest, user])

  const toggleTheme = async () => {
    if (themes.length === 0) return
    setLoading(true)

    const newName: ThemeName = themeName === 'light' ? 'dark' : 'light'
    const newTheme = themes.find(t => t.name === newName)!

    if (isGuest) {
      localStorage.setItem('guestThemeId', String(newTheme.id))
    } else {
      try {
        // TODO: пока будем использовать юзера с id=1, но в будущем будем использовать реальный id юзера, когда будут ручки для юзера
        // await fetch(`http://localhost:3001/api/v1/users/${user!.id}/theme`, {
        await fetch(`http://localhost:3001/api/v1/users/1/theme`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ themeId: newTheme.id }),
        })
      } catch (err) {
        console.error('Не удалось сохранить тему:', err)
      }
    }

    setThemeName(newName)
    setSettings(newTheme.settings)
    setLoading(false)
  }

  return (
    <ThemeContext.Provider
      value={{ themeName, settings, toggleTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme должно быть внутри ThemeProvider')
  return ctx
}
