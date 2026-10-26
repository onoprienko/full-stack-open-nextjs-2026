import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { users, blogs } from '../../db/schema'

export const getUsersWithBlogLists = async () => {
  const usersWithBlogLists = await db.query.users.findMany({
    with: { blogLists: true },
  })

  return usersWithBlogLists.filter((user) => user.blogLists.length > 0)
}

export const getUserById = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  })
}

export const getBlogsByUserId = async (userId: number) => {
  return db.query.blogs.findMany({
    where: eq(blogs.userId, userId),
  })
}

export const getUserWithBlogList = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogLists: { with: { blog: true } } },
  })
}
