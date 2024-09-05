
import React, {useState,useEffect} from 'react'
import styled from "styled-components"
import { Link,NavLink } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
//import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import  {MdOutlineMenuOpen} from "react-icons/md"
import  {AiOutlineClose} from "react-icons/ai"

import { shortenText } from './utils';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import  {FaUserCircle} from "react-icons/fa"
import { logOut, RESET_AUTH } from '../redux/slice/authSlice';

import { useDispatch, useSelector } from 'react-redux';
import Loader from "./Loader"
import ShowOnLogin, {ShowOnLogOut} from './hiddenLinks/hideLink';
import { AdminOnlyLink } from './hiddenLinks/AdminOnlyRoute';
import { CALCULATE_TOTAL_QUANTITY } from '../feature/cart/cartSlice';








const HeaderContainer = styled.div`
  background-color: #a46852;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding:0;
  margin:0;

 
  //z-index: 1000 !important;

`;




const HeaderContent = styled.div`
 //z-index: 10001 !important;
  display: flex;
  justify-content: space-between;
  align-items: center !important;
 width:100%;
 height:80px !important;
 // padding: 25px 0px;
  //padding-bottom:16px;
  position:relative;
  //z-index: 4 !important;


  &.no-scroll{
    width: 100%;
  position: fixed;
  top: 0;
  transition: all 0.5s;
 // z-index: 9;
  };

  &.fixed {
    width: 100%;
    height: ${({ scrollPage }) => (scrollPage ? '250px' : 'auto')};
    overflow: hidden;
    transition: all 0.1s
  };
  `



const LogoLink = styled(Link)`
  color: white;
  font-size: 22px !important;
  font-weight: 600;
  text-decoration: none;
  animation: slide-up 0.5s ease;
  
  padding-left:12px;
  span{

 
  text-align:center;
    color: red;
    font-size: 20px;
 
}
`

const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;

 div{
  display:flex;
  color:white;
  align-items:center;
  justify-content:center;
  margin-left:12px;
  &>span{
  
   &:last-child{
    font-size:13px;
    font-weight:600;
    padding-left:3px;
  cursor:pointer;

   }
  };
 };

 @media (max-width: 760px) {
  display:none;
  
 };
`;

const NavLinkStyled = styled(NavLink)`
  color: white;
  text-decoration: none;
  padding: 3px;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  margin: 0 4px;
 // transition: color 0.5s linear;
  transition: all 0.2s ease-in-out;
  svg{
    white-space:wrap !important;
  }
  @media (max-width:768px) {

     font-size: 14px !important;
     font-weight: 600 !important;
  }


  &:hover {
    color: #009900;
    transform:translateY(-0.5rem)
  };

  &.active
   span:after {
    transform: scaleX(1);
    opacity: 1;
  }

  span:after {
    content: '';
    height: 2px;
    background-color: white;
    position: absolute;
    left: 0px;
    right: 0;
    bottom: -1px;
    transform: scaleX(0);
    transform-origin: left right;
    opacity: 0;
    transition: transform 0.2s ease-in-out;
    width:100%;
  };

`;

const MenuToggleButton = styled.span`
  display: none;
  color: white;
  font-size: 25px;
  margin-left: 3px;
  cursor: pointer;
  position: relative;
  z-index:9;
  svg{
  //  padding-top:9px;
   //padding-right:15px;
   margin:0px 30px -6px 10px
  }

  @media (max-width: 768px) {
    display: block;
  };
`

const MenuExternalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center !important;
  justify-content:flex-start;
  background-color: black;
  border-radius:10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ showMenu }) => (showMenu ? '100vh' : '0')};
  transition: height 0.3s ease-in-out;
  overflow: hidden;
  @media (min-width:760px) {
    display:none;
    
  };

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;

    a {
      text-decoration: none;
      color: white;
      font-size: 16px;
      margin: 10px 0;
     
    }
  }
`;


const CenterItems = styled.div`
position: relative;


div{
 margin-right:250px !important;
 position: absolute;
 white-space:nowrap;
 left:-24em;


}


`
const CartLink = styled(NavLinkStyled)`
color:white;
font-size :14px;
text-decoration:none;
font-weight:600;

svg {
 
    vertical-align: middle;
 
  }
`

const IconName = styled(FaUserCircle)`
padding-right:3px;
padding-top:5px;

`

