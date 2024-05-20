import axios from "axios";



//const BACKEND_URL = process.env.REACT_APP_BACKEND_URL 
const BACKEND_URL = `https://api-shopito-cgp4.onrender.com`

  export const API_URL = `${BACKEND_URL}/api/products/`


  // creating  a Category
  const createProducts = async (formData)=>{
    const response = await  axios.post( `${API_URL}`,formData, {withCredentials : true,  

    headers: {'Content-Type': 'application/json'}   

    }) 
    
    return response.data
      
    } 

    //Deleting a Product
    const deleteProduct = async (id)=>{
      const response = await  axios.delete( `${API_URL}/${id}`, {withCredentials : true,  
  
      headers: {'Content-Type': 'application/json'}   
  
      }) 
      
      return response.data
        
      } 

      // getting a single product
      const getSingleProduct = async (id)=>{
        const response = await  axios.get( `${API_URL}/${id} `, {withCredentials : true,  
    
        headers: {'Content-Type': 'application/json'}   
    
        }) 
        
        return response.data
          
        } 

        
      // getting a single product
      const updateProduct = async (id, formData)=>{
        const response = await  axios.patch( `${API_URL}/${id}`,formData, {withCredentials : true,  
    
        headers: {'Content-Type': 'application/json'}   
    
        }) 
        
        return response.data
          
        } 



    



  // getting  a product Category
  const getProducts = async ()=>{
    const response = await  axios.get( `${API_URL}`, {withCredentials : true,  

    headers: {'Content-Type': 'application/json'}   

    }) 
    
    return response.data
      
    } 









    const productService = {
        createProducts,
        getProducts,
        deleteProduct,
        getSingleProduct,
        updateProduct
    }






    export default productService;
