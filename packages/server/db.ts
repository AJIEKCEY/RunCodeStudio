import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

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
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  models: [
    /* Здесь можно указать модели, если используете `sequelize-typescript` */
  ],
})

// Проверка подключения
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate()
    return true
  } catch (error) {
    return false
  }
}
