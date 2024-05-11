


import React, {useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../../feature/product/productSlice';
import ProductFilter from '../../product/productFilter/ProductFilter';
//import ProductList from '../../product/productList/ProductList';
import Loader from '../../Loader';
import { FaCogs } from 'react-icons/fa';
import {Box} from '@mui/material'; // Import Box component from Material-UI
import ProductList from '../../product/ProductList/ProductList';
const Product = () => {
  const { isLoading, products } = useSelector((state) => state?.product);
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <Container>
      <Box mb={2}> 
        <HeaderContent>
          <ToggleIcon onClick={toggleFilter}>
            <div>
              <FaCogs size={22} color='orangered' />
              <span>{showFilter ? "Hide Filter" : "Show Filter"}</span>
            </div>
          </ToggleIcon>
          <ProductFilterContainer showFilter={showFilter}>
            {isLoading ? null : <ProductFilter />}
          
          </ProductFilterContainer>
        </HeaderContent>
      </Box>

      <Content>
        {isLoading ? <Loader /> : <ProductList products={products} />}
      </Content>
    </Container>
  );
};

export default Product;

// Styled components

const Container = styled.div`
  display: flex;
  position: relative;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
//  position: relative;
`;

const ProductFilterContainer = styled.aside`
  width: ${({ showFilter }) => showFilter ? '40%' : '0'};
 
  @media(max-width:768px)  {
    width: ${({ showFilter }) => showFilter ? '50%' : '0'};
  
  };
  max-width: 300px;
  height: max-content;
  padding: 20px;
  background-color: #fff;
  z-index: ${({ showFilter }) => showFilter ? '99' : '-1'};
 border: ${({ showFilter }) => showFilter ? '2px solid #ccc' : 'none'};
  transition: width 0.3s ease;
  border:2px solid #ccc;

  position: absolute;
  top: 0;
  right: -82px;
 // left:20px;
  bottom: 0;
`;

const Content = styled.div`
  flex: 1;
  padding-left: 10px;
`;

const ToggleIcon = styled.div`
  display: flex ;
  align-items: center !important;
  justify-content: center;
  cursor: pointer;
  padding: 10px;
  @media (max-width:768px) {
    span{
      font-size: 12px !important;
    display:flex;

    font-weight: bold;
    }
  }

  svg {
    margin-right: 5px;
  }

  span {
    font-size: 14px;
    font-weight: bold;

  }
`;

























/*import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../../feature/product/productSlice';
import ProductFilter from '../../product/productFilter/ProductFilter';
import ProductList from '../../product/ProductList/ProductList';
import Loader from '../../Loader';
import { FaCogs } from 'react-icons/fa';





const Product = () => {
  const { isLoading, products } = useSelector((state) => state?.product);
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <Container>
      <HeaderContent>
        <ToggleIcon onClick={toggleFilter}>
          <div> 
          <FaCogs size={22} color='orangered' />
          <span>{showFilter ? "Hide Filter" : "Show Filter"}</span>
          </div>
        </ToggleIcon>

        <ProductFilterContainer showFilter={showFilter}>
          {isLoading ? null : <ProductFilter />}
        </ProductFilterContainer>
      </HeaderContent>

      <Content>
        {isLoading ? <Loader /> : <ProductList products={products} />}
      </Content>
    </Container>
  );
};

export default Product;

// Styled components

const Container = styled.div`
  display: flex;
  position: relative;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
  position: relative;
`;

const ProductFilterContainer = styled.aside`
  width: ${({ showFilter }) => showFilter ? '30%' : '0'};
  max-width: 300px;
  height: max-content;
  padding: 20px;
  background-color: #fff;
  border: ${({ showFilter }) => showFilter ? '2px solid #ccc' : 'none'};
  transition: width 0.3s ease;
  z-index: ${({ showFilter }) => showFilter ? '99' : '-1'};
  position: absolute;
  top: 0;
  right: -60px;;
  bottom: 0;
`;

const Content = styled.div`
  flex: 1;
  padding-left: 10px;
`;

const ToggleIcon = styled.div`

  display: flex ;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px;
  

  svg {
    margin-right: 5px;
  
  }

  span {
    font-size: 14px;
    font-weight: bold;
  }

`;*/














/*import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../../feature/product/productSlice';
import ProductFilter from '../../product/productFilter/ProductFilter';
import ProductList from '../../product/ProductList/ProductList';
import Loader from '../../Loader';
import { FaCogs } from 'react-icons/fa';
const Product = () => {
  const { isLoading, products } = useSelector((state) => state?.product);
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
 
  };

  return (
    <Container>
      <ProductFilterContainer showFilter={showFilter}>
        {isLoading ? null : <ProductFilter />}
      </ProductFilterContainer>
      <Content>
        {isLoading ? <Loader /> : <ProductList products={products} />}
      </Content>
      <Icon onClick={toggleFilter}>
        <FaCogs size={22} color='orangered' />
        <span>{showFilter ? "Hide Filter" : "Show Filter"}</span>
      </Icon>
    
    </Container>
  
  );
};



export default Product








const Container = styled.div`
  display: flex;
position: relative !important;
// height:16vh;

`;

const ProductFilterContainer = styled.div`
  width: 20%;
  height: max-content;
  padding: 3rem 1rem 3rem 1rem;
  border: 1px solid #ccc;
  transition: all 0.3s;


 @media (max-width:768px){
// width:${({showFilter})=> showFilter ? "30px" : ""};
  background-color: #fff;
    border: 2px solid #ccc;
 }

  ${({ showFilter }) => showFilter && `
      width: 30%;
    background-color: #fff;
    border: 2px solid #ccc;
   
    z-index: 999  !important;
 
  `}

  & > * {
    width: 100%;
  }
`;


const Content = styled.div`
  width: 80%;
  padding-left: 5px;
  position: relative;
`;

const Icon = styled.div`
  display: none;
 // flex-direction:row;
  justify-content: center;
  align-items: center;
  margin-bottom:30px;
 //position: absolute;
 right: 0 !important;
  //left:-30rem;
 
 top: 0;
  cursor: pointer;
  svg{
  
  }
  span{
        font-size:12px;
        font-weight:700;
        white-space:nowrap;
        color:blue;
      
       
      }

  & > * {
    padding-left: 5px;
  }

  @media screen and (max-width: 700px) {
   

      display: flex ;
    align-items:center;
    flex-direction:column;
    margin-right:18px ;
  //margin-top
    
    
  
    
  }

`;*/


