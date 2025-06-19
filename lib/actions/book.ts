"use server"

import dayjs from "dayjs"
import { eq } from "drizzle-orm"

import { db } from "@/database/drizzle"
import { books, borrowRecords } from "@/database/schema"

export const borrowBook = async (params: BorrowBookParams) => {
  const { bookId, userId } = params

  console.log("Borrowing book:", { bookId, userId })

  try {
    const book = await db.select({ availabeCopies: books.availableCopies }).from(books).where(eq(books.id, bookId)).limit(1)
    if (!book.length || book[0].availabeCopies <= 0) {
      return {
        success: false,
        message: "This book is currently not available for borrowing."
      }
    }

    const dueDate = dayjs().add(7, "day").toDate().toDateString()

    const record = db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED"
    })

    console.log(record)

    await db
      .update(books)
      .set({ availableCopies: book[0].availabeCopies - 1 })
      .where(eq(books.id, bookId))

    return {
      success: true,
      message: "Book borrowed successfully.",
      data: record
    }
  } catch (error) {
    console.error("Error borrowing book:", error)
    return {
      success: false,
      message: "Failed to borrow book. Please try again later."
    }
  }
}
