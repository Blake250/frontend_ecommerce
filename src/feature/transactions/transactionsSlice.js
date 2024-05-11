

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import transactionsService from "./transactionsService";



  // Getting  the user transactions
  export const getTransactions = createAsyncThunk("transactions/getTransactions", async (_, { rejectWithValue }) => {
    try {
      return await transactionsService.getTransactions();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return rejectWithValue(message);
    }
  });


    // verify sender's Account
    export const verifyAccount = createAsyncThunk("transactions/verifyAccount", async (formData, { rejectWithValue }) => {
        try {
          return await transactionsService.verifyAccount(formData);
        } catch (error) {
          const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(message);
          return rejectWithValue(message);
        }
      });


        // transfer funds
    export const transferFund = createAsyncThunk("transactions/transferFund", async (formData, { rejectWithValue }) => {
        try {
          return await transactionsService.transferFund(formData);
        } catch (error) {
          const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(message);
          return rejectWithValue(message);
        }
      });







const initialState = {
    transaction:null,
    transactions:[],
    receiverName:'',
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:''

}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {

    RESET_TRANSACTION_MESSAGE : (state)=>{
        state.message = ''
    },
    RESET_RECEIVER: (state)=>{
       state.receiverName = ''
    }
  },
  extraReducers:(builder)=>
  builder
   
            // getting user transactions
            .addCase(getTransactions.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(getTransactions.fulfilled, (state, action) => {
               state.isError= false;
                state.isLoading = false;
                state.isSuccess = true;
               state.transactions = action.payload
    
                console.log(action.payload)
       
              })
              .addCase(getTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
              
                toast.error(action.payload);
                console.log(action.payload)
               
              })

                       //verify user's Account
            .addCase(verifyAccount.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(verifyAccount.fulfilled, (state, action) => {
               state.isError= false;
                state.isLoading = false;
                state.isSuccess = true;
                state.receiverName = action.payload.receiverName;
               state.message = action.payload.message
                  toast.success(action.payload.message)
                console.log(action.payload)
       
              })
              .addCase(verifyAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
              
                toast.error(action.payload.message);
                console.log(action.payload)
               
              })




                                  //transfer funds
            .addCase(transferFund.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(transferFund.fulfilled, (state, action) => {
               state.isError= false;
                state.isLoading = false;
                state.isSuccess = true;
               state.message = action.payload
                  toast.success(action.payload)
                console.log(action.payload)
       
              })
              .addCase(transferFund.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
              
                toast.error(action.payload);
                console.log(action.payload)
               
              })
  




  
});

export const {RESET_TRANSACTION_MESSAGE, RESET_RECEIVER } = transactionsSlice.actions

export default transactionsSlice.reducer