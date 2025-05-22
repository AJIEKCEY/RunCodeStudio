import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@hooks/useAuth'
import { API_URLS } from '@config/api'

export type ThemeName = 'light' | 'dark'
interface Theme {
  id: number
  name: ThemeName
  settings: Record<string, any>
}

export function useThemeData() {
  const { user } = useAuth()
  const isGuest = !user

  const [themes, setThemes] = useState<Theme[]>([])
  const [themeName, setThemeName] = useState<ThemeName>('light')
  const [settings, setSettings] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(true)

  // Загрузка списка тем
  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetch(API_URLS.themes)
      .then((res) => res.json())
      .then((data: Theme[]) => {
        if (cancelled) return
        setThemes(data)
        // Устанавливаем светлую тему по умолчанию
        const lightTheme = data.find((t) => t.name === 'light')!
        setThemeName(lightTheme.name)
        setSettings(lightTheme.settings)
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  // Применение темы
  useEffect(() => {
    if (themes.length === 0) return

    if (isGuest) {
      const stored = localStorage.getItem('guestThemeId')
      const id = stored ? +stored : themes.find((t) => t.name === 'light')!.id
      const t = themes.find((t) => t.id === id)
      if (t) {
        setThemeName(t.name)
        setSettings(t.settings)
      }
    } else {
      setLoading(true)
      // TODO: пока будем использовать юзера с id=1, но в будущем будем использовать реальный id юзера, когда будут ручки
      fetch(API_URLS.userTheme(1))
        .then((res) => {
          if (!res.ok) throw new Error('Не удалось загрузить тему')
          return res.json()
        })
        .then(({ id }: { id: number }) => {
          const theme = themes.find((t) => t.id === id)
          if (theme) {
            setThemeName(theme.name)
            setSettings(theme.settings)
          }
        })
        .catch((err) => {
          console.error(err)
          const light = themes.find((t) => t.name === 'light')!
          setThemeName(light.name)
          setSettings(light.settings)
        })
        .finally(() => setLoading(false))
    }
  }, [themes, isGuest, user])

  // Переключение темы: применяем мгновенно, сохраняем в фоне
  const toggleTheme = useCallback(async () => {
    if (themes.length === 0) return

    const newName: ThemeName = themeName === 'light' ? 'dark' : 'light'
    const newTheme = themes.find((t) => t.name === newName)!

    // сразу применяем на UI
    setThemeName(newName)
    setSettings(newTheme.settings)

    if (isGuest) {
      localStorage.setItem('guestThemeId', String(newTheme.id))
    } else {
      // TODO: пока будем использовать юзера с id=1, но в будущем будем использовать реальный id юзера, когда будут ручки
      fetch(API_URLS.userTheme(1), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themeId: newTheme.id }),
      }).catch((err) => console.error('Не удалось сохранить тему:', err))
    }
  }, [themes, themeName, isGuest, user])

  return { themeName, settings, loading, toggleTheme }
}
