import React from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { Button } from "./ui/button"
import BookCoverSvg from "./BookCoverSVG"
import BookCover from "./BookCover"

export default function BookCard({ id, title, genre, coverColor, coverUrl, isLoaned = false }: Book) {
   return (
     <li className={cn(isLoaned && "xs:w-52 w-full")}>
       <Link href={`/books/${id}`} className={cn(isLoaned && "w-full flex flex-col items-center")}>
         <BookCover coverColor={coverColor} coverUrl={coverUrl} />

         <div className={"xs:max-w-40 max-w-28"}>
           <p className="book-title">{title}</p>
           <p className="book-genre">{genre}</p>
         </div>

         {isLoaned && (
           <div className="mt-3 w-full">
             <div className="book-loaned">
               <Image src="/icons/calender.svg" alt="Calender" width={18} height={18} className="object-contain" />
               <p className="text-light-100">11 days to left to return</p>
             </div>

             <Button className="book-btn">Download receipt</Button>
           </div>
         )}
       </Link>
     </li>
   )
}
