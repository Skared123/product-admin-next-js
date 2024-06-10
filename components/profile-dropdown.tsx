"use client"
import {
  CircleUserRound,
  FileText,
  ImagePlus,
  LifeBuoy,
  LoaderCircle,
  LogOut,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/hooks/useUser"
import { useEffect, useState } from "react"
import { fileTobase64 } from "@/actions/convert-file-to-base64"
import { updateDocument, uploadBase64 } from "@/lib/firebase"
import toast from "react-hot-toast"
import Image from "next/image"
import { setInLocalStorage } from "@/actions/set-in-localstorage"

export function ProfileDropDown() {

  let user = useUser()
  const [image, setImage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  /* Chose a profile image */
  const chooseImg = async (e: any) => {
    const file = e.target.files[0]
    console.log(file)
    setIsLoading(true)
    try {
      const base64 = await fileTobase64(file)
      const imagePath = `${user?.uid}/profile`

      const imageUrl = await uploadBase64(imagePath, base64)
      await updateDocument(`users/${user?.uid}`, {
        image: imageUrl
      })
      setImage(imageUrl)

      if(user){
        user.image = imageUrl
        console.log(imageUrl)
        console.log('entra por aca')
        console.log(user)
        setInLocalStorage('user',user);
      }

      toast.success('Succesfully updated!')
    } catch (error: any) {
      toast.error(error.messsage, { duration: 2500 })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(user?.image) setImage(user.image)
  },[user])



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span className="mr-2">
            Account
          </span>
          <CircleUserRound className="m-auto w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-center">
          {isLoading ? (
            <LoaderCircle className="w-14 h-14 animate-spin m-auto mb-3" />
          ) : (
            <>
              {image ?
                <Image
                  className="object-cover w-20 h-20 rounded-full m-auto"
                  src={image}
                  width={1000}
                  height={1000}
                  alt="user-img"
                /> :
                <CircleUserRound className="m-auto w-20 h-20" />
              }
              <div className="flex justify-center relative bottom-2">
                <div>
                  <input id="files" className="hidden" type="file" onChange={(e) => chooseImg(e)} />
                  <label htmlFor="files">
                    <div className="w-[40px] h-[28px] bg-slate-950 hover:bg-slate-800 flex rounded-lg justify-center items-center ">
                      <ImagePlus className="w-[18px] h-[18px] text-white cursor-pointer" />
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}
          <div>
            {user?.name}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Terms and Conditions</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
