// Dependencies
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { listProductDetails } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
// Components
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
import ReviewModal from '../components/ReviewModal'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import DateFormat from '../components/DateFormat'
import Meta from '../components/Meta'

const ProductScreen = ({ history, match }) => {
  // Assign useDispatch hook
  const dispatch = useDispatch()

  // Get poduct ID from the URL
  const ID = match.params.id

  // Create stateful values and functions
  const [qty, setQty] = useState(1)

  // Pull data from the redux store
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

  // Function called on submit
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  // useEffect hook
  useEffect(() => {
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
    } else if (successProductReview) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, product._id, successProductReview])

  return (
    <Container>
      <Meta title={product.name} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
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
                          <Button className='btn-block' type='button' disabled>
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
                        written by {review.name}, {DateFormat(review.createdAt)}
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
