import { Sequelize } from 'sequelize-typescript'
import path from 'path'
import dotenv from 'dotenv'
import { User } from './models/User'
import { Post } from './models/Post'
import { Category } from './models/Category'
import { Comment } from './models/Comment'
import { Theme } from './models/Theme'

dotenv.config({ path: path.join(__dirname, '../../.env') })

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: String(POSTGRES_PASSWORD),
  database: POSTGRES_DB,
  models: [User, Post, Category, Comment, Theme],
})

export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate()
    return true
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Ошибка в БД:', err.message)
    } else {
      console.error('Неизвестная ошибка в БД:', err)
    }
    return false
  }
}
