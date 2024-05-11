import React from 'react'
import { toast, } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {
    FormGroup,
    FormControlLabel,
    Checkbox,
     Divider,
      Stack,
      Typography,
      Button,

} from '@mui/material'
import { useState } from 'react'
import { SAVE_PAYMENT_METHOD } from '../../feature/checkOut/checkOutSlice';





const PaymentOptions = () => {
   const {isLoggedIn} = useSelector((state)=> state.auth)
    const styling = {
        border:'1px solid black',
        borderRadius:'5px',
        padding:'2px',
        margin: '5px 0'
    }

    const [selectedOption, setSelectedOption] = useState('');
  
  

     const dispatch = useDispatch()
     const navigate = useNavigate()

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.name);
    };

    const setPayment = (e)=>{
        e.preventDefault()
        if(selectedOption === ''){
            return toast.error('please select a payment method')
        }
        else{
         dispatch(SAVE_PAYMENT_METHOD(selectedOption))   
        }
        if(isLoggedIn){
          navigate('/checkout-details')
        }
        else{
            navigate('/?redirect=cart')
        }
        
    }


  return (
    <Stack  
   sx={{
  //  paddingBottom:'30px'
   }}
    >
        <Divider component='li'  sx={{ 
            listStyleType:'none', 
            marginBottom:'8px',
         padding:'10px',
        
            
            }} />
        <Typography
        fontSize={'14px'}
        component={'p'}
        variant='body2'
        sx={{
            color:'red'
        }}
        >

         Please Choose A Payment Method
        </Typography>
     <Stack spacing={1}>
     <FormGroup>
    <FormControlLabel
   sx={styling}
      control={<Checkbox checked={selectedOption === 'stripe'} 
      onChange={handleOptionChange} 
      name="stripe" />}
      label="Stripe"
        inputProps={{
        'aria-label':'stripe'
 }}
    />
    <FormControlLabel
    sx={styling}
      control=
      {<Checkbox checked={selectedOption === 'wave'} 
      onChange={handleOptionChange} name="wave" />}
      label="FlutterWave"
      inputProps={{
        'aria-label':'wave'
      }}
    />

<FormControlLabel
sx={styling}
      control={<Checkbox checked={selectedOption === 'paypal'} 
      onChange={handleOptionChange} name="paypal" />}
      label="Paypal"
      inputProps={{ 'aria-label':'paypal' }}
    />

      <FormControlLabel
      sx={styling}
      control={<Checkbox checked={selectedOption === 'wallet'}
       onChange={handleOptionChange} name="wallet" />}
      label=" Wallet"
      inputProps={{ 'aria-label':'wallet' }}
    />
  
  </FormGroup>
  <Button
   color='success'
   variant='contained'
   onClick={setPayment}
sx={{
    marginBottom:'5px'
}}
   > CheckOut  
   </Button>
  <Typography
 
 sx={{
    textAlign:'center',
    fontSize:'13px',
    lineHeight:0,
    color:'blue'
 }}
 >
    Tax and shipping calculated at checkout
 </Typography>


     </Stack>
    </Stack>


  )
}

export default PaymentOptions