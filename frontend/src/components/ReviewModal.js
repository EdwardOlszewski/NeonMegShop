// Dependencies
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { createProductReview } from '../actions/productActions'
//Components
import { Modal, Button, Form } from 'react-bootstrap'
import Loader from '../components/Loader'

const ReviewModal = ({ ID, match }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // Create stateful values and functions
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Pull data from the redux store
  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { success, loading } = productReviewCreate

  // Function called on submit
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(ID, {
        rating,
        comment,
      })
    )
    setShow(false)
  }

  useEffect(() => {
    if (success) {
      setRating(0)
      setComment('')
    }
  }, [dispatch, success])

  return (
    <div style={{ marginTop: '1rem' }}>
      <Button className='review-button' onClick={handleShow}>
        Create Review {'>'}
      </Button>

      <div className='line'></div>

      <Modal
        className='review-modal'
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Create Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='rating'>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as='select'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value=''>Select...</option>
                    <option value='1'>1 - Poor</option>
                    <option value='2'>2 - Fair</option>
                    <option value='3'>3 - Good</option>
                    <option value='4'>4 - Very Good</option>
                    <option value='5'>5 - Excellent</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='comment'>
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as='textarea'
                    row='3'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button
                  style={{ width: '100%' }}
                  disabled={loading}
                  type='submit'
                  variant='primary'
                >
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  )
}

export default ReviewModal
