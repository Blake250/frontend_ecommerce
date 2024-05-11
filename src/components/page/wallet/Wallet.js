

import PageMenu from '../PageMenu'
import {  IconButton,Divider, Paper, Box, CardMedia, CardActions, CardContent, Typography, Stack, Card, Button } from '@mui/material';
//import imagePhoto from '../imagePhotos/pay.png'
import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../../redux/slice/authSlice';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RedeemIcon from '@mui/icons-material/Redeem';
import WalletsTransaction from './WalletsTransaction';
import { RESET_RECEIVER, RESET_TRANSACTION_MESSAGE, getTransactions, transferFund, verifyAccount } from '../../../feature/transactions/transactionsSlice';
import TransferModal from './TransferModal';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils';
import DepositModal from './DepositModal';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti'

import {loadStripe} from '@stripe/stripe-js'
//import Stripe from 'stripe'

const stripePromise  = await loadStripe(process.env.REACT_APP_STRIPE_PK)

const Wallet = () => {


    const backendURL = process.env.REACT_APP_BACKEND_URL
    console.log(`there is ${backendURL}`)
    const publicKey = process.env.REACT_APP_FLW_PK 
    const tx_Ref = `blake_${uuidv4}`;

  const initialState = {
    amount:0,
    sender:'',
    receiver: '',
    description:'',
    status:''
  }

  const initialDepositState = {
    amount:0,
    paymentMethod : ''
  }
  const { user } = useSelector((state) => state?.auth);
  const { transactions,isLoading, message, receiverName} = useSelector((state) => state?.transactions);
//  console.log(`ìsLoading is :  ${isLoading}`)
  const [showTransferModal, setShowTransferModel] = useState(false)
  const [transferData, setTransferData] = useState(initialState)
  const [isVerified, setIsVerified] = useState(false)
  const [depositData, setDepositData] = useState(initialDepositState)
  const {amount, sender, receiver, description, status} = transferData

const {amount:depositAmount, paymentMethod} = depositData
 const [showDepositModal, setShowDepositModal] = useState(false)
  const dispatch= useDispatch()


  const navigate = useNavigate()
  const [URLParams] = useSearchParams()
  const payment = URLParams.get('payment') || ''

  useEffect(()=>{
    if(payment === 'successful'){
        toast.success('Payment Successful')
        setTimeout(()=>{
      navigate('/wallet')
        }, 5000)
    }

    if(payment === 'failed'){
        return toast.error('Payment Failed Try Again')
    }
},[payment, navigate])

  useEffect(()=>{
    dispatch(getUser())
  }, [dispatch])

  
  useEffect(()=>{
  if(message === 'Account verification Successful' ){
      setIsVerified(true)
      dispatch(RESET_TRANSACTION_MESSAGE())
      
    }



    if(message=== 'transaction successful'){
      setTransferData({...initialState})
      setShowTransferModel(false)
      setIsVerified(false)
      dispatch(RESET_RECEIVER())
      dispatch(getTransactions())
    }

  }, [message, dispatch])






  const handleInputChange = (e)=>{
    const {name, value} = e.target;
    setTransferData({...transferData, [name]: value })
 

  }

  const handleAccountChange = (e)=>{
   const {name, value} = e.target;
    setTransferData({...transferData, [name]:value})
    setIsVerified(false)
    dispatch(RESET_TRANSACTION_MESSAGE())
    dispatch(RESET_RECEIVER())

  }
  
const verifyUserAccount = async()=>{
  if(receiver === ''){
    toast.error('please enter an account')
  }

  if(!validateEmail){
    toast.error('Please enter a valid email account')
  }

  const formData = {
    receiver
  }

 await dispatch(verifyAccount(formData))

}

const transferMoney = async()=>{
  if(amount < 1 ){
    return toast.error('Please enter a valid amount')
  }

  if(!description){
    return toast.error('Please enter a description')
  }

  const formData = {
    amount,
    sender : user?.email,
    receiver,
    description,
    status:'success'
  }

  await dispatch(transferFund(formData))
  await dispatch(getUser())

}

const depositMoney = async (e)=>{
  //const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PK)
  const stripe = await stripePromise

   e.preventDefault()
    if(depositAmount< 1){
     return toast.error('Please Enter An Amount  Greater Than Zero')
    }
    if(paymentMethod === ''){
      return toast.error('Please Enter A Payment Method')
    }
  
    if(paymentMethod  === 'stripe'){
axios.post(`${backendURL}/api/transaction/depositFundStripe`, {
  amount:depositAmount
}


).then((res)=>{
  if(res.data.url){
    window.location.href = res.data.url
  }
}).catch((err)=> console.log(err.message))
  
  
 
    }
   

  
}


  






  if(paymentMethod === 'flutterWave'){
 
 // eslint-disable-next-line no-undef
 FlutterwaveCheckout({
    public_key: publicKey,
   
    tx_ref:tx_Ref,
    amount: depositAmount,
    currency: "USD",
    payment_options: "card, banktransfer, ussd",
    redirect_url: `${backendURL}/api/transaction/depositWithFlw`,
   
    customer: {
      email: user.email,
      phone_number:user.phone,
      name: user.name,
    },
    customizations: {
      title: "e-Shop Wallet Deposit",
      description: "Deposit Funds to your E-shop wallet",
      logo: "https://checkout.flutterwave.com/assets/img/rave-logo.png",
    },
   /* callback: function (data){
      console.log("payment callback:", data);
    },
    onclose: function() {
      console.log("Payment cancelled!");
    }*/
  });
  return;




  }




const handleAmountChange = (e)=>{
    const {name, value } = e.target
    setDepositData({...depositData, [name] : value })
}



const handleDepositChange = (e) => {
  const { name, checked } = e.target;
  
  const updatedPaymentMethod = checked ? name : '';
  
  setDepositData({ ...depositData, paymentMethod: updatedPaymentMethod });
};


const closeModal = (e)=>{
  console.log('Event:', e); 
  if( e.target.classList.contains('cm') ){
    setShowTransferModel(false)
    setTransferData({...initialState})
    setDepositData({...initialDepositState})
    setShowDepositModal(false)
  setIsVerified(false)

  }

}


  return (
    <>   
    {payment === 'successful'  && <Confetti/>}
    <Stack
  spacing={2}
 
  
    >
      <Box
      sx={{
        marginTop:'25px'
      }}
      >
      <PageMenu/>
      </Box>
   
    <Stack
 paddingBottom={'40px'}
   sx={{
    overflowX:'scroll',
  
   
   }}
    >

     <Stack
   

   spacing={2}
  // rowGap={'20px'}

    sx={{
  
  padding:'30px',
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
justifyContent:'space-around',
columnGap:'10px',

     '@media(max-width:768px)':{
      display:'flex',
      flexDirection:'column',
      rowGap:'20px'
  


     }  
   }}
        >
      
     
        
   <Paper
   sx={{
    width:'50%',
    height:'auto',
    padding:'10px',
    '@media(max-width:768px)':{
      width:'95%',


    } 
 
   }}
   
   >
    <Typography
    variant='body2'
    component='div'
    sx={{
      
      fontSize:'14px',
      fontWeight:'600',
      '@media(max-width:768px)':{
        fontSize:'12px',


      } 
    }}
    >
      Hello...
    </Typography>
   <Typography
   variant='h6'
   component='div'
   sx={{
    fontSize:'18px',
    fontWeight:'600',
   }}
   >
    {user?.name}
          </Typography>
        < Divider  sx={{
          marginTop:'10px'
        }} />
         <Box
         sx={{
          display:'flex',
          justifyContent:'space-between',
          marginTop:'5px'
         }}
         >
         <Typography
         component={'div'}
         variant='h6'
         sx={{
          whiteSpace:'nowrap',
         // verticalAlign:'middle',
          fontSize:'15px',
         // paddingTop:'10px',
          marginRight:'10px'
         }}
         >
        Account Balance
            </Typography>
            <CardMedia
              component="img"
             src={'./sendPhoto/pay.png'} // Pass the image source
              alt="Image Photo"
              sx={{ width: '150px',  borderRadius: '5px', objectFit: 'contain' 
            }} 
            />
         </Box>
         <Typography
         component='div'
         variant='h6'
         sx={{
          fontWeight:'bold',
          fontSize:'18px',
          color:'brown'
         }}
         >
         ${user?.balance.toFixed(2)  }
         </Typography>


         <Stack
      sx={{
        display:'flex',
     flexDirection:'row',
     
        rowGap:'18px'
      }}
      >
     <Button
     onClick={ ()=> setShowDepositModal(true)}
     variant="contained" 
     endIcon={<SendIcon />}>
        Deposit Money
      </Button>
    
      <Button 
      sx={{
        backgroundColor:'orange',
        marginLeft:'12px'
      }}
      onClick={()=>setShowTransferModel(true)}
      variant="contained" 
      endIcon={<AttachMoneyIcon/>}>
        Transfer
      </Button>
        
      </Stack>
   </Paper>

   <Paper
   
   sx={{
    width:'95%',
   height:'auto',
   padding:'10px',
  
  

   }}
   >
        <Box  
        sx={{
          display:'flex',
          flexDirection:'row',
       //   justifyContent:'space-between'
     
        }}
        >
          <Stack
          
          sx={{
            display:'flex',
            flexDirection:'column',       
          }}
          
          >
      <Stack
     
      direction={'row'}
      sx={{
        alignItems:'center'
      }}
   
      >
           
     <AttachMoneyIcon />
       
       <Typography
       variant='h5'
       component='div'
       sx={{
         color:'#51642a',
         fontWeight:'bold'
          
       }}
       >
      E-shop Wallet
     </Typography>
       </Stack>
       
       <Box
      
 
       sx={{
         //alignItems:'center',
         display:'flex',
         direction:'row',
         justifyContent:'flex-start',
         alignItems:'center',
      
 
       }}
    
       >
        
          <IconButton>
          <RedeemIcon
          
          sx={{
            marginLeft:'-5px'
          }}
          />
          </IconButton>
     
       <Typography
       variant='h5'
       component='div'
       sx={{
         color:'black',
      
          
       }}
       >
        
        
         Cash Back Up to 70%
      </Typography>
       </Box>
        
       <Typography
       component='div'
       variant='body1'
       fontSize={'13px'}
       marginLeft={'10px'}
       >
      use your E-shop wallet at checkout and get up tp 80% cashback
    </Typography>


      </Stack>


        </Box>
        <Box
           sx={{
            display:'flex',
           flexDirection:'row',
            justifyContent:'flex-end',
            alignItems:'flex-end',
            marginLeft:'100px',
            '@media(max-width:768px)':{
              display:'flex',
              flexDirection:'row',
               justifyContent:'flex-start',
               alignItems:'flex-start',
               
              marginLeft:'0px',
            }
          }}
        >
   
       <img
       
       src={'./sendPhoto/play.jpg'}  alt="" />
       
       <img src={'./sendPhoto/app.jpg'}alt="" />
       </Box>
        
   </Paper>
  
      
    </Stack>
  
<Box 
sx={{
  marginLeft:'35px'
}}
>

<Stack>
      {
        user !== null && (
          <WalletsTransaction
          transactions = {transactions}
          user = {user}
          />
        )
      }

      </Stack> 
      <Stack>
      <Stack>
      
     
     {
       showTransferModal && (
         <TransferModal
         transferData={transferData}
         isVerified={isVerified}
         isLoading={isLoading}
         handleInputChange={handleInputChange}
         handleAccountChange={handleAccountChange}
         verifyUserAccount={verifyUserAccount}
         transferMoney = {transferMoney}
         closeModal={closeModal}
         receiverName={receiverName}
             

         />
       )
     }


   </Stack>
   <Stack>
   {
      showDepositModal && (
         <DepositModal
         depositData={depositData}
         closeModal={closeModal}
     depositAmount={depositAmount}
         handleDepositChange={handleDepositChange}
         depositMoney={depositMoney}
       paymentMethod={paymentMethod}
       handleAmountChange={handleAmountChange}
      
         
         
         />

      )
    }
 
   </Stack>

      </Stack>

 
  
</Box>
    </Stack>   
          
   
        </Stack>
        </>
  )
}

export default Wallet

















