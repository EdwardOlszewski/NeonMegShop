import React from 'react'
import { useDispatch } from 'react-redux'
import { getStripePromise } from '../actions/orderActions'
import { loadStripe } from '@stripe/stripe-js'
