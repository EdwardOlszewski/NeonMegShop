import {
  STRIPE_CONSTANT_REQUEST,
  STRIPE_CONSTANT_SUCCESS,
  STRIPE_CONSTANT_FAIL,
} from '../constants/orderConstants'

export const sripeConstantReducer = (state = {}, action) => {
  switch (action.type) {
    case STRIPE_CONSTANT_REQUEST:
      return {
        loading: true,
      }
    case STRIPE_CONSTANT_SUCCESS:
      return {
        loading: false,
        success: true,
        stripe: action.payload,
      }
    case STRIPE_CONSTANT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
