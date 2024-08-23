import React from 'react'
import { Paper, Stack,  Grid, } from '@mui/material';
import SummariesCheck from '../summariesCheck/SummariesCheck';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useSearchParams  } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { createOrder } from '../../feature/order/orderSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const CheckoutWithFW = () => {


const { cartItems, cartTotalAmount } = useSelector((state) => state?.cart);

const {coupon} = useSelector((state)=> state?.coupon)
const { shippingAddresses, paymentMethod } = useSelector((state) => state?.checkout)

const {user} = useSelector((state) => state?.auth);
const couponOrder = coupon !== null ? coupon: {name: 'nil'} 

const [URLParams] = useSearchParams()
const payment  = URLParams.get('payment')
const ref = URLParams.get('ref')

const dispatch = useDispatch()
const navigate = useNavigate()

    const publicKey = process.env.REACT_APP_FLW_PK 
   // const tx_ref = process.env.REACT_APP_TX_REF 
    const backendURL = `${process.env.REACT_APP_BACKEND_URL}/api/order/response`
    //const backEndURL = `${process.env.REACT_APP_BACKEND_URL}/api/transaction/depositFundWithFlw`
    const tx_Ref = `blake_${uuidv4().toString}`;

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
      //navigate('/checkout-success')
    }


   useEffect(()=>{
    if(payment === 'successful' && ref === tx_Ref && cartTotalAmount > 0){
      saveOrder()
    toast.success('Payment  successful')
      navigate('/checkout-success')
    }

    if(payment === 'failed'){
      toast.error('Payment  failed')
    }


    setTimeout(()=>{
      if(payment === 'successful' && ref === tx_Ref){
         navigate('/checkout-success')
      }
    },[5000])
 



   },[payment, ref, navigate,cartTotalAmount,])

 





    function makePayment() {
   
        // eslint-disable-next-line no-undef
        FlutterwaveCheckout({
          public_key: publicKey,
         
          tx_ref:tx_Ref,
          amount: cartTotalAmount,
          currency: "USD",
          payment_options: "card, banktransfer, ussd",
          redirect_url: backendURL,
         
          customer: {
            email: user.email,
            phone_number:user.phone,
            name: user.name,
          },
          customizations: {
            title: "E-Shop online store",
            description: "Product's Payment",
            logo: "https://checkout.flutterwave.com/assets/img/rave-logo.png",
          },
          callback: function (data){
            console.log("payment callback:", data);
          },
          onclose: function() {
            console.log("Payment cancelled!");
          }
        });
      }

  return (
    <Stack
    marginTop='40px'
    spacing={4}
   // paddingBottom={'40px'}
    >   
    <Grid 
     
    container justifyContent="center" 
    sx={{ padding: '10px', 
    width:'97%',
     marginBottom:'80px', 
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
      <Grid item xs={12} md={6}  >
        <Paper sx={{
              marginLeft:'10px' ,
        }} elevation={0}>
          <Stack   spacing={3} sx={{ padding: '10px'}}>
            <h3
            style={{
             
            //  textDecoration:'underline',
              color:'green',
              textTransform:'uppercase',
              textAlign:'center'
            }}
            >Flutter wave CheckOut</h3>
                         <button
                         onClick={makePayment}
                        style={{
                            width:'100%',
                            marginTop:'10px',
                            whiteSpace:'nowrap',
                         //   marginLeft:'10px',
                            height:'40px',
                            backgroundColor:'green',
                            border:'none',
                            borderRadius:'5px',
                            color:'white',
                            cursor:'pointer',
                            fontSize:'16px'
                        }}
                     
                        type='submit'
                    >
                        Pay Now
                    </button>
           
          </Stack>
        </Paper>
      </Grid>
    </Grid>

    </Stack>


  )
}

export default CheckoutWithFW