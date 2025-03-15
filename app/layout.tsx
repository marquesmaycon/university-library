import type { Metadata } from "next";
import localFont from "next/font/local"

import "./globals.css"

const ibmPlexSans = localFont({
   src: [
      { path: "./fonts/IMBPlexSans-Regular.ttf", weight: "400", style: "normal" },
      { path: "./fonts/IMBPlexSans-Medium.ttf", weight: "500", style: "normal" },
      { path: "./fonts/IMBPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
      { path: "./fonts/IMBPlexSans-Bold.ttf", weight: "700", style: "normal" }
   ]
})

const bebasNeue = localFont({
   src: [{ path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" }],
   variable: "--bebas-neue"
})

export const metadata: Metadata = {
   title: "Bookwise",
   description: "A book borrowing tracking app"
}

export default function RootLayout({
   children
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}>{children}</body>
      </html>
   )
}
