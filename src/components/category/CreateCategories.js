import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createCategory } from '../../feature/categoryAndBrand'
import Loader from '../Loader'

// I



const CreateCategories = ({reloadCategories}) => {
    const [name, setName] = useState("")
    const {isLoading}  = useSelector((state) => state?.category)

   const dispatch =  useDispatch()


    const  saveCategory = (async(e)=>{
      console.log(`the name is ${name}`)
      e.preventDefault()

      if(name.length < 3){
        return toast.error(" Name should be at least three characters")
      }

      const formData = {
        name
      }

 await dispatch(createCategory(formData))
      setName(" ")
      reloadCategories()
    })

  

    
  return (
    <>  
      {isLoading && <Loader/>}
    <Container>
    
        <Contain>
     
            <div >  
            <br />   
            <h3>Create Category</h3>
       
            <span>use the form to <b>Create A category</b> </span>
 
            <Form>
            <p>Category Name</p>
          <form onSubmit={saveCategory} >
          
            <input type="text"
           
             placeholder="Category Name" 
             value={name}
             onChange={(e)=> setName(e.target.value)}
             required />

             <button type='onSubmit' >Save Category</button>
            </form>
            </Form>
            </div>
        </Contain>
       
        </Container>
        </>
  )
}





export default CreateCategories

const Container = styled.div`
width:100%;
height:100%;
position: relative;

`


const Contain = styled.div`
padding-left:10%;

div{
  text-align:center;
@media (max-width:768px ){
  h3{
    font-weight:600;
    font-size:14px !important;
    padding-left:5px !important;
    
  };
  p{
  // font-size:12px !important;
    padding-left:5px !important;
  }
  
}

  span{
    color:black;
    font-weight:600;
    font-size:12px;
   text-align:center ;
    color:#996633;

  };
  h3{
 
   line-height:0;
    font-size:20px;
    text-align:center;
   

  }
}

`

const Form = styled.div`

background-color:#ece5e5;
  padding: 5px 7px;
  margin-left: -10px;
  padding-bottom: 35px;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  animation: slide-up 0.5s ease;


 @media (max-width:768px) {

  padding-bottom: 25px !important ;
  border-radius: 5px !important ;
  
//  width:100%;
  
 }

  div {
    a {
      font-size: 12px;
      font-weight: bold;
      text-decoration: none;
      color: black;
      opacity: 0.5;
      &:hover{
        color:red;
      }
    }
  }

  p {
    text-align: center !important;
    font-size: 28px;
    font-weight: 600;
    color: #e28743;
    opacity: 1 !important;
    line-height: 0;

    @media (max-width:768px) {
      font-size: 23px !important;
      
    }
    &:last-child {
      font-weight: bold;
      text-align: center !important;
      font-size: 15px ;
      color: black !important;
      opacity: 0.5 !important;
      
      @media (max-width:768px) {
        font-size: 12px !important;
        
      }
    }
  }

  form {
  //  position: relative !important;
  //  z-index: 20 !important;
  padding:12px 12px;
  
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
    input {
      animation: slide-up 0.5s ease;
      width: 350px;
      height: 25px;
      padding: 5px;
      margin-bottom: 3px;
      border-radius: 3px;
      border: none;
      opacity: 0.5;
      cursor:pointer;

      @media (max-width:768px) {
        width: 245px !important ;
      height: 20px !important ;
      padding: 5px !important ;
      margin-bottom: 3px !important ;
      border-radius: 3px !important ;
      border: none;
      opacity: 0.5;
        
      }

      &:hover {
        background-color: lightblue !important;
      }
    }

    button {
      width: 358px;
      padding: 12px;
      background-color: #1e81b0;
      border: none;
      border-radius: 3px;
      color: white;
      font-weight: 400;
      animation: slide-up 0.5s ease;
  
      @media (max-width:768px) {
        width: 253px !important ;
          
        
    //  padding: 7px !important ;
      background-color: #1e81b0;
      border: none;
      border-radius: 3px !important ;
     // color: white;
      font-weight: 400 !important ;

        
      }






      &:hover {
        background-color: #76b5c5;
      }
    }
  }
`;