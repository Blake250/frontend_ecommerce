



import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createCategory } from '../../feature/categoryAndBrand';
import { getCategories } from '../../feature/categoryAndBrand';
import Loader from '../Loader';

const CreateCategories = () => {
  const [name, setName] = useState('');
  const { isLoading} = useSelector((state) => state?.category);
  const dispatch = useDispatch();



  // useEffect(()=>{
    // if(categories > 0){
      // dispatch(getCategories())
    // }

  // }, [dispatch, categories])






  

  const saveCategory = async (e) => {
   // console.log(`the name is ${name}`);
    e.preventDefault();

    if (name.length < 3) {
      return toast.error(' Name should be at least three characters');
    }

    const getData = {
      name: name,
    };

   await  dispatch(createCategory(getData));
   await dispatch(getCategories())
  

    setName('');
  };

  return (
    <Container>
      {isLoading && Loader}
      <Contain>
        <div>
        <br />
        <br />
          <span>Create Category</span>
          
           <TextForm>  <p
          style={{
          //  paddingRight:'150px',
           // textAlign:'center',
            '@media(max-width:768px)':{
              paddingRight:'0px !important',
            }
          }}
          >use the form to <b>Create A category</b> </p>  </TextForm> 

          <Form>

            <p >Category Name</p>
            <form onSubmit={saveCategory}>
              <Input
                type="text"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <button type="submit">Save Category</button>
            </form>
          </Form>
        </div>
      </Contain>
    </Container>
  );
};

export default CreateCategories;

const TextForm = styled.div`
padding-right:140px;
@media (max-width: 768px) {
  padding-right:0px;
      }
`

const Container = styled.div`
//display:flex;
 // justify-content:center;
 //margin-left:310px;
  align-items:center;
  width: 100%;

 height: 100%;
  position: relative;
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

`;

const Contain = styled.div`
  //padding-left: 50%;
  padding-left: 38%;
  width:100%;

  animation: slide-down 0.5s ease;
  @media (max-width: 768px) {
    padding-left: 10% !important;
      }

  div {
    span{
     text-align:center;
      margin-left:90px;
      animation: slide-down 0.5s ease;
      padding-left: 70px 

    }
    p{
      font-size:18px !important;
      text-align:center !important;
     padding-right:12px;
      padding-top:20px;
    }
  
    @media (max-width: 768px) {
      span {
        font-weight: 600;
        font-size: 18px !important;
        padding-left: 75px !important;
        padding-right:0 !important;
        margin-left:0px;
      }
      p {
        font-size: 13px !important;
       // padding-left: 25px !important;
        text-align:center;
      }
    }

    span {
      color: black;
      font-weight: 600;
      font-size: 23px;
      color: #996633;
    }
    p {
      line-height: 0;
      font-size: 18px;
    }
  }
`;

const Form = styled.div`
  background-color: #ccc;
  padding: 5px 7px;
 // margin-left: -10px;
 margin-right: 150px;
  padding-bottom: 35px;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  animation: slide- down 0.5s ease;

  @media (max-width: 768px) {
    //margin-left: 3px !important;
    padding-bottom: 25px !important;
    border-radius: 5px !important;
    padding: 5px 7px !important;
    margin-left: -10px !important;
    margin-right: 12px!important;
  }

  p {
    text-align: center !important;
    font-size: 28px;
    font-weight: 600;
    color: #e28743;
    opacity: 1 !important;
    line-height: 0;
  

    @media (max-width: 768px) {
      font-size: 23px !important;
    }
    &:last-child {
      font-weight: bold;
      text-align: center !important;
      font-size: 15px;
      color: black !important;
      opacity: 0.5 !important;

      @media (max-width: 768px) {
        font-size: 12px !important;
      }
    }
  }

  form {
    padding: 12px 12px;
  // padding: 25px 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      width: 412px;
      padding: 12px;
      background-color: #1e81b0;
      border: none;
      border-radius: 3px;
      color: white;
      font-weight: 400;
      animation: slide-down 0.5s ease;

      @media (max-width: 768px) {
        width: 253px !important;
      }

      &:hover {
        background-color: #76b5c5;
      }
    }
  }
`;

const Input = styled.input`
  animation: slide-down 0.5s ease;
  width: 400px;
  height: 25px;
  padding: 5px;
  margin-bottom: 3px;
  border-radius: 3px;
  border: none;
  opacity: 0.5;
  cursor: pointer;
  outline:none;

  @media (max-width: 768px) {
    width: 245px !important;
    height: 20px !important;
    padding: 5px !important;
    margin-bottom: 3px !important;
    border-radius: 3px !important;
    border: none;
    opacity: 0.5;
  }

  &:hover {
    background-color: lightblue !important;
  }
`;
