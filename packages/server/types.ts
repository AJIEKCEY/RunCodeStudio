// Импорт используется для расширения глобального пространства имен Express
// @ts-expect-error - Request используется для расширения глобального пространства имен
import { Request } from 'express'

export interface IHttpError extends Error {
  statusCode: number
}

export interface IUser {
  id: number
  firstname: string
  // можно добавить другие поля при необходимости
}

// Расширение для типа Request из Express
// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}
