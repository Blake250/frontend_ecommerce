import React from 'react'
import styled from 'styled-components'
import Slider from "./Slider"


const Home = () => {
  return (
    <Container>
      <Contain> 
        <Slider/>
      
      </Contain>
      </Container>
  )
}

export default Home



const Container = styled.div`
background-color:linear-gradient(159deg, rgb(45, 45, 58)0%, rgb(43,43,53)100%)

`

const Contain = styled.div`

`



/*const express = require("express");
const app = express();
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")('sk_test_CGGvfNiIPwLXiDwaOfZ3oX6Y');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.listen(4242, () => console.log("Node server listening on port 4242!"));



*/