import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { checkDatabaseConnection } from './db'
import themeRouter from './routes/theme'

const app = express()
app.use(cors())
app.use(express.json())
const port = Number(process.env.SERVER_PORT) || 3001

checkDatabaseConnection()

app.use('/api/v1', themeRouter)

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.info(`Server is listening on port: ${port}`)
})
