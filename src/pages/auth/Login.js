import React, {useState} from 'react'

import styled from 'styled-components'
import  loginImg from "../../assests/ecommerce/login.png"
import { Link, NavLink } from 'react-router-dom'
import {FaGoogle} from "react-icons/fa";
import { auth, provider } from '../../firebase/firebase';
import {  signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../load/Loader';
import 'react-toastify/dist/ReactToastify.css';







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
  

 @media (max-width:768px) {
  padding: 5px 7px !important ;
  margin-left: -72px !important ;
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
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

const loginUser = ((e)=>{
  e.preventDefault()
  setIsLoading(true)
  console.log(loginUser)
  signInWithEmailAndPassword(auth, email,password)
  .then((userCredential)=>{
    navigate("/home")
    const user = userCredential.user
    setIsLoading(false)
    toast.success("Login is successful...")


    
  }).catch((error)=>{
    const errorMessage = error.message
 
    setIsLoading(false)
    toast.error(errorMessage)
  })


})


const loginWithGoogle = (()=>{
  signInWithPopup(auth, provider)
  .then((result)=>{
    navigate("/home")
    const user = result.user
    toast.success("login is successful...")

  }).catch((error)=>{
    toast.error(error.message)
  })
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
            <input type="text"
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
          <GoogleButton onClick={loginWithGoogle} >
            <FaGoogle />   <span>  Login with Google   </span>
          </GoogleButton>
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
























/*function Login() {
  return (
    <Container>
        <ContainItem>   
     <LoginImage>
     <img src={loginImg} alt="" />

     </LoginImage>
     <Form >
         <p>Login</p>
    
        <form className='forms'>
        <input type="text" placeholder='Email' required />
        <input type="password"  placeholder='Password' required/>
        <button >Login</button>
        <div>
          <Link to={"/reset"} > Forgot Password </Link>
          <p>--or--</p>
        </div>
   
     
        </form>
        <GoogleButton> <FaGoogle/> Login with Google</GoogleButton>

     </Form>
     </ContainItem>
    </Container>
     
  )
}

export default Login


const Container = styled.div`
max-width:120%;
width:80%;
position: relative;

`

const ContainItem = styled.div`
    width:400px;
    margin-left:25px;
    
display:flex;
justify-content:center;

align-items:center;





    
`
const LoginImage = styled.div`
margin-top:20px;

img{
  width:400px;
}

`
const Form = styled.div`

background-color:#ccc;
padding: 5px 7px;
  margin-left: -65px; 
  padding-bottom:35px;
  border-radius:5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  position: relative !important;
  //z-index:15 !important;

div{
  a{
    font-size:12px;
    font-weight:bold;
    text-decoration:none;
    color:black;
    opacity:0.5;
  }
}

//padding-top:40px;


p{
    text-align:center !important;
    font-size:23px;
    font-weight:600;
    color:#e28743;
    opacity:1 !important;
    line-height:0;
    &:last-child{
      font-weight:bold;
  text-align:center !important;
  font-size:12px !important;
  color:black !important;
  opacity:0.5  !important;
    }
   
   
  }
   
form{
  
position: relative;
//z-index:20;
 
  

 input{
  width:200px;
  height:20px;
  padding:5px;
  margin-bottom:3px;
  border-radius:3px;
  border:none;
  opacity:0.5;
  

  &:hover{
    background-color:lightblue ;

    

  }



 
 }
 button{
  width:210px;
  padding:7px;
  background-color:#1e81b0;
  border:none;
  border-radius:3px;
  color:white;
  font-weight:400;
  &:hover{
      background-color:#929ea8 !important;
   }
  

 }
} 



`
const GoogleButton = styled.button`
  width:210px;
  padding:7px;
  background-color:#1e81b0;
  border:none;
  border-radius:3px;
  color:white;
  font-weight:400;
  position: relative;
 // z-index:5;
  &:hover{
      background-color:#76b5c5;
   }
  



`*/