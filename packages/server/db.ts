import { Sequelize } from 'sequelize-typescript'
import path from 'path'
import dotenv from 'dotenv'
import { User } from './models/User'
import { Post } from './models/Post'
import { Category } from './models/Category'
import { Comment } from './models/Comment'
import { Theme } from './models/Theme'

const envPath = path.join(__dirname, '../../.env')
console.info('Loading .env from:', envPath)
dotenv.config({ path: envPath })

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env

console.info('Database connection config:', {
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  database: POSTGRES_DB,
})

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: String(POSTGRES_PASSWORD),
  database: POSTGRES_DB,
  models: [User, Post, Category, Comment, Theme],
})

export const checkDatabaseConnection = async () => {
  try {
    console.info('Attempting to connect to database with config:', {
      host: POSTGRES_HOST,
      port: POSTGRES_PORT,
      username: POSTGRES_USER,
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD ? '***' : undefined
    })
    await sequelize.authenticate()
    console.info('Database connection established successfully')
    return true
  } catch (error: unknown) {
    console.error('Database connection error:', error)
    console.error('Error details:', error instanceof Error ? {
      message: error.message,
      stack: error.stack,
      name: error.name
    } : 'Unknown error type')
    process.exit(1)
    return false
  }
}
