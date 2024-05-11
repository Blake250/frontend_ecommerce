


import React from 'react'
import styled from 'styled-components'
import NavBar from '../adminHome/NavBar'
import AdminHome from '../adminHome/AdminHome'
import { Routes, Route } from 'react-router-dom'
import Categories from '../category/Categories'
import { NavLink } from 'react-router-dom'
import AddProduct from '../admin/addProduct/AddProduct'
import ViewProducts from '../admin/viewProducts/ViewProducts'
import EditProduct from '../admin/editProduct/EditProduct'
import Brand from '../addBrand/Brand'
import Coupon from '../admin/coupon/Coupon'
import Orders from '../admin/orders/Orders'
import DetailsOrders from '../admin/orders/DetailsOrders'


const Admin = () => {
  return (
    <Container>
      <Contain>
        <LeftContainer>
          <NavBar/>
        </LeftContainer>
        <RightContainer>
        
    
       <div>
            <Routes>
              <Route path='home' element={<AdminHome/>}  />  
              <Route path='category' element={<Categories/>}  />  
              <Route path='brand' element={<Brand/>}  />  
              <Route path='add-product' element={<AddProduct/>}  /> 
              <Route path='view-products' element={<ViewProducts/>} />
             
              <Route path='edit-product/:id' element={<EditProduct/>}  /> 
              <Route path='coupon' element={<Coupon/>} />
              <Route path='orders' element={<Orders/>} />
              <Route path='details-orders/:id' element={<DetailsOrders/>} />
             
              
           
            </Routes>
          </div >
    

        </RightContainer>
      </Contain>
    </Container>
  );
}

export default Admin

const Container = styled.div`
width:100%;
height:100%;

@keyframes slide-up {
      0% {
        transform: translateY(-5rem);
      }
      100% {
        transform: translateY(0);
      }
    }
    @keyframes slide-down {
      0% {
        transform: translateY(5rem);
      }
      100% {
        transform: translateY(0);
      }
    }


`



const LinksContainer = styled.div`


`
const Contain= styled.div`
display:flex;


 

`
const RightContainer = styled.div`
//flex:0.6;

`
const LeftContainer = styled.div`
//flex:0.2;


`