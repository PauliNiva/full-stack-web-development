const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "kuudes TESTI",
    "author": "Pauli Niva",
    "url": "asdfdsfsdgyyyyyyyyysfsfdfsgsf",
    "likes": 1
  },
  {
    "title": "seitsemäs TESTI",
    "author": "Pauli Niva",
    "url": "asdfdsfxxxxxxxxxsdgsgsf",
    "likes": 1
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'Pauli', url: 'fadf', likes: 1 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}