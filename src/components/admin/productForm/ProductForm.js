import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import {BsTrash} from "react-icons/bs"
import UploadWidgets from '../addProduct/uploadWidgets/UploadWidgets';
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories,getBrands } from '../../../feature/categoryAndBrand';


const ProductForm = ({
  saveProduct,
  product,
 setProduct,
 // categories,
  isEditing,
 // filteredBrands,
  description,
  setDescription,
  files,
  setFiles
}) => {

  const [filteredBrands, setFilteredBrands] = useState([])
  const {categories} = useSelector((state)=> state?.category)
  const [containerHeight, setContainerHeight] = useState(0)
   
  const brands = useSelector((state)=> state?.category?.brands)
const dispatch = useDispatch()




useEffect(() => {
  const totalImageHeight = files?.length * 110; // Adjust this value as needed
  setContainerHeight(`${totalImageHeight}vh`);
}, [files]);










    

// selected Category
const filteredProducts = ((selectedCategory)=>{
  const newBrand = brands?.filter((brand)=>  {
    return (
      (brand?.category === selectedCategory)
    )
  } 
  )

  setFilteredBrands(newBrand)


})

useEffect(()=>{
filteredProducts(product?.category)
//dispatch(getBrands())
},[product?.category, dispatch])


const handleInputChange = ((e)=>{
  e.preventDefault()
  const {name, value} = e.target
  setProduct({...product, [name]: value})
 // filteredProducts(value)
})


const handleCategoryChange = ((e)=>{
  e.preventDefault()
  const {name, value} = e.target
  setProduct({...product, [name]:value})
 // filteredProducts(value)

})


  const removeImage = (image)=>{
  setFiles(files.filter((img)=> img !== image))
  //setFiles("")
 }




  return (
    <Container style={{ height: containerHeight }} >
      <h3>Upload A widget</h3>
      <UploadWidgets  files={files} setFiles={setFiles} />
     <br />
      <Label htmlFor="productName">Product Images:</Label>
      <ImageDisplay>   
        <div>
         {
        files &&  files?.length > 0 && files?.map((image)=>
            (
              <Display key={image} >
                  <div>
                <img src={image} alt="imageDisplay" height={100} />
                </div>

               
                <span>
                  <BsTrash  size={20} onClick={()=> removeImage(image)} />
                  </span>

              </Display>

            )
          )
         }

       </div>
        </ImageDisplay>

  <br />
      <Form onSubmit={saveProduct}>
        <FormItem>
   
          <Label htmlFor="productName">Product Name:</Label>
          <Input
            type="text"
            id="productName"
            name="name"
            placeholder="Product Name"
            value={product?.name}
            onChange={handleInputChange}
            required
          />
        </FormItem>
        <FormItem>
          <Label htmlFor="productCategory">Product Category:</Label>
          <Select
            id="productCategory"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option value={product?.category}>{product?.category}</option>
            ) : (
              <option value="">Select Category</option>
            )}
            {categories.length > 0 && categories?.map((cat) => (
              <option key={cat?._id} value={cat?.name}>
                {cat?.name}
              </option>
            ))}
          </Select>
        </FormItem>
        <FormItem>
          <Label htmlFor="productBrand">Product Brand:</Label>
          <Select
            id="productBrand"
            name="brand"
            value={product?.brand}
            onChange={handleCategoryChange}
          >
            {isEditing ? (
              <option value={product?.brand}>{product?.brand}</option>
            ) : (
              <option value="">Select Brand</option>
            )}
            {  filteredBrands && filteredBrands.length !== 0 &&
            
            filteredBrands?.map((brand) =>{ return (
              <option key={brand?._id} value={brand?.name}>
                {brand?.name}
              </option>
            )}  )}
          </Select>
        </FormItem>
        <FormItem>
          <Label htmlFor="productColor">Product Color:</Label>
          <Input
            type="text"
            id="productColor"
            name="color"
            placeholder="Product Color"
            value={product?.color}
            onChange={handleInputChange}
          
          />
        </FormItem>
        <FormItem>
          <Label htmlFor="Regular Price">Regular Price:</Label>
          <Input
            type="text"
            id="Regular Price"
            name="regularPrice"
            placeholder="Regular Price"
            value={product?.regularPrice}
            onChange={handleInputChange}
          
          />
        </FormItem>
        <FormItem>
          <Label htmlFor="productPrice">Product Price:</Label>
          <Input
            type="text"
            id="productPrice"
            name="price"
            placeholder="Product Price"
            value={product?.price}
            onChange={handleInputChange}
         
          />
        </FormItem>
        <FormItem>
          <Label htmlFor="productQuantity">Product Quantity:</Label>
          <Input
            type="text"
            id="productQuantity"
            name="quantity"
            placeholder="Product Quantity"
            value={product?.quantity}
            onChange={handleInputChange}
            required
          />
      
      </FormItem>
      <DescriptionWrapper>
  <Label htmlFor="productDescription">Product Description:</Label>
  <ReactQuill
    theme="snow" 
    value={description}
    onChange={setDescription}
    modules={ProductForm.modules}
    formats={ProductForm.formats}
  />
