import { Sequelize } from 'sequelize-typescript'
import { User } from './models/User'
import { Post } from './models/Post'
import { Category } from './models/Category'
import { Comment } from './models/Comment'
import { Theme } from './models/Theme'
import { Reaction } from './models/Reaction'
import { config } from './config'

console.info('Database connection config:', config.postgres)

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.postgres.host,
  port: config.postgres.port,
  username: config.postgres.username,
  password: config.postgres.password,
  database: config.postgres.database,
  models: [User, Post, Category, Comment, Theme, Reaction],
})

export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    console.info('Attempting to connect to database with config:', {
      ...config.postgres,
      password: '***',
    })
    await sequelize.authenticate()
    console.info('Database connection established successfully')
    return true
  } catch (error: unknown) {
    console.error('Database connection error:', error)
    console.error(
      'Error details:',
      error instanceof Error
        ? {
            message: error.message,
            stack: error.stack,
            name: error.name,
          }
        : 'Unknown error type'
    )
    process.exit(1)
    return false
  }
}
