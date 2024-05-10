import React from 'react'
import CreateCategories from './CreateCategories'
import CreateCategoryList from './CreateCategoryList'
import { useDispatch } from 'react-redux'
import { getCategories } from '../../feature/categoryAndBrand'
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert module
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css




const Categories = () => {
 
  const dispatch = useDispatch()

  const reloadCategories = (()=>{
    dispatch(getCategories())
  })

  const confirmDelete = () => {
    confirmAlert({
      title: 'Delete Category',
      message: 'Are you sure you want to do this category?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => {
            // Your action here
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




  return (
    <div>
      <CreateCategories reloadCategories={reloadCategories}  />
      <CreateCategoryList/>
        
    </div>
  )
}

export default Categories