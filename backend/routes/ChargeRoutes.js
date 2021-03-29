import express from 'express'
import createCharge from '../services/stripe-charge.js'
const router = express.Router()

router.route('/').post(createCharge)

export default router
