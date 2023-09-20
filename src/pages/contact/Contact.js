import React, { useState,useRef } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom"
import {BsFacebook}  from "react-icons/bs"
import {BiLogIn}  from "react-icons/bi"
import {AiTwotoneMail}  from "react-icons/ai"
import {MdOutlineMail}  from "react-icons/md"
import {GiRotaryPhone}  from "react-icons/gi"
import {BsLinkedin}  from "react-icons/bs"



import {AiFillTwitterCircle}  from "react-icons/ai"
import { NavLink } from 'react-router-dom';
import imgLogo from "../../assests/ecommerce/b3.jpg"





import contactImg from "../../assests/ecommerce/b17.jpg"
const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID 
const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID 
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY



const Contact = () => {

  const form = useRef();
  const navigate = useNavigate()


  const sendEmail = (e) => {
    e.preventDefault();
    

    //emailjs.sendForm(serviceID, templateID, form.current, publicKey)
   emailjs.sendForm("service_tyv725b", "template_snmpzz1", form.current, "mhfTzFtyt9b8tvw08")
      .then((result) => {
          console.log(result.text);
          
          toast.success("message sent")
          form.current.reset();
 
     
          setTimeout(()=>{
         
           navigate("/contact")
          },5000)
         
      }, (error) => {
          console.log(error.text);
          toast.error("message sending failed")
      });
  };


  return (
    <Container>
      <Contain>
    
   
        <TextField>
       <h2>Are you Facing Any Issue With  Our Product</h2>
       <p>why not write to us, we are a step away in finding a solution for you? </p>

     
 
        
         

       <LogoPhoto>
        <img src={imgLogo} alt="" /> 
 
 
         </LogoPhoto>
        
 
  
     
 
       <Form   >
        <span>Fill In This Form</span>
        <FormGroup  >
       
        <form ref={form} onSubmit={sendEmail }>
      
      <input 
      type="text" 
      name="from_name"
       placeholder='Name'
      
       required
       
       />
     
      <input type="email"
       name="from_email"
        placeholder='Email' 
       required
        
        />
      <textarea 
      name="message"
       placeholder='Message' 
       required    
       />
      <button input="button"  value="Submit"> Submit</button>
      
          
      </form>
         
          </FormGroup>
     
       </Form>
      
       <StyledLinked className='social-links' >
       
        <NavLink to={"www.linkedin.com/in/ozoekwechristianblake"} >  
        <BsLinkedin/>
         </NavLink>

         <NavLink to={"https://www.facebook.com/christian.ozoekwe"} >
         <BsFacebook/>
         </NavLink>
         <NavLink to={"https://twitter.com/christianozoek2?s=09 "} >
         <AiFillTwitterCircle/>
         </NavLink>
         
        
          
             

        </StyledLinked>
        <About>
         
        <p>  you can  contact us @    </p> 
        
         <p>   ozoekweceletine@gmail.com   </p>  
         <p>  ozoekwetoochuk@gmail.com   </p> 
         <p> +34920127600  </p> 
         </About>
             
        </TextField>

    
        <Img>   
        <img src={contactImg} alt="" />

        </Img>

     
     
      </Contain>
    </Container>
  )
}

export default Contact



const About = styled.div`

 //margin-top:60px;
text-align:right;

 position:absolute;
  top:160px;
 
  font-style:italic;


display:flex;
justify-content:flex-end;
//align-items:flex-end;
flex-direction:column;
@media (max-width:768px) {

  margin-left:85px;
  span{
    margin-right:170px;
   
  }

  p{
    line-height:0.3 !important;
    margin-bottom:4px;
    font-weight:bold !important;
    
    
   
  &:nth-child(4){
    position:absolute;
    left:-78px !important;
    top:53px !important;
    

  }

  &:first-child{
    position:absolute;
    left:4px !important;
  }
      
    
  }
}

  


p{
  
  display:flex;
//justify-content:flex-end;
align-items:flex-end;
flex-direction:column;
//padding-left:50px;
margin-left:200px;
position: relative;
color:blue !important;
cursor:pointer;

 &:nth-child(4){
  display:flex;
  justify-content:flex-start;
  position:absolute;
 //bottom:25px;
  top:60px;
  left:-100px;

  
 };
 &:first-child{
 
  position:absolute;
  top:-27px;
  left:-26px;
  font-size:14px;
  font-weight:800;
  color:green !important;
  text-transform:uppercase;

  //bottom:25px;
 }


};
h4{
  display:flex;
justify-content:flex-end;
align-items:flex-end;
flex-direction:column
};






`
const LogoPhoto = styled.div`
  //position: relative;
  position: absolute;
  top:5%;
  left:200%;
  z-index:999;
  @media (max-width:768px) {
    display:none
  }

 img{
  width:100px;
  border-radius:50px;
 
 } 

`

