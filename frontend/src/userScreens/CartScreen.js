// Dependencies
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { addToCart, removeFromCart } from '../actions/cartActions'
// Components
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
import Meta from '../components/Meta'

const CartScreen = ({ match, location, history }) => {
  // Assign useDispatch hook
  const dispatch = useDispatch()

  // Get productID from the url
  const productId = match.params.id

  // Get qty from url
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  // Pull data from the redux store
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  // Function called when remove button clicked
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  // Function called on submit
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  // useEffect Hook
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return (
    <Row style={{ marginTop: '1rem' }}>
      <Meta title={'Cart'} />
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
          <Col md={12} lg={9}>
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

                    <Col xs={12} md={3}>
                      <div className='space'></div>
                      <Link
                        className='links'
                        style={{ fontSize: '100%' }}
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </Col>

                    <Col xs={3} md={2}>
                      <div className='space'></div>
                      <p style={{ fontSize: '120%', color: 'black' }}>
                        ${item.price}
                      </p>
                    </Col>

                    <Col xs={6} md={3}>
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
          <Col md={12} lg={3}>
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
