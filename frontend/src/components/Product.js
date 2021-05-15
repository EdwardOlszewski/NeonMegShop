// Dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
// Components
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <>
      {product.isPublished ? (
        <Card className='product'>
          <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} style={{ padding: '1rem' }} />
          </Link>

          <Card.Body>
            <Link to={`/product/${product._id}`}>
              <Card.Title className='productTitle'>
                <strong>{product.name}</strong>
              </Card.Title>
            </Link>

            <Rating value={product.rating} />

            <Card.Text className='productPrice'>${product.price}</Card.Text>
          </Card.Body>
        </Card>
      ) : null}
    </>
  )
}

export default Product
