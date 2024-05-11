import React from 'react';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  FormControlLabel,
  RadioGroup,
   Grid, Paper, 
   Stack,  Button, 
   Typography,
   Checkbox, IconButton,
    TextField, Radio,
    FormGroup
   } from '@mui/material';

const DepositModal = ({

  isLoading,
  handleAmountChange,

  transferMoney,
  closeModal,
  //depositData,
 depositAmount, 
  paymentMethod,
  handleDepositChange,
  depositMoney,


}) => {
  const styling1 = {
    width: '100%',
    marginBottom: '20px'
  };


  const styling = {
    border:'1px solid black',
    borderRadius:'5px',
    padding:'2px',
    margin: '5px 0'
}

  const labelStyles = {
    color: 'red',
    fontSize: '12px',
    marginBottom: '10px'
  };

  
  const slideDownAnimation = {
    width: '100%',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 999,
    margin: 0,
    padding: 0,
    overflowY: 'auto',
  
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
    <Stack>
    
    <Stack
    
    sx={slideDownAnimation}
    >
      <Paper
        sx={{
          width: '40vw',
          minHeight: '40vh',
          p: '20px',
          position:'relative',
          animation: 'slide-down 0.5s ease',
          '@media (max-width:768px)': {
            width: '70vw'
          }
        }}
      >
             <IconButton
            sx={{
              position: 'absolute',
              top: '5px',
              right: '40px',
              size: '30px',
              marginTop: '3px',
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
            onClick={(e) => closeModal(e)}
          >
            <CloseIcon
              className='cm'
              sx={{
                fontSize: '30px',
                color: 'white',
                backgroundColor: 'red',
                borderRadius: '50%',
              }}
            />
          </IconButton>

        <Typography
        
        sx={{
          '@media (max-width:768px)': {
            fontSize: '17px'
          }
        }}
        variant="h5" gutterBottom>
           Deposit Funds Into Your Wallet
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
      
            <Typography sx={labelStyles} variant="body1">
              Amount (Number):
            </Typography>
            <TextField
           ref={inputRef}
            //  required
              type="number"
              name="amount"
              value={depositAmount}
              onChange={handleAmountChange}
              sx={styling1}
              label="amount"
              variant="outlined"
            />
         
          </Grid>
          <Grid item xs={12}>
      
        
          <FormGroup
          // row
           aria-labelledby="demo-form-control-label-placement"
           name="position"
          defaultValue="top"
           >

           <FormControlLabel
   sx={styling}
      control={<Checkbox checked={ paymentMethod === 'stripe'} 
      value={'stripe'}
      onChange={handleDepositChange} 
      name="stripe" />}
      label="Stripe"
        inputProps={{
        'aria-label':'stripe'
 }}
    />
    <FormControlLabel
    sx={styling}
      control=
      {<Checkbox checked={paymentMethod === 'flutterWave'} />}
      label="FlutterWave"
      onChange={handleDepositChange}
       name="flutterWave" 
       value={'flutterWave'}
      inputProps={{
        'aria-label':'flutterWave'
      }}
    />


</FormGroup>
    



          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="flex-end" mt={2}>
          <Button
          className='cm'
           onClick={(e) => closeModal(e)}
            variant="contained"
           sx={{ backgroundColor: 'orange', color: 'white', mr: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={ (e)=>depositMoney(e) }
            sx={{ backgroundColor: 'orangered', color: 'white' }}
          >
           Deposit Money
          </Button>
          {isLoading && (
            <Typography sx={{ textAlign: 'end', mt: 2 }} variant="body1">
              Sending...
            </Typography>
          )}
        </Stack>
      </Paper>
    </Stack>
    </Stack>
  );
};

export default DepositModal;











