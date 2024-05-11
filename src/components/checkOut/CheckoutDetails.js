
import React, { useEffect } from 'react';
import { TextField, Grid, Divider,Box, Paper, Stack, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { useDispatch, useSelector } from 'react-redux';
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '../../feature/checkOut/checkOutSlice';
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'
import SummariesCheck from '../summariesCheck/SummariesCheck';

const CheckoutDetails = () => {
  const { biLingAddress, shippingAddresses, paymentMethod } = useSelector((state) => state?.checkout)
  const initialAddressState = {
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    phone: ''
  };

  const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState });
  const [billingAddress, setBillingAddress] = useState({ ...initialAddressState });
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (Object.keys(shippingAddresses)?.length > 0)
      setShippingAddress({ ...shippingAddresses })
    if (Object.keys(biLingAddress)?.length > 0) {
      setBillingAddress({ ...biLingAddress })
    }
  }, [biLingAddress, shippingAddresses])

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
    dispatch(SAVE_BILLING_ADDRESS(billingAddress))

    if (paymentMethod === 'stripe') {
      navigate('/checkout-stripe')
      toast.success('form submitted successfully')
    }
    else if (paymentMethod === 'wave') {
      navigate('/checkout-wave')
      toast.success('form submitted successfully')
    }
    else if (paymentMethod === 'paypal') {
      navigate('/checkout-paypal')
      toast.success('form submitted successfully')
    }
    else if (paymentMethod === 'wallet') {
      navigate('/checkout-wallet')
      toast.success('form submitted successfully')
    }
    else {
      toast.info('Please select a payment method...')
    }
  };

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value
    })
  }

  const handleCountryChange = (val) => {
    setShippingAddress({
      ...shippingAddress,
      country: val,
    })
  }

  const handleBillingChange = (val) => {
    setBillingAddress({
      ...shippingAddress,
      country: val,
    })
  }

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value
    })
  }

  const styling = {
    width: '500px',
     '& input':{
        height:'15px',
     },
    '@media (max-width:768px)':{
      width: '400px',

    }
  };

  const textStyles = {
    color:'red',
    fontSize:'12px',
    marginBottom:'10px' 
  }


  return (
    <Stack
    direction="row"
    alignItems="flex-start"
  
    paddingBottom='150px'
    sx={{
      width: '100%',
      margin: '30px 0 30px 50px',

      '@media(max-width:768px)': {
        flexDirection: 'column',
     //   alignItems: 'center',
        justifyContent:"flex-start",
        margin:'0',
        width: '95%',

      }
    }}
    >
      {/* Checkout Details Form */}
      <Paper elevation={3} sx={{
          margin: '0 10px',
           width: '45%',
           
      '@media(max-width:768px)': {
        flexDirection: 'column',
        width: '100%'
     

      }
    
    
    
    }}>
        <Grid container  sx={{
           padding: '20px',
          
           
           
           }}>
         
          <Grid container spacing={2} sx={{ margin: '10px', height: 'auto', padding: '20px 0px' }}>
          <Stack spacing={2} direction='column'
           sx={{ margin: '8px' ,
           marginLeft:'5px',
           '@media (max-width:768px)' :{
            margin:'0px',
            padding:'0'
          }
      
        }}>
       
          </Stack>
          <Stack
           component="form"
           onSubmit={handleSubmit}
          spacing={1}
          >  
                    <Stack spacing={2} direction={'column'} 
                    sx={{whiteSpace:'nowrap'}}
                    >
          <Typography
        
          component='p' variant='h5'>
              Checkout Details
              <Divider/>
            </Typography>
         
            <Typography component='p' variant='body2' sx={{ width: '100%', fontSize: '13px',color:'blue' }}>
              Shipping Address
            </Typography>
          
          </Stack>
          <Grid item xs={6}>
            <Typography
              sx={textStyles}
            variant='body1' component='p'>
              Recipient Name :
            </Typography>
            <TextField
                 required 
                 name='name'
               value={shippingAddress?.name}
               onChange={(e)=> handleShipping(e)}
            sx={styling} label="Recipient Name" variant="outlined" />
          
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={textStyles} 
            variant='body1' component='p'>
              Address Line1 :
            </Typography>
            <TextField
               required 
               name='line1'
             value={shippingAddress?.line1}
             onChange={(e)=> handleShipping(e)}
            sx={styling} label="Address Line 1" variant="outlined" />
          
          </Grid>

          <Grid item xs={12}>
            <Typography
            variant='body1' component='p'
            sx={textStyles}
            >
              Address Line2 :
            </Typography>
            <TextField
              required 
              name='line2'
                value={shippingAddress?.line2}
                onChange={(e)=> handleShipping(e)}
            sx={styling} label="Address Line 2" variant="outlined" />
           
          </Grid>

          <Grid item xs={12}>
            <Typography 
              sx={textStyles}
            variant='body1' component='p'>
              City :
            </Typography>
            <TextField 
              required 
              name='city'
              value={shippingAddress?.city}
              onChange={(e)=> handleShipping(e)}
            
            sx={styling} label="City" variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <Typography
             variant='body1' component='p'
             sx={textStyles}
             >
              State :
            </Typography>
            <TextField
              required 
              name='state'
              value={shippingAddress?.state}
              onChange={(e)=> handleShipping(e)}
            sx={styling} label="State" variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <Typography 
              sx={textStyles}
            variant='body1' component='p'>
              Postal code :
            </Typography>
            <TextField
              required 
              name='postal_code'
              value={shippingAddress?.postal_code}
              onChange={(e)=> handleShipping(e)}
            sx={styling} label="Postal Code" variant="outlined" />
          </Grid>

          <Grid item xs={12}>
              <Typography
                sx={textStyles}
              variant='body1' component='p'>
                Country :
              </Typography>
              <CountryDropdown
               
                value={shippingAddress?.country}
                onChange={handleCountryChange}
                priorityOptions={['US', 'CA']} 
            style= {{

              border:'1px solid black',
              borderRadius: '5px',
              padding: '15px',
              width:'100%',
              


            }}
               
              />
            </Grid>

            <Grid item xs={12}>
            <Typography 
              sx={textStyles}
            variant='body1' component='p'>
             Phone number :
            </Typography>
            <TextField
              required 
              name='phone'
              value={shippingAddress?.phone}
              onChange={(e)=> handleShipping(e)}
            sx={styling} label="Phone Number" variant="outlined" />
          </Grid>
          </Stack>
        </Grid>
         <Stack sx={{marginTop:'20px'}} >
         <Divider />
  

      

            
      
        <Grid   sx={{ margin: '10px', height: 'auto', padding: '20px 0px' }}>
          <Stack spacing={2} direction='column'
           sx={{ margin: '8px' ,
           marginLeft:'5px',
           whiteSpace:'nowrap',
        

               '@media (max-width:768px)' :{
          //  marginLeft:'0px'
          }
      
        }}>

        <Stack
        display={'column'}
        >  
        <Typography component='p' variant='h5'
        
        sx={{paddingBottom:'15px'}}
        >
        Billing Information
        <Divider/>
         </Typography  >
       
      
         <Typography component='p' variant='body2' sx={{ width: '100%', fontSize: '13px',color:'blue' }}>
         Billing Address
         </Typography>
         </Stack>
          </Stack>
          <Stack
           component="form"
           onSubmit={handleSubmit}
          spacing={1}
          >  
          <Grid item xs={12}>
            <Typography 
              sx={textStyles}
            variant='body1' component='p'>
              Recipient Name :
            </Typography>
            <TextField
                 required 
                 name='name'
               value={billingAddress?.name}
               onChange={(e)=> handleBilling(e)}
            sx={styling} label="Recipient Name" variant="outlined" />
          
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={textStyles}
             variant='body1' component='p'>
              Address Line1 :
            </Typography>
            <TextField
               required 
               name='line1'
             value={billingAddress?.line1}
             onChange={(e)=> handleBilling(e)}
            sx={styling} label="Address Line 1" variant="outlined" />
          
          </Grid>

          <Grid item xs={12}>
            <Typography 
              sx={textStyles}     
            variant='body1' component='p'>
              Address Line2 :
            </Typography>
            <TextField
              required 
              name='line2'
                value={billingAddress?.line2}
                onChange={(e)=> handleBilling(e)}
            sx={styling} label="Address Line 2" variant="outlined" />
           
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={textStyles}
             variant='body1' component='p'>
              City :
            </Typography>
            <TextField 
              required 
              name='city'
              value={billingAddress?.city}
              onChange={(e)=> handleBilling(e)}
            
            sx={styling} label="City" variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={textStyles}
             variant='body1' component='p'>
              State :
            </Typography>
            <TextField
              required 
              name='state'
              value={billingAddress?.state}
              onChange={(e)=> handleBilling(e)}
            sx={styling} label="State" variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <Typography 
              sx={textStyles}
            variant='body1' component='p'>
              Postal code :
            </Typography>
            <TextField
              required 
              name='postal_code'
              value={billingAddress?.postal_code}
              onChange={(e)=> handleBilling(e)}
            sx={styling} label="Postal Code" variant="outlined" />
          </Grid>

          <Grid item xs={12}>
              <Typography 
                sx={textStyles}
              variant='body1' component='p'>
                Country :
              </Typography>
              <CountryDropdown
               //  name='country'
                value={billingAddress?.country}
                onChange={handleBillingChange}
                priorityOptions={['US', 'CA']} 
            style= {{

              border:'1px solid black',
              borderRadius: '5px',
              padding: '15px',
              width:'100%',
              


            }}
               
              />
            </Grid>

            <Grid item xs={12}>
            <Typography 
              sx={textStyles}
            variant='body1' component='p'>
             Phone number :
            </Typography>
            <TextField
              required 
              name='phone'
              value={billingAddress?.phone}
              onChange={(e)=> handleBilling(e)}
            sx={styling} label="Phone Number" variant="outlined" />
          </Grid>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
          </Stack>
        </Grid>
        <Stack>
      
       </Stack>
     


         </Stack>






        </Grid>
      </Paper>


      <Stack
       direction={'column'}
     //  width='50%'
     sx={{
      width:'40%',
      '@media (max-width:768px)' :{
        flexDirection:'column',
        justifyContent:'flex-start',
        marginTop:'20px',
        marginLeft:'14px',
        width:'100%'
        
        }
     }}
      
      
      >
      <Paper
      sx={{
       
      }}
      >
        <Box sx={{
          padding:'14px',
          height:'auto'
        }}>
        <SummariesCheck />
        </Box>


</Paper>
      </Stack>
    

    </Stack>
  );
};

