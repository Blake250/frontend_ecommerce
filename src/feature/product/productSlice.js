
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productService from "./productService";



export const createProducts = createAsyncThunk("product/createProducts", async (formData, { rejectWithValue }) => {
    try {
      return await productService.createProducts(formData);
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
    product: null,
    products:[],
    minPrice:null,
    maxPrice:null,
    totalStoreValue:0,
    outOfStock:0,
    category:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""

}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},


  extraReducers: (builder) => {
    builder

            // create Categories
            .addCase(createProducts.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(createProducts.fulfilled, (state, action) => {
             state.isError= false;
              state.isLoading = false;
              state.isSuccess = true;
              state.products = action.payload
  
              toast.success("Product created successfully...");
              console.log(action.payload)
            })
            .addCase(createProducts.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
            
              toast.error(action.payload);
              console.log(action.payload)
             
            })


        }




});

export const {} = productSlice.actions

export default productSlice.reducer