import React from 'react'
import styled from 'styled-components'
import ReactDOM from "react-dom"
import { useSelector } from 'react-redux'
import LoadingImg from "./loading/loader.gif"






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

/*function Loader() {
  const {isLoading} = useSelector((state) => state.auth);

  return (
    <div>
      
        <Contain>
        {isLoading && (
          <LoadImage>
            <img src={LoadingImg} alt="Loading..." />
          </LoadImage>
          )}
        </Contain>

      
    </div>
  );
}

export default Loader;*/


function Loader() {
  const {isLoading} = useSelector((state) => state.auth);

  return (
    <div>
      
        <Contain>
      
          <LoadImage>
            <img src={LoadingImg} alt="Loading..." />
          </LoadImage>
        
        </Contain>

      
    </div>
  );
}

export default Loader;






/*const Contain = styled.div`
  background-color: rgba(0, 0, 0, 0.7)!important;
 
  z-index: 9;
  position: fixed;
  width: 100% !important;
  height: 100vh !important;
`;

const LoadImage = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
 background: linear-gradient(rgba(185, 170, 170, 0.1), rgba(177, 183, 188, 0.8));

  z-index: 999;
`;

const Loader = () => {
  return ReactDOM.createPortal(
    <Contain >
      <LoadImage> 
   
        <img src={LoadingImg} alt="Loading..." />
      
      </LoadImage>
    </Contain>,
    document.getElementById("loader")
  );
};

export const SpinnerImg = () => {
  return (
    <Contain >
      <img src={LoadingImg} alt="Loading..." />
    </Contain>
  );
};

export default Loader;*/