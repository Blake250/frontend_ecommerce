import React from 'react'

import {  useSelector } from 'react-redux';

  const ShowOnLogin = ({children}) => {
    const {isLoggedIn} = useSelector((state)=> state?.auth ) 
 //console.log(`is logged in is in ${isLoggedIn} state `)

 if(isLoggedIn){
    return (
        children
    )
 }else{
    return (
        null
    )
 }
}





export  const ShowOnLogOut = ({children})=>{
    const {isLoggedIn} = useSelector((state)=> state?.auth )
  // console.log(`is logged in is in ${isLoggedIn} state `)

    if(!isLoggedIn){
        return (
            children
        )
    }else{
        return (
            null
        )
    }


}

export default  ShowOnLogin