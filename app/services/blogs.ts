const blogs = [
  {
    id: 1,
    title: 'title 1',
    author: 'author 1',
    url: 'url 1',
    likes: 1,
  },
  {
    id: 2,
    title: 'title 2',
    author: 'author 2',
    url: 'url 2',
    likes: 2,
  },
]

let nextId = 3

export const getBlogs = () => {
  return blogs
}

export const addBlog = (
  title: string,
  author: string,
  url: string,
  likes: number,
) => {
  blogs.push({ id: nextId++, title, author, url, likes })
}
