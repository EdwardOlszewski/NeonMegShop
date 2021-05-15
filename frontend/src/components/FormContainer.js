// Dependencies
import React from 'react'
// Components
import { Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
  return (
    <div>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={12} lg={6}>
          {children}
        </Col>
      </Row>
    </div>
  )
}

export default FormContainer
