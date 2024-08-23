


import React, { useEffect, useState } from 'react';
import PageMenu from '../PageMenu';
import styled from 'styled-components';
import Loader from '../../Loader';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Box, Typography, IconButton, ButtonGroup, Button } from '@mui/material';
import ProductItem from '../../product/productItem/ProductItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getWishList, removeFromWishList } from '../../../redux/slice/authSlice';

const Wishlist = () => {
  const { wishlist = [], isLoading } = useSelector((state) => state?.auth);
  const [grid, setGrid] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch]);

  const removeWishList = async (product) => {
    const productID = product._id;
    await dispatch(removeFromWishList(productID));
    await dispatch(getWishList());
  };

  return (
    <Container>
      {isLoading && <Loader />}
      <Contain>
        <PageMenu />
        <Header>
          <h2>My WishList</h2>
          <ButtonGroup variant="contained" sx={{ marginLeft: 'auto' }}>
            <Button onClick={() => setGrid(false)}>List View</Button>
            <Button onClick={() => setGrid(true)}>Grid View</Button>
          </ButtonGroup>
        </Header>

        <Divider />

        <Box sx={grid ? gridStyle : listStyle}>
          {wishlist.length === 0 ? (
            <Typography component="div" variant="h6" sx={{ textAlign: 'center' }}>
              No Product Found In the Wishlist
            </Typography>
          ) : (
            Array.isArray(wishlist) &&
            wishlist.map((product) => (
              <ProductWrapper key={product._id} grid={grid}>
                <ProductItem {...product} grid={grid} product={product} />
                <IconButton
                  onClick={() => removeWishList(product)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'red',
                    marginTop: '10px',
                    padding : '15px',
                    '@media (min-width: 768px)': {
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                    },
                  }}
                >
                  <FavoriteIcon />
                  <Typography component="div" variant="body1" sx={{ paddingLeft: '10px' }}>
                    Remove From Wishlist
                  </Typography>
                </IconButton>
              </ProductWrapper>
            ))
          )}
        </Box>
      </Contain>
    </Container>
  );
};

export default Wishlist;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    height: 60%;
  }
`;

const Contain = styled.div`
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  position: relative;

  h2 {
    padding-left: 20px;
    animation: slide-down 0.5s ease-in-out;
  }

  @media (max-width: 768px) {
    h2 {
      padding-left: 0 !important;
      text-align: center;
    }
  }
`;

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)', 
  gap: '2px',

  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr) !important',
  },
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
};

const ProductWrapper = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.grid ? 'column' : 'row')}; 
  align-items: ${(props) => (props.grid ? 'center' : 'flex-start')}; 
  width: ${(props) => (props.grid ? 'auto' : '100%')}; 
  padding: 5px;

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: center; 
  }

  img {
    margin-bottom: 16px; 
  }
`;














