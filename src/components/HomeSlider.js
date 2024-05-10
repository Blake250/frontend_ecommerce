import React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"





const HomeSlider = (props) => {
    const {image, heading, desc} = props.item
    const navigate = useNavigate()
  return (
    <Container className='project'>
        


        <img src={image} alt="" />
    
        <div className='desc' >

            <h1>{heading}</h1>
            <p>
              {desc}
              <hr></hr>
              </p> 
            
             
              <h4 
              onClick={()=> navigate("/contact")} >
                 <a>
                  Shop Now
                 </a>
                 </h4>  
          
      
          

        </div>
    </Container>
  )
}

export default HomeSlider



const Wrapper = styled.div`

`


const Container = styled.div`
/*${Wrapper}::before{
  content: " ";
  position:absolute;
  width:2vw;
  border-radius:50%;

  background-color:#fff;
 // animation: name duration timing-function delay iteration-count direction fill-mode;
 animation:moveLine 8s linear infinite

}*/





position: relative;
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
margin-top:-2% ;
h1{
  font-size:16px;
};


::before{
  content: " ";
  position:absolute;
  width:10px;
  height:2px;
  border-radius:5px;
  background-color:#fff;

 // animation: name duration timing-function delay iteration-count direction fill-mode;
 animation:moveLine 6s linear infinite
};



@keyframes moveLine {
  0%, 100% {
    left: 0;
    top: 0;
  }
  25% {
    left: calc(100% - 1vw); 
  
    top: 0;
  }
  50% {
    left: calc(100% - 1vw); 
  top:100%;
  }
  75% {
    left: 0;
  
    top:100%;
  }
}

span{
  margin-bottom:-7px !important;
}
@media (max-width:768px) {
  height:150px ;
  margin-top:0px !important;

  h4{
   // margin-top:2px !important;
    padding:7px !important;
   
  };
  p{
    hr{
      
      margin-top:8px;
      padding-top:5px;
      background-color:darkgrey;

    }
  }
}
 
    position: absolute;
  //  top: 50%;
    top: -69%;
    left: 50%;

    
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
   //padding: 1rem;
    transition:all 400ms ease-in-out;
   padding:0.5rem 0.5rem;
   transition:all 400ms ease-in-out;
   background:linear-gradient(rgba(185, 170, 170, 0.1),rgba(177, 183, 188, 0.8));
  width:290px;
  height:120px;
 

    h1 {
      margin-bottom: 0.5rem;
      text-align:center !important;
      padding-left:5px;
      white-space:nowrap;
      color:#009933;
    };
    p{
        width:90%;
        font-size:0.8rem;
        text-align:center;
        padding-top:5px;
        text-align:start;
        color:white;
        font-style:italic;
    }
        h4{
          background-color:darkblue;
          text-decoration:none;
          padding:7px;
         // width:80px;
          border-radius:5px;
          text-align:center;
          width:75%;
         // padding-left:60px !important;
         margin-left:10%;
         margin-top:-12px;
      
       
       
       
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