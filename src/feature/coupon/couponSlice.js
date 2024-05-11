import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import couponService from './couponService';





    // create  A Coupon
export const createCoupon = createAsyncThunk("coupon/createCoupon", async (formData, { rejectWithValue }) => {
  try {
    return await couponService.createCoupon(formData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});


    // Get All Coupons
    export const getCoupon = createAsyncThunk("coupon/getCoupon", async (_, { rejectWithValue }) => {
      try {
        return await couponService.getCoupon();
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return rejectWithValue(message);
      }
    });


    

    // Get A Single Coupon
    export const getACoupon = createAsyncThunk("coupon/getACoupon", async (couponName, { rejectWithValue }) => {
      try {
        return await couponService.getACoupon(couponName);
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return rejectWithValue(message);
      }
    });

        // Deleting A Single Coupon
        export const deleteACoupon = createAsyncThunk("coupon/deleteACoupon", async (id, { rejectWithValue }) => {
          try {
            return await couponService.deleteACoupon(id);
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
   coupon :null,
   coupons:[],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: ""
 
}

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {


    REMOVE_COUPON: (state, action)=>{
      state.coupon = null
    }
  },
  extraReducers: (builder)=> {
  builder
          // create A coupon
          .addCase(createCoupon.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createCoupon.fulfilled, (state, action) => {
           state.isError= false;
            state.isLoading = false;
            state.isSuccess = true;
    
            toast.success("coupon created successfully...");
          
          })
          .addCase(createCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          
            toast.error(action.payload);
            console.log(action.payload)
           
          })

               // Get All coupons
               .addCase(getCoupon.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(getCoupon.fulfilled, (state, action) => {
               state.isError= false;
                state.isLoading = false;
                state.isSuccess = true;
                 state.coupons = action.payload
                toast.success(action.payload);
                console.log(action.payload)
              
              })
              .addCase(getCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
              
                toast.error(action.payload);
                console.log(action.payload)
               
              })


             
              
               // Getting A coupon
               .addCase(getACoupon.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(getACoupon.fulfilled, (state, action) => {
               state.isError= false;
                state.isLoading = false;
                state.isSuccess = true;
                 state.coupon = action.payload
                toast.success(action.payload);
                console.log(action.payload)
              
              })
              .addCase(getACoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
              
                toast.error(action.payload);
                console.log(action.payload)
               
              })

                  // Deleting A coupon
                  .addCase(deleteACoupon.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(deleteACoupon.fulfilled, (state, action) => {
                   state.isError= false;
                    state.isLoading = false;
                    state.isSuccess = true;
                  
                    toast.success(action.payload);
                    console.log(action.payload)
                  
                  })
                  .addCase(deleteACoupon.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                  
                    toast.error(action.payload);
                    console.log(action.payload)
                   
                  })
    

  }


});

export const {REMOVE_COUPON} = couponSlice.actions

export default couponSlice.reducer



