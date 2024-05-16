

import React, {useEffect} from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import { CALCULATE_SUBTOTAL } from '../../feature/cart/cartSlice';
import { Box,  Stack, Typography,  } from '@mui/material';
import { Link } from 'react-router-dom';
import { CartDiscount } from '../verifyCoupon/VerifyCoupon';

const SummariesCheck = () => {
  const {cartItems, cartTotalQuantity, cartTotalAmount } = useSelector((state)=> state?.cart)
 // console.log(`here is the ${JSON.stringify(cartItems)}`)
  const {coupon} = useSelector((state)=> state?.coupon)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(CALCULATE_SUBTOTAL())
   }, [dispatch])


   const style = {
    fontSize: '13px',
    color:'blue',
    fontWeight:400,
    border:'1px solid black',
    borderRadius:'5px',
    padding:'5px'
   }
     
   const ProductStyle = {
    fontSize:'18px',
    color:'black',
    fontWeight:'600'
   }

   const textStyle = {
    fontSize:'13px',
  
   }


  return (
    <Stack >
     <Stack>
    {
      cartItems && cartItems?.length === 0 ?

      (
        <>  
        <Stack sx={{
         // display:'flex',
        //  flexDirection:'column',
          direction:'column',
          justifyContent:'space-between'
        }} >
           <Typography
           component={'p'}
           variant='body2'
           >
          No Items in your cart
          </Typography>
          <Link to={'/#products'} >
            Back To Shop
          </Link>
        </Stack>
        </>
      ):

     <>
         <Box
             sx={{
              display:'flex',
              flexDirection:'column',
              paddingTop:'5px',
             
             }}
             >
              <Typography
            
              variant='body1'
              component={'p'}
              color={'red'}
              sx={{  fontWeight:'600',}}
              >
                {`cart(s) items: ${cartTotalQuantity}`}
              </Typography>

            <Stack  direction='row'
            alignItems='center'
            spacing={2} 
            justifyContent='space-between'
          
            >
              <Typography
              component={'p'}
              variant='body1'
              sx={{
            fontWeight:'600',
            fontSize:'15px'
            }}
              >
                Subtotal:
              </Typography>
            <Typography
            
            variant='body1'
            component={'p'}
            color={'red'}
            fontSize={'20px'}
            fontWeight={'400'}
           paddingRight={'12px'}
            >
             ${cartTotalAmount.toFixed(2)}
            </Typography>
            </Stack>

            <Stack 
           
            spacing={2} 
            direction={'column'} 
          
            >
              <CartDiscount/>
              {
                cartItems?.map((item)=>{
                  const {_id, name, price, quantity, cartQuantity} = item
               return(
                <Stack key={_id}
                
                sx={style}
          
                 >
               <Box
             
               >
               <Typography
                 sx={ProductStyle}
               >
                Product:  {name}
               </Typography>
               
              
               </Box>
               <Box  >
               <Typography
                 sx={textStyle}
               >
                  Quantity : {quantity}
                </Typography>
              
               </Box>
               <Box>
               <Typography
                 sx={textStyle}
               >
               Unit Price : ${price}
                </Typography>
              
               </Box>
               <Box>
               <Typography
                 sx={textStyle}
               >
               Set Price : ${price * cartQuantity}
                </Typography>
              
               </Box>


               </Stack>
               )
                })
              }
            </Stack>
             </Box>
     </>
    }
     </Stack>
      
      </Stack>
  )
}

export default SummariesCheck