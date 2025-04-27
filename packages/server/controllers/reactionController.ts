import { Request, Response } from 'express'

import { Reaction, ReactionType } from '../models/Reaction'
import { createReactionSchema, schemaValidator } from '../schemas'

interface ISetReaction {
  commentId: number
  userId: number
  reactionType: ReactionType
}

const createReaction = async (req: Request, res: Response) => {
  const payload: ISetReaction = req.body

  schemaValidator.validate(createReactionSchema, payload)

  const { id } = await Reaction.create({
    type: payload.reactionType,
    user_id: payload.userId,
    comment_id: payload.commentId,
  })

  res.json({ id })
}

export { createReaction }
