import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getUserWithBlogList } from '../../services/users'

export const instant = false

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>
}) => {
  const { username } = await params
  const user = await getUserWithBlogList(username)

  if (!user) {
    notFound()
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3>Reading list</h3>
      <ul>
        {user.blogLists.map(({ blog }) => (
          <li key={blog.id}>
            <Link
              className="text-blue-500 underline"
              href={`/blogs/${blog.id}`}
            >
              {blog.title}
            </Link>{' '}
            by {blog.author} {blog.url} {blog.likes}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
