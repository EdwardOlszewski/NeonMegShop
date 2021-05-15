// Dependencies
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { saveShippingAddress } from '../actions/cartActions'
// Components
import { Form, Button, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import Meta from '../components/Meta'

const ShippingScreen = ({ history }) => {
  // Assign useDispatch hook
  const dispatch = useDispatch()

  // Pull data from the redux store
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  // Create stateful values and functions
  const [address, setAddress] = useState(shippingAddress.address)
  const [state, setState] = useState(shippingAddress.state)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  // Function called on Submit
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country, state }))
    history.push('/placeorder')
  }

  return (
    <div className='checkout-content'>
      <Meta title={'Shipping'} />
      <CheckoutSteps step1 step2 />

      <Card className='card-content' style={{ marginTop: '1rem' }}>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter address'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter city'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='state'>
            <Form.Label>State</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter state'
              value={state}
              required
              onChange={(e) => setState(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter postal code'
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter country'
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default ShippingScreen
