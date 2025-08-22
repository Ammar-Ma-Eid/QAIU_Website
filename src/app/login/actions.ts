'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type State = {
  error?: string
}

export async function login(prevState: State | undefined, formData: FormData): Promise<State | undefined> {
  const username = formData.get('username')
  const password = formData.get('password')

  if (username === 'adminQAIU_2025' && password === 'QAIU_adminpassword_2025') {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    (await cookies()).set('auth_token', 'QAIU_ADMIN_TOKEN_SECRET_2025', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: expires,
    });
  } else {
    return { error: 'Invalid username or password. Please try again.' }
  }

  redirect('/admin')
}

export async function logout() {
  (await cookies()).delete('auth_token')
  redirect('/login')
}
