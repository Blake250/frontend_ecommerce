
import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert module
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import { getBrands, deleteBrand } from '../../feature/categoryAndBrand'
import Loader from '../Loader'
import { toast } from 'react-toastify'
import { shortenText } from '../utils'



const BrandList = () => {
  const {isLoading, brands, categories}  = useSelector((state) => state?.category)
   const [productCount, setProductCount] = useState(0)


  const dispatch = useDispatch()

useEffect(()=>{
  dispatch(getBrands())
  setProductCount(categories?.length)


},[dispatch])


useEffect(()=>{
  adjustContainerHeight()
},[productCount, categories])

const adjustContainerHeight = ()=>{
  const container = document.getElementById("container")

  if(container){
    const count = categories ? categories?.length : 0
    container.style.height = `${20 + count * 11}vh`
  }
}







const confirmDelete = (slug) => {
  confirmAlert({
    title: 'Delete Brand',
    message: 'Are you sure you want to do this Brand?',
    buttons: [
      {
        label: 'Delete',
        onClick: () => {
          delBrand(slug)
          console.log('User clicked Yes');
        }
      },
      {
        label: 'cancel',
       // onClick: () => {
          // Your action here
          //console.log('User clicked No');
     //   }
      }
    ]
  });

}



const delBrand = (async(slug)=>{
  await dispatch(deleteBrand(slug))

  await dispatch(getBrands())
  setProductCount(categories?.length)


  return toast.success("Brand was  successfully deleted")

})


  return (
    <>  
   {isLoading && <Loader/>}
    <Container  id='container'>
     
        <Contain>
      <h3>All Brands</h3>
        <div>
     { brands.length === 0 ? 
     (
      <p>No category Found</p>
     )
     : 
     (
      <Table  id="categoryContainer">
        <div>

         
        <TableRow>
              
              <hr /> 
              <div>  
            <span>s/n </span>
            <span>Name </span>
            <span>Categories</span>
            <span>Actions </span>
            </div>
            <hr /> 
           </TableRow>
           
          <br />
          <TableBody>
            {
              brands.map((cat, index)=>{
             //   const {_id,name,slug} = cat
                return(
                    <TableData key={cat?._id}>
                    
                      <hr/>
                      <div> 
                
                      <p>
                      {index + 1}
                      </p>
                  
                      <p>
                      {}
                      {shortenText(cat?.name ,8)}
                      </p>
                      <p>
                      {shortenText(cat?.category ,5)}
                    
                      </p>
                      <p>   
                      <FaTrashAlt 
                      color='red'
                      size={18}
                      style={{marginBottom:"-8px"}}
                      onClick={()=> confirmDelete(cat?.slug)}
                      
                      />
                     </p>
                      </div>

                    </TableData>

                )
           
              })
            }
          </TableBody>
        </div>


      </Table>

     )


     }     

        </div>
        </Contain>
    </Container>
    </>

  )
}

export default BrandList

const Table = styled.div`


@media (max-width:678px) {
  div{

  
}

}

`
const  TableData = styled.div`
width:80%;



//padding-left:25px;
line-height:0;
background-color:#ffffff;
border-radius:10px;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
padding: 0 12px;
cursor:pointer;
&:hover {
  background-color: blue !important;
      }
hr{
  
  width:100%;
  background-color: red !important; 
  animation: slide-down 0.5s ease;
  //margin-left:-20px;
  
}
div{
  display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
animation: slide-down 0.5s ease;

  p{
    color:black !important;;
    font-size:15px;
    animation: slide-down 0.5s ease;
  }
}
`



const TableBody = styled.div`


width:120%;
opacity:0.5;
@media (max-width:768px) {
   
   width:100% !important;
  }

`

// const TableRow = styled.div`
// display:flex;
// justify-content:space-between;
//   align-items:space-around;
//   @media  (max-width:768px) {
//     div{
//       padding:0 25px !important;
//       span{
//         padding:22px !important;
//       }
//     }
//   }

// div{

//   flex-direction:row;
//   padding:0 25px;
//   border-top: 2px solid var(--light-blue);
//         border-bottom: 2px solid var(--light-blue);
//   span{
//   padding:22px;
//   font-weight:600;

  
//   }
 
// }


//`

const TableRow = styled.div`
  hr {
      background-color: red !important; 
      height: 2px; 
      width:98%;
      border: none; 
      animation: slide-down 0.5s ease;
 
   
   //   margin-left:25px;
     
    }
div{
  display: flex;
  justify-content: space-between;
  align-items: center;
 padding: 0 10px;
 animation: slide-down 0.5s ease;


 @media (max-width:768px) {
  
  width:63% !important;
}


  span {
    padding:  12px;
    font-weight: 600;
    position: relative;
    line-height:0;
    animation: slide-down 0.5s ease;
    @media (max-width:768px) {
  padding-right: -50px;
 }

    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      border-bottom: 1px solid var(--light-blue); 
    }

    &:before {
      top: 0;
    }

    &:after {
      bottom: 0;
    }
  }
}
`;






const Container = styled.div`
width:100%;
//height:170vh;
padding-bottom:50px;


padding-left:140px;

@media (max-width: 768px) {
  padding-left:16px !important;
      }
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



div{
  text-align:center;
  margin-left:0px;
 @media (max-width:768px) {
  margin-left:2px;
 }


}
h3{
    text-align:center;
    font-size:21px;
    animation: slide-down 0.5s ease !important;
    @media (max-width:768px) {
      font-size:18px !important;
    }
   }




`














