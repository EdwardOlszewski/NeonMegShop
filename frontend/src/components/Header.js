// Dependencies
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
// Actions
import { logout } from '../actions/userActions'
// Components
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap'
import logoIMG from '../images/logo.png'

const Header = () => {
  // Assign useDispatch hook
  const dispatch = useDispatch()

  // Pull data from the redux store
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // Function called on submit
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar className='nav' variant='dark' expand='lg' collapseOnSelect>
        <div className='container'>
          <LinkContainer to='/' className='desktop-head'>
            <Navbar.Brand>
              <Image src={logoIMG}></Image> NeonMegs Shop
            </Navbar.Brand>
          </LinkContainer>

          <LinkContainer to='/' className='mobile-head'>
            <Navbar.Brand>
              <Image src={logoIMG}></Image>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/shop'>
                <Nav.Link>
                  <i className='fas fa-store'></i> Shop
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.firstName} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  )
}

export default Header
