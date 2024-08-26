
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";







// Async action creator for registration
export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    return await authService.register(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});

// Async action creator for login
export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
  try {
    return await authService.login(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});


//LogOut the user

export const logOut= createAsyncThunk("auth/logOut", async (_, { rejectWithValue }) => {
  try {
    return await authService.logOut();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});



// getting the user's login status
export const getLoginStatus = createAsyncThunk("auth/getLoginStatus", async (_, { rejectWithValue }) => {
  try {
    return await authService.getLoginStatus();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});



// getting the user data
export const getUser = createAsyncThunk("auth/getUser", async (userData, { rejectWithValue }) => {
  try {
    return await authService.getUser(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});


// updating the user's information
export const updateUser = createAsyncThunk("auth/updateUser", async (userData, { rejectWithValue }) => {
  try {
    return await authService.updateUser(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});




//updating the user's Photo
export const updatePhoto = createAsyncThunk("auth/updatePhoto", async (userData, { rejectWithValue }) => {
  try {
    return await authService.updatePhoto(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});


//add To wishlist
export const addToWishlist = createAsyncThunk("auth/addToWishlist", async (productData, { rejectWithValue }) => {
  try {
    return await authService.addToWishlist(productData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});



//get wishlist
export const getWishList = createAsyncThunk("auth/getWishList", async (_, { rejectWithValue }) => {
  try {
    return await authService.getWishList();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});



//remove  From  wishlist
export const removeFromWishList = createAsyncThunk("auth/wishlist", async (productID, { rejectWithValue }) => {
  try {
    return await authService.removeFromWishList(productID);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return rejectWithValue(message);
  }
});








// Initial state for auth
const initialState = {
  isLoggedIn: false,
  user:null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
 wishlist : []
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET_AUTH: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    }
  },
  extraReducers: (builder) => {
    builder

            // Register reducers
            .addCase(register.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
             state.isLoggedIn = true;
                
              state.user = action.payload;
              state.isLoading = false;
              state.isSuccess = true;
          
              toast.success(action.payload);
              console.log(action.payload)
            })
            .addCase(register.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
              state.user = null;
              toast.error(action.payload);
              console.log(action.payload)
             
            })
      



      // Login the user
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
     //   state.cartItems = action.payload.cartItems
        toast.success("Login is Successful!");
        console.log(action.payload)
     
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
        state.isLoggedIn = false;
       state.user = null;
        toast.error(action.payload);
      })


     // Logout the user
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = null;
        toast.success(action.payload);
        
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        
        state.message = action.payload;
        
        toast.error(action.payload);
      })


        // get the user's LoginStatus 
        .addCase(getLoginStatus.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getLoginStatus.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isLoggedIn = action.payload;
          console.log(action.payload);
          if(state.isLoggedIn.message === "Invalid Signature"){
            state.isLoggedIn = false
          }
          
        })
        .addCase(getLoginStatus.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload; 
          toast.error(action.payload);
        })


        // getting the user's information
           .addCase(getUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isLoggedIn = true;
            state.user = action.payload
            console.log(action.payload);
        
            
          })
          .addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload; 
            toast.error(action.payload);
          })


          
        // updating the user's information
        .addCase(updateUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isLoggedIn = true;
          state.user = action.payload
          toast.success(action.payload)
          toast.success("data saved successfully")
          console.log(action.payload);
      
          
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload; 
          toast.error(action.payload);
        })

             // updating the user's Photo
             .addCase(updatePhoto.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(updatePhoto.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.isLoggedIn = true;
              state.user = action.payload
              toast.success("photo uploaded successfully")
              toast.success(action.payload);
          
              
            })
            .addCase(updatePhoto.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload; 
              toast.error(action.payload);
           
            })


             // Add to wishlist

             .addCase(addToWishlist.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
             
              state.message = action.payload.message
              toast.success(action.payload.message)
              console.log(action.payload);
          
              
            })
            .addCase(addToWishlist.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload; 
              toast.error(action.payload);
              console.log(action.payload);
           
            })


                    // get wishlist

                    .addCase(getWishList.pending, (state) => {
                      state.isLoading = true;
                    })
                    .addCase(getWishList.fulfilled, (state, action) => {
                      state.isLoading = false;
                      state.isSuccess = true;
                     
                     // state.wishlist = action.payload.wishlist
                     state.wishlist = Array.isArray(action.payload.wishlist) ? action.payload.wishlist : []

                    //  toast.success(action.payload)
                    console.log(action.payload);
                  
                      
                    })
                    .addCase(getWishList.rejected, (state, action) => {
                      state.isLoading = false;
                      state.isError = true;
                      state.message = action.payload; 
                       toast.error(action.payload);
                       console.log(action.payload);
                   
                    })


              // remove  from wishlist

             .addCase(removeFromWishList.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(removeFromWishList.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
             
              state.message = action.payload.message
              toast.success(action.payload.message)
              //console.log(action.payload);
          
              
            })
            .addCase(removeFromWishList.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload; 
              toast.error(action.payload);
              console.log(action.payload);
           
            })

        




  

  }
});

export const { RESET_AUTH } = authSlice.actions;
export const {selectIsLoggedIn}= (state)=> state.auth.isLoggedIn


export default authSlice.reducer;






















/*import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn : false,
    email:null,
    useName: null,
    userIDE:null


};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

      setActiveUser : (state,action)=>{
        console.log(action.payload)
        const {email, usedName, userID} = action.payload
         state.isLoggedIn = true
          state.email = email
          state.useName = usedName
          state.userIDE = userID

      },
      removeActiveUser: (state, action)=>{
        state.isLoggedIn = false
        state.email = null;
        state.useName = null;
        state.userIDE = null;
        
     // console.log(state.isLoggedIn)
    

      }
  }
});

export const {setActiveUser,removeActiveUser} = authSlice.actions


export default authSlice.reducer*/