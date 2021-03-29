import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import CategoryComponent from '../components/CategoryComponent'

import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <div className='home-screen'>
      <Meta />
      <h1>Welcome To My Shop!</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='info'>
          <Row>
            <Col xl={2} style={{ marginBottom: '2rem' }}>
              <Card className='categories-card '>
                <CategoryComponent />
              </Card>
            </Col>

            <Col xl={10}>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} xs={6} sm={6} md={4} lg={3} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <div className='page-card'>
                <Paginate
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ''}
                />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

export default HomeScreen
