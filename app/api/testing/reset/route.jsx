import * as schema from './schema.ts'
import { reset } from 'drizzle-seed'

export async function DELETE() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is not available in production' },
      { status: 403 },
    )
  }

  await reset(db, schema)
}
