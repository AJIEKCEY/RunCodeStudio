// Mock for API configuration
export const API_HOST = 'localhost'
export const API_PORT = '3001'
export const API_VERSION = 'v1'

// Получаем API_PATH из переменных окружения
// По умолчанию путь API может быть уже в формате /api/v1
const rawApiPath = 'api/v1'

// Удаляем начальный слеш, если он есть
export const API_PATH = rawApiPath.startsWith('/') ? rawApiPath.slice(1) : rawApiPath

// Проверяем, содержит ли путь версию API
const hasApiVersion = API_PATH.includes(API_VERSION)

// Формируем URL сервера
export const SERVER_URL = `http://${API_HOST}:${API_PORT}`

// Формируем базовый URL API
export const BASE_API_URL = hasApiVersion
  ? `${SERVER_URL}/${API_PATH}`
  : `${SERVER_URL}/${API_PATH}/${API_VERSION}`

// Объект с URL для API
export const API_URLS = {
  themes: `${BASE_API_URL}/themes`,
  BASEAPI_URL: BASE_API_URL,
  userTheme: (userId: string | number) => `${BASE_API_URL}/users/${userId}/theme`,
  forum: `${BASE_API_URL}/forum`,
  leaderboard: `${BASE_API_URL}/leaderboard`,
  auth: `${BASE_API_URL}/auth`,
  user: `${BASE_API_URL}/user`,
}
