import asyncHandler from 'express-async-handler'
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
import DateFormat from './DateFormat.js'

dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendRegisterEmail = asyncHandler(async (req, res) => {
  const { userName, userEmail } = req.body

  const msg = {
    from: {
      email: 'support@neonmegsshop.com',
    },
    personalizations: [
      {
        to: [
          {
            email: userEmail,
          },
        ],
        dynamic_template_data: {
          name: userName,
          receipt: true,
        },
      },
    ],
    template_id: process.env.REGISTER_TEMP_ID,
  }

  sgMail.send(msg, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log('success')
    }
  })
})

const sendReceiptEmail = asyncHandler(async (req, res) => {
  const { userName, userEmail, order } = req.body
  const orderItems = order.orderItems
  const orderDate = DateFormat(order.createdAt)

  const msg = {
    from: {
      email: 'support@neonmegsshop.com',
    },
    personalizations: [
      {
        to: [
          {
            email: userEmail,
          },
        ],
        dynamic_template_data: {
          name: userName,
          email: userEmail,
          date: orderDate,
          streetAddress: order.shippingAddress.address,
          cityAddress:
            order.shippingAddress.city +
            ' ' +
            order.shippingAddress.state +
            ', ' +
            order.shippingAddress.postalCode,
          itemTotalPrice: (Math.round(order.itemsPrice * 100) / 100).toFixed(2),
          orderTaxPrice: (Math.round(order.taxPrice * 100) / 100).toFixed(2),
          orderTotal: (Math.round(order.totalPrice * 100) / 100).toFixed(2),
          orderNumber: order._id,
          orderLink: `https://www.neonmegsshop.com/order/${order._id}`,
          items: { orderItems },
          receipt: true,
        },
      },
    ],
    template_id: process.env.RECEIPT_TEMP_ID,
  }

  sgMail.send(msg, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log('success')
    }
  })
})

export { sendRegisterEmail, sendReceiptEmail }
