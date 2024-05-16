import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, DECREASE_CART, REMOVE_FROM_CART, CLEAR_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY } from '../../feature/cart/cartSlice';
import Pagination from '../../components/numPaginate/numPage';
import DeleteIcon from '@mui/icons-material/Delete';
import { saveCartDB } from '../../feature/cart/cartSlice';
import VerifyCoupon from '../../components/verifyCoupon/VerifyCoupon';
//import PaymentOptions from '../../components//PaymentOptions';
import PaymentOptions from '../../components/paymentOptions/PaymentOptions';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  Button,
  Divider,

  Stack,
  
} from '@mui/material';

export default function Cart() {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector((state) => state?.cart);
  
  const { coupon } = useSelector((state) => state?.coupon);

  //console.log(`here is the coupon: ${coupon}`)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCart = (product) => {
    dispatch(REMOVE_FROM_CART(product))
    dispatch(saveCartDB({cartItems: JSON.parse(localStorage.getItem('cartItems')) }))
  };
  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(saveCartDB({cartItems: JSON.parse(localStorage.getItem('cartItems')) }))
  };
  const increaseCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(saveCartDB({cartItems: JSON.parse(localStorage.getItem('cartItems')) }))
  };
  const clearCart = () => {
    dispatch(CLEAR_CART())
    dispatch(saveCartDB({cartItems:[]}))
  }

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY())
    dispatch(CALCULATE_SUBTOTAL({coupon}))
  }, [dispatch, cartItems, coupon])
  //console.log(`here is the coupon price of ${coupon}`)

  const itemsPerPage = 2;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = cartItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cartItems.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };


  const handleContinueShopping = (event) => {
    event.preventDefault();
   if( event.target.classList.contains('cm')){
    event.stopPropagation();
    navigate('/shop')
     // navigate('/shop');
   }
   
  };

  if (cartItems && cartItems?.length === 0) {
    return (
      <div style={{ margin: '20px' }}>
        <h2>Your Cart Is Empty...</h2>
        <Link to='/shop' style={{ textDecoration: 'none', paddingBottom: '25px' }}>
          &larr; Continue Shopping
        </Link>
      </div>
    )
  } else {
    return (
      <Box height='140vh' sx={{ margin: '20px', paddingTop: '30px', fontSize: '13px', zIndex: '1' }}>
        <Typography variant='h4' component='p' color='orange'
        sx={{
          marginLeft:'15px'
        }}
        >
          Shopping Cart
        </Typography>

        <AppBar position='static' elevation={0} sx={{ backgroundColor: 'transparent', color: 'black', paddingTop: '10px' }}>
          <Divider component='li' sx={{ listStyleType: 'none' }} />
          <Toolbar>
            <TableContainer sx={{ maxHeight: '300px' }} component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>S/N</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell align='center'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item?.name}</TableCell>
                      <Box sx={{ display: 'flex' }}>
                        <img src={item?.image[0]} alt={''} style={{ width: '100px', borderRadius: '5px', marginTop:'20px' }} />
                      </Box>
                      <TableCell>${item?.price}</TableCell>
                      <TableCell>
                        <Button onClick={() => decreaseCart(item)} variant='outlined' size='small'>-</Button>
                        <Typography variant='body1' component='p' color='red' sx={{ fontSize: '13px', fontWeight: '400', paddingLeft: '25px', '@media(max-width:768px)': { textAlign: 'center', paddingLeft: '0px' } }}>
                          {item?.cartQuantity}
                        </Typography>
                        <Button onClick={() => increaseCart(item)} variant='outlined' size='small'>+</Button>
                      </TableCell>
                      <TableCell>${item?.price * item?.quantity}</TableCell>
                      <TableCell align='center'>
                        <Button variant='contained' color='secondary' onClick={() => removeFromCart(item)}>
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Toolbar>
        </AppBar>

        <Box sx={{ marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: '#fff', padding: '20px', borderTop: '1px solid #e0e0e0' }}>
          <Pagination itemsPerPage={itemsPerPage} pageCount={pageCount} handlePageClick={handlePageClick} itemOffset={itemOffset} setItemOffset={setItemOffset} />
        </Box>

      
        <Stack spacing={2} 
        rowGap='35px'
        direction='row'
        sx={{ marginTop: '20px', 
       // display:'flex',
        flexDirection:'column',
        '@media(max-width:768px)': {
           flexDirection: 'column' , 
           
        
        } }}>
          <Stack spacing={2} 

          sx={{
         //   display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
           

          }}
          >  
          <Stack sx={{
            paddingLeft:'23px'
          }} >   
          <Button onClick={() => clearCart()} 
          variant="outlined" 
        //size='small'
       
          direction='row'
          startIcon={<DeleteIcon />}
          sx={{
            whiteSpace:'nowrap',
            width:'150px',
          
           

        
        }}
          >Clear cart
          </Button>
          </Stack>

          
            
          <div
           
           sx={{
            paddingRight:'30px'
           }}
           
           >  
       
          <div to='/shop'
      onClick={ (event)=> handleContinueShopping(event) }
           className='cm'
      /*   onClick={(event) => {
          event.preventDefault()
          event.stopPropagation();
          navigate('/shop');
        }}*/
          style={{
             textDecoration: 'none',
           marginTop: '-40px' ,
           display:'flex',
           justifyContent:'flex-end',
           textAlign:'left',
           cursor:'pointer',
           '@media(max-width:768px)':{
          
          } 
           
           }}>&larr; Continue Shopping</div>
           
           </div>







          </Stack>





          <Stack
          sx={{
          //  marginBottom:'200px',
          }}
          >
          <Paper  
        
          sx={{
  padding: '20px',
  width: '400px',
  height:'85vh',
  marginBottom:'200px',
  
  '@media(max-width:768px)': {
    width: '90%',
  //  paddingBottom:'220px',
  },
}}>
  <Typography variant='contained' color='info' size='small' sx={{ fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>
    {`Cart(s) item ${cartTotalQuantity}`}
  </Typography>
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
    <Stack  direction="row" justifyContent="space-between">
      <Typography variant='body1' component='p' sx={{ fontWeight: '400' }}>Subtotal:</Typography>
      <Typography color='error' variant='h6' component='p'>${cartTotalAmount.toFixed(2)}</Typography>
      
    </Stack>
    <Stack>
    <VerifyCoupon/>
    <PaymentOptions/>
    </Stack>
   
  </Box>

</Paper>
</Stack>


        </Stack>
      </Box>
    )
  }
}










