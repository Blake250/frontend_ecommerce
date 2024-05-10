
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Category = ({ title, image }) => {
  const navigate = useNavigate();

  return (
    <Container>
 
      <ImgPhoto>
        <h3>{title}</h3>
        <img src={image} alt={title} />
        <Button onClick={() => navigate("/shop")}>
          <p>{"Shop Now >>"}</p>
        </Button>
      </ImgPhoto>
    </Container>
  );
};

export default Category;

const ImgPhoto = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h3 {
    font-size: 18px;
    color: #fff;
    margin-bottom: 10px;
  }

  img {
    width: 300px;
    height: 180px;
    border-radius: 10px;
   &:hover{
    box-shadow: 0px -10px 20px rgba(0, 0, 0, 0.5);
   }
  }
`;

const Container = styled.div`
  border: 1px solid lightblue;
  border-radius: 5px;
  background-color: #cc9900;
  margin: 10px;
`;

const Button = styled.div`
  cursor: pointer;
  p {
    font-size: 16px;
    color: #fff;
    text-decoration: none;
  }
`;




