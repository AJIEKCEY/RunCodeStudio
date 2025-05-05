import { createSlice } from '@reduxjs/toolkit'

// Определение типа состояния
export interface AuthState {
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

// Начальное состояние
const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null
}

// Создание слайса
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Редюсеры для авторизации можно добавить здесь
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

// Экспорт экшенов
export const { setAuthenticated, setLoading, setError, clearError } = authSlice.actions

// Экспорт редюсера по умолчанию
export default authSlice.reducer 