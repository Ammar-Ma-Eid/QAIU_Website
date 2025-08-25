'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { addMember, updateMember } from "@/app/admin/actions"
import type { Member } from "@/lib/types"
import { DialogClose } from "@/components/ui/dialog"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  role: z.string().min(1, "Please select a role."),
  category: z.enum(['leader', 'board'], {
    required_error: "Please select a category.",
  }),
  email: z.string().email("Invalid email address."),
  linkedinUrl: z.string().url("Please enter a valid URL.").or(z.literal("")).optional(),
  imageUrl: z.string().optional(),
})

type MemberFormValues = z.infer<typeof formSchema>

interface MemberFormProps {
  member?: Member
  onSuccess?: () => void
}

export function MemberForm({ member }: MemberFormProps) {
  const { toast } = useToast()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: member?.name || "",
      role: member?.role || "",
      category: member?.category || "board",
      email: member?.email || "",
      linkedinUrl: member?.linkedinUrl || "",
      imageUrl: member?.imageUrl || "",
    },
  })

  async function onSubmit(data: MemberFormValues) {
    const submissionData = {
      ...data,
      imageUrl: data.imageUrl || 'https://placehold.co/400x400.png',
    };
    try {
      if (member) {
        await updateMember(member.id, submissionData)
        toast({
          title: "Member Updated",
          description: `Details for ${data.name} have been updated.`,
        })
      } else {
        await addMember(submissionData)
        toast({
          title: "Member Added",
          description: `${data.name} has been added to the team.`,
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Alice" {...field} />
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
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="leader">Leader</SelectItem>
                    <SelectItem value="board">Board Member</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                {form.watch("category") === "leader" ? (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="President">President</SelectItem>
                      <SelectItem value="Supervisor">Supervisor</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <FormControl>
                    <Input placeholder="e.g. Marketing Director" {...field} />
                  </FormControl>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. alice@qaiu.edu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn URL (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://linkedin.com/in/..." {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Image (Optional)</FormLabel>
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
