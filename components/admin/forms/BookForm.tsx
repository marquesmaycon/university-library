"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { bookSchema } from "@/lib/validations"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import FileUpload from "@/components/FileUpload"
import ColorPicker from "../ColorPicker"

type BookFormProps = Partial<Book> & {
  type: "CREATE" | "UPDATE"
}

const BookForm = ({ type, ...book }: BookFormProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      rating: 0,
      totalCopies: 0,
      coverUrl: undefined,
      coverColor: "",
      videoUrl: undefined,
      summary: ""
    }
  })

  const handleSubmit = async (data: z.infer<typeof bookSchema>) => {
    console.log(data)
  }

  console.log(form.getValues())

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">Book Title</FormLabel>
              <FormControl>
                <Input placeholder="Book title" className="book-form_input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">Book Author</FormLabel>
              <FormControl>
                <Input placeholder="Book author" className="book-form_input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">Book Genre</FormLabel>
              <FormControl>
                <Input placeholder="Book genre" className="book-form_input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">Book Rating</FormLabel>
              <FormControl>
                <Input type="number" min={1} max={5} placeholder="Book rating" className="book-form_input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalCopies"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">Total Copies</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Total copies" className="book-form_input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">Book Image</FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  variant="light"
                  accept="image/*"
                  placeholder="Upload book cover image"
                  folder="books/covers"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">Primary Color</FormLabel>
              <FormControl>
                <ColorPicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Book description" className="book-form_input" {...field} rows={10} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">Book Video</FormLabel>
              <FormControl>
                <FileUpload
                  type="video"
                  variant="light"
                  accept="video/*"
                  placeholder="Upload book trailer video"
                  folder="books/videos"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-normal text-dark-500">Summary</FormLabel>
              <FormControl>
                <Textarea placeholder="Book summary" className="book-form_input" {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="book-form_btn text-white">
          Add Book to Library
        </Button>
      </form>
    </Form>
  )
}

export default BookForm
