'use strict';

var join = require('path').join;
var express = require('express');
var bodyParser = require('body-parser');
var tungsten = require('../');
var db = require('./db');
var config = require('./config');
var validateUser = require('./validateUser');
var app = express();


app.use(bodyParser());
app.use(tungsten.session(config.token.secret));
app.use(express['static'](join(__dirname, '/public/')));

var userSchema = require('./models/User');
var User = db.model('User', userSchema);

require('./seed');

var idxFile = join(__dirname + '/public/', 'index.html');

app.post('/login', function(req, res) {
  var _ref, _ref1;
  console.log(req.body);
  if (!(((_ref = req.body) != null ? _ref.username : void 0) && ((_ref1 = req.body) != null ? _ref1.password : void 0))) {
    return res.status(401).send({
      error: 'missing parameters'
    });
  }
  return validateUser(req.body.username, req.body.password, function(err, user) {
    if (user == null) {
      return res.status(401).send({
        error: 'invalid username or password'
      });
    }
    return res.status(200).send({
      user: user
    });
  });
});

app.post('/register', function(req, res) {
  var user, _ref, _ref1;
  if (!(((_ref = req.body) != null ? _ref.username : void 0) && ((_ref1 = req.body) != null ? _ref1.password : void 0))) {
    return res.status(401).send({
      error: 'missing parameters'
    });
  }
  user = new User({
    username: req.body.username,
    password: req.body.password
  });
  return user.save(function(err, doc) {
    return res.status(200).send(doc);
  });
});

app.get('/v1/users', function(req, res) {
  console.log(req.headers);
  if (req.auth == null) {
    return res.status(401).end();
  }
  return User.find({}, function(err, users) {
    return res.status(200).send(users);
  });
});

app.get('/*', function(req, res) {
  return res.sendFile(idxFile);
});

console.log('starting server on port: ' + config.port);

app.listen(config.port);
