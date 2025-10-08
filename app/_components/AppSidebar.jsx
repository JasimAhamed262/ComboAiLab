"use client"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { db } from "@/config/FireBaseConfig"
import { SignInButton, useUser } from "@clerk/nextjs"
import { collection, getDocs, query, where } from "firebase/firestore"
import { Moon, Sun, User, User2 } from "lucide-react"
import moment from "moment"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import  Link  from "next/link"

export function AppSidebar() {
   const{theme,setTheme} = useTheme()
   const {user}=useUser()
   const [chatHistory,setChatHistory]= useState([])
   useEffect(()=>{
    user&&GetChatHistory()
   },[user])

   const GetChatHistory=async()=>{
    const q=query(collection(db,"chatHistory"),where("userEmail",'==',user?.primaryEmailAddress?.emailAddress))
    const querySnapshot=await getDocs(q)

    querySnapshot.forEach((doc)=>{
      console.log(doc.id,doc.data())
      setChatHistory(prev=>[...prev,doc.data()])
    })
   } 

const GetLastUserMessageFromChat = (chat) => {

    const allMessages = Object.values(chat.messages).flat();
    const userMessages = allMessages.filter(msg => msg.role === 'user');

    const lastUserMsg = userMessages[userMessages.length - 1]?.content || null;

    const lastUpdated = chat.lastUpdated || Date.now();
    const formattedDate =moment(lastUpdated).fromNow();
    return{
      chatId:chat.chatId,
      message:lastUserMsg,
      lastMsgDate: formattedDate
    }
  }
  




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
      <Link href={'/'}> 
       <Button className='mt-7 w-full' size='lg'>+ New Chat </Button>
       </Link>:
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
            <div className="overflow-auto">
            {chatHistory.map((chat, index)=>(
                <Link href={'?chatId=' + chat.chatId} key={index} className="">
                    <div className="hover:bg-gray-100 p-3 cursor-pointer">
                    <h2 className="text-sm text-gray-400">{GetLastUserMessageFromChat(chat).lastMsgDate}</h2>
                    <h2 className="text-lg line-clamp-1">{GetLastUserMessageFromChat(chat).message}</h2>
                     </div>
                    <hr className="my-1"/>
                  </Link>
            ))}
            </div>


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