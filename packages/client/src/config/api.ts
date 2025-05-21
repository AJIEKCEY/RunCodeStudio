// Configuration for API
// In test environment, use default values
// In production, use import.meta.env values if available

import { getEnvVariable } from './env'

// Константы для API
// export const API_HOST = getEnvVariable('API_HOST', 'localhost')
// export const API_PORT = getEnvVariable('API_PORT', '3001')

// Получаем API_PATH из переменных окружения
// По умолчанию путь API может быть уже в формате /api/v1
// const rawApiPath = getEnvVariable('API_PATH', 'api')

// Удаляем начальный слеш, если он есть
// export const API_PATH = rawApiPath.startsWith('/') ? rawApiPath.slice(1) : rawApiPath

// Проверяем, содержит ли путь уже версию API
// const hasApiVersion = API_PATH.includes('v1')

// Версия API только если она не включена в API_PATH
// export const API_VERSION = hasApiVersion ? '' : getEnvVariable('API_VERSION', 'v1')

// Формируем URL сервера
// export const SERVER_URL = `http://${API_HOST}:${API_PORT}`

// Формируем базовый URL API
// export const BASE_API_URL = hasApiVersion
//   ? `${SERVER_URL}/${API_PATH}`
//   : `${SERVER_URL}/${API_PATH}/${API_VERSION}`

export const BASE_API_URL = '/api/v1'

// Объект с URL для API
export const API_URLS = {
  themes: `${BASE_API_URL}/themes`,
  BASEAPI_URL: BASE_API_URL,
  userTheme: (userId: string | number) => `${BASE_API_URL}/users/${userId}/theme`,
  // Эндпоинты форума
  forum: {
    posts: `/posts`,
    post: (id: number) => `/posts/${id}`,
    categories: `/categories`,
    comments: (postId: number) => `/posts/${postId}/comments`,
    comment: (commentId: number) => `/comments/${commentId}`,
    reactions: (commentId: number) => `/comments/${commentId}/reactions`,
  },
}

export const CLOUD_URL = 'https://runcodestudio.ya-praktikum.tech'
