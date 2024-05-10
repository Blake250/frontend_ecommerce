import React, {useState, useEffect} from 'react'

import styled from 'styled-components'
import  resetImg from "./ecommerce/forgot.png"
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail, } from 'firebase/auth'
import { auth } from './firebase'
import { toast } from 'react-toastify'
import Loader from './Loader'





const Container = styled.div`
  max-width: 300%;
  width: 150%;
  position: relative;
 
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

 
  @media (max-width:768px) {
    max-width: 120% !important;
  width: 80% !important;
  position: relative;
    
  }
`;

const ContainItem = styled.div`
  width: 700px;
  margin-left: 10em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom:20px;
  height:75vh;

  @media (max-width:768px) {
    width: 400px !important;
  margin-left: 25px !important;
  display: flex;
  justify-content: center;
  align-items: center;
    
  }
`;

const LoginImage = styled.div`
 // margin-bottom: 40px;
 //padding-bottom:30px;
 margin-bottom:25px;
margin-left:40px;
animation: slide-down 0.5s ease;
    
  img {
    width: 550px;
    //height:500px;
  }
  @media (max-width:768px) {
    margin-top:20px !important;
    
  img {
    width: 400px !important;
    height:400px !important;

  }
  }
`;

const Form = styled.div`
 animation: slide-up 0.5s ease;
  background-color: #ccc;
  padding: 5px 7px;
  margin-left: -40px;
  padding-bottom: 35px;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  //position: relative !important;
 // z-index: 1 !important;

 @media (max-width:768px) {
  padding: 7px 12px !important ;
  margin-left: -130px !important ;
  padding-bottom: 25px !important ;
  border-radius: 5px !important ;
  margin-top:12px;
  
 }

  div {
    a {
      font-size: 12px;
      font-weight: bold;
      text-decoration: none;
      color: black;
      opacity: 0.5;
    }
  }

  p {
    text-align: center !important;
    font-size: 28px;
    font-weight: 600;
    color: #e28743;
    opacity: 1 !important;
    line-height: 0;

    @media (max-width:768px) {
      font-size: 23px !important;
      
    }
    &:last-child {
      font-weight: bold;
      text-align: center !important;
      font-size: 15px ;
      color: black !important;
      opacity: 0.5 !important;
      
      @media (max-width:768px) {
        font-size: 12px !important;
        
      }
    }
  }

  form {
  //  position: relative !important;
  //  z-index: 20 !important;

    input {
      width: 350px;
      height: 25px;
      padding: 5px;
      margin-bottom: 3px;
      border-radius: 3px;
      border: none;
      opacity: 0.5;

      @media (max-width:768px) {
        width: 200px !important ;
      height: 20px !important ;
      padding: 5px !important ;
      margin-bottom: 3px !important ;
      border-radius: 3px !important ;
      border: none;
      opacity: 0.5;
        
      }

      &:hover {
        background-color: lightblue !important;
      }
    }

    button {
      width: 358px;
      padding: 12px;
      background-color: #1e81b0;
      border: none;
      border-radius: 3px;
      color: white;
      font-weight: 400;

      @media (max-width:768px) {
        width: 210px !important ;
          
        
      padding: 7px !important ;
      background-color: #1e81b0;
      border: none;
      border-radius: 3px !important ;
     // color: white;
      font-weight: 400 !important ;

        
      }






      &:hover {
        background-color: #76b5c5;
      }
    }
  }
`;



const CreateOne = styled.div`

display:flex;
justify-content:space-around;
padding-top:5px;

  

 a{
  padding-left:2px;
 
 
  

  &:last-child{
   text-align:center !important;

   
  }
  
  
  &:hover{
    color:darkred;
   
  }
 }
`

const Reset = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const resetPassword = ((e)=>{
    e.preventDefault()
    setIsLoading(true)
    sendPasswordResetEmail(auth, email)
    .then((result)=>{
      setIsLoading(false)
      toast.success("check your email for a reset Link")
      setEmail("")
    })
    .catch((error)=>{
      setIsLoading(false)
      toast.error(error.message)
      setEmail(" ")
    })
   
      
  })




 
  
  return (
    <> 
    {isLoading && <Loader/>}
    <Container>
      <ContainItem>
        <LoginImage>
          <img src={resetImg} alt="Reset Password" />
        </LoginImage>
        <Form>
          <p>Reset Password</p>
          <form onSubmit={resetPassword} >
            <input type="text" 
            placeholder="Email"
            value={email}
            onChange={(e)=> setEmail( e.target.value)}
             required />
        
            <button type='submit'>Reset Password</button>
            <div>
             
             
            </div>
         
          </form>
         
          <CreateOne>
            <Link to="/login">-Login</Link>
         
           
            <Link to="/register">-Register</Link>
          </CreateOne>
        </Form>
      </ContainItem>
    </Container>
    </>
  );
};

export default Reset;