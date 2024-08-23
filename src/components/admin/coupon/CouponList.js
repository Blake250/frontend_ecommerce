
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { shortenText } from '../../utils'
import { useSelector, useDispatch } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert module
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify'
import Loader from '../../Loader';
import { getCoupon , getACoupon, deleteACoupon} from '../../../feature/coupon/couponSlice';


const CouponList = () => {
  const {isLoading, coupons,}  = useSelector((state) => state?.coupon)
  const [productCount, setProductCount] = useState(0)


 const dispatch = useDispatch()

useEffect(()=>{
   dispatch(getCoupon())
  // dispatch(getACoupon("AUTUMNSALE"))
// setProductCount(productCount + 1)

},[dispatch])


// useEffect(()=>{
//  adjustContainerHeight()
// },[[productCount, coupons]])

// const adjustContainerHeight = ()=>{
//  const container = document.getElementById("container")

//  if(container){
//    const count = coupons ? coupons?.length : 0
//    container.style.height = `${20 + count * 20}vh`
//  }
// }







const confirmDelete = (id) => {
 confirmAlert({
   title: 'Delete Coupon',
   message: 'Are you sure you want to delete this Coupon?',
   buttons: [
     {
       label: 'Delete',
       onClick: () => {
         delCoupon(id)
         console.log('User clicked Yes');
       }
     },
     {
       label: 'cancel',
       onClick: () => {
         // Your action here
      //   console.log('User clicked No');
       }
     }
   ]
 });

}



const delCoupon = (async(id)=>{
 await dispatch(deleteACoupon(id))

 await dispatch(getCoupon())
 setProductCount(coupons?.length)


// return toast.success("Coupon was  successfully deleted")

})



const spanText1 = "Name"
const spanText2 = "Date Created"
const spanText3 = "Expiry Date"
const spanText4 = "Coupons"
const spanText5 = "Actions"


return (

  <Container    >
    {isLoading && <Loader/>}
      <Contain >
    <h3>All Coupons</h3>
      <div>
   { coupons?.length === 0 ? 
   (
    <p>No Coupons Found</p>
   )
   : 
   (
    <Table>
      <div>

       
      <TableRow>
            
            <hr /> 
            <div>  
          <span>s/n </span>
          <span>{shortenText(spanText1 ,3)} </span>
          <span>{shortenText(spanText2 ,3)} </span>
          <span>{shortenText(spanText3 ,3)}  </span>
          <span>{shortenText(spanText4 ,3)}  </span>
          <span>{shortenText(spanText5 ,3)} </span>
          </div>
          <hr /> 
         </TableRow>
         
        <br />
        <TableBody>
          { coupons && coupons?.length > 0 &&
            coupons?.map((coupon, index)=>{
             // const {_id,name,discount,expiresAt,createdAt} = coupon
          return    (
                  <TableData key={coupon?._id}>
                  
                    <hr/>
                    <div> 
       
                    <p>
                    {index + 1}
                    </p>
                       
                    <p>
               
                   {shortenText(coupon?.name ,3)} 
               
                    </p>
                
                    <p>
                   {coupon?.discount}
               
                    </p>
                    <p>
                   
                   {coupon?.createdAt.substring(0,10)}
                     </p>
                    <p>
                   
                  {coupon?.expiresAt.substring(0,10)}
                    </p>
                
                    <p>   
                    <FaTrashAlt 
                    color='red'
                   
                    style={{marginBottom:"-8px"}}
                  onClick={()=> confirmDelete(coupon?._id)}
                    
                    />
                   </p>
                    </div>

                  </TableData>

              )
              }
            )
          }
        </TableBody>
      </div>


    </Table>

   )


   }     

      </div>
      </Contain>
  </Container>

)



}

export default CouponList

const Table = styled.div`
  //margin-bottom:10rem;



@media (max-width:678px) {
 div{

   width:90%;

}

}

`

const  TableData = styled.div`


display:flex;
flex-direction:column;
justify-content:center !important;;
align-items:space-between !important;
margin:5px  0;


@media (max-width:768px) {
 
   width:125% !important;
   div{
    font-size:18px;
    
  
 
    svg{
    font-size:18px ;
    margin-bottom:-2px !important;

  }

   }
  
   
   div{
   p{
  //padding-left:6px;
  padding:0 6px;
  font-size:12px !important;
  white-space:nowrap;
  svg{
    font-size:14px !important;
    margin-bottom:-2px !important;
  }

   }
   }
 
 }


width:75%;


line-height:1.5;
background-color:#ffffff;
border-radius:10px;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
padding: 0 12px;
cursor:pointer;
&:hover {
 background-color: blue !important;
     }
hr{
 
 width:100%;
 background-color: red !important; 
 margin: 10px 0; 
 animation: slide-down 0.5s ease !important;
 //margin-left:-20px;
 
}
div{
 display:flex  !important;
flex-direction:row;
justify-content:space-between;
align-items:center !important;
animation: slide-down 0.5s ease;


 p{
   color:black !important;;
   font-size:14px;
    text-align:start !important;
    animation: slide-down 0.5s ease;
 }
}
`



const TableBody = styled.div`


width:120%;
opacity:0.5;

@media (max-width:768px) {
 width:110%;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:flex-start;
 
   
 }

`


const TableRow = styled.div`

span{
  font-size:17px;
 // margin-right:-5px;
}
 hr {
     background-color: red !important; /* Change the color as desired */
     height: 2px; 
     width:100%;
     border: none; 
     animation: slide-down 0.5s ease;
     margin-left:-4px;
  @media (max-width:768px) {

   width:135% !important;

 }
    
   }
div{
 display: flex;
 justify-content: space-between;
 align-items: center;
 align-items:center;
 width:37vw;
//padding: 5px 8px;
@media (max-width:768px){
   width:80%;
   span{
  font-size:14px !important;
 
}
   div{
    padding: 4px 2px !important;
   }
 

  }



 span {
   padding:  8px;
   font-weight: 600;
   position: relative;
   line-height:0;
   animation: slide-down 0.5s ease;
 
   /* Add border lines above and below each span */
   &:before,
   &:after {
     content: '';
     position: absolute;
     left: 0;
     right: 0;
     border-bottom: 1px solid var(--light-blue); /* Adjust the color and thickness as needed */
   }

   &:before {
     top: 0;
   }

   &:after {
     bottom: 0;
   }
 }
}
`;






const Container = styled.div`
//width:70vw;

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



height:100%;
padding-bottom:50px;
div{



}





margin-top: 20px; 


position: relative;

@media (max-width:768px) {
//margin-left:-60px !important; 
width:88%;

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

`



const Contain = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center; 
 // padding-left: 75px; 
 h3{
 
   font-size:21px;
   animation: slide-down 0.5s ease;
   @media (max-width:768px) {
     font-size:18px !important;
   }
  }
  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

