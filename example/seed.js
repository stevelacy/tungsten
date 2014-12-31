'use strict';

var db = require('./db');

var User = db.models.User;

User.find({}, function(err, users) {
  if (users[0]) {
    return;
  }
  var user = new User({
    username: 'username',
    password: 'password'
  });
  user.save(function(err, user) {
    if (err) {
      return console.log(err);
    }
    console.log('user saved', 'username: username', 'password: password');
  });

});
