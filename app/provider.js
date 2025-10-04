import React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from './_components/AppSidebar'


function provider({children,...props}) {
  return (
    <NextThemesProvider   {...props}
       attribute="class"
       defaultTheme="system"
       enableSystem
       disableTransitionOnChange>
    <SidebarProvider>
      <AppSidebar/>
        <SidebarTrigger />

    <div>{children}</div>
    </SidebarProvider>
    </NextThemesProvider>
  )
}

export default provider