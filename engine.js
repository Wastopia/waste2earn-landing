import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import ChatRoute from './components/chat_engine/routes/ChatRoute.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }))

app.use(helmet())

dotenv.config({ path: "./.env" })

app.use(express.json())

app.use('/', ChatRoute)

const port = process.env.PORT || 3500

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})