import React from 'react'
import { Card, Row, Col, Image, Container } from 'react-bootstrap'
import profilePic1 from '../images/profile.jpg'

const AboutMeScreen = () => {
  return (
    <Container>
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
                <a href='/'>
                  <i className='fab fa-instagram-square'></i>
                </a>

                <a href='/'>
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

/*

<div className='about-screen'>
      <Row className='justify-content-md-center'>
        <Col xs={12} sm={12} md={6} lg={4} xl={4} style={{ marginTop: '1rem' }}>
          <Card className='card-content'>
            <Image className='profile-img' src={profilePic1}></Image>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6} lg={7} xl={7} style={{ marginTop: '1rem' }}>
          <Card className='card-content'>
            <Card.Title style={{ marginTop: '1rem', color: 'black' }}>
              Hello, my name is Megan.
            </Card.Title>
            <Card.Body className='about-text'>
              <h5>Who I am:</h5>
              <p>
                I am a 29 year old mother who has cystic fibrosis. I love to
                express myself through art.
              </p>

              <br />
              <br />

              <h5>What I do</h5>
              <p>
                I work with alot of different mediums. Right now my focus is on
                pearl beads, painting, pillows, and needle felting. Contact me
                below with requests!
              </p>

              <br />
              <br />

              <h5 style={{ textAlign: 'center', margin: 'auto' }}>
                Checkout My Links!
              </h5>

              <div className='about-links'>
                <a href='/'>
                  <i className='fab fa-instagram-square'></i>
                </a>

                <a href='/'>
                  <i className='fab fa-facebook-square'></i>
                </a>

                <a href='/'>
                  <i className='fas fa-envelope-square'></i>
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>


    */
