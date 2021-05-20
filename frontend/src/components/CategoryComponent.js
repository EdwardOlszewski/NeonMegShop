// Dependencies
import React, { useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

// Components
import { Form, Nav, Navbar } from 'react-bootstrap'

const Catagories = ({ history }) => {
  // Create stateful values and functions
  const [keyword] = useState('')

  // Function called on submit
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Navbar
        className='categories-div'
        variant='dark'
        expand='lg'
        collapseOnSelect
      >
        <Nav className='mr-auto'>
          <Navbar.Toggle aria-controls='basic-navbar-nav'>
            <p className='down-arrow'>
              <i class='fas fa-chevron-down'></i>
            </p>
          </Navbar.Toggle>
        </Nav>

        <Navbar.Collapse id='basic-navbar-nav'>
          <LinkContainer
            to='/shop'
            className='cat-container'
            activeClassName='activeButtons'
          >
            <Nav.Link className='cat-btn'>All</Nav.Link>
          </LinkContainer>

          <LinkContainer to='/search/pillow' activeClassName='activeButtons'>
            <Nav.Link className='cat-btn'>Pillow</Nav.Link>
          </LinkContainer>

          <LinkContainer to='/search/felt' activeClassName='activeButtons'>
            <Nav.Link className='cat-btn'>Felt</Nav.Link>
          </LinkContainer>

          <LinkContainer to='/search/painting' activeClassName='activeButtons'>
            <Nav.Link className='cat-btn'>Painting</Nav.Link>
          </LinkContainer>

          <LinkContainer to='/search/beaded' activeClassName='activeButtons'>
            <Nav.Link className='cat-btn'>Bead</Nav.Link>
          </LinkContainer>

          <LinkContainer to='/search/Resin' activeClassName='activeButtons'>
            <Nav.Link className='cat-btn'>Resin</Nav.Link>
          </LinkContainer>
        </Navbar.Collapse>
      </Navbar>
    </Form>
  )
}

export default Catagories
