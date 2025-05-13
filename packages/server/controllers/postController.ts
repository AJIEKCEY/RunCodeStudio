import { Request, Response } from 'express'
import { Post } from '../models/Post'
import { NotFoundError, ValidationError } from '../errors'
import { ErrorTexts } from '../consts'

const getPosts = async (req: Request, res: Response) => {
  const { skip = 0, limit = 10 } = req.query
  const max_limit = 50

  const posts = await Post.findAll({
    offset: Number(skip),
    limit: Math.max(Number(limit), max_limit),
  })

  res.json({
    count: await Post.count(),
    items: posts,
  })
}

const getPostById = async (req: Request, res: Response) => {
  // TODO use json schema validation
  const post = await Post.findByPk(req.params.id)
  res.json({ item: post })
}

const createPost = async (req: Request, res: Response) => {
  const { title, description, user_id, category_id } = req.body

  // TODO use json schema validation
  if (!title || !user_id || !category_id) {
    throw new ValidationError('Необходимы title, user_id и category_id')
  }

  const post = await Post.create({
    title,
    description,
    user_id,
    category_id,
  })

  res.json({
    item: post,
  })
}

const deletePost = async (req: Request, res: Response) => {
  // TODO use json schema validation
  // TODO remove only current user posts
  const deleted = await Post.destroy({
    where: { id: req.params.id },
  })

  if (!deleted) {
    throw new NotFoundError(ErrorTexts.POST_NOT_FOUND)
  }

  res.status(204).end()
}

export { getPosts, getPostById, createPost, deletePost }
