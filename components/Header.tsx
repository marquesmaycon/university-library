import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"

export default function Header() {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" width={40} height={40} alt="Logo" />
      </Link>
      <nav>
        <ul className="flex flex-row items-center gap-8">
          <li>
            <Link href="/library" className={cn("text-base  capitalize")}>
              library
            </Link>
          </li>
          <li>
            <form
              action={async () => {
                "use server"
                await signOut()
              }}
              className="mb-10"
            >
              <Button>Logout</Button>
            </form>
          </li>
        </ul>
      </nav>
    </header>
  )
}
