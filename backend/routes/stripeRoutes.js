import express from 'express'
const router = express.Router()

import { stripePromise } from '../controllers/stripeController.js'

router.route('/').get(stripePromise)

export default router
