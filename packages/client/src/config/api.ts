const API_HOST = import.meta.env.VITE_API_HOST || 'localhost'
const API_PORT = import.meta.env.VITE_API_SERVER_PORT || '3001'
const API_PREFIX = '/api/v1'

const SERVER_URL = `http://${API_HOST}:${API_PORT}`

export const API_URLS = {
  themes: `${SERVER_URL}${API_PREFIX}/themes`,
  userTheme: (userId: number) =>
    `${SERVER_URL}${API_PREFIX}/users/${userId}/theme`,
}
