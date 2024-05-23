



import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import  { useEffect, useState, useRef } from 'react';
import { useParams,Link } from 'react-router-dom';
import Loader from '../../components/Loader';

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
 // Link
  
} from '@mui/material';


import Pagination from '../../components/numPaginate/numPage';
import { singleOrder } from '../../feature/order/orderSlice';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';







const OrderDetails = () => {
  const { isLoading,  order} = useSelector((state) => state?.order);
 // console.log(`here is the ${JSON.stringify(order) }`)
  const dispatch = useDispatch();
const pdfRef = useRef()
const {id} = useParams()

  useEffect(() => {
    dispatch(singleOrder(id));
  }, [id, dispatch]);


const style = {
  fontWeight:'600',
  color:'green'
}


const downloadPDF = ()=>{
   const input = pdfRef.current
   html2canvas(input).then((canvas)=>{
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4', true);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imageWidth = canvas.width
    const imageHeight = canvas.height
    const ratio = Math.min(pdfWidth / imageWidth, pdfHeight/ imageHeight);
    const imgX = (pdfWidth - imageWidth * ratio)/2;
    const imgY = 30;
    pdf.addImage(
      imgData,
      'PNG',
      imgX,
      imgY,
      imageWidth * ratio,
      imageHeight * ratio

    );
    pdf.save('e-shop.pdf')
   })
}

  const itemsPerPage = 2;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = order?.cartItems?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(order?.cartItems?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

 const styleText = {
     fontWeight:'600',
     Cursor:'pointer',

 }
  return (
    <Stack
    ref= {pdfRef}
    sx={{
    //  margin:'10px',
      paddingBottom:'90px',
     
    }}
    spacing={2} >
    <Stack  
       sx={{
        paddingLeft:'15px',
      }}
    >
      <Typography
      component='div'
      variant='h4'
      >
     Order Details
      </Typography>
     
      <Link to='/order-history' style={{ textDecoration: 'none', paddingBottom: '25px' }}>
          &larr; Back To Orders
        </Link>
      
      <Divider/>
      <Stack sx={{
        marginTop:'10px'
      }} spacing={2} >
       {
        isLoading && order === null ?
         (
          <Loader/>
        ) :

        (
          <Stack spacing={1} 
       
          direction={'column'}
          sx={{

          }} >
           <Stack
              justifyContent={'space-between'}>
            
              <Typography
              variant='h5'
              component={'div'}
              sx={{
                fontSize:'16px',
                fontWeight:'600',
                color:'green'
              }}
              >
              Ship to
            </Typography>
            <Typography
              variant='body2'
              component={'div'}
              sx={{marginLeft:'10px'}}
            >
              {order?.shippingAddress?.name}
            </Typography>
           </Stack>


           <Stack
              justifyContent={'start'}
              direction='row'
              alignItems='center'
              >
               
              <Typography
              variant='h5'
              component={'div'}
              sx={{
                fontSize:'16px',
                fontWeight:'600',
                color:'green'
              }}
              >
              Order ID 
            </Typography>
            <Typography
              variant='body2'
              component={'div'}
              sx={{marginLeft:'10px'}}
            >
              {order?._id}
            </Typography>
           </Stack>


           
           <Stack
              justifyContent={'start'}
              direction='row'
              alignItems='center'
              >
               
              <Typography
              variant='h5'
              component={'div'}
              sx={{
                fontSize:'16px',
                fontWeight:'600',
                color:'green'
              }}
              >
              Order Amount
            </Typography>
            <Typography
              variant='body2'
              component={'div'}
              sx={{marginLeft:'10px'}}
            >
              ${order?.orderAmount}
            </Typography>
           </Stack>

                 
           <Stack
              justifyContent={'start'}
              direction='row'
              alignItems='center'
              >
               
              <Typography
              variant='h5'
              component={'div'}
              sx={{
                fontSize:'16px',
                fontWeight:'600',
                color:'green'
              }}
              >
             Coupon
            </Typography>
            <Typography
              variant='body2'
              component={'div'}
              sx={{marginLeft:'10px'}}
            >
              {order?.coupon?.name} |   {order?.coupon?.discount}%
            </Typography>
           </Stack>


             
           <Stack
              justifyContent={'start'}
              direction='row'
              alignItems='center'
              >
               
              <Typography
              variant='h5'
              component={'div'}
              sx={{
                fontSize:'16px',
                fontWeight:'600',
                color:'green'
              }}
              >
            Payment Method
            </Typography>
            <Typography
              variant='body2'
              component={'div'}
              sx={{marginLeft:'10px'}}
            >
              {order?.paymentMethod}
            </Typography>
           </Stack>


                 
           <Stack
              justifyContent={'start'}
              direction='row'
              alignItems='center'
              >
               
              <Typography
              variant='h5'
              component={'div'}
              sx={{
                fontSize:'16px',
                fontWeight:'600',
                color:'green'
              }}
              >
              Order Status
            </Typography>
            <Typography
              variant='body2'
              component={'div'}
              sx={{marginLeft:'10px'}}
            >
              {order?.orderStatus}
            </Typography>
           </Stack>


                 
           <Stack
              justifyContent={'start'}
              direction='row'
              alignItems='center'
              >
               
              <Typography
              variant='h5'
              component={'div'}
              sx={{
                fontSize:'16px',
                fontWeight:'600',
                color:'green',
                whiteSpace:'nowrap'
              }}
              >
             Shipping Address
            </Typography>
            <Typography
              variant='body2'
              component={'div'}
              sx={{marginLeft:'10px'}}
            >
             Address: {order?.shippingAddresses?.line1},
             {order?.shippingAddresses?.line2},
             {order?.shippingAddresses?.city},
            </Typography>
           </Stack>


           
           <Stack
              justifyContent={'start'}
              direction='row'
              alignItems='center'
              >
               
              <Typography
              variant='h5'
              component={'div'}
              sx={{
                fontSize:'16px',
                fontWeight:'600',
                color:'green'
              }}
              >
            State 
            </Typography>
            <Typography
              variant='body2'
              component={'div'}
              sx={{marginLeft:'10px'}}
            >
              {order?.shippingAddresses?.state}
            </Typography>
           </Stack>

                 
           <Stack
              justifyContent={'start'}
              direction='row'
              alignItems='center'
              >
               
              <Typography
              variant='h5'
              component={'div'}
              sx={{
                fontSize:'16px',
                fontWeight:'600',
                color:'green'
              }}
              >
             Country
            </Typography>
            <Typography
              variant='body2'
              component={'div'}
              sx={{marginLeft:'10px'}}
            >
              {order?.shippingAddresses?.country}
            </Typography>
           </Stack>

          </Stack>
        )



       }

      </Stack>
       <Stack sx={{
       
       }} >
       <AppBar position='static' elevation={0} sx={{ 
        backgroundColor: 'transparent',
        color: 'black', 
   
     
    
         }}>
          <Divider component='li' sx={{ listStyleType: 'none' }} />
          <Toolbar>
            <TableContainer  
            sx={{
               maxHeight: '400px',
               '@media(max-width:768px)': {
                width:'100vw',
               }
          
          }} component={Paper}>
              <Table>
                <TableHead>
                  <TableRow
                 
                  >
                    <TableCell sx={style}  >S/N</TableCell>
                    <TableCell sx={style}  >Name</TableCell>
                    <TableCell sx={style}  >Product</TableCell>
                    <TableCell sx={style}  >Price</TableCell>
                    <TableCell sx={style}  >Quantity</TableCell>
                    <TableCell sx={style}  >Total</TableCell>
                    <TableCell sx={style}   align='center'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems?.map((item, index) => (
                    <TableRow key={item?._id}>
                      <TableCell sx={styleText} >{index + 1}</TableCell>
                      <TableCell sx={styleText} >{item?.name}</TableCell>
                      {item?.image && item?.image[0] && (
                   <img
                     src={item.image[0]}
                   alt={''}
                  style={{ width: '95px', borderRadius: '5px', marginTop:'5px' }}
                   />
                       )}
        
        

                      <TableCell sx={styleText}  >${item?.price}</TableCell>
                      <TableCell sx={styleText}  >
                     
       
                        <Typography variant='body1' component='p' color='red' sx={{ fontWeight:'600', cursor:'pointer', fontSize: '13px',  paddingLeft: '25px', '@media(max-width:768px)': { textAlign: 'center', paddingLeft: '0px' } }}>
                          {item?.cartQuantity}
                        </Typography>
                        
                      </TableCell>
                      <TableCell sx={styleText}  >${item?.price * item?.quantity}</TableCell>
                      <TableCell align='center'>
                        <Button variant='contained' color='secondary' 
                        
                        sx={{
                          whiteSpace:'nowrap'
                        }}
                        >
                          Review Product
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Toolbar>
        </AppBar>



        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <Stack sx={{ width: '200px', whiteSpace: 'nowrap', margin: '0 auto', marginTop: '20px' }}>
    <Button
      onClick={downloadPDF}
      variant='contained'
      size='small'
      sx={{ textAlign: 'center' }}
    >
      Download as PDF
    </Button>
  </Stack>
  <Box sx={{ marginTop: '15px' }}>
    <Pagination
      itemsPerPage={itemsPerPage}
      pageCount={pageCount}
      handlePageClick={handlePageClick}
      itemOffset={itemOffset}
      setItemOffset={setItemOffset}
    />
  </Box>
</Box>

          
       
       </Stack>
   
      
    </Stack>
      </Stack>

  )
}

export default OrderDetails
