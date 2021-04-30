import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row style={{ marginTop: '1rem' }}>
      {cartItems.length === 0 ? (
        <Container>
          <Col style={{ marginBottom: '2rem' }}>
            <Card className='card-content'>
              <Message>
                Your cart is empty <Link to='/shop'>Go Back</Link>
              </Message>
            </Card>
          </Col>
        </Container>
      ) : (
        <>
          <Col md={8}>
            <ListGroup
              variant='flush'
              style={{ borderRadius: '2px', marginBottom: '1rem' }}
            >
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.product}
                  style={{ backgroundColor: 'rgb(255, 208, 249)' }}
                >
                  <Row>
                    <Col xs={12} md={2}>
                      <Image
                        className='cart-img'
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col xs={3} md={3}>
                      <div className='space'></div>
                      <Link
                        className='links'
                        style={{ fontSize: '120%' }}
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </Col>

                    <Col xs={2} md={2}>
                      <div className='space'></div>
                      <p style={{ fontSize: '120%', color: 'black' }}>
                        ${item.price}
                      </p>
                    </Col>

                    <Col xs={4} md={3}>
                      <div className='space'></div>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col xs={2} md={2}>
                      <div className='space'></div>
                      <Button
                        className='btn'
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush' style={{ borderRadius: '2px' }}>
                <ListGroup.Item
                  style={{
                    backgroundColor: 'rgb(255, 208, 249)',
                  }}
                >
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h2>
                  <p style={{ fontSize: '150%', color: 'black' }}>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ backgroundColor: 'rgb(255, 208, 249)' }}
                >
                  <Button
                    type='button'
                    className='btn'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </>
      )}
    </Row>
  )
}

export default CartScreen

/*

{cartItems.length === 0 ? (
          <div style={{ marginBottom: '2rem' }}>
            <Card className='card-content'>
              <Message>
                Your cart is empty <Link to='/shop'>Go Back</Link>
              </Message>
            </Card>
          </div>
        ) : (


          */
