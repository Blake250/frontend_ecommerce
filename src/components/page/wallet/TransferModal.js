

import React, {useRef, useEffect} from 'react';
import { TextField, Grid, Paper, Stack, Typography, IconButton, Button, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Example of another icon (Favorite)
import { shortenText } from '../../utils';


const TransferModal = ({
  transferData, isVerified, isLoading, handleInputChange,
  handleAccountChange,verifyUserAccount,transferMoney,
  closeModal, receiverName
}) => {

  const styling = {
    width: '100%',
    marginBottom: '20px',
   
  };

  const slideDownAnimation = {
  
    '@keyframes slide-down': {
      '0%': {
        transform: 'translateY(-5rem)', 
        opacity: 0, 
      },
      '100%': {
        transform: 'translateY(0)', 
        opacity: 1, 
      },
    },
  };
const inputRef = useRef(null)

useEffect(()=>{
  inputRef.current?.focus()

},[])


  return (
    <Stack
     position='relative'
     sx={slideDownAnimation }
     
     >
      <Stack
        sx={{
          width: '100%',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
         backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background
          position: 'fixed',
          top: '-13px',
          left: 0,
          zIndex: '999',
          
        }}
      >
        <Paper
     
          sx={{
            width: '400px',
            padding: '20px',
            position: 'relative', 
            animation: 'slide-down 0.5s ease'
           
          }}
        >

             <IconButton
            sx={{
              position: 'absolute',
              top: '5px',
              right: '40px',
              size:'30px',
              marginTop:'3px'
            }}
          >
            <FavoriteIcon />
          </IconButton>

          <IconButton
            sx={{
              position: 'absolute',
              top: '5px',
              right: '5px',
            }}
            onClick= { (e)=> closeModal(e)}
          >
            <CloseIcon 
              
             className='cm'
              sx={{ fontSize: '30px', 
              color: 'white', 
              backgroundColor: 'red',
               borderRadius: '50%',
             
               
               }} />
          </IconButton>

           
          <Typography variant="h5" gutterBottom>
            Transfer Details
          </Typography>
          <Grid 
         
          container
           spacing={2}>
            <Grid 
            item xs={12}>
          
            
            
            
              <Typography variant='body1'>
                Amount (Number):
              </Typography>
              <TextField
              ref={inputRef}
                required
                type="number"
                name='amount'
                value={transferData?.amount}
                onChange={handleInputChange}
                sx={styling}
                label="Amount"
                variant="outlined"
              />
            </Grid>
             


            <Grid item xs={12} container alignItems="center">
              <Grid 
              item xs={8}
              >
                  <Stack
                   spacing={11}
                   direction={'row'}
               
                  >
                    
                <Typography 
                  sx={{
                    fontSize:'12px',
                    color:'blue',
                    whiteSpace:'wrap',
                    paddingBottom:'8px',
                    whiteSpace:'nowrap'
                  }}
                  
                variant='body1'>
                  
                  Receiver's Account:
                </Typography>

              {    receiverName !== '' && (
                <Typography 
                  sx={{
                    fontSize:'12px',
                    color:'blue',
                    whiteSpace:'nowrap',
                 

                  }}
                  
                  variant='body1'>
                  <b style={{color:'orangered'}} >  Receiver's Name:   </b>
                {shortenText(receiverName , 14) }
                </Typography>
               )
                }

                  </Stack>
                <TextField
                  required
                  name='receiver'
                  value={transferData?.receiver}
                  onChange={handleAccountChange}
                  sx={{ width: 'calc(100% - 60px)', ...styling }} 
                  label="Receiver Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <Button 
                variant="contained" 
                fullWidth
                sx={{
                   height:'9vh',
                  marginTop:'6px'
                   
                }}
                onClick={verifyUserAccount}
                >
               verify
                </Button>
              </Grid>

              <Grid item xs={12}>
              <Typography variant='body1'>
              Description
              </Typography>
              <TextField
                required
                name='description'
                value={transferData?.description}
                onChange={handleInputChange}
                sx={styling}
                label="Description"
                variant="outlined"
              />
            </Grid>

          


            <Box
            sx={{
              display:'flex',
              justifyContent:'flex-start'
            }}
            >   

              { !isVerified && (
              <>
                <Box>
                  <Typography
                  component='div'
                  variant='body1'
                  sx={
                    {
                      fontSize:'13px',
                      color:'red',
                     
                      
                    }
                  }
                  >
                    Please verify the receiver's account...
                  </Typography>
                
                </Box> 
                </>
             ) }


             
              <Box
              sx={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'flex-end',
                alignItems:'flex-end'

              }}
              >

{       isVerified && (
                <> 
            
              <Button
              variant='contained'
              size='medium'
              onClick={(e)=> closeModal(e)}
              className='cm'
              sx={{
                backgroundColor:'orange',
                marginRight:'8px'
              }}

              >
          
              
              
              cancel
             
              </Button>


               
              <Button
          onClick={transferMoney} 
        variant='contained'
        size='medium'
        component='form'
        sx={{
          backgroundColor:'orangered',
          marginRight:'8px'
        }}
       
        >
        Send


        
        </Button>
         


             




              </>
                 ) }


           {  isLoading ? (
            <Box
            sx={{
              textAlign:'end',
              paddingLeft:'110px'
            }}
            > 
              <Button
              disabled
              variant='contained'
              size='medium'
              sx={{
                backgroundColor:'orangered',
            
              }}
             
              >
              Sending...


              
              </Button>
              </Box>
           )  :

           (
            null
           )

       
            }
              </Box>
             

              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Stack>
    </Stack>
  );
};

export default TransferModal;










