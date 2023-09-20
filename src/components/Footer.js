import React from 'react'
import styled, { StyledComponent } from 'styled-components'

const currentDate = new Date()
const year = currentDate.getFullYear()
console.log(year)
const Footer = () => {
  return (
    <Container>
      <BottomPage>
      <div>&copy; {year} All Right Reserve</div>
      </BottomPage>
    </Container>
  )
}

export default Footer

const Container = styled.div`
background-color:#a46852;
height:80px;

display:flex;
align-items:center;
justify-content:center;

`

const BottomPage = styled.div`

div{
  text-align:center;
  font-size:bold;
  font-weight:600;
  margin-left:50px;



  @media (max-width: 768px) {
    text-align:center !important;
  font-size:bold;
  font-weight:600;
    
  }
 

}



`