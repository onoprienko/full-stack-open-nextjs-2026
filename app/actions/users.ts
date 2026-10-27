'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { db } from '../../db'
import { users } from '../../db/schema'

export const registerUser = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const username = (formData.get('username') as string)?.trim()
  const name = (formData.get('name') as string)?.trim()
  const password = formData.get('password') as string
  const passwordConfirm = formData.get('passwordconfirm') as string

  if (!username || username.length < 4)
    return {
      error: 'usermane must be at least 4 characters long',
      id: 'username-error',
    }
  if (!name || name.length < 4)
    return {
      error: 'name must be at least 4 characters long',
      id: 'name-error',
    }
  if (!password || password.length < 4)
    return {
      error: 'password must be at least 4 characters long',
      id: 'password-error',
    }
  if (password !== passwordConfirm)
    return { error: 'password not confirmed', id: 'passwordConfirm-error' }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect('/login')
}
