


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoryAndBrand from "./feature/categoryAndBrand";
import authSlice from "./redux/slice/authSlice";
import productSlice from "./feature/product/productSlice";
import couponSlice from "./feature/coupon/couponSlice";
import filteredSlice from "./feature/filteredSlice";
import cartSlice from "./feature/cart/cartSlice";
import checkOutSlice from "./feature/checkOut/checkOutSlice";
import orderSlice from "./feature/order/orderSlice";
import transactionsSlice from "./feature/transactions/transactionsSlice";
import {
 
 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'





const rootReducers = combineReducers({
    auth:authSlice,
    category:categoryAndBrand,
    product : productSlice,
    coupon:couponSlice,
    filter: filteredSlice,
    cart:cartSlice,
    checkout:checkOutSlice,
    order:orderSlice,
    transactions:transactionsSlice
})









const persistConfig = {
    key: 'root',
      version: 1,
      storage,
      whitelist: ['auth'] 
    }
    
   const persistedReducer = persistReducer(persistConfig,rootReducers )
    
  const store = configureStore({
       
        
         reducer : persistedReducer,
    
         // auth: authSlice,
       
      
       
         middleware: (getDefaultMiddleware) => getDefaultMiddleware( {
          
       serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          }

        }),
       
    
     //devTools:process.env.NODE_ENV !== "production"
    devTools : false
    
    })
    
export default store