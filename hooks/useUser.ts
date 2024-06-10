import { getFromLocalStorage } from "@/actions/get-from-localstorage";
import { setInLocalStorage } from "@/actions/set-in-localstorage";
import { User } from "@/interfaces/user.interface";
import { auth, getDocument } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User | undefined | DocumentData>(undefined);
  const pathName = usePathname();
  const router = useRouter()

  const protectedRoutes = ['/dashboard']
  const isInProtectedRoutes = protectedRoutes.includes(pathName)  

  const getUserFromDB = async (uid: string) => {
    const path = `users/${uid}`;
    try {
      let res = await getDocument(path);
      setUser(res);

      setInLocalStorage("user", res);
    } catch (error) {}
  };

  useEffect(() => {
    return onAuthStateChanged(auth, async (authUser) => {
      /* Exist auth user */
      if (authUser) {
        const userInLocal = getFromLocalStorage('user')

        if(userInLocal) setUser(userInLocal);
        else getUserFromDB(authUser.uid);
        
      } else {
        if(isInProtectedRoutes) router.push('/');
      }
    });
  }, []);
  return user;
};
