import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getCategories } from '../../feature/categoryAndBrand'
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert module
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { deleteCategories } from '../../feature/categoryAndBrand'
import Loader from '../Loader'
import { toast } from 'react-toastify'


const CreateCategoryList = () => {
  const {isLoading, category}  = useSelector((state) => state?.category)



  const dispatch = useDispatch()

useEffect(()=>{
  dispatch(getCategories())

},[dispatch])






const confirmDelete = (slug) => {
  confirmAlert({
    title: 'Delete Category',
    message: 'Are you sure you want to do this category?',
    buttons: [
      {
        label: 'Delete',
        onClick: () => {
          deleteCat(slug)
          console.log('User clicked Yes');
        }
      },
      {
        label: 'cancel',
       /* onClick: () => {
          // Your action here
          console.log('User clicked No');
        }*/
      }
    ]
  });

}



const deleteCat = (async(slug)=>{
 await dispatch(deleteCategories(slug))
  await dispatch(getCategories())
  return toast.success("category successfully deleted")

})


  return (

    <Container>
      {isLoading && <Loader/>}
        <Contain>
      <h3>All Categories</h3>
        <div>
     { category.length === 0 ? 
     (
      <p>No category Found</p>
     )
     : 
     (
      <Table>
        <div>

         
        <TableRow>
              
              <hr /> 
              <div>  
            <span>s/n </span>
            <span>Name </span>
            <span>Action </span>
            </div>
            <hr /> 
           </TableRow>
           
          <br />
          <TableBody>
            {
              category.map((cat, index)=>{
             //   const {_id,name,slug} = cat
                return(
                    <TableData key={cat?._id}>
                    
                      <hr/>
                      <div> 
                
                      <p>
                      {index + 1}
                      </p>
                  
                      <p>
                      {cat?.name}
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

  )
}

export default CreateCategoryList

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
  }
}
`



const TableBody = styled.div`


width:120%;
opacity:0.5;

`

/*const TableRow = styled.div`
display:flex;
justify-content:space-between;
  align-items:space-around;
  @media  (max-width:768px) {
    div{
      padding:0 25px !important;
      span{
        padding:22px !important;
      }
    }
  }

div{

  flex-direction:row;
  padding:0 25px;
  border-top: 2px solid var(--light-blue);
        border-bottom: 2px solid var(--light-blue);
  span{
  padding:22px;
  font-weight:600;

  
  }
 
}


`*/

const TableRow = styled.div`
  hr {
      background-color: red !important; /* Change the color as desired */
      height: 2px; 
      width:93%;
      border: none; 
   //   margin-left:25px;
     
    }
div{
  display: flex;
  justify-content: space-between;
  align-items: center;
 padding: 0 15px;
 


  span {
    padding:  12px;
    font-weight: 600;
    position: relative;
    line-height:0;

    /* Add border lines above and below each span */
    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      border-bottom: 1px solid var(--light-blue); /* Adjust the color and thickness as needed */
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
height:160vh;
min-height:210vh;
margin-bottom:30px;
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
  //text-align:center;
  margin-left:2px;


}
h3{
    text-align:center;
    font-size:21px;
    @media (max-width:768px) {
      font-size:18px !important;
    }
   }




`