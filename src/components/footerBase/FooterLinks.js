import React from 'react';
import styled from 'styled-components';


const FooterLinks = () => {
  return (
    <Container>
  

      <Contain>
        <LinksContainer>
          <Partners>
          
            <div>
            <span>Partners</span>
              <a href="#home">About</a>
              <a href="#home">Our Team</a>
              <a href="#home">Career</a>
              <a href="#home">contacts</a>
            </div>
          </Partners>

          <Features>
          
            <div>
            <span>Features</span>
              <a href="#home">Link Shortening</a>
              <a href="#home">Branded Links</a>
              <a href="#home">Analytics</a>
              <a href="#home">Blog</a>
            </div>
          </Features>

          <Resources>
            
            <div>
            <span>Resources</span>
              <a href="#home">Blog</a>
              <a href="#home">Developer</a>
              <a href="#home">Supporter</a>
              <a href="#home">Docs</a>
            </div>
          </Resources>

          <Company>
            
            <div>
            <span>Company</span>
              <a href="#home">About</a>
              <a href="#home">Our Team</a>
              <a href="#home">Career</a>
              <a href="#home">Contacts</a>
            </div>
          </Company>
        </LinksContainer>
      </Contain>
    </Container>
  );
};

export default FooterLinks;

const Container = styled.div`

 



`;

const Contain = styled.div`
  overflow-x: hidden;;
  background-image: url("./images/features/b14.png");
 background-color:black;
background-repeat:no-repeat;
background-size:cover;
background-position:center;
height:40vh;
width: 100%;

`;

const LinksContainer = styled.div`

  display: flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-around;
  div{
    padding-top:15px;
 
    span{
        color:white;
        text-align:start;
        position: relative;
  //padding-bottom: 5px;



    }
    a{
        display:flex;
        align-items:center;
        padding:10px 0;
        text-decoration:none;
        color:#33cccc;
        font-size:15px;
        @media (max-width: 760px) {
            font-size:13px !important;
            
        }


    }
  }
`;

const Features = styled.div`
  margin-left: 0px; 
 span {
    position: relative;
    padding-bottom: 5px;
  }
    span::after {
    content: '';
    position: absolute;
    bottom: 0;
    left:0;
    width: 100%;
    height: 1px;
    background-color: white;
  }

       
`;

const Partners = styled(Features)`
  margin-left: 0px; 
  `

const Resources = styled(Features)`
  margin-left: 0px; 
`;

const Company = styled(Features)`
  margin-left: 0px;
`;







