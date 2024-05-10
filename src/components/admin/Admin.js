import React from 'react'
import styled from 'styled-components'
import NavBar from '../adminHome/NavBar'
import AdminHome from '../adminHome/AdminHome'
import { Routes, Route } from 'react-router-dom'
import Categories from '../category/Categories'
import ViewProduct from './viewProduct/ViewProduct'
import AddProduct from './addProduct/AddProduct'

import EditProduct from './editProduct/EditProduct'


const Admin = () => {

  return (
    <Container>
     <Contain>
        <LeftContainer>
            <div>
           <NavBar/>

            </div>

        </LeftContainer>

      <RightContainer>
        <div  >
    
        <Routes>
       <Route path='home' element={<AdminHome/>}  />  
       <Route path='category' element={<Categories/>}  />   
      
       <Route path='add-products' element={<AddProduct/>}  /> 
       <Route path='all-products'  element={<ViewProduct/>}  />
       < Route /* path='all-products' element={<ViewProducts/>} */ /> 
       <Route path='edit-product/:id' element={<EditProduct/>}  /> 
        </Routes>
        </div>
        
    </RightContainer>
    
    
         
        
      </Contain>
    </Container>
  )
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


const Contain= styled.div`
display:flex;


 

`
const RightContainer = styled.div`
//flex:0.6;

`
const LeftContainer = styled.div`
//flex:0.2;


`