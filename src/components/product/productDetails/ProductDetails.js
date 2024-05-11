
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
  ListItemText,
  ListItemButton,
  
} from '@mui/material';

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
          <Card>
            <CardMedia
              component="img"
              image={product?.image[imageIndex] }
              alt={product?.name}
             
              sx={{
                width: '100%',
                objectFit: 'cover',
                height: '75vh',
                minHeight: 300,
                '@media(max-width:768px)': {
                  height: '80vh!important',
                }
              }}
            />
            <Stack sx={{
               display: 'flex',
             flexDirection: 'row' ,


               
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
>-</Button>
  <Typography color='red' sx={{fontSize:'13px', fontWeight:'400'}} >{cart?.cartQuantity} </Typography>
<Button
onClick={()=> addToCart(product) }
 variant="outlined" 
 size="small">
  +
  </Button>

                    </>

                   ) }

            

              </Box>
            </Box>








     {  product && product?.quantity > 0 ?

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
size='small'
sx={{ "&:hover": {backgroundColor: "orange", paddingLeft:'-20px' } }}
 >
OUT OF STOCK
</Button>

</Typography>  
</Box>  )

}
                                        
            
         

                      <Typography >
                   <Button 
                   variant='contained'
                   sx={{ "&:hover": { backgroundColor: "orange" } }} 
                   color='warning'>
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

























/*import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSingleProduct } from '../../../feature/product/productSlice';
import Loader from '../../Loader';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';



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
  List, ListItem, ListItemText,ListItemButton
} from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams();
  const { isLoading, product } = useSelector((state) => state?.product);
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useDispatch();



  useEffect(() => {
    const slideLength = product?.image?.length || 0;
    let slideInterval;
  
    if (slideLength > 1) {
      slideInterval = setInterval(() => {
        const nextIndex = imageIndex === slideLength - 1 ? 0 : imageIndex + 1;
        setImageIndex(nextIndex);
      }, 3000);
    }
  
    return () => clearInterval(slideInterval);
  }, [imageIndex, product]);
  




  useEffect(() => {
    if (id !== 0) {
      dispatch(getSingleProduct(id));
    } else {
      toast.error(`Invalid product ID: ${id}`);
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader />;
  }

  // If product is not loaded yet or doesn't exist, display a message
  if (!product) {
    return <Typography variant="h5">Product not found</Typography>;
  }



  const style = {
    p: 0,
    width: '98%',
   // maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  };
  

  
  


  
  return (
    <Box sx={{ padding: '8px',
    marginBottom: '40px' ,


 }}  width="100%"   >
      <Grid container
       height='150vh'
     
        spacing={2}
        sx={{ 
              '@media(max-width:768px) ':{
               height:'300vh!important',
              }    
             }}
    
        >
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              image={product?.image[imageIndex]}
              alt={product?.name}
              sx={{
                width: '100%',
                objectFit: 'cover',
                height:'75vh',
                minHeight: 300,
                '@media(max-width:768px) ':{
                  height:'100vh!important',
                }    
              }}
            />
          
            
          <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
              {product?.image && product?.image?.length > 1 && product?.image?.map((img, index) => (
              
                <CardMedia
                  key={index}
                  component="img"
                  image={img}
                  onClick={() => setImageIndex(index)}
                  width="100px"
                  height="100px"
                  
                  sx={{
                    borderRadius: '3px',
                    margin: '8px',
                 
                    border: imageIndex === index ? '2px solid red' : 'none'
                  
                  }}
                />
                
              ))}
            </Stack>
          
          </Card>
        </Grid>
    
  
       
        <Grid
      sx={{
    
    
    }}
     item xs={12} sm={6}
        >
          <Stack>
            <Paper>
            <List sx={style} aria-label="mailbox folders">
      <ListItem>
        <ListItemText primary="Inbox" />
      </ListItem>
      <Divider  component="li" />
      <ListItem>
        <ListItemText primary="Drafts" />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Trash" />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Spam" />
      </ListItem>
    </List>

            </Paper>
          </Stack>
       
          </Grid>


        <Grid width='100%' //height='100%'
         item xs={12} sm={6}>
          <Stack>
          
           

          
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography  sx={{
              textAlign:'center',
            }}  variant="h5" gutterBottom>{product?.name}</Typography>
            <Typography  sx={{textAlign:'center'}} variant="subtitle1" color="textSecondary" gutterBottom>{product?.category}</Typography>
           
            <Typography  sx={{
              color:'#800000' ,
              width:'95%',
              fontWeight:'600',
              fontStyle:'italic,',
            
            }} dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(product?.description)  }}  />
           <Stack sx={{justifyContent:'center', flexDirection:'column', }} >
           <Typography  sx={{
              color:'#800000' ,
            // textAlign:'center',
            
              fontWeight:'400',
               }}>    </Typography>
               <Box  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',   mt: 2,  }}>
               <Typography variant="h6" sx={{color:'blue', fontWeight:'600', }} gutterBottom>Price: ${product?.price}</Typography>
               <Button variant="contained" color="primary">Add to Cart</Button>
               <Link style={{
                textDecoration:'none',
                marginTop: '8px' 
               }}  to='/shop' >
             &larr;Back To Home
               </Link>
             </Box>
           </Stack>
          </Paper>
          </Stack>
        </Grid>
       
      </Grid>
    </Box>
  );
};

export default ProductDetails;*/
























































