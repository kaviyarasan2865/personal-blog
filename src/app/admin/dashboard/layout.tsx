'use client'

import React from 'react'
import Navbar from '@/components/admin/Navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <div className="flex flex-col h-screen bg-[#ffffff]">
      <Navbar/>
      <main className="flex-1 overflow-auto ">
    
        
        {children}
      </main>
    </div>
  )
}