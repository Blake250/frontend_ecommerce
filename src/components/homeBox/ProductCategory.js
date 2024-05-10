import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Category from './Category';

const ProductCategory = () => {

    const categories = [
        {
          id: 1,
          title: "Gadgets",
          image: "https://i.ibb.co/5GVkd3m/c1.jpg",
        },
        {
          id: 2,
          title: "Womens Fashion",
          image: "https://i.ibb.co/nQKLjrW/c2.jpg",
        },
        {
          id: 3,
          title: "Sport Sneakers",
          image: "https://i.ibb.co/fNkBYgr/c3.jpg",
        },
      ];


  return (
    <Container>
        <Contain>
     {
        categories.map((cat)=>{
            return (
                <div key={cat.id} >
                    <Category
                    title={cat.title}
                    image={cat.image}
                    
                    />

                </div>
            )
        })
     }
        </Contain>
        </Container>
  )
}

export default ProductCategory






const Container = styled.div`
  width: 100%;
  height: 60vh;
  background-color: #006666;
  
`;

const Contain = styled.div`
  display: flex;
  justify-content: space-around;
`;