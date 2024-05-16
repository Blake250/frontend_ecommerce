import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import Pagination from '../../components/numPaginate/numPage';
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
  //Link
} from '@mui/material';
import { getOrder } from '../../feature/order/orderSlice';

export default function ListOfOrders({openOrderDetails}) {
  const { isLoading, isError, message, orders } = useSelector((state) => state?.order);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  const style = {
    paddingLeft:'40px',
    fontWeight:'600',
    color:'green',
   ' @media(max-width:768px)':{
    paddingLeft:'40px',
   }
  }

  /*const openOrderDetails = (id)=>{
    navigate(`/order-details/${id}`)
  }*/
  return (
    
        <>
        {isLoading && <Loader/>  }
        { currentItems && currentItems?.length === 0 ? ( <Typography>No Product Found</Typography> )  : (   
      <AppBar position='static' elevation={0} sx={{ backgroundColor: 'transparent', color: 'black', paddingTop: '10px' }}>
        <Divider component='li' sx={{ listStyleType: 'none' }} />
        <Toolbar>
          <TableContainer sx={{ maxHeight: '300px' }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell
                  sx={{
                    fontWeight:'600',
                    color:'green',
                    paddingLeft:'10px'
                   }}
                >S/N</TableCell>
                  <TableCell
                sx={style}
            
          
                  >Date
                  </TableCell>
                  <TableCell
                  
                sx={{
                  paddingLeft:'60px',
                  fontWeight:'600',
                    color:'green',
                }}
                  >Order ID</TableCell>
                
                  <TableCell
                   sx={{
                    fontWeight:'600',
                    color:'green',
                    cursor:'pointer'
                   }}
                  >Order Amount</TableCell>
                  <TableCell
                   sx={{
                    fontWeight:'600',
                    color:'green',
                    paddingLeft:'30px',
                    cursor:'pointer',
                    ' @media(max-width:768px)':{
                      paddingLeft:'30px',
                     }
                   }}
                  > Order Status </TableCell>
                
                </TableRow>
              </TableHead>
              <TableBody
             
              >
                {currentItems?.map((item, index) => (
                
                  
                <TableRow   sx={{
                  '&:hover': {
                    backgroundColor: '#f5f5f5', 
                    cursor: 'pointer',
                  },
                }}  key={item?._id} onClick={()=> openOrderDetails(item?._id)  } >
                    <TableCell>{index + 1}</TableCell>

                    
                    <TableCell
                    sx={{
                      whiteSpace:'nowrap',
                    
                  
                      
                    }}
                     >{item?.orderDate}  at {item?.orderTime} </TableCell>
                    <TableCell>{item?._id}</TableCell>
                    
                    <TableCell>
                   
                      <Typography variant='body1' component='div' color='red' sx={{  cursor:'pointer', fontSize: '13px', fontWeight: '400', paddingLeft: '25px', '@media(max-width:768px)': { textAlign: 'center', paddingLeft: '0px' } }}>
                        ${item?.orderAmount}
                      </Typography>
                    
                    </TableCell>
                    <TableCell
                    sx={{
                      paddingLeft:'30px',
                      color: item?.orderStatus !== 'Delivered' ? 'red' : 'green',
                     
                  
                    }}
                  
                    >${item?.orderStatus}
                    </TableCell>
                  
                  </TableRow>
               
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Toolbar>
      </AppBar>
      )   }

<Box sx={{ marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: '#fff', padding: '20px', borderTop: '1px solid #e0e0e0' }}>
          <Pagination itemsPerPage={itemsPerPage} pageCount={pageCount} handlePageClick={handlePageClick} itemOffset={itemOffset} setItemOffset={setItemOffset} />
        </Box>

      <Stack spacing={2} rowGap='35px' direction='row' sx={{ marginTop: '20px', flexDirection: 'column', '@media(max-width:768px)': { flexDirection: 'column' } }}>
        <Stack spacing={2} sx={{ paddingLeft: '23px' }}>
          <Button variant="outlined" sx={{ width: '150px' }}>Clear cart</Button>
        </Stack>
        </Stack>

        </>
 
  );
}



