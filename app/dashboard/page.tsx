
import NavBar from "@/components/navbar"
import { Metadata } from "next"
import Items from "./components/items"

export const metadata: Metadata= {
     title: 'Dashboard',
     description: 'Manage your products'
   }

export default function Dashboard() {
     return (
          <>
               <NavBar/>
               <div className="md:border border-solid border-gray-300 rounded-3xl p-3 md:m-6 lg:mx-36">
                    <Items/>
               </div>
          </>
     )
}
