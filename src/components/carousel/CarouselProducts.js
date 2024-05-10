import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { shortenText } from '../utils'
import "./Carouseltem"
import PageHeading from '../homeBox/PageHeading'







const CarouselProducts = ({imageUrl, name, price, description}) => {
  return (
    <Container>
      <Header>  
      <PageHeading  heading={"Latest Product"} btnText={"Shop Now>>>"} />      
       </Header>
         <Contain  >
      
            <NavItem to={"/product-details"} >
              <ImgPhoto>
                <img src={imageUrl} alt="" />
                </ImgPhoto>


                <ItemDetails> 
                  <div> 
                <p>{`${price}`} </p>
                <h4>  {  name &&  shortenText(name, 18)} </h4>
                <p  > {description && shortenText(description, 26 ) }  </p>
                </div>
                </ItemDetails>
             

            </NavItem>
            <Button >
             <p>
            Add To Cart
            </p>
                 </Button>
        
        </Contain>

        </Container>
  )
}

export default CarouselProducts

const Container = styled.div`

width:100%;
height:80vh;
background-color:darkgray;

@keyframes slide-up {
    0% {
      transform: translateY(-5rem);
    }
    100% {
      transform: translateY(0);
    }
  };
`

const Button = styled.div`
 animation: slide-up 0.5s ease;
position: absolute;
  margin-bottom:14px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  //padding-bottom:60px;
  height: 40px;
  background-color:white;
  opacity:0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  padding:0 10px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
transform:translate scale(1)
  p{
    font-size:14px;
    font-weight:600;
    color:blue;
    animation:slide-up 0.3s ease;
  }

`


const Contain= styled.div`

&:hover{
 
   ${Button}{
     background-color:#a4852a;
     opacity:1;
     cursor: pointer;
     transition:all 0.8s linear;
    
   }
}


position: relative;

`
const Header = styled.div`
display:flex;
`
const NavItem = styled(Link)`

text-decoration:none;
display:flex;
flex-direction:column;


`

const ImgPhoto = styled.div`

margin-left:5px;
@media (max-width:768px) {
  img{
  width:250px !important;
height:41vh !important;



}
}



img{
  width:310px;
height:41vh;
border-radius:10px  !important;
&:hover{
  box-shadow: 0px -10px 20px rgba(0, 0, 0, 0.5);
}


}


`
const ItemDetails = styled.div`

display:flex;
justify-content:space-around;
flex-direction:column ;
align-items:center;
text-align:center;
line-height:0;
border:1px solid lightblue;
border-radius:5px;
background-color:#cc9900;

p{
  text-decoration:none;
};

div{
  p{
    font-size:17px;
    
  }

  h4{
    font-size:18px;
    color:#ffcc00;
 

  }
}
`




/*const CarouselProducts = ({imageUrl, name, price, description}) => {
  return (
    <Container>
         <Contain  >

            <Link to={"/product-details"} >
                <img src={imageUrl} alt="" />

                <p>{`$${price}`} </p>
                <h4>  {  name &&  shortenText(name, 18)} </h4>
                <p  > {description && shortenText(description, 26 ) }  </p>
             
            </Link>
            <button >
                Add To Cart
                 </button>
        
         CarouselProducts
        </Contain>

        </Container>
  )
}

export default CarouselProducts

const Container = styled.div`



`

const Contain= styled.div`



`*/