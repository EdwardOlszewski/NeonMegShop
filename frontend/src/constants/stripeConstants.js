import { loadStripe } from '@stripe/stripe-js'

//export const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY)
export const stripePromise = loadStripe(
  'pk_test_51IaSdEJECzucY44Prq1lxvGTUqFPxOFFHqZTz3GaGHewMOXaJiltJBKDUHWVcmt2IIzeSccBSrSGkt0OHcd8nkpE00uvRd3wrF'
)
