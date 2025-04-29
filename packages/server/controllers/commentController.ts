import { Request, Response } from 'express'
import { Comment } from '../models/Comment'
import { User } from '../models/User'
import { Reaction } from '../models/Reaction'
import { getCommentsSchema, schemaValidator } from '../schemas'

const getComments = async (req: Request, res: Response) => {
  const query = { postId: Number(req.params.postId) }

  schemaValidator.validate(getCommentsSchema, query)

  const comments = await Comment.findAll({
    where: {
      post_id: query.postId,
      root_comment: null,
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'firstname'], // Выбираем нужные поля
      },
      {
        model: Reaction,
        as: 'reactions',
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstname'],
          },
        ],
      },
      {
        model: Comment,
        as: 'replies', // Включаем ответы
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstname'],
          },
          {
            model: Reaction,
            as: 'reactions',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'firstname'],
              },
            ],
          },
          {
            model: Comment,
            as: 'replies', // Рекурсивно включаем ответы на ответы
            include: [User], // Можно продолжать вкладывать
          },
        ],
      },
    ],
  })

  res.status(200).json(comments)
}

export { getComments }
