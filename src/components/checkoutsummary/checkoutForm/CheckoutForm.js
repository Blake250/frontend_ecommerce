import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SummariesCheck from '../../summariesCheck/SummariesCheck';
import Loader from '../../Loader';
import {useSelector, useDispatch} from 'react-redux' 
import {useNavigate} from 'react-router-dom'


import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Paper, Stack, Button, Grid } from '@mui/material';
import { createOrder } from '../../../feature/order/orderSlice';
// Import your custom CSS file for styling

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch =  useDispatch()


  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {cartTotalAmount,cartItems} = useSelector((state)=> state?.cart)
  const {coupon} = useSelector((state)=> state?.coupon)
  const returnUrl = `${process.env.REACT_APP_FRONTEND_URL}/checkout-success`;
 const couponOrder = coupon !== null ? coupon: {name: 'nil'} 
 const { biLingAddress, shippingAddresses, paymentMethod } = useSelector((state) => state?.checkout)


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

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null)

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    await stripe.confirmPayment({
      elements,
      confirmParams: {
       return_url : returnUrl
      },
      redirect: 'if_required',
    }).then((result) => {
      if (result.error) {
        toast.error(result.error.message)
        setMessage(result.error.message)
        return
      } else if (result.paymentIntent) {
        if (result.paymentIntent.status === 'succeeded') {
          setIsLoading(false)
          toast.success('Payment was successful')
          saveOrder()
        }
      }
    })
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <Grid 
     
    container justifyContent="center" sx={{ padding: '10px', width:'97%', marginBottom:'80px', }}>
      <Grid item xs={12} md={6}>
        <Paper sx={{
         marginLeft:'10px',
         paddingBottom:'78px'
          
        }}
    
          elevation={0}>
          <SummariesCheck />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}  >
        <Paper sx={{
              marginLeft:'10px' ,
        }} elevation={0}>
          <Stack   spacing={3} sx={{ padding: '10px'}}>
            <h3
            style={{
             
              textDecoration:'underline',
              color:'green',
              textTransform:'uppercase'
            }}
            >Stripe CheckOut</h3>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <Button
              disabled={isLoading || !stripe || !elements}
              type="submit"
              variant="contained"
              onClick={handleSubmit}
               fullWidth
            >
              {isLoading ? (<div className="spinner" id="spinner"> <Loader/> </div>) : ("Pay now")}
            </Button>
            {message && <div id="payment-message">{message}</div>}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CheckoutForm;










/*import React from 'react'
import { useEffect, useState } from 'react';
import {toast} from 'react-toastify'
import SummariesCheck from '../../summariesCheck/SummariesCheck';
//import './checkoutForm.css'
//import './formStyle.css'
import { TextField, Grid, Divider,Box, Paper, Stack, Typography, Button,List, ListItems } from '@mui/material';

import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const  CheckoutForm =  ()=> {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }


  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null)

    if (!stripe || !elements) {
    
      return;
    }

    setIsLoading(true);

   await stripe.confirmPayment({
      elements,
      confirmParams: {
       
        return_url: `${process.env.REACT_APP.FRONTEND_URL}/checkout-success`
      },
      redirect:'if_required',

    }).then((result)=>{
     if(result.error){
      toast.error(result.error.message)
      setMessage(result.error.message)
      return
     }
    else if(result.paymentIntent){
   
      if(result.paymentIntent.status === 'succeeded'){
        setIsLoading(false)
        toast.success('payment was successful')
      }
    }
    })





  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <> 
    <section>
      <div style={{
          
      }} >
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} >
            <Paper elevation={3} >
              <SummariesCheck/>
            </Paper>
          </Stack>

          <Stack>
            <Paper elevation={3} >
              <h3>Stripe CheckOut </h3>
              <PaymentElement id="payment-element" options={paymentElementOptions} />
<button disabled={isLoading || !stripe || !elements} id="submit">
  <span id="button-text">
    {isLoading ?
    ( <div className="spinner" id="spinner"></div> ) :( "Pay now" )}
  </span>
</button>
{message && <div id="payment-message">{message}</div>}
            
            </Paper>
          </Stack>


</form>




      </div>
    </section>
  
    </>
  );
}






export default CheckoutForm*/




