import React from 'react'
import styled from 'styled-components'
import { FaFacebook } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
//import backgroundImg from "./images/b2.jpg"


const BaseItems = () => {
  return (
    <Container>
        <Contain  >  
        <div> 
     <FaFacebook/>
     <BsTwitter/>
     <FaInstagramSquare/>
     <FaYoutube/>
     <h2>Let's Talk?</h2>
   
     
     </div>
     <Home>
        <span>  
        <a href="#home">Make an Enquiry</a>
            
      </span>


     </Home>
   
        </Contain>
        </Container>
  )
}

export default BaseItems


const Container = styled.div`
width:100%;
height:100%;


`
const Home = styled.div`
    position: relative; 

    @media (max-width:768px) {
      width:70%;
      height:70%;
      div{
      
      }
      
        span{
            margin-top:0px !important;
            a{
              white-space:nowrap;
                font-weight:500 !important;
                padding:7px 1px !important;
                font-size:15px !important;
                margin-top:3px !important;
                   margin-left:7px !important;
                &:hover {
    &:before {
     width: calc(100% - 18px) !important;
  
     box-sizing:content-box;
    
  
      }
    }

            }
        }
    }

span{  
    margin-top:10px;

a{
    background-color: transparent;
    white-space:nowrap;
  overflow: hidden;
  color: var(--color-white);
  text-decoration:none;
  margin-left:12px;
  margin-top:3px;
  border:2px solid red;
  padding:7px 2px;
  text-align:center;
  font-weight:500;
  color:#fff;
  font-size:20px;
 


  &:hover {
    &:before {
     width: calc(100% - 18px);
  
     box-sizing:content-box;

    
  
      }
    }


    &:before {
      content: '';
      
    position: absolute;
    top: 0;
    left: 15px;
  
     box-sizing:border-box;

     margin-top:27px;
    width: 0;
    height:76%;
    background-color: red;
    transition: width 0.3s;
    @media (max-width:768px) {
        height: 84% !important;
        margin-top:16px !important;
        
    }
 
  }
    




}
}
`


const Contain = styled.div`
background-image:url("./ecommerce/b2.jpg");

background-size: cover;
  background-position: center;
  background-repeat:no-repeat;
display:flex;
align-items:center;


justify-content: space-between; 
  padding: 0 20px; 
  box-sizing: border-box;
@media (max-width:768px)  {
  padding: 0 5px !important; 
    div{
        height:90% !important;
        h2{
    font-size:25px !important;
    margin-left:14px !important;
    
   
}
        svg{
  padding: 0.5rem !important;
  width: 1rem !important;
  height: 1rem!important;
  margin: 2px !important;
  margin-left:0px;
        }

    }
    
}

div{
      height:100%;
      
    display:flex;
flex-direction:row;
justify-content:flex-start !important;
align-items:center;
padding-top:25px;
//margin:10px 1rem 10px 3rem;
margin:4rem 0px;

h2{
    font-size:60px;
    color:white;
    margin-left:70px;
    text-align:center;

}


svg{

    color: #fff;
  font-size: 2.5rem;
  border: 2px solid var(--color-danger);
  padding: 1rem;
  width: 4rem;
  height: 4rem;
  text-align: center;
  border-radius: 50%;
 

  cursor: pointer;
  transition: all 0.3s;
  z-index: 1;
  border:2px solid red;
  margin-left:5px;
  &:hover{
    transform: translateY(-1rem);
  z-index: 1;
  }
}
}

`