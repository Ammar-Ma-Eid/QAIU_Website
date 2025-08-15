'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitContactForm, type State } from '@/app/site-actions'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  )
}

export function ContactForm() {
  const initialState: State = {};
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div>
        <Label htmlFor="name" className="sr-only">Your Name</Label>
        <Input id="name" name="name" type="text" placeholder="Your Name" required aria-label="Your Name" />
         {state?.errors?.name && <p className="text-sm text-destructive mt-2">{state.errors.name[0]}</p>}
      </div>
      <div>
        <Label htmlFor="email" className="sr-only">Your Email</Label>
        <Input id="email" name="email" type="email" placeholder="Your Email" required aria-label="Your Email" />
         {state?.errors?.email && <p className="text-sm text-destructive mt-2">{state.errors.email[0]}</p>}
      </div>
      <div>
        <Label htmlFor="phone" className="sr-only">Your Phone</Label>
        <Input id="phone" name="phone" type="tel" placeholder="Your Phone" aria-label="Your Phone" />
         {state?.errors?.phone && <p className="text-sm text-destructive mt-2">{state.errors.phone[0]}</p>}
      </div>
      <div>
        <Label htmlFor="message" className="sr-only">Your Message</Label>
        <Textarea id="message" name="message" placeholder="Your Message" required rows={5} aria-label="Your Message" />
         {state?.errors?.message && <p className="text-sm text-destructive mt-2">{state.errors.message[0]}</p>}
      </div>
      
      {state?.message && (
        <Alert variant={state.success ? 'default' : 'destructive'} className={state.success ? 'bg-primary/10 border-primary text-primary' : ''}>
          {state.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertTitle>{state.success ? 'Success!' : 'Error'}</AlertTitle>
          <AlertDescription>
            {state.message}
          </AlertDescription>
        </Alert>
      )}

      <SubmitButton />
    </form>
  )
}
