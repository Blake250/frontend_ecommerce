import React, {useState, useEffect} from 'react'

import styled from 'styled-components'
import  loginImg from "./ecommerce/login.png"
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';
import 'react-toastify/dist/ReactToastify.css';
import { validateEmail } from './utils';
import { login } from '../redux/slice/authSlice';
import {  useDispatch, useSelector } from 'react-redux';
import  { getCart, saveCartDB } from '../feature/cart/cartSlice';
import { useSearchParams } from 'react-router-dom';





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

 margin-bottom:25px;
 animation: slide-down 0.5s ease;
  
  img {
    width: 550px;
    //height:500px;
  }
  @media (max-width:768px) {
    margin-top:20px !important;
    
  img {
    width: 350px !important;
    height:350px !important;
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
  animation: slide-up 0.5s ease;
  

 @media (max-width:768px) {
  padding: 5px 7px !important ;
  margin-left: -45px !important ;
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
      &:hover{
        color:red;
      }
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
  animation: slide-up 0.5s ease;
    input {
      width: 350px;
      height: 25px;
      padding: 5px;
      margin-bottom: 3px;
      border-radius: 3px;
      border: none;
      opacity: 0.5;
      cursor:pointer;

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

const GoogleButton = styled.button`
  width: 358px;
  padding: 12px;
  background-color: #1e81b0;
  border: none;
  border-radius: 3px;
  color: white;
  font-weight: 400;
  position: relative;
  display:flex;
  align-items:center;
  justify-content:center;

  &>span{
    padding-left:4px;
  }
 
  &:hover {
    background-color: #76b5c5;
  }

  @media (max-width:768px) {
    width: 210px  !important ;
  padding: 7px  !important ;
  background-color: #1e81b0;
  border: none;
  border-radius: 3px !important ;

  font-weight: 400  !important ;
    
  }
`;

const CreateOne = styled.div`
text-align:center;


/*padding-left:2px;
  
  
  &:hover{
    color:darkred;
   
  }*/

  
  span{
    font-size:12px;
    font-weight:600;
    opacity:0.5;
  };



  a{
    padding-left:2px;
  
  
  &:hover{
    color:darkred;
   
  }

}

`












const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { isLoading, isLoggedIn }= useSelector((state)=> state?.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [urlParams] =useSearchParams()
  console.log(`her is my ${urlParams}`)
  const redirect = urlParams.get('redirect') || ""




  // useEffect(() => {
  //   console.log('isLoggedIn:', isLoggedIn); 
  //   if (isLoggedIn) {
  //     if (redirect === 'cart') {
  //       dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem('cartItems')) }));
  //       navigate("/cart");
  //     } else {
  //       dispatch(getCart());
  //       navigate("/");
  //     }
  //   }
  // }, [dispatch, isLoggedIn, navigate, redirect]);


  useEffect(() => {
    if (isLoggedIn) {
      if (redirect === 'cart') {
        dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem('cartItems')) }));
        navigate("/cart");
      } else {
        dispatch(getCart()).then(() => {
          navigate("/");
        });
      }
    }
  }, [dispatch, isLoggedIn, navigate, redirect]);
  
 
  


//   useEffect(() => {
//     if (isLoggedIn  ) {
//    //  navigate("/");
//    if(redirect === 'cart'){
//     dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem('cartItems')) }));
//      navigate("/cart");
//   // return navigate('/login?redirect=cart');

//    }
//     dispatch(getCart())
//     navigate("/");
  

//     }


  
//  }, [dispatch, isLoggedIn,navigate, redirect]);










  useEffect(() => {
    if (isLoggedIn) {
     dispatch(getCart());
    }
  }, [isLoggedIn, dispatch,]);

  

const loginUser = ( async (e)=>{

  e.preventDefault()
  if(!email  && !password){
    return toast.error("Please Enter a Valid Email and Password")

  }
 
  if(!validateEmail(email)){
    return toast.error("Please Enter a Valid Email")
  }
  
  

const userData = { email, password, } 
//console.log(userData)
await dispatch(login(userData))


})





  return (
<>  
{isLoading && <Loader/>}
    <Container>
      <ContainItem>
        <LoginImage>
          <img src={loginImg} alt="" />
        </LoginImage>
        <Form>
          <p>Login</p>
          <form  onSubmit={loginUser} >
            <input type="email"
             placeholder="Email" 
             value={email}
             onChange={(e)=> setEmail(e.target.value)}
             required />



            <input type="password"
             placeholder="Password" 
             value={password}
             onChange={(e)=> setPassword( e.target.value)}
             
             required />
            <button type='submit' >Login</button>
            <div>
             
              <Link to={"/reset"} > Reset Password  </Link>
              <p>--or--</p>
            </div>
          </form>
          
          <CreateOne>
     
            <span>Don't have an account?</span>
           
            <Link to={"/register"} > Register  </Link>
            </CreateOne>
        
        </Form>
      </ContainItem>
    </Container>
    </>
  );
};

export default Login;






















