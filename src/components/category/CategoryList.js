import React from 'react'
import styled from 'styled-components'
import CreateCategories from './CreateCategories'
import CreateCategoryList from './CreateCategoryList'

const CategoryList = () => {
  return (
    <Container>
        <Contain>  
          <div>
          <CreateCategoryList/>
     <CreateCategories/>

          </div>
     
        </Contain>
        </Container>
  )
}

export default CategoryList


const Container = styled.div`


`

const Contain = styled.div`


`