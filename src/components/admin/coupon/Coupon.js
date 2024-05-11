import React from 'react';
import styled from 'styled-components';
import CreateCoupon from './CreateCoupon';
import CouponList from './CouponList';

const Coupon = () => {
  return (
    <Container>
      <Content>
        <CreateCoupon />
        <CouponList />
      </Content>
    </Container>
  );
};

export default Coupon;

const Container = styled.div`
  width: 100%;
 //display: flex;
flex-direction:column;
justify-content:center;

 padding:5%;


`;




const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
 
  width: 100%;
  
 
`;





/*const Coupon = () => {
  return (
    <Container>
        <Contain>
 <CreateCoupon/>
   
   <CouponList/>

        </Contain>
    
        </Container>
  )
}

export default Coupon

const Container = styled.div`
width:100%;
height:100%;

`

const Contain = styled.div`


`*/