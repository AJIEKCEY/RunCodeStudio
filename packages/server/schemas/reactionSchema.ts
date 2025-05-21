import { ReactionType } from '../models/Reaction'

export const createReactionSchema = {
  type: 'object',
  properties: {
    type: { enum: Object.values(ReactionType) },
  },
  required: ['type'],
}
