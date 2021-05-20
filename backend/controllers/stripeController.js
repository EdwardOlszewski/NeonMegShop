import asyncHandler from 'express-async-handler'

import dotenv from 'dotenv'

dotenv.config()

// @desc    get stripe constant
// @route   GET /api/orders/stripe
// @access  Private
const stripePromise = asyncHandler(async (req, res) => {
  const stripeConstant = process.env.STRIPE_CONSTANT

  if (stripeConstant) {
    res.json(stripeConstant)
  } else {
    res.status(404)
    throw new Error('stripe constant not found')
  }
})

export { stripePromise }
