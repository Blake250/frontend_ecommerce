import { onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useSelector } from "react-redux";




const useAuth = () => {
   
    const [isSubscribed, setIsSubscribed] = useState("")
     useEffect(()=>{
        const unSubscribed = onAuthStateChanged(auth,(user)=>{
            if(user){
                setIsSubscribed(user)
            }
           // return unSubscribed()
           else{
            setIsSubscribed(null)
           }
        })

           //  return isSubscribed
           return ()=> unSubscribed()
     },[isSubscribed])
     return isSubscribed
}

export default useAuth 



