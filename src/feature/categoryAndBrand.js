import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import catAndBrandSlice from "./catAndBrandSlice";
import { toast } from "react-toastify";



// create  A Category
export const createCategory = createAsyncThunk("category/createCategory", async (formData, { rejectWithValue }) => {
  try {
    return await catAndBrandSlice.createCategory(formData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});

  
// get  A Category
export const getCategories = createAsyncThunk("category/getCategories", async (_, { rejectWithValue }) => {
  try {
    return await catAndBrandSlice.getCategories();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});


// delete  A Category
export const deleteCategories = createAsyncThunk("category/deleteCategories", async (slug, { rejectWithValue }) => {
  try {
    return await catAndBrandSlice.deleteCategories(slug);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});

// create A Brand 
export const createBrand = createAsyncThunk("category/createBrand", async (formData, { rejectWithValue }) => {
  try {
    return await catAndBrandSlice.createBrand(formData);
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
    category : [],
    brand : [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
  

}


const categoryAndBrandSlice = createSlice({
   name:"category",
   initialState,

   reducers:{
    RESET_CAT: (state) => {
        state.isLoggedIn = false;
        state.category = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = "";
      }

   },
   extraReducers: (builder) => {
    builder

            // create Categories
            .addCase(createCategory.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
             state.isError= false;
              state.isLoading = false;
              state.isSuccess = true;
           //   state.category = action.push(action.payload)
              toast.success("category created successfully...");
              console.log(action.payload)
            })
            .addCase(createCategory.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
            
              toast.error(action.payload);
              console.log(action.payload)
             
            })

                // getCategories
                .addCase(getCategories.pending, (state) => {
                  state.isLoading = true;
                })
                .addCase(getCategories.fulfilled, (state, action) => {
                 state.isError= false;
                  state.isLoading = false;
                  state.isSuccess = true;
                 state.category = action.payload
                //  toast.success("category created successfully...");
                  console.log(action.payload)
                })
                .addCase(getCategories.rejected, (state, action) => {
                  state.isLoading = false;
                  state.isError = true;
                  state.message = action.payload;
                
                  toast.error(action.payload);
                  console.log(action.payload)
                 
                })

                   // deleteCategories
                   .addCase(deleteCategories.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(deleteCategories.fulfilled, (state, action) => {
                   state.isError= false;
                    state.isLoading = false;
                    state.isSuccess = true;
                
                  //  toast.success("category created successfully...");
                    console.log(action.payload)
                  })
                  .addCase(deleteCategories.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                  
                    toast.error(action.payload);
                    console.log(action.payload)
                   
                  })


                    // creating a  getBrand
                .addCase(createBrand.pending, (state) => {
                  state.isLoading = true;
                })
                .addCase(createBrand.fulfilled, (state, action) => {
                 state.isError= false;
                  state.isLoading = false;
                  state.isSuccess = true;
                 state.category = action.payload
                 toast.success("Brand created successfully...");
                  console.log(action.payload)
                })
                .addCase(createBrand.rejected, (state, action) => {
                  state.isLoading = false;
                  state.isError = true;
                  state.message = action.payload;
                
                  toast.error(action.payload);
                  console.log(action.payload)
                 
                })
        }
      
        })

    
      



export const {RESET_CAT} = categoryAndBrandSlice.actions
export default categoryAndBrandSlice.reducer