mongoose = require 'mongoose'
tungsten = require '../'

db = require './db'
config = require './config'

userSchema = require './models/User'
User = db.model 'User', userSchema

module.exports = (username, password, cb) ->
  User.findOne username: username, (err, user) ->
    user.save()
    return cb err if err?
    return cb null, null unless user?
    user.comparePassword password, (err, match) ->
      return cb err if err?
      return cb null, null unless match

      date = new Date()
      expire = date + 345600000
      token = tungsten.encode
        exp: expire
        id: user._id
      , config.token.secret
      , 'HS512'

      user.set token: token
      user.save (err, doc) ->
        return cb err if err?
        return cb null, doc
