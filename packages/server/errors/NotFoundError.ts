import { HttpError } from './HttpError'

export class NotFoundError extends HttpError {
  override statusCode = 404
}
