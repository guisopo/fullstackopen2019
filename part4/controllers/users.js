const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    console.log(body)
    if(!body.password) {
      response.status(400).json({ error: 'Password missing' }).end()
      return
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