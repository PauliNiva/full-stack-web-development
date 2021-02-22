const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(titles).toContain(
    'kuudes TESTI'
  )
})

test('the _id is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog =>
      expect(blog.id).toBeDefined())
    })

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'TEsT',
    author: 'Tero Testaaja',
    url: 'afffafgag',
    likes: 666,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('TEsT')
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Pauli',
    url: 'afffafgag',
    likes: 666,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'afffafgag',
    author: 'Pauli',
    likes: 666,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('if likes is missing then they are set to 0', async () => {
  const newBlog = {
    title: 'logilogi',
    author: 'Tero',
    url: 'sfdgsgd'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const likes = blogsAtEnd.map(b => b.likes)
  expect(likes).not.toBe(0)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

  expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('updating blog post succeeds', async () => {
  const blogs = await helper.blogsInDb()
  const blogToUpdate = {
    id: blogs[0].id,
    likes: blogs[0].likes + 1
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)

  const Updatedblogs = await helper.blogsInDb()
  expect(Updatedblogs).toHaveLength(helper.initialBlogs.length)
  expect(Updatedblogs[0].likes).toEqual(blogToUpdate.likes)
})

afterAll(() => {
  mongoose.connection.close()
})
