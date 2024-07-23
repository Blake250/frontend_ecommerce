






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
    <Box sx={{  height: '100%', position: 'relative', width: '100%', backgroundColor: 'darkgray', padding: '10px', boxSizing: 'border-box' }}>
      <Box sx={{
       height:'100%',
        
        width: '100%', '&:hover .hoverButton': { backgroundColor: '#a4852a', opacity: 1, transition: 'all 0.8s linear', zIndex: 999 } }}>
        <PageHeading heading="Latest Product" btnText="Buy Now >>>" />
        <Link to={`/product-details/${product?._id}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ marginBottom: '5px' }}>
            <CardMedia
              component="img"
              image={imageUrl}
              alt={name}
              sx={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '10px',
                '&:hover': { boxShadow: '0px -10px 20px rgba(0, 0, 0, 0.5)' }
              }}
            />
          </Box>
          <Box
          
          sx={{
            // display:'flex',
            // flexDirection:'row',
            // justifyContent:'center',
            // alignItems:'center'
            maxHeight:'200px !important ',
          }}
          > 
          <Box sx={{
           // padding: '10px',
            border: '1px solid lightblue',
            height:'150px !important ',
            borderRadius: '5px',
            backgroundColor: '#cc9900',
            width: '100%',
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center !important',
            textAlign: 'center'
          }}>
            <Typography component="span" sx={{ display: 'block', marginBottom: '5px' }}>
              <del>${regularPrice}</del>
            </Typography>
            <Typography component="span" sx={{ display: 'block', marginBottom: '5px' }}>
              ${price}
            </Typography>
            <Typography component="h4" sx={{ fontSize: '18px', color: '#ffcc00',  marginBottom: '5px' }}>
              {name && shortenText(name, 18)}
            </Typography>
            <Box
          sx={{
            textAlign:'center!important',
            display:'flex',
            alignItems:'center',
            
          }}
            >   
            <Typography
              component="body2"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(shortenText(description, 50)) }}
              sx={{
                fontSize: '16px',
               wordBreak: 'break-word',
                whiteSpace: 'wrap',
                overflowWrap: 'break-word',
              //  textAlign:'center !important',
                '@media(max-width:768px)': {
                  fontSize: '14px',
                },
              }}
            />
            </Box>
          </Box>
          </Box>
        </Link>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <Button
            className="hoverButton"
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
  );
};

export default CarouselProducts;








/*import React from 'react';
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
    <Box sx={{ height:"100% !important ",position: 'relative', width: '100%', backgroundColor: 'darkgray' }}>
      <Box  
    sx={{
       width: '100%', '&:hover .hoverButton': { backgroundColor: '#a4852a', opacity: 1, transition: 'all 0.8s linear', zIndex: 999 } }}>
        <PageHeading heading="Latest Product" btnText="Buy Now >>>" />
        <Link to={`/product-details/${product?._id}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ marginLeft: '5px', '@media(max-width:768px)': { width: '100% !important',height: '100% !important' } }}>
            <CardMedia
              component="img"
              image={imageUrl}
              alt={name}
              sx={{
                width: '100%',
                height: '200% !important',
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
          // height:'100% !important',
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

export default CarouselProducts;*/







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