/*import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSingleProduct } from '../../../feature/product/productSlice';
import Loader from '../../Loader';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';

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
  ListItemText
} from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams();
  const { isLoading, product } = useSelector((state) => state?.product);
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const slideLength = product?.image?.length || 0;
    let slideInterval;
  
    if (slideLength > 1) {
      slideInterval = setInterval(() => {
        const nextIndex = imageIndex === slideLength - 1 ? 0 : imageIndex + 1;
        setImageIndex(nextIndex);
      }, 3000);
    }
  
    return () => clearInterval(slideInterval);
  }, [imageIndex, product]);

  useEffect(() => {
    if (id !== 0) {
      dispatch(getSingleProduct(id));
    } else {
      toast.error(`Invalid product ID: ${id}`);
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader />;
  }

  // If product is not loaded yet or doesn't exist, display a message
  if (!product) {
    return <Typography variant="h5">Product not found</Typography>;
  }

  return (
    <Box sx={{ padding: '8px', marginBottom: '40px' }} width="100%">
      <Grid     container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              image={product?.image[imageIndex]}
              alt={product?.name}
              sx={{
                width: '100%',
                objectFit: 'cover',
                height: '75vh',
                minHeight: 300,
                '@media(max-width:768px)': {
                  height: '100vh!important',
                }
              }}
            />
            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
              {product?.image && product?.image?.length > 1 && product?.image?.map((img, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image={img}
                  onClick={() => setImageIndex(index)}
                  width="100px"
                  height="100px"
                  sx={{
                    borderRadius: '3px',
                    margin: '8px',
                    border: imageIndex === index ? '2px solid red' : 'none'
                  }}
                />
              ))}
            </Stack>
          </Card>
        </Grid>
    
        <Grid  item xs={12} sm={6}  >
          <Paper sx={{ padding: 2, height:'30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <List sx={{ p: 0 }}>
              <ListItem>
                <ListItemText primary="Inbox" />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="Drafts" />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="Trash" />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="Spam" />
              </ListItem>
            </List>

            <Stack  sx={{marginTop:'60px', }} >
               <Paper>
              <Typography variant="h5" gutterBottom>{product?.name}</Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>{product?.category}</Typography>
              <Typography sx={{ color: '#800000', width: '95%', fontWeight: '600', fontStyle: 'italic' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description) }} />
              <Stack sx={{ justifyContent: 'center', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                  <Typography variant="h6" sx={{ color: 'blue', fontWeight: '600' }} gutterBottom>Price: ${product?.price}</Typography>
                  <Button variant="contained" color="primary">Add to Cart</Button>
                  <Link style={{ textDecoration: 'none', marginTop: '8px' }} to='/shop'> &larr; Back To Home </Link>
                </Box>
              </Stack>
              </Paper>
                 
      
      </Stack>
      
         



          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;*/

























