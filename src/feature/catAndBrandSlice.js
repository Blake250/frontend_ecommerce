import axios from "axios";



//const BACKEND_URL = process.env.REACT_APP_BACKEND_URL 
const BACKEND_URL = "https://api-shopito-app.vercel.app"

  export const API_URL = `${BACKEND_URL}/api/`


  // creating  a Category
  const createCategory = async (formData)=>{
    const response = await  axios.post( `${API_URL}category/createCategory`,formData, {withCredentials : true,  

    headers: {'Content-Type': 'application/json'}   

    }) 
    
    return response.data
      
    } 

    //getCategories

    const getCategories = async ()=>{
      const response = await  axios.get( `${API_URL}category/getCategories`, {withCredentials : true,  
  
      headers: {'Content-Type': 'application/json'}   
  
      }) 
      
      return response.data
        
      } 

      //deleteCategories

    const deleteCategories = async (slug)=>{
      const response = await  axios.delete( `${API_URL}category/${slug}`, {withCredentials : true,  
  
      headers: {'Content-Type': 'application/json'}   
  
      }) 
      
      return response.data.message
        
      } 


      //Create A  Brand
      const createBrand = async (formData)=>{
        const response = await  axios.post( `${API_URL}brand/createBrand`,formData, {withCredentials : true,  
    
        headers: {'Content-Type': 'application/json'}   
    
        }) 
        
        return response.data
          
        } 
  
   
         //get  Brands
      const getBrands = async ()=>{
        const response = await  axios.get( `${API_URL}brand/getBrands`, {withCredentials : true,  
    
        headers: {'Content-Type': 'application/json'}   
    
        }) 
        
        return response.data
          
        } 

             //delete  Brands
      const deleteBrand = async (slug)=>{
        const response = await  axios.delete( `${API_URL}brand/${slug}`, {withCredentials : true,  
    
        headers: {'Content-Type': 'application/json'}   
    
        }) 
        
        return response.data.message
          
        } 
  
    







    
const catAndBrandSlice = {
    createCategory,
    getCategories,
    deleteCategories,
    createBrand,
    getBrands,
    deleteBrand,
}

 
export default catAndBrandSlice
