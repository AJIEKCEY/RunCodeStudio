import { BadRequest } from '../../store/features/user/types'

export function isBadRequest(obj: object): obj is BadRequest {
  if (typeof obj === 'object' && 'status' in obj) {
    return obj.status !== 200
  }
  return false
}
