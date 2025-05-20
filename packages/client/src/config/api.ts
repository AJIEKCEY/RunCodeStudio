const API_HOST = import.meta.env.VITE_API_HOST || 'server'
const API_PORT = import.meta.env.VITE_API_SERVER_PORT || '3001'
const API_PREFIX = '/api/v1'

// const SERVER_URL = `http://${API_HOST}:${API_PORT}${API_PREFIX}`
const SERVER_URL = `${API_PREFIX}`

export const API_URLS = {
  themes: `${SERVER_URL}/themes`,
  userTheme: (userId: number) => `${SERVER_URL}/users/${userId}/theme`,
}

export const CLOUD_URL = 'https://runcodestudio.ya-praktikum.tech'
