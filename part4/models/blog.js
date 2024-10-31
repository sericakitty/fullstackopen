// 4.1 - 4.2 bloglist
const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI) // connect to mongodb
  .then(() => {
    console.log('connected to MongoDB') // if successful, log success message
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message) // if unsuccessful, log error message
  })

const blogSchema = new mongoose.Schema({ // create schema for blog
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { // reference to user schema
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', { // set toJSON method for schema, deleting _id and __v, and changing _id to id
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Blog', blogSchema)