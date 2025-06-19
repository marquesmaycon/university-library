import BookList from "@/components/BookList"
import { sampleBooks } from "@/constants"

export default function Page() {
  return (
    <>
      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  )
}
