


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../../feature/product/productSlice';
import ProductFilter from '../../product/productFilter/ProductFilter';
import Loader from '../../Loader';
import ProductList from '../../product/ProductList/ProductList';
import { FaCogs } from 'react-icons/fa';
import { Box, Drawer, IconButton, Typography } from '@mui/material';

const Product = () => {
  const { isLoading, products } = useSelector((state) => state?.product);
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f0f0f0', position: 'relative' }}>
          <IconButton onClick={toggleFilter} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaCogs size={22} color='orangered' />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {showFilter ? "Hide Filter" : "Show Filter"}
            </Typography>
          </IconButton>
          <Drawer
            anchor='left'
            open={showFilter}
            onClose={toggleFilter}
            sx={{
              '& .MuiDrawer-paper': {
                width: { xs: '50%', sm: '50%', md: '40%', lg: '30%' },
                padding: '20px',
                border: '2px solid #ccc',
              },
            }}
          >
            {!isLoading && <ProductFilter />}
          </Drawer>
        </Box>
      </Box>
      <Box sx={{ flex: 1, paddingLeft: '10px' }}>
        {isLoading ? <Loader /> : <ProductList products={products} />}
      </Box>
    </Box>
  );
};

export default Product;












