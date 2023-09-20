import React, {useState} from 'react'

import styled from 'styled-components'
import  registerImg from "./ecommerce/register.png"
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from './Loader';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';





const Container = styled.div`
  max-width: 300%;
  width: 150%;
  position: relative;
 

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
  background-color: #ccc;
  padding: 5px 7px;
  margin-left: -40px;
  padding-bottom: 35px;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  //position: relative !important;
 // z-index: 1 !important;

 @media (max-width:768px) {
  padding: 5px 7px !important ;
  margin-left: -90px !important ;
  padding-bottom: 35px !important ;
  border-radius: 5px !important ;
  
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
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const registerUser = ((e)=>{
    e.preventDefault()
    if(password !== cPassword){
      toast.error("password do not match")
    }
    else{
         setIsLoading(true)
         
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
         navigate("/")
      const user = userCredential.user
      console.log(user)
      setIsLoading(false)
      toast.success("Registration is successful...")
    })
    .catch((error)=>{
     
      const errorMessage = error.message;
      toast.error(errorMessage)
      setIsLoading(false)
  
    })

  })

  return (
    <> 
  
    {isLoading && <Loader/>}
    <Container>
      <ContainItem>
      <LoginImage>
          <img src={registerImg} alt="Reg" />
        </LoginImage>
        <Form>
          <p>Register</p>
          <form onSubmit={registerUser} >
            <input type="text" 
            placeholder="Email" 
            value={email}
            onChange={(e)=> setEmail( e.target.value)}
            required />


            <input type="password"
             placeholder='Password'
             value={password}
             onChange={(e)=> setPassword(e.target.value)}
              required />


            <input  type="password"
           
            placeholder="Confirm Password" 
            value={cPassword}
            onChange={(e)=> setCPassword(e.target.value)}
            required />
            <button type='submit' >Register</button>
            <div>
          
           
            </div>
          </form>
        
          <CreateOne>
            <span>Already have an account?</span>
            <Link to="/">Login</Link>
          </CreateOne>
        </Form>
       
      </ContainItem>
    </Container>
    </>
  );
};

export default Register;