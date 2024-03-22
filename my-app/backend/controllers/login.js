const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/users')

const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  console.log('bods',request.body)
  const { username, password } = request.body
  const user = await User.findOne({ username: { $regex: username, $options: 'i' } })

  const passCheck = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if(!(user && passCheck)){
    return response.status(401).json({ error: 'incorrect username or password' })
  }
  
  const userForToken = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: (60 * 60)
  })
  return response.status(201).send({ 
    token, 
    username: user.username, 
    id: user._id.toString(),
    score: user.score,
    avatar: user.avatar 
  })
})

module.exports = loginRouter