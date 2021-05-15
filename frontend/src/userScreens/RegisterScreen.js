// Dependencies
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { register } from '../actions/userActions'
import { sendRegisterEmail } from '../actions/emailActions'
// Components
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

const RegisterScreen = ({ location, history }) => {
  // Assign useDispatch hook
  const dispatch = useDispatch()

  // Get redirect from the URL
  const redirect = location.search ? location.search.split('=')[1] : '/'

  // Create stateful values and functions
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  // Pull data from the redux store
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, success, userInfo } = userRegister

  // Function called on submit
  const submitHandler = (e) => {
    e.preventDefault()
    if (!password || !firstName || !lastName || !email) {
      setMessage('Must fill out entire form.')
    } else if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(firstName, lastName, email, password))
    }
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
    if (success) {
      const name = userInfo.firstName + ' ' + userInfo.lastName
      const email = userInfo.email
      dispatch(sendRegisterEmail(name, email))
    }
  }, [history, userInfo, redirect, success])

  return (
    <FormContainer>
      <Meta title={'Register'} />
      <div style={{ marginTop: '3rem' }}></div>
      <Card className='card-content'>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='firstName'
              placeholder='Enter First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='last name'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='lastName'
              placeholder='Enter Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='btn'>
            Register
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Have an Account?{' '}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              className='links'
            >
              Login
            </Link>
          </Col>
        </Row>
      </Card>
    </FormContainer>
  )
}

export default RegisterScreen
