import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import postRouter from './routes/posts'
import commentsRouter from './routes/comments'
import themeRouter from './routes/theme'
import reactionRouter from './routes/reaction'
import { sanitizeInput } from './middlewares/sanitize'
import { errorHandler } from './middlewares/error'
import { checkDatabaseConnection } from './db'

dotenv.config()
const port = Number(process.env.SERVER_PORT) || 3001

const startServer = async () => {
  try {
    const isConnected = checkDatabaseConnection()
    if (!isConnected) {
      throw new Error('Database connection failed')
    }

    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(sanitizeInput)

    app.use('/api/v1', postRouter)
    app.use('/api/v1', commentsRouter)
    app.use('/api/v1', themeRouter)
    app.use('/api/v1', reactionRouter)

    app.use(errorHandler).listen(port, () => {
      console.info(`  ➜ 🎸 Server is listening on port: ${port}`)
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

startServer()
