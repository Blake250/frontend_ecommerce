import { createSlice } from '@reduxjs/toolkit'



const initialState = {
paymentMethod: localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : '',
shippingAddresses: localStorage.getItem('shippingAddresses') ? JSON.parse(localStorage.getItem('shippingAddresses')) : '' ,
biLingAddress: localStorage.getItem('biLingAddress') ? JSON.parse(localStorage.getItem('biLingAddress')) : '' ,
}

const checkOutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
         SAVE_PAYMENT_METHOD:(state, action)=>{
            state.paymentMethod = action.payload
            localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod))
         },
         SAVE_SHIPPING_ADDRESS:(state, action)=>{
            state.shippingAddresses = action.payload
            localStorage.setItem('shippingAddresses', JSON.stringify(state.shippingAddresses))
         },
         SAVE_BILLING_ADDRESS:(state, action)=>{
            state.biLingAddress = action.payload
            localStorage.setItem('biLingAddress', JSON.stringify( state.biLingAddress))

         }
         

  }
});

export const {SAVE_PAYMENT_METHOD,SAVE_SHIPPING_ADDRESS,SAVE_BILLING_ADDRESS} = checkOutSlice.actions


export default checkOutSlice.reducer