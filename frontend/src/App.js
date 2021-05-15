import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

//User Screens
import Header from './components/Header'
import Footer from './components/Footer'
import ShopScreen from './userScreens/ShopScreen'
import ProductScreen from './userScreens/ProductScreen'
import CartScreen from './userScreens/CartScreen'
import LoginScreen from './userScreens/LoginScreen'
import RegisterScreen from './userScreens/RegisterScreen'
import ProfileScreen from './userScreens/ProfileScreen'
import ShippingScreen from './userScreens/ShippingScreen'
import PaymentScreen from './userScreens/PaymentScreen'
import PlaceOrderScreen from './userScreens/PlaceOrderScreen'
import AboutScreen from './userScreens/AboutMeScreen'
import OrderScreen from './userScreens/OrderScreen'

//Admin Screens
import UserListScreen from './adminScreens/UserListScreen'
import UserEditScreen from './adminScreens/UserEditScreen'
import ProductListScreen from './adminScreens/ProductListScreen'
import ProductEditScreen from './adminScreens/ProductEditScreen'
import OrderListScreen from './adminScreens/OrderListScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <div className='mainContainer'>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment/:id' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/' component={AboutScreen} exact />
        </div>
        <div>
          <Route path='/search/:keyword' component={ShopScreen} exact />
          <Route path='/page/:pageNumber' component={ShopScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={ShopScreen}
            exact
          />
          <Route path='/shop' component={ShopScreen} exact />
        </div>
      </main>
      <Footer />
    </Router>
  )
}

export default App
