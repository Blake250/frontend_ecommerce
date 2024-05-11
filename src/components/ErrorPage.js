
import React from 'react';
import styled from 'styled-components';

import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #f8f9fa; 
`;

const Content = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #ffffff; 
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); 
`;

const Title = styled.h2`
  color: #dc3545; 
  margin-bottom: 20px;
`;

const Message = styled.p`
  color: #6c757d; 
  margin-bottom: 30px;
  font-weight:600;
`;

const BackButton = styled(Link)`
  background-color: #007bff; 
  color: #ffffff; 
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorPage = () => {
 
    return (
      <Container>
        <Content>
          <Title>Page Not Found</Title>
          <Message>Looks Like The Page You Are Looking For Could Not Be Found</Message>
          <BackButton  to={"/home"} >Back to Home</BackButton>
        </Content>
      </Container>
    );
  }




export default ErrorPage














/*import { Navigate} from "react-router-dom";
import React from 'react'


const ErrorPage = () => {
  return (
     <div>  
    <Navigate to={"/"} />
    </div>
  )
   
    
  
}

export default ErrorPage */