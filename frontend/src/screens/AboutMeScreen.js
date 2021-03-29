import React from 'react'
import { Card, Row, Col, Image, Container } from 'react-bootstrap'
import profilePic1 from '../images/profile.jpg'

const AboutMeScreen = () => {
  return (
    <Container>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={5}
          xl={5}
          style={{ marginTop: '1rem' }}
        >
          <Card className='profile-card'>
            <Image className='profile-img' src={profilePic1}></Image>
          </Card>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={7}
          xl={7}
          style={{ marginTop: '1rem' }}
        >
          <Card className='about-card'>
            <Card.Title style={{ marginTop: '1rem' }}>
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
                  <i className='fas fa-envelope'></i>
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AboutMeScreen
