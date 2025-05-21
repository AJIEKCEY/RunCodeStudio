import { User } from '../../models/User'
import { seeders } from '../seeders'
import path from 'path'
import { sequelize } from '../../db'
import '../../config' // Импортируем конфигурацию

// Инициализируем подключение к базе данных
sequelize
  .authenticate()
  .then(() => {
    console.info('Database connection established successfully')
    return seeders(path.join(__dirname, './users.json'), User)
  })
  .catch(error => {
    console.error('Database connection error:', error)
    process.exit(1)
  })
