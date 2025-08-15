'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { addGlossaryTerm, updateGlossaryTerm } from "@/app/admin/actions"
import type { GlossaryTerm } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogClose } from "@/components/ui/dialog"


const formSchema = z.object({
  term: z.string().min(2, "Term must be at least 2 characters."),
  definition: z.string().min(10, "Definition must be at least 10 characters."),
  category: z.string().min(2, "Category must be selected."),
  featured: z.boolean().optional(),
  icon: z.string().optional(),
})

type GlossaryTermFormValues = z.infer<typeof formSchema>

interface GlossaryTermFormProps {
  term?: GlossaryTerm
}

const categories = ["Fundamental Concept", "Algorithm", "Hardware", "Theory"];

export function GlossaryTermForm({ term: glossaryTerm }: GlossaryTermFormProps) {
  const { toast } = useToast()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const form = useForm<GlossaryTermFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      term: glossaryTerm?.term || "",
      definition: glossaryTerm?.definition || "",
      category: glossaryTerm?.category || "",
      featured: glossaryTerm?.featured || false,
      icon: glossaryTerm?.icon || "",
    },
  })

  async function onSubmit(data: GlossaryTermFormValues) {
    try {
      if (glossaryTerm) {
        await updateGlossaryTerm(glossaryTerm.id, data) 
        toast({
          title: "Glossary Term Updated",
          description: `The term "${data.term}" has been updated.`,
        })
      } else {
        await addGlossaryTerm(data)
        toast({
          title: "Glossary Term Added",
          description: `The term "${data.term}" has been added.`,
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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Term</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Qubit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="definition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Definition</FormLabel>
                <FormControl>
                  <Textarea placeholder="Explain the term..." {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Feature on homepage
                  </FormLabel>
                  <FormDescription>
                    If checked, this term may appear on the homepage.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon Name (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. layers" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormDescription>
                  A lucide-react icon name to display for this term if featured.
                </FormDescription>
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
