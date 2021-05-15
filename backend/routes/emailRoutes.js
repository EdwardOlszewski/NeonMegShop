import express from 'express'
//import { sendRegisterEmail, sendReceiptEmail } from '../services/email-send.js'
import { sendRegisterEmail, sendReceiptEmail } from '../services/sendinBlue.js'
const router = express.Router()

//router.route('/register').post(sendRegisterEmail)
router.route('/register').post(sendRegisterEmail)
//router.route('/receipt').post(sendReceiptEmail)
router.route('/receipt').post(sendReceiptEmail)

export default router
