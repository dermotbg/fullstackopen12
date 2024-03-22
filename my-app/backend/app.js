const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const cors = require('cors')

const usersRouter = require('./controllers/users')
const { MDB_URI } = require('./utils/config')
const middleware = require('./utils/middleware')
const flashcardsRouter = require('./controllers/cards')
const loginRouter = require('./controllers/login')
const avatarRouter = require('./controllers/avatars')

app.use(express.json())
app.use(cors())

mongoose.set('strictQuery',false)
mongoose
.connect(MDB_URI)
.then(() => {
  console.log('connected to MDB')
})
.catch((error) => {
  console.log(error)
})


app.use(middleware.requestLogger)

app.use('/api/users',usersRouter)
app.use('/api/flashcards',flashcardsRouter)
app.use('/api/login', loginRouter)
app.use('/api/avatars', avatarRouter)


app.use(express.static('dist'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
 })



app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app