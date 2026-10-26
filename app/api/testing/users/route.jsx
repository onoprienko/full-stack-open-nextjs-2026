import { db } from '../../../../db'
import { users } from '../../../../db/schema'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  if (process.env.NODE_ENV === 'production') {
    return Response.json(
      { error: 'This endpoint is not available in production' },
      { status: 403 },
    )
  }

  const { username, name, password } = await request.json()
  if (
    typeof username !== 'string' ||
    typeof name !== 'string' ||
    typeof password !== 'string'
  ) {
    return Response.json(
      { error: 'Username, name, and password are required' },
      { status: 400 },
    )
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const result = await db.insert(users).values({ username, name, passwordHash })
  return Response.json(result)
}
