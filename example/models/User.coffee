bcrypt = require 'bcrypt'
mongoose = require 'mongoose'

Model = mongoose.Schema
  username: String
  password: String
  token: String

Model.pre 'save', (next) ->
  return next() unless @.isModified 'password'
  bcrypt.genSalt 10, (err, salt) =>
    return next err if err?
    bcrypt.hash @password, salt, (err, hash) =>
      return next err if err?
      @password = hash
      next()

Model.methods.comparePassword = (password, cb) ->
  bcrypt.compare password, @password, (err, match) ->
    return cb err if err?
    cb null, match

module.exports = Model
