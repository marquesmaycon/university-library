"use server"

import { hash } from "bcryptjs"
import { eq } from "drizzle-orm"

import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { signIn } from "@/auth"

export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">) => {
   const { email, password } = params

   try {
      const res = await signIn("credentials", {
         email,
         password,
         redirect: false
      })

      if (res?.error) {
         return {
            success: false,
            error: res.error
         }
      }

      return { success: true }
   } catch (error) {
      console.log("SignIn error", error)
      return {
         success: false,
         error: "Error signing in"
      }
   }
}

export const signUp = async (params: AuthCredentials) => {
   const { fullName, email, universityId, universityCard, password } = params

   const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)

   if (existingUser.length > 0) {
      return {
         success: false,
         error: "User already exists"
      }
   }

   const hashedPassword = await hash(password, 10)

   try {
      await db.insert(users).values({
         fullName,
         email,
         universityId,
         password: hashedPassword,
         universityCard
      })

      await signInWithCredentials({ email, password })

      return { success: true }
   } catch (error) {
      console.log("SignUp error", error)
      return { success: false, error: "Error creating user" }
   }
}
