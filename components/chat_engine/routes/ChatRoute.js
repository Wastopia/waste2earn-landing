import express from 'express'
import { chatBot } from '../bots/ChatBot.js'

const router = express.Router()

router.post('/chat', chatBot)

export default router