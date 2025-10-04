"use client"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function AppSidebar() {
   const{theme,setTheme} = useTheme()


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
       <Button className='mt-7 w-full size=lg'>+ New Chat </Button>
      </div>
            </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
            <div className={'p-3'}>
             <h2 className="font-bold text-lg">Chat</h2>
             <p className="text-sm text-gray-400">Sign in to start chating with multiple ai model </p>
             </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter >
        <div className="p-3 mb-10">
            <Button className={'w-full'} size={'lg'}>Sign In/Sign up</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}