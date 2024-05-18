import React from 'react'
import styled from 'styled-components'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { responsive } from './ResData';






const CarouselItem = ({products}) => {

  return (
    <Container>
        <Contain>   
            <Carousel
          
              showDots={true}
             responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={1000}
              customTransition="all 500ms ease"
              transitionDuration={1000}
            
            
            >

        {products}

        </Carousel>
        </Contain>  
        </Container>
  )
}

export default CarouselItem


const Container = styled.div`

`

const Contain = styled.div`







`