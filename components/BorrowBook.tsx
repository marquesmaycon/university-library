"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from "sonner"

import { borrowBook } from "@/lib/actions/book"

import { Button } from "./ui/button"

const BorrowBook = ({
  bookId,
  userId,
  borrowingEligibility: { isEligible, message }
}: {
  bookId: string
  userId: string
  borrowingEligibility: { isEligible: boolean; message: string }
}) => {
  const router = useRouter()
  const [borrowing, setBorrowing] = useState(false)

  const handleBorrow = async () => {
    if (!isEligible) {
      toast.error("Error", { description: message })
      return
    }

    setBorrowing(true)

    try {
      const result = await borrowBook({ bookId, userId })
      if (result.success) {
        toast.success("Success", { description: "Book borrowed successfully!" })
        router.push("/")
      } else {
        toast.error("Error", { description: result.message || "An error occurred while borrowing the book." })
      }
    } catch (error) {
      toast.error("Error", { description: "An error occurred while borrowing the book." })
    } finally {
      setBorrowing(false)
    }
  }
  return (
    <Button className="book-overview__btn" onClick={handleBorrow} disabled={borrowing}>
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">{borrowing ? "Borrowing..." : "Borrow"}</p>
    </Button>
  )
}

export default BorrowBook
