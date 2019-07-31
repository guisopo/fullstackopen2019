const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../controllers/users')

const api = supertest(app)

describe('when there is initially one user in the db', () => {
  beforeEach( async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh userName', async () => {
    const userAtStart = await helper.userInDb()

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

    const userAtEnd = await helper.userInDb()
    expect(userAtEnd.length).toBe(userAtStart.length + 1)

    const userNames = await userAtEnd.map(u => u.username)
    expect(userNames).toBe(newUser.userName)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})