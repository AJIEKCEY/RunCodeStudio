import { useState } from 'react'

export const useLocalStorage = <T,>(keyName: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      console.warn('useLocalStorage:только для браузерного окружения')
      return defaultValue
    }
    try {
      const value = window.localStorage.getItem(keyName)
      if (value) {
        return JSON.parse(value) as T // Приводим значение к типу T
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (err) {
      return defaultValue
    }
  })

  const setValue = (newValue: T) => {
    if (typeof window === 'undefined') {
      console.warn('useLocalStorage:только для браузерного окружения')
      return
    }
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue))
    } catch (err) {
      console.error(err)
    }
    setStoredValue(newValue)
  }

  return [storedValue, setValue] as const // Используем `as const` для корректного вывода типов
}
