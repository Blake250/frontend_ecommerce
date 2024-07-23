import axios from "axios";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL 
//const BACKEND_URL = "https://api-shopito-cgp4.onrender.com"
  export const API_URL = `${BACKEND_URL}/api/order/`




// create Order
    const createOrder = async (formData)=>{
        const response = await  axios.post( `${API_URL}`,formData, {
        withCredentials : true,  
    
        headers: {'Content-Type': 'application/json'}   
    
        }) 
        
        return response.data.message
          
        } 
      
        // getting orders
        const getOrder = async ()=>{
            const response = await  axios.get( `${API_URL}`, {
            withCredentials : true,  
        
            headers: {'Content-Type': 'application/json'}   
        
            }) 
            
            return response.data
              
            } 

            // getting a single order

            const singleOrder = async (id)=>{
                const response = await  axios.get( `${API_URL}${id}`, {
                withCredentials : true,  
            
                headers: {'Content-Type': 'application/json'}   
            
                }) 
                
                return response.data
                  
                } 


                // update Order Status

                const updateOrderStatus = async (id, formData)=>{
                    const response = await  axios.patch( `${API_URL}${id}`, formData, {
                    withCredentials : true,  
                
                    headers: {'Content-Type': 'application/json'}   
                
                    }) 
                    
                    return response.data.message
                      
                    } 





    const orderService = {
        createOrder,
        getOrder,
        singleOrder,
        updateOrderStatus

    }



    export default orderService
