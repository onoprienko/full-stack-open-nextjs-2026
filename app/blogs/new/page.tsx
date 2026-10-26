'use client'

import { useActionState, useState } from 'react'
import { createBlog } from '@/app/actions/blogs'

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { error: '' })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Url
            <input
              type="text"
              name="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Likes
            <input type="number" name="likes" required />
          </label>
        </div>

        <button type="submit">Create</button>
        {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      </form>
    </div>
  )
}

export default NewBlog
