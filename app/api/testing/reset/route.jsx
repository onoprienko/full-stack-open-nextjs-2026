import { db } from '../../../../db'
import { blogLists, blogs, users } from '../../../../db/schema'

export async function DELETE() {
  if (process.env.NODE_ENV === 'production') {
    return Response.json(
      { error: 'This endpoint is not available in production' },
      { status: 403 },
    )
  }

  try {
    await db.delete(blogLists)
    await db.delete(blogs)
    await db.delete(users)

    return Response.json({ status: 200 })
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 },
    )
  }
}
