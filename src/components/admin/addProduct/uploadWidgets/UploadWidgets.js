


import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AiOutlineCloudServer } from "react-icons/ai";
import {BsTrash} from "react-icons/bs"
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

//import { updatePhoto } from '../../../../redux/slice/authSlice';


const UploadWidgets = ({files, setFiles}) => {
const [selectedImages, setSelectedImages] = useState([])
const [images, setImages] = useState([])
const [progress, setProgress] = useState(0)
const [uploading, setUploading] = useState(false)
const {user, isLoggedIn} = useSelector((state)=> state?.auth)

const upload_preset = process.env.REACT_APP_UPLOAD_PRESET
//const urlMain = "https://api.cloudinary.com/v1_1/blake250/image/upload" 

 const url ='https://api.cloudinary.com/v1_1/blake250/image/upload'



const dispatch = useDispatch()




    const addImages = ((e)=>{
        const selectedFiles = e.target?.files
        const selectedFilesArray = Array?.from(selectedFiles)

        const imagesArray = selectedFilesArray?.map((file)=>{
            return(
                URL.createObjectURL(file)
            )
        })
        // this will be uploaded to cloudinary 
        setImages((prevImages)=> prevImages?.concat(selectedFilesArray))
       // setImages()

          // this will be uploaded to the browser
        setSelectedImages((prevImages)=> prevImages?.concat(imagesArray))

        e.target.value = ""
        

    })

   

    const removeImage = (image) => {
      // Remove the image from selectedImages
      const filteredSelectedImages = selectedImages && selectedImages?.filter((img) => img !== image);
      setSelectedImages(filteredSelectedImages);
    
      // Remove the image from images
     const imageIndex = selectedImages.indexOf(image);
      const filteredImages = images && images?.filter((img, index) => index !== imageIndex);
      setImages(filteredImages);
    
      // Revoke the URL
      URL.revokeObjectURL(image);



 

    };
    


 

    /*const removeImage = ((image)=>{
      const imageIndex = selectedImages.indexOf(image)
    
        setSelectedImages(
          selectedImages.filter((img)=> img !== image)
        )

        setImages(
          images.filter((img, index)=> index !== imageIndex)
        )
       
        URL.revokeObjectURL(image)
    })*/

    const uploadImages = ()=>{
     
    setUploading(true)
    let imageURLS = []
    for(let i=0; i<images.length; i++){
      let fileData= images[i]
      const formData = new FormData()
      formData.append("file", fileData )
      formData.append("upload_preset", upload_preset);
      formData.append("folder", "eShop-App")

      
    fetch(url, {
      method:"POST",
     body:formData
    }).then((response)=>{
        return response.json()
    }).then((data)=>{
     
     imageURLS?.push(data.secure_url)
     console.log(`imageURL: ${imageURLS?.length}`)
     setProgress(imageURLS?.length)

 
    
     if(imageURLS?.length === images?.length){
  

      //setFiles((prevImages) => prevImages?.concat(imageURLS));
      setFiles( imageURLS); 
      setUploading(false);
      console.log(formData);
     // localStorage.setItem('uploadedImages', JSON.stringify(imageURLS)); // Store image URLs in localStorage
    
    
     toast.success("images uploaded successfully")
     localStorage.setItem("uploadedImages", JSON.stringify(imageURLS));
      
    

     console.log("Updated images array:", images);

     
           setImages([]);
           setSelectedImages([]);
           setProgress(0);
       
         
      }
     
  }).catch((err)=>{
    setUploading(false)
    toast.error(err?.message)
    console.log(err?.message)
  })
}

}

  

  return (
    <Container>
        <Contain>
            <div>
 <AiOutlineCloudServer  size={35}/>
           <br />
  <span>Click to upload upto five images</span>
  <input type="file"
          name='images'
          onChange={addImages}
          multiple
          accept='image/png, image/jpeg, image/jpg'
  
  />           
  </div  >
    <SelectedImages className={selectedImages?.length > 0 ?  "images" : ""}  > 
       {     selectedImages  && 
            selectedImages?.map((photo, index)=>{
                return(
                         <Images  key={photo} className='images' >
                  
                      <img src={photo} alt="productImage"  style={{width:"200px"}}/> 
                         <button  
                          onClick={()=> removeImage(photo)}
                       
                         ><BsTrash  size={20} />
                          </button> 
                        <p>{index + 1} </p>     
                        
                         
                           
                         </Images>
                )
            })
        }


    </SelectedImages>
    <br />
    <OptionDisplay>
    {
     
      selectedImages.length > 0 && selectedImages.length > 5 ? 
      (<p>
       You can't upload more that 5 images!
       <br />
       <span>Please remove <b> {selectedImages?.length - 5} </b> of them  </span>
      </p>
        
        ): (
          <Button>
     <button
      onClick={()=> uploadImages()}
    //  uploading={false}
     uploading={uploading ? true : false} 
      >
        {uploading ? `Uploading ${progress} of ${images?.length} ` : `upload ${images?.length} image(s)`  }
         </button>
          </Button>
        )
      
    }
    </OptionDisplay>
        </Contain>
      
        
        </Container>
  )
}

export default UploadWidgets



















const OptionDisplay = styled.div`
p{
  font-size:14px;
  color:darkseagreen;
  font-weight:600;
}
`

const Button = styled.div`
background-color:#996633;
button{
  background-color:white;
  border:none;
  border-radius:3px;
  padding:5px;
  &:hover{
    color:blue;
  }
}

`
const SelectedImages = styled.div`
width:100%;
height:100%;

display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;





&.images{
    background-color:black;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

 
  

}
`

const Images = styled.div`
  display:flex ;
flex-direction:column;
justify-content:center;
align-items:center;


div{

    display:flex !important;
flex-direction:column;
justify-content:center;
align-items:center;

}

p{
    color:#1f4a30;;
    padding-left:48px;
    font-style:italic;

  
    

}
button{
    background-color:#ffffff;
   
    border:none;

    &:hover{
    background-color:blue;
    outline:none;

   }
    margin-bottom:-47px;
    svg{
   width:50px;
   color:red;
  

  
   transition: background-color 0.5s ease 0.5s;


    }
  }

img{
       
        height:120px;
        padding:10px 35px;
        @media (max-width:768px){
            width:100px !important;
            height:80px !important;
        padding:10px 35px;
        }
    }


`

const Container = styled.div`
  border: 1px solid transparent;
  border-radius: 5px;
 // box-shadow: var(--box-shadow);
  overflow: hidden;
  border : 2px solid black;
 // opacity:0.5;
  width:34.5vw;
  margin-left:3px;
 
  padding:20px 0px;
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

  @media  (max-width:768px) {
    width:55vw !important;
    margin-left:0px;
   
   
  }
`
const Contain = styled.div`
 animation: slide-down 0.5s ease;
  @media  (max-width:768px) {
   
  div{
    margin-left:0px 3px !important;
    width:75% !important;
   
    span{
        font-size:12px;
    }
  }
   
   
  }
div{
  display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    border:2px dashed #ccc;
    padding:10px;
    width:85%;
    margin:0 20px;
    span{
        text-align:center;
    }
    input{
        opacity:0;
    }
    
}

`