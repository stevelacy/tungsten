'use strict';

var mongoose = require('mongoose');
var tungsten = require('../');
var db = require('./db');
var config = require('./config');
var userSchema = require('./models/User');
var User = db.model('User', userSchema);

module.exports = function(username, password, cb) {
  return User.findOne({
    username: username
  }, function(err, user) {
    user.save();
    if (err != null) {
      return cb(err);
    }
    if (user == null) {
      return cb(null, null);
    }
    return user.comparePassword(password, function(err, match) {

      if (err != null) {
        return cb(err);
      }
      if (!match) {
        return cb(null, null);
      }
      var date = new Date();
      var expire = date + 345600000;

      var token = tungsten.encode({
        exp: expire,
        id: user._id
      }, config.token.secret, 'HS512');

      user.set({
        token: token
      });
      return user.save(function(err, doc) {
        if (err != null) {
          return cb(err);
        }
        return cb(null, doc);
      });
    });
  });
};
