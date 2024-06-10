
import NavBar from "@/components/navbar"
import { Metadata } from "next"

export const metadata: Metadata= {
     title: 'Dashboard',
     description: 'Manage your products'
   }

export default function Dashboard() {
     return (
          <div>
               <NavBar/>
          </div>
     )
}
