

import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import HomeSlider from './HomeSlider';
import { sliderData } from './slideData';

const SlideComponent = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderRef = useRef(null); 
  const containRef = useRef(null)



  
    const changeImage = (currentSlide, nextSlide) => {
      setCurrentImageIndex(nextSlide);
    };
  


    useEffect(() => {
    
      const interval = setInterval(() => {

    
      
      
     const nextSlide = (currentImageIndex + 1) % sliderData.length;
     
    // const nextSlide = setCurrentImageIndex((currentImageIndex)=> (currentImageIndex + 1)% sliderData.length )
      // sliderRef.current?.slickGoto(nextSlide)
       if(sliderRef.current){

          sliderRef.current?.slickGoTo(nextSlide ); 
        }

        if(containRef.current){  
           containRef.current?.slickGoTo(nextSlide ); 

        }
     
     
      }, 5000);
     
     
      return () => clearInterval(interval);
   
    
   }, [ currentImageIndex  ] );









  var settings = {
    className: 'center',
    centerMode: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
    
   beforeChange:  (currentSlide, nextSlide) => changeImage(currentSlide, nextSlide), // Use beforeChange
    responsive: [
            

      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
          dots: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
          centerMode: false,
          arrows:true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        }
      }



    ],
  };
   let sliderItem =  " "
 sliderItem = sliderData.map((item, i) => <HomeSlider item={item} key={i} />);

  return (
    <Container>
       <BackgroundImage image={sliderData[currentImageIndex].image}/>
     
   
      <Carousel userRef ={containRef} ref={sliderRef} {...settings}>
        {sliderItem}
      </Carousel>
    </Container>
  );
};

export default SlideComponent;

const Container = styled.div``;

const Carousel = styled(Slider)`
button{
  z-index:5;
}


`;


const BackgroundImage = styled.div`
 position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  opacity: 1;
  z-index: -1;
`;











