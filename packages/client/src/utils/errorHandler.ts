/**
 * Обработчик ошибок приложения
 * @param {unknown} error - Ошибка
 * @param {string} context - Контекст, в котором произошла ошибка
 * @returns {void}
 */
export const handleError = (error: unknown, context: string) => {
  console.error(`Ошибка в ${context}:`, error)
  // TODO: Добавить интеграцию с системой уведомлений
}

/**
 * Обработчик ошибок для промисов
 * @template T
 * @param {Promise<T>} promise - Промис
 * @param {string} context - Контекст, в котором выполняется промис
 * @returns {Promise<T | null>} Результат промиса или null в случае ошибки
 */
export const handlePromiseError = async <T>(
  promise: Promise<T>,
  context: string
): Promise<T | null> => {
  try {
    return await promise
  } catch (error) {
    handleError(error, context)
    return null
  }
}