</DescriptionWrapper>
<Button type="submit">Save Product</Button>   
      </Form>


      




    
    </Container>
    



  );
};




ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];






  
 
export default ProductForm;


const ImageDisplay = styled.div`
border:1px solid black;
padding:15px;
width:165%;
border-radius:5px;


div{
  display:flex;
  flex-direction:column;
}


`

const Display = styled.div`
display:flex;
width:100%;
justify-content:center;
align-items:center;
flex-direction:column;
border:2px dotted black;
margin:0 5px;



img{

  width:200px !important;
  border:2px solid black;
 // padding:5px;
  height:170px !important;
  border-radius:6px;
  padding:5px;
  margin:5px;
  @media (max-width:768px) {
    height:150px !important;
  border-radius:3px;
  padding:5px;
  margin:5px;
  
  width:180px !important;
    
  }
    


}
span{
  svg{
    color:red;
    cursor:pointer;
    background-color:darkgrey;
    padding:3px 12px;
    border-radius:5px;
   
    &:hover{
      background-color:lightgrey;
    }

  }
}

`

const DescriptionWrapper = styled.div`

margin-bottom: 15px;
  .ql-toolbar {
    position: sticky;
    top: 0;
    background-color:lightblue; 
    z-index: 1;
    cursor:pointer !important;
   
  }
  .ql-container {
    border: 1px solid #ccc; /* Adjust as needed */
    border-top: none; /* Hide top border */
    border-radius: 0 0 5px 5px;
    background-color:white; 
    cursor:pointer  !important;
   
  
 

  }
`;

const Container = styled.div`
  margin-left: 30px;
  width:20vw;
height:100vh;
margin-left:70%;
margin-bottom:200px !important;

//min-height:50vh;

@media (max-width:768px) {
  width:30vw !important;
  height:100% !important ;
  padding-bottom:100px !important ;
  margin-left:10%  !important;

}
min-height:150vh;
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
  background-color: #ccc;

animation: slide-down 0.5s ease;

  padding: 20px;
  border-radius: 5px;
 // box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);

 width:160% !important;

 

  @media (max-width:768px) {
    padding: 20px;
  
  
   
  }
`;

const FormItem = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 97%;
  height: 30px;
  padding: 5px;
  border-radius: 3px;
  border: none;
  opacity: 0.5;
  cursor:pointer;
  @media (max-width: 768px) {
    width: 95.5%;
    height: 29px;
   
  }
`;

const Select = styled.select`
  width: 100%;
  height: 35px;
  padding: 5px;
  border-radius: 3px;
  border: none;
  opacity: 0.5;
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




