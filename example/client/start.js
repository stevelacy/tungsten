/* globals document*/
'use strict';

var fission = require('fission');
var IndexView = require('./pages/Index/Index');
var LoginView = require('./pages/Login/Login');
var UsersView = require('./pages/Users/Users');


var Router = fission.router({
  index: {
    view: IndexView,
    path: '/'
  },
  login: {
    view: LoginView,
    path: 'login'
  },
  users: {
    view: UsersView,
    path: 'users'
  }
});

Router.start(document.body);