/*import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getCategories } from '../../feature/categoryAndBrand'
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert module
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { deleteCategories } from '../../feature/categoryAndBrand'
import { getBrands, deleteBrand } from '../../feature/categoryAndBrand'
import Loader from '../Loader'
import { toast } from 'react-toastify'
import { shortenText } from '../utils'
import { Stack } from '@mui/material'



const BrandList = () => {
  const {isLoading, brands, categories}  = useSelector((state) => state?.category)
   const [productCount, setProductCount] = useState(0)


  const dispatch = useDispatch()

useEffect(()=>{
  dispatch(getBrands())
  setProductCount(categories?.length)


},[dispatch])


useEffect(()=>{
  adjustContainerHeight()
},[productCount, categories])

const adjustContainerHeight = ()=>{
  const container = document.getElementById("container")

  if(container){
    const count = categories ? categories?.length : 0
    container.style.height = `${20 + count * 16}vh`
  }
}







const confirmDelete = (slug) => {
  confirmAlert({
    title: 'Delete Brand',
    message: 'Are you sure you want to do this Brand?',
    buttons: [
      {
        label: 'Delete',
        onClick: () => {
          delBrand(slug)
          console.log('User clicked Yes');
        }
      },
      {
        label: 'cancel',
       // onClick: () => {
          // Your action here
          //console.log('User clicked No');
     //   }
      }
    ]
  });

}



const delBrand = (async(slug)=>{
  await dispatch(deleteBrand(slug))

  await dispatch(getBrands())
  setProductCount(categories?.length)


  return toast.success("Brand was  successfully deleted")

})


  return (

    <Container id='container'    >
      {isLoading && <Loader/>}
        <Contain >
      <h3>All Brands</h3>
        <div>
     { brands.length === 0 ? 
     (
      <p>No Brand Found</p>
     )
     : 
     (
      <Table>
        <div>

         
        <TableRow>
              
              <hr /> 
            
              <Stack
               direction='row'
              //spacing={2}
              sx={{
               marginLeft:'12px'
              }}
            
              >  
           
            <span
            
          >s/n </span>
            <span>Name </span>
            <span>Category </span>
            <span>Actions </span>
            
            </Stack>
         
            <hr /> 
           </TableRow>
           
          <br />
          <TableBody>
            { brands && brands.length > 0 &&
              brands?.map((cat, index)=>
             //   const {_id,name,slug} = cat
                (
                    <TableData key={cat?._id}>
                    
                      <hr/>
                      <div> 
         
                      <p>
                      {index + 1}
                      </p>
                  
                      <p>
                        {shortenText(cat?.name ,5)}
                 
                      </p>
                      <p>
                      {shortenText(cat?.category ,5)}
                    
                      </p>
                      <p>   
                      <FaTrashAlt 
                      color='red'
                      size={18}
                      style={{marginBottom:"-8px"}}
                      onClick={()=> confirmDelete(cat?.slug)}
                      
                      />
                     </p>
                      </div>

                    </TableData>

                )
           
              )
            }
          </TableBody>
        </div>


      </Table>

     )


     }     

        </div>
        </Contain>
    </Container>

  )
}

export default BrandList

const Table = styled.div`


@media (max-width:678px) {
  div{

  
}

}

`
const  TableData = styled.div`
display:flex;
justify-content:center;
align-items:space-between;
justify-content:center;



display:flex;
flex-direction:column;
justify-content:center !important;;
align-items:space-around !important;
margin:5px 0;

@media (max-width:768px) {
  
    width:83% !important;
  }


width:110%;


line-height:1.5;
background-color:#ffffff;
border-radius:10px;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
padding: 0 12px;
cursor:pointer;
&:hover {
  background-color: blue !important;
      }
hr{
  
  width:100%;
  background-color: red !important; 
  margin: 10px 0; 
  animation: slide-down 0.5s ease !important;
  //margin-left:-20px;
  
}
div{
  display:flex  !important;
flex-direction:row;
justify-content:space-between;
align-items:center !important;
animation: slide-down 0.5s ease;


  p{
    color:black !important;;
    font-size:15px;
     text-align:start !important;
     animation: slide-down 0.5s ease;
  }
}
`









const TableBody = styled.div`


width:120%;
opacity:0.5;
@media (max-width:768px) {
  width:110%;
  
    
  }

`


const TableRow = styled.div`
display:flex;
justify-content:space-between;
flex-direction:column;

//padding-left:50px;
   @media (max-width:768px) {

//width:93% !important;
// margin-left:0px !important;
}

  hr {
      background-color: red !important; 
      height: 2px; 
      width:150%;
      border: none; 
      animation: slide-down 0.5s ease;
   @media (max-width:768px) {

    width:93% !important;
   // margin-left:0px !important;
  }
     
    }
div{
  display: flex;
  justify-content: space-between;
  align-items: center;
  
 

 padding: 0 25px;
 @media (max-width:768px) {
  padding: 0 15px;
 }


  span {
  //  margin-left:  15px;
    padding:  15px;
    font-weight: 600;
    position: relative;
   line-height:0;
   
 
    animation: slide-down 0.5s ease;
    @media (max-width:768px) {
  padding:  12px !important;
 }

    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      border-bottom: 1px solid var(--light-blue); 
    }

    &:before {
      top: 0;
    }

    &:after {
      bottom: 0;
    }
  }
}
`;






const Container = styled.div`
width:100%;



margin-left:40px;
//margin-bottom:50px;
position: relative;
margin-left:40px;
@media (max-width:768px) {
  margin-left:0px !important; 

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

`


const Contain = styled.div`
 @media (max-width:768px) {

      div{
    
  margin-left:2px !important;
       }
    }
div{
  //text-align:center;
  margin-left:15px;


}
h3{
    text-align:center;
    font-size:21px;
    animation: slide-down 0.5s ease;
    @media (max-width:768px) {
      font-size:18px !important;
    }
   }


`*/