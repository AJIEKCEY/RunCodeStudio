import { Sequelize } from 'sequelize-typescript'
import path from 'path'
import dotenv from 'dotenv'
import { User } from './models/User'
import { Post } from './models/Post'
import { Category } from './models/Categories'

dotenv.config({ path: path.join(__dirname, '../../.env') })

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: String(POSTGRES_PASSWORD),
  database: POSTGRES_DB,
  models: [User, Post, Category],
})

export const checkDatabaseConnection = async () => {
  try {
    await sequelize.authenticate()
    return true
  } catch (error) {
    return false
  }
}
