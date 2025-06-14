import { auth } from "@/auth"
import React from "react"

import "@/styles/admin.css"
import Sidebar from "@/components/admin/Sidebar"
import Header from "@/components/admin/Header"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    return (
      <main className="flex bg-opa min-h-screen w-full flex-row">
        <p>Unauthorized</p>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />
      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  )
}
