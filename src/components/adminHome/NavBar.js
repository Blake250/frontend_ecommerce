


import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const { user } = useSelector((state) => state?.auth);
    const [isOpen, setIsOpen] = useState(false)

    const userName = user?.name;



    return (
        <Container>
          
           
            <SubmitBtn > 
               
            <Contain>
                <NavContainer>
                    <div>
                        <FaUserCircle size={40} color="#fff" />
                        <p
                        style={{
                            whiteSpace:'nowrap'
                        }}
                        > {userName} </p>
                    </div>
                </NavContainer>
            </Contain>
            <NavProduct>
                <div>
                  <hr />
                    <NavLink to="/admin/home" >
                        <p>Home page</p>
                    </NavLink>
                    <hr />
                    <NavLink to="/admin/category" >
                        <p>Categories</p>
                    </NavLink>
                    <hr />
                
                    <NavLink to="/admin/brand" >
                        <p>My Brand</p>
                    </NavLink>
                
                  
                    <hr />
                    <NavLink to="/admin/add-product" >
                        <p>Add Product</p>
                    </NavLink>

                    <hr />
                    <NavLink to="/admin/orders" >
                        <p> My Orders</p>
                    </NavLink>


                    <hr />
                    <NavLink to="/admin/coupon" >
                        <p>My Coupon</p>
                    </NavLink>

                    <hr />
                    <NavLink to="/admin/view-products" >
                        <p>All Products</p>
                    </NavLink>
                    <hr />
                    <NavLink to="/admin/edit-product/:id" >
                        <p>Edit Product</p>
                    </NavLink>
                   
                </div>
            </NavProduct>
                     

            </SubmitBtn>

        </Container>
    );
};

export default NavBar;




const Container = styled.div`
    width: 100%;
    height: 100%;


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

 
`;

const SubmitBtn = styled.div`


`

const NavProduct = styled.div`
    border-top: 15px;

 


    a {
        text-decoration: none;
        color: black;
        position: relative;
        padding-bottom: 10px;
        padding-left:4px;
        
    }

    a:hover p {
        color: #009900 !important;
    }

   a:not(:last-child)::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 40%;
        transform: translateX(-50%);
        width: 330px;
        border-bottom: 1px solid black;
        padding:0 56px;
     
 
      &:first-child{
         margin-left:30px;
      };
        @media (max-width: 768px) {
            width: 180px !important;
            left:20px !important;
            

         
        }
        @media (max-width: 400px) {
            width: 150px !important;
            left:10px !important;
            

         
        }
    }

    div {
      animation: slide-down 0.5s ease;
        display: flex;
        justify-content: flex-start;
       align-items: flex-start;
        flex-direction: column;
        background-color: #ccc;
        padding-top: -15px;
        margin-bottom: 12px !important;
        a{
            p{
                white-space:nowrap !important;
            }
        }
     
    }

    p {
        font-size: 13px;
        text-decoration: none !important;
        line-height: 0;
        font-weight: 600;
        color: black;
      
    
    }

    a.active::before {
        content: '';
        position: absolute;
        top: 0;
        left: 255px; 
        width: 2px;
        height: 150%;
        background-color: blue;
       margin-top:-18px;
       @media (max-width:768px) {
        left: 180px; 
        
       }
    }
`;

const Contain = styled.div`

    margin: 1px;
    background-color: #6600ff;
    width: 20vw;
    height: 20vh;
    @media (max-width: 768px) {
        width: 35vw;
    }
`;

const NavContainer = styled.div`
   animation: slide-down 0.5s ease;
    padding: 8px;
    div {
        
       display: flex;
        align-items: center;
        justify-content: center;
        flex-direction:column;
        

        p {
            color: black;
            line-height: 0;
            font-weight: 600;
            white-space:nowrap !important;
            
        }
    }
`;


