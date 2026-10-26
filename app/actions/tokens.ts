'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { users } from '@/db/schema'
import { getCurrentUser } from '@/app/services/session'

export const generateToken = async () => {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  await db
    .update(users)
    .set({ token: randomUUID() })
    .where(eq(users.id, user.id))

  revalidatePath('/me')
}
