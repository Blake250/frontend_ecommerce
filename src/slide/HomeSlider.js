




import React from "react"
import styled from "styled-components"





const HomeSlider = (props) => {
    const {image, heading, desc} = props.item
  return (
    <Container className='project'>
        


        <img src={image} alt="" />
    
        <div className='desc' >
            <h1>{heading}</h1>
            <p>
              {desc}
              <h4> <a href="#product">Shop Now</a></h4>  
             
            </p> 
      
          

        </div>
    </Container>
  )
}

export default HomeSlider






const Container = styled.div`
height:10rem;
background-color:#4e5156;
margin:0 0.5rem;
padding:0.5rem 0.5rem;
//padding:0 0.5rem;
border-radius:5px;
cursor:pointer;
position: relative;
//z-index:5;
line-height:1;




img{
    width:100%;
    height:100%;
    object-fit:cover;

    transition:transform 400ms ease-in-out;
 

}



:hover>img{
    
        transform:scale(1.3);
      
}

.desc{


 
    position: absolute;
  //  top: 50%;
    top: -55%;
    left: 50%;
    
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
   //padding: 1rem;
    transition:all 400ms ease-in-out;
   padding:0.5rem 0.5rem;
   transition:all 400ms ease-in-out;
   //background:linear-gradient(rgba(185, 170, 170, 0.1),rgba(177, 183, 188, 0.8));

 

    h1 {
      margin-bottom: 0.5rem;
      text-align:center !important;
      padding-left:5px;
      white-space:nowrap;
      color:#009933;
    };
    p{
        width:120%;
        font-size:0.8rem;
        text-align:center;
        padding-top:5px;
        text-align:start;
        color:#cc3300;
        font-style:italic;
    }
        h4{
          background-color:darkblue;
          text-decoration:none;
          padding:7px;
         // width:80px;
          border-radius:5px;
          text-align:center;
       //  margin-left:30%;
       
       
       
         a{
          text-align:center !important;
          color:white;
          text-decoration:none !important;
  

    
          
         }

        }


      
    
    
 
  
}

:hover> .desc{
    top:55%;
}
`
