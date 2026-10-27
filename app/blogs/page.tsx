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

  const blogs = filter ? await getBlogs(filter) : await getBlogs('')

  return (
    <div>
      <h2>Blogs</h2>
      <form action={filterBlogs}>
        <input
          data-testid="filter-input"
          type="search"
          name="filter"
          className="border mr-2"
        />
        <button data-testid="search-button" type="submit">
          Filter blogs by title
        </button>
      </form>
      <ul data-testid="blogs-list">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link
                className="text-blue-500 underline"
                href={`/blogs/${blog.id}`}
              >
                {blog.title}
              </Link>{' '}
              {blog.author} - {blog.url} - {blog.likes} likes
            </li>
          ))}
      </ul>
    </div>
  )
}
export default Blogs
