import axios from "axios";



const BACKEND_URL = process.env.REACT_APP_BACKEND_URL 

  export const API_URL = `${BACKEND_URL}/api/products/`


  // creating  a Category
  const createProducts = async (formData)=>{
    const response = await  axios.post( `${API_URL}`,formData, {withCredentials : true,  

    headers: {'Content-Type': 'application/json'}   

    }) 
    
    return response.data
      
    } 












    const productService = {
        createProducts,
    }






    export default productService;