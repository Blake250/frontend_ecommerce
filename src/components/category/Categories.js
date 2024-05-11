import React from 'react'
import CreateCategories from './CreateCategories'
import CreateCategoryList from './CreateCategoryList'
import { useDispatch } from 'react-redux'
import { deleteCategories, getCategories } from '../../feature/categoryAndBrand'
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert module
import 'react-confirm-alert/src/react-confirm-alert.css'; // I
import styled from 'styled-components'




const Categories = () => {
 
  const dispatch = useDispatch()

  const reloadCategories = (()=>{
    dispatch(getCategories())
  })

  

  return (
    <Container>
     <Contain>

     <CreateCategories reloadCategories={reloadCategories}  />
      <CreateCategoryList/>
     </Contain>
        
    </Container>
  )
}

export default Categories


const Container = styled.div`
width:110%;
@media (max-width: 768px) {
  width:100%;
        
      }


`


const Contain = styled.div`

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;


`