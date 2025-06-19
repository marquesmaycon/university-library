import BookList from "@/components/BookList"
import { sampleBooks } from "@/constants"

// TO DO => retrieve borrowed books from the server
export default function Page() {
  return (
    <>
      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  )
}
