import { BadRequest } from '../../store/features/user/types'

export function isBadRequest(obj: object): obj is BadRequest {
  return (
    obj &&
    typeof obj === 'object' &&
    'data' in obj &&
    typeof obj.data === 'object' &&
    obj.data !== null &&
    'reason' in obj.data &&
    typeof obj.data.reason === 'string' &&
    'status' in obj &&
    typeof obj.status === 'number'
  )
}
