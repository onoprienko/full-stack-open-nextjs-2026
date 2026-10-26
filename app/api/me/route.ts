import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { users } from '@/db/schema'

export async function GET(request: Request) {
  const authorization = request.headers.get('authorization')
  const token = authorization?.split(' ')[1]

  if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    with: { blogs: true },
    columns: {
      id: true,
      username: true,
      name: true,
    },
  })

  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { blogs, ...rest } = user
  const updatedUser = { ...rest, createdBlogs: blogs }

  return Response.json(updatedUser)
}