export default CheckoutDetails;







/*  



import React, { useEffect } from 'react';
import { TextField, Grid, Divider,Box, Paper, Stack, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { useDispatch, useSelector } from 'react-redux';
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '../../feature/checkOut/checkOutSlice';
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'
import SummariesCheck from '../summariesCheck/SummariesCheck';

const CheckoutDetails = () => {
  const { biLingAddress, shippingAddresses, paymentMethod } = useSelector((state) => state?.checkout)
  const initialAddressState = {
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    phone: ''
  };

  const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState });
  const [billingAddress, setBillingAddress] = useState({ ...initialAddressState });
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (Object.keys(shippingAddresses)?.length > 0)
      setShippingAddress({ ...shippingAddresses })
    if (Object.keys(biLingAddress)?.length > 0) {
      setBillingAddress({ ...biLingAddress })
    }
  }, [biLingAddress, shippingAddresses])

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
    dispatch(SAVE_BILLING_ADDRESS(billingAddress))

    if (paymentMethod === 'stripe') {
      navigate('/checkout-stripe')
      toast.success('form submitted successfully')
    }
    else if (paymentMethod === 'wave') {
      navigate('/checkout-wave')
      toast.success('form submitted successfully')
    }
    else if (paymentMethod === 'paypal') {
      navigate('/checkout-paypal')
      toast.success('form submitted successfully')
    }
    else if (paymentMethod === 'wallet') {
      navigate('/checkout-wallet')
      toast.success('form submitted successfully')
    }
    else {
      toast.info('Please select a payment method...')
    }
  };

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value
    })
  }

  const handleCountryChange = (val) => {
    setShippingAddress({
      ...shippingAddress,
      country: val,
    })
  }

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value
    })
  }

  const styling = {
    width: '500px',
    '@media (max-width:768px)':{
      width: '400px',

    }
  };


  return (
    <Stack
    direction="row"
    alignItems="flex-start"
   // justifyContent={'center'}
    paddingBottom='150px'
    sx={{
      width: '100%',
      margin: '30px 0 30px 50px',

      '@media(max-width:768px)': {
        flexDirection: 'column',
     //   alignItems: 'center',
        //justifyContent:"center"

      }
    }}
    >
     
      <Paper elevation={3} sx={{
        margin: '0 10px',
         width: '45%',
         
    '@media(max-width:768px)': {
      flexDirection: 'column',
      width: '100%'
   //   alignItems: 'center',
      //justifyContent:"center"

    }
  
  
  
  }}>
      <Grid container spacing={2} sx={{ padding: '20px' }}>
 
        <Grid container spacing={2} sx={{ margin: '10px', height: 'auto', padding: '20px 0px' }}>
        <Stack spacing={2} direction='column'
         sx={{ margin: '8px' ,
         marginLeft:'5px',
         '@media (max-width:768px)' :{
          marginLeft:'0px'
        }
    
      }}>
     
        </Stack>
        <Stack
         component="form"
         onSubmit={handleSubmit}
        spacing={1}
        >  
                  <Stack spacing={2} direction={'column'} 
                  sx={{whiteSpace:'nowrap'}}
                  >
        <Typography component='p' variant='h5'>
            Checkout Details
            <Divider/>
          </Typography>
       
          <Typography component='p' variant='body2' sx={{ width: '100%', fontSize: '13px',color:'blue' }}>
            Shipping Address
          </Typography>
        
        </Stack>
        <Grid item xs={6}>
          <Typography variant='body1' component='p'>
            Recipient Name
          </Typography>
          <TextField
               required 
               name='name'
             value={shippingAddress?.name}
             onChange={(e)=> handleShipping(e)}
          sx={styling} label="Recipient Name" variant="outlined" />
        
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body1' component='p'>
            Address Line1
          </Typography>
          <TextField
             required 
             name='line1'
           value={shippingAddress?.line1}
           onChange={(e)=> handleShipping(e)}
          sx={styling} label="Address Line 1" variant="outlined" />
        
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body1' component='p'>
            Address Line2
          </Typography>
          <TextField
            required 
            name='line2'
              value={shippingAddress?.line2}
              onChange={(e)=> handleShipping(e)}
          sx={styling} label="Address Line 2" variant="outlined" />
         
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body1' component='p'>
            City
          </Typography>
          <TextField 
            required 
            name='city'
            value={shippingAddress?.city}
            onChange={(e)=> handleShipping(e)}
          
          sx={styling} label="City" variant="outlined" />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body1' component='p'>
            State
          </Typography>
          <TextField
            required 
            name='state'
            value={shippingAddress?.state}
            onChange={(e)=> handleShipping(e)}
          sx={styling} label="State" variant="outlined" />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body1' component='p'>
            Postal code
          </Typography>
          <TextField
            required 
            name='postal_code'
            value={shippingAddress?.postal_code}
            onChange={(e)=> handleShipping(e)}
          sx={styling} label="Postal Code" variant="outlined" />
        </Grid>

        <Grid item xs={12}>
            <Typography variant='body1' component='p'>
              Country
            </Typography>
            <CountryDropdown
             
              value={shippingAddress?.country}
              onChange={handleCountryChange}
              priorityOptions={['US', 'CA']} 
          style= {{

            border:'1px solid black',
            borderRadius: '5px',
            padding: '20px',
            width:'100%',
            


          }}
             
            />
          </Grid>

          <Grid item xs={12}>
          <Typography variant='body1' component='p'>
           Phone number
          </Typography>
          <TextField
            required 
            name='phone'
            value={shippingAddress?.phone}
            onChange={(e)=> handleShipping(e)}
          sx={styling} label="Phone Number" variant="outlined" />
        </Grid>
        </Stack>
      </Grid>
       <Stack sx={{marginTop:'20px'}} >
       <Divider />


    

          
    
      <Grid  spacing={2} sx={{ margin: '10px', height: 'auto', padding: '20px 0px' }}>
        <Stack spacing={2} direction='column'
         sx={{ margin: '8px' ,
         marginLeft:'5px',
         whiteSpace:'nowrap',
      

             '@media (max-width:768px)' :{
        //  marginLeft:'0px'
        }
    
      }}>

      <Stack
      display={'column'}
      >  
      <Typography component='p' variant='h5'
      
      sx={{paddingBottom:'15px'}}
      >
      Billing Information
      <Divider/>
       </Typography  >
     
    
       <Typography component='p' variant='body2' sx={{ width: '100%', fontSize: '13px',color:'blue' }}>
       Billing Address
       </Typography>
       </Stack>
        </Stack>
        <Stack
         component="form"
         onSubmit={handleSubmit}
        spacing={1}
        >  
        <Grid item xs={12}>
          <Typography variant='body1' component='p'>
            Recipient Name
          </Typography>
          <TextField
               required 
               name='name'
             value={shippingAddress?.name}
             onChange={(e)=> handleBilling(e)}
          sx={styling} label="Recipient Name" variant="outlined" />
        
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body1' component='p'>
            Address Line1
          </Typography>
          <TextField
             required 
             name='line1'
           value={shippingAddress?.line1}
           onChange={(e)=> handleBilling(e)}
          sx={styling} label="Address Line 1" variant="outlined" />
        
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body1' component='p'>
            Address Line2
          </Typography>
          <TextField
            required 
            name='line2'
              value={shippingAddress?.line2}
              onChange={(e)=> handleBilling(e)}
          sx={styling} label="Address Line 2" variant="outlined" />
         
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body1' component='p'>
            City
          </Typography>
          <TextField 
            required 
            name='city'
            value={shippingAddress?.city}
            onChange={(e)=> handleBilling(e)}
          
          sx={styling} label="City" variant="outlined" />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body1' component='p'>
            State
          </Typography>
          <TextField
            required 
            name='state'
            value={shippingAddress?.state}
            onChange={(e)=> handleBilling(e)}
          sx={styling} label="State" variant="outlined" />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body1' component='p'>
            Postal code
          </Typography>
          <TextField
            required 
            name='postal_code'
            value={shippingAddress?.postal_code}
            onChange={(e)=> handleBilling(e)}
          sx={styling} label="Postal Code" variant="outlined" />
        </Grid>

        <Grid item xs={12}>
            <Typography variant='body1' component='p'>
              Country
            </Typography>
            <CountryDropdown
             
              value={shippingAddress?.country}
              onChange={handleCountryChange}
              priorityOptions={['US', 'CA']} 
          style= {{

            border:'1px solid black',
            borderRadius: '5px',
            padding: '20px',
            width:'100%',
            


          }}
             
            />
          </Grid>

          <Grid item xs={12}>
          <Typography variant='body1' component='p'>
           Phone number
          </Typography>
          <TextField
            required 
            name='phone'
            value={shippingAddress?.phone}
            onChange={(e)=> handleBilling(e)}
          sx={styling} label="Phone Number" variant="outlined" />
        </Grid>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Stack>
      </Grid>
      <Stack>
    
     </Stack>
    <Divider/>


       </Stack>






      </Grid>
    </Paper>


    <Stack
     direction={'column'}
     
   sx={{
    
    '@media (max-width:768px)' :{
      flexDirection:'column',
      justifyContent:'flex-start',
      marginTop:'20px',
      marginLeft:'14px'
      
      }
   }}
    
    
    >
    <Paper>

<SummariesCheck />
</Paper>
    </Stack>
  

  </Stack>
);
};

export default CheckoutDetails;











*/