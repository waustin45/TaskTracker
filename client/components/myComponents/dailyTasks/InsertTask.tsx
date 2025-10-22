"use client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { FetchPost } from "@/services/fetchService";
const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(200),
})
const currentMonth = dayjs(new Date()).format("MMMM")
const currentYear = dayjs(new Date()).format("YYYY")
export default function InsertTask() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { title, description } = values

    const postBody = {
      title: title,
      description: description,
      currentMonth: parseInt(dayjs().format("MM")),
      currentYear: parseInt(currentYear),
      userId: 1
    }
    console.log("POST BODY", postBody)
    const post = await FetchPost("/api/insertTask",postBody);
    if (post) {
      console.log("Task inserted successfully:", post);
    } else {
      console.error("Failed to insert task.");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Insert New Task</h2>
          <p className="text-sm text-gray-500">Add a new task for {currentMonth} {currentYear}</p>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /><FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Add</Button>
      </form>
    </Form>
  )
}