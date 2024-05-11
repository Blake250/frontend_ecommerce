import React, {useEffect} from 'react'

import {Button, Stack, Typography, Box, Link } from '@mui/material'
import Confetti from 'react-confetti'
import {useDispatch} from 'react-redux'
import { CLEAR_CART } from '../../feature/cart/cartSlice'

const CheckoutSuccess = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
  dispatch(CLEAR_CART())
  },[dispatch])

  return (
    <> 
    <Confetti
     // width={800}
      width={window.innerWidth}
    />
    <Stack
     sx=
     {{marginLeft: '50px',
     marginTop:'40px'
       
    }}
    direction={'row'} 
    
    spacing={2} >
     <Stack>
     <Typography
     variant='h3'
     component={'div'}
     color={'green'}

     >
 Checkout Successful
     </Typography>
     <Typography
     variant='body2'
     component={'div'}
     color={'green'}

     >
Thank you for your purchase
     </Typography>
     <Stack
   
     >
    <Button
   variant='contained'
    width='large'
    component="button"
  //  variant="body2"
    sx={{
     width:'180px',

   
    }}
    >
    <Link
      to={'/order-history'}
      sx={{
        whiteSpace:'nowrap',
        underline:'none',
        fontSize:'12px',
       color:'white',
       
      }}
      >View Order Status
      </Link>
    </Button>
     </Stack>
      
     </Stack>
      </Stack>
      </>
  )
}

export default CheckoutSuccess