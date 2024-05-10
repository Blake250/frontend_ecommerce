


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoryAndBrand from "./feature/categoryAndBrand";
import authSlice from "./redux/slice/authSlice";
import productSlice from "./feature/product/productSlice";
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
    product : productSlice
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
       
    
      devTools:process.env.NODE_ENV !== "production"
    
    })
    
export default store