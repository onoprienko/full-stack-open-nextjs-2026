import { redirect } from 'next/navigation'
import { generateToken } from '@/app/actions/tokens'
import { getCurrentUser } from '@/app/services/session'
import { getUserWithBlogList } from '../services/users'
import Link from 'next/link'

export const instant = false

const MePage = async () => {
  const user = await getCurrentUser()

  if (!user) redirect('/login')

  const userWithBloglist = await getUserWithBlogList(user.username)

  console.log(userWithBloglist)

  return (
    <div>
      <h2>My Profile</h2>
      <p>
        <b>Name:</b> {user.name}
      </p>
      <p>
        <b>Username:</b> {user.username}
      </p>
      <hr />
      <h3>API token:</h3>
      {user.token ? (
        <>
          <p>Current token:</p>
          <p className="break-all">{user.token}</p>
        </>
      ) : (
        <p>No tokens</p>
      )}
      <form action={generateToken}>
        <button
          className="border p-1 px-4 cursor-pointer hover:bg-green-500 transition"
          type="submit"
        >
          Generate new token
        </button>
      </form>
      <hr />
      <h3>Reading list</h3>
      <ul>
        {userWithBloglist
          ? userWithBloglist.blogLists.map(({ blog }) => (
              <li key={blog.id}>
                <Link
                  className="text-blue-500 underline"
                  href={`/blogs/${blog.id}`}
                >
                  {blog.title}
                </Link>{' '}
                by {blog.author} {blog.url} {blog.likes}
              </li>
            ))
          : null}
      </ul>
    </div>
  )
}

export default MePage
