import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Container,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'
import { createRequest } from '../actions/requestActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'
import ReviewModal from '../components/ReviewModal'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const ID = match.params.id

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (
      !product._id ||
      product._id !== match.params.id ||
      successProductReview
    ) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, product._id, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const requestItemHandler = () => {
    if (userInfo) {
      dispatch(createRequest(product.name))
    } else {
      history.push('/login')
    }
  }

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Card className='card-content'>
            <Row>
              <Col sm={12} lg={5}>
                <Image
                  className='product-image'
                  src={product.image}
                  alt={product.name}
                  fluid
                />
              </Col>

              <Col
                md={12}
                lg={5}
                style={{ margin: 'auto', textAlign: 'center' }}
              >
                <ListGroup variant='flush'>
                  <ListGroup.Item className='bg-color'>
                    <h5>{product.name}</h5>
                  </ListGroup.Item>
                  <ListGroup.Item className='bg-color'>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews}  ${' '} reviews`}
                    />
                  </ListGroup.Item>

                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item className='bg-color'>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>
                              $
                              {(Math.round(product.price * 100) / 100).toFixed(
                                2
                              )}
                            </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item className='bg-color'>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0 ? (
                              <strong>In Stock</strong>
                            ) : (
                              <strong>Out Of Stock</strong>
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item className='bg-color'>
                        <Row>
                          <Col sm={6} xl={6}>
                            Description:
                          </Col>
                          <Col sm={6}>
                            <strong>{product.description}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {product.countInStock <= 0 ? (
                        <ListGroup.Item className='bg-color'>
                          <Button
                            onClick={requestItemHandler}
                            className='btn-block'
                            type='button'
                            disabled
                          >
                            Out Of Stock!
                          </Button>
                        </ListGroup.Item>
                      ) : (
                        <>
                          <ListGroup.Item className='bg-color'>
                            <Row>
                              <Col style={{ marginTop: '8px' }}>Qty:</Col>
                              <Col>
                                <Form.Control
                                  as='select'
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                >
                                  {[...Array(product.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                              </Col>
                            </Row>
                          </ListGroup.Item>

                          <ListGroup.Item className='bg-color'>
                            <Button
                              onClick={addToCartHandler}
                              className='bt'
                              style={{ width: '100%' }}
                              type='button'
                              disabled={product.countInStock === 0}
                            >
                              Add To Cart
                            </Button>
                          </ListGroup.Item>
                        </>
                      )}
                    </ListGroup>
                  </Card>
                </ListGroup>
              </Col>
            </Row>
          </Card>

          <Row style={{ marginBottom: '2rem', marginTop: '1rem' }}>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Card className='card-content'>
                <h2>Reviews</h2>

                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                  <ListGroup.Item
                    style={{
                      backgroundColor: 'rgb(255, 208, 249)',
                      border: 'none',
                      marginBottom: '-13px',
                    }}
                  ></ListGroup.Item>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id} className='review-txt'>
                      <Rating value={review.rating} />

                      <p>{review.comment}</p>
                      <p>
                        written by {review.name},{' '}
                        {review.createdAt.substring(0, 10)}
                      </p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item
                    style={{
                      backgroundColor: 'rgb(255, 208, 249)',
                      border: 'none',
                      marginTop: '2px',
                    }}
                  ></ListGroup.Item>
                </ListGroup>

                <ListGroup variant='flush' style={{ border: 'none' }}>
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <ReviewModal ID={ID} />
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default ProductScreen

/*

     <Row>
            <Col md={1} xl={2}></Col>
            <Col sm={12} md={12} lg={12} xl={9} style={{ marginTop: '3rem' }}>
              <ListGroup>
                <ListGroup.Item
                  style={{ marginTop: '2rem' }}
                  className='bg-color'
                >
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <ReviewModal ID={ID} />
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>

              <Card className='card-content'>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id} className='bg-color'>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
            <Col md={1} xl={2}></Col>
          </Row>


*/