const LogoLinked = styled(Link)`
 text-decoration:none !important;
 transition: all 0.2s ease-in-out;
 &:hover {
    color: #009900;
    transform:translateY(-0.5rem)
  };

`
const GeneralContainer = styled.div`
display:flex !important;
align-items:center;
align-items:center;

`



 const Header = () => {
  const [cshowMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [scrollPage, setScrollPage] = useState(false)
  const { cartItems, cartTotalQuantity } = useSelector((state) => state?.cart);
  const {user, isLoggedIn, isLoading} = useSelector((state)=> state?.auth) 


  useEffect(()=>{
    dispatch(CALCULATE_TOTAL_QUANTITY())
    },[dispatch, cartItems])

  const userData =  user?.name || "..."



  


 

   /*const logOutUser = async () => {
      setShowLoader(true); // Show loader when logout is initiated
      await dispatch(logOut());
      await dispatch(RESET_AUTH());
      navigate("/");
     
        setShowLoader(false); // Hide loader after delay
  
    };*/


  


/*const handleScroll = () => {
  const scrollPosition = window.scrollY;

  if (scrollPosition > 250) {
    // If scroll position is greater than 50, set scrollPage to false
    setScrollPage(false);
    window.scrollTo(0, 250); // Prevent scrolling further down
  } else {
    // If scroll position is 250 or less, set scrollPage to true
    setScrollPage(true);
  }
};

useEffect(() => {
  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);*/





  const toggleMenu = () => {
    setShowMenu(!cshowMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };
 


  

const logOutUser = (async()=>{

 
 await dispatch(logOut())

 await dispatch(RESET_AUTH()) 

 navigate("/login")

 
})










  const cart = (
    <CartLink to="/cart">

    <span>cart </span> 
   <ShoppingCartOutlinedIcon fontSize='8px' />
   <b style={{
    fontSize:'12px',
    verticalAlign:'top'
  
  }} >{cartTotalQuantity} </b>
   </CartLink>

   
)



  return (
    <HeaderContainer>
      { isLoading &&   <Loader/>}
      <HeaderContent  /*className={scrollPage ? "fixed" : "" }*/ >
      {  isLoggedIn ?
       (
        
        <LogoLink to={"/"}  className="btn">
          <span>E-SHOP!</span>
        </LogoLink>

       )   : 
        (
          <LogoLink >
            e<span>SHOP.</span>
          </LogoLink>
  )

      }
        <NavLinksContainer>


          
        <CenterItems>   
       
              <>  
          <div>  
            <ShowOnLogin> 
          <NavLinkStyled   to="/shop" onClick={closeMenu}>

              <span> Shop</span>
          </NavLinkStyled>
          </ShowOnLogin>
          
          <AdminOnlyLink>    
          <NavLinkStyled  to="/admin/home" onClick={closeMenu}>
           
           <span   >Admin</span>
          </NavLinkStyled>
          </AdminOnlyLink>  
      
          </div>
          </>
          

          </CenterItems>

        

       
         <>  
       <ShowOnLogOut> 
       <NavLinkStyled to="/login" onClick={closeMenu}>
        
        <span>Login</span>
           
      </NavLinkStyled>
      </ShowOnLogOut>

              
               <ShowOnLogin> 
         
       
              <GeneralContainer>  
               <div  style={{color:"#ff7722", textDecoration:"none" }}>     
           <IconName> 
         <span>   
        
          <FaUserCircle size={16}  />
          
           </span>
           </IconName>
          <LogoLinked  to={"/profile"} > 
           <span    style={{fontSize:"13px",color:"#ff7722",}} >
           
           Hi,{shortenText(userData, 9)} 
       
           </span>
           </LogoLinked>
       
         
            </div>
            </GeneralContainer>
        
            </ShowOnLogin>
            <ShowOnLogin> 
            <NavLinkStyled to="/order-history" onClick={closeMenu}>
            <span>Orders</span>
          </NavLinkStyled>
          </ShowOnLogin>
          <ShowOnLogin> 
 
              <NavLinkStyled  to="/login" onClick={logOutUser}>
            <span>LogOut</span>
          </NavLinkStyled> 
 
          </ShowOnLogin>

         {cart}
         
         
    
          </>
   
        
         
        
      
        
        </NavLinksContainer>
           <MenuToggleButton onClick={toggleMenu}>
          {cshowMenu ? <AiOutlineClose /> : <MdOutlineMenuOpen />}
        </MenuToggleButton>
      </HeaderContent>
    
      <MenuExternalContainer showMenu={cshowMenu} onClick={toggleMenu}>
        <div>
          <ShowOnLogin> 
          <LogoLink to="/" className="btn">
            <span>ESHOP.</span>
          </LogoLink>

          <NavLinkStyled to="/shop" onClick={closeMenu}>
            <span>Shop </span>
          </NavLinkStyled>
          <NavLinkStyled to="/" onClick={closeMenu}>
            <span>Home</span>
          </NavLinkStyled>
         
          <NavLinkStyled to="/order-history" onClick={closeMenu}>
            <span>Orders</span>
          </NavLinkStyled>
          </ShowOnLogin>
          
          <ShowOnLogOut>
          <NavLinkStyled to="/register" onClick={closeMenu}>
            <span>Register</span>
          </NavLinkStyled>
          
          </ShowOnLogOut>
            <ShowOnLogOut> 
          <NavLinkStyled to="/login" onClick={closeMenu}>
            <span>Login</span>
          </NavLinkStyled>
          </ShowOnLogOut>
          <ShowOnLogin>  
          <NavLinkStyled  onClick={logOutUser}>
            <span>LogOut</span>
          </NavLinkStyled>
          </ShowOnLogin>

           <ShowOnLogin>
          <NavLinkStyled to="/cart">
            <span>{cart} </span>
          </NavLinkStyled>
          </ShowOnLogin>
        </div>
      </MenuExternalContainer>
    
    </HeaderContainer>
  );
};


export const UserName = (()=>{
  const {user} = useSelector((state)=> state.auth)

const userData = user?.name || "..."
return(

  <span  style={{
        color: "#ff7722",
         fontSize:"13px",
        
       
        
        }} >Hi,  {shortenText(userData, 9)}  </span>
)


})


export default Header









































  