/*const TextPages= styled.textarea`
transition:background-color 0.9 ease;
  
width:270px;
height:25vh;
outline:none;
    margin-bottom:3px;
    background-color:whitesmoke;
    border:none;
    border-radius:3px;
   &:hover{
    background-color:white;
    transform:scale(1);
   }
`*/



const StyledLinked = styled.div`
display:flex;
justify-content:flex-end;
align-items:flex-end;
cursor: pointer;
position: relative;

position:absolute;
//right:0;
left:210%;

a{
  font-size:25px;
  padding-right:40px;
  margin-left:-30px;
}


@media (max-width:768px) {
margin-right:6% !important;
  //margin-bottom:3%;
  position: absolute;
  left:85% !important;

a{

 
  padding-left:7% !important;
  font-size:20px !important;
 padding-bottom:3% !important;

 
}

  
}

`


const Form = styled.div`
   background-color:rgb(226,135,67,);


  width:90%;
  //height:30vh;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  margin-left:20%;
padding-top:20px;
padding-bottom:25px;
 
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;

  @media (max-width:768px) {
   
 
    border-radius:5px;
  width:52% !important;
  margin-left:7px !important;
 // height:45vh;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
 //padding:4% 2% 2% 0; 
 padding:3%;
    
  }
span{
  padding-bottom:3px;
  font-weight:600;
}

`







const SubmitBtn = styled.div`

button{
  width:275px;
  height:5vh;
  background-color:#cc6600;
  border-radius:3px;
  border:none;
  font-size:16px;
  font-weight:700;
  transition:background-color 0.8 ease;

  &:hover{
    background-color:#ff9933;
    transform:scale(1)
  }
}
  
`

const FormGroup = styled.div`
//width:40px;
white-space:wrap;
display:flex;
flex-direction:column;
flex:wrap ;
transition:background-color 0.8 ease;



@media (max-width:768px) {
  form{
    display:flex;
 flex-direction:column;
 justify-content:center;
 align-items:center;
    input{
      width:270px !important;
    height:5vh !important;
    margin-bottom:3px !important;
    border-radius:3px !important;

    };
    button{
    width:275px !important;
  height:5vh !important;
  };
  textarea{
    width:270px !important;
height:25vh !important;
  }

  }
  
  
}


form{
 // padding-bottom:10px;
 display:flex;
 flex-direction:column;
 //justify-content:flex-start;
 //align-items:flex-start;
  input{
    width:400px;
    height:7vh;
    outline:none;
    margin-bottom:3px;
    background-color:whitesmoke;
    border:none;
    border-radius:3px;
    &:hover{
    background-color:white;
    transform:scale(1)
   };



  }
  textarea{
    transition:background-color 0.9 ease;
  
width:400px;
height:25vh !important;
outline:none;
    margin-bottom:3px;
    background-color:whitesmoke;
    border:none;
    border-radius:3px;
   &:hover{
    background-color:white;
    transform:scale(1);
   }

   }
   button{
  width:405px;
  height:5.3vh;
  background-color:#cc6600;
  border-radius:3px;
  border:none;
  font-size:16px;
  font-weight:700;
  transition:background-color 0.8 ease;
 
  &:hover{
    background-color:#ff9933;
    transform:scale(1)
  }


}
  
  

  
}

  

`

const Container =  styled.div`
position: relative;
  width:100%;
  height:100%;



`
const TextField = styled.span`
line-height:1;
  position: fixed;
 text-align:center !important;
  
  h2{
    width:250%;
   white-space:wrap;
   //text-align:center !important;
   text-transform:uppercase;
   color:red;
   
  }
  p{
    font-size:15px;
    text-align:center;
    white-space:wrap;
   font-weight:600;
   width:250%;
  line-height:0;
  color:darkblue;
  

   
    
  }
  @media (max-width:768px ) {
    h2{
    width:100% !important;
   //white-space:wrap;
   text-align:center !important;
   text-transform:uppercase;
  }
  p{
    font-size:12px !important;
    text-align:center;
    white-space:wrap;
    font-weight:600;
    width:60% !important;
    line-height:0.9 !important;
   // padding-top:-4px;
  // color:red;
    
  }
  }
 
`

const Img = styled.div`
  
  img{
  height:80vh;
width:100%;



}
  @media (max-width: 768px) {

    img{
  height:77vh;
width:100% !important;


}

}

`
const Contain = styled.div`
position: absolute;
top:-19px !important;
left:0;
right:0;
object-fit:cover;
z-index:-10;

@media (max-width: 768px) {


}














  

`













