import Link from 'next/link'
import { updateBlogReadStatus } from '@/app/actions/blogs'
import { getUserWithBlogList } from '../services/users'

const ReadingList = async ({ username }: { username: string }) => {
  const userWithBloglist = await getUserWithBlogList(username)

  if (!userWithBloglist?.blogLists.length) {
    return (
      <div data-testid="reading-list-section">
        <p data-testid="empty-reading-list">empty reading list</p>
      </div>
    )
  }

  const bloglistRead = userWithBloglist
    ? userWithBloglist.blogLists.filter(({ read }) => read === true)
    : null
  const bloglistUnread = userWithBloglist
    ? userWithBloglist.blogLists.filter(({ read }) => read === false)
    : null

  return (
    <div data-testid="reading-list-section">
      <h3>Reading list</h3>

      {bloglistRead ? (
        <div data-testid="read-section">
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
        </div>
      ) : null}
      {bloglistUnread?.length ? (
        <div data-testid="unread-section">
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
                    data-testid="mark-read-"
                  >
                    Mark as read
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p data-testid="no-unread-blogs">no unread blogs</p>
      )}
    </div>
  )
}

export default ReadingList
