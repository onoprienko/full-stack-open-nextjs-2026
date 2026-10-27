'use client'

import { useActionState, useState, useEffect } from 'react'
import { createBlog } from '@/app/actions/blogs'
import { useRouter } from 'next/navigation'
import { useNotification } from '../../components/NotificationContext'

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    error: '',
    success: false,
  })

  // BUG: TODO: probably it is better to use previous value as default after formaction
  // after form submit return to add-new-form page will trigger some wierd activity
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification('blog created')
      router.push('/blogs')
    }
  }, [state, showNotification, router])

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input
              type="text"
              name="title"
              required
              className="border"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author
            <input
              type="text"
              name="author"
              required
              className="border"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            URL
            <input
              type="text"
              name="url"
              required
              className="border"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Likes
            <input
              type="number"
              name="likes"
              required
              className="border"
              defaultValue={0}
            />
          </label>
        </div>

        <button
          data-testid="create-blog-button"
          className="border p-1 px-4 cursor-pointer hover:bg-green-500 transition"
          type="submit"
        >
          Create
        </button>
        {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      </form>
    </div>
  )
}

export default NewBlog
