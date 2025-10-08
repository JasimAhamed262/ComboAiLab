import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { useUser, UserButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'

function AppHeader() {
  const { user } = useUser()

  return (
    <div className='p-3 w-full shadow flex justify-between items-center'>
      <SidebarTrigger />
      
      {user && (
        <div className='flex items-center gap-3'>
          <span className='text-sm text-gray-600'>{user.fullName}</span>
          <UserButton afterSignOutUrl='/' />
        </div>
      )}
    </div>
  )
}

export default AppHeader