export const API_URL = import.meta.env.API_URL || 'http://localhost:3005'
export const API_VERSION = import.meta.env.API_VERSION || 'v1'

const API_HOST = import.meta.env.VITE_API_HOST || 'localhost'
const API_PORT = import.meta.env.VITE_API_SERVER_PORT || '3005'
const API_PATH = import.meta.env.VITE_API_PATH || '/api/v1'

const SERVER_URL = `http://${API_HOST}:${API_PORT}`

export const API_URLS = {
  themes: `${SERVER_URL}${API_PATH}/themes`,
  userTheme: (userId: number) =>
    `${SERVER_URL}${API_PATH}/users/${userId}/theme`,
  BASEAPI_URL: `${SERVER_URL}${API_PATH}`,
}
