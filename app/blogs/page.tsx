import Link from 'next/link'
import { getBlogs } from '../services/blogs'
import { filterBlogs } from '@/app/actions/blogs'

export const instant = false

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const blogs = filter
    ? getBlogs().filter((blog) => blog.title.includes(filter))
    : getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
      <form action={filterBlogs}>
        <input type="search" name="filter" />
        <button type="submit">Filter blogs by title</button>
      </form>
      <ul>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
              {blog.author} {blog.url} {blog.likes}
            </li>
          ))}
      </ul>
    </div>
  )
}
export default Blogs
