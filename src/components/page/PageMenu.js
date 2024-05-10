import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';





const PageMenu = () => {
    return (
        <Container>
            <Contain>
                <StyledNavLink  to="/profile"><span> Profile</span> </StyledNavLink>
                <StyledNavLink  to="/wallet"> <span> My Wallet</span></StyledNavLink>
                <StyledNavLink  to="/wishList"><span> WishList</span> </StyledNavLink>
            </Contain>
        </Container>
    );
}

export default PageMenu;

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #0033cc;
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
       
`



const Contain = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    padding: 20px 10px;
    font-weight:600 !important;
      
    animation: slide-up 0.5s ease;
    



`;

const StyledNavLink = styled(NavLink)`


span{
    animation: slide-down 0.5s ease !important;
}
@media (max-width:768px) {
    span{
        font-size:15px !important;

       
            
        
    }
}

    color: black;
    font-size: 18px;
    text-decoration: none;
    padding: 8px 12px;
    position: relative;

    &::after {
        content: '';
        display: block;
        width: 0;
        height: 2px;
        background-color: #ffffff;
        position: absolute;
        bottom: 4px;
        left: 50%;
        transform: translateX(-50%);
        transition: width 0.3s ease;
       
    }

    &.active::after {
        width: 60%;
    }

    &:hover::after {
        width: 60%;
        background-color:#cc9900;
      
       
    }

    @media (max-width:768px) {
        font-size: 15px;
    }
`;






