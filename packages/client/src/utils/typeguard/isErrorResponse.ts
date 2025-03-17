import { ErrorResponse } from '../../store/features/user/types'

export function isErrorResponse(obj: object): obj is ErrorResponse {
  if (typeof obj === 'object' && 'status' in obj) {
    return obj.status !== 200
  }
  return false
}
