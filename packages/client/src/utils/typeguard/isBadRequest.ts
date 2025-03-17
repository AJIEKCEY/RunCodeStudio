import { BadRequest } from '../../store/features/user/types'
import { ResponseWithStatusField } from './types'

export function isBadRequest(obj: object): obj is BadRequest {
  if (typeof obj === 'object' && obj !== null) {
    if ('status' in obj) return (obj as ResponseWithStatusField).status !== 200
  }
  return false
}
