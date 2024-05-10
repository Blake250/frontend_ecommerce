import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Contact, Login, Register, Reset, OrderPage,Admin} from './components';
import { Footer, Header } from './components';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './components/PrivateRoutes';
import { ToastContainer } from 'react-toastify';
import ErrorPage from './components/ErrorPage';
import HomeInfo from './components/homeBox/HomeInfo';
import PageMenu from './components/page/PageMenu';
import Profile from './components/profile/Profile';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getLoginStatus, getUser } from './redux/slice/authSlice';
import { useDispatch } from 'react-redux';

const AppContainer = styled.div`
  position: relative;
`;

const HeaderContainer = styled.div`
  position: sticky;
  width: 100%;
  z-index: 2;
`;

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 2;
`;

function App() {
  axios.defaults.withCredentials =  true;
  const {user, isLoggedIn} = useSelector((state)=> state?.auth)
 // console.log(`this is the ${user} `)
  const dispatch = useDispatch()


/*useEffect(() => {
  if(isLoggedIn && user === null ){ 
    dispatch(getUser())
  }

}, [isLoggedIn, user, dispatch])*/
useEffect(()=>{
dispatch(getLoginStatus())

},[dispatch,])

  
  return (
    <Router>
      <AppContainer>
        <HeaderContainer>
          <ToastContainer />
          <Header />
        </HeaderContainer>
        <MainContent>
          <Routes>
            {/* Public Routes */}
            <Route path="/"  element={<Login/>} />
            <Route path="/register"  element={<Register />} />
            <Route path="/reset"  element={<Reset />} />
            <Route path="/page" element={<PageMenu />} />

             {/* Private Routes */}
            <Route element={<PrivateRoutes />}>       
              </Route> 
            
           
           
           
              <Route path="/home" element={<> <Home />  </>} />
             
              <Route path="/order" element={<OrderPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin/*" element={<Admin />} />
         
         
            {/* Catch-all Route */}
            <Route path="/*" element={<ErrorPage />} />
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

const MainContent = styled.div`
  padding-top: 80px;
  position: relative;
`;
