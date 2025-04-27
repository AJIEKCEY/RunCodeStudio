import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../errors'

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err.stack || err.message)

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ error: err.message })
    return
  }

  res.status(500).json({ error: 'Internal error' })
}
