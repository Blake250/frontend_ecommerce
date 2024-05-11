import React, { useEffect } from 'react'
import styled from 'styled-components'
import Loader from '../Loader'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBrands, getCategories } from '../../feature/categoryAndBrand'
import { toast } from 'react-toastify'
import { createBrand } from '../../feature/categoryAndBrand'

const CreateBrand = ({reloadBrand}) => {
    const [name, setName] = useState()
    const [category, setCategory] = useState()
    const {isLoading, categories} = useSelector((state)=> state?.category)

 






const dispatch = useDispatch()

useEffect(()=>{
  dispatch(getCategories())

}, [dispatch])





const saveBrand = (async(e)=>{
 //   console.log( `saving the bt=rand of ${JSON.stringify(e)}`)
  e.preventDefault()
  if(name.length < 3){
   return  toast.error("Brand name must be Upto 3  characters")
  }
  if(!category){
  return  toast.error("Please add a current category")
  }

  const formData = {
    name,
    category
  }
 await dispatch(createBrand(formData))
  await dispatch(getBrands())

 setName("")
reloadBrand()
 
})

return (
    <Container  >
    {isLoading && <Loader/>}

     <h3>Create Brand</h3>
       
   <span>use the form to <b>Create A Brand</b> </span>
      <Form onSubmit={saveBrand}>
        <FormItem>
          <Label htmlFor="productName">Brand Name:</Label>
          <Input
            type="text"
            id="productName"
            name="name"
            placeholder="Product Name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            required
          />
        </FormItem>
        <FormItem>
          <Label htmlFor="brandCategory">Parent Category:</Label>
          <Select
            id="brandCategory"
            name="category"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
          >
         
              <option >Select Category</option>
         
            {  categories.length > 0 && categories?.map((cat) => (
              <option key={cat?._id} value={cat?.name}>
                {cat?.name}
              </option>
            ))}
          </Select>
        </FormItem>
    
        <Button type="submit">Save Product</Button>
      </Form>
    </Container>
  );

    }
export default CreateBrand


const Container = styled.div`
   margin-left: 140px !important;

  margin-top:40px;
 // height:100vh;
  width:100%;
  span{
    padding-left:180px !important;
    font-size:20px !important;
  }
  
  @media (max-width:768px) {
    margin-left: 5px !important;
    span{
      padding-left:70px !important;
      font-size:13px !important;
      b{
     
      }
    }
    h3{
    text-align:center;
    padding-left:0px !important;
    margin-right:17px;
  }
    
  }
  h3{
    text-align:center;
    padding-left:30px;
  }
  span{
    font-size:13px;
    text-align:center;
    padding-left:110px;
    color:#993333;
    b{
     //s text-align:center;
    }
  }
  @keyframes slide-up {
    0% {
      transform: translateY(-5rem);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes slide-down {
    0% {
      transform: translateY(5rem);
    }
    100% {
      transform: translateY(0);
    }
  }

`;

const Form = styled.form`
//  background-color: #ece5e5;
animation: slide-down 0.5s ease;
  background-color: #ccc;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  width:90% !important;

  @media (max-width:768px) {
    padding: 20px;
    width:81% !important;
  }
`;

const FormItem = styled.div`
  margin-bottom: 15px;
 // width:350px;
  

`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  padding: 5px;
  border-radius: 3px;
  border: none;
  opacity: 0.5;
`;

const Select = styled.select`
  width: 102.1%;
  height: 44px;
  padding: 5px;
  border-radius: 3px;
  border: none;
  opacity: 0.5;
  @media (max-width:768px) {
    width: 105%;
    //height: 35px;
    
    }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #1e81b0;
  border: none;
  border-radius: 3px;
  color: white;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background-color: #76b5c5;
  }
`;




