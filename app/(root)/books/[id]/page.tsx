import BookOverview from "@/components/BookOverview"
import BookVideo from "@/components/BookVideo"
import { db } from "@/database/drizzle"
import { books } from "@/database/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [book] = await db.select().from(books).where(eq(books.id, id)).limit(1)

  if (!book) redirect("/404")

  return (
    <>
      <BookOverview {...book} />
      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={book.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
              {book.summary.split("\n").map((line, index) => (
                <p key={index} className="text-justify">
                  {line}
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
