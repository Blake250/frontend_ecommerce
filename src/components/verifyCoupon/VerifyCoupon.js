

import React, { useState } from 'react';
import { Button, Typography, TextField, Stack, Box, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { REMOVE_COUPON, getACoupon } from '../../feature/coupon/couponSlice';
import { useDispatch } from 'react-redux';
import { toast, } from 'react-toastify';



export  const CartDiscount = () => {
  const { coupon } = useSelector((state) => state?.coupon);
  const { initialCartTotalAmount } = useSelector((state) => state?.cart);
  const styling = {
    color: 'blue',
    fontWeight: '400',
    fontSize: '15px',
    border: '2px solid red',
    borderRadius: '5px',
    padding: '5px',
    textAlign: 'center'
  };

  return (
    <>
      <Typography component='p' variant='body1' color='info' sx={styling}>
        <span>   initial Total: </span> ${initialCartTotalAmount}|
        <span>   coupon Name: </span> {coupon?.name}|
        <span>   coupon discount: </span> {coupon?.discount}
      </Typography>
    </>
  );
};

const VerifyCoupon = () => {
  const [couponName, setCouponName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { coupon } = useSelector((state) => state?.coupon);
  const { cartTotalAmount, initialCartTotalAmount } = useSelector((state) => state?.cart);

  const dispatch = useDispatch();

  const verifyCoupon = (e) => {
    e.preventDefault();
    dispatch(getACoupon(couponName));
    toast.success("coupon discount added successfully")
 //   console.log(`here is the coupon data: ${couponName}`)
  };


  const removeCoupon = () => {

    dispatch(REMOVE_COUPON())
    toast.success("coupon discount reverted successfully")
  };

  return (
    <Box   display="flex" flexDirection="column" rowGap="5px">
      {coupon !== null && <CartDiscount />}
      <Stack spacing={4} direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body1" fontWeight="200">
          Have a coupon?
        </Typography>
        {coupon === null ? (
          <Box sx={{ marginLeft: '40px' }}>
            <Typography
              onClick={() => setShowForm(true)}
              sx={{
                textAlign: 'end',
                fontSize: '15px',
                paddingLeft: '10px',
                '&:hover': {
                  color: 'red'
                },
                cursor: 'pointer'
              }}
            >
              Add coupon
            </Typography>
          </Box>
        ) : (
          <Button onClick={() => setShowForm(true)} variant="filled" sx={{ fontWeight: '200', fontSize: '13px', cursor: 'pointer' }}>
            <Typography 
             onClick={removeCoupon}
            sx={{ textAlign: 'start', fontSize: '12px' }}>Remove coupon</Typography>
          </Button>
        )}
      </Stack>
      <Stack sx={{ display: 'flex', flexWrap: 'nowrap',  }} direction="row" alignItems="center">
        {showForm && (
          <Stack direction="row" spacing={15} alignItems='center'>
            <TextField
              label="Coupon Name"
              variant="outlined"
              name="couponName"
              value={couponName}
              onChange={(e) => setCouponName(e.target.value.toUpperCase())}
              size="small"
            />
            <Button onClick={verifyCoupon} size="medium" color="success" variant="contained">
              Verify
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default VerifyCoupon;
















/*import React, { useState } from 'react';
import { Button, Typography, TextField, Stack, Box,Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { getACoupon } from '../../feature/coupon/couponSlice';
import { useDispatch } from 'react-redux';


const CartDiscount = ()=>{
    const { coupon } = useSelector((state) => state?.coupon);
    const { initialCartTotalAmount} = useSelector((state)=> state?.cart)
    const styling = {
   
        color:'blue',
        fontWeight:'400',
        fontSize:'15px',
      border:'2px solid red',
      borderRadius:'5px',
      padding:'5px',
      textAlign:'center'
    }

  return(
   
    <>
    
    <Typography
    component='p'
    variant='body1'
    color='info'
   sx={styling}
    >
        <span>   initial Total: </span> ${initialCartTotalAmount}|
        <span>   coupon Name: </span> {coupon?.name}|
        <span>   coupon discount: </span> {coupon?.discount}%|

 

    </Typography>
    </>
  )

}






const VerifyCoupon = () => {
  const [couponName, setCouponName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { coupon } = useSelector((state) => state?.coupon);
  const {cartTotalAmount, initialCartTotalAmount} = useSelector((state)=> state?.cart)

  const dispatch = useDispatch()

  const verifyCoupon = (e) => {
    e.preventDefault()
    dispatch((couponName))
  
    
  };

  const removeCoupon = () => {
  
  };

  return (
    <Box display="flex" flexDirection="column" rowGap="5px">
       {coupon !== null &&   <CartDiscount/>}
      <Stack spacing={4} direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body1" fontWeight="200">
          Have a coupon?
        </Typography>
        {coupon === null ? (
         <Box  sx={{marginLeft:'40px'}} >

          <Typography
          onClick={() => setShowForm(true)} 
           sx={{ textAlign: 'end', 
          fontSize: '15px' ,
          paddingLeft:'10px',
          '&:hover':{
           color:'red',
          },

          cursor:'pointer',
          
          }}>Add coupon</Typography>


         </Box>
        ) : (
          <Button onClick={() => setShowForm(true)} variant="filled" sx={{ fontWeight: '200', fontSize: '13px', cursor:'pointed' }}>
            <Typography sx={{ textAlign: 'start', fontSize: '12px' }}>Remove coupon</Typography>
          </Button>
        )}
      </Stack>
      <Stack
        sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between' }}
        direction="row"
        alignItems="center"
        justifyContent='space-between'
     
      >
        {showForm && (
          <Box onSubmit={verifyCoupon} style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Coupon Name"
              variant="outlined"
              name="couponName"
              value={couponName}
              onChange={(e) => setCouponName(e.target.value.toUpperCase())}
             // fullWidth
              size="small"
            />
          </Box>
        )}
     

      <Button 

       sx={{
     
     padding:'8px'
    
    }}
        size="medium" 
        color="success" 
        variant="contained">
            
          Verify
        </Button>
     
      </Stack>
    </Box>
  );
};

export default VerifyCoupon;*/







