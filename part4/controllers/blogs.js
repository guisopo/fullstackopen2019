const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate( 'user', { userName: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response
      .status(400)
      .json({ error: 'Missing title or url'})
      .end()
  }
  
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!request.token || !decodedToken.id) {
      return response
        .status(401)
        .json({ error: 'token missing or invalid'})
        .end()
    }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: user.name,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response
      .status(201)
      .json(savedBlog)
      .end()
  }
  catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blogId = request.params.id

  const requestedBlog = await Blog.findById(blogId)

  const blog = {
    title: body.title || requestedBlog.title,
    author: body.author || requestedBlog.author,
    url: body.url || requestedBlog.url,
    likes: body.likes || requestedBlog.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog, { new: true })
    response
      .status(200)
      .json(updatedBlog)
      .end()
  }
  catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!request.token || !decodedToken.id) {
      return response
        .status(401)
        .json({ error: 'token missing or invalid'})
        .end()
    }

    const user = await User.findById(decodedToken.id)

    const blog = await Blog.findById(request.params.id)

    if(blog.user.toString() === user.id) {
      await Blog.deleteOne({ _id: request.params.id })

      response
        .status(204)
        .end()
    } else {
      response
        .status(401)
        .json({ error: 'Unauthorized to delete blog'})
        .end()
    }
  }
  catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter