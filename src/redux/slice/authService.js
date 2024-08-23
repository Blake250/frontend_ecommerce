import axios from "axios";




/*
let headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('GET', 'POST', 'OPTIONS');
headers.append('Authorization', 'Basic ' );*/



 //const BACKEND_URL = process.env.REACT_APP_BACKEND_URL 
const BACKEND_URL = `${process.env}/https://api-shopito-cgp4.onrender.com`

  export const API_URL = `${BACKEND_URL}/api/user/`
  

     // fetching the user's registration info
    const register = async (userData)=>{
        const response = await  axios.post( `${API_URL}register`,userData, 
        {
          
      withCredentials : true,
    
    headers: {'Content-Type': 'application/json'}   
    
    
        }) 
        
        return response.data
          
        } 
        

 // fetching the user's Login info
const login = async(userData)=>{

  const response = await axios.post(`${API_URL}login`, userData, {
    withCredentials :true,
 headers:{"Content-Type": "application/json"}

  })
  return response.data
}

// logging out a user
const logOut = async()=>{

  const response = await axios.get(`${API_URL}logOut`, {
   withCredentials :true,
  headers:{"Content-Type": "application/json"}
  })
  return response.data.message
}


// fetching the user's LoginDetails
const getLoginStatus = (async()=>{

const response =  await axios.get(`${API_URL}getLoginStatus`,{
   withCredentials :true,
    headers:{"Content-Type": "application/json"}
  })
  return response.data

})

// getting the user
const getUser = (async()=>{

  const response =  await axios.get(`${API_URL}getData`, {
     withCredentials :true,
      headers:{"Content-Type": "application/json"}
    })
    return response.data
  
  })

  
  // update the user's data
  const updateUser = (async(userData)=>{

    const response =  await axios.patch(`${API_URL}updateUser`,userData, {
       withCredentials :true,
       headers:{"Content-Type": "application/json"}
      })
      return response.data
    
    })

  


  // update the user's Photo
  const updatePhoto = (async(userData)=>{

   

    const response =  await axios.patch(`${API_URL}updatePhoto`,userData, {
      withCredentials :true,
        headers:{"Content-Type": "application/json"}
      })
      return response.data
    
    })


// add to wishlist
const addToWishlist = (async(productData)=>{
  const response = await axios.post(`${API_URL}addToWishlist`, productData,{
   withCredentials:true,
   headers:{'Content-Type' : 'application/json'}

  })
  console.log("API Response:", response.data); 
  return response.data

})


// get all wishlist
const getWishList = (async()=>{
  const response = await axios.get(`${API_URL}getWishList`,{
    withCredentials: true,
   headers : {'Content-Type' : 'application/json'}
  })
  return response.data
})


// remove from wishlist
const removeFromWishList = (async(productID)=>{
const response = await axios.put(`${API_URL}wishlist/${productID}`,{
  withCredentials: true,
  headers: {'Content-Type' : 'application/json'}
})
return response.data
})






 const authService= {
   register,
   login,
   logOut,
   getLoginStatus,
   getUser,
   updateUser,
   updatePhoto,
   addToWishlist,
   getWishList,
   removeFromWishList

    }

    export default authService
