import Link from 'next/link'
import { getUsersWithBlogLists } from '../services/users'

export const instant = false

const Users = async () => {
  const users = await getUsersWithBlogLists()

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link
              className="text-blue-500 underline"
              href={`/users/${user.username}`}
            >
              {user.name}
            </Link>
            {' '}
            ({user.blogLists.length}{' '}
            {user.blogLists.length === 1 ? 'blog' : 'blogs'} saved)
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
