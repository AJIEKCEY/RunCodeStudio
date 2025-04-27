import { ReactionType } from '../models/Reaction'

export const createReactionSchema = {
  type: 'object',
  properties: {
    commentId: { type: 'number' },
    userId: { type: 'number' },
    reactionType: { enum: Object.values(ReactionType) },
  },
  required: ['commentId', 'userId', 'reactionType'],
}
