import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct } from '../../../feature/product/productSlice';
import Search from '../../search/Search';
import { AiOutlineEye } from 'react-icons/ai';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Loader from '../../Loader';
import { shortenText } from '../../utils';

import Pagination from '../../numPaginate/numPage';
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert module
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { Link } from 'react-router-dom';

const ViewProducts = ({setTotal,total}) => {
  const [search, setSearch] = useState("");
  const { isLoggedIn } = useSelector((state) => state?.auth);
  const { products, isLoading } = useSelector((state) => state?.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
   dispatch(getProducts());
  
    }
  }, [isLoggedIn, dispatch]);



 



  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Product',
      message: 'Are you sure you want to do this Product?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => {
            delProduct(id)
            console.log('User clicked Yes');
          }
        },
        {
          label: 'cancel',
         /* onClick: () => {
            // Your action here
            console.log('User clicked No');
          }*/
        }
      ]
    });
  
  }

  const delProduct = async(id)=>{
    await dispatch(deleteProduct(id))
    await dispatch(getProducts())
  }





//Begin Paginate

const  itemsPerPage = 5
const [itemOffset, setItemOffset] = useState(0);


  const endOffset = itemOffset + itemsPerPage;
  
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    console.log(

    );
    setItemOffset(newOffset);
  };


//END Paginate




  return (
    <Container>
      <Header>
        <HeaderText>
          All Products 
          <br />
        ~ <span>{products.length}Products Found </span>

        </HeaderText>
         
        <SearchContainer>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </SearchContainer>
      </Header>
      {isLoading && <Loader />}
      <ProductList>
        {!isLoading && products?.length === 0 ? (
          <NoProductFound>No products found</NoProductFound>
    ) : (
          <Table>
            <thead>
              <TableRow>

                <TableHeader >SN</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Price</TableHeader>
                <TableHeader>Qty</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </thead>
            <tbody>
            {currentItems?.length !==0 && currentItems?.map((product, index) => (
                  <TableRow key={product._id}>
                  <TableData>{index + 1}</TableData>
                  <TableData>{ shortenText( product.name, 4) }</TableData>
                  <TableData> { shortenText( product?.category, 4) }</TableData>
                  <TableData>{"$" +product?.quantity + product.price}</TableData>
                  <TableData>{product.quantity}</TableData>
                  <ActionIcons>

                    <Link to={"/"} > 
                    <AiOutlineEye color='blue' />
                    </Link>
                    <Link to={`/admin/edit-product/${product?._id}`} > 
                    <FaEdit color='#333300' />
                    </Link> 
                    <FaTrashAlt    color='red' onClick={()=> confirmDelete(product._id)}/>
                  </ActionIcons   >
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
  
      </ProductList>
      <Pagination
   itemsPerPage={itemsPerPage}
   pageCount ={pageCount}
   handlePageClick={ handlePageClick}
   itemOffset={itemOffset}
   setItemOffset={setItemOffset}
   
   
   />

    </Container>


  );
};
export default ViewProducts;


















const Container = styled.div`
  width: 100%;
  padding: 30px;
  @media(max-width:768px){
    width: 100%;
    //padding-bottom: 30px;
  
  }


  @keyframes slide-up {
    0% {
      transform: translateY(-5rem);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes slide-down {
    0% {
      transform: translateY(5rem);
    }
    100% {
      transform: translateY(0);
    }
  }

 

`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderText = styled.h3`
  animation: slide-down 0.5s ease;
  font-size: 24px;
  span{
    white-space:nowrap;
    font-size:14px;
  }
  @media (max-width:768px ){
    font-size: 17px;
    margin-right:-8px;
    span{
      font-size:11px;
     text-align:left;
   
      

    }
}
`;

const SearchContainer = styled.div`
  animation: slide-down 0.5s ease;
  flex: 1;
  margin-left: 74px;

  @media (max-width:768px) {
    margin-left: 20px !important;

  }
`;

const ProductList = styled.div`
  animation: slide-down 0.5s ease;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  @media (max-width:768px) {
    padding:4px 4px;
  }
`;

const NoProductFound = styled.p`
  font-size:18px;
    @media (max-width:768px) {
      font-size:14px;
    }
`;

const Table = styled.table`
  width: 100%;

  @media (max-width:768px) {
    width: 84%;

  }
  border-collapse: collapse;
`;

const TableRow = styled.tr`
font-size:15px;
border:1px solid black;




@media (max-width:768px ){
  font-size:13px;
}
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  padding: 12px 0;
  text-align: left;
  background-color:red;
  color:white;
  @media (max-width:768px ){

}
`;

const TableData = styled.td`
  padding: 12px 0;

  @media (max-width:768px ){
    padding-left: 1px 0;
}
`;

const ActionIcons = styled.div`
  display: flex;
  gap: 5px;
  margin-top:14px;
@media (max-width:768px ){
  gap: 5px !important;  
}
    


  svg {
    cursor: pointer;
    color: #888;
    transition: color 0.3s ease;

    &:hover {
      color: #333;
    }
  }
`;


















