
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productService from "./productService";


//creating  a Product
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



  

  // Getting Products
  export const getProducts = createAsyncThunk("product/getProducts", async (_, { rejectWithValue }) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return rejectWithValue(message);
    }
  });



  //deleting a Product
export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id, { rejectWithValue }) => {
  try {
    return await productService.deleteProduct(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});

//Getting A single Product
 
  export const getSingleProduct = createAsyncThunk("product/getSingleProduct", async (id, { rejectWithValue }) => {
    try {
      return await productService.getSingleProduct(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return rejectWithValue(message);
    }
  });
  

  //updating a product
  export const updateProduct = createAsyncThunk("product/updateProduct", async ({id, formData}, { rejectWithValue }) => {
    try {
      return await productService.updateProduct(id, formData);
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
    message: "",
 


}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {

    RESET_PRODUCT: (state) => {
   
   
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },


 



   GET_PRICE_RANGE:(state, action)=>{
     const {products} = action.payload
     let array = []
     products?.map((product)=>{
       const price = product?.price
     
      return  array?.push(price)
     })
   
   const newMaxPrice = Math.max(...array)
    const newMinPrice = Math.min(...array)

    state.minPrice = newMinPrice
    state.maxPrice = newMaxPrice



 
      }

      

    
  },

    
  
  extraReducers: (builder) => {
    builder

            // create Product
            .addCase(createProducts.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(createProducts.fulfilled, (state, action) => {
             state.isError= false;
              state.isLoading = false;
              state.isSuccess = true;
            //  console.log(action.payload)
              if(action?.payload && action.payload?.hasOwnProperty("message")){
            toast.error(action.payload.message)
              }
              else{
                state.message = "Product Created Successfully"
                toast.success("Product created successfully...");
              }
            
     
            })
            .addCase(createProducts.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
           
              toast.error(action.payload);
              console.log(action.payload)
             
            })

            
            // getting Product
            .addCase(getProducts.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
             state.isError= false;
              state.isLoading = false;
              state.isSuccess = true;
             state.products = action.payload
  
              console.log(action.payload)
     
            })
            .addCase(getProducts.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
            
              toast.error(action.payload);
              console.log(action.payload)
             
            })


            //Deleting a Product
       
            .addCase(deleteProduct.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
             state.isError= false;
              state.isLoading = false;
              state.isSuccess = true;
              
              toast.success("Product deleted successfully")
  
              console.log(action.payload)
     
            })
            .addCase(deleteProduct.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
            
              toast.error(action.payload);
              console.log(action.payload)
             
            })
            
            
            
            // getting A single Product
            .addCase(getSingleProduct.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
             state.isError= false;
              state.isLoading = false;
              state.isSuccess = true;
             state.product = action.payload
          
       
       
          
          })
        
            .addCase(getSingleProduct.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
            
              toast.error(action.payload);
              console.log(action.payload)
             
            })



            
    // updating a product
      
    .addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
     state.isError= false;
      state.isLoading = false;
      state.isSuccess = true;
      console.log(action.payload)
      if(action?.payload && action.payload?.hasOwnProperty("message")){
        toast.error(action.payload.message)
          }
          else{
            state.message = "Product Updated Successfully"
            toast.success("Product updated successfully...");
          }
        
        
  
     
     // toast.success("Product updated successfully")
    

    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    
      toast.error(action.payload);
      console.log(action.payload)
     
    })
    



            
            
   


        }




});

export const {RESET_PRODUCT, GET_PRICE_RANGE} = productSlice.actions

export default productSlice.reducer