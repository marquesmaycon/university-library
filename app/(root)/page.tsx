import { desc } from "drizzle-orm"

import { db } from "@/database/drizzle"
import { books } from "@/database/schema"
import { BookOverview } from "@/components/BookOverview"
import BookList from "@/components/BookList"

export default async function Home() {
  const latestBooks = await db.select().from(books).limit(10).orderBy(desc(books.createdAt))

  return (
    <>
      <BookOverview {...latestBooks[0]} />
      <BookList title="Latest books" books={latestBooks.slice(1)} containerClassName="mt-28" />
    </>
  )
}
