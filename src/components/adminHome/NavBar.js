






import React from 'react'
import styled from 'styled-components'
import  {FaUserCircle} from "react-icons/fa"
import { useSelector } from 'react-redux'
import { NavLink , Link} from 'react-router-dom'


const NavBar = () => {
    const {user} = useSelector((state)=> state?.auth)
    const userName = user?.name
   
    //console.log(userName)
  return (
    <Container>
          <Contain>
         
          <NavContainer>
            <div>
         <FaUserCircle size={40} color="#fff" />
         <p> {userName} </p> 
       
            </div>
      
            </NavContainer>
      
          </Contain>
          <NavProduct>
  
             <div>    
       
   <NavLink to={"/admin/home"}>
      
       <p>Home </p> 
       
  
     </NavLink>
          
   <NavLink to={"/admin/category"}>

   <p>Categories </p> 
 
    </NavLink>
   
    
        <NavLink to={"/all-products"}  >
   <p>All Products</p>  
      
        </NavLink>   
        <NavLink to={"/add-products"}>
   <p>Add Products</p>  
  
        </NavLink>  
        <NavLink  >
       <p>orders</p>  
 
        </NavLink>  
     

        </div>

     
          
            </NavProduct>
        
   
    </Container>
  )
}

export default NavBar



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
const NavProduct = styled.div`
border-top: 15px;


a {

  text-decoration: none !important; 
  color: black; 
  position: relative;
  padding-bottom: 10px;
  animation: slide-up 0.5s ease;
  &:last-child{
    padding-right:13px;
    //text-align:center !important;
  }


 
}





a:hover{
    
    
    p{
       color: #009900;
    
    }

  
}

a:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  width:255px;
  border-bottom: 1px solid black; 
  @media (max-width:768px) {
    width:185px !important;
   a{
    &:last-child{
     
    }
   }
}
}

@media (max-width:768px) {
    width:185px !important;
  p {
    font-size: 13px !important;
    &:nth-child(4){
      text-align:center ;
 //   padding-right:10px !important;
    }
  }
}

div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-color:#FFFFFF;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  padding-top: -15px;
  margin-bottom: 12px ;
  border-radius:5px;

  p {
    font-size: 16px;
    text-decoration: none;
    line-height: 0;
    font-weight: 600;
    color: black;
  }
}







`








const Contain= styled.div`
margin:1px;
//border:1px solid darkblue;
border-radius:5px;
background-color:#6600ff;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
width:20vw;
height:20vh;;

    

//border:1px solid black;
@media(max-width:768px) {
    width:35vw !important;
    
}

`
const NavContainer = styled.div`

animation: slide-up 0.5s ease;

padding:8px;
//position: relative;

div{
    display:flex !important;
align-items:center;
justify-content:center;
flex-direction:column;
svg{
  cursor:pointer;
}
//position: relative;

p{
    color:black!important;
    line-height:0;
    font-weight:600;
   // z-index:999;
}
}


`

/*a.active::before {
  content: '';
  position: absolute;
  top: 0; 
  left: 320%; 
  transform: translateX(-50%); 
  width: 1px; 
  height:100%; 
  background-color: blue ;
  @media (max-width:768px) {
    left: 290% !important; 
  }

 }

 
 &.active > {
    color: green; 


 }*/