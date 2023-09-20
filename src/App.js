import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Contact, Login, Register, Reset, OrderPage } from './components';
import { Footer, Header } from './components';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './components/PrivateRoutes';
import { ToastContainer } from 'react-toastify';
import ErrorPage from './components/ErrorPage';

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

             {/* Private Routes */}
            <Route element={<PrivateRoutes />}>
           

              <Route path="/home" element={<Home />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/contact" element={<Contact />} />
              
            </Route>
    
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
