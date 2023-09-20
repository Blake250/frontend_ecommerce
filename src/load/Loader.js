import React from 'react'
import styled from 'styled-components'
import ReactDOM from "react-dom"
//import  loadingImg from "../../assests/ecommerce/loader.gif"
import loadingImg from "../loading/loader.gif"


function Loader() {
  return ReactDOM.createPortal (
    <Container>
        <LoaderImg>
     <img src={loadingImg} alt="Loading..." />

        </LoaderImg>
    </Container>,
    document.getElementById("loader")
  )
}

export default Loader


const Container = styled.div`
background-color: rgba(0, 0, 0, 0.7);
z-index: 9;
position: fixed;
width:100%;
height:100vh;



`

const LoaderImg = styled.div`
position:fixed;
left:50%;
top:50%;
//transform:translate(-50%, -50%);
z-index:999;


`