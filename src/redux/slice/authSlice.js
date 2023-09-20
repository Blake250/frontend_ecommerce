import { createSlice } from '@reduxjs/toolkit'

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


export default authSlice.reducer