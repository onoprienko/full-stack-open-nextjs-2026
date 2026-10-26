import { redirect } from 'next/navigation'
import { generateToken } from '@/app/actions/tokens'
import { getCurrentUser } from '@/app/services/session'
import { getUserWithBlogList } from '../services/users'
import Link from 'next/link'
import { updateBlogReadStatus } from '@/app/actions/blogs'

export const instant = false

const MePage = async () => {
  const user = await getCurrentUser()

  if (!user) redirect('/login')

  const userWithBloglist = await getUserWithBlogList(user.username)

  const bloglistRead = userWithBloglist
    ? userWithBloglist.blogLists.filter(({ read }) => read === true)
    : null
  const bloglistUnread = userWithBloglist
    ? userWithBloglist.blogLists.filter(({ read }) => read === false)
    : null

  console.log(bloglistUnread)

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

      {bloglistRead ? (
        <>
          {' '}
          <h4>Read ({bloglistRead?.length})</h4>
          <ul>
            {bloglistRead.map(({ blog }) => (
              <li key={blog.id} className="border mb-1 p-2">
                <Link
                  className="text-blue-500 underline"
                  href={`/blogs/${blog.id}`}
                >
                  {blog.title}
                </Link>{' '}
                by {blog.author} {blog.url} {blog.likes}{' '}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {bloglistUnread ? (
        <>
          <h4>Unread ({bloglistUnread?.length})</h4>
          <ul>
            {bloglistUnread.map(({ blog, id }) => (
              <li key={blog.id} className="border mb-1 p-2">
                <Link
                  className="text-blue-500 underline"
                  href={`/blogs/${blog.id}`}
                >
                  {blog.title}
                </Link>{' '}
                by {blog.author} {blog.url} {blog.likes}{' '}
                <form action={updateBlogReadStatus}>
                  <input type="hidden" name="id" value={id} />
                  <input type="hidden" name="read" value={1} />
                  <button
                    type="submit"
                    className="border p-1 px-4 cursor-pointer hover:bg-green-500 transition"
                  >
                    Mark as read
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  )
}

export default MePage
