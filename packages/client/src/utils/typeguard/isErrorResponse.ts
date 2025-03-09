import { ErrorResponse } from '../../store/features/user/types'

export function isErrorResponse(obj: object): obj is ErrorResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'status' in obj &&
    (typeof obj.status === 'number' || typeof obj.status === 'string') &&
    'msg' in obj &&
    typeof obj.msg === 'string'
  )
}
