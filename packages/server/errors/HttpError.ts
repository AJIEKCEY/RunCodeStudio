import { IHttpError } from '../types'

export class HttpError extends Error implements IHttpError {
  statusCode = 500
}
