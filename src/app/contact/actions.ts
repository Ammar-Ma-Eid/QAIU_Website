'use server'

import { z } from 'zod';
// ...existing code...

export type State = {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
  }
}

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

// ...existing code...

export async function submitContactForm(prevState: State | undefined, formData: FormData): Promise<State> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please correct the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // MongoDB code removed. Add your own data handling here if needed.


  return {
    success: true,
    message: 'Thank you for your message! We will get back to you soon.'
  }
}
