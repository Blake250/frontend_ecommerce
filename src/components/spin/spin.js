import React from 'react'
import styled from 'styled-components'

import { useSelector } from 'react-redux'







const Contain = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
 // background: linear-gradient(rgba(185, 170, 170, 0.1), rgba(177, 183, 188, 0.8));
  z-index: 9;
  position: fixed;
  width: 100%;
  height: 100vh;
`;

const LoadImage = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
 // background: linear-gradient(rgba(185, 170, 170, 0.1), rgba(177, 183, 188, 0.8));
  z-index: 999;
`;

function Spin() {
  const {isLoading} = useSelector((state) => state.auth);

  return (
    <div>
      
        <Contain>
        {isLoading && (
          <LoadImage>
         <img src="./ecommerce/spinner.jpg" alt="" srcset="" />
          </LoadImage>
          )}
        </Contain>
      
    </div>
  );
}

export default Spin;
