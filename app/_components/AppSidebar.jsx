"use client"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { SignInButton, useUser } from "@clerk/nextjs"
import { Moon, Sun, User2 } from "lucide-react"
import { useTheme } from "next-themes"

export function AppSidebar() {
   const{theme,setTheme} = useTheme()
   const {user}=useUser()

  return ( 
    <Sidebar>
      <SidebarHeader>
      <div className="p-3">
      <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-xl">ComboAiLab</h1>
      </div>

     
     <div>
         {theme == 'light' ? <Button variant={'ghost'} onClick={()=> setTheme('dark')}><Sun /></Button>   
         :  <Button variant={'ghost'} onClick={()=> setTheme('light')} ><Moon /></Button>}
     </div>

      </div>
      {user?
       <Button className='mt-7 w-full size=lg'>+ New Chat </Button>:
       <SignInButton>
         <Button className='mt-7 w-full size=lg'>+ New Chat </Button>
        </SignInButton>
        }
      </div>
    
            </SidebarHeader>


      <SidebarContent>
        <SidebarGroup>
            <div className={'p-3'}>
             <h2 className="font-bold text-lg">Chat</h2>
            {!user && <p className="text-sm text-gray-400">Sign in to start chating with multiple ai model </p>}
             </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter >
        <div className="p-3 mb-10">
           {!user? <SignInButton mode="modal">
            <Button className={'w-full'} size={'lg'}>Sign In/Sign up</Button>
            </SignInButton>
            :
            <div>
             <Button className="flex w-full" variant={'ghost'}>
              <User2/> <h2>Settings</h2>
              </Button>
              </div>
            }
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}