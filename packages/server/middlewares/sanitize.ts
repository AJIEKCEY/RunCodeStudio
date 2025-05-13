import { NextFunction, Request, Response } from 'express'
import { filterXSS } from 'xss'

export const sanitizeInput = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = filterXSS(req.body[key], {
          whiteList: {}, // Запрещаем ВЕСЬ HTML
          stripIgnoreTag: true, // Удаляем запрещённые теги полностью
        })
      }
    }
  }
  next()
}
