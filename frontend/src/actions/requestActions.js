import axios from 'axios'
import {
  REQUEST_CREATE_REQUEST,
  REQUEST_CREATE_SUCCESS,
  REQUEST_CREATE_FAIL,
  REQUEST_CHECK_REQUEST,
  REQUEST_CHECK_SUCCESS,
  REQUEST_CHECK_FAIL,
} from '../constants/requestConstants'

export const createRequest = (productName) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `/api/requests`,
      { productName, userInfo },
      config
    )

    dispatch({
      type: REQUEST_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: REQUEST_CREATE_FAIL,
      payload: message,
    })
  }
}

export const checkRequested = (productID, userID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: REQUEST_CHECK_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      `/api/requests`,
      { productID },
      userID,
      config
    )

    dispatch({
      type: REQUEST_CHECK_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: REQUEST_CHECK_FAIL,
      payload: message,
    })
  }
}
