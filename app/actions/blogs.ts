'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addBlog } from '../services/blogs'

export const createBlog = async (formData: FormData) => {
  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string
  const likes = formData.get('likes') as unknown

  addBlog(title, author, url, likes as number)
  revalidatePath('/blogs')
  redirect('/blogs')
}
