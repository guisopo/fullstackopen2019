const bcrypt = require('bcrypt')
const useRouter = require('express').Router()
const user = require('../models/user')

user.post('/', async (request, response, next) => {
  try {
    const body = request.body

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

module.exports = useRouter