

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Slider} from '@mui/material';
//import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Divider,
  InputLabel,
  ListItem,
  List,
  ListItemText,
  ListItemButton,
  Box,

  Button,
  Stack,
} from '@mui/material';
import {
  FILTER_BY_CAT,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} from '../../../feature/filteredSlice';
import { GET_PRICE_RANGE } from '../../../feature/product/productSlice';

const ProductFilter = () => {
  const { products, minPrice, maxPrice } = useSelector(
    (state) => state?.product
  );
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
 
 const [price, setPrice] = useState([minPrice, maxPrice]);
  const dispatch = useDispatch();



 /* useEffect(() => {
    dispatch(GET_PRICE_RANGE({ products }));
  }, [dispatch, products]);
  console.log(`here is the ${minPrice} and ${maxPrice}`);*/




  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);



useEffect(()=>{
  dispatch(GET_PRICE_RANGE({ products }));
}, [dispatch, products])



  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);



  const filterProductByCat = (cat) => {
    if (cat !== null) {
      setCategory(cat);
      dispatch(FILTER_BY_CAT({ products: products, category: cat }));
    }
  };

 

  const allCategories = [
    'All',
    ...new Set(products?.map((product) => product.category)),
  ];

  const allBrands = [
    'All',
    ...new Set(products?.map((product) => product?.brand)),
  ];

  const handleChange = (e, newValue) => {
    setPrice(newValue);
    
  };
 
 const clearFilter = ()=>{
  setCategory('All')
  setBrand('All')
  setPrice([minPrice, maxPrice])
 }




  return (
    <Box

    >


      <Typography variant="h6" sx={{ my: 2, textAlign: 'center', border: '1px solid black', fontWeight: '400', color: '#986d41' }}>
        Categories
      </Typography>
      <List
      
      
      >
        {allCategories?.map((cat, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => filterProductByCat(cat)}
              aria-label="text alignment"
              selected={`${category}` === cat ? true : false}
              sx={{
                textAlign: 'start',
                border: '1px solid black',
                color: '#92922f',
                fontWeight: 'bold',
              }}
            >
              <ListItemText aria-label="text alignment-item" primary={cat} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box marginBottom="7px">
        <Typography sx={{ my: 2, textAlign: 'center', fontWeight: '600', color: '#986d41' }}>
          All Brands
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Brands</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={brand}
            label="brand"
            onChange={(e) => setBrand(e.target.value)}
          >
            {allBrands?.map((brand, index) => (
              <MenuItem key={index} value={brand} sx={{ border: '1px solid red', fontSize: '14px' }}>
                {brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: 230, '@media(maxWidth:768px)': { width: 175 } }}>

      <Typography sx={{ my: 2, textAlign: 'center', fontWeight: '600', color: '#986d41' }}>
          Price
        </Typography>
        <Slider
       
       marks={[{ value: minPrice,  }, { value: maxPrice, }]}
       step={10}
       value={price}
       valueLabelDisplay="auto"
       min={minPrice}
       max={maxPrice}
       size='small'
       onChange={handleChange}
    
     />
     <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
       <Typography variant="body2" onClick={() => setPrice([minPrice, maxPrice])} sx={{ cursor: 'pointer' }}>
         {minPrice } min
       </Typography>
       <Typography variant="body2" onClick={() => setPrice([maxPrice, maxPrice])} sx={{ cursor: 'pointer' }}>
         {maxPrice} max
       </Typography>
     </Box>
   
       <Stack sx={{marginTop:'10px'}}  alignItems='center'>   
       < Button
      onClick={clearFilter}
      color='info'
      variant='outlined'
       
       sx={{alignItems:'center', 
       display:'flex', 
       justifyContent:'center',
     
      }}
        >
         <Typography  
         sx={{textAlign:'center',
         fontSize:'13px',
         //textAlign:'center',
        
        
        }} >
          Clear Filter
         </Typography>
        </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductFilter;







/*  
    <Slider
       
          marks={[{ value: minPrice, label: minPrice }, { value: maxPrice, label: maxPrice }]}
          step={5}
          value={price}
          valueLabelDisplay="auto"
          min={minPrice}
          max={maxPrice}
          onChange={handleChange}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" onClick={() => setPrice([minPrice, maxPrice])} sx={{ cursor: 'pointer' }}>
            {minPrice} min
          </Typography>
          <Typography variant="body2" onClick={() => setPrice([minPrice, maxPrice])} sx={{ cursor: 'pointer' }}>
            {maxPrice} max
          </Typography>
        </Box>


*/


/* 
     <Slider
        range
        marks={{
          minPrice:`${price[0]}`,
          maxPrice: `${price[1]}`,
        }}
         min={minPrice}
         max={maxPrice}
         defaultValue={[minPrice, maxPrice]}
         tipFormatter={(value)=> `$${value}`}
         tipsProps={{
          placement:'top',
          visible:true
         }}
        
        value={price}
        onChange={handleChange}
        />
*/