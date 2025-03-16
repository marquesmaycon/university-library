import Header from "@/components/Header"
import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <main className="root-container">
         <div className="mx-auto max-w-7xl">
            <Header />
            <div className="mt-20 pb-2-">{children}</div>
         </div>
      </main>
   )
}
