import { z } from "zod"

export const signUpSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University card is required"),
  password: z.string().min(8, "Password must be at least 8 characters long")
})

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long")
})

export const bookSchema = z.object({
  title: z.string().min(2, "Title is required").max(200, "Title must be at most 200 characters long"),
  description: z.string().min(10, "Description is required").max(1000, "Description must be at most 1000 characters long"),
  author: z.string().trim().min(2, "Author is required").max(100, "Author must be at most 100 characters long"),
  genre: z.string().trim().min(2, "Genre is required").max(100, "Genre must be at most 100 characters long"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, "Invalid color format"),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10)
})
