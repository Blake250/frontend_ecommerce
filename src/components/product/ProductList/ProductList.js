

import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { BsFill0CircleFill } from 'react-icons/bs';
import { FaListAlt } from 'react-icons/fa';
import Search from '../../search/Search';
import ProductItem from '../productItem/ProductItem';
import styles from "./ProductList.module.scss"
import { useSelector, useDispatch } from 'react-redux';
import { FILTER_SEARCH, SORT_PRODUCT } from '../../../feature/filteredSlice';
import Pagination from '../../numPaginate/numPage';
import { Stack, Box } from '@mui/material';



const ProductList = ({ products }) => {
  const {filteredProducts} = useSelector((state)=> state?.filter)
 
const dispatch = useDispatch()
  const [grid, setGrid] = useState(false) 
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')

  const containerRef = useRef(null);


  useEffect(()=>{
    dispatch(SORT_PRODUCT({ products, sort}))
  }, [dispatch, products , sort])


useEffect(() => {
    dispatch(FILTER_SEARCH({ products, search }));

  }, [dispatch,products,  search]);


 


 /*useEffect(() => {
    adjustContainerHeight();
    window.addEventListener('resize', adjustContainerHeight);
    return () => {
      window.removeEventListener('resize', adjustContainerHeight);
    };
  }, [filteredProducts, grid]);




  const adjustContainerHeight = () => {
    const count = filteredProducts?.length || 0;
    let minHeight;
    if (grid) {
      minHeight = count * 12 + 30; 
    } else {
      
      minHeight = count * 28 + 40; 
      
      if (window.innerWidth <= 900) {
        minHeight = count * 26+ 35; 
      }
      else{
        //minHeight = count * 71 + 100; 
      }
    }
    containerRef.current.style.height = `${minHeight}vh`;
  };*/
  

//Begin Paginate

const  itemsPerPage = 9
const [itemOffset, setItemOffset] = useState(0);


  const endOffset = itemOffset + itemsPerPage;
  
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);


  /*const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    console.log(

    );
    setItemOffset(newOffset);
  };*/

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };
  


//END Paginate

  









  return (
    <Container
  
    
  //  ref={containerRef}
   >  
    <ListContainer  >
      <div className="top">
        <div className="icons">
          <BsFill0CircleFill 
          size={22}
           color='orangered'
           onClick={()=> setGrid(true)}
           />

          <FaListAlt
           size={22}
           color='#0066d4' 
           onClick={()=> setGrid(false)}
           />
       
        </div>
        <div className="textStyle">
        <p ><b>{currentItems?.length}</b> Products Found</p>
        </div>
        <SearchBar  
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        > 
        <Search />
        </SearchBar>
        

        <SelectOption>  
            <select
             value={sort} 
             onChange={(e)=> setSort(e.target.value)} >
                <label htmlFor="">Sort By:</label>
      <option value="latest">Latest</option>
      <option value="lowest-price">Lowest Price</option>
      <option value="highest-price">Highest Price</option>
      <option value="a-z">A-Z</option>
      <option value="z-a">Z-A</option>
            </select>
            </SelectOption>
      </div>
  
    </ListContainer>
    <DisplayContainer   >

<div   className={grid ? `${styles.grid}` : `${styles.list}` }>
  {
    currentItems && currentItems?.length === 0 ?
    (  <p>No Products Found</p>  ) : (

      currentItems?.map((product)=>{
        return(
          <div  key={product._id}>
         <ProductItem
           {...product} 
           grid={grid} 
           product={product}  />
          </div>
        )
      })
    )
  }

</div>
<Box
  sx={{
    marginTop: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    left: 0, 
    bottom: 0, 
    width: '100%',
    backgroundColor: '#fff', 
    padding: '20px', 
    borderTop: '1px solid #e0e0e0', 
  }}
>
  <Pagination
    itemsPerPage={itemsPerPage}
    pageCount={pageCount}
    handlePageClick={handlePageClick}
    itemOffset={itemOffset}
    setItemOffset={setItemOffset}
  />
</Box>

</DisplayContainer>

    </Container>
  );
};

