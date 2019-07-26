const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')

const api = supertest(app)

test('all blogs are returned', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})