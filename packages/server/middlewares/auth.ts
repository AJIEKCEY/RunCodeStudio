import { Request, Response, NextFunction } from 'express'

/**
 * Временный middleware для авторизации.
 * В реальном приложении здесь должна быть проверка токена или cookie для аутентификации.
 *
 * ВНИМАНИЕ: Это временная заглушка. В будущем необходимо реализовать настоящую аутентификацию
 * с проверкой cookie от Яндекса или другим механизмом аутентификации.
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Примечание: В реальном приложении, эта информация должна быть получена
    // из токена/cookie авторизации. Сейчас мы просто используем заглушку.
    req.user = {
      id: 1, // ID пользователя по умолчанию
      firstname: 'Demo User',
    }

    // Продолжаем выполнение запроса
    next()
  } catch (error) {
    // В случае ошибки аутентификации возвращаем 401 Unauthorized
    res.status(401).json({
      message: 'Необходима авторизация',
      error: error instanceof Error ? error.message : 'Неизвестная ошибка',
    })
  }
}
