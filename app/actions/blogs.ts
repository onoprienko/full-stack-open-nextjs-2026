'use server'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addBlog, addLike } from '../services/blogs'
import { addBlogToBlogList, setBlogReadStatus } from '../services/blogList'

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
    return {
      error: 'Blog title must be at least 5 characters long',
      success: false,
    }
  if (!author || author.length < 5)
    return {
      error: 'Blog author must be at least 5 characters long',
      success: false,
    }
  if (!url || url.length < 5)
    return {
      error: 'Blog url must be at least 5 characters long',
      success: false,
    }

  const blog = await addBlog(title, author, url, likes as number)
  await addBlogToBlogList(blog.id)
  revalidatePath('/blogs')
  return { error: '', success: true }
}

export const addBlogLike = async (formData: FormData) => {
  const id = Number(formData.get('id'))
  await addLike(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath('/blogs')
}

export const addToReadingList = async (formData: FormData) => {
  const id = Number(formData.get('id'))
  await addBlogToBlogList(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath('/users')
}

export const updateBlogReadStatus = async (formData: FormData) => {
  const id = Number(formData.get('id'))
  const read = Boolean(formData.get('read'))

  console.log(id, read)
  await setBlogReadStatus(id, read === true)
  revalidatePath('/me')
}

export const filterBlogs = async (formData: FormData) => {
  const filter = formData.get('filter') as string
  redirect(`/blogs?filter=${filter}`)
}
