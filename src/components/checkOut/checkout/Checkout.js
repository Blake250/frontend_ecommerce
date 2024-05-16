import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../checkoutsummary/checkoutForm/CheckoutForm";
import { useSelector } from 'react-redux';
import  {extractIdAndCartQuantity}  from "../../utils";
import {toast} from 'react-toastify'
//import './formStyle.css'
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK );



 function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState('initializing checkout....')
  const { coupon } = useSelector((state) => state?.coupon);
 

  const { cartItems, cartTotalAmount } = useSelector((state) => state?.cart);
  const { user } = useSelector((state) => state?.auth);
  const { biLingAddress,  shippingAddresses, paymentMethod } = useSelector((state) => state?.checkout)

  

  const productID = extractIdAndCartQuantity(cartItems)

  
const description= `Eshop payment: by email:${user?.email}, Amount:${cartTotalAmount}`


  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/order/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        
        items :  productID,
        shipping:shippingAddresses,
        description : description,
        coupon:coupon,
      
      
      
      
      
      }),
    })
      .then((res)=>{
        if(res.ok){
            return res.json()
        }
        return res.json().then((json)=>{
          Promise.reject(json)
        })
        } )  
      .then((data) => setClientSecret(data?.clientSecret))
      .catch((err)=>{
        setMessage('fail to initialize checkout')
        toast.error('something went wrong...')
        console.log(err.message)
  
      })
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
     <>  
     <section>
      <div style={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
      }} >
    { !clientSecret && <h3>{message} </h3>    }
      </div>
     </section>
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
    </>
  );
}


export default Checkout

