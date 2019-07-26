const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async() => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('all blogs are returned', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('unique identifier property of the blog posts is named id', async() => {
  const blogs = await api.get('/api/blogs')
  expect(blogs.body[0].id).toBeDefined()
})

test('adds content of the blog post and saves it correctly to the database', async() => {
  const newBlog = helper.singleBlog

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await api.get('/api/blogs')
  const length = blogs.body.length
  const lastBlogAdded = blogs.body[length -1]
  
  expect(lastBlogAdded).toHaveProperty('title', newBlog.title)
  expect(lastBlogAdded).toHaveProperty('author', newBlog.author)
  expect(lastBlogAdded).toHaveProperty('url', newBlog.url)
  expect(lastBlogAdded).toHaveProperty('likes', newBlog.likes)
  expect(length).toBe(helper.initialBlogs.length + 1)
})

test('set likes to 0 if it\'s missing from blog', async() => {
  const newBlog = helper.noLikesBlog

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await api.get('/api/blogs')
  const length = blogs.body.length
  const lastBlogAdded = blogs.body[length -1]

  expect(lastBlogAdded.likes).toBe(0)
})

test('400 status if no url or title is in Blog', async() => {
  const newBlog = helper.noTitleNoUrlBlog

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})