import React, { useState } from 'react'
import { Form, ListGroupItem, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Catagories = ({ history }) => {
  const [keyword] = useState('')

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
      <div className='categories-div'>
        <LinkContainer to='/shop' activeClassName='activeButtons'>
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
      </div>
    </Form>
  )
}

export default Catagories

/*
<Card.Text>
                <Button
                  className='catagories-button'
                  type='submit'
                  name='all'
                  value=''
                  onClick={(e) => setKeyword(e.target.value)}
                >
                  All
                </Button>
              </Card.Text>
              */