/*import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSingleProduct } from '../../../feature/product/productSlice';
import Loader from '../../Loader';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';



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
  List, ListItem, ListItemText,ListItemButton
} from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams();
  const { isLoading, product } = useSelector((state) => state?.product);
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useDispatch();



  useEffect(() => {
    const slideLength = product?.image?.length || 0;
    let slideInterval;
  
    if (slideLength > 1) {
      slideInterval = setInterval(() => {
        const nextIndex = imageIndex === slideLength - 1 ? 0 : imageIndex + 1;
        setImageIndex(nextIndex);
      }, 3000);
    }
  
    return () => clearInterval(slideInterval);
  }, [imageIndex, product]);
  




  useEffect(() => {
    if (id !== 0) {
      dispatch(getSingleProduct(id));
    } else {
      toast.error(`Invalid product ID: ${id}`);
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader />;
  }

  // If product is not loaded yet or doesn't exist, display a message
  if (!product) {
    return <Typography variant="h5">Product not found</Typography>;
  }



  const style = {
    p: 0,
    width: '98%',
   // maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  };
  

  
  


  
  return (
    <Box sx={{ padding: '8px',
    marginBottom: '40px' ,


 }}  width="100%"   >
      <Grid container
       height='150vh'
     
        spacing={2}
        sx={{ 
              '@media(max-width:768px) ':{
               height:'300vh!important',
              }    
             }}
    
        >
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              image={product?.image[imageIndex]}
              alt={product?.name}
              sx={{
                width: '100%',
                objectFit: 'cover',
                height:'75vh',
                minHeight: 300,
                '@media(max-width:768px) ':{
                  height:'100vh!important',
                }    
              }}
            />
          
            
          <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
              {product?.image && product?.image?.length > 1 && product?.image?.map((img, index) => (
              
                <CardMedia
                  key={index}
                  component="img"
                  image={img}
                  onClick={() => setImageIndex(index)}
                  width="100px"
                  height="100px"
                  
                  sx={{
                    borderRadius: '3px',
                    margin: '8px',
                 
                    border: imageIndex === index ? '2px solid red' : 'none'
                  
                  }}
                />
                
              ))}
            </Stack>
          
          </Card>
        </Grid>
    
  
       
        <Grid
      sx={{
    
    
    }}
     item xs={12} sm={6}
        >
          <Stack>
            <Paper>
            <List sx={style} aria-label="mailbox folders">
      <ListItem>
        <ListItemText primary="Inbox" />
      </ListItem>
      <Divider  component="li" />
      <ListItem>
        <ListItemText primary="Drafts" />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Trash" />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Spam" />
      </ListItem>
    </List>

            </Paper>
          </Stack>
       
          </Grid>


        <Grid width='100%' //height='100%'
         item xs={12} sm={6}>
          <Stack>
          
           

          
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography  sx={{
              textAlign:'center',
            }}  variant="h5" gutterBottom>{product?.name}</Typography>
            <Typography  sx={{textAlign:'center'}} variant="subtitle1" color="textSecondary" gutterBottom>{product?.category}</Typography>
           
            <Typography  sx={{
              color:'#800000' ,
              width:'95%',
              fontWeight:'600',
              fontStyle:'italic,',
            
            }} dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(product?.description)  }}  />
           <Stack sx={{justifyContent:'center', flexDirection:'column', }} >
           <Typography  sx={{
              color:'#800000' ,
            // textAlign:'center',
            
              fontWeight:'400',
               }}>    </Typography>
               <Box  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',   mt: 2,  }}>
               <Typography variant="h6" sx={{color:'blue', fontWeight:'600', }} gutterBottom>Price: ${product?.price}</Typography>
               <Button variant="contained" color="primary">Add to Cart</Button>
               <Link style={{
                textDecoration:'none',
                marginTop: '8px' 
               }}  to='/shop' >
             &larr;Back To Home
               </Link>
             </Box>
           </Stack>
          </Paper>
          </Stack>
        </Grid>
       
      </Grid>
    </Box>
  );
};

export default ProductDetails;*/































