import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { config } from "dotenv"
import ImageKit from "imagekit"

import dummyBooks from "../dummyBooks.json"
import { books } from "./schema"

config({ path: ".env.local" })
const sql = neon(process.env.DATABASE_URL || "")
export const db = drizzle({ client: sql })

const imageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT || "https://ik.imagekit.io/your_imagekit_id",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || ""
})

const uploadToImageKit = async (url: string, fileName: string, folder: string) => {
  const res = await imageKit.upload({
    file: url,
    fileName,
    folder
  })

  return res.filePath
}

const seed = async () => {
  console.log("seeding database...")
  try {
    for (const book of dummyBooks) {
      console.log(`Processing book: ${book.title}`)
      const coverUrl = await uploadToImageKit(book.coverUrl, `${book.title.replace(/\s+/g, "_")}_cover.jpg`, "books/covers")
      const videoUrl = await uploadToImageKit(book.videoUrl, `${book.title.replace(/\s+/g, "_")}_video.mp4`, "books/videos")

      await db.insert(books).values({ ...book, coverUrl, videoUrl })
    }
    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

seed()
