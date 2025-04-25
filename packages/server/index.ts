import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { checkDatabaseConnection } from './db'
import postRouter from './routes/posts'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

const startServer = async () => {
  try {
    const isConnected = checkDatabaseConnection()
    if (!isConnected) {
      throw new Error('Database connection failed')
    }

    app.use('/api', postRouter)

    app.get('/', (_, res) => {
      res.json('👋 Howdy from the server :)')
    })

    app.listen(port, () => {
      console.info(`  ➜ 🎸 Server is listening on port: ${port}`)
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

startServer()