export default ProductList;





const Container = styled.div`
width:100%;


padding-bottom:200px !important;
`

const DisplayContainer = styled.div`
//display:flex;

width: 100%;
  display: flex;
  flex-wrap: wrap;
 justify-content: space-between;
`



const SelectOption = styled.div`
margin-right:20px;

select{
  //  display:none;
    margin-right:0px;
    border:none;
    outline:none;
  
  }

@media  (max-width:768px) {
  select{
  //  display:none;
    margin-right:0px;
 
  
  }
       
        }

`


const SearchBar = styled.div`
margin-left:80px;
@media  (max-width:768px) {
  margin-left:0px !important;
       
        }

`



const ListContainer = styled.div`
  width: 100%;
  display:flex;

  .top {
    width: 100%;
 padding:10px 0;
    border-bottom: 2px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media  (max-width:768px) {
    width: 100%;
    border-bottom: 2px solid #ccc;
   
      
    }
    .icons {
     
      div{
        display: flex;
   flex-direction:column;
      justify-content: center;
      align-items: center;  
    
      }

      
      & > * {
        margin-right: 7px;
        cursor: pointer;
      }
    }

    
    .textStyle{
      p{
      font-size:16px;
white-space:nowrap ;
font-weight:600 !important;
      }

      @media  (max-width:768px) {
         p{

          font-size:13px;
        white-space:wrap !important ;
          font-weight:600;
         }
        }

    }
        
    .sort {
      label {
        font-size: 1.4rem;
        font-weight: 500;
        margin: 0 5px;
      }
      select {
        font-size: 1.6rem;
        font-weight: 300;
        border: none;
        outline: none;
      }
    }
  }

`;

















/*const ProductList = ({products}) => {
  return (
    <Container>
        <Contain>
      <div>  
        <span>
        <BsFill0CircleFill
      
        color='orangered'
        />

      <FaListAlt
       
        color='orangered'
        />
       </span>
       <span> {products?.length} Products Found</span>
       </div>
   
     <SearchBar>
     <Search/>
         </SearchBar>
         <SelectOption>
            <select >
                <label htmlFor="">Sort By:</label>
      <option value="latest">Latest</option>
      <option value="lowest-price">Lowest Price</option>
      <option value="highest-price">Highest Price</option>
      <option value="a-z">A-Z</option>
      <option value="z-a">Z-A</option>
            </select>
         </SelectOption>
       
        </Contain>
    
      
    
        </Container>
  )
}

export default ProductList


const MiddleContainer = styled.div`
@media (max-width:768px) {
    div{
        svg{
    padding:0 2px;

 }   
 span{
    font-size:13px !important;
    
  }

    }
}

div{
   display:flex;
  align-items:center;
  //margin-top:2px;

  span{
    font-size:15px;
    font-weight:bold;
    white-space:nowrap;
  }
 svg{
    padding:0 2px;

 }   
}

`
const SelectOption = styled.div`

margin-left:14rem;
@media (max-width:768px){
    margin-left:2rem !important;
        
    

}

`

const SearchBar = styled.div`
display:flex;
justify-content:flex-end;
@media (max-width:768px) {
 display:none !important;
}

`

const Container = styled.div`
@media (max-width:768px) {
    div{
        svg{
    padding:0 2px;

 }   
 span{
    font-size:13px !important;
    
  }

    }
}

div{
   display:flex;
  align-items:center;
  //margin-top:2px;

  span{
    font-size:15px;
    font-weight:bold;
    white-space:nowrap;
  }
 svg{
    padding:0 2px;

 }   
}
`



const Contain = styled.div`
flex:0.6;
display:flex;

@media (max-width:768px) {
  
    div{
font-size:22px !important ;
margin-left:-15px;
span{
   padding-bottom:-16px  !important;
}

}
}

div{
font-size:28px;
display:flex ;
flex-direction:column;
}
`*/