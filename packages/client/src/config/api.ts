export const API_URL = process.env.API_URL || 'http://localhost:3005'
export const API_VERSION = process.env.API_VERSION || 'v1'

const API_HOST = process.env.VITE_API_HOST || 'localhost'
const API_PORT = process.env.VITE_API_SERVER_PORT || '3005'
const API_PREFIX = '/api/v1'

const SERVER_URL = `http://${API_HOST}:${API_PORT}`

export const API_URLS = {
  themes: `${SERVER_URL}${API_PREFIX}/themes`,
  userTheme: (userId: number) =>
    `${SERVER_URL}${API_PREFIX}/users/${userId}/theme`,
}
