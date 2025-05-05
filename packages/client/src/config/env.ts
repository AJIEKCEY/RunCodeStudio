// Environment variables handler
// In test environment, always returns default values
// In production, uses a dynamic approach to get Vite env vars

// Определяем, находимся ли мы в тестовом окружении
function isTestEnv(): boolean {
  return typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test';
}

// Функция для получения переменных окружения
export const getEnvVariable = (key: string, defaultValue: string): string => {
  // В тестовом окружении всегда возвращаем значение по умолчанию
  if (isTestEnv()) {
    return defaultValue;
  }
  
  // В production получаем переменную из глобального объекта, доступного в рантайме
  // Эта часть кода выполнится только в браузере, не в тестах
  let value: string | undefined;
  try {
    // @ts-ignore - Игнорируем ошибку TS для тестов
    value = window.__ENV__ && window.__ENV__[key];
  } catch (e) {
    // Игнорируем ошибки
  }
  
  return value || defaultValue;
}; 