import React from 'react'
import styled from 'styled-components'




const PageHeading = ({heading, btnText}) => {
  return (
    <Container>
         <Contain>
          <h2>{heading}</h2>
          <button>{btnText} </button>
          </Contain>
    
        </Container>
  )
}

export default PageHeading

const Container = styled.div`
width:100%;
height:100%;



`

const Contain = styled.div`
//position: relative;
display:flex;

align-items:center;
justify-content:space-around;
@media (max-width:768px) {
  white-space:nowrap;
button{
  width:90px !important;
  height:30px !important;
  padding:5px;
  font-size:13px;
  color:blue;
  &:hover{
    background-color:#bb8b2b;
  }
}
h2{
  font-size:15px !important;
 
  padding-right:40px !important;
}
}
h2{
  font-size:18px;
  color:blue !important;
  font-weight:200;
  //z-index:5;
  text-align:center;
  padding-right:50px;
  cursor:pointer;
}
button{
  width:110px;
  height:35px;
  text-align:center;
  border-radius:5px;
  margin-left:15px;
 transition:background-color 0.8s ease-in-out;
  border:none;
}

`