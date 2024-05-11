

import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader';
import { toast } from 'react-toastify';
import { createCoupon } from '../../../feature/coupon/couponSlice';

const CreateCoupon = () => {
  const [name, setName] = useState('');
  const [discount, setDiscount] = useState(0);
  const [expiresAt, setExpiresAt] = useState(new Date());
  const { isLoading } = useSelector((state) => state?.coupon);
  const dispatch = useDispatch();

  const handleSaveCoupon = async(e) => {
    e.preventDefault();
    console.log(`${name} ${discount} ${expiresAt} `)
    if(name.length < 1 || name.length ===1){
      return toast.error("Please Provide a Valid coupon Code")

    }

    if(discount < 1){
      return toast.error("Invalid Discount Value")

    }


    const formData = {
      name,
      discount,
      expiresAt
    }
    await dispatch(createCoupon(formData))
    setName("")
    setDiscount(0)
  };

  return (
    <Container>
      {isLoading && <Loader />}
      <h3>Create A Coupon</h3>
      <span>Use the form to <b>Create A Coupon</b></span>
      <Form onSubmit={handleSaveCoupon}>
        <FormItem>
          <Label htmlFor="couponName">Coupon Name:</Label>
          <Input
            type="text"
            id="couponName"
            name="name"
            placeholder="Coupon Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormItem>
        <FormItem>
          <Label htmlFor="Discount">Discount %:</Label>
          <Input
            type="number"
            id="Discount"
            name="name"
            placeholder="Discount %"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
        </FormItem>
        <FormItem>
          <Label htmlFor="expiresAt">Expires At:</Label>
          <StyledDatePicker
            selected={expiresAt}
            onChange={(date) => setExpiresAt(date)}
            required
          />
        </FormItem>
        <Button type="submit">Save Coupon</Button>
      </Form>
    </Container>
  );
};

export default CreateCoupon;

const StyledDatePicker = styled(DatePicker)`
  width: 25rem !important;
  height: 35px;
  padding: 5px;
  border-radius: 3px;
  border: none;
  opacity: 0.5;
  cursor: pointer;
  &:hover{
    background-color:lightblue;
  }
  @media (max-width:768px) {
    //padding: 14px;
     
    width:15rem !important;
  }
`;

const FormItem = styled.div`
  margin-bottom: 15px;
`;



const Container = styled.div`
@keyframes slide-up {
   0% {
     transform: translateY(-5rem);
   }
   100% {
     transform: translateY(0);
   }
 }
 @keyframes slide-down {
   0% {
     transform: translateY(5rem);
   }
   100% {
     transform: translateY(0);
   }
 }
  width: 70vw;

  margin-top: 20px;
  position: relative;

 h3 {
    text-align: center;
 margin-left: -30rem;
  }

  span {
    font-size: 15px;
    text-align: center;
    padding-left: 107px;
    color: #993333;
  
  }
  @media (max-width: 768px) {
    width: 88%;
 

  span {
    font-size: 13px;
    text-align: center;
    padding-left: 40px !important;
   
  
  }
   
  h3 {
    text-align: center !important;
   margin-left: 0px !important;
  }
}
`;





const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #ccc;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  width: 46%;
  animation: slide-down 0.5s ease;

 

  @media (max-width:768px) {
 

    width:100% !important;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 25rem;
  height: 35px;
  padding: 5px;
  border-radius: 3px;
  border: none;
  opacity: 0.5;
  cursor: pointer;
  &:hover{
    background-color:lightblue;
  }
  @media (max-width:768px) {
  
     
    width:15rem !important;
  }
`;

const Button = styled.button`
  width: 25.8rem;;
  padding: 13px;
  background-color: #1e81b0;
  border: none;
  border-radius: 3px;
  color: white;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background-color: #76b5c5;
  }
  @media (max-width:768px) {
    //padding: 14px;
     
    width:15.7rem !important;
  }
`;









