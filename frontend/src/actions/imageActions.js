import axios from 'axios'
import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
} from '../constants/imageConstants'

export const uploadImage = (file) => async (dispatch, getState) => {
  const formData = new FormData()
  formData.append('image', file)
  try {
    dispatch({
      type: UPLOAD_IMAGE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const { data } = await axios.post('/api/upload', formData, config)

    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload: message,
    })
  }
}
