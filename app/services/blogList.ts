import { db } from '../../db'
import { blogLists } from '../../db/schema'
import { getCurrentUser } from './session'

export const addBlogToBlogList = async (blogId: number) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not logged in')

  await db.insert(blogLists).values({ blogId, userId: user.id })
}
