
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSingleProduct } from '../../../feature/product/productSlice';
import Loader from '../../Loader';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';

import ProductRatings from '../productRatings/ProductRatings';
import { calAverageRating } from '../../utils';
import { ADD_TO_CART, DECREASE_CART } from '../../../feature/cart/cartSlice';
//import { DECREASE_CART } from '../../../feature/cart/cartSlice';
import { saveCartDB } from '../../../feature/cart/cartSlice';
import { 
  Card, 
  CardMedia,
  Typography,
  Button, 
  Grid,
  Paper,
  Box,
  Divider,
  Stack,
  List, 
  ListItem, 

  ListItemButton,
  
} from '@mui/material';
import { addToWishlist } from '../../../redux/slice/authSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const { cartItems} = useSelector((state)=> state?.cart)
  const { isLoading, product } = useSelector((state) => state?.product);
  
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const slideLength = product?.image?.length || 0;
    console.log(`here is the the slide of ${slideLength}`)
    let slideInterval;
  
    if (slideLength > 1) {
      slideInterval = setInterval(() => {
        const nextIndex = imageIndex === slideLength - 1 ? 0 : imageIndex + 1;
        setImageIndex(nextIndex);
      }, 3000);
    }
  
    return () => clearInterval(slideInterval);
  }, [imageIndex, product]);


  const addToCart = (product)=>{
    dispatch(ADD_TO_CART(product))
    dispatch(saveCartDB({cartItems: JSON.parse(localStorage.getItem('cartItems')) }))
  }

  const decreaseCart = (product)=>{
    dispatch(DECREASE_CART(product))
    dispatch(saveCartDB({cartItems: JSON.parse(localStorage.getItem('cartItems')) }))
  }


  const aDDToWishList = async()=>{
    const productData = {
      productID: product._id
    }

    await dispatch(addToWishlist(productData)  )
  }

  useEffect(() => {
    if (id !== 0) {
      dispatch(getSingleProduct(id));
    } else {
      toast.error(`Invalid product ID: ${id}`);
    }
  }, [dispatch, id]);


     
  const style = {
    color:'#cc3300',
    fontWeight:'400',
    fontSize:'14px'
  }
  const textStyle = {
    fontWeight:'600',
    fontSize:'14px'
  }
  const styleBtn = {
    display: 'flex', 
    justifyContent:'space-between'

  }


  const cart = cartItems.find((item) => item._id === id)

  const isCartAdded = cartItems.findIndex((item) => item._id === id )
  const averageRating = calAverageRating(product?.ratings)

  if (isLoading) {
    return <Loader />;
  }



  // If product is not loaded yet or doesn't exist, display a message
  if (!product) {
    return <Typography variant="h5">Product not found</Typography>;
  }

 


  return (
    <Box  sx={{ marginBottom: '100px' }} width="100%" >
      <Stack >
        <Paper elevation={0} padding  > 
        <Typography color='info' variant='h5' component='p'sx={{margin:'25px',}}>
          Product Details
          <Typography variant='body2' component='p' >
          <Link style={{ textDecoration: 'none', 
         }}
           to='/shop'> &larr; Back To Home </Link>
          </Typography>
        </Typography>
        </Paper>
      </Stack>
      <Grid  container  spacing={3}>
        <Grid  item xs={12} sm={6}>
          <Card
          
          
          sx={{
              
          }
      
          }
          >
            <CardMedia
              component="img"
              image={product?.image[imageIndex] }
              alt={product?.name}
             
              sx={{
                width: '100%',
                objectFit: 'cover',
                height: '75vh',
                minHeight: 300,
              //  margin: '8px',
                '@media(max-width:768px)': {
                  height: '80vh!important',
                }
              }}
            />
            <Stack 
        
            sx={{
               display: 'flex',
             flexDirection: 'row' ,
          
      //       // paddingBottom: '16px !important',
      //       flexWrap: 'wrap', // Ensure images wrap to the next line if needed
      // gap: '8px !important', // Add spacing between images
      // paddingBottom: '16px', // Add padding at the bottom of the stack
            

               
                  }}>
              {product?.image && product?.image?.length > 1 && product?.image?.map((img, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image={img}
                  onClick={() => setImageIndex(index)}
                  width="100px"
                  height="100px"
                  
                //  className={`${styles.pImg}`}
                 

                  sx={{
                    borderRadius: '3px',
                    margin: '8px',
                    animation: 'slide 0.5s forwards',
                  //  marginBottom: '16px',
                  

                    border: imageIndex === index ? '2px solid red' : 'none'
                  }}
                />
              ))}
            </Stack>

          </Card>
        </Grid>
        
        <Grid  spacing={3} item xs={12} sm={6}  >
          <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <List >
             
            <ListItem>
              
              <ListItemButton sx={{
                 display:'flex',
                 flexDirection:'column',
                 flexWrap:'nowrap',
                 alignItems:'flex-start'


              }} >
                                        
                       
                <Typography
               sx={{
                  fontSize:'1.5rem',
                  fontWeight:'200',
                  whiteSpace:'nowrap'
                  
               }}
                >
               {product?.name}
              
                </Typography>

                <Typography  
                 
                >
               
               <ProductRatings 
               averageRating={averageRating} 
               noRatings={product?.ratings?.length} />
             
                </Typography>     
                 
              </ListItemButton>
            </ListItem>
            <Divider component="li" />


              <ListItem>
                <ListItemButton sx={styleBtn} >
                                          
                         
                  <Typography
                 sx={textStyle}
                  >
                   brand :
                  </Typography>

                  <Typography  
                   sx={style}
                  >
                   {product?.brand}
                  </Typography>     
                   
                </ListItemButton>
              </ListItem>
              <Divider component="li" />
              <ListItem>
              <ListItemButton sx={styleBtn} >
                                          
                         
                  <Typography
                  sx={textStyle}> 
                 
                  
                   SKU :
                   </Typography>
                  <Typography  
                   sx={style}
                  >
                  {product?.sku}
                  </Typography>     
                   
                </ListItemButton>
              </ListItem>
              <Divider component="li" />
              <ListItem>
              <ListItemButton sx={styleBtn} >
                                          
                         
            <Typography
            sx={textStyle}
                 >
               Category : 
             </Typography>
               <Typography  
             sx={style}
              >
              {product?.category}
             </Typography>     
            </ListItemButton>
            </ListItem>
            <Divider component='li' />
            <ListItem>
              
                <ListItemButton sx={styleBtn} >
                                          
                         
                  <Typography
                 sx={textStyle}
                  >
                 Color :
                  </Typography>

                  <Typography  
                   sx={style}
                  >
                   {product?.color}
                  </Typography>     
                   
                </ListItemButton  >
              </ListItem>
              <Divider component="li" />

         
            <ListItem>
              
              <ListItemButton sx={styleBtn} >
                                        
                       
                <Typography
               sx={textStyle}
                >
                 Price:
                </Typography>

                <Typography  
                 sx={style}
                >
                 ${product?.price}
                </Typography>     
                 
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
            <ListItem>
              
              <ListItemButton sx={styleBtn} >
                                        
                       
                <Typography
               sx={textStyle}
                >
              Quantity in stock : 
                </Typography>

                <Typography  
                 sx={style}
                >
                  {product?.quantity}
                </Typography>     
                 
              </ListItemButton>
            </ListItem>
            <Divider component="li" />


            <ListItem>
              
              <ListItemButton sx={styleBtn} >
                                        
                       
                <Typography
               sx={textStyle}
                >
              Sold:
                </Typography>

                <Typography  
                 sx={style}
                >
                 {product?.sold}
                </Typography>     
                 
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
      

                     <Stack   sx={{
                         display:'flex',
                        justifyContent:'flex-end',
                          alignItems:'center',
                          flexDirection:'row',
                          padding:'15px',
                          flexGrow:'1'
                         // marginRight:'10px'

                     }} >  






<Box sx={{ position: 'relative',  flexWrap: 'nowrap', display:'flex',
                 }}>

           
              <Box
                sx={{
              
                  position: 'absolute',
                  top: '-25px', 
               
                 
                  right:'0',
                  transform: 'translateX(-72%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  backgroundColor: 'white', 
                  padding: '10px', 
                  borderRadius: '5px',
                  '@media (max-width:768px)':{
                       left:'-5rem',
                      
                  }
                 
                }}
              >
                {isCartAdded < 0 ? null : (    
                    <>    
<Button 
onClick={()=> decreaseCart(product) }
variant="outlined" 
size="small"
sx={{
  '@media (max-width:768px)':{
   display:'none'
   
}
}}
>-</Button>
  <Typography color='red' sx={{fontSize:'13px', fontWeight:'400'}} >{cart?.cartQuantity} </Typography>
<Button
onClick={()=> addToCart(product) }
 variant="outlined" 
 size="small"
 
 sx={{
  '@media (max-width:768px)':{
   display:'none'
   
}
}}
 >
  +
  </Button>

                    </>

                   ) }

            

              </Box>
            </Box>








     { product &&  product?.quantity > 0 ?

(    
<Box padding={'5px'} sx={{whiteSpace:'nowrap' }} >
<Typography >
 <Button 
 onClick={()=> addToCart(product) }
 variant='contained' 
 color='primary'
 sx={{ "&:hover": { backgroundColor: "blue", } }}
  >
     ADD TO CART
     </Button>

 </Typography> 
</Box>
 
 )  :

(        
  
<Box sx={{whiteSpace:'nowrap ' , fontSize:'12px',}}  >

<Typography >
<Button 
 onClick={()=> alert('Product is Out of Stock')}
variant='contained' 
color='warning'

size='medium'
sx={{
  marginRight:'10px',
  "&:hover": {backgroundColor: "orange", paddingLeft:'-20px' } }}
 >
OUT OF STOCK
</Button>

</Typography>  
</Box>  )

}
                                        
            
         

                      <Typography >
                   <Button 
                   onClick={ ()=> aDDToWishList(product)}
                   variant='contained'
                   sx={{ "&:hover": { backgroundColor: "orange" } }} 
                   color='success'>
                ADD TO WISHLIST
                   </Button>
               
                </Typography>                 
                </Stack>
              
            <Divider component="li" />


                                              
         
            </List>

               <Stack  sx={{marginTop:'40px',maxWidth:'96%', fontWeight:'600',padding:'5px', fontSize:'12px' }} > 
                   
              <Typography component='p'   variant="body2" sx={{fontSize: '12px', fontWeight:'600',textAlign:'center' }} gutterBottom>Product Description:</Typography>
              <Typography variant="h5"sx={{textAlign:'center'}} color="textSecondary" gutterBottom>KEY FEATURES</Typography>
              <Typography variant="body2" sx={{ color: '#800000', width: '95%', fontWeight: '400',  }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description) }} />
              <Stack sx={{ justifyContent: 'center', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>

                </Box>
               
              </Stack>
              </Stack>
      
         



          </Paper>
        
        </Grid>
        <Stack  variant='outlined' width='100%'  sx={{marginLeft:'25px'}} >
      <Paper>
      <h3>Product Review</h3>
      </Paper>
        </Stack>
      </Grid>
    </Box>
  );
};

export default ProductDetails;






















