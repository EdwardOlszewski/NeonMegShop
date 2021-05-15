// Dependencies
import React from 'react'
// Components
import { Card, Row, Col, Image, Container } from 'react-bootstrap'
import Meta from '../components/Meta'
import profilePic1 from '../images/profile.jpg'

const AboutMeScreen = () => {
  return (
    <Container>
      <Meta title={'Home'} />
      <Card className='card-content'>
        <Row className='justify-content-md-center'>
          <Col xs={8} sm={7} md={5} lg={4} xl={4} className='img-col'>
            <Image className='profile-img' src={profilePic1}></Image>
          </Col>
          <Col xs={12} sm={12} md={7} lg={7} xl={7}>
            <Card.Body className='about-text'>
              <p>
                Hello! My name is Megan. I'm a mom and a lover of all things
                art. Art is 100% my therapy. I enjoy painting, working with
                felts and fabrics, as well as perler beading.
              </p>
              <br />
              <p>
                Having cystic fibrosis I would like to share the{' '}
                <a href='https://www.cff.org'>
                  Cystic Fibrosis Foundation Website
                </a>{' '}
                to help educate about what cystic fibrosis is as well as share a
                great organization for donations.
              </p>
              <br />

              <p>
                Feel free to browse my shop and see what I have to offer. For
                any request please message me at one of my links.
              </p>
              <div className='about-links'>
                <a href='https://www.instagram.com/neonmegsshop/'>
                  <i className='fab fa-instagram-square'></i>
                </a>

                <a href='https://www.facebook.com/groups/761561951153974'>
                  <i className='fab fa-facebook-square'></i>
                </a>

                <a href='/'>
                  <i className='fas fa-envelope-square'></i>
                </a>
              </div>
              <br />
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}

export default AboutMeScreen
