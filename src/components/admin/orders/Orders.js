
import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getOrder } from '../../../feature/order/orderSlice';
import Loader from '../../Loader';
import Pagination from '../../numPaginate/numPage';
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
  
  //Link
} from '@mui/material'

export default function Order() {
  const { isLoading, orders } = useSelector((state) => state?.order);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

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

  const openOrderDetails = (id)=>{
    navigate(`/admin/details-orders/${id}`)
  }
  return (
    <Box /*height='100vh'*/
    sx={{ 
        margin: '0px', 
        paddingTop: '50px', 
        fontSize: '13px', 
        zIndex: '1',
        width:'75vw',
        //display:'flex',
        justifyContent:'center',
       flexDirection:'column' ,
       paddingBottom:'200px',
       '@media(max-width: 768px) ':{
        width:'62vw',
        
        //margin: '5px',
      }
        
        }}>
      <Box
        sx={{
            '@media(max-width: 768px) ':{
                 fontSize:'15px'
              }
        }}
      >
      <Typography variant='h4' component='div' color='orange' sx={{ marginLeft: '15px' }}>
      All Orders Histories
      </Typography>
      <Typography variant='body1' component='div' color='orange' sx={{ marginLeft: '15px', fontSize:'15px' }}>
       View All Products Orders
      </Typography>
      </Box>
        <>{isLoading && <Loader/>  } </>
        { currentItems && currentItems?.length === 0 ? ( <Typography>No Product Found</Typography> )  : (   
      <AppBar
      position='static' elevation={0} sx={{
         backgroundColor: 'transparent',
          color: 'black',
           paddingTop: '10px', 
        
          '@max-width(max-width": 768px) ':{
            padding:'30px',
      
          }
          
          
          }}>

        <Toolbar>
          <TableContainer sx={{
             maxHeight: '300px' ,
           

          
        }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow
             
                >
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
              sx={{
                cursor:'pointer'
              }}
              >
                {currentItems?.map((item, index) => (
                
                    
                <TableRow 
                  sx={{
                    '&:hover':{
                      cursor:'pointer',
                      backgroundColor:'#ccc'
                    }
              
                }}     key={item?._id} onClick={()=> openOrderDetails(item?._id)  } >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell
                    sx={{
                      whiteSpace:'nowrap',
                      cursor:'pointer'  
                  
                      
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
                      cursor:'pointer'
                  
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
      )   
    }
      
      <Box sx={{ 
         margin:'0 auto', 
          width: '100%', marginTop: '15px',
           display: 'flex',
            alignItems: 'center',
             justifyContent: 'center', 
             position: 'fixed', left: 0, bottom: 0,  backgroundColor: '#fff', padding: '20px', borderTop: '1px solid #e0e0e0' }}>
           <Box sx={{
            paddingLeft:'120px',
            '@media(max-width: 768px)':{
                paddingLeft:'0px'
              }
           }} >  
          <Pagination itemsPerPage={itemsPerPage} pageCount={pageCount} handlePageClick={handlePageClick} itemOffset={itemOffset} setItemOffset={setItemOffset} />
        </Box>
        </Box>
      </Box>

   


  );
}








