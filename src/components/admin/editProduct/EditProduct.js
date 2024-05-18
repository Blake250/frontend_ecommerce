import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
//import { getSingleProduct} from '../../../feature/product/productSlice'
import { useEffect, useState } from 'react'
import { getSingleProduct, updateProduct,RESET_PRODUCT  } from '../../../feature/product/productSlice'

import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../productForm/ProductForm'
import Loader from '../../Loader'



const EditProduct = () => {
  const productEdit = useSelector((state)=> state?.product?.product) 

  const {isLoading, message} = useSelector((state)=> state.product) 
 

  

  const [product, setProduct] = useState(productEdit)
 
  const [description, setDescription] = useState()
  const [files, setFiles] = useState()
   const dispatch =  useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()



 

    useEffect(()=>{
      dispatch(getSingleProduct(id))
   
   },[dispatch, id])






   useEffect(()=>{
    setProduct(productEdit)
    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    )
    if(productEdit && productEdit.image){
      setFiles(productEdit?.image)
    }
 
 },[productEdit])




const saveProduct = (async(e)=>{
 
  e.preventDefault()
  if(files?.length < 1){
    return toast.error("Please Upload a  a photo")
  }else{
  const formData = {
    name : product?.name,

    category: product?.category,
    brand:product?.brand,
    color: product?.color,
    quantity:Number(product?.quantity),
    regularPrice : product?.regularPrice,
    price:product?.price,
    description,
    image:files
  
  
  }
  
  const data = await  dispatch(updateProduct({id, formData}))
  console.log(data)
  //navigate("/admin/view-products")
}
  })

  useEffect(()=>{
    if(message === "Product Updated Successfully"){
      navigate("/admin/view-products")
    }
    dispatch(RESET_PRODUCT())
  }, [message,navigate,dispatch])


  return (
    <Container>

{isLoading && (<Loader/>)}
      <Contain  >
       <div>   
  
   <ProductForm
   
  product={product}
   saveProduct={saveProduct}
  setProduct={setProduct}
    isEditing={true}

    description={description}
    setDescription={setDescription}
    files={files}
    setFiles={setFiles}
    
    />
    
       </div>
       </Contain>
   
      </Container>
  )
}

export default EditProduct


const Container = styled.div`
width:100%;
//height:100%;
padding-bottom:10px;
@media(max-width:768px){
  //height:100%;
margin-bottom:0px !important;
  }

`

const Contain = styled.div`
width:100%;
height:100%;

`