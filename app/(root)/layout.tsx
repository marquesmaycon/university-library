import { after } from "next/server"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"

import { auth } from "@/auth"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import Header from "@/components/Header"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) redirect("/sign-in")

  after(async () => {
    if (!session?.user?.id) return

    const user = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1)

    const today = new Date().toISOString().slice(0, 10)

    const lastActivityDateIsToday = user[0]?.lastActivityDate === today

    if (lastActivityDateIsToday) return

    await db
      .update(users)
      .set({
        lastActivityDate: today
      })
      .where(eq(users.id, session.user.id))
  })

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header />
        <div className="mt-20 pb-2-">{children}</div>
      </div>
    </main>
  )
}
