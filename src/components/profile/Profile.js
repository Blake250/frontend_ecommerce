




import PageMenu from '../page/PageMenu'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from 'react-toastify';
import Loader from '../Loader'
import { shortenText } from '../utils'
import { getUser, updatePhoto, updateUser } from '../../redux/slice/authSlice'
import { useLocation, useNavigate } from 'react-router-dom'


const Profile = () => {

    const cloud_name = process.env.REACT_APP_CLOUD_NAME
  
    const upload_preset = process.env.REACT_APP_UPLOAD_PRESET

    const url = "https://api.cloudinary.com/v1_1/blake250/image/upload"
  
      const {user, isLoggedIn, isLoading} = useSelector((state)=> state?.auth)
      
   
     const initialState = {
         photo : user?.photo || "",
          name : user?.name ||  "",
          email : user?.email || "",
          phone : user?.phone  || "",
          role : user?.role  || "",

         

         address : user?.address || "",
          state : user?.state  || "",
          country : user?.country  || "",
    


        }
   
      const [profile, setProfile] = useState(initialState)
      const [profileImage, setProfileImage] = useState(false)
 
      const [imagePreview, setImagePreview] = useState(localStorage.getItem("profile")?.photo || "");

      const [showUploadButton, setShowUploadButton] = useState(false)
     
      const dispatch = useDispatch()
   
    



   useEffect( () => {

        if (user === null) {
            dispatch(getUser());
        
        } else {
            setProfile({
                photo: user?.photo || '',
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                role: user.role || '',
                address: user.address || '',
                state: user.state || '',
                country: user.country || '',
            });
        }
    }, [dispatch, user]);
  
  

    
 
    /* useEffect(()=>{
          if(user){
            
              setProfile({
                photo : user?.photo || "",
                  name : user?.name ||  "",
                  email : user?.email || "",
                  phone : user?.phone  || "",
                  role : user?.role  || "",
                  address : user?.address || "",
                state : user?.state  || "",
                  country : user?.country  || "",
     
            
            
              })
         
            
          }
      },[user, dispatch])*/


     /*useEffect(()=>{
        if(user){
     const getData = localStorage.getItem("profile")
       set
        }

      },[user, dispatch])*/
      
  
      const saveProfile = (async (e)=>{
  
    e.preventDefault()
  const {photo, name, phone,  address ,state, country} = profile
   try{          
     const userData = {

    ...profile,

   photo,
      name,
      phone,
      address,
     state,
      country
   

     }
 

   const dataObj = await dispatch(updateUser(userData));
               //   await dispatch(getUser())
 localStorage.setItem("profile", JSON.stringify(dataObj));
 
   
    }catch(error){
      toast.error("Error updating profile")
    }

     })
  

  
      const handleImageChange = (e) => {
        const file = e.target?.files[0];
        if (file) {
            setProfileImage(file);
            setImagePreview(URL.createObjectURL(file));
            setShowUploadButton(true);
        }
    };
  
     
    const savePhoto = async (e) => {
      e.preventDefault();
      try {
        if (profileImage && (profileImage.type === "image/jpeg" || profileImage.type === "image/png" || profileImage.type === "image/jpg")) {
          const formData = new FormData();
          formData.append("file", profileImage);
         formData.append("cloud_name", cloud_name);
          formData.append("upload_preset", upload_preset);
      
          // Upload the image to Cloudinary
          const response = await fetch(url, { method: "POST", body: formData });
          const cloudinaryData = await response.json();
          
          // Update the user's photo
          const updatedUserData = { ...profile, photo: cloudinaryData.secure_url }; // Include the photo field in the userData object
          await dispatch(updatePhoto(updatedUserData)); 
          
          setImagePreview(cloudinaryData.secure_url);
          setShowUploadButton(false);
          setProfile({ ...profile, photo: cloudinaryData.secure_url });
          
          toast.success("Profile photo updated successfully");
        }
      } catch (error) {
        toast.error("Error updating profile photo");
        console.error("Error updating profile photo:", error);
      }
    };
    

  




 const handleInputChange = ((e)=>{
  e.preventDefault()
 const {name, value} = e.target
 setProfile({...profile, [name]:value})

 })






  
      
    return (
    
      <Container>
          { isLoading  && <Loader/>}
          <Contain>
            <PageMenu/>  
            <h2>Profile</h2>
            <ProfileImg>
              <Card>
                {
                  !isLoading  && (
            <div>
  
  
                         
            <Form>
            <ProfilePhoto>
                <div  >
              
                <img src={imagePreview ? imagePreview : profile?.photo} alt="profile" />
                </div>
               <TextRoll> 
                  <div>
                  <p>Role:{profile?.role}</p>
                  {showUploadButton && imagePreview  && <> <button onClick={savePhoto} > <AiOutlineCloudUpload size={18}/> Upload Photo</button>  </>}
                  </div>
                  </TextRoll>
              
              </ProfilePhoto>
             
            <p> <span>Change </span> Profile Image</p>
           <div>
            <form onSubmit={saveProfile} >
              
            <StyledInput
              
             type="file"
               placeholder='Photo'
               name='image'
             //  value={profile?.photo}
               accept='image/*'
               onChange={handleImageChange}
              
                />
                  <input 
               
                  type="text" 
              placeholder="Name" 
              name='name'
              value={profile?.name}
              onChange={handleInputChange}
              required
               />
  
              <input type="email" 
              placeholder="Email" 
              name='email'
              value={profile?.email}
              onChange={handleInputChange}
              disabled />
  
  
              <input type="text"
               placeholder='Phone Number'
               name='phone'
               value={profile?.phone}
               onChange={handleInputChange}
               required
                />
  
  
              <input  type="text"
             
              placeholder="address" 
              name="address"
           
            
             value={profile?.address}
             
              onChange={handleInputChange}  
              required/>
  
          <input  type="text"  
            placeholder="state" 
            name="state" 
            value={profile?.state}
           //value={profile?.address?.state}
           
             onChange={handleInputChange}
             required  />
  
             
          <input  type="text"
             
             placeholder="country" 
            name="country" 
         
           value={profile?.country}
              onChange={handleInputChange} 
              required />
          
              <button type='submit'>Update Profile</button>
           
            </form>
            </div>
          
           
          </Form>
                      </div>
                  )
                }  
  
              </Card>
  
            </ProfileImg>
    
          </Contain>
      </Container>
    )
         }
  
  export default Profile
  
  
  export const UserName = (()=>{
    const {user} = useSelector((state)=> state.auth)
  
  const userData = user?.name || "..."
  return(
    <span  style={{color: "#ff7722", fontSize:"13px"}} >Hi,  {shortenText(userData, 9)}  </span>
  )
  
  
  })
  
  const TextRoll= styled.div`
  div{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
   
  p{
    text-align:center  !important;
   // padding-left:-18px !important;
    font-weight:600;
   font-size:14px ;
    color:black;
  };
  button{
    cursor:pointer;
    border:none;
    padding:5px;
    border-radius:5px;
    transition:background-color 0.3s ease-in-out;
    &:hover{
      background-color:#4c6285;
      
    }
  }
  }
  `
  
  
  const ProfilePhoto = styled.div`
    width: 100%;
    background-color: #0033cc !important;
  
    border-radius:5px;
  
  padding-top:8px;
  padding-bottom:8px;
      display: flex;
      justify-content: center !important;
      align-items: center !important;
  
      flex-direction:column;
   //   font-weight:bold;
    font-size:14px;
    @media (max-width:768px) {
      div{
        p{
       // font-size:18px !important;
      }
      }
   
    }
  
  div{
  
    img{
      width: 200px;
        height: 200px;
        border: 2px solid #fff;
        border-radius: 50%;
       margin-left:-3px;
    }
    
  }
  
  
  `
  
  
  const StyledInput = styled.input`
  border:1px solid #9e9292 !important;
  opacity: 0.5 !important;
  
  cursor:pointer;
  `
  
  
  const Form = styled.div`
    background-color: #ccc;
    padding: 5px 7px;
  // margin-left: 200px;
  cursor:pointer;
  margin-bottom:100px;
  
  
    padding-bottom: 35px;
    border-radius: 5px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    position: relative;
  
   @media (max-width:768px) {
   padding:  8px 18px  !important ;
  
   padding-bottom: 35px !important ;
    border-radius: 5px !important ;
   // z-index: 20 !important;
  
  
  
    
   }
  
    div {
      a {
        font-size: 12px;
        font-weight: bold;
        text-decoration: none;
        color: black;
        opacity: 0.5;
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
        font-size: 15px !important;
       
        
      }
      &:last-child {
        font-weight: bold;
        text-align: center !important;
        font-size: 15px ;
        color: black !important;
        opacity: 0.5 !important;
        
        @media (max-width:768px) {
          font-size: 15px !important;
       
          
        }
      }
    }
  div{
  
   
    form {
  
     
    animation: slide-up 0.5s ease;
   
    //width:240px;
  
  
  
      input {
        width: 350px;
        height: 25px;
        padding: 5px;
        margin-bottom: 3px;
        border-radius: 3px;
        border: none;
        opacity: 0.5 ;
        cursor:pointer;
  
  
  
  
        @media (max-width:768px) {
       //  width: 200px !important ;
        height: 20px !important ;
        padding: 5px !important ;
     
        margin-bottom: 5px !important ;
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
        cursor:pointer;
  
        @media (max-width:768px) {
        //  width: 210px !important ;
            
          
        padding: 7px !important ;
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
  }
  `;
  
  const Container = styled.div`
  width:100%;
  height:60% ;

  position: relative;
  
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
  `
  
  const Contain = styled.div`
  //z-index:-999;

  h2{
   padding-left:20px;
   animation:slide-down 0.5s ease-in-out;
  
  }
  @media (max-width:768px){
    h2{
   padding-left:0 !important;
   text-align:center;
  
  }
  }
  
  `
  
  const Card = styled.div`
  
  
      max-width: 400px;
   
      padding: 1rem;
  
   @media (max-width:768px) {
  margin-left:30px;
   }
  
  
  `
  
  const ProfileImg = styled.div`

  
  
  
  `














