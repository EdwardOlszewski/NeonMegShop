// Dependencies
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { login } from '../actions/userActions'
// Components
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

const LoginScreen = ({ location, history }) => {
  // Assign useDispatch hook
  const dispatch = useDispatch()

  // Get the redirect from the URL
  const redirect = location.search ? location.search.split('=')[1] : '/'

  // Create stateful values and functions
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  // Pull data from the redux store
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  // Function  called on submit
  const submitHandler = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setMessage('Must fill out entire form.')
    } else {
      dispatch(login(email, password))
    }
  }

  // useEffect hook
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  return (
    <FormContainer>
      <Meta title={'Login'} />
      <div style={{ marginTop: '3rem' }}></div>
      <Card className='card-content'>
        <h1>Sign In</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='btn'>
            Sign In
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link
              className='links'
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Col>
        </Row>
      </Card>
    </FormContainer>
  )
}

export default LoginScreen
