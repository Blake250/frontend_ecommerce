import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { getCardQuantity } from '../../components/utils';
import { createAsyncThunk } from "@reduxjs/toolkit";
import cartService from '../../pages/cart/cartService';



//const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL
const FRONTEND_URL = "https://shopito-app-zs1v.onrender.com"



const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [] ,
    cartTotalQuantity:0, 
    cartTotalAmount:0,
    initialCartTotalAmount: 0,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',


}



// create  A Category
export const saveCartDB = createAsyncThunk("cart/DB", async (cartData, { rejectWithValue }) => {
  try {
    return await cartService.saveCartDB(cartData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});


// getCart
export const getCart = createAsyncThunk("cart/getCart", async (_, { rejectWithValue }) => {
  try {
    return await cartService.getCart();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});




const cartSlice = createSlice({
    name: 'cart',
    initialState, 
  
    reducers: {
   
        ADD_TO_CART: (state, action) => {
      
            const cartQuantity = getCardQuantity(state.cartItems, action.payload._id);
            const productIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
            if (productIndex >= 0) {
              // Product is already in the cart
              if (cartQuantity >= action.payload.quantity) {
                // Check if max quantity is reached
                toast.info('Max number of product reached!!!');
              } else {
                // Increment cartQuantity of the existing item
                state.cartItems[productIndex].cartQuantity += 1;
                toast.success(`${action.payload.name} quantity updated in the cart`, {
                  position: 'top-left'
                });
              }
            } else {
              // Product is not in the cart
              if (action.payload.quantity <= 0) {
                // Product is out of stock
                toast.info(`${action.payload.name} is out of stock`, {
                  position: 'top-left'
                });
              } else {
                // Add the product to the cart
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} has been added to the cart`, {
                  position: 'top-left'
                });
              }
            }
          
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
          },
          DECREASE_CART: (state, action)=>{
            const productIndex = state.cartItems.findIndex(item => item._id === action.payload._id);

            if(state.cartItems[productIndex].cartQuantity > 1){
             state.cartItems[productIndex].cartQuantity -= 1
             toast.success(`${action.payload.name} has been  decrease by one`, {
                position: 'top-left'
              });
            }else if(state.cartItems[productIndex].cartQuantity === 1){
            const newCartItems  = state.cartItems.filter((item)=> item._id !== action.payload._id)
            state.cartItems = newCartItems
            toast.success(`${action.payload.name} has been  removed from cart`, {
                position: 'top-left'
              });
            }
            
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

          },
          REMOVE_FROM_CART : (state, action)=>{
          const  newCartItems = state.cartItems.filter((item)=> item._id !== action.payload._id)
          state.cartItems = newCartItems
          toast.success(`${action.payload.name} has been  deleted from the  cart`, {
            position: 'top-left'
          });
          
          localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
          },
          CLEAR_CART:(state, action)=>{
            state.cartItems = [];
            toast.success('items in cart has been  cleared successfully',{
              position:'top-left'
            })
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
          },

       /*   CALCULATE_SUBTOTAL : (state, action)=>{
              let array = [];
              state.cartItems?.map((item)=>{
        
          const {price, cartQuantity} = item
          const cartTotalPrice = price * cartQuantity
          return array.push(cartTotalPrice)
                
              })
     let totalQuantity =  array.reduce((a, b)=>{
            return (a + b); 
              }, 0)
              state.initialCartTotalAmount = totalQuantity
              if(action.payload  && action.payload?.coupon !== null){
                const discountedTotalAmount = applyDiscount(totalQuantity, action.payload?.coupon?.discount)
                state.cartTotalAmount = discountedTotalAmount
              }
            //  state.cartTotalAmount = discountedTotalAmount
              else{
                state.cartTotalAmount = totalQuantity
              }
             
          },*/

          CALCULATE_SUBTOTAL: (state, action) => {
            let array = [];
            state.cartItems?.map((item) => {
                const { price, cartQuantity } = item;
                const cartTotalPrice = price * cartQuantity;
                return array.push(cartTotalPrice);
            });
            let totalQuantity = array.reduce((a, b) => {
                return a + b;
            }, 0);
            state.initialCartTotalAmount = totalQuantity;
        
            // Check if a coupon is applied
            if (action.payload && action.payload.coupon !== null) {
                const discountPercentage = parseFloat(action.payload.coupon.discount);
                if (!isNaN(discountPercentage)) {
                    // Apply discount if discount percentage is valid
                    const discountedTotalAmount = totalQuantity * (1 - discountPercentage / 100);
                    state.cartTotalAmount = discountedTotalAmount;
                } else {
                    // If discount percentage is not valid, revert to initial total
                    state.cartTotalAmount = totalQuantity;
                }
            } else {
                // If no coupon is applied, set total amount to initial total
                state.cartTotalAmount = totalQuantity;
            }
        },
        
          
          CALCULATE_TOTAL_QUANTITY: (state, action)=>{
            let array = []
            state.cartItems?.map((item)=>{
             
              const {cartQuantity} = item
            return   array.push(cartQuantity)
            })

            const cartTotalItem = array.reduce((a, b)=>{
              return a + b
            }, 0)
            state.cartTotalQuantity = cartTotalItem
          }
         
     
          
    },

    extraReducers: (builder) => {
      builder
  
              // saveCartDB
              .addCase(saveCartDB.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(saveCartDB.fulfilled, (state, action) => {
               state.isError= false;
                state.isLoading = false;
                state.isSuccess = true;
             //   state.category = action.push(action.payload)
               
                console.log(action.payload)
              })
              .addCase(saveCartDB.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
              
             
                console.log(action.payload)
               
              })
                   // getCartDB 
                   .addCase(getCart.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(getCart.fulfilled, (state, action) => {
                   state.isError= false;
                    state.isLoading = false;
                    state.isSuccess = true;
                 localStorage.setItem('cartItems', JSON.stringify(action.payload))
                 if(action.payload && action.payload.length  > 0){
                  window.location.href =   `${FRONTEND_URL}/login/cart`
                 }else{
                  //window.location.href =  FRONTEND_URL + "/"
                    window.location.href =  `${FRONTEND_URL}/login/`
                 }
                   
                    console.log(action.payload)
                    toast.error(action.payload)
                  })
                  .addCase(getCart.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                  
                 
                    console.log(action.payload)
                   
                  })
            }
  });
  
  export const {ADD_TO_CART, DECREASE_CART, REMOVE_FROM_CART, CLEAR_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY} = cartSlice.actions
  
  export default cartSlice.reducer




