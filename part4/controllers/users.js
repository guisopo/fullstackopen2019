const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blog', { title: 1, author: 1,  url: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (!body.password) {
      return response
        .status(400)
        .json({ error: 'Password missing' })
        .end()
    }
    if (body.password.length < 3) {
      return response
        .status(400)
        .json({ error: 'Password must be at least 3 characters long' })
        .end()
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      name: body.name,
      userName: body.userName,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  }
  catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter