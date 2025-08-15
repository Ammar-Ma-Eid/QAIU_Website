'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import Image from "next/image"
import { useRef } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { addBlogPost, updateBlogPost } from "@/app/admin/actions"
import type { BlogPost } from "@/lib/types"
import { DialogClose } from "@/components/ui/dialog"

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  author: z.string().min(2, "Author name must be at least 2 characters."),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format.",
  }),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters."),
  content: z.string().min(20, "Content must be at least 20 characters."),
  imageUrl: z.string().optional(),
  dataAiHint: z.string().optional(),
})

type BlogPostFormValues = z.infer<typeof formSchema>

interface BlogPostFormProps {
  post?: BlogPost
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const { toast } = useToast()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      author: post?.author || "",
      date: post ? format(new Date(post.date), "yyyy-MM-dd'T'HH:mm") : "",
      excerpt: post?.excerpt || "",
      content: post?.content || "",
      imageUrl: post?.imageUrl || "",
      dataAiHint: post?.dataAiHint || "",
    },
  })

  async function onSubmit(data: BlogPostFormValues) {
    const submissionData = {
      ...data,
      date: new Date(data.date).toISOString(),
      imageUrl: data.imageUrl || 'https://placehold.co/800x400.png',
    }
    
    try {
      if (post) {
        await updateBlogPost(post.id, submissionData) 
        toast({
          title: "Blog Post Updated",
          description: `The post "${data.title}" has been updated.`,
        })
      } else {
        await addBlogPost(submissionData)
        toast({
          title: "Blog Post Added",
          description: `The post "${data.title}" has been added.`,
        })
      }
      closeButtonRef.current?.click()
    } catch (error) {
       toast({
        title: "An Error Occurred",
        description: "Something went wrong. Please check the console and try again.",
        variant: "destructive",
      })
    }
  }

  const imageUrl = form.watch("imageUrl")

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Post title" {...field} />
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
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Author's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea placeholder="A short summary of the post..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="The full content of the blog post..." {...field} rows={10} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Feature Image (Optional)</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      form.setValue("imageUrl", reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
            </FormControl>
            {imageUrl && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Image Preview:</p>
                <Image
                  src={imageUrl}
                  alt="Image preview"
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
              </div>
            )}
            <FormMessage />
          </FormItem>
          <FormField
            control={form.control}
            name="dataAiHint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image AI Hint (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. quantum computer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </Form>
      <DialogClose asChild>
        <button ref={closeButtonRef} className="hidden" />
      </DialogClose>
    </>
  )
}
