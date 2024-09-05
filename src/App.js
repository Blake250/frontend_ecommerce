
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Contact, Login, Register, Reset, OrderPage } from './components';
import { Footer, Header } from './components';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import ErrorPage from './components/ErrorPage';

import PageMenu from './components/page/PageMenu';
import Profile from './components/profile/Profile';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getLoginStatus, getUser } from './redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import ViewProducts from './components/admin/viewProducts/ViewProducts';
import Admin from './components/authCheck/Admin';
import AdminOnlyRoute from './components/hiddenLinks/AdminOnlyRoute';
import Product from './components/page/shop/Product';
import ProductDetails from './components/product/productDetails/ProductDetails';
import Cart from './pages/cart/Cart';
import CheckoutDetails from './components/checkOut/CheckoutDetails';
import Checkout from './components/checkOut/checkout/Checkout';
import CheckoutSuccess from './components/checkOut/CheckoutSuccess';
import OrderDetails from './pages/userOrder/OrderDetails';
import Order from './pages/userOrder/Order';
import CheckoutWithFW from './components/checkOut/CheckoutWithFW';
import CheckoutPayPal from './components/checkOut/CheckoutPayPal';
import Wallet from './components/page/wallet/Wallet';
import CheckoutWallet from './components/checkOut/checkout/CheckoutWallet';
import Wishlist from './components/page/wishlist/Wishlist';

const AppContainer = styled.div`
  position: relative;
`
const HeaderContainer = styled.div`
  position: sticky;
  width: 100%;
  z-index: 999;
`;

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;
`;

const MainContent = styled.div`
  padding-top: 80px;
  position: relative;
`;

function App() {
  axios.defaults.withCredentials = true;
  const { user, isLoggedIn } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [isLoggedIn, user, dispatch]);


  

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  return (
    <Router  >
      <AppContainer>
        <HeaderContainer>
          <ToastContainer />
          <Header />
        </HeaderContainer>
        <MainContent>
          <Routes>
            {/* Public Routes */}
           
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/page" element={<PageMenu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/view-products" element={<ViewProducts />} />

            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/order-history" element={<Order/>} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
            {/* Private Routes */}
        
              
             <Route path="/" exact element={<Home />} /> 
             <Route path="/contact" element={<Contact />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/shop" element={<Product />} />
              <Route path="/checkout-details" element={<CheckoutDetails />} />
              <Route path="/checkout-stripe" element={<Checkout/>} />
              <Route path="/checkout-wave" element={<CheckoutWithFW/>} />
              <Route path="/checkout-paypal" element={<CheckoutPayPal/>} />
              <Route path="/checkout-wallet" element={<CheckoutWallet/>} />
              <Route path="/wallet" element={<Wallet/>} />
              <Route path="/wishlist" element={<Wishlist/>} />
           
             
             
              <Route path="/admin/*" element={
                  <AdminOnlyRoute>
                <Admin />
                </AdminOnlyRoute>
                
                } />
              

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </MainContent>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </AppContainer>
    </Router>
  );
}

export default App;





