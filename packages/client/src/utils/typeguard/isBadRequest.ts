import { BadRequest } from '../../store/features/user/types'

export function isBadRequest(obj: object): obj is BadRequest {
  if ('data' in obj) return true
  return false
}
