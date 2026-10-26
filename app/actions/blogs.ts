'use server'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addBlog, addLike } from '../services/blogs'

export const createBlog = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }

  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string
  const likes = formData.get('likes') as unknown

  if (!title || title.length < 5)
    return { error: 'Blog title must be at least 5 characters long' }
  if (!author || author.length < 5)
    return { error: 'Blog author must be at least 5 characters long' }
  if (!url || url.length < 5)
    return { error: 'Blog url must be at least 5 characters long' }

  await addBlog(title, author, url, likes as number)
  revalidatePath('/blogs')
  redirect('/blogs')
}

export const addBlogLike = async (formData: FormData) => {
  const id = Number(formData.get('id'))
  await addLike(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath('/blogs')
}

export const filterBlogs = async (formData: FormData) => {
  const filter = formData.get('filter') as string
  redirect(`/blogs?filter=${filter}`)
}
