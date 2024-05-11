import React from 'react'
import styled from 'styled-components'
import CreateBrand from './CreateBrand'
import BrandList from './BrandList'
import { getBrands } from '../../feature/categoryAndBrand'
import { useDispatch } from 'react-redux'
import ContainerDyna from '../admin/containerDynamic/containerDyna'


const Brand = () => {
  const dispatch = useDispatch()

  const reloadBrand = (async()=>{
   await dispatch(getBrands())
  })
  return (
    <Container>
      <Contain>
   
      <CreateBrand  reloadBrand={reloadBrand} />
   
      <BrandList/>
  
      </Contain>
      
      </Container>
  )
}

export default Brand

const Container = styled.div`
width:100%;
height:100%;



`




const Contain= styled.div`
//display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
`
