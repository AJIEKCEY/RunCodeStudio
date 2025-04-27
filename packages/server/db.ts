import { Sequelize } from 'sequelize-typescript'
import path from 'path'
import dotenv from 'dotenv'
import { User } from './models/User'
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
  models: [User, Theme],
})

export async function checkDatabaseConnection(): Promise<void> {
  try {
    await sequelize.authenticate()
  } catch (err) {
    console.error('Нет подключения к БД:', err)
    process.exit(1)
  }
}
