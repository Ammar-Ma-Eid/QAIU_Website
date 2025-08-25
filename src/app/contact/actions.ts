'use server'

import { z } from 'zod';
import { activityOperations } from '@/lib/supabase-crud-examples'; // Importing activity operations
import { supabase } from '@/lib/supabase';

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
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(100, { message: 'Name must be less than 100 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }).max(150, { message: 'Email must be less than 150 characters.' }),
  phone: z.string().max(20, { message: 'Phone number must be less than 20 characters.' }).optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(1000, { message: 'Message must be less than 1000 characters.' }),
});

export async function submitContactForm(prevState: State | undefined, formData: FormData): Promise<State> {
  try {
    // Validate form data
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

    // Insert contact message into database
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: validatedFields.data.name,
          email: validatedFields.data.email,
          phone: validatedFields.data.phone,
          message: validatedFields.data.message,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return {
        success: false,
        message: 'Failed to submit your message. Please try again later.',
        errors: {},
      };
    }

    // Log the activity
    await activityOperations.logActivity({
      action: 'created',
      entity: 'contact message', // Changed to a valid entity type
      entityName: 'Contact Message',
      details: `New contact message from ${validatedFields.data.name} (${validatedFields.data.email})`
    });

    return {
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    }
  } catch (error) {
    console.error('Unexpected error in submitContactForm:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      errors: {},
    };
  }
}
