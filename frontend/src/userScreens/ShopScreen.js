// Dependencies
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { listProducts } from '../actions/productActions'
//Components
import { Row, Col, Card } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import CategoryComponent from '../components/CategoryComponent'
import Meta from '../components/Meta'

const ShopScreen = ({ match }) => {
  // Assign useDispatch hook
  const dispatch = useDispatch()

  // Get keyword from the URL
  const keyword = match.params.keyword

  // Get pagenumber from the URL
  const pageNumber = match.params.pageNumber || 1

  // Pull data from the redux store
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  // useEffect hook
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <div className='home-screen'>
      <Meta title={'Shop'} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='info'>
          <Row>
            <Col xl={12} style={{ marginBottom: '1rem' }}>
              <Card className='categories-card '>
                <CategoryComponent />
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={12}>
              <Row noGutters>
                {products.map((product) => (
                  <Col key={product._id} xs={6} sm={6} md={4} lg={3} xl={2}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              {pages > 1 ? (
                <Card className='page-card' style={{ marginTop: '10px' }}>
                  <Paginate
                    pages={pages}
                    page={page}
                    keyword={keyword ? keyword : ''}
                  />
                </Card>
              ) : null}
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

export default ShopScreen
