const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// 4.15
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3) { // 4.16 - password length validation
    return response.status(400).json({ error: 'Password must be at least 3 characters long' })
  }

  if (!username || username.length < 3) { // 4.16 - username length validation
    return response.status(400).json({ error: 'Username must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

// 4.17
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 }) // populate user's blogs with only url, title, author, and id
  response.json(users)
}
)


module.exports = usersRouter