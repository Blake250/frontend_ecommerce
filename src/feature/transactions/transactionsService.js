import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL 
//const BACKEND_URL = "https://api-shopito-app.onrender.com"


  export const API_URL = `${BACKEND_URL}/api/`


  //get all transactions
  const getTransactions = async ()=>{
    const response = await  axios.get( `${API_URL}transaction/getTransactions`, {withCredentials : true,  

    headers: {'Content-Type': 'application/json'}   

    }) 
    
    return response.data
      
    } 

    //verify the account
    
  const verifyAccount = async (formData)=>{
    const response = await  axios.post( `${API_URL}transaction/verifyAccount`,formData, {withCredentials : true,  

    headers: {'Content-Type': 'application/json'}   

    }) 
    
    return response.data
      
    } 
    
// deposit Funds
    const transferFund = async (formData)=>{
        const response = await  axios.post( `${API_URL}transaction/transferFund`,formData, {withCredentials : true,  
    
        headers: {'Content-Type': 'application/json'}   
    
        }) 
        
        return response.data.message
        
        } 
    








    const  transactionsService = {
        getTransactions,
        verifyAccount,
        transferFund
    }




    export default transactionsService
