import mongoose from 'mongoose'

const requestSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Request = mongoose.model('Request', requestSchema)

export default Request
