import axios from "axios"



const BACKEND_URL = process.env.REACT_APP_BACKEND_URL 
//const BACKEND_URL = "https://api-shopito-app.vercel.app/"


  export const API_URL = `${BACKEND_URL}/api/user/`


// saveCart
  const saveCartDB = async(cartData)=>{

    const response = await axios.patch(`${API_URL}saveCart`, cartData, {
      withCredentials :true,
   headers:{"Content-Type": "application/json"}
  
    })
    return response.data
  }



  
// getCart
const getCart = async()=>{

    const response = await axios.get(`${API_URL}getCart`, {
      withCredentials :true,
   headers:{"Content-Type": "application/json"}
  
    })
    return response.data
  }




  const cartService = {
    saveCartDB,
    getCart
  }




  export default cartService