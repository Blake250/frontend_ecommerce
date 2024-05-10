import React from 'react'
import styled from 'styled-components'
import Slider from "./Slider"
import HomeInfo from './homeBox/HomeInfo'

const Home = () => {
  return (
    <Container>
      <Contain> 
        <Slider/>
      
      </Contain>
      </Container>
  )
}

export default Home



const Container = styled.div`
background-color:linear-gradient(159deg, rgb(45, 45, 58)0%, rgb(43,43,53)100%)

`

const Contain = styled.div`

`