import { ErrorResponse } from '../../store/features/user/types'
import { ResponseWithStatusField } from './types'

export function isErrorResponse(obj: object): obj is ErrorResponse {
  if (typeof obj === 'object' && obj !== null) {
    if ('status' in obj) return (obj as ResponseWithStatusField).status !== 200
  }
  return false
}
