


import React, {  useState } from 'react';
import Loader from '../../Loader';
import { useSelector, useDispatch } from 'react-redux';
import {
    Typography,
  
    Stack,
    InputLabel,
    FormControl,
    Select,
    MenuItem
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { updateOrderStatus } from '../../../feature/order/orderSlice';


const ChangeOrderStatus = () => {
    const [status, setStatus] = useState('');
    
    const { isLoading } = useSelector((state) => state?.order);
    const dispatch = useDispatch();

    const {id} = useParams()
   

    const updateOrder = async(e, id) => {
        e.preventDefault();
        const formData = {
            orderStatus: status
        } 
        console.log(formData)
 await  dispatch(updateOrderStatus({id, formData}))
    };

    
 
    return (
        <>
            {isLoading && <Loader/>}

            <Stack
                spacing={2}
                sx={{
                    width: '50%',
                    padding: '40px 0 55px 0',
                    border: '2px solid green',
                    borderRadius: '5px',
                    '@media(max-width:768px)': {
                        width: '65%',
                        marginLeft: '13px',
                        padding: '30px 0 45px 0'
                    }
                }}
            >
                <Stack>
                    <Typography
                        component='subtitle'
                        variant='h5'
                        sx={{
                            textAlign: 'center',
                            color: '#cc6600'
                        }}
                    >
                        Update Status
                    </Typography>
                </Stack>
                <FormControl 
                component={'form'}
                fullWidth onSubmit={(e)=> updateOrder(e, id) }>
                    <InputLabel
                        id="demo-simple-select-label"
                        sx={{
                            fontSize: '13px'
                        }}
                    >
                        status
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="status"
                        onChange={(e) => setStatus(e.target.value)}
                        sx={{
                            width: '96%',
                            height: '40px',
                            margin: '0 5px'
                        }}
                    >
                        <MenuItem disabled value={''}>--choose one--</MenuItem>
                        <MenuItem value={'shipped...'}> Shipped...</MenuItem>
                        <MenuItem value={'Delivered' }>Delivered...</MenuItem>
                        <MenuItem value={'processing...'}>Processing...</MenuItem>
                        <MenuItem value={'Order Placed...'}>Order Placed...</MenuItem>
                    </Select>
                    <button
                        style={{
                            width:'120px',
                            marginTop:'10px',
                            whiteSpace:'nowrap',
                            marginLeft:'10px',
                            height:'40px',
                            backgroundColor:'green',
                            border:'none',
                            borderRadius:'5px',
                            color:'white',
                            cursor:'pointer'
                        }}
                     
                        type='submit'
                    >
                        Update Status
                    </button>
                </FormControl>
            </Stack>
        </>
    );
};

export default ChangeOrderStatus;
