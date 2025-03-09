import { ErrorResponse } from '../../store/features/user/types'

export function isErrorResponse(obj: object): obj is ErrorResponse {
  if ('status' in obj) return true
  return false
}
