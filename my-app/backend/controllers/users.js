const bcrypt = require('bcrypt')
const Users = require('../models/users')
const User = require('../models/users')
const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
  const users = await Users.find({})
    // .populate('ratedCards')
    .populate('avatar', { id: 1 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await Users.findById(request.params.id)
  return response.json(user)
})

usersRouter.post('/', async (request, response) => {
  // console.log(request.body)
    const { username, password  } = request.body
  
    if(!password) return response.status(400).json({ error: 'password needed'})
    if(password.length < 8 ) return response.status(400).json({ error: 'password must be 8 characters or more'})
  
    const passwordHash = await bcrypt.hash(password, 10)
  
    const user = new User({
      username: username,
      passwordHash: passwordHash,
      score: 0
    })
  
    // console.log('just before the save',user)
  
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.put('/:id/score', async (request, response) => {
  const body = request.body

  await User.findByIdAndUpdate(body.id, { score: body.score }, {
    returnOriginal: false
  })
  return response.status(204).end()
}) 

usersRouter.put('/:id/password', async (request, response) => {
  const { username, id, password, newPassword } = request.body
  const user = await User.findOne({ username: { $regex: username, $options: 'i' } })
  
  const passCheck = user === null ? false : await bcrypt.compare(password, user.passwordHash)
  if(!passCheck){
    return response.status(401).json({ error: 'incorrect password' })
  }

  const passwordHash = await bcrypt.hash(newPassword, 10)

  await User.findByIdAndUpdate(id, { passwordHash: passwordHash })
  return response.status(204).json({ message: 'password changed' })
})

module.exports = usersRouter