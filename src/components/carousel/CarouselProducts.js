import React from 'react';
import { Link } from 'react-router-dom';
import { shortenText } from '../utils';
import DOMPurify from 'dompurify';
import { ADD_TO_CART } from '../../feature/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { saveCartDB } from '../../feature/cart/cartSlice';
import { Box, Typography, Button, CardMedia } from '@mui/material';
import PageHeading from '../homeBox/PageHeading';

const CarouselProducts = ({ imageUrl, name, price, product, regularPrice, description }) => {
  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem('cartItems')) }));
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', backgroundColor: 'darkgray' }}>
      <Box  
    sx={{
       width: '100%', '&:hover .hoverButton': { backgroundColor: '#a4852a', opacity: 1, transition: 'all 0.8s linear', zIndex: 999 } }}>
        <PageHeading heading="Latest Product" btnText="Buy Now >>>" />
        <Link to={`/product-details/${product?._id}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ marginLeft: '5px', '@media(max-width:768px)': { width: '100% !important' } }}>
            <CardMedia
              component="img"
              image={imageUrl}
              alt={name}
              sx={{
                width: '100%',
                height: '200px',
                borderRadius: '10px',
                '&:hover': { boxShadow: '0px -10px 20px rgba(0, 0, 0, 0.5)' }
              }}
            />
          </Box>
          <Box sx={{
            padding: '10px',
            border: '1px solid lightblue',
            borderRadius: '5px',
            backgroundColor: '#cc9900',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            '@media(max-width:768px)': {
              padding: '6px',
              div: {
                p: {
                  whiteSpace: 'nowrap !important',
                  fontSize: '14px !important',
                },
              },
            },
          }}>
            <Typography component="span" sx={{ display: 'block', marginBottom: '5px' }}>
              <del>${regularPrice}</del>
            </Typography>
            <Typography component="span" sx={{ display: 'block', marginBottom: '5px' }}>
              ${price}
            </Typography>
            <Typography component="h4" sx={{ fontSize: '18px', color: '#ffcc00', marginBottom: '5px' }}>
              {name && shortenText(name, 18)}
            </Typography>
            <Box sx={{ position: 'relative' }}>
              <Typography
                component="body2"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(shortenText(description, 70)) }}
                sx={{
                  fontSize: '16px',
                  wordBreak: 'break-word',
                  whiteSpace: 'wrap',
                  overflowWrap: 'break-word',
                  '@media(max-width:768px)': {
                    fontSize: '14px',
                  },
                }}
              />
            </Box>
          </Box>
        </Link>
        <Box sx={{ position: 'relative', zIndex: 999, width: '100%', display: 'flex', justifyContent: 'center', marginTop: '5px', }}>
         <Box
     
         
         sx={{
          paddingBottom:'20px',
         }}
         >
         <Button className="hoverButton" 
            onClick={() => addToCart(product)} 
            sx={{ 
              width: '120px', 
              height: '40px',
              backgroundColor: 'white', 
              opacity: 0, 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px', 
              cursor: 'pointer', 
              boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.5)',
              p: { 
                fontSize: '14px', 
                fontWeight: 400, 
                color: 'blue',
              } 
            }}
          >
            <Typography sx={{ whiteSpace: 'nowrap' }}>Add To Cart</Typography>
          </Button>


         </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CarouselProducts;







// import React from 'react';
// import { Link } from 'react-router-dom';
// import { shortenText } from '../utils';
// import DOMPurify from 'dompurify';
// import { ADD_TO_CART } from '../../feature/cart/cartSlice';
// import { useDispatch } from 'react-redux';
// import { saveCartDB } from '../../feature/cart/cartSlice';
// import { Box, Typography, Button,CardMedia } from '@mui/material';
// import PageHeading from '../homeBox/PageHeading';

// const CarouselProducts = ({ imageUrl, name, price, product, regularPrice, description }) => {
//   const dispatch = useDispatch();

//   const addToCart = (product) => {
//     dispatch(ADD_TO_CART(product));
//     dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem('cartItems')) }));
//   };

//   return (
    
//     <Box sx={{ marginBottom:'20px', position:'relative', width: '100%', height: '90vh', backgroundColor: 'darkgray', /*@media(max-width:768px)': { width: '100%' }*/}}>
//       <Box sx={{ width:'100%', position: 'relative', '&:hover .hoverButton': { backgroundColor: '#a4852a', opacity: 1, transition: 'all 0.8s linear', zIndex: 999} }}>
//         <PageHeading heading="Latest Product" btnText="Buy Now >>>" />
//         <Link to={`/product-details/${product?._id}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
//           <Box sx={{ marginLeft: '5px', '@media(max-width:768px)': { width: '100px !important',/* height: '35vh'*/ } }}>
//             <img src={imageUrl} alt=""
            
//             sx={{ 
  
//              width: '310px', 
//            //  height: '41vh',
//              borderRadius: '10px',
//               '&:hover': { boxShadow: '0px -10px 20px rgba(0, 0, 0, 0.5)' }

//               }} />
//           </Box>
//           <Box sx={{
//             padding: '10px',
//             border: '1px solid lightblue',
//             borderRadius: '5px',
//             backgroundColor: '#cc9900',
//             width:'100%',
//            // position: 'relative',
//             display: 'flex',
//             justifyContent: 'center',
//             flexDirection: 'column',
//             alignItems: 'center',
//             textAlign: 'center',
//             '@media(max-width:768px)': {
//               padding: '6px',
//               div: {
//                 p: {
//                   whiteSpace: 'nowrap !important',
//                   fontSize: '14px !important',
//                 },
//               },
//             },
//           }}>
//             <Typography component="span" sx={{ display: 'block', marginBottom: '5px' }}>
//               <del>${regularPrice}</del>
//             </Typography>
//             <Typography component="span" sx={{ display: 'block', marginBottom: '5px' }}>
//               ${price}
//             </Typography>
//             <Typography component="h4" sx={{ fontSize: '18px', color: '#ffcc00', marginBottom: '5px' }}>
//               {name && shortenText(name, 18)}
//             </Typography>
//         <Box
//         sx={{
//           position:'relative',
//           //width:'100%',
          


//         }}
//         >
//         <Box>
      
        
//         <Typography
//               component="body2"
//               dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(shortenText(description, 80)) }}
//               sx={{
//                 fontSize: '16px',
//                 wordBreak: 'break-word',
//                 whiteSpace:'wrap',
//                 overflowWrap:'break-word',
//                // width:'950px',
//                 '@media(max-width:768px)': {
//                   fontSize: '14px',
//                 },
//               }}
//             />
//             </Box>
//         </Box>
//           </Box>
//         </Link>
//         <Box sx={{ marginBottom: '300px', position: 'relative', zIndex: 999, width: '100%', '@media(max-width:768px)': { fontSize: '14px', whiteSpace: 'nowrap',width: '100%',  } }}>
//           <Button className="hoverButton" 
//           onClick={() => addToCart(product)} 
//           sx={{ position: 'absolute', 
//           marginBottom: '40px',
//            left: '50%', 
//            transform: 'translateX(-50%)',
//             width: '120px', height: '40px',
//              backgroundColor: 'white', 
//              opacity: 0, display: 'flex',
//               justifyContent: 'center',
//                alignItems: 'center',
//                 borderRadius: '5px', 
//                 cursor: 'pointer', 
//                 padding: '0px 17px', 
//                 boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.5)',
//                  p: { fontSize: '14px', 
//                  fontWeight: 400, color: 'blue',
        
//           } 
      
          
          
//           }}>
//             <Typography
//             sx={{
//               whiteSpace:'nowrap',
//             }}
//             >Add To Cart</Typography>
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default CarouselProducts;





/*import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { shortenText } from '../utils';
import DOMPurify from 'dompurify';
import { ADD_TO_CART } from '../../feature/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { saveCartDB } from '../../feature/cart/cartSlice';
import  {Typography} from '@mui/material';
import PageHeading from '../homeBox/PageHeading';


const CarouselProducts = ({ imageUrl, name, price, product,regularPrice, description }) => {
  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem('cartItems')) }));
  };

  return (
    <Container>
      <Contain>
       
      <PageHeading  heading={'Latest Product'} btnText={'Buy Now>>>'} />
        <NavItem to={`/product-details/${product?._id}`}>
          <ImgPhoto>
            <img src={imageUrl} alt="" />
          </ImgPhoto>
          <ItemDetails>
            <div>
              <span><del>${regularPrice}</del> </span>
              <span>${`${price}`}</span>
            
              <h4>{name && shortenText(name, 18)}</h4>
              <p
                //textAlign:'start'
                sx={{
                 // whiteSpace:'nowrap',
               //   width:'100px',
                 '@media(max-width:768px)':{
                  fontSize:'14px',
                //  width:'400px',
                 
                 }
                }}
               
             dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize( shortenText(description, 60)) }} >
              </p>
            </div>
          </ItemDetails>
        </NavItem>
       
      
        <Click> 
      
        <Button onClick={() => addToCart(product)}>
          <p   >Add To Cart</p>
       
        </Button>
        </Click>

      
      
      </Contain>
    </Container>
  );
};

export default CarouselProducts;


const  Click = styled.div`
margin-bottom:300px;
position:relative;
z-index:999;
width:100%;
//height:100vh;
@media(max-width:768px){
font-size:14px;
whiteSpace:wrap
  }

`

const Container = styled.div`
  width: 100%;
  height: 90vh;
  background-color: darkgray;
  @media(max-width:768px){
    width: 100%;
  //height: 100%;
  }


`;

const Button = styled.div`
  position: absolute;
  margin-bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 40px;
  background-color: white;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;

  padding: 0px 10px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
  p {
    font-size: 14px;
    font-weight: 600;
    color: blue;
   
  
 
  }
  //z-index:1;
`;

const Contain = styled.div`
  position: relative;
  &:hover {
    ${Button} {
      background-color: #a4852a;
      opacity: 1;
      cursor: pointer;
      transition: all 0.8s linear;
      z-index:20;
    
    }
  }
`;

const NavItem = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
`;

const ImgPhoto = styled.div`
@media (max-width:768px) {
  width: 100px !important;
    height: 35vh;
 
}
  margin-left: 5px;
  img {
    width: 310px;
    height: 41vh;
    border-radius: 10px;
    &:hover {
      box-shadow: 0px -10px 20px rgba(0, 0, 0, 0.5);
    }
  }
`;

const ItemDetails = styled.div`
@media (max-width:768px) {
  padding:6px;
  //height:auto;
 
  div{
    p{
      white-space:nowrap !important;
      font-size:14px !important;
    }
  }
}

position: relative;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 0 ;

 padding:10px;
  border: 1px solid lightblue;
  border-radius: 5px;
  background-color: #cc9900;
  p {
    text-decoration: none;
  }
  div {
    p {
      font-size: 17px;
    }
    h4 {
      font-size: 18px;
      color: #ffcc00;
    }
  }
`;*/












