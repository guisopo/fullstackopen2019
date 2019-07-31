const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially one user in the db', () => {
  beforeEach( async () => {
    await User.deleteMany({})
    const user = new User({ name: 'root', userName: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh userName', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Guillermo',
      userName: 'guisopo',
      password: '12345'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const userAtEnd = await helper.usersInDb()
    expect(userAtEnd.length).toBe(userAtStart.length + 1)

    const userNames = await userAtEnd.map(u => u.userName)
    expect(userNames).toContain(newUser.userName)
  })

  test('creation fails with proper statuscode and message if userName already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      userName: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`userName` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if userName is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      userName: '',
      name: 'New User',
      password: '123',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`userName` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      userName: 'newUser',
      name: 'New User',
      password: '',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is has less than 3 chars', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      userName: 'newUser',
      name: 'New User',
      password: '12',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
