// Dependencies
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { getOrderDetails, deliverOrder } from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'
// Components
import { Row, Col, ListGroup, Image, Card, Button, Form } from 'react-bootstrap'
import DateFormat from '../components/DateFormat'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

const OrderScreen = ({ match, history }) => {
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  // get the orderID from th URL
  const orderId = match.params.id

  // Pull data from the redux store
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error, success } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    // Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  // useEffect hook to do something after render
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else if (
      !order ||
      successPay ||
      successDeliver ||
      order._id !== orderId
    ) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    }
  }, [
    dispatch,
    orderId,
    successPay,
    successDeliver,
    order,
    history,
    userInfo,
    success,
  ])

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
    history.push('/admin/orderlist')
  }

  return (
    <>
      <Meta title='Order Summary' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='content-div'>
          <Row>
            <Col sm={12} md={12} lg={12} xl={7}>
              <Card style={{ border: 'none' }}>
                <ListGroup>
                  <ListGroup.Item
                    className='bg-color'
                    style={{ border: 'none' }}
                  >
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? (
                      <Message>Order is empty</Message>
                    ) : (
                      <ListGroup variant='flush'>
                        <ListGroup.Item className='bg-color'></ListGroup.Item>
                        {order.orderItems.map((item, index) => (
                          <ListGroup.Item key={index} className='bg-color'>
                            <Row>
                              <Col md={2}>
                                <Image
                                  className='cart-img'
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                />
                              </Col>

                              <Col xs={12} md={5} style={{ marginTop: '3rem' }}>
                                <Link
                                  className='links'
                                  to={`/product/${item.product}`}
                                  style={{ fontSize: '100%' }}
                                >
                                  {item.name}
                                </Link>
                              </Col>
                              <Col xs={12} md={5}>
                                <p
                                  style={{
                                    marginTop: '3rem',
                                    fontSize: '130%',
                                  }}
                                >
                                  {item.qty} x ${item.price} = $
                                  {item.qty * item.price}{' '}
                                </p>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                        <ListGroup.Item className='bg-color'></ListGroup.Item>
                      </ListGroup>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col
              sm={12}
              md={12}
              lg={8}
              xl={4}
              style={{ textAlign: 'center', margin: 'auto' }}
            >
              <Card style={{ border: 'none' }}>
                <ListGroup variant='flush' style={{ textAlign: 'center' }}>
                  <ListGroup.Item className='bg-color'>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item className='bg-color'>
                    <Row>
                      <Col>Order Number</Col>
                      <Col>{order._id}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='bg-color'>
                    <Row>
                      <Col>Items:</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='bg-color'>
                    <Row>
                      <Col>Tax:</Col>
                      <Col>
                        $ {(Math.round(order.taxPrice * 100) / 100).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='bg-color'>
                    <Row>
                      <Col>Total:</Col>
                      <Col>
                        ${(Math.round(order.totalPrice * 100) / 100).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className='bg-color'
                    style={{ borderBottom: 'none' }}
                  >
                    {order.isPaid ? (
                      <Message variant='success'>
                        Paid on: {' ' + DateFormat(order.paidAt)}
                      </Message>
                    ) : (
                      <Message variant='danger'>Not Paid</Message>
                    )}
                  </ListGroup.Item>

                  <ListGroup variant='flush' style={{ textAlign: 'center' }}>
                    <ListGroup.Item className='bg-color'>
                      <h2>Shipping</h2>
                    </ListGroup.Item>
                    <ListGroup.Item className='bg-color'>
                      <Row>
                        <Col>Name:</Col>
                        <Col>{order.billingDetails.name}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className='bg-color'>
                      <Row>
                        <Col>Email:</Col>
                        <Col>{order.user.email}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className='bg-color'>
                      <Row>
                        <Col>Address:</Col>
                        <Col>
                          {order.shippingAddress.address},{' '}
                          {order.shippingAddress.city}{' '}
                          {order.shippingAddress.postalCode},{' '}
                          {order.shippingAddress.country}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className='bg-color'>
                      {order.isDelivered ? (
                        <Message variant='success'>
                          Shipped on: {' ' + DateFormat(order.deliveredAt)}
                        </Message>
                      ) : (
                        <Message variant='danger'>Not Shipped Yet</Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>

                  {!order.isPaid && (
                    <ListGroup.Item className='bg-color'>
                      {loadingPay && <Loader />}
                      {null ? <Loader /> : <></>}
                    </ListGroup.Item>
                  )}
                  {loadingDeliver && <Loader />}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item className='bg-color'>
                        <Button
                          type='button'
                          className='btn btn-block'
                          onClick={deliverHandler}
                        >
                          Mark As Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  )
}

export default OrderScreen
