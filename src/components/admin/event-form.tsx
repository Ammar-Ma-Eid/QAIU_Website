'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { PlusCircle, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { addEvent, updateEvent } from "@/app/admin/actions"
import type { Event } from "@/lib/types"
import { DialogClose } from "@/components/ui/dialog"

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format.",
  }),
  description: z.string().min(10, "Description must be at least 10 characters."),
  location: z.string().min(2, "Location must be at least 2 characters."),
  imageUrl: z.string().optional(),
  dataAiHint: z.string().optional(),
  gallery: z.array(z.object({
    src: z.string().optional(),
    alt: z.string().min(1, { message: "Alt text cannot be empty." }),
    dataAiHint: z.string().optional(),
  })).optional(),
})

type EventFormValues = z.infer<typeof formSchema>

interface EventFormProps {
  event?: Event
}

export function EventForm({ event }: EventFormProps) {
  const { toast } = useToast()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event?.title || "",
      date: event ? format(new Date(event.date), "yyyy-MM-dd'T'HH:mm") : "",
      description: event?.description || "",
      location: event?.location || "",
      imageUrl: event?.imageUrl || "",
      dataAiHint: event?.dataAiHint || "",
      gallery: event?.gallery || [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "gallery"
  });

  async function onSubmit(data: EventFormValues) {
    const submissionData = {
        ...data,
        date: new Date(data.date).toISOString(),
        imageUrl: data.imageUrl || 'https://placehold.co/800x400.png',
        gallery: data.gallery?.filter(item => item.src && item.src.length > 0),
    };
    
    try {
      if (event) {
        await updateEvent(event.id, submissionData) 
        toast({
          title: "Event Updated",
          description: `The event "${data.title}" has been updated.`,
        })
      } else {
        await addEvent(submissionData)
        toast({
          title: "Event Added",
          description: `The event "${data.title}" has been added.`,
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

  const imageUrl = form.watch("imageUrl");

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
                  <Input placeholder="Event title" {...field} />
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. AIU Campus, Auditorium B" {...field} />
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="A detailed description of the event..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Main Image (Optional)</FormLabel>
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
                <FormLabel>Main Image AI Hint (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. hackathon event" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Gallery Section */}
          <div className="space-y-2">
              <FormLabel>Event Gallery</FormLabel>
              <FormDescription>
                  Add images that will be displayed on the event detail page.
              </FormDescription>
              <div className="p-4 border rounded-lg space-y-4 bg-secondary/50">
                  {fields.length === 0 && (
                      <p className="text-sm text-center text-muted-foreground py-4">No gallery images added.</p>
                  )}
                  {fields.map((field, index) => {
                      const galleryImageUrl = form.watch(`gallery.${index}.src`);
                      return (
                          <div key={field.id} className="p-4 border rounded-md relative bg-background shadow-sm">
                              <div className="space-y-4">
                                  <FormItem>
                                      <FormLabel>Image</FormLabel>
                                      <FormControl>
                                          <Input
                                              type="file"
                                              accept="image/*"
                                              onChange={(e) => {
                                                  const file = e.target.files?.[0];
                                                  if (file) {
                                                      const reader = new FileReader();
                                                      reader.onloadend = () => {
                                                          form.setValue(`gallery.${index}.src`, reader.result as string);
                                                      };
                                                      reader.readAsDataURL(file);
                                                  }
                                              }}
                                              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                          />
                                      </FormControl>
                                      {galleryImageUrl && (
                                      <div className="mt-2">
                                          <Image
                                              src={galleryImageUrl}
                                              alt="Gallery image preview"
                                              width={80}
                                              height={80}
                                              className="rounded-md object-cover"
                                          />
                                      </div>
                                      )}
                                      <FormMessage />
                                  </FormItem>

                                  <FormField
                                      control={form.control}
                                      name={`gallery.${index}.alt`}
                                      render={({ field }) => (
                                          <FormItem>
                                          <FormLabel>Alt Text</FormLabel>
                                          <FormControl>
                                              <Input placeholder="A description of the image" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                          </FormItem>
                                      )}
                                  />
                                  <FormField
                                      control={form.control}
                                      name={`gallery.${index}.dataAiHint`}
                                      render={({ field }) => (
                                          <FormItem>
                                          <FormLabel>Image AI Hint (Optional)</FormLabel>
                                          <FormControl>
                                              <Input placeholder="e.g. students presenting" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                          </FormItem>
                                      )}
                                  />
                              </div>
                              <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-1 right-1 text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                                  onClick={() => remove(index)}
                              >
                                  <span className="sr-only">Remove Image</span>
                                  <Trash2 className="h-4 w-4" />
                              </Button>
                          </div>
                      );
                  })}
                  <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => append({ src: '', alt: '', dataAiHint: '' })}
                  >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Gallery Image
                  </Button>
              </div>
          </div>

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
