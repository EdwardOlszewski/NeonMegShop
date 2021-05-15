import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_RESET,
} from '../constants/imageConstants'

export const uploadImageReducer = (state = { imageURL: [] }, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { loading: true, success: false }
    case UPLOAD_IMAGE_SUCCESS:
      return { loading: false, success: true, imageURL: action.payload }
    case UPLOAD_IMAGE_FAIL:
      return { loading: false, error: action.payload }
    case UPLOAD_IMAGE_RESET:
      return {}
    default:
      return state
  }
}
