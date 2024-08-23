import React from 'react'

//import { createOrder } from '../../feature/order/orderSlice';
import { Paper, Stack, Button, Grid, CardMedia, Typography, Box, Divider, } from '@mui/material';
//import SummariesCheck from '../summariesCheck/SummariesCheck';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate,useSearchParams  } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
//import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SummariesCheck from '../../summariesCheck/SummariesCheck';
import Loader from '../../Loader';
import axios from "axios"
import { extractIdAndCartQuantity } from '../../utils';





const CheckoutWallet = () => {

    
  const { cartItems, cartTotalAmount } = useSelector((state) => state?.cart);
  const {isLoading } = useSelector((state) => state?.order);
  
  const {coupon} = useSelector((state)=> state?.coupon)
  const { biLingAddress, shippingAddresses, paymentMethod } = useSelector((state) => state?.checkout)

//  console.log(`here is the ${JSON.stringify(shippingAddresses) } information`)

  
  const {user} = useSelector((state) => state?.auth);
  //const couponOrder = coupon !== null ? coupon: {name: 'nil'} 
  
  const productID = extractIdAndCartQuantity(cartItems)
  console.log(`can you find the ${JSON.stringify(productID)}`)
  
  

  const navigate = useNavigate()
  
  //     const publicKey = process.env.REACT_APP_FLW_PK 
  //    // const tx_ref = process.env.REACT_APP_TX_REF 
  //     const backendURL = `${process.env.REACT_APP_BACKEND_URL}/api/order/response`
  //const tx_Ref = `blake_${uuidv4().toString}`;
  
     
  const  makePayment =  async()=>{
    

    if(cartTotalAmount < 1){
      return toast.error('amount is invalid')

    }


    try { 
  const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/order/payViaWallet`, {
    items: productID,
    cartItems,
    shippingAddresses,
    coupon: coupon !== null ? coupon : { name: 'nil' },
  }, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });
  
  console.log(response.data);
  
  if (response.data.url)
     {
    toast.success(response.data.message);
  return  window.location.href = response.data.url;
  }
  
  else {
    toast.error('No redirection URL provided');
  }

} 
catch(err){
  toast.error('Payment failed Please try again')
  console.log(`an ${err.message} occur during the process`)
  }

  }






  const  goToWallet =  ()=>{
    navigate("/wallet")
    console.log('make payment')
  }
    return (
      <>   
     
      <Stack
      marginTop='40px'
      spacing={4}
  //paddingBottom={'40px'}
  //position='relative'


  sx={{
    paddingBottom:'100px',
  
      '@media(max-width:768px)':{
          paddingBottom:'80px',
         }
  }}

      >   
      <Grid 
       
      container
       justifyContent="center" 
      sx={{ padding: '10px', 
      width:'97%',
       marginBottom:'80px', 
      
    //   zIndex:-999
       }}>
        <Grid 
   
        item xs={12} md={6}>
          <Paper sx={{
           marginLeft:'10px',
           paddingBottom:'40px',
           border:'1px solid black',
           padding:'5px'
            
          }}
      
            elevation={0}>
           
          
            <SummariesCheck />
          
          </Paper>
        </Grid>
        <Grid sx={{
            // marginBottom:'120px',
        '@media(max-width:768px)':{
          marginBottom:'80px',
        }
  
        }} 
        item xs={12} md={6}  >
          <Paper sx={{
                marginLeft:'10px' ,
               // zIndex:-999 ,
            //  position:'relative',
           
            '@media(max-width:768px)':{
              marginTop:'20px',
            }
            
          }} elevation={0}>
            <Stack   spacing={3} sx={{ 
              padding: '10px',
             position:'relative',
             border:'1px solid black',
         
          
          }}>
             <h3
              style={{
               
              //  textDecoration:'underline',
                color:'green',
                textTransform:'uppercase',
                textAlign:'center'
              }}
              >E-Shop Wallet CheckOut</h3> 

              <Stack
             sx={{
              display:'flex',
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center',
             border:'1px solid black',
            // width:'100%'
            padding:'5px',
            borderRadius:'5px'
            
             }}
              >


              <Typography
              variant='body1'
              component='div'
              sx={{
                color:'black',
                fontSize:'15px'
              }}
              >
               Account Balance

              </Typography>



              <CardMedia
              component="img"
             src={'./sendPhoto/pay.png'} // Pass the image source
              alt="Image Photo"
              sx={{ width: '150px',  borderRadius: '5px', objectFit: 'contain' 
            }} 
            ></CardMedia>


              </Stack>

              <Box
              sx={{
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center !important'
              }}
              >
            <Typography
            variant='h5'
            component='p'
              
            sx={{
             // lineHeight:0,
              marginBottom:'2px',
              '@media(max-width:768px)':{
                fontSize:'18px'
              }

              
            }}
            >
               ${user?.balance?.toFixed(2)}
            </Typography>
            <br />

          
              {
                cartTotalAmount < user?.balance?.toFixed(2) ?
                (<>
                  {
                       isLoading ?
                       <Loader/> :
                       <Button
                       onClick={makePayment}
                       variant='contained'
                       size='medium'
                   //    fullWidth
                   sx={{
                 // marginBottom:'7px',
                  width:'150px'
                   }}
                        
                       >
                       Pay Now
                       </Button>
                  }
                
                </>) 
                
                :

                (<>
                <Typography
              sx={{
                '@media(max-width:768px)':{
                  fontSize : '21px'
                }
              }}
                
             variant='h5'
            component='p'
                >
                  Insufficient Balance!!!
                </Typography>

                <Button
                       onClick={goToWallet}
                       variant='contained'
                       size='medium'
                       color='warning'
                   //    fullWidth
                   sx={{
                 // marginBottom:'7px',
                  width:'150px'
                   }}
                        
                       >
                       Top UP Wallet
                       </Button>
                </>)
              }
            
              </Box>
               
              
                   
             
            </Stack>
          </Paper>
        </Grid>
      </Grid>
  
      </Stack>
      
      </>
    )
  }
  
  export default CheckoutWallet