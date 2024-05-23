

import React from 'react';
import { Link } from 'react-router-dom';
import { CardMedia, CardActions, CardContent, Typography, Stack, Card, Button } from '@mui/material';
import { shortenText } from '../../utils';

import DOMPurify from 'dompurify';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from '../../../feature/cart/cartSlice';
import { saveCartDB } from '../../../feature/cart/cartSlice';


const ProductItem = ({ product, price, quantity ,regularPrice, grid, _id , name}) => {
 

 const dispatch = useDispatch()

/*  const handleClick = ()=>{
    if (quantity === 0){
      return  toast.error('Product is Out of stock')
    }
    else{
      return toast.success('product is added successfully')
    }
    
  }*/

  const handleClick = ()=>{

  
    dispatch(ADD_TO_CART(product));
    dispatch(saveCartDB({cartItems: JSON.parse(localStorage.getItem('cartItems')) }))
   
   
  }


  return (
    <Stack spacing={1} marginTop={4} sx={{ bgcolor: '#fff', height: '100%', width: '100%' }}>
    
      <Stack
      spacing={4}
  sx={{
    marginBottom:"1rem",
    
      
  
  }}
      
      >



        <Card sx={{ 
         // width: grid ? '18rem' : '45%',
         width: grid ? '18rem' : '50%',
    
         // height: '100%' ,
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: grid ? 'column' : 'row',
          padding:'7px',
          marginLeft: grid ? '0px' : '100px',
        
        
          '@media (max-width: 768px)': {
     
            width: grid ? '50%' : '96%',
            paddingRight:'30px'
          },
        }}>
          <Link to={`/product-details/${_id}`}>
            <CardMedia
              component="img"
              image={product?.image[0]}
              alt={product?.name}
             
              sx={{
                borderTop:'4px',
                
                width: '100%',
                height: '100%',
                height: grid ? '30vh' : '100%', 
                objectFit: 'cover',
                cursor: 'pointer',
                  
                '@media (max-width: 768px)': {
                 width: '100%', 
                
               //  marginRight:'30px',
               height: '100%',
                 objectFit: 'cover!important',
               
                },
              }}
            />
          </Link>
      
          <CardContent sx={{ 
          paddingLeft:'15px',
          //paddingTop:'15px',
      //   height:  '50vh' ,
       
          
           marginTop:'2px',
            flexGrow: 1, 
            textAlign:'center',
             border:'2px solid rgba(237, 50, 50, 0.2)',
             backgroundColor:'rgba(129, 104, 104, 0.2)',

              
          '@media (max-width: 768px)': {
     
          //  width: '100px', 
                
            //  marginRight:'30px',
       //  height: '50%',
          },
             }}>
          <Typography  variant='body1' component='h6' color='error'>
                  {regularPrice > 0 && <del>${regularPrice}</del>} ${price}
                </Typography>
                <Typography  variant='body1' component='h6' color='error'>

         
                {shortenText(name, 10)}
              

                </Typography>
               
                
             
          
                  {!grid && (
              <Typography sx={{
                fontSize:'13px',
                paddingTop:'20px'
               
              }} variant="body1" component="h6" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize( shortenText(product?.description, 90))  }} />
            )}
                
                <CardActions>
         

                <Button
                onClick={handleClick}
                  variant='contained'
                  color={quantity > 0 ? 'secondary' : 'error'}
                  size='small'
                  fullWidth = {true}
                  sx={{ fontSize: '13px',
                       whiteSpace:'nowrap',
                
                }}
                >
                  {quantity > 0 ? 'Add To Cart' : 'Out Of Stock'}
                </Button>

             
        
        </CardActions>
          </CardContent>
        </Card>
      
      </Stack>
    </Stack>
  );
};

export default ProductItem;