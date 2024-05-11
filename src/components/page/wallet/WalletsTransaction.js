import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
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
  Button,
  Divider,
  Stack,
  //Link
} from '@mui/material';
import { getTransactions } from '../../../feature/transactions/transactionsSlice';






const WalletsTransaction = ({transactions, user}) => {

const dispatch = useDispatch()

useEffect(()=>{
dispatch(getTransactions())
},[dispatch])


    const itemsPerPage = 4;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = transactions.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(transactions.length / itemsPerPage);
    





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
    


  return (
   
    <Box  sx={{ paddingTop: '20px', fontSize: '13px', zIndex: '1', marginBottom:'20px' }}>
      <Typography variant='h4' component='div' color='orange' sx={{ marginLeft: '15px' }}>
      Your  Transactions
      </Typography>
      <Typography variant='body1' component='div' color='orange' sx={{ marginLeft: '15px', fontSize:'15px' }}>
     you can view all your transactions here...
      </Typography>
     
        { currentItems && currentItems?.length === null ? ( <Typography>No Transactions Found</Typography> )  : (   
      <AppBar position='static' elevation={0} sx={{  
     backgroundColor: 'transparent', color: 'black', paddingTop: '10px',
       ' @media(max-width:768px)':{
        marginLeft:'-20px',
        paddingRight:'-50px'
        
       }
       
       }}>
        <Divider component='li' sx={{ listStyleType: 'none' }} />
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
            
            sx={{
                fontWeight:'600',
                color:'green',
               // paddingLeft:'10px'
               }}
          
                  >Date
                  </TableCell>
                  <TableCell
                  
                sx={{
                  paddingLeft:'110px',
                  fontWeight:'600',
                    color:'green',
                    '@media(max-width:768px)':{
                      paddingLeft:'50px',
                  }

                }}
                  >TransactionID</TableCell>
                
                  <TableCell
                   sx={{
                    fontWeight:'600',
                    color:'green',
                    cursor:'pointer',
                    paddingLeft:'68px',
                    '@media(max-width:768px)':{
                        paddingLeft:'10px',
                    }
                   }}
                  > Amount</TableCell>
                             <TableCell
                   sx={{
                    fontWeight:'600',
                    color:'green',
                   // cursor:'pointer'
                   }}
                  > Type</TableCell>



                    <TableCell
                   sx={{
                    fontWeight:'600',
                    color:'green',
                    whiteSpace:'nowrap'
                   // cursor:'pointer'
                   }}
                  > Ref Account</TableCell>
                    <TableCell
                   sx={{
                    fontWeight:'600',
                    color:'green',
                   
                   }}
                  > Description</TableCell>
                      <TableCell
                   sx={{
                    fontWeight:'600',
                    color:'green',
                    cursor:'pointer',
                    
                   }}
                  > Status</TableCell>

           
                
                </TableRow>
              </TableHead>
              <TableBody
              sx={{
                cursor:'pointer'
              }}
              >
                {currentItems?.map((item, index) => (
              //  const {id, createdAt, amount,sender,receiver, description,} = item
                    
            <TableRow 
             
                  sx={{
                    '&:hover':{
                      cursor:'pointer',
                      backgroundColor:'#ccc'
                    }
              
                }}     key={item?._id}  >
                    <TableCell>{ itemOffset + index + 1}</TableCell>
                    <TableCell
                    sx={{
                      whiteSpace:'nowrap',
                      cursor:'pointer'  
                  
                      
                    }}
                     > {item?.createdAt}</TableCell>


                      <TableCell>
                   
                   <Typography variant='body1' component='div' color='red' sx={{ whiteSpace:'nowrap', cursor:'pointer', fontSize: '13px', fontWeight: '400', paddingLeft: '60px', '@media(max-width:768px)': { textAlign: 'center', paddingLeft: '0px' } }}>
                     {item?._id}
                   </Typography>
                 
                 </TableCell>

                       
                    <TableCell>
                   
                   <Typography variant='body1' component='div' color='red' sx={{ whiteSpace:'nowrap', cursor:'pointer', fontSize: '13px', fontWeight: '400', paddingLeft: '60px', '@media(max-width:768px)': { textAlign: 'center', paddingLeft: '0px' } }}>
                     ${item?.amount}
                   </Typography>
                 
                 </TableCell>
                 
                    
                    <TableCell>
                   
                      <Typography variant='body1' component='div' color='red' sx={{ whiteSpace:'nowrap',
                      cursor:'pointer', fontSize: '13px', fontWeight: '400', paddingLeft: '0px',
                       '@media(max-width:768px)': { textAlign: 'center', paddingLeft: '0px' } }}>
                        {item?.sender === user?.email ? 'Debit' : 'Credit'}
                      </Typography>
                    
                    </TableCell>

                    <TableCell>
                   
                   <Typography 
                   variant='body1' component='div' 
                   color='red' sx={{ whiteSpace:'nowrap',  cursor:'pointer', 
                   fontSize: '13px', fontWeight: '400', paddingRight: '50px',
                    '@media(max-width:768px)': { textAlign: 'center', paddingLeft: '0px' } }}>
                     {item?.sender === user?.email ? item?.receiver : item?.sender  }
                   </Typography>
                 
                 </TableCell>

                

                    <TableCell>
                   
                      <Typography variant='body1' component='div' color='red' sx={{ whiteSpace:'nowrap',  cursor:'pointer', fontSize: '13px', fontWeight: '400', /*paddingLeft: '25px',*/ '@media(max-width:768px)': { textAlign: 'center', paddingLeft: '0px' } }}>
                        {item?.description}
                      </Typography>
                    
                    </TableCell>

                    <TableCell
                    sx={{
                      paddingLeft:'15px',
                  //    color: orderStatus !== 'Delivered' ? 'red' : 'green',
                      cursor:'pointer'
                  
                    }}
                  
                    >{item?.status}
                    </TableCell>
                  
                  </TableRow> 
               

                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Toolbar>
      </AppBar>
      )   }

<Box sx={{ marginTop:'9px',display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

  <Box sx={{
     marginTop: '15px',
     '@media(max-width:768px)':{
     //width: '150px',
   //   paddingRight:'80px'
   margin: 'auto 0',
    }

}}>
    <Pagination
      itemsPerPage={itemsPerPage}
      pageCount={pageCount}
      handlePageClick={handlePageClick}
      itemOffset={itemOffset}
      setItemOffset={setItemOffset}
    />
  </Box>
</Box>
  

   
    </Box>
  )
}

export default WalletsTransaction
















/*import React, { useState, useEffect } from 'react';
import Pagination from '../../numPaginate/numPage';
import Loader from '../../Loader';
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
  CardMedia // Import CardMedia component
} from '@mui/material';

const WalletsTransaction = ({ transactions, user }) => {
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = transactions.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(transactions.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };
  const style = {
    whiteSpace:'nowrap'
  }

  return (
    <Box sx={{ margin: '20px', paddingTop: '30px', fontSize: '13px', zIndex: '1', marginBottom: '60px' }}>
      <Typography variant='h4' component='div' color='orange' sx={{ marginLeft: '15px' }}>
        Your Order History
      </Typography>
      <Typography variant='body1' component='div' color='orange' sx={{ marginLeft: '15px', fontSize: '15px' }}>
        Open an Order to Leave a Product Review
      </Typography>
     
      <AppBar position='static' elevation={0} sx={{ backgroundColor: 'transparent', color: 'black', paddingTop: '10px' }}>
        <Divider component='li' sx={{ listStyleType: 'none' }} />
        <Toolbar>
          <TableContainer sx={{ maxHeight: '300px' }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={style} >
                  <TableCell sx={{ fontWeight: '600', color: 'green', paddingLeft: '10px' }}>S/N</TableCell>
                  <TableCell sx={{ fontWeight: '600', color: 'green', paddingLeft: '60px' }}>Transaction Date</TableCell>
                  <TableCell sx={{ fontWeight: '600', color: 'green' }}>Transaction Amount</TableCell>
                  <TableCell sx={{ fontWeight: '600', color: 'green' }}>Sender</TableCell>
                  <TableCell sx={{ fontWeight: '600', color: 'green' }}>Receiver</TableCell>
                  <TableCell sx={{ fontWeight: '600', color: 'green' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: '600', color: 'green' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems?.map((item, index) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      '&:hover': {
                        cursor: 'pointer',
                        backgroundColor: '#ccc'
                      }
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                    <TableCell>
                      <Typography
                        variant='body1'
                        component='div'
                        color='red'
                        sx={{ cursor: 'pointer', fontSize: '13px', fontWeight: '400', paddingLeft: '25px' }}
                      >
                        ${item.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant='body1'
                        component='div'
                        color='red'
                        sx={{ cursor: 'pointer', fontSize: '13px', fontWeight: '400', paddingLeft: '25px' }}
                      >
                        ${item.sender}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant='body1'
                        component='div'
                        color='red'
                        sx={{ cursor: 'pointer', fontSize: '13px', fontWeight: '400', paddingLeft: '25px' }}
                      >
                        ${item.receiver}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant='body1'
                        component='div'
                        color='red'
                        sx={{ cursor: 'pointer', fontSize: '13px', fontWeight: '400', paddingLeft: '25px' }}
                      >
                        {item.description}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ paddingLeft: '30px', color: item.status !== 'Delivered' ? 'red' : 'green' }}>
                      {item.status}
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
      <Stack spacing={2} rowGap='35px' direction='row' sx={{ marginTop: '20px', flexDirection: 'column' }}>
        <Stack spacing={2}>
          <Button variant="outlined" sx={{ width: '150px' }}>Clear cart</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default WalletsTransaction;*/






