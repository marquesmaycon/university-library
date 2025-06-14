"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { FieldValues, DefaultValues, Path } from "react-hook-form"
import type { ZodType } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"

import { Input } from "./ui/input"
import ImageUpload from "./ImageUpload"
import { FIELD_NAMES, FIELD_TYPES } from "@/constants"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type AuthFormProps<T extends FieldValues> = {
   type: "SIGN_IN" | "SIGN_UP"
   schema: ZodType<T>
   defaultValues: T
   onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>
}

const AuthForm = <T extends FieldValues>({ type, schema, defaultValues, onSubmit }: AuthFormProps<T>) => {
  const router = useRouter()
  // TO DO => implement a loading state
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>
  })

  const handleSubmit = async (data: T) => {
    const res = await onSubmit(data)
    if (res.success) {
      toast.success("Success!", { description: isSignIn ? "Welcome back!" : "Account created successfully!" })
      router.push("/")
    } else {
      toast.error(isSignIn ? "Sign in failed" : "Sign up failed", { description: res.error || "Something went wrong" })
      console.error("Error:", res.error)
    }
  }

  const isSignIn = type === "SIGN_IN"

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl text-white font-semibold">{isSignIn ? "Welcome back to BookWise" : "Create your library account"}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
          {Object.keys(defaultValues).map((f) => {
            return (
              <FormField
                key={f}
                control={form.control}
                name={f as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                    <FormControl>
                      {field.name === "universityCard" ? (
                        <ImageUpload onFileChange={field.onChange} />
                      ) : (
                        <Input required type={FIELD_TYPES[f as keyof typeof FIELD_TYPES]} {...field} className="form-input" />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          })}
          <Button type="submit" className="form-btn">
            {isSignIn ? "Sign in" : "Sign up"}
          </Button>
        </form>
      </Form>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <p className="text-center text-base font-medium">
        {isSignIn ? "New to BookWise? " : "Already have an account? "}

        <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="font-bold text-primary">
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  )
}

export default AuthForm