/*import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, DECREASE_CART,REMOVE_FROM_CART,CLEAR_CART,CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY } from '../../feature/cart/cartSlice';
import Pagination from '../../components/numPaginate/numPage';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  Button,
  Divider,
  Card,
  CardMedia,
  Stack,
  
} from '@mui/material';

export default function Cart() {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector((state) => state?.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCart = (product) => {

    dispatch(REMOVE_FROM_CART(product))
  };
  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
  };
  const increaseCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };
  const clearCart = ()=>{
    dispatch(CLEAR_CART())
  }

  useEffect(()=>{
  dispatch(CALCULATE_TOTAL_QUANTITY())
  dispatch(CALCULATE_SUBTOTAL())

  },[dispatch, cartItems])

  const itemsPerPage = 2;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = cartItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cartItems.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  if (cartItems && cartItems?.length === 0) {
    return(
        <div  style={{margin:'20px'}}> 
        <h2  >Your Cart Is Empty...</h2>
        <Link to='/shop' style={{ textDecoration: 'none', paddingBottom: '25px' }}>
        &larr; Continue Shopping
      </Link>
      </div>
    )     
  } else {
    return (
      <Box height='140vh' direction='row'  sx={{ margin: '20px', paddingTop: '30px', fontSize: '13px', zIndex: '1' }}>
        <Typography variant='h4' component='p' color='orange'>
          Shopping Cart
        </Typography>

      
        <AppBar position='static' elevation={0} sx={{ backgroundColor: 'transparent', color: 'black', paddingTop: '10px' }}>
          <Divider component='li' sx={{listStyleType:'none'}} />
          <Toolbar>
            <TableContainer sx={{ maxHeight: '300px' }} component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell>S/N</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell align='center'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems?.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                      <TableCell>{item?.name}</TableCell>
                    
                      <Box sx={{ display: 'flex' }}>
                        <img src={item?.image[0]} alt={''} style={{ width: '100px', borderRadius: '5px' }} />
                      </Box>
                      <TableCell>${item?.price}</TableCell>
                      <TableCell>
                        <Button onClick={() => decreaseCart(item)} variant='outlined' size='small'>
                          -
                        </Button>
                        <Typography variant='body1' component='p' color='red' sx={{ fontSize: '13px', fontWeight: '400', paddingLeft: '25px', '@media(max-width:768px )': { textAlign: 'center', paddingLeft: '0px' } }}>
                          {item?.cartQuantity}
                        </Typography>
                        <Button onClick={() => increaseCart(item)} variant='outlined' size='small'>
                          +
                        </Button>
                      </TableCell>
                      <TableCell>${item?.price * item?.quantity}</TableCell>
                      <TableCell align='center'>
                        <Button variant='contained' color='secondary' onClick={() => removeFromCart(item)}>
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Toolbar>
        </AppBar>

       

        <Box
        sx={{
          display:'flex',
          flexDirection:'row',
          alignItems:'flex-start',
          justifyContent:'space-between'
      
      }}
        >
          
        <Stack spacing={0} direction='row' sx={{marginTop:'20px',}} >
        <Button 
        onClick= {()=> clearCart()}
        variant="outlined"
        startIcon={<DeleteIcon />}>
        Clear cart
      </Button>
     
        </Stack>
     
        <Stack spacing={1} 
    
        
        
        >
       <Link to='/shop' style={{ textDecoration: 'none', marginTop:'10px' }}>
        &larr; Continue Shopping
      </Link>
      <Stack sx={{
        width:'400px', 
       // padding:'20px',
    
      display:'flex',
    paddingRight:'4rem',
    //marginLeft:'60px',
  //paddingLeft:'20rem',
    
    
    }} >
        <Paper sx={{padding:'20px', width:'100%',   }} >
          <Typography
          variant='contained'
          color='info'
          size='small'
          sx={{fontSize:'14px', fontWeight:'600', textAlign:'center'}}
          >
            {`Cart(s) item ${cartTotalQuantity}`}
          </Typography>
       <Box   sx={{
        display:'flex',
        justifyContent:'space-between'
       }}>

       <Stack>
          <Typography
          variant='body1'
          component='p'
          sx={{
            fontWeight:'600',
            
          }}
          >
            Subtotal :
          </Typography>

        </Stack>
        <Stack>
          <Typography
          color='error'
          variant='h6'
          component='p'
          >
          ${cartTotalAmount}
          </Typography>

        </Stack>
       </Box>
        </Paper>
       
        

      </Stack>
  
       </Stack>
    
        

        </Box>
  

        <Box sx={{ marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: '#fff', padding: '20px', borderTop: '1px solid #e0e0e0' }}>
          <Pagination itemsPerPage={itemsPerPage} pageCount={pageCount} handlePageClick={handlePageClick} itemOffset={itemOffset} setItemOffset={setItemOffset} />
        </Box>
      </Box>
    );
  }
}*/










