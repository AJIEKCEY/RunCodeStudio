import { Request, Response } from 'express'
import { Post } from '../models/Post'
import { User } from '../models/User'
import { Category } from '../models/Category'
import { Comment } from '../models/Comment'
import { NotFoundError, ValidationError } from '../errors'
import { ErrorTexts } from '../consts'

const getPosts = async (req: Request, res: Response) => {
  const { skip = 0, limit = 10 } = req.query
  const max_limit = 50

  const posts = await Post.findAll({
    offset: Number(skip),
    limit: Math.min(Number(limit), max_limit),
    include: [
      {
        model: Category,
        attributes: ['name'],
      },
    ],
  })

  const postsWithComments = await Promise.all(
    posts.map(async post => {
      const count = await Comment.count({
        where: { post_id: post.id },
      })

      return {
        ...post.get({ plain: true }),
        count_comments: count,
      }
    })
  )

  res.json({
    count: await Post.count(),
    items: postsWithComments,
  })
}

const getPostById = async (req: Request, res: Response) => {
  const post = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['firstname'],
      },
      {
        model: Category,
        attributes: ['name'],
      },
    ],
  })
  res.json({
    item: post,
  })
}

const createPost = async (req: Request, res: Response) => {
  try {
    const { title, description, user_id, category_id } = req.body

    console.info('Creating post with data:', { title, description, user_id, category_id });

    // TODO use json schema validation
    if (!title || !user_id || !category_id) {
      throw new ValidationError('Необходимы title, user_id и category_id')
    }

    // Проверим, что пользователь и категория существуют
    const user = await User.findByPk(user_id);
    if (!user) {
      throw new ValidationError(`Пользователь с ID ${user_id} не найден`);
    }

    const category = await Category.findByPk(category_id);
    if (!category) {
      throw new ValidationError(`Категория с ID ${category_id} не найдена`);
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
  } catch (error) {
    console.error('Error creating post:', error);
    
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ 
        message: 'Внутренняя ошибка сервера',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
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
