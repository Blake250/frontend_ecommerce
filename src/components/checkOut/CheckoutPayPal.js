import React from 'react'
import { createOrder } from '../../feature/order/orderSlice';
import { Paper, Stack, Button, Grid, } from '@mui/material';
import SummariesCheck from '../summariesCheck/SummariesCheck';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate,useSearchParams  } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';






const CheckoutPayPal = () => {

    
const { cartItems, cartTotalAmount } = useSelector((state) => state?.cart);

const {coupon} = useSelector((state)=> state?.coupon)
const { biLingAddress, shippingAddresses, paymentMethod } = useSelector((state) => state?.checkout)

const {user} = useSelector((state) => state?.auth);
const couponOrder = coupon !== null ? coupon: {name: 'nil'} 



const dispatch = useDispatch()
const navigate = useNavigate()

    const publicKey = process.env.REACT_APP_FLW_PK 
   // const tx_ref = process.env.REACT_APP_TX_REF 
    const backendURL = `${process.env.REACT_APP_BACKEND_URL}/api/order/response`
 //   const tx_Ref = `blake_${uuidv4().toString}`;

    const saveOrder = async  ()=>{
      const today = new Date()
      const formData = {
        orderDate : today.toDateString(),
        orderTime : today.toLocaleTimeString(),
        orderAmount : cartTotalAmount,
        orderStatus:'order placed...' ,
        cartItems,
        shippingAddresses,
        paymentMethod,
        coupon  : couponOrder,
  
      }
     await  dispatch(createOrder(formData))
      navigate('/checkout-success')
    }

    const initialOptions = {
        'client-id' : process.env.REACT_APP_PAY_PAL_CID ,
        currency: "USD",
        intent: "capture",
    }

  return (
    <>   
     <PayPalScriptProvider options={initialOptions}>  
    <Stack
    marginTop='40px'
    spacing={4}
//paddingBottom={'40px'}
//position='relative'
sx={{
    '@media(max-width:768px)':{
        paddingBottom:'80px',
       }
}}


    >   
    <Grid 
     
    container justifyContent="center" 
    sx={{ padding: '10px', 
    width:'97%',
     marginBottom:'80px', 
  //   zIndex:-999
     }}>
      <Grid item xs={12} md={6}>
        <Paper sx={{
         marginLeft:'10px',
         paddingBottom:'40px'
          
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
          
        }} elevation={0}>
          <Stack   spacing={3} sx={{ 
            padding: '10px',
           position:'relative',
           
       
        
        }}>
            <h3
            style={{
             
            //  textDecoration:'underline',
              color:'green',
              textTransform:'uppercase',
              textAlign:'center'
            }}
            >Pay Pal CheckOut</h3>
              <PayPalButtons
              sx={{
                zIndex:3 ,
              }}
              createOrder ={
                (data, actions)=>{
               return actions.order.create({
                  purchase_units:[{
                    amount:{
                        value:cartTotalAmount
                    }
                  }]
               })     
                }
              }

              onApprove={(data, actions)=>{
                actions.order.capture()
                .then((details)=>{
                    const status = details.status
                    console.log(`here is the order ${status}`)
                    if(status === 'COMPLETED'){
                        toast.success('payment successful')
                        saveOrder()
                    }
                })
              }}
              
              />  
            
                 
           
          </Stack>
        </Paper>
      </Grid>
    </Grid>

    </Stack>
    </PayPalScriptProvider>
    </>
  )
}

export default CheckoutPayPal