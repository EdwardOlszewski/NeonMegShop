import asyncHandler from 'express-async-handler'
import Request from '../models/requestsModel.js'

// @desc    Create a new request
// @route   POST /api/requests
// @access  Public
const createRequest = asyncHandler(async (req, res) => {
  const { productName, userInfo } = req.body

  const userName = userInfo.name
  const userEmail = userInfo.email

  const request = await Request.create({
    productName,
    userName,
    userEmail,
  })

  if (request) {
    res.status(201).json({
      _id: request._id,
      productName: request.productName,
      userEmail: request.userEmail,
      userName: request.userName,
    })
  } else {
    res.status(400)
    throw new Error('request not created')
  }
})

// @desc    check to see if already requested
// @route   GET /api/requests
// @access  Public
const checkRequest = asyncHandler(async (req, res) => {
  const { userEmail, productID } = req.body

  const request = await Request.find({
    params: [
      { field: 'userEmail', value: { userEmail } },
      { field: 'productID', value: { productID } },
    ],
  })

  if (request) {
    res.status(201).json({ message: 'true' })
  }
})

export { createRequest, checkRequest }
