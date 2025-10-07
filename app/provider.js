"use client"
import React, { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'
import { useUser } from '@clerk/nextjs'
import { doc, getDoc,setDoc } from 'firebase/firestore'
import { db } from '@/config/FireBaseConfig'
import { AiSelectedModelContext } from '@/context/AiSelectedModelContext'
import { DefaultModel } from '@/public/shared/AiModelsShared'
import { UserDetailContext } from '@/context/UserDetailContext'


function provider({children,...props}) {


   
  const{user}=useUser()
  const[aiSelectedModels,setAiSelectedModels] = useState(DefaultModel)
  const[userDetail,setUserDetail] = useState()


  useEffect(()=>{
   if(user)
   {
     CreateNewUser()
   }
  },[user])



  const CreateNewUser =async() =>{
    //if user exitst?
    const userRef=doc(db,"users",user?.primaryEmailAddress?.emailAddress)
    const userSnap = await getDoc(userRef);

    if(userSnap.exists())
      {
        console.log('Exisiting User');
        const userInfo=userSnap.data()
        setAiSelectedModels(userInfo?.selectedModelPref)
        setUserDetail(userInfo)
          return;
        
      }   else{
        const userData ={
          name:user?.fullName,
          email:user?.primaryEmailAddress?.emailAddress,
          createdAt:new Date(),
          remainingMsg:5,
          plan:'Free',
          credits: 1000  
        }

        await setDoc(userRef,userData)
        console.log('New User data saved');
        setUserDetail(userData)
      }

    //if not then insert
  }





  return (
    <NextThemesProvider   {...props}
       attribute="class"
       defaultTheme="system"
       enableSystem
       disableTransitionOnChange>
         <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
        <AiSelectedModelContext.Provider value={{aiSelectedModels,setAiSelectedModels}}>
    <SidebarProvider>
      <AppSidebar/>
      <div className='w-full'>
      <AppHeader/>{children}</div>
    </SidebarProvider>
    </AiSelectedModelContext.Provider>
    </UserDetailContext.Provider>
    </NextThemesProvider>
  )
}

export default provider