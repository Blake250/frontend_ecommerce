

import React, {useState,useEffect} from 'react'

import styled from 'styled-components'
import  registerImg from "./ecommerce/register.png"
import { Link } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from './Loader';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, RESET_AUTH } from '../redux/slice/authSlice';
import { validateEmail } from './utils';

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
  margin-left: 20em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom:20px;
  height:75vh;
  position: relative;

  @media (max-width:768px) {
    width: 400px !important;
  //  margin-left: 10em !important;
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


    
  img {
    width: 550px;
    animation: slide-down 0.5s ease;
    //height:500px;
  
  }
  @media (max-width:768px) {
    margin-top:20px !important;
    
  img {
   // width: 50vw !important;
  //  height:280px !important;
    width:350px;
    margin-left:25px;
       //heighth:400px;
  }
  }
`;


const Form = styled.div`
  background-color: #ccc;
  padding: 5px 7px;
  margin-right: -120px ;
  padding-bottom: 35px;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  //position: relative !important;
  z-index: 1 ;
 
  &:hover.nameInput {
        background-color: #76b5c5 !important;
      }
 @media (max-width:768px) {
 // padding: 5px 7px !important ;
 padding:20px;
  margin-left: 120px !important ;
  padding-bottom: 35px !important ;
  border-radius: 5px !important ;
 // z-index: 0 !important;
  
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
      opacity: 0.5 ;
      
      @media (max-width:768px) {
        font-size: 12px !important;
        
      }
    }
  }

  form {
  
  animation: slide-up 0.5s ease;
  
      
    input {
      width: 350px;
      height: 25px;
      padding: 5px;
      margin-bottom: 3px;
      border-radius: 3px;
      border: none;
      opacity: 0.5;
      cursor: pointer;
      border:none !important;
    
      &:hover{
        background-color: #76b5c5;
      }
   
    
      @media (max-width:768px) {
        width: 250px !important ;
      height: 30px !important ;
      padding: 5px !important ;
      margin-bottom: 3px !important ;
      border-radius: 3px !important ;
      border: none;
     // opacity: 0.5;
    
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
        width: 260px !important ;
          
        
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
text-align:center;

  
  span{
    font-size:12px;
    font-weight:600;
    opacity:0.5;
  }
 a{
  padding-left:2px;
  
  
  &:hover{
    color:darkred;
   
  }
 }
`

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  


  const {isLoading, isLoggedIn, isSuccess }= useSelector((state)=> state?.auth)

console.log(`Loading is ${isLoading}`)
  const dispatch = useDispatch()

  const navigate = useNavigate()




  const registerUser = (async (e)=>{
    e.preventDefault()
    if(!email  && !password){
      return toast.error("Please Enter a Valid Email and Password")

    }
    if(password.length < 6){
      return toast.error("Please Enter A Password of at least 6 characters")
    }
    if(!validateEmail(email)){
      return toast.error("Please Enter a Valid Email")
    }
    
    
    if(password !== cPassword){
      toast.error("password do not match")
    }
const userData = {name, email, password, } 
 await dispatch(register(userData))


 

})

useEffect(()=>{
  if(isLoggedIn || isSuccess ){

      navigate("/")
     dispatch(RESET_AUTH())

   
  }

}, [isLoggedIn, isSuccess, navigate, dispatch])

/*useEffect(() => {
  if (!isLoggedIn && isSuccess) {
    dispatch(RESET_AUTH());
  }
}, [isLoggedIn, isSuccess, dispatch]);*/




  return (
    <> 
  
    {isLoading && <Loader/>}
    <Container>
      <ContainItem>
 
        <Form>
          <p>Register</p>
          <form onSubmit={registerUser} >

          <input type="text"
             placeholder='Name'
             name='name'
             value={name}
             onChange={(e)=> setName(e.target.value)}
              required />

            <input type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e)=> setEmail( e.target.value)}
            required />


            <input
             type="password"
             placeholder='Password'
             value={password}
             onChange={(e)=> setPassword(e.target.value)}
             className='nameInput'
              required
              
              />


            <input  type="password"
           
            placeholder="Confirm Password" 
            value={cPassword}
            onChange={(e)=> setCPassword(e.target.value)}
            required />
            <button type='submit' >Register</button>
            
          </form>
        
          <CreateOne>
            <span>Already have an account?</span>
            <Link to="/">Login</Link>
          </CreateOne>
        </Form>
        <LoginImage>
          <img src={registerImg} alt="Reg" />
        </LoginImage>
       
      </ContainItem>
    </Container>
    </>
  );
};

export default Register;