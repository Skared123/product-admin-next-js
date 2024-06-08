import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"

export const useUser = () => {

     const getUserFromDB = async ()

     useEffect(() => {
       return onAuthStateChanged(auth, async (authUser) => {
          /* Exist auth user */
          if(authUser){
               
          }else{

          }
       })
     }, [])
     
}