import { notFound } from 'next/navigation'
import { getBlogById } from '../../services/blogs'
import { addBlogLike, addToReadingList } from '@/app/actions/blogs'
import Link from 'next/link'
import { auth } from '@/auth'
import { getUserWithBlogList } from '@/app/services/users'

export const instant = false

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth()

  const { id } = await params
  const blog = await getBlogById(Number(id))

  const user = session?.user?.email
    ? await getUserWithBlogList(session.user.email)
    : null

  const inReadingList = user?.blogLists.find(
    (item) => item.blog.id === Number(id),
  )

  console.log(blog, user)

  if (!blog) notFound()

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>by {blog.author}</p>

      <div className="flex items-center gap-4">
        <p>likes: {blog.likes}</p>
        <form action={addBlogLike}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="border p-1 px-4 cursor-pointer hover:bg-green-500 transition"
          >
            Add like
          </button>
        </form>
        {inReadingList ? (
          <p>already in reading list</p>
        ) : (
          <form action={addToReadingList}>
            <input type="hidden" name="id" value={blog.id} />
            <button
              type="submit"
              className="border p-1 px-4 cursor-pointer hover:bg-green-500 transition bg-blue-300"
            >
              Add to reading list
            </button>
          </form>
        )}
      </div>

      <Link
        className="text-blue-500 underline"
        href={{
          pathname: blog.url,
        }}
      >
        {blog.url}
      </Link>
    </div>
  )
}

export default BlogPage
