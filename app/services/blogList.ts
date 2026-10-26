import { db } from '../../db'
import { blogLists } from '../../db/schema'
import { getCurrentUser } from './session'
import { and, eq } from 'drizzle-orm'

export const addBlogToBlogList = async (blogId: number) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not logged in')

  await db.insert(blogLists).values({ blogId, userId: user.id })
}

export const setBlogReadStatus = async (id: number, read: boolean) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not logged in')

  const blogList = await db.query.blogLists.findFirst({
    where: eq(blogLists.id, id),
  })

  console.log('🍎', blogList)

  if (blogList) {
    await db.update(blogLists).set({ read }).where(eq(blogLists.id, id))
  }
}
