import React, { useState,useRef } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import {BsFacebook}  from "react-icons/bs"
import {BsLinkedin}  from "react-icons/bs"
import {AiFillTwitterCircle}  from "react-icons/ai"
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import contactImg from "../../assests/ecommerce/b17.jpg"
import {useNavigate} from "react-router-dom"
import imgLogo from "../../assests/ecommerce/b3.jpg"





const Order= () => {

  const form = useRef();
  const navigate = useNavigate()


  const sendEmail = (e) => {
    e.preventDefault();
    

    //emailjs.sendForm(serviceID, templateID, form.current, publicKey)
   emailjs.sendForm("service_m27qrkm", "template_62th6pg", form.current, "mhfTzFtyt9b8tvw08")
      .then((result) => {
          console.log(result.text);
          
          toast.success("message sent")
          form.current.reset();
 
     
       
      }, (error) => {
          console.log(error.text);
          toast.error("message sending failed")
      });
  };




  return (
    <Container>
      <Contain>  
        <DivContainer>  
  

   
        <TextField>
       <h2>the best online clothing website nationwide</h2>
       <p>Shop with  Us Today and see the difference</p>

     
 
        
         

       <LogoPhoto>
       
 
 
         </LogoPhoto>
        
 
  
     
 
       <Form   >
        <span>Make Your Order Now</span>
        <FormGroup  >
       
        <form ref={form} onSubmit={sendEmail }>
      
      <input 
      type="text" 
      name="to_name"
       placeholder='Name'
      
       required
       
       />
     
      <input type="email"
       name="from_email"
        placeholder='Email' 
       required
        
        />

<input type="text"
       name="from_product"
        placeholder='Product' 
       required
        
        />
    <input type="number"
       name="from_quantity"
        placeholder='Quantity' 
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
         
        <p>  we are   at your service  </p> 
        
         <p>   ozoekweceletine@gmail.com   </p>  
         <p>  ozoekwetoochuk@gmail.com   </p> 
         <p> +34920127600  </p> 
         </About>
             
        </TextField>

    
        <Img>   
        <img src={imgLogo} alt="" />

        </Img>


   </DivContainer>
      </Contain>
      </Container>
  )
}

export default Order


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


const Img = styled.div`
  z-index:-999;
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
  color:#61502d;
 font-style:italic;

   
    
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
  
    
  }
  }
 
`





const About = styled.div`

 //margin-top:60px;
text-align:right;

 position:absolute;
  top:160px;
 
  font-style:italic;
  p{
    margin-right:-50px;
    
  &:nth-child(2){
   // padding-top:-5px;
    margin-bottom:6px;
    
     
  };
  &:last-child{
    padding-left:15px;
  }

  }


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
    margin-right:-30px;
    
    
   
  &:nth-child(4){
    position:absolute;
    left:-78px !important;
    top:48px !important;
    

  }

  &:first-child{
    position:absolute;
    left:12px !important;
   width:50% !important;
    
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
color:lightgreen !important;
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
  left:-42px;
  font-size:14px;
  font-weight:800;
  color:lightcoral !important;
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




const StyledLinked = styled.div`
display:flex;
justify-content:flex-end;
align-items:flex-end;
cursor: pointer;
position: relative;

position:absolute;
//right:0;
left:190%;
bottom:-3px;

a{
  font-size:25px;
  padding-right:40px;
  margin-left:-30px;
 // margin-right :-250px;
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
height:15vh !important;
  }

  }
  
  
}


form{
 // padding-bottom:10px;
 display:flex;
 flex-direction:column;
 
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
height:15vh;
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







const Form = styled.div`
   background-color:rgb(226,135,67,);


  width:90%;
  //height:30vh;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  margin-left:10%;
padding-top:5px;
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
  font-weight:800;
  text-transform:uppercase;
  color:#996600;
}

`

const DivContainer = styled.div`

 margin-top:60px;
p{
  
  font-size:20px;

}
`


const Container = styled.div`

 background-color:#ff9900;
 width:100%;

 // z-index:9;
  height:85vh;
 position: relative;
 padding-bottom:20px;
 position: absolute;
 top:6px;
 


`

const Contain = styled.div`
position: relative;
//bottom:30px;
//z-index:999;
//padding-bottom:25px;



`




















/*const Order = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    product: '',
    quantity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the order with formData
    console.log("Form submitted");
    // Clear the form after submission
    setFormData({
      name: '',
      email: '',
      address: '',
      product: '',
      quantity: '',
    });
  };

  return (
    <Container>
      <OrderForm>
      
      
        <p>
          Fill out the form below to place your order. Once we receive your order, we'll contact
          you for payment and delivery details.
        </p>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="address">Address</label>
            <textarea
    name="address"
    id="address"
    value={formData.address}
    onChange={handleChange}
    required
  ></textarea>




          </FormGroup>
          <FormGroup>
            <label htmlFor="product">Product</label>
            <input
              type="text"
              id="product"
              name="product"
              value={formData.product}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <SubmitButton type="submit">Place Order</SubmitButton>
        </Form>
      </OrderForm>
    </Container>
  );
};
export default Order

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px); 
 // background-color: #f7f7f7;
  //background-color: #ffffff;
  background-color:rgb(226,135,67,) !important;
`;

const OrderForm = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  border-radius: 8px;
  background-color: #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
 height:140vh;
// position: relative;



  p {
    font-size: 1rem;
    margin-top: 10rem;
    font-weight:600;
    font-size:13px;
    text-align:center;
  
  }

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    display: block;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  textarea {
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  padding: 0.7rem 1.5rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
`;*/


