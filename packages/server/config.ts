import dotenv from 'dotenv'
import path from 'path'

// Загружаем .env из корневой директории проекта
dotenv.config({ path: path.join(__dirname, '../../.env') })

export const config = {
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'postgres',
  },
}
