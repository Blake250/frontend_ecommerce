import axios from "axios";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL 
  export const API_URL = `${BACKEND_URL}/api/coupon`







// create Coupon
    const createCoupon = async (formData)=>{
        const response = await  axios.post( `${API_URL}/createCoupon`,formData, {withCredentials : true,  
    
        headers: {'Content-Type': 'application/json'}   
    
        }) 
        
        return response.data
          
        } 

        // Get All Coupons
    const getCoupon = async ()=>{
      const response = await  axios.get( `${API_URL}/getCoupon`, {withCredentials : true,  
  
      headers: {'Content-Type': 'application/json'}   
  
      }) 
      
      return response.data
        
      } 


// Get A  singleCoupon
    const getACoupon = async (couponName)=>{
      const response = await  axios.get( `${API_URL}/${couponName}`, {withCredentials : true,  
  
      headers: {'Content-Type': 'application/json'}   
  
      }) 
      
      return response.data
        
      } 



// Deleting A  singleCoupon
const deleteACoupon = async (id)=>{
  const response = await  axios.delete( `${API_URL}/${id}`, {withCredentials : true,  

  headers: {'Content-Type': 'application/json'}   

  }) 
  
  return response.data.message
    
  } 











        const couponService = {
          createCoupon,
          getCoupon,
          getACoupon,
          deleteACoupon,
        }






        export default couponService