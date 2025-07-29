"use client"
import { useAuthStore } from "@/lib/store"
import type React from "react"

import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface MainLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  userRole: "patient" | "practitioner" | "admin" | "ancillary"
}

export function MainLayout({ children, title, subtitle, userRole }: MainLayoutProps) {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={userRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
