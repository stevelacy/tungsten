'use strict';

var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var Model = mongoose.Schema({
  username: String,
  password: String,
  token: String
});

Model.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  return bcrypt.genSalt(10, (function(_this) {
    return function(err, salt) {
      if (err != null) {
        return next(err);
      }
      return bcrypt.hash(_this.password, salt, function(err, hash) {
        if (err != null) {
          return next(err);
        }
        _this.password = hash;
        return next();
      });
    };
  })(this));
});

Model.methods.comparePassword = function(password, cb) {
  return bcrypt.compare(password, this.password, function(err, match) {
    if (err != null) {
      return cb(err);
    }
    return cb(null, match);
  });
};

module.exports = Model;
