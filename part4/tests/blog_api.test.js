const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  beforeEach(async() => {
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
      .expect('Content-type', /application\/json/)
  })

  test ('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
  
  test('unique identifier property of the blog posts is named id', async() => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[0].id).toBeDefined()
  })
  
  describe('add a new blog', () => {
    test('succeeds with valid data', async() => {
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

    test('set likes to 0 if it\'s missing from properties', async() => {
      const newBlog = {
        title: "This is a new blog",
        author: "Gossip Blogger",
        url: "https://reactpatterns.com/",
      }
    
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

    test('fails with 400 status code if url or title are missing', async() => {
      const newBlog = {
        author: "Gossip Blogger",
        likes: 7,
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async() => {
      const blogAtStart = await Blog.find({})
      const blogToDelete = blogAtStart[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await Blog.find({})
  
      expect(blogsAtEnd.length).toBe(blogAtStart.length - 1)
    })
  })
  
  describe('update of a note', () => {
    test('succeeds with status code 200 if data is valid', async() => {
      const blogAtStart = await Blog.find({})
      const blogToUpdate = blogAtStart[0]

      const updatedBlog = {
        title: 'Updated Title',
        author: 'Updated Author',
        url: 'www.updatedurl.url',
        likes: blogAtStart[0].likes + 1
      }
  
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-type', /application\/json/)
      
      const blogs = await Blog.find({})

      const titles = blogs.map(n => n.title)
      const authors = blogs.map(n => n.author)
      const url = blogs.map(n => n.url)
      const likes = blogs.map(n => n.likes)

      expect(titles).toContain(updatedBlog.title)
      expect(authors).toContain(updatedBlog.author)
      expect(url).toContain(updatedBlog.url)
      expect(likes).toContain(updatedBlog.likes)
    })
  })
})


afterAll(() => {
  mongoose.connection.close()
})