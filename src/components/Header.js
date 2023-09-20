


import React, {useState,useEffect} from 'react'
import styled from "styled-components"
import { Link,NavLink } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
//import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import  {MdOutlineMenuOpen} from "react-icons/md"
import  {AiOutlineClose} from "react-icons/ai"
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import  {FaUserCircle} from "react-icons/fa"
import { onAuthStateChanged } from 'firebase/auth';
import { toast, } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { removeActiveUser, setActiveUser } from '../redux/slice/authSlice';







const HeaderContainer = styled.div`
  background-color: #a46852;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
 // z-index: 4 !important;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const LogoLink = styled(Link)`
  color: white;
  font-size: 22px !important;
  font-weight: 600;
  text-decoration: none;

  span {
    color: red;
    font-size: 20px;
  }
`;

const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;

 div{
  display:flex;
  color:white;
  align-items:center;
  justify-content:center;
  &>span{
   &:last-child{
    font-size:13px;
    font-weight:600;
    padding-left:3px;

   }
  }
 }
 @media (max-width: 760px) {
  display:none;
  
 }
`;

const NavLinkStyled = styled(NavLink)`
  color: white;
  text-decoration: none;
  padding: 3px;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  margin: 0 4px;
  svg{
    white-space:wrap !important;
  }
  @media (max-width:768px) {

     font-size: 14px !important;
     font-weight: 600 !important;
  }


  &:hover {
    color: #ddd3cf;
  }

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
    left: 0;
    right: 0;
    bottom: -4px;
    transform: scaleX(0);
    transform-origin: left right;
    opacity: 0;
    transition: transform 0.2s ease-in-out;
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

  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuExternalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    
  }

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
 left:-21em;
  




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








const Header = () => {
  const [cshowMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const isLoggedIn = useSelector((state)=> state.auth.auth?.isLoggedIn)
  console.log(`your login is ${isLoggedIn}`)
  
  

  const toggleMenu = () => {
    setShowMenu(!cshowMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  /*const logOutBtn = (()=>{
    signOut(auth).then(()=>{
    
      setTimeout(()=>{
        toast.success("logout is successful")
      //  navigate("/")

      },5000)
     
   

    }).catch((error)=>{
      toast.error(error.message)

    })

  })*/


  const logOutBtn = () => {
    signOut(auth)
      .then(() => {
        navigate("/")
          toast.success("logout is successful");
       
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  

  
/*  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);*/



  useEffect(()=>{
    onAuthStateChanged(auth, ((user)=>{

      if(user){
       // console.log(user)
     
       
        if(user.displayName == null){
        const Name = user.email.substring(0, user.email.indexOf("@"))
        
        const getName = Name.charAt(0).toUpperCase() + Name.slice(1)
      
       console.log(setUserName(getName))
        }
        else{
          
        setUserName(user.displayName)

        }
       

        dispatch(setActiveUser({
          email:user.email,
          usedName:user.displayName ? user.displayName : userName,
          userID: user.uid

        }))
     
      }
      else{
        setUserName("")
        dispatch(removeActiveUser())
     
      }
    
    
    }))
  }, [dispatch, userName])



  const cart = (
          

    <CartLink to="/cart">

   
       <ShoppingCartOutlinedIcon fontSize='8px' />0
       
       </CartLink>

   
)


  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoLink to="/home" className="btn">
          e<span>SHOP.</span>
        </LogoLink>


        <NavLinksContainer>

          
        <CenterItems>   
          {
            isLoggedIn ? (
              <>  
          <div>  
          <NavLinkStyled   to="/home" onClick={closeMenu}>

              <span>Home</span>
          </NavLinkStyled>
         
          <NavLinkStyled  to="/contact" onClick={closeMenu}>
           
              <span   >contact us</span>
          </NavLinkStyled>
          </div>
          </>
            ) :
            (

            " "
            )
}
          </CenterItems>

        

       
        { !isLoggedIn   ? 

         (  <>  
       <NavLinkStyled to="/" onClick={closeMenu}>
        
        <span>Login</span>
           
      </NavLinkStyled>

          
      <NavLinkStyled to="/cart" onClick={closeMenu}>
            <span>cart</span>
          </NavLinkStyled>
        
           {cart}  
          </>
           ) :

          (  
            <>
               
          <div style={{color:"#ff7722"}}>     
         <span>   
          <FaUserCircle size={16} /> </span>
           <span>
           Hi, {userName} </span>
            </div>
            <NavLinkStyled to="/order" onClick={closeMenu}>
            <span>Orders</span>
          </NavLinkStyled>


              <NavLinkStyled to="/" onClick={logOutBtn}>
            <span>LogOut</span>
          </NavLinkStyled>

        
            <NavLinkStyled to="/cart" onClick={closeMenu}>
            <span>cart</span>
          </NavLinkStyled>

          {cart}
    
          </>
          )

        }
        
         
        
      
        
        </NavLinksContainer>
        <MenuToggleButton onClick={toggleMenu}>
          {cshowMenu ? <AiOutlineClose /> : <MdOutlineMenuOpen />}
        </MenuToggleButton>
      </HeaderContent>
      <MenuExternalContainer showMenu={cshowMenu} onClick={toggleMenu}>
        <div>
          <LogoLink to="/home" className="btn">
            e<span>SHOP.</span>
          </LogoLink>
          <NavLinkStyled to="/home" onClick={closeMenu}>
            <span>Home</span>
          </NavLinkStyled>
          <NavLinkStyled to="/contact" onClick={closeMenu}>
            <span>Contact us</span>
          </NavLinkStyled>
          <NavLinkStyled to="/order" onClick={closeMenu}>
            <span>Orders</span>
          </NavLinkStyled>
          <NavLinkStyled to="/register" onClick={closeMenu}>
            <span>Register</span>
          </NavLinkStyled>
        
          <NavLinkStyled to="/" onClick={closeMenu}>
            <span>Login</span>
          </NavLinkStyled>
         
        
          <NavLinkStyled to="/" onClick={logOutBtn}>
            <span>LogOut</span>
          </NavLinkStyled>
        </div>
      </MenuExternalContainer>
    </HeaderContainer>
  );
};

export default Header;


































