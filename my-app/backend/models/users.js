const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Avatar = require('./avatars')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    minLength: 3,
    maxLength: 15
  },
  passwordHash: { type: String, required: true},
  createdAt: {type: Date, default: Date.now()},
  score: Number,
  ratedCards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card'
    }
  ],
  avatar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Avatar'
  }  
})


userSchema.pre('save', async function(next){
  if (!this.avatar){
    const avatar = new Avatar()
    await avatar.save()
    this.avatar = avatar._id
    next()
  }
  next()
})
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.passwordHash
    delete returnedObj.__v
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User