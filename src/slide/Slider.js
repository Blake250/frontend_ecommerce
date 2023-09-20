import React, {useState} from 'react'
import styled from 'styled-components'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { sliderData } from './slideData'
import SlideComponent from './SlideComponent'




const Slider = () => {
  return (
    <Container>
      <Contain>   
        <h1>Best <span className='green' >offers</span></h1>
        <p> the eshop websites offers  best rates when it come to clothing 
          for men, children, and women and also deals with all king of household items 
          needed to make your home beautiful, buy from us today and enjoy  cheapest prices on all items
         
           </p>
              
           <SlideItems>
            <SlideComponent/>
           </SlideItems>
     
      </Contain>
      </Container>
  )
}

export default Slider



const Container = styled.div`
width:100%;
//width:80%;
max-width:1280px;
margin:0 auto;
@media (max-width:848px) {
  width:90%;
  
}

`

const SlideItems = styled.div`
  

`



const Contain = styled.div`
//padding:3rem 0;
text-align:center;
h1{
  font-size:1.9rem;
  line-height:0.5;
}
p{
  width:28rem;
 margin:0 auto;
 padding:1rem 0;
 //padding:0.8rem 0;
 font-size:0.9rem;
 font-weight:600;
 @media (max-width: 500px) {
  width:90% !important;
  
 }
}


`


















