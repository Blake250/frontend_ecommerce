
import orderService from './orderService';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'


export const createOrder = createAsyncThunk("order/createOrder", async (formData, { rejectWithValue }) => {
    try {
      return await orderService.createOrder(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return rejectWithValue(message);
    }
  });
  // getting the orders
  export const getOrder = createAsyncThunk("order/getOrder", async (_, { rejectWithValue }) => {
    try {
      return await orderService.getOrder();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return rejectWithValue(message);
    }
  });

    // getting the orders
    export const singleOrder = createAsyncThunk("order/singleOrder", async (id, { rejectWithValue }) => {
      try {
        return await orderService.singleOrder(id);
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return rejectWithValue(message);
      }
    });

        // updating the order status
        export const updateOrderStatus = createAsyncThunk("order/updateOrderStatus", async ({id, formData}, { rejectWithValue }) => {
          try {
            return await orderService.updateOrderStatus(id, formData);
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
order:null,
orders:[],
totalOrderAmount: 0,
isError: false,
isLoading: false,
isSuccess: false,
message: "",
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},

  extraReducers: (builder)=> {
    builder
            // create An order
            .addCase(createOrder.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
             state.isError= false;
              state.isLoading = false;
              state.isSuccess = true;
               
              toast.success(action.payload);
              //console.log(action.payload)
            
            })
            .addCase(createOrder.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
            
              toast.error(action.payload);
              console.log(action.payload)
             
            })

            // getting orders
            .addCase(getOrder.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
             state.isError= false;
              state.isLoading = false;
              state.isSuccess = true;
               state.orders = action.payload
              //toast.success(action.payload);
              console.log(action.payload)
            
            })
            .addCase(getOrder.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
            
              toast.error(action.payload);
              console.log(action.payload)
             
            })

                      // get An  order
                      .addCase(singleOrder.pending, (state) => {
                        state.isLoading = true;
                      })
                      .addCase(singleOrder.fulfilled, (state, action) => {
                       state.isError= false;
                        state.isLoading = false;
                        state.isSuccess = true;
                         state.order = action.payload
                        //toast.success(action.payload);
                        console.log(action.payload)
                      
                      })
                      .addCase(singleOrder.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.message = action.payload;
                      
                        toast.error(action.payload);
                        console.log(action.payload)
                       
                      })


                      
                      // updating  An  orderStatus
                      .addCase(updateOrderStatus.pending, (state) => {
                        state.isLoading = true;
                      })
                      .addCase(updateOrderStatus.fulfilled, (state, action) => {
                       state.isError= false;
                        state.isLoading = false;
                        state.isSuccess = true;
                       
                        toast.success(action.payload);
                        console.log(action.payload)
                      
                      })
                      .addCase(updateOrderStatus.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.message = action.payload;
                      
                        toast.error(action.payload);
                        console.log(action.payload)
                       
                      })
        }
});

export const {} = orderSlice.actions

export default orderSlice.reducer