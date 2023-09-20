import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";





const rootReducers = combineReducers({
    auth:authSlice
})









const store = configureStore({

   reducer:{
    auth:rootReducers
   }
})



export default store