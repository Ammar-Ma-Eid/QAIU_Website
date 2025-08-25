'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { addActivity } from '@/lib/admin-activity'

type State = {
  error?: string
}

export async function login(prevState: State | undefined, formData: FormData): Promise<State | undefined> {
  const email = formData.get('username')
  const password = formData.get('password')

  const { error } = await supabase.auth.signInWithPassword({
    email: email as string,
    password: password as string,
  });

  if (error) {
    return { error: 'Invalid username or password. Please try again.' }
  }


  // Log the login activity
  await addActivity({
    action: 'created',
    entity: 'member',
    entityName: email as string,
    details: `User ${email} logged in successfully`
  });

  redirect('/admin')
}

export async function logout() {
  await supabase.auth.signOut();
  redirect('/login')
}
