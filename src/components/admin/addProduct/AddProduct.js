import React, { useEffect,useRef } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../Loader'
import ProductForm from '../productForm/ProductForm'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { RESET_PRODUCT, createProducts } from '../../../feature/product/productSlice'
import { toast } from 'react-toastify'


const AddProduct = () => {
   const navigate = useNavigate()
  const containerRef = useRef(null)

 const adjustContainerHeight = () => {
    if (containerRef.current) {
      const height = containerRef.current.scrollHeight;
      if (height > window.innerHeight) {
        containerRef.current.style.height = `${800}vh`;
      }
    }
  };





  const initialState = {
     name:"",
     category: "",
     brand: "",
     quantity: "",
     color: "",
     price : "",
     regularPrice: "",

  }

  const {isLoading, message} = useSelector((state)=> state?.product)

  const [product, setProduct] = useState(initialState)
 
  const [description, setDescription] = useState()
  const [files, setFiles] = useState()

  const  {name, category,brand, quantity, color, price, regularPrice  } = product
 


const dispatch = useDispatch()









const generateSku = ((category)=>{
const letter = category.slice(0, 3)
const number = Date.now()
const sku = letter  + "-" + number
return sku
})





const saveProduct = (async(e)=>{
 
e.preventDefault()
if(files?.length < 1){
  return toast.error("Please Upload a  a photo")
}
const formData = {
  name,
  sku:generateSku(category),
  category,
  brand,
  color,
  quantity:Number(quantity),
  regularPrice,
  price,
  description,
  image:files


}

const data = await  dispatch(createProducts(formData))
console.log(data)


})

useEffect(()=>{
  if(message === "Product Created Successfully"){
    navigate("/admin/view-products")
  }
  dispatch(RESET_PRODUCT())
}, [message,navigate,dispatch])







  return (
    <Container   >
      {isLoading && (<Loader/>)}
      <Contain  >
       <div>   
  
   <ProductForm
   
  product={product}
   saveProduct={saveProduct}

    isEditing={false}

    description={description}
    setDescription={setDescription}
    files={files}
    setFiles={setFiles}
    setProduct={setProduct}
    
    />
    
       </div>
   
      </Contain>
    </Container>
  )
}

export default AddProduct



const Container = styled.div`


`

const Contain = styled.div`
width:100%;


padding-bottom:220px;
@media (max-width:768px) {
  
padding:0px!important ;

margin-bottom:'20px'
}

`