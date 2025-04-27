import { HttpError } from './HttpError'

export class ValidationError extends HttpError {
  override statusCode = 422

  constructor(message = 'Ошибка валидации') {
    super(message)
  }
}
