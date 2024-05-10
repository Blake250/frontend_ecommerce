import React from 'react'
import useAuth from './useAuth'
import Login from './Login'

import { Outlet } from 'react-router-dom'



const PrivateRoutes = () => {
    const user = useAuth()
    return typeof user === "undefined" ?(
        <h1>Loading...</h1>
    ) : user ? (
      <Outlet/>
    ):(
        <Login/>
    )


 
}

export default PrivateRoutes