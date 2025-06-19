type Book = {
  id: string
  title: string
  author: string
  genre: string
  rating: number
  totalCopies: number
  availableCopies: number
  description: string
  coverColor: string
  coverUrl: string
  videoUrl: string
  summary: string
  isLoaned?: boolean
  createdAt: Date | null
}

type AuthCredentials = {
   fullName: string
   email: string
   password: string
   universityId: number
   universityCard: string
}

type BookParams = {
  title: string
  author: string
  genre: string
  rating: number
  totalCopies: number
  coverUrl: string
  coverColor: string
  videoUrl: string
  summary: string
  description: string
}

type BorrowBookParams = {
  bookId: string
  userId: string
}