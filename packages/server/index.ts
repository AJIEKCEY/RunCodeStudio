import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { checkDatabaseConnection } from './db'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

checkDatabaseConnection()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.info(`  ➜ 🎸 Server is listening on port: ${port}`)
})
