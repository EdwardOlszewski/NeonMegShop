import express from 'express'
const router = express.Router()
import { createRequest } from '../controllers/requestController.js'

router.route('/').post(createRequest)

export default router
