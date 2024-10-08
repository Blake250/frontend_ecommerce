





import React, {useEffect} from 'react';
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';

import CarouselItem from '../carousel/Carouseltem';
import CarouselProducts from '../carousel/CarouselProducts';
import ProductCategory from './ProductCategory';

import BaseItems from '../footerBase/BaseItems';
import FooterLinks from '../footerBase/FooterLinks';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../feature/product/productSlice';

const HomeInfo = () => {
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const latest = products && products.filter((product) => product.quantity > 0).slice(0, 10);
  const latestPhones = products
    ?.filter((product) => product.quantity > 0)
    ?.slice(0, 8)
    ?.filter((product) => product.price > 100);

  const latestProducts = latest && latest.map((item) => {
    if (!item || Object.keys(item).length === 0) {
      console.log("No data exist");
      return null;
    }

    return (
      <div
     
      key={item.id}>
        <CarouselProducts
          name={item.name}
          imageUrl={item.image[0]}
          regularPrice={item.regularPrice}
          price={item.price}
          description={item.description} 
          product={item}
          
        />
     </div>
    );
  });

  const phoneProducts = latestPhones?.map((item) => {
    if (!item || Object.keys(item).length === 0) {
      console.log("No data exist");
      return null;
    }

    return (
      <div key={item.id}>
        <CarouselProducts
          name={item.name}
          imageUrl={item.image[0]}
          regularPrice={item.regularPrice}
          price={item.price}
          description={item.description} // Access description directly
          product={item}
        />
      </div>
    );
  });

  return (
    <Container>
      <Contain>
        <HouseSections>
          <SectionA>
            <img src="./images/features/f1.png" alt="" />
            <NavLink to={"/order"}> <h6>Free Shipping</h6> </NavLink>
          </SectionA>
          <SectionB>
            <img src="./images/features/f2.png" alt="" />
            <h6>Online Order</h6>
          </SectionB>
          <SectionC>
            <img src="./images/features/f3.png" alt="" />
            <h6>Save Money</h6>
          </SectionC>
          <SectionD>
            <img src="./images/features/f4.png" alt="" />
            <h6>Promotions</h6>
          </SectionD>
          <SectionE>
            <img src="./images/features/f5.png" alt="" />
            <h6>Happy Sell</h6>
          </SectionE>
          <SectionF>
            <img src="./images/features/f6.png" alt="" />
            <NavLink to={"./footer"}> <h6>24/7 Support</h6> </NavLink>
          </SectionF>
        </HouseSections>
        <Phone>
        <ProductStyle>
          <CarouselItem products={latestProducts} />
        </ProductStyle>
        <CategoryBar>
          <div>
            <span>Categories</span>
            <ProductCategory />
          </div>
        </CategoryBar>
       
         
        <PhoneClass>
       
          <CarouselItem products={phoneProducts} />
         
        </PhoneClass>
        </Phone>
        <BaseItems />
        <FooterLinks />
      </Contain>
    </Container>
  );
};

export default HomeInfo;

const Phone  = styled.div`
height:100% !important;
`
const PhoneClass  = styled.div`
height:100%!important;
background-color:darkgray;
width:100%;
@media(max-width:768px){
    width: 100%;
  height: auto;
  div{span{
    font-size:15px !important;
  }}
  }

div{
 // padding:5px 0;
 padding-top:13px 0 10px 0 ;
  border-radius:5px;
//padding-top:6px;
text-align:center !important;
//display:flex;



  span{

  font-weight:400;
  color:green;
   font-size:15px;
  text-align:'center';


}

} 


`


const ProductStyle = styled.div`
height:100% !important;
`
const Container = styled.div`

   width:100%;
  height:100% !important;
  border-top-right-radius:10px;
  border-top-left-radius:10px;
  //background-color:yellow;
  
   
`
const CategoryBar = styled.div`
@media(max-width:768px){
  width:100%;
  //height:30vh !important;
// padding-top:60px;
height:400px !important;
max-height:410px !important;
}
background-color:#006666;
width:100%;
height:100% !important;
//margin-bottom:-10px ;
div{
  padding-top:3px ;
  span{
    font-weight:600;
   font-size:20px;
  }
};
@media (max-width: 400px) {
    width: 100%;
    height: 500px!important;
  
    div {
      padding-top: 2px;
      span {
        font-size: 18px;
      }
    }
  }


`
const HouseSections = styled.div`

display:flex;
flex-wrap:wrap;
justify-content:space-evenly;
cursor:pointer;
background-color:#ccc;
//margin:5px;
  
 padding:4% 5%;


  @media (max-width:768px) {
  padding:4% 2% !important;
  };
`

const Contain = styled.div`
margin-bottom:0 !important;




`


const SectionA = styled.div`
    display:flex;
  flex-direction:column;
  justify-content:center;;
 // align-items:center;
  padding-top:5px ;
  //padding-bottom:5px;
  margin-bottom:25px;



  box-shadow: 0px -10px 20px rgba(0, 0, 0, 0.5);
 
  &:hover{
    box-shadow: 0px -5px 30px rgba(0, 0, 0, 0.5);
  }
  
  background-color:#D5987F ;
 width:15%;
 height:28vh;

  h6{
    text-align:center;

    background-color:lightblue ;
    color: #088178;
    font-size:15px;
  border-radius:5px;


  margin-top:5%;
  margin-left:3%;
  margin-right:3%;

   padding:12px 25px ;
   &:hover{
    color:darkblue;
   }

  };
  

 // padding:4% 2% 0 2%;
 //padding:2% 1% 0 1%;
 padding-top:2%;
  border-radius:10px;
line-height:1;
 @media (max-width:768px) {
  padding:4% 2% 0 2% !important;
    width:30% !important ;
    height:21vh;
    flex: 0 0 calc(10% - 20px) !important;
    line-height:0 !important;
    h6{
    text-align:center;
    padding:14px 14px !important ;
    margin-right:-2%  !important;
    font-size:13px !important;
   margin-top:8px;
   white-space:nowrap;
 
   
  };
  
  
  };


  img{
    width:150px;

  @media (max-width:768px) {
    width:120px !important;
   
  }
  }
`

const SectionB = styled(SectionA)`
background-color:#E5D18B ;
h6{
  background-color:#aea78d ;
}
`

const SectionC = styled(SectionA)`
background-color:rgba(229, 180, 139, 0.5);
h6{
  background-color:#ae7e93  ;
}

`

const SectionD = styled(SectionA)`
a{

  text-decoration:none;
}

  background-color:#C5D57F;
h6{
  background-color:#e6dfc9 ;

}

`

const SectionE = styled(SectionA)`
background-color:#D57FD1  ;
h6{
  background-color:#e1d4a5 ;
}
`

const SectionF = styled(SectionA)`
background-color:#735c66 ;
h6{
  background-color:#c2a746 ;
};
a{

text-decoration:none;
}

`
























/*const HomeInfo = () => {
  return (
    <Container>
        <Contain>   
        HomeInfo
        </Contain>
    </Container>
  )
}

export default HomeInfo



const Container = styled.div`




`


const Contain = styled.div`




`*/